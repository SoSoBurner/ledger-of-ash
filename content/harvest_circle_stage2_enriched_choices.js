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
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
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
      const result = rollD20('vigor', (G.skills.survival||0) + Math.floor(G.level/3));
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
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_jorva_helmrune = true;
        G.investigationProgress++;
        G.lastResult = `Jorva squares the grievance file against the desk edge before she opens it — corner to corner, the motion practiced enough that it looks accidental. Inside: a witness statement from a commune elder who saw the shipment loaded. Containers with the same sealed charter mark Sable Ledgermere identified in Guildheart Hub. The elder will sign a formal statement. "The grievance has standing," Jorva says. She does not say how long the file has been squared on her desk, waiting.`;
        addJournal('Harvest Circle elder witnessed sealed charter containers — willing to provide formal statement', 'evidence', `har-jorva-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Jorva squares the closed grievance file against her desk edge — corner to corner, a motion she makes without looking. "Communal council review period. Thirty days minimum." Her hand stays on the file cover. "External parties access after review concludes." The file is within reach. She does not slide it toward you. She does not say which councilor holds the signing stamp, and her thumb does not leave the corner she has pressed into place.`;
        addJournal('Commune grievance review period — external access blocked pending council', 'complication', `har-jorva-fail-${G.dayCount}`);
      } else {
        G.flags.met_jorva_helmrune = true;
        G.investigationProgress++;
        G.lastResult = `Jorva squares the summary page against the desk edge before she slides it across — a small, corner-first gesture that lines the paper up exactly. The commune elder saw containers that were not agricultural materials. The restricted-storage violation is documented. "Active. Unresolved." She taps the corner once before her hand withdraws, and the file stays squared in front of you, waiting to be read.`;
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
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_elyra_mossbane = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `Elyra's thumb presses the supplier ledger flat against the counting table while she reads. She exhales through her nose — a small, controlled sound — and names the entry. "Northern Provision Compact." No registered trade agreement with Harvest Circle, no representative she has ever met, no fixed address in any supplier registry. Eight months of manifest entries. A fabricated entity. Her thumb does not lift from the cover while she says it.`;
        addJournal('Northern Provision Compact is fabricated supplier entity — 8 months of manifest use', 'evidence', `har-elyra-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Elyra's thumb flattens against the supplier ledger cover. She exhales through her nose — small, controlled — and does not lift her hand. "Patron-family confidentiality. I cannot waive it." The ledger stays closed under her palm. Her expression does not shift. The next customer in line has already stepped to the counter beside you, and Elyra's other hand is reaching for their tally sheet before yours has finished.`;
        addJournal('Patron-family supplier confidentiality — identification request refused', 'complication', `har-elyra-fail-${G.dayCount}`);
      } else {
        G.flags.met_elyra_mossbane = true;
        G.investigationProgress++;
        G.lastResult = `Elyra's thumb presses the supplier registry cover flat while she turns pages with her other hand. She exhales through her nose — small, controlled. "I've dealt with every northern supplier for twelve years. This name appeared on manifests I was copied on eight months ago. I don't know who it is." Her thumb does not lift. She has already looked for it before, and found the same absence.`;
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
      const result = rollD20('spirit', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_velrik_durnshade = true;
        G.investigationProgress++;
        G.lastResult = `The dispute involves a handling fee paid by one guild member to another for processing a sealed cargo batch — a fee that was not authorized by any guild contract. The payer was instructed to handle the cargo by a guild supervisor who has since left the commune. The cargo description matches suppression compound containers.`;
        addJournal('Guild dispute reveals unauthorized fee for handling suppression compound containers', 'evidence', `har-velrik-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The mediation chamber door is closed and the clerk at the outer desk does not look up until the third knock. Active proceedings, both parties still in session. No observer access, no summary disclosure, no record pull until the mediation concludes and a settlement is filed. The clerk sets a form on the counter for a formal access request. The processing queue runs three weeks.`;
        addJournal('Guild dispute under mediation confidentiality — access refused', 'complication', `har-velrik-fail-${G.dayCount}`);
      } else {
        G.flags.met_velrik_durnshade = true;
        G.investigationProgress++;
        G.lastResult = `The dispute file sits in a grey folder between two volumes on Velrik's shelf — not filed, not discarded. He sets it flat on the desk without opening it first. One member paid another for cargo handling using a payment method that bypasses the guild contract framework entirely. The payer's account log shows a notation in the margin: "per supervisor's instruction." The supervisor named left the commune four months ago. Velrik's finger stays on the margin note. "Someone wanted this kept off the standard books," he says.`;
        addJournal('Guild accounting irregularity — off-books cargo handling payment', 'evidence', `har-velrik-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Elyra keeps her supplier ledger face-down when I approach — she knows I've seen the name.",
    tags: ['stage2', 'harvest_circle', 'npc_escalation'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var roll = rollD20('charm', G.skills.persuasion);
      if (roll.total >= 13) {
        G.flags.elyra_agenda_revealed = true;
        G.investigationProgress++;
        addNarration(
          'The Ledger She Won\'t Open',
          'Elyra does not look up when you stop at her counting table. Her thumb rests on the cover of a supplier ledger, pressing it flat. When you name the Northern Provision Compact aloud, she exhales through her nose — a small, controlled sound. She slides a single page across the table without meeting your eyes. A patron-family entry, one line struck through in red chalk. "They took a handling fee three seasons ago," she says. "I have been waiting to see whether that debt would follow them here." The name at the top of the struck line matches a stall holder two rows east.'
        );
        addJournal('Elyra Mossbane identified a patron-family that received a handling fee from the Northern Provision Compact three seasons ago', 'evidence');
        maybeStageAdvance();
      } else {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
        addNarration(
          'Closed Ledger',
          'Elyra lifts the ledger off the table and tucks it under one arm before you finish speaking. Her expression stays level, the kind of level that takes practice. "My patron-family records are not for circulation," she says. A cart rolls past the stall, loud enough that you cannot push further without raising your voice. She has already turned to the next person in line.'
        );
      }
    }
  },

  {
    label: "The chalk marks on the drying rack posts run in the wrong direction for moisture tallies.",
    tags: ['stage2', 'harvest_circle', 'physical_evidence'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      var roll = rollD20('wits', G.skills.lore);
      if (roll.total >= 13) {
        G.flags.drying_rack_cipher_found = true;
        G.investigationProgress++;
        addNarration(
          'The Second Ledger',
          'Standard moisture tallies run post to post, left to right across the rack line. These run vertical, top to bottom, grouped in threes. The pattern resolves when you treat each group as a manifest digit — the notation system used in Farlan\'s quota records, compressed into a shorthand a grain worker could read at a glance. Three posts carry numbers that match the routing prefix of the Northern Provision Compact manifests exactly. Someone has been marking incoming ghost shipment confirmations in chalk on public infrastructure, hiding them inside ordinary harvest record-keeping.'
        );
        addJournal('Drying rack chalk marks encode Northern Provision Compact routing numbers in compressed quota notation', 'evidence');
        maybeStageAdvance();
      } else {
        addNarration(
          'Ordinary Tally Marks',
          'The chalk marks run in columns along the lower posts — moisture tallies, you assume, or daily load counts. A grain worker passing with an empty barrow glances at what you\'re studying and shrugs. "Rack numbers," he says. "Foreman changes them every third day." You copy them down anyway, but without the right notation key they stay inert on the page.'
        );
      }
    }
  },

  {
    label: "I stepped into the wrong convoy line — the stall holder at the front has already noticed.",
    tags: ['stage2', 'harvest_circle', 'social_complication'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      var roll = rollD20('finesse', G.skills.stealth);
      if (roll.total >= 13) {
        G.flags.convoy_line_recovered = true;
        G.investigationProgress++;
        addNarration(
          'Recovered Ground',
          'You catch the stall holder\'s eye before she can signal Jorva\'s enforcer at the end of the row. A cart factor two positions back in the correct queue nods once — he has seen outsiders make this mistake before and he is not unkind about it. You extract yourself without theater, join the right line, and the moment passes. The stall holder\'s gaze follows you a beat longer than necessary, but the enforcer\'s attention stays elsewhere. You have bought goodwill with the cart factor, who introduces himself as a Crestmark cousin between loads.'
        );
        addJournal('Cart factor in Crestmark family introduced during convoy queue — potential source on shipment timing', 'intelligence');
        maybeStageAdvance();
      } else {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
        addNarration(
          'Marked as Out of Order',
          'Jorva\'s enforcer is already moving by the time the stall holder\'s expression shifts. She says nothing — she doesn\'t need to. The enforcer stops beside you and requests your load declaration in the flat tone reserved for people who have just broken a rule in a governed space. No load. He writes something in a small bound register, closes it, and nods you out of the line. The queue watches without comment, which is its own kind of correction.'
        );
      }
    }
  },

  {
    label: "A counting court clerk wants my load declaration clarified.",
    tags: ['stage2', 'harvest_circle', 'social_misstep', 'paperwork'],
    xpReward: 32,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      var roll = rollD20('charm', G.skills.persuasion);
      if (roll.total >= 13) {
        G.flags.counting_court_clerk_cooperative = true;
        G.investigationProgress++;
        addNarration(
          'A Correctly Declared Load',
          'The clerk keeps one finger on the declaration column while she reads yours back to you — the fingertip presses a small dent into the paper that she smooths flat before she lifts it. She accepts an honest amendment without comment. When you step away she says, half to the next entry on her page, that the Northern Provision Compact has filed three declarations this month that she had to amend herself. Her finger does not lift from her own column while she says it. The amendments were for weight discrepancies between manifest and cart.'
        );
        addJournal('Counting court clerk has amended three Northern Provision Compact declarations for weight discrepancies', 'evidence');
        maybeStageAdvance();
      } else {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
        addNarration(
          'Marked for Re-declaration',
          'The clerk writes a small mark in the upper corner of her register and sets your declaration aside for a secondary review. She does not explain what the mark means. A second clerk two stools down looks at it when he passes and writes something of his own in a bound book. You are asked to wait until the review is complete, and the wait is long enough that the drying rack line clears before you reach it.'
        );
      }
    }
  },

  {
    label: "A panic buyer is shouting about spoilage two stalls down.",
    tags: ['stage2', 'harvest_circle', 'public_complication'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      var roll = rollD20('wits', G.skills.lore);
      if (roll.total >= 13) {
        G.flags.spoilage_argument_overheard = true;
        G.investigationProgress++;
        addNarration(
          'The Argument Behind the Argument',
          'The panic buyer is loud about three barrels of seed grain that failed inspection two days ago. The grain factor is louder about charter-marked containers that arrived the same night and took up the cold-storage slots the seed should have held. The factor catches himself on the word charter, lowers his voice, and finishes the sentence with a gesture at the spoiled barrels instead. A commune enforcer is already crossing the lane. The buyer will be corrected. The factor will not repeat the word.'
        );
        addJournal('Grain factor publicly named charter-marked containers displacing cold storage before self-correcting', 'evidence');
        maybeStageAdvance();
      } else {
        addNarration(
          'Voices Below the Roofline',
          'The argument resolves before you reach earshot. The panic buyer leaves with a tally slip and a warning. The grain factor is already wiping down his counter when the enforcer arrives, speaking in the quiet register that means nothing useful will be said in front of an outsider. You stand at the edge of the lane long enough to draw a second glance from the enforcer, and you move on.'
        );
      }
    }
  },

  {
    label: "Valen Crestmark's personal logbook sits in a locked drawer he doesn't think anyone noticed.",
    tags: ['Stage2', 'Lore'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'reviewing Valen Crestmark personal logbook tonnage discrepancies');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_valen_crestmark = true;
        G.flags.valen_logbook_found = true;
        G.investigationProgress++;
        G.stageProgress[2]++;
        G.lastResult = `Valen pulls the logbook himself after you name the discrepancy years — he stopped waiting for someone to ask. Three harvests of entries, each marked with a symbol he invented himself: a small square next to shipments he could not verify but lacked grounds to hold. The tonnage on the memorial offering routes runs forty percent above certified grain weight for the same crate count. His notation on the most recent entry reads: "compound-adjacent density profile. Not my domain to report. Logged for record."`;
        addJournal('Valen Crestmark logbook: 3-year memorial offering tonnage discrepancy — density profile flagged as compound-adjacent', 'evidence', `har-valen-logbook-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The drawer is locked. Valen sees you looking at it and sets both hands flat on the desktop — a full stop. "Assessment office records are subject to annual review," he says. His voice is steady, but the knuckle on his left thumb goes white against the desk edge. He does not say which year the current review covers, and he does not ask why you were looking at the drawer.`;
        addJournal('Valen logbook access refused — watchfulness raised', 'complication', `har-valen-logbook-fail-${G.dayCount}`);
      } else {
        G.flags.met_valen_crestmark = true;
        G.flags.valen_logbook_found = true;
        G.investigationProgress++;
        G.lastResult = `Valen unlocks the drawer slowly, as though deciding something while his hand is on the key. The logbook covers two previous harvests. The memorial offering route entries are marked with a small square he does not explain, and the tonnage columns for those routes do not match the certified grain weight for the same crate count. He turns to the most recent marked page and sets the book down without comment, facing you.`;
        addJournal('Valen Crestmark logbook: memorial offering route tonnage mismatch across two harvests', 'evidence', `har-valen-logbook-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The silo operator near the Panim junction weighs everything. He doesn't open offering crates. He weighs them.",
    tags: ['Stage2', 'Survival'],
    xpReward: 66,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'examining silo weight records at Panim transit junction');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('vigor', (G.skills.survival||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.silo_weight_records_found = true;
        G.investigationProgress++;
        G.stageProgress[2]++;
        G.lastResult = `The operator spreads three seasons of weight logs across the loading bench without being asked — he has been waiting for someone with grounds to look. The flagged crates measure between forty-two and forty-seven kilos per standard crate volume. Certified grain runs twenty-eight to thirty-one. He circles the columns himself with a grease pencil. "Too dense for grain. Too light for stone. I log it because I log everything." He has the transit dates, the crate count, and the Panim route confirmation stamp for each consignment.`;
        addJournal('Silo weight records: memorial offering crates 40-47kg per unit vs 28-31kg grain standard — three seasons documented', 'evidence', `har-silo-weight-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The operator shuts the weight register when you reach for it. "Offering-exemption cargo is third-party sealed. I log the platform number, not the weight — that's the exemption condition." He is not wrong: the agricultural offering exemption explicitly waives weight verification. Someone designed that waiver to work exactly here. The register goes back under the counter and he crosses his arms in a way that means the conversation is finished.`;
        addJournal('Offering exemption waives weight verification — exemption terms were designed for this gap', 'complication', `har-silo-weight-fail-${G.dayCount}`);
      } else {
        G.flags.silo_weight_records_found = true;
        G.investigationProgress++;
        G.lastResult = `The operator pulls two seasons of records. He does not circle anything — he is careful about what his signature will and will not be near. But he reads the flagged column aloud in a flat tone: forty-four kilos, forty-three, forty-six. Then he reads the grain standard from the posted rate card on the wall: twenty-nine kilos, standard crate. He sets both pages next to each other and steps back from the bench. He does not say anything else.`;
        addJournal('Silo operator confirmed density mismatch on Panim offering route — two seasons of records', 'intelligence', `har-silo-weight-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "A grain trader stopped his independent routes the week after the Compact filed against him. He's still here.",
    tags: ['Stage2', 'Charm'],
    xpReward: 64,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(64, 'tracing suppressed complaint against independent grain trader');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_jorva_helmrune = true;
        G.flags.grain_trader_suppressed = true;
        G.investigationProgress++;
        G.lastResult = `Jorva squares the closed complaint file against the desk edge before she speaks. The trader was Denet Alvar — independent routes from Harvest Circle to three eastern localities, running ahead of the Compact's consolidated schedule. The complaint accused him of underselling certified grain. Settlement terms were sealed. Jorva turns one page of her own notes and slides it to the edge of the desk. The settlement date and Alvar's last route filing are four days apart. "He relocated to the eastern stalls," she says. "Still here." She does not say whether he agreed or was told.`;
        addJournal('Grain trader Denet Alvar: independent routes halted 4 days after sealed Compact complaint settlement — Jorva has the dates', 'evidence', `har-trader-suppress-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Jorva squares the file against the desk edge and does not open it. "Settlement terms are sealed under communal arbitration protocol. The involved parties agreed to finality." Her hand stays on the cover. Someone in the outer corridor stops walking at the sound of your conversation, and the pause is long enough to notice. Jorva looks toward the door once. She does not continue.`;
        addJournal('Compact complaint settlement sealed — corridor observer noted', 'complication', `har-trader-suppress-fail-${G.dayCount}`);
      } else {
        G.flags.met_jorva_helmrune = true;
        G.flags.grain_trader_suppressed = true;
        G.investigationProgress++;
        G.lastResult = `Jorva gives you the trader's name — Denet Alvar — and the settlement date without opening the file. The specific terms stay sealed, but she confirms the complaint was filed by a Northern Provision Compact representative and resolved before a hearing was scheduled. She does not say what Alvar received in exchange for ending his routes. Her hand rests on the file without pressure, and she looks at the wall instead of at you while she speaks.`;
        addJournal('Denet Alvar complaint filed by Northern Provision Compact — settled without hearing, routes ceased immediately', 'intelligence', `har-trader-suppress-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Academic transit orders for compound materials are going to distribution sites, not research facilities.",
    tags: ['Stage2', 'Lore'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'tracing Mimolot Academy transit orders through Farlan Inkshade records');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_farlan_inkshade = true;
        G.flags.mimolot_transit_orders_found = true;
        G.investigationProgress++;
        G.lastResult = `Farlan has already marked the anomalous orders with a folded paper tab — a researcher's instinct. Eleven agricultural research transit orders over eight months, all filed under Mimolot Academy's institutional classification. The filer's name appears on no Academy staff list Farlan can access. The transit destinations are market consolidation points: Verdant Row staging area, the Panim junction silo, a handling depot registered to no recognized guild. Farlan's handwriting on the tab reads: "destination mismatch — research classification, distribution endpoint."`;
        addJournal('Mimolot Academy transit orders: 11 filings, filer not on Academy staff list, destinations are distribution points not research sites', 'evidence', `har-mimolot-transit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The academic records office is under a quarterly cross-institutional audit that began two days ago. Farlan cannot pull transit orders that fall under active audit scope without flagging the record as accessed during review — which triggers an automatic hold and a notification to the auditing body. He names this plainly and without apology. His pen stays capped on the desk. He does not say who requested the audit or when it was scheduled.`;
        addJournal('Academic transit records under active audit — access triggers notification to auditing body', 'complication', `har-mimolot-transit-fail-${G.dayCount}`);
      } else {
        G.flags.met_farlan_inkshade = true;
        G.flags.mimolot_transit_orders_found = true;
        G.investigationProgress++;
        G.lastResult = `Farlan pulls seven of the eleven orders — the ones filed outside the current audit window. Mimolot Academy classification, all eight months. He checks the filer's name against the staff register twice, finger running down the column both times. The name does not appear. He turns to the destination column and reads the first three aloud. His voice does not change, but he sets the pen down and folds his hands before the fourth.`;
        addJournal('Mimolot Academy transit orders: 7 pulled, filer absent from staff registry, distribution-point destinations confirmed', 'intelligence', `har-mimolot-transit-partial-${G.dayCount}`);
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
        G.lastResult = `The routing number fraud and the supplier irregularities are visible but the threads aren't closed. The communal council will not act on partial documentation, and a premature approach risks sealing the archive access that's still open. Three or four more solid confirmations, and the case holds.`;
        G.recentOutcomeType = 'investigate'; return;
      }
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('vigor', (G.skills.survival||0) + Math.floor(G.level/2));
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
