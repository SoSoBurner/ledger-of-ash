/**
 * UNITY SQUARE STAGE 2 ENRICHED CHOICES
 * Investigation arc: arrival registry manipulation / ward mediation bypasses
 * NPCs: Vale Brokerwell (Clerk of Arrivals), Vale Ledgermere (Ward Mediator), Vale Tinmarch (Street Physician)
 */

const UNITY_SQUARE_STAGE2_ENRICHED_CHOICES = [

  {
    label: "Vale Brokerwell's Arrival Registry has a systematic gap — parties arriving under diplomatic transit exemption are not logged in the main registry, only in a shadow sub-register.",
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
    label: "Vale Ledgermere has mediated disputes between parties that have now appeared in the same network — the mediation records cross-identify operation participants.",
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
    label: "Vale Tinmarch has treated patients presenting with symptoms consistent with low-level suppression compound exposure — they are Unity Square residents who live near the coordination meeting points.",
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
    label: "Vale Brokerwell pulls you aside near the tally towers — he has found a second shadow ledger he didn't build, and the handwriting isn't his. Someone else inside the registry has been logging the same parties.",
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
    label: "One of the unlogged diplomatic arrivals lists a consignment weight that matches no known cargo class — tracing the transit route back through the loading lane manifests may locate where it was staged.",
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
    label: "A ward mediation session spills into the open exchange court — one of the disputing parties recognizes you and assumes you are an arbitration runner sent to document the proceedings against them.",
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
    label: "Stage 2 Unity Square finale — the coordination hub is confirmed. Expose the shadow register publicly or use it to map and intercept the final operation meeting.",
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

];

window.UNITY_SQUARE_STAGE2_ENRICHED_CHOICES = UNITY_SQUARE_STAGE2_ENRICHED_CHOICES;
