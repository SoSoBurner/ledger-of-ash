/**
 * SHELKOPOLIS STAGE 2 ENRICHED CHOICES
 * Investigation arc: sealed letter network, glyph anomalies, noble faction pressure
 * NPCs: Lady Isabella Shelk, Lady Elowen Shelk, Captain Thalion Windrider,
 *       High Priestess Lyara Dawnlight, Innkeeper Aelra Velvetmere
 */

const SHELKOPOLIS_STAGE2_ENRICHED_CHOICES = [

  // ── INVESTIGATION ARC ──────────────────────────────────────────────────

  {
    label: "Follow the sealed letter trail to the Silkweaver's Chapel intermediary — press for the name behind the northern route coordination.",
    tags: ['Investigation', 'Stage2', 'Meaningful'],
    xpReward: 80,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(80, 'investigating sealed letter network');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      const arch = G.archetype && G.archetype.group;
      if (result.isCrit) {
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = arch === 'magic'
          ? `The intermediary breaks under your doctrinal questioning. The letters originate from a named factional office in the northern districts — one that should not exist under current Shelk charter.`
          : arch === 'stealth'
          ? `You positioned near the chapel a full cycle before the pickup. The intermediary makes contact with a Roadwarden aide at shift change. You have a name and a badge number.`
          : `The intermediary cracks when you produce the letter pattern evidence. A northern broker name surfaces — someone moving sealed contracts through chapel cover before the documents reach the guildhall.`;
        addJournal('investigation', 'Chapel intermediary source identified', `shelk-chapel-source-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The intermediary has been replaced. The new one recognizes your questions as a pattern and files a notice at the shrine desk. Watchfulness in this district increases.`;
        addJournal('complication', 'Investigation noticed at chapel', `shelk-chapel-burn-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.lastResult = `Partial yield: the intermediary confirms a northern connection but will not give a name. They are afraid of something specific and recent. The fear is more useful than the evasion.`;
        addJournal('investigation', 'Chapel contact confirms northern link', `shelk-chapel-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Cross-reference the glyph surge incidents in the south market against the date pattern of the sealed letter arrivals.",
    tags: ['Investigation', 'Stage2', 'Lore', 'Meaningful'],
    xpReward: 75,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(75, 'correlating glyph and letter patterns');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.isCrit) {
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `The correlation is exact. Every major glyph surge in the south market occurred within 36 hours of a sealed letter arriving at the chapel. Either the letters are coordinating something that causes the surges, or they are responses to them. Either way, you now have a physical timeline to work from.`;
        addJournal('investigation', 'Glyph-letter pattern correlation confirmed', `shelk-glyph-corr-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The archive clerk who holds the surge incident records has been reassigned. No explanation on file. The records are sealed pending a Roadwarden review that has no scheduled completion date.`;
        addJournal('complication', 'Glyph records sealed during investigation', `shelk-glyph-sealed-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.lastResult = `Three correlations, not all. Three surges line up with letter dates. The other two do not. Either the pattern is partial or there are two different operations using the same cover.`;
        addJournal('investigation', 'Partial glyph-letter correlation', `shelk-glyph-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Investigate the noble rivalry between House Shelk factions — find who benefits from the trade disruption the letter network enables.",
    tags: ['Investigation', 'Stage2', 'Faction', 'Meaningful'],
    xpReward: 78,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(78, 'mapping noble faction benefit');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      const arch = G.archetype && G.archetype.group;
      if (result.isCrit) {
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = arch === 'support'
          ? `Guild Chairwoman Elowen's records show a pattern you recognize: the disruptions route trade away from established guild contracts and toward a parallel market. The Chairwoman either knows this and is allowing it, or she has a liability she hasn't disclosed.`
          : `The disruption creates shortage in exactly the product lines controlled by the faction opposing Lady Isabella's direct holdings. The rivalry is real but this is not a rivalry move — the scale is wrong. Someone is using the rivalry as cover for something larger.`;
        addJournal('investigation', 'Noble rivalry instrumentalized — deeper layer found', `shelk-noble-layer-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Your questions reach the wrong ears. A House Shelk representative formally registers your name at the civic records counter as a person of interest in a trade inquiry.`;
        addJournal('complication', 'Registered as trade inquiry person of interest', `shelk-noble-register-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.lastResult = `You identify the beneficiaries but cannot prove intent. The disruption favors three specific families whose names appear in the chapel records. That is enough to know direction.`;
        addJournal('investigation', 'Noble beneficiary pattern identified', `shelk-noble-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Approach the evidence you have gathered so far — share it with a trusted contact or suppress it until the picture is clearer.",
    tags: ['Investigation', 'Consequence', 'Stage2', 'Meaningful'],
    xpReward: 85,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(85, 'handling gathered evidence');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      // Only meaningful when investigation has some progress
      const progress = G.investigationProgress;
      if (progress < 3) {
        G.lastResult = `You review what you have. It is not enough to act on or share safely. More work needed before the picture resolves.`;
        G.recentOutcomeType = 'investigate'; maybeStageAdvance(); return;
      }
      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.isCrit) {
        G.stage2_evidence_shared = true;
        if (!G.flags) G.flags = {};
        G.flags.stage2_evidence_shared_crit = true;
        G.worldClocks.omens = (G.worldClocks.omens||0) + 1;
        G.lastResult = `You share the evidence with a trusted contact who responds with information you did not have. The picture expands significantly. They ask you to continue — carefully. This is now a shared investigation.`;
        addJournal('investigation', 'Evidence shared — investigation expanded', `shelk-evidence-shared-${G.dayCount}`);
      } else {
        G.stage2_evidence_shared = false;
        G.lastResult = `You suppress the evidence and keep working. The advantage is yours alone for now. The risk is also yours alone.`;
        addJournal('investigation', 'Evidence withheld — solo investigation continues', `shelk-evidence-held-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // ── NPC CHOICES ───────────────────────────────────────────────────────────

  {
    label: "Request an audience with Lady Isabella Shelk at the House Shelk Estate — present yourself as a legitimate investigator.",
    tags: ['NPC', 'Persuasion', 'Stage2', 'Meaningful'],
    xpReward: 80,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(80, 'approaching House Shelk matriarch');
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 2));
      const arch = G.archetype && G.archetype.group;
      if (result.isCrit) {
        G.flags.met_lady_isabella = true;
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = arch === 'support'
          ? `Lady Isabella grants the audience and speaks with precision. She confirms the trade disruption is real, names two families she suspects of exploiting it, and asks for nothing in return. Her calm is the kind that comes from already knowing more than she shows.`
          : `Lady Isabella receives you briefly. She does not deny the letter network. She says only: "The disruption serves someone who does not operate from within this city." Then the audience ends.`;
        addJournal('investigation', 'Lady Isabella Shelk contact made', `shelk-isabella-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `The estate staff turns you away at the gate and registers your name at the household clerk. Lady Isabella does not receive uninvited investigators. The interaction costs you significantly in visibility.`;
        addJournal('complication', 'Estate entry refused — flagged', `shelk-isabella-fail-${G.dayCount}`);
      } else {
        G.flags.met_lady_isabella = true;
        G.lastResult = `The audience is brief and formal. Lady Isabella says she is aware of irregularities but cannot speak to specifics. She gestures toward the guild office without using words. The signal is clear enough.`;
        addJournal('investigation', 'Lady Isabella points toward guild — indirect', `shelk-isabella-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Approach Captain Thalion Windrider at Roadwarden Central Command with what you know about the northern route coordination.",
    tags: ['NPC', 'Combat', 'Authority', 'Stage2', 'Meaningful'],
    xpReward: 82,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(82, 'briefing Roadwarden command');
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      const arch = G.archetype && G.archetype.group;
      if (result.isCrit) {
        G.flags.met_captain_windrider = true;
        G.flags.stage2_faction_contact_made = true;
        if (!G.rivalId && arch === 'combat') G.rivalId = 'warden_captain';
        G.lastResult = arch === 'combat'
          ? `Windrider listens to everything. He names your evidence as actionable and invites you into a parallel inquiry — with conditions. The conditions include reporting everything you find. This is an alliance with teeth.`
          : `Windrider receives the briefing with professional composure. He confirms the Roadwardens have noticed the pattern and asks you to continue reporting. He offers no resources and all the risk remains yours. But the contact is established.`;
        addJournal('faction', 'Roadwarden command contact established', `shelk-windrider-${G.dayCount}`);
      } else if (result.isFumble) {
        if (arch === 'combat') G.rivalId = 'warden_captain';
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `Windrider hears you out and then asks why you have this information. Your answer is not satisfying. He notes the conversation in the Roadwarden log. You leave with a new entry in the enforcement record and no alliance.`;
        addJournal('complication', 'Windrider briefing backfired — logged', `shelk-windrider-fail-${G.dayCount}`);
      } else {
        G.flags.met_captain_windrider = true;
        G.lastResult = `Windrider confirms he has seen similar patterns but is working through official channels. He asks you to report any new developments but makes no commitment in return. Standard protocol from someone who is still assessing you.`;
        addJournal('investigation', 'Windrider aware — cautious contact made', `shelk-windrider-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Visit High Priestess Lyara Dawnlight at Aurora Light Cathedral — ask about the ritual significance of the chapel letter routes.",
    tags: ['NPC', 'Lore', 'Religion', 'Stage2', 'Meaningful'],
    xpReward: 78,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(78, 'consulting High Priestess on ritual routes');
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      const arch = G.archetype && G.archetype.group;
      if (result.isCrit) {
        G.flags.met_high_priestess = true;
        if (!G.rivalId && arch === 'magic') G.rivalId = 'archivist_veld';
        G.lastResult = arch === 'magic'
          ? `Lyara Dawnlight recognizes the letter ritual pattern immediately. She names it as a misappropriation of a Compassion-shrine communication protocol — one designed for emergency moral intercession that has been repurposed for secular coordination. She is furious and will help you.`
          : `The High Priestess confirms the chapel is being used outside its sanctioned function and that she has logged three formal objections that received no response from civic administration. She names the last objection recipient: a deputy in the noble quarter records office.`;
        addJournal('investigation', 'High Priestess confirms ritual misuse — source named', `shelk-priestess-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.reverence = (G.worldClocks.reverence||0) - 1;
        G.lastResult = `Your questions about the chapel protocol come across as an accusation of cathedral negligence. Lyara Dawnlight formally declines to discuss operational matters and suggests you speak with civic administration. The cathedral relationship is now strained.`;
        addJournal('complication', 'Cathedral relationship strained', `shelk-priestess-fail-${G.dayCount}`);
      } else {
        G.flags.met_high_priestess = true;
        G.lastResult = `Lyara Dawnlight confirms she is aware of unusual chapel usage. She speaks carefully and offers one fact: the pattern began three weeks before the first recorded glyph surge in the south market.`;
        addJournal('investigation', 'Priestess confirms timing link — cautious', `shelk-priestess-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // ── WORLD PRESSURE ARC ─────────────────────────────────────────────────

  {
    label: "A Warden Order representative approaches you at the Noble District Inn — they want to discuss your investigation activities.",
    tags: ['Faction', 'Antagonist', 'Stage2', 'Meaningful'],
    xpReward: 85,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(85, 'first Warden Order contact');
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      if (!G.factionHostility) G.factionHostility = {};
      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      const arch = G.archetype && G.archetype.group;
      // Set rival on first encounter
      if (!G.rivalId) G.rivalId = 'warden_captain';
      if (result.isCrit) {
        G.worldClocks.rival = (G.worldClocks.rival||0) + 1;
        G.flags.stage2_faction_contact_made = true;
        G.lastResult = arch === 'stealth'
          ? `You read the contact as a probe rather than a meeting. You give them partial truth and watch what they do with it. They pass it to a superior without editing. The chain of command is visible now.`
          : `You handle the contact with enough transparency to establish credibility and enough reserve to maintain operational security. The Warden Order representative leaves with respect. The rival clock ticks regardless.`;
        addJournal('faction', 'Warden Order contact — productive first meeting', `shelk-warden-contact-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.rival = (G.worldClocks.rival||0) + 2;
        G.factionHostility.warden_order = (G.factionHostility.warden_order||0) + 2;
        G.lastResult = `The meeting deteriorates. You say something they interpret as concealment. The representative leaves with a formal note to submit. The Warden Order is now actively treating you as a risk rather than a resource.`;
        addJournal('complication', 'Warden Order now treating player as risk', `shelk-warden-hostile-${G.dayCount}`);
      } else {
        G.worldClocks.rival = (G.worldClocks.rival||0) + 1;
        G.lastResult = `Neutral outcome: the meeting concludes without commitment on either side. You've been assessed. The assessment result is unknown to you.`;
        addJournal('faction', 'Warden Order assessment — neutral', `shelk-warden-neutral-${G.dayCount}`);
      }
      G.recentOutcomeType = 'faction'; maybeStageAdvance();
    }
  },

  {
    label: "A rival named Warden captain has been asking the same questions you have — at the same locations, one day behind. Intercept or avoid them.",
    tags: ['Rival', 'Stage2', 'Combat', 'Meaningful'],
    xpReward: 88,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(88, 'managing named rival encounter');
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      if ((G.worldClocks.rival||0) < 2 && !G.flags.stage2_rival_forced) {
        G.lastResult = `The rival's presence is confirmed by multiple sources but you haven't crossed paths directly yet. The pattern is clear enough to act on, but the moment hasn't arrived.`;
        G.recentOutcomeType = 'investigate'; maybeStageAdvance(); return;
      }
      const result = rollD20('combat', (G.skills.combat || 0) + Math.floor(G.level / 3));
      const arch = G.archetype && G.archetype.group;
      if (result.isCrit) {
        G.stage2_rival_status = 'negotiated';
        G.worldClocks.rival = (G.worldClocks.rival||0) - 1;
        G.lastResult = arch === 'combat'
          ? `You meet the Warden captain directly and hold the position. They assess you as a threat worth respecting. A negotiation follows — terse and professional. You agree to share specific information in exchange for access to Roadwarden records. The rival becomes a constrained ally.`
          : `The confrontation ends in an unexpected conversation. The rival has their own doubts about what they've been assigned to find. You establish enough mutual interest to create a working arrangement. Neither fully trusts the other.`;
        addJournal('investigation', 'Rival contact negotiated — temporary alliance', `shelk-rival-negotiated-${G.dayCount}`);
      } else if (result.isFumble) {
        G.stage2_rival_status = 'hostile';
        G.worldClocks.rival = (G.worldClocks.rival||0) + 2;
        G.lastResult = `The encounter turns hostile. The Warden captain marks you as an operative of unknown allegiance and files a full report. Stage 3 will open with this captain as an active obstacle.`;
        addJournal('complication', 'Rival now actively hostile — Stage 3 impact', `shelk-rival-hostile-${G.dayCount}`);
      } else {
        G.worldClocks.rival = (G.worldClocks.rival||0) + 1;
        G.lastResult = `The encounter is brief and inconclusive. You both leave knowing the other is active. The race continues.`;
        addJournal('investigation', 'Rival encountered — neutral outcome', `shelk-rival-neutral-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // ── PERSONAL ARC ──────────────────────────────────────────────────────────

  {
    label: "The Roadwarden order sends a formal invitation to consider joining their ranks — with access to the investigation records you need.",
    tags: ['Personal', 'Combat', 'Stage2', 'Meaningful'],
    xpReward: 88,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(88, 'Warden recruitment offer');
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const arch = G.archetype && G.archetype.group;
      if (arch !== 'combat') {
        G.lastResult = `The invitation arrives but is clearly meant for someone with a different background. Your response options are limited. You can acknowledge it formally without committing.`;
        G.flags.warden_invitation_seen = true;
        G.recentOutcomeType = 'faction'; maybeStageAdvance(); return;
      }
      const result = rollD20('combat', (G.skills.combat || 0) + Math.floor(G.level / 3));
      if (result.isCrit) {
        G.flags.warden_invitation_seen = true;
        G.flags.warden_interest_declared = true;
        G.lastResult = `You accept provisional enrollment and immediately gain access to the Roadwarden records archive. The records confirm two sealed letters were logged as evidence in an ongoing inquiry — one that has been stalled for six months. You have a lead now and a uniform that opens doors.`;
        addJournal('faction', 'Warden enrollment accepted — archive access gained', `shelk-warden-join-${G.dayCount}`);
      } else {
        G.flags.warden_invitation_seen = true;
        G.lastResult = `You decline for now, keeping options open. The Roadwarden recruiter notes your response as "pending consideration" — which means the door stays open but their patience has limits.`;
        addJournal('faction', 'Warden invitation deferred', `shelk-warden-defer-${G.dayCount}`);
      }
      G.recentOutcomeType = 'faction'; maybeStageAdvance();
    }
  },

  {
    label: "Aurora Light Cathedral's restricted archive is accessible to clergy and registered investigators — push your credentials to get inside.",
    tags: ['Personal', 'Magic', 'Lore', 'Stage2', 'Meaningful'],
    xpReward: 84,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(84, 'cathedral archive access attempt');
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const arch = G.archetype && G.archetype.group;
      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.isCrit) {
        if (!G.rivalId && arch === 'magic') G.rivalId = 'archivist_veld';
        G.flags.cathedral_archive_accessed = true;
        G.investigationProgress = (G.investigationProgress||0) + 1;
        G.lastResult = arch === 'magic'
          ? `Your arcane credentials satisfy the archive attendant's strictest test. Inside, you find records of a ritual coordination protocol repurposed from its sanctioned use — with the names of three officials who authorized the repurposing. One name you recognize. Two you do not. All three need to be found.`
          : `Your investigator credentials get you a supervised hour in the archive. Enough time to find a single critical document: a formal objection filed and then sealed six months ago. The sealing official's name is legible.`;
        addJournal('investigation', 'Cathedral archive accessed — key documents found', `shelk-archive-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The archive attendant denies access and reports the attempt. The cathedral now has your name in the investigation log alongside the names of three other people who tried and failed.`;
        addJournal('complication', 'Archive access denied and logged', `shelk-archive-fail-${G.dayCount}`);
      } else {
        G.lastResult = `You gain limited supervised access. Nothing sensitive is visible in the public reading room, but the attendant's reaction to your questions tells you what you're looking for exists in the restricted section.`;
        addJournal('investigation', 'Cathedral archive — restricted section confirmed', `shelk-archive-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The underground information network in Shelkopolis' Verdant Row is accessible through three handshake protocols — learn them.",
    tags: ['Personal', 'Stealth', 'Stage2', 'Meaningful'],
    xpReward: 82,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(82, 'learning Verdant Row information protocols');
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const arch = G.archetype && G.archetype.group;
      const result = rollD20('stealth', (G.skills.stealth || 0) + Math.floor(G.level / 3));
      if (result.isCrit) {
        if (!G.rivalId && arch === 'stealth') G.rivalId = 'shadow_broker';
        G.flags.verdant_row_network = true;
        G.investigationProgress = (G.investigationProgress||0) + 1;
        G.lastResult = arch === 'stealth'
          ? `All three protocols land correctly. The Verdant Row network treats you as a known quantity and opens its full rumor architecture: the chapel letters are moving under the cover of a legitimate memorial service contract, and the contract holder is a name that appears in the noble rivalry records you already have.`
          : `You learn the protocols successfully. The network confirms the sealed letter operation has a Shelkopolis-based handler who meets contacts in the Verdant Row district specifically because of the patrol gap at south market shift change.`;
        addJournal('investigation', 'Verdant Row network accessed — handler identified', `shelk-verdant-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `Wrong protocol order. You get challenged. The challenge gets escalated. You exit the district with a bruised shoulder and a very clear memory of what the wrong handshake sequence produces.`;
        addJournal('complication', 'Verdant Row network challenge — failed', `shelk-verdant-fail-${G.dayCount}`);
      } else {
        G.flags.verdant_row_network_partial = true;
        G.lastResult = `Two of three protocols correct. You're accepted as a low-trust associate. Rumors only, no primary source access. The rumors are useful enough: there's a courier who operates between the chapel and the north gate every Thursday.`;
        addJournal('investigation', 'Verdant Row partial access — courier tracked', `shelk-verdant-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Guild Chairwoman Elowen Shelk needs a facilitator for a sensitive internal audit — offer your investigative services.",
    tags: ['Personal', 'Support', 'Stage2', 'Meaningful'],
    xpReward: 80,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(80, 'facilitating guild audit');
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const arch = G.archetype && G.archetype.group;
      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 2));
      if (result.isCrit) {
        if (!G.rivalId && arch === 'support') G.rivalId = 'provost_lenn';
        G.flags.guild_chairwoman_contact = true;
        G.flags.stage2_faction_contact_made = true;
        G.investigationProgress = (G.investigationProgress||0) + 1;
        G.lastResult = arch === 'support'
          ? `Elowen accepts your offer and immediately shows you the audit scope. Three guild contracts show revenue gaps consistent with the letter network's disruption pattern. She names the internal auditor who buried the anomalies six months ago. This is the same period as the Warden stall.`
          : `Elowen brings you into the audit at a specific scope: three contracts. Inside the first contract you find a name that connects the guild disruption to the noble rivalry pattern you've been mapping. The facilitation becomes an investigation.`;
        addJournal('investigation', 'Guild audit facilitated — key contract anomaly found', `shelk-guild-audit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Elowen's staff screens you before the meeting and flags an inconsistency in your credentials. The meeting is cancelled. Your name is logged in the guild visitor record.`;
        addJournal('complication', 'Guild meeting cancelled — credentials flagged', `shelk-guild-fail-${G.dayCount}`);
      } else {
        G.flags.guild_chairwoman_contact = true;
        G.lastResult = `Elowen agrees to limited consultation. You review two contracts and find one with a gap. The gap is real but she instructs you not to document it yet. "Wait until I know what I'm dealing with," she says.`;
        addJournal('investigation', 'Guild contract gap found — deferred documentation', `shelk-guild-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // ── ENVIRONMENTAL / TRADE CHOICES ─────────────────────────────────────────

  {
    label: "Innkeeper Aelra Velvetmere has been keeping a private log of unusual guest patterns for two months — ask to see it.",
    tags: ['NPC', 'Lore', 'Stage2', 'Meaningful'],
    xpReward: 76,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(76, 'accessing innkeeper log');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.isCrit) {
        G.flags.innkeeper_log = true;
        G.investigationProgress++;
        G.lastResult = `Aelra's log is meticulous. It shows arrival and departure patterns for twelve guests over two months. Three of them arrived within 24 hours of each other on three separate occasions. The same rooms. The same exit sequence. Someone is coordinating through this inn and has been careful — but not careful enough to change the room pattern.`;
        addJournal('investigation', 'Innkeeper log — coordinated guest pattern confirmed', `shelk-inn-log-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Aelra is reluctant and asks why you need it. Your answer reads as threatening. She closes the log and will not discuss it further. Her cooperation has ended.`;
        addJournal('complication', 'Innkeeper log refused — relationship burned', `shelk-inn-log-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.lastResult = `Aelra shares two months of partial entries — she excised the most sensitive ones before showing it. What remains confirms unusual guest coordination. The excised sections are more interesting than the visible ones.`;
        addJournal('investigation', 'Innkeeper partial log — edited entries noted', `shelk-inn-log-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The south market glyph surge has left residue patterns that a trained reader can interpret — analyze the damage geometry.",
    tags: ['Lore', 'Environment', 'Stage2', 'Meaningful'],
    xpReward: 74,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'analyzing glyph surge residue');
      if (!G.investigationProgress) G.investigationProgress = 0;
      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.isCrit) {
        G.investigationProgress++;
        G.lastResult = `The damage geometry reads as directed rather than natural — the surge was channeled into the south market from outside it. The origin point is northwest, toward the archival quarter. Channeled surges require knowledge of glyph infrastructure architecture. This was done by someone who knows the city's underground grid.`;
        addJournal('investigation', 'Glyph surge directed — northwest origin confirmed', `shelk-glyph-read-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `You misread the residue geometry. Your analysis contradicts what the Roadwardens already documented. If they compare notes, your credibility in this investigation takes damage.`;
        addJournal('complication', 'Glyph analysis error — credibility at risk', `shelk-glyph-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.lastResult = `The geometry suggests external channeling but you can't confirm direction. The pattern is unusual enough to document as evidence of non-natural surge origin.`;
        addJournal('investigation', 'Glyph surge — external origin probable', `shelk-glyph-probable-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "A Roadwarden patrol leader offers unofficial access to sealed records in exchange for help with a personal matter — assess the terms.",
    tags: ['Survival', 'Faction', 'Stage2', 'Meaningful'],
    xpReward: 78,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(78, 'evaluating patrol leader arrangement');
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.investigationProgress) G.investigationProgress = 0;
      const result = rollD20('survival', (G.skills.survival || 0) + Math.floor(G.level / 3));
      if (result.isCrit) {
        G.investigationProgress++;
        G.lastResult = `The personal matter is real and not dangerous — a property dispute the patrol leader can't pursue officially. You resolve it through a contact and receive three pages of sealed records in return. The records name two relay stations used in the northern route network.`;
        addJournal('investigation', 'Patrol leader arrangement — relay stations named', `shelk-patrol-exchange-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The personal matter is more complicated than described. You get involved and it escalates. The patrol leader cannot protect you from the visibility this creates.`;
        addJournal('complication', 'Patrol leader arrangement escalated', `shelk-patrol-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.lastResult = `Partial execution — you address the patrol leader's matter without full resolution. They give you two pages of records rather than three. Enough to confirm the northern relay network exists.`;
        addJournal('investigation', 'Partial patrol exchange — northern relay confirmed', `shelk-patrol-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // ── ADVANCED CHOICES (gated by investigationProgress >= 6) ───────────────

  {
    label: "The full picture has emerged — trace the operation back to its authorization point and confirm who issued the original order.",
    tags: ['Investigation', 'Advanced', 'Stage2', 'Consequence', 'Meaningful'],
    xpReward: 95,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(95, 'tracing to operation authorization');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if ((G.investigationProgress) < 6) {
        G.lastResult = `You lack the evidence to trace to the authorization point. More investigation needed before the chain of command is visible.`;
        G.recentOutcomeType = 'investigate'; maybeStageAdvance(); return;
      }
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 2));
      if (result.isCrit) {
        G.investigationProgress += 2;
        if (G.investigationProgress >= 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.flags.stage2_origin_confirmed = true;
        G.lastResult = `The authorization trail runs from the chapel to a sealed contract in the guild records to a deputy administrative office in the noble quarter — and ends at a formal request filed under a House Shelk subsidiary charter six months ago. The operation is old, institutional, and protected. Someone with access to charter law enabled this.`;
        addJournal('investigation', 'Operation authorization confirmed — institutional protection identified', `shelk-auth-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `The trace runs cold at a deliberately obscured intermediary layer. Someone anticipated this approach. The concealment is sophisticated enough to tell you this isn't a private scheme — it's an operation with professional counter-investigation design.`;
        addJournal('complication', 'Authorization trace professionally obscured', `shelk-auth-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.flags.stage2_origin_partial = true;
        G.lastResult = `You trace to the noble quarter records office and stop there. The next link requires credentials you don't have. The shape of the authorization is clear. The final confirmation needs a different kind of access.`;
        addJournal('investigation', 'Authorization partially traced — access gap remains', `shelk-auth-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Stage 2 finale — present your complete findings and make the irreversible choice about how to use them.",
    tags: ['Investigation', 'Finale', 'Stage2', 'Consequence', 'Permanent', 'Meaningful'],
    xpReward: 120,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(120, 'Stage 2 investigation resolution');
      if (!G.investigationProgress || G.investigationProgress < 8) {
        G.lastResult = `The investigation is not complete. The gate to Stage III requires the investigation to be fully resolved. Continue gathering evidence.`;
        G.recentOutcomeType = 'investigate'; return;
      }
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 2));
      if (result.total >= 14 || result.isCrit) {
        // Path A: institutional backing
        G.flags.stage2_finale_institutional = true;
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 3;
        G.lastResult = `You present the findings to Roadwarden Command and the guild civic authority simultaneously. The response is immediate: formal investigation opens, your evidence is entered into record, and you receive provisional authorization status — which means Stage III opens with institutional backing. It also means every party you've identified now knows your name and role.`;
        addJournal('investigation', 'Stage 2 finale: institutional path chosen — Stage III opens', `shelk-finale-inst-${G.dayCount}`);
      } else {
        // Path B: underworld backing
        G.flags.stage2_finale_underworld = true;
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 3;
        G.lastResult = `You take the findings to the Verdant Row network first and let them circulate. The institutional response will come eventually, but the underworld circuit moves faster and leaves no official record of your role. Stage III opens with underworld backing — and with three factions now aware that someone is moving against the operation.`;
        addJournal('investigation', 'Stage 2 finale: underworld path chosen — Stage III opens', `shelk-finale-uw-${G.dayCount}`);
      }
      G.flags.stage2_faction_contact_made = true;
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

];
