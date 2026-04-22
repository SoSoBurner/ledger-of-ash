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
        G.lastResult = `Jorin runs his thumb along a component on the work bench before he answers — habit, checking tolerance. "Four months of receiving inputs that test at sixty to seventy percent of declared concentration. I've checked my instruments. I've checked my analysis process." He sets the component down. The workshop smells of hot metal and flux, the kind of smell that settles into clothing. "Same base compounds. Correct labeling. Wrong amounts. Someone upstream is removing material before delivery and it's happening every batch, on a schedule." He already knows it's deliberate. He needed someone to tell him what to do with that knowledge.`;        G.flags.met_jorin = true;
        addJournal('contact', 'Workshop master Jorin met: chemical input modifications documented — deliberate concentration changes across supply chain', `craftspire-jorin-${G.dayCount}`);
      } else {
        G.lastResult = `Jorin is mid-run on a precision fabrication when you arrive — he holds up one finger without looking up from the calibration gauge. The workshop is loud with controlled heat and the metallic bite of flux. When the gauge settles he sets it down carefully and says break periods are at the second and sixth bell. "Come back then." He goes back to the bench. He noticed you come in, checked your hands, checked your boots, and went back to work. He's thorough by habit.`;
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
          G.lastResult = `Jorin's analysis sheets go back six months, each batch logged by delivery date, declared concentration, and measured concentration. The gap is always 30-40%, always in the same compound class, always precise to within two percentage points. "Degradation is irregular," Jorin says. "This is consistent. The precision tells you it's controlled." He taps the most recent entry. The extracted fraction, accumulated over six months, isn't incidental material loss. Someone is running a separate extraction operation through Craftspire's supply chain and the supply chain is the mechanism.`;
          G.flags.found_chemical_discrepancy = true;
          addJournal('investigation', 'Chemical inputs: deliberate 30-40% extraction from specific compound class — supply chain used as material extraction mechanism', `craftspire-chemical-${G.dayCount}`);
        } else {
          G.lastResult = `The incoming analysis sheets are readable — columns of numbers, compound codes, concentration readings — but interpreting whether the gap between declared and measured concentration is significant, deliberate, or within acceptable variance requires Jorin's expertise. You can see the numbers. You can't yet say what they mean without him.`;
        }
      } else {
        G.lastResult = `The incoming material analysis is held in the guild's records office, restricted to registered guild members and credentialed inspectors. Without Jorin's cooperation — he's the member on record for the precision workshop — you can't get the sheets. The guild registry clerk tells you this with the practiced patience of someone who says it regularly.`;
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
        G.lastResult = `Jorin takes his reference texts down from the shelf — three volumes, the kind that live on a work bench rather than a display shelf — and goes through them methodically. Twenty minutes of quiet. The forge outside runs steady. Finally he closes the last volume and puts his hands flat on the table. "Two categories. Atmospheric dome filtration at industrial scale, or precursor synthesis for reactive compounds." He marks the volume page. "If it's filtration, whoever has this needs access to dome infrastructure I've never seen outside a major city. If it's synthesis —" He stops. He marks the page anyway. His handwriting is very precise.`;
        G.flags.identified_compound_purpose = true;
        addJournal('investigation', 'Extracted compound: accumulation volume consistent with dome filtration use OR reactive compound synthesis — industrial-scale implication', `craftspire-compound-purpose-${G.dayCount}`);
      } else {
        G.lastResult = `The compound code from Jorin's analysis sheets is a technical reference — meaningful to a trained fabrication chemist, opaque without that training. You can read the code. You can't interpret whether its extracted volume implies atmospheric processing, reactive synthesis, or something else. Jorin has that expertise. He doesn't have a reason to share it with you yet.`;
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
        G.lastResult = `The supply chain runs in three stages: production, waystation, delivery. You get sample analysis from each stage — production facility output is full concentration, waystation intake is full concentration. Waystation output is 60-70%. The gap appears between waystation intake and output. Whatever processing happens in that building is removing material and passing the remainder forward as if nothing changed. The waystation is the extraction point. The operation is running inside a legitimate transit facility.`;
        if (!G.flags) G.flags = {};
        G.flags.found_modification_point = true;
        addJournal('investigation', 'Supply chain: modification happens at transit waystation between intake and output — extraction infrastructure in place there', `craftspire-supply-chain-${G.dayCount}`);
      } else {
        G.lastResult = `The production facility's output records are accessible. The final delivery analysis is in Jorin's logs. The middle stage — waystation intake versus output — requires the waystation's own processing records, which are under the supply contractor's internal administration and not available to guild parties. You can identify that the modification happens in transit. Pinpointing the waystation as the specific extraction point requires access you don't have yet.`;
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
        G.lastResult = `The discard bin outside workshop three holds test pieces — standard for quality checks. You pick one up. The tolerance markings are in a specification format you recognize: military-grade precision, tighter than anything civilian manufacturing requires. Commercial products built to these tolerances cost more to produce than the civilian market will pay for them. Someone is using this commercial workshop to produce components to military specification, shipping them as civilian goods, and using the guild registry as cover.`;
      } else if (arch === 'magic') {
        G.lastResult = `Three workshops in the eastern cluster have vent modifications — additional channels cut into the wall above the work floor, running at an angle that wasn't in the original guild construction. The modifications pull specific chemical vapors out more aggressively than standard safety ventilation requires. Whatever those three workshops are processing produces a more reactive vapor output than their registered product category would generate. The vents were added for something the registered work doesn't explain.`;
      } else if (arch === 'stealth') {
        G.lastResult = `The loading dock has two exits. The direct exit runs to the main delivery road and passes the guild's outgoing inspection point. The indirect exit routes through a storage building first — which bypasses inspection entirely. Standard shipments use the direct exit. A small number of crates, consistently lighter and uniformly packed, use the storage building route. The uninspected exit isn't an accident of layout. It was built into the dock's design with that specific gap in coverage.`;
      } else {
        G.lastResult = `The guild common area at the midday break: two workshop masters who run adjacent workshops haven't spoken to each other in three weeks. Their assistants move between shops freely, borrow tools, share the water basin. The masters eat at opposite ends of the table. Whatever separated them happened recently and specifically — it's not a long-standing disagreement. One of them learned something about the other's work and decided not to report it and is now carrying that decision with visible difficulty.`;
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
        G.lastResult = `Bren writes as you speak. He asks three questions: volume extracted per batch, compound class code, duration of documented extraction. He writes each answer without comment. When you finish he puts down the pen and says "material interference with licensed production" without inflection — he's reading from a category in his head. He opens a case file. "If the compound class is what you're indicating, this is elevated above standard supply fraud." He gives you a case number and tells you someone will be in touch. He doesn't say when. The case number is already filed.`;
        if (!G.flags) G.flags = {};
        G.flags.met_warden_order_craftspire = true;
        G.factionHostility.warden_order += 1;
        addJournal('faction', 'Warden Order compliance officer Bren: compound class triggers elevated response, case opened — Warden Order knows the implications', `craftspire-warden-${G.dayCount}`);
      } else {
        G.lastResult = `The compliance officer takes the written summary, initials the intake log, and stamps it received. "Standard supply chain discrepancies are reviewed in the order received." He adds it to a tray. The tray has twelve items in it already. He doesn't ask any questions, which means either the summary didn't contain enough to prompt them or nobody in that office knows what the compound class implies. Either way, the response is slow and procedural.`;
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
        G.lastResult = `Pell has the flat patience of someone who's had the same conversation with himself many times. "We measure intake and output. The number goes down sometimes. We log it transit variance and move the batch forward." He shows you the log form — a pre-printed category, stamped in the margin. "I was trained to use this column when the concentration drops. I asked why once. They told me it's standard for this compound class in transit." He knows you're going to tell him it isn't standard. He already suspects it isn't. He kept logging anyway because stopping would require him to say what he suspected in writing.`;
        if (!G.flags) G.flags = {};
        G.flags.met_pell_waystation = true;
        addJournal('contact', 'Waystation handler Pell: "transit variance" log category normalizes extraction — trained to record without flagging, documentation designed to absorb evidence', `craftspire-pell-${G.dayCount}`);
      } else {
        G.lastResult = `The waystation supervisor intercepts you before you reach the processing floor. Workers on the output line are under guild contract administration — inquiries from non-guild parties require a supervisor approval form, minimum two-day processing. You can submit the form at the gate office. You do. The workers on the floor keep their eyes on the line. They heard the exchange. One of them — Pell, by the work placement — looks up briefly and then goes back to the gauge.`;
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

      G.lastResult = `Jorin sets his notebook on the bench and asks the question flatly, like a technical specification. "Formal complaint: my documentation enters the guild record. The guild record runs through the same administration that created the transit variance category. Quiet continuation: I keep logging, the extraction continues, no institutional response." He picks up a component, turns it, sets it down. "Four months I've been doing the quiet version. I need to know if that's still the right call." He's not asking for reassurance. He's asking for a decision framework from someone who can see the whole picture.`;
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
