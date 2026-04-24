var MAREN_OSS_ENCOUNTER = (function() {

  function shouldTrigger() {
    
    return G && !G.flags.maren_oss_trail_found && !G.flags.maren_oss_encounter_done &&
           (G.investigationProgress || 0) >= 4 &&
           (G.location === 'guildheart_archive' || G.location === 'guildheart_hub');
  }

  function trigger() {
    
    if (!G || G.flags.maren_oss_trail_found || G.flags.maren_oss_encounter_done) return;
    G.flags.maren_oss_trail_found = true;

    var archetypeObservation = '';
    if (G.archetype && G.archetype.group === 'support') {
      archetypeObservation = ' The source chain they used is the same one you would have used — not the obvious route, but the one that runs through supply manifests.';
    } else if (G.archetype && G.archetype.group === 'stealth') {
      archetypeObservation = ' The filing location is not accidental. Whoever placed this here knows how archives are searched.';
    } else if (G.archetype && G.archetype.group === 'magic') {
      archetypeObservation = ' The notation in the margins uses a referencing shorthand you recognize from Collegium record-keeping — this was written by someone with institutional training.';
    } else if (G.archetype && G.archetype.group === 'combat') {
      archetypeObservation = ' The annotations are written as if the author knew they were being watched. Every reference is oblique, nothing named directly.';
    }
    G.lastResult = 'The shelf is organized by acquisition date, not subject — whoever filed these did not want them found. Behind a monograph on transit law, a thin folder with no name on the cover. Inside: case notes. Someone has been mapping the same case. The handwriting is precise, unhurried. The analysis is two steps ahead of yours.' + archetypeObservation + ' At the bottom of the last page, a single annotation in different ink — added after, by a different hand: "Subject is operational. Do not interfere with their findings."';
    G.recentOutcomeType = 'discovery';
    addJournal(G.lastResult, 'discovery');
    if (typeof addNarration === 'function') addNarration('Found — Archive Shelf', G.lastResult);
    if (typeof updateHUD === 'function') updateHUD();

    setTimeout(function() {
      (window._rawRenderChoices || window.renderChoices)([
        {
          id: 'maren_evidence_study',
          text: 'The methodology is two steps ahead. You need to understand it before you leave.',
          tag: 'bold',
          action: function() { studyNotes(); }
        },
        {
          id: 'maren_evidence_take',
          text: 'A copy in your coat. The clerk is still on break.',
          tag: 'risky',
          action: function() { copyNotes(); }
        },
        {
          id: 'maren_evidence_leave',
          text: 'Whoever left this decided you should find it. The question is why.',
          tag: 'safe',
          action: function() { leaveNotes(); }
        }
      ]);
    }, 400);
  }

  function studyNotes() {
    
    var r = rollD20('wits');
    if (r.success) {
      var renownLine = '';
      if ((G.renown || 0) >= 10) {
        renownLine = ' Near the end, a margin note references "the new party" making similar inquiries — followed by a description that matches you closely enough to be intentional. She already knows who you are.';
      }
      G.lastResult = 'You read carefully, piecing together a methodology that mirrors your own but extends further. Whoever wrote these has access to sources you have not found yet — and has been at this longer. You leave the folder exactly as you found it. Walking out, you find yourself rethinking two assumptions you had treated as settled.' + renownLine;
      G.flags.maren_oss_profiled = true;
      G.investigationProgress = Math.max(G.investigationProgress || 0, 6);
      G.recentOutcomeType = 'success';
    } else {
      G.lastResult = 'You work quickly but cannot retain everything. The methodology is clear — systematic, patient, well-sourced. But the names slip. You remember the shape of the thing, not the names. You replace the folder without the full picture.';
      G.flags.maren_oss_profiled = true;
      G.recentOutcomeType = 'partial';
    }
    _close();
  }

  function copyNotes() {
    
    var r = rollD20('finesse');
    if (r.success) {
      G.lastResult = 'Three pages of methodology, two of source chains you have not seen before. You fold the copy into your coat without looking at it and return the folder to the shelf. The clerk is still on her break. You carry more than you came with.';
      G.flags.maren_oss_profiled = true;
      G.flags.maren_oss_notes_copied = true;
      G.investigationProgress = Math.max(G.investigationProgress || 0, 7);
      G.recentOutcomeType = 'success';
    } else {
      G.lastResult = 'The transcription takes longer than expected. The clerk returns; you manage to step away without the folder but without everything you needed. She glances at the shelf. She does not comment. But she looked.';
      G.worldClocks = G.worldClocks || {};
      G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
      G.flags.maren_oss_profiled = true;
      G.recentOutcomeType = 'complication';
    }
    _close();
  }

  function leaveNotes() {
    
    G.lastResult = 'You replace the folder exactly as you found it. Whoever left this here may return. Whatever they want you to know, they already decided you should find it — which means the question is why.';
    G.flags.maren_oss_suspected = true;
    G.recentOutcomeType = 'discovery';
    _close();
  }

  function _close() {
    
    addJournal(G.lastResult, 'discovery');
    if (typeof updateHUD === 'function') updateHUD();
    if (typeof checkStageAdvance === 'function') checkStageAdvance();
  }

  return { trigger: trigger, shouldTrigger: shouldTrigger };
})();

window.MAREN_OSS_ENCOUNTER = MAREN_OSS_ENCOUNTER;
