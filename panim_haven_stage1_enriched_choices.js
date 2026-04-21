/**
 * PANIM HAVEN STAGE 1 ENRICHED MEANINGFUL CHOICES
 * 20 deeply grounded investigation paths tied to shrine work and mediation service
 * Generated for: Divine balance vs mortal need, ritual correctness vs human compassion, mediation vs grief
 * Each choice: 65-80 XP, grounded in specific NPC perspective, layered wrongness reveal
 */

const PANIM_HAVEN_STAGE1_ENRICHED_CHOICES = [
  // ========== NPC-GROUNDED CHAINS (8 CHOICES) ==========

  // 1. SHRINE HELPER: OFFERING PATTERNS CORRUPTED
  {
    label: "Ask the shrine helper about changes in offerings — are donations unusual lately, and are the accepted/rejected patterns shifting?",
    tags: ['Investigation', 'NPC', 'Ritual', 'Offerings', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading offering corruption patterns');
      G.stageProgress[1]++;

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      const target = 11 + Math.max(0, G.worldClocks.pressure);

      if (result.isCrit) {
        G.lastResult = `The shrine helper (Soria) speaks quietly. "Offerings that used to be rejected are now accepted. Copper coins mixed with iron, cloth that should be white but isn't. The ritual authority says they're sufficient. But I've worked here for years. These offerings break the old rules. And when I ask why the rules changed, they tell me not to ask. They say faith is adapting. But offerings aren't about adaptation — they're about proper form." She looks frightened: "If the offerings are wrong, what does that do to the blessings they're meant to fuel?"`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Shrine helper flagged offering acceptance corruption', `panim_haven-offerings-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The shrine helper becomes guarded. "Questions about offerings are shrine business. You shouldn't be asking these things." She stops speaking entirely. The shrine now views you with suspicion.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Shrine helper now distrustful of inquiry', `panim_haven-shrine-hostile-${G.dayCount}`);
      } else {
        G.lastResult = `The shrine helper admits that offering standards have been relaxed recently. "The ritual authority says we need to be more practical," she says, though her tone suggests discomfort. Something about the change feels forced.`;
        addJournal('investigation', 'Shrine helper noted offering standard relaxation', `panim_haven-offerings-relaxed-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 2. LEDGER KEEPER: MEDIATION RECORDS TAMPERED
  {
    label: "Access the mediation ledgers at the shrine — are records being altered, destroyed, or written with unusual language patterns?",
    tags: ['Investigation', 'NPC', 'Records', 'Mediation', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering ledger manipulation');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The ledger keeper (Brother Thenim) is conflicted but complies. The mediation records show a troubling pattern: entries from six weeks ago have been rewritten. The ink is fresh but the dates claim antiquity. More disturbing, the language of certain mediation outcomes has changed. Where old entries say "balance achieved," new entries use phrases like "appropriate resolution" or "necessary outcome." It's subtle, but it reframes mediation from finding truth to enforcing decisions. Someone has been editing the record of how grief is resolved in Panim Haven.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Ledger keeper revealed backdated ledger tampering', `panim_haven-ledger-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The ledger keeper refuses access entirely. "These records are sacred and protected. You need permission from the ritual authority to view them." He alerts the shrine master. Your attempt to access the ledgers is now official concern.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Shrine master alerted to ledger inquiry attempt', `panim_haven-ledger-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `You gain partial access to the mediation ledgers. Pages have been carefully removed and replaced. The handwriting in recent entries differs subtly from historical records. Someone with access to the sacred archives has been editing the mediation record.`;
        addJournal('investigation', 'Ledger records show evidence of careful alteration', `panim_haven-ledger-altered-${G.dayCount}`);
      } else {
        G.lastResult = `The ledger keeper is protective. "These records require formal authorization from the ritual authority. Without it, I cannot show you." Access is blocked.`;
        addJournal('investigation', 'Ledger records blocked without formal authorization', `panim_haven-ledger-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 3. MEMORIAL COUNSELOR: GRIEF PROCESSING CHANGING
  {
    label: "Consult with the memorial counselor about changes in how families process grief — are rituals being shortened, or are mourners reporting unusual emotional responses?",
    tags: ['Investigation', 'NPC', 'Grief', 'Ritual', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading grief manipulation');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The memorial counselor (Kaelas) speaks with genuine alarm. "Families used to grieve for weeks, sometimes months. Now they're done in days. And they're not healing — they're hollow. Like something vital has been cut from the process. People who should be angry are numb. People who should be sad are accepting things they shouldn't accept. I mentioned it to the ritual authority, and they said grieving too long was becoming 'spiritually inefficient.' But grief isn't efficient. It's necessary. Panim Haven is being taught to mourn incorrectly."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Memorial counselor revealed accelerated grief processing', `panim_haven-grief-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The memorial counselor is offended. "Grief is sacred and private. Your questioning feels intrusive and disrespectful to the bereaved." She refuses further discussion. The shrine community now views you as potentially hostile to their grieving practices.`;
        G.worldClocks.reverence++;
        addJournal('complication', 'Memorial counselor reports your inquiry as culturally insensitive', `panim_haven-grief-hostile-${G.dayCount}`);
      } else {
        G.lastResult = `The memorial counselor admits that grieving practices have changed. "The ritual authority says we need to help families move forward faster," she says, though she seems uncomfortable with the shift. Mourning is being systematically rushed.`;
        addJournal('investigation', 'Memorial counselor confirmed accelerated grieving timeline', `panim_haven-grief-rushed-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 4. PROCESSIONAL COORDINATOR: ROUTE DIVERSIONS
  {
    label: "Question the processional coordinator about recent changes to shrine routes — are the traditional paths being avoided, or are new routes being used?",
    tags: ['Investigation', 'NPC', 'Process', 'Routes', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading ritual route manipulation');
      G.stageProgress[1]++;

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The processional coordinator (Elder Fareth) is open after a moment. "Three weeks ago, the ritual authority changed the primary processional routes. The traditional paths through the memorial waystation and offering halls were diverted. Now we use a path that passes only through the inner shrine and directly to the mediation courts. The old routes took longer, visited more sacred spaces. The new routes are efficient but... spiritually thin. And here's the strange part: when I asked why, I was told not to ask. The coordinator position used to have authority over routes. Now I just execute orders."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Coordinator revealed route diversion and authority stripping', `panim_haven-routes-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The processional coordinator is curt. "Route decisions are made by the ritual authority. You don't need to understand them." She clearly resents the question. She will likely report this inquiry.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Coordinator will report route inquiry to ritual authority', `panim_haven-routes-alert-${G.dayCount}`);
      } else {
        G.lastResult = `The processional coordinator admits that routes have been changed. "For efficiency," she says, though she doesn't seem to believe it. Something about the new routing bothers her, but she's reluctant to say more.`;
        addJournal('investigation', 'Coordinator confirmed route changes implemented quietly', `panim_haven-routes-changed-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 5. CHAPEL KEEPER: BLESSING FAILURE
  {
    label: "Speak with the chapel keeper about whether the shrine blessings are working as expected — are people returning to say they feel unprotected?",
    tags: ['Investigation', 'NPC', 'Divine', 'Protection', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading divine protection corruption');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The chapel keeper (Meryl) speaks in hushed tones. "People are returning to say their blessings aren't holding. A merchant received a blessing for protection and was robbed on the way north. A widow was blessed for guidance through grief and says the blessing made her feel numb instead of safe. When I reported these failures to the ritual authority, I was told the blessings were 'working as intended' and people's expectations were wrong. But I know when a blessing fails. Panim Haven's blessings are becoming corrupted from within."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Chapel keeper revealed systematic blessing failure', `panim_haven-blessing-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The chapel keeper becomes defensive. "The blessings are sacred. Questioning their efficacy is questioning faith itself. I will not tolerate doubt in this sacred space." She stops speaking and watches you with hostility. The chapel is now alert to your investigation.`;
        G.worldClocks.reverence++;
        addJournal('complication', 'Chapel keeper now hostile to blessing inquiry', `panim_haven-blessing-hostile-${G.dayCount}`);
      } else {
        G.lastResult = `The chapel keeper admits some people have mentioned feeling their blessings aren't as protective as before. "Perhaps their faith is waning," she suggests, though her doubt is transparent. The blessing failures are real but being rationalized away.`;
        addJournal('investigation', 'Chapel keeper acknowledged blessing effectiveness concerns', `panim_haven-blessing-concern-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 6. RITUAL AUTHORITY: DOCTRINE CHANGES
  {
    label: "Approach the ritual authority directly about recent changes to blessing formulas, offering standards, or mediation procedures — what's driving these shifts?",
    tags: ['Investigation', 'NPC', 'Authority', 'Doctrine', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'confronting institutional authority');
      G.stageProgress[1]++;

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The ritual authority (Master Thiren) hesitates, then speaks. "Yes, we've made changes. Doctrine must adapt to new spiritual pressures. Panim Haven has received... guidance from external sources. We're being told how to manage faith more efficiently. I don't know who the guidance comes from, but it arrives through sealed documents and shrine messengers. And whoever they are, they know our rituals intimately. They know exactly where to push to make the system work differently. I worry we're not adapting — we're being rewritten."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Ritual authority revealed external guidance manipulation', `panim_haven-authority-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The ritual authority becomes icily formal. "You are not authorized to question shrine doctrine. This inquiry is now official concern. Do not approach the shrine hierarchy again without written permission from the regional shrine council." You are formally warned off.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Ritual authority formally prohibits further shrine inquiry', `panim_haven-authority-warning-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The ritual authority is guarded but admits that doctrine changes come from "spiritual necessity." They won't elaborate on the source, but they acknowledge changes are happening and are deliberate, not accidental.`;
        addJournal('investigation', 'Ritual authority confirmed deliberate doctrine modification', `panim_haven-authority-deliberate-${G.dayCount}`);
      } else {
        G.lastResult = `The ritual authority is dismissive. "Doctrine is the concern of the shrine hierarchy, not outside inquiry. The changes are appropriate." No information gained.`;
        addJournal('investigation', 'Ritual authority blocked further questioning', `panim_haven-authority-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 7. INNKEEPER: GUEST PATTERNS AND SEALED LETTERS
  {
    label: "Question the Panim Haven innkeeper about unusual guests — who's arrived recently, what routes do they take, are they carrying sealed documents?",
    tags: ['Investigation', 'NPC', 'Commerce', 'Intelligence', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'tracing external communication');
      G.stageProgress[1]++;

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The innkeeper (Joseline) leans close. "Northern couriers arrive every seven days. They meet with the ritual authority and leave sealed documents with shrine messengers. Different couriers each time, but same pattern. They never stay long, never drink or eat with regularity. And they all pay in unmarked coin. One courier mentioned they come from 'a place interested in how Panim Haven serves faith.' That was all she'd say before the shrine stepped in and told me not to speak with couriers directly anymore. Someone from outside is orchestrating changes to Panim Haven's spiritual life."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Innkeeper mapped external courier network to shrine', `panim_haven-couriers-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The innkeeper becomes cautious. "I don't gossip about guests or their business. That's not how you run an inn that people trust." She's now skeptical of you. Future inquiries here will be met with resistance.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Innkeeper now distrustful of your questions', `panim_haven-innkeeper-hostile-${G.dayCount}`);
      } else {
        G.lastResult = `The innkeeper mentions northern visitors have been more frequent lately. "Regular business," she notes, though there's something forced about her certainty. The pattern exists but she's being careful about discussing it.`;
        addJournal('investigation', 'Innkeeper acknowledged increased external visitor traffic', `panim_haven-innkeeper-traffic-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 8. MEDIATION OFFICIAL: CASE OUTCOMES RIGGED
  {
    label: "Review mediation cases with an official — are certain families' cases being resolved in their favor consistently, regardless of merit?",
    tags: ['Investigation', 'NPC', 'Justice', 'Corruption', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering mediation bias');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The mediation official (Caller Veth) speaks quietly. "Look at the cases from the past two months. Merchant disputes all favor northern traders. Inheritance conflicts resolve in ways that move property from local families to outside buyers. Family mediation cases that should result in reconciliation end in separation — exactly the outcome that benefits someone with influence. I can't prove it, but the pattern is undeniable. Someone has compromised the mediation system itself. We're not resolving disputes anymore — we're executing someone else's plan."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Official revealed systematic mediation bias pattern', `panim_haven-mediation-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The mediation official becomes guarded. "Mediation decisions are sealed and confidential. You have no right to review cases. This inquiry will be reported to the ritual authority." Your attempt to review cases is formally noted as inappropriate.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Mediation official reported inquiry breach to authority', `panim_haven-mediation-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `You review cases and notice unusual consistency in case outcomes favoring certain parties. The decisions are justified by the mediation logic, but the pattern across cases is striking. Someone may be subtly guiding mediation outcomes.`;
        addJournal('investigation', 'Case review revealed possible systematic outcome bias', `panim_haven-mediation-bias-${G.dayCount}`);
      } else {
        G.lastResult = `The mediation official is protective of case details. "These are confidential matters. You need formal authorization to review them." Access is denied.`;
        addJournal('investigation', 'Mediation case records blocked without authorization', `panim_haven-mediation-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== ARCHETYPE DEEP DIVES (8 CHOICES) ==========

  // 9. LORE TIER 1: RITUAL FORMULA ANALYSIS
  {
    label: "Study the historical blessing formulas used by Panim Haven — have the underlying magical components or invocations been altered?",
    tags: ['Investigation', 'Lore', 'Magic', 'Ritual', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'ritual formula analysis');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The historical blessing formulas are written in an ancient hand, but the recent copies show alterations. Key invocations have been shortened. Protective components have been replaced with different elements that sound similar but carry different spiritual weight. The old formula calls upon "balance of divine and mortal will." The new formula calls upon "appropriate divine resolution." Subtle change, profound effect. Someone has been editing Panim Haven's blessing magic to serve a different purpose.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Lore analysis revealed formula tampering', `panim_haven-lore-formula-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The shrine archives are guarded. As you attempt to examine ancient formulas, a guardian confronts you. "Those texts are restricted. Sacred knowledge is not for casual study." You're removed from the archives.`;
        G.worldClocks.reverence++;
        addJournal('complication', 'Shrine archives now restricting your access', `panim_haven-lore-blocked-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The blessing formulas show signs of revision. Recent copies differ from the oldest texts in ways that seem deliberate but not officially acknowledged. The changes affect spiritual efficacy.`;
        addJournal('investigation', 'Lore research noted formula revision patterns', `panim_haven-lore-revision-${G.dayCount}`);
      } else {
        G.lastResult = `The formulas are complex and difficult to compare across centuries. You sense something is different, but the details elude you.`;
        addJournal('investigation', 'Formula analysis inconclusive', `panim_haven-lore-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 10. LORE TIER 2: DIVINE BALANCE DOCTRINE
  {
    label: "Research the doctrine of divine balance that Panim Haven is built upon — has the philosophy behind the mediation system been twisted?",
    tags: ['Investigation', 'Lore', 'Philosophy', 'Doctrine', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'tracing doctrine corruption');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The doctrine of divine balance originated as a philosophy of mutual respect — every person's need weighing equally in the divine scale. But recent theological writings reframe balance as "appropriate hierarchy." The new interpretation says certain needs matter more than others, and divine wisdom is demonstrated by knowing which needs to prioritize. Someone has rewritten Panim Haven's foundational philosophy from egalitarian to utilitarian. The mediation system hasn't changed — its spiritual purpose has. It now serves efficiency rather than justice.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Lore research revealed philosophical doctrine inversion', `panim_haven-lore-doctrine-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your research into sacred doctrine draws concern from the shrine hierarchy. A messenger warns you: "Questioning the doctrine of divine balance is questioning faith itself. The shrine has noted your inquiry." You've made yourself suspect.`;
        G.worldClocks.reverence++;
        addJournal('complication', 'Shrine hierarchy alerted to doctrine research', `panim_haven-lore-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `You trace how the doctrine of divine balance has shifted from primary texts to recent interpretation. The philosophical foundation seems to have been subtly rewritten to justify different mediation outcomes.`;
        addJournal('investigation', 'Lore research confirmed doctrine interpretation shift', `panim_haven-lore-shift-${G.dayCount}`);
      } else {
        G.lastResult = `The theological texts are complex and their interpretation is subjective. You can't determine whether philosophy has been corrupted or simply evolved.`;
        addJournal('investigation', 'Doctrine interpretation analysis inconclusive', `panim_haven-lore-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 11. CRAFT TIER 1: OFFERING PREPARATION INSPECTION
  {
    label: "Examine how offerings are prepared and processed — are materials being handled differently, or are impurities being introduced to sacred items?",
    tags: ['Investigation', 'Craft', 'Materials', 'Ritual', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'offering preparation analysis');
      G.stageProgress[1]++;

      const result = rollD20('craft', (G.skills.craft || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The offering preparation area shows deliberate material substitution. Sacred incense components have been mixed with lesser-quality alternatives. The white cloth used for grief offerings has been bleached with caustic materials that make the fibers brittle. The copper vessels have been coated with a thin film of base metal. Each substitution is subtle enough to pass casual inspection, but together they corrupt every offering made. Someone is systematically degrading the material foundation of Panim Haven's rituals.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Craft analysis revealed offering material corruption', `panim_haven-craft-offering-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your inspection of the offering preparation space is noticed. The offering custodian confronts you: "Sacred preparation is not for outsider examination. Leave this place." You're expelled from the shrine's preparation areas.`;
        G.worldClocks.reverence++;
        addJournal('complication', 'Offering custodian expelled you from preparation area', `panim_haven-craft-expelled-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The offering preparation shows signs of recent material substitution. Items that should be pure have been replaced or modified in subtle ways that affect their spiritual properties.`;
        addJournal('investigation', 'Craft analysis noted material quality degradation', `panim_haven-craft-quality-${G.dayCount}`);
      } else {
        G.lastResult = `The offering materials appear standard, though you sense something about their preparation is unusual. The details escape precise analysis.`;
        addJournal('investigation', 'Offering material analysis inconclusive', `panim_haven-craft-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 12. CRAFT TIER 2: MEDIATION LEDGER DOCUMENT ANALYSIS
  {
    label: "Examine the physical ledger documents themselves — are they being created with different inks, papers, or binding techniques that suggest recent forgery?",
    tags: ['Investigation', 'Craft', 'Forgery', 'Evidence', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'exposing document forgery');
      G.stageProgress[1]++;

      const result = rollD20('craft', (G.skills.craft || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The ledger documents reveal professional forgery. Recent entries use aged ink that has been chemically treated to look historical. The paper is from a different source than the original volumes — subtly different fiber composition. The binding threads are newer than they should be for pages claimed to be decades old. Someone has replaced entire sections of the mediation records with carefully forged copies that maintain the appearance of antiquity while concealing recent tampering. This is sophisticated work — someone skilled in document restoration and manipulation.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Craft analysis revealed professional document forgery', `panim_haven-craft-forgery-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your close examination of the sacred ledgers is seen as violation. The ledger keeper calls the ritual authority immediately. "This person is tampering with sacred records." You're accused of desecration.`;
        G.worldClocks.reverence++;
        addJournal('complication', 'You are accused of sacred record tampering', `panim_haven-craft-accused-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The documents show signs of sophisticated document work. Pages have been skillfully removed and replaced. Someone with high-level crafting knowledge has edited the ledgers.`;
        addJournal('investigation', 'Craft analysis confirmed expert document manipulation', `panim_haven-craft-manipulation-${G.dayCount}`);
      } else {
        G.lastResult = `The ledger construction is complex and hard to evaluate without extensive reference materials. You suspect forgery but can't prove it definitively.`;
        addJournal('investigation', 'Document authenticity analysis inconclusive', `panim_haven-craft-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 13. SURVIVAL TIER 1: ROUTE NETWORK ANALYSIS
  {
    label: "Trace the physical routes used by shrine messengers — where do they actually go, and what patterns emerge in their movements?",
    tags: ['Investigation', 'Survival', 'Routes', 'Movement', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'messenger route analysis');
      G.stageProgress[1]++;

      const result = rollD20('survival', (G.skills.survival || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Following shrine messenger patterns reveals a network. Documents leave Panim Haven northward, but not on the main road. Messengers use secondary routes through memorial waystations and offering halls — places where their movement attracts less attention. The sealed documents head north toward a specific destination that isn't listed on any official map. From interviews with route workers, a pattern emerges: three different locations that are regularly visited but never officially mentioned. Someone has created a hidden communication network using Panim Haven's own sacred routes.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Survival analysis mapped hidden messenger network', `panim_haven-survival-routes-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your tracking of shrine messengers is noticed. A route worker warns you: "The shrine doesn't take kindly to people following their movements." Your surveillance attempt is reported.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Messenger surveillance reported to shrine hierarchy', `panim_haven-survival-caught-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The messenger routes show patterns that don't align with official shrine business. Messengers regularly use obscure paths and avoid main roads. Something is being transported discretely.`;
        addJournal('investigation', 'Survival analysis noted unusual messenger route patterns', `panim_haven-survival-pattern-${G.dayCount}`);
      } else {
        G.lastResult = `Shrine messenger routes are difficult to track. They move carefully and their patterns aren't obvious from casual observation.`;
        addJournal('investigation', 'Messenger route surveillance inconclusive', `panim_haven-survival-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 14. SURVIVAL TIER 2: WAYSTATION INSPECTION
  {
    label: "Visit the memorial waystations along the processional paths — are supplies being stored there that don't match their stated purpose?",
    tags: ['Investigation', 'Survival', 'Supplies', 'Evidence', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering waystation stockpiles');
      G.stageProgress[1]++;

      const result = rollD20('survival', (G.skills.survival || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The waystations contain supplies that have nothing to do with processional rest. Hidden in sealed rooms are stacks of sealed documents, writing materials, multiple sets of clothing in different styles, and what appears to be payment in multiple currencies. Someone is using Panim Haven's sacred waystations as a logistics hub for something external. The scale and sophistication suggest this has been running for months. A dedicated alternate infrastructure is built into Panim Haven's spiritual framework.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Survival analysis revealed waystation stockpile network', `panim_haven-survival-stockpile-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your inspection of the waystations is reported to the shrine. When you attempt to leave, you're confronted by shrine guards: "You've violated sacred spaces. This is now a serious matter."`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Shrine guards intercept you for waystation inspection', `panim_haven-survival-caught-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The waystations contain supplies beyond what restful processionals would need. Hidden storage areas suggest the waystations are being used for purposes other than their stated function.`;
        addJournal('investigation', 'Survival analysis found unauthorized waystation storage', `panim_haven-survival-storage-${G.dayCount}`);
      } else {
        G.lastResult = `The waystations appear to contain normal supplies for processional rest. Any secondary purpose is well-concealed.`;
        addJournal('investigation', 'Waystation inspection found no anomalies', `panim_haven-survival-clear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== GOSSIP & TENSION LAYERS (4 CHOICES) ==========

  // 15. STREET RUMOR: FAMILIES BEING DIVIDED
  {
    label: "Gather street rumors at the offering halls — what are people whisper about mediation outcomes? What family stories are spreading?",
    tags: ['Investigation', 'Rumor', 'Social', 'Gossip', 'Meaningful'],
    xpReward: 65,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'parsing community grievance narratives');
      G.stageProgress[1]++;

      const rumor = [
        'the shrine is separating families that should stay together',
        'mediation is being rigged to benefit outsiders',
        'the blessed offerings aren\'t protecting anymore',
        'shrine workers are frightened by what they\'re being asked to do',
        'someone from outside is controlling what happens here'
      ];
      const selected = rumor[Math.floor(Math.random() * rumor.length)];

      G.lastResult = `The offering hall whisper is: "${selected}." Different people speak it with different levels of certainty, but the pattern is clear. Panim Haven is noticing that something fundamental about how the shrine operates has changed. People don't have proof, but they feel the wrongness.`;
      addJournal('investigation', `Street rumor gathered: "${selected}"`, `panim_haven-rumor-${G.dayCount}`);

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 16. INSTITUTIONAL CRACK: SHRINE WORKER DEFECTION
  {
    label: "Locate a shrine worker who is beginning to doubt the institution — someone willing to speak about what they've witnessed that doesn't align with official narrative.",
    tags: ['Investigation', 'Evidence', 'Witness', 'Defection', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'turning institutional witness');
      G.stageProgress[1]++;

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Brother Thenim pulls you aside late at night. "I can't serve this anymore. The rituals I'm performing aren't what I was trained to perform. The blessings are wrong. The mediation outcomes are predetermined. And people from outside are directing everything. I've documented it. Changes to formulas, falsified ledger entries, external correspondence directing shrine decisions. I can't prove who's behind it, but I can prove the shrine is being subverted. I'm leaving. I'm taking what I've documented. I'll give it to someone who will act on it — but it has to be someone the shrine can't reach."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Shrine worker defected with institutional documentation', `panim_haven-defection-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your attempt to convince a shrine worker to turn against the institution is noticed. They report your approach to the ritual authority. "This person is trying to corrupt shrine workers. They're an active threat to institutional integrity."`;
        G.worldClocks.pressure++;
        addJournal('complication', 'You are reported as threat to shrine integrity', `panim_haven-defection-caught-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `A shrine worker admits to private doubts about the changes happening. They hint at documentation but won't commit to defection. Fear is holding them in place, but they're close to breaking.`;
        addJournal('investigation', 'Shrine worker shows defection potential but hesitates', `panim_haven-defection-close-${G.dayCount}`);
      } else {
        G.lastResult = `Shrine workers are defensive about questioning institutional loyalty. No one will admit to doubt, even in private.`;
        addJournal('investigation', 'Shrine workers remain publicly loyal to institution', `panim_haven-defection-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 17. MEDIATION FAILURE: WRONGED FAMILY SPEAKS
  {
    label: "Find a family whose mediation case was decided unfairly — someone angry enough to detail exactly how the system failed them.",
    tags: ['Investigation', 'Evidence', 'Victim', 'Personal', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'gathering victim testimony');
      G.stageProgress[1]++;

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `An elderly widow speaks with careful anger. "My husband's will was contested by his brother — a trader from the north. By every measure of justice, my claim was stronger. But the mediation official decided in favor of my brother-in-law. Then I watched my home be sold to a northern merchant consortium for far less than it's worth. The mediation was predetermined. The official was following a script written by someone else. I filed complaints with the shrine. They were dismissed. This isn't accident. This is orchestration. My family's future was sacrificed to serve someone else's plan."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Victim testimony detailed predetermied mediation manipulation', `panim_haven-victim-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your attempt to gather evidence from a mediation victim is misinterpreted. They think you're an agent of those who wronged them. They become hostile and spread word that you're working to suppress their claims.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Victim now views you as complicit in mediation corruption', `panim_haven-victim-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `You find a family willing to detail their unfair mediation outcome. Their testimony is compelling but circumstantial. They suspect corruption but can't prove the mediation was rigged.`;
        addJournal('investigation', 'Victim testimony gathered but proof remains circumstantial', `panim_haven-victim-testimony-${G.dayCount}`);
      } else {
        G.lastResult = `Families with failed mediations are reluctant to discuss their cases. The shrine's authority makes them cautious about publicly disputing outcomes.`;
        addJournal('investigation', 'Victims remain silent about mediation failures', `panim_haven-victim-silent-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 18. LAYERED REVELATION: MEDIATION AS INSTRUMENT
  {
    label: "Piece together all evidence about mediation corruption — prove that the system isn't broken, but has been weaponized to serve an external agenda.",
    tags: ['Investigation', 'Proof', 'Systematic', 'Conspiracy', 'Meaningful'],
    xpReward: 80,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(80, 'exposing mediation conspiracy');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `You compile the evidence: forged ledger entries, doctrine philosophical shift, victim testimonies, defected worker documentation, external courier patterns, waystation stockpiles. Together, they form an undeniable pattern. Panim Haven's mediation system has been systematically corrupted to transfer property and authority from local families to external stakeholders. The shrine's blessings have been deliberately weakened to create dependency. The processional routes have been rerouted to enable concealment. Someone with deep knowledge of Panim Haven's systems is using them as instruments for controlled resource extraction and institutional replacement. The wrongness isn't accidental degradation — it's orchestrated transformation.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Conspiracy evidence compiled and systematized', `panim_haven-conspiracy-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your attempt to compile evidence draws the wrong attention. Someone realizes you're connecting the separate pieces and making the pattern visible. You're quietly warned off further investigation through channels that make your danger clear. "Stop asking questions, or you'll understand what Panim Haven's mediation system can do."`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Conspiracy orchestrators directly warn you off', `panim_haven-conspiracy-warning-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `You compile enough evidence to suggest systematic corruption. The pieces align to show mediation has been weaponized. It's not conclusive, but it's compelling.`;
        addJournal('investigation', 'Substantial corruption evidence compiled', `panim_haven-conspiracy-substantial-${G.dayCount}`);
      } else {
        G.lastResult = `Individual evidence pieces exist, but assembling them into a coherent conspiracy narrative requires evidence you don't yet have. The pattern is visible but incomplete.`;
        addJournal('investigation', 'Evidence pattern visible but incomplete', `panim_haven-conspiracy-partial-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== EXPANSION CHOICES ==========

  // 19. CLUE: BUREAU CASE FRAGMENTS
  {
    label: "Access the Bureau of Reckoning's public case register — look for cases that were opened and closed without recorded resolution.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 73,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(73, 'reading Bureau case register');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 13) {
        G.lastResult = `Forty-three cases in the past year were opened, assigned to senior mediators, and closed within seventy-two hours with the status "resolved per supplementary doctrine." No transcripts. No outcome records. No parties listed. The "supplementary doctrine" citation references a doctrine revision that itself cites a doctrine revision — a circular loop that leads nowhere. These cases didn't resolve. They disappeared.`;
        if (!G.flags) G.flags = {};
        G.flags.found_bureau_ghost_cases = true;
        addJournal('investigation', 'Bureau register: 43 cases closed via circular doctrine citation — no records, no parties', `panim-bureau-${G.dayCount}`);
      } else {
        G.lastResult = `The register shows cases with unusual resolution codes. Without doctrine reference access you can't interpret the codes, but the pattern of fast closures is visible.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 20. CLUE: COASTAL ROUTE PASSAGE RECORDS
  {
    label: "Check the coastal passage logs at the harbor authority — trace what vessels have been flagged for Bureau involvement.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'tracing coastal passage records');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      G.lastResult = `Three vessels in the past six months departed Panim Haven under Bureau escort classification — a category normally reserved for transporting material evidence under active mediation. But the cases those vessels were assigned to are among the forty-three ghost cases: no records, no resolution. The vessels left carrying something under official Bureau protection. Whatever they were transporting is now outside Panim Haven's jurisdiction and evidence chain.`;
      if (!G.flags) G.flags = {};
      G.flags.found_coastal_passage_records = true;
      addJournal('investigation', 'Harbor logs: three Bureau-escorted vessels departed during ghost case windows — cargo unknown, jurisdiction transferred', `panim-harbor-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 21. ARCHETYPE-GATED: READING THE RECKONING QUARTER
  {
    label: "Walk the Reckoning Quarter at midday and observe how the Bureau's presence shapes the space.",
    tags: ['Investigation', 'Archetype', 'Stage1', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'reading Reckoning Quarter');
      const arch = G.archetype && G.archetype.group;

      if (arch === 'combat') {
        G.lastResult = `The Bureau guards carry themselves like occupation forces. Not hostile — careful. They position for coverage, not assistance. Whatever function they were designed to perform, they've been retrained for a different one. Their eyes track complainants entering the Bureau the same way you'd track a potentially hostile approach.`;
      } else if (arch === 'magic') {
        G.lastResult = `The Reckoning Quarter's acoustic design channels sound toward the Bureau building's upper windows — it was built for public transparency, so proceedings could be heard. Today, the Bureau operates in silence. The windows are shuttered. The architectural commitment to openness has been closed off from within.`;
      } else if (arch === 'stealth') {
        G.lastResult = `Two men follow the same irregular route through the quarter, twelve minutes apart, never intersecting. A patrol pattern, but unofficial. They're not Bureau guards — they wear no marks. Civilian watchers maintaining surveillance coverage outside the official perimeter.`;
      } else {
        G.lastResult = `The people waiting outside the Bureau have been there for hours. No one is called in. No one leaves. The queue doesn't move. It's not a processing delay — it's a deterrence mechanism. The waiting itself is the response. People here have learned that formal requests receive silence, and eventually they stop making them.`;
      }
      addJournal('investigation', 'Reckoning Quarter: Bureau functioning as deterrent rather than service, unofficial surveillance active', `panim-quarter-read-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 22. FACTION SEED: OVERSIGHT COLLEGIUM OBSERVER
  {
    label: "Speak to the Oversight Collegium's observer posted at the Panim Haven civic hall.",
    tags: ['Faction', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'making Oversight Collegium contact');
      if (!G.factionHostility) G.factionHostility = { warden_order: 0, iron_compact: 0, oversight_collegium: 0 };

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `Observer Tren Callow has been stationed at Panim Haven for four months. "The Collegium received a formal complaint about Bureau case handling fourteen weeks ago," he tells you. "The complaint was received, logged, acknowledged, and assigned to a review panel. That review panel has not yet convened." His tone communicates what his words don't: the delay is engineered. He asks if you have access to the case register data. When you describe what you found, he makes a note and says the information will "support the existing complaint file."`;
        if (!G.flags) G.flags = {};
        G.flags.met_oversight_collegium_panim = true;
        G.factionHostility.oversight_collegium += 1;
        addJournal('faction', 'Oversight Collegium observer Tren Callow: Bureau complaint review deliberately delayed, collecting supporting evidence', `panim-collegium-${G.dayCount}`);
      } else {
        G.lastResult = `Observer Callow is formally correct. He can receive written complaints and provide receipt confirmation. He cannot discuss ongoing review processes or their status. The Collegium process is real but not moving.`;
        if (!G.flags) G.flags = {};
        G.flags.located_oversight_collegium_panim = true;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 23. ATMOSPHERE: TAZREN'S SHADOW
  {
    label: "Ask the oldest Bureau worker about Tazren — the name that keeps appearing in the pre-reform case archive.",
    tags: ['WorldColor', 'Lore', 'Stage1', 'Meaningful'],
    xpReward: 52,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(52, 'asking about Tazren');

      G.lastResult = `The clerk pauses. "Tazren ran the Bureau for twenty-two years. He retired when the doctrine revision came in. Didn't fight it — just left." She goes quiet for a moment. "He used to say: Panim Haven doesn't need justice. It needs to be believed that justice is possible." She returns to her filing. The name doesn't appear in current Bureau materials. Someone made sure of that.`;
      addJournal('discovery', 'Tazren: former Bureau head, left at doctrine revision, name removed from current materials', `panim-tazren-${G.dayCount}`);
      G.recentOutcomeType = 'explore'; maybeStageAdvance();
    }
  },

  // 24. PERSONAL ARC: FIND TAZREN
  {
    label: "Track down Tazren — the retired Bureau head whose name has been erased from current institutional records.",
    tags: ['PersonalArc', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'finding Tazren');
      if (!G.flags) G.flags = {};

      const result = rollD20('survival', (G.skills.survival || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `Tazren lives in the Reckoning Quarter's outer ring, two streets from the Bureau he spent his career in. He received you without asking who you were, which means he was expecting someone eventually. "The doctrine revision wasn't a reform," he says. "It was a handover. I don't know to whom. I left because I couldn't operate in a system I no longer recognized." He has twenty-two years of case memory in his head and a copy of the pre-reform doctrine text he kept out of principle. He'll help — but carefully, and on his own terms.`;
        G.flags.met_tazren = true;
        addJournal('contact', 'Tazren found: former Bureau head, has pre-reform doctrine, willing to assist conditionally', `panim-tazren-found-${G.dayCount}`);
      } else {
        G.lastResult = `Tazren's neighbors say he doesn't receive visitors. He's still in the quarter but he's not accessible to strangers. You need an introduction — someone who knew him from the Bureau era.`;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // 25. SOCIAL: THE CASE THAT WAS CLOSED YESTERDAY
  {
    label: "Find the party whose case was closed yesterday under the ghost closure code — speak to them before they leave Panim Haven.",
    tags: ['Social', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 67,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(67, 'interviewing recent ghost case complainant');

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 10) {
        G.lastResult = `Sera brought a land dispute to the Bureau six weeks ago. Yesterday she was told it was "resolved per supplementary doctrine" and given a sealed letter with a small payment. "They told me the doctrine resolution supersedes the dispute. I asked what that means. They said it means the case is closed." She hasn't opened the letter yet. She's afraid to. She lets you read it: it's a standard release of claim form signed in her name. She didn't sign it. Her name is forged.`;
        if (!G.flags) G.flags = {};
        G.flags.met_sera_complainant = true;
        addJournal('contact', 'Complainant Sera: Bureau forged her signature on a release of claim form, case closed without her consent', `panim-sera-${G.dayCount}`);
      } else {
        G.lastResult = `By the time you find the address, the complainant has already left Panim Haven. The Bureau's response was quick enough to get them moving before anyone could speak to them.`;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // 26. SHADOW RIVAL INTRO
  {
    label: "Tazren mentions a visitor came to see him last month — someone who claimed to be researching Bureau reform history.",
    tags: ['Rival', 'Warning', 'Stage1', 'Meaningful'],
    xpReward: 57,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(57, 'receiving rival warning');
      if (!G.flags) G.flags = {};

      const arch = G.archetype && G.archetype.group;
      if (arch === 'combat') {
        G.lastResult = `"They asked which senior mediators had left voluntarily versus been pushed out," Tazren says. "Specifically about who left with retirement packages versus who walked away empty-handed. They were building a list of people who might have grievances. A recruitment map for potential operatives."`;
      } else if (arch === 'magic') {
        G.lastResult = `"They asked about the pre-reform doctrine text specifically," Tazren says. "How many copies exist. Whether any copies were in circulation outside institutional archives. They weren't studying reform — they were performing a document inventory. They want to know how many copies of the evidence exist."`;
      } else if (arch === 'stealth') {
        G.lastResult = `"They were very good at listening," Tazren says. "Asked almost nothing. Let me talk. At the end I realized I'd told them everything I know without being asked a direct question. Very practiced. They're not an amateur — that's a developed technique." A trained information harvester. They extracted Tazren's knowledge without leaving a trace of what they were actually after.`;
      } else {
        G.lastResult = `"They offered to help," Tazren says. "Restoration of my name in Bureau records. Formal recognition. It would have meant everything to me two years ago." He pauses. "I told them no. It felt like something they'd use to own me afterward." Someone tried to buy Tazren's cooperation using the thing that would have been easiest to accept.`;
      }

      G.lastResult += ` This person preceded you and extracted what you came for.`;
      if (!G.rivalId) {
        if (arch === 'combat') G.rivalId = 'warden_captain';
        else if (arch === 'magic') G.rivalId = 'archivist_veld';
        else if (arch === 'stealth') G.rivalId = 'shadow_broker';
        else G.rivalId = 'provost_lenn';
      }
      addJournal('warning', 'Rival-adjacent operative interviewed Tazren before you — expert social engineering, preceded your investigation', `panim-rival-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  }
];
window.PANIM_HAVEN_STAGE1_ENRICHED_CHOICES = PANIM_HAVEN_STAGE1_ENRICHED_CHOICES;
