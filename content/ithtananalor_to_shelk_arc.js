/**
 * ITHTANANALOR → SHELKOPOLIS TRAVEL ARC
 * Journey from the Iron Ledger financial district to Stage 2 hub
 * Narrative: Ghost accounts, debt leverage trail, financial infrastructure of the operation
 * Trigger (soft): G.investigationProgress >= 5 | Trigger (hard): G.level >= 6
 */

const ITHTANANALOR_TO_SHELK_ARC = [

  // ——— DEPARTURE (choices 1-3) ———

  {
    label: "The Iron Ledger Ward ghost accounts demonstrate how the northern operation financed itself without leaving traceable capital flows. Carry the transaction pattern to Shelkopolis.",
    tags: ['ArcDeparture', 'Investigation', 'Decision'],
    xpReward: 65,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(65, 'departing Ithtananalor with ghost account transaction pattern');
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
      G.lastResult = `The ghost accounts moved capital through the Iron Ledger Ward in fractions — amounts below the review threshold, distributed across dozens of transactions, aggregating to significant sums over time. The same technique appears in the Whitebridge bridge authority records and the Unity Square arbitration register. The northern operation has one financial methodology. Tracing where its capital ended up requires Shelkopolis's central financial registry.`;
      G.recentOutcomeType = 'neutral';
      addJournal('decision', 'Left Ithtananalor carrying ghost account transaction pattern for central registry', `ithtan-arc-departure-${G.dayCount}`);
    }
  },

  {
    label: "Maret Voss at the Iron Ledger — she flagged the ghost accounts before anyone else did. She's leaving Ithtananalor the same week you are.",
    tags: ['ArcRoad', 'Social', 'NPC'],
    xpReward: 70,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(70, 'traveling south with Maret Voss');
      if (!G.flags) G.flags = {};

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `Maret isn't leaving because she found the accounts — she's leaving because someone found out she found them. "My review authorization was revoked on a procedural technicality," she says. "The technicality was invented two weeks after I filed my first inquiry." She's carrying her work in her head, not on paper. In Shelkopolis she knows a financial arbitrator who operates outside the Compact's review structure. She'll introduce you.`;
        G.flags.maret_voss_traveling_south = true;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('Maret\'s authorization revoked after inquiry — carrying findings in her head, Shelkopolis contact ready', 'discovery', `ithtan-arc-maret-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `Maret travels separately by design. "Don't follow me," she says, not unkindly. "If we're seen together, we're connected. Connected investigators are easier to suppress than separate ones."`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  {
    label: "Displaced Captain Lysel's garrison was reduced at the same time the ghost account activity peaked. The timing isn't accidental.",
    tags: ['ArcRoad', 'Lore', 'Investigation'],
    xpReward: 70,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(70, 'connecting garrison reduction timing to ghost account activity');
      if (!G.flags) G.flags = {};

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `Lysel's garrison reduction corresponded with a Warden Order efficiency review — the review itself was requested by the same Iron Compact attaché who was accessing the ghost accounts. The financial operation and the physical security reduction were coordinated. Someone used the financial infrastructure to buy the security clearance to make the operation possible.`;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('Ghost accounts funded the efficiency review that reduced Lysel\'s garrison — financial and physical operation coordinated', 'discovery', `ithtan-arc-lysel-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The timing is suspicious but you can't establish causation from what you have. Note it and move on.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  // ——— SOFT TRIGGER deepening ———

  {
    label: "The debt leverage trail: the northern operation holds financial pressure on at least three officials across the localities. They can't report what they know.",
    tags: ['ArcDeepening', 'Investigation', 'Lore'],
    xpReward: 80,
    condition: function() { return (G.investigationProgress || 0) >= 5; },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(80, 'mapping the debt leverage system across localities');
      if (!G.flags) G.flags = {};
      if (!G.investigationProgress) G.investigationProgress = 0;
      G.investigationProgress++;

      G.lastResult = `The ghost accounts didn't just fund the operation — they created leverage. Each official who processed a ghost account transaction became, technically, a participant in a fraudulent financial record. They couldn't report the accounts without implicating themselves. The operation built its own suppression mechanism into the financial infrastructure. Whoever designed this understood institutional psychology as well as financial mechanics.`;
      G.flags.ithtan_arc_leverage_mapped = true;
      addJournal('Ghost accounts created complicity — officials who processed them couldn\'t report without self-implicating', 'discovery', `ithtan-arc-leverage-${G.dayCount}`);
      G.recentOutcomeType = 'success';
    }
  },

  {
    label: "A road exchange house south of Ithtananalor: spot a transaction pattern in their public registry that matches the Ithtananalor ghost account methodology exactly.",
    tags: ['ArcDeepening', 'Lore', 'Craft'],
    xpReward: 75,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(75, 'identifying matching transaction pattern in road exchange house');
      if (!G.flags) G.flags = {};

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 13) {
        G.lastResult = `The exchange house serves the road between Ithtananalor and Shelkopolis. Its public registry — required by Principalities commercial law — shows eighteen transactions in the past three months using the same below-threshold fragmentation technique as the Iron Ledger ghost accounts. The money is flowing south. It's already in Shelkopolis's financial system. Whatever it was paying for, it's been paid.`;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('Road exchange house: same ghost account pattern — capital already in Shelkopolis financial system', 'discovery', `ithtan-arc-exchange-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The public registry is dense and the pattern isn't obvious without careful comparison. You note the exchange house location for future reference.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  {
    label: "Warden Order attaché Denn Calver — the one who accessed the ghost accounts — has a posting history. Trace it.",
    tags: ['ArcDeepening', 'Lore', 'Investigation'],
    xpReward: 75,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(75, 'tracing Calver\'s Warden Order posting history');
      if (!G.flags) G.flags = {};

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `Calver has been posted to financial review assignments in four localities over the past eighteen months — always just before significant ghost account activity begins and transferred out just after it ends. He's a mobile asset. His current posting is listed as "central administration reassignment" — which, cross-referenced with the Warden Order's Shelkopolis office, places him in the city right now.`;
        G.flags.calver_in_shelkopolis = true;
        if (!G.worldClocks) G.worldClocks = {};
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
        addJournal('Calver: mobile asset posted before/after ghost account cycles — currently in Shelkopolis', 'discovery', `ithtan-arc-calver-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `Calver's posting history is partially accessible. You can see the Ithtananalor assignment and one prior. The full pattern requires the central Warden Order registry, which is in Shelkopolis.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  // ——— ARRIVAL ———

  {
    label: "Shelkopolis financial district. The central capital registry holds twenty years of transaction records. The ghost account methodology will be visible in it — if you know what to look for.",
    tags: ['ArcArrival', 'Lore', 'Atmosphere'],
    xpReward: 70,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(70, 'arriving at Shelkopolis financial district');
      if (!G.flags) G.flags = {};
      if (!G.investigationProgress) G.investigationProgress = 0;
      G.investigationProgress++;

      G.lastResult = `The financial district's archive building is the largest structure in Shelkopolis's administrative quarter. Twenty years of transaction records, cross-locality — every exchange house in the Principalities is required to file quarterly reports here. The ghost account pattern that Maret Voss identified in Ithtananalor will appear in this archive, aggregated. If it's as systematic as you think, it will show up as an anomaly across dozens of registry entries. Maret's contact at the arbitrator's office will know how to find it.`;
      G.flags.ithtan_arc_archive_located = true;
      addJournal('Central archive: cross-locality registry — ghost account pattern will be visible if systematic', 'discovery', `ithtan-arc-archive-${G.dayCount}`);
      G.recentOutcomeType = 'neutral';
    }
  },

  {
    label: "Find Maret Voss's financial arbitrator contact in Shelkopolis — the one who operates outside the Compact's review structure.",
    tags: ['ArcArrival', 'Social', 'NPC'],
    xpReward: 80,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(80, 'reaching Maret\'s arbitrator contact in Shelkopolis');
      if (!G.flags) G.flags = {};

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `Arbitrator Hess operates an independent dispute resolution practice that doesn't require Compact registration — technically legal, practically invisible to the financial review structure. Maret already sent him a summary. "I can access the central archive under the independent review provision," he tells you. "It takes three days. But once I file the access request, it can't be withdrawn without creating a record of the withdrawal. The operation can't suppress this quietly anymore."`;
        G.flags.met_hess_arbitrator = true;
        G.flags.stage2_faction_contact_made = true;
        if (!G.worldClocks) G.worldClocks = {};
        G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
        addJournal('Hess: independent archive access filed — suppression now creates its own record', 'discovery', `ithtan-arc-hess-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `Hess hasn't received Maret's summary yet — she must have taken a different route. You explain the situation from scratch. He's interested but needs documentation before he'll act.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  // ——— HARD GATE ———

  {
    label: "The financial trail from Ithtananalor ends in Shelkopolis. The capital is already there. Follow it.",
    tags: ['ArcGate', 'Decision'],
    xpReward: 80,
    condition: function() { return G.level >= 6 && !(G.flags && G.flags.ithtan_arc_departing); },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(80, 'committing to follow capital trail to Shelkopolis');
      if (!G.flags) G.flags = {};
      G.flags.ithtan_arc_departing = true;
      if (!G.worldClocks) G.worldClocks = {};
      G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
      G.lastResult = `The ghost accounts financed an operation. The operation's physical supply chain is already converging on Shelkopolis. The financial evidence in the Iron Ledger Ward is the paper trail that proves the operation was organized and funded. Without it, the physical evidence looks circumstantial. Together, they're something that can't be explained away.`;
      G.recentOutcomeType = 'neutral';
    }
  },

  // ——— FINALE ———

  {
    label: "Arrive in Shelkopolis. The financial infrastructure of the northern operation is centered here, in the city it was funding the delivery to.",
    tags: ['ArcFinale', 'Decision'],
    xpReward: 100,
    condition: function() { return (G.investigationProgress || 0) >= 5 || G.level >= 6; },
    fn: function() {
      advanceTime(2);
      G.telemetry.turns++;
      gainXp(100, 'arriving in Shelkopolis from Ithtananalor');
      if (!G.flags) G.flags = {};
      G.flags.arrived_from_ithtananalor = true;
      if (!G.worldClocks) G.worldClocks = {};
      G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;

      const arch = G.archetype && G.archetype.group;
      const finalText = arch === 'combat' ? ` The operation paid for its own security clearances. Lysel's garrison, Ashe's audit, Maret's authorization revocation — each cost money. The money came from Ithtananalor.`
        : arch === 'magic' ? ` The financial methodology shows sophisticated institutional knowledge. This operation was not improvised. It was budgeted, scheduled, and paid for in advance.`
        : arch === 'stealth' ? ` Ghost accounts are the perfect operational funding mechanism — they're self-erasing. By the time you're looking for the money, it's already been spent and the accounts are closed.`
        : ` Every locality in the northern bloc had its own piece of this operation's budget. Ithtananalor was the clearinghouse. The spending was here. And so was whatever it bought.`;

      G.lastResult = `Shelkopolis.${finalText} Stage 2 begins here.`;
      G.location = 'shelkopolis';
      G.stage = 2;
      if (!G.investigationProgress) G.investigationProgress = 0;
      G.investigationProgress++;
      addJournal('consequence', 'Arrived in Shelkopolis from Ithtananalor — Stage 2 begins', `ithtan-arc-finale-${G.dayCount}`);
      G.recentOutcomeType = 'success';
      maybeStageAdvance();
    }
  }

];

window.ITHTANANALOR_TO_SHELK_ARC = ITHTANANALOR_TO_SHELK_ARC;
