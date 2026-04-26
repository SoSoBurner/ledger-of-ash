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
    label: "The cold storage keeper logs every degree drop. The Compact's containers were never logged.",
    tags: ['Stage2', 'NPC'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'tracing cold storage access gap with the Harvest Circle keeper');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.cold_storage_gap_confirmed = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The keeper, Brenn Saltash, keeps her temperature ledger on a hook beside the door, replaced every season. She pulls the last three without being asked and spreads them on the workbench. Every agricultural intake is logged: time in, temperature at entry, weight declaration, handler name. The Compact's containers appear on the intake dock register but not once in the temperature ledger. They moved through cold storage without a record being made. Brenn sets her finger on the gap date. "Someone let them in after my shift ended," she says. "And walked them out before I started."`;
        addJournal('Cold storage temperature ledger: Compact containers bypassed intake logging across three seasons — off-shift access', 'evidence', `har-coldstorage-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Brenn Saltash is mid-shift and the cold storage door is sealed during active temperature regulation — entry would break the thermal cycle and spoil the current rotation. A commune enforcer standing at the far end of the corridor has already noted the approach. The ledger is inside. The door stays closed until the regulation cycle clears, and the enforcer does not move from the corridor while you wait.`;
        addJournal('Cold storage access blocked mid-cycle — enforcer observed approach', 'complication', `har-coldstorage-fail-${G.dayCount}`);
      } else {
        G.flags.cold_storage_gap_confirmed = true;
        G.investigationProgress++;
        G.lastResult = `Brenn pulls the current season's ledger and runs her thumb down the intake column until she finds the date range. Her thumb stops on a four-day gap between entries — nothing in, nothing out, for ninety-six hours during the period the Compact's shipment was documented on the dock. "We had a temperature regulator fault," she says. "I filed a maintenance note. The fault cleared fast." She does not say whether the fault was natural. Her thumb stays on the gap.`;
        addJournal('Cold storage ledger: 4-day entry gap coincides with Compact shipment dock dates — regulator fault filed', 'intelligence', `har-coldstorage-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The commune's seed-keeper tracks every variety by name. Three varieties went missing last autumn without a spoilage report.",
    tags: ['Stage2', 'NPC'],
    xpReward: 66,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'tracing missing seed varieties with the Harvest Circle seed-keeper');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('vigor', (G.skills.survival||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.seed_keeper_evidence = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Oswin Tharpe, the seed-keeper, has maintained an unsanctioned parallel ledger since the first disappearance — three lines in a small waxed notebook he keeps inside the seed vault door, the spine pressed flat against the frame. Three autumn varieties: Pale Aldrik barley, Salt-Run rye, and a legume cultivar Harvest Circle developed internally. No spoilage. No transfer record. No commune council authorization. The varieties reseed poorly in isolation. Someone who wanted them would need the parent stock. Oswin has been waiting for someone to ask. "They took the seed," he says. "Not the grain. That's specific."`;
        addJournal('Three seed varieties removed without record — parent stock targeted for isolation reseeding capability', 'evidence', `har-seedkeeper-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The seed vault door is sealed and the rotation key is with the commune's harvest committee, which meets in three days. Oswin Tharpe is present but he steps back when you name the missing varieties — a quick, careful step, the kind that comes after being corrected once for saying the same thing aloud. He says nothing and glances toward the committee offices. A commune enforcer two stalls over has turned to face the exchange.`;
        addJournal('Seed vault access denied — keeper silenced, enforcer noted', 'complication', `har-seedkeeper-fail-${G.dayCount}`);
      } else {
        G.flags.seed_keeper_evidence = true;
        G.investigationProgress++;
        G.lastResult = `Oswin Tharpe names the three varieties without looking at any ledger — he has recited the list in his head enough times that it comes out flat and fast. He does not have documentation of the removal. What he has is the absence of documentation: no spoilage form, no transfer note, no signed release. The commune protocol requires all three for a variety transfer. None were filed. "I checked," he says. "Three times." He stops there and does not say what stopped him from checking a fourth.`;
        addJournal('Three seed varieties unaccounted — no spoilage, transfer, or release forms filed', 'intelligence', `har-seedkeeper-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "A night courier who runs the pre-dawn offerings route saw the Compact's handlers up close. He hasn't filed a report because no one asked.",
    tags: ['Stage2', 'NPC'],
    xpReward: 64,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(64, 'debriefing the pre-dawn offerings courier on Compact handler observations');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.courier_witness_found = true;
        G.investigationProgress++;
        G.lastResult = `Fen Draal runs the pre-dawn route on foot, a lantern on a pole and a canvas bag of offering-bound parcels. He stops at each junction marker and logs arrival time in grease pencil on a strap around his wrist — transferred to the courier ledger each morning, worn away by noon. He saw four of the Compact's handlers at the Panim junction staging area before dawn: no commune insignia, no guild marks, work clothes that smelled of a chemical agent he recognized from the Soreheim processing districts — a smell that does not belong in an agricultural setting. He describes the handlers with the detail of someone who has spent years passing unnoticed: height, gait, which one held the manifest and which one never looked up.`;
        addJournal('Courier Fen Draal witnessed Compact handlers at Panim junction — Soreheim processing-district chemical scent confirmed, handler descriptions recorded', 'evidence', `har-courier-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Fen Draal is between routes and the commune's courier dispatch office keeps a tight arrival window. His supervisor is visible through the dispatch window, watch in hand. Fen shakes his head once — a short, clear motion — and picks up his canvas bag. He does not look back toward the supervisor when he does it. Whatever he saw, the timing to say it is not now, and the supervisor's presence is the reason.`;
        addJournal('Courier unwilling to speak — supervisor present, timing refused', 'complication', `har-courier-fail-${G.dayCount}`);
      } else {
        G.flags.courier_witness_found = true;
        G.investigationProgress++;
        G.lastResult = `Fen Draal tells it in the order he saw it, without editorializing. Four handlers, pre-dawn, working without lanterns. He smelled something chemical on the containers that he could not name. The manifest one of them held was not a standard commune form — wrong color, wrong size. He did not report it because there was no reporting channel for something he did not yet have words for. He has words now. He writes the junction location and timing on the back of his wrist strap without being asked.`;
        addJournal('Courier sighted Compact handlers pre-dawn with non-standard manifest — chemical smell, non-commune paperwork', 'intelligence', `har-courier-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The irrigation channel maintenance log runs through three seasons of sealed access windows nobody authorized.",
    tags: ['Stage2', 'NPC'],
    xpReward: 66,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'tracing unauthorized irrigation channel access windows');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('spirit', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.irrigation_access_confirmed = true;
        G.investigationProgress++;
        G.lastResult = `The maintenance log is kept by the commune's water-works committee, a hand-ruled column book that records every access window: who opened the sluice gate, when, and for what declared purpose. Three sealed entries over twenty-two months show access codes that belong to a defunct maintenance sub-guild dissolved two years ago — but the codes were accepted by the lock mechanism. Someone retained functional copies of a dead authorization key and used them to access the eastern channel junction, which runs beneath the Panim offering storage corridor. The channel provides a transit route that bypasses the dock intake system entirely.`;
        addJournal('Irrigation channel access via defunct sub-guild codes — 3 unauthorized entries bypassing dock intake via underground transit route', 'evidence', `har-irrigation-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The water-works committee log is cross-filed with the commune infrastructure archive, which is in a scheduled re-cataloguing process. The access log from the relevant period is boxed and labeled but not yet shelved into the accessible sequence. An infrastructure archivist notes the request in a queue register and says the re-cataloguing will clear within the week. The queue register is already three pages long.`;
        addJournal('Irrigation access log in archive re-cataloguing queue — one week delay', 'complication', `har-irrigation-fail-${G.dayCount}`);
      } else {
        G.flags.irrigation_access_confirmed = true;
        G.investigationProgress++;
        G.lastResult = `The committee archivist finds the three sealed entries while searching for an unrelated maintenance record — he almost misses them because the access codes are formatted correctly, just for a guild that no longer exists. He reads the code prefix aloud and checks his sub-guild registry twice. The dissolved guild's code block should have been revoked and re-keyed at dissolution. It was not. Someone at the dissolution stage held the re-key. The archivist underlines the access dates without saying what he thinks it means.`;
        addJournal('Irrigation log: defunct sub-guild codes active — revocation not completed at dissolution', 'intelligence', `har-irrigation-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The commune's ritual herbalist prepares every offering bundle. She noticed the weight had changed before the route even left.",
    tags: ['Stage2', 'NPC'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'consulting commune ritual herbalist on offering bundle weight anomalies');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.herbalist_witness = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Meret Osk has assembled Harvest Circle's offering bundles for eleven years. She knows the weight of each component by hand — not by scale, but by the pressure against her palm as she lifts the finished bundle for the route stamp. She sets both hands flat on the preparation table when she describes the change: three months ago, bundles sealed after the preparation room closed overnight came back to the dock weighing more than she had assembled. The excess was consistent: always between eight and twelve units above her assembly weight. "I thought the scale was off," she says. "The scale was not off." She has kept a private tally in the back of her preparation ledger, column-ruled in her own hand.`;
        addJournal('Herbalist Meret Osk: offering bundles gained 8-12 units overnight — private weight tally across three months, sealed room access after hours', 'evidence', `har-herbalist-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Meret Osk is in the preparation room with the door partially closed — a commune custom that means she is at a stage requiring unbroken focus. A commune helper at the outer bench shakes her head once and holds up four fingers: four stages remaining before the work can pause. Through the gap in the door, Meret's hands move over the preparation table without stopping. She does not look up. The helper closes the door the rest of the way with a quiet, practiced pull.`;
        addJournal('Herbalist in preparation — uninterruptible, four-stage sequence in progress', 'complication', `har-herbalist-fail-${G.dayCount}`);
      } else {
        G.flags.herbalist_witness = true;
        G.investigationProgress++;
        G.lastResult = `Meret Osk names the weight discrepancy before you finish the question — she has been looking for someone to tell. Three months of bundles leaving the preparation room heavier than she assembled them. She found no damage, no contamination, no explanation from the handling crew. She sets the private tally on the preparation table: eight months of entries, each row marked with the bundle's final dock weight versus her assembly weight, the difference circled in red chalk. The circles are all in the same size range.`;
        addJournal('Herbalist private tally: 8 months of offering bundle weight discrepancies — circled excess consistent at 8-12 units above assembly weight', 'intelligence', `har-herbalist-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The commune's seasonal timing records show the offering routes were rescheduled to match the Compact's arrival windows. That scheduling authority belongs to one office.",
    tags: ['Stage2', 'NPC'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'tracing offering route rescheduling authority through seasonal timing records');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.schedule_authority_identified = true;
        G.investigationProgress++;
        G.lastResult = `The seasonal dispatch archive is cross-filed with the harvest committee's quarterly records — Farlan Inkshade keeps the master copy. The offering route schedule has been adjusted eleven times over eight months, each adjustment issued under the harvest committee's scheduling authority. The adjustments cluster within a three-day window before each Northern Provision Compact manifest entry in Valen Crestmark's records. One name appears on nine of eleven adjustment authorizations: a scheduling officer named Corra Delvitch, who has not appeared at her post for six weeks. Her last adjustment was issued the day after Valen noted the military-credential shipment.`;
        addJournal('Offering route scheduling adjusted 11x to match Compact arrivals — scheduler Corra Delvitch absent 6 weeks, last action day after military shipment noted', 'evidence', `har-schedule-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The harvest committee's quarterly archive is under committee seal pending the upcoming annual assembly — standard pre-assembly review lock. The archive clerk confirms the lock was issued two days ago, the shortest possible window before the lock would normally apply. The committee chair signed the seal order. The archive clerk writes the request in the access log without making eye contact, and the pen moves slowly.`;
        addJournal('Harvest committee archive sealed early — pre-assembly lock, chair-signed', 'complication', `har-schedule-fail-${G.dayCount}`);
      } else {
        G.flags.schedule_authority_identified = true;
        G.investigationProgress++;
        G.lastResult = `Farlan pulls the scheduling adjustment log from the current quarter's archive binder. He does not have earlier quarters accessible today — those are in the committee's possession — but the current quarter shows four adjustments, each one shifting the offering route departure time earlier by two to three hours. He reads the authorization name for each: the same scheduling officer on every entry. He checks the active staff register. The name has been removed from it. "She's still listed as attached to the committee on the formal org chart," he says. "But she hasn't drawn wages in over a month."`;
        addJournal('Route scheduling officer active on adjustments but removed from staff register — wages ceased over a month ago', 'intelligence', `har-schedule-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Denet Alvar relocated to the eastern stalls. He's still watching the routes he used to run.",
    tags: ['Stage2', 'NPC'],
    xpReward: 64,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(64, 'debriefing suppressed trader Denet Alvar on independent route observations');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('finesse', (G.skills.stealth||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.denet_alvar_debrief = true;
        G.investigationProgress++;
        G.lastResult = `Denet Alvar's eastern stall is positioned at an angle that gives him a direct sightline to his old route staging area. He has not moved the stall since he relocated. He names this without embarrassment — it is not nostalgia, it is habit refined into something more useful. Over eight months he has logged, in a personal notebook he does not show buyers, every shipment that moved through the staging area under the Northern Provision Compact manifest category. The arrival times, the handler count, the vehicle type. He identifies two handlers who appeared on multiple shipments and names one by a road-circuit nickname he overheard during a loading dispute. He sets the notebook on the counter between you. "I'm not going back to the route," he says. "But I'm not pretending I don't see it."`;
        addJournal('Denet Alvar: 8-month personal log of Compact shipment patterns — handler identity and road-circuit nickname recorded', 'evidence', `har-alvar-debrief-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Denet Alvar is mid-transaction when you arrive and a Compact-affiliated buyer is two stalls over — close enough that a raised voice would carry. Alvar's expression does not change, but his hands stop moving over the grain weights. He shakes his head once, a small and practiced motion, then returns to the transaction. The buyer two stalls over has not looked up. Alvar does not look at you again while the buyer is present.`;
        addJournal('Alvar refused contact — Compact-affiliated buyer in earshot', 'complication', `har-alvar-debrief-fail-${G.dayCount}`);
      } else {
        G.flags.denet_alvar_debrief = true;
        G.investigationProgress++;
        G.lastResult = `Alvar speaks in the register of a man who has already decided what he will and will not confirm. He names the staging area pattern: Compact shipments arrive in a two-to-three hour pre-dawn window, never during active market hours, always with handlers who do not interact with commune staff. He will not say where he recorded this. He will say that the vehicles used on the heaviest consignments are not standard agricultural transport — they run wider axles, the track marks in the mud beside the staging dock are two knuckle-widths wider than a grain cart.`;
        addJournal('Alvar confirmed Compact pre-dawn pattern and non-standard wide-axle transport — heavier than agricultural load profile', 'intelligence', `har-alvar-debrief-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The commune's night patrol route passes within thirty meters of the cold storage corridor. The patrol log has two months of gap entries, no explanation filed.",
    tags: ['Stage2', 'NPC'],
    xpReward: 66,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'reviewing night patrol gap entries near cold storage corridor');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('vigor', (G.skills.survival||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.patrol_log_gap_confirmed = true;
        G.investigationProgress++;
        G.lastResult = `The commune patrol logs are kept by the enforcer office — Jorva Helmrune has access to the relevant corridor's records. Two months of gap entries: nineteen nights where the cold storage corridor checkpoint shows no sign-in, no reason logged, no substitute patrol assignment. The gaps correspond exactly to the calendar dates of Brenn Saltash's temperature ledger gaps and the Compact's staging dock appearances in Valen's records. Jorva turns to the gap column and sets her palm flat on the page. "The enforcer assigned to that corridor during that period was seconded to a committee sub-assignment," she says. "The assignment was signed by the same scheduling officer who amended the offering route times." Her hand does not move.`;
        addJournal('Patrol gaps match cold storage and Compact staging dates — corridor enforcer seconded by same scheduler who rerouted offerings', 'evidence', `har-patrol-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The enforcer office log desk is occupied by a duty supervisor who is not Jorva Helmrune, and who answers questions about gap entries with the procedural phrasing of someone who has been told to answer that way. Internal staffing records are under committee administrative review. The supervisor writes the request in the log register and caps the pen. "Jorva will be in on fifth-day," she says. "She handles the archive access." Fifth-day is three days away.`;
        addJournal('Patrol log access delayed — duty supervisor only, Jorva absent until fifth-day', 'complication', `har-patrol-fail-${G.dayCount}`);
      } else {
        G.flags.patrol_log_gap_confirmed = true;
        G.investigationProgress++;
        G.lastResult = `Jorva pulls the cold storage corridor log without being told which corridor. She already knows which one. The gap column runs nineteen entries deep across two months — each one missing a sign-in, none of them marked with a reason code or substitute assignment. She reads the date range aloud and stops. She does not say whether she has looked at these entries before. She turns the log to face you and takes her hand off it completely, leaving it open on the desk between you.`;
        addJournal('19-night patrol gap in cold storage corridor — no reason codes, no substitute assignments, dates match Compact activity window', 'intelligence', `har-patrol-partial-${G.dayCount}`);
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
