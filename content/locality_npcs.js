// content/locality_npcs.js
// Per-locality tavern/shop NPC conversations — Task C2
// Each entry: npcId, name, role, tell, agenda, register, dialogue[]
// Dialogue choices follow enriched choice format: id, text, skill, tag, dc, result, failResult, effects[]

window.LOCALITY_NPCS = {

  shelkopolis: {
    tavern: {
      npcId: 'harvin_stoke',
      name: 'Harvin Stoke',
      role: 'Innkeeper, The Broken Axle',
      tell: 'wipes the same spot on the bar three times before looking up',
      agenda: "Collecting on a debt from a Guild courier who hasn't returned",
      register: 'Shelk working class — short sentences, dry humor, no eye contact with strangers',
      dialogue: [
        {
          id: 'harvin_routes',
          text: 'The closed routes. He keeps looking at the door.',
          skill: 'persuasion', tag: 'safe', dc: 7,
          result: 'Harvin wipes the bar a fourth time. "Three wagons didn\'t come through last week. Not unusual. What\'s unusual is nobody\'s asking why." He sets the cloth down. Still doesn\'t look at you. "Road warden logged them as rerouted. Rerouted to where is the part nobody\'s writing down."',
          failResult: 'Harvin shrugs. "Ask the road warden. I just pour drinks." The bar gets a fifth wipe. He\'s done talking.',
          effects: [{ type: 'journal', text: 'Harvin Stoke: three wagons absent last week, logged as rerouted — destination unrecorded', category: 'intelligence' }]
        },
        {
          id: 'harvin_courier',
          text: 'The Guild courier he keeps watching for.',
          skill: 'lore', tag: 'risky', dc: 13,
          result: 'He finally looks at you. "Fenn Oswick. Owed me fourteen marks since the winter run. Always paid. Always." He folds the cloth into a precise square. "He went out with a sealed manifest three weeks ago. Shelk east gate logged him out. Nothing since." A pause. "Sealed manifests don\'t get lost. People do."',
          failResult: 'Harvin reads you wrong — or decides he has. "I don\'t know you well enough for that conversation." He moves to the other end of the bar.',
          effects: [
            { type: 'journal', text: 'Fenn Oswick — Guild courier, missing three weeks, last seen Shelk east gate with sealed manifest', category: 'intelligence' },
            { type: 'stageProgress', stage: 1, amount: 1 }
          ]
        },
        {
          id: 'harvin_leave',
          text: 'He has nothing more for me tonight.',
          skill: 'persuasion', tag: 'safe', dc: 7,
          result: 'Harvin gives a short nod. "Drink\'s good, at least." He resumes his work. The bar gets wiped again.',
          failResult: 'You step back. Harvin doesn\'t notice.',
          effects: []
        }
      ]
    }
  },

  cosmoria: {
    tavern: {
      npcId: 'britta_archivist',
      name: 'Britta',
      role: 'Night Archivist, the Sealed Room',
      tell: 'folds and unfolds a small paper square absently while talking, never looks at it',
      agenda: 'Needs someone to quietly return a misfiled document without a record of the misfiling',
      register: 'Cosmoria institutional — precise word choice, careful about what she confirms versus what she implies',
      dialogue: [
        {
          id: 'britta_manifests',
          text: 'The manifest discrepancies she hasn\'t filed an incident report on.',
          skill: 'lore', tag: 'safe', dc: 7,
          result: 'Britta\'s paper square folds in half without her looking at it. "The third-quarter maritime logs show a tonnage variance of eleven percent across three berths. That is within tolerance — technically." She sets her drink down with care. "The variance is consistent. Same direction, same three berths, every quarter. Consistent variance is not tolerance. It is policy."',
          failResult: 'Britta gives you a careful look. "I file what I\'m asked to file." The paper square unfolds. Subject closed.',
          effects: [{ type: 'journal', text: 'Britta: maritime logs show consistent 11% tonnage variance across same three berths — not random drift', category: 'evidence' }]
        },
        {
          id: 'britta_quiet_help',
          text: 'The document that went into the wrong record. She needs it back.',
          skill: 'persuasion', tag: 'risky', dc: 13,
          result: 'The paper square stops moving. She looks at you directly for the first time. "A transit authorization. Berth seven, dated the fourteenth. It entered the wrong bundle — the one that goes to the Guild auditors in the morning." She writes nothing, hands nothing over. "The reading room opens at sixth bell. The bundle is on the left table. The misfiled page will be the one that doesn\'t match the header date." She picks up her drink. "I wasn\'t here tonight."',
          failResult: 'Britta\'s expression closes off. "I think you\'ve misread the conversation." She finishes her drink and leaves.',
          effects: [
            { type: 'journal', text: 'Britta: misfiled transit authorization for berth seven needs quiet removal before Guild audit in the morning', category: 'complication' },
            { type: 'flag', key: 'britta_document_job', value: true }
          ]
        },
        {
          id: 'britta_leave',
          text: 'She\'s given enough. Leave her to it.',
          skill: 'persuasion', tag: 'safe', dc: 7,
          result: 'Britta nods once — a small, precise motion. The paper square folds again. She\'s already elsewhere in her thoughts.',
          failResult: 'You step back. Britta doesn\'t follow.',
          effects: []
        }
      ]
    }
  },

  soreheim_proper: {
    tavern: {
      npcId: 'cort_massik',
      name: 'Cort Massik',
      role: 'Labor Gang Foreman',
      tell: 'rubs chalk dust from his palms between sentences without noticing he\'s doing it',
      agenda: 'Three of his workers have been absent four days; suspects debt collection but cannot prove it',
      register: 'Soreheim labor — short declarative sentences, numbers before feelings',
      dialogue: [
        {
          id: 'cort_workers',
          text: 'The three workers who haven\'t shown.',
          skill: 'persuasion', tag: 'safe', dc: 7,
          result: 'Cort rubs his palms together. "Vier, Tomas, and the younger Brek. Four days. Quota\'s short by eighteen units." He states this the way he\'d state a measurement. "They\'re not sick. Vier\'s never missed a shift in six years. Not once." He looks at his hands. "Something collected them."',
          failResult: 'Cort shakes his head. "Foreman business. Not a conversation for the room." He turns back to his drink.',
          effects: [{ type: 'journal', text: 'Cort Massik: workers Vier, Tomas, Brek absent 4 days — believes debt collection, not illness', category: 'intelligence' }]
        },
        {
          id: 'cort_quota',
          text: 'The quota irregularities he\'s been absorbing without reporting.',
          skill: 'lore', tag: 'risky', dc: 13,
          result: 'The chalk-rubbing stops. "Quota gets adjusted every quarter. Fine. But the adjustment order this cycle came from the procurement layer, not the site overseer." He\'s quiet for a moment. "Procurement doesn\'t set extraction quotas. That\'s not what procurement does." He looks at the door. "My workers don\'t come back, I don\'t report the irregularity. That\'s the arrangement I think someone\'s offering me." He hasn\'t agreed to it. He hasn\'t refused it either.',
          failResult: 'Cort reads something in your face he doesn\'t like. "That\'s a question for people with more standing than I\'ve got." He\'s done.',
          effects: [
            { type: 'journal', text: 'Cort Massik: quota adjustment came from procurement layer, not site overseer — outside normal chain', category: 'evidence' },
            { type: 'stageProgress', stage: 1, amount: 1 }
          ]
        },
        {
          id: 'cort_leave',
          text: 'He\'s said what he\'ll say. Walk away.',
          skill: 'persuasion', tag: 'safe', dc: 7,
          result: 'Cort nods. He rubs his palms clean one more time and picks up his drink.',
          failResult: 'You step back. Cort is already somewhere else.',
          effects: []
        }
      ]
    }
  },

  panim_haven: {
    tavern: {
      npcId: 'elda_voss',
      name: 'Elda Voss',
      role: 'Death Records Clerk, drinks after shift',
      tell: 'quotes statute numbers before finishing her own sentences',
      agenda: 'Holding a death certificate that contradicts the official record of a guild-connected merchant',
      register: 'Panim bureaucratic — formal, uses passive voice, never speculates openly',
      dialogue: [
        {
          id: 'elda_certificate',
          text: 'The death certificate she hasn\'t filed yet.',
          skill: 'lore', tag: 'safe', dc: 7,
          result: 'Elda sets her cup down. "Under Panim Ordinance 7-14, subsection — the record must match the presenting physician\'s attestation." She pauses. "The merchant Adrev Sorn is listed as deceased by cardiac arrest on the fourteenth. The certificate that arrived at my office lists a different date and a different cause. Both bear the same physician\'s seal." She says this to the table. "Two certificates cannot both be correct."',
          failResult: 'Elda\'s posture stiffens. "It would be inappropriate for me to comment on pending records." Her cup gets refilled. The subject is closed.',
          effects: [{ type: 'journal', text: 'Elda Voss: two death certificates for merchant Adrev Sorn — different dates, different cause, same physician seal', category: 'evidence' }]
        },
        {
          id: 'elda_guild',
          text: 'Which certificate the Guild would prefer to see on record.',
          skill: 'persuasion', tag: 'risky', dc: 13,
          result: 'A long pause. "It has been observed — passively, not by me — that the earlier-dated certificate would place certain estate transfers outside the contested window." She quotes nothing this time. "The later-dated certificate would place them inside it. Contested. Reversible." She looks at her hands. "I have not yet determined which certificate is correct. That determination process takes time. I am taking the time." She means she is waiting to see who comes to persuade her first.',
          failResult: 'Elda\'s face closes. "I\'m not in a position to characterize institutional preferences. Good evening." She takes her drink to the other side of the room.',
          effects: [
            { type: 'journal', text: 'Elda Voss: earlier certificate favors Guild estate transfer — she is stalling, waiting for pressure to indicate which way to file', category: 'intelligence' },
            { type: 'stageProgress', stage: 1, amount: 1 }
          ]
        },
        {
          id: 'elda_leave',
          text: 'She\'s told me what she can. Leave her with it.',
          skill: 'persuasion', tag: 'safe', dc: 7,
          result: 'Elda gives a small, formal nod. "A reasonable conclusion to the conversation." She turns back to her drink.',
          failResult: 'Elda doesn\'t look up. You leave.',
          effects: []
        }
      ]
    }
  },

  guildheart_hub: {
    tavern: {
      npcId: 'riven_ossk',
      name: 'Riven Ossk',
      role: 'Retired Enforcer, Procurement Clerk',
      tell: 'straightens items on the table into precise alignment before answering any question',
      agenda: 'Quietly documenting procurement irregularities before someone notices he noticed',
      register: 'Guild institutional — controlled, measures words, alert to exits',
      dialogue: [
        {
          id: 'riven_irregularities',
          text: 'The procurement records that don\'t add up.',
          skill: 'lore', tag: 'safe', dc: 7,
          result: 'Riven moves his cup half an inch to the right. Then his pen. Then the cup again. "Material requisitions for the eastern annex were filed in triplicate. Normal. But the third copy — the cost-ledger copy — carries a different line total than the first two." He folds his hands. "Not a rounding error. A different total. Someone changed a number between copy one and copy three." He doesn\'t say this like it surprises him. He says it like he\'s recited it to himself several times already.',
          failResult: 'Riven glances at the door, then back at you. "I\'m just a clerk." His cup gets aligned again. Done.',
          effects: [{ type: 'journal', text: 'Riven Ossk: eastern annex requisition third copy shows different line total — deliberate alteration between copies', category: 'evidence' }]
        },
        {
          id: 'riven_who_knows',
          text: 'Who else has seen what he\'s seen.',
          skill: 'persuasion', tag: 'risky', dc: 13,
          result: 'Everything on the table gets realigned. Very precisely. "The senior procurement officer reviews all three copies. That\'s the procedure." He pauses. "She countersigned the third copy." He lets that sit. "I have been making personal copies of anomalous entries for eleven days. I have not shown them to anyone. I haven\'t decided what to do with them." He looks at you with the expression of a man who has just told a stranger something he shouldn\'t have and is waiting to see what they do with it.',
          failResult: 'Riven\'s posture shifts slightly — old instinct, enforcement posture. "That\'s not a question I can answer in a public room." He picks up his things.',
          effects: [
            { type: 'journal', text: 'Riven Ossk: senior procurement officer countersigned the altered copy — Riven has been keeping personal copies for 11 days', category: 'intelligence' },
            { type: 'flag', key: 'riven_source_active', value: true },
            { type: 'stageProgress', stage: 1, amount: 1 }
          ]
        },
        {
          id: 'riven_leave',
          text: 'He\'s given more than he meant to. Step back.',
          skill: 'persuasion', tag: 'safe', dc: 7,
          result: 'Riven exhales once — controlled. "Sensible." He realigns his cup a final time and stares at the middle distance.',
          failResult: 'Riven watches you go. The table gets straightened again.',
          effects: []
        }
      ]
    }
  },

  ironhold_quarry: {
    tavern: {
      npcId: 'setta_assayer',
      name: 'Setta',
      role: 'Ore Assayer',
      tell: 'holds up one finger before answering, as if counting silently to herself first',
      agenda: 'Last three ore assays came back different from her measurements; someone is adjusting the records',
      register: 'Ironhold technical — precise, data-first, skeptical of abstractions',
      dialogue: [
        {
          id: 'setta_assays',
          text: 'The assay discrepancies. She\'s been sitting with them.',
          skill: 'lore', tag: 'safe', dc: 7,
          result: 'One finger up. "Three assays. My field measurements: 68.4, 71.2, 69.8 percent grade. Registered outputs on the ledger: 61.1, 63.4, 62.0." She sets the finger down. "That\'s not instrument drift. That\'s not rounding. That\'s a consistent seven-point reduction applied after the measurement leaves my hands." She says this flatly, the way she would report a temperature. "Someone is adjusting the grade downward before it enters the production record."',
          failResult: 'Setta holds up the finger, then puts it down without answering. "I don\'t discuss assay data outside the site office." She turns back to her drink.',
          effects: [{ type: 'journal', text: 'Setta: ore assay grades reduced by ~7 points between her measurements and the production ledger — consistent, deliberate', category: 'evidence' }]
        },
        {
          id: 'setta_records_access',
          text: 'Who has the ledger between her measurement and the final entry.',
          skill: 'persuasion', tag: 'risky', dc: 13,
          result: 'One finger. A longer pause than usual. "The field sheet goes to the site recorder. The recorder enters it into the day ledger. The day ledger goes to the production clerk for weekly consolidation." She counts these on subsequent fingers, not noticing she\'s doing it. "I have access to the field sheet only. I have never had access to the day ledger after submission." She looks at her hand. "Three people touch the number between me and the record. I\'ve been watching which of them doesn\'t make eye contact with me anymore."',
          failResult: 'Setta gives you a flat look. "That\'s a chain-of-custody question and I\'m not authorized to answer it for non-site personnel." Done.',
          effects: [
            { type: 'journal', text: 'Setta: three people handle ore data between field sheet and final ledger — one of them is avoiding her', category: 'intelligence' },
            { type: 'stageProgress', stage: 1, amount: 1 }
          ]
        },
        {
          id: 'setta_leave',
          text: 'She\'s given me the thread. Leave her alone.',
          skill: 'persuasion', tag: 'safe', dc: 7,
          result: 'One finger, briefly. Then Setta nods and turns back to her drink. The numbers are hers again.',
          failResult: 'Setta doesn\'t look up. You go.',
          effects: []
        }
      ]
    }
  }

};

