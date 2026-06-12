'use strict';

var COLLEGIUM_FACTION_MODULE = (function() {

  function shouldTrigger() {
    return !!(G && G.stage === 'Stage II' &&
      (G.stageProgress[2] || 0) >= 3 &&
      !G.flags.collegium_arc_started &&
      !G.flags.collegium_arc_complete);
  }

  function trigger() {
    if (!G || G.flags.collegium_arc_started) return;
    G.flags.collegium_arc_started = true;

    G.lastResult = 'The note is folded to the size of a thumb, slid under your door sometime before the corridor lamp was lit. The paper stock is heavy — institutional, the kind the Collegium prints its filing receipts on. Inside, written in a careful clerk\'s hand: "Archivist Pellun Daves. Collegium Sub-Registry, Room 14. Tomorrow, third bell past noon. Come through the east annex. Tell the door attendant you are returning a reference copy." No signature. No seal. The paper is clean. Whoever wrote it knew the building well enough to know which entrance draws less record.';
    G.recentOutcomeType = 'discovery';
    addJournal('A Collegium archivist has made approach — restricted access offer pending', 'intelligence');
    if (typeof updateHUD === 'function') updateHUD();

    setTimeout(function() {
      (window._rawRenderChoices || window.renderChoices)([
        {
          id: 'collegium_beat1_accept',
          plot: 'main',
          text: 'Formal channels have teeth. This one is offering to open a door.',
          tag: 'safe',
          action: function() { if (typeof gainXp === 'function') gainXp(10, 'choice'); beat1Accept(); }
        },
        {
          id: 'collegium_beat1_cautious',
          plot: 'main',
          text: 'The paper stock alone says this is a managed approach. Worth seeing what they want.',
          tag: 'risky',
          action: function() { if (typeof gainXp === 'function') gainXp(10, 'choice'); beat1Cautious(); }
        },
        {
          id: 'collegium_beat1_refuse',
          plot: 'main',
          text: 'Any archivist who moves through side doors has already decided what the collaboration looks like.',
          tag: 'bold',
          action: function() { if (typeof gainXp === 'function') gainXp(10, 'choice'); beat1Refuse(); }
        }
      ]);
    }, 400);
  }

  function beat1Accept() {
    var r = rollD20('charm');
    if (r.success) {
      G.lastResult = 'Room 14 is smaller than the sub-registry designation suggests — a working space, not a formal one. Pellun Daves rises when you enter. He is spare in his movements, economical in the same way the note was. He explains the arrangement without flourish: the Collegium holds restricted-access records touching your area of inquiry, and he has the standing to authorize a supervised reading session. The word "supervised" carries its weight. He says it once and does not repeat it. You leave with a provisional access pass and a time slot two days hence. The door he opens is real. So is the frame around it.';
      G.flags.collegium_beat1_allied = true;
      G.flags.collegium_access_pass = true;
      G.investigationProgress = Math.max(G.investigationProgress || 0, (G.investigationProgress || 0) + 1);
      G.recentOutcomeType = 'success';
    } else {
      G.lastResult = 'Daves listens to your questions with the patience of someone who has heard them in other forms. He offers less than the note implied — a reading list, not direct access. "The records you are describing touch active administrative inquiries," he says. He squares the pen at the edge of his desk without looking at it. The offer is narrower than it appeared. The door is open, but smaller than the frame suggested.';
      G.flags.collegium_beat1_partial = true;
      G.recentOutcomeType = 'partial';
    }
    addJournal(G.lastResult, 'intelligence');
    if (typeof updateHUD === 'function') updateHUD();
    G.flags.collegium_beat1_done = true;
    if (typeof checkStageAdvance === 'function') checkStageAdvance();
  }

  function beat1Cautious() {
    var r = rollD20('lore');
    if (r.success) {
      G.lastResult = 'You arrive five minutes late — time enough to watch the east annex from across the lane first. Two attendants, no Collegium watchers visible. Daves is at a plain table with two folders already open. He does not comment on the time. He explains the sub-registry\'s jurisdiction: cross-polity administrative transfers, attestation records, evidence classification. He has noticed your name appearing in adjacent filing categories. He is offering to keep it from appearing in others. The phrasing is careful enough that it functions as both an offer and a warning.';
      G.flags.collegium_beat1_allied = true;
      G.flags.collegium_read_intent = true;
      G.recentOutcomeType = 'success';
    } else {
      G.lastResult = 'You arrive and find the room empty. A different clerk tells you Daves was called to a session upstairs and left a reading packet in your name. It contains three documents — publicly available, nothing restricted. The access offer is either delayed or rescinded. The packet is the kind of thing sent when someone wants to show they made an effort.';
      G.recentOutcomeType = 'neutral';
    }
    addJournal(G.lastResult, 'intelligence');
    if (typeof updateHUD === 'function') updateHUD();
    G.flags.collegium_beat1_done = true;
    if (typeof checkStageAdvance === 'function') checkStageAdvance();
  }

  function beat1Refuse() {
    G.lastResult = 'You do not go. The access pass window closes. Two days later, a second note arrives — same paper stock, same hand. It says only: "The reading session slot has been reassigned. If you change your mind, the east annex will know your name." Daves is patient. He has filed things away before and retrieved them later. The offer is not gone. It is simply filed.';
    G.flags.collegium_beat1_refused = true;
    G.recentOutcomeType = 'neutral';
    addJournal('Collegium approach declined — channel remains open', 'intelligence');
    if (typeof updateHUD === 'function') updateHUD();
    G.flags.collegium_beat1_done = true;
    if (typeof checkStageAdvance === 'function') checkStageAdvance();
  }

  // ── Beat 2: The Redacted Record ───────────────────────────────────────────

  function beat2ShouldTrigger() {
    return !!(G && G.stage === 'Stage II' &&
      (G.stageProgress[2] || 0) >= 5 &&
      G.flags.collegium_beat1_done &&
      !G.flags.collegium_beat2_done);
  }

  function beat2() {
    G.lastResult = 'Daves sets a folder on the table between you. The top sheet is a transit attestation from Soreheim — administrative, unremarkable except for a column of figures in the lower right that has been blacked out with a ruled line. Not obscured sloppily. Ruled, measured, deliberate. He points to the line without touching it. "The name beneath that redaction appears in four other records I have access to. All four have been similarly treated. Someone with registry authority made that decision." He slides the folder two inches closer to you. "I cannot show you the name. I can tell you the registry stamp that authorized all five redactions is the same one." He says the stamp number aloud. Once. He does not write it down.';
    G.recentOutcomeType = 'discovery';
    addJournal('Collegium sub-registry: five records share the same redaction authorization stamp — same hand, same registry authority', 'evidence');
    if (typeof updateHUD === 'function') updateHUD();

    setTimeout(function() {
      (window._rawRenderChoices || window.renderChoices)([
        {
          id: 'collegium_beat2_stay',
          plot: 'main',
          text: 'The stamp number is enough. Whatever name is under the line, the path runs through the registry.',
          tag: 'safe',
          action: function() { if (typeof gainXp === 'function') gainXp(10, 'choice'); beat2Stay(); }
        },
        {
          id: 'collegium_beat2_push',
          plot: 'main',
          text: 'The name is already known to him. He brought you here to hear you ask for it.',
          tag: 'bold',
          action: function() { if (typeof gainXp === 'function') gainXp(10, 'choice'); beat2Push(); }
        },
        {
          id: 'collegium_beat2_copy',
          plot: 'main',
          text: 'The folder is open. The stamp is on every page. Daves has stepped out to refill his cup.',
          tag: 'risky',
          action: function() { if (typeof gainXp === 'function') gainXp(10, 'choice'); beat2Copy(); }
        }
      ]);
    }, 400);
  }

  function beat2Stay() {
    var r = rollD20('lore');
    if (r.success) {
      G.lastResult = 'The stamp number leads — through a cross-reference Daves left helpfully unmarked in the open filing cabinet — to a registry clerk named Andras Vell, currently stationed at the Shelkopolis administrative annex. Not the author of the suppression, but the instrument of it. Daves closes the folder when you look up. "That is as far as the records extend in this room," he says. He means it literally. The path continues elsewhere. He has shown you where to walk.';
      G.flags.collegium_vell_identified = true;
      G.investigationProgress = Math.max(G.investigationProgress || 0, (G.investigationProgress || 0) + 1);
      G.recentOutcomeType = 'success';
    } else {
      G.lastResult = 'The stamp number is a thread. Without the cross-index, it leads only to a general registry office, not a specific clerk. Daves watches you work through it. He does not offer help. The information is real; the assembly is yours to do.';
      G.recentOutcomeType = 'partial';
    }
    addJournal(G.lastResult, 'evidence');
    if (typeof updateHUD === 'function') updateHUD();
    G.flags.collegium_beat2_done = true;
    if (typeof checkStageAdvance === 'function') checkStageAdvance();
  }

  function beat2Push() {
    var r = rollD20('charm');
    if (r.success) {
      G.lastResult = 'Daves looks at you for a moment longer than his usual economy allows. Then he says: "Andras Vell." He closes the folder. "I have told you a stamp number and a name. What you do with both of those is not something I have any record of." He rises, straightens the folder, sets it in the cabinet in the exact position it came from. "Third bell tomorrow. This room will be occupied." The meeting is over. He has given you everything he brought you here to give.';
      G.flags.collegium_vell_identified = true;
      G.flags.collegium_daves_direct = true;
      G.investigationProgress = Math.max(G.investigationProgress || 0, (G.investigationProgress || 0) + 1);
      G.recentOutcomeType = 'success';
    } else {
      G.lastResult = 'Daves closes the folder. "The stamp number is what I have to offer," he says. The tone does not change. He is not offended. He simply will not move past the line he drew before you arrived. Whatever else he knows, the meeting ends at that boundary.';
      G.recentOutcomeType = 'neutral';
    }
    addJournal(G.lastResult, 'evidence');
    if (typeof updateHUD === 'function') updateHUD();
    G.flags.collegium_beat2_done = true;
    if (typeof checkStageAdvance === 'function') checkStageAdvance();
  }

  function beat2Copy() {
    var r = rollD20('stealth');
    if (r.success) {
      G.lastResult = 'Four pages, transferred to your coat in under a minute. The stamp appears on all of them. The name beneath the redaction does not — but on the third page, in a margin notation Daves did not point out, a clerk\'s handwriting has written "A.V. confirmed" in pencil. Faint. Not meant to be found. Daves returns with his cup. He does not look at the folder. You leave with more than he intended to give.';
      G.flags.collegium_vell_identified = true;
      G.flags.collegium_records_taken = true;
      G.investigationProgress = Math.max(G.investigationProgress || 0, (G.investigationProgress || 0) + 1);
      G.recentOutcomeType = 'success';
    } else {
      G.lastResult = 'You manage one page before Daves returns sooner than expected. He sees your coat. He says nothing. He takes the folder, closes it, sets it in the cabinet. "I think this session has concluded," he says, in exactly the register he would use for a scheduling conflict. He will not report it. But the channel is narrower now.';
      G.worldClocks = G.worldClocks || {};
      G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
      G.flags.collegium_channel_damaged = true;
      G.recentOutcomeType = 'complication';
    }
    addJournal(G.lastResult, 'evidence');
    if (typeof updateHUD === 'function') updateHUD();
    G.flags.collegium_beat2_done = true;
    if (typeof checkStageAdvance === 'function') checkStageAdvance();
  }

  // ── Beat 3: The Alignment Decision ───────────────────────────────────────

  function beat3ShouldTrigger() {
    return !!(G && G.stage === 'Stage II' &&
      (G.stageProgress[2] || 0) >= 8 &&
      G.flags.collegium_beat2_done &&
      !G.flags.collegium_arc_complete);
  }

  function beat3() {
    var channelDamaged = !!(G.flags.collegium_channel_damaged);
    G.lastResult = channelDamaged
      ? 'Daves sends word through a third party — a junior clerk who hands you a sealed card and walks away without waiting for a response. Inside: a time, a location outside the Collegium building, and a single line: "Before this goes further, I need to understand what you intend to do with it." He has not closed the channel. He is deciding whether to.'
      : 'Daves meets you at the east annex a final time. He has a folder he does not open. He says the Collegium\'s position is this: the records exist, the pattern is documented, and there is a sanctioned inquiry process that can receive what you have found. The process is slow. The process is formal. The process does not guarantee exposure — only review. "The alternative," he says, "is that you take what you have into open circulation. The Collegium cannot protect that outcome." He sets the folder on the table. He does not open it.';
    G.recentOutcomeType = 'discovery';
    if (typeof updateHUD === 'function') updateHUD();

    setTimeout(function() {
      (window._rawRenderChoices || window.renderChoices)([
        {
          id: 'collegium_beat3_ally',
          plot: 'main',
          text: 'The sanctioned inquiry keeps it contained — but contained means it moves, not disappears.',
          tag: 'safe',
          action: function() { if (typeof gainXp === 'function') gainXp(10, 'choice'); beat3Ally(); }
        },
        {
          id: 'collegium_beat3_refuse',
          plot: 'main',
          text: 'A process that cannot guarantee exposure is a process designed to survive without one.',
          tag: 'bold',
          action: function() { if (typeof gainXp === 'function') gainXp(10, 'choice'); beat3Refuse(); }
        }
      ]);
    }, 400);
  }

  function beat3Ally() {
    G.lastResult = 'You take the formal channel. Daves opens the folder — a filing form, a reference number already assigned. The Collegium sub-registry will receive your documentation under a sealed administrative inquiry. Daves stamps it himself, in front of you, with the same registry authority he pointed to when this started. "You will not see the outcome directly," he says. "But it will be on record. Formally. Permanently." He hands you a copy of the filing receipt. The paper stock is the same as the first note he sent. He chose it deliberately.';
    G.flags.collegium_allied = true;
    G.flags.stage2_faction_contact_made = true;
    G.flags.collegium_arc_complete = true;
    G.investigationProgress = Math.max(G.investigationProgress || 0, (G.investigationProgress || 0) + 1);
    G.recentOutcomeType = 'success';
    addJournal('Collegium sub-registry formal inquiry filed — Pellun Daves, registry authority confirmed', 'evidence');
    _close();
  }

  function beat3Refuse() {
    G.lastResult = 'You tell him the sanctioned process is not the right container for this. Daves is quiet for a moment. He closes the folder. He does not argue. "Then I cannot offer further access," he says, without reproach. He stands. "What you carry now is yours. I would suggest care about how it moves." He walks you to the annex door himself. The channel is closed. What you have is real, unfiltered, and entirely outside the structure that might have protected it — or buried it.';
    G.flags.collegium_refused = true;
    G.flags.stage2_faction_contact_made = true;
    G.flags.collegium_arc_complete = true;
    G.recentOutcomeType = 'discovery';
    addJournal('Collegium formal channel refused — evidence in hand, no institutional cover', 'intelligence');
    _close();
  }

  function _close() {
    if (typeof updateHUD === 'function') updateHUD();
    if (typeof checkStageAdvance === 'function') checkStageAdvance();
  }

  // Public interface — shouldTrigger routes through all 3 beats
  function publicShouldTrigger() {
    if (beat3ShouldTrigger()) return true;
    if (beat2ShouldTrigger()) return true;
    return shouldTrigger();
  }

  function publicTrigger() {
    if (beat3ShouldTrigger()) { beat3(); return; }
    if (beat2ShouldTrigger()) { beat2(); return; }
    trigger();
  }

  return { shouldTrigger: publicShouldTrigger, trigger: publicTrigger };

})();

window.COLLEGIUM_FACTION_MODULE = COLLEGIUM_FACTION_MODULE;
