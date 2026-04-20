/**
 * SHELKOPOLIS STAGE 1 ENRICHED MEANINGFUL CHOICES
 * 20 deeply grounded investigation paths tied to NPC work and locality tensions
 * Generated for: Trade vs dignity, refinement vs necessity, public harmony vs covert rivalry
 * Each choice: 60-80 XP, grounded in specific NPC perspective, layered wrongness reveal
 */

const SHELKOPOLIS_STAGE1_ENRICHED_CHOICES = [
  // ========== NPC-GROUNDED CHAINS (8 CHOICES) ==========
  
  // 1. INNKEEPER: GUEST PATTERNS
  {
    label: "Ask the Amber Fountain innkeeper about recent guests — who's stayed, and has anything felt off about their requests?",
    tags: ['Investigation', 'NPC', 'Observation', 'Intelligence', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'gathering intelligence from trusted source');
      G.stageProgress[1]++;

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      const target = 11 + Math.max(0, G.worldClocks.pressure);

      if (result.isCrit) {
        G.lastResult = `The Amber Fountain innkeeper (Marta) relaxes. "You should know this," she says quietly. "Three wealthy travelers from different regions arrived last week. All asked about northern routes discreetly. All paid in fresh coin. All left sealed letters at the Silkweaver's Chapel instead of usual messengers. I've run this inn for twenty years. I know when guests are hiding something."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Innkeeper flagged unnatural guest coordination', `shelkopolis-innkeeper-guests-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The innkeeper's expression closes. "I don't discuss guests with strangers, even ones who stay." Her tone has changed. You've made an enemy of someone who hears everything in Shelkopolis.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Innkeeper now distrustful', `shelkopolis-innkeeper-hostile-${G.dayCount}`);
      } else {
        G.lastResult = `The innkeeper mentions a few recent guests seemed unusually careful about their movements. One asked for a room without the main entrance view. Another left early and paid extra to not be mentioned to anyone. "Nothing concrete," she says, "but the pattern registers strange."`;
        addJournal('investigation', 'Innkeeper noticed unusual guest discretion', `shelkopolis-innkeeper-caution-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 2. INNKEEPER: SEALED LETTERS
  {
    label: "Investigate the pattern of sealed letters left at Silkweaver's Chapel — who delivers them, who receives them, what's the frequency?",
    tags: ['Investigation', 'NPC', 'Evidence', 'Mystery', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering covert communication network');
      G.stageProgress[1]++;

      const result = rollD20('investigation', (G.skills.investigation || 0) + Math.floor(G.level / 3));
      
      if (result.isCrit || (result.total >= 13 && !result.isFumble)) {
        G.lastResult = `The chapel helper (Brother Aldwin) is conflicted but answers. A pattern emerges: sealed letters arrive twice weekly, always Thursday and Sunday evenings. They're taken by a veiled intermediary who speaks in trade tongue with a northern accent. No names exchanged. The letters smell faintly of wax and something else — something ceremonial. Brother Aldwin whispers: "It feels wrong. Blessings don't work the same since this started."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Sealed letter network mapped to chapel intermediary', `shelkopolis-letters-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your questions draw too much attention. A chapel worker warns you pointedly: the shrine master does not welcome curiosity about chapel matters. You feel watched now in this sacred space.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Chapel now aware of investigation', `shelkopolis-chapel-alert-${G.dayCount}`);
      } else {
        G.lastResult = `Brother Aldwin admits letters come through the chapel. He won't elaborate on frequency or recipients, but you notice his hands shake slightly when you mention them. There's fear here — fear of consequences for speaking.`;
        addJournal('investigation', 'Chapel involved in letter routing but details refused', `shelkopolis-letters-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 3. TAILOR: PATTERN DESIGNS DISAPPEARING
  {
    label: "Visit the tailor shops in Verdant Row — ask about the sudden disappearance of certain fabric patterns and design commissions.",
    tags: ['Investigation', 'NPC', 'Craft', 'Trade', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading commercial disruption');
      G.stageProgress[1]++;

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Master tailor Sereth confides in you over wine. "Three months ago, a patron commissioned twelve bolts of Verdant threadweave — a pattern that takes six weeks to complete. The patron disappeared. Never collected. Paid in full. Now, two other patrons have commissioned the same pattern and also vanished mid-project. It's like someone's ordering the pattern to prevent us from weaving it for anyone else. Trade doesn't work this way."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Tailor identified pattern commissioning as deliberate interference', `shelkopolis-tailor-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The tailor becomes curt. "That's guild business, not street conversation." He turns his back and returns to his loom. You're reminded that Shelkopolis artisans protect their mysteries.`;
        addJournal('complication', 'Tailor refuses future inquiry', `shelkopolis-tailor-silent-${G.dayCount}`);
      } else {
        G.lastResult = `The tailor mentions a unusual order pattern lately — high-paying commissions that get abandoned before completion. "Rare for Shelkopolis," he notes. "Usually patrons see their work through." Something about the economics feels deliberately broken.`;
        addJournal('investigation', 'Tailor acknowledged unusual commission abandonment', `shelkopolis-tailor-pattern-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 4. CLERK/RECORD KEEPER: LEDGER DISCREPANCIES
  {
    label: "Access the trade registry at the Shelkopolis merchant house — cross-reference recent commodity ledgers for missing entries or altered records.",
    tags: ['Investigation', 'NPC', 'Records', 'Bureaucracy', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering administrative concealment');
      G.stageProgress[1]++;

      const result = rollD20('investigation', (G.skills.investigation || 0) + Math.floor(G.level / 3));
      
      if (result.isCrit) {
        G.lastResult = `The record keeper (Thom) is terrified but complies after you mention the seal of House Shelk. He points to gaps in the ledger. "See here? Entries for silkwood shipments from the northern territories. They stop abruptly three weeks ago. Not declined — just erased. Someone with ledger access removed them. Usually, erasures leave traces. These are clean. Professional."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Clerk revealed three-week gap in northern trade records', `shelkopolis-ledger-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The record keeper refuses access entirely. "You need written authorization from the merchant council. Those are official records." He calls for guards. Your presence in the merchant house is now officially noted and questioned.`;
        G.worldClocks.attention++;
        addJournal('complication', 'Merchant house guards now investigating your inquiry', `shelkopolis-merchant-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The record keeper shows you the ledgers after some persuasion. You notice pages have been carefully removed — not torn hastily, but extracted with deliberation. The dates correspond to the autumn trade season. Whatever was recorded, someone wanted it gone permanently.`;
        addJournal('investigation', 'Clerk confirmed deliberate ledger removal pattern', `shelkopolis-ledger-removed-${G.dayCount}`);
      } else {
        G.lastResult = `The record keeper is polite but unhelpful. "Official records require official request. I'm sure you understand." You gain no access but also no enemy.`;
        addJournal('investigation', 'Merchant house records inaccessible without formal authorization', `shelkopolis-ledger-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 5. SHRINE HELPER: BLESSING EFFECTS DEGRADING
  {
    label: "Consult with shrine workers about changes in ritual effectiveness — are blessings weaker? Are wards degrading?",
    tags: ['Investigation', 'NPC', 'Divine', 'Ritual', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading spiritual corruption');
      G.stageProgress[1]++;

      const result = rollD20('insight', (G.skills.insight || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Sister Velda speaks with genuine fear. "The prayers are answered slower now. Blessings that protected merchants for decades... they're fading faster. We've increased rituals by forty percent just to maintain the same coverage. And the worst part? We don't know why. The formulas haven't changed. The faith is as strong. Something external is draining the blessing capacity." She looks haunted: "Shelkopolis's protection is eroding."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Shrine worker revealed systematic blessing degradation', `shelkopolis-blessing-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Sister Velda is insulted by the question. "The shrine's work is beyond scrutiny from outsiders. Our blessings are eternal. If you lack faith, that is your failing, not ours." She closes the conversation with finality. The shrine is now hostile to inquiry.`;
        G.worldClocks.reverence++;
        addJournal('complication', 'Shrine now hostile to external questioning', `shelkopolis-shrine-hostile-${G.dayCount}`);
      } else {
        G.lastResult = `The shrine worker is evasive but admits that blessings require renewal more frequently lately. "It's normal variation," they claim, though their uncertainty suggests otherwise. Something unseen is working against the shrine's protective magic.`;
        addJournal('investigation', 'Shrine worker confirmed increased blessing maintenance needs', `shelkopolis-blessing-strain-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 6. MARKET BROKER: TRADE FLOW CHANGES
  {
    label: "Question market brokers about recent commodity flow disruptions — what goods are scarce, what routes are blocked, what's changed in the supply chain?",
    tags: ['Investigation', 'NPC', 'Commerce', 'Economics', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'deciphering economic pressure');
      G.stageProgress[1]++;

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + (G.skills.insight || 0) / 2 + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Broker Kaen pulls you aside to a quiet corner. "Northern silkwood hasn't arrived in three weeks. The supply is artificially constrained. Someone is intentionally cutting Shelkopolis off from its primary trade good. Whoever's doing this has leverage over the northern territories — or someone does. I don't know if it's political or criminal, but the market doesn't move this cleanly without coordination." He's pale: "If this continues, Shelkopolis's wealth becomes vulnerable."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Broker mapped deliberate supply chain isolation', `shelkopolis-broker-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The broker clams up immediately. "I don't discuss market conditions with investigators. That's insider talk. Walk away." His protective wall is instant. Word will likely spread that you're asking pointed questions.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Broker warned other merchants of your inquiry', `shelkopolis-broker-alert-${G.dayCount}`);
      } else {
        G.lastResult = `Broker Kaen admits that silkwood supplies are tighter than usual. "Seasonal variation," he suggests, but his tone lacks conviction. The supply issue is real, though he won't specify its cause.`;
        addJournal('investigation', 'Broker confirmed silkwood supply shortage', `shelkopolis-broker-supply-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 7. PATROL CAPTAIN: ENFORCEMENT PATTERN SHIFTS
  {
    label: "Speak with a patrol captain about recent enforcement changes — are patrols rotating differently, are certain neighborhoods being avoided or over-policed?",
    tags: ['Investigation', 'NPC', 'Enforcement', 'Authority', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading enforcement reallocation');
      G.stageProgress[1]++;

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Captain Thorne is candid after a drink. "Something's off. Garrison orders have shifted twice in as many weeks. We're avoiding the Ironspool district at night now — officially for 'resource optimization,' but everyone knows it's because someone with authority said so. And we've doubled patrols near the temple district, but there's no official threat. Someone's moving us around like pieces on a board, and the garrison commander won't explain why."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Patrol captain revealed re-orchestrated garrison positioning', `shelkopolis-patrol-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Captain Thorne bristles. "You're asking questions about garrison operations? That's above your clearance. Stop asking around about patrol patterns, or we'll have a different kind of conversation." The city guard now sees you as a security concern.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'City guard now viewing you as potential threat', `shelkopolis-patrol-hostile-${G.dayCount}`);
      } else {
        G.lastResult = `Captain Thorne admits patrol patterns have shifted due to "operational priorities" but won't elaborate. Whatever the changes are, they're being kept confidential from lower ranks.`;
        addJournal('investigation', 'Patrol captain confirmed shift in garrison priorities', `shelkopolis-patrol-shift-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 8. CHAPEL WORKER: FAITH AND COERCION
  {
    label: "Speak confidentially with a chapel worker about whether people's faith feels forced or coerced lately — are confession patterns changing?",
    tags: ['Investigation', 'NPC', 'Faith', 'Psychology', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering spiritual coercion');
      G.stageProgress[1]++;

      const result = rollD20('insight', (G.skills.insight || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Brother Aldwin confesses in a whisper. "The confessions have changed. More people are confessing fear, not guilt. They speak of being watched. Of expectations they don't understand. Of pressure from sources they can't name. It's like Shelkopolis is being spiritually compressed. The faith is still there, but it's boxed in, suffocating." He's disturbed: "Something is using the chapel as a lever."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Chapel worker revealed coerced faith patterns in confessions', `shelkopolis-faith-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The chapel worker is appalled at the question. "Confession is sacred and private. You're asking me to violate sanctity itself. Leave this place now, or I'll report you to the shrine master." The chapel is now hostile.`;
        G.worldClocks.reverence++;
        addJournal('complication', 'Chapel worker will report your violation of sacred space', `shelkopolis-chapel-hostile-${G.dayCount}`);
      } else {
        G.lastResult = `Brother Aldwin is uncomfortable with the question. He admits people seem "more anxious" but won't elaborate. Whatever spiritual pressure exists, it's being consciously guarded by the chapel hierarchy.`;
        addJournal('investigation', 'Chapel worker noted increased anxiety in congregants', `shelkopolis-faith-anxiety-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== ARCHETYPE DEEP DIVES (8 CHOICES) ==========
  
  // 9. COMBAT TIER 1: GARRISON STRUCTURE ANOMALIES
  {
    label: "Analyze the Shelkopolis garrison's defensive structure — are weapons stores being relocated, or are fortifications being modified?",
    tags: ['Investigation', 'Combat', 'Military', 'Anomaly', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'military structural analysis');
      G.stageProgress[1]++;

      const result = rollD20('perception', (G.skills.perception || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The garrison's layout reveals deliberate restructuring. Weapon stores have been relocated to less defensible positions — unusual for a military operation. Fortifications near the trade district have been weakened, while defenses around administrative buildings have been reinforced. This isn't about safety; it's about controlling what can be defended and what can't. The garrison has been quietly rearranged to make Shelkopolis vulnerable in specific directions.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Combat analysis revealed deliberate garrison restructuring', `shelkopolis-garrison-struct-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Guards notice your detailed interest in garrison fortifications. They question your purpose pointedly. "We don't allow detailed reconnaissance. Move along." Your military reconnaissance has drawn attention.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Garrison guards alerted to reconnaissance attempt', `shelkopolis-garrison-alert-${G.dayCount}`);
      } else {
        G.lastResult = `The garrison's structure is visible, but the meaning is unclear. Some fortifications seem recently modified, but you can't determine whether the changes represent weakness or adaptation. The military is keeping something hidden.`;
        addJournal('investigation', 'Combat analysis noted unexplained recent fortification changes', `shelkopolis-garrison-changes-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 10. COMBAT TIER 2: SUPPLY LOG DISCREPANCIES
  {
    label: "Obtain access to garrison supply logs — are weapons, grain, or medical stores being secretly transferred or depleted?",
    tags: ['Investigation', 'Combat', 'Supply', 'Logistics', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'military logistics analysis');
      G.stageProgress[1]++;

      const result = rollD20('investigation', (G.skills.investigation || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The quartermaster is drunk enough to talk. Supply logs show weapons transfers to an unmarked warehouse in the Ironspool district — not official garrison equipment, but redirected from stores. The transfers are marked as "training surplus" but the numbers don't match standard rotation. Someone's been building an off-books armory. And the quartermaster was ordered to keep records incomplete: "I was told it was for tactical security. But I think someone's preparing for something the garrison command doesn't know about."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Quartermaster revealed off-books weapons redistribution', `shelkopolis-supply-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The quartermaster refuses all access and reports your inquiry to the garrison commander. You're now flagged as attempting to breach military security. The garrison will be watching you specifically.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Garrison commander personally aware of your inquiry', `shelkopolis-commander-alert-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `You gain partial access to supply logs. Some entries appear altered or incomplete. Recent transfers of weapons and grain to external locations are marked generically as "approved redistributions." The pattern suggests deliberate obfuscation, but you can't prove it.`;
        addJournal('investigation', 'Supply logs show signs of deliberate obfuscation', `shelkopolis-supply-obfuscated-${G.dayCount}`);
      } else {
        G.lastResult = `The quartermaster is cagey. Supply logs are "restricted to garrison officers." Without higher authority, you can't access them.`;
        addJournal('investigation', 'Supply logs blocked without military authorization', `shelkopolis-supply-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 11. MAGIC TIER 1: WARD PLACEMENTS ALTERED
  {
    label: "Read the arcane architecture of Shelkopolis — have protective ward placements shifted, or are new wards being installed in unusual locations?",
    tags: ['Investigation', 'Magic', 'Wards', 'Arcane', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'arcane architecture analysis');
      G.stageProgress[1]++;

      const result = rollD20('arcana', (G.skills.arcana || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The arcane signature of Shelkopolis reveals intentional restructuring. Traditional protective wards that covered trade routes and marketplaces have been weakened or removed. New wards have been installed in a perimeter around administrative buildings and the garrison. More importantly, the new wards don't protect — they contain. They're designed to keep people in specific zones, not defend against external threats. The entire spell architecture has been inverted. Someone with deep arcane knowledge has rewritten Shelkopolis's magical foundations.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Magic analysis revealed inverted ward architecture', `shelkopolis-wards-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `As you probe the ward structure, you trigger a magical alarm. Arcane pressure surges. A watcher spell activates — someone was monitoring the wards for exactly this kind of intrusion. The shrine will know someone attempted to read their magical defenses.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Shrine magical alarm triggered by ward probe', `shelkopolis-ward-alarm-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The wards show signs of recent modification. Their alignment has shifted, though the changes are subtle. The protective coverage no longer blankets the entire city uniformly — instead, it clusters around specific structures. The redistribution was deliberate.`;
        addJournal('investigation', 'Magic analysis noted uneven ward redistribution pattern', `shelkopolis-wards-uneven-${G.dayCount}`);
      } else {
        G.lastResult = `The wards are complex. You can sense they've been modified, but the details elude you. The magical architecture is beyond your current clarity.`;
        addJournal('investigation', 'Ward modifications detected but details unclear', `shelkopolis-wards-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 12. MAGIC TIER 2: RITUAL FORMULA CORRUPTION
  {
    label: "Study ritual formulas used by the shrine — have the underlying magical structures been altered, or are component ratios changing?",
    tags: ['Investigation', 'Magic', 'Ritual', 'Corruption', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering ritual sabotage');
      G.stageProgress[1]++;

      const result = rollD20('arcana', (G.skills.arcana || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Sister Velda lets you examine the ritual books under seal of confidentiality. The formulas are corrupted subtly — component measurements have been altered by fractions. Not enough to immediately fail rituals, but enough to degrade their efficacy over time. Someone with intimate knowledge of shrine practices has been systematically weakening blessings from within the ritual structure itself. This required access to the ritual books, understanding of sacred geometry, and knowledge of exactly how much to change without raising immediate suspicion. The corruption is surgical, deliberate, and deeply embedded.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Magic analysis revealed systematic ritual formula corruption', `shelkopolis-ritual-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The shrine refuses access. Your attempt to examine ritual materials is considered a violation of sacred trust. The shrine will now actively resist your investigations.`;
        G.worldClocks.reverence++;
        addJournal('complication', 'Shrine vowed to obstruct future inquiries', `shelkopolis-ritual-blocked-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The ritual formulas show signs of tampering. Some component ratios appear off-standard, though you can't prove it's deliberate without comparing to archived versions.`;
        addJournal('investigation', 'Ritual formulas show signs of modification', `shelkopolis-ritual-altered-${G.dayCount}`);
      } else {
        G.lastResult = `The ritual formulas are complex. You sense something might be amiss, but the shrine guards its sacred knowledge carefully.`;
        addJournal('investigation', 'Ritual access granted but formulas too complex to analyze', `shelkopolis-ritual-complex-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 13. STEALTH TIER 1: UNGUARDED PASSAGES CLOSING
  {
    label: "Map the hidden routes and blind angles through Shelkopolis — are escape passages being sealed, or are new surveillance points being installed?",
    tags: ['Investigation', 'Stealth', 'Routes', 'Surveillance', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'covert route mapping');
      G.stageProgress[1]++;

      const result = rollD20('stealth', (G.skills.stealth || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The hidden routes through Shelkopolis reveal a systematic restructuring. Escape passages through Verdant Row have been deliberately blocked with rubble and construction. New guard posts have been installed at key junction points, positioned to monitor movement without being obvious. Someone's been methodically closing off unmonitored paths through the city. The free movement of Shelkopolis is being constrained. Anyone moving discreetly through the city will now be funneled into observed routes.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Stealth analysis revealed systematic route closure', `shelkopolis-routes-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `You're spotted moving through restricted areas. Patrol guards challenge you aggressively. Your attempt at covert reconnaissance has been noticed and reported.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Your covert movement reported to patrol command', `shelkopolis-route-caught-${G.dayCount}`);
      } else {
        G.lastResult = `Several hidden routes remain accessible, but you notice new barriers in places. Some passages that were open appear to have been recently sealed. The pattern suggests deliberate restriction.`;
        addJournal('investigation', 'Stealth mapping confirmed recent route restrictions', `shelkopolis-routes-restricted-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 14. STEALTH TIER 2: INFORMATION NETWORKS TIGHTENING
  {
    label: "Infiltrate the information network of Shelkopolis — are street informants being silenced, or are whisper chains being monitored?",
    tags: ['Investigation', 'Stealth', 'Intelligence', 'Networks', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'penetrating surveillance network');
      G.stageProgress[1]++;

      const result = rollD20('deception', (G.skills.deception || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `An older street informant (Crow) trusts you enough to confess. The whisper network that once moved freely through Shelkopolis is being monitored. Not by the garrison — by someone with resources and reach. Informants who talk too freely about certain topics disappear for days, then reappear chastened and silent. "Someone's breaking the network from the inside," Crow says. "Making examples. I'm careful now about what I share. We all are. The city's losing its voice."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Stealth infiltration revealed suppressed information network', `shelkopolis-info-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your attempt to infiltrate the information network backfires. You're identified as an outsider asking pointed questions. Word spreads through the street underworld that you're dangerous or an informant. The street community now avoids you.`;
        G.worldClocks.isolation++;
        addJournal('complication', 'Street informants now view you as hostile', `shelkopolis-info-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `You make contact with the information network. Most informants are guarded but acknowledge that things have changed. They're less talkative than usual, and they seem worried about being overheard.`;
        addJournal('investigation', 'Information network confirmed to be operating under constraint', `shelkopolis-info-constrained-${G.dayCount}`);
      } else {
        G.lastResult = `The street informants are evasive. The information network is there, but it's locked down against outsiders.`;
        addJournal('investigation', 'Information network inaccessible without deeper trust', `shelkopolis-info-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 15. SUPPORT TIER 1: SOCIAL FABRIC DEGRADING
  {
    label: "Study community bonds in Shelkopolis — are traditional gathering places being avoided, or are social networks fraying?",
    tags: ['Investigation', 'Support', 'Community', 'Social', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'community analysis');
      G.stageProgress[1]++;

      const result = rollD20('insight', (G.skills.insight || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The social deterioration of Shelkopolis is visible. The Amber Fountain Inn used to host neighborhood councils. Now people drink quietly alone. The market that once buzzed with negotiation is tense and transactional. Families aren't gathering in public squares. Something has made Shelkopolis's citizens afraid to congregate freely. The casual social bonds that held the city together are being systematically severed through pressure and fear. The city is being isolated from itself.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Support analysis revealed systematic social isolation', `shelkopolis-social-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your questioning about community bonds makes people uncomfortable. They interpret your interest as either investigative scrutiny or nosiness. People withdraw further from you.`;
        G.worldClocks.distance++;
        addJournal('complication', 'Community now views you with suspicion', `shelkopolis-social-hostile-${G.dayCount}`);
      } else {
        G.lastResult = `Community gathering spaces show signs of reduced activity. The Amber Fountain is quieter than expected. Market interactions seem more cautious. Something's changed in how people relate to each other.`;
        addJournal('investigation', 'Community patterns show reduced social interaction', `shelkopolis-social-quiet-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 16. SUPPORT TIER 2: TRUST EROSION AND FEAR MAPPING
  {
    label: "Document the specific fears and broken relationships in Shelkopolis — who's afraid of whom, and what promises have been broken?",
    tags: ['Investigation', 'Support', 'Fear', 'Trust', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'mapping institutional distrust');
      G.stageProgress[1]++;

      const result = rollD20('insight', (G.skills.insight || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `After careful listening, a pattern emerges. Merchants are afraid to communicate with each other for fear of being reported. Artisans won't collaborate on shared projects. The garrison is distrusted by civilians. Civilians distrust each other. The shrine no longer feels like a sanctuary. And beneath all of it, there's fear of unnamed consequences. Someone has weaponized distrust itself — fracturing Shelkopolis not through overt control but through the systematic destruction of mutual confidence. Fear has become the city's invisible infrastructure.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Support analysis mapped weaponized distrust network', `shelkopolis-trust-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your attempt to probe people's fears makes them defensive. They think you're either a threat or an agent trying to gather compromising information. Multiple people report your questioning to authorities.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Your fear mapping queries reported to authorities', `shelkopolis-trust-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `People admit to being careful about who they trust lately. Broken promises and unexplained fears are common topics. Something's happened that fractured the city's internal bonds.`;
        addJournal('investigation', 'Widespread trust degradation confirmed by citizen interviews', `shelkopolis-trust-confirmed-${G.dayCount}`);
      } else {
        G.lastResult = `People are guarded about discussing their fears and broken relationships. You sense distrust is present but can't map its specific sources.`;
        addJournal('investigation', 'Distrust sensed but not fully documented', `shelkopolis-trust-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== GOSSIP & TENSION LAYERS (4 CHOICES) ==========

  // 17. STREET RUMOR: SURFACE SOCIAL TENSION
  {
    label: "Gather street rumors at the market — what are people whispering about? What story is spreading through Shelkopolis?",
    tags: ['Investigation', 'Rumor', 'Social', 'Gossip', 'Meaningful'],
    xpReward: 65,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'parsing popular narrative');
      G.stageProgress[1]++;

      const rumor = ['the garrison is moving weapons in the night', 'northern traders have disappeared', 'the shrine blessings are failing', 'someone is buying silence with gold', 'the merchant council is hiding something'];
      const selected = rumor[Math.floor(Math.random() * rumor.length)];

      G.lastResult = `The market whisper is: "${selected}." It's repeated by merchants, laborers, and vendors with varying confidence. The rumor itself is fragmented — no one knows the full story, only pieces they've heard or inferred. But the collective anxiety is real. Shelkopolis is noticing wrongness, even if it can't articulate it clearly yet.`;
      addJournal('investigation', `Street rumor gathered: "${selected}"`, `shelkopolis-rumor-${G.dayCount}`);

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 18. INSTITUTIONAL CRACK: PROOF OF INTENTIONAL MISALIGNMENT
  {
    label: "Expose the contradiction between official narrative and documented reality — find proof that Shelkopolis's institutions are being actively subverted, not just failing.",
    tags: ['Investigation', 'Evidence', 'Proof', 'Systematic', 'Meaningful'],
    xpReward: 80,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(80, 'exposing institutional conspiracy');
      G.stageProgress[1]++;

      const result = rollD20('investigation', (G.skills.investigation || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `You piece together documents: official garrison orders showing weapon redistributions to off-books locations. Shrine ledgers showing ritual formula tampering. Trade records with entries deliberately removed. Individual pieces are inconclusive, but together they form undeniable proof of coordination. Someone with access to garrison, shrine, and merchant records has been systematically weakening Shelkopolis's institutions from within. This is not accident or gradual decay — this is conspiracy. The wrongness has a hand behind it.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Institutional conspiracy documentation compiled', `shelkopolis-proof-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your investigation draws the wrong kind of attention. Someone notices you're connecting pieces that weren't meant to be connected. You're warned off the investigation through channels that make your danger clear.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Investigation directly noticed by conspiracy operators', `shelkopolis-proof-caught-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `You find enough contradictions between official statements and documented facts to suggest intentional misalignment. It's not conclusive proof, but it's compelling enough to shift your understanding from "something's wrong" to "something is being done."`;
        addJournal('investigation', 'Compelling contradiction evidence found', `shelkopolis-proof-partial-${G.dayCount}`);
      } else {
        G.lastResult = `Individual pieces of evidence exist, but without connecting them all, you can't distinguish between coincidence and conspiracy. The full pattern remains incomplete.`;
        addJournal('investigation', 'Evidence fragments found but incomplete', `shelkopolis-proof-incomplete-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 19. MORAL PRESSURE: COMPLICITY OR RESISTANCE CHOICE
  {
    label: "Confront a key figure who may be complicit in the conspiracy — demand an explanation and decide whether to protect them or expose them.",
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
        { name: 'Brother Aldwin', role: 'shrine helper', fear: 'They threatened my family' },
        { name: 'Thom', role: 'record keeper', fear: 'I was ordered to alter records or face dismissal' },
        { name: 'Marta', role: 'innkeeper', fear: 'They said if I spoke, my business would close' }
      ];

      const npc = npcOptions[Math.floor(Math.random() * npcOptions.length)];

      G.lastResult = `You confront ${npc.name}. They crumble under pressure. "${npc.fear}." They're afraid, complicit, and trapped. You must decide: Do you expose them to save Shelkopolis? Do you protect them and maintain your investigation quietly? Your choice determines whether this person becomes an enemy or an ally — and whether Shelkopolis's institutions fracture further or begin to trust.`;

      G.moralChoice = {
        protect: `Offer to shield ${npc.name} if they provide information. Build an informant. Risk becoming complicit yourself.`,
        expose: `Report ${npc.name}'s complicity. Pressure the system. But you'll have made an enemy who might warn the conspiracy.`
      };

      addJournal('moral-choice', `Confronted ${npc.name} (${npc.role}) about complicity`, `shelkopolis-moral-${G.dayCount}`);

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 20. DISCOVERY MOMENT: WRONGNESS CONFIRMED AND ORIGIN REVEALED
  {
    label: "Find the central evidence that confirms the wrongness — discover the origin source directing the corruption from outside Shelkopolis.",
    tags: ['Investigation', 'Origin', 'Discovery', 'Climax', 'Meaningful'],
    xpReward: 80,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(80, 'discovering origin source of corruption');
      G.stageProgress[1]++;
      G.stageProgress[1]++;

      const result = rollD20('investigation', (G.skills.investigation || 0) + (G.skills.arcana || 0) / 2 + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Behind the sealed letters, the altered records, the corrupted rituals — you find the thread that leads out of Shelkopolis. A correspondence in northern trade tongue, hidden in the chapel's letter system. Orders sent from beyond the city's borders, directing the garrison commander, the shrine hierarchy, the merchant council. Shelkopolis is being systematically sabotaged from outside. Someone in the northern territories — or someone with northern allies — is coordinating the corruption. They're not trying to destroy the city; they're trying to break it into submission. And the conspiracy has only just begun.`;
        G.stageProgress[1]++;
        addJournal('major-discovery', 'Origin source of Shelkopolis corruption identified as external coordination', `shelkopolis-origin-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `As you approach the central evidence, you're intercepted. The conspiracy is aware of your investigation and moves to stop you. You're cornered, threatened, and forced to flee. You've discovered pieces, but the full origin remains hidden — and now you're marked as a threat to whoever's orchestrating this.`;
        G.worldClocks.pressure += 2;
        addJournal('complication', 'Investigation interrupted by conspiracy operators', `shelkopolis-origin-caught-${G.dayCount}`);
      } else if (result.total >= 14) {
        G.lastResult = `The evidence points beyond Shelkopolis. Sealed letters reference "northern interests." The conspiracy is larger than the city itself. You don't know the exact source yet, but you know the corruption is being directed from outside Shelkopolis's borders. The city is under siege by an external force.`;
        addJournal('major-discovery', 'External coordination of Shelkopolis conspiracy confirmed', `shelkopolis-origin-external-${G.dayCount}`);
      } else {
        G.lastResult = `You find pieces of evidence suggesting coordination, but the origin source remains obscured. Whoever's orchestrating this has hidden their hand carefully.`;
        addJournal('investigation', 'External coordination suspected but source not yet identified', `shelkopolis-origin-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  }
];
