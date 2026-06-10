/**
 * FAIRHAVEN STAGE 1 ENRICHED MEANINGFUL CHOICES
 * 20 deeply grounded investigation paths tied to supply work and frontier faith
 * Generated for: Faith devotion vs practical necessity, supply security vs glyph danger, commerce vs purity
 * Each choice: 65-80 XP, grounded in specific NPC perspective, layered wrongness reveal
 */

var FAIRHAVEN_STAGE1_ENRICHED_CHOICES = [
  // ========== NPC-GROUNDED CHAINS (8 CHOICES) ==========

  // 1. CHAPEL WORKER: BLESSING EFFICIENCY DEMANDS
  {
    plot: 'main',
    questId: 'q_s1_pattern',
    label: "The ritual words are the same. The time given them is not.",
    tags: ['Investigation', 'NPC', 'Faith', 'Ritual', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    failResult: {
      text: "Serin glances toward the chapel door and goes still. The prayer cord is set in the lap and picked up again without looking at it. \"I don't think I can help with this.\" No word of who gave the instruction. No need to say. The bell in the outer hall rings the half-hour and Serin rises to attend it, leaving the bench before the sound has finished. The blessing schedule and any deviation from it runs through the Shrine Keeper's record.",
      xp: 0,
      effects: [],
      next: [{text: 'The Shrine Keeper keeps the blessing records.', skill: 'charm', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading blessing pressure');
      G.stageProgress[1]++;

      const result = rollD20('charm', (G.skills.charm || 0));
      const target = 11 + Math.max(0, G.worldClocks.pressure);

      if (result.isCrit) {
        G.lastResult = `Serin keeps a low voice, hands folded tight in the lap. "Blessings used to take a full meditation cycle — preparation, stillness, then the words. Now I'm told to finish in a quarter of that. The ritual authority calls it efficiency." A pause. "I tried maintaining proper form. They said I was obstructing service. So I cut the meditation. The words are spoken. The form is completed. But something doesn't carry the way it did." A glance at the supply crates stacked by the door. "If I'd said any of this to the Shrine Keeper, I'd have lost my posting by morning."`;
        G.stageProgress[1]++;
        addJournal('Chapel worker revealed acceleration of blessing practices', 'evidence', `fairhaven-blessing-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Serin's posture closes off mid-sentence. "The chapel's work isn't subject to outside review." The voice drops rather than rises. By the time you've left the room, a runner has already crossed the courtyard toward the Shrine Keeper's quarters. The chapel bell rings once, out of sequence. Everyone inside knows what that means. You drew attention to yourself and to the person you were speaking with — that cost is shared.`;
        G.worldClocks.pressure++;
        addJournal('Chapel worker reported your inquiry to shrine authority', 'complication', `fairhaven-chapel-alert-${G.dayCount}`);
      } else {
        if (G && G.flags && G.flags.met_elder_cassian) {
          G.lastResult = `Serin's hands stop on the prayer cord when you mention Elder Cassian. A beat. "She sent you." Not a question — said the way someone says the name of a relief they hadn't expected. "The smell changed at the same time the pace changed. I noticed. I didn't know if it was safe to say so." A hand reaches into the vestment pocket and produces a fragment of the old compound — sealed in a cloth envelope, handwriting on the outside. "Cassian said to pass this along if someone asked the right questions."`;
          addJournal('Chapel worker gave compound sample fragment — coordinated disclosure with Elder Cassian', 'evidence', `fairhaven-chapel-cassian-${G.dayCount}`);
        } else {
          G.lastResult = `Serin admits the blessing pace has changed. "We serve more households now," — but the hands move to the prayer cord and stay there. No explanation for the new timeline. Eyes don't quite settle on yours. The compound smell of the burner fills the space between sentences — cedar with something heavier underneath. Whatever the ritual authority said about the change, it hasn't been made peace with, and the prayer cord keeps moving between the fingers long after the speaking stops.`;
          addJournal('Chapel worker acknowledged acceleration of blessings', 'evidence', `fairhaven-chapel-acceleration-${G.dayCount}`);
        }
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 2. MARKET BROKER: SUPPLY DIVERSIONS AND PRICE INFLATION
  {
    plot: 'main',
    questId: 'q_s1_converging',
    label: "Prices have climbed. The broker knows where the gap started.",
    tags: ['Investigation', 'NPC', 'Commerce', 'Supply', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    failResult: {
      text: "Maris squares a ledger against the table edge and does not open it. The stall fills with purposeful small motions — a rope retied, a receipt stack aligned — until you run out of time to wait them out. Not hostile. Simply decided the conversation has concluded. The harbor master's coordination board carries arrival records for the past month; the routing pattern is visible there without anyone's cooperation.",
      xp: 0,
      effects: [],
      next: [{text: 'The harbor records show routing without asking anyone.', skill: 'wits', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'tracing supply manipulation');
      G.stageProgress[1]++;

      const result = rollD20('charm', (G.skills.charm || 0));

      if (result.isCrit) {
        G.lastResult = `Maris draws you past the stacked crates to the back of the stall. "Three weeks ago a grain shipment came in from the south and went straight back out toward Watcher's Perch. Last week, alchemical supplies bound for the chapel ended up at an unmarked waystation north of the glyph cave. I have two witnesses to each." A spread of hands. "Replacement supplies come back through the same channels at prices nobody was quoting two months ago. Someone upstream is coordinating with the original brokers. This isn't a routing error. Fairhaven is short because Fairhaven is being kept short."`;
        G.stageProgress[1]++;
        addJournal('Broker mapped supply diversions and price manipulation', 'evidence', `fairhaven-broker-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Maris's expression shifts the moment you mention supply routes. "Commercial details stay commercial." A step back behind the ledger, eyes don't look up again. Two stalls down, a partner turns to watch you leave. By the time you reach the notice board, word is already moving through the market row. The watchful eyes follow at a distance — market rows have long memories.`;
        G.worldClocks.watchfulness++;
        addJournal('Broker suspicious of your supply chain questions', 'complication', `fairhaven-broker-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Maris concedes that shipments have been arriving on odd schedules. "Some come late. Some not at all, then double the next week." Called market adjustment, pushed no further. The pen keeps moving across the ledger throughout, as though a decision has been made not to be officially present in this conversation. Behind, on the manifest cabinet against the back wall, a drawer two positions to the left of the one shown is sealed with red administrative wax — same color, same stamp impression as the Collegium-issued seals on the public filing board beside the door. The drawer shown carries no such seal.`;
        addJournal('Broker confirmed unusual supply pattern disruption', 'evidence', `fairhaven-broker-pattern-${G.dayCount}`);
      } else {
        if (G && G.flags && G.flags.met_nyse_garrison) {
          G.lastResult = `Maris looks past you to the square, then leans forward. "The soldier you were speaking with — she patrols this row twice per shift since the diversions started." The ledger is squared but not opened. "Someone is using the route change to count what I stock. Not what I sell — what I have on hand before I sell it." A glance toward the manifest cabinet, the sealed drawer. "Nyse doesn't know what she's counting for. But whoever told her to count it does."`;
          addJournal('Broker revealed garrison patrol correlates with supply census — stocktaking ahead of diversions', 'evidence', `fairhaven-broker-nyselink-${G.dayCount}`);
        } else {
          G.lastResult = `Maris closes the ledger without looking up. "Supply chain specifics are between the parties to the transaction." Said the way people say things they've rehearsed. A stack of receipts gets squared against the table edge. A rope of dried herbs gets retied. The stall fills with small motions that have nothing to do with you and everything to do with not having to meet your eyes. By the time the third unnecessary task is finished, the window has closed, and it won't reopen.`;
          addJournal('Broker blocked supply chain inquiry', 'evidence', `fairhaven-broker-blocked-${G.dayCount}`);
        }
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 3. ALCHEMICAL SUPPLIER: INGREDIENT QUALITY DEGRADATION
  {
    plot: 'main',
    label: "The alchemical supplier's stock smells right. The potency tests would say otherwise.",
    tags: ['Investigation', 'NPC', 'Craft', 'Supply', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    condition: function() { return (G.investigationProgress||0) < 3; },
    failResult: {
      text: "Thalen steps in front of the shelf rack. \"Proprietary stock.\" The posture is final without being aggressive — a craftsperson who has made this boundary and expects it to hold. The workshop door is still open. Two jars on the nearest shelf carry the same label but different sediment lines, pale and amber-brown side by side. The noticing hasn't been noticed. The craftsman Halverd works from the same supply source and has been more willing to speak about the failures.",
      xp: 0,
      effects: [],
      next: [{text: "Halverd's tools show the same problem from a different angle.", skill: 'craft', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'assessing ingredient authenticity');
      G.stageProgress[1]++;

      const result = rollD20('spirit', (G.skills.spirit || 0));

      if (result.isCrit) {
        G.lastResult = `Thalen sets down the pestle and picks up a dried bundle from the nearest shelf. "Moonflower. This came in the last batch, documented as prime grade." A stem breaks, held under your nose — the scent is thin, stretched. "Treated to carry the smell. Potency is maybe forty percent of what I'm paying for." Three other containers follow in turn, each with the same story. "The paperwork is perfect. Someone put real work into this. And whoever made tools from my materials — they won't know until the binding fails."`;
        G.stageProgress[1]++;
        addJournal('Supplier revealed ingredient replacement scheme', 'evidence', `fairhaven-alchemical-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Thalen steps in front of the shelf rack before you've finished asking. "Proprietary stock. Not for external review." You are walked to the door personally, pace even, the door held open just long enough to make the exit clear. By the next morning, three other craftspeople on the mill road have heard that a stranger was pressing Thalen about materials sourcing. The scrutiny was distributed before you could reframe the question. The mill road keeps its own account of who asks what.`;
        G.worldClocks.watchfulness++;
        addJournal('Alchemical supplier blocked access and warned community', 'complication', `fairhaven-alchemical-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The storage shelves hold more variation than they should — two jars labeled the same compound have different sediment lines, one pale, one amber-brown. Thalen watches you notice it and says nothing at first. The pestle turns once in hand, a slow rotation that doesn't seem deliberate. "Sourcing has been difficult lately," they offer. No elaboration, no gesture toward the jars, no move to close the gap in the shelving where the discrepancy is plainest. No need to explain it. Just a need for you to have moved past it.`;
        addJournal('Craft analysis noted potential ingredient substitution', 'evidence', `fairhaven-alchemical-substitution-${G.dayCount}`);
      } else {
        G.lastResult = `The workshop looks orderly — shelves stacked, containers labeled, surfaces wiped. Without reference samples for side-by-side comparison, any degradation doesn't announce itself. The labels match the contents, the handwriting is consistent, the storage conditions are correct. The air carries the right smell: dried herbs, mineral dust, the faint brine off the north channel through a cracked shutter. Whatever has changed in the sourcing chain, this room has been organized to show nothing changed at all. Halverd the tool craftsman works from the same supply source. Enchantments stopped taking four weeks ago.`;
        addJournal('Ingredient quality assessment inconclusive', 'evidence', `fairhaven-alchemical-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 4. FOOD PROVISIONER: STORAGE MANIPULATION AND SPOILAGE [PROGRESS-GATED: mid-progress]
  {
    plot: 'main',
    label: "The grain moved upstairs. Gareth knows what that does to grain.",
    tags: ['Investigation', 'NPC', 'Supply', 'Storage', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    condition: function() { return (G.investigationProgress||0) >= 3 && (G.investigationProgress||0) < 6; },
    failResult: {
      text: "Old Gareth nods and doesn't elaborate. \"The Shrine Keeper makes the storage decisions now.\" He pulls the cellar door shut behind him — not slammed, just closed, the sound of a man who stopped asking follow-up questions some time ago. The upper store smell follows: faint, still early, but unmistakable. The smell of grain in the wrong conditions for long enough that it has started to answer back. The provisioner's delivery logs are posted on the mill road coordination board.",
      xp: 0,
      effects: [],
      next: [{text: 'The delivery logs on the mill road show what changed and when.', skill: 'wits', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'investigating supply storage');
      G.stageProgress[1]++;

      const result = rollD20('vigor', (G.skills.vigor || 0));

      if (result.isCrit) {
        G.lastResult = `Old Gareth closes the cellar door behind you and speaks at the wall. "Three weeks ago they moved the grain to the upper stores. Warmer, less air. I told the Shrine Keeper — grain needs cool and dark or it turns. He said the new procedure was spiritually aligned with something. I didn't understand the doctrine. What I understand is that last week's sack had mold on the bottom seam." He pulls it out and holds it up. The smell is unmistakable. "We're not supposed to question the procedure."`;
        G.stageProgress[1]++;
        addJournal('Provisioner revealed deliberate storage degradation', 'evidence', `fairhaven-provisioner-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Gareth's eyes go to the door first, then back to you. "Is this the Shrine Keeper checking on my work?" The question isn't aggressive — it's frightened. The upper store smell hangs in the air between you, warm and faintly wrong. He reports the conversation before you've left the supply yard, moving quickly for a man his age. Whatever he's been told about unauthorized questions, the warning stuck deep enough to move him faster than his usual pace.`;
        G.worldClocks.pressure++;
        addJournal('Provisioner reported your storage inquiry', 'complication', `fairhaven-provisioner-alert-${G.dayCount}`);
      } else {
        G.lastResult = `Gareth admits the storage location changed recently. "The Shrine Keeper said it was necessary." He shrugs in the way of someone who stopped asking follow-up questions some time ago and has accepted the silence that replaced them. He pulls the cellar door shut behind him on the way out. The upper store smell follows — faint but unmistakable, the early stage before spoilage has a name. Grain needs cool dark storage; the upper room gets the afternoon heat and whatever moisture the north channel sends through the wall by night. The pressure of what he just said without meaning to is visible in how quickly he leaves.`;
        addJournal('Provisioner confirmed storage procedure changes', 'evidence', `fairhaven-provisioner-changes-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 5. TOOL CRAFTSMAN: ENCHANTED TOOL DEGRADATION
  {
    plot: 'main',
    label: "Halverd has been at this thirty years. He knows when an enchantment hasn't taken.",
    tags: ['Investigation', 'NPC', 'Craft', 'Tools', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    failResult: {
      text: "Halverd sets his hammer down and squares the finished rack with his hip. \"Craft methods aren't discussed with people who don't work them.\" Not hostile — the flat refusal of a man who has heard the wrong kind of question before and learned not to entertain it. A row of plow blades in the rack behind him. He turns back to his work before you've left the doorway. The alchemical supplier Thalen draws from the same component source and has been less guarded about the failures.",
      xp: 0,
      effects: [],
      next: [{text: "Thalen's stock comes from the same source. They've noticed the same thing.", skill: 'craft', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'analyzing tool integrity');
      G.stageProgress[1]++;

      const result = rollD20('spirit', (G.skills.spirit || 0));

      if (result.isCrit) {
        G.lastResult = `Halverd picks up a plow-blade from the finished rack and hands it over without ceremony. The rune seam runs clean along the edge — but when you press at the binding notch, the metal gives slightly where it shouldn't. "I've been at this thirty years," he says. "The enchantments stopped taking properly four weeks ago. The formulas were changed — key components pulled out. I raised it with the supply authority. They told me the new formula was correct and I should execute it." He takes the blade back. "I know what correct feels like. This isn't it."`;
        G.stageProgress[1]++;
        addJournal('Craftsman revealed tool enchantment sabotage', 'evidence', `fairhaven-craftsman-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Halverd sets his hammer down and says nothing for a moment. "Craft methods aren't for outside discussion." He doesn't explain further. He watches you the way a man watches a door he'd rather stayed shut — the row of plow blades in the rack behind him, rune seams catching the light from the high side window, none of it offered. You leave with nothing and the awareness that he'll remember your face, and the question you asked, and the hour you came.`;
        G.worldClocks.watchfulness++;
        addJournal('Tool craftsman now hostile to external inquiry', 'complication', `fairhaven-craftsman-hostile-${G.dayCount}`);
      } else {
        G.lastResult = `Halverd allows that durability has been inconsistent lately. "Materials come in different grades," he says — the kind of answer that is technically accurate and practically empty. He keeps working while he talks, hammer moving in the same rhythm it held before you spoke. The finished rack behind him holds a row of plow blades, rune seams running clean along the edge in the dim light from the high side window. He doesn't offer to show them. Neither does he turn them away from view. Asking about the formula directly would make things harder — he's noticed you're not a casual visitor.`;
        addJournal('Craftsman confirmed tool quality decline', 'evidence', `fairhaven-craftsman-decline-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 6. GUARD CAPTAIN: GARRISON COMPLACENCY AND REALLOCATION
  {
    plot: 'main',
    label: "Forty-two soldiers last month. Twenty-nine today. The captain filed a written objection.",
    tags: ['Investigation', 'NPC', 'Defense', 'Military', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    failResult: {
      text: "Vren crosses his arms and doesn't speak. The duty roster on the wall shows three patrol slots empty, chalk half-erased. He doesn't gesture toward it or explain it. He's decided the conversation is over by his accounting, not yours. One of the two soldiers at the door has already moved a step closer to the entrance. The garrison reduction orders were formally filed with the Shrine Keeper — all deployment changes route through shrine authority here.",
      xp: 0,
      effects: [],
      next: [{text: 'The Shrine Keeper holds the garrison reduction orders.', skill: 'charm', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'investigating garrison reallocation');
      G.stageProgress[1]++;

      const result = rollD20('charm', (G.skills.charm || 0));

      if (result.isCrit) {
        G.lastResult = `Captain Vren doesn't sit. He stands at the window and counts on his fingers. "I had forty-two posted here a month ago. I have twenty-nine now. Temporary reassignments — that's what the order says. They're not coming back and nobody's confirmed a return date." He turns. "The supply route patrols are running at half schedule. The glyph cave perimeter hasn't had a full circuit since the third week of last month. I put this to the Shrine Keeper in writing. The reply cited doctrine. I don't know which doctrine covers garrison deployment, but apparently one does now."`;
        G.stageProgress[1]++;
        addJournal('Guard captain revealed garrison force reduction', 'evidence', `fairhaven-guard-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Captain Vren's voice drops a register. The room contracts around it. "Garrison operations don't fall under civilian review. Raise this again and I'll restrict your movement within Watchers' Perch." He means it — the phrasing is too specific and too immediate for a bluff. The two soldiers at the door have already straightened without being told to. Their eyes move to you, then back to the middle distance: the posture of men waiting for an order that may or may not come, ready either way.`;
        G.worldClocks.pressure++;
        addJournal('Guard captain formally prohibits military inquiry', 'complication', `fairhaven-guard-warning-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Vren confirms the headcount is down. "Resource reallocation," he says. The phrase sits in the air without conviction — the language of a man repeating what he was told rather than what he believes. He crosses his arms, the posture closing off before the echo of the words has finished. The duty roster on the wall behind him shows three patrol slots empty, the chalk marks half-erased as though someone tried to make the absence look provisional. Nobody has filled the slots back in. The pressure of a direct question about garrison strength puts him in a position he doesn't want to be in.`;
        addJournal('Guard captain confirmed garrison force reduction', 'evidence', `fairhaven-guard-reduction-${G.dayCount}`);
      } else {
        G.lastResult = `Vren gives you a professional nod and nothing useful. "Strategic considerations shape deployment. That's all I can offer." His eyes have already moved to the duty roster on the wall — three slots empty where names used to be chalked. He doesn't gesture toward it or comment on it. He's decided this conversation is over by his accounting, not yours. The reduction orders are filed with the Shrine Keeper — all garrison deployments run through the shrine authority.`;
        addJournal('Guard captain blocked military inquiry', 'evidence', `fairhaven-guard-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 7. SHRINE KEEPER: DOCTRINE SHIFTS AND EXTERNAL DIRECTION
  {
    plot: 'main',
    label: "The Shrine Keeper implemented every directive. She hasn't named what came next.",
    tags: ['Investigation', 'NPC', 'Authority', 'Doctrine', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    failResult: {
      text: "Cevrin folds both hands and waits. Incense ash on the altar rail sits repositioned to one side — not swept, moved. \"Shrine operations follow doctrine. Changes are made in accordance with guidance received.\" The offering cloth is straight. The altar surface is bare. Done with this before it began. The directives came through the regional hierarchy as sealed letters — that correspondence is logged at the regional shrine authority, not here.",
      xp: 0,
      effects: [],
      next: [{text: 'The regional shrine authority holds the correspondence log.', skill: 'wits', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'confronting shrine authority');
      G.stageProgress[1]++;

      const result = rollD20('charm', (G.skills.charm || 0));

      if (result.isCrit) {
        G.lastResult = `Cevrin doesn't answer immediately. The offering cloth on the altar is straightened first, then: "Directives have been arriving through the regional hierarchy. Sealed letters. Blessing procedures, storage protocols, deployment schedules — all framed as spiritual advancement." Both hands go flat on the altar surface. "I have implemented every one of them. And in the three months since, the town has gotten quieter in a way I don't have doctrine for." The word sabotage isn't used. But the gaze doesn't move away either.`;
        G.stageProgress[1]++;
        addJournal('Shrine keeper revealed external directive manipulation', 'evidence', `fairhaven-shrine-keeper-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Cevrin stands. "This conversation is finished. You are not welcome in this chapel." No shouting — the stillness in the voice carries further than shouting would. Cedar smoke from the compound burner hangs in the air as the wait holds. A novice appears at the side door within thirty seconds, moving too directly to have heard by accident. You are escorted out. The doors close behind you with a sound like a lock turning, and the compound smoke follows only as far as the threshold.`;
        G.worldClocks.reverence++;
        addJournal('Shrine keeper formally bans you from chapel', 'complication', `fairhaven-shrine-keeper-ban-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The offering cloth on the altar is folded and refolded while Cevrin speaks — corners aligned, then re-aligned, a gesture that fills the pause before an answer comes. The changes came through sanctioned channels. "Regional shrine authority." No name given for the directive or its author. Confirmation that they were explicit written instructions, not a personal interpretation of doctrine. No look up from the altar cloth until the sentence is fully finished. Whatever attention your inquiry draws, it now belongs to the regional hierarchy and not just the local keeper.`;
        addJournal('Shrine keeper confirmed deliberate change implementation', 'evidence', `fairhaven-shrine-keeper-deliberate-${G.dayCount}`);
      } else {
        G.lastResult = `"Shrine operations follow doctrine. Changes are made in accordance with guidance received." Cevrin folds both hands and waits for you to leave. Incense ash on the altar rail has been swept to one side — not cleared, repositioned. The chapel behind is still and unhurried, everything in its place. Cedar smoke from the compound burner hangs low near the threshold, slow to clear in the morning air. The conversation has the texture of a door that closed before you opened it. The directives came through the regional hierarchy — sealed letters, logged at the regional shrine authority, not here.`;
        addJournal('Shrine keeper blocked further inquiry', 'evidence', `fairhaven-shrine-keeper-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 8. INNKEEPER: SUPPLY ROUTING AND VISITOR PATTERNS
  {
    plot: 'main',
    label: "Shipments go north first now. The men coordinating them weren't from here.",
    tags: ['Investigation', 'NPC', 'Commerce', 'Intelligence', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    failResult: {
      text: "Vaelis runs the cloth down the bar without looking up. \"I don't discuss other people's arrangements.\" Turns away to resume stacking cups and the bar room settles around the refusal — a corner table of regulars not watching, two cups turned mouth-down at the far end. The harbor coordination board at the dock end posts arrival records for the past month. The routing pattern is visible there without anyone's help.",
      xp: 0,
      effects: [],
      next: [{text: 'The harbor arrival records show the routing without asking.', skill: 'wits', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'mapping supply logistics');
      G.stageProgress[1]++;

      const result = rollD20('charm', (G.skills.charm || 0));

      if (result.isCrit) {
        G.lastResult = `Vaelis wipes down the bar and doesn't look up. "Shipments used to come straight from the south. Now they go north first — up through Watcher's Perch, around the glyph cave perimeter. Adds two days minimum." A pause at a sticky ring on the wood. "A merchant who stayed here last week said there's a waystation out past the cave. Supplies stop there for inspection, he said. Some continue to Fairhaven. Some don't." The cloth goes down. "The men who came through coordinating it — I couldn't place their accents. None of them were from here."`;
        G.stageProgress[1]++;
        addJournal('Innkeeper mapped rerouted supply network', 'evidence', `fairhaven-innkeeper-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Vaelis stops mid-motion. "I don't discuss other people's supply arrangements." Turns away to resume stacking cups, the movement unhurried and final. Morning fog off the north channel still sits in the low corners of the room. When you try again, the voice rises just enough for the two men at the corner table to hear. They look over without expression — the look of regulars who have seen this before. You take the hint and leave before it costs more.`;
        G.worldClocks.watchfulness++;
        addJournal('Innkeeper now distrustful of your supply questions', 'complication', `fairhaven-innkeeper-hostile-${G.dayCount}`);
      } else {
        G.lastResult = `Salt-damp on the bar top, a cup turned upside down at the far end. Vaelis runs the cloth across both without breaking stride. Shipments have been taking longer lately, comes the word. "More waypoints." Keeps moving. No elaboration, no slowing down, no looking up from the wood. Fog off the north channel still sits in the corners of the room at this hour, the morning cold not yet burned off. The change is noticed in the same way weather is noticed — without wanting an explanation for it. Your asking is also noticed, and that too is the kind of thing that won't be forgotten.`;
        addJournal('Innkeeper confirmed routing changes', 'evidence', `fairhaven-innkeeper-routing-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== ARCHETYPE DEEP DIVES (8 CHOICES) ==========

  // 9. SURVIVAL TIER 1: GLYPH CAVE ACTIVITY MONITORING
  {
    plot: 'main',
    label: "The warning posts say stay back. The boot prints say otherwise.",
    tags: ['Investigation', 'Survival', 'Glyph', 'Danger', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    failResult: {
      text: "The glyph field saturates the air from the posted perimeter outward — a low charge in the stone underfoot, hair lifting at the wrist. The clay around the warning markers is too disturbed to give a clean read, the ambient interference erasing whatever trail might have been there. The formations active at the cave mouth are real enough to end a careless approach. Coming back after the disturbance has settled, from a different line of approach, would be the way to read what's been happening here.",
      xp: 0,
      effects: [],
      next: [{text: 'A different approach when the glyph field is quieter.', skill: 'vigor', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'glyph cave activity analysis');
      G.stageProgress[1]++;

      const result = rollD20('vigor', (G.skills.vigor || 0));

      if (result.isCrit) {
        G.lastResult = `The warning posts say stay back. The ground says something else. Boot prints in the clay — multiple sets, different tread, all coming from the same direction and going into the cave. Waystation markers have been repositioned recently; the disturbed soil is fresh. Inside the mouth of the cave: a storage alcove, partially screened by a brush pile that didn't grow there. The glyph cave is being used as a throughpoint. The danger notices are keeping locals away while someone else moves freely through.`;
        G.stageProgress[1]++;
        addJournal('Survival analysis revealed glyph cave logistics operation', 'evidence', `fairhaven-survival-glyph-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `A Watchers' Perch soldier steps out from behind the rock formation to your left. "This area is restricted. Safety reasons." He doesn't explain which safety reasons. The old stone of the warning marker is at his back, clay around its base disturbed in the same way boot prints disturb clay. Two more soldiers emerge from the brush — they were already there, positioned before you arrived. You're walked back to the road without your notes and with a formal warning logged against your name.`;
        G.worldClocks.pressure++;
        addJournal('You are escorted away from glyph cave perimeter', 'complication', `fairhaven-survival-caught-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Boot tracks in the clay — multiple tread patterns, more than one person, all converging on the same line of approach. A waystation marker has been repositioned; the disturbed soil around its base is still soft. The stretch of ground between the posted warning and the cave mouth has been walked recently and walked often, the grass worn flat in a path that wasn't there last season. The danger warnings don't account for that pattern. They account for everyone else staying away while someone else moves freely through. Whoever maintains this route will notice the same thing you noticed: fresh prints that weren't theirs.`;
        addJournal('Survival analysis noted cave access patterns', 'evidence', `fairhaven-survival-pattern-${G.dayCount}`);
      } else {
        G.lastResult = `Salt air from the coast gives way to something drier and charged as the cave mouth comes into view. The glyph formations near the entrance are active — a low hum in the stone that runs up through boot soles, hair lifting at the wrist. The ambient disturbance saturates the ground around the perimeter, blurring whatever recent foot traffic might otherwise be readable. Old stone at the warning marker base holds the cold long after sunrise; the clay around the posts is too disturbed for a clean read. Whatever activity happens here leaves traces, but the glyph field consumes them before a single pass can collect them. Coming back with more time and a different approach would change that.`;
        addJournal('Glyph cave remains a genuine threat', 'evidence', `fairhaven-survival-danger-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 10. SURVIVAL TIER 2: HIDDEN WAYSTATION DISCOVERY
  {
    plot: 'main',
    label: "Something stored past the perimeter. The drainage channel was cut on purpose.",
    tags: ['Investigation', 'Survival', 'Supply', 'Hidden', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    failResult: {
      text: "Glyph interference breaks up the terrain read: distances harder to judge, brush thick enough to cut line of sight every twenty paces, stone formations that look different from the north approach than they did from the south. Boot tracks run into the interference zone and stop being readable. The search area is too large and the conditions too active for a single pass to locate a deliberate concealment. A second attempt from the northern ridge, after the glyph field cycles quieter, would change the odds.",
      xp: 0,
      effects: [],
      next: [{text: 'The northern ridge approach when the field is quieter.', skill: 'vigor', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'locating hidden supply network');
      G.stageProgress[1]++;

      const result = rollD20('vigor', (G.skills.vigor || 0));

      if (result.isCrit) {
        G.lastResult = `The shielded cave sits forty paces past the posted perimeter, screened on three sides by a natural shelf of rock. Inside: stacked crates, a grain cache, a locked document box with a broken hasp — someone left in a hurry. The shipping manifests still inside show Fairhaven quantities crossing off the expected destination and picking up a new routing mark. Contracts in two languages cover what gets stored here and where it continues. On the manifest cabinet against the far wall, a second drawer sits sealed with administrative wax — same stamp, same red, different drawer than the one left open. This isn't improvised. The shelving is fixed. The drainage channel in the floor was cut deliberately.`;
        G.stageProgress[1]++;
        addJournal('Survival analysis located hidden supply waystation', 'evidence', `fairhaven-survival-waystation-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Three Watcher personnel step out from the rocky ground to your north — they were already there, watching the search area from a position that covered the drainage channel and the rock shelf both. "You're inside a restricted zone." One of them has a ledger, its pages already open. They log your name and the time before they escort you out. The formal warning is already written by the time you reach the road, the ink dry before the escort releases you.`;
        G.worldClocks.pressure++;
        addJournal('You are caught trespassing in glyph cave area', 'complication', `fairhaven-survival-caught-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `A cleared section under a rock shelf — ground pressed flat by repeated foot traffic, a faint chemical smell on the air. Something has been stored here recently and moved. The depression in the dirt holds the outline of stacked crates. The waystation exists, but it's been emptied or relocated. Someone was watchful enough to clear it before you arrived — or you were noticed approaching and it was cleared while you were still on the path.`;
        addJournal('Survival analysis found evidence of hidden storage', 'evidence', `fairhaven-survival-hidden-${G.dayCount}`);
      } else {
        G.lastResult = `The glyph interference scrambles any consistent read of the terrain. Hair stands at the wrist. The stone gives off a low resonance that makes distances harder to judge than they should be. The brush is thick and rock formations break line of sight every twenty paces. A drainage channel cut into the hillside runs unnaturally straight — not the work of water. Boot tracks are present but the glyph disturbance makes it impossible to read their direction reliably. If a waystation is out here, a single pass in these conditions won't find it.`;
        addJournal('Waystation search inconclusive', 'evidence', `fairhaven-survival-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 11. CRAFT TIER 1: ENCHANTMENT FORMULA ANALYSIS
  {
    plot: 'main',
    label: "The archive copy and the current formula are not the same document.",
    tags: ['Investigation', 'Craft', 'Magic', 'Enchantment', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    failResult: {
      text: "The archive shelves hold a season's worth of notation — rolled scrolls, labeled tubes, some volumes not opened in years. Cross-references point to volumes not present in this room. Without a known-good comparison document laid beside the current formula, alterations in the binding sequences don't surface on a single pass. The archive filing index shows the current formula was last revised fourteen months ago. The Oversight Collegium correspondent Avel Prenn has access to the regional standards register and could run the comparison.",
      xp: 0,
      effects: [],
      next: [{text: 'Avel Prenn can access the regional standards register.', skill: 'craft', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'enchantment formula analysis');
      G.stageProgress[1]++;

      const result = rollD20('spirit', (G.skills.spirit || 0));

      if (result.isCrit) {
        G.lastResult = `The current formula and the archive copy sit side by side on the reading table. Six differences. Each one pulls a binding component or shifts an activation rune just far enough to reduce efficacy without making the enchantment visibly fail during production. The changes require someone who knew exactly where the formula had tolerance — where you could degrade performance without triggering the craftsperson's check. Whoever rewrote this understood Fairhaven's enchantment practice from the inside.`;
        G.stageProgress[1]++;
        addJournal('Craft analysis revealed formula sabotage', 'evidence', `fairhaven-craft-formula-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Incense dust floats in the slant of light from the archive's high window. A Shrine Keeper comes through the door before the first comparison is finished — not the duty archivist, a different one, moving too directly to have arrived by accident. "These documents are not for outside examination." She doesn't raise her voice. She closes the folder with two fingers and holds the door open with the other hand, the gesture of someone who has done this before and expects compliance without escalation. The latch clicks behind you. The keeper's expression carries the specific flatness of a person who will report upward before the afternoon bell.`;
        G.worldClocks.reverence++;
        addJournal('You are removed from shrine archives for formula inquiry', 'complication', `fairhaven-craft-expelled-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The current formula is not the same document as the one filed three seasons ago. Set side by side on the archive reading table, the differences surface — a substituted component in the third binding sequence, an altered rune notation near the activation clause, a revised ratio in the secondary compound. Each change is small enough to survive a casual check. Whether the total represents standard revision or something more deliberate requires a complete comparative pass. The archive desk clerk noted which formulas you compared — the scrutiny will follow the same documents you followed.`;
        addJournal('Craft analysis noted formula modification patterns', 'evidence', `fairhaven-craft-modification-${G.dayCount}`);
      } else {
        G.lastResult = `The archive shelves hold a season's worth of formula documentation — rolled, stacked, some filed in labeled tubes that haven't been opened in years. The notation is dense. Cross-references point to volumes not shelved nearby. Without a known-good version to hold beside the current document, any alteration in the binding sequences or component ratios doesn't surface on a single reading. The archive filing index shows the current formula was last revised fourteen months ago — the same window as the doctrine supplements.`;
        addJournal('Formula analysis inconclusive', 'evidence', `fairhaven-craft-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 12. CRAFT TIER 2: SUPPLY DOCUMENT FORGERY DETECTION
  {
    plot: 'main',
    label: "The seals pass a clerk's check. The paper stock is from the wrong year.",
    tags: ['Investigation', 'Craft', 'Forgery', 'Documents', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    failResult: {
      text: "The documents hold up to a surface read: seals pressed cleanly, ink consistent, dates in sequence. Without a confirmed authentic set to lay beside these, any forgery too controlled to catch at a glance won't surface here. The alchemical supplier Thalen received the substituted compounds through this same documentation chain. Delivery receipts are still in the workshop — a parallel set of records from the same forger, a different approach to the same thread.",
      xp: 0,
      effects: [],
      next: [{text: "Thalen's delivery receipts come from the same chain.", skill: 'craft', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'detecting document forgery');
      G.stageProgress[1]++;

      const result = rollD20('spirit', (G.skills.spirit || 0));

      if (result.isCrit) {
        G.lastResult = `The seals are good — good enough to pass a clerk's check. But the paper stock is wrong: the authentic documents use a rag-fiber blend with a faint blue cast; these use a cleaner white pressed sheet that wasn't available in the region two years ago when the oldest forgeries are dated. The signature imitates well but presses too hard at the terminal stroke — a habit the real signatory doesn't have. Someone built this forgery operation with time and access. It has been running long enough to develop signature familiarity and sourced paper that's close, but not exact.`;
        G.stageProgress[1]++;
        addJournal('Craft analysis revealed document forgery operation', 'evidence', `fairhaven-craft-forgery-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `A merchant comes around the partition while you're holding two documents side by side. "Those are commercial records." He doesn't raise his voice but he stays in the doorway, the hemp-paper manifest stack on the table between you. The supply authority has heard about it within the hour — word moved faster than you left the building. Someone was handling sealed shipping documents without authorization. Your name is attached to the report, and the scrutiny runs in the same direction as the thread you were following.`;
        G.worldClocks.watchfulness++;
        addJournal('Your document examination reported to supply authority', 'complication', `fairhaven-craft-caught-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Two documents with the same seal — one pressed slightly deeper than the other. The signatures match in style but not in pressure. Either the same person signed on different days under different circumstances, or two people practiced the same signature. Both explanations are worth following. The clerk who logged your access request is watching which documents you return to — the scrutiny is standard but it runs the same direction as the inquiry.`;
        addJournal('Craft analysis found evidence of document alteration', 'evidence', `fairhaven-craft-alteration-${G.dayCount}`);
      } else {
        G.lastResult = `The documents hold up to a surface read — seals pressed cleanly, signatures consistent in style, dates in the expected sequence. Ink color matches across pages. The clerk's hand is steady throughout. Hemp-paper manifests stack neatly in the tray beside the filing drawer, the same stock used for public supply records at the coordination board. Without a reference set of confirmed authentic materials to lay beside these, the forgery — if present — is too controlled to catch at a glance. The alchemical supplier Thalen received the substituted compounds through the same documentation chain — delivery receipts are still in the workshop.`;
        addJournal('Document authenticity assessment inconclusive', 'evidence', `fairhaven-craft-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 13. LORE TIER 1: GLYPH HISTORY AND DOCTRINE
  {
    plot: 'main',
    label: "The old texts called it a threshold. The new pamphlets call it a wall.",
    tags: ['Investigation', 'Lore', 'History', 'Doctrine', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    failResult: {
      text: "Three centuries of records in a warped wooden case, three scribal hands, the oldest documents requiring the lid lifted at an angle to open. The glyph cave appears across all eras — framed differently in each, the danger calibrated to whoever was writing. Distinguishing deliberate revision from natural theological drift requires a full comparative timeline, not a single afternoon. The current pamphlets cite a doctrine council session from fourteen months ago. That session's minutes are filed with the regional shrine authority.",
      xp: 0,
      effects: [],
      next: [{text: 'The regional shrine authority holds the doctrine council minutes.', skill: 'wits', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'glyph doctrine analysis');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0));

      if (result.isCrit) {
        G.lastResult = `The older texts treat the glyph cave as a threshold — harrowing, requiring preparation, but crossable by those who knew the markers. The current doctrine, written into the standard teaching pamphlets distributed to households over the last fourteen months, calls it an absolute barrier and describes the danger as intensifying. No corresponding event or glyph survey is cited. The escalation in the texts is not matched by any recorded change in cave conditions — only by a change in who is writing about it.`;
        G.stageProgress[1]++;
        addJournal('Lore analysis revealed exaggerated glyph doctrine', 'evidence', `fairhaven-lore-glyph-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Incense from the main hall drifts into the records corridor — cedar and something sharper beneath it. The Shrine Keeper intercepts the request at the records desk before the archivist can respond. "Doctrinal interpretation belongs to approved spiritual guides. External review is not permitted." The words arrive without heat, which is worse than anger. A notation goes into the register beside your name — pen moving steadily, no hesitation in the hand. The records room stays locked for the rest of the day. Your interest in the old texts has now drawn attention from the Shrine Keeper personally.`;
        G.worldClocks.reverence++;
        addJournal('Shrine restricts your access to doctrine records', 'complication', `fairhaven-lore-restricted-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The old teaching texts and the current pamphlets don't describe the same cave. Older sources — pre-dating the current shrine administration by two generations — frame the glyph formations as a threshold, dangerous but passable by those trained to read the markers. The newer pamphlets, distributed to households over the past fourteen months, mandate full avoidance without qualification or recourse. The shift is documented and consistent. What's absent is any recorded event that would explain it: no survey, no incident report, no doctrinal council. The cause behind the change isn't recorded anywhere accessible here.`;
        addJournal('Lore analysis noted doctrine intensification', 'evidence', `fairhaven-lore-intensified-${G.dayCount}`);
      } else {
        G.lastResult = `Three centuries of doctrinal record, three different scribal hands, the oldest documents stored in a wooden case with a warped lid that requires lifting at an angle. The glyph cave appears in every era — described differently, framed differently, the danger calibrated to whoever was writing. Tracing a deliberate revision against natural theological drift requires a full comparative timeline. The current pamphlets cite a doctrine council session from fourteen months ago as their authority — that council's minutes are filed with the regional shrine authority.`;
        addJournal('Glyph doctrine history analysis inconclusive', 'evidence', `fairhaven-lore-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 14. LORE TIER 2: FAITH VS NECESSITY PHILOSOPHY
  {
    plot: 'main',
    label: "The founding texts treated a failed harvest as a logistical problem. The supplements don't.",
    tags: ['Investigation', 'Lore', 'Philosophy', 'Doctrine', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    failResult: {
      text: "Reading table, candles, founding texts alongside supplements issued in the last eighteen months — the older volumes smell of linen storage, the newer ones of fresh pressing. Both describe the same community and the same obligations. The weight given to hardship is different in each. Whether that difference is theological development or deliberate revision, the archive alone can't settle. The eight supplements were distributed through the same sealed-letter channel that authorized the garrison reductions. That correspondence link is the thread.",
      xp: 0,
      effects: [],
      next: [{text: 'The sealed-letter distribution channel connects doctrine to garrison orders.', skill: 'wits', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'tracing philosophical inversion');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0));

      if (result.isCrit) {
        G.lastResult = `The founding texts are unambiguous: faith and practical provision were treated as the same obligation — a blessed harvest was proof of right relationship with the divine, and a failed harvest demanded both prayer and better technique. The current instructional texts, circulated as supplements over the past eighteen months, reframe this. Provision is now subordinated to devotion. A shortage is recast as spiritual testing rather than logistical failure. The shift is consistent across eight separate documents — not one author reconsidering, but a coordinated revision that arrived at the same conclusion through different stated paths.`;
        G.stageProgress[1]++;
        addJournal('Lore analysis revealed philosophical inversion', 'evidence', `fairhaven-lore-philosophy-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `A keeper appears at the reading room door before you've finished the second document. "External review of theological foundations is not a scholarly matter — it's a doctrinal one. The shrine handles doctrine." Cedar from the compound burner follows her in from the outer hall. Your access pass is marked restricted with a notation that names the specific documents you were reading. The keeper waits while you pack your notes, hands folded, expression carrying the flat patience of someone who expects compliance and has no personal investment in whether it's given willingly.`;
        G.worldClocks.reverence++;
        addJournal('Shrine restricts your philosophical research as heretical', 'complication', `fairhaven-lore-heresy-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The older texts and the newer supplements don't agree on the relationship between faith and provision. Founding doctrine holds both as the same obligation — prayer and better technique in equal measure. The supplements, circulated over the past eighteen months, subordinate provision to devotion: a shortage recast as spiritual testing, not logistical failure. The supplements are more recent and significantly more emphatic. The change in emphasis is consistent enough across eight documents to merit a clearer answer — but asking for the distribution source draws attention from the regional shrine hierarchy.`;
        addJournal('Lore research confirmed philosophical shift', 'evidence', `fairhaven-lore-shift-${G.dayCount}`);
      } else {
        G.lastResult = `Reading table, three candles, a stack of supplements issued in the last eighteen months alongside founding texts that predate the shrine's current administration. The older documents carry the smell of linen storage; their edges have the soft wear of long handling. The newer ones smell of fresh pressing, the paper stiffer, the ink bolder. Both describe the same community, the same obligations, but a different weight given to hardship and its causes. The eight supplements were all issued through the same external channel — the regional shrine authority's sealed letter distribution. The same letters that authorized the garrison reductions.`;
        addJournal('Philosophical analysis inconclusive', 'evidence', `fairhaven-lore-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== GOSSIP & TENSION LAYERS (4 CHOICES) ==========

  // 15. STREET RUMOR: SUPPLIES DISAPPEARING AND FAITH FAILING
  {
    plot: 'main',
    label: "The same complaint at every bench in the Sunflower Market, said below a raised voice.",
    tags: ['Investigation', 'Rumor', 'Social', 'Gossip', 'Meaningful'],
    xpReward: 65,
    stageProgress: 1,
    failResult: {
      text: "The Sunflower Market carries its own murmur — a farmer at the grain stall, a family near the well, the bench crowd by the notice board. Today they're talking about the festival calendar adjustment, the late season, the mill road re-grading. Ordinary complaints. Whatever is being said about the shortages and the shrine is being said in private, in households, not in earshot of a stranger. The broker Maris has been in this community long enough to be trusted with the version that doesn't circulate publicly.",
      xp: 0,
      effects: [],
      next: [{text: "Maris knows what the market says privately.", skill: 'charm', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'parsing market-level grievance');
      G.stageProgress[1]++;

      const rumor = [
        'tools are breaking when we need them most',
        'food supplies are disappearing before we can eat them',
        'the blessed items aren\'t protecting us anymore',
        'something from outside is taking our resources',
        'the shrine is preparing for something we don\'t know about'
      ];
      const selected = rumor[Math.floor(Math.random() * rumor.length)];

      G.lastResult = `At the Sunflower Market, the day's murmur carries this: "${selected}." A farmer by the grain stall says it to his neighbor without lowering his voice — the kind of statement that's stopped being a secret and started being a shared condition. Three benches by the well. Nobody sitting. The practical failures are visible everywhere; the thread connecting them hasn't been named out loud yet.`;
      addJournal(`Street rumor gathered: "${selected}"`, 'evidence', `fairhaven-rumor-${G.dayCount}`);

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 16. PRACTICAL FAILURE: TOOL BREAKS AT CRITICAL MOMENT
  {
    plot: 'main',
    label: "A plow snaps mid-furrow. Three weeks old. The rune seam was never fully seated.",
    tags: ['Investigation', 'Evidence', 'Failure', 'Personal', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    failResult: {
      text: "The break is clean — at the seam rather than through the material. Without a reference copy of the production formula beside the fragment, nothing in the rune seam alone distinguishes deliberate from accidental failure. The farmer retrieves the pieces without comment, the matter closed by routine and exhaustion. Halverd the tool craftsman worked from the same component source and has documented the pattern across his whole production run. His workshop is the place to take this fragment.",
      xp: 0,
      effects: [],
      next: [{text: "Halverd's production run shows the same seam failure.", skill: 'craft', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'documenting critical failure');
      G.stageProgress[1]++;

      const result = rollD20('vigor', (G.skills.vigor || 0));

      if (result.isCrit) {
        G.lastResult = `The plow snaps mid-furrow with a sound like a short word being cut off. The farmer stands in the turned earth for a moment before he kneels. "New enchantment," he says — not to you, to himself. "Three weeks old." The rune seam has separated cleanly: not stress fracture, not overload, but a binding that was never fully seated. You find the gap in the third rune of the anchor sequence. Someone removed a component from the formula and left the rest intact enough to pass production check. The tool was finished. It just wasn't meant to last.`;
        G.stageProgress[1]++;
        addJournal('Tool failure documented as deliberate manufacturing defect', 'evidence', `fairhaven-failure-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `You crouch to look at the fragments and three people stop what they're doing to watch. "Why are you picking at it?" one of them asks. It isn't hostile — it's the question of a community that has learned not to draw attention to its own problems. Brine off the dock planking carries on the morning air, the ordinary smell of a port day. Someone carries word to the mill road before the afternoon is out, and the description includes what you were doing with the broken rune seam.`;
        G.worldClocks.watchfulness++;
        addJournal('Your inquiry into tool failure reported as suspicious', 'complication', `fairhaven-failure-suspicious-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The break is too clean for impact fracture — no radiating cracks, no compression deformation at the stress point, no lateral spread through the metal. The rune seam separated along its own line, as if the binding between the enchantment and the tool face simply stopped holding. Whether the enchantment was incomplete from production or degraded since installation, the fragments don't carry enough of the original anchor sequence to say. The failure is documented, the pattern is specific, and the cause needs a comparison against the production formula to close the gap.`;
        addJournal('Tool failure analysis suggests intentional defect', 'evidence', `fairhaven-failure-intentional-${G.dayCount}`);
      } else {
        G.lastResult = `The tool snapped under load — a clean break, the kind that comes at the seam rather than through the material. Dock planking nearby carries the brine smell of the morning tide, the north channel breeze moving through the furrows. The rune seam along the blade edge is intact; the failure is at the anchor notch, where binding meets tool face. The break pattern is consistent with both age and manufacturing variance; without a reference copy of the production formula to lay beside it, there's no way to determine whether the anchor sequence was complete when the tool left the workshop. A comparison to the enchantment formula would settle it.`;
        addJournal('Tool failure cause unclear', 'evidence', `fairhaven-failure-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 17. SUPPLY CRISIS: COMMUNITY APPROACHING SCARCITY
  {
    plot: 'main',
    label: "Every household carries the same problem. None of them names it the same way.",
    tags: ['Investigation', 'Evidence', 'Crisis', 'Personal', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    failResult: {
      text: "Doors stay mostly closed. The ones that open offer the usual deflections — everything is fine, the shrine provides guidance, this is not the season for complaints. Three different households, the same phrasing, the same note struck. Whatever the community has decided to say to outsiders, they decided it together. The salt air off the dock planking, the rope coil at the factor's door — the ordinary texture of a morning that isn't ordinary. The widow near the south well has been here long enough to speak plainly. She's lived through the last three lean seasons.",
      xp: 0,
      effects: [],
      next: [{text: "The widow near the south well remembers the lean seasons before this one.", skill: 'charm', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'gathering community impact testimony');
      G.stageProgress[1]++;

      const result = rollD20('charm', (G.skills.charm || 0));

      if (result.isCrit) {
        G.lastResult = `A widow near the south well is rationing grain that, by any prior season's standard, should still be plentiful. A cobbler on the mill road can't source leather in a region with functioning tanneries two days' travel away. A mother counts her family's winter provisions aloud while you listen — she's done the arithmetic before; the numbers haven't changed. Each one, when asked what changed, says some version of the same thing: "The shrine says this is what faith requires." They aren't resigned. They're complying with an explanation someone gave them for something they didn't cause.`;
        G.stageProgress[1]++;
        addJournal('Community impact testimony documented systematic scarcity', 'evidence', `fairhaven-crisis-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The first family you approach pulls back mid-sentence. "We manage fine." The second answers in shorter words than they started with — the same shortening that happens when a conversation has been had before and ended badly. By the third door, someone's watching from across the lane, rope coil at their hip, not working it. Morning fog off the north channel sits in the alley between. Fairhaven has learned that talking about shortage draws the wrong kind of attention. They stop before they get to the part that matters, and the stopping is practiced.`;
        G.worldClocks.watchfulness++;
        addJournal('Community becomes defensive about scarcity inquiry', 'complication', `fairhaven-crisis-defensive-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Several households admit things are tighter than expected this season — tools wearing out, supplies arriving late or short. They describe it as weather, as bad luck, as normal variation. Each household is carrying its own version of a problem that is the same problem. And each one noticed the same thing: you're the first person to come asking how their particular version connects to the others'.`;
        addJournal('Community scarcity concerns documented', 'evidence', `fairhaven-crisis-concern-${G.dayCount}`);
      } else {
        G.lastResult = `Salt air off the dock planking, a rope coil hanging by a factor's door, morning fog off the water still clinging to the east wall of the market. Doors stay mostly closed. The ones that open offer polite deflections — everything is fine, the shrine provides guidance, this is not the season for complaints. The phrasing is too consistent for coincidence, the same note struck in three different households in the same two-hour span. Whatever the community has decided to say to outsiders, they settled on it together and they settled on it recently. The broker Maris has been in this community long enough to be trusted with the version that isn't said to strangers.`;
        addJournal('Community scarcity concerns remain unspoken', 'evidence', `fairhaven-crisis-silent-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 18. INSTITUTIONAL WEAPONIZATION: DOCTRINE SERVES SABOTAGE
  {
    plot: 'main',
    questId: 'q_s1_close',
    label: "Laid out together, they stop being coincidences. Every institution bent the same direction, same window.",
    tags: ['Investigation', 'Proof', 'Systematic', 'Conspiracy', 'Confrontation', 'Meaningful'],
    xpReward: 80,
    stageProgress: 1,
    effects: [
      { type: 'heat', polity: 'sheresh', amount: 1 },
      { type: 'rival', amount: 1 }
    ],
    failResult: {
      text: "The pieces are present but not yet speaking to each other clearly. Supply failure at the provisioner, formula change at the workshop, doctrine revision from the shrine — each one has an explanation available in isolation. A bad season, a sourcing adjustment, a theological refinement. The pattern that connects them into something coordinated requires one more link. The garrison reduction orders were each dated seven days after a doctrine supplement went out. That timing record is filed with the shrine administration.",
      xp: 0,
      effects: [],
      next: [{text: 'The timing of the reduction orders against the doctrine supplements.', skill: 'wits', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(80, 'exposing institutional weaponization');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0));

      if (result.isCrit) {
        G.lastResult = `Laid out together — the formula records, the supply manifests, the garrison reduction orders, the doctrine supplements, the community testimony, the broken plow — they stop being coincidences. Every institution in Fairhaven has been adjusted in the same direction over the same fourteen-month period: each change reducing practical capacity while a doctrinal justification was provided for accepting it. The knowledge required to do this was specific and internal. Whoever coordinated it understood Fairhaven's systems well enough to find the tolerance in each one — the place where a change wouldn't trigger immediate resistance.`;
        G.stageProgress[1]++;
        addJournal('Institutional weaponization conspiracy documented', 'evidence', `fairhaven-conspiracy-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Someone delivers the message in person — not a letter, not a runner. A man you haven't spoken to stands at the edge of the market square and waits for you to notice him. When you do, he says three words: "Stop. Final warning." Then he walks away without looking back. Whoever is running this operation knows you've been compiling.`;
        G.worldClocks.pressure++;
        addJournal('Conspiracy operators directly threaten your inquiry', 'complication', `fairhaven-conspiracy-threat-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `The evidence points consistently in one direction. Laid against each other on the manifest table, the institutional changes take on a shape: doctrine revision first, supply rerouting a week later, garrison reduction following the doctrine's circulation in households. The timing is too precise for drift. There is a sequence here, and the sequence was authored. The final link — what ties the coordination to a specific originating source — is still missing. The pressure of assembling this openly is real: the pattern is visible to anyone watchful enough to look at the same table.`;
        addJournal('Substantial weaponization evidence compiled', 'evidence', `fairhaven-conspiracy-substantial-${G.dayCount}`);
      } else {
        G.lastResult = `The pieces are present but not yet speaking to each other clearly. Supply failure at the provisioner, formula change at the workshop, doctrine revision from the shrine — each one has an explanation available in isolation. A bad season, a sourcing adjustment, a theological refinement. Rope and brine from the dock road, the ordinary smell of a port town carrying on. The pattern that connects them into something coordinated requires one more thread, one link that makes the coincidence stop being possible. That thread is close. It isn't in hand yet.`;
        addJournal('Conspiracy pattern visible but evidence incomplete', 'evidence', `fairhaven-conspiracy-partial-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== EXPANSION CHOICES ==========

  // 19. CLUE: FORMULA SUBSTITUTION RECORD
  {
    label: "The order and receipt cite the same authorization. Only one of them is real.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 72,
    failResult: {
      text: "The supply records are present and in order — order slips, delivery receipts, authorization codes along the margin. The delivery receipt cites a regional administrative code that isn't in the reference guide on this shelf. The correct guide would cross-reference it. Without the right reference document, the code doesn't resolve. The Shrine Keeper received the same authorization codes in sealed letters from the regional hierarchy. Those letters are logged in the shrine's incoming correspondence register.",
      xp: 0,
      effects: [],
      next: [{text: 'The shrine correspondence register holds the same authorization codes.', skill: 'wits', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'comparing formula supply records');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('wits', (G.skills.wits || 0));
      if (result.total >= 13) {
        G.lastResult = `The order specifies traditional compound ingredients exactly. The delivery receipt stamps it "equivalent substitution approved — regional materials update." That category exists in the administrative codex. The shrine's own policy register, filed separately, shows no regional materials update was ever ratified. The authorization cites a category that was never enacted. Someone wrote a policy-shaped entry into the system that pointed to nothing behind it.`;
        if (!G.flags) G.flags = {};
        G.flags.found_formula_substitution = true;
        addJournal('Formula substitution: ghost authorization category used — no backing policy, substitution inserted covertly', 'evidence', `fairhaven-formula-${G.dayCount}`);
      } else {
        G.lastResult = `The supply records are present and in order — order slips, delivery receipts, authorization codes along the margin. The delivery receipt cites a regional administrative code that isn't in the reference guide on the shelf. The correct guide would cross-reference it. This one doesn't cover that category. The Shrine Keeper received the same authorization codes in sealed letters from the regional hierarchy — those letters are logged in the shrine's incoming correspondence register.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 20. CLUE: GARRISON REDUCTION ORDERS
  {
    label: "Three reduction orders. Each one dated seven days after a doctrine supplement went out.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 68,
    failResult: {
      text: "The orders are filed with the garrison administration. The duty archivist is away from the desk — expected back after the afternoon bell. The timing pattern the orders carry is visible on a single page if you can get the three together. Captain Vren has a copy in his posting records; he filed a written objection to the first reduction and kept the documentation. His quarters are at the north end of the garrison row.",
      xp: 0,
      effects: [],
      next: [{text: "Vren kept copies of his written objections to each reduction.", skill: 'charm', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'reviewing garrison reduction orders');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

        G.lastResult = `Three reduction orders. Each one dated seven days after a shrine doctrine revision was distributed to households. First the doctrine circulates, then the garrison shrinks — consistently, three times in a row. Whatever resistance might have formed around the reductions had a week to be softened by the doctrinal framing first. The doctrine wasn't released alongside the garrison orders. It was released before them, on purpose.`;
      if (!G.flags) G.flags = {};
      G.flags.found_garrison_timing = true;
      addJournal('Garrison reductions followed doctrine revisions by one week — sequenced destabilization confirmed', 'evidence', `fairhaven-garrison-timing-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 21. ARCHETYPE-GATED: READING FAIRHAVEN
  {
    label: "The morning gathering has a shape. It isn't the shape of a community at rest.",
    tags: ['Investigation', 'Archetype', 'Stage1', 'Meaningful'],
    xpReward: 67,
    failResult: {
      text: "The gathering disperses before a pattern settles. Families move in the ordinary way of people with work waiting — stalls to open, loads to shift, children to hand off. The compound smell from the shrine burner lingers on clothing as people pass. Whatever shape the morning gathering holds, it requires more time inside it to read. The eight elders who stay after the public ceremony has cleared work from memory, no text in hand. They know what this community looked like before.",
      xp: 0,
      effects: [],
      next: [{text: 'The elders who stay after the gathering carry the older shape.', skill: 'charm', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(67, 'reading shrine community gathering');
      const arch = G.archetype && G.archetype.group;

      if (arch === 'combat') {
        G.lastResult = `The community arranges itself by household without being instructed to. Old defense instinct — clusters of known-trust around a central point, backs toward walls, sight lines kept clear. They haven't formed a line or spread out. They've formed a defensive pattern. The compound smell from the shrine burner drifts over them as they settle, cedar with something heavier underneath. Their bodies remember something their doctrine is telling them to forget. The shape they've made is the shape of people who expect something to come from outside.`;
      } else if (arch === 'magic') {
        G.lastResult = `The compound smoke from the shrine burner moves differently than the doctrinal text describes — flatter, slower to disperse, heavier on the back of the throat than incense has any reason to be. The community breathes it and settles. Not the quiet of people at rest, but the quiet of weight bearing down from the outside. Shoulders lower. Arguments that were forming don't complete. The formula substitution isn't just adulterated supply — it's behaviorally active in the ritual context. This community isn't choosing acceptance of hardship. The choice is being made for them, burnt off a grate every morning.`;
      } else if (arch === 'stealth') {
        G.lastResult = `Three people at the gathering are watching the crowd, not participating. They're positioned at different angles to cover the full gathering without overlap. When someone in the crowd shows agitation — a whispered argument, a child pulling at an adult's sleeve — one of the watchers moves toward the situation before the shrine keeper does. They move unhurriedly, the way people move when they've done this many times. Pre-emptive social management. The gathering has embedded monitors, and those monitors have been at this long enough to look like neighbors.`;
      } else {
        G.lastResult = `Two families don't speak to each other despite standing adjacent. Old alliance from before the resource shortages — readable in the posture, the slight tilt of recognition that stops short of greeting. They've been separated by something recent. Morning fog off the north channel drifts through the gathering square, the kind of cold that makes people stand closer together; these two groups leave a gap between them. Whatever divided them happened in the past season. Resource allocation disputes fracture communities this way: gradually, quietly, at the household level, in the space between neighbors.`;
      }
      addJournal('Shrine gathering: pharmacological sedation via compound, embedded monitors, household fractures from resource pressure', 'evidence', `fairhaven-gathering-read-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 22. FACTION SEED: OVERSIGHT COLLEGIUM CONTACT
  {
    label: "The Collegium has a correspondent here. She's been waiting for hard evidence.",
    tags: ['Faction', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 68,
    failResult: {
      text: "The civic registry lists a Collegium address on the east lane — a handwritten addition, ink slightly different from the surrounding entries. The building is a cooperage. Barrel staves along the front wall, new-cut oak smell. The owner hasn't heard of anyone by that description and doesn't look like he's being careful when he says so. Either the listing is out of date, or the person it points to doesn't want to be found through that route. The goods trader on the mill road stocks soap and dried lemon peel — an unusual product combination for Fairhaven's supply lines.",
      xp: 0,
      effects: [],
      next: [{text: 'The goods trader on the mill road has an unusual product line.', skill: 'charm', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'making Oversight Collegium contact');
      if (!G.factionHostility) G.factionHostility = { warden_order: 0, iron_compact: 0, oversight_collegium: 0 };

      const result = rollD20('vigor', (G.skills.vigor || 0));
      if (result.total >= 11) {
        G.lastResult = `Collegium correspondent Avel Prenn runs a small goods trade as cover — soap, tied twine, dried lemon peel. She talks to you while rewrapping an already-wrapped bar of soap, seam aligned on the underside each time. "The doctrine revisions are being reported to us as voluntary community spiritual development. The Collegium hasn't categorized them as a compliance concern yet." The soap goes into the display stack, seam down. "I've been waiting for hard evidence of coordination." Formula substitution data would move the assessment from monitoring to investigating.`;
        if (!G.flags) G.flags = {};
        G.flags.met_oversight_collegium_fairhaven = true;
        G.factionHostility.oversight_collegium += 1;
        addJournal('Oversight Collegium correspondent Avel Prenn: monitoring Fairhaven, needs hard evidence to trigger formal inquiry', 'intelligence', `fairhaven-collegium-${G.dayCount}`);
      } else {
        G.lastResult = `The civic registry lists a Collegium address on the east lane — handwritten addition, the ink slightly different from the surrounding entries, added some time after the original filing. The building is a cooperage. Barrel staves stacked along the front wall, the smell of new-cut oak. The owner hasn't heard of anyone by that description and doesn't look like he's being careful when he says so. Either the listing is out of date, or the person it points to doesn't want to be found through that route.`;
        if (!G.flags) G.flags = {};
        G.flags.sought_oversight_collegium_fairhaven = true;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 23. ATMOSPHERE: THE SHRINE AT DUSK
  {
    label: "Eight people stayed after the gathering cleared. Working from memory, no text.",
    tags: ['WorldColor', 'Lore', 'Stage1', 'Meaningful'],
    xpReward: 50,
    failResult: {
      text: "The shrine empties on schedule. Keepers extinguish the compound burners and sweep the threshold — the same closing sequence, done in the same order, the way a task is done when it has been done ten thousand times. The elders who stayed last time aren't present tonight. The door is held open for the final few worshippers and then pulled shut. Whatever is preserved in memory here surfaces on its own time, not on request. Coming back at the same hour on a different day would be the way to find it.",
      xp: 0,
      effects: [],
      next: [{text: 'The elders appear at irregular intervals. Return at the same hour.', skill: 'vigor', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(50, 'observing shrine after hours');

        G.lastResult = `When the official gathering clears, eight people stay. Older — the kind of old that predates the shrine's current administration. They move through a shorter ceremony, no compound burned, working from memory. No text in hand. They finish in twelve minutes and leave by three different doors. Whatever is being preserved here exists in their bodies, not in any document the shrine currently holds.`;
      addJournal('Shrine after hours: original pre-revision ceremony preserved by memory in elder community members', 'discovery', `fairhaven-shrine-dusk-${G.dayCount}`);
      G.recentOutcomeType = 'explore'; maybeStageAdvance();
    }
  },

  // 24. PERSONAL ARC: THE ELDER KEEPER
  {
    label: "Cassian noticed the compound changed by smell, the first morning. She kept the original batch.",
    tags: ['PersonalArc', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 68,
    failResult: {
      text: "Cassian refills her cup without being asked and doesn't rush the silence. She watches with the patience of someone who has waited out other people's urgency before and found it usually resolves on its own. The jar she mentioned is somewhere in the cabinet behind her. She'll speak plainly when she decides you're the person to speak plainly to. That decision hasn't landed yet. The elder Mira at the north end of the settlement has fewer reasons to be careful with a stranger.",
      xp: 0,
      effects: [],
      next: [{text: "Mira at the north end of the settlement has fewer reasons to guard her words.", skill: 'charm', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'speaking to elder keeper');
      if (!G.flags) G.flags = {};

      const result = rollD20('charm', (G.skills.charm || 0));
      if (result.total >= 11) {
        G.flags.met_elder_cassian = true;
        G.lastResult = `Cassian doesn't rush. She pours two cups of something that isn't the shrine's blend and sits. "The compound changed about a year ago. I noticed at the first morning ceremony. The smell was similar — not the same." Between sentences she draws one slow breath through her nose — not conspicuously, just the way someone orients by scent rather than by sight. "There is a quiet that comes from presence and a quiet that comes from weight. This one presses down." She has a sealed jar from the old batch in a cabinet at home. She'll give it over — "so there's a record of what the original was."`;
        addJournal('Elder Cassian: recognized compound substitution by smell, has original sample, knows the community is being managed', 'intelligence');
      } else {
        G.lastResult = `Cassian is willing enough, but the conversation stalls at anything specific. She refills her cup without being asked and doesn't rush the silence. She watches you with the patience of someone who has waited out other people's urgency before and found it usually resolves on its own. The jar she mentioned is somewhere in that cabinet behind her. She'll speak plainly when she decides you're the person to speak plainly to. That decision hasn't landed yet.`;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // 25. SOCIAL: THE GARRISON SOLDIER WHO STAYED
  {
    label: "Six soldiers stayed after the reduction. All long-posting. All with household knowledge.",
    tags: ['Social', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 65,
    failResult: {
      text: "Nyse gives the shortest answer available. \"Orders.\" She keeps her position against the post, arms loose, watching to see if you'll push it. The square behind her is quiet — a market day that ended early. She waits long enough to make clear she hopes you won't. There are five other soldiers who stayed. All long-posting, all with four or more years in this community. The one at the mill road checkpoint is further from the captain's eyeline.",
      xp: 0,
      effects: [],
      next: [{text: 'The soldier at the mill road checkpoint is further from oversight.', skill: 'charm', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(65, 'interviewing retained garrison soldier');

      const result = rollD20('charm', (G.skills.charm || 0));
      if (result.total >= 10) {
        if (!G.flags) G.flags = {};
        G.flags.met_nyse_garrison = true;
        G.lastResult = `Nyse leans against the post and glances up the square before she answers — left, right, the same sweep, habit worn into reflex. "Six of us stayed. All long-posting. I've been here four years." A beat. "They said they needed people who knew the local households. For continuity." She doesn't say it as a criticism. She's describing a thing she accepted without fully naming what it is. The six who stayed are the ones who'd recognize a face and know which household it belonged to.`;
        addJournal('Corporal Nyse: retained specifically for community knowledge — long-term soldiers being used as surveillance assets', 'intelligence');
      } else {
        G.lastResult = `Nyse gives the shortest answer available. "Orders." She keeps her position against the post, arms loose, watching you to see if you'll push it. The square behind her is quiet — a market day that ended early. She waits long enough to make clear she hopes you won't. Whatever she knows about the six who stayed, she's decided this morning isn't the time to share it.`;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // 26. SHADOW RIVAL INTRO
  {
    label: "Someone left before arrival carrying a supply sample case. Not nervous about it.",
    tags: ['Rival', 'Warning', 'Stage1', 'Meaningful'],
    xpReward: 55,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(55, 'receiving rival warning');
      if (!G.flags) G.flags = {};

      const arch = G.archetype && G.archetype.group;
      if (arch === 'combat') {
        G.lastResult = `"Military bearing," the traveler says. "Moved like someone who has the road to themselves by right. Wasn't nervous about the sample case — carried it openly, the way you carry something when carrying it openly is its own cover." The morning fog off the north channel was still thick when they left; the traveler watched them go and didn't think twice until afterward. A senior operative transporting verified evidence in plain sight. They've already completed what you're still beginning, and they left unhurried.`;
      } else if (arch === 'magic') {
        G.lastResult = `"Carried the sample case with both hands, carefully," the traveler says. "Like something fragile. But the case was sealed, not padded — the kind of seal you use when the contents need to stay inert, not intact." The distinction is precise and the traveler didn't know they were making it. Someone is carrying the original compound sample — or a sample of the substituted formula — out of Fairhaven for analysis elsewhere. They're already at the laboratory stage, with material in hand.`;
      } else if (arch === 'stealth') {
        G.lastResult = `"Walked like they were counting their steps," the traveler says. "Looked back twice on the main road, once when they thought no one was watching. Spotted me watching them on the second check — gave me a nod, like it was expected." The nod is the detail that matters: not alarm, not evasion, but acknowledgment. Counter-surveillance habits worn smooth enough to pass as ordinary caution. This person is professionally careful, they know they're carrying something that matters, and they've made peace with being seen.`;
      } else {
        G.lastResult = `"Friendly," the traveler says. "Asked about my route, whether I'd noticed anything unusual in Fairhaven, offered good directions. Very helpful. And then I realized afterward that the whole conversation was them gathering information, not giving it. Everything I got from them was things I'd have found out anyway." A social operator who left the encounter balanced, nothing owed. They extracted a traveler's full local knowledge without it registering as extraction. That kind of ease takes practice and a specific kind of patience.`;
      }

      G.lastResult += ` They were in Fairhaven before you and they left with something.`;
      if (!G.rivalId) {
        if (arch === 'combat') G.rivalId = 'warden_captain';
        else if (arch === 'magic') G.rivalId = 'archivist_veld';
        else if (arch === 'stealth') G.rivalId = 'shadow_broker';
        else G.rivalId = 'provost_lenn';
      }
      G.flags.stage1_rival_seeded = true;
      addJournal('Rival-adjacent operative departed Fairhaven with supply sample before your arrival', 'complication', `fairhaven-rival-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },
  // TYPE: PRESSURE — WORLD COLOR VIGNETTE
  {
    label: "Boats still come at the same hour. The dock records don't reflect it.",
    tags: ['WorldColor', 'Atmosphere', 'Stage1'],
    xpReward: 38,
    failResult: function() {
      addNarration('', 'The fishing fleet has moved on with the tide before you reach the harbor coordination board — the fields and farm carts cut across your route from the upper market and slow you to a midday crawl. The catch-volume entries are pinned for the day; the boats won\'t return until the evening run.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(38, 'observing Fairhaven dock rhythms');
      G.lastResult = `The fishing boats return on the tide as they always have — the same families, the same berths, the smell of salt and cleaned fish on the planking by midmorning. The dock records, posted on the coordination board at the harbor end, show lower catch volumes than what came in. Three boats logged at sixty percent of what you watched them offload. The discrepancy isn't hidden: anyone who stands at the dock and watches and then reads the board will see it. The community doesn't look at the board anymore. They stopped trusting it before they stopped watching.`;
      G.recentOutcomeType = 'observe'; maybeStageAdvance();
    }
  },

  // TYPE: PRESSURE — ARCHETYPE GATE (Healer — Support family)
  {
    plot: 'main',
    label: "The children show a nutritional pattern that takes months of inadequate provision to develop.",
    tags: ['Pressure', 'ArchetypeGate', 'Stage1'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      const family = typeof getArchetypeFamily === 'function' ? getArchetypeFamily(G.archetype) : '';
      if (family !== 'support') {
        G.lastResult = `The children in Fairhaven look thinner than a seasonal lean would explain. Their energy runs low by midday, faces pale in the afternoon light that comes off the water. The grain-store smell from the upper provisioner's window carries warmth when it should carry cool damp — wrong conditions for stored food. The observation is clear enough; without the training to read nutritional patterns, the cause stays out of reach.`;
        gainXp(30, 'noting Fairhaven child nutrition pattern');
        G.recentOutcomeType = 'observe'; maybeStageAdvance(); return;
      }
      gainXp(70, 'assessing Fairhaven community nutrition');
      G.stageProgress[1]++;
      G.lastResult = `The pattern is specific: fatigue at midday, pale nail beds, a particular quality of dullness in the skin that comes from sustained protein shortfall rather than acute hunger. This isn't a bad week or a hard month — this took time to develop. Four months minimum based on presentation. The community has been under provisioned long enough that it's written in the children's bodies. Whatever the shrine's doctrine says about sufficiency and spiritual testing, the bodies don't support the narrative.`;
      if (!G.flags) G.flags = {};
      G.flags.fairhaven_nutrition_assessed = true;
      addJournal('Fairhaven community: sustained protein shortfall in children, 4+ month development timeline — physical evidence contradicts sufficiency doctrine', 'evidence', `fairhaven-nutrition-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // TYPE: PRESSURE — BACKGROUND FLAVOR
  {
    label: "The harbor master's logbook has two numbering systems. One is for something else.",
    tags: ['Pressure', 'Background', 'Stage1'],
    xpReward: 55,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(55, 'examining harbor master logbook structure');
      const bg = G.background || '';
      let result = `The harbor master's logbook runs with two distinct entry number series: a standard sequential series beginning with H- for public dock entries, and a second series beginning with R- that appears irregularly, interspersed with the H- entries but never posted on the coordination board. R-series entries occupy roughly one in six pages. The harbor master pages past them without comment when showing the log.`;
      if (bg === 'sailor' || bg === 'merchant' || bg === 'trader') {
        result = `R-prefix entries in harbor logs are a practice from the old regional reserve fleet system — vessels operating under direct Compact authorization that bypassed standard port administration. The reserve fleet was dissolved eleven years ago. R-series entries shouldn't exist in any active logbook. Either the harbor master has been using a dead classification system out of habit, or R-series entries are currently being used to register vessels that someone wants excluded from the standard public record.`;
      }
      G.lastResult = result;
      addJournal('Fairhaven harbor log: two entry series — H- public, R- unpublished, one in six pages — R-prefix in use despite reserve fleet dissolution', 'evidence', `fairhaven-harbor-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

{
  label: 'The notice board has recent postings.',
  tags: ['social'],
  xpReward: 5,
  failResult: {
    text: "The board holds the usual run of notices — a lost goat, a trading post that closed last month and hasn't been taken down, a festival date that passed. Nothing current. The harbor coordination board at the dock end is updated each morning by the harbor master's clerk. It carries arrival records, routing changes, and the occasional waypoint advisory. More recent than this one.",
    xp: 0,
    effects: [],
    next: [{text: 'The harbor board is updated every morning.', skill: 'wits', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
  },
  fn: function() {
    var key = 'rumor_drawn_' + G.location + '_' + G.dayCount;
    if (G.flags[key]) {
      G.lastResult = 'The board has nothing new since this morning. A drainage maintenance advisory is still posted from last week, its lower edge curled from the north channel damp. A quota reminder for the autumn yield period occupies the center column, ink slightly faded from the morning light off the harbor. The east wall contract board at the market shows the same postings as yesterday. Nothing on either board that wasn\'t there an hour ago.';
      return;
    }
    G.flags[key] = true;
    drawLocalityRumor(G.location);
  }
},

  // ========== SUPPRESSION THREADING (Phase 6D) ==========

  // 6D: Posted notice with blank date field
  {
    plot: 'main',
    label: "The notice is current — the date field was left empty on purpose.",
    tags: ['Records', 'Observation', 'Survey'],
    xpReward: 55,
    stageProgress: 1,
    failResult: "The posting board outside the mill quarter is bare — the morning notices have been cleared and the afternoon batch is not yet pinned. The commune posts on a twice-daily rotation; whatever was there this morning is already filed.",
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(55, 'found undated official notice on Fairhaven posting board');
      G.stageProgress[1]++;
      G.lastResult = "The posting board outside the mill assessor's office carries twelve notices. Eleven have dates — day, month, season marker, assessor's initial. The twelfth is current: the ink is fresh, the paper is dry, the content is administrative and specific, describing a boundary survey conducted along the eastern field corridor. The date field is blank. Not faded, not water-damaged — simply not filled in. The assessor's initial appears at the bottom. The survey apparently happened on no particular day. No one has marked the omission or pulled the notice down.";
      addJournal('Fairhaven mill quarter posting board: one current notice with deliberately blank date field — content specific, assessor-initialled, but undated. Source: mill assessor\'s office exterior board.', 'evidence');
      G.recentOutcomeType = 'observe';
      maybeStageAdvance();
    }
  }
];

// Sideplot injection — fairhaven meadow mill displacement opening hook
(function() {
  var _millHook = (typeof FAIRHAVEN_MEADOW_MILL_DISPLACEMENT !== 'undefined') ? FAIRHAVEN_MEADOW_MILL_DISPLACEMENT.openingHook() : null;
  if (_millHook) FAIRHAVEN_STAGE1_ENRICHED_CHOICES.push(_millHook);
})();

// Sideplot injection — fairhaven meadow mill displacement rung 2 (condition evaluated lazily)
(function() {
  var _rung2 = (typeof FAIRHAVEN_MEADOW_MILL_DISPLACEMENT !== 'undefined') ? FAIRHAVEN_MEADOW_MILL_DISPLACEMENT.rung2Hook() : null;
  if (_rung2) FAIRHAVEN_STAGE1_ENRICHED_CHOICES.push(_rung2);
})();

// ── ARCHETYPE-EXCLUSIVE CHOICES ──────────────────────────────
FAIRHAVEN_STAGE1_ENRICHED_CHOICES.push(

  // COMBAT x2
  {
    archetypeGroup: 'combat',
    plot: 'main',
    label: "The berth locks from this side. One tide window before enforcers reach the dock.",
    tags: ['Combat', 'Risk', 'Direct'],
    xpReward: 65,
    stageProgress: 1,
    failResult: {
      text: 'The berth lock is a double-bar system and the second bar has rusted into the bracket. You get the first bar clear before the harbor enforcers come around the dock shed corner. Two of them, armed with boarding pikes. The berth stays locked and the enforcers have your description in the log before the tide turns.',
      xp: 0,
      effects: [],
      next: [{text: 'Clear the area before the enforcers complete their report.', skill: 'finesse', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'forcing locked berth before tide');
      G.stageProgress[1]++;

      var result = rollD20('combat', (G.skills.might || 0));
      var target = 14;

      if (result.isCrit) {
        G.lastResult = 'Both bars clear in under forty seconds and the berth gate swings before the tide window closes. The vessel inside is not the one on the harbor manifest — it is flying an independent merchant pennant but the hull markings belong to a Cosmouth house brig that was reported as delayed in the outer channel. Inside the berth shed: a cargo manifest on a nail, handwritten, for goods that match the description of the three alchemical shipments Maris the broker said were diverted. The manifest is dated two days ago. The shipments were logged as lost at sea six weeks ago.';
        G.stageProgress[1]++;
        addJournal('Forced berth entry — vessel inside is misidentified Cosmouth brig; cargo matches broker\'s diverted alchemical shipment description; manifest dated 2 days ago, goods logged lost 6 weeks ago', 'evidence');
      } else if (result.isFumble) {
        G.lastResult = 'The first bar clears and the second does not. You have your shoulder against the second bar when the enforcers\' voices come around the dock shed corner — not checking the berth specifically, just the standard circuit, but at the wrong moment. You get the bar back into the bracket before they round the corner. The berth looks untouched. Your hands smell of rust and salt-iron and the enforcer closest to you pauses for two seconds before moving on. He noted something. You do not know what.';
        addJournal('Berth access attempt failed — enforcer paused during circuit; possible notation', 'complication');
      } else if (result.total >= target) {
        G.lastResult = 'The berth opens on the second attempt. Inside: a loaded vessel, hatch sealed, with a cargo declaration slip pinned to the rigging. The declaration is for standard fishing equipment — nets, line, ballast stone. The vessel sits low in the water for fishing equipment. Low the way a vessel sits when its hold contains something denser than nets. The harbor log across the dock shed shows this berth as assigned to a registered fishing concern. The vessel has no fishing marks on the hull.';
        addJournal('Forced berth entry — vessel sits too low for declared fishing cargo; no fishing marks on hull; berth assigned to registered fishing concern', 'evidence');
      } else {
        G.lastResult = 'The berth opens. Inside: an empty vessel, recently vacated — the mooring lines are still damp from recent adjustment and a clay lamp on the dock bollard is still warm. Whatever was in this berth left within the past hour. The harbor manifest has this berth listed as occupied by a vessel that does not match the dimensions of the one in front of you. The vessel that was here is gone. The tide that would carry it out began forty minutes ago.';
        addJournal('Forced berth — vessel inside wrong dimensions for manifest entry; previous occupant departed within past hour', 'discovery');
      }

      G.recentOutcomeType = 'action';
      maybeStageAdvance();
    }
  },

  {
    archetypeGroup: 'combat',
    plot: 'main',
    label: "Three harbor enforcers, one dock. They want me off this pier.",
    tags: ['Combat', 'Confrontation', 'Direct'],
    xpReward: 65,
    stageProgress: 1,
    failResult: {
      text: 'Three harbor enforcers is a confrontation that ends one way on a public dock — with you in the harbor authority log and the pier cleared. You withdraw before it becomes a formal report and settle for watching the dock from the warehouse row. Whatever the pier conceals, a direct approach is closed for this tide cycle.',
      xp: 0,
      effects: [],
      next: [{text: 'Watch from the warehouse row until the tide changes and the enforcers rotate.', skill: 'vigor', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'holding position against harbor enforcers');
      G.stageProgress[1]++;

      var result = rollD20('combat', (G.skills.might || 0));
      var target = 14;

      if (result.isCrit) {
        G.lastResult = 'The enforcers read the situation correctly and the lead one holds up a hand — the universal gesture for \'this is not worth it.\' They move off the pier without writing anything down. In the window that creates, a dock worker who has been watching from the warehouse threshold crosses to you with purpose. He was waiting for exactly this outcome. He puts a folded slip of paper in your hand and walks back without speaking. The slip has a berth number and a time: two hours before dawn, berth seven. \'Come alone. The harbor master knows about the manifest.\' The dock worker is gone before you unfold the slip completely.';
        G.stageProgress[1]++;
        addJournal('Dock workers signaled after enforcer standoff — paper slip: berth 7, pre-dawn meeting; harbor master knows about manifest', 'evidence');
      } else if (result.isFumble) {
        G.lastResult = 'The lead enforcer does not back down and the other two spread out to cut the angles. This is a practiced formation and they use it quickly. You disengage without a physical confrontation but the withdrawal is not clean — a dock worker has already started running toward the harbor master\'s office. By the time you reach the warehouse row, the harbor master\'s bell has rung twice: the signal for a pier security incident. Your description is in the pier log.';
        G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
        addJournal('Enforcer standoff escalated — harbor master security bell rung twice; description in pier log', 'complication');
      } else if (result.total >= target) {
        G.lastResult = 'Two of the three enforcers step back when the lead one holds. The lead one holds because you have not moved. It becomes a question of whether he wants to write the report that would follow from this, and after eight seconds he decides he does not. The pier stays yours. The berth at the end of the pier has a vessel with its cargo hatch open and a manifest board on the dock cleat that shows a consignment reference matching the broker\'s diverted supply figures. The hatch workers are watching you from inside.';
        addJournal('Held pier position against enforcers — manifest board on dock cleat matches broker\'s diverted supply reference', 'evidence');
      } else {
        G.lastResult = 'The lead enforcer holds when you do not move. He does not write the report. But he does not leave either — he takes a position at the pier gate that is not quite blocking and watches. The pier is technically accessible and practically surveilled. You can reach the far berth but not work the scene without the enforcer logging every minute of it. You learn what you can from distance: the vessel in berth six has been moored for three tides without cargo movement, which is unusual for a vessel that the manifest shows as loaded and ready.';
        addJournal('Pier access gained under enforcer surveillance — berth 6 vessel moored 3 tides without cargo movement; manifest shows loaded and ready', 'discovery');
      }

      G.recentOutcomeType = 'action';
      maybeStageAdvance();
    }
  },

  // MAGIC x2
  {
    archetypeGroup: 'magic',
    plot: 'main',
    label: "Tide patterns don\'t repeat like this unless something upstream is holding them.",
    tags: ['Magic', 'Lore', 'Observation'],
    xpReward: 65,
    stageProgress: 1,
    failResult: {
      text: 'The tide observation requires a fixed reference point above the waterline, and the only usable one — the harbor authority\'s tidal marker post — has a restricted access radius marked in chalk on the dock. Harbor authority chalk is enforced. The marker post readings are logged and posted at the harbor gate each morning, which gives an indirect route to the same information.',
      xp: 0,
      effects: [],
      next: [{text: 'Read the harbor gate tide log instead of the marker post directly.', skill: 'wits', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'reading tide patterns for unlogged shipment window');
      G.stageProgress[1]++;

      var result = rollD20('lore', (G.skills.wits || 0));
      var target = 13;

      if (result.isCrit) {
        G.lastResult = 'The tide pattern has an eleven-minute anomaly that repeats every third cycle. In natural harbor conditions, the tidal rhythm should be consistent to within two minutes. An eleven-minute drift that repeats precisely is artificial — something is holding the tide at that phase, the way a weir holds river water. The effect is localized to the northern harbor channel. A vessel navigating in that eleven-minute window would move through harbor waters without registering on the standard tidal arrival log, which uses the main channel marker as its reference. The northern channel bypass is effectively invisible to the harbor record.';
        G.stageProgress[1]++;
        addJournal('Tide anomaly: 11-minute artificial hold in northern channel, repeating every 3rd cycle — vessels in this window invisible to main-channel tidal arrival log', 'evidence');
      } else if (result.isFumble) {
        G.lastResult = 'The tide reading requires a calm surface for the resonance baseline and the harbor is running chop from a wind change. The reading is noisy and you spend twenty minutes on a baseline that a clear day would resolve in five. The harbor master\'s assistant, making her morning circuit, stops to watch you work. She does not ask what you are measuring. She does not need to. The harbor authority logs unusual activity at the tidal marker. Your presence at the marker is unusual.';
        addJournal('Tide reading attempt degraded by chop — harbor authority assistant observed and logged unusual activity at marker', 'complication');
      } else if (result.total >= target) {
        G.lastResult = 'The tide phase for the past three weeks shows a repeating anomaly in the northern channel — a brief period of reduced current that does not match the standard astronomical tidal model for this harbor. The anomaly is consistent and scheduled, which means it is not natural variation. A vessel that knew the timing could enter the northern channel in that window without triggering the harbor gate sensors, which key off current velocity. The anomaly window is twelve minutes wide. It has been present for exactly twenty-one days.';
        addJournal('Northern channel tidal anomaly: 12-minute reduced-current window, consistent for 21 days — harbor gate sensors trigger off current velocity; window is a potential unlogged entry route', 'evidence');
      } else {
        G.lastResult = 'The tide readings show a minor but consistent variance in the northern channel — the current runs slightly slower than the main harbor model predicts, and the variance is periodic rather than random. It is not a major anomaly; a harbor pilot who had been running this approach for years might not notice it. But it is regular and it has been regular for at least the past month, based on the marker readings. Whoever is using this harbor knows its timing better than the official tide charts do.';
        addJournal('Northern channel tidal variance identified — periodic, consistent, at least one month old; suggests detailed local knowledge of timing', 'discovery');
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  {
    archetypeGroup: 'magic',
    plot: 'main',
    label: "Harbor registry markings in the margin. Those aren\'t notations — they\'re a secondary script.",
    tags: ['Magic', 'Lore', 'Records'],
    xpReward: 65,
    stageProgress: 1,
    failResult: {
      text: 'The harbor registry is in the morning session and the reading room is at capacity — four clerks working the current manifests and no open counter space. The marginal markings are visible from the queue but not at a usable reading distance. The afternoon session opens the archive copies, which may carry the same script if it was applied before filing.',
      xp: 0,
      effects: [],
      next: [{text: 'Return for the afternoon archive session when counter space is available.', skill: 'wits', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'decoding secondary script in harbor registry margin');
      G.stageProgress[1]++;

      var result = rollD20('lore', (G.skills.wits || 0));
      var target = 13;

      if (result.isCrit) {
        G.lastResult = 'The marginal script is a notation system layered over the standard harbor registry shorthand. Each entry has two sets of marks: the visible registry notation and a secondary layer written in a compressed script that uses standard registry symbols in non-standard combinations. The secondary script is a running record of discrepancies between the declared manifests and what the notation author actually observed. Three entries for the current month describe cargo that was logged as one thing and arrived as another. The last entry ends mid-sentence with a date three weeks ago. The archivist who wrote the secondary script has not added to it since that date.';
        G.stageProgress[1]++;
        addJournal('Harbor registry margin script decoded — secondary notation records observed vs declared cargo discrepancies; author stopped 3 weeks ago mid-sentence', 'evidence');
      } else if (result.isFumble) {
        G.lastResult = 'The secondary script uses a compression technique that requires a reference grammar to decode accurately. You work through it for thirty minutes and produce a partial reading that contains two words you are confident of — \'berth\' and \'authorization\' — and a reference number you cannot place. The archive clerk notices the extended session on the same page and comes over. She does not ask what you are reading. She does offer to pull the \'registry explanatory notes\' for that section. The offer is not a threat. It is a very careful offer.';
        addJournal('Harbor registry secondary script partially decoded — two words recovered; archivist offered registry explanatory notes', 'complication');
      } else if (result.total >= target) {
        G.lastResult = 'The marginal script is a dual-register notation: standard registry marks on the surface, compressed shorthand underneath using modified registry symbols. The compression is from a regional maritime tradition — a harbor pilot\'s personal notation system, designed to fit additional information in the registry margin without a separate document. Three entries carry both layers. In the secondary layer, two of the three show discrepancies between the declared cargo and the observed arrival. One entry simply reads: \'authorization not harbor master.\' It is the most recent entry in the section.';
        addJournal('Harbor registry dual-register notation: secondary layer shows cargo discrepancies and one entry reading "authorization not harbor master"', 'evidence');
      } else {
        G.lastResult = 'The marginal script is readable as a secondary layer but the compression technique requires more context than this single registry page provides. What you can determine: the secondary script appears on entries from the past three weeks, not before. It was added after the primary registry entries were written. Whoever added it had access to the closed registry during non-session hours. The script is in a different hand from the primary registry clerk.';
        addJournal('Harbor registry secondary script confirmed as post-entry addition — 3 weeks, different hand, added in non-session hours', 'discovery');
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // STEALTH x2
  {
    archetypeGroup: 'stealth',
    plot: 'main',
    label: "Harbor log checkpoint opens in thirty seconds. Two dockworkers between me and the gate.",
    tags: ['Stealth', 'Covert', 'Risk'],
    xpReward: 65,
    stageProgress: 1,
    failResult: {
      text: 'The harbor log checkpoint opens before the two dockworkers clear the gate. One of them is signing something at the log desk when you reach the gate angle. You have to pull back and wait on the dock side. The log entry window closes before the dockworkers finish. Your movement through the gate will be in the next log cycle.',
      xp: 0,
      effects: [],
      next: [{text: 'Wait for the next log cycle gap and retime the approach.', skill: 'finesse', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'slipping through harbor log checkpoint unlogged');
      G.stageProgress[1]++;

      var result = rollD20('stealth', (G.skills.finesse || 0));
      var target = 15;

      if (result.isCrit) {
        G.lastResult = 'Through the gate in the twelve-second window between dockworkers and log clerk — unlogged, no entry. Inside the dock section: the berths that do not appear in the public harbor manifest. Three of them, in the northern row, with vessels moored at tide but no dock assignment boards posted. One vessel has a cargo declaration slip in a deck cleat — the slip carries the same consignment reference as the supply chain diversion records from the chapel quarter. The goods logged as alchemical supplies bound for the chapel are in this berth, not at sea.';
        G.stageProgress[1]++;
        addJournal('Unlogged gate entry — 3 unregistered northern berths; one vessel cargo declaration matches chapel alchemical supply diversion reference', 'evidence');
      } else if (result.isFumble) {
        G.lastResult = 'The dockworker signing at the log desk looks up when you pass the gate. He does not call out. He writes something on the log page. The harbor log checkpoint clerk, who has been watching the dock side, turns to see what the dockworker wrote. You are inside the gate and the log clerk is reading. You do not know what was written. But you are inside a restricted dock section with a log entry against you, and the clerk is still reading it.';
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
        addJournal('Gate passage logged by observant dockworker — clerk read entry; presence in restricted dock section recorded', 'complication');
      } else if (result.total >= target) {
        G.lastResult = 'Through the gate between log cycles. The restricted dock section is quieter than the public berths — only two active mooring lines, both on the northern row. The vessels here do not have the standard dock assignment boards that the public berths require. One has a manifest board facing inward — you can see it but not read it from the dock edge without boarding. The absence of dock assignment boards means these berths are either authorized through a non-standard process or they are simply not logged.';
        addJournal('Unlogged entry — restricted dock section has vessels with inward-facing manifests and no dock assignment boards', 'evidence');
      } else {
        G.lastResult = 'Inside the gate without a log entry. The dock section is smaller than the public berths suggested — two rows, six berths, three occupied. The occupied berths have tide ropes but no dock workers on the dock side. All three vessels are running dark — no lanterns lit on deck during a moored dock period, which is a harbor authority violation for any vessel with crew aboard. They are either empty or the crew is below. The harbor log does not know you came through. It also does not know these three vessels are this way.';
        addJournal('Restricted dock section entered unlogged — 3 vessels moored dark with no dock workers; harbor authority violation', 'discovery');
      }

      G.recentOutcomeType = 'action';
      maybeStageAdvance();
    }
  },

  {
    archetypeGroup: 'stealth',
    plot: 'main',
    label: "Guarded vessel, second berth from the end. Watch rotation has a gap at the stern.",
    tags: ['Stealth', 'Covert', 'Risk'],
    xpReward: 65,
    stageProgress: 1,
    failResult: {
      text: 'The gap at the stern is narrower than it appeared from the warehouse row — the second watch is running a tighter circuit than the first, and the overlap catches you at the gangplank. You are off the gangplank and back on the dock before the watch reaches the stern corner, but the motion on the gangplank is visible from the dock gate. Someone at the gate saw the movement. You do not know who.',
      xp: 0,
      effects: [],
      next: [{text: 'Clear the dock area before the gate watcher acts on what they saw.', skill: 'finesse', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'boarding guarded vessel at stern watch gap');
      G.stageProgress[1]++;

      var result = rollD20('stealth', (G.skills.finesse || 0));
      var target = 15;

      if (result.isCrit) {
        G.lastResult = 'Aboard and below decks in the stern gap window. The hold is partially loaded — three cargo tiers, two sealed with harbor authority stamps, one unsealed. The unsealed tier holds crates with markings that match the supply chain description from the broker\'s records: alchemical materials, chapel-supply grade. The harbor authority stamps on the sealed tiers are genuine but the stamp dates are wrong — dated four days before the vessel arrived in Fairhaven. Stamps cannot precede arrival. These were prepared in advance and applied to cargo that was already here.';
        G.stageProgress[1]++;
        addJournal('Boarded guarded vessel — hold has pre-dated harbor authority stamps (4 days before arrival) and unsealed alchemical crates matching broker supply description', 'evidence');
      } else if (result.isFumble) {
        G.lastResult = 'The stern gap closes early — the watch rotation is not what you mapped. The second watch comes around the stern corner eight seconds ahead of schedule and you are on the gangplank. You go into the water between the vessel and the dock. It is cold, salt-dark, and close. You come up against the dock piling and hold there for six minutes while the watch finishes the stern circuit. You are wet, you are in the harbor water, and you have not reached the vessel. The watch did not look over the rail. You do not know why.';
        addJournal('Vessel boarding failed — fell into harbor water; watch rotation tighter than mapped', 'complication');
      } else if (result.total >= target) {
        G.lastResult = 'Aboard in the gap window. Deck level only — the below-hatch is dogged shut from the inside, which means someone is below while the watch is topside. The deck cargo manifest is pinned to the mast housing. It lists six categories of standard fishing equipment. The vessel has no fishing equipment visible on deck — no nets, no line coils, no bait barrels. The manifest and the deck are in complete disagreement. Someone wrote this manifest for a different vessel or for a different purpose.';
        addJournal('Boarded vessel deck — manifest lists fishing equipment; none present on deck; hatch dogged from inside', 'evidence');
      } else {
        G.lastResult = 'Aboard at the gap and immediately aware that the hold hatch has a second watch on the other side — footsteps moving below, close to the hatch. You cannot go below. The deck manifest is accessible. It is a standard harbor registry form, correctly completed, with one anomaly: the vessel registration number in the upper corner does not match the hull number painted on the stern. You read both numbers before the stern gap closes and the watch comes back around.';
        addJournal('Boarded vessel deck — vessel registration number on manifest does not match stern hull number', 'discovery');
      }

      G.recentOutcomeType = 'action';
      maybeStageAdvance();
    }
  },

  // SUPPORT x2
  {
    archetypeGroup: 'support',
    plot: 'main',
    label: "Dock workers are watching the harbor clerk. They know what a timed distraction costs.",
    tags: ['Support', 'NPC', 'Coordination'],
    xpReward: 65,
    stageProgress: 1,
    failResult: {
      text: 'The dock workers are willing but not unified — three different opinions on timing and two on method. The conversation takes long enough that the harbor clerk\'s shift rotation ends naturally and a replacement takes the desk. The distraction opportunity closes because the moment passed while you were arranging it. The dock workers disperse without incident. Nothing was risked. Nothing was gained.',
      xp: 0,
      effects: [],
      next: [{text: 'Wait for the next clerk rotation and a simpler distraction opportunity.', skill: 'charm', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'coordinating dock worker distraction');
      G.stageProgress[1]++;

      var result = rollD20('persuasion', (G.skills.charm || 0));
      var target = 13;

      if (result.isCrit) {
        G.lastResult = 'The dock workers execute it cleanly — a cargo dispute at the gate that requires the harbor clerk to come out from behind the desk and physically arbitrate. Three minutes of organized noise. You have the manifest ledger open and photographed by the second minute. The third minute gives you the second ledger section, the one the clerk keeps under the desk rather than in the open stack. Under-desk manifests in a harbor registry are always the ones that need protecting. The section you found there records berth allocations that have no corresponding vessel entries in the main log. Twelve allocations. Twelve vessels that the log does not know about.';
        G.stageProgress[1]++;
        addJournal('Dock worker distraction: accessed under-desk manifest section — 12 berth allocations with no corresponding vessel entries in main log', 'evidence');
      } else if (result.isFumble) {
        G.lastResult = 'The dock workers start the distraction before the timing is right — one of them misread the signal. The harbor clerk looks up at the gate noise and calls for a second clerk rather than going out herself. Two clerks and a closed desk means the distraction just doubled the audience watching the manifest area. You cannot move toward the manifests. The distraction ends without achieving anything and the clerk who stayed at the desk writes a short note — probably about the unusual gate noise.';
        addJournal('Dock worker distraction mistimed — second clerk called; manifest area now double-staffed', 'complication');
      } else if (result.total >= target) {
        G.lastResult = 'Clean execution — the harbor clerk goes to the gate for the cargo dispute and you have ninety seconds at the open ledger. The northern berth allocation section for the current month shows three entries marked with a red stamp you do not recognize. The stamp says \'priority routing\' in harbor registry shorthand. Priority routing entries are not in the public manifest index. The three entries correspond to dates when the broker reported supply diversions. Same dates, same approximate quantities.';
        addJournal('Dock distraction: 3 northern berth entries stamped \'priority routing\' not in public index; dates match broker-reported supply diversions', 'evidence');
      } else {
        G.lastResult = 'The distraction works well enough. The harbor clerk goes to the gate. You have sixty seconds at the open manifest before she starts back. The current-month berth section is open in front of you. There are fewer entries than a busy harbor should produce — gaps that look like editing, not slow periods. The entries around the gaps are intact, cleanly written. Whatever was removed was removed carefully, with the surrounding entries left in place. Someone cleaned the record and left the cleanup invisible.';
        addJournal('Distraction window: harbor berth manifest has editing gaps — surrounding entries intact; careful record cleaning', 'discovery');
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  {
    archetypeGroup: 'support',
    plot: 'main',
    label: "The harbor clerk flagged this discrepancy himself. No one has listened.",
    tags: ['Support', 'NPC', 'Persuasion'],
    xpReward: 65,
    stageProgress: 1,
    failResult: {
      text: 'The harbor clerk is at the midpoint of a filing cycle and he cannot pause it — the tide window for that cycle closes in twenty minutes and the entries have to be stamped before it does. He acknowledges the question and says he will be available after. After comes and he has moved on to the next cycle. Harbor clerks live in their windows. The space between windows is where conversations happen, and you missed this one.',
      xp: 0,
      effects: [],
      next: [{text: 'Come back between tide cycles when the clerk has a window.', skill: 'charm', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'drawing out clerk\'s flagged discrepancy');
      G.stageProgress[1]++;

      var result = rollD20('persuasion', (G.skills.charm || 0));
      var target = 13;

      if (result.isCrit) {
        G.lastResult = 'Tideon sets down his stamp and turns fully to face you — the first time he has stopped moving since you arrived. "I flagged it in the secondary registry six weeks ago. The flag was acknowledged but never actioned." He opens a drawer and takes out a folded carbon copy — his own copy, the one clerks make when they suspect the official copy will disappear. "Fourteen berth entries with authorization signatures that do not match any factor in the harbor master\'s authorized-factors registry. I have checked seven times." He slides the carbon across the counter. "I stopped asking who would listen. You\'re the first person who asked me."';
        G.stageProgress[1]++;
        addJournal('Harbor clerk produced personal carbon copy — 14 berth entries with authorization signatures not in harbor master\'s authorized-factors registry; flag unactioned for 6 weeks', 'evidence');
      } else if (result.isFumble) {
        G.lastResult = 'Tideon stops what he is doing and takes a long look at who is asking this question. Then he looks at the harbor master\'s office window at the end of the registry building. Then back at the manifest. "I recommend filing a formal harbor inquiry," he says. His voice is completely level. He goes back to his stamp. The look he gave the harbor master\'s office window lasted two seconds and contained something that was not available in the words that followed it.';
        addJournal('Harbor clerk deflected to formal inquiry process — glance at harbor master\'s office noted before deflection', 'discovery');
      } else if (result.total >= target) {
        G.lastResult = 'Tideon keeps his voice low. "I noted it in the secondary register three weeks ago. Fourteen entries." He does not look at the harbor master\'s office. He looks at the manifest in front of him and keeps his hands moving. "The authorization signatures on those entries are not from any factor I can match to the authorized-factors list. I submitted a flag. The flag came back reviewed." He pauses his stamping. "Reviewed means someone read it. I can\'t tell you what they decided." He resumes stamping. He has given you everything he can give you in a room where the walls have windows.';
        addJournal('Clerk confirmed 14 unmatched authorization entries in secondary register; flag returned reviewed with no action noted', 'evidence');
      } else {
        G.lastResult = 'Tideon acknowledges the discrepancy without looking up from his work. "There are anomalies in the berth authorization section. I have noted them." He says it the way someone says a thing they have said many times to many people. He stamps another form. "The appropriate process is a formal harbor inquiry, filed in triplicate, reviewed by the harbor master\'s office." He pauses at the end of the sentence. He does not add anything. The pause is the only commentary he is willing to offer on what the harbor master\'s office review means.';
        addJournal('Harbor clerk acknowledged berth authorization anomalies — directed to formal inquiry; pause at "harbor master\'s office review" noted', 'discovery');
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // SIDEPLOT HOOK: MEADOW MILL DISPLACEMENT
  {
    id: 'fairhaven_sideplot_mill_open',
    label: 'The mill displacement records show dates, not reasons.',
    skill: 'wits',
    tags: ['Records', 'Discovery'],
    plot: 'side',
    condition: function() { return G && G.flags && !G.flags.sideplot_mill_displacement_started; },
    fn: function() {
      G.flags.sideplot_mill_displacement_started = true;
      addNarration('', 'Three families reassigned from meadow mills to harbor district in six weeks. The reassignment orders are stamped but unsigned — authorization without accountability, a record that names what happened without naming who decided it.');
      addJournal('Meadow mill: three families displaced. Reassignment orders unsigned — authorization without accountability.', 'evidence');

      G.lastResult = G.lastResult || 'The work continues.';
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: { text: 'The mill district records office closes at midday. The displacement orders will still be there when it reopens.' }
  }

);

window.FAIRHAVEN_STAGE1_ENRICHED_CHOICES = FAIRHAVEN_STAGE1_ENRICHED_CHOICES;
