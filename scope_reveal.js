var SCOPE_REVEAL = (function() {

  function trigger() {
    var G = window.G;
    if (!G || G.flags.scope_reveal_shown) return;
    if ((G.investigationProgress || 0) < 5) return;
    G.flags.scope_reveal_shown = true;

    G.lastResult = 'The document is not addressed to anyone. It was folded inside a tax ledger from three years ago, overlooked or deliberately hidden. A list — partial, hand-copied — of names. Most mean nothing to you. But three of them are names you have encountered in other contexts, other documents, other frayed ends of this investigation. They are not connected by crime. They are connected by absence: every name on this list has been removed from at least one official record since the Catastrophe era. Someone has been compiling this absence. Someone else has been trying to stop them. The investigation you thought you were running is the surface of something much older.';
    G.worldClocks = G.worldClocks || {};
    G.worldClocks.omens = (G.worldClocks.omens || 0) + 1;
    G.recentOutcomeType = 'discovery';
    window.addJournal('investigation', G.lastResult);
    if (typeof addNarration === 'function') addNarration('Found Document', G.lastResult);
    if (typeof updateHUD === 'function') updateHUD();

    (window._rawRenderChoices || window.renderChoices)([
      { id: 'scope_note_names', text: 'Record the names carefully. Cross-reference with everything you have found.', tag: 'bold',
        action: function() {
          window.G.flags.scope_reveal_names_recorded = true;
          window.G.investigationProgress = Math.max(window.G.investigationProgress || 0, 6);
          if (typeof addNarration === 'function') addNarration('', 'Three more threads. The picture is not larger — it is deeper.');
          if (typeof checkStageAdvance === 'function') checkStageAdvance();
        }
      },
      { id: 'scope_take_document', text: 'Take the document. It should not be here.', tag: 'safe',
        action: function() {
          window.G.flags.scope_reveal_document_taken = true;
          window.G.investigationProgress = Math.max(6, (window.G.investigationProgress || 0) + 1);
          if (typeof addNarration === 'function') addNarration('', 'You fold it into your case notes. Evidence. Pattern. Purpose.');
          if (typeof checkStageAdvance === 'function') checkStageAdvance();
        }
      }
    ]);
  }

  return { trigger: trigger };
})();

window.SCOPE_REVEAL = SCOPE_REVEAL;
