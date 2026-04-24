window.STAGE2_ANTECHAMBER = (function() {

  function shouldTrigger() {
    
    if (!G || !G.flags || !G.stageProgress) return false;
    return (
      !G.flags.stage2_climax_started &&
      !G.flags.stage2_antechamber_done &&
      (G.stageProgress[2] || 0) >= 12 &&
      !!G.flags.stage2_faction_contact_made
    );
  }

  function trigger() {
    
    if (!G) return;

    G.flags.stage2_antechamber_started = true;

    window.addJournal('Someone has been watching you for three days. This morning, a Collegium courier left a note at your lodging: ', 'evidence');

    window.addWorldNotice(
      'One initial. Collegium ink \u2014 the specific blue-gray of institutional correspondence. Whoever wrote this has access to that supply.'
    );

    window.renderChoices([
      {
        id: 'antechamber_accelerate',
        text: 'You press harder \u2014 they\u2019re warning you because you\u2019re close.',
        tag: 'risky \u00b7 pressure \u00b7 DC 12',
        action: function() {
          var r = window.rollD20 ? window.rollD20('investigation') : { total: Math.floor(Math.random() * 20) + 1 };
          if (r.total >= 12) {
            G.stageProgress[2] = (G.stageProgress[2] || 0) + 2;
            window.addJournal('You change your route and the pace of it. The name you had been circling appears in a second source \u2014 unsolicited, mentioned in passing by a warehouse clerk who did not know it mattered. You write it down without looking up. The clerk keeps talking. You let him. Two threads, previously set aside, now point at the same thing.', 'evidence');
            if (typeof window.gainXp === 'function') window.gainXp(30);
          } else {
            G.worldClocks = G.worldClocks || {};
            G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
            window.addJournal('You push faster than the situation allows. The archivist who had been meeting you in the same corridor every third day is not there. Her desk, when you pass it, has been cleared to the surface \u2014 no papers, no open ledgers, nothing. The corridor clerk looks up. You keep walking. Whatever she knew, she has decided not to share it.', 'evidence');
            if (typeof window.gainXp === 'function') window.gainXp(15);
          }
          _resolve();
        }
      },
      {
        id: 'antechamber_acknowledge',
        text: 'You note the warning and keep moving \u2014 knowing you\u2019re watched is its own advantage.',
        tag: 'safe \u00b7 observation \u00b7 DC 0',
        action: function() {
          window.addJournal('You adjust your movements — slower, more oblique. They are watching, but watching does not mean understanding. Not yet.', 'evidence');
          G.flags.stage2_antechamber_acknowledged = true;
          if (typeof window.gainXp === 'function') window.gainXp(20);
          _resolve();
        }
      }
    ]);
  }

  function _resolve() {
    
    G.flags.stage2_antechamber_done = true;
    if (typeof window.advanceTime === 'function') window.advanceTime(1);
  }

  return { shouldTrigger: shouldTrigger, trigger: trigger };

})();
