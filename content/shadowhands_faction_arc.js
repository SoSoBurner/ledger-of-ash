'use strict';

// Module-pattern Shadowhands arc — 3 sequential beats with shouldTrigger/trigger.
// The existing STAGE2_SHADOWHANDS_ARC enriched-choice array handles early contact signals;
// this module handles the structured arc beats at higher stageProgress thresholds.

var SHADOWHANDS_FACTION_MODULE = (function() {

  // ── Beat 1: The chalk mark and the note ───────────────────────────────────

  function beat1ShouldTrigger() {
    return !!(G && G.stage === 'Stage II' &&
      (G.stageProgress[2] || 0) >= 5 &&
      !G.flags.shadowhands_arc_started &&
      !G.flags.shadowhands_arc_complete);
  }

  function beat1() {
    if (!G || G.flags.shadowhands_arc_started) return;
    G.flags.shadowhands_arc_started = true;

    G.lastResult = 'The chalk mark is on the third column of the east corridor archway — a small red V, half the size of a thumb, placed at eye level by someone who knew exactly where your eye would be. Below it, level with the mortar joint: a folded square of paper tucked into a gap in the stone. The fold is precise. It has been there less than an hour. Inside, written without greeting or signature: "You are reading the transit records from the ledger side. We have been reading them from the route side. The gap between those two readings is where the names are. If you want the names — the door at the bottom of Kettler\'s Lane has a loose iron bracket on the left. Lift it. Leave nothing written."';
    G.recentOutcomeType = 'discovery';
    addJournal('Dead-drop signal found — chalk mark, east corridor archway. Network operating from route-side transit data.', 'intelligence');
    if (typeof updateHUD === 'function') updateHUD();

    setTimeout(function() {
      (window._rawRenderChoices || window.renderChoices)([
        {
          id: 'shadowhands_beat1_follow',
          plot: 'main',
          text: 'Route-side data is the half of the ledger I don\'t have.',
          tag: 'safe',
          action: function() { if (typeof gainXp === 'function') gainXp(20, 'choice'); beat1Follow(); }
        },
        {
          id: 'shadowhands_beat1_watch',
          plot: 'main',
          text: 'Someone placed this within the hour. They are still nearby, watching to see what you do with it.',
          tag: 'risky',
          action: function() { if (typeof gainXp === 'function') gainXp(20, 'choice'); beat1Watch(); }
        },
        {
          id: 'shadowhands_beat1_ignore',
          plot: 'main',
          text: 'A network that uses chalk marks and wall gaps does not make direct approaches.',
          tag: 'bold',
          action: function() { if (typeof gainXp === 'function') gainXp(20, 'choice'); beat1Ignore(); }
        }
      ]);
    }, 400);
  }

  function beat1Follow() {
    var r = rollD20('stealth');
    if (r.success) {
      G.lastResult = 'The bracket lifts cleanly. Behind it, another fold of paper: a column of figures and a date range — transit outputs from the Soreheim route that do not match any manifest you have seen. The figures are higher than the filed records by a consistent margin. Whoever compiled this worked from waybills and carrier logs, not administrative filings. The gap between the two sets of numbers is not error. It is policy. A second note beneath the first says: "Three days. The Anchor taproom threshold, fourth hour after dusk. You will know us by the cup turned face-down on the table."';
      G.flags.shadowhands_dead_drop_found = true;
      G.flags.shadowhands_meeting_signal = true;
      G.investigationProgress = Math.max(G.investigationProgress || 0, (G.investigationProgress || 0) + 1);
      G.recentOutcomeType = 'success';
    } else {
      G.lastResult = 'The bracket is there but the space behind it is empty. Either the window passed or the drop was pulled after the chalk mark was spotted by someone else. A second chalk mark, smaller, appears on the column the following morning — a question mark in the same red chalk. They are still watching. The approach is not closed.';
      G.flags.shadowhands_dead_drop_missed = true;
      G.recentOutcomeType = 'neutral';
    }
    addJournal(G.lastResult, 'intelligence');
    if (typeof updateHUD === 'function') updateHUD();
    G.flags.shadowhands_beat1_done = true;
    if (typeof checkStageAdvance === 'function') checkStageAdvance();
  }

  function beat1Watch() {
    var r = rollD20('finesse');
    if (r.success) {
      G.lastResult = 'You step past the column, find a position with line of sight to the archway, and wait. Eleven minutes later: a figure in a grey coat, unremarkable, passes the column without slowing and pauses two steps past it to adjust a cuff button. Their eyes move to the paper. They register that it has been found. They continue walking. They did not place it — they were checking whether you took it. You follow to the corner of the lane before they disappear into a covered market passage. The network has watchers on their own drops.';
      G.flags.shadowhands_watcher_seen = true;
      G.flags.shadowhands_dead_drop_found = true;
      G.flags.shadowhands_meeting_signal = true;
      G.investigationProgress = Math.max(G.investigationProgress || 0, (G.investigationProgress || 0) + 1);
      G.recentOutcomeType = 'success';
    } else {
      G.lastResult = 'You position yourself to watch the column. Nothing moves in the archway for twenty minutes. When you return to the column, the paper is gone. Whoever placed it came back for it while you were watching the wrong angle. The chalk mark remains. The drop does not.';
      G.flags.shadowhands_dead_drop_missed = true;
      G.recentOutcomeType = 'neutral';
    }
    addJournal(G.lastResult, 'intelligence');
    if (typeof updateHUD === 'function') updateHUD();
    G.flags.shadowhands_beat1_done = true;
    if (typeof checkStageAdvance === 'function') checkStageAdvance();
  }

  function beat1Ignore() {
    G.lastResult = 'You leave the note in the wall. The chalk mark weathers. Three days later, passing the same archway at a different hour, you find the bracket has been reset — a new fold of paper in the gap. They sent the same drop twice. The patience is either professional or desperate. The message inside is identical except for a new date and a single addition at the bottom: "We know what you found at the sub-registry. So do they. Time is shorter than it was."';
    G.flags.shadowhands_dead_drop_found = true;
    G.flags.shadowhands_meeting_signal = true;
    G.recentOutcomeType = 'discovery';
    addJournal('Shadowhands repeated dead-drop approach — aware of Collegium sub-registry access', 'intelligence');
    if (typeof updateHUD === 'function') updateHUD();
    G.flags.shadowhands_beat1_done = true;
    if (typeof checkStageAdvance === 'function') checkStageAdvance();
  }

  // ── Beat 2: Vessin, direct contact ───────────────────────────────────────

  function beat2ShouldTrigger() {
    return !!(G && G.stage === 'Stage II' &&
      (G.stageProgress[2] || 0) >= 6 &&
      G.flags.shadowhands_beat1_done &&
      !G.flags.shadowhands_beat2_done);
  }

  function beat2() {
    G.lastResult = 'The Anchor taproom, fourth hour past dusk. The cup at the second table is turned face-down on the wood. The figure behind it is slight, dressed without distinction — neither merchant nor laborer, nothing that would make the eye stay. They do not introduce themselves. They say: "Vessin. That is enough of a name for this." Their hands are still on the table. They do not look at the door more than once every few minutes, which is the tell of someone who has already memorized the room. Vessin slides a sealed document case across the table. "We need this forwarded to the Ironhold transit post before the week\'s end. In return — a dossier on the authorization chain behind the Soreheim quota suppression. Every name. Every stamp. The complete sequence." They wait.';
    G.recentOutcomeType = 'discovery';
    addJournal('Vessin (Shadowhands courier) — document exchange offer: forward sealed case to Ironhold, receive full authorization chain dossier', 'intelligence');
    if (typeof updateHUD === 'function') updateHUD();

    setTimeout(function() {
      (window._rawRenderChoices || window.renderChoices)([
        {
          id: 'shadowhands_beat2_accept',
          plot: 'main',
          text: 'The dossier is worth more than knowing what\'s in the case. Take the terms.',
          tag: 'risky',
          action: function() { if (typeof gainXp === 'function') gainXp(20, 'choice'); beat2Accept(); }
        },
        {
          id: 'shadowhands_beat2_negotiate',
          plot: 'main',
          text: 'The case goes to Ironhold either way. The question is whether the dossier arrives first.',
          tag: 'bold',
          action: function() { if (typeof gainXp === 'function') gainXp(20, 'choice'); beat2Negotiate(); }
        },
        {
          id: 'shadowhands_beat2_inspect',
          plot: 'main',
          text: 'Every courier who doesn\'t know what they\'re carrying gets used twice — once by the sender, once by whoever intercepts.',
          tag: 'safe',
          action: function() { if (typeof gainXp === 'function') gainXp(20, 'choice'); beat2Inspect(); }
        }
      ]);
    }, 400);
  }

  function beat2Accept() {
    var r = rollD20('survival');
    if (r.success) {
      G.lastResult = 'The case reaches the Ironhold transit post through two handoffs Vessin arranged in advance. You carry it the last leg — a standard document satchel, unremarkable at the gate. The receiving clerk gives you a folded strip of paper without a word: a delivery confirmation code. That evening, a second note appears under your door. The dossier is inside — twelve pages, tight columns, authorization stamps in the margins beside each name. The sequence runs from Andras Vell up through two intermediaries to a council-level registry authority. The chain is complete.';
      G.flags.shadowhands_document_delivered = true;
      G.flags.shadowhands_dossier_received = true;
      G.flags.shadowhands_authorization_chain = true;
      G.investigationProgress = Math.max(G.investigationProgress || 0, (G.investigationProgress || 0) + 1);
      G.recentOutcomeType = 'success';
    } else {
      G.lastResult = 'The transit gate at Ironhold is running a supplemental inspection — bags opened, manifests checked against contents. You pass through without the case being pulled, but the delay means missing the handoff window. Vessin\'s courier is gone. The case goes with you back to Shelkopolis. The dossier has not arrived. Vessin will need to reset the route.';
      G.worldClocks = G.worldClocks || {};
      G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
      G.flags.shadowhands_document_delayed = true;
      G.recentOutcomeType = 'complication';
    }
    addJournal(G.lastResult, 'evidence');
    if (typeof updateHUD === 'function') updateHUD();
    G.flags.shadowhands_beat2_done = true;
    if (typeof checkStageAdvance === 'function') checkStageAdvance();
  }

  function beat2Negotiate() {
    var r = rollD20('charm');
    if (r.success) {
      G.lastResult = 'Vessin\'s expression does not change. They are quiet for a moment. "Half the dossier now," they say. "The remainder when we have confirmation the case arrived." They slide four pages across the table — the lower half of the authorization chain, names and stamps you have not seen before. It is not everything, but it is enough to confirm the dossier is real. You take the case. You have leverage now that is proportional to theirs.';
      G.flags.shadowhands_dossier_partial = true;
      G.flags.shadowhands_document_accepted = true;
      G.flags.shadowhands_authorization_chain = true;
      G.investigationProgress = Math.max(G.investigationProgress || 0, (G.investigationProgress || 0) + 1);
      G.recentOutcomeType = 'success';
    } else {
      G.lastResult = 'Vessin considers this for a moment, then says: "The terms are the terms." They do not argue. They wait. The dossier stays sealed. The case stays on the table. Both sit there until you decide what to do with the original offer.';
      G.recentOutcomeType = 'neutral';
      // Re-present original choices via recursion guard
      G.flags.shadowhands_negotiation_failed = true;
      G.flags.shadowhands_beat2_done = true;
    }
    addJournal(G.lastResult, 'evidence');
    if (typeof updateHUD === 'function') updateHUD();
    if (typeof checkStageAdvance === 'function') checkStageAdvance();
  }

  function beat2Inspect() {
    var r = rollD20('lore');
    if (r.success) {
      G.lastResult = 'You name what you want before accepting: a look at the seal and the case markings. Vessin watches you without expression. The seal is an institutional mark — Soreheim administrative, not Collegium. The case has a route stamp on the leather: Ironhold transit authority, destination confirmed. Whatever is inside, it originated in the legitimate administrative chain. Vessin says: "The case carries a report on quota discrepancies — from inside the transit post itself. A warden\'s report that was filed and then unfiled. We are moving it back into the record." You take it.';
      G.flags.shadowhands_case_contents_known = true;
      G.flags.shadowhands_document_accepted = true;
      G.flags.shadowhands_dossier_received = true;
      G.flags.shadowhands_authorization_chain = true;
      G.investigationProgress = Math.max(G.investigationProgress || 0, (G.investigationProgress || 0) + 1);
      G.recentOutcomeType = 'success';
    } else {
      G.lastResult = 'The markings are standard transit issue — but standard in a way that could be replicated without institutional access. You cannot confirm the origin from the outside. Vessin says nothing to fill the silence. The case is either what they say it is or it is something placed to see if you will carry it. You leave without it. Vessin does not stop you. The cup stays face-down on the table for another hour before someone clears it.';
      G.flags.shadowhands_case_refused = true;
      G.recentOutcomeType = 'neutral';
      G.flags.shadowhands_beat2_done = true;
      addJournal('Shadowhands document case refused — unable to verify origin', 'complication');
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof checkStageAdvance === 'function') checkStageAdvance();
      return;
    }
    addJournal(G.lastResult, 'evidence');
    if (typeof updateHUD === 'function') updateHUD();
    G.flags.shadowhands_beat2_done = true;
    if (typeof checkStageAdvance === 'function') checkStageAdvance();
  }

  // ── Beat 3: The document's contents — trust or expose ───────────────────

  function beat3ShouldTrigger() {
    return !!(G && G.stage === 'Stage II' &&
      (G.stageProgress[2] || 0) >= 7 &&
      G.flags.shadowhands_beat2_done &&
      !G.flags.shadowhands_arc_complete);
  }

  function beat3() {
    var knowsContents = !!(G.flags.shadowhands_case_contents_known);
    var hasDossier = !!(G.flags.shadowhands_dossier_received || G.flags.shadowhands_dossier_partial);

    G.lastResult = knowsContents
      ? 'The warden\'s report from inside the Ironhold transit post reads like a record of something that was never meant to surface. The quota discrepancies are itemized by route, by date, by carrier name. At the bottom: a line of handwritten annotation in the margin — "Authorized for suppression by registry directive, stamp A.V.44." Andras Vell. The same stamp from the Collegium sub-registry. The two ends of the chain have just touched.' + (hasDossier ? ' The dossier confirms it from the other direction: eight names, three polity authorities, one council-level signature at the top. The complete sequence is in your hands.' : ' The dossier Vessin promised has not arrived. What you carry is one half of a complete picture.')
      : 'Vessin delivers the dossier in a second meeting — a folded packet left in the wall bracket at Kettler\'s Lane. Inside: twelve pages, authorization stamps beside each name, the chain running from a transit-post clerk upward through two administrative intermediaries to a council-level registry authority. The sequence is complete. What you do with it determines whether it becomes record or disappears again into a different kind of filing.';
    G.recentOutcomeType = 'discovery';
    if (typeof updateHUD === 'function') updateHUD();

    setTimeout(function() {
      (window._rawRenderChoices || window.renderChoices)([
        {
          id: 'shadowhands_beat3_trust',
          plot: 'main',
          text: 'The network moved this once already. They can move it again — through channels that don\'t close.',
          tag: 'risky',
          action: function() { if (typeof gainXp === 'function') gainXp(20, 'choice'); beat3Trust(); }
        },
        {
          id: 'shadowhands_beat3_hold',
          plot: 'main',
          text: 'What\'s in your hands now is the only copy that hasn\'t been filed and unfiled by someone with the authority to do both.',
          tag: 'safe',
          action: function() { if (typeof gainXp === 'function') gainXp(20, 'choice'); beat3Hold(); }
        },
        {
          id: 'shadowhands_beat3_expose',
          plot: 'main',
          text: 'A network that operates through wall gaps and turned cups is still a network. It has its own interests.',
          tag: 'bold',
          action: function() { if (typeof gainXp === 'function') gainXp(20, 'choice'); beat3Expose(); }
        }
      ]);
    }, 400);
  }

  function beat3Trust() {
    G.lastResult = 'You leave a chalk mark of your own at the Kettler\'s Lane bracket — a horizontal line, as the instructions specified. Vessin\'s network receives the packet that night. Two days later, three separate copies of the authorization chain appear in different administrative filing queues across Shelkopolis — entered through legitimate channels, under legitimate reference numbers, by people with legitimate access. The network moved it through the system using the system\'s own infrastructure. It cannot be unfiled without generating a record of the unfiling. The chain is now part of the record it was kept out of.';
    G.flags.shadowhands_allied = true;
    G.flags.stage2_faction_contact_made = true;
    G.flags.shadowhands_arc_complete = true;
    G.investigationProgress = Math.max(G.investigationProgress || 0, (G.investigationProgress || 0) + 1);
    G.recentOutcomeType = 'success';
    addJournal('Shadowhands distributed authorization chain through legitimate filing channels — evidence now on record', 'evidence');
    _close();
  }

  function beat3Hold() {
    G.lastResult = 'You keep the documentation. The copies stay with you — in two separate locations, neither one obvious. Whatever the network\'s next move is, it does not include what you are carrying. Vessin sends no further chalk marks. Either they accept the arrangement or they are waiting for a different signal. The authorization chain is real, documented, and currently in exactly one set of hands. That is either the safest place it can be or the most exposed.';
    G.flags.shadowhands_held_evidence = true;
    G.flags.stage2_faction_contact_made = true;
    G.flags.shadowhands_arc_complete = true;
    G.recentOutcomeType = 'discovery';
    addJournal('Authorization chain documentation held — not passed to Shadowhands network', 'evidence');
    _close();
  }

  function beat3Expose() {
    var r = rollD20('lore');
    if (r.success) {
      G.lastResult = 'You bring what you know about the network\'s operation — the chalk marks, the brackets, the taproom protocol — to the Road Warden transit office. Not the authorization chain itself. Not yet. Just the shape of the operation. The warden on duty is Lieutenant Orvaine, who listens without expression and makes one note. She says: "We have been aware of the Shadowhands network\'s presence. Aware does not mean tolerated. What you\'ve given us is useful. What you\'re holding back is more useful. Think carefully about the order of things." She dismisses you. You have complicated the network\'s position without fully burning it. Vessin sends one final chalk mark the next morning: a circle with a line through it. They know.';
      G.flags.shadowhands_refused = true;
      G.flags.roadwarden_shadowhands_intel = true;
      G.flags.stage2_faction_contact_made = true;
      G.flags.shadowhands_arc_complete = true;
      G.recentOutcomeType = 'complication';
      addJournal('Shadowhands operation shape disclosed to Road Wardens — network aware, authorization chain still held', 'complication');
    } else {
      G.lastResult = 'The transit office clerk takes your report and routes it to a supervisor who is not in today. You receive a filing acknowledgment. The network continues its operations without apparent disruption. The chalk mark reappears at the archway two days later — a fresh V, slightly higher than the first one. They have not read the report. They do not yet know what you did with it. The window is still open.';
      G.recentOutcomeType = 'neutral';
      G.flags.shadowhands_arc_complete = true;
    }
    if (typeof updateHUD === 'function') updateHUD();
    if (typeof checkStageAdvance === 'function') checkStageAdvance();
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

window.SHADOWHANDS_FACTION_MODULE = SHADOWHANDS_FACTION_MODULE;
