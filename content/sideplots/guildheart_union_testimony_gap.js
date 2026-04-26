var GUILDHEART_UNION_TESTIMONY_GAP = (function() {
  'use strict';

  function openingHook() {
    if (!G || G.stage !== 'Stage II' || G.flags.sideplot_testimony_gap_started) return null;
    return {
      cid: 'sideplot_testimony_gap_hook',
      text: 'A name was struck from the testimony log. It was not struck from memory.',
      tags: ['Investigation'], plot: 'side',
      result: function() {
        G.flags.sideplot_testimony_gap_started = true;
        G.lastResult = 'The registry clerk mentions it without looking up from his work — a name crossed from the testimony log last week, two days before the inquiry concluded. Standard procedure for a withdrawn statement, he says, except this one was not withdrawn. The witness simply stopped appearing. The name above it and the name below it are both intact. The gap sits in the middle of a labor dispute record that went nowhere.';
        G.recentOutcomeType = 'discovery';
        addJournal(G.lastResult, 'evidence');
        G.stageProgress = G.stageProgress || {1:0,2:0};
        G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        if (typeof updateHUD === 'function') updateHUD();
        (window._rawRenderChoices || window.renderChoices)([
          { id: 'testimony_find_name', text: 'A struck name in the middle of a log is not administrative. Someone did that on purpose.', tag: 'safe',
            action: function() {
              G.flags.testimony_gap_rung1 = true;
              G.lastResult = 'The clerk remembers the name without needing to check the log — Sela Vorn, a cargo route mediator who filed a labor grievance on behalf of three dispatch crews. She appeared for two of the three scheduled testimony sessions. After the second one she did not come back and did not file a withdrawal. The inquiry closed three days later with no finding.';
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
    if (!G || !G.flags.testimony_gap_rung1 || G.flags.testimony_gap_rung2) return null;
    return {
      cid: 'sideplot_testimony_gap_rung2',
      text: 'Sela Vorn stopped appearing. She did not stop knowing what she knew.',
      tags: ['Investigation'], plot: 'side',
      result: function() {
        var r = rollD20('charm');
        if (r.total >= 13) {
          G.flags.testimony_gap_rung2 = true;
          G.lastResult = 'Sela Vorn is still in Guildheart Hub — working a counter job at a transit broker three streets from the registry. She agrees to talk once, in a back room, with no record of the meeting. The labor grievance named a routing contractor who billed Twice-Sealed Transit for cargo clearances that never happened. The contractor paid the dispatch crews short and kept the clearance fee. When she filed the grievance, a union liaison told her the case had been reviewed. It had not been reviewed. It had been closed. She has the original documentation. She has been waiting for someone to ask.';
          G.recentOutcomeType = 'discovery';
          G.worldClocks = G.worldClocks || {};
          G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
          addJournal(G.lastResult, 'evidence');
          if (typeof checkStageAdvance === 'function') checkStageAdvance();
        } else {
          G.lastResult = 'Sela Vorn\'s last known address is a boarding house that closed two months ago. The transit broker where she worked has no record of her under that name. Someone moved her, or she moved herself. The documentation she held is gone with her. The testimony gap remains the only physical trace.';
          G.recentOutcomeType = 'complication';
          G.worldClocks = G.worldClocks || {};
          G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
          addJournal(G.lastResult, 'complication');
          if (typeof checkStageAdvance === 'function') checkStageAdvance();
        }
      }
    };
  }

  function showResolution() {
    if (!G || !G.flags.testimony_gap_rung2 || G.flags.testimony_gap_resolved) return;
    G.flags.testimony_gap_resolved = true;
    G.lastResult = 'Sela Vorn\'s testimony links the labor fraud directly to Twice-Sealed Transit\'s routing contractor network. The dispatch crews were paid short on routes where the contractor billed full clearance fees — the difference went somewhere upstream. The union liaison who closed the case without review is named in her documentation. The blank witness exists. The chain from dock to contract to registry is now traceable end to end.';
    G.recentOutcomeType = 'discovery';
    G.flags.testimony_gap_known = true;
    addJournal(G.lastResult, 'evidence');
    if (typeof addWorldNotice === 'function') addWorldNotice('Guildheart Hub testimony suppression traced — a blank witness exists who connects the labor fraud to Twice-Sealed.');
    if (typeof updateHUD === 'function') updateHUD();
  }

  return { openingHook: openingHook, rung2Hook: rung2Hook, showResolution: showResolution };
})();
window.GUILDHEART_UNION_TESTIMONY_GAP = GUILDHEART_UNION_TESTIMONY_GAP;
