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

  glasswake_commune: {
    npcId: 'ilya_rimebridge',
    name: 'Ilya Rimebridge',
    role: 'Quartermaster at Glasswake Commune',
    tell: 'when someone answers too quickly, picks up a nearby instrument or container — not to use it, just to hold it, resetting the pace before she decides whether to trust the answer',
    agenda: 'keep the commune\'s supply lines intact and exposure incidents from becoming civic failures; reads trust and appetite faster than most people read words',
    triggerText: 'Rimebridge is at the depot counter logging a shipment of ward components with an annotation she keeps revising.',
    dialogue: [
      {
        id: 'rimebridge_instruments',
        text: 'That annotation has been rewritten three times. The instruments arrived wrong.',
        tag: 'safe · lore · DC 7',
        skill: 'lore',
        dc: 7,
        result: 'Rimebridge sets down her pen without closing the log. She says two of the seven calibration instruments in this shipment arrived outside tolerance — not damaged, just off by enough that running them would skew the contamination readings for the entire east wing for the next exposure cycle. She taps the annotation. The supplier listed them as certified. She is deciding how to log the discrepancy so the record stays accurate without triggering a full supply chain audit that the commune cannot absorb right now. She picks up the nearest sealed canister and holds it while she thinks.',
        failResult: 'Rimebridge folds the annotation inward and says the shipment is under review and will be logged when the review is complete. If you have a supply request, the intake window opens after the third bell. She does not look up from the counter.',
        effects: [{ type: 'journal', text: 'Rimebridge is holding an instrument shipment discrepancy — two pieces arrived outside calibration tolerance despite certified status. She is managing the log entry to avoid triggering a supply audit the commune cannot absorb.', category: 'intelligence' }]
      },
      {
        id: 'rimebridge_exposure',
        text: 'The quarantine fatigue here is not exhaustion. Someone has been falsifying clear readings.',
        tag: 'risky · persuasion · DC 13',
        skill: 'persuasion',
        dc: 13,
        result: 'Rimebridge goes still. She picks up a proximity counter from the counter — the kind used to verify personal scan results — and turns it over in her hand once, twice. She says the commune runs on the principle that every breach is treated as real until cleared. She says that principle requires instruments that tell the truth. She says three of the last seven personal clearance scans in the outer labs came back clean on instruments she now has reason to question. She sets the counter down. She does not say what that means. She says she has not yet written anything down about it.',
        failResult: 'Rimebridge says instrument integrity concerns go through the Containment Research Concord, not through depot review. She returns to the annotation without elaborating. Her hand settles on the nearest sealed canister and stays there.',
        effects: [{ type: 'journal', text: 'Rimebridge indicated three recent personal clearance scans in the outer labs were processed on instruments she now doubts. She has not logged this. The Containment Research Concord does not yet know.', category: 'evidence' }]
      }
    ]
  },

  guildheart_hub: {
    npcId: 'guild_auditor_bren_oss',
    name: 'Bren Oss',
    role: 'Guild Auditor at Guildheart Hub',
    tell: 'when he catches a contradiction, does not immediately press it — writes a single word in his margin notes and lets the silence after it do the work',
    agenda: 'trace a quota fraud pattern he suspects crosses multiple registered merchant houses, without triggering the political alarm that would bury the evidence before he can use it',
    triggerText: 'Oss is in the arbitration corridor reviewing a freight manifest against a sealed counter-manifest he produced himself.',
    dialogue: [
      {
        id: 'oss_manifest',
        text: 'He is comparing two documents that should match. They do not.',
        tag: 'safe · lore · DC 7',
        skill: 'lore',
        dc: 7,
        result: 'Oss does not look up. He says the registered freight declaration for this consignment lists forty-three sealed crates. The bonded warehouse receipt from the same intake day lists forty-one. He underlines the difference on his counter-manifest with a single precise stroke. He says two crates either passed through without registration, or were registered under a separate submission that he has not located. He says he has not yet located it. He says this in the tone of someone who expects to locate it shortly and is not pleased about what he expects to find there.',
        failResult: 'Oss closes his counter-manifest and says freight discrepancies are handled through the Guild Sanction Board\'s formal review process. If you have a concern about a specific consignment, there is a submission form at the registry counter. He waits for you to move on.',
        effects: [{ type: 'journal', text: 'Oss found a two-crate discrepancy between a registered freight declaration and the bonded warehouse intake receipt for the same day. He has not yet found the corresponding submission. He expects to.', category: 'intelligence' }]
      },
      {
        id: 'oss_fraud',
        text: 'The Red Hood rumors are not rumors. He has paper that connects them to the crate gap.',
        tag: 'risky · persuasion · DC 13',
        skill: 'persuasion',
        dc: 13,
        result: 'Oss sets his pen down. A long pause — long enough that two arbitration clerks pass in the corridor without either of them glancing his way, which means he chose this spot deliberately. He says there are three registered merchant houses in the Guildheart Hub that have each reported minor intake discrepancies in the last two quarters. He says minor is a defined term here: under six units per consignment cycle. He says the combined sum of those minor discrepancies, across those three houses, over two quarters, is not minor. He writes one word in his margin notes and does not show it to you. He says he needs the chain of custody records for the bonded warehouse\'s night intake window for the last forty days.',
        failResult: 'Oss says active audit matters are not discussed outside formal review context. He says this without apology and without heat. He collects his documents, aligns the edges, and moves further down the corridor before you have finished processing the refusal.',
        effects: [{ type: 'journal', text: 'Oss is tracking a combined discrepancy pattern across three registered merchant houses — individually minor, collectively significant. He needs bonded warehouse night-intake records for the last forty days. He did not say what he expects to find there.', category: 'evidence' }]
      }
    ]
  },

  harvest_circle: {
    npcId: 'elyra_mossbane',
    name: 'Elyra Mossbane',
    role: 'Protector of the Unternal Cultivated Wilds at Harvest Circle',
    tell: 'when she disagrees with something but will not say so directly, looks at the nearest wagon wheel or cart axle — not the person speaking — and stays there until she has decided how much of her actual opinion to release',
    agenda: 'keep the cultivated wilds around Harvest Circle productive enough to buffer the spoilage pressure; privately carrying a favor-feud between two patron-families that she did not start and cannot end',
    triggerText: 'Mossbane is at the drying rack line checking a batch of field samples against a quota notice she received this morning.',
    dialogue: [
      {
        id: 'mossbane_spoilage',
        text: 'Those samples are from a field section the quota notice does not account for.',
        tag: 'safe · lore · DC 7',
        skill: 'lore',
        dc: 7,
        result: 'Mossbane holds one of the samples up to the light — a gesture she has done ten thousand times — and says the northern boundary sections were reclassified last cycle from communal to patron-family allocation. She says the reclassification changed whose counts those yields go into. She says the drying rack batch in front of her comes from a section whose ownership is still disputed between two families. She sets the sample back. She looks at the nearest wagon wheel. She says both families submitted their quotas showing this yield in their column. The alliance redistribution office has not yet resolved which column is correct. The grain dries regardless.',
        failResult: 'Mossbane says the quota notice is an administrative document and questions about quota allocation go to the clerk office at the counting court. She checks another sample without looking up. The subject is closed.',
        effects: [{ type: 'journal', text: 'Mossbane described a boundary section reclassification that placed disputed yields into competing patron-family quota columns. Both families claimed the yield. The alliance redistribution office has not resolved it. The grain is already drying.', category: 'intelligence' }]
      },
      {
        id: 'mossbane_feud',
        text: 'The two families contesting this yield have been contesting things longer than the reclassification.',
        tag: 'risky · persuasion · DC 13',
        skill: 'persuasion',
        dc: 13,
        result: 'Mossbane looks at a cart axle to her left. She stays there for a moment. She says she has worked the cultivated wilds boundary for eleven years and the two families whose names appear on that disputed quota have each tried, at different times, to have her position reclassified under their household rather than under the alliance protectorate. She says she has filed the required objections both times. She says the current dispute over the northern section boundary is not about grain yield. She says it never is. She looks back at the samples and begins sorting them by weight without further comment.',
        failResult: 'Mossbane says she does not speak to patron-family relations in her capacity as protector. Boundary disputes go to the regional arbiters through the proper calendar. She turns back to the drying racks with the calm of someone who has been closing this particular conversation for years.',
        effects: [{ type: 'journal', text: 'Mossbane indicated both contesting families have separately tried to reclassify her protectorate position under their household control. She filed objections both times. She stated plainly that the quota dispute is not about grain.', category: 'evidence' }]
      }
    ]
  },

  ithtananalor: {
    npcId: 'sir_velden_ironspike',
    name: 'Sir Velden Ironspike',
    role: 'Commander of Shadowhands at Ithtananalor',
    tell: 'when a conversation could go two directions, picks up whatever is nearest — a ledger clasp, a gate token, a wax stamp — and sets it back down in the same spot without using it, a small delay that reads like patience but is really appraisal',
    agenda: 'maintain covert enforcement operations under Roazian law while managing a surveillance gap he has not yet reported to the ORE command above him',
    triggerText: 'Ironspike is reviewing a checkpoint log at the south gate corridor, standing where he can see both exits without being clearly visible from either.',
    dialogue: [
      {
        id: 'ironspike_papers',
        text: 'His inspection is slower than the line requires. He is reading something else in those documents.',
        tag: 'safe · lore · DC 7',
        skill: 'lore',
        dc: 7,
        result: 'Ironspike does not look up while he speaks. He says the south gate processes eighty to a hundred transit documents on a standard day. He says the transit document in his hand is not irregular. He says he reads irregular documents differently from standard ones, and that most travelers cannot tell which category they have been assigned. He hands back the papers with the clean efficiency of someone who finished reading them two minutes ago. He adds, as if noting weather: the checkpoint log has a five-minute gap recorded at the third bell. It is logged as routine patrol overlap. He did not write that entry.',
        failResult: 'Ironspike completes the document review, stamps the transit clearance, and hands it back without comment. He says the south gate is operating on standard protocol. If there is a specific transit concern, the ORE documentation window opens at the first bell. He turns to the next document in the stack.',
        effects: [{ type: 'journal', text: 'Ironspike flagged a five-minute checkpoint log gap at the south gate\'s third-bell rotation. It is recorded as routine patrol overlap. He did not write the entry. He mentioned this while reviewing a transit document he described as standard.', category: 'intelligence' }]
      },
      {
        id: 'ironspike_shadowhands',
        text: 'The gap in that log was made deliberately, and he knows by whom.',
        tag: 'risky · persuasion · DC 13',
        skill: 'persuasion',
        dc: 13,
        result: 'A pause — not hesitation, the pause of a man deciding how much is already visible before committing to a position. Ironspike picks up the wax stamp from the ledge and sets it back without pressing it. He says the Shadowhands operate under a doctrine of compartmentalized action: each operative logs their own segment, no operative logs another\'s. He says the five-minute gap falls in a segment that was not assigned to any logged operative that cycle. He says this means either the doctrine was followed and the segment was left intentionally unassigned, or the doctrine was not followed. He says he has not yet determined which. He stamps the next document and does not look up again.',
        failResult: 'Ironspike meets your eyes for exactly as long as it takes to assess whether you are a complication. He says Shadowhands operational records are under ORE command jurisdiction and not subject to corridor review. He says this without heat, with the practiced ease of someone who has ended exactly this conversation before. The stamp comes down on the next document.',
        effects: [{ type: 'journal', text: 'Ironspike indicated the south gate log gap falls in an unassigned Shadowhands segment — either deliberately left empty under doctrine, or logged outside doctrine. He has not reported this finding upward. He has not said why.', category: 'evidence' }]
      }
    ]
  },

  mimolot_academy: {
    npcId: 'quenra_quillfire',
    name: 'Quenra Quillfire',
    role: 'Tutor-Magistrate at Mimolot Academy',
    tell: 'when the conversation moves toward something she cannot say directly, touches the collar of her academic robe with two fingers — not a nervous gesture, a deliberate one, the way someone checks a door is still locked before deciding whether to open it',
    agenda: 'protect her standing at the Academy while managing a tariff debt owed by a student whose family has more influence than she does',
    triggerText: 'Quillfire is in the eastern corridor with a bound folio tucked against her ribs, re-reading the same page she has been on since the morning bell.',
    dialogue: [
      {
        id: 'quillfire_folio',
        text: 'That folio has a House Mimolot import seal on it. She is not happy about what it says.',
        tag: 'safe · lore · DC 7',
        skill: 'lore',
        dc: 7,
        result: 'Quillfire closes the folio before answering, but keeps her finger between the pages. She says the Academy operates on a book-tariff schedule tied to knowledge acquisition cycles — texts brought in from outside the polity require import documentation and duty clearance before entering the teaching archive. She says this is not a restriction on learning. She says this the way someone says a thing they have repeated enough times that they no longer have to believe it. She adds: the current cycle has seventeen texts still in tariff review. Eleven of those were submitted by one family\'s household library. She touches her collar once. She does not say which family.',
        failResult: 'Quillfire closes the folio against her side and says tariff documentation is an administrative matter handled through the archive office. If you have a concern about a specific text, submissions open at the second bell. She turns back to the corridor without elaborating.',
        effects: [{ type: 'journal', text: 'Quillfire is tracking seventeen texts still in tariff review this cycle — eleven submitted by a single household library. She would not name the family. She presented the book-tariff process as procedural while her manner suggested the current case is not.', category: 'intelligence' }]
      },
      {
        id: 'quillfire_debt',
        text: 'The family behind that tariff backlog could end her appointment here if she pressed them.',
        tag: 'risky · persuasion · DC 13',
        skill: 'persuasion',
        dc: 13,
        result: 'A long pause. Quillfire opens the folio again, finds a different page, closes it. She says the Tutor-Magistrate role at Mimolot Academy carries academic authority but not institutional protection — the appointment is reviewed each cycle by the House, and House review does not require explanation. She says this the way someone quotes a rule they have turned over in their hands many times. She says a tariff dispute that embarrassed a sponsoring family would not survive review. She says she is aware of this. Her two fingers find the collar of her robe and rest there. She says she has not yet filed the tariff delinquency notice for the eleven texts. She has not yet decided if she will.',
        failResult: 'Quillfire straightens slightly and says Tutor-Magistrate matters are handled through the Academy\'s internal review process. She is not in a position to discuss individual cases in a corridor. She turns away with the deliberate calm of someone who has already calculated the cost of this exact moment and decided the corridor version is cheaper.',
        effects: [{ type: 'journal', text: 'Quillfire confirmed her appointment is subject to House cycle review with no explanation required. She has not filed the tariff delinquency notice for eleven texts from one household library. She has not decided if she will. The sponsoring family carries enough weight that filing the notice may cost her the post.', category: 'evidence' }]
      }
    ]
  },

  panim_haven: {
    npcId: 'elior_sepulcher',
    name: 'Elior Sepulcher',
    role: 'Mediator Cleric at Panim Haven',
    tell: 'when he names a sacred obligation, exhales slowly through his nose — not as a sigh, as a measurement, the way someone checks the weight of what they are about to carry before lifting it',
    agenda: 'maintain the ritual credibility of his mediator role while quietly managing a divine-balance account that has not been reconciled in three pilgrimage cycles',
    triggerText: 'Sepulcher is at the offering registry beside the temple approach, logging an entry with more care than its category requires.',
    dialogue: [
      {
        id: 'sepulcher_registry',
        text: 'That offering entry has been rewritten. The original notation is still visible underneath.',
        tag: 'safe · lore · DC 7',
        skill: 'lore',
        dc: 7,
        result: 'Sepulcher does not look up from the registry. He says offering records are maintained to a higher standard than civic documents because their purpose is perpetual — the record is not only for this pilgrimage cycle but for every mediation that references it afterward. He sets down his pen and smooths the page with the flat of his hand. He says the original notation was incomplete. He says an incomplete sacred record is not a record at all. He says this the way a man says something he has said so many times it has become structurally true, regardless of whether he still believes the structure. He does not say what the original notation was missing.',
        failResult: 'Sepulcher caps his pen and says the offering registry is a sacred document managed under Panim mediation protocol. If you have a question about a specific offering, the petitioner window opens after the midday observance. He does not look up when he says it.',
        effects: [{ type: 'journal', text: 'Sepulcher is revising an offering registry entry he described as incomplete. The original notation is still visible beneath the correction. He framed the revision as procedurally necessary for perpetual record accuracy. He did not say what the original was missing.', category: 'intelligence' }]
      },
      {
        id: 'sepulcher_balance',
        text: 'Three pilgrimage cycles of unclosed accounts sit beneath the surface of this registry.',
        tag: 'risky · persuasion · DC 13',
        skill: 'persuasion',
        dc: 13,
        result: 'Sepulcher goes still. He exhales slowly through his nose — once, measured. He says divine balance mediation works on a principle of closed accounts: every offering made in petition must be answered with a recorded outcome, and every unresolved outcome carries forward as an obligation against the mediator who received the initial petition. He says he has thirty-seven open petitions across three pilgrimage cycles that are classified as pending divine response. He says this classification is correct — the divine response has not yet manifested in a form that satisfies the ledger. He says he is not certain the form it would need to take still exists. His hand rests flat on the registry. He does not say what he means by that.',
        failResult: 'Sepulcher says mediation account status is a matter of sacred record and not available for corridor review. He says this gently, with the practiced patience of someone who has spent a long time translating uncomfortable truths into acceptable language. The pen goes back in his hand. The conversation is finished.',
        effects: [{ type: 'journal', text: 'Sepulcher is carrying thirty-seven unresolved petition obligations across three pilgrimage cycles, classified as pending divine response. He indicated the form of resolution may no longer exist. He did not say what disrupted the cycle or what that means for the petitioners whose accounts are still open.', category: 'evidence' }]
      }
    ]
  },

  plumes_end_outpost: {
    npcId: 'veyra_sunweave',
    name: 'Veyra Sunweave',
    role: 'Patrol Leader at Plume\'s End Outpost',
    tell: 'when she decides a traveler is worth trusting, steps half a pace to the left and turns her shoulder toward them — a small positional shift she does not appear to notice, but it changes the conversation from checkpoint exchange to something else',
    agenda: 'keep the caravan routes through Plume\'s End functional while running a private count of celestial enforcer sightings that she has not yet reported to Shelkopolis command',
    triggerText: 'Sunweave is standing at the waystation edge with a road chart she keeps folding and unfolding at the same crease.',
    dialogue: [
      {
        id: 'sunweave_routes',
        text: 'She is counting something on that road chart. The number she arrives at bothers her.',
        tag: 'safe · lore · DC 7',
        skill: 'lore',
        dc: 7,
        result: 'Sunweave folds the chart at the crease and looks up. She says the northern segment between Plume\'s End and Fairhaven has had six caravan delays in the last twelve days — four reported as weather, two reported as missing axle hardware. She says she has run the northern route herself since taking the patrol post and she knows what weather delay looks like on a manifest. She says two of the weather delays were logged on days she was on the route. She says the sky that day was clear. She steps half a pace to the left. She says the delays are not the problem she is most concerned about.',
        failResult: 'Sunweave folds the chart and says the waystation is operating on standard rotation. Route delays go to the Shelkopolis transit relay for tracking. If you have a specific cargo concern, the outpost log is open for review at the intake desk. She turns back to the road.',
        effects: [{ type: 'journal', text: 'Sunweave flagged six caravan delays on the northern Plume\'s End–Fairhaven segment in twelve days — four weather, two hardware. She described two of the weather delays as logged on a clear day she witnessed personally. She indicated the delays are not her primary concern.', category: 'intelligence' }]
      },
      {
        id: 'sunweave_enforcers',
        text: 'The celestial enforcer sightings she has not reported are connected to those delays.',
        tag: 'risky · persuasion · DC 13',
        skill: 'persuasion',
        dc: 13,
        result: 'Sunweave goes still, then steps fully toward you, her shoulder turned, the chart folded tight in her hand. She says celestial enforcer sightings require a verification threshold before they can go into a formal relay report — two independent witnesses, sequential sightings within the same route segment, logged on patrol sheets. She says she has four sightings across nine days. Three of her own. One from a caravan lead whose name she trusts. She says she does not yet have the second witness for two of the four. She says she is waiting. She unfolds the chart once, at the crease, and folds it again. She says the caravans that delayed on those days were moving between the third and fifth road markers. She says that is where three of the four sightings occurred.',
        failResult: 'Sunweave meets your eyes and says patrol intelligence matters are handled through proper relay channels. She says this without apology, with the directness of someone who has made her decision about this conversation already. She turns toward the waystation door.',
        effects: [{ type: 'journal', text: 'Sunweave has four celestial enforcer sightings between road markers three and five on the northern route — three personal, one from a trusted caravan lead. She lacks the second-witness threshold to file a formal relay report. The sightings correlate with the delayed caravans. She is waiting for the threshold before reporting to Shelkopolis command.', category: 'evidence' }]
      }
    ]
  },

  ironhold_quarry: {
    npcId: 'darian_ironspike',
    name: 'Darian Ironspike',
    role: 'Ore Officer at Ironhold Quarry',
    tell: 'when something in a report does not add up, does not point to the error — sets two fingers on it and waits, holding the silence until whoever is across from him fills it',
    agenda: 'keep extraction output at quota while absorbing a resource theft problem he cannot trace without exposing how long it has been going on',
    triggerText: 'Ironspike is at the transit gate cross-referencing an ore cart manifest against the weight stamp it came in with.',
    dialogue: [
      {
        id: 'ironspike_weight',
        text: 'That cart weighed less at the gate than the manifest says it should.',
        tag: 'safe · lore · DC 7',
        skill: 'lore',
        dc: 7,
        result: 'Ironspike does not look up from the manifest. He says the transit weight stamp is applied at load point. The gate weight is measured on arrival. He says the difference between those two numbers is the variance field. He taps the variance column with two fingers and holds them there. He says the variance on this cart is within the tolerance range documented by the Iron Accord for road loss and settling. He says this is the fourth cart this week whose variance lands at exactly the top edge of that tolerance range. He lifts his fingers. He does not say what he thinks about that.',
        failResult: 'Ironspike stamps the manifest with a transit clearance mark and hands it to the gate clerk. He says if you have a concern about ore transit documentation, the compliance window is open at the ore office until the fourth bell. He turns back to the next cart.',
        effects: [{ type: 'journal', text: 'Ironspike flagged four carts this week whose transit-to-gate weight variance lands at exactly the top of Iron Accord tolerance range. He noted the pattern without stating a conclusion.', category: 'intelligence' }]
      },
      {
        id: 'ironspike_theft',
        text: 'Someone is skimming ore and they know exactly where the tolerance ceiling is.',
        tag: 'risky · persuasion · DC 13',
        skill: 'persuasion',
        dc: 13,
        result: 'A pause — not surprise, the pause of someone who has been waiting for this conversation. Ironspike sets two fingers on the variance column of the manifest. He says the Iron Accord tolerance was set at three percent of load weight to cover legitimate road variance. He says he has been tracking manifest variance figures for six weeks. He says the average variance across all carts originating from the lower east face is two-point-eight percent. He says this is consistent. He says consistent variance is not road variance. He lifts his fingers. He says the lower east face loading crew has rotated three times in six weeks. The rotation schedule is managed by an overseer whose name he does not say aloud at a transit gate.',
        failResult: 'Ironspike says ore transit discrepancies are filed through the compliance office and reviewed under Iron Accord protocol. He does not speculate about manifest patterns at an open gate. He stamps the next cart\'s manifest without looking at you again.',
        effects: [{ type: 'journal', text: 'Ironspike has been tracking lower east face variance for six weeks — consistently at 2.8%, which he described as not road variance. The loading crew rotated three times. The rotation schedule belongs to an overseer he would not name at an open gate.', category: 'evidence' }]
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
