/**
 * COSMORIA STAGE 2 ENRICHED CHOICES
 * Investigation arc: maritime archive / airship lane suppression compound transit
 * NPCs: Coralyn Tideglass (Archivist), Marrow Tideglass (Ship Captain),
 *       Selka Tideglass (Innkeeper), Tavian Tideglass (Market Clerk), Nerissa Tideglass (Shrine Attendant)
 */

const COSMORIA_STAGE2_ENRICHED_CHOICES = [

  {
    label: "Coralyn Tideglass at the Maritime Archive Hall has records of every vessel entering Cosmoria's harbor — one shipping agent has filed cargo declarations that do not match any registered vessel registry.",
    tags: ['Investigation', 'Stage2', 'Meaningful'],
    xpReward: 78,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(78, 'reviewing maritime archive vessel and cargo records');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_coralyn_tideglass = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `Coralyn has been tracking the anomaly for months. The shipping agent's declarations reference a vessel flagged under House Cosmouth's historical maritime registry — a vessel that was officially decommissioned twelve years ago. The declarations are legally valid because the decommissioning was never completed in the archive. Someone left the record open intentionally.`;
        addJournal('investigation', 'Cosmoria: ghost vessel via incomplete decommission record — intentional archive gap', `cos-coralyn-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The archive requires a maritime access credential that you do not have. Coralyn logs the access attempt formally. The log is routed to Harbor Captain oversight.`;
        addJournal('complication', 'Maritime archive access logged — Harbor Captain oversight notified', `cos-coralyn-fail-${G.dayCount}`);
      } else {
        G.flags.met_coralyn_tideglass = true;
        G.investigationProgress++;
        G.lastResult = `Coralyn confirms the unregistered vessel declarations. The agent has used the same vessel reference seventeen times. "It shouldn't be in service. But until the decommissioning is finalized, I cannot technically refuse the declaration."`;
        addJournal('investigation', 'Ghost vessel declarations — decommissioning legally incomplete, 17 uses', `cos-coralyn-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Marrow Tideglass as Harbor Captain has authority over all vessel inspections — he has been instructed to wave through a specific category of sealed cargo containers.",
    tags: ['NPC', 'Persuasion', 'Stage2', 'Meaningful'],
    xpReward: 76,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(76, 'pressuring Harbor Captain Marrow Tideglass on sealed cargo waivers');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('persuasion', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_marrow_tideglass = true;
        G.investigationProgress++;
        G.lastResult = `Marrow is under visible strain. The waiver instruction came from a House Cosmouth administrative office six months ago. He filed a protest at the time. The protest was overridden. The sealed containers are loaded onto the Shelkopolis-Cosmoria airship lane — specifically onto the night departure flights. He has the departure logs.`;
        addJournal('investigation', 'Cosmoria: sealed cargo waived onto night airship to Shelkopolis — House Cosmouth admin override', `cos-marrow-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `Marrow's professional boundaries close entirely. "Cargo inspection policy is not a public record." He reports the inquiry to the Harbor Authority and requests identification documentation.`;
        addJournal('complication', 'Harbor Captain reported inquiry to Harbor Authority — identification requested', `cos-marrow-fail-${G.dayCount}`);
      } else {
        G.flags.met_marrow_tideglass = true;
        G.investigationProgress++;
        G.lastResult = `Marrow confirms the waiver category exists. He cannot describe the containers' contents. "I have instructions and I follow them. The instructions came with proper authority codes." He says this with the tone of someone who knows it is insufficient.`;
        addJournal('investigation', 'Harbor inspection waiver confirmed — captain knows it is irregular', `cos-marrow-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Tavian Tideglass's Floating Market Exchange processes all incoming maritime cargo for retail distribution — the sealed containers never reach the market floor.",
    tags: ['NPC', 'Craft', 'Stage2', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'tracing sealed container distribution with market clerk Tavian Tideglass');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('craft', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_tavian_tideglass = true;
        G.investigationProgress++;
        G.lastResult = `Tavian's market ledger shows the sealed containers arriving, being logged as "in transit — bonded," and then departing on the night airship within six hours of arrival. They never enter the market chain. They use Cosmoria as a transit point only — specifically to acquire the legal maritime declaration that makes them appear to originate from a House Cosmouth port.`;
        addJournal('investigation', 'Cosmoria as transit laundering point — containers acquire Cosmouth maritime provenance', `cos-tavian-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Tavian's ledger audit for the past six months is currently under House Cosmouth administrative review. He cannot provide access to records under active review.`;
        addJournal('complication', 'Market ledger under active Cosmouth review — access denied', `cos-tavian-fail-${G.dayCount}`);
      } else {
        G.flags.met_tavian_tideglass = true;
        G.investigationProgress++;
        G.lastResult = `Tavian confirms the containers never enter distribution. "Bonded transit cargo isn't unusual, but most bonded transit stays longer than six hours." The rapid departure is irregular.`;
        addJournal('investigation', 'Bonded transit cargo — 6-hour rapid departure irregular', `cos-tavian-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Selka Tideglass at the Cosmouth Dockside Inn hosts the shipping agents who work the Cosmoria maritime routes — one agent has been paying for rooms she never uses.",
    tags: ['NPC', 'Stealth', 'Stage2', 'Meaningful'],
    xpReward: 66,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'questioning innkeeper Selka Tideglass about shipping agent patterns');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('stealth', (G.skills.stealth||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_selka_tideglass = true;
        G.investigationProgress++;
        G.lastResult = `Selka shows the booking record: same agent, eighteen room bookings over six months, seventeen with a same-night checkout and no actual occupancy. The agent books a room but uses it only as a business address for receiving sealed correspondence during the six-hour transit window. Three of those letters bore the same sealed charter mark Sable Ledgermere identified in Guildheart.`;
        addJournal('investigation', 'Cosmoria inn: agent uses room as transit address — 3 letters bear sealed charter mark', `cos-selka-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Selka's loyalty to her regulars closes the conversation. "Agents have their patterns and I'm not the one who asks about them."`;
        addJournal('complication', 'Dockside inn confidentiality — agent inquiry refused', `cos-selka-fail-${G.dayCount}`);
      } else {
        G.flags.met_selka_tideglass = true;
        G.investigationProgress++;
        G.lastResult = `Selka confirms the agent's unusual booking pattern. Pays full rate, stays a few hours, leaves. "Good business for me. Bad business for someone else, I suspect."`;
        addJournal('investigation', 'Shipping agent using inn as short-stay transit address', `cos-selka-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Nerissa Tideglass at the Sea Communion Shrine records tidal observations — the glyph surge timing at Shelkopolis correlates with specific tidal window combinations she has documented.",
    tags: ['NPC', 'Lore', 'Stage2', 'Meaningful'],
    xpReward: 74,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'reviewing tidal-surge correlation data with Nerissa Tideglass');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_nerissa_tideglass = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `Nerissa's tidal data shows a precise correlation: every Shelkopolis glyph surge occurred during a high-amplitude dual-tide window. The Watchers Perch cave modifications Quenra and Velis Quillfire referenced would have used these tidal windows as natural amplifiers. The engineering was designed to exploit predictable tidal mechanics — giving the operation a schedule that looks natural.`;
        addJournal('investigation', 'Tidal window confirmed as surge trigger mechanism — operation uses natural schedule as cover', `cos-nerissa-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.reverence = (G.worldClocks.reverence||0) - 1;
        G.lastResult = `Nerissa interprets your questions about tidal surges as an inquiry about divine tide cycles that falls outside her observational mandate. She closes the shrine records and offers a blessing instead.`;
        addJournal('complication', 'Sea shrine records closed — tidal inquiry redirected to doctrine', `cos-nerissa-fail-${G.dayCount}`);
      } else {
        G.flags.met_nerissa_tideglass = true;
        G.investigationProgress++;
        G.lastResult = `Nerissa's observations document the tidal window pattern. The correlation with regional glyph events is statistically significant. She has not published the analysis because she lacked a mechanism explanation. You have the mechanism.`;
        addJournal('investigation', 'Tidal window surge correlation documented — mechanism now explained', `cos-nerissa-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Stage 2 Cosmoria finale — the maritime transit laundering route and tidal surge mechanics are confirmed. Report to House Cosmouth authority or expose through the airship network.",
    tags: ['Investigation', 'Finale', 'Stage2', 'Consequence', 'Meaningful'],
    xpReward: 108,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(108, 'Cosmoria Stage 2 resolution');
      if (!G.investigationProgress || G.investigationProgress < 8) {
        G.lastResult = `The Cosmoria investigation requires more evidence before acting.`;
        G.recentOutcomeType = 'investigate'; return;
      }
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('persuasion', (G.skills.persuasion||0) + Math.floor(G.level/2));
      if (result.total >= 14 || result.isCrit) {
        G.flags.stage2_finale_institutional = true;
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 3;
        G.lastResult = `You present the ghost vessel record, the charter correspondence, and the tidal correlation to the House Cosmouth Maritime Authority. The Authority initiates an immediate audit and suspends the archive gap. The transit laundering route is closed. Stage III opens with maritime institutional backing.`;
        addJournal('investigation', 'Cosmoria S2 finale: Maritime Authority audit, archive gap closed', `cos-finale-inst-${G.dayCount}`);
      } else {
        G.flags.stage2_finale_underworld = true;
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 3;
        G.lastResult = `You route the evidence through the airship network's cargo handlers and the Verdant Row maritime contacts simultaneously. Every freight handler on the Cosmoria-Shelkopolis lane knows about the ghost vessel within 48 hours. The transit laundering route becomes unusable.`;
        addJournal('investigation', 'Cosmoria S2 finale: evidence distributed through airship cargo network', `cos-finale-uw-${G.dayCount}`);
      }
      G.flags.stage2_faction_contact_made = true;
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

];

window.COSMORIA_STAGE2_ENRICHED_CHOICES = COSMORIA_STAGE2_ENRICHED_CHOICES;
