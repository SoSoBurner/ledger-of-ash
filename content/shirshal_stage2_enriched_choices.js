/**
 * SHIRSHAL STAGE 2 ENRICHED CHOICES
 * Investigation arc: compliance investigation bureau / cross-locality evidence suppression
 * NPCs: Tazren Coilspire (Senior Investigator), Mirae Coilspire (Innkeeper),
 *       Khalis Coilspire (Market Clerk), Sivren Coilspire (Shrine Attendant), Luneth Coilspire (Porter)
 */

const SHIRSHAL_STAGE2_ENRICHED_CHOICES = [

  {
    label: "Tazren Coilspire at the Investigation Bureau has an open case file that overlaps with every thread you've been pulling — compare notes.",
    tags: ['Investigation', 'Stage2', 'Meaningful'],
    xpReward: 84,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(84, 'cross-referencing with Bureau investigator Tazren Coilspire');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('persuasion', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_tazren_coilspire = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `Tazren pulls the copy from a locked drawer, not the filing cabinet. Eight months of work: the sealed charter pattern, the Fairhaven staging point, the glyph surge correlation — all named, all dated. He was pulled from the case six months ago and told the file was archived. "Archived means it stops. I wasn't finished." He slides the copy across the desk without ceremony. The pages are organized. He was waiting for someone to ask.`;
        addJournal('Bureau investigator Tazren — 8-month parallel case file shared, case was suppressed', 'evidence', `shir-tazren-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `Tazren listens to your first two sentences and reaches for his visitor log without looking up. "Knowing the specifics of a Bureau investigation thread without credentials is a concern I'm required to document." He copies your name in a neat hand and asks for origin papers with the flat efficiency of someone who has run this procedure before and does not enjoy it. A summary of the visit is on its way to his supervisory chain before the conversation has properly ended. Whatever goodwill this interview might have built has been spent on a protocol note.`;
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
      const result = rollD20('stealth', (G.skills.stealth||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_luneth_coilspire = true;
        G.investigationProgress++;
        G.lastResult = `Luneth traces the three packages through his transfer log with practiced speed. All marked "received — archive." The receiving address is a sub-registry notation that doesn't appear in the Bureau's official branch directory — he's checked twice. He maps the address against a regional index and holds the result up without speaking. The notation places it in the same northern staging district that came up in the Fairhaven thread.`;
        addJournal('Evidence transfers to unlisted sub-registry — maps to northern staging district', 'evidence', `shir-luneth-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Luneth pulls the request form and stops. The transfer records are under retention audit this week — standard cycle, nothing unusual on paper. Except your request triggers a hold on the specific packages in question, freezing access for thirty days. Luneth looks at the hold notice with the particular expression of someone who has just understood something they didn't want to. The audit timing selected for these packages.`;
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
      const result = rollD20('craft', (G.skills.craft||0) + Math.floor(G.level/3));
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
      const result = rollD20('persuasion', (G.skills.persuasion||0) + Math.floor(G.level/3));
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
      const result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
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
      var roll = rollD20('lore', G.skills.lore);
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
      var roll = rollD20('survival', G.skills.survival);
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
      var roll = rollD20('stealth', G.skills.stealth);
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
      var roll = rollD20('stealth', G.skills.stealth);
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
      var roll = rollD20('persuasion', G.skills.persuasion);
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
      var roll = rollD20('lore', G.skills.lore);
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
      const result = rollD20('persuasion', (G.skills.persuasion||0) + Math.floor(G.level/2));
      if (result.total >= 14 || result.isCrit) {
        G.flags.stage2_finale_institutional = true;
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 3;
        G.lastResult = `You go directly to the Director's office with the full chain laid out in sequence: Tazren's suppressed file, Luneth's delivery gap, Khalis's override-cleared flags, Sivren's inverted timeline, Mirae's off-roster visitor schedule. The Director reads for eleven minutes without speaking. Then: "Priority review. Tazren's case is reinstated as of this morning." The suppression operation now has a formal Bureau record. What comes next begins with institutional backing behind it.`;
        addJournal('Shirshal S2 finale: Bureau Director reinstates suppressed case', 'evidence', `shir-finale-inst-${G.dayCount}`);
      } else {
        G.flags.stage2_finale_underworld = true;
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 3;
        G.lastResult = `The Director meeting doesn't happen — the supervisors who buried Tazren's case are between you and the Director's door. Instead you copy the file tonight and hand the copies to the Verdant Row network before dawn. The compliance record inversion goes with it, addressed to every node on the investigative chain. By midday, the suppression operation no longer has cover. The pressure will increase. The operation is now exposed and moving.`;
        addJournal('Shirshal S2 finale: case file distributed through Verdant Row', 'evidence', `shir-finale-uw-${G.dayCount}`);
      }
      G.flags.stage2_faction_contact_made = true;
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

];

window.SHIRSHAL_STAGE2_ENRICHED_CHOICES = SHIRSHAL_STAGE2_ENRICHED_CHOICES;
