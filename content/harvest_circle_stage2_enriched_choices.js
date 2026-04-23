/**
 * HARVEST CIRCLE STAGE 2 ENRICHED CHOICES
 * Investigation arc: agricultural quota records / Panim memorial manifest routing
 * NPCs: Elyra Mossbane (Patron-Family Broker), Farlan Inkshade (Academic Recordkeeper),
 *       Jorva Helmrune (Communal Responsibility Enforcer), Velrik Durnshade (Guild Dispute Mediator),
 *       Valen Crestmark (Harvest Assessor)
 */

const HARVEST_CIRCLE_STAGE2_ENRICHED_CHOICES = [

  {
    label: "Farlan Inkshade maintains the academic quota records that cross-reference all incoming and outgoing supply manifests — Panim memorial manifests have been using harvest shipment routing numbers.",
    tags: ['Investigation', 'Stage2', 'Meaningful'],
    xpReward: 74,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'cross-referencing quota records with Panim memorial manifests');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_farlan_inkshade = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `Farlan's cross-reference confirms the routing number theft. Memorial manifests are using harvest shipment tracking numbers that allow them to pass through Roadwarden supply checkpoints without inspection — because harvest shipments have standing agricultural exemption. The memorial manifests are hijacking agricultural legitimacy.`;
        addJournal('Memorial manifests using harvest routing numbers — bypassing Roadwarden checkpoints via ag exemption', 'evidence', `har-farlan-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Farlan's records are scheduled for annual academic review this week. His cooperation would jeopardize the review's independence. He is unable to assist without compromising his institutional standing.`;
        addJournal('Quota records under annual academic review — access conflict', 'complication', `har-farlan-fail-${G.dayCount}`);
      } else {
        G.flags.met_farlan_inkshade = true;
        G.investigationProgress++;
        G.lastResult = `Farlan identifies the routing number overlap. "These manifest numbers belong to our grain shipments. We haven't shipped grain to those destinations. Someone is borrowing our exemption credentials."`;
        addJournal('Harvest routing numbers borrowed by non-agricultural manifests', 'evidence', `har-farlan-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Valen Crestmark's Harvest Assessment Office knows every shipment that passes through Harvest Circle — an anomalous shipment arrived from the north six weeks ago under no recognized manifest category.",
    tags: ['NPC', 'Survival', 'Stage2', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'investigating anomalous northern shipment with Valen Crestmark');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('survival', (G.skills.survival||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_valen_crestmark = true;
        G.investigationProgress++;
        G.lastResult = `Valen's assessment logs show the shipment arriving with military transport credentials and departing south the same day. The weight and volume profiles match the second suppression compound cache Vorgul Oxtend revealed in Soreheim. The northern staging location is moving material through Harvest Circle as a quiet waypoint.`;
        addJournal('Harvest Circle as staging waypoint — military-credentialed compound cache transit confirmed', 'evidence', `har-valen-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The shipment Valen logged was under military exemption. His attempt to retrieve those records now triggers an automatic military exemption protection notice. The records are sealed.`;
        addJournal('Military exemption shipment records sealed — protection notice triggered', 'complication', `har-valen-fail-${G.dayCount}`);
      } else {
        G.flags.met_valen_crestmark = true;
        G.investigationProgress++;
        G.lastResult = `Valen found the anomalous shipment troubling enough to note separately. "Arrived from the northwest, not from any harvest supplier I know. Heavy chemical smell on the containers. They were gone before I could request a proper manifest."`;
        addJournal('Chemical-smell northern shipment — rapid departure before manifest review', 'evidence', `har-valen-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Jorva Helmrune enforces communal responsibility — a commune member has filed a grievance claiming the anomalous shipment passed through a restricted grain storage area without permission.",
    tags: ['NPC', 'Persuasion', 'Stage2', 'Meaningful'],
    xpReward: 66,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'reviewing commune grievance with Jorva Helmrune');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('persuasion', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_jorva_helmrune = true;
        G.investigationProgress++;
        G.lastResult = `Jorva's grievance file includes a witness statement from a commune elder who saw the shipment loaded. The elder describes containers with the same sealed charter mark Sable Ledgermere identified in Guildheart Hub. The commune elder is willing to provide a formal statement. The grievance has standing.`;
        addJournal('Harvest Circle elder witnessed sealed charter containers — willing to provide formal statement', 'evidence', `har-jorva-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The grievance process requires a communal council review period before external parties can access the file. Jorva cannot accelerate the timeline without violating communal governance protocols.`;
        addJournal('Commune grievance review period — external access blocked pending council', 'complication', `har-jorva-fail-${G.dayCount}`);
      } else {
        G.flags.met_jorva_helmrune = true;
        G.investigationProgress++;
        G.lastResult = `Jorva provides the grievance summary. The commune elder saw containers that were not agricultural materials. The violation of the restricted storage area is documented. The grievance is active but unresolved.`;
        addJournal('Commune grievance documents restricted storage violation by non-agricultural cargo', 'evidence', `har-jorva-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Elyra Mossbane as Patron-Family Broker has trade relationships with every supplier in the region — she knows which northern supplier claims to have dealt with Harvest Circle but doesn't appear in any actual contract.",
    tags: ['NPC', 'Lore', 'Stage2', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'cross-referencing supplier relationships with Elyra Mossbane');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_elyra_mossbane = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `Elyra identifies the ghost supplier. A "Northern Provision Compact" appears on manifests as a supplier but has no registered trade agreement with Harvest Circle, no representative she has ever met, and no fixed address in any supplier registry. The name has been used on manifests for eight months. It is a fabricated entity.`;
        addJournal('Northern Provision Compact is fabricated supplier entity — 8 months of manifest use', 'evidence', `har-elyra-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Elyra's supplier relationships are protected commercial information. Your request to identify specific suppliers triggers a patron-family confidentiality protocol she cannot waive.`;
        addJournal('Patron-family supplier confidentiality — identification request refused', 'complication', `har-elyra-fail-${G.dayCount}`);
      } else {
        G.flags.met_elyra_mossbane = true;
        G.investigationProgress++;
        G.lastResult = `Elyra cannot locate a Northern Provision Compact in any trade registry she uses. "I've dealt with every northern supplier for twelve years. This name appeared on manifests I was copied on eight months ago. I don't know who it is."`;
        addJournal('Northern Provision Compact unregistered — Elyra has no record', 'evidence', `har-elyra-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Velrik Durnshade mediates guild disputes — a dispute between two harvest guild members over a sealed cargo handling fee reveals an internal accounting irregularity.",
    tags: ['NPC', 'Craft', 'Stage2', 'Meaningful'],
    xpReward: 64,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(64, 'reviewing guild dispute accounting irregularity with Velrik Durnshade');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('craft', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_velrik_durnshade = true;
        G.investigationProgress++;
        G.lastResult = `The dispute involves a handling fee paid by one guild member to another for processing a sealed cargo batch — a fee that was not authorized by any guild contract. The payer was instructed to handle the cargo by a guild supervisor who has since left the commune. The cargo description matches suppression compound containers.`;
        addJournal('Guild dispute reveals unauthorized fee for handling suppression compound containers', 'evidence', `har-velrik-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The dispute is under active mediation. You cannot access confidential mediation proceedings without both parties' consent.`;
        addJournal('Guild dispute under mediation confidentiality — access refused', 'complication', `har-velrik-fail-${G.dayCount}`);
      } else {
        G.flags.met_velrik_durnshade = true;
        G.investigationProgress++;
        G.lastResult = `Velrik summarizes the accounting irregularity. One member paid another for cargo handling outside the normal guild contract framework. "Someone wanted this kept off the standard books."`;
        addJournal('Guild accounting irregularity — off-books cargo handling payment', 'evidence', `har-velrik-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Stage 2 Harvest Circle finale — the agricultural routing fraud and ghost supplier are confirmed. Report to the commune council or use the routing number data to intercept the next shipment.",
    tags: ['Investigation', 'Finale', 'Stage2', 'Consequence', 'Meaningful'],
    xpReward: 104,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(104, 'Harvest Circle Stage 2 resolution');
      if (!G.investigationProgress || G.investigationProgress < 8) {
        G.lastResult = `The Harvest Circle investigation needs more evidence to act on.`;
        G.recentOutcomeType = 'investigate'; return;
      }
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('survival', (G.skills.survival||0) + Math.floor(G.level/2));
      if (result.total >= 14 || result.isCrit) {
        G.flags.stage2_finale_institutional = true;
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 3;
        G.lastResult = `You present the routing number fraud and the commune elder's statement to the Harvest Circle Communal Council. The Council suspends all incoming manifests using the identified routing numbers and files a formal complaint with Roadwarden supply chain oversight. The agricultural exemption is closed. Stage III opens with communal council backing.`;
        addJournal('Harvest Circle S2 finale: communal council suspends routing fraud — Roadwarden complaint filed', 'evidence', `har-finale-inst-${G.dayCount}`);
      } else {
        G.flags.stage2_finale_underworld = true;
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 3;
        G.lastResult = `You share the next expected routing number with the Verdant Row network. The network positions contacts at every checkpoint along the route. The next shipment from the Northern Provision Compact is intercepted, documented, and dispersed before it reaches its destination.`;
        addJournal('Harvest Circle S2 finale: network intercepts next ghost shipment via routing prediction', 'evidence', `har-finale-uw-${G.dayCount}`);
      }
      G.flags.stage2_faction_contact_made = true;
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

];

window.HARVEST_CIRCLE_STAGE2_ENRICHED_CHOICES = HARVEST_CIRCLE_STAGE2_ENRICHED_CHOICES;
