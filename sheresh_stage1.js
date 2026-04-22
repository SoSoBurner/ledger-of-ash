var SHERESH_STAGE1 = (function() {

  function openingHook() {
    var G = window.G;
    if (!G || G.flags.sideplot_sheresh_started) return;
    G.flags.sideplot_sheresh_started = true;

    G.lastResult = 'At the commune registry, you search the memory records on a different matter — and find the absence instead. The entry for the year you turned nine has a gap where a name should be. Not a crossed-out name, not a redaction. A gap. As if the record was never written, or as if something was placed here to hold a space that was then removed. You know whose name belongs in that gap. You remember her — the healer who taught you the first names of the fever-plants, who had an opinion about everything and expressed it without cruelty. Her name is not here. According to the commune record, she never existed.';
    G.flags.sheresh_memory_gap_found = true;
    G.recentOutcomeType = 'discovery';
    G.investigationProgress = Math.max(G.investigationProgress || 0, 2);
    window.addJournal('investigation', G.lastResult);
    if (typeof addNarration === 'function') addNarration('Commune Registry', G.lastResult);

    setTimeout(function() {
      (window._rawRenderChoices || window.renderChoices)([
        { id: 'sheresh_ask_elder', text: 'Ask an elder about the gap in the record.', tag: 'bold',
          action: function() { askElder(); } },
        { id: 'sheresh_search_older', text: 'Search older records — find evidence she existed before the gap.', tag: 'risky',
          action: function() { searchOlderRecords(); } },
        { id: 'sheresh_sit_with_it', text: 'Sit with the knowledge. What does it mean that she is gone from here too?', tag: 'safe',
          action: function() { sitWithIt(); } }
      ]);
    }, 400);
  }

  function askElder() {
    var G = window.G;
    var r = rollD20('charm');
    if (r.success) {
      G.lastResult = 'The elder is old enough to remember, and she knows exactly what you are asking. She looks at the gap for a long moment. "We were told it was a registration error. A duplicate that needed to be resolved." She looks at you. "I never believed that." She cannot tell you who ordered it. She can tell you it came from outside the commune.';
      G.flags.sheresh_external_erasure_confirmed = true;
      G.investigationProgress = Math.max(G.investigationProgress || 0, 3);
    } else {
      G.lastResult = 'The elder you approach doesn\'t remember — or says she doesn\'t. The record gap is awkward in the conversation. She suggests a clerical explanation with the careful voice of someone who does not want to say more.';
      G.flags.sheresh_elder_uncooperative = true;
    }
    window.addJournal('investigation', G.lastResult);
    _closeWithHint();
  }

  function searchOlderRecords() {
    var G = window.G;
    var r = rollD20('wits');
    if (r.success) {
      G.lastResult = 'In a secondary ledger — the kind used for inter-commune correspondence, kept in a back room with no active index — her name appears three times. A resource request she submitted. A healer certification renewal. A grievance she filed against the collective memory board, three months before her name vanished from the main registry. The grievance references "external registry interference." The grievance has no resolution recorded.';
      G.flags.sheresh_evidence_found = true;
      G.flags.sheresh_grievance_found = true;
      G.investigationProgress = Math.max(G.investigationProgress || 0, 4);
    } else {
      G.lastResult = 'The older records are disorganized and partially damaged. You find nothing conclusive — only a single certification entry that could be her, if the year aligns, which you cannot confirm.';
    }
    window.addJournal('investigation', G.lastResult);
    _closeWithHint();
  }

  function sitWithIt() {
    var G = window.G;
    G.lastResult = 'She existed. You know she existed. The commune record says she did not. The distance between those two facts is not a clerical error. Someone decided she should not have existed, and someone else decided that decision should be made permanent. The investigation you thought was about the ledger of ash is also about this — about everyone who was removed from every record, everywhere. About what it means that it happened here, at home, before you even knew to look.';
    G.flags.sheresh_emotional_anchor_set = true;
    G.worldClocks = G.worldClocks || {};
    G.worldClocks.isolation = (G.worldClocks.isolation || 0) + 1;
    G.investigationProgress = Math.max(G.investigationProgress || 0, 3);
    window.addJournal('investigation', G.lastResult);
    _closeWithHint();
  }

  function _closeWithHint() {
    var G = window.G;
    if (!G.flags.sheresh_principalities_hint_shown) {
      G.flags.sheresh_principalities_hint_shown = true;
      if (typeof addNarration === 'function') {
        addNarration('A Thought', 'The pattern is larger than this commune. If it happened here, it happened in more places. The Principalities — Shelkopolis in particular — is where official records are centralized. That is where the answer is.');
      }
    }
    if (typeof updateHUD === 'function') updateHUD();
    if (typeof checkStageAdvance === 'function') checkStageAdvance();
  }

  return { openingHook: openingHook };
})();

window.SHERESH_STAGE1 = SHERESH_STAGE1;
