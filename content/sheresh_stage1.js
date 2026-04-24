var SHERESH_STAGE1 = (function() {

  function openingHook() {
    
    if (!G || G.flags.sideplot_sheresh_started) return;
    G.flags.sideplot_sheresh_started = true;

    G.lastResult = 'The memory hall is cool and smells of old binding paste. You are looking for one thing and find another: the entry for the year you turned nine has a blank where a name should be. Not a struck-through name, not a notation of correction. A blank — the kind left when a line of text is carefully removed and the surrounding entries are closed around it to hide the gap. You know whose name belongs there. The healer who showed you which leaf treats river-fever, who argued with the provisioning board every harvest and was always right. Her name is not here. The commune record has no entry for her at all.';
    G.flags.sheresh_memory_gap_found = true;
    G.recentOutcomeType = 'discovery';
    G.investigationProgress = Math.max(G.investigationProgress || 0, 2);
    addJournal(G.lastResult, 'evidence');
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
    
    var r = rollD20('charm');
    if (r.success) {
      G.lastResult = 'The elder stands at the registry shelf and does not reach for the book. She already knows the page you mean. "They came through with a correction order," she says. "They called it a duplicate registration. Two entries for the same individual." She pauses. "There was never a duplicate. I checked the year myself afterward." She cannot give you a name. She can tell you the order came in from outside the commune — sealed, stamped, and acted on before anyone thought to ask why.';
      G.flags.sheresh_external_erasure_confirmed = true;
      G.investigationProgress = Math.max(G.investigationProgress || 0, 3);
    } else {
      G.lastResult = 'The elder you find looks at the blank line and suggests a transcription error — her voice flat and practiced, as if she has rehearsed exactly this answer. She does not meet your eyes when she says it. She changes the subject before you can ask a follow-up question and keeps her back to you until you leave the room.';
      G.flags.sheresh_elder_uncooperative = true;
    }
    addJournal(G.lastResult, 'evidence');
    _closeWithHint();
  }

  function searchOlderRecords() {
    
    var r = rollD20('wits');
    if (r.success) {
      G.lastResult = 'The secondary ledger is stored flat in a crate under correspondence bundles nobody has opened in years. Her name is there three times — a resource requisition for fever-plant compounds, a healer certification renewal, and a formal grievance filed against the commune memory board. The grievance is dated three months before the gap appears in the primary registry. It names "external registry interference" as the cause of the complaint. There is no resolution entry. The grievance was received and then nothing happened and then her name was gone.';
      G.flags.sheresh_evidence_found = true;
      G.flags.sheresh_grievance_found = true;
      G.investigationProgress = Math.max(G.investigationProgress || 0, 4);
    } else {
      G.lastResult = 'The secondary ledger has water damage along the bottom third of every page in the relevant year-range. You find one certification entry that could match — healer, river district, the right approximate period — but the name block is unreadable. You cannot confirm it. An afternoon in a damp room with nothing to show for it except a possible that stays possible.';
    }
    addJournal(G.lastResult, 'evidence');
    _closeWithHint();
  }

  function sitWithIt() {
    
      G.lastResult = 'You sit with the ledger open to the blank line. You know what her hands looked like when she prepared a compress. You know which cough she took seriously and which she sent home with salt water. The record says none of that happened. Someone decided it should not have happened, and then someone else made the record agree. The pattern you have been following in other places started here — in your own commune, in a year when you were young enough not to notice. That is what the blank line is telling you. It started before you were looking.';
    G.flags.sheresh_emotional_anchor_set = true;
    G.worldClocks = G.worldClocks || {};
    G.worldClocks.isolation = (G.worldClocks.isolation || 0) + 1;
    G.investigationProgress = Math.max(G.investigationProgress || 0, 3);
    addJournal(G.lastResult, 'evidence');
    _closeWithHint();
  }

  function _closeWithHint() {
    
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
