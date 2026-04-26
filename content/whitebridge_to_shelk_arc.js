/**
 * WHITEBRIDGE COMMUNE → SHELKOPOLIS TRAVEL ARC
 * Journey from the bridge cargo crossing node to Stage 2 hub
 * Narrative: Midnight crossing logs, charter mark containers, Cadrin's personal log
 * Trigger (soft): G.investigationProgress >= 5 | Trigger (hard): G.level >= 6
 */

const WHITEBRIDGE_TO_SHELK_ARC = [

  // ——— DEPARTURE (choices 1-3) ———

  {
    label: "Cadrin's personal log of the midnight crossings is the only record that wasn't cleared from the bridge registry. Get it south before it disappears too.",
    tags: ['ArcDeparture', 'Investigation', 'Decision'],
    xpReward: 65,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(65, 'departing Whitebridge with Cadrin\'s crossing log');
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
      G.lastResult = `Cadrin kept his log in a personal notation — dates, weights estimated by bridge stone stress, glove-type of handlers, and his own shorthand for "something wrong here." Thirty-one entries over five months. The entries align with the routing gaps in the official record. This is the document the bridge director's ghost account was designed to suppress. You copy it and leave Cadrin's original in place. Word of your movements has reached someone who tracks such things.`;
      G.recentOutcomeType = 'neutral';
      addJournal('decision', 'Left Whitebridge with Cadrin\'s crossing log — copy taken, original in place', `whitebridge-arc-departure-${G.dayCount}`);
    }
  },

  {
    label: "Former bridge director Ashe left Whitebridge under pressure six months ago. She's in a village two hours south. She'll want to know what you found.",
    tags: ['ArcRoad', 'Social', 'NPC'],
    xpReward: 70,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(70, 'meeting former bridge director Ashe');
      if (!G.flags) G.flags = {};

      const result = rollD20('charm', (G.skills.charm || 0) + Math.floor(G.level / 3));
      if (result.total >= 10) {
        G.lastResult = `Ashe was removed via an audit that found "administrative irregularities" — a charge she's certain was fabricated. "I refused to sign the new duty-walker scheduling," she says. "The new schedule created the night gaps." She wasn't suspicious then — just rigid. Now she is. She gives you the name of who filed the audit against her: an Iron Compact compliance officer who has since been promoted.`;
        G.flags.met_ashe_whitebridge = true;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('Ashe: removed via fabricated audit for refusing to sign duty schedule creating night gaps', 'discovery', `whitebridge-arc-ashe-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `Ashe is cautious with strangers and won't engage. You leave a message and continue south.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  {
    label: "Iron Compact crossing authority Delt Karnn's name appears on a transfer order to Shelkopolis posted last week. He's ahead of you.",
    tags: ['ArcRoad', 'Lore', 'Risk'],
    xpReward: 70,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(70, 'discovering Karnn transferred to Shelkopolis ahead of you');
      if (!G.flags) G.flags = {};

      G.lastResult = `Delt Karnn was the crossing authority who created the "district coordination deputy" ghost account. His transfer to Shelkopolis, one week before you depart, is either a promotion for completing Whitebridge's phase of the operation or a repositioning for the final phase. Either way, he's in Shelkopolis now and he knows what the charter mark containers were carrying.`;
      G.flags.karnn_in_shelkopolis = true;
      if (!G.worldClocks) G.worldClocks = {};
      G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
      addJournal('Karnn transferred to Shelkopolis ahead of you — knows charter mark operation details', 'discovery', `whitebridge-arc-karnn-${G.dayCount}`);
      G.recentOutcomeType = 'complication';
    }
  },

  // ——— SOFT TRIGGER deepening ———

  {
    label: "Cadrin's log: the handlers in protective gloves used reactive material protocols. Those protocols are specific to atmospheric compound handling. The containers were reactive precursor, not inert cargo.",
    tags: ['ArcDeepening', 'Investigation', 'Lore'],
    xpReward: 80,
    condition: function() { return (G.investigationProgress || 0) >= 5; },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(80, 'identifying handler protocols as reactive compound standard');
      if (!G.flags) G.flags = {};
      if (!G.investigationProgress) G.investigationProgress = 0;
      G.investigationProgress++;

      G.lastResult = `The glove type Cadrin described — heavy insulated, elbow-length, with secondary wrist seal — is the Principalities industrial standard for reactive atmospheric compound handling. He described it from memory. He's never worked with reactive compounds himself, so he didn't know what the protocol meant. You do. The charter mark containers crossing Whitebridge's bridge at midnight were carrying the same material class as the Craftspire accumulation and the Ironhold extraction.`;
      G.flags.whitebridge_arc_reactive_confirmed = true;
      addJournal('Handler gloves confirm reactive compound protocol — charter mark containers = same material class as Craftspire/Ironhold', 'discovery', `whitebridge-arc-reactive-${G.dayCount}`);
      G.recentOutcomeType = 'success';
    }
  },

  {
    label: "Bridge stone stress calculations from Cadrin's weight estimates: three to five tonne loads, consistent with bulk reactive precursor in industrial shipping containers.",
    tags: ['ArcDeepening', 'Craft', 'Investigation'],
    xpReward: 75,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(75, 'calculating load weight from bridge stress observations');
      if (!G.flags) G.flags = {};

      const result = rollD20('spirit', (G.skills.spirit || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `The bridge's main span flexes measurably under loads above two tonnes — Cadrin noted the flex sound specifically. His thirty-one entries include twenty-four where he heard the flex. Three-to-five tonne range. Industrial shipping containers for reactive precursor run 2.8-4.6 tonnes when full. Cadrin's weight estimates are consistent with full containers. Whatever came across that bridge over five months could supply a large-scale atmospheric application.`;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('Bridge stress analysis confirms 3-5 tonne loads — full reactive precursor containers for large-scale application', 'discovery', `whitebridge-arc-weight-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `You can estimate load weight from bridge stress data in general terms but not precisely enough to make a confident claim. The general weight range is still useful.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  {
    label: "The unmapped staging area on the east bank of the river: find it before you leave the region. It tells you where the containers came from.",
    tags: ['ArcDeepening', 'Survival', 'Investigation'],
    xpReward: 75,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(75, 'locating the unmapped east bank staging area');
      if (!G.flags) G.flags = {};

      const result = rollD20('vigor', (G.skills.vigor || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `The staging area is a cleared section of riverbank two kilometers east of the bridge — enough room for four large carts, with wheel ruts in the soil consistent with heavy loads. The soil near the edge shows trace reactive compound residue — the kind left when containers are imperfectly sealed. The ruts run northeast. Northeast of Whitebridge, at the distance implied by the rut depth and direction, is Ironhold Quarry. The supply chain is confirmed end-to-end.`;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('East bank staging area: ruts run northeast toward Ironhold — supply chain confirmed end-to-end', 'discovery', `whitebridge-arc-staging-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `You find a cleared riverbank area but it's been swept. The ground is disturbed in a way that's consistent with deliberate removal of evidence. Someone knew it would be looked for.`;
        if (!G.worldClocks) G.worldClocks = {};
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
        G.recentOutcomeType = 'complication';
      }
    }
  },

  // ——— ARRIVAL ———

  {
    label: "Shelkopolis western gate. Delt Karnn is somewhere in this city. You need to move carefully.",
    tags: ['ArcArrival', 'Stealth', 'Atmosphere'],
    xpReward: 70,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(70, 'entering Shelkopolis knowing Karnn is here');
      if (!G.flags) G.flags = {};
      if (!G.investigationProgress) G.investigationProgress = 0;
      G.investigationProgress++;

      const result = rollD20('finesse', (G.skills.finesse || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `You enter through the commercial freight gate during peak delivery hours — dozens of carts, no one checking faces, just manifests. You don't see Karnn and, more importantly, he doesn't see you. Whatever his role in Shelkopolis's phase of the operation, he hasn't been briefed to watch for you specifically.`;
        G.flags.whitebridge_arc_clean_entry = true;
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The main gate. Your name goes in the arrival register. If Karnn is watching city entry logs, he'll see it. You're in Shelkopolis, but not quietly.`;
        if (!G.worldClocks) G.worldClocks = {};
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
        G.recentOutcomeType = 'complication';
      }
    }
  },

  {
    label: "The investigation network address: a weights-and-measures office in the Ironspool Ward that handles cross-district commodity verification.",
    tags: ['ArcArrival', 'Social', 'NPC'],
    xpReward: 80,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(80, 'contacting the Ironspool Ward investigation network');
      if (!G.flags) G.flags = {};

      const result = rollD20('charm', (G.skills.charm || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `The network coordinator, Brev, already has a file on Delt Karnn. "He transferred under a reassignment authorization that lists his previous posting as 'crossing administration review' — which is not an official administrative category," she says. "That means the transfer paperwork itself is a forgery." She connects Karnn's arrival to three other recent transfers using the same fabricated category. The same clearing mechanism used at Whitebridge is being used here.`;
        G.flags.met_brev_ironspool = true;
        G.flags.stage2_faction_contact_made = true;
        if (!G.worldClocks) G.worldClocks = {};
        G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
        addJournal('Brev: Karnn\'s transfer paperwork is forged using same fabricated category as Whitebridge ghost account', 'discovery', `whitebridge-arc-brev-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The office is understaffed and Brev is handling an unrelated dispute. She asks you to come back in the morning.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  // ——— HARD GATE ———

  {
    label: "Whitebridge was the crossing point. Shelkopolis is the destination. You've traced the supply chain from east bank staging area to the city's dome infrastructure. Follow it.",
    tags: ['ArcGate', 'Decision'],
    xpReward: 80,
    condition: function() { return G.level >= 6 && !(G.flags && G.flags.whitebridge_arc_departing); },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(80, 'committing to follow supply chain from Whitebridge to Shelkopolis');
      if (!G.flags) G.flags = {};
      G.flags.whitebridge_arc_departing = true;
      if (!G.worldClocks) G.worldClocks = {};
      G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
      G.lastResult = `Thirty-one midnight crossings over five months. The last container crossed eleven days ago. Whatever it was carrying is already in transit between here and Shelkopolis. You're behind the supply chain, not ahead of it. Shelkopolis is where you close the distance.`;
      G.recentOutcomeType = 'neutral';
    }
  },

  // ——— FINALE ———

  {
    label: "Arrive in Shelkopolis. Cadrin's log and the east bank staging area are the physical evidence of what crossed that bridge. Now find where it went.",
    tags: ['ArcFinale', 'Decision'],
    xpReward: 100,
    condition: function() { return (G.investigationProgress || 0) >= 5 || G.level >= 6; },
    fn: function() {
      advanceTime(2);
      G.telemetry.turns++;
      gainXp(100, 'arriving in Shelkopolis from Whitebridge Commune');
      if (!G.flags) G.flags = {};
      G.flags.arrived_from_whitebridge = true;
      if (!G.worldClocks) G.worldClocks = {};
      G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;

      const arch = G.archetype && G.archetype.group;
      const finalText = arch === 'combat' ? ` A bridge crossing operation at this scale required coordination between the crossing authority, the haulers, and whoever received the containers south. Three parties. At least one of them is in Shelkopolis now.`
        : arch === 'magic' ? ` The reactive compound that crossed Whitebridge needs a delivery mechanism to enter the dome system. That mechanism is already built into Shelkopolis's atmospheric infrastructure. The compound just needs to reach it.`
        : arch === 'stealth' ? ` Cadrin kept his log because something felt wrong, not because he understood what he was seeing. The most dangerous witnesses are the ones who don't know they're witnesses.`
        : ` Whitebridge was the crossing point. The evidence trail and the supply chain both end in Shelkopolis. Delt Karnn is here. So are you.`;

      G.lastResult = `Shelkopolis.${finalText} Stage 2 begins here.`;
      G.location = 'shelkopolis';
      G.stage = 2;
      if (!G.investigationProgress) G.investigationProgress = 0;
      G.investigationProgress++;
      addJournal('consequence', 'Arrived in Shelkopolis from Whitebridge — Stage 2 begins', `whitebridge-arc-finale-${G.dayCount}`);
      G.recentOutcomeType = 'success';
      maybeStageAdvance();
    }
  }

];

window.WHITEBRIDGE_TO_SHELK_ARC = WHITEBRIDGE_TO_SHELK_ARC;
