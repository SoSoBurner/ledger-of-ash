/**
 * ITHTANANALOR STAGE 2 ENRICHED CHOICES
 * Investigation arc: ghost ore accounts, Shadowhands involvement, enforcement culture corruption
 * NPCs: Captain Darian Roaz (ORE Supreme Commander), Sir Velden Ironspike (Shadowhands Commander),
 *       Harlan Ironspike (Innkeeper), Ivena Ironspike (Market Clerk), Brenn Ironspike (Shrine Attendant)
 */

const ITHTANANALOR_STAGE2_ENRICHED_CHOICES = [

  {
    label: "The Iron Ledger Ward has three ghost accounts that were flagged and then left alone.",
    tags: ['Investigation', 'Stage2', 'Meaningful'],
    xpReward: 82,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(82, 'reviewing iron ledger ghost accounts');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      const arch = G.archetype && G.archetype.group;
      if (result.isCrit) {
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = arch === 'stealth'
          ? `The ghost accounts are cleaner than real accounts. That is the tell. Real accounts accumulate errors — a wrong entry corrected, a date transposed, a margin notation from a different clerk. These three carry no such residue. Every figure is precise, every interval consistent. Someone who knows the ledger system built them, and that level of financial tradecraft runs through Shadowhands operational training.`
          : `Three accounts with no registered owner, no ore delivery records, and consistent quarterly receipts arriving on a schedule no legitimate operator maintains. The accounts are being used to move ore revenue outside the quota system entirely. The original registrations required enforcement-level authorization — this did not happen without a signature from inside the apparatus.`;
        addJournal('Ghost ore accounts confirmed — enforcement authorization', 'evidence', `ith-ledger-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `At the Iron Ledger Ward's intake desk, the clerk runs credentials through the standard log and pauses at the third step. The terminal flags something — an inspection protocol that engages on uncleared third-party access. A Shadowhands duty officer is notified automatically before the clerk even looks up. The exit is quiet, but the enforcement record now carries the query, the timestamp, and the credential line that triggered it.`;
        addJournal('Ledger access logged — Shadowhands notified', 'complication', `ith-ledger-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.lastResult = `Two of the three accounts are clearly ghost entries — no owner, no delivery receipts, no correspondence, just clean recurring figures moving through a registered slot. The third has enough layered transaction noise to be ambiguous without deeper access. Two confirmed ghosts are enough to establish the pattern and give the chain a starting point. The third can be resolved later.`;
        addJournal('Two ghost accounts confirmed — third ambiguous', 'evidence', `ith-ledger-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Ivena Ironspike processes every registered transaction. She has seen the ghost account activity and said nothing.",
    tags: ['NPC', 'Persuasion', 'Stage2', 'Meaningful'],
    xpReward: 78,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(78, 'questioning Ivena Ironspike');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_ivena_ironspike = true;
        G.investigationProgress++;
        G.lastResult = `Ivena has been waiting for someone to ask. She has documented 34 transactions routed through accounts she cannot trace to any registered owner. Each transaction is within the legal threshold that would trigger an automatic audit — by exactly one unit below that threshold. Someone calculated the maximum invisible transaction size.`;
        addJournal('Ivena documents — calibrated threshold evasion confirmed', 'evidence', `ith-ivena-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `At the Licensed Goods Counter, the first question back is procedural: who authorized access to the transaction records? The counter keeps its own security log for exactly this kind of external query. The answer given is not sufficient — the log entry goes in regardless, attached to the time, the credential presented, and the subject of the question. The counter is now aware that someone was asking.`;
        addJournal('Goods counter access questioned — logged', 'complication', `ith-ivena-fail-${G.dayCount}`);
      } else {
        G.flags.met_ivena_ironspike = true;
        G.investigationProgress++;
        G.lastResult = `The transaction log stays on the counter between you and Ivena as she speaks. She confirms irregular entries without naming them precisely, voice held steady and even. "I process what comes to me. What is above me is not my function." The phrasing arrives too cleanly — the rhythm of a sentence that has been rehearsed until its edges are smooth. She is confirming what she knows and drawing a careful line at what she will not carry.`;
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
      const result = rollD20('might', (G.skills.combat||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_velden_ironspike = true;
        G.flags.stage2_faction_contact_made = true;
        G.worldClocks.rival = (G.worldClocks.rival||0) + 1;
        G.lastResult = `Velden receives you with the kind of careful attention that tells you he has already read your file. He neither confirms nor denies Shadowhands involvement in the accounts. But he gives you one thing: the name of the duty officer who would have processed the original account registrations. That officer was transferred six months ago. To a posting with no public record.`;
        addJournal('Velden meeting — transferred officer name obtained', 'evidence', `ith-velden-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.rival = (G.worldClocks.rival||0) + 2;
        G.factionHostility.warden_order = (G.factionHostility.warden_order||0) + 2;
        G.lastResult = `Two steps inside the Shadowhands Wing, a pair of unit officers bracket the approach and redirect without touching anything. The meeting request was received; no meeting will occur. At the security desk, a formal note is written and signed — not a refusal on paper but a flag, routed upward within the hour. The Roazian enforcement apparatus has now classified the approach as a hostile operation, which changes every access point downstream.`;
        addJournal('Shadowhands — investigation classified as hostile', 'complication', `ith-velden-fail-${G.dayCount}`);
      } else {
        G.flags.met_velden_ironspike = true;
        G.worldClocks.rival = (G.worldClocks.rival||0) + 1;
        G.lastResult = `Three minutes, standing — no chair offered, no document produced. The accounts are not named directly. But there are pauses where there should not be pauses, and a stillness in the jaw when specific routing numbers are mentioned that only happens when the name is recognized. The Shadowhands have operational knowledge of these accounts. What the three-minute meeting cannot resolve is whether what they know is authorized from above or something running below the command line.`;
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
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_brenn_ironspike = true;
        G.investigationProgress++;
        G.lastResult = `Brenn speaks at the shrine threshold where conversations are protected by civic ritual. Three times in the past two months, enforcement officers conducted unscheduled processing procedures at the quarter after the civic compliance cycle ended. The procedures were logged as "containment review" — a classification that bypasses normal oversight.`;
        addJournal('Brenn confirms after-hours containment reviews — oversight bypass', 'evidence', `ith-brenn-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The shrine threshold carries ritual protection under Ithtananalor's civic code, but that protection only holds while the conversation stays inside it. A Shadowhands officer pauses at the outer edge of the grounds, and whatever he hears is enough — he steps forward with the particular deliberateness of someone who has the authority to interrupt a civil proceeding and knows it. Brenn falls silent mid-sentence. The exchange closes before it opens.`;
        addJournal('Shrine conversation interrupted by Shadowhands', 'complication', `ith-brenn-fail-${G.dayCount}`);
      } else {
        G.flags.met_brenn_ironspike = true;
        G.investigationProgress++;
        G.lastResult = `At the side altar, Brenn arranges the votive stones in a slow, deliberate order before speaking. The evening activity was real — multiple enforcement officers in the quarter after the compliance cycle closed, no unit identification marks visible on their gear. In Ithtananalor, enforcement officers without unit identification means Shadowhands operating outside standard logged duty. The absence of markings is itself the identifier. Brenn offers nothing further beyond confirming what was seen.`;
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
      const result = rollD20('finesse', (G.skills.stealth||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_harlan_ironspike = true;
        G.investigationProgress++;
        G.lastResult = `You position at the inn's edge table and observe four hours of off-duty officer conversation. One conversation is significant: two officers discuss a "verification window closing" at the ore registry in terms that make clear they know the ghost accounts exist and have a timeline for extracting value before the next formal audit.`;
        addJournal('Inn observation — extraction timeline overheard', 'evidence', `ith-harlan-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `The edge table position reads differently to a trained eye than it does to a civilian one — the sightline, the held posture, the way attention distributes around the room rather than settling on the drink. An officer at the corner of the bar identifies the posture before the first hour is done. The exit is not rough, but it is escorted, and at the door a formal notation goes into the enforcement quarter log: surveillance risk, time and description appended.`;
        addJournal('Inn surveillance detected — enforcement risk log', 'complication', `ith-harlan-fail-${G.dayCount}`);
      } else {
        G.flags.met_harlan_ironspike = true;
        G.investigationProgress++;
        G.lastResult = `Four hours of ordinary enforcement quarter conversation — complaint about a shift assignment, a card game that ends poorly, a long argument about supply quality. Nothing explicitly incriminating. But the way two particular officer pairs communicate has a specific quality: gaps where names should appear, glances that carry shared meaning, a precision about what is not said that ordinary unit conversation does not produce. The operational knowledge is there. It's just distributed across the silences.`;
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
      const result = rollD20('finesse', (G.skills.stealth||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `The shadow market uses the illicit magic trade as cover. The ghost account endpoints are purchasing suppressed arcane materials — specifically materials classified under the anti-magic statute that would be unusable without enforcement-level access to bypass the containment protocols. The accounts are moving contraband through the enforcement system itself.`;
        addJournal('Ghost accounts purchasing contraband through enforcement bypass', 'evidence', `ith-shadow-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 2;
        G.lastResult = `The shadow market reads unfamiliar faces the way enforcement apparatus reads unauthorized credentials — quickly, and without announcing the conclusion. Within minutes of entry a Shadowhands unit has been signaled. The tail begins at the outer gate and does not lift for forty-eight hours. Every approach to every evidence point during that window is watched. The surveillance window closes entirely, replaced by the problem of being observed.`;
        addJournal('Shadow market identification — 48hr Shadowhands surveillance', 'complication', `ith-shadow-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.lastResult = `The shadow market's outer tier is accessible — enough to observe the shape of what moves through it without being able to touch the interior channels. The cargo being traded requires enforcement authorization to handle without triggering the anti-magic statute: the classification alone confirms the accounts are moving contraband through the apparatus itself. The specific account numbers and routing codes sit deeper, behind access that the current position does not reach. The shape of it is there. The details are not.`;
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
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.captain_roaz_assessed = true;
        G.flags.stage2_faction_contact_made = true;
        G.lastResult = arch === 'combat'
          ? `Your assessment of Roaz's public record and command decisions reveals a consistent pattern of internal accountability — cases where he sanctioned officers above his direct command. The ghost accounts contradict his documented command culture. He is either being bypassed or his record is cover. A direct meeting is now worth the risk.`
          : `The public record maps a slow erosion. Roaz's command authority over the past six months has been trimmed by a series of administrative reassignments — each one individually unremarkable, each one removing oversight from a specific department. The departments stripped from his remit are exactly the ones where the ghost accounts operate. The reassignments are not random. Someone anticipated an internal investigation and cleared the field before it could begin.`;
        addJournal('Roaz assessment — either bypassed or cover exists', 'evidence', `ith-roaz-assess-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The pattern of records access — command history, administrative reassignment logs, duty rosters pulled in sequence — reads clearly to anyone watching the archive terminal queue. Roaz's staff has a monitoring function for exactly this kind of lateral review. The methodology was visible before the third request was entered. Command leadership assessment without authorization is now attached to the credential file, and Roaz's office is aware a review was attempted.`;
        addJournal('Command assessment detected — unauthorized review noted', 'complication', `ith-roaz-fail-${G.dayCount}`);
      } else {
        G.flags.captain_roaz_assessed = true;
        G.lastResult = `The public record is clean and internally consistent — no disciplinary gaps, no command decisions that contradict the accountability pattern, no reassignments in either direction that suggest prior knowledge of the accounts. The evidence against the accounts is also real. Both things cannot be true at once unless the corruption is running below the threshold of his operational visibility, which is possible in a system this layered. The assessment cannot resolve it. A direct meeting is the only path left.`;
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
      var roll = rollD20('charm', G.skills.persuasion);
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
      var roll = rollD20('wits', G.skills.lore);
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
      var roll = rollD20('finesse', G.skills.stealth);
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
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
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
      const result = rollD20('finesse', (G.skills.stealth||0) + Math.floor(G.level/3));
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
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
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
    label: "The transferred duty officer left a forwarding seal at the transit registry — one that was never collected.",
    tags: ['Stage2', 'NPC'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'tracing transferred duty officer forwarding seal');
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.duty_officer_trace_complete = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The forwarding seal sits in the uncollected tray at the transit registry, dated the same week Velden mentioned the reassignment. The registry clerk — a woman who keeps a worn ledger stamp tucked in her sleeve seam — recognizes the credential mark on the seal as Shadowhands logistics division, a sub-unit that handles material transport outside normal quota channels. The officer was not reassigned to a distant posting. The "posting with no public record" is a desk inside the same enforcement quarter, reclassified under a unit that does not appear on the public org chart.`;
        addJournal('Transferred officer — still in quarter, unit unlisted on public org chart', 'evidence', `ith-officer-trace-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The transit registry clerk checks the uncollected tray and pauses. The forwarding seal is there, but the check triggers a secondary log — an alert affixed to the credential mark that routes any access attempt to the Shadowhands logistics desk. By the time the clerk looks back up, the answer is a practiced apology: this item requires pickup authorization from the issuing unit. The item stays in the tray, and someone in the logistics division now knows it was asked about.`;
        addJournal('Forwarding seal access attempted — Shadowhands logistics alerted', 'complication', `ith-officer-fail-${G.dayCount}`);
      } else {
        G.flags.duty_officer_trace_complete = true;
        G.investigationProgress++;
        G.lastResult = `The forwarding seal is in the uncollected tray. The registry date matches the week of the reassignment. The clerk confirms the credential mark is an internal enforcement division — not a regional posting, not a transit billet. The officer stayed in Ithtananalor under a reclassified unit designation. The unit name on the seal is partially legible through the wax impression: logistics, a word, then an authorization sequence the clerk will not read aloud.`;
        addJournal('Transferred officer seal recovered — stayed in Ithtananalor, reclassified unit', 'intelligence', `ith-officer-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The quota calibration threshold is not a round number — whoever set it knew the exact audit trigger.",
    tags: ['Stage2', 'NPC'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'analyzing quota calibration mathematics');
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.quota_calibration_traced = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The audit trigger threshold is 847 weight-units — not a round administrative figure, not a standard trade denomination. It derives from a formula published in a restricted enforcement operations manual that has not been publicly distributed since the quota system was redesigned four years ago. Someone with access to that manual set the ghost account transaction ceiling. Enforcement operations manuals at that access tier require Shadowhands command clearance to obtain. The threshold is a fingerprint.`;
        addJournal('Quota threshold 847 — derived from restricted enforcement manual, command clearance required', 'evidence', `ith-quota-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The quota mathematics pull from three overlapping regulatory frameworks, each one updated on a different cycle. Without access to the current enforcement operations parameters — a restricted document tier — reconstructing the trigger formula from public sources produces four plausible thresholds, none of which can be confirmed as the operative one. The time spent at the registry terminal generates an access log entry that sits in the same system as the query that triggered the initial Shadowhands notification.`;
        addJournal('Quota threshold calculation failed — restricted parameters inaccessible, access logged', 'complication', `ith-quota-fail-${G.dayCount}`);
      } else {
        G.flags.quota_calibration_traced = true;
        G.investigationProgress++;
        G.lastResult = `The threshold is 847 weight-units. Cross-referencing public audit schedules and trade registration floor values confirms the figure is not administratively standard — it falls below every published audit trigger in the registry by a margin too precise to be coincidental. The specific derivation requires a formula this analysis cannot reconstruct without restricted enforcement parameters, but the intentionality is clear. Someone calculated this number to avoid automatic detection.`;
        addJournal('Quota threshold 847 — non-standard, deliberately calibrated below all public audit triggers', 'evidence', `ith-quota-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "One of the contraband materials requires cold storage — there are only three registered cold holds in the enforcement quarter.",
    tags: ['Stage2', 'NPC'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'locating cold storage endpoint for contraband materials');
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('vigor', (G.skills.survival||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.cold_hold_located = true;
        G.investigationProgress++;
        G.lastResult = `Two of the three registered cold holds are standard enforcement storage — temperature consistent with evidence preservation, access logs cross-referenced with active case files. The third is different. Ambient temperature is lower than evidence protocols require, the access log entries use a numeric code rather than officer names, and the condensation pattern on the exterior bracket shows the door opens on a different schedule than the listed maintenance rotation. The ghost account endpoints are running a live cold hold inside enforcement storage.`;
        addJournal('Third cold hold — below-protocol temp, coded access, off-schedule operation confirmed', 'evidence', `ith-cold-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `The enforcement quarter cold holds are in a restricted service corridor that requires active duty credentials to enter. The approach through the supply access door triggers a proximity sensor mounted inside the frame — a secondary security layer not on the public facility schematic. A duty officer appears from the far end of the corridor within four minutes. The exit is uncontested but the corridor access has been logged under a surveillance classification that routes to the Shadowhands duty desk automatically.`;
        addJournal('Cold hold corridor triggered sensor — auto-routed to Shadowhands duty desk', 'complication', `ith-cold-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.lastResult = `The physical survey of the three cold holds requires working through the service access on a maintenance schedule. Two hold examination confirms standard evidence protocols. The third is accessible from the exterior bracket only — the service hatch is sealed from inside. The temperature differential between the bracket and the wall surface is measurable with a hand pressed flat against the stone: colder than the other two, colder than necessary for evidence preservation. Something is stored there on a cycle that does not match the maintenance log.`;
        addJournal('Third cold hold exterior survey — below-protocol temp, sealed interior access', 'intelligence', `ith-cold-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The anti-magic statute has a materials exemption written in a hand that does not match the rest of the document.",
    tags: ['Stage2', 'NPC'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'examining anti-magic statute materials exemption provenance');
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('spirit', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.statute_exemption_provenance = true;
        G.investigationProgress++;
        G.lastResult = `The exemption clause is a later insertion — the vellum density is lighter than the surrounding pages, the ink oxidation profile puts it three to four years after the statute's original ratification, and the scribal hand uses a ligature style that replaced the older form only after Guild administrative reforms. The exemption that allows enforcement-level access to bypass anti-magic containment protocols was not part of the original statute. It was inserted after the ghost accounts were opened. The sequence is inverted: the accounts came first, then the legal cover was created.`;
        addJournal('Statute exemption inserted after original ratification — legal cover created post-hoc for accounts', 'evidence', `ith-statute-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The statute archive copy is sealed under a preservation order that requires Guild certification to handle for materials analysis. The public reading copy has the exemption clause in a consistent hand — either the insertion was done by a skilled forger who matched the original, or the reading copy was replaced entirely. Without the sealed original for comparison, the analysis cannot establish provenance. The request to inspect the sealed copy goes into the certification queue. A Shadowhands administrative liaison receives the queue notification automatically.`;
        addJournal('Statute original sealed — public copy inconclusive, certification request logged', 'complication', `ith-statute-fail-${G.dayCount}`);
      } else {
        G.flags.statute_exemption_provenance = true;
        G.investigationProgress++;
        G.lastResult = `The exemption clause sits at the bottom of the third page, in a hand that tilts forward where the rest of the document tilts back. The ink in that section has a slightly different sheen under angled light — a different mixing ratio, a different preparation. Without laboratory comparison it cannot be confirmed as a later insertion, but the physical difference is present and consistent. The clause that grants enforcement bypass of containment protocols reads like it was added rather than written with the document.`;
        addJournal('Statute exemption — physical inconsistency suggests later insertion, unconfirmed without lab analysis', 'intelligence', `ith-statute-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Harlan keeps a second ledger behind the bar — not for accounts, for names and dates he does not trust to memory.",
    tags: ['Stage2', 'NPC'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'accessing Harlan\'s private ledger of enforcement names and dates');
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('finesse', (G.skills.stealth||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.harlan_ledger_read = true;
        G.investigationProgress++;
        G.lastResult = `The ledger behind the bar is a narrow cloth-bound book, entries in a compressed hand — dates, a unit abbreviation, a count, occasionally a single word that functions as a note. Twelve entries over seven months correspond to the ghost account transaction dates identified earlier: same date, a unit abbreviation that matches the unlisted logistics sub-unit from the forwarding seal. Harlan has been quietly documenting the same activity. His entry from four days ago reads: "verification window — closing, two weeks."`;
        addJournal('Harlan\'s private ledger — 12 entries matching ghost account dates, closing window noted 4 days ago', 'evidence', `ith-harlan-ledger-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `Harlan is behind the bar when the reach toward the ledger becomes visible to him — not a dramatic moment, just the particular stillness of a man who has spent years reading what enforcement officers do with their hands when they think no one is tracking. He sets a tankard down on the ledger without looking directly at it. When he meets the eyes across the bar his expression carries no accusation, just the flat exhaustion of someone who has already decided he cannot afford to have any conversation about what just happened.`;
        addJournal('Harlan ledger access burned — innkeeper aware, channel closed', 'complication', `ith-harlan-ledger-fail-${G.dayCount}`);
      } else {
        G.flags.harlan_ledger_read = true;
        G.investigationProgress++;
        G.lastResult = `The ledger is accessible for thirty seconds before Harlan returns from the cellar stair. Eight entries are visible in that window — dates and unit abbreviations, nothing self-explaining. Three of the dates land within a day of ghost account transaction dates from the evidence already gathered. The unit abbreviation is consistent across all eight: a two-letter code that does not appear on any public enforcement org chart. The ledger closes when Harlan's steps reach the top of the stair.`;
        addJournal('Harlan ledger — eight entries visible, three dates match ghost account activity, unknown unit code', 'intelligence', `ith-harlan-ledger-partial-${G.dayCount}`);
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
        G.lastResult = `The evidence map on the table has empty columns where the critical links should be. The ghost account chain requires full documentation across every step — origin authorization, routing, endpoint activity, and the chain of oversight that permitted it — before any formal action will hold. A presentation now gives the apparatus room to discredit each piece individually. The chain needs closing first.`;
        G.recentOutcomeType = 'investigate'; return;
      }
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('might', (G.skills.combat||0) + Math.floor(G.level/2));
      if (result.total >= 14 || result.isCrit) {
        G.flags.stage2_finale_institutional = true;
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 3;
        G.lastResult = `You present to Captain Roaz directly with the full chain of evidence. He receives it with the gravity it warrants. A formal internal affairs review opens under his command authority — which carries the weight to bypass the Shadowhands layer. Stage III opens with Roazian enforcement backing and maximum Shadowhands visibility.`;
        addJournal('Ithtananalor S2 finale: Roaz enforcement path', 'evidence', `ith-finale-inst-${G.dayCount}`);
      } else {
        G.flags.stage2_finale_underworld = true;
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 3;
        G.lastResult = `The evidence packet moves through Ivena's network and the guild enforcement channels simultaneously — not through Roaz command, not through any route the Shadowhands monitor. By the time the apparatus recognizes that the disclosure is in motion, the information is already across three separate distribution points. The ghost accounts become public knowledge before any containment procedure can be organized. The cost is that the formal chain of authority carries none of it. Stage III opens with the accounts exposed but the institutional apparatus hostile.`;
        addJournal('Ithtananalor S2 finale: independent disclosure path', 'evidence', `ith-finale-uw-${G.dayCount}`);
      }
      G.flags.stage2_faction_contact_made = true;
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

];

window.ITHTANANALOR_STAGE2_ENRICHED_CHOICES = ITHTANANALOR_STAGE2_ENRICHED_CHOICES;
