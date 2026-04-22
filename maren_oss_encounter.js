var MAREN_OSS_ENCOUNTER = (function() {

  function shouldTrigger() {
    var G = window.G;
    return G && !G.flags.maren_oss_trail_found && !G.flags.maren_oss_encounter_done &&
           (G.investigationProgress || 0) >= 4 &&
           (G.location === 'guildheart_archive' || G.location === 'guildheart_hub');
  }

  function trigger() {
    var G = window.G;
    if (!G || G.flags.maren_oss_trail_found || G.flags.maren_oss_encounter_done) return;
    G.flags.maren_oss_trail_found = true;

    G.lastResult = 'The archive shelf is organized by acquisition date, not subject — whoever filed these did not want them found. Tucked behind a monograph on transit law, a thin folder with no name on the cover. Inside: case notes. Someone has been mapping the same investigation you are running. The handwriting is precise, unhurried. The analysis is two steps ahead of yours. At the bottom of the last page, a single annotation in a different ink, added later: "Subject is operational. Do not interfere with their findings." You do not know who wrote this. But they know you exist.';
    G.recentOutcomeType = 'discovery';
    window.addJournal('investigation', G.lastResult);
    if (typeof addNarration === 'function') addNarration('Found — Archive Shelf', G.lastResult);
    if (typeof updateHUD === 'function') updateHUD();

    setTimeout(function() {
      (window._rawRenderChoices || window.renderChoices)([
        {
          id: 'maren_evidence_study',
          text: 'Study the notes thoroughly — record what you can before returning them.',
          tag: 'bold',
          action: function() { studyNotes(); }
        },
        {
          id: 'maren_evidence_take',
          text: 'Take a copy — transcribe the key sections.',
          tag: 'risky',
          action: function() { copyNotes(); }
        },
        {
          id: 'maren_evidence_leave',
          text: 'Leave them undisturbed. Whoever placed them here may be watching.',
          tag: 'safe',
          action: function() { leaveNotes(); }
        }
      ]);
    }, 400);
  }

  function studyNotes() {
    var G = window.G;
    var r = rollD20('wits');
    if (r.success) {
      G.lastResult = 'You read carefully, piecing together a methodology that mirrors your own but extends further. Whoever this investigator is, they have access to sources you have not found yet — and they have been at this longer. You leave the folder exactly as you found it. What you have read is already changing how you see the investigation.';
      G.flags.maren_oss_profiled = true;
      G.investigationProgress = Math.max(G.investigationProgress || 0, 6);
      G.recentOutcomeType = 'success';
    } else {
      G.lastResult = 'You work quickly but cannot retain everything. The methodology is clear enough — this investigator is systematic, careful, and connected. But the specific names blur under haste. You replace the folder without the full picture.';
      G.flags.maren_oss_profiled = true;
      G.recentOutcomeType = 'partial';
    }
    _close();
  }

  function copyNotes() {
    var G = window.G;
    var r = rollD20('finesse');
    if (r.success) {
      G.lastResult = 'Your transcription is fast and clean. Three pages of methodology, two pages of source chains you have not seen before. The folder is back on the shelf before the archive clerk returns from her break. You carry more than you found.';
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
    var G = window.G;
    G.lastResult = 'You replace the folder exactly as you found it. Whoever left this here may return. Whatever they want you to know, they already decided you should find it — which means the question is not whether to trust the information, but why they want you to have it.';
    G.flags.maren_oss_suspected = true;
    G.recentOutcomeType = 'investigation';
    _close();
  }

  function _close() {
    var G = window.G;
    window.addJournal('investigation', G.lastResult);
    if (typeof updateHUD === 'function') updateHUD();
    if (typeof checkStageAdvance === 'function') checkStageAdvance();
  }

  return { trigger: trigger, shouldTrigger: shouldTrigger };
})();

window.MAREN_OSS_ENCOUNTER = MAREN_OSS_ENCOUNTER;
