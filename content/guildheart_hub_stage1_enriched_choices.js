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
    questId: 'q_s1_pattern',
    label: "The arbitrator's rulings have gone the same direction for weeks.",
    tags: ['Investigation', 'NPC', 'Guild', 'Justice', 'Meaningful'],
    xpReward: 70,
    failResult: function() {
      addNarration('', 'A registry clerk in tariff-house grey crosses the counting-hall floor with three sealed manifests and a copyist trailing. You step back to the queue rail before the wrong line lists you against the wrong sanction.', 'failure');
      loadStageChoices(G.location);
    },
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading guild dispute patterns');
      G.stageProgress[1]++;

      const result = rollD20('charm', (G.skills.charm || 0));
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
        if (G && G.flags && G.flags.met_paerun_delst) {
          G.lastResult = `Kesh's eyes move to the corridor window before he speaks. "You found Paerun." He straightens the folder stack without looking at it. "He came to me three weeks before the directive. Said something was wrong with the routing decisions, that the outcomes were being handed down rather than determined." He taps the edge of the desk. "I told him it wasn't my place to name it. He said it would be, eventually." He doesn't say whether he regrets the answer. The three new folio spines on his shelf tell the story of what came after.`;
          addJournal('Arbitrator confirmed Paerun Delst raised concerns three weeks before directive — outcomes pre-determined', 'evidence', `guildheart-arbitrator-paerun-${G.dayCount}`);
        } else {
          G.lastResult = `The arbiter's office smells of beeswax polish and lamp-oil — scrupulously maintained, like the rest of the east annexe. Kesh straightens a stack of rulings that doesn't need straightening, pressing the edges flush with the desk's leather blotter. "Dispute resolution is case-sensitive. Outcomes reflect available documentation." He begins: "The coordinating—" His eyes go to the corridor window. A clerk passes in the hall beyond the glass. "Not every merchant reads the terms they file under." The interrupted thought is not recovered. Behind him, the shelf of closed dispute folios sits in chronological order — three spines in the last row are new, sharing a reference window with the directive.`;
          addJournal('Arbitrator confirmed disputed resolution outcomes', 'evidence', `guildheart-arbitrator-pressure-${G.dayCount}`);
        }
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 2. MERCHANT REPRESENTATIVE: TRADE AGREEMENT CHANGES
  {
    plot: 'main',
    questId: 'q_s1_converging',
    label: "The merchants who lost agreements last month all trade the same goods. That's not coincidence.",
    tags: ['Investigation', 'NPC', 'Commerce', 'Agreements', 'Meaningful'],
    xpReward: 75,
    failResult: function() {
      addNarration('', 'A registry clerk in tariff-house grey crosses the counting-hall floor with three sealed manifests and a copyist trailing. You step back to the queue rail before the wrong line lists you against the wrong sanction.', 'failure');
      loadStageChoices(G.location);
    },
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering trade agreement manipulation');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0));

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
        if (G && G.flags && G.flags.met_oversight_collegium_observer) {
          G.lastResult = `Ilya pulls the folder from under the cart bench. "You spoke to the Collegium." She flips to the third page — the amendment field. "They have a copy of mine too. The Collegium observer was here four days after I received it, asking the same things you are." She sets the page flat. "I didn't show him this. I showed him my original. He said the discrepancy was a filing error." She looks at the amendment date. "It predates my notification by eleven days. Filing errors don't predate the filing."`;
          addJournal('Merchant revealed Collegium observer already reviewed her amended agreements — dismissed discrepancy as filing error', 'evidence', `guildheart-merchant-collegium-${G.dayCount}`);
        } else {
          G.lastResult = `Ilya's hand stays flat on the folder, palm down, covering the top page so that nothing is visible to a passing eye. The loading cart behind her creaks as a cooper shifts a barrel. "Guild contract details are Category One. You'd need a registered review authority." She says it without looking up. The words come out practiced — in the cadence of a clerk reading a posted policy rather than in her own voice. The cart moves. The conversation doesn't continue. A second merchant two stalls over has already turned back to his own accounts, but his pen has stopped moving.`;
          addJournal('Trade agreements blocked without formal guild authorization', 'evidence', `guildheart-merchant-blocked-${G.dayCount}`);
        }
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 3. QUALITY INSPECTOR: STANDARDS DETERIORATION
  {
    label: "The inspection stamps don't match what's coming off the dock. Things are passing that shouldn't.",
    plot: 'main',
    tags: ['Investigation', 'NPC', 'Quality', 'Standards', 'Meaningful'],
    condition: function() { return (G.investigationProgress||0) < 3; },
    xpReward: 70,
    failResult: function() {
      addNarration('', 'A registry clerk in tariff-house grey crosses the counting-hall floor with three sealed manifests and a copyist trailing. You step back to the queue rail before the wrong line lists you against the wrong sanction.', 'failure');
      loadStageChoices(G.location);
    },
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading quality control patterns');
      G.stageProgress[1]++;

      const result = rollD20('spirit', (G.skills.spirit || 0));

      if (result.isCrit) {
        G.lastResult = `Noren opens a drawer and removes two copies of the same inspection record. Same goods, same batch number — different outcome stamps. "I filed the first one. This version is what the registry shows now." He puts both on the table and doesn't pick either up. "I've stopped writing in pen. It doesn't matter what I write." His caliper lies across the drawer edge, balanced there since before you arrived.`;
        G.stageProgress[1]++;
        addJournal('Inspector revealed weaponized quality enforcement', 'evidence', `guildheart-inspector-standards-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Noren turns to face the shelving behind him and begins re-counting a row of filed records that doesn't need counting. "Quality control procedures are internal to the department. Unregistered inquiry goes through the arbiter's office." He counts aloud until you leave, his voice flat and even, as deliberate as tally-chalk on a manifest. The department door closes before you reach the walkway. The faint smell of chalk dust and splinter-wood from the inspection bay follows you into the corridor.`;
        addJournal('Quality inspector refuses future inquiry', 'complication', `guildheart-inspector-silent-${G.dayCount}`);
      } else {
        G.lastResult = `The inspection bay smells of tally-chalk and splinter-wood from broken crate lids. Noren rubs chalk dust off his fingers before speaking, brushing the residue onto the side of his leather apron. "Consistency requires standardized conditions. Not every lot presents the same." He gestures at the stacked crates along the wall — different marks, different hands, different waxes at the seals. "Application is contextual." He doesn't say whose context determines the outcome. The caliper he uses for certified measurements sits on his workbench, not in its case. He hasn't closed it between the last two inspections.`;
        addJournal('Inspector confirmed inconsistent quality enforcement', 'evidence', `guildheart-inspector-inconsistent-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 4. HALL KEEPER: EXCLUSION PATTERNS
  {
    label: "The hall keeps turning away the same kinds of merchants. The keeper knows the pattern.",
    plot: 'main',
    tags: ['Investigation', 'NPC', 'Access', 'Membership', 'Meaningful'],
    condition: function() { return (G.investigationProgress||0) >= 3 && (G.investigationProgress||0) < 6; },
    xpReward: 75,
    failResult: function() {
      addNarration('', 'A registry clerk in tariff-house grey crosses the counting-hall floor with three sealed manifests and a copyist trailing. You step back to the queue rail before the wrong line lists you against the wrong sanction.', 'failure');
      loadStageChoices(G.location);
    },
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering access control manipulation');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0));

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
    plot: 'main',
    tags: ['Investigation', 'NPC', 'Records', 'Finance', 'Meaningful'],
    xpReward: 70,
    failResult: function() {
      addNarration('', 'A registry clerk in tariff-house grey crosses the counting-hall floor with three sealed manifests and a copyist trailing. You step back to the queue rail before the wrong line lists you against the wrong sanction.', 'failure');
      loadStageChoices(G.location);
    },
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading ledger manipulation patterns');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0));

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
    plot: 'main',
    tags: ['Investigation', 'NPC', 'Commerce', 'Movement', 'Meaningful'],
    xpReward: 70,
    failResult: function() {
      addNarration('', 'A registry clerk in tariff-house grey crosses the counting-hall floor with three sealed manifests and a copyist trailing. You step back to the queue rail before the wrong line lists you against the wrong sanction.', 'failure');
      loadStageChoices(G.location);
    },
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'tracing merchandise diversion');
      G.stageProgress[1]++;

      const result = rollD20('charm', (G.skills.charm || 0));

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
    plot: 'main',
    tags: ['Investigation', 'NPC', 'Membership', 'Coercion', 'Meaningful'],
    xpReward: 75,
    failResult: function() {
      addNarration('', 'A registry clerk in tariff-house grey crosses the counting-hall floor with three sealed manifests and a copyist trailing. You step back to the queue rail before the wrong line lists you against the wrong sanction.', 'failure');
      loadStageChoices(G.location);
    },
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering coercive membership practices');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0));

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
    plot: 'main',
    tags: ['Investigation', 'NPC', 'Craft', 'Knowledge', 'Meaningful'],
    xpReward: 75,
    failResult: function() {
      addNarration('', 'A registry clerk in tariff-house grey crosses the counting-hall floor with three sealed manifests and a copyist trailing. You step back to the queue rail before the wrong line lists you against the wrong sanction.', 'failure');
      loadStageChoices(G.location);
    },
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering craft knowledge suppression');
      G.stageProgress[1]++;

      const result = rollD20('spirit', (G.skills.spirit || 0));

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
    plot: 'main',
    tags: ['Investigation', 'Structure', 'Organization', 'Power', 'Meaningful'],
    xpReward: 70,
    failResult: function() {
      addNarration('', 'A registry clerk in tariff-house grey crosses the counting-hall floor with three sealed manifests and a copyist trailing. You step back to the queue rail before the wrong line lists you against the wrong sanction.', 'failure');
      loadStageChoices(G.location);
    },
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'guild hierarchy analysis');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0));

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
    plot: 'main',
    tags: ['Investigation', 'Networks', 'Commerce', 'Displacement', 'Meaningful'],
    xpReward: 75,
    failResult: function() {
      addNarration('', 'A registry clerk in tariff-house grey crosses the counting-hall floor with three sealed manifests and a copyist trailing. You step back to the queue rail before the wrong line lists you against the wrong sanction.', 'failure');
      loadStageChoices(G.location);
    },
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'merchant network displacement mapping');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0));

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
    plot: 'main',
    tags: ['Investigation', 'Information', 'Communication', 'Control', 'Meaningful'],
    xpReward: 70,
    failResult: function() {
      addNarration('', 'A registry clerk in tariff-house grey crosses the counting-hall floor with three sealed manifests and a copyist trailing. You step back to the queue rail before the wrong line lists you against the wrong sanction.', 'failure');
      loadStageChoices(G.location);
    },
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'information flow analysis');
      G.stageProgress[1]++;

      const result = rollD20('finesse', (G.skills.finesse || 0));

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
    plot: 'main',
    tags: ['Investigation', 'Coercion', 'Fear', 'Threats', 'Meaningful'],
    xpReward: 75,
    failResult: function() {
      addNarration('', 'A registry clerk in tariff-house grey crosses the counting-hall floor with three sealed manifests and a copyist trailing. You step back to the queue rail before the wrong line lists you against the wrong sanction.', 'failure');
      loadStageChoices(G.location);
    },
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'coercion apparatus documentation');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0));

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
    plot: 'main',
    tags: ['Investigation', 'Resources', 'Flow', 'Redirection', 'Meaningful'],
    xpReward: 70,
    failResult: function() {
      addNarration('', 'A registry clerk in tariff-house grey crosses the counting-hall floor with three sealed manifests and a copyist trailing. You step back to the queue rail before the wrong line lists you against the wrong sanction.', 'failure');
      loadStageChoices(G.location);
    },
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'resource flow tracking');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0));

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
    plot: 'main',
    tags: ['Investigation', 'Trust', 'Institutions', 'Faith', 'Meaningful'],
    xpReward: 75,
    failResult: function() {
      addNarration('', 'A registry clerk in tariff-house grey crosses the counting-hall floor with three sealed manifests and a copyist trailing. You step back to the queue rail before the wrong line lists you against the wrong sanction.', 'failure');
      loadStageChoices(G.location);
    },
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'institutional trust erosion documentation');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0));

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
    plot: 'main',
    tags: ['Investigation', 'Vulnerability', 'Economics', 'Exposure', 'Meaningful'],
    xpReward: 70,
    failResult: function() {
      addNarration('', 'A registry clerk in tariff-house grey crosses the counting-hall floor with three sealed manifests and a copyist trailing. You step back to the queue rail before the wrong line lists you against the wrong sanction.', 'failure');
      loadStageChoices(G.location);
    },
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'merchant vulnerability mapping');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0));

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
    plot: 'main',
    tags: ['Investigation', 'Authority', 'Opacity', 'Decision', 'Meaningful'],
    xpReward: 75,
    failResult: function() {
      addNarration('', 'A registry clerk in tariff-house grey crosses the counting-hall floor with three sealed manifests and a copyist trailing. You step back to the queue rail before the wrong line lists you against the wrong sanction.', 'failure');
      loadStageChoices(G.location);
    },
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'authority structure opacity analysis');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0));

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
    plot: 'main',
    tags: ['Investigation', 'Rumor', 'Commerce', 'Gossip', 'Meaningful'],
    xpReward: 65,
    failResult: function() {
      addNarration('', 'A registry clerk in tariff-house grey crosses the counting-hall floor with three sealed manifests and a copyist trailing. You step back to the queue rail before the wrong line lists you against the wrong sanction.', 'failure');
      loadStageChoices(G.location);
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
    plot: 'main',
    tags: ['Investigation', 'Rumor', 'Commerce', 'Gossip', 'Meaningful'],
    xpReward: 65,
    failResult: function() {
      addNarration('', 'A registry clerk in tariff-house grey crosses the counting-hall floor with three sealed manifests and a copyist trailing. You step back to the queue rail before the wrong line lists you against the wrong sanction.', 'failure');
      loadStageChoices(G.location);
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
    plot: 'main',
    tags: ['Investigation', 'Evidence', 'Proof', 'Corruption', 'Meaningful'],
    xpReward: 80,
    failResult: function() {
      addNarration('', 'A registry clerk in tariff-house grey crosses the counting-hall floor with three sealed manifests and a copyist trailing. You step back to the queue rail before the wrong line lists you against the wrong sanction.', 'failure');
      loadStageChoices(G.location);
    },
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(80, 'exposing arbitration conspiracy');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0));

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
    label: "A guild officer is complicit. Protect them or expose them.",
    plot: 'main',
    tags: ['Investigation', 'Moral', 'Choice', 'Pressure', 'Confrontation', 'Meaningful'],
    xpReward: 70,
    effects: [
      { type: 'heat', polity: 'union', amount: 1 },
      { type: 'rival', amount: 1 }
    ],
    failResult: function() {
      addNarration('', 'A registry clerk in tariff-house grey crosses the counting-hall floor with three sealed manifests and a copyist trailing. You step back to the queue rail before the wrong line lists you against the wrong sanction.', 'failure');
      loadStageChoices(G.location);
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
    questId: 'q_s1_close',
    label: "The corruption in guild arbitration runs through an external hand nobody has named.",
    tags: ['Investigation', 'Origin', 'Discovery', 'Climax'],
    xpReward: 80,
    failResult: function() {
      addNarration('', 'A registry clerk in tariff-house grey crosses the counting-hall floor with three sealed manifests and a copyist trailing. You step back to the queue rail before the wrong line lists you against the wrong sanction.', 'failure');
      loadStageChoices(G.location);
    },
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(80, 'discovering origin source of arbitration corruption');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0));

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
    failResult: function() {
      addNarration('', 'A registry clerk in tariff-house grey crosses the counting-hall floor with three sealed manifests and a copyist trailing. You step back to the queue rail before the wrong line lists you against the wrong sanction.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'reading charter discrepancy evidence');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('wits', (G.skills.wits || 0));
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
    failResult: function() {
      addNarration('', 'A registry clerk in tariff-house grey crosses the counting-hall floor with three sealed manifests and a copyist trailing. You step back to the queue rail before the wrong line lists you against the wrong sanction.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(75, 'tracking off-channel contacts');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('finesse', (G.skills.finesse || 0));
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
    failResult: function() {
      addNarration('', 'A registry clerk in tariff-house grey crosses the counting-hall floor with three sealed manifests and a copyist trailing. You step back to the queue rail before the wrong line lists you against the wrong sanction.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'reading the trading floor');
      var arch = G.archetype && G.archetype.group;

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
    failResult: function() {
      addNarration('', 'Trent finishes his copyist row and slides the manifest into the bonded warehouse bin without looking up. The formal submission channel he described — written, signed, specific — is still open at the registry counter two pavilions over.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'making Oversight Collegium contact');
      if (!G.factionHostility) G.factionHostility = { warden_order: 0, iron_compact: 0, oversight_collegium: 0 };

      const result = rollD20('charm', (G.skills.charm || 0));
      if (result.total >= 12) {
        if (!G.flags) G.flags = {};
        G.flags.met_oversight_collegium_observer = true;
        G.lastResult = `Observer Calla Trent keeps her hands folded on the desk and listens to the first two sentences before responding. "The Collegium has been stationed here sixty-two days. We are in a monitoring phase." She doesn't explain what monitoring leads to, but she slides a form across the desk — addressable, formal, with a Collegium reference line. "Written summary. Signed. Specific." She taps the reference line. "That's the channel." She pulls the form back two inches and straightens it before releasing it. Everything here goes into her record, not yours.`;
        G.factionHostility.oversight_collegium += 1;
        addJournal('Oversight Collegium observer Calla Trent — monitoring phase active, formal submission channel opened', 'intelligence', `guildheart-collegium-${G.dayCount}`);
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
    failResult: function() {
      addNarration('', 'A registry clerk in tariff-house grey crosses the counting-hall floor with three sealed manifests and a copyist trailing. You step back to the queue rail before the wrong line lists you against the wrong sanction.', 'failure');
      loadStageChoices(G.location);
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
    failResult: function() {
      addNarration('', 'The guild desk clerk turns the logging slip toward you with three duplicate manifests already stamped behind her. The wool merchant who runs the outlying settlement loop three times a week leaves from the canal-side loading lane, not this counter.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(65, 'establishing courier drop');
      if (!G.flags) G.flags = {};

      const result = rollD20('finesse', (G.skills.finesse || 0));
      if (result.total >= 11) {
        G.lastResult = `A wool merchant who makes the run to outlying settlements three times a week doesn't look up from her manifest when you explain the arrangement. "Sealed cargo is sealed cargo." She names a drop location near the eastern gate and a timing window. "Don't make it complicated." She adds your first parcel to the wool manifest under a fiber weight notation that will mean nothing to a guild clerk. The channel is open.`;
        G.flags.courier_drop_guildheart = true;
        addJournal('Independent courier channel established through wool merchant', 'evidence', `guildheart-courier-${G.dayCount}`);
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
    failResult: function() {
      addNarration('', 'Paerun\'s empty stall space still carries his registration number along the arbitration pavilion fence — visible from where you stand. The registry hall records will show who filed the enforcement action when the morning queue clears.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(67, 'hearing displaced factor account');

      const result = rollD20('charm', (G.skills.charm || 0));
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
    failResult: function() {
      addNarration('', `The dockside factor is in conversation with a hall clerk when you approach — a formal exchange, ledger open between them, nothing to interrupt. She clocks your approach without acknowledging it and keeps her attention on the clerk. The note she meant to pass stays in her apron. When the clerk leaves she moves directly to her next stall. The passage for it will come later — she'll look for you at the freight counter's east end during the slow hour before close of yard, which is where she handles anything that shouldn't be handed over in a crowd.`, 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(58, 'receiving rival warning');
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};

      var arch = G.archetype && G.archetype.group;
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
      addJournal('Rival-adjacent operative confirmed actively surveilling your Guildheart inquiry', 'complication', `guildheart-rival-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },
  // 29. SUPPRESSION SIGNAL: OVERHEARD FRAGMENT AT FREIGHT COUNTER
  {
    label: "Two officials at the freight counter. One said a number. The other looked at me.",
    tags: ['Suppression', 'Observation', 'Stage1'],
    xpReward: 55,
    failResult: function() {
      addNarration('', 'A registry clerk in tariff-house grey crosses the counting-hall floor with three sealed manifests and a copyist trailing. You step back to the queue rail before the wrong line lists you against the wrong sanction.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(55, 'overhearing freight counter exchange');

      G.lastResult = `The Guildheart freight counter runs along the east wall of the hub yard, open on one side to the loading bays. Late morning: the yard noise fills in around conversations. Two administrators stand at the far end of the counter — one with a routing folio open against his forearm, one with both hands on the counter edge. The one with the folio says: "Fourteen-ninety-two, Category D hold, same window as the Bay Seven clearance." The other glances toward where you are standing. It is a single look, no expression behind it, lasting less than a second. The folio closes. Neither administrator speaks again. Neither leaves. They stand where they were and do not resume the conversation.`;
      addJournal('Overheard at Guildheart Hub freight counter, mid-morning: "Fourteen-ninety-two, Category D hold, same window as the Bay Seven clearance." Conversation ended when second party noted observer. Neither official left — they stopped in place.', 'intelligence');

      G.recentOutcomeType = 'observe';
      maybeStageAdvance();
    }
  },
{
  label: 'The notice board has recent postings.',
  tags: ['social'],
  xpReward: 5,
  failResult: function() {
    addNarration('', `The notice board is bare — stripped for the daily re-posting that happens at close of hall. A clerk with a stack of fresh notices is making her way from the east annexe, cards in hand, but she's been stopped at the corridor junction by a registrar with a question. The board will be current again in ten minutes. The old postings, the ones taken down, accumulate in a wire basket below the board for three days before filing. Yesterday's notices are still in the basket, rubber-banded and legible.`, 'failure');
    loadStageChoices(G.location);
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
  failResult: function() {
    addNarration('', `The manifest desk is empty — both officials gone, the counter clear, the shift handoff in progress. A replacement clerk is still coming up from the lower office. The reference code that stopped the earlier conversation is no longer being spoken; it's filed somewhere in the routing stack behind the counter, visible only to desk staff. The public routing board on the adjacent wall lists active administrative references by category. An administrative reference code, heard in context with a Category D hold and a Bay Seven clearance, narrows to a small section of that board — three or four entries at most.`, 'failure');
    loadStageChoices(G.location);
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
    plot: 'main',
    tags: ['NPC', 'Trade', 'Observation'],
    xpReward: 60,
    stageProgress: 1,
    failResult: function() {
      addNarration('', 'The factor is in a closed session on the upper floor of the counting hall. The annexe clerk takes a note but cannot say when the session ends. The routing corridor board on the ground floor lists active contracts by category — publicly accessible.', 'failure');
      loadStageChoices(G.location);
    },
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

// ── ARCHETYPE-EXCLUSIVE CHOICES ──────────────────────────────
GUILDHEART_HUB_STAGE1_ENRICHED_CHOICES.push(

  // COMBAT x2
  {
    archetypeGroup: 'combat',
    label: "Staged blockade on the transit route. Three people, one road, and they know we\'re coming.",
    plot: 'main',
    tags: ['Combat', 'Risk', 'Direct'],
    xpReward: 65,
    stageProgress: 1,
    failResult: function() {
      addNarration('', 'The three blocking the route are better positioned than they look — two have the high ground on the road shoulder and the third is behind a loaded cart that would take both of you to move. The blockade is professionally set. You withdraw and circle to the waymark post through the secondary footpath, which adds two hours to the route.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'clearing transit route blockade');
      G.stageProgress[1]++;

      var result = rollD20('combat', (G.skills.might || 0));
      var target = 14;

      if (result.isCrit) {
        G.lastResult = 'The blockade clears fast — the three holding it were hired for deterrence, not a real fight, and they read the difference quickly. Underneath the blocking cart: a sealed document case they were guarding, not the road. The case is guild-stamped with a routing authority mark for a caravan that the transit registry shows as not yet arrived. The caravan is three days late. The case has been here, at this blockade, for three days — waiting for a caravan that the case is supposed to travel with, or for someone who knows the caravan is not coming. Inside: route amendment orders, signed by the factor registry, rerouting three caravans through an unregistered waypoint.';
        G.stageProgress[1]++;
        addJournal('Blockade cleared — concealed guild document case: route amendment orders rerouting 3 caravans through unregistered waypoint; caravan 3 days overdue', 'evidence');
      } else if (result.isFumble) {
        G.lastResult = 'The blockade holds longer than it should because the middle one is not actually part of the blockade — a merchant trying to get past it who gets caught in the middle of the confrontation and panics. The resulting confusion draws a waymark factor from the relay post, who logs the road incident. You are the outside party in the incident record. The blockade disperses when the factor arrives, which means the factor saw you but not what the blockade was protecting.';
        addJournal('Transit blockade confrontation drew waymark factor — road incident logged; blockade contents not seen before dispersal', 'complication');
      } else if (result.total >= target) {
        G.lastResult = 'The blockade clears when two of the three decide the third one is not going to hold. The road opens. The cleared position reveals a waymark post that has been partially dismantled — the route marker for the northern corridor has been pulled and set face-down behind the blocking cart. Whoever set this blockade was also changing the route markers. The northern corridor route marker would direct caravans toward the unregistered waypoint that appears in the factor registry complaints.';
        addJournal('Blockade cleared — north corridor waymark dismantled and laid face-down; rerouting caravans to unregistered waypoint', 'evidence');
      } else {
        G.lastResult = 'Two of the three clear. The third holds until you make the calculation obvious, then steps aside. The route opens. The blocking cart is loaded — not with cargo, with empty crates filled with ballast stone to weight it. Someone built a blockade prop and deployed it here specifically. An empty-crate blockade at a waymark junction means someone wanted this road stopped for a specific time window, not indefinitely. The timing and the junction are worth noting.';
        addJournal('Transit blockade cleared — blocking cart was prop: weighted empty crates; temporary, time-specific blockade at waymark junction', 'discovery');
      }

      G.recentOutcomeType = 'action';
      maybeStageAdvance();
    }
  },

  {
    archetypeGroup: 'combat',
    label: "Guild courier approaching the relay post. One intersection left before he\'s inside.",
    plot: 'main',
    tags: ['Combat', 'Confrontation', 'Direct'],
    xpReward: 65,
    stageProgress: 1,
    failResult: function() {
      addNarration('', 'The courier is already past the intersection when you clear the staging area corner. He is inside the relay post gate before you reach the intersection. The gate closes with the standard relay post security lock. The dispatch is filed. Whatever it contained is now inside the post record, and the post record is guild-restricted access.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'intercepting guild courier at relay post approach');
      G.stageProgress[1]++;

      var result = rollD20('combat', (G.skills.might || 0));
      var target = 14;

      if (result.isCrit) {
        G.lastResult = 'The courier stops when you step into the intersection and he takes a moment to read the situation. He hands over the satchel before the moment resolves any other way. Inside: three route dispatches, two standard routing confirmations, and one sealed document with a wax impression that is not the standard guild courier seal — it is the seal of the route arbitration panel, which only issues dispatches when a route dispute is in formal arbitration. The dispatch is addressed to the waymark factor at this relay post. The route being arbitrated is the northern corridor. The arbitration has been running for six weeks. No dispute has been filed in the public arbitration register for that route in six weeks.';
        G.stageProgress[1]++;
        addJournal('Courier intercepted — dispatch carries route arbitration panel seal for northern corridor; arbitration running 6 weeks with no public register entry', 'evidence');
      } else if (result.isFumble) {
        G.lastResult = 'The courier does not stop — he angles through the intersection at a run and uses his satchel arm to clear the space between you. He is practiced at intersections. You do not catch him. He logs the interception attempt at the relay post desk within four minutes of arrival. Your description is in the relay post security record. The courier dispatch is inside the relay post and you are in the street with a security notation against you.';
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
        addJournal('Courier interception failed — interception attempt logged at relay post; description on security record', 'complication');
      } else if (result.total >= target) {
        G.lastResult = 'The courier stops and the satchel opens. He hands over one envelope — the top one, which he reads as expendable. Inside: a route confirmation for a caravan that the transit registry shows as not yet registered. The confirmation pre-authorizes the caravan\'s passage through the relay post, signed by the route factor registry. A caravan with pre-authorization that does not appear in the public register is moving through this hub on a track the transit registry does not see.';
        addJournal('Courier yielded envelope — pre-authorization for unregistered caravan through relay post; signed by factor registry', 'evidence');
      } else {
        G.lastResult = 'The courier stops, reads you accurately, and sets the satchel on the ground. Everything inside is routing confirmations — six of them, all standard, all for caravans that appear in the transit registry. He picks up the satchel when you are done and continues to the relay post. The dispatch he was protecting was already inside his jacket, not in the satchel. The satchel was the decoy. Whatever the jacket dispatch contains reached the relay post.';
        addJournal('Courier used satchel as decoy — jacket dispatch reached relay post; satchel contents standard', 'discovery');
      }

      G.recentOutcomeType = 'action';
      maybeStageAdvance();
    }
  },

  // MAGIC x2
  {
    archetypeGroup: 'magic',
    label: "Caravan manifest has a cipher running through the route codes. Not guild-standard.",
    plot: 'main',
    tags: ['Magic', 'Lore', 'Records'],
    xpReward: 65,
    stageProgress: 1,
    failResult: function() {
      addNarration('', 'A registry clerk in tariff-house grey crosses the counting-hall floor with three sealed manifests and a copyist trailing. You step back to the queue rail before the wrong line lists you against the wrong sanction.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'decoding route cipher in caravan manifest');
      G.stageProgress[1]++;

      var result = rollD20('lore', (G.skills.wits || 0));
      var target = 13;

      if (result.isCrit) {
        G.lastResult = 'The cipher is a substitution layer in the route code column — every fifth entry, reading across rather than down, which is why the standard audit process misses it. Decoded: a schedule of cargo transfers keyed to specific waypoints, amounts, and receiving party designations. The receiving party designations use a three-letter code that does not appear in the guild\'s registered factor list. Cross-referencing the waypoints with the transit registry: two of the five waypoints in the cipher are not in the transit route registry. They are real places — recognizable from the road — but they have no registry designation. The caravan is stopping at ghost stops.';
        G.stageProgress[1]++;
        addJournal('Caravan manifest cipher decoded — transfers to 2 unregistered waypoints; receiving party codes not in guild factor list; every 5th entry reading horizontally', 'evidence');
      } else if (result.isFumble) {
        G.lastResult = 'The cipher runs in the route code column but the compression technique requires a reference grammar you do not have access to here. You produce a partial decoding that contains three route code fragments and one receiving party designation — the designation resolves to a known guild factor name, which is consistent with legitimate business and tells you nothing directional. The loading factor notices the extended time on the manifest reading page and closes the public access window fifteen minutes early.';
        addJournal('Manifest cipher partially decoded — one legitimate factor name recovered; public access closed early by loading factor', 'complication');
      } else if (result.total >= target) {
        G.lastResult = 'The cipher is in the route code column, every fifth entry. The substitution is simple but not guild-standard — it uses the waymark designation system from the pre-guild cartographic tradition, which the current guild replaced thirty years ago. Someone is using old map language in current documents. The decoded entries show transfer amounts and three-letter receiving party codes. The amounts total to a figure that matches the quantity discrepancy in the factor arbitration complaints.';
        addJournal('Manifest cipher uses pre-guild waymark designations — decoded amounts match factor arbitration discrepancy; receiving party coded in 3-letter system', 'evidence');
      } else {
        G.lastResult = 'The cipher structure is identifiable: regular spacing anomaly in the route code column, too regular for clerical drift. It runs through approximately every fifth entry. Full decoding requires either a reference grammar or more time on a single manifest. What you establish in the available window: the cipher is present across at least three consecutive manifests, all from the current month. It was not there in the archive copy from last quarter. It started recently.';
        addJournal('Caravan manifest cipher: regular spacing anomaly every 5th entry; present in current month across 3 manifests, absent from last quarter archive', 'discovery');
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  {
    archetypeGroup: 'magic',
    label: "Waymark inscription on the transit post. Underneath the guild marks there\'s a second message.",
    plot: 'main',
    tags: ['Magic', 'Lore', 'Observation'],
    xpReward: 65,
    stageProgress: 1,
    failResult: function() {
      addNarration('', 'A registry clerk in tariff-house grey crosses the counting-hall floor with three sealed manifests and a copyist trailing. You step back to the queue rail before the wrong line lists you against the wrong sanction.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'reading secondary waymark inscription');
      G.stageProgress[1]++;

      var result = rollD20('lore', (G.skills.wits || 0));
      var target = 13;

      if (result.isCrit) {
        G.lastResult = 'Two layers of inscription on the waymark post. The outer layer is the current guild routing marks — correctly inscribed, properly anchored. Underneath, running in the grain of the older stonework: a pre-guild waymark inscription using the cartographic tradition that predates the current administration. The old inscription gives a route designation and a waypoint identification that does not exist in the guild\'s route registry. But the waypoint it describes is identifiable from the road — it is the unregistered stopping point that appears in the decoded manifest cipher. The old waymark and the cipher in the manifests are referring to the same place. Someone is using the old infrastructure as a parallel route network.';
        G.stageProgress[1]++;
        addJournal('Waymark post secondary inscription: pre-guild cartographic tradition identifies same unregistered waypoint as manifest cipher; parallel old-infrastructure route network implied', 'evidence');
      } else if (result.isFumble) {
        G.lastResult = 'The secondary inscription is present — you can identify the layered structure from the sigil density — but the outer guild marks were inscribed over it with enough force to partially disrupt the underlying text. The disruption is deliberate: whoever added the outer marks knew the secondary inscription was there and applied the outer layer to obscure it, not just to add the new information. You recover fragments. The fragments are in the pre-guild waymark tradition. The full text is lost to the overwriting.';
        addJournal('Waymark secondary inscription partially legible — outer guild marks deliberately applied to obscure; fragments in pre-guild tradition', 'complication');
      } else if (result.total >= target) {
        G.lastResult = 'The outer guild routing marks sit over a secondary inscription in a different hand and a different tradition. The secondary inscription is pre-guild cartographic notation — the waymark designation system that the current guild replaced thirty years ago. The old inscription identifies a waypoint and a route designation. The route designation uses a numbering system that does not appear in the current transit registry. But the physical waypoint it describes is somewhere on the northern corridor — the description is specific enough that you could find it.';
        addJournal('Waymark secondary inscription: pre-guild route designation for identifiable northern corridor waypoint — not in current transit registry', 'evidence');
      } else {
        G.lastResult = 'The waymark post has two inscription layers — the outer guild marks and something underneath that is older and in a different style. The underlying inscription is legible in fragments. What you can recover: a waypoint designation and a direction marker. The waypoint designation does not use the current guild numbering system. It is from an older tradition, pre-guild, that used named references rather than numbers. The named reference in the fragment is not a locality name you recognize from the transit registry.';
        addJournal('Waymark secondary inscription: pre-guild named waypoint reference, not in current transit registry; fragments only', 'discovery');
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // STEALTH x2
  {
    archetypeGroup: 'stealth',
    label: "Transit district at third bell. The courier takes the same route every time.",
    plot: 'main',
    tags: ['Stealth', 'Covert', 'Observation'],
    xpReward: 65,
    stageProgress: 1,
    failResult: function() {
      addNarration('', 'A registry clerk in tariff-house grey crosses the counting-hall floor with three sealed manifests and a copyist trailing. You step back to the queue rail before the wrong line lists you against the wrong sanction.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'shadowing guild courier through transit district');
      G.stageProgress[1]++;

      var result = rollD20('stealth', (G.skills.finesse || 0));
      var target = 15;

      if (result.isCrit) {
        G.lastResult = 'Five blocks, two waymark posts, one side passage that does not appear on the transit district map. The courier goes into the side passage and does not come out for eleven minutes. When he does, his satchel sits differently — less weight on the main side, more on the interior pocket that was empty when he left the relay post. He picked something up. The side passage entrance has no guild mark, no registry posting, and no transit designation. It is an access point that exists in the physical layout and not in any record you have seen. Whatever the courier collected in eleven minutes came from somewhere the district map does not acknowledge.';
        G.stageProgress[1]++;
        addJournal('Courier tailed to unmapped side passage — 11 minutes inside, left with additional weight in interior pocket; passage has no guild mark or registry posting', 'evidence');
      } else if (result.isFumble) {
        G.lastResult = 'The courier takes an unscheduled stop at a waymark post that you are standing too close to. He notices. He does not say anything. He reads the waymark inscription without looking at you and continues his route — but his pace is different after the waymark stop, slightly faster, more deliberate. His route changes at the next junction: he takes the guild annexe approach instead of the transit district shortcut. The route he uses from now on is not the one you mapped. He knows someone was following.';
        addJournal('Courier noticed tail — altered route; mapped pattern now compromised', 'complication');
      } else if (result.total >= target) {
        G.lastResult = 'Three clean blocks. The courier stops at the second waymark post on his route and touches the stone — not the inscription, the stone below it. A specific spot, habitual, the way you touch a familiar surface you are not looking at. He continues his circuit. You reach the spot he touched after he rounds the next corner. The stone has a notch in it — deliberate, worked, not damage. Inside the notch: a folded strip of paper, recent, dry. A dead drop. You do not have time to fully read the strip before the courier might come back. You get a partial: a three-number sequence and the letters \'NW.\' Northern corridor west.';
        addJournal('Courier dead drop at waymark post — partial reading: 3-number sequence and "NW" (northern corridor west)', 'evidence');
      } else {
        G.lastResult = 'Two blocks of clean distance. Then the courier pauses at a junction and touches the waymark post — not reading it, just a hand on the stone, briefly. He continues. Whatever the gesture means, it is deliberate and it is at a specific post. You reach the post after he moves on. Nothing visibly attached to it, no drop, no marking. But the stone surface at hand height has a worn spot consistent with regular contact. Someone touches this post the same way with some frequency. The courier is not the only one.';
        addJournal('Courier touched waymark post at junction — worn contact spot at hand height; regular use by multiple people', 'discovery');
      }

      G.recentOutcomeType = 'action';
      maybeStageAdvance();
    }
  },

  {
    archetypeGroup: 'stealth',
    label: "Caravan staging area at night. One guard, long circuit, manifest box in the open shed.",
    plot: 'main',
    tags: ['Stealth', 'Covert', 'Risk'],
    xpReward: 65,
    stageProgress: 1,
    failResult: function() {
      addNarration('', 'A registry clerk in tariff-house grey crosses the counting-hall floor with three sealed manifests and a copyist trailing. You step back to the queue rail before the wrong line lists you against the wrong sanction.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'infiltrating caravan staging area at night');
      G.stageProgress[1]++;

      var result = rollD20('stealth', (G.skills.finesse || 0));
      var target = 15;

      if (result.isCrit) {
        G.lastResult = 'Eight minutes in the open shed between the guard\'s circuits. The manifest box is unlocked — someone forgot, or someone has been accessing it and stopped bothering to lock it again. Inside: the staging manifests for the current week, and underneath them, a secondary stack that is not the staging manifest format. The secondary stack is route amendment orders, and they are all signed with the same authorization mark — the mark of the route arbitration panel, which only operates on active disputes. Eleven route amendment orders. No active disputes in the public arbitration register. The amendments redirect cargo to three waypoints. Two of the three are not in the transit registry.';
        G.stageProgress[1]++;
        addJournal('Staging area manifest box: secondary stack of 11 route amendment orders signed by arbitration panel; no public disputes; 2 of 3 redirect waypoints not in transit registry', 'evidence');
      } else if (result.isFumble) {
        G.lastResult = 'The guard\'s circuit is irregular on the night cycle — he adds a random fourth check of the shed during his second pass, which is not in the pattern you mapped. He is at the shed door while you are still inside. You hold behind the manifest box stack for four minutes while he checks the lock and leaves. He tries the lock twice. The second time, he does not leave immediately — he stands outside for ninety seconds. Whatever he noticed, the shed door does not show a forced entry. You are out when he moves away. But he checks the shed twice more before morning.';
        addJournal('Staging area infiltration near-miss — guard added unscheduled shed check; tried lock twice, stood outside 90 seconds', 'complication');
      } else if (result.total >= target) {
        G.lastResult = 'Inside the shed in the guard\'s long circuit window. The manifest box is locked but the box latch is the standard transit registry model — accessible. Inside: current week\'s staging manifests and a sealed envelope addressed to the waymark factor in the transit authority\'s handwriting. The envelope is unsealed — the wax is broken. Someone has already read it and replaced it. The letter inside references \'route authorization protocol seven\' and instructs the waymark factor to process three caravan authorizations without entering them in the standard staging log.';
        addJournal('Staging manifest box: unsealed letter from transit authority instructing waymark factor to process 3 caravans off staging log per "protocol seven"', 'evidence');
      } else {
        G.lastResult = 'Inside the shed for six minutes. The manifest box is locked and does not yield to the standard approach — it has been upgraded within the past month, based on the latch mechanism. The staging manifests that are meant to be in the box are instead in a folder on the shed wall hook, accessible without the box. The folder holds the public staging entries. It does not hold the secondary entries that the factor arbitration complaints describe. The secondary entries exist. They are simply not in the folder.';
        addJournal('Staging shed: manifest box recently upgraded lock; public staging entries in open folder, secondary entries absent', 'discovery');
      }

      G.recentOutcomeType = 'action';
      maybeStageAdvance();
    }
  },

  // SUPPORT x2
  {
    archetypeGroup: 'support',
    label: "Emergency route arrangement. The factor wants something first and he\'s not pretending otherwise.",
    plot: 'main',
    tags: ['Support', 'NPC', 'Negotiation'],
    xpReward: 65,
    stageProgress: 1,
    failResult: function() {
      addNarration('', 'A registry clerk in tariff-house grey crosses the counting-hall floor with three sealed manifests and a copyist trailing. You step back to the queue rail before the wrong line lists you against the wrong sanction.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'brokering emergency route arrangement');
      G.stageProgress[1]++;

      var result = rollD20('persuasion', (G.skills.charm || 0));
      var target = 13;

      if (result.isCrit) {
        G.lastResult = 'The factor sets his routing ledger aside and folds his hands on the desk. "Emergency route, sealed cargo, no standard staging entry — you\'re asking for protocol seven." He knows the number without checking anything. "Protocol seven exists. I\'ve processed eleven in the past six weeks. I don\'t have authority to do twelve. The authorization comes from the transit arbitration panel." He opens a side drawer and takes out a copy of the eleven authorizations — his own carbons. "I keep these because one day someone will ask me why I did eleven things that don\'t appear in the staging log." He hands them across the desk.';
        G.stageProgress[1]++;
        addJournal('Factor revealed "protocol seven" — 11 processed, all off staging log; authorization from transit arbitration panel; factor kept personal carbons', 'evidence');
      } else if (result.isFumble) {
        G.lastResult = 'The factor hears the request and his expression changes in the specific way of someone who has been asked for something they were specifically told not to provide. "Emergency route arrangements outside the standard process go through the route arbitration panel. That is the only authorized channel." He says it the way someone says a phrase they have been trained to say. He writes something in his contact log while he says it. The contact log entry means this conversation is now part of the factor registry record.';
        addJournal('Factor formalized refusal, cited route arbitration panel — entry made in contact log', 'complication');
      } else if (result.total >= target) {
        G.lastResult = 'The factor agrees to the arrangement — conditionally. "Route authorization for sealed cargo outside the standard staging process requires a transit arbitration panel confirmation number." He waits. You do not have one. "Then you are not authorized through the standard emergency channel. However." He opens a side drawer. "There is a secondary process. It has been in use for six weeks. It does not go through the staging log." He takes out a routing form that is not the standard staging format. "This is what the other eleven looked like. If you can get a panel authorization mark on this form, I can process it."';
        addJournal('Factor confirmed secondary routing process used 11 times in 6 weeks; provided non-standard form; requires transit arbitration panel authorization mark', 'evidence');
      } else {
        G.lastResult = 'The factor considers the arrangement for long enough that you know he has processed something like it before. "Emergency staging outside the standard entry process requires authorization from the route arbitration panel." He says it once, clearly. Then he says: "The panel\'s authorization mark is on file with the waymark factor in the transit authority annex. If you have a reason the panel would authorize, you can get the mark there." He does not say he has never processed an emergency route without the mark. He does not need to.';
        addJournal('Factor directed to transit arbitration panel for authorization mark; did not confirm or deny prior processing without mark', 'discovery');
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  {
    archetypeGroup: 'support',
    label: "The route discrepancy is a risk to the waymark factor's own operation.",
    plot: 'main',
    tags: ['Support', 'NPC', 'Persuasion'],
    xpReward: 65,
    stageProgress: 1,
    failResult: function() {
      addNarration('', 'A registry clerk in tariff-house grey crosses the counting-hall floor with three sealed manifests and a copyist trailing. You step back to the queue rail before the wrong line lists you against the wrong sanction.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'making route discrepancy the factor\'s risk');
      G.stageProgress[1]++;

      var result = rollD20('persuasion', (G.skills.charm || 0));
      var target = 13;

      if (result.isCrit) {
        G.lastResult = 'The waymark factor sits back from his desk when the full calculation is in front of him. "If the discrepancy routes to my authorization section in an audit, I carry it." He says it quietly. His hands stay flat on the desk — a specific effort. "I have been told the route amendment orders are properly authorized through the transit arbitration panel. I have not seen the panel authorization marks myself. I have accepted the word of the staging factor." He opens his registry. "I am going to need you to help me find out if that was a mistake." He turns the registry toward you and leaves the room for ten minutes.';
        G.stageProgress[1]++;
        addJournal('Waymark factor opened registry and left room — accepted route amendments on staging factor\'s word without seeing panel authorization marks; now seeking verification', 'evidence');
      } else if (result.isFumble) {
        G.lastResult = 'The waymark factor listens to the risk calculation and nods. Then he says: "I have already raised this concern through the appropriate channel and received a response from the route arbitration panel confirming the authorizations are valid." He takes out the response letter and sets it on the desk. The letter is correctly formatted, panel-stamped, and signed by the panel chair. "If you believe the panel authorization is itself irregular, that is a concern for the guild oversight committee, not my registry." He picks up the letter and files it. The letter is real. Whether the panel chair signed it is a different question.';
        addJournal('Factor produced panel response letter — correctly formatted and stamped; authenticity of panel chair signature is open question', 'complication');
      } else if (result.total >= target) {
        G.lastResult = 'The waymark factor stops what he is doing when the risk calculation is complete in front of him. "The authorization marks on the route amendment orders — I have not verified them against the panel registry independently." He says it the way someone says a thing they have been meaning to say for some time. "I processed the amendments because the staging factor confirmed they were authorized." He reaches for his registry. "I would like to verify the marks now." He opens the registry to the authorization section and begins comparing. His thumb finds the edge of the ledger binding and stays there while he reads.';
        addJournal('Factor beginning independent verification of route amendment authorization marks — had relied on staging factor confirmation only', 'evidence');
      } else {
        G.lastResult = 'The factor acknowledges the risk calculation and takes out the route amendment orders to review them alongside the transit registry. "The authorization marks are correctly formatted," he says after a minute. "The panel reference numbers appear valid." He pauses. "The reference numbers appear valid based on the format. I have not checked them against the panel\'s own register." He looks at you. "Is there a reason to think the format is being mimicked?" He has not asked that question before today. The answer to it is in the panel\'s own register, which is in the arbitration annex.';
        addJournal('Factor checking route amendment authorizations for first time — format appears valid but not cross-checked against panel register; directed to arbitration annex', 'discovery');
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // SIDEPLOT HOOK: UNION TESTIMONY GAP
  {
    id: 'guildheart_sideplot_testimony_open',
    label: 'The union testimony record has a two-week gap nobody has explained.',
    skill: 'wits',
    tags: ['Records', 'Discovery'],
    plot: 'side',
    condition: function() { return G && G.flags && !G.flags.sideplot_union_testimony_started; },
    fn: function() {
      G.flags.sideplot_union_testimony_started = true;
      addNarration('', 'Fourteen-day gap in union arbitration records. The senior archivist says "administrative" twice without elaborating. It is the word used when a real answer would require authorization nobody wants to grant. Two weeks of testimony, gone — and the archive continues as if those weeks never existed.');
      addJournal('Union testimony: fourteen-day gap in arbitration record. Senior archivist explanation insufficient.', 'evidence');
      if (window.GUILDHEART_UNION_TESTIMONY_GAP && typeof window.GUILDHEART_UNION_TESTIMONY_GAP.open === 'function') window.GUILDHEART_UNION_TESTIMONY_GAP.open();
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: function() {
      addNarration('', 'A registry clerk in tariff-house grey crosses the counting-hall floor with three sealed manifests and a copyist trailing. You step back to the queue rail before the wrong line lists you against the wrong sanction.', 'failure');
      loadStageChoices(G.location);
    },
  }

);

window.GUILDHEART_HUB_STAGE1_ENRICHED_CHOICES = GUILDHEART_HUB_STAGE1_ENRICHED_CHOICES;