// buildNPCChoices — called from loadStageChoices injection points
// Returns an array of choice objects for the current locality's tavern NPC (if present)
window.buildNPCChoices = function buildNPCChoices(locId) {
  var loc = locId || (typeof G !== 'undefined' ? G.location : '');
  if (!loc || !window.LOCALITY_NPCS || !window.LOCALITY_NPCS[loc]) return [];
  var entry = window.LOCALITY_NPCS[loc];
  var choices = [];

  if (entry.tavern) {
    var npc = entry.tavern;
    var dayKey = 'npc_talked_' + npc.npcId + '_' + ((typeof G !== 'undefined' && G.dayCount) || 0);
    if (typeof G !== 'undefined' && G.flags && G.flags[dayKey]) return [];
    var capturedNpc = npc;
    var capturedKey = dayKey;
    choices.push({
      cid: 'npc_tavern_' + loc,
      text: capturedNpc.name + '. ' + capturedNpc.tell.charAt(0).toUpperCase() + capturedNpc.tell.slice(1) + '.',
      skill: 'persuasion',
      tag: 'safe',
      dc: 7,
      plot: 'side',
      result: function() {
        if (typeof G !== 'undefined' && G.flags) G.flags[capturedKey] = true;
        if (typeof renderNPCDialogue === 'function') {
          renderNPCDialogue(capturedNpc.npcId, loc);
        }
      },
      failResult: capturedNpc.name + ' is occupied. The moment passes.',
      effects: []
    });
  }

  return choices;
};

