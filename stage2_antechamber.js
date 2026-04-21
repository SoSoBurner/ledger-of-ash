window.STAGE2_ANTECHAMBER = (function() {

  function shouldTrigger() {
    var G = window.G;
    if (!G || !G.flags || !G.stageProgress) return false;
    return (
      !G.flags.stage2_climax_started &&
      !G.flags.stage2_antechamber_done &&
      (G.stageProgress[2] || 0) >= 12 &&
      !!G.flags.stage2_faction_contact_made
    );
  }

  function trigger() {
    var G = window.G;
    if (!G) return;

    G.flags.stage2_antechamber_started = true;

    window.addJournal('investigation',
      'Someone has been watching you for three days. This morning, a Collegium courier left a note at your lodging: ' +
      '"Whatever you think you know about the Ledger, the people who protect it are not your enemies. ' +
      'Consider carefully what you do next. \u2014 O"'
    );

    window.addWorldNotice(
      'The warning is unsigned except for the initial. You\u2019ve heard Inquisitor Orveth described. The handwriting is precise.'
    );

    window.renderChoices([
      {
        id: 'antechamber_accelerate',
        text: 'Press harder \u2014 if they\u2019re warning you, you\u2019re close. Use the pressure.',
        tag: 'risky \u00b7 investigation \u00b7 DC 12',
        action: function() {
          var r = window.rollD20 ? window.rollD20('investigation') : { total: Math.floor(Math.random() * 20) + 1 };
          if (r.total >= 12) {
            G.stageProgress[2] = (G.stageProgress[2] || 0) + 2;
            window.addJournal('investigation', 'The urgency sharpens your focus. Two more threads connect.');
            if (typeof window.gainXp === 'function') window.gainXp(30);
          } else {
            G.worldClocks = G.worldClocks || {};
            G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
            window.addJournal('investigation', 'The warning rattles you. You move too quickly and attract attention.');
            if (typeof window.gainXp === 'function') window.gainXp(15);
          }
          _resolve();
        }
      },
      {
        id: 'antechamber_acknowledge',
        text: 'Acknowledge the warning and proceed carefully \u2014 knowing you\u2019re watched is its own advantage.',
        tag: 'safe \u00b7 observation \u00b7 DC 0',
        action: function() {
          window.addJournal('investigation',
            'You adjust your movements. They know you know. The game has changed register.'
          );
          G.flags.stage2_antechamber_acknowledged = true;
          if (typeof window.gainXp === 'function') window.gainXp(20);
          _resolve();
        }
      }
    ]);
  }

  function _resolve() {
    var G = window.G;
    G.flags.stage2_antechamber_done = true;
    if (typeof window.advanceTime === 'function') window.advanceTime(1);
  }

  return { shouldTrigger: shouldTrigger, trigger: trigger };

})();
