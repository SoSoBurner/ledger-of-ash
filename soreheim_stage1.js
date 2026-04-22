var SOREHEIM_STAGE1 = (function() {
  function openingHook() {
    var G = window.G;
    if (!G || G.flags.sideplot_interim_seat_started) return;
    G.flags.sideplot_interim_seat_started = true;

    G.lastResult = 'A dockworker at the Soreheim Proper weigh-station is arguing with a registry clerk — not loudly, not productively. "Two full weeks," he says. "Forty-three loads verified at the gate. Nothing in the ledger." The clerk stares at his book and does not look up. Nearby, a man in a clan-mark coat watches the exchange without expression.';
    window.addJournal('investigation', G.lastResult);
    if (typeof addNarration === 'function') addNarration('Weigh-Station', G.lastResult);

    (window._rawRenderChoices || window.renderChoices)([
      { id: 'interim_investigate', text: 'Ask the dockworker about the discrepancy.', tag: 'bold',
        action: function() { investigateRegistry(); } },
      { id: 'interim_observe', text: 'Watch the man in the clan coat.', tag: 'safe',
        action: function() { observeClanAgent(); } },
      { id: 'interim_ignore', text: 'This is not your matter. Move on.', tag: 'safe',
        action: function() { ignoreHook(); } }
    ]);
  }

  function investigateRegistry() {
    var G = window.G;
    var r = rollD20('wits');
    if (r.success) {
      G.lastResult = 'The dockworker — Gerrit, he says — is not the first to notice. Three other operators have the same problem. All from the same macroregion route. All registered under the same output code. The code traces to a processing clerk named Ossa Vonn who has been reassigned twice in six months.';
      G.flags.interim_seat_lead_found = true;
      G.investigationProgress = Math.max(G.investigationProgress || 0, 3);
    } else {
      G.lastResult = 'The dockworker is worried about official reprisal and speaks in fragments. You get an output code and a name — Ossa Vonn — before he shuts down and walks away. It is something.';
      G.flags.interim_seat_lead_found = true;
    }
    window.addJournal('investigation', G.lastResult);
    setTimeout(showResolution, 400);
  }

  function observeClanAgent() {
    var G = window.G;
    G.lastResult = 'The man in the clan coat — Vorrk clan markings, third-tier by the weave — makes a quiet note in a small book, then leaves. He does not interact with the clerk. He did not need to. Whatever he came to verify, he verified it.';
    G.flags.interim_seat_clan_agent_observed = true;
    window.addJournal('investigation', G.lastResult);
    setTimeout(showResolution, 400);
  }

  function ignoreHook() {
    var G = window.G;
    G.lastResult = 'You move on. The argument continues behind you.';
    G.flags.sideplot_interim_seat_skipped = true;
    if (typeof checkStageAdvance === 'function') checkStageAdvance();
  }

  function showResolution() {
    (window._rawRenderChoices || window.renderChoices)([
      { id: 'interim_expose', text: 'Take the evidence to the Soreheim registry oversight office — make it official.', tag: 'risky',
        action: function() { resolveExpose(); } },
      { id: 'interim_correct', text: 'Quietly correct the ledger entry through a sympathetic clerk.', tag: 'bold',
        action: function() { resolveCorrect(); } },
      { id: 'interim_confront', text: 'Confront the Vorrk agent directly — demand a formal accounting.', tag: 'risky',
        action: function() { resolveConfront(); } }
    ]);
  }

  function resolveExpose() {
    var G = window.G;
    G.lastResult = 'The oversight office receives your evidence with bureaucratic gravity. A formal inquiry is opened. Gerrit gets his ledger corrected. Ossa Vonn is transferred again. The Vorrk clan agent you observed does not appear in the registry. The correction will hold — for now.';
    G.worldClocks = G.worldClocks || {};
    G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 2;
    G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 2;
    G.flags.sideplot_interim_seat_complete = true;
    G.flags.interim_seat_resolution = 'exposed';
    _close();
  }

  function resolveCorrect() {
    var G = window.G;
    G.lastResult = 'The clerk — a young woman who clearly understands exactly what she has been participating in — makes the correction quietly and thanks you in a way that suggests she has been waiting for someone to give her a reason to. The record is right. Nobody is watching.';
    G.investigationProgress = (G.investigationProgress || 0) + 1;
    G.flags.sideplot_interim_seat_complete = true;
    G.flags.interim_seat_resolution = 'corrected';
    _close();
  }

  function resolveConfront() {
    var G = window.G;
    var r = rollD20('charm');
    if (r.success) {
      G.lastResult = 'The Vorrk agent is pragmatic. When you lay out what you know and who else knows it, he produces a written acknowledgment that the records will be corrected. Quiet. Efficient. He does not thank you. You were not expecting him to.';
      G.worldClocks = G.worldClocks || {};
      G.worldClocks.rival = Math.max(0, (G.worldClocks.rival || 0) - 1);
    } else {
      G.lastResult = 'The agent listens without acknowledgment, produces nothing, and files a counter-complaint with the registry office naming you as a disruptive outside interest. The records remain uncorrected. You have made an enemy in the quota office.';
      G.worldClocks = G.worldClocks || {};
      G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
    }
    G.flags.sideplot_interim_seat_complete = true;
    G.flags.interim_seat_resolution = 'confronted';
    _close();
  }

  function _close() {
    var G = window.G;
    window.addJournal('investigation', G.lastResult);
    if (typeof updateHUD === 'function') updateHUD();
    if (typeof checkStageAdvance === 'function') checkStageAdvance();
  }

  return { openingHook: openingHook };
})();

window.SOREHEIM_STAGE1 = SOREHEIM_STAGE1;
