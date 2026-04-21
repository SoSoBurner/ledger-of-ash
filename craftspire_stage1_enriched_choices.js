/**
 * CRAFTSPIRE STAGE 1 ENRICHED MEANINGFUL CHOICES
 * 20 investigation paths grounded in guild workshop secrets and chemical input irregularities
 * Craftspire: a guild manufacturing hub where the inputs for something dangerous are being quietly assembled
 * Named NPC: Jorin (the guild workshop master who first noticed the chemical input anomalies)
 */

const CRAFTSPIRE_STAGE1_ENRICHED_CHOICES = [

  // 1. FIRST ENCOUNTER: JORIN
  {
    label: "Find Jorin — the workshop master who submitted an unofficial complaint about chemical input anomalies four months ago.",
    tags: ['Investigation', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'meeting Jorin the workshop master');
      if (!G.flags) G.flags = {};

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `Jorin runs the guild's precision fabrication workshop and speaks with the certainty of someone who has handled materials all his life. "We've been receiving chemical inputs that don't match what we order. Not substituted — modified. Same base compounds, different concentrations." He's been logging the discrepancies but hasn't been able to explain why inputs are being altered before delivery. "Someone in the supply chain is modifying materials before they reach the guild. And they're doing it consistently."`;
        G.flags.met_jorin = true;
        addJournal('contact', 'Workshop master Jorin met: chemical input modifications documented — deliberate concentration changes across supply chain', `craftspire-jorin-${G.dayCount}`);
      } else {
        G.lastResult = `Jorin is busy with a precision run and won't stop mid-process. He's available during workshop break periods. His reputation precedes him: this is someone who notices things.`;
        G.flags.located_jorin = true;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // 2. CLUE: CHEMICAL INPUT RECORDS
  {
    label: "Review the guild's incoming chemical manifests against the delivered sample analysis — document the concentration discrepancies.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 74,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'analyzing chemical input discrepancies');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      if (!G.flags) G.flags = {};
      if (G.flags.met_jorin) {
        const result = rollD20('craft', (G.skills.craft || 0) + Math.floor(G.level / 3));
        if (result.total >= 12) {
          G.lastResult = `The discrepancies form a clear pattern: a specific compound in each input batch arrives at 60-70% of the declared concentration. The removed portion isn't degradation — Jorin's analysis shows the reduction is deliberate, precise, and consistent across six months. The extracted compound fraction would accumulate to significant quantities over time. Someone isn't just using Craftspire's supply chain for delivery — they're extracting material from it.`;
          G.flags.found_chemical_discrepancy = true;
          addJournal('investigation', 'Chemical inputs: deliberate 30-40% extraction from specific compound class — supply chain used as material extraction mechanism', `craftspire-chemical-${G.dayCount}`);
        } else {
          G.lastResult = `The discrepancy exists but reading the chemical analysis requires Jorin's expertise. He can confirm the pattern — you need his guidance to interpret the data.`;
        }
      } else {
        G.lastResult = `Without Jorin's cooperation, accessing the guild's incoming material analysis requires senior guild credentials you don't have.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 3. CLUE: WHAT THE EXTRACTED COMPOUND DOES
  {
    label: "Ask Jorin to explain what the extracted compound fraction would be used for — determine what's being accumulated.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 76,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(76, 'identifying extracted compound purpose');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      if (!G.flags) G.flags = {};
      if (G.flags.met_jorin) {
        G.lastResult = `Jorin spends twenty minutes with his reference materials before answering. "At these concentrations and this volume, you'd use it for one of two things: atmospheric processing — specifically dome filtration systems — or as a precursor for certain reactive compounds." He pauses. "If it's being accumulated for atmospheric processing, whoever is accumulating it has access to industrial-scale dome infrastructure. If it's for reactive compound synthesis, then someone is building something I don't want to think about." He marks which category is more consistent with the volume extracted.`;
        G.flags.identified_compound_purpose = true;
        addJournal('investigation', 'Extracted compound: accumulation volume consistent with dome filtration use OR reactive compound synthesis — industrial-scale implication', `craftspire-compound-purpose-${G.dayCount}`);
      } else {
        G.lastResult = `Interpreting the compound's purpose requires Jorin's expertise. You need to build that relationship first.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 4. INVESTIGATION: THE SUPPLY CHAIN ORIGIN
  {
    label: "Trace the chemical supply chain backwards — find where the modification is happening before delivery to Craftspire.",
    tags: ['Investigation', 'Systems', 'Stage1', 'Meaningful'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'tracing supply chain modification point');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 13) {
        G.lastResult = `The supply chain has a three-stage process: production facility, transit waystation, final delivery. Comparing analysis samples from each stage: the compound is at full concentration at the production facility and at the waystation's intake. It arrives at the waystation's output at 60-70%. The modification happens at the waystation between intake and output processing. The waystation is the extraction point.`;
        if (!G.flags) G.flags = {};
        G.flags.found_modification_point = true;
        addJournal('investigation', 'Supply chain: modification happens at transit waystation between intake and output — extraction infrastructure in place there', `craftspire-supply-chain-${G.dayCount}`);
      } else {
        G.lastResult = `The supply chain data requires access to the waystation's own records to complete the comparison. You can identify the modification is happening somewhere in transit but not precisely where.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 5. ARCHETYPE-GATED: READING CRAFTSPIRE
  {
    label: "Walk Craftspire's guild district at production hours — read what the workshop activity tells you.",
    tags: ['Investigation', 'Archetype', 'Stage1', 'Meaningful'],
    xpReward: 67,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(67, 'reading guild district activity');
      const arch = G.archetype && G.archetype.group;

      if (arch === 'combat') {
        G.lastResult = `The workshops produce components that are shipped out as civilian goods but the tolerance specifications you can see on discarded test pieces are military-grade. These aren't commercial products with commercial specifications. Someone is producing precision components for non-commercial applications through a commercial manufacturing front.`;
      } else if (arch === 'magic') {
        G.lastResult = `Three workshops have ventilation modifications that weren't in the original guild construction plans. The modifications channel specific chemical vapors away from the work floor more aggressively than standard safety requirements dictate. These workshops are processing something that produces more reactive output than their official product category would generate.`;
      } else if (arch === 'stealth') {
        G.lastResult = `The loading dock has a second exit that routes through a storage building before reaching the main delivery road. Standard deliveries use the direct exit. A small number of crates use the indirect route. The indirect route bypasses the guild's standard outgoing inspection point. Someone built an uninspected exit into Craftspire's production flow.`;
      } else {
        G.lastResult = `Two workshop masters avoid each other in the guild common area despite having adjacent workshops. Their assistants interact normally. Whatever divided the masters happened recently and specifically — it's not general hostility, it's specific knowledge. One of them knows something about the other's work that they haven't shared with guild administration.`;
      }
      addJournal('investigation', 'Guild district: military-tolerance products, ventilation modifications, uninspected exit route, masters in conflict', `craftspire-district-read-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 6. FACTION SEED: WARDEN ORDER INDUSTRIAL COMPLIANCE
  {
    label: "Report the chemical input modification to the Warden Order's industrial compliance officer stationed at the guild registry.",
    tags: ['Faction', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'making Warden Order contact');
      if (!G.factionHostility) G.factionHostility = { warden_order: 0, iron_compact: 0, oversight_collegium: 0 };

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `Compliance officer Bren receives the information with controlled attention. "Compound extraction from a registered supply chain would constitute material interference with licensed production." He asks specific questions about the extraction volume and compound class. "If your identification is accurate, this enters a different category than simple supply chain fraud." He gives you a case number and says someone will contact you. The Warden Order knows what the compound class implies — their questions confirmed it.`;
        if (!G.flags) G.flags = {};
        G.flags.met_warden_order_craftspire = true;
        G.factionHostility.warden_order += 1;
        addJournal('faction', 'Warden Order compliance officer Bren: compound class triggers elevated response, case opened — Warden Order knows the implications', `craftspire-warden-${G.dayCount}`);
      } else {
        G.lastResult = `The compliance officer takes the written summary and says it will be reviewed. Standard processing. No immediate escalation.`;
        if (!G.flags) G.flags = {};
        G.flags.attempted_warden_order_craftspire = true;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 7. SOCIAL: THE WAYSTATION WORKER
  {
    label: "Travel to the transit waystation and speak to a worker who handles the chemical processing stage.",
    tags: ['Social', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'interviewing waystation worker');

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `Handler Pell works the waystation output line and has noticed the concentration changes but assumed it was degradation. "Materials lose potency in transit sometimes. We're told to log it as transit variance." He shows you the log: every batch he processes gets "transit variance" applied as a standard notation. He was trained to record the reduction without flagging it. The log category exists specifically to normalize the extraction. The documentation system was designed to absorb the evidence.`;
        if (!G.flags) G.flags = {};
        G.flags.met_pell_waystation = true;
        addJournal('contact', 'Waystation handler Pell: "transit variance" log category normalizes extraction — trained to record without flagging, documentation designed to absorb evidence', `craftspire-pell-${G.dayCount}`);
      } else {
        G.lastResult = `The waystation is under guild contract administration and workers aren't authorized to speak with non-guild parties about processing procedures without supervisor approval.`;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // 8. MORAL PRESSURE: JORIN'S CHOICE
  {
    label: "Jorin asks whether he should file a formal guild complaint or keep documenting quietly — his workshop is at risk either way.",
    tags: ['Moral', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 65,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(65, 'Jorin evidence decision');
      if (!G.flags) G.flags = {};

      G.lastResult = `Jorin's dilemma is real. A formal complaint puts his documentation into the guild record — which is controlled by the same administration that designed the "transit variance" log category. A quiet continuation of his personal record-keeping keeps him operational but doesn't advance the investigation. He's been holding this for four months. He wants someone to tell him whether what he's doing is enough or whether he needs to risk more.`;
      G.flags.stage1_evidence_decision = 'pending';
      G.flags.stage1_moral_npc = 'Jorin';
      addJournal('consequence', 'Jorin formal complaint decision pending — guild system may absorb or suppress his records', `craftspire-jorin-decision-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 9. INVESTIGATION: THE TRANSIT VARIANCE LOG ORIGIN
  {
    label: "Determine when and why the 'transit variance' log category was created in the waystation documentation system.",
    tags: ['Investigation', 'Systems', 'Stage1', 'Meaningful'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'tracing transit variance log category origin');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 13) {
        G.lastResult = `The transit variance category was added to the waystation log format seven months ago — one month before the first chemical input discrepancy appeared in Jorin's records. The category addition was authorized by a supply chain standards update issued by a "regional materials coordination body" that has no public registration in guild records. The documentation system was prepared to receive the extraction evidence before the extraction began.`;
        if (!G.flags) G.flags = {};
        G.flags.traced_variance_log_origin = true;
        addJournal('investigation', 'Transit variance log: created one month before extraction began, authorized by unregistered "regional materials coordination body"', `craftspire-variance-origin-${G.dayCount}`);
      } else {
        G.lastResult = `The log format history exists but the authorization documentation for category additions is in the waystation's internal administrative records — not accessible through guild channels.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 10. ATMOSPHERE: THE GUILD HALL
  {
    label: "Attend the guild's weekly master briefing — observe how the guild discusses production standards.",
    tags: ['WorldColor', 'Lore', 'Stage1', 'Meaningful'],
    xpReward: 50,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(50, 'attending guild briefing');

      G.lastResult = `The briefing covers quotas, delivery timelines, and safety compliance. It does not cover chemical input quality or compound concentration standards. These topics are listed on the agenda but marked "deferred pending standards review." This is the fourth consecutive briefing where the chemical standards discussion has been deferred. Either there's genuine standards uncertainty, or someone is ensuring the topic doesn't receive collective guild attention. The guild is being kept from discussing what Jorin has been documenting.`;
      addJournal('discovery', 'Guild briefing: chemical input quality deferred for fourth consecutive meeting — collective discussion being suppressed', `craftspire-briefing-${G.dayCount}`);
      G.recentOutcomeType = 'explore'; maybeStageAdvance();
    }
  },

  // 11. INVESTIGATION: THE UNINSPECTED EXIT
  {
    label: "Follow the uninspected exit route from the loading dock — determine where crates that use it are going.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 73,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(73, 'tracking uninspected exit destination');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('stealth', (G.skills.stealth || 0) + Math.floor(G.level / 3));
      if (result.isCrit) {
        G.lastResult = `You follow a crate through the uninspected exit route to a staging yard two streets from the guild. The yard is commercial storage on record — available for hire — but it's been continuously occupied by the same party for eight months. The crates entering the yard don't have outgoing transit manifests. They're being held in the yard, not shipped onward. Whatever is being accumulated here hasn't reached its destination yet. The accumulation is ongoing.`;
        if (!G.flags) G.flags = {};
        G.flags.found_accumulation_yard = true;
        addJournal('discovery', 'Uninspected exit destination: staging yard accumulating unmarked crates for 8 months — accumulation ongoing, no outgoing manifests', `craftspire-exit-route-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The exit route leads to commercial storage, but you can't get close enough to identify the specific yard or its contents without risk of detection.`;
      } else {
        G.lastResult = `You're spotted following the route and the cart detours. Your surveillance was noticed. The route monitoring is active.`;
        if (!G.worldClocks) G.worldClocks = {};
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 2;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 12. PERSONAL ARC: SECURE JORIN'S RECORDS
  {
    label: "Help Jorin create a secure copy of his six-month chemical input analysis for safekeeping outside the guild.",
    tags: ['PersonalArc', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 67,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(67, 'securing Jorin\'s analysis records');
      if (!G.flags) G.flags = {};

      const result = rollD20('stealth', (G.skills.stealth || 0) + Math.floor(G.level / 3));
      if (result.total >= 10) {
        G.lastResult = `Jorin's records are dense with chemical notation — readable to a guild chemist, dense enough to look like routine analysis documentation to anyone else. You carry a copy out in plain sight in a supply manifest folder. Nobody stops you. The six months of compound discrepancy analysis is now outside the guild's administrative reach.`;
        G.flags.jorin_records_secured = true;
        addJournal('consequence', 'Jorin\'s six-month chemical analysis secured offsite — compound discrepancy data preserved outside guild administration', `craftspire-records-secure-${G.dayCount}`);
      } else {
        G.lastResult = `The guild's outgoing paperwork goes through a review process that would flag non-standard documentation. Getting Jorin's records out requires either a trusted personal carrier or a document format that doesn't look like what it is.`;
      }
      G.recentOutcomeType = 'stealth'; maybeStageAdvance();
    }
  },

  // 13. RUMOR LAYER
  {
    label: "Ask around the guild district for rumors about what's changed in the production environment recently.",
    tags: ['Investigation', 'Rumor', 'Stage1', 'Meaningful'],
    xpReward: 60,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(60, 'gathering guild rumors');

      const rumors = [
        'three workshop masters were asked to reduce their quality documentation frequency "to streamline administration"',
        'a new supply contract was signed without guild membership vote — which violates the guild charter',
        'Jorin was offered a workshop expansion grant if he dropped his material quality concern',
        'someone from outside the guild has been attending production floor walkthroughs — nobody knows who authorized their access'
      ];
      const selected = rumors[Math.floor(Math.random() * rumors.length)];

      G.lastResult = `Guild district whisper: "${selected}." The pattern of suppression extends further than Jorin's specific complaint.`;
      addJournal('investigation', `Craftspire guild rumor: "${selected}"`, `craftspire-rumor-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 14. INVESTIGATION: THE OTHER AFFECTED GUILDS
  {
    label: "Contact guild masters at other Craftspire workshops — determine if the chemical input modification affects multiple production lines.",
    tags: ['Investigation', 'Networks', 'Stage1', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'investigating other affected guilds');

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `Two other workshop masters have noticed the same concentration discrepancies. Neither filed a complaint: one was told it was standard transit degradation; the other was quietly offered a contract extension and didn't connect the two events. The extraction affects at least three workshops using the same supply chain. The scope is larger than Jorin realized — the compound is being extracted from multiple product lines simultaneously, which dramatically increases the accumulation volume.`;
        if (!G.flags) G.flags = {};
        G.flags.found_multi_workshop_extraction = true;
        addJournal('investigation', 'Multi-workshop extraction: three workshops affected simultaneously — accumulation volume dramatically larger than single-source estimate', `craftspire-multi-workshop-${G.dayCount}`);
      } else {
        G.lastResult = `Other workshop masters are cautious about sharing internal production data with someone outside their specific guild registration. Jorin's endorsement would help.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 15. SOCIAL: THE ASSISTANT WHO NOTICED
  {
    label: "Speak to Jorin's youngest workshop assistant — ask what they've seen that Jorin might have missed.",
    tags: ['Social', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 64,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(64, 'speaking to Jorin\'s assistant');

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 10) {
        G.lastResult = `Lev has been watching the production inputs for three months on Jorin's behalf. "The deliveries come from a cart that's different from the regular supply wagon. Same company name on the side, different wheel configuration. Different horses." He's been noting physical characteristics Jorin's analysis doesn't capture. "The different cart only runs on days the concentration is lower. It's a separate delivery operation running under the same supplier name." There's a parallel delivery system using the legitimate supplier's identity.`;
        if (!G.flags) G.flags = {};
        G.flags.met_lev_assistant = true;
        addJournal('contact', 'Assistant Lev: parallel delivery cart identified — different vehicle, same supplier name, only runs on extraction days', `craftspire-lev-${G.dayCount}`);
      } else {
        G.lastResult = `The assistant is loyal to Jorin and won't discuss workshop business with someone Jorin hasn't explicitly vouched for.`;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // 16. ATMOSPHERE: THE GUILD FORGE AT NIGHT
  {
    label: "Stay near Craftspire's central forge through the late evening — observe what production continues after official hours.",
    tags: ['WorldColor', 'Lore', 'Stage1', 'Meaningful'],
    xpReward: 50,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(50, 'observing forge after hours');

      G.lastResult = `The official workshops go dark at ninth bell. The central forge continues. Work under special production contracts runs late — this is standard in guild culture, unremarkable. But tonight the materials being processed are different from today's registered production runs. The forge is running off the official schedule. Whatever this production is, it isn't being counted in tomorrow morning's yield report.`;
      addJournal('discovery', 'Craftspire central forge: off-schedule production runs after official close — material processed not in registered production runs', `craftspire-forge-night-${G.dayCount}`);
      G.recentOutcomeType = 'explore'; maybeStageAdvance();
    }
  },

  // 17. INVESTIGATION: ACCUMULATION VOLUME ESTIMATE
  {
    label: "Work with Jorin to calculate the total compound accumulated over six months across all affected workshops.",
    tags: ['Investigation', 'Craft', 'Stage1', 'Meaningful'],
    xpReward: 73,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(73, 'calculating total accumulation volume');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      if (!G.flags) G.flags = {};
      if (G.flags.met_jorin) {
        const result = rollD20('craft', (G.skills.craft || 0) + Math.floor(G.level / 3));
        if (result.total >= 12) {
          G.lastResult = `Jorin's six months plus the other two workshops' data: approximately 340 kilograms of concentrated compound extracted. At dome filtration application rates, this is enough to process fifteen to twenty dome atmospheres. At reactive compound synthesis rates, Jorin goes quiet for a long time. "That's not a small operation," he finally says. "Whatever they're building, they've been preparing for it for at least six months and they have industrial-scale capacity." He looks disturbed. "This needs to go to Shelkopolis. This is bigger than Craftspire."`;
          G.flags.calculated_accumulation = true;
          addJournal('discovery', '340kg extracted over 6 months: enough for 15-20 dome atmospheres or large-scale reactive synthesis — Jorin confirms this needs Shelkopolis', `craftspire-volume-${G.dayCount}`);
        } else {
          G.lastResult = `The calculation is complex and Jorin needs more time with the data. Come back after he's worked through the numbers.`;
        }
      } else {
        G.lastResult = `This calculation requires Jorin's expertise. Without him, the volume estimate is too rough to be meaningful.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 18. WORLD COLOR: CRAFTSPIRE'S FOUNDING GUILD CHARTER
  {
    label: "Read the guild founding charter displayed in Craftspire's main hall — understand what the guild was built for.",
    tags: ['WorldColor', 'Lore', 'Stage1', 'Meaningful'],
    xpReward: 48,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(48, 'reading guild founding charter');

      G.lastResult = `The charter begins: "We make things that work, correctly, every time. The guild's obligation is precision in service of those who depend on what we produce." Below that: "What leaves this guild does what it was made to do. Our name on a product is a guarantee." The founding charter is a precision ethic. The current chemical extraction uses the guild's supply chain as a mechanism while producing something that the guild didn't agree to make and doesn't know it's making. The founding guarantee has been subverted from within.`;
      addJournal('discovery', 'Guild founding charter: precision ethic — "what leaves this guild works correctly." Supply chain subversion violates founding purpose.', `craftspire-charter-${G.dayCount}`);
      G.recentOutcomeType = 'explore'; maybeStageAdvance();
    }
  },

  // 19. PERSONAL ARC: TRAVEL DECISION
  {
    label: "Decide whether to go to Shelkopolis with Jorin's evidence or continue gathering more data at Craftspire.",
    tags: ['PersonalArc', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 65,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(65, 'travel decision point');
      if (!G.flags) G.flags = {};

      G.lastResult = `You have: Jorin's chemical analysis, the accumulation volume estimate, the transit variance log origin, the waystation modification point, and the staging yard location. What you don't have: the identity of the compound's destination, the authorization chain behind the regional materials coordination body, and whether the accumulation is complete or ongoing. More time in Craftspire fills those gaps. But every day here is a day the accumulation continues and reaches its endpoint faster.`;
      G.flags.craftspire_travel_decision_reached = true;
      addJournal('consequence', 'Travel decision point: sufficient evidence assembled, accumulation ongoing — proceed to Shelkopolis or continue gathering', `craftspire-travel-decision-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 20. SHADOW RIVAL INTRO
  {
    label: "Jorin mentions someone visited the workshop six weeks ago claiming to be a quality standards auditor — their questions weren't about quality standards.",
    tags: ['Rival', 'Warning', 'Stage1', 'Meaningful'],
    xpReward: 57,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(57, 'receiving rival warning');
      if (!G.flags) G.flags = {};

      const arch = G.archetype && G.archetype.group;
      if (arch === 'combat') {
        G.lastResult = `"They asked which other guilds shared our supply chain," Jorin says. "All of them, every one, systematically. They were mapping the full scope of the extraction network before anyone here had figured out it was a network." Military-scale threat assessment. They weren't investigating — they were cataloguing.`;
      } else if (arch === 'magic') {
        G.lastResult = `"They identified the compound class immediately," Jorin says. "Before I'd explained what I'd found. They said 'that's a class-C atmospheric precursor' the moment I described the concentration pattern. Expert-level knowledge. They came to confirm what they already knew."`;
      } else if (arch === 'stealth') {
        G.lastResult = `"They memorized the workshop layout during the tour," Jorin says. "I caught them mentally noting the storage positions, the exit routes, the blind spots. Not hostile — professional. The way someone learns a space they expect to need to navigate quickly."`;
      } else {
        G.lastResult = `"They asked about Jorin specifically," his assistant Lev interjects. "Whether he worked alone. Whether he shared findings with guild administration. Whether his position was secure." They were mapping Jorin's vulnerability — whether he could be isolated, pressured, or managed.`;
      }

      G.lastResult += ` They knew about the extraction six weeks before you arrived. They came here first.`;
      if (!G.rivalId) {
        if (arch === 'combat') G.rivalId = 'warden_captain';
        else if (arch === 'magic') G.rivalId = 'archivist_veld';
        else if (arch === 'stealth') G.rivalId = 'shadow_broker';
        else G.rivalId = 'provost_lenn';
      }
      addJournal('warning', 'Rival-adjacent operative visited Craftspire workshop 6 weeks ago — expert compound knowledge, full-scope network mapping', `craftspire-rival-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  }
];
window.CRAFTSPIRE_STAGE1_ENRICHED_CHOICES = CRAFTSPIRE_STAGE1_ENRICHED_CHOICES;
