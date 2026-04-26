var SHELK_FAIRHAVEN_LEDGER_SHADOW = (function() {
  'use strict';

  function openingHook() {
    if (!G || G.flags.sideplot_shadow_ledger_started) return null;
    return {
      cid: 'sideplot_shadow_ledger_hook',
      text: 'At the permit desk — a clerk stamps without reading.',
      tags: ['Investigation'], plot: 'side',
      result: function() {
        G.flags.sideplot_shadow_ledger_started = true;
        G.lastResult = 'The permit counter is backed up three people deep when the clerk stamps yours without looking at the name. The form is for a trading company. The seal in the corner is Twice-Sealed — a double-impression you have seen on one other document. The company name does not appear in the open registry. You write it down anyway.';
        G.recentOutcomeType = 'discovery';
        addJournal(G.lastResult, 'evidence');
        G.stageProgress = G.stageProgress || {1:0,2:0};
        var _sk = G.stage === 'Stage II' ? 2 : 1;
        G.stageProgress[_sk] = (G.stageProgress[_sk] || 0) + 1;
        if (typeof updateHUD === 'function') updateHUD();
        (window._rawRenderChoices || window.renderChoices)([
          { id: 'shadow_note_company', text: 'The company name is on the form. It should be in the register.', tag: 'safe',
            action: function() {
              G.flags.shadow_ledger_rung1 = true;
              G.lastResult = 'You note the name and the seal. The company\'s registration number leads to an address in the Clerks\' Quarter — a building that was converted to storage twelve years ago. The number is current. The address is not.';
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
    if (!G || !G.flags.shadow_ledger_rung1 || G.flags.shadow_ledger_rung2) return null;
    return {
      cid: 'sideplot_shadow_ledger_rung2',
      text: 'The permit desk runs two sets of records. The second one is not filed here.',
      tags: ['Investigation'], plot: 'side',
      result: function() {
        var r = rollD20('lore');
        if (r.total >= 12) {
          G.flags.shadow_ledger_rung2 = true;
          G.lastResult = 'The clerk\'s filing system has a gap — two drawers with different lock styles. The second drawer has a routing number that does not match the public registry. The entries inside are stamped with the same Twice-Sealed impression. Twenty-three companies. None of them appear in the open rolls.';
          G.recentOutcomeType = 'discovery';
          G.worldClocks = G.worldClocks || {};
          G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
        } else {
          G.lastResult = 'The drawer is locked and the clerk has noticed you looking. The routing number is visible through the gap. You have it. The drawer stays closed.';
          G.recentOutcomeType = 'complication';
          G.worldClocks = G.worldClocks || {};
          G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
        }
        addJournal(G.lastResult, 'evidence');
        if (typeof checkStageAdvance === 'function') checkStageAdvance();
      }
    };
  }

  function showResolution() {
    if (!G || !G.flags.shadow_ledger_rung2 || G.flags.shadow_ledger_resolved) return;
    G.flags.shadow_ledger_resolved = true;
    G.lastResult = 'Twenty-three companies. Twice-Sealed Transit — a name that doesn\'t exist in any permit roll, threads through every one. Someone is using the permit system as a parallel channel. The question is not how. The question is who signs the second drawer.';
    G.recentOutcomeType = 'discovery';
    G.flags.shadow_ledger_known = true;
    addJournal(G.lastResult, 'evidence');
    if (typeof addWorldNotice === 'function') addWorldNotice('A second permit registry has been found. Twice-Sealed Transit is not registered anywhere.');
    if (typeof updateHUD === 'function') updateHUD();
  }

  return { openingHook: openingHook, rung2Hook: rung2Hook, showResolution: showResolution };
})();
window.SHELK_FAIRHAVEN_LEDGER_SHADOW = SHELK_FAIRHAVEN_LEDGER_SHADOW;
