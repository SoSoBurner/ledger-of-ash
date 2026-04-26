var COSMORIA_HARBOR_WEIGHT_FRAUD = (function() {
  'use strict';

  function openingHook() {
    if (!G || G.flags.sideplot_harbor_fraud_started) return null;
    return {
      cid: 'sideplot_harbor_fraud_hook',
      text: 'The dock workers count the cargo twice. The weighmaster counts it once.',
      tags: ['Investigation'], plot: 'side',
      result: function() {
        G.flags.sideplot_harbor_fraud_started = true;
        G.lastResult = 'Three cargo workers share a fire at the staging ground. Six weeks short pay — they say it the way people say weather, without expecting it to change. Their tallies are correct. The weighmaster\'s log shows different numbers. The discrepancy is small enough to overlook and large enough, repeated across six weeks, to mean something.';
        G.recentOutcomeType = 'discovery';
        addJournal(G.lastResult, 'evidence');
        (window._rawRenderChoices || window.renderChoices)([
          { id: 'harbor_check_log', text: 'The workers\' tally and the weighmaster\'s log don\'t match.', tag: 'safe',
            action: function() {
              G.flags.harbor_fraud_rung1 = true;
              G.lastResult = 'The workers let you see their count records — kept separately, in a pocket ledger. The differences are consistent: always 8–12 percent low in the official log. Always in the same cargo class. The dock foreman has signed every discrepancy.';
              G.recentOutcomeType = 'discovery';
              addJournal(G.lastResult, 'evidence');
              if (typeof checkStageAdvance === 'function') checkStageAdvance();
            }
          }
        ]);
      }
    };
  }

  function rung2Hook() {
    if (!G || !G.flags.harbor_fraud_rung1 || G.flags.harbor_fraud_rung2) return null;
    return {
      cid: 'sideplot_harbor_fraud_rung2',
      text: 'The weighmaster keeps two sets of records. The second is kept at the midnight check.',
      tags: ['Confrontation'], plot: 'side',
      result: function() {
        var r = rollD20('stealth');
        if (r.total >= 13) {
          G.flags.harbor_fraud_rung2 = true;
          G.lastResult = 'The midnight check happens at the end of the third shift when the dock is quietest. The weighmaster brings a second ledger — smaller, different binding. You watch from the crane housing. He enters numbers that don\'t match what you saw weighed. Someone meets him at the crane base. They exchange a sealed envelope. You have seen that seal before: Twice-Sealed.';
          G.recentOutcomeType = 'discovery';
          G.worldClocks = G.worldClocks || {};
          G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
          addJournal(G.lastResult, 'evidence');
          if (typeof checkStageAdvance === 'function') checkStageAdvance();
        } else {
          G.lastResult = 'The dock guard spotted you at the crane housing. You got out clean but didn\'t see the exchange. The foreman has been told someone was watching. The second ledger exists — you know that much.';
          G.recentOutcomeType = 'complication';
          G.worldClocks = G.worldClocks || {};
          G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
          addJournal(G.lastResult, 'complication');
          (window._rawRenderChoices || window.renderChoices)([
            { id: 'harbor_confront_guard', text: 'The dock guard has seen your face. He\'s coming back with someone.', tag: 'bold',
              action: function() {
                if (typeof enterCombat === 'function') enterCombat('hired_muscle', { isBoss: false, context: 'harbor_guard_confrontation' });
              }
            },
            { id: 'harbor_withdraw', text: 'Pull back. The ledger isn\'t worth a dock fight.', tag: 'safe',
              action: function() {
                G.lastResult = 'You clear the dock before the second guard arrives. The ledger is still out there. So is the foreman\'s name.';
                if (typeof checkStageAdvance === 'function') checkStageAdvance();
              }
            }
          ]);
        }
      }
    };
  }

  function showResolution() {
    if (!G || !G.flags.harbor_fraud_rung2 || G.flags.harbor_fraud_resolved) return;
    G.flags.harbor_fraud_resolved = true;
    G.lastResult = 'The second ledger connects the Cosmoria weighmaster to Twice-Sealed Transit. The false weight entries are a payment system — cargo shorted on paper, difference paid in a sealed envelope. Someone upstream authorizes it. The dock workers are owed wages. The foreman is a link in a longer chain.';
    G.recentOutcomeType = 'discovery';
    G.flags.harbor_fraud_known = true;
    addJournal(G.lastResult, 'evidence');
    if (typeof addWorldNotice === 'function') addWorldNotice('Harbor weight fraud traced to Twice-Sealed Transit. The dock foreman is a link.');
    if (typeof updateHUD === 'function') updateHUD();
  }

  return { openingHook: openingHook, rung2Hook: rung2Hook, showResolution: showResolution };
})();
window.COSMORIA_HARBOR_WEIGHT_FRAUD = COSMORIA_HARBOR_WEIGHT_FRAUD;
