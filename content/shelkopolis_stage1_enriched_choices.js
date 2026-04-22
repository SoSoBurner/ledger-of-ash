/**
 * SHELKOPOLIS STAGE 1 ENRICHED MEANINGFUL CHOICES
 * 20 deeply grounded investigation paths tied to NPC work and locality tensions
 * Generated for: Trade vs dignity, refinement vs necessity, public harmony vs covert rivalry
 * Each choice: 60-80 XP, grounded in specific NPC perspective, layered wrongness reveal
 */

const SHELKOPOLIS_STAGE1_ENRICHED_CHOICES = [
  // ========== NPC-GROUNDED CHAINS (8 CHOICES) ==========
  
  // 1. INNKEEPER: GUEST PATTERNS
  {
    label: "Ask the Amber Fountain innkeeper about recent guests — who's stayed, and has anything felt off about their requests?",
    tags: ['Investigation', 'NPC', 'Observation', 'Intelligence', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'gathering intelligence from trusted source');
      G.stageProgress[1]++;

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      const target = 11 + Math.max(0, G.worldClocks.pressure);

      if (result.isCrit) {
        G.lastResult = `Marta sets a cup down before she speaks. "Three guests, different regions, same week. Each asked about northern passage in the same careful way — not curious, rehearsed. All paid in new coin, no estate marks. All left sealed letters at the Silkweaver's Chapel." She wipes the bar surface that doesn't need wiping. "Twenty-two years behind this counter. I know coordination when it sleeps in my rooms." She's told you everything she knows, and you notice she doesn't ask what you'll do with it.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Innkeeper flagged unnatural guest coordination', `shelkopolis-innkeeper-guests-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Marta stops polishing the counter. She doesn't answer — she moves. Refills a cup at the far end of the bar, exchanges four words with a dockworker, adjusts the lamp by the door. The Amber Fountain fills around you and your question. When you finally leave, the coal-smoke smell from the street feels cleaner than the careful silence you walked out of. Whatever she tracks in that inn, she's decided you're not safe to share it with.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Innkeeper went silent — pushed too hard into private ground', `shelkopolis-innkeeper-hostile-${G.dayCount}`);
      } else {
        G.lastResult = `Marta leans on the counter and keeps her voice low under the noise of the common room. One guest paid triple for the room that faces the alley, not the street. Another left before dawn and slipped an extra coin under the door to ensure no one noted the hour. "I don't pry," she says. "But I notice." The lamplight catches the ledger page open behind her — she's already written it down somewhere.`;
        addJournal('investigation', 'Innkeeper noticed unusual guest discretion', `shelkopolis-innkeeper-caution-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 2. INNKEEPER: SEALED LETTERS
  {
    label: "Investigate the pattern of sealed letters left at Silkweaver's Chapel — who delivers them, who receives them, what's the frequency?",
    tags: ['Investigation', 'NPC', 'Evidence', 'Mystery', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering covert communication network');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      
      if (result.isCrit || (result.total >= 13 && !result.isFumble)) {
        G.lastResult = `Brother Aldwin folds his hands on the lectern before he speaks. Twice a week — Thursdays and Sundays after vespers — a veiled figure collects the letters. Northern trade-tongue. No names. The wax seals carry no house crest. He admits the letters began arriving the same month the evening blessings started requiring a second repetition to hold. "I told myself it was coincidence," he says. The wax smell still clings to the alcove where they're left.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Sealed letter network mapped to chapel intermediary', `shelkopolis-letters-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Brother Aldwin receives your questions with the full warmth of the chapel's public face. He walks you to the door himself, offers a traveling blessing, wishes you safe passage. The wax-and-stone smell of the chapel follows you out. You're three streets away before you remember: there was a novice at a writing desk in the side alcove the entire time. You don't know what was recorded. The chapel didn't need to ask you to leave. It simply wrote down that you came.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Chapel clerk logged your inquiry — visit officially noted', `shelkopolis-chapel-alert-${G.dayCount}`);
      } else {
        G.lastResult = `Brother Aldwin confirms letters pass through the chapel — private correspondence for traveling merchants, he says, a service the chapel has offered for generations. His hands stay folded when he says it. He doesn't look at the alcove. He doesn't need to. Whatever the full arrangement is, he's decided the public version is the only one you'll hear today.`;
        addJournal('investigation', 'Chapel involved in letter routing but details refused', `shelkopolis-letters-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 3. TAILOR: PATTERN DESIGNS DISAPPEARING
  {
    label: "Visit the tailor shops in Verdant Row — ask about the sudden disappearance of certain fabric patterns and design commissions.",
    tags: ['Investigation', 'NPC', 'Craft', 'Trade', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading commercial disruption');
      G.stageProgress[1]++;

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Sereth pours without being asked. "Verdant threadweave, twelve bolts — six weeks of work per commission." He spreads three order slips on the cutting table. All the same pattern. All paid in full. None collected. He taps the fish-salt smell of the harbor that comes through his open window. "The harbor's full of buyers who want this cloth and can't get it. Meanwhile I've been blocked from weaving it for anyone else for three months. Someone is commissioning work specifically so it cannot be commissioned by others."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Tailor identified pattern commissioning as deliberate interference', `shelkopolis-tailor-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Sereth talks for twenty minutes — seasonal variation, guild quotas, the way autumn always shifts estate commissions toward heavier cloth. His hands never leave the fabric he's cutting. He doesn't pause, doesn't deflect, doesn't look up. When you reach the door, you have a complete education in Verdant Row's commission cycle and nothing else. The cut fabric falls in perfect lines behind him. He knew what you were asking. He answered something else with great precision.`;
        addJournal('complication', 'Tailor gave polished non-answer — probe clearly identified', `shelkopolis-tailor-silent-${G.dayCount}`);
      } else {
        G.lastResult = `Sereth mentions it sideways, the way tailors talk about money — obliquely, while measuring something else. Three commissions this season, high coin, abandoned before the first fitting. "It happens," he says. Then: "Not three times." He goes back to his pins. He hasn't decided yet whether you're someone he can say more to.`;
        addJournal('investigation', 'Tailor acknowledged unusual commission abandonment', `shelkopolis-tailor-pattern-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 4. CLERK/RECORD KEEPER: LEDGER DISCREPANCIES
  {
    label: "Access the trade registry at the Shelkopolis merchant house — cross-reference recent commodity ledgers for missing entries or altered records.",
    tags: ['Investigation', 'NPC', 'Records', 'Bureaucracy', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering administrative concealment');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      
      if (result.isCrit) {
        G.lastResult = `Thom pulls the ledger and keeps his voice barely above the scratch of quills elsewhere in the room. He runs his finger down the column and stops. Silkwood shipments from the northern territories — steady for four years, then gone. Not marked declined or delayed. The entries are simply absent, three weeks back, the ink around the gap undisturbed and clean. "Erasures leave a shadow," he says. "This leaves nothing. Whoever did this had the original, not a copy." He closes the book before anyone passes the door.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Clerk revealed three-week gap in northern trade records', `shelkopolis-ledger-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Thom opens three volumes. He is genuinely helpful — dates, authorization codes, shipment origins, the full column of northern silkwood entries right up to where they stop. You get real information. Then you catch his eyes tracking which line you're reading. He's not helping you understand the ledger. He's cataloguing what you now know. You leave with evidence and the certainty that before the lamplight shifts in this building, someone will be told exactly which pages you stopped on.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Learned real evidence — but Thom marked exactly what you found', `shelkopolis-merchant-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Thom allows access but stays close. The pages for the autumn trade season show ghosts — the slight bowing of the binding where sheets once sat. Removed cleanly, not torn. He doesn't comment on it. When you point to the gap, he tilts his head as though he is seeing it for the first time, which he is not.`;
        addJournal('investigation', 'Clerk confirmed deliberate ledger removal pattern', `shelkopolis-ledger-removed-${G.dayCount}`);
      } else {
        G.lastResult = `Thom straightens a stack of already-straight papers and explains that registry access requires a stamped request from the Iron Accord, countersigned by a house advocate. He says it pleasantly. There's a lamplight smell of tallow and old ink in the room, and none of it belongs to you without the paperwork.`;
        addJournal('investigation', 'Merchant house records inaccessible without formal authorization', `shelkopolis-ledger-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 5. SHRINE HELPER: BLESSING EFFECTS DEGRADING
  {
    label: "Consult with shrine workers about changes in ritual effectiveness — are blessings weaker? Are wards degrading?",
    tags: ['Investigation', 'NPC', 'Divine', 'Ritual', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading spiritual corruption');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Sister Velda glances toward the chapel door before she answers. The wax on the floor stones is fresh — they've been relaying the protection marks more often. "Forty percent more ritual repetition just to hold the same coverage." Her voice drops. "The formulas are unchanged. The faith is as strong as it's been. But something is pulling against the work from outside. We renew a ward at dawn, and by midday the edges are soft again." She folds her hands. The candles in the alcove behind her burn a quarter-inch faster than they should.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Shrine worker revealed systematic blessing degradation', `shelkopolis-blessing-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Sister Velda gives you an hour. Renewal cycles, protection radius, the seasonal cadence of blessings going back thirty years — she recites it with the confidence of someone who has said it many times. The wax smell of the chapel floor and the warmth of the candles make the morning pass quickly. It's only outside, in the coal-smoke of the street, that you realize: every figure she cited matched the documentation from three years ago. The shrine fed you its archived baseline. The morning is gone.`;
        G.worldClocks.reverence++;
        addJournal('complication', 'Shrine fed false baseline data — wasted morning, investigation window lost', `shelkopolis-shrine-hostile-${G.dayCount}`);
      } else {
        G.lastResult = `The shrine worker admits the renewal schedule has tightened. "Seasonal," she says, though she says it toward the floor. The wax on the chapel stones near the main ward-mark is newer than the surrounding stone — relaid recently and more than once. She won't elaborate, but the floor says enough.`;
        addJournal('investigation', 'Shrine worker confirmed increased blessing maintenance needs', `shelkopolis-blessing-strain-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 6. MARKET BROKER: TRADE FLOW CHANGES
  {
    label: "Question market brokers about recent commodity flow disruptions — what goods are scarce, what routes are blocked, what's changed in the supply chain?",
    tags: ['Investigation', 'NPC', 'Commerce', 'Economics', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'deciphering economic pressure');
      G.stageProgress[1]++;

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + (G.skills.insight || 0) / 2 + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Kaen steers you to the far end of the stall, away from the open row. "Three weeks. No northern silkwood. Not delayed — stopped." He keeps his voice below the market noise. "The shortfall is too clean. One supplier goes quiet, another follows the same week. That doesn't happen by weather or road. Someone with reach into the northern territories is holding the supply off Verdant Row deliberately." The fish-salt smell from the harbor district drifts through. "When the primary trade good dries up, the estates start owing favors to whoever still has it."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Broker mapped deliberate supply chain isolation', `shelkopolis-broker-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Kaen sets down his chalk and looks at you directly. "I don't talk market conditions with people who ask the way you just asked." He turns back to his tally board. By the time you've reached the end of Verdant Row, two other brokers have found reasons to be busy. The market knows how to close without making a sound.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Broker warned other merchants of your inquiry', `shelkopolis-broker-alert-${G.dayCount}`);
      } else {
        G.lastResult = `Kaen shrugs and marks something on his tally board. Tighter than usual — that's all he'll say about silkwood, and he says it without looking up. The board shows three blank lines where supplier names should be. He doesn't explain the blanks, and he doesn't expect you to stop noticing them.`;
        addJournal('investigation', 'Broker confirmed silkwood supply shortage', `shelkopolis-broker-supply-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 7. PATROL CAPTAIN: ENFORCEMENT PATTERN SHIFTS
  {
    label: "Speak with a patrol captain about recent enforcement changes — are patrols rotating differently, are certain neighborhoods being avoided or over-policed?",
    tags: ['Investigation', 'NPC', 'Enforcement', 'Authority', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading enforcement reallocation');
      G.stageProgress[1]++;

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Thorne wraps both hands around his cup before he starts. "Orders shifted twice in two weeks. Ironspool district — we pull back at nightfall now. 'Resource optimization.' Nobody in the lower ranks believes that." He keeps his voice level, but his thumb taps the table once. "Temple district doubled. No declared threat. Someone above the garrison commander is repositioning us, and the commander is letting them." He drains the cup. He knows he's told you something that can't be untold, and he's not sure yet if that was a mistake.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Patrol captain revealed re-orchestrated garrison positioning', `shelkopolis-patrol-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Thorne goes still. Not angry — still, the way a gate goes still when it locks. "Garrison operations aren't a topic for this conversation." He sets his cup down and straightens his collar. Two soldiers at the next table look up. You're not threatened, exactly. But the room has shifted, and the coal-smoke smell of the street outside suddenly seems worth walking toward.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'City guard now viewing you as potential threat', `shelkopolis-patrol-hostile-${G.dayCount}`);
      } else {
        G.lastResult = `Thorne grants you "operational priorities" and nothing else. He says it like a door closing — polite, final, framed in procedure. The patrol rotation board on the wall behind him shows three crossings-out in the Ironspool column, but he doesn't turn to look at it while he talks.`;
        addJournal('investigation', 'Patrol captain confirmed shift in garrison priorities', `shelkopolis-patrol-shift-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 8. CHAPEL WORKER: FAITH AND COERCION
  {
    label: "Speak confidentially with a chapel worker about whether people's faith feels forced or coerced lately — are confession patterns changing?",
    tags: ['Investigation', 'NPC', 'Faith', 'Psychology', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering spiritual coercion');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Aldwin steps away from the nave before he answers. The wax-and-stone smell of the chapel is heavier here, away from the door. "The confessions are different. People are not confessing wrongs — they're confessing fear. Of being watched, of pressure they can't name, of expectations no one has spoken aloud." He smooths the front of his robe with both hands. "The faith hasn't weakened. But it's being pressed on from somewhere outside it, and what comes through the confession gate now is mostly people trying to understand why they're afraid."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Chapel worker revealed coerced faith patterns in confessions', `shelkopolis-faith-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Aldwin draws himself upright. The candles in the alcove behind him make his shadow large on the chapel wall. "You are asking me to describe the interior of confession. I will not. Leave, or I will bring this to the shrine master before you reach the street." The door is three steps away. The wax-sealed record book on the table beside him is already open to today's date.`;
        G.worldClocks.reverence++;
        addJournal('complication', 'Chapel worker will report your violation of sacred space', `shelkopolis-chapel-hostile-${G.dayCount}`);
      } else {
        G.lastResult = `Aldwin sits with the question longer than he needs to. "More anxious," he finally says. "People are carrying something they haven't named yet." He smooths his robe and doesn't add to it. Whatever the hierarchy has told him to share, that's the edge of it.`;
        addJournal('investigation', 'Chapel worker noted increased anxiety in congregants', `shelkopolis-faith-anxiety-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== ARCHETYPE DEEP DIVES (8 CHOICES) ==========
  
  // 9. COMBAT TIER 1: GARRISON STRUCTURE ANOMALIES
  {
    label: "Analyze the Shelkopolis garrison's defensive structure — are weapons stores being relocated, or are fortifications being modified?",
    tags: ['Investigation', 'Combat', 'Military', 'Anomaly', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'military structural analysis');
      G.stageProgress[1]++;

      const result = rollD20('survival', (G.skills.survival || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The relocation pattern reads wrong the moment you walk the perimeter. Weapon stores pulled back from the trade-district wall — that wall is now soft. Reinforcement concentrated around the administrative quarter and registry buildings. No military logic justifies that exchange unless you're not trying to protect the city from outside. The garrison has been rearranged to control internal movement and leave specific districts undefended. Someone gave those orders, and the garrison followed them without apparent question.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Combat analysis revealed deliberate garrison restructuring', `shelkopolis-garrison-struct-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `A guard intercepts you near the second watch post. He doesn't raise his voice. He asks your business, writes something in his pocket ledger, and tells you the perimeter is restricted to authorized personnel. By the time you've backed away, two more guards have repositioned. You're logged, dated, and noted. The garrison doesn't need to detain you to make the point.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Garrison guards alerted to reconnaissance attempt', `shelkopolis-garrison-alert-${G.dayCount}`);
      } else {
        G.lastResult = `The fortifications near the trade district show fresh mortar on old stonework — reinforcement, or the opposite. The sight lines don't match a standard defensive rotation. Something's been adjusted in the last few weeks, but the full pattern stays just out of reach from street level.`;
        addJournal('investigation', 'Combat analysis noted unexplained recent fortification changes', `shelkopolis-garrison-changes-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 10. COMBAT TIER 2: SUPPLY LOG DISCREPANCIES
  {
    label: "Obtain access to garrison supply logs — are weapons, grain, or medical stores being secretly transferred or depleted?",
    tags: ['Investigation', 'Combat', 'Supply', 'Logistics', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'military logistics analysis');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The quartermaster pours a second cup before he pulls the ledger. Weapons transfers — marked "training surplus" — routed to an unmarked Ironspool warehouse over six weeks. The numbers are wrong for any standard rotation; they're right for stocking a secondary armory. "I was told tactical security." He taps the column with one finger. "But the garrison commander didn't sign these. I don't know who did. I stopped asking." He closes the ledger and leaves his hand resting on the cover.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Quartermaster revealed off-books weapons redistribution', `shelkopolis-supply-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The quartermaster closes the ledger before you've finished your question. He doesn't raise his voice — he picks up a writing token and sets it beside his ink pot, which is a way of saying he's about to record something. By nightfall, the garrison commander knows someone came asking about supply logs. The garrison will remember your face.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Garrison commander personally aware of your inquiry', `shelkopolis-commander-alert-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `The supply logs open to the autumn columns. Several transfer entries are marked "approved redistribution" with no destination listed — just a reference number that doesn't match any warehouse in the standard registry. The coal-smoke smell of the garrison office hangs flat in the air while you copy the reference numbers down. They mean something to someone.`;
        addJournal('investigation', 'Supply logs show signs of deliberate obfuscation', `shelkopolis-supply-obfuscated-${G.dayCount}`);
      } else {
        G.lastResult = `The quartermaster recites the access policy without looking up: garrison officers only, countersigned request, three-day processing. He's not hostile. He's a wall shaped like a man doing his job.`;
        addJournal('investigation', 'Supply logs blocked without military authorization', `shelkopolis-supply-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 11. MAGIC TIER 1: WARD PLACEMENTS ALTERED
  {
    label: "Read the arcane architecture of Shelkopolis — have protective ward placements shifted, or are new wards being installed in unusual locations?",
    tags: ['Investigation', 'Magic', 'Wards', 'Arcane', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'arcane architecture analysis');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The old trade-route wards are thin — not decayed, pulled. Someone drew the coverage deliberately inward. What replaced them clusters tight around the administrative quarter and garrison walls, but the geometry is wrong for defense. A ward built to keep threats out faces outward. These face inward. The entire lattice has been inverted: the new architecture constrains movement within Shelkopolis rather than guarding its perimeter. Whoever rebuilt this understood the original structure intimately enough to reverse it without collapsing it.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Magic analysis revealed inverted ward architecture', `shelkopolis-wards-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The probe finds a watcher-thread woven into the ward surface — passive, invisible until touched. It activates the moment you press. Somewhere in the chapel network, a monitoring sigil records the contact. You pull back cleanly but the record exists. The shrine will know that someone with enough knowledge to read ward architecture tried to do so this morning, at this location.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Shrine magical alarm triggered by ward probe', `shelkopolis-ward-alarm-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The ward coverage isn't uniform anymore. Trade routes and market squares run thin; the administrative buildings hold the old density. The redistribution is recent — the seam where old coverage ends and new begins still carries the faint residue of a deliberate cut. Someone rerouted the protection, and the city's merchants are on the unguarded side of that line.`;
        addJournal('investigation', 'Magic analysis noted uneven ward redistribution pattern', `shelkopolis-wards-uneven-${G.dayCount}`);
      } else {
        G.lastResult = `The ward structure is legible in outline but not in detail. Something has changed in the layering — the signatures don't match the chapel's public records of what should be here. The specifics stay just past your reach.`;
        addJournal('investigation', 'Ward modifications detected but details unclear', `shelkopolis-wards-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 12. MAGIC TIER 2: RITUAL FORMULA CORRUPTION
  {
    label: "Study ritual formulas used by the shrine — have the underlying magical structures been altered, or are component ratios changing?",
    tags: ['Investigation', 'Magic', 'Ritual', 'Corruption', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering ritual sabotage');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Sister Velda opens the ritual books with her palms flat on the cover first — a chapel habit, not a gesture toward you. The component measurements have been altered in fractions. Ingredient ratios shifted by amounts too small to trigger a visible failure, large enough to erode efficacy over months. The wax smell of the chapel is heavy in the small room. "I thought I was misreading them," she says quietly. Whoever made these changes understood the formulas well enough to know exactly how little to change.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Magic analysis revealed systematic ritual formula corruption', `shelkopolis-ritual-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The shrine does not argue with you. A senior keeper steps forward, says the ritual books are consecrated property, and asks you to leave. Three junior workers position themselves between you and the reading alcove without being directed. The chapel closes like a hand. Outside, the stone steps are warm from morning sun and completely unhelpful.`;
        G.worldClocks.reverence++;
        addJournal('complication', 'Shrine vowed to obstruct future inquiries', `shelkopolis-ritual-blocked-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The formula pages Velda allows you to see show minor ratio variations — small enough to be transcription drift, specific enough to feel intentional. Without an archived copy from two years prior, you cannot prove which it is. The chapel smells of wax and old incense and provides no further access today.`;
        addJournal('investigation', 'Ritual formulas show signs of modification', `shelkopolis-ritual-altered-${G.dayCount}`);
      } else {
        G.lastResult = `The formulas are available but dense — layered in shrine notation that takes years to read fluently. Something in the component columns sits wrong, but the specifics stay behind the language barrier.`;
        addJournal('investigation', 'Ritual access granted but formulas too complex to analyze', `shelkopolis-ritual-complex-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 13. STEALTH TIER 1: UNGUARDED PASSAGES CLOSING
  {
    label: "Map the hidden routes and blind angles through Shelkopolis — are escape passages being sealed, or are new surveillance points being installed?",
    tags: ['Investigation', 'Stealth', 'Routes', 'Surveillance', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'covert route mapping');
      G.stageProgress[1]++;

      const result = rollD20('stealth', (G.skills.stealth || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Three Verdant Row passages that used to run clear are blocked — not collapsed, filled. Rubble placed with care, construction framing used as cover. New guard posts sit at the junction points that used to be blind, positioned obliquely so they're not obvious until you're already in the choke. Every old escape line through the central district now runs through a watched point. Someone mapped the city's unmonitored paths and closed them one by one. Moving quietly through Shelkopolis now means moving where you're meant to be seen.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Stealth analysis revealed systematic route closure', `shelkopolis-routes-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `A guard steps out of a recessed doorway — not a patrol route, a stationary post in a place that had no post last month. He doesn't draw anything. He just records you: your direction, your pace, your approximate description. By the time you've cleared the block, someone in the garrison has a note with your name on it, or close enough.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Your covert movement reported to patrol command', `shelkopolis-route-caught-${G.dayCount}`);
      } else {
        G.lastResult = `Two passages through the tannery district that used to cut clean are partially blocked — recent stonework, no signage. You find alternate lines, but they're longer and exposed. The city's quiet routes are getting narrower.`;
        addJournal('investigation', 'Stealth mapping confirmed recent route restrictions', `shelkopolis-routes-restricted-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 14. STEALTH TIER 2: INFORMATION NETWORKS TIGHTENING
  {
    label: "Infiltrate the information network of Shelkopolis — are street informants being silenced, or are whisper chains being monitored?",
    tags: ['Investigation', 'Stealth', 'Intelligence', 'Networks', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'penetrating surveillance network');
      G.stageProgress[1]++;

      const result = rollD20('stealth', (G.skills.stealth || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Crow keeps walking while he talks — an old habit. "The network's still there. It just doesn't move the same topics anymore." He describes informants who spoke too freely about northern trade routes or garrison orders: gone for three or four days, back afterward with a new policy about what they discuss. No visible enforcement. No garrison involvement. "Someone else is doing it. Someone with reach and patience." He glances at the coal-smoke haze above the tannery district. "The city still talks. Just not about certain things."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Stealth infiltration revealed suppressed information network', `shelkopolis-info-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Three people you approach go quiet in the same way — not rude, just finished. By evening, a dockworker you've never spoken to crosses the street to avoid you. The network didn't confront you. It simply passed a description and a recommendation. The street doesn't need to explain itself to make you irrelevant to it.`;
        G.worldClocks.isolation++;
        addJournal('complication', 'Street informants now view you as hostile', `shelkopolis-info-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Two informants confirm things have shifted — shorter answers, more glances toward doorways. One says he stopped carrying certain information "about a month ago." He doesn't say why. The network is still running. It's just running with topics removed, like a market where certain stalls are always covered.`;
        addJournal('investigation', 'Information network confirmed to be operating under constraint', `shelkopolis-info-constrained-${G.dayCount}`);
      } else {
        G.lastResult = `The street's available but not open. Informants greet you and say nothing useful. You haven't earned the currency that unlocks this layer yet.`;
        addJournal('investigation', 'Information network inaccessible without deeper trust', `shelkopolis-info-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 15. SUPPORT TIER 1: SOCIAL FABRIC DEGRADING
  {
    label: "Study community bonds in Shelkopolis — are traditional gathering places being avoided, or are social networks fraying?",
    tags: ['Investigation', 'Support', 'Community', 'Social', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'community analysis');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The Amber Fountain used to host the ward councils — Marta still has the bench arrangement for it, shoved against the wall now. The market runs transaction to transaction without the sideways conversations that used to slow it down. Three families you watch in the square near the chapel split off before they would have before: a nod, a word, then separate directions. Nobody has forbidden gathering. Nobody needed to. The pressure is diffuse and sourceless, and the city has learned to avoid what it can't name.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Support analysis revealed systematic social isolation', `shelkopolis-social-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Two people you speak with give you the same look — not hostile, measuring. A third ends the conversation by remembering somewhere to be. In a city already pulling inward, your questions about community read as surveillance. You've made yourself part of the problem you were trying to map.`;
        G.worldClocks.isolation++;
        addJournal('complication', 'Community now views you with suspicion', `shelkopolis-social-hostile-${G.dayCount}`);
      } else {
        G.lastResult = `The Amber Fountain is quieter than the hour warrants. The market voices are lower. In the square by the chapel, a group of laborers who would ordinarily share a bench eat separately, two feet apart, not speaking. The change is everywhere and invisible, like the tannery smell — you only notice it when you stop to look.`;
        addJournal('investigation', 'Community patterns show reduced social interaction', `shelkopolis-social-quiet-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 16. SUPPORT TIER 2: TRUST EROSION AND FEAR MAPPING
  {
    label: "Document the specific fears and broken relationships in Shelkopolis — who's afraid of whom, and what promises have been broken?",
    tags: ['Investigation', 'Support', 'Fear', 'Trust', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'mapping institutional distrust');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `A wool merchant won't share a table with the silk broker he's traded alongside for eleven years — not a quarrel, a precaution. Two artisan families who split a kiln for a decade stopped sharing it in autumn; neither says why. The shrine no longer draws people who linger. The garrison and the civilian quarter nod and don't speak. The fractures are everywhere and nobody made a single dramatic move. Someone introduced just enough uncertainty — a rumor here, a consequence there — and let the city do the rest. Shelkopolis is breaking itself from the inside.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Support analysis mapped weaponized distrust network', `shelkopolis-trust-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `In a city already afraid of being overheard, your questions about who fears whom land exactly wrong. Three separate people end conversations quickly. By nightfall, the Iron Accord registry has a note — not a report, a note — that someone was asking unusual questions in the market district. The pressure clock moves.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Your fear mapping queries reported to authorities', `shelkopolis-trust-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `A chandler mentions a partnership that dissolved last season — "trust issues," he says, and goes quiet. A tailor's apprentice says her master stopped attending the guild dinners. Two people in the same morning use the same phrase: "I don't know who to believe anymore." The fractures are real. The sources stay unnamed.`;
        addJournal('investigation', 'Widespread trust degradation confirmed by citizen interviews', `shelkopolis-trust-confirmed-${G.dayCount}`);
      } else {
        G.lastResult = `People are cordial and closed. The shape of the fear is clear from the outside — shorter answers, careful topics, eyes that track doorways. The specific injuries stay private.`;
        addJournal('investigation', 'Distrust sensed but not fully documented', `shelkopolis-trust-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== GOSSIP & TENSION LAYERS (4 CHOICES) ==========

  // 17. STREET RUMOR: SURFACE SOCIAL TENSION
  {
    label: "Gather street rumors at the market — what are people whispering about? What story is spreading through Shelkopolis?",
    tags: ['Investigation', 'Rumor', 'Social', 'Gossip', 'Meaningful'],
    xpReward: 65,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'parsing popular narrative');
      G.stageProgress[1]++;

      const rumor = ['the garrison is moving weapons in the night', 'northern traders have disappeared', 'the shrine blessings are failing', 'someone is buying silence with gold', 'the merchant council is hiding something'];
      const selected = rumor[Math.floor(Math.random() * rumor.length)];

      G.lastResult = `You hear it three times in an hour, from different ends of the market: "${selected}." Each person who says it lowers their voice slightly, and each one says it as though it is nearly but not quite something they know for certain. The fish-salt smell of the harbor drifts through the stalls. Nobody is organizing the rumor. Nobody has to. Shelkopolis is assembling a picture from the parts it can see, and the anxiety underneath it is entirely its own.`;
      addJournal('investigation', `Street rumor gathered: "${selected}"`, `shelkopolis-rumor-${G.dayCount}`);

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 18. INSTITUTIONAL CRACK: PROOF OF INTENTIONAL MISALIGNMENT
  {
    label: "Expose the contradiction between official narrative and documented reality — find proof that Shelkopolis's institutions are being actively subverted, not just failing.",
    tags: ['Investigation', 'Evidence', 'Proof', 'Systematic', 'Meaningful'],
    xpReward: 80,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(80, 'exposing institutional conspiracy');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Garrison weapon transfer orders. Chapel ledger pages with component ratios altered by fractions. Trade registry entries that end and don't resume. Each document alone is explainable. Spread on the same surface in lamplight, with the tallow smell of the registry room around you, they are not. The same hand — or the same instruction — reached into three separate institutions in the same eight-week window. This is not institutional decay. Something directed this, and the direction came from outside the ordinary chain.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Institutional conspiracy documentation compiled', `shelkopolis-proof-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `A sealed note arrives at your lodging before you've finished compiling. No signature. It lists three locations you visited this week and the approximate time of each. Nothing threatening — just a demonstration that someone has been keeping pace with you. The note is written on chapel-quality paper. You are being shown that the walls you're examining can see back.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Investigation directly noticed by conspiracy operators', `shelkopolis-proof-caught-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `The garrison timeline and the chapel ledger dates don't match by accident — they overlap in a way that requires the same decision-maker. You can't prove coordination from these documents alone, but the question has shifted from whether something is wrong to who made it wrong.`;
        addJournal('investigation', 'Compelling contradiction evidence found', `shelkopolis-proof-partial-${G.dayCount}`);
      } else {
        G.lastResult = `The documents are suggestive but not conclusive. Each anomaly has a plausible separate explanation. The pattern you're looking for is there in outline, and the outline isn't enough yet.`;
        addJournal('investigation', 'Evidence fragments found but incomplete', `shelkopolis-proof-incomplete-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 19. MORAL PRESSURE: COMPLICITY OR RESISTANCE CHOICE
  {
    label: "Confront a key figure who may be complicit in the conspiracy — demand an explanation and decide whether to protect them or expose them.",
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
        { name: 'Brother Aldwin', role: 'shrine helper', fear: 'They threatened my family' },
        { name: 'Thom', role: 'record keeper', fear: 'I was ordered to alter records or face dismissal' },
        { name: 'Marta', role: 'innkeeper', fear: 'They said if I spoke, my business would close' }
      ];

      const npc = npcOptions[Math.floor(Math.random() * npcOptions.length)];

      G.lastResult = `${npc.name} goes still when you lay it out. Then, quietly: "${npc.fear}." The admission costs something — you can see it in the way they look at the wall rather than at you. They didn't choose this cleanly, and they know it. Now they're waiting to see what you do with the knowledge. Expose them and the institution cracks further — but the record is honest. Protect them and they may help you, or they may warn the people who threatened them in the first place. Either path leaves something unresolved.`;

      if (!G.flags) G.flags = {};
      G.flags.stage1_evidence_decision = 'pending';
      G.flags.stage1_moral_npc = npc.name;

      addJournal('consequence', `Confronted ${npc.name} (${npc.role}) about complicity`, `shelkopolis-moral-${G.dayCount}`);

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 20. DISCOVERY MOMENT: WRONGNESS CONFIRMED AND ORIGIN REVEALED
  {
    label: "Find the central evidence that confirms the wrongness — discover the origin source directing the corruption from outside Shelkopolis.",
    tags: ['Investigation', 'Origin', 'Discovery', 'Climax', 'Meaningful'],
    xpReward: 80,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(80, 'discovering origin source of corruption');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `In the chapel's letter alcove, tucked inside a consecration record no one would pull without cause, a single sheet of correspondence in northern trade tongue. It names no one in Shelkopolis by title, only by function — the garrison officer, the shrine keeper, the registry clerk. Orders, not requests. The sheet smells of the same wax on every sealed letter Marta flagged at the Amber Fountain. Shelkopolis isn't failing. It's being operated from somewhere north of its borders, and whoever is running it hasn't finished yet.`;
        G.stageProgress[1]++;
        addJournal('discovery', 'Origin source of Shelkopolis corruption identified as external coordination', `shelkopolis-origin-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Two men step out from the alcove before you reach the letter cache. They don't explain themselves. One takes your arm, the other opens the side door to the street, and you are outside the chapel in under a minute with nothing in your hands. The coal-smoke of the street hits you immediately. You were close enough that they moved. Whatever is in that alcove, they know you were looking for it, and now they know your face.`;
        G.worldClocks.pressure += 2;
        addJournal('complication', 'Investigation interrupted by conspiracy operators', `shelkopolis-origin-caught-${G.dayCount}`);
      } else if (result.total >= 14) {
        G.lastResult = `The sealed letters reference northern intermediaries by role, not name. The language is trade tongue — formal, transactional, stripped of personal detail. Someone outside Shelkopolis is running these instructions inward. The city is a destination, not a source. The thread leads north.`;
        addJournal('discovery', 'External coordination of Shelkopolis conspiracy confirmed', `shelkopolis-origin-external-${G.dayCount}`);
      } else {
        G.lastResult = `The evidence points outward but not to anything specific. Northern trade references, coded timing, a cipher you can't break without a key you don't have. The origin is beyond what this pass yields.`;
        addJournal('investigation', 'External coordination suspected but source not yet identified', `shelkopolis-origin-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== EXPANSION: INVESTIGATION PROGRESS + ARCHETYPE + FACTION SEEDS ==========

  {
    label: "Cross-reference the pattern of sealed letters with the timing of supply disruptions — the coordination suggests a single orchestrating hand.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'cross-referencing coordination evidence');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.isCrit) {
        G.lastResult = `Every supply disruption follows a sealed letter by two days. The gaps in the trade registry track the same Thursday-Sunday deposit schedule Brother Aldwin described. The chapel letter system isn't incidental to the conspiracy — it is the command channel. Someone reads those deposits and moves the supply lines accordingly.`;
        addJournal('investigation', 'Letters confirmed as operational directives — chapel is command channel', `shelk-crossref-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The registry volumes you need have been transferred to secure storage — a routine audit procedure, the clerk explains pleasantly. The timing is not routine. Someone moved the records before you arrived, which means someone knew you were coming to look at them.`;
      } else {
        G.lastResult = `The dates align more than chance allows — letter deposits cluster just before supply shifts in three separate commodities. It isn't proof yet, but it narrows the window for coincidence considerably.`;
        addJournal('investigation', 'Coordination pattern suggestive but inconclusive', `shelk-crossref-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Examine the ward failure zones — the locations where protection degraded first form a pattern pointing northwest.",
    tags: ['Investigation', 'Lore', 'Stage1', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'mapping ward failure zones');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
      G.lastResult = `The earliest ward degradation traces to the Ironspool district's northwest edge — the seam nearest the northern road. From there the failures spread inward, district by district, over six weeks. The pressure is directional. Whatever is pulling against the chapel's ward network originates outside Shelkopolis, northwest of the harbor, and it has been steady and patient.`;
      addJournal('investigation', 'Ward failure vector confirmed pointing northwest', `shelk-wards-vector-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The garrison's defensive restructuring left three specific entry points unguarded — this is a prepared access corridor, not a security failure.",
    tags: ['Investigation', 'Combat', 'Stage1', 'Meaningful'],
    xpReward: 74,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'analyzing prepared access corridor');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
      const arch = G.archetype && G.archetype.group;
      if (arch === 'combat') {
        G.lastResult = `Three unguarded points, northern gate to the administrative quarter, running straight. Any garrison commander worth the rank would have flagged that as a breach — unless the breach was the instruction. This is a prepared corridor. Something needs to move from the northern entry to the registry buildings without garrison eyes on it, and the garrison was restructured to guarantee exactly that. Shelkopolis isn't the target. It's the route.`;
      } else {
        G.lastResult = `Northern gate, Ironspool junction, administrative quarter — three unguarded points that form a direct line through the city's center. Separately they read as patrol gaps. Together they read as a cleared lane. Something is meant to travel that path, and the garrison's new rotation keeps it open.`;
      }
      addJournal('investigation', 'Prepared access corridor identified — conspiracy using Shelkopolis as transit', `shelk-corridor-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "A Warden Order officer has been asking similar questions about the chapel correspondence network — your paths are converging.",
    tags: ['NPC', 'Faction', 'Stage1', 'Meaningful'],
    xpReward: 60,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(60, 'identifying parallel investigation');
      if (!G.flags) G.flags = {};
      if (!G.factionHostility) G.factionHostility = { warden_order: 0, iron_compact: 0, oversight_collegium: 0 };
      G.flags.met_warden_order_contact = true;
      const arch = G.archetype && G.archetype.group;
      if (arch === 'combat') {
        G.lastResult = `The Warden Order officer plants himself in your path on Verdant Row and states his business without preamble. Same evidence trail, same chapel correspondence pattern. He doesn't offer cooperation — he announces overlap. "We're working the same ground." His posture says he's already decided how much to share and it isn't much. He logs your existence and moves on. The coal-smoke smell of the street stays behind him.`;
        G.factionHostility.warden_order = Math.max(0, G.factionHostility.warden_order - 1);
      } else {
        G.lastResult = `A Warden Order officer stops beside you at the chapel steps and speaks without turning to face you. "The same anomalies. We noticed." She walks on before you can answer. The Principalities' enforcement arm has been here longer than you have, and they chose to let you know it.`;
      }
      addJournal('faction', 'Warden Order contact made — parallel investigation confirmed', `shelk-warden-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "A merchant contact mentions that someone else has been asking about the northern correspondence network — they described their questions as 'professional.'",
    tags: ['NPC', 'Warning', 'Stage1', 'Meaningful'],
    xpReward: 55,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(55, 'learning of rival investigator');
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const arch = G.archetype && G.archetype.group;
      G.lastResult = `The merchant keeps his voice low and his eyes on the stall beside him. "Thorough. They didn't react when they heard the answers — wrote things down, thanked people, left. Like they already knew and were filling in the last columns." The description fits a ${arch === 'combat' ? 'Warden Order field operative' : arch === 'magic' ? 'Collegium-affiliated archivist' : arch === 'stealth' ? 'private intelligence contractor' : 'institutional compliance officer'}. Someone else is working this ground, and they started before you did.`;
      if (!G.rivalId) {
        if (arch === 'combat') G.rivalId = 'warden_captain';
        else if (arch === 'magic') G.rivalId = 'archivist_veld';
        else if (arch === 'stealth') G.rivalId = 'shadow_broker';
        else G.rivalId = 'provost_lenn';
      }
      addJournal('warning', 'Rival investigator confirmed — methodical, already ahead on evidence trail', `shelk-rival-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Spend the evening at the Amber Fountain, listening to what the regulars are willing to say now that they've seen you around for a while.",
    tags: ['Social', 'Rest', 'Stage1'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(30, 'building community trust');
      const observations = [
        "A dockworker nurses his cup and says northern shipments stopped coming through. 'Weather,' he offers. The coal-smoke from outside drifts in through the door. The weather hasn't changed.",
        "A shrine worker at the far end of the bar turns her cup in her hands. The evening prayers feel different lately, she says. 'Like they go somewhere and don't quite arrive.' She has no explanation.",
        "A cloth merchant tells it like a complaint: customs clerk replaced three times in six months, each one gone without notice, no forwarding word. 'Can't get anything cleared properly anymore.' He doesn't say it like something is wrong. He says it like something is being managed.",
        "A patrol guard, off-duty and still in his boots, says his route changed again. Third time this month. He stares at his drink. 'Nobody explains why. You just get the new sheet and walk it.'"
      ];
      G.lastResult = observations[Math.floor(Math.random() * observations.length)];
      G.recentOutcomeType = 'rest'; maybeStageAdvance();
    }
  },

  {
    label: "Review the chapel's public blessing records — the dates and recipients form a communication pattern when read in sequence.",
    tags: ['Investigation', 'Lore', 'Stage1', 'Meaningful'],
    xpReward: 65,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(65, 'decoding blessing record communication pattern');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.isCrit) {
        G.lastResult = `The recipients map to the sealed letter network. The dates align with supply disruptions and garrison order changes. The chapel's blessing record — open to any petitioner, logged in plain ink — is an operational schedule. Recipients mark whom to contact; dates mark when to move. The wax-and-stone smell of the chapel is everywhere in this room, and the conspiracy has been using its most public document as a broadcast channel.`;
        addJournal('discovery', 'Chapel blessing records decoded as operational schedule cipher', `shelk-cipher-${G.dayCount}`);
      } else {
        G.lastResult = `Some recipients appear more than once in the same short windows. Some dates cluster without obvious cause — no feast days, no estate anniversaries. The pattern has a shape but not yet a key. The chapel's lamplight makes the columns easy to read and the meaning easy to miss.`;
        addJournal('investigation', 'Blessing records show unusual patterns — cipher suspected', `shelk-cipher-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Talk to the garrison's night-watch commander about what they've seen on unreported rounds.",
    tags: ['NPC', 'Combat', 'Stage1', 'Meaningful'],
    xpReward: 58,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(58, 'gathering night-watch intelligence');
      if (!G.flags) G.flags = {};
      G.flags.met_night_watch_commander = true;
      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 11 || result.isCrit) {
        G.lastResult = `The night-watch commander chooses her words the way someone does when they've already decided which ones to leave out. "I file reports. Some come back amended. I stopped asking why." Ironspool district, after midnight: unmarked carts, no manifest, no escort. "Authorized transports," she was told. She sets her cup down. "I stopped following up." She hasn't stopped noticing. That's why she's telling you.`;
        addJournal('investigation', 'Night-watch confirms unauthorized Ironspool midnight transports', `shelk-nightwatch-${G.dayCount}`);
      } else {
        G.lastResult = `The night-watch commander says nothing to report and means it as a complete sentence. She holds eye contact just long enough for it to be a message, then looks at the wall behind you.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Check whether the Verdant Row herbalists have noticed anything unusual — botanical compounds sometimes move through healer networks before they reach other channels.",
    tags: ['Investigation', 'Survival', 'Stage1', 'Meaningful'],
    xpReward: 62,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(62, 'checking botanical compound movement');
      const result = rollD20('survival', (G.skills.survival || 0) + Math.floor(G.level / 3));
      if (result.total >= 11 || result.isCrit) {
        G.lastResult = `The herbalist pulls the order book without being asked — she's been waiting for someone to ask. Dried glasswake moss, eight months of northern orders, quantities that would supply the Academy for two years. "We assumed that's where it went." The tannery smell drifts in from the south end of the row. Glasswake is a resonance amplifier. The Academy hasn't placed any orders with Verdant Row this season.`;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('investigation', 'Glasswake moss compound orders tracked — resonance precursor moving through Verdant Row', `shelk-botanical-${G.dayCount}`);
      } else {
        G.lastResult = `The herbalist mentions unusual order volumes in passing, then pulls back. She'll say more to someone she knows better. The trust isn't there yet, and she's not going to be pushed into it.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Revisit the sealed letter network — has the frequency changed since you started asking questions?",
    tags: ['Investigation', 'Stealth', 'Stage1', 'Meaningful'],
    xpReward: 66,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'monitoring surveillance response');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('stealth', (G.skills.stealth || 0) + Math.floor(G.level / 3));
      if (result.isCrit) {
        G.lastResult = `Twice the deposits, same two-day window. Something changed — either the operation's timeline accelerated, or word of your questions reached whoever writes the orders. The wax seals on the alcove shelf have been replaced more recently than usual; the chapel stone still smells of fresh tallow from the relighting. The network is moving faster, and it knows this city better than you do.`;
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        addJournal('warning', 'Letter frequency doubled — conspiracy accelerating in response to investigation', `shelk-monitor-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `A novice steps out of the chapel side door and looks directly at you — not surprised, not alarmed. Just noting. The letter alcove window goes dark within the hour. Three days pass with no deposits at all. The network didn't panic. It simply paused and waited for you to move on.`;
      } else {
        G.lastResult = `The deposit count has edged up — one extra per week, nothing dramatic. The chapel routine looks unchanged from the street. Whatever the network registered about increased attention in Shelkopolis, it's absorbing it without breaking stride.`;
        addJournal('investigation', 'Letter frequency increased — general alertness elevated', `shelk-monitor-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  }
];
window.SHELKOPOLIS_STAGE1_ENRICHED_CHOICES = SHELKOPOLIS_STAGE1_ENRICHED_CHOICES;
