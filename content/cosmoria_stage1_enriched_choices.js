/**
 * COSMORIA STAGE 1 ENRICHED MEANINGFUL CHOICES
 * 20 deeply grounded investigation paths tied to maritime archives, shipwright trade, and personal ambition corruption
 * Generated for: Personal ambition vs collective trust, individual power weaponized, archives/records as control
 * Each choice: 65-80 XP, grounded in floating intellectual metropolis politics and maritime hierarchy
 */

var COSMORIA_STAGE1_ENRICHED_CHOICES = [
  // ========== NPC-GROUNDED CHAINS (8 CHOICES) ==========

  // 1. STABLE FACTOR: TRADE ROUTES MANIPULATION
  {
    plot: 'main',
    questId: 'q_s1_pattern',
    label: "Three brigs at anchor, idle cranes. Cosmouth vessels have their berths.",
    tags: ['Investigation', 'NPC', 'Maritime', 'Commerce', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading maritime trade pattern shifts');
      G.stageProgress[1]++;

      const result = rollD20('charm', (G.skills.charm || 0));
      const target = 11 + Math.max(0, G.worldClocks.pressure);

      if (result.isCrit) {
        var _aurekFam = (typeof getArchetypeFamily === 'function') ? getArchetypeFamily(G.archetype) : '';
        var _aurekDetail = _aurekFam === 'combat' ? ' His eyes go to your hands once — then back to the cranes. He files you under \'not a merchant\' and decides that\'s fine.' : _aurekFam === 'stealth' ? ' He speaks without turning his head, his voice never carrying past the chain noise. He has had this kind of conversation before.' : _aurekFam === 'support' ? ' He glances sidelong after he\'s finished, calibrating whether you\'ll use what he said to help or only to know.' : '';
        G.lastResult = `Aurek Tidereach leans against the counting-house rail so his back is to the crane operators below. His voice drops under the chain noise. "Scheduling used to follow tides and declared cargo. Now I receive a list — berth two goes to Halvern's brig, berth seven stays empty until Cosmouth's factor authorizes. Independent captains sit at anchor until the tide turns against them. I've filed three complaints. Two went missing. One came back stamped 'reviewed.'" He stops talking when a stevedore passes with a ledger under his arm. The two complaints that disappeared were filed at the harbor registry. Whatever reviewed them left a trail.` + _aurekDetail;
        G.stageProgress[1]++;
        addJournal('Stable Factor revealed corrupted maritime trade route system', 'evidence', `cosmoria-trade-routes-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Aurek Tidereach goes still when you ask. He picks up a cargo tally from the desk and makes a show of reading it. "Dock allocation follows tidal schedules. Schedules are posted at the harbor gate." He doesn't look up. Two dockside clerks at the far end of the counting house have stopped writing. Your question landed louder than you intended, and the attention of everyone in earshot is now a problem you'll carry past this door.`;
        G.worldClocks.pressure++;
        addJournal('Stable Factor now protective of maritime trade allocation', 'complication', `cosmoria-trade-hostile-${G.dayCount}`);
      } else {
        if (G && G.flags && G.flags.met_kavan_sailor) {
          G.lastResult = `Aurek sets down his tally sheet. "You've spoken to Kavan." He glances toward the crane operators below. "He filed a formal complaint about his berth delay. I received the complaint three hours after he submitted it — with a notation that it had been 'administratively reviewed.'" He taps the counting-house rail. "His complaint was reviewed before I read it. The harbor administration has access to the filing intake. The berths they favor aren't assigned — they're reserved in advance, before the tide schedules are even posted."`;
          addJournal('Stable Factor confirmed Kavan complaint intercepted by harbor administration before arbitration', 'evidence', `cosmoria-trade-kavanlink-${G.dayCount}`);
        } else {
          G.lastResult = `Aurek sets down his tally sheet and admits berth priority has been "irregular this season." He gestures toward the harbor window — three brigs riding at anchor in the outer channel, loading cranes idle above them. "Weather and tides make scheduling difficult. That's always been true." He picks up the tally again before you can follow up. The three brigs at anchor are all flying independent merchant pennants — the berths they're waiting for are occupied by vessels with Cosmouth house flags that arrived after them.`;
          addJournal('Stable Factor confirmed inconsistent route allocations', 'evidence', `cosmoria-trade-pressure-${G.dayCount}`);
        }
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    },
    failResult: {
      text: "The counting-house gate is latched when you return — the scheduling window Aurek cited ran out while you were gathering your approach. A stevedore at the lower gate says the stable factor keeps irregular hours during high-tide allocation cycles; the next open window is posted at the harbor gate board each morning before the first bell. Tideon at the arrivals desk works the same building and keeps a parallel record of berth assignments. His post has no scheduling restriction.",
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  },

  // 2. QUARTERMASTER: SUPPLY CHAIN DIVERSION
  {
    plot: 'main',
    questId: 'q_s1_converging',
    label: "Forty for Cosmouth crews. Twenty for independents. Different hand wrote the correction.",
    tags: ['Investigation', 'NPC', 'Resources', 'Supply', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering supply chain manipulation');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0));

      if (result.isCrit) {
        G.lastResult = `Coralyn Tideglass pulls a ledger from the lower stack — not the one on top. She opens it to a page where three lines have been crossed out. "Sailcloth, forty bolts, crew maintenance." She covers the original entry with her thumb, then lifts it. "Twenty bolts. Listed for independent merchants." She covers the correction, lifts it. "Forty. Listed for Cosmouth brig crews." Same handwriting across five more pages. "I didn't write those corrections," she says. She keeps her thumb on the line she's practiced not speaking aloud.`;
        G.stageProgress[1]++;
        addJournal('Quartermaster revealed supply chain diversion conspiracy', 'evidence', `cosmoria-supplies-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Coralyn's expression closes like a hatch. "Supply records are under Cosmouth administrative hold pending seasonal audit. Access requires a charter warrant." She covers the hold-stamp line with her thumb while she reads the form aloud, then sets the ledger down without lifting her hand from it. A document in the stack behind her bears a red ADMINISTRATIVE HOLD stamp in narrow Collegium block lettering — she shifts to block it. By evening the docks are quieter than they were this morning. The watchful silence means word has moved.`;
        G.worldClocks.watchfulness++;
        addJournal('Quartermaster spreading suspicion about supply chain inquiry', 'complication', `cosmoria-supplies-alert-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `Coralyn admits provisions have been "difficult to reconcile this quarter." She shows you a single page — rope inventory, two entries that don't add up by thirty fathoms. She covers the column header with her thumb, then lifts it. "Transit loss." She covers it again. "I was told it's standard." She can't tell you what transit loss means, or who authorized that header. Her thumb stays on the line after she stops speaking. The correction appears across three consecutive pages; whoever adjusted these figures is still working through the ledger. Someone was cleaning the record ahead of you. They are still doing it.`;
        addJournal('Quartermaster confirmed supply allocation ambiguity — record being cleaned ahead of inquiry', 'evidence', `cosmoria-supplies-unclear-${G.dayCount}`);
      } else {
        if (G && G.flags && G.flags.met_iron_compact_cosmoria) {
          G.lastResult = `Coralyn's eyes go to the Iron Compact emblem on the document visible in your bag. "You know who manufactures the rope." She says it flatly, then checks the corridor. "The Compact factor came here two months ago and showed me the same ledger entry — the one that says their delivery never arrived, while the supply log says it did. The log is wrong. The Compact delivery came in, was signed off by a third party, and went somewhere other than the quartermaster's store." She sets the ledger down. "I don't know where. I know I didn't sign it out."`;
          addJournal('Quartermaster confirmed Iron Compact delivery diverted by third party — records falsified', 'evidence', `cosmoria-supplies-compact-${G.dayCount}`);
        } else {
          G.lastResult = `Coralyn says the ledgers require a Cosmouth supply warrant to access. She says it without meeting your eyes, her thumb pressed flat against the warrant procedure notice on her desk as if to keep it from speaking for her. The process takes three days minimum, routes through the harbor administration that manages dock priority, and requires a reason in writing. The clerk of arrivals, Tideon, holds a separate set of carbon copies of the supply receipts as part of the manifest filing chain — a parallel record that doesn't require the same warrant.`;
          addJournal('Supply records blocked without archive authorization', 'evidence', `cosmoria-supplies-blocked-${G.dayCount}`);
        }
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    },
    failResult: {
      text: "The supply counter closes at the third bell — the warrant procedure Coralyn cited takes three days minimum and the window you had is gone. The salt smell off the lower harbor is stronger in the afternoon, when the wind shifts. The clerk of arrivals, Tideon, files carbon copies of supply receipts as part of the manifest chain; his copies don't require the same warrant. His desk is open until the evening tide.",
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  },

  // 3. SHRINE CARETAKER: RITUAL CORRUPTION
  {
    plot: 'main',
    questId: 'q_s1_converging',
    label: "Some crews get the full rite. Others get turned away. The list decides.",
    tags: ['Investigation', 'NPC', 'Faith', 'Ritual', 'Meaningful'],
    condition: function() { return (G.investigationProgress||0) < 3; },
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading corrupted maritime ritual patterns');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0));

      if (result.isCrit) {
        G.lastResult = `Maris Coralwake speaks with her back to the shrine door and her hands folded tight in her vestments. "Last season I blessed every crew that came to the water gate. Now I'm handed a list before the morning tide. Some crews receive the full communion. Others receive" — she pauses — "a shorter rite. If they ask, I'm to say the full ceremony is reserved for members in good charter standing." She looks at the offering shelf, not at you. "There is no charter standing requirement in any text I have ever read."`;
        G.stageProgress[1]++;
        addJournal('Shrine Caretaker revealed corrupted maritime ritual system', 'evidence', `cosmoria-rituals-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Maris draws herself up and says the rituals of the sea shrine are matters of doctrine, not public record. She says it firmly but her hands are shaking. By afternoon a harbor warden stops you on the upper street and asks your business at the shrine. Someone reported the visit within the hour. The shrine's exterior door is now latched when you pass again at dusk. The scrutiny of the warden's questions was specific enough to confirm that your presence here is now on record.`;
        G.worldClocks.reverence++;
        addJournal('Shrine Caretaker barred you from faith record access', 'complication', `cosmoria-rituals-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Maris says the communion form was updated at the start of this tide cycle — new language in the tide-oath, a different sequence for the water-sealing at the end. "Doctrine evolves," she says. She recites it like something she rehearsed. When you ask who authorized the change she names a Cosmouth administrative body you haven't heard of before. The same body name appears on three of the ward charter amendments filed in the past eight months. A body with that name and that kind of reach doesn't authorize ritual changes by accident.`;
        addJournal('Shrine Caretaker confirmed recent ritual modifications', 'evidence', `cosmoria-rituals-changed-${G.dayCount}`);
      } else {
        G.lastResult = `Maris says ritual records are restricted to initiated caretakers. Her answer is polite and complete and tells you nothing. The ritual text you need is written on a board inside the water gate — visible from the threshold but not from outside it. You are standing outside it. A caretaker apprentice sweeping the threshold steps between you and the board before you finish reading. The step is not accidental. The board is not meant to be read from where you are.`;
        addJournal('Shrine rituals blocked without ceremonial access', 'evidence', `cosmoria-rituals-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    },
    failResult: {
      text: "The water gate closes at low tide and Maris is gone by the time you reach the threshold — a caretaker apprentice says she won't return until the morning ceremony. The ritual text you need is written on a board inside the gate, visible from the threshold on the morning approach. The ward mediator's district hearings cite the same recent ritual amendments in three of her case summaries; those summaries are in the public index.",
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  },

  // 4. CLERK OF ARRIVALS: RECORD TAMPERING
  {
    plot: 'main',
    label: "Three vessels, identical manifests word for word. Different ships, different dates.",
    tags: ['Investigation', 'NPC', 'Archives', 'Records', 'Meaningful'],
    condition: function() { return (G.investigationProgress||0) >= 3 && (G.investigationProgress||0) < 6; },
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering archive record tampering');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0));

      if (result.isCrit) {
        var _tideonFam = (typeof getArchetypeFamily === 'function') ? getArchetypeFamily(G.archetype) : '';
        var _tideonDetail = _tideonFam === 'combat' ? ' He hands over the carbon without comment, but he tracks the room over your shoulder the whole time — checking who is watching, not whether you can handle what he just said.' : _tideonFam === 'stealth' ? ' He slides the carbon across with two fingers, not passing it directly. No hand-to-hand. He has thought about this moment.' : _tideonFam === 'support' ? ' When he refolds the copy, his hands are steady. He has been waiting for someone to show up for this. He is relieved you did.' : '';
        G.lastResult = `Tideon Anchorlight unlocks a side drawer and pulls out a folded page — a carbon copy of an arrivals log that doesn't match the primary registry on the shelf beside it. He sets them side by side on the counter without speaking. The primary log shows the Thornwall Passage arrived on the eighteenth. The carbon shows the seventeenth. "Someone corrected the primary after the carbon was filed," he says. "I have nine of these. The carbons are in my coat pocket every morning when I leave. I don't trust the drawer anymore." He refolks the copy and tucks it away.` + _tideonDetail;
        G.stageProgress[1]++;
        addJournal('Clerk of Arrivals revealed archive record falsification system', 'evidence', `cosmoria-records-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Tideon stops writing and looks at your hands, not your face. "Arrival records are Cosmouth administrative property. Requests go through the harbor registry office, third floor, second and fifth watch-days of the tide-week." He goes back to writing before you finish the sentence. The clerk at the next desk has already stopped working. An hour later, your name appears in the harbor office's visitor log — entered by someone who wasn't you. Being tracked in their records before you've asked for anything makes the next approach harder.`;
        G.worldClocks.watchfulness++;
        addJournal('Archive clerks warned about your record access', 'complication', `cosmoria-records-alert-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `Tideon puts down his pen and says record management has been "under revision." New categories were added two months ago — bonded transit, delayed-manifest, provisional entry. He explains each one without meeting your eyes. When you ask for examples, he opens the wrong ledger first. In the stack of documents behind him, partially visible between two bound volumes, a single loose sheet bears a red stamp across its upper third — the words ADMINISTRATIVE HOLD in block characters. He does not acknowledge it. He does not look at it. He knows where the anomalies are. He's not ready to show them to you yet.`;
        addJournal('Clerk of Arrivals confirmed non-standard record practices', 'evidence', `cosmoria-records-evasive-${G.dayCount}`);
      } else {
        G.lastResult = `Tideon points you to the public summary board at the harbor gate — vessel names, declared cargo class, arrival date, no details. The full registry requires an archivist credential issued by the harbor authority. The harbor authority reports to House Cosmouth. The process is circular and Tideon knows it. He fills out a request form for you and hands it over without comment.`;
        addJournal('Archive records blocked — harbor authority credential required, routes to House Cosmouth', 'evidence', `cosmoria-records-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    },
    failResult: {
      text: "The registry office closes on the second and fourth watch-days of the tide-week — you arrived between cycles. Tideon's desk is unoccupied; a clerk's aide says the credential process runs through the harbor authority, which means the path circles back. The public summary board at the harbor gate lists vessel names and arrival dates without detail, but the summary alone shows three manifests with identical cargo descriptions across different dates. That much doesn't require a credential.",
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  },

  // 5. WARD MEDIATOR: CONFLICT RESOLUTION FAILURES
  {
    plot: 'main',
    label: "The ruling arrived before the hearing. She ruled differently. Her credentials were reviewed.",
    tags: ['Investigation', 'NPC', 'Mediation', 'Districts', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering mediation system corruption');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0));

      if (result.isCrit) {
        G.lastResult = `Vethis sets a sealed document on the table between you and doesn't open it. "This arrived before my last hearing. It outlined the preferred ruling." The seal is a Cosmouth administrative mark — not a judicial one. "I ruled differently. The following week I received a review notice questioning my professional credentials." She taps the document. "I kept it. In case someone came asking." She slides it across the table. The salt smell drifts up from the lower harbor. She waits.`;
        G.stageProgress[1]++;
        addJournal('Ward Mediator revealed corrupted district mediation system', 'evidence', `cosmoria-mediation-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Vethis stands, not quickly — carefully. "Mediation proceedings are protected under ward confidentiality. You'll need to file a formal observation request with the harbor district council." She holds the door open before you've said you're leaving. The district council chamber is two streets away; when you pass it an hour later, there's a warden outside who wasn't there before. The pressure of their notice is specific — someone in that building reported where you went after leaving Vethis's office.`;
        G.worldClocks.pressure++;
        addJournal('Ward Mediator prohibited further mediation questions', 'complication', `cosmoria-mediation-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Vethis says ward disputes have been "unusually contentious this cycle." She describes one case — a mooring rights dispute between an independent fisher and a Cosmouth brig captain — and the way she tells it, the reasoning she applied, doesn't match the ruling she issued. She notices you noticing. "I applied the standard framework," she says. She doesn't repeat it. The ruling she issued is in the public case summary index — the reasoning she filed is on record.`;
        addJournal('Ward Mediator confirmed recent mediation bias patterns', 'evidence', `cosmoria-mediation-biased-${G.dayCount}`);
      } else {
        G.lastResult = `Vethis explains that case records are sealed for sixty days per ward protocol. Summaries are available through the district clerk's office with a party-of-interest certification. You are not a party of interest. She writes down the clerk's address on a slip of paper and hands it over. Her handwriting is precise. One independent merchant who held the mooring rights in the dispute she described would qualify as a party of interest — and the case summary index is public.`;
        addJournal('District mediation blocked without ward authorization', 'evidence', `cosmoria-mediation-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    },
    failResult: {
      text: "The district clerk's office has already closed for the afternoon session — the party-of-interest certification Vethis described requires in-person filing before the second bell. She wrote down the address in precise handwriting; the office opens at first light. One independent merchant who held mooring rights in the dispute she described would qualify as a party of interest, and the case summary index is public. The harbour front runs with working merchants from dawn.",
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  },

  // 6. STREET PHYSICIAN: HEALTH RECORDS FALSIFICATION
  {
    plot: 'main',
    label: "His record says acute. The health roll says seasonal minor. Different date, different severity.",
    tags: ['Investigation', 'NPC', 'Health', 'Records', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading population health corruption patterns');
      G.stageProgress[1]++;

      const result = rollD20('vigor', (G.skills.vigor || 0));

      if (result.isCrit) {
        G.lastResult = `Sevrin Shellmark keeps his own records in a salt-warped notebook that he doesn't leave at the clinic. He opens it on his knee rather than on the desk. "Three families in the lower ward, respiratory. I listed it as acute. The harbor health roll came back listing it as seasonal minor." He shows you his entry. Shows you the filed copy. The filed copy has a different date and a different severity category. "I haven't corrected it," he says quietly. "Because I don't know who's reading my corrections." He closes the notebook.`;
        G.stageProgress[1]++;
        addJournal('Street Physician revealed falsified health records system', 'evidence', `cosmoria-health-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Sevrin's answer comes out rehearsed — patient records are protected under the Cosmouth health privacy charter, you'd need a public health warrant, apply at the harbor registry. He turns to his instruments and starts cleaning them with the focus of someone who wants to end a conversation. There's a notebook on the shelf behind him, tucked behind a jar of salt compress. He doesn't look at it. You don't either. This kind of isolation from a source — polite, immediate, final — is harder to overcome than open hostility.`;
        G.worldClocks.isolation++;
        addJournal('Street Physician forbade further health records inquiry', 'complication', `cosmoria-health-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Sevrin says access protocols changed two months ago — all health rolls now route through the harbor registry before the physician keeps a copy. He describes it as an administrative efficiency measure. He wrings out a compress into a bucket while he talks, and the motion is too deliberate, too even. He knows what the routing change does to his ability to document freely. He just hasn't said it yet.`;
        addJournal('Street Physician confirmed recent health record access restrictions', 'evidence', `cosmoria-health-restricted-${G.dayCount}`);
      } else {
        G.lastResult = `Sevrin says the patient rolls are protected under the healer's seal — a genuine protection, one he takes seriously. He offers a public summary instead: general categories, no names, no addresses. The summary is a single line: "Lower ward: seasonal complaint, resolved." It tells you nothing. The smell of salt and poultice in the clinic is stronger than it should be for a clinic treating only seasonal complaints.`;
        addJournal('Health records blocked without medical authorization', 'evidence', `cosmoria-health-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    },
    failResult: {
      text: "The public health warrant process runs through the harbor registry — same building, same queue, same administrative hold. The clinic closes before the fourth bell. Sevrin's notebook stays behind the salt-compress jar. The harbor health rolls are a separate filing from the patient records; they go to the district summary board as aggregated categories. The board is outside the clinic, not behind it, and nobody controls who reads it.",
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  },

  // 7. ARCHIVIST: DOCUMENT DESTRUCTION
  {
    plot: 'main',
    label: "A gap on the archive shelf — dust-free at the edges. That level is new.",
    tags: ['Investigation', 'NPC', 'Archives', 'History', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering archive destruction conspiracy');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0));

      if (result.isCrit) {
        G.lastResult = `The Archive Keeper walks you to a shelf and points to a gap — three fingers wide, dust free at the edges, older dust in the center. "Trade Compact records, years forty-one through forty-six. The years when independent merchants ran forty percent of the harbor." He doesn't lower his voice. There's nobody else here. "They were re-classified as restricted operational history two weeks ago. Sealed storage, third level. I don't have a key for the third level." He turns to face you. "I've worked this archive for nineteen years. There was no third level until six months ago."`;
        G.stageProgress[1]++;
        addJournal('Archive Keeper revealed systematic document destruction conspiracy', 'evidence', `cosmoria-archives-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The archivist's face doesn't change but his hand moves to the edge of the reading counter, bracing. "Collection management decisions are made by the archive board. Questions about specific records go through the formal inquiry process." He produces a form — six sections, two requiring notarized seals. Your reading access is downgraded to the public catalogue before you reach the door. The watchful response confirms someone placed a standing alert on this collection — the question triggered it.`;
        G.worldClocks.watchfulness++;
        addJournal('Archive Keeper banned you from collection inquiry', 'complication', `cosmoria-archives-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The archivist confirms there was a collection reorganization — calls it a security audit. Several document categories moved to restricted access. He shows you the current access tier list, printed on a fresh sheet with no date. The paper smells of recent ink. When you ask for the previous tier list for comparison, he tells you the prior version wasn't retained. Someone was cleaning the record ahead of you. They are still doing it.`;
        addJournal('Archive Keeper confirmed document reorganization — someone was cleaning the record ahead of you', 'evidence', `cosmoria-archives-reorganized-${G.dayCount}`);
      } else {
        G.lastResult = `The archivist directs you to the public catalogue — vessels, cargo categories, tide records. The specific records you need are in a collection section that requires a permanent research credential. Applications take four to six weeks. The credential is issued by the harbor registry. You are back at the same door. The catalogue smells of old salt-stiffened paper and tells you nothing you don't already know.`;
        addJournal('Archive records blocked without collection access', 'evidence', `cosmoria-archives-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    },
    failResult: {
      text: "The reading room closes an hour before the evening tide and the permanent research credential takes four to six weeks through the harbor authority — the circular path runs back to the same administration that holds the restricted records. The public catalogue still smells of salt-stiffened paper. The appeal log for the correction review on the independent vessel's case is in the public guild record; the archive keeper is not the only route to what's been removed.",
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  },

  // 8. SHIPWRIGHT FOREMAN: QUALITY STANDARDS CORRUPTION
  {
    plot: 'main',
    label: "Cosmouth joins: approved. Identical independent joins: eleven days under review.",
    tags: ['Investigation', 'NPC', 'Craft', 'Quality', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering shipwright safety corruption');
      G.stageProgress[1]++;

      const result = rollD20('spirit', (G.skills.spirit || 0));

      if (result.isCrit) {
        G.lastResult = `Haskon puts down the adze and wipes pitch from his hands before answering. He walks you to a vessel on the middle berth — Cosmouth house flag, new timber, finished yesterday by the look of the caulking. He runs his thumb along a join near the waterline. "That passes now. Two years ago I'd have sent it back." He crosses to an independent builder's brig two berths over, older vessel, tight joins. "This one has been under correction review for eleven days. Minor variation in rib spacing — within tolerance, just not Cosmouth standard." He doesn't raise his voice. He doesn't need to.`;
        G.stageProgress[1]++;
        addJournal('Shipwright revealed corrupted vessel quality system', 'evidence', `cosmoria-shipwright-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The shipwright sets his mallet down slowly. "Quality inspection isn't a public process." He says it watching your hands. By the time you leave the dry dock the other builders have gone quiet — tools still running but eyes tracking you down the walk. The pitch smell and salt air follow you up to the commercial street. Before evening one of the younger workers has asked another shipyard who you were. You've been noticed in a trade where reputation travels faster than tide.`;
        G.worldClocks.watchfulness++;
        addJournal('Shipwright community warned about your quality inquiry', 'complication', `cosmoria-shipwright-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The shipwright admits inspection timelines have been "inconsistent." She points at two vessels in adjacent berths — one approved in a day, one delayed for nine. She doesn't say which house flags they're carrying, but she doesn't have to. You can read the pennants yourself. "Standards evolve," she says. She picks up her adze. The appeal log for the delayed vessel's correction review is in the public guild record.`;
        addJournal('Shipwright confirmed inconsistent quality standard application', 'evidence', `cosmoria-shipwright-evasive-${G.dayCount}`);
      } else {
        G.lastResult = `The shipwright tells you inspection records are guild-sealed and not available without a build commission. Without one, you can walk the public berths and look at the hulls yourself. Two adjacent berths hold vessels from different flag affiliations — one Cosmouth, one independent — with visibly different join tolerances at the waterline. The inspection panel that approved both is the same panel. The appeal log for the independent vessel's correction review is in the public guild record.`;
        addJournal('Shipwright standards blocked without craft access', 'evidence', `cosmoria-shipwright-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    },
    failResult: {
      text: "The guild inspection office closes at the third bell — the build commission requirement runs through the same panel that issued the approvals you're questioning. The appeal log for the independent vessel's correction review is in the public guild record; that filing doesn't require a commission or a credential. Two adjacent berths are visible from the public walk without setting foot past the dry-dock barrier, and the join tolerances at the waterline tell the story without the paperwork.",
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  },

  // ========== ARCHETYPE DEEP DIVES (8 CHOICES) ==========

  // 9. MARITIME HIERARCHY: FLOATING DISTRICT REORGANIZATION
  {
    plot: 'main',
    label: "Five amendments in eight months. Each one adds a Cosmouth clause.",
    tags: ['Investigation', 'Structure', 'Organization', 'Maritime', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'maritime hierarchy analysis');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0));

      if (result.isCrit) {
        G.lastResult = `The ward charter amendments from the past eight months are public record — five of them, each adding a Cosmouth oversight clause to a previously independent district function. The third amendment reclassified ward councils as advisory. The fifth removed the ward mediator appointment process from district vote. The amendments were passed under emergency maritime stability provisions that don't require public hearing. Each one individually is minor. Together they redirect every decision node in the district structure toward a single point.`;
        G.stageProgress[1]++;
        addJournal('Structure analysis revealed centralized power consolidation', 'evidence', `cosmoria-structure-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The ward charter amendments are public but the archive clerk pulls the file and sets it on the counter and then stands there while you read. When you take notes, he notes that you're taking notes. Before you finish the third document, a harbor functionary arrives and asks your name. They write it down. They don't explain why. The file goes back to the shelf before you've read the fifth amendment. The scrutiny was triggered by the specific documents, not just your presence.`;
        G.worldClocks.watchfulness++;
        addJournal('House Cosmouth alerted to governance structure inquiry', 'complication', `cosmoria-structure-alert-${G.dayCount}`);
      } else {
        G.lastResult = `The public ward charter shows three amendments in the past year. The language is dense with maritime administrative terminology but the structural effect is readable: two ward positions that previously reported to the district council now report directly to the harbor authority. The emergency maritime stability provision cited in each amendment requires a formal emergency declaration — that declaration, if it exists, is in the public harbor registry as a matter of record.`;
        addJournal('District hierarchy modifications confirmed', 'evidence', `cosmoria-structure-modified-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    },
    failResult: {
      text: "The public charter file closes with the archive at the fourth bell — the session where the warden arrived ended before you reached the fifth amendment. The ward charter amendments are filed by date in the public record; the emergency maritime stability provision cited in each one requires a formal emergency declaration, and that declaration is in the harbor registry as a matter of record. The registry is open until the morning tide.",
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  },

  // 10. MARITIME NETWORKS: MERCHANT DISPLACEMENT
  {
    plot: 'main',
    label: "Sixty-four independent merchants three years ago. Forty-one now. It was selectively cleared.",
    tags: ['Investigation', 'Networks', 'Maritime', 'Displacement', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'merchant network displacement mapping');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0));

      if (result.isCrit) {
        G.lastResult = `The harbor trader roster from three years ago lists sixty-four active independent merchants. The current roster has forty-one. You pull departure records for the missing twenty-three: twelve left Cosmoria entirely, six have no recorded activity after their dock access was declined, five are still listed as registered but haven't filed a cargo manifest in more than a year. In the same period, nine new merchants with Cosmouth house affiliations appear in the active roster. The harbor didn't shrink. It was selectively cleared.`;
        G.stageProgress[1]++;
        addJournal('Network analysis revealed deliberate merchant displacement', 'evidence', `cosmoria-network-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `You request the trader roster comparison through the harbor registry. The clerk takes the request, goes into the back room, and returns with a Cosmouth trade officer instead of a document. The officer asks what you need the historical roster for. You give a reason. He writes it down. The document request is marked pending review. By the time you leave the building, two independent merchants you'd spoken to earlier that day have stopped being available. Being tracked through the registry makes every subsequent conversation harder to trust.`;
        G.worldClocks.watchfulness++;
        addJournal('House Cosmouth alerted to network analysis', 'complication', `cosmoria-network-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The public trader registry shows turnover — names dropping off, new names appearing. Without the historical roster for comparison you can only see the current state, not the shape of what changed. What's visible: four of the seven newest registrations share an address in the Cosmouth merchant quarter. A fifth registration was filed by the same notary who certified two of the ward charter amendments. The connections are in the public record if you know which columns to line up.`;
        addJournal('Merchant network composition changes confirmed', 'evidence', `cosmoria-network-modified-${G.dayCount}`);
      } else {
        G.lastResult = `The current trader registry shows who's active, not who isn't. Without access to the decline records or the historical roster, you can map what's present but not what was removed. Two independent merchants you speak to on the lower docks confirm departures — "Essad left in the fourth month, Corl three weeks after" — and name the dock allocation denials that preceded each departure. Dock allocation decisions are logged by berth date in the stable factor's public scheduling record.`;
        addJournal('Merchant displacement analysis incomplete', 'evidence', `cosmoria-network-partial-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    },
    failResult: {
      text: "The harbor registry closes the historical roster access under administrative review before you complete the request — the Cosmouth trade officer's name goes in a log you can't see. The current public trader registry shows who is active today; two independent merchants on the lower docks name the dock allocation denials that preceded each departure by a fellow merchant. Dock allocation decisions are logged by berth date in the stable factor's public scheduling record.",
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  },

  // 11. ARCHIVE INTEGRITY: DOCUMENTATION SYSTEM ANALYSIS
  {
    plot: 'main',
    label: "Three pages of public access last year. One page now. The gap covers everything before.",
    tags: ['Investigation', 'Archives', 'System', 'Information', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'archive system integrity analysis');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0));

      if (result.isCrit) {
        G.lastResult = `The archive's public access ledger lists what's available without a credential. Twelve months ago that list ran to three pages. The current version is one page. You count the categories that dropped off: merchant autonomy records, harbor taxation history, disease and injury rolls, independent ward correspondence. Every removed category covers a period before Cosmouth consolidated harbor authority. The access ledger itself is dated and signed. The person who signed it signed all twelve restriction orders in the same week.`;
        G.stageProgress[1]++;
        addJournal('Archive analysis revealed information control system', 'evidence', `cosmoria-info-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `You ask the senior archivist directly about the access list reduction. He pauses — not surprised, something flatter than surprise — and says access policy is a board matter and not open to patron comment. Before you leave the reading room, someone has noted your seat number in a separate register. Your next request to the archive catalogue returns a shorter list than the one you received this morning. The scrutiny is now attached to your patron record.`;
        G.worldClocks.watchfulness++;
        addJournal('Archive authorities monitoring information restriction inquiry', 'complication', `cosmoria-info-alert-${G.dayCount}`);
      } else {
        G.lastResult = `The access list is shorter than it should be for an archive this size. Several categories are marked with a new classification stamp — a red border around the entry — that wasn't in use last season. The stamp says "administrative hold, pending review." The review has no listed completion date and no listed reviewer. The patron seated across from you glances at the entries you're reading, then angles his own copy away. He has noticed what you're looking at. He does not appear surprised by it.`;
        addJournal('Archive access restriction changes confirmed', 'evidence', `cosmoria-info-restricted-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    },
    failResult: {
      text: "The senior archivist is gone before the end of the reading session — your seat number is in a separate register and the access list you receive on the next request is shorter. Several categories bear the new red-border stamp: administrative hold, pending review, no listed completion date. The archive keeper works the early morning shift before the board convenes; that window exists outside the monitoring that follows the public reading hours.",
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  },

  // 12. PERSONAL AMBITION TRACKING: WHO'S RISING
  {
    plot: 'main',
    label: "Three new positions, same administrative cycle, all filled by the same harbor authority office.",
    tags: ['Investigation', 'Ambition', 'Power', 'Tracking', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'personal ambition pattern mapping');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0));

      if (result.isCrit) {
        G.lastResult = `Three names appear across multiple institutional changes in the past year. A treasury clerk named Ossel now signs off on supply allocation orders that previously required a harbor commissioner's seal. A merchant named Farre with two years of registry history is listed as advisor to the archive board. A shipwright named Calden whose workshop was registered fourteen months ago sits on the inspection standards panel. None of them held these positions two years ago. All three positions were newly created in the same administrative cycle. All three appointments were made by the same harbor authority office.`;
        G.stageProgress[1]++;
        addJournal('Ambition analysis revealed orchestrated power installation system', 'evidence', `cosmoria-ambition-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Requesting appointment records through the harbor registry produces a response faster than expected — a Cosmouth security clerk, not the archivist, with a question about your interest in internal administrative staffing. You give a neutral answer. He writes it down. Within the hour a notice appears at your lodging address — a reminder that harbor administrative records are protected under the Cosmouth governance charter. Nobody told you your lodging address. The pressure of being tracked to your accommodation is not subtle.`;
        G.worldClocks.pressure++;
        addJournal('House Cosmouth security alerted to ambition analysis', 'complication', `cosmoria-ambition-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The public appointment records show the names and the positions. What they don't show is the promotion history — how these individuals advanced from their prior roles, what qualifications were assessed, who recommended them. Without the internal files, you have the outcome but not the mechanism. The outcome is clear enough: all three newly powerful positions were created and filled within a single administrative session. The same session that amended the ward charter twice without a public hearing.`;
        addJournal('Power advancement pattern changes confirmed', 'evidence', `cosmoria-ambition-confirmed-${G.dayCount}`);
      } else {
        G.lastResult = `The public record confirms unusual appointment timing but not the coordination behind it. You can see that three people were elevated simultaneously into newly created positions. You can't see who created those positions, what criteria were applied, or whether the appointments were connected — that documentation is in the internal administrative files, not the public registry. Three positions created at once, filled at once. The coincidence requires an explanation that the public filing does not provide.`;
        addJournal('Individual power tracking incomplete', 'evidence', `cosmoria-ambition-partial-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    },
    failResult: {
      text: "The Cosmouth security clerk's note arrives at your lodging address before you return — a reminder that harbor administrative records are protected under governance charter. The three new names in the appointment record are listed there because their positions were newly created and publicly filed; each appointment record shows the issuing office. That part is in the public registry and doesn't require an internal request.",
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  },

  // 13. INSTITUTIONAL LEVERAGE: DEPENDENCY SYSTEM
  {
    plot: 'main',
    label: "Process, delay, paperwork — until the person at the center understands what it wants.",
    tags: ['Investigation', 'Institutions', 'Dependency', 'Power', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'institutional dependency system documentation');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0));

      if (result.isCrit) {
        G.lastResult = `Four independent merchants describe the same sequence: a minor administrative irregularity flagged against their record, a compliance review scheduled, a suggestion from a Cosmouth clerk that the review might be resolved favorably if they adjusted their dock preference requests. All four adjusted. Two sailors describe certification delays that ended after they stopped working with a specific independent captain. A clinic patient describes being told their shrine blessing was "conditional." The coercion doesn't announce itself. It arrives as process, as delay, as paperwork — until the person at the center works out what the paperwork wants from them.`;
        G.stageProgress[1]++;
        addJournal('Institution analysis revealed systematic dependency weaponization', 'evidence', `cosmoria-dependency-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The third independent merchant you speak to is interrupted mid-sentence by a Cosmouth clerk who appears at his warehouse door and tells him his quarterly compliance paperwork is overdue. The merchant goes pale and excuses himself. The clerk doesn't look at you. When the merchant comes back twenty minutes later he says he doesn't remember what he was telling you before. He's not lying. He just knows what he costs himself by remembering. The timing of that interruption is harder to explain as coincidence than as attention.`;
        G.worldClocks.pressure++;
        addJournal('Authorities warned about institutional vulnerability analysis', 'complication', `cosmoria-dependency-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The pattern is visible in how people stop talking. An independent merchant answers your first two questions and then looks at the door. A sailor mentions a certification delay and then says it's resolved, don't worry about it. A clinic patient says the shrine blessing works fine now and changes the subject. The dependency isn't hidden. It's just rarely named, because naming it is the most expensive thing any of them could do.`;
        addJournal('Institutional dependency and fear patterns confirmed', 'evidence', `cosmoria-dependency-confirmed-${G.dayCount}`);
      } else {
        G.lastResult = `You find three merchants willing to talk in general terms. None will describe a specific incident. They each describe the same kind of pressure — compliance paperwork, delayed access, a suggestion that things would move faster with different decisions — without naming names or dates. They're testing the water with you the same way you're testing it with them. Nobody commits to anything yet.`;
        addJournal('Institutional dependency analysis incomplete', 'evidence', `cosmoria-dependency-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    },
    failResult: {
      text: "A Cosmouth compliance clerk arrives at the counting house before the third merchant finishes — the fourth leaves mid-sentence when the clerk appears in the doorway. The pattern of pressure is visible in who goes quiet and how quickly. The independent merchants on the lower docks won't name incidents today, but the harbor front before dawn runs differently; early morning is before the compliance rounds begin.",
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  },

  // 14. SUPPLY MANIPULATION: RESOURCE SCARCITY CREATION
  {
    plot: 'main',
    label: "Full deliveries arrive. Independents get sixty percent. The rest is reserved, nothing scheduled.",
    tags: ['Investigation', 'Resources', 'Scarcity', 'Control', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'resource scarcity manipulation mapping');
      G.stageProgress[1]++;

      const result = rollD20('spirit', (G.skills.spirit || 0));

      if (result.isCrit) {
        G.lastResult = `The supplier manifests show full deliveries arriving at the harbor warehouse. The independent builder allocation records show partial distributions — sailcloth at sixty percent of ordered quantity, rope at seventy. The warehouse inventory reconciliation shows the remaining stock categorized as "reserved — Cosmouth fleet maintenance." The fleet maintenance logs show nothing scheduled for the dates those reserves were created. The materials exist. They're sitting in a warehouse fifty meters from where builders are requesting them and being refused.`;
        G.stageProgress[1]++;
        addJournal('Resource analysis revealed artificial scarcity creation', 'evidence', `cosmoria-scarcity-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Requesting the warehouse inventory records produces a quartermaster's aide, not a clerk, who asks what you need the supply figures for. You give a reason. The aide says the warehouse is under a Cosmouth fleet audit and records are temporarily restricted. By the time you reach the lower docks, two independent builders you'd been planning to approach have been told by the warehouse foreman that their pending allocation requests are under review. Being noticed asking about supplies has made their position harder.`;
        G.worldClocks.watchfulness++;
        addJournal('Quartermaster alerted to supply tracking', 'complication', `cosmoria-scarcity-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Three independent builders confirm their allocation requests came back short this quarter. All three used the word "shortage" and all three were told the shortage was seasonal. The seasonal shortage explanation doesn't account for why the Cosmouth brig that launched yesterday had full-weight rope fittings — bright new cordage, heavy gauge, no splice or repair. You saw the fittings from the upper berth walk. The builders who need that same rope are still waiting on their allocation requests, still being told to expect seasonal delays.`;
        addJournal('Resource distribution modifications detected', 'evidence', `cosmoria-scarcity-modified-${G.dayCount}`);
      } else {
        G.lastResult = `You can see that independent builders are receiving less than they ordered. You can't see the warehouse inventory or the allocation orders that determine who gets what. The builders themselves don't have that documentation — they only have the shortage. The Iron Compact's cargo projections include inbound supplier manifests as part of their routing data; the same documents the harbor warehouse controls appear in the Compact's commercial intake log as a separate filing.`;
        addJournal('Resource scarcity analysis incomplete', 'evidence', `cosmoria-scarcity-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    },
    failResult: {
      text: "The warehouse is under fleet audit — allocation records temporarily restricted, quarter fathoms unaccounted for in the public summary. The Iron Compact's cargo projections include inbound supplier manifests as part of their routing data; the same documents the harbor warehouse controls appear in the Compact's commercial intake log as a separate filing. Sull Crenn's office is accessible by appointment; the intake log itself is open to commercial parties.",
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  },

  // 15. FAITH WEAPONIZATION: RITUAL AS CONTROL
  {
    plot: 'main',
    label: "Cosmouth crews get the full rite. Independent crews are turned away — again.",
    tags: ['Investigation', 'Faith', 'Ritual', 'Control', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'ritual weaponization documentation');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0));

      if (result.isCrit) {
        G.lastResult = `The morning tide ceremony at the water gate lasts twenty minutes for a Cosmouth brig crew. You watch. The caretaker completes the full rite — tide-oath, water-sealing, the blessing at the bow. An independent fishing crew arrives at the gate while the ceremony is still running. They wait. When the Cosmouth crew finishes, the caretaker turns and tells the fishing crew the gate is closed for the morning session, to return at the afternoon tide. They leave without argument. They've been turned away before. You can see it in how quickly they go.`;
        G.stageProgress[1]++;
        addJournal('Faith analysis revealed systematic ritual weaponization', 'evidence', `cosmoria-faith-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `You ask the caretaker at the secondary shrine about blessing access. She listens to the question without expression and then tells you the blessing schedule is set by the shrine council, inquiries go through the harbor faith registry, and observers without a practitioner's standing are not permitted in the water gate area during ceremonies. She says all of it pleasantly. The next day, the secondary shrine's gate is staffed by a warden who wasn't there before. Asking drew attention from someone who coordinates across the shrine network.`;
        G.worldClocks.reverence++;
        addJournal('Shrine authorities warned about faith system analysis', 'complication', `cosmoria-faith-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `A sailor who's worked Cosmoria's harbor for twelve years describes the tide blessing from memory — the old form, which he received every season for a decade — and then describes what the caretaker did last month. Two steps are different. The tide-oath added a phrase about "fleet loyalty and harbor compact." The water-sealing now ends with a different gesture. The sailor hasn't been back to the shrine since. "It's not the same thing anymore," he says. He doesn't know why it changed.`;
        addJournal('Ritual modification patterns confirmed', 'evidence', `cosmoria-faith-confirmed-${G.dayCount}`);
      } else {
        G.lastResult = `Three sailors describe different experiences at the shrine over the past six months — one received the full ceremony, one received a shortened version, one was turned away entirely. All three are independent harbor workers. None of them can explain the difference in treatment. Without access to the blessing roster or the caretaker's schedule, you can document the variation but not its mechanism.`;
        addJournal('Ritual corruption analysis incomplete', 'evidence', `cosmoria-faith-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    },
    failResult: {
      text: "The secondary shrine gate is staffed by a new warden who wasn't there yesterday — the harbor faith registry inquiry runs through the same administrative apparatus as every other restricted channel. The morning ceremony at the water gate is observable from the upper harbor walk without entering the water gate area; the fisher crews who were turned away gather at the lower pier wall afterward. They're there most mornings.",
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  },

  // ========== GOSSIP ESCALATION (4 CHOICES) ==========

  // 16. HARBOR RUMOR: DOCKWORKER WHISPERS
  {
    plot: 'main',
    label: "Three people in an hour, all treating it the same way — quietly.",
    tags: ['Investigation', 'Rumor', 'Maritime', 'Gossip', 'Meaningful'],
    xpReward: 65,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'parsing maritime crew narrative');
      G.stageProgress[1]++;

      const rumor = ['the stable factor is taking bribes to assign dock berths', 'independent merchants are being systematically frozen out of maritime trade', 'arrival records are being falsified to hide secret cargo movements', 'someone is stealing maritime supplies and sending them northward', 'ship captains are being forced to swear loyalty oaths to House Cosmouth'];
      const selected = rumor[Math.floor(Math.random() * rumor.length)];

      G.lastResult = `The word along the lower docks: "${selected}." It surfaces three separate times in an hour — once from a stevedore on his break, once from a net-mender who didn't look up while saying it, once from a barge captain who said it in passing and kept walking. None of them agree on details. All of them treat it as established. The harbor has absorbed this as fact and stopped asking why.`;
      addJournal(`Maritime rumor gathered: "${selected}"`, 'evidence', `cosmoria-rumor-${G.dayCount}`);

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    },
    failResult: {
      text: "The lower docks are quiet at this hour — the stevedores on break have cleared out and the net-menders have gone in ahead of the weather. The harbor current runs on a different schedule before the morning load; the barge captains linger at the berth-side tavern between tides. What the docks absorb as fact is still circulating — the timing just needs adjusting.",
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  },

  // 17. ARCHIVE RUMOR: SCHOLAR WHISPERS
  {
    plot: 'main',
    label: "The reading room has its own current. Scholars share things quietly — already accepted.",
    tags: ['Investigation', 'Rumor', 'Archives', 'Gossip', 'Meaningful'],
    xpReward: 65,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'parsing archival research narrative');
      G.stageProgress[1]++;

      const rumor = ['historical records are being destroyed to hide precedent for merchant independence', 'archive access is being restricted to control what citizens can learn', 'documents proving House Cosmouth overreach are being sealed permanently', 'the archive keeper is being forced to cooperate with document destruction', 'Cosmoria\'s entire historical foundation is being deliberately rewritten'];
      const selected = rumor[Math.floor(Math.random() * rumor.length)];

      G.lastResult = `In the reading room above the harbor, between shelves of salt-stiffened ledgers: "${selected}." A scholar says it while refiling a document, not quite to you. Another nods without looking up from his work. A third glances at the archivist's office door before saying she'd heard the same. They share it the way people share something they've decided not to be caught with their hands on it — quietly, plausibly deniable, already accepted.`;
      addJournal(`Archive rumor gathered: "${selected}"`, 'evidence', `cosmoria-rumor-${G.dayCount}`);

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    },
    failResult: {
      text: "The reading room is closed for the afternoon — the scholars who share things between shelves are gone until the evening lamp session. The archive holds the same current, but it runs slower when the room is empty. The scholars return after the harbor bells; the archivist's office light goes dark before they arrive, which is when the reading room operates without supervision.",
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  },

  // 18. INSTITUTIONAL CRACK: CORRUPTION PROOF COMPILATION
  {
    plot: 'main',
    label: "Nine documents from nine institutions. None point at each other. All point the same direction.",
    tags: ['Investigation', 'Evidence', 'Proof', 'Conspiracy', 'Meaningful'],
    xpReward: 80,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(80, 'exposing institutional corruption conspiracy');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0));

      if (result.isCrit) {
        G.lastResult = `Laid flat on a counting-house table you've borrowed for the afternoon: nine carbon arrival copies with corrected primaries, Coralyn's corrected supply ledger, Vethis's pre-issued ruling document, the access tier list signed in one week, the warehouse allocation records against the fleet maintenance logs that don't match. Each document is a different institution. Each has the same quality — a deliberate alteration that absorbs its own evidence. They don't point at each other. They all point the same direction. That's the paper trail.`;
        G.stageProgress[1]++;
        addJournal('Institutional corruption conspiracy documented with proof', 'evidence', `cosmoria-proof-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `A Cosmouth clerk arrives at the table while you're still sorting documents. He doesn't touch anything. He says, with no hostility at all, that administrative records taken from their respective offices without a charter warrant constitute misappropriation of public property, and that continuing to compile them in this manner will require him to escalate. He waits. You look at the documents. Some of them were given to you. Some of them weren't. He knows which are which. The proof you've built is real. The pressure of what he can do with it is also real — and this conversation just got harder.`;
        G.worldClocks.pressure += 2;
        addJournal('Institutional corruption inquiry directly intercepted', 'complication', `cosmoria-proof-caught-${G.dayCount}`);
      } else if (result.total >= 14) {
        G.lastResult = `The documents together are compelling. Supply diversions, corrected arrival records, a pre-issued mediation ruling — each is explainable alone. A clerical error. A changed schedule. An administrative update. Together they form a pattern, but a pattern isn't proof of coordination. The link between them — the hand or the office that issued instructions across all five institutions simultaneously — is still in the internal files you don't have.`;
        addJournal('Institutional corruption strongly suggested by evidence', 'evidence', `cosmoria-proof-partial-${G.dayCount}`);
      } else {
        G.lastResult = `What you can assemble from public records and voluntary disclosures: four institutions where practices changed in the same administrative cycle, a supply warehouse with allocations that don't match fleet logs, an access list that halved in one week. What you can't assemble: the internal communication that coordinated any of it. The pattern is visible. The hand behind it is still inside the building.`;
        addJournal('Corruption proof incomplete without comprehensive records', 'evidence', `cosmoria-proof-incomplete-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    },
    failResult: {
      text: "The Cosmouth clerk waits while you reassemble the documents — the ones that were given to you go back in order; the ones that weren't are catalogued in the misappropriation notice he's already drafting. The counting house is empty by the time he leaves. The pattern you assembled is real, but it needs a location that isn't a borrowed table visible from the street. The archive keeper's back room, the Iron Compact intake office, and the stable factor's counting house all have private workspaces accessible by appointment.",
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  },

  // 19. MORAL PRESSURE: INSTITUTION LOYALTY COMPROMISE
  {
    plot: 'main',
    label: "They've been waiting for someone to ask. They don't know if it helps.",
    tags: ['Investigation', 'Moral', 'Choice', 'Pressure', 'Confrontation', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    effects: [
      { type: 'heat', polity: 'cosmouth', amount: 1 },
      { type: 'rival', amount: 1 }
    ],
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'making moral commitment');
      G.stageProgress[1]++;

      const npcOptions = [
        { name: 'Quartermaster Coralyn Tideglass', role: 'resource keeper', fear: 'They threatened to have me reassigned to merchant crew service if I spoke out. My family depends on my position.' },
        { name: 'Joss Pell', role: 'salt archive clerk', fear: 'They made it clear that exposing document destruction would result in my dismissal and blacklisting from all scholarly work in Cosmouth.' },
        { name: 'Clerk Tideon Anchorlight', role: 'record keeper', fear: 'I wanted to resist but they said if I exposed falsified records, they\'d accuse me of the falsification itself.' }
      ];

      const npc = npcOptions[Math.floor(Math.random() * npcOptions.length)];

      G.lastResult = `${npc.name} stops moving when you ask directly. Their hands go still. "${npc.fear}" The brine smell drifts up from the lower harbor. They're waiting for what comes next — not from fear of you specifically, but because they've been waiting for someone to ask for months and now that someone is here they don't know if it makes things better or worse. That's your call.`;

      if (!G.flags) G.flags = {};
      G.flags.stage1_evidence_decision = 'pending';
      G.flags.stage1_moral_npc = npc.name;

      addJournal(`Confronted ${npc.name} (${npc.role}) about institutional corruption participation`, 'complication', `cosmoria-moral-${G.dayCount}`);

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    },
    failResult: {
      text: "The NPC's hands go still at your question and stay there — they're not ready. The brine smell off the lower harbor drifts up through the window. The decision that keeps them silent is theirs to make, not yours to force. The archive keeper, the Iron Compact agent, and the ward mediator each hold pieces of the same picture; any of them can be approached again when the pressure of the moment has settled.",
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  },

  // 20. DISCOVERY MOMENT: EXTERNAL COORDINATION SOURCE
  {
    plot: 'main',
    questId: 'q_s1_close',
    label: "The money came first. The charter amendments followed. Cosmoria's institutions didn't change from inside.",
    tags: ['Investigation', 'Origin', 'Discovery', 'Climax', 'Meaningful'],
    xpReward: 80,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(80, 'discovering origin source of institutional corruption');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0));

      if (result.isCrit) {
        G.lastResult = `Behind the arrival corrections and the supply diversions and the pre-issued rulings: a courier manifest tucked into the back of the arrival log Tideon kept hidden. Destination: a harbor address in the northern territories. Contents listed as "administrative correspondence — institutional coordination." Three financial transfer records from the same northern address to a Cosmouth administrative account, dated one week before each of the five ward charter amendments. The money came first. The amendments followed. Cosmoria's institutions didn't change from inside. They were purchased from outside.`;
        G.stageProgress[1]++;
        addJournal('Origin source of Cosmoria institutional corruption identified as external coordination', 'discovery', `cosmoria-origin-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `You get close enough to see the courier manifest exists. Then a Cosmouth warden steps into the reading room, takes the arrival log from the table without explanation, and informs you that the harbor registry has requested the return of administrative materials currently outside their custody. He doesn't threaten. He doesn't need to. He just takes the log. You have what you remembered reading before he arrived. The manifest destination is gone with the book. You've been noticed reaching for exactly the thing they're protecting.`;
        G.worldClocks.pressure += 2;
        addJournal('Inquiry intercepted by external coordination operators', 'complication', `cosmoria-origin-caught-${G.dayCount}`);
      } else if (result.total >= 14) {
        G.lastResult = `The financial transfer records show an external origin — a northern harbor address appearing in three separate documents across different institutions. Whether those transfers purchased the charter amendments, the supply diversions, or something else isn't yet clear. The address exists. The payments were made. Whatever is being done to Cosmoria was funded from somewhere that is not Cosmoria. The funding predates the first ward charter amendment by six weeks. Whoever initiated this started paying before the structural changes began.`;
        addJournal('External coordination of Cosmoria confirmed', 'discovery', `cosmoria-origin-external-${G.dayCount}`);
      } else {
        G.lastResult = `The trail ends at a gap: the courier manifest Tideon mentioned is in a section of the arrival log that's under administrative hold. The financial transfer records reference an account number without a registered owner. There's enough to know the coordination is external. Not enough to trace it further. The gap is deliberate — it's been left exactly here, at the point where the thread would connect to a name. That precision is itself a kind of answer. Someone knew this was the point to protect.`;
        addJournal('External coordination suspected but source not yet identified', 'evidence', `cosmoria-origin-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    },
    failResult: {
      text: "The warden takes the arrival log and the courier manifest page with it — the administrative hold covers the full volume, not just the flagged entries. The financial transfer records reference an account number without a registered owner; that registration gap is a public filing discrepancy, logged with the harbor commerce board when any account opens. The commerce board's discrepancy log is accessible without a credential.",
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  },

  // ========== EXPANSION CHOICES ==========

  // 21. CLUE: GHOST VESSEL EVIDENCE
  {
    label: "Seven vessels, no return manifests. Same administrator cleared all seven on irregular days.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 73,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(73, 'identifying ghost vessel registry entries');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('wits', (G.skills.wits || 0));
      if (result.total >= 13) {
        G.lastResult = `Seven vessels departed Cosmoria over four months with standard cargo manifests and no return entries filed. Maritime law requires an automatic follow-up flag for any vessel without a return entry. All seven flags were raised. All seven were cleared before action — manually, by the same harbor administrator, on irregular days that don't follow a duty schedule. The clearance notes say "resolved — internal compliance." No case numbers. No counter-signatures. The administrator cleared their own flags.`;
        if (!G.flags) G.flags = {};
        G.flags.found_ghost_vessel_evidence = true;
        addJournal('Ghost vessels: seven without return manifests, flags manually cleared by single administrator on irregular schedule', 'evidence', `cosmoria-ghost-vessels-${G.dayCount}`);
      } else {
        G.lastResult = `The departure registry shows vessels without return entries — that much is in the public log. The clearance records that explain why no follow-up was issued are in the harbor administration files, restricted to maritime inspector credential holders. You can see the gap in the registry. You can't yet see who filled it in. Seven gaps, the same shape. The harbor clerk at the summary window replaces the ledger on the shelf without comment when you lean in to count the entries. He noticed you counting.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    },
    failResult: {
      text: "The maritime inspector credential that controls the clearance records is issued through the harbor authority — the same administration that cleared the flags. The public departure log shows the gap but not the hand that filled it. The administrator's duty schedule is posted at the harbor gate office; the flag clearances occurred on irregular days that don't align with any posted rotation. That discrepancy is in the public record.",
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  },

  // 22. CLUE: MARITIME TRANSIT LAUNDERING
  {
    label: "Seven departure manifests, seven different vessels and dates, one identical document filed seven times.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'tracing maritime cargo laundering chain');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      G.lastResult = `All seven departure manifests list the same cargo: "mineral aggregate — industrial grade." Same category code. Same weight class. Same declared origin district. Set side by side, they read identically except for vessel name and date. The probability of seven unconnected shipments producing identical paperwork over four months is not a number worth calculating. These are template manifests — one document, filed seven times. The cargo description was chosen to be too dull to pull for secondary review. It worked until now.`;
      if (!G.flags) G.flags = {};
      G.flags.found_template_manifests = true;
      addJournal('Transit chain: identical template manifests filed seven times — systematic laundering via bureaucratic camouflage', 'evidence', `cosmoria-manifest-chain-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    },
    failResult: {
      text: "The manifest comparison requires pulling departure records across four months — the secondary review queue is closed until the morning tide. Seven identical documents laid side by side are compelling; right now they're in different administrative sections. The public departure board at the harbor gate lists cargo category codes by vessel; all seven entries share the same category code. That's visible from the walkway.",
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  },

  // 23. ARCHETYPE-GATED: READING THE HARBOR
  {
    label: "Berths four and six load at the noisiest hour. Scheduled to disappear in the noise.",
    tags: ['Investigation', 'Archetype', 'Stage1', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'reading harbor activity pattern');
      const arch = G.archetype && G.archetype.group;

      if (arch === 'combat') {
        G.lastResult = `The handlers at berths four and six work in a sequence that isn't dock-trained. Standard loading goes by weight distribution and crane reach. This crew loads by manifest position — they know what's in each crate before they lift it, and they place it in the hold according to a departure sequence, not a balance sequence. That's not harbor work. That's logistics trained for rapid vessel extraction under load. Someone brought military cargo expertise to a civilian dock and dressed it as day labor.`;
      } else if (arch === 'magic') {
        G.lastResult = `Berths four and six load late morning, every time — when crane noise from the main commercial dock peaks and the harbor traffic bunches at the upper gate. It's the least efficient window for loading: slowest crane response, most bystander traffic. But it's the best window for loading that disappears. The departures are timed to generate the maximum amount of ambient noise and activity around them. Someone scheduled those departures to be invisible by circumstance.`;
      } else if (arch === 'stealth') {
        G.lastResult = `The harbor administrator's office window has a direct sightline to berths four and six. Each departure from those berths, the administrator is at the window — not passing, not glancing: standing, watching until the vessel clears the harbor mouth. Three mornings running. The flag clearances weren't careless administrative errors. Someone watched each departure personally and cleared the flag afterward. The supervision and the suppression are the same person.`;
      } else {
        G.lastResult = `The crew at berths four and six have new gear — rope coils still factory-bright, tool belts with no salt crust yet, boots that haven't been broken in on wet planking. The rest of the harbor crew is working with equipment two seasons old minimum. Someone purchased upgrades specifically for these workers on these berths. The cooperation isn't loyalty. It's a transaction, and the transaction is recent enough that the gear still shows it.`;
      }
      addJournal('Harbor analysis: suspicious berths use military loading sequence, peak-hour cover timing, administrator supervision, compensated workers', 'evidence', `cosmoria-harbor-read-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    },
    failResult: {
      text: "The berth observation requires a window the current loading schedule doesn't provide — crane noise peaks at mid-morning and the crew rotations close the useful gap. The harbor administrator's office window has a sightline to berths four and six; the departure schedule board is visible through that window from the upper corridor. The pattern the schedule shows doesn't require being present at the berths themselves.",
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  },

  // 24. FACTION SEED: IRON COMPACT MARITIME CONTACT
  {
    label: "The Iron Compact's projections have a gap. Seven ghost vessels fit it exactly.",
    tags: ['Faction', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'making Iron Compact contact');
      if (!G.factionHostility) G.factionHostility = { warden_order: 0, iron_compact: 0, oversight_collegium: 0 };

      const result = rollD20('charm', (G.skills.charm || 0));
      if (result.total >= 12) {
        G.lastResult = `Sull Crenn's office smells of tar paper and ledger ink. He listens to the ghost vessel summary without interrupting. "Seven departures without returns shows up as a routing gap. The Iron Compact's cargo projections run short when vessels vanish mid-cycle." He's not troubled by the fraud itself — he's troubled by the disruption to his forecasting. He puts his hands flat on the desk. "I'll share cargo pattern data from the past six months. You share the template manifests. I can use those for a formal routing discrepancy claim." A transaction. Clean and immediate.`;
        if (!G.flags) G.flags = {};
        G.flags.met_iron_compact_cosmoria = true;
        G.factionHostility.iron_compact += 1;
        addJournal('Iron Compact agent Sull Crenn: ghost vessels disrupt routing data, willing to exchange cargo pattern information', 'contact_made', `cosmoria-iron-${G.dayCount}`);
      } else {
        G.lastResult = `The Iron Compact office is mid-transaction when you arrive — two cargo agents negotiating a crane priority slot, a third waiting with a manifest folder. Sull Crenn is visible through the office window but his clerk intercepts you at the door. Appointments only. Submit your purpose in writing. You can see the departure schedule board on the wall behind Crenn. The seven ghost vessel dates are visible on it — noted in a different ink than the surrounding entries. He's tracking them already.`;
        if (!G.flags) G.flags = {};
        G.flags.located_iron_compact_cosmoria = true;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    },
    failResult: {
      text: "The Iron Compact office is mid-transaction when you arrive and the clerk holds the door — appointments only, purpose in writing. The departure schedule board on the wall behind Crenn is visible through the office window; seven ghost vessel dates are noted in different ink than the surrounding entries. He is tracking them already. A written purpose submitted before the fourth bell goes into the morning appointment queue.",
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  },

  // 25. ATMOSPHERE: THE TIDE MARKER
  {
    label: "The last name on the tide markers is two years old. The tradition just stopped.",
    tags: ['WorldColor', 'Lore', 'Stage1', 'Meaningful'],
    xpReward: 50,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(50, 'reading Cosmoria tide markers');

      G.lastResult = `The tide markers at the harbor mouth are worn smooth by three hundred years of hands and salt spray. Names and dates run up both sides — the oldest near the base, faded to bare suggestion, the recent ones still sharp. The most recent carved entry is dated two years and four months ago. The stone above it is unmarked. There's no posted restriction. No locked gate. No sign. The tradition just stopped. A sailor you pass on the walk back says he knows about the markers but he wouldn't carve his name there now. He doesn't say why.`;
      addJournal('Harbor tide markers: departure tradition stopped two years ago without explanation — harbor culture shifted', 'discovery', `cosmoria-tides-${G.dayCount}`);
      G.recentOutcomeType = 'explore'; maybeStageAdvance();
    }
  },

  // 26. PERSONAL ARC: THE HARBOR ADMINISTRATOR'S RECORD
  {
    label: "The log is on the desk. Just enough written to fill the space.",
    tags: ['PersonalArc', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 70,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'obtaining administrator appointment log');
      if (!G.flags) G.flags = {};

      const result = rollD20('finesse', (G.skills.finesse || 0));
      if (result.total >= 12) {
        G.lastResult = `The appointment log is a bound book, each entry in the administrator's own hand. Seven entries on the flag-clearance days: "internal compliance review — 15 min." No counterparty. No case reference. No secondary signature. A flag clearance that requires harbor authority confirmation and registry update resolved in fifteen minutes with no documentation trail. The administrator wrote it down because a blank in the log would be more conspicuous than a vague entry. They created their own cover by recording just enough to fill the space.`;
        G.flags.obtained_administrator_log = true;
        addJournal('Administrator appointment log secured: seven ghost vessel clearances documented as unauthorized 15-minute compliance reviews', 'evidence', `cosmoria-admin-log-${G.dayCount}`);
      } else {
        G.lastResult = `The appointment log stays on the administrator's desk, not on the public-access shelving. Getting to it requires either the administrator's absence or a reason to be in the office that the administrator accepts. Right now you have neither. The office window faces the harbor and the administrator is at their desk, positioned where they can watch the berths while they work. The log is in plain sight from the corridor. So is everyone who approaches it.`;
      }
      G.recentOutcomeType = 'stealth'; maybeStageAdvance();
    }
  },

  // 27. SOCIAL: THE RETURNING SAILOR
  {
    label: "One crew came back. Private mooring, sealed cases, no return manifest.",
    tags: ['Social', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'interviewing returning crew member');

      const result = rollD20('charm', (G.skills.charm || 0));
      if (result.total >= 11) {
        G.lastResult = `Kavan describes the Shelf Islands run with the careful specificity of someone who's been rehearsing how much to say. "Private mooring. No authority presence. The cargo came off in two hours — sealed cases, uniform weight, handled by men who weren't dock labor." He pauses. "They moved like they'd offloaded there before. Same mooring, same positions." Triple rate, no return manifest, told it was a tax arrangement. "I've done gray-margin runs. This wasn't that." He looks at the harbor mouth. "The cases were labeled in a script I didn't recognize."`;

        if (!G.flags) G.flags = {};
        G.flags.met_kavan_sailor = true;
        addJournal('Sailor Kavan: Shelf Islands delivery, sealed uniform cases, private mooring, no harbor authority — triple rate', 'contact_made', `cosmoria-kavan-${G.dayCount}`);
      } else {
        G.lastResult = `The harbor is quieter than yesterday in certain pockets — the tavern by berth three, the rope-mender's bench near the lower gate, the usual spots. A net-mender says the crews from berths four and six haven't been around since midmorning. Word moves fast in a working harbor. Someone on those crews knows questions are circulating and has decided today isn't a good day to be findable. The empty stools do the answering for them.`;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    },
    failResult: {
      text: "The harbor is quiet in all the wrong pockets — the tavern by berth three, the rope-mender's bench, the usual spots where the returning crews linger after a run. Word travels fast in a working harbor and today isn't a good day to be findable. The barge captains at the lower pier wall work a different circuit; they're not crew and not dock labor, which means the warning hasn't reached them yet.",
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  },

  // 28. SHADOW RIVAL INTRO
  {
    label: "Someone else was asking about those ghost vessels. A week ahead of me.",
    tags: ['Rival', 'Warning', 'Stage1', 'Meaningful'],
    xpReward: 57,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(57, 'receiving rival warning');
      if (!G.flags) G.flags = {};

      const arch = G.archetype && G.archetype.group;
      if (arch === 'combat') {
        G.lastResult = `"They asked about the destination's defensive infrastructure," the broker says. "Not whether the cargo was registered — whether the receiving site was a secured location. Who controlled access. Whether it was fortified." The broker adjusts his papers. "That's not a fraud question. That's a logistics question for someone planning around a defended endpoint." Someone is mapping the supply chain terminus for military purposes, not administrative ones. They were here before you.`;
      } else if (arch === 'magic') {
        G.lastResult = `"They brought an instrument," the broker says. "Small. Glass tube, weighted base. They held it near where the cargo cases had been staged before loading and watched the reading for about thirty seconds." He demonstrates the gesture, uncertain. "I don't know what they were measuring. But they wrote the reading down before they left." Trace analysis of the staging area. They're characterizing the cargo through residue, which means they didn't know what it was and needed to find out. That puts them behind you — or at the same point, by a different method.`;
      } else if (arch === 'stealth') {
        G.lastResult = `"They came twice," the broker says. "First time: general questions about the berth schedule, nothing specific. Second time, three days later: they already knew the cargo route, the vessel sequence, and the administrator's flag clearance pattern. They'd confirmed all of it from other sources before coming back to me." They ran multiple parallel lines and cross-referenced. They're building a complete picture by triangulation, committing to no single source. Professional methodology. They were working this before you arrived.`;
      } else {
        G.lastResult = `"Very thorough," the broker says. "Covered lunch. Asked about every party who'd handled those berths over the past year — not just the ghost vessels, everyone. Crane operators, dock registrars, the manifest clerk who logs incoming cargo." He taps the table. "They wanted a full map of every person with any contact with those berths. Not the center of the thing — the whole surrounding environment." They're building a network diagram, not a case file. They were here first.`;
      }

      G.lastResult += ` The broker doesn't know their name. They paid cash and didn't leave a card.`;
      if (!G.rivalId) {
        if (arch === 'combat') G.rivalId = 'warden_captain';
        else if (arch === 'magic') G.rivalId = 'archivist_veld';
        else if (arch === 'stealth') G.rivalId = 'shadow_broker';
        else G.rivalId = 'provost_lenn';
      }
      G.flags.stage1_rival_seeded = true;
      addJournal('Rival-adjacent operative traced Cosmoria ghost vessels before you — multi-source triangulation approach', 'intelligence', `cosmoria-rival-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },
{
  label: 'The notice board has recent postings.',
  tags: ['social'],
  xpReward: 5,
  failResult: function() {
    addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
    loadStageChoices(G.location);
  },
  fn: function() {
    var key = 'rumor_drawn_' + G.location + '_' + G.dayCount;
    if (G.flags[key]) {
      G.lastResult = 'The board has nothing new since this morning. A cargo manifest dispute notice and two tide-schedule adjustments from yesterday are still pinned at the top. Salt air has curled the bottom edge of the older posting. Below the tide adjustments, a handwritten card — undated, unsigned — gives a berth number and a time. Someone wants a meeting that does not need a name attached to it. The card was not there this morning.';
      return;
    }
    G.flags[key] = true;
    drawLocalityRumor(G.location);
  }
},
  {
    label: "The dockside tavern has a different kind of ledger — who owes whom.",
    tags: ['Tavern', 'Social', 'Maritime'],
    xpReward: 55,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(55, 'at the dockside tavern');
      var result = rollD20('wits', (G.skills.wits||0) + (typeof getTraitBonus==='function'?getTraitBonus('lore'):0));
      if (result.total >= 11) {
        G.lastResult = "The barman at the Anchor counts his coin between every exchange — a habit, not suspicion. He mentions that the southern berths have been rotating faster than seasonal demand explains. Two vessels arrived, took on no cargo, and left within a day. He doesn't know what that means. He knows it isn't nothing. A dockworker at the far end of the bar sets down his cup when the barman says it. He doesn't look up. He doesn't have to. The barman switches topics.";
        G.recentOutcomeType = 'success';
        G.investigationProgress = (G.investigationProgress||0) + 1;
        addJournal('Cosmoria dockside: two vessels arrived with no cargo uptake, left within a day', 'intelligence');
      } else {
        G.lastResult = "The barman is polite and uninformative. The dockworkers aren't talking where a stranger can hear. The Anchor's common room runs on familiarity; a new face gets service and nothing else. The round costs more than it should and returns nothing useful. Salt and pitch smell off the men at the far end of the bar — berth workers, not sailors. They're talking in the low register used by people who have already decided what not to say out loud.";
        G.recentOutcomeType = 'neutral';
      }
    },
    failResult: {
      text: "The barman is polite and uninformative, counting coin between each exchange. The dockworkers aren't talking where a stranger can hear — the round costs more than it should and returns nothing. The net-menders at the lower berth wall run a separate social circuit from the tavern regulars; they work through the meal hours when the barman's crowd thins and the wharf goes quiet enough to actually talk.",
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  },

  // ========== SUPPRESSION THREADING (Phase 6D) ==========

  // 6D: Clerk answers a different question than the one asked
  {
    plot: 'main',
    label: "The harbor clerk answered something. Not what I asked.",
    tags: ['NPC', 'Records', 'Inquiry'],
    xpReward: 55,
    stageProgress: 1,
    failResult: "The harbor registry window closes at the third bell and the afternoon clerk has not yet arrived. A handwritten card taped to the sill gives the reopening time. Whatever was logged this morning is filed; the current shift can only access afternoon intake.",
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(55, 'harbor clerk deflected with a different answer');
      G.stageProgress[1]++;
      G.lastResult = "The harbor registry clerk listens to the question about the unlogged manifest discrepancy. Then she explains the standard manifest logging process: intake, stamp, routing code, secondary verification. The explanation is patient and complete and describes a process that has nothing to do with the specific discrepancy. When the explanation ends, she looks up as if waiting for a follow-up. The original question is still unanswered. She did not mishear it — the room was quiet, the words were plain. The process she described is correct. It simply does not apply to the thing that was asked.";
      addJournal('Cosmoria harbor registry: clerk responded to a question about a manifest discrepancy by explaining standard intake procedure — question not addressed. Source: harbor registry window, morning shift.', 'complication');
      G.recentOutcomeType = 'blocked';
      maybeStageAdvance();
    }
  }
];

// Sideplot injection — cosmoria harbor weight fraud opening hook
(function() {
  var _fraudHook = (typeof COSMORIA_HARBOR_WEIGHT_FRAUD !== 'undefined') ? COSMORIA_HARBOR_WEIGHT_FRAUD.openingHook() : null;
  if (_fraudHook) COSMORIA_STAGE1_ENRICHED_CHOICES.push(_fraudHook);
})();

// ── ARCHETYPE-EXCLUSIVE CHOICES ──────────────────────────────
COSMORIA_STAGE1_ENRICHED_CHOICES.push(

  // COMBAT x2
  {
    archetypeGroup: 'combat',
    plot: 'main',
    label: "Two watchers, blocking line of sight to the harbor gate. Signal the moment they split.",
    tags: ['Combat', 'Confrontation', 'Direct'],
    xpReward: 65,
    stageProgress: 1,
    failResult: {
      text: 'The watchers do not split — one steps back but the second moves to compensate, closing the angle before it opens. They have practiced this. A third watcher appears from the salt merchant row and the harbor gate access is now monitored from three directions. You withdraw before the third watcher establishes your position. The harbor gate approach is closed for this watch rotation.',
      xp: 0,
      effects: [],
      next: [{text: 'Wait for the watch rotation to change before approaching the gate.', skill: 'vigor', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'suppressing watchers at harbor gate');
      G.stageProgress[1]++;

      var result = rollD20('combat', (G.skills.might || 0));
      var target = 14;

      if (result.isCrit) {
        G.lastResult = 'Both watchers move before they finish the decision. The harbor gate opens into the port authority outer courtyard. A dock clerk is at the registry window on the far side — he sees the watchers go down and opens the window fully, leaning out. "I have been waiting for someone to do that for three weeks," he says. His thumb presses the edge of the registry ledger he is holding, the way someone holds something they have been waiting to hand over. "Come in through the side. I have the secondary manifest stack. The one that does not go to the senior port authority desk."';
        G.stageProgress[1]++;
        addJournal('Watchers removed at harbor gate — dock clerk opened secondary manifest stack; separate from senior port authority records', 'evidence');
      } else if (result.isFumble) {
        G.lastResult = 'The two watchers are faster than they look and the one on the right gets past you before the confrontation resolves. He is at the salt merchant row entrance before you can close the angle, calling out a number — a code, not words. The third watcher who appears from the row is older and she does not approach. She watches. The harbor gate is now under observation by someone who was not in your original count and who has not been recorded in the port authority\'s watcher log because she is not a port authority watcher.';
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
        addJournal('Watcher confrontation: signal sent, third watcher appeared from salt merchant row — not in port authority log; independent network', 'complication');
      } else if (result.total >= target) {
        G.lastResult = 'One watcher down, one back. The second reads the situation correctly and steps away from the gate line — not retreating, just no longer blocking. The harbor gate is open. Inside the port authority outer courtyard: the registry window is shuttered but the secondary entrance beside it is ajar. A dock clerk\'s voice from inside: "Is the window clear?" He was listening. He has been listening for this outcome. Whatever he has to share, he was waiting for the watchers to stop being in the way.';
        addJournal('Harbor gate access cleared — dock clerk was waiting, asked if window clear; had information to share once watchers gone', 'evidence');
      } else {
        G.lastResult = 'The watchers move back enough that the harbor gate is technically accessible. Neither has gone far. The gate opens onto the port authority outer courtyard and the registry window beyond it. A dock clerk at the window makes brief eye contact and looks away — an acknowledgment, not a greeting. He knows you cleared some of the observation pressure. He is not ready to act on it yet. The watchers are still visible from the courtyard. Their presence has a specific effect on who speaks and what they say in that courtyard.';
        addJournal('Partial harbor gate clearance — dock clerk acknowledged but not ready to act; watchers still visible from courtyard', 'discovery');
      }

      G.recentOutcomeType = 'action';
      maybeStageAdvance();
    }
  },

  {
    archetypeGroup: 'combat',
    plot: 'main',
    label: "Harbor gate is blocked. The bar on the other side hasn\'t been properly seated.",
    tags: ['Combat', 'Risk', 'Direct'],
    xpReward: 65,
    stageProgress: 1,
    failResult: {
      text: 'The bar is more firmly seated than the gap in the gate suggested — enough play to show the misalignment but not enough to give on impact without a tool you do not have. The watchers in the salt merchant row are already turning. You step back from the gate before they reach their signal position.',
      xp: 0,
      effects: [],
      next: [{text: 'Find a tool and a better-timed approach for the gate bar.', skill: 'finesse', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'forcing blocked harbor gate');
      G.stageProgress[1]++;

      var result = rollD20('combat', (G.skills.might || 0));
      var target = 14;

      if (result.isCrit) {
        G.lastResult = 'The bar gives on the second strike and the gate swings before the salt row watchers complete their turn. Inside: the port authority inner dock, which the public manifest map shows as a storage area and which is in fact a working berth. Two vessels moored. Both flying independent pennants. Neither appears in the harbor registry for this week. Their cargo declaration slips are pinned to the dock cleats: both list general provisions, both reference the same authorization mark — the mark of the port authority senior factor, who the public registry shows as currently off-station. A mark from an off-station factor on active vessels is either forgery or the factor is not actually off-station.';
        G.stageProgress[1]++;
        addJournal('Forced harbor gate — inner dock has 2 unregistered vessels with off-station senior factor\'s authorization mark; factor listed as off-station', 'evidence');
      } else if (result.isFumble) {
        G.lastResult = 'The bar gives but the gate opens into the path of a salt merchant cart being moved along the inner dock road. The cart driver shouts. The watchers in the salt row respond to the shout. You are inside the gate, the gate is open, and a cart driver and two watchers are all looking at the same place at the same time. The gate closes again before the watchers reach it. You are on the right side of the gate but the wrong side of a logged disturbance.';
        G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
        addJournal('Harbor gate forced — cart driver shouted, watchers responded; disturbance logged', 'complication');
      } else if (result.total >= target) {
        G.lastResult = 'The gate opens and you are through in the window before the salt row watchers re-orient. The port authority inner dock is quieter than the public harbor — two work crews, both with their heads down, neither looking up when the gate opens. The registry window on the inner dock face is open and unattended. The current-week harbor manifest is visible on the desk through the window: the berth assignments for the inner dock show six occupied berths. Three have vessel names. Three have only authorization codes.';
        addJournal('Forced harbor gate — inner dock registry window unattended; 3 berths carry authorization codes only, no vessel names', 'evidence');
      } else {
        G.lastResult = 'Through the gate in the watchers\' turn window. The inner dock is short — four berths, two occupied. The occupied berths have their hatch flags up, which means loading in progress, which means work crews. The work crews have not looked up. The dock wall beside the first berth has a cargo staging record pinned to it — the standard form, correctly filled, for a vessel whose registration number does not appear in the harbor registry\'s current-week active vessel list. The vessel is here. The registry does not know it is here.';
        addJournal('Harbor inner dock entry — vessel present with unstaged registration number; active but not in current-week registry', 'discovery');
      }

      G.recentOutcomeType = 'action';
      maybeStageAdvance();
    }
  },

  // MAGIC x2
  {
    archetypeGroup: 'magic',
    plot: 'main',
    label: "Coastal marker stones carry inscriptions. That one has a second layer underneath the Roazian marks.",
    tags: ['Magic', 'Lore', 'Observation'],
    xpReward: 65,
    stageProgress: 1,
    failResult: {
      text: 'The coastal marker stone is on the tidal shelf below the harbor walk, accessible only at low tide, which was two hours ago. The current tide has covered the lower section of the stone where the secondary inscription is likely to be. The stone will be accessible again at the next low tide, which the harbor gate board lists for six hours from now.',
      xp: 0,
      effects: [],
      next: [{text: 'Return at the next low tide for the inscription reading.', skill: 'wits', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'reading secondary inscription in coastal marker stone');
      G.stageProgress[1]++;

      var result = rollD20('lore', (G.skills.wits || 0));
      var target = 13;

      if (result.isCrit) {
        G.lastResult = 'Two inscription layers. The outer layer is current Roazian coastal marking script — navigation and warning text for the tidal shelf, correctly inscribed, recently renewed. The inner layer is older and uses a different maritime tradition: a tidal cipher script that predates the current port authority by at least fifty years. The old script is a route marker. It designates a specific tidal window — six hours after the third bell — and a channel approach that bypasses the harbor gate sensors. But someone renewed the outer layer within the past three weeks. They knew the inner inscription was there and renewed over it rather than replacing the stone. They wanted it preserved.';
        G.stageProgress[1]++;
        addJournal('Coastal marker stone: inner tidal cipher identifies gate-bypass channel approach window; outer layer renewed 3 weeks ago over inner inscription — deliberate preservation', 'evidence');
      } else if (result.isFumble) {
        G.lastResult = 'The inner inscription is in a tidal cipher script that requires a reference grammar specific to the pre-port-authority maritime tradition. You have the base sigil vocabulary but not the compound forms used in the cipher layer. You can establish that the secondary layer exists and that it is navigational in nature. The content is not recoverable without the reference text. A salt merchant watching from the harbor walk above you notices the extended attention to the marker stone and walks away quickly. The marker stone is not something people usually study for this long.';
        addJournal('Coastal marker stone secondary inscription: navigational cipher, content not recoverable without reference grammar; salt merchant noted extended attention', 'complication');
      } else if (result.total >= target) {
        G.lastResult = 'The outer Roazian marks are navigation standard. Underneath: a tidal cipher in an older maritime tradition, applied to the lower section of the stone where the tide covers it at normal water levels. The cipher is accessible only at specific low tides — by design, it would seem. What you can decode from the exposed section: a channel designation and a time reference. The channel designation is not in the current harbor registry. The time reference is a tidal formula, not a fixed clock time. The channel exists somewhere along this coast.';
        addJournal('Coastal marker inner cipher: unregistered channel designation and tidal-formula time reference; inscription accessible only at specific low tides', 'evidence');
      } else {
        G.lastResult = 'The secondary inscription is present below the current tide line — only accessible at specific low tides, which means it was designed to be read at specific times. The exposed fragment is tidal cipher, an older maritime tradition, navigational in nature. You recover two sigil fragments before the tide begins to reclaim the lower section. The fragments indicate a directional reference and a time formula. Full reading requires waiting for the lowest tide of the current cycle, which occurs at a specific night hour.';
        addJournal('Coastal marker stone inner inscription: tidal cipher, directional and temporal references partially recovered; full reading requires lowest tide at night', 'discovery');
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  {
    archetypeGroup: 'magic',
    plot: 'main',
    label: "Port authority record room. The ward on the archive cabinet is newer than the cabinet.",
    tags: ['Magic', 'Lore', 'Records'],
    xpReward: 65,
    stageProgress: 1,
    failResult: {
      text: 'The archive cabinet is in the restricted section of the port authority records room, which requires a port authority access token to enter. The ward is visible from the public section through the grille, but reading it at this distance loses the fine-grain sigil detail needed to distinguish the inscription layers. The public section holds filed copies; the ward on the original archive is inaccessible from here.',
      xp: 0,
      effects: [],
      next: [{text: 'Find a port authority access token or a different approach to the archive.', skill: 'wits', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'reading arcane ward on port authority archive cabinet');
      G.stageProgress[1]++;

      var result = rollD20('lore', (G.skills.wits || 0));
      var target = 13;

      if (result.isCrit) {
        G.lastResult = 'The ward on the archive cabinet is a detection-and-logging mark — not a lock, a recorder. Every time the cabinet is opened, the mark logs the access. But the mark is not reporting to the port authority. The ward\'s reporting anchor is set to a remote receiver outside the port authority building — the anchor symbol is a specific maritime guild sigil that the port authority does not use. Someone who is not port authority has been monitoring every time this archive is opened, and they have been doing it for at least six weeks, which is when the ward was inscribed. Whoever is watching knows every time those records are accessed.';
        G.stageProgress[1]++;
        addJournal('Port archive cabinet ward is a remote-logging mark, not a lock — reports to maritime guild sigil receiver outside port authority; monitoring inner dock authorization access for 6 weeks', 'evidence');
      } else if (result.isFumble) {
        G.lastResult = 'The ward responds to close reading with an alert pulse — not an alarm, but a notification to its anchor point. The port authority clerk at the public desk turns and looks at the archive section. She does not know what triggered the pulse. She approaches the grille and checks the cabinet visually. The cabinet is undisturbed. She notes the time in the access log. She does not note what caused the pulse. The ward has now logged your proximity to the archive.';
        addJournal('Port archive ward alert pulse triggered — clerk checked archive and logged time; ward recorded proximity', 'complication');
      } else if (result.total >= target) {
        G.lastResult = 'The ward is newer than the cabinet — the inscription date embedded in the base sigil is six weeks old, while the cabinet hardware is at least twenty years of age. The ward was applied recently and it is not a standard port authority protection ward. The symbol grammar belongs to a maritime monitoring tradition — a ward type used by shipping factors who want to know when their cargo records are accessed by others. This is a cargo factor\'s ward, applied to a port authority cabinet. Someone is monitoring the port authority\'s own archive from outside it.';
        addJournal('Port archive ward: cargo factor monitoring type, 6 weeks old, applied to 20-year-old cabinet — external party monitoring port authority archive access', 'evidence');
      } else {
        G.lastResult = 'The ward on the archive cabinet is correctly formed and recently inscribed. Standard port authority protection wards use a specific symbol grammar from the coastal ward-writing tradition. This ward\'s symbol grammar is close but not identical — the anchor sigil in the base is from a related but distinct tradition, one associated with maritime cargo factors rather than port authority administration. The difference is subtle enough that a non-specialist would not notice it. It is the kind of difference that is deliberate.';
        addJournal('Port archive cabinet ward: symbol grammar close to port authority standard but anchor sigil is maritime cargo factor tradition — deliberate distinction', 'discovery');
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // STEALTH x2
  {
    archetypeGroup: 'stealth',
    plot: 'main',
    label: "The watched building, second floor east window. Someone inside who shouldn\'t be visible at all.",
    tags: ['Stealth', 'Covert', 'Risk'],
    xpReward: 65,
    stageProgress: 1,
    failResult: {
      text: 'The building entrance is covered from two angles — one watcher in the salt row, one at the harbor walk corner. The east window is not accessible from the street. The alley behind the building is gated and the gate latch is on the inside. Whatever access exists, it does not run through the main street or the alley entrance.',
      xp: 0,
      effects: [],
      next: [{text: 'Find a rooftop approach or a different entry angle to the building.', skill: 'finesse', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'extracting person from watched building');
      G.stageProgress[1]++;

      var result = rollD20('stealth', (G.skills.finesse || 0));
      var target = 15;

      if (result.isCrit) {
        G.lastResult = 'In through the warehouse loading bay beside the watched building, across the shared loft, down to the east room. The person inside is a port authority records clerk who has been in this room for three days — not held by force, held by the weight of knowing something. She is Dalve, she has been keeping secondary cargo records for the inner dock berths for six months, and she stopped going to work when the watcher coverage on her building doubled two weeks ago. She has the secondary records with her. All of them. They detail eleven months of unregistered berth activity, signed authorizations, and the name of the senior factor who authorized them.';
        G.stageProgress[1]++;
        addJournal('Extracted records clerk Dalve from watched building — has 11 months of secondary inner dock records; senior factor name on authorizations listed as off-station', 'evidence');
      } else if (result.isFumble) {
        G.lastResult = 'The loft approach works until a ceiling board gives under your weight — old wood, salt-swollen. The sound carries into the building below. The watcher at the harbor walk corner responds to the sound and is at the alley gate before you reach the exit. You are on the building side of the gate with a watcher on the other side listening. You hold still for six minutes. The watcher moves on. The person in the east window does not open the window when you knock. They heard the board too.';
        addJournal('Building infiltration near-miss — ceiling board collapsed; watcher responded; records keeper in east room spooked, would not open window', 'complication');
      } else if (result.total >= target) {
        G.lastResult = 'Through the loading bay and into the east room. The person inside is a dock records keeper — she does not give her name but she shows you what she has: a handwritten list of inner dock berth allocations for the past two months, each one carrying an authorization code rather than a named signatory. She has been in the building for five days. "The codes map to one person," she says. She does not say the name. She writes it on a separate piece of paper and hands it to you with the list, then tears both edges of the paper to mark it as a copy. "Get me out through the back gate. I know the watcher schedule."';
        addJournal('Extracted dock records keeper from watched building — list of inner dock berth authorizations; codes map to single person (name on separate paper)', 'evidence');
      } else {
        G.lastResult = 'Inside and to the east room. The person there is a young records keeper who went quiet three days ago after seeing something in the inner dock manifest he was not supposed to see. He does not know you are coming. He opens the door because you knocked three times the way a dock worker knocks. "Is it time?" he asks, looking past you for someone else. He is waiting for a specific person who has not come. He will talk, but he will not move until the specific person arrives or you explain why they did not.';
        addJournal('Reached records keeper in watched building — waiting for a specific person who has not arrived; has information but will not move without them or explanation', 'discovery');
      }

      G.recentOutcomeType = 'action';
      maybeStageAdvance();
    }
  },

  {
    archetypeGroup: 'stealth',
    plot: 'main',
    label: "Port authority checkpoint at night. One clerk, one log, and twenty seconds between entries.",
    tags: ['Stealth', 'Covert', 'Risk'],
    xpReward: 65,
    stageProgress: 1,
    failResult: {
      text: 'The clerk\'s entry rhythm is irregular — sometimes eight seconds between log entries, sometimes thirty-five. The window you mapped is not reliable. You hold at the checkpoint corner for ten minutes and never find two consecutive gaps wide enough for the crossing. The checkpoint stays active through the night.',
      xp: 0,
      effects: [],
      next: [{text: 'Map the checkpoint entry rhythm more precisely before attempting again.', skill: 'finesse', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'slipping through port authority checkpoint unlogged');
      G.stageProgress[1]++;

      var result = rollD20('stealth', (G.skills.finesse || 0));
      var target = 15;

      if (result.isCrit) {
        G.lastResult = 'Through the checkpoint in the twenty-second window without a log entry. The inner harbor area beyond the checkpoint is the part of Cosmoria\'s port that does not appear in the visitor navigation guides. Three warehouse structures, all dark, all carrying Roazian administrative marks on the doors. The third warehouse door is ajar. Inside: cargo staged in neat rows, all carrying the authorization mark of the port authority senior factor who is listed as off-station. Forty-two individual cargo entries. The authorization mark stamps are dated. They span the past eleven months. The senior factor has been authorizing inner harbor cargo storage from off-station, continuously, for almost a year.';
        G.stageProgress[1]++;
        addJournal('Unlogged checkpoint crossing — inner harbor warehouse: 42 cargo entries bearing off-station senior factor\'s authorization mark spanning 11 months', 'evidence');
      } else if (result.isFumble) {
        G.lastResult = 'The twenty-second window closes at nineteen — the clerk finishes his entry and looks up before you clear the log desk angle. He sees movement and lifts his pen from the current entry to write something in the incident column. You are past the desk and in the shadow of the inner harbor wall before he completes the entry, but the entry exists. Whatever he wrote is in the log as a checkpoint incident. You are inside the restricted area with a log entry marking an unidentified crossing.';
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
        addJournal('Checkpoint crossing logged as incident — clerk noted unidentified movement; log entry exists', 'complication');
      } else if (result.total >= target) {
        G.lastResult = 'Clean crossing in the window. The inner harbor area holds two active warehouse structures and a dock registry building that is not marked in any public harbor map. The dock registry building has a lamp burning — someone is working in it at this hour. The window is not shuttered. Inside, visible from the wall angle: a dock clerk updating a ledger, working through a stack of authorization forms. The forms carry the port authority seal. The dock registry building is not in the public map but it has active port authority work happening in it at midnight.';
        addJournal('Unlogged checkpoint crossing — unmapped dock registry building has active port authority work at midnight; clerk updating authorization forms', 'evidence');
      } else {
        G.lastResult = 'Through the checkpoint without a log entry. The inner harbor area is quieter than the public harbor at this hour — no dock workers, no cargo movement. Two warehouse structures, both dark and secured. A third building at the far end of the inner dock has a lamp in the lower window. The building is not a warehouse; the roofline and window placement read as office space. An office building in the inner harbor area at this hour means someone uses it at hours when the public checkpoint discourages observation.';
        addJournal('Unlogged checkpoint crossing — inner harbor office building with lamp burning at night; unmapped, non-warehouse structure', 'discovery');
      }

      G.recentOutcomeType = 'action';
      maybeStageAdvance();
    }
  },

  // SUPPORT x2
  {
    archetypeGroup: 'support',
    plot: 'main',
    label: "The watcher has been in the salt row for four hours. Not watching the harbor.",
    tags: ['Support', 'NPC', 'Persuasion'],
    xpReward: 65,
    stageProgress: 1,
    failResult: {
      text: 'The watcher has nothing to give and nothing to gain. He was told to stand in the salt row and he is standing in the salt row and the conversation ends when you stop contributing to it. His posture closes off slowly, without hostility, the way someone closes off when they realize the conversation is not going anywhere for either party. He watches the harbor.',
      xp: 0,
      effects: [],
      next: [{text: 'Find a different watcher or a different approach to the harbor gate.', skill: 'charm', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'turning suspicious watcher through patient conversation');
      G.stageProgress[1]++;

      var result = rollD20('persuasion', (G.skills.charm || 0));
      var target = 13;

      if (result.isCrit) {
        G.lastResult = 'The watcher\'s name is Fen. He has been in the salt row for six weeks — not watching the harbor, watching the port authority records room window. "Someone is supposed to come out of that window with a document case," he says. "I don\'t know who sends me. The pay comes through the salt merchant at the end of the row. I was told to watch for a records clerk who would leave by the window rather than the door." He looks at the records room window. "She hasn\'t come yet." He tells you the pay schedule, the signal system, and the salt merchant\'s name without being asked for any of it.';
        G.stageProgress[1]++;
        addJournal('Watcher Fen: watching port authority records room window for records clerk leaving by window with document case; paid through salt merchant row; 6 weeks, no clerk seen yet', 'evidence');
      } else if (result.isFumble) {
        G.lastResult = 'The watcher hears enough of the conversation to decide you are the thing he was told to watch for. Not the document case, not the records clerk — you. His posture changes. He touches his collar twice, which is a signal. The salt merchant three stalls down stops arranging his display and starts watching the approach to the harbor gate. You have been identified as a concern and the salt merchant row has just extended its coverage. Whatever you were going to do at the harbor gate has an additional complication now.';
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
        addJournal('Watcher signaled to salt merchant after conversation — harbor gate approach now additionally observed', 'complication');
      } else if (result.total >= target) {
        G.lastResult = 'The watcher relaxes slightly when the conversation is not about what he is watching. He admits he has been in the salt row for six weeks. He admits the pay comes through someone he does not know directly — a drop at the end of the row, cash, no name. He does not know who he is watching for or why. "I was told to note anyone who comes out of the port authority records building after the fifth bell carrying a document case." He says it without realizing it is useful. He has been watching, and this is what he has been watching for. The records building after fifth bell, document case.';
        addJournal('Watcher watching for post-fifth-bell records building exit with document case; paid through anonymous salt row drop for 6 weeks', 'evidence');
      } else {
        G.lastResult = 'The watcher admits he is not watching the harbor after about ten minutes of patient conversation. He does not say what he is watching. He says the work is straightforward and the pay is reliable and he has been doing it for five weeks. He looks at the port authority building once while he talks — a specific window, upper east face, which is the records room section. The look is habitual, not intentional. He catches himself doing it and looks back at the harbor. Whatever the window means to him, it is what the job centers on.';
        addJournal('Watcher watching port authority records room upper east window for 5 weeks; looked at it habitually during conversation', 'discovery');
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  {
    archetypeGroup: 'support',
    plot: 'main',
    label: "The salt merchant controls port access. He knows it. He\'s waiting for acknowledgment.",
    tags: ['Support', 'NPC', 'Negotiation'],
    xpReward: 65,
    stageProgress: 1,
    failResult: {
      text: 'The salt merchant wants acknowledgment and he wants a specific kind — not gratitude, not deference, but a concrete offer that treats his control as legitimate rather than assumed. Whatever you offered did not reach that threshold. He goes back to his display arrangement and the harbor gate access he manages informally remains closed.',
      xp: 0,
      effects: [],
      next: [{text: 'Come back with a concrete offer that treats his authority as real.', skill: 'charm', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'brokering deal with salt merchant who controls port access');
      G.stageProgress[1]++;

      var result = rollD20('persuasion', (G.skills.charm || 0));
      var target = 13;

      if (result.isCrit) {
        G.lastResult = 'The salt merchant sets his display weight down when the offer acknowledges his actual function rather than his nominal one. "Port authority manages the front gate. I manage what moves through the inner dock." "Six months ago I was approached by someone from the port authority factor\'s office. They needed cargo to move through the inner dock without appearing in the external manifest. I agreed because I was paid well and the alternative was not offered as optional." He turns the display weight in his hand. "I kept a list of every movement. I kept it because I knew I would need it." He retrieves the list from under the display counter and hands it to you.';
        G.stageProgress[1]++;
        addJournal('Salt merchant produced 6-month list of inner dock off-manifest cargo movements — approached by port authority factor\'s office; coerced participation; kept records for protection', 'evidence');
      } else if (result.isFumble) {
        G.lastResult = 'The salt merchant hears the acknowledgment and his expression shifts to something that has been waiting for this conversation for a while. He says: "You are not the first person to come to me with this approach. The previous two are no longer asking questions." He sets his display weight down. "I would recommend you consider whether you want to continue asking them." The conversation is over. The warning is specific enough to mean something and vague enough to be difficult to act on. The salt row is quieter than it was when you arrived.';
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
        addJournal('Salt merchant issued warning — previous two inquirers "no longer asking questions"; salt row now quieter', 'complication');
      } else if (result.total >= target) {
        G.lastResult = 'The salt merchant accepts the acknowledgment and becomes practical. "Inner dock access runs through me for six hours on each side of midnight. Port authority manages the front gate. I manage the rest." He arranges three display weights into a line without looking at them. "What you want access for determines what I need in return." He is not asking for money. He is asking for something equivalent to the acknowledgment you just gave him — information, leverage, a record that establishes the exchange was mutual. He has information of his own to trade if the terms are right.';
        addJournal('Salt merchant confirmed inner dock access management for 12-hour nightly window; willing to trade information for mutual acknowledgment record', 'evidence');
      } else {
        G.lastResult = 'The salt merchant relaxes when the offer acknowledges his real function. "Inner dock, midnight to morning, that\'s mine." He does not elaborate on what that means operationally. He says the price for a single passage is a straight commercial arrangement — specific goods, specific quantity, available now. The goods are obtainable. The arrangement is transactional and clean. He does not tell you what he sees from the salt row. But the passage is available if the terms are met.';
        addJournal('Salt merchant: inner dock midnight-to-morning access available for commercial exchange; terms specific and obtainable', 'discovery');
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // SIDEPLOT HOOK: HARBOR WEIGHT FRAUD
  {
    id: 'cosmoria_sideplot_harbor_open',
    label: 'The weight discrepancy in the harbor ledger is systematic, not clerical.',
    skill: 'wits',
    tags: ['Records', 'Discovery'],
    plot: 'side',
    condition: function() { return G && G.flags && !G.flags.sideplot_harbor_fraud_started; },
    fn: function() {
      G.flags.sideplot_harbor_fraud_started = true;
      addNarration('', 'The harbor weight records show a consistent 8% shortfall across three different inspection clerks over fourteen months. The shortfall is too regular to be error — and too distributed to be a single bad actor.');
      addJournal('Harbor weight records: systematic 8% shortfall across multiple inspectors. Pattern suggests external instruction.', 'evidence');
      if (window.COSMORIA_HARBOR_WEIGHT_FRAUD && typeof window.COSMORIA_HARBOR_WEIGHT_FRAUD.open === 'function') window.COSMORIA_HARBOR_WEIGHT_FRAUD.open();
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: { text: 'The records room is locked during the inspection cycle. Return when the clerks are between rotations.' }
  }

);

// ── ADDITIONAL ARCHETYPE CHOICES ──────────────────────────────
COSMORIA_STAGE1_ENRICHED_CHOICES.push(

  // COMBAT ×2 — Cosmouth harbor enforcement spacing
  {
    id: 'cosmoria_arch_combat_3',
    label: 'Cosmouth enforcement vessels are positioned to block the independent berth approach.',
    skill: 'might',
    archetypeGroup: 'combat',
    tags: ['Naval', 'Enforcement', 'Blocking'],
    fn: function() {
      G.investigationProgress = (G.investigationProgress||0) + 1;
      addNarration('', 'Two Cosmouth-flagged enforcement vessels are anchored at angles that physically constrain the approach lane to the independent berthing section — not blocking it outright, but narrowing it to single-file movement with no overtaking space. The positioning is not a navigational hazard; it is a tactical deterrent. Any independent captain reading the approach will recognize that running it slowly means running it under observation at close range. The independent berths are accessible. The access has been made uncomfortable.');
      addJournal('Cosmouth enforcement vessels positioned to constrain independent berth approach — tactical deterrent, not formal blockade.', 'intelligence');
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: { text: 'The harbor master\'s aide redirects the question to the harbor positioning registry before you finish asking it. The registry is public and posts anchorage authorizations by vessel and date; Cosmouth enforcement vessels will appear there alongside the independent berthing approach coordinates.' }
  },

  {
    id: 'cosmoria_arch_combat_4',
    label: 'The cargo inspection team carries Cosmouth credentials. The harbor master did not issue them.',
    skill: 'might',
    archetypeGroup: 'combat',
    tags: ['Security', 'Authority', 'Credentials'],
    fn: function() {
      G.investigationProgress = (G.investigationProgress||0) + 1;
      addNarration('', 'The cargo inspection team operating on the eastern quay carries Cosmouth commercial house credentials, not harbor master inspection authority. They have the physical presence and the behavioral confidence of authorized inspectors, but their documentation is from a private commercial entity, not a public port authority. Independent captains being inspected by this team have no mechanism to challenge or appeal their findings — there is no institutional superior to complain to because the inspectors are not part of the institutional structure.');
      addJournal('Eastern quay inspectors: Cosmouth commercial credentials, not harbor authority — independent captains have no appeal mechanism.', 'evidence');
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: { text: 'The inspection team captain declines to show credentials to someone who is not a cargo captain under inspection. The harbor master\'s authorization registry lists all persons with harbor inspection authority; an entity not in that registry is visible by absence.' }
  },

  // MAGIC ×2 — port arcane inspection anomalies
  {
    id: 'cosmoria_arch_magic_3',
    label: 'The port arcane inspection ward flags independent cargo. Cosmouth cargo passes without trigger.',
    skill: 'spirit',
    archetypeGroup: 'magic',
    tags: ['Magic', 'Inspection', 'Bias'],
    fn: function() {
      G.investigationProgress = (G.investigationProgress||0) + 1;
      addNarration('', 'The port arcane inspection ward at the main quay is calibrated to trigger on the cargo signature pattern commonly found in independent fishing and trade consignments — a pattern that varies by origin region and container type. Cosmouth commercial vessels use standardized containers with a different signature profile, and that profile is excluded from the trigger range. The ward looks impartial. Its calibration is not. Independent cargo receives mandatory secondary inspection; Cosmouth cargo moves through uninspected by design.');
      addJournal('Port inspection ward: calibrated to flag independent cargo signatures, Cosmouth container profile excluded from trigger range.', 'evidence');
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: { text: 'The ward calibration panel is inside the port authority office, which is not public access. The ward\'s operational parameters — including which cargo types trigger mandatory secondary inspection — are listed in the public port charter posted in the harbor master\'s entry hall.' }
  },

  {
    id: 'cosmoria_arch_magic_4',
    label: 'The weight certification ward was reissued. The new version can be adjusted post-certification.',
    skill: 'spirit',
    archetypeGroup: 'magic',
    tags: ['Magic', 'Certification', 'Fraud'],
    fn: function() {
      G.investigationProgress = (G.investigationProgress||0) + 1;
      addNarration('', 'The standard weight certification ward seals a cargo manifest at the moment of measurement — the ward is designed to be immutable after certification to prevent retroactive alteration. The current ward version in use at the harbor has a modification: a secondary authorization key held by the harbor weight master allows the certified value to be adjusted within a 10% variance window after the initial seal. The modification enables systematic shortfalls to be entered after the fact while the certification stamp appears valid.');
      addJournal('Weight certification ward reissued with post-seal adjustment key — enables systematic shortfall entry after certification.', 'evidence');
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: { text: 'The ward technical specification is inside the port authority registry, restricted to authorized review. The public certification standard posted in the harbor master\'s hall shows the required specification; a comparison against an actual certified manifest will show whether the sealed value matches the listed standard.' }
  },

  // STEALTH ×2 — cargo inspection scheduling gaps
  {
    id: 'cosmoria_arch_stealth_3',
    label: 'Certain cargo arrives at the pre-dawn window. No inspection team is ever present.',
    skill: 'finesse',
    archetypeGroup: 'stealth',
    tags: ['Cargo', 'Schedule', 'Gap'],
    fn: function() {
      G.investigationProgress = (G.investigationProgress||0) + 1;
      addNarration('', 'The harbor inspection schedule has a consistent gap between the midnight shift end and the pre-dawn shift start — a forty-minute window with no inspection team present at the north quay. Vessel arrivals at the north quay between 3:40 and 4:20 receive no primary inspection. Three vessels over the past month have arrived in that window and berthed at the private pier with no arrival log entry. The window is not an oversight. It is a schedule built around a need.');
      addJournal('North quay: 40-minute pre-dawn inspection gap, 3 vessels arrived unlogged in window this month — deliberate schedule.', 'evidence');
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: { text: 'The night shift inspection team is transitioning when you arrive at the quay — the shift change window is happening now, which means both teams are occupied with handover and no one is watching the approach. The arrival log for the north quay berths is posted at the dock master\'s station at the end of each shift.' }
  },

  {
    id: 'cosmoria_arch_stealth_4',
    label: 'The weight clerk uses a second ledger. It leaves the building in her bag.',
    skill: 'finesse',
    archetypeGroup: 'stealth',
    tags: ['Records', 'Ledger', 'Extraction'],
    fn: function() {
      G.investigationProgress = (G.investigationProgress||0) + 1;
      addNarration('', 'The harbor weight clerk keeps a personal ledger in addition to the harbor registry — a smaller book, bound in plain cloth, which she carries into and out of the records room in her bag. The harbor registry stays in the building. The personal ledger travels. Two-ledger systems in inspection roles indicate either a protection copy — someone afraid the registry will be altered — or a parallel record of the true measurements kept separately from the falsified registry version. Either interpretation means the harbor registry cannot be trusted.');
      addJournal('Harbor weight clerk maintains personal traveling ledger alongside harbor registry — either protection copy or true-measurement parallel record.', 'evidence');
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: { text: 'The clerk is at her station and the ledger is in her bag, which is under her desk. A direct question about the personal ledger will end the conversation. The inspector who worked the same station before the current clerk can describe what the standard single-ledger practice looked like.' }
  },

  // SUPPORT ×2 — dockhands communication fractures
  {
    id: 'cosmoria_arch_support_3',
    label: 'The dockhands stopped sharing shift information after two of them were let go without reason.',
    skill: 'charm',
    archetypeGroup: 'support',
    tags: ['Social', 'Fragmentation', 'Fear'],
    fn: function() {
      G.investigationProgress = (G.investigationProgress||0) + 1;
      addNarration('', 'The Cosmoria dockhand community runs on mutual information — who needs a hand, which shift needs filling, who is reliable. Two dockhands were dismissed six weeks ago without stated reason, the same week the Cosmouth allocation changes went into effect. Since then, shift information sharing has dropped significantly; crews arrive separately and avoid the usual coordination. The dismissals were not explained, but the community understood the message clearly enough to change its behavior.');
      addJournal('Dockhand information sharing stopped after 2 unexplained dismissals — community understood message, changed behavior immediately.', 'intelligence');
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: { text: 'The dockhand community has closed to outside questions since the dismissals — they are not hostile, they are careful. The dismissed dockhands are no longer on the harbor, but the waystation keeper logged their final work days in the standard labor record; the dismissal dates will appear there.' }
  },

  {
    id: 'cosmoria_arch_support_4',
    label: 'The independent captains no longer share a table. That table sat six for years.',
    skill: 'charm',
    archetypeGroup: 'support',
    tags: ['Social', 'Network', 'Fracture'],
    fn: function() {
      G.investigationProgress = (G.investigationProgress||0) + 1;
      addNarration('', 'The common table at the harbor waystation where independent captains historically gathered for shared meal and informal coordination has been unused for two months. The captains still come to the waystation, still eat there, but now at separate tables. The fragmentation of the independent fleet\'s informal coordination network means there is no mechanism for collective response to the Cosmouth pressure. Isolated captains negotiating individually with a coordinated commercial power are in a structurally weaker position. The table being empty is not coincidence; it is outcome.');
      addJournal('Independent fleet common table unused 2 months — informal coordination network fragmented, captains negotiating individually against coordinated Cosmouth pressure.', 'intelligence');
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: { text: 'The captains read outside interest in their coordination as one more form of observation — the table has been empty partly because sitting together felt like drawing attention. The waystation keeper has watched the shift happen over two months and can describe it without implicating herself in either side.' }
  }

);

window.COSMORIA_STAGE1_ENRICHED_CHOICES = COSMORIA_STAGE1_ENRICHED_CHOICES;
