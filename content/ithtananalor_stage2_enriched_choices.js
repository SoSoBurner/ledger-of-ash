/**
 * ITHTANANALOR STAGE 2 ENRICHED CHOICES
 * Investigation arc: ghost ore accounts, Shadowhands involvement, enforcement culture corruption
 * NPCs: Captain Darian Roaz (ORE Supreme Commander), Sir Velden Ironspike (Shadowhands Commander),
 *       Harlan Ironspike (Innkeeper), Ivena Ironspike (Market Clerk), Brenn Ironspike (Shrine Attendant)
 */

var ITHTANANALOR_STAGE2_ENRICHED_CHOICES = [

  {
    label: "The Iron Ledger Ward has three ghost accounts that were flagged and then left alone.",
    plot: 'main',
    skill: 'wits',
    tags: ['Investigation', 'Stage2', 'Meaningful'],
    xpReward: 40,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(82, 'reviewing iron ledger ghost accounts');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.wits||0));
      const arch = G.archetype && G.archetype.group;
      if (result.total >= 13) {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = arch === 'stealth'
          ? `The ghost accounts are cleaner than real accounts. That is the tell. Real accounts accumulate errors — a wrong entry corrected, a date transposed, a margin notation from a different clerk. These three carry no such residue. Every figure is precise, every interval consistent. Someone who knows the ledger system built them, and that level of financial tradecraft runs through Shadowhands operational training.`
          : `Three accounts with no registered owner, no ore delivery records, and consistent quarterly receipts arriving on a schedule no legitimate operator maintains. The accounts are being used to move ore revenue outside the quota system entirely. The original registrations required enforcement-level authorization — this did not happen without a signature from inside the apparatus.`;
        addJournal('Ghost ore accounts confirmed — enforcement authorization', 'evidence', `ith-ledger-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `At the Iron Ledger Ward's intake desk, the clerk runs credentials through the standard log and pauses at the third step. The terminal flags something — an inspection protocol that engages on uncleared third-party access. A Shadowhands duty officer is notified automatically before the clerk even looks up. The exit is quiet, but the enforcement record now carries the query, the timestamp, and the credential line that triggered it.`;
        addJournal('Ledger access logged — Shadowhands notified', 'complication', `ith-ledger-fail-${G.dayCount}`);
        G.recentOutcomeType = 'complication';
      }
      maybeStageAdvance();
    }
  },

  {
    label: "She processes every transaction. She has seen the ghost account activity and said nothing.",
    plot: 'main',
    skill: 'charm',
    tags: ['NPC', 'Persuasion', 'Stage2', 'Meaningful'],
    xpReward: 40,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(78, 'questioning Ivena Ironspike');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.charm||0));
      if (result.total >= 13) {
        G.flags.met_ivena_ironspike = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Ivena has been waiting for someone to ask. The lamp oil smell of the Licensed Goods Counter thickens as she pulls a folded sheet from beneath the stamp rack — her own document, kept separate from the official log. She has recorded 34 transactions routed through accounts she cannot trace to any registered owner. Each transaction is within the legal threshold that would trigger an automatic audit — by exactly one unit below that threshold. Someone calculated the maximum invisible transaction size and built a system around it.`;
        addJournal('Ivena documents — calibrated threshold evasion confirmed', 'evidence', `ith-ivena-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `At the Licensed Goods Counter, the first question back is procedural: who authorized access to the transaction records? The counter keeps its own security log for exactly this kind of external query. The answer given is not sufficient — the log entry goes in regardless, attached to the time, the credential presented, and the subject of the question. The counter is now aware that someone was asking.`;
        addJournal('Goods counter access questioned — logged', 'complication', `ith-ivena-fail-${G.dayCount}`);
        G.recentOutcomeType = 'complication';
      }
      maybeStageAdvance();
    }
  },

  {
    label: "Velden commands the Shadowhands. The accounts point there. A meeting is one option.",
    plot: 'main',
    skill: 'might',
    tags: ['NPC', 'Combat', 'Authority', 'Stage2', 'Meaningful'],
    xpReward: 40,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(90, 'confronting Shadowhands commander');
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      if (!G.factionHostility) G.factionHostility = {};
      if (!G.rivalId) G.rivalId = 'warden_captain';
      const result = rollD20('combat', (G.skills.might||0));
      if (result.total >= 13) {
        G.flags.met_velden_ironspike = true;
        G.flags.stage2_faction_contact_made = true;
        G.worldClocks.rival = (G.worldClocks.rival||0) + 1;
        G.lastResult = `Velden receives you with the kind of careful attention that tells you he has already read your file. He neither confirms nor denies Shadowhands involvement in the accounts. But he gives you one thing: the name of the duty officer who would have processed the original account registrations. That officer was transferred six months ago. To a posting with no public record.`;
        addJournal('Velden meeting — transferred officer name obtained', 'evidence', `ith-velden-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.worldClocks.rival = (G.worldClocks.rival||0) + 2;
        G.factionHostility.warden_order = (G.factionHostility.warden_order||0) + 2;
        G.lastResult = `Two steps inside the Shadowhands Wing, a pair of unit officers bracket the approach and redirect without touching anything. The meeting request was received; no meeting will occur. At the security desk, a formal note is written and signed — not a refusal on paper but a flag, routed upward within the hour. The Roazian enforcement apparatus has now classified the approach as a hostile operation, which changes every access point downstream.`;
        addJournal('Shadowhands — your approach classified as hostile operation', 'complication', `ith-velden-fail-${G.dayCount}`);
        G.recentOutcomeType = 'complication';
      }
      maybeStageAdvance();
    }
  },

  {
    label: "Unusual evening proceedings at the enforcement quarter. The shrine attendant witnessed them.",
    plot: 'main',
    skill: 'charm',
    tags: ['NPC', 'Lore', 'Stage2', 'Meaningful'],
    xpReward: 40,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'questioning Brenn Ironspike shrine keeper');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.charm||0));
      if (result.total >= 13) {
        G.flags.met_brenn_ironspike = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Brenn speaks at the shrine threshold where conversations are protected by civic ritual, the cold stone underfoot and the faint smell of lamp resin the only constants in the exchange. Three times in the past two months, enforcement officers conducted unscheduled processing procedures at the quarter after the civic compliance cycle ended — arriving after the watch bell, leaving before the next one. The procedures were logged as "containment review," a classification that bypasses normal oversight and leaves no recoverable record of what was reviewed or who authorized it.`;
        addJournal('Brenn confirms after-hours containment reviews — oversight bypass', 'evidence', `ith-brenn-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The shrine threshold carries ritual protection under Ithtananalor's civic code, but that protection only holds while the conversation stays inside it. A Shadowhands officer pauses at the outer edge of the grounds, and whatever he hears is enough — he steps forward with the particular deliberateness of someone who has the authority to interrupt a civil proceeding and knows it. Brenn falls silent mid-sentence. The exchange closes before it opens.`;
        addJournal('Shrine conversation interrupted by Shadowhands', 'complication', `ith-brenn-fail-${G.dayCount}`);
        G.recentOutcomeType = 'complication';
      }
      maybeStageAdvance();
    }
  },

  {
    label: "Off-duty Shadowhands officers stay at the quarter inn. An evening there would tell something.",
    plot: 'main',
    skill: 'finesse',
    tags: ['Stealth', 'NPC', 'Stage2', 'Meaningful'],
    xpReward: 40,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(78, 'observing enforcement quarter inn');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('finesse', (G.skills.finesse||0));
      if (result.total >= 13) {
        G.flags.met_harlan_ironspike = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The edge table at Harlan's quarter inn carries the particular smell of old armor grease and spilled barley malt — the scent of officers who stop removing their gear before they drink. Four hours of off-duty conversation wash past. One exchange is significant: two officers, backs turned and voices low, discuss a "verification window closing" at the ore registry in terms that make clear they know the ghost accounts exist and carry a working estimate of how much time remains before the next formal audit cycle forces a reckoning.`;
        addJournal('Inn observation — extraction timeline overheard', 'evidence', `ith-harlan-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `The edge table position reads differently to a trained eye than it does to a civilian one — the sightline, the held posture, the way attention distributes around the room rather than settling on the drink. An officer at the corner of the bar identifies the posture before the first hour is done. The exit is not rough, but it is escorted, and at the door a formal notation goes into the enforcement quarter log: surveillance risk, time and description appended.`;
        addJournal('Inn surveillance detected — enforcement risk log', 'complication', `ith-harlan-fail-${G.dayCount}`);
        G.recentOutcomeType = 'complication';
      }
      maybeStageAdvance();
    }
  },

  {
    label: "The enforcement culture created a shadow market. The ghost account endpoints are somewhere inside it.",
    plot: 'main',
    skill: 'finesse',
    tags: ['Stealth', 'Survival', 'Stage2', 'Meaningful'],
    xpReward: 40,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(84, 'accessing Ithtananalor shadow market');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('finesse', (G.skills.finesse||0));
      if (result.total >= 16) {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `The shadow market runs beneath a legitimate parts exchange near the foundry dock, the garrison stone of the quarter cold under the narrow fortification windows where cold light cuts through at low angles. The ghost account endpoints are purchasing suppressed arcane materials — specifically materials classified under the anti-magic statute that would be unusable without enforcement-level access to bypass the containment protocols. The accounts are moving contraband through the enforcement system itself, using the apparatus as both the conduit and the cover. The enforcement imprimatur is not incidental; it is the mechanism.`;
        addJournal('Ghost accounts purchasing contraband through enforcement bypass', 'evidence', `ith-shadow-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 2;
        G.lastResult = `The shadow market reads unfamiliar faces the way enforcement apparatus reads unauthorized credentials — quickly, and without announcing the conclusion. Within minutes of entry a Shadowhands unit has been signaled. The tail begins at the outer gate and does not lift for forty-eight hours. Every approach to every evidence point during that window is watched. The surveillance window closes entirely, replaced by the problem of being observed.`;
        addJournal('Shadow market identification — 48hr Shadowhands surveillance', 'complication', `ith-shadow-fail-${G.dayCount}`);
        G.recentOutcomeType = 'complication';
      }
      maybeStageAdvance();
    }
  },

  {
    label: "Roaz commands ORE. Either he's been bypassed or his record is cover.",
    plot: 'main',
    skill: 'wits',
    tags: ['Combat', 'Investigation', 'Personal', 'Stage2', 'Meaningful'],
    xpReward: 40,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(88, 'assessing Captain Darian Roaz');
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const arch = G.archetype && G.archetype.group;
      const result = rollD20('wits', (G.skills.wits||0));
      if (result.total >= 16) {
        G.flags.captain_roaz_assessed = true;
        G.flags.stage2_faction_contact_made = true;
        G.lastResult = arch === 'combat'
          ? `Your assessment of Roaz's public record and command decisions reveals a consistent pattern of internal accountability — cases where he sanctioned officers above his direct command. The ghost accounts contradict his documented command culture. He is either being bypassed or his record is cover. A direct meeting is now worth the risk.`
          : `The public record maps a slow erosion. Roaz's command authority over the past six months has been trimmed by a series of administrative reassignments — each one individually unremarkable, each one removing oversight from a specific department. The departments stripped from his remit are exactly the ones where the ghost accounts operate. The reassignments are not random. Someone anticipated internal scrutiny and cleared the field before it could begin.`;
        addJournal('Roaz assessment — either bypassed or cover exists', 'evidence', `ith-roaz-assess-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The pattern of records access — command history, administrative reassignment logs, duty rosters pulled in sequence — reads clearly to anyone watching the archive terminal queue. Roaz's staff has a monitoring function for exactly this kind of lateral review. The methodology was visible before the third request was entered. Command leadership assessment without authorization is now attached to the credential file, and Roaz's office is aware a review was attempted.`;
        addJournal('Command assessment detected — unauthorized review noted', 'complication', `ith-roaz-fail-${G.dayCount}`);
        G.recentOutcomeType = 'complication';
      }
      maybeStageAdvance();
    }
  },

  {
    label: "That deflection was rehearsed. She rehearses lines when she has something to protect",
    plot: 'main',
    skill: 'charm',
    tags: ['stage2', 'ithtananalor'],
    xpReward: 30,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      var roll = rollD20('charm', G.skills.charm);
      if (roll.total >= 13) {
        G.flags.ivena_second_contact = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        addNarration('Ivena — Second Approach', 'You find her at the Licensed Goods Counter near closing hour, when the queue has thinned. Her thumb traces the edge of a transaction stamp without pressing it. When you mention the threshold calibration — the one-unit margin — she sets the stamp down with too much precision. She says she once filed a discrepancy report through the internal channel. The report was returned to her desk the following morning with no routing record and a single word crossed through: "resolved."');
        addJournal('Ivena filed a discrepancy report — returned without routing, marked resolved', 'evidence', 'ith_s2_ivena_discrepancy');
        maybeStageAdvance();
      } else {
        addNarration('Ivena — Closed Door', 'She sees you coming this time. By the time you reach the counter she has a queue citation form ready and her eyes fixed on the seal press, the stamp rack between you like a wall she built while you were still crossing the floor. The practiced statement surfaces again, word for word, same cadence as before — the particular blankness of a sentence rehearsed until it carries no expression at all. Whatever opened briefly in the first exchange has closed, and nothing in her posture suggests it will open again.');
      }
    }
  },

  {
    label: "The dock is moving weight on nights the ledger shows nothing moving.",
    plot: 'main',
    skill: 'wits',
    tags: ['stage2', 'ithtananalor'],
    xpReward: 30,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      var roll = rollD20('wits', G.skills.wits);
      if (roll.total >= 13) {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        addNarration('Foundry Dock — Night Manifest', 'The dock manifest board runs in two columns: daytime shipments in black ink with quota stamps, night entries in red with a classification mark you do not recognize. You copy three red entries. The weight figures in the red column do not correspond to any ore grade in the public extraction registry — the loads are too light for raw ore, too heavy for refined ingot. A fourth entry has been physically cut from the board and pasted over. The paper underneath is a different weight.');
        addJournal('Foundry night manifest — unregistered weight class, one entry physically excised', 'evidence', 'ith_s2_foundry_night_manifest');
        maybeStageAdvance();
      } else {
        addNarration('Foundry Dock — Watched', 'A labor foreman notices you at the manifest board before you can copy anything. He does not ask what you are doing. He simply stands beside the board until you move away, one hand resting on the quota stamp rack, garrison stone cold through the soles of boots that have been standing here long enough to feel it. His expression carries the particular blankness of someone who has learned not to witness things — not innocence, not compliance, just the flat professional absence of a man who has decided that his eyes are not a reliable instrument in this particular workplace.');
      }
    }
  },

  {
    label: "The checkpoint officer clocked my hesitation — in Ithtananalor that hesitation is already a record",
    plot: 'main',
    skill: 'finesse',
    tags: ['stage2', 'ithtananalor'],
    xpReward: 30,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      var roll = rollD20('finesse', G.skills.finesse);
      if (roll.total >= 13) {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        addNarration('Checkpoint — Controlled Entry', 'You present credentials before the officer asks. The seal gets checked twice — that is standard — but you keep your weight forward and your eyes on the gate frame rather than the officer\'s hands, the way locals do when they have nothing to hide and are mildly bored by the process. He logs you through without a secondary notation. On the other side, the administrative wing archive is accessible for the next two hours without an escort requirement.');
        addJournal('Administrative wing archive accessed without escort — two-hour window', 'discovery', 'ith_s2_admin_archive_access');
        maybeStageAdvance();
      } else {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
        addNarration('Checkpoint — Secondary Notation', 'The pause before answering is half a second too long — long enough for the officer to mark it, short enough that there is nothing overt to object to. Cold light through the narrow fortification window catches the stylus as it adds a second line beneath the entry. Secondary notation: purpose unclear. In Ithtananalor, a military installation where orders have stopped making complete sense to the people executing them, that notation follows the credentials to every checkpoint downstream today and sits in the enforcement record indefinitely.');
      }
    }
  },

  {
    label: "The archive's binding-law index bleeds into the enforcement catalogue at one seam",
    plot: 'main',
    skill: 'wits',
    tags: ['stage2', 'ithtananalor', 'Archive', 'Meaningful'],
    xpReward: 40,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(82, 'working the archive classification seam');
      const result = rollD20('wits', (G.skills.wits||0));
      if (result.total >= 16) {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        if (G.investigationProgress === 5) { G.worldClocks = G.worldClocks || {}; G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1; }
        G.lastResult = `The seam is real. Four case numbers cross-reference between oath-binding precedent and enforcement disposition — soldiers declared oath-breakers in the same month the ghost accounts first cleared. The disposition entries are redacted to a single line each. The redaction pattern is identical across all four. One hand did this work under institutional pressure, one shift, one authorization code. The index preserves the shape of what was removed.`;
        addJournal('Archive seam: four oath-breaker dispositions redacted under one authorization', 'evidence', `ith-archive-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `The cross-reference request triggers the archive's internal flag. A senior registrar arrives at the reading carrel without being summoned — no knock, no announcement, just the sound of deliberate footsteps on garrison stone stopping at precisely the right shelf. The flag reaches further than the reading room; that much is clear from the route the registrar took to get here without being called. The query slip is retained and noted. The entries that triggered it are not produced. The exit from the reading room is unhurried and watched every step of the way.`;
        addJournal('Archive cross-reference flagged — registrar intervention', 'complication', `ith-archive-fail-${G.dayCount}`);
        G.recentOutcomeType = 'complication';
      }
      maybeStageAdvance();
    }
  },

  {
    label: "A second perimeter circles the Ledger Ward — unmarked, paired, started after my query",
    plot: 'main',
    skill: 'finesse',
    tags: ['stage2', 'ithtananalor', 'Stealth', 'Meaningful'],
    xpReward: 40,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(80, 'reading the second perimeter');
      const result = rollD20('finesse', (G.skills.finesse||0));
      if (result.total >= 13) {
        G.flags.ith_second_perimeter_read = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `From a balcony above the ward's eastern approach, the rotation resolves. Six officers working in pairs, forty-minute swaps, hand-off at the fountain where no clerk can see them. One officer in every pair wears gloves indoors — Shadowhands courier tell, a grip-safety habit from handling sealed pouches. They are not watching the ward. They are watching who approaches the terminals where your queries land.`;
        addJournal('Second perimeter is query-reactive, not ward-reactive — surveillance targets you', 'intelligence', `ith-perimeter-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `The balcony is covered from an angle that did not register during the approach — a gap between roof parapet and wall corbel that opens exactly the right sightline from the courtyard below. An officer lifts a gloved hand and taps twice against his thigh, the signal precise and unhurried. The exit from the balcony comes before the partner closes the gap. Whatever rotation pattern existed has now been redrawn around the fact of being seen. The second perimeter is still there. The version that was just observed is gone.`;
        addJournal('Perimeter observation burned — rotation reconfigured', 'complication', `ith-perimeter-fail-${G.dayCount}`);
        G.recentOutcomeType = 'complication';
      }
      maybeStageAdvance();
    }
  },

  {
    label: "The same officer has stood at Brenn's shrine threshold three mornings running",
    plot: 'main',
    skill: 'charm',
    tags: ['stage2', 'ithtananalor', 'NPC', 'Persuasion', 'Meaningful'],
    xpReward: 40,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(78, 'checking on Brenn under pressure');
      const result = rollD20('charm', (G.skills.charm||0));
      if (result.total >= 13) {
        G.flags.brenn_under_pressure = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Brenn meets you at the side altar where the attendance log cannot reach. They speak without looking at you, arranging the votive stones in the order they were arranged the morning before. "He stands where petitioners usually stand. He does not petition. Yesterday he asked me the hours the shrine keeps a witness present. That is not a scheduling question." The third stone goes down harder than the first two. "He is telling me the shrine is not a shelter anymore."`;
        addJournal('Brenn under standing-surveillance — shrine sanctuary being revoked by presence', 'evidence', `ith-brenn-pressure-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Brenn sees the approach from twenty feet out and turns to face the inner altar — the shrine's signal that a keeper is in private devotion and cannot be disturbed under civic ritual protection. The cold stone of the threshold is between the officer and the altar, but the officer's line of sight covers both. Brenn's withdrawal is a correct and legal move; it protects them from the exchange being recorded as a breach. It also closes the channel completely. The shrine is not accessible as a route while that officer is present, and the officer has been present three mornings running.`;
        addJournal('Brenn withdrew into ritual cover — shrine channel cold', 'complication', `ith-brenn-pressure-fail-${G.dayCount}`);
        G.recentOutcomeType = 'complication';
      }
      maybeStageAdvance();
    }
  },

  {
    label: "The transferred officer left a forwarding seal at the transit registry. It was never collected.",
    plot: 'main',
    skill: 'charm',
    tags: ['Stage2', 'NPC'],
    xpReward: 40,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'tracing transferred duty officer forwarding seal');
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.charm||0));
      if (result.total >= 13) {
        G.flags.duty_officer_trace_complete = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The forwarding seal sits in the uncollected tray at the transit registry, dated the same week Velden mentioned the reassignment. The registry clerk — a woman who keeps a worn ledger stamp tucked in her sleeve seam — recognizes the credential mark on the seal as Shadowhands logistics division, a sub-unit that handles material transport outside normal quota channels. The officer was not reassigned to a distant posting. The "posting with no public record" is a desk inside the same enforcement quarter, reclassified under a unit that does not appear on the public org chart.`;
        addJournal('Transferred officer — still in quarter, unit unlisted on public org chart', 'evidence', `ith-officer-trace-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The transit registry clerk checks the uncollected tray and pauses. The forwarding seal is there, but the check triggers a secondary log — an alert affixed to the credential mark that routes any access attempt to the Shadowhands logistics desk. By the time the clerk looks back up, the answer is a practiced apology: this item requires pickup authorization from the issuing unit. The item stays in the tray, and someone in the logistics division now knows it was asked about.`;
        addJournal('Forwarding seal access attempted — Shadowhands logistics alerted', 'complication', `ith-officer-fail-${G.dayCount}`);
        G.recentOutcomeType = 'complication';
      }
      maybeStageAdvance();
    }
  },

  {
    label: "The threshold isn't a round number. Someone calculated the exact audit ceiling.",
    plot: 'main',
    skill: 'wits',
    tags: ['Stage2', 'NPC'],
    xpReward: 40,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'analyzing quota calibration mathematics');
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.wits||0));
      if (result.total >= 13) {
        G.flags.quota_calibration_traced = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The audit trigger threshold is 847 weight-units — not a round administrative figure, not a standard trade denomination. It derives from a formula published in a restricted enforcement operations manual that has not been publicly distributed since the quota system was redesigned four years ago. Someone with access to that manual set the ghost account transaction ceiling. Enforcement operations manuals at that access tier require Shadowhands command clearance to obtain. The threshold is a fingerprint.`;
        addJournal('Quota threshold 847 — derived from restricted enforcement manual, command clearance required', 'evidence', `ith-quota-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The quota mathematics pull from three overlapping regulatory frameworks, each one updated on a different cycle. Without access to the current enforcement operations parameters — a restricted document tier — reconstructing the trigger formula from public sources produces four plausible thresholds, none of which can be confirmed as the operative one. The time spent at the registry terminal generates an access log entry that sits in the same system as the query that triggered the initial Shadowhands notification.`;
        addJournal('Quota threshold calculation failed — restricted parameters inaccessible, access logged', 'complication', `ith-quota-fail-${G.dayCount}`);
        G.recentOutcomeType = 'complication';
      }
      maybeStageAdvance();
    }
  },

  {
    label: "The contraband needs cold storage. Three registered cold holds in the enforcement quarter.",
    plot: 'main',
    skill: 'vigor',
    tags: ['Stage2', 'NPC'],
    xpReward: 40,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'locating cold storage endpoint for contraband materials');
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('vigor', (G.skills.vigor||0));
      if (result.total >= 13) {
        G.flags.cold_hold_located = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Two of the three registered cold holds are standard enforcement storage — temperature consistent with evidence preservation, access logs cross-referenced with active case files. The third is different. Ambient temperature is lower than evidence protocols require, the access log entries use a numeric code rather than officer names, and the condensation pattern on the exterior bracket shows the door opens on a different schedule than the listed maintenance rotation. The ghost account endpoints are running a live cold hold inside enforcement storage.`;
        addJournal('Third cold hold — below-protocol temp, coded access, off-schedule operation confirmed', 'evidence', `ith-cold-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `The enforcement quarter cold holds are in a restricted service corridor that requires active duty credentials to enter. The approach through the supply access door triggers a proximity sensor mounted inside the frame — a secondary security layer not on the public facility schematic. A duty officer appears from the far end of the corridor within four minutes. The exit is uncontested but the corridor access has been logged under a surveillance classification that routes to the Shadowhands duty desk automatically.`;
        addJournal('Cold hold corridor triggered sensor — auto-routed to Shadowhands duty desk', 'complication', `ith-cold-fail-${G.dayCount}`);
        G.recentOutcomeType = 'complication';
      }
      maybeStageAdvance();
    }
  },

  {
    label: "The materials exemption in the anti-magic statute is in different handwriting than the rest.",
    plot: 'main',
    skill: 'spirit',
    tags: ['Stage2', 'NPC'],
    xpReward: 40,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'examining anti-magic statute materials exemption provenance');
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('spirit', (G.skills.spirit||0));
      if (result.total >= 13) {
        G.flags.statute_exemption_provenance = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The exemption clause is a later insertion — the vellum density is lighter than the surrounding pages, the ink oxidation profile puts it three to four years after the statute's original ratification, and the scribal hand uses a ligature style that replaced the older form only after Guild administrative reforms. The exemption that allows enforcement-level access to bypass anti-magic containment protocols was not part of the original statute. It was inserted after the ghost accounts were opened. The sequence is inverted: the accounts came first, then the legal cover was created.`;
        addJournal('Statute exemption inserted after original ratification — legal cover created post-hoc for accounts', 'evidence', `ith-statute-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The statute archive copy is sealed under a preservation order that requires Guild certification to handle for materials analysis. The public reading copy has the exemption clause in a consistent hand — either the insertion was done by a skilled forger who matched the original, or the reading copy was replaced entirely. Without the sealed original for comparison, the analysis cannot establish provenance. The request to inspect the sealed copy goes into the certification queue. A Shadowhands administrative liaison receives the queue notification automatically.`;
        addJournal('Statute original sealed — public copy inconclusive, certification request logged', 'complication', `ith-statute-fail-${G.dayCount}`);
        G.recentOutcomeType = 'complication';
      }
      maybeStageAdvance();
    }
  },

  {
    label: "Harlan's second ledger behind the bar holds names and dates he doesn't trust to memory.",
    plot: 'main',
    skill: 'finesse',
    tags: ['Stage2', 'NPC'],
    xpReward: 40,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'accessing Harlan\'s private ledger of enforcement names and dates');
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('finesse', (G.skills.finesse||0));
      if (result.total >= 13) {
        G.flags.harlan_ledger_read = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The ledger behind the bar is a narrow cloth-bound book, entries in a compressed hand — dates, a unit abbreviation, a count, occasionally a single word that functions as a note. Twelve entries over seven months correspond to the ghost account transaction dates identified earlier: same date, a unit abbreviation that matches the unlisted logistics sub-unit from the forwarding seal. Harlan has been quietly documenting the same activity. His entry from four days ago reads: "verification window — closing, two weeks."`;
        addJournal('Harlan\'s private ledger — 12 entries matching ghost account dates, closing window noted 4 days ago', 'evidence', `ith-harlan-ledger-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `Harlan is behind the bar when the reach toward the ledger becomes visible to him — not a dramatic moment, just the particular stillness of a man who has spent years reading what enforcement officers do with their hands when they think no one is tracking. He sets a tankard down on the ledger without looking directly at it. When he meets the eyes across the bar his expression carries no accusation, just the flat exhaustion of someone who has already decided he cannot afford to have any conversation about what just happened.`;
        addJournal('Harlan ledger access burned — innkeeper aware, channel closed', 'complication', `ith-harlan-ledger-fail-${G.dayCount}`);
        G.recentOutcomeType = 'complication';
      }
      maybeStageAdvance();
    }
  },

  {
    label: "The ore assay records declare a grade the foundry output cannot physically produce.",
    plot: 'main',
    skill: 'spirit',
    tags: ['Stage2', 'NPC'],
    xpReward: 40,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'cross-referencing ore assay records against foundry output');
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('spirit', (G.skills.spirit||0));
      if (result.total >= 13) {
        G.flags.assay_discrepancy_confirmed = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The certified assay records declare Grade IV purity on three consignments spanning five months. Grade IV ore produces a specific slag ratio during smelting — a ratio the foundry's own exhaust vents make physically impossible to fake. The vent deposits run consistently at Grade II chemistry. Someone certified ore they never tested at a grade they knew it could not be. The assay stamps carry a registrar number that does not appear on the current roster. The registrar was active, then not.`;
        addJournal('Assay records fraudulent — Grade IV declared on Grade II ore, registrar number unverifiable', 'evidence', `ith-assay-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The assay archive desk sits behind a narrow fortification window where cold light falls across the certification ledger at an angle that makes the access tier markings easy to read. The certification level presented does not clear the threshold for the consignment grade range in question — a single classification tier short, which might as well be ten. The inquiry goes into a pending queue behind an assessor review. Pending queue access logs route to the same enforcement monitoring channel as the ledger queries, the wait is indefinite, and there is now a name attached to a record of interest in technical assay data.`;
        addJournal('Assay archive access denied — certification threshold, inquiry logged', 'complication', `ith-assay-fail-${G.dayCount}`);
        G.recentOutcomeType = 'complication';
      }
      maybeStageAdvance();
    }
  },

  {
    label: "The courier runs the cold hold and the foundry dock every morning.",
    plot: 'main',
    skill: 'finesse',
    tags: ['Stage2', 'NPC'],
    xpReward: 40,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'mapping Shadowhands courier route');
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('finesse', (G.skills.finesse||0));
      if (result.total >= 13) {
        G.flags.courier_route_mapped = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Three mornings of position work from the service corridor overhang. The courier departs the Shadowhands logistics annex at the fifth bell, walks to the foundry dock first, then the cold hold, then back. Each stop is under four minutes. No exchange of goods visible — only a gloved hand pressed to a panel and held there. The panels at both stops are newer than the surrounding wall fittings. They are not structural. They are readers for something embedded in the courier's glove. A material transfer system that leaves no physical trace.`;
        addJournal('Courier route confirmed — panel-reader transfer system, no visible goods exchange', 'evidence', `ith-courier-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `The courier is trained for exactly the kind of observation being attempted — the overhang position is one of four that any competent surveillance-aware operative checks by habit on a sensitive route. The courier does not break stride but lifts two fingers against the thigh on the third morning, which is a signal rather than a habit. The route changes the following day. Whatever pattern existed is now retired.`;
        addJournal('Courier route observation burned — route retired, signal logged', 'complication', `ith-courier-fail-${G.dayCount}`);
        G.recentOutcomeType = 'complication';
      }
      maybeStageAdvance();
    }
  },

  {
    label: "The notice board runs two layers. The public one, and the one posted behind it.",
    plot: 'main',
    skill: 'wits',
    tags: ['Stage2', 'NPC'],
    xpReward: 40,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'reading enforcement quarter notice board second layer');
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.wits||0));
      if (result.total >= 13) {
        G.flags.notice_board_second_layer = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The public board is a cedar frame, notices pinned in the standard civic format. The frame itself is mounted on a secondary backing board that extends six inches beyond the cedar on three sides — the extra space is filled with notices in a smaller hand, pinned beneath the public layer and readable only from an angle that no casual passer would take. Four of the sub-layer notices carry the two-letter unit code from Harlan's private ledger. One of them lists a name, a date, and the word "cleared." The date is the same week the ghost accounts first appeared.`;
        addJournal('Notice board sub-layer — unit code with name cleared on same week accounts opened', 'evidence', `ith-noticeboard-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The angle required to read the secondary layer means standing with shoulders turned and gaze tilted down and to the right — a posture that no civilian arriving at the public board would ever hold. A duty officer on the far side of the courtyard tracks the position for thirty seconds before walking over. The conversation is brief and formally polite. The credential is checked, returned, and a notation made. The board is a watched location now.`;
        addJournal('Notice board angle posture flagged — duty officer notation made', 'complication', `ith-noticeboard-fail-${G.dayCount}`);
        G.recentOutcomeType = 'complication';
      }
      maybeStageAdvance();
    }
  },

  {
    label: "A case file opened, sealed, and never docketed. That sequence is not procedurally possible.",
    plot: 'main',
    skill: 'wits',
    tags: ['Stage2', 'NPC'],
    xpReward: 40,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'examining civic tribunal sealed undocketed case file');
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.wits||0));
      if (result.total >= 13) {
        G.flags.tribunal_sealed_case_found = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The case number exists in the intake register but not in the docket — a gap that requires a magistrate-level override to create, because the intake system automatically assigns docket numbers at the moment of opening. The override code used is identical to the authorization code on the archive's cross-referenced oath-breaker redactions. One person executed both operations: the tribunal case suppression and the archive redactions. The operations occurred in the same four-hour window. That person had simultaneous access to the tribunal and the archive under a single authority code.`;
        addJournal('Tribunal suppression and archive redaction — same authorization code, same four-hour window', 'evidence', `ith-tribunal-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `The tribunal registrar's intake counter closes for the midday compliance review exactly when the case number is found in the register. The gap between intake and docket is visible — a sealed case with no docket assignment — but the registrar who returns after compliance review is a different clerk, and the question about the case number produces a referral form rather than an answer. The referral requires magistrate authorization to process and will take three to five working days. The inquiry is now in the official queue with a name attached.`;
        addJournal('Tribunal sealed case — referral form issued, name in official queue', 'complication', `ith-tribunal-fail-${G.dayCount}`);
        G.recentOutcomeType = 'complication';
      }
      maybeStageAdvance();
    }
  },

  {
    label: "The foundry supervisor tallies ore by weight before it enters the quota system. Not after.",
    plot: 'main',
    skill: 'charm',
    tags: ['Stage2', 'NPC'],
    xpReward: 40,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'speaking with foundry supervisor about pre-quota weight tally');
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.charm||0));
      if (result.total >= 13) {
        G.flags.foundry_supervisor_tally = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The foundry supervisor — a broad woman named Ansel Druve who keeps her tally on a strip of waxed linen tucked inside her belt rather than in any official format — shows the strip without much persuading. She has been waiting for someone with a reason to look. Her pre-quota numbers run consistently higher than the declared extraction by a margin between 12 and 15 percent across every month the ghost accounts have been active. The missing weight is being extracted before it reaches the quota system entirely.`;
        addJournal('Supervisor Ansel Druve — pre-quota tally shows 12-15% extraction before quota system entry', 'evidence', `ith-supervisor-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The foundry floor is a supervised workspace — the supervisor's position has line of sight to every entry point, and a stranger at the intake bay asking about weight tally methodology reads as a quality audit, which requires authorization from the enforcement oversight desk. The supervisor is professional and unhelpful in the particular way of someone who has learned that helpfulness without authorization creates problems. The question goes nowhere and the approach is noted in the shift log.`;
        addJournal('Foundry floor approach — authorization required, shift log noted', 'complication', `ith-supervisor-fail-${G.dayCount}`);
        G.recentOutcomeType = 'complication';
      }
      maybeStageAdvance();
    }
  },

  {
    label: "He filed a query eighteen months ago. Had a new posting within the week.",
    plot: 'main',
    skill: 'charm',
    tags: ['Stage2', 'NPC'],
    xpReward: 40,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'tracing compliance officer transfer after filing formal query');
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.charm||0));
      if (result.total >= 13) {
        G.flags.compliance_officer_trace = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The officer's name is Pell Varic. His transfer record lists a posting in the transit administration tier — a desk that processes cargo transit amendments and reports to no one in the enforcement chain. The posting was created eight days after his query was filed. The query itself was formally closed as "resolved — no further action," signed by an authorization code that matches the one used on the tribunal suppression. Pell Varic is alive, in Ithtananalor, in a desk that exists specifically to keep him contained and isolated from enforcement channels.`;
        addJournal('Pell Varic — compliance officer isolated in transit admin desk, query closed by same authorization as tribunal suppression', 'evidence', `ith-varic-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `Personnel records from eighteen months ago require a records access authorization that takes a working day to obtain through proper channels. The informal route — asking at the personnel registry counter — triggers a secondary check when the officer's name is entered, and the check produces a flag that routes the query to the Shadowhands administrative desk. The flag is attached to the credential before any information is returned. The desk now knows the name was asked about, and by whom.`;
        addJournal('Pell Varic name query — personnel flag routes to Shadowhands administrative desk', 'complication', `ith-varic-fail-${G.dayCount}`);
        G.recentOutcomeType = 'complication';
      }
      maybeStageAdvance();
    }
  },

  {
    label: "The reclassified unit occupies a floor of the enforcement quarter not on the building schematic.",
    plot: 'main',
    skill: 'vigor',
    tags: ['Stage2', 'NPC'],
    xpReward: 40,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'locating unlisted logistics unit floor in enforcement quarter');
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('vigor', (G.skills.vigor||0));
      if (result.total >= 13) {
        G.flags.logistics_floor_located = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The enforcement quarter building is six floors by the public schematic. The exterior stairwell, counted from the ground, has seven landings. The seventh floor has no windows on the south face where the other six do — the stonework is newer, the mortar line visible from the adjacent rooftop. The single access point is a door on the sixth-floor landing that is keyed separately from the standard enforcement access system. Through a gap in the sixth-floor window shutter: a clerk's desk, stacks of material transfer manifests, and on the wall the two-letter unit identifier from Harlan's ledger, rendered large in painted block letters.`;
        addJournal('Seventh floor confirmed — unlisted logistics unit, separate key system, material transfer manifests visible', 'evidence', `ith-logistics-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `The roof access that would give a count of the exterior stairwell landings requires crossing a service bridge flagged for maintenance restrictions. The bridge warden — a tired man with a clipboard — records the attempt and the credential. The maintenance restriction is a standing one that has been renewed on a rolling basis for eleven months. It is not a construction restriction. It is an access restriction, maintained on the same renewal schedule as the ghost accounts.`;
        addJournal('Roof access blocked — maintenance restriction renewed monthly, access logged', 'complication', `ith-logistics-fail-${G.dayCount}`);
        G.recentOutcomeType = 'complication';
      }
      maybeStageAdvance();
    }
  },

  {
    label: "The external auditor hasn't set foot here for three consecutive review periods.",
    plot: 'main',
    skill: 'wits',
    tags: ['Stage2', 'NPC'],
    xpReward: 40,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'tracing external auditor absence from compliance cycle');
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.wits||0));
      if (result.total >= 13) {
        G.flags.auditor_absence_confirmed = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The compliance cycle ledger shows external auditor sign-ins for three consecutive review periods — same handwriting, same credential notation, same inspection seal. The Guild transit registry shows no arrival record for the auditor's name during any of those windows. The signature in the compliance ledger was not written by the auditor. The compliance cycle for the past eighteen months has been self-certified by the enforcement apparatus it was supposed to independently review, and the forgery of the auditor's presence was done carefully enough to pass routine inspection.`;
        addJournal('Auditor signatures forged — three consecutive compliance periods self-certified by enforcement apparatus', 'evidence', `ith-auditor-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The compliance ledger is held at the Guild administrative desk, not the enforcement quarter, and the cross-referencing required — ledger sign-ins against transit registry arrivals — triggers a Guild protocol flag when the credential presented does not carry auditor authorization. The flag pauses the request and routes it to a Guild compliance officer for review. In Ithtananalor, that officer operates on a seven-day review cycle. The inquiry sits in the queue with the credential attached.`;
        addJournal('Auditor cross-reference flagged — Guild compliance queue, seven-day review cycle', 'complication', `ith-auditor-fail-${G.dayCount}`);
        G.recentOutcomeType = 'complication';
      }
      maybeStageAdvance();
    }
  },

  {
    label: "The evidence is ready. Roaz or independent disclosure — both paths are open.",
    plot: 'main',
    skill: 'might',
    tags: ['Investigation', 'Finale', 'Stage2', 'Consequence', 'Meaningful'],
    xpReward: 40,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(115, 'Ithtananalor Stage 2 resolution');
      if (!G.stageProgress) G.stageProgress = {1:0,2:0,3:0,4:0,5:0};
      if (!G.investigationProgress || G.investigationProgress < 8) {
        G.lastResult = `The evidence map on the table has empty columns where the critical links should be — gaps that an enforcement apparatus practiced at self-protection will exploit the moment the package is presented. The ghost account chain requires full documentation across every step: origin authorization, routing, endpoint activity, and the chain of oversight that permitted it to run without intervention. A presentation now gives the apparatus room to discredit each piece individually, detaching them from the chain they form together until none of them carry enough weight alone. The chain needs closing before it goes anywhere.`;
        G.recentOutcomeType = 'partial'; return;
      }
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('combat', (G.skills.might||0));
      if (result.total >= 14) {
        G.flags.stage2_finale_institutional = true;
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 3;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The presentation to Captain Roaz takes place across a desk cleared of everything except the documentation. He reads without speaking, each page turned deliberately, the particular quiet of a garrison building where the chain of command has become uncertain holding around the room. When the last page goes face-down he holds it there for a moment with one hand flat. A formal internal affairs review opens under his command authority within the hour — broad enough to bypass the Shadowhands administrative layer entirely. Stage III opens with Roazian enforcement backing and the Shadowhands fully aware that they are being watched.`;
        addJournal('Ithtananalor S2 finale: Roaz enforcement path', 'evidence', `ith-finale-inst-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.flags.stage2_finale_underworld = true;
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 3;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The evidence packet moves through Ivena's network and the guild enforcement channels simultaneously — not through Roaz command, not through any route the Shadowhands monitor. By the time the apparatus recognizes that the disclosure is in motion, the information is already across three separate distribution points. The ghost accounts become public knowledge before any containment procedure can be organized. The cost is that the formal chain of authority carries none of it. Stage III opens with the accounts exposed but the institutional apparatus hostile.`;
        addJournal('Ithtananalor S2 finale: independent disclosure path', 'evidence', `ith-finale-uw-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      }
      G.flags.stage2_faction_contact_made = true;
      maybeStageAdvance();
    }
  },

  // ── NEW SP2 CHOICES — direct stageProgress increment ──

  {
    label: "The forest compact boundary marker was moved. The archive still shows the old position.",
    plot: 'main',
    skill: 'wits',
    tags: ['Stage2', 'Records', 'Evidence'],
    xpReward: 20,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(20, 'forest compact boundary discrepancy');
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var roll = rollD20('wits', G.skills.wits);
      if (roll.total >= 13) {
        G.flags.ith_forest_compact_boundary = true;
        G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        G.lastResult = 'The forest compact boundary is a legal demarcation that establishes which arcane activities require forest-authority licensing — anything within the boundary requires approval from the compact\'s oversight body. The archive map shows the boundary running along the eastern ridge. The physical markers in the ground run two hundred meters east of the ridge, which places the enforcement quarter\'s anti-magic statute coverage area inside the compact zone. Operations that need compact oversight have been conducted without it. The discrepancy is not new: the markers were moved six years ago. The archive map was never updated. Someone left both records to coexist.';
        addJournal('Forest compact boundary markers moved 200m east of archive map position — enforcement quarter operations in compact zone without required oversight for 6 years', 'evidence', 'ith_s2_forest_compact_boundary');
        G.recentOutcomeType = 'success';
        maybeStageAdvance();
      } else {
        G.lastResult = 'The compact boundary map is a large-format document that requires the reading room\'s extended table to lay flat. The reading room extended table is reserved for the morning session — afternoon walk-in access requires a confirmed booking. The booking register for this week is full. The compact boundary position can be verified physically by walking the marker line, which takes two hours and produces no written record.';
        addJournal('Compact boundary archive map inaccessible afternoon — extended table reserved; physical marker survey possible but produces no record', 'intelligence', 'ith_s2_compact_boundary_blocked');
        G.recentOutcomeType = 'complication';
        maybeStageAdvance();
      }
    }
  },

  {
    label: "The magical licensing register shows approvals issued against applications that were never filed.",
    plot: 'main',
    skill: 'wits',
    tags: ['Stage2', 'Records', 'Evidence'],
    xpReward: 20,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(20, 'magical licensing register ghost approvals');
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var roll = rollD20('wits', G.skills.wits);
      if (roll.total >= 13) {
        G.flags.ith_licensing_ghost_approvals = true;
        G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        G.lastResult = 'The magical licensing register and the application log are two separate documents that are supposed to match — each approval in the register should correspond to a filed application. Cross-referencing the two reveals seven approvals in the register with no corresponding application: the approval was issued, the license number assigned, and the fee collected, but the originating application form does not exist in the log. The fee collection dates cluster around the same months the ghost ore accounts were active. The license fees went somewhere. The applications they purchased do not exist.';
        addJournal('Magical licensing register: 7 approvals issued with no corresponding applications — fee collection dates match ghost account activity period', 'evidence', 'ith_s2_licensing_ghost_approvals');
        G.recentOutcomeType = 'success';
        maybeStageAdvance();
      } else {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
        G.lastResult = 'The application log is kept by the licensing bureau, and the register by the enforcement administration — they are not maintained in the same office or cross-referenced as a matter of routine. Pulling both documents together requires a formal records reconciliation request filed jointly to both offices. The reconciliation request goes to both administrators simultaneously and takes three working days. Both offices will know the comparison is being made before the comparison is done.';
        addJournal('Licensing register and application log cross-reference requires joint formal request — both offices notified simultaneously, 3-day window', 'complication', 'ith_s2_licensing_cross_ref_blocked');
        G.recentOutcomeType = 'complication';
        maybeStageAdvance();
      }
    }
  },

  {
    label: "The suppression knowledge is being withheld systematically. The gaps in the archive confirm it.",
    plot: 'main',
    skill: 'wits',
    tags: ['Stage2', 'Records', 'Evidence'],
    xpReward: 20,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(20, 'knowledge suppression archive pattern');
      if (!G.flags) G.flags = {};
      var roll = rollD20('wits', G.skills.wits);
      if (roll.total >= 13) {
        G.flags.ith_knowledge_suppression_pattern = true;
        G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        G.lastResult = 'The subject index for arcane research materials runs from A to W. There is no X, Y, or Z section — the binding is intact on both sides of the gap, which means the sections were removed before the index was bound, not after. The removed sections covered research classifications beginning with the prefix "xen-" — a categorization used exclusively for cross-boundary arcane transfer, the class of activity the ghost accounts were funding. The removal was planned, not reactive. Whoever structured this archive knew what knowledge would need to be inaccessible before the accounts were ever opened.';
        addJournal('Arcane research index: xen- classification sections removed before binding — cross-boundary transfer research excised in advance of ghost account activity', 'evidence', 'ith_s2_xen_classification_excised');
        G.recentOutcomeType = 'success';
        maybeStageAdvance();
      } else {
        G.lastResult = 'The subject index gaps are visible — sections missing from the binding — but the categories they covered are not labeled on any adjacent page. The archive attendant, when asked about the gaps, consults a procedure card taped inside the reference desk drawer. "Classification restructuring," she says. "Some categories were consolidated." The procedure card she consulted is dated two weeks ago. The restructuring explanation is recent enough to be a prepared response.';
        addJournal('Arcane research index gaps noted — attendant cited "classification restructuring" per procedure card dated 2 weeks ago', 'complication', 'ith_s2_xen_classification_blocked');
        G.recentOutcomeType = 'complication';
        maybeStageAdvance();
      }
    }
  },

  {
    label: "The Iron Accord seal on the foundry gate has been re-cast within the last month.",
    skill: 'wits',
    tags: ['Stage2', 'Records', 'Evidence'],
    plot: 'main',
    xpReward: 20,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(20, 'reading the re-cast Iron Accord seal');
      if (!G.flags) G.flags = {};
      var roll = rollD20('wits', G.skills.wits);
      if (roll.total >= 13) {
        G.flags.ith_iron_accord_seal_recast = true;
        G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        addNarration('Foundry Gate — Re-cast Seal', 'The Iron Accord seal is supposed to sit on a foundry gate for a generation. This one has bright bronze at its edges where older patina would still hold — re-cast within the last month, not maintained, replaced. The master pattern has a fractional drift in the lower quadrant: a new die was cut, not pulled from the central registry. Someone bypassed the Accord registry to put a fresh seal on this gate, and the registry has no record of authorizing it.');
        addJournal('Iron Accord foundry seal re-cast off-registry within last month — fresh die cut outside central authorization', 'evidence', 'ith_s2_iron_accord_seal_recast');
        G.recentOutcomeType = 'success';
        maybeStageAdvance();
      } else {
        addNarration('Foundry Gate — Watched at the Seal', 'The bronze edge catches light differently than the surrounding stone — enough to draw attention, not enough to read at the distance the gate clerk permits civilians to stand. The clerk does not ask what is being studied. He simply taps a stylus against the duty log twice, and a second officer steps from the guard niche to assume the same sightline. The seal is not approached. The presence at the gate is now a logged item under the clerk\'s hand.');
        addJournal('Foundry seal observation logged by gate clerk — second officer drawn to sightline', 'complication', 'ith_s2_iron_accord_seal_burned');
        G.recentOutcomeType = 'complication';
      }
    }
  },

  {
    label: "The prison labor manifest has three names with no destination assigned.",
    skill: 'finesse',
    tags: ['Stage2', 'Records', 'Stealth'],
    plot: 'main',
    xpReward: 20,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(20, 'reading the prison labor manifest column');
      if (!G.flags) G.flags = {};
      var roll = rollD20('finesse', G.skills.finesse);
      if (roll.total >= 13) {
        G.flags.ith_prison_labor_unassigned = true;
        G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        addNarration('Labor Manifest — Three Blank Destinations', 'The labor foreman keeps the manifest in a tin box near the muster yard, the column headings ruled in red lead and the destination field carried for every assignment back to the founding of the quota system. Three names this quarter have the destination field left blank — not redacted, not stamped "pending," simply not filled. The same three names also have no end-of-shift sign-off. Bodies were drawn from the prison labor pool and accounted for nowhere downstream of the gate.', 'success');
        addJournal('Prison labor manifest: three workers drawn from pool with no destination assigned and no end-of-shift sign-off', 'evidence', 'ith_s2_prison_labor_unassigned');
        G.recentOutcomeType = 'success';
        maybeStageAdvance();
      } else {
        addNarration('Labor Manifest — Foreman Closes the Box', 'The muster yard runs a clean choreography during shift rotation, and any pause near the foreman\'s tin box reads as a break in that choreography from twenty paces. The foreman finishes a tally on the slate, walks to the box, and closes the lid without looking at the visitor. The clasp goes down. The manifest is not handed over and the request is not refused — the choreography simply resumes around the closed box, and the box is what the question would have to go through.', 'failure');
        addJournal('Labor manifest box closed by foreman — manifest channel cold without escalation', 'complication', 'ith_s2_prison_labor_burned');
        G.recentOutcomeType = 'complication';
      }
    }
  },

];

window.ITHTANANALOR_STAGE2_ENRICHED_CHOICES = ITHTANANALOR_STAGE2_ENRICHED_CHOICES;
