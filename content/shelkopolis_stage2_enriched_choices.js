/**
 * SHELKOPOLIS STAGE 2 ENRICHED CHOICES
 * Investigation arc: sealed letter network, glyph anomalies, noble faction pressure
 * NPCs: Lady Isabella Shelk, Lady Elowen Shelk, Captain Thalion Windrider,
 *       High Priestess Lyara Dawnlight, Innkeeper Aelra Velvetmere
 */

const SHELKOPOLIS_STAGE2_ENRICHED_CHOICES = [

  // ── INVESTIGATION ARC ──────────────────────────────────────────────────

  {
    label: "The Silkweaver's Chapel intermediary knows the name behind the northern route. She hasn't said it yet.",
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
          ? `The intermediary's doctrinal deflection collapses the moment you cite the Iron Accord's chapter on sanctioned correspondence routes. She sets down her prayer ledger and names the office: a northern factional desk that carries no charter stamp visible at the guildhall. She looks at her hands when she finishes talking.`
          : arch === 'stealth'
          ? `You were in position a full rotation before the pickup window. The intermediary left the chapel by the north gate and passed a sealed letter to a Roadwarden aide at shift change — a practiced handoff, not a first meeting. You have a name and the aide's district assignment.`
          : `The intermediary holds until you spread the letter pattern across the table. He reads the dates and his jaw tightens. A broker name comes out flat, like he's relieved to be done with it — someone routing sealed contracts through chapel cover before the documents clear the guildhall registry.`;
        addJournal('Chapel intermediary source identified', 'evidence', `shelk-chapel-source-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The face at the chapel is wrong. The original intermediary is gone — this one has a fresh guild mark and the careful stillness of someone recently briefed. She listens to your first question, sets down the prayer cloth she's folding, and walks to the shrine desk. You are out the door before the notice is filed, but not before she marks your coat.`;
        addJournal('Investigation noticed at chapel', 'complication', `shelk-chapel-burn-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.lastResult = `The intermediary confirms a northern connection and stops there. When you press for a name, her hands go still on the prayer cloth. She says: "Not today." She said it like someone who said yes last week and has been paying for it since. The refusal has shape. That shape is more useful than a name would have been.`;
        addJournal('Chapel contact confirms northern link', 'evidence', `shelk-chapel-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Every glyph surge in the south market broke within thirty-six hours of a sealed letter arrival. Eleven times.",
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
        G.lastResult = `The dates line up exactly. Every major glyph surge in the south market broke within thirty-six hours of a sealed letter arriving at the chapel — without exception, across eleven incidents. The letters are either triggering the surges or confirming them after the fact. Either reading puts the chapel at the center of both. You have a physical timeline now, and the timeline holds.`;
        addJournal('Glyph-letter pattern correlation confirmed', 'evidence', `shelk-glyph-corr-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The archive clerk who logged the surge incidents was reassigned three days ago. No reason on file, no forwarding desk. The surge records are sealed under a Roadwarden review notation — a review with no assigned officer and no scheduled completion date. Someone moved the clerk and locked the door in the same week.`;
        addJournal('Glyph records sealed during investigation', 'complication', `shelk-glyph-sealed-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.lastResult = `Three of the five surges align with letter arrival dates. The other two don't. You spread the records on the reading table and check the math twice. Either the letter network only coordinated some of the surges, or a second operation is using the same chapel cover for different business. Both possibilities are worse than a clean pattern.`;
        addJournal('Partial glyph-letter correlation', 'evidence', `shelk-glyph-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The shortages are too surgical for a family dispute. Someone mapped the rivalry and used it as scaffolding.",
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
          ? `Elowen's guild purchase records show a pattern you recognize from Bureau audit work: the disruptions divert trade away from established guild contracts and into a parallel market with no registered registry stamp. Elowen either has seen this and held it — or she is carrying a liability she hasn't named to anyone.`
          : `The shortages cluster in exactly the product lines controlled by the faction opposing Lady Isabella's direct holdings. The rivalry between the houses is real, but the damage here is too surgical for a family dispute. Someone mapped the rivalry and is using it as scaffolding for something that operates at a different scale entirely.`;
        addJournal('Noble rivalry instrumentalized — deeper layer found', 'evidence', `shelk-noble-layer-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Your question about trade disruption timing lands on the desk of a House Shelk factor who has been waiting for someone to ask it. He doesn't answer. He copies your guild travel permit number into his personal ledger and thanks you for your time. By evening your name is registered at the civic records counter as a person of interest in an active trade inquiry.`;
        addJournal('Registered as trade inquiry person of interest', 'complication', `shelk-noble-register-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.lastResult = `The beneficiaries aren't hidden — three families whose names appear in the chapel letter records are the only ones gaining ground as the disruption runs. You can name them. What you can't show yet is who gave the order and when. The direction is clear. The proof of intent is still a step away.`;
        addJournal('Noble beneficiary pattern identified', 'evidence', `shelk-noble-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The picture is close enough to share. Sharing it means sharing the exposure.",
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
        G.lastResult = `You lay out what you have on the table: partial dates, two names with unconfirmed roles, a pattern that holds in three of five cases. It isn't enough. Sharing this now hands someone a half-built case they can dismantle or absorb. The picture needs more before it can be moved.`;
        G.recentOutcomeType = 'investigate'; maybeStageAdvance(); return;
      }
      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.isCrit) {
        G.stage2_evidence_shared = true;
        if (!G.flags) G.flags = {};
        G.flags.stage2_evidence_shared_crit = true;
        G.worldClocks.omens = (G.worldClocks.omens||0) + 1;
        G.lastResult = `You spread the documents across the table and let the contact read without speaking. They finish, tap one entry, and name a third party you hadn't placed yet — someone who bridges the chapel network and the guild records. They slide the papers back: "Keep going. Carefully." The work is shared now. So is the exposure.`;
        addJournal('Evidence shared — investigation expanded', 'evidence', `shelk-evidence-shared-${G.dayCount}`);
      } else {
        G.stage2_evidence_shared = false;
        G.lastResult = `You folder the documents and put them back in your coat. The advantage of what you know stays yours — no one else's read on it, no one else's agenda shaping where it goes next. The risk stays yours too. That's the same thing said twice.`;
        addJournal('Evidence withheld — solo investigation continues', 'evidence', `shelk-evidence-held-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // ── NPC CHOICES ───────────────────────────────────────────────────────────

  {
    label: "Lady Isabella Shelk knows the disruption doesn't originate in this city. She may say so.",
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
          ? `Lady Isabella receives you in the east sitting room and does not offer tea. She confirms the trade disruption without being asked, names two families she holds responsible for exploiting it, and asks for nothing in return. She folds her hands when she finishes. The calm in the room is the kind that comes from someone who stopped being surprised by this a while ago.`
          : `Lady Isabella gives you four minutes. She doesn't deny the letter network — she doesn't confirm it either. She says: "Whoever benefits from the disruption does not live in this city." Then she stands and the audience ends. The coal smoke from the harbor reaches even this floor of the estate.`;
        addJournal('Lady Isabella Shelk contact made', 'evidence', `shelk-isabella-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `The gate staff takes your name, disappears inside for three minutes, and returns with the same expression they left with. Lady Isabella is unavailable to persons without standing in the Iron Accord registry. Your name goes into the household visitor log — the kind that gets shared with Roadwarden Command during courtesy briefings. You walk back down the hill more visible than you came up.`;
        addJournal('Estate entry refused — flagged', 'complication', `shelk-isabella-fail-${G.dayCount}`);
      } else {
        G.flags.met_lady_isabella = true;
        G.lastResult = `The audience runs seven minutes. Lady Isabella confirms she is aware of irregularities and cannot speak to specifics on record. When you finish your question, her eyes move — not toward the door, toward the window that faces the guild quarter. She doesn't say anything else. She doesn't need to.`;
        addJournal('Lady Isabella points toward guild — indirect', 'evidence', `shelk-isabella-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Windrider has noticed the same pattern. The conditions for sharing it haven't been agreed yet.",
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
          ? `Windrider listens without notes, which means he's memorizing it. When you finish, he taps the table once and names your evidence as sufficient for a parallel inquiry. The conditions arrive next: everything you find comes to him, before it goes anywhere else. He extends his hand. It's an alliance built to serve two agendas simultaneously, and both parties know it.`
          : `Windrider receives the briefing without expression and confirms the Roadwardens have noticed the same pattern through different means. He asks you to keep reporting. He offers nothing in return — no resources, no cover, no reciprocal intelligence. The risk stays yours. The contact is established regardless.`;
        addJournal('faction', 'Roadwarden command contact established', `shelk-windrider-${G.dayCount}`);
      } else if (result.isFumble) {
        if (arch === 'combat') G.rivalId = 'warden_captain';
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `Windrider hears the briefing without interrupting. At the end he asks one question: "How did you come to hold sealed documentation from a restricted chapel intermediary?" Your answer doesn't satisfy him. He writes something in the duty log before you finish the sentence. You leave with a new entry in the Roadwarden enforcement record, no alliance, and a captain who has now categorized you as a variable he needs to account for.`;
        addJournal('Windrider briefing backfired — logged', 'complication', `shelk-windrider-fail-${G.dayCount}`);
      } else {
        G.flags.met_captain_windrider = true;
        G.lastResult = `Windrider confirms the pattern is familiar to him and that the Roadwardens are working it through sanctioned channels. He asks you to report new developments. He makes no commitment in return and doesn't lean across the table when he says it. The conversation has the texture of a man who is still deciding what category you belong in.`;
        addJournal('Windrider aware — cautious contact made', 'evidence', `shelk-windrider-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Lyara Dawnlight filed three formal objections about the chapel's letter routes. All stamped received and unanswered.",
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
          ? `Lyara Dawnlight goes still when you describe the letter routing sequence. She names the structure without prompting: a Compassion-shrine emergency intercession protocol, designed for moral crisis coordination between clergy — repurposed, she says, with the care of someone who understood exactly what they were dismantling. Her hands stay flat on the altar cloth. She will help you. The fury is in the stillness.`
          : `The High Priestess confirms the chapel operates outside its sanctioned function and opens a desk drawer to show you three formal objections she filed with civic administration, each stamped received and unanswered. She names the last recipient: a deputy in the noble quarter records office. The name is written in her own hand at the bottom of the third page.`;
        addJournal('High Priestess confirms ritual misuse — source named', 'evidence', `shelk-priestess-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.reverence = (G.worldClocks.reverence||0) - 1;
        G.lastResult = `Your second question lands wrong. Lyara Dawnlight sets down her liturgical register and looks at you with the particular precision of someone who has heard what she considers an accusation wrapped in courtesy. She formally declines to discuss chapel operational matters and directs you to civic administration. The conversation ends with her still seated and you still standing. The cathedral door feels heavier on the way out.`;
        addJournal('Cathedral relationship strained', 'complication', `shelk-priestess-fail-${G.dayCount}`);
      } else {
        G.flags.met_high_priestess = true;
        G.lastResult = `Lyara Dawnlight acknowledges unusual chapel usage without elaborating on what she's seen. She speaks like someone choosing every word from a smaller set than she has available. At the end she offers one thing unprompted: the pattern began three weeks before the first recorded glyph surge in the south market. She says it looking at the altar, not at you.`;
        addJournal('Priestess confirms timing link — cautious', 'evidence', `shelk-priestess-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // ── WORLD PRESSURE ARC ─────────────────────────────────────────────────

  {
    label: "A Warden Order representative is waiting at the Noble District Inn. The assessment has already begun.",
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
          ? `The representative's questions have a sequence — they're probing for what you have, not sharing what they know. You give them a partial truth and watch it move. Within an hour it's been passed to a superior without editing. The chain of command has a visible shape now, and you're somewhere on its map.`
          : `You give the representative enough to establish that you're operating with purpose, and hold enough back that the purpose stays yours. They leave without pressing further. The rival clock advances regardless. That was always going to happen.`;
        addJournal('faction', 'Warden Order contact — productive first meeting', `shelk-warden-contact-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.rival = (G.worldClocks.rival||0) + 2;
        G.factionHostility.warden_order = (G.factionHostility.warden_order||0) + 2;
        G.lastResult = `The meeting breaks down at the third question. Something you say — the phrasing, the hesitation — reads to the representative as concealment. They straighten in their chair and stop asking questions. They leave with a formal note already half-written. The Warden Order's posture toward you has shifted: not unaffiliated, not neutral. A risk to be managed.`;
        addJournal('Warden Order now treating player as risk', 'complication', `shelk-warden-hostile-${G.dayCount}`);
      } else {
        G.worldClocks.rival = (G.worldClocks.rival||0) + 1;
        G.lastResult = `The meeting ends without commitment from either side. The representative thanks you for your time in the register tone of someone completing an administrative task. You've been assessed. What the assessment produced stays on their side of the table.`;
        addJournal('faction', 'Warden Order assessment — neutral', `shelk-warden-neutral-${G.dayCount}`);
      }
      G.recentOutcomeType = 'faction'; maybeStageAdvance();
    }
  },

  {
    label: "Same questions, same locations, one day behind. The gap is closing.",
    tags: ['Rival', 'Stage2', 'Combat', 'Meaningful'],
    xpReward: 88,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(88, 'managing named rival encounter');
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      if ((G.worldClocks.rival||0) < 2 && !G.flags.stage2_rival_forced) {
        G.lastResult = `Multiple sources have confirmed the same description: someone asking the same questions, at the same addresses, one day behind your movements. You haven't shared the same room yet. The gap is real but hasn't closed. The moment to act or avoid hasn't arrived — but it's been scheduled by someone else's timeline.`;
        G.recentOutcomeType = 'investigate'; maybeStageAdvance(); return;
      }
      const result = rollD20('combat', (G.skills.combat || 0) + Math.floor(G.level / 3));
      const arch = G.archetype && G.archetype.group;
      if (result.isCrit) {
        G.stage2_rival_status = 'negotiated';
        G.worldClocks.rival = (G.worldClocks.rival||0) - 1;
        G.lastResult = arch === 'combat'
          ? `You step in front of them at the south market gate and don't move. The Warden captain stops, reads you, and then does something unexpected: nods. The negotiation that follows is terse and runs four exchanges. You agree to share specific intelligence in return for limited Roadwarden records access. The rival is still a rival — now a constrained one with a shared cost structure.`
          : `The confrontation stalls when the captain says something that doesn't match their assignment profile. They have doubts about what they're supposed to find. You establish enough mutual interest to arrive at a working arrangement. Neither party articulates what trust looks like in this context, because it doesn't exist yet.`;
        addJournal('Rival contact negotiated — temporary alliance', 'evidence', `shelk-rival-negotiated-${G.dayCount}`);
      } else if (result.isFumble) {
        G.stage2_rival_status = 'hostile';
        G.worldClocks.rival = (G.worldClocks.rival||0) + 2;
        G.lastResult = `The encounter goes wrong fast. The captain had a prepared position and you walked into it. They name you as an operative of unknown allegiance and say it in the flat voice of someone already composing the report. By the time you're back on the street the filing is already in progress. This captain will be waiting at the next gate.`;
        addJournal('Rival now actively hostile — Stage 3 impact', 'complication', `shelk-rival-hostile-${G.dayCount}`);
      } else {
        G.worldClocks.rival = (G.worldClocks.rival||0) + 1;
        G.lastResult = `The encounter lasts less than a minute. Neither party extends it. You both leave with the same information you arrived with, plus one new fact: the other is active, present, and not going to stop. The gap between you stays one day.`;
        addJournal('Rival encountered — neutral outcome', 'evidence', `shelk-rival-neutral-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // ── PERSONAL ARC ──────────────────────────────────────────────────────────

  {
    label: "The Roadwarden invitation comes with a records access chit. The uniform opens the archive.",
    tags: ['Personal', 'Combat', 'Stage2', 'Meaningful'],
    xpReward: 88,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(88, 'Warden recruitment offer');
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const arch = G.archetype && G.archetype.group;
      if (arch !== 'combat') {
        G.lastResult = `The invitation is printed on Roadwarden letterhead and addressed with the specific honorifics used for combat-trained candidates. It doesn't quite fit your profile and the recruiter's face confirms that when you arrive. You can acknowledge it formally, receive the courtesy response, and leave the door open without walking through it. That's the full range of what's available to you here.`;
        G.flags.warden_invitation_seen = true;
        G.recentOutcomeType = 'faction'; maybeStageAdvance(); return;
      }
      const result = rollD20('combat', (G.skills.combat || 0) + Math.floor(G.level / 3));
      if (result.isCrit) {
        G.flags.warden_invitation_seen = true;
        G.flags.warden_interest_declared = true;
        G.lastResult = `You accept provisional enrollment. The recruiter produces a Roadwarden duty band and a records access chit in the same motion — this was prepared in advance. The archive is three floors below. Inside: two sealed letters logged as evidence in an ongoing inquiry, both stalled under the same review notation for six months. The uniform opens the door. The stall tells you who wants it closed.`;
        addJournal('faction', 'Warden enrollment accepted — archive access gained', `shelk-warden-join-${G.dayCount}`);
      } else {
        G.flags.warden_invitation_seen = true;
        G.lastResult = `You decline for now. The recruiter writes "pending consideration" in the intake log, which is a Roadwarden courtesy phrase that means the offer expires when their patience does. The door stays open. That's a resource you've chosen to hold rather than spend.`;
        addJournal('faction', 'Warden invitation deferred', `shelk-warden-defer-${G.dayCount}`);
      }
      G.recentOutcomeType = 'faction'; maybeStageAdvance();
    }
  },

  {
    label: "Aurora Light Cathedral's restricted archive holds the protocol revision records. The credentials gate is real.",
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
          ? `The archive attendant puts your credentials through the full doctrinal verification sequence, which takes twelve minutes. You pass. Inside, the restricted texts include records of a ritual coordination protocol that was repurposed from its sanctioned use — with three names attached to the authorization. One you recognize from the chapel letter records. Two are new. All three need to be placed.`
          : `Your credentials earn a supervised hour in the reading room with pre-selected materials. One document stands out: a formal objection filed against a specific protocol change and then sealed six months ago under a notation that cites no governing authority. The name of the sealing official is legible in the upper margin.`;
        addJournal('Cathedral archive accessed — key documents found', 'evidence', `shelk-archive-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The archive attendant denies access before you finish presenting your credentials. The refusal is polite and immediate — she's done this recently. She writes your name in the access attempt log while you're still standing there. The log is already open to the page. Three other names above yours, from the past two weeks. You're not the first, and the pattern of failures is its own kind of intelligence.`;
        addJournal('Archive access denied and logged', 'complication', `shelk-archive-fail-${G.dayCount}`);
      } else {
        G.lastResult = `Limited supervised access: the public reading room, a selection of pre-approved texts, forty-five minutes. Nothing sensitive surfaces in what you're given. But when you ask the attendant about the protocol revision records, she pauses before redirecting you. The pause is the answer. What you need is in the restricted section. It's there.`;
        addJournal('Cathedral archive — restricted section confirmed', 'evidence', `shelk-archive-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Verdant Row's information network runs on three handshake protocols. Getting the sequence wrong has a cost.",
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
          ? `All three protocols land in the right order. The network reads you as a known quantity and opens the full rumor layer without preamble: the chapel letters move under the cover of a legitimate memorial service contract. The contract holder's name is already in your records — in the noble rivalry documents from two days ago. The same name. Two different operations.`
          : `The protocols work. The network confirms the sealed letter operation runs through a Shelkopolis-based handler who meets at Verdant Row specifically because the south market patrol rotation creates a twenty-minute gap at shift change. Predictable infrastructure. Someone mapped the Roadwarden schedule before building the courier route.`;
        addJournal('Verdant Row network accessed — handler identified', 'evidence', `shelk-verdant-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `The second protocol is wrong. The third never gets attempted. The challenge comes fast and the escalation faster — two men who were watching from across the lane close the gap while you're still processing the first response. You exit Verdant Row with a bruised shoulder, a torn coat lining, and a clear understanding of what the wrong handshake sequence costs in this district.`;
        addJournal('Verdant Row network challenge — failed', 'complication', `shelk-verdant-fail-${G.dayCount}`);
      } else {
        G.flags.verdant_row_network_partial = true;
        G.lastResult = `Two of three protocols land. The network accepts you at low-trust level — rumors only, no primary source access, no names confirmed. The rumor they give you is specific enough to act on: a courier running between the Silkweaver's Chapel and the north gate, consistent schedule, every Thursday, same departure window. Partial access. Useful partial access.`;
        addJournal('Verdant Row partial access — courier tracked', 'evidence', `shelk-verdant-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Elowen Shelk's audit needs a facilitator. The revenue gaps in three contracts point the same direction.",
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
          ? `Elowen accepts and sets the audit scope herself: three specific contracts. She's already identified the problem — she needs documentation she can't produce internally. The revenue gaps in all three align precisely with the letter network's disruption pattern. She names the internal auditor who buried the anomalies six months ago, and pauses to let you note the timing: same month as the Roadwarden review stall.`
          : `Elowen brings you into the audit with a narrow brief: three contracts, nothing outside that scope. The first contract contains a name you've already encountered in the noble rivalry records. The facilitation becomes something else. Elowen watches your expression when you find it and doesn't say anything.`;
        addJournal('Guild audit facilitated — key contract anomaly found', 'evidence', `shelk-guild-audit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Elowen's administrative staff runs credentials before any meeting happens. They find an inconsistency — a registration gap, a date that doesn't align. The meeting is cancelled by note. Your name goes into the guild visitor record at the front desk, which is the kind of record that gets shared with Iron Accord registry clerks during quarterly audit cycles. You leave without having seen the Chairwoman's office.`;
        addJournal('Guild meeting cancelled — credentials flagged', 'complication', `shelk-guild-fail-${G.dayCount}`);
      } else {
        G.flags.guild_chairwoman_contact = true;
        G.lastResult = `Elowen agrees to limited consultation: two contracts, read-only, no notes. You find the gap in the first one — a revenue absence that the audit trail routes around rather than through. The gap is real. Elowen reads your expression and says, "Don't document it yet. Not until I know the scope of what I'm holding." She closes the contract folder herself.`;
        addJournal('Guild contract gap found — deferred documentation', 'evidence', `shelk-guild-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // ── ENVIRONMENTAL / TRADE CHOICES ─────────────────────────────────────────

  {
    label: "Aelra Velvetmere has kept a private log in the margin of her room ledger. Two months. Her own cipher.",
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
        G.lastResult = `Aelra's log is written in the margin of her room ledger in a private cipher she doesn't explain. She translates it herself, reading aloud without looking at you. Twelve guests over two months. Three of them arrived within twenty-four hours of each other on three separate occasions — different names, same rooms, same exit sequence, same departure hour. The coordination is visible in the repetition. Whoever planned it was careful enough to use different names and not careful enough to change the rooms.`;
        addJournal('Innkeeper log — coordinated guest pattern confirmed', 'evidence', `shelk-inn-log-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Aelra asks why you need the guest log before she shows it. Your answer is too direct — it reads as a demand rather than a request, or names something she hasn't said aloud yet. Her expression closes. She covers the ledger with her forearm and says she doesn't keep records of that kind. The smell of coal smoke and old wood fills the silence. Her cooperation is done.`;
        addJournal('Innkeeper log refused — relationship burned', 'complication', `shelk-inn-log-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.lastResult = `Aelra hands over two months of entries with several pages folded back — the fold is deliberate, not accidental. What's visible confirms unusual guest coordination: shared timing, shared rooms, inconsistent names. The folded sections are where the record gets specific. She's not refusing to help. She's choosing what help looks like.`;
        addJournal('Innkeeper partial log — edited entries noted', 'evidence', `shelk-inn-log-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The scorch patterns don't radiate from a center. They lean. The surge was channeled in.",
    tags: ['Lore', 'Environment', 'Stage2', 'Meaningful'],
    xpReward: 74,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'analyzing glyph surge residue');
      if (!G.investigationProgress) G.investigationProgress = 0;
      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.isCrit) {
        G.investigationProgress++;
        G.lastResult = `The scorch patterns don't radiate from a center — they lean. The damage is heavier on the northwest-facing surfaces of every stall that burned. The surge was channeled in from outside the market, not generated within it. Northwest means the archival quarter. Channeling a surge requires working knowledge of the city's underground glyph grid — the kind of knowledge that's held by fewer than a dozen people with active registry credentials.`;
        addJournal('Glyph surge directed — northwest origin confirmed', 'evidence', `shelk-glyph-read-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The analysis goes wrong at the geometry step — you read the lean of the scorch marks from the wrong reference point and arrive at a southeast origin, not northwest. When you cross-reference with the Roadwarden damage report that's already posted at the district board, the contradiction is visible to anyone who looks at both. Your read is on the record. So is theirs. So is the gap between them.`;
        addJournal('Glyph analysis error — credibility at risk', 'complication', `shelk-glyph-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.lastResult = `The scorch pattern suggests external channeling — the lean is there, but the street angle and the tannery smoke stain on the north wall make the direction ambiguous. You document what you can confirm: the surge came from outside the market perimeter. The direction of origin is probable, not certain. Probable is enough to enter as evidence.`;
        addJournal('Glyph surge — external origin probable', 'evidence', `shelk-glyph-probable-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "A patrol leader with sealed records access has a property dispute. The exchange has a cost on both sides.",
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
        G.lastResult = `The personal matter is a property boundary dispute that's been stalled in the civic queue for eight months — real, concrete, and solvable. You work it through a guild records clerk who owes you nothing but processes the paperwork anyway. Three days later the patrol leader slides three folded pages across the tavern table without making eye contact. The pages name two relay stations on the northern route network, both listed under supply depot classifications that don't match their described locations.`;
        addJournal('Patrol leader arrangement — relay stations named', 'evidence', `shelk-patrol-exchange-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The personal matter turns out to involve a third party who was not mentioned in the original description. Your intervention surfaces their claim, which accelerates the dispute instead of resolving it. The patrol leader receives word of this the same afternoon. They send no message. What they don't do is anything to reduce the visibility the escalation creates around your name in this district.`;
        addJournal('Patrol leader arrangement escalated', 'complication', `shelk-patrol-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.lastResult = `You address the property dispute but the resolution is partial — boundary confirmed on one edge, contested on the other, with a follow-up hearing still pending. The patrol leader slides two pages across the table instead of three. "The third's not mine to give yet." The two pages confirm the northern relay network exists and name one endpoint. The second location stays blank.`;
        addJournal('Partial patrol exchange — northern relay confirmed', 'evidence', `shelk-patrol-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // ── ADVANCED CHOICES (gated by investigationProgress >= 6) ───────────────

  {
    label: "The shape of the operation is clear. The name at the authorization point is one more link away.",
    tags: ['Investigation', 'Advanced', 'Stage2', 'Consequence', 'Meaningful'],
    xpReward: 95,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(95, 'tracing to operation authorization');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if ((G.investigationProgress) < 6) {
        G.lastResult = `The evidence on the table points in a direction but doesn't reach the origin. The authorization chain requires more links before the terminal point becomes visible. The shape of the operation is clear. The name at the top is not.`;
        G.recentOutcomeType = 'investigate'; maybeStageAdvance(); return;
      }
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 2));
      if (result.isCrit) {
        G.investigationProgress += 2;
        if (G.investigationProgress >= 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.flags.stage2_origin_confirmed = true;
        G.lastResult = `The trail runs from the chapel letter network to a sealed contract in the guild archive to a deputy desk in the noble quarter records office — and ends at a formal request filed under a House Shelk subsidiary charter, dated six months ago. The operation isn't recent. It was structured, registered, and protected from the start. Someone with working knowledge of charter law built the cover before the first letter moved.`;
        addJournal('Operation authorization confirmed — institutional protection identified', 'evidence', `shelk-auth-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `The trail runs into a wall at the third link: an intermediary layer with no registry anchor, no charter citation, no named officer. The absence is too clean. Someone built a dead end here on purpose — a gap that produces no trail and absorbs inquiry. This is not a private scheme that got careful. It's an operation with counter-investigation structure built in from the start.`;
        addJournal('Authorization trace professionally obscured', 'complication', `shelk-auth-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.flags.stage2_origin_partial = true;
        G.lastResult = `The trail reaches the noble quarter records office and stops. The next link sits behind a credential gate you don't hold — charter-level access, restricted to registered deputies and House representatives. The shape of the authorization is visible: who gave the order is implied by what surrounds the gap. Confirming it requires a different door than the ones currently open to you.`;
        addJournal('Authorization partially traced — access gap remains', 'evidence', `shelk-auth-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // ── NEW BEATS ─────────────────────────────────────────────────────────────

  {
    label: "Elowen Shelk hasn't stopped auditing. She's reached a name she won't say out loud.",
    tags: ['stage2', 'shelkopolis'],
    xpReward: 30,
    fn: function() {
      advanceTime(1);
      var roll = rollD20('persuasion', G.skills.persuasion);
      if (roll >= 13) {
        addNarration(
          'The Name She Won\'t Write Down',
          'Elowen meets you in the guild anteroom, not her office. She keeps the door to the corridor open. When she speaks she does it quietly, facing the window that overlooks the Artisans Quarter. She\'s found a third contract that routes revenue through a subsidiary with no registered master craftsman — a dead shell, four years old, active only during disruption windows. She slides the contract face-down across the table and does not touch it again. The name of the subsidiary\'s founding signatory is visible through the paper when the light catches it right.'
        );
        addJournal('Elowen Shelk — shell subsidiary linked to disruption windows, founding signatory visible', 'evidence');
        G.investigationProgress = (G.investigationProgress || 0) + 1;
        maybeStageAdvance();
      } else {
        addNarration(
          'Not Yet',
          'Elowen\'s administrative clerk intercepts you at the guild entrance. The Chairwoman is in closed session. The clerk says it without apology and writes your name in the visitor queue before you finish acknowledging it. The queue has four names ahead of yours. Two of them belong to Roadwarden liaison officers. Something has changed in the last twenty-four hours — the queue tells you that without telling you what.'
        );
      }
    }
  },

  {
    label: "The Great Registry seal archive runs three floors below street level. The dates on those seals don't match what was filed above.",
    tags: ['stage2', 'shelkopolis'],
    xpReward: 30,
    fn: function() {
      advanceTime(1);
      var roll = rollD20('lore', G.skills.lore);
      if (roll >= 13) {
        addNarration(
          'The Archive That Doesn\'t Line Up',
          'The Great Registry\'s sub-level seal archive smells of old wax and stone cold enough to see breath in. The shelf markers are hand-labeled in two different scripts — the originals and a second hand that came through later, re-sorting. You find the block covering the chapel letter period. Three seal impressions carry dates that precede the corresponding filings by eleven days. Pre-dated registrations are a charter technique: the authorization existed before the action, which means someone planned the cover before the operation began.'
        );
        addJournal('Great Registry — pre-dated seal impressions confirm pre-planned authorization structure', 'evidence');
        G.investigationProgress = (G.investigationProgress || 0) + 1;
        maybeStageAdvance();
      } else {
        addNarration(
          'The Wrong Index',
          'The sub-level archive attendant pulls the correct shelf block, sets it on the reading table, and waits. The seal records for the relevant period are present but the index sheet that would let you cross-reference against the filing dates upstairs is missing — removed cleanly, not torn. The attendant notes the absence in the duty log without being asked and names it a routine loss. The notation is made in the same ink as everything else on the page. It isn\'t routine.'
        );
      }
    }
  },

  {
    label: "Wearing a House Shelk guild token in the wrong quarter reads as a provocation here. It already has.",
    tags: ['stage2', 'shelkopolis'],
    xpReward: 30,
    fn: function() {
      advanceTime(1);
      var roll = rollD20('stealth', G.skills.stealth);
      if (roll >= 13) {
        addNarration(
          'Reading the Room Before the Room Reads You',
          'The Fashion Artisans Collective mark on your coat tag is the wrong House color for the Verdant Row end of the market — visible enough that two stall runners clock it in the first thirty seconds. You catch the look before either of them moves and peel the tag at the seam before it becomes a formal correction. The man who was watching from the grain exchange doorway stops watching and goes back inside. The Collective\'s territorial grammar here is enforced by attention, not ordinance, and you\'ve just demonstrated you can read it.'
        );
        addJournal('Shelkopolis Artisans Collective — territorial mark system observed, decorum breach avoided', 'discovery');
        G.investigationProgress = (G.investigationProgress || 0) + 1;
        maybeStageAdvance();
      } else {
        addNarration(
          'The Correction Arrives Formally',
          'A Collective warden steps out from the covered stall row and addresses you by the honorific used for persons under formal notice. The House color on your tag is documented, your name requested, your purpose in this quarter recorded. The process is courteous and takes eight minutes. By the end you have a correction notice stamped with the Collective seal and a name in the warden\'s duty log. The correction notice is the kind that gets shared with the Roadwarden Market Order desk at end of shift.'
        );
      }
    }
  },

  {
    label: "The evidence is complete. The choice about how to use it doesn't reverse.",
    tags: ['Investigation', 'Finale', 'Stage2', 'Consequence', 'Permanent', 'Meaningful'],
    xpReward: 120,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(120, 'Stage 2 investigation resolution');
      if (!G.investigationProgress || G.investigationProgress < 8) {
        G.lastResult = `The picture is not complete. The evidence chain has gaps, and presenting it now hands someone an incomplete case they can absorb or redirect. Stage III requires the full picture. More ground to cover before this can move.`;
        G.recentOutcomeType = 'investigate'; return;
      }
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 2));
      if (result.total >= 14 || result.isCrit) {
        // Path A: institutional backing
        G.flags.stage2_finale_institutional = true;
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 3;
        G.lastResult = `You present the full evidence package to Roadwarden Command and the guild civic authority simultaneously — same hour, two different buildings. The response comes before evening: a formal inquest opens, your documents enter the record, and a provisional authorization notice is issued under your name. Stage III begins with institutional backing and maximum visibility. Every party named in the evidence now knows who filed it.`;
        addJournal('Stage 2 finale: institutional path chosen — Stage III opens', 'evidence', `shelk-finale-inst-${G.dayCount}`);
      } else {
        // Path B: underworld backing
        G.flags.stage2_finale_underworld = true;
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 3;
        G.lastResult = `You bring the findings to the Verdant Row network and let them circulate through the rumor channels first. The institutional response will follow, but the underground circuit moves at a different speed and leaves no formal record with your name on it. Stage III begins with underworld backing. Three factions now know that someone is moving against the operation. None of them know it's you — yet.`;
        addJournal('Stage 2 finale: underworld path chosen — Stage III opens', 'evidence', `shelk-finale-uw-${G.dayCount}`);
      }
      G.flags.stage2_faction_contact_made = true;
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

];

window.SHELKOPOLIS_STAGE2_ENRICHED_CHOICES = SHELKOPOLIS_STAGE2_ENRICHED_CHOICES;
