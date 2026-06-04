/**
 * SHIRSHAL STAGE 2 ENRICHED CHOICES
 * Investigation arc: compliance investigation bureau / cross-locality evidence suppression
 * NPCs: Tazren Coilspire (Senior Investigator), Mirae Coilspire (Innkeeper),
 *       Khalis Coilspire (Market Clerk), Sivren Coilspire (Shrine Attendant), Luneth Coilspire (Porter)
 */

var SHIRSHAL_STAGE2_ENRICHED_CHOICES = [

  {
    label: 'Accord clause 14-C expired eighteen months ago. No one renewed it.',
    tags: ['Investigation', 'Stage2'],
    plot: 'main',
    skill: 'wits',
    stageProgress: 1,
    xpReward: 40,
    failResult: 'The accord registry requires a Collegium certification to access expired clause records.',
    fn: function() {
      advanceTime(1);
      if (!G.stageProgress) G.stageProgress = {1:0,2:0,3:0,4:0,5:0};
      var result = rollD20('wits');
      if (result.isCrit || result.total >= 12) {
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        if (typeof maybeStageAdvance === 'function') maybeStageAdvance();
        G.recentOutcomeType = 'discover';
        G.lastResult = 'Accord clause 14-C governed the secondary transit rights through Shirshal\'s northern corridor. It expired eighteen months ago. The renewal process requires a cosignatory from the originating polity — a cosignatory no longer in their position. You trace the vacancy: three months after the expiration, a shipment began routing through the corridor without the required documentation. No one filed a complaint. The registry clerk who would have caught it transferred to a different office two weeks before the shipment started.';
        addJournal('Accord clause 14-C expired eighteen months ago. Northern corridor used without documentation since. The clerk who would have flagged it transferred just before shipments began.', 'evidence', 'shirshal-accord-14c-' + (G.dayCount||0));
        if (typeof gainXp === 'function') gainXp(40);
      } else {
        G.recentOutcomeType = 'fail';
        G.lastResult = 'The accord registry index lists clause 14-C as expired, but the supporting documentation sits in a Collegium-certified archive partition. Access requires a certification you do not currently hold. The registry clerk produces the certification request form without being asked. The form has a twelve-week processing window printed at the bottom. Someone has added a handwritten note: "Expedited review available — see Annex C." Annex C is not attached.';
        if (typeof maybeStageAdvance === 'function') maybeStageAdvance();
        if (typeof gainXp === 'function') gainXp(15);
      }
    }
  },

  {
    label: "Tazren's case file touches every thread I've followed. He's been at this longer.",
    tags: ['Investigation', 'Stage2', 'Meaningful'],
    xpReward: 84,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(84, 'cross-referencing with Bureau investigator Tazren Coilspire');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.charm||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_tazren_coilspire = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `Tazren pulls the copy from a locked drawer, not the filing cabinet. Eight months of work: the sealed charter pattern, the Fairhaven staging point, the glyph surge correlation — all named, all dated. He was pulled from the case six months ago and told the file was archived. "Archived means it stops. I wasn't finished." He slides the copy across the desk without ceremony. The pages are organized. He was waiting for someone to ask.`;
        addJournal('Tazren — 8-month parallel case file shared, case was suppressed before he finished', 'evidence', `shir-tazren-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `Tazren listens to your first two sentences and reaches for his visitor log without looking up. "Knowing the specifics of a Bureau case thread without credentials is a concern I'm required to document." He copies your name in a neat hand and asks for origin papers with the flat efficiency of someone who has run this procedure before and does not enjoy it. A summary of the visit is on its way to his supervisory chain before the conversation has properly ended. Whatever goodwill this interview might have built has been spent on a protocol note.`;
        addJournal('Bureau visit logged — origin documentation requested', 'complication', `shir-tazren-fail-${G.dayCount}`);
      } else {
        G.flags.met_tazren_coilspire = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Tazren confirms the case and stops there. "I can't share an archived file without a reinstatement order." He pauses. "The charter pattern you described is in it. I'll confirm that much." He straightens the papers on his desk — the dry air of the records hall keeps them flat, no warping, the ink precise after eight months. "An archived case doesn't mean the subject stopped moving. It means the oversight stopped."`;
        addJournal('Bureau archived case confirmed — moved off-record while subject was still active', 'evidence', `shir-tazren-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Three glyph case evidence packages marked delivered. None logged at destination.",
    tags: ['NPC', 'Stealth', 'Stage2', 'Meaningful'],
    xpReward: 76,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(76, 'tracing missing evidence transfers with Luneth Coilspire');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('finesse', (G.skills.finesse||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_luneth_coilspire = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Luneth traces the three packages through his transfer log with practiced speed. All marked "received — archive." The receiving address is a sub-registry notation that doesn't appear in the Bureau's official branch directory — he's checked twice. He maps the address against a regional index and holds the result up without speaking. The notation places it in the same northern staging district that came up in the Fairhaven thread.`;
        addJournal('Evidence transfers to unlisted sub-registry — maps to northern staging district', 'evidence', `shir-luneth-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Luneth pulls the request form and stops. The transfer records are under retention audit this week — standard cycle, nothing unusual on paper. Except your request triggers a hold on the specific packages in question, freezing access for thirty days. Luneth looks at the hold notice with the particular expression of someone who has just understood something they didn't want to. The audit timing selected for these packages. The destination registry for the physical transfers is a separate filing system — the hold doesn't reach it.`;
        addJournal('Evidence records frozen under retention audit — access blocked 30 days', 'complication', `shir-luneth-fail-${G.dayCount}`);
      } else {
        G.flags.met_luneth_coilspire = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Luneth cross-checks the delivery confirmation against the destination branch's receipt log. The ledger is tanned leather, the pages dry and flat — Shirshal's archive air preserves everything. Three packages out, zero arrivals recorded. He turns the ledger toward you. "That's a clerical error or the branch isn't a branch." He says it evenly, but he writes both options down in his transfer log before he hands it back.`;
        addJournal('Evidence delivery gap confirmed — receiving party unknown or unlisted', 'evidence', `shir-luneth-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Suppression compound precursors flowing through Shirshal under false material classifications.",
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
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Khalis shows you the flag stack — months of inconsistency reports, each one cleared by the same Bureau override code. The material profiles read as resonance damping precursors; they're logged in the system as ceremonial incense components. "I know what incense weighs. I know what it smells like at the border of a ward boundary." He taps the override column. "That code clears every flag I file. I've never been able to trace it to a name or a position."`;
        addJournal('Arcane precursors misclassified as ceremonial — Bureau override clears all flags', 'evidence', `shir-khalis-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Khalis runs a finger down the tariff review authorization list without looking up. "You're not on the list." The log entry is already being written — date, description, access level noted — before you can add anything further. He is not hostile about it. The procedure was written by someone else and he follows it the way it was written, carefully and completely. The log has a memory even if he does not, and the entry will still be there the next time anyone from the Bureau looks at the counter records.`;
        addJournal('Unauthorized tariff review logged — credentials checked', 'complication', `shir-khalis-fail-${G.dayCount}`);
      } else {
        G.flags.met_khalis_coilspire = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Khalis pulls the import volume figures without argument. The classification reads ceremonial; the volume is twelve times what ceremonial use across all registered institutions would account for. He's already done the math — the market counter smells of tanned hide and the wind off the steppe carries dust across the entry ledger as he closes it. "I flagged it. Multiple times." He looks up. "Nothing happened to the flags. The imports continued."`;
        addJournal('Arcane import volumes 12x ceremonial threshold — flags ignored', 'evidence', `shir-khalis-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "She's watched Bureau patterns for years. She knows who doesn't belong on the roster.",
    tags: ['NPC', 'Persuasion', 'Stage2', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'questioning Mirae Coilspire about Bureau personnel patterns');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.charm||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_mirae_coilspire = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Mirae sets down her cloth and names two visitors from memory — she has a good one, and she keeps it private for situations like this. Monthly for the past year, never on the roster board, always received promptly. "That one" — she describes the first — "has the look of someone whose job it is to appear unremarkable." The description matches the Oversight Collegium's known field coordination profile. The second matches the intermediary description from Vaelis Sunweave's account at Shelkopolis.`;
        addJournal('Shirshal inn: Bureau ghost-visitors match Collegium field agent + Shelkopolis intermediary', 'evidence', `shir-mirae-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.reverence = (G.worldClocks.reverence||0) - 1;
        G.lastResult = `Mirae sets a cup down without being asked. "Bureau guests are not a subject I discuss." She says it before you have finished the question — the refusal is well-worn, positioned early to keep things pleasant. "That policy is twenty-three years old and it is why this inn is still open." She is not cold about it. The conversation moves to road conditions north, and she means every word of it. No angle, no hesitation, no opening left ajar. The door has been closed and the handle has been turned.`;
        addJournal('Bureau inn confidentiality — policy refusal, no information', 'complication', `shir-mirae-fail-${G.dayCount}`);
      } else {
        G.flags.met_mirae_coilspire = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Mirae won't give names — she doesn't have them — but she has the rest: height, build, the particular way each one carries themselves when they think they're not being watched. Third day of the ten-day cycle, always before noon, north road departure. The inn is quiet in the morning heat, the desert air holding the smell of old wood and cold tea. "I notice patterns. It's the work." She refills your cup and doesn't comment further.`;
        addJournal('Bureau off-roster visitors on fixed 10-day cycle — north road departures', 'evidence', `shir-mirae-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "A cluster of glyph-locality petitions dismissed simultaneously under a single ruling. Three months ago.",
    tags: ['NPC', 'Lore', 'Stage2', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'reviewing Compliance Shrine petition dismissal records');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_sivren_coilspire = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `Sivren opens the petition archive and finds the cluster without searching — she's already bookmarked it. Seven petitions: Shelkopolis, Panim Haven, Fairhaven. Dismissed simultaneously under a single Collegium override, no standard review period. She points to the dismissal date, then to the commissioning date Thalen Sunweave identified. The dismissal came first — two weeks before the compound was officially commissioned. "The petitions were closed before the thing they were petitioning about was authorized." The sequence the official record suggests doesn't match the order things actually happened.`;
        addJournal('Collegium override dismissed 7 glyph petitions before commission — inverts official timeline', 'evidence', `shir-sivren-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The petition archive is sealed — Collegium ruling, cited on the cover page. Sivren explains this before you can frame the request fully: accessing sealed petition records without Collegium authorization is a compliance violation. The shrine hall is quiet, the dry desert air keeping the stacked record boards straight and still. A formal notice goes out before the hour is up. Whatever standing you have in this jurisdiction now carries a notation, and it will remain in the compliance log long after you leave Shirshal.`;
        addJournal('Petition records sealed — compliance violation notice issued', 'complication', `shir-sivren-fail-${G.dayCount}`);
      } else {
        G.flags.met_sivren_coilspire = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Sivren confirms the facts without elaborating on their implications. Seven petitions, one ruling, no standard review period. She pulls the ruling reference number and pauses on it — her hand resting flat on the record board, the old ink of the compliance shrine's ledgers carrying the particular dry smell of Shirshal's desert air baked into every page. "This administrative category code — I've processed shrine records for six years. I've never seen this code applied to petitions." She writes it down and slides the paper across without further comment.`;
        addJournal('Mass petition dismissal via unusual Collegium category — no standard review', 'evidence', `shir-sivren-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Two sets of transcripts. One filed, one hidden. The gap is where real testimony went.",
    tags: ['stage2', 'shirshal'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var roll = rollD20('wits', G.skills.wits);
      if (roll.total >= 13) {
        G.flags.met_ravel_coilspire = true;
        G.investigationProgress = (G.investigationProgress || 0) + 1;
        addNarration('Hidden Record', 'Ravel retrieves the second set without preamble — a leather sleeve tucked inside the cover board of a ledger catalogued as supply requisitions. The transcripts are in his own hand, uncorrected, with margin notes in a different ink. Three witnesses named glyph surge origin points that never appeared in the filed versions. "I write what they say. What goes into the record is not always what I write." He doesn\'t look up from straightening the pages.');
        addJournal('Ravel Coilspire holds unsanctioned witness transcripts naming glyph surge origins not in the filed record', 'evidence');
        maybeStageAdvance();
      } else {
        addNarration('Closed Door', 'Ravel sets his pen down. "Testimony integrity is protected under Magi Magistratus charter." He recites it without affect, the way a person does when the rule is real and so is the thing it is protecting against. He opens the filed transcript to the first page and lays it on the counter with both hands flat. The conversation ends there.');
      }
    }
  },

  {
    label: "One calibration stone misaligned in a way no standard maintenance cycle would produce.",
    tags: ['stage2', 'shirshal'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var roll = rollD20('vigor', G.skills.vigor);
      if (roll.total >= 13) {
        G.investigationProgress = (G.investigationProgress || 0) + 1;
        addNarration('Calibration Stone', 'The stone at the north corridor junction sits three finger-widths off its seat, rotated clockwise past its mount notch. The notch exists precisely to prevent this rotation. The ward it anchors covers the archive wing entrance — not suppressed, but redirected: pulses that should register on the Bureau\'s monitoring array are being shed sideways, absorbed into the wall cavity instead of logged. Someone repositioned this with the patience to understand what repositioning it would do.');
        addJournal('Bureau warding stone deliberately misaligned — archive wing monitoring pulses shed without logging', 'discovery');
        maybeStageAdvance();
      } else {
        addNarration('Routine Inspection', 'The maintenance notation on the stone reads current. The calibration marks are worn but present. The corridor is quiet, the stone holding the dry warmth of the desert air that settles into Shirshal\u2019s administrative wing by midmorning, the smell of rock dust faint along the baseboard. Whatever the stones are doing, it reads as standard operation to anyone without a reason to look closer \u2014 and closer requires knowing what the mount notch is for in the first place.');
      }
    }
  },

  {
    label: "Eris controls restricted sections. The wrong question ends up in a Magistratus incident log.",
    tags: ['stage2', 'shirshal'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var roll = rollD20('finesse', G.skills.finesse);
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
      var roll = rollD20('finesse', G.skills.finesse);
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
      var roll = rollD20('charm', G.skills.charm);
      if (roll.total >= 13 || roll.isCrit) {
        G.investigationProgress = (G.investigationProgress || 0) + 1;
        addNarration('Break Room Edge', 'The break room is narrow and over-lit, tea kettle on an iron ring, three case officers working through a tray of honey biscuits. The oldest of them — bald, habit of cracking the knuckle of his left forefinger once before he speaks — says the name "Tazren" through a mouthful of biscuit and stops himself. The other two go still. The rumor moving is this: Tazren\'s case is about to be reopened by someone, and whoever that someone is, they are not going to be allowed to reach the Director. The knuckle cracks again. "Ten days, tops." He sees you in the doorway and the conversation changes register without pausing.');
        addJournal('Bureau internal rumor: someone is moving to reopen Tazren case — interception expected within ten days', 'intelligence');
        maybeStageAdvance();
      } else {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
        addNarration('Break Room Silence', 'The three case officers at the tray watch you step into the doorway and the conversation they were having disappears so completely it might never have happened. The bald one cracks the knuckle of his left forefinger, once, and pours a cup of tea he was not drinking. The other two begin discussing the roster rotation for next week. The honey biscuits sit between them untouched. You have the break room\'s full attention and none of its information.');
      }
    }
  },

  {
    label: "The archive gate goes unattended for four minutes at shift change.",
    tags: ['stage2', 'shirshal'],
    xpReward: 32,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      var roll = rollD20('wits', G.skills.wits);
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
    label: "A northern staging courier. Sealed packet to the same unlisted sub-registry Luneth mapped.",
    tags: ['Stage2', 'NPC'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'intercepting northern courier packet');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('finesse', (G.skills.finesse||0) + Math.floor(G.level/3));
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
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `You get two seconds at the saddlebag before the courier turns back from the trough. Enough: the outer wrapper's address notation matches the sub-registry exactly, and the date-of-action stamp is visible. Five days. You do not see the contents. The courier does not see you read it. Neither of you acknowledges the other when he passes on his way out.`;
        addJournal('Northern courier packet confirms sub-registry address — action stamp: 5 days', 'intelligence', `shir-courier-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "A woman from Panim Haven arrived with testimony. Not seen inside since the first morning.",
    tags: ['Stage2', 'NPC'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'locating Panim Haven witness');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.charm||0) + Math.floor(G.level/3));
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
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Naret Osse is in the hostel staging corridor, road-tired and waiting for a return transit that doesn't exist yet. She won't give the full account — not here, not out loud — but she confirms the petition her ward sent was adjudicated before they sent it. She knows because she filed it herself. "I have the copy. I kept a copy." She presses her bag closer to her side. That's all she'll say in the corridor.`;
        addJournal('Panim witness confirms petition adjudicated before submission — holds original copy', 'intelligence', `shir-naret-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The sub-registry code is in the Bureau's own charter. Embedded years before it was used.",
    tags: ['Stage2', 'NPC'],
    xpReward: 74,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'tracing Collegium sub-registry in Bureau charter amendments');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.charter_amendment_traced = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The charter amendment is in the Bureau's own public register — administrative language, the kind that passes without comment in annual filings. Section 14(c), amendment cycle seven years back: authority to route compliance-flagged cases to sub-registry for "expedited specialized review." The sub-registry address is specified verbatim. The amendment was filed under a Collegium administrative authority notation that predates the Bureau's current director by two administrations. Someone built the mechanism into the charter before they needed to use it. The suppression protocol is not improvised — it has a legal foundation no one has touched since the amendment was approved.`;
        addJournal('Bureau charter amendment: sub-registry routing authority embedded 7 years ago under prior administration', 'evidence', `shir-charter-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The charter amendment index requires staff-assisted access for records older than five years — procedure, not a block, except the staff assistant who handles the request notes the specific amendment cycle you named and excuses himself before pulling anything. He returns with a supervisor. The supervisor is polite and asks for credentials with the particular patience of someone who was briefed before arriving. The charter amendment is available upon formal request, which requires two business days and an originating authority signature. You will not be here in two business days.`;
        addJournal('Charter amendment access flagged — supervisor briefed, formal request required', 'complication', `shir-charter-fail-${G.dayCount}`);
      } else {
        G.flags.charter_amendment_traced = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Section 14(c) is in the register: sub-registry routing authority for expedited specialized review, filed seven years ago. The amendment is clean, formally ratified, no procedural anomalies visible on its face. What it means is that the override code Khalis identified has a legal home — the routing is authorized, not improvised. The authorization predates the current director. Whoever wrote the amendment knew what they were writing it for.`;
        addJournal('Charter amendment confirms sub-registry routing is legally authorized — written before current administration', 'evidence', `shir-charter-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Two of Tazren's supervisors in the building today. One signed the original case closure order.",
    tags: ['Stage2', 'NPC'],
    xpReward: 78,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(78, 'confronting Bureau supervisors who closed Tazren case');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.charm||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.supervisors_confronted = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
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
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Vel Orath grants you five minutes with the door open. He listens to the charter amendment angle without responding to it and says the case was closed under standard administrative review authority. "That is the record." The second supervisor has developed an urgent errand elsewhere in the building. Orath fills the remaining four minutes by describing the case closure procedure in procedural detail you cannot interrupt. When time is up, he stands. The door was already open.`;
        addJournal('Supervisor Vel Orath: case closed under standard administrative review — gave no ground, timeline confirmed', 'intelligence', `shir-supervisors-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The transit post kept a field rotation log. The Collegium never asked them to stop.",
    tags: ['Stage2', 'NPC'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'tracing Collegium field rotation log at transit post');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.transit_rotation_log_found = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The post office field rotation log is a hand-kept ledger the clerk maintains out of professional habit — never mandated, never collected. Seventeen months of courier registration entries, including six that carry a Collegium field coordination stamp matching the Oversight profile Mirae described. The registration dates correspond exactly to the three months preceding each of the seven petition dismissals Sivren found. The Collegium field agent arrived, the petitions closed, and the agent departed — every time. The clerk has never been asked about it. He does not understand what he has been recording.`;
        addJournal('Transit post rotation log: Collegium field agent arrivals precede every petition dismissal — 7 for 7', 'evidence', `shir-transit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The clerk pulls the rotation log and starts paging backward to help with the date range. Halfway through, a Bureau compliance officer stops to collect the day's outbound mail and lingers — the log is visible on the counter, the date range visible, your interest visible. The clerk slides the log off the counter before anything is said. His expression when he looks at you is the expression of someone who has made a calculation and reached a result he doesn't like. He's still holding the log when you leave.`;
        addJournal('Transit post rotation log — third-party observation interrupted access', 'complication', `shir-transit-fail-${G.dayCount}`);
      } else {
        G.flags.transit_rotation_log_found = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The clerk finds the Collegium field coordination stamps in his log without difficulty — he notices patterns, he says, it is the work. Six entries over seventeen months. He cannot say what those couriers were doing in Shirshal, only that they registered at the post and departed north, same as the visitors Mirae described. He writes the entry dates on a slip of paper before you ask him to.`;
        addJournal('Transit post log: 6 Collegium field coordination entries over 17 months — north departure pattern confirmed', 'intelligence', `shir-transit-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "A retired archivist near the compliance shrine. She left under circumstances the record doesn't describe.",
    tags: ['Stage2', 'NPC'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'speaking with retired Bureau archivist');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.charm||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.retired_archivist_spoken = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Her name is Orel Vasht. She pours tea before she speaks and lets the silence run long enough to mean something. Then: "The sub-registry notation was written into the charter amendment before I left. I recognized the format. I wrote a memo." She sets her cup down. The memo went to her division head and was returned to her three days later marked as outside her remit. Her retirement followed six weeks after. "I kept a copy of the memo. I was not certain it would matter. I am more certain now." She crosses the room to a locked drawer without being asked.`;
        addJournal('Retired archivist Orel Vasht: wrote memo on sub-registry format before charter amendment passed — kept copy', 'evidence', `shir-orel-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.reverence = (G.worldClocks.reverence||0) - 1;
        G.lastResult = `Orel Vasht answers the door and reads the situation in the first five seconds — the question before the question, the approach that belongs to a particular kind of visitor. She says she left the Bureau for personal reasons and the record reflects that, and then she closes the door with the precise quietness of someone who has been practicing that answer for a long time. The tea on the shelf behind her is still steeping. She was not expecting to be home.`;
        addJournal('Retired archivist Orel Vasht — refused to speak, door closed', 'complication', `shir-orel-fail-${G.dayCount}`);
      } else {
        G.flags.retired_archivist_spoken = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Orel Vasht acknowledges the sub-registry notation when you name it — a small acknowledgment, a stillness in her hands over her cup. She says only that the notation format is not standard Bureau administrative language. "It belongs to a different drafting tradition." She will not say more than that, not today, not without more time to think it over. But she does not deny knowing what it means.`;
        addJournal('Retired archivist confirms sub-registry notation is non-standard Bureau language — different drafting tradition', 'intelligence', `shir-orel-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The north road at the hour Mirae named. The ten-day cycle leaves from here.",
    tags: ['Stage2', 'NPC'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'surveillance on north road departure — ten-day cycle contact');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('finesse', (G.skills.finesse||0) + Math.floor(G.level/3));
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
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `One figure, north road, the hour Mirae gave. He carries a satchel and does not linger at the fork. You cannot read the markings on the satchel from the distance that keeps you out of sight. What you confirm: the timing, the route, the practiced indifference of someone who makes this trip regularly and has no reason to expect it matters. Mirae's description was precise.`;
        addJournal('North road departure confirmed — timing and route match Mirae description, satchel markings unread', 'intelligence', `shir-northwatch-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The residue on the calibration stone is a compound, not sediment. Specific formulation.",
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
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The residue samples from the stone's repositioned edge are crystalline, not particulate — applied deliberately, not accumulated. The compound profile matches the resonance-damping precursor Khalis identified at the Arcane Market Counter: the same material classified as ceremonial incense, the same mass that exceeded ceremonial thresholds by a factor of twelve. Someone used the precursor to lubricate the ward stone's rotation, leaving the residue as a byproduct. The same supply chain that runs through the market counter runs through this corridor wall.`;
        addJournal('Ward stone residue matches Khalis market counter precursor — same supply chain, physical application confirmed', 'evidence', `shir-residue-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The maintenance notation on the stone is current, and a Bureau warden rounds the corridor before the sample can be collected cleanly. The warden examines your position near the stone with the particular attention of someone who was briefed to watch for unauthorized contact with calibration equipment. A formal notation goes in the inspection log. The residue remains unsampled and your access to the corridor is now subject to a prior-notice requirement.`;
        addJournal('Ward stone sample collection blocked — corridor access now restricted', 'complication', `shir-residue-fail-${G.dayCount}`);
      } else {
        G.flags.ward_stone_residue_analyzed = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The compound on the stone's edge is not maintenance oil and not natural accumulation. The crystal structure is consistent with a processed arcane precursor — the kind that requires a refining step before use. Without the reference samples from Khalis's flagged imports, an exact match is out of reach. But the formulation points toward the same general category. The stone was moved with chemical assistance, by someone who understood what that assistance would do to the warding pulse.`;
        addJournal('Ward stone residue: processed arcane precursor, consistent with suppression compound category', 'intelligence', `shir-residue-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The surge reports and dismissal dates don't match the filed account.",
    tags: ['Stage2', 'NPC'],
    xpReward: 74,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'cross-referencing glyph surge incident dates against petition dismissals');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
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
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The pattern across the three localities holds: surge incident, petition filed, dismissal within thirty days, secondary evidence never entered. The individual cases each look like expedient administration. Laid together, the thirty-day window is consistent to within forty-eight hours across all seven cases. Forty-eight hours of variation across seven separate jurisdictions and seven separate petition processes suggests the dismissal schedule was coordinated, not incidental.`;
        addJournal('Petition dismissals across 7 localities — consistent 30-day window suggests coordinated schedule', 'intelligence', `shir-timeline-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The Verdant Row network tracks which localities received the suppressed materials.",
    tags: ['Stage2', 'NPC'],
    xpReward: 76,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(76, 'contacting Verdant Row network on material distribution');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.charm||0) + Math.floor(G.level/3));
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
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The coordinator sketches the broad distribution shape without names or coordinates — seven localities, four staging points, a rough directional flow from the northern district south. She will not commit the specifics to paper in this meeting. What she confirms: the distribution was active during the same window as the petition dismissals, and at least one of the staging points is a locality that never filed a petition. "It wasn't reacting. It was positioned."`;
        addJournal('Verdant Row: distribution active during petition dismissal window — at least one staging point pre-petition', 'intelligence', `shir-verdant-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The override code appeared in a second Bureau branch three months before here.",
    tags: ['Stage2', 'NPC'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'tracing override code appearance in a second Bureau branch');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('finesse', (G.skills.finesse||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.override_code_second_branch_traced = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The second branch's intake log is kept at the transit registry — a public-facing record, accessible without staff facilitation. Three months before the Shirshal entries Khalis identified, the same override code appears clearing a materials flag in a Panim Haven branch intake record. A different branch, different material category, same code. The code clears the Panim flag without any named authorization source: just the code, a timestamp, and a cleared status. The override mechanism was tested before Shirshal. Shirshal was not the first locality.`;
        addJournal('Override code appears in Panim Haven branch 3 months earlier — Shirshal was not the first deployment', 'evidence', `shir-override2-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The transit registry clerk cross-checks the code format against the branch's filing index before pulling records — standard practice. The format triggers a Collegium administrative hold query, which requires confirmation from the originating authority. The originating authority is the sub-registry. The sub-registry does not respond to public inquiries. The transit registry clerk closes the index with genuine regret. The hold is automatic; he had no choice about it.`;
        addJournal('Override code format triggered Collegium hold — registry access blocked', 'complication', `shir-override2-fail-${G.dayCount}`);
      } else {
        G.flags.override_code_second_branch_traced = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The Panim Haven transit intake record shows the override code applied to a materials flag nine months ago. The log entry is standard — no unusual notation, no secondary authorization. The code clears the flag the same way it clears Shirshal flags: without a traceable source. The Panim entry predates Tazren's first suppressed flag by three months. The code was already in use before Tazren began logging inconsistencies.`;
        addJournal('Panim Haven intake: same override code 9 months ago — predates Tazren first flag by 3 months', 'intelligence', `shir-override2-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The hidden transcripts name three surge witnesses. One is still in Shirshal.",
    tags: ['Stage2', 'NPC'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'locating glyph surge witness named in Ravel hidden transcripts');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('vigor', (G.skills.vigor||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.surge_witness_found = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `His name is Davan Mirest. He works the loading dock at the transit grain store and arrives early enough to watch the road in both directions before anyone else is on it. When you name Ravel Coilspire, he does not deny knowing the name. He describes the surge event in the west ward without being asked: a sustained resonance failure lasting two nights, the lights in the lower registry going out in sequence, the particular smell of a ward burning out rather than fading. "It wasn't a malfunction. The ward was killed from outside its own boundary." He says it like someone reciting a thing he decided to say a long time ago, waiting for the right question.`;
        addJournal('Surge witness Davan Mirest: west ward resonance killed from outside boundary — named in Ravel transcripts, still in Shirshal', 'evidence', `shir-witness-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The loading dock foreman watches you ask after the name for long enough to decide you are not routine. By the time you find the worker's shift schedule, he has been moved to a double shift at the north storage facility — a reassignment that happened within the hour. The foreman doesn't know why. He fills out the reassignment form while you are still standing there, which means the form will have today's date and yours as a contextual notation. The worker is no longer findable without making the search more visible than it has already become.`;
        addJournal('Surge witness relocated mid-day — timing tied to inquiry, access lost', 'complication', `shir-witness-fail-${G.dayCount}`);
      } else {
        G.flags.surge_witness_found = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Davan Mirest confirms he spoke to Ravel — he doesn't deny it and doesn't elaborate. He will say the surge event in the west ward was not consistent with equipment failure. "Equipment failures are ragged. This was clean." He does not want to say more in the loading dock. He names a time and a location — the public garden bench near the compliance shrine, evening bell — and goes back to work before the conversation can be observed as unusual.`;
        addJournal('Surge witness Davan Mirest: west ward surge "clean, not ragged" — meeting arranged for evening', 'intelligence', `shir-witness-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  // --- NEW CHOICES: +30 --- //

  // ARCHIVE RECORDS (~8)

  {
    label: "The archivist's index uses three notation systems. The third one appears nowhere in the key.",
    tags: ['Archive', 'Stage2'],
    xpReward: 78,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(78, 'tracing notation discrepancies in archive index');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The third notation is a marginal glyph, barely wider than an eyelash, pressed into the spine crease of every affected file. Under the dry archive light it reads as print shadow — only at an angle does the mark separate from the leather. Forty-seven files across the main index carry it. None of them share a stated subject category. All forty-seven were filed or amended during the same eleven-week window. Whatever the mark means, it was applied systematically and then made to disappear into the binding.`;
        addJournal('Third index notation: 47 files marked during same 11-week window — applied deliberately, hidden in binding crease', 'evidence', `shir-notation-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The archive index request goes through staff facilitation. The archivist on duty checks the notation key without finding anything unusual, then writes your query on a request slip — standard procedure, logged with the day's timestamp. The slip goes into the supervisory tray. By the time the tray is reviewed, the specific files you asked about are in a retrieval hold for biennial audit. The timing is not flagged as anything other than coincidental. The index is no longer accessible to informal inquiry.`;
        addJournal('Archive index query logged — requested files entered biennial audit hold', 'complication', `shir-notation-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The third notation marks eleven files that share no stated subject category. The archive key has two systems documented. The third — a small pressed mark in each file's crease — is absent from any key you have access to. The archivist on duty looks at the marked files with the expression of someone who has noticed something before without having a name for it. She does not add to what you have found.`;
        addJournal('Third archive notation confirmed on 11 files — unlisted, pattern unclear', 'evidence', `shir-notation-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Three filing slots in the restricted section show evidence of re-ordering within the past month.",
    tags: ['Archive', 'Stage2'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'examining recent re-ordering of restricted archive section');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('finesse', (G.skills.finesse||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The dust line on the restricted shelf is clear: three slots disturbed in a stretch that should be sequential. The files that belong there — visible from the catalog index — are material transit authorizations for a northern route segment not covered by any public commerce table. They are not missing from the physical shelf; they have been replaced with differently dated versions. The original date codes are still visible on the folder spines under the replacement labels, a thin strip of earlier ink the replacer did not bother to fully cover.`;
        addJournal('Restricted section: transit authorization files replaced with re-dated versions — original date codes visible beneath labels', 'evidence', `shir-reorder-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The restricted shelf is under daily warden patrol — the pattern brings the warden around the corner while your angle on the disturbed slots is still productive. Nothing is said; the warden makes a note on the patrol card and continues. The note is a description, not a report. But the patrol interval shortens for the remainder of the day, the way it does when a warden has written something down. The disturbed slots are no longer approachable without being fully observed.`;
        addJournal('Restricted shelf patrol noted — warden interval shortened, access impractical', 'complication', `shir-reorder-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The three disturbed slots hold material transit files. The dust displacement is recent — Shirshal's archive air dries everything fast, so disturbance shows as a clean line where the settled layer was broken within the week. The file dates in those slots are sequential with the rest of the shelf. Either they were removed and returned, or replaced with files carrying the same date range. Without the catalog record to compare against, the difference can't be confirmed.`;
        addJournal('Restricted section: recent dust disturbance across 3 transit file slots — possible replacement', 'intelligence', `shir-reorder-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Northern transit depot logs show a standing gap — same three-week window, annually.",
    tags: ['Archive', 'Stage2'],
    xpReward: 74,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'auditing northern transit depot receipt logs for annual gap pattern');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Three years of receipt logs, same calendar gap: weeks fourteen through sixteen of each cycle, the northern transit depot logs show no inbound receipts. Not reduced — none. The depot did not close; its outbound log for those weeks is uninterrupted. Goods moved out but nothing was logged in. The gap spans the same window as the Collegium field rotation entries the transit post clerk recorded. The depot was receiving something during those three weeks that no one wrote down.`;
        addJournal('Northern depot receipt gap matches Collegium field rotation window — 3 consecutive years, inbound only', 'evidence', `shir-depot-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The receipt log archive requires a cross-reference request from two departments — depot operations and customs compliance. The customs compliance clerk notes the date range of your query before submitting it and adds a flag for the department head. By the hour, the request has been elevated to a procedural review for "scope clarification." The logs are not denied; they are simply unavailable until the scope review completes. Scope reviews in the Bureau take between five and twenty-three days.`;
        addJournal('Depot receipt log request flagged — customs compliance scope review initiated', 'complication', `shir-depot-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Two years of logs, same gap: weeks fourteen through sixteen, no inbound receipts at the northern transit depot. The outbound log continues through both gaps without interruption. The missing inbound entries are not annotated as closed-period or restricted — they simply do not exist. A gap of this precise calendar consistency over two separate years is not clerical error.`;
        addJournal('Northern depot: inbound receipt gap — same 3-week window across 2 years, outbound log unaffected', 'intelligence', `shir-depot-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The Fairhaven staging ledger has a Shirshal bureau notation that Fairhaven never authorized.",
    tags: ['Archive', 'Stage2'],
    xpReward: 76,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(76, 'cross-referencing Fairhaven staging ledger against Shirshal bureau records');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The Fairhaven ledger copy held in Shirshal's archive carries a Bureau notation on its cover page — an administrative cross-reference stamp indicating joint oversight authority. The Fairhaven original does not carry this stamp; the transit copy made here added it. The stamp grants Shirshal administrative access to Fairhaven staging records for the same period as the petition dismissals. Oversight authority was extended unilaterally. Fairhaven was not consulted. The stamp's signatory line is the sub-registry override code, not a named officer.`;
        addJournal('Fairhaven staging ledger: Shirshal added joint oversight stamp unilaterally — signatory is override code, not a person', 'evidence', `shir-fairhaven-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The Fairhaven staging ledger is a cross-jurisdiction record held under a shared custodianship notation. Accessing it without the originating authority's clearance triggers an automatic hold — the archive system stamps the request with a denial pending Fairhaven bureau confirmation. The confirmation process routes through the sub-registry. Sub-registry responses to public inquiry are not guaranteed within any stated timeframe. The ledger will not be accessible through standard channels today or tomorrow.`;
        addJournal('Fairhaven staging ledger: cross-jurisdiction hold — sub-registry routes all confirmations', 'complication', `shir-fairhaven-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The Fairhaven staging ledger in Shirshal's archive shows a cover notation that the Fairhaven original — available through the transit office's shared filing index — does not. The notation claims administrative cross-reference authority for a six-month window. It was added here, not at Fairhaven. The signatory line is a code, not a name.`;
        addJournal('Fairhaven ledger: Shirshal-added oversight notation missing from Fairhaven original — signatory is a code', 'intelligence', `shir-fairhaven-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The archive's material transfer log skips four entries without an annotation. Ink date matches.",
    tags: ['Archive', 'Stage2'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'examining material transfer log for skipped entries');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The material transfer log numbering runs 2841 through 2845 without entries for 2842, 2843, 2844. The ink date on entry 2841 and 2845 is the same — the same day, the same hand. The four gaps fall in sequence, not scattered across weeks. The log's ink saturation is uniform across the surrounding entries, meaning the skips were not erased or overwritten. Numbers were allocated, the transfer was logged in a separate system, and the sequence placeholder was left blank to maintain consecutive numbering. The four transfers happened. They were deliberately not recorded here.`;
        addJournal('Transfer log entries 2842-2844 skipped — same-day ink confirms deliberate omission, not error', 'evidence', `shir-loggap-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The material transfer log is checked out to a Bureau auditor — the sign-out card is still in the sleeve on the counter. The auditor's name on the card is a department notation, not a personal name. The log will be returned when the audit is complete; the desk clerk does not know when that will be, and the audit's scope is not listed on the sign-out form. The log is unavailable. The audit timing relative to your inquiry is logged in the desk clerk's daily report.`;
        addJournal('Material transfer log signed out to unnamed Bureau auditor — return date unknown', 'complication', `shir-loggap-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Three consecutive entry numbers with no entries, same ink date on either side. The log sequence doesn't account for them as voids or holds. The surrounding entries are mundane materials — standard supply requisitions, all with named transferring parties. The three missing numbers belong to a gap that the log treats as if it doesn't exist. Either the transfer didn't happen, or it was recorded somewhere else and the number was held here as a placeholder.`;
        addJournal('Transfer log: 3 consecutive skipped entries — same-day ink surrounds gap, no void annotation', 'intelligence', `shir-loggap-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Northern route compliance cert is signed by an officer who retired two years ago.",
    tags: ['Archive', 'Stage2'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'verifying certification signatory against personnel records');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The personnel record is public — Bureau officers' service records are maintained in the compliance index. Senior Compliance Officer Verath Isol retired two years and four months ago. The northern route certification bearing his signature is dated eight months ago. The handwriting matches the prior-year samples in the compliance index perfectly. Either someone kept his signature block active in the authorization system after his retirement, or someone forged it with enough access to his prior documentation to match it exactly. Neither explanation requires him to still work here. Both require someone who does.`;
        addJournal('Northern route certification signed by retired officer Verath Isol — 8 months post-retirement, signature verified authentic', 'evidence', `shir-signat-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The certification file is cross-referenced with the personnel index before the archive clerk pulls it. The flag on the certification file is an administrative hold — the document is under a records integrity review, a process that began three weeks ago. The clerk notes the review on the request slip. The review is not scheduled to complete within the month. Access to the underlying certification is suspended until the review closes. You will not be the first or last person to ask about this document, and the hold is aware of that.`;
        addJournal('Northern route certification in records integrity review — access suspended, review ongoing 3 weeks', 'complication', `shir-signat-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The certification is signed by Verath Isol. The personnel index lists him as retired — the departure date is clear and unambiguous. The certification date is eight months ago. The archive desk clerk looks at both documents without comment, then back at you. "Retired officers' signature blocks are technically retained in the authorization system for one year." He says it like a policy he has always considered inadequate.`;
        addJournal('Northern route certification signed post-retirement — clerk confirms signature blocks retained 1 year post-departure', 'intelligence', `shir-signat-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The sealed-section catalog shows forty-three files. The shelf holds forty.",
    tags: ['Archive', 'Stage2'],
    xpReward: 73,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(73, 'counting sealed archive section against catalog');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('finesse', (G.skills.finesse||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The catalog count comes from a photocopy posted at the section entry for fire-emergency inventory purposes — public by protocol, consulted by nobody. Forty-three. The physical shelf during shift-change gap: forty, counted twice. The three missing files bear the same Collegium stamp Sivren found on the petition dismissals. Their catalog entries name them as "amended petition supplementals" for Panim Haven, Fairhaven, and a third locality whose name has been redacted from the photocopy with a correction strip that wasn't quite long enough to cover the descenders.`;
        addJournal('Sealed section: 3 files missing vs catalog — petition supplementals for Panim Haven, Fairhaven, and redacted third locality', 'evidence', `shir-count-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The catalog is not a public document — the emergency inventory card posted at the section entry is a summary only, and the archivist who manages the sealed section corrects this misunderstanding before you have finished reading it. She removes the card from the post with both hands and carries it to her desk. The removal is not hostile. "Public access to catalog records requires a sealed-section authorization form." She sets the card face-down and picks up the correct form to hand to you. The form takes four business days to process.`;
        addJournal('Sealed section catalog access denied — emergency card removed, authorization form required', 'complication', `shir-count-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The emergency inventory summary at the section entry lists forty-three files. The visible shelf during the shift-change gap holds forty — a count confirmed twice, quickly, before the angle closes. Three files short of the stated total. The missing gap falls in the middle of the Collegium-stamped range, not at the ends. If they were removed, they were removed selectively, not by pulling the front or back of the stack.`;
        addJournal('Sealed section shelf count: 40 vs catalog total 43 — 3 missing from Collegium-stamped range', 'intelligence', `shir-count-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Water-damage noted on the file box. Inside: pristine files, not a warped edge.",
    tags: ['Archive', 'Stage2'],
    xpReward: 65,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(65, 'examining water-damage misfiled box in archive wing');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The box exterior shows legitimate staining — old water damage, genuine, from the archive wing's 2024 pipe failure noted in the maintenance log. The files inside are untouched. The original contents of this box were removed and replaced with newer files that were placed here to inherit the box's damage notation, which tags them as low-priority and pre-reviewed. The files now inside are material classification records from the same period as the suppression compound imports — filed here, under a damage notation, where no one would look at them as anything other than already-reviewed old paperwork.`;
        addJournal('Water-damage box: original files removed, replaced with suppression-period material classification records hidden as low-priority', 'evidence', `shir-damagebox-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The box is tagged with a damage notation and sits in the pre-review low-priority section, which is staffed by a single archive assistant whose job consists largely of moving these boxes into off-site storage. She sees you examining it and, following procedure, logs the contact. Anything in a damage-notated box that receives external inquiry is flagged for supervisor review before moving to off-site. The box is now in supervisor review. It will not be accessible while the review is open.`;
        addJournal('Water-damage box examination logged — supervisor review triggered, access closed', 'complication', `shir-damagebox-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The files inside carry no warping, no tide marks, no brittleness at the edges — Shirshal's dry archive air preserves paper so completely that damage is visible for years. The box's external staining is genuine and old. The files inside were placed here after the damage event. They are not what the box was labeled to contain. What they are — a stack of material classification records — doesn't explain why they were moved here, but the move was deliberate.`;
        addJournal('Archive damage box: pristine files inside — placed here deliberately after damage event, not original contents', 'intelligence', `shir-damagebox-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  // NPC ENCOUNTERS (~8)

  {
    label: "Luneth signs for packages he wasn't told the contents of — keeping a private tally.",
    tags: ['NPC', 'Stage2'],
    xpReward: 80,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(80, 'reviewing Luneth Coilspire private package tally');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('charm', (G.skills.charm||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.luneth_tally_reviewed = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Luneth pulls a folded card from his breast pocket — worn at the fold, written in columns, the handwriting of someone who keeps this close and has kept it close for a while. Nineteen packages received without content declarations, all from the same sender notation. He has marked each by weight, by date, by the delivery party's description. "I sign for what arrives. I don't sign for what it is. That's how the form works." He hands the card across without being asked for it. He has been waiting for someone to ask.`;
        addJournal('Luneth private tally: 19 undeclared packages — sender notation consistent, weight logged, delivery party described', 'evidence', `shir-luneth2-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Luneth straightens at the counter the way someone does when they have decided not to do something they were considering. Whatever he had been keeping to himself remains there. "Package logs are Bureau property. Personal records are personal." He says it without hostility and without elaboration, and goes back to the manifest on his desk. The decision happened in a second and the conversation was over at the same speed.`;
        addJournal('Luneth Coilspire — declined to share personal package records', 'complication', `shir-luneth2-fail-${G.dayCount}`);
      } else {
        G.flags.luneth_tally_reviewed = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Luneth describes the pattern without producing the card: eleven packages, no content declarations, all arriving on the same sender notation within a four-month window. "Porter protocol requires me to note anomalies I can't resolve through normal channels." He did note them. The notation went into the internal flag queue, where it was cleared without explanation. "Cleared means closed. It doesn't mean resolved." He meets your eyes once to make sure you have understood the difference.`;
        addJournal('Luneth: 11 undeclared packages — internal flag cleared without resolution, distinction noted', 'intelligence', `shir-luneth2-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Khalis ran the same import category through three classification requests. All three came back identical.",
    tags: ['NPC', 'Stage2'],
    xpReward: 74,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'reviewing Khalis Coilspire duplicate classification requests');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('spirit', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.khalis_classification_reviewed = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Khalis spreads three request-response sheets across the market counter — he has kept every copy. Each submission described the import compound in progressively more specific material detail: first submission named the base compound; second added the refined fraction weight; third included the processing derivative signatures that make ceremonial incense classification impossible without falsifying the profile. All three responses came back "ceremonial incense — standard clearance." Third submission's response arrived before the second one's review period had elapsed. The classification system doesn't read what it's sent. It returns a preset answer. He has known this for five months.`;
        addJournal('Khalis: 3 classification submissions with increasing specificity — all returned "ceremonial incense," third answered before second reviewed', 'evidence', `shir-khalis2-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Khalis begins to reach for the copies and stops. He has decided something in the moment between reaching and stopping. "Sharing those with someone who isn't authorized to receive classification review materials is a compliance risk for me, not for you." He puts his hands flat on the counter. "You understand that." He is not unsympathetic. He also does not reach for the copies again.`;
        addJournal('Khalis Coilspire — declined to share classification copies, compliance concern cited', 'complication', `shir-khalis2-fail-${G.dayCount}`);
      } else {
        G.flags.khalis_classification_reviewed = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Three submissions, three identical responses, all returning "ceremonial incense" regardless of what Khalis described. He confirms this without producing the copies. What he will add: the response turnaround on the third submission was four hours — standard review takes three days minimum. "That's not a review. That's a lookup." He taps the counter once with two fingers and leaves it there.`;
        addJournal('Khalis: identical classification responses regardless of detail — third response in 4 hours vs 3-day standard', 'intelligence', `shir-khalis2-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Sivren's shrine records a dedication rite that no charter recognizes. Performed on petition dismissal day.",
    tags: ['NPC', 'Stage2'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'examining Sivren Coilspire shrine rite record against petition calendar');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.sivren_rite_crosschecked = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The shrine log on the day of each dismissal shows a registered rite — "administrative alignment ceremony," a designation Sivren has never processed before or since across six years of records. The rite is performed by a registrant whose name appears nowhere in the Compliance Shrine's standing practitioner roll. The registration number is valid in format but traces to a charter section that has been administratively suspended. The rite provided a procedural cover: any contested dismissal could be answered with "active shrine review in progress." The cover expired automatically seven days after each dismissal. By then, the appeals window had also closed.`;
        addJournal('Shrine rite: "administrative alignment ceremony" on each dismissal day — non-roster performer, appeals window closed within rite duration', 'evidence', `shir-sivren2-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Sivren sets both record boards on her desk and examines the registration cross-reference before handing anything over. The "administrative alignment ceremony" entry has a Collegium advisory notation she has seen before — it marks records that require a verification request before secondary disclosure. She shows you the notation without opening the record. "I'm required to file a verification request before I share this one. That takes a week." She is apologetic about it. The notation was added after the original entry was made. She confirms this without being asked.`;
        addJournal('Shrine rite record: Collegium advisory notation requires 1-week verification before disclosure — added post-entry', 'complication', `shir-sivren2-fail-${G.dayCount}`);
      } else {
        G.flags.sivren_rite_crosschecked = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `A rite was recorded on the petition dismissal day — "administrative alignment ceremony." Sivren confirms she has never processed this designation before. The registrant's name is in the log but not in the standing practitioner roll. The rite created a procedural overlay on the affected cases. She does not speculate further, but she writes the dismissal date, the rite date, and the appeals window closure date in sequence on a piece of paper and hands it to you.`;
        addJournal('Shrine rite on dismissal day: unrecognized designation, non-roster registrant — appeals window closed within rite duration', 'intelligence', `shir-sivren2-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Mirae knows which guests never signed the visitors' book. She tracked them separately.",
    tags: ['NPC', 'Stage2'],
    xpReward: 78,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(78, 'reviewing Mirae Coilspire private guest record');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('charm', (G.skills.charm||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.mirae_private_log_reviewed = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Mirae produces a thin ledger from the shelf below the counter — separate from the guests' book, written in a different hand register than the inn's formal records. Eight entries. Each one is dated, each describes a guest who arrived without signing, was settled promptly, and departed before the morning bell. She never required the signature because the request not to sign came from the Bureau's standard accommodation waiver for official visitors. She kept the entries because she decided this mattered. "The waiver says I don't have to ask. It doesn't say I can't observe." Two of the descriptions match Mirae's oral account from the first interview. The other six are new.`;
        addJournal('Mirae private ledger: 8 unsigned-guest entries — Bureau accommodation waiver used, 6 new descriptions not in earlier account', 'evidence', `shir-mirae2-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.reverence = (G.worldClocks.reverence||0) - 1;
        G.lastResult = `Mirae fills a cup that doesn't need filling and sets it between you on the counter — the particular spacing that turns a surface into a boundary. "I said what I can say." She says it without apology. "What I keep for myself is for myself." The inn is quiet in the midday heat, the smell of old wood and the steppe dust that filters under the door all morning. The private ledger, if it exists, stays where it is.`;
        addJournal('Mirae Coilspire — declined to share private records', 'complication', `shir-mirae2-fail-${G.dayCount}`);
      } else {
        G.flags.mirae_private_log_reviewed = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Mirae mentions the separate ledger without producing it — she keeps track of the unsigned guests, she confirms, for her own reasons. Five entries she's willing to describe: three arrivals before the ten-day cycle, two on the cycle itself. The three who arrived early are new information. "Early arrivals don't fit a pattern. They don't match the roster either." She closes the subject there, but she has confirmed the ledger exists and that the numbers are larger than she first indicated.`;
        addJournal('Mirae: private ledger confirmed, 5 unsigned-guest entries described — early arrivals predate the 10-day cycle', 'intelligence', `shir-mirae2-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Tazren drew a network map before the case closed. It's still in his drawer.",
    tags: ['NPC', 'Stage2'],
    xpReward: 85,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(85, 'accessing Tazren Coilspire suppression network map');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('charm', (G.skills.charm||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.tazren_map_obtained = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        if (G.investigationProgress >= 6) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `The map is on a single folded sheet — Bureau standard paper, drawn in a clean precise hand, the hand of someone trained in archival documentation. Twelve nodes connected by solid and dashed lines. Solid lines are confirmed transfers; dashed are inferred. The northern staging district is the central node. Three localities feed into it, and two others receive from it. One of the receiving nodes is annotated "pre-emptive" in a margin barely wide enough for the word. The Verdant Row distribution map and Tazren's map name the same localities in the same network positions. They were built independently.`;
        addJournal('Tazren suppression map: 12 nodes, 3 feeder localities, 2 receivers — matches Verdant Row map, built independently', 'evidence', `shir-tazren2-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Tazren shuts the drawer before it is open an inch. "That's personal working notes from a closed case. It's my property, not Bureau property, and I haven't decided who sees it." He says this quietly, without moving from his chair. The case file he shared before is still available; the map is not. He does not explain the difference, and you do not ask him to, because the map is still in the drawer.`;
        addJournal('Tazren suppression map — access declined, personal working notes not shared', 'complication', `shir-tazren2-fail-${G.dayCount}`);
      } else {
        G.flags.tazren_map_obtained = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Tazren unfolds the map and holds it toward you without letting go of his end. Eleven seconds — enough to trace the node structure, count the localities, read the solid and dashed line pattern. The northern staging district sits at the center. He refolds it before you can read the margin annotations. "You've seen the shape. The specifics are what I'm not ready to commit to yet." He means the specifics may still be wrong. He is still working the case in his head even after it was closed.`;
        addJournal('Tazren map: 12-node network viewed briefly — staging district at center, margin annotations unread', 'intelligence', `shir-tazren2-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The porter rotation excluded Luneth from the restricted wing. He noticed the week it happened.",
    tags: ['NPC', 'Stage2'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'speaking with Luneth about restricted wing rotation change');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('charm', (G.skills.charm||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.luneth_rotation_change_noted = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Luneth gives the date without pausing to calculate it — he has calculated it many times before. Nine months ago, four weeks after he submitted the third internal flag on the undeclared packages, the restricted wing assignment was removed from his rotation without explanation. The reassignment form cited "operational workflow optimization." He asked once. The answer referred him to the form. He kept the form. He shows it to you: workflow optimization notation in one column, his name, his previous assignment dates, and then nothing. "Three years in that rotation. They optimize around me the month after I file the third flag." He takes the form back and puts it in his breast pocket.`;
        addJournal('Luneth removed from restricted wing rotation 4 weeks after 3rd internal flag — form cites "workflow optimization"', 'evidence', `shir-luneth3-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Luneth considers and shakes his head once, the minimal version of the gesture. "Rotation assignments are HR procedure. I don't discuss HR process with outside parties." He says it without unfriendliness, the way someone does when the rule is not the problem — the situation behind the rule is the problem, and the rule is the only protection they have. He picks up the day's manifest and the conversation ends on his terms.`;
        addJournal('Luneth Coilspire — declined to discuss rotation reassignment, HR procedure cited', 'complication', `shir-luneth3-fail-${G.dayCount}`);
      } else {
        G.flags.luneth_rotation_change_noted = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Luneth confirms the rotation change happened nine months ago. He won't specify what he thinks caused it, but he names the week it occurred and the week he submitted his third flag as adjacent — no gap between them. "Adjacent isn't evidence," he says. He knows what it means anyway. He returns to his manifest, which he has been holding the entire conversation without reading.`;
        addJournal('Luneth: rotation change confirmed — 3rd flag submission and reassignment in same week, "adjacent isn\'t evidence"', 'intelligence', `shir-luneth3-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Mirae's spare room is always reserved for the same party. No name. Standing block.",
    tags: ['NPC', 'Stage2'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'examining Mirae Coilspire standing reservation block');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('finesse', (G.skills.finesse||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.mirae_standing_reservation_confirmed = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The reservation ledger is visible from the counter when Mirae leans across to refill the tea shelf. The spare room entry reads not a name but a symbol — a two-character notation that corresponds to nothing in the standard Bureau accommodation waiver codes. The block runs month after month, never cancelled. In months when the room is occupied by the standing party, the dates match the ten-day cycle Mirae described and the transit post rotation log entries the clerk recorded. The symbol is the same two-character notation on the transit post's sealed dispatch cover. The spare room is a standing waystation.`;
        addJournal('Mirae standing reservation: 2-character notation matches transit post sealed dispatch symbol — standing waystation confirmed', 'evidence', `shir-mirae3-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.reverence = (G.worldClocks.reverence||0) - 1;
        G.lastResult = `The reservation ledger is behind the counter and stays there. Mirae notices the direction of your attention before you can find an angle that would give you a readable view. She closes the ledger's cover with one hand, unhurried, and shifts it to the shelf below. "Guest records are private." It is said without emphasis. She is not suspicious of you; she is protecting something the same way she has protected it for a long time, out of habit, out of a decision made years ago that she has never revisited.`;
        addJournal('Mirae reservation ledger closed before readable — guest record privacy maintained', 'complication', `shir-mirae3-fail-${G.dayCount}`);
      } else {
        G.flags.mirae_standing_reservation_confirmed = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Mirae confirms a standing block on the spare room without specifying who holds it. "It's been running for eighteen months. The arrangement was made through the Bureau's standard accommodation protocol." She does not confirm that the party uses it on the ten-day cycle — she doesn't need to, because the Bureau accommodation waiver doesn't cover civilian reservations, only operational ones. She pours more tea and does not expand on the implication.`;
        addJournal('Mirae: spare room on standing Bureau accommodation block for 18 months — operational protocol, not civilian', 'intelligence', `shir-mirae3-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  // MATERIAL TRANSIT (~6)

  {
    label: "Resonance compound uses an import sub-tier that hasn't been valid since the charter revision.",
    tags: ['Transit', 'Stage2'],
    xpReward: 74,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'auditing resonance compound import classification against current charter');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('spirit', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The import classification reads "sub-tier 7C — general ceremonial compound, non-reactive." Sub-tier 7C was retired from the classification charter four years ago when the Arcane Materials Review Board updated the tier structure. The current charter has no 7C. Any material submitted under 7C after the revision date cannot be processed by the standard review system — it routes to an exception queue. The exception queue is administered by the sub-registry. Every suppression compound shipment that passed through Shirshal has been routing to the sub-registry for processing, automatically, because the classification that describes it stopped being valid before the first shipment arrived.`;
        addJournal('Suppression compound uses retired sub-tier 7C — routes automatically to sub-registry exception queue since charter revision', 'evidence', `shir-subtier-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The Arcane Materials Review Board's classification schedule is a specialist document — the desk clerk cannot produce it without a reference librarian, and the reference librarian is at the northern branch today. The classification audit request is logged and routed to the research queue. Results of research queue requests are returned in writing within four business days. The request log entry will be visible to whoever reviews it before the results arrive. You have announced the audit before completing it.`;
        addJournal('Charter revision classification audit request logged — research queue, 4-day return, visible to third parties', 'complication', `shir-subtier-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Sub-tier 7C is absent from the current charter — the classification tier table available at the public reference desk confirms this without specialist access. The import documents using it are not invalid on their face; they are simply routed differently. The standard review system cannot handle a retired tier, so it passes the file to an exception handler. The exception handler is not identified by name anywhere in the public reference materials.`;
        addJournal('Sub-tier 7C absent from current charter — materials classified under it route to unnamed exception handler', 'intelligence', `shir-subtier-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Compound shipments arrive light — declared weights don't match what the depot receives.",
    tags: ['Transit', 'Stage2'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'comparing border weight declarations to depot receipt weights');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('spirit', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The border declaration sheets and the depot receipt weights are in separate filing systems — the border records are held at the northern transit post, the depot receipts at Luneth's counter. Laid against each other: eight of the eleven compound shipments show a weight variance between eight and fourteen percent. The variance is always in the same direction — the depot receives less than the border declared. The missing fraction isn't variance error; that scale of consistent shortfall in one direction indicates deliberate extraction before final delivery. The extracted quantity over eleven shipments is sufficient for a sustained deployment.`;
        addJournal('Compound shipment weight variance: 8-14% short at depot vs border declaration — consistent direction, extracted quantity sufficient for deployment', 'evidence', `shir-weight-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The border declaration records are archived at the northern transit post under the joint-custody notation from the Fairhaven ledger. Accessing them requires the same Fairhaven authorization that blocked the ledger audit earlier. The joint-custody notation was not on these records last month — the archive clerk checks her prior access log and confirms it. The notation was added within the past week. The documents you need are being protected faster than you can reach them.`;
        addJournal('Border declaration records: joint-custody notation added within past week — access blocked before audit completed', 'complication', `shir-weight-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Four shipments compared: border declared weights versus depot receipt weights. Three of the four show a shortfall between ten and twelve percent. Scale variance at the border post accounts for two percent at most — the shortfall is real. Whatever was removed was removed between the border declaration and the depot arrival. The transit route between those two points is controlled by the northern staging district.`;
        addJournal('Compound shipment: 3 of 4 show 10-12% weight shortfall, transit route through northern staging district', 'intelligence', `shir-weight-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The transit manifest lists a handling agent that doesn't appear in any Bureau contractor registry.",
    tags: ['Transit', 'Stage2'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'cross-checking transit manifest handling agent against contractor registry');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The handling agent name on six of the compound manifests is "Kestal Logistics — Sub-registry authorized." The Bureau contractor registry, publicly searchable at the compliance desk, has no entry for Kestal Logistics under any variant spelling. The sub-registry authorization notation bypasses the contractor registry requirement entirely — it is a parallel authorization path that doesn't connect to the standard registry. Kestal Logistics exists only inside the sub-registry's authorization system. No external record confirms the entity is real.`;
        addJournal('Handling agent "Kestal Logistics" unlisted in contractor registry — exists only within sub-registry authorization, no external confirmation', 'evidence', `shir-agent-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The contractor registry desk requires a search-request form for non-standard entities — the name format on the manifest indicates a sub-registry notation that the desk cannot cross-reference without a Collegium clearance level the public terminal doesn't carry. The desk clerk logs the search attempt with the entity name before explaining this. The log feeds into the daily Collegium advisory report. Your query is now attached to the name you were trying to trace.`;
        addJournal('Contractor registry search logged with entity name — feeds Collegium advisory report', 'complication', `shir-agent-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The contractor registry search returns no results for the handling agent listed on the compound manifests. The sub-registry authorization notation explains the absence — sub-registry entities are not listed in the standard registry. They operate under a separate authorization framework. The standard registry clerk confirms this without being able to explain what that framework involves or who oversees it.`;
        addJournal('Handling agent unlisted in contractor registry — sub-registry authorization entities exempt from standard listing', 'intelligence', `shir-agent-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "A second compound type moving through the same route. Different classification. Same handler.",
    tags: ['Transit', 'Stage2'],
    xpReward: 76,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(76, 'identifying second compound type in transit route');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('spirit', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The second compound shows up in the depot intake logs as "ward-adjacent mineral supplement" — a classification that exists but applies to construction and maintenance materials, not ceremonial or arcane compounds. The mineral profile on the intake sheet describes a crystalline matrix with resonance-reflective properties. Khalis has seen this material before: it is the substrate applied to warding stone mounts to suppress ambient pulse recording. The suppression compound dampens active wards. This material silences the passive monitoring layer underneath them. Used together, they would eliminate both active and passive arcane record-keeping in a target space. The same handler manages both shipments.`;
        addJournal('Second compound: ward-monitoring substrate classified as mineral supplement — eliminates passive arcane record layer, same handler as suppression compound', 'evidence', `shir-compound2-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The second intake category requires a specialist arcane materials classification to cross-reference properly — the standard desk cannot interpret the mineral profile without an Arcane Materials Review Board consultant. The request for a consultant goes into the monthly queue. The monthly queue closes in three days. The next available consult slot after that is six weeks out. The classification ambiguity that makes the material difficult to identify is the same ambiguity that keeps it from being flagged automatically.`;
        addJournal('Second compound classification requires specialist consult — 6-week queue, ambiguity prevents auto-flagging', 'complication', `shir-compound2-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `A second material moving through the same route, handled by the same agent notation. The classification reads "ward-adjacent mineral supplement." The mineral profile description on the intake sheet uses technical terms for a crystalline compound — the kind Khalis described in passing during the import review. The material category overlaps with warding substrate chemistry. Whether this material and the suppression compound are meant to be used together requires someone with deeper arcane materials knowledge than the intake sheets can provide.`;
        addJournal('Second material: ward-adjacent mineral supplement via same handler — crystalline profile, possible suppression compound pairing', 'intelligence', `shir-compound2-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Northern transfer receiving signature is initials only — same two initials on every form.",
    tags: ['Transit', 'Stage2'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'tracing receiving signature initials across northern transfer forms');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Seventeen transfer forms, seventeen instances of the same two-initial receiving signature. The hand is identical across all seventeen — not similar, identical, the way signatures are when they are copied by one person onto multiple documents rather than written by different people over time. A genuine receiving signature varies with date, fatigue, and pen. These don't. All seventeen were processed at the northern staging depot, received by someone using initials that trace to no named officer in the Shirshal bureau's personnel index. The receiving party doesn't exist in any record except these forms.`;
        addJournal('17 transfer forms: identical two-initial signature — hand analysis confirms same source, no personnel record match', 'evidence', `shir-initials-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The northern transfer forms are in the restricted archives — cross-referenced with the sealed-petition section hold that was triggered by the earlier query. The archive hold covers both categories now. The desk clerk explains this without satisfaction; the cross-reference is automatic and she cannot override it. Both avenues of access are closed by the same hold, which has itself generated a notification to the file's originating authority. The notification routes through the sub-registry.`;
        addJournal('Northern transfer forms: archive hold now covers both form and petition sections — sub-registry notified of access attempt', 'complication', `shir-initials-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Eight transfer forms visible across Luneth's accessible range — all eight carry the same two-initial receiving signature. The handwriting is consistent in a way that raises a question: either one person signed all eight, or the signature was replicated. The initials do not match any named officer Luneth knows by those letters at the northern depot. "I've never had a package returned or disputed from there. So either that person receives everything correctly, or no one checks."`;
        addJournal('Transfer forms: identical two-initial receiving signature, no personnel match — receiving party consistency unverified', 'intelligence', `shir-initials-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The shipment schedule repeats on a 73-day cycle. Axial flip timing. Not coincidence.",
    tags: ['Transit', 'Stage2'],
    xpReward: 80,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(80, 'identifying 73-day axial cycle pattern in compound shipment schedule');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The shipment dates laid against the 73-day axial flip calendar confirm it: every major delivery coincides with a route disruption window — the three-to-seven day period during axial flip when monitoring traffic on the northern routes drops because patrol personnel are reassigned to weather-response and emergency logistics. The suppression compound is shipped precisely when the routes that carry it are least observed. Someone planned this against the seasonal calendar. The shipment schedule was not built around supply demand; it was built around surveillance gaps.`;
        addJournal('Shipment dates correlate to axial flip route disruption windows — scheduled against surveillance gaps, not supply demand', 'evidence', `shir-cycle-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The axial flip calendar is a specialist administrative document — route disruption schedules are held by the Bureau's logistics division rather than the archive. Logistics is in the northern wing, which is under the same supervisor who escorted you out of the building during the Vel Orath interview. Your name on the access log for that wing now generates an automatic secondary approval requirement. The secondary approval requires one business day. You do not have one business day before the current shipment window closes.`;
        addJournal('Axial flip calendar access blocked — northern wing supervisor secondary approval required, timing window closing', 'complication', `shir-cycle-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The pattern holds across three axial cycles: shipment dates cluster within the route disruption window each time. The disruption windows are not exact — they shift by days depending on weather severity. The shipment dates shift with them. Whoever schedules the deliveries has access to the updated disruption forecasts, not just the fixed calendar. The scheduling is responsive to current conditions, not pre-planned against a static date.`;
        addJournal('Compound shipments track axial flip disruption window including weather adjustments — scheduler has current forecast access', 'intelligence', `shir-cycle-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  // CROSS-REFERENCE WITH OTHER LOCALITIES (~5)

  {
    label: "Guildheart's staging records show a Shirshal administrative notation. Neither bureau authorized it.",
    tags: ['CrossLocality', 'Stage2'],
    xpReward: 76,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(76, 'cross-referencing Guildheart staging records against Shirshal bureau authorizations');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The Guildheart staging file copy in Shirshal's transit archive carries an administrative cross-reference notation identical to the one on the Fairhaven ledger: same format, same override code in the signatory line, same administrative period. Guildheart's own archive holds no corresponding notation on the original. Shirshal has claimed co-administration of Guildheart's staging records without Guildheart's knowledge or consent, the same mechanism used on the Fairhaven records. The sub-registry override code appears as the authorizing instrument for both. No named officer signs either.`;
        addJournal('Guildheart staging records: Shirshal added co-administration notation — same mechanism as Fairhaven, no Guildheart consent, override code as signatory', 'evidence', `shir-guildheart-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The Guildheart staging records are held in a joint-custody section requiring both localities' authorization for access by any third party. The joint-custody notation on these records is the same one that blocked the Fairhaven ledger earlier. The pattern is consistent: every cross-locality record set that might reveal the administrative notation has the same blocking mechanism on it. The blocks were placed in sequence, within the same administrative period.`;
        addJournal('Guildheart staging records blocked by same joint-custody notation as Fairhaven — placed during same administrative period', 'complication', `shir-guildheart-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The Guildheart staging file in Shirshal's archive has an administrative notation that Guildheart's own file doesn't carry. The notation format and override code match the Fairhaven pattern. Shirshal's archive holds co-administration claims over records from at least two other localities, and neither locality's record shows awareness of the claim. The notation is quiet. It doesn't announce itself. It simply provides access.`;
        addJournal('Guildheart staging file: co-administration notation matches Fairhaven pattern — 2 localities documented, neither aware', 'intelligence', `shir-guildheart-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "A Shelkopolis ward registry entry names Shirshal as co-administering authority. No Shelkopolis record matches.",
    tags: ['CrossLocality', 'Stage2'],
    xpReward: 74,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'cross-referencing Shelkopolis ward registry against Shirshal co-administration claim');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The Shelkopolis ward registry transit copy in Shirshal's archive is the third locality record to carry the same co-administration notation. The Shelkopolis registry governs all ward compliance petitions filed within Shelkopolis — the same petition system the Collegium override dismissed seven cases from. Shirshal's administrative notation on the Shelkopolis registry would grant the sub-registry access to the petition filing system itself. Not just the outcomes — the pipeline. Petitions could be visible to the sub-registry from the moment they were filed.`;
        addJournal('Shelkopolis ward registry: Shirshal co-administration notation grants sub-registry access to petition pipeline — petitions visible at filing, not just outcome', 'evidence', `shir-shelkop-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The Shelkopolis ward registry is a cross-jurisdiction record under a memorandum of understanding that requires both localities to authorize third-party access. The MOU is administered through the sub-registry. Access requires sub-registry clearance. The clearance request routes to the sub-registry. The sub-registry does not respond to public access requests for MOU-governed records. The door is locked by the same institution that holds the key.`;
        addJournal('Shelkopolis ward registry: MOU access requires sub-registry clearance — sub-registry holds key to sub-registry-governed records', 'complication', `shir-shelkop-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The Shelkopolis ward registry copy in Shirshal's archive carries the same co-administration notation as the Fairhaven and Guildheart files. Three localities, same notation, same override code. The Shelkopolis original at the Shelkopolis transit registry — visible through the shared filing index — shows no corresponding entry. Shirshal's copies claim authority that the originating localities don't acknowledge holding. The claims are self-authorizing.`;
        addJournal('Shelkopolis ward registry: 3rd locality with unreciprocated co-administration claim — Shirshal copies self-authorize, originals unaware', 'intelligence', `shir-shelkop-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Panim Haven's compliance clerk queried Shirshal six months ago. The reply wasn't from the Bureau.",
    tags: ['CrossLocality', 'Stage2'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'tracing Panim Haven compliance query response origin');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('charm', (G.skills.charm||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The Panim Haven clerk's query is in the shared compliance correspondence log — a record of inter-bureau communications accessible at the public desk. Her query asked for clarification on the co-administration notation she found on her own records. The response came back on Bureau letterhead with the correct stamp format, answered her question fully, and told her the notation was standard administrative procedure under the charter amendment. The reply was sent from the sub-registry address, not from any named Shirshal Bureau officer. Bureau letterhead, sub-registry origin. The response was designed to close the inquiry without leaving a traceable officer responsible for the answer.`;
        addJournal('Panim compliance query: response on Bureau letterhead sent from sub-registry address — designed to close inquiry with no accountable officer', 'evidence', `shir-panim-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The compliance correspondence log requires a cross-bureau authorization to access entries originating from other localities — standard privacy procedure. The authorization form is available at the desk; processing takes three business days. In three business days you will not be in Shirshal. The Panim Haven clerk's query and its response are in the log, but the log's cover sheet is visible enough to confirm the query exists. You know there was a query. You cannot read the reply without authorization you don't have time to obtain.`;
        addJournal('Compliance correspondence log: Panim query confirmed but reply requires 3-day cross-bureau authorization', 'complication', `shir-panim-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The correspondence log shows a Panim Haven query about the co-administration notation and a response sent back within three days. The response origin address is in the routing header — the Shirshal Bureau's address is listed in the "sent on behalf of" field, but the originating address in the technical header is a sub-registry notation. The response closed the Panim query. The Panim clerk apparently accepted it. The routing header would not be obvious to someone reading the letter rather than the technical record.`;
        addJournal('Panim compliance response: "sent on behalf of" Bureau but originated from sub-registry — routing header reveals substitution', 'intelligence', `shir-panim-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Three Fairhaven glyph surge reports list a Shirshal case number. Shirshal denies it exists.",
    tags: ['CrossLocality', 'Stage2'],
    xpReward: 78,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(78, 'cross-checking Fairhaven glyph surge case numbers against Shirshal bureau records');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The Fairhaven surge reports reference Shirshal case number 4471-S — a case number in the format used for inter-bureau compliance investigations. Shirshal's public case registry has no entry for 4471-S. The case number format for that series would place it between two numbered cases that are in the registry and share nothing in common with glyph surge events. The number was issued and assigned to the Fairhaven reports, then stripped from the Shirshal registry. A case existed, was assigned this number, and was then removed from the record while the Fairhaven reports that referenced it were left intact. The removal was not complete.`;
        addJournal('Fairhaven surge reports cite Shirshal case 4471-S — case stripped from Shirshal registry but Fairhaven cross-references survive', 'evidence', `shir-casenumber-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The Shirshal case registry query triggers an automated cross-check against the Collegium's case management system when the number you entered doesn't return a match. The cross-check generates a "missing case number" alert in the administrative monitoring queue — an anti-fraud measure designed to flag tampered registries. The alert will be reviewed by the Bureau's internal compliance team. Your name is attached to the query that triggered it. The alert is also visible to whoever monitors the administrative queue, which routes through the sub-registry oversight function.`;
        addJournal('Case registry query triggered missing-number alert — name attached, alert visible to sub-registry oversight function', 'complication', `shir-casenumber-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Fairhaven surge reports cite Shirshal case 4471-S. The Shirshal registry has no 4471-S — the surrounding case numbers exist on either side of the gap. Either the case was never properly filed, or it was filed and removed. The case number format for that series is specifically for inter-bureau compliance reviews. Fairhaven was told a compliance case existed. Whatever that case contained is no longer accessible from the registry end.`;
        addJournal('Case 4471-S cited in Fairhaven reports but absent from Shirshal registry — inter-bureau compliance format, apparent removal', 'intelligence', `shir-casenumber-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "A carrier remembers the last shipment he couldn't ask questions about. He remembers everything.",
    tags: ['CrossLocality', 'Stage2'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'interviewing northern route carrier about suppressed shipment');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('vigor', (G.skills.vigor||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The carrier — Sev Maltrath, ten years on the northern route, knows every grade change, every water point, every patrol timing — describes the shipment without prompting once you say the sub-registry notation aloud. Six crates, each sealed with a wax mark he has never seen before or since. Delivery to a way station that appeared on no map he was given. Two riders from the staging district met him at a junction that wasn't marked in his instructions — the instructions he was given told him to wait at that junction without explaining why anyone would know he was there. "Somebody already knew the route I was running." The riders didn't introduce themselves. They signed with initials only.`;
        addJournal('Carrier Sev Maltrath: secret waystation delivery, unmapped junction, riders signed with initials — staging district pre-knew his route', 'evidence', `shir-carrier-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The carrier is at the staging post water trough with his horse and does not want to be approached by someone who uses the sub-registry notation out loud at a public post. He does not say this. He says he is between runs and needs to focus on the horse. The speed with which he finds tasks to attend to, the angle he maintains away from your position, the once-only look over his shoulder as he leads the horse into the stable — these are the answer. He will not be findable at this post again today.`;
        addJournal('Northern route carrier — declined contact at staging post, recognizes sub-registry notation', 'complication', `shir-carrier-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The carrier confirms one shipment — crates, sealed, delivery at an unmarked junction. He will not name the staging point or the riders. What he confirms: the delivery pre-supposed route knowledge he was given only on departure day. Someone had the route before it was issued to him. The wax seal on the crates he describes using the same word Luneth used for the undeclared packages: "blank. No mark I'd ever seen for a shipper." Same language, different end of the same supply chain.`;
        addJournal('Northern carrier: delivery required advance route knowledge — seal described as "blank," language matches Luneth account', 'intelligence', `shir-carrier-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  // HEAT / AUTHORITY PRESSURE (~3)

  {
    label: "A Bureau oversight auditor has arrived. Her case list includes my name.",
    tags: ['Heat', 'Authority', 'Stage2'],
    xpReward: 82,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(82, 'managing Bureau oversight auditor inquiry');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('charm', (G.skills.charm||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.oversight_auditor_managed = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Auditor Penhe Varast interviews in a side room, a pen in her left hand and a case index in her right. Your name is three entries from the top, flagged with a notation you cannot read upside down. The interview opens with her confirming your origin and stated purpose. What follows reveals she already knows every public access log entry since you arrived. She is not trying to stop you — she is building a record of everything you have found, because it is also what she is looking for. At the close: "Complete your work before the end of the week. Oversight windows close." She means her own.`;
        addJournal('Auditor Penhe Varast: reviewing same evidence trail — recommends completing work before oversight window closes', 'evidence', `shir-auditor-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 3;
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `Auditor Varast requests your travel documents before the interview begins and retains them for the duration while a secondary auditor copies the entry and exit stamps. The interview covers every access log entry in order. At its close, your documents are returned with a temporary restriction notation — you are required to present yourself to the Bureau's duty desk within forty-eight hours for a follow-up compliance confirmation. The restriction is not an arrest. It is a leash, and the leash is tied to the Bureau's duty desk schedule, which the sub-registry can view.`;
        addJournal('Auditor interview: travel documents copied, 48-hour compliance confirmation required — restriction notification routed to sub-registry', 'complication', `shir-auditor-fail-${G.dayCount}`);
      } else {
        G.flags.oversight_auditor_managed = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Auditor Varast confirms your presence on her case list without explaining the reason for it. The interview is thirty minutes of questions about your access log and stated purpose. She asks nothing you can't answer with public-record access as the justification. At the close: she notes your file will remain open while you are in Shirshal. The note goes into the case index. The index is hers, not the sub-registry's. The distinction may matter.`;
        addJournal('Auditor Varast: file open while in Shirshal — index is hers, not sub-registry, distinction noted', 'intelligence', `shir-auditor-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The Bureau's heat on this wing has doubled since the charter amendment came up.",
    tags: ['Heat', 'Stage2'],
    xpReward: 65,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(65, 'assessing heightened Bureau surveillance of archive wing');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('finesse', (G.skills.finesse||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The patrol pattern in the archive wing has changed since the charter amendment request was flagged three days ago — the patrol interval dropped from forty minutes to twenty, and a second warden was added to the restricted section corridor during peak access hours. The warden assignments changed the same day the amendment query was logged. The response is not the behavior of a routine security upgrade; it was triggered, and the trigger was the query. Whoever monitors the access logs can also direct patrol resources. The archive wing is being managed in response to your presence in it.`;
        addJournal('Archive wing patrol doubled after charter amendment query — warden resources directed by access log monitor', 'evidence', `shir-heat-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `The second warden is watching the watching — a function the Bureau uses when someone is suspected of mapping patrol patterns. The warden's position shifts each time you find a good angle on the restricted wing, not in a random rotation but in response to your movement. You have been observed observing. The report that goes up will describe exactly which angles you tested and the approximate timing. Your patrol-mapping attempt is now part of someone else's pattern analysis.`;
        addJournal('Warden observed surveillance attempt — counter-surveillance in effect, angles and timing logged', 'complication', `shir-heat-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The patrol interval in the wing has shortened noticeably — twenty minutes where it was forty before. The timing shift is observable across three patrol cycles without drawing attention. Whether the change preceded your arrival or followed it is not determinable from the outside. What is determinable: the restricted section and the main stack aisles now receive equal patrol attention, where previously the restricted section received more. The surveillance has been redistributed, not increased, which means someone decided the open stacks needed watching too.`;
        addJournal('Archive patrol redistributed to cover open stacks — restricted section and main aisle now equally monitored', 'intelligence', `shir-heat-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "A Magistratus man sits in the Bureau lobby since the courier intercept. Not reading.",
    tags: ['Heat', 'Authority', 'Stage2'],
    xpReward: 78,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(78, 'evading Magistratus surveillance in Bureau lobby');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('finesse', (G.skills.finesse||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.magistratus_observer_evaded = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `He is positioned to observe both the archive wing entrance and the main corridor from the same seat — the only chair in the lobby that accomplishes both angles. His report materials are open on his lap and unread: the same page has been face-up for ninety minutes. The exit to the courier staging area is behind him and requires passing within three feet of his right side. There is a secondary exit through the compliance shrine annex that connects the Bureau building to the shrine's public corridor — the connection is structural, not administrative, and his sight line doesn't reach it. You use it. He is still watching the main corridor when the shrine bell marks the hour.`;
        addJournal('Magistratus lobby observer evaded via shrine annex — secondary exit not in his sight line', 'evidence', `shir-magistratus-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `He stands when you pass his chair, not abruptly — unhurried, the way someone does when they have been waiting for a specific moment and it has arrived. "Magistratus duty inquiry." He produces a credential and your name from two separate pockets with the same practiced calm. The inquiry is brief. You are not detained. But his counterpart is waiting at the building exit and has a second copy of the same credential. The inquiry is in the Magistratus daily record before you reach the street. The record is shared with the Bureau duty desk at end of day.`;
        addJournal('Magistratus observer initiated duty inquiry — exit monitored, record shared with Bureau duty desk', 'complication', `shir-magistratus-fail-${G.dayCount}`);
      } else {
        G.flags.magistratus_observer_evaded = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The shrine annex connection works on the first attempt. He is still in the lobby chair when the annex door closes behind you — visible through the annex window for the two seconds the angle is right. He has not moved. You are out of the building and moving north before the next patrol cycle begins. The exit route is now one you cannot use twice. He will notice, eventually, that the person he was watching did not come back out the main door.`;
        addJournal('Magistratus observer evaded via shrine annex — route single-use, observer will note the disappearance', 'intelligence', `shir-magistratus-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Coordinated evidence management confirmed. Bureau director or route around it — both paths are open.",
    tags: ['Investigation', 'Finale', 'Stage2', 'Consequence', 'Meaningful'],
    xpReward: 110,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(110, 'Shirshal Stage 2 resolution');
      if (!G.investigationProgress || G.investigationProgress < 8) {
        G.lastResult = `The threads are there but the evidence chain has gaps. Acting now would produce a record, not a result. The Bureau director would ask questions you don't yet have answers for, and the gaps would be used to file the matter rather than pursue it. The Shirshal administrative wing will not be moved by an incomplete picture — this polity runs on documentation, and the documentation is not yet complete enough to force a response.`;
        G.recentOutcomeType = 'partial'; return;
      }
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.charm||0) + Math.floor(G.level/2));
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
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Seal degradation rates don't match the recorded dates — these pages are too new",
    tags: ['Stage2', 'Investigation'],
    skill: 'spirit',
    xpReward: 80,
    fn: function() {
      var result = rollD20('spirit', {dc: 13, locality: 'shirshal', label: 'Document dating analysis'});
      if (result.isCrit) {
        G.stageProgress[2]++;
        addJournal('Font degradation analysis: 14 pages in the compliance ledger are less than 8 months old but carry dates from three years prior. Retroactive document insertion.', 'evidence');
        G.lastResult = 'Font degradation does not lie about physical age. Fourteen pages in this ledger are physically less than eight months old — the ink\'s oxidation depth, the paper fiber compression, the seal impression softness all point to recent production. But they carry dates from three years prior and slot into the compliance record as if they have always been there. The record was not falsified by removing evidence. It was fabricated in retrospect, one page at a time, inserted into the binding to replace what had been there before.';
      } else if (result.isFumble) {
        G.lastResult = 'The analysis requires better light than the reading room provides — the overhead panels wash out the subtle depth differences in the seal impression that would confirm fabrication. You ask the duty archivist for a lamp without specifying why. She brings it promptly and lingers long enough to read the angle of the ledger in your hands and the page you have it open to. She does not ask. She notes it. The thing you were examining is now something she has seen you examine.';
      } else if (result.isSuccess) {
        G.stageProgress[2]++;
        G.lastResult = 'At least half a dozen pages are measurably newer than their listed dates — the degradation differential between the surrounding pages and the insertions is clear enough to read without instruments if you know what to look for. The binding thread around those pages is also newer, a slightly different color under the right angle of light. Someone inserted pages into a historical compliance record and re-bound the affected sections. The surrounding pages are authentic. The inserted ones are not.';
      } else {
        G.lastResult = 'Inconclusive without a comparison sample from the same paper batch — the compliance ledger uses a standard administrative stock that could be sourced from multiple suppliers, and without a reference sheet from the claimed production period, the degradation differential cannot be distinguished from batch variation. The anomaly is visible but not provable from this direction alone. A different approach, or access to the paper supply records, might close the gap.';
      }
    }
  },
  {
    label: "The records officer stopped searching. He's waiting for me to leave.",
    tags: ['Stage2', 'Confrontation'],
    skill: 'might',
    xpReward: 72,
    fn: function() {
      var result = rollD20('might', {dc: 13, locality: 'shirshal', label: 'Records officer confrontation'});
      if (result.isCrit) {
        G.stageProgress[2]++;
        addJournal('Records officer confirmed: a standing hold order on archival requests for pre-consolidation era documents, placed by the current compliance head.', 'evidence');
        G.lastResult = 'You name the stall precisely and without accusation: you have stopped searching and are waiting for the visit to end. The description is accurate enough that he drops the performance entirely — there is a brief pause, the kind that precedes a decision, and then he sets down the folder he was not reading. The hold on pre-consolidation archival requests was placed by the compliance head six weeks after the consolidation was formalized. He gives you the administrative order number without being asked twice.';
      } else if (result.isFumble) {
        addHeat('shirsh', 1);
        G.lastResult = 'He escalates to a supervisor without escalating his voice — a hand signal to someone at the far desk, the practiced efficiency of a man who has done this before and prefers to keep it administrative. You exit before the confrontation formalizes into something that generates a report with your name attached. The access log will still show your presence at this counter and the duration of the visit. That much is already recorded.';
      } else if (result.isSuccess) {
        G.stageProgress[2]++;
        G.lastResult = 'The confrontation is enough to end the theater. He admits he cannot produce the records — not because they do not exist, and not because they have been destroyed, but because they carry a hold status he does not have the clearance level to override. The hold is formal, placed from above, and his role is to absorb the encounter and keep the request from going anywhere else. He will not tell you who placed the hold. He will confirm that someone did.';
      } else {
        G.lastResult = 'He maintains the performance without strain — the stall is practiced enough that naming it directly does not crack it. Whatever order he follows comes from someone whose authority over him is larger and more immediate than anything you can currently represent. He will absorb the confrontation and file it as a routine difficult-visitor encounter. The exit is yours to take; the records remain inaccessible.';
      }
    }
  },
  {
    label: "The auditor has run this review loop three years without resolution.",
    tags: ['Stage2', 'Social'],
    skill: 'charm',
    xpReward: 74,
    fn: function() {
      var result = rollD20('charm', {dc: 13, locality: 'shirshal', label: 'Auditor rapport'});
      if (result.isCrit) {
        G.stageProgress[2]++;
        addJournal('Senior compliance auditor confirmed that flagged anomaly reports are filed, reviewed, and returned with insufficient basis for action regardless of contents. The review process is a mechanism for burying findings.', 'evidence');
        G.lastResult = 'She laughs at something that stopped being funny two years ago — a short, flat sound that carries three years of professional futility in it. The anomaly review process is not a dead end, she explains. That would imply failure. It is the point. Every flag filed is a flag contained: accepted, reviewed, returned to the filer with insufficient basis for escalation, and removed from active concern. She knows exactly how it works because she has kept filing the flags. She wanted to see if the answer would ever change. It has not.';
      } else if (result.isFumble) {
        G.lastResult = 'She has heard the sympathetic approach before — enough times to recognize it for what it is the moment it starts. People looking for something to use tend to arrive with warmth first and questions second, and she has learned to count the gap between the two. She closes off entirely before the gap opens, and does it politely, which is worse than hostility because it leaves no surface to push against. The door stays shut.';
      } else if (result.isSuccess) {
        G.stageProgress[2]++;
        G.lastResult = 'She will not give names — that is a line she has drawn clearly for herself and does not cross. But she gives you a number: the percentage of anomaly reports filed through the standard review process that have ever resulted in a formal escalation. She states it without inflection. It is zero. Not near zero. Zero across three years and every category of report she has access to. She watches your face to see if that lands.';
      } else {
        G.lastResult = 'She is professionally warm and says nothing actionable — the warmth is real, but it lives in the register of someone who has practiced keeping it separate from disclosure. She discusses the review process in general terms with apparent candor. Every answer is technically informative and practically useless. The walls stay up, and they stay up pleasantly, which is the most effective way to hold them.';
      }
    }
  },

];

window.SHIRSHAL_STAGE2_ENRICHED_CHOICES = SHIRSHAL_STAGE2_ENRICHED_CHOICES;
