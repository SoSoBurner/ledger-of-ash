// ═══════════════════════════════════════════════════════
// MAREN OSS — SCRIPTED STAGE II ENCOUNTER
// Guildheart Hub archive, Shelkopolis
// Triggers: Stage II, rival >= 4, encounter not done, climax not started
// ═══════════════════════════════════════════════════════

window.MAREN_ENCOUNTER = (function() {

  function _roll(skill, dc) {
    var result = rollD20(skill);
    return { success: result.total >= dc, isCrit: result.isCrit, isFumble: result.isFumble, total: result.total };
  }

  function shouldTrigger() {
    var G = window.G;
    if (!G) return false;
    return (
      G.stage === 'Stage II' &&
      (G.worldClocks.rival || 0) >= 4 &&
      !G.flags.maren_oss_encounter_done &&
      !G.flags.stage2_climax_started
    );
  }

  function trigger() {
    var G = window.G;
    G.flags.maren_oss_encounter_started = true;

    addJournal('investigation',
      'The archivist at Guildheart Hub lets slip that another investigator was here this morning — ' +
      'a woman, licensed, asked the same questions about the Ledger registrations. ' +
      'She left two hours ago.'
    );

    renderChoices([
      {
        id: 'maren_enc_follow',
        text: 'Follow her trail — she can\'t be far. The archivist might know where she went.',
        action: function() { _choiceFollow(); }
      },
      {
        id: 'maren_enc_mislead',
        text: 'Leave a false trail — feed the archivist misleading information she\'ll pass on if Maren returns.',
        action: function() { _choiceMislead(); }
      },
      {
        id: 'maren_enc_note',
        text: 'Note the encounter and move on — knowing she\'s working the same case is information enough.',
        action: function() { _choiceNote(); }
      }
    ]);
  }

  // Choice A — Follow her trail (persuasion DC 13)
  function _choiceFollow() {
    var G = window.G;
    var r = _roll('persuasion', 13);
    if (r.success) {
      addJournal('investigation',
        'The archivist, with some persuasion, describes Maren Oss — lean, methodical, carries a red-bound notebook. ' +
        'She asked about the Soreheim registrations specifically. ' +
        'She\'s ahead of you, but you know her angle now.'
      );
      G.flags.maren_oss_profiled = true;
      G.worldClocks.rival = Math.max(0, (G.worldClocks.rival || 0) - 1);
      gainXp(40, 'Profiled Maren Oss');
    } else {
      addJournal('investigation',
        'The archivist clams up. Whatever Maren paid for discretion, it held.'
      );
      gainXp(20, 'Attempted to follow Maren\'s trail');
    }
    _conclude();
  }

  // Choice B — Leave a false trail (deception DC 11)
  function _choiceMislead() {
    var G = window.G;
    var r = _roll('deception', 11);
    if (r.success) {
      addJournal('investigation',
        'You describe yourself as interested in the Aurora Crown water records — entirely different from your actual inquiry. ' +
        'If Maren comes back, she\'ll chase the wrong thread for a day.'
      );
      G.flags.maren_oss_misled = true;
      G.worldClocks.rival = Math.max(0, (G.worldClocks.rival || 0) - 2);
      gainXp(35, 'Misled Maren Oss via false trail');
    } else {
      addJournal('investigation',
        'The archivist is professional and unimpressed. She\'ll remember exactly what you asked about.'
      );
      gainXp(15, 'Failed to plant false trail');
    }
    _conclude();
  }

  // Choice C — Note and move on (observation DC 0, always succeeds)
  function _choiceNote() {
    var G = window.G;
    addJournal('investigation',
      'Maren Oss is real, licensed, and close. She\'s not a rumor anymore.'
    );
    G.flags.maren_oss_confirmed = true;
    gainXp(20, 'Noted Maren Oss encounter');
    _conclude();
  }

  function _conclude() {
    var G = window.G;
    G.flags.maren_oss_encounter_done = true;
    advanceTime(1);
    if (typeof addWorldNotice === 'function') {
      addWorldNotice('The encounter with Maren Oss is behind you. But she\'s not.');
    }
    if (typeof updateHUD === 'function') updateHUD();
  }

  return {
    shouldTrigger: shouldTrigger,
    trigger: trigger
  };

})();
