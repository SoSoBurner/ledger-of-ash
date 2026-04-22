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
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      if (!G.factionHostility) G.factionHostility = { warden_order: 0, iron_compact: 0, oversight_collegium: 0 };
      const result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_decon_von_reckshem = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.factionHostility.iron_compact = (G.factionHostility.iron_compact||0) + 1;
        G.lastResult = `Decon sets his pen down before you finish the question. He doesn't deny the requisitions. "The materials couldn't be obtained through standard channels without triggering Roadwarden inspection. The assessment framing was necessary." He says this the way someone states a calculation — no apology, no hesitation. The glyph pressure operation was his design. The surges create compound dependency. Soreheim holds the compound supply. He built the leverage and is not embarrassed by the architecture.`;
        addJournal('investigation', 'Soreheim Relic Strategy confirmed as operation architect — glyph pressure as territorial leverage', `sor-decon-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.factionHostility.iron_compact = (G.factionHostility.iron_compact||0) + 2;
        G.lastResult = `Decon looks up from his desk after the third word of your question. He doesn't let you finish. "Relic Strategy Wing operations are classified Alliance infrastructure. This conversation is now logged." He writes something on a card and places it face-down on the desk. A guard appears in the doorway. The card stays face-down. You're not shown what's on it.`;
        addJournal('complication', 'Relic Strategy Wing access attempt — Alliance intelligence watch list', `sor-decon-fail-${G.dayCount}`);
      } else {
        G.flags.met_decon_von_reckshem = true;
        G.investigationProgress++;
        G.factionHostility.iron_compact = (G.factionHostility.iron_compact||0) + 1;
        G.lastResult = `Decon closes the folder on his desk before looking up. "Strategic requisitions serve Alliance interests. That is the full extent of what I'm authorized to discuss." He picks up the folder again and opens it to a different page. The materials listed in the requisition manifest are on the table between you. He doesn't move them. He doesn't acknowledge them. They're consistent with suppression compound precursor profiles.`;
        addJournal('investigation', 'Relic Strategy requisitions confirmed glyph-adjacent — strategic purpose implied', `sor-decon-partial-${G.dayCount}`);
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
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.factionHostility) G.factionHostility = { warden_order: 0, iron_compact: 0, oversight_collegium: 0 };
      const result = rollD20('persuasion', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_mordoth_valinheim = true;
        G.investigationProgress++;
        G.flags.stage2_rival_status = 'negotiated';
        G.factionHostility.iron_compact = Math.max(0, (G.factionHostility.iron_compact||0) - 1);
        G.lastResult = `Mordoth doesn't ask how you got the documents. He reads through them, sets them face-down, and leans back. "The Progress bloc was promised exclusive distribution rights. That arrangement no longer appears viable." He opens a drawer. "Equivalent access through legitimate trade channels would satisfy the bloc's requirements." He puts the distribution contract records on the table without being asked. The deal is what it is. The records are real.`;
        addJournal('investigation', 'Mordoth negotiated — distribution contracts exchanged for trade access promise', `sor-mordoth-${G.dayCount}`);
      } else if (result.isFumble) {
        G.factionHostility.iron_compact = (G.factionHostility.iron_compact||0) + 2;
        G.lastResult = `Mordoth stands before you finish. "You're attempting to leverage Alliance council members with unauthorized documentation." He crosses to the door and opens it. "The Council Security committee will receive a full account of this meeting." He holds the door. The meeting is over. The committee convenes the same afternoon.`;
        addJournal('complication', 'Alliance Council Security committee — investigation designated infrastructure threat', `sor-mordoth-fail-${G.dayCount}`);
      } else {
        G.flags.met_mordoth_valinheim = true;
        G.investigationProgress++;
        G.lastResult = `Mordoth keeps his hands flat on the table. "The distribution contracts serve the Alliance's long-term strategic interests." He pauses. "Whether the approval process was appropriate is a governance question." He says governance question the way someone says something they've rehearsed. He doesn't move the contracts off the table, but he doesn't open them either.`;
        addJournal('investigation', 'Distribution contracts acknowledged — Valinheim uncommitted', `sor-mordoth-partial-${G.dayCount}`);
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
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.factionHostility) G.factionHostility = { warden_order: 0, iron_compact: 0, oversight_collegium: 0 };
      const result = rollD20('combat', (G.skills.combat||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_vorgul_oxtend = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `Vorgul crosses his arms and doesn't deny the passes. "Military logistics serve military purposes. The staging location was a contingency depot." His jaw is set — he expected a softer approach. Under the next question he shifts posture, just slightly. "The depot is still classified active." A pause. "It contains a second cache. Undeployed." He stops there. The volume of compound at the staging location is enough for a second operation matching the first.`;
        addJournal('investigation', 'Second suppression compound cache at staging location confirmed — still active', `sor-vorgul-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.factionHostility.iron_compact = (G.factionHostility.iron_compact||0) + 2;
        G.lastResult = `Vorgul raises one hand and two Shield bloc guards step in from the corridor. "Council members are not subject to unscheduled interrogation." The detention hold lasts four hours in a room with no windows. You're released with a formal warning and a notation in the council security file. The notation is permanent.`;
        addJournal('complication', 'Shield council detention order — 4-hour hold, formal warning issued', `sor-vorgul-fail-${G.dayCount}`);
      } else {
        G.flags.met_vorgul_oxtend = true;
        G.investigationProgress++;
        G.lastResult = `Vorgul stands throughout the meeting — doesn't offer a seat, doesn't sit himself. "Military transport passes for authorized logistics operations are standard Alliance procedure." He says it to the middle distance, not to you. He doesn't say what was transported. The transport passes exist. He confirmed them without confirming anything else.`;
        addJournal('investigation', 'Military transport passes for staging location confirmed', `sor-vorgul-partial-${G.dayCount}`);
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
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.factionHostility) G.factionHostility = { warden_order: 0, iron_compact: 0, oversight_collegium: 0 };
      const result = rollD20('persuasion', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_cron_udenine = true;
        G.investigationProgress++;
        G.factionHostility.iron_compact = Math.max(0, (G.factionHostility.iron_compact||0) - 1);
        G.lastResult = `Cron spreads his own notes across the table — three months of compiled observations, none of it sufficient without source documents. He looks at your documentation for a long time without touching it. "I have authority. You have evidence. Neither is enough alone." He takes the Arbiter seal from his desk drawer and stamps the cover document. "Legally admissible in any Soreheim Alliance jurisdiction. Don't waste it." He doesn't ask for anything in return.`;
        addJournal('investigation', 'Arbiter Cron provides council seal for evidence — legally admissible in Alliance jurisdictions', `sor-cron-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Cron listens, then folds his hands. "Without corroborating testimony from a council-recognized source, I can't act on this directly." He pulls a petition form from the stack beside him. "I'll file this under Arbiter review. Follow-up in three weeks." He begins writing. The petition process is real and it will take exactly as long as he says.`;
        addJournal('complication', 'Arbiter formal petition process — 3-week review delay', `sor-cron-fail-${G.dayCount}`);
      } else {
        G.flags.met_cron_udenine = true;
        G.investigationProgress++;
        G.lastResult = `Cron reads the distribution contracts without expression. "These were not submitted through the council deliberation process." He sets them down. "The approval was administrative — a procedural authorization, not a political one." He doesn't say whether that distinction matters. His hands stay flat on the table.`;
        addJournal('investigation', 'Distribution contracts bypassed council deliberation — administrative approval only', `sor-cron-partial-${G.dayCount}`);
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
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.factionHostility) G.factionHostility = { warden_order: 0, iron_compact: 0, oversight_collegium: 0 };
      const result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_roth_udenine = true;
        G.investigationProgress++;
        G.factionHostility.iron_compact = (G.factionHostility.iron_compact||0) + 1;
        G.lastResult = `The Northern Ambition expansion budget is a column document — income left, projected expenditure right. Line seven in the income column: "suppression compound distribution — recurring." The figure is large. The footnote maps it to "sales to stabilization-dependent localities." The operation was never a single tactical action. It's a revenue stream. The expansion projects on the right side of the ledger are funded by what happened to those localities. Multi-year. Already in progress.`;
        addJournal('investigation', 'Northern Ambition expansion budget depends on compound revenue — multi-year financing model', `sor-roth-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.factionHostility.iron_compact = (G.factionHostility.iron_compact||0) + 1;
        G.lastResult = `Northern Ambition security stops you at the council entrance before you reach the clerk's desk. Two of them, positioned wide. Your name goes in the security log. They don't ask questions — they walk you back to the street entrance and stand there until you're gone. The council tower door closes behind them.`;
        addJournal('complication', 'Northern Ambition bloc security — removed from council tower, name noted', `sor-roth-fail-${G.dayCount}`);
      } else {
        G.flags.met_roth_udenine = true;
        G.investigationProgress++;
        G.lastResult = `The expansion budget lists project funding as contingent on "regional economic adjustment outcomes." That phrase appears four times in the document. The budget was filed eight weeks ago — the same week the glyph disruption began in the competitor localities. The contingency and the disruption share a start date.`;
        addJournal('investigation', 'Expansion budget tied to regional economic adjustment — maps to glyph disruption effects', `sor-roth-partial-${G.dayCount}`);
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
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('persuasion', (G.skills.persuasion||0) + Math.floor(G.level/2));
      if (result.total >= 14 || result.isCrit) {
        G.flags.stage2_finale_institutional = true;
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 3;
        G.lastResult = `Cron's Arbiter seal goes on the prosecution filing at the tribunal registry desk. The clerk reads it twice, then stamps the intake form without speaking. By the end of the afternoon, the Relic Strategy Wing has been formally notified of proceedings. Decon's name is in the filing. Mordoth's name is in the filing. The tribunal process is now a public record. The operation's political backing has no quiet path left.`;
        addJournal('investigation', 'Soreheim S2 finale: Arbiter formal prosecution filed — tribunal process activated', `sor-finale-inst-${G.dayCount}`);
      } else {
        G.flags.stage2_finale_underworld = true;
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 3;
        G.lastResult = `The expansion budget documents go to every trade network courier and news circuit operating in Soreheim territory — twelve copies, twelve simultaneous drops. By the following morning, the Northern Ambition financing model is in the hands of every northern expansion creditor. Three of them send formal recall notices before the end of the day. The loan structures that fund the expansion projects begin contracting.`;
        addJournal('investigation', 'Soreheim S2 finale: expansion budget publicly released — creditors move', `sor-finale-uw-${G.dayCount}`);
      }
      G.flags.stage2_faction_contact_made = true;
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

];

window.SOREHEIM_PROPER_STAGE2_ENRICHED_CHOICES = SOREHEIM_PROPER_STAGE2_ENRICHED_CHOICES;
