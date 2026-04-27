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
    label: "The ritual words are the same. The time given them is not.",
    tags: ['Investigation', 'NPC', 'Faith', 'Ritual', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading blessing pressure');
      G.stageProgress[1]++;

      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      const target = 11 + Math.max(0, G.worldClocks.pressure);

      if (result.isCrit) {
        G.lastResult = `Sister Mara keeps her voice low, hands folded tight in her lap. "Blessings used to take a full meditation cycle — preparation, stillness, then the words. Now I'm told to finish in a quarter of that. The ritual authority calls it efficiency." She pauses. "I tried maintaining proper form. They said I was obstructing service. So I cut the meditation. The words are spoken. The form is completed. But something doesn't carry the way it did." She looks at the supply crates stacked by the door. "If I'd said any of this to the Shrine Keeper, I'd have lost my posting by morning."`;
        G.stageProgress[1]++;
        addJournal('Chapel worker revealed acceleration of blessing practices', 'evidence', `fairhaven-blessing-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Sister Mara's posture closes off mid-sentence. "The chapel's work isn't subject to outside review." She doesn't raise her voice — she lowers it. By the time you've left the room, a runner has already crossed the courtyard toward the Shrine Keeper's quarters. The chapel bell rings once, out of sequence. Everyone inside knows what that means.`;
        G.worldClocks.pressure++;
        addJournal('Chapel worker reported your inquiry to shrine authority', 'complication', `fairhaven-chapel-alert-${G.dayCount}`);
      } else {
        G.lastResult = `Sister Mara admits the blessing pace has changed. "We serve more households now," she says, but her hands move to her prayer cord and stay there. She doesn't explain the new timeline. She doesn't quite meet your eyes. Whatever the ritual authority told her about the change, she hasn't made peace with it.`;
        addJournal('Chapel worker acknowledged acceleration of blessings', 'evidence', `fairhaven-chapel-acceleration-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 2. MARKET BROKER: SUPPLY DIVERSIONS AND PRICE INFLATION
  {
    label: "Prices have climbed. The broker knows where the gap started.",
    tags: ['Investigation', 'NPC', 'Commerce', 'Supply', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'tracing supply manipulation');
      G.stageProgress[1]++;

      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Kellen draws you past the stacked crates to the back of the stall. "Three weeks ago a grain shipment came in from the south and went straight back out toward Watcher's Perch. Last week, alchemical supplies bound for the chapel ended up at an unmarked waystation north of the glyph cave. I have two witnesses to each." He spreads his hands. "Replacement supplies come back through the same channels at prices nobody was quoting two months ago. Someone upstream is coordinating with the original brokers. This isn't a routing error. Fairhaven is short because Fairhaven is being kept short."`;
        G.stageProgress[1]++;
        addJournal('Broker mapped supply diversions and price manipulation', 'evidence', `fairhaven-broker-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Kellen's expression shifts the moment you mention supply routes. "Commercial details stay commercial." He steps back behind his ledger and doesn't look up again. Two stalls down, his partner turns to watch you leave. By the time you reach the notice board, word is already moving through the market row.`;
        G.worldClocks.watchfulness++;
        addJournal('Broker suspicious of your supply chain questions', 'complication', `fairhaven-broker-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Kellen concedes that shipments have been arriving on odd schedules. "Some come late. Some not at all, then double the next week." He calls it market adjustment and doesn't push further. His pen keeps moving across the ledger as he talks, like he's decided not to be in this conversation officially. Behind him, on the manifest cabinet against the back wall, a drawer two positions to the left of the one he opened for you is sealed with red administrative wax — same color, same stamp impression as the Collegium-issued seals on the public filing board beside the door. The drawer he showed you carries no such seal.`;
        addJournal('Broker confirmed unusual supply pattern disruption', 'evidence', `fairhaven-broker-pattern-${G.dayCount}`);
      } else {
        G.lastResult = `Kellen closes the ledger without looking up. "Supply chain specifics are between the parties to the transaction." He says it the way people say things they've rehearsed. A stack of receipts gets squared against the table edge. A rope of dried herbs gets retied. The stall fills with small motions that have nothing to do with you and everything to do with not having to meet your eyes. By the time he's finished the third unnecessary task, the window has closed, and he's made sure it doesn't reopen.`;
        addJournal('Broker blocked supply chain inquiry', 'evidence', `fairhaven-broker-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 3. ALCHEMICAL SUPPLIER: INGREDIENT QUALITY DEGRADATION
  {
    label: "The alchemical supplier's stock smells right. The potency tests would say otherwise.",
    tags: ['Investigation', 'NPC', 'Craft', 'Supply', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'assessing ingredient authenticity');
      G.stageProgress[1]++;

      const result = rollD20('spirit', (G.skills.craft || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Master Thren sets down the pestle and picks up a dried bundle from the nearest shelf. "Moonflower. This came in the last batch, documented as prime grade." He breaks a stem and holds it under your nose — the scent is thin, stretched. "Treated to carry the smell. Potency is maybe forty percent of what I'm paying for." He moves to three other containers in turn, each with the same story. "The paperwork is perfect. Someone put real work into this. And whoever made tools from my materials — they won't know until the binding fails."`;
        G.stageProgress[1]++;
        addJournal('Supplier revealed ingredient replacement scheme', 'evidence', `fairhaven-alchemical-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Master Thren steps in front of the shelf rack before you've finished asking. "Proprietary stock. Not for external review." He walks you to the door personally. By the next morning, three other craftspeople on the mill road have heard that a stranger was pressing Thren about his materials sourcing.`;
        G.worldClocks.watchfulness++;
        addJournal('Alchemical supplier blocked access and warned community', 'complication', `fairhaven-alchemical-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The storage shelves hold more variation than they should — two jars labeled the same compound have different sediment lines, one pale, one amber-brown. Thren watches you notice it and says nothing at first. The pestle turns once in his hand, a slow rotation he doesn't seem aware of. "Sourcing has been difficult lately," he offers. He doesn't elaborate, doesn't gesture toward the jars, doesn't move to close the gap in the shelving where the discrepancy is plainest. He doesn't need to explain it. He just needs you to have moved past it.`;
        addJournal('Craft analysis noted potential ingredient substitution', 'evidence', `fairhaven-alchemical-substitution-${G.dayCount}`);
      } else {
        G.lastResult = `The workshop looks orderly — shelves stacked, containers labeled, surfaces wiped. Without reference samples for side-by-side comparison, any degradation doesn't announce itself. The labels match the contents, the handwriting is consistent, the storage conditions are correct. Whatever has changed in the sourcing chain, this room has been organized to show nothing changed at all. Halverd the tool craftsman works from the same supply source. His enchantments stopped taking four weeks ago.`;
        addJournal('Ingredient quality assessment inconclusive', 'evidence', `fairhaven-alchemical-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 4. FOOD PROVISIONER: STORAGE MANIPULATION AND SPOILAGE
  {
    label: "The grain moved upstairs. Gareth knows what that does to grain.",
    tags: ['Investigation', 'NPC', 'Supply', 'Storage', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'investigating supply storage');
      G.stageProgress[1]++;

      const result = rollD20('vigor', (G.skills.survival || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Old Gareth closes the cellar door behind you and speaks at the wall. "Three weeks ago they moved the grain to the upper stores. Warmer, less air. I told the Shrine Keeper — grain needs cool and dark or it turns. He said the new procedure was spiritually aligned with something. I didn't understand the doctrine. What I understand is that last week's sack had mold on the bottom seam." He pulls it out and holds it up. The smell is unmistakable. "We're not supposed to question the procedure."`;
        G.stageProgress[1]++;
        addJournal('Provisioner revealed deliberate storage degradation', 'evidence', `fairhaven-provisioner-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Gareth's eyes go to the door first, then back to you. "Is this the Shrine Keeper checking on my work?" The question isn't aggressive — it's frightened. He reports the conversation before you've left the supply yard. Whatever he's been told about unauthorized questions, the warning stuck.`;
        G.worldClocks.pressure++;
        addJournal('Provisioner reported your storage inquiry', 'complication', `fairhaven-provisioner-alert-${G.dayCount}`);
      } else {
        G.lastResult = `Gareth admits the storage location changed recently. "The Shrine Keeper said it was necessary." He shrugs in the way of someone who stopped asking follow-up questions some time ago and has accepted the silence that replaced them. He pulls the cellar door shut behind him on the way out. The upper store smell follows — faint but unmistakable, the early stage before spoilage has a name.`;
        addJournal('Provisioner confirmed storage procedure changes', 'evidence', `fairhaven-provisioner-changes-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 5. TOOL CRAFTSMAN: ENCHANTED TOOL DEGRADATION
  {
    label: "Halverd has been at this thirty years. He knows when an enchantment hasn't taken.",
    tags: ['Investigation', 'NPC', 'Craft', 'Tools', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'analyzing tool integrity');
      G.stageProgress[1]++;

      const result = rollD20('spirit', (G.skills.craft || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Halverd picks up a plow-blade from the finished rack and hands it over without ceremony. The rune seam runs clean along the edge — but when you press at the binding notch, the metal gives slightly where it shouldn't. "I've been at this thirty years," he says. "The enchantments stopped taking properly four weeks ago. The formulas were changed — key components pulled out. I raised it with the supply authority. They told me the new formula was correct and I should execute it." He takes the blade back. "I know what correct feels like. This isn't it."`;
        G.stageProgress[1]++;
        addJournal('Craftsman revealed tool enchantment sabotage', 'evidence', `fairhaven-craftsman-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Halverd sets his hammer down and says nothing for a moment. "Craft methods aren't for outside discussion." He doesn't explain further. He watches you the way a man watches a door he'd rather stayed shut. You leave with nothing and the awareness that he'll remember your face.`;
        G.worldClocks.watchfulness++;
        addJournal('Tool craftsman now hostile to external inquiry', 'complication', `fairhaven-craftsman-hostile-${G.dayCount}`);
      } else {
        G.lastResult = `Halverd allows that durability has been inconsistent lately. "Materials come in different grades," he says — the kind of answer that is technically accurate and practically empty. He keeps working while he talks, hammer moving in the same rhythm it held before you spoke. The finished rack behind him holds a row of plow blades. He doesn't offer to show them. Neither does he turn them away from view.`;
        addJournal('Craftsman confirmed tool quality decline', 'evidence', `fairhaven-craftsman-decline-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 6. GUARD CAPTAIN: GARRISON COMPLACENCY AND REALLOCATION
  {
    label: "Forty-two soldiers last month. Twenty-nine today. The captain filed a written objection.",
    tags: ['Investigation', 'NPC', 'Defense', 'Military', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'investigating garrison reallocation');
      G.stageProgress[1]++;

      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Captain Vren doesn't sit. He stands at the window and counts on his fingers. "I had forty-two posted here a month ago. I have twenty-nine now. Temporary reassignments — that's what the order says. They're not coming back and nobody's confirmed a return date." He turns. "The supply route patrols are running at half schedule. The glyph cave perimeter hasn't had a full circuit since the third week of last month. I put this to the Shrine Keeper in writing. The reply cited doctrine. I don't know which doctrine covers garrison deployment, but apparently one does now."`;
        G.stageProgress[1]++;
        addJournal('Guard captain revealed garrison force reduction', 'evidence', `fairhaven-guard-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Captain Vren's voice drops a register. The room contracts around it. "Garrison operations don't fall under civilian review. Raise this again and I'll restrict your movement within Watchers' Perch." He means it — the phrasing is too specific and too immediate for a bluff. The two soldiers at the door have already straightened without being told to. Their eyes move to you, then back to the middle distance: the posture of men waiting for an order that may or may not come, ready either way.`;
        G.worldClocks.pressure++;
        addJournal('Guard captain formally prohibits military inquiry', 'complication', `fairhaven-guard-warning-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Vren confirms the headcount is down. "Resource reallocation," he says. The phrase sits in the air without conviction — the language of a man repeating what he was told rather than what he believes. He crosses his arms, the posture closing off before the echo of the words has finished. The duty roster on the wall behind him shows three patrol slots empty, the chalk marks half-erased as though someone tried to make the absence look provisional. Nobody has filled the slots back in.`;
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
    label: "The Shrine Keeper implemented every directive. She hasn't named what came next.",
    tags: ['Investigation', 'NPC', 'Authority', 'Doctrine', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'confronting shrine authority');
      G.stageProgress[1]++;

      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Keeper Ilsa doesn't answer immediately. She straightens the offering cloth on the altar, then: "Directives have been arriving through the regional hierarchy. Sealed letters. Blessing procedures, storage protocols, deployment schedules — all framed as spiritual advancement." She sets her hands flat on the altar surface. "I have implemented every one of them. And in the three months since, the town has gotten quieter in a way I don't have doctrine for." She doesn't use the word sabotage. But she doesn't look away either.`;
        G.stageProgress[1]++;
        addJournal('Shrine keeper revealed external directive manipulation', 'evidence', `fairhaven-shrine-keeper-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Keeper Ilsa stands. "This conversation is finished. You are not welcome in this chapel." She doesn't shout — the stillness in her voice carries further than shouting would. A novice appears at the side door within thirty seconds. You are escorted out. The doors close behind you with a sound like a lock turning.`;
        G.worldClocks.reverence++;
        addJournal('Shrine keeper formally bans you from chapel', 'complication', `fairhaven-shrine-keeper-ban-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The offering cloth on the altar is folded and refolded while Ilsa speaks — corners aligned, then re-aligned, a gesture that fills the pause before she answers. The changes came through sanctioned channels, she says. "Regional shrine authority." She won't name the directive or its author. She confirms they were explicit written instructions, not her interpretation of doctrine. She doesn't look up from the altar cloth until the sentence is fully finished.`;
        addJournal('Shrine keeper confirmed deliberate change implementation', 'evidence', `fairhaven-shrine-keeper-deliberate-${G.dayCount}`);
      } else {
        G.lastResult = `"Shrine operations follow doctrine. Changes are made in accordance with guidance received." Ilsa folds her hands and waits for you to leave. Incense ash on the altar rail has been swept to one side — not cleared, repositioned. The chapel behind her is still and unhurried, everything in its place. The conversation has the texture of a door that closed before you opened it. The directives came through the regional hierarchy — sealed letters. That correspondence is logged at the regional shrine authority, not here.`;
        addJournal('Shrine keeper blocked further inquiry', 'evidence', `fairhaven-shrine-keeper-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 8. INNKEEPER: SUPPLY ROUTING AND VISITOR PATTERNS
  {
    label: "Shipments go north first now. The men coordinating them weren't from here.",
    tags: ['Investigation', 'NPC', 'Commerce', 'Intelligence', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'mapping supply logistics');
      G.stageProgress[1]++;

      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Merrel wipes down the bar and doesn't look up. "Shipments used to come straight from the south. Now they go north first — up through Watcher's Perch, around the glyph cave perimeter. Adds two days minimum." She pauses at a sticky ring on the wood. "A merchant who stayed here last week said there's a waystation out past the cave. Supplies stop there for inspection, he said. Some continue to Fairhaven. Some don't." She sets the cloth down. "The men who came through coordinating it — I couldn't place their accents. None of them were from here."`;
        G.stageProgress[1]++;
        addJournal('Innkeeper mapped rerouted supply network', 'evidence', `fairhaven-innkeeper-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Merrel stops what she's doing. "I don't discuss other people's supply arrangements." She turns her back to resume stacking cups. When you try again, she raises her voice just enough for the two men at the corner table to hear. They look over. You take the hint and leave.`;
        G.worldClocks.watchfulness++;
        addJournal('Innkeeper now distrustful of your supply questions', 'complication', `fairhaven-innkeeper-hostile-${G.dayCount}`);
      } else {
        G.lastResult = `Salt-damp on the bar top, a cup turned upside down at the far end. Merrel runs the cloth across both without breaking stride. Shipments have been taking longer lately, she says. "More waypoints." She keeps moving. She doesn't elaborate, doesn't slow down, doesn't look up from the wood. She's noticed the change in the same way she notices the weather — without wanting an explanation for it. The kind of awareness that stops short of opinion.`;
        addJournal('Innkeeper confirmed routing changes', 'evidence', `fairhaven-innkeeper-routing-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== ARCHETYPE DEEP DIVES (8 CHOICES) ==========

  // 9. SURVIVAL TIER 1: GLYPH CAVE ACTIVITY MONITORING
  {
    label: "The warning posts say stay back. The boot prints say otherwise.",
    tags: ['Investigation', 'Survival', 'Glyph', 'Danger', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'glyph cave activity analysis');
      G.stageProgress[1]++;

      const result = rollD20('vigor', (G.skills.survival || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The warning posts say stay back. The ground says something else. Boot prints in the clay — multiple sets, different tread, all coming from the same direction and going into the cave. Waystation markers have been repositioned recently; the disturbed soil is fresh. Inside the mouth of the cave: a storage alcove, partially screened by a brush pile that didn't grow there. The glyph cave is being used as a throughpoint. The danger notices are keeping locals away while someone else moves freely through.`;
        G.stageProgress[1]++;
        addJournal('Survival analysis revealed glyph cave logistics operation', 'evidence', `fairhaven-survival-glyph-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `A Watchers' Perch soldier steps out from behind the rock formation to your left. "This area is restricted. Safety reasons." He doesn't explain which safety reasons. Two more emerge from the brush. You're walked back to the road without your notes and with a formal warning logged against your name.`;
        G.worldClocks.pressure++;
        addJournal('You are escorted away from glyph cave perimeter', 'complication', `fairhaven-survival-caught-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Boot tracks in the clay — multiple tread patterns, more than one person, all converging on the same line of approach. A waystation marker has been repositioned; the disturbed soil around its base is still soft. The stretch of ground between the posted warning and the cave mouth has been walked recently and walked often, the grass worn flat in a path that wasn't there last season. The danger warnings don't account for that pattern. They account for everyone else staying away while someone else moves freely through.`;
        addJournal('Survival analysis noted cave access patterns', 'evidence', `fairhaven-survival-pattern-${G.dayCount}`);
      } else {
        G.lastResult = `Salt air from the coast gives way to something drier and charged as the cave mouth comes into view. The glyph formations near the entrance are active — a low hum in the stone that runs up through boot soles, hair lifting at the wrist. The ambient disturbance saturates the ground around the perimeter, blurring whatever recent foot traffic might otherwise be readable. Whatever activity happens here leaves traces, but the glyph field consumes them before a single pass can collect them. Coming back with more time and a different approach would change that.`;
        addJournal('Glyph cave remains a genuine threat', 'evidence', `fairhaven-survival-danger-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 10. SURVIVAL TIER 2: HIDDEN WAYSTATION DISCOVERY
  {
    label: "Something is being stored past the perimeter. The drainage channel in the floor was cut on purpose.",
    tags: ['Investigation', 'Survival', 'Supply', 'Hidden', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'locating hidden supply network');
      G.stageProgress[1]++;

      const result = rollD20('vigor', (G.skills.survival || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The shielded cave sits forty paces past the posted perimeter, screened on three sides by a natural shelf of rock. Inside: stacked crates, a grain cache, a locked document box with a broken hasp — someone left in a hurry. The shipping manifests still inside show Fairhaven quantities crossing off the expected destination and picking up a new routing mark. Contracts in two languages cover what gets stored here and where it continues. On the manifest cabinet against the far wall, a second drawer sits sealed with administrative wax — same stamp, same red, different drawer than the one left open. This isn't improvised. The shelving is fixed. The drainage channel in the floor was cut deliberately. The operation has been running long enough to build infrastructure.`;
        G.stageProgress[1]++;
        addJournal('Survival analysis located hidden supply waystation', 'evidence', `fairhaven-survival-waystation-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Three Watcher personnel step out from the rocky ground to your north — they were already there, watching the search area. "You're inside a restricted zone." One of them has a ledger. They log your name and the time before they escort you out. The formal warning is already written by the time you reach the road.`;
        G.worldClocks.pressure++;
        addJournal('You are caught trespassing in glyph cave area', 'complication', `fairhaven-survival-caught-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `A cleared section under a rock shelf — ground pressed flat by repeated foot traffic, a faint chemical smell on the air. Something has been stored here recently and moved. The depression in the dirt holds the outline of stacked crates. The waystation exists, but it's been emptied or relocated.`;
        addJournal('Survival analysis found evidence of hidden storage', 'evidence', `fairhaven-survival-hidden-${G.dayCount}`);
      } else {
        G.lastResult = `The glyph interference scrambles any consistent read of the terrain. Hair stands at the wrist. The stone gives off a low resonance that makes distances harder to judge than they should be. The brush is thick and rock formations break line of sight every twenty paces. Boot tracks are present but the glyph disturbance makes it impossible to read their direction reliably. If a waystation is out here, a single pass in these conditions won't find it.`;
        addJournal('Waystation search inconclusive', 'evidence', `fairhaven-survival-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 11. CRAFT TIER 1: ENCHANTMENT FORMULA ANALYSIS
  {
    label: "The archive copy and the current formula are not the same document.",
    tags: ['Investigation', 'Craft', 'Magic', 'Enchantment', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'enchantment formula analysis');
      G.stageProgress[1]++;

      const result = rollD20('spirit', (G.skills.craft || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The current formula and the archive copy sit side by side on the reading table. Six differences. Each one pulls a binding component or shifts an activation rune just far enough to reduce efficacy without making the enchantment visibly fail during production. The changes require someone who knew exactly where the formula had tolerance — where you could degrade performance without triggering the craftsperson's check. Whoever rewrote this understood Fairhaven's enchantment practice from the inside.`;
        G.stageProgress[1]++;
        addJournal('Craft analysis revealed formula sabotage', 'evidence', `fairhaven-craft-formula-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Incense dust floats in the slant of light from the archive's high window. A Shrine Keeper comes through the door before the first comparison is finished — not the duty archivist, a different one, moving too directly to have arrived by accident. "These documents are not for outside examination." She doesn't raise her voice. She closes the folder with two fingers and holds the door open with the other hand, the gesture of someone who has done this before and expects compliance without escalation. The latch clicks behind you. The keeper's expression carries the specific flatness of a person who will report upward before the afternoon bell.`;
        G.worldClocks.reverence++;
        addJournal('You are removed from shrine archives for formula inquiry', 'complication', `fairhaven-craft-expelled-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The current formula is not the same document as the one filed three seasons ago. Set side by side on the archive reading table, the differences surface — a substituted component in the third binding sequence, an altered rune notation near the activation clause, a revised ratio in the secondary compound. Each change is small enough to survive a casual check. Whether the total represents standard revision or something more deliberate requires a complete comparative pass against reference materials that aren't held in this room. The thread is here; following it requires another visit with the right documents in hand.`;
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
    label: "The seals pass a clerk's check. The paper stock is from the wrong year.",
    tags: ['Investigation', 'Craft', 'Forgery', 'Documents', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'detecting document forgery');
      G.stageProgress[1]++;

      const result = rollD20('spirit', (G.skills.craft || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The seals are good — good enough to pass a clerk's check. But the paper stock is wrong: the authentic documents use a rag-fiber blend with a faint blue cast; these use a cleaner white pressed sheet that wasn't available in the region two years ago when the oldest forgeries are dated. The signature imitates well but presses too hard at the terminal stroke — a habit the real signatory doesn't have. Someone built this forgery operation with time and access. It has been running long enough to develop signature familiarity and sourced paper that's close, but not exact.`;
        G.stageProgress[1]++;
        addJournal('Craft analysis revealed document forgery operation', 'evidence', `fairhaven-craft-forgery-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `A merchant comes around the partition while you're holding two documents side by side. "Those are commercial records." He doesn't raise his voice but he stays in the doorway. Within the hour, the supply authority has heard that someone was handling sealed shipping documents without authorization. Your name is attached.`;
        G.worldClocks.watchfulness++;
        addJournal('Your document examination reported to supply authority', 'complication', `fairhaven-craft-caught-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Two documents with the same seal — one pressed slightly deeper than the other. The signatures match in style but not in pressure. Either the same person signed on different days under different circumstances, or two people practiced the same signature. Both explanations are worth following.`;
        addJournal('Craft analysis found evidence of document alteration', 'evidence', `fairhaven-craft-alteration-${G.dayCount}`);
      } else {
        G.lastResult = `The documents hold up to a surface read — seals pressed cleanly, signatures consistent in style, dates in the expected sequence. Ink color matches across pages. The clerk's hand is steady throughout. Without a reference set of confirmed authentic materials to lay beside these, the forgery — if present — is too controlled to catch at a glance. The alchemical supplier Thren received the substituted compounds through the same documentation chain — his delivery receipts are still in his workshop.`;
        addJournal('Document authenticity assessment inconclusive', 'evidence', `fairhaven-craft-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 13. LORE TIER 1: GLYPH HISTORY AND DOCTRINE
  {
    label: "The old texts called it a threshold. The new pamphlets call it a wall.",
    tags: ['Investigation', 'Lore', 'History', 'Doctrine', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'glyph doctrine analysis');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The older texts treat the glyph cave as a threshold — harrowing, requiring preparation, but crossable by those who knew the markers. The current doctrine, written into the standard teaching pamphlets distributed to households over the last fourteen months, calls it an absolute barrier and describes the danger as intensifying. No corresponding event or glyph survey is cited. The escalation in the texts is not matched by any recorded change in cave conditions — only by a change in who is writing about it.`;
        G.stageProgress[1]++;
        addJournal('Lore analysis revealed exaggerated glyph doctrine', 'evidence', `fairhaven-lore-glyph-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Incense from the main hall drifts into the records corridor — cedar and something sharper beneath it. The Shrine Keeper intercepts the request at the records desk before the archivist can respond. "Doctrinal interpretation belongs to approved spiritual guides. External review is not permitted." The words arrive without heat, which is worse than anger. A notation goes into the register beside your name — pen moving steadily, no hesitation in the hand. The records room stays locked for the rest of the day. Two keepers remain visible in the corridor on the way out.`;
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
    label: "The founding texts treated a failed harvest as a logistical problem. The supplements don't.",
    tags: ['Investigation', 'Lore', 'Philosophy', 'Doctrine', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'tracing philosophical inversion');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The founding texts are unambiguous: faith and practical provision were treated as the same obligation — a blessed harvest was proof of right relationship with the divine, and a failed harvest demanded both prayer and better technique. The current instructional texts, circulated as supplements over the past eighteen months, reframe this. Provision is now subordinated to devotion. A shortage is recast as spiritual testing rather than logistical failure. The shift is consistent across eight separate documents — not one author reconsidering, but a coordinated revision that arrived at the same conclusion through different stated paths.`;
        G.stageProgress[1]++;
        addJournal('Lore analysis revealed philosophical inversion', 'evidence', `fairhaven-lore-philosophy-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `A keeper appears at the reading room door before you've finished the second document. "External review of theological foundations is not a scholarly matter — it's a doctrinal one. The shrine handles doctrine." Your access pass is marked restricted. The keeper waits while you pack your notes.`;
        G.worldClocks.reverence++;
        addJournal('Shrine restricts your philosophical research as heretical', 'complication', `fairhaven-lore-heresy-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The older texts and the newer supplements don't agree on the relationship between faith and provision. Founding doctrine holds both as the same obligation — prayer and better technique in equal measure. The supplements, circulated over the past eighteen months, subordinate provision to devotion: a shortage recast as spiritual testing, not logistical failure. The supplements are more recent and significantly more emphatic. Whether that represents genuine theological development or something more coordinated is a distinction the archive alone cannot resolve. The change in emphasis is consistent enough across eight separate documents to merit a clearer answer.`;
        addJournal('Lore research confirmed philosophical shift', 'evidence', `fairhaven-lore-shift-${G.dayCount}`);
      } else {
        G.lastResult = `Reading table, three candles, a stack of supplements issued in the last eighteen months alongside founding texts that predate the shrine's current administration. The older documents carry the smell of linen storage. The newer ones smell of fresh pressing. Both describe the same community, same obligations, different weight given to hardship. The eight supplements were all issued through the same external channel — the regional shrine authority's sealed letter distribution. The same letters that authorized the garrison reductions.`;
        addJournal('Philosophical analysis inconclusive', 'evidence', `fairhaven-lore-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== GOSSIP & TENSION LAYERS (4 CHOICES) ==========

  // 15. STREET RUMOR: SUPPLIES DISAPPEARING AND FAITH FAILING
  {
    label: "The same complaint at every bench at the Sunflower Market, said just below a raised voice.",
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
      addJournal(`Street rumor gathered: "${selected}"`, 'evidence', `fairhaven-rumor-${G.dayCount}`);

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 16. PRACTICAL FAILURE: TOOL BREAKS AT CRITICAL MOMENT
  {
    label: "A plow snaps mid-furrow. Three weeks old. The rune seam was never fully seated.",
    tags: ['Investigation', 'Evidence', 'Failure', 'Personal', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'documenting critical failure');
      G.stageProgress[1]++;

      const result = rollD20('vigor', (G.skills.survival || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The plow snaps mid-furrow with a sound like a short word being cut off. The farmer stands in the turned earth for a moment before he kneels. "New enchantment," he says — not to you, to himself. "Three weeks old." The rune seam has separated cleanly: not stress fracture, not overload, but a binding that was never fully seated. You find the gap in the third rune of the anchor sequence. Someone removed a component from the formula and left the rest intact enough to pass production check. The tool was finished. It just wasn't meant to last.`;
        G.stageProgress[1]++;
        addJournal('Tool failure documented as deliberate manufacturing defect', 'evidence', `fairhaven-failure-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `You crouch to look at the fragments and three people stop what they're doing to watch. "Why are you picking at it?" one of them asks. It isn't hostile — it's the question of a community that has learned not to draw attention to its own problems. Someone carries word to the mill road before the afternoon is out.`;
        G.worldClocks.watchfulness++;
        addJournal('Your inquiry into tool failure reported as suspicious', 'complication', `fairhaven-failure-suspicious-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The break is too clean for impact fracture — no radiating cracks, no compression deformation at the stress point, no lateral spread through the metal. The rune seam separated along its own line, as if the binding between the enchantment and the tool face simply stopped holding. Whether the enchantment was incomplete from production or degraded since installation, the fragments don't carry enough of the original anchor sequence to say. The failure is documented, the pattern is specific, and the cause needs a comparison against the production formula to close the gap.`;
        addJournal('Tool failure analysis suggests intentional defect', 'evidence', `fairhaven-failure-intentional-${G.dayCount}`);
      } else {
        G.lastResult = `The tool snapped under load — a clean break, the kind that comes at the seam rather than through the material. Dock planking nearby carries the brine smell of the morning tide. The break pattern is consistent with both age and manufacturing variance; without a reference copy of the production formula to lay beside the rune seam, there's no way to determine whether the anchor sequence was complete when the tool left the workshop. Nothing in the fragment alone distinguishes deliberate from accidental. A comparison to the enchantment formula would settle it.`;
        addJournal('Tool failure cause unclear', 'evidence', `fairhaven-failure-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 17. SUPPLY CRISIS: COMMUNITY APPROACHING SCARCITY
  {
    label: "Every household is carrying the same problem. None of them is calling it the same thing.",
    tags: ['Investigation', 'Evidence', 'Crisis', 'Personal', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'gathering community impact testimony');
      G.stageProgress[1]++;

      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `A widow near the south well is rationing grain that, by any prior season's standard, should still be plentiful. A cobbler on the mill road can't source leather in a region with functioning tanneries two days' travel away. A mother counts her family's winter provisions aloud while you listen — she's done the arithmetic before; the numbers haven't changed. Each one, when asked what changed, says some version of the same thing: "The shrine says this is what faith requires." They aren't resigned. They're complying with an explanation someone gave them for something they didn't cause.`;
        G.stageProgress[1]++;
        addJournal('Community impact testimony documented systematic scarcity', 'evidence', `fairhaven-crisis-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The first family you approach pulls back mid-sentence. "We manage fine." The second answers in shorter words than they started with. By the third door, someone's watching from across the lane. Fairhaven has learned that talking about shortage draws the wrong kind of attention. They stop before they get to the part that matters.`;
        G.worldClocks.watchfulness++;
        addJournal('Community becomes defensive about scarcity inquiry', 'complication', `fairhaven-crisis-defensive-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Several households admit things are tighter than expected this season — tools wearing out, supplies arriving late or short. They describe it as weather, as bad luck, as normal variation. Each household is carrying its own version of a problem that is the same problem.`;
        addJournal('Community scarcity concerns documented', 'evidence', `fairhaven-crisis-concern-${G.dayCount}`);
      } else {
        G.lastResult = `Salt air off the dock planking, a rope coil hanging by a factor's door, the usual texture of a port morning. Doors stay mostly closed. The ones that open offer polite deflections — everything is fine, the shrine provides guidance, this is not the season for complaints. The phrasing is too consistent for coincidence, the same note struck in three different households in the same two-hour span. The broker Kellen has been in this community long enough to be trusted. He already knows what's being shared and what isn't.`;
        addJournal('Community scarcity concerns remain unspoken', 'evidence', `fairhaven-crisis-silent-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 18. INSTITUTIONAL WEAPONIZATION: DOCTRINE SERVES SABOTAGE
  {
    label: "Laid out together, they stop being coincidences. Every institution bent the same direction, same window.",
    tags: ['Investigation', 'Proof', 'Systematic', 'Conspiracy', 'Meaningful'],
    xpReward: 80,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(80, 'exposing institutional weaponization');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Laid out together — the formula records, the supply manifests, the garrison reduction orders, the doctrine supplements, the community testimony, the broken plow — they stop being coincidences. Every institution in Fairhaven has been adjusted in the same direction over the same fourteen-month period: each change reducing practical capacity while a doctrinal justification was provided for accepting it. The knowledge required to do this was specific and internal. Whoever coordinated it understood Fairhaven's systems well enough to find the tolerance in each one — the place where a change wouldn't trigger immediate resistance.`;
        G.stageProgress[1]++;
        addJournal('Institutional weaponization conspiracy documented', 'evidence', `fairhaven-conspiracy-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Someone delivers the message in person — not a letter, not a runner. A man you haven't spoken to stands at the edge of the market square and waits for you to notice him. When you do, he says three words: "Stop. Final warning." Then he walks away without looking back. Whoever is running this operation knows you've been compiling.`;
        G.worldClocks.pressure++;
        addJournal('Conspiracy operators directly threaten your inquiry', 'complication', `fairhaven-conspiracy-threat-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `The evidence points consistently in one direction. Laid against each other on the manifest table, the institutional changes take on a shape: doctrine revision first, supply rerouting a week later, garrison reduction following the doctrine's circulation in households. The timing is too precise for drift. There is a sequence here, and the sequence was authored. The final link — what ties the coordination to a specific originating source — is still missing. Everything else is present and pointing at the gap where that answer should be.`;
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
    label: "The order and the delivery receipt cite the same authorization. Only one of them is real.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'comparing formula supply records');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));
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
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(67, 'reading shrine community gathering');
      const arch = G.archetype && G.archetype.group;

      if (arch === 'combat') {
        G.lastResult = `The community arranges itself by household without being instructed to. Old defense instinct — clusters of known-trust around a central point. They haven't formed a line or spread out. They've formed a defensive pattern. Their bodies remember something their doctrine is telling them to forget.`;
      } else if (arch === 'magic') {
        G.lastResult = `The compound smoke from the shrine burner moves differently than the doctrinal text describes — flatter, slower to disperse, heavier on the back of the throat than incense has any reason to be. The community breathes it and settles. Not the quiet of people at rest, but the quiet of weight bearing down from the outside. Shoulders lower. Arguments that were forming don't complete. The formula substitution isn't just adulterated supply — it's behaviorally active in the ritual context. This community isn't choosing acceptance of hardship. The choice is being made for them, burnt off a grate every morning.`;
      } else if (arch === 'stealth') {
        G.lastResult = `Three people at the gathering are watching the crowd, not participating. They're positioned at different angles to cover the full gathering. When someone in the crowd shows agitation — a whispered argument, a child crying — one of the watchers moves toward the situation before the shrine keeper does. Pre-emptive social management. The gathering has embedded monitors.`;
      } else {
        G.lastResult = `Two families don't speak to each other despite standing adjacent. Old alliance from before the resource shortages — you can see it in the posture, the slight acknowledgment. They've been separated by something recent. Whatever divided them happened in the past season. Resource allocation disputes fracture communities this way: gradually, quietly, at the household level.`;
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
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'making Oversight Collegium contact');
      if (!G.factionHostility) G.factionHostility = { warden_order: 0, iron_compact: 0, oversight_collegium: 0 };

      const result = rollD20('vigor', (G.skills.survival || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `Collegium correspondent Avel Prenn runs a small goods trade as cover — soap, tied twine, dried lemon peel. She talks to you while rewrapping an already-wrapped bar of soap, seam aligned on the underside each time. "The doctrine revisions are being reported to us as voluntary community spiritual development. The Collegium hasn't categorized them as a compliance concern yet." The soap goes into the display stack, seam down. "I've been waiting for hard evidence of coordination." Formula substitution data would move the assessment from monitoring to investigating.`;
        if (!G.flags) G.flags = {};
        G.flags.met_oversight_collegium_fairhaven = true;
        G.factionHostility.oversight_collegium += 1;
        addJournal('faction', 'Oversight Collegium correspondent Avel Prenn: monitoring Fairhaven, needs hard evidence to trigger formal inquiry', `fairhaven-collegium-${G.dayCount}`);
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
    label: "Eight people stayed after the official gathering cleared. They worked from memory, no text in hand.",
    tags: ['WorldColor', 'Lore', 'Stage1', 'Meaningful'],
    xpReward: 50,
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
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'speaking to elder keeper');
      if (!G.flags) G.flags = {};

      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
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
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(65, 'interviewing retained garrison soldier');

      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
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
    label: "Someone left Fairhaven before arrival with a supply sample case. They weren't nervous about carrying it.",
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
        G.lastResult = `"Carried the sample case with both hands, carefully," the traveler says. "Like something fragile. But the case was sealed, not padded. They were preserving a substance, not an object." Someone is carrying the original compound sample — or a sample of the substituted formula — out of Fairhaven for analysis. They're already at the laboratory stage.`;
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
      G.flags.stage1_rival_seeded = true;
      addJournal('warning', 'Rival-adjacent operative departed Fairhaven with supply sample before your arrival', `fairhaven-rival-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },
  // TYPE: PRESSURE — WORLD COLOR VIGNETTE
  {
    label: "The fishing boats come in at the same hour they always did. The dock records don't reflect it.",
    tags: ['WorldColor', 'Atmosphere', 'Stage1'],
    xpReward: 38,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(38, 'observing Fairhaven dock rhythms');
      G.lastResult = `The fishing boats return on the tide as they always have — the same families, the same berths, the smell of salt and cleaned fish on the planking by midmorning. The dock records, posted on the coordination board at the harbor end, show lower catch volumes than what came in. Three boats logged at sixty percent of what you watched them offload. The discrepancy isn't hidden: anyone who stands at the dock and watches and then reads the board will see it. The community doesn't look at the board anymore. They stopped trusting it before they stopped watching.`;
      G.recentOutcomeType = 'observe'; maybeStageAdvance();
    }
  },

  // TYPE: PRESSURE — ARCHETYPE GATE (Healer — Support family)
  {
    label: "The community's children show a specific nutritional pattern that only develops over sustained months of inadequate provision.",
    tags: ['Pressure', 'ArchetypeGate', 'Stage1'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      const family = typeof getArchetypeFamily === 'function' ? getArchetypeFamily(G.archetype) : '';
      if (family !== 'Support') {
        G.lastResult = `The children in Fairhaven look thinner than a seasonal lean would explain. You note the observation without being able to attach a cause to it.`;
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
    label: "The harbor master's logbook has two numbering systems — one for public records, one for something else.",
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

// Sideplot injection — fairhaven meadow mill displacement opening hook
(function() {
  var _millHook = (typeof FAIRHAVEN_MEADOW_MILL_DISPLACEMENT !== 'undefined') ? FAIRHAVEN_MEADOW_MILL_DISPLACEMENT.openingHook() : null;
  if (_millHook) FAIRHAVEN_STAGE1_ENRICHED_CHOICES.push(_millHook);
})();

window.FAIRHAVEN_STAGE1_ENRICHED_CHOICES = FAIRHAVEN_STAGE1_ENRICHED_CHOICES;
