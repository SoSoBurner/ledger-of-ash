/**
 * SHELKOPOLIS STAGE 1 ENRICHED CHOICES
 * 28 grounded paths tied to NPC work and locality tensions
 * Generated for: Trade vs dignity, refinement vs necessity, public harmony vs covert rivalry
 * Each choice: 55-80 XP, grounded in specific NPC perspective, layered wrongness reveal
 */

var SHELKOPOLIS_STAGE1_ENRICHED_CHOICES = [
  // ========== NPC-GROUNDED CHAINS (8 CHOICES) ==========

  // 1. INNKEEPER: GUEST PATTERNS
  {
    plot: 'main',
    questId: 'q_s1_pattern',
    label: "The innkeeper notices things she doesn't write down. Three guests, same careful question.",
    tags: ['NPC', 'Observation', 'Intelligence'],
    xpReward: 70,
    stageProgress: 1,
    failResult: "Marta is mid-pour when you approach, and she stays mid-pour until the cup is full. The Amber Fountain is busy this hour — someone needs change, someone needs a second lamp. When the counter finally quiets, the moment has closed. She doesn't refuse; she simply has no opening to offer. The harbor smell drifts through the door. The clerk's row near the registry buildings opens early — paperwork has its own patience.",
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
        G.lastResult = `Marta stops polishing the counter. She doesn't answer — she moves. Refills a cup at the far end of the bar, exchanges four words with a dockworker, adjusts the lamp by the door. The Amber Fountain fills around you and your question. When you finally leave, the coal-smoke smell from the street feels cleaner than the careful silence you walked out of. Whatever she tracks in that inn, she's decided you're not safe to share it with. The pressure of her silence is its own communication — every other ear in the common room noticed the question go unanswered.`;
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
    plot: 'main',
    questId: 'q_s1_converging',
    label: "The sealed letters at Silkweaver's Chapel run on a schedule. Twice a week, no names.",
    tags: ['NPC', 'Evidence', 'Mystery'],
    xpReward: 75,
    stageProgress: 1,
    failResult: "Brother Aldwin is mid-blessing when you arrive, the chapel entry full of morning petitioners. He acknowledges you with a nod that means later, and later does not come before the mid-tide bell rings and the chapel empties in the direction of the market. The letter alcove is visible from the nave — deposits run after the dusk-call bell, which gives the rest of the day for other approaches.",
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering covert communication network');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit || (result.total >= 13 && !result.isFumble)) {
        G.lastResult = `Brother Aldwin folds his hands on the lectern before he speaks. Twice a week — second-watch and fifth-watch evenings, after the dusk-call bell — a veiled figure collects the letters. Northern trade-tongue. No names. The wax seals carry no house crest. He admits the letters began arriving the same month the evening blessings started requiring a second repetition to hold. "I told myself it was coincidence," he says. The wax smell still clings to the alcove where they're left. The letters reference consignment tallies that don't appear in any registered manifest. The routing numbers exist. The shipments do not.`;
        G.stageProgress[1]++;
        addJournal('Sealed letter network mapped to chapel intermediary — routing numbers exist, shipments do not', 'evidence', `shelkopolis-letters-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Brother Aldwin receives your questions with the full warmth of the chapel's public face. He walks you to the door himself, offers a traveling blessing, wishes you safe passage. The wax-and-stone smell of the chapel follows you out. You're three streets away before you remember: there was a novice at a writing desk in the side alcove the entire time. You don't know what was recorded. The chapel didn't need to ask you to leave. It simply wrote down that you came. The watchful network of chapels in this city is how that record travels — it will precede you.`;
        G.worldClocks.watchfulness++;
        addJournal('Chapel clerk logged your inquiry — visit formally noted', 'complication', `shelkopolis-chapel-alert-${G.dayCount}`);
      } else {
        G.lastResult = `Brother Aldwin confirms letters pass through the chapel — private correspondence for traveling merchants, he says, a service the chapel has offered for generations. His hands stay folded when he says it. He doesn't look at the alcove. He doesn't need to. The wax-and-stone smell of the chapel sits heavy in the air between you. A novice at the far writing desk pauses, then resumes. Whatever the full arrangement is, he's decided the public version is the only one you'll hear today, and he has had this conversation enough times to make that decision feel like generosity.`;
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
    failResult: "Sereth has a client in the fitting alcove when you arrive, pins in hand, a complicated hem requiring all his attention. The fish-salt smell of the harbor comes through the open back window. He waves you toward the counter ledger — browse the open commission records, come back when the fitting is done. The book is there. The abandoned order slips are in it.",
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
        G.lastResult = `Sereth mentions it sideways, the way tailors talk about money — obliquely, while measuring something else. Three commissions this season, high coin, abandoned before the first fitting. "It happens," he says. Then: "Not three times." He goes back to his pins. The fish-salt smell of the harbor comes in through the window behind him. Two bolts of uncut cloth lean against the cutting table, waiting on orders he hasn't placed yet. He hasn't decided whether you're someone he can say more to, and he won't decide while he's in the middle of work.`;
        addJournal('Tailor acknowledged unusual commission abandonment', 'evidence', `shelkopolis-tailor-pattern-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 4. CLERK/RECORD KEEPER: LEDGER DISCREPANCIES
  {
    label: "Autumn entries stop mid-column. The ink around the gap is clean.",
    tags: ['NPC', 'Records', 'Bureaucracy'],
    xpReward: 75,
    stageProgress: 1,
    failResult: "The reading room is occupied — two estate advocates with a stack of folios that will keep the desk clerk busy until midday. The ledger you want sits on the closed-access shelf behind the counter. The tallow-and-ink smell of the room is patient. The garrison quartermaster's office holds parallel supply columns; that route stays open.",
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
        G.lastResult = `Thom opens three volumes. He is genuinely helpful — dates, authorization codes, shipment origins, the full column of northern silkwood entries right up to where they stop. You get real information. Then you catch his eyes tracking which line you're reading. He's not helping you understand the ledger. He's cataloguing what you now know. You leave with evidence and the certainty that before the lamplight shifts in this building, someone will be told exactly which pages you stopped on. The gap in the record is a protected question — and you are now tracked as someone who found it.`;
        G.worldClocks.watchfulness++;
        addJournal('Learned real evidence — but Thom marked exactly what you found', 'complication', `shelkopolis-merchant-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Thom allows access but stays close. The pages for the autumn trade season show ghosts — the slight bowing of the binding where sheets once sat. Removed cleanly, not torn. He doesn't comment on it. When you point to the gap, he tilts his head as though he is seeing it for the first time, which he is not. The routing numbers exist in the adjacent columns. The shipments do not. Someone kept the accounting structure and removed only the cargo. That distinction is not an accident.`;
        addJournal('Clerk confirmed deliberate ledger removal pattern', 'evidence', `shelkopolis-ledger-removed-${G.dayCount}`);
      } else {
        G.lastResult = `Thom straightens a stack of already-straight papers and explains that registry access requires a stamped request from the Iron Accord, countersigned by a house advocate. He says it pleasantly, with the particular warmth of a refusal that has been well-rehearsed. The lamplight smell of tallow and old ink fills the room. The ledger you want sits on the closed-access shelf, spine visible, binding cracked from daily use. None of what's in it belongs to you without the paperwork, and Thom's hands never stop moving.`;
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
    failResult: "The registry desk is closed for the morning audit — a clerk posts the notice without looking up, and the stamp window goes dark. The transit authorizations sit in the outbox tray behind the counter, visible but out of reach. The dock manifest board near the harbor gate carries similar authorization codes. That board is public.",
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
    failResult: {
      text: "Sister Velda is mid-ceremony when you arrive — a full ward renewal, her back to the nave, hands pressed flat to the floor stone. The wax smell of the chapel is heavy and close. The ceremony runs long. When it ends, two families waiting for private blessings step forward before you can, and Velda moves to them without pausing. The chapel records her renewal schedule in an open ledger on the reading stand near the entrance. The dates are there. The intervals between them tell a story of their own.",
      xp: 0,
      effects: [],
      next: [{text: "Read the ward renewal schedule in the open ledger.", skill: 'lore', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
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
        G.lastResult = `Sister Velda gives you an hour. Renewal cycles, protection radius, the seasonal cadence of blessings going back thirty years — she recites it with the confidence of someone who has said it many times. The wax smell of the chapel floor and the warmth of the candles make the morning pass quickly. It's only outside, in the coal-smoke of the street, that the figures settle into place: every one she cited matched the documentation from three years ago. The shrine fed you its archived baseline. The morning is gone. The scrutiny of what you were actually looking for has been noted and neutralized in the same movement.`;
        G.worldClocks.reverence++;
        addJournal('Shrine fed false baseline data — wasted morning, window lost', 'complication', `shelkopolis-shrine-hostile-${G.dayCount}`);
      } else {
        G.lastResult = `The shrine worker admits the renewal schedule has tightened. "Seasonal," she says, though she says it toward the floor and her hands stay busy at the wick trimmer. The wax on the chapel stones near the main ward-mark is newer than the surrounding stone — relaid recently and more than once. The chapel's lamplight catches the fresh layer. She won't elaborate on what the change means or when it began, but the floor says enough: the marks are being maintained at twice the usual rate, and she knows it.`;
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
    failResult: {
      text: "Kaen is mid-transaction when you reach his stall — two estate stewards with a price dispute and a ledger spread between them, a conversation that will not yield its space. The fish-salt of the harbor hangs over Verdant Row. His tally board is visible from where you stand: three blank supplier lines in the northern column, no names, no quantity marks. He does not look up. The manifest board near the harbor gate posts the same commodity codes. That board does not require a conversation.",
      xp: 0,
      effects: [],
      next: [{text: "Check the harbor gate manifest board for northern commodity codes.", skill: 'lore', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'deciphering economic pressure');
      G.stageProgress[1]++;

      const result = rollD20('charm', (G.skills.persuasion || 0) + (G.skills.insight || 0) / 2 + Math.floor(G.level / 3));

      if (result.isCrit) {
        var _kaenFam = (typeof getArchetypeFamily === 'function') ? getArchetypeFamily(G.archetype) : '';
        var _kaenDetail = _kaenFam === 'combat' ? ' He doesn\'t stand with his back to the row while he talks to you — he angles himself so he can watch both approaches without appearing to.' : _kaenFam === 'stealth' ? ' He puts a bolt of cloth between you and the nearest stall before he speaks. The gesture is automatic, habitual.' : _kaenFam === 'support' ? ' He finishes with: "Whoever is on the other end of this — they\'re not watching the stalls. They\'re watching the people the stalls feed." He means it as a warning.' : '';
        G.lastResult = `Kaen steers you to the far end of the stall, away from the open row. "Three weeks. No northern silkwood. Not delayed — stopped." He keeps his voice below the market noise. "The shortfall is too clean. One supplier goes quiet, another follows the same week. That doesn't happen by weather or road. Someone with reach into the northern territories is holding the supply off Verdant Row deliberately." The fish-salt smell from the harbor district drifts through. "When the primary trade good dries up, the estates start owing favors to whoever still has it."` + _kaenDetail;
        G.stageProgress[1]++;
        addJournal('Broker mapped deliberate supply chain isolation', 'evidence', `shelkopolis-broker-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Kaen sets down his chalk and looks at you directly. "I don't talk market conditions with people who ask the way you just asked." He turns back to his tally board. By the time you've reached the end of Verdant Row, two other brokers have found reasons to be busy. The market knows how to close without making a sound. Being noticed here this way means the next approach to any broker on this row will be received with the same silent refusal before the question finishes.`;
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
    failResult: {
      text: "Captain Thorne is at the garrison's duty desk when you arrive, signing off a rotation change with two clerks waiting on him. The coal-smoke smell of the precinct carries through the open side door. He does not look up. The duty clerk beside him moves to intercept — standard procedure, officer engaged, come back the following watch. The patrol rotation board is visible from the corridor outside, mounted on the wall beside the dispatch window. The Ironspool column's recent crossings-out are legible from the public side of the counter.",
      xp: 0,
      effects: [],
      next: [{text: "Read the patrol rotation board from the corridor.", skill: 'survival', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading enforcement reallocation');
      G.stageProgress[1]++;

      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        var _thorneFam = (typeof getArchetypeFamily === 'function') ? getArchetypeFamily(G.archetype) : '';
        var _thorneDetail = _thorneFam === 'combat' ? ' Before you leave, he says: "If it comes to something in Ironspool at night, the garrison won\'t be there to complicate it." He\'s not sure whether that\'s a warning or an offer.' : _thorneFam === 'stealth' ? ' He drains the cup and says nothing for a moment. Then: "Don\'t be visible in Ironspool after the second bell. That\'s all I\'m saying." He picks up the cup and turns it slowly.' : _thorneFam === 'support' ? ' When you stand to go, he doesn\'t look up. "Whatever you find — if there are people caught in it — the garrison won\'t move against them quickly. That\'s what the repositioning guarantees." He means it as a margin.' : '';
        G.lastResult = `Thorne wraps both hands around his cup before he starts. "Orders shifted twice in two weeks. Ironspool district — we pull back at nightfall now. 'Resource optimization.' Nobody in the lower ranks believes that." He keeps his voice level, but his thumb taps the table once. "Temple district doubled. No declared threat. Someone above the garrison commander is repositioning us, and the commander is letting them." He drains the cup. He knows he's told you something that can't be untold, and he's not sure yet if that was a mistake.` + _thorneDetail;
        G.stageProgress[1]++;
        addJournal('Patrol captain revealed re-orchestrated garrison positioning', 'evidence', `shelkopolis-patrol-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Thorne goes still. Not angry — still, the way a gate goes still when it locks. "Garrison operations aren't a topic for this conversation." He sets his cup down and straightens his collar. Two soldiers at the next table look up. You're not threatened, exactly. But the room has shifted, and the coal-smoke smell of the street outside suddenly seems worth walking toward. The pressure of those two soldiers' attention will follow this line of questioning — they have faces now to match to the inquiry.`;
        G.worldClocks.pressure++;
        addJournal('City guard now viewing you as potential threat', 'complication', `shelkopolis-patrol-hostile-${G.dayCount}`);
      } else {
        G.lastResult = `Thorne grants you "operational priorities" and nothing else. He says it like a door closing — polite, final, framed in procedure. The coal-smoke smell of the garrison hangs in the room. The patrol rotation board behind him shows three crossings-out in the Ironspool column, the ink still dark. He doesn't turn to look at it while he talks, which means he doesn't need to. Whatever the crossings-out say, he knows, and he's decided the operational summary is as far as this conversation goes.`;
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
    failResult: {
      text: "Brother Aldwin is leading the morning petitioners through the nave when you arrive — a full public observance, the chapel doors open, the wax-and-stone smell carrying into the street. It runs long. When it closes, a family requiring a private blessing takes his attention next, and then a shrine novice with a scheduling question he cannot defer. The morning is gone. The confession register sits open on the reading stand at the nave entrance. It does not contain confessions — it contains the weekly attendance count, and the numbers since autumn have a pattern of their own.",
      xp: 0,
      effects: [],
      next: [{text: "Read the weekly attendance register at the nave entrance.", skill: 'lore', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
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
        G.lastResult = `Aldwin draws himself upright. The candles in the alcove behind him make his shadow large on the chapel wall. "You are asking me to describe the interior of confession. I will not. Leave, or I will bring this to the shrine master before you reach the street." The door is three steps away. The wax-sealed record book on the table beside him is already open to today's date. The scrutiny of that report will follow every future interaction with this chapel's hierarchy — your name is now in the book that describes violations.`;
        G.worldClocks.reverence++;
        addJournal('Chapel worker will report your violation of sacred space', 'complication', `shelkopolis-chapel-hostile-${G.dayCount}`);
      } else {
        G.lastResult = `Aldwin sits with the question longer than he needs to. "More anxious," he finally says. "People are carrying something they haven't named yet." He looks at the doorframe when he finishes, not at you. The wax-and-stone smell of the chapel is heavy between you. A candle at the side alcove sputters once. Whatever the hierarchy has told him he is permitted to share, that word — anxious — is the edge of it. He folds his hands on the lectern and waits for you to move on.`;
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
        G.lastResult = `A guard intercepts you near the second watch post. He doesn't raise his voice. He asks your business, writes something in his pocket ledger, and tells you the perimeter is restricted to authorized personnel. By the time you've backed away, two more guards have repositioned. You're logged, dated, and noted. The garrison doesn't need to detain you to make the point. The watchful new post means this section of the perimeter is specifically monitored — it will be harder to approach without being identified first.`;
        G.worldClocks.watchfulness++;
        addJournal('Garrison guards alerted to reconnaissance attempt', 'complication', `shelkopolis-garrison-alert-${G.dayCount}`);
      } else {
        G.lastResult = `The fortifications near the trade district show fresh mortar on old stonework — reinforcement, or the deliberate plugging of known passage points. The sight lines don't match a standard defensive rotation: the open angles face inward, toward the market, not out toward the road. Coal smoke from Ironspool drifts over the wall's inner face. Something has been adjusted in the last few weeks, and whoever did it worked at night when the new mortar seams wouldn't draw an audience. The full pattern stays just out of reach from street level, but the seams are there.`;
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
        G.lastResult = `The quartermaster closes the ledger before you've finished your question. He doesn't raise his voice — he picks up a writing token and sets it beside his ink pot, which is a way of saying he's about to record something. By nightfall, the garrison commander knows someone came asking about supply logs. The garrison will remember your face. The pressure of the commander's awareness runs through every gate and post in this city — your next approach to garrison business will be received differently than this one.`;
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
        G.lastResult = `The probe finds a watcher-thread woven into the ward surface — passive, invisible until touched. It activates the moment you press. Somewhere in the chapel network, a monitoring sigil records the contact. You pull back cleanly but the record exists. The shrine will know that someone with enough knowledge to read ward architecture tried to do so this morning, at this location. The watchful sigil exists because this section was expected to draw exactly this kind of attention.`;
        G.worldClocks.watchfulness++;
        addJournal('Shrine magical alarm triggered by ward probe', 'complication', `shelkopolis-ward-alarm-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The ward coverage isn't uniform anymore. Trade routes and market squares run thin; the administrative buildings hold the old density. The redistribution is recent — the seam where old coverage ends and new begins still carries the faint residue of a deliberate cut, the kind that leaves a scorched edge in the wax matrix if you know how to read it. Someone rerouted the protection deliberately, and the city's merchants and public lanes are on the unguarded side of that line. The administrative quarter is not.`;
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
        G.lastResult = `The shrine does not argue with you. A senior keeper steps forward, says the ritual books are consecrated property, and asks you to leave. Three junior workers position themselves between you and the reading alcove without being directed. The chapel closes like a hand. Outside, the stone steps are warm from morning sun and completely unhelpful. The scrutiny of having approached the consecrated books will follow this inquiry to every chapel in the network — their response was too coordinated for this to be the first time someone asked.`;
        G.worldClocks.reverence++;
        addJournal('Shrine vowed to obstruct future inquiries', 'complication', `shelkopolis-ritual-blocked-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The formula pages Velda allows you to see show minor ratio variations — small enough to be transcription drift, specific enough to feel intentional. Without an archived copy from two years prior, you cannot prove which it is. The wax and old incense smell of the chapel sits heavy. Velda waits beside you with her hands at her sides, not helping and not hurrying. The chapel provides no further access today, and no further access tomorrow without a different approach.`;
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
        G.lastResult = `A guard steps out of a recessed doorway — not a patrol route, a stationary post in a place that had no post last month. He doesn't draw anything. He just records you: your direction, your pace, your approximate description. By the time you've cleared the block, someone in the garrison has a note with your name on it, or close enough. The watchful new post was placed here specifically to catch this kind of movement — someone anticipated the route before you walked it.`;
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
        G.lastResult = `Three people you approach go quiet in the same way — not rude, just finished. By evening, a dockworker you've never spoken to crosses the street to avoid you. The network didn't confront you. It simply passed a description and a recommendation. The street doesn't need to explain itself to make you irrelevant to it. It will be harder to open any conversation in this district without this characterization arriving ahead of you.`;
        G.worldClocks.isolation++;
        addJournal('Street network now views you as hostile', 'complication', `shelkopolis-info-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Two informants confirm things have shifted — shorter answers, more glances toward doorways. One says he stopped carrying certain information "about a month ago." He doesn't say why. His cup sits half-full while he talks, and he doesn't drink from it. The network is still running. It's just running with topics removed, like a market where certain stalls are always covered and nobody asks about the goods beneath the cloth. He names a third contact, then thinks better of it. The name doesn't come.`;
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
    failResult: {
      text: "The square near the chapel is busy — a market day, stalls open, rope-and-fish smell from the harbor end mixing with the coal smoke from Ironspool. The people here are moving, not gathering. The short conversations you try to join close naturally, no one rude, no one willing to slow down. The Amber Fountain's notice board carries two new postings this week. A notice board speaks when people don't.",
      xp: 0,
      effects: [],
      next: [{text: "Read the Amber Fountain's notice board.", skill: 'survival', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
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
        G.lastResult = `Two people you speak with give you the same look — not hostile, measuring. A third ends the conversation by remembering somewhere to be. In a city already pulling inward, your questions about community read as surveillance. You've made yourself part of the problem you were trying to map. It will be harder to ask questions about trust in this city while being perceived as another reason not to trust.`;
        G.worldClocks.isolation++;
        addJournal('Community now views you with suspicion', 'complication', `shelkopolis-social-hostile-${G.dayCount}`);
      } else {
        G.lastResult = `The Amber Fountain is quieter than the hour warrants. The market voices are lower than the crowd size explains. In the square by the chapel, a group of laborers who would ordinarily share a bench eat separately, two feet apart, not speaking. The change is everywhere and invisible, like the tannery smell — you only notice it when you stop to look. Nobody is hostile. Nobody is frightened, visibly. They are simply not talking the way people talk when they feel safe about what they say next.`;
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
        G.lastResult = `In a city already afraid of being overheard, your questions about who fears whom land exactly wrong. Three separate people end conversations quickly. By nightfall, the Iron Accord registry has a note — not a report, a note — that someone was asking unusual questions in the market district. The pressure of that note is low but it accumulates: the registry adds to it each time this kind of question surfaces near you.`;
        G.worldClocks.pressure++;
        addJournal('Your fear mapping queries reported to authorities', 'complication', `shelkopolis-trust-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `A chandler mentions a partnership that dissolved last season — "trust issues," he says, and goes quiet. He doesn't elaborate. His stall is in good order, everything in its place, but one shelf is half-empty where it wasn't last month. A tailor's apprentice says her master stopped attending the guild dinners in autumn. Two people in the same morning use the same phrase without knowing each other said it: "I don't know who to believe anymore." The fractures are real and distributed. The source of each one stays private.`;
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
    failResult: {
      text: "The market is loud this hour — brass clanging from the tinsmith's row, a harbor crier running a shipping announcement past the salt stalls. The fish-smell from the eastern end is sharp. The conversations you can reach are about prices and weather and a wedding two streets over. Nothing with a lowered voice. The quieter end of Verdant Row — cloth brokers, the small herbalist — tends toward patience. That end of the market talks after the crowd thins.",
      xp: 0,
      effects: [],
      next: [{text: "Wait for the market crowd to thin, then try the cloth broker end.", skill: 'survival', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
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
    tags: ['Evidence', 'Proof', 'Systematic', 'Exposure'],
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
        G.lastResult = `A sealed note arrives at your lodging before you've finished compiling. No signature. It lists three locations you visited this week and the approximate time of each. Nothing threatening — just a demonstration that someone has been keeping pace with you. The note is written on chapel-quality paper. You are being shown that the walls you're examining can see back. The pressure in that demonstration is deliberate: they want you to know you are tracked and to make a decision about what to do with that knowledge.`;
        G.worldClocks.pressure++;
        addJournal('Operators noted which documents you compiled — they kept pace', 'complication', `shelkopolis-proof-caught-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `The garrison timeline and the chapel ledger dates don't match by accident — they overlap in a way that requires the same decision-maker, someone with a hand in both institutions during the same eight-week window. The tallow smell of the registry room hangs over the table. You can't prove coordination from these documents alone, but the shape of the question has shifted: it's no longer whether something is wrong, but who made it wrong and where their authority stopped.`;
        addJournal('Compelling contradiction evidence found', 'evidence', `shelkopolis-proof-partial-${G.dayCount}`);
      } else {
        G.lastResult = `The registry table smells of tallow and dry paper. The documents spread across it are suggestive but not conclusive. Garrison orders, chapel ledger pages, trade manifest copies — each anomaly has a plausible separate explanation, a benign procedural reason why this date is wrong, why that entry lacks a signature, why the third folio is shorter than the others. The pattern is there in outline: overlap too precise for chance, silences too exact to be neglect. The outline isn't enough yet. One lamp sputters and steadies. The ink on the newest copy is still drying at the margin.`;
        addJournal('Evidence fragments found but incomplete', 'evidence', `shelkopolis-proof-incomplete-${G.dayCount}`);
      }

      addHeat('shelk', 1);
      G.rivals = G.rivals || {}; G.rivals.heat = (G.rivals.heat || 0) + 1;
      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 19. MORAL PRESSURE: COMPLICITY OR RESISTANCE CHOICE
  {
    label: "The complicit witness is watching to see what I do with what they said.",
    tags: ['Moral', 'Choice', 'Pressure', 'Confrontation'],
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

      addJournal(`Confronted ${npc.name} (${npc.role}) about complicity`, 'complication', `shelkopolis-moral-${G.dayCount}`);
      addHeat('shelk', 1);

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 20. DISCOVERY MOMENT: WRONGNESS CONFIRMED AND ORIGIN REVEALED
  {
    plot: 'main',
    questId: 'q_s1_close',
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
        G.lastResult = `Two men step out from the alcove before you reach the letter cache. They don't explain themselves. One takes your arm, the other opens the side door to the street, and you are outside the chapel in under a minute with nothing in your hands. The coal-smoke of the street hits you immediately. You were close enough that they moved. Whatever is in that alcove, they know you were looking for it, and now they know your face. The pressure of that recognition is precise — you are now tracked by the people whose correspondence you were trying to trace.`;
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
        G.lastResult = `Every supply disruption follows a sealed letter by two days. The gaps in the trade registry track the same second-watch and fifth-watch deposit schedule Brother Aldwin described. The three-column alignment is too exact for coincidence — letter date, supply shift date, commodity code — matching across four separate commodity lines in the same eight-week window. The chapel letter system isn't incidental to the conspiracy. It is the command channel. Someone reads those deposits and moves the supply lines accordingly, and has been doing it for months.`;
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
    failResult: {
      text: "The Ironspool district ward markers are visible from the street — chalk and pressed wax on the corner stones, each one dated in shrine notation at the lower margin. Most of the markers here are still within their normal renewal window; the anomalies are further in, past the junction where the northwest road meets the commercial lane. The outer markers tell you where to look next. The direction is clear.",
      xp: 0,
      effects: [],
      next: [{text: "Follow the ward marker dates inward toward the northwest junction.", skill: 'lore', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'mapping ward failure zones');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
      G.lastResult = `The earliest ward degradation traces to the Ironspool district's northwest edge — the seam nearest the northern road. From there the failures spread inward, district by district, over six weeks. The progression isn't random: each failure zone borders the previous one, and each sits on a route that connects to the northern road at its outer margin. The pressure is directional. Whatever is pulling against the chapel's ward network originates outside Shelkopolis, northwest of the harbor, and it has been steady and patient for long enough to follow a plan.`;
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
        G.lastResult = `Northern gate, Ironspool junction, administrative quarter — three unguarded points that form a direct line through the city's center. Separately they read as patrol gaps, the kind of thing a stretched garrison produces by accident. Together they read as a cleared lane: each gap is precisely wide enough and positioned correctly relative to the others. Something is meant to travel that path without witnesses, and the garrison's new rotation keeps it open at the same hours each night.`;
      }
      addJournal('Prepared access corridor identified — conspiracy using Shelkopolis as transit', 'evidence', `shelk-corridor-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "A Warden Order officer is working the same evidence trail. They let you know it.",
    tags: ['NPC', 'Faction', 'Stage1'],
    xpReward: 60,
    failResult: {
      text: "Verdant Row is crowded this hour — cloth buyers from the harbor estates, two guild stewards with a dispute about a commission deadline. The officer you were told to look for is not on the Row today, or not visible. The coal-smoke smell from Ironspool drifts over. Warden Order officers in a working city rarely stand still. The garrison precinct notice board posts visiting authority credentials by district. That board is public.",
      xp: 0,
      effects: [],
      next: [{text: "Check the garrison precinct notice board for Warden Order credentials.", skill: 'survival', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
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
      addJournal('Warden Order acknowledged overlap — same evidence trail', 'intelligence', `shelk-warden-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Someone was here before you, asking the same questions. They wrote down the answers.",
    tags: ['NPC', 'Warning', 'Stage1'],
    xpReward: 55,
    failResult: {
      text: "The merchant you were told to find has his stall closed — a slip of paper tacked to the frame says back at the second bell, which is two hours off. The fish-salt of the harbor drifts down Verdant Row. Other stall holders nearby heard the same questions being asked over the past week; one of them is still thinking about what he saw. He is not the person you came to find, but the harbor end of the Row knows what its neighbors know.",
      xp: 0,
      effects: [],
      next: [{text: "The neighboring stall holder was here. They saw what happened.", skill: 'survival', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
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
      addJournal('Prior operative confirmed — methodical, already ahead on the evidence trail', 'complication', `shelk-rival-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Stay the evening at the Amber Fountain. Let the regulars decide what to say.",
    tags: ['Social', 'Rest', 'Stage1'],
    xpReward: 30,
    failResult: {
      text: "The Amber Fountain's evening crowd is thin — a cold night, or just a quiet stretch in the week's rhythm. The handful of regulars present sit separately and nurse their cups with the focused attention of people who came to be alone in company. Marta moves between them without pause. The common room does not open tonight. The notice board near the door has two new postings. That much is available.",
      xp: 0,
      effects: [],
      next: [{text: "Read the notice board by the door before leaving.", skill: 'survival', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(30, 'building community trust');
      const observations = [
        "A dockworker nurses his cup and says northern shipments stopped coming through. 'Weather,' he offers. The coal-smoke from outside drifts in through the door. He doesn't elaborate further and he doesn't need to. The weather hasn't changed. A dock schedule that stops for weather stops irregularly. A dock schedule that stops clean, for months, stops for something else.",
        "A shrine worker at the far end of the bar turns her cup in her hands. The evening prayers feel different lately, she says — her words come out careful, like she's choosing from a smaller set than usual. 'Like they go somewhere and don't quite arrive.' She has no explanation. She doesn't look up from the cup when she finishes.",
        "A cloth merchant tells it like a complaint: customs clerk replaced three times in six months, each one gone without notice, no forwarding word. 'Can't get anything cleared properly anymore.' The Amber Fountain's lamplight sits warm on the table between you. He doesn't say it like something is wrong. He says it like something is being managed, and whoever is managing it hasn't bothered to explain it to him.",
        "A patrol guard, off-duty and still in his boots, says his route changed again. Third time this month. He stares at his drink without lifting it. 'Nobody explains why. You just get the new sheet and walk it.' The coal-smoke smell of the street still clings to him. He came here to stop thinking about it for an evening, and he keeps thinking about it."
      ];
      G.lastResult = observations[Math.floor(Math.random() * observations.length)];
      G.recentOutcomeType = 'rest'; maybeStageAdvance();
    }
  },

  {
    label: "The blessing records read differently when you align the dates with the supply shifts.",
    tags: ['Lore', 'Stage1'],
    xpReward: 65,
    failResult: {
      text: "The chapel reading room is occupied — a petitioner with a genealogy request and a novice working through the archive bins with a quill and a slow hand. The blessing record book sits on the closed-access shelf. The wax-and-stone smell of the room is thick and patient. The chapel posts a summary of blessing dates by ward district on the public notice board outside the nave entrance. That summary carries enough of the date column to begin the comparison.",
      xp: 0,
      effects: [],
      next: [{text: "Use the public ward blessing summary to start the date comparison.", skill: 'lore', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
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
        G.lastResult = `Some recipients appear more than once in the same short windows. Some dates cluster without obvious cause — no feast days, no estate anniversaries in the standard calendar. The pattern has a shape but not yet a key. The chapel's lamplight makes the columns easy to read and the meaning easy to miss. A novice crosses the nave behind you and does not look at what you're reading, which is its own kind of attention. The lamplight is generous. The cipher, if it is one, stays just past where generosity helps.`;
        addJournal('Blessing records show unusual patterns — cipher suspected', 'evidence', `shelk-cipher-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The night-watch commander files reports that come back amended. She stopped asking why.",
    tags: ['NPC', 'Combat', 'Stage1'],
    xpReward: 58,
    failResult: {
      text: "The night-watch commander is not at her desk — the duty clerk says she is making rounds, expected back at the third bell. The garrison precinct smells of coal smoke and oiled leather. The watch dispatch board near the corridor window posts the current shift assignments: Ironspool district's night column has a different officer's name this month than last. The board is public-facing. The change in assignment is there to read.",
      xp: 0,
      effects: [],
      next: [{text: "Note the Ironspool night assignment change on the dispatch board.", skill: 'survival', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
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
        G.lastResult = `The night-watch commander's signet ring stays stone-side-out the whole conversation — formal register, the one she uses for amended reports. "Nothing to report." She means it as a complete sentence. She holds eye contact just long enough for it to be a message: she has heard this question before, or one like it, and whatever her answer used to be, it has been replaced by this one. The wall behind you gets her attention after. The conversation was over before it started.`;
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
        addJournal('Letter frequency doubled — network accelerating in response to scrutiny', 'complication', `shelk-monitor-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `A novice steps out of the chapel side door and looks directly at you — not surprised, not alarmed. Just noting. The letter alcove window goes dark within the hour. Three days pass with no deposits at all. The wax smell of the doorframe lingers where you stood. The network didn't panic. It simply paused, adjusted, and waited for you to move on — the way a flame bends around an obstacle without going out. The discipline in that pause is its own kind of information.`;
      } else {
        G.lastResult = `From the bench across from Silkweaver's Chapel, the deposit window is visible without being obvious — a slot in the alcove stone, wax-shadowed at the edges. The count has edged up over the last week: one extra deposit, nothing dramatic, nothing that would catch an idle eye. The chapel routine looks unchanged from the street. Novices trim the outer lamps at the posted hour. The morning blessings still ring at the posted times. Whatever the network registered about increased attention in Shelkopolis, it's absorbing it without breaking stride. That discipline is itself a signature.`;
        addJournal('Letter frequency increased — general alertness elevated', 'evidence', `shelk-monitor-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },
  // SUPPRESSION: MISSING SIGNATORY ON TRANSIT AUTHORIZATION
  {
    label: "The second signature line is blank. Stamp and date are there. The name is not.",
    tags: ['Suppression', 'Records', 'Bureaucracy', 'Stage1'],
    xpReward: 50,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(50, 'reading missing signatory on transit document');

      G.lastResult = `The permit registry desk carries the flat smell of pressed wax and dry hemp fiber. A clerk works through the outbox tray at steady pace — stamping, dating, stacking. The third transit authorization in the row requires two signatories by Iron Accord procedure: a routing officer and a countersigning authority. The routing officer's name is present in clear, practiced script. The second signatory line is blank. Not crossed out. Not marked pending. The form has the date. It has the stamp. Only the second name is absent. The clerk who filed it is no longer posted to this office — the name placard on the desk behind hers has been removed.`;
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
      G.lastResult = 'The board has nothing new since this morning. A quota notice from the registry office is still pinned at the corner — same one from three days back, its edges curling from the Amber Fountain\'s warmth. The archival quarter posting beside it is dated and unsigned, which is unusual for guild-registered notices. Nothing posted today changes the picture. The board will have new postings tomorrow, or the day after, or whenever something is ready to be seen.';

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
    failResult: {
      text: "The Amber Fountain is running at full press — a guild dinner in the back room, three extra tables of harbor workers in from the late shift, and Marta moving between them at a pace that leaves no opening. She catches your eye once across the bar and gives the small nod that means later, which means not now. The notice board by the door has two new postings from this week. The room will thin by the second bell.",
      xp: 0,
      effects: [],
      next: [{text: "Check the notice board and come back when the room clears.", skill: 'survival', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(50, 'talking to the barkeep');
      var result = rollD20('persuasion', (G.skills.persuasion||0) + Math.floor(G.level/3) + (typeof getTraitBonus==='function'?getTraitBonus('persuasion'):0) + (typeof getEquipmentBonus==='function'?getEquipmentBonus('persuasion'):0));
      if (result.total >= 8) {
        G.lastResult = "Marta wipes down the counter and doesn't look at you when she talks. She mentions a manifest clerk who's been drinking alone three nights running — starting the evening the southern shipment arrived. She doesn't say what was in it. She sets down a second cup without being asked. That's the closest she comes to endorsing your line of work.";
        G.flags = G.flags || {};
        G.flags.shelk_barkeep_manifest_thread = true;
        G.investigationProgress = (G.investigationProgress||0) + 1;
        G.recentOutcomeType = 'success';
        addJournal('Marta (barkeep): manifest clerk drinking alone since the southern shipment arrived', 'intelligence');
      } else {
        G.lastResult = "Marta refills the cup and moves on. She's not unfriendly — she just doesn't know you well enough yet to say anything worth saying. The Amber Fountain hums with the evening crowd behind you; guild workers from the harbor quarter, two estate stewards debating something over a ledger. She carries three cups in one hand without spilling. The next table needs her. She goes, and the way she goes leaves the impression that she could say more if she had a reason to. That reason hasn't arrived yet.";
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
  },

  // ========== SUPPRESSION THREADING (Phase 6D) ==========

  // 6D-A: Redacted signatory
  {
    label: "The authorization stamp is there. The name underneath it is not.",
    tags: ['Records', 'Archive', 'Observation'],
    xpReward: 55,
    stageProgress: 1,
    failResult: "The records annexe opens only to credentialed parties during morning hours. The door is locked and the clerk's window is shuttered. A paper tab fixed to the frame gives a reference number for scheduling access. The number leads to a different office, two streets back toward the harbor.",
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(55, 'found redacted signatory in transit authorization');
      G.stageProgress[1]++;
      G.lastResult = "The transit authorization form is standard issue — port-stamped, date-stamped, correctly filed in the outbound packet. Every field is filled except one. The signatory line has been cut — not crossed out, cut, with scissors or a blade. The cut is clean, the edges even. Whatever name sat there was removed deliberately, after the document was complete. The form remains valid without it; the stamp above the gap is untouched and the document is still filed as processed. The clerk who handed it over did not comment. The file drawer closed with a sound of finality.";
      addJournal('Shelkopolis transit authorization: signatory line physically excised — name removed after completion, document still filed as valid. Source: records annexe, outbound packet.', 'evidence');
      G.recentOutcomeType = 'observe';
      maybeStageAdvance();
    }
  },

  // 6D-B: Registry denial — procedural, no explanation
  {
    label: "The registry clerk pulled the form before I finished the request.",
    tags: ['Records', 'NPC', 'Inquiry'],
    xpReward: 50,
    stageProgress: 1,
    failResult: "The supplemental inquiry window is already closed. A card pinned above the counter lists the hours — morning only, credentialed petitioners only, no walk-in requests. The main registry counter handles standard lookups until the fourth bell.",
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(50, 'blocked at supplemental registry inquiry');
      G.stageProgress[1]++;
      G.lastResult = "The clerk pulls the supplemental inquiry form from the slot and sets it face-down on the counter without turning around. 'The registry is closed to supplemental inquiry.' No hour given, no reopening date, no category exception. She does not look up. The stamp in her hand finds a different document — a routine one, the kind that has nothing to do with you — and strikes it twice. The inquiry form stays face-down between you. Nothing in her manner suggests the answer will be different tomorrow.";
      addJournal('Shelkopolis registry: supplemental inquiry refused without explanation — clerk did not look up, gave no timeframe or alternative. Source: main registry counter.', 'complication');
      G.recentOutcomeType = 'blocked';
      maybeStageAdvance();
    }
  }
];

// Sideplot injection — shelk-fairhaven ledger shadow opening hook
(function() {
  var _shadowHook = (typeof SHELK_FAIRHAVEN_LEDGER_SHADOW !== 'undefined') ? SHELK_FAIRHAVEN_LEDGER_SHADOW.openingHook() : null;
  if (_shadowHook) SHELKOPOLIS_STAGE1_ENRICHED_CHOICES.push(_shadowHook);
})();

// ── ARCHETYPE-EXCLUSIVE CHOICES ──────────────────────────────
SHELKOPOLIS_STAGE1_ENRICHED_CHOICES.push(

  // COMBAT x2
  {
    archetypeGroup: 'combat',
    label: "The counting house clerk is alone. The ledger he won't open is right there.",
    tags: ['Combat', 'Confrontation', 'Direct'],
    xpReward: 65,
    stageProgress: 1,
    failResult: {
      text: 'The clerk keeps his hand flat on the ledger cover and his expression entirely still. He has been trained for exactly this kind of pressure — the guild factors all have. When your posture shifts, he reaches under the counter and presses something. A second clerk enters from the back room inside thirty seconds. Two clerks and a closed ledger is the same as one clerk and a closed ledger, except now there is a witness. You leave without the ledger.',
      xp: 0,
      effects: [],
      next: [{text: 'Find a different route into the counting house records.', skill: 'stealth', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'pressuring counting house clerk');
      G.stageProgress[1]++;

      var result = rollD20('combat', (G.skills.combat || 0));
      var target = 14;

      if (result.isCrit) {
        G.lastResult = 'The clerk lifts his hand from the ledger. He does it without meeting your eyes — a calculation, not a capitulation. The sealed ledger opens to the page he has been keeping covered: a manifest column with two sets of figures, one in standard guild ink, one in a lighter hand written over the top. The overwritten figures reduce three separate consignment tallies by a consistent margin — exactly the margin that appears in the registered duty records. The lighter hand\'s annotations reference a routing code that does not appear in the public manifest registry. The clerk says nothing while you read. He watches the door.';
        G.stageProgress[1]++;
        addJournal('Counting house sealed ledger opened — overwritten manifest figures match registered duty reductions; unregistered routing code present', 'evidence');
      } else if (result.isFumble) {
        G.lastResult = 'The clerk goes still when the pressure lands — and then, instead of the bell under the counter, he goes to the door and opens it himself. Three guild factors are in the commercial corridor outside. He does not say anything to them. He simply opens the door and stands back. The three factors look at you. The clerk goes back to his ledger. You are standing in a counting house in Shelkopolis with three guild factors in the doorway and a sealed ledger that is now definitely not opening for you today.';
        G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
        addJournal('Counting house pressure failed — clerk escalated to guild factors; pressure notation likely in district record', 'complication');
      } else if (result.total >= target) {
        G.lastResult = 'The clerk opens the ledger to a middle section — not the page you want, but close. The columns for last month\'s northern consignments are visible: the standard figures, the registered totals, and a third column header labeled \'reconciliation adjustment.\' The adjustment figures are all negative and they are all round numbers. Round-number adjustments across thirteen consecutive consignment lines are not coincidence. The clerk closes the ledger before you can read the authorization signatures at the column base.';
        addJournal('Counting house ledger partially accessed — 13 consecutive round-number reconciliation adjustments visible; authorization column closed before reading', 'evidence');
      } else {
        G.lastResult = 'The clerk moves the ledger off the counter before you can reach it. His expression does not change. He has had this kind of conversation often enough that the ledger is now behind him on the shelf, spine out, while he is still talking about account access procedures. The ward mark on the doorframe catches the light — fresh chalk, renewed within the past few days. New wards on a counting house door mean someone is worried about what the ward protects.';
        addJournal('Counting house ledger removed from access — doorframe ward mark freshly renewed', 'discovery');
      }

      G.recentOutcomeType = 'action';
      maybeStageAdvance();
    }
  },

  {
    archetypeGroup: 'combat',
    label: "The guild courier is carrying a sealed dispatch. Last alley before the relay post.",
    tags: ['Combat', 'Confrontation', 'Risk'],
    xpReward: 65,
    stageProgress: 1,
    failResult: {
      text: 'The courier is faster than his build suggests — he takes the alley at a run when he sees your position and is through the gate at the far end before you close the angle. The relay post gate shuts behind him. The dispatch is inside the post. The alley is empty and the gate will not open without a guild courier token you do not have.',
      xp: 0,
      effects: [],
      next: [{text: 'Circle to the relay post\'s secondary entrance while the courier files the dispatch.', skill: 'stealth', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'intercepting guild courier');
      G.stageProgress[1]++;

      var result = rollD20('combat', (G.skills.combat || 0));
      var target = 14;

      if (result.isCrit) {
        G.lastResult = 'The courier stops when you step into the alley mouth — a trained stillness, not panic. He hands over the satchel without being asked for it. Inside: three sealed dispatches, one of which has a wax seal carrying a house mark that does not appear in the public guild registry. The contents of the unsealed dispatches are routine routing confirmations. The house-marked one is addressed to a name — Vethara Keln — with no locality, no district, no guild affiliation. Just the name. The courier says he has delivered to that name twice this month. Both times to a drop point, never a person.';
        G.stageProgress[1]++;
        addJournal('Guild courier intercepted — dispatch bears unregistered house mark; Vethara Keln recipient, drop point only, two prior deliveries this month', 'evidence');
      } else if (result.isFumble) {
        G.lastResult = 'The courier does not stop. He angles past you at a run and puts his shoulder into it as he goes. The satchel stays on his arm. You are in a guild district alley with a bruised shoulder and the relay post gate is already closing at the far end. The courier will log the interference at the relay post — that is standard guild courier protocol. Your description is now in the relay post record.';
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
        addJournal('Courier interception failed — interference logged at relay post; description recorded', 'complication');
      } else if (result.total >= target) {
        G.lastResult = 'The courier stops and holds the satchel closed. A standoff for eight seconds. Then he reaches in and hands you one envelope — the one on top, the one he was apparently willing to lose. The rest stay in the satchel. The one he hands you is a routing confirmation for a consignment that matches the reference numbers from the counting house ledger discrepancy. The consignment was confirmed as received. The manifest record shows it as still in transit.';
        addJournal('Courier yielded one dispatch — routing confirmation contradicts manifest transit status for same consignment reference', 'evidence');
      } else {
        G.lastResult = 'The courier stops, reads the situation, and sets the satchel on the ground between you. He steps back from it. You can open it or not — his posture says he has decided this is not his problem anymore. Inside: six standard routing confirmations, all in guild-standard format, all for localities you recognize. Nothing unusual. He picks the satchel back up when you are done and continues to the relay post. Whatever the sensitive dispatch was, it was already delivered earlier today.';
        addJournal('Courier satchel inspected — contents standard; sensitive dispatch already delivered prior to interception', 'discovery');
      }

      G.recentOutcomeType = 'action';
      maybeStageAdvance();
    }
  },

  // MAGIC x2
  {
    archetypeGroup: 'magic',
    label: "The ward marks on the sealed guild documents are layered. Someone added a second inscription.",
    tags: ['Magic', 'Lore', 'Records'],
    xpReward: 65,
    stageProgress: 1,
    failResult: {
      text: 'The documents are behind the counting house grille and the grille requires a guild key to open. The ward marks are visible through the grille but reading them at this angle and distance loses the fine-grain sigil detail that would distinguish the layers. The documents sit one door away from a full reading.',
      xp: 0,
      effects: [],
      next: [{text: 'Find a guild key or a different access angle to the documents.', skill: 'lore', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'ward mark layering analysis on guild documents');
      G.stageProgress[1]++;

      var result = rollD20('lore', (G.skills.lore || 0));
      var target = 13;

      if (result.isCrit) {
        G.lastResult = 'Two layers on every sealed document in this stack. The outer layer is standard guild authentication — correctly inscribed, properly anchored, nothing unusual. The inner layer is a secondary binding that was not inscribed by the same hand. The inner inscription style uses a cipher-compression technique from a school of ward-writing that operates outside the Guild Authority\'s authorized curriculum — a regional tradition, specific enough to trace. The inner marks are not protecting the document. They are recording who touches it. Every time the document seal is broken, the inner ward logs the event in a remote registry that is not the guild record. Someone is watching the watchers.';
        G.stageProgress[1]++;
        addJournal('Guild document ward marks double-layered — inner inscription uses non-guild school, logs access to remote registry not visible in guild record', 'evidence');
      } else if (result.isFumble) {
        G.lastResult = 'The ward mark reading goes fine until the second layer, where the inner inscription responds to close examination with a mild alert pulse — not an alarm, just a notification. The counting house senior clerk feels it from across the room and looks up. She does not know what you were reading. But she walks over and adjusts the document stack so the ward marks face inward. The documents are now unreadable from your position and she is standing between you and them.';
        addJournal('Ward mark alert pulse triggered — senior clerk repositioned documents; further reading blocked', 'complication');
      } else if (result.total >= target) {
        G.lastResult = 'The outer ward is standard guild authentication. The inner layer is thinner — a compression cipher overlaid after the outer seal was applied. Whoever added the inner layer did it without breaking the outer seal, which means they had access to a ward-writing method that allows secondary inscription through an existing mark. That technique is not in the guild\'s publicly authorized curriculum. The inner mark references a document registry number that does not match the guild\'s own classification system.';
        addJournal('Guild document inner ward layer uses post-seal inscription technique; references non-guild registry number', 'evidence');
      } else {
        G.lastResult = 'The ward marks are layered — that much is clear from the sigil density alone. Parsing which layer does what requires either more time in close range or a reference text for the cipher compression style used on the inner mark. The outer layer reads as standard authentication. The inner layer uses a compression technique that reduces the sigil footprint, which means it was designed to be hard to notice. It has been there for some time.';
        addJournal('Guild document ward marks confirmed layered — inner layer uses compression technique designed to be inconspicuous; present some time', 'discovery');
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  {
    archetypeGroup: 'magic',
    label: "That manifest column has a cipher running through the ordinary figures.",
    tags: ['Magic', 'Lore', 'Records'],
    xpReward: 65,
    stageProgress: 1,
    failResult: {
      text: 'The manifest is on the clerk\'s desk, not the open reading counter, and the clerk does not leave his desk. The cipher column is visible from your position but not at a reading angle — you can see there is something there but not what it says. The public reading counter holds last quarter\'s filed manifests. The current one stays on the clerk\'s desk.',
      xp: 0,
      effects: [],
      next: [{text: 'Read last quarter\'s filed manifests for the same cipher pattern instead.', skill: 'lore', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'manifest cipher decoding');
      G.stageProgress[1]++;

      var result = rollD20('lore', (G.skills.lore || 0));
      var target = 13;

      if (result.isCrit) {
        G.lastResult = 'The cipher is a substitution layer built into the standard duty-tally column — every seventh figure, reading down. Decoded: a series of dates, amounts, and a location reference. The dates correspond to consignment arrivals that are recorded as delayed in the official manifest. The amounts are consistent with the duty reduction figures in the counting house ledger. The location reference is a waypoint designation — not a locality in the standard guild routing system, but a designation used in the pre-guild trade network that predates the current administration by forty years. Someone is using old geography.';
        G.stageProgress[1]++;
        addJournal('Manifest cipher decoded — every 7th figure is a date/amount/location sequence; location is pre-guild waypoint designation; amounts match ledger duty reductions', 'evidence');
      } else if (result.isFumble) {
        G.lastResult = 'The cipher pattern looks like a standard accounting error at first — the kind of small figure misalignment that happens when a clerk copies from a draft. You spend twenty minutes on a false trail before you recognize the structure is intentional. By then, the manifest has been collected for filing and the clerk has noted the extended reading time in the session log. The cipher is gone with the manifest. The pattern you almost identified will have to be reconstructed from the filed copies.';
        addJournal('Manifest cipher misread — lost to filing; 20-minute false trail logged by clerk', 'complication');
      } else if (result.total >= target) {
        G.lastResult = 'The cipher runs in the duty-tally column, every seventh entry. The decoding resolves to a series of three-element codes: a date, an amount, and a single-letter identifier. There are eleven codes across the manifest. The amounts total to a figure that matches the discrepancy between the registered duty receipts and the counting house ledger adjustments. The single-letter identifiers repeat: K, V, K, V, K. Two parties, alternating. Someone is splitting something and recording it in the official document.';
        addJournal('Manifest cipher partially decoded — 11 codes, amounts match ledger discrepancy, two alternating identifiers K and V', 'evidence');
      } else {
        G.lastResult = 'The manifest column has a structural irregularity — the figure spacing in the duty-tally section is inconsistent in a pattern that does not match standard clerical error. It is too regular to be accidental. The full cipher decoding requires a longer reading and a reference text for the substitution method being used. You can identify that the cipher exists and roughly where it runs. You cannot read what it says from here, in this time window.';
        addJournal('Manifest cipher structure identified — regular spacing irregularity in duty-tally column; decoding requires more time and reference text', 'discovery');
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // STEALTH x2
  {
    archetypeGroup: 'stealth',
    label: "The guild factor walks the same commercial route every second hour. Nobody following.",
    tags: ['Stealth', 'Covert', 'Observation'],
    xpReward: 65,
    stageProgress: 1,
    failResult: {
      text: 'The commercial district is more crowded at this hour than it was when you mapped the factor\'s route — a textile delivery blocking the second junction and two guild clerks standing in the usual shadow position. The factor\'s route takes him through the crowd without pause. You lose the angle at the second junction and he is gone into the counting house row before you re-acquire. The route mapping needs a quieter hour.',
      xp: 0,
      effects: [],
      next: [{text: 'Wait for a quieter hour and re-map the factor\'s route.', skill: 'stealth', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'shadowing guild factor through commercial district');
      G.stageProgress[1]++;

      var result = rollD20('stealth', (G.skills.stealth || 0));
      var target = 15;

      if (result.isCrit) {
        G.lastResult = 'Five blocks, three counting houses, one chapel alcove stop. At the third counting house, the factor does not enter through the public door. He goes around to the loading entrance and uses a factor\'s token on a second door that is not marked on the building\'s exterior registry posting. Inside, through the loading bay window: two other factors already waiting, a table with three document stacks, and a set of unlit candles that someone has arranged into a specific pattern — the same pattern used by the pre-guild trade arbitration system as a meeting signal. Whatever they are doing in that room, it is not standard guild business.';
        G.stageProgress[1]++;
        addJournal('Guild factor used unmarked loading entrance at third counting house — met two others with pre-guild trade arbitration signal arrangement', 'evidence');
      } else if (result.isFumble) {
        G.lastResult = 'The factor stops at the fourth block and looks back. He is not checking for a tail — he is looking at the chapel alcove he passes every circuit, a habit. But the timing puts his gaze on the exact spot where you are standing. He holds the look for two seconds without expression, then continues. His next circuit, he takes a different route. The commercial district factors talk to each other. By the end of the day, the route pattern has changed and you are part of the reason it changed.';
        addJournal('Guild factor changed route — accidental eye contact; factor network likely notified', 'complication');
      } else if (result.total >= target) {
        G.lastResult = 'Three blocks of clean following distance. The factor stops at the second counting house — not to enter, but to exchange a folded paper with a clerk who comes to the door specifically to meet him. The exchange takes four seconds. The clerk goes back inside. The factor continues his circuit. The folded paper was not a standard manifest form — the dimensions were wrong and the fold pattern was not the guild standard for routing documents. That exchange happens at the same counting house every circuit.';
        addJournal('Guild factor makes paper exchange at second counting house every circuit — non-standard fold, not a routing document', 'evidence');
      } else {
        G.lastResult = 'Two clean blocks. Then the factor pauses at a ward mark on a doorframe — not checking it, touching it. His thumb finds the chalk edge of the mark the way you have seen guild factors navigate by touch when they do not want to be seen looking at their route. The ward mark he touched is on the door of a building with no public registry posting. He does not enter. He continues his circuit. A building in the commercial district with no registry posting is itself a finding.';
        addJournal('Factor touched ward mark on unregistered building — deliberate navigation by touch; building has no public registry posting', 'discovery');
      }

      G.recentOutcomeType = 'action';
      maybeStageAdvance();
    }
  },

  {
    archetypeGroup: 'stealth',
    label: "The counting house closes at sixth bell. The clerks leave twenty minutes after.",
    tags: ['Stealth', 'Covert', 'Risk'],
    xpReward: 65,
    stageProgress: 1,
    failResult: {
      text: 'One clerk stays late. He is at the desk nearest the ledger stack and he does not move for the hour you wait across the street. The counting house lamp stays lit. The clerk does not leave. By the time the street quiets enough for a move on the back entrance, the night watch has begun its commercial district circuit and the window has closed.',
      xp: 0,
      effects: [],
      next: [{text: 'Map the night watch circuit for a future attempt.', skill: 'stealth', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'after-hours counting house entry');
      G.stageProgress[1]++;

      var result = rollD20('stealth', (G.skills.stealth || 0));
      var target = 15;

      if (result.isCrit) {
        G.lastResult = 'The back entrance yields to the latch tool at the twenty-two minute mark — the window is exactly as wide as the clerks\' departure timing suggested. Inside: the closed ledger stack, unattended. The relevant pages are flagged already — someone has left silk markers in the discrepancy sections, recently placed, the silk still carrying the body warmth of recent handling. Someone else has been here, reading the same pages, within the past few hours. The figures they marked align precisely with the cipher pattern in the manifest column from the public reading counter.';
        G.stageProgress[1]++;
        addJournal('After-hours counting house entry — ledger pages pre-marked by another recent visitor; marked figures align with manifest cipher', 'evidence');
      } else if (result.isFumble) {
        G.lastResult = 'The back entrance is warded — a detection mark on the latch, not visible from the street. The ward activates on contact and a pale light pulses twice at the upper window across the alley. Someone is watching that window. You are moving before the third pulse and you do not stop moving for two blocks. The counting house ward system is active after hours. Your approach route is now known to whoever monitors it.';
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
        addJournal('Counting house after-hours ward activated — detection mark on latch; approach route observed', 'complication');
      } else if (result.total >= target) {
        G.lastResult = 'Inside the counting house in the twenty-minute window. The ledger stack is accessible. The relevant section — northern consignment manifests for the past six weeks — has had two pages removed. Not torn: the binding threads are clean-cut, done with a tool. The cut edges are recent. The pages were removed after the ledger was last officially reviewed, which according to the review log was four days ago. The section that references the unregistered routing codes is gone.';
        addJournal('After-hours counting house entry — two ledger pages cleanly removed post-review; northern consignment section now incomplete', 'evidence');
      } else {
        G.lastResult = 'Inside and to the ledger stack before the night watch circuit begins. The relevant ledger is the heaviest one on the shelf and it takes longer than expected to locate the right section. You get twelve minutes of reading time before a light appears in the street outside the front window — not the night watch, just a late lamp being carried home. But it breaks the timing and you are out through the back before you have finished the column. You have three reference numbers that you did not have before. The rest waits.';
        addJournal('Partial after-hours counting house read — three new reference numbers obtained; section not fully read', 'discovery');
      }

      G.recentOutcomeType = 'action';
      maybeStageAdvance();
    }
  },

  // SUPPORT x2
  {
    archetypeGroup: 'support',
    label: "The trade concession the factor wants is something I can arrange.",
    tags: ['Support', 'NPC', 'Negotiation'],
    xpReward: 65,
    stageProgress: 1,
    failResult: {
      text: 'The factor listens to the concession proposal and nods slowly at the wrong parts — the parts that sound like the right answer but are not the actual offer. By the time you have made the real offer, his expression has already decided. He thanks you for the conversation and reaches for a routing form. The routing form means the conversation is over. Whatever he was protecting in the manifest, the concession did not reach it.',
      xp: 0,
      effects: [],
      next: [{text: 'Find a different point of leverage for the manifest access.', skill: 'persuasion', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'brokering trade concession for manifest access');
      G.stageProgress[1]++;

      var result = rollD20('persuasion', (G.skills.persuasion || 0));
      var target = 13;

      if (result.isCrit) {
        G.lastResult = 'The factor sets down his routing form when the concession clears a certain threshold. He reaches past the standard manifests to a secondary stack — records that are filed but not indexed in the public registry. "Northern passage authorization, six weeks." He opens to a page. "This is what you want." Three consignment records with dual authorization signatures: one guild factor\'s mark, one with a cipher-compressed seal that matches the secondary ward inscription style from the guild documents. "The second signature isn\'t in the registry," he says. He does not say who it belongs to. He closes the file and holds it out. He is giving you a copy and he expects you to understand what that costs him.';
        G.stageProgress[1]++;
        addJournal('Factor produced secondary manifest with dual authorization — second signature is cipher-compressed, matches guild document inner ward style; not in registry', 'evidence');
      } else if (result.isFumble) {
        G.lastResult = 'The factor hears the concession and goes very still. Then he says, carefully, that he is not in a position to exchange access to filing records for trade arrangements of any kind, and that if you have a concern about the manifest, there is a formal inquiry process. He says it without looking at you. Two clerks across the room have stopped their work. The factor has just created a record of this conversation by conducting it in front of witnesses. The manifest is now untouchable through any informal channel.';
        G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
        addJournal('Factor formalized refusal in front of witnesses — manifest now untouchable through informal channels', 'complication');
      } else if (result.total >= target) {
        G.lastResult = 'The factor considers the concession for long enough that you know he has the authority to accept it. He reaches for the manifest stack and opens to a specific page — not the whole record, just one entry. Northern passage authorization, current month, with a consignment reference that matches the unregistered routing code from the cipher column. "I can\'t tell you who authorized the routing," he says. "But I can confirm the routing exists and the authorization carried." He closes the manifest. That is everything he is going to give.';
        addJournal('Factor confirmed unregistered routing exists and carried authorization — identity of authorizer withheld', 'evidence');
      } else {
        G.lastResult = 'The concession clears enough of the factor\'s resistance that he stops routing you to the standard inquiry process. He opens the manifest index — not the manifest itself, the index. The northern consignment section has a three-week gap in the index entries. "Filing backlog," he says, which is what the index itself says. He knows what the index says. He is reading it to you anyway. The gap in the index is not a filing backlog. The entries that should be there are simply absent.';
        addJournal('Factor confirmed three-week gap in northern consignment manifest index; called it a filing backlog', 'discovery');
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  {
    archetypeGroup: 'support',
    label: "The clerk already knows the discrepancy threatens her standing.",
    tags: ['Support', 'NPC', 'Persuasion'],
    xpReward: 65,
    stageProgress: 1,
    failResult: {
      text: 'The clerk\'s expression does not change when you make the connection for her. She has already made it. She set it aside. Whatever the cost of the discrepancy, she has decided the cost of addressing it is higher. She straightens the intake log without opening it. "I recommend the supplemental inquiry form." She says it the way someone says a phrase they have said many times. The window is closed.',
      xp: 0,
      effects: [],
      next: [{text: 'File the supplemental inquiry form as she recommends.', skill: 'persuasion', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'making the ledger discrepancy her problem');
      G.stageProgress[1]++;

      var result = rollD20('persuasion', (G.skills.persuasion || 0));
      var target = 13;

      if (result.isCrit) {
        G.lastResult = 'The clerk holds her pen over the intake log for three seconds without moving. Then she sets it down on the wrong side of the log — something she does not usually do, because the log is always exactly in the same position. "The discrepancy is in the section my review certification covers," she says, very quietly. "If it goes to audit without a correction from my section, the certification review flags me as the responsible clerk." Her pen stays on the wrong side. She opens the intake log. "Tell me what you found and I will tell you what I can correct for and what I cannot."';
        G.stageProgress[1]++;
        addJournal('Clerk opened intake log — discrepancy in her certification coverage; agreed to share what she can and cannot correct', 'evidence');
      } else if (result.isFumble) {
        G.lastResult = 'The clerk hears the implication and goes very still. Then she reaches for the incident log and begins writing in it — not a hostile act, a protective one. She is documenting the conversation before you can document it differently. "Any concern about record accuracy should be filed through the supplemental inquiry process." She doesn\'t look up while she writes. The entry she\'s making right now will appear in the section audit before your inquiry does.';
        G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
        addJournal('Clerk logged the conversation pre-emptively — incident record filed before inquiry', 'complication');
      } else if (result.total >= target) {
        G.lastResult = 'The clerk doesn\'t open the ledger, but she stops routing you to the oversight desk. "The discrepancy was flagged internally three weeks ago," she says, her voice low under the counter noise. "The flag came back marked reviewed. Nothing changed in the entries." She holds her pen over a fresh routing form without beginning to write. "Reviewed by whom is not in my section\'s record." The section that holds the reviewer\'s identity is the supplemental registry. She knows this. She says it without saying it.';
        addJournal('Clerk confirmed internal flag on discrepancy — reviewer identity in supplemental registry', 'evidence');
      } else {
        G.lastResult = 'The clerk hears the argument and considers it for a full five seconds — long enough that you know she\'s done the calculation. Then she slides the routing form back. "The discrepancy is recorded. The oversight desk review is recorded." She opens her log and shows you the entry dates. "What I cannot tell you is what the review concluded. That\'s in a section of the record I don\'t access." She taps the date on the review entry. The review happened on a day the oversight desk was not officially in session.';
        addJournal('Clerk showed review entry — oversight desk record dated to an unofficial session day', 'discovery');
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  }

);

window.SHELKOPOLIS_STAGE1_ENRICHED_CHOICES = SHELKOPOLIS_STAGE1_ENRICHED_CHOICES;

// ── ARCHETYPE-EXCLUSIVE CHOICES ──────────────────────────────
SHELKOPOLIS_STAGE1_ENRICHED_CHOICES.push(

  // COMBAT ×2 — Physical pressure on guild factors or creditors
  {
    archetypeGroup: 'combat',
    label: 'The counting house clerk has the sealed ledger. He will not have it for long.',
    tags: ['Combat', 'Direct', 'Risk', 'Confrontation'],
    xpReward: 65,
    stageProgress: 1,
    failResult: {
      text: 'The clerk steps back from the counter before you finish moving — his left hand finds the bell rope without looking and he pulls it once, short. By the time the sound settles two factors are in the doorway and the ledger is under the counter. The guild knows how to end these conversations quickly. The entry on the counter record will read "threshold dispute, Category Three." You are now in a category.',
      xp: 0,
      effects: [],
      next: [{text: 'Clear the building before the Category Three log reaches the registry.', skill: 'survival', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'pressuring counting house clerk for sealed ledger');
      G.stageProgress[1]++;

      var result = rollD20('combat', (G.skills.combat || 0));
      var target = 14;

      if (result.isCrit) {
        G.lastResult = 'The clerk reads your posture correctly and decides the bell rope is not worth the motion. He sets the ledger on the counter — not open, but down — and steps back. "The reference column," he says, which is not an offer but a concession. The reference column is enough: seven consignment tallies, three factors\' initials, one routing code that matches no registered manifest. You have it in thirty seconds. The clerk stays at the back of the room until you leave. He does not reach for the bell rope.';
        G.stageProgress[1]++;
        addJournal('Counting house: reference column accessed under pressure — routing code with no manifest match', 'evidence');
      } else if (result.isFumble) {
        G.lastResult = 'The clerk pulls the bell rope and it isn\'t the bell rope — it\'s a catch release for a drop panel in the counter, and the ledger disappears through it before the bell in the back room finishes its first ring. Two factors are in the doorway in under twenty seconds. The ledger is gone. The incident is logged. You leave before it becomes something with your name attached to it, but the door-side factor gets a look at your face.';
        G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
        addJournal('Counting house: ledger secured before access — factor logged your face', 'complication');
      } else if (result.total >= target) {
        G.lastResult = 'The clerk holds his ground for two seconds and then steps aside from the ledger without touching it — not consent, but absence of refusal. The ledger is sealed but the routing tabs are visible at the spine. You read the tabs: seven sections, two flagged with a notation you recognize as the guild\'s internal escalation marker. The section that matters is behind the second flag. It\'s enough to know it exists and which factor initialed the flag.';
        addJournal('Counting house: ledger routing tabs read — two escalation-flagged sections identified', 'evidence');
      } else {
        G.lastResult = 'The clerk doesn\'t move and doesn\'t reach for the bell rope. He holds the ledger against his chest with both arms and meets your eyes. He\'s been in confrontations before — this isn\'t the first time someone has stood on the wrong side of this counter with bad intentions. He waits you out. The counting house stays quiet. The ledger stays sealed. You\'ve gained nothing and spent the kind of credit that doesn\'t recover in a single district.';
        addJournal('Counting house standoff: clerk held position, ledger retained', 'discovery');
      }

      G.recentOutcomeType = 'action';
      maybeStageAdvance();
    }
  },

  {
    archetypeGroup: 'combat',
    label: 'The ambush on the guild courier was set before he left the building.',
    tags: ['Combat', 'Direct', 'Risk', 'CombatEntry'],
    xpReward: 65,
    stageProgress: 1,
    failResult: {
      text: 'The courier takes a different route — a variation you didn\'t account for. By the time you reorient, he\'s three blocks ahead and inside the next guild post. The documents he was carrying are now logged under two seals. Whatever was in transit is no longer in transit. It has arrived.',
      xp: 0,
      effects: [],
      next: [{text: 'Fall back and find another approach before the post logs receipt.', skill: 'survival', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'clearing ambush from guild courier route');
      G.stageProgress[1]++;

      var result = rollD20('combat', (G.skills.combat || 0));
      var target = 14;

      if (result.isCrit) {
        G.lastResult = 'The two ambush figures in the alley arch are amateurs — guild enforcers on a contract, not trained operatives. You clear the arch before they close on the courier and the courier makes the calculation quickly: whoever just helped him is safer than whoever just tried to stop him. He opens the document case. Inside: a manifest with a routing code that routes to an unregistered address, and a counter-seal from an office that doesn\'t appear in the guild directory. He lets you photograph the counter-seal in chalk on the alley wall before the ink dries on his memory of it.';
        G.stageProgress[1]++;
        addJournal('Guild courier document case: unregistered address manifest + counter-seal from unlisted office', 'evidence');
      } else if (result.isFumble) {
        G.lastResult = 'The ambush figures aren\'t alone — a third is at the alley exit you didn\'t check. The courier runs for the guild post when the third figure moves. You extract without injury but the document case goes with the courier and the three figures know your silhouette. Whatever the courier was carrying is now logged inside a guild post under emergency receipt protocol, which means two additional seals and a registry flag.';
        addJournal('Ambush intervention failed — courier reached guild post, documents under emergency seals', 'complication');
      } else if (result.total >= target) {
        G.lastResult = 'You clear the two figures from the arch before they reach the courier. The courier doesn\'t wait to find out who helped him — he\'s already running the moment the second figure goes down. But the document case clips a wall bracket on his way out and the latch springs. One document falls. It\'s a routing slip, not a manifest, but the routing code on it doesn\'t match any registered channel in Shelkopolis. You pocket it before the figures recover and walk the other direction.';
        addJournal('Routing slip recovered from dropped courier document — unregistered channel code', 'evidence');
      } else {
        G.lastResult = 'You reach the arch in time to place yourself between the courier and the two figures, which buys the courier four seconds and the document case stays with him. The figures back off when they see the math has changed. The courier continues to the guild post without looking back. You don\'t know what he was carrying, but you know someone wanted it stopped before it arrived. That\'s something. The two figures know your face now.';
        addJournal('Courier protected but document case not accessed — ambush figures noted your face', 'discovery');
      }

      G.recentOutcomeType = 'action';
      maybeStageAdvance();
    }
  },

  // MAGIC ×2 — Ward analysis or cipher work
  {
    archetypeGroup: 'magic',
    label: 'The ward marks on these guild documents were not applied by the same hand.',
    tags: ['Knowledge', 'Lore', 'Records', 'Arcane'],
    xpReward: 65,
    stageProgress: 1,
    failResult: {
      text: 'The documents on the public table carry standard guild ward notation — correctly applied, nothing to read between the lines. Whatever you were looking for is not in the publicly visible layer. The sealed archive holds the older documents, and the reading room requires a registered introduction from a guild factor.',
      xp: 0,
      effects: [],
      next: [{text: 'A guild factor introduction opens the sealed archive.', skill: 'survival', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'reading ward mark anomalies on sealed guild documents');
      G.stageProgress[1]++;

      var result = rollD20('lore', (G.skills.lore || 0));
      var target = 13;

      if (result.isCrit) {
        G.lastResult = 'Two mark systems on the same document: the outer seal is guild standard, applied by the registry notary whose initial appears in the corner. The inner ward — the one that governs who can open the seal without triggering the authentication alert — is a different notation entirely. Older style, regional, the kind used by independent scrivencraft practitioners before the guild standardized the method. Someone with pre-guild credentials applied an inner ward to a guild document. The outer seal exists to make that invisible. To anyone without the training to read both layers.';
        G.stageProgress[1]++;
        addJournal('Sealed guild document carries dual-layer wards — inner ward by pre-guild practitioner, outer seal as cover', 'evidence');
      } else if (result.isFumble) {
        G.lastResult = 'You read the ward marks correctly but draw the wrong conclusion — what looks like a notation anomaly is actually a standard authentication variant used for documents in transit between guild districts. The clerk watching you from the reference desk has seen you spend ten minutes examining a routine document and is now deciding whether to log the interaction. She reaches for her ledger. You pick up a pamphlet from the rack and leave before she finishes writing.';
        addJournal('Ward mark misread — clerk logged extended document examination', 'complication');
      } else if (result.total >= target) {
        G.lastResult = 'The outer seal reads normally. The inner notation — applied before the seal, not after — uses a symbol set that the guild standardized away from fifteen years ago. Someone applied the inner ward using the old notation, then had a guild notary apply the outer seal over it. Either the notary didn\'t check the inner layer, or they were told not to. The document\'s reference number should be traceable through the registry archive.';
        addJournal('Inner ward on sealed document uses pre-standard notation — applied before guild seal', 'evidence');
      } else {
        G.lastResult = 'The ward marks are unusual — not wrong, but unusual in a way that would require a reference text to be specific about. The outer notation is standard. The inner layer, readable only if you know to look for a second application, uses a form you\'ve seen but can\'t place without checking a notation index. The guild archive holds the pre-standardization notation manual. The reading room is open during two daily windows.';
        addJournal('Guild document: dual-layer ward notation suspected, notation index needed for confirmation', 'discovery');
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  {
    archetypeGroup: 'magic',
    label: 'The manifest column totals are right. The cipher in the margin is not.',
    tags: ['Knowledge', 'Lore', 'Records', 'Cipher'],
    xpReward: 65,
    stageProgress: 1,
    failResult: {
      text: 'The margin notation is too compressed to read without a key — it could be bookkeeping shorthand, it could be something else. The guild archive holds the manifest notation standards manual, which would confirm whether this is authorized margin use. The reading room requires a registered introduction to access.',
      xp: 0,
      effects: [],
      next: [{text: 'A registered introduction opens the notation standards manual.', skill: 'survival', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'decoding manifest margin cipher');
      G.stageProgress[1]++;

      var result = rollD20('lore', (G.skills.lore || 0));
      var target = 13;

      if (result.isCrit) {
        G.lastResult = 'The margin notation is a substitution cipher using the manifest column headers as the key — elegant, obvious once you see it, invisible if you\'re only checking the column totals. The decoded message is a secondary routing instruction: the listed cargo goes to the registered consignee, and a percentage of it — encoded as a fraction of the fourth column — goes to an address in the northern commercial district that doesn\'t appear in any guild registry. The percentage has been constant across four manifests. This is a system, not an error.';
        G.stageProgress[1]++;
        addJournal('Manifest margin cipher decoded — systematic secondary routing to unregistered northern address', 'evidence');
      } else if (result.isFumble) {
        G.lastResult = 'The margin notation resolves as ordinary bookkeeping shorthand — a ledger assistant\'s notation system, nothing more, and you\'ve spent enough time staring at the manifest that the registry clerk has come over twice. On the second visit she asks if you\'d like to submit a formal records inquiry. The offer is polite and specific. It is also a way of getting your name attached to the document you\'ve been reading. You decline and step away from the table.';
        addJournal('Manifest margin misread — registry clerk offered formal inquiry, interaction logged', 'complication');
      } else if (result.total >= target) {
        G.lastResult = 'The margin notation uses a simple offset cipher — the kind a careful bookkeeper applies when the real routing can\'t appear in the main columns. You decode two of the four lines before you lose the key pattern. What you have: a fraction notation that maps to a secondary quantity, and a reference number that doesn\'t appear in the main manifest body. The reference number is the thread. It will appear somewhere else in the registry system.';
        addJournal('Manifest margin: partial cipher decoded — secondary quantity fraction and reference number recovered', 'evidence');
      } else {
        G.lastResult = 'The margin notation is deliberate — the spacing is too consistent for casual jottings, and the characters are selected from the same subset across multiple lines. It\'s a cipher, but the key isn\'t in the document. Substitution ciphers of this type in merchant contexts usually use the manifest column headers, or the consignee address, or a shared document referenced in the routing instructions. You have two of those three available at this table.';
        addJournal('Manifest margin: cipher confirmed, key not yet identified — column headers or address as candidates', 'discovery');
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // STEALTH ×2 — Tailing or covert entry
  {
    archetypeGroup: 'stealth',
    label: 'The guild factor takes the same route through the commercial district every morning.',
    tags: ['Stealth', 'Observation', 'Risk'],
    xpReward: 65,
    stageProgress: 1,
    failResult: {
      text: 'The factor varies his route this morning — a new street, a covered arcade you hadn\'t mapped. By the time you reorient he\'s inside the guild post and the door is closed. Whatever the morning route was meant to show you, it showed you nothing today.',
      xp: 0,
      effects: [],
      next: [{text: 'Fall back and map the route properly before the next morning.', skill: 'survival', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'tailing a guild factor through the commercial district');
      G.stageProgress[1]++;

      var result = rollD20('stealth', (G.skills.stealth || 0));
      var target = 15;

      if (result.isCrit) {
        G.lastResult = 'The factor stops twice — once to exchange a sealed note with a clerk outside the Silkweaver counting house, once to check a ward mark on a doorframe in the lesser arcade that he pretends to examine as a scratch on the frame. Both stops are brief and both are clearly routine. At the guild post entrance he pauses and looks back along the street — a practiced check, not alarm. You\'re behind a cart vendor and he looks past you. The clerk who received the note didn\'t put it in a bag. She put it directly inside her coat. The ward mark on the doorframe was freshly applied — still faintly tacky.';
        G.stageProgress[1]++;
        addJournal('Factor route: sealed note to coat (not bag), freshly-applied ward mark checked — both irregular', 'evidence');
      } else if (result.isFumble) {
        G.lastResult = 'The factor doesn\'t look back — he stops. Mid-street, between the chandler stalls and the guild registry steps, he simply stops walking and waits. He doesn\'t look behind him. He counts something silently, you can see his lips move, and then continues. By the time he reaches the guild post you understand: he stops at random points to flush tails. He knows someone is behind him, or he always assumes someone is. Either way, he\'s logged the shape of your presence on his route without ever looking at you.';
        addJournal('Factor uses counter-surveillance stops — presence noted without confirmation', 'complication');
      } else if (result.total >= target) {
        G.lastResult = 'The factor makes one stop you hadn\'t mapped: the letter alcove in the Silkweaver\'s Chapel. He deposits something small and picks up something folded. The exchange takes eleven seconds. The chapel clock reads the second-watch morning hour — the same time Marta at the Amber Fountain noted for the regular collections from that alcove. The factor connects to the letter network you already know about. He is not just a user of it. His timing is too precise.';
        addJournal('Factor uses Silkweaver letter alcove at second-watch hour — connected to known letter network', 'evidence');
      } else {
        G.lastResult = 'The factor takes his route without deviation and without looking back. He enters three buildings. You note all three: the Silkweaver counting house, the lesser arcade under the registry steps, and the guild post on Manifest Row. The lesser arcade stop is the anomaly — it\'s two blocks off the most direct route between the other two. He spends four minutes inside. It\'s worth knowing what\'s in the lesser arcade.';
        addJournal('Factor route: lesser arcade stop anomalous — 4 minutes, 2 blocks off direct route', 'discovery');
      }

      G.recentOutcomeType = 'stealth';
      maybeStageAdvance();
    }
  },

  {
    archetypeGroup: 'stealth',
    label: 'The counting house closes at fifth-watch bell. The back entrance locks later.',
    tags: ['Stealth', 'Infiltration', 'Risk'],
    xpReward: 65,
    stageProgress: 1,
    failResult: {
      text: 'The back entrance locks earlier than the posted schedule suggests — a recent change, no notice posted. You find the latch seated before you reach it and the ward mark on the frame freshly activated. Someone updated the lock schedule and didn\'t announce it. The front entrance closes at the same hour. The counting house is sealed for the night.',
      xp: 0,
      effects: [],
      next: [{text: 'Find another approach before the night patrol begins.', skill: 'survival', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'entering the counting house after hours');
      G.stageProgress[1]++;

      var result = rollD20('stealth', (G.skills.stealth || 0));
      var target = 15;

      if (result.isCrit) {
        G.lastResult = 'The back entrance gives and the counting house after hours is a different space — the ward marks on the doorframes are visible in the low lamp, and two of them are active in a configuration that isn\'t standard locking. Someone has set them to notify on exit, not on entry. Whoever comes here after hours doesn\'t want a record of leaving. The manifest archive is open on the main table: a set of routing slips bundled with a factor\'s seal and an address in the northern district written in a hand different from the manifests themselves. You copy the address and reseal the bundle before you leave.';
        G.stageProgress[1]++;
        addJournal('After-hours counting house: exit-notify wards active, northern district address in different hand on routing bundle', 'evidence');
      } else if (result.isFumble) {
        G.lastResult = 'You clear the back entrance and are three steps inside when the lamp at the far end of the main room flares — a ward trigger, not a person, but the light lasts thirty seconds and anyone on the street outside can see the glow through the shutter gap. You\'re back through the entrance before the light dies. The ward logged the entry. You don\'t know what the log connects to, but whoever reads it will know someone came after hours.';
        addJournal('Counting house entry triggered ward log — after-hours attempt recorded', 'complication');
      } else if (result.total >= target) {
        G.lastResult = 'The counting house interior after hours smells of lamp oil and old ledger leather. The main table holds three sealed routing bundles — too risky to open without knowing the ward configuration. But the manifest index above the archive shelf is unsecured: a list of reference numbers with factor initials. Two reference numbers in the index carry an additional notation that doesn\'t match any standard classification you recognize. You note them and clear the building in under four minutes.';
        addJournal('After-hours counting house: manifest index accessed — two reference numbers with unrecognized classification', 'evidence');
      } else {
        G.lastResult = 'You clear the back entrance and make it to the manifest archive shelf before you hear footsteps on the upper floor — a night clerk, or a factor working late, the sound of a chair moving. You freeze and the footsteps settle without descending. You have time to read the manifest index at the top of the shelf before retreating. It\'s enough to confirm that certain reference numbers don\'t have corresponding entries in the public registry. The archive holds the full records.';
        addJournal('After-hours counting house: late occupant upstairs — manifest index partial access, archive holds full records', 'discovery');
      }

      G.recentOutcomeType = 'stealth';
      maybeStageAdvance();
    }
  },

  // SUPPORT ×2 — Negotiation or information brokering
  {
    archetypeGroup: 'support',
    label: 'The trade concession is worth more to him than the manifest access.',
    tags: ['Social', 'NPC', 'Negotiation', 'Commerce'],
    xpReward: 65,
    stageProgress: 1,
    failResult: {
      text: 'The factor considers the concession and declines without explaining why — a specific decline, not a general one. Whatever you offered has a problem you\'re not aware of. He straightens a stack of papers that doesn\'t need straightening and waits for you to leave. The ledger access is more protected than the concession covers.',
      xp: 0,
      effects: [],
      next: [{text: 'Find a more valuable lever before the factor closes the window.', skill: 'survival', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'leveraging trade concession for manifest access');
      G.stageProgress[1]++;

      var result = rollD20('persuasion', (G.skills.persuasion || 0));
      var target = 13;

      if (result.isCrit) {
        G.lastResult = 'The factor listens to the concession offer and his expression does something careful and controlled that might be relief. He opens the ledger to the reference section and steps back from it. "I\'m going to check the northern corridor filing." He doesn\'t check the northern corridor filing — there is no northern corridor filing at this hour. He gives you four minutes and doesn\'t look back. The reference section holds seven entries with the routing anomaly you\'ve been tracing — all initialed by the same factor. He is not that factor.';
        G.stageProgress[1]++;
        addJournal('Ledger reference section accessed: 7 routing anomalies under single factor\'s initial', 'evidence');
      } else if (result.isFumble) {
        G.lastResult = 'The factor\'s expression shifts when you name the concession — not refusal, recognition. He knows what you\'re offering because he knows why you\'re asking. He closes the ledger before it\'s been opened and looks at the door. "This conversation didn\'t happen in this building." He says it with absolute precision, the way someone delivers a message they\'ve been asked to deliver. He picks up a routing form and begins filling it out for something else. The ledger goes into the locked drawer.';
        addJournal('Factor recognized the concession offer as a test — ledger locked, interaction denied', 'complication');
      } else if (result.total >= target) {
        G.lastResult = 'The factor accepts the concession and opens the ledger to the routing section — not the full ledger, the routing section only. It\'s enough. Two entries in the past three weeks carry a routing code that doesn\'t match any registered channel in the district registry. The factor watches you read them. "Those references were submitted through the northern desk," he says. "I don\'t handle the northern desk." He closes the ledger when you\'re done. The transaction is complete.';
        addJournal('Ledger routing section: two entries with unregistered channel codes — northern desk submission', 'evidence');
      } else {
        G.lastResult = 'The factor takes the concession and gives you fifteen minutes with the ledger index — not the ledger itself, the index. The index lists reference numbers, dates, and factor initials. It\'s a starting point. Three reference numbers in the past month share an initial that doesn\'t appear in the factor directory posted at the registry entrance. Either the directory is incomplete or the initial belongs to someone operating outside the registered system.';
        addJournal('Ledger index accessed: three references share an initial absent from factor directory', 'discovery');
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  {
    archetypeGroup: 'support',
    label: 'The clerk knows the ledger discrepancy threatens her standing, not just the merchants\'.',
    tags: ['Social', 'NPC', 'Persuasion', 'Records'],
    xpReward: 65,
    stageProgress: 1,
    failResult: {
      text: 'The clerk listens to the framing and doesn\'t move. "Discrepancy resolution is Category Two. Category Two goes through the oversight desk." She sets a routing form on the counter. The form requires a registered factor as co-signatory. She knows you don\'t have a registered factor. The form is a door that looks like a form.',
      xp: 0,
      effects: [],
      next: [{text: 'Find a registered factor co-signatory before the window closes.', skill: 'survival', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'convincing clerk ledger discrepancy threatens her standing');
      G.stageProgress[1]++;

      var result = rollD20('persuasion', (G.skills.persuasion || 0));
      var target = 13;

      if (result.isCrit) {
        G.lastResult = 'The clerk stops writing when you explain what a Category Two discrepancy in her section means for the quarter audit. Her pen finds the edge of the routing form and scores a small line along it without her seeming to notice. "The entries were submitted through the supplemental registry. I processed them on instruction from the oversight desk." She opens her intake log without being asked. "If the oversight desk issued the instruction, the oversight desk carries the liability. Not this counter." She shows you the intake log. The oversight desk instruction is there. It has no counter-signature.';
        G.stageProgress[1]++;
        addJournal('Clerk showed intake log: oversight desk instruction for discrepant entries has no counter-signature', 'evidence');
      } else if (result.isFumble) {
        G.lastResult = 'The clerk hears the implication and goes very still. Then she reaches for the incident log and begins writing in it — not a hostile act, a protective one. She is documenting the conversation before you can document it differently. "Any concern about record accuracy should be filed through the supplemental inquiry process." She doesn\'t look up while she writes. The entry she\'s making right now will appear in the section audit before your inquiry does.';
        G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
        addJournal('Clerk logged the conversation pre-emptively — incident record filed before inquiry', 'complication');
      } else if (result.total >= target) {
        G.lastResult = 'The clerk doesn\'t open the ledger, but she stops routing you to the oversight desk. "The discrepancy was flagged internally three weeks ago," she says, her voice low under the counter noise. "The flag came back marked reviewed. Nothing changed in the entries." She holds her pen over a fresh routing form without beginning to write. "Reviewed by whom is not in my section\'s record." The section that holds the reviewer\'s identity is the supplemental registry. She knows this. She says it without saying it.';
        addJournal('Clerk confirmed internal flag on discrepancy — reviewer identity in supplemental registry', 'evidence');
      } else {
        G.lastResult = 'The clerk hears the argument and considers it for a full five seconds — long enough that you know she\'s done the calculation. Then she slides the routing form back. "The discrepancy is recorded. The oversight desk review is recorded." She opens her log and shows you the entry dates. "What I cannot tell you is what the review concluded. That\'s in a section of the record I don\'t access." She taps the date on the review entry. The review happened on a day the oversight desk was not officially in session.';
        addJournal('Clerk showed review entry — oversight desk record dated to an unofficial session day', 'discovery');
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // SIDEPLOT HOOK: LEDGER SHADOW
  {
    id: 'shelk_sideplot_ledger_shadow_open',
    label: 'The routing numbers in this ledger have no matching shipment record.',
    skill: 'wits',
    tags: ['Records', 'Discovery'],
    plot: 'side',
    condition: function() { return G && G.flags && !G.flags.sideplot_ledger_shadow_started; },
    fn: function() {
      G.flags.sideplot_ledger_shadow_started = true;
      addNarration('', 'The transit ledger lists routing numbers with no corresponding shipments anywhere in the manifest registry. Phantom routing codes have been assigned to real institutional capacity — the corridors are real, the registered cargo that should fill them is not. Someone is using the routing structure without using the routes.');
      addJournal('Transit ledger: routing numbers without corresponding shipments. Phantom assignments using real routing infrastructure.', 'evidence');
      if (window.SHELK_FAIRHAVEN_LEDGER_SHADOW && typeof window.SHELK_FAIRHAVEN_LEDGER_SHADOW.open === 'function') window.SHELK_FAIRHAVEN_LEDGER_SHADOW.open();
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: { text: 'The transit records desk is sealed for a scheduled audit — a duty clerk at the window says the window is closed, no estimate given. The outer ledger rack beside the main counter holds the public routing index. That index is still accessible, and the phantom codes will appear against empty manifests.' }
  }

);
