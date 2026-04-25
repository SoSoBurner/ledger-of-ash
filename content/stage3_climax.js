window.STAGE3_CLIMAX = (function() {

  function _roll(skill, dc) {
    var result = rollD20(skill);
    return { success: result.total >= dc, isCrit: result.isCrit, isFumble: result.isFumble, total: result.total };
  }

  // Phase 1 — The Appointment
  function phase1() {
    var opener = (G.flags && G.flags.stage3_threat_received)
      ? 'The handwriting from the transit fee receipt — the letter that named three things you did — appears again, this time on a plain envelope left at the washhouse on Cordwainer Row. Inside: a room number at the Weavers\' Hall lodging house, a time two hours before morning bell, and one instruction: \'Come without the journal.\' Whoever sent this knows you keep one. They have been counting what you carry as well as what you do.'
      : 'A plain envelope arrives at the washhouse on Cordwainer Row — a location used for receiving messages, known to very few. Inside: a room number at the Weavers\' Hall lodging house, a time two hours before morning bell, and one instruction: \'Bring nothing written.\' The handwriting is even and unhurried, the kind that comes from copying documents for years rather than composing them.';

    G.lastResult = opener;
    G.recentOutcomeType = 'complication';

    (window._rawRenderChoices || window.renderChoices)([
      {
        id: 'climax3_p1_open',
        text: 'He knows too much to be surprised by my name. I go openly.',
        action: function() { phase1_open(); }
      },
      {
        id: 'climax3_p1_guarded',
        text: 'I go, but I am no one until I hear what he has.',
        action: function() { phase1_guarded(); }
      },
      {
        id: 'climax3_p1_early',
        text: 'Arriving before the appointed time is the only preparation I can make.',
        action: function() { phase1_early(); }
      }
    ]);
  }

  function phase1_open() {
    var r = _roll('charm', 13);
    if (r.success) {
      G.lastResult = 'The man who opens the door is perhaps fifty, carrying himself the way people carry a thing they have held too long. He looks at you without surprise — he was expecting you to come as yourself. "Good," he says, and steps back from the door. "I had to know whether you were the kind of person who could." He does not explain what he means. He closes the door and moves to the table without waiting for an answer.';
      G.flags.stage3_voss_reassured = true;
      G.recentOutcomeType = 'success';
    } else {
      G.lastResult = 'The man who opens the door takes a long moment reading your face. He says nothing. Then he steps aside, which you take as an invitation, though his expression remains unreadable. A single candle on the table. Two chairs. He sits in the one closer to the door and does not speak until you sit in the other.';
      G.recentOutcomeType = 'partial';
    }
    addJournal(G.lastResult, 'intelligence');
    phase2();
  }

  function phase1_guarded() {
    var r = _roll('finesse', 12);
    if (r.success) {
      G.lastResult = 'You give him a name that is not yours. He writes nothing down. After a moment he says: "I didn\'t ask your name. I know your work." He slides a folded document across the table — a page from a transit manifest, a section you cross-referenced three weeks ago, your specific notation in the margin. He has a copy of something you believed was in a sealed file. "We have been reading the same record," he says. "For longer than either of us planned."';
      G.flags.stage3_voss_knows_work = true;
      G.recentOutcomeType = 'success';
    } else {
      G.lastResult = 'He clocks the false name immediately — not because he reacts, but because he doesn\'t. He simply sets a page on the table and waits. The page is from the Ironhold manifest pull, your specific notation in the margin. "I didn\'t need you to tell me who you are," he says quietly. "I needed to know whether you would." He folds his hands and waits for you to decide what comes next.';
      G.recentOutcomeType = 'partial';
    }
    addJournal(G.lastResult, 'intelligence');
    phase2();
  }

  function phase1_early() {
    var r = _roll('vigor', 12);
    if (r.success) {
      G.lastResult = 'You arrive forty minutes before the time given and watch the street from the lane behind the dye works. Three people pass. One is a transit runner on a standard post round. One is a woman with a charter notary\'s guild mark on her sleeve. The third stops at the corner, checks the time, moves on. None of them look at the Weavers\' Hall. When you go up, the man inside shows no surprise at your silence. He was watching the same street from a different window.';
      G.flags.stage3_voss_mutual_surveillance = true;
      G.recentOutcomeType = 'success';
      if (r.isCrit) { G.lastResult += ' On the table beside his materials: a second cup of tea, already poured and still warm. He was expecting you early.'; }
    } else {
      G.lastResult = 'You take up a position in the lane behind the dye works. Someone else is already there — a man in a grey coat who gives you a patient look and then walks away without a word. You are not the only one watching the building. When you go up at the appointed time, the man inside simply nods. "I saw you in the lane," he says. "I\'m glad you came anyway." He does not say who the other man was.';
      G.worldClocks = G.worldClocks || {};
      G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
      G.recentOutcomeType = 'partial';
    }
    addJournal(G.lastResult, 'intelligence');
    phase2();
  }

  // Phase 2 — The Accounting
  function phase2() {
    G.lastResult = 'He sets a bound volume on the table — a claims ledger, the kind the Collegium issues to subsidiary offices. Before he speaks, he smooths the top edge of the pages with two fingers, an archivist\'s reflex checking for damage that isn\'t there. The pages inside are not claims. They are a cross-reference: manifests, route exemptions, charter addenda, registry removals. Every thread you have been pulling, mapped back to a single administrative mechanism that should not exist. "I have been building this for eleven years," he says. "Someone inside the Collegium is about to destroy my copy. You are the only person outside these walls who has been reading the same record I have." He pushes the volume across the table. His hands are steady. That steadiness tells you something about how long he has been afraid.';
    G.recentOutcomeType = 'discovery';
    G.investigationProgress = Math.max(G.investigationProgress || 0, 15);
    G.flags.stage3_accounting_revealed = true;
    addJournal('Collegium Keeper Ander Voss produced eleven-year shadow record cross-referencing manifest anomalies, charter addenda, and registry removals — all mapping to a single administrative mechanism. Record at risk of internal destruction.', 'evidence');
    if (typeof updateHUD === 'function') updateHUD();
    setTimeout(phase3, 400);
  }

  // Phase 3 — The Handoff
  function phase3() {
    G.lastResult += '\n\nVoss stands and moves to the window. Below, the street is unchanged. "I have two hours before the Collegium\'s Records Division sends someone to my lodgings," he says. "After that, anything I still hold becomes a liability for both of us. Decide what you want to do with it."';

    (window._rawRenderChoices || window.renderChoices)([
      {
        id: 'climax3_p3_carry',
        text: 'The record survives if I carry it. That is all that matters now.',
        action: function() { phase3_carry(); }
      },
      {
        id: 'climax3_p3_expose',
        text: 'Voss has standing I don\'t. Together this goes further than either of us alone.',
        action: function() { phase3_expose(); }
      },
      {
        id: 'climax3_p3_mediate',
        text: 'There is someone who can hold this without being destroyed by it.',
        action: function() { phase3_mediate(); }
      }
    ]);
  }

  function phase3_carry() {
    var r = _roll('vigor', 14);
    G.flags.stage3_climax_resolution = 'carry';
    if (r.success) {
      G.lastResult = 'You take the volume. Voss says nothing when you leave — he is already clearing the table, reducing what he holds to nothing traceable. You move through three neighborhoods before dawn, not by any route you have used before. The volume is a weight in your pack that is not its physical weight. By morning you are outside the city limits with a document that maps eleven years of the same mechanism you have been piecing together from fragments. The fragments now have a spine.';
      G.flags.stage3_record_secured = true;
      G.recentOutcomeType = 'success';
      if (r.isCrit) { G.lastResult += ' In the back pages, one entry in a different hand — dated nineteen years ago, before Voss began his work. Someone else was counting before him.'; }
      if (typeof window.addWorldNotice === 'function') window.addWorldNotice('The accounting is outside the Collegium\'s reach. What you carry determines what comes next.');
    } else {
      G.lastResult = 'You take the volume. Two streets from the Weavers\' Hall, a grey-coated man falls into step behind you — not closing, not threatening, simply present. You take four redirects and he is still there. By the time you reach the safehouse, the volume is intact but the route to it is compromised. You spend the rest of the night moving it again. Whatever Voss did with his remaining materials, he did it without telling you.';
      G.worldClocks = G.worldClocks || {};
      G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 2;
      G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
      G.flags.stage3_record_secured = true;
      G.recentOutcomeType = 'partial';
      if (typeof window.addWorldNotice === 'function') window.addWorldNotice('You have the record. Someone knows you have it.');
    }
    _closeClimax();
  }

  function phase3_expose() {
    var r = _roll('wits', 15);
    G.flags.stage3_climax_resolution = 'expose';
    if (r.success) {
      G.lastResult = 'Voss has a relationship with the Merchant Assembly\'s charter review committee that you do not — standing, a decade of filings, a name the clerk at the archive reading room recognizes. Together, the record reaches three committee members before the Collegium\'s internal move against Voss can be actioned. The committee does not publish findings. They do not name the mechanism. They open an inquiry. That is enough — inquiries have their own momentum, and this one begins with eleven years of source material.';
      G.flags.stage3_inquiry_opened = true;
      G.recentOutcomeType = 'success';
      if (typeof window.addWorldNotice === 'function') window.addWorldNotice('A charter review inquiry has opened. The mechanism is under examination without a name.');
    } else {
      G.lastResult = 'Voss makes the approach to the committee directly, as discussed. The committee member he trusted has been replaced — a new clerk, new preconditions for receiving unsolicited record submissions. The volume does not reach the archive. Voss is stopped at the gate on a procedural hold. The record is not destroyed, but it is not free either. He sends word from wherever he is being held: the volume is in the Collegium\'s possession. He is not.';
      G.worldClocks = G.worldClocks || {};
      G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 2;
      G.recentOutcomeType = 'complication';
      if (typeof window.addWorldNotice === 'function') window.addWorldNotice('Voss is detained. The accounting is back inside the Collegium.');
    }
    _closeClimax();
  }

  function phase3_mediate() {
    var usesOrveth = G.flags && G.flags.stage2_climax_inquisitor_contact;
    var r = usesOrveth ? _roll('charm', 12) : _roll('charm', 15);
    G.flags.stage3_climax_resolution = 'mediate';
    if (r.success) {
      if (usesOrveth) {
        // Acknowledge the Stage 2 inquisitor contact payoff
        var contact_acknowledgment = 'Orveth sends word before the meeting — a single line through the Collegium channel, acknowledging what you both know she knows. It shifts the weight of what you are walking into.';
        G.lastResult = contact_acknowledgment + ' Orveth receives the volume at a secondary location she nominates by message the same evening — a small charter filing room on the third floor of the Assessors\' Hall, after hours. She reads the index standing, without sitting. She does not look up until she finishes. "He built this outside authorized channels," she says. "That means it cannot be suppressed the same way the authorized records can." She sets the volume on the desk between you. "I need three days. Keep Voss outside Shelkopolis." She has already decided something. You were not consulted.';
        G.flags.stage3_orveth_holds_record = true;
        G.recentOutcomeType = 'success';
        if (typeof window.addWorldNotice === 'function') window.addWorldNotice('Orveth holds the accounting. Her reasons are still her own.');
      } else {
        G.lastResult = 'The neutral party you find is a Collegiate Law notary — old enough to pre-date the current Collegium structure, holding an independent registration that places her technically outside Collegium jurisdiction on matters of record preservation. She takes the volume with both hands and examines the binding before reading a word. "A shadow ledger," she says, and it is not a question. She asks for two days and a name she can use as a point of return if things move quickly.';
        G.flags.stage3_notary_holds_record = true;
        G.recentOutcomeType = 'success';
        if (typeof window.addWorldNotice === 'function') window.addWorldNotice('The accounting is with a neutral party. The Collegium will look for it.');
      }
    } else {
      G.lastResult = 'The approach to a neutral party does not succeed — not because you are refused, but because the timing collapses. Voss\'s two-hour window closes before the meeting can be arranged. He makes his own decision with the volume, which he does not share with you. What you know: the record exists. What you don\'t: where it is, or whether it is still intact. You are left with your own notes and the shape of something that has no name in any document you can currently reach.';
      G.worldClocks = G.worldClocks || {};
      G.worldClocks.rival = (G.worldClocks.rival || 0) + 1;
      G.recentOutcomeType = 'complication';
      if (typeof window.addWorldNotice === 'function') window.addWorldNotice('The record\'s location is unknown. You have the shape of the mechanism and nothing more.');
    }
    _closeClimax();
  }

  function _closeClimax() {
    G.flags.stage3_climax_complete = true;
    G.stageProgress = G.stageProgress || {};
    G.stageProgress[3] = Math.max(G.stageProgress[3] || 0, 20);
    if (typeof updateHUD === 'function') updateHUD();
    if (typeof checkStageAdvance === 'function') checkStageAdvance();
  }

  function trigger() {
    if (!G || G.flags.stage3_climax_complete || G.flags.stage3_climax_started) return;
    G.flags.stage3_climax_started = true;
    phase1();
  }

  return { trigger: trigger };

})();
