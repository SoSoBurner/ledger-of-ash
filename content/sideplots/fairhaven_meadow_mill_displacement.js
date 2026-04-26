var FAIRHAVEN_MEADOW_MILL_DISPLACEMENT = (function() {
  'use strict';

  function openingHook() {
    if (!G || G.flags.sideplot_mill_displacement_started) return null;
    return {
      cid: 'sideplot_mill_displacement_hook',
      text: 'The property line moved. The workers are still on the wrong side of it.',
      tags: ['Investigation'], plot: 'side',
      result: function() {
        G.flags.sideplot_mill_displacement_started = true;
        G.lastResult = 'A group of displaced workers camp at the edge of the mill road — no fire, packs stacked, waiting for something that isn\'t coming. One of them shows you a copy of the rerouting order. The property line moved twelve meters into what used to be common land. The order is stamped valid. The date is four months old. No one was told.';
        G.recentOutcomeType = 'discovery';
        addJournal(G.lastResult, 'evidence');
        G.stageProgress = G.stageProgress || {1:0,2:0};
        var _sk = G.stage === 'Stage II' ? 2 : 1;
        G.stageProgress[_sk] = (G.stageProgress[_sk] || 0) + 1;
        if (typeof updateHUD === 'function') updateHUD();
        (window._rawRenderChoices || window.renderChoices)([
          { id: 'mill_check_order', text: 'The rerouting order has a permit number. Permit numbers have origins.', tag: 'safe',
            action: function() {
              G.flags.mill_displacement_rung1 = true;
              G.lastResult = 'The permit number on the rerouting order runs to a batch issued from the Fairhaven civic office eight months ago. That batch was supposed to cover mill access improvements. The property shift is not listed anywhere in the improvement schedule. Someone added this order to the batch after the fact — the ink weight is different from the surrounding entries.';
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
    if (!G || !G.flags.mill_displacement_rung1 || G.flags.mill_displacement_rung2) return null;
    return {
      cid: 'sideplot_mill_displacement_rung2',
      text: 'The rerouting order has a permit number. Permit numbers have origins.',
      tags: ['Confrontation'], plot: 'side',
      result: function() {
        var r = rollD20('lore');
        if (r.total >= 12) {
          G.flags.mill_displacement_rung2 = true;
          G.lastResult = 'The permit batch reference leads to the civic land office filing room. The original batch is intact. The rerouting order is not in it — it was added to the batch index but not the physical file. The routing mark stamped on the order\'s corner matches the Twice-Sealed impression: two overlapping circles, the same as the harbor permit and the shadow ledger. The mill displacement is part of the same channel.';
          G.recentOutcomeType = 'discovery';
          G.worldClocks = G.worldClocks || {};
          G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
          addJournal(G.lastResult, 'evidence');
          if (typeof checkStageAdvance === 'function') checkStageAdvance();
        } else {
          G.lastResult = 'The land office clerk has closed the batch file before you finish reading. Someone notified the office you were coming. The routing mark was visible for long enough — you have it. The clerk has your face now too.';
          G.recentOutcomeType = 'complication';
          G.worldClocks = G.worldClocks || {};
          G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
          addJournal(G.lastResult, 'complication');
          (window._rawRenderChoices || window.renderChoices)([
            { id: 'mill_confront_foreman', text: 'The foreman is outside. He\'s been waiting for someone to come looking.', tag: 'bold',
              action: function() {
                if (typeof enterCombat === 'function') enterCombat('border_enforcer', { isBoss: false, context: 'mill_foreman_confrontation' });
              }
            },
            { id: 'mill_withdraw', text: 'Pull back. The routing mark is enough for now.', tag: 'safe',
              action: function() {
                G.lastResult = 'You leave the land office before the foreman can place you. The routing mark is documented. The channel exists whether or not the file is open.';
                if (typeof checkStageAdvance === 'function') checkStageAdvance();
              }
            }
          ]);
        }
      }
    };
  }

  function showResolution() {
    if (!G || !G.flags.mill_displacement_rung2 || G.flags.mill_displacement_resolved) return;
    G.flags.mill_displacement_resolved = true;
    G.lastResult = 'The fraudulent land contract connects to the same permit channel as the shadow ledger. Twice-Sealed Transit inserted the rerouting order into a legitimate batch and used it to shift property lines without public record. The displaced workers lost common land to a company that does not officially exist. The foreman who enforced the line is a hired link — not the hand that drew it.';
    G.recentOutcomeType = 'discovery';
    G.flags.mill_displacement_known = true;
    addJournal(G.lastResult, 'evidence');
    if (typeof addWorldNotice === 'function') addWorldNotice('Fairhaven meadow displacement tied to fraudulent land rerouting. The routing mark matches Twice-Sealed.');
    if (typeof updateHUD === 'function') updateHUD();
  }

  return { openingHook: openingHook, rung2Hook: rung2Hook, showResolution: showResolution };
})();
window.FAIRHAVEN_MEADOW_MILL_DISPLACEMENT = FAIRHAVEN_MEADOW_MILL_DISPLACEMENT;
