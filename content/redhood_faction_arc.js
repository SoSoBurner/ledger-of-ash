'use strict';

var REDHOOD_FACTION_MODULE = (function() {

  // ── Beat 1: The carved symbol and the note ────────────────────────────────

  function beat1ShouldTrigger() {
    return !!(G && G.stage === 'Stage II' &&
      (G.stageProgress[2] || 0) >= 6 &&
      !G.flags.redhood_arc_started &&
      !G.flags.redhood_arc_complete);
  }

  function beat1() {
    if (!G || G.flags.redhood_arc_started) return;
    G.flags.redhood_arc_started = true;

    G.lastResult = 'The symbol is carved into the door frame at the lower hinge — a hood rendered in three cuts, the kind of mark that reads as damage unless you are looking for it. You are looking for it because you have seen the same three-cut shape twice before in the last week, in two different localities, at the same height on two different door frames. This one has something tucked behind the hinge plate: a strip of paper folded to the width of a finger. You work it loose without pulling the hinge. Unfolded, nine words in a hand that uses no loops: "You are looking at the ledger from the wrong side."';
    G.recentOutcomeType = 'discovery';
    addJournal('Red Hood symbol carved at lower hinge — third instance, different localities. Note: "You are looking at the ledger from the wrong side."', 'evidence');
    if (typeof updateHUD === 'function') updateHUD();

    setTimeout(function() {
      (window._rawRenderChoices || window.renderChoices)([
        {
          id: 'redhood_beat1_mark',
          text: 'Three instances, three localities. Someone is building a trail for one specific reader.',
          tag: 'safe',
          action: function() { beat1Mark(); }
        },
        {
          id: 'redhood_beat1_search',
          text: 'The message implies a different entry point. The door itself is worth examining more carefully.',
          tag: 'risky',
          action: function() { beat1Search(); }
        },
        {
          id: 'redhood_beat1_wait',
          text: 'A network that leaves physical marks in multiple places is watching to see who finds them.',
          tag: 'bold',
          action: function() { beat1Wait(); }
        }
      ]);
    }, 400);
  }

  function beat1Mark() {
    var r = rollD20('lore');
    if (r.success) {
      G.lastResult = 'You map the three locations on paper — locality, door position, height, facing direction. The three doors form a rough line across the district, spaced by roughly the same interval. The facing direction of each door is away from the nearest administrative building. Someone chose these doors not randomly but systematically: each one is on a route that avoids Collegium access log checkpoints. The message is about the path, not the door. The right side of the ledger is the route the records took to get suppressed, not the ledger itself.';
      G.flags.redhood_trail_mapped = true;
      G.flags.redhood_methodology_understood = true;
      G.investigationProgress = Math.max(G.investigationProgress || 0, (G.investigationProgress || 0) + 1);
      G.recentOutcomeType = 'success';
    } else {
      G.lastResult = 'The three locations are spread across too large an area to resolve a clear pattern from memory. The message is real. What it means about the ledger\'s other side is not clear yet. You keep the note. The symbol stays where you found it.';
      G.recentOutcomeType = 'neutral';
    }
    addJournal(G.lastResult, 'intelligence');
    if (typeof updateHUD === 'function') updateHUD();
    G.flags.redhood_beat1_done = true;
    if (typeof checkStageAdvance === 'function') checkStageAdvance();
  }

  function beat1Search() {
    var r = rollD20('finesse');
    if (r.success) {
      G.lastResult = 'The door frame below the symbol has a second mark — not carved but pressed into the wood grain with something blunt: a small arrow, pointing down and left, toward the threshold. You lift the corner of the threshold plate. Beneath it, sealed in waxed cloth and laid flat against the stone: a second note, longer than the first, written in the same loopless hand. It lists four administrative filings by reference number and date, each one withdrawn from the record within thirty days of entry, each one withdrawn using the same authorization stamp. The stamp number is one you have seen before.';
      G.flags.redhood_threshold_found = true;
      G.flags.redhood_four_filings = true;
      G.investigationProgress = Math.max(G.investigationProgress || 0, (G.investigationProgress || 0) + 1);
      G.recentOutcomeType = 'success';
    } else {
      G.lastResult = 'The door frame gives nothing beyond the symbol and the first note. Either the frame has been examined before you got here, or the threshold was the next step and someone else already moved it. The mark remains. The message remains. The door is just a door now.';
      G.recentOutcomeType = 'neutral';
    }
    addJournal(G.lastResult, 'evidence');
    if (typeof updateHUD === 'function') updateHUD();
    G.flags.redhood_beat1_done = true;
    if (typeof checkStageAdvance === 'function') checkStageAdvance();
  }

  function beat1Wait() {
    var r = rollD20('survival');
    if (r.success) {
      G.lastResult = 'You find a position with sight lines to the door and wait. Forty minutes. A figure passes the door at normal walking pace, slows by half a step at the hinge, continues. They did not place anything and did not take anything. They were checking whether the hinge note had been found. You follow at distance for two blocks before they enter a covered passage. You do not follow into the passage. But you have seen their coat, their gait, and the direction they came from. They are not a courier — they move like someone checking on something they care about.';
      G.flags.redhood_watcher_identified = true;
      G.flags.redhood_methodology_understood = true;
      G.investigationProgress = Math.max(G.investigationProgress || 0, (G.investigationProgress || 0) + 1);
      G.recentOutcomeType = 'success';
    } else {
      G.lastResult = 'You wait. No one comes to the door in the time you can sustain the watch. Either the check interval is longer than expected or the watcher came and went before you arrived. The symbol stays on the frame. The note stays in your coat. The network does not show itself today.';
      G.recentOutcomeType = 'neutral';
    }
    addJournal(G.lastResult, 'intelligence');
    if (typeof updateHUD === 'function') updateHUD();
    G.flags.redhood_beat1_done = true;
    if (typeof checkStageAdvance === 'function') checkStageAdvance();
  }

  // ── Beat 2: The list of disappeared names ─────────────────────────────────

  function beat2ShouldTrigger() {
    return !!(G && G.stage === 'Stage II' &&
      (G.stageProgress[2] || 0) >= 8 &&
      G.flags.redhood_beat1_done &&
      !G.flags.redhood_beat2_done);
  }

  function beat2() {
    var hasMethodology = !!(G.flags.redhood_methodology_understood);
    var hasFourFilings = !!(G.flags.redhood_four_filings);

    G.lastResult = 'The third door in the sequence — the one you had not yet examined — has a fresh symbol at the hinge. This time the threshold plate is loose before you touch it. Inside, sealed in the same waxed cloth: not a note but a list. Twenty-three names, printed in the same loopless hand, each one followed by a polity stamp and a date. The dates run across four years. The stamps cover six polities. At the top of the list, no header — only a single line: "These names no longer appear in any administrative record in any polity that signed the Oversight Charter. They existed. They submitted reports. The reports are gone. So are they."' + (hasFourFilings ? ' The reference numbers from the threshold note appear in the margins beside four of the names. The two documents are from the same source.' : '') + (hasMethodology ? ' The doors were the path. This is what they led to.' : '');
    G.recentOutcomeType = 'discovery';
    addJournal('Red Hood list: 23 names erased from cross-polity administrative records — spans four years, six polities, all Oversight Charter signatories', 'evidence');
    if (typeof updateHUD === 'function') updateHUD();

    setTimeout(function() {
      (window._rawRenderChoices || window.renderChoices)([
        {
          id: 'redhood_beat2_study',
          text: 'Twenty-three names across four years is a pattern, not a coincidence. The list was compiled by someone who survived it.',
          tag: 'safe',
          action: function() { beat2Study(); }
        },
        {
          id: 'redhood_beat2_crosscheck',
          text: 'The stamps and dates can be checked against the access logs. Some of these names may have left traces the records missed.',
          tag: 'risky',
          action: function() { beat2Crosscheck(); }
        },
        {
          id: 'redhood_beat2_signal',
          text: 'The list was left specifically for you. They know you have it now. The next step is theirs to offer.',
          tag: 'bold',
          action: function() { beat2Signal(); }
        }
      ]);
    }, 400);
  }

  function beat2Study() {
    var r = rollD20('lore');
    if (r.success) {
      G.lastResult = 'Three of the names have polity stamps from Soreheim, all in the same eighteen-month window. Two of the Soreheim names submitted reports on transit weight discrepancies — the same discrepancy category you have been tracing. Their reports are not in the sub-registry, not in the gate logs, not in any cross-referenced filing. They are simply absent. A third name submitted a carrier testimony; it also does not exist in any record you have been able to access. The list is not a memorial. It is a map of what was removed and why.';
      G.flags.redhood_soreheim_names = true;
      G.flags.redhood_list_analyzed = true;
      G.investigationProgress = Math.max(G.investigationProgress || 0, (G.investigationProgress || 0) + 1);
      G.recentOutcomeType = 'success';
    } else {
      G.lastResult = 'The names do not resolve into a clear pattern without cross-references you do not have on hand. The polity stamps and dates are real, but without access to the corresponding filing periods, the list is evidence of absence rather than evidence of anything specific. You keep it. The absence itself is what matters — twenty-three names across six polities do not disappear from every record by accident.';
      G.recentOutcomeType = 'partial';
    }
    addJournal(G.lastResult, 'evidence');
    if (typeof updateHUD === 'function') updateHUD();
    G.flags.redhood_beat2_done = true;
    if (typeof checkStageAdvance === 'function') checkStageAdvance();
  }

  function beat2Crosscheck() {
    var r = rollD20('finesse');
    if (r.success) {
      G.lastResult = 'You pull carrier arrival logs for the Soreheim transit post against the dates on the list. Two of the names appear in arrival manifests — under different surnames, same first names, same route designations. Either they were using secondary names or someone altered the manifests after the fact and missed the arrival logs. The logs are not in the same filing system as the manifests; the alteration did not reach them. You have a thread the suppression process did not catch.';
      G.flags.redhood_crosscheck_success = true;
      G.flags.redhood_list_analyzed = true;
      G.investigationProgress = Math.max(G.investigationProgress || 0, (G.investigationProgress || 0) + 1);
      G.recentOutcomeType = 'success';
    } else {
      G.lastResult = 'The access logs for the relevant filing periods have been consolidated — moved to a centralized archive that requires a sub-registry referral to access. The cross-check would take a day and a formal request. The list stays in your coat. The cross-check is possible but not today.';
      G.recentOutcomeType = 'neutral';
    }
    addJournal(G.lastResult, 'evidence');
    if (typeof updateHUD === 'function') updateHUD();
    G.flags.redhood_beat2_done = true;
    if (typeof checkStageAdvance === 'function') checkStageAdvance();
  }

  function beat2Signal() {
    G.lastResult = 'You leave a chalk mark of your own at the first door — a horizontal line at the same height as the hood symbol. Three hours later, a folded note appears in the same waxed cloth format, left this time in your coat pocket in a crowded market passage. You did not feel it placed. The note says: "Good. You understand the system well enough to use it. The list was always meant to move. That is what the right side of the ledger looks like — things that can still be carried."';
    G.flags.redhood_signal_answered = true;
    G.flags.redhood_list_analyzed = true;
    G.investigationProgress = Math.max(G.investigationProgress || 0, (G.investigationProgress || 0) + 1);
    G.recentOutcomeType = 'discovery';
    addJournal('Red Hood network acknowledged signal — confirmed list is meant to be forwarded', 'intelligence');
    if (typeof updateHUD === 'function') updateHUD();
    G.flags.redhood_beat2_done = true;
    if (typeof checkStageAdvance === 'function') checkStageAdvance();
  }

  // ── Beat 3: Pass the list forward or hold it ─────────────────────────────

  function beat3ShouldTrigger() {
    return !!(G && G.stage === 'Stage II' &&
      (G.stageProgress[2] || 0) >= 9 &&
      G.flags.redhood_beat2_done &&
      !G.flags.redhood_arc_complete);
  }

  function beat3() {
    var hasAnalysis = !!(G.flags.redhood_list_analyzed);
    var hasSoreheimNames = !!(G.flags.redhood_soreheim_names || G.flags.redhood_crosscheck_success);

    G.lastResult = 'A fourth door. This one is not on the route you mapped — it is in a different district entirely, and the symbol is not carved but painted, in red that has not fully dried. The threshold plate is already loose. Inside: no note this time. Only a space where something could be placed, and a chalk arrow pointing outward, toward the lane.' + (hasSoreheimNames ? ' The Soreheim names on the list — the ones connected to transit weight reports — appear in your notes with a margin annotation you made yourself three days ago. The list and your inquiry have been running parallel the whole time. Someone knew this and built the trail accordingly.' : '') + (hasAnalysis ? ' You have what the list means. The question now is what you do with that meaning.' : ' You have the list. The question now is what you do with it.');
    G.recentOutcomeType = 'discovery';
    if (typeof updateHUD === 'function') updateHUD();

    setTimeout(function() {
      (window._rawRenderChoices || window.renderChoices)([
        {
          id: 'redhood_beat3_pass',
          text: 'Twenty-three names held in one coat are twenty-three names that can still be lost. The arrow points outward.',
          tag: 'risky',
          action: function() { beat3Pass(); }
        },
        {
          id: 'redhood_beat3_hold',
          text: 'A list that moves through unknown hands moves toward an unknown destination. Hold it until the destination is clear.',
          tag: 'safe',
          action: function() { beat3Hold(); }
        },
        {
          id: 'redhood_beat3_both',
          text: 'A copy passes forward. The original stays. Whatever the network does with it, you still have it.',
          tag: 'bold',
          action: function() { beat3Both(); }
        }
      ]);
    }, 400);
  }

  function beat3Pass() {
    var r = rollD20('stealth');
    if (r.success) {
      G.lastResult = 'You place the list in the threshold space and replace the plate. By the following morning, the painted symbol has been cleaned from the door frame — the wood beneath it slightly damp, the color gone. The list has moved. Where it goes from here is outside your visibility; that is the design of the system that carries it. Two days later, a rumor reaches you through the market notice board: a clerk in the Soreheim transit administration submitted a formal complaint about missing personnel records. The complaint names a date range. The date range matches the oldest entries on the list. Something the network sent arrived somewhere.';
      G.flags.redhood_list_passed = true;
      G.flags.redhood_contact = true;
      G.flags.stage2_faction_contact_made = true;
      G.flags.redhood_arc_complete = true;
      G.investigationProgress = Math.max(G.investigationProgress || 0, (G.investigationProgress || 0) + 1);
      G.recentOutcomeType = 'success';
      addJournal('Red Hood list forwarded — network activated, Soreheim personnel record complaint filed', 'evidence');
    } else {
      G.lastResult = 'You place the list and step back. Nothing moves at the door for an hour. When you return to check, the threshold plate is back in position — but the waxed cloth is gone. Either the network retrieved it faster than you expected or someone else reached it first. The painted symbol remains. The list is no longer in your possession. Where it is, you cannot say.';
      G.worldClocks = G.worldClocks || {};
      G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
      G.flags.redhood_list_lost = true;
      G.flags.redhood_contact = true;
      G.flags.stage2_faction_contact_made = true;
      G.flags.redhood_arc_complete = true;
      G.recentOutcomeType = 'complication';
      addJournal('Red Hood list placed but recovery uncertain — watchfulness increased', 'complication');
    }
    _close();
  }

  function beat3Hold() {
    G.lastResult = 'You leave the threshold space empty. The arrow stays chalked on the floor of the cavity — you can see it when you lift the plate. The network left the space open for a reason. You carry the list. What you carry cannot be retrieved by the network, altered by the system that removed the names, or used against you by someone who intercepts the drop. It is the most protection twenty-three names can have, in a coat that is not yet known to the people looking for the names. The painted symbol dries on the door frame. No one cleans it.';
    G.flags.redhood_list_held = true;
    G.flags.redhood_contact = true;
    G.flags.stage2_faction_contact_made = true;
    G.flags.redhood_arc_complete = true;
    G.recentOutcomeType = 'discovery';
    addJournal('Red Hood list held — not forwarded, in possession', 'intelligence');
    _close();
  }

  function beat3Both() {
    var r = rollD20('finesse');
    if (r.success) {
      G.lastResult = 'You transcribe the list in full before placing it — twenty-three names, every polity stamp, every date. The copy takes thirty minutes and fits inside your notebook without altering its shape. The original goes into the threshold. By morning the painted symbol is gone and the plate is back in its original position. You have what the network now has. The difference is that you also know which three Soreheim names connect to the transit weight reports. That cross-reference is yours alone. The network does not have it. They carried the list without knowing what you know about it.';
      G.flags.redhood_list_passed = true;
      G.flags.redhood_list_copied = true;
      G.flags.redhood_contact = true;
      G.flags.stage2_faction_contact_made = true;
      G.flags.redhood_arc_complete = true;
      G.investigationProgress = Math.max(G.investigationProgress || 0, (G.investigationProgress || 0) + 1);
      G.recentOutcomeType = 'success';
      addJournal('Red Hood list forwarded and copied — original passed, transcript retained with Soreheim cross-reference', 'evidence');
    } else {
      G.lastResult = 'The transcription takes longer than the thirty minutes you budgeted. Your handwriting compresses under time pressure and three entries become difficult to read back. The original goes into the threshold. The copy is yours, but partial — sixteen names, not twenty-three. The seven you could not complete in time are gone with the original. The network has the full list. You have most of it.';
      G.flags.redhood_list_passed = true;
      G.flags.redhood_list_partial_copy = true;
      G.flags.redhood_contact = true;
      G.flags.stage2_faction_contact_made = true;
      G.flags.redhood_arc_complete = true;
      G.recentOutcomeType = 'partial';
      addJournal('Red Hood list forwarded — partial copy retained, 7 names not transcribed in time', 'intelligence');
    }
    _close();
  }

  function _close() {
    if (typeof updateHUD === 'function') updateHUD();
    if (typeof checkStageAdvance === 'function') checkStageAdvance();
  }

  function publicShouldTrigger() {
    if (beat3ShouldTrigger()) return true;
    if (beat2ShouldTrigger()) return true;
    return beat1ShouldTrigger();
  }

  function publicTrigger() {
    if (beat3ShouldTrigger()) { beat3(); return; }
    if (beat2ShouldTrigger()) { beat2(); return; }
    beat1();
  }

  return { shouldTrigger: publicShouldTrigger, trigger: publicTrigger };

})();

window.REDHOOD_FACTION_MODULE = REDHOOD_FACTION_MODULE;
