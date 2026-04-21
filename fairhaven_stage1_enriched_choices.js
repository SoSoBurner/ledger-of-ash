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
        G.lastResult = `The chapel worker (Sister Mara) is exhausted and conflicted. "Blessings used to take time — proper preparation, meditation, genuine spiritual connection. Now we're told to bless supplies in half the time, sometimes in a quarter. The ritual authority said faith should be more 'efficient.' I tried to maintain proper form, but they told me I was being obstinate. So I started cutting the meditation periods. The blessings are technically complete, but they feel hollow. And what's worse? I was told if I complained about the accelerated pace, I'd lose my position. Fairhaven's blessings are becoming spiritually empty."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Chapel worker revealed acceleration of blessing practices', `fairhaven-blessing-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Sister Mara becomes defensive. "The chapel's work is sacred. You don't question how we serve the faithful." She reports your questioning to the Shrine Keeper. The chapel is now alert to your investigation.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Chapel worker reported your inquiry to shrine authority', `fairhaven-chapel-alert-${G.dayCount}`);
      } else {
        G.lastResult = `The chapel worker admits that blessing practices have become faster lately. "The ritual authority says we need to serve more people," she notes, though her doubt is transparent. Something about the acceleration troubles her.`;
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
        G.lastResult = `Broker Kellen pulls you aside. "Food supplies that should reach Fairhaven are being diverted. I have witnesses. Three weeks ago, a grain shipment arrived from the south and was redirected to Watcher's Perch. Last week, alchemical ingredients destined for Fairhaven Chapel went to an unmarked location north of the glyph cave. Someone with authority is intercepting supply chain shipments and moving them elsewhere. And the prices we're paying for replacement supplies are inflated by someone coordinating with the original brokers. It's not random — it's orchestrated scarcity. Fairhaven is being deliberately starved while someone profits."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Broker mapped supply diversions and price manipulation', `fairhaven-broker-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The broker becomes cautious. "I don't discuss supply chain details with strangers. That's sensitive commercial information." He watches you with suspicion now. Your interest in supply matters is noted.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Broker suspicious of your supply chain questions', `fairhaven-broker-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The broker admits supply patterns have become unusual lately. Some shipments don't arrive as expected, and replacement supplies are harder to find. "Market adjustments," he calls it, though he seems uncertain about the explanation.`;
        addJournal('investigation', 'Broker confirmed unusual supply pattern disruption', `fairhaven-broker-pattern-${G.dayCount}`);
      } else {
        G.lastResult = `The broker is protective about supply information. "Commercial details are confidential. I can't discuss them with outsiders."`;
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
        G.lastResult = `The alchemical supplier (Master Thren) is alarmed by your knowledge. "Yes. The ingredients arriving are not what they should be. Moonflower petals that lack potency. Iron-rust that's been chemically treated to look authentic but isn't. Crystallized essence that's been cut with lesser components. Each batch has been delivered with proper documentation claiming authenticity, but I know my materials. Someone is systematically replacing Fairhaven's alchemical supplies with degraded alternatives while maintaining the appearance of quality. The enchanted tools being made from these ingredients will fail when they're truly needed."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Supplier revealed ingredient replacement scheme', `fairhaven-alchemical-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Master Thren becomes protective of his supplies. "My ingredients are proprietary. You don't have authority to examine them." He refuses further access and warns other local craftspeople that you're asking invasive questions about their materials.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Alchemical supplier blocked access and warned community', `fairhaven-alchemical-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `You examine the alchemical ingredients and notice signs of replacement. The materials appear authentic but have subtle quality issues. Someone may be substituting supplies with degraded alternatives.`;
        addJournal('investigation', 'Craft analysis noted potential ingredient substitution', `fairhaven-alchemical-substitution-${G.dayCount}`);
      } else {
        G.lastResult = `The alchemical ingredients appear standard. Any quality issues are too subtle for your analysis to definitively confirm.`;
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
        G.lastResult = `The provisioner (Old Gareth) speaks quietly. "Someone changed storage procedures three weeks ago. Grain used to be kept in cool cellars. Now we store it in warmer areas that accelerate spoilage. Vegetables that should last months are spoiling in weeks. I've complained about the storage conditions, but the Shrine Keeper says the new procedures are 'spiritually aligned' with some doctrine I don't understand. Grain is rotting in its stores, and we're told not to question it. Fairhaven is deliberately degrading its food supply."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Provisioner revealed deliberate storage degradation', `fairhaven-provisioner-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The provisioner is suspicious. "Are you checking on whether we're properly maintaining supplies? Is the Shrine Keeper questioning my work?" He becomes defensive and reports that you're investigating his storage practices.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Provisioner reported your storage inquiry', `fairhaven-provisioner-alert-${G.dayCount}`);
      } else {
        G.lastResult = `The provisioner admits storage conditions have changed recently. "The Shrine Keeper says the changes are necessary," he says, though he's uncertain about their purpose. Storage practices seem to be facilitating spoilage.`;
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
        G.lastResult = `The tool craftsman (Halverd) is deeply troubled. "The enchantments aren't taking properly. The metal is flawed — it resists the binding runes. The enchantment formulas I'm given have changed. Key components have been removed. I've made tools for thirty years. These ones are failing in my hands before they even leave the workshop. And when I complained, I was told the formula changes were correct and I should execute them without question. I'm being forced to create tools that will fail when people rely on them. Fairhaven's working population is being equipped with deliberately compromised implements."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Craftsman revealed tool enchantment sabotage', `fairhaven-craftsman-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The tool craftsman becomes guarded. "My craft methods are proprietary. I don't discuss them with outsiders." He stops speaking and watches you with suspicion.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Tool craftsman now hostile to external inquiry', `fairhaven-craftsman-hostile-${G.dayCount}`);
      } else {
        G.lastResult = `The tool craftsman admits the tools haven't been as durable lately. "Materials are harder to source," he explains, though his doubt is evident. Tool quality seems to be degrading for reasons he won't fully articulate.`;
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
        G.lastResult = `Captain Vren speaks frankly. "My garrison has been cut by thirty percent in the past month. Supposedly temporary reassignments, but they're not coming back. Patrols that protected the supply routes are being reduced. The glyph cave perimeter is being monitored less frequently. I've complained to the Shrine Keeper, but the orders come with the weight of something higher — doctrine or decree, something that can't be questioned. It's like Fairhaven's defenses are being deliberately weakened. Someone wants us vulnerable."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Guard captain revealed garrison force reduction', `fairhaven-guard-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Captain Vren becomes formal. "Garrison operations are not subject to civilian inquiry. Ask questions about military matters again and you'll be restricted from Watchers' Perch." You're warned off military investigation.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Guard captain formally prohibits military inquiry', `fairhaven-guard-warning-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The guard captain admits garrison forces have been reduced recently. "Resource optimization," he calls it, though he seems uncomfortable with the explanation. Fairhaven's defenses are being scaled back.`;
        addJournal('investigation', 'Guard captain confirmed garrison force reduction', `fairhaven-guard-reduction-${G.dayCount}`);
      } else {
        G.lastResult = `The guard captain is professional but closed. "Garrison operations are handled according to broader strategic considerations. I can't discuss them."`;
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
        G.lastResult = `The Shrine Keeper (Keeper Ilsa) is conflicted. "Someone has been sending directives through the chapel hierarchy. Instructions for blessing procedures. Supply storage changes. Defense protocol modifications. They're framed as 'spiritual optimization' and 'faith advancement.' But they systematically weaken Fairhaven's practical capacity while appearing to strengthen it spiritually. I've worried I was implementing someone else's sabotage disguised as divine doctrine. The directives come through sealed channels from regional shrine authority. But something about them feels orchestrated rather than organic."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Shrine keeper revealed external directive manipulation', `fairhaven-shrine-keeper-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The Shrine Keeper becomes formally hostile. "This level of inquiry into shrine operations is inappropriate. You are no longer welcome in this chapel. Do not return." You are formally banned from the shrine.`;
        G.worldClocks.reverence++;
        addJournal('complication', 'Shrine keeper formally bans you from chapel', `fairhaven-shrine-keeper-ban-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The Shrine Keeper admits changes have been implemented through "official channels." She won't discuss their origin but acknowledges the changes are coming from external authority. The modifications are deliberate, not accidental.`;
        addJournal('investigation', 'Shrine keeper confirmed deliberate change implementation', `fairhaven-shrine-keeper-deliberate-${G.dayCount}`);
      } else {
        G.lastResult = `The Shrine Keeper is closed. "Shrine operations follow doctrine. Changes are made appropriately." No useful information gained.`;
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
        G.lastResult = `The innkeeper (Merrel) speaks quietly. "Supply shipments are being redirected through unusual routes. Normally they come direct from the south. Now they're being routed north through Watcher's Perch and the glyph cave perimeter before reaching Fairhaven. That adds days to the delivery schedule. A visiting merchant told me supplies are being held at an unmarked waystation outside the glyph cave for 'inspection and authorization.' Then some continue to Fairhaven, and some get diverted elsewhere. And the people coordinating this? They aren't local. They wear clothes from multiple regions and speak with accents I can't place. They're organizing something systematic."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Innkeeper mapped rerouted supply network', `fairhaven-innkeeper-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The innkeeper becomes protective. "I don't discuss supply business with strangers. That's confidential commercial information." She becomes guarded. Your questions about logistics are now noted as suspicious.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Innkeeper now distrustful of your supply questions', `fairhaven-innkeeper-hostile-${G.dayCount}`);
      } else {
        G.lastResult = `The innkeeper admits supply routing has become more complex lately. "More stops, more coordination," she says. Supplies are taking longer routes, though she's not entirely certain why.`;
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
        G.lastResult = `The glyph cave shows deliberate human activity. Waystation markers are being moved regularly. Storage areas are established and maintained. Someone is accessing the cave systematically and safely. The danger warnings about the glyph cave seem exaggerated — the area is treated as dangerous to keep people away, but expeditions are being conducted there routinely by people who know what they're doing. The cave is being used as a logistics hub, not avoided as a threat.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Survival analysis revealed glyph cave logistics operation', `fairhaven-survival-glyph-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `You're monitored while surveying the glyph cave perimeter. A voice calls out: "The glyph cave is off-limits for safety reasons. Leave immediately." You're escorted away by Watchers' Perch personnel.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'You are escorted away from glyph cave perimeter', `fairhaven-survival-caught-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The glyph cave perimeter shows signs of regular human activity. Markers and waypoints suggest deliberate access patterns. Someone is using the cave for purposes beyond what the official danger warnings suggest.`;
        addJournal('investigation', 'Survival analysis noted cave access patterns', `fairhaven-survival-pattern-${G.dayCount}`);
      } else {
        G.lastResult = `The glyph cave perimeter is genuinely dangerous. Glyphs are active and volatile. Any human activity is well-concealed from casual observation.`;
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
        G.lastResult = `You discover a hidden waystation in a shielded cave near the glyph perimeter. The scale is impressive: storage for grain, alchemical ingredients, tools, and documents. Shipping manifests show supplies redirected from Fairhaven. Contracts in multiple languages detail what's being stockpiled and where it's being sent. The operation is systematic and large-scale. Someone is running a massive supply redirection operation using the glyph cave as cover and Fairhaven's disruption as concealment. This isn't opportunistic — it's orchestrated resource extraction.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Survival analysis located hidden supply waystation', `fairhaven-survival-waystation-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your search of the glyph cave area is noticed by Watcher personnel. They confront you: "This area is restricted. You're trespassing on protected space." You're physically escorted away and formally warned.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'You are caught trespassing in glyph cave area', `fairhaven-survival-caught-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `You find evidence of hidden storage areas near the glyph cave. Supplies are being held somewhere in this region before being moved onward. The exact location isn't visible, but the pattern suggests a waystation exists.`;
        addJournal('investigation', 'Survival analysis found evidence of hidden storage', `fairhaven-survival-hidden-${G.dayCount}`);
      } else {
        G.lastResult = `The glyph cave area is difficult to search thoroughly. Any hidden waystations are well-concealed from casual reconnaissance.`;
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
        G.lastResult = `The enchantment formulas show professional sabotage. Key binding components have been removed or substituted. Activation runes have been altered to reduce their efficacy. The formulas are almost identical to the authentic versions, but each change degrades the final enchantment by ten to twenty percent. Someone with deep knowledge of Fairhaven's enchantment practices has subtly corrupted every formula in the system. The changes are designed to be difficult to detect but sufficient to cause tools to fail under stress. Fairhaven's people are being equipped with deliberately compromised implements.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Craft analysis revealed formula sabotage', `fairhaven-craft-formula-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your attempt to examine enchantment formulas is interrupted. A Shrine Keeper arrives: "Sacred formulas are not for outside examination. You're violating protected knowledge." You're removed from the shrine archives.`;
        G.worldClocks.reverence++;
        addJournal('complication', 'You are removed from shrine archives for formula inquiry', `fairhaven-craft-expelled-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The enchantment formulas show signs of modification. Recent versions differ from historical records in ways that seem deliberate but not obviously harmful. The changes subtly degrade enchantment quality.`;
        addJournal('investigation', 'Craft analysis noted formula modification patterns', `fairhaven-craft-modification-${G.dayCount}`);
      } else {
        G.lastResult = `The enchantment formulas are complex. Any modifications are too subtle to detect without extensive reference materials.`;
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
        G.lastResult = `The supply documents show professional forgery. Official seals have been reproduced with remarkable accuracy. Signature styles have been imitated perfectly. But under close examination, the paper stock differs subtly from genuine documents. The inks are contemporary forgeries of the historical materials used for authentic seals. Someone has created a full forgery operation to produce false supply documents that hide real diversions behind apparent legitimacy. This is sophisticated work. The operation has been running long enough to develop genuine-looking materials and signature expertise.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Craft analysis revealed document forgery operation', `fairhaven-craft-forgery-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your examination of supply documents draws attention. A merchant confronts you: "Those are confidential commercial records. Why are you examining them?" Word spreads that you're investigating document authenticity.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Your document examination reported to supply authority', `fairhaven-craft-caught-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The supply documents show signs of sophisticated alteration. Official seals and signatures appear authentic but have subtle inconsistencies. Someone may be forging documents to hide supply diversions.`;
        addJournal('investigation', 'Craft analysis found evidence of document alteration', `fairhaven-craft-alteration-${G.dayCount}`);
      } else {
        G.lastResult = `The supply documents appear authentic. Any forgeries are too sophisticated to detect without specialized reference materials.`;
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
        G.lastResult = `The historical doctrine records show that the glyph cave was understood as a threshold — dangerous but passable with proper preparation. Recent doctrine reframes it as an absolute barrier. The warnings have been intensified beyond what historical records justify. Someone has deliberately exaggerated the glyph danger to restrict access while conducting logistics operations inside. The cave barrier isn't growing stronger spiritually — it's being artificially emphasized to keep people away while someone exploits the area's isolation.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Lore analysis revealed exaggerated glyph doctrine', `fairhaven-lore-glyph-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your inquiry into glyph doctrine draws concern from the Shrine Keeper. "Questions about sacred doctrine should be directed to approved spiritual guides. Your external inquiry is inappropriate." Future access to shrine records is restricted.`;
        G.worldClocks.reverence++;
        addJournal('complication', 'Shrine restricts your access to doctrine records', `fairhaven-lore-restricted-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The glyph doctrine has been intensified recently. Historical records show less severe warnings about cave access than current teachings emphasize. The spiritual understanding seems to have shifted toward absolute barrier rather than managed danger.`;
        addJournal('investigation', 'Lore analysis noted doctrine intensification', `fairhaven-lore-intensified-${G.dayCount}`);
      } else {
        G.lastResult = `The glyph doctrine is complex and its historical evolution is difficult to trace from available records.`;
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
        G.lastResult = `Fairhaven's foundational philosophy taught that faith and practical necessity were complementary — faith gave meaning to practical work, and practical success validated faith. Recent theological teaching inverts this. Now doctrine says faith must be prioritized even when it undermines practical security. Blessings are emphasized over supplies. Spiritual efficiency is valued over material well-being. Someone has deliberately rewritten Fairhaven's philosophy to justify prioritizing doctrine-based changes over community survival. The inversion is subtle enough to avoid obvious recognition, but complete enough to justify every degradation being implemented.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Lore analysis revealed philosophical inversion', `fairhaven-lore-philosophy-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your research into Fairhaven's philosophical foundation is noted as potentially heretical. A Shrine Keeper warns: "The nature of faith is not a matter for outside scholarly debate. The shrine provides spiritual direction. Accept it or leave." Your access to theological materials is restricted.`;
        G.worldClocks.reverence++;
        addJournal('complication', 'Shrine restricts your philosophical research as heretical', `fairhaven-lore-heresy-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Fairhaven's philosophical teaching has shifted from balanced faith-and-necessity to faith-prioritizing doctrine. Recent teachings emphasize spiritual principles over practical concerns in ways that earlier records don't support.`;
        addJournal('investigation', 'Lore research confirmed philosophical shift', `fairhaven-lore-shift-${G.dayCount}`);
      } else {
        G.lastResult = `The philosophical evolution is complex and interpretation is subjective. Clear evidence of deliberate inversion is elusive.`;
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

      G.lastResult = `The market whisper is: "${selected}." Different people speak it with varying intensity. Farmers worry about tools failing during harvest. Merchants notice supply shortages. Families report that blessed items aren't providing expected protection. The practical problems are visible to everyone, but the cause remains abstract. Fairhaven is noticing systematic failure without yet understanding it's orchestrated.`;
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
        G.lastResult = `You witness a farmer using a blessed plow that fails mid-furrow. The plow shatters, destroying the season's work. The farmer is devastated but not surprised. "They told us the tool would last," he says quietly. "The enchantment was new. But these days, blessings don't hold." You examine the fragments. The metal shows signs of internal degradation that couldn't occur naturally. The enchantment runes are incomplete — key binding components are missing from what should have been a full binding. This tool was deliberately manufactured to fail. Someone has engineered Fairhaven's working population to depend on implements that will fail at critical moments.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Tool failure documented as deliberate manufacturing defect', `fairhaven-failure-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your investigation of the tool failure draws suspicion. "Why are you so interested in how our tools break?" people ask. Someone reports that you're examining community failures with unusual interest.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Your investigation of tool failure reported as suspicious', `fairhaven-failure-suspicious-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `You examine the failed tool and document the fragments. The enchantment is incomplete and the material shows internal flaws. The failure appears to be deliberate manufacturing rather than random degradation.`;
        addJournal('investigation', 'Tool failure analysis suggests intentional defect', `fairhaven-failure-intentional-${G.dayCount}`);
      } else {
        G.lastResult = `The tool failure appears to be ordinary wear and degradation. The specific cause is difficult to determine without extensive analysis.`;
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
        G.lastResult = `Families are approaching genuine crisis. A widow describes rationing food that should be abundant. A craftsperson can't source basic materials. A mother worries about whether there will be enough provisions for winter. The individual stories collectively paint a picture of systematic scarcity. When you note that supplies are being diverted and rationing shouldn't be necessary, people respond with resignation. "We're told it's the will of faith," they say. "We're supposed to endure and trust the shrine." Fairhaven is being systematically impoverished while being taught to accept it as spiritual necessity.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Community impact testimony documented systematic scarcity', `fairhaven-crisis-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your questions about how the shortages are affecting people make families defensive. "Why are you interrogating us about our struggles?" They become guarded and stop speaking openly.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Community becomes defensive about scarcity inquiry', `fairhaven-crisis-defensive-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Families admit to growing concerns about supplies and tool availability. They're worried but haven't yet connected the individual failures into a systematic pattern.`;
        addJournal('investigation', 'Community scarcity concerns documented', `fairhaven-crisis-concern-${G.dayCount}`);
      } else {
        G.lastResult = `Families are reluctant to discuss their struggles with an outsider. Individual scarcity is acknowledged but collective pattern goes unspoken.`;
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
        G.lastResult = `You compile comprehensive evidence: formula sabotage, supply diversions, garrison reductions, doctrine inversions, community impact testimony, tool failures, document forgeries. Together, they prove systematic weaponization. Fairhaven's institutions — shrine, garrison, supply chain — have been infiltrated and repurposed. Doctrine has been rewritten to justify material degradation. Community is being taught to accept scarcity as spiritual necessity. The physical infrastructure is being deliberately degraded while institutional authority is used to suppress recognition of the sabotage. Someone with deep knowledge of Fairhaven has redesigned every system to serve systematic impoverishment disguised as faith advancement.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Institutional weaponization conspiracy documented', `fairhaven-conspiracy-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your compilation of evidence is noticed. Someone realizes you're connecting pieces and building a comprehensive accusation. You're warned directly: "Stop investigating the shrine. This is your final warning. Continue and Fairhaven will respond."`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Conspiracy operators directly threaten your investigation', `fairhaven-conspiracy-threat-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `You compile substantial evidence of systematic corruption. The pieces align to show deliberate weaponization of Fairhaven's institutions. The conspiracy is visible but not yet entirely complete.`;
        addJournal('investigation', 'Substantial weaponization evidence compiled', `fairhaven-conspiracy-substantial-${G.dayCount}`);
      } else {
        G.lastResult = `Individual evidence pieces exist but connecting them into a complete institutional conspiracy requires evidence still missing.`;
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
        G.lastResult = `The supply orders specify the traditional compound ingredients precisely. The delivery receipts show "equivalent substitution approved per regional materials update" — a category that exists in the administrative system but which the shrine's own records show was never formally enacted. Someone inserted a substitution authorization that isn't backed by any actual policy change. The formula was changed through a bureaucratic ghost — a category that looks official but has no origin.`;
        if (!G.flags) G.flags = {};
        G.flags.found_formula_substitution = true;
        addJournal('investigation', 'Formula substitution: ghost authorization category used — no backing policy, substitution inserted covertly', `fairhaven-formula-${G.dayCount}`);
      } else {
        G.lastResult = `You find the supply records but the delivery receipts reference a regional administrative code you don't have a reference guide for. The substitution is documented — you just can't decode the authorization chain without further resources.`;
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

      G.lastResult = `The garrison reductions happened in three tranches, each occurring one week after a shrine doctrine revision announcement. The timing is too consistent to be coincidence: first the doctrine changes what the community accepts, then the garrison is reduced before resistance can organize. The sequence is designed. Someone used doctrinal acceptance as a leading indicator for when the security reduction would face minimal organized pushback.`;
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
        G.lastResult = `You find a Collegium address in the civic registry but no one answers at the listed location. The Collegium presence here is light or intentionally low-profile.`;
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

      G.lastResult = `After the official gathering disperses, a smaller group remains. Older community members. They perform a different version of the ceremony — the pre-revision form, from memory, without the new doctrinal additions. No compound burned. No embedded monitors present. They finish quickly and leave separately. The original practice survives in the margins of the new one, preserved by people old enough to remember what was there before.`;
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
        G.lastResult = `Elder Cassian is eighty-three and unhurried. "The compound changed about a year ago. I could smell the difference immediately. The new formula doesn't carry the same quality of presence. It carries quiet." She pauses. "I know the difference between sacred quiet and managed quiet. This is managed." She kept a sample of the old compound. She'll give it to you — "so someone can name what was taken."`;
        G.flags.met_elder_cassian = true;
        addJournal('contact', 'Elder Cassian: recognized compound substitution by smell, has original sample, knows the community is being managed', `fairhaven-cassian-${G.dayCount}`);
      } else {
        G.lastResult = `The elder is willing to talk but becomes cautious when the conversation approaches specifics. She's lived through enough transitions to know when speaking plainly is dangerous.`;
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
        G.lastResult = `Corporal Nyse wasn't transferred — she was retained specifically. "They kept six of us. The ones who'd been here longest. I think they kept us because we know the community. We'd recognize faces in a crowd." She says it without accusation. She hasn't connected what she's describing to what it means. The retained garrison soldiers are the ones with community knowledge: surveillance assets in military uniforms.`;
        if (!G.flags) G.flags = {};
        G.flags.met_nyse_garrison = true;
        addJournal('contact', 'Corporal Nyse: retained specifically for community knowledge — long-term soldiers being used as surveillance assets', `fairhaven-nyse-${G.dayCount}`);
      } else {
        G.lastResult = `The soldier is professional and brief. "Orders." That's the full explanation she's willing to give.`;
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
