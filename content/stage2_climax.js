var STAGE2_CLIMAX = (function() {

  function _roll(skill, dc) {
    var result = rollD20(skill);
    return { success: result.total >= dc, isCrit: result.isCrit, isFumble: result.isFumble, total: result.total };
  }

  // Phase 1 — The Summons
  function phase1() {
    
    G.lastResult = 'A sealed letter bearing the Oversight Collegium\'s iron-quill seal arrives at your lodgings before dawn. Someone slid it under the door. Inside, a single line: "Your inquiries have been noted. Present yourself at the Collegium Hall by sundown. Refusal will be noted as well." The wax seal is still warm.';
    G.recentOutcomeType = 'investigation';

    (window._rawRenderChoices || window.renderChoices)([
      {
        id: 'climax_p1_negotiate',
        text: 'You present yourself openly \u2014 negotiate your position directly.',
        action: function() { phase1_negotiate(); }
      },
      {
        id: 'climax_p1_deflect',
        text: 'You go, but give them nothing \u2014 a clerk following cold files, nothing more.',
        action: function() { phase1_deflect(); }
      },
      {
        id: 'climax_p1_refuse',
        text: 'You refuse \u2014 send a counter-message asserting your independence.',
        action: function() { phase1_refuse(); }
      }
    ]);
  }

  function phase1_negotiate() {
    
    var r = _roll('persuasion', 14);
    if (r.success) {
      var orvethOpener = (G.renown || 0) >= 10
        ? 'Inquisitor Orveth does not look up when you enter. She finishes reading a document, sets it squarely at the corner of her desk. "I had heard your name before you were shown in. That is unusual for someone at your stage of things." She gives you her full attention.'
        : 'Inquisitor Orveth does not look up when you enter. She finishes reading a document, sets it squarely at the corner of her desk, then gives you her full attention.';
      G.lastResult = orvethOpener + ' She listens without speaking. When you finish, she says: "You have been thorough. Perhaps too thorough. We will be watching." She rises to indicate the meeting is over. You are not detained. The door closes behind you with the quiet click of something not quite resolved.';
      G.flags.stage2_climax_negotiated = true;
      if (r.isCrit) { G.lastResult += ' At the door, she stops you: "If you find what I think you will find — bring it to me first. Before anyone else." She does not wait for an answer.'; G.flags.stage2_climax_inquisitor_contact = true; }
      G.recentOutcomeType = 'success';
    } else {
      G.lastResult = 'Orveth listens. She does not take notes. When you finish, she opens a different folder on her desk — one she was already reading before you arrived. "You have been pursuing matters that touch the Collegium\'s own work. For now, consider yourself a person of interest — not a suspect. Do not leave Shelkopolis." She returns to her reading. You are dismissed, but not free.';
      G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 2;
      G.flags.stage2_climax_person_of_interest = true;
      G.recentOutcomeType = 'complication';
    }
    addJournal(G.lastResult, 'intelligence');
    phase2();
  }

  function phase1_deflect() {
    
    var r = _roll('stealth', 13);
    if (r.success) {
      G.lastResult = 'Your performance is convincing — a records clerk with too much time, following a dusty administrative thread that leads nowhere. The Collegium\'s clerk makes a note, issues a form warning about interference in active inquiries, and sends you back to the street. The form is in triplicate. They have already moved on. For now.';
      G.recentOutcomeType = 'success';
    } else {
      G.lastResult = 'The Collegium\'s reader — a quiet man with ink-stained fingers — simply slides a folder across the table. It contains your movements for the past three weeks. "Routine." He says the word with precision. "We have different definitions of routine." Your cover is thin.';
      G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
      G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
      G.recentOutcomeType = 'complication';
    }
    addJournal(G.lastResult, 'intelligence');
    phase2();
  }

  function phase1_refuse() {
    
    G.lastResult = 'Your counter-message is precise and pointed. Two days pass. Then: not a reply, but a visit. Two Collegium wardens appear at your door — not to detain you, but to deliver a second letter. "The Inquisitor found your response... characterful. She has extended the invitation. Once." You have asserted yourself, but the Collegium is not finished.';
    G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
    G.flags.stage2_climax_refused_summons = true;
    G.recentOutcomeType = 'partial';
    addJournal(G.lastResult, 'intelligence');
    phase2();
  }

  // Phase 2 — The Revelation
  function phase2() {
    
    G.lastResult = 'The archivist who has been feeding you fragments in silence finds you that night. His name is Seld — junior Collegium staff, access to the deep filing rooms. He is not calm. "They know I\'ve been talking. Whatever I haven\'t told you yet, I\'m telling you now." What he says changes the shape of what you\'ve been looking at. The records are not a log of crimes. They are a record of suppressed names — people the Collegium removed from official history. Someone inside has been protecting those names. Someone else has been selling them.';
    G.recentOutcomeType = 'discovery';
    G.investigationProgress = Math.max(G.investigationProgress || 0, 10);
    G.flags.stage2_revelation_received = true;
    addJournal(G.lastResult, 'evidence');
    if (typeof updateHUD === 'function') updateHUD();
    setTimeout(phase3, 400);
  }

  // Phase 3 — The Resolution
  function phase3() {
    
    G.lastResult += '\n\nSeld presses a folded document into your hands — a partial copy of the records. His hands are unsteady. "What you do with this determines everything," he says. He does not wait to see what you decide.';

    (window._rawRenderChoices || window.renderChoices)([
      {
        id: 'climax_p3_expose',
        text: 'You expose it \u2014 bring the record to public hands. Let the city decide.',
        action: function() { phase3_expose(); }
      },
      {
        id: 'climax_p3_align',
        text: 'You align with Orveth \u2014 bring her the record and work from within.',
        action: function() { phase3_align(); }
      },
      {
        id: 'climax_p3_withdraw',
        text: 'You withdraw \u2014 hide the record and buy time to understand what you hold.',
        action: function() { phase3_withdraw(); }
      }
    ]);
  }

  function phase3_expose() {
    
    var r = _roll('lore', 15);
    G.flags.stage2_climax_resolution = 'expose';
    if (r.success) {
      G.lastResult = 'The partial document reaches three independent sources before dawn. By midmorning it is being read aloud in the Merchant Assembly — names that have not been spoken in official record for years, in some cases decades. The Collegium moves to suppress it, but suppression requires consensus, and the Assembly is already arguing. You have released something. What it burns is no longer yours to direct.';
      G.recentOutcomeType = 'success';
      window.addWorldNotice('The suppressed records have been exposed. Shelkopolis will not be the same.');
    } else {
      G.lastResult = 'Your contact chain is intercepted before the document reaches more than one source. The partial copy is confiscated at the first handoff — someone was watching that courier. You are not arrested. Inquisitor Orveth sends a message, no seal, no signature: "You tried. I respect that. Come find me when you are ready to try more carefully." The records\' existence is now known by more people than you intended. Their contents are still contained. For now.';
      G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 2;
      G.recentOutcomeType = 'complication';
    }
    _closeClimax();
  }

  function phase3_align() {
    
    G.flags.stage2_climax_resolution = 'align';
    G.lastResult = 'Orveth receives the document without comment. She reads it standing, at her window, with the street noise below and her back to the room. After a long moment she turns: "The names in this record are under Collegium protection. What remains of it." She sets the document face-down on the desk. "Someone inside has been selling that protection. That is where your next thread leads." She is not your ally. She has her own reasons, and they are not yours. But they point the same direction. That is enough.';
    G.recentOutcomeType = 'success';
    G.flags.stage2_climax_inquisitor_contact = true;
    window.addWorldNotice('An uneasy alignment with the Oversight Collegium. Watch your back.');
    _closeClimax();
  }

  function phase3_withdraw() {
    
    G.flags.stage2_climax_resolution = 'withdraw';
    G.lastResult = 'The document goes into a hidden cache — a location only you know, in a city full of people who keep track of locations. Seld disappears the following day. You do not know if this is his choice or not. The Collegium\'s watchers have not moved against you. The other party following the same trail has gone quiet. Shelkopolis continues without a ripple. You have the records. You have time. These are not the same thing as safety.';
    G.recentOutcomeType = 'partial';
    G.worldClocks.rival = Math.max(0, (G.worldClocks.rival || 0) - 2);
    window.addWorldNotice('The ledger is hidden. The silence will not last.');
    _closeClimax();
  }

  function _closeClimax() {
    
    G.flags.stage2_climax_complete = true;
    G.flags.maren_oss_resolved = true;
    addJournal(G.lastResult, 'evidence');
    if (typeof updateHUD === 'function') updateHUD();
    if (typeof checkStageAdvance === 'function') checkStageAdvance();
  }

  // Public trigger — called from checkStageAdvance when conditions are met
  function trigger() {
    
    if (!G || G.flags.stage2_climax_complete || G.flags.stage2_climax_started) return;
    G.flags.stage2_climax_started = true;
    phase1();
  }

  return { trigger: trigger };

})();

window.STAGE2_CLIMAX = STAGE2_CLIMAX;
