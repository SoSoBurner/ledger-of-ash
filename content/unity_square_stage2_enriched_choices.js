/**
 * UNITY SQUARE STAGE 2 ENRICHED CHOICES
 * Investigation arc: arrival registry manipulation / ward mediation bypasses
 * NPCs: Vale Brokerwell (Clerk of Arrivals), Vale Ledgermere (Ward Mediator), Vale Tinmarch (Street Physician)
 */

var UNITY_SQUARE_STAGE2_ENRICHED_CHOICES = [

  {
    label: "Diplomatic transit arrivals not logged in the main registry. Only in a shadow sub-register.",
    skill: 'wits',
    tags: ['Investigation', 'Stage2', 'Meaningful'],
    xpReward: 20,
    failResult: function() {
      addNarration('', 'You step out of the bargaining floor into the carrier lane before the question lands. The paved exchange court reflects the early afternoon glare off the counting-house white. A tally tower bell marks the half-hour; a carrier with a sealed crate angles past, and the moment dissolves into the rhythm of the square.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(35, 'exposing arrival registry shadow sub-register with Vale Brokerwell');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.wits||0));
      if (result.isCrit) {
        G.flags.met_vale_brokerwell = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `The shadow sub-register runs to forty-three entries over six months. Brokerwell built it in a separate ledger, kept in the drawer under his main archive binder. Three patterns stand out across the entries: the same sealed charter parties appearing on overlapping dates, cargo weight notations consistent with suppression compound volumes, and a routing sequence that touches every major hub that has appeared elsewhere in this thread. Unity Square isn't a peripheral stop. The parties from every node meet here on a cycle.`;
        addJournal('Unity Square shadow register: operation coordination hub confirmed — all node parties meet here', 'evidence', `unity-brokerwell-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `The filing system has a secondary register under a classified administrative designation — visible only if you know to look for a second binder behind the first. The access attempt triggers a log entry that routes automatically to the Ward Administration oversight committee. You're two steps back from the desk when the clerk at the outer door straightens and reaches for the internal correspondence tube. The access has been flagged. The sub-register stays closed.`;
        addJournal('Shadow register access flagged — Ward Administration oversight committee notified', 'complication', `unity-brokerwell-fail-${G.dayCount}`);
      } else {
        G.flags.met_vale_brokerwell = true;
        G.investigationProgress++;
        G.lastResult = `Brokerwell opens the lower drawer and lifts the main binder out to reach the one behind it. "Diplomatic exemption arrivals stop appearing in the main registry at a certain authorization level." He sets the second ledger on the desk. "I started a separate record. If I'm not going to log them officially, I'm going to log them somewhere." He pushes it toward you. "That felt like the minimum I could do."  The entries are in his hand, dated and consistent.`;
        addJournal('Unity Square shadow register confirms unlogged diplomatic arrivals', 'evidence', `unity-brokerwell-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Parties from prior mediations have now appeared in the same network. The records cross-identify them.",
    skill: 'charm',
    tags: ['NPC', 'Persuasion', 'Stage2', 'Meaningful'],
    xpReward: 20,
    failResult: function() {
      addNarration('', 'You step out of the bargaining floor into the carrier lane before the question lands. The paved exchange court reflects the early afternoon glare off the counting-house white. A tally tower bell marks the half-hour; a carrier with a sealed crate angles past, and the moment dissolves into the rhythm of the square.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(34, 'cross-referencing mediation participants with Vale Ledgermere');
      const result = rollD20('charm', (G.skills.charm||0));
      if (result.isCrit) {
        G.flags.met_vale_ledgermere = true;
        G.investigationProgress++;
        G.lastResult = `Ledgermere works from a mediation room off the main hall with no windows and a door that closes flush to the frame. "Confidentiality is absolute during the session and after. Both parties must release." He checks his files. Three months ago, one party from a closed mediation filed a subsequent legal proceeding and released the mediation record as exhibit documentation. That party's consent carries. The record names the other: a Soreheim Iron Compact freight agent and a Guildheart Hub broker, disputing a payment default on a "specialized compound consignment." The nature of the consignment is in the record. Both parties are named.`;
        addJournal('Mediation record confirms Soreheim Iron Compact agent and Guildheart broker in compound payment dispute', 'evidence', `unity-ledgermere-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Ledgermere folds his hands on the desk. "Both parties in writing, before I open any file. That's not policy I can set aside." He logs the request in his intake register while you're still at the desk. Your name, the date, the nature of the inquiry — all of it now part of the mediation request record, which both parties will be notified of. The records stay sealed. Your inquiry does not.`;
        addJournal('Ward mediation confidentiality — both party consent required, request documented', 'complication', `unity-ledgermere-fail-${G.dayCount}`);
      } else {
        G.flags.met_vale_ledgermere = true;
        G.investigationProgress++;
        G.lastResult = `Ledgermere reviews his session calendar without opening any individual file. "Six months — I can confirm mediation sessions took place between parties from different institutional contexts. That much is in the scheduling record, not the session record." He closes the calendar. "The nature of those disputes I'd describe as specialized commercial — unusual for this square's typical case load." He won't go further. The phrasing is careful and deliberate.`;
        addJournal('Unusual specialized commercial mediations confirmed — parties from multiple institutions', 'evidence', `unity-ledgermere-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Patients with low-level exposure symptoms. All Unity Square residents near the coordination meeting points.",
    skill: 'vigor',
    tags: ['NPC', 'Survival', 'Stage2', 'Meaningful'],
    xpReward: 20,
    failResult: function() {
      addNarration('', 'Tinmarch\'s street-side dispensary closes early — a clerk you don\'t recognize is at the half-door with the ledger sleeve and a polite, fixed refusal. The tenement row behind the inspection shed is quiet at this hour. The patient list stays with the doctor. You step back into the carrier lane.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(33, 'reviewing suppression exposure symptoms with street physician Vale Tinmarch');


      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('vigor', (G.skills.vigor||0));
      if (result.isCrit) {
        G.flags.met_vale_tinmarch = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `Tinmarch keeps his patient notes in a ledger he updates after every house call. He opens to a flagged section: twelve patients, four-month window, all presenting with the same cluster — cognitive fog, mild respiratory distress, reduced sensitivity to ambient magic. He's drawn a map of their home addresses in the margin. All twelve sit within two blocks of the same intersection. That intersection is the arrival address that appears most frequently in the shadow sub-register. The meetings are leaving a residue in the surrounding population.`;
        addJournal('Unity Square population cluster exposure confirmed — contamination from coordination meeting point', 'evidence', `unity-tinmarch-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Tinmarch keeps the ledger closed on the desk between you. "Patient records require patient consent before I share symptom data with a third party. That's not a rule I adjust." He does say this: "If you're asking whether I've noted unusual presentations in the blocks near the transit coordination points — I'm not in a position to confirm or deny based on specific records." He picks up his pen and returns to his notes. He didn't say no.`;
        addJournal('Medical privacy protocol — patient symptom cluster requires consent', 'complication', `unity-tinmarch-fail-${G.dayCount}`);
      } else {
        G.flags.met_vale_tinmarch = true;
        G.investigationProgress++;
        G.lastResult = `Tinmarch opens the ledger to the map page without showing you the patient names. "Cognitive fog, respiratory irritation, reduced ambient sensitivity — in a geographic cluster, that's not variance. That's exposure to something local and persistent." He points to the intersection marked in the margin. "That's the center of the cluster." He closes the ledger. He doesn't know what the source is. The address matches the shadow register's most frequent arrival entry.`;
        addJournal('Geographic symptom cluster at arrival registry address — exposure source likely', 'evidence', `unity-tinmarch-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "A second shadow ledger he didn't build. The handwriting isn't his.",
    skill: 'wits',
    tags: ['Stage2', 'NPC'],
    xpReward: 20,
    failResult: function() {
      addNarration('', 'You step out of the bargaining floor into the carrier lane before the question lands. The paved exchange court reflects the early afternoon glare off the counting-house white. A tally tower bell marks the half-hour; a carrier with a sealed crate angles past, and the moment dissolves into the rhythm of the square.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(35, 'second shadow ledger discovered via Vale Brokerwell escalation');

      if (!G.worldClocks) G.worldClocks = {};

      const result = rollD20('wits', (G.skills.wits||0));
      if (result.isCrit) {
        G.flags.brokerwell_second_ledger = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `The second ledger is older — it predates Brokerwell's tenure by fourteen months. The handwriting is clipped and formal, each entry consistent in format, each one referencing a charter designation that doesn't appear in any public filing index. The charter series follows a sequence Brokerwell doesn't recognize as standard Union administrative numbering. He's been keeping a parallel record of something that was already being tracked before he arrived. He sets both ledgers on the desk side by side. The columns align.`;
        addJournal('Pre-existing shadow ledger confirms operation predates Brokerwell — charter series unindexed', 'evidence', `unity-brokerwell2-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The second ledger's entries are in cipher — not an elaborate one, but consistent enough that a quick read produces nothing useful. Brokerwell watches you work through it. "I wasn't able to make sense of it either." The cipher key isn't in the registry. Without it, the entries are a sequence of marks. You photograph the column headers and leave. The content stays locked.`;
        addJournal('Second ledger entries in cipher — key not present in registry', 'complication', `unity-brokerwell2-fail-${G.dayCount}`);
      } else {
        G.flags.brokerwell_second_ledger = true;
        G.investigationProgress++;
        G.lastResult = `Brokerwell has already cross-referenced six entries between the two ledgers. The same parties appear in both — dates offset by two to three days, as if the second logger was recording arrivals slightly before or after the official transit window. "Whoever kept this wasn't operating on the same schedule I was given," he says. He doesn't name who it might be. The dual entries narrow the window around each party's actual presence in the square.`;
        addJournal('Dual shadow ledgers cross-referenced — arrival windows narrowed per party', 'evidence', `unity-brokerwell2-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Unlogged arrival, consignment weight matching no known cargo class. The staging point is traceable.",
    skill: 'finesse',
    tags: ['Stage2', 'Registry'],
    xpReward: 20,
    failResult: function() {
      addNarration('', 'You step out of the bargaining floor into the carrier lane before the question lands. The paved exchange court reflects the early afternoon glare off the counting-house white. A tally tower bell marks the half-hour; a carrier with a sealed crate angles past, and the moment dissolves into the rhythm of the square.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(34, 'tracing unlogged consignment weight back through loading lane manifests');

      if (!G.worldClocks) G.worldClocks = {};

      const result = rollD20('finesse', (G.skills.finesse||0));
      if (result.isCrit) {
        G.flags.consignment_route_traced = true;
        G.investigationProgress++;
        G.lastResult = `The covered loading lane keeps a secondary manifest board — a chalk-and-slate running record that the lane steward updates by hand and clears each evening. The entry you need is from six weeks ago, and the lane steward hasn't erased a slate from that period because one of the chalk rollers seized and they've been working around it. The weight notation matches the shadow register entry exactly. The staging address is on the slate: a counting house two blocks east, licensed under a charter name that appears in the unindexed series.`;
        addJournal('Consignment staging address confirmed — counting house under unindexed charter', 'evidence', `unity-consignment-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `The loading lane steward notices you at the manifest board longer than a casual passerby would stop. He doesn't say anything directly, but by the time you reach the far end of the lane, one of the arbitration runners has fallen into step behind you. The board told you nothing useful. The runner follows you two blocks before peeling off toward the tally towers. The lane is now alert.`;
        addJournal('Loading lane steward flagged presence — arbitration runner observed following', 'complication', `unity-consignment-fail-${G.dayCount}`);
      } else {
        G.flags.consignment_route_traced = true;
        G.investigationProgress++;
        G.lastResult = `The manifest board has the consignment weight but not the staging address — the entry uses a transit code rather than a named location. The code format is consistent with a short-haul storage arrangement rather than through-routing. The lane steward, when asked about the code class generally, says those entries cover staging holds rented by the hour rather than the day. Day-rental holders don't appear in the main registry. The staging point is close. The specific address needs another source.`;
        addJournal('Consignment staged in short-term hourly hold — specific address requires second source', 'intelligence', `unity-consignment-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The mediation spills into the open court. One party thinks I'm here to document them.",
    skill: 'charm',
    tags: ['Stage2', 'Social'],
    xpReward: 20,
    failResult: function() {
      addNarration('', 'You step out of the bargaining floor into the carrier lane before the question lands. The paved exchange court reflects the early afternoon glare off the counting-house white. A tally tower bell marks the half-hour; a carrier with a sealed crate angles past, and the moment dissolves into the rhythm of the square.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(33, 'navigating mistaken-identity friction in ward mediation session');

      if (!G.worldClocks) G.worldClocks = {};

      const result = rollD20('charm', (G.skills.charm||0));
      if (result.isCrit) {
        G.flags.ward_mediation_friction_resolved = true;
        G.investigationProgress++;
        G.lastResult = `The disputing party — a freight broker with a guild mark you don't recognize — stops mid-sentence when he sees you and reverses his earlier position entirely, suddenly agreeable to terms he'd refused three times in the session. Vale Ledgermere watches the shift with visible confusion. After the session clears, he finds you at the outer corridor. "Whatever he thought you were, it moved him." He pauses. "If you need the session calendar for the next ten days, I can leave it open on my desk between nine and ten."`;
        addJournal('Ward mediation mistaken identity — Ledgermere offers session calendar access', 'discovery', `unity-mediation-friction-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The freight broker raises his voice before you can clarify — "I want this person's credentials logged before this session continues" — and the mediation runner pulls out an intake form. Vale Ledgermere closes his session folder and asks both parties to step back. Your name goes into the intake register with a note flagging the interruption. The mediation reconvenes without you present. Two other people in the waiting area watched the whole exchange.`;
        addJournal('Ward mediation disrupted — name logged in intake register, session interrupted', 'complication', `unity-mediation-friction-fail-${G.dayCount}`);
      } else {
        G.flags.ward_mediation_friction_resolved = true;
        G.lastResult = `The freight broker doesn't fully accept your explanation, but the exchange costs him enough composure that he agrees to an extended documentation hold — meaning the session terms are now recorded rather than verbal. Vale Ledgermere acknowledges you with a slight nod from across the court as both parties file out. The broker's guild mark is one you haven't catalogued yet. The mediation runner, who writes everything down, has it in his intake notes.`;
        addJournal('Ward mediation friction defused — broker guild mark identified via intake notes', 'intelligence', `unity-mediation-friction-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "One tally clerk keeps her own count of the sealed-charter arrivals. Unbidden.",
    plot: 'main',
    skill: 'wits',
    tags: ['Stage2', 'Lore'],
    xpReward: 20,
    failResult: function() {
      addNarration('', 'You step out of the bargaining floor into the carrier lane before the question lands. The paved exchange court reflects the early afternoon glare off the counting-house white. A tally tower bell marks the half-hour; a carrier with a sealed crate angles past, and the moment dissolves into the rhythm of the square.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(32, 'cross-referencing tally tower clerk observations with shadow register entries');
      const result = rollD20('wits', (G.skills.wits||0));
      if (result.isCrit) {
        G.flags.met_tally_clerk_fera = true;
        G.investigationProgress++;
        G.stageProgress[2]++;
        G.lastResult = `The clerk — her name is Fera, and she uses her thumbnail to mark the door frame when she starts a shift — pulls a folded slip from inside her left cuff. Seventeen tallies in her own notation, spread across four months: the same three sealed-charter marks appearing together, always within a ninety-minute window of each other, always entering the exchange court from the northern laneway. "Nobody else counted them," she says, and presses the slip flat on the ledge between you.`;
        addJournal('Tally clerk Fera: sealed-charter parties arrive together on 90-minute window, northern laneway entry', 'evidence', `unity-fera-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Fera hears the question and her thumbnail stops moving. She looks past you toward the arbitration runner stationed at the court entrance, then back at the tally board. "I count what's on the board." She turns the board face-down and begins erasing today's chalk lines from the frame. The slip, if she has one, stays in her cuff. The runner's position gives him a line of sight to the entire tally floor. She knew that before you asked. The chalk erases cleanly. The board goes blank. She doesn't look back.`;
        addJournal('Tally clerk approach failed — arbitration runner proximity, clerk closed off', 'complication', `unity-fera-fail-${G.dayCount}`);
      } else {
        G.flags.met_tally_clerk_fera = true;
        G.investigationProgress++;
        G.lastResult = `Fera describes the pattern without producing documentation. Three charter marks, always together, always the northern laneway, never using the main exchange entry. She taps the door frame twice — once for the northern side, once for the southern. "They don't go south. Ever." Her chalk hand hovers over the tally board without marking anything. She waits for the shift supervisor to pass the end of his round before she speaks again, then doesn't. The information is already given.`;
        addJournal('Sealed-charter parties use northern laneway exclusively — pattern confirmed by tally clerk', 'intelligence', `unity-fera-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The counting house has lamplit windows well before the district's second bell.",
    plot: 'main',
    skill: 'wits',
    tags: ['Stage2', 'Lore'],
    xpReward: 20,
    failResult: function() {
      addNarration('', 'The lamplit windows of the third-floor counting room go dark at the strike of the second bell — somebody upstairs knew the timing of your arrival to the minute. The stacked counting house holds its facade in the pre-dawn cold. You pull your coat collar and walk past as if you had business elsewhere.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(32, 'observing the unindexed counting house during off-hours');
      const result = rollD20('wits', (G.skills.wits||0));
      if (result.isCrit) {
        G.flags.counting_house_interior_seen = true;
        G.investigationProgress++;
        G.stageProgress[2]++;
        G.lastResult = `A ground-floor shutter sits unlatched from the inside. Through the gap: two desks, both occupied, both ledgers open to columns that run in a hand you recognize from the second shadow register — the older one, the one predating Brokerwell. The ledger at the near desk is open to a transit log page. The charter series running down the left margin is the unindexed one. The counting house isn't ancillary to the coordination. It is where the records are reconciled.`;
        addJournal('Counting house confirmed as reconciliation point — older shadow register hand active, unindexed charter series visible', 'evidence', `unity-countinghouse-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `A second-floor window opens while you are positioned below. A figure leans out, looks directly at the laneway below, and holds there for twelve seconds. You do not move. The shutter on the ground floor closes from the inside before the figure withdraws. The counting house light goes out. The building is now dark and aware. The petitioners' hall at the square's far end carries the sound of a case being argued — the particular silence that falls when both parties stop talking at once. It fills the laneway until the window above stays shut.`;
        addJournal('Counting house occupants alerted — shutter closed, lights out', 'complication', `unity-countinghouse-fail-${G.dayCount}`);
      } else {
        G.flags.counting_house_interior_seen = true;
        G.investigationProgress++;
        G.lastResult = `The shutter gap shows one occupied desk, one open ledger, and a stack of transit receipts held under a paperweight shaped like a Unity Square tally marker. The hand on the open ledger matches neither the main registry nor Brokerwell's sub-register. A third keeper. The charter marks in the receipt stack are printed, not handwritten — the operation has a formal print run for its documentation.`;
        addJournal('Third ledger hand at counting house — printed charter marks confirm formal documentation production', 'intelligence', `unity-countinghouse-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The arbitration runner knows every sealed-notice route. He doesn't know what he's been carrying.",
    plot: 'main',
    skill: 'charm',
    tags: ['Stage2', 'Social'],
    xpReward: 20,
    failResult: function() {
      addNarration('', 'You step out of the bargaining floor into the carrier lane before the question lands. The paved exchange court reflects the early afternoon glare off the counting-house white. A tally tower bell marks the half-hour; a carrier with a sealed crate angles past, and the moment dissolves into the rhythm of the square.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(34, 'extracting route and timing intelligence from the arbitration runner');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('charm', (G.skills.charm||0));
      if (result.isCrit) {
        G.flags.runner_routes_confirmed = true;
        G.investigationProgress++;
        G.stageProgress[2]++;
        G.lastResult = `The runner — young, ink-stained at the cuffs, the kind of careful that comes from being corrected often — spreads his delivery route on the table between you without being asked. He traces the sealed-notice runs with a fingertip: always the same three stops, always the same sequence, and always before the second bell on the days the shadow register shows arrivals. The timing gap is thirty minutes. Enough for a party to receive notice and reach the exchange court before open session ends. He asks what the notices contain. You tell him you don't know yet either. That's the first honest thing anyone has said to him about it.`;
        addJournal('Arbitration runner routes confirmed — sealed-notice delivery precedes shadow register arrivals by 30 min', 'evidence', `unity-runner-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The runner listens, nods, and excuses himself before the conversation reaches the routes. Ten minutes later, the shift supervisor appears at the outer court door and watches the square without approaching. The runner's loyalty is to his post, not to the parties he delivers for — but his first instinct was to report the inquiry, not answer it. The routes stay his.`;
        addJournal('Arbitration runner approach failed — shift supervisor observed, runner did not disclose routes', 'complication', `unity-runner-fail-${G.dayCount}`);
      } else {
        G.flags.runner_routes_confirmed = true;
        G.investigationProgress++;
        G.lastResult = `The runner gives you the broad pattern without the specifics: always three stops, always the northern side of the square, never south of the tally towers. The notices go out before second bell. He knows the timing because he's never missed a handoff — not once, in four months. "Same windows, same sequence." He straightens the strap on his satchel. "Whoever sets the schedule doesn't miss either."`;
        addJournal('Runner delivery pattern: 3 stops, northern side, before second bell — consistent for 4 months', 'intelligence', `unity-runner-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The charter series should appear in the Ward tax ledger. Its absence is the record.",
    plot: 'main',
    skill: 'wits',
    tags: ['Stage2', 'Lore'],
    xpReward: 20,
    failResult: function() {
      addNarration('', 'You step out of the bargaining floor into the carrier lane before the question lands. The paved exchange court reflects the early afternoon glare off the counting-house white. A tally tower bell marks the half-hour; a carrier with a sealed crate angles past, and the moment dissolves into the rhythm of the square.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(35, 'tracing unindexed charter series absence in Ward tax records');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.wits||0));
      if (result.isCrit) {
        G.flags.ward_tax_gap_confirmed = true;
        G.investigationProgress++;
        G.stageProgress[2]++;
        G.lastResult = `The Ward tax ledger for the current fiscal period runs to four bound volumes. The charter series from the shadow register should generate assessable activity — transit fees, storage duties, the standard commercial levy on consignment weight above a set threshold. None of the unindexed charter marks appear in any volume. Not assessed, not exempt, not appealed. They are structurally absent: the tax administration has no record that these charters exist. The counting house operating under them has been commercially active for at least fourteen months without generating a single tax line. That requires someone in the assessment office to actively not see them.`;
        addJournal('Unindexed charter series absent from Ward tax ledger — active evasion requires assessment office complicity', 'evidence', `unity-tax-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The tax ledger reading room requires a stated inquiry purpose logged with the archive clerk. The clerk's notation of your inquiry category — charter cross-reference, commercial assessment — routes automatically to a supervisor review queue. The ledger volumes arrive but the relevant fiscal period is flagged as under administrative review, access restricted pending committee clearance. The gap you came to trace is now behind a closed door with your name attached to the request.`;
        addJournal('Tax ledger access flagged — administrative review restriction, inquiry logged under your name', 'complication', `unity-tax-fail-${G.dayCount}`);
      } else {
        G.flags.ward_tax_gap_confirmed = true;
        G.investigationProgress++;
        G.lastResult = `Two volumes cover the period in question. Neither contains the charter marks from the shadow register — not in the assessment index, not in the exemptions list, not in the appeals log. The archive clerk, when asked about the charter format generally, confirms that any active commercial charter generates at least one tax assessment event per quarter. Four quarters with nothing means the charter was never presented to the assessment office. Or it was presented and the record was removed.`;
        addJournal('Unindexed charters not in tax records — either never assessed or record removed', 'intelligence', `unity-tax-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Tinmarch's patient remembers which days she got worse. Those days have a pattern.",
    skill: 'vigor',
    tags: ['Stage2', 'Social'],
    xpReward: 20,
    failResult: function() {
      addNarration('', 'You step out of the bargaining floor into the carrier lane before the question lands. The paved exchange court reflects the early afternoon glare off the counting-house white. A tally tower bell marks the half-hour; a carrier with a sealed crate angles past, and the moment dissolves into the rhythm of the square.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(33, 'interviewing consenting patient about symptom timeline');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('vigor', (G.skills.vigor||0));
      if (result.isCrit) {
        G.flags.patient_symptom_timeline_confirmed = true;
        G.investigationProgress++;
        G.lastResult = `She sits near the window with both hands around a clay cup that has been empty for a while. Her name is Senna — she offers it before you ask. The bad days, she says, were always the day after a certain kind of night: the kind where the air near the alley exchange smelled faintly chemical, like a lamp wick burnt all the way down. She has written the dates in the back of a household ledger because she is precise by habit. Twelve dates. Tinmarch's symptom peaks match ten of them exactly. The other two fall within a day on either side. She slides the ledger across the table and leaves her hand on it before letting go.`;
        addJournal('Patient Senna: 12 symptom dates match coordination meeting windows — household ledger produced as record', 'evidence', `unity-patient-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Senna is willing to talk, but the conversation surfaces more than she anticipated — describing the worst nights brings the physical memory with it, and she stops mid-sentence and sets down the cup. "I need to stop here." She isn't unwilling. She is spent. Tinmarch, when you return to him, says this happens. He suggests waiting two days before approaching again. The dates are there but not yet in hand.`;
        addJournal('Patient interview paused — Senna willing but needs time, Tinmarch advises two-day wait', 'complication', `unity-patient-fail-${G.dayCount}`);
      } else {
        G.flags.patient_symptom_timeline_confirmed = true;
        G.investigationProgress++;
        G.lastResult = `Senna describes the pattern without producing documentation: "Worse nights came in clusters. Same time of month, sometimes twice in the same week." She identifies the alley exchange as the directional source — the smell always came from that side. She doesn't have exact dates, but her description of the clustering matches the shadow register's arrival frequency closely enough that the correlation holds. She offers to check her household accounts for the specific days if that would help.`;
        addJournal('Patient symptom clustering matches shadow register arrival frequency — household accounts may confirm exact dates', 'intelligence', `unity-patient-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Without a signature, the diplomatic exemptions expire. One administrator has been signing every renewal.",
    skill: 'wits',
    tags: ['Stage2', 'Lore'],
    xpReward: 20,
    failResult: function() {
      addNarration('', 'You step out of the bargaining floor into the carrier lane before the question lands. The paved exchange court reflects the early afternoon glare off the counting-house white. A tally tower bell marks the half-hour; a carrier with a sealed crate angles past, and the moment dissolves into the rhythm of the square.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(34, 'tracing diplomatic exemption renewal signatures to institutional enabler');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.wits||0));
      if (result.isCrit) {
        G.flags.exemption_signer_identified = true;
        G.investigationProgress++;
        G.lastResult = `The exemption renewal forms sit in a secondary administration archive, filed by renewal date rather than by charter. Each form requires a countersignature from the Ward's designated exemption administrator — a position that rotates on a two-year appointment. The current administrator is Vale Osken, appointed fourteen months ago, two months before the shadow register's earliest entry. Every renewal in the relevant series carries the same signature. Osken's appointment letter is in the same archive box. The letter lists his prior post: freight licensing administrator for the Guildheart Hub transit corridor. The appointment wasn't random.`;
        addJournal('Exemption renewals signed by Vale Osken — appointed 14 months ago, prior post Guildheart Hub freight licensing', 'evidence', `unity-exemption-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The exemption renewal archive requires a departmental access code — standard procedure for administrative records above a certain sensitivity tier. The code changes monthly. The current month's code is held by the Ward supervisor on duty. When you ask for access, the supervisor's response is to check which exemption series you are requesting before deciding. He doesn't refuse — he simply does not return.`;
        addJournal('Exemption archive access blocked — supervisor checked series before declining to return', 'complication', `unity-exemption-fail-${G.dayCount}`);
      } else {
        G.flags.exemption_signer_identified = true;
        G.investigationProgress++;
        G.lastResult = `The renewal forms are accessible but the signature on each is rendered as an administrative stamp rather than a personal mark — standard for routine counter-signatures. The stamp identifies the position, not the individual: "Designated Exemption Administrator, Ward of Unity Square." The position exists. The person holding it during the relevant period is traceable through the appointment register, which is a separate volume. The appointment register is in a different room and requires a separate access request.`;
        addJournal('Exemption renewals stamped by position, not name — appointment register identifies current holder', 'intelligence', `unity-exemption-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The northern laneway gatekeeper post goes unstaffed on a schedule. Someone set that schedule.",
    skill: 'finesse',
    tags: ['Stage2', 'Stealth'],
    xpReward: 20,
    failResult: function() {
      addNarration('', 'The gatekeeper\'s booth is staffed today — by a face you do not know, in a coat that doesn\'t match the standard ward-guard cut. He looks at you the way a tally clerk looks at a discrepancy. You turn the lane corner and let the covered loading shed take you out of his line of sight.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(33, 'examining gatekeeper post logs for deliberate scheduling gaps');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('finesse', (G.skills.finesse||0));
      if (result.isCrit) {
        G.flags.gatekeeper_schedule_confirmed = true;
        G.investigationProgress++;
        G.lastResult = `The post log is a chalk-and-slate board mounted inside the gatekeeper's box — updated by whoever holds the post, checked at shift close by the lane supervisor. The entries for the relevant windows are there but the duty column is blank: a staffing gap notation, not an absence. Staffing gaps require administrative authorization, and each one has an authorization code in the margin. All the gap-window codes trace to the same issuance: a standing order placed fourteen months ago, renewed automatically, signed by the designated exemption administrator. The laneway wasn't left open by accident or understaffing. It was opened on a schedule that was authorized in writing.`;
        addJournal('Northern laneway post gaps authorized by standing order — same administrator who signed exemption renewals', 'evidence', `unity-gatepost-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `The gatekeeper box is occupied when you reach it — not the scheduled officer, but a relief post who arrived early and is eating lunch with the log board propped against his knee. He watches you approach the whole way. The lane is well-lit at this hour, and there is no adjacent cover. He doesn't challenge you, but he closes the log board and sets it behind him before you reach the post. Whatever the board contains, you won't see it today.`;
        addJournal('Gatekeeper post occupied by unscheduled relief — log board closed before approach', 'complication', `unity-gatepost-fail-${G.dayCount}`);
      } else {
        G.flags.gatekeeper_schedule_confirmed = true;
        G.investigationProgress++;
        G.lastResult = `The gap windows are in the log — twelve entries over four months, each marked with a staffing authorization code rather than a duty officer's name. The codes are formatted differently from standard lane rotation gaps, suggesting a separate authorization pathway. The lane supervisor, when asked about the code class in general terms, says standing-order codes come from the Ward administration tier, not the lane management tier. Someone above the lane level set the schedule.`;
        addJournal('Gatekeeper gap windows on standing-order codes — authorization from Ward administration tier, not lane management', 'intelligence', `unity-gatepost-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The hub is confirmed. Expose the shadow register or intercept the final meeting.",
    skill: 'charm',
    tags: ['Investigation', 'Finale', 'Stage2', 'Consequence', 'Meaningful'],
    xpReward: 20,
    failResult: function() {
      addNarration('', 'You step out of the bargaining floor into the carrier lane before the question lands. The paved exchange court reflects the early afternoon glare off the counting-house white. A tally tower bell marks the half-hour; a carrier with a sealed crate angles past, and the moment dissolves into the rhythm of the square.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(102, 'Unity Square Stage 2 resolution');
      if (!G.investigationProgress || G.investigationProgress < 8) {
        G.lastResult = `The shadow register, the mediation cross-identification, the exposure cluster — not all three threads are in hand yet. Presenting a partial picture to Ward Administration oversight produces a partial response: an inquiry logged, a committee convened, nothing decided. The arbitration process is deliberate by design. More evidence is needed before the committee has grounds to act, and the parties who know how to read an incomplete submission will use the gap.`;
        G.recentOutcomeType = 'investigate'; return;
      }
      if (!G.worldClocks) G.worldClocks = {};

      const result = rollD20('charm', (G.skills.charm||0));
      if (result.total >= 14 || result.isCrit) {
        G.flags.stage2_finale_institutional = true;
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 3;
        G.lastResult = `The Ward Administration oversight committee meets in the formal chamber above the main square — the one with the original builders' inscription still intact on the lintel. Brokerwell's shadow sub-register sits on the table. The mediation record release lies beside it, with the compound consignment payment dispute named explicitly. Tinmarch's patient map rounds the presentation. The committee votes to suspend the diplomatic exemption protocol before adjourning. A formal complaint routes to Roadwarden Central Command in Shelkopolis that afternoon, with the full evidence set attached. Stage III opens with the committee's authorization.`;
        addJournal('Unity Square S2 finale: Ward oversight committee suspends exemptions, Roadwarden complaint filed', 'evidence', `unity-finale-inst-${G.dayCount}`);
      } else {
        G.flags.stage2_finale_underworld = true;
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 3;
        G.lastResult = `The shadow register's entry pattern gives you a date. You're in position at the arrival address before the first party shows. Four parties across ninety minutes, arriving in separate windows, departing the same way. You record each one: physical description, charter mark visible on the case each carries, time of arrival and departure. By the following morning, those descriptions are in the hands of every allied connection across the relevant localities. The next meeting window comes and goes with nobody arriving. The hub goes dark.`;
        addJournal('Unity Square S2 finale: coordination meeting observed, participants identified and distributed', 'evidence', `unity-finale-uw-${G.dayCount}`);
      }
      G.flags.stage2_faction_contact_made = true;
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "One awning dispute covers the same plot from three different filing angles. That doesn't happen.",
    plot: 'main',
    skill: 'wits',
    tags: ['Investigation', 'Stage2', 'Archive'],
    xpReward: 20,
    failResult: function() {
      addNarration('', 'You step out of the bargaining floor into the carrier lane before the question lands. The paved exchange court reflects the early afternoon glare off the counting-house white. A tally tower bell marks the half-hour; a carrier with a sealed crate angles past, and the moment dissolves into the rhythm of the square.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(34, 'tracing overlapping awning territory dispute filings in Unity Square registry');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.wits||0) + (typeof getEquipmentBonus==='function'?getEquipmentBonus('wits'):0));
      if (result.isCrit) {
        G.flags.awning_dispute_triple_filing_found = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The corner plot in question is the arrival address from Brokerwell's shadow register — the one that appears most frequently across the coordination entries. Three separate parties have filed awning territory claims against it under three different color-code designations, each claim citing a different historical precedent. The three claimants share no registered business relationship. Their filings are spaced four weeks apart, each one designed to extend the dispute's unresolved status. While a plot is under active territory dispute, the Ward mediation protocol suspends commercial inspection rights. The counting house operating on that plot has been inspection-exempt for fourteen months because three unrelated parties keep filing claims against it. The dispute is a maintenance structure, not a genuine contest.`;
        addJournal('Unity Square awning dispute triple-filing: three unconnected parties maintain active dispute on coordination hub plot — commercial inspection suspended for 14 months', 'evidence', `unity-awning-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The awning registry desk routes active dispute files through the Ward mediation queue rather than the public archive — the active status means the records are restricted to the involved parties and their designated mediators until resolution. Access requires a mediation party credential or a Vale Ledgermere referral. The clerk at the desk notes the request and the time. The note goes into the same tray as Ledgermere's morning correspondence.`;
        addJournal('Awning dispute files restricted during active status — access request logged to Ledgermere correspondence tray', 'complication', `unity-awning-fail-${G.dayCount}`);
        G.recentOutcomeType = 'complication';
      } else {
        G.flags.awning_dispute_triple_filing_found = true;
        G.investigationProgress++;
        G.lastResult = `The same plot appears three times in the dispute index — different claimants, different color-code designations, sequential filing dates. The registry clerk notes the overlap without being asked: "Multiple claims on the same plot aren't unusual if the parties are disputing the same boundary. Three separate designations on the same plot is unusual." She checks the claimant register. None of the three parties share a registered address or a common business designation. She makes a note in the margin of the dispute index that will go to the Ward mediator at week close.`;
        addJournal('Awning registry: triple-filing on coordination hub plot — unrelated claimants, Ward mediator notification pending', 'intelligence', `unity-awning-partial-${G.dayCount}`);
        G.recentOutcomeType = 'neutral';
      }
      if (!result.isFumble) G.recentOutcomeType = result.isCrit ? 'success' : 'neutral';
      maybeStageAdvance();
    }
  },

  {
    label: "A standing exemption from the counting cycle. Filed once, never renewed, still active.",
    plot: 'main',
    skill: 'wits',
    tags: ['Archive', 'Stage2', 'Lore'],
    xpReward: 20,
    failResult: function() {
      addNarration('', 'You step out of the bargaining floor into the carrier lane before the question lands. The paved exchange court reflects the early afternoon glare off the counting-house white. A tally tower bell marks the half-hour; a carrier with a sealed crate angles past, and the moment dissolves into the rhythm of the square.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(33, 'tracing perpetual tally exemption in Unity Square tally tower night log');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.wits||0) + (typeof getEquipmentBonus==='function'?getEquipmentBonus('wits'):0));
      if (result.isCrit) {
        G.flags.tally_tower_night_exemption_found = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The tally tower night log exemption is filed under a Ward administrative code that predates the current tally protocol by six years — which means it was never subject to the renewal requirements the current protocol mandates. It exempts one chartered entity from the nightly transit count during any calendar window when a diplomatic transit exemption is active in the Ward. The charter designation on the exemption matches the unindexed series from Brokerwell's shadow register. Every time a party arrives under diplomatic transit exemption, the counting stop that would record their presence in the tally tower disappears automatically. The exemption is a standing instruction. Nobody has to renew it because the system was designed to accept it permanently.`;
        addJournal('Tally tower night exemption: pre-protocol filing auto-clears counting stops on diplomatic exemption windows — unindexed charter, no renewal required', 'evidence', `unity-tallyexempt-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The night log is a supervisor-access document — the tally tower's public record covers day counts only. Night log access requires a Ward oversight authorization issued by the same administration office that handles the diplomatic exemption renewals. The request form, filled and submitted, reaches the authorization desk and sits there. The person who processes it is the same position that signs the exemption renewals. The form does not come back.`;
        addJournal('Tally tower night log access blocked — authorization desk is same office that signs exemption renewals', 'complication', `unity-tallyexempt-fail-${G.dayCount}`);
        G.recentOutcomeType = 'complication';
      } else {
        G.flags.tally_tower_night_exemption_found = true;
        G.investigationProgress++;
        G.lastResult = `Fera — the tally clerk who keeps her own count — recognizes the exemption code when shown it. "Old filing. It pre-dates the current count protocol." She traces the charter designation. "When this code is active, the night count skips that entry automatically. It was built into the protocol when the protocol was written." She doesn't say the word deliberate. She taps the code twice and looks at the counting board as if the board has already given its answer.`;
        addJournal('Tally tower exemption pre-baked into protocol — unindexed charter automatically skipped in night count', 'intelligence', `unity-tallyexempt-partial-${G.dayCount}`);
        G.recentOutcomeType = 'neutral';
      }
      if (!result.isFumble) G.recentOutcomeType = result.isCrit ? 'success' : 'neutral';
      maybeStageAdvance();
    }
  },

  {
    label: "A street physician's supply order rerouted through a bonding house. Same week the cluster began.",
    plot: 'main',
    skill: 'charm',
    tags: ['NPC', 'Stage2', 'Social'],
    xpReward: 20,
    failResult: function() {
      addNarration('', 'You step out of the bargaining floor into the carrier lane before the question lands. The paved exchange court reflects the early afternoon glare off the counting-house white. A tally tower bell marks the half-hour; a carrier with a sealed crate angles past, and the moment dissolves into the rhythm of the square.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(33, 'tracing street physician supply reroute through Unity Square bonding house');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('charm', (G.skills.charm||0) + (typeof getEquipmentBonus==='function'?getEquipmentBonus('charm'):0));
      if (result.isCrit) {
        G.flags.tinmarch_supply_reroute_confirmed = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Tinmarch keeps his supply orders in a pocket folio he updates after each delivery is received. The rerouted order arrived three days late and short by one component — a binding agent he uses for compound treatments. The bonding house stamp on the replacement delivery slip is from an entity he has not ordered from before or since. He sets the slip on the table between you. The bonding house charter designation is in the unindexed series. His supply was delayed because it moved through the same transit structure as the suppression compounds. The shortage was incidental. The reroute was not.`;
        addJournal('Tinmarch supply rerouted through unindexed bonding house — same charter series as coordination operation, one component short on delivery', 'evidence', `unity-tinmarch2-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Tinmarch hears the connection and closes his folio before the sentence is finished. "My patients are already living with what happened to them. I'm not going to hand their physician's supply records into an open proceeding without knowing where they end up." He is not hostile. He is weighing care against exposure. He'll consider it. Right now that means no.`;
        addJournal('Tinmarch declined supply record access — weighing patient confidentiality, door remains open', 'complication', `unity-tinmarch2-fail-${G.dayCount}`);
        G.recentOutcomeType = 'complication';
      } else {
        G.flags.tinmarch_supply_reroute_confirmed = true;
        G.investigationProgress++;
        G.lastResult = `Tinmarch confirms the reroute. "Came through a bonding house I'd never dealt with. Late, short one component." He shows the delivery slip without producing the full folio. The bonding house stamp is a charter designation he doesn't recognize. "I filed a supply dispute. It was resolved with a credit note and no explanation." He kept the original slip. The credit note is in the folio. He hasn't filed anything else against the bonding house.`;
        addJournal('Tinmarch supply rerouted through unknown bonding house — delivery short, dispute resolved without explanation, original slip retained', 'intelligence', `unity-tinmarch2-partial-${G.dayCount}`);
        G.recentOutcomeType = 'neutral';
      }
      if (!result.isFumble) G.recentOutcomeType = result.isCrit ? 'success' : 'neutral';
      maybeStageAdvance();
    }
  },

  ,

  {
    label: "The notice board has a gap where something was taken down",
    skill: 'wits',
    tags: ['Records', 'Observation', 'Stage2'],
    xpReward: 10,
    failResult: function() {
      addNarration('', 'A vendor row clerk approaches the board with a fresh stack of bulletins before you can examine the gap closely — the new postings cover the unmarked nail-holes in three quick stamps. The vendor row goes back to its hum. You walk on. Whatever was there yesterday is not there today, and now never was.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(7, 'notice board gap');
      G.lastResult = 'The board is full except for one section — four pins still in the wood, a faint rectangle where the paper absorbed less weather. Something was posted there long enough to leave a mark, then pulled. The surrounding notices are dated this week. The gap is older. A clerk from the hall passes without glancing at the board. She knows what was there.';
      addJournal('A section of the Unity Square notice board shows evidence of a recently removed posting — four pins remain, weathering marks intact. Source: Unity Square public board, morning.', 'intelligence', `unity-noticeboard-${G.dayCount}`);
      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  {
    label: "A civic functionary answers a procedural question with the wrong procedure",
    skill: 'wits',
    tags: ['NPC', 'Intelligence', 'Stage2'],
    xpReward: 10,
    failResult: function() {
      addNarration('', 'You step out of the bargaining floor into the carrier lane before the question lands. The paved exchange court reflects the early afternoon glare off the counting-house white. A tally tower bell marks the half-hour; a carrier with a sealed crate angles past, and the moment dissolves into the rhythm of the square.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(7, 'procedural inconsistency');
      G.lastResult = 'He gives you the form. Standard process, he says: three copies, stamp from the hall, submit at the eastern window. He says it the way someone who has said it a thousand times says it — but the eastern window has been handling cargo appeals for two seasons. Administrative submissions moved to the northern annex last year. He either does not know or is directing you somewhere that will not process what you are bringing.';
      addJournal('A Unity Square civic official gave outdated processing instructions — directing to a window that no longer handles that category. Source: Unity Square hall, morning duty officer.', 'intelligence', `unity-procedure-${G.dayCount}`);
      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  {
    label: "Two guild reps, one square, and they are not speaking",
    plot: 'main',
    skill: 'charm',
    tags: ['Social', 'Observation', 'Stage2'],
    xpReward: 10,
    failResult: function() {
      addNarration('', 'You step out of the bargaining floor into the carrier lane before the question lands. The paved exchange court reflects the early afternoon glare off the counting-house white. A tally tower bell marks the half-hour; a carrier with a sealed crate angles past, and the moment dissolves into the rhythm of the square.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(10, 'faction friction observation');
      G.lastResult = 'Both are in the square at the same time. One handles transport contracts, the other arbitration filings — they used to coordinate on disputed shipments. Now one is at the fountain, one at the hall steps, and neither has looked in the other direction. The usual handoff point between their roles is empty. Whatever split them has left a gap in the square administrative rhythm that everyone else is working around.';
      addJournal('Two Unity Square guild representatives who normally coordinate are visibly not speaking. Their usual handoff point was unmanned. Source: Unity Square, afternoon observation.', 'intelligence', `unity-guildreps-${G.dayCount}`);
      G.recentOutcomeType = 'investigate';
      G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
      maybeStageAdvance();
    }
  },

  {
    label: "A street crier's route ends earlier than it used to",
    skill: 'wits',
    tags: ['Rumor', 'Observation', 'Stage2'],
    xpReward: 10,
    failResult: function() {
      addNarration('', 'You step out of the bargaining floor into the carrier lane before the question lands. The paved exchange court reflects the early afternoon glare off the counting-house white. A tally tower bell marks the half-hour; a carrier with a sealed crate angles past, and the moment dissolves into the rhythm of the square.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(7, 'crier route change');
      G.lastResult = 'The morning crier cuts his circuit short at the square northern edge. He used to continue through the registry lane — you can tell by the wear pattern on the cobblestones and the hooks for announcement boards that are now bare. A stall vendor nearby says the crier route changed "a few months back." She does not know why. She does not think it is strange. It is strange.';
      addJournal('The Unity Square morning crier\'s route ends before the registry lane — his circuit was shortened at some point in the past few months. Source: Unity Square, stall vendor near the northern edge.', 'rumor', `unity-crier-${G.dayCount}`);
      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ── ARRIVAL REGISTRY MANIPULATION (6 choices) ────────────────────────────

  {
    label: "Brokerwell's arrival registry has a secondary notation only transit-flagged entries carry.",
    plot: 'main',
    skill: 'wits',
    tags: ['Registry', 'Stage2'],
    xpReward: 20,
    failResult: function() {
      addNarration('', 'You step out of the bargaining floor into the carrier lane before the question lands. The paved exchange court reflects the early afternoon glare off the counting-house white. A tally tower bell marks the half-hour; a carrier with a sealed crate angles past, and the moment dissolves into the rhythm of the square.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(36, 'tracing secondary notations in the arrival registry');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('lore', (G.skills.wits||0));
      if (result.isCrit) {
        G.flags.met_vale_brokerwell = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Brokerwell sets the transit ledger flat on the ink-stained counter, open to the notation column. Seventeen entries in the last quarter carry a two-letter suffix — no corresponding definition in the margin key. He runs a finger along the column without touching the page. The suffix was added by a central registry directive six months ago, issued with no counter-signature. The entries it marks bypass the standard ward mediation step and route directly to a holding classification no follow-up audit ever checks.';
        addJournal('Transit-flag suffix bypasses ward mediation — holding classification added by unsigned central directive, 17 entries last quarter', 'evidence', `uni-broker-transit-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = 'The query touches something Brokerwell was not expecting. He closes the ledger before the page is fully visible, sets it under the counter, and logs the access attempt in a slim notebook he keeps separate from the official record. His pen does not pause. When he looks up, the desk between you is bare and his expression has gone careful. Any further query on transit-flagged entries will now route through a ward supervisor sign-off he cannot issue unilaterally.';
        addJournal('Transit-flag ledger query logged separately — ward supervisor approval now required for further access', 'complication', `uni-broker-transit-fail-${G.dayCount}`);
      } else {
        G.flags.met_vale_brokerwell = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Brokerwell confirms the secondary notation exists and leaves the ledger open just long enough. Seventeen entries in the last quarter. The notation pattern repeats at fixed intervals — not distributed at random across the calendar. He does not elaborate on what the suffix means. He does not need to. Fixed-interval timing on an undocumented notation category is its own kind of answer.';
        addJournal('Secondary notation on 17 transit-flagged entries — fixed interval pattern, meaning undocumented', 'evidence', `uni-broker-transit-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The holding classification that swallows transit arrivals has no expiry column.",
    plot: 'main',
    skill: 'wits',
    tags: ['Registry', 'Stage2'],
    xpReward: 20,
    failResult: function() {
      addNarration('', 'You step out of the bargaining floor into the carrier lane before the question lands. The paved exchange court reflects the early afternoon glare off the counting-house white. A tally tower bell marks the half-hour; a carrier with a sealed crate angles past, and the moment dissolves into the rhythm of the square.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(34, 'auditing the holding classification in the arrival registry');
      if (!G.flags) G.flags = {};
      const result = rollD20('lore', (G.skills.wits||0));
      if (result.isCrit) {
        G.flags.met_vale_brokerwell = true;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The holding classification ledger runs to nine pages. Every row has an arrival date, a party name, a cargo weight notation, and a routing designation. None has a release date. The column header for expiry exists — printed in the original ledger format — but every cell beneath it is blank. Cargo entered the holding classification and was never formally released. It simply stopped appearing in subsequent routing records. Brokerwell stands very still while you read this.';
        addJournal('Holding classification: no entries have expiry dates — cargo routed in, never formally released, 9 pages of entries', 'evidence', `uni-broker-hold-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = 'The holding classification ledger is listed in the index but physically absent from the archive drawer. A tag in the drawer reads "transferred for audit — central records." The transfer date is three days ago. The stamp is from an office that does not appear on the hall directory board. The empty drawer smells of fresh ink and recent handling.';
        addJournal('Holding classification ledger transferred to unidentified central office three days ago', 'complication', `uni-broker-hold-fail-${G.dayCount}`);
      } else {
        G.flags.met_vale_brokerwell = true;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The holding classification column for expiry date is blank across every row Brokerwell will let you see. Four pages, dozens of entries, no release dates recorded. He keeps one hand on the ledger spine. "Standard procedure requires a release notation when a hold is lifted. I have never received one for any entry in that section." He closes the ledger. The stamp sounds of the outer registry fill the silence.';
        addJournal('Holding classification entries never receive release notations — Brokerwell has no record of any hold being lifted', 'evidence', `uni-broker-hold-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Arrivals on the same sealed-charter parties cluster at three-week intervals across six months.",
    plot: 'main',
    skill: 'wits',
    tags: ['Registry', 'Stage2'],
    xpReward: 20,
    failResult: function() {
      addNarration('', 'You step out of the bargaining floor into the carrier lane before the question lands. The paved exchange court reflects the early afternoon glare off the counting-house white. A tally tower bell marks the half-hour; a carrier with a sealed crate angles past, and the moment dissolves into the rhythm of the square.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(37, 'cross-referencing charter party arrival intervals');
      if (!G.flags) G.flags = {};
      const result = rollD20('lore', (G.skills.wits||0));
      if (result.isCrit) {
        G.flags.met_vale_brokerwell = true;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The arrivals fall on a twenty-one-day cycle without exception. Brokerwell pulls three months of ledger pages and lays them side by side on the counter. The pattern is immediate and exact: same charter designation, same weight-class notation, same ward routing code, every three weeks, for six months. No variation for weather, for market closures, for civic festival days. Whatever this movement is, it runs on a schedule maintained from outside Unity Square entirely.';
        addJournal('Sealed-charter arrivals on exact 21-day cycle for 6 months — schedule maintained externally, impervious to local disruption', 'evidence', `uni-broker-cycle-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = 'The registry pages are in order by arrival date, not by charter party. Pulling all entries for a single charter party would require access to the cross-reference index, which is stored in the ward administration annex on a separate request cycle. Brokerwell cannot pull it without a formal records order, which would be logged and reviewed. The pattern is there. The path to it is now slower and more visible.';
        addJournal('Charter party cross-reference requires formal records order — query will be logged and reviewed by ward administration', 'complication', `uni-broker-cycle-fail-${G.dayCount}`);
      } else {
        G.flags.met_vale_brokerwell = true;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Brokerwell does not have time to pull every page, but he marks the dates without being asked. Counting the gaps between marked entries: twenty or twenty-two days each, close enough to a fixed cycle to be deliberate. The weight-class notation repeats across all of them. He straightens the pages back into order and returns them to the archive without comment. The pattern is there for anyone who looks.';
        addJournal('Charter party arrivals at ~21-day intervals, consistent weight-class notation across all entries', 'evidence', `uni-broker-cycle-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The counter-signature line on the central registry directive is blank — no issuing authority recorded.",
    plot: 'main',
    skill: 'wits',
    tags: ['Registry', 'Stage2'],
    xpReward: 20,
    failResult: function() {
      addNarration('', 'You step out of the bargaining floor into the carrier lane before the question lands. The paved exchange court reflects the early afternoon glare off the counting-house white. A tally tower bell marks the half-hour; a carrier with a sealed crate angles past, and the moment dissolves into the rhythm of the square.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(35, 'examining the unsigned central registry directive');
      if (!G.flags) G.flags = {};
      const result = rollD20('lore', (G.skills.wits||0));
      if (result.isCrit) {
        G.flags.met_vale_brokerwell = true;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The directive is printed on the correct administrative stock, sealed with a wax impression that matches the Ward Oversight Committee format. The counter-signature line is blank. So is the issuing office designation. Brokerwell points to the seal without touching it. "I checked against the committee member roster when it arrived. None of them recognized it." He had documented this discrepancy in a personal note filed behind the directive. He kept the note because he did not know what else to do with it.';
        addJournal('Central registry directive: correct seal format but no counter-signature, no issuing office — Oversight Committee members deny authorship', 'evidence', `uni-broker-directive-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = 'Brokerwell cannot produce the original directive. It was filed in the ward administration central archive as required protocol on receipt. Retrieving it would require a records release request cosigned by the ward supervisor — a request that would flag the directive itself for review. The filing protocol that should protect the record is what makes it inaccessible now. He sets his hands flat on the counter. The copy he kept no longer exists.';
        addJournal('Original registry directive filed in ward central archive — retrieval requires cosigned release request, flags the directive for review', 'complication', `uni-broker-directive-fail-${G.dayCount}`);
      } else {
        G.flags.met_vale_brokerwell = true;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Brokerwell keeps a copy in his personal archive, separate from the official filing. The counter-signature line is blank. The directive is dated and sealed, but no issuing office is named. He sets it on the counter and steps back. "I implemented it because the format was correct and the seal matched. I did not have a process for what to do when the authority line was empty." The paper smells of the same cedar-oil ink that all ward correspondence uses.';
        addJournal('Registry directive copy: blank counter-signature and issuing office — Brokerwell implemented it due to correct format and seal', 'evidence', `uni-broker-directive-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Cargo weight notations in the flagged entries match suppression compound volume ranges.",
    plot: 'main',
    skill: 'wits',
    tags: ['Registry', 'Stage2'],
    xpReward: 20,
    failResult: function() {
      addNarration('', 'You step out of the bargaining floor into the carrier lane before the question lands. The paved exchange court reflects the early afternoon glare off the counting-house white. A tally tower bell marks the half-hour; a carrier with a sealed crate angles past, and the moment dissolves into the rhythm of the square.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(39, 'cross-checking cargo weights against suppression compound volumes');
      if (!G.flags) G.flags = {};
      const result = rollD20('lore', (G.skills.wits||0));
      if (result.isCrit) {
        G.flags.met_vale_brokerwell = true;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The weight-class notations in the transit-flagged entries fall in a narrow band: between forty and sixty standard weight units per shipment. Brokerwell does not know what that means. You do. That range is consistent with bulk suppression compound in sealed transit canisters — the volume-to-weight ratio is specific enough that ordinary freight in that class would be listed differently. Seventeen shipments over six months. The total volume implied is not incidental. It is a sustained supply line.';
        addJournal('Transit-flagged cargo weights (40–60 SWU) match suppression compound bulk volume — 17 shipments over 6 months, sustained supply line implied', 'evidence', `uni-broker-weight-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = 'The weight notation column uses a non-standard abbreviation that does not appear in the hall\'s public reference index. Reading it requires the internal coding key, which is stored in the archive supervisor\'s office — closed for the afternoon administrative session. The numbers are visible. What they mean in standard terms is behind a door that will not open until tomorrow.';
        addJournal('Weight notation abbreviations require internal coding key — archive supervisor office closed, access deferred', 'complication', `uni-broker-weight-fail-${G.dayCount}`);
      } else {
        G.flags.met_vale_brokerwell = true;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The weight-class notations are consistent across every transit-flagged entry — forty to sixty units, the same band, every shipment. Brokerwell does not know the significance. The consistency itself is what matters here: no ordinary mixed-freight consignment holds that range so tightly across seventeen separate movements over six months. Someone loaded these to a specification, not to capacity. Brokerwell writes the band notation in his personal carbon without being asked.';
        addJournal('Transit-flagged entries all in 40–60 weight-unit band — loaded to specification, not capacity, across all 17 shipments', 'evidence', `uni-broker-weight-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "A registry gap last quarter aligns exactly with a three-day ward security review.",
    plot: 'main',
    skill: 'wits',
    tags: ['Registry', 'Stage2'],
    xpReward: 20,
    failResult: function() {
      addNarration('', 'You step out of the bargaining floor into the carrier lane before the question lands. The paved exchange court reflects the early afternoon glare off the counting-house white. A tally tower bell marks the half-hour; a carrier with a sealed crate angles past, and the moment dissolves into the rhythm of the square.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(32, 'cross-referencing the registry gap with ward security review dates');
      if (!G.flags) G.flags = {};
      const result = rollD20('lore', (G.skills.wits||0));
      if (result.isCrit) {
        G.flags.met_vale_brokerwell = true;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Three days in the second month of last quarter: no transit-flagged arrivals logged. The ward security review ran those exact days. Brokerwell has both records. The review was a routine compliance check, but its schedule was announced internally fourteen days in advance — long enough for anyone monitoring the hall to plan around it. Every transit-flagged shipment in the six-month record was scheduled away from the review window. Not one overlap.';
        addJournal('Transit arrivals suspended for exact 3-day ward security review — all 17 shipments scheduled to avoid review window, 14-day advance notice exploited', 'evidence', `uni-broker-gap-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = 'The security review records are archived under a separate administrative classification that requires a ward oversight signature to access — Brokerwell cannot produce them without triggering a review of why they\'re being pulled. The gap in the transit ledger is visible. The security review dates that would confirm it are behind a procedural wall. He closes the transit ledger and returns it to the under-counter drawer. The morning queue at the outer window is backing up.';
        addJournal('Ward security review records require oversight signature — gap confirmed in transit ledger but review dates inaccessible', 'complication', `uni-broker-gap-fail-${G.dayCount}`);
      } else {
        G.flags.met_vale_brokerwell = true;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The transit ledger shows a three-day gap in the second month of last quarter. Brokerwell checks the hall schedule calendar: the ward security review occupied those exact days. He marks both dates without comment. Whether the gap is coincidence or planning, the alignment is exact and the security review\'s internal schedule was shared with all hall staff two weeks prior.';
        addJournal('3-day registry gap aligns exactly with ward security review — internal schedule distributed 2 weeks in advance', 'evidence', `uni-broker-gap-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // ── WARD MEDIATION BYPASSES (5 choices) ──────────────────────────────────

  {
    label: "Ledgermere's bypass forms list a third party that doesn't appear in the ward directory.",
    plot: 'main',
    skill: 'wits',
    tags: ['Mediation', 'Stage2'],
    xpReward: 20,
    failResult: function() {
      addNarration('', 'You step out of the bargaining floor into the carrier lane before the question lands. The paved exchange court reflects the early afternoon glare off the counting-house white. A tally tower bell marks the half-hour; a carrier with a sealed crate angles past, and the moment dissolves into the rhythm of the square.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(36, 'tracing the third-party listing on bypass forms');
      if (!G.flags) G.flags = {};
      const result = rollD20('lore', (G.skills.wits||0));
      if (result.isCrit) {
        G.flags.met_vale_ledgermere = true;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Ledgermere\'s mediation bypass forms carry a third-party oversight line that standard ward forms do not include. Every bypass in the last six months names the same entity in that line: "Compact Liaison Review." The name does not appear in the ward directory, the hall\'s institutional index, or the public registry of licensed mediation observers. Ledgermere has the form in his hand and is reading the entry as though seeing it for the first time, which is not possible.';
        addJournal('Mediation bypass forms list "Compact Liaison Review" as third-party oversight — entity not in any ward or hall directory', 'evidence', `uni-ledge-bypass-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = 'Ledgermere accepts the inquiry and writes a formal clarification request to the form-issuing office. The request is procedurally correct and will receive a procedurally correct response in seven to fourteen days. He hands you a receipt for the clarification request. The receipt is stamped and dated. The answer, when it arrives, will almost certainly say nothing useful. He files his copy in the same tray as the bypass forms and returns to his session notes without looking up.';
        addJournal('Bypass form third-party query routed to formal clarification — 7–14 day response window, procedural answer likely', 'complication', `uni-ledge-bypass-fail-${G.dayCount}`);
      } else {
        G.flags.met_vale_ledgermere = true;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Ledgermere locates the bypass form template and sets it on the desk. The third-party oversight line is pre-printed — it was added when the form was last revised. The entity named across all bypass filings in the last six months is consistent and Ledgermere confirms it does not correspond to any ward directory entry he has access to. He writes the name down for his own records while you\'re still at the desk. The form goes back into the template binder without further comment. He straightens the binder spine twice before setting it down.';
        addJournal('Bypass form third-party oversight line pre-printed — named entity consistent across all recent filings, not in any accessible directory', 'evidence', `uni-ledge-bypass-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The mediation bypass approval counter has been moved twice in six months.",
    plot: 'main',
    skill: 'finesse',
    tags: ['Mediation', 'Stage2'],
    xpReward: 20,
    failResult: function() {
      addNarration('', 'You step out of the bargaining floor into the carrier lane before the question lands. The paved exchange court reflects the early afternoon glare off the counting-house white. A tally tower bell marks the half-hour; a carrier with a sealed crate angles past, and the moment dissolves into the rhythm of the square.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(33, 'tracing mediation bypass counter relocations');
      if (!G.flags) G.flags = {};
      const result = rollD20('finesse', (G.skills.finesse||0));
      if (result.isCrit) {
        G.flags.met_vale_ledgermere = true;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The counter has moved from the main hall floor to a side corridor, then to its current position in an annex off the mediation wing — each relocation reducing its visibility from the main entrance by another layer. The floor tiles show the old counter positions: rectangular wear patches where the furniture stood. The annex has no window to the hall and no queue management post. Walk-in access to ward mediation bypass approval now requires knowing it exists and knowing where it moved.';
        addJournal('Mediation bypass counter relocated twice in 6 months — each move reduces visibility, annex location now unknown to general hall traffic', 'evidence', `uni-ledge-counter-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = 'The current bypass approval counter location is posted on the hall directory board — you find it after fifteen minutes of checking rooms. The directory listing was updated last week. If there is a relocation pattern, it has been papered over with procedurally correct signage. Ledgermere\'s administrative assistant is at the current counter and notes the time of your visit in his ledger.';
        addJournal('Bypass counter location on directory board — visit time logged by Ledgermere\'s assistant', 'complication', `uni-ledge-counter-fail-${G.dayCount}`);
      } else {
        G.flags.met_vale_ledgermere = true;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Two floor wear patches mark where the bypass approval counter used to stand — one near the main hall entrance, one in the first corridor. Each position was more visible than the current annex location. Ledgermere, when asked, says the moves were for space management during renovation cycles. The renovation records in the hall\'s maintenance log confirm no renovation work touched the mediation wing.';
        addJournal('Bypass counter moved twice toward less-visible positions — maintenance log shows no renovation work in mediation wing to justify moves', 'evidence', `uni-ledge-counter-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Ward mediation bypass filings spike during the same weeks the transit arrivals cluster.",
    plot: 'main',
    skill: 'wits',
    tags: ['Mediation', 'Registry', 'Stage2'],
    xpReward: 20,
    failResult: function() {
      addNarration('', 'You step out of the bargaining floor into the carrier lane before the question lands. The paved exchange court reflects the early afternoon glare off the counting-house white. A tally tower bell marks the half-hour; a carrier with a sealed crate angles past, and the moment dissolves into the rhythm of the square.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(38, 'correlating bypass filing spikes with transit arrival clusters');
      if (!G.flags) G.flags = {};
      const result = rollD20('lore', (G.skills.wits||0));
      if (result.isCrit) {
        G.flags.met_vale_ledgermere = true;
        G.flags.met_vale_brokerwell = true;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Ledgermere\'s bypass filing calendar and Brokerwell\'s transit arrival log align on every three-week interval without exception. The bypass filings arrive two days before the transit arrivals and close two days after. The pattern covers six months. Transit-flagged cargo clears ward mediation before it arrives — the bypass does not follow the arrival, it precedes it. The mediation step is not being skipped. It is being pre-cleared on a schedule.';
        addJournal('Bypass filings arrive 2 days before transit arrivals, close 2 days after — pre-clearance on 21-day schedule for 6 months, both records confirm', 'evidence', `uni-ledge-broker-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = 'Ledgermere\'s bypass filing calendar is a summary log — it records counts per week, not individual filing dates. Correlating it against the transit arrival dates would require the individual bypass docket numbers, which are maintained in a separate annex filing. The summary is visible. The docket dates are not available without a formal records request to the annex. He sets the calendar back on the shelf without closing it and adjusts the nearest lamp.';
        addJournal('Bypass calendar shows weekly counts only — individual docket dates require annex records request to cross-reference', 'complication', `uni-ledge-broker-fail-${G.dayCount}`);
      } else {
        G.flags.met_vale_ledgermere = true;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The bypass filing calendar shows clustering at intervals that match the transit arrival pattern from the registry. Ledgermere confirms the calendar summary without opening individual dockets. The spike weeks align. Whether the bypass filings are for the same parties as the transit arrivals, he cannot confirm without the docket detail — but the timing correspondence across six months is not accidental. He sets the calendar face-down on the desk and does not pick it back up while you are in the room.';
        addJournal('Bypass filing spikes align with transit arrival weeks across 6 months — individual docket correlation still needed', 'evidence', `uni-ledge-broker-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Bypass filings under a sealed administrative exemption never go to the standard review queue.",
    plot: 'main',
    skill: 'wits',
    tags: ['Mediation', 'Stage2'],
    xpReward: 20,
    failResult: function() {
      addNarration('', 'You step out of the bargaining floor into the carrier lane before the question lands. The paved exchange court reflects the early afternoon glare off the counting-house white. A tally tower bell marks the half-hour; a carrier with a sealed crate angles past, and the moment dissolves into the rhythm of the square.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(35, 'examining sealed administrative exemption bypass routing');
      if (!G.flags) G.flags = {};
      const result = rollD20('lore', (G.skills.wits||0));
      if (result.isCrit) {
        G.flags.met_vale_ledgermere = true;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The sealed administrative exemption designation routes bypass filings directly to a named approver — bypassing the review queue, bypassing the standard two-reviewer panel, bypassing the counter log. The named approver is a ward administrative title, not a person. Ledgermere checks the title\'s current assignment. The position has been vacant for four months. Every bypass filed under the sealed exemption in that period was approved by an empty desk. The approval stamps are real and correctly formatted.';
        addJournal('Sealed exemption bypasses route to a vacant administrative position — approvals stamped correctly for 4 months from an empty desk', 'evidence', `uni-ledge-exemption-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = 'The sealed administrative exemption category is itself under a confidentiality classification that Ledgermere cannot discuss without authorization from the ward oversight committee. The exemption exists. Its routing mechanism is not something he can describe. He logs the query and routes it to the committee with his own notation that the question was asked in good faith by a named visitor.';
        addJournal('Sealed exemption routing classified — query logged and forwarded to ward oversight committee with visitor identification', 'complication', `uni-ledge-exemption-fail-${G.dayCount}`);
      } else {
        G.flags.met_vale_ledgermere = true;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The sealed administrative exemption designation exists as a distinct routing category in the bypass filing system. Ledgermere confirms that filings under this designation do not enter the standard review queue. Where they route instead, he says, is to a named approver position. He looks up the current occupant of that position, closes the staff directory, and does not offer the name.';
        addJournal('Sealed exemption filings bypass standard review queue — routed to a named approver position Ledgermere declined to identify', 'evidence', `uni-ledge-exemption-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The ward boundary markers at the north gate were moved two months ago.",
    plot: 'main',
    skill: 'vigor',
    tags: ['Mediation', 'Observation', 'Stage2'],
    xpReward: 20,
    failResult: function() {
      addNarration('', 'The north-gate boundary stone sits in plain sight under the lantern-arch, the older shadow of its previous bedding still visible in the paving when the light is right. Two ward officers are at the gate post the entire afternoon. You walk the perimeter once and head back into the square without pausing.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(33, 'documenting the north gate ward boundary marker relocation');
      if (!G.flags) G.flags = {};
      const result = rollD20('survival', (G.skills.vigor||0));
      if (result.isCrit) {
        G.flags.met_vale_ledgermere = true;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The north gate markers were moved inward by four meters — visible from the anchor-hole pattern still cut into the cobblestones where the old posts stood. The boundary change reclassified a strip of street frontage from Ward Three to Ward Two jurisdiction. Ward Two operates under a different mediation bypass threshold: carriers with Compact-affiliated documentation can self-certify arrival compliance without a mediator countersignature. Ledgermere administers Ward Two. The boundary move shifted that entire frontage strip into his jurisdiction exactly two months ago.';
        addJournal('North gate markers moved inward 4m two months ago — reclassified frontage to Ward Two, where Compact-affiliated carriers self-certify without mediator countersignature', 'evidence', `uni-ledge-boundary-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = 'The boundary markers look permanent and original. The anchor points in the cobblestones could be old maintenance repairs or fixture replacements — the surface wear around them is consistent with age. Without the official survey record showing the prior position, the relocation is a hypothesis. The survey records are held in the cartographic annex off the main administrative wing. A passage vendor nearby folds his awning without being asked and moves his cart north two meters.';
        addJournal('North gate boundary marker relocation unconfirmed — survey record needed from cartographic annex', 'complication', `uni-ledge-boundary-fail-${G.dayCount}`);
      } else {
        G.flags.met_vale_ledgermere = true;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The old anchor holes are still visible in the cobblestones four meters beyond the current marker positions. The markers were moved inward. A street vendor near the gate says the change happened "before the cold season, maybe two months back." She remembers because the lantern post that used to mark the boundary got moved at the same time and now the alley behind her stall is darker at night. The anchor holes are rough-edged, not weathered — they were cut recently and nobody filled them.';
        addJournal('North gate ward markers moved inward ~2 months ago — old anchor holes visible, vendor confirms timeline', 'evidence', `uni-ledge-boundary-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // ── NPC ENCOUNTERS (6 choices) ────────────────────────────────────────────

  {
    label: "Brokerwell's personal archive copy doesn't match the registry record on file.",
    plot: 'main',
    skill: 'wits',
    tags: ['NPC', 'Registry', 'Stage2'],
    xpReward: 20,
    failResult: function() {
      addNarration('', 'You step out of the bargaining floor into the carrier lane before the question lands. The paved exchange court reflects the early afternoon glare off the counting-house white. A tally tower bell marks the half-hour; a carrier with a sealed crate angles past, and the moment dissolves into the rhythm of the square.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(37, 'comparing Brokerwell\'s personal archive against the official record');
      if (!G.flags) G.flags = {};
      const result = rollD20('lore', (G.skills.wits||0));
      if (result.isCrit) {
        G.flags.met_vale_brokerwell = true;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Brokerwell keeps a personal carbon of every entry he logs — a habit from his first posting, he says, not a protocol requirement. Three entries in the last quarter exist in his personal carbon but not in the official registry. He located the discrepancy himself six weeks ago. He has been waiting, he says, for someone with the right kind of question to come through his window. He passes the carbons across the counter without touching them to your side of the desk.';
        addJournal('Brokerwell personal carbons show 3 entries absent from official registry — discrepancy found 6 weeks ago, Brokerwell waited to disclose', 'evidence', `uni-broker-carbon-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = 'Brokerwell does not keep personal copies — policy since last year forbids it. He is precise about this. The personal archive you were told about belongs to his predecessor, who retired and whose materials were formally transferred to the central record office. The trail is real but it leads to a records office that requires a provenance request to access historical clerk materials.';
        addJournal('Brokerwell has no personal archive — predecessor\'s materials in central records office, provenance request required', 'complication', `uni-broker-carbon-fail-${G.dayCount}`);
      } else {
        G.flags.met_vale_brokerwell = true;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Brokerwell\'s personal carbons show two entries from last quarter that he cannot locate in the official registry. The discrepancy could be a filing error — entries moved to an archived subvolume during the quarterly purge. He marks both in his carbon copy. The official registry in front of him, cross-referenced against the same dates, shows no corresponding entries in any subvolume. They are simply absent.';
        addJournal('Two Brokerwell carbon entries absent from official registry and all subvolumes — not a filing error', 'evidence', `uni-broker-carbon-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Ledgermere's assistant processes bypass forms during hours Ledgermere himself isn't present.",
    plot: 'main',
    skill: 'finesse',
    tags: ['NPC', 'Mediation', 'Stage2'],
    xpReward: 20,
    failResult: function() {
      addNarration('', 'You step out of the bargaining floor into the carrier lane before the question lands. The paved exchange court reflects the early afternoon glare off the counting-house white. A tally tower bell marks the half-hour; a carrier with a sealed crate angles past, and the moment dissolves into the rhythm of the square.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(34, 'documenting bypass processing during Ledgermere\'s absence');
      if (!G.flags) G.flags = {};
      const result = rollD20('finesse', (G.skills.finesse||0));
      if (result.isCrit) {
        G.flags.met_vale_ledgermere = true;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The counter log records processing time for every bypass docket. Cross-referencing against Ledgermere\'s posted session schedule: eleven bypass forms were processed during hours his calendar shows him in closed mediation sessions on the upper floor. His assistant\'s handwriting is on the countersignature line of all eleven. The assistant is not a licensed ward mediator. His countersignature is not legally valid for bypass approval. All eleven were accepted as complete.';
        addJournal('11 bypass forms countersigned by unlicensed assistant during Ledgermere\'s mediation hours — all accepted as legally complete', 'evidence', `uni-ledge-assist-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = 'The counter log shows processing times but not which staff member handled each docket. The initials on the countersignature line are a two-letter administrative code, not a name. Matching initials to individuals would require the staff assignment roster, which the ward administration office holds. The office posts posted hours: closed until the day after tomorrow for an inter-ward coordination session.';
        addJournal('Counter log initials unidentifiable without staff roster — ward administration office closed 2 days', 'complication', `uni-ledge-assist-fail-${G.dayCount}`);
      } else {
        G.flags.met_vale_ledgermere = true;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The assistant is at the bypass counter during the mid-morning window when Ledgermere runs his closed sessions. Several bypass dockets in the counter log show processing timestamps from that window. The assistant\'s handwriting on the countersignature line is identifiable by the particular way he closes the final letter of the ward code — a small loop that appears consistently. Ledgermere\'s signature does not appear on those dockets.';
        addJournal('Bypass dockets countersigned by assistant during Ledgermere\'s closed session hours — identified by distinctive handwriting loop', 'evidence', `uni-ledge-assist-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Tinmarch's patient log goes cold for a week that matches a registry gap.",
    plot: 'main',
    skill: 'charm',
    tags: ['NPC', 'Stage2'],
    xpReward: 20,
    failResult: function() {
      addNarration('', 'You step out of the bargaining floor into the carrier lane before the question lands. The paved exchange court reflects the early afternoon glare off the counting-house white. A tally tower bell marks the half-hour; a carrier with a sealed crate angles past, and the moment dissolves into the rhythm of the square.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(35, 'cross-referencing Tinmarch\'s patient log against the registry gap');
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.charm||0));
      if (result.isCrit) {
        G.flags.met_vale_tinmarch = true;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Tinmarch runs his patient log out of a canvas-covered register he keeps in his coat pocket — entries in a cramped, precise hand. The gap is eight days in the second month of last quarter: no entries, no canceled appointments, no referral notes. He turns to that section without being asked and holds the register open. "I was called for a block consultation. Private arrangement. I was not treating patients from the square that week." He does not say who called him or where he went.';
        addJournal('Tinmarch: 8-day patient log gap second month last quarter — private block consultation, not treating square patients, client and location undisclosed', 'evidence', `uni-tinmarch-gap-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = 'Tinmarch\'s log is personal medical record and he does not open it for general review. He is pleasant about this and professionally specific: his patient records are protected under the ward physician compact and he would require a formal public health order to disclose even aggregate entries. He writes the compact\'s charter article number on a small slip of paper and hands it over. The gap stays closed.';
        addJournal('Tinmarch patient log protected under ward physician compact — formal public health order required for access', 'complication', `uni-tinmarch-gap-fail-${G.dayCount}`);
      } else {
        G.flags.met_vale_tinmarch = true;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Tinmarch confirms a gap in his regular square circuit — a week where he did not post his usual morning hours outside the tenement row. He describes it as an arranged absence without elaborating on the arrangement. His hands are busy wrapping a dressing for a patient while he talks, and he does not look up when he says the week was not a holiday and he was not ill.';
        addJournal('Tinmarch confirms week absence from regular square circuit — arranged, not holiday or illness, no further detail', 'evidence', `uni-tinmarch-gap-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Tinmarch treated three arrivals in the tenement row who were never entered in the registry.",
    plot: 'main',
    skill: 'charm',
    tags: ['NPC', 'Stage2'],
    xpReward: 20,
    failResult: function() {
      addNarration('', 'You step out of the bargaining floor into the carrier lane before the question lands. The paved exchange court reflects the early afternoon glare off the counting-house white. A tally tower bell marks the half-hour; a carrier with a sealed crate angles past, and the moment dissolves into the rhythm of the square.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(38, 'tracing unregistered arrivals through Tinmarch\'s patient records');
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.charm||0));
      if (result.isCrit) {
        G.flags.met_vale_tinmarch = true;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Three patients in the tenement row, all in the same month, all presenting with transit fatigue and minor abrasion consistent with extended sealed-compartment travel. None of them appeared in the arrival registry when Tinmarch checked — he checked because the presentation was unusual enough that he wanted to verify their status. All three gave him the same transit authorization number. He wrote it down. He shows you the notation in the margin of his case record. The number is not a ward transit format.';
        addJournal('Tinmarch: 3 unregistered tenement arrivals, sealed-compartment transit presentation, all gave identical non-ward transit auth number — number recorded', 'evidence', `uni-tinmarch-arrivals-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = 'Tinmarch treats patients without documentation verification as policy — his practice charter explicitly covers unregistered individuals as a public health measure. He cannot confirm or deny whether specific patients appeared in the arrival registry because he does not cross-reference that system. The tenement row is his territory. What the registry says about who lives there is not his concern and he will not speculate.';
        addJournal('Tinmarch: no cross-referencing with arrival registry by practice policy — unable to confirm unregistered status of patients', 'complication', `uni-tinmarch-arrivals-fail-${G.dayCount}`);
      } else {
        G.flags.met_vale_tinmarch = true;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Tinmarch recalls a cluster of patients in the tenement row last quarter with a distinctive presentation — transit fatigue, minor cuts from confined travel, unusual pallor. He does not remember checking the registry against them. Three patients, same month, same general profile. He notes this in the margin of his case record while you\'re speaking, in his small precise hand, as though he has only now thought to write it down.';
        addJournal('Tinmarch: 3 tenement patients last quarter with sealed-transit presentation — registry status not verified at time of treatment', 'evidence', `uni-tinmarch-arrivals-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Brokerwell has been logging private notes in the margins of the transit-flagged pages.",
    plot: 'main',
    skill: 'wits',
    tags: ['NPC', 'Registry', 'Stage2'],
    xpReward: 20,
    failResult: function() {
      addNarration('', 'You step out of the bargaining floor into the carrier lane before the question lands. The paved exchange court reflects the early afternoon glare off the counting-house white. A tally tower bell marks the half-hour; a carrier with a sealed crate angles past, and the moment dissolves into the rhythm of the square.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(36, 'reading Brokerwell\'s margin notes in the transit ledger');
      if (!G.flags) G.flags = {};
      const result = rollD20('lore', (G.skills.wits||0));
      if (result.isCrit) {
        G.flags.met_vale_brokerwell = true;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The margin notes are in pencil, faint, and run to two or three words per entry — arrival descriptions Brokerwell wrote for himself, not for any official record. "Sealed canisters, no external markings." "Two handlers, no ward badges." "Delivery window: pre-dawn." "Same handlers as third-month entry." He wrote them because, he says, the arrivals seemed like the kind of thing someone should write down. He did not know where else to put them. They are a shadow log of exactly what the official entries omit.';
        addJournal('Brokerwell margin notes: shadow log of transit arrivals — sealed canisters, unidentified handlers, pre-dawn delivery windows, repeat handler appearances', 'evidence', `uni-broker-margins-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = 'The transit-flagged ledger pages are clean — no margin annotations. Brokerwell confirms he does not add unofficial notations to official record books; doing so would constitute an administrative violation. If there are margin notes somewhere, they are in a document he has not shown you and is not going to show you in this setting, while the outer registry is staffed and the door to the hall is open.';
        addJournal('No margin notes in transit ledger visible — Brokerwell unwilling to share unofficial notations with hall staff present', 'complication', `uni-broker-margins-fail-${G.dayCount}`);
      } else {
        G.flags.met_vale_brokerwell = true;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Brokerwell turns the ledger to show the margin column. The notes are in pencil, partially erased and rewritten — he has edited them over time. Observation fragments: a handling method, a delivery hour, a note about the absence of ward documentation on the carriers. He started writing them, he says, when the entries began repeating in a way that did not fit the listed cargo class.';
        addJournal('Brokerwell margin notes confirm irregular handling — delivery hours, carrier documentation gaps, repeating pattern prompted note-keeping', 'evidence', `uni-broker-margins-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Tinmarch knows who in the tenement row receives packages before the registry opens each morning.",
    plot: 'main',
    skill: 'charm',
    tags: ['NPC', 'Stage2'],
    xpReward: 20,
    failResult: function() {
      addNarration('', 'You step out of the bargaining floor into the carrier lane before the question lands. The paved exchange court reflects the early afternoon glare off the counting-house white. A tally tower bell marks the half-hour; a carrier with a sealed crate angles past, and the moment dissolves into the rhythm of the square.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(34, 'learning from Tinmarch about pre-registry tenement deliveries');
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.charm||0));
      if (result.isCrit) {
        G.flags.met_vale_tinmarch = true;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Tinmarch starts his rounds before the registry opens — a habit from his first posting in a district without regular morning hours. He names three tenement units that receive sealed packages in the pre-dawn window, always by the same two-person delivery team, always without a receipt exchange. Unit seven, unit twelve, unit twenty-three. He knows because the delivery team woke a patient of his once by knocking on the wrong door. He has seen them six times in the last quarter.';
        addJournal('Tinmarch: pre-dawn deliveries to tenement units 7, 12, 23 — same 2-person team, no receipt exchange, seen 6 times last quarter, team woke a patient once', 'evidence', `uni-tinmarch-delivery-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = 'Tinmarch is careful. He will describe what he has observed in clinical terms: movement of materials in the early morning, residents who receive goods outside standard delivery windows. He will not name units or individuals. "My patients trust that I do not comment on their private arrangements." The observation is offered. The specifics stay behind his professional caution. He tucks the folio under his arm and checks the time on the hall clock above the door.';
        addJournal('Tinmarch confirms pre-dawn deliveries in general — will not identify units or residents, patient confidentiality invoked', 'complication', `uni-tinmarch-delivery-fail-${G.dayCount}`);
      } else {
        G.flags.met_vale_tinmarch = true;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Tinmarch has seen the delivery team on his early rounds. He describes them: two individuals, one carrying, one watching the street. The packages are sealed and cylindrical — consistent with canister transport. He does not know which unit they are delivering to because he did not follow them, but the deliveries happen in the northern end of the tenement row, where the ground-floor units have exterior-facing access hatches. The carrier keeps the cylinders upright, both arms. He noticed that specifically.';
        addJournal('Tinmarch: pre-dawn delivery team — sealed cylindrical packages, northern tenement row, exterior access hatches, 2-person team (one carrier, one lookout)', 'evidence', `uni-tinmarch-delivery-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // ── CROSS-DISTRICT CARGO MOVEMENT THREADS (3 choices) ────────────────────

  {
    label: "The cargo routing codes in the transit ledger match outbound manifests at the Guildheart Hub.",
    plot: 'main',
    skill: 'wits',
    tags: ['Cargo', 'Stage2'],
    xpReward: 20,
    failResult: function() {
      addNarration('', 'You step out of the bargaining floor into the carrier lane before the question lands. The paved exchange court reflects the early afternoon glare off the counting-house white. A tally tower bell marks the half-hour; a carrier with a sealed crate angles past, and the moment dissolves into the rhythm of the square.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(39, 'matching transit routing codes to Guildheart Hub outbound manifests');
      if (!G.flags) G.flags = {};
      const result = rollD20('lore', (G.skills.wits||0));
      if (result.isCrit) {
        G.flags.met_vale_brokerwell = true;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The routing codes in the transit-flagged entries are a three-digit prefix followed by a ward designation. The same prefix appears on Guildheart Hub outbound manifests under a "specialized consignment" category — Brokerwell found this in a cross-district routing summary that crosses his desk monthly. The consignments listed under that prefix at the Hub do not have corresponding inbound entries at Unity Square. The cargo arrives here and does not appear in the outbound record. It stops.';
        addJournal('Transit routing codes match Guildheart Hub "specialized consignment" prefix — cargo arrives at Unity Square with no corresponding outbound record, movement terminates here', 'evidence', `uni-cargo-hub-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = 'The routing code format used in the transit ledger is a local Unity Square designation — it does not correspond to the inter-district routing standard used by Guildheart Hub manifests. Cross-referencing them requires a translation key held by the regional freight coordination office, which is not in the square. The codes are not directly comparable without that key. The transit ledger stays open on the counter. Brokerwell does not close it. He waits.';
        addJournal('Routing code translation key required for Guildheart Hub cross-reference — held at regional freight coordination office, not locally available', 'complication', `uni-cargo-hub-fail-${G.dayCount}`);
      } else {
        G.flags.met_vale_brokerwell = true;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Brokerwell\'s monthly cross-district routing summary lists outbound manifests from Guildheart Hub with a prefix that appears in several transit-flagged entries. The categories do not match perfectly — one uses "specialized consignment," the other uses the holding classification designation — but the prefix is identical. He marks both entries side by side without drawing a conclusion aloud. The summary sheet goes back under the main ledger. He does not put it in the archive drawer.';
        addJournal('Routing code prefix appears in both transit ledger and Guildheart Hub outbound manifests — category labels differ, prefix identical', 'evidence', `uni-cargo-hub-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "A cargo handoff point in the eastern alley operates outside ward oversight hours.",
    plot: 'main',
    skill: 'finesse',
    tags: ['Cargo', 'Observation', 'Stage2'],
    xpReward: 20,
    failResult: function() {
      addNarration('', 'The eastern alley has been swept and re-cobbled this morning — too clean to hold the print of any handoff. A carrier in unmarked greys clocks you at the alley mouth and turns to a side door before you can read his guild ribbon. You walk past the inspection shed in the other direction.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(37, 'documenting the eastern alley cargo handoff outside oversight hours');
      if (!G.flags) G.flags = {};
      const result = rollD20('finesse', (G.skills.finesse||0));
      if (result.isCrit) {
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The eastern alley has a recessed loading bay that was reclassified as a storage annex in last year\'s ward survey — meaning it no longer appears on the active commercial inspection circuit. Between the fourth and sixth hour of the morning, a two-cart operation runs through the bay: sealed canisters transferred from one cart to another with practiced efficiency. No ward documentation changes hands. The lantern on the bay post is unlit. The team works by the ambient light from the square\'s main corridor, twenty meters away.';
        addJournal('Eastern alley loading bay: reclassified as storage annex, removed from inspection circuit — 2-cart canister transfer runs 4th–6th morning hour, no documentation, unlit', 'evidence', `uni-cargo-alley-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = 'The eastern alley is active before the square opens — foot traffic, delivery carts, stall setup. Whatever cargo movement runs through there is not distinct from the normal pre-opening commercial activity at this hour. There is nothing to isolate. One of the cart drivers looks at you for a moment longer than necessary. The alley empties before you have anything concrete.';
        addJournal('Eastern alley pre-dawn cargo movement indistinguishable from routine commercial activity — observation inconclusive, possible counter-surveillance', 'complication', `uni-cargo-alley-fail-${G.dayCount}`);
      } else {
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The loading bay in the eastern alley shows signs of regular use: scuff marks on the ramp surface, canister ring impressions on the stone floor, a worn groove where a cart wheel has run the same path many times. The bay\'s classification placard reads "storage annex — no active commercial use." The placard and the floor tell different stories. The groove runs to a recessed door at the back wall. The door lock is clean and recently oiled.';
        addJournal('Eastern alley loading bay shows active use despite "no commercial use" classification — canister ring marks, cart wheel groove, ramp scuffing', 'evidence', `uni-cargo-alley-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The cross-district freight has a staging point that isn't on any map.",
    plot: 'main',
    skill: 'vigor',
    tags: ['Cargo', 'Stage2'],
    xpReward: 20,
    failResult: function() {
      addNarration('', 'You step out of the bargaining floor into the carrier lane before the question lands. The paved exchange court reflects the early afternoon glare off the counting-house white. A tally tower bell marks the half-hour; a carrier with a sealed crate angles past, and the moment dissolves into the rhythm of the square.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(41, 'locating the unmapped staging point for cross-district freight');
      if (!G.flags) G.flags = {};
      const result = rollD20('survival', (G.skills.vigor||0));
      if (result.isCrit) {
        G.flags.met_vale_brokerwell = true;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The staging point is a sub-level storage room accessed through the tenement row\'s laundry court — a stair that descends behind the wash-line posts and opens into a vaulted room that does not appear in the hall\'s building registry. The room is dry, ventilated, and currently empty. The floor shows long-term use: canister stacking marks in a regular grid, cargo strap anchor points bolted into the stone, a hand-pump for pressure-checking sealed containers. Built for this. Not improvised.';
        addJournal('Unmapped sub-level staging room under tenement laundry court — canister grid marks, strap anchors, pressure-check pump; purpose-built, not in building registry', 'evidence', `uni-cargo-staging-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = 'The tenement row sub-levels are a maintenance access system that requires a building authority key to enter legally. The access point you find is locked with a standard ward padlock. Forcing it would leave marks. Going through the building authority for a key would generate a request record. The staging point, if it exists, is currently behind a door you cannot open without creating a trail that arrives before you do.';
        addJournal('Sub-level access requires building authority key — entry without key leaves evidence, official request generates advance record', 'complication', `uni-cargo-staging-fail-${G.dayCount}`);
      } else {
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The laundry court behind the northern tenement block has a stair that descends below street level — no sign, no lock currently on the door at the bottom. The room beyond is empty. The floor is swept clean but not recently enough: canister ring marks in the dust, a grid pattern that suggests regular, organized stacking. The room is not on any hall map or building registry. It has been used within the last two weeks.';
        addJournal('Unmapped sub-level room accessed via tenement laundry court — canister ring marks, regular stacking pattern, used within 2 weeks, not in building registry', 'evidence', `uni-cargo-staging-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

];

window.UNITY_SQUARE_STAGE2_ENRICHED_CHOICES = UNITY_SQUARE_STAGE2_ENRICHED_CHOICES;
