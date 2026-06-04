'use strict';

var ROADWARDEN_FACTION_MODULE = (function() {

  // ── Beat 1: Orvaine stops the player at transit ───────────────────────────

  function beat1ShouldTrigger() {
    return !!(G && G.stage === 'Stage II' &&
      (G.stageProgress[2] || 0) >= 4 &&
      !G.flags.roadwarden_arc_started &&
      !G.flags.roadwarden_arc_complete);
  }

  function beat1() {
    if (!G || G.flags.roadwarden_arc_started) return;
    G.flags.roadwarden_arc_started = true;

    G.lastResult = 'The warden at the Soreheim transit gate steps out of the attendant\'s booth and raises a hand — not the gesture of a stop-and-identify, but the flat-palmed wave of someone who has been waiting for a specific person. She wears a Road Warden lieutenant\'s shoulder mark, iron-grey with a transit-post qualifier beneath it. She does not consult any list. She says your name correctly. "I am not detaining you," she says. "I would like five minutes. There is a covered area on the east side of the gate where the wind does not cut." She does not wait to see if you follow. She walks toward it. Her hands stay visible throughout.';
    G.recentOutcomeType = 'discovery';
    addJournal('Road Warden Lieutenant Orvaine made approach at Soreheim transit gate — not an arrest, a conversation', 'intelligence');
    if (typeof updateHUD === 'function') updateHUD();

    setTimeout(function() {
      (window._rawRenderChoices || window.renderChoices)([
        {
          id: 'roadwarden_beat1_follow',
          text: 'A warden waiting at the gate without sending a summons. Wants quiet.',
          tag: 'safe',
          action: function() { beat1Follow(); }
        },
        {
          id: 'roadwarden_beat1_cautious',
          text: 'She knew my name and the timing. This was already arranged.',
          tag: 'risky',
          action: function() { beat1Cautious(); }
        },
        {
          id: 'roadwarden_beat1_decline',
          text: 'Independent jurisdiction means independent agenda. The five minutes she wants are not free.',
          tag: 'bold',
          action: function() { beat1Decline(); }
        }
      ]);
    }, 400);
  }

  function beat1Follow() {
    var r = rollD20('charm');
    if (r.success) {
      G.lastResult = 'She speaks without preliminaries. Her name is Lieutenant Hareth Orvaine, Road Warden Transit Division, operating under the polity-neutral charter. She has been tracking the Soreheim route\'s output anomalies for four months — from the transit side, not the administrative one. She has waybill discrepancies, gate-log inconsistencies, and two carrier testimonies she cannot use because the carriers have since been reassigned to routes outside her jurisdiction. "You are working the same case from a different angle," she says. "I know this because your name has appeared in three separate access logs in the last two weeks." She does not ask what you\'ve found. She says: "Tell me what you know that I don\'t, and I\'ll show you the gate logs."';
      G.flags.roadwarden_orvaine_met = true;
      G.flags.roadwarden_approach_accepted = true;
      G.investigationProgress = Math.max(G.investigationProgress || 0, (G.investigationProgress || 0) + 1);
      G.recentOutcomeType = 'success';
    } else {
      G.lastResult = 'She speaks in careful, measured terms — what she has, what she can share, what she cannot. She is thorough and slightly formal in a way that suggests she is accustomed to her authority being tested. You follow the conversation without giving much back. She notices this. "I am not asking you to trust me," she says. "I am asking you to consider whether not talking to me is useful." She hands you a transit post reference card with a number on the back. "When you decide." She returns to the gate booth.';
      G.flags.roadwarden_orvaine_met = true;
      G.flags.roadwarden_approach_guarded = true;
      G.recentOutcomeType = 'neutral';
    }
    addJournal(G.lastResult, 'intelligence');
    if (typeof updateHUD === 'function') updateHUD();
    G.flags.roadwarden_beat1_done = true;
    if (typeof checkStageAdvance === 'function') checkStageAdvance();
  }

  function beat1Cautious() {
    var r = rollD20('lore');
    if (r.success) {
      G.lastResult = 'You follow but say nothing for the first two minutes — time enough to establish that she is not wearing a recorder\'s mark and that the covered area has no other occupants. She reads your read of the space and says: "The Transit Division runs its own logs. Independent of polity council access. What I have, I own — they cannot pull it without a cross-polity warrant." She shows you a gate log notation on a folded sheet — a date, a carrier ID, a load weight that exceeds the manifest total by eleven percent. The notation is hers. The original is filed in a box no polity council clerk has jurisdiction to request. "I have thirty-seven of those," she says.';
      G.flags.roadwarden_orvaine_met = true;
      G.flags.roadwarden_orvaine_logs = true;
      G.flags.roadwarden_approach_accepted = true;
      G.investigationProgress = Math.max(G.investigationProgress || 0, (G.investigationProgress || 0) + 1);
      G.recentOutcomeType = 'success';
    } else {
      G.lastResult = 'You follow. She talks. You listen without confirming anything she says. She registers this and continues anyway — she has enough patience for a conversation that only runs one direction. At the end, she hands you a transit card. "The number on the back reaches the gate post directly. I would prefer to do this formally, but I can do it informally." She returns to her booth. You have not committed to anything. Neither has she.';
      G.flags.roadwarden_orvaine_met = true;
      G.flags.roadwarden_approach_guarded = true;
      G.recentOutcomeType = 'neutral';
    }
    addJournal(G.lastResult, 'intelligence');
    if (typeof updateHUD === 'function') updateHUD();
    G.flags.roadwarden_beat1_done = true;
    if (typeof checkStageAdvance === 'function') checkStageAdvance();
  }

  function beat1Decline() {
    G.lastResult = 'You stop at the edge of the gate booth and tell her you have no comment on any matters relating to administrative records. She nods once. "That is your prerogative." She steps back toward the booth. A transit card appears on the ledge beside the gate pillar — left there, not handed over. "In case the situation changes," she says, facing away. The gate log does not show you stopped. She arranged that before you arrived.';
    G.flags.roadwarden_orvaine_met = true;
    G.flags.roadwarden_approach_declined = true;
    G.recentOutcomeType = 'neutral';
    addJournal('Road Warden approach declined at Soreheim gate — Orvaine left contact method, no record of stop', 'intelligence');
    if (typeof updateHUD === 'function') updateHUD();
    G.flags.roadwarden_beat1_done = true;
    if (typeof checkStageAdvance === 'function') checkStageAdvance();
  }

  // ── Beat 2: Orvaine's documentation — testimony exchange ─────────────────

  function beat2ShouldTrigger() {
    return !!(G && G.stage === 'Stage II' &&
      (G.stageProgress[2] || 0) >= 6 &&
      G.flags.roadwarden_beat1_done &&
      !G.flags.roadwarden_beat2_done);
  }

  function beat2() {
    var hasLogs = !!(G.flags.roadwarden_orvaine_logs);
    G.lastResult = hasLogs
      ? 'Orvaine meets you at the transit post\'s secondary office — a room with two chairs and a table narrow enough that papers on one side are readable from the other. She spreads the gate logs across the table: thirty-seven notations, each with a manifest discrepancy highlighted in a different color of ink. "I have been using a different color for each carrier route," she says. "The pattern across colors is what matters." The pattern is legible within two minutes. Seven of the discrepancies share the same authorized-stamp sequence — Andras Vell\'s registry mark, applied at different dates, always to loads above a certain weight threshold. "I cannot act on this without testimony linking the stamp to the suppression authorization," she says. "I need someone who was in the room when the filing decision was made."'
      : 'Orvaine reaches you through the transit card number — a message routed through the gate post clerk that says only "the documentation is ready for your review." The secondary office at the Soreheim transit post. She has thirty-seven gate-log notations laid out on the table when you arrive, each one a manifest discrepancy with a weight and a stamp. The pattern across them is clear once you know what to look for. "I need testimony," she says, without decorating it. "Someone who was in the administrative chain. Not a document — a person. Without that, the discrepancies are anomalies, not evidence."';
    G.recentOutcomeType = 'discovery';
    addJournal('Orvaine\'s thirty-seven gate-log notations — manifest discrepancies share Vell registry stamp sequence', 'evidence');
    if (typeof updateHUD === 'function') updateHUD();

    setTimeout(function() {
      (window._rawRenderChoices || window.renderChoices)([
        {
          id: 'roadwarden_beat2_testify',
          text: 'What you saw in the sub-registry is testimony. The Collegium cannot reach Warden jurisdiction.',
          tag: 'safe',
          action: function() { beat2Testify(); }
        },
        {
          id: 'roadwarden_beat2_conditions',
          text: 'Testimony is leverage. The immunity she\'s offering needs to be in writing before it means anything.',
          tag: 'risky',
          action: function() { beat2Conditions(); }
        },
        {
          id: 'roadwarden_beat2_withhold',
          text: 'Giving testimony closes options. The same information is worth more held than given.',
          tag: 'bold',
          action: function() { beat2Withhold(); }
        }
      ]);
    }, 400);
  }

  function beat2Testify() {
    var r = rollD20('charm');
    if (r.success) {
      G.lastResult = 'You give a full account — the sub-registry session, the redacted column, the stamp number, Andras Vell\'s name. Orvaine transcribes it in the Road Warden formal testimony format, reads it back, asks two clarifying questions, and writes the date at the bottom. She countersigns it. "This goes into the Transit Division record under charter protection," she says. "The Collegium cannot access it without a polity council warrant, which requires two polity councils to agree. That has not happened in eleven years." She slides a formal immunity notice across the table. "For anything arising from your administrative access in the last sixty days." It has a warden seal on it. She signs it without being asked.';
      G.flags.roadwarden_testimony_given = true;
      G.flags.roadwarden_immunity_granted = true;
      G.flags.roadwarden_truce = true;
      // Heat reduction in transit polities
      if (typeof addHeat === 'function') {
        addHeat('shelk', -1);
        addHeat('soreheim', -1);
      }
      G.investigationProgress = Math.max(G.investigationProgress || 0, (G.investigationProgress || 0) + 1);
      G.recentOutcomeType = 'success';
    } else {
      G.lastResult = 'You give what you have. Orvaine transcribes carefully, but when you describe the sub-registry session, she pauses. "You accessed those records through a direct invitation from a sub-archivist," she says. "That is not the same as authorized access under charter." She can use the substance. She cannot use the circumstances without creating a complication for the person who let you in. She offers a partial immunity notice. "Narrower than I\'d like," she says. "But real."';
      G.flags.roadwarden_testimony_partial = true;
      G.flags.roadwarden_immunity_partial = true;
      G.flags.roadwarden_truce = true;
      if (typeof addHeat === 'function') {
        addHeat('soreheim', -1);
      }
      G.recentOutcomeType = 'partial';
    }
    addJournal(G.lastResult, 'evidence');
    if (typeof updateHUD === 'function') updateHUD();
    G.flags.roadwarden_beat2_done = true;
    if (typeof checkStageAdvance === 'function') checkStageAdvance();
  }

  function beat2Conditions() {
    var r = rollD20('lore');
    if (r.success) {
      G.lastResult = 'Orvaine considers this without visible reaction. She opens a different drawer and removes a pre-printed immunity notice form — the Road Warden charter version, not a handwritten one. "Sign here," she says, pointing to the witness line. Then she countersigns the immunity clause before you give a word of testimony. "The immunity is real whether or not you tell me anything useful," she says. "I would rather have your testimony than not. But the protection is not conditional on it." You give the testimony. She receives it carefully. The form goes into the transit charter archive.';
      G.flags.roadwarden_testimony_given = true;
      G.flags.roadwarden_immunity_granted = true;
      G.flags.roadwarden_truce = true;
      if (typeof addHeat === 'function') {
        addHeat('shelk', -1);
        addHeat('soreheim', -1);
      }
      G.investigationProgress = Math.max(G.investigationProgress || 0, (G.investigationProgress || 0) + 1);
      G.recentOutcomeType = 'success';
    } else {
      G.lastResult = 'Orvaine says the immunity notice cannot be issued in advance of the testimony — charter procedure. "I can give you my word," she says, "or you can trust the procedure." Her word or the procedure. Neither is what you asked for. The testimony would have to come first. She waits.';
      G.flags.roadwarden_conditions_unmet = true;
      G.recentOutcomeType = 'neutral';
    }
    addJournal(G.lastResult, 'intelligence');
    if (typeof updateHUD === 'function') updateHUD();
    G.flags.roadwarden_beat2_done = true;
    if (typeof checkStageAdvance === 'function') checkStageAdvance();
  }

  function beat2Withhold() {
    G.lastResult = 'You tell her what you do not have — which is true as far as it goes — and that you are not in a position to give testimony at this stage of your inquiry. Orvaine closes her folder. "Then we have both wasted an afternoon," she says, without heat. "The offer stands. The documentation I have becomes significantly less useful to you after the Transit Division files its own report — which happens at end of quarter, regardless of what we discuss." She gives you the date. It is forty-one days away. The clock is real and she knows it and she knows you know it.';
    G.flags.roadwarden_testimony_withheld = true;
    G.recentOutcomeType = 'neutral';
    addJournal('Road Warden testimony withheld — Orvaine\'s independent filing deadline: 41 days', 'intelligence');
    if (typeof updateHUD === 'function') updateHUD();
    G.flags.roadwarden_beat2_done = true;
    if (typeof checkStageAdvance === 'function') checkStageAdvance();
  }

  // ── Beat 3: Agree or refuse — heat consequences ───────────────────────────

  function beat3ShouldTrigger() {
    return !!(G && G.stage === 'Stage II' &&
      (G.stageProgress[2] || 0) >= 8 &&
      G.flags.roadwarden_beat2_done &&
      !G.flags.roadwarden_arc_complete);
  }

  function beat3() {
    var hasImmunity = !!(G.flags.roadwarden_immunity_granted || G.flags.roadwarden_immunity_partial);
    var hasTruce = !!(G.flags.roadwarden_truce);
    var withheld = !!(G.flags.roadwarden_testimony_withheld || G.flags.roadwarden_conditions_unmet);

    G.lastResult = withheld
      ? 'Orvaine sends a message through the gate post — a date, a time, the secondary office. She does not explain the reason. The date is ten days before her filing deadline. Whatever she has to say, this is the last meeting she is scheduling. She is there when you arrive, the thirty-seven gate logs organized in a different order than before. "I am going to file my report," she says. "What is in it depends, in part, on whether you choose to be a named source or a background reference. The difference matters for what the report can recommend." She waits for your answer.'
      : 'Orvaine sends a final message: the Transit Division\'s formal inquiry is being opened. Your testimony — or the absence of it — will shape the scope of the inquiry\'s recommendations. "I need you on record," she says when you meet again, "not as a suspect. As a source. There is a difference, and the difference is what I can offer you in return." The immunity notice is already prepared. She slides it across before speaking further.';
    G.recentOutcomeType = 'discovery';
    if (typeof updateHUD === 'function') updateHUD();

    setTimeout(function() {
      (window._rawRenderChoices || window.renderChoices)([
        {
          id: 'roadwarden_beat3_ally',
          text: 'Orvaine\'s report is going into the charter record either way. Being in it correctly is better than being in it wrong.',
          tag: 'safe',
          action: function() { beat3Ally(); }
        },
        {
          id: 'roadwarden_beat3_refuse',
          text: 'A Road Warden report shapes what gets heard — and what gets buried — by the authority that receives it.',
          tag: 'bold',
          action: function() { beat3Refuse(); }
        }
      ]);
    }, 400);
  }

  function beat3Ally() {
    G.lastResult = 'You give full testimony. Orvaine takes it formally, reads it back, corrects a date you mis-stated without comment, and files it into the Transit Division charter archive in front of you. She hands you the immunity notice with both signatures. "The formal inquiry opens in three days," she says. "You will not be called to speak publicly. Your testimony is on record. The inquiry will proceed with or without additional cooperation from the polity councils involved — that is the charter\'s design." She stands. "You made this easier. That matters, even if it doesn\'t feel like it yet."';
    G.flags.roadwarden_allied = true;
    G.flags.roadwarden_truce = true;
    G.flags.stage2_faction_contact_made = true;
    G.flags.roadwarden_arc_complete = true;
    if (typeof addHeat === 'function') {
      addHeat('shelk', -1);
      addHeat('soreheim', -2);
      addHeat('roaz', -1);
    }
    G.investigationProgress = Math.max(G.investigationProgress || 0, (G.investigationProgress || 0) + 1);
    G.recentOutcomeType = 'success';
    addJournal('Road Warden formal inquiry opened — testimony filed under charter protection, heat reduced in transit polities', 'evidence');
    _close();
  }

  function beat3Refuse() {
    G.lastResult = 'You decline to be named. Orvaine makes a note. "Background reference," she says, and writes something. Her report will reflect the shape of the anomalies without your name attached to how the shape became visible. The inquiry will still open. Without your testimony, it will operate on the gate logs alone — slower, narrower, and easier to manage from inside the administrative structure it is examining. She closes her folder. "That is your choice to make." The meeting ends without ceremony. On the way out, you pass a clerk entering a heat-notification form into the transit registry. Your name is on it.';
    G.flags.roadwarden_refused = true;
    G.flags.stage2_faction_contact_made = true;
    G.flags.roadwarden_arc_complete = true;
    if (typeof addHeat === 'function') {
      addHeat('soreheim', 1);
      addHeat('shelk', 1);
    }
    G.recentOutcomeType = 'complication';
    addJournal('Road Warden inquiry proceeding without testimony — heat increased in transit polities', 'complication');
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

window.ROADWARDEN_FACTION_MODULE = ROADWARDEN_FACTION_MODULE;
