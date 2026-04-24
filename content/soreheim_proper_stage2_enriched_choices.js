/**
 * SOREHEIM PROPER STAGE 2 ENRICHED CHOICES
 * Investigation arc: Iron Compact council coordination / forge-city military resupply
 * NPCs: Roth Udenine (Councillor Northern Ambition), Cron Udenine (Councillor Arbiter),
 *       Vorgul Oxtend (Councillor Shield), Mordoth Valinheim (Councillor Progress),
 *       Decon Von Reckshem (Wizard Advisor and Relic Strategist)
 */

const SOREHEIM_PROPER_STAGE2_ENRICHED_CHOICES = [

  {
    label: "Decon Von Reckshem's Relic Strategy Wing has been requisitioning glyph-adjacent materials under 'northern defense relic assessment' — the requisitions match suppression compound precursor profiles.",
    tags: ['Investigation', 'Stage2', 'Meaningful'],
    xpReward: 84,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(84, 'examining relic strategy requisitions with Decon Von Reckshem');
      const result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_decon_von_reckshem = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.factionHostility.iron_compact = (G.factionHostility.iron_compact||0) + 1;
        G.lastResult = `Decon sets his pen down before you finish the question. He doesn't deny the requisitions. "The materials couldn't be obtained through standard channels without triggering Roadwarden inspection. The assessment framing was necessary." He says this the way someone states a calculation — no apology, no hesitation. The glyph pressure operation was his design. The surges create compound dependency. Soreheim holds the compound supply. He built the leverage and is not embarrassed by the architecture.`;
        addJournal('Soreheim Relic Strategy confirmed as operation architect — glyph pressure as territorial leverage', 'evidence', `sor-decon-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.factionHostility.iron_compact = (G.factionHostility.iron_compact||0) + 2;
        G.lastResult = `Decon looks up from his desk after the third word of your question. He doesn't let you finish. "Relic Strategy Wing operations are classified Alliance infrastructure. This conversation is now logged." He writes something on a card and places it face-down on the desk. A guard appears in the doorway. The card stays face-down. You're not shown what's on it.`;
        addJournal('Relic Strategy Wing access attempt — Alliance intelligence watch list', 'complication', `sor-decon-fail-${G.dayCount}`);
      } else {
        G.flags.met_decon_von_reckshem = true;
        G.investigationProgress++;
        G.factionHostility.iron_compact = (G.factionHostility.iron_compact||0) + 1;
        G.lastResult = `Decon closes the folder on his desk before looking up. "Strategic requisitions serve Alliance interests. That is the full extent of what I'm authorized to discuss." He picks up the folder again and opens it to a different page. The materials listed in the requisition manifest are on the table between you. He doesn't move them. He doesn't acknowledge them. They're consistent with suppression compound precursor profiles.`;
        addJournal('Relic Strategy requisitions confirmed glyph-adjacent — strategic purpose implied', 'evidence', `sor-decon-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Mordoth Valinheim, Architect of Progress, is the council member who approved the distribution contracts — he may be willing to negotiate now that the evidence exists.",
    tags: ['NPC', 'Persuasion', 'Stage2', 'Consequence', 'Meaningful'],
    xpReward: 80,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(80, 'negotiating with Councillor Mordoth Valinheim');
      const result = rollD20('persuasion', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_mordoth_valinheim = true;
        G.investigationProgress++;
        G.flags.stage2_rival_status = 'negotiated';
        G.factionHostility.iron_compact = Math.max(0, (G.factionHostility.iron_compact||0) - 1);
        G.lastResult = `Mordoth doesn't ask how you got the documents. He reads through them, sets them face-down, and leans back. "The Progress bloc was promised exclusive distribution rights. That arrangement no longer appears viable." He opens a drawer. "Equivalent access through legitimate trade channels would satisfy the bloc's requirements." He puts the distribution contract records on the table without being asked. The deal is what it is. The records are real.`;
        addJournal('Mordoth negotiated — distribution contracts exchanged for trade access promise', 'evidence', `sor-mordoth-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.factionHostility.iron_compact = (G.factionHostility.iron_compact||0) + 2;
        G.lastResult = `Mordoth stands before you finish. "You're attempting to leverage Alliance council members with unauthorized documentation." He crosses to the door and opens it. "The Council Security committee will receive a full account of this meeting." He holds the door. The meeting is over. The committee convenes the same afternoon.`;
        drawSocialMisstep(G.location);
        addJournal('Alliance Council Security committee — investigation designated infrastructure threat', 'complication', `sor-mordoth-fail-${G.dayCount}`);
      } else {
        G.flags.met_mordoth_valinheim = true;
        G.investigationProgress++;
        G.lastResult = `Mordoth keeps his hands flat on the table. "The distribution contracts serve the Alliance's long-term strategic interests." He pauses. "Whether the approval process was appropriate is a governance question." He says governance question the way someone says something they've rehearsed. He doesn't move the contracts off the table, but he doesn't open them either.`;
        addJournal('Distribution contracts acknowledged — Valinheim uncommitted', 'evidence', `sor-mordoth-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Vorgul Oxtend, Shield of the Alliance, commands the military logistics chain — the suppression compound staging location used Soreheim military transport passes.",
    tags: ['NPC', 'Combat', 'Stage2', 'Meaningful'],
    xpReward: 76,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(76, 'confronting Councillor Vorgul Oxtend on military transport passes');
      const result = rollD20('combat', (G.skills.combat||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_vorgul_oxtend = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `Vorgul crosses his arms and doesn't deny the passes. "Military logistics serve military purposes. The staging location was a contingency depot." His jaw is set — he expected a softer approach. Under the next question he shifts posture, just slightly. "The depot is still classified active." A pause. "It contains a second cache. Undeployed." He stops there. The volume of compound at the staging location is enough for a second operation matching the first.`;
        addJournal('Second suppression compound cache at staging location confirmed — still active', 'evidence', `sor-vorgul-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.factionHostility.iron_compact = (G.factionHostility.iron_compact||0) + 2;
        G.lastResult = `Vorgul raises one hand and two Shield bloc guards step in from the corridor. "Council members are not subject to unscheduled interrogation." The detention hold lasts four hours in a room with no windows. You're released with a formal warning and a notation in the council security file. The notation is permanent.`;
        addJournal('Shield council detention order — 4-hour hold, formal warning issued', 'complication', `sor-vorgul-fail-${G.dayCount}`);
      } else {
        G.flags.met_vorgul_oxtend = true;
        G.investigationProgress++;
        G.lastResult = `Vorgul stands throughout the meeting — doesn't offer a seat, doesn't sit himself. "Military transport passes for authorized logistics operations are standard Alliance procedure." He says it to the middle distance, not to you. He doesn't say what was transported. The transport passes exist. He confirmed them without confirming anything else.`;
        addJournal('Military transport passes for staging location confirmed', 'evidence', `sor-vorgul-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Cron Udenine, Arbiter of Justice, is privately alarmed by the operation's scope — he is not part of the conspiracy but suspects his council colleagues.",
    tags: ['NPC', 'Persuasion', 'Stage2', 'Meaningful'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'appealing to Councillor Cron Udenine Arbiter of Justice');
      const result = rollD20('persuasion', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_cron_udenine = true;
        G.investigationProgress++;
        G.factionHostility.iron_compact = Math.max(0, (G.factionHostility.iron_compact||0) - 1);
        G.lastResult = `Cron spreads his own notes across the table — three months of compiled observations, none of it sufficient without source documents. He looks at your documentation for a long time without touching it. "I have authority. You have evidence. Neither is enough alone." He takes the Arbiter seal from his desk drawer and stamps the cover document. "Legally admissible in any Soreheim Alliance jurisdiction. Don't waste it." He doesn't ask for anything in return.`;
        addJournal('Arbiter Cron provides council seal for evidence — legally admissible in Alliance jurisdictions', 'evidence', `sor-cron-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Cron listens, then folds his hands. "Without corroborating testimony from a council-recognized source, I can't act on this directly." He pulls a petition form from the stack beside him. "I'll file this under Arbiter review. Follow-up in three weeks." He begins writing. The petition process is real and it will take exactly as long as he says.`;
        drawSocialMisstep(G.location);
        addJournal('Arbiter formal petition process — 3-week review delay', 'complication', `sor-cron-fail-${G.dayCount}`);
      } else {
        G.flags.met_cron_udenine = true;
        G.investigationProgress++;
        G.lastResult = `Cron reads the distribution contracts without expression. "These were not submitted through the council deliberation process." He sets them down. "The approval was administrative — a procedural authorization, not a political one." He doesn't say whether that distinction matters. His hands stay flat on the table.`;
        addJournal('Distribution contracts bypassed council deliberation — administrative approval only', 'evidence', `sor-cron-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Roth Udenine's Northern Ambition council bloc is funding expansion projects that depend on continued glyph disruption keeping rival settlements destabilized.",
    tags: ['NPC', 'Lore', 'Stage2', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'exposing Northern Ambition funding dependencies');
      const result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_roth_udenine = true;
        G.investigationProgress++;
        G.factionHostility.iron_compact = (G.factionHostility.iron_compact||0) + 1;
        G.lastResult = `The Northern Ambition expansion budget is a column document — income left, projected expenditure right. Line seven in the income column: "suppression compound distribution — recurring." The figure is large. The footnote maps it to "sales to stabilization-dependent localities." The operation was never a single tactical action. It's a revenue stream. The expansion projects on the right side of the ledger are funded by what happened to those localities. Multi-year. Already in progress.`;
        addJournal('Northern Ambition expansion budget depends on compound revenue — multi-year financing model', 'evidence', `sor-roth-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.factionHostility.iron_compact = (G.factionHostility.iron_compact||0) + 1;
        G.lastResult = `Northern Ambition security stops you at the council entrance before you reach the clerk's desk. Two of them, positioned wide. Your name goes in the security log. They don't ask questions — they walk you back to the street entrance and stand there until you're gone. The council tower door closes behind them.`;
        addJournal('Northern Ambition bloc security — removed from council tower, name noted', 'complication', `sor-roth-fail-${G.dayCount}`);
      } else {
        G.flags.met_roth_udenine = true;
        G.investigationProgress++;
        G.lastResult = `The expansion budget lists project funding as contingent on "regional economic adjustment outcomes." That phrase appears four times in the document. The budget was filed eight weeks ago — the same week the glyph disruption began in the competitor localities. The contingency and the disruption share a start date.`;
        addJournal('Expansion budget tied to regional economic adjustment — maps to glyph disruption effects', 'evidence', `sor-roth-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Lyria Firesoul's forge manifest shows a discrepancy — the allotment numbers don't match the war-production quota ledger.",
    tags: ['stage2', 'soreheim_proper'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      var roll = rollD20('lore', G.skills.lore);
      if (roll.total >= 13) {
        G.flags.met_lyria_firesoul = true;
        G.investigationProgress = (G.investigationProgress || 0) + 1;
        addNarration('Forge Manifest Discrepancy', 'The quota ledger is stamped and sealed — production figures in red-chalked columns down the left margin. The forge manifest beside it shows different numbers for the same allotment period. Lyria Firesoul does not look up when you set them side by side on the counter. She keeps her eyes on the manifest. One finger moves to the column header — not pointing, just resting there. The variance is not small. "Tower registries reconcile on the last day of each period," she says. "They haven\'t reconciled in six weeks."');
        addJournal('Forge manifest allotment figures diverge from war-production quota ledger — six-week gap in tower reconciliation', 'evidence');
        maybeStageAdvance();
      } else {
        addNarration('Restricted Registry Access', 'The quota ledger is kept behind the forge registry counter. The labor foreman at the counter is polite but thorough — work assignment seal required, tower-rank identifier required. You have neither. He writes a referral slip in a careful hand and slides it across the counter. The referral slip is for a different office in a different tower. The queue there runs three days.');
      }
    }
  },

  {
    label: "The porter moving crates through the third-tower logistics yard knows exactly what\'s in the manifest discrepancy — and who signed the transfer order.",
    tags: ['stage2', 'soreheim_proper'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      var roll = rollD20('persuasion', G.skills.persuasion);
      if (roll.total >= 13) {
        G.investigationProgress = (G.investigationProgress || 0) + 1;
        addNarration('The Porter\'s Account', 'He doesn\'t stop moving. The crate goes onto the freight sled and he picks up the next one before answering. "Transfer order came down with a Relic Strategy Wing seal on it. I moved it because the seal was good." He sets the second crate down harder than necessary. "Four loads that week. Same destination each time. Not on the standard route manifest." He straightens up and looks at the loading dock clock rather than at you. "Staging depot, north bridge access road. I wrote it in my personal log because the route number didn\'t exist."');
        addJournal('Porter confirms Relic Strategy Wing transfer orders routed to north bridge staging depot — not logged in standard manifest', 'intelligence');
        maybeStageAdvance();
      } else {
        addNarration('Tower Rank Suspicion', 'The porter sets down his crate and takes a step back. His eyes move to your hands — no tower-rank mark, no work assignment badge. "Logistics inquiries go through the freight registry office, second floor, east tower." He picks the crate back up and turns away. The conversation is over. Three workers nearby have noticed the exchange and are watching without appearing to watch.');
      }
    }
  },

  {
    label: "The shrine attendant\'s record of public oath displays shows the wrong name on a tower merit judgment — someone substituted into a ceremony they had no standing to attend.",
    tags: ['stage2', 'soreheim_proper'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      var roll = rollD20('stealth', G.skills.stealth);
      if (roll.total >= 13) {
        G.investigationProgress = (G.investigationProgress || 0) + 1;
        addNarration('The Ceremony Record', 'The shrine attendance rolls are kept in a cedar cabinet behind the offering table. The attendant is at the far end of the hall, adjusting a candle arrangement with careful attention. The ceremony record for the sixth-week merit judgment is third from the top — the name entered under the Northern Ambition bloc representative slot does not match the councillor\'s registered seal. The substituted name is a Relic Strategy Wing clerk designation. Whoever attended that merit judgment was not authorized to receive the production allocation it conveyed. The allocation is still in effect.');
        addJournal('Tower merit judgment record shows unauthorized substitution — Relic Strategy Wing clerk received Northern Ambition production allocation', 'evidence');
        maybeStageAdvance();
      } else {
        addNarration('Ritual Correction', 'The shrine attendant notices the direction of your attention before you reach the cedar cabinet. She moves to stand between you and it without appearing to hurry. "Attendance records are closed to review outside formal tribunal process." Her voice carries the flat certainty of someone who has corrected this particular mistake before. She waits until you step back. A purification offering is suggested, loudly enough for the two worshippers near the entrance to hear.');
      }
    }
  },

  {
    label: "The tower scribe's permit ledger logs two transit seals for the same night.",
    tags: ['stage2', 'soreheim_proper', 'paperwork'],
    xpReward: 32,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      var roll = rollD20('lore', G.skills.lore);
      if (roll.total >= 13) {
        G.flags.tower_scribe_cooperative = true;
        G.investigationProgress++;
        addNarration('The Duplicate Seal Entry', 'The scribe turns the permit ledger toward you with the edge of a ruler, not her fingers — she slides the ruler flush to the margin every time she presents a page, and the ruler does not leave her hand while outsiders are reading. Two transit seals are entered for the third hour of the same night. Same convoy number. Different signing authorities. One is a Giant Council quota seal. The other is a Relic Strategy Wing operational seal. Both are valid. Both authorize the same cargo. The ledger does not reconcile duplicates — it simply lists them.');
        addJournal('Permit ledger records duplicate transit seals on same convoy — Giant Council and Relic Strategy Wing both authorizing', 'evidence');
        maybeStageAdvance();
      } else {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
        addNarration('Ruler Across the Page', 'The scribe slides the ruler flush to the permit ledger margin and closes the cover before you finish reading. "Permit-class entries require a tower-rank identifier for cross-reference inquiry." She sets the ruler parallel to the ledger spine. The ledger stays closed. A second scribe at the adjacent desk logs the inquiry attempt in a smaller register without looking up.');
      }
    }
  },

  {
    label: "Three consecutive buyer permits voided without cause via override.",
    tags: ['stage2', 'soreheim_proper', 'trade_records'],
    xpReward: 34,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      var roll = rollD20('lore', G.skills.lore);
      if (roll.total >= 13) {
        G.flags.trade_permit_archive_checked = true;
        G.investigationProgress++;
        addNarration('Trade Permit Archive — Voided Licenses', 'The permit archive clerk files by issuance date, not buyer name, and does not notice the pattern until you lay three consecutive pages side by side on the counter. Three trade licenses, all issued to the same sealed-charter buyer reference — same code Thalen\'s ledger carried — voided within forty-eight hours of each issue. Not revoked for cause. Voided with a Relic Strategy Wing administrative override code entered in the revocation field. The override code is designed for internal logistical holds, not commercial permit suspension. Someone used institutional authority to erase a buyer\'s paper trail one document at a time.');
        addJournal('Trade permit archive: three consecutive licenses voided via Relic Strategy Wing override — same sealed-charter buyer reference', 'evidence');
        maybeStageAdvance();
      } else {
        addNarration('Trade Permit Archive — Access Queued', 'The archive request goes into the permit clerk\'s queue behind eleven other inquiries. She hands you a numbered slip. Cross-reference requests require a tower-rank identifier verified at the main registry — a step that takes a full working day and produces a second numbered slip for a second queue. The process is not obstructive. It is simply very thorough.');
      }
    }
  },

  {
    label: "Two guild authority stamps on the same export manifest.",
    tags: ['stage2', 'soreheim_proper', 'guild_authority'],
    xpReward: 34,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      var roll = rollD20('craft', G.skills.craft);
      if (roll.total >= 13) {
        G.investigationProgress = (G.investigationProgress || 0) + 1;
        addNarration('Export Manifest — Dual Stamp Anomaly', 'The export manifest sits in the surface pile at the guild registry counter — recent enough to be unfiled. Two stamps on the lower third of the page: the Giant Council export authority mark in blue ink, and a Relic Strategy Wing operational clearance in black. Both are genuine. Both authorize the same outbound shipment. The guild registry clerk\'s copy, filed in the bound ledger beside the counter, carries only the Giant Council stamp. The black stamp on the manifest copy does not appear anywhere in the clerk\'s records. The operational clearance was added after the clerk\'s copy was taken. The shipment already left.');
        addJournal('Export manifest dual-stamped — Relic Strategy Wing clearance added post-filing, absent from registry record', 'evidence');
        maybeStageAdvance();
      } else {
        addNarration('Export Manifest Counter — Nothing Surface', 'The export manifest counter is current with its filings — the clerk keeps a tidy ledger and has no outstanding discrepancies she is aware of. Everything processed this week is reconciled. You would need a specific manifest number or date range to go further, and you don\'t have either.');
      }
    }
  },

  {
    label: "A labor foreman at the forge dock is arguing with a quota clerk about a reassigned crew.",
    tags: ['stage2', 'soreheim_proper', 'public_complication'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      var roll = rollD20('persuasion', G.skills.persuasion);
      if (roll.total >= 13) {
        G.flags.foreman_quota_dispute_overheard = true;
        G.investigationProgress = (G.investigationProgress || 0) + 1;
        addNarration('Crew Reassigned Off the Books', 'The foreman has his hands on his belt — thumbs hooked under the buckle, elbows wide, the posture of someone who will not move until he is answered. His crew of six was pulled off forge rotation for four nights last week under a quota override he never saw signed. The work they did during those nights does not appear on his tower output tally. He names the override reference number loudly enough that the clerk flinches — a number that carries a Relic Strategy Wing prefix, not a war-production prefix. The clerk writes nothing down. The foreman notes this and stops talking.');
        addJournal('Forge dock foreman crew reassigned four nights under Relic Strategy Wing override — work absent from tower output tally', 'evidence');
        maybeStageAdvance();
      } else {
        addNarration('Quieted at the Counter', 'Two tower enforcers cross the dock at an unhurried pace. The foreman sees them before they reach him and drops the complaint mid-sentence. He touches the buckle of his belt and turns back toward his crew. The clerk closes the tally book. By the time you reach the counter the dispute has been disassembled into nothing on record. An enforcer asks your tower-rank identifier and is not satisfied with your answer.');
      }
    }
  },

  {
    label: "Stage 2 Soreheim Proper finale — the operation's command structure is confirmed. Use Cron's Arbiter seal for formal prosecution or expose the expansion budget publicly.",
    tags: ['Investigation', 'Finale', 'Stage2', 'Consequence', 'Meaningful'],
    xpReward: 112,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(112, 'Soreheim Proper Stage 2 resolution');
      if (!G.investigationProgress || G.investigationProgress < 8) {
        G.lastResult = `The evidence assembled so far doesn't carry enough weight for formal action. The council operates on documentation. More is needed before any formal step holds.`;
        G.recentOutcomeType = 'investigate'; return;
      }
      const result = rollD20('persuasion', (G.skills.persuasion||0) + Math.floor(G.level/2));
      if (result.total >= 14 || result.isCrit) {
        G.flags.stage2_finale_institutional = true;
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 3;
        G.lastResult = `Cron's Arbiter seal goes on the prosecution filing at the tribunal registry desk. The clerk reads it twice, then stamps the intake form without speaking. By the end of the afternoon, the Relic Strategy Wing has been formally notified of proceedings. Decon's name is in the filing. Mordoth's name is in the filing. The tribunal process is now a public record. The operation's political backing has no quiet path left.`;
        addJournal('Soreheim S2 finale: Arbiter formal prosecution filed — tribunal process activated', 'evidence', `sor-finale-inst-${G.dayCount}`);
      } else {
        G.flags.stage2_finale_underworld = true;
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 3;
        G.lastResult = `The expansion budget documents go to every trade network courier and news circuit operating in Soreheim territory — twelve copies, twelve simultaneous drops. By the following morning, the Northern Ambition financing model is in the hands of every northern expansion creditor. Three of them send formal recall notices before the end of the day. The loan structures that fund the expansion projects begin contracting.`;
        addJournal('Soreheim S2 finale: expansion budget publicly released — creditors move', 'evidence', `sor-finale-uw-${G.dayCount}`);
      }
      G.flags.stage2_faction_contact_made = true;
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // ── ROAD WARDENS FACTION CONTACT PLOT (3-beat sequence) ───────────

  // BEAT 1 — Hook
  {
    label: "One north-gate banner hangs lower than the others.",
    tags: ['Wardens', 'Stage2', 'Faction'],
    xpReward: 60,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(60, 'reading the altered north-gate banner');
      G.flags.stage2_faction_wardens_aware = true;
      G.lastResult = 'The four Roadwarden banners along the north gate arcade are matched cloth and matched height. One hangs a finger-width lower than its neighbors. The brass grommet below it has been polished where the others carry road grit, which is what a Banner-Master does when she is marking a drop point without writing anything down. The patrol rotation passing under it does not look up. The rotation changes on the half-hour and the banner hangs lowered only during one of those windows. The lowered banner is an invitation from someone senior enough in the Order to move brass on the main gate without a work order.';
      addJournal('Soreheim north gate — Roadwarden banner hung low at one rotation window, brass worked clean as a silent drop mark', 'intelligence', `sor-warden-aware-${G.dayCount}`);
      G.recentOutcomeType = 'investigate';
    }
  },

  // BEAT 2 — Commitment
  {
    label: "Stand under the low banner at the rotation change. Meet whoever is doing the inviting.",
    tags: ['Wardens', 'Stage2', 'Faction', 'NPC'],
    xpReward: 72,
    fn: function() {
      if (!G.flags.stage2_faction_wardens_aware) {
        G.lastResult = 'Nothing to act on with the Wardens yet.';
        G.recentOutcomeType = 'locked'; return;
      }
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'making the Wardens command contact');
      G.flags.met_banner_master_ruven_halse = true;
      G.flags.stage2_faction_wardens_contacted = true;
      G.lastResult = 'Banner-Master Ruven Halse walks past you at the rotation change, does not stop, and says to meet him at the third bay of the mustering yard in twenty minutes. When you get there he is alone, stripping a patrol saber for cleaning. His register is formal Roadwarden — verbs first, no pleasantries, station numbers as shorthand for places. His tell is that he lines the saber parts on the cloth in the exact order of disassembly and will not speak at all when a piece is out of sequence. He wants the patrol incident log from Station Forty-Two for a specific seven-day window — pulled from the archive room without the duty sergeant signing it out. Official channels have been instructed not to produce it. He needs it to hold a hearing that the Order has been quietly refused.' + applyTensionModifier('warden_any');
      addJournal('Met Banner-Master Ruven Halse (Roadwardens Order) — wants Station 42 incident log for a 7-day window pulled unofficially; Order hearing has been refused through channels', 'contact_made', `sor-warden-contacted-${G.dayCount}`);
      G.recentOutcomeType = 'investigate';
    }
  },

  // BEAT 3 — Payoff
  {
    label: "Station 42 log is the piece Ruven needs — and it's still in the archive.",
    tags: ['Wardens', 'Stage2', 'Faction', 'Payoff'],
    xpReward: 90,
    fn: function() {
      if (!G.flags.stage2_faction_wardens_contacted) {
        G.lastResult = 'Halse hasn\'t indicated the next step.';
        G.recentOutcomeType = 'locked'; return;
      }
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(90, 'delivering the Station 42 incident log');
      G.flags.stage2_faction_wardens = true;
      G.flags.stage2_faction_contact_made = true;
      G.investigationProgress = (G.investigationProgress||0) + 2;
      G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
      var tension = '';
      if (G.flags.stage2_faction_red_hood) {
        tension = ' Ruven closes the log with his thumb still in the page. "There is Red Hood grease on this cover. A hair of it. You are carrying things I would rather you not carry into my bay. I will keep the log. You will not be in the yard when the hearing convenes, and you will not tell me why you smell like a Kerroun broker."';
      }
      G.lastResult = 'Ruven reads the log in order and stops at a four-day gap where the Station 42 duty sergeant entered the same weather phrase on every line — fair, light wind from the north — across forty hours of what should have been active patrol entries. "That phrase is a place-holder we train new cadets to leave in when they cannot reach the logging post. A station sergeant does not leave it four days in a row. The sergeant was pulled off rotation on the first day and ordered to write it anyway, by a name above mine that is not supposed to have that reach." He does not name the superior. He marks the gap with a saber-cleaning pin and closes the book. "The Order keeps track of what the Order cannot say out loud. Your page just made three years of that tracking admissible."' + tension;
      addJournal('Roadwardens intel: Station 42 logs show 40-hour placeholder gap ordered by a superior officer whose authority exceeds published rank — tracking admissible', 'evidence', `sor-warden-payoff-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

];

window.SOREHEIM_PROPER_STAGE2_ENRICHED_CHOICES = SOREHEIM_PROPER_STAGE2_ENRICHED_CHOICES;