// renderNPCDialogue — renders the NPC's dialogue tree as a choice block
window.renderNPCDialogue = function renderNPCDialogue(npcId, locality) {
  var loc = locality || (typeof G !== 'undefined' ? G.location : '');
  var lNPCs = window.LOCALITY_NPCS && window.LOCALITY_NPCS[loc];
  if (!lNPCs) return;
  var npcEntry = null;
  Object.keys(lNPCs).forEach(function(k) {
    if (lNPCs[k].npcId === npcId) npcEntry = lNPCs[k];
  });
  if (!npcEntry) return;

  // Convert dialogue entries into enriched-compatible choice objects
  var choices = npcEntry.dialogue.map(function(d) {
    var capturedD = d;
    return {
      cid: d.id,
      text: d.text,
      skill: d.skill || 'persuasion',
      tag: d.tag || 'safe',
      dc: d.dc || 7,
      result: function() {
        // Apply effects
        if (Array.isArray(capturedD.effects)) {
          capturedD.effects.forEach(function(eff) {
            if (!eff) return;
            if (eff.type === 'journal' && typeof addJournal === 'function') {
              addJournal(eff.text, eff.category || 'intelligence');
            }
            if (eff.type === 'flag' && typeof G !== 'undefined' && G.flags) {
              G.flags[eff.key] = eff.value;
            }
            if (eff.type === 'stageProgress' && typeof G !== 'undefined' && G.stageProgress) {
              G.stageProgress[eff.stage] = (G.stageProgress[eff.stage] || 0) + (eff.amount || 1);
              if (typeof checkStageAdvance === 'function') checkStageAdvance();
            }
          });
        }
        if (typeof G !== 'undefined') {
          G.lastResult = capturedD.result;
          G.recentOutcomeType = 'intelligence';
        }
        if (typeof updateHUD === 'function') updateHUD();
        if (typeof loadStageChoices === 'function') {
          setTimeout(function() { loadStageChoices(loc); }, 400);
        }
      },
      failResult: capturedD.failResult || 'The moment closes.',
      onFail: function() {
        if (typeof G !== 'undefined') {
          G.lastResult = capturedD.failResult || 'The moment closes.';
          G.recentOutcomeType = 'neutral';
        }
        if (typeof updateHUD === 'function') updateHUD();
        if (typeof loadStageChoices === 'function') {
          setTimeout(function() { loadStageChoices(loc); }, 400);
        }
      }
    };
  });

  if (typeof renderChoices === 'function') {
    renderChoices(choices, npcEntry.name + ' \u2014 ' + npcEntry.role);
  }
};
