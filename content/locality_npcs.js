// locality_npcs.js — Per-locality tavern NPC conversations
// C2: Sunweave (Shelkopolis), Tideglass (Cosmoria), Firesoul (Soreheim Proper)
// ES5 only. No const/let in function bodies. No arrow functions. Use bare G (not window.G).

window.LOCALITY_NPCS = {

  shelkopolis: {
    npcId: 'aelric_sunweave',
    name: 'Aelric Sunweave',
    role: 'Toll Witness',
    tell: 'deliberate timing, polished and status-aware, thinks in testimony and sequence',
    agenda: 'keep records accurate and the Shelk road workable; carries reputational strain without showing it',
    triggerText: 'Sunweave has been watching the queue longer than his shift requires.',
    dialogue: [
      {
        id: 'sunweave_records',
        text: 'His tally sheet has more crossings than the gate log shows.',
        tag: 'safe · lore · DC 7',
        skill: 'lore',
        dc: 7,
        result: 'Sunweave sets down his cup with precise care before answering. The discrepancy you named is not a discrepancy, he says — it is a correction. Three carts passed at the outer marker before the gate opened. He logged them anyway, as procedure requires. The inner gate clerk did not. This happens more often than it should, and the missing entries accumulate somewhere they cannot be corrected. He picks up his cup again. His face gives nothing away.',
        failResult: 'Sunweave listens without moving. He says the gate log is complete and sets his cup down. The subject is closed. Whatever the tally sheet shows, he did not invite you to read it.',
        effects: [{ type: 'journal', text: 'Sunweave noted a three-cart logging gap at the Shelk gate outer marker. Inner clerk records are not reconciled with his.', category: 'intelligence' }]
      },
      {
        id: 'sunweave_pressure',
        text: 'Someone told him which carts not to log. He absorbed that instruction without writing it down.',
        tag: 'risky · persuasion · DC 13',
        skill: 'persuasion',
        dc: 13,
        result: 'A pause — longer than a denial would need. Sunweave straightens the edge of his tally sheet. He says he has logged every crossing he has witnessed, in sequence, as required. Then he adds, without looking up: testimony is only as reliable as the witness position. He was inside during the fourth hour. He cannot speak to what passed while he was inside. The sheet goes flat under his palm. He moves on to the next column.',
        failResult: 'Sunweave meets your eyes once — briefly, formally — and says his records are open to authorized review through the Guild documentation office. He does not elaborate. The queue at the gate is growing and he has work.',
        effects: [{ type: 'journal', text: 'Sunweave placed himself inside during a gap period at the Shelk gate. The gap is covered in his records. The contents of that hour are not.', category: 'evidence' }]
      },
      {
        id: 'sunweave_network',
        text: 'The strain in how he holds his pen is not tiredness. It is calculation.',
        tag: 'bold · lore · DC 16',
        skill: 'lore',
        dc: 16,
        result: 'You wait him out. Sunweave finishes a line in the tally, caps his pen, and looks at you with the patience of someone who has explained difficult things to difficult people before. He says there is a record for every crossing he has authorized. He says the copies go to three offices and none of them compare notes. He says this is not his fault. Then he uncaps the pen and writes something that is not a crossing — a name, a route marker, a day notation — and slides the sheet to the edge of the table without comment.',
        failResult: 'Sunweave closes the tally sheet with deliberate care. He says he does not speculate about pattern in his records — that is not his function. If you want analysis, the Guild documentation office opens at the second bell. He picks up a fresh sheet and does not look up again.',
        effects: [
          { type: 'journal', text: 'Sunweave indicated that gate crossing copies go to three offices that do not compare records. He wrote a route notation and left it visible. The notation included a day marker two weeks prior.', category: 'evidence' },
          { type: 'renown', n: 1 }
        ]
      }
    ]
  },

  cosmoria: {
    npcId: 'coralyn_tideglass',
    name: 'Coralyn Tideglass',
    role: 'Archivist',
    tell: 'keeps language exact, adjusts speech to each audience, wording is part of the custody chain',
    agenda: 'maintain archive integrity against storm/trade vulnerability; skilled at exposing document tampering',
    triggerText: 'Tideglass is reading a manifest that does not match the one posted on the board.',
    dialogue: [
      {
        id: 'tideglass_manifest',
        text: 'The two manifests cover the same cargo. They do not agree on weight.',
        tag: 'safe · lore · DC 7',
        skill: 'lore',
        dc: 7,
        result: 'Tideglass does not look up from the document. She says: which manifest are you referring to — the submission copy, the clearance copy, or the archive copy? She asks this the way someone asks when they already know the answer will narrow the conversation. When you specify, she sets one sheet beside the other and draws a small mark at the column where the figures diverge. The mark is precise, contained, and leaves no room for interpretation. She says the discrepancy is logged.',
        failResult: 'Tideglass closes the manifest and says: if you have a query about a specific document, there is a request form at the front desk. She is not unfriendly. She is exact. The document goes back into its sleeve.',
        effects: [{ type: 'journal', text: 'Tideglass identified a weight discrepancy between Cosmoria manifest copies. The variance exists between submission and clearance versions. Archive copy is the reference.', category: 'intelligence' }]
      },
      {
        id: 'tideglass_tampering',
        text: 'She knows the difference between a correction and an alteration. She has seen both.',
        tag: 'risky · lore · DC 13',
        skill: 'lore',
        dc: 13,
        result: 'Tideglass sets down her pen. She says there is a procedural distinction between an amendment, which requires countersignature, and a correction, which requires margin notation and date. She says she has received documents that bear neither. She selects her next words with the care of someone writing for the record: she does not know what was changed, or when, or by whom. She knows the chain of custody was broken between the Soreheim relay and the Cosmoria intake stamp. She resumes writing.',
        failResult: 'Tideglass says that archival assessment requires a formal review request and a stated basis. She cannot speculate about document integrity in conversation. The form is at the front desk.',
        effects: [{ type: 'journal', text: 'Tideglass confirmed chain-of-custody break between Soreheim relay and Cosmoria intake stamp. Documents arrived without required amendment notation. She logged it. She did not name who submitted them.', category: 'evidence' }]
      },
      {
        id: 'tideglass_exposure',
        text: 'The name she has not written is the one the document was waiting for her to write.',
        tag: 'bold · persuasion · DC 16',
        skill: 'persuasion',
        dc: 16,
        result: 'A long silence. Tideglass straightens a stack of forms that is already straight. She says she is going to tell you something she has not put in writing, and that what she says now is not part of the archive, and that you should treat it accordingly. She says the relay clerk stamp was applied post-marking — she can tell by the impression depth, which varies with document age. The stamp was added after the document was already sealed. She pauses. She says she has documented the intake anomaly. She has not documented her inference. There is a difference.',
        failResult: 'Tideglass meets your eyes and says she speaks for the archive. What she writes is the record. What she does not write has no standing. She returns to her work with the practiced ease of someone who has ended conversations exactly this way before.',
        effects: [
          { type: 'journal', text: 'Tideglass identified post-marking stamp application on the Soreheim relay document — impression depth indicates the stamp was added after sealing. This is not in the archive. She has documented intake anomaly only.', category: 'evidence' },
          { type: 'renown', n: 1 }
        ]
      }
    ]
  },

  soreheim_proper: {
    npcId: 'lyria_firesoul',
    name: 'Lyria Firesoul',
    role: 'Export Operations Master',
    tell: 'touches clothing/tools/insignia when under pressure, checking role integrity',
    agenda: 'protect footing in Soreheim while steering work shortfalls away from rupture; haunted by private obligation',
    triggerText: 'Firesoul is tallying a shortfall she will not let become a report.',
    dialogue: [
      {
        id: 'firesoul_shortfall',
        text: 'Her count is three manifests short and the floor knows it.',
        tag: 'safe · survival · DC 7',
        skill: 'survival',
        dc: 7,
        result: 'Firesoul glances at the workers before answering — a quick sweep, habit. She says the floor runs on quota tolerance and right now tolerance is being extended. Three manifests is not a crisis. Three manifests becomes a crisis when it gets to reporting. She touches the insignia pin at her collar without seeming to notice. She says she is managing the gap and does not need it managed for her. The tone is flat, not hostile. She is stating a fact.',
        failResult: 'Firesoul looks at you the way someone looks at a tool they did not order. She says the floor count is current and the operation is running. If you have a logistics concern, there is a post at the transit office. She moves to the next station.',
        effects: [{ type: 'journal', text: 'Firesoul is holding a three-manifest shortfall below the reporting threshold. The floor knows. Management does not yet. She is managing the gap herself.', category: 'intelligence' }]
      },
      {
        id: 'firesoul_obligation',
        text: 'Someone she owes is part of why the shortfall exists.',
        tag: 'risky · persuasion · DC 13',
        skill: 'persuasion',
        dc: 13,
        result: 'Firesoul goes still. Not defensive — still, the way someone goes still when they are deciding how much is already visible. She adjusts the clip on her belt without looking at it. She says there are operational debts in every export cycle and she clears them in order. She does not say what order that is. She says the shortfall will be absorbed before the end of the quarter. She says this like it is already done, which means it is not done, and she knows it.',
        failResult: 'Firesoul says operational decisions on the floor are not subject to corridor review. She is the Floor Boss. She handles the floor. She turns away before the sentence is finished.',
        effects: [{ type: 'journal', text: 'Firesoul has a private obligation connected to the current shortfall. She indicated the gap will be absorbed by quarter end. She did not say how. Her manner suggested the obligation predates her current post.', category: 'intelligence' }]
      },
      {
        id: 'firesoul_rupture',
        text: 'If this reaches reporting, someone above her authorized the original gap.',
        tag: 'bold · combat · DC 16',
        skill: 'combat',
        dc: 16,
        result: 'Firesoul looks at you for a long moment. Then she walks to the edge of the floor where the noise covers conversation and waits for you to follow. She says the Soreheim transit ledger runs in two columns — what is stamped for export and what is counted on the floor. They have not matched for eleven months. She has been covering the difference. She touches the insignia pin, then drops her hand deliberately. She says she does not know who authorized the original disparity. She knows who signs the transit stamps. That name is not hers.',
        failResult: 'Firesoul says she has nothing to report and no reason to speculate about what a report would contain. She has work. The floor does not run itself and neither does she.',
        effects: [
          { type: 'journal', text: 'Firesoul revealed an eleven-month ledger disparity between Soreheim export stamps and floor counts. She has been absorbing the difference. Transit stamps bear a name that is not hers. She would not say the name.', category: 'evidence' },
          { type: 'renown', n: 2 }
        ]
      }
    ]
  }

};

