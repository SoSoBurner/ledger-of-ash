/**
 * UNITY SQUARE STAGE 2 ENRICHED CHOICES
 * Investigation arc: arrival registry manipulation / ward mediation bypasses
 * NPCs: Vale Brokerwell (Clerk of Arrivals), Vale Ledgermere (Ward Mediator), Vale Tinmarch (Street Physician)
 */

const UNITY_SQUARE_STAGE2_ENRICHED_CHOICES = [

  {
    label: "Diplomatic transit arrivals not logged in the main registry. Only in a shadow sub-register.",
    tags: ['Investigation', 'Stage2', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'exposing arrival registry shadow sub-register with Vale Brokerwell');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
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
    tags: ['NPC', 'Persuasion', 'Stage2', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'cross-referencing mediation participants with Vale Ledgermere');
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
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
    tags: ['NPC', 'Survival', 'Stage2', 'Meaningful'],
    xpReward: 66,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'reviewing suppression exposure symptoms with street physician Vale Tinmarch');


      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('vigor', (G.skills.survival||0) + Math.floor(G.level/3));
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
    label: "A second shadow ledger he didn't build. The handwriting isn't his. Someone else inside the registry.",
    tags: ['Stage2', 'NPC'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'second shadow ledger discovered via Vale Brokerwell escalation');

      if (!G.worldClocks) G.worldClocks = {};

      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
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
    label: "An unlogged arrival with a consignment weight matching no known cargo class. The staging point is traceable.",
    tags: ['Stage2', 'Registry'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'tracing unlogged consignment weight back through loading lane manifests');

      if (!G.worldClocks) G.worldClocks = {};

      const result = rollD20('finesse', (G.skills.stealth||0) + Math.floor(G.level/3));
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
    label: "The mediation spills into the open court. One party assumes I'm here to document proceedings against them.",
    tags: ['Stage2', 'Social'],
    xpReward: 66,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'navigating mistaken-identity friction in ward mediation session');

      if (!G.worldClocks) G.worldClocks = {};

      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
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
    tags: ['Stage2', 'Lore'],
    xpReward: 65,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(65, 'cross-referencing tally tower clerk observations with shadow register entries');
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_tally_clerk_fera = true;
        G.investigationProgress++;
        G.stageProgress[2]++;
        G.lastResult = `The clerk — her name is Fera, and she uses her thumbnail to mark the door frame when she starts a shift — pulls a folded slip from inside her left cuff. Seventeen tallies in her own notation, spread across four months: the same three sealed-charter marks appearing together, always within a ninety-minute window of each other, always entering the exchange court from the northern laneway. "Nobody else counted them," she says, and presses the slip flat on the ledge between you.`;
        addJournal('Tally clerk Fera: sealed-charter parties arrive together on 90-minute window, northern laneway entry', 'evidence', `unity-fera-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Fera hears the question and her thumbnail stops moving. She looks past you toward the arbitration runner stationed at the court entrance, then back at the tally board. "I count what's on the board." She turns the board face-down and begins erasing today's chalk lines from the frame. The slip, if she has one, stays in her cuff.`;
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
    tags: ['Stage2', 'Lore'],
    xpReward: 65,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(65, 'observing the unindexed counting house during off-hours');
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.counting_house_interior_seen = true;
        G.investigationProgress++;
        G.stageProgress[2]++;
        G.lastResult = `A ground-floor shutter sits unlatched from the inside. Through the gap: two desks, both occupied, both ledgers open to columns that run in a hand you recognize from the second shadow register — the older one, the one predating Brokerwell. The ledger at the near desk is open to a transit log page. The charter series running down the left margin is the unindexed one. The counting house isn't ancillary to the coordination. It is where the records are reconciled.`;
        addJournal('Counting house confirmed as reconciliation point — older shadow register hand active, unindexed charter series visible', 'evidence', `unity-countinghouse-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `A second-floor window opens while you are positioned below. A figure leans out, looks directly at the laneway below, and holds there for twelve seconds. You do not move. The shutter on the ground floor closes from the inside before the figure withdraws. The counting house light goes out. The building is now dark and aware.`;
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
    tags: ['Stage2', 'Social'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'extracting route and timing intelligence from the arbitration runner');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
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
    tags: ['Stage2', 'Lore'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'tracing unindexed charter series absence in Ward tax records');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
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
    tags: ['Stage2', 'Social'],
    xpReward: 67,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(67, 'interviewing consenting patient about symptom timeline');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('vigor', (G.skills.survival||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.patient_symptom_timeline_confirmed = true;
        G.investigationProgress++;
        G.lastResult = `She sits near the window with both hands around a clay cup that has been empty for a while. Her name is Senna — she offers it before you ask. The bad days, she says, were always the day after a certain kind of night: the kind where the air near the alley exchange smelled faintly chemical, like a lamp wick burnt all the way down. She has written the dates in the back of a household ledger because she is precise by habit. Twelve dates. Tinmarch's symptom peaks match ten of them exactly. The other two fall within a day on either side. She slides the ledger across the table and leaves her hand on it a moment before letting go.`;
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
    tags: ['Stage2', 'Lore'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'tracing diplomatic exemption renewal signatures to institutional enabler');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
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
    tags: ['Stage2', 'Stealth'],
    xpReward: 67,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(67, 'examining gatekeeper post logs for deliberate scheduling gaps');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('finesse', (G.skills.stealth||0) + Math.floor(G.level/3));
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
    label: "The coordination hub is confirmed. Expose the shadow register or use it to intercept the final meeting.",
    tags: ['Investigation', 'Finale', 'Stage2', 'Consequence', 'Meaningful'],
    xpReward: 102,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(102, 'Unity Square Stage 2 resolution');
      if (!G.investigationProgress || G.investigationProgress < 8) {
        G.lastResult = `The shadow register, the mediation cross-identification, the exposure cluster — not all three threads are in hand yet. Presenting a partial picture to Ward Administration oversight produces a partial response: an inquiry logged, a committee convened, nothing decided. The arbitration process is deliberate by design. More evidence is needed before the committee has grounds to act, and the parties who know how to read an incomplete submission will use the gap.`;
        G.recentOutcomeType = 'investigate'; return;
      }
      if (!G.worldClocks) G.worldClocks = {};

      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/2));
      if (result.total >= 14 || result.isCrit) {
        G.flags.stage2_finale_institutional = true;
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 3;
        G.lastResult = `The Ward Administration oversight committee meets in the formal chamber above the main square — the one with the original builders' inscription still intact on the lintel. Brokerwell's shadow sub-register sits on the table. The mediation record release lies beside it, with the compound consignment payment dispute named explicitly. Tinmarch's patient map rounds the presentation. The committee votes to suspend the diplomatic exemption protocol before adjourning. A formal complaint routes to Roadwarden Central Command in Shelkopolis that afternoon, with the full evidence set attached. Stage III opens with the committee's authorization.`;
        addJournal('Unity Square S2 finale: Ward oversight committee suspends exemptions, Roadwarden complaint filed', 'evidence', `unity-finale-inst-${G.dayCount}`);
      } else {
        G.flags.stage2_finale_underworld = true;
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 3;
        G.lastResult = `The shadow register's entry pattern gives you a date. You're in position at the arrival address before the first party shows. Four parties across ninety minutes, arriving in separate windows, departing the same way. You record each one: physical description, charter mark visible on the case each carries, time of arrival and departure. By the following morning, those descriptions are in the hands of every allied contact across the relevant localities. The next meeting window comes and goes with nobody arriving. The hub goes dark.`;
        addJournal('Unity Square S2 finale: coordination meeting observed, participants identified and distributed', 'evidence', `unity-finale-uw-${G.dayCount}`);
      }
      G.flags.stage2_faction_contact_made = true;
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "One awning dispute covers the same plot from three different filing angles. That doesn't happen.",
    tags: ['Investigation', 'Stage2', 'Archive'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'tracing overlapping awning territory dispute filings in Unity Square registry');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3) + (typeof getEquipmentBonus==='function'?getEquipmentBonus('wits'):0));
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
    tags: ['Archive', 'Stage2', 'Lore'],
    xpReward: 66,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'tracing perpetual tally exemption in Unity Square tally tower night log');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3) + (typeof getEquipmentBonus==='function'?getEquipmentBonus('wits'):0));
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
    label: "A street physician's supply order rerouted through a bonding house the same week the exposure cluster began.",
    tags: ['NPC', 'Stage2', 'Social'],
    xpReward: 67,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(67, 'tracing street physician supply reroute through Unity Square bonding house');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3) + (typeof getEquipmentBonus==='function'?getEquipmentBonus('charm'):0));
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
    tags: ['Records', 'Observation', 'Stage2'],
    xpReward: 15,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(15, 'notice board gap');
      G.lastResult = 'The board is full except for one section — four pins still in the wood, a faint rectangle where the paper absorbed less weather. Something was posted there long enough to leave a mark, then pulled. The surrounding notices are dated this week. The gap is older. A clerk from the hall passes without glancing at the board. She knows what was there.';
      addJournal('A section of the Unity Square notice board shows evidence of a recently removed posting — four pins remain, weathering marks intact. Source: Unity Square public board, morning.', 'intelligence', `unity-noticeboard-${G.dayCount}`);
      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  {
    label: "A civic official answers a procedural question with the wrong procedure",
    tags: ['NPC', 'Intelligence', 'Stage2'],
    xpReward: 15,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(15, 'procedural inconsistency');
      G.lastResult = 'He gives you the form. Standard process, he says: three copies, stamp from the hall, submit at the eastern window. He says it the way someone who has said it a thousand times says it — but the eastern window has been handling cargo appeals for two seasons. Administrative submissions moved to the northern annex last year. He either does not know or is directing you somewhere that will not process what you are bringing.';
      addJournal('A Unity Square civic official gave outdated processing instructions — directing to a window that no longer handles that category. Source: Unity Square hall, morning duty officer.', 'intelligence', `unity-procedure-${G.dayCount}`);
      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  {
    label: "Two guild reps, one square, and they are not speaking",
    tags: ['Social', 'Observation', 'Stage2'],
    xpReward: 20,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(20, 'faction friction observation');
      G.lastResult = 'Both are in the square at the same time. One handles transport contracts, the other arbitration filings — they used to coordinate on disputed shipments. Now one is at the fountain, one at the hall steps, and neither has looked in the other direction. The usual handoff point between their roles is empty. Whatever split them has left a gap in the square administrative rhythm that everyone else is working around.';
      addJournal('Two Unity Square guild representatives who normally coordinate are visibly not speaking. Their usual handoff point was unmanned. Source: Unity Square, afternoon observation.', 'intelligence', `unity-guildreps-${G.dayCount}`);
      G.recentOutcomeType = 'investigate';
      G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
      maybeStageAdvance();
    }
  },

  {
    label: "A street crier's route ends earlier than it used to",
    tags: ['Rumor', 'Observation', 'Stage2'],
    xpReward: 15,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(15, 'crier route change');
      G.lastResult = 'The morning crier cuts his circuit short at the square northern edge. He used to continue through the registry lane — you can tell by the wear pattern on the cobblestones and the hooks for announcement boards that are now bare. A stall vendor nearby says the crier route changed "a few months back." She does not know why. She does not think it is strange. It is strange.';
      addJournal('The Unity Square morning crier\'s route ends before the registry lane — his circuit was shortened at some point in the past few months. Source: Unity Square, stall vendor near the northern edge.', 'rumor', `unity-crier-${G.dayCount}`);
      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

];

window.UNITY_SQUARE_STAGE2_ENRICHED_CHOICES = UNITY_SQUARE_STAGE2_ENRICHED_CHOICES;
