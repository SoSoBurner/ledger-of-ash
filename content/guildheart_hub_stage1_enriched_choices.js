/**
 * GUILDHEART HUB STAGE 1 ENRICHED MEANINGFUL CHOICES
 * 20 deeply grounded investigation paths tied to guild arbitration and trade disputes
 * Generated for: Guild loyalty vs individual innovation, tradition vs progress, records corruption and arbitration poisoning
 * Each choice: 65-80 XP, grounded in guild politics and merchant coordination, layered wrongness reveal
 */

var GUILDHEART_HUB_STAGE1_ENRICHED_CHOICES = [
  // ========== NPC-GROUNDED CHAINS (8 CHOICES) ==========

  // 1. GUILD ARBITRATOR: DISPUTE RESOLUTION FAILURES
  {
    plot: 'main',
    label: "The arbitrator's rulings have gone the same direction for weeks.",
    tags: ['Investigation', 'NPC', 'Guild', 'Justice', 'Meaningful'],
    xpReward: 70,
    failResult: {
      text: `Kesh is not in. The east annexe clerk stamps your inquiry form without reading it and sets it in a tray already thick with unanswered requests. "Arbiter Kesh receives formal inquiry during posted office hours. Walk-in access is not available for Category Two matters." The stamp is still wet when it goes in the tray. The inquiry will wait. The ruling schedule posted on the corridor board does not.`,
      xp: 0,
      effects: [],
      next: [{ text: 'The rulings board in the main corridor is still accessible.', skill: 'survival', tag: 'safe', align: 'neutral', cid: '__arrive__' }]
    },
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading guild dispute patterns');
      G.stageProgress[1]++;

      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      const target = 11 + Math.max(0, G.worldClocks.pressure);

      if (result.isCrit) {
        G.lastResult = `Kesh re-reads a clause before speaking. "Arbitration used to track established precedent. Now directives arrive from above — not suggestions. Specific disputes, specific outcomes. Merchants who should prevail are told to accept the ruling against them." He sets the file down without closing it. "I'm not settling disputes. I'm executing decisions that were made elsewhere before the parties entered the room."`;
        G.stageProgress[1]++;
        addJournal('Arbitrator revealed corrupted dispute resolution system', 'evidence', `guildheart-arbitrator-disputes-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Kesh moves the open folder to the side of his desk — a deliberate motion, unhurried. "Arbitration proceedings are Category Two confidential. Inquiry without registered standing gets logged." He stamps something without looking at it. The stamp lands near the edge of the page, slightly crooked. He doesn't correct it. You're already logged. The pressure of being in that record will make every subsequent approach to this office harder.`;
        G.worldClocks.pressure++;
        addJournal('Arbitrator now protective of guild confidentiality', 'complication', `guildheart-arbitrator-hostile-${G.dayCount}`);
      } else {
        G.lastResult = `The arbiter's office smells of beeswax polish and lamp-oil — scrupulously maintained, like the rest of the east annexe. Kesh straightens a stack of rulings that doesn't need straightening, pressing the edges flush with the desk's leather blotter. "Dispute resolution is case-sensitive. Outcomes reflect available documentation." He begins: "The coordinating—" His eyes go to the corridor window. A clerk passes in the hall beyond the glass. "Not every merchant reads the terms they file under." The interrupted thought is not recovered. Behind him, the shelf of closed dispute folios sits in chronological order — three spines in the last row are new, sharing a reference window with the directive.`;
        addJournal('Arbitrator confirmed disputed resolution outcomes', 'evidence', `guildheart-arbitrator-pressure-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 2. MERCHANT REPRESENTATIVE: TRADE AGREEMENT CHANGES
  {
    plot: 'main',
    label: "The merchants who lost agreements last month all trade the same goods. That's not coincidence.",
    tags: ['Investigation', 'NPC', 'Commerce', 'Agreements', 'Meaningful'],
    xpReward: 75,
    failResult: {
      text: `Ilya is not at her stall. The loading yard factor says she left for the east annexe an hour ago — a re-filing appointment, Category Two, no walk-ins. Her abacus hangs from its hook above the cart bench. The brass beads are still set from her last count. The amendment folders you came to read are stacked under the bench, cover-down. The opportunity to compare them today has closed. The trade category patterns that link the lost agreements are visible through a different thread: the arbitration archive, open to anyone with a filed introduction.`,
      xp: 0,
      effects: [],
      next: [{ text: 'The arbitration archive keeps its own record of outcomes.', skill: 'survival', tag: 'safe', align: 'neutral', cid: '__arrive__' }]
    },
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering trade agreement manipulation');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Ilya sets two documents side by side on the cart bench — the original agreement and what she received after filing. The column for storage access fees reads differently in each. "Signed copy. Amended copy. Same reference number." She taps the date on the amendment. It predates her notification by eleven days. "I didn't agree to these terms. I was informed I already had." The amendment carries her reference number. Whoever filed it left a name in the amendment registry.`;
        G.stageProgress[1]++;
        addJournal('Merchant revealed trade agreement post-signing manipulation', 'evidence', `guildheart-merchant-agreements-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Ilya stops loading her manifest. "Who sent you?" Not hostile — specific. She's asking because she's already been asked before, by someone else, about her agreements. Her abacus goes into her bag. The conversation is done. By evening, three stall neighbors have been told someone is circulating questions about contract terms. The watchful attention of the market row is now a problem that follows you.`;
        G.worldClocks.watchfulness++;
        addJournal('Merchant representative spreading suspicion about your motives', 'complication', `guildheart-merchant-alert-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `The loading yard is busy behind Ilya — cart wheels on wet flagstone, a cooper calling for a hand. Ilya handles the pages of her folder carefully, like they might be different from what she last read them as, turning each one flat rather than flipping it. "Terms shift. Notification doesn't always follow." She won't say more than that. Her brass caliper hangs from her belt, unused all morning. She keeps reaching for it, catches herself, lets her hand drop. The movement is a small nervous tic she hasn't fully noticed she's developed.`;
        addJournal('Merchant confirmed trade agreement ambiguity', 'evidence', `guildheart-merchant-unclear-${G.dayCount}`);
      } else {
        G.lastResult = `Ilya's hand stays flat on the folder, palm down, covering the top page so that nothing is visible to a passing eye. The loading cart behind her creaks as a cooper shifts a barrel. "Guild contract details are Category One. You'd need a registered review authority." She says it without looking up. The words come out practiced — in the cadence of a clerk reading a posted policy rather than in her own voice. The cart moves. The conversation doesn't continue. A second merchant two stalls over has already turned back to his own accounts, but his pen has stopped moving.`;
        addJournal('Trade agreements blocked without formal guild authorization', 'evidence', `guildheart-merchant-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 3. QUALITY INSPECTOR: STANDARDS DETERIORATION
  {
    label: "The inspection stamps don't match what's coming off the dock. Things are passing that shouldn't.",
    tags: ['Investigation', 'NPC', 'Quality', 'Standards', 'Meaningful'],
    xpReward: 70,
    failResult: {
      text: `The inspection bay door is locked. A placard reads: "Active assessment in progress — unregistered access not permitted." Through the glass panel, Noren moves between stacked crates with his caliper, marking something on his clipboard. He doesn't look up. The department's public-facing record — outcome stamps filed by batch number at the main corridor board — is still accessible and carries its own inconsistencies for anyone reading the sequence carefully.`,
      xp: 0,
      effects: [],
      next: [{ text: 'The outcome stamps on the corridor board are readable without clearance.', skill: 'survival', tag: 'safe', align: 'neutral', cid: '__arrive__' }]
    },
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading quality control patterns');
      G.stageProgress[1]++;

      const result = rollD20('spirit', (G.skills.craft || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Noren opens a drawer and removes two copies of the same inspection record. Same goods, same batch number — different outcome stamps. "I filed the first one. This version is what the registry shows now." He puts both on the table and doesn't pick either up. "I've stopped writing in pen. It doesn't matter what I write." His caliper lies across the drawer edge, balanced there since before you arrived.`;
        G.stageProgress[1]++;
        addJournal('Inspector revealed weaponized quality enforcement', 'evidence', `guildheart-inspector-standards-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Noren turns to face the shelving behind him and begins re-counting a row of filed records that doesn't need counting. "Quality control procedures are internal to the department. Unregistered inquiry goes through the arbiter's office." He counts aloud until you leave, his voice flat and even, as deliberate as tally-chalk on a manifest. The department door closes before you reach the walkway. The faint smell of chalk dust and splinter-wood from the inspection bay follows you into the corridor.`;
        addJournal('Quality inspector refuses future inquiry', 'complication', `guildheart-inspector-silent-${G.dayCount}`);
      } else {
        G.lastResult = `The inspection bay smells of tally-chalk and splinter-wood from broken crate lids. Noren rubs chalk dust off his fingers before speaking, brushing the residue onto the side of his leather apron. "Consistency requires standardized conditions. Not every lot presents the same." He gestures at the stacked crates along the wall — different marks, different hands, different waxes at the seals. "Application is contextual." He doesn't say whose context determines the outcome. The caliper he uses for official measurements sits on his workbench, not in its case. He hasn't closed it between the last two inspections.`;
        addJournal('Inspector confirmed inconsistent quality enforcement', 'evidence', `guildheart-inspector-inconsistent-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 4. HALL KEEPER: EXCLUSION PATTERNS
  {
    label: "The hall keeps turning away the same kinds of merchants. The keeper knows the pattern.",
    tags: ['Investigation', 'NPC', 'Access', 'Membership', 'Meaningful'],
    xpReward: 75,
    failResult: {
      text: `The counter window is shuttered. A hand-lettered card says: "Hall administration closed for midday registration intake — reopen third bell." The denial log you came to read sits somewhere on the other side of the frosted glass, inaccessible until the hall processes its current applicant queue. Two merchants wait on the bench outside the window. One of them has been here since morning. The corridor board still shows the posted membership count, and the number on it doesn't match the stalls in use.`,
      xp: 0,
      effects: [],
      next: [{ text: 'The posted membership count and the active stalls tell their own story.', skill: 'survival', tag: 'safe', align: 'neutral', cid: '__arrive__' }]
    },
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering access control manipulation');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Emry slides the denial log across the counter without being asked, then pulls it back before you can lift it. "Twelve denials in six weeks. Prior six weeks: two." She reads the stated reasons aloud without inflection. "Insufficient trade history. Reputation review pending. Administrative hold." She closes the log. "The three merchants fast-tracked to full standing last month had shorter histories than four of the denials."`;
        G.stageProgress[1]++;
        addJournal('Hall keeper revealed membership exclusion as political tool', 'evidence', `guildheart-hall-exclusion-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Emry sets down her abacus with more care than the motion requires. "Membership policy inquiries go through the arbiter's office, Category Three. Are you filing a formal request?" She's already reaching for a blank form. The form is a dead end — you both know it. Two hall staff near the doorway have stopped their conversation. The isolation of this exchange — careful, procedural, witnessed — is itself a message about what asking costs.`;
        G.worldClocks.isolation++;
        addJournal('Hall keeper now wary of your presence', 'complication', `guildheart-hall-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The hall keeper's counter is worn smooth from decades of hand-passed paperwork, the wood darkened in the exact places where applicants rest their forearms. Emry marks something in the register before answering, the pen's nib scratching once, twice, against the weave. "Processing times have extended. Review criteria are more thorough." She taps the page. "Done right takes longer than filed correctly." She doesn't elaborate on which one the current process is. The small brass bell on the counter sits inverted. Someone placed it that way. She hasn't turned it back.`;
        addJournal('Hall keeper confirmed recent membership policy changes', 'evidence', `guildheart-hall-confirmed-${G.dayCount}`);
      } else {
        G.lastResult = `Emry keeps her eyes on the register. The lamp above the counter casts her shadow long across the page, and her hand moves without pausing. "Membership determinations are internal administrative procedure. Inquiry requires standing." She writes something — not your name, something already on the page that she re-inks as though it had faded. The counter between you stays clear. A second clerk at the far desk has stopped working entirely, pen held an inch above a form. He resumes only when you turn toward the door, and the sound of his writing is loud in the silence.`;
        addJournal('Membership policy information blocked without formal request', 'evidence', `guildheart-hall-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 5. LEDGER MASTER: RECORD FALSIFICATION
  {
    label: "The ledger master handles every account. Wrong numbers means someone told him.",
    tags: ['Investigation', 'NPC', 'Records', 'Finance', 'Meaningful'],
    xpReward: 70,
    failResult: {
      text: `The financial office is locked and the corridor outside it smells of fresh wax seal — documents processed and closed for the day. A clerk at the adjacent desk says Toren is in a category review session until close. "File your inquiry in the morning register. He acknowledges within two working days." The form she offers has three lines for authorization number before the inquiry field. The public quarterly summary posted outside the main hall covers the same period. It is less detailed. It is still accessible.`,
      xp: 0,
      effects: [],
      next: [{ text: 'The public quarterly summary is still posted outside the main hall.', skill: 'survival', tag: 'safe', align: 'neutral', cid: '__arrive__' }]
    },
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading ledger manipulation patterns');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Toren opens the ledger to a page that shows two column totals — one in the standard ink, one in a correction red that doesn't correspond to any correction notation. "The red column doesn't reconcile against any registered account." He turns three more pages. The same red column appears, different amounts, no source reference. "Someone is running a parallel line through the primary ledger. It's been there at least eight months."`;
        G.stageProgress[1]++;
        addJournal('Ledger master revealed dual-entry financial concealment', 'evidence', `guildheart-ledger-fraud-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Toren closes the cover before you finish reading the page title. "Financial documentation is Leadership-Restricted. Unauthorized access request goes to the arbiter's log — automatically." He holds the cover flat. There's a small guild mark embossed at the corner of his cuff. He rotates it toward you deliberately, then turns back to his work. The referral has already been filed. The pressure of that automatic log entry is the point — you've been tracked into the arbitration record before you've asked anything specific.`;
        G.worldClocks.pressure++;
        addJournal('Guild arbitrator alerted to financial records inquiry', 'complication', `guildheart-ledger-alert-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `Toren allows the general ledger, not the subsidiary accounts. Three entries carry correction marks without a corresponding correction form. The dates cluster within a ten-day window four months back. He opens his mouth — starts something about the subsidiary filing process — then his eyes go to the corridor door. A clerk passes in the glass panel. He waits until the shadow moves on. "Entries get corrected," he says. "Forms go missing. It happens." One correction mark covers a name — not a figure, a name. Another name has been struck through, more recently. The struck name and the external coordination line item share the same date column.`;
        addJournal('Guild ledger: another name struck through, this one more recently', 'evidence', `guildheart-ledger-altered-${G.dayCount}`);
      } else {
        G.lastResult = `Toren's hand stays on the ledger binding, index finger through the cord loop that keeps the cover closed when unattended. The financial office smells of iron-gall ink and the beeswax coating on the ledger's leather. "Primary financial records — Leadership-Restricted, Category One." He writes something in a side log without looking at what he's writing. "Authorization request takes eight to twelve working days. I can give you the form." He offers the form without standing up, sliding it across the desk with the same hand that held the binding a moment before.`;
        addJournal('Guild financial records blocked without leadership authorization', 'evidence', `guildheart-ledger-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 6. WAREHOUSE BROKER: GOODS DIVERSION
  {
    label: "Bay Seven has the same crates for days. The broker knows it's not an accident.",
    tags: ['Investigation', 'NPC', 'Commerce', 'Movement', 'Meaningful'],
    xpReward: 70,
    failResult: {
      text: `The warehouse yard is locked between loading shifts — the east gate chained, the broker's standing desk empty. A carter near the west wall says the midday yard closure runs until the third-bell rotation. Bay Seven is visible from the outer walkway through the gate slats: the same four crates still staged against the far wall, none of them bearing transit marks. Their hold status is legible on the printed routing board posted beside the yard clerk's window, which faces the public walkway and is not behind a gate.`,
      xp: 0,
      effects: [],
      next: [{ text: 'The routing board outside the yard clerk\'s window is publicly posted.', skill: 'survival', tag: 'safe', align: 'neutral', cid: '__arrive__' }]
    },
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'tracing merchandise diversion');
      G.stageProgress[1]++;

      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Selain steps between two loaded carts and speaks toward the wall. "Standard hold is three days before transit. Bay Seven has had the same four crates for—" She stops. Her gaze goes past your shoulder — to the covered walkway above, where a passage door has just swung open. She starts again: "The yard rotation has been irregular this season." A pause. The door above closes. She looks back at you. "The morning routing sheet doesn't show everything that moves." She names Bay Seven without looking at it. "Diversion orders arrive already signed. I don't add my name." The interrupted sentence is never finished. She moves back into the main flow of the yard before the next cart passes.`;
        G.stageProgress[1]++;
        addJournal('Broker revealed warehouse diversion coordination', 'evidence', `guildheart-broker-diversion-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The broker steps back so a cart can pass, and doesn't step forward again. "Warehouse operations are Category Two guild business. Questions about routing go through the yard clerk, in writing." By the time you find the yard clerk, three brokers along the covered walkway have stopped working. They watch the cart traffic with exaggerated attention — watchful in the specific way that means word has already moved faster than you did.`;
        G.worldClocks.watchfulness++;
        addJournal('Warehouse brokers warned about your inquiry', 'complication', `guildheart-broker-alert-${G.dayCount}`);
      } else {
        G.lastResult = `The warehouse yard echoes with cart-wheel and the call-out of loading teams. The broker stands behind a standing desk, counting something on their abacus while answering. "Routes adjust to conditions. Charter holds extend timelines." The abacus doesn't move; the beads are already in the position they were in when the conversation started. "Logistics don't always match the schedule." They answer with the category before the thing, and neither answer is what was asked. Behind them, a loader pauses with a crate half-lifted, listening, then remembers the work and carries the crate through to Bay Seven without being directed.`;
        addJournal('Broker confirmed non-standard merchandise movements', 'evidence', `guildheart-broker-evasive-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 7. INITIATION OVERSEER: MEMBERSHIP COERCION
  {
    label: "The new initiation oath asks about household doubts. That was never in the ceremony before.",
    tags: ['Investigation', 'NPC', 'Membership', 'Coercion', 'Meaningful'],
    xpReward: 75,
    failResult: {
      text: `The initiation chamber is occupied — a session in progress, the door warded with a Category One seal pressed into the wood at eye height. Voices inside, low and formal, following a call-and-response structure. The corridor is not a place to wait. Posted on the west notice board outside the east annexe, the standard initiation requirement summary is a public document. It lists the oath's general categories without quoting language. The difference between what it lists and what initiates describe is the thread worth tracing.`,
      xp: 0,
      effects: [],
      next: [{ text: 'The public initiation summary is posted on the west notice board.', skill: 'survival', tag: 'safe', align: 'neutral', cid: '__arrive__' }]
    },
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering coercive membership practices');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Drell holds the revised oath text for a moment before setting it down. "Traditional commitments covered craft conduct and dispute protocols. This version covers personal disclosure — who initiates speak to, what doubts they hold, who in their household might object to guild obligations." He turns the page over. "I administer what I'm given. I don't write it." His caliper sits in his breast pocket, tip outward, unused all day.`;
        G.stageProgress[1]++;
        addJournal('Initiation overseer revealed coercive membership oath system', 'evidence', `guildheart-initiation-coercion-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Drell closes the ceremony binder and stands. "Initiation records are closed to unregistered inquiry. Guild tradition protocols — Category One." He walks to the door and opens it. "Arbiter Kesh receives initiation inquiries in writing. Office hours are posted at the east annexe." The door stays open. His posture says the conversation ended before you arrived. The question drew enough attention that the corridor outside already holds someone leaning against the opposite wall, watching the door angle.`;
        G.worldClocks.reverence++;
        addJournal('Initiation overseer banned further membership questions', 'complication', `guildheart-initiation-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The initiation chamber is a small room off the main hall, lined with bound oath texts and the smell of old leather. Drell checks the time on the wall clock before answering, as though the conversation has a scheduled endpoint. "Requirements were updated to reflect current guild scope. More comprehensive than the prior version." He taps the binder cover. "Expansion is appropriate when the guild expands." The word comprehensive carries more weight than anything else he says. The binder's spine shows two bindings: the original and a newer one, sewn over. The stitching is recent.`;
        addJournal('Initiation overseer confirmed recent membership requirement changes', 'evidence', `guildheart-initiation-expanded-${G.dayCount}`);
      } else {
        G.lastResult = `Drell meets your question with a practiced pause. The initiation chamber holds the faint smell of old leather and cold stone — the air in here hasn't moved much in years. "Ceremony records are guild confidential. Initiation protocol doesn't accommodate outside review." He gestures at the plaster wall behind him — where the old Artificers' wing seam is still visible beneath two coats of whitewash. "Some things here go back further than current membership. That's not my department." The binder on the table between you stays closed. He doesn't reach for it.`;
        addJournal('Initiation practices blocked without membership access', 'evidence', `guildheart-initiation-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 8. APPRENTICE MASTER: SKILL SUPPRESSION
  {
    label: "Weight assessment and independent arbitration were year-one skills. Now they're locked behind Level Four.",
    tags: ['Investigation', 'NPC', 'Craft', 'Knowledge', 'Meaningful'],
    xpReward: 75,
    failResult: {
      text: `The training division is locked for afternoon instruction. A notice card says walk-in inquiry is not available during session hours and directs visitors to the mentor registry in the east annexe. The registry is open. It holds a complete list of currently approved syllabus modules with their assigned placement levels — a public document, filed for member review. The modules that were recently moved from year-one to Level Four placement are listed there by name, with revision dates. The dates are specific.`,
      xp: 0,
      effects: [],
      next: [{ text: 'The mentor registry in the east annexe holds the full syllabus placement list.', skill: 'survival', tag: 'safe', align: 'neutral', cid: '__arrive__' }]
    },
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering craft knowledge suppression');
      G.stageProgress[1]++;

      const result = rollD20('spirit', (G.skills.craft || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Keon pulls a training syllabus from his stack and reads without preamble. "Weight assessment, market-rate negotiation, independent quality arbitration — all three marked 'advanced placement only, Level Four clearance.'" He sets the page down. "My apprentices reach Level Four in year three. These are year one skills. I taught them in week two before the revision." He doesn't say who revised it. He doesn't need to.`;
        G.stageProgress[1]++;
        addJournal('Apprentice master revealed deliberate craft knowledge suppression', 'evidence', `guildheart-apprentice-suppression-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Keon turns the training ledger face-down on his desk. "Apprentice curriculum is internal to the training division. Inquiry without mentor standing isn't recognized." He walks to the other side of the bench. The apprentices at the worktable exchange a glance and go back to their tasks. The room continues without you in it. The wall was designed to be harder to pass than it looks — whoever pressed the training changes down this corridor wanted exactly this barrier between outside eyes and the new curriculum.`;
        G.worldClocks.isolation++;
        addJournal('Apprentice master forbade further training questions', 'complication', `guildheart-apprentice-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Keon marks a place in the syllabus before answering. The training room smells of sawdust and the mineral sharpness of calibration weights. "Curriculum aligns to current guild procedural standards. Consistency first." He runs a thumb down the page, stopping at a section without reading it aloud. "Some modules moved to later placement." He doesn't say which ones. The apprentice at the nearest bench works through a rote measurement sequence — the same one, repeated, for the third time — and doesn't look up.`;
        addJournal('Apprentice master confirmed recent training methodology changes', 'evidence', `guildheart-apprentice-changed-${G.dayCount}`);
      } else {
        G.lastResult = `Keon keeps his hands on the syllabus cover, his fingers curled over the brass corner clasp. "Training methodology is guild-restricted, approved-mentor access only." He's not unfriendly — just exact, the way a man who measures things for a living becomes exact about everything. "Filed correctly through the mentor registry, I can schedule a review session. That process takes four to six weeks." He offers the registry form without breaking posture. The apprentices behind him keep working. Nobody looks up.`;
        addJournal('Apprentice training methods blocked without guild authorization', 'evidence', `guildheart-apprentice-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== ARCHETYPE DEEP DIVES (8 CHOICES) ==========

  // 9. GUILD STRUCTURE TIER 1: HIERARCHY REORGANIZATION
  {
    label: "Three department heads gone, merchant council now 'advisory.' That change wasn't announced.",
    tags: ['Investigation', 'Structure', 'Organization', 'Power', 'Meaningful'],
    xpReward: 70,
    failResult: {
      text: `The charter display in the main hall has a clerk positioned beside it — a new addition since this morning, standing close enough to answer questions. His presence is an answer in itself. He asks for guild registration before permitting document handling. The posted organizational chart on the east wall — a different document, less detailed, officially public — lists department names without naming the individuals who currently fill or vacate them. The department head roster is posted separately in the member registry window during open hours.`,
      xp: 0,
      effects: [],
      next: [{ text: 'The member registry window posts the department head roster during open hours.', skill: 'survival', tag: 'safe', align: 'neutral', cid: '__arrive__' }]
    },
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'guild hierarchy analysis');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The posted charter shows five department heads with independent reporting authority. The current roster shows three of those positions vacant, two filled within the past six weeks by names that don't appear in prior guild rosters. The merchant council's listed function has changed from "governing board" to "advisory body" — in the same document, same header, different revision date. The revision date is not posted. Someone changed the charter annotation without issuing a new version number.`;
        G.stageProgress[1]++;
        addJournal('Structure analysis revealed centralized power consolidation', 'evidence', `guildheart-structure-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `A clerk intercepts you at the charter display and asks your guild registration number. When you can't provide one, he notes your physical description in a log — not your name, your description. "Organizational documentation is posted for registered members. Review of internal structure requires Category Two standing." He logs the time. You've been added to a record that has no name for you yet. Being tracked before you've asked anything specific means the inquiry will be harder from this point forward.`;
        G.worldClocks.watchfulness++;
        addJournal('Guild leadership alerted to hierarchy analysis inquiry', 'complication', `guildheart-structure-alert-${G.dayCount}`);
      } else {
        G.lastResult = `The hierarchy board on the east wall of the main hall shows recent additions — two new titles with no corresponding department descriptions. Three prior positions have been relabeled. The relabeling is administrative language: different weight, same function implied. The change happened in the past two months. No announcement is posted. The endorsing registrar whose signature appears on the new appointments is the same thread worth pulling.`;
        addJournal('Guild hierarchy modifications confirmed', 'evidence', `guildheart-structure-modified-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 10. TRADE NETWORK TIER 2: MERCHANT DISPLACEMENT
  {
    label: "Seventeen merchants dropped in eight months. Fifteen replaced by names sharing one endorsing signature.",
    tags: ['Investigation', 'Networks', 'Commerce', 'Displacement', 'Meaningful'],
    xpReward: 75,
    failResult: {
      text: `The commercial operations counter is staffed by a single clerk who asks for authorization before pulling the comparison records. Without it, the request sits in a morning queue. The active stall assignments are publicly visible from the merchant yard walkway — stall numbers, categories, posted names. The count there doesn't require authorization. Walking the yard and writing down the active names takes an hour and produces a partial roster that can be compared against the previous quarter's public summary, still posted on the south wall of the registry annex.`,
      xp: 0,
      effects: [],
      next: [{ text: 'The active stalls and public summary are both readable without authorization.', skill: 'survival', tag: 'safe', align: 'neutral', cid: '__arrive__' }]
    },
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'merchant network displacement mapping');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The active trading roster from eight months ago lists forty-three registered merchants. The current roster lists forty-one — but only twenty-six names overlap. Seventeen merchants have been removed; fifteen new ones added. The removed names cluster around specific trade categories: independent textile, direct-import grain, non-guild craft goods. The added names share a single endorsing registrar signature. One person approved all fifteen new registrations.`;
        G.stageProgress[1]++;
        addJournal('Network analysis revealed deliberate merchant displacement', 'evidence', `guildheart-network-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `A commercial operations clerk asks for your authorization reference before letting you compare the roster records. When you explain your access basis, she writes something in a ledger — not the roster ledger, a different one kept under the counter. "Merchant network data is Category Two. Formal request required." She keeps the under-counter log open. It doesn't close before you leave. You've been noticed here, and the note will move before you reach the next counter.`;
        G.worldClocks.watchfulness++;
        addJournal('Guild commercial operations alerted to network analysis', 'complication', `guildheart-network-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The posted trader board shows gaps — spaces where names were removed without replacement text. Four previously prominent traders are absent. Three new names appear near the top of a category they have no prior history in. The board is organized by registration date. The new entries have registration dates from the same two-week window. The name keeps appearing in unrelated offices — the single endorsing registrar signature links both this board and the membership record.`;
        addJournal('Merchant network composition changes confirmed', 'evidence', `guildheart-network-modified-${G.dayCount}`);
      } else {
        G.lastResult = `The active roster is behind the counter, not posted. The clerk confirms the count is current but won't allow direct comparison without authorization. "Membership records — Category Two, registered review only." She sets her quill down on the ledger edge in a way that marks the end of the conversation rather than a pause in it. The number she quotes for active traders doesn't match the number of marked stalls visible from the walkway outside. The gap between those two counts is already visible to anyone who bothers to walk the yard.`;
        addJournal('Merchant network analysis incomplete without records access', 'evidence', `guildheart-network-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 11. INFORMATION CONTROL TIER 1: RUMOR SUPPRESSION
  {
    label: "Two merchants, opposite ends of the quarter, the same phrase. They don't know each other.",
    tags: ['Investigation', 'Information', 'Communication', 'Control', 'Meaningful'],
    xpReward: 70,
    failResult: {
      text: `Both merchants are gone for the afternoon — one at a hall session, one on a supply run. The quarter is quieter at this hour. The freight counter clerk at the east gate, who hears everything that passes the covered walkway, is still at her post. She doesn't volunteer information, but she doesn't turn away inquiries either. She describes events by their logistical consequences: what moved, what didn't, what arrived in a different condition than it left. That register carries its own record of the event both merchants described.`,
      xp: 0,
      effects: [],
      next: [{ text: 'The freight counter clerk tracks events through what moved and what didn\'t.', skill: 'survival', tag: 'safe', align: 'neutral', cid: '__arrive__' }]
    },
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'information flow analysis');
      G.stageProgress[1]++;

      const result = rollD20('finesse', (G.skills.stealth || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Three merchants describe the same event differently. One says a colleague was removed from the roster for fee arrears. One says she resigned. One hasn't heard anything. All three were present at the same hall session three weeks ago. The event was the same. The versions aren't. Someone spoke to at least two of them after the session. The version that travels is the one that requires no follow-up questions.`;
        G.stageProgress[1]++;
        addJournal('Information analysis revealed systematic communication suppression', 'evidence', `guildheart-information-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `A man you don't recognize falls into step with you on the covered walkway. He doesn't introduce himself. "Questions about internal guild communications go through the arbiter's registry. Just so you know the correct channel." He peels off toward the east annexe before you can respond. His pace doesn't change. He knew where you were going before you turned. The watchful apparatus here is faster than the questions — someone knows what you're after before you finish asking.`;
        G.worldClocks.watchfulness++;
        addJournal('Guild monitoring alerted to information flow tracking', 'complication', `guildheart-information-alert-${G.dayCount}`);
      } else {
        G.lastResult = `At opposite ends of the merchant quarter — one near the east gate, one near the warehouse row — two merchants tell the same story about a recent dispute resolution with the same phrasing: "appropriate to the circumstances." They don't know each other's stalls, don't share a factor, don't move the same kinds of goods. The phrase is too specific to be coincidence, too uniform in delivery to be street repetition. Something prepared the story before it reached either of them. Both merchants glance at the guild hall while they speak; neither mentions they did.`;
        addJournal('Information control modifications detected', 'evidence', `guildheart-information-partial-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 12. COERCION MECHANISMS TIER 2: THREAT MAPPING
  {
    label: "Every merchant who filed a complaint lost something four days later. Same interval, different mechanism.",
    tags: ['Investigation', 'Coercion', 'Fear', 'Threats', 'Meaningful'],
    xpReward: 75,
    failResult: {
      text: `The merchants you want are not at their stalls. A factor nearby says the three who filed complaints this season have all moved to the outer yard since the arbitration cycle closed — shorter hours, reduced stock. She doesn't say why. The complaint register in the arbitration office is not publicly accessible, but the timing of each ruling is posted with the outcome stamp. Ruling dates and the dates losses were reported by the affected merchants can be cross-referenced from public documents alone. The interval is in the record if the record is read in sequence.`,
      xp: 0,
      effects: [],
      next: [{ text: 'Ruling dates and public outcome stamps are readable in sequence.', skill: 'survival', tag: 'safe', align: 'neutral', cid: '__arrive__' }]
    },
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'coercion apparatus documentation');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The pattern is in the timing. A merchant files a complaint about an arbitration ruling. Four days later, her warehouse access code stops working. Another questions a membership denial at a hall session. The following week, his trade agreement with a supplier is voided — the supplier cites a clause the merchant says was never in the original. The mechanisms are different. The interval is the same. Four days, every time.`;
        G.stageProgress[1]++;
        addJournal('Coercion analysis mapped systematic threat apparatus', 'evidence', `guildheart-coercion-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `A note arrives at your lodging before you return. No signature. "Category Three inquiries about guild conduct affect standing status. Current standing: provisional." You don't have provisional standing — you don't have standing at all. Someone assigned you a status specifically to threaten its removal. The pressure here has teeth: the apparatus documented itself by reaching for you, and it will be harder to move through this quarter without that file following every step.`;
        G.worldClocks.pressure += 2;
        addJournal('Inquiry drawing direct coercion response', 'complication', `guildheart-coercion-caught-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Three merchants lower their voices before they answer the same question. All three glance at the same door before speaking — the hall's east corridor, where the arbitration office sits, its brass fixture dulled from years of hands passing the handle. They don't coordinate it. The direction is instinctive, the way a room adjusts to a draught — each person turning slightly without deciding to turn. Whatever enforcement runs through that door, they already know its range and have mapped it into their daily movements without discussing it.`;
        addJournal('Merchant intimidation confirmed through behavioral patterns', 'evidence', `guildheart-coercion-confirmed-${G.dayCount}`);
      } else {
        G.lastResult = `The covered walkway is long enough that a person's approach is visible thirty paces before they arrive, and the stalls along it have learned to use that visibility. Merchants stop mid-sentence when other merchants pass. Conversations resume when the walkway clears. Nobody explains why. The pauses tell the shape of the threat — it can be triggered by witnesses, so witnesses are to be removed before speaking. The resumptions say that even empty air has not earned the trust the square used to extend freely. One factor at the end of the row watches her own hands as she talks, not your face.`;
        addJournal('Coercion suspected but specific mechanisms not yet documented', 'evidence', `guildheart-coercion-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 13. EXTERNAL MOVEMENT TIER 1: RESOURCE REDIRECTION
  {
    label: "Nineteen percent to 'administrative coordination, external.' No service contract for that line.",
    tags: ['Investigation', 'Resources', 'Flow', 'Redirection', 'Meaningful'],
    xpReward: 70,
    failResult: {
      text: `The financial operations office is closed for a category review — the door sealed with the blue wax the guild uses for restricted sessions. The posted quarterly summary outside the main hall is still accessible. It shows totals by category without the subsidiary breakdowns. The gap between total intake and posted expenditure is visible in that summary even without the subsidiary line items. The number standing in the gap is the question. What the gap is labeled as is in the annual register, filed with the Collegium observer's office for public review.`,
      xp: 0,
      effects: [],
      next: [{ text: 'The Collegium observer\'s annual register copy is filed for public review.', skill: 'survival', tag: 'safe', align: 'neutral', cid: '__arrive__' }]
    },
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'resource flow tracking');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The quarterly fee summary shows total intake and total infrastructure expenditure. The gap between them has widened each quarter for eight months — not because costs dropped, but because a third line appeared: "administrative coordination, external." It started at four percent of total intake. Last quarter it reached nineteen. The line item has no corresponding service contract in the posted expenditure register. The money is leaving Guildheart. Where it goes is not listed.`;
        G.stageProgress[1]++;
        addJournal('Resource flow analysis revealed external resource extraction', 'evidence', `guildheart-resources-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The financial operations clerk asks three questions before answering one. When you ask about the external coordination line, she writes something and excuses herself. She comes back with a supervisor. The supervisor has the same question list. "Resource allocation inquiries — Category One, leadership authorization required." The supervisor stays until you leave the building. The watchful response to a single question means the external coordination line is specifically protected — someone trained the clerks to react this way.`;
        G.worldClocks.watchfulness++;
        addJournal('Guild financial operations alerted to resource flow tracking', 'complication', `guildheart-resources-alert-${G.dayCount}`);
      } else {
        G.lastResult = `The posted summary shows infrastructure maintenance costs lower than the previous year, despite two new annexe builds. The gap could be accounting lag — or a line moved to a different register. The numbers are consistent with the posted totals. They're not consistent with the physical building work visible from the yard. The subsidiary accounts Toren controls are the next place to look.`;
        addJournal('Resource redistribution modifications detected', 'evidence', `guildheart-resources-partial-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 14. TRUST EROSION TIER 2: INSTITUTIONAL FAITH COLLAPSE
  {
    label: "The common bench is empty at midday. Merchants who arrived together stand at separate walls.",
    tags: ['Investigation', 'Trust', 'Institutions', 'Faith', 'Meaningful'],
    xpReward: 75,
    failResult: {
      text: `The midday session convenes and the hall fills with procedural noise — the arbiter's counter opens, a queue forms, clerks move between the annexe windows. The patterns that are visible in the empty common bench disappear into the managed activity of the session. They'll be legible again at close of hall, when merchants re-sort themselves by instinct rather than procedure. The bench outside the arbitration window, visible from the covered walkway, holds the same arrangement at every session. Who sits alone there, and who doesn't sit at all, is a record of its own.`,
      xp: 0,
      effects: [],
      next: [{ text: 'Close of hall is when the patterns become legible again.', skill: 'survival', tag: 'safe', align: 'neutral', cid: '__arrive__' }]
    },
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'institutional trust erosion documentation');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The guild hall's common bench — where merchants used to gather before proceedings — is empty at midday. Six merchants stand separately, each at a different wall. They arrived at the same time. None of them approached the others. A factor nearby says the same bench was crowded six months ago. "People stopped sitting together." She doesn't say why. She doesn't need to. The bench is still the same bench. The merchants are still the same merchants. Something between them is gone.`;
        G.stageProgress[1]++;
        addJournal('Trust analysis revealed systematic institutional faith destruction', 'evidence', `guildheart-trust-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Two merchants spot you speaking to a third and cross the yard to take a different walkway. They don't know you. They know what questions look like from the outside. By midafternoon, the merchant you were speaking with has moved her stall display to face the wall. Your presence here is a liability to anyone seen talking with you. The isolation tightens around this line of inquiry — the next conversation will be harder to open, and shorter when it opens.`;
        G.worldClocks.isolation++;
        addJournal('Merchants avoiding contact due to proximity risk', 'complication', `guildheart-trust-caught-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `A factor mentions that two merchants who used to share a cart now ship separately. More expensive. Less efficient. The canal quarter's midday smell of wet stone and rope tar drifts in from the loading yard. "They had a disagreement about fees." Her tone makes it clear she doesn't believe the explanation she's giving — the words come out flat, already stripped of conviction. The cart is still parked between their stalls, unclaimed. Neither merchant has moved it. Neither one claims it now, and neither one will say why.`;
        addJournal('Institutional trust erosion confirmed through merchant interviews', 'evidence', `guildheart-trust-confirmed-${G.dayCount}`);
      } else {
        G.lastResult = `The merchant quarter operates at its ordinary afternoon pace — cart wheels on stone, bargaining at the cloth stalls, a cooper's hammer working a barrel across the yard. Merchants answer questions about the guild politely and without length. The answers don't close — they stop. There's a difference. Closed answers have an endpoint, a concluding phrase, a wrap of politeness. These just end, mid-thought, at the moment before anything specific. Speakers find something to look at on the ground, on a passing cart, on their own hands. They return their attention to their work before the silence can be named.`;
        addJournal('Institutional trust concerns detected but incompletely documented', 'evidence', `guildheart-trust-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 15. MERCHANT VULNERABILITY TIER 1: ECONOMIC EXPOSURE
  {
    label: "Rulings cluster on merchants with one route, no backup suppliers. Someone mapped them first.",
    tags: ['Investigation', 'Vulnerability', 'Economics', 'Exposure', 'Meaningful'],
    xpReward: 70,
    failResult: {
      text: `The exposed merchants are in session — four of them behind the arbitration window at once, a cluster that doesn't normally appear on the same calendar day. The procedure will keep them occupied for another hour at least. The posted supplier registry on the south wall of the merchant annex lists each registered trader's declared primary and secondary trade relationships. Which merchants listed no secondary supplier is visible there, in ink, from the public corridor, without authorization or conversation required.`,
      xp: 0,
      effects: [],
      next: [{ text: 'The supplier registry on the south annex wall is publicly posted.', skill: 'survival', tag: 'safe', align: 'neutral', cid: '__arrive__' }]
    },
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'merchant vulnerability mapping');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The most exposed merchants share a profile: no guild family, single trade route, no secondary supplier. Remove warehouse access and they have nowhere to stage goods. Void one agreement and their only route closes. Each one is one ruling away from stopping. Someone catalogued this — the recent arbitration rulings cluster on merchants matching the profile with striking precision. The variance isn't random. These aren't the merchants who lost disputes. They're the merchants who could be stopped with the least resistance.`;
        G.stageProgress[1]++;
        addJournal('Merchant analysis revealed systematic economic vulnerability weaponization', 'evidence', `guildheart-vulnerability-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `A clerk intercepts you at the trade license counter. "Merchant standing assessments are Category Two, restricted access. I've flagged this inquiry." She hands you a reference number — not for the inquiry you're conducting, but for an inquiry into your own standing status. Someone already opened a file on you. The flag predates today's conversation. That pressure is already in the room before you arrived — asking further questions here will only make the file thicker.`;
        G.worldClocks.pressure++;
        addJournal('Arbitrator prohibited further merchant vulnerability analysis', 'complication', `guildheart-vulnerability-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Four merchants in the same section of the yard operate at the same scale — same stall size, same cart, same goods category. Two are visibly nervous, their manifests checked and re-checked at the counter. Two are not. The nervous two have no secondary trade relationships — their whole operation runs through guild-controlled staging, canal-side, one route only. The other two have outside buyers they named before you asked. The difference between them is a single backup channel, and everyone in the yard who's been here longer than a season already knows which two are exposed.`;
        addJournal('Merchant vulnerability and fear patterns confirmed', 'evidence', `guildheart-vulnerability-confirmed-${G.dayCount}`);
      } else {
        G.lastResult = `Merchants don't describe their exposures directly. They describe what they can afford not to do. "I can't miss the hall session." "I don't argue staging fees." Each phrase lands in the cold stone acoustics of the covered walkway and stays there. The vulnerability is in the constraint, not the complaint — what they refuse doesn't show in their ledgers, only in the way they hold their weight when an arbiter's name comes up. What they can't say no to tells you more than what they say yes to.`;
        addJournal('Merchant vulnerability analysis incomplete without financial data', 'evidence', `guildheart-vulnerability-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 16. DECISION OPACITY TIER 2: UNEXPLAINED AUTHORITY SHIFTS
  {
    label: "No issuing body, no number — just his name on the outcome.",
    tags: ['Investigation', 'Authority', 'Opacity', 'Decision', 'Meaningful'],
    xpReward: 75,
    failResult: {
      text: `The decision board is occupied — a guild officer stationed directly in front of it, logging visitors. His clipboard already has names. He asks for registry number before permitting close reading. The rulings posted there are dated, stamped, and cross-referenced to parties; none of that requires close reading to record. The reference categories cited — the ones marked "per coordinating directive" — are visible at arm's length from the corridor. Writing down which rulings share the category, and on which dates, costs nothing and requires no authorization. Pattern first. Detail later.`,
      xp: 0,
      effects: [],
      next: [{ text: 'Recording which rulings share the directive category requires no clearance.', skill: 'survival', tag: 'safe', align: 'neutral', cid: '__arrive__' }]
    },
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'authority structure opacity analysis');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Three rulings this month cite the same authority: "per coordinating directive." No directive is numbered. No issuing body is named. The arbitrator's own name appears as the implementing authority — not the originating one. He executes decisions he didn't make and takes credit for the outcome in the record. When merchants appeal, they appeal to him. His response is the directive he implemented. The appeal closes on the same document that opened it. The loop has no exit point.`;
        G.stageProgress[1]++;
        addJournal('Authority analysis revealed deliberate decision opacity structure', 'evidence', `guildheart-opacity-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `A guild officer stops you outside the decision board and asks your registered purpose. When you describe what you're reviewing, he writes a memo on the spot. "Decision process review is Category One — leadership-authorized only. I'm flagging this as an unregistered inquiry." He hands you a copy of the memo. You are now, technically, the subject of a Category One flag you generated by reading a public board. The scrutiny attached to that flag will follow you into every subsequent inquiry at this hall.`;
        G.worldClocks.watchfulness++;
        addJournal('Guild leadership notified of decision structure review', 'complication', `guildheart-opacity-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The rulings board lists outcomes but not deliberation records — clean stamps on cold parchment, pinned under the east window where afternoon light makes the ink look deliberate. The standard guild process requires a three-party review notation. None of the last nine rulings carry the notation. They were decided by a single authority signature. When that authority is the arbitrator, the process requires a second signature. The second signature line is blank on eight of nine. The blank line isn't an oversight; it appears in the same position on each ruling, consistently, as though the form was designed for it.`;
        addJournal('Decision structure opacity confirmed', 'evidence', `guildheart-opacity-confirmed-${G.dayCount}`);
      } else {
        G.lastResult = `The guild hall's decision board hangs under the east window, afternoon light angling across its pinned notices. The decision board is current; new rulings appear weekly, clean print, clean stamps. The posted process document — framed in oak above the board, behind smudged glass — is two years old. Whether they still match isn't something the board makes clear. It posts outcomes, not process. The gap between them is the question, and the board doesn't answer it. A clerk passes, replaces a thumbtack that had come loose, and continues without reading anything pinned to the board.`;
        addJournal('Decision opacity analysis incomplete without internal access', 'evidence', `guildheart-opacity-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== GOSSIP & TENSION LAYERS (4 CHOICES) ==========

  // 17. STREET RUMOR: MERCHANT WHISPERS
  {
    label: "The merchant quarter is running a story that doesn't need to be accurate. Just possible.",
    tags: ['Investigation', 'Rumor', 'Commerce', 'Gossip', 'Meaningful'],
    xpReward: 65,
    failResult: {
      text: `The quarter is quiet — the midday session has pulled most of the foot traffic toward the hall. The two merchants you approached have moved on or gone inside. The covered walkway echoes with cart noise but no conversation. The rumors that move through here travel best at the margins of the trading day: early morning at the water trough, end-of-afternoon at the factor's bench near the gate. Coming back at either of those hours would find the rumor current in circulation rather than the story already told and put away.`,
      xp: 0,
      effects: [],
      next: [{ text: 'Merchant gossip circulates most freely at the margins of the trading day.', skill: 'survival', tag: 'safe', align: 'neutral', cid: '__arrive__' }]
    },
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'parsing merchant narrative');
      G.stageProgress[1]++;

      const rumor = ['the arbitrator is taking bribes to fix disputes', 'independent merchants are being systematically frozen out of the guild', 'arbitration decisions are made before the hearing even starts', 'someone is stealing guild resources and sending them north', 'the guild membership oaths are being used to coerce merchants into illegal activities'];
      const selected = rumor[Math.floor(Math.random() * rumor.length)];

      G.lastResult = `The story moving through the merchant quarter today: "${selected}." Two traders repeat it with different details. A third says he heard it from someone who was there. None of the three versions match on specifics, but all three agree on the shape of it. The story keeps moving because it answers a question traders are already carrying. They don't need it to be accurate. They need it to be possible.`;
      addJournal(`Merchant rumor gathered: "${selected}"`, 'evidence', `guildheart-rumor-${G.dayCount}`);

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 18. WAREHOUSE RUMOR: LOADING DOCK TALK
  {
    label: "The loading crews talk after hours. Someone heard something near Bay Seven.",
    tags: ['Investigation', 'Rumor', 'Commerce', 'Gossip', 'Meaningful'],
    xpReward: 65,
    failResult: {
      text: `The loading crews are mid-shift — coordinated, loud, no gaps in the work pattern where a conversation would fit. The carter foreman moves through the yard giving counts. None of the crews stop what they're doing. The after-hours assembly point is a bench along the outer wall of the warehouse annex, visible from the street. It's empty now. At close-of-yard, the crews who've been in Bay Seven all day will sit there while the next rotation comes on. That handoff is when the day's account gets told.`,
      xp: 0,
      effects: [],
      next: [{ text: 'The Bay Seven crews talk at the close-of-yard handoff, bench on the outer wall.', skill: 'survival', tag: 'safe', align: 'neutral', cid: '__arrive__' }]
    },
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'parsing merchant narrative');
      G.stageProgress[1]++;

      const rumor = ['the arbitrator is taking bribes to fix disputes', 'independent merchants are being systematically frozen out of the guild', 'arbitration decisions are made before the hearing even starts', 'someone is stealing guild resources and sending them north', 'the guild membership oaths are being used to coerce merchants into illegal activities'];
      const selected = rumor[Math.floor(Math.random() * rumor.length)];

      G.lastResult = `The story moving through the merchant quarter today: "${selected}." Two traders repeat it with different details. A third says he heard it from someone who was there. None of the three versions match on specifics, but all three agree on the shape of it. The story keeps moving because it answers a question traders are already carrying. They don't need it to be accurate. They need it to be possible.`;
      addJournal(`Merchant rumor gathered: "${selected}"`, 'evidence', `guildheart-rumor-${G.dayCount}`);

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 18. INSTITUTIONAL CRACK: ARBITRATION CORRUPTION PROOF
  {
    label: "The paper trail of arbitration corruption is assembling. Time to compile and show it.",
    tags: ['Investigation', 'Evidence', 'Proof', 'Corruption', 'Meaningful'],
    xpReward: 80,
    failResult: {
      text: `The archive reading room requires a registered introduction — the archive clerk asks for it at the door before the reading table is offered. Unregistered visitors are not turned away; they're directed to the public holdings shelf, which carries only finalized rulings without accompanying notes or correspondence. The finalized record is thinner evidence than the internal correspondence, but it is a record. Seven rulings citing the same category in the same nine-week window are documented in the public holdings. That sequence is a place to start.`,
      xp: 0,
      effects: [],
      next: [{ text: 'The public holdings shelf carries finalized rulings without requiring a registered introduction.', skill: 'survival', tag: 'safe', align: 'neutral', cid: '__arrive__' }]
    },
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(80, 'exposing arbitration conspiracy');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The rulings carry marginal notes in one hand — the arbitrator's — that directly contradict the written decision text. "Hold — pending confirmation" appears on a ruling stamped as finalized. A letter fragment references "outcome Category Two, proceed per attached schedule." The schedule isn't attached. But three rulings issued the following week match the sequence the letter implies. The record isn't clean. Someone assembled it to look clean from a distance.`;
        G.stageProgress[1]++;
        addJournal('Arbitration corruption documented with paper evidence', 'evidence', `guildheart-proof-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Someone takes the documents before you finish compiling them. Not the originals — your notes. A clerk apologizes: "Unregistered document reproduction from guild records — Category One violation. This has been reported." Your compiled work is gone. What you assembled from memory is accurate. What you can prove is now thinner. The pressure here is measured: whoever runs this apparatus prefers to drain the evidence rather than remove the person carrying it.`;
        G.worldClocks.pressure++;
        addJournal('Compiled arbitration evidence seized and inquiry flagged', 'complication', `guildheart-proof-caught-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `Seven rulings in nine weeks cite the same procedural category for their basis — "coordinating directive." The archive's reading table holds all three bound volumes; the lamp above casts even light across the stamped pages, each entry dated in a neat clerk's hand. Individually, each ruling looks standard. Together, the pattern is a column: same category, same outcome type, same week-of-month timing. Either the guild developed a remarkably consistent case distribution, or someone is scheduling the outcomes and the cases are built to follow.`;
        addJournal('Arbitration coordination strongly suggested by ruling pattern', 'evidence', `guildheart-proof-partial-${G.dayCount}`);
      } else {
        G.lastResult = `The public rulings record fills three bound volumes on the archive's reading table — entries dated, stamped, alphabetized, cross-referenced to the disputed parties. The record is complete and unremarkable. Every procedural mark is where it should be. The coordination, if it's there, runs through documents no outsider has standing to access: internal deliberation notes, pre-hearing correspondence, originating directives filed elsewhere. The public record was designed to be reviewed. What's behind it wasn't. The archive clerk watches from across the room and doesn't interrupt. She doesn't need to. The volumes say everything they were meant to say.`;
        addJournal('Arbitration proof incomplete without internal correspondence access', 'evidence', `guildheart-proof-incomplete-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 19. MORAL PRESSURE: GUILD ROLE COMPROMISE CHOICE
  {
    label: "A guild official is complicit. Protect them or expose them.",
    tags: ['Investigation', 'Moral', 'Choice', 'Pressure', 'Confrontation', 'Meaningful'],
    xpReward: 70,
    effects: [
      { type: 'heat', polity: 'union', amount: 1 },
      { type: 'rival', amount: 1 }
    ],
    failResult: {
      text: `The official is in session — the anteroom clerk says it will be two hours, possibly three. The wait bench is narrow and faces the corridor, where everyone who passes can see who is sitting and for how long. Waiting here is its own kind of visibility. The evidence you've gathered is already assembled; the confrontation is a matter of timing. Coming back at close of hall, when the corridors are thinner and the session doors open of their own accord, would find the official alone with the folder still on the table.`,
      xp: 0,
      effects: [],
      next: [{ text: 'Close of hall is a better moment — fewer witnesses, the session already concluded.', skill: 'survival', tag: 'safe', align: 'neutral', cid: '__arrive__' }]
    },
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'making moral commitment');
      G.stageProgress[1]++;

      const npcOptions = [
        { name: 'Guild Arbitrator Kesh', role: 'chief arbitrator', fear: 'They threatened my family. I had to cooperate or my children would lose access to guild apprenticeships' },
        { name: 'Ledger Master Toren', role: 'financial keeper', fear: 'I was ordered to maintain false records or face financial ruin and blacklisting' },
        { name: 'Merchant Representative Ilya', role: 'trade advocate', fear: 'I wanted to resist but they said if I spoke out, I\'d be excluded and all my trade agreements canceled' }
      ];

      const npc = npcOptions[Math.floor(Math.random() * npcOptions.length)];

      G.lastResult = `${npc.name} doesn't argue when you put the evidence down. A long pause. Then: "${npc.fear}." They're not asking for absolution. They're explaining the shape of the trap they're in. The folder is still open on the table between you. Their guild mark is visible on their cuff. Whether you leave this conversation as allies or adversaries depends on what you say next.`;

      if (!G.flags) G.flags = {};
      G.flags.stage1_evidence_decision = 'pending';
      G.flags.stage1_moral_npc = npc.name;

      addJournal(`Confronted ${npc.name} (${npc.role}) about arbitration corruption participation`, 'complication', `guildheart-moral-${G.dayCount}`);

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 20. DISCOVERY MOMENT: EXTERNAL COORDINATION SOURCE
  {
    plot: 'main',
    label: "The corruption in guild arbitration runs through an external hand nobody has named.",
    tags: ['Investigation', 'Origin', 'Discovery', 'Climax'],
    xpReward: 80,
    failResult: {
      text: `The archive corridor is locked for the afternoon — a Category One session in progress, the door sealed. The courier intake desk beside the east annexe exit is still staffed. Courier receipts from the past six weeks are public record, held at the desk for thirty days before filing. The routing codes on incoming parcels are stamped on the receipt copies. A routing code that doesn't appear in the Guildheart manifest registry will stand out in the sequence — visibly, without pulling restricted documents. The stack for the current month is on the desk.`,
      xp: 0,
      effects: [],
      next: [{ text: 'The courier receipt stack at the east annexe desk is public record for thirty days.', skill: 'survival', tag: 'safe', align: 'neutral', cid: '__arrive__' }]
    },
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(80, 'discovering origin source of arbitration corruption');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The courier receipts use a routing code that doesn't appear in the Guildheart manifest registry. When you trace it against the transit yard's external ledger, the code maps to a delivery point northeast of Ithtananalor — same staging location the porter Selain described. The instructions attached to two of the receipts use language from the arbitration amendment directives verbatim. Whoever wrote the directives also wrote the courier instructions. The hand coordinating Guildheart's arbitration is north of it, and has been for at least eight months.`;
        G.stageProgress[1]++;
        addJournal('External coordination source identified — northeast routing, matching directive language', 'discovery', `guildheart-origin-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `A courier you don't recognize stops you at the archive corridor. He hands you a folded note and leaves before you open it. Inside: "Category One inquiry. Stop or be stopped." No signature. The handwriting is precise — not a clerk's hand, someone trained in formal notation. Someone outside this building read your movements today before you entered the archive. The pressure this time isn't procedural — it's personal, and it's from a hand that doesn't need a flag form to track you.`;
        G.worldClocks.pressure += 2;
        addJournal('External party intercepted archive approach with direct warning', 'complication', `guildheart-origin-caught-${G.dayCount}`);
      } else if (result.total >= 14) {
        G.lastResult = `One arbitration directive carries a routing stamp that doesn't match any Guildheart department seal. The stamp is partial — edge-clipped, as though trimmed before filing — but what's visible shows a different typeset than the guild's standard brass-block issue. The archive room is cold and quiet, the quill-and-ledger smell of a space where paper outlasts the hands that handled it. The directive entered from outside and was stamped as internal once received. Someone inside the hall processed external instructions as though they originated here, and filed them accordingly.`;
        addJournal('External coordination confirmed — external directive stamped as internal', 'discovery', `guildheart-origin-external-${G.dayCount}`);
      } else {
        G.lastResult = `Two directives in the rulings archive reference an authority that isn't named — just "per coordinating authority, northeast." The phrase sits in the text without footnote, without definition, as though the clerk who copied it expected the reader to already know. The archive shelves hold sixty years of guild decisions in bound volumes with brass fittings; these two pages don't belong to that continuity. The geographic reference is narrow enough to be a locality designation. It's too specific to be a procedural category. Whatever is northeast of Guildheart, someone here answers to it.`;
        addJournal('External coordination indicated but origin not yet identified', 'evidence', `guildheart-origin-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== EXPANSION CHOICES ==========

  // 21. CLUE: PRE-UNION CHARTER FRAGMENT
  {
    label: "The current mandate cites authority the pre-Union charter doesn't contain.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 72,
    failResult: {
      text: `The basement stacks are closed — a water repair has the lower archive off-limits since the previous evening. A notice card in the corridor gives no timeline for reopening. The Collegium observer's office on the second floor holds a certified copy of the pre-Union charter as part of its monitoring file. Observer Trent described it as submitted through the formal channel — a public document available for review with a written introduction. The authority clause in the current mandate is the discrepancy worth comparing. That comparison is possible from the second floor copy if the ground floor is sealed.`,
      xp: 0,
      effects: [],
      next: [{ text: 'The Collegium observer holds a certified copy of the pre-Union charter on the second floor.', skill: 'survival', tag: 'safe', align: 'neutral', cid: '__arrive__' }]
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'reading charter discrepancy evidence');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 13) {
        G.lastResult = `The pre-Union charter grants arbitration authority to a council of seven elected representatives. The current mandate assigns the same authority to a single senior arbiter — appointed by a "coordinating oversight body." The oversight body is not named anywhere in the document. Not footnoted. Not defined. The authority now flows to a position appointed by something the charter declines to describe.`;
        if (!G.flags) G.flags = {};
        G.flags.found_charter_discrepancy = true;
        addJournal('Charter discrepancy identified: arbitration authority reassigned to unnamed oversight body', 'evidence', `guildheart-charter-${G.dayCount}`);
      } else {
        G.lastResult = `You find the relevant charter section. The paper is water-stained at the top, and the authority clause runs directly into the damaged margin. The structure of the document changed — the column layout is different from the current mandate — but the original language of the authority provisions is illegible where it matters most. The Collegium observer may hold a clean copy of the pre-Union text.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 22. CLUE: OFF-CHANNEL ARBITER CONTACT
  {
    label: "The senior arbiter's schedule ends at close of hall. Where he goes after is unfiled.",
    tags: ['Investigation', 'Evidence', 'Stealth', 'Stage1', 'Meaningful'],
    xpReward: 75,
    failResult: {
      text: `Close of hall comes and the arbiter exits through the east corridor, turns south — and boards a guild transport that carries four other officers toward the residential quarter. A group departure on official transport leaves no readable off-channel thread. The contact, if there is one tonight, happens after the transport drops. The cartwright's workshop on the east side of the residential block is still worth examining in daylight — courier stops don't always require the principal to be present, and the lamp-above-scale mark may appear on other materials stored there.`,
      xp: 0,
      effects: [],
      next: [{ text: 'The cartwright\'s workshop with the courier stop is still worth examining in daylight.', skill: 'survival', tag: 'safe', align: 'neutral', cid: '__arrive__' }]
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(75, 'tracking off-channel contacts');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('finesse', (G.skills.stealth || 0) + Math.floor(G.level / 3));
      if (result.isCrit) {
        G.lastResult = `The arbiter stops at a cartwright's workshop three blocks east. No transaction — a sealed letter taken from a courier, a single hand gesture of acknowledgment. The courier's pack carries a pressed mark: a lamp centered above a scale. No guild registry you know uses that sigil. The arbiter is back at the hall in under twenty minutes. The letter goes directly into the inside pocket, not the document satchel. It wasn't filed. It was kept.`;
        if (!G.flags) G.flags = {};
        G.flags.witnessed_arbiter_contact = true;
        addJournal('Arbiter off-channel contact witnessed — unrecognized sigil: lamp above scale', 'evidence', `guildheart-arbiter-tail-${G.dayCount}`);
      } else if (result.total >= 11) {
        G.lastResult = `The arbiter takes a seat at the back of a tavern on the east side and stays for twenty minutes. No drink ordered, no visible conversation. The seat faces the rear entrance. When he leaves, the tavern keeper wipes the table immediately — before other patrons have cleared nearby seats. The table wasn't empty long enough for a natural cleaning rotation.`;
      } else {
        G.lastResult = `The lamp-lit streets of Guildheart thin out toward the residential quarter, and the arbiter walks them without glancing back. Steady pace, no detours, no secondary stops. The route cuts through the merchant square, past the east annexe gate, and straight to his posted residence. Either tonight wasn't the night, or the route is a clean one used specifically when surveillance is expected — a walk shaped for being observed without producing anything. The tail produced nothing. Nothing is its own kind of result, and the shape of this nothing is practiced. He's done this walk knowing it was watched before. The cartwright's workshop on the east side — where the courier stopped — is still worth examining in daylight.`;
        if (!G.worldClocks) G.worldClocks = {};
        // No penalty — stealth fails shouldn't always punish
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 23. ARCHETYPE-GATED: READING THE GUILD FLOOR
  {
    label: "The guild floor has a second accounting beneath the first. That one is what matters.",
    tags: ['Investigation', 'Archetype', 'Stage1', 'Meaningful'],
    xpReward: 68,
    failResult: {
      text: `The trading floor is in full midday session — too much noise, too much coordinated movement for the secondary patterns to separate from the primary ones. The arbiter's presence on the floor during peak hours compresses every conversation into its most formal register. The patterns that reveal the parallel economy — the gestural exchanges, the early sentence-endings, the glances toward the east corridor — are only legible when the floor is at partial capacity. The early morning opening, before the session fills, is when the second accounting shows itself.`,
      xp: 0,
      effects: [],
      next: [{ text: 'The floor\'s second economy is legible at partial capacity, before the session fills.', skill: 'survival', tag: 'safe', align: 'neutral', cid: '__arrive__' }]
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'reading the trading floor');
      const arch = G.archetype && G.archetype.group;

      if (arch === 'combat') {
        G.lastResult = `The arbiter crosses the floor twice in an hour. Both times, merchant conversations in his path stop a beat before he arrives and resume a beat after he passes. No one looks at him directly. The pressure isn't in what he does — he does nothing visible. It's in the space he creates by moving. The floor adjusts to him the way a room adjusts to someone carrying a weapon at rest.`;
      } else if (arch === 'magic') {
        G.lastResult = `Surface prices move. Real agreements complete in the pause between the quote and the written confirmation — a look, a slight incline of the head, the quill lowering before it's been asked to — and both parties know something the ledger won't show. Seven such exchanges in an hour, each one conducted in the ordinary noise of the guild floor, chalk dust and cart-axle sounds masking the moment. The floor has a second accounting running beneath the first, and the second one is the one that determines which merchants will still hold their routes by quarter's end.`;
      } else if (arch === 'stealth') {
        G.lastResult = `Three men on the floor have no merchandise, no stall, no manifest. They're positioned wide across the trading space: one near the main entrance with his back to a pillar, one near the record desk turning a coin in his fingers, one moving a slow circuit through the center aisle between the chalk-marked stalls. They track which merchants approach which stalls and in what sequence, their eyes moving without their heads moving. Someone is building a relationship map of this floor, and they're doing it through observation alone — the brass fixtures and cold stone carrying sound farther than most traders account for.`;
      } else {
        G.lastResult = `A factor stops her pitch mid-sentence when the senior arbiter enters the floor. She waits until he passes her section before resuming. Her posture changes — shoulders lower, pace increases — the moment he clears the center aisle. The arbiter doesn't look at her. She tracks him without turning her head until he exits through the east corridor. When you ask her about the Eastgate routing changes, she begins: "The directive came through the fourteenth-cycle administrative—" She stops. Her eyes move to something over your shoulder. She finishes a different sentence entirely: "Standard routing review. Nothing unusual."`;

      }
      addJournal('Guild floor analysis: second economy and coercive arbiter control confirmed', 'evidence', `guildheart-floor-read-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 24. FACTION SEED: OVERSIGHT COLLEGIUM
  {
    label: "The Collegium observer has been here sixty-two days. That's monitoring, not an inquiry.",
    tags: ['Faction', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 70,
    failResult: 'This path is closed here, but the formal submission channel Trent described — written, signed, specific — is still open.',
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'making Oversight Collegium contact');
      if (!G.factionHostility) G.factionHostility = { warden_order: 0, iron_compact: 0, oversight_collegium: 0 };

      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        if (!G.flags) G.flags = {};
        G.flags.met_oversight_collegium_observer = true;
        G.lastResult = `Observer Calla Trent keeps her hands folded on the desk and listens to the first two sentences before responding. "The Collegium has been stationed here sixty-two days. We are in a monitoring phase." She doesn't explain what monitoring leads to, but she slides a form across the desk — addressable, formal, with a Collegium reference line. "Written summary. Signed. Specific." She taps the reference line. "That's the channel." She pulls the form back two inches and straightens it before releasing it. Everything here goes into her record, not yours.`;
        G.factionHostility.oversight_collegium += 1;
        addJournal('faction', 'Oversight Collegium observer Calla Trent — monitoring phase active, formal submission channel opened', `guildheart-collegium-${G.dayCount}`);
      } else {
        G.lastResult = `Observer Trent listens to your introduction and asks for your guild registry number. When you explain you're not guild-registered, she sets a form on the desk between you. "Informal conversation with Collegium observers requires formal introduction through the registry. That's not bureaucratic obstruction — that's how testimony stays admissible." She's not closing the door. She's telling you where it is.`;
        if (!G.flags) G.flags = {};
        G.flags.located_oversight_collegium_observer = true;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 25. ATMOSPHERE: THE GUILD MEMORIAL BELL
  {
    label: "The bell rings nine times. There are twelve registered guilds now.",
    tags: ['WorldColor', 'Lore', 'Stage1', 'Meaningful'],
    xpReward: 52,
    failResult: {
      text: `The bell tower is locked — the door at its base carries a maintenance seal, the stair inside inaccessible. The bell rings anyway, at its hour, without a ringer visible. The mechanism is automated, the chain set on a weighted clock pull. The factor you wanted to ask about the count is already gone from her stall. The story about the nine rings and the twelve guilds moves through the quarter at a pace of its own. Waiting at the south gate in the late afternoon finds the same factor returning with her cart, the day's business done, unhurried.`,
      xp: 0,
      effects: [],
      next: [{ text: 'The factor returns to the south gate in the late afternoon with her empty cart.', skill: 'survival', tag: 'safe', align: 'neutral', cid: '__arrive__' }]
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(52, 'reading local memorial culture');

      G.lastResult = `The bell rings nine times. One for each guild in the original Guildheart compact. The factor finishes marking her manifest before answering. "Twelve registered guilds now. Bell still rings nine." She caps her ink. "Nobody's changed the bell because nobody wants to be the one who changed the bell." She moves to the next stall. The last ring fades into a yard that has three more members than the bell counts for.`;
      addJournal('Guild memorial bell: original nine-guild compact no longer reflects current power structure', 'discovery', `guildheart-bell-${G.dayCount}`);
      G.recentOutcomeType = 'explore'; maybeStageAdvance();
    }
  },

  // 26. PERSONAL ARC SETUP: COURIER NETWORK
  {
    label: "Everything that leaves Guildheart gets logged at the guild desk. Mandatory for a year now.",
    tags: ['PersonalArc', 'Stealth', 'Stage1', 'Meaningful'],
    xpReward: 65,
    failResult: 'This path is closed here, but the wool merchant who makes the outlying settlement run three times a week may operate differently than the registry couriers.',
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(65, 'establishing courier drop');
      if (!G.flags) G.flags = {};

      const result = rollD20('finesse', (G.skills.stealth || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `A wool merchant who makes the run to outlying settlements three times a week doesn't look up from her manifest when you explain the arrangement. "Sealed cargo is sealed cargo." She names a drop location near the eastern gate and a timing window. "Don't make it complicated." She adds your first parcel to the wool manifest under a fiber weight notation that will mean nothing to a guild clerk. The channel is open.`;
        G.flags.courier_drop_guildheart = true;
        addJournal('consequence', 'Independent courier channel established through wool merchant', `guildheart-courier-${G.dayCount}`);
      } else {
        G.lastResult = `Three couriers, three conversations, each one held at the guild desk beneath the registry board with its rows of stamped routing categories. All three route through the guild's message registry without exception. One of them says it directly, setting his delivery satchel on the counter while he speaks: "Anything that goes out of Guildheart gets logged at the desk. That's been mandatory for a year now — the arbiter's office pushed it through." The channel you need doesn't exist yet inside these walls. Building it takes a courier who works outside them.`;
      }
      G.recentOutcomeType = 'stealth'; maybeStageAdvance();
    }
  },

  // 27. SOCIAL: THE DISPLACED FACTOR
  {
    label: "Three factors pulled last month for the same violation. Two kept their licenses. One didn't.",
    tags: ['Social', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 67,
    failResult: 'This path is closed here, but the empty stall space still carries Paerun\'s registration number — the hall records will show who filed the enforcement action.',
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(67, 'hearing displaced factor account');

      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 10) {
        if (!G.flags) G.flags = {};
        G.flags.met_paerun_delst = true;
        G.lastResult = `Paerun Delst is still in Guildheart. Still waiting, though he doesn't say for what. He keeps his revoked license card in his breast pocket — visible edge above the cloth, the guild stamp face-out. "Same scales as Bren and Maret." He nods toward two active stalls. "Same calibration. Mine got pulled. Theirs didn't." He's already done being angry. What's left is just the fact of it, stated flat, waiting for someone to do something with it.`;
        addJournal('Displaced factor Paerun Delst: selective enforcement of identical violation confirmed', 'evidence', `guildheart-paerun-${G.dayCount}`);
      } else {
        G.lastResult = `Paerun watches you approach and answers before you finish the introduction. "I don't discuss the license case." He's not hostile — he's rehearsed, the words coming out at the same pace as a factor reading a posted category. Someone told him not to, or he decided on his own that talking doesn't change the outcome anymore. The stall space where he used to operate is empty behind him, still marked with his registration number in chalk on the pillar — not erased, not reassigned. Whoever runs this hall decided the empty space makes its own point.`;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // 28. SHADOW RIVAL INTRO
  {
    label: "A factor passes a note. Someone has been asking about me. The questions are detailed.",
    tags: ['Rival', 'Warning', 'Stage1', 'Meaningful'],
    xpReward: 58,
    failResult: {
      text: `The dockside factor is in conversation with a hall clerk when you approach — a formal exchange, ledger open between them, nothing to interrupt. She clocks your approach without acknowledging it and keeps her attention on the clerk. The note she meant to pass stays in her apron. When the clerk leaves she moves directly to her next stall. The passage for it will come later — she'll look for you at the freight counter's east end during the slow hour before close of yard, which is where she handles anything that shouldn't be handed over in a crowd.`,
      xp: 0,
      effects: [],
      next: [{ text: 'The factor will look for you at the freight counter\'s east end before close of yard.', skill: 'survival', tag: 'safe', align: 'neutral', cid: '__arrive__' }]
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(58, 'receiving rival warning');
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};

      const arch = G.archetype && G.archetype.group;
      if (arch === 'combat') {
        G.lastResult = `The note records a series of questions: which faction you work with, whether you've spoken to anyone in the warden structure, which merchants accepted your presence without complaint. Military framing — affiliations and backing, not findings. The paper is plain and dry, no canal-water smell on it; this didn't come through the Guildheart freight counter. Whoever's asking isn't trying to understand what you know. They're trying to understand who stands behind you before deciding how far they can push.`;
      } else if (arch === 'magic') {
        G.lastResult = `The questions in the note are about documents — which archive sections you accessed, what categories you requested, whether you handled the external routing ledger. Not what you found. What you touched. The handwriting is precise and even, the kind formed by someone who copies documents professionally. Someone pulled your archive trail and is reconstructing the shape of your inquiry from the access log alone, working backward through the sequence of pages you turned. They're a day behind and closing the gap methodically.`;
      } else if (arch === 'stealth') {
        G.lastResult = `The note lists three conversations from the past two days with times to within the hour — the factor near the east gate, the hall keeper's counter, the freight yard at midday. Passive network, not a tail: too many positions across too much ground for a single watcher covering the cold stone corridors of this district. Someone built a relay specifically to track movement through Guildheart's covered walkways and record rooms. Your pattern is already mapped. They know your rhythm better than your route, and the route itself was probably mapped before you arrived.`;
      } else {
        G.lastResult = `The questions in the note focus on who accepted your offers of help, not what you've learned. Which merchants took your time. Which clerks answered instead of deflecting. Someone is cataloguing your trust relationships — specifically the ones where you've extended something and the other party accepted — mapping the people who might be pressured through their connection to you. The canal district's procedural apparatus runs on leverage, not evidence. They're looking for handles on third parties, not a case against you, and they're already several conversations into building the list.`;
      }

      G.lastResult += ` The note is specific enough that whoever compiled it was watching before today.`;
      if (!G.rivalId) {
        if (arch === 'combat') G.rivalId = 'warden_captain';
        else if (arch === 'magic') G.rivalId = 'archivist_veld';
        else if (arch === 'stealth') G.rivalId = 'shadow_broker';
        else G.rivalId = 'provost_lenn';
      }
      G.flags.stage1_rival_seeded = true;
      addJournal('warning', 'Rival-adjacent operative confirmed actively surveilling your Guildheart inquiry', `guildheart-rival-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },
  // 29. SUPPRESSION SIGNAL: OVERHEARD FRAGMENT AT FREIGHT COUNTER
  {
    label: "Two officials at the freight counter. One said a number. The other looked at me.",
    tags: ['Suppression', 'Observation', 'Stage1'],
    xpReward: 55,
    failResult: {
      text: `The freight counter is briefly occupied — a carter presents a routing dispute, the two officials you're watching are pulled into the paper exchange. Whatever was being discussed before the carter arrived is finished; the conversation won't resume with an audience at the counter. The east end of the counter has a pigeonhole rack where filed routing categories are posted by the day's shift. Category D, which the one official named, corresponds to a specific hold classification. The hold register for the current week sits in a tray visible from the public side of the counter.`,
      xp: 0,
      effects: [],
      next: [{ text: 'The Category D hold register for this week sits in the public tray at the counter\'s east end.', skill: 'survival', tag: 'safe', align: 'neutral', cid: '__arrive__' }]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(55, 'overhearing freight counter exchange');

      G.lastResult = `The Guildheart freight counter runs along the east wall of the hub yard, open on one side to the loading bays. Late morning: the yard noise fills in around conversations. Two officials stand at the far end of the counter — one with a routing folio open against his forearm, one with both hands on the counter edge. The one with the folio says: "Fourteen-ninety-two, Category D hold, same window as the Bay Seven clearance." The other glances toward where you are standing. It is a single look, no expression behind it, lasting less than a second. The folio closes. Neither official speaks again. Neither leaves. They stand where they were and do not resume the conversation.`;
      addJournal('Overheard at Guildheart Hub freight counter, mid-morning: "Fourteen-ninety-two, Category D hold, same window as the Bay Seven clearance." Conversation ended when second party noted observer. Neither official left — they stopped in place.', 'intelligence');

      G.recentOutcomeType = 'observe';
      maybeStageAdvance();
    }
  },
{
  label: 'The notice board has recent postings.',
  tags: ['social'],
  xpReward: 5,
  failResult: {
    text: `The notice board is bare — stripped for the daily re-posting that happens at close of hall. A clerk with a stack of fresh notices is making her way from the east annexe, cards in hand, but she's been stopped at the corridor junction by a registrar with a question. The board will be current again in ten minutes. The old postings, the ones taken down, accumulate in a wire basket below the board for three days before filing. Yesterday's notices are still in the basket, rubber-banded and legible.`,
    xp: 0,
    effects: [],
    next: [{ text: 'Yesterday\'s notices are still in the wire basket below the board.', skill: 'survival', tag: 'safe', align: 'neutral', cid: '__arrive__' }]
  },
  fn: function() {
    var key = 'rumor_drawn_' + G.location + '_' + G.dayCount;
    if (G.flags[key]) {
      G.lastResult = 'The board has nothing new since this morning. A charter-hall session notice and a freight coordination advisory from the prior shift are still pinned at the center column, their edges beginning to curl in the corridor draught. The Guildheart guild boards re-post at close of hall each day — everything from the morning session gets pulled, restamped with the new date, and returned to the same positions by a clerk working from a fixed routine. Coming back at close of hall will find the current postings in place.';
      return;
    }
    G.flags[key] = true;
    drawLocalityRumor(G.location);
  }
},
{
  label: 'Two officials. One number. Then they see me',
  tags: ['Intelligence', 'Observation'],
  xpReward: 15,
  failResult: {
    text: `The manifest desk is empty — both officials gone, the counter clear, the shift handoff in progress. A replacement clerk is still coming up from the lower office. The reference code that stopped the earlier conversation is no longer being spoken; it's filed somewhere in the routing stack behind the counter, visible only to desk staff. The public routing board on the adjacent wall lists active administrative references by category. An administrative reference code, heard in context with a Category D hold and a Bay Seven clearance, narrows to a small section of that board — three or four entries at most.`,
    xp: 0,
    effects: [],
    next: [{ text: 'The public routing board narrows the reference code to three or four category entries.', skill: 'survival', tag: 'safe', align: 'neutral', cid: '__arrive__' }]
  },
  fn: function() {
    advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
    gainXp(15, 'overheard administrative reference');
    G.lastResult = 'Two factors near the manifest desk. The shorter one says a number — not a sum, a reference code, the kind stamped on an administrative filing. The other glances toward you. The conversation ends. Neither leaves. They stand there, not speaking, until you move toward the stairs. The reference code stays with you the way things do when someone decides you should not have heard them.';
    addJournal('Overheard at the Guildheart Hub transit floor: an administrative reference code, spoken between two factors before they spotted me. Source: Guildheart Hub manifest desk, morning shift.', 'intelligence');
    G.recentOutcomeType = 'investigate';
    maybeStageAdvance();
  }
},

  // ========== SUPPRESSION THREADING (Phase 6D) ==========

  // 6D-A: Factor stops mid-sentence — last words omitted
  {
    label: "The factor started to name the routes that don't move. Then he didn't.",
    tags: ['NPC', 'Trade', 'Observation'],
    xpReward: 60,
    stageProgress: 1,
    failResult: "The factor is in a closed session on the upper floor. The annexe clerk takes a note but cannot say when the session ends. The routing corridor board on the ground floor lists active contracts by category — publicly accessible, no session required.",
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(60, 'factor self-censored mid-sentence about suppressed routes');
      G.stageProgress[1]++;
      G.lastResult = "The factor keeps his voice low and his back to the manifest desk. He says there are routes that don't — and then he stops. The sentence doesn't trail off; it ends, the way a door closes when someone hears footsteps. He clears his throat and asks if you need a standard routing form. His hands are already moving toward the form stack. He does not look at you while he asks. Whatever the routes don't do, he has decided that saying it aloud in this building is not something he will do today.";
      addJournal('Guildheart Hub factor: began naming suppressed routes, stopped mid-sentence on approach of desk staff. Source: transit floor, lower manifest station.', 'intelligence');
      G.recentOutcomeType = 'observe';
      maybeStageAdvance();
    }
  }
];
window.GUILDHEART_STAGE1_ENRICHED_CHOICES = GUILDHEART_HUB_STAGE1_ENRICHED_CHOICES;
