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
        G.lastResult = `Decon is the architect. Not a conspirator — the primary planner. The requisitions were the cover for acquiring materials that couldn't be obtained through normal channels without triggering Roadwarden inspection. He confirms this without apology. The glyph pressure operation was designed by Soreheim's Relic Strategy Wing as a long-term territorial leverage tool. The surges create dependency on suppression compounds, which Soreheim controls.`;
        addJournal('investigation', 'Soreheim Relic Strategy confirmed as operation architect — glyph pressure as territorial leverage', `sor-decon-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.factionHostility.iron_compact = (G.factionHostility.iron_compact||0) + 2;
        G.lastResult = `Decon recognizes the direction of your questions immediately. The Relic Strategy Wing is classified. Your inquiry is logged as an unauthorized intelligence-gathering attempt against Alliance infrastructure. You are now on a watch list.`;
        addJournal('complication', 'Relic Strategy Wing access attempt — Alliance intelligence watch list', `sor-decon-fail-${G.dayCount}`);
      } else {
        G.flags.met_decon_von_reckshem = true;
        G.investigationProgress++;
        G.factionHostility.iron_compact = (G.factionHostility.iron_compact||0) + 1;
        G.lastResult = `Decon neither confirms nor denies. "Strategic requisitions serve the Alliance's interests. That is all I'm authorized to say." The materials involved in the requisitions are consistent with suppression compound production.`;
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
        G.lastResult = `Mordoth negotiates. The Progress council bloc was promised exclusive rights to suppression compound distribution — a significant trade leverage. He will cease opposition if his bloc receives equivalent trade access through legitimate channels. He provides the distribution contract records in exchange. The deal is morally grey and the evidence is real.`;
        addJournal('investigation', 'Mordoth negotiated — distribution contracts exchanged for trade access promise', `sor-mordoth-${G.dayCount}`);
      } else if (result.isFumble) {
        G.factionHostility.iron_compact = (G.factionHostility.iron_compact||0) + 2;
        G.lastResult = `Mordoth reads your approach as a leverage attempt against the Alliance. He ends the meeting and formally alerts the Council Security committee. Your investigation has been officially designated as a threat to Alliance infrastructure.`;
        addJournal('complication', 'Alliance Council Security committee — investigation designated infrastructure threat', `sor-mordoth-fail-${G.dayCount}`);
      } else {
        G.flags.met_mordoth_valinheim = true;
        G.investigationProgress++;
        G.lastResult = `Mordoth listens but does not commit. He acknowledges the distribution contracts exist. "Contracts serve the Alliance's long-term interests. Whether they are appropriate is a governance question."`;
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
        G.lastResult = `Vorgul does not deny the transport passes. "Military logistics serve military ends. The staging location was a contingency depot." He underestimated your preparation. Under sustained pressure he reveals that the staging location is still active and contains a second cache of undeployed suppression compounds — enough for a second wave.`;
        addJournal('investigation', 'Second suppression compound cache at staging location confirmed — still active', `sor-vorgul-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.factionHostility.iron_compact = (G.factionHostility.iron_compact||0) + 2;
        G.lastResult = `Vorgul's Shield council bloc has security authority. Your attempt to confront a council member results in a detention order. You are held for four hours and released with a formal warning.`;
        addJournal('complication', 'Shield council detention order — 4-hour hold, formal warning issued', `sor-vorgul-fail-${G.dayCount}`);
      } else {
        G.flags.met_vorgul_oxtend = true;
        G.investigationProgress++;
        G.lastResult = `Vorgul acknowledges the transport passes under the framing of routine military logistics. He does not volunteer additional information. The admission itself is a confirmation.`;
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
        G.lastResult = `Cron has been trying to assemble evidence against the operation for three months without success. He has council authority but not documentation. You have documentation but limited council authority. The combination is sufficient. He provides an Arbiter seal that gives your evidence formal Alliance standing — making it legally admissible in any Soreheim jurisdiction.`;
        addJournal('investigation', 'Arbiter Cron provides council seal for evidence — legally admissible in Alliance jurisdictions', `sor-cron-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Cron is too cautious to act without more certainty. He files your meeting as a formal petition under Arbiter review and schedules a follow-up in three weeks. The review process will delay any action.`;
        addJournal('complication', 'Arbiter formal petition process — 3-week review delay', `sor-cron-fail-${G.dayCount}`);
      } else {
        G.flags.met_cron_udenine = true;
        G.investigationProgress++;
        G.lastResult = `Cron listens seriously. He provides limited Arbiter cooperation — verifying that the distribution contracts you've identified were not submitted through proper council deliberation. The approval was administrative, not political.`;
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
        G.lastResult = `The Northern Ambition expansion budget is explicitly indexed to suppression compound revenue. The budget documents treat compound sales to destabilized localities as recurring income line items. The operation was not a one-time tactical action — it was the foundation of a multi-year expansion financing model.`;
        addJournal('investigation', 'Northern Ambition expansion budget depends on compound revenue — multi-year financing model', `sor-roth-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.factionHostility.iron_compact = (G.factionHostility.iron_compact||0) + 1;
        G.lastResult = `Roth's staff intercepts the inquiry at the council entrance. Northern Ambition bloc security removes you from the council tower and notes your name.`;
        addJournal('complication', 'Northern Ambition bloc security — removed from council tower, name noted', `sor-roth-fail-${G.dayCount}`);
      } else {
        G.flags.met_roth_udenine = true;
        G.investigationProgress++;
        G.lastResult = `Roth's budget documents show expansion projects contingent on "regional economic adjustment" — a phrase that maps precisely to the effects of sustained glyph disruption in competitor localities.`;
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
        G.lastResult = `The Soreheim investigation requires more evidence before formal action.`;
        G.recentOutcomeType = 'investigate'; return;
      }
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('persuasion', (G.skills.persuasion||0) + Math.floor(G.level/2));
      if (result.total >= 14 || result.isCrit) {
        G.flags.stage2_finale_institutional = true;
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 3;
        G.lastResult = `You use Cron's Arbiter seal to file a formal prosecution request against the Relic Strategy Wing and the implicated council members. The Soreheim Alliance tribunal system is activated. The operation's political backing fractures publicly. Stage III opens with Alliance tribunal process in motion.`;
        addJournal('investigation', 'Soreheim S2 finale: Arbiter formal prosecution filed — tribunal process activated', `sor-finale-inst-${G.dayCount}`);
      } else {
        G.flags.stage2_finale_underworld = true;
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 3;
        G.lastResult = `You release the expansion budget documents to every trade network and news circuit operating in Soreheim territory. The Northern Ambition financing model becomes public knowledge. Northern expansion creditors begin calling in loans.`;
        addJournal('investigation', 'Soreheim S2 finale: expansion budget publicly released — creditors move', `sor-finale-uw-${G.dayCount}`);
      }
      G.flags.stage2_faction_contact_made = true;
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

];
