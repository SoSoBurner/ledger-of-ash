// Stage II Mini-Boss Encounter
// Customs Senior Auditor Dravn Pell — triggers at stageProgress[2] >= 8
// Institutional confrontation: no combat, DC 14 skill checks

var STAGE2_BOSS_NPC_MINIBOSS = 'customs_senior_auditor_dravn_pell';

// Seed choices — inject into enriched choice pool during Stage II play
var STAGE2_MINIBOSS_SEED_CHOICES = [
  {
    id: 'stage2_boss_seed_1',
    text: 'The same signature appears in four separate manifest bundles. That\'s not coincidence.',
    tag: 'risky',
    skill: 'lore',
    dc: 12,
    locality: null,
    stageMin: 'Stage II',
    onSuccess: function() {
      G.flags.stage2_miniboss_seed_seen = true;
      addNarration('A Recurring Hand', 'Four manifest bundles from three separate transit routes — different localities, different cargo officers, different dates. The same signature on each audit sign-off: D. Pell, Senior Auditor, Transit Verification Division. The handwriting is careful, the kind that was practiced. The fourth bundle is the problem: the route it covers was under informal scrutiny when the audit was filed. Someone authorized a clean record on a route that was not clean.');
      addJournal('Auditor signature D. Pell appears across four transit manifests from disparate routes — including one under active scrutiny at time of filing. The audits closed cleanly.', 'evidence');
    },
    onFail: function() {
      addNarration('', 'The manifest bundles are dense with cross-references. Whatever pattern the signatures form, it does not surface cleanly before the stack is returned to the clerk.');
    }
  },
  {
    id: 'stage2_boss_seed_2',
    text: 'That Collegium badge doesn\'t match the post assignment for this route. Someone followed me here.',
    tag: 'risky',
    skill: 'stealth',
    dc: 12,
    locality: null,
    stageMin: 'Stage II',
    onSuccess: function() {
      G.flags.stage2_miniboss_seed_seen = true;
      addNarration('The Wrong Badge', 'The man in the Transit Verification livery is standing near the manifest board, not at it. His badge shows Division III — the Shelkopolis central district office. This is a regional post, covered under Division VII. He is not here on scheduled assignment. He does not look up when you clock him, but his hand moves to the satchel at his side and stays there. He arrived three hours before you did, which means someone told him you were coming.');
      addJournal('A Transit Verification auditor — Division III, Shelkopolis — appeared at a regional locality post with no Division III jurisdiction. His presence predates mine by three hours.', 'intelligence');
    },
    onFail: function() {
      addNarration('', 'The badge catches the light but the division number is turned away. By the time you get an angle on it, the man has moved to the far end of the board.');
    }
  }
];

