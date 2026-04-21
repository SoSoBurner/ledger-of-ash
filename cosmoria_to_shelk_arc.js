/**
 * COSMORIA → SHELKOPOLIS TRAVEL ARC
 * Journey from the maritime city to Stage 2 hub
 * Narrative: Ghost vessel evidence, maritime transit laundering, administrator appointment log
 * Trigger (soft): G.investigationProgress >= 5 | Trigger (hard): G.level >= 6
 */

const COSMORIA_TO_SHELK_ARC = [

  // ——— DEPARTURE (choices 1-3) ———

  {
    label: "The maritime transit laundering template from Cosmoria's registry explains how the ghost vessel operation maintained legal cover. Carry this framework inland to Shelkopolis.",
    tags: ['ArcDeparture', 'Investigation', 'Decision'],
    xpReward: 65,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(65, 'departing Cosmoria with maritime laundering template');
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
      G.lastResult = `The template uses three parallel manifest categories — maintenance transit, emergency supply, and safety inspection response — each of which triggers automatic clearance without secondary review. The ghost vessels rotated between these categories on consecutive voyages, ensuring no single category was used frequently enough to flag as unusual. This template didn't emerge organically from maritime practice. It was designed for the specific purpose of moving cargo through maritime checkpoints unreviewed.`;
      G.recentOutcomeType = 'neutral';
      addJournal('decision', 'Left Cosmoria with transit laundering template — three-category rotation designed to avoid flagging', `cosmoria-arc-departure-${G.dayCount}`);
    }
  },

  {
    label: "Iron Compact trade agent Sull Crenn has commercial offices in both Cosmoria and Shelkopolis. He manages the cross-city commercial relationship — which includes the port district charter.",
    tags: ['ArcRoad', 'Lore', 'Risk'],
    xpReward: 70,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(70, 'tracing Crenn\'s dual-city commercial presence');
      if (!G.flags) G.flags = {};

      G.lastResult = `Crenn's Cosmoria office is legitimate — standard trade agent operations, well-documented. His Shelkopolis office was opened fourteen months ago, which corresponds with the charter renewal and the first ghost vessel transit window. One office for the cover, one office for the operation. He'll know you're coming if anyone flags your departure from Cosmoria.`;
      G.flags.crenn_in_shelkopolis = true;
      if (!G.worldClocks) G.worldClocks = {};
      G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
      addJournal('discovery', 'Crenn has Shelkopolis office opened 14 months ago matching charter/vessel timeline — cover and operation', `cosmoria-arc-crenn-${G.dayCount}`);
      G.recentOutcomeType = 'complication';
    }
  },

  {
    label: "Sailor Kavan, who described the handlers with reactive material containers, is heading to Shelkopolis for a new posting. He doesn't realize what he witnessed.",
    tags: ['ArcRoad', 'Social', 'NPC'],
    xpReward: 70,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(70, 'traveling with Kavan toward Shelkopolis');
      if (!G.flags) G.flags = {};

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 10) {
        G.lastResult = `Kavan remembered the handlers because they were careful in a way that bothered him. "Merchant sailors handle cargo rough," he says. "These people handled the containers like they were alive. Slow movements, two-person lifts, no sudden jarring." He sketches the container dimensions from memory. They match the 3-5 tonne range from Cadrin's Whitebridge weight estimates exactly. The inland and coastal supply chains are moving the same containers.`;
        G.flags.kavan_traveling_south = true;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('discovery', 'Kavan: container dimensions match Whitebridge weight class — inland and coastal supply chains are same containers', `cosmoria-arc-kavan-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `Kavan travels quickly and doesn't want to be slowed down by conversation. You travel in the same direction at different paces.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  // ——— SOFT TRIGGER deepening ———

  {
    label: "The administrator appointment log from Cosmoria: the current port administrator was appointed by a committee that includes the same Compact names as the Ithtananalor ghost account authorizations.",
    tags: ['ArcDeepening', 'Investigation', 'Lore'],
    xpReward: 80,
    condition: function() { return (G.investigationProgress || 0) >= 5; },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(80, 'connecting port administrator appointment to ghost account committee');
      if (!G.flags) G.flags = {};
      if (!G.investigationProgress) G.investigationProgress = 0;
      G.investigationProgress++;

      G.lastResult = `Three names appear on both the Cosmoria port administrator appointment committee and the Ithtananalor ghost account authorization records. The appointment happened sixteen months ago. The ghost account activity began fifteen months ago. The Cosmoria port administrator's role is operational: she approves the manifest categories that the transit laundering template uses. She was put in position specifically to authorize the clearance mechanism.`;
      G.flags.cosmoria_arc_committee_link = true;
      addJournal('discovery', 'Port administrator appointed by same committee as ghost account authorizations — installed to approve transit clearances', `cosmoria-arc-committee-${G.dayCount}`);
      G.recentOutcomeType = 'success';
    }
  },

  {
    label: "Cross-reference the ghost vessel registry with the Shelkopolis port authority's inbound manifest records. What arrived in Shelkopolis that matches what departed Cosmoria?",
    tags: ['ArcDeepening', 'Lore', 'Craft'],
    xpReward: 75,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(75, 'cross-referencing Cosmoria departures with Shelkopolis arrivals');
      if (!G.flags) G.flags = {};

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 13) {
        G.lastResult = `The Cosmoria ghost vessel departure dates correspond to Shelkopolis secondary freight terminal arrivals under the same three manifest categories — maintenance transit, emergency supply, safety inspection. The timing allows for the coastal journey at standard maritime speed. The cargo that left Cosmoria arrived in Shelkopolis. The last arrival was nineteen days ago. Whatever the supply chain was building, the coastal delivery phase concluded before you departed.`;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('discovery', 'Ghost vessel departure dates match Shelkopolis secondary terminal arrivals — coastal delivery phase complete 19 days ago', `cosmoria-arc-crossref-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The Shelkopolis inbound manifest records are only partially accessible without formal credentials. You can see arrivals but not cargo details.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  {
    label: "The tide marker on Cosmoria's harbor wall: a notation in weathered chalk, re-chalked weekly — coordinates. Someone is still communicating through this harbor.",
    tags: ['ArcDeepening', 'Survival', 'Investigation'],
    xpReward: 75,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(75, 'decoding tide marker notation');
      if (!G.flags) G.flags = {};

      const result = rollD20('survival', (G.skills.survival || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `The chalk coordinates are not harbor navigation marks — they're inland coordinates, updated weekly. You recognize the notation format as a compressed grid reference for the Shelkopolis outer district. Whoever is leaving these marks is giving updated position information to maritime contacts still using the harbor. The operation isn't fully concluded in Cosmoria — someone is still monitoring the harbor and transmitting inland coordinates.`;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('discovery', 'Tide marker: updated inland coordinates for Shelkopolis outer district — operation still has active maritime observer', `cosmoria-arc-tides-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The chalk marks look like standard harbor navigation notation. You can't decode anything specific from them.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  // ——— ARRIVAL ———

  {
    label: "Shelkopolis port district. The secondary freight terminal that the ghost vessels used is visible from the harbor road. You're standing at the delivery endpoint.",
    tags: ['ArcArrival', 'Survival', 'Atmosphere'],
    xpReward: 70,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(70, 'arriving at Shelkopolis secondary freight terminal');
      if (!G.flags) G.flags = {};
      if (!G.investigationProgress) G.investigationProgress = 0;
      G.investigationProgress++;

      const result = rollD20('survival', (G.skills.survival || 0) + Math.floor(G.level / 3));
      if (result.total >= 10) {
        G.lastResult = `The secondary freight terminal is a smaller structure adjacent to the main port — used for maintenance equipment, emergency provisions, and inspection materials. The staff is minimal: three full-time workers and a rotating duty officer. It's not surveilled heavily because it's supposed to handle non-commercial cargo. The underground channel from this terminal runs four kilometers to the dome infrastructure's primary distribution hub. This is where the coastal supply chain ends and the dome delivery begins.`;
        G.flags.cosmoria_arc_terminal_surveyed = true;
        addJournal('discovery', 'Secondary terminal underground channel runs 4km to dome infrastructure primary distribution hub', `cosmoria-arc-terminal-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The terminal is smaller than you expected. You note its location and continue into the city.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  {
    label: "Find the investigation network contact in Shelkopolis who handles maritime jurisdiction — they'll know Aldeth from the port registry.",
    tags: ['ArcArrival', 'Social', 'NPC'],
    xpReward: 80,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(80, 'connecting with maritime investigation network contact');
      if (!G.flags) G.flags = {};

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `Aldeth from Shirshal is already here — she arrived three days ago. She's been coordinating with a port authority investigator named Sevel who specializes in manifest discrepancies. Together they've built a cross-reference of the secondary terminal arrivals and the three manifest categories. "Forty-one arrivals in fourteen months," Sevel says when you join them. "Forty-one containers moved from this terminal into the underground channel. We don't know yet what's at the other end." You do.`;
        G.flags.met_sevel_port = true;
        G.flags.stage2_faction_contact_made = true;
        if (!G.worldClocks) G.worldClocks = {};
        G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 2;
        addJournal('discovery', 'Sevel and Aldeth: 41 containers via secondary terminal into underground channel — channel terminus is dome infrastructure', `cosmoria-arc-sevel-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The maritime investigation contact is at the main port authority and won't be available until the afternoon shipping register closes. You wait.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  // ——— HARD GATE ———

  {
    label: "Cosmoria's ghost vessels delivered to Shelkopolis. The maritime phase is done. The only thing left to do is get to where the delivery ended up.",
    tags: ['ArcGate', 'Decision'],
    xpReward: 80,
    condition: function() { return G.level >= 6 && !(G.flags && G.flags.cosmoria_arc_departing); },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(80, 'committing to follow coastal delivery to Shelkopolis');
      if (!G.flags) G.flags = {};
      G.flags.cosmoria_arc_departing = true;
      if (!G.worldClocks) G.worldClocks = {};
      G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
      G.lastResult = `The transit laundering template, the administrator appointment connection, and the tide marker communications combine into a single picture: Cosmoria was a staging and delivery hub for a supply chain that terminated in Shelkopolis nineteen days ago. You're not ahead of the delivery. You're behind it. Shelkopolis is the only place to catch up.`;
      G.recentOutcomeType = 'neutral';
    }
  },

  // ——— FINALE ———

  {
    label: "Arrive in Shelkopolis. Cosmoria's maritime laundering template and forty-one container arrivals all point to the secondary freight terminal underground channel leading to the dome.",
    tags: ['ArcFinale', 'Decision'],
    xpReward: 100,
    condition: function() { return (G.investigationProgress || 0) >= 5 || G.level >= 6; },
    fn: function() {
      advanceTime(2);
      G.telemetry.turns++;
      gainXp(100, 'arriving in Shelkopolis from Cosmoria');
      if (!G.flags) G.flags = {};
      G.flags.arrived_from_cosmoria = true;
      if (!G.worldClocks) G.worldClocks = {};
      G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;

      const arch = G.archetype && G.archetype.group;
      const finalText = arch === 'combat' ? ` Forty-one containers over fourteen months. The operation built its stockpile slowly enough that no single delivery was large enough to trigger notice. That's not impatience — that's discipline.`
        : arch === 'magic' ? ` The transit laundering template is designed to be replicated. Whoever designed it can use the same methodology in any port city with the same manifest categories. Cosmoria wasn't unique — it was a testbed.`
        : arch === 'stealth' ? ` The tide marker updates suggest the operation still has active eyes in Cosmoria. If you were observed departing, your arrival in Shelkopolis is known.`
        : ` The maritime supply chain and the inland supply chain converge at the same point in Shelkopolis. Everything from Cosmoria and Shirshal and Whitebridge and Ironhold arrives here. You arrived here too.`;

      G.lastResult = `Shelkopolis.${finalText} Stage 2 begins here.`;
      G.location = 'shelkopolis';
      G.stage = 2;
      if (!G.investigationProgress) G.investigationProgress = 0;
      G.investigationProgress++;
      addJournal('consequence', 'Arrived in Shelkopolis from Cosmoria — Stage 2 begins', `cosmoria-arc-finale-${G.dayCount}`);
      G.recentOutcomeType = 'success';
      maybeStageAdvance();
    }
  }

];
