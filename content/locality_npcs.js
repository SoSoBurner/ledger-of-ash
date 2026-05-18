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
    tell: 'when about to say something off-record, straightens a stack of documents that is already straight — a small physical negotiation before the words come',
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
        effects: [{ type: 'journal', text: 'Tideglass confirmed chain-of-custody break between Soreheim relay and Cosmoria intake stamp. Documents arrived without required amendment notation. She logged it. She did not name who submitted them.', category: 'evidence' }, { type: 'suspect', npc: 'coralyn_tideglass', n: 1 }]
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
          { type: 'renown', n: 1 },
          { type: 'suspect', npc: 'coralyn_tideglass', n: 1 }
        ]
      }
    ]
  },

  aurora_crown_commune: {
    npcId: 'warden_sera_whiteglass',
    name: 'Warden Sera Whiteglass',
    role: 'Dome Stabilizer Marshal at Aurora Crown Commune',
    tell: 'when she names a problem, her eyes go to the nearest structural joint in the dome wall — not as a check, but as a habit she never unlearned',
    agenda: 'keep Aurora Crown Commune\'s dome reliable and its protocols unbroken; carries contamination and ration strain without letting the marshal post visibly slip',
    triggerText: 'Whiteglass is standing at the thermal inlet gate, reading a seepage report she has already read twice.',
    dialogue: [
      {
        id: 'whiteglass_seepage',
        text: 'That report is older than this morning. She is reading it again for a reason.',
        tag: 'safe · lore · DC 7',
        skill: 'lore',
        dc: 7,
        result: 'Whiteglass does not look up from the document, but she stops turning pages. The seepage reading at Section Nine has been flagged three times in the last rotation cycle, she says. Each time, the repair order went out. Each time, the follow-up inspection noted it resolved. She sets the report down on the inlet ledge, smooths the edge flat with two fingers. The readings are still climbing, she adds, and the inspection forms say they are not. She does not say what that means. She does not need to.',
        failResult: 'Whiteglass folds the seepage report against her forearm and says the inlet is operating within tolerance. If you have a technical concern, the stewards office handles dome submissions. Her eyes move to the joint overhead and stay there a moment before she walks on.',
        effects: [{ type: 'journal', text: 'Whiteglass is tracking a Section Nine seepage reading that keeps climbing despite three repair-and-clear cycles. Inspection forms say resolved. Readings say otherwise.', category: 'intelligence' }]
      },
      {
        id: 'whiteglass_records',
        text: 'The repair forms are correct. The dome is not. Someone is managing the gap.',
        tag: 'risky · persuasion · DC 13',
        skill: 'persuasion',
        dc: 13,
        result: 'A long pause. Whiteglass sets the report on the ledge and turns to face you fully — the posture of someone deciding how much to anchor to the record. She says dome maintenance submissions require a countersignature from the stewards rotation lead before closure. She says the Section Nine closures have the right signature. She says the rotation lead on two of those three cycles was covering a doubled shift. She says she has not yet filed a formal query. Her eyes go to the structural joint, then back to you. She says she has not yet.',
        failResult: 'Whiteglass says dome maintenance is under steward jurisdiction. If there is a structural concern, the submission process exists for that purpose. She picks up the report and walks toward the inner corridor without looking back. The thermal inlet gate hisses behind her.',
        effects: [{ type: 'journal', text: 'Whiteglass indicated the Section Nine closure forms carry a valid countersignature from a rotation lead who was covering doubled shifts during two of the three cycles. She has not filed a formal query. Not yet.', category: 'evidence' }]
      }
    ]
  },

  craftspire: {
    npcId: 'jorin_ledgermere',
    name: 'Jorin Ledgermere',
    role: 'Grain Measurer at Craftspire',
    tell: 'before answering anything that costs him, runs his thumb along the edge of his ledger cover — not opening it, just confirming the spine is there',
    agenda: 'protect his standing at Craftspire against reputational exposure he can see coming but cannot yet stop; thinks in favors owed and weeks remaining',
    triggerText: 'Ledgermere is at the materials yard edge with a ledger he keeps closing before anyone can read the open page.',
    dialogue: [
      {
        id: 'ledgermere_shortage',
        text: 'The yard count does not match what the board says is available.',
        tag: 'safe · lore · DC 7',
        skill: 'lore',
        dc: 7,
        result: 'Ledgermere closes the ledger, opens it again to a different page. He says the board reflects licensed allocation — what has been formally assigned for active commissions. The physical yard count includes reserve stock and contested lots. The difference is procedural, not a discrepancy. He says this the way someone says a thing they have said many times before, with the precision of a person who stopped believing it around the third or fourth repetition. His thumb finds the spine of the ledger before he finishes the sentence.',
        failResult: 'Ledgermere says the yard figures are updated each morning through the allocation office. If there\'s a count question, the clerks on the second level hold the current register. He closes the ledger with both hands and steps back from the yard rail.',
        effects: [{ type: 'journal', text: 'Ledgermere described a gap between Craftspire\'s board-posted allocations and the physical yard count as procedural — reserve stock and contested lots. His manner suggested the explanation is practiced rather than settled.', category: 'intelligence' }]
      },
      {
        id: 'ledgermere_obligation',
        text: 'He is managing a loss that belongs to someone above him in this building.',
        tag: 'risky · persuasion · DC 13',
        skill: 'persuasion',
        dc: 13,
        result: 'Ledgermere goes still. His thumb moves along the ledger spine — once, deliberate. He says every allocation cycle carries forward obligations from the previous one. He says that is standard practice under copy-right enforcement. He says the current forward balance is within variance. He does not say whose variance he is absorbing. He selects his next words as if for the record: he has logged every measurement he has witnessed, in the sequence they were given to him, as his role requires. He does not say who gave the sequence.',
        failResult: 'Ledgermere says ledger operations at the yard level fall under the licensed guild allocation process, not corridor review. He has a measurement run starting shortly. He closes the conversation the way he closes the ledger — with both hands, no gap left open.',
        effects: [{ type: 'journal', text: 'Ledgermere described the current allocation gap as a forward balance within variance — absorbing obligations from a prior cycle. He logged every measurement as given. He would not say who set the sequence.', category: 'evidence' }]
      }
    ]
  },

  districts: {
    npcId: 'aelra_sunweave',
    name: 'Aelra Sunweave',
    role: 'Estate Liaison at Aurora Heights District',
    tell: 'when she cannot say something directly, straightens her cuff — left hand over right, two slow pulls — and the pause after it is where the real answer lives',
    agenda: 'keep the Aurora Heights estate network from generating public scandal while a private obligation she will not name narrows her options by the week',
    triggerText: 'Sunweave is in the boulevard colonnade, reading a written notice she received but did not open in front of whoever delivered it.',
    dialogue: [
      {
        id: 'sunweave_access',
        text: 'That notice was handed to her privately. She read it where no one from the estate could see.',
        tag: 'safe · lore · DC 7',
        skill: 'lore',
        dc: 7,
        result: 'Aelra Sunweave tucks the notice into her sleeve before you are close enough to read the seal. She says she handles liaison correspondence throughout the district and most of it is administrative — property access, schedule coordination, estate maintenance requests. She names these with the rhythm of someone reciting a list they use to make space. She adds, without changing tone: the Aurora Heights estate records are reviewed through a separate office from the main Shelkopolis civic archive. Different submission calendar. Different clerk rotation. Most people do not know that.',
        failResult: 'Sunweave folds the notice against her palm and says estate liaison correspondence is private administrative matter. If you have a formal inquiry, the district registration office accepts written submissions at the second bell. She straightens her cuff, left over right, twice, and turns back to the boulevard.',
        effects: [{ type: 'journal', text: 'Sunweave noted that Aurora Heights estate records are maintained separately from the Shelkopolis civic archive — different submission calendar, different clerk rotation. She did not say why she mentioned it.', category: 'intelligence' }]
      },
      {
        id: 'sunweave_scandal',
        text: 'Something in that notice would reach the wrong clerks if she did not intercept it first.',
        tag: 'risky · persuasion · DC 13',
        skill: 'persuasion',
        dc: 13,
        result: 'A pause — long enough that you can hear the boulevard fountain. Sunweave straightens her cuff, left over right, slow. She says estate liaison work involves managing the distance between private estate records and civic-level disclosure requirements. She says there are obligations, on both sides, to maintain that distance appropriately. She says the notice she received relates to a maintenance schedule — she names the category carefully, like a person choosing a container that will hold without spilling. She says the maintenance schedule touches a property whose civic registration has not been updated since a prior owner. She says she is managing the alignment. She does not say for whom.',
        failResult: 'Sunweave meets your eyes with the steady attention of someone who does exactly this for a living. She says she does not discuss active liaison matters in public space. She says this without heat, without hurry. She says there is a formal process for civic inquiry and it does not begin in a colonnade. Her cuff is already straight when she walks away.',
        effects: [{ type: 'journal', text: 'Sunweave is managing alignment between a private estate maintenance record and a civic registration that predates the current owner. She described it as her responsibility. She would not name the estate or the owner.', category: 'evidence' }]
      }
    ]
  },

  fairhaven: {
    npcId: 'corin_bloomcrest',
    name: 'Corin Bloomcrest',
    role: 'Watch Sergeant at Fairhaven',
    tell: 'when he decides to answer a question he almost deflected, rolls his left shoulder once — a small physical permission he gives himself before the words come',
    agenda: 'keep Fairhaven\'s watch credible against glyph corruption pressure that is moving faster than his authority can follow; wants outside clarity but will not say so directly',
    triggerText: 'Bloomcrest is at the Fairhaven market gate checking a cart he has already checked, running the same tally twice.',
    dialogue: [
      {
        id: 'bloomcrest_tally',
        text: 'He ran that count twice. The first count was not wrong.',
        tag: 'safe · lore · DC 7',
        skill: 'lore',
        dc: 7,
        result: 'Bloomcrest does not acknowledge the observation directly. He seals the cart log with his thumb stamp and hands it back to the driver. Then he says, while still looking at the gate: there have been three carts in the last eight days carrying reagents without purification seal documentation. Standard road law requires the seal for anything bound toward Verdant Caves approach. He got all three flagged. He says this the way a person states a number they are not proud of. He says the problem is the carts that come through while he is covering the south approach.',
        failResult: 'Bloomcrest hands the cart log back to the driver and says the gate is operating on standard rotation. If there is a market inquiry, the clerk office handles those. He rolls his left shoulder once, then turns back to the gate without looking at you.',
        effects: [{ type: 'journal', text: 'Bloomcrest flagged three reagent carts in eight days for missing purification seals on the Verdant Caves approach road. He noted carts arriving while he covers the south approach go unlogged. He presented this as a coverage problem, not an enforcement one.', category: 'intelligence' }]
      },
      {
        id: 'bloomcrest_corruption',
        text: 'He knows where the glyph corruption is moving. He has not written it down.',
        tag: 'risky · persuasion · DC 13',
        skill: 'persuasion',
        dc: 13,
        result: 'Bloomcrest goes still at the gate frame. Then he rolls his left shoulder once, and turns partly toward you — not fully, in case someone from the market is watching. He says the Watcher\'s Perch readings have been moving southeast for about three weeks. He says this is not in any report because the reading markers are maintained by cave wardens, not watch, and the last warden to update them has not come back from the third passage. He says he sent a message to the Shelkopolis relay six days ago. He says he has not received a response. He says these things without inflection, in the order they happened.',
        failResult: 'Bloomcrest says the watch handles market gate and road safety. Glyph anomaly monitoring falls under cave warden jurisdiction and any concern should be routed through the shrine office at the east end of the market. He turns back to the gate. His posture does not change.',
        effects: [{ type: 'journal', text: 'Bloomcrest tracked glyph corruption readings moving southeast from Watcher\'s Perch for three weeks. The last cave warden to update the markers did not return from the third passage. He sent a relay message to Shelkopolis six days ago. No response.', category: 'evidence' }]
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
          var rollResult = (typeof rollD20 === 'function') ? rollD20(choice.skill) : { total: 10 };
          var passed = (rollResult.total || 0) >= choice.dc;
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
