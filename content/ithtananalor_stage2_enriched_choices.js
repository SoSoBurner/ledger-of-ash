/**
 * ITHTANANALOR STAGE 2 ENRICHED CHOICES
 * Investigation arc: ghost ore accounts, Shadowhands involvement, enforcement culture corruption
 * NPCs: Captain Darian Roaz (ORE Supreme Commander), Sir Velden Ironspike (Shadowhands Commander),
 *       Harlan Ironspike (Innkeeper), Ivena Ironspike (Market Clerk), Brenn Ironspike (Shrine Attendant)
 */

const ITHTANANALOR_STAGE2_ENRICHED_CHOICES = [

  {
    label: "Review the ore account ledgers at the Iron Ledger Ward — three ghost accounts have been flagged but not investigated.",
    tags: ['Investigation', 'Stage2', 'Meaningful'],
    xpReward: 82,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(82, 'reviewing iron ledger ghost accounts');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      const arch = G.archetype && G.archetype.group;
      if (result.isCrit) {
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = arch === 'stealth'
          ? `The ghost accounts are cleaner than real accounts. That is the tell. Real accounts accumulate errors. These three are too precise — entered by someone who knows the ledger system better than a casual operator. Shadowhands training includes exactly this kind of financial tradecraft.`
          : `Three accounts with no registered owner, no ore delivery records, and consistent quarterly receipts. The pattern is unmistakable: the accounts are being used to launder ore revenue outside the official quota system. Someone with enforcement access authorized the original registrations.`;
        addJournal('Ghost ore accounts confirmed — enforcement authorization', 'evidence', `ith-ledger-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `Your access to the Iron Ledger Ward triggers an automatic inspection protocol. Your credentials are logged and a Shadowhands duty officer is notified. You exit with nothing and a new entry in the enforcement record.`;
        addJournal('Ledger access logged — Shadowhands notified', 'complication', `ith-ledger-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.lastResult = `Two of the three accounts are clearly ghost entries. The third has enough legitimate transaction noise to be unclear. Two confirmed ghosts are enough to establish the pattern.`;
        addJournal('Two ghost accounts confirmed — third ambiguous', 'evidence', `ith-ledger-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Approach Ivena Ironspike at the Licensed Goods Counter — she processes every registered transaction and will have seen the ghost account activity.",
    tags: ['NPC', 'Persuasion', 'Stage2', 'Meaningful'],
    xpReward: 78,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(78, 'questioning Ivena Ironspike');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('persuasion', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_ivena_ironspike = true;
        G.investigationProgress++;
        G.lastResult = `Ivena has been waiting for someone to ask. She has documented 34 transactions routed through accounts she cannot trace to any registered owner. Each transaction is within the legal threshold that would trigger an automatic audit — by exactly one unit below that threshold. Someone calculated the maximum invisible transaction size.`;
        addJournal('Ivena documents — calibrated threshold evasion confirmed', 'evidence', `ith-ivena-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Ivena asks who authorized your access to goods counter records. Your answer is insufficient. The question is logged in the counter security record.`;
        addJournal('Goods counter access questioned — logged', 'complication', `ith-ivena-fail-${G.dayCount}`);
      } else {
        G.flags.met_ivena_ironspike = true;
        G.investigationProgress++;
        G.lastResult = `Ivena confirms irregular transactions but speaks carefully. "I process what comes to me. What is above me is not my function." She says it with enough repetition to tell you this statement was practiced.`;
        addJournal('Ivena confirms irregularities — careful deflection', 'evidence', `ith-ivena-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Sir Velden Ironspike commands the Shadowhands — the ghost accounts point toward his unit's involvement. Request a formal meeting.",
    tags: ['NPC', 'Combat', 'Authority', 'Stage2', 'Meaningful'],
    xpReward: 90,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(90, 'confronting Shadowhands commander');
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      if (!G.factionHostility) G.factionHostility = {};
      if (!G.rivalId) G.rivalId = 'warden_captain';
      const result = rollD20('combat', (G.skills.combat||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_velden_ironspike = true;
        G.flags.stage2_faction_contact_made = true;
        G.worldClocks.rival = (G.worldClocks.rival||0) + 1;
        G.lastResult = `Velden receives you with the kind of careful attention that tells you he has already read your investigation file. He neither confirms nor denies Shadowhands involvement in the accounts. But he gives you one thing: the name of the duty officer who would have processed the original account registrations. That officer was transferred six months ago. To a posting with no public record.`;
        addJournal('Velden meeting — transferred officer name obtained', 'evidence', `ith-velden-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.rival = (G.worldClocks.rival||0) + 2;
        G.factionHostility.warden_order = (G.factionHostility.warden_order||0) + 2;
        G.lastResult = `Velden has you removed from the Shadowhands Wing before the meeting begins. A formal security note is filed. The Roazian enforcement apparatus now treats your investigation as a hostile operation.`;
        addJournal('Shadowhands — investigation classified as hostile', 'complication', `ith-velden-fail-${G.dayCount}`);
      } else {
        G.flags.met_velden_ironspike = true;
        G.worldClocks.rival = (G.worldClocks.rival||0) + 1;
        G.lastResult = `Velden grants you three minutes. He says nothing directly about the accounts but his reactions confirm the Shadowhands have operational knowledge of them. The question is whether the involvement is authorized or rogue.`;
        addJournal('Velden meeting — Shadowhands knowledge confirmed, intent unclear', 'evidence', `ith-velden-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Brenn Ironspike at the Justice Shrine has witnessed unusual evening proceedings at the enforcement quarter — ask what they have seen.",
    tags: ['NPC', 'Lore', 'Stage2', 'Meaningful'],
    xpReward: 74,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'questioning Brenn Ironspike shrine keeper');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('persuasion', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_brenn_ironspike = true;
        G.investigationProgress++;
        G.lastResult = `Brenn speaks at the shrine threshold where conversations are protected by civic ritual. Three times in the past two months, enforcement officers conducted unscheduled processing procedures at the quarter after the civic compliance cycle ended. The procedures were logged as "containment review" — a classification that bypasses normal oversight.`;
        addJournal('Brenn confirms after-hours containment reviews — oversight bypass', 'evidence', `ith-brenn-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The shrine context does not insulate Brenn from enforcement authority. A Shadowhands officer passing the shrine hears enough of the exchange to intervene. The conversation ends abruptly.`;
        addJournal('Shrine conversation interrupted by Shadowhands', 'complication', `ith-brenn-fail-${G.dayCount}`);
      } else {
        G.flags.met_brenn_ironspike = true;
        G.investigationProgress++;
        G.lastResult = `Brenn confirms unusual evening activity and describes the participants as enforcement officers without visible unit identification — which in Ithtananalor means Shadowhands.`;
        addJournal('Brenn confirms unidentified enforcement evening activity', 'evidence', `ith-brenn-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Harlan Ironspike's Enforcement Quarter Inn is where off-duty Shadowhands officers stay — observe their behavior over an evening.",
    tags: ['Stealth', 'NPC', 'Stage2', 'Meaningful'],
    xpReward: 78,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(78, 'observing enforcement quarter inn');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('stealth', (G.skills.stealth||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_harlan_ironspike = true;
        G.investigationProgress++;
        G.lastResult = `You position at the inn's edge table and observe four hours of off-duty officer conversation. One conversation is significant: two officers discuss a "verification window closing" at the ore registry in terms that make clear they know the ghost accounts exist and have a timeline for extracting value before the next formal audit.`;
        addJournal('Inn observation — extraction timeline overheard', 'evidence', `ith-harlan-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `Your observation position is identified by a trained officer. You leave under escort and are formally noted as a surveillance risk in the enforcement quarter log.`;
        addJournal('Inn surveillance detected — enforcement risk log', 'complication', `ith-harlan-fail-${G.dayCount}`);
      } else {
        G.flags.met_harlan_ironspike = true;
        G.investigationProgress++;
        G.lastResult = `Nothing explicitly incriminating overheard. But the conversational patterns between specific officer pairs suggest a shared operational knowledge that goes beyond standard unit communication.`;
        addJournal('Inn observation — officer group cohesion suggests operational knowledge', 'evidence', `ith-harlan-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The illicit magic enforcement culture in Ithtananalor has created a shadow market — access it to find the ghost account endpoints.",
    tags: ['Stealth', 'Survival', 'Stage2', 'Meaningful'],
    xpReward: 84,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(84, 'accessing Ithtananalor shadow market');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('stealth', (G.skills.stealth||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `The shadow market uses the illicit magic trade as cover. The ghost account endpoints are purchasing suppressed arcane materials — specifically materials classified under the anti-magic statute that would be unusable without enforcement-level access to bypass the containment protocols. The accounts are moving contraband through the enforcement system itself.`;
        addJournal('Ghost accounts purchasing contraband through enforcement bypass', 'evidence', `ith-shadow-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 2;
        G.lastResult = `You are identified as an outsider in the shadow market immediately. The consequence is a Shadowhands unit following your movements for 48 hours. You lose the surveillance window entirely.`;
        addJournal('Shadow market identification — 48hr Shadowhands surveillance', 'complication', `ith-shadow-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.lastResult = `You find the shadow market but can only observe peripherally. Enough to confirm arcane contraband is moving through channels that require enforcement authorization. The specific accounts are not visible at this access level.`;
        addJournal('Shadow market confirmed — arcane contraband through enforcement channels', 'evidence', `ith-shadow-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Captain Darian Roaz heads ORE Supreme Command — either an ally against internal corruption or the source of it. Make an assessment before contact.",
    tags: ['Combat', 'Investigation', 'Personal', 'Stage2', 'Meaningful'],
    xpReward: 88,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(88, 'assessing Captain Darian Roaz');
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const arch = G.archetype && G.archetype.group;
      const result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.captain_roaz_assessed = true;
        G.flags.stage2_faction_contact_made = true;
        G.lastResult = arch === 'combat'
          ? `Your assessment of Roaz's public record and command decisions reveals a consistent pattern of internal accountability — cases where he sanctioned officers above his direct command. The ghost accounts contradict his documented command culture. He is either being bypassed or his record is cover. A direct meeting is now worth the risk.`
          : `The assessment reveals that Roaz's authority has been systematically narrowed over the past six months by administrative reassignments that removed his oversight over the exact departments where the ghost accounts operate. Someone prepared for an internal investigation.`;
        addJournal('Roaz assessment — either bypassed or cover exists', 'evidence', `ith-roaz-assess-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your assessment methodology is visible enough that Roaz's staff notices the pattern of records access. You have been noticed assessing command leadership without authorization.`;
        addJournal('Command assessment detected — unauthorized review noted', 'complication', `ith-roaz-fail-${G.dayCount}`);
      } else {
        G.flags.captain_roaz_assessed = true;
        G.lastResult = `Roaz's record is clean and consistent. The evidence against his unit's accounts is real. Either he doesn't know or the corruption is operating below his visibility threshold. Assessment inconclusive — direct contact needed.`;
        addJournal('Roaz assessment — inconclusive, direct contact warranted', 'evidence', `ith-roaz-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Ivena's practiced deflection was a rehearsed line — she rehearses lines when she has something to protect",
    tags: ['stage2', 'ithtananalor'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      var roll = rollD20('persuasion', G.skills.persuasion);
      if (roll.total >= 13) {
        G.flags.ivena_second_contact = true;
        G.investigationProgress++;
        addNarration('Ivena — Second Approach', 'You find her at the Licensed Goods Counter near closing hour, when the queue has thinned. Her thumb traces the edge of a transaction stamp without pressing it. When you mention the threshold calibration — the one-unit margin — she sets the stamp down with too much precision. She says she once filed a discrepancy report through the internal channel. The report was returned to her desk the following morning with no routing record and a single word crossed through: "resolved."');
        addJournal('Ivena filed a discrepancy report — returned without routing, marked resolved', 'evidence');
        maybeStageAdvance();
      } else {
        addNarration('Ivena — Closed Door', 'She sees you coming this time. By the time you reach the counter she has a queue citation form ready and her eyes fixed on the seal press. The practiced statement surfaces again, word for word, same cadence. Whatever opened briefly last time has closed.');
      }
    }
  },

  {
    label: "The foundry loading dock runs night shifts — unmarked crates move through here when the quota ledger says nothing is moving",
    tags: ['stage2', 'ithtananalor'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      var roll = rollD20('lore', G.skills.lore);
      if (roll.total >= 13) {
        G.investigationProgress++;
        addNarration('Foundry Dock — Night Manifest', 'The dock manifest board runs in two columns: daytime shipments in black ink with quota stamps, night entries in red with a classification mark you do not recognize. You copy three red entries. The weight figures in the red column do not correspond to any ore grade in the public extraction registry — the loads are too light for raw ore, too heavy for refined ingot. A fourth entry has been physically cut from the board and pasted over. The paper underneath is a different weight.');
        addJournal('Foundry night manifest — unregistered weight class, one entry physically excised', 'evidence');
        maybeStageAdvance();
      } else {
        addNarration('Foundry Dock — Watched', 'A labor foreman notices you at the manifest board before you can copy anything. He does not ask what you are doing. He simply stands beside the board until you move away, one hand resting on the quota stamp rack, his expression the particular blankness of someone who has learned not to witness things.');
      }
    }
  },

  {
    label: "The checkpoint officer clocked my hesitation — in Ithtananalor that hesitation is already a record",
    tags: ['stage2', 'ithtananalor'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      var roll = rollD20('stealth', G.skills.stealth);
      if (roll.total >= 13) {
        G.investigationProgress++;
        addNarration('Checkpoint — Controlled Entry', 'You present credentials before the officer asks. The seal gets checked twice — that is standard — but you keep your weight forward and your eyes on the gate frame rather than the officer\'s hands, the way locals do when they have nothing to hide and are mildly bored by the process. He logs you through without a secondary notation. On the other side, the administrative wing archive is accessible for the next two hours without an escort requirement.');
        addJournal('Administrative wing archive accessed without escort — two-hour window', 'discovery');
        maybeStageAdvance();
      } else {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
        addNarration('Checkpoint — Secondary Notation', 'The pause before answering is half a second too long. The officer does not escalate but his stylus adds a line to the log beneath your entry. Secondary notation: purpose unclear. In Ithtananalor that line follows your credentials to every checkpoint you pass today.');
      }
    }
  },

  {
    label: "The archive's binding-law index bleeds into the enforcement catalogue at one seam",
    tags: ['stage2', 'ithtananalor', 'Archive', 'Meaningful'],
    xpReward: 82,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(82, 'working the archive classification seam');
      const result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure++;
        G.lastResult = `The seam is real. Four case numbers cross-reference between oath-binding precedent and enforcement disposition — soldiers declared oath-breakers in the same month the ghost accounts first cleared. The disposition entries are redacted to a single line each. The redaction pattern is identical across all four. One hand did this work under institutional pressure, one shift, one authorization code. The index preserves the shape of what was removed.`;
        addJournal('Archive seam: four oath-breaker dispositions redacted under one authorization', 'evidence', `ith-archive-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `The cross-reference request triggers the archive's internal flag. A senior registrar arrives at the reading carrel without being summoned, which tells you the flag reaches further than the reading room. Your query slip is retained and noticed. The entries you were pulling are not, and you leave under new watchful attention.`;
        addJournal('Archive cross-reference flagged — registrar intervention', 'complication', `ith-archive-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.lastResult = `The indexes intersect, but the access tier you have grants headers only. Four case numbers appear in both catalogues. The headers are benign. The bodies require a clearance you cannot invent from a public seal. Enough to know the seam is real. Not enough to open it.`;
        addJournal('Archive seam located — four cross-referenced cases behind higher access', 'evidence', `ith-archive-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "A second perimeter circles the Ledger Ward — unmarked, paired, started after my query",
    tags: ['stage2', 'ithtananalor', 'Stealth', 'Meaningful'],
    xpReward: 80,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(80, 'reading the second perimeter');
      const result = rollD20('stealth', (G.skills.stealth||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.ith_second_perimeter_read = true;
        G.investigationProgress++;
        G.lastResult = `From a balcony above the ward's eastern approach, the rotation resolves. Six officers working in pairs, forty-minute swaps, hand-off at the fountain where no clerk can see them. One officer in every pair wears gloves indoors — Shadowhands courier tell, a grip-safety habit from handling sealed pouches. They are not watching the ward. They are watching who approaches the terminals where your queries land.`;
        addJournal('Second perimeter is query-reactive, not ward-reactive — surveillance targets you', 'intelligence', `ith-perimeter-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `The balcony is covered from an angle you did not check. An officer below lifts a gloved hand and taps twice against his thigh — signal to a partner you cannot see. You leave before the partner closes. Whatever pattern existed has now been redrawn around the knowledge that you saw it.`;
        addJournal('Perimeter observation burned — rotation reconfigured', 'complication', `ith-perimeter-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.lastResult = `The rotation is there. Forty-minute intervals, pair-based, unmarked. You confirm the pattern exists before leaving the balcony. What you cannot confirm from this vantage is whether the pairs are watching the ward or watching a specific class of visitor. The distinction matters. Both need different responses.`;
        addJournal('Second perimeter confirmed — targeting unclear', 'intelligence', `ith-perimeter-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The same officer has stood at Brenn's shrine threshold three mornings running",
    tags: ['stage2', 'ithtananalor', 'NPC', 'Persuasion', 'Meaningful'],
    xpReward: 78,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(78, 'checking on Brenn under pressure');
      const result = rollD20('persuasion', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.brenn_under_pressure = true;
        G.investigationProgress++;
        G.lastResult = `Brenn meets you at the side altar where the attendance log cannot reach. They speak without looking at you, arranging the votive stones in the order they were arranged the morning before. "He stands where petitioners usually stand. He does not petition. Yesterday he asked me the hours the shrine keeps a witness present. That is not a scheduling question." The third stone goes down harder than the first two. "He is telling me the shrine is not a shelter anymore."`;
        addJournal('Brenn under standing-surveillance — shrine sanctuary being revoked by presence', 'evidence', `ith-brenn-pressure-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Brenn sees you approach and turns to face the inner altar, which is the shrine's signal that a keeper is in private devotion and cannot be disturbed. The officer at the threshold watches the exchange. Brenn's withdrawal protects them for today and closes the door to you for longer than that.`;
        addJournal('Brenn withdrew into ritual cover — shrine channel cold', 'complication', `ith-brenn-pressure-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.lastResult = `Brenn offers a ceremonial blessing, which is their cover for a brief exchange at the altar rail. The officer has been there three mornings. Brenn will not say what the officer said, only that the phrasing was constructed to be remembered and repeated. Whatever the sentence was, it was meant to travel. Brenn is choosing not to carry it.`;
        addJournal('Brenn confirms officer is seeding a message — refusing to transmit', 'evidence', `ith-brenn-pressure-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Stage 2 Ithtananalor finale — act on the ghost account evidence through Roaz command or through independent disclosure.",
    tags: ['Investigation', 'Finale', 'Stage2', 'Consequence', 'Meaningful'],
    xpReward: 115,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(115, 'Ithtananalor Stage 2 resolution');
      if (!G.investigationProgress || G.investigationProgress < 8) {
        G.lastResult = `The Ithtananalor investigation is not complete. The ghost account chain needs full documentation before any decisive action.`;
        G.recentOutcomeType = 'investigate'; return;
      }
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('combat', (G.skills.combat||0) + Math.floor(G.level/2));
      if (result.total >= 14 || result.isCrit) {
        G.flags.stage2_finale_institutional = true;
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 3;
        G.lastResult = `You present to Captain Roaz directly with the full chain of evidence. He receives it with the gravity it warrants. A formal internal affairs investigation opens under his command authority — which carries the weight to bypass the Shadowhands layer. Stage III opens with Roazian enforcement backing and maximum Shadowhands visibility.`;
        addJournal('Ithtananalor S2 finale: Roaz enforcement path', 'evidence', `ith-finale-inst-${G.dayCount}`);
      } else {
        G.flags.stage2_finale_underworld = true;
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 3;
        G.lastResult = `You route the evidence to the Ivena network and the guild enforcement contacts rather than through Roaz command. The disclosure creates pressure outside formal channels before the Shadowhands can prepare a response. Stage III opens with the ghost accounts public knowledge.`;
        addJournal('Ithtananalor S2 finale: independent disclosure path', 'evidence', `ith-finale-uw-${G.dayCount}`);
      }
      G.flags.stage2_faction_contact_made = true;
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

];

window.ITHTANANALOR_STAGE2_ENRICHED_CHOICES = ITHTANANALOR_STAGE2_ENRICHED_CHOICES;
