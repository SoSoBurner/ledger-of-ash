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
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_vale_brokerwell = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `The shadow sub-register runs to forty-three entries over six months. Brokerwell built it in a separate ledger, kept in the drawer under his main archive binder. Three patterns stand out across the entries: the same sealed charter parties appearing on overlapping dates, cargo weight notations consistent with suppression compound volumes, and a routing sequence that touches every major hub that has appeared elsewhere in this thread. Unity Square isn't a peripheral stop. The parties from every node meet here on a cycle.`;
        addJournal('investigation', 'Unity Square shadow register: operation coordination hub confirmed — all node parties meet here', `unity-brokerwell-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `The filing system has a secondary register under a classified administrative designation — visible only if you know to look for a second binder behind the first. The access attempt triggers a log entry that routes automatically to the Ward Administration oversight committee. You're two steps back from the desk when the clerk at the outer door straightens and reaches for the internal correspondence tube. The access has been flagged. The sub-register stays closed.`;
        addJournal('complication', 'Shadow register access flagged — Ward Administration oversight committee notified', `unity-brokerwell-fail-${G.dayCount}`);
      } else {
        G.flags.met_vale_brokerwell = true;
        G.investigationProgress++;
        G.lastResult = `Brokerwell opens the lower drawer and lifts the main binder out to reach the one behind it. "Diplomatic exemption arrivals stop appearing in the main registry at a certain authorization level." He sets the second ledger on the desk. "I started a separate record. If I'm not going to log them officially, I'm going to log them somewhere." He pushes it toward you. "That felt like the minimum I could do."  The entries are in his hand, dated and consistent.`;
        addJournal('investigation', 'Unity Square shadow register confirms unlogged diplomatic arrivals', `unity-brokerwell-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Vale Ledgermere has mediated disputes between parties that have now appeared in the investigation — the mediation records cross-identify operation participants.",
    tags: ['NPC', 'Persuasion', 'Stage2', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'cross-referencing mediation participants with Vale Ledgermere');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('persuasion', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_vale_ledgermere = true;
        G.investigationProgress++;
        G.lastResult = `Ledgermere works from a mediation room off the main hall with no windows and a door that closes flush to the frame. "Confidentiality is absolute during the session and after. Both parties must release." He checks his files. Three months ago, one party from a closed mediation filed a subsequent legal proceeding and released the mediation record as exhibit documentation. That party's consent carries. The record names the other: a Soreheim Iron Compact freight agent and a Guildheart Hub broker, disputing a payment default on a "specialized compound consignment." The nature of the consignment is in the record. Both parties are named.`;
        addJournal('investigation', 'Mediation record confirms Soreheim Iron Compact agent and Guildheart broker in compound payment dispute', `unity-ledgermere-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Ledgermere folds his hands on the desk. "Both parties in writing, before I open any file. That's not policy I can set aside." He logs the request in his intake register while you're still at the desk. Your name, the date, the nature of the inquiry — all of it now part of the mediation request record, which both parties will be notified of. The records stay sealed. Your inquiry does not.`;
        addJournal('complication', 'Ward mediation confidentiality — both party consent required, request documented', `unity-ledgermere-fail-${G.dayCount}`);
      } else {
        G.flags.met_vale_ledgermere = true;
        G.investigationProgress++;
        G.lastResult = `Ledgermere reviews his session calendar without opening any individual file. "Six months — I can confirm mediation sessions took place between parties from different institutional contexts. That much is in the scheduling record, not the session record." He closes the calendar. "The nature of those disputes I'd describe as specialized commercial — unusual for this square's typical case load." He won't go further. The phrasing is careful and deliberate.`;
        addJournal('investigation', 'Unusual specialized commercial mediations confirmed — parties from multiple institutions', `unity-ledgermere-partial-${G.dayCount}`);
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
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('survival', (G.skills.survival||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_vale_tinmarch = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `Tinmarch keeps his patient notes in a ledger he updates after every house call. He opens to a flagged section: twelve patients, four-month window, all presenting with the same cluster — cognitive fog, mild respiratory distress, reduced sensitivity to ambient magic. He's drawn a map of their home addresses in the margin. All twelve sit within two blocks of the same intersection. That intersection is the arrival address that appears most frequently in the shadow sub-register. The meetings are leaving a residue in the surrounding population.`;
        addJournal('investigation', 'Unity Square population cluster exposure confirmed — contamination from coordination meeting point', `unity-tinmarch-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Tinmarch keeps the ledger closed on the desk between you. "Patient records require patient consent before I share symptom data with a third party. That's not a rule I adjust." He does say this: "If you're asking whether I've noted unusual presentations in the blocks near the transit coordination points — I'm not in a position to confirm or deny based on specific records." He picks up his pen and returns to his notes. He didn't say no.`;
        addJournal('complication', 'Medical privacy protocol — patient symptom cluster requires consent', `unity-tinmarch-fail-${G.dayCount}`);
      } else {
        G.flags.met_vale_tinmarch = true;
        G.investigationProgress++;
        G.lastResult = `Tinmarch opens the ledger to the map page without showing you the patient names. "Cognitive fog, respiratory irritation, reduced ambient sensitivity — in a geographic cluster, that's not variance. That's exposure to something local and persistent." He points to the intersection marked in the margin. "That's the center of the cluster." He closes the ledger. He doesn't know what the source is. The address matches the shadow register's most frequent arrival entry.`;
        addJournal('investigation', 'Geographic symptom cluster at arrival registry address — exposure source likely', `unity-tinmarch-partial-${G.dayCount}`);
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
        G.lastResult = `The shadow register, the mediation cross-identification, the exposure cluster — not all three are in hand yet. Presenting a partial picture to Ward Administration oversight produces a partial response. The evidence isn't complete enough to move.`;
        G.recentOutcomeType = 'investigate'; return;
      }
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('persuasion', (G.skills.persuasion||0) + Math.floor(G.level/2));
      if (result.total >= 14 || result.isCrit) {
        G.flags.stage2_finale_institutional = true;
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 3;
        G.lastResult = `The Ward Administration oversight committee meets in the formal chamber above the main square — the one with the original builders' inscription still intact on the lintel. Brokerwell's shadow sub-register sits on the table. The mediation record release lies beside it, with the compound consignment payment dispute named explicitly. Tinmarch's patient map rounds the presentation. The committee votes to suspend the diplomatic exemption protocol before adjourning. A formal complaint routes to Roadwarden Central Command in Shelkopolis that afternoon, with the full evidence set attached. Stage III opens with the committee's authorization.`;
        addJournal('investigation', 'Unity Square S2 finale: Ward oversight committee suspends exemptions, Roadwarden complaint filed', `unity-finale-inst-${G.dayCount}`);
      } else {
        G.flags.stage2_finale_underworld = true;
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 3;
        G.lastResult = `The shadow register's entry pattern gives you a date. You're in position at the arrival address before the first party shows. Four parties across ninety minutes, arriving in separate windows, departing the same way. You record each one: physical description, charter mark visible on the case each carries, time of arrival and departure. By the following morning, those descriptions are in the hands of every investigative contact across the relevant localities. The next meeting window comes and goes with nobody arriving. The hub goes dark.`;
        addJournal('investigation', 'Unity Square S2 finale: coordination meeting observed, participants identified and distributed', `unity-finale-uw-${G.dayCount}`);
      }
      G.flags.stage2_faction_contact_made = true;
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

];

window.UNITY_SQUARE_STAGE2_ENRICHED_CHOICES = UNITY_SQUARE_STAGE2_ENRICHED_CHOICES;
