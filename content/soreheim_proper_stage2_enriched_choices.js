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
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
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
        G.lastResult = `Decon looks up from his desk after the third word of your question. He doesn't let you finish. "Relic Strategy Wing operations are classified Alliance infrastructure. This conversation is now logged." He writes something on a card and places it face-down on the desk. A guard appears in the doorway. The card stays face-down. The route through Decon is closed — but the Wing's supply manifests still run through civilian transit records that don't carry the same classification.`;
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
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
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
      const result = rollD20('might', (G.skills.combat||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_vorgul_oxtend = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `Vorgul crosses his arms and doesn't deny the passes. "Military logistics serve military purposes. The staging location was a contingency depot." His jaw is set — he expected a softer approach. Under the next question he shifts posture, just slightly. "The depot is still classified active." A pause. "It contains a second cache. Undeployed." He stops there. The volume of compound at the staging location is enough for a second operation matching the first.`;
        addJournal('Second suppression compound cache at staging location confirmed — still active', 'evidence', `sor-vorgul-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.factionHostility.iron_compact = (G.factionHostility.iron_compact||0) + 2;
        G.lastResult = `Vorgul raises one hand and two Shield bloc guards step in from the corridor. "Council members are not subject to unscheduled interrogation." The detention hold lasts four hours in a room with no windows. You're released with a formal warning and a notation in the council security file. The notation is permanent — but the council's shipping exemptions run through a public transit index that doesn't require a council appointment to read.`;
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
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
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
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
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
      var roll = rollD20('wits', G.skills.lore);
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
      var roll = rollD20('charm', G.skills.persuasion);
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
      var roll = rollD20('finesse', G.skills.stealth);
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
      var roll = rollD20('wits', G.skills.lore);
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
      var roll = rollD20('wits', G.skills.lore);
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
      var roll = rollD20('spirit', G.skills.craft);
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
      var roll = rollD20('charm', G.skills.persuasion);
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
    label: "The northern transit ledger shows compound shipments moving under a Giant Council exemption code that expired two seasons ago.",
    tags: ['Stage2', 'Lore'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'tracing expired exemption code in northern transit ledger');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.transit_ledger_exemption_confirmed = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The exemption code is stamped across eleven consecutive manifests — GC-Transit-Exemption-4417, issued to a now-dissolved northern resupply cooperative, expired at the close of the last fiscal season. The transit clerk's copy shows the expiry date crossed out in fresh ink and a handwritten extension notation beneath it. The notation carries no authorizing signature. Whoever renewed the exemption did it on the face of the document, by hand, without council approval. The shipments moved anyway. Every manifest after the expiry date is legally unsanctioned.`;
        addJournal('Northern transit ledger: 11 manifests under expired GC exemption code — unauthorized handwritten extension, no countersignature', 'evidence', `sor-transit-ledger-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The transit ledger office requires a Giant Council registry identifier for cross-period exemption searches. The clerk writes the requirement on a slip and slides it across the counter without looking up. Behind the counter the ledger sits open to the wrong season. The identifier requirement is not posted anywhere visible — it was added to the internal protocol three weeks ago. The forward path runs through the permit archive, where the procedural wall hasn't been erected yet.`;
        addJournal('Northern transit ledger access blocked — new GC identifier requirement', 'complication', `sor-transit-ledger-fail-${G.dayCount}`);
      } else {
        G.flags.transit_ledger_exemption_confirmed = true;
        G.investigationProgress++;
        G.lastResult = `The exemption code appears on seven manifests across a four-month window. The transit clerk confirms it was issued to a dissolved cooperative — she checks the dissolution register without being asked and marks the date. "Expired accounts shouldn't carry active exemption codes." She looks at the manifests once more. "These were processed by a different shift." She does not say which shift.`;
        addJournal('Northern transit ledger: expired exemption code on 7 manifests — dissolved cooperative, different shift processing', 'intelligence', `sor-transit-ledger-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "A junior Wing clerk was on duty the night Decon's override was entered — she filed a personal correction note that never reached the official record.",
    tags: ['Stage2', 'NPC'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'interviewing junior Relic Strategy Wing clerk Senne Orvath');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_senne_orvath = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Senne Orvath keeps her hands in her lap and does not lean toward the table. Her personal correction note is folded inside the back cover of her duty log — she has been carrying it there since the night she wrote it, two months ago. The note records the override sequence Decon entered: timestamp, authorization code, destination registry. She wrote it because the authorization code did not exist in the Wing's official code roster. She checked it three times. It was generated outside the Wing's formal issuance system — a code Decon produced from an external source and entered as if it were internal. The correction note has never left her duty log.`;
        addJournal('Senne Orvath (Wing clerk): Decon\'s override used a fabricated authorization code — generated outside official Wing issuance, witnessed and logged privately', 'evidence', `sor-senne-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Senne closes her duty log before you finish the first question. Her thumb presses the cover flat against the desk. "Relic Strategy Wing personnel are not available for external queries without a formal Wing directive." She says it without inflection — the exact phrasing from the Wing's standard refusal protocol, which she has clearly been given. She does not look at the back cover of the log when she puts it away. But she put it in her bag, not in the filing stack.`;
        addJournal('Wing clerk Senne Orvath — formal refusal; kept duty log in personal bag', 'complication', `sor-senne-fail-${G.dayCount}`);
      } else {
        G.flags.met_senne_orvath = true;
        G.investigationProgress++;
        G.lastResult = `Senne confirms she was on duty that night. She confirms an override was entered. "The authorization code wasn't in the roster I was trained on." She pauses. "I wrote it down." She does not produce the note, but she does not deny it exists. Her hand moves briefly to her bag before settling back on the table.`;
        addJournal('Wing clerk Senne Orvath confirms override entry and private notation of non-roster authorization code', 'intelligence', `sor-senne-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "A Relic Strategy Wing courier leaves the third tower at the same hour every fourth night — the route doesn't match any posted assignment.",
    tags: ['Stage2', 'Stealth'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'shadowing the off-schedule Relic Strategy Wing courier');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('finesse', (G.skills.stealth||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.courier_route_traced = true;
        G.investigationProgress++;
        G.lastResult = `The courier moves through three service corridors that bypass the forge-dock checkpoints entirely — maintenance access routes that are open but unwatched after the third bell. He ends at a storage annex behind the north bridge transit station: a low building with a new padlock on the loading bay door and no signage. He goes in, stays twelve minutes, and comes back without the satchel he carried in. The annex does not appear in the tower registry as active storage. The padlock manufacturer's mark is the same mark stamped on the staging depot hardware Vorgul's manifest described.`;
        addJournal('Wing courier route traced to unlisted north bridge annex — new padlock matching staging depot hardware; satchel delivered, courier returned empty-handed', 'evidence', `sor-courier-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `The courier stops at the junction of the second service corridor and faces the wall, still, for thirty seconds. Then he turns around and retraces two full corridor segments without going anywhere. He exits through the public dock and returns to the tower by the main entrance. A patrol officer in the dock writes something in a small notebook when you emerge behind the courier. The notebook goes into his breast pocket. The writing took about four seconds.`;
        addJournal('Courier surveillance burned — patrol officer logged your presence at dock exit', 'complication', `sor-courier-fail-${G.dayCount}`);
      } else {
        G.flags.courier_route_traced = true;
        G.investigationProgress++;
        G.lastResult = `The courier takes a maintenance corridor to a side exit at the north bridge approach. He meets someone at the street corner — a brief exchange, nothing passed visibly — and returns the same way. The meeting point is a corner with clear sight lines in three directions. You watch from the fourth. The person he met wore a transit registry badge, not a Wing insignia.`;
        addJournal('Wing courier met transit registry contact at north bridge approach — maintenance corridor egress, no visible transfer', 'intelligence', `sor-courier-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The outer forge ring runs cold one night a week — but the loading crews show up anyway.",
    tags: ['Stage2', 'Survival'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'enduring the outer forge ring to observe off-books loading');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('vigor', (G.skills.survival||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.forge_ring_offbooks_witnessed = true;
        G.investigationProgress++;
        G.lastResult = `The forge ring goes cold at the second bell — venting stacks idle, heat dropping fast. By the third bell the ambient temperature at the outer ring has dropped enough that breath shows. The loading crew that arrives is six people, no tower badges, carrying unmarked crates on a flatbed sled. They work without lanterns. The crates go into a recessed bay at the base of the third forge column that is listed on the tower blueprint as a thermal buffer cavity. It holds eleven crates before the bay doors close. No manifest is produced. No signature changes hands. The crew leaves the way they came.`;
        addJournal('Outer forge ring: 6-person unbadged crew loads 11 crates into unlisted thermal cavity at 3rd bell cold cycle — no manifest, no signature', 'evidence', `sor-forge-ring-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The outer ring at cold-cycle is exposed on three sides with no cover that holds for more than forty minutes. By the second hour the position becomes untenable — thermal drop, wind channeled between forge columns. You pull back before the loading crew arrives. The next cold cycle is four nights away. The observation position needs a different approach: something lower and closer to the forge column base rather than the ring perimeter.`;
        addJournal('Outer forge ring cold-cycle observation — position untenable; exposure before loading crew arrived', 'complication', `sor-forge-ring-fail-${G.dayCount}`);
      } else {
        G.flags.forge_ring_offbooks_witnessed = true;
        G.investigationProgress++;
        G.lastResult = `A crew arrives at the outer ring during the cold cycle — four people, no badges visible at this distance. They work near the third column base for about thirty minutes and leave with an empty sled. The crates they carried in did not come back out. The column base bay is visible but not close enough to read any markings on the crates. Something was stored. The bay doors are the same recessed type marked as thermal buffer cavities on the posted tower blueprints.`;
        addJournal('Outer forge ring: unbadged crew deposits crates in thermal cavity bay during cold cycle — not recovered on departure', 'intelligence', `sor-forge-ring-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Residue on the staging depot's loading sleds matches a compound profile — and Soreheim's alloy register can confirm it was never authorized for export.",
    tags: ['Stage2', 'Craft'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'analyzing compound residue against the Soreheim alloy export register');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('spirit', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.compound_residue_matched = true;
        G.investigationProgress++;
        G.lastResult = `The residue sample scraped from the sled runners is a layered compound — base mineral binder with a synthetic catalyst fixed on top, the kind of layering that requires a controlled bonding step, not a field mix. The alloy export register lists every compound with that binder profile. None of them are cleared for export to the localities named in Roth's expansion budget. One of them is specifically flagged as a restricted compound under the northern resettlement accords — agreements Soreheim signed twelve years ago. The compound was moved in violation of a treaty obligation, not just a trade rule.`;
        addJournal('Compound residue matched to resettlement-accord restricted compound — Soreheim export register confirms treaty violation, not merely a trade infraction', 'evidence', `sor-residue-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The alloy export register requires a guild craft identifier to run a compound cross-reference. The identifier requirement is enforced at the register desk by a clerk who has clearly been asked about compound profiles before — she asks for your identifier before you finish the description and does not accept a work-around. The sample analysis can be run through a private craft assay house in the outer district, but the result would not be admissible in council proceedings without the official register cross-reference.`;
        addJournal('Alloy export register access blocked — guild craft identifier required; private assay possible but non-admissible', 'complication', `sor-residue-fail-${G.dayCount}`);
      } else {
        G.flags.compound_residue_matched = true;
        G.investigationProgress++;
        G.lastResult = `The clerk runs the compound profile against the export register and marks three entries with the same binder structure. Two are cleared for export. One is flagged as restricted — northern resettlement accords, signed twelve years ago. She circles the flag notation. "This one would need a council waiver to move." She checks the waiver ledger without being asked. There is no waiver on file for the current fiscal year.`;
        addJournal('Compound residue matches restricted northern-accord compound — no export waiver on file for current year', 'intelligence', `sor-residue-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The off-books laborers were paid — and the wage records show the same sealed-charter reference Roth's budget used.",
    tags: ['Stage2', 'Lore'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'tracing off-books wage records to sealed-charter reference');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.wage_ledger_traced = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The labor disbursement ledger kept by the outer-district pay station records six separate cash payments to unnamed work crews across twelve weeks — each entry marked only with a sealed-charter identifier: SC-4417, the same code stamped on the voided trade permits and Roth's expansion budget income line. The payments are categorized as "contingent labor, northern depot operations." The pay station clerk who signed the disbursements retired three weeks after the last payment. His forwarding address is a district outside Soreheim Alliance jurisdiction. The sealed-charter reference now links three independent financial records to a single coordinating entity.`;
        addJournal('Wage disbursement ledger: SC-4417 sealed-charter reference links off-books labor payments to same entity as voided trade permits and Northern Ambition budget', 'evidence', `sor-wage-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The outer-district pay station maintains disbursement records by period only — no cross-reference by charter identifier without a Giant Council labor registry authorization. The authorization requires a tower-rank sponsor. The clerk writes the requirement in full on a request slip and adds the current processing time at the bottom: fourteen working days. The pay records sit behind a counter that is six steps away, organized in clearly labeled monthly files. Fourteen days from now those files rotate to the archive annex.`;
        addJournal('Wage ledger access blocked — labor registry authorization required; files rotating to archive in 14 days', 'complication', `sor-wage-fail-${G.dayCount}`);
      } else {
        G.flags.wage_ledger_traced = true;
        G.investigationProgress++;
        G.lastResult = `Three of the six disbursement entries carry the sealed-charter reference SC-4417 in the authorization column. The pay station clerk traces the reference through her charter index and finds no registered entity — the charter number was issued but the corresponding entity registration was never completed. "Incomplete charters can't legally authorize disbursements." She marks all three entries. "Someone processed these anyway."`;
        addJournal('Pay station: SC-4417 charter identifier incomplete — three disbursements processed without legal entity registration', 'intelligence', `sor-wage-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The council herald who carries sealed correspondence between the bloc offices has been running extra routes on days Decon is absent from the tower.",
    tags: ['Stage2', 'NPC'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'pressing council herald Bren Sothwick on irregular dispatch routes');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_bren_sothwick = true;
        G.investigationProgress++;
        G.lastResult = `Bren Sothwick is the kind of person who keeps his route log current by reflex — the habit of someone whose job depends on provable delivery times. He opens it to the relevant weeks without being asked, laying it flat on the mail bench. On the four days Decon's tower access log showed him absent, Bren ran sealed dispatches from an outer-district drop point to the council transit registry rather than the standard Wing receiving office. The drop point address is a disused commercial factor's address two streets behind the north bridge transit station — the same street block as the unlisted annex the courier's route ended at. Someone used the herald's official schedule to route correspondence through an address that doesn't carry Wing oversight.`;
        addJournal('Herald Bren Sothwick: 4 irregular dispatches from outer-district factor address to transit registry — same block as unlisted north bridge annex', 'evidence', `sor-herald-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Bren closes his route log the moment he reads the dispatch date you cite. "Sealed correspondence is covered by council herald privilege. The routes, the recipients, and the origin points are not discussable without a council directive from the Arbiter's office." He stands up from the mail bench. The route log goes into his document bag. He is technically correct about the privilege, which is exactly the kind of technical correctness that has kept him employed through four different administrations.`;
        addJournal('Herald Bren Sothwick — council herald privilege invoked; route log closed', 'complication', `sor-herald-fail-${G.dayCount}`);
      } else {
        G.flags.met_bren_sothwick = true;
        G.investigationProgress++;
        G.lastResult = `Bren confirms the extra routes. "Authorization came through the standard dispatch order system — I had a signed order for each run." He checks the log for the originating signature. The orders were signed by a Wing administrative designate, not by Decon directly. Bren delivered to a commercial factor address on two of the four runs. "Different drop than usual, but the order was valid."`;
        addJournal('Herald confirms 4 irregular dispatches — Wing administrative designate authorized, factor address used as drop point', 'intelligence', `sor-herald-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The restricted tower blueprint vault holds a floor plan that doesn't match the structure visible from the north bridge approach.",
    tags: ['Stage2', 'Stealth'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'accessing restricted tower blueprint vault to find undisclosed floor space');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('finesse', (G.skills.stealth||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.blueprint_discrepancy_found = true;
        G.investigationProgress++;
        G.lastResult = `The restricted blueprint drawer is filed by tower column — the lock uses the same key pattern as the forge registry annex, and the gap between shifts is four minutes wide. The original construction survey for the third forge column shows a sub-level cavity that does not appear on any current operational blueprint: a space below the thermal buffer designation, accessible by a maintenance ladder behind the northwest fire door. The cavity dimensions match the crate volume the unbadged loading crew delivered during the cold cycle. The original survey is dated twelve years ago. Someone removed the cavity from later plans without issuing a construction amendment.`;
        addJournal('Blueprint vault: original 3rd-column survey shows undisclosed sub-level cavity — removed from later plans, cavity dimensions match observed cold-cycle loading volume', 'evidence', `sor-blueprint-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `The blueprint vault door has a secondary latch that isn't visible from outside — it registers the door position on a mechanical counter inside the frame. The counter is checked by the duty archivist at each shift change. The latch was engaged. The counter registers an access during an unstaffed window. By the time you reach the main corridor two tower enforcers are already at the registry desk checking the counter log. The vault is now on enhanced watch.`;
        addJournal('Blueprint vault access attempt detected — mechanical counter logged entry, enhanced watch activated', 'complication', `sor-blueprint-fail-${G.dayCount}`);
      } else {
        G.flags.blueprint_discrepancy_found = true;
        G.investigationProgress++;
        G.lastResult = `The current operational blueprint for the third column shows the thermal buffer cavity as a labeled but empty maintenance space — no dimensions, no access notation. The adjacent original survey file, unfiled in the same drawer, has full dimensions and a ladder access marked in red ink. The current blueprint was amended. The amendment removed the sub-level designation without closing the physical space.`;
        addJournal('3rd-column blueprint amended: sub-level cavity removed from current plans but physical access remains — original survey still in file', 'intelligence', `sor-blueprint-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Night patrol at the north bridge curfew line reveals which transit passes move freely after the third bell — and whose names appear on them.",
    tags: ['Stage2', 'Survival'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'enduring a full night on the north bridge curfew line to log post-curfew transit');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('vigor', (G.skills.survival||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.night_transit_log_observed = true;
        G.investigationProgress++;
        G.lastResult = `The north bridge curfew post checks fourteen passes between the third and fifth bell. Eleven are standard cargo holds — crew names, company seals, scheduled window. Three are different: plain passes, no company mark, the authorizing stamp a Relic Strategy Wing operational code that the checkpoint sergeant reads and waves through without recording. The sergeant does not enter them in his curfew log. The third pass carrier wears a transit registry badge on the left breast — the same badge type the Wing courier met at the north bridge approach corner. All three unlogged passes move toward the factor-address street block.`;
        addJournal('North bridge curfew post: 3 unlogged Wing operational passes waved through after third bell — no entry in sergeant\'s log, all moving toward factor-address block', 'evidence', `sor-nightwatch-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The curfew observation position at the north bridge approach is a loading-dock overhang with a clear angle on the checkpoint but no cover from the patrol sweep that runs at the fourth bell. The sweep catches the position. A patrol officer takes your name and tower-rank identifier, writes them in a small book, and walks you back to the inner-ring gate. The curfew log at the checkpoint has been closed for the night before you get another angle on it.`;
        addJournal('North bridge curfew observation — patrol sweep caught position; name logged, escorted from area', 'complication', `sor-nightwatch-fail-${G.dayCount}`);
      } else {
        G.flags.night_transit_log_observed = true;
        G.investigationProgress++;
        G.lastResult = `Four passes move through the north bridge curfew checkpoint after the third bell without standard company marks. The sergeant waves two of them through without logging them — the other two go into the standard curfew record. The unlogged passes carry a stamp too small to read from this distance, but both pass-carriers move toward the north bridge approach rather than the inner-ring commercial district. One of them carries a satchel that sits too rigid to be empty.`;
        addJournal('2 unlogged passes at north bridge curfew — non-standard stamp, moving toward north bridge approach; one carrier with rigid satchel', 'intelligence', `sor-nightwatch-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The assay marks on the crates recovered from the forge cavity don't match any of Soreheim's registered forge stamps — they came from somewhere else.",
    tags: ['Stage2', 'Craft'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'cross-referencing crate assay marks against Soreheim registered forge stamps');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('spirit', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.assay_marks_traced = true;
        G.investigationProgress++;
        G.lastResult = `The assay mark on the crate fragment is a tripartite stamp — two exterior marks flanking a center designation. Soreheim's registered forge stamps all use a single-authority center mark with directional supplementals. This pattern is a northern frontier assay convention, used in five localities outside Soreheim Alliance territory. The center designation matches a now-decommissioned extraction site in the northern resettlement corridor — territory covered by the accords Soreheim signed twelve years ago. The compound wasn't produced in Soreheim. It was produced in a facility that no longer officially exists, transported into Soreheim territory, and given a local paper trail through the material ledger laundering. The operation crosses two separate treaty obligations.`;
        addJournal('Crate assay marks: northern frontier convention, decommissioned extraction site in resettlement corridor — compound produced outside Soreheim, smuggled in and given local ledger cover', 'evidence', `sor-assay-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The forge stamp registry requires a physical sample cross-reference, not a sketch or description — the assay mark must be presented in original form to the metallurgical verification desk. The sample is from a crate fragment that was logged when recovered, which means it has an evidence hold on it. Removing it for a registry cross-reference requires a council authorization from the Arbiter's office. Cron could sign it, but the authorization process takes three working days and creates a record that the Relic Strategy Wing will be able to read.`;
        addJournal('Assay mark registry cross-reference blocked — evidence hold requires Arbiter authorization; 3-day process creates Wing-visible record', 'complication', `sor-assay-fail-${G.dayCount}`);
      } else {
        G.flags.assay_marks_traced = true;
        G.investigationProgress++;
        G.lastResult = `The metallurgical registry clerk identifies the stamp pattern as non-Soreheim without needing the index — she recognizes the tripartite convention by eye. "This is northern frontier assay work. Pre-resettlement." She checks the origin index. Five possible localities, all outside Soreheim Alliance territory. "None of these are current production sites." She marks the entry. "This material was not manufactured here."`;
        addJournal('Assay marks identified as northern frontier convention — pre-resettlement era, no current production sites; compound not of Soreheim manufacture', 'intelligence', `sor-assay-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "A retired senior Wing officer living in the outer ring knows the internal override protocols — and stopped working for the Wing without explanation two years ago.",
    tags: ['Stage2', 'NPC'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'approaching retired Wing officer Hassel Dorn about internal override protocols');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_hassel_dorn = true;
        G.investigationProgress++;
        G.lastResult = `Hassel Dorn does not ask how you found his address. He sits across from you in a room that has no Wing insignia, no commendation plaques, nothing that marks the twenty-three years. His tell is that he straightens the edge of whatever document is nearest to him before he speaks — not reading it, just squaring it. He designed the override authorization system. The external code Senne Orvath couldn't find in the roster is not a fabrication: it's a recovery code, a backdoor Dorn built into the system for emergency access. He gave that code to one person when he resigned. He names the person. It is not Decon Von Reckshem. Decon got it from someone above him.`;
        addJournal('Hassel Dorn (retired Wing architect): emergency override code given on resignation to a named superior — Decon received it second-hand; command chain extends above Relic Strategy Wing', 'evidence', `sor-dorn-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Dorn opens the door, reads your face for three seconds, and closes it without speaking. A note slides under the door thirty seconds later: a single line in a careful hand — "Wing retirement agreements carry a non-disclosure clause. I have a family." The note is unsigned. He does not answer a second knock. The outer-ring residential block has two exits, and a neighbor across the landing is watching the corridor from her doorway with no particular reason to be standing there.`;
        addJournal('Hassel Dorn refuses approach — Wing non-disclosure clause cited; neighbour surveillance noted', 'complication', `sor-dorn-fail-${G.dayCount}`);
      } else {
        G.flags.met_hassel_dorn = true;
        G.investigationProgress++;
        G.lastResult = `Dorn lets you in and stays standing the whole time. He confirms the override code exists and that he designed it. "It was a structural safeguard. Single-use, emergency access only." He does not confirm who has it. "I gave it to the person I was supposed to give it to when I left. What they did with it is not something I can speak to." He squares the edge of a letter on the sideboard before he shows you to the door. The conversation lasted nine minutes.`;
        addJournal('Hassel Dorn confirms emergency override code exists — given to one person on his resignation; refuses to name them', 'intelligence', `sor-dorn-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The Iron Compact treaty amendment archive holds a suppressed addendum that redefined what counts as northern defense materiel — giving the operation legal cover it never disclosed.",
    tags: ['Stage2', 'Lore'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'uncovering suppressed Iron Compact treaty addendum in amendment archive');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.treaty_addendum_found = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The treaty amendment archive runs chronologically — the Iron Compact accords fill four bound volumes, the amendments a fifth that is narrower and less read. Tucked between two uncontroversial border-access amendments is a three-page addendum dated eleven months ago, ratified under an emergency council session with no public notice period: "Addendum 7-C — Northern Defense Materiel Clarification." It redefines the class of materials exempted from northern resettlement accord restrictions to include "compounds required for infrastructure stabilization operations." The language is drafted with precision. The restricted compound from the alloy register fits the new definition exactly. The addendum was ratified in the same session Mordoth chaired as pro-tem council presider. Cron was not present.`;
        addJournal('Iron Compact Addendum 7-C: emergency ratification redefined northern defense materiel to cover restricted compound — retroactive cover, ratified without Arbiter present', 'evidence', `sor-addendum-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The treaty amendment archive is administered by the council chancellor's office, not the Arbiter's registry — a distinction that matters because access requires the chancellor's clerk to pull the volumes and remain present during the review. The clerk on duty today is the same one who filed the permit override three weeks ago. She asks your name, writes it, and tells you the next available archive appointment is in eight days. The appointment book is full. It was not full yesterday, according to the date-stamps on the last three entries.`;
        addJournal('Treaty archive access blocked — chancellor clerk filled appointment book after inquiry; same clerk who filed permit override', 'complication', `sor-addendum-fail-${G.dayCount}`);
      } else {
        G.flags.treaty_addendum_found = true;
        G.investigationProgress++;
        G.lastResult = `Addendum 7-C is in the archive — a short document, three pages, ratified under emergency session. The definition of "northern defense materiel" was expanded to include compounds used in "infrastructure stabilization operations." The addendum was not published in the standard council notice register. The ratification session had four council members present out of seven. The presiding officer is listed as a pro-tem designate rather than the standard session chair.`;
        addJournal('Iron Compact Addendum 7-C found: northern defense materiel definition expanded — emergency session, 4 of 7 members, pro-tem chair, unpublished notice', 'intelligence', `sor-addendum-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "A sealed dispatch rider leaves the factor-address block every third morning — the timing and the route suggest the next compound shipment is closer than the evidence implies.",
    tags: ['Stage2', 'Stealth'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'intercepting dispatch rider leaving the factor-address block to read shipment timing');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('finesse', (G.skills.stealth||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.dispatch_rider_intercepted = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The dispatch rider takes the east outer-ring road rather than the transit corridor — a longer route that avoids the checkpoint logs. The sealed pouch rides inside his coat rather than the standard saddle bag, which means the contents are not subject to the transit manifest requirement. At the second rest point he stops, checks the road in both directions, and opens the pouch to read the top document before re-sealing it. The gap lasts forty seconds. The first line of the document is legible: "Second deployment — north bridge depot, loading window opens four days from today's date. Authorization: SC-4417." The second deployment of the suppression compound is already scheduled. The authorization code matches every financial record assembled so far. Four days.`;
        addJournal('Dispatch rider: second compound deployment authorized under SC-4417 — north bridge depot loading window opens in 4 days', 'evidence', `sor-rider-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `The dispatch rider checks his back trail twice in the first quarter-mile — a trained habit, not a random glance. On the second check he holds longer than reflex would require and adjusts his pace. He takes a different turn than expected and arrives at a secondary checkpoint where he hands a note to the officer on duty before proceeding. The note goes into the checkpoint log. The rider continues without stopping. The secondary checkpoint has now been told someone is following the outer-ring dispatch route. The watchfulness goes up before the evidence does.`;
        addJournal('Dispatch rider surveillance detected — rider alerted secondary checkpoint; surveillance noted in official log', 'complication', `sor-rider-fail-${G.dayCount}`);
      } else {
        G.flags.dispatch_rider_intercepted = true;
        G.investigationProgress++;
        G.lastResult = `The dispatch rider stops at the outer-ring water point and sets the saddle pouch on the trough edge while he drinks. The pouch seal is intact but the outer label is visible: "Operational — Northern Depot, Priority Window." The routing mark on the label uses the same three-character prefix as the Relic Strategy Wing operational codes logged in the permit ledger. The delivery destination is north of the transit station. The priority window notation suggests a fixed time constraint on the contents.`;
        addJournal('Dispatch pouch label: "Operational — Northern Depot, Priority Window" — Wing operational code prefix, north transit station destination', 'intelligence', `sor-rider-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
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
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/2));
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