// Phase 1 — The Summons
function _pell_phase1() {
  if (!G || G.flags.stage2_miniboss_complete) return;
  G.flags.stage2_miniboss_started = true;

  addNarration('Transit Verification Inquiry — Form 14-C', 'The form arrives folded inside a courier sleeve, delivered to your lodgings before the morning shift change. It is formal, pre-printed, and precise: the Transit Verification Division of the Oversight Collegium requests the bearer present their travel documentation, source notes, and any materials gathered in connection with routes currently under active audit. A time is listed. A room number. Signed at the bottom in the same careful hand from the manifest bundles: D. Pell, Senior Auditor. He laid his pen flat after signing it — the ink pressed cleanly, without a drag mark. He expected this form to be delivered.');

  var choices = [
    {
      text: 'The form is real. Refusing escalates this in ways I can\'t predict.',
      tag: 'safe',
      skill: 'lore',
      action: function() {
        addNarration('', 'The room is a third-floor transit office, clean and unremarkable. Pell is already seated when you arrive. He does not stand. The inquiry form you were sent sits face-down on the desk in front of him — he received his copy before you got yours. He waits for you to sit, then turns it over and reads it, as though he has not already read it twice. "Thank you for coming in a timely manner," he says. "Pursuant to the Division\'s current audit scope, I have a few procedural questions." His hands are folded on the desk. Nothing about him is rushed.');
        G.flags.stage2_miniboss_p1_complied = true;
        setTimeout(_pell_phase2, 900);
      }
    },
    {
      text: 'I can comply and give him nothing useful.',
      tag: 'risky',
      skill: 'stealth',
      action: function() {
        var roll = rollD20('stealth');
        var dc = 13;
        if (roll.total >= dc) {
          addNarration('', 'You arrive with a thinned version of your materials — routes you have already closed, manifests with nothing live in them, notes stripped to the administrative. Pell receives the stack without expression and lays it face-down on his desk before looking at it. He spends four minutes with the documents. Then he squares them and sets them aside. "I appreciate your cooperation. In accordance with standard procedure, I will note that the materials provided were reviewed and found consistent with declared transit activity." He says it the way a person says something they will not believe later.');
          G.flags.stage2_miniboss_p1_deflected = true;
        } else {
          addNarration('', 'Pell takes the stack and lays it face-down before reading. He works through it slowly. On the third document he pauses — only for a moment, but the pause is deliberate. "This route notation," he says, turning the page over and setting it square on the desk between you. "The date here and the manifest date I have on file are not consistent with each other." He looks at you without urgency. He had this discrepancy before you walked in.');
          G.worldClocks = G.worldClocks || {};
          G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
          G.flags.stage2_miniboss_p1_caught = true;
        }
        setTimeout(_pell_phase2, 900);
      }
    },
    {
      text: 'An inquiry form is not a warrant. I don\'t have to move on his timeline.',
      tag: 'risky',
      skill: 'survival',
      action: function() {
        var roll = rollD20('survival');
        var dc = 13;
        if (roll.total >= dc) {
          addNarration('', 'You do not appear at the listed time. Three days pass — no follow-up form, no courier. On the fourth morning a revised notice arrives: the inquiry window has been extended by ten days, the room number changed. Pell gave you space deliberately. He is not running on your clock and he is letting you know it. But the ten days exist, and the routes are quieter while they run.');
          G.flags.stage2_miniboss_p1_delayed = true;
          G.dayCount = (G.dayCount || 0) + 4;
          if (typeof updateHUD === 'function') updateHUD();
        } else {
          addNarration('', 'The delay costs more than the meeting would have. By the second day without response a Division Liaison appears at your lodgings — not Pell, someone younger, holding a second form. "Senior Auditor Pell asks that I note your non-appearance in the intake log," she says. She is apologetic about it. The log notation is not. The inquiry window shortens; the paper trail thickens.');
          G.worldClocks = G.worldClocks || {};
          G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 2;
          G.flags.stage2_miniboss_p1_failed_delay = true;
        }
        setTimeout(_pell_phase2, 900);
      }
    }
  ];

  setTimeout(function() { renderChoices(choices); }, 600);
}

