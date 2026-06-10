window.STAGE2_ANTECHAMBER = (function() {

  function shouldTrigger() {

    if (!G || !G.flags || !G.stageProgress) return false;
    return (
      !G.flags.stage2_antechamber_done &&
      (G.stageProgress[2] || 0) >= 10
    );
  }

  function trigger() {

    if (!G) return;

    // Side effects only on first trigger call; subsequent calls (race-condition re-renders) skip them
    if (!(G.flags && G.flags.stage2_antechamber_started)) {
      G.flags.stage2_antechamber_started = true;
      addJournal('Someone has been watching you for three days. This morning, a Collegium courier left a note at your lodging: ', 'evidence');
      window.addWorldNotice(
        'One initial. Collegium ink \u2014 the specific blue-gray of institutional correspondence. Whoever wrote this has access to that supply.'
      );
    }

    var antechamberChoices = [
      {
        id: 'antechamber_accelerate',
        plot: 'main',
        label: 'They warned me because I\u2019m close. That changes what pressing harder costs.',
        tag: 'risky',
        skill: 'wits',
        dc: 12,
        xpReward: 25,
        fn: function() {
          var r = typeof rollD20 === 'function' ? rollD20('wits') : { total: Math.floor(Math.random() * 20) + 1 };
          if (r.total >= 12) {
            G.stageProgress[2] = (G.stageProgress[2] || 0) + 2;
            addJournal('You change your route and the pace of it. The name you had been circling appears in a second source \u2014 unsolicited, mentioned in passing by a warehouse clerk who did not know it mattered. You write it down without looking up. The clerk keeps talking. You let him. Two threads, previously set aside, now point at the same thing.', 'evidence');
          } else {
            G.worldClocks = G.worldClocks || {};
            G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
            addJournal('You push faster than the situation allows. The archivist who had been meeting you in the same corridor every third day is not there. Her desk, when you pass it, has been cleared to the surface \u2014 no papers, no open ledgers, nothing. The corridor clerk looks up. You keep walking. Whatever she knew, she has decided not to share it.', 'evidence');
          }
          _resolve();
        }
      },
      {
        id: 'antechamber_acknowledge',
        plot: 'main',
        label: 'Being watched and knowing it are two different things.',
        tag: 'safe',
        skill: 'wits',
        xpReward: 25,
        failResult: function() {
          addJournal('You try to act unbothered and the seam shows. The clerk you usually pass without looking up looks up. The corridor feels different walking back than it did walking in.', 'evidence');
          G.flags.stage2_antechamber_acknowledged = true;
          _resolve();
        },
        fn: function() {
          addJournal('You adjust your movements \u2014 slower, more oblique. They are watching, but watching does not mean understanding. Not yet.', 'evidence');
          G.flags.stage2_antechamber_acknowledged = true;
          _resolve();
        }
      }
    ];
    var _renderFn = window._rawRenderChoices || window.renderChoices;
    if (typeof window.adaptEnrichedChoice === 'function') {
      _renderFn(antechamberChoices.map(window.adaptEnrichedChoice));
    } else {
      _renderFn(antechamberChoices);
    }
  }

  function _resolve() {

    G.flags.stage2_antechamber_done = true;
    // Resolve quest: the antechamber move is made — the accounting is now complete enough to act on
    if (G && G.questHints) G.questHints['q_s2_antechamber'] = null;
    if (G && G.quests) G.quests = G.quests.map(function(q) {
      if (typeof q === 'object' && q && q.questId === 'q_s2_antechamber') {
        return Object.assign({}, q, {resolved: true, resolvedText: 'The last piece is placed. The antechamber move is complete. The confrontation is next.'});
      }
      return q;
    });
    if (typeof window.advanceTime === 'function') window.advanceTime(1);
    if (typeof checkStageAdvance === 'function') checkStageAdvance();
  }

  return { shouldTrigger: shouldTrigger, trigger: trigger };

})();
