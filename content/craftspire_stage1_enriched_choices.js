/**
 * CRAFTSPIRE STAGE 1 ENRICHED MEANINGFUL CHOICES
 * 20 investigation paths grounded in guild workshop secrets and chemical input irregularities
 * Craftspire: a guild manufacturing hub where the inputs for something dangerous are being quietly assembled
 * Named NPC: Jorin Ledgermere (the guild workshop master who first noticed the chemical input anomalies)
 */

var CRAFTSPIRE_STAGE1_ENRICHED_CHOICES = [

  // 1. FIRST ENCOUNTER: JORIN
  {
    plot: 'main',
    label: "An unofficial complaint about chemical anomalies was filed four months ago. He's still here.",
    skill: 'charm',
    tags: ['Investigation', 'NPC', 'Stage1', 'Meaningful'],
    failResult: "The workshop is running at full pace — a press cycle turning, two apprentices logging tolerance marks, the air sharp with flux. Jorin is at the calibration bench with both hands occupied and a queue of three behind you. He doesn't look up. The break schedule is posted on the door: second bell, sixth bell. The analysis sheets are visible on the back table. Come back when the bench is clear.",
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'meeting Jorin the workshop master');
      if (!G.flags) G.flags = {};

      const result = rollD20('charm', (G.skills.charm || 0));
      if (result.total >= 11) {
        G.lastResult = `Jorin runs his thumb along a component on the work bench before he answers — habit, checking tolerance. "Four months of receiving inputs that test at sixty to seventy percent of declared concentration. I've checked my instruments. I've checked my analysis process." He sets the component down. The workshop smells of hot metal and flux, the kind of smell that settles into clothing. "Same base compounds. Correct labeling. Wrong amounts. Someone upstream is removing material before delivery and it's happening every batch, on a schedule." He already knows it's deliberate. He needed someone to tell him what to do with that knowledge.`;        G.flags.met_jorin = true;
        addJournal('Workshop master Jorin Ledgermere met: chemical input modifications documented — deliberate concentration changes across supply chain', 'contact_made', `craftspire-jorin-${G.dayCount}`);
      } else {
        G.lastResult = `Jorin is mid-run on a precision fabrication when you arrive — he holds up one finger without looking up from the calibration gauge. The workshop is loud with controlled heat and the metallic bite of flux. When the gauge settles he sets it down carefully and says break periods are at the second and sixth bell. "Come back then." He goes back to the bench. He noticed you come in, checked your hands, checked your boots, and went back to work. The analysis sheets on the bench behind him go back six months — they're in plain sight.`;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // 2. CLUE: CHEMICAL INPUT RECORDS
  {
    plot: 'main',
    label: "The manifests say one concentration. The samples test at another. Someone is doing the math.",
    skill: 'spirit',
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    failResult: "The records office clerk closes the window at the third bell — midday processing, back at the fourth. The analysis sheets are filed under Jorin's member number and require his signature for outside access. The data exists. The route to it runs through Jorin, who takes his break at the second and sixth bell. Neither window has passed yet.",
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
        const result = rollD20('spirit', (G.skills.spirit || 0));
        if (result.total >= 12) {
          G.lastResult = `Jorin's analysis sheets go back six months, each batch logged by delivery date, declared concentration, and measured concentration. The gap is always 30-40%, always in the same compound class, always precise to within two percentage points. "Degradation is irregular," Jorin says. "This is consistent. The precision tells you it's controlled." He taps the most recent entry. The extracted fraction, accumulated over six months, isn't incidental material loss. Someone is running a separate extraction operation through Craftspire's supply chain and the supply chain is the mechanism.`;
          G.flags.found_chemical_discrepancy = true;
          addJournal('Chemical inputs: deliberate 30-40% extraction from specific compound class — supply chain used as material extraction mechanism', 'evidence', `craftspire-chemical-${G.dayCount}`);
        } else {
          G.lastResult = `Jorin's analysis sheets are spread across the bench in order — six months of entries, columns of compound codes and concentration figures marked in his careful hand. The numbers are legible. The gap between declared and measured concentration is visible on almost every page. Whether that gap represents standard transit loss, instrument error, or something deliberate requires the kind of trained judgment that comes from years at a fabrication bench. The data is in front of you. The interpretation isn't yours to make.`;
        }
      } else {
        G.lastResult = `The guild records office window has a clerk behind it and a printed access policy tacked to the counter face. Incoming material analysis is held for registered members and credentialed inspectors. The precision workshop's records are filed under Jorin's member number. The clerk confirms this without looking up from her work. She's answered this question before. The analysis sheets exist, their location is no secret, and the route to them runs entirely through Jorin — who takes his break at the second and sixth bell.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 3. CLUE: WHAT THE EXTRACTED COMPOUND DOES
  {
    label: "Jorin knows the compound class. He hasn't said yet what that volume would build.",
    skill: 'wits',
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    failResult: "Jorin sets the reference volume back on the shelf without opening it. He hasn't decided yet what a visitor he met this morning is owed. The workshop smells of hot metal and flux, the forge outside steady. His notation is precise. His trust takes longer. The break at the sixth bell is a better moment — the floor empties and the work floor is quiet enough for a longer conversation.",
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
        addJournal('Extracted compound: accumulation volume consistent with dome filtration use OR reactive compound synthesis — industrial-scale implication', 'evidence', `craftspire-compound-purpose-${G.dayCount}`);
      } else {
        G.lastResult = `The compound code from Jorin's analysis sheets sits at the top of each entry page — a four-character designation that maps to a specific substance class in the guild's reference system. The reference volumes are on the shelf behind Jorin's bench, thick with notation and margin marks from years of use. Reading the code takes a moment. Understanding what its extracted volume implies — atmospheric processing, reactive synthesis, something else entirely — takes training that takes years. Jorin has it. He hasn't decided yet what he owes a visitor he met this morning.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 4. INVESTIGATION: THE SUPPLY CHAIN ORIGIN
  {
    plot: 'main',
    label: "The compound leaves at full concentration. It arrives short. Something happens in between.",
    skill: 'wits',
    tags: ['Investigation', 'Systems', 'Stage1', 'Meaningful'],
    failResult: "The production facility's output records come back clean — full concentration at source, well-documented. The gap sits somewhere in the middle. The waystation intake records are under the supply contractor's internal administration, not publicly filed. Two clean endpoints establish the problem. What sits between them is still closed. The contractor's guild registration has a contact office with a public address.",
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'tracing supply chain modification point');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('wits', (G.skills.wits || 0));
      if (result.total >= 13) {
        G.lastResult = `The supply chain runs in three stages: production, waystation, delivery. You get sample analysis from each stage — production facility output is full concentration, waystation intake is full concentration. Waystation output is 60-70%. The gap appears between waystation intake and output. Whatever processing happens in that building is removing material and passing the remainder forward as if nothing changed. The waystation is the extraction point. The operation is running inside a legitimate transit facility.`;
        if (!G.flags) G.flags = {};
        G.flags.found_modification_point = true;
        addJournal('Supply chain: modification happens at transit waystation between intake and output — extraction infrastructure in place there', 'evidence', `craftspire-supply-chain-${G.dayCount}`);
      } else {
        G.lastResult = `The production facility's output records come back clean — full concentration at source, documented and dated. Jorin's delivery logs show the gap at the Craftspire end. The middle stage is the problem: waystation intake versus output. Those records are under the supply contractor's internal administration — not available to guild parties, not publicly filed. You can establish where the modification isn't happening. The waystation sits in the gap between two clean data points, its own records out of reach, the extraction point obvious by elimination.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 5. ARCHETYPE-GATED: READING CRAFTSPIRE
  {
    label: "The district runs on a tight production clock. What's happening doesn't match the schedule.",
    skill: 'wits',
    tags: ['Investigation', 'Archetype', 'Stage1', 'Meaningful'],
    failResult: "The district moves on a synchronized clock — shift bells, production rotations, inspection rounds. The posted schedule is accurate as far as it goes. Reading the gaps in it, the unmarked movements and the workshop activity that falls outside the posted timetable, requires more time on the floor than one pass allows. The sixth bell shift change opens a longer observation window.",
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
      addJournal('Guild district: military-tolerance products, ventilation modifications, uninspected exit route, masters in conflict', 'evidence', `craftspire-district-read-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 6. FACTION SEED: WARDEN ORDER INDUSTRIAL COMPLIANCE
  {
    label: "The Union's materials compliance officer is at the guild registry. This needs to go there.",
    skill: 'charm',
    tags: ['Faction', 'NPC', 'Stage1', 'Meaningful'],
    failResult: "The compliance officer takes the written summary, stamps it received, and adds it to a tray with twelve other items. No questions asked. The compound class code is in the documentation — if he read it, the intake category would shift from standard supply fraud to material interference. The tray moves on a weekly review cycle. Naming the compound class explicitly in person, rather than in a filed form, changes who processes the response.",
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'making Union compliance contact');
      if (!G.factionHostility) G.factionHostility = { warden_order: 0, iron_compact: 0, oversight_collegium: 0 };

      const result = rollD20('charm', (G.skills.charm || 0));
      if (result.total >= 12) {
        G.lastResult = `Bren writes as you speak. He asks three questions: volume extracted per batch, compound class code, duration of documented extraction. He writes each answer without comment. When you finish he puts down the pen and says "material interference with licensed production" without inflection — he's reading from a category in his head. He opens a case file. "If the compound class is what you're indicating, this is elevated above standard supply fraud." He gives you a case number and tells you someone will be in touch. He doesn't say when. The case number is already filed.`;
        if (!G.flags) G.flags = {};
        G.flags.met_warden_order_craftspire = true;
        G.factionHostility.warden_order += 1;
        addJournal('Union compliance officer Bren: compound class triggers elevated response, case opened — Union authority knows the implications', 'intelligence', `craftspire-warden-${G.dayCount}`);
      } else {
        G.lastResult = `The compliance officer takes the written summary, initials the intake log, and stamps it received. "Standard supply chain discrepancies are reviewed in the order received." He adds it to a tray. The tray has twelve items in it already. He doesn't ask any questions, which means either the summary didn't contain enough to prompt them or nobody in that office knows what the compound class implies. Jorin's documentation includes the compound class code — with that specific code named, the intake category changes from supply fraud to material interference.`;
        if (!G.flags) G.flags = {};
        G.flags.attempted_warden_order_craftspire = true;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 7. SOCIAL: THE WAYSTATION WORKER
  {
    label: "The extraction happens at the waystation. Someone logs the numbers every day and knows it.",
    skill: 'charm',
    tags: ['Social', 'NPC', 'Stage1', 'Meaningful'],
    failResult: "The waystation supervisor stops you before you reach the processing floor. Workers under guild contract administration require a two-day approval form for non-guild inquiries. You can see the processing line from the gate — one handler keeps glancing toward the log form on his bench, its 'transit variance' column visible from here. The form is at the gate office. Jorin's endorsement bypasses the approval requirement entirely.",
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'interviewing waystation worker');

      const result = rollD20('charm', (G.skills.charm || 0));
      if (result.total >= 11) {
        G.lastResult = `Pell has the flat patience of someone who's had the same conversation with himself many times. "We measure intake and output. The number goes down sometimes. We log it transit variance and move the batch forward." He shows you the log form — a pre-printed category, stamped in the margin. "I was trained to use this column when the concentration drops. I asked why once. They told me it's standard for this compound class in transit." He knows you're going to tell him it isn't standard. He already suspects it isn't. He kept logging anyway because stopping would require him to say what he suspected in writing.`;
        if (!G.flags) G.flags = {};
        G.flags.met_pell_waystation = true;
        addJournal('Waystation handler Pell: "transit variance" log category normalizes extraction — trained to record without flagging, documentation designed to absorb evidence', 'contact_made', `craftspire-pell-${G.dayCount}`);
      } else {
        G.lastResult = `The waystation supervisor intercepts you before you reach the processing floor. Workers on the output line are under guild contract administration — inquiries from non-guild parties require a supervisor approval form, minimum two-day processing. You can submit the form at the gate office. You do. The workers on the floor keep their eyes on the line. They heard the exchange. One of them — Pell, by the work placement — looks up briefly and then goes back to the gauge. The "transit variance" column on the form he's writing in is visible from here.`;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // 8. MORAL PRESSURE: JORIN'S CHOICE
  {
    label: "Jorin's been quiet for four months. He needs to know if that still holds.",
    tags: ['Moral', 'Evidence', 'Confrontation', 'Stage1'],
    xpReward: 65,
    failResult: function() {
      addNarration('', 'Jorin\'s bench in the calibration bay sits beside the materials yards entry — workshop foreman two benches down, a junior journeyman at the gauge rail behind. Jorin sets the notebook face-down without turning a page and shakes his head once. The bench rail catches a half-meter of flux dust before the next shift bell. The conversation does not happen.', 'failure');
      loadStageChoices(G.location);
    },
    effects: [
      { type: 'heat', polity: 'union', amount: 1 },
      { type: 'rival', amount: 1 }
    ],
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(65, 'Jorin evidence decision');
      if (!G.flags) G.flags = {};

      G.lastResult = `Jorin sets his notebook on the bench and asks the question flatly, like a technical specification. "Formal complaint: my documentation enters the guild record. The guild record runs through the same administration that created the transit variance category. Quiet continuation: I keep logging, the extraction continues, no institutional response." He picks up a component, turns it, sets it down. "Four months I've been doing the quiet version. I need to know if that's still the right call." He's not asking for reassurance. He's asking for a decision framework from someone who can see the whole picture.`;
      G.flags.stage1_evidence_decision = 'pending';
      G.flags.stage1_moral_npc = 'Jorin Ledgermere';
      addJournal('Jorin formal complaint decision pending — guild system may absorb or suppress his records', 'complication', `craftspire-jorin-decision-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 9. INVESTIGATION: THE TRANSIT VARIANCE LOG ORIGIN
  {
    label: "The 'transit variance' category exists to absorb this. Someone created it. Someone authorized it.",
    tags: ['Investigation', 'Systems', 'Stage1', 'Meaningful'],
    failResult: "The waystation log form has a version date in the footer — the category addition happened between two version numbers, seven months ago by the date sequence. Who authorized the revision is in the supply contractor's internal administrative records. Those files don't run through guild channels. The contractor's registration is filed with the guild — the registered contact office has a name and an address attached to it.",
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'tracing transit variance log category origin');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('wits', (G.skills.wits || 0));
      if (result.total >= 13) {
        G.lastResult = `The transit variance category was added to the waystation log format seven months ago — one month before the first chemical input discrepancy appeared in Jorin's records. The category addition was authorized by a supply chain standards update issued by a "regional materials coordination body" that has no public registration in guild records. The documentation system was prepared to receive the extraction evidence before the extraction began.`;
        if (!G.flags) G.flags = {};
        G.flags.traced_variance_log_origin = true;
        addJournal('Transit variance log: created one month before extraction began, authorized by unregistered "regional materials coordination body"', 'evidence', `craftspire-variance-origin-${G.dayCount}`);
      } else {
        G.lastResult = `The waystation log format has a version date printed in the footer of each page — a reference number that changes when the form is revised. Pell's oldest log sheets use a different version than the current forms. The category addition happened between those two versions, seven months ago by the date sequence. Who authorized the revision is in the waystation's internal administrative records, filed under the supply contractor's management. Guild channels don't reach those files. The supply contractor's registration is filed with the guild — the registered contact office has a name attached.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 10. ATMOSPHERE: THE GUILD HALL
  {
    label: "The guild's weekly master briefing is where production standards get discussed. Or don't.",
    tags: ['WorldColor', 'Lore', 'Stage1', 'Meaningful'],
    failResult: "The briefing hall fills quickly — masters take their seats by seniority, apprentices stand along the back wall, the air carrying the familiar sawdust-and-flux smell that follows every workshop in the district. The session runs long on delivery quotas. The chemical standards item on the agenda is marked deferred before you can hear it discussed. Fourth consecutive deferral, according to the master next to you. The posted agenda for next week is already up.",
    xpReward: 50,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(50, 'attending guild briefing');

      G.lastResult = `The briefing covers quotas, delivery timelines, and safety compliance. It does not cover chemical input quality or compound concentration standards. These topics are listed on the agenda but marked "deferred pending standards review." This is the fourth consecutive briefing where the chemical standards discussion has been deferred. Either there's genuine standards uncertainty, or someone is ensuring the topic doesn't receive collective guild attention. The guild is being kept from discussing what Jorin has been documenting.`;
      addJournal('Guild briefing: chemical input quality deferred for fourth consecutive meeting — collective discussion being suppressed', 'discovery', `craftspire-briefing-${G.dayCount}`);
      G.recentOutcomeType = 'explore'; maybeStageAdvance();
    }
  },

  // 11. INVESTIGATION: THE UNINSPECTED EXIT
  {
    label: "Some crates leave through a route that bypasses inspection entirely. That gap wasn't an accident.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    failResult: "The loading dock is active during the late afternoon shift — carts moving, handlers calling counts, the inspection table staffed and watching outbound loads. The uninspected exit through the storage building runs when the dock is quieter. The transition between the fourth and fifth bell produces a gap in cart traffic. The dock layout is fixed. The window to observe the alternate route without drawing attention from the inspection desk opens then.",
    xpReward: 73,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(73, 'tracking uninspected exit destination');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('finesse', (G.skills.finesse || 0));
      if (result.isCrit) {
        G.lastResult = `You follow a crate through the uninspected exit route to a staging yard two streets from the guild. The yard is commercial storage on record — available for hire — but it's been continuously occupied by the same party for eight months. The crates entering the yard don't have outgoing transit manifests. They're being held in the yard, not shipped onward. Whatever is being accumulated here hasn't reached its destination yet. The accumulation is ongoing.`;
        if (!G.flags) G.flags = {};
        G.flags.found_accumulation_yard = true;
        addJournal('Uninspected exit destination: staging yard accumulating unmarked crates for 8 months — accumulation ongoing, no outgoing manifests', 'discovery', `craftspire-exit-route-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The uninspected exit runs two streets east before the cart turns into a block of commercial storage buildings — windowless single-story structures, each with a padlock and a lease placard. The block has six units. From the street, there's no way to identify which unit the cart uses without getting close to the buildings, and the loading area has clear sightlines in both directions. The destination is in that block. Getting to it without someone on the cart noticing you requires a different approach than following from behind.`;
      } else {
        G.lastResult = `Halfway down the second street, the cart slows. The driver doesn't turn around — just pauses at the junction longer than a route decision requires, then takes a different turn than expected. By the time you reach the corner the cart is gone, and the block of storage buildings is two streets in the wrong direction. Someone on that cart knew to look for a tail. The route is monitored, and now they know someone is watching it.`;
        if (!G.worldClocks) G.worldClocks = {};
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 2;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 12. PERSONAL ARC: SECURE JORIN'S RECORDS
  {
    label: "Jorin's six-month analysis needs a secure copy outside the guild.",
    skill: 'finesse',
    tags: ['PersonalArc', 'Evidence', 'Stage1'],
    xpReward: 67,
    failResult: function() {
      addNarration('', 'The guild\'s outgoing review desk sits at the main exit — clerk at the stamps tray, manifest checklist clipped to the desk corner. A senior factor stands beside the clerk discussing the day\'s outgoing parcels. The analysis sheets in the supply folder cannot pass the desk while the factor is present. You step back into the materials yards.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(67, 'securing Jorin\'s analysis records');
      if (!G.flags) G.flags = {};

      const result = rollD20('finesse', (G.skills.finesse || 0));
      if (result.total >= 10) {
        G.lastResult = `Jorin's records are dense with chemical notation — readable to a guild chemist, dense enough to look like routine analysis documentation to anyone else. You carry a copy out in plain sight in a supply manifest folder, tucked between delivery receipts, the paper still carrying the faint metallic bite of the workshop's flux-heavy air. Nobody at the outgoing review desk looks twice. Six months of compound discrepancy analysis now sits outside the guild's administrative reach, in hands the supply chain cannot touch.`;
        G.flags.jorin_records_secured = true;
        addJournal('Jorin\'s six-month chemical analysis secured offsite — compound discrepancy data preserved outside guild administration', 'evidence', `craftspire-records-secure-${G.dayCount}`);
      } else {
        G.lastResult = `The guild's outgoing review desk sits at the main exit — a table with a stamps tray and a clerk who checks outgoing documentation against a manifest checklist. Jorin's analysis sheets are the right format for guild records; the problem is that anyone who reads them will recognize what they are. Getting them past that desk means either a carrier the desk knows and doesn't inspect closely, or a document format that passes a visual check without inviting a second look. Jorin's assistant Lev makes a regular run to the materials depot — he carries guild documentation without going through the review desk.`;
      }
      G.recentOutcomeType = 'stealth'; maybeStageAdvance();
    }
  },

  // 13. RUMOR LAYER
  {
    label: "The workers know something changed. They haven't said it in front of the wrong person.",
    skill: 'wits',
    tags: ['Investigation', 'Rumor', 'Stage1', 'Meaningful'],
    failResult: "The common area is busy between shifts — workers at the water basin, two apprentices running a manifest to the next workshop, the smell of cooling metal following everyone in. Conversations cut short when someone unfamiliar sits too close. The afternoon break runs longer and looser. Come back when the district has its rhythm back and the faces at the table recognize yours.",
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

      G.lastResult = `Guild district whisper, repeated at the water basin between the second and third bell while the smell of cooling metal drifted in from the forge yard: "${selected}." The worker who said it kept their eyes on the floor drain. The pattern of suppression extends further than Jorin's specific complaint — whatever is driving it reaches across the whole district, and the people closest to the production floor have been watching it build for months without a name to put to it.`;
      addJournal(`Craftspire guild rumor: "${selected}"`, 'evidence', `craftspire-rumor-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 14. INVESTIGATION: THE OTHER AFFECTED GUILDS
  {
    label: "Jorin isn't the only master on this chain. The others receive from the same source.",
    skill: 'charm',
    tags: ['Investigation', 'Networks', 'Stage1', 'Meaningful'],
    failResult: "Two workshop masters listen to the question, both of them with the same flat pause before answering. Internal production data is registered guild information — sharing it with an outside party requires formal authorization or a personal reason to trust. One master says nothing and tilts his head toward Jorin's workshop across the district. His endorsement is what opens this door.",
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'investigating other affected guilds');

      const result = rollD20('charm', (G.skills.charm || 0));
      if (result.total >= 12) {
        G.lastResult = `Two other workshop masters have noticed the same concentration discrepancies. Neither filed a complaint: one was told it was standard transit degradation; the other was quietly offered a contract extension and didn't connect the two events. The extraction affects at least three workshops using the same supply chain. The scope is larger than Jorin realized — the compound is being extracted from multiple product lines simultaneously, which dramatically increases the accumulation volume.`;
        if (!G.flags) G.flags = {};
        G.flags.found_multi_workshop_extraction = true;
        addJournal('Multi-workshop extraction: three workshops affected simultaneously — accumulation volume dramatically larger than single-source estimate', 'evidence', `craftspire-multi-workshop-${G.dayCount}`);
      } else {
        G.lastResult = `Two workshop masters listen to the question, both of them with the same flat pause before answering. Internal production data — inputs, concentrations, batch records — is registered guild information. Sharing it with someone outside their specific registration requires either a formal authorization or a personal reason to trust. One master points at Jorin's workshop across the district and says nothing else. His endorsement is what opens this door. Without it, both masters go back to their benches.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 15. SOCIAL: THE ASSISTANT WHO NOTICED
  {
    label: "Jorin tracks the numbers. His assistant tracks the deliveries. Different parts of the same problem.",
    skill: 'charm',
    tags: ['Social', 'NPC', 'Stage1', 'Meaningful'],
    failResult: "Lev is sorting sample containers at the far end of the workshop, methodical, not looking up. He listens to the first question and looks toward the main bench. 'I don't talk about what goes on in here without Jorin knowing about it.' He turns back to the containers. The hiss of the cooling rack fills the silence. He's not hostile. Jorin's word changes that calculation entirely.",
    xpReward: 64,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(64, 'speaking to Jorin\'s assistant');

      const result = rollD20('charm', (G.skills.charm || 0));
      if (result.total >= 10) {
        G.lastResult = `Lev has been watching the production inputs for three months on Jorin's behalf. "The deliveries come from a cart that's different from the regular supply wagon. Same company name on the side, different wheel configuration. Different horses." He's been noting physical characteristics Jorin's analysis doesn't capture. "The different cart only runs on days the concentration is lower. It's a separate delivery operation running under the same supplier name." There's a parallel delivery system using the legitimate supplier's identity.`;
        if (!G.flags) G.flags = {};
        G.flags.met_lev_assistant = true;
        addJournal('Assistant Lev: parallel delivery cart identified — different vehicle, same supplier name, only runs on extraction days', 'contact_made', `craftspire-lev-${G.dayCount}`);
      } else {
        G.lastResult = `Lev is at the far end of the workshop sorting incoming sample containers when you approach. He listens to the first question, then looks toward the main bench where Jorin works. "I don't talk about what goes on in here without Jorin knowing about it." He turns back to the containers. The workshop smells of flux and ground mineral, and the hiss of the cooling rack fills the silence. He's not hostile. He's careful. Jorin's endorsement changes that calculation — Lev watches the deliveries that Jorin doesn't see.`;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // 16. ATMOSPHERE: THE GUILD FORGE AT NIGHT
  {
    label: "The forge doesn't stop at closing. Something runs after the bell.",
    skill: 'wits',
    tags: ['WorldColor', 'Lore', 'Stage1', 'Meaningful'],
    failResult: "The guild district winds down in layers after ninth bell — first the small workshops, then the secondary forges, finally the apprentice dormitory lights. The central forge stays lit. Whatever continues tonight does so without an audience. The approach routes to the forge yard are narrow and the smell of hot metal carries far in still air. The north alley stays in shadow until the tenth bell lamp rotation.",
    xpReward: 50,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(50, 'observing forge after hours');

      G.lastResult = `The official workshops go dark at ninth bell. The central forge continues. Work under special production contracts runs late — this is standard in guild culture, unremarkable. But tonight the materials being processed are different from today's registered production runs. The forge is running off the official schedule. Whatever this production is, it isn't being counted in tomorrow morning's yield report.`;
      addJournal('Craftspire central forge: off-schedule production runs after official close — material processed not in registered production runs', 'discovery', `craftspire-forge-night-${G.dayCount}`);
      G.recentOutcomeType = 'explore'; maybeStageAdvance();
    }
  },

  // 17. INVESTIGATION: ACCUMULATION VOLUME ESTIMATE
  {
    label: "Six months of extraction from three workshops. The accumulated volume needs a number behind it.",
    skill: 'spirit',
    tags: ['Investigation', 'Craft', 'Stage1', 'Meaningful'],
    failResult: "Jorin spreads the data across the bench and works through it in silence — columns of compound codes, batch schedules, concentration differentials. The forge outside runs steady. He shakes his head once without explaining. The calculation takes what it takes, and rushing it produces a wrong number dressed as a reliable one. Come back when he's had time with the figures.",
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
        const result = rollD20('spirit', (G.skills.spirit || 0));
        if (result.total >= 12) {
          G.lastResult = `Jorin's six months plus the other two workshops' data: approximately 340 kilograms of concentrated compound extracted. At dome filtration application rates, this is enough to process fifteen to twenty dome atmospheres. At reactive compound synthesis rates, Jorin goes quiet for a long time. "That's not a small operation," he finally says. "Whatever they're building, they've been preparing for it for at least six months and they have industrial-scale capacity." He looks disturbed. "This needs to go to Shelkopolis. This is bigger than Craftspire."`;
          G.flags.calculated_accumulation = true;
          addJournal('340kg extracted over 6 months: enough for 15-20 dome atmospheres or large-scale reactive synthesis — Jorin confirms this needs Shelkopolis', 'discovery', `craftspire-volume-${G.dayCount}`);
        } else {
          G.lastResult = `Jorin spreads the data across the bench and starts working through it — adding columns, adjusting for the other workshops' batch schedules, rechecking the compound class rates. The forge outside runs steady, and the workshop fills with the quiet sounds of someone working a problem that has no shortcuts. He shakes his head once without explaining. This calculation takes what it takes. Come back when he's had time with the numbers.`;
        }
      } else {
        G.lastResult = `The compound extraction rates, batch volumes, and concentration differentials are in the analysis sheets. Running them to a total accumulation estimate requires knowing the specific compound class's density ratios and extraction efficiency at this process temperature — figures that live in the reference volumes on Jorin's shelf, not in anything available from the outside. The data to do this calculation exists. The expertise to run it correctly is his. Without Jorin, any number produced here is a guess dressed as a figure.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 18. WORLD COLOR: CRAFTSPIRE'S FOUNDING GUILD CHARTER
  {
    label: "The founding charter is on display. What the guild was built for may not match.",
    tags: ['WorldColor', 'Lore', 'Stage1', 'Meaningful'],
    failResult: "The main hall is occupied with a certification review — three masters at the central table, a stack of portfolios, an apprentice standing at the edge of the room trying not to look like she's counting the minutes. The founding charter hangs in its frame on the far wall, readable from here at a distance: the opening line begins 'We make things that work.' The hall clears after the review panel concludes.",
    xpReward: 48,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(48, 'reading guild founding charter');

      G.lastResult = `The charter begins: "We make things that work, correctly, every time. The guild's obligation is precision in service of those who depend on what we produce." Below that: "What leaves this guild does what it was made to do. Our name on a product is a guarantee." The founding charter is a precision ethic. The current chemical extraction uses the guild's supply chain as a mechanism while producing something that the guild didn't agree to make and doesn't know it's making. The founding guarantee has been subverted from within.`;
      addJournal('Guild founding charter: precision ethic — "what leaves this guild works correctly." Supply chain subversion violates founding purpose.', 'discovery', `craftspire-charter-${G.dayCount}`);
      G.recentOutcomeType = 'explore'; maybeStageAdvance();
    }
  },

  // 19. PERSONAL ARC: TRAVEL DECISION
  {
    label: "Every day here is a day the supply chain keeps running. This doesn't wait.",
    tags: ['PersonalArc', 'Evidence', 'Stage1'],
    xpReward: 65,
    failResult: function() {
      addNarration('', 'The Material Ledger Office at end-of-shift has the day\'s receipts piled at the duty registrar\'s elbow and a senior journeyman waiting at the counter for a stamp. The travel route binder hangs on the back wall. You cannot reach the binder without crossing the registrar\'s sightline. The decision sheet stays unsigned today.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(65, 'travel decision point');
      if (!G.flags) G.flags = {};

      G.lastResult = `You have: Jorin's chemical analysis, the accumulation volume estimate, the transit variance log origin, the waystation modification point, and the staging yard location. What you don't have: the identity of the compound's destination, the authorization chain behind the regional materials coordination body, and whether the accumulation is complete or ongoing. More time in Craftspire fills those gaps. But every day here is a day the accumulation continues and reaches its endpoint faster.`;
      G.flags.craftspire_travel_decision_reached = true;
      addJournal('Travel decision point: sufficient evidence assembled, accumulation ongoing — proceed to Shelkopolis or continue gathering', 'complication', `craftspire-travel-decision-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 20. SHADOW RIVAL INTRO
  {
    label: "Someone came six weeks ago asking the same questions. The answers were already built in.",
    tags: ['Rival', 'Warning', 'Stage1', 'Meaningful'],
    xpReward: 57,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(57, 'receiving rival warning');
      if (!G.flags) G.flags = {};

      const arch = G.archetype && G.archetype.group;
      if (arch === 'combat') {
        G.lastResult = `"They asked which other guilds shared our supply chain," Jorin says, his thumb pressing a crease into the edge of a log sheet. "All of them, every one, systematically. They were mapping the full scope of the extraction network before anyone here had figured out it was a network." He sets the sheet down. The forge outside runs its steady low roar. "Not asking around — working a list. Military-scale threat assessment. They weren't finding this. They were cataloguing what they already had."`;
      } else if (arch === 'magic') {
        G.lastResult = `"They identified the compound class immediately," Jorin says, voice flat as a calibration reading. "Before I'd explained what I'd found — before I'd named the substance at all. They said 'that's a class-C atmospheric precursor' the moment I described the concentration pattern. Just said it, the way you read a measurement aloud." He picks up a pen and sets it down without writing anything. The workshop smells of flux and cool metal. "Expert-level knowledge. They came to confirm what they already knew. Nothing I told them was new."`;
      } else if (arch === 'stealth') {
        G.lastResult = `"They memorized the workshop layout during the tour," Jorin says, speaking toward the workbench rather than at you. "I caught it — the small pause at each storage bay, the way their eyes moved to the exit points before the equipment. Not hostile. Professional." He runs a finger along the bench edge. The lamp oil smoke drifts flat under the high vaulted ceiling. "The way someone learns a space they expect to need to navigate quickly, and under pressure. They weren't admiring the forge. They were planning through it."`;
      } else {
        G.lastResult = `"They asked about Jorin specifically," his assistant Lev interjects, not looking up from the sample containers he's sorting. "Whether he worked alone. Whether he shared findings with guild administration before filing. Whether his workshop position was secure or conditional." He clicks a lid closed. The cooling rack hisses in the background. "They weren't asking about the chemicals. They were mapping whether Jorin could be isolated from his evidence before it went anywhere — whether he could be pressured, managed, or just quietly moved."`;
      }

      G.lastResult += ` They knew about the extraction six weeks before you arrived. They came here first.`;
      if (!G.rivalId) {
        if (arch === 'combat') G.rivalId = 'warden_captain';
        else if (arch === 'magic') G.rivalId = 'archivist_veld';
        else if (arch === 'stealth') G.rivalId = 'shadow_broker';
        else G.rivalId = 'provost_lenn';
      }
      G.flags.stage1_rival_seeded = true;
      addJournal('Rival-adjacent operative visited Craftspire workshop 6 weeks ago — expert compound knowledge, full-scope network mapping', 'complication', `craftspire-rival-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },
  // TYPE: INFORMATION — WORLD COLOR VIGNETTE (no skill check)
  {
    label: "Same guild mark on every door. The ink shade shifts block by block.",
    tags: ['WorldColor', 'Atmosphere', 'Stage1'],
    xpReward: 40,
    failResult: function() {
      addNarration('', 'A registry clerk steps out of a north-end workshop with a renewal stamp kit in hand and crosses the lane toward the next doorframe. The lane is too narrow to stand and study the marks without standing in her path. You step into the chalk gate alcove and let her pass.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(40, 'observing guild mark variation');
      G.lastResult = `Guild marks at Craftspire are stamped by the administration, not applied by the member — the stamp comes with registration, and renewal stamps arrive on the same schedule for every workshop in the district. But the ink color drifts slightly building by building: workshops near the north end run darker, a richer black that holds its tone in direct light. Workshops toward the commercial corridor fade faster, a warmer shade that reads as brown in overcast. The same guild, the same mark, applied with different materials over the years as supply contracts changed. The consistency of the symbol and the drift of its execution sit in the same doorframe.`;
      addJournal('Craftspire guild mark ink variation: supply contract changes visible in mark color across district blocks', 'discovery', `craftspire-guildmark-${G.dayCount}`);
      G.recentOutcomeType = 'observe'; maybeStageAdvance();
    }
  },

  // TYPE: INFORMATION — ARCHETYPE GATE (Craft-heavy: Artificer/Engineer/Alchemist)
  {
    label: "The ventilation spacing in this workshop doesn't match any standard guild safety specification.",
    tags: ['Information', 'Craft', 'Stage1', 'ArchetypeGate'],
    failResult: "The ventilation layout is unusual — ducts running at angles that serve no obvious function in a standard chemical processing environment. The configuration is specific to something. Without the material science to read what that something is, the oddity sits as an oddity. Someone who knew compound density ranges and atmospheric containment specifications would read this space differently.",
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      const family = typeof getArchetypeFamily === 'function' ? getArchetypeFamily(G.archetype) : '';
      if (family !== 'Craft-heavy') {
        G.lastResult = `The workshop ventilation layout is unusual — ducts running at steep angles across the upper wall, the metal housing newer than the surrounding brickwork, the seams still sharp where older lime plaster was cut to fit them. Standard workshop ventilation runs along the ceiling line to catch heat rise. These run low and lateral, pulling air from the floor level. Whatever purpose the configuration serves, it isn't the standard safety spec posted on the wall beside the entry. You note the oddity and move on. Someone who knew the material science would read this space with considerably more alarm.`;
        gainXp(30, 'noting unusual workshop configuration');
        G.recentOutcomeType = 'observe'; maybeStageAdvance(); return;
      }
      gainXp(72, 'analyzing workshop ventilation layout');
      G.stageProgress[1]++;
      G.lastResult = `The duct spacing is calibrated for a specific compound density range — not the declared inputs, which are light enough to disperse with standard flow rates. These vents handle something heavier. The configuration is consistent with processing a material that needs controlled atmospheric containment to prevent accumulation at floor level. Someone fitted this workshop for a material class the guild's declared operations don't include. The ghost of that specification is built into the walls.`;
      if (!G.flags) G.flags = {};
      G.flags.craftspire_vent_analysis = true;
      addJournal('Workshop ventilation layout: calibrated for undeclared heavy-compound processing — ghost specification in infrastructure', 'evidence', `craftspire-vents-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // TYPE: INFORMATION — BACKGROUND FLAVOR
  {
    label: "The supply manifest register uses a shorthand nobody on staff can fully decode anymore.",
    tags: ['Information', 'Background', 'Stage1'],
    xpReward: 55,
    failResult: function() {
      addNarration('', 'The Material Ledger Office\'s manifest counter is closed for the noon recalibration — the duty registrar at the next desk over points at the locked drawer and shrugs. The old register sits behind the panel-frame door, and the recalibration bell hasn\'t rung yet. You leave your name on the inquiry slip.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(55, 'reading supply manifest shorthand');
      const bg = G.background || '';
      let result = `The supply manifest register runs twelve years deep, and the shorthand system in the earliest entries belongs to a clerk who left the guild before most of the current staff arrived. Three symbols repeat at irregular intervals — not weekly, not seasonal, not tied to any batch cycle visible in the adjacent columns. The current registrar can identify most of the notation, but those three marks appear in her reference guide with the notation "purpose unclear." Someone documented a pattern. The documentation outlasted the documentation's author.`;
      if (bg === 'merchant' || bg === 'guild') {
        result = `The supply manifest register shorthand is in a style you recognize from early guild training documents — old Compact notation, standard before the administrative reform that simplified record-keeping across member workshops. The three recurring symbols are Compact-era cost-shifting markers: material reported under one line item but charged against another. Deliberate obfuscation built into the notation system itself, from before the current guild administration.`;
      }
      G.lastResult = result;
      addJournal('Craftspire supply manifest: three recurring undecoded symbols at irregular intervals — possible cost-shifting notation', 'intelligence', `craftspire-manifest-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // TYPE: INFORMATION — RISKY
  {
    label: "The guild archive's restricted section has a public-facing index that lists what's sealed and why.",
    tags: ['Information', 'Risky', 'Records', 'Stage1'],
    failResult: "The index is available at the reading desk, but the sealing authority citations use abbreviations whose reference glossary is itself in the restricted section. A designation code appears nine times across the recent entries — no corresponding name in the administrative directory on this side of the counter. The code appears somewhere in the guild's external registration records, which are public by charter and held at the main registry window.",
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'reading restricted archive index');
      const result = rollD20('wits', (G.skills.wits || 0));
      if (result.total >= 12) {
        G.lastResult = `The restricted section index is public by charter — sealed documents must have their titles and sealing authorities listed, even if the contents aren't accessible. Seventeen entries in the past two years. Nine cite a single authority reference: a designation code rather than a named office. The code doesn't appear in the guild's own administrative directory. Whatever sealed those nine documents has no official name in this building's records.`;
        if (!G.flags) G.flags = {};
        G.flags.craftspire_archive_code = true;
        addJournal('Guild restricted archive: 9 documents sealed under unidentified authority code — code absent from administrative directory', 'evidence', `craftspire-archive-${G.dayCount}`);
      } else {
        G.lastResult = `The index is available at the reading desk — a clerk slides it across without being asked, which means this request happens often enough to be routine. The entries are legible but the sealing authority citations use abbreviations. The reference glossary for those abbreviations is itself in the restricted section. The sealing authority code appears nine times. That code must appear somewhere in the guild's external registration records, which are public by charter.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // TYPE: INFORMATION — BOLD
  {
    label: "The outgoing ledger has a column that doesn't appear on the incoming side.",
    tags: ['Information', 'Bold', 'Records', 'Stage1'],
    failResult: "Cross-referencing two ledgers simultaneously requires working space and uninterrupted time that the reading desk doesn't allow — clerks cycle records back to storage after twenty minutes of external review. A full comparison needs either a longer access window or a copy of both ledgers to work from outside the building. The reading desk opens at the first bell. Arriving before the morning rush gives twice the standard access window.",
    xpReward: 78,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(78, 'cross-referencing supply ledgers');
      const result = rollD20('wits', (G.skills.wits || 0));
      if (result.total >= 14) {
        G.lastResult = `The incoming supply ledger tracks material in nine columns: origin, carrier, declared weight, tested weight, compound class, batch code, destination workshop, transit duration, and authorization number. The outgoing ledger tracks eight of the same — but adds a column that doesn't appear on the receiving end: a secondary destination field, listed after the workshop destination, filled in for exactly the batches where tested weight falls below declared weight. Whatever is being extracted from those batches has a logged destination. The column exists. Nobody mentioned it.`;
        if (!G.flags) G.flags = {};
        G.flags.craftspire_secondary_destination = true;
        addJournal('Supply ledger asymmetry: outgoing records carry secondary destination column absent from receiving ledger — logs where extracted material goes', 'evidence', `craftspire-ledger-${G.dayCount}`);
      } else {
        G.lastResult = `Cross-referencing two ledgers simultaneously requires working space and time the reading desk doesn't allow — clerks cycle the records back to storage after twenty minutes of external review, the policy printed on a placard bolted to the counter. A full comparison needs a longer window than today's access permits, or a copy of both ledgers to work from outside the building. The lamp oil smoke sits in flat layers under the archive's high ceiling. The access exists. Arriving at the first bell, before the morning rush fills every desk, gives twice the standard window.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // TYPE: INFORMATION — SAFE/LORE
  {
    label: "Forty years of charter amendments. Something changed in materials licensing fifteen years ago.",
    tags: ['Information', 'Safe', 'Lore', 'Stage1'],
    failResult: "The amendment logs are in the archive's open-access section — forty years of charter revisions, each session dated and numbered. The materials licensing amendments are in volume three of five. The volume is currently in use by a guild solicitor who has the reading desk until the end of the hour. The clerk marks your name on the wait list. The relevant amendment is in the last third of the volume.",
    xpReward: 58,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(58, 'reviewing guild charter amendment history');
      G.lastResult = `Fifteen years back, the materials licensing section of the guild charter was amended to add a clause permitting temporary non-disclosure of compound inputs during "active external partnership agreements." The clause runs three lines. The amendment was passed during a session with two-thirds attendance — below the standard quorum for charter revisions, but within the emergency provision threshold. The partnership agreement category it creates has no corresponding definition in the charter itself. It permits secrecy. It doesn't define what secrecy is permitted for.`;
      addJournal('Guild charter amendment: 15-year-old clause permitting compound input non-disclosure during undefined "partnership agreements" — passed below standard quorum', 'evidence', `craftspire-charter-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // TYPE: INFORMATION — SAFE/ATMOSPHERE
  {
    label: "The afternoon shift change produces thirty seconds of complete quiet across the whole district.",
    tags: ['WorldColor', 'Atmosphere', 'Stage1'],
    xpReward: 35,
    failResult: function() {
      addNarration('', 'The queue court is full when the second bell hits — a delivery cart wedged against the chalk gate boards, two carriers arguing over a damaged seal at the centre of the court. The cumulative quiet of the district is buried under the immediate noise of the dispute. You can\'t hear the pause from inside it.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(35, 'observing guild district shift rhythm');
      G.lastResult = `At the second bell past midday, every workshop in the district pauses together — the guild shift rotation is synchronized by charter, every operation running on the same production clock. For thirty seconds the district is quiet in a way a single workshop going still never produces: the accumulated absence of a hundred processes at once. Ventilation fans spinning down, press mechanisms cycling off, burners reducing. Then the incoming shift arrives at their benches and the district comes back up in layers, workshop by workshop, until the noise is indistinguishable from the noise before. The pause happens every day. Most of the district's workers have stopped noticing it.`;
      G.recentOutcomeType = 'observe'; maybeStageAdvance();
    }
  },

  // TYPE: INFORMATION — SOCIAL/RISKY
  {
    label: "Known for thoroughness. She stopped filing inspection reports eight months ago.",
    tags: ['Information', 'Risky', 'NPC', 'Stage1'],
    failResult: "Miv Sothrel's door is closed during morning rounds — she moves workshop to workshop on a fixed inspection schedule and her desk sits empty until early afternoon. The inspection forms stacked on her desk are visible through the window: organized, dated, the filing tray on the left side unused. She's back at her desk by the second bell past midday.",
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'speaking with quality standards officer');
      const result = rollD20('charm', (G.skills.charm || 0));
      if (result.total >= 11) {
        G.lastResult = `Miv Sothrel keeps her inspection forms current on the desk — filled in, dated, organized by workshop in the sequence she visits them. She doesn't file them anymore. "I filed six reports with findings. Three were returned with the notation 'unsubstantiated.' Two were not acknowledged. One was acknowledged and the finding was removed from the version that entered the permanent record." She taps the stack. "These are accurate. What's in the archive isn't." She files accurate records for herself now. She stopped feeding the official version eight months ago.`;
        if (!G.flags) G.flags = {};
        G.flags.met_miv_sothrel = true;
        addJournal('Quality inspector Miv Sothrel: filing accurate records privately after official archive began removing her findings 8 months ago', 'evidence', `craftspire-miv-${G.dayCount}`);
      } else {
        G.lastResult = `Miv Sothrel's desk is visible from the corridor — the inspection forms stacked in precise order, a filing tray on the left that appears never to be used. When you knock she answers without moving toward the door. "Inspection inquiries go through the guild administrative desk." She doesn't look up from the form she's completing. The administrative desk already told you it has no pending inspection requests on file. The gap between those two statements is somewhere in this office.`;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // TYPE: INFORMATION — BOLD/COMBAT-GATE
  {
    label: "New hasp on a locked supply room that doesn't match the building's age.",
    tags: ['Information', 'Bold', 'Stage1'],
    xpReward: 75,
    failResult: function() {
      addNarration('', 'The northern annex corridor terminates at a bonded-store bay with two wardens on patrol — they pass the door on a tight rotation that overlaps at the new hasp every four minutes. The corridor lamp throws your shadow long across the boards each time you shift. You back to the inner courtyard before the next pass.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(75, 'examining northern annex storage');
      const result = rollD20('finesse', (G.skills.finesse || 0));
      if (result.total >= 13) {
        G.lastResult = `The annex room holds sealed containers — same locking mechanism as standard Compact export containers, which Craftspire doesn't use for internal storage. Twelve of them, stacked in two rows, each one weight-marked in the corner with a figure well above standard compound batches. The material inside has been consolidated from dispersed extraction into transit-ready packaging. Whatever has been removed from the workshop supply chains is staged here for collection. A collection that hasn't happened yet.`;
        if (!G.flags) G.flags = {};
        G.flags.craftspire_staging_found = true;
        addJournal('Northern annex: 12 sealed export containers with above-standard weight markings — extracted material staged for collection', 'evidence', `craftspire-annex-${G.dayCount}`);
      } else {
        G.lastResult = `The annex corridor has two guild wardens on rotation — not posted at the room itself, but covering the access from both approaches. The new hasp on the storage room door and the guard rotation weren't here last month; something changed the security requirement recently. The room is accessible during the shift transition window, when the rotation handover moves both wardens to the same end of the corridor. That window is twelve minutes and it happens once per day.`;
      }
      G.recentOutcomeType = 'stealth'; maybeStageAdvance();
    }
  },

{
  label: 'The notice board has recent postings.',
  tags: ['social'],
  xpReward: 5,
  fn: function() {
    var key = 'rumor_drawn_' + G.location + '_' + G.dayCount;
    if (G.flags[key]) {
      G.lastResult = 'The board has nothing new since this morning. A guild inspection schedule, a materials delivery notice, and a certification amendment from yesterday still occupy the lower half, their edges lifting slightly in the dry forge-warm air that moves through the district at this hour. The lamp oil smoke from the overhead fixtures drifts past without settling. Nothing worth copying down, and nobody has added anything since the shift change. The board will turn over again at the sixth bell.';
      return;
    }
    G.flags[key] = true;
    drawLocalityRumor(G.location);
  }
}
];
window.CRAFTSPIRE_STAGE1_ENRICHED_CHOICES = CRAFTSPIRE_STAGE1_ENRICHED_CHOICES;