// Phase 2 — The Meeting
function _pell_phase2() {
  if (G.flags.stage2_miniboss_p2_started) return;
  G.flags.stage2_miniboss_p2_started = true;
  if (G.flags.stage2_miniboss_p1_delayed) {
    // Delayed path: meeting happens ten days later
    addNarration('', 'The rescheduled meeting. Pell\'s office is the same room, the same layout. He receives you without comment about the delay and lays the inquiry form face-down before reading it — he has a fresh copy. He lays his pen flat beside it before he speaks, the nib toward him, a small reset he performs before every sentence that matters. "Pursuant to the extended window, we can proceed." He opens a second folder while his hand still rests on the inquiry form. Inside: a cross-referenced route summary. His. "A former associate of yours has been quite cooperative," he says. The word \'associate\' is careful, chosen. He means Seld. He does not say Seld\'s name.');
  } else if (G.flags.stage2_miniboss_p1_caught) {
    addNarration('', 'Pell keeps the flagged document square between you. He lays his pen flat on the desk before speaking — nib toward him, a reset he performs before every sentence that carries weight. "In accordance with our review procedures, I want to be direct with you." He opens a second folder and sets it beside the form — face-down, then turned over. A cross-referenced summary of your transit activity, annotated in his handwriting. "A former associate of yours has been cooperative. Their account of your movements is consistent with what I have here." He says it without inflection. He means it as a threat and he means it to sound like procedure.');
  } else {
    addNarration('', 'Pell has evidence — not the kind that closes a case, but the kind that opens one. A cross-referenced summary of route timings, manifest dates, and inquiry filings. He sets it on the desk face-down before turning it toward you, then lays his pen flat beside the stack — nib toward him, unhurried. He does this before every sentence that matters. "In accordance with standard review, I want to be transparent about the scope of this inquiry." He pauses. "A former associate of yours has been quite cooperative." He does not say the name. He does not need to. He means Seld, and the weight he puts on \'cooperative\' is the only inflection he has allowed himself. The file he was assigned to close was yours — and he was assigned before any formal complaint was filed.');
  }

  var resChoices = [
    {
      text: 'He was assigned before any complaint existed. That\'s the thread that unravels him.',
      tag: 'bold',
      skill: 'lore',
      action: function() { _pell_resolve_expose(); }
    },
    {
      text: 'Give him a clean exit. He closes the file; I keep working beneath his notice.',
      tag: 'risky',
      skill: 'persuasion',
      action: function() { _pell_resolve_negotiate(); }
    },
    {
      text: 'Leave Shelkopolis. Let his inquiry window expire without a target.',
      tag: 'safe',
      skill: 'survival',
      action: function() { _pell_resolve_disappear(); }
    }
  ];

  setTimeout(function() { renderChoices(resChoices); }, 700);
}

// Resolution A — Expose the irregular assignment
function _pell_resolve_expose() {
  var roll = rollD20('lore');
  var dc = 15;
  if (roll.total >= dc) {
    addNarration('A Procedural Irregularity', 'You lay it out for him without raising your voice, which is the only register he respects. His assignment was filed three days before the formal complaint that would have justified it. You name the date discrepancy. You name the division log that would show it. His hands stop moving on the folder. For the first time in the meeting he looks at the desk surface rather than at you — not the inquiry form, just the wood. He says nothing for a long moment. Then: "Pursuant to the division\'s review calendar, this inquiry will be closed as inconclusive." He means it. He stands, which is your signal to leave. He does not offer his hand.');
    addJournal('Pell\'s assignment predated the formal complaint by three days — confirmed and named to his face. He closed the inquiry on the spot. His exposure as an irregular appointment means he cannot escalate without surfacing his own irregularity.', 'evidence');
    G.flags.stage2_miniboss_resolution = 'expose';
    G.worldClocks = G.worldClocks || {};
    G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
  } else {
    addNarration('', 'The dates are there but you cannot hold them cleanly under pressure — the division log, the complaint file, the assignment chain. Pell watches you lay the argument out and waits until you stop. He lays his pen flat before he answers. "In accordance with division procedure, assignment timing is an administrative matter, not subject to external review." His voice has not changed once in this meeting. He closes the folder and sets the pen across the top of it — done. "I will note your concern. The inquiry remains open."');
    G.worldClocks = G.worldClocks || {};
    G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 2;
    G.flags.stage2_miniboss_resolution = 'expose_failed';
    // Still closes out — he\'s been warned off even if not fully neutralized
  }
  _closeMiniboss();
}

