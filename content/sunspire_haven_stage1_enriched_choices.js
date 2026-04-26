/**
 * SUNSPIRE HAVEN STAGE 1 ENRICHED MEANINGFUL CHOICES
 * 20 deeply grounded investigation paths tied to family syndicate control and resource isolation
 * Generated for: Fair exchange vs family obligation, communal good vs personal profit, syndicate weaponization and coercion
 * Each choice: 65-80 XP, grounded in family politics and resource networks, layered wrongness reveal
 */

const SUNSPIRE_HAVEN_STAGE1_ENRICHED_CHOICES = [
  // ========== NPC-GROUNDED CHAINS (8 CHOICES) ==========

  // 1. SYNDICATE YARD MASTER: CONVOY ROUTE CHANGES
  {
    label: "The yard master signs off on routes he didn't write. The convoys go where he isn't told they go.",
    tags: ['Investigation', 'NPC', 'Syndicate', 'Logistics', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading convoy diversion patterns');
      G.stageProgress[1]++;

      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      const target = 11 + Math.max(0, G.worldClocks.pressure);

      if (result.isCrit) {
        G.lastResult = `Corbek steps back from the manifest board and lowers his voice. "Routes used to be optimized for access — fastest path, community depots first. Now instructions come from above the yard level. Certain supply lines are lengthened, delayed, or rerouted through external storage before reaching Sunspire's market." He taps the board without pointing at anything specific. "Convoys leaving this yard are moving through chokepoints someone else controls. What arrives and when isn't our decision anymore."`;
        G.stageProgress[1]++;
        addJournal('Yard master revealed route manipulation and supply filtering', 'evidence', `sunspire-yard-routes-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Corbek turns back to the manifest board before you've finished the question. "Convoy routing is family business. I don't take that outside." He doesn't argue, doesn't elaborate. By the time you reach the yard gate, two handlers have glanced at you in the particular way that means your name is already traveling through the supply chain alongside the morning's manifest.`;
        G.worldClocks.pressure++;
        addJournal('Yard master now wary of your inquiries', 'complication', `sunspire-yard-hostile-${G.dayCount}`);
      } else {
        G.lastResult = `"Routes have been updated," Corbek says, without quite committing to more. "Supply demands shift." He says it toward the manifest board rather than at you, already reaching for the next page in the stack, already elsewhere. The board behind him shows three depot notations scratched out and rewritten in the past ten days — not updated, corrected, the old ink still legible under the new. A convoy horn sounds from the eastern yard. Corbek doesn't look up.`;
        addJournal('Yard master confirmed convoy route modifications', 'evidence', `sunspire-yard-pressure-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 2. FAMILY BROKER: OBLIGATION ENFORCEMENT
  {
    label: "Family obligations used to be mutual. Something changed who decides what the obligation means.",
    tags: ['Investigation', 'NPC', 'Family', 'Coercion', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering obligation weaponization');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Lysander chooses a corner of the market hall before he speaks. "Obligations are the structure of Sunspire — everyone knows this. What's changed is who decides what an obligation means." He keeps his hands folded. "Families that push back on syndicate preferences get told their service obligations are being reviewed for increase. Families that comply get waivers and reductions. The registry of mutual duty now runs through syndicate preference." He doesn't call it by any larger name. He doesn't have to. The registry is a public document. This season's waivers and increases will be in the record.`;
        G.stageProgress[1]++;
        addJournal('Broker revealed obligation system weaponization', 'evidence', `sunspire-broker-obligations-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Lysander's expression settles into practiced neutrality. "Obligation systems are internal family matters. I don't take them outside." He doesn't raise his voice or show offense. But by the next morning, two family heads have heard that an outsider was asking about obligation enforcement. The family network moves faster than the wagon routes.`;
        G.worldClocks.watchfulness++;
        addJournal('Family brokers warned about your inquiry', 'complication', `sunspire-broker-alert-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `Lysander grants you that, folding his hands on the table. "Obligations are being standardized — more uniformly enforced now." He doesn't volunteer why, or by whom, or what uniformity means for the families on the short end of it. The obligation board behind the registry desk has been repainted recently; the old chalk categories are still visible beneath the new coat in certain light — different headings, different columns. The categories changed, not just the names inside them.`;
        addJournal('Broker confirmed recent obligation system changes', 'evidence', `sunspire-broker-unclear-${G.dayCount}`);
      } else {
        G.lastResult = `"Obligation policy is internal family documentation." Lysander doesn't apologize for it. Without family standing in Sunspire's registry, he won't open the ledgers. The obligation records are visible on the shelf behind him — close enough to read the spine labels, not close enough to open without permission.`;
        addJournal('Family obligations blocked without family access', 'evidence', `sunspire-broker-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 3. HARVEST COORDINATOR: FOOD DISTRIBUTION CHANGES
  {
    label: "The grain register says scarcity. The grain depot says otherwise.",
    tags: ['Investigation', 'NPC', 'Resources', 'Food', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading food distribution patterns');
      G.stageProgress[1]++;

      const result = rollD20('vigor', (G.skills.survival || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Mirrin stands beside the grain register with her arms crossed and speaks quietly and fast. "Access to the harvest now follows a list I don't write. Syndicate-aligned families get first access, quality grain, guaranteed portions. Families that have raised questions get what's left — lower-quality stores, shorter guarantees, smaller portions. I distribute what I'm told to distribute." She opens the register and closes it again without showing it. "The accounting makes it look like scarcity. It isn't scarcity."`;
        G.stageProgress[1]++;
        addJournal('Coordinator revealed politicized food distribution system', 'evidence', `sunspire-harvest-distribution-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Mirrin turns back to the register without finishing her sentence, the grain ledger pulled close. "Allocation decisions are complex and not for outside discussion." She's not rude about it; she just stops, the way a shutter is drawn not against anything specific but against the draft. The harvest hall has three other staff within earshot, and all three have gone slightly still — hands continuing their tasks but attention elsewhere. Questions about food distribution travel faster than the distribution itself.`;
        addJournal('Harvest coordinator refuses further distribution inquiry', 'complication', `sunspire-harvest-silent-${G.dayCount}`);
      } else {
        G.lastResult = `"Distribution has been adjusted to account for supply variations," Mirrin says. She doesn't expand on it — not which supply, not which variation, not whose determination it was to adjust. Behind her, the allocation column in the open register shows the same three family names at the top of every weekly entry for the past two months. The register is open because she was working in it when you arrived. It stays open because closing it now would acknowledge it.`;
        addJournal('Coordinator confirmed recent food distribution changes', 'evidence', `sunspire-harvest-confirmed-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 4. TEXTILE MERCHANT: TRADE PREFERENCE BIAS
  {
    label: "The contract board shows the same three family names at the top of every premium listing for two months.",
    tags: ['Investigation', 'NPC', 'Commerce', 'Bias', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering trade preference bias');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Keldan steps away from his stall and speaks with his back to the market lane. "Premium material access, extended payment terms, favorable contract timelines — all of it now runs through syndicate family connections. The quality of the work doesn't matter. I've seen good craft turned away and inferior work given prime contract terms because of whose family name it came from." He keeps his voice level. "The market hasn't been disrupted. It's been redesigned."  `;
        G.stageProgress[1]++;
        addJournal('Merchant revealed systematic trade preference corruption', 'evidence', `sunspire-textile-bias-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Keldan's posture changes mid-sentence. "Why are you asking about contract distribution?" He doesn't wait for the answer. The conversation ends, and by the next market bell, two other merchants near the cloth stalls have received some version of your description and the nature of your questions.`;
        G.worldClocks.isolation++;
        addJournal('Merchants now viewing you as potential investigator', 'complication', `sunspire-textile-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Keldan acknowledges uneven distribution without naming its source. "Competitive positions vary across families." He straightens a bolt of cloth that didn't need straightening. The contract board on the market's east wall has three family names appearing in six of the last seven premium material listings.`;
        addJournal('Merchant confirmed trade opportunity inequality', 'evidence', `sunspire-textile-confirmed-${G.dayCount}`);
      } else {
        G.lastResult = `The grain contract boards running the crossroads entrance carry this season's listings, workshop syndicate marks pressed into the upper corner of every posted sheet. "Commercial arrangements are private matters between parties." Keldan says it toward his stall rather than at you, straightening a bolt of fabric that was already straight. The contract register behind the market administrator's counter requires merchant standing to access, and Keldan isn't offering to vouch for you — the offer never materializes, never gets close enough to be declined.`;
        addJournal('Trade preferences blocked without commercial access', 'evidence', `sunspire-textile-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 5. QUOTA KEEPER: PRODUCTION PRESSURE
  {
    label: "The quotas for certain families are set above what their resource allocation can reach.",
    tags: ['Investigation', 'NPC', 'Production', 'Quotas', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading quota pressure patterns');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Neria sits with her hands on the quota ledger and doesn't open it. "The targets for certain families have been set at levels they can't reach with the resources they're allocated. When they fail — and they fail — they lose standing, resource access, community position." She opens the ledger to a comparison page she's already marked. "Families with syndicate alignment get targets calculated to their actual capacity, sometimes lower. It isn't variance. It's engineering."`;
        G.stageProgress[1]++;
        addJournal('Quota keeper revealed quota system weaponization', 'evidence', `sunspire-quota-pressure-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Neria closes the ledger and lifts her hand to flag the syndicate administrator across the room. "Production records aren't for outside review." The flagging is deliberate, visible, a message being sent in front of you rather than behind you. By the time you leave the quota hall, a report on your inquiry is already moving upward through the syndicate's coordination chain.`;
        G.worldClocks.pressure++;
        addJournal('Syndicate investigating your quota system inquiry', 'complication', `sunspire-quota-alert-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `The targets have been adjusted in the past two cycles. Some families miss consistently — not by large margins, but always by enough to trigger a review. Other families hit their targets with room to spare. The resource allocations that accompany those targets don't explain the gap. The targets explain the gap.`;
        addJournal('Quota records show signs of deliberate inequality', 'evidence', `sunspire-quota-altered-${G.dayCount}`);
      } else {
        G.lastResult = `The haven road runs past the quota hall's eastern wall, the watchtower on the plain visible through the narrow window above the intake desk. "Quota records are internal family documentation." Neria stacks the ledgers back against the wall before you can finish scanning the visible page — the motion practiced, the stack returned tight with spines facing inward. Without family standing in Sunspire's production registry, the numbers stay closed. She's done this before; the stack settles into position the way something lands in its usual place. She doesn't look at it again to check.`;
        addJournal('Quota information blocked without family access', 'evidence', `sunspire-quota-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 6. CONVOY ORGANIZER: EXTERNAL COORDINATION
  {
    label: "Some convoys get instructions that don't come from the yard. The organizer was told not to ask about those runs.",
    tags: ['Investigation', 'NPC', 'Communication', 'External', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'tracing external communication');
      G.stageProgress[1]++;

      const result = rollD20('charm', (G.skills.persuasion || 0) + (G.skills.insight || 0) / 2 + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Tholen glances at the yard before speaking. "Some convoys get separate instructions — not from yard management, from a different source entirely. Encrypted messages, private couriers, destinations updated at departure without explanation." He keeps his voice down. "I was told clearly not to ask about these runs. They go out, they come back, the manifests don't match what left." He pauses. "These aren't trade convoys. They're carrying something the manifests aren't naming."`;
        G.stageProgress[1]++;
        addJournal('Convoy organizer revealed external coordination channels', 'evidence', `sunspire-convoy-external-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Tholen's expression shifts fast — not anger, something quieter and more concerned. "I don't have anything to tell you about that." He steps back, puts the manifest cart between you and him, and doesn't say another word. He's not refusing because he doesn't know. He's refusing because he does.`;
        G.worldClocks.watchfulness++;
        addJournal('Convoy organizer frightened by external coordination inquiry', 'complication', `sunspire-convoy-alert-${G.dayCount}`);
      } else {
        G.lastResult = `Tholen admits there are runs that get handled differently, eyes on the yard outside rather than on you. "Some convoys work outside the standard process. It's just how things go sometimes." He doesn't name which convoys, which standard, or whose authority governs the ones outside it. The departure log on his desk has three entries with the destination column left blank — not unfilled, left blank, the column present and the space deliberate.`;
        addJournal('Convoy organizer confirmed non-standard convoy operations', 'evidence', `sunspire-convoy-evasive-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 7. FAMILY ELDER: DECISION AUTHORITY EROSION
  {
    label: "The elder still holds the title. The decisions stopped being his some time ago.",
    tags: ['Investigation', 'NPC', 'Family', 'Authority', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering authority erosion');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Daven speaks without sitting down, hands behind his back. "Thirty years as an elder. My family brought decisions to me because I was the one who made them." He looks out toward the courtyard where two of his youngest grandchildren are working a job assignment he didn't authorize. "Syndicate directives arrive now with the weight of tradition. I'm told to implement them. When I've pushed back, I've been reminded that family standing depends on syndicate goodwill." He's steady, controlled, but the grief is in the word "reminded."  `;
        G.stageProgress[1]++;
        addJournal('Elder revealed systemic family authority erosion', 'evidence', `sunspire-elder-authority-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Daven stops you with a raised hand — not a warning, a statement. "Family governance is not open to outside discussion. You're not family." He says it without cruelty, the way a boundary is stated rather than enforced. Morning light falls through the courtyard entrance at a long angle. The conversation ends there. In the courtyard, two people who were watching from doorways have already moved back inside before the last word lands. They were listening for exactly this answer.`;
        G.worldClocks.reverence++;
        addJournal('Family leadership banned you from authority questions', 'complication', `sunspire-elder-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Daven grants you a careful sentence. "Decision-making coordinates with the broader syndicate structure now." He doesn't say what was lost in that shift. The family governance board on the wall behind him has three new names in the advisory column that weren't there last season.`;
        addJournal('Elder confirmed family authority constraints', 'evidence', `sunspire-elder-confirmed-${G.dayCount}`);
      } else {
        G.lastResult = `"Family structure is internal." Daven closes the door to the governance room without explaining what's in it — the latch engages before you've formed a follow-up. Stone corridor, the smell of old wood and lamp oil, morning quiet. Without family standing in Sunspire's registry, no elder will open that door for you, and standing in Sunspire's registry requires the very authority the door protects. The frame is still warm from when someone recently pulled it shut.`;
        addJournal('Family governance blocked without family membership', 'evidence', `sunspire-elder-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 8. MARKET INSPECTOR: QUALITY ENFORCEMENT BIAS
  {
    label: "The inspector enforces standards on families who complain and waves through stalls that don't.",
    tags: ['Investigation', 'NPC', 'Quality', 'Market', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering enforcement bias');
      G.stageProgress[1]++;

      const result = rollD20('spirit', (G.skills.craft || 0) + (G.skills.insight || 0) / 2 + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Varen moves to the far end of the inspection table before speaking. "The quality standards exist. What I'm permitted to do with them depends on who I'm inspecting." He taps the enforcement log. "Syndicate-aligned stalls pass with deviations I'd shut down another trader for. Families that have raised objections at the council get intensive review — minor variance, goods removed, stall flagged." He holds the log shut. "I document what I'm told to enforce. I don't write the instructions."  `;
        G.stageProgress[1]++;
        addJournal('Inspector revealed selective quality enforcement system', 'evidence', `sunspire-inspector-bias-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Varen turns the log face-down. "Enforcement decisions aren't for outside discussion. It's sensitive to ongoing market proceedings." He's not hostile — just flat. Three other inspectors in the room have stopped moving. The market inspection department has been briefed to be careful, and Varen has just demonstrated he received that briefing.`;
        G.worldClocks.isolation++;
        addJournal('Market inspector refused further inquiry', 'complication', `sunspire-inspector-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Varen allows that much. "Enforcement has been applied with contextual flexibility recently." He doesn't define context. The enforcement log's open page shows two stall closures from the same family name in the past month — both for minor variance — and three clearances for a different family name that the standards would have caught.`;
        addJournal('Inspector confirmed inconsistent enforcement practices', 'evidence', `sunspire-inspector-confirmed-${G.dayCount}`);
      } else {
        G.lastResult = `"Enforcement records are administrative." Varen closes the log and places it on the high shelf with both hands, out of casual reach. The market's midday noise carries through the stone arch — vendors calling measures, cart wheels on the lane. Without market authority in Sunspire's trade registry, the enforcement documents stay up there. He doesn't offer to retrieve them, doesn't acknowledge they could be retrieved. The distance between the shelf and the floor is the distance between you and that information.`;
        addJournal('Enforcement practices blocked without administrative access', 'evidence', `sunspire-inspector-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== ARCHETYPE DEEP DIVES (8 CHOICES) ==========

  // 9. FAMILY STRUCTURE TIER 1: SYNDICATE INTEGRATION ANALYSIS
  {
    label: "The work assignments have been pulling family members apart, systematically, for two cycles.",
    tags: ['Investigation', 'Family', 'Structure', 'Organization', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'family structure analysis');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The work assignment records, cross-referenced against the family registry, show a clear pattern. Children from families that have raised syndicate objections are placed in assignments at locations separate from their households — not punishingly distant, just far enough. Families aligned with syndicate leadership are clustered, given shared housing and coordinated resource access. Multi-generational households that traditionally provided their members with stability and collective standing are being dispersed into smaller units with individual dependencies. The family structure is being redrawn around syndicate favor.`;
        G.stageProgress[1]++;
        addJournal('Family analysis revealed systematic family restructuring', 'evidence', `sunspire-family-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `A syndicate administrator intercepts you at the registry desk before you can finish pulling the second volume. The question is mild; the stillness around it isn't. "What is the purpose of this inquiry?" Your answer goes into a log. By the time you leave the registry hall, the family structure records are behind a locked cabinet they weren't in before.`;
        G.worldClocks.watchfulness++;
        addJournal('Syndicate leadership alerted to family structure analysis', 'complication', `sunspire-family-alert-${G.dayCount}`);
      } else {
        G.lastResult = `The work assignment records show movement — families shifted across production zones, membership lists updated. The cross-reference to the family registry shows the changes cluster around the past two cycles. Whether the pattern is administrative reorganization or something more deliberate requires a longer comparison window than the registry's open hours allow today.`;
        addJournal('Family structure modifications detected', 'evidence', `sunspire-family-modified-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 10. RESOURCE CONTROL TIER 2: SCARCITY ENGINEERING
  {
    label: "More food comes in than goes out to households. The gap between those numbers is going somewhere.",
    tags: ['Investigation', 'Resources', 'Scarcity', 'Control', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'scarcity engineering documentation');
      G.stageProgress[1]++;

      const result = rollD20('vigor', (G.skills.survival || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The resource system reveals deliberate engineering of scarcity. Harvests are diverted before reaching community storage. Food that could be distributed for subsistence is instead warehoused to create artificial shortages. Families dependent on market access for grain are increasingly forced to rely on syndicate-controlled rationing. Tools and materials are allocated through syndicate channels rather than through traditional family networks. Artificial scarcity is being weaponized — communities face enough shortage to require dependence while avoiding starvation that would provoke resistance.`;
        G.stageProgress[1]++;
        addJournal('Resource analysis revealed engineered scarcity system', 'evidence', `sunspire-resources-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `A syndicate coordinator steps between you and the harvest ledger before you can finish the column comparison. The warning arrives as a statement, not a threat: continued inquiry into resource management will result in removal from the haven's work access registry. The ledger closes. The numbers you were almost done reading disappear behind it.`;
        G.worldClocks.pressure++;
        addJournal('Syndicate directly warned about resource scarcity inquiry', 'complication', `sunspire-resources-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The harvest ledger and the distribution record don't agree — supply levels at the storage depot run significantly ahead of what the distribution columns show leaving. The gap isn't rounding error. Something between the harvest and the household is pulling volume sideways. The column you need to find it is in the locked section of the ledger. The thread points the same direction it has been pointing.`;
        addJournal('Resource diversion pattern confirmed', 'evidence', `sunspire-resources-partial-${G.dayCount}`);
      } else {
        G.lastResult = `The grain store logs and the distribution records are both present and legible. Cross-referencing them to find a deliberate diversion requires the harvest intake reports from the same period — those live in the yard master's office, behind a door that requires family standing to open. Without the intake baseline, the gap you suspect stays invisible in the math.`;
        addJournal('Resource scarcity proof incomplete without full data access', 'evidence', `sunspire-resources-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 11. INFORMATION ISOLATION TIER 1: EXTERNAL NEWS FILTERING
  {
    label: "The message board is thinner than it should be. The traveler from the northern road stopped mid-story.",
    tags: ['Investigation', 'Information', 'Isolation', 'Communication', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'information isolation analysis');
      G.stageProgress[1]++;

      const result = rollD20('finesse', (G.skills.stealth || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Information reaching Sunspire Haven from outside is being deliberately filtered. Stories about other localities' labor unrest, trade disruptions, or similar patterns are suppressed. Messages that might inspire collective resistance are intercepted before distribution. Travelers are questioned about what they've discussed with community members. The community is being information-isolated — cut off from perspective that they're part of a larger pattern, prevented from learning that other localities face similar manipulation.`;
        G.stageProgress[1]++;
        addJournal('Information analysis revealed systematic news filtering', 'evidence', `sunspire-information-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Two syndicate monitors find you at the message-posting board before your second circuit of the market lane. One asks what you're comparing; the other writes the answer down without waiting for it. The conversation that follows is brief and formal. The board is still accessible afterward. But a new name appears on the duty log beside the posting station — yours, with today's date.`;
        G.worldClocks.watchfulness++;
        addJournal('Syndicate monitoring alerted to information flow tracking', 'complication', `sunspire-information-alert-${G.dayCount}`);
      } else {
        G.lastResult = `The message board at the market's east wall has gaps in it — postings from external couriers that should arrive weekly are running thin. A traveler from the northern road mentions a labor dispute in a neighboring haven, then looks uncertain, as if expecting a reaction to the subject itself. The story didn't stop moving; the path it travels on has been narrowed.`;
        addJournal('Information filtering modifications detected', 'evidence', `sunspire-information-partial-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 12. COERCION SYSTEM TIER 2: THREAT MAPPING
  {
    label: "The families that push back get resource cuts. The families that comply get waivers. That's not variance.",
    tags: ['Investigation', 'Coercion', 'Threats', 'Fear', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'coercion apparatus documentation');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `A pattern of threats emerges. Families who question syndicate decisions face resource allocation reductions. Families who speak publicly about manipulation face social isolation and removal from communal events. Families who attempt to organize resistance face threats to family members' employment and housing. Children of resistant families are directed to dangerous work assignments. The threats are calibrated — severe enough to enforce compliance, but maintained at levels that prevent open resistance. Coercion has become the hidden infrastructure of syndicate control.`;
        G.stageProgress[1]++;
        addJournal('Coercion analysis mapped systematic threat apparatus', 'evidence', `sunspire-coercion-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `A message arrives at the waystation before you return to it — unsigned, hand-delivered, one sentence. Continued documentation of family difficulties in Sunspire Haven will result in removal from the haven's access registry. The wording is administrative. The speed of delivery is not. Whoever wrote it knew where you'd been asking and got ahead of you before you finished.`;
        G.worldClocks.pressure += 2;
        addJournal('Inquiry drawing direct coercion consequences', 'complication', `sunspire-coercion-caught-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Two families decline to answer in the same way — not evasively, but with a particular practiced brevity that has been rehearsed. A third family's eldest keeps glancing at the syndicate administrator's window across the market lane. The threats aren't visible in what people say. They're visible in the distance people keep between themselves and the subject when anyone else might be watching.`;
        addJournal('Family intimidation confirmed through behavioral patterns', 'evidence', `sunspire-coercion-confirmed-${G.dayCount}`);
      } else {
        G.lastResult = `The families you speak with are careful and consistent. None will describe specific threats or pressure, and the conversations don't stay open long enough to reach that territory. The wariness is present — you can see it in how quickly topics close — but the mechanism producing it stays on the other side of every door you approach today.`;
        addJournal('Coercion suspected but specific mechanisms not documented', 'evidence', `sunspire-coercion-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 13. EXTERNAL FLOWS TIER 1: RESOURCE EXTRACTION
  {
    label: "Three outbound convoys carry more than their manifests account for. The destinations point north past any trade route.",
    tags: ['Investigation', 'Resources', 'Flow', 'Extraction', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'resource extraction tracking');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Resources that should sustain Sunspire Haven are being systematically extracted. Food beyond basic rations is being moved to external storage and destinations. Tools and materials are being diverted to external interests. Family craftwork is being accumulated in external warehouses. Sunspire Haven is being treated as a production facility rather than a community — resources are extracted after basic subsistence allowances are provided. The community is being economically hollowed out.`;
        G.stageProgress[1]++;
        addJournal('Resource flow analysis revealed systematic extraction', 'evidence', `sunspire-extraction-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `A syndicate coordinator is waiting at the yard gate when you come back from the second waystation. The questions are procedural — purpose of visit, who authorized access — but the log they're writing in has your name already at the top, entered before the conversation began. The outbound manifests return to the locked cabinet inside. Whatever the next column shows, it won't be visible from this side of the gate.`;
        G.worldClocks.watchfulness++;
        addJournal('Syndicate extraction operations alerted to tracking', 'complication', `sunspire-extraction-alert-${G.dayCount}`);
      } else {
        G.lastResult = `Three outbound convoys in the past two weeks show cargo weights that exceed what the manifest items would account for. The destination codes point north — past the standard trade route termini. What's going with those convoys isn't in the paperwork, and the paperwork isn't complete enough to make the absence look like error. Someone is moving something through channels they've made deliberately thin to read.`;
        addJournal('Resource extraction modifications detected', 'evidence', `sunspire-extraction-partial-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 14. COMMUNITY COHESION TIER 2: SOCIAL FRAGMENTATION
  {
    label: "The communal fire is the right size for a dozen people. Four sit around it. Nobody moved the others away.",
    tags: ['Investigation', 'Community', 'Bonds', 'Fragmentation', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'community fragmentation documentation');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Community bonds that once held Sunspire Haven together are being deliberately fractured. Families that traditionally cooperated are now in competition for syndicate-controlled resources. Mutual aid networks are being disrupted through resource control. Shared celebrations and gathering events are being limited or canceled. Young people are isolated from elders through separate work assignments. The social infrastructure that enabled collective action is being systematically destroyed. What's replacing it is individual family desperation and dependence on syndicate favor.`;
        G.stageProgress[1]++;
        addJournal('Community analysis revealed systematic social fragmentation', 'evidence', `sunspire-community-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `By midday three people have changed their route to avoid walking near you at the communal meal area. One picks up her bowl and finishes eating beside the storage wall instead of at the table. Word precedes you here — whatever you've been asking, its subject travels faster than you do. The community isn't hostile. It's careful, and careful has a specific shape in Sunspire.`;
        G.worldClocks.isolation++;
        addJournal('Community members avoiding you due to fear of scrutiny', 'complication', `sunspire-community-caught-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The market square at midday is quieter than the posted gathering schedule would produce. Families cluster near their own stalls rather than crossing to others. The shared cooking fire at the commons has four people around it instead of the dozen that a fire that size would normally draw. The social infrastructure is intact — tables, fire, square — and the people are staying out of it.`;
        addJournal('Community fragmentation confirmed through behavioral observation', 'evidence', `sunspire-community-confirmed-${G.dayCount}`);
      } else {
        G.lastResult = `Sunspire's communal structures are all present and maintained. The market runs. The meal fires burn. Whether the bonds between families that once ran through those structures are still intact requires conversations that go deeper than a single pass through the square — and the families here don't open quickly to strangers, even in easier times.`;
        addJournal('Community fragmentation suspected but incompletely documented', 'evidence', `sunspire-community-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 15. FAMILY FRAGMENTATION TIER 1: KINSHIP BREAKDOWN
  {
    label: "The work assignments keep landing members of the same family in locations days apart. Consistently.",
    tags: ['Investigation', 'Family', 'Bonds', 'Fragmentation', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'family fragmentation mapping');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Family bonds are being systematically severed. Children are separated from parents through work assignments to distant locations. Extended families that traditionally lived and worked together are being parceled into separate housing. Couples are assigned to different production cycles. Multi-generational families are losing their cohesion. Attempts to maintain family connections are viewed as suspicious loyalty questions. The primary tool of control — the family unit — is being deliberately fractured to prevent collective resistance. Families as economic and social units have been weaponized against themselves.`;
        G.stageProgress[1]++;
        addJournal('Family analysis revealed systematic kinship destruction', 'evidence', `sunspire-fragmentation-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `A syndicate administrator finds you at the work assignment board before you've finished the second column. The prohibition arrives in procedural language: documenting family placement details without registry authorization is a compliance matter. The board is still public, the names still visible. But the administrator stays nearby until you step away, and a note goes into the day log.`;
        G.worldClocks.pressure++;
        addJournal('Syndicate prohibited further family fragmentation analysis', 'complication', `sunspire-fragmentation-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The work assignment board shows a pattern across three posting cycles: members of the same family unit landing in locations that put days of travel between them. It could be routine labor rotation. It's consistent enough — across multiple families, across multiple cycles — that routine doesn't hold as an explanation. Someone is making placement decisions that produce a specific result without appearing to be trying to.`;
        addJournal('Family fragmentation and separation patterns confirmed', 'evidence', `sunspire-fragmentation-confirmed-${G.dayCount}`);
      } else {
        G.lastResult = `Family separation is visible in the housing blocks if you know what to look for — elderly members in outer residential zones, working-age family in production housing, children in communal care blocks. Whether that's a coordinated displacement or a function of how work assignment naturally distributes depends on the assignment records, which require family standing to open.`;
        addJournal('Family fragmentation analysis incomplete without assignment data', 'evidence', `sunspire-fragmentation-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 16. CONSENT FICTION TIER 2: MANUFACTURED ACCEPTANCE
  {
    label: "The council minutes show unanimous agreement on every major decision. No abstentions. No dissent. Not once.",
    tags: ['Investigation', 'Coercion', 'Consent', 'Fiction', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'manufactured consent structure analysis');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The system maintains a fiction of voluntary participation. Communities are told they've "agreed" to resource distributions and family obligations. Families are told they've "accepted" their roles in production quotas. The syndicate maintains the appearance that the community is consenting to the system. In reality, families that resist face threats, exclusion, and starvation. The consent is manufactured through coercion disguised as voluntary choice. The system is designed to break resistance while maintaining the appearance that the community has accepted its own subjugation.`;
        G.stageProgress[1]++;
        addJournal('Consent analysis revealed manufactured acceptance apparatus', 'evidence', `sunspire-consent-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `A syndicate communication officer arrives at the communal hall before you finish the morning session. The language is measured: questions about community participation frameworks are sensitive matters affecting social cohesion. The warning is logged. So, now, is your presence in the communal hall during governance hours. The session ends by being formally closed around you.`;
        G.worldClocks.watchfulness++;
        addJournal('Syndicate aware of consent apparatus analysis', 'complication', `sunspire-consent-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The council minutes show unanimous agreement on the last three major resource decisions. No recorded dissent, no abstentions. For decisions of this scope — distribution changes, quota revisions, housing reallocations — that uniformity is unusual. Either the community is genuinely aligned, or the disagreement happened before the record was made. The minutes don't show which.`;
        addJournal('Coerced consent structure confirmed', 'evidence', `sunspire-consent-confirmed-${G.dayCount}`);
      } else {
        G.lastResult = `Community members describe the quota and distribution decisions as things they agreed to. The phrasing is consistent — "the family accepted the terms," "we came to an arrangement" — but what the alternative was, if one existed, nobody will say. The consent is documented. The conditions that produced it are not in the same record.`;
        addJournal('Manufactured consent analysis incomplete without threat documentation', 'evidence', `sunspire-consent-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== GOSSIP & TENSION LAYERS (4 CHOICES) ==========

  // 17. STREET RUMOR: FAMILY WHISPERS
  {
    label: "The same story at both ends of the market square, in a lowered voice. Nobody is organizing it.",
    tags: ['Investigation', 'Rumor', 'Family', 'Gossip', 'Meaningful'],
    xpReward: 65,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'parsing family narrative');
      G.stageProgress[1]++;

      const rumor = ['the syndicate is deliberately making resources scarce to control families', 'families that resist are being broken up and scattered', 'food is being stored somewhere outside Sunspire instead of distributed', 'certain families are getting special treatment from the syndicate while others starve', 'someone is taking resources north and nobody knows why'];
      const selected = rumor[Math.floor(Math.random() * rumor.length)];

      G.lastResult = `At the communal meal area, between the second and third course, a family elder drops his voice: "${selected}." The person beside him doesn't look up. It's not a revelation — it's confirmation of something already circulating. The same fragment surfaces twice more through the afternoon in different corners of the market, from people who don't share a table. Nobody attaches a name to it. The detail travels because it lands on something people already half-know is there.`;
      addJournal(`Family rumor gathered: "${selected}"`, 'evidence', `sunspire-rumor-${G.dayCount}`);

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 16. INSTITUTIONAL CRACK: SYNDICATE CONTROL PROOF
  {
    label: "The diversion, the scarcity, the family pressure — these aren't separate problems. They're one apparatus.",
    tags: ['Investigation', 'Evidence', 'Proof', 'Coordination', 'Meaningful'],
    xpReward: 80,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(80, 'exposing syndicate conspiracy');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `You piece together the evidence: resource accounting showing more harvested food diverted than distributed. Records showing families allocated less than subsistence levels while syndicate leadership stores surplus. Communications showing syndicate coordination with external parties about resource extraction. Work records showing families directed to production far beyond their own needs. Family obligation records showing systematic targeting of resistant families. The documentation is clear: the syndicate is deliberately extracting resources from Sunspire Haven and sending them externally while maintaining community dependence through artificial scarcity. The wrongness has architectural documentation.`;
        G.stageProgress[1]++;
        addJournal('Syndicate extraction conspiracy documented with proof', 'evidence', `sunspire-proof-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The compilation is noticed before it's finished. A syndicate coordinator arrives at the waystation before you've returned — not running, moving at the deliberate pace of someone who doesn't need to rush. The warning is delivered in administrative language: continued documentation of resource management will result in removal from Sunspire Haven's access registry. The phrasing is procedural. The speed of arrival is not. Your name is already in the syndicate's notation before you've left the room.`;
        G.worldClocks.pressure++;
        addJournal('Syndicate directly warned about control system exposure', 'complication', `sunspire-proof-caught-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `The evidence assembled is substantial: discrepancies between harvest volumes and distribution totals, convoy manifests with unexplained cargo weights, external shipments routed past standard trade termini. Together they suggest deliberate resource extraction through syndicate channels. Compelling but not conclusive — proof of coordination requires comparing local accounting against the external destination records, which aren't accessible from inside Sunspire Haven. The gap between suggestion and proof is one set of records wide.`;
        addJournal('Syndicate extraction strongly suggested by evidence', 'evidence', `sunspire-proof-partial-${G.dayCount}`);
      } else {
        G.lastResult = `The resource records exist and are legible — harvest intakes, distribution columns, convoy departures. What they can't show on their own is whether the discrepancies are extraction or error. Proving deliberate extraction requires comparing local accounting against external destination records: what arrives where, under whose name, on what dates. Those records aren't in Sunspire Haven. They're wherever the convoys end up, and that address isn't on any manifest currently available.`;
        addJournal('Syndicate proof incomplete without external coordination records', 'evidence', `sunspire-proof-incomplete-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 17. MORAL PRESSURE: FAMILY COMPLICITY CHOICE
  {
    label: "The family leader cooperated. The question is whether they had any other choice.",
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
        { name: 'Yard Master Corbek', role: 'logistics coordinator', fear: 'They threatened to move my family to external labor camps if I didn\'t cooperate with resource diversion' },
        { name: 'Family Broker Lysander', role: 'family negotiator', fear: 'My own family would starve if I resisted. I had to accept syndicate terms to feed them' },
        { name: 'Syndicate Coordinator Varen', role: 'resource allocator', fear: 'They have my children. I cooperate or I never see them again' }
      ];

      const npc = npcOptions[Math.floor(Math.random() * npcOptions.length)];

      G.lastResult = `${npc.name} doesn't wait for the second question. The first one breaks the silence they've been keeping. "${npc.fear}." They're not asking for anything — no absolution, no assurance. Their hands stay flat on the table. The fear is specific and old enough to have a shape. Whatever comes next is no longer entirely their decision.`;

      if (!G.flags) G.flags = {};
      G.flags.stage1_evidence_decision = 'pending';
      G.flags.stage1_moral_npc = npc.name;

      addJournal('consequence', `Confronted ${npc.name} (${npc.role}) about syndicate extraction participation`, `sunspire-moral-${G.dayCount}`);

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 18. DISCOVERY MOMENT: EXTERNAL COORDINATION SOURCE
  {
    label: "The syndicate takes orders from someone outside Sunspire. The courier receipts came from somewhere north.",
    tags: ['Investigation', 'Origin', 'Discovery', 'Climax', 'Meaningful'],
    xpReward: 80,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(80, 'discovering origin source of extraction');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Behind the diverted resources and artificial scarcity, you find the thread that leads outside Sunspire Haven. Courier receipts from northern territories with instructions to maximize resource extraction and minimize community distribution. Financial transfers paying the syndicate leadership for cooperation. Orders for "family atomization protocols" designed to prevent collective resistance. Sunspire Haven's community is being systematically harvested by external interests using the syndicate as a management apparatus. Someone in the northern territories — or someone allied with them — is coordinating the resource extraction and social destruction. The conspiracy is coordinated, resourced, and external.`;
        G.stageProgress[1]++;
        addJournal('Origin source of Sunspire Haven extraction identified as external coordination', 'discovery', `sunspire-origin-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `As you approach the evidence of external coordination, you're intercepted. Someone stops you directly and makes it clear that pursuing this further will result in your removal from Sunspire Haven or worse. You've discovered pieces, but the full external coordination remains hidden — and now you're marked as a direct threat.`;
        G.worldClocks.pressure += 2;
        addJournal('Inquiry interrupted by external coordination operators', 'complication', `sunspire-origin-caught-${G.dayCount}`);
      } else if (result.total >= 14) {
        G.lastResult = `The evidence points beyond Sunspire Haven. Courier routes reference "northern resource authorities." Extraction orders show external signature. The conspiracy is larger than the community itself. You don't know the exact source yet, but you know the resource extraction is being directed from outside Sunspire Haven's borders.`;
        addJournal('External coordination of Sunspire Haven extraction confirmed', 'discovery', `sunspire-origin-external-${G.dayCount}`);
      } else {
        G.lastResult = `The pieces suggest external involvement — courier receipts referencing outside parties, authorization marks without local provenance, convoy patterns that bypass Sunspire Haven's own route network. But the origin source remains obscured behind the layers that were built to obscure it. Whoever is orchestrating this has had sufficient time and resources to put distance between their instructions and their names. The shape of the apparatus is visible. The people who built it are not.`;
        addJournal('External coordination suspected but source not yet identified', 'evidence', `sunspire-origin-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== EXPANSION CHOICES ==========

  // 21. CLUE: SIGNAL-DAMPING CONTAINER
  {
    label: "The sealed container from the disrupted convoy is heavier than its size. The interior lining isn't trade-grade.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 74,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'analyzing signal-damping container');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 13) {
        G.lastResult = `The interior lining is composite — ash-resin layered over a fine copper mesh. Signal damping, but not commercial. The precision exceeds anything in trade-grade shielding. A craftmark on the base reads a three-digit code followed by what looks like a municipal stamp from Shelkopolis's outer fabrication district. This container was manufactured specifically and recently. Someone ordered it custom for a payload they didn't want detected in transit.`;
        if (!G.flags) G.flags = {};
        G.flags.analyzed_signal_container = true;
        addJournal('Signal-damping container: custom-fabricated, Shelkopolis craftmark, military-grade shielding', 'evidence', `sunspire-container-${G.dayCount}`);
      } else {
        G.lastResult = `The container is heavier than its size suggests — dense without rattling, the weight distributed evenly through a layered interior wall. The inner surface has a composite texture, ash-resin over something metallic, not standard trade shielding. The construction is precise. Whoever made this had a specific payload in mind and a specific detection threat they were shielding against. Without a fabrication reference guide, placing the specification exactly is beyond what's available to you at this moment.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 22. CLUE: CONVOY ROUTE DEVIATION
  {
    label: "The filed route and the actual route don't match. The detour avoided the only Warden checkpoint on that road.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'mapping convoy route deviation');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      G.lastResult = `Filed route: eastern trade road, standard checkpoint stops. Actual route: a two-hour deviation northwest, avoiding the Warden Order post at Milegate. The convoy wasn't disrupted on its filed path — it was disrupted on a detour that was never officially logged. Whoever organized this knew the route, arranged the deviation, and arranged the interception at a point where no Warden checkpoint would have record of the convoy passing.`;
      if (!G.flags) G.flags = {};
      G.flags.found_convoy_route_deviation = true;
      addJournal('Convoy route deviation: off-record detour avoided Warden checkpoint at Milegate', 'evidence', `sunspire-route-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 23. ARCHETYPE-GATED: READING THE AFTERMATH
  {
    label: "The official report describes a raid. The site tells a different story.",
    tags: ['Investigation', 'Archetype', 'Stage1', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'reading disruption site');
      const arch = G.archetype && G.archetype.group;

      if (arch === 'combat') {
        G.lastResult = `The positions of the guards when they fell tell you this wasn't a surprise attack — they were already moving into defensive formation when contact happened. They knew something was wrong before the interception began. The convoy security was compromised from inside. Someone on the convoy itself signaled the moment.`;
      } else if (arch === 'magic') {
        G.lastResult = `Residue on the ground near the container position suggests the damping material had been activated before the convoy stopped. The container was already shielded before the disruption happened. This wasn't an ambush on a moving target — it was a scheduled handoff staged to look like a hijacking.`;
      } else if (arch === 'stealth') {
        G.lastResult = `The site has been cleaned. Not badly — it looks natural — but too natural. Wheel ruts that should be there aren't. The ground is even where a heavy container would have been dragged. Someone came back after the disruption and removed traces. Professional scene-clearing, done in daylight.`;
      } else {
        G.lastResult = `Two supply crates are still at the site, undisturbed. The disruption was selective — the sealed container was taken; everything else was left. This wasn't a raid on the convoy. It was retrieval of one specific item. The rest of the cargo was never the point.`;
      }
      addJournal('Convoy disruption site: selective retrieval confirmed, scene-cleared, inside contact suspected', 'evidence', `sunspire-site-read-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 24. FACTION SEED: WARDEN ORDER CONTACT
  {
    label: "The Warden Order post at the north gate. Either they already know, or they need to.",
    tags: ['Faction', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'making Warden Order contact');
      if (!G.factionHostility) G.factionHostility = { warden_order: 0, iron_compact: 0, oversight_collegium: 0 };

      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `Captain-Adjutant Sera receives your report with calibrated attention. She asks three clarifying questions — all about the container, none about the disruption itself. "We're aware of the deviation category," she says finally. "What you've added is the Milegate confirmation." She gives you a reference number and tells you an inquiry is open. She doesn't tell you what the inquiry is about. The Warden Order knows more than they're sharing.`;
        if (!G.flags) G.flags = {};
        G.flags.met_warden_order_sunspire = true;
        G.factionHostility.warden_order += 1;
        addJournal('faction', 'Warden Order Captain-Adjutant Sera: confirmed awareness of container category, open inquiry exists', `sunspire-warden-${G.dayCount}`);
      } else {
        G.lastResult = `The duty officer takes your report by rote — pen moving before you've finished the second sentence, form already half-filled. It goes into a stack of similar forms on the corner of the desk. No follow-up is offered; no timeframe for review is mentioned. The north gate is cold and bright with morning sun off the spire stone. Either the Warden Order has no interest in this convoy's deviation, or someone has already told them not to develop one. The form disappears into the stack without ceremony.`;
        if (!G.flags) G.flags = {};
        G.flags.attempted_warden_order_sunspire = true;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 25. ATMOSPHERE: THE SIGNAL TOWER
  {
    label: "The signal tower runs the standard sequence. Between the second and third light, there's a half-beat pause that isn't in the protocol.",
    tags: ['WorldColor', 'Lore', 'Stage1', 'Meaningful'],
    xpReward: 53,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(53, 'reading signal tower light pattern');

      G.lastResult = `The tower keeper lights three sequences: north, east, south. Standard all-clear. But between the second and third, there's a half-beat pause that isn't in the protocol guide. You've seen that pause three times today. It means something — not to you, not yet. But whoever reads these lights from the road already knows. Sunspire is communicating in a layer you don't have the key to.`;
      addJournal('Signal tower: undocumented pause pattern — secondary communication channel suspected', 'discovery', `sunspire-tower-${G.dayCount}`);
      G.recentOutcomeType = 'explore'; maybeStageAdvance();
    }
  },

  // 26. PERSONAL ARC: DOCUMENT THE CONTAINER
  {
    label: "The container gets catalogued and locked away today. The craftmark needs to be recorded before that happens.",
    tags: ['PersonalArc', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 62,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(62, 'documenting container specifications');
      if (!G.flags) G.flags = {};

      const result = rollD20('spirit', (G.skills.craft || 0) + Math.floor(G.level / 3));
      if (result.total >= 10) {
        G.lastResult = `Your sketch captures dimensions, material layering, and the craftmark precisely — enough that a fabricator could identify the manufacture source from the drawing alone. You copy it twice and cache the second in your personal kit. Whatever happens to the physical container, you have its record.`;
        G.flags.container_documentation = true;
        addJournal('consequence', 'Container documentation completed and secured — craftmark recorded for later identification', `sunspire-document-${G.dayCount}`);
      } else {
        G.lastResult = `The sketch captures dimensions and general construction — the layered wall depth, the weight distribution, the composite interior surface noted in cross-section. The craftmark on the base is already partially obscured by handling: fingers, a rough surface somewhere in transit. Two of the three digits are clear; the third reads as either a four or a nine. The municipal stamp beside it is legible enough to narrow the district. What's recorded is useful without being complete.`;
        G.flags.container_documentation = true;
      }
      G.recentOutcomeType = 'craft'; maybeStageAdvance();
    }
  },

  // 27. SOCIAL: THE CONVOY GUARD SURVIVOR
  {
    label: "One guard survived the convoy disruption. He's still at the waystation infirmary, still lucid enough to talk.",
    tags: ['Social', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'interviewing convoy survivor');

      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `Tennen is still concussed but lucid. "The second driver — I didn't know him. New hire, came on three days before the run. He knew the deviation before the convoy coordinator announced it. I remember thinking: how does he know?" He pauses. "The interception didn't come from the road. It came from inside. That driver was the plant." He's told the Warden Order this. They thanked him and told him to rest. The driver can't be found.`;
        if (!G.flags) G.flags = {};
        G.flags.met_tennen_guard = true;
        addJournal('contact', 'Convoy guard Tennen: inside contact was the second driver, Warden Order informed but took no visible action', `sunspire-tennen-${G.dayCount}`);
      } else {
        G.lastResult = `Tennen is drifting — the infirmary light too bright, his eyes tracking something slightly to the left of wherever you're standing. He gives fragments between silences: a wrong turn, a face he didn't recognize on a seat he thought he knew. The thread drops before it connects to anything. The concussion is still doing its work. What's inside the silence between his sentences might be exactly what's needed. Come back tomorrow, or the day after, when it clears.`;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // 28. SHADOW RIVAL INTRO
  {
    label: "The waystation innkeeper mentions a traveler asking about the convoy disruption — their description of events was more detailed than any official report.",
    tags: ['Rival', 'Warning', 'Stage1', 'Meaningful'],
    xpReward: 58,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(58, 'receiving rival warning');
      if (!G.flags) G.flags = {};

      const arch = G.archetype && G.archetype.group;
      if (arch === 'combat') {
        G.lastResult = `"Military bearing," the innkeeper says. "Asked whether the guards fired before or after the container was moved. Not whether they fired at all — specifically in what order. Someone with tactical training, working out a timeline." They knew what questions to ask. That means they already know what happened.`;
      } else if (arch === 'magic') {
        G.lastResult = `"Carried a measuring instrument — brass, cylindrical," the innkeeper says. "Held it near the container storage area before asking questions. I thought it was for surveying." A resonance reader or material sensor. This person was characterizing the container's damping field, not investigating the disruption. They came for the container specifically.`;
      } else if (arch === 'stealth') {
        G.lastResult = `"Didn't ask about the disruption at all," the innkeeper says. "Just asked who'd been asking about it. Named three people by description before they'd been introduced." A counter-investigator. They were mapping inquirers, not events. Your name isn't on their list yet — but it will be.`;
      } else {
        G.lastResult = `"Spoke to every staff member separately," the innkeeper says. "Different questions each time. I only put it together afterward — they were building a complete picture of everyone involved." A pause, cloth folded on the counter. "Never repeated themselves. Each person got a different angle of the same thing." Methodical social mapping. They moved through the staff the way a surveyor moves through terrain — covering the ground systematically, never doubling back. A profile of this disruption's participants is already assembled somewhere. It's more complete than yours.`;
      }

      G.lastResult += ` This person was here before you. They know what you're looking for.`;
      if (!G.rivalId) {
        if (arch === 'combat') G.rivalId = 'warden_captain';
        else if (arch === 'magic') G.rivalId = 'archivist_veld';
        else if (arch === 'stealth') G.rivalId = 'shadow_broker';
        else G.rivalId = 'provost_lenn';
      }
      G.flags.stage1_rival_seeded = true;
      addJournal('warning', 'Rival-adjacent operative confirmed investigating Sunspire convoy disruption ahead of you', `sunspire-rival-${G.dayCount}`);
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
window.SUNSPIRE_HAVEN_STAGE1_ENRICHED_CHOICES = SUNSPIRE_HAVEN_STAGE1_ENRICHED_CHOICES;