window.renderNPCDialogue = function(npcId) {
  var npcEntry = null;
  var locKeys = Object.keys(window.LOCALITY_NPCS);
  for (var i = 0; i < locKeys.length; i++) {
    if (window.LOCALITY_NPCS[locKeys[i]].npcId === npcId) {
      npcEntry = window.LOCALITY_NPCS[locKeys[i]];
      break;
    }
  }
  if (!npcEntry) return;

  var choices = npcEntry.dialogue.map(function(d) {
    return (function(choice) {
      return {
        id: choice.id,
        text: choice.text,
        tag: choice.tag,
        action: function() {
          var rollResult = (typeof rollD20 === 'function') ? rollD20(choice.skill) : { total: 10, success: function(dc){ return 10 >= dc; } };
          var passed = rollResult.success(choice.dc);
          var resultText = passed ? choice.result : choice.failResult;

          G.lastResult = resultText;
          G.recentOutcomeType = passed ? 'success' : 'fail';

          if (typeof addNarration === 'function') addNarration(resultText);

          var xpAmt;
          if (choice.tag.indexOf('risky') >= 0) { xpAmt = passed ? 25 : 12; }
          else if (choice.tag.indexOf('bold') >= 0) { xpAmt = passed ? 35 : 15; }
          else { xpAmt = passed ? 20 : 10; }
          if (typeof gainXp === 'function') gainXp(xpAmt);

          if (passed && choice.effects && choice.effects.length) {
            choice.effects.forEach(function(eff) {
              if (eff.type === 'journal' && typeof addJournal === 'function') {
                addJournal(eff.text, eff.category);
              } else if (eff.type === 'renown') {
                G.renown = (G.renown || 0) + (eff.n || 1);
              }
            });
          }

          if (typeof updateHUD === 'function') updateHUD();
          if (typeof checkStageAdvance === 'function') checkStageAdvance();
          if (typeof loadStageChoices === 'function') loadStageChoices();
        }
      };
    })(d);
  });

  choices.push({
    id: 'npc_dialogue_back',
    text: 'This can wait. There is other ground to cover.',
    tag: 'safe',
    action: function() {
      if (typeof loadStageChoices === 'function') loadStageChoices();
    }
  });

  if (typeof renderChoices === 'function') renderChoices(choices);
};
