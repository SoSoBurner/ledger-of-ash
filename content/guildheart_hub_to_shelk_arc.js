/**
 * GUILDHEART HUB → SHELKOPOLIS TRAVEL ARC
 * Journey from the guild coordination center to Stage 2 hub
 * Narrative: Pre-Union charter, off-channel arbiter contact, Oversight Collegium entanglement
 * Trigger (soft): G.investigationProgress >= 5 | Trigger (hard): G.level >= 6
 */

const GUILDHEART_HUB_TO_SHELK_ARC = [

  // ——— DEPARTURE (choices 1-3) ———

  {
    label: "The pre-Union charter fragment from Guildheart's archive gives the northern operation a legal structure to hide behind. Get it to Shelkopolis where it can be properly analyzed.",
    tags: ['ArcDeparture', 'Investigation', 'Decision'],
    xpReward: 65,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(65, 'departing Guildheart with pre-Union charter fragment');
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
      G.lastResult = `The charter is forty years old and written in pre-Union commercial language. It grants "coordinating commercial association" status — a category that predates the current guild registration system entirely and sits outside every modern oversight tier. The northern bloc has been operating under its protections without ever filing under current law. Whether that status remains legally valid is a question only the central guild registry in Shelkopolis can answer. If the charter has lapsed, the legal architecture of the entire operation comes apart.`;
      G.recentOutcomeType = 'neutral';
      addJournal('decision', 'Left Guildheart with pre-Union charter fragment — validity check needed in central registry', `guildheart-arc-departure-${G.dayCount}`);
    }
  },

  {
    label: "Displaced factor Paerun Delst has been trying to file a complaint about the off-channel arbiter contact for three months. He hasn't found a venue that will accept it.",
    tags: ['ArcRoad', 'Social', 'NPC'],
    xpReward: 70,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(70, 'talking with Paerun Delst about complaint filing failures');
      if (!G.flags) G.flags = {};

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 10) {
        G.lastResult = `Paerun has a folder. Three months of deflections, each one documented: the Collegium told him it was a guild matter. The guild told him it was commercial arbitration. The commercial arbitration council told him it was a Collegium matter. Each venue named the next one. No venue accepted the complaint. "I stopped thinking it was incompetence after the second full rotation," he says. He hands you the folder. Whoever structured the off-channel arbiter operation understood that the jurisdictional gap between those three bodies would consume any complaint filed against it indefinitely.`;
        G.flags.met_paerun_delst = true;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('Paerun: jurisdictional loop between Collegium/guild/arbitration designed to swallow complaints', 'discovery', `guildheart-arc-paerun-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `Paerun looks at you the way people look at everything after three months of being redirected by institutions: with attention that stays behind glass. He does not open the folder. He says he is considering his options and walks to the other side of the waystation. You travel south separately.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  {
    label: "Oversight Collegium observer Calla Trent filed a transfer request to Shelkopolis two weeks ago — approved immediately. Calla knows what you found in Guildheart.",
    tags: ['ArcRoad', 'Stealth', 'Risk'],
    xpReward: 70,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(70, 'assessing Calla Trent\'s immediate transfer approval');
      if (!G.flags) G.flags = {};

      G.lastResult = `Calla Trent's transfer was approved in forty-eight hours. Standard Collegium reassignments take two to three weeks — longer for regional transfers involving housing allocation. A forty-eight-hour approval requires a senior sign-off and a stated operational need. She filed the transfer request three days after your activity became visible in Guildheart. The monitoring and repositioning are not reactive — they are structured. Someone in the operation watches for inquiry patterns and moves assets before the inquiry can conclude.`;
      G.flags.calla_trent_in_shelkopolis = true;
      if (!G.worldClocks) G.worldClocks = {};
      G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
      addJournal('Calla fast-tracked to Shelkopolis after your inquiry became visible — operation monitors and repositions', 'discovery', `guildheart-arc-calla-${G.dayCount}`);
      G.recentOutcomeType = 'complication';
    }
  },

  // ——— SOFT TRIGGER deepening ———

  {
    label: "The off-channel arbiter contact in Guildheart was brokering agreements between guild factions and the northern bloc. Those agreements are enforceable under pre-Union charter law.",
    tags: ['ArcDeepening', 'Investigation', 'Lore'],
    xpReward: 80,
    condition: function() { return (G.investigationProgress || 0) >= 5; },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(80, 'understanding charter-backed guild agreements');
      if (!G.flags) G.flags = {};
      if (!G.investigationProgress) G.investigationProgress = 0;
      G.investigationProgress++;

      G.lastResult = `The pre-Union charter's "coordinating commercial association" status permits binding agreements between member entities without requiring those agreements to be filed under current guild registration law. The northern bloc used the off-channel arbiter to execute binding agreements with three Guildheart guild factions — agreements that are technically legal and technically unrecorded. Those factions are now committed to the operation's commercial interests through instruments they cannot disavow without admitting they exist. The charter does not just provide legal cover. It provides the mechanism for absorbing legitimate guild infrastructure from the inside.`;
      G.flags.guildheart_arc_charter_mechanism = true;
      addJournal('Charter allows binding agreements bypassing guild registration — northern bloc co-opted Guildheart guild factions legally', 'discovery', `guildheart-arc-charter-${G.dayCount}`);
      G.recentOutcomeType = 'success';
    }
  },

  {
    label: "The guild memorial bell rings once for each full-member charter holder who dies. It has rung four times in the past six months — more than the previous four years combined.",
    tags: ['ArcDeepening', 'Survival', 'Investigation'],
    xpReward: 75,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(75, 'noticing elevated guild memorial bell frequency');
      if (!G.flags) G.flags = {};

      const result = rollD20('survival', (G.skills.survival || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `Four deaths in six months among full-member charter holders — a rate that is five times the previous four-year average. The guild registry records the causes: two accidents, one illness, one entry marked "circumstances under review." The dates in the registry, set against the agreement timeline, produce a pattern: each death occurred within three weeks of that holder filing a formal objection to a northern bloc charter agreement. Co-option is the preferred mechanism. When that fails, the resolution is different.`;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('Four charter holder deaths correlated with objections to northern bloc agreements — pattern is lethal', 'discovery', `guildheart-arc-deaths-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `Four deaths is a number that should prompt a formal review, but without registry access and the agreement date records together, you cannot establish the correlation precisely enough to take forward. You file the observation and the rate and the cause categories. The connection will need the Shelkopolis central records to confirm.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  {
    label: "The pre-Union charter's registration record: when was it last renewed, and who renewed it?",
    tags: ['ArcDeepening', 'Lore', 'Investigation'],
    xpReward: 75,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(75, 'tracing charter renewal history');
      if (!G.flags) G.flags = {};

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `Pre-Union charters renew on twenty-year cycles. This one was renewed nineteen months ago — an off-cycle renewal, which requires a filed justification. The renewing authority was a Collegium archive officer in Shelkopolis. The renewal application lists the charter's "coordinating member entities" as company names that appear in no current commercial register, trade registry, or guild index. The charter was renewed on behalf of entities that did not exist in any official record when the renewal was filed. The Collegium officer either did not check or chose not to.`;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('Charter renewed 19 months ago off-cycle by Shelkopolis Collegium officer for non-existent entities', 'discovery', `guildheart-arc-renewal-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `Charter renewal records are held centrally in Shelkopolis — they are not duplicated to the localities where the charter operates. What you have here is the fragment, not the renewal document. The Shelkopolis archive is the only place to confirm who filed it and who approved it.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  // ——— ARRIVAL ———

  {
    label: "Shelkopolis guild district. The central registry is here — forty years of charter records, and somewhere in it, the pre-Union charter's renewal record.",
    tags: ['ArcArrival', 'Lore', 'Atmosphere'],
    xpReward: 70,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(70, 'arriving at Shelkopolis guild district');
      if (!G.flags) G.flags = {};
      if (!G.investigationProgress) G.investigationProgress = 0;
      G.investigationProgress++;

      G.lastResult = `The central registry building takes up a full block of the guild district, its entrance marked by four guild marks cut into the stone above the door. Records going back to the city's founding charter are inside. Somewhere in that archive is the renewal document: a Collegium officer's signature on a charter renewed for entities that did not exist. That signature is the link between institutional oversight and the operation's legal structure. It is provable and it is here.`;
      G.flags.guildheart_arc_registry_located = true;
      addJournal('Central registry: charter renewal record links Collegium officer to northern bloc 19 months ago', 'discovery', `guildheart-arc-registry-${G.dayCount}`);
      G.recentOutcomeType = 'neutral';
    }
  },

  {
    label: "The off-channel arbiter contact from Guildheart has a counterpart in Shelkopolis. Find them through the investigation network.",
    tags: ['ArcArrival', 'Social', 'NPC'],
    xpReward: 80,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(80, 'finding the Shelkopolis off-channel arbitration counterpart');
      if (!G.flags) G.flags = {};

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `Fen Torr is retired from the registry office and keeps a private record of charter transactions that do not make it into the official log — a practice she began when she noticed the gaps herself. She examines the fragment without speaking for a moment. "Twelve amendments in two years," she says. "None of them recorded." She opens a ledger kept in a locked box under her workbench. Twelve filings, twelve new entities added to the charter's membership, all conducted through amendment procedure that bypassed the official record. The operation constructed its entire legal shell through documents that technically exist and officially do not.`;
        G.flags.met_fen_torr_registrar = true;
        G.flags.stage2_faction_contact_made = true;
        if (!G.worldClocks) G.worldClocks = {};
        G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
        addJournal('Fen Torr: 12 unrecorded charter amendments — operation\'s full legal structure exists off-register', 'discovery', `guildheart-arc-torr-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The network address leads to a factor's office that handles commodity disputes, not charter arbitration. The factor knows the network but does not know Fen Torr's work. You leave with a list of three other possible approaches to the registry records and no direct path to any of them.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  // ——— HARD GATE ———

  {
    label: "The pre-Union charter is the legal infrastructure of the northern operation. Shelkopolis is where that infrastructure was built and where it can be dismantled.",
    tags: ['ArcGate', 'Decision'],
    xpReward: 80,
    condition: function() { return G.level >= 6 && !(G.flags && G.flags.guildheart_arc_departing); },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(80, 'committing to trace charter infrastructure to Shelkopolis');
      if (!G.flags) G.flags = {};
      G.flags.guildheart_arc_departing = true;
      if (!G.worldClocks) G.worldClocks = {};
      G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
      G.lastResult = `The operation has a legal structure, a financial structure, and a supply chain structure. Each was built carefully and separately. The legal structure runs through a forty-year-old charter renewed nineteen months ago by a Collegium officer for entities that did not officially exist. Shelkopolis holds the renewal record. A retired registrar there keeps the unrecorded amendments in a locked box. The legal case against this operation is built in that city or it is not built at all.`;
      G.recentOutcomeType = 'neutral';
    }
  },

  // ——— FINALE ———

  {
    label: "Arrive in Shelkopolis. The pre-Union charter from Guildheart reveals that the northern operation built its legal shelter in this city's own registry office.",
    tags: ['ArcFinale', 'Decision'],
    xpReward: 100,
    condition: function() { return (G.investigationProgress || 0) >= 5 || G.level >= 6; },
    fn: function() {
      advanceTime(2);
      G.telemetry.turns++;
      gainXp(100, 'arriving in Shelkopolis from Guildheart Hub');
      if (!G.flags) G.flags = {};
      G.flags.arrived_from_guildheart_hub = true;
      if (!G.worldClocks) G.worldClocks = {};
      G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;

      const arch = G.archetype && G.archetype.group;
      const finalText = arch === 'combat' ? ` The legal shelter was chosen for its age. A forty-year-old charter predates the oversight structures designed to catch exactly this kind of arrangement. Whoever selected it understood those structures well enough to stay outside them.`
        : arch === 'magic' ? ` The charter's construction uses the jurisdictional gap between three oversight bodies as a permanent immunity mechanism. Filing in that gap, a complaint circulates forever without being processed. Someone who understood all three bodies' jurisdictional limits designed this from the inside.`
        : arch === 'stealth' ? ` Twelve amendments that officially do not exist. A renewal filed for companies that do not appear in any registry. A retired registrar keeping a private ledger because she noticed the gaps. The operation runs on the space between what institutions record and what they actually process.`
        : ` The legal shelter for the entire operation was built inside the oversight institution responsible for dismantling it. A Collegium officer's signature on a charter renewal for non-existent entities — that is the link between the regulator and the regulated. It is in the archive.`;

      G.lastResult = `Shelkopolis — the guild district visible from the main gate, the central registry building spanning a full block, forty years of charter records inside it and twelve unrecorded amendments in a locked box beneath a retired registrar's workbench.${finalText} Stage 2 begins here.`;
      G.location = 'shelkopolis';
      G.stage = 2;
      if (!G.investigationProgress) G.investigationProgress = 0;
      G.investigationProgress++;
      addJournal('consequence', 'Arrived in Shelkopolis from Guildheart Hub — Stage 2 begins', `guildheart-arc-finale-${G.dayCount}`);
      G.recentOutcomeType = 'success';
      maybeStageAdvance();
    }
  }

];

window.GUILDHEART_HUB_TO_SHELK_ARC = GUILDHEART_HUB_TO_SHELK_ARC;
