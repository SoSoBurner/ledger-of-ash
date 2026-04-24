/**
 * GUILDHEART HUB STAGE 1 ENRICHED MEANINGFUL CHOICES
 * 20 deeply grounded investigation paths tied to guild arbitration and trade disputes
 * Generated for: Guild loyalty vs individual innovation, tradition vs progress, records corruption and arbitration poisoning
 * Each choice: 65-80 XP, grounded in guild politics and merchant coordination, layered wrongness reveal
 */

const GUILDHEART_HUB_STAGE1_ENRICHED_CHOICES = [
  // ========== NPC-GROUNDED CHAINS (8 CHOICES) ==========

  // 1. GUILD ARBITRATOR: DISPUTE RESOLUTION FAILURES
  {
    label: "Question the guild arbitrator about recent dispute resolutions — are decisions favoring certain merchants unfairly, and has the arbitration process become unpredictable?",
    tags: ['Investigation', 'NPC', 'Guild', 'Justice', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading guild dispute patterns');
      G.stageProgress[1]++;

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      const target = 11 + Math.max(0, G.worldClocks.pressure);

      if (result.isCrit) {
        G.lastResult = `Kesh re-reads a clause before speaking. "Arbitration used to track established precedent. Now directives arrive from above — not suggestions. Specific disputes, specific outcomes. Merchants who should prevail are told to accept the ruling against them." He sets the file down without closing it. "I'm not settling disputes. I'm executing decisions that were made elsewhere before the parties entered the room."`;
        G.stageProgress[1]++;
        addJournal('Arbitrator revealed corrupted dispute resolution system', 'evidence', `guildheart-arbitrator-disputes-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Kesh moves the open folder to the side of his desk — a deliberate motion, unhurried. "Arbitration proceedings are Category Two confidential. Inquiry without registered standing gets logged." He stamps something without looking at it. The stamp lands near the edge of the page, slightly crooked. He doesn't correct it. You're already logged.`;
        G.worldClocks.pressure++;
        addJournal('Arbitrator now protective of guild confidentiality', 'complication', `guildheart-arbitrator-hostile-${G.dayCount}`);
      } else {
        G.lastResult = `The arbiter's office smells of beeswax polish and lamp-oil — scrupulously maintained, like the rest of the east annexe. Kesh straightens a stack of rulings that doesn't need straightening, pressing the edges flush with the desk's leather blotter. "Dispute resolution is case-sensitive. Outcomes reflect available documentation." A pause. "Not every merchant reads the terms they file under." He answers the question you asked. He doesn't answer the question you meant. Behind him, the shelf of closed dispute folios sits in chronological order — and three of the spines in the last row are new.`;
        addJournal('Arbitrator confirmed disputed resolution outcomes', 'evidence', `guildheart-arbitrator-pressure-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 2. MERCHANT REPRESENTATIVE: TRADE AGREEMENT CHANGES
  {
    label: "Consult with merchant representatives about recent changes to trade agreements — have terms been altered unilaterally, or are certain merchants being frozen out?",
    tags: ['Investigation', 'NPC', 'Commerce', 'Agreements', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering trade agreement manipulation');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Ilya sets two documents side by side on the cart bench — the original agreement and what she received after filing. The column for storage access fees reads differently in each. "Signed copy. Amended copy. Same reference number." She taps the date on the amendment. It predates her notification by eleven days. "I didn't agree to these terms. I was informed I already had."`;
        G.stageProgress[1]++;
        addJournal('Merchant revealed trade agreement post-signing manipulation', 'evidence', `guildheart-merchant-agreements-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Ilya stops loading her manifest. "Who sent you?" Not hostile — specific. She's asking because she's already been asked before, by someone else, about her agreements. Her abacus goes into her bag. The conversation is done. By evening, three stall neighbors have been told someone is circulating questions about contract terms.`;
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
    label: "Interview the guild quality inspector — are quality standards being lowered for certain merchants, or are inspections being inconsistently applied?",
    tags: ['Investigation', 'NPC', 'Quality', 'Standards', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading quality control patterns');
      G.stageProgress[1]++;

      const result = rollD20('craft', (G.skills.craft || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Noren opens a drawer and removes two copies of the same inspection record. Same goods, same batch number — different outcome stamps. "I filed the first one. This version is what the registry shows now." He puts both on the table and doesn't pick either up. "I've stopped writing in pen. It doesn't matter what I write." His caliper lies across the drawer edge, balanced there since before you arrived.`;
        G.stageProgress[1]++;
        addJournal('Inspector revealed weaponized quality enforcement', 'evidence', `guildheart-inspector-standards-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Noren turns to face the shelving behind him and begins re-counting a row of filed records that doesn't need counting. "Quality control procedures are internal to the department. Unregistered inquiry goes through the arbiter's office." He counts aloud until you leave. The department door closes before you reach the walkway.`;
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
    label: "Question the guild hall keeper about recent membership changes — are certain merchants being denied access, and is hall usage being restricted?",
    tags: ['Investigation', 'NPC', 'Access', 'Membership', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering access control manipulation');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Emry slides the denial log across the counter without being asked, then pulls it back before you can lift it. "Twelve denials in six weeks. Prior six weeks: two." She reads the stated reasons aloud without inflection. "Insufficient trade history. Reputation review pending. Administrative hold." She closes the log. "The three merchants fast-tracked to full standing last month had shorter histories than four of the denials."`;
        G.stageProgress[1]++;
        addJournal('Hall keeper revealed membership exclusion as political tool', 'evidence', `guildheart-hall-exclusion-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Emry sets down her abacus with more care than the motion requires. "Membership policy inquiries go through the arbiter's office, Category Three. Are you filing a formal request?" She's already reaching for a blank form. The form is a dead end — you both know it. Two hall staff near the doorway have stopped their conversation.`;
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
    label: "Access the guild's financial and trading ledgers — are records being altered to hide merchant activities, or are entries being deliberately obscured?",
    tags: ['Investigation', 'NPC', 'Records', 'Finance', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading ledger manipulation patterns');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Toren opens the ledger to a page that shows two column totals — one in the standard ink, one in a correction red that doesn't correspond to any correction notation. "The red column doesn't reconcile against any registered account." He turns three more pages. The same red column appears, different amounts, no source reference. "Someone is running a parallel line through the primary ledger. It's been there at least eight months."`;
        G.stageProgress[1]++;
        addJournal('Ledger master revealed dual-entry financial concealment', 'evidence', `guildheart-ledger-fraud-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Toren closes the cover before you finish reading the page title. "Financial documentation is Leadership-Restricted. Unauthorized access request goes to the arbiter's log — automatically." He holds the cover flat. There's a small guild mark embossed at the corner of his cuff. He rotates it toward you deliberately, then turns back to his work. The referral has already been filed.`;
        G.worldClocks.pressure++;
        addJournal('Guild arbitrator alerted to financial records inquiry', 'complication', `guildheart-ledger-alert-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `Toren allows the general ledger, not the subsidiary accounts. Three entries carry correction marks without a corresponding correction form. The dates cluster within a ten-day window four months back. "Entries get corrected," he says. "Forms go missing. It happens." He doesn't look at the entries while he says it.`;
        addJournal('Guild records show signs of alteration', 'evidence', `guildheart-ledger-altered-${G.dayCount}`);
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
    label: "Question warehouse brokers about merchandise movements — are goods being diverted to unlisted destinations, or are shipments being held longer than usual?",
    tags: ['Investigation', 'NPC', 'Commerce', 'Movement', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'tracing merchandise diversion');
      G.stageProgress[1]++;

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Selain steps between two loaded carts and speaks toward the wall. "Standard hold is three days before transit. Bay Seven has had the same four crates for—" She stops. Her eyes move to the covered walkway above, where a tariff clerk crosses without pausing. She resumes. "The morning routing sheet doesn't show everything that moves." She names Bay Seven without looking at it. "Diversion orders arrive already signed. I don't add my name." She moves back into the main flow of the yard before the next cart passes.`;
        G.stageProgress[1]++;
        addJournal('Broker revealed warehouse diversion coordination', 'evidence', `guildheart-broker-diversion-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The broker steps back so a cart can pass, and doesn't step forward again. "Warehouse operations are Category Two guild business. Questions about routing go through the yard clerk, in writing." By the time you find the yard clerk, three brokers along the covered walkway have stopped working. They watch the cart traffic with exaggerated attention.`;
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
    label: "Speak with the initiation overseer about membership requirements — are initiates being asked for loyalty oaths beyond normal guild practice?",
    tags: ['Investigation', 'NPC', 'Membership', 'Coercion', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering coercive membership practices');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Drell holds the revised oath text for a moment before setting it down. "Traditional commitments covered craft conduct and dispute protocols. This version covers personal disclosure — who initiates speak to, what doubts they hold, who in their household might object to guild obligations." He turns the page over. "I administer what I'm given. I don't write it." His caliper sits in his breast pocket, tip outward, unused all day.`;
        G.stageProgress[1]++;
        addJournal('Initiation overseer revealed coercive membership oath system', 'evidence', `guildheart-initiation-coercion-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Drell closes the ceremony binder and stands. "Initiation records are closed to unregistered inquiry. Guild tradition protocols — Category One." He walks to the door and opens it. "Arbiter Kesh receives initiation inquiries in writing. Office hours are posted at the east annexe." The door stays open. His posture says the conversation ended before you arrived.`;
        G.worldClocks.reverence++;
        addJournal('Initiation overseer banned further membership questions', 'complication', `guildheart-initiation-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The initiation chamber is a small room off the main hall, lined with bound oath texts and the smell of old leather. Drell checks the time on the wall clock before answering, as though the conversation has a scheduled endpoint. "Requirements were updated to reflect current guild scope. More comprehensive than the prior version." He taps the binder cover. "Expansion is appropriate when the guild expands." The word comprehensive carries more weight than anything else he says. The binder's spine shows two bindings: the original and a newer one, sewn over. The stitching is recent.`;
        addJournal('Initiation overseer confirmed recent membership requirement changes', 'evidence', `guildheart-initiation-expanded-${G.dayCount}`);
      } else {
        G.lastResult = `Drell meets your question with a practiced pause. "Ceremony records are guild confidential. Initiation protocol doesn't accommodate outside review." He gestures at the plaster wall behind him — where the old Artificers' wing seam is still visible. "Some things here go back further than current membership. That's not my department."`;
        addJournal('Initiation practices blocked without membership access', 'evidence', `guildheart-initiation-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 8. APPRENTICE MASTER: SKILL SUPPRESSION
  {
    label: "Consult with the apprentice master about craft training — are certain skills being deliberately withheld from apprentices, or are knowledge-sharing practices changing?",
    tags: ['Investigation', 'NPC', 'Craft', 'Knowledge', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering craft knowledge suppression');
      G.stageProgress[1]++;

      const result = rollD20('craft', (G.skills.craft || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Keon pulls a training syllabus from his stack and reads without preamble. "Weight assessment, market-rate negotiation, independent quality arbitration — all three marked 'advanced placement only, Level Four clearance.'" He sets the page down. "My apprentices reach Level Four in year three. These are year one skills. I taught them in week two before the revision." He doesn't say who revised it. He doesn't need to.`;
        G.stageProgress[1]++;
        addJournal('Apprentice master revealed deliberate craft knowledge suppression', 'evidence', `guildheart-apprentice-suppression-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Keon turns the training ledger face-down on his desk. "Apprentice curriculum is internal to the training division. Inquiry without mentor standing isn't recognized." He walks to the other side of the bench. The apprentices at the worktable exchange a glance and go back to their tasks. The room continues without you in it.`;
        G.worldClocks.isolation++;
        addJournal('Apprentice master forbade further training questions', 'complication', `guildheart-apprentice-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Keon marks a place in the syllabus before answering. "Curriculum aligns to current guild procedural standards. Consistency first." He runs a thumb down the page. "Some modules moved to later placement." He doesn't say which ones. The apprentice at the nearest bench works through a rote measurement sequence and doesn't look up.`;
        addJournal('Apprentice master confirmed recent training methodology changes', 'evidence', `guildheart-apprentice-changed-${G.dayCount}`);
      } else {
        G.lastResult = `Keon keeps his hands on the syllabus cover. "Training methodology is guild-restricted, approved-mentor access only." He's not unfriendly — just exact. "Filed correctly through the mentor registry, I can schedule a review session. That process takes four to six weeks." He offers the registry form without breaking posture.`;
        addJournal('Apprentice training methods blocked without guild authorization', 'evidence', `guildheart-apprentice-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== ARCHETYPE DEEP DIVES (8 CHOICES) ==========

  // 9. GUILD STRUCTURE TIER 1: HIERARCHY REORGANIZATION
  {
    label: "Analyze the guild's organizational hierarchy — has the formal structure been modified, or are decision powers being centralized?",
    tags: ['Investigation', 'Structure', 'Organization', 'Power', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'guild hierarchy analysis');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The posted charter shows five department heads with independent reporting authority. The current roster shows three of those positions vacant, two filled within the past six weeks by names that don't appear in prior guild rosters. The merchant council's listed function has changed from "governing board" to "advisory body" — in the same document, same header, different revision date. The revision date is not posted. Someone changed the charter annotation without issuing a new version number.`;
        G.stageProgress[1]++;
        addJournal('Structure analysis revealed centralized power consolidation', 'evidence', `guildheart-structure-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `A clerk intercepts you at the charter display and asks your guild registration number. When you can't provide one, he notes your physical description in a log — not your name, your description. "Organizational documentation is posted for registered members. Review of internal structure requires Category Two standing." He logs the time. You've been added to a record that has no name for you yet.`;
        G.worldClocks.watchfulness++;
        addJournal('Guild leadership alerted to hierarchy analysis inquiry', 'complication', `guildheart-structure-alert-${G.dayCount}`);
      } else {
        G.lastResult = `The hierarchy board on the east wall of the main hall shows recent additions — two new titles with no corresponding department descriptions. Three prior positions have been relabeled. The relabeling is administrative language: different weight, same function implied. The change happened in the past two months. No announcement is posted.`;
        addJournal('Guild hierarchy modifications confirmed', 'evidence', `guildheart-structure-modified-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 10. TRADE NETWORK TIER 2: MERCHANT DISPLACEMENT
  {
    label: "Map the active merchants in Guildheart Hub — who's been removed from trading networks, and who's gaining unprecedented access?",
    tags: ['Investigation', 'Networks', 'Commerce', 'Displacement', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'merchant network displacement mapping');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The active trading roster from eight months ago lists forty-three registered merchants. The current roster lists forty-one — but only twenty-six names overlap. Seventeen merchants have been removed; fifteen new ones added. The removed names cluster around specific trade categories: independent textile, direct-import grain, non-guild craft goods. The added names share a single endorsing registrar signature. One person approved all fifteen new registrations.`;
        G.stageProgress[1]++;
        addJournal('Network analysis revealed deliberate merchant displacement', 'evidence', `guildheart-network-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `A commercial operations clerk asks for your authorization reference before letting you compare the roster records. When you explain your access basis, she writes something in a ledger — not the roster ledger, a different one kept under the counter. "Merchant network data is Category Two. Formal request required." She keeps the under-counter log open. It doesn't close before you leave.`;
        G.worldClocks.watchfulness++;
        addJournal('Guild commercial operations alerted to network analysis', 'complication', `guildheart-network-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The posted trader board shows gaps — spaces where names were removed without replacement text. Four previously prominent traders are absent. Three new names appear near the top of a category they have no prior history in. The board is organized by registration date. The new entries have registration dates from the same two-week window.`;
        addJournal('Merchant network composition changes confirmed', 'evidence', `guildheart-network-modified-${G.dayCount}`);
      } else {
        G.lastResult = `The active roster is behind the counter, not posted. The clerk confirms the count is current but won't allow direct comparison without authorization. "Membership records — Category Two, registered review only." The number she quotes for active traders doesn't match the number of marked stalls visible from the walkway.`;
        addJournal('Merchant network analysis incomplete without records access', 'evidence', `guildheart-network-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 11. INFORMATION CONTROL TIER 1: RUMOR SUPPRESSION
  {
    label: "Track how information flows through Guildheart Hub — are certain stories being deliberately suppressed, and is communication being filtered?",
    tags: ['Investigation', 'Information', 'Communication', 'Control', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'information flow analysis');
      G.stageProgress[1]++;

      const result = rollD20('stealth', (G.skills.stealth || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Three merchants describe the same event differently. One says a colleague was removed from the roster for fee arrears. One says she resigned. One hasn't heard anything. All three were present at the same hall session three weeks ago. The event was the same. The versions aren't. Someone spoke to at least two of them after the session. The version that travels is the one that requires no follow-up questions.`;
        G.stageProgress[1]++;
        addJournal('Information analysis revealed systematic communication suppression', 'evidence', `guildheart-information-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `A man you don't recognize falls into step with you on the covered walkway. He doesn't introduce himself. "Questions about internal guild communications go through the arbiter's registry. Just so you know the correct channel." He peels off toward the east annexe before you can respond. His pace doesn't change. He knew where you were going before you turned.`;
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
    label: "Document the specific threats and consequences being used against merchants — who's being threatened, by what means, and for what refusals?",
    tags: ['Investigation', 'Coercion', 'Fear', 'Threats', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'coercion apparatus documentation');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The pattern is in the timing. A merchant files a complaint about an arbitration ruling. Four days later, her warehouse access code stops working. Another questions a membership denial at a hall session. The following week, his trade agreement with a supplier is voided — the supplier cites a clause the merchant says was never in the original. The mechanisms are different. The interval is the same. Four days, every time.`;
        G.stageProgress[1]++;
        addJournal('Coercion analysis mapped systematic threat apparatus', 'evidence', `guildheart-coercion-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `A note arrives at your lodging before you return. No signature. "Category Three inquiries about guild conduct affect standing status. Current standing: provisional." You don't have provisional standing — you don't have standing at all. Someone assigned you a status specifically to threaten its removal. The apparatus documented itself by reaching for you.`;
        G.worldClocks.pressure += 2;
        addJournal('Inquiry drawing direct coercion response', 'complication', `guildheart-coercion-caught-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Three merchants lower their voices before they answer the same question. All three glance at the same door before speaking — the hall's east corridor, where the arbitration office sits. They don't coordinate it. The direction is instinctive. Whatever enforcement runs through that door, they already know its range.`;
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
    label: "Trace resource flows from Guildheart Hub outward — are guild resources being channeled to external destinations?",
    tags: ['Investigation', 'Resources', 'Flow', 'Redirection', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'resource flow tracking');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The quarterly fee summary shows total intake and total infrastructure expenditure. The gap between them has widened each quarter for eight months — not because costs dropped, but because a third line appeared: "administrative coordination, external." It started at four percent of total intake. Last quarter it reached nineteen. The line item has no corresponding service contract in the posted expenditure register. The money is leaving Guildheart. Where it goes is not listed.`;
        G.stageProgress[1]++;
        addJournal('Resource flow analysis revealed external resource extraction', 'evidence', `guildheart-resources-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The financial operations clerk asks three questions before answering one. When you ask about the external coordination line, she writes something and excuses herself. She comes back with a supervisor. The supervisor has the same question list. "Resource allocation inquiries — Category One, leadership authorization required." The supervisor stays until you leave the building.`;
        G.worldClocks.watchfulness++;
        addJournal('Guild financial operations alerted to resource flow tracking', 'complication', `guildheart-resources-alert-${G.dayCount}`);
      } else {
        G.lastResult = `The posted summary shows infrastructure maintenance costs lower than the previous year, despite two new annexe builds. The gap could be accounting lag — or a line moved to a different register. The numbers are consistent with the posted totals. They're not consistent with the physical building work visible from the yard.`;
        addJournal('Resource redistribution modifications detected', 'evidence', `guildheart-resources-partial-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 14. TRUST EROSION TIER 2: INSTITUTIONAL FAITH COLLAPSE
  {
    label: "Document the breakdown of merchant confidence in guild institutions — what bonds of trust have fractured, and what's replacing mutual faith?",
    tags: ['Investigation', 'Trust', 'Institutions', 'Faith', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'institutional trust erosion documentation');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The guild hall's common bench — where merchants used to gather before proceedings — is empty at midday. Six merchants stand separately, each at a different wall. They arrived at the same time. None of them approached the others. A factor nearby says the same bench was crowded six months ago. "People stopped sitting together." She doesn't say why. She doesn't need to. The bench is still the same bench. The merchants are still the same merchants. Something between them is gone.`;
        G.stageProgress[1]++;
        addJournal('Trust analysis revealed systematic institutional faith destruction', 'evidence', `guildheart-trust-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Two merchants spot you speaking to a third and cross the yard to take a different walkway. They don't know you. They know what questions look like from the outside. By midafternoon, the merchant you were speaking with has moved her stall display to face the wall. Your presence here is a liability to anyone seen talking with you.`;
        G.worldClocks.isolation++;
        addJournal('Merchants avoiding contact due to proximity risk', 'complication', `guildheart-trust-caught-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `A factor mentions that two merchants who used to share a cart now ship separately. More expensive. Less efficient. "They had a disagreement about fees." Her tone makes it clear she doesn't believe the explanation she's giving. The cart is still parked between their stalls. Neither one claims it now.`;
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
    label: "Document individual merchant economic vulnerability — who's most at risk of losing their standing, and what pressures can force compliance?",
    tags: ['Investigation', 'Vulnerability', 'Economics', 'Exposure', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'merchant vulnerability mapping');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The most exposed merchants share a profile: no guild family, single trade route, no secondary supplier. Remove warehouse access and they have nowhere to stage goods. Void one agreement and their only route closes. Each one is one ruling away from stopping. Someone catalogued this — the recent arbitration rulings cluster on merchants matching the profile with striking precision. The variance isn't random. These aren't the merchants who lost disputes. They're the merchants who could be stopped with the least resistance.`;
        G.stageProgress[1]++;
        addJournal('Merchant analysis revealed systematic economic vulnerability weaponization', 'evidence', `guildheart-vulnerability-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `A clerk intercepts you at the trade license counter. "Merchant standing assessments are Category Two, restricted access. I've flagged this inquiry." She hands you a reference number — not for the inquiry you're conducting, but for an inquiry into your own standing status. Someone already opened a file on you. The flag predates today's conversation.`;
        G.worldClocks.pressure++;
        addJournal('Arbitrator prohibited further merchant vulnerability analysis', 'complication', `guildheart-vulnerability-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Four merchants in the same section of the yard operate at the same scale. Two are visibly nervous. Two are not. The nervous two have no secondary trade relationships — their whole operation runs through guild-controlled staging. The other two have outside buyers they named before you asked. The difference between them is a single backup channel.`;
        addJournal('Merchant vulnerability and fear patterns confirmed', 'evidence', `guildheart-vulnerability-confirmed-${G.dayCount}`);
      } else {
        G.lastResult = `Merchants don't describe their exposures directly. They describe what they can afford not to do. "I can't miss the hall session." "I don't argue staging fees." The vulnerability is in the constraint, not the complaint. What they can't say no to tells you more than what they say yes to.`;
        addJournal('Merchant vulnerability analysis incomplete without financial data', 'evidence', `guildheart-vulnerability-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 16. DECISION OPACITY TIER 2: UNEXPLAINED AUTHORITY SHIFTS
  {
    label: "Analyze who's making key guild decisions — who's appearing in leadership while actual power is held elsewhere, creating confusion about authority?",
    tags: ['Investigation', 'Authority', 'Opacity', 'Decision', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'authority structure opacity analysis');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Three rulings this month cite the same authority: "per coordinating directive." No directive is numbered. No issuing body is named. The arbitrator's own name appears as the implementing authority — not the originating one. He executes decisions he didn't make and takes credit for the outcome in the record. When merchants appeal, they appeal to him. His response is the directive he implemented. The appeal closes on the same document that opened it. The loop has no exit point.`;
        G.stageProgress[1]++;
        addJournal('Authority analysis revealed deliberate decision opacity structure', 'evidence', `guildheart-opacity-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `A guild officer stops you outside the decision board and asks your registered purpose. When you describe what you're reviewing, he writes a memo on the spot. "Decision process review is Category One — leadership-authorized only. I'm flagging this as an unregistered inquiry." He hands you a copy of the memo. You are now, technically, the subject of a Category One flag you generated by reading a public board.`;
        G.worldClocks.watchfulness++;
        addJournal('Guild leadership notified of decision structure review', 'complication', `guildheart-opacity-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The rulings board lists outcomes but not deliberation records. The standard guild process requires a three-party review notation. None of the last nine rulings carry the notation. They were decided by a single authority signature. When that authority is the arbitrator, the process requires a second signature. The second signature line is blank on eight of nine.`;
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
    label: "Gather gossip in merchant quarters and warehouse districts — what stories are traders telling each other about guild changes?",
    tags: ['Investigation', 'Rumor', 'Commerce', 'Gossip', 'Meaningful'],
    xpReward: 65,
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
    label: "Compile documented evidence that proves arbitration decisions are being made externally — show the paper trail of corruption.",
    tags: ['Investigation', 'Evidence', 'Proof', 'Corruption', 'Meaningful'],
    xpReward: 80,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(80, 'exposing arbitration conspiracy');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The rulings carry marginal notes in one hand — the arbitrator's — that directly contradict the written decision text. "Hold — pending confirmation" appears on a ruling stamped as finalized. A letter fragment references "outcome Category Two, proceed per attached schedule." The schedule isn't attached. But three rulings issued the following week match the sequence the letter implies. The record isn't clean. Someone assembled it to look clean from a distance.`;
        G.stageProgress[1]++;
        addJournal('Arbitration corruption documented with paper evidence', 'evidence', `guildheart-proof-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Someone takes the documents before you finish compiling them. Not the originals — your notes. A clerk apologizes: "Unregistered document reproduction from guild records — Category One violation. This has been reported." Your compiled work is gone. What you assembled from memory is accurate. What you can prove is now thinner.`;
        G.worldClocks.pressure++;
        addJournal('Compiled arbitration evidence seized and inquiry flagged', 'complication', `guildheart-proof-caught-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `Seven rulings in nine weeks cite the same procedural category for their basis — "coordinating directive." Individually, each ruling looks standard. Together, the pattern is a column: same category, same outcome type, same week-of-month timing. Either the guild developed a remarkably consistent case distribution, or someone is scheduling the outcomes and the cases follow.`;
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
    label: "Confront a guild official who's complicit in arbitration corruption — demand explanation and decide whether to protect them or expose them.",
    tags: ['Investigation', 'Moral', 'Choice', 'Pressure', 'Meaningful'],
    xpReward: 70,
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

      addJournal('consequence', `Confronted ${npc.name} (${npc.role}) about arbitration corruption participation`, `guildheart-moral-${G.dayCount}`);

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 20. DISCOVERY MOMENT: EXTERNAL COORDINATION SOURCE
  {
    label: "Find the evidence that proves the guild arbitration corruption is being coordinated from outside Guildheart — discover the external hand orchestrating guild capture.",
    tags: ['Investigation', 'Origin', 'Discovery', 'Climax', 'Meaningful'],
    xpReward: 80,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(80, 'discovering origin source of arbitration corruption');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The courier receipts use a routing code that doesn't appear in the Guildheart manifest registry. When you trace it against the transit yard's external ledger, the code maps to a delivery point northeast of Ithtananalor — same staging location the porter Selain described. The instructions attached to two of the receipts use language from the arbitration amendment directives verbatim. Whoever wrote the directives also wrote the courier instructions. The hand coordinating Guildheart's arbitration is north of it, and has been for at least eight months.`;
        G.stageProgress[1]++;
        addJournal('External coordination source identified — northeast routing, matching directive language', 'discovery', `guildheart-origin-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `A courier you don't recognize stops you at the archive corridor. He hands you a folded note and leaves before you open it. Inside: "Category One inquiry. Stop or be stopped." No signature. The handwriting is precise — not a clerk's hand, someone trained in formal notation. Someone outside this building read your movements today before you entered the archive.`;
        G.worldClocks.pressure += 2;
        addJournal('External party intercepted archive approach with direct warning', 'complication', `guildheart-origin-caught-${G.dayCount}`);
      } else if (result.total >= 14) {
        G.lastResult = `One arbitration directive carries a routing stamp that doesn't match any Guildheart department seal. The stamp is partial — edge-clipped — but what's visible shows a different typeset than the guild's standard issue. The directive entered from outside and was stamped as internal once received. Someone inside the hall processed external instructions as though they originated here.`;
        addJournal('External coordination confirmed — external directive stamped as internal', 'discovery', `guildheart-origin-external-${G.dayCount}`);
      } else {
        G.lastResult = `Two directives in the rulings archive reference an authority that isn't named — just "per coordinating authority, northeast." The geographic reference is narrow enough to be a locality designation. It's too specific to be a procedural category. Whatever is northeast of Guildheart, someone here answers to it.`;
        addJournal('External coordination indicated but origin not yet identified', 'evidence', `guildheart-origin-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== EXPANSION CHOICES ==========

  // 21. CLUE: PRE-UNION CHARTER FRAGMENT
  {
    label: "Locate a fragment of the pre-Union charter in the guild archive basement — compare it to the current arbitration mandate.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'reading charter discrepancy evidence');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 13) {
        G.lastResult = `The pre-Union charter grants arbitration authority to a council of seven elected representatives. The current mandate assigns the same authority to a single senior arbiter — appointed by a "coordinating oversight body." The oversight body is not named anywhere in the document. Not footnoted. Not defined. The authority now flows to a position appointed by something the charter declines to describe.`;
        if (!G.flags) G.flags = {};
        G.flags.found_charter_discrepancy = true;
        addJournal('Charter discrepancy identified: arbitration authority reassigned to unnamed oversight body', 'evidence', `guildheart-charter-${G.dayCount}`);
      } else {
        G.lastResult = `You find the relevant charter section. The paper is water-stained at the top, and the authority clause runs directly into the damaged margin. The structure of the document changed — the column layout is different from the current mandate — but the original language of the authority provisions is illegible where it matters most.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 22. CLUE: OFF-CHANNEL ARBITER CONTACT
  {
    label: "Shadow the senior arbiter's movements after the guild hall closes — follow where they go that isn't on the official schedule.",
    tags: ['Investigation', 'Evidence', 'Stealth', 'Stage1', 'Meaningful'],
    xpReward: 75,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(75, 'tracking off-channel contacts');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('stealth', (G.skills.stealth || 0) + Math.floor(G.level / 3));
      if (result.isCrit) {
        G.lastResult = `The arbiter stops at a cartwright's workshop three blocks east. No transaction — a sealed letter taken from a courier, a single hand gesture of acknowledgment. The courier's pack carries a pressed mark: a lamp centered above a scale. No guild registry you know uses that sigil. The arbiter is back at the hall in under twenty minutes. The letter goes directly into the inside pocket, not the document satchel. It wasn't filed. It was kept.`;
        if (!G.flags) G.flags = {};
        G.flags.witnessed_arbiter_contact = true;
        addJournal('Arbiter off-channel contact witnessed — unrecognized sigil: lamp above scale', 'evidence', `guildheart-arbiter-tail-${G.dayCount}`);
      } else if (result.total >= 11) {
        G.lastResult = `The arbiter takes a seat at the back of a tavern on the east side and stays for twenty minutes. No drink ordered, no visible conversation. The seat faces the rear entrance. When he leaves, the tavern keeper wipes the table immediately — before other patrons have cleared nearby seats. The table wasn't empty long enough for a natural cleaning rotation.`;
      } else {
        G.lastResult = `The lamp-lit streets of Guildheart thin out toward the residential quarter, and the arbiter walks them without glancing back. Steady pace, no detours, no secondary stops. The route cuts through the merchant square, past the east annexe gate, and straight to his posted residence. Either tonight wasn't the night, or the route is a clean one used specifically when surveillance is expected — a walk shaped for being observed without producing anything. The tail produced nothing. Nothing is its own kind of result, and the shape of this nothing is practiced. He's done this walk knowing it was watched before.`;
        if (!G.worldClocks) G.worldClocks = {};
        // No penalty — stealth fails shouldn't always punish
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 23. ARCHETYPE-GATED: READING THE GUILD FLOOR
  {
    label: "Walk the guild trading floor at peak hours and read what's actually happening beneath the commerce.",
    tags: ['Investigation', 'Archetype', 'Stage1', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'reading the trading floor');
      const arch = G.archetype && G.archetype.group;

      if (arch === 'combat') {
        G.lastResult = `The arbiter crosses the floor twice in an hour. Both times, merchant conversations in his path stop a beat before he arrives and resume a beat after he passes. No one looks at him directly. The pressure isn't in what he does — he does nothing visible. It's in the space he creates by moving. The floor adjusts to him the way a room adjusts to someone carrying a weapon at rest.`;
      } else if (arch === 'magic') {
        G.lastResult = `Surface prices move. Real agreements complete in the pause between the quote and the written confirmation — a look, a slight incline of the head, and both parties know something the ledger won't show. Seven such exchanges in an hour. The floor has a second accounting running beneath the first, and the second one is the one that matters.`;
      } else if (arch === 'stealth') {
        G.lastResult = `Three men on the floor have no merchandise. They're positioned wide: one near the main entrance, one near the record desk, one moving a slow circuit through the center. They track which merchants approach which stalls and in what sequence. Someone is building a relationship map of this floor, and they're doing it through observation, not conversation.`;
      } else {
        G.lastResult = `A factor stops her pitch mid-sentence when the senior arbiter enters the floor. She waits until he passes her section before resuming. Her posture changes — shoulders lower, pace increases — the moment he clears the center aisle. The arbiter doesn't look at her. She tracks him without turning her head until he exits through the east corridor.`;
      }
      addJournal('Guild floor analysis: second economy and coercive arbiter control confirmed', 'evidence', `guildheart-floor-read-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 24. FACTION SEED: OVERSIGHT COLLEGIUM
  {
    label: "Speak to the Oversight Collegium observer stationed at the guild hall's east annexe.",
    tags: ['Faction', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'making Oversight Collegium contact');
      if (!G.factionHostility) G.factionHostility = { warden_order: 0, iron_compact: 0, oversight_collegium: 0 };

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
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
    label: "Listen to the guild memorial bell at midday and ask a local factor what it commemorates.",
    tags: ['WorldColor', 'Lore', 'Stage1', 'Meaningful'],
    xpReward: 52,
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
    label: "Establish a courier drop — a way to get information out of Guildheart without it passing through the guild's monitored channels.",
    tags: ['PersonalArc', 'Stealth', 'Stage1', 'Meaningful'],
    xpReward: 65,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(65, 'establishing courier drop');
      if (!G.flags) G.flags = {};

      const result = rollD20('stealth', (G.skills.stealth || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `A wool merchant who makes the run to outlying settlements three times a week doesn't look up from her manifest when you explain the arrangement. "Sealed cargo is sealed cargo." She names a drop location near the eastern gate and a timing window. "Don't make it complicated." She adds your first parcel to the wool manifest under a fiber weight notation that will mean nothing to a guild clerk. The channel is open.`;
        G.flags.courier_drop_guildheart = true;
        addJournal('consequence', 'Independent courier channel established through wool merchant', `guildheart-courier-${G.dayCount}`);
      } else {
        G.lastResult = `Three couriers, three conversations. All three route through the guild's message registry. One of them says it directly: "Anything that goes out of Guildheart gets logged at the desk. That's been mandatory for a year." The channel you need doesn't exist yet. Building it takes a contact you don't have.`;
      }
      G.recentOutcomeType = 'stealth'; maybeStageAdvance();
    }
  },

  // 27. SOCIAL: THE DISPLACED FACTOR
  {
    label: "Find the factor who lost their trade license last month and ask what actually happened.",
    tags: ['Social', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 67,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(67, 'hearing displaced factor account');

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 10) {
        if (!G.flags) G.flags = {};
        G.flags.met_paerun_delst = true;
        G.lastResult = `Paerun Delst is still in Guildheart. Still waiting, though he doesn't say for what. He keeps his revoked license card in his breast pocket — visible edge above the cloth, the guild stamp face-out. "Same scales as Bren and Maret." He nods toward two active stalls. "Same calibration. Mine got pulled. Theirs didn't." He's already done being angry. What's left is just the fact of it, stated flat, waiting for someone to do something with it.`;
        addJournal('Displaced factor Paerun Delst: selective enforcement of identical violation confirmed', 'evidence', `guildheart-paerun-${G.dayCount}`);
      } else {
        G.lastResult = `Paerun watches you approach and answers before you finish the introduction. "I don't discuss the license case." He's not hostile — he's rehearsed. Someone told him not to, or he decided on his own that it doesn't help anymore. The stall space where he used to operate is empty and still marked with his registration number.`;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // 28. SHADOW RIVAL INTRO
  {
    label: "A dockside factor quietly passes you a note — someone has been asking about you specifically, and their questions are detailed.",
    tags: ['Rival', 'Warning', 'Stage1', 'Meaningful'],
    xpReward: 58,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(58, 'receiving rival warning');
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};

      const arch = G.archetype && G.archetype.group;
      if (arch === 'combat') {
        G.lastResult = `The note records a series of questions: which faction you work with, whether you've spoken to anyone in the warden structure. Military framing — your affiliations, not your findings. Whoever's asking isn't trying to understand what you know. They're trying to understand who stands behind you.`;
      } else if (arch === 'magic') {
        G.lastResult = `The questions in the note are about documents — which archive sections you accessed, what categories you requested. Not what you found. What you touched. Someone pulled your archive trail and is reconstructing the shape of your inquiry from the access log alone. They're a day behind and closing.`;
      } else if (arch === 'stealth') {
        G.lastResult = `The note lists three conversations from the past two days with times to within the hour. Passive network, not a tail — too many positions for a single watcher. Someone built a relay specifically to track movement through this district. Your pattern is already mapped. They know your rhythm better than your route.`;
      } else {
        G.lastResult = `The questions in the note focus on who accepted your offers of help, not what you've learned. Someone is cataloguing your trust relationships — specifically the ones where you've extended something and the other party took it. They're looking for leverage on a third party, not evidence against you.`;
      }

      G.lastResult += ` The note is specific enough that whoever compiled it was watching before today.`;
      if (!G.rivalId) {
        if (arch === 'combat') G.rivalId = 'warden_captain';
        else if (arch === 'magic') G.rivalId = 'archivist_veld';
        else if (arch === 'stealth') G.rivalId = 'shadow_broker';
        else G.rivalId = 'provost_lenn';
      }
      addJournal('warning', 'Rival-adjacent operative confirmed actively surveilling your Guildheart investigation', `guildheart-rival-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },
  // 29. SUPPRESSION SIGNAL: OVERHEARD FRAGMENT
  {
    label: "Two clerks in the registry corridor stopped the moment they saw me",
    tags: ['Suppression', 'Observation', 'Stage1'],
    xpReward: 55,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(55, 'overhearing registry corridor exchange');

      const corridorDetail = `The registry tower's ground corridor smells of ink and damp stone. Two tariff clerks stand near the posted arbitration schedule — one holding a folded routing sheet, the other with a ledger open against his forearm. The first clerk says: "Directive 7-Cassia runs through the fourteenth, same as the Eastgate hold." The second glances toward the doorway where you've stopped. The folded sheet drops to his side. Neither clerk speaks again. They separate — one toward the north annexe, one toward the stairs — without acknowledging your presence.`;

      G.lastResult = corridorDetail;
      addJournal('Overheard in the Guildheart registry tower ground corridor: two tariff clerks cut short — "Directive 7-Cassia runs through the fourteenth, same as the Eastgate hold." Conversation ended when a third party entered. Source: registry-level administrative staff.', 'intelligence');

      G.recentOutcomeType = 'observe';
      maybeStageAdvance();
    }
  },
{
  label: 'The notice board has recent postings.',
  tags: ['social'],
  xpReward: 5,
  fn: function() {
    var key = 'rumor_drawn_' + G.location + '_' + G.dayCount;
    if (G.flags[key]) {
      G.lastResult = 'The board has nothing new since this morning.';
      return;
    }
    G.flags[key] = true;
    drawLocalityRumor(G.location);
  }
}
];
window.GUILDHEART_HUB_STAGE1_ENRICHED_CHOICES = GUILDHEART_HUB_STAGE1_ENRICHED_CHOICES;
