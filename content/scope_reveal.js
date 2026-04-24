var SCOPE_REVEAL = (function() {

  function trigger() {
    
    if (!G || G.flags.scope_reveal_shown) return;
    if ((G.investigationProgress || 0) < 5) return;
    G.flags.scope_reveal_shown = true;

    G.lastResult = 'The document has no address, no date, no signature. It was folded twice and pressed flat inside a tax ledger from three years back, where it could have been overlooked or could have been placed to survive. A hand-copied list — partial, the bottom cut off or lost. Eleven names. Most are unknown to you. Three are not: you have seen them in other documents, other dead ends, other places where records were thin for reasons that did not add up. These three names connect nothing criminal. They connect absence — each one removed from at least one official record sometime in the decades after the Catastrophe. Removed carefully. Someone has been tracking this. Someone else has been tracking the one who tracks it.';
    G.worldClocks = G.worldClocks || {};
    G.worldClocks.omens = (G.worldClocks.omens || 0) + 1;
    G.recentOutcomeType = 'discovery';
    addJournal(G.lastResult, 'evidence');
    if (typeof addNarration === 'function') addNarration('Found Document', G.lastResult);
    if (typeof updateHUD === 'function') updateHUD();

    (window._rawRenderChoices || window.renderChoices)([
      { id: 'scope_note_names', text: 'Record the names carefully. Cross-reference with everything you have found.', tag: 'bold',
        action: function() {
          G.flags.scope_reveal_names_recorded = true;
          G.investigationProgress = Math.max(G.investigationProgress || 0, 6);
          if (typeof addNarration === 'function') addNarration('', 'Three more threads. The picture is not larger — it is deeper.');
          if (typeof checkStageAdvance === 'function') checkStageAdvance();
        }
      },
      { id: 'scope_take_document', text: 'Take the document. It should not be here.', tag: 'safe',
        action: function() {
          G.flags.scope_reveal_document_taken = true;
          G.investigationProgress = Math.max(6, (G.investigationProgress || 0) + 1);
          if (typeof addNarration === 'function') addNarration('', 'You fold it into your case notes. Evidence. Pattern. Purpose.');
          if (typeof checkStageAdvance === 'function') checkStageAdvance();
        }
      }
    ]);
  }

  return { trigger: trigger };
})();

window.SCOPE_REVEAL = SCOPE_REVEAL;