// Resolution B — Negotiate a quiet closure
function _pell_resolve_negotiate() {
  var roll = rollD20('persuasion');
  var dc = 14;
  if (roll.total >= dc) {
    addNarration('A Filed Understanding', 'You give him the shape of a deal without calling it one. You will not enter the Division\'s restricted records sections. You will not file anything that names the Division as a party to the pattern you have been tracing. In return he will close the inquiry as inconclusive and remove the watchfulness notation from your transit file. He listens to all of it. He lays his pen down parallel to the desk edge before he answers. "Pursuant to the terms you have outlined, I can confirm the inquiry will be filed as resolved." He will hold to it. He is a proceduralist — the agreement is now a procedure, and procedures are what he maintains.');
    addJournal('Negotiated a quiet closure with Pell: I stay out of Division records sections; he closes the inquiry and clears the notation. He will hold to it — it is filed and procedures are what he maintains.', 'intelligence');
    G.flags.stage2_miniboss_resolution = 'negotiate';
  } else {
    addNarration('', 'He listens to the offer and says nothing for a beat. Then he opens the inquiry form and makes a notation in the margin — a small one, in his careful hand. "I appreciate the clarity of your position. In accordance with current procedures, the inquiry will remain active for the standard review period." He does not look up from the notation. He was not interested in a deal. He was taking notes on the offer.');
    G.worldClocks = G.worldClocks || {};
    G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
    G.flags.stage2_miniboss_resolution = 'negotiate_failed';
  }
  _closeMiniboss();
}

// Resolution C — Leave and let the window expire
function _pell_resolve_disappear() {
  var roll = rollD20('survival');
  var dc = 13;
  if (roll.total >= dc) {
    addNarration('Absent from the Record', 'You are outside Shelkopolis before the review window closes. A week in a transit post, two in a regional locality, work that does not touch the routes Pell is watching. When you return the inquiry has been logged as inactive — subject unavailable for interview, file suspended pending re-contact. Pell\'s name is still on it. He is still watching, in the way that a bureaucrat watches: patiently, at no personal cost, waiting for the subject to reappear in the manifest logs. But the window cost him something. He had to file a suspension. His supervisor will have read it.');
    addJournal('Left Shelkopolis for the inquiry window. Pell\'s file is now logged as suspended — inactive, not closed. He is still watching, but the suspension is on his record now too.', 'intelligence');
    G.flags.stage2_miniboss_resolution = 'disappear';
    G.dayCount = (G.dayCount || 0) + 14;
    if (typeof updateHUD === 'function') updateHUD();
  } else {
    addNarration('', 'The transit routes back into Shelkopolis have more checkpoint activity than usual. Three days out, a Division courier finds you at the post — formally, with a stamped re-notification. The inquiry window has been extended and a mandatory appearance date set. Pell filed a pursuit notation. He anticipated the exit.');
    G.worldClocks = G.worldClocks || {};
    G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 2;
    G.dayCount = (G.dayCount || 0) + 3;
    G.flags.stage2_miniboss_resolution = 'disappear_failed';
    if (typeof updateHUD === 'function') updateHUD();
  }
  _closeMiniboss();
}

function _closeMiniboss() {
  G.flags.stage2_miniboss_complete = true;
  G.stageProgress[2] = (G.stageProgress[2] || 0) + 2;
  if (typeof checkStageAdvance === 'function') {
    setTimeout(checkStageAdvance, 400);
  }
  setTimeout(function() {
    if (typeof resolveArrival === 'function') resolveArrival(G.location);
  }, 1200);
}

// Trigger check — called from checkStageAdvance
function checkTrigger() {
  if (!G) return;
  if (!G.flags.stage2_miniboss_complete &&
      !G.flags.stage2_miniboss_started &&
      ((G.stageProgress && G.stageProgress[2]) || 0) >= 8 &&
      G.flags.stage2_miniboss_seed_seen) {
    setTimeout(_pell_phase1, 500);
  }
}

function triggerMiniBoss() {
  _pell_phase1();
}

window.STAGE2_BOSS_MODULE = {
  triggerMiniBoss: triggerMiniBoss,
  checkTrigger: checkTrigger,
  seedChoices: STAGE2_MINIBOSS_SEED_CHOICES
};
