/**
 * PANIM HAVEN STAGE 1 ENRICHED MEANINGFUL CHOICES
 * 20 deeply grounded investigation paths tied to shrine work and mediation service
 * Generated for: Divine balance vs mortal need, ritual correctness vs human compassion, mediation vs grief
 * Each choice: 65-80 XP, grounded in specific NPC perspective, layered wrongness reveal
 */

const PANIM_HAVEN_STAGE1_ENRICHED_CHOICES = [
  // ========== NPC-GROUNDED CHAINS (8 CHOICES) ==========

  // 1. SHRINE HELPER: OFFERING PATTERNS CORRUPTED
  {
    label: "The offering standards changed. Copper mixed with iron is being accepted now. That was always sent back before.",
    tags: ['Investigation', 'NPC', 'Ritual', 'Offerings', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading offering corruption patterns');
      G.stageProgress[1]++;

      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      const target = 11 + Math.max(0, G.worldClocks.pressure);

      if (result.isCrit) {
        G.lastResult = `Soria sorts candles at the side table while she talks, not looking up. "Copper mixed with iron. Cloth that's been bleached wrong — it photographs white but it isn't. Those used to be sent back. Now they're accepted." She sets a candle down crooked. "I asked the ritual authority why the standards changed. They told me standards adapt with faith. That's not an answer." She finally looks at you. "If the offering is wrong, what does that do to the blessing it's supposed to carry?"`;

        G.stageProgress[1]++;
        addJournal('Shrine helper flagged offering acceptance corruption', 'evidence', `panim_haven-offerings-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Soria straightens when you ask about the offering standards. Her hands go still on the candles. "That's shrine business." She doesn't say anything else. She doesn't go back to sorting either. You've been categorized as someone who asks the kind of questions that get reported.`;
        G.worldClocks.pressure++;
        addJournal('Shrine helper now distrustful of inquiry', 'complication', `panim_haven-shrine-hostile-${G.dayCount}`);
      } else {
        G.lastResult = `Soria admits the offering standards have loosened. "The ritual authority said we need to be more practical about what people can bring." She says it in a flat register that doesn't match the words. Her eyes stay on the table. The reasoning she's repeating is not her own.`;
        addJournal('Shrine helper noted offering standard relaxation', 'evidence', `panim_haven-offerings-relaxed-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 2. LEDGER KEEPER: MEDIATION RECORDS TAMPERED
  {
    label: "The mediation ledger entries from six weeks ago use newer ink than the dates claim.",
    tags: ['Investigation', 'NPC', 'Records', 'Mediation', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering ledger manipulation');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Brother Thenim holds the ledger for a moment before handing it across. The entries from six weeks ago have been rewritten — the ink is newer than the dates claim, and the letterforms shift between older and recent hands partway through a page. More specific: the outcome language has changed. Old entries read "balance achieved." New ones use "appropriate resolution" or "necessary outcome." The substitution reframes mediation from finding a truth to executing a decision. Someone has been revising how the record says grief gets handled in Panim Haven.`;
        G.stageProgress[1]++;
        addJournal('Ledger keeper revealed backdated ledger tampering', 'evidence', `panim_haven-ledger-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Brother Thenim closes the ledger cabinet before you finish the request. "These records are protected. You need permission from the ritual authority — in writing." He doesn't wait for a response before walking to the shrine master's office. The door closes. Your presence at the ledger cabinet is now a matter on record.`;
        G.worldClocks.pressure++;
        addJournal('Shrine master alerted to ledger inquiry attempt', 'complication', `panim_haven-ledger-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Partial access: Thenim supervises and selects which volumes you can handle. Pages have been removed and replaced — the binding thread is new at the spine on several sections, the fiber texture different from surrounding pages. Recent entries carry a handwriting pattern that diverges from the historical hand in the same volume. Someone with regular archive access has been editing the record from inside. The craft analysis of fiber composition would confirm whether the replacement pages were made from the same stock — there is still the matter of matching the thread gauge.`;
        addJournal('Ledger records show evidence of careful alteration', 'evidence', `panim_haven-ledger-altered-${G.dayCount}`);
      } else {
        G.lastResult = `Thenim recites the authorization requirement without inflection — written permission, ritual authority signature, forty-eight hour processing window. The salt-air coming through the high louvers shifts the candle flame on his desk; he doesn't glance at it. He's given this answer so many times that nothing about it costs him anything. The cabinet stays locked. The rope-and-peg latch hasn't moved since you sat down, and it won't. Nothing about his posture suggests the conversation is still open.`;
        addJournal('Ledger records blocked without formal authorization', 'evidence', `panim_haven-ledger-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 3. MEMORIAL COUNSELOR: GRIEF PROCESSING CHANGING
  {
    label: "Families used to take weeks. Now they're done in days and they're not finished — they're empty.",
    tags: ['Investigation', 'NPC', 'Grief', 'Ritual', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading grief manipulation');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Kaelas lowers his voice before he starts. "Families used to take weeks. Sometimes months. Now they're done in days, and they're not finished — they're empty. Anger becomes numbness. Loss becomes compliance." He pauses. "I brought it to the ritual authority. They said prolonged grieving was becoming spiritually inefficient. As if grief has a productivity measure." He looks toward the door. "Someone is teaching Panim Haven to mourn wrong, and calling it progress."`;
        G.stageProgress[1]++;
        addJournal('Memorial counselor revealed accelerated grief processing', 'evidence', `panim_haven-grief-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Kaelas goes still. "You're asking me to discuss how people grieve." His tone carries the specific weight of someone who has just decided something about you. "That's not a question for outsiders. It's not a question for anyone who doesn't carry loss themselves." He doesn't raise his voice. He ends the conversation by turning toward his next appointment. Word that you asked will move through the shrine community on its own.`;
        G.worldClocks.reverence++;
        addJournal('Memorial counselor reports your inquiry as culturally insensitive', 'complication', `panim_haven-grief-hostile-${G.dayCount}`);
      } else {
        G.lastResult = `Kaelas admits the timeline has compressed. "The ritual authority wants families moving forward faster. They say it's pastoral care." He says it like a man repeating a phrase he finds inadequate. He doesn't elaborate further. The discomfort is visible in how long he waits before saying anything else.`;
        addJournal('Memorial counselor confirmed accelerated grieving timeline', 'evidence', `panim_haven-grief-rushed-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 4. PROCESSIONAL COORDINATOR: ROUTE DIVERSIONS
  {
    label: "The processional routes changed three weeks ago. Every path now runs straight to the mediation courts.",
    tags: ['Investigation', 'NPC', 'Process', 'Routes', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading ritual route manipulation');
      G.stageProgress[1]++;

      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Elder Fareth glances at the route board before speaking. "Three weeks ago the primary routes changed. The paths through the memorial waystation and the offering halls — gone. Now every procession runs through the inner shrine and straight to the mediation courts." He touches the edge of the new map with one finger. "The old routes took longer. They passed through more places. These routes are shorter and they feel thin." He pulls his hand back. "I asked why. I was told that's not my concern anymore. The coordinator role used to mean I set the routes."`;
        G.stageProgress[1]++;
        addJournal('Coordinator revealed route diversion and authority stripping', 'evidence', `panim_haven-routes-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Elder Fareth looks at you for a moment before answering. "Route decisions belong to the ritual authority. That's the current structure." He doesn't add anything. He doesn't look comfortable having said even that much. The inquiry will likely find its way to whoever asked him to use that phrase.`;
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
    label: "People are returning to say their blessings didn't hold. The ritual authority says the blessings are working as designed.",
    tags: ['Investigation', 'NPC', 'Divine', 'Protection', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading divine protection corruption');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Meryl keeps her voice low and her back to the door. "People are returning. A merchant blessed for protection — robbed north of here within the week. A widow blessed for guidance through loss — she came back to say it made her numb, not steadier." She straightens a candle that doesn't need straightening. "I reported it. The ritual authority said the blessings were working as designed and people's expectations were the problem." She pauses. "I've administered blessings for eleven years. I know what a failing one looks like."`;
        G.stageProgress[1]++;
        addJournal('Chapel keeper revealed systematic blessing failure', 'evidence', `panim_haven-blessing-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Meryl turns from the candle rack. "You're asking me whether the blessings work." Her voice doesn't rise. "That's a question about whether this place is what it says it is." She waits for you to say something. When you don't, she tells you to leave. She stays watching the door after you're through it.`;
        G.worldClocks.reverence++;
        addJournal('Chapel keeper now hostile to blessing inquiry', 'complication', `panim_haven-blessing-hostile-${G.dayCount}`);
      } else {
        G.lastResult = `Meryl acknowledges that people have returned with complaints. "Some say the protection didn't hold. Maybe their faith wasn't strong going in." She uses the phrase like a door she's holding half-closed. The explanation is the one she was given, not the one she arrived at herself. The failures are real. The rationalization is layered over them.`;
        addJournal('Chapel keeper acknowledged blessing effectiveness concerns', 'evidence', `panim_haven-blessing-concern-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 6. RITUAL AUTHORITY: DOCTRINE CHANGES
  {
    label: "The ritual authority received sealed guidance from outside. They know the ritual structure precisely — not approximately.",
    tags: ['Investigation', 'NPC', 'Authority', 'Doctrine', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'confronting institutional authority');
      G.stageProgress[1]++;

      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Master Thiren takes a breath before answering. "There have been changes. Doctrine adapts." He stops, then continues more carefully: "Panim Haven has received guidance from outside. Sealed documents through shrine messengers. I don't know the origin. But whoever sends them knows our ritual structure precisely — not approximately, precisely. They know exactly which elements to adjust to produce different outcomes without breaking the visible form." His hands are flat on the desk. "I'm no longer certain we are adapting. I think we may be being rewritten."`;
        G.stageProgress[1]++;
        addJournal('Ritual authority revealed external guidance manipulation', 'evidence', `panim_haven-authority-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Master Thiren's tone flattens. "Shrine doctrine is not open to external inquiry. This conversation is now a matter of record." He produces a notation sheet without looking away from you. "Do not approach the shrine hierarchy again without written authorization from the regional shrine council." He writes while you're still in the room. The warning is formal. You have been formally warned.`;
        G.worldClocks.pressure++;
        addJournal('Ritual authority formally prohibits further shrine inquiry', 'complication', `panim_haven-authority-warning-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Thiren acknowledges that doctrine has shifted under "spiritual necessity." He offers that phrase and holds it there, not adding to it. He confirms the changes are deliberate, not a drift — chosen, implemented, monitored. The source of the necessity is not something he names. He knows you noticed that he didn't.`;
        addJournal('Ritual authority confirmed deliberate doctrine modification', 'evidence', `panim_haven-authority-deliberate-${G.dayCount}`);
      } else {
        G.lastResult = `Thiren looks at you the way you'd look at a door that opened from the wrong direction. "Doctrine belongs to the hierarchy. Changes are appropriate." He returns to his papers. The door to his office is open, which means the conversation is over. Nothing came back from this except the shape of a wall where a door should be.`;
        addJournal('Ritual authority blocked further questioning', 'evidence', `panim_haven-authority-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 7. INNKEEPER: GUEST PATTERNS AND SEALED LETTERS
  {
    label: "Northern couriers arrive every seven days, always sealed, always meeting the ritual authority. Different courier, same timing.",
    tags: ['Investigation', 'NPC', 'Commerce', 'Intelligence', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'tracing external communication');
      G.stageProgress[1]++;

      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Joseline leans over the bar. "Every seven days, northern courier. Always meets with the ritual authority. Always leaves sealed documents with shrine staff. Different courier each time — same route, same timing, same unmarked coin payment." She glances at the door. "One of them mentioned, offhand, that they come from a place interested in how Panim Haven serves faith. That was all. Then the shrine told me not to speak with couriers directly." She straightens. "Someone from outside is running something through this village, and the shrine is the entry point."`;
        G.stageProgress[1]++;
        addJournal('Innkeeper mapped external courier network to shrine', 'evidence', `panim_haven-couriers-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Joseline sets down the cup she was drying. "I don't discuss guests. That's not a principle I bend." She's not hostile — she's done with the conversation. The next time you come through that door she'll remember what you asked and measure everything else against it.`;
        G.worldClocks.watchfulness++;
        addJournal('Innkeeper now distrustful of your questions', 'complication', `panim_haven-innkeeper-hostile-${G.dayCount}`);
      } else {
        G.lastResult = `Joseline says northern visitors have been regular lately, and says it with slightly more certainty than the question required. "Business traffic." She doesn't elaborate. The word "regular" carries weight she isn't explaining. The pattern is there. She's not ready to describe its edges to a stranger.`;
        addJournal('Innkeeper acknowledged increased external visitor traffic', 'evidence', `panim_haven-innkeeper-traffic-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 8. MEDIATION OFFICIAL: CASE OUTCOMES RIGGED
  {
    label: "Northern traders win every merchant dispute. Inheritance cases transfer to outside buyers. The pattern is forty cases deep.",
    tags: ['Investigation', 'NPC', 'Justice', 'Corruption', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering mediation bias');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Veth pulls the case register and puts his finger on a column without speaking first. "Merchant disputes: northern trader wins, every time, past two months. Inheritance cases: property transfers to outside buyers. Family mediations where reconciliation was the likely outcome — they end in separation." He closes the register. "I can't prove a directive exists. But the pattern across forty cases doesn't happen by accident. The mediation system is producing someone else's preferred outcomes."`;
        G.stageProgress[1]++;
        addJournal('Mediator Veth revealed systematic outcome-bias pattern across 40 cases', 'evidence', `panim_haven-mediation-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Veth's posture changes before you finish the question. "Mediation records are sealed. You have no standing to review them." He writes the date at the top of a notation form. "This inquiry will be reported to the ritual authority." He doesn't look up while he writes. The formal note is already being drafted while you're still in the room.`;
        G.worldClocks.pressure++;
        addJournal('Mediation official reported inquiry breach to authority', 'complication', `panim_haven-mediation-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `You review a selection Veth permits and track outcome by party type. The decisions carry valid mediation reasoning in each case. But across the set, the same party types win at a rate that the individual case records don't explain. Someone with access to the scheduling system is touching something upstream of the decisions themselves.`;
        addJournal('Case review revealed possible systematic outcome bias', 'evidence', `panim_haven-mediation-bias-${G.dayCount}`);
      } else {
        G.lastResult = `The case folders stay on the shelf — close enough to read the spine labels, not close enough to open without standing Veth doesn't appear ready to grant. "Formal authorization, in writing, from the ritual authority." He's already back at his desk by the time the sentence ends. The authorization requirement isn't a hurdle he's inviting you to clear. It's a door he's closed from the inside. Nothing about his posture suggests it has another side.`;
        addJournal('Mediation case records blocked without authorization', 'evidence', `panim_haven-mediation-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== ARCHETYPE DEEP DIVES (8 CHOICES) ==========

  // 9. LORE TIER 1: RITUAL FORMULA ANALYSIS
  {
    label: "The original invocation asks for balance of divine and mortal will. The current version asks for appropriate divine resolution.",
    tags: ['Investigation', 'Lore', 'Magic', 'Ritual', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'ritual formula analysis');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The oldest texts and the current copies sit side by side. Invocations have been shortened — not translated, compressed. Protective components swapped for adjacent ones that read similarly in spoken form but carry different weight in the written registry. The original calls for "balance of divine and mortal will." The current version asks for "appropriate divine resolution." Three words changed. The entire orientation of the blessing shifted from mutual to prescribed. Someone has been editing the formulas to produce different outcomes from the same ritual form.`;
        G.stageProgress[1]++;
        addJournal('Lore analysis revealed formula tampering', 'evidence', `panim_haven-lore-formula-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The archive guardian appears before you reach the relevant shelf. "Those texts are restricted." The tone is not a warning — it's a final statement. You're out of the archive room before you can press further. The door closes with the sound of a latch dropping. You didn't get close enough to see whether the copy and the original matched.`;
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
    label: "Old doctrine: find the just outcome. New doctrine: find the efficient one. The primary texts haven't changed — the interpretation has.",
    tags: ['Investigation', 'Lore', 'Philosophy', 'Doctrine', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'tracing doctrine corruption');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The original doctrine of divine balance treated every person's need as equal weight in the mediation scale — the text is explicit about this. Recent theological commentary reframes balance as "appropriate hierarchy": certain needs carry more weight, and wisdom lies in knowing which to serve first. The system itself hasn't changed form. Its stated purpose has. Old doctrine: find the just outcome. New doctrine: find the efficient one. The rewrite is in the interpretation layer, where it's harder to point to as forgery.`;
        G.stageProgress[1]++;
        addJournal('Lore research revealed philosophical doctrine inversion', 'evidence', `panim_haven-lore-doctrine-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `A shrine messenger appears at the reading room door before you're done. "The hierarchy has noted your research focus." The message delivered, the messenger leaves. The wording is careful: not a prohibition, not a warning — a notification that you've been seen and categorized. The doctrine inquiry is now on someone's list.`;
        G.worldClocks.reverence++;
        addJournal('Shrine hierarchy alerted to doctrine research', 'complication', `panim_haven-lore-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Tracing the doctrine from primary texts to recent commentary shows a gradual shift in the interpretation layer. The primary texts haven't changed. The weight placed on specific passages has. Recent commentary emphasizes the hierarchy of needs in a way the original texts don't support. The doctrinal foundation is being used to justify outcomes the doctrine itself doesn't mandate.`;
        addJournal('Lore research confirmed doctrine interpretation shift', 'evidence', `panim_haven-lore-shift-${G.dayCount}`);
      } else {
        G.lastResult = `The theological texts are dense and the interpretive tradition is layered enough that distinguishing deliberate corruption from philosophical evolution requires a reference point you don't yet have. The shift is visible. Whether it was imposed or emerged is still open. That distinction matters for what it means to act on it. The name keeps appearing in unrelated offices — the doctrine commentary and the sealed courier guidance arrive through the same shrine messenger channel.`;
        addJournal('Doctrine interpretation analysis inconclusive', 'evidence', `panim_haven-lore-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 11. CRAFT TIER 1: OFFERING PREPARATION INSPECTION
  {
    label: "The offering materials pass a surface check. Each substitution passes a casual check. Together they corrupt everything.",
    tags: ['Investigation', 'Craft', 'Materials', 'Ritual', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
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
        G.lastResult = `The offering custodian appears at the door while you're still at the incense table. "This space is not for outside examination." She says it like a door closing, not a door opening. You're out before you can establish what the normal quality of the materials is supposed to look like. The preparation area is now off-limits and your presence in it has been noted.`;
        G.worldClocks.reverence++;
        addJournal('Offering custodian expelled you from preparation area', 'complication', `panim_haven-craft-expelled-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The preparation area shows recent substitution — the incense mix has been adjusted, the cloth supply replaced with a batch that reads close but not identical to the previous standard. The changes were made to maintain appearance while altering underlying composition. The spiritual properties of the offering materials are affected in ways the visible form doesn't reveal.`;
        addJournal('Craft analysis noted material quality degradation', 'evidence', `panim_haven-craft-quality-${G.dayCount}`);
      } else {
        G.lastResult = `The offering materials read as standard on surface examination. The incense burns within normal parameters. The cloth is the right color. But the preparation sequence shows minor variations from the documented protocol — small enough to explain away, consistent enough to be a pattern. Precise analysis would need reference samples from before the doctrine revision period.`;
        addJournal('Offering material analysis inconclusive', 'evidence', `panim_haven-craft-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 12. CRAFT TIER 2: MEDIATION LEDGER DOCUMENT ANALYSIS
  {
    label: "The binding threads on the replaced sections are newer than surrounding pages. Someone with document craft did this.",
    tags: ['Investigation', 'Craft', 'Forgery', 'Evidence', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
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
        G.lastResult = `Your handling of the ledger draws Thenim's attention before you've completed the second comparison. "That person is tampering with the records." He calls across the room while still moving toward you. The ritual authority arrives within minutes. You're standing in a room where the word "desecration" is being used with your name in the same sentence. Getting out cleanly requires more than you currently have available.`;
        G.worldClocks.reverence++;
        addJournal('You are accused of sacred record tampering', 'complication', `panim_haven-craft-accused-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Pages have been removed and replaced with skill — the binding repair is clean, the page edges trimmed to match surrounding stock. The work is above the level of a forger working under time pressure. Someone with sustained access and document craft removed sections and substituted new ones. The result survives a visual inspection. It doesn't survive this one.`;
        addJournal('Craft analysis confirmed expert document manipulation', 'evidence', `panim_haven-craft-manipulation-${G.dayCount}`);
      } else {
        G.lastResult = `The ledger construction requires reference materials you don't have on hand — comparative paper stock from the same period, ink aging charts, original binding thread samples. The inconsistencies are present: fiber texture variation, thread gauge differences at the spine. Enough to suspect substitution. Not enough to document it as forgery without the reference baseline.`;
        addJournal('Document authenticity analysis inconclusive', 'evidence', `panim_haven-craft-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 13. SURVIVAL TIER 1: ROUTE NETWORK ANALYSIS
  {
    label: "The messenger routes don't align with any official shrine business destination. Same paths, same timings, different messengers.",
    tags: ['Investigation', 'Survival', 'Routes', 'Movement', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'messenger route analysis');
      G.stageProgress[1]++;

      const result = rollD20('vigor', (G.skills.survival || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The messenger patterns map to a network. Documents exit Panim Haven northward — not by the main road but through secondary routes connecting the memorial waystations and offering halls, places where foot traffic reads as shrine business and attracts no additional scrutiny. Route workers name three locations that messengers visit on a regular schedule that doesn't appear in any official shrine documentation. Someone built a communication network using Panim Haven's sacred infrastructure as the cover layer.`;
        G.stageProgress[1]++;
        addJournal('Survival analysis mapped hidden messenger network', 'evidence', `panim_haven-survival-routes-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `A route worker intercepts you at the waystation junction. "The shrine notices when people follow the messengers." He doesn't ask your name. He doesn't need to — the report that goes in will describe what you were doing, not who you are. The surveillance attempt is logged. You've been tracked while tracking.`;
        G.worldClocks.watchfulness++;
        addJournal('Messenger surveillance reported to shrine hierarchy', 'complication', `panim_haven-survival-caught-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The messenger routes don't align with official shrine business destinations. Main roads are consistently avoided in favor of secondary paths between the waystations. The avoidance is practiced, not incidental — same paths, same timings, across different messengers. Whatever is being moved through these routes is being moved carefully.`;
        addJournal('Survival analysis noted unusual messenger route patterns', 'evidence', `panim_haven-survival-pattern-${G.dayCount}`);
      } else {
        G.lastResult = `The messengers move without pattern observable from a single position — route variation, timing variation, delivery window spread across the full day. Tracking them would require more positions than you can hold simultaneously, or a longer sustained observation period than today's window allows. The waystation network the messengers use is a fixed structure — the back rooms are accessible through the maintenance path the route workers use.`;
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
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering waystation stockpiles');
      G.stageProgress[1]++;

      const result = rollD20('vigor', (G.skills.survival || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The locked room in the second waystation holds nothing related to processional rest. Sealed document stacks, ink and writing materials, multiple sets of clothing in different regional styles, currency in at least three denominations. The storage is organized and regularly accessed — the documents are sorted, not piled. Someone has been running a logistics operation through Panim Haven's sacred waystation network for long enough to have developed an internal filing system. The sacred infrastructure is the cover. The cover is very good.`;
        G.stageProgress[1]++;
        addJournal('Survival analysis revealed waystation stockpile network', 'evidence', `panim_haven-survival-stockpile-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The shrine guards are waiting at the waystation exit. Someone inside reported the inspection before you finished it. "Sacred spaces aren't open for inspection without authorization." They don't touch you. They don't need to — the confrontation itself is the consequence, formal and visible, already logged by the time you reach the main road.`;        G.worldClocks.pressure++;
        addJournal('Shrine guards intercept you for waystation inspection', 'complication', `panim_haven-survival-caught-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The waystations carry more than processional rest supplies. Additional storage space has been created in the back rooms — built in, not improvised. The extra stores don't match a rest facility's needs: too many document supplies, not enough food and water. The function these rooms are serving is not the function they're labeled with.`;
        addJournal('Survival analysis found unauthorized waystation storage', 'evidence', `panim_haven-survival-storage-${G.dayCount}`);
      } else {
        G.lastResult = `The waystation supplies read as standard: water, basic food, candles, spare sandals. Nothing surfaces that contradicts the stated function. If there's a secondary purpose here, the concealment is better than a visual sweep will penetrate. This requires a different approach or a longer window.`;
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

      G.lastResult = `At the offering hall: "${selected}." Three different people, different tones — one certain, one hedging, one who said it and then walked away quickly. The specific claim varies. The direction of it doesn't. Panim Haven is circling something that's changed in the shrine, and the circling has a shape even when the words don't land cleanly.`;
      addJournal(`Street rumor gathered: "${selected}"`, 'evidence', `panim_haven-rumor-${G.dayCount}`);

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 16. INSTITUTIONAL CRACK: SHRINE WORKER DEFECTION
  {
    label: "One of the shrine workers knows the blessings changed. The fear in how they describe it is specific, not general.",
    tags: ['Investigation', 'Evidence', 'Witness', 'Defection', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'turning institutional witness');
      G.stageProgress[1]++;

      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Thenim finds you near the dock at the third hour. He's carrying a wrapped package and talks without preamble. "I'm done here. The blessings I'm giving aren't the blessings I was trained to give. The mediation outcomes are set before the cases open. The directives come from outside and nobody questions where." He holds out the package. "I've kept records. Formula changes, ledger alterations, external correspondence that directed shrine decisions. I can't name who's at the top. I can document that the shrine has been taken apart from the inside." He looks at the water. "I'm leaving tonight. This goes to someone who acts on it, or it disappears with me."`;
        G.stageProgress[1]++;
        addJournal('Shrine worker defected with institutional documentation', 'evidence', `panim_haven-defection-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The worker listens, nods once, and goes to find the ritual authority. Within the hour a complaint has been filed: you approached a shrine worker with the intent to undermine institutional loyalty. The phrasing in the report is precise and practiced — this worker has reported this type of approach before. You're now characterized as an active threat to shrine integrity rather than an outside observer.`;        G.worldClocks.pressure++;
        addJournal('You are reported as threat to shrine integrity', 'complication', `panim_haven-defection-caught-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `One worker stops before leaving. Doesn't name the doubts directly but describes them in circumference — questions about formula changes, timing of the ledger revisions, who authorized the route adjustments. Hints at documentation without producing it. Looks at the door twice during the conversation. The fear is specific, not general. They're close to the edge of something. They're not there yet.`;
        addJournal('Shrine worker shows defection potential but hesitates', 'evidence', `panim_haven-defection-close-${G.dayCount}`);
      } else {
        G.lastResult = `Every worker you approach gives the same answer in slightly different words: the shrine is functioning correctly, changes are pastoral responses to community need, external inquiry is not welcome. The consistency is trained, not spontaneous. No one will break from the institutional position today, even alone.`;
        addJournal('Shrine workers remain publicly loyal to institution', 'evidence', `panim_haven-defection-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 17. MEDIATION FAILURE: WRONGED FAMILY SPEAKS
  {
    label: "Every precedent was in her favor. The mediation official ruled against her. Her home sold within the month.",
    tags: ['Investigation', 'Evidence', 'Victim', 'Personal', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'gathering victim testimony');
      G.stageProgress[1]++;

      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The widow sits at her sister's table, which is not her own table anymore. "My husband's brother contested the will. Northern trader, came here for the case specifically. Every precedent was in my favor." She folds her hands. "The mediation official ruled against me. My home sold to a northern consortium within the month, for half its appraised value." She looks at the window. "I filed complaints. They were dismissed without review. I have the dismissal letters." She stands and retrieves them from a shelf. "The signature on each is the same name. One person closed all three."`;
        G.stageProgress[1]++;
        addJournal('Victim testimony detailed predetermied mediation manipulation', 'evidence', `panim_haven-victim-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The family you approach goes quiet when you explain why you're asking. One member stands up. "You're here to find out what we know before we can use it." They've been approached before — by people who gathered their account and used it to anticipate their next move. Word moves through the docks and the notice board area that you've been asking. The characterization attached to your name is not favorable.`;
        G.worldClocks.watchfulness++;
        addJournal('Victim now views you as complicit in mediation corruption', 'complication', `panim_haven-victim-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The family describes the case in detail: the evidence presented, the mediator's response, the outcome, and the timing of what happened to their property afterward. The account is coherent and specific. What it can't show is the mechanism — they can trace what happened to them but not the instruction that produced it. Compelling testimony. Incomplete proof.`;
        addJournal('Victim testimony gathered but proof remains circumstantial', 'evidence', `panim_haven-victim-testimony-${G.dayCount}`);
      } else {
        G.lastResult = `The families you approach aren't hostile — they're careful. The shrine's authority over dispute resolution means disputing its outcomes publicly carries its own risks. Each person you speak with gives you the shape of the conversation without the substance: "Things didn't go as expected." None of them will go further today, in daylight, in the village.`;
        addJournal('Victims remain silent about mediation failures', 'evidence', `panim_haven-victim-silent-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 18. LAYERED REVELATION: MEDIATION AS INSTRUMENT
  {
    label: "The system isn't broken. It's been reoriented. Everything points the same direction and always to the same beneficiaries.",
    tags: ['Investigation', 'Proof', 'Systematic', 'Conspiracy', 'Meaningful'],
    xpReward: 80,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(80, 'exposing mediation conspiracy');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Laid out together: forged ledger entries, doctrine philosophical shift, victim testimony, defected worker documentation, courier patterns, waystation stockpiles. The pattern resolves. Panim Haven's mediation system has been redesigned to transfer property and authority from local families to external stakeholders. The blessings have been weakened to create dependency on shrine intervention rather than independent protection. The processional reroutes created surveillance gaps for the logistics operation. Someone with precise knowledge of how each system functions built this — not by destroying what was there, but by reorienting it. The outcome isn't degradation. It's replacement with a structure that looks identical from the outside.`;
        G.stageProgress[1]++;
        addJournal('Conspiracy evidence compiled and systematized', 'evidence', `panim_haven-conspiracy-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `By the time you're halfway through compiling the evidence, someone has noticed the pattern of your requests across the shrine, the waystations, and the mediation offices. A message arrives at the inn — unsigned, left with the innkeeper. "You've been asking questions in too many places at once. Stop, or you'll find out what the mediation system does to cases involving people who create problems." The warning is not general. It references specific questions you asked today.`;        G.worldClocks.pressure++;
        addJournal('Conspiracy orchestrators directly warn you off', 'complication', `panim_haven-conspiracy-warning-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `The pieces align into a picture that's compelling without being conclusive. The mediation bias, the doctrine shift, the material substitutions, the waystation irregularities — they point in the same direction. What's still missing is the mechanism that connects them deliberately. Enough to know the system is compromised. Not enough to name who gave the order to compromise it.`;
        addJournal('Substantial corruption evidence compiled', 'evidence', `panim_haven-conspiracy-substantial-${G.dayCount}`);
      } else {
        G.lastResult = `The individual pieces are present but the connections between them are circumstantial at this stage. The pattern is visible — same direction, consistent pressure, same beneficiaries — but the thread that ties them to a single coordinating source isn't in hand yet. More ground needs covering before the picture can be assembled into something that withstands challenge.`;
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

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 13) {
        G.lastResult = `Forty-three cases in the past year: opened, assigned to senior mediators, closed within seventy-two hours. Status in each: "resolved per supplementary doctrine." No transcripts. No outcome records. No parties named. The supplementary doctrine citation traces to a doctrine revision that cites another doctrine revision — a circular reference that terminates at itself. These cases didn't reach resolution. They were removed from visibility using the appearance of resolution.`;
        if (!G.flags) G.flags = {};
        G.flags.found_bureau_ghost_cases = true;
        addJournal('Bureau register: 43 cases closed via circular doctrine citation — no records, no parties', 'evidence', `panim-bureau-${G.dayCount}`);
      } else {
        G.lastResult = `The register shows a cluster of cases with resolution codes you can't fully interpret without doctrine reference access. The closures are fast — significantly faster than the surrounding case set — and they cluster by time period rather than by case type. The pattern of fast closures is documentable even without knowing what the codes mean.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 20. CLUE: COASTAL ROUTE PASSAGE RECORDS
  {
    label: "Three vessels departed under Bureau escort during the ghost case windows. The cargo has left this jurisdiction.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'tracing coastal passage records');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      G.lastResult = `Three vessels in six months departed under Bureau escort classification — the designation reserved for transporting material evidence under active mediation. The case numbers assigned to those vessels are among the forty-three ghost cases: no records, no resolution, no parties named. The vessels left Panim Haven carrying something under official Bureau protection. Whatever it was has moved beyond this jurisdiction and outside any recoverable evidence chain.`;
      if (!G.flags) G.flags = {};
      G.flags.found_coastal_passage_records = true;
      addJournal('Harbor logs: three Bureau-escorted vessels departed during ghost case windows — cargo unknown, jurisdiction transferred', 'evidence', `panim-harbor-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 21. ARCHETYPE-GATED: READING THE RECKONING QUARTER
  {
    label: "The queue outside the Bureau hasn't moved in three hours. The wait is the answer — not a delay, a mechanism.",
    tags: ['Investigation', 'Archetype', 'Stage1', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'reading Reckoning Quarter');
      const arch = G.archetype && G.archetype.group;

      if (arch === 'combat') {
        G.lastResult = `The Bureau guards position themselves for coverage, not for assistance — near the entrances, angled toward the approaches. They're not hostile. They're watching. Their eyes track complainants entering the building the way you'd track someone whose intentions you haven't established. Whatever role they were originally assigned, they've been redirected to a different one.`;
      } else if (arch === 'magic') {
        G.lastResult = `The quarter's architecture channels sound toward the Bureau's upper windows — designed for public transparency, so proceedings could carry to the street. The windows are shuttered today. The acoustic geometry still works; there's simply nothing coming through it. The building was built to be heard. Someone decided it shouldn't be anymore and closed it from within.`;
      } else if (arch === 'stealth') {
        G.lastResult = `Two men walk the same irregular route through the quarter, twelve minutes apart, never crossing paths. No marks on their clothing — not Bureau guards. The pattern is a patrol. Civilian watchers running surveillance coverage outside the official perimeter, on a rotation that someone scheduled. The informal layer and the formal layer are being run separately.`;
      } else {
        G.lastResult = `The queue outside the Bureau hasn't moved in three hours. People sit on the steps or stand against the wall with the posture of people who have stopped expecting to be called. No one exits. No clerk appears. The wait is the answer — not a delay, a mechanism. People who come here enough times without result eventually stop coming. The Bureau's accessibility is managed through attrition.`;
      }
      addJournal('Reckoning Quarter: Bureau functioning as deterrent rather than service, unofficial surveillance active', 'evidence', `panim-quarter-read-${G.dayCount}`);
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

      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `Callow has been at the Panim Haven posting for four months. He speaks without preamble. "The Collegium received a formal complaint about Bureau case handling fourteen weeks ago. Received, logged, acknowledged, assigned to a review panel." He pauses. "That panel hasn't convened." He doesn't editorialize further — the arithmetic does it for him. He asks whether you've accessed the case register. When you describe the ghost closure pattern, he writes it down. "That will support the existing complaint file." His pen keeps moving.`;        if (!G.flags) G.flags = {};
        G.flags.met_oversight_collegium_panim = true;
        G.factionHostility.oversight_collegium += 1;
        addJournal('faction', 'Oversight Collegium observer Tren Callow: Bureau complaint review deliberately delayed, collecting supporting evidence', `panim-collegium-${G.dayCount}`);
      } else {
        G.lastResult = `Callow is professionally correct in every sentence. He can receive written complaints and issue receipt confirmations. He cannot discuss the status of ongoing review processes. He produces the complaint form without being asked. The Collegium process exists and is accessible. It is not currently producing anything.`;
        if (!G.flags) G.flags = {};
        G.flags.located_oversight_collegium_panim = true;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 23. ATMOSPHERE: TAZREN'S SHADOW
  {
    label: "Tazren's name appears in every pre-reform archive. It's absent from every current Bureau document. That absence required effort.",
    tags: ['WorldColor', 'Lore', 'Stage1', 'Meaningful'],
    xpReward: 52,
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
    label: "The retired Bureau head lives two streets from the Bureau. His name was deliberately removed from every current record.",
    tags: ['PersonalArc', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 72,
    failResult: 'This path is closed here, but someone from the Bureau era who can introduce you as trustworthy is the specific key Tazren\'s neighbors named — the archive clerk who still dusts the plaque knows which names survived the revision.',
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'finding Tazren');
      if (!G.flags) G.flags = {};

      const result = rollD20('vigor', (G.skills.survival || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `Tazren answers the door before you knock twice. He lives two streets from the Bureau and doesn't ask who you are or how you found him. He steps back to let you in. "The doctrine revision wasn't a reform. It was a transfer of ownership. I don't know to whom." He sets a cup down in front of you. "I left when I stopped recognizing the system I'd built." He keeps a copy of the pre-reform doctrine text on the shelf behind him — he touches the spine when he mentions it. He'll help. On his own terms. With his own limits, which he'll name when he reaches them.`;
        G.flags.met_tazren = true;
        addJournal('contact', 'Tazren found: former Bureau head, has pre-reform doctrine, willing to assist conditionally', `panim-tazren-found-${G.dayCount}`);
      } else {
        G.lastResult = `Tazren's neighbors confirm he's in the quarter but say he doesn't receive strangers. One of them says it the way people say things they've been asked to say. He's there. He's not accessible without an introduction — someone from the Bureau era who can place you as trustworthy. That introduction needs to be found first.`;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // 25. SOCIAL: THE CASE THAT WAS CLOSED YESTERDAY
  {
    label: "A case was closed yesterday under the ghost code. The complainant hasn't left yet. The window is narrow.",
    tags: ['Social', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 67,
    failResult: 'This path is closed here, but the Bureau closure process moved faster than expected — the forged release-of-claim signature is still something the harbor master may have a copy of if the property transfer required a maritime stamp.',
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(67, 'interviewing recent ghost case complainant');

      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 10) {
        G.lastResult = `Sera is still at the guesthouse — she hasn't processed what happened yet. She describes it in short sentences: land dispute, six weeks in the Bureau queue, yesterday she received a sealed letter and a small payment. "Resolved per supplementary doctrine. The case is closed." She holds the letter without opening it. When you ask, she hands it across. Release of claim form, signed in her name. She watches you read it. "I didn't sign that." Her handwriting is close but not hers — the loop on the final letter of her surname goes the wrong direction.`;
        if (!G.flags) G.flags = {};
        G.flags.met_sera_complainant = true;
        addJournal('contact', 'Complainant Sera: Bureau forged her signature on a release of claim form, case closed without her consent', `panim-sera-${G.dayCount}`);
      } else {
        G.lastResult = `The address takes time to locate, and the time matters. By the time you reach it, Sera is gone — she left Panim Haven the same morning the letter was delivered. The Bureau's closure process was fast enough to close the window before you or anyone else could reach her. She's outside the jurisdiction now. So is her testimony.`;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // 26. SHADOW RIVAL INTRO
  {
    label: "Tazren mentions a visitor came to see him last month — someone who claimed to be researching Bureau reform history.",
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
        G.lastResult = `"They asked about the pre-reform doctrine text," Tazren says. "How many copies. Whether any were held outside institutional archives." He taps the volume on the shelf. "They weren't studying the doctrine. They were counting how many copies of the evidence exist and where they're held. A document inventory, not a research visit."`;
      } else if (arch === 'stealth') {
        G.lastResult = `"They asked almost nothing," Tazren says. "Mostly listened. Let silences sit until I filled them. By the end I'd told them everything I know without being asked directly." He doesn't look embarrassed — he looks like a man who has had time to analyze what happened. "That's a practiced technique. Not improvised. Someone trained them to harvest information without leaving a record of what they were after."`;
      } else {
        G.lastResult = `"They offered to help," Tazren says. "Restoration of my name in Bureau records. Formal recognition of my service." He turns his cup. "Two years ago that would have been enough to close the conversation." He pauses. "I said no. It felt like the kind of gift that becomes a debt the moment you take it." Someone identified exactly what he wanted most and offered it. He recognized the shape of the offer for what it was.`;
      }

      G.lastResult += ` They were here before you. They got what you came for.`;
      if (!G.rivalId) {
        if (arch === 'combat') G.rivalId = 'warden_captain';
        else if (arch === 'magic') G.rivalId = 'archivist_veld';
        else if (arch === 'stealth') G.rivalId = 'shadow_broker';
        else G.rivalId = 'provost_lenn';
      }
      G.flags.stage1_rival_seeded = true;
      addJournal('warning', 'Rival-adjacent operative interviewed Tazren before you — expert social engineering, preceded your inquiry', `panim-rival-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },
  // TYPE: INFORMATION — WORLD COLOR VIGNETTE
  {
    label: "The offering smoke from Panim Haven's memorial halls carries in a specific direction every morning regardless of the wind.",
    tags: ['WorldColor', 'Atmosphere', 'Stage1'],
    xpReward: 38,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(38, 'observing memorial hall offering smoke');
      G.lastResult = `The memorial halls at Panim Haven burn slow-smoke offerings at dawn — a combination of dried herbs and waxed cord that the attendants set before the first processional. The smoke rises and then drifts consistently north regardless of the morning air, which the attendants attribute to the hall architecture directing air currents. The effect is deliberate: the smoke visible from the northern approach road marks the haven as active from a distance, assuring travelers the halls are staffed before they arrive. The smoke is also the signal to the waystation network that the daily route is open. Two functions, one flame, visible to everyone and read differently by those who know.`;
      G.recentOutcomeType = 'observe'; maybeStageAdvance();
    }
  },

  // TYPE: INFORMATION — ARCHETYPE GATE (Saint — Support family)
  {
    label: "The blessings distributed at Panim Haven have been systematically weakened — the doctrine that explains the change is recent.",
    tags: ['Information', 'ArchetypeGate', 'Stage1'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      const family = typeof getArchetypeFamily === 'function' ? getArchetypeFamily(G.archetype) : '';
      if (family !== 'Support') {
        G.lastResult = `The blessing materials distributed at Panim Haven's processionals have changed in composition — the practitioners mention it as a doctrinal refinement. Without specific knowledge of how blessing materials function, the change reads as administrative.`;
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
window.PANIM_HAVEN_STAGE1_ENRICHED_CHOICES = PANIM_HAVEN_STAGE1_ENRICHED_CHOICES;
