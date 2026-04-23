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
