/**
 * SHIRSHAL STAGE 2 ENRICHED CHOICES
 * Investigation arc: compliance investigation bureau / cross-locality evidence suppression
 * NPCs: Tazren Coilspire (Senior Investigator), Mirae Coilspire (Innkeeper),
 *       Khalis Coilspire (Market Clerk), Sivren Coilspire (Shrine Attendant), Luneth Coilspire (Porter)
 */

const SHIRSHAL_STAGE2_ENRICHED_CHOICES = [

  {
    label: "Tazren Coilspire has an open case file that touches every thread I have been following. He has been pulling at this longer than I have.",
    tags: ['Investigation', 'Stage2', 'Meaningful'],
    xpReward: 84,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(84, 'cross-referencing with Bureau investigator Tazren Coilspire');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_tazren_coilspire = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `Tazren pulls the copy from a locked drawer, not the filing cabinet. Eight months of work: the sealed charter pattern, the Fairhaven staging point, the glyph surge correlation — all named, all dated. He was pulled from the case six months ago and told the file was archived. "Archived means it stops. I wasn't finished." He slides the copy across the desk without ceremony. The pages are organized. He was waiting for someone to ask.`;
        addJournal('Bureau investigator Tazren — 8-month parallel case file shared, case was suppressed', 'evidence', `shir-tazren-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `Tazren listens to your first two sentences and reaches for his visitor log without looking up. "Knowing the specifics of a Bureau case thread without credentials is a concern I'm required to document." He copies your name in a neat hand and asks for origin papers with the flat efficiency of someone who has run this procedure before and does not enjoy it. A summary of the visit is on its way to his supervisory chain before the conversation has properly ended. Whatever goodwill this interview might have built has been spent on a protocol note.`;
        addJournal('Bureau visit logged — origin documentation requested', 'complication', `shir-tazren-fail-${G.dayCount}`);
      } else {
        G.flags.met_tazren_coilspire = true;
        G.investigationProgress++;
        G.lastResult = `Tazren confirms the case and stops there. "I can't share an archived file without a reinstatement order." He pauses. "The charter pattern you described is in it. I'll confirm that much." He straightens the papers on his desk. "An archived case doesn't mean the subject stopped moving. It means the oversight stopped."`;
        addJournal('Bureau archived case confirmed — investigation moved off-record', 'evidence', `shir-tazren-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Luneth Coilspire processes evidence transfers between Bureau departments — three evidence packages related to glyph cases were marked delivered but never logged at their destination.",
    tags: ['NPC', 'Stealth', 'Stage2', 'Meaningful'],
    xpReward: 76,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(76, 'tracing missing evidence transfers with Luneth Coilspire');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('finesse', (G.skills.stealth||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_luneth_coilspire = true;
        G.investigationProgress++;
        G.lastResult = `Luneth traces the three packages through his transfer log with practiced speed. All marked "received — archive." The receiving address is a sub-registry notation that doesn't appear in the Bureau's official branch directory — he's checked twice. He maps the address against a regional index and holds the result up without speaking. The notation places it in the same northern staging district that came up in the Fairhaven thread.`;
        addJournal('Evidence transfers to unlisted sub-registry — maps to northern staging district', 'evidence', `shir-luneth-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Luneth pulls the request form and stops. The transfer records are under retention audit this week — standard cycle, nothing unusual on paper. Except your request triggers a hold on the specific packages in question, freezing access for thirty days. Luneth looks at the hold notice with the particular expression of someone who has just understood something they didn't want to. The audit timing selected for these packages. The destination registry for the physical transfers is a separate filing system — the hold doesn't reach it.`;
        addJournal('Evidence records frozen under retention audit — access blocked 30 days', 'complication', `shir-luneth-fail-${G.dayCount}`);
      } else {
        G.flags.met_luneth_coilspire = true;
        G.investigationProgress++;
        G.lastResult = `Luneth cross-checks the delivery confirmation against the destination branch's receipt log. Three packages out, zero arrivals recorded. He turns the ledger toward you. "That's a clerical error or the branch isn't a branch." He says it evenly, but he writes both options down before he hands the log back.`;
        addJournal('Evidence delivery gap confirmed — receiving party unknown or unlisted', 'evidence', `shir-luneth-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Khalis Coilspire's Arcane Market Counter tracks all arcane material imports — suppression compound precursors have been flowing through Shirshal under false material classifications.",
    tags: ['NPC', 'Craft', 'Stage2', 'Meaningful'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'examining arcane material import classifications');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('spirit', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_khalis_coilspire = true;
        G.investigationProgress++;
        G.lastResult = `Khalis shows you the flag stack — months of inconsistency reports, each one cleared by the same Bureau override code. The material profiles read as resonance damping precursors; they're logged in the system as ceremonial incense components. "I know what incense weighs. I know what it smells like at the border of a ward boundary." He taps the override column. "That code clears every flag I file. I've never been able to trace it to a name or a position."`;
        addJournal('Arcane precursors misclassified as ceremonial — Bureau override clears all flags', 'evidence', `shir-khalis-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Khalis runs a finger down the tariff review authorization list without looking up. "You're not on the list." The log entry is already being written — date, description, access level noted — before you can add anything further. He is not hostile about it. The procedure was written by someone else and he follows it the way it was written, carefully and completely. The log has a memory even if he does not, and the entry will still be there the next time anyone from the Bureau looks at the counter records.`;
        addJournal('Unauthorized tariff review logged — credentials checked', 'complication', `shir-khalis-fail-${G.dayCount}`);
      } else {
        G.flags.met_khalis_coilspire = true;
        G.investigationProgress++;
        G.lastResult = `Khalis pulls the import volume figures without argument. The classification reads ceremonial; the volume is twelve times what ceremonial use across all registered institutions would account for. He's already done the math. "I flagged it. Multiple times." He closes the ledger. "Nothing happened to the flags. The imports continued."`;
        addJournal('Arcane import volumes 12x ceremonial threshold — flags ignored', 'evidence', `shir-khalis-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Mirae Coilspire's inn is adjacent to the Bureau — she has been watching investigator patterns for years and knows who doesn't belong on the active roster.",
    tags: ['NPC', 'Persuasion', 'Stage2', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'questioning Mirae Coilspire about Bureau personnel patterns');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_mirae_coilspire = true;
        G.investigationProgress++;
        G.lastResult = `Mirae sets down her cloth and names two visitors from memory — she has a good one, and she keeps it private for situations like this. Monthly for the past year, never on the roster board, always received promptly. "That one" — she describes the first — "has the look of someone whose job it is to appear unremarkable." The description matches the Oversight Collegium's known field coordination profile. The second matches the intermediary description from Vaelis Sunweave's account at Shelkopolis.`;
        addJournal('Shirshal inn: Bureau ghost-visitors match Collegium field agent + Shelkopolis intermediary', 'evidence', `shir-mirae-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.reverence = (G.worldClocks.reverence||0) - 1;
        G.lastResult = `Mirae sets a cup down without being asked. "Bureau guests are not a subject I discuss." She says it before you have finished the question — the refusal is well-worn, positioned early to keep things pleasant. "That policy is twenty-three years old and it is why this inn is still open." She is not cold about it. The conversation moves to road conditions north, and she means every word of it. No angle, no hesitation, no opening left ajar. The door has been closed and the handle has been turned.`;
        addJournal('Bureau inn confidentiality — policy refusal, no information', 'complication', `shir-mirae-fail-${G.dayCount}`);
      } else {
        G.flags.met_mirae_coilspire = true;
        G.investigationProgress++;
        G.lastResult = `Mirae won't give names — she doesn't have them — but she has the rest: height, build, the particular way each one carries themselves when they think they're not being watched. Third day of the ten-day cycle, always before noon, north road departure. "I notice patterns. It's the work." She refills your cup and doesn't comment further.`;
        addJournal('Bureau off-roster visitors on fixed 10-day cycle — north road departures', 'evidence', `shir-mirae-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Sivren Coilspire's Compliance Shrine records petitions — a cluster of compliance petitions from glyph-affected localities were dismissed simultaneously under a single ruling three months ago.",
    tags: ['NPC', 'Lore', 'Stage2', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'reviewing Compliance Shrine petition dismissal records');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_sivren_coilspire = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `Sivren opens the petition archive and finds the cluster without searching — she's already bookmarked it. Seven petitions: Shelkopolis, Panim Haven, Fairhaven. Dismissed simultaneously under a single Collegium override, no standard review period. She points to the dismissal date, then to the commissioning date Thalen Sunweave identified. The dismissal came first — two weeks before the compound was officially commissioned. "The petitions were closed before the thing they were petitioning about was authorized." The sequence the official record suggests doesn't match the order things actually happened.`;
        addJournal('Collegium override dismissed 7 glyph petitions before commission — inverts official timeline', 'evidence', `shir-sivren-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The petition archive is sealed — Collegium ruling, cited on the cover page. Sivren explains this before you can frame the request fully: accessing sealed petition records without Collegium authorization is a compliance violation. A formal notice goes out before the hour is up. Whatever standing you have in this jurisdiction now carries a notation.`;
        addJournal('Petition records sealed — compliance violation notice issued', 'complication', `shir-sivren-fail-${G.dayCount}`);
      } else {
        G.flags.met_sivren_coilspire = true;
        G.investigationProgress++;
        G.lastResult = `Sivren confirms the facts without elaborating on their implications. Seven petitions, one ruling, no standard review period. She pulls the ruling reference number and pauses on it. "This administrative category code — I've processed shrine records for six years. I've never seen this code applied to petitions." She writes it down and slides the paper across without further comment.`;
        addJournal('Mass petition dismissal via unusual Collegium category — no standard review', 'evidence', `shir-sivren-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Ravel Coilspire keeps two sets of interview transcripts — one filed, one hidden. The gap between them is where the real testimony went.",
    tags: ['stage2', 'shirshal'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var roll = rollD20('wits', G.skills.lore);
      if (roll.total >= 13) {
        G.flags.met_ravel_coilspire = true;
        G.investigationProgress = (G.investigationProgress || 0) + 1;
        addNarration('Hidden Record', 'Ravel retrieves the second set without preamble — a leather sleeve tucked inside the cover board of a ledger that officially holds supply requisitions. The transcripts are in his own hand, uncorrected, with margin notes in a different ink. Three witnesses named glyph surge origin points that never appeared in the filed versions. "I write what they say. What goes into the record is not always what I write." He doesn\'t look up from straightening the pages.');
        addJournal('Ravel Coilspire holds unsanctioned witness transcripts naming glyph surge origins not in official record', 'evidence');
        maybeStageAdvance();
      } else {
        addNarration('Closed Door', 'Ravel sets his pen down. "Testimony integrity is protected under Magi Magistratus charter." He recites it without affect, the way a person does when the rule is real and so is the thing it is protecting against. He opens the filed transcript to the first page and lays it on the counter with both hands flat. The conversation ends there.');
      }
    }
  },

  {
    label: "The Bureau's warding array has calibration stones mounted at every corridor junction — one stone is misaligned in a way no standard maintenance cycle would produce.",
    tags: ['stage2', 'shirshal'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var roll = rollD20('vigor', G.skills.survival);
      if (roll.total >= 13) {
        G.investigationProgress = (G.investigationProgress || 0) + 1;
        addNarration('Calibration Stone', 'The stone at the north corridor junction sits three finger-widths off its seat, rotated clockwise past its mount notch. The notch exists precisely to prevent this rotation. The ward it anchors covers the archive wing entrance — not suppressed, but redirected: pulses that should register on the Bureau\'s monitoring array are being shed sideways, absorbed into the wall cavity instead of logged. Someone repositioned this with the patience to understand what repositioning it would do.');
        addJournal('Bureau warding stone deliberately misaligned — archive wing monitoring pulses shed without logging', 'discovery');
        maybeStageAdvance();
      } else {
        addNarration('Routine Inspection', 'The maintenance notation on the stone reads current. The calibration marks are worn but present. Whatever the stones are doing, it reads as standard operation to anyone without a reason to look closer — and closer requires knowing what the mount notch is for in the first place.');
      }
    }
  },

  {
    label: "Eris Coilspire holds the labor foreman role and controls who enters restricted sections — the wrong question here ends up in a Magistratus incident log.",
    tags: ['stage2', 'shirshal'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var roll = rollD20('finesse', G.skills.stealth);
      if (roll.total >= 13) {
        G.flags.met_eris_coilspire = true;
        G.investigationProgress = (G.investigationProgress || 0) + 1;
        addNarration('Access Record', 'Eris runs the crew assignment board by habit, not by checking it — her eyes go to the board and come back before she answers. The restricted section crew rotation changed four months ago: two of the regular maintenance workers were replaced by names she doesn\'t recognize, assigned through a sub-contractor notation she\'s never seen used for interior work. "My workers sign in. Those two never did." She says it to herself as much as to you, like she\'s confirming something she didn\'t want confirmed.');
        addJournal('Restricted section workers replaced via unknown sub-contractor — never signed in through Eris Coilspire\'s crew log', 'intelligence');
        maybeStageAdvance();
      } else {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        addNarration('Documented', 'Eris lifts a form from the left side of her desk before you finish the question. "Unauthorized access queries go here." She fills in the time and a description with the speed of someone who fills this form often. The form has a routing stamp already inked — it goes to Magistratus duty log on the hour. The question is now part of the record whether or not you answer any more of them.');
      }
    }
  },

  {
    label: "A clerk in the Bureau corridor has mistaken me for a Magistratus runner.",
    tags: ['stage2', 'shirshal'],
    xpReward: 32,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      var roll = rollD20('finesse', G.skills.stealth);
      if (roll.total >= 13 || roll.isCrit) {
        G.investigationProgress = (G.investigationProgress || 0) + 1;
        addNarration('Mistaken for a Runner', 'The clerk — thin, ink smudge across her right cuff she has stopped trying to wipe off, tongue pressed into her cheek while she reads — pushes a sealed dispatch toward you without looking up. "For Magistratus review. Director\'s office, not Archive." The dispatch cover bears the override routing code Khalis flagged at the market counter. You carry it three paces before she notices the error and calls out — long enough to read the sender line and the route notation on the back. Same Collegium sub-registry Luneth mapped to the northern staging district. You hand it back. She does not meet your eyes when she takes it.');
        addJournal('Sealed dispatch cover confirms Collegium override code routes through northern staging sub-registry', 'evidence');
        maybeStageAdvance();
      } else {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 2;
        addNarration('Runner Verification', 'The clerk presses her tongue into her cheek and looks up properly this time — properly enough to see your face is not the face she expected. Her hand retracts the dispatch before you can read the cover and her other hand is already on the corridor duty bell. "Runner verification required. Name, origin, credentials." The Magistratus floor steward arrives within thirty seconds. Your presence in the Bureau corridor is now a matter of formal inquiry. You are not detained, but you are not free either.');
      }
    }
  },

  {
    label: "A rumor about the suppressed case is circulating in the Bureau break room.",
    tags: ['stage2', 'shirshal'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      var roll = rollD20('charm', G.skills.persuasion);
      if (roll.total >= 13 || roll.isCrit) {
        G.investigationProgress = (G.investigationProgress || 0) + 1;
        addNarration('Break Room Edge', 'The break room is narrow and over-lit, tea kettle on an iron ring, three investigators working through a tray of honey biscuits. The oldest of them — bald, habit of cracking the knuckle of his left forefinger once before he speaks — says the name "Tazren" through a mouthful of biscuit and stops himself. The other two go still. The rumor moving is this: Tazren\'s case is about to be reopened by someone, and whoever that someone is, they are not going to be allowed to reach the Director. The knuckle cracks again. "Ten days, tops." He sees you in the doorway and the conversation changes register without pausing.');
        addJournal('Bureau internal rumor: someone is moving to reopen Tazren case — interception expected within ten days', 'intelligence');
        maybeStageAdvance();
      } else {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
        addNarration('Break Room Silence', 'The three investigators at the tray watch you step into the doorway and the conversation they were having disappears so completely it might never have happened. The bald one cracks the knuckle of his left forefinger, once, and pours a cup of tea he was not drinking. The other two begin discussing the roster rotation for next week. The honey biscuits sit between them untouched. You have the break room\'s full attention and none of its information.');
      }
    }
  },

  {
    label: "The archive gate goes unattended for four minutes at shift change.",
    tags: ['stage2', 'shirshal'],
    xpReward: 32,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      var roll = rollD20('wits', G.skills.lore);
      if (roll.total >= 13 || roll.isCrit) {
        G.investigationProgress = (G.investigationProgress || 0) + 1;
        addNarration('Shift-Change Gap', 'The archive wing gate closes for four minutes at shift change — procedure, not security. The outgoing warden hands her ring of keys to the incoming warden, both of them counting the ring aloud by touch. During the count, the access hallway is unattended. The first three stack aisles are visible from the gate. The third aisle holds the sealed-petition section; the cover boards of the top row show a consistent red Collegium stamp — except for three that do not. Those three carry a small geometric mark Mariel drew at the Dome Rest Inn. The count ends. You step back before either warden looks up.');
        addJournal('Archive sealed-petition section: three files carry same geometric mark as Aurora Crown dome inn seal swap', 'evidence');
        maybeStageAdvance();
      } else {
        addNarration('Counted Keys', 'The shift change count runs short — the incoming warden is new and the count goes wrong twice, which means both wardens are looking up more often than usual. You stay at the gate rail, which is where visitors are expected to stay, and the third-aisle row is partly obscured by a stack ladder someone has left angled against the shelf. The count finishes. The gate reopens. What you can see from the rail is what a thousand visitors have seen from the rail.');
      }
    }
  },

  {
    label: "A courier out of the northern staging district carries a sealed packet addressed to the same unlisted sub-registry Luneth mapped.",
    tags: ['Stage2', 'NPC'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'intercepting northern courier packet');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('finesse', (G.skills.stealth||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.courier_intercept_done = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The courier stops at the staging post water trough to let the horse drink. The packet sits in an open saddlebag, flap unclipped from the road heat. The cover reads no recipient name — only the sub-registry notation and a date-of-action stamp that falls five days from now. Inside the outer wrapper: a transfer authorization bearing the same Collegium override code Khalis identified at the market counter, and a consignment list in handwriting you recognize from the margin notes in Ravel's hidden transcripts. The courier remounts. You have what you came for.`;
        addJournal('Northern courier packet: override code + Ravel handwriting on consignment list — action dated 5 days out', 'evidence', `shir-courier-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `The courier sees you before you see the bag. He is practiced about it — no alarm, no confrontation, just a hand on the saddlebag flap and a second look at your face that lasts long enough to mean something. He remounts without stopping at the trough and takes the north fork at a pace that is not urgent enough to be reported but is not the pace of someone who forgot something either. By the time you reach the fork, the road ahead is empty and your presence at the staging post is a memory in someone else's account.`;
        addJournal('Courier identified you at staging post — packet secured and routed north', 'complication', `shir-courier-fail-${G.dayCount}`);
      } else {
        G.flags.courier_intercept_done = true;
        G.investigationProgress++;
        G.lastResult = `You get two seconds at the saddlebag before the courier turns back from the trough. Enough: the outer wrapper's address notation matches the sub-registry exactly, and the date-of-action stamp is visible. Five days. You do not see the contents. The courier does not see you read it. Neither of you acknowledges the other when he passes on his way out.`;
        addJournal('Northern courier packet confirms sub-registry address — action stamp: 5 days', 'intelligence', `shir-courier-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "A woman from Panim Haven arrived at the Bureau three days ago with testimony. She has not been seen inside since the first morning.",
    tags: ['Stage2', 'NPC'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'locating Panim Haven witness');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.panim_witness_found = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `She is in the staging corridor of the transit hostel, still in road clothes, case beside her chair. Naret Osse, formerly a compliance archivist in Panim Haven — she says this quietly, the way people name things they no longer expect to mean anything. The Bureau intake officer told her the petition the glyph-affected ward sent was already adjudicated. She has the original petition in her bag. The adjudication date on the Bureau's copy predates the petition by eleven days. "Someone filed a resolution to something that hadn't been submitted yet." She already knew what this meant. She came anyway.`;
        addJournal('Panim witness Naret Osse: Bureau adjudication predates petition by 11 days — pre-emptive closure', 'evidence', `shir-naret-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.reverence = (G.worldClocks.reverence||0) - 1;
        G.lastResult = `The transit hostel clerk directs you to the corridor and the corridor is empty — not cleared, just empty. Her case is gone, the chair is back against the wall, and the clerk on the next shift doesn't have a record of her name. Either she left voluntarily or someone moved her between shift changes. The Bureau's intake log for the day shows one external visitor admitted to the petition counter. No name. No outcome noted.`;
        addJournal('Panim witness gone from transit hostel — Bureau log shows unnamed visitor, no outcome', 'complication', `shir-naret-fail-${G.dayCount}`);
      } else {
        G.flags.panim_witness_found = true;
        G.investigationProgress++;
        G.lastResult = `Naret Osse is in the hostel staging corridor, road-tired and waiting for a return transit that doesn't exist yet. She won't give the full account — not here, not out loud — but she confirms the petition her ward sent was adjudicated before they sent it. She knows because she filed it herself. "I have the copy. I kept a copy." She presses her bag closer to her side. That's all she'll say in the corridor.`;
        addJournal('Panim witness confirms petition adjudicated before submission — holds original copy', 'intelligence', `shir-naret-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The Collegium sub-registry code appears in the Bureau's own charter amendments — someone embedded the routing authority years before it was used.",
    tags: ['Stage2', 'NPC'],
    xpReward: 74,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'tracing Collegium sub-registry in Bureau charter amendments');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.charter_amendment_traced = true;
        G.investigationProgress++;
        G.lastResult = `The charter amendment is in the Bureau's own public register — administrative language, the kind that passes without comment in annual filings. Section 14(c), amendment cycle seven years back: authority to route compliance-flagged cases to sub-registry for "expedited specialized review." The sub-registry address is specified verbatim. The amendment was filed under a Collegium administrative authority notation that predates the Bureau's current director by two administrations. Someone built the mechanism into the charter before they needed to use it. The suppression protocol is not improvised — it has a legal foundation no one has touched since the amendment was approved.`;
        addJournal('Bureau charter amendment: sub-registry routing authority embedded 7 years ago under prior administration', 'evidence', `shir-charter-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The charter amendment index requires staff-assisted access for records older than five years — procedure, not a block, except the staff assistant who handles the request notes the specific amendment cycle you named and excuses himself before pulling anything. He returns with a supervisor. The supervisor is polite and asks for credentials with the particular patience of someone who was briefed before arriving. The charter amendment is available upon formal request, which requires two business days and an originating authority signature. You will not be here in two business days.`;
        addJournal('Charter amendment access flagged — supervisor briefed, formal request required', 'complication', `shir-charter-fail-${G.dayCount}`);
      } else {
        G.flags.charter_amendment_traced = true;
        G.investigationProgress++;
        G.lastResult = `Section 14(c) is in the register: sub-registry routing authority for expedited specialized review, filed seven years ago. The amendment is clean, formally ratified, no procedural anomalies visible on its face. What it means is that the override code Khalis identified has a legal home — the routing is authorized, not improvised. The authorization predates the current director. Whoever wrote the amendment knew what they were writing it for.`;
        addJournal('Charter amendment confirms sub-registry routing is legally authorized — written before current administration', 'evidence', `shir-charter-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Two of Tazren's supervisors are in the building today. One of them signed the original case closure order.",
    tags: ['Stage2', 'NPC'],
    xpReward: 78,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(78, 'confronting Bureau supervisors who closed Tazren case');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.supervisors_confronted = true;
        G.investigationProgress++;
        G.lastResult = `The one who signed the closure order — Vel Orath, name printed on the office placard — does not reach for anything when you set the charter amendment on his desk. He reads it without picking it up. Thirty seconds. "What you have there is a legal instrument." He says it like a man confirming the weather. Then: "The sub-registry is under Collegium authority. I cannot discuss it." He doesn't deny the case was closed on instruction. He doesn't confirm it either. He folds his hands and the interview ends. His second — younger, still learning the procedure — has left the room before he folded his hands.`;
        addJournal('Supervisor Vel Orath confirms sub-registry is Collegium authority — did not deny closure on instruction', 'evidence', `shir-supervisors-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `Vel Orath has you escorted out of the building by a duty officer before you finish the first question. The duty officer is professional about it — walking pace, no contact, door held open. Outside, the officer notes your name on a clipboard entry and asks you to confirm your current address. The question is not hostile. The entry is already written before you answer it. The Bureau now has a formal record of your attempt to access a supervisor regarding a closed case, and the supervisors know you have the charter amendment.`;
        addJournal('Escorted from Bureau — formal record made of supervisor contact attempt', 'complication', `shir-supervisors-fail-${G.dayCount}`);
      } else {
        G.flags.supervisors_confronted = true;
        G.investigationProgress++;
        G.lastResult = `Vel Orath grants you five minutes with the door open. He listens to the charter amendment angle without responding to it and says the case was closed under standard administrative review authority. "That is the record." The second supervisor has developed an urgent errand elsewhere in the building. Orath fills the remaining four minutes by describing the case closure procedure in procedural detail you cannot interrupt. When time is up, he stands. The door was already open.`;
        addJournal('Supervisor Vel Orath: case closed under standard administrative review — gave no ground, timeline confirmed', 'intelligence', `shir-supervisors-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The transit post office keeps a field rotation log the Collegium never asked them to stop keeping.",
    tags: ['Stage2', 'NPC'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'tracing Collegium field rotation log at transit post');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.transit_rotation_log_found = true;
        G.investigationProgress++;
        G.lastResult = `The post office field rotation log is a hand-kept ledger the clerk maintains out of professional habit — never mandated, never collected. Seventeen months of courier registration entries, including six that carry a Collegium field coordination stamp matching the Oversight profile Mirae described. The registration dates correspond exactly to the three months preceding each of the seven petition dismissals Sivren found. The Collegium field agent arrived, the petitions closed, and the agent departed — every time. The clerk has never been asked about it. He does not understand what he has been recording.`;
        addJournal('Transit post rotation log: Collegium field agent arrivals precede every petition dismissal — 7 for 7', 'evidence', `shir-transit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The clerk pulls the rotation log and starts paging backward to help with the date range. Halfway through, a Bureau compliance officer stops to collect the day's outbound mail and lingers — the log is visible on the counter, the date range visible, your interest visible. The clerk slides the log off the counter before anything is said. His expression when he looks at you is the expression of someone who has made a calculation and reached a result he doesn't like. He's still holding the log when you leave.`;
        addJournal('Transit post rotation log — third-party observation interrupted access', 'complication', `shir-transit-fail-${G.dayCount}`);
      } else {
        G.flags.transit_rotation_log_found = true;
        G.investigationProgress++;
        G.lastResult = `The clerk finds the Collegium field coordination stamps in his log without difficulty — he notices patterns, he says, it is the work. Six entries over seventeen months. He cannot say what those couriers were doing in Shirshal, only that they registered at the post and departed north, same as the visitors Mirae described. He writes the entry dates on a slip of paper before you ask him to.`;
        addJournal('Transit post log: 6 Collegium field coordination entries over 17 months — north departure pattern confirmed', 'intelligence', `shir-transit-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "A retired Bureau archivist lives near the compliance shrine. She left under circumstances the official record does not describe.",
    tags: ['Stage2', 'NPC'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'speaking with retired Bureau archivist');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.retired_archivist_spoken = true;
        G.investigationProgress++;
        G.lastResult = `Her name is Orel Vasht. She pours tea before she speaks and lets the silence run long enough to mean something. Then: "The sub-registry notation was written into the charter amendment before I left. I recognized the format. I wrote a memo." She sets her cup down. The memo went to her division head and was returned to her three days later marked as outside her remit. Her retirement followed six weeks after. "I kept a copy of the memo. I was not certain it would matter. I am more certain now." She crosses the room to a locked drawer without being asked.`;
        addJournal('Retired archivist Orel Vasht: wrote memo on sub-registry format before charter amendment passed — kept copy', 'evidence', `shir-orel-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.reverence = (G.worldClocks.reverence||0) - 1;
        G.lastResult = `Orel Vasht answers the door and reads the situation in the first five seconds — the question before the question, the approach that belongs to a particular kind of visitor. She says she left the Bureau for personal reasons and the record reflects that, and then she closes the door with the precise quietness of someone who has been practicing that answer for a long time. The tea on the shelf behind her is still steeping. She was not expecting to be home.`;
        addJournal('Retired archivist Orel Vasht — refused to speak, door closed', 'complication', `shir-orel-fail-${G.dayCount}`);
      } else {
        G.flags.retired_archivist_spoken = true;
        G.investigationProgress++;
        G.lastResult = `Orel Vasht acknowledges the sub-registry notation when you name it — a small acknowledgment, a stillness in her hands over her cup. She says only that the notation format is not standard Bureau administrative language. "It belongs to a different drafting tradition." She will not say more than that, not today, not without more time to think it over. But she does not deny knowing what it means.`;
        addJournal('Retired archivist confirms sub-registry notation is non-standard Bureau language — different drafting tradition', 'intelligence', `shir-orel-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The north road at the hour Mirae named. Someone on the ten-day cycle leaves from here.",
    tags: ['Stage2', 'NPC'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'surveillance on north road departure — ten-day cycle contact');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('finesse', (G.skills.stealth||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.north_road_departure_witnessed = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The departure happens at the hour Mirae described — third day of the ten-day cycle, before noon, north road. Two figures, not one. The second carries a sealed document tube marked with the sub-registry notation — visible only for the three seconds it takes him to slide it into a saddlebag and close the flap. They do not speak at the fork. The route they take north does not go to the Bureau's nearest provincial branch. It goes to the area the transit post rotation log places the northern staging district. The pattern is not incidental. This is a courier run with institutional cover.`;
        addJournal('North road departure: two figures, sub-registry document tube, route confirms northern staging district', 'evidence', `shir-northwatch-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `The figure at the fork turns before you expect. The look is brief and professional — the assessment of someone trained to notice surveillance and trained not to react to it visibly. He continues north without changing pace. When you return to the road twenty minutes later, a Bureau duty officer is asking the stable keeper at the north gate if anyone unusual had been waiting near the road at the hour of the departure. Your description is close enough.`;
        addJournal('Surveillance burned — Bureau duty officer canvassing north gate stable', 'complication', `shir-northwatch-fail-${G.dayCount}`);
      } else {
        G.flags.north_road_departure_witnessed = true;
        G.investigationProgress++;
        G.lastResult = `One figure, north road, the hour Mirae gave. He carries a satchel and does not linger at the fork. You cannot read the markings on the satchel from the distance that keeps you out of sight. What you confirm: the timing, the route, the practiced indifference of someone who makes this trip regularly and has no reason to expect it matters. Mirae's description was precise.`;
        addJournal('North road departure confirmed — timing and route match Mirae description, satchel markings unread', 'intelligence', `shir-northwatch-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The residue on the calibration stone is a compound, not a natural sediment. It has a specific formulation.",
    tags: ['Stage2', 'NPC'],
    xpReward: 66,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'analyzing residue on misaligned warding stone');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('spirit', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.ward_stone_residue_analyzed = true;
        G.investigationProgress++;
        G.lastResult = `The residue samples from the stone's repositioned edge are crystalline, not particulate — applied deliberately, not accumulated. The compound profile matches the resonance-damping precursor Khalis identified at the Arcane Market Counter: the same material classified as ceremonial incense, the same mass that exceeded ceremonial thresholds by a factor of twelve. Someone used the precursor to lubricate the ward stone's rotation, leaving the residue as a byproduct. The same supply chain that runs through the market counter runs through this corridor wall.`;
        addJournal('Ward stone residue matches Khalis market counter precursor — same supply chain, physical application confirmed', 'evidence', `shir-residue-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The maintenance notation on the stone is current, and a Bureau warden rounds the corridor before the sample can be collected cleanly. The warden examines your position near the stone with the particular attention of someone who was briefed to watch for unauthorized contact with calibration equipment. A formal notation goes in the inspection log. The residue remains unsampled and your access to the corridor is now subject to a prior-notice requirement.`;
        addJournal('Ward stone sample collection blocked — corridor access now restricted', 'complication', `shir-residue-fail-${G.dayCount}`);
      } else {
        G.flags.ward_stone_residue_analyzed = true;
        G.investigationProgress++;
        G.lastResult = `The compound on the stone's edge is not maintenance oil and not natural accumulation. The crystal structure is consistent with a processed arcane precursor — the kind that requires a refining step before use. Without the reference samples from Khalis's flagged imports, an exact match is out of reach. But the formulation points toward the same general category. The stone was moved with chemical assistance, by someone who understood what that assistance would do to the warding pulse.`;
        addJournal('Ward stone residue: processed arcane precursor, consistent with suppression compound category', 'intelligence', `shir-residue-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The glyph surge incident reports and the petition dismissal dates do not line up the way the official account requires.",
    tags: ['Stage2', 'NPC'],
    xpReward: 74,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'cross-referencing glyph surge incident dates against petition dismissals');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.surge_petition_timeline_cross_checked = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Incident report dates from three localities, petition filing dates from Sivren's archive, dismissal dates from the Collegium override. Laid side by side: the glyph surge incidents preceded the petitions, and the petitions were dismissed before the affected wards had submitted secondary evidence packages. The official account holds that petitions were assessed and found without merit. The dates show the merits were never examined — dismissal happened before the evidence cycle completed. Every locality affected by the surge was closed out on the same schedule, regardless of what their evidence showed.`;
        addJournal('Surge incident → petition → dismissal timeline: dismissals precede full evidence submission in every case', 'evidence', `shir-timeline-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The incident reports sit in the Bureau's public records section, but the retrieval procedure requires a staff-facilitated pull for anything older than two months. The staff archivist pulls your request card and pauses before setting it in the queue — a pause of the sort that precedes a supervisor consultation. The queue position you are given is for end of day. When end of day arrives, the request has been reclassified as requiring credentials review. The incident reports will not be accessible today.`;
        addJournal('Incident report access reclassified — credentials review required, day lost', 'complication', `shir-timeline-fail-${G.dayCount}`);
      } else {
        G.flags.surge_petition_timeline_cross_checked = true;
        G.investigationProgress++;
        G.lastResult = `The pattern across the three localities holds: surge incident, petition filed, dismissal within thirty days, secondary evidence never entered. The individual cases each look like expedient administration. Laid together, the thirty-day window is consistent to within forty-eight hours across all seven cases. Forty-eight hours of variation across seven separate jurisdictions and seven separate petition processes suggests the dismissal schedule was coordinated, not incidental.`;
        addJournal('Petition dismissals across 7 localities — consistent 30-day window suggests coordinated schedule', 'intelligence', `shir-timeline-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The Verdant Row network knows which localities received the suppressed materials. They track what the Bureau does not.",
    tags: ['Stage2', 'NPC'],
    xpReward: 76,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(76, 'contacting Verdant Row network on material distribution');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.verdant_row_map_obtained = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The Verdant Row coordinator — she gives no name, sits across the table with her hands flat and her posture unhurried — spreads a hand-drawn distribution map across the table without preamble. Eleven localities. The suppression compound moved through four staging points, routed to correspond with each of the seven glyph surge events and four additional locations that had no recorded surge. The four extras are localities with active compliance reform petitions. The compounds were placed as a precaution in localities that were planning to file, not only in localities that already had. The operation was running ahead of the petitions.`;
        addJournal('Verdant Row map: suppression compound distributed to 11 localities — 4 pre-emptive placements in petition-pending areas', 'evidence', `shir-verdant-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.reverence = (G.worldClocks.reverence||0) - 1;
        G.lastResult = `The Verdant Row contact point is a message drop, not a person — a chalk mark on a specific post that indicates a willingness to meet. The mark is gone when you reach it: wiped, not expired. Either the timing was wrong or the network saw the Bureau duty officer who logged your corridor visit and decided not to surface. The distribution map exists. You have no path to it today.`;
        addJournal('Verdant Row contact point pulled — network standing down after Bureau logging', 'complication', `shir-verdant-fail-${G.dayCount}`);
      } else {
        G.flags.verdant_row_map_obtained = true;
        G.investigationProgress++;
        G.lastResult = `The coordinator sketches the broad distribution shape without names or coordinates — seven localities, four staging points, a rough directional flow from the northern district south. She will not commit the specifics to paper in this meeting. What she confirms: the distribution was active during the same window as the petition dismissals, and at least one of the staging points is a locality that never filed a petition. "It wasn't reacting. It was positioned."`;
        addJournal('Verdant Row: distribution active during petition dismissal window — at least one staging point pre-petition', 'intelligence', `shir-verdant-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The override code Khalis flagged appears in a second Bureau branch's intake log from three months before it appeared in Shirshal.",
    tags: ['Stage2', 'NPC'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'tracing override code appearance in a second Bureau branch');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('finesse', (G.skills.stealth||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.override_code_second_branch_traced = true;
        G.investigationProgress++;
        G.lastResult = `The second branch's intake log is kept at the transit registry — a public-facing record, accessible without staff facilitation. Three months before the Shirshal entries Khalis identified, the same override code appears clearing a materials flag in a Panim Haven branch intake record. A different branch, different material category, same code. The code clears the Panim flag without any named authorization source: just the code, a timestamp, and a cleared status. The override mechanism was tested before Shirshal. Shirshal was not the first locality.`;
        addJournal('Override code appears in Panim Haven branch 3 months earlier — Shirshal was not the first deployment', 'evidence', `shir-override2-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The transit registry clerk cross-checks the code format against the branch's filing index before pulling records — standard practice. The format triggers a Collegium administrative hold query, which requires confirmation from the originating authority. The originating authority is the sub-registry. The sub-registry does not respond to public inquiries. The transit registry clerk closes the index with genuine regret. The hold is automatic; he had no choice about it.`;
        addJournal('Override code format triggered Collegium hold — registry access blocked', 'complication', `shir-override2-fail-${G.dayCount}`);
      } else {
        G.flags.override_code_second_branch_traced = true;
        G.investigationProgress++;
        G.lastResult = `The Panim Haven transit intake record shows the override code applied to a materials flag nine months ago. The log entry is standard — no unusual notation, no secondary authorization. The code clears the flag the same way it clears Shirshal flags: without a traceable source. The Panim entry predates Tazren's first suppressed flag by three months. The code was already in use before Tazren began logging inconsistencies.`;
        addJournal('Panim Haven intake: same override code 9 months ago — predates Tazren first flag by 3 months', 'intelligence', `shir-override2-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Ravel Coilspire's hidden transcripts name three glyph surge witnesses. One of those witnesses is still in Shirshal.",
    tags: ['Stage2', 'NPC'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'locating glyph surge witness named in Ravel hidden transcripts');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('vigor', (G.skills.survival||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.surge_witness_found = true;
        G.investigationProgress++;
        G.lastResult = `His name is Davan Mirest. He works the loading dock at the transit grain store and has a habit of arriving early enough to watch the road in both directions before anyone else is on it. When you name Ravel Coilspire, he does not deny knowing the name. He describes the surge event in the west ward without being asked: a sustained resonance failure lasting two nights, the lights in the lower registry going out in sequence, the particular smell of a ward burning out rather than fading. "It wasn't a malfunction. The ward was killed from outside its own boundary." He says it like someone reciting a thing he decided to say a long time ago, waiting for the right question.`;
        addJournal('Surge witness Davan Mirest: west ward resonance killed from outside boundary — named in Ravel transcripts, still in Shirshal', 'evidence', `shir-witness-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The loading dock foreman watches you ask after the name for long enough to decide you are not routine. By the time you find the worker's shift schedule, he has been moved to a double shift at the north storage facility — a reassignment that happened within the hour. The foreman doesn't know why. He fills out the reassignment form while you are still standing there, which means the form will have today's date and yours as a contextual notation. The worker is no longer findable without making the search more visible than it has already become.`;
        addJournal('Surge witness relocated mid-day — timing tied to inquiry, access lost', 'complication', `shir-witness-fail-${G.dayCount}`);
      } else {
        G.flags.surge_witness_found = true;
        G.investigationProgress++;
        G.lastResult = `Davan Mirest confirms he spoke to Ravel — he doesn't deny it and doesn't elaborate. He will say the surge event in the west ward was not consistent with equipment failure. "Equipment failures are ragged. This was clean." He does not want to say more in the loading dock. He names a time and a location — the public garden bench near the compliance shrine, evening bell — and goes back to work before the conversation can be observed as unusual.`;
        addJournal('Surge witness Davan Mirest: west ward surge "clean, not ragged" — meeting arranged for evening', 'intelligence', `shir-witness-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Stage 2 Shirshal finale — Tazren's suppressed case file and the compliance record inversion confirm coordinated evidence management. Present to the Bureau director or route around it.",
    tags: ['Investigation', 'Finale', 'Stage2', 'Consequence', 'Meaningful'],
    xpReward: 110,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(110, 'Shirshal Stage 2 resolution');
      if (!G.investigationProgress || G.investigationProgress < 8) {
        G.lastResult = `The threads are there but the evidence chain has gaps. Acting now would produce a record, not a result. The Bureau director would ask questions you don't yet have answers for, and the gaps would be used to file the matter rather than pursue it.`;
        G.recentOutcomeType = 'investigate'; return;
      }
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/2));
      if (result.total >= 14 || result.isCrit) {
        G.flags.stage2_finale_institutional = true;
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 3;
        G.lastResult = `You go directly to the Director's office with the full chain laid out in sequence: Tazren's suppressed file, Luneth's delivery gap, Khalis's override-cleared flags, Sivren's inverted timeline, Mirae's off-roster visitor schedule. The Director reads for eleven minutes without speaking. Then: "Priority review. Tazren's case is reinstated as of this morning." The suppression operation now has a formal Bureau record. What comes next begins with institutional backing behind it.`;
        addJournal('Shirshal S2 finale: Bureau Director reinstates suppressed case', 'evidence', `shir-finale-inst-${G.dayCount}`);
      } else {
        G.flags.stage2_finale_underworld = true;
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 3;
        G.lastResult = `The Director meeting doesn't happen — the supervisors who buried Tazren's case are between you and the Director's door. Instead you copy the file tonight and hand the copies to the Verdant Row network before dawn. The compliance record inversion goes with it, addressed to every node in the distribution chain. By midday, the suppression operation no longer has cover. The pressure will increase. The operation is now exposed and moving.`;
        addJournal('Shirshal S2 finale: case file distributed through Verdant Row', 'evidence', `shir-finale-uw-${G.dayCount}`);
      }
      G.flags.stage2_faction_contact_made = true;
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

];

window.SHIRSHAL_STAGE2_ENRICHED_CHOICES = SHIRSHAL_STAGE2_ENRICHED_CHOICES;
