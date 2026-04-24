var SOREHEIM_STAGE1 = (function() {
  function openingHook() {
    
    if (!G || G.flags.sideplot_interim_seat_started) return;
    G.flags.sideplot_interim_seat_started = true;

    G.lastResult = 'The weigh-station smells of stone dust and coal smoke. A dockworker is at the clerk\'s counter, his hands flat on the ledger page as if holding it in place. "Two weeks. Forty-three verified loads. I have the gate stamps." The clerk keeps his pen moving across a different page and does not look up. At a bench near the door, a man in a coat with Vorrk clan markings — third-tier by the weave — makes a small note in a pocket book and watches without participating.';
    addJournal(G.lastResult, 'evidence');
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
    
    var r = rollD20('wits');
    if (r.success) {
      G.lastResult = 'The dockworker\'s name is Gerrit and he has been patient about this for eleven days, which is longer than most people manage with the registry office. He is not alone in this — three other operators on the same macroregion route have the same gap in the same ledger. All four loads registered under the same output code. Gerrit has already tracked the code back to a processing clerk named Ossa Vonn. Vonn has been reassigned twice in six months, each time to a different station, each time lateral rather than promotional.';
      G.flags.interim_seat_lead_found = true;
      G.investigationProgress = Math.max(G.investigationProgress || 0, 3);
    } else {
      G.lastResult = 'Gerrit watches the Vorrk agent\'s back until he is through the door, then turns to you and speaks quickly. An output code. A name — Ossa Vonn — and then he is done talking. He picks up his stamp sheets and leaves before you can ask anything else. It is not much. It is a name and a code, which is more than the ledger has.';
      G.flags.interim_seat_lead_found = true;
    }
    addJournal(G.lastResult, 'evidence');
    setTimeout(showResolution, 400);
  }

  function observeClanAgent() {
    
    G.lastResult = 'The Vorrk agent does not speak to the clerk and does not approach the counter. He watches the exchange from his bench, writes three lines in his pocket book, and stands. He takes a route toward the side exit that does not pass the counter. The clerk\'s pen keeps moving the whole time. Whatever the agent needed to confirm, the argument itself was enough.';
    G.flags.interim_seat_clan_agent_observed = true;
    addJournal(G.lastResult, 'evidence');
    setTimeout(showResolution, 400);
  }

  function ignoreHook() {
    
    G.lastResult = 'You walk past the counter and out the door. Behind you, Gerrit is still talking and the clerk is still not answering.';
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
    
    G.lastResult = 'The oversight clerk copies your evidence twice, initials both copies, and opens a formal inquiry file in front of you. Three days later, Gerrit\'s ledger entry is corrected. Ossa Vonn receives a third reassignment. The Vorrk agent who watched from the bench does not appear anywhere in the inquiry record. The correction stands in the book. What it cost to put it there is a different calculation.';
    G.worldClocks = G.worldClocks || {};
    G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 2;
    G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 2;
    G.flags.sideplot_interim_seat_complete = true;
    G.flags.interim_seat_resolution = 'exposed';
    _close();
  }

  function resolveCorrect() {
    
    G.lastResult = 'The clerk is young and makes the correction without being asked twice. She writes the new entry in careful script, blots it, and slides the book closed. "It should have been right the first time," she says, which is not quite the same as thanking you. The record is corrected. No one in the oversight office sees it happen.';
    G.investigationProgress = (G.investigationProgress || 0) + 1;
    G.flags.sideplot_interim_seat_complete = true;
    G.flags.interim_seat_resolution = 'corrected';
    _close();
  }

  function resolveConfront() {
    
    var r = rollD20('charm');
    if (r.success) {
      G.lastResult = 'The Vorrk agent listens without expression and does not interrupt. When you finish, he takes thirty seconds to weigh it, then produces a written acknowledgment from his coat pocket — pre-drafted, as if he came prepared for this resolution. The records will be corrected by end of week. He folds his own copy and leaves. He does not offer his name.';
      G.worldClocks = G.worldClocks || {};
      G.worldClocks.rival = Math.max(0, (G.worldClocks.rival || 0) - 1);
    } else {
      G.lastResult = 'The agent stands with his hands at his sides and does not write anything down. When you finish, he picks up his coat from the chair. Two days later, a counter-complaint arrives at the registry office naming you as an outside disruptive interest interfering with a pending quota review. The ledger stays wrong. Gerrit stops returning greetings when he sees you near the weigh-station.';
      G.worldClocks = G.worldClocks || {};
      G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
    }
    G.flags.sideplot_interim_seat_complete = true;
    G.flags.interim_seat_resolution = 'confronted';
    _close();
  }

  function _close() {
    
    addJournal(G.lastResult, 'evidence');
    if (typeof updateHUD === 'function') updateHUD();
    if (typeof checkStageAdvance === 'function') checkStageAdvance();
  }

  return { openingHook: openingHook };
})();

window.SOREHEIM_STAGE1 = SOREHEIM_STAGE1;
