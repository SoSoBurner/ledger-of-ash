var STAGE2_CLIMAX = (function() {

  function _roll(skill, dc) {
    var result = rollD20(skill);
    return { success: result.total >= dc, isCrit: result.isCrit, isFumble: result.isFumble, total: result.total };
  }

  // Phase 1 — The Summons
  function phase1() {
    var G = window.G;
    G.lastResult = 'A sealed letter bearing the Oversight Collegium\'s iron-quill seal arrives at your lodgings. Inside, a single line: "Your inquiries have been noted. Present yourself at the Collegium Hall by sundown. Refusal will be noted as well." The city holds its breath.';
    G.recentOutcomeType = 'investigation';

    renderChoices([
      {
        id: 'climax_p1_negotiate',
        text: 'Present yourself openly — negotiate your position',
        action: function() { phase1_negotiate(); }
      },
      {
        id: 'climax_p1_deflect',
        text: 'Attend but deflect — claim your investigation is routine',
        action: function() { phase1_deflect(); }
      },
      {
        id: 'climax_p1_refuse',
        text: 'Refuse — send a counter-message asserting your independence',
        action: function() { phase1_refuse(); }
      }
    ]);
  }

  function phase1_negotiate() {
    var G = window.G;
    var r = _roll('persuasion', 14);
    if (r.success) {
      G.lastResult = 'The Collegium Inquisitor — a sharp-eyed woman named Orveth — listens without interruption. When you finish, she folds her hands: "You have been thorough. Perhaps too thorough. We will be watching." She dismisses you without detaining you. You have bought time and, perhaps, an unexpected ally.';
      G.flags.stage2_climax_negotiated = true;
      if (r.isCrit) { G.lastResult += ' She adds, almost as an afterthought: "If you find what I think you will find — bring it to me first." A door has opened.'; G.flags.stage2_climax_inquisitor_contact = true; }
      G.recentOutcomeType = 'success';
    } else {
      G.lastResult = 'Orveth listens, then speaks: "You have been investigating matters that touch the Collegium\'s own inquiries. For now, consider yourself a person of interest — not a suspect. Do not leave Shelkopolis." You are released, but marked.';
      G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 2;
      G.flags.stage2_climax_person_of_interest = true;
      G.recentOutcomeType = 'complication';
    }
    addJournal('faction', G.lastResult);
    phase2();
  }

  function phase1_deflect() {
    var G = window.G;
    var r = _roll('stealth', 13);
    if (r.success) {
      G.lastResult = 'Your performance is convincing — a curious investigator following dusty leads, nothing more. The Collegium\'s clerk makes a note and sends you away with a warning about interference in active inquiries. They believe you. For now.';
      G.recentOutcomeType = 'success';
    } else {
      G.lastResult = 'The Collegium\'s reader — a quiet man with ink-stained fingers — simply slides a folder across the table. It contains your movements for the past three weeks. "Routine." He says the word with precision. "We have different definitions of routine." Your cover is thin.';
      G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
      G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
      G.recentOutcomeType = 'complication';
    }
    addJournal('faction', G.lastResult);
    phase2();
  }

  function phase1_refuse() {
    var G = window.G;
    G.lastResult = 'Your counter-message is precise and pointed. Two days pass. Then: not a reply, but a visit. Two Collegium wardens appear at your door — not to detain you, but to deliver a second letter. "The Inquisitor found your response... characterful. She has extended the invitation. Once." You have asserted yourself, but the Collegium is not finished.';
    G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
    G.flags.stage2_climax_refused_summons = true;
    G.recentOutcomeType = 'partial';
    addJournal('faction', G.lastResult);
    phase2();
  }

  // Phase 2 — The Revelation
  function phase2() {
    var G = window.G;
    setTimeout(function() {
      G.lastResult = 'The contact you least expected finds you that night — a junior Collegium archivist named Seld who has been feeding you information in fragments. He is trembling. "They know I\'ve been talking. I need to tell you everything before they find out how much." What he reveals reshapes the investigation: the ledger of ash is not a record of crimes. It is a record of suppressed names — people the Collegium erased from official history. Someone inside the Collegium has been protecting those names. And someone else has been hunting them.';
      G.recentOutcomeType = 'discovery';
      G.investigationProgress = Math.max(G.investigationProgress || 0, 10);
      G.flags.stage2_revelation_received = true;
      addJournal('investigation', G.lastResult);
      if (typeof updateHUD === 'function') updateHUD();
      phase3();
    }, 300);
  }

  // Phase 3 — The Resolution
  function phase3() {
    var G = window.G;
    G.lastResult += '\n\nSeld presses a folded document into your hands — a partial copy of the ledger. "What you do with this determines everything," he says. Three paths remain.';

    renderChoices([
      {
        id: 'climax_p3_expose',
        text: 'Expose — bring the ledger to the public record. Let the city decide.',
        action: function() { phase3_expose(); }
      },
      {
        id: 'climax_p3_align',
        text: 'Align — take the ledger to Inquisitor Orveth. Work from within.',
        action: function() { phase3_align(); }
      },
      {
        id: 'climax_p3_withdraw',
        text: 'Withdraw — hide the ledger. Buy time to understand what you hold.',
        action: function() { phase3_withdraw(); }
      }
    ]);
  }

  function phase3_expose() {
    var G = window.G;
    var r = _roll('lore', 15);
    G.flags.stage2_climax_resolution = 'expose';
    if (r.success) {
      G.lastResult = 'The partial ledger reaches three independent sources before dawn. By midmorning, it is being read aloud in the Merchant Assembly. The Collegium moves to suppress it — but it is too late. The names are out. The city is fractured. You have lit a fire. What it burns will not be yours to choose.';
      G.recentOutcomeType = 'success';
      addWorldNotice('The ledger of ash has been exposed. Shelkopolis will not be the same.');
    } else {
      G.lastResult = 'Your contact chain is intercepted before the ledger reaches more than one source. The partial copy is confiscated. You are not arrested — but Inquisitor Orveth sends a message: "You tried. I respect that. Come find me when you are ready to try more carefully." The ledger\'s existence is now known. Its contents, still secret.';
      G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 2;
      G.recentOutcomeType = 'complication';
    }
    _closeClimax();
  }

  function phase3_align() {
    var G = window.G;
    G.flags.stage2_climax_resolution = 'align';
    G.lastResult = 'Orveth receives the ledger without expression. She reads for a long moment. "You chose correctly," she says. "The names on this list are under Collegium protection — what remains of it. Someone inside has been selling that protection. That someone is your next lead." She is not your ally. But for now, your interests align. That is enough.';
    G.recentOutcomeType = 'success';
    G.flags.stage2_climax_inquisitor_contact = true;
    addWorldNotice('An uneasy alliance with the Oversight Collegium. Watch your back.');
    _closeClimax();
  }

  function phase3_withdraw() {
    var G = window.G;
    G.flags.stage2_climax_resolution = 'withdraw';
    G.lastResult = 'The ledger goes into a hidden cache in a location only you know. Seld disappears the following day — you do not know if this is his choice or not. The Collegium\'s watchers have not moved against you. The rival investigator\'s trail has gone cold. The city breathes, unknowing. You have the ledger. You have time. Use it wisely.';
    G.recentOutcomeType = 'partial';
    G.worldClocks.rival = Math.max(0, (G.worldClocks.rival || 0) - 2);
    addWorldNotice('The ledger is hidden. The silence will not last.');
    _closeClimax();
  }

  function _closeClimax() {
    var G = window.G;
    G.flags.stage2_climax_complete = true;
    addJournal('investigation', G.lastResult);
    if (typeof updateHUD === 'function') updateHUD();
    if (typeof checkStageAdvance === 'function') checkStageAdvance();
  }

  // Public trigger — called from checkStageAdvance when conditions are met
  function trigger() {
    var G = window.G;
    if (!G || G.flags.stage2_climax_complete || G.flags.stage2_climax_started) return;
    G.flags.stage2_climax_started = true;
    phase1();
  }

  return { trigger: trigger };

})();

window.STAGE2_CLIMAX = STAGE2_CLIMAX;
