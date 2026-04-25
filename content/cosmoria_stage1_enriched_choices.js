/**
 * COSMORIA STAGE 1 ENRICHED MEANINGFUL CHOICES
 * 20 deeply grounded investigation paths tied to maritime archives, shipwright trade, and personal ambition corruption
 * Generated for: Personal ambition vs collective trust, individual power weaponized, archives/records as control
 * Each choice: 65-80 XP, grounded in floating intellectual metropolis politics and maritime hierarchy
 */

const COSMORIA_STAGE1_ENRICHED_CHOICES = [
  // ========== NPC-GROUNDED CHAINS (8 CHOICES) ==========

  // 1. STABLE FACTOR: TRADE ROUTES MANIPULATION
  {
    label: "Three brigs are riding at anchor with idle cranes above them. The berths they're waiting for are occupied by Cosmouth vessels that arrived after them.",
    tags: ['Investigation', 'NPC', 'Maritime', 'Commerce', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading maritime trade pattern shifts');
      G.stageProgress[1]++;

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      const target = 11 + Math.max(0, G.worldClocks.pressure);

      if (result.isCrit) {
        G.lastResult = `Aurek leans against the counting-house rail so his back is to the crane operators below. His voice drops under the chain noise. "Scheduling used to follow tides and declared cargo. Now I receive a list — berth two goes to Halvern's brig, berth seven stays empty until Cosmouth's factor authorizes. Independent captains sit at anchor until the tide turns against them. I've filed three complaints. Two went missing. One came back stamped 'reviewed.'" He stops talking when a stevedore passes with a ledger under his arm.`;
        G.stageProgress[1]++;
        addJournal('Stable Factor revealed corrupted maritime trade route system', 'evidence', `cosmoria-trade-routes-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Aurek goes still when you ask. He picks up a cargo tally from the desk and makes a show of reading it. "Dock allocation follows tidal schedules. Schedules are posted at the harbor gate." He doesn't look up. Two dockside clerks at the far end of the counting house have stopped writing. Your question landed louder than you intended.`;
        G.worldClocks.pressure++;
        addJournal('Stable Factor now protective of maritime trade allocation', 'complication', `cosmoria-trade-hostile-${G.dayCount}`);
      } else {
        G.lastResult = `Aurek sets down his tally sheet and admits berth priority has been "irregular this season." He gestures toward the harbor window — three brigs riding at anchor in the outer channel, loading cranes idle above them. "Weather and tides make scheduling difficult. That's always been true." He picks up the tally again before you can follow up. The three brigs at anchor are all flying independent merchant pennants — the berths they're waiting for are occupied by vessels with Cosmouth house flags that arrived after them.`;
        addJournal('Stable Factor confirmed inconsistent route allocations', 'evidence', `cosmoria-trade-pressure-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 2. QUARTERMASTER: SUPPLY CHAIN DIVERSION
  {
    label: "The ledger shows forty bolts for independent merchants. The correction shows twenty. Cosmouth brig crews show forty. The corrections are in someone else's hand.",
    tags: ['Investigation', 'NPC', 'Resources', 'Supply', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering supply chain manipulation');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Coralyn pulls a ledger from the lower stack — not the one on top. She opens it to a page where three lines have been crossed out. "Sailcloth, forty bolts, crew maintenance." She covers the original entry with her thumb, then lifts it. "Twenty bolts. Listed for independent merchants." She covers the correction, lifts it. "Forty. Listed for Cosmouth brig crews." Same handwriting across five more pages. "I didn't write those corrections," she says. She keeps her thumb on the line she's practiced not speaking aloud.`;
        G.stageProgress[1]++;
        addJournal('Quartermaster revealed supply chain diversion conspiracy', 'evidence', `cosmoria-supplies-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Coralyn's expression closes like a hatch. "Supply records are under Cosmouth administrative hold pending seasonal audit. Access requires a charter warrant." She covers the hold-stamp line with her thumb while she reads the form aloud, then sets the ledger down without lifting her hand from it. A document in the stack behind her bears a red ADMINISTRATIVE HOLD stamp in narrow Collegium block lettering — she shifts to block it. By evening the docks are quieter than they were this morning.`;
        G.worldClocks.watchfulness++;
        addJournal('Quartermaster spreading suspicion about supply chain investigation', 'complication', `cosmoria-supplies-alert-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `Coralyn admits provisions have been "difficult to reconcile this quarter." She shows you a single page — rope inventory, two entries that don't add up by thirty fathoms. She covers the column header with her thumb, then lifts it. "Transit loss." She covers it again. "I was told it's standard." She can't tell you what transit loss means, or who authorized that header. Her thumb stays on the line after she stops speaking. The correction appears across three consecutive pages; whoever adjusted these figures is still working through the ledger. Someone was cleaning the record ahead of you. They are still doing it.`;
        addJournal('Quartermaster confirmed supply allocation ambiguity — record being cleaned ahead of inquiry', 'evidence', `cosmoria-supplies-unclear-${G.dayCount}`);
      } else {
        G.lastResult = `Coralyn says the ledgers require a Cosmouth supply warrant to access. She says it without meeting your eyes, her thumb pressed flat against the warrant procedure notice on her desk as if to keep it from speaking for her. The process takes three days minimum, routes through the harbor administration that manages dock priority, and requires a reason in writing. The clerk of arrivals, Tideon, holds a separate set of carbon copies of the supply receipts as part of the manifest filing chain — a parallel record that doesn't require the same warrant.`;
        addJournal('Supply records blocked without archive authorization', 'evidence', `cosmoria-supplies-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 3. SHRINE CARETAKER: RITUAL CORRUPTION
  {
    label: "The morning blessing list is handed to the caretaker before the tide. Some crews get the full communion. Others get a shorter rite.",
    tags: ['Investigation', 'NPC', 'Faith', 'Ritual', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading corrupted maritime ritual patterns');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Maris speaks with her back to the shrine door and her hands folded tight in her vestments. "Last season I blessed every crew that came to the water gate. Now I'm handed a list before the morning tide. Some crews receive the full communion. Others receive" — she pauses — "a shorter rite. If they ask, I'm to say the full ceremony is reserved for members in good charter standing." She looks at the offering shelf, not at you. "There is no charter standing requirement in any text I have ever read."`;
        G.stageProgress[1]++;
        addJournal('Shrine Caretaker revealed corrupted maritime ritual system', 'evidence', `cosmoria-rituals-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Maris draws herself up and says the rituals of the sea shrine are matters of doctrine, not public record. She says it firmly but her hands are shaking. By afternoon a harbor warden stops you on the upper street and asks your business at the shrine. Someone reported the visit within the hour. The shrine's exterior door is now latched when you pass again at dusk.`;
        G.worldClocks.reverence++;
        addJournal('Shrine Caretaker banned from faith investigation access', 'complication', `cosmoria-rituals-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Maris says the communion form was updated at the start of this tide cycle — new language in the tide-oath, a different sequence for the water-sealing at the end. "Doctrine evolves," she says. She recites it like something she rehearsed. When you ask who authorized the change she names a Cosmouth administrative body you haven't heard of before.`;
        addJournal('Shrine Caretaker confirmed recent ritual modifications', 'evidence', `cosmoria-rituals-changed-${G.dayCount}`);
      } else {
        G.lastResult = `Maris says ritual records are restricted to initiated caretakers. Her answer is polite and complete and tells you nothing. The ritual text you need is written on a board inside the water gate — visible from the threshold but not from outside it. You are standing outside it.`;
        addJournal('Shrine rituals blocked without ceremonial access', 'evidence', `cosmoria-rituals-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 4. CLERK OF ARRIVALS: RECORD TAMPERING
  {
    label: "Three vessels in the arrival record have manifests that are identical word for word. Different ships, different dates, same manifest.",
    tags: ['Investigation', 'NPC', 'Archives', 'Records', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering archive record tampering');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Tideon unlocks a side drawer and pulls out a folded page — a carbon copy of an arrivals log that doesn't match the primary registry on the shelf beside it. He sets them side by side on the counter without speaking. The primary log shows the Thornwall Passage arrived on the eighteenth. The carbon shows the seventeenth. "Someone corrected the primary after the carbon was filed," he says. "I have nine of these. The carbons are in my coat pocket every morning when I leave. I don't trust the drawer anymore." He refolks the copy and tucks it away.`;
        G.stageProgress[1]++;
        addJournal('Clerk of Arrivals revealed archive record falsification system', 'evidence', `cosmoria-records-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Tideon stops writing and looks at your hands, not your face. "Arrival records are Cosmouth administrative property. Requests go through the harbor registry office, third floor, Tuesdays and Thursdays." He goes back to writing before you finish the sentence. The clerk at the next desk has already stopped working. An hour later, your name appears in the harbor office's visitor log — entered by someone who wasn't you.`;
        G.worldClocks.watchfulness++;
        addJournal('Archive clerks warned about record investigation access', 'complication', `cosmoria-records-alert-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `Tideon puts down his pen and says record management has been "under revision." New categories were added two months ago — bonded transit, delayed-manifest, provisional entry. He explains each one without meeting your eyes. When you ask for examples, he opens the wrong ledger first. In the stack of documents behind him, partially visible between two bound volumes, a single loose sheet bears a red stamp across its upper third — the words ADMINISTRATIVE HOLD in block characters. He does not acknowledge it. He does not look at it. He knows where the anomalies are. He's not ready to show them to you yet.`;
        addJournal('Clerk of Arrivals confirmed non-standard record practices', 'evidence', `cosmoria-records-evasive-${G.dayCount}`);
      } else {
        G.lastResult = `Tideon points you to the public summary board at the harbor gate — vessel names, declared cargo class, arrival date, no details. The full registry requires an archivist credential issued by the harbor authority. The harbor authority reports to House Cosmouth. The process is circular and Tideon knows it. He fills out a request form for you and hands it over without comment.`;
        addJournal('Archive records blocked without official authorization', 'evidence', `cosmoria-records-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 5. WARD MEDIATOR: CONFLICT RESOLUTION FAILURES
  {
    label: "A sealed document arrived before her last hearing with the preferred ruling already written. She ruled differently. The review of her credentials arrived the following week.",
    tags: ['Investigation', 'NPC', 'Mediation', 'Districts', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering mediation system corruption');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Nerissa sets a sealed document on the table between you and doesn't open it. "This arrived before my last hearing. It outlined the preferred ruling." The seal is a Cosmouth administrative mark — not a judicial one. "I ruled differently. The following week I received a review notice questioning my professional credentials." She taps the document. "I kept it. In case someone came asking." She slides it across the table. The salt smell drifts up from the lower harbor. She waits.`;
        G.stageProgress[1]++;
        addJournal('Ward Mediator revealed corrupted district mediation system', 'evidence', `cosmoria-mediation-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Nerissa stands, not quickly — carefully. "Mediation proceedings are protected under ward confidentiality. You'll need to file a formal observation request with the harbor district council." She holds the door open before you've said you're leaving. The district council chamber is two streets away; when you pass it an hour later, there's a warden outside who wasn't there before.`;
        G.worldClocks.pressure++;
        addJournal('Ward Mediator prohibited further mediation questions', 'complication', `cosmoria-mediation-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Nerissa says ward disputes have been "unusually contentious this cycle." She describes one case — a mooring rights dispute between an independent fisher and a Cosmouth brig captain — and the way she tells it, the reasoning she applied, doesn't match the ruling she issued. She notices you noticing. "I applied the standard framework," she says. She doesn't repeat it.`;
        addJournal('Ward Mediator confirmed recent mediation bias patterns', 'evidence', `cosmoria-mediation-biased-${G.dayCount}`);
      } else {
        G.lastResult = `Nerissa explains that case records are sealed for sixty days per ward protocol. Summaries are available through the district clerk's office with a party-of-interest certification. You are not a party of interest. She writes down the clerk's address on a slip of paper and hands it over. Her handwriting is precise. One independent merchant who held the mooring rights in the dispute she described would qualify as a party of interest — and the case summary index is public.`;
        addJournal('District mediation blocked without ward authorization', 'evidence', `cosmoria-mediation-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 6. STREET PHYSICIAN: HEALTH RECORDS FALSIFICATION
  {
    label: "The physician's own record shows acute respiratory. The official harbor health roll shows seasonal minor. Different date, different severity.",
    tags: ['Investigation', 'NPC', 'Health', 'Records', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading population health corruption patterns');
      G.stageProgress[1]++;

      const result = rollD20('survival', (G.skills.survival || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Sevrin keeps his own records in a salt-warped notebook that he doesn't leave at the clinic. He opens it on his knee rather than on the desk. "Three families in the lower ward, respiratory. I listed it as acute. The harbor health roll came back listing it as seasonal minor." He shows you his entry. Shows you the official copy. The official copy has a different date and a different severity category. "I haven't corrected it," he says quietly. "Because I don't know who's reading my corrections." He closes the notebook.`;
        G.stageProgress[1]++;
        addJournal('Street Physician revealed falsified health records system', 'evidence', `cosmoria-health-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Sevrin's answer comes out rehearsed — patient records are protected under the Cosmouth health privacy charter, you'd need a public health warrant, apply at the harbor registry. He turns to his instruments and starts cleaning them with the focus of someone who wants to end a conversation. There's a notebook on the shelf behind him, tucked behind a jar of salt compress. He doesn't look at it. You don't either.`;
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
    }
  },

  // 7. ARCHIVIST: DOCUMENT DESTRUCTION
  {
    label: "There's a gap on the archive shelf — dust-free at the edges, older dust in the center. The third level that holds what was there didn't exist six months ago.",
    tags: ['Investigation', 'NPC', 'Archives', 'History', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering archive destruction conspiracy');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The Archive Keeper walks you to a shelf and points to a gap — three fingers wide, dust free at the edges, older dust in the center. "Trade Compact records, years forty-one through forty-six. The years when independent merchants ran forty percent of the harbor." He doesn't lower his voice. There's nobody else here. "They were re-classified as restricted operational history two weeks ago. Sealed storage, third level. I don't have a key for the third level." He turns to face you. "I've worked this archive for nineteen years. There was no third level until six months ago."`;
        G.stageProgress[1]++;
        addJournal('Archive Keeper revealed systematic document destruction conspiracy', 'evidence', `cosmoria-archives-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The archivist's face doesn't change but his hand moves to the edge of the reading counter, bracing. "Collection management decisions are made by the archive board. Questions about specific records go through the formal inquiry process." He produces a form — six sections, two requiring notarized seals. Your reading access is downgraded to the public catalogue before you reach the door. Someone is watching the archive for exactly this kind of question.`;
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
    }
  },

  // 8. SHIPWRIGHT FOREMAN: QUALITY STANDARDS CORRUPTION
  {
    label: "The Cosmouth vessel's joins pass inspection. The independent builder's identical joins are under correction review for eleven days.",
    tags: ['Investigation', 'NPC', 'Craft', 'Quality', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering shipwright safety corruption');
      G.stageProgress[1]++;

      const result = rollD20('craft', (G.skills.craft || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Haskon puts down the adze and wipes pitch from his hands before answering. He walks you to a vessel on the middle berth — Cosmouth house flag, new timber, finished yesterday by the look of the caulking. He runs his thumb along a join near the waterline. "That passes now. Two years ago I'd have sent it back." He crosses to an independent builder's brig two berths over, older vessel, tight joins. "This one has been under correction review for eleven days. Minor variation in rib spacing — within tolerance, just not Cosmouth standard." He doesn't raise his voice. He doesn't need to.`;
        G.stageProgress[1]++;
        addJournal('Shipwright revealed corrupted vessel quality system', 'evidence', `cosmoria-shipwright-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The shipwright sets his mallet down slowly. "Quality inspection isn't a public process." He says it watching your hands. By the time you leave the dry dock the other builders have gone quiet — tools still running but eyes tracking you down the walk. The pitch smell and salt air follow you up to the commercial street. Before evening one of the younger workers has asked another shipyard who you were.`;
        G.worldClocks.watchfulness++;
        addJournal('Shipwright community warned about quality investigation', 'complication', `cosmoria-shipwright-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The shipwright admits inspection timelines have been "inconsistent." She points at two vessels in adjacent berths — one approved in a day, one delayed for nine. She doesn't say which house flags they're carrying, but she doesn't have to. You can read the pennants yourself. "Standards evolve," she says. She picks up her adze.`;
        addJournal('Shipwright confirmed inconsistent quality standard application', 'evidence', `cosmoria-shipwright-evasive-${G.dayCount}`);
      } else {
        G.lastResult = `The shipwright tells you inspection records are guild-sealed and not available without a build commission. Without one, you can walk the public berths and look at the hulls yourself. Two adjacent berths hold vessels from different flag affiliations — one Cosmouth, one independent — with visibly different join tolerances at the waterline. The inspection panel that approved both is the same panel. The appeal log for the independent vessel's correction review is in the public guild record.`;
        addJournal('Shipwright standards blocked without craft access', 'evidence', `cosmoria-shipwright-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== ARCHETYPE DEEP DIVES (8 CHOICES) ==========

  // 9. MARITIME HIERARCHY: FLOATING DISTRICT REORGANIZATION
  {
    label: "Five ward charter amendments in eight months, each adding a Cosmouth oversight clause to a previously independent function.",
    tags: ['Investigation', 'Structure', 'Organization', 'Maritime', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'maritime hierarchy analysis');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The ward charter amendments from the past eight months are public record — five of them, each adding a Cosmouth oversight clause to a previously independent district function. The third amendment reclassified ward councils as advisory. The fifth removed the ward mediator appointment process from district vote. The amendments were passed under emergency maritime stability provisions that don't require public hearing. Each one individually is minor. Together they redirect every decision node in the district structure toward a single point.`;
        G.stageProgress[1]++;
        addJournal('Structure analysis revealed centralized power consolidation', 'evidence', `cosmoria-structure-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The ward charter amendments are public but the archive clerk pulls the file and sets it on the counter and then stands there while you read. When you take notes, he notes that you're taking notes. Before you finish the third document, a harbor official arrives and asks your name. They write it down. They don't explain why. The file goes back to the shelf before you've read the fifth amendment.`;
        G.worldClocks.watchfulness++;
        addJournal('House Cosmouth alerted to governance structure inquiry', 'complication', `cosmoria-structure-alert-${G.dayCount}`);
      } else {
        G.lastResult = `The public ward charter shows three amendments in the past year. The language is dense with maritime administrative terminology but the structural effect is readable: two ward positions that previously reported to the district council now report directly to the harbor authority. The emergency maritime stability provision cited in each amendment requires a formal emergency declaration — that declaration, if it exists, is in the public harbor registry as a matter of record.`;
        addJournal('District hierarchy modifications confirmed', 'evidence', `cosmoria-structure-modified-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 10. MARITIME NETWORKS: MERCHANT DISPLACEMENT
  {
    label: "The harbor didn't shrink. Sixty-four independent merchants three years ago, forty-one now. It was selectively cleared.",
    tags: ['Investigation', 'Networks', 'Maritime', 'Displacement', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'merchant network displacement mapping');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The harbor trader roster from three years ago lists sixty-four active independent merchants. The current roster has forty-one. You pull departure records for the missing twenty-three: twelve left Cosmoria entirely, six have no recorded activity after their dock access was declined, five are still listed as registered but haven't filed a cargo manifest in more than a year. In the same period, nine new merchants with Cosmouth house affiliations appear in the active roster. The harbor didn't shrink. It was selectively cleared.`;
        G.stageProgress[1]++;
        addJournal('Network analysis revealed deliberate merchant displacement', 'evidence', `cosmoria-network-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `You request the trader roster comparison through the harbor registry. The clerk takes the request, goes into the back room, and returns with a Cosmouth trade officer instead of a document. The officer asks what you need the historical roster for. You give a reason. He writes it down. The document request is marked pending review. By the time you leave the building, two independent merchants you'd spoken to earlier that day have stopped being available.`;
        G.worldClocks.watchfulness++;
        addJournal('House Cosmouth alerted to network analysis', 'complication', `cosmoria-network-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The public trader registry shows turnover — names dropping off, new names appearing. Without the historical roster for comparison you can only see the current state, not the shape of what changed. What's visible: four of the seven newest registrations share an address in the Cosmouth merchant quarter. That much is in the public record.`;
        addJournal('Merchant network composition changes confirmed', 'evidence', `cosmoria-network-modified-${G.dayCount}`);
      } else {
        G.lastResult = `The current trader registry shows who's active, not who isn't. Without access to the decline records or the historical roster, you can map what's present but not what was removed. Two independent merchants you speak to on the lower docks confirm departures — "Essad left in the fourth month, Corl three weeks after" — and name the dock allocation denials that preceded each departure. Dock allocation decisions are logged by berth date in the stable factor's public scheduling record.`;
        addJournal('Merchant displacement analysis incomplete', 'evidence', `cosmoria-network-partial-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 11. ARCHIVE INTEGRITY: DOCUMENTATION SYSTEM ANALYSIS
  {
    label: "The archive public access list ran to three pages a year ago. The current version is one page. Every removed category covers the period before Cosmouth consolidated harbor authority.",
    tags: ['Investigation', 'Archives', 'System', 'Information', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'archive system integrity analysis');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The archive's public access ledger lists what's available without a credential. Twelve months ago that list ran to three pages. The current version is one page. You count the categories that dropped off: merchant autonomy records, harbor taxation history, disease and injury rolls, independent ward correspondence. Every removed category covers a period before Cosmouth consolidated harbor authority. The access ledger itself is dated and signed. The person who signed it signed all twelve restriction orders in the same week.`;
        G.stageProgress[1]++;
        addJournal('Archive analysis revealed information control system', 'evidence', `cosmoria-info-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `You ask the senior archivist directly about the access list reduction. He pauses — not surprised, something flatter than surprise — and says access policy is a board matter and not open to patron comment. Before you leave the reading room, someone has noted your seat number in a separate register. Your next request to the archive catalogue returns a shorter list than the one you received this morning.`;
        G.worldClocks.watchfulness++;
        addJournal('Archive authorities monitoring information restriction inquiry', 'complication', `cosmoria-info-alert-${G.dayCount}`);
      } else {
        G.lastResult = `The access list is shorter than it should be for an archive this size. Several categories are marked with a new classification stamp — a red border around the entry — that wasn't in use last season. The stamp says "administrative hold, pending review." The review has no listed completion date and no listed reviewer.`;
        addJournal('Archive access restriction changes confirmed', 'evidence', `cosmoria-info-restricted-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 12. PERSONAL AMBITION TRACKING: WHO'S RISING
  {
    label: "Three newly powerful positions, all created in the same administrative cycle, all filled by the same harbor authority office.",
    tags: ['Investigation', 'Ambition', 'Power', 'Tracking', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'personal ambition pattern mapping');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Three names appear across multiple institutional changes in the past year. A treasury clerk named Ossel now signs off on supply allocation orders that previously required a harbor commissioner's seal. A merchant named Farre with two years of registry history is listed as advisor to the archive board. A shipwright named Calden whose workshop was registered fourteen months ago sits on the inspection standards panel. None of them held these positions two years ago. All three positions were newly created in the same administrative cycle. All three appointments were made by the same harbor authority office.`;
        G.stageProgress[1]++;
        addJournal('Ambition analysis revealed orchestrated power installation system', 'evidence', `cosmoria-ambition-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Requesting appointment records through the harbor registry produces a response faster than expected — a Cosmouth security clerk, not the archivist, with a question about your interest in internal administrative staffing. You give a neutral answer. He writes it down. Within the hour a notice appears at your lodging address — a reminder that harbor administrative records are protected under the Cosmouth governance charter. Nobody told you your lodging address.`;
        G.worldClocks.pressure++;
        addJournal('House Cosmouth security alerted to ambition analysis', 'complication', `cosmoria-ambition-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The public appointment records show the names and the positions. What they don't show is the promotion history — how these individuals advanced from their prior roles, what qualifications were assessed, who recommended them. Without the internal files, you have the outcome but not the mechanism. The outcome is clear enough: all three newly powerful positions were created and filled within a single administrative session.`;
        addJournal('Power advancement pattern changes confirmed', 'evidence', `cosmoria-ambition-confirmed-${G.dayCount}`);
      } else {
        G.lastResult = `The public record confirms unusual appointment timing but not the coordination behind it. You can see that three people were elevated simultaneously into newly created positions. You can't see who created those positions, what criteria were applied, or whether the appointments were connected — that documentation is in the internal administrative files, not the public registry.`;
        addJournal('Individual power tracking incomplete', 'evidence', `cosmoria-ambition-partial-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 13. INSTITUTIONAL LEVERAGE: DEPENDENCY SYSTEM
  {
    label: "The coercion arrives as process, as delay, as paperwork — until the person at the center works out what the paperwork wants from them.",
    tags: ['Investigation', 'Institutions', 'Dependency', 'Power', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'institutional dependency system documentation');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Four independent merchants describe the same sequence: a minor administrative irregularity flagged against their record, a compliance review scheduled, a suggestion from a Cosmouth clerk that the review might be resolved favorably if they adjusted their dock preference requests. All four adjusted. Two sailors describe certification delays that ended after they stopped working with a specific independent captain. A clinic patient describes being told their shrine blessing was "conditional." The coercion doesn't announce itself. It arrives as process, as delay, as paperwork — until the person at the center works out what the paperwork wants from them.`;
        G.stageProgress[1]++;
        addJournal('Institution analysis revealed systematic dependency weaponization', 'evidence', `cosmoria-dependency-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The third independent merchant you speak to is interrupted mid-sentence by a Cosmouth clerk who appears at his warehouse door and tells him his quarterly compliance paperwork is overdue. The merchant goes pale and excuses himself. The clerk doesn't look at you. When the merchant comes back twenty minutes later he says he doesn't remember what he was telling you before. He's not lying. He just knows what he costs himself by remembering.`;
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
    }
  },

  // 14. SUPPLY MANIPULATION: RESOURCE SCARCITY CREATION
  {
    label: "Full deliveries arrive at the harbor warehouse. Independent builders get sixty percent. The rest sits reserved for Cosmouth fleet maintenance with nothing scheduled.",
    tags: ['Investigation', 'Resources', 'Scarcity', 'Control', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'resource scarcity manipulation mapping');
      G.stageProgress[1]++;

      const result = rollD20('craft', (G.skills.craft || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The supplier manifests show full deliveries arriving at the harbor warehouse. The independent builder allocation records show partial distributions — sailcloth at sixty percent of ordered quantity, rope at seventy. The warehouse inventory reconciliation shows the remaining stock categorized as "reserved — Cosmouth fleet maintenance." The fleet maintenance logs show nothing scheduled for the dates those reserves were created. The materials exist. They're sitting in a warehouse fifty meters from where builders are requesting them and being refused.`;
        G.stageProgress[1]++;
        addJournal('Resource analysis revealed artificial scarcity creation', 'evidence', `cosmoria-scarcity-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Requesting the warehouse inventory records produces a quartermaster's aide, not a clerk, who asks what you need the supply figures for. You give a reason. The aide says the warehouse is under a Cosmouth fleet audit and records are temporarily restricted. By the time you reach the lower docks, two independent builders you'd been planning to approach have been told by the warehouse foreman that their pending allocation requests are under review.`;
        G.worldClocks.watchfulness++;
        addJournal('Quartermaster alerted to supply tracking', 'complication', `cosmoria-scarcity-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Three independent builders confirm their allocation requests came back short this quarter. All three used the word "shortage" and all three were told the shortage was seasonal. The seasonal shortage explanation doesn't account for why the Cosmouth brig that launched yesterday had full-weight rope fittings. You saw the fittings. They weren't short on anything.`;
        addJournal('Resource distribution modifications detected', 'evidence', `cosmoria-scarcity-modified-${G.dayCount}`);
      } else {
        G.lastResult = `You can see that independent builders are receiving less than they ordered. You can't see the warehouse inventory or the allocation orders that determine who gets what. The builders themselves don't have that documentation — they only have the shortage. The Iron Compact's cargo projections include inbound supplier manifests as part of their routing data; the same documents the harbor warehouse controls appear in the Compact's commercial intake log as a separate filing.`;
        addJournal('Resource scarcity analysis incomplete', 'evidence', `cosmoria-scarcity-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 15. FAITH WEAPONIZATION: RITUAL AS CONTROL
  {
    label: "Cosmouth brig crews get the full morning ceremony. Independent fishing crews are turned away. They leave quickly. They've been turned away before.",
    tags: ['Investigation', 'Faith', 'Ritual', 'Control', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'ritual weaponization documentation');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The morning tide ceremony at the water gate lasts twenty minutes for a Cosmouth brig crew. You watch. The caretaker completes the full rite — tide-oath, water-sealing, the blessing at the bow. An independent fishing crew arrives at the gate while the ceremony is still running. They wait. When the Cosmouth crew finishes, the caretaker turns and tells the fishing crew the gate is closed for the morning session, to return at the afternoon tide. They leave without argument. They've been turned away before. You can see it in how quickly they go.`;
        G.stageProgress[1]++;
        addJournal('Faith analysis revealed systematic ritual weaponization', 'evidence', `cosmoria-faith-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `You ask the caretaker at the secondary shrine about blessing access. She listens to the question without expression and then tells you the blessing schedule is set by the shrine council, inquiries go through the harbor faith registry, and observers without a practitioner's standing are not permitted in the water gate area during ceremonies. She says all of it pleasantly. The next day, the secondary shrine's gate is staffed by a warden who wasn't there before.`;
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
    }
  },

  // ========== GOSSIP ESCALATION (4 CHOICES) ==========

  // 16. HARBOR RUMOR: DOCKWORKER WHISPERS
  {
    label: "The lower docks have absorbed something as established fact. Three different people in an hour, all treating it the same way — quietly, without asking why.",
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
    }
  },

  // 17. ARCHIVE RUMOR: SCHOLAR WHISPERS
  {
    label: "The reading room above the harbor has its own current. Scholars share things quietly, plausibly deniable, already accepted.",
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

      G.lastResult = `In the reading room above the harbor, between shelves of salt-stiffened ledgers: "${selected}." A scholar says it while refiling a document, not quite to you. Another nods without looking up from his work. A third glances at the archivist's office door before saying she'd heard the same. They share it the way people share something they've decided not to be caught investigating — quietly, plausibly deniable, already accepted.`;
      addJournal(`Archive rumor gathered: "${selected}"`, 'evidence', `cosmoria-rumor-${G.dayCount}`);

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 18. INSTITUTIONAL CRACK: CORRUPTION PROOF COMPILATION
  {
    label: "Nine documents from nine different institutions. None point at each other. All point the same direction.",
    tags: ['Investigation', 'Evidence', 'Proof', 'Conspiracy', 'Meaningful'],
    xpReward: 80,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(80, 'exposing institutional corruption conspiracy');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Laid flat on a counting-house table you've borrowed for the afternoon: nine carbon arrival copies with corrected primaries, Coralyn's corrected supply ledger, Nerissa's pre-issued ruling document, the access tier list signed in one week, the warehouse allocation records against the fleet maintenance logs that don't match. Each document is a different institution. Each has the same quality — a deliberate alteration that absorbs its own evidence. They don't point at each other. They all point the same direction. That's the paper trail.`;
        G.stageProgress[1]++;
        addJournal('Institutional corruption conspiracy documented with proof', 'evidence', `cosmoria-proof-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `A Cosmouth clerk arrives at the table while you're still sorting documents. He doesn't touch anything. He says, with no hostility at all, that administrative records taken from their respective offices without a charter warrant constitute misappropriation of public property, and that continuing to compile them in this manner will require him to escalate. He waits. You look at the documents. Some of them were given to you. Some of them weren't. He knows which are which. The proof you've built is real. It's also currently sitting in front of someone who can make it cost you.`;
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
    }
  },

  // 19. MORAL PRESSURE: INSTITUTION LOYALTY COMPROMISE
  {
    label: "They've been waiting for someone to ask for months. Now someone is here and they don't know if it makes things better or worse.",
    tags: ['Investigation', 'Moral', 'Choice', 'Pressure', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'making moral commitment');
      G.stageProgress[1]++;

      const npcOptions = [
        { name: 'Quartermaster Coralyn Foamglass', role: 'resource keeper', fear: 'They threatened to have me reassigned to merchant crew service if I spoke out. My family depends on my position.' },
        { name: 'Archive Keeper Marvin', role: 'historical guardian', fear: 'They made it clear that exposing document destruction would result in my dismissal and blacklisting from all scholarly work in Cosmouth.' },
        { name: 'Clerk Tideon Anchorlight', role: 'record keeper', fear: 'I wanted to resist but they said if I exposed falsified records, they\'d accuse me of the falsification itself.' }
      ];

      const npc = npcOptions[Math.floor(Math.random() * npcOptions.length)];

      G.lastResult = `${npc.name} stops moving when you ask directly. Their hands go still. "${npc.fear}" The brine smell drifts up from the lower harbor. They're waiting for what comes next — not from fear of you specifically, but because they've been waiting for someone to ask for months and now that someone is here they don't know if it makes things better or worse. That's your call.`;

      if (!G.flags) G.flags = {};
      G.flags.stage1_evidence_decision = 'pending';
      G.flags.stage1_moral_npc = npc.name;

      addJournal('consequence', `Confronted ${npc.name} (${npc.role}) about institutional corruption participation`, `cosmoria-moral-${G.dayCount}`);

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 20. DISCOVERY MOMENT: EXTERNAL COORDINATION SOURCE
  {
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

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Behind the arrival corrections and the supply diversions and the pre-issued rulings: a courier manifest tucked into the back of the arrival log Tideon kept hidden. Destination: a harbor address in the northern territories. Contents listed as "administrative correspondence — institutional coordination." Three financial transfer records from the same northern address to a Cosmouth administrative account, dated one week before each of the five ward charter amendments. The money came first. The amendments followed. Cosmoria's institutions didn't change from inside. They were purchased from outside.`;
        G.stageProgress[1]++;
        addJournal('Origin source of Cosmoria institutional corruption identified as external coordination', 'discovery', `cosmoria-origin-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `You get close enough to see the courier manifest exists. Then a Cosmouth warden steps into the reading room, takes the arrival log from the table without explanation, and informs you that the harbor registry has requested the return of administrative materials currently outside their custody. He doesn't threaten. He doesn't need to. He just takes the log. You have what you remembered reading before he arrived. The manifest destination is gone with the book.`;
        G.worldClocks.pressure += 2;
        addJournal('Investigation intercepted by external coordination operators', 'complication', `cosmoria-origin-caught-${G.dayCount}`);
      } else if (result.total >= 14) {
        G.lastResult = `The financial transfer records show an external origin — a northern harbor address appearing in three separate documents across different institutions. Whether those transfers purchased the charter amendments, the supply diversions, or something else isn't yet clear. The address exists. The payments were made. Whatever is being done to Cosmoria was funded from somewhere that is not Cosmoria.`;
        addJournal('External coordination of Cosmoria confirmed', 'discovery', `cosmoria-origin-external-${G.dayCount}`);
      } else {
        G.lastResult = `The trail ends at a gap: the courier manifest Tideon mentioned is in a section of the arrival log that's under administrative hold. The financial transfer records reference an account number without a registered owner. There's enough to know the coordination is external. Not enough to trace it further. The gap is deliberate — it's been left exactly here, at the point where the thread would connect to a name.`;
        addJournal('External coordination suspected but source not yet identified', 'evidence', `cosmoria-origin-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== EXPANSION CHOICES ==========

  // 21. CLUE: GHOST VESSEL EVIDENCE
  {
    label: "Seven vessels departed without return manifests. All seven flags were raised. All seven were cleared by the same administrator on irregular days.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 73,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(73, 'identifying ghost vessel registry entries');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 13) {
        G.lastResult = `Seven vessels departed Cosmoria over four months with standard cargo manifests and no return entries filed. Maritime law requires an automatic follow-up flag for any vessel without a return entry. All seven flags were raised. All seven were cleared before action — manually, by the same harbor administrator, on irregular days that don't follow a duty schedule. The clearance notes say "resolved — internal compliance." No case numbers. No counter-signatures. The administrator cleared their own flags.`;
        if (!G.flags) G.flags = {};
        G.flags.found_ghost_vessel_evidence = true;
        addJournal('Ghost vessels: seven without return manifests, flags manually cleared by single administrator on irregular schedule', 'evidence', `cosmoria-ghost-vessels-${G.dayCount}`);
      } else {
        G.lastResult = `The departure registry shows vessels without return entries — that much is in the public log. The clearance records that explain why no follow-up was issued are in the harbor administration files, restricted to maritime inspector credential holders. You can see the gap in the registry. You can't yet see who filled it in.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
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
    }
  },

  // 23. ARCHETYPE-GATED: READING THE HARBOR
  {
    label: "Berths four and six load during the noisiest window of the day. Someone scheduled those departures to be invisible by circumstance.",
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
    }
  },

  // 24. FACTION SEED: IRON COMPACT MARITIME CONTACT
  {
    label: "The Iron Compact tracks cargo routing. Seven ghost vessels show up as a routing gap in their projections.",
    tags: ['Faction', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'making Iron Compact contact');
      if (!G.factionHostility) G.factionHostility = { warden_order: 0, iron_compact: 0, oversight_collegium: 0 };

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `Sull Crenn's office smells of tar paper and ledger ink. He listens to the ghost vessel summary without interrupting. "Seven departures without returns shows up as a routing gap. The Iron Compact's cargo projections run short when vessels vanish mid-cycle." He's not troubled by the fraud itself — he's troubled by the disruption to his forecasting. He puts his hands flat on the desk. "I'll share cargo pattern data from the past six months. You share the template manifests. I can use those for a formal routing discrepancy claim." A transaction. Clean and immediate.`;
        if (!G.flags) G.flags = {};
        G.flags.met_iron_compact_cosmoria = true;
        G.factionHostility.iron_compact += 1;
        addJournal('faction', 'Iron Compact agent Sull Crenn: ghost vessels disrupt routing data, willing to exchange cargo pattern information', `cosmoria-iron-${G.dayCount}`);
      } else {
        G.lastResult = `The Iron Compact office is mid-transaction when you arrive — two cargo agents negotiating a crane priority slot, a third waiting with a manifest folder. Sull Crenn is visible through the office window but his clerk intercepts you at the door. Appointments only. Submit your purpose in writing. You can see the departure schedule board on the wall behind Crenn. The seven ghost vessel dates are visible on it — noted in a different ink than the surrounding entries. He's tracking them already.`;
        if (!G.flags) G.flags = {};
        G.flags.located_iron_compact_cosmoria = true;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 25. ATMOSPHERE: THE TIDE MARKER
  {
    label: "The last name carved on the harbor tide markers is two years old. The tradition just stopped. No sign, no locked gate, no explanation.",
    tags: ['WorldColor', 'Lore', 'Stage1', 'Meaningful'],
    xpReward: 50,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(50, 'reading Cosmoria tide markers');

      G.lastResult = `The tide markers at the harbor mouth are worn smooth by three hundred years of hands and salt spray. Names and dates run up both sides — the oldest near the base, faded to bare suggestion, the recent ones still sharp. The most recent carved entry is dated two years and four months ago. The stone above it is unmarked. There's no official prohibition. No locked gate. No sign. The tradition just stopped. A sailor you pass on the walk back says he knows about the markers but he wouldn't carve his name there now. He doesn't say why.`;
      addJournal('Harbor tide markers: departure tradition stopped two years ago without explanation — harbor culture shifted', 'discovery', `cosmoria-tides-${G.dayCount}`);
      G.recentOutcomeType = 'explore'; maybeStageAdvance();
    }
  },

  // 26. PERSONAL ARC: THE HARBOR ADMINISTRATOR'S RECORD
  {
    label: "The administrator created their own cover by recording just enough to fill the space. The log is on their desk.",
    tags: ['PersonalArc', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'obtaining administrator appointment log');
      if (!G.flags) G.flags = {};

      const result = rollD20('stealth', (G.skills.stealth || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `The appointment log is a bound book, each entry in the administrator's own hand. Seven entries on the flag-clearance days: "internal compliance review — 15 min." No counterparty. No case reference. No secondary signature. A flag clearance that requires harbor authority confirmation and registry update resolved in fifteen minutes with no documentation trail. The administrator wrote it down because a blank in the log would be more conspicuous than a vague entry. They created their own cover by recording just enough to fill the space.`;
        G.flags.obtained_administrator_log = true;
        addJournal('consequence', 'Administrator appointment log secured: seven ghost vessel clearances documented as unauthorized 15-minute compliance reviews', `cosmoria-admin-log-${G.dayCount}`);
      } else {
        G.lastResult = `The appointment log stays on the administrator's desk, not on the public-access shelving. Getting to it requires either the administrator's absence or a reason to be in the office that the administrator accepts. Right now you have neither. The office window faces the harbor and the administrator is at their desk, positioned where they can watch the berths while they work. The log is in plain sight from the corridor. So is everyone who approaches it.`;
      }
      G.recentOutcomeType = 'stealth'; maybeStageAdvance();
    }
  },

  // 27. SOCIAL: THE RETURNING SAILOR
  {
    label: "One of those crews came back. Private mooring, sealed cases, men who moved like they'd offloaded there before. Triple rate, no return manifest.",
    tags: ['Social', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'interviewing returning crew member');

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `Kavan describes the Shelf Islands run with the careful specificity of someone who's been rehearsing how much to say. "Private mooring. No authority presence. The cargo came off in two hours — sealed cases, uniform weight, handled by men who weren't dock labor." He pauses. "They moved like they'd offloaded there before. Same mooring, same positions." Triple rate, no return manifest, told it was a tax arrangement. "I've done gray-margin runs. This wasn't that." He looks at the harbor mouth. "The cases were labeled in a script I didn't recognize."`;

        if (!G.flags) G.flags = {};
        G.flags.met_kavan_sailor = true;
        addJournal('contact', 'Sailor Kavan: Shelf Islands delivery, sealed uniform cases, private mooring, no official presence — triple rate', `cosmoria-kavan-${G.dayCount}`);
      } else {
        G.lastResult = `The harbor is quieter than yesterday in certain pockets — the tavern by berth three, the rope-mender's bench near the lower gate, the usual spots. A net-mender says the crews from berths four and six haven't been around since midmorning. Word moves fast in a working harbor. Someone on those crews knows questions are circulating and has decided today isn't a good day to be findable. The empty stools do the answering for them.`;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // 28. SHADOW RIVAL INTRO
  {
    label: "A maritime insurance broker mentions someone visited them last week asking about the same ghost vessels — claiming to be a cargo verification specialist.",
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
      addJournal('warning', 'Rival-adjacent operative investigated Cosmoria ghost vessels before you — multi-source triangulation approach', `cosmoria-rival-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },
{
  label: 'The notice board has recent postings.',
  tags: ['social'],
  xpReward: 5,
  fn: function() {
    var key = 'rumor_drawn_' + G.location + '_' + G.dayCount;
    if (G.flags[key]) {
      G.lastResult = 'The board has nothing new since this morning.';
      return;
    }
    G.flags[key] = true;
    drawLocalityRumor(G.location);
  }
}
];
window.COSMORIA_STAGE1_ENRICHED_CHOICES = COSMORIA_STAGE1_ENRICHED_CHOICES;
