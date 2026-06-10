/**
 * SUNSPIRE HAVEN STAGE 1 ENRICHED MEANINGFUL CHOICES
 * 20 deeply grounded investigation paths tied to family syndicate control and resource isolation
 * Generated for: Fair exchange vs family obligation, communal good vs personal profit, syndicate weaponization and coercion
 * Each choice: 65-80 XP, grounded in family politics and resource networks, layered wrongness reveal
 */

var SUNSPIRE_HAVEN_STAGE1_ENRICHED_CHOICES = [
  // ========== NPC-GROUNDED CHAINS (8 CHOICES) ==========

  // 1. SYNDICATE YARD MASTER: CONVOY ROUTE CHANGES
  {
    plot: 'main',
    questId: 'q_s1_pattern',
    label: "The yard master signs off on routes he didn't write.",
    tags: ['Investigation', 'NPC', 'Syndicate', 'Logistics'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading convoy diversion patterns');
      G.stageProgress[1]++;

      const result = rollD20('charm', (G.skills.charm || 0));
      const target = 11 + Math.max(0, G.worldClocks.pressure);

      if (result.isCrit) {
        G.lastResult = `Corbek steps back from the manifest board and lowers his voice. He pulls a page from the stack and folds it once, the crease sharp, the way someone gives their hands something neutral to do. "Routes used to be optimized for access — fastest path, community depots first. Now instructions come from above the yard level. Certain supply lines are lengthened, delayed, or rerouted through external storage before reaching Sunspire's market." He sets the folded page back without unfolding it. "Convoys leaving this yard are moving through chokepoints someone else controls. What arrives and when isn't our decision anymore."`;
        G.stageProgress[1]++;
        addJournal('Yard master revealed route manipulation and supply filtering', 'evidence', `sunspire-yard-routes-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Corbek turns back to the manifest board before you've finished the question. "Convoy routing is family business. I don't take that outside." He doesn't argue, doesn't elaborate. By the time you reach the yard gate, two handlers have glanced at you in the particular way that means your name is already traveling through the supply chain alongside the morning's manifest. The pressure of that traveling name means the next yard gate will already know what was asked before you reach it.`;
        G.worldClocks.pressure++;
        addJournal('Yard master now wary of your inquiries', 'complication', `sunspire-yard-hostile-${G.dayCount}`);
      } else {
        G.lastResult = `"Routes have been updated," Corbek says, without quite committing to more. "Supply demands shift." He says it toward the manifest board rather than at you, already reaching for the next page in the stack, already elsewhere. The board behind him shows three depot notations scratched out and rewritten in the past ten days — not updated, corrected, the old ink still legible under the new. A convoy horn sounds from the eastern yard. Corbek doesn't look up.`;
        addJournal('Yard master confirmed convoy route modifications', 'evidence', `sunspire-yard-pressure-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    },
    failResult: {
      text: "Corbek turns back to the manifest board before you finish. The yard gate is open; the handlers near it are not. Your questions have moved faster than you did — two family names from the supply chain have already heard your description by the time you reach the waystation lane. The morning convoy is loading in the east yard. The routes recorded there are the only ones you'll read today.",
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  },

  // 2. FAMILY BROKER: OBLIGATION ENFORCEMENT
  {
    plot: 'main',
    questId: 'q_s1_converging',
    label: "Family obligations used to be mutual. Something changed who decides what the obligation means.",
    tags: ['Investigation', 'NPC', 'Family', 'Coercion'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering obligation weaponization');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0));

      if (result.isCrit) {
        G.lastResult = `Lysander chooses a corner of the market hall before he speaks. He checks behind him once — not a glance, a full turn — and sets both hands on the table. "Obligations are the structure of Sunspire — everyone knows this. What's changed is who decides what an obligation means. Families that push back on syndicate preferences get told their service obligations are being reviewed for increase. Families that comply get waivers and reductions. The registry of mutual duty now runs through syndicate preference." He doesn't call it by any larger name. He doesn't have to. The registry is a public document. This season's waivers and increases will be in the record.`;
        G.stageProgress[1]++;
        addJournal('Broker revealed obligation system weaponization', 'evidence', `sunspire-broker-obligations-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Lysander's expression settles into practiced neutrality. "Obligation systems are internal family matters. I don't take them outside." He doesn't raise his voice or show offense. But by the next morning, two family heads have heard that an outsider was asking about obligation enforcement. The family network moves faster than the wagon routes. The watchful speed of that spread means your questions are now tracked across the network before you've asked the second one.`;
        G.worldClocks.watchfulness++;
        addJournal('Family brokers warned about your inquiry', 'complication', `sunspire-broker-alert-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `Lysander grants you that, folding his hands on the table. "Obligations are being standardized — more uniformly enforced now." He doesn't volunteer why, or by whom, or what uniformity means for the families on the short end of it. The obligation board behind the registry desk has been repainted recently; the old chalk categories are still visible beneath the new coat in certain light — different headings, different columns. The categories changed, not just the names inside them.`;
        addJournal('Broker confirmed recent obligation system changes', 'evidence', `sunspire-broker-unclear-${G.dayCount}`);
      } else {
        G.lastResult = `"Obligation policy is internal family documentation." Lysander doesn't apologize for it. Without family standing in Sunspire's registry, he won't open the ledgers. The obligation records are visible on the shelf behind him — close enough to read the spine labels, not close enough to open without permission. Cold morning air comes through the narrow window above his desk. He returns his attention to the ledger already in front of him, the one that isn't yours to read.`;
        addJournal('Family obligations blocked without family access', 'evidence', `sunspire-broker-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    },
    failResult: {
      text: "Lysander folds his hands once and looks past you at the registry door. The obligation records stay on their shelf. Without family standing in Sunspire's registry, the system here doesn't open to questions from outside it — and the registry desk closes for meal break in ten minutes. The market square is accessible and the waystation board posts public notices through the afternoon.",
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  },

  // 3. HARVEST COORDINATOR: FOOD DISTRIBUTION CHANGES
  {
    label: "The grain register says scarcity. The grain depot says otherwise.",
    plot: 'main',
    tags: ['Investigation', 'NPC', 'Resources', 'Food'],
    condition: function() { return (G.investigationProgress||0) < 3; },
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading food distribution patterns');
      G.stageProgress[1]++;

      const result = rollD20('vigor', (G.skills.vigor || 0));

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
    },
    failResult: {
      text: "Mirrin pulls the allocation ledger close and finds something to write. The harvest hall has three staff within earshot and all three have gone quiet in that particular way. Word about distribution questions travels through Sunspire faster than the grain itself. The common room at the waystation unlocks after the midday bell — public space, no standing required, travelers moving in and out.",
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  },

  // 4. TEXTILE MERCHANT: TRADE PREFERENCE BIAS
  {
    label: "The same three family names top every premium listing for two months running.",
    plot: 'main',
    tags: ['Investigation', 'NPC', 'Commerce', 'Bias'],
    condition: function() { return (G.investigationProgress||0) >= 3 && (G.investigationProgress||0) < 6; },
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering trade preference bias');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0));

      if (result.isCrit) {
        G.lastResult = `Keldan steps away from his stall and speaks with his back to the market lane. "Premium material access, extended payment terms, favorable contract timelines — all of it now runs through syndicate family connections. The quality of the work doesn't matter. I've seen good craft turned away and inferior work given prime contract terms because of whose family name it came from." He keeps his voice level. "The market hasn't been disrupted. It's been redesigned."  `;
        G.stageProgress[1]++;
        addJournal('Merchant revealed systematic trade preference corruption', 'evidence', `sunspire-textile-bias-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Keldan's posture changes mid-sentence. "Why are you asking about contract distribution?" He doesn't wait for the answer. The conversation ends, and by the next market bell, two other merchants near the cloth stalls have received some version of your description and the nature of your questions. The attention that a distributed description carries is harder to step out of than a single closed door.`;
        G.worldClocks.isolation++;
        addJournal('Merchants now viewing you as a threat — description circulated at market bells', 'complication', `sunspire-textile-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Keldan acknowledges uneven distribution without naming its source. "Competitive positions vary across families." He straightens a bolt of cloth that didn't need straightening. The contract board on the market's east wall has three family names appearing in six of the last seven premium material listings. Wind off the high plain moves through the market lane. He picks up a second bolt and doesn't look at the board again.`;
        addJournal('Merchant confirmed trade opportunity inequality', 'evidence', `sunspire-textile-confirmed-${G.dayCount}`);
      } else {
        G.lastResult = `The grain contract boards running the crossroads entrance carry this season's listings, workshop syndicate marks pressed into the upper corner of every posted sheet. "Commercial arrangements are private matters between parties." Keldan says it toward his stall rather than at you, straightening a bolt of fabric that was already straight. The contract register behind the market administrator's counter requires merchant standing to access, and Keldan isn't offering to vouch for you — the offer never materializes, never gets close enough to be declined.`;
        addJournal('Trade preferences blocked without commercial access', 'evidence', `sunspire-textile-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    },
    failResult: {
      text: "Keldan has straightened that bolt of cloth once already. Commercial records in Sunspire's trade registry require merchant standing, and he's not offering to vouch for you — the offer doesn't come close enough to be declined. The market lane runs the length of the east wall. The contract board near the crossroads entrance posts this season's public listings without requiring any standing at all.",
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  },

  // 5. QUOTA KEEPER: PRODUCTION PRESSURE
  {
    label: "The quotas for certain families are set above what their resource allocation can reach.",
    plot: 'main',
    tags: ['Investigation', 'NPC', 'Production', 'Quotas'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading quota pressure patterns');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0));

      if (result.isCrit) {
        G.lastResult = `Neria sits with her hands on the quota ledger and doesn't open it. "The targets for certain families have been set at levels they can't reach with the resources they're allocated. When they fail — and they fail — they lose standing, resource access, community position." She opens the ledger to a comparison page she's already marked. "Families with syndicate alignment get targets calculated to their actual capacity, sometimes lower. It isn't variance. It's engineering."`;
        G.stageProgress[1]++;
        addJournal('Quota keeper revealed quota system weaponization', 'evidence', `sunspire-quota-pressure-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Neria closes the ledger and lifts her hand to flag the syndicate administrator across the room. "Production records aren't for outside review." The flagging is deliberate, visible, a message being sent in front of you rather than behind you. By the time you leave the quota hall, a report on your inquiry is already moving upward through the syndicate's coordination chain. The pressure of a report already in motion means the quota hall will be watched for you before the next bell.`;
        G.worldClocks.pressure++;
        addJournal('Syndicate alerted — quota inquiry report already moving up the coordination chain', 'complication', `sunspire-quota-alert-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `The targets have been adjusted in the past two cycles. Some families miss consistently — not by large margins, but always by enough to trigger a review. Other families hit their targets with room to spare. The resource allocations that accompany those targets don't explain the gap. The targets explain the gap. Neria stacks the ledger closed and turns away. The watchtower on the plain is visible through the high narrow window above the intake desk.`;
        addJournal('Quota records show signs of deliberate inequality', 'evidence', `sunspire-quota-altered-${G.dayCount}`);
      } else {
        G.lastResult = `The haven road runs past the quota hall's eastern wall, the watchtower on the plain visible through the narrow window above the intake desk. "Quota records are internal family documentation." Neria stacks the ledgers back against the wall before you can finish scanning the visible page — the motion practiced, the stack returned tight with spines facing inward. Without family standing in Sunspire's production registry, the numbers stay closed. She's done this before; the stack settles into position the way something lands in its usual place. She doesn't look at it again to check.`;
        addJournal('Quota information blocked without family access', 'evidence', `sunspire-quota-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    },
    failResult: {
      text: "Neria returns the ledger stack to the wall with both hands, spines inward. The quota hall's window faces the watchtower plain and the light coming through it doesn't reach the shelf. Production records in Sunspire require family registry standing to open — a requirement that routes through the same authority it protects. The outer passage is still accessible and the public posting board near the east entrance lists current work assignments.",
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  },

  // 6. CONVOY ORGANIZER: EXTERNAL COORDINATION
  {
    label: "Some convoys run on instructions not from the yard. She was told not to ask.",
    plot: 'main',
    tags: ['Investigation', 'NPC', 'Communication', 'External'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'tracing external communication');
      G.stageProgress[1]++;

      const result = rollD20('charm', (G.skills.charm || 0) + (G.skills.insight || 0) / 2);

      if (result.isCrit) {
        G.lastResult = `Tholen glances at the yard before speaking. "Some convoys get separate instructions — not from yard management, from a different source entirely. Encrypted messages, private couriers, destinations updated at departure without explanation." He keeps his voice down. "I was told clearly not to ask about these runs. They go out, they come back, the manifests don't match what left." He pauses. "These aren't trade convoys. They're carrying something the manifests aren't naming."`;
        G.stageProgress[1]++;
        addJournal('Convoy organizer revealed external coordination channels', 'evidence', `sunspire-convoy-external-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Tholen's expression shifts fast — not anger, something quieter and more concerned. "I don't have anything to tell you about that." He steps back, puts the manifest cart between you and him, and doesn't say another word. He's not refusing because he doesn't know. He's refusing because he does. The watchful fear in that refusal means whoever runs those non-standard convoys has already made the consequences of talking harder than the consequences of silence.`;
        G.worldClocks.watchfulness++;
        addJournal('Convoy organizer frightened by external coordination inquiry', 'complication', `sunspire-convoy-alert-${G.dayCount}`);
      } else {
        G.lastResult = `Tholen admits there are runs that get handled differently, eyes on the yard outside rather than on you. "Some convoys work outside the standard process. It's just how things go sometimes." He doesn't name which convoys, which standard, or whose authority governs the ones outside it. The departure log on his desk has three entries with the destination column left blank — not unfilled, left blank, the column present and the space deliberate.`;
        addJournal('Convoy organizer confirmed non-standard convoy operations', 'evidence', `sunspire-convoy-evasive-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    },
    failResult: {
      text: "Tholen steps behind the manifest cart and that's the end of it. He's not refusing because he doesn't know — the fear is in how quickly his hands found something else to do. The yard departure log is public through the main gate window, visible if not accessible. The waystation innkeeper has been watching convoy operations from the same corner table for years and doesn't stop travelers from sitting across from her.",
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  },

  // 7. FAMILY ELDER: DECISION AUTHORITY EROSION
  {
    label: "The elder still holds the title. The decisions stopped being his some time ago.",
    plot: 'main',
    tags: ['Investigation', 'NPC', 'Family', 'Authority'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering authority erosion');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0));

      if (result.isCrit) {
        G.lastResult = `Daven speaks without sitting down, hands behind his back. "Thirty years as an elder. My family brought decisions to me because I was the one who made them." He looks out toward the courtyard where two of his youngest grandchildren are working a job assignment he didn't authorize. "Syndicate directives arrive now with the weight of tradition. I'm told to implement them. When I've pushed back, I've been reminded that family standing depends on syndicate goodwill." He's steady, controlled, but the grief is in the word "reminded."  `;
        G.stageProgress[1]++;
        addJournal('Elder revealed systemic family authority erosion', 'evidence', `sunspire-elder-authority-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Daven stops you with a raised hand — not a warning, a statement. "Family governance is not open to outside discussion. You're not family." He says it without cruelty, the way a boundary is stated rather than enforced. Morning light falls through the courtyard entrance at a long angle. The conversation ends there. In the courtyard, two people who were watching from doorways have already moved back inside before the last word lands. They were listening for exactly this answer — and the scrutiny of that listening means the answer travels through the family before the courtyard empties.`;
        G.worldClocks.reverence++;
        addJournal('Family leadership banned you from authority questions', 'complication', `sunspire-elder-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Daven grants you a careful sentence. "Decision-making coordinates with the broader syndicate structure now." He doesn't say what was lost in that shift. The family governance board on the wall behind him has three new names in the advisory column that weren't there last season. Lamp oil, old stone, the faint smell of woodsmoke from the courtyard. He turns back toward the window and leaves the rest unspoken.`;
        addJournal('Elder confirmed family authority constraints', 'evidence', `sunspire-elder-confirmed-${G.dayCount}`);
      } else {
        G.lastResult = `"Family structure is internal." Daven closes the door to the governance room without explaining what's in it — the latch engages before you've formed a follow-up. Stone corridor, the smell of old wood and lamp oil, morning quiet. Without family standing in Sunspire's registry, no elder will open that door for you, and standing in Sunspire's registry requires the very authority the door protects. The frame is still warm from when someone recently pulled it shut.`;
        addJournal('Family governance blocked without family membership', 'evidence', `sunspire-elder-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    },
    failResult: {
      text: "Daven closes the governance room door before you find a follow-up. Stone corridor, lamp oil, morning quiet. Family standing in Sunspire's registry requires the very authority that door protects — a loop he doesn't bother to name. Two people who were watching from doorways in the courtyard have already stepped back inside. The outer courtyard is still open. The market square opens to all travelers through the north gate.",
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  },

  // 8. MARKET INSPECTOR: QUALITY ENFORCEMENT BIAS
  {
    label: "The inspector enforces standards on families who complain and waves through stalls that don't.",
    plot: 'main',
    tags: ['Investigation', 'NPC', 'Quality', 'Market'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering enforcement bias');
      G.stageProgress[1]++;

      const result = rollD20('spirit', (G.skills.spirit || 0) + (G.skills.insight || 0) / 2);

      if (result.isCrit) {
        G.lastResult = `Varen moves to the far end of the inspection table before speaking. "The quality standards exist. What I'm permitted to do with them depends on who I'm inspecting." He taps the enforcement log. "Syndicate-aligned stalls pass with deviations I'd shut down another trader for. Families that have raised objections at the council get intensive review — minor variance, goods removed, stall flagged." He holds the log shut. "I document what I'm told to enforce. I don't write the instructions."  `;
        G.stageProgress[1]++;
        addJournal('Inspector revealed selective quality enforcement system', 'evidence', `sunspire-inspector-bias-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Varen turns the log face-down. "Enforcement decisions aren't for outside discussion. It's sensitive to ongoing market proceedings." He's not hostile — just flat. Three other inspectors in the room have stopped moving. The market inspection department has been briefed to be careful, and Varen has just demonstrated he received that briefing. The attention of three stopped inspectors means the briefing covered what kind of questions to notice and who asks them.`;
        G.worldClocks.isolation++;
        addJournal('Market inspector refused further inquiry', 'complication', `sunspire-inspector-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Varen allows that much. "Enforcement has been applied with contextual flexibility recently." He doesn't define context. The enforcement log's open page shows two stall closures from the same family name in the past month — both for minor variance — and three clearances for a different family name that the standards would have caught. Cart wheels on the market lane outside. Varen reclaims the log and marks a notation that wasn't there before you arrived.`;
        addJournal('Inspector confirmed inconsistent enforcement practices', 'evidence', `sunspire-inspector-confirmed-${G.dayCount}`);
      } else {
        G.lastResult = `"Enforcement records are administrative." Varen closes the log and places it on the high shelf with both hands, out of casual reach. The market's midday noise carries through the stone arch — vendors calling measures, cart wheels on the lane. Without market authority in Sunspire's trade registry, the enforcement documents stay up there. He doesn't offer to retrieve them, doesn't acknowledge they could be retrieved. The distance between the shelf and the floor is the distance between you and that information.`;
        addJournal('Enforcement practices blocked without administrative access', 'evidence', `sunspire-inspector-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    },
    failResult: {
      text: "Varen places the enforcement log on the high shelf with both hands and leaves it there. The market's midday noise carries through the stone arch — vendors calling measures, cart wheels on the lane. Without market authority in Sunspire's trade registry, the enforcement records stay up there, out of casual reach. The market floor itself is open. Stall holders have eyes on the inspection patterns whether or not they're willing to describe them.",
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  },

  // ========== ARCHETYPE DEEP DIVES (8 CHOICES) ==========

  // 9. FAMILY STRUCTURE TIER 1: SYNDICATE INTEGRATION ANALYSIS
  {
    label: "The work assignments have been pulling family members apart, systematically, for two cycles.",
    plot: 'main',
    tags: ['Investigation', 'Family', 'Structure', 'Organization'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'family structure analysis');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0));

      if (result.isCrit) {
        G.lastResult = `The work assignment records, cross-referenced against the family registry, show a clear pattern. Children from families that have raised syndicate objections are placed in assignments at locations separate from their households — not punishingly distant, just far enough. Families aligned with syndicate leadership are clustered, given shared housing and coordinated resource access. Multi-generational households that traditionally provided their members with stability and collective standing are being dispersed into smaller units with individual dependencies. The family structure is being redrawn around syndicate favor.`;
        G.stageProgress[1]++;
        addJournal('Family analysis revealed systematic family restructuring', 'evidence', `sunspire-family-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `A syndicate administrator intercepts you at the registry desk before you can finish pulling the second volume. The question is mild; the stillness around it isn't. "What is the purpose of this inquiry?" Your answer goes into a log. By the time you leave the registry hall, the family structure records are behind a locked cabinet they weren't in before. The watchful speed of that relocking means your registry visit was noticed and escalated before you reached the street.`;
        G.worldClocks.watchfulness++;
        addJournal('Syndicate leadership alerted to family structure analysis', 'complication', `sunspire-family-alert-${G.dayCount}`);
      } else {
        G.lastResult = `The work assignment records show movement — families shifted across production zones, membership lists updated. The cross-reference to the family registry shows the changes cluster around the past two cycles. Whether the pattern is administrative reorganization or something more deliberate requires a longer comparison window than the registry's open hours allow today. The registry desk clerk keeps glancing toward the door. The second volume of the assignment ledger is gone from its shelf.`;
        addJournal('Family structure modifications detected', 'evidence', `sunspire-family-modified-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    },
    failResult: {
      text: "The registry desk flags your second volume request and the family structure records go behind a locked cabinet before you finish the column. Sunspire's work assignment data is internal documentation — open hours at the registry run until the afternoon bell, but access requires family standing the desk clerk can't grant. The work assignment board near the yard entrance posts current placements publicly, names and locations visible without authorization.",
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  },

  // 10. RESOURCE CONTROL TIER 2: SCARCITY ENGINEERING
  {
    label: "More food comes in than goes out to households. The gap is going somewhere.",
    plot: 'main',
    tags: ['Investigation', 'Resources', 'Scarcity', 'Control'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'scarcity engineering documentation');
      G.stageProgress[1]++;

      const result = rollD20('vigor', (G.skills.vigor || 0));

      if (result.isCrit) {
        G.lastResult = `The resource system reveals deliberate engineering of scarcity. Harvests are diverted before reaching community storage. Food that could be distributed for subsistence is instead warehoused to create artificial shortages. Families dependent on market access for grain are increasingly forced to rely on syndicate-controlled rationing. Tools and materials are allocated through syndicate channels rather than through traditional family networks. Artificial scarcity is being weaponized — communities face enough shortage to require dependence while avoiding starvation that would provoke resistance.`;
        G.stageProgress[1]++;
        addJournal('Resource analysis revealed engineered scarcity system', 'evidence', `sunspire-resources-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `A syndicate coordinator steps between you and the harvest ledger before you can finish the column comparison. The warning arrives as a statement, not a threat: continued inquiry into resource management will result in removal from the haven's work access registry. The ledger closes. The numbers you were almost done reading disappear behind it. The pressure of a formal registry removal threat means this line of inquiry is now harder to pursue without consequence.`;
        G.worldClocks.pressure++;
        addJournal('Syndicate directly warned about resource scarcity inquiry', 'complication', `sunspire-resources-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The harvest ledger and the distribution record don't agree — supply levels at the storage depot run significantly ahead of what the distribution columns show leaving. The gap isn't rounding error. Something between the harvest and the household is pulling volume sideways. The column you need to find it is in the locked section of the ledger. The thread points the same direction it has been pointing. The storage yard sits in thin morning light beyond the hall window, quiet in a way that a full depot shouldn't be.`;
        addJournal('Resource diversion pattern confirmed', 'evidence', `sunspire-resources-partial-${G.dayCount}`);
      } else {
        G.lastResult = `The grain store logs and the distribution records are both present and legible. Cross-referencing them to find a deliberate diversion requires the harvest intake reports from the same period — those live in the yard master's office, behind a door that requires family standing to open. Without the intake baseline, the gap you suspect stays invisible in the math. Cold light off the high plain comes through the depot window. The numbers are there. The meaning of the numbers isn't.`;
        addJournal('Resource scarcity proof incomplete without full data access', 'evidence', `sunspire-resources-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    },
    failResult: {
      text: "The harvest intake records are in the yard master's office behind a door requiring family standing. Without the intake baseline, the gap between what arrives and what's distributed stays invisible in the math — the discrepancy is present but can't be characterized. The grain store distribution column is still open on the hall desk. The yard exterior is accessible; convoy weight checks happen at the gate in plain view.",
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  },

  // 11. INFORMATION ISOLATION TIER 1: EXTERNAL NEWS FILTERING
  {
    label: "The message board is thinner than it should be. A traveler stopped mid-story.",
    plot: 'main',
    tags: ['Investigation', 'Information', 'Isolation', 'Communication'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'information isolation analysis');
      G.stageProgress[1]++;

      const result = rollD20('finesse', (G.skills.finesse || 0));

      if (result.isCrit) {
        G.lastResult = `Information reaching Sunspire Haven from outside is being deliberately filtered. Stories about other localities' labor unrest, trade disruptions, or similar patterns are suppressed. Messages that might inspire collective resistance are intercepted before distribution. Travelers are questioned about what they've discussed with community members. The community is being information-isolated — cut off from perspective that they're part of a larger pattern, prevented from learning that other localities face similar manipulation.`;
        G.stageProgress[1]++;
        addJournal('Information analysis revealed systematic news filtering', 'evidence', `sunspire-information-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Two syndicate monitors find you at the message-posting board before your second circuit of the market lane. One asks what you're comparing; the other writes the answer down without waiting for it. The conversation that follows is brief and formal. The board is still accessible afterward. But a new name appears on the duty log beside the posting station — yours, with today's date. The watchful entry in that duty log means every board station in the market will receive notice before tomorrow's posting.`;
        G.worldClocks.watchfulness++;
        addJournal('Syndicate monitoring alerted to information flow tracking', 'complication', `sunspire-information-alert-${G.dayCount}`);
      } else {
        G.lastResult = `The message board at the market's east wall has gaps in it — postings from external couriers that should arrive weekly are running thin. A traveler from the northern road mentions a labor dispute in a neighboring haven, then looks uncertain, as if expecting a reaction to the subject itself. The story didn't stop moving; the path it travels on has been narrowed.`;
        addJournal('Information filtering modifications detected', 'evidence', `sunspire-information-partial-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    },
    failResult: {
      text: "The syndicate monitors write your name in the duty log beside the posting station with today's date. The message board stays accessible — the postings are still up, the gaps still visible. But a second pass at this board today will draw the same attention. Travelers moving through the waystation common room carry news from the outside roads without needing to post anything. The common room opens to all arriving travelers.",
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  },

  // 12. COERCION SYSTEM TIER 2: THREAT MAPPING
  {
    label: "That's not variance — it's a forced choice. Say so directly.",
    plot: 'main',
    tags: ['Investigation', 'Coercion', 'Threats', 'Fear'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'coercion apparatus documentation');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0));

      if (result.isCrit) {
        G.lastResult = `A pattern of threats emerges. Families who question syndicate decisions face resource allocation reductions. Families who speak publicly about manipulation face social isolation and removal from communal events. Families who attempt to organize resistance face threats to family members' employment and housing. Children of resistant families are directed to dangerous work assignments. The threats are calibrated — severe enough to enforce compliance, but maintained at levels that prevent open resistance. Coercion has become the hidden infrastructure of syndicate control.`;
        G.stageProgress[1]++;
        addJournal('Coercion analysis mapped systematic threat apparatus', 'evidence', `sunspire-coercion-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `A message arrives at the waystation before you return to it — unsigned, hand-delivered, one sentence. Continued documentation of family difficulties in Sunspire Haven will result in removal from the haven's access registry. The wording is administrative. The speed of delivery is not. Whoever wrote it knew where you'd been asking and got ahead of you before you finished. The pressure of a message that arrived before you did means you are tracked more closely than you tracked the evidence.`;
        G.worldClocks.pressure += 2;
        addJournal('Inquiry drawing direct coercion consequences', 'complication', `sunspire-coercion-caught-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Two families decline to answer in the same way — not evasively, but with a particular practiced brevity that has been rehearsed. A third family's eldest keeps glancing at the syndicate administrator's window across the market lane. The threats aren't visible in what people say. They're visible in the distance people keep between themselves and the subject when anyone else might be watching. Wind comes off the high plain and moves through the open market. Everyone continues working.`;
        addJournal('Family intimidation confirmed through behavioral patterns', 'evidence', `sunspire-coercion-confirmed-${G.dayCount}`);
      } else {
        G.lastResult = `The families you speak with are careful and consistent. None will describe specific threats or pressure, and the conversations don't stay open long enough to reach that territory. The wariness is present — visible in how quickly topics close — but the mechanism producing it stays on the other side of every door you approach today. Wind moves through the market lane. The stall holders return to their work the moment the conversation ends.`;
        addJournal('Coercion suspected but specific mechanisms not documented', 'evidence', `sunspire-coercion-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    },
    failResult: {
      text: "The families here are careful and the conversations close fast — the wariness is real, but the mechanism behind it won't surface in a single pass. Each door opened today leads to a practiced brevity rehearsed across multiple interactions. The market square at midday shows the pattern in behavior rather than in what anyone says. Observation costs nothing and the square stays open until the evening bell.",
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  },

  // 13. EXTERNAL FLOWS TIER 1: RESOURCE EXTRACTION
  {
    label: "Three convoys carry more than their manifests show. Destinations point north past any trade route.",
    plot: 'main',
    tags: ['Investigation', 'Resources', 'Flow', 'Extraction'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'resource extraction tracking');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0));

      if (result.isCrit) {
        G.lastResult = `Resources that should sustain Sunspire Haven are being systematically extracted. Food beyond basic rations is being moved to external storage and destinations. Tools and materials are being diverted to external interests. Family craftwork is being accumulated in external warehouses. Sunspire Haven is being treated as a production facility rather than a community — resources are extracted after basic subsistence allowances are provided. The community is being economically hollowed out.`;
        G.stageProgress[1]++;
        addJournal('Resource flow analysis revealed systematic extraction', 'evidence', `sunspire-extraction-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `A syndicate coordinator is waiting at the yard gate when you come back from the second waystation. The questions are procedural — purpose of visit, who authorized access — but the log they're writing in has your name already at the top, entered before the conversation began. The outbound manifests return to the locked cabinet inside. Whatever the next column shows, it won't be visible from this side of the gate. You are tracked by a log that was open and waiting — someone knew the waystation route before you walked it.`;
        G.worldClocks.watchfulness++;
        addJournal('Syndicate extraction operations alerted to tracking', 'complication', `sunspire-extraction-alert-${G.dayCount}`);
      } else {
        G.lastResult = `Three outbound convoys in the past two weeks show cargo weights that exceed what the manifest items would account for. The destination codes point north — past the standard trade route termini. What's going with those convoys isn't in the paperwork, and the paperwork isn't complete enough to make the absence look like error. Someone is moving something through channels they've made deliberately thin to read.`;
        addJournal('Resource extraction modifications detected', 'evidence', `sunspire-extraction-partial-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    },
    failResult: {
      text: "The syndicate coordinator is already at the yard gate with your name in a log started before the conversation. The outbound manifests return to the locked cabinet and the gate closes to further review. The filed convoy routes are still posted on the public departure board at the waystation — destinations and departure times visible, the manifest totals recorded at the base of each posting by the handler on duty.",
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  },

  // 14. COMMUNITY COHESION TIER 2: SOCIAL FRAGMENTATION
  {
    label: "The communal fire is the right size for a dozen. Four sit around it.",
    plot: 'main',
    tags: ['Investigation', 'Community', 'Bonds', 'Fragmentation'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'community fragmentation documentation');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0));

      if (result.isCrit) {
        G.lastResult = `Community bonds that once held Sunspire Haven together are being deliberately fractured. Families that traditionally cooperated are now in competition for syndicate-controlled resources. Mutual aid networks are being disrupted through resource control. Shared celebrations and gathering events are being limited or canceled. Young people are isolated from elders through separate work assignments. The social infrastructure that enabled collective action is being systematically destroyed. What's replacing it is individual family desperation and dependence on syndicate favor.`;
        G.stageProgress[1]++;
        addJournal('Community analysis revealed systematic social fragmentation', 'evidence', `sunspire-community-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `By midday three people have changed their route to avoid walking near you at the communal meal area. One picks up her bowl and finishes eating beside the storage wall instead of at the table. Word precedes you here — whatever you've been asking, its subject travels faster than you do. The community isn't hostile. It's careful, and careful has a specific shape in Sunspire. The attention of a community that has already rerouted around you means the communal spaces here are now harder to use as a way in.`;
        G.worldClocks.isolation++;
        addJournal('Community members avoiding you due to fear of scrutiny', 'complication', `sunspire-community-caught-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The market square at midday is quieter than the posted gathering schedule would produce. Families cluster near their own stalls rather than crossing to others. The shared cooking fire at the commons has four people around it instead of the dozen that a fire that size would normally draw. The social infrastructure is intact — tables, fire, square — and the people are staying out of it. The smell of woodsmoke and thin air off the elevation. No one is moving to fill the space the fire was built for.`;
        addJournal('Community fragmentation confirmed through behavioral observation', 'evidence', `sunspire-community-confirmed-${G.dayCount}`);
      } else {
        G.lastResult = `Sunspire's communal structures are all present and maintained. The market runs. The meal fires burn. Whether the bonds between families that once ran through those structures are still intact requires conversations that go deeper than a single pass through the square — and the families here don't open quickly to strangers, even in easier times. Thin air, woodsmoke, the sound of the wind off the elevation above. The square holds its shape. The people inside it hold their distance.`;
        addJournal('Community fragmentation suspected but incompletely documented', 'evidence', `sunspire-community-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    },
    failResult: {
      text: "Three people have changed their route to avoid the communal meal area by midday. Word about your questions travels through Sunspire faster than you do — whatever is being asked, its subject moves ahead of it. The communal square itself stays open; the fire is lit through evening. Sitting near it without asking anything is not the same as asking. The pattern visible in who gathers, and who doesn't, is its own record.",
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  },

  // 15. FAMILY FRAGMENTATION TIER 1: KINSHIP BREAKDOWN
  {
    label: "The work assignments keep landing members of the same family in locations days apart. Consistently.",
    plot: 'main',
    tags: ['Investigation', 'Family', 'Bonds', 'Fragmentation'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'family fragmentation mapping');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0));

      if (result.isCrit) {
        G.lastResult = `Family bonds are being systematically severed. Children are separated from parents through work assignments to distant locations. Extended families that traditionally lived and worked together are being parceled into separate housing. Couples are assigned to different production cycles. Multi-generational families are losing their cohesion. Attempts to maintain family connections are viewed as suspicious loyalty questions. The primary tool of control — the family unit — is being deliberately fractured to prevent collective resistance. Families as economic and social units have been weaponized against themselves.`;
        G.stageProgress[1]++;
        addJournal('Family analysis revealed systematic kinship destruction', 'evidence', `sunspire-fragmentation-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `A syndicate administrator finds you at the work assignment board before you've finished the second column. The prohibition arrives in procedural language: documenting family placement details without registry authorization is a compliance matter. The board is still public, the names still visible. But the administrator stays nearby until you step away, and a note goes into the day log. The pressure of a day-log notation means the board is now watched for you specifically — every return visit will be timed and recorded.`;
        G.worldClocks.pressure++;
        addJournal('Syndicate prohibited further family fragmentation analysis', 'complication', `sunspire-fragmentation-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The work assignment board shows a pattern across three posting cycles: members of the same family unit landing in locations that put days of travel between them. It could be routine labor rotation. It's consistent enough — across multiple families, across multiple cycles — that routine doesn't hold as an explanation. Someone is making placement decisions that produce a specific result without appearing to be trying to. The board is posted in a stone archway at the yard entrance, exposed to the wind.`;
        addJournal('Family fragmentation and separation patterns confirmed', 'evidence', `sunspire-fragmentation-confirmed-${G.dayCount}`);
      } else {
        G.lastResult = `Family separation is visible in the housing blocks if you know what to look for — elderly members in outer residential zones, working-age family in production housing, children in communal care blocks. Whether that's a coordinated displacement or a function of how work assignment naturally distributes depends on the assignment records, which require family standing to open. The housing block at the outer edge faces the watchtower plain. Smoke rises from only one chimney.`;
        addJournal('Family fragmentation analysis incomplete without assignment data', 'evidence', `sunspire-fragmentation-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    },
    failResult: {
      text: "The syndicate administrator finds you at the work assignment board before you finish the second column and enters your name in the day log. The board stays public, the names and locations still legible on the face of each posting. Cross-referencing across multiple family units requires a longer window than today's access allows. The housing blocks at the outer residential zone are accessible to travelers passing through — the separation visible in plain geography.",
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  },

  // 16. CONSENT FICTION TIER 2: MANUFACTURED ACCEPTANCE
  {
    label: "Every council vote unanimous. No abstentions. No dissent. Not once.",
    plot: 'main',
    tags: ['Investigation', 'Coercion', 'Consent', 'Fiction'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'manufactured consent structure analysis');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0));

      if (result.isCrit) {
        G.lastResult = `The system maintains a fiction of voluntary participation. Communities are told they've "agreed" to resource distributions and family obligations. Families are told they've "accepted" their roles in production quotas. The syndicate maintains the appearance that the community is consenting to the system. In reality, families that resist face threats, exclusion, and starvation. The consent is manufactured through coercion disguised as voluntary choice. The system is designed to break resistance while maintaining the appearance that the community has accepted its own subjugation.`;
        G.stageProgress[1]++;
        addJournal('Consent analysis revealed manufactured acceptance apparatus', 'evidence', `sunspire-consent-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `A syndicate communication officer arrives at the communal hall before you finish the morning session. The language is measured: questions about community participation frameworks are sensitive matters affecting social cohesion. The warning is logged. So, now, is your presence in the communal hall during governance hours. The session ends by being formally closed around you. The watchful machinery that produced a communication officer before the morning session ended means governance hours here are monitored in real time.`;
        G.worldClocks.watchfulness++;
        addJournal('Syndicate aware of consent apparatus analysis', 'complication', `sunspire-consent-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The council minutes show unanimous agreement on the last three major resource decisions. No recorded dissent, no abstentions. For decisions of this scope — distribution changes, quota revisions, housing reallocations — that uniformity is unusual. Either the community is genuinely aligned, or the disagreement happened before the record was made. The minutes don't show which. The communal hall sits cold in the high-elevation afternoon, the stone walls carrying the chill of a building that hasn't been crowded today.`;
        addJournal('Coerced consent structure confirmed', 'evidence', `sunspire-consent-confirmed-${G.dayCount}`);
      } else {
        G.lastResult = `Community members describe the quota and distribution decisions as things they agreed to. The phrasing is consistent — "the family accepted the terms," "we came to an arrangement" — but what the alternative was, if one existed, nobody will say. The consent is documented. The conditions that produced it are not in the same record. Lamp oil and cold stone. Outside, the high-plain wind pushes through the gap between the hall's outer door and its frame.`;
        addJournal('Manufactured consent analysis incomplete without threat documentation', 'evidence', `sunspire-consent-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    },
    failResult: {
      text: "The syndicate communication officer closes the communal hall session around you, formally and without haste. The governance minutes remain on file — their record of unanimous votes is still legible to anyone who knows what unanimous on every major decision actually means. The market square is open and the families moving through it carry the same practiced phrasing in their descriptions of what they've accepted. That phrasing is its own evidence.",
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  },

  // ========== GOSSIP & TENSION LAYERS (4 CHOICES) ==========

  // 17. STREET RUMOR: FAMILY WHISPERS
  {
    label: "The same story at both ends of the market, told quietly. Nobody is coordinating it.",
    plot: 'main',
    tags: ['Investigation', 'Rumor', 'Family', 'Gossip'],
    xpReward: 65,
    stageProgress: 1,
    failResult: function() {
      addNarration('', 'Cart wheels and counting-shed talk move past in the market heart. A syndicate clerk taps the quota stamp against her station once and looks elsewhere. You step out of the yard line before the seal goes down on anything that names you.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
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
    plot: 'main',
    tags: ['Investigation', 'Evidence', 'Proof', 'Coordination', 'Exposure'],
    xpReward: 80,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(80, 'exposing syndicate conspiracy');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0));

      if (result.isCrit) {
        G.lastResult = `You piece together the evidence: resource accounting showing more harvested food diverted than distributed. Records showing families allocated less than subsistence levels while syndicate leadership stores surplus. Communications showing syndicate coordination with external parties about resource extraction. Work records showing families directed to production far beyond their own needs. Family obligation records showing systematic targeting of resistant families. The documentation is clear: the syndicate is deliberately extracting resources from Sunspire Haven and sending them externally while maintaining community dependence through artificial scarcity. The wrongness has architectural documentation.`;
        G.stageProgress[1]++;
        addJournal('Syndicate extraction conspiracy documented with proof', 'evidence', `sunspire-proof-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The compilation is noticed before it's finished. A syndicate coordinator arrives at the waystation before you've returned — not running, moving at the deliberate pace of someone who doesn't need to rush. The warning is delivered in administrative language: continued documentation of resource management will result in removal from Sunspire Haven's access registry. The phrasing is procedural. The speed of arrival is not. Your name is already in the syndicate's notation before you've left the room. The scrutiny of a notation entered before you returned means the compilation process itself was tracked, piece by piece.`;
        G.worldClocks.pressure++;
        addJournal('Syndicate directly warned about control system exposure', 'complication', `sunspire-proof-caught-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `The evidence assembled is substantial: discrepancies between harvest volumes and distribution totals, convoy manifests with unexplained cargo weights, external shipments routed past standard trade termini. Together they suggest deliberate resource extraction through syndicate channels. Compelling but not conclusive — proof of coordination requires comparing local accounting against the external destination records, which aren't accessible from inside Sunspire Haven. The gap between suggestion and proof is one set of records wide.`;
        addJournal('Syndicate extraction strongly suggested by evidence', 'evidence', `sunspire-proof-partial-${G.dayCount}`);
      } else {
        G.lastResult = `The resource records exist and are legible — harvest intakes, distribution columns, convoy departures. What they can't show on their own is whether the discrepancies are extraction or error. Proving deliberate extraction requires comparing local accounting against external destination records: what arrives where, under whose name, on what dates. Those records aren't in Sunspire Haven. They're wherever the convoys end up, and that address isn't on any manifest currently available.`;
        addJournal('Syndicate proof incomplete without external coordination records', 'evidence', `sunspire-proof-incomplete-${G.dayCount}`);
      }

      addHeat('zootia', 1);
      G.rivals = G.rivals || {}; G.rivals.heat = (G.rivals.heat || 0) + 1;
      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    },
    failResult: {
      text: "The syndicate coordinator arrives at the waystation before you return, moving at the pace of someone who doesn't need to hurry. The warning is delivered in administrative language and your name enters the syndicate's notation before you've left the room. The resource records are still in the hall — the discrepancies visible in what's accessible without the external comparison data. That comparison requires records from wherever the convoys end up, which is not Sunspire Haven.",
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  },

  // 17. MORAL PRESSURE: FAMILY COMPLICITY CHOICE
  {
    label: "The family leader cooperated. The question is whether they had any other choice.",
    plot: 'main',
    tags: ['Investigation', 'Moral', 'Choice', 'Pressure', 'Confrontation'],
    xpReward: 70,
    stageProgress: 1,
    failResult: function() {
      addNarration('', 'Cart wheels and counting-shed talk move past in the market heart. A syndicate clerk taps the quota stamp against her station once and looks elsewhere. You step out of the yard line before the seal goes down on anything that names you.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
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

      G.lastResult = `${npc.name} doesn't wait for the second question. The first one breaks the silence they've been keeping. "${npc.fear}." They're not asking for anything — no absolution, no assurance. Their hands stay flat on the table. The fear is specific and old enough to have a shape. Whatever comes next is no longer entirely their decision. Outside, the watchtower on the plain catches the last light of the afternoon. Neither of you looks at it.`;

      if (!G.flags) G.flags = {};
      G.flags.stage1_evidence_decision = 'pending';
      G.flags.stage1_moral_npc = npc.name;

      addJournal(`Confronted ${npc.name} (${npc.role}) about syndicate extraction participation`, 'complication', `sunspire-moral-${G.dayCount}`);
      addHeat('zootia', 1);

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 18. DISCOVERY MOMENT: EXTERNAL COORDINATION SOURCE
  {
    plot: 'main',
    questId: 'q_s1_close',
    label: "The syndicate takes orders from someone outside Sunspire. The courier receipts came from somewhere north.",
    tags: ['Investigation', 'Origin', 'Discovery', 'Climax'],
    xpReward: 80,
    stageProgress: 1,
    failResult: function() {
      addNarration('', 'Cart wheels and counting-shed talk move past in the market heart. A syndicate clerk taps the quota stamp against her station once and looks elsewhere. You step out of the yard line before the seal goes down on anything that names you.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(80, 'discovering origin source of extraction');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0));

      if (result.isCrit) {
        G.lastResult = `Behind the diverted resources and artificial scarcity, you find the thread that leads outside Sunspire Haven. Courier receipts from northern territories with instructions to maximize resource extraction and minimize community distribution. Financial transfers paying the syndicate leadership for cooperation. Orders for "family atomization protocols" designed to prevent collective resistance. Sunspire Haven's community is being systematically harvested by external interests using the syndicate as a management apparatus. Someone in the northern territories — or someone allied with them — is coordinating the resource extraction and social destruction. The conspiracy is coordinated, resourced, and external.`;
        G.stageProgress[1]++;
        addJournal('Origin source of Sunspire Haven extraction identified as external coordination', 'discovery', `sunspire-origin-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `As you approach the evidence of external coordination, you're intercepted. Someone stops you directly and makes it clear that pursuing this further will result in your removal from Sunspire Haven or worse. You've discovered pieces, but the full external coordination remains hidden — and now you're marked as a direct threat. The pressure of that marking travels ahead of you to every contact point remaining in Sunspire.`;
        G.worldClocks.pressure += 2;
        addJournal('Inquiry interrupted by external coordination operators', 'complication', `sunspire-origin-caught-${G.dayCount}`);
      } else if (result.total >= 14) {
        G.lastResult = `The evidence points beyond Sunspire Haven. Courier routes reference "northern resource authorities." Extraction orders show external signature. The conspiracy is larger than the community itself. You don't know the exact source yet, but you know the resource extraction is being directed from outside Sunspire Haven's borders. The courier receipts carry a stamp from a northern district that no local family would have dealings with. Someone far from here has been writing to this community's syndicate for longer than the pattern suggests.`;
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
    label: "The sealed container is heavier than its size. The interior lining isn't trade-grade.",
    tags: ['Investigation', 'Evidence', 'Stage1'],
    xpReward: 74,
    failResult: function() {
      addNarration('', 'Cart wheels and counting-shed talk move past in the market heart. A syndicate clerk taps the quota stamp against her station once and looks elsewhere. You step out of the yard line before the seal goes down on anything that names you.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'analyzing signal-damping container');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('wits', (G.skills.wits || 0));
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
    label: "Filed route and actual route don't match. The detour avoided the only Warden checkpoint.",
    tags: ['Investigation', 'Evidence', 'Stage1'],
    xpReward: 70,
    failResult: function() {
      addNarration('', 'Cart wheels and counting-shed talk move past in the market heart. A syndicate clerk taps the quota stamp against her station once and looks elsewhere. You step out of the yard line before the seal goes down on anything that names you.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'mapping convoy route deviation');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      G.lastResult = `Filed route: eastern trade road, standard checkpoint stops. Actual route: a two-hour deviation northwest, avoiding the Roadwardens Order post at Milegate. The convoy wasn't disrupted on its filed path — it was disrupted on a detour that was never formally logged. Whoever organized this knew the route, arranged the deviation, and arranged the interception at a point where no Roadwardens checkpoint would have record of the convoy passing.`;
      if (!G.flags) G.flags = {};
      G.flags.found_convoy_route_deviation = true;
      addJournal('Convoy route deviation: off-record detour avoided Roadwardens checkpoint at Milegate', 'evidence', `sunspire-route-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 23. ARCHETYPE-GATED: READING THE AFTERMATH
  {
    label: "The formal report describes a raid. The site tells a different story.",
    tags: ['Investigation', 'Archetype', 'Stage1'],
    xpReward: 70,
    failResult: function() {
      addNarration('', 'Cart wheels and counting-shed talk move past in the market heart. A syndicate clerk taps the quota stamp against her station once and looks elsewhere. You step out of the yard line before the seal goes down on anything that names you.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'reading disruption site');
      const arch = G.archetype && G.archetype.group;

      if (arch === 'combat') {
        G.lastResult = `The positions of the guards when they fell tell you this wasn't a surprise attack — they were already moving into defensive formation when the interception happened. They knew something was wrong before the interception began. The convoy security was compromised from inside. Someone on the convoy itself signaled the moment. Boot impressions in the thin soil at the site's edge show weight distribution from a standing position, not a running one. Whoever gave the signal waited until the last possible moment.`;
      } else if (arch === 'magic') {
        G.lastResult = `Residue on the ground near the container position suggests the damping material had been activated before the convoy stopped. The container was already shielded before the disruption happened. This wasn't an ambush on a moving target — it was a scheduled handoff staged to look like a hijacking. The residue pattern is concentrated in a ring roughly half a meter across — the container was held stationary here for several minutes before the transfer. Someone gave the order to activate and waited for the confirmation.`;
      } else if (arch === 'stealth') {
        G.lastResult = `The site has been cleaned. Not badly — it looks natural — but too natural. Wheel ruts that should be there aren't. The ground is even where a heavy container would have been dragged. Someone came back after the disruption and removed traces. Professional scene-clearing, done in daylight. The wind off the high plain has been blowing since morning, but it doesn't blow smooth a drag path — something with a flat edge worked this ground before it dried.`;
      } else {
        G.lastResult = `Two supply crates are still at the site, undisturbed. The disruption was selective — the sealed container was taken; everything else was left. This wasn't a raid on the convoy. It was retrieval of one specific item. The rest of the cargo was never the point. Dry grass at the site margin, thin elevation soil, the watchtower visible on the horizon. Someone knew exactly what they were coming for and left everything else precisely where they found it.`;
      }
      addJournal('Convoy disruption site: selective retrieval confirmed, scene-cleared, inside source suspected', 'evidence', `sunspire-site-read-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 24. FACTION SEED: WARDEN ORDER CONTACT
  {
    label: "The Roadwardens post at the north gate. Either they know already, or they need to.",
    tags: ['Faction', 'NPC', 'Stage1'],
    xpReward: 68,
    failResult: function() {
      addNarration('', 'Cart wheels and counting-shed talk move past in the market heart. A syndicate clerk taps the quota stamp against her station once and looks elsewhere. You step out of the yard line before the seal goes down on anything that names you.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'making Roadwardens Order contact');
      if (!G.factionHostility) G.factionHostility = { warden_order: 0, iron_compact: 0, oversight_collegium: 0 };

      const result = rollD20('charm', (G.skills.charm || 0));
      if (result.total >= 12) {
        G.lastResult = `Captain-Adjutant Sera receives your report with calibrated attention. She asks three clarifying questions — all about the container, none about the disruption itself. "We're aware of the deviation category," she says finally. "What you've added is the Milegate confirmation." She gives you a reference number and tells you an inquiry is open. She doesn't tell you what the inquiry is about. The Roadwardens Order knows more than they're sharing.`;
        if (!G.flags) G.flags = {};
        G.flags.met_warden_order_sunspire = true;
        G.factionHostility.warden_order += 1;
        addJournal('Roadwardens Order Captain-Adjutant Sera: confirmed awareness of container category, open inquiry exists', 'intelligence', `sunspire-warden-${G.dayCount}`);
      } else {
        G.lastResult = `The duty officer takes your report by rote — pen moving before you've finished the second sentence, form already half-filled. It goes into a stack of similar forms on the corner of the desk. No follow-up is offered; no timeframe for review is mentioned. The north gate is cold and bright with morning sun off the spire stone. Either the Roadwardens Order has no interest in this convoy's deviation, or someone has already told them not to develop one. The form disappears into the stack without ceremony.`;
        if (!G.flags) G.flags = {};
        G.flags.attempted_warden_order_sunspire = true;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 25. ATMOSPHERE: THE SIGNAL TOWER
  {
    label: "Between the second and third signal light, a half-beat pause that isn't in the protocol.",
    tags: ['WorldColor', 'Lore', 'Stage1'],
    xpReward: 53,
    failResult: function() {
      addNarration('', 'Cart wheels and counting-shed talk move past in the market heart. A syndicate clerk taps the quota stamp against her station once and looks elsewhere. You step out of the yard line before the seal goes down on anything that names you.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
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
    label: "The container gets catalogued and locked today. The craftmark needs recording before that happens.",
    tags: ['PersonalArc', 'Evidence', 'Stage1'],
    xpReward: 62,
    failResult: function() {
      addNarration('', 'Cart wheels and counting-shed talk move past in the market heart. A syndicate clerk taps the quota stamp against her station once and looks elsewhere. You step out of the yard line before the seal goes down on anything that names you.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(62, 'documenting container specifications');
      if (!G.flags) G.flags = {};

      const result = rollD20('spirit', (G.skills.spirit || 0));
      if (result.total >= 10) {
        G.lastResult = `Your sketch captures dimensions, material layering, and the craftmark precisely — enough that a fabricator could identify the manufacture source from the drawing alone. You copy it twice and cache the second in your personal kit. Whatever happens to the physical container, you have its record. Cold morning air, the smell of charcoal and lamp oil from the adjacent storeroom. The container will be locked inside before the afternoon bell. The drawing won't be.`;
        G.flags.container_documentation = true;
        addJournal('Container documentation completed and secured — craftmark recorded for later identification', 'evidence', `sunspire-document-${G.dayCount}`);
      } else {
        G.lastResult = `The sketch captures dimensions and general construction — the layered wall depth, the weight distribution, the composite interior surface noted in cross-section. The craftmark on the base is already partially obscured by handling: fingers, a rough surface somewhere in transit. Two of the three digits are clear; the third reads as either a four or a nine. The municipal stamp beside it is legible enough to narrow the district. What's recorded is useful without being complete.`;
        G.flags.container_documentation = true;
      }
      G.recentOutcomeType = 'craft'; maybeStageAdvance();
    }
  },

  // 27. SOCIAL: THE CONVOY GUARD SURVIVOR
  {
    label: "One guard survived the disruption. He's at the waystation infirmary, still lucid.",
    tags: ['Social', 'NPC', 'Stage1'],
    xpReward: 68,
    failResult: function() {
      addNarration('', 'Cart wheels and counting-shed talk move past in the market heart. A syndicate clerk taps the quota stamp against her station once and looks elsewhere. You step out of the yard line before the seal goes down on anything that names you.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'interviewing convoy survivor');

      const result = rollD20('charm', (G.skills.charm || 0));
      if (result.total >= 11) {
        G.lastResult = `Tennen is still concussed but lucid. "The second driver — I didn't know him. New hire, came on three days before the run. He knew the deviation before the convoy coordinator announced it. I remember thinking: how does he know?" He pauses. "The interception didn't come from the road. It came from inside. That driver was the plant." He's told the Roadwardens Order this. They thanked him and told him to rest. The driver can't be found.`;
        if (!G.flags) G.flags = {};
        G.flags.met_tennen_guard = true;
        addJournal('Convoy guard Tennen: inside contact was the second driver, Roadwardens Order informed but took no visible action', 'contact_made', `sunspire-tennen-${G.dayCount}`);
      } else {
        G.lastResult = `Tennen is drifting — the infirmary light too bright, his eyes tracking something slightly to the left of wherever you're standing. He gives fragments between silences: a wrong turn, a face he didn't recognize on a seat he thought he knew. The thread drops before it connects to anything. The concussion is still doing its work. What's inside the silence between his sentences might be exactly what's needed. Come back tomorrow, or the day after, when it clears.`;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // 28. SHADOW RIVAL INTRO
  {
    label: "Someone asked the innkeeper about the disruption. Their account exceeded any sanctioned report.",
    tags: ['Rival', 'Warning', 'Stage1'],
    xpReward: 58,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(58, 'receiving rival warning');
      if (!G.flags) G.flags = {};

      const arch = G.archetype && G.archetype.group;
      if (arch === 'combat') {
        G.lastResult = `"Military bearing," the innkeeper says. "Asked whether the guards fired before or after the container was moved. Not whether they fired at all — specifically in what order. Someone with tactical training, working out a timeline." They knew what questions to ask. That means they already know what happened. The innkeeper folds a cloth on the counter, slow and even. "Came in at dusk. Left before the morning bell. Didn't eat anything."  `;
      } else if (arch === 'magic') {
        G.lastResult = `"Carried a measuring instrument — brass, cylindrical," the innkeeper says. "Held it near the container storage area before asking questions. I thought it was for surveying." A resonance reader or material sensor. This person was characterizing the container's damping field, not documenting the disruption. They came for the container specifically. The innkeeper sets a mug down with deliberate care. "Quiet. Polite. Didn't leave a name."  `;
      } else if (arch === 'stealth') {
        G.lastResult = `"Didn't ask about the disruption at all," the innkeeper says. "Just asked who'd been asking about it. Named three people by description before they'd been introduced." A monitor. Someone whose role is watching the watchers. They were mapping inquirers, not events. Your name isn't on their list yet — but it will be. The innkeeper glances at the door. "Left a coin on the counter for the information. Exact amount for what was given."  `;
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
      addJournal('Rival-adjacent operative confirmed working the Sunspire convoy disruption ahead of you', 'complication', `sunspire-rival-${G.dayCount}`);
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
      G.lastResult = 'The board has nothing new since this morning. A seasonal obligation schedule is still pinned at the top — same one from three days back. The waystation arrival notice beside it has not changed since the last family transit. Nothing that changes the picture. Wind off the high plain moves through the open gateway, lifting the edge of the oldest posting and setting it down again. The board faces into it.  ';
      return;
    }
    G.flags[key] = true;
    drawLocalityRumor(G.location);
  }
}
,

  // ========== UNGATED ARRIVAL CHOICES (sp1=0 safe) ==========

  {
    id: 'sun_observe_spire',
    label: "The Sunspire catches light differently at different hours. Someone built that intentionally.",
    tag: 'safe · observation · DC 7',
    effects: [],
    fn: function() {
      G.lastResult = 'At this hour the upper facets of the spire catch the angle of the sun and throw a reflected bar of light across the archive annex roofline — a narrow bright line that moves over the course of an hour as the sun tracks west. The stonework at the base is a different material than the upper sections, older by the grain and color, and the seam between the two phases of construction is unmistakable up close. Whatever the Sunspire was first built for, the current structure was extended upward by a later hand with a different purpose. The records office sits in the shadow of the original base.';
      gainXp(10, 'Sunspire observation');
      G.recentOutcomeType = 'observe';
    },
    failResult: 'The angle that makes the spire\'s construction history readable is only visible from the east approach plaza, which is currently blocked by a delivery operation. The view opens again once the cart traffic clears the plaza gate.'
  },

  {
    id: 'sun_observe_archive',
    label: "The archive annex is open but the reading tables are all occupied.",
    tag: 'safe · observation · DC 7',
    effects: [],
    fn: function() {
      G.lastResult = 'Six reading tables in the archive annex, all occupied by people who came prepared — personal ink, their own marking strips, document stacks already pulled and organized before the morning access bell. The archive staff move between the stacks in a pattern that suggests they know what each reader is after without being asked. Two readers at the far table are working from the same document set and not acknowledging each other. The annex runs on appointment and familiarity: walk-in access is permitted, but the prepared readers hold the table advantage for the morning hours.';
      gainXp(10, 'archive observation');
      G.recentOutcomeType = 'observe';
    },
    failResult: 'The archive annex closes for midday organization — the staff rotate the morning document stacks back to the shelves and won\'t take new requests until the afternoon access window opens at the second bell past noon.'
  },

  {
    id: 'sun_observe_convoy_yard',
    label: "The convoy yard behind the archive processes more outbound than inbound. That ratio is wrong.",
    tag: 'safe · observation · DC 7',
    effects: [],
    fn: function() {
      G.lastResult = 'From the lane beside the archive annex, the yard is visible through a gap in the boundary fence — wide enough to read the loading bays without entering. Three outbound wagons are staged and being loaded. One inbound wagon sits at the far bay, already emptied, the driver sitting on the traces waiting for the return paperwork. Sunspire Haven is an accumulation point by geography; more should be coming in than going out at this stage of the supply cycle. What\'s leaving is crated and rope-tied, the crates marked with a routing stamp that points north rather than toward the local distribution network.';
      gainXp(10, 'convoy yard observation');
      G.recentOutcomeType = 'observe';
    },
    failResult: 'The yard gate has closed for the midday count — the handlers run a manifest tally at this hour and don\'t allow observation from the lane while it\'s in progress. The yard reopens for loading in the early afternoon.'
  }
];

// ── ARCHETYPE-EXCLUSIVE CHOICES ──────────────────────────────
SUNSPIRE_HAVEN_STAGE1_ENRICHED_CHOICES.push(

  // COMBAT ×2 — syndicate guard rotation
  {
    id: 'sunspire_arch_combat_1',
    label: 'The syndicate guard at the registry doubled last month. No new risk was announced.',
    skill: 'might',
    archetypeGroup: 'combat',
    tags: ['Security', 'Registry', 'Escalation'],
    fn: function() {
      G.investigationProgress = (G.investigationProgress||0) + 1;
      addNarration('', 'The syndicate family registry building has doubled its guard presence since last month — two guards at the entrance where one stood before, a new position at the rear courtyard gate. No new external threat has been announced. The escalation is inward-facing: the doubled presence protects the registry documents, not the building perimeter. Someone decided the obligation records inside the registry needed more protection than they had before. The timing aligns with when the obligation manipulation began.');
      addJournal('Syndicate registry: guard doubled, inward-facing protection — obligation records secured against unknown internal review threat.', 'intelligence');
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: { text: 'The guard at the registry entrance is thorough — he asks for name, family affiliation, and purpose before allowing entry. The family obligation board outside the registry posts the public summary of all current obligations; the detailed records are inside, but the summary shows which families are listed for review.' }
  },

  {
    id: 'sunspire_arch_combat_2',
    label: 'The convoy escort has shifted to a family enforcement unit, not a route protection unit.',
    skill: 'might',
    archetypeGroup: 'combat',
    tags: ['Convoy', 'Enforcement', 'Purpose'],
    fn: function() {
      G.investigationProgress = (G.investigationProgress||0) + 1;
      addNarration('', 'The escort unit accompanying the current convoy is configured for population compliance, not route security — the formation keeps the convoy handlers inside a controlled perimeter rather than watching the road approaches. Route protection formations look outward. This formation looks inward at the cargo handlers. The convoy is moving under supervision designed to ensure the handlers cannot divert from the designated route or make contact with anyone outside the escort perimeter. Syndicate goods are being moved under guard that monitors the movers.');
      addJournal('Convoy escort configured for handler containment, not route security — inward formation, handlers under perimeter control.', 'intelligence');
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: { text: 'The escort unit blocks the road observation position when you approach it — standard operational procedure for a perimeter-control formation. The convoy waystation at the next stopping point logs all escort configurations; the form for this unit will show the personnel placement and formation type.' }
  },

  // MAGIC ×2 — kinship binding ritual changes
  {
    id: 'sunspire_arch_magic_1',
    label: 'The kinship binding ritual now requires syndicate witnessing. It did not before.',
    skill: 'spirit',
    archetypeGroup: 'magic',
    tags: ['Magic', 'Ritual', 'Binding'],
    fn: function() {
      G.investigationProgress = (G.investigationProgress||0) + 1;
      addNarration('', 'The family kinship binding ritual — the ceremony that formally establishes obligation relationships between households — has been updated to require a syndicate representative as witnessing authority. The change took effect two months ago. Under the old requirement, any family elder could witness. Now only syndicate-designated witnesses are recognized. The change means the syndicate controls who can enter binding relationships, which families can formalize obligations to each other, and whose obligations are legitimate. Kinship itself now requires syndicate approval.');
      addJournal('Kinship binding ritual: syndicate witnessing now required — syndicate controls which family obligations are formally recognized.', 'evidence');
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: { text: 'The ritual preparation chamber is closed for the current ceremony — family business is private during the rite. The public ritual registration board outside the ceremony hall lists all recognized witnessing designations; the shift from family elder to syndicate designee will be visible in the current versus historical listing.' }
  },

  {
    id: 'sunspire_arch_magic_2',
    label: 'The obligation ward inscription changed. The mutual release clause was removed.',
    skill: 'spirit',
    archetypeGroup: 'magic',
    tags: ['Magic', 'Obligation', 'Ward'],
    fn: function() {
      G.investigationProgress = (G.investigationProgress||0) + 1;
      addNarration('', 'The obligation binding wards at the family registry carry a recent rewrite — the mutual release clause has been removed. The original ward allowed either party in an obligation relationship to petition for release under agreed conditions. The current ward has no release mechanism; obligations run to their natural term with no negotiated exit. Families that enter obligation relationships under the new ward cannot leave them. The change transforms obligation from a managed exchange into a permanent binding, and it was made without announcement.');
      addJournal('Obligation ward rewritten: mutual release clause removed — obligations now permanent, no exit mechanism for either party.', 'evidence');
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: { text: 'The ward inscription at the registry is behind the counter, not accessible without entering. The family obligation board outside the building posts the current ward parameters in public summary form; the release clause entry will be absent from a listing that should include it.' }
  },

  // STEALTH ×2 — route-monitoring gaps
  {
    id: 'sunspire_arch_stealth_1',
    label: 'The family courier skips two houses on the obligation route. Always the same two.',
    skill: 'finesse',
    archetypeGroup: 'stealth',
    tags: ['Courier', 'Route', 'Pattern'],
    fn: function() {
      G.investigationProgress = (G.investigationProgress||0) + 1;
      addNarration('', 'The syndicate family courier runs a daily obligation notification route — delivering acknowledgment papers to households with active obligations. The route skips two houses consistently: the Thael family on the east lane and the Corrven household at the market corner. Both households have active obligations on file. The courier passes their doors and does not stop. The two households are not receiving their notification papers, which means they cannot respond to obligation updates in the required window, which means their responses are being treated as delinquent by default.');
      addJournal('Family courier skips Thael and Corrven households on notification route — two families in default by non-delivery design.', 'evidence');
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: { text: 'The courier route is not publicly posted — it is internal syndicate documentation. The Thael and Corrven households are accessible directly; either family can confirm whether they have received their obligation notifications in the past month.' }
  },

  {
    id: 'sunspire_arch_stealth_2',
    label: 'The overnight convoy yard has a twenty-minute window with no handler present.',
    skill: 'finesse',
    archetypeGroup: 'stealth',
    tags: ['Yard', 'Gap', 'Schedule'],
    fn: function() {
      G.investigationProgress = (G.investigationProgress||0) + 1;
      addNarration('', 'The overnight convoy yard has a consistent twenty-minute gap between the end of the evening handler shift and the arrival of the night watch — a window with no syndicate personnel present in the yard. The gap is at the same time each night, which means it is structural, not incidental. The manifest comparison between what is loaded in the evening and what is recorded in the morning departure log will show whether the gap is being used to adjust cargo without record. Something moves in that twenty minutes that is not on any schedule.');
      addJournal('Convoy yard: 20-minute gap nightly between evening handler shift and night watch — structural, potentially used for unrecorded cargo adjustment.', 'intelligence');
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: { text: 'The gap is tonight, not now — the evening handler shift does not end for another three hours. The morning departure log is public and posted at the yard gate each day; a comparison with the previous evening\'s loading record will show whether cargo quantities changed overnight.' }
  },

  // SUPPORT ×2 — family obligation coercion
  {
    id: 'sunspire_arch_support_1',
    label: 'Families with unresolved obligations stopped asking each other for help.',
    skill: 'charm',
    archetypeGroup: 'support',
    tags: ['Social', 'Isolation', 'Obligation'],
    fn: function() {
      G.investigationProgress = (G.investigationProgress||0) + 1;
      addNarration('', 'Under the traditional obligation system, families with active obligations routinely helped each other navigate the requirements — sharing resources, advising on fulfillment strategies, offering informal support. That informal network has stopped. Families in obligation now manage their situations alone and decline to discuss their obligation status with other families. The isolation is self-protective: helping a family in obligation can be documented as an unauthorized obligation modification, which triggers syndicate review of the helper\'s own accounts. Community support was made into a compliance risk.');
      addJournal('Obligation families isolated from mutual support — helping someone in obligation now triggers helper\'s own syndicate review, community support criminalized.', 'evidence');
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: { text: 'Families in obligation are currently the most closed to outside conversation — the compliance risk extends to speaking with outsiders who ask about their situation. The family broker who handles obligation negotiations sees the isolation pattern from the professional side and can describe its structure without implicating specific families.' }
  },

  {
    id: 'sunspire_arch_support_2',
    label: 'Two families merged their household registries. The syndicate refused to recognize the merge.',
    skill: 'charm',
    archetypeGroup: 'support',
    tags: ['Social', 'Resistance', 'Refusal'],
    fn: function() {
      G.investigationProgress = (G.investigationProgress||0) + 1;
      addNarration('', 'The Aldren and Vessin families attempted to merge their household registries — a traditional solidarity move that would combine their obligation loads and allow them to collectively meet what neither could meet individually. The syndicate denied the merger registration without explanation. The two families have appealed twice; both appeals were rejected without stated grounds. Under the old obligation system, household mergers were approved as a matter of routine. Denying them selectively preserves the isolation that keeps individual families in obligation and unable to collectively respond to pressure.');
      addJournal('Aldren-Vessin household merger denied twice without grounds — selective refusal preserves family isolation under obligation pressure.', 'evidence');
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: { text: 'The Aldren family is currently in active dispute with the syndicate over the merger decision — they are not available for side conversations while the appeal is open. The family registry\'s merger application file is a public document; the rejection notices will show the absence of stated grounds.' }
  },

  // SP2-BRIDGE: Kael Emberthrone — unusual workshop requisition
  {
    id: 'sun_kael_requisition_sp2',
    plot: 'main',
    label: 'Kael Emberthrone builds what he is told. Someone told him to build the wrong thing.',
    tags: ['NPC', 'Craft', 'Stage1', 'Bridge'],
    skill: 'wits',
    xpReward: 72,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(72, 'examining workshop requisition with Kael Emberthrone');
      if (!G.flags) G.flags = {};
      if (!G.stageProgress) G.stageProgress = {1:0,2:0,3:0,4:0,5:0};

      var result = rollD20('wits', (G.skills.wits||0));
      if (result.isCrit || result.total >= 13) {
        G.flags.met_kael_emberthrone_s1 = true;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Kael sets the requisition on the bench without being asked. The spec is insulation — not for heat, he says, tapping the material column. The tolerances are altitude-specific: the work could only be tested and calibrated at this elevation. He built it because the commission came through the proper syndicate channel with a sealed charter mark. He built it without knowing what it was for. He has kept the spec because something about the tolerances did not sit right with him. They still do not.';
        addJournal('Kael Emberthrone: altitude-specific insulation requisition, sealed charter commission — spec retained, tolerances still unexplained', 'evidence', 'sun-kael-s1-' + (G.dayCount||0));
        if (typeof maybeStageAdvance === 'function') maybeStageAdvance();
        if (typeof gainXp === 'function') gainXp(0);
      } else {
        G.lastResult = 'Kael wipes his hands on a rag and turns back to the bench before you finish. Workshop requisitions are syndicate property under convoy commercial confidentiality — he says this before you have framed the question, the phrasing ready. Without a formal override order from the adjudicator\'s office he cannot open the logs to an outside party. He is not apologetic about it. The caliper is already in his hand before he reaches the worktop.';
        addJournal('Kael Emberthrone — workshop logs blocked, commercial confidentiality cited', 'complication', 'sun-kael-s1-fail-' + (G.dayCount||0));
      }
      G.recentOutcomeType = result.total >= 13 ? 'success' : 'complication';
    },
    failResult: {
      text: 'The workshop door is closed for a syndicate inspection — the handlers have the floor and Kael is not taking outside visitors until the count is done. The workshop log board near the entrance posts the current commission queue by syndicate reference number; the altitude-rated spec series will be listed there if the commission was filed through the standard channel.',
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  }

);

window.SUNSPIRE_HAVEN_STAGE1_ENRICHED_CHOICES = SUNSPIRE_HAVEN_STAGE1_ENRICHED_CHOICES;
