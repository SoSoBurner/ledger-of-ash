/**
 * SHELKOPOLIS STAGE 1 ENRICHED CHOICES
 * 28 grounded paths tied to NPC work and locality tensions
 * Generated for: Trade vs dignity, refinement vs necessity, public harmony vs covert rivalry
 * Each choice: 55-80 XP, grounded in specific NPC perspective, layered wrongness reveal
 */

const SHELKOPOLIS_STAGE1_ENRICHED_CHOICES = [
  // ========== NPC-GROUNDED CHAINS (8 CHOICES) ==========

  // 1. INNKEEPER: GUEST PATTERNS
  {
    label: "The innkeeper notices things she doesn't write down. Three guests, same careful question.",
    tags: ['NPC', 'Observation', 'Intelligence'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'gathering intelligence from trusted source');
      G.stageProgress[1]++;

      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      const target = 11 + Math.max(0, G.worldClocks.pressure);

      if (result.isCrit) {
        G.lastResult = `Marta sets a cup down before she speaks. "Three guests, different regions, same week. Each asked about northern passage in the same careful way — not curious, rehearsed. All paid in new coin, no estate marks. All left sealed letters at the Silkweaver's Chapel." She wipes the bar surface that doesn't need wiping. "Twenty-two years behind this counter. I know coordination when it sleeps in my rooms." She's told you everything she knows, and you notice she doesn't ask what you'll do with it.`;
        G.stageProgress[1]++;
        addJournal('Innkeeper flagged unnatural guest coordination', 'intelligence', `shelkopolis-innkeeper-guests-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Marta stops polishing the counter. She doesn't answer — she moves. Refills a cup at the far end of the bar, exchanges four words with a dockworker, adjusts the lamp by the door. The Amber Fountain fills around you and your question. When you finally leave, the coal-smoke smell from the street feels cleaner than the careful silence you walked out of. Whatever she tracks in that inn, she's decided you're not safe to share it with.`;
        G.worldClocks.pressure++;
        addJournal('Innkeeper went silent — pushed too hard into private ground', 'complication', `shelkopolis-innkeeper-hostile-${G.dayCount}`);
      } else {
        G.lastResult = `Marta leans on the counter and keeps her voice low under the noise of the common room. One guest paid triple for the room that faces the alley, not the street. Another left before dawn and slipped an extra coin under the door to ensure no one noted the hour. "I don't pry," she says. "But I notice." The lamplight catches the ledger page open behind her — she's already written it down somewhere.`;
        addJournal('Innkeeper noticed unusual guest discretion', 'intelligence', `shelkopolis-innkeeper-caution-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 2. INNKEEPER: SEALED LETTERS
  {
    label: "The sealed letters at Silkweaver's Chapel run on a schedule. Twice a week, no names.",
    tags: ['NPC', 'Evidence', 'Mystery'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering covert communication network');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit || (result.total >= 13 && !result.isFumble)) {
        G.lastResult = `Brother Aldwin folds his hands on the lectern before he speaks. Twice a week — Thursdays and Sundays after vespers — a veiled figure collects the letters. Northern trade-tongue. No names. The wax seals carry no house crest. He admits the letters began arriving the same month the evening blessings started requiring a second repetition to hold. "I told myself it was coincidence," he says. The wax smell still clings to the alcove where they're left. The letters reference consignment tallies that don't appear in any registered manifest. The routing numbers exist. The shipments do not.`;
        G.stageProgress[1]++;
        addJournal('Sealed letter network mapped to chapel intermediary — routing numbers exist, shipments do not', 'evidence', `shelkopolis-letters-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Brother Aldwin receives your questions with the full warmth of the chapel's public face. He walks you to the door himself, offers a traveling blessing, wishes you safe passage. The wax-and-stone smell of the chapel follows you out. You're three streets away before you remember: there was a novice at a writing desk in the side alcove the entire time. You don't know what was recorded. The chapel didn't need to ask you to leave. It simply wrote down that you came.`;
        G.worldClocks.watchfulness++;
        addJournal('Chapel clerk logged your inquiry — visit officially noted', 'complication', `shelkopolis-chapel-alert-${G.dayCount}`);
      } else {
        G.lastResult = `Brother Aldwin confirms letters pass through the chapel — private correspondence for traveling merchants, he says, a service the chapel has offered for generations. His hands stay folded when he says it. He doesn't look at the alcove. He doesn't need to. Whatever the full arrangement is, he's decided the public version is the only one you'll hear today.`;
        addJournal('Chapel involved in letter routing but details refused', 'evidence', `shelkopolis-letters-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 3. TAILOR: PATTERN DESIGNS DISAPPEARING
  {
    label: "Three commissions on Verdant Row — paid in full, then abandoned before the first fitting.",
    tags: ['NPC', 'Craft', 'Trade'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading commercial disruption');
      G.stageProgress[1]++;

      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Sereth pours without being asked. "Verdant threadweave, twelve bolts — six weeks of work per commission." He spreads three order slips on the cutting table. All the same pattern. All paid in full. None collected. He taps the fish-salt smell of the harbor that comes through his open window. "The harbor's full of buyers who want this cloth and can't get it. Meanwhile I've been blocked from weaving it for anyone else for three months. Someone is commissioning work specifically so it cannot be commissioned by others."`;
        G.stageProgress[1]++;
        addJournal('Tailor identified pattern commissioning as deliberate interference', 'evidence', `shelkopolis-tailor-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Sereth talks for twenty minutes — seasonal variation, guild quotas, the way autumn always shifts estate commissions toward heavier cloth. His hands never leave the fabric he's cutting. He doesn't pause, doesn't deflect, doesn't look up. When you reach the door, you have a complete education in Verdant Row's commission cycle and nothing else. The cut fabric falls in perfect lines behind him. He knew what you were asking. He answered something else with great precision.`;
        addJournal('Tailor gave polished non-answer — probe clearly identified', 'complication', `shelkopolis-tailor-silent-${G.dayCount}`);
      } else {
        G.lastResult = `Sereth mentions it sideways, the way tailors talk about money — obliquely, while measuring something else. Three commissions this season, high coin, abandoned before the first fitting. "It happens," he says. Then: "Not three times." He goes back to his pins. He hasn't decided yet whether you're someone he can say more to.`;
        addJournal('Tailor acknowledged unusual commission abandonment', 'evidence', `shelkopolis-tailor-pattern-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 4. CLERK/RECORD KEEPER: LEDGER DISCREPANCIES
  {
    label: "The autumn entries in the commodity ledger stop mid-column. The ink around the gap is clean.",
    tags: ['NPC', 'Records', 'Bureaucracy'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering administrative concealment');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Thom pulls the ledger and keeps his voice barely above the scratch of quills elsewhere in the room. He runs his finger down the column and stops. Silkwood shipments from the northern territories — steady for four years, then gone. Not marked declined or delayed. The entries are simply absent, three weeks back, the ink around the gap undisturbed and clean. "Erasures leave a shadow," he says. "This leaves nothing. Whoever did this had the original, not a copy." He closes the book before anyone passes the door.`;
        G.stageProgress[1]++;
        addJournal('Clerk revealed three-week gap in northern trade records', 'evidence', `shelkopolis-ledger-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Thom opens three volumes. He is genuinely helpful — dates, authorization codes, shipment origins, the full column of northern silkwood entries right up to where they stop. You get real information. Then you catch his eyes tracking which line you're reading. He's not helping you understand the ledger. He's cataloguing what you now know. You leave with evidence and the certainty that before the lamplight shifts in this building, someone will be told exactly which pages you stopped on.`;
        G.worldClocks.watchfulness++;
        addJournal('Learned real evidence — but Thom marked exactly what you found', 'complication', `shelkopolis-merchant-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Thom allows access but stays close. The pages for the autumn trade season show ghosts — the slight bowing of the binding where sheets once sat. Removed cleanly, not torn. He doesn't comment on it. When you point to the gap, he tilts his head as though he is seeing it for the first time, which he is not. The routing numbers exist. The shipments do not. Behind him on the lower shelf, a specific drawer in the cabinet — third row, second from the left — is sealed with red administrative wax pressed over the lock plate; the color and stamp are identical to the Collegium-issued seals on the room's filing cabinet above it, but the drawer itself appears on no cabinet index posted in the room. There is still the matter of the routing entries.`;
        addJournal('Clerk confirmed deliberate ledger removal pattern', 'evidence', `shelkopolis-ledger-removed-${G.dayCount}`);
      } else {
        G.lastResult = `Thom straightens a stack of already-straight papers and explains that registry access requires a stamped request from the Iron Accord, countersigned by a house advocate. He says it pleasantly. There's a lamplight smell of tallow and old ink in the room, and none of it belongs to you without the paperwork.`;
        addJournal('Merchant house records inaccessible without formal authorization', 'evidence', `shelkopolis-ledger-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 4b. PERMIT REGISTRY: MISSING SIGNATORY
  {
    label: "Someone with authority filed this without leaving their name behind.",
    tags: ['NPC', 'Records', 'Bureaucracy'],
    xpReward: 15,
    stageProgress: 0,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(15, 'reading administrative anomaly');

      G.lastResult = `The permit registry desk smells of pressed wax and dry parchment. A row of transit authorizations sits in the outbox tray, stamped and dated, each one carrying a six-digit reference code in the upper margin. The third form down has the code — REF-7741-KS — printed cleanly. The signatory column beside it is blank. Not crossed out. Not initialed with a placeholder. Blank, as though the name was never meant to be there. The clerk on the far side of the room lifts a new form from the stack and begins writing without looking up.`;
      addJournal('Permit registry at Shelkopolis civic hall: transit authorization REF-7741-KS carries a valid code but no signatory — column left empty, form filed as complete', 'intelligence');
      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 5. SHRINE HELPER: BLESSING EFFECTS DEGRADING
  {
    label: "The shrine wards need relaying more often. The formulas haven't changed.",
    tags: ['NPC', 'Divine', 'Ritual'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading spiritual corruption');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Sister Velda glances toward the chapel door before she answers. The wax on the floor stones is fresh — they've been relaying the protection marks more often. "Forty percent more ritual repetition just to hold the same coverage." Her voice drops. "The formulas are unchanged. The faith is as strong as it's been. But something is pulling against the work from outside. We renew a ward at dawn, and by midday the edges are soft again." Her thumb finds the chalk edge of the ward mark in the alcove doorframe without her seeming to notice it. The candles behind her burn a quarter-inch faster than they should.`;
        G.stageProgress[1]++;
        addJournal('Shrine worker revealed systematic blessing degradation', 'evidence', `shelkopolis-blessing-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Sister Velda gives you an hour. Renewal cycles, protection radius, the seasonal cadence of blessings going back thirty years — she recites it with the confidence of someone who has said it many times. The wax smell of the chapel floor and the warmth of the candles make the morning pass quickly. It's only outside, in the coal-smoke of the street, that the figures settle into place: every one she cited matched the documentation from three years ago. The shrine fed you its archived baseline. The morning is gone.`;
        G.worldClocks.reverence++;
        addJournal('Shrine fed false baseline data — wasted morning, window lost', 'complication', `shelkopolis-shrine-hostile-${G.dayCount}`);
      } else {
        G.lastResult = `The shrine worker admits the renewal schedule has tightened. "Seasonal," she says, though she says it toward the floor. The wax on the chapel stones near the main ward-mark is newer than the surrounding stone — relaid recently and more than once. She won't elaborate, but the floor says enough.`;
        addJournal('Shrine worker confirmed increased blessing maintenance needs', 'evidence', `shelkopolis-blessing-strain-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 6. MARKET BROKER: TRADE FLOW CHANGES
  {
    label: "Northern silkwood stopped arriving three weeks ago. Not delayed — stopped.",
    tags: ['NPC', 'Commerce', 'Economics'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'deciphering economic pressure');
      G.stageProgress[1]++;

      const result = rollD20('charm', (G.skills.persuasion || 0) + (G.skills.insight || 0) / 2 + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Kaen steers you to the far end of the stall, away from the open row. "Three weeks. No northern silkwood. Not delayed — stopped." He keeps his voice below the market noise. "The shortfall is too clean. One supplier goes quiet, another follows the same week. That doesn't happen by weather or road. Someone with reach into the northern territories is holding the supply off Verdant Row deliberately." The fish-salt smell from the harbor district drifts through. "When the primary trade good dries up, the estates start owing favors to whoever still has it."`;
        G.stageProgress[1]++;
        addJournal('Broker mapped deliberate supply chain isolation', 'evidence', `shelkopolis-broker-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Kaen sets down his chalk and looks at you directly. "I don't talk market conditions with people who ask the way you just asked." He turns back to his tally board. By the time you've reached the end of Verdant Row, two other brokers have found reasons to be busy. The market knows how to close without making a sound.`;
        G.worldClocks.watchfulness++;
        addJournal('Broker warned other merchants of your inquiry', 'complication', `shelkopolis-broker-alert-${G.dayCount}`);
      } else {
        G.lastResult = `Kaen shrugs and marks something on his tally board. Tighter than usual — that's all he'll say about silkwood, and he says it without looking up. The board shows three blank lines where supplier names should be. He doesn't explain the blanks, and he doesn't expect you to stop noticing them. The routing numbers exist. The shipments do not. There is still the matter of the routing entries.`;
        addJournal('Broker confirmed silkwood supply shortage — routing numbers exist, shipments do not', 'evidence', `shelkopolis-broker-supply-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 7. PATROL CAPTAIN: ENFORCEMENT PATTERN SHIFTS
  {
    label: "Ironspool district — patrols pull back at nightfall now. No declared reason.",
    tags: ['NPC', 'Enforcement', 'Authority'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading enforcement reallocation');
      G.stageProgress[1]++;

      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Thorne wraps both hands around his cup before he starts. "Orders shifted twice in two weeks. Ironspool district — we pull back at nightfall now. 'Resource optimization.' Nobody in the lower ranks believes that." He keeps his voice level, but his thumb taps the table once. "Temple district doubled. No declared threat. Someone above the garrison commander is repositioning us, and the commander is letting them." He drains the cup. He knows he's told you something that can't be untold, and he's not sure yet if that was a mistake.`;
        G.stageProgress[1]++;
        addJournal('Patrol captain revealed re-orchestrated garrison positioning', 'evidence', `shelkopolis-patrol-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Thorne goes still. Not angry — still, the way a gate goes still when it locks. "Garrison operations aren't a topic for this conversation." He sets his cup down and straightens his collar. Two soldiers at the next table look up. You're not threatened, exactly. But the room has shifted, and the coal-smoke smell of the street outside suddenly seems worth walking toward.`;
        G.worldClocks.pressure++;
        addJournal('City guard now viewing you as potential threat', 'complication', `shelkopolis-patrol-hostile-${G.dayCount}`);
      } else {
        G.lastResult = `Thorne grants you "operational priorities" and nothing else. He says it like a door closing — polite, final, framed in procedure. The patrol rotation board on the wall behind him shows three crossings-out in the Ironspool column, but he doesn't turn to look at it while he talks.`;
        addJournal('Patrol captain confirmed shift in garrison priorities', 'evidence', `shelkopolis-patrol-shift-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 8. CHAPEL WORKER: FAITH AND COERCION
  {
    label: "The confessions have changed. People aren't confessing wrongs anymore — they're confessing fear.",
    tags: ['NPC', 'Faith', 'Psychology'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering spiritual coercion');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Aldwin steps away from the nave before he answers. The wax-and-stone smell of the chapel is heavier here, away from the door. "The confessions are different. People are not confessing wrongs — they're confessing fear. Of being watched, of pressure they can't name, of expectations no one has spoken aloud." He does not look at the confession register when he says it, though it sits open beside him. "The faith hasn't weakened. But it's being pressed on from somewhere outside it, and what comes through the confession gate now is mostly people trying to understand why they're afraid."`;
        G.stageProgress[1]++;
        addJournal('Chapel worker revealed coerced faith patterns in confessions', 'evidence', `shelkopolis-faith-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Aldwin draws himself upright. The candles in the alcove behind him make his shadow large on the chapel wall. "You are asking me to describe the interior of confession. I will not. Leave, or I will bring this to the shrine master before you reach the street." The door is three steps away. The wax-sealed record book on the table beside him is already open to today's date.`;
        G.worldClocks.reverence++;
        addJournal('Chapel worker will report your violation of sacred space', 'complication', `shelkopolis-chapel-hostile-${G.dayCount}`);
      } else {
        G.lastResult = `Aldwin sits with the question longer than he needs to. "More anxious," he finally says. "People are carrying something they haven't named yet." He looks at the doorframe when he finishes, not at you. Whatever the hierarchy has told him to share, that's the edge of it.`;
        addJournal('Chapel worker noted increased anxiety in congregants', 'evidence', `shelkopolis-faith-anxiety-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== ARCHETYPE DEEP DIVES (8 CHOICES) ==========

  // 9. COMBAT TIER 1: GARRISON STRUCTURE ANOMALIES
  {
    label: "The garrison rearranged to control movement inside the city, not guard against threats outside.",
    tags: ['Combat', 'Military', 'Anomaly'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'military structural analysis');
      G.stageProgress[1]++;

      const result = rollD20('vigor', (G.skills.survival || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The relocation pattern reads wrong the moment you walk the perimeter. Weapon stores pulled back from the trade-district wall — that wall is now soft. Reinforcement concentrated around the administrative quarter and registry buildings. No military logic justifies that exchange unless you're not trying to protect the city from outside. The garrison has been rearranged to control internal movement and leave specific districts undefended. Someone gave those orders, and the garrison followed them without apparent question.`;
        G.stageProgress[1]++;
        addJournal('Combat analysis revealed deliberate garrison restructuring', 'evidence', `shelkopolis-garrison-struct-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `A guard intercepts you near the second watch post. He doesn't raise his voice. He asks your business, writes something in his pocket ledger, and tells you the perimeter is restricted to authorized personnel. By the time you've backed away, two more guards have repositioned. You're logged, dated, and noted. The garrison doesn't need to detain you to make the point.`;
        G.worldClocks.watchfulness++;
        addJournal('Garrison guards alerted to reconnaissance attempt', 'complication', `shelkopolis-garrison-alert-${G.dayCount}`);
      } else {
        G.lastResult = `The fortifications near the trade district show fresh mortar on old stonework — reinforcement, or the opposite. The sight lines don't match a standard defensive rotation. Something's been adjusted in the last few weeks, but the full pattern stays just out of reach from street level.`;
        addJournal('Combat analysis noted unexplained recent fortification changes', 'evidence', `shelkopolis-garrison-changes-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 10. COMBAT TIER 2: SUPPLY LOG DISCREPANCIES
  {
    label: "Someone signed off on weapons transfers to an unmarked warehouse. The garrison commander didn't.",
    tags: ['Combat', 'Supply', 'Logistics'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'military logistics analysis');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The quartermaster pours a second cup before he pulls the ledger. Weapons transfers — marked "training surplus" — routed to an unmarked Ironspool warehouse over six weeks. The numbers are wrong for any standard rotation; they're right for stocking a secondary armory. "I was told tactical security." He taps the column with one finger. "But the garrison commander didn't sign these. I don't know who did. I stopped asking." He closes the ledger and leaves his hand resting on the cover.`;
        G.stageProgress[1]++;
        addJournal('Quartermaster revealed off-books weapons redistribution', 'evidence', `shelkopolis-supply-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The quartermaster closes the ledger before you've finished your question. He doesn't raise his voice — he picks up a writing token and sets it beside his ink pot, which is a way of saying he's about to record something. By nightfall, the garrison commander knows someone came asking about supply logs. The garrison will remember your face.`;
        G.worldClocks.pressure++;
        addJournal('Garrison commander personally aware of your inquiry', 'complication', `shelkopolis-commander-alert-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `The supply logs open to the autumn columns. Several transfer entries are marked "approved redistribution" with no destination listed — just a reference number that doesn't match any warehouse in the standard registry. The coal-smoke smell of the garrison office hangs flat in the air while you copy the reference numbers down. They mean something to someone. The entry above the last transfer is dated the fourteenth; the transfer itself is dated the ninth. On the lower shelf behind the quartermaster's desk, the second drawer from the left carries an amber wax seal pressed flat over the latch — the same institutional stamp as the filing cabinet above it, though this drawer appears on no index posted in the room.`;
        addJournal('Supply logs show signs of deliberate obfuscation', 'evidence', `shelkopolis-supply-obfuscated-${G.dayCount}`);
      } else {
        G.lastResult = `The quartermaster's office smells of oiled steel and old leather strapping. He recites the access policy without looking up from the inventory sheet under his forearm: garrison officers only, countersigned request, three-day processing. The pen continues down the column while he speaks, marking tallies in a rhythm that does not break for the question. He's not hostile. He's a wall shaped like a man doing his job. Above his desk, a row of ring keys hangs on hooks. One is missing from its peg. The peg has no dust on it.`;
        addJournal('Supply logs blocked without military authorization', 'evidence', `shelkopolis-supply-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 11. MAGIC TIER 1: WARD PLACEMENTS ALTERED
  {
    label: "The old trade-route wards are thin. Not decayed — pulled deliberately inward.",
    tags: ['Magic', 'Wards', 'Arcane'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'arcane architecture analysis');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The old trade-route wards are thin — not decayed, pulled. Someone drew the coverage deliberately inward. What replaced them clusters tight around the administrative quarter and garrison walls, but the geometry is wrong for defense. A ward built to keep threats out faces outward. These face inward. The entire lattice has been inverted: the new architecture constrains movement within Shelkopolis rather than guarding its perimeter. Whoever rebuilt this understood the original structure intimately enough to reverse it without collapsing it.`;
        G.stageProgress[1]++;
        addJournal('Magic analysis revealed inverted ward architecture', 'evidence', `shelkopolis-wards-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The probe finds a watcher-thread woven into the ward surface — passive, invisible until touched. It activates the moment you press. Somewhere in the chapel network, a monitoring sigil records the contact. You pull back cleanly but the record exists. The shrine will know that someone with enough knowledge to read ward architecture tried to do so this morning, at this location.`;
        G.worldClocks.watchfulness++;
        addJournal('Shrine magical alarm triggered by ward probe', 'complication', `shelkopolis-ward-alarm-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The ward coverage isn't uniform anymore. Trade routes and market squares run thin; the administrative buildings hold the old density. The redistribution is recent — the seam where old coverage ends and new begins still carries the faint residue of a deliberate cut. Someone rerouted the protection, and the city's merchants are on the unguarded side of that line.`;
        addJournal('Magic analysis noted uneven ward redistribution pattern', 'evidence', `shelkopolis-wards-uneven-${G.dayCount}`);
      } else {
        G.lastResult = `Fresh wax marks dot the stone at the base of the harbor wall — ward renewals, laid in the last few days. The ward structure is legible in outline but not in detail. The resonance runs wrong at the outer trace: wider than the public chapel records specify, thinner in the zones that should hold densest. Something has changed in the layering — the signatures don't match the chapel's public records of what should be here. The specifics stay just past reach. Whoever relaid these knew more than the records publish, and didn't mind the difference showing.`;
        addJournal('Ward modifications detected but details unclear', 'evidence', `shelkopolis-wards-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 12. MAGIC TIER 2: RITUAL FORMULA CORRUPTION
  {
    label: "The ritual formulas are unchanged. The results are getting worse.",
    tags: ['Magic', 'Ritual', 'Corruption'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering ritual sabotage');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Sister Velda opens the ritual books with her palms flat on the cover first — a chapel habit, not a gesture toward you. The component measurements have been altered in fractions. Ingredient ratios shifted by amounts too small to trigger a visible failure, large enough to erode efficacy over months. The wax smell of the chapel is heavy in the small room. "I thought I was misreading them," she says quietly. Whoever made these changes understood the formulas well enough to know exactly how little to change.`;
        G.stageProgress[1]++;
        addJournal('Magic analysis revealed systematic ritual formula corruption', 'evidence', `shelkopolis-ritual-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The shrine does not argue with you. A senior keeper steps forward, says the ritual books are consecrated property, and asks you to leave. Three junior workers position themselves between you and the reading alcove without being directed. The chapel closes like a hand. Outside, the stone steps are warm from morning sun and completely unhelpful.`;
        G.worldClocks.reverence++;
        addJournal('Shrine vowed to obstruct future inquiries', 'complication', `shelkopolis-ritual-blocked-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The formula pages Velda allows you to see show minor ratio variations — small enough to be transcription drift, specific enough to feel intentional. Without an archived copy from two years prior, you cannot prove which it is. The chapel smells of wax and old incense and provides no further access today.`;
        addJournal('Ritual formulas show signs of modification', 'evidence', `shelkopolis-ritual-altered-${G.dayCount}`);
      } else {
        G.lastResult = `The ritual book's binding smells of beeswax and incense-oiled leather. Velda turns pages with the care of someone handling a relic. The formulas are available but dense — layered in shrine notation that takes years to read fluently, each ingredient listed in a symbol stack that stands for dose, purification state, and invocation order. Something in the component columns sits wrong, a recurring adjustment in the third mark of each entry, but the specifics stay behind the language barrier. Velda watches which pages are studied. She says nothing. When the book closes, she rests both hands on the cover.`;
        addJournal('Ritual access granted but formulas too complex to analyze', 'evidence', `shelkopolis-ritual-complex-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 13. STEALTH TIER 1: UNGUARDED PASSAGES CLOSING
  {
    label: "Three passages through the central district are blocked. Not collapsed — filled with care.",
    tags: ['Stealth', 'Routes', 'Surveillance'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'covert route mapping');
      G.stageProgress[1]++;

      const result = rollD20('finesse', (G.skills.stealth || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Three Verdant Row passages that used to run clear are blocked — not collapsed, filled. Rubble placed with care, construction framing used as cover. New guard posts sit at the junction points that used to be blind, positioned obliquely so they're not obvious until you're already in the choke. Every old escape line through the central district now runs through a watched point. Someone mapped the city's unmonitored paths and closed them one by one. Moving quietly through Shelkopolis now means moving where you're meant to be seen.`;
        G.stageProgress[1]++;
        addJournal('Stealth analysis revealed systematic route closure', 'evidence', `shelkopolis-routes-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `A guard steps out of a recessed doorway — not a patrol route, a stationary post in a place that had no post last month. He doesn't draw anything. He just records you: your direction, your pace, your approximate description. By the time you've cleared the block, someone in the garrison has a note with your name on it, or close enough.`;
        G.worldClocks.watchfulness++;
        addJournal('Your covert movement reported to patrol command', 'complication', `shelkopolis-route-caught-${G.dayCount}`);
      } else {
        G.lastResult = `The tannery district carries its particular sharpness — lye and wet hide, river silt under the drainage grates. Two passages that used to cut clean are partially blocked, fresh stonework with the mortar still pale at the seams. No posted signage, no guild mark to name who ordered the work. Alternate lines exist, but they're longer and run past the patrol rotation's sightlines. The city's quiet routes are getting narrower, and the work has been done at a pace that suggests the closures came to the masons as a single order, not a sequence of separate jobs.`;
        addJournal('Stealth mapping confirmed recent route restrictions', 'evidence', `shelkopolis-routes-restricted-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 14. STEALTH TIER 2: INFORMATION NETWORKS TIGHTENING
  {
    label: "The street network is still running. It just doesn't move certain topics anymore.",
    tags: ['Stealth', 'Intelligence', 'Networks'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'penetrating surveillance network');
      G.stageProgress[1]++;

      const result = rollD20('finesse', (G.skills.stealth || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Crow keeps walking while he talks — an old habit. "The network's still there. It just doesn't move the same topics anymore." He describes informants who spoke too freely about northern trade routes or garrison orders: gone for three or four days, back afterward with a new policy about what they discuss. No visible enforcement. No garrison involvement. "Someone else is doing it. Someone with reach and patience." He glances at the coal-smoke haze above the tannery district. "The city still talks. Just not about certain things."`;
        G.stageProgress[1]++;
        addJournal('Stealth infiltration revealed suppressed information network', 'evidence', `shelkopolis-info-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Three people you approach go quiet in the same way — not rude, just finished. By evening, a dockworker you've never spoken to crosses the street to avoid you. The network didn't confront you. It simply passed a description and a recommendation. The street doesn't need to explain itself to make you irrelevant to it.`;
        G.worldClocks.isolation++;
        addJournal('Street network now views you as hostile', 'complication', `shelkopolis-info-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Two informants confirm things have shifted — shorter answers, more glances toward doorways. One says he stopped carrying certain information "about a month ago." He doesn't say why. The network is still running. It's just running with topics removed, like a market where certain stalls are always covered.`;
        addJournal('Information network confirmed to be operating under constraint', 'evidence', `shelkopolis-info-constrained-${G.dayCount}`);
      } else {
        G.lastResult = `The market's edge hums with its usual commerce — fish-salt from the harbor stalls, copper clang from the tinsmith's row. The street's available but not open. Two informants greet you with the practiced warmth of people who know your face and nothing about you, offer weather talk, a joke about last season's grain, a blessing from Silkweaver's. They give nothing that names a name, nothing that closes a thread. The currency that unlocks this layer hasn't been earned yet. One of them nods past your shoulder — a signal, small — and a third walks past without stopping.`;
        addJournal('Information network inaccessible without deeper trust', 'evidence', `shelkopolis-info-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 15. SUPPORT TIER 1: SOCIAL FABRIC DEGRADING
  {
    label: "People are ending their conversations earlier than they used to. Nobody can name why.",
    tags: ['Support', 'Community', 'Social'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'community analysis');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The Amber Fountain used to host the ward councils — Marta still has the bench arrangement for it, shoved against the wall now. The market runs transaction to transaction without the sideways conversations that used to slow it down. Three families you watch in the square near the chapel split off before they would have before: a nod, a word, then separate directions. Nobody has forbidden gathering. Nobody needed to. The pressure is diffuse and sourceless, and the city has learned to avoid what it can't name.`;
        G.stageProgress[1]++;
        addJournal('Support analysis revealed systematic social isolation', 'evidence', `shelkopolis-social-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Two people you speak with give you the same look — not hostile, measuring. A third ends the conversation by remembering somewhere to be. In a city already pulling inward, your questions about community read as surveillance. You've made yourself part of the problem you were trying to map.`;
        G.worldClocks.isolation++;
        addJournal('Community now views you with suspicion', 'complication', `shelkopolis-social-hostile-${G.dayCount}`);
      } else {
        G.lastResult = `The Amber Fountain is quieter than the hour warrants. The market voices are lower. In the square by the chapel, a group of laborers who would ordinarily share a bench eat separately, two feet apart, not speaking. The change is everywhere and invisible, like the tannery smell — you only notice it when you stop to look.`;
        addJournal('Community patterns show reduced social interaction', 'evidence', `shelkopolis-social-quiet-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 16. SUPPORT TIER 2: TRUST EROSION AND FEAR MAPPING
  {
    label: "Old partnerships dissolving quietly. Nobody made a dramatic move. Nobody needed to.",
    tags: ['Support', 'Fear', 'Trust'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'mapping institutional distrust');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `A wool merchant won't share a table with the silk broker he's traded alongside for eleven years — not a quarrel, a precaution. Two artisan families who split a kiln for a decade stopped sharing it in autumn; neither says why. The shrine no longer draws people who linger. The garrison and the civilian quarter nod and don't speak. The fractures are everywhere and nobody made a single dramatic move. Someone introduced just enough uncertainty — a rumor here, a consequence there — and let the city do the rest. Shelkopolis is breaking itself from the inside.`;
        G.stageProgress[1]++;
        addJournal('Support analysis mapped weaponized distrust network', 'evidence', `shelkopolis-trust-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `In a city already afraid of being overheard, your questions about who fears whom land exactly wrong. Three separate people end conversations quickly. By nightfall, the Iron Accord registry has a note — not a report, a note — that someone was asking unusual questions in the market district. The pressure clock moves.`;
        G.worldClocks.pressure++;
        addJournal('Your fear mapping queries reported to authorities', 'complication', `shelkopolis-trust-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `A chandler mentions a partnership that dissolved last season — "trust issues," he says, and goes quiet. A tailor's apprentice says her master stopped attending the guild dinners. Two people in the same morning use the same phrase: "I don't know who to believe anymore." The fractures are real. The sources stay unnamed.`;
        addJournal('Widespread trust degradation confirmed by citizen accounts', 'evidence', `shelkopolis-trust-confirmed-${G.dayCount}`);
      } else {
        G.lastResult = `At the Amber Fountain's bench, two chandlers share a jug but not a conversation, each drinking at their own pace. People are cordial and closed. The shape of the fear is clear from the outside — shorter answers, careful topics, eyes that track doorways at intervals too regular to be accidental. A cloth merchant greets a neighbor by trade and not by name. The specific injuries stay private. Whatever was done to each person here was done privately, and the repair, if it comes, will be the same way — one household at a time, with no one watching who would recognize the pattern.`;
        addJournal('Distrust sensed but not fully documented', 'evidence', `shelkopolis-trust-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== GOSSIP & TENSION LAYERS (4 CHOICES) ==========

  // 17. STREET RUMOR: SURFACE SOCIAL TENSION
  {
    label: "The same rumor at both ends of the market, in a lowered voice.",
    tags: ['Rumor', 'Social', 'Gossip'],
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
      addJournal(`Street rumor gathered: "${selected}"`, 'rumor', `shelkopolis-rumor-${G.dayCount}`);

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 18. INSTITUTIONAL CRACK: PROOF OF INTENTIONAL MISALIGNMENT
  {
    label: "Garrison orders, chapel ledger, trade registry. Same eight-week window. Same hand.",
    tags: ['Evidence', 'Proof', 'Systematic'],
    xpReward: 80,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(80, 'exposing institutional conspiracy');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Garrison weapon transfer orders. Chapel ledger pages with component ratios altered by fractions. Trade registry entries that end and don't resume. Each document alone is explainable. Spread on the same surface in lamplight, with the tallow smell of the registry room around you, they are not. The same hand — or the same instruction — reached into three separate institutions in the same eight-week window. This is not institutional decay. Something directed this, and the direction came from outside the ordinary chain.`;
        G.stageProgress[1]++;
        addJournal('Institutional conspiracy documentation compiled', 'discovery', `shelkopolis-proof-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `A sealed note arrives at your lodging before you've finished compiling. No signature. It lists three locations you visited this week and the approximate time of each. Nothing threatening — just a demonstration that someone has been keeping pace with you. The note is written on chapel-quality paper. You are being shown that the walls you're examining can see back.`;
        G.worldClocks.pressure++;
        addJournal('Operators noted which documents you compiled — they kept pace', 'complication', `shelkopolis-proof-caught-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `The garrison timeline and the chapel ledger dates don't match by accident — they overlap in a way that requires the same decision-maker. You can't prove coordination from these documents alone, but the question has shifted from whether something is wrong to who made it wrong.`;
        addJournal('Compelling contradiction evidence found', 'evidence', `shelkopolis-proof-partial-${G.dayCount}`);
      } else {
        G.lastResult = `The registry table smells of tallow and dry paper. The documents spread across it are suggestive but not conclusive. Garrison orders, chapel ledger pages, trade manifest copies — each anomaly has a plausible separate explanation, a benign procedural reason why this date is wrong, why that entry lacks a signature, why the third folio is shorter than the others. The pattern is there in outline: overlap too precise for chance, silences too exact to be neglect. The outline isn't enough yet. One lamp sputters and steadies. The ink on the newest copy is still drying at the margin.`;
        addJournal('Evidence fragments found but incomplete', 'evidence', `shelkopolis-proof-incomplete-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 19. MORAL PRESSURE: COMPLICITY OR RESISTANCE CHOICE
  {
    label: "The complicit witness is waiting to see what you do with what they just told you.",
    tags: ['Moral', 'Choice', 'Pressure'],
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
    label: "The letters name people by function, not name. They're orders, not correspondence.",
    tags: ['Origin', 'Discovery', 'Climax'],
    xpReward: 80,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(80, 'discovering origin source of corruption');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `In the chapel's letter alcove, tucked inside a consecration record no one would pull without cause, a single sheet of correspondence in northern trade tongue. It names no one in Shelkopolis by title, only by function — the garrison officer, the shrine keeper, the registry clerk. Orders, not requests. The sheet smells of the same wax on every sealed letter Marta flagged at the Amber Fountain. Shelkopolis isn't failing. It's being operated from somewhere north of its borders, and whoever is running it hasn't finished yet.`;
        G.stageProgress[1]++;
        addJournal('Origin source of Shelkopolis corruption identified as external coordination', 'discovery', `shelkopolis-origin-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Two men step out from the alcove before you reach the letter cache. They don't explain themselves. One takes your arm, the other opens the side door to the street, and you are outside the chapel in under a minute with nothing in your hands. The coal-smoke of the street hits you immediately. You were close enough that they moved. Whatever is in that alcove, they know you were looking for it, and now they know your face.`;
        G.worldClocks.pressure += 2;
        addJournal('Operators moved to intercept — they know which alcove you were heading for', 'complication', `shelkopolis-origin-caught-${G.dayCount}`);
      } else if (result.total >= 14) {
        G.lastResult = `The chapel alcove is cool, stone-walled, lit by a single votive at the far end. The sealed letters reference northern intermediaries by role, not name — "the broker," "the keeper," "the watch-hand" — titles that travel without a face attached. The language is trade tongue: formal, transactional, stripped of personal detail. Someone outside Shelkopolis is running these instructions inward. The city is a destination, not a source. The thread leads north. The wax on each seal carries the same impressed pattern — a concentric ring with a single break at the top, small enough that a casual eye passes over it.`;
        addJournal('External coordination of Shelkopolis conspiracy confirmed', 'discovery', `shelkopolis-origin-external-${G.dayCount}`);
      } else {
        G.lastResult = `The collected fragments spread across the lodging table in the lamplight — sealed letter extracts copied by hand, ledger gap dates, a handful of wax shards lifted from the chapel alcove floor. The evidence points outward but not to anything specific. Northern trade references, coded timing, a cipher that holds shape without yielding sound. Breaking it would take a key that hasn't surfaced: a named sender, a matched seal registry, a courier willing to talk. The origin is beyond what this pass yields. The shards rest in their cloth. They smell faintly of rosin and bees.`;
        addJournal('External coordination suspected but source not yet identified', 'evidence', `shelkopolis-origin-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== EXPANSION: PROGRESS + ARCHETYPE + FACTION SEEDS ==========

  {
    label: "Letters, then supply shifts — two days apart, every time.",
    tags: ['Evidence', 'Stage1'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'cross-referencing coordination evidence');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.isCrit) {
        G.lastResult = `Every supply disruption follows a sealed letter by two days. The gaps in the trade registry track the same Thursday-Sunday deposit schedule Brother Aldwin described. The chapel letter system isn't incidental to the conspiracy — it is the command channel. Someone reads those deposits and moves the supply lines accordingly.`;
        addJournal('Letters confirmed as operational directives — chapel is command channel', 'evidence', `shelk-crossref-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The registry room smells of wax polish and the dryness of pressed parchment. The volumes you came for sit nowhere on the public shelves; the clerk gestures toward a locked side room. They've been transferred to secure storage — a routine audit procedure, she explains pleasantly, with the particular warmth of a polished refusal. The timing is not routine. Someone moved the records before you arrived, which means someone knew you were coming to look at them. The clerk returns to her work. Her pen continues without pause. She has been expecting you for at least a day.`;
      } else {
        G.lastResult = `The cross-reference sits on the lodging table in three columns — letter deposit dates, supply shift dates, commodity code. The dates align more than chance allows. Letter deposits cluster just before supply shifts in three separate commodities: silkwood, dyed thread, finished bolts. The offset is consistent — two days, each time, the same margin that Brother Aldwin named at the chapel. It isn't proof yet, but the window for coincidence has narrowed considerably. The pages still smell of fresh ink. The lamp beside them burns steady, and the night outside is quiet.`;
        addJournal('Coordination pattern suggestive but inconclusive', 'evidence', `shelk-crossref-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Ward failures started at Ironspool's northwest edge. They spread inward from there.",
    tags: ['Lore', 'Stage1'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'mapping ward failure zones');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
      G.lastResult = `The earliest ward degradation traces to the Ironspool district's northwest edge — the seam nearest the northern road. From there the failures spread inward, district by district, over six weeks. The pressure is directional. Whatever is pulling against the chapel's ward network originates outside Shelkopolis, northwest of the harbor, and it has been steady and patient.`;
      addJournal('Ward failure vector confirmed pointing northwest', 'evidence', `shelk-wards-vector-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Three unguarded points, northern gate to the registry buildings, in a direct line.",
    tags: ['Combat', 'Stage1'],
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
      addJournal('Prepared access corridor identified — conspiracy using Shelkopolis as transit', 'evidence', `shelk-corridor-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "A Warden Order officer is working the same evidence trail. They let you know it.",
    tags: ['NPC', 'Faction', 'Stage1'],
    xpReward: 60,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(60, 'identifying parallel trail');
      if (!G.flags) G.flags = {};
      if (!G.factionHostility) G.factionHostility = { warden_order: 0, iron_compact: 0, oversight_collegium: 0 };
      G.flags.met_warden_order_contact = true;
      const arch = G.archetype && G.archetype.group;
      if (arch === 'combat') {
        G.lastResult = `The Warden Order officer steps into your path on Verdant Row and thumbs open the clasp of his case-book without looking down — the same half-second motion each time a name goes into it. "We're working the same ground." Same evidence trail, same chapel correspondence pattern. He doesn't offer cooperation; he announces overlap. The book closes with his thumb still on the clasp. Your name is in it now. The coal-smoke smell of the street stays behind him.`;
        G.factionHostility.warden_order = Math.max(0, G.factionHostility.warden_order - 1);
      } else {
        G.lastResult = `A Warden Order officer stops beside you at the chapel steps and speaks without turning — her left hand keeps a folded slip of paper pinched between two knuckles, a margin note she wrote before she saw you. "The same anomalies. We noticed." The slip goes back into her cuff as she walks on. The Principalities' enforcement arm has been here longer than you have, and they chose to let you know it.`;
      }
      addJournal('faction', 'Warden Order acknowledged overlap — same evidence trail', `shelk-warden-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Someone was here before you, asking the same questions. They wrote down the answers.",
    tags: ['NPC', 'Warning', 'Stage1'],
    xpReward: 55,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(55, 'learning of prior operative');
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
      G.flags.stage1_rival_seeded = true;
      addJournal('warning', 'Prior operative confirmed — methodical, already ahead on the evidence trail', `shelk-rival-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Stay the evening at the Amber Fountain. Let the regulars decide what to say.",
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
    label: "The blessing records read differently when you align the dates with the supply shifts.",
    tags: ['Lore', 'Stage1'],
    xpReward: 65,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(65, 'decoding blessing record communication pattern');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.isCrit) {
        G.lastResult = `The recipients map to the sealed letter network. The dates align with supply disruptions and garrison order changes. The chapel's blessing record — open to any petitioner, logged in plain ink — is an operational schedule. Recipients mark whom to contact; dates mark when to move. The wax-and-stone smell of the chapel is everywhere in this room, and the conspiracy has been using its most public document as a broadcast channel.`;
        addJournal('Chapel blessing records decoded as operational schedule cipher', 'discovery', `shelk-cipher-${G.dayCount}`);
      } else {
        G.lastResult = `Some recipients appear more than once in the same short windows. Some dates cluster without obvious cause — no feast days, no estate anniversaries. The pattern has a shape but not yet a key. The chapel's lamplight makes the columns easy to read and the meaning easy to miss.`;
        addJournal('Blessing records show unusual patterns — cipher suspected', 'evidence', `shelk-cipher-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The night-watch commander files reports that come back amended. She stopped asking why.",
    tags: ['NPC', 'Combat', 'Stage1'],
    xpReward: 58,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(58, 'gathering night-watch intelligence');
      if (!G.flags) G.flags = {};
      G.flags.met_night_watch_commander = true;
      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 11 || result.isCrit) {
        G.lastResult = `The night-watch commander turns her signet ring halfway around her finger, stone-side-in, before she speaks — a habit from reporting to superiors, reversed now to address you. "I file reports. Some come back amended. I stopped asking why." Ironspool district, after midnight: unmarked carts, no manifest, no escort. "Authorized transports," she was told. She turns the ring back the other way. "I stopped following up." She hasn't stopped noticing. That's why she's telling you.`;
        addJournal('Night-watch confirms unauthorized Ironspool midnight transports', 'evidence', `shelk-nightwatch-${G.dayCount}`);
      } else {
        G.lastResult = `The night-watch commander's signet ring stays stone-side-out the whole conversation — formal register, the one she uses for amended reports. "Nothing to report." She means it as a complete sentence. She holds eye contact just long enough for it to be a message, then looks at the wall behind you.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The herbalists have been moving glasswake moss in bulk. It's a resonance amplifier.",
    tags: ['Survival', 'Stage1'],
    xpReward: 62,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(62, 'checking botanical compound movement');
      const result = rollD20('vigor', (G.skills.survival || 0) + Math.floor(G.level / 3));
      if (result.total >= 11 || result.isCrit) {
        G.lastResult = `The herbalist pulls the order book without being asked — she's been waiting for someone to ask. Dried glasswake moss, eight months of northern orders, quantities that would supply the Academy for two years. "We assumed that's where it went." The tannery smell drifts in from the south end of the row. Glasswake is a resonance amplifier. The Academy hasn't placed any orders with Verdant Row this season.`;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('Glasswake moss orders tracked — resonance precursor moving through Verdant Row', 'evidence', `shelk-botanical-${G.dayCount}`);
      } else {
        G.lastResult = `The herbalist's shop smells of dried bark and crushed lavender. Rows of labeled glass jars run the length of the back wall, each with a hand-written tag. The owner mentions unusual order volumes in passing — a word about northern buyers, a vague shrug toward a full shelf of glasswake — then pulls back, rearranges two jars that don't need rearranging, checks a tag already correct. She'll say more to someone she knows better. The trust isn't there yet, and she's not going to be pushed into it. The shop bell rings behind you. Another customer enters. The conversation is over.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The sealed letter frequency has changed since you started asking questions.",
    tags: ['Stealth', 'Stage1'],
    xpReward: 66,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'monitoring surveillance response');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('finesse', (G.skills.stealth || 0) + Math.floor(G.level / 3));
      if (result.isCrit) {
        G.lastResult = `Twice the deposits, same two-day window. Something changed — either the operation's timeline accelerated, or word of your questions reached whoever writes the orders. The wax seals on the alcove shelf have been replaced more recently than usual; the chapel stone still smells of fresh tallow from the relighting. The network is moving faster, and it knows this city better than you do.`;
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        addJournal('warning', 'Letter frequency doubled — network accelerating in response to scrutiny', `shelk-monitor-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `A novice steps out of the chapel side door and looks directly at you — not surprised, not alarmed. Just noting. The letter alcove window goes dark within the hour. Three days pass with no deposits at all. The network didn't panic. It simply paused and waited for you to move on.`;
      } else {
        G.lastResult = `From the bench across from Silkweaver's Chapel, the deposit window is visible without being obvious — a slot in the alcove stone, wax-shadowed at the edges. The count has edged up over the last week: one extra deposit, nothing dramatic, nothing that would catch an idle eye. The chapel routine looks unchanged from the street. Novices trim the outer lamps at the posted hour. The morning blessings still ring at the posted times. Whatever the network registered about increased attention in Shelkopolis, it's absorbing it without breaking stride. That discipline is itself a signature.`;
        addJournal('Letter frequency increased — general alertness elevated', 'evidence', `shelk-monitor-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },
  // SUPPRESSION: MISSING SIGNATORY ON TRANSIT AUTHORIZATION
  {
    label: "The second signature line is blank. The stamp is there. The date is there. The name is not.",
    tags: ['Suppression', 'Records', 'Bureaucracy', 'Stage1'],
    xpReward: 50,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(50, 'reading missing signatory on transit document');

      G.lastResult = `The permit registry desk carries the flat smell of pressed wax and dry hemp fiber. A clerk works through the outbox tray at steady pace — stamping, dating, stacking. The third transit authorization in the row requires two signatories by Iron Accord procedure: a routing officer and a countersigning authority. The routing officer's name is present in clear, practiced script. The second signatory line is blank. Not crossed out. Not marked pending. The form has the date. It has the stamp. Only the second name is absent. The clerk who filed it is no longer posted to this office — the name placard on the desk behind hers has been removed, leaving a rectangular patch of less-faded wood where it sat.`;
      addJournal('Transit authorization at Shelkopolis registry — second signatory absent on Iron Accord form. Clerk who filed it no longer posted here.', 'evidence');
      G.recentOutcomeType = 'observe';
      maybeStageAdvance();
    }
  },

  // SUPPRESSION: AUTHORIZATION COLUMN WITH NO SIGNATORY
  {
    label: "The authorization column is blank — not struck through, not initialed. Blank.",
    tags: ['Suppression', 'Records', 'Bureaucracy', 'Stage1'],
    xpReward: 45,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(45, 'reading institutional gap in signatory column');

      G.lastResult = `The civic hall processing room carries the flat smell of dried ink and pressed hemp fiber. A row of transit authorizations sits in the outbox tray, each stamped with the day's date in the upper right corner. The fourth form carries a reference code in the authorization column — six digits, cleanly printed — but the signatory line beside it is empty. Not crossed out. Not marked pending. The form has been stamped complete. The clerk at the long table lifts another sheet from the stack and sets to work on it. The empty column stays empty.`;
      addJournal('Shelkopolis civic hall transit authorizations: one form carries a valid authorization code with no signatory name — column blank, form marked complete and filed', 'intelligence');
      G.recentOutcomeType = 'observe';
      maybeStageAdvance();
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
},
  {
    label: "The barkeep remembers faces. She hasn't forgotten mine.",
    tags: ['Tavern', 'Social', 'NPC'],
    xpReward: 50,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(50, 'talking to the barkeep');
      var result = rollD20('persuasion', (G.skills.persuasion||0) + Math.floor(G.level/3) + (typeof getTraitBonus==='function'?getTraitBonus('persuasion'):0) + (typeof getEquipmentBonus==='function'?getEquipmentBonus('persuasion'):0));
      if (result.total >= 8) {
        G.lastResult = "Maret wipes down the counter and doesn't look at you when she talks. She mentions a manifest clerk who's been drinking alone three nights running — starting the evening the southern shipment arrived. She doesn't say what was in it. She sets down a second cup without being asked. That's the closest she comes to endorsing your line of work.";
        G.flags = G.flags || {};
        G.flags.shelk_barkeep_manifest_thread = true;
        G.investigationProgress = (G.investigationProgress||0) + 1;
        G.recentOutcomeType = 'success';
        addJournal('Maret (barkeep): manifest clerk drinking alone since the southern shipment arrived', 'intelligence');
      } else {
        G.lastResult = "Maret refills the cup and moves on. She's not unfriendly — she just doesn't know you well enough yet to be useful.";
        G.recentOutcomeType = 'neutral';
      }
    }
  },
  {
    label: "There's a room upstairs and a reason to stay another night.",
    tags: ['Inn', 'Rest', 'Social'],
    xpReward: 40,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(40, 'staying at the inn');
      G.hp = Math.min(G.maxHp, (G.hp||0) + 5);
      G.lastResult = "The room is narrow and the mattress is stuffed with something that isn't quite wool. The innkeeper — a man named Fessel who records everything in a small ledger — notes your arrival without comment. He does say the room above yours was vacated this morning, two days early. He says it the way you say things you want someone else to follow up on.";
      G.recentOutcomeType = 'neutral';
      addJournal('Fessel (innkeeper): room above vacated two days early this morning', 'intelligence');
    }
  },

  // SUPPRESSION: DATE GAP IN REGISTRY LOG
  {
    label: "The registry log runs clean for eight months, then skips three weeks without explanation.",
    tags: ['Suppression', 'Records', 'Bureaucracy', 'Stage1'],
    xpReward: 50,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(50, 'reading anomalous date gap in registry log');

      G.lastResult = `The Shelkopolis transit registry log sits open on the reading ledge, its spine cracked flat from daily use. Eight months of entries run in tight columns — dates, reference codes, routing destinations, clerk initials — without a break. Then a gap: three weeks absent from the sequence, the surrounding pages undamaged, the ink on the entries before and after it equally faded. Not a torn section. Not a water stain. The dates resume as if nothing was skipped. The clerk at the far desk begins a new entry without looking up. The three empty weeks have no marking, no note, no asterisk. They are simply gone from the record.`;
      addJournal('Transit registry at Shelkopolis: three-week gap in an otherwise continuous eight-month log — no damage, no notation, surrounding pages intact. Source: Shelkopolis registry reading room.', 'intelligence');
      G.recentOutcomeType = 'observe';
      maybeStageAdvance();
    }
  }
];

// Sideplot injection — shelk-fairhaven ledger shadow opening hook
(function() {
  var _shadowHook = (typeof SHELK_FAIRHAVEN_LEDGER_SHADOW !== 'undefined') ? SHELK_FAIRHAVEN_LEDGER_SHADOW.openingHook() : null;
  if (_shadowHook) SHELKOPOLIS_STAGE1_ENRICHED_CHOICES.push(_shadowHook);
})();

window.SHELKOPOLIS_STAGE1_ENRICHED_CHOICES = SHELKOPOLIS_STAGE1_ENRICHED_CHOICES;
