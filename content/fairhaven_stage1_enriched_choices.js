/**
 * FAIRHAVEN STAGE 1 ENRICHED MEANINGFUL CHOICES
 * 20 deeply grounded investigation paths tied to supply work and frontier faith
 * Generated for: Faith devotion vs practical necessity, supply security vs glyph danger, commerce vs purity
 * Each choice: 65-80 XP, grounded in specific NPC perspective, layered wrongness reveal
 */

const FAIRHAVEN_STAGE1_ENRICHED_CHOICES = [
  // ========== NPC-GROUNDED CHAINS (8 CHOICES) ==========

  // 1. CHAPEL WORKER: BLESSING EFFICIENCY DEMANDS
  {
    label: "Ask the chapel worker about recent pressure to bless more supplies faster — has the ritual pace changed, and are shortcuts being taken?",
    tags: ['Investigation', 'NPC', 'Faith', 'Ritual', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading blessing pressure');
      G.stageProgress[1]++;

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      const target = 11 + Math.max(0, G.worldClocks.pressure);

      if (result.isCrit) {
        G.lastResult = `Sister Mara keeps her voice low, hands folded tight in her lap. "Blessings used to take a full meditation cycle — preparation, stillness, then the words. Now I'm told to finish in a quarter of that. The ritual authority calls it efficiency." She pauses. "I tried maintaining proper form. They said I was obstructing service. So I cut the meditation. The words are spoken. The form is completed. But something doesn't carry the way it did." She looks at the supply crates stacked by the door. "If I'd said any of this to the Shrine Keeper, I'd have lost my posting by morning."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Chapel worker revealed acceleration of blessing practices', `fairhaven-blessing-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Sister Mara's posture closes off mid-sentence. "The chapel's work isn't subject to outside review." She doesn't raise her voice — she lowers it. By the time you've left the room, a runner has already crossed the courtyard toward the Shrine Keeper's quarters. The chapel bell rings once, out of sequence. Everyone inside knows what that means.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Chapel worker reported your inquiry to shrine authority', `fairhaven-chapel-alert-${G.dayCount}`);
      } else {
        G.lastResult = `Sister Mara admits the blessing pace has changed. "We serve more households now," she says, but her hands move to her prayer cord and stay there. She doesn't explain the new timeline. She doesn't quite meet your eyes. Whatever the ritual authority told her about the change, she hasn't made peace with it.`;
        addJournal('investigation', 'Chapel worker acknowledged acceleration of blessings', `fairhaven-chapel-acceleration-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 2. MARKET BROKER: SUPPLY DIVERSIONS AND PRICE INFLATION
  {
    label: "Question the market broker about supply availability — why are some goods scarce, and are prices being artificially controlled?",
    tags: ['Investigation', 'NPC', 'Commerce', 'Supply', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'tracing supply manipulation');
      G.stageProgress[1]++;

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Kellen draws you past the stacked crates to the back of the stall. "Three weeks ago a grain shipment came in from the south and went straight back out toward Watcher's Perch. Last week, alchemical supplies bound for the chapel ended up at an unmarked waystation north of the glyph cave. I have two witnesses to each." He spreads his hands. "Replacement supplies come back through the same channels at prices nobody was quoting two months ago. Someone upstream is coordinating with the original brokers. This isn't a routing error. Fairhaven is short because Fairhaven is being kept short."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Broker mapped supply diversions and price manipulation', `fairhaven-broker-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Kellen's expression shifts the moment you mention supply routes. "Commercial details stay commercial." He steps back behind his ledger and doesn't look up again. Two stalls down, his partner turns to watch you leave. By the time you reach the notice board, word is already moving through the market row.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Broker suspicious of your supply chain questions', `fairhaven-broker-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Kellen concedes that shipments have been arriving on odd schedules. "Some come late. Some not at all, then double the next week." He calls it market adjustment and doesn't push further. His pen keeps moving across the ledger as he talks, like he's decided not to be in this conversation officially.`;
        addJournal('investigation', 'Broker confirmed unusual supply pattern disruption', `fairhaven-broker-pattern-${G.dayCount}`);
      } else {
        G.lastResult = `Kellen closes the ledger without looking up. "Supply chain specifics are between the parties to the transaction." He says it the way people say things they've rehearsed. The stall is suddenly very busy with tasks that don't require speaking to you.`;
        addJournal('investigation', 'Broker blocked supply chain inquiry', `fairhaven-broker-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 3. ALCHEMICAL SUPPLIER: INGREDIENT QUALITY DEGRADATION
  {
    label: "Visit the alchemical supplier — are the ingredients being stockpiled as quality tests, or are supplies being replaced with inferior alternatives?",
    tags: ['Investigation', 'NPC', 'Craft', 'Supply', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'assessing ingredient authenticity');
      G.stageProgress[1]++;

      const result = rollD20('craft', (G.skills.craft || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Master Thren sets down the pestle and picks up a dried bundle from the nearest shelf. "Moonflower. This came in the last batch, documented as prime grade." He breaks a stem and holds it under your nose — the scent is thin, stretched. "Treated to carry the smell. Potency is maybe forty percent of what I'm paying for." He moves to three other containers in turn, each with the same story. "The paperwork is perfect. Someone put real work into this. And whoever made tools from my materials — they won't know until the binding fails."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Supplier revealed ingredient replacement scheme', `fairhaven-alchemical-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Master Thren steps in front of the shelf rack before you've finished asking. "Proprietary stock. Not for external review." He walks you to the door personally. By the next morning, three other craftspeople on the mill road have heard that a stranger was pressing Thren about his materials sourcing.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Alchemical supplier blocked access and warned community', `fairhaven-alchemical-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The storage shelves hold more variation than they should — two jars labeled the same compound have different sediment lines. Thren watches you notice it and says nothing at first. "Sourcing has been difficult lately," he offers. He doesn't elaborate. He doesn't need to.`;
        addJournal('investigation', 'Craft analysis noted potential ingredient substitution', `fairhaven-alchemical-substitution-${G.dayCount}`);
      } else {
        G.lastResult = `The workshop looks orderly. Without reference samples for side-by-side comparison, any degradation doesn't announce itself. The labels match the contents, at least on the surface.`;
        addJournal('investigation', 'Ingredient quality assessment inconclusive', `fairhaven-alchemical-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 4. FOOD PROVISIONER: STORAGE MANIPULATION AND SPOILAGE
  {
    label: "Question the food provisioner about storage practices — are supplies being kept in unsuitable conditions, or is spoilage being concealed?",
    tags: ['Investigation', 'NPC', 'Supply', 'Storage', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'investigating supply storage');
      G.stageProgress[1]++;

      const result = rollD20('survival', (G.skills.survival || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Old Gareth closes the cellar door behind you and speaks at the wall. "Three weeks ago they moved the grain to the upper stores. Warmer, less air. I told the Shrine Keeper — grain needs cool and dark or it turns. He said the new procedure was spiritually aligned with something. I didn't understand the doctrine. What I understand is that last week's sack had mold on the bottom seam." He pulls it out and holds it up. The smell is unmistakable. "We're not supposed to question the procedure."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Provisioner revealed deliberate storage degradation', `fairhaven-provisioner-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Gareth's eyes go to the door first, then back to you. "Is this the Shrine Keeper checking on my work?" The question isn't aggressive — it's frightened. He reports the conversation before you've left the supply yard. Whatever he's been told about unauthorized questions, the warning stuck.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Provisioner reported your storage inquiry', `fairhaven-provisioner-alert-${G.dayCount}`);
      } else {
        G.lastResult = `Gareth admits the storage location changed recently. "The Shrine Keeper said it was necessary." He shrugs in the way of someone who stopped asking follow-up questions. The upper store smells faintly wrong — not spoiled yet, but moving that direction.`;
        addJournal('investigation', 'Provisioner confirmed storage procedure changes', `fairhaven-provisioner-changes-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 5. TOOL CRAFTSMAN: ENCHANTED TOOL DEGRADATION
  {
    label: "Visit the tool craftsman — are the enchanted tools being produced with weakened enchantments, or are their materials compromised?",
    tags: ['Investigation', 'NPC', 'Craft', 'Tools', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'analyzing tool integrity');
      G.stageProgress[1]++;

      const result = rollD20('craft', (G.skills.craft || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Halverd picks up a plow-blade from the finished rack and hands it over without ceremony. The rune seam runs clean along the edge — but when you press at the binding notch, the metal gives slightly where it shouldn't. "I've been at this thirty years," he says. "The enchantments stopped taking properly four weeks ago. The formulas were changed — key components pulled out. I raised it with the supply authority. They told me the new formula was correct and I should execute it." He takes the blade back. "I know what correct feels like. This isn't it."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Craftsman revealed tool enchantment sabotage', `fairhaven-craftsman-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Halverd sets his hammer down and says nothing for a moment. "Craft methods aren't for outside discussion." He doesn't explain further. He watches you the way a man watches a door he'd rather stayed shut. You leave with nothing and the awareness that he'll remember your face.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Tool craftsman now hostile to external inquiry', `fairhaven-craftsman-hostile-${G.dayCount}`);
      } else {
        G.lastResult = `Halverd allows that durability has been inconsistent lately. "Materials come in different grades," he says — the kind of answer that explains nothing on purpose. He keeps working while he talks. Tools sit in the finished rack behind him, and he doesn't offer to show them.`;
        addJournal('investigation', 'Craftsman confirmed tool quality decline', `fairhaven-craftsman-decline-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 6. GUARD CAPTAIN: GARRISON COMPLACENCY AND REALLOCATION
  {
    label: "Speak with the Watchers' Perch guard captain about garrison operations — are patrols being reduced, or are forces being redirected away from Fairhaven?",
    tags: ['Investigation', 'NPC', 'Defense', 'Military', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'investigating garrison reallocation');
      G.stageProgress[1]++;

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Captain Vren doesn't sit. He stands at the window and counts on his fingers. "I had forty-two posted here a month ago. I have twenty-nine now. Temporary reassignments — that's what the order says. They're not coming back and nobody's confirmed a return date." He turns. "The supply route patrols are running at half schedule. The glyph cave perimeter hasn't had a full circuit since the third week of last month. I put this to the Shrine Keeper in writing. The reply cited doctrine. I don't know which doctrine covers garrison deployment, but apparently one does now."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Guard captain revealed garrison force reduction', `fairhaven-guard-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Captain Vren's voice drops a register. "Garrison operations don't fall under civilian review. Raise this again and I'll restrict your movement within Watchers' Perch." He means it. The two soldiers at the door have already straightened.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Guard captain formally prohibits military inquiry', `fairhaven-guard-warning-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Vren confirms the headcount is down. "Resource reallocation," he says. The phrase sits in the air without conviction. He crosses his arms and doesn't add to it. The duty roster on the wall behind him shows three patrol slots empty.`;
        addJournal('investigation', 'Guard captain confirmed garrison force reduction', `fairhaven-guard-reduction-${G.dayCount}`);
      } else {
        G.lastResult = `Vren gives you a professional nod and nothing useful. "Strategic considerations shape deployment. That's all I can offer." He's already looking past you at the duty roster.`;
        addJournal('investigation', 'Guard captain blocked military inquiry', `fairhaven-guard-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 7. SHRINE KEEPER: DOCTRINE SHIFTS AND EXTERNAL DIRECTION
  {
    label: "Approach the Shrine Keeper directly about recent changes — what's driving shifts in blessing speed, supply procedures, and garrison allocation?",
    tags: ['Investigation', 'NPC', 'Authority', 'Doctrine', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'confronting shrine authority');
      G.stageProgress[1]++;

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Keeper Ilsa doesn't answer immediately. She straightens the offering cloth on the altar, then: "Directives have been arriving through the regional hierarchy. Sealed letters. Blessing procedures, storage protocols, deployment schedules — all framed as spiritual advancement." She sets her hands flat on the altar surface. "I have implemented every one of them. And in the three months since, the town has gotten quieter in a way I don't have doctrine for." She doesn't use the word sabotage. But she doesn't look away either.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Shrine keeper revealed external directive manipulation', `fairhaven-shrine-keeper-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Keeper Ilsa stands. "This conversation is finished. You are not welcome in this chapel." She doesn't shout — the stillness in her voice carries further than shouting would. A novice appears at the side door within thirty seconds. You are escorted out. The doors close behind you with a sound like a lock turning.`;
        G.worldClocks.reverence++;
        addJournal('complication', 'Shrine keeper formally bans you from chapel', `fairhaven-shrine-keeper-ban-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Ilsa acknowledges the changes came through sanctioned channels. "Regional shrine authority." She won't name the specific directive or its author. But she confirms the changes were deliberate — not her interpretation of doctrine, but explicit written instruction.`;
        addJournal('investigation', 'Shrine keeper confirmed deliberate change implementation', `fairhaven-shrine-keeper-deliberate-${G.dayCount}`);
      } else {
        G.lastResult = `"Shrine operations follow doctrine. Changes are made in accordance with guidance received." Ilsa folds her hands and waits for you to leave. The conversation has the texture of a door that closed before you opened it.`;
        addJournal('investigation', 'Shrine keeper blocked further inquiry', `fairhaven-shrine-keeper-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 8. INNKEEPER: SUPPLY ROUTING AND VISITOR PATTERNS
  {
    label: "Question the Gilded Plough innkeeper about supply shipments and recent guests — what routes are supplies taking, and who's coordinating them?",
    tags: ['Investigation', 'NPC', 'Commerce', 'Intelligence', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'mapping supply logistics');
      G.stageProgress[1]++;

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Merrel wipes down the bar and doesn't look up. "Shipments used to come straight from the south. Now they go north first — up through Watcher's Perch, around the glyph cave perimeter. Adds two days minimum." She pauses at a sticky ring on the wood. "A merchant who stayed here last week said there's a waystation out past the cave. Supplies stop there for inspection, he said. Some continue to Fairhaven. Some don't." She sets the cloth down. "The men who came through coordinating it — I couldn't place their accents. None of them were from here."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Innkeeper mapped rerouted supply network', `fairhaven-innkeeper-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Merrel stops what she's doing. "I don't discuss other people's supply arrangements." She turns her back to resume stacking cups. When you try again, she raises her voice just enough for the two men at the corner table to hear. They look over. You take the hint and leave.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Innkeeper now distrustful of your supply questions', `fairhaven-innkeeper-hostile-${G.dayCount}`);
      } else {
        G.lastResult = `Merrel says shipments have been taking longer lately. "More waypoints," she offers. She doesn't elaborate. She's noticed without wanting to have noticed — the kind of awareness that stops short of opinion.`;
        addJournal('investigation', 'Innkeeper confirmed routing changes', `fairhaven-innkeeper-routing-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== ARCHETYPE DEEP DIVES (8 CHOICES) ==========

  // 9. SURVIVAL TIER 1: GLYPH CAVE ACTIVITY MONITORING
  {
    label: "Monitor the glyph cave perimeter — what activity is actually happening there, and is the danger being understated or exaggerated?",
    tags: ['Investigation', 'Survival', 'Glyph', 'Danger', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'glyph cave activity analysis');
      G.stageProgress[1]++;

      const result = rollD20('survival', (G.skills.survival || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The warning posts say stay back. The ground says something else. Boot prints in the clay — multiple sets, different tread, all coming from the same direction and going into the cave. Waystation markers have been repositioned recently; the disturbed soil is fresh. Inside the mouth of the cave: a storage alcove, partially screened by a brush pile that didn't grow there. The glyph cave is being used as a throughpoint. The danger notices are keeping locals away while someone else moves freely through.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Survival analysis revealed glyph cave logistics operation', `fairhaven-survival-glyph-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `A Watchers' Perch soldier steps out from behind the rock formation to your left. "This area is restricted. Safety reasons." He doesn't explain which safety reasons. Two more emerge from the brush. You're walked back to the road without your notes and with a formal warning logged against your name.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'You are escorted away from glyph cave perimeter', `fairhaven-survival-caught-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Boot tracks in the clay, a repositioned marker, a stretch of ground that's been walked recently and often. The cave perimeter is being used by someone — not wandered past, used. The danger warnings don't account for that pattern.`;
        addJournal('investigation', 'Survival analysis noted cave access patterns', `fairhaven-survival-pattern-${G.dayCount}`);
      } else {
        G.lastResult = `The glyph formations near the mouth are active — a low hum in the stone, hair standing at the wrist. Whatever activity happens here doesn't leave traces that survive the ambient disturbance. Nothing readable at this distance.`;
        addJournal('investigation', 'Glyph cave remains a genuine threat', `fairhaven-survival-danger-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 10. SURVIVAL TIER 2: HIDDEN WAYSTATION DISCOVERY
  {
    label: "Search the area around the glyph cave for hidden waystations or supply caches — where are redirected supplies being held?",
    tags: ['Investigation', 'Survival', 'Supply', 'Hidden', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'locating hidden supply network');
      G.stageProgress[1]++;

      const result = rollD20('survival', (G.skills.survival || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The shielded cave sits forty paces past the posted perimeter, screened on three sides by a natural shelf of rock. Inside: stacked crates, a grain cache, a locked document box with a broken hasp — someone left in a hurry. The shipping manifests still inside show Fairhaven quantities crossing off the expected destination and picking up a new routing mark. Contracts in two languages cover what gets stored here and where it continues. This isn't improvised. The shelving is fixed. The drainage channel in the floor was cut deliberately. The operation has been running long enough to build infrastructure.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Survival analysis located hidden supply waystation', `fairhaven-survival-waystation-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Three Watcher personnel step out from the rocky ground to your north — they were already there, watching the search area. "You're inside a restricted zone." One of them has a ledger. They log your name and the time before they escort you out. The formal warning is already written by the time you reach the road.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'You are caught trespassing in glyph cave area', `fairhaven-survival-caught-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `A cleared section under a rock shelf — ground pressed flat by repeated foot traffic, a faint chemical smell on the air. Something has been stored here recently and moved. The depression in the dirt holds the outline of stacked crates. The waystation exists, but it's been emptied or relocated.`;
        addJournal('investigation', 'Survival analysis found evidence of hidden storage', `fairhaven-survival-hidden-${G.dayCount}`);
      } else {
        G.lastResult = `The glyph interference scrambles any consistent read of the terrain. The brush is thick and the rock formations break line of sight every twenty paces. If a waystation is out here, it's not findable on a single pass without a cleaner approach.`;
        addJournal('investigation', 'Waystation search inconclusive', `fairhaven-survival-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 11. CRAFT TIER 1: ENCHANTMENT FORMULA ANALYSIS
  {
    label: "Examine the enchantment formulas being used for tools and blessed items — have the magical structures been deliberately weakened?",
    tags: ['Investigation', 'Craft', 'Magic', 'Enchantment', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'enchantment formula analysis');
      G.stageProgress[1]++;

      const result = rollD20('craft', (G.skills.craft || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The current formula and the archive copy sit side by side on the reading table. Six differences. Each one pulls a binding component or shifts an activation rune just far enough to reduce efficacy without making the enchantment visibly fail during production. The changes require someone who knew exactly where the formula had tolerance — where you could degrade performance without triggering the craftsperson's check. Whoever rewrote this understood Fairhaven's enchantment practice from the inside.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Craft analysis revealed formula sabotage', `fairhaven-craft-formula-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `A Shrine Keeper comes through the archive door before you've finished the first comparison. "These documents are not for outside examination." She doesn't wait for a response — she closes the folder and holds the door. You're out of the archives, and the latch clicks behind you. The keeper's face says the conversation will go higher than she is.`;
        G.worldClocks.reverence++;
        addJournal('complication', 'You are removed from shrine archives for formula inquiry', `fairhaven-craft-expelled-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The current formula is not the same document as the one filed three seasons ago. The differences are small — a substituted component here, an altered rune notation there. Whether that's revision or corruption requires a more complete comparison than the time here allows.`;
        addJournal('investigation', 'Craft analysis noted formula modification patterns', `fairhaven-craft-modification-${G.dayCount}`);
      } else {
        G.lastResult = `The formula notation is dense and the reference archive is disorganized. Without a known-good version to hold beside it, the changes — if any — don't surface on a single reading.`;
        addJournal('investigation', 'Formula analysis inconclusive', `fairhaven-craft-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 12. CRAFT TIER 2: SUPPLY DOCUMENT FORGERY DETECTION
  {
    label: "Examine shipping documents and supply manifestos — are they being forged to hide diversions, or are authenticity markers being faked?",
    tags: ['Investigation', 'Craft', 'Forgery', 'Documents', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'detecting document forgery');
      G.stageProgress[1]++;

      const result = rollD20('craft', (G.skills.craft || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The seals are good — good enough to pass a clerk's check. But the paper stock is wrong: the authentic documents use a rag-fiber blend with a faint blue cast; these use a cleaner white pressed sheet that wasn't available in the region two years ago when the oldest forgeries are dated. The signature imitates well but presses too hard at the terminal stroke — a habit the real signatory doesn't have. Someone built this forgery operation with time and access. It has been running long enough to develop signature familiarity and sourced paper that's close, but not exact.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Craft analysis revealed document forgery operation', `fairhaven-craft-forgery-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `A merchant comes around the partition while you're holding two documents side by side. "Those are commercial records." He doesn't raise his voice but he stays in the doorway. Within the hour, the supply authority has heard that someone was handling sealed shipping documents without authorization. Your name is attached.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Your document examination reported to supply authority', `fairhaven-craft-caught-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Two documents with the same seal — one pressed slightly deeper than the other. The signatures match in style but not in pressure. Either the same person signed on different days under different circumstances, or two people practiced the same signature. Both explanations are worth following.`;
        addJournal('investigation', 'Craft analysis found evidence of document alteration', `fairhaven-craft-alteration-${G.dayCount}`);
      } else {
        G.lastResult = `The documents hold up to a surface read. Without a reference set of confirmed authentic materials, the forgery — if present — is too controlled to catch at a glance.`;
        addJournal('investigation', 'Document authenticity assessment inconclusive', `fairhaven-craft-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 13. LORE TIER 1: GLYPH HISTORY AND DOCTRINE
  {
    label: "Research what the glyph cave represents in Fairhaven doctrine — has the spiritual understanding of the glyph danger been deliberately altered?",
    tags: ['Investigation', 'Lore', 'History', 'Doctrine', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'glyph doctrine analysis');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The older texts treat the glyph cave as a threshold — harrowing, requiring preparation, but crossable by those who knew the markers. The current doctrine, written into the standard teaching pamphlets distributed to households over the last fourteen months, calls it an absolute barrier and describes the danger as intensifying. No corresponding event or glyph survey is cited. The escalation in the texts is not matched by any recorded change in cave conditions — only by a change in who is writing about it.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Lore analysis revealed exaggerated glyph doctrine', `fairhaven-lore-glyph-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The Shrine Keeper intercepts the request at the records desk. "Doctrinal interpretation belongs to approved spiritual guides. External review is not permitted." A notation goes into the register beside your name. The records room stays locked for the rest of the day.`;
        G.worldClocks.reverence++;
        addJournal('complication', 'Shrine restricts your access to doctrine records', `fairhaven-lore-restricted-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The old teaching texts and the current pamphlets don't describe the same cave. The older sources mention managed danger. The newer ones mandate avoidance without qualification. The shift is documented; the cause behind it isn't recorded anywhere accessible here.`;
        addJournal('investigation', 'Lore analysis noted doctrine intensification', `fairhaven-lore-intensified-${G.dayCount}`);
      } else {
        G.lastResult = `The doctrinal record on the glyph cave spans three centuries and three different scribal traditions. Tracing a deliberate change versus natural theological drift requires cross-referencing that's not possible from this archive alone.`;
        addJournal('investigation', 'Glyph doctrine history analysis inconclusive', `fairhaven-lore-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 14. LORE TIER 2: FAITH VS NECESSITY PHILOSOPHY
  {
    label: "Research Fairhaven's foundational philosophy — how has the balance between faith devotion and practical survival been reframed?",
    tags: ['Investigation', 'Lore', 'Philosophy', 'Doctrine', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'tracing philosophical inversion');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The founding texts are unambiguous: faith and practical provision were treated as the same obligation — a blessed harvest was proof of right relationship with the divine, and a failed harvest demanded both prayer and better technique. The current instructional texts, circulated as supplements over the past eighteen months, reframe this. Provision is now subordinated to devotion. A shortage is recast as spiritual testing rather than logistical failure. The shift is consistent across eight separate documents — not one author reconsidering, but a coordinated revision that arrived at the same conclusion through different stated paths.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Lore analysis revealed philosophical inversion', `fairhaven-lore-philosophy-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `A keeper appears at the reading room door before you've finished the second document. "External review of theological foundations is not a scholarly matter — it's a doctrinal one. The shrine handles doctrine." Your access pass is marked restricted. The keeper waits while you pack your notes.`;
        G.worldClocks.reverence++;
        addJournal('complication', 'Shrine restricts your philosophical research as heretical', `fairhaven-lore-heresy-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The older texts and the newer supplements don't agree on the relationship between faith and provision. The supplements are more recent and more emphatic. Whether that's theological development or rewriting is a distinction the archive doesn't resolve on its own.`;
        addJournal('investigation', 'Lore research confirmed philosophical shift', `fairhaven-lore-shift-${G.dayCount}`);
      } else {
        G.lastResult = `Theological evolution in a living community is hard to distinguish from deliberate rewriting — both look like change. Without a full comparative timeline, this reading doesn't settle the question.`;
        addJournal('investigation', 'Philosophical analysis inconclusive', `fairhaven-lore-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== GOSSIP & TENSION LAYERS (4 CHOICES) ==========

  // 15. STREET RUMOR: SUPPLIES DISAPPEARING AND FAITH FAILING
  {
    label: "Gather street rumors at the Sunflower Market — what are people whispering about supplies, tools, and blessings that aren't working?",
    tags: ['Investigation', 'Rumor', 'Social', 'Gossip', 'Meaningful'],
    xpReward: 65,
    stageProgress: 1,
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
      addJournal('investigation', `Street rumor gathered: "${selected}"`, `fairhaven-rumor-${G.dayCount}`);

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 16. PRACTICAL FAILURE: TOOL BREAKS AT CRITICAL MOMENT
  {
    label: "Witness a critical tool failure — a blessed implement that should work but fails when someone depends on it. Document the failure and its consequences.",
    tags: ['Investigation', 'Evidence', 'Failure', 'Personal', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'documenting critical failure');
      G.stageProgress[1]++;

      const result = rollD20('survival', (G.skills.survival || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The plow snaps mid-furrow with a sound like a short word being cut off. The farmer stands in the turned earth for a moment before he kneels. "New enchantment," he says — not to you, to himself. "Three weeks old." The rune seam has separated cleanly: not stress fracture, not overload, but a binding that was never fully seated. You find the gap in the third rune of the anchor sequence. Someone removed a component from the formula and left the rest intact enough to pass production check. The tool was finished. It just wasn't meant to last.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Tool failure documented as deliberate manufacturing defect', `fairhaven-failure-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `You crouch to look at the fragments and three people stop what they're doing to watch. "Why are you picking at it?" one of them asks. It isn't hostile — it's the question of a community that has learned not to draw attention to its own problems. Someone carries word to the mill road before the afternoon is out.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Your investigation of tool failure reported as suspicious', `fairhaven-failure-suspicious-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The break is too clean for impact fracture — no radiating cracks, no compression deformation. The rune seam separated. Whether the enchantment was incomplete from production or degraded since, the fragments don't say. The failure is documented; the cause needs another angle.`;
        addJournal('investigation', 'Tool failure analysis suggests intentional defect', `fairhaven-failure-intentional-${G.dayCount}`);
      } else {
        G.lastResult = `The tool snapped under load. Without a reference comparison to the production formula, the break pattern is consistent with both age and manufacturing variance. Nothing here distinguishes deliberate from accidental.`;
        addJournal('investigation', 'Tool failure cause unclear', `fairhaven-failure-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 17. SUPPLY CRISIS: COMMUNITY APPROACHING SCARCITY
  {
    label: "Document how the supply shortages are affecting community — interviews with families about food, tools, and materials becoming scarce.",
    tags: ['Investigation', 'Evidence', 'Crisis', 'Personal', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'gathering community impact testimony');
      G.stageProgress[1]++;

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `A widow near the south well is rationing grain that, by any prior season's standard, should still be plentiful. A cobbler on the mill road can't source leather in a region with functioning tanneries two days' travel away. A mother counts her family's winter provisions aloud while you listen — she's done the arithmetic before; the numbers haven't changed. Each one, when asked what changed, says some version of the same thing: "The shrine says this is what faith requires." They aren't resigned. They're complying with an explanation someone gave them for something they didn't cause.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Community impact testimony documented systematic scarcity', `fairhaven-crisis-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The first family you approach pulls back mid-sentence. "We manage fine." The second answers in shorter words than they started with. By the third door, someone's watching from across the lane. Fairhaven has learned that talking about shortage draws the wrong kind of attention. They stop before they get to the part that matters.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Community becomes defensive about scarcity inquiry', `fairhaven-crisis-defensive-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Several households admit things are tighter than expected this season — tools wearing out, supplies arriving late or short. They describe it as weather, as bad luck, as normal variation. Each household is carrying its own version of a problem that is the same problem.`;
        addJournal('investigation', 'Community scarcity concerns documented', `fairhaven-crisis-concern-${G.dayCount}`);
      } else {
        G.lastResult = `Doors stay mostly closed. The ones that open offer polite deflections — everything is fine, the shrine provides guidance, this is not the season for complaints. Whatever the community knows, it's not being shared with someone they don't recognize yet.`;
        addJournal('investigation', 'Community scarcity concerns remain unspoken', `fairhaven-crisis-silent-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 18. INSTITUTIONAL WEAPONIZATION: DOCTRINE SERVES SABOTAGE
  {
    label: "Compile complete evidence showing how Fairhaven's institutions are being deliberately weaponized — faith used to justify material degradation.",
    tags: ['Investigation', 'Proof', 'Systematic', 'Conspiracy', 'Meaningful'],
    xpReward: 80,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(80, 'exposing institutional weaponization');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Laid out together — the formula records, the supply manifests, the garrison reduction orders, the doctrine supplements, the community testimony, the broken plow — they stop being coincidences. Every institution in Fairhaven has been adjusted in the same direction over the same fourteen-month period: each change reducing practical capacity while a doctrinal justification was provided for accepting it. The knowledge required to do this was specific and internal. Whoever coordinated it understood Fairhaven's systems well enough to find the tolerance in each one — the place where a change wouldn't trigger immediate resistance.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Institutional weaponization conspiracy documented', `fairhaven-conspiracy-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Someone delivers the message in person — not a letter, not a runner. A man you haven't spoken to stands at the edge of the market square and waits for you to notice him. When you do, he says three words: "Stop. Final warning." Then he walks away without looking back. Whoever is running this operation knows you've been compiling.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Conspiracy operators directly threaten your investigation', `fairhaven-conspiracy-threat-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `The evidence points consistently in one direction. The timing of each institutional change, the doctrine revisions that preceded them, the supply rerouting that followed — there is a sequence here. The final link, what ties the coordination to a specific source, is still missing.`;
        addJournal('investigation', 'Substantial weaponization evidence compiled', `fairhaven-conspiracy-substantial-${G.dayCount}`);
      } else {
        G.lastResult = `The pieces are present but not yet speaking to each other clearly. Supply failure, formula change, doctrine revision — each one explicable alone. Connecting them into a coordinated design requires one more thread.`;
        addJournal('investigation', 'Conspiracy pattern visible but evidence incomplete', `fairhaven-conspiracy-partial-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== EXPANSION CHOICES ==========

  // 19. CLUE: FORMULA SUBSTITUTION RECORD
  {
    label: "Find the original supply records for Fairhaven's shrine compound formula — compare what was ordered to what was received.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'comparing formula supply records');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 13) {
        G.lastResult = `The order specifies traditional compound ingredients exactly. The delivery receipt stamps it "equivalent substitution approved — regional materials update." That category exists in the administrative codex. The shrine's own policy register, filed separately, shows no regional materials update was ever ratified. The authorization cites a category that was never enacted. Someone wrote a policy-shaped entry into the system that pointed to nothing behind it.`;
        if (!G.flags) G.flags = {};
        G.flags.found_formula_substitution = true;
        addJournal('investigation', 'Formula substitution: ghost authorization category used — no backing policy, substitution inserted covertly', `fairhaven-formula-${G.dayCount}`);
      } else {
        G.lastResult = `The supply records are here. The delivery receipt cites a regional administrative code that isn't in the reference guide on the shelf — the one that should cover it. The substitution is written down and authorized by something. What that something actually is requires a reference you don't have access to yet.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 20. CLUE: GARRISON REDUCTION ORDERS
  {
    label: "Access the garrison rotation orders from the past year — track the timing of personnel reductions.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 68,
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
      addJournal('investigation', 'Garrison reductions followed doctrine revisions by one week — sequenced destabilization confirmed', `fairhaven-garrison-timing-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 21. ARCHETYPE-GATED: READING FAIRHAVEN
  {
    label: "Attend the morning community gathering at the shrine and read what the assembled people are actually expressing.",
    tags: ['Investigation', 'Archetype', 'Stage1', 'Meaningful'],
    xpReward: 67,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(67, 'reading shrine community gathering');
      const arch = G.archetype && G.archetype.group;

      if (arch === 'combat') {
        G.lastResult = `The community arranges itself by household without being instructed to. Old defense instinct — clusters of known-trust around a central point. They haven't formed a line or spread out. They've formed a defensive pattern. Their bodies remember something their doctrine is telling them to forget.`;
      } else if (arch === 'magic') {
        G.lastResult = `The shrine's compound smoke patterns differently than the doctrinal text describes. The community breathes it and becomes calm — not peaceful calm, sedated calm. The formula substitution is behaviorally active. This community isn't choosing acceptance of hardship. They're being pharmacologically conditioned toward it.`;
      } else if (arch === 'stealth') {
        G.lastResult = `Three people at the gathering are watching the crowd, not participating. They're positioned at different angles to cover the full gathering. When someone in the crowd shows agitation — a whispered argument, a child crying — one of the watchers moves toward the situation before the shrine keeper does. Pre-emptive social management. The gathering has embedded monitors.`;
      } else {
        G.lastResult = `Two families don't speak to each other despite standing adjacent. Old alliance from before the resource shortages — you can see it in the posture, the slight acknowledgment. They've been separated by something recent. Whatever divided them happened in the past season. Resource allocation disputes fracture communities this way: gradually, quietly, at the household level.`;
      }
      addJournal('investigation', 'Shrine gathering: pharmacological sedation via compound, embedded monitors, household fractures from resource pressure', `fairhaven-gathering-read-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 22. FACTION SEED: OVERSIGHT COLLEGIUM CONTACT
  {
    label: "Locate the Oversight Collegium's regional correspondent in Fairhaven.",
    tags: ['Faction', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'making Oversight Collegium contact');
      if (!G.factionHostility) G.factionHostility = { warden_order: 0, iron_compact: 0, oversight_collegium: 0 };

      const result = rollD20('survival', (G.skills.survival || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `Collegium correspondent Avel Prenn runs a small goods trade from a market stall as cover. She's been gathering information on Fairhaven's institutional changes for five months. "The doctrine revisions are being reported to us as voluntary community spiritual development," she says. "The Collegium hasn't categorized them as a compliance concern yet. I've been waiting for hard evidence of coordination." The formula substitution data would move the Collegium's assessment from "monitoring" to "investigating."`;
        if (!G.flags) G.flags = {};
        G.flags.met_oversight_collegium_fairhaven = true;
        G.factionHostility.oversight_collegium += 1;
        addJournal('faction', 'Oversight Collegium correspondent Avel Prenn: monitoring Fairhaven, needs hard evidence to trigger investigation', `fairhaven-collegium-${G.dayCount}`);
      } else {
        G.lastResult = `The civic registry lists a Collegium address on the east lane. The building is a cooperage — the owner hasn't heard of anyone by that description. Either the listing is out of date, or the person keeping it doesn't want to be found through official channels.`;
        if (!G.flags) G.flags = {};
        G.flags.sought_oversight_collegium_fairhaven = true;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 23. ATMOSPHERE: THE SHRINE AT DUSK
  {
    label: "Stay at the shrine through the evening and observe the community that gathers after the official hours end.",
    tags: ['WorldColor', 'Lore', 'Stage1', 'Meaningful'],
    xpReward: 50,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(50, 'observing shrine after hours');

        G.lastResult = `When the official gathering clears, eight people stay. Older — the kind of old that predates the shrine's current administration. They move through a shorter ceremony, no compound burned, working from memory. No text in hand. They finish in twelve minutes and leave by three different doors. Whatever is being preserved here exists in their bodies, not in any document the shrine currently holds.`;
      addJournal('discovery', 'Shrine after hours: original pre-revision ceremony preserved by memory in elder community members', `fairhaven-shrine-dusk-${G.dayCount}`);
      G.recentOutcomeType = 'explore'; maybeStageAdvance();
    }
  },

  // 24. PERSONAL ARC: THE ELDER KEEPER
  {
    label: "Speak privately to one of the elders who performed the original ceremony — find out what they know.",
    tags: ['PersonalArc', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'speaking to elder keeper');
      if (!G.flags) G.flags = {};

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `Cassian doesn't rush. She pours two cups of something that isn't the shrine's blend and sits. "The compound changed about a year ago. I noticed at the first morning ceremony. The smell was similar — not the same." She wraps her hands around her cup. "There is a quiet that comes from presence and a quiet that comes from weight. This one presses down." She has a sealed jar from the old batch in a cabinet at home. She'll give it over — "so there's a record of what the original was."`;
        G.flags.met_elder_cassian = true;
        addJournal('contact', 'Elder Cassian: recognized compound substitution by smell, has original sample, knows the community is being managed', `fairhaven-cassian-${G.dayCount}`);
      } else {
        G.lastResult = `Cassian is willing enough, but the conversation stalls at anything specific. She watches you with the patience of someone who has waited out other people's urgency before. She'll speak plainly when she decides you're the right person to speak plainly to.`;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // 25. SOCIAL: THE GARRISON SOLDIER WHO STAYED
  {
    label: "Find a garrison soldier who stayed in Fairhaven after the reduction — ask why they didn't transfer.",
    tags: ['Social', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 65,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(65, 'interviewing retained garrison soldier');

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 10) {
        G.lastResult = `Nyse leans against the post and thinks about it. "Six of us stayed. All long-posting. I've been here four years." She tilts her head slightly. "They said they needed people who knew the local households. For continuity." She doesn't say it as a criticism. She's describing a thing she accepted without fully naming what it is. The six who stayed are the ones who would recognize a face in the market square as someone they'd seen before, and know which household they belonged to.`;
        if (!G.flags) G.flags = {};
        G.flags.met_nyse_garrison = true;
        addJournal('contact', 'Corporal Nyse: retained specifically for community knowledge — long-term soldiers being used as surveillance assets', `fairhaven-nyse-${G.dayCount}`);
      } else {
        G.lastResult = `Nyse gives the shortest answer available. "Orders." She watches you to see if you'll push it. She waits long enough to make clear she hopes you won't.`;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // 26. SHADOW RIVAL INTRO
  {
    label: "A traveler passing through mentions they met someone on the road who was heading away from Fairhaven with a supply sample case.",
    tags: ['Rival', 'Warning', 'Stage1', 'Meaningful'],
    xpReward: 55,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(55, 'receiving rival warning');
      if (!G.flags) G.flags = {};

      const arch = G.archetype && G.archetype.group;
      if (arch === 'combat') {
        G.lastResult = `"Military bearing," the traveler says. "Moved like someone who has the road to themselves by right. Wasn't nervous about the sample case — carried it openly. Whoever they were, they left Fairhaven with something official enough to carry without cover." A senior operative transporting verified evidence openly. They've already completed what you're still beginning.`;
      } else if (arch === 'magic') {
        G.lastResult = `"Carried the sample case with both hands, carefully," the traveler says. "Like something fragile. But the case was sealed, not padded. They were preserving a substance, not an object." Someone is carrying the original compound sample — or a sample of the substituted formula — out of Fairhaven for analysis. They're doing the same investigation but they're already at the laboratory stage.`;
      } else if (arch === 'stealth') {
        G.lastResult = `"Walked like they were counting their steps," the traveler says. "Looked back twice on the main road, once when they thought no one was watching. Spotted me watching them on the second check." Counter-surveillance habits. This person is professionally careful and they know they're carrying something that matters.`;
      } else {
        G.lastResult = `"Friendly," the traveler says. "Asked about my route, whether I'd noticed anything unusual in Fairhaven, offered good directions. Very helpful. And then I realized afterward that the whole conversation was them gathering information, not giving it." A social operator. They information-gathered from a chance traveler without it feeling like gathering.`;
      }

      G.lastResult += ` They were in Fairhaven before you and they left with something.`;
      if (!G.rivalId) {
        if (arch === 'combat') G.rivalId = 'warden_captain';
        else if (arch === 'magic') G.rivalId = 'archivist_veld';
        else if (arch === 'stealth') G.rivalId = 'shadow_broker';
        else G.rivalId = 'provost_lenn';
      }
      addJournal('warning', 'Rival-adjacent operative departed Fairhaven with supply sample before your arrival', `fairhaven-rival-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  }
];
window.FAIRHAVEN_STAGE1_ENRICHED_CHOICES = FAIRHAVEN_STAGE1_ENRICHED_CHOICES;
