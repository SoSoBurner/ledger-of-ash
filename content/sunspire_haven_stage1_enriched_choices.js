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
    label: "Question the syndicate yard master about recent convoy route changes — are supplies being diverted, and is transport being restricted?",
    tags: ['Investigation', 'NPC', 'Syndicate', 'Logistics', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading convoy diversion patterns');
      G.stageProgress[1]++;

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      const target = 11 + Math.max(0, G.worldClocks.pressure);

      if (result.isCrit) {
        G.lastResult = `Corbek steps back from the manifest board and lowers his voice. "Routes used to be optimized for access — fastest path, community depots first. Now instructions come from above the yard level. Certain supply lines are lengthened, delayed, or rerouted through external storage before reaching Sunspire's market." He taps the board without pointing at anything specific. "Convoys leaving this yard are moving through chokepoints someone else controls. What arrives and when isn't our decision anymore."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Yard master revealed route manipulation and supply filtering', `sunspire-yard-routes-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Corbek turns back to the manifest board before you've finished the question. "Convoy routing is family business. I don't take that outside." He doesn't argue, doesn't elaborate. By the time you reach the yard gate, two handlers have glanced at you in the particular way that means your name is already traveling through the supply chain alongside the morning's manifest.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Yard master now wary of your inquiries', `sunspire-yard-hostile-${G.dayCount}`);
      } else {
        G.lastResult = `"Routes have been updated," Corbek says, without quite committing to more. "Supply demands shift." He says it toward the manifest board rather than at you. The board behind him shows three depot notations scratched out and rewritten in the past ten days.`;
        addJournal('investigation', 'Yard master confirmed convoy route modifications', `sunspire-yard-pressure-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 2. FAMILY BROKER: OBLIGATION ENFORCEMENT
  {
    label: "Speak with a family broker about recent changes in family obligation enforcement — are obligations being weaponized against certain families?",
    tags: ['Investigation', 'NPC', 'Family', 'Coercion', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering obligation weaponization');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Lysander chooses a corner of the market hall before he speaks. "Obligations are the structure of Sunspire — everyone knows this. What's changed is who decides what an obligation means." He keeps his hands folded. "Families that push back on syndicate preferences get told their service obligations are being reviewed for increase. Families that comply get waivers and reductions. The registry of mutual duty now runs through syndicate preference." He doesn't call it by any larger name. He doesn't have to.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Broker revealed obligation system weaponization', `sunspire-broker-obligations-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Lysander's expression settles into practiced neutrality. "Obligation systems are internal family matters. I don't take them outside." He doesn't raise his voice or show offense. But by the next morning, two family heads have heard that an outsider was asking about obligation enforcement. The family network moves faster than the wagon routes.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Family brokers warned about your investigation', `sunspire-broker-alert-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `Lysander grants you that. "Obligations are being standardized — more uniformly enforced now." He doesn't volunteer why, or by whom. The obligation board behind the registry desk has been repainted recently; the old chalk categories are visible beneath the new ones.`;
        addJournal('investigation', 'Broker confirmed recent obligation system changes', `sunspire-broker-unclear-${G.dayCount}`);
      } else {
        G.lastResult = `"Obligation policy is internal family documentation." Lysander doesn't apologize for it. Without family standing in Sunspire's registry, he won't open the ledgers. The obligation records are visible on the shelf behind him — close enough to read the spine labels, not close enough to open without permission.`;
        addJournal('investigation', 'Family obligations blocked without family access', `sunspire-broker-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 3. HARVEST COORDINATOR: FOOD DISTRIBUTION CHANGES
  {
    label: "Consult with the harvest coordinator — is food allocation being unequally distributed, or are certain families receiving preferential rations?",
    tags: ['Investigation', 'NPC', 'Resources', 'Food', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading food distribution patterns');
      G.stageProgress[1]++;

      const result = rollD20('survival', (G.skills.survival || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Mirrin stands beside the grain register with her arms crossed and speaks quietly and fast. "Access to the harvest now follows a list I don't write. Syndicate-aligned families get first access, quality grain, guaranteed portions. Families that have raised questions get what's left — lower-quality stores, shorter guarantees, smaller portions. I distribute what I'm told to distribute." She opens the register and closes it again without showing it. "The accounting makes it look like scarcity. It isn't scarcity."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Coordinator revealed politicized food distribution system', `sunspire-harvest-distribution-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Mirrin turns back to the register. "Allocation decisions are complex and not for outside discussion." She's not rude about it; she just stops. The harvest hall has three other staff within earshot, and all three have gone slightly still. Questions about food distribution travel.`;
        addJournal('complication', 'Harvest coordinator refuses further distribution inquiry', `sunspire-harvest-silent-${G.dayCount}`);
      } else {
        G.lastResult = `"Distribution has been adjusted to account for supply variations," Mirrin says. She doesn't expand on it. Behind her, the allocation column in the open register shows the same three family names at the top of every weekly entry for the past two months.`;
        addJournal('investigation', 'Coordinator confirmed recent food distribution changes', `sunspire-harvest-confirmed-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 4. TEXTILE MERCHANT: TRADE PREFERENCE BIAS
  {
    label: "Question textile merchants about recent changes to trade opportunities — are certain families receiving favorable contracts while others are excluded?",
    tags: ['Investigation', 'NPC', 'Commerce', 'Bias', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering trade preference bias');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Keldan steps away from his stall and speaks with his back to the market lane. "Premium material access, extended payment terms, favorable contract timelines — all of it now runs through syndicate family connections. The quality of the work doesn't matter. I've seen good craft turned away and inferior work given prime contract terms because of whose family name it came from." He keeps his voice level. "The market hasn't been disrupted. It's been redesigned."  `;
        G.stageProgress[1]++;
        addJournal('investigation', 'Merchant revealed systematic trade preference corruption', `sunspire-textile-bias-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Keldan's posture changes mid-sentence. "Why are you asking about contract distribution?" He doesn't wait for the answer. The conversation ends, and by the next market bell, two other merchants near the cloth stalls have received some version of your description and the nature of your questions.`;
        G.worldClocks.isolation++;
        addJournal('complication', 'Merchants now viewing you as potential investigator', `sunspire-textile-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Keldan acknowledges uneven distribution without naming its source. "Competitive positions vary across families." He straightens a bolt of cloth that didn't need straightening. The contract board on the market's east wall has three family names appearing in six of the last seven premium material listings.`;
        addJournal('investigation', 'Merchant confirmed trade opportunity inequality', `sunspire-textile-confirmed-${G.dayCount}`);
      } else {
        G.lastResult = `"Commercial arrangements are private matters between parties." Keldan says it toward his stall rather than at you. The contract register behind the market administrator's counter requires merchant standing to access, and Keldan isn't offering to vouch for you.`;
        addJournal('investigation', 'Trade preferences blocked without commercial access', `sunspire-textile-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 5. QUOTA KEEPER: PRODUCTION PRESSURE
  {
    label: "Interview the quota keeper about recent production targets — are quotas becoming impossible to meet, or are families failing to achieve them deliberately?",
    tags: ['Investigation', 'NPC', 'Production', 'Quotas', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading quota pressure patterns');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Neria sits with her hands on the quota ledger and doesn't open it. "The targets for certain families have been set at levels they can't reach with the resources they're allocated. When they fail — and they fail — they lose standing, resource access, community position." She opens the ledger to a comparison page she's already marked. "Families with syndicate alignment get targets calculated to their actual capacity, sometimes lower. It isn't variance. It's engineering."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Quota keeper revealed quota system weaponization', `sunspire-quota-pressure-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Neria closes the ledger and lifts her hand to flag the syndicate administrator across the room. "Production records aren't for outside review." The flagging is deliberate, visible, a message being sent in front of you rather than behind you. By the time you leave the quota hall, a report on your inquiry is already moving upward through the syndicate's coordination chain.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Syndicate investigating your quota system inquiry', `sunspire-quota-alert-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `The targets have been adjusted in the past two cycles. Some families miss consistently — not by large margins, but always by enough to trigger a review. Other families hit their targets with room to spare. The resource allocations that accompany those targets don't explain the gap. The targets explain the gap.`;
        addJournal('investigation', 'Quota records show signs of deliberate inequality', `sunspire-quota-altered-${G.dayCount}`);
      } else {
        G.lastResult = `"Quota records are internal family documentation." Neria stacks the ledgers back against the wall before you can scan the visible page. Without family standing in Sunspire's production registry, the numbers stay closed. She's done this before — the stack is tight, spines facing inward.`;
        addJournal('investigation', 'Quota information blocked without family access', `sunspire-quota-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 6. CONVOY ORGANIZER: EXTERNAL COORDINATION
  {
    label: "Question the convoy organizer about communication with external interests — are shipments being coordinated with outside forces, and are messages being encrypted?",
    tags: ['Investigation', 'NPC', 'Communication', 'External', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'tracing external communication');
      G.stageProgress[1]++;

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + (G.skills.insight || 0) / 2 + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Tholen glances at the yard before speaking. "Some convoys get separate instructions — not from yard management, from a different source entirely. Encrypted messages, private couriers, destinations updated at departure without explanation." He keeps his voice down. "I was told clearly not to ask about these runs. They go out, they come back, the manifests don't match what left." He pauses. "These aren't trade convoys. They're carrying something the manifests aren't naming."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Convoy organizer revealed external coordination channels', `sunspire-convoy-external-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Tholen's expression shifts fast — not anger, something quieter and more concerned. "I don't have anything to tell you about that." He steps back, puts the manifest cart between you and him, and doesn't say another word. He's not refusing because he doesn't know. He's refusing because he does.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Convoy organizer frightened by external coordination inquiry', `sunspire-convoy-alert-${G.dayCount}`);
      } else {
        G.lastResult = `Tholen admits there are runs that get handled differently. "Some convoys work outside the standard process. It's just how things go sometimes." He doesn't name which convoys or why. The departure log on his desk has three entries with the destination column left blank.`;
        addJournal('investigation', 'Convoy organizer confirmed non-standard convoy operations', `sunspire-convoy-evasive-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 7. FAMILY ELDER: DECISION AUTHORITY EROSION
  {
    label: "Speak confidentially with a family elder about decision-making authority — has their power been undermined, or are syndicate directives overriding family autonomy?",
    tags: ['Investigation', 'NPC', 'Family', 'Authority', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering authority erosion');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Daven speaks without sitting down, hands behind his back. "Thirty years as an elder. My family brought decisions to me because I was the one who made them." He looks out toward the courtyard where two of his youngest grandchildren are working a job assignment he didn't authorize. "Syndicate directives arrive now with the weight of tradition. I'm told to implement them. When I've pushed back, I've been reminded that family standing depends on syndicate goodwill." He's steady, controlled, but the grief is in the word "reminded."  `;
        G.stageProgress[1]++;
        addJournal('investigation', 'Elder revealed systemic family authority erosion', `sunspire-elder-authority-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Daven stops you with a raised hand. "Family governance is not open to outside discussion. You're not family." He says it without cruelty. The conversation ends there. In the courtyard, two people who were watching from doorways have already disappeared back inside.`;
        G.worldClocks.reverence++;
        addJournal('complication', 'Family leadership banned you from authority questions', `sunspire-elder-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Daven grants you a careful sentence. "Decision-making coordinates with the broader syndicate structure now." He doesn't say what was lost in that shift. The family governance board on the wall behind him has three new names in the advisory column that weren't there last season.`;
        addJournal('investigation', 'Elder confirmed family authority constraints', `sunspire-elder-confirmed-${G.dayCount}`);
      } else {
        G.lastResult = `"Family structure is internal." Daven closes the door to the governance room without explaining what's in it. Without family standing in Sunspire's registry, no elder will open that door for you. The frame is still warm from when someone recently pulled it shut.`;
        addJournal('investigation', 'Family governance blocked without family membership', `sunspire-elder-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 8. MARKET INSPECTOR: QUALITY ENFORCEMENT BIAS
  {
    label: "Question the market inspector about quality enforcement — are standards being applied inconsistently, or are certain families receiving special treatment?",
    tags: ['Investigation', 'NPC', 'Quality', 'Market', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering enforcement bias');
      G.stageProgress[1]++;

      const result = rollD20('craft', (G.skills.craft || 0) + (G.skills.insight || 0) / 2 + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Varen moves to the far end of the inspection table before speaking. "The quality standards exist. What I'm permitted to do with them depends on who I'm inspecting." He taps the enforcement log. "Syndicate-aligned stalls pass with deviations I'd shut down another trader for. Families that have raised objections at the council get intensive review — minor variance, goods removed, stall flagged." He holds the log shut. "I document what I'm told to enforce. I don't write the instructions."  `;
        G.stageProgress[1]++;
        addJournal('investigation', 'Inspector revealed selective quality enforcement system', `sunspire-inspector-bias-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Varen turns the log face-down. "Enforcement decisions aren't for outside discussion. It's sensitive to ongoing market proceedings." He's not hostile — just flat. Three other inspectors in the room have stopped moving. The market inspection department has been briefed to be careful, and Varen has just demonstrated he received that briefing.`;
        G.worldClocks.isolation++;
        addJournal('complication', 'Market inspector refused further investigation', `sunspire-inspector-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Varen allows that much. "Enforcement has been applied with contextual flexibility recently." He doesn't define context. The enforcement log's open page shows two stall closures from the same family name in the past month — both for minor variance — and three clearances for a different family name that the standards would have caught.`;
        addJournal('investigation', 'Inspector confirmed inconsistent enforcement practices', `sunspire-inspector-confirmed-${G.dayCount}`);
      } else {
        G.lastResult = `"Enforcement records are administrative." Varen closes the log and puts it on the high shelf. Without market authority in Sunspire's trade registry, the enforcement documents stay up there. He doesn't offer to retrieve them.`;
        addJournal('investigation', 'Enforcement practices blocked without administrative access', `sunspire-inspector-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== ARCHETYPE DEEP DIVES (8 CHOICES) ==========

  // 9. FAMILY STRUCTURE TIER 1: SYNDICATE INTEGRATION ANALYSIS
  {
    label: "Analyze how Sunspire Haven's family structures have been reorganized — are families being consolidated, broken apart, or restructured to depend on the syndicate?",
    tags: ['Investigation', 'Family', 'Structure', 'Organization', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'family structure analysis');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The work assignment records, cross-referenced against the family registry, show a clear pattern. Children from families that have raised syndicate objections are placed in assignments at locations separate from their households — not punishingly distant, just far enough. Families aligned with syndicate leadership are clustered, given shared housing and coordinated resource access. Multi-generational households that traditionally provided their members with stability and collective standing are being dispersed into smaller units with individual dependencies. The family structure is being redrawn around syndicate favor.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Family analysis revealed systematic family restructuring', `sunspire-family-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your analysis of family structures draws attention from syndicate leadership. You're questioned about your interest in family organization. Your investigation is now flagged as unauthorized structural analysis.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Syndicate leadership alerted to family structure analysis', `sunspire-family-alert-${G.dayCount}`);
      } else {
        G.lastResult = `Family structures show recent changes. Some families have shifted, memberships have changed, and organizational patterns appear different. The family structure has been modified.`;
        addJournal('investigation', 'Family structure modifications detected', `sunspire-family-modified-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 10. RESOURCE CONTROL TIER 2: SCARCITY ENGINEERING
  {
    label: "Document evidence that resource scarcity is being engineered — show how syndicate control is creating artificial shortages to maintain dependence.",
    tags: ['Investigation', 'Resources', 'Scarcity', 'Control', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'scarcity engineering documentation');
      G.stageProgress[1]++;

      const result = rollD20('survival', (G.skills.survival || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The resource system reveals deliberate engineering of scarcity. Harvests are diverted before reaching community storage. Food that could be distributed for subsistence is instead warehoused to create artificial shortages. Families dependent on market access for grain are increasingly forced to rely on syndicate-controlled rationing. Tools and materials are allocated through syndicate channels rather than through traditional family networks. Artificial scarcity is being weaponized — communities face enough shortage to require dependence while avoiding starvation that would provoke resistance.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Resource analysis revealed engineered scarcity system', `sunspire-resources-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your documentation of resource scarcity engineering draws direct attention from syndicate leadership. Someone warns you that exposing resource management will result in your removal from Sunspire Haven. Your investigation is marked as a direct threat.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Syndicate directly warned about resource scarcity inquiry', `sunspire-resources-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Resource distribution shows suspicious patterns. Supply levels don't match harvest records. Something's diverting resources systematically. The scarcity appears deliberately engineered.`;
        addJournal('investigation', 'Resource diversion pattern confirmed', `sunspire-resources-partial-${G.dayCount}`);
      } else {
        G.lastResult = `Resource management is complex. Understanding full scarcity engineering requires comparing harvest data, storage records, and distribution reports that you don't have complete access to.`;
        addJournal('investigation', 'Resource scarcity proof incomplete without full data access', `sunspire-resources-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 11. INFORMATION ISOLATION TIER 1: EXTERNAL NEWS FILTERING
  {
    label: "Track what information reaches Sunspire Haven from external sources — is news being filtered, and is the community being information-isolated?",
    tags: ['Investigation', 'Information', 'Isolation', 'Communication', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'information isolation analysis');
      G.stageProgress[1]++;

      const result = rollD20('stealth', (G.skills.stealth || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Information reaching Sunspire Haven from outside is being deliberately filtered. Stories about other localities' labor unrest, trade disruptions, or similar patterns are suppressed. Messages that might inspire collective resistance are intercepted before distribution. Travelers are questioned about what they've discussed with community members. The community is being information-isolated — cut off from perspective that they're part of a larger pattern, prevented from learning that other localities face similar manipulation.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Information analysis revealed systematic news filtering', `sunspire-information-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your tracking of information flows is noticed. Syndicate monitors question your interest in communication patterns. Your information analysis is now being monitored by the syndicate.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Syndicate monitoring alerted to information flow tracking', `sunspire-information-alert-${G.dayCount}`);
      } else {
        G.lastResult = `Information flows show signs of recent changes. Some stories appear to be circulating less freely. External news reaching the community seems filtered.`;
        addJournal('investigation', 'Information filtering modifications detected', `sunspire-information-partial-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 12. COERCION SYSTEM TIER 2: THREAT MAPPING
  {
    label: "Document the specific threats and consequences used against families — who's being threatened, what are they threatened with, and for what resistance?",
    tags: ['Investigation', 'Coercion', 'Threats', 'Fear', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'coercion apparatus documentation');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `A pattern of threats emerges. Families who question syndicate decisions face resource allocation reductions. Families who speak publicly about manipulation face social isolation and removal from communal events. Families who attempt to organize resistance face threats to family members' employment and housing. Children of resistant families are directed to dangerous work assignments. The threats are calibrated — severe enough to enforce compliance, but maintained at levels that prevent open resistance. Coercion has become the hidden infrastructure of syndicate control.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Coercion analysis mapped systematic threat apparatus', `sunspire-coercion-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your documentation of threats makes you a target. Someone warns you directly that continued investigation will result in your removal from Sunspire Haven. Your analysis of coercion has accelerated the very mechanisms you're studying.`;
        G.worldClocks.pressure += 2;
        addJournal('complication', 'Investigation drawing direct coercion consequences', `sunspire-coercion-caught-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Evidence of family intimidation exists. Families are clearly afraid to resist. The threat mechanisms aren't fully visible but their effects are undeniable.`;
        addJournal('investigation', 'Family intimidation confirmed through behavioral patterns', `sunspire-coercion-confirmed-${G.dayCount}`);
      } else {
        G.lastResult = `Family fear exists but the specific coercion mechanisms are concealed. People won't openly discuss threats against them.`;
        addJournal('investigation', 'Coercion suspected but specific mechanisms not documented', `sunspire-coercion-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 13. EXTERNAL FLOWS TIER 1: RESOURCE EXTRACTION
  {
    label: "Trace resource flows moving away from Sunspire Haven outward — what's being extracted, where is it going, and who's authorizing these shipments?",
    tags: ['Investigation', 'Resources', 'Flow', 'Extraction', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'resource extraction tracking');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Resources that should sustain Sunspire Haven are being systematically extracted. Food beyond basic rations is being moved to external storage and destinations. Tools and materials are being diverted to external interests. Family craftwork is being accumulated in external warehouses. Sunspire Haven is being treated as a production facility rather than a community — resources are extracted after basic subsistence allowances are provided. The community is being economically hollowed out.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Resource flow analysis revealed systematic extraction', `sunspire-extraction-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your tracking of outbound resource flows draws attention from syndicate coordination. You're questioned about your interest in resource movements. The extraction networks are now aware you're mapping them.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Syndicate extraction operations alerted to tracking', `sunspire-extraction-alert-${G.dayCount}`);
      } else {
        G.lastResult = `Outbound resource movements show unusual patterns. Materials are being moved through non-standard channels. The extraction flows appear deliberately organized.`;
        addJournal('investigation', 'Resource extraction modifications detected', `sunspire-extraction-partial-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 14. COMMUNITY COHESION TIER 2: SOCIAL FRAGMENTATION
  {
    label: "Document the breakdown of community bonds — what traditional relationships have fractured, and what mutual aid networks are being disrupted?",
    tags: ['Investigation', 'Community', 'Bonds', 'Fragmentation', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'community fragmentation documentation');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Community bonds that once held Sunspire Haven together are being deliberately fractured. Families that traditionally cooperated are now in competition for syndicate-controlled resources. Mutual aid networks are being disrupted through resource control. Shared celebrations and gathering events are being limited or canceled. Young people are isolated from elders through separate work assignments. The social infrastructure that enabled collective action is being systematically destroyed. What's replacing it is individual family desperation and dependence on syndicate favor.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Community analysis revealed systematic social fragmentation', `sunspire-community-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your documentation of community breakdown makes people nervous. Some avoid you because they fear your inquiry will attract surveillance to their concerns. Your analysis is accelerating the fragmentation you're studying.`;
        G.worldClocks.isolation++;
        addJournal('complication', 'Community members avoiding you due to fear of scrutiny', `sunspire-community-caught-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Community bonds have clearly weakened. Families interact more cautiously. Shared events are less frequent. The community cohesion has declined visibly.`;
        addJournal('investigation', 'Community fragmentation confirmed through behavioral observation', `sunspire-community-confirmed-${G.dayCount}`);
      } else {
        G.lastResult = `Community concerns exist but the full scope of social breakdown is difficult to measure without deeper family access.`;
        addJournal('investigation', 'Community fragmentation suspected but incompletely documented', `sunspire-community-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 15. FAMILY FRAGMENTATION TIER 1: KINSHIP BREAKDOWN
  {
    label: "Document the breakdown of family bonds — which families are being separated, and what social pressures are preventing families from uniting?",
    tags: ['Investigation', 'Family', 'Bonds', 'Fragmentation', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'family fragmentation mapping');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Family bonds are being systematically severed. Children are separated from parents through work assignments to distant locations. Extended families that traditionally lived and worked together are being parceled into separate housing. Couples are assigned to different production cycles. Multi-generational families are losing their cohesion. Attempts to maintain family connections are viewed as suspicious loyalty questions. The primary tool of control — the family unit — is being deliberately fractured to prevent collective resistance. Families as economic and social units have been weaponized against themselves.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Family analysis revealed systematic kinship destruction', `sunspire-fragmentation-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your analysis of family breakdown draws direct attention from syndicate leadership. You're warned that documenting family separation is prohibited. The investigation is now flagged.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Syndicate prohibited further family fragmentation analysis', `sunspire-fragmentation-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Family structures show clear signs of disruption and separation. Many families are visibly fragmented. The breakdown is observable but the full system isn't clear.`;
        addJournal('investigation', 'Family fragmentation and separation patterns confirmed', `sunspire-fragmentation-confirmed-${G.dayCount}`);
      } else {
        G.lastResult = `Family separation exists but understanding the full system requires deeper family interviews and access to work assignment records.`;
        addJournal('investigation', 'Family fragmentation analysis incomplete without assignment data', `sunspire-fragmentation-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 16. CONSENT FICTION TIER 2: MANUFACTURED ACCEPTANCE
  {
    label: "Document how community resistance is being suppressed while maintaining the fiction of voluntary participation — analyze the mechanisms of coerced consent.",
    tags: ['Investigation', 'Coercion', 'Consent', 'Fiction', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'manufactured consent structure analysis');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The system maintains a fiction of voluntary participation. Communities are told they've "agreed" to resource distributions and family obligations. Families are told they've "accepted" their roles in production quotas. The syndicate maintains the appearance that the community is consenting to the system. In reality, families that resist face threats, exclusion, and starvation. The consent is manufactured through coercion disguised as voluntary choice. The system is designed to break resistance while maintaining the appearance that the community has accepted its own subjugation.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Consent analysis revealed manufactured acceptance apparatus', `sunspire-consent-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your analysis of coerced consent draws scrutiny from syndicate communication. You're warned that questioning "community participation" undermines social stability. The analysis is now being monitored.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Syndicate aware of consent apparatus analysis', `sunspire-consent-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The community participation structure shows signs of manufactured nature. People claim to have agreed to systems while showing clear signs of duress. The consent is visible but coercive.`;
        addJournal('investigation', 'Coerced consent structure confirmed', `sunspire-consent-confirmed-${G.dayCount}`);
      } else {
        G.lastResult = `Community acceptance appears genuine but understanding the coercion mechanisms requires deeper analysis of threat systems and family vulnerabilities.`;
        addJournal('investigation', 'Manufactured consent analysis incomplete without threat documentation', `sunspire-consent-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== GOSSIP & TENSION LAYERS (4 CHOICES) ==========

  // 17. STREET RUMOR: FAMILY WHISPERS
  {
    label: "Gather gossip at market gatherings and communal meal areas — what stories are families telling each other about syndicate changes?",
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

      G.lastResult = `The community whisper is: "${selected}." Families repeat it with varying certainty. Some claim direct experience, others are passing on fragments they've heard. But the collective narrative is consistent: the syndicate is deliberately harming the community to maintain control. Sunspire Haven's families are aware wrongness is happening, even if they can't articulate the full conspiracy yet.`;
      addJournal('investigation', `Family rumor gathered: "${selected}"`, `sunspire-rumor-${G.dayCount}`);

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 16. INSTITUTIONAL CRACK: SYNDICATE CONTROL PROOF
  {
    label: "Compile documented evidence that proves the syndicate is deliberately harming the community for external benefit — show the coordination and extraction system.",
    tags: ['Investigation', 'Evidence', 'Proof', 'Coordination', 'Meaningful'],
    xpReward: 80,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(80, 'exposing syndicate conspiracy');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `You piece together the evidence: resource accounting showing more harvested food diverted than distributed. Records showing families allocated less than subsistence levels while syndicate leadership stores surplus. Communications showing syndicate coordination with external parties about resource extraction. Work records showing families directed to production far beyond their own needs. Family obligation records showing systematic targeting of resistant families. The documentation is clear: the syndicate is deliberately extracting resources from Sunspire Haven and sending them externally while maintaining community dependence through artificial scarcity. The wrongness has architectural documentation.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Syndicate extraction conspiracy documented with proof', `sunspire-proof-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your compilation of syndicate control proof is noticed. Someone intercepts your documentation and warns you that exposing syndicate resource management will result in your removal from Sunspire Haven. You're marked as a threat to the syndicate's operational security.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Syndicate directly warned about control system exposure', `sunspire-proof-caught-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `You find enough evidence to suggest deliberate syndicate resource extraction. Discrepancies between harvests and distributions, unusual external shipments — it's compelling but not conclusively proven without comparing to external destination records.`;
        addJournal('investigation', 'Syndicate extraction strongly suggested by evidence', `sunspire-proof-partial-${G.dayCount}`);
      } else {
        G.lastResult = `The resource records exist but proving deliberate extraction requires comparing local accounting to external destination records that you don't yet have access to.`;
        addJournal('investigation', 'Syndicate proof incomplete without external coordination records', `sunspire-proof-incomplete-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 17. MORAL PRESSURE: FAMILY COMPLICITY CHOICE
  {
    label: "Confront a family leader who's complicit in syndicate resource extraction — demand explanation and decide whether to protect them or expose them.",
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

      G.lastResult = `You confront ${npc.name}. They crumble under pressure. "${npc.fear}." They're trapped, complicit, and terrified. You must decide: Do you expose them to stop the extraction system? Do you protect them and maintain your investigation quietly? Your choice determines whether this person becomes an informant or an enemy — and whether Sunspire Haven's resource hemorrhage can be challenged or continues unchecked.`;

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
    label: "Find the evidence that proves Sunspire Haven's syndicate resource extraction is coordinated from outside — discover the external interest controlling the system.",
    tags: ['Investigation', 'Origin', 'Discovery', 'Climax', 'Meaningful'],
    xpReward: 80,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(80, 'discovering origin source of extraction');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Behind the diverted resources and artificial scarcity, you find the thread that leads outside Sunspire Haven. Courier receipts from northern territories with instructions to maximize resource extraction and minimize community distribution. Financial transfers paying the syndicate leadership for cooperation. Orders for "family atomization protocols" designed to prevent collective resistance. Sunspire Haven's community is being systematically harvested by external interests using the syndicate as a management apparatus. Someone in the northern territories — or someone allied with them — is coordinating the resource extraction and social destruction. The conspiracy is coordinated, resourced, and external.`;
        G.stageProgress[1]++;
        addJournal('discovery', 'Origin source of Sunspire Haven extraction identified as external coordination', `sunspire-origin-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `As you approach the evidence of external coordination, you're intercepted. Someone stops you directly and makes it clear that pursuing this further will result in your removal from Sunspire Haven or worse. You've discovered pieces, but the full external coordination remains hidden — and now you're marked as a direct threat.`;
        G.worldClocks.pressure += 2;
        addJournal('complication', 'Investigation interrupted by external coordination operators', `sunspire-origin-caught-${G.dayCount}`);
      } else if (result.total >= 14) {
        G.lastResult = `The evidence points beyond Sunspire Haven. Courier routes reference "northern resource authorities." Extraction orders show external signature. The conspiracy is larger than the community itself. You don't know the exact source yet, but you know the resource extraction is being directed from outside Sunspire Haven's borders.`;
        addJournal('discovery', 'External coordination of Sunspire Haven extraction confirmed', `sunspire-origin-external-${G.dayCount}`);
      } else {
        G.lastResult = `You find pieces suggesting external involvement, but the origin source remains obscured. Whoever's orchestrating this has hidden their hand carefully.`;
        addJournal('investigation', 'External coordination suspected but source not yet identified', `sunspire-origin-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== EXPANSION CHOICES ==========

  // 21. CLUE: SIGNAL-DAMPING CONTAINER
  {
    label: "Examine the sealed container recovered from the disrupted convoy — study its construction and the markings on the interior lining.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 74,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'analyzing signal-damping container');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 13) {
        G.lastResult = `The interior lining is composite — ash-resin layered over a fine copper mesh. Signal damping, but not commercial. The precision exceeds anything in trade-grade shielding. A craftmark on the base reads a three-digit code followed by what looks like a municipal stamp from Shelkopolis's outer fabrication district. This container was manufactured specifically and recently. Someone ordered it custom for a payload they didn't want detected in transit.`;
        if (!G.flags) G.flags = {};
        G.flags.analyzed_signal_container = true;
        addJournal('investigation', 'Signal-damping container: custom-fabricated, Shelkopolis craftmark, military-grade shielding', `sunspire-container-${G.dayCount}`);
      } else {
        G.lastResult = `The container construction is unusual — heavier than it looks, with a layered interior. You recognize the material isn't standard trade shielding but can't place the specification without a reference guide.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 22. CLUE: CONVOY ROUTE DEVIATION
  {
    label: "Pull the convoy route logs and compare the filed route to the route the convoy actually traveled.",
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
      addJournal('investigation', 'Convoy route deviation: off-record detour avoided Warden checkpoint at Milegate', `sunspire-route-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 23. ARCHETYPE-GATED: READING THE AFTERMATH
  {
    label: "Study the site where the convoy disruption occurred — read what the scene tells you that the official report didn't.",
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
      addJournal('investigation', 'Convoy disruption site: selective retrieval confirmed, scene-cleared, inside contact suspected', `sunspire-site-read-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 24. FACTION SEED: WARDEN ORDER CONTACT
  {
    label: "Report the convoy route deviation to the Warden Order post at Sunspire's north gate.",
    tags: ['Faction', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'making Warden Order contact');
      if (!G.factionHostility) G.factionHostility = { warden_order: 0, iron_compact: 0, oversight_collegium: 0 };

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `Captain-Adjutant Sera receives your report with calibrated attention. She asks three clarifying questions — all about the container, none about the disruption itself. "We're aware of the deviation category," she says finally. "What you've added is the Milegate confirmation." She gives you a reference number and tells you an inquiry is open. She doesn't tell you what the inquiry is about. The Warden Order knows more than they're sharing.`;
        if (!G.flags) G.flags = {};
        G.flags.met_warden_order_sunspire = true;
        G.factionHostility.warden_order += 1;
        addJournal('faction', 'Warden Order Captain-Adjutant Sera: confirmed awareness of container category, open inquiry exists', `sunspire-warden-${G.dayCount}`);
      } else {
        G.lastResult = `The duty officer takes your report by rote. It goes into a form stack. No one follows up. Either the Warden Order isn't concerned with this convoy or they've been told not to be.`;
        if (!G.flags) G.flags = {};
        G.flags.attempted_warden_order_sunspire = true;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 25. ATMOSPHERE: THE SIGNAL TOWER
  {
    label: "Climb to Sunspire's signal tower at dusk — observe the pattern of lights and what they're actually communicating.",
    tags: ['WorldColor', 'Lore', 'Stage1', 'Meaningful'],
    xpReward: 53,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(53, 'reading signal tower light pattern');

      G.lastResult = `The tower keeper lights three sequences: north, east, south. Standard all-clear. But between the second and third, there's a half-beat pause that isn't in the protocol guide. You've seen that pause three times today. It means something — not to you, not yet. But whoever reads these lights from the road already knows. Sunspire is communicating in a layer you don't have the key to.`;
      addJournal('discovery', 'Signal tower: undocumented pause pattern — secondary communication channel suspected', `sunspire-tower-${G.dayCount}`);
      G.recentOutcomeType = 'explore'; maybeStageAdvance();
    }
  },

  // 26. PERSONAL ARC: DOCUMENT THE CONTAINER
  {
    label: "Make a complete technical sketch of the container and its craftmark before it's catalogued and locked away.",
    tags: ['PersonalArc', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 62,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(62, 'documenting container specifications');
      if (!G.flags) G.flags = {};

      const result = rollD20('craft', (G.skills.craft || 0) + Math.floor(G.level / 3));
      if (result.total >= 10) {
        G.lastResult = `Your sketch captures dimensions, material layering, and the craftmark precisely — enough that a fabricator could identify the manufacture source from the drawing alone. You copy it twice and cache the second in your personal kit. Whatever happens to the physical container, you have its record.`;
        G.flags.container_documentation = true;
        addJournal('consequence', 'Container documentation completed and secured — craftmark recorded for later identification', `sunspire-document-${G.dayCount}`);
      } else {
        G.lastResult = `You get most of it — dimensions, general construction — but the craftmark is already partially obscured by handling. What you have is better than nothing.`;
        G.flags.container_documentation = true;
      }
      G.recentOutcomeType = 'craft'; maybeStageAdvance();
    }
  },

  // 27. SOCIAL: THE CONVOY GUARD SURVIVOR
  {
    label: "Find the convoy guard who survived the disruption and is still recovering at the waystation infirmary.",
    tags: ['Social', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'interviewing convoy survivor');

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `Tennen is still concussed but lucid. "The second driver — I didn't know him. New hire, came on three days before the run. He knew the deviation before the convoy coordinator announced it. I remember thinking: how does he know?" He pauses. "The interception didn't come from the road. It came from inside. That driver was the contact." He's told the Warden Order this. They thanked him and told him to rest. The driver can't be found.`;
        if (!G.flags) G.flags = {};
        G.flags.met_tennen_guard = true;
        addJournal('contact', 'Convoy guard Tennen: inside contact was the second driver, Warden Order informed but took no visible action', `sunspire-tennen-${G.dayCount}`);
      } else {
        G.lastResult = `Tennen is drifting in and out. He gives you fragments — a wrong turn, a man he didn't recognize — but can't hold the thread. Come back tomorrow when the concussion clears.`;
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
        G.lastResult = `"Spoke to every staff member separately," the innkeeper says. "Different questions each time. I only put it together afterward — they were building a complete picture of everyone involved." Methodical social mapping. They have a profile of this investigation's participants already assembled.`;
      }

      G.lastResult += ` This person was here before you. They know what you're looking for.`;
      if (!G.rivalId) {
        if (arch === 'combat') G.rivalId = 'warden_captain';
        else if (arch === 'magic') G.rivalId = 'archivist_veld';
        else if (arch === 'stealth') G.rivalId = 'shadow_broker';
        else G.rivalId = 'provost_lenn';
      }
      addJournal('warning', 'Rival-adjacent operative confirmed investigating Sunspire convoy disruption ahead of you', `sunspire-rival-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  }
];
window.SUNSPIRE_HAVEN_STAGE1_ENRICHED_CHOICES = SUNSPIRE_HAVEN_STAGE1_ENRICHED_CHOICES;
