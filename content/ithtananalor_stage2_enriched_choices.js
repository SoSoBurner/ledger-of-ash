/**
 * ITHTANANALOR STAGE 2 ENRICHED CHOICES
 * Investigation arc: ghost ore accounts, Shadowhands involvement, enforcement culture corruption
 * NPCs: Captain Darian Roaz (ORE Supreme Commander), Sir Velden Ironspike (Shadowhands Commander),
 *       Harlan Ironspike (Innkeeper), Ivena Ironspike (Market Clerk), Brenn Ironspike (Shrine Attendant)
 */

var ITHTANANALOR_STAGE2_ENRICHED_CHOICES = [

  {
    label: "The Iron Ledger Ward has three ghost accounts that were flagged and then left alone.",
    skill: 'wits',
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
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
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
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Two of the three accounts are clearly ghost entries — no owner, no delivery receipts, no correspondence, just clean recurring figures moving through a registered slot. The third has enough layered transaction noise to be ambiguous without deeper access. Two confirmed ghosts are enough to establish the pattern and give the chain a starting point. The third can be resolved later.`;
        addJournal('Two ghost accounts confirmed — third ambiguous', 'evidence', `ith-ledger-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "She processes every transaction. She has seen the ghost account activity and said nothing.",
    skill: 'charm',
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
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Ivena has been waiting for someone to ask. The lamp oil smell of the Licensed Goods Counter thickens as she pulls a folded sheet from beneath the stamp rack — her own document, kept separate from the official log. She has recorded 34 transactions routed through accounts she cannot trace to any registered owner. Each transaction is within the legal threshold that would trigger an automatic audit — by exactly one unit below that threshold. Someone calculated the maximum invisible transaction size and built a system around it.`;
        addJournal('Ivena documents — calibrated threshold evasion confirmed', 'evidence', `ith-ivena-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `At the Licensed Goods Counter, the first question back is procedural: who authorized access to the transaction records? The counter keeps its own security log for exactly this kind of external query. The answer given is not sufficient — the log entry goes in regardless, attached to the time, the credential presented, and the subject of the question. The counter is now aware that someone was asking.`;
        addJournal('Goods counter access questioned — logged', 'complication', `ith-ivena-fail-${G.dayCount}`);
      } else {
        G.flags.met_ivena_ironspike = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The transaction log stays on the counter between you and Ivena as she speaks. She confirms irregular entries without naming them precisely, voice held steady and even. "I process what comes to me. What is above me is not my function." The phrasing arrives too cleanly — the rhythm of a sentence that has been rehearsed until its edges are smooth. She is confirming what she knows and drawing a careful line at what she will not carry.`;
        addJournal('Ivena confirms irregularities — careful deflection', 'evidence', `ith-ivena-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Velden commands the Shadowhands. The accounts point there. A meeting is one option.",
    skill: 'might',
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
        G.lastResult = `Velden receives you with the kind of careful attention that tells you he has already read your file. He neither confirms nor denies Shadowhands involvement in the accounts. But he gives you one thing: the name of the duty officer who would have processed the original account registrations. That officer was transferred six months ago. To a posting with no public record.`;
        addJournal('Velden meeting — transferred officer name obtained', 'evidence', `ith-velden-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.rival = (G.worldClocks.rival||0) + 2;
        G.factionHostility.warden_order = (G.factionHostility.warden_order||0) + 2;
        G.lastResult = `Two steps inside the Shadowhands Wing, a pair of unit officers bracket the approach and redirect without touching anything. The meeting request was received; no meeting will occur. At the security desk, a formal note is written and signed — not a refusal on paper but a flag, routed upward within the hour. The Roazian enforcement apparatus has now classified the approach as a hostile operation, which changes every access point downstream.`;
        addJournal('Shadowhands — your approach classified as hostile operation', 'complication', `ith-velden-fail-${G.dayCount}`);
      } else {
        G.flags.met_velden_ironspike = true;
        G.worldClocks.rival = (G.worldClocks.rival||0) + 1;
        G.lastResult = `Three minutes, standing — no chair offered, no document produced. The accounts are not named directly. But there are pauses where there should not be pauses, and a stillness in the jaw when specific routing numbers are mentioned that only happens when the name is recognized. The Shadowhands have operational knowledge of these accounts. What the three-minute meeting cannot resolve is whether what they know is authorized from above or something running below the command line.`;
        addJournal('Velden meeting — Shadowhands knowledge confirmed, intent unclear', 'evidence', `ith-velden-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Unusual evening proceedings at the enforcement quarter. The shrine attendant witnessed them.",
    skill: 'charm',
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
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Brenn speaks at the shrine threshold where conversations are protected by civic ritual, the cold stone underfoot and the faint smell of lamp resin the only constants in the exchange. Three times in the past two months, enforcement officers conducted unscheduled processing procedures at the quarter after the civic compliance cycle ended — arriving after the watch bell, leaving before the next one. The procedures were logged as "containment review," a classification that bypasses normal oversight and leaves no recoverable record of what was reviewed or who authorized it.`;
        addJournal('Brenn confirms after-hours containment reviews — oversight bypass', 'evidence', `ith-brenn-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The shrine threshold carries ritual protection under Ithtananalor's civic code, but that protection only holds while the conversation stays inside it. A Shadowhands officer pauses at the outer edge of the grounds, and whatever he hears is enough — he steps forward with the particular deliberateness of someone who has the authority to interrupt a civil proceeding and knows it. Brenn falls silent mid-sentence. The exchange closes before it opens.`;
        addJournal('Shrine conversation interrupted by Shadowhands', 'complication', `ith-brenn-fail-${G.dayCount}`);
      } else {
        G.flags.met_brenn_ironspike = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `At the side altar, Brenn arranges the votive stones in a slow, deliberate order before speaking. The evening activity was real — multiple enforcement officers in the quarter after the compliance cycle closed, no unit identification marks visible on their gear. In Ithtananalor, enforcement officers without unit identification means Shadowhands operating outside standard logged duty. The absence of markings is itself the identifier. Brenn offers nothing further beyond confirming what was seen.`;
        addJournal('Brenn confirms unidentified enforcement evening activity', 'evidence', `ith-brenn-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Off-duty Shadowhands officers stay at the quarter inn. An evening there would tell something.",
    skill: 'finesse',
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
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The edge table at Harlan's quarter inn carries the particular smell of old armor grease and spilled barley malt — the scent of officers who stop removing their gear before they drink. Four hours of off-duty conversation wash past. One exchange is significant: two officers, backs turned and voices low, discuss a "verification window closing" at the ore registry in terms that make clear they know the ghost accounts exist and carry a working estimate of how much time remains before the next formal audit cycle forces a reckoning.`;
        addJournal('Inn observation — extraction timeline overheard', 'evidence', `ith-harlan-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `The edge table position reads differently to a trained eye than it does to a civilian one — the sightline, the held posture, the way attention distributes around the room rather than settling on the drink. An officer at the corner of the bar identifies the posture before the first hour is done. The exit is not rough, but it is escorted, and at the door a formal notation goes into the enforcement quarter log: surveillance risk, time and description appended.`;
        addJournal('Inn surveillance detected — enforcement risk log', 'complication', `ith-harlan-fail-${G.dayCount}`);
      } else {
        G.flags.met_harlan_ironspike = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Four hours of ordinary enforcement quarter conversation — complaint about a shift assignment, a card game that ends poorly, a long argument about supply quality. Nothing explicitly incriminating. But the way two particular officer pairs communicate has a specific quality: gaps where names should appear, glances that carry shared meaning, a precision about what is not said that ordinary unit conversation does not produce. The operational knowledge is there. It's just distributed across the silences.`;
        addJournal('Inn observation — officer group cohesion suggests operational knowledge', 'evidence', `ith-harlan-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The enforcement culture created a shadow market. The ghost account endpoints are somewhere inside it.",
    skill: 'finesse',
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
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `The shadow market runs beneath a legitimate parts exchange near the foundry dock, the garrison stone of the quarter cold under the narrow fortification windows where cold light cuts through at low angles. The ghost account endpoints are purchasing suppressed arcane materials — specifically materials classified under the anti-magic statute that would be unusable without enforcement-level access to bypass the containment protocols. The accounts are moving contraband through the enforcement system itself, using the apparatus as both the conduit and the cover. The enforcement imprimatur is not incidental; it is the mechanism.`;
        addJournal('Ghost accounts purchasing contraband through enforcement bypass', 'evidence', `ith-shadow-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 2;
        G.lastResult = `The shadow market reads unfamiliar faces the way enforcement apparatus reads unauthorized credentials — quickly, and without announcing the conclusion. Within minutes of entry a Shadowhands unit has been signaled. The tail begins at the outer gate and does not lift for forty-eight hours. Every approach to every evidence point during that window is watched. The surveillance window closes entirely, replaced by the problem of being observed.`;
        addJournal('Shadow market identification — 48hr Shadowhands surveillance', 'complication', `ith-shadow-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The shadow market's outer tier is accessible — enough to observe the shape of what moves through it without being able to touch the interior channels. The cargo being traded requires enforcement authorization to handle without triggering the anti-magic statute: the classification alone confirms the accounts are moving contraband through the apparatus itself. The specific account numbers and routing codes sit deeper, behind access that the current position does not reach. The shape of it is there. The details are not.`;
        addJournal('Shadow market confirmed — arcane contraband through enforcement channels', 'evidence', `ith-shadow-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Roaz commands ORE. Either he's been bypassed or his record is cover.",
    skill: 'wits',
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
          : `The public record maps a slow erosion. Roaz's command authority over the past six months has been trimmed by a series of administrative reassignments — each one individually unremarkable, each one removing oversight from a specific department. The departments stripped from his remit are exactly the ones where the ghost accounts operate. The reassignments are not random. Someone anticipated internal scrutiny and cleared the field before it could begin.`;
        addJournal('Roaz assessment — either bypassed or cover exists', 'evidence', `ith-roaz-assess-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The pattern of records access — command history, administrative reassignment logs, duty rosters pulled in sequence — reads clearly to anyone watching the archive terminal queue. Roaz's staff has a monitoring function for exactly this kind of lateral review. The methodology was visible before the third request was entered. Command leadership assessment without authorization is now attached to the credential file, and Roaz's office is aware a review was attempted.`;
        addJournal('Command assessment detected — unauthorized review noted', 'complication', `ith-roaz-fail-${G.dayCount}`);
      } else {
        G.flags.captain_roaz_assessed = true;
        G.lastResult = `The public record is clean and internally consistent — no disciplinary gaps, no command decisions that contradict the accountability pattern, no reassignments in either direction that suggest prior knowledge of the accounts. The evidence against the accounts is also real. Both things cannot be true at once unless the corruption is running below the threshold of his operational visibility, which is possible in a system this layered. The assessment cannot resolve it. A direct meeting is the only path left.`;
        addJournal('Roaz assessment — inconclusive, direct contact warranted', 'evidence', `ith-roaz-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "That deflection was rehearsed. She rehearses lines when she has something to protect",
    skill: 'charm',
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
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        addNarration('Ivena — Second Approach', 'You find her at the Licensed Goods Counter near closing hour, when the queue has thinned. Her thumb traces the edge of a transaction stamp without pressing it. When you mention the threshold calibration — the one-unit margin — she sets the stamp down with too much precision. She says she once filed a discrepancy report through the internal channel. The report was returned to her desk the following morning with no routing record and a single word crossed through: "resolved."');
        addJournal('Ivena filed a discrepancy report — returned without routing, marked resolved', 'evidence');
        maybeStageAdvance();
      } else {
        addNarration('Ivena — Closed Door', 'She sees you coming this time. By the time you reach the counter she has a queue citation form ready and her eyes fixed on the seal press, the stamp rack between you like a wall she built while you were still crossing the floor. The practiced statement surfaces again, word for word, same cadence as before — the particular blankness of a sentence rehearsed until it carries no expression at all. Whatever opened briefly in the first exchange has closed, and nothing in her posture suggests it will open again.');
      }
    }
  },

  {
    label: "The dock is moving weight on nights the ledger shows nothing moving.",
    skill: 'wits',
    tags: ['stage2', 'ithtananalor'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      var roll = rollD20('wits', G.skills.lore);
      if (roll.total >= 13) {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        addNarration('Foundry Dock — Night Manifest', 'The dock manifest board runs in two columns: daytime shipments in black ink with quota stamps, night entries in red with a classification mark you do not recognize. You copy three red entries. The weight figures in the red column do not correspond to any ore grade in the public extraction registry — the loads are too light for raw ore, too heavy for refined ingot. A fourth entry has been physically cut from the board and pasted over. The paper underneath is a different weight.');
        addJournal('Foundry night manifest — unregistered weight class, one entry physically excised', 'evidence');
        maybeStageAdvance();
      } else {
        addNarration('Foundry Dock — Watched', 'A labor foreman notices you at the manifest board before you can copy anything. He does not ask what you are doing. He simply stands beside the board until you move away, one hand resting on the quota stamp rack, garrison stone cold through the soles of boots that have been standing here long enough to feel it. His expression carries the particular blankness of someone who has learned not to witness things — not innocence, not compliance, just the flat professional absence of a man who has decided that his eyes are not a reliable instrument in this particular workplace.');
      }
    }
  },

  {
    label: "The checkpoint officer clocked my hesitation — in Ithtananalor that hesitation is already a record",
    skill: 'finesse',
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
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        addNarration('Checkpoint — Controlled Entry', 'You present credentials before the officer asks. The seal gets checked twice — that is standard — but you keep your weight forward and your eyes on the gate frame rather than the officer\'s hands, the way locals do when they have nothing to hide and are mildly bored by the process. He logs you through without a secondary notation. On the other side, the administrative wing archive is accessible for the next two hours without an escort requirement.');
        addJournal('Administrative wing archive accessed without escort — two-hour window', 'discovery');
        maybeStageAdvance();
      } else {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
        addNarration('Checkpoint — Secondary Notation', 'The pause before answering is half a second too long — long enough for the officer to mark it, short enough that there is nothing overt to object to. Cold light through the narrow fortification window catches the stylus as it adds a second line beneath the entry. Secondary notation: purpose unclear. In Ithtananalor, a military installation where orders have stopped making complete sense to the people executing them, that notation follows the credentials to every checkpoint downstream today and sits in the enforcement record indefinitely.');
      }
    }
  },

  {
    label: "The archive's binding-law index bleeds into the enforcement catalogue at one seam",
    skill: 'wits',
    tags: ['stage2', 'ithtananalor', 'Archive', 'Meaningful'],
    xpReward: 82,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(82, 'working the archive classification seam');
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        if (G.investigationProgress === 5) G.worldClocks.pressure++;
        G.lastResult = `The seam is real. Four case numbers cross-reference between oath-binding precedent and enforcement disposition — soldiers declared oath-breakers in the same month the ghost accounts first cleared. The disposition entries are redacted to a single line each. The redaction pattern is identical across all four. One hand did this work under institutional pressure, one shift, one authorization code. The index preserves the shape of what was removed.`;
        addJournal('Archive seam: four oath-breaker dispositions redacted under one authorization', 'evidence', `ith-archive-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `The cross-reference request triggers the archive's internal flag. A senior registrar arrives at the reading carrel without being summoned — no knock, no announcement, just the sound of deliberate footsteps on garrison stone stopping at precisely the right shelf. The flag reaches further than the reading room; that much is clear from the route the registrar took to get here without being called. The query slip is retained and noted. The entries that triggered it are not produced. The exit from the reading room is unhurried and watched every step of the way.`;
        addJournal('Archive cross-reference flagged — registrar intervention', 'complication', `ith-archive-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The indexes intersect, but the access tier available here grants headers only — case titles, dates, and classification marks, nothing below that surface. Four case numbers appear in both catalogues, the binding-law index and the enforcement catalogue sharing the same numeric spine at one point where the classification systems were never cleanly separated. The headers are benign. The case bodies require a clearance that a public seal cannot approximate. Enough to know the seam is real, and that someone had reason to let it stay unsealed. Not enough to open what sits behind it.`;
        addJournal('Archive seam located — four cross-referenced cases behind higher access', 'evidence', `ith-archive-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "A second perimeter circles the Ledger Ward — unmarked, paired, started after my query",
    skill: 'finesse',
    tags: ['stage2', 'ithtananalor', 'Stealth', 'Meaningful'],
    xpReward: 80,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(80, 'reading the second perimeter');
      const result = rollD20('finesse', (G.skills.stealth||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.ith_second_perimeter_read = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `From a balcony above the ward's eastern approach, the rotation resolves. Six officers working in pairs, forty-minute swaps, hand-off at the fountain where no clerk can see them. One officer in every pair wears gloves indoors — Shadowhands courier tell, a grip-safety habit from handling sealed pouches. They are not watching the ward. They are watching who approaches the terminals where your queries land.`;
        addJournal('Second perimeter is query-reactive, not ward-reactive — surveillance targets you', 'intelligence', `ith-perimeter-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `The balcony is covered from an angle that did not register during the approach — a gap between roof parapet and wall corbel that opens exactly the right sightline from the courtyard below. An officer lifts a gloved hand and taps twice against his thigh, the signal precise and unhurried. The exit from the balcony comes before the partner closes the gap. Whatever rotation pattern existed has now been redrawn around the fact of being seen. The second perimeter is still there. The version that was just observed is gone.`;
        addJournal('Perimeter observation burned — rotation reconfigured', 'complication', `ith-perimeter-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The rotation is there — forty-minute intervals, pair-based, all markings absent from their gear. The pattern resolves before the balcony position becomes conspicuous and the exit is clean. What cannot be confirmed from this vantage is whether the pairs are watching the ward itself or watching a specific class of visitor to the terminals where the recent queries landed. The distinction matters considerably for what comes next. A ward-watch and a query-watch require entirely different responses, and the evidence from here is not enough to distinguish between them.`;
        addJournal('Second perimeter confirmed — targeting unclear', 'intelligence', `ith-perimeter-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The same officer has stood at Brenn's shrine threshold three mornings running",
    skill: 'charm',
    tags: ['stage2', 'ithtananalor', 'NPC', 'Persuasion', 'Meaningful'],
    xpReward: 78,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(78, 'checking on Brenn under pressure');
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.brenn_under_pressure = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Brenn meets you at the side altar where the attendance log cannot reach. They speak without looking at you, arranging the votive stones in the order they were arranged the morning before. "He stands where petitioners usually stand. He does not petition. Yesterday he asked me the hours the shrine keeps a witness present. That is not a scheduling question." The third stone goes down harder than the first two. "He is telling me the shrine is not a shelter anymore."`;
        addJournal('Brenn under standing-surveillance — shrine sanctuary being revoked by presence', 'evidence', `ith-brenn-pressure-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Brenn sees the approach from twenty feet out and turns to face the inner altar — the shrine's signal that a keeper is in private devotion and cannot be disturbed under civic ritual protection. The cold stone of the threshold is between the officer and the altar, but the officer's line of sight covers both. Brenn's withdrawal is a correct and legal move; it protects them from the exchange being recorded as a breach. It also closes the channel completely. The shrine is not accessible as a route while that officer is present, and the officer has been present three mornings running.`;
        addJournal('Brenn withdrew into ritual cover — shrine channel cold', 'complication', `ith-brenn-pressure-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Brenn offers a ceremonial blessing — the shrine's standard cover for a brief exchange at the altar rail, low voices underneath the ritual words, the lamp oil smell of the side nave keeping the cold at arm's length. The officer has been at the threshold three mornings running. Brenn will not repeat what the officer said, only that the phrasing arrived already finished, built to be remembered and passed on. Whatever the sentence was, it was constructed to travel from one mouth to another. Brenn is choosing not to be the mouth that carries it forward.`;
        addJournal('Brenn confirms officer is seeding a message — refusing to transmit', 'evidence', `ith-brenn-pressure-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The transferred officer left a forwarding seal at the transit registry. It was never collected.",
    skill: 'charm',
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
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The forwarding seal is in the uncollected tray. The registry date matches the week of the reassignment. The clerk confirms the credential mark is an internal enforcement division — not a regional posting, not a transit billet. The officer stayed in Ithtananalor under a reclassified unit designation. The unit name on the seal is partially legible through the wax impression: logistics, a word, then an authorization sequence the clerk will not read aloud.`;
        addJournal('Transferred officer seal recovered — stayed in Ithtananalor, reclassified unit', 'intelligence', `ith-officer-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The threshold isn't a round number. Someone calculated the exact audit ceiling.",
    skill: 'wits',
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
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The threshold is 847 weight-units. Cross-referencing public audit schedules and trade registration floor values confirms the figure is not administratively standard — it falls below every published audit trigger in the registry by a margin too precise to be coincidental. The specific derivation requires a formula this analysis cannot reconstruct without restricted enforcement parameters, but the intentionality is clear. Someone calculated this number to avoid automatic detection.`;
        addJournal('Quota threshold 847 — non-standard, deliberately calibrated below all public audit triggers', 'evidence', `ith-quota-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The contraband needs cold storage. Three registered cold holds in the enforcement quarter.",
    skill: 'vigor',
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
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Two of the three registered cold holds are standard enforcement storage — temperature consistent with evidence preservation, access logs cross-referenced with active case files. The third is different. Ambient temperature is lower than evidence protocols require, the access log entries use a numeric code rather than officer names, and the condensation pattern on the exterior bracket shows the door opens on a different schedule than the listed maintenance rotation. The ghost account endpoints are running a live cold hold inside enforcement storage.`;
        addJournal('Third cold hold — below-protocol temp, coded access, off-schedule operation confirmed', 'evidence', `ith-cold-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `The enforcement quarter cold holds are in a restricted service corridor that requires active duty credentials to enter. The approach through the supply access door triggers a proximity sensor mounted inside the frame — a secondary security layer not on the public facility schematic. A duty officer appears from the far end of the corridor within four minutes. The exit is uncontested but the corridor access has been logged under a surveillance classification that routes to the Shadowhands duty desk automatically.`;
        addJournal('Cold hold corridor triggered sensor — auto-routed to Shadowhands duty desk', 'complication', `ith-cold-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The physical survey of the three cold holds requires working through the service access on a maintenance schedule. Two hold examination confirms standard evidence protocols. The third is accessible from the exterior bracket only — the service hatch is sealed from inside. The temperature differential between the bracket and the wall surface is measurable with a hand pressed flat against the stone: colder than the other two, colder than necessary for evidence preservation. Something is stored there on a cycle that does not match the maintenance log.`;
        addJournal('Third cold hold exterior survey — below-protocol temp, sealed interior access', 'intelligence', `ith-cold-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The materials exemption in the anti-magic statute is in different handwriting than the rest.",
    skill: 'spirit',
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
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The exemption clause is a later insertion — the vellum density is lighter than the surrounding pages, the ink oxidation profile puts it three to four years after the statute's original ratification, and the scribal hand uses a ligature style that replaced the older form only after Guild administrative reforms. The exemption that allows enforcement-level access to bypass anti-magic containment protocols was not part of the original statute. It was inserted after the ghost accounts were opened. The sequence is inverted: the accounts came first, then the legal cover was created.`;
        addJournal('Statute exemption inserted after original ratification — legal cover created post-hoc for accounts', 'evidence', `ith-statute-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The statute archive copy is sealed under a preservation order that requires Guild certification to handle for materials analysis. The public reading copy has the exemption clause in a consistent hand — either the insertion was done by a skilled forger who matched the original, or the reading copy was replaced entirely. Without the sealed original for comparison, the analysis cannot establish provenance. The request to inspect the sealed copy goes into the certification queue. A Shadowhands administrative liaison receives the queue notification automatically.`;
        addJournal('Statute original sealed — public copy inconclusive, certification request logged', 'complication', `ith-statute-fail-${G.dayCount}`);
      } else {
        G.flags.statute_exemption_provenance = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The exemption clause sits at the bottom of the third page, in a hand that tilts forward where the rest of the document tilts back. The ink in that section has a slightly different sheen under angled light — a different mixing ratio, a different preparation. Without laboratory comparison it cannot be confirmed as a later insertion, but the physical difference is present and consistent. The clause that grants enforcement bypass of containment protocols reads like it was added rather than written with the document.`;
        addJournal('Statute exemption — physical inconsistency suggests later insertion, unconfirmed without lab analysis', 'intelligence', `ith-statute-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Harlan's second ledger behind the bar holds names and dates he doesn't trust to memory.",
    skill: 'finesse',
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
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The ledger behind the bar is a narrow cloth-bound book, entries in a compressed hand — dates, a unit abbreviation, a count, occasionally a single word that functions as a note. Twelve entries over seven months correspond to the ghost account transaction dates identified earlier: same date, a unit abbreviation that matches the unlisted logistics sub-unit from the forwarding seal. Harlan has been quietly documenting the same activity. His entry from four days ago reads: "verification window — closing, two weeks."`;
        addJournal('Harlan\'s private ledger — 12 entries matching ghost account dates, closing window noted 4 days ago', 'evidence', `ith-harlan-ledger-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `Harlan is behind the bar when the reach toward the ledger becomes visible to him — not a dramatic moment, just the particular stillness of a man who has spent years reading what enforcement officers do with their hands when they think no one is tracking. He sets a tankard down on the ledger without looking directly at it. When he meets the eyes across the bar his expression carries no accusation, just the flat exhaustion of someone who has already decided he cannot afford to have any conversation about what just happened.`;
        addJournal('Harlan ledger access burned — innkeeper aware, channel closed', 'complication', `ith-harlan-ledger-fail-${G.dayCount}`);
      } else {
        G.flags.harlan_ledger_read = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The ledger is accessible for thirty seconds before Harlan returns from the cellar stair. Eight entries are visible in that window — dates and unit abbreviations, nothing self-explaining. Three of the dates land within a day of ghost account transaction dates from the evidence already gathered. The unit abbreviation is consistent across all eight: a two-letter code that does not appear on any public enforcement org chart. The ledger closes when Harlan's steps reach the top of the stair.`;
        addJournal('Harlan ledger — eight entries visible, three dates match ghost account activity, unknown unit code', 'intelligence', `ith-harlan-ledger-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The ore assay records declare a grade the foundry output cannot physically produce.",
    skill: 'spirit',
    tags: ['Stage2', 'NPC'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'cross-referencing ore assay records against foundry output');
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('spirit', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.assay_discrepancy_confirmed = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The certified assay records declare Grade IV purity on three consignments spanning five months. Grade IV ore produces a specific slag ratio during smelting — a ratio the foundry's own exhaust vents make physically impossible to fake. The vent deposits run consistently at Grade II chemistry. Someone certified ore they never tested at a grade they knew it could not be. The assay stamps carry a registrar number that does not appear on the current roster. The registrar was active, then not.`;
        addJournal('Assay records fraudulent — Grade IV declared on Grade II ore, registrar number unverifiable', 'evidence', `ith-assay-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The assay archive desk sits behind a narrow fortification window where cold light falls across the certification ledger at an angle that makes the access tier markings easy to read. The certification level presented does not clear the threshold for the consignment grade range in question — a single classification tier short, which might as well be ten. The inquiry goes into a pending queue behind an assessor review. Pending queue access logs route to the same enforcement monitoring channel as the ledger queries, the wait is indefinite, and there is now a name attached to a record of interest in technical assay data.`;
        addJournal('Assay archive access denied — certification threshold, inquiry logged', 'complication', `ith-assay-fail-${G.dayCount}`);
      } else {
        G.flags.assay_discrepancy_confirmed = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The assay records for the three-consignment window are accessible at the summary level, the garrison stone of the service walkway cold through the boot soles as the vent deposits come into view above. The declared grade is IV across all three — a high-purity designation carrying significant quota value above Grade II material. The foundry vent deposit color visible from the walkway runs dark and sulfurous, a Grade II chemistry indicator, unambiguous to anyone who has spent time near a working smelter. The chemistry does not match the paper. Confirming the discrepancy precisely requires the technical intake records, a tier above what is available here.`;
        addJournal('Assay grade declared vs foundry vent chemistry mismatched — technical records inaccessible', 'intelligence', `ith-assay-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The courier runs the cold hold and the foundry dock every morning.",
    skill: 'finesse',
    tags: ['Stage2', 'NPC'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'mapping Shadowhands courier route');
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('finesse', (G.skills.stealth||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.courier_route_mapped = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Three mornings of position work from the service corridor overhang. The courier departs the Shadowhands logistics annex at the fifth bell, walks to the foundry dock first, then the cold hold, then back. Each stop is under four minutes. No exchange of goods visible — only a gloved hand pressed to a panel and held there. The panels at both stops are newer than the surrounding wall fittings. They are not structural. They are readers for something embedded in the courier's glove. A material transfer system that leaves no physical trace.`;
        addJournal('Courier route confirmed — panel-reader transfer system, no visible goods exchange', 'evidence', `ith-courier-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `The courier is trained for exactly the kind of observation being attempted — the overhang position is one of four that any competent surveillance-aware operative checks by habit on a sensitive route. The courier does not break stride but lifts two fingers against the thigh on the third morning, which is a signal rather than a habit. The route changes the following day. Whatever pattern existed is now retired.`;
        addJournal('Courier route observation burned — route retired, signal logged', 'complication', `ith-courier-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Two mornings of observation confirm the courier stops at both the foundry dock and the cold hold on the same circuit. The stop duration is consistent: short enough that no goods exchange is possible, long enough that something else is happening. The gloves are the same style both mornings — indoor courier gloves, grip-reinforced, an unusual choice for a route that is mostly interior. The pattern is clear. The mechanism is not.`;
        addJournal('Courier route confirmed — same stops, same gloves, mechanism unclear', 'intelligence', `ith-courier-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The notice board runs two layers. The public one, and the one posted behind it.",
    skill: 'wits',
    tags: ['Stage2', 'NPC'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'reading enforcement quarter notice board second layer');
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.notice_board_second_layer = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The public board is a cedar frame, notices pinned in the standard civic format. The frame itself is mounted on a secondary backing board that extends six inches beyond the cedar on three sides — the extra space is filled with notices in a smaller hand, pinned beneath the public layer and readable only from an angle that no casual passer would take. Four of the sub-layer notices carry the two-letter unit code from Harlan's private ledger. One of them lists a name, a date, and the word "cleared." The date is the same week the ghost accounts first appeared.`;
        addJournal('Notice board sub-layer — unit code with name cleared on same week accounts opened', 'evidence', `ith-noticeboard-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The angle required to read the secondary layer means standing with shoulders turned and gaze tilted down and to the right — a posture that no civilian arriving at the public board would ever hold. A duty officer on the far side of the courtyard tracks the position for thirty seconds before walking over. The conversation is brief and formally polite. The credential is checked, returned, and a notation made. The board is a watched location now.`;
        addJournal('Notice board angle posture flagged — duty officer notation made', 'complication', `ith-noticeboard-fail-${G.dayCount}`);
      } else {
        G.flags.notice_board_second_layer = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The secondary layer exists. Three notices visible from the available angle before the position becomes conspicuous — two carry the two-letter unit code, one carries a date and a status mark. The status mark uses a symbol that does not appear in any public enforcement cipher, which means it is internal to the unit. The board is a communication channel for the unlisted logistics sub-unit. Reading the full layer requires more time and a better cover than is available now.`;
        addJournal('Notice board secondary layer confirmed — unlisted unit communication channel', 'intelligence', `ith-noticeboard-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "A case file opened, sealed, and never docketed. That sequence is not procedurally possible.",
    skill: 'wits',
    tags: ['Stage2', 'NPC'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'examining civic tribunal sealed undocketed case file');
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.tribunal_sealed_case_found = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The case number exists in the intake register but not in the docket — a gap that requires a magistrate-level override to create, because the intake system automatically assigns docket numbers at the moment of opening. The override code used is identical to the authorization code on the archive's cross-referenced oath-breaker redactions. One person executed both operations: the tribunal case suppression and the archive redactions. The operations occurred in the same four-hour window. That person had simultaneous access to the tribunal and the archive under a single authority code.`;
        addJournal('Tribunal suppression and archive redaction — same authorization code, same four-hour window', 'evidence', `ith-tribunal-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `The tribunal registrar's intake counter closes for the midday compliance review exactly when the case number is found in the register. The gap between intake and docket is visible — a sealed case with no docket assignment — but the registrar who returns after compliance review is a different clerk, and the question about the case number produces a referral form rather than an answer. The referral requires magistrate authorization to process and will take three to five working days. The inquiry is now in the official queue with a name attached.`;
        addJournal('Tribunal sealed case — referral form issued, name in official queue', 'complication', `ith-tribunal-fail-${G.dayCount}`);
      } else {
        G.flags.tribunal_sealed_case_found = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The intake register shows a case number with an opening date and a sealed notation. The docket column is empty. The intake clerk, when asked about the procedural gap, consults a manual she has not opened in some time and confirms that sealed-before-docket requires a magistrate override — the system does not permit it otherwise. She cannot say who executed the override from her access tier. The case itself is sealed. The existence of the override is now documented.`;
        addJournal('Tribunal case opened-sealed-undocketed confirmed — magistrate override required, identity unknown', 'intelligence', `ith-tribunal-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The foundry supervisor tallies ore by weight before it enters the quota system. Not after.",
    skill: 'charm',
    tags: ['Stage2', 'NPC'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'speaking with foundry supervisor about pre-quota weight tally');
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.foundry_supervisor_tally = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The foundry supervisor — a broad woman named Ansel Druve who keeps her tally on a strip of waxed linen tucked inside her belt rather than in any official format — shows the strip without much persuading. She has been waiting for someone with a reason to look. Her pre-quota numbers run consistently higher than the declared extraction by a margin between 12 and 15 percent across every month the ghost accounts have been active. The missing weight is being extracted before it reaches the quota system entirely.`;
        addJournal('Supervisor Ansel Druve — pre-quota tally shows 12-15% extraction before quota system entry', 'evidence', `ith-supervisor-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The foundry floor is a supervised workspace — the supervisor's position has line of sight to every entry point, and a stranger at the intake bay asking about weight tally methodology reads as a quality audit, which requires authorization from the enforcement oversight desk. The supervisor is professional and unhelpful in the particular way of someone who has learned that helpfulness without authorization creates problems. The question goes nowhere and the approach is noted in the shift log.`;
        addJournal('Foundry floor approach — authorization required, shift log noted', 'complication', `ith-supervisor-fail-${G.dayCount}`);
      } else {
        G.flags.foundry_supervisor_tally = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Ansel Druve does not produce her strip immediately, but she confirms she keeps one. The declared numbers come from the quota intake desk, not from her floor tally, and the two sets of numbers do not always agree. She characterizes the discrepancy as "measurement variance" in the same careful register Ivena used with her practiced deflection — the phrase of someone who has found a way to name the thing without carrying it. She did not say the numbers match. She said variance.`;
        addJournal('Supervisor Druve confirms pre-quota tally discrepancy — "measurement variance"', 'intelligence', `ith-supervisor-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "He filed a query eighteen months ago. Had a new posting within the week.",
    skill: 'charm',
    tags: ['Stage2', 'NPC'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'tracing compliance officer transfer after filing formal query');
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.compliance_officer_trace = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The officer's name is Pell Varic. His transfer record lists a posting in the transit administration tier — a desk that processes cargo transit amendments and reports to no one in the enforcement chain. The posting was created eight days after his query was filed. The query itself was formally closed as "resolved — no further action," signed by an authorization code that matches the one used on the tribunal suppression. Pell Varic is alive, in Ithtananalor, in a desk that exists specifically to keep him contained and isolated from enforcement channels.`;
        addJournal('Pell Varic — compliance officer isolated in transit admin desk, query closed by same authorization as tribunal suppression', 'evidence', `ith-varic-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `Personnel records from eighteen months ago require a records access authorization that takes a working day to obtain through proper channels. The informal route — asking at the personnel registry counter — triggers a secondary check when the officer's name is entered, and the check produces a flag that routes the query to the Shadowhands administrative desk. The flag is attached to the credential before any information is returned. The desk now knows the name was asked about, and by whom.`;
        addJournal('Pell Varic name query — personnel flag routes to Shadowhands administrative desk', 'complication', `ith-varic-fail-${G.dayCount}`);
      } else {
        G.flags.compliance_officer_trace = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The personnel registry locates Pell Varic in the transit administration tier — a posting that takes a moment to find because it does not appear in the standard enforcement org chart. His formal query from eighteen months ago is listed as closed; the closure notation is brief and offers no substance. The transfer and the closure share a date proximity that is too tight for coincidence. Varic is findable. Getting to him without alerting whatever channel processed his original query is the problem.`;
        addJournal('Pell Varic located — transit admin non-posting, query closure date matches transfer', 'intelligence', `ith-varic-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The reclassified unit occupies a floor of the enforcement quarter not on the building schematic.",
    skill: 'vigor',
    tags: ['Stage2', 'NPC'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'locating unlisted logistics unit floor in enforcement quarter');
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('vigor', (G.skills.survival||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.logistics_floor_located = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The enforcement quarter building is six floors by the public schematic. The exterior stairwell, counted from the ground, has seven landings. The seventh floor has no windows on the south face where the other six do — the stonework is newer, the mortar line visible from the adjacent rooftop. The single access point is a door on the sixth-floor landing that is keyed separately from the standard enforcement access system. Through a gap in the sixth-floor window shutter: a clerk's desk, stacks of material transfer manifests, and on the wall the two-letter unit identifier from Harlan's ledger, rendered large in painted block letters.`;
        addJournal('Seventh floor confirmed — unlisted logistics unit, separate key system, material transfer manifests visible', 'evidence', `ith-logistics-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `The roof access that would give a count of the exterior stairwell landings requires crossing a service bridge flagged for maintenance restrictions. The bridge warden — a tired man with a clipboard — records the attempt and the credential. The maintenance restriction is a standing one that has been renewed on a rolling basis for eleven months. It is not a construction restriction. It is an access restriction, maintained on the same renewal schedule as the ghost accounts.`;
        addJournal('Roof access blocked — maintenance restriction renewed monthly, access logged', 'complication', `ith-logistics-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The exterior stairwell count from ground level: seven landings, six windows on the south face. The discrepancy is one floor. The seventh landing door is visible from the sixth-floor corridor through the gap between a storage rack and the wall — heavier frame, different hardware, no unit placard. The access system is independent of the floor below. Whatever occupies the seventh floor does not share access protocols with the standard enforcement quarter. The interior is not visible from this position.`;
        addJournal('Seventh floor physical evidence — heavier door, independent access, no placard', 'intelligence', `ith-logistics-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The external auditor hasn't set foot here for three consecutive review periods.",
    skill: 'wits',
    tags: ['Stage2', 'NPC'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'tracing external auditor absence from compliance cycle');
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.auditor_absence_confirmed = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The compliance cycle ledger shows external auditor sign-ins for three consecutive review periods — same handwriting, same credential notation, same inspection seal. The Guild transit registry shows no arrival record for the auditor's name during any of those windows. The signature in the compliance ledger was not written by the auditor. The compliance cycle for the past eighteen months has been self-certified by the enforcement apparatus it was supposed to independently review, and the forgery of the auditor's presence was done carefully enough to pass routine inspection.`;
        addJournal('Auditor signatures forged — three consecutive compliance periods self-certified by enforcement apparatus', 'evidence', `ith-auditor-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The compliance ledger is held at the Guild administrative desk, not the enforcement quarter, and the cross-referencing required — ledger sign-ins against transit registry arrivals — triggers a Guild protocol flag when the credential presented does not carry auditor authorization. The flag pauses the request and routes it to a Guild compliance officer for review. In Ithtananalor, that officer operates on a seven-day review cycle. The inquiry sits in the queue with the credential attached.`;
        addJournal('Auditor cross-reference flagged — Guild compliance queue, seven-day review cycle', 'complication', `ith-auditor-fail-${G.dayCount}`);
      } else {
        G.flags.auditor_absence_confirmed = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The compliance ledger confirms auditor sign-ins for all three periods. The transit registry is accessible for the same date ranges and shows no arrival entry for the auditor's credential mark during any of the three windows. Both records cannot be accurate. The discrepancy is real and documented across two independent administrative systems that do not communicate with each other, which means the inconsistency has existed without being noticed or without anyone having cause to check.`;
        addJournal('Compliance sign-ins vs transit registry — auditor presence unverifiable across three periods', 'intelligence', `ith-auditor-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The evidence is ready. Roaz or independent disclosure — both paths are open.",
    skill: 'might',
    tags: ['Investigation', 'Finale', 'Stage2', 'Consequence', 'Meaningful'],
    xpReward: 115,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(115, 'Ithtananalor Stage 2 resolution');
      if (!G.investigationProgress || G.investigationProgress < 8) {
        G.lastResult = `The evidence map on the table has empty columns where the critical links should be — gaps that an enforcement apparatus practiced at self-protection will exploit the moment the package is presented. The ghost account chain requires full documentation across every step: origin authorization, routing, endpoint activity, and the chain of oversight that permitted it to run without intervention. A presentation now gives the apparatus room to discredit each piece individually, detaching them from the chain they form together until none of them carry enough weight alone. The chain needs closing before it goes anywhere.`;
        G.recentOutcomeType = 'partial'; return;
      }
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('combat', (G.skills.combat||0) + Math.floor(G.level/2));
      if (result.total >= 14 || result.isCrit) {
        G.flags.stage2_finale_institutional = true;
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 3;
        G.lastResult = `The presentation to Captain Roaz takes place across a desk cleared of everything except the documentation. He reads without speaking, each page turned deliberately, the particular quiet of a garrison building where the chain of command has become uncertain holding around the room. When the last page goes face-down he holds it there for a moment with one hand flat. A formal internal affairs review opens under his command authority within the hour — broad enough to bypass the Shadowhands administrative layer entirely. Stage III opens with Roazian enforcement backing and the Shadowhands fully aware that they are being watched.`;
        addJournal('Ithtananalor S2 finale: Roaz enforcement path', 'evidence', `ith-finale-inst-${G.dayCount}`);
      } else {
        G.flags.stage2_finale_underworld = true;
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 3;
        G.lastResult = `The evidence packet moves through Ivena's network and the guild enforcement channels simultaneously — not through Roaz command, not through any route the Shadowhands monitor. By the time the apparatus recognizes that the disclosure is in motion, the information is already across three separate distribution points. The ghost accounts become public knowledge before any containment procedure can be organized. The cost is that the formal chain of authority carries none of it. Stage III opens with the accounts exposed but the institutional apparatus hostile.`;
        addJournal('Ithtananalor S2 finale: independent disclosure path', 'evidence', `ith-finale-uw-${G.dayCount}`);
      }
      G.flags.stage2_faction_contact_made = true;
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  // ── NEW SP2 CHOICES — direct stageProgress increment ──

  {
    label: "The forest compact boundary marker was moved. The archive still shows the old position.",
    skill: 'wits',
    tags: ['Stage2', 'Records', 'Evidence'],
    xpReward: 20,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(20, 'forest compact boundary discrepancy');
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var roll = rollD20('wits', G.skills.lore);
      if (roll.total >= 13) {
        G.flags.ith_forest_compact_boundary = true;
        G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        G.lastResult = 'The forest compact boundary is a legal demarcation that establishes which arcane activities require forest-authority licensing — anything within the boundary requires approval from the compact\'s oversight body. The archive map shows the boundary running along the eastern ridge. The physical markers in the ground run two hundred meters east of the ridge, which places the enforcement quarter\'s anti-magic statute coverage area inside the compact zone. Operations that need compact oversight have been conducted without it. The discrepancy is not new: the markers were moved six years ago. The archive map was never updated. Someone left both records to coexist.';
        addJournal('Forest compact boundary markers moved 200m east of archive map position — enforcement quarter operations in compact zone without required oversight for 6 years', 'evidence');
        G.recentOutcomeType = 'success';
        maybeStageAdvance();
      } else {
        G.lastResult = 'The compact boundary map is a large-format document that requires the reading room\'s extended table to lay flat. The reading room extended table is reserved for the morning session — afternoon walk-in access requires a confirmed booking. The booking register for this week is full. The compact boundary position can be verified physically by walking the marker line, which takes two hours and produces no written record.';
        addJournal('Compact boundary archive map inaccessible afternoon — extended table reserved; physical marker survey possible but produces no record', 'intelligence');
        G.recentOutcomeType = 'complication';
        maybeStageAdvance();
      }
    }
  },

  {
    label: "The magical licensing register shows approvals issued against applications that were never filed.",
    skill: 'wits',
    tags: ['Stage2', 'Records', 'Evidence'],
    xpReward: 20,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(20, 'magical licensing register ghost approvals');
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var roll = rollD20('wits', G.skills.lore);
      if (roll.total >= 13) {
        G.flags.ith_licensing_ghost_approvals = true;
        G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        G.lastResult = 'The magical licensing register and the application log are two separate documents that are supposed to match — each approval in the register should correspond to a filed application. Cross-referencing the two reveals seven approvals in the register with no corresponding application: the approval was issued, the license number assigned, and the fee collected, but the originating application form does not exist in the log. The fee collection dates cluster around the same months the ghost ore accounts were active. The license fees went somewhere. The applications they purchased do not exist.';
        addJournal('Magical licensing register: 7 approvals issued with no corresponding applications — fee collection dates match ghost account activity period', 'evidence');
        G.recentOutcomeType = 'success';
        maybeStageAdvance();
      } else {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
        G.lastResult = 'The application log is kept by the licensing bureau, and the register by the enforcement administration — they are not maintained in the same office or cross-referenced as a matter of routine. Pulling both documents together requires a formal records reconciliation request filed jointly to both offices. The reconciliation request goes to both administrators simultaneously and takes three working days. Both offices will know the comparison is being made before the comparison is done.';
        addJournal('Licensing register and application log cross-reference requires joint formal request — both offices notified simultaneously, 3-day window', 'complication');
        G.recentOutcomeType = 'complication';
        maybeStageAdvance();
      }
    }
  },

  {
    label: "The suppression knowledge is being withheld systematically. The gaps in the archive confirm it.",
    skill: 'wits',
    tags: ['Stage2', 'Records', 'Evidence'],
    xpReward: 20,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(20, 'knowledge suppression archive pattern');
      if (!G.flags) G.flags = {};
      var roll = rollD20('wits', G.skills.lore);
      if (roll.total >= 13) {
        G.flags.ith_knowledge_suppression_pattern = true;
        G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        G.lastResult = 'The subject index for arcane research materials runs from A to W. There is no X, Y, or Z section — the binding is intact on both sides of the gap, which means the sections were removed before the index was bound, not after. The removed sections covered research classifications beginning with the prefix "xen-" — a categorization used exclusively for cross-boundary arcane transfer, the class of activity the ghost accounts were funding. The removal was planned, not reactive. Whoever structured this archive knew what knowledge would need to be inaccessible before the accounts were ever opened.';
        addJournal('Arcane research index: xen- classification sections removed before binding — cross-boundary transfer research excised in advance of ghost account activity', 'evidence');
        G.recentOutcomeType = 'success';
        maybeStageAdvance();
      } else {
        G.lastResult = 'The subject index gaps are visible — sections missing from the binding — but the categories they covered are not labeled on any adjacent page. The archive attendant, when asked about the gaps, consults a procedure card taped inside the reference desk drawer. "Classification restructuring," she says. "Some categories were consolidated." The procedure card she consulted is dated two weeks ago. The restructuring explanation is recent enough to be a prepared response.';
        addJournal('Arcane research index gaps noted — attendant cited "classification restructuring" per procedure card dated 2 weeks ago', 'complication');
        G.recentOutcomeType = 'complication';
        maybeStageAdvance();
      }
    }
  },

];

window.ITHTANANALOR_STAGE2_ENRICHED_CHOICES = ITHTANANALOR_STAGE2_ENRICHED_CHOICES;
