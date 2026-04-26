/**
 * SHELKOPOLIS STAGE 2 ENRICHED CHOICES
 * Investigation arc: sealed letter network, glyph anomalies, noble faction pressure
 * NPCs: Lady Isabella Shelk, Lady Elowen Shelk, Captain Thalion Windrider,
 *       High Priestess Lyara Dawnlight, Innkeeper Aelra Velvetmere
 */

const SHELKOPOLIS_STAGE2_ENRICHED_CHOICES = [

  // ── INVESTIGATION ARC ──────────────────────────────────────────────────

  {
    label: "The chapel intermediary knows the name behind the northern route. She hasn't said it yet.",
    tags: ['Investigation', 'Stage2', 'Meaningful'],
    xpReward: 80,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(80, 'investigating sealed letter network');
      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
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
    label: "Every south market glyph surge broke within thirty-six hours of a sealed letter. Eleven times.",
    tags: ['Investigation', 'Stage2', 'Lore', 'Meaningful'],
    xpReward: 75,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(75, 'correlating glyph and letter patterns');
      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.isCrit) {
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `The dates line up exactly. Every major glyph surge in the south market broke within thirty-six hours of a sealed letter arriving at the chapel — without exception, across eleven incidents. The letters are either triggering the surges or confirming them after the fact. Either reading puts the chapel at the center of both. You have a physical timeline now, and the timeline holds. Someone has made a second record of your transit today — the handwriting on the secondary ledger is not Collegium standard. Red Hood keeps its own accounting.`;
        addJournal('Glyph-letter pattern correlation confirmed', 'evidence', `shelk-glyph-corr-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The archive clerk who logged the surge incidents was reassigned three days ago. No reason on file, no forwarding desk. The surge records are sealed under a Roadwarden review notation — a review with no assigned officer and no scheduled completion date. Someone moved the clerk and locked the door in the same week.`;
        drawSocialMisstep(G.location);
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
    label: "The shortages are too surgical for a family dispute. The rivalry is scaffolding.",
    tags: ['Investigation', 'Stage2', 'Faction', 'Meaningful'],
    xpReward: 78,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(78, 'mapping noble faction benefit');
      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));
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
      // Only meaningful when investigation has some progress
      const progress = G.investigationProgress;
      if (progress < 3) {
        G.lastResult = `You lay out what you have on the table: partial dates, two names with unconfirmed roles, a pattern that holds in three of five cases. It isn't enough. Sharing this now hands someone a half-built case they can dismantle or absorb. The picture needs more before it can be moved.`;
        G.recentOutcomeType = 'investigate'; maybeStageAdvance(); return;
      }
      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.isCrit) {
        G.stage2_evidence_shared = true;
        G.flags.stage2_evidence_shared_crit = true;
        G.worldClocks.omens = (G.worldClocks.omens||0) + 1;
        G.lastResult = `You spread the documents across the table and let the archivist read without speaking. They finish, tap one entry, and name a third party you hadn't placed yet — someone who bridges the chapel network and the guild records. They slide the papers back: "Keep going. Carefully." The work is shared now. So is the exposure.`;
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
      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 2));
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
        G.lastResult = `The gate staff takes your name, disappears inside for three minutes, and returns with the same expression they left with. Lady Isabella is unavailable to persons without standing in the Iron Accord registry. Your name goes into the household visitor log — the kind that gets shared with Roadwarden Command during courtesy briefings. You walk back down the hill more visible than you came up. Isabella's public record filing with the South Market Commerce House is another route — one that doesn't require an appointment.`;
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
      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      const arch = G.archetype && G.archetype.group;
      if (result.isCrit) {
        G.flags.met_captain_windrider = true;
        G.flags.stage2_faction_contact_made = true;
        if (!G.rivalId && arch === 'combat') G.rivalId = 'warden_captain';
        G.lastResult = arch === 'combat'
          ? `Windrider listens without notes, which means he's memorizing it. When you finish, he taps the table once and names your evidence as sufficient for a parallel inquiry. The conditions arrive next: everything you find comes to him, before it goes anywhere else. He extends his hand. It's an alliance built to serve two agendas simultaneously, and both parties know it.`
          : `Windrider receives the briefing without expression and confirms the Roadwardens have noticed the same pattern through different means. He asks you to keep reporting. He offers nothing in return — no resources, no cover, no reciprocal intelligence. The risk stays yours. The contact is established regardless.`;
        addJournal('Roadwarden command contact established', 'contact_made', `shelk-windrider-${G.dayCount}`);
      } else if (result.isFumble) {
        if (arch === 'combat') G.rivalId = 'warden_captain';
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `The briefing runs without interruption. At the end, one question arrives: "How did you come to hold sealed documentation from a restricted chapel intermediary?" The answer doesn't satisfy. Something goes into the duty log before the sentence is finished. The exit carries a new entry in the Roadwarden enforcement record, no alliance, and a captain who has now categorized this as a variable he needs to account for.`;
        addJournal('Windrider briefing backfired — logged', 'complication', `shelk-windrider-fail-${G.dayCount}`);
      } else {
        G.flags.met_captain_windrider = true;
        G.lastResult = `The pattern is confirmed as familiar — the Roadwardens are working it through sanctioned channels. Report new developments. No commitment offered in return; the table stays between the two parties when it's said. The conversation has the texture of someone still deciding what category this belongs in.`;
        addJournal('Windrider aware — cautious contact made', 'evidence', `shelk-windrider-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Lyara Dawnlight filed three formal objections. All stamped received. None answered.",
    tags: ['NPC', 'Lore', 'Religion', 'Stage2', 'Meaningful'],
    xpReward: 78,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(78, 'consulting High Priestess on ritual routes');
      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));
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
    label: "A Warden Order representative is waiting at the inn. The assessment has already begun.",
    tags: ['Faction', 'Antagonist', 'Stage2', 'Meaningful'],
    xpReward: 85,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(85, 'first Warden Order contact');
      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      const arch = G.archetype && G.archetype.group;
      // Set rival on first encounter
      if (!G.rivalId) G.rivalId = 'warden_captain';
      if (result.isCrit) {
        G.worldClocks.rival = (G.worldClocks.rival||0) + 1;
        G.flags.stage2_faction_contact_made = true;
        G.lastResult = arch === 'stealth'
          ? `The representative's questions have a sequence — they're probing for what you have, not sharing what they know. You give them a partial truth and watch it move. Within an hour it's been passed to a superior without editing. The chain of command has a visible shape now, and you're somewhere on its map.`
          : `You give the representative enough to establish that you're operating with purpose, and hold enough back that the purpose stays yours. They leave without pressing further. The rival clock advances regardless. That was always going to happen.`;
        addJournal('Warden Order contact — productive first meeting', 'contact_made', `shelk-warden-contact-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.rival = (G.worldClocks.rival||0) + 2;
        G.factionHostility.warden_order = (G.factionHostility.warden_order||0) + 2;
        G.lastResult = `The meeting breaks down at the third question. Something you say — the phrasing, the hesitation — reads to the representative as concealment. They straighten in their chair and stop asking questions. They leave with a formal note already half-written. The Warden Order's posture toward you has shifted: not unaffiliated, not neutral. A risk to be managed.`;
        addJournal('Warden Order now treating player as risk', 'complication', `shelk-warden-hostile-${G.dayCount}`);
      } else {
        G.worldClocks.rival = (G.worldClocks.rival||0) + 1;
        G.lastResult = `The meeting ends without commitment from either side. The representative thanks you for your time in the register tone of someone completing an administrative task. You've been assessed. What the assessment produced stays on their side of the table.`;
        addJournal('Warden Order assessment — neutral', 'contact_made', `shelk-warden-neutral-${G.dayCount}`);
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
        addJournal('Warden enrollment accepted — archive access gained', 'contact_made', `shelk-warden-join-${G.dayCount}`);
      } else {
        G.flags.warden_invitation_seen = true;
        G.lastResult = `You decline for now. The recruiter writes "pending consideration" in the intake log, which is a Roadwarden courtesy phrase that means the offer expires when their patience does. The door stays open. That's a resource you've chosen to hold rather than spend.`;
        addJournal('Warden invitation deferred', 'contact_made', `shelk-warden-defer-${G.dayCount}`);
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
      const arch = G.archetype && G.archetype.group;
      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));
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
    label: "Verdant Row runs on three handshake protocols. Getting the sequence wrong has a cost.",
    tags: ['Personal', 'Stealth', 'Stage2', 'Meaningful'],
    xpReward: 82,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(82, 'learning Verdant Row information protocols');
      const arch = G.archetype && G.archetype.group;
      const result = rollD20('finesse', (G.skills.stealth || 0) + Math.floor(G.level / 3));
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
    label: "Elowen's audit needs a facilitator. The revenue gaps point the same direction.",
    tags: ['Personal', 'Support', 'Stage2', 'Meaningful'],
    xpReward: 80,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(80, 'facilitating guild audit');
      const arch = G.archetype && G.archetype.group;
      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 2));
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
    label: "Aelra kept a private log in her room ledger margin. Two months. Her own cipher.",
    tags: ['NPC', 'Lore', 'Stage2', 'Meaningful'],
    xpReward: 76,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(76, 'accessing innkeeper log');
      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.isCrit) {
        G.flags.innkeeper_log = true;
        G.investigationProgress++;
        G.lastResult = `Aelra's log is written in the margin of her room ledger in a private cipher she doesn't explain. She translates it herself, reading aloud without looking at you. Twelve guests over two months. Three of them arrived within twenty-four hours of each other on three separate occasions — different names, same rooms, same exit sequence, same departure hour. The coordination is visible in the repetition. Whoever planned it was careful enough to use different names and not careful enough to change the rooms.`;
        addJournal('Innkeeper log — coordinated guest pattern confirmed', 'evidence', `shelk-inn-log-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Why you need the guest log — the question arrives before the ledger moves. The answer comes out too direct, reads as a demand rather than a request, names something that hasn't been said aloud yet. An expression closes. The ledger gets covered with a forearm: no records of that kind. Coal smoke and old wood fill the silence. That door is closed.`;
        drawSocialMisstep(G.location);
        addJournal('Innkeeper log refused — relationship burned', 'complication', `shelk-inn-log-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.lastResult = `Two months of entries come across with several pages folded back — the fold is deliberate, not accidental. What's visible confirms unusual guest coordination: shared timing, shared rooms, inconsistent names. The folded sections are where the record gets specific. This isn't a refusal to help. It's a choice about what help looks like.`;
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
      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.isCrit) {
        G.investigationProgress++;
        G.lastResult = `The scorch patterns don't radiate from a center — they lean. The damage is heavier on the northwest-facing surfaces of every stall that burned. The surge was channeled in from outside the market, not generated within it. Northwest means the archival quarter. Channeling a surge requires working knowledge of the city's underground glyph grid — the kind of knowledge that's held by fewer than a dozen people with active registry credentials. The figure at the far table has not ordered anything in two hours. Red Hood does not announce itself. It simply notes where you are.`;
        addJournal('Glyph surge directed — northwest origin confirmed', 'evidence', `shelk-glyph-read-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
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
    label: "The patrol leader has sealed records access. The property dispute is leverage on both sides.",
    tags: ['Survival', 'Faction', 'Stage2', 'Meaningful'],
    xpReward: 78,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(78, 'evaluating patrol leader arrangement');
      const result = rollD20('vigor', (G.skills.survival || 0) + Math.floor(G.level / 3));
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
    label: "The operation's shape is clear. The name at the top is one link away.",
    tags: ['Investigation', 'Advanced', 'Stage2', 'Consequence', 'Meaningful'],
    xpReward: 95,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(95, 'tracing to operation authorization');
      if ((G.investigationProgress) < 6) {
        G.lastResult = `The evidence on the table points in a direction but doesn't reach the origin. The authorization chain requires more links before the terminal point becomes visible. The shape of the operation is clear. The name at the top is not.`;
        G.recentOutcomeType = 'investigate'; maybeStageAdvance(); return;
      }
      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 2));
      if (result.isCrit) {
        G.investigationProgress += 2;
        if (G.investigationProgress >= 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.flags.stage2_origin_confirmed = true;
        G.lastResult = `The trail runs from the chapel letter network to a sealed contract in the guild archive to a deputy desk in the noble quarter records office — and ends at a formal request filed under a House Shelk subsidiary charter, dated six months ago. The operation isn't recent. It was structured, registered, and protected from the start. Someone with working knowledge of charter law built the cover before the first letter moved.`;
        addJournal('Operation authorization confirmed — institutional protection identified', 'evidence', `shelk-auth-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `The trail runs into a wall at the third link: an intermediary layer with no registry anchor, no charter citation, no named officer. The absence is too clean. Someone built a dead end here on purpose — a gap that produces no trail and absorbs inquiry. This is not a private scheme that got careful. It's an operation with counter-surveillance structure built in from the start.`;
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
      var roll = rollD20('charm', G.skills.persuasion);
      if (roll.total >= 13) {
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
    label: "The sub-level seal archive dates don't match what was filed above.",
    tags: ['stage2', 'shelkopolis'],
    xpReward: 30,
    fn: function() {
      advanceTime(1);
      var roll = rollD20('wits', G.skills.lore);
      if (roll.total >= 13) {
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
    label: "The House Shelk token marks the wrong quarter. The room has already clocked it.",
    tags: ['stage2', 'shelkopolis'],
    xpReward: 30,
    fn: function() {
      advanceTime(1);
      var roll = rollD20('finesse', G.skills.stealth);
      if (roll.total >= 13) {
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

  // ── NEW INVESTIGATION BEATS (Oversight Collegium arc — 8 fresh angles) ───────

  {
    label: "The Panim mediator's courier arrived three days ago and has not left Shelkopolis.",
    tags: ['Stage2', 'NPC', 'Investigation'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'tracking the Panim mediator courier');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.isCrit) {
        G.flags.panim_courier_located = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        G.lastResult = `The courier is staying at a boarding house near the civic records quarter — not the Ironspool district, where a trade courier would normally lodge. He has been visiting the Registry twice daily, carrying nothing out either time. When you approach at the corner of the lane he stops and names the Panim Deputy Civic Underwriter's office without being asked, the way someone names a thing they've been holding as leverage and have decided to spend. He wants out of the arrangement he was sent here to complete. He has one document he hasn't delivered yet: a conditional co-sign endorsement that makes the charter amendment's Panim authorization conditional on a second party's approval. That second party is not named in the amendment text.`;
        addJournal('Panim courier located — undelivered conditional co-sign endorsement; anonymous second approval required', 'evidence', `shelk-panim-courier-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 2;
        G.lastResult = `The boarding house registers you in its visitor log before allowing you to inquire about current guests. The courier's room number is not shared. The house manager sends a note up and waits. The response comes down as a sealed slip: no meeting, no name given, and a Panim trade authority mark pressed into the wax that carries consular weight. The visitor log with your name in it will be available for review by any Roadwarden conducting a trade inquiry in this district. The courier stays unreachable.`;
        addJournal('Panim courier — consular protection invoked, visitor log entry made', 'complication', `shelk-panim-courier-fail-${G.dayCount}`);
      } else {
        G.flags.panim_courier_located = true;
        G.investigationProgress++;
        G.lastResult = `The courier agrees to a brief exchange in the boarding house common room. He confirms he carries a Panim co-sign document and that delivery has been delayed pending instructions from his principal. He does not name the principal. When you describe the charter amendment, his jaw tightens once and then releases. He says: "The co-sign is conditional. I was not told the condition until I arrived here." He finishes his tea and goes back upstairs.`;
        addJournal('Panim courier confirms conditional co-sign — condition disclosed after arrival, principal unnamed', 'intelligence', `shelk-panim-courier-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Forren Dass signs off the south dock rotation thirty minutes early. Every time. Without fail.",
    tags: ['Stage2', 'Investigation', 'Stealth'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'surveilling Roadwarden aide Forren Dass at the south dock');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('finesse', (G.skills.stealth || 0) + Math.floor(G.level / 3));
      if (result.isCrit) {
        G.flags.forren_dass_movement_mapped = true;
        G.investigationProgress++;
        G.lastResult = `Dass signs off the rotation log at the third bell minus thirty — a variance he's maintained for eleven months without a supervisor flag, which means the supervisor knows. He walks the south lane to a storage factor's office that carries no Ironspool signage, enters through the side door, and is out in under four minutes. You are in position at the alley junction when he exits. He carries nothing in. He carries a folded receipt out. The storage factor's office trade registration is four years old and lists a principal who died two years after it was filed. The office is running on a dead man's charter.`;
        addJournal('Forren Dass early sign-off maps to dead-charter storage office — receipt transfer confirmed', 'evidence', `shelk-forren-dass-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
        G.lastResult = `Dass clocks you on the second pass through the south lane. He doesn't break stride, doesn't signal anyone, doesn't change his route. He simply doesn't go to the storage factor's office. He completes his full rotation log, signs off at the correct time for the first recorded instance in eleven months, and walks toward the Roadwarden barracks without looking back. The pattern is broken. It will resume when his tail is gone. That means the next window is after you've moved on.`;
        addJournal('Forren Dass — surveillance detected, pattern broken for this window', 'complication', `shelk-forren-dass-fail-${G.dayCount}`);
      } else {
        G.flags.forren_dass_movement_mapped = true;
        G.investigationProgress++;
        G.lastResult = `Dass's early sign-off is consistent to the minute — thirty minutes before the posted end of rotation, logged under a discretionary relief clause the Roadwardens extend to overnight aides. The clause is legitimate. What it covers is a thirty-minute window where no oversight applies. You follow him two lanes south before losing the angle at a covered market junction. The destination is somewhere in the factor district. The route is established.`;
        addJournal('Forren Dass early sign-off confirmed — route toward factor district, destination not yet reached', 'intelligence', `shelk-forren-dass-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The Director of Civic Charter Integrity has a physical office. It appears in no directory.",
    tags: ['Stage2', 'Investigation', 'Lore'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'locating the unpublished Director of Civic Charter Integrity office');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.isCrit) {
        G.flags.charter_integrity_office_located = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        G.lastResult = `City maintenance records route a heating coal delivery to a Collegium annex building that does not appear in the civic directory — the delivery is logged under a room number the directory omits entirely. You find the building: a narrow three-story structure wedged between the civic records chamber and the guild mediation hall, its entrance set back from the lane by four feet and unmarked. The nameplate slot beside the door is present but empty. Inside the slot, still visible against the backing: the adhesive shadow of removed letters, long enough for a two-line title. The coal delivery log names the recipient: D.C.C.I. The office exists. It operates. It signs suppression orders. Nobody in the published record is supposed to know where it is.`;
        addJournal('Director of Civic Charter Integrity office located — unmarked annex, nameplate removed, coal deliveries ongoing', 'evidence', `shelk-dcci-office-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
        G.lastResult = `The maintenance ledger is filed correctly in the public utilities archive, but the entry you need — a coal delivery to the Collegium annex wing — has been amended. The original recipient line is struck through and replaced with a generic entry: Collegium Administrative Services. The amendment is dated two days ago. Someone checked the maintenance record after Orveth's fourth case surfaced and cleaned the trail before it became a trail.`;
        addJournal('DCCI coal delivery record amended two days ago — trail cleaned preemptively', 'complication', `shelk-dcci-office-fail-${G.dayCount}`);
      } else {
        G.flags.charter_integrity_office_located = true;
        G.investigationProgress++;
        G.lastResult = `The maintenance record gives you a building address but not a room. The address resolves to a Collegium annex structure that is listed in the city's property register under a forty-year-old civic preservation designation — a designation that exempts it from the standard directory update cycle. The building is real. The exemption is what keeps it out of the published civic directory. Someone chose that building for a reason.`;
        addJournal('DCCI annex building address confirmed — directory exemption via historic preservation classification', 'intelligence', `shelk-dcci-office-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Two names from suppressed docket complaints still in the city. Both went quiet the same week.",
    tags: ['Stage2', 'Investigation', 'Survival'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'locating suppressed docket complainants still in Shelkopolis');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('vigor', (G.skills.survival || 0) + Math.floor(G.level / 3));
      if (result.isCrit) {
        G.flags.suppressed_complainants_found = true;
        G.investigationProgress++;
        G.lastResult = `Both names are still in the city. The first — a south-market stall operator named Erren Volsch — receives you in his back room and speaks without preamble: he filed a complaint about supply route interference and received, three days later, an unannounced visit from a Roadwarden aide he did not recognize. The aide left a single document: a trade penalty notice citing a procedural infraction that Volsch cannot locate in any code book. He paid it. The second complainant, a manifest clerk named Dura Wess, confirms the same pattern — complaint filed, penalty notice arrived, case went quiet. The penalty notices carry different infraction codes but the same issuing officer stamp. The stamp is Forren Dass.`;
        addJournal('Two suppressed complainants: penalty notices issued by Forren Dass after filing — same intimidation pattern, different codes', 'evidence', `shelk-complainants-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
        G.lastResult = `Erren Volsch opens his back room door, looks at you for three seconds, and closes it. The sound of a bolt going home follows. Dura Wess is not at her registered address. Her neighbor says she moved her work materials out last week and did not say where. Both complainants had their cases suppressed. They've been living with the awareness that whoever suppressed the cases knows who they are. They were not going to talk to a stranger who arrived without a name they recognized.`;
        addJournal('Suppressed complainants unreachable — both in active avoidance, one relocated', 'complication', `shelk-complainants-fail-${G.dayCount}`);
      } else {
        G.flags.suppressed_complainants_found = true;
        G.investigationProgress++;
        G.lastResult = `Erren Volsch agrees to talk but keeps the conversation to two minutes. He confirms he filed a complaint, received a penalty notice shortly after, and chose not to pursue the matter further. He will not name who delivered the penalty notice. When you describe a Roadwarden aide with an overnight south dock rotation, he looks at the wall behind you for a moment before saying: "I don't know the name." The pause before the denial carries the name inside it.`;
        addJournal('Suppressed complainant Volsch confirms penalty notice — aide identity withheld under duress', 'intelligence', `shelk-complainants-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The charter amendment's ratification window closes in five days. The Panim co-sign is the brake.",
    tags: ['Stage2', 'Faction', 'Investigation'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'assessing the charter amendment ratification deadline');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.isCrit) {
        G.flags.amendment_deadline_known = true;
        G.flags.amendment_panim_brake_confirmed = true;
        G.investigationProgress++;
        G.lastResult = `The Collegium procedural secretary receives you because you carry Inquisitor Orveth's informal endorsement — a single sentence written on his card. She confirms the ratification window: five days from the current date, after which the amendment lapses and must be re-submitted through full committee review, a process of four to six months. The Panim co-sign is the only missing element. She lowers her voice when she names who holds the Panim authorization block: not the courier, not the Deputy Underwriter — a Panim senior mediator named Odel Farris who has not responded to two formal requests. Farris has seen the conditional clause and is waiting for the condition to be met. The condition is not in the amendment text.`;
        addJournal('Amendment lapses in 5 days — Panim senior mediator Odel Farris holds co-sign, condition unnamed in amendment text', 'evidence', `shelk-deadline-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
        G.lastResult = `The Collegium procedural office is staffed by two clerks, neither of whom acknowledges amendment timelines as a subject for external inquiry. One of them sets a form on the counter: a request for procedural information, requiring a charter standing citation to process. You do not have standing. Your name goes into the inquiry log as a matter of standard procedure. The log is reviewed by the Collegium administrative Arbiter every three days.`;
        addJournal('Collegium procedural inquiry refused — name in review log', 'complication', `shelk-deadline-fail-${G.dayCount}`);
      } else {
        G.flags.amendment_deadline_known = true;
        G.investigationProgress++;
        G.lastResult = `The Collegium's posted procedural schedule lists charter amendment ratification windows in the public notice column. The current amendment's window is marked with a notation you've seen once before in the cross-polity suppression order records: a blue ink bracket around the deadline date. The bracket is a Collegium administrative convention for active high-priority tracking. Someone inside the Collegium is watching this deadline closely enough to mark it by hand.`;
        addJournal('Amendment deadline confirmed via public notice — blue ink priority bracket added by hand', 'intelligence', `shelk-deadline-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "A maintenance node in the archival quarter. The channel ran through it.",
    tags: ['Stage2', 'Investigation', 'Craft'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'tracing the glyph surge channel through the maintenance node');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('spirit', (G.skills.craft || 0) + Math.floor(G.level / 3));
      if (result.isCrit) {
        G.flags.surge_channel_node_confirmed = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        G.lastResult = `The maintenance node is a brass-capped junction box set into the archival quarter's west retaining wall — the kind of infrastructure point that appears in city schematics but not in any walkable directory. The wax seal on the inspection cap has been replaced recently: the original seal was fired clay, the replacement is pressed wax over a different backing compound, and it's been set with a tool that left a faint spiral mark the original installation wouldn't have made. Inside, the routing plate has been repositioned ninety degrees off its grounded orientation — the position required to channel a surge outward rather than contain it. Someone with working knowledge of Shelkopolis ward grid infrastructure made this modification. That is a credential-gated skill. The registry of persons holding it has fewer than fourteen entries.`;
        addJournal('Ward maintenance node modified — routing plate repositioned for outward surge channeling, fourteen credentialed persons in registry', 'evidence', `shelk-node-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
        G.lastResult = `The maintenance node is in a bonded access zone managed by the city's ward infrastructure office. Entry without a maintenance certification produces a formal infraction notice — the kind that goes to the Roadwarden records desk and flags your name for any subsequent access inquiry in that district. You get close enough to see the inspection cap is sealed and recent. That is all you get.`;
        addJournal('Ward node access refused — infraction notice issued, name flagged with Roadwardens', 'complication', `shelk-node-fail-${G.dayCount}`);
      } else {
        G.flags.surge_channel_node_confirmed = true;
        G.investigationProgress++;
        G.lastResult = `The inspection cap on the maintenance node has been resealed recently — the wax compound doesn't match the surrounding infrastructure's original material. You can't open it without a maintenance certification, but the cap itself tells you something was done here after the last official inspection. The city's ward maintenance schedule logs its last visit to this node as fourteen months ago. The fresh seal is newer than fourteen months.`;
        addJournal('Ward maintenance node resealed post-last-inspection — unauthorized access confirmed, contents inaccessible', 'intelligence', `shelk-node-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The shell subsidiary's founding signatory died eighteen months after filing. The proxy name still draws.",
    tags: ['Stage2', 'Investigation', 'Lore'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'tracing the dead-proxy shell subsidiary authorization chain');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.isCrit) {
        G.flags.shell_proxy_chain_confirmed = true;
        G.investigationProgress++;
        G.lastResult = `The founding signatory's estate was settled through probate two years ago and carries no active trading authorization — his registry standing was formally retired at the time of settlement. The subsidiary, however, continues drawing against a commercial credit line issued under his name, which means someone is making authorized signatory representations on behalf of a dead man's estate. Doing so requires either a fraudulent estate proxy or a living co-signatory whose name was added to the charter after the original filing. You find the co-signatory addendum, filed four months after the original charter and one week after the founding signatory's death: a name entered in a different ink from the original document. The name is a Shelkopolis notarial office — the same office that certified the cross-polity suppression order.`;
        addJournal('Shell subsidiary co-signatory addendum: Shelkopolis notarial office — same office certified cross-polity suppression order', 'evidence', `shelk-proxy-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
        G.lastResult = `The probate records for the founding signatory's estate are held in the civil succession archive, which requires a family standing petition or a magistrate's review order to access. Neither is available on the current day. The archive clerk notes your name and your stated purpose in the request queue. Succession records inquiries are shared with the estate's registered notarial office as a courtesy notification. That office will receive a summary of this request within two business days.`;
        addJournal('Probate record access refused — notarial office courtesy notification will be sent', 'complication', `shelk-proxy-fail-${G.dayCount}`);
      } else {
        G.flags.shell_proxy_chain_confirmed = true;
        G.investigationProgress++;
        G.lastResult = `The probate settlement is a matter of civic record. The founding signatory is deceased, his registry standing retired. What's less clear is how the subsidiary continues operating under his charter authorization: the registry should have flagged the standing retirement. You pull the subsidiary's current registry entry and find the flag present — marked, noted, and then cleared under an administrative override notation with no citing authority. The override is what's keeping the subsidiary alive. Someone cleared the flag on purpose.`;
        addJournal('Shell subsidiary registry flag cleared by administrative override — citing authority absent', 'intelligence', `shelk-proxy-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The replacement night foreman was transferred in from Panim six weeks ago.",
    tags: ['Stage2', 'Investigation', 'Survival'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'tracing the Ironspool factor Panim transfer record');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('vigor', (G.skills.survival || 0) + Math.floor(G.level / 3));
      if (result.isCrit) {
        G.flags.ironspool_factor_panim_link = true;
        G.investigationProgress++;
        G.lastResult = `The Ironspool transfer record is public — trade company personnel movements file with the guild commerce registry. The factor arrived six weeks ago from the Panim Mediation Oversight commercial affiliate office, listed under a standard operational secondment. The timing is five days after the cross-polity suppression order was co-signed. The factor's previous role at the Panim affiliate was Commercial Liaison to Civic Charter Administration — a role whose responsibilities include coordinating with Collegium-adjacent offices on trade authorization matters. He was placed at Ironspool specifically over the south dock operations. The foreman who knew the bypass crates by name was moved to a warehouse interior role the same week the transfer was finalized.`;
        addJournal('Ironspool factor: Panim affiliate — charter admin liaison background; placed over south dock same week foreman sidelined', 'evidence', `shelk-factor-panim-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
        G.lastResult = `The guild commerce registry clerk pulls the transfer file and begins reading out the summary. Two sentences in, a senior clerk at the adjacent desk stands and crosses the floor to look at the record. The senior clerk takes the file without explanation and returns to his desk. The junior clerk says: "That record is under an active trade inquiry hold." The hold was placed this morning. The transfer record is visible to whoever monitors new inquiry holds — which is, at minimum, the person who placed this one.`;
        addJournal('Ironspool factor transfer record placed under inquiry hold this morning — access sealed', 'complication', `shelk-factor-panim-fail-${G.dayCount}`);
      } else {
        G.flags.ironspool_factor_panim_link = true;
        G.investigationProgress++;
        G.lastResult = `The transfer record confirms a Panim origin and a six-week-old arrival date. The factor's previous posting is listed as a Panim commercial affiliate — a vague classification that covers several types of institutional relationship. The previous role description is a single line: Trade Coordination. The timing of his arrival relative to the suppression order is visible in the dates. The connection between the two events is probable, not yet documentable.`;
        addJournal('Ironspool factor Panim transfer confirmed — timing aligns with suppression order, prior role vaguely described', 'intelligence', `shelk-factor-panim-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
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
      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 2));
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

  // ── SHADOWHANDS FACTION CONTACT PLOT (3-beat sequence) ────────────

  // BEAT 1 — Hook
  {
    label: "The ward mark on the bathhouse door is Roazian.",
    tags: ['Shadowhands', 'Stage2', 'Faction'],
    xpReward: 60,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(60, 'reading the altered Ironspool ward mark');
      G.flags.stage2_faction_shadowhands_aware = true;
      G.lastResult = 'The ward mark at the bathhouse side door is chalked fresh. The standard Shelkopolis ward uses a closed triangle at the base. This one leaves the base open and continues the line into a small second curl that returns across itself. The curl is Roazian. Nobody working a legitimate Shelk route would use that variant where a Roadwarden could walk past it. The chalk has the wet look of a mark laid within the last hour. A boy with a tea-stained apron is sitting on the step across the lane. He is not drinking tea. He is watching who stops to read the door.';
      addJournal('Ironspool bathhouse door — Roazian-variant ward mark laid fresh, watcher stationed across the lane', 'intelligence', `shelk-shadow-aware-${G.dayCount}`);
      G.recentOutcomeType = 'investigate';
    }
  },

  // BEAT 2 — Commitment
  {
    label: "Return after the curl dries. Whoever wrote it wants a reader, not a passerby.",
    tags: ['Shadowhands', 'Stage2', 'Faction', 'NPC'],
    xpReward: 72,
    fn: function() {
      if (!G.flags.stage2_faction_shadowhands_aware) {
        G.lastResult = 'Nothing to act on with the contact yet.';
        G.recentOutcomeType = 'locked'; return;
      }
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'making the Shadowhands intake contact');
      G.flags.met_kess_the_crossing = true;
      G.flags.stage2_faction_shadowhands_contacted = true;
      G.lastResult = 'The boy leads you two lanes over to a back room behind a dye works. The woman waiting is short, middle years, with a working hand bandaged at the knuckle and the other hand bare. She introduces herself only as Kess the Crossing. Her register is Roazian border-trader — clipped consonants, no honorifics, a habit of naming the weather as a greeting. Her tell is that she keeps her bare hand flat on the tabletop the whole conversation, palm down, fingers spread. She does not trust her hand out of sight. She needs a manifest page — the Ironspool south-dock night-shift ledger from a specific day two weeks ago. Not copied. Removed. The Shadowhands will replace it with a forgery good enough to pass a Roadwarden count.';
      addJournal('Met Kess the Crossing (Shadowhands intake) — wants Ironspool south-dock night-shift ledger page removed; Shadowhands will substitute forgery', 'contact_made', `shelk-shadow-contacted-${G.dayCount}`);
      G.recentOutcomeType = 'investigate';
    }
  },

  // BEAT 3 — Payoff
  {
    label: "The night-shift turnover is the only window where the ledger sits unattended.",
    tags: ['Shadowhands', 'Stage2', 'Faction', 'Payoff'],
    xpReward: 90,
    fn: function() {
      if (!G.flags.stage2_faction_shadowhands_contacted) {
        G.lastResult = 'Kess hasn\'t indicated the next step.';
        G.recentOutcomeType = 'locked'; return;
      }
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(90, 'delivering the lifted ledger page');
      G.flags.stage2_faction_shadowhands = true;
      G.flags.stage2_faction_contact_made = true;
      G.investigationProgress = (G.investigationProgress||0) + 2;
      G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
      var tension = '';
      if (G.flags.stage2_faction_collegium) {
        tension = ' Kess closes the folio halfway through and looks up. "Your boots carry chalk dust from the Arbiter alcove runner. That alcove has had an outside audit chair since last rotation. I will still give you what I said I would. But what I give will be what a Collegium filer can hear without it costing us a cell."';
      }
      G.lastResult = 'Kess reads the page twice before she speaks. Her palm stays flat. "The night-shift ledger was forged before your copy was made. Three different hands logged the same three containers under three different freight codes across three shifts — same crate weight, same seal number, three paperwork lives. The Shadowhands have been tracking the third-code variant across six ports. It is not a shipping scheme. It is a paper screen built to hide where one specific cargo actually goes. Your page is the first one we have that names the origin officer. Not the receiver. The origin." She gives you a folded strip of rice paper with a single Roazian cipher on it. "If you are in a room and you need out, set this down where it can be seen. Someone will move."' + tension;
      addJournal('Shadowhands intel: ledger forgery revealed three-code freight screen across six ports — cargo origin officer named for the first time', 'evidence', `shelk-shadow-payoff-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // ── STAGE 2 DEEPENING: INSTITUTIONAL COORDINATION + NAMED NPC UNDER PRESSURE ──

  {
    label: "The cross-polity drawer holds three seals on one order.",
    tags: ['Investigation', 'Stage2', 'Lore'],
    xpReward: 88,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(88, 'cross-polity suppression order');
      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.isCrit) {
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.flags.shelk_cross_polity_order_confirmed = true;
        G.lastResult = `The drawer is a long brass cabinet the Registry keeps behind the audit chair's station — manifests that cross polity lines file here before the city registers them. The suppression order is two sheets deep: wax seals from House Shelk, the Panim mediation oversight tier, and a Sunspire civic underwriter stamped in the same week. The language is identical across all three. The same scribe drafted them — you can tell from the way the flourish on the freight-class number breaks to the left. Three polities closing the same doorway. The coordination is not local.`;
        addJournal('Cross-polity suppression order — Shelk/Panim/Sunspire co-signed, single drafting hand', 'evidence', `shelk-xpolity-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `The drawer is closed when you reach it. A junior clerk at the station glances at your permit and calls the audit chair over without raising his voice. The chair listens to your stated purpose with careful neutrality and then asks which charter authorized your inquiry. You do not have one. She writes your name in a small bound register and returns your permit without comment. The Registry now has a record of who came looking.`;
        addJournal('Registry drawer access refused — name logged by audit chair', 'complication', `shelk-xpolity-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.lastResult = `You read the drawer's index sheet over the shoulder of a clerk filing late returns. The cross-polity manifest references are listed by number only — no seal descriptions, no drafting notation. The index confirms the order exists and touches more than one polity's seal. It does not let you count how many, and it does not tell you whose hand drafted it.`;
        addJournal('Cross-polity manifest index confirmed — scope and authorship withheld', 'evidence', `shelk-xpolity-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // ── NEW INVESTIGATION BEATS (Oversight Collegium / suppressed names) ──────

  {
    label: "The Collegium arbiter's docket skips three names. The gap is deliberate.",
    tags: ['Stage2', 'Investigation', 'Lore'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'reading the Oversight Collegium arbiter docket');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.isCrit) {
        G.flags.collegium_docket_gap_confirmed = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        G.lastResult = `The Collegium's open docket runs in continuous reference numbering. You count the entries against the sequence: 7, 8, 9, then 13. Four cases removed from the public record, their numbers surviving only as blank rows in the binding margin. The blank rows carry the same wax-seal imprint used for Collegium emergency suppression — a seal that requires two Arbiter signatures and a civic underwriter co-sign. This wasn't administrative error. Someone pulled these with full procedural authority and knew exactly which numbers would be missed last.`;
        addJournal('Collegium docket — four entries suppressed under emergency seal, three-signature process confirmed', 'evidence', `shelk-docket-gap-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
        G.lastResult = `The reading room attendant asks to see your access authorization before the docket reaches the table. What you carry covers registry cross-reference, not active arbiter records. She is polite and exact. Your name goes into the request log — a log that the Collegium Arbiter's office reviews each week as part of its standard oversight cycle. The door is closed correctly and without hostility, which is worse than if it had been slammed.`;
        addJournal('Collegium docket request refused — name entered in review log', 'complication', `shelk-docket-fail-${G.dayCount}`);
      } else {
        G.flags.collegium_docket_gap_confirmed = true;
        G.investigationProgress++;
        G.lastResult = `The sequence break is visible to anyone who counts: reference numbers 10 through 12 are absent from the public docket without notation. The standard format requires a suppression marker at the gap — a bracketed dash, per Collegium procedure. There is no dash. The absence of the marker means whoever pulled these didn't want the suppression itself on record. The gap was hidden inside a procedure designed to display gaps.`;
        addJournal('Collegium docket — suppression markers absent, removal concealed within procedure', 'evidence', `shelk-docket-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Inquisitor Orveth conducts his reviews at the same tavern table every third day.",
    tags: ['Stage2', 'NPC', 'Investigation'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'approaching Inquisitor Orveth at the Stoat and Wax');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.isCrit) {
        G.flags.met_inquisitor_orveth = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        G.lastResult = `Orveth conducts his reviews in public on purpose: he keeps a tavern table so that anyone approaching him can be explained as casual. His tell is that his left thumb moves to the inside edge of whatever document he's reading whenever something in the conversation surprises him — a habit he appears unaware of. When you describe the docket gap, the thumb moves. He names the suppressed cases without being asked. Two are trade fraud complaints. The third is a formal objection to a charter amendment that would give the Oversight Collegium emergency appointment authority over its own arbiters. The fourth he does not name. He closes his folder over that one specifically.`;
        addJournal('Inquisitor Orveth — three of four suppressed cases named; fourth withheld; charter amendment objection confirmed', 'evidence', `shelk-orveth-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 2;
        G.lastResult = `You reach the table at the wrong interval — Orveth has a companion already seated, a Collegium liaison you don't recognize who watches your approach with a registry clerk's patience. Orveth receives you briefly and formally. The companion writes nothing down and does not look away. The exchange lasts under two minutes and produces nothing except a clear record that someone came looking for the Inquisitor outside official channels. The companion is still at the table when you leave.`;
        addJournal('Orveth approach observed by Collegium liaison — no information gained', 'complication', `shelk-orveth-fail-${G.dayCount}`);
      } else {
        G.flags.met_inquisitor_orveth = true;
        G.investigationProgress++;
        G.lastResult = `Orveth acknowledges the docket gap without confirming specifics. He says: "There are reviews that require a different kind of patience than the ones that produce reports." His thumb finds the folder edge and stays there. He is not refusing to help. He is establishing conditions for what help looks like — conditions he hasn't named yet, which means the conversation is an opening, not a door.`;
        addJournal('Orveth aware of docket gap — conditions for cooperation not yet stated', 'intelligence', `shelk-orveth-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The Ironspool night foreman knows whose crates skip the Collegium intake check.",
    tags: ['Stage2', 'Investigation', 'Survival'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'pressing the Ironspool night foreman for intake bypass detail');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('vigor', (G.skills.survival || 0) + Math.floor(G.level / 3));
      if (result.isCrit) {
        G.flags.ironspool_intake_bypass_named = true;
        G.investigationProgress++;
        G.lastResult = `The foreman works the south dock from the third bell through dawn because no Collegium inspector covers that window — a staffing gap that has existed for eleven months. He lists the bypass crates from memory: three weights, two freight codes, always the same origin seal, always cleared by the same overnight Roadwarden aide who works that rotation exclusively. The aide's name is Forren Dass. The foreman says the name the way someone says a thing they've been holding for a long time and are glad to be rid of.`;
        addJournal('Ironspool south dock — bypass crates named, Roadwarden aide Forren Dass identified as intake clearance officer', 'evidence', `shelk-foreman-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
        G.lastResult = `The foreman listens and then calls one of his dock runners over, which is not a good sign. The runner is sent somewhere. Five minutes later a senior Ironspool factor arrives and conducts the rest of the conversation in place of the foreman, who finds work at the far end of the dock and does not return. The factor's responses are complete, unhelpful, and noted in his own ledger as he gives them. Your approach to the south dock is now on record with Ironspool management.`;
        addJournal('Ironspool approach escalated to senior factor — foreman removed from conversation', 'complication', `shelk-foreman-fail-${G.dayCount}`);
      } else {
        G.flags.ironspool_intake_bypass_named = true;
        G.investigationProgress++;
        G.lastResult = `The foreman confirms the bypass pattern without naming anyone attached to it. Three crate types, cleared fast, cleared at night. He says: "Not my check to make." The deflection has a specific shape: he knows whose responsibility it is and has decided that naming them is a different conversation than this one. He doesn't move away from the dock ledger while he's talking, which means he's already recorded this exchange somewhere for his own protection.`;
        addJournal('Ironspool south dock — bypass crates confirmed, responsible party deflected', 'intelligence', `shelk-foreman-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Three signatures from ratification. One belongs to someone who hasn't signed yet.",
    tags: ['Stage2', 'Investigation', 'Faction'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'tracing the Collegium charter amendment signature chain');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('finesse', (G.skills.stealth || 0) + Math.floor(G.level / 3));
      if (result.isCrit) {
        G.flags.collegium_amendment_signature_tracked = true;
        G.investigationProgress++;
        G.lastResult = `The amendment circulates in a courier envelope sealed with both the Collegium administrative mark and a House Shelk subsidiary stamp — two seals on one envelope, which is not standard. You get a look at the signature page during a ten-second window at a registry clerk's desk: two signatures affixed, a third line blank. The blank line carries a pre-printed title: Deputy Civic Underwriter, Panim Mediation Oversight. The amendment cannot ratify without a Panim co-sign. Whoever drafted it needs Panim's cooperation and doesn't have it yet. That gap is a lever.`;
        addJournal('Collegium amendment — Panim co-sign still absent; two signatures affixed; double-sealed with Shelk subsidiary stamp', 'evidence', `shelk-amendment-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 2;
        G.lastResult = `The courier envelope is handed off at the registry counter three desks from where you're standing. By the time you've moved to a better angle the handoff is complete and the envelope is already behind the counter partition. The clerk who received it looks up — not at you, at the space you just left. She marks something in her own ledger. The timing was off by thirty seconds and thirty seconds was enough to be noticed without seeing anything.`;
        addJournal('Amendment tracking attempt observed — no document access', 'complication', `shelk-amendment-fail-${G.dayCount}`);
      } else {
        G.flags.collegium_amendment_signature_tracked = true;
        G.investigationProgress++;
        G.lastResult = `The envelope title block is visible through a gap in the courier's grip as he waits at the desk: Collegium Charter Revision — Restricted Circulation. Two seals on the cover. The courier shifts his hold before the signature page becomes readable, but the cover alone confirms the amendment is still in active circulation. It hasn't ratified. The process is still moving, which means it can still be interrupted.`;
        addJournal('Collegium charter revision confirmed in active circulation — ratification not yet complete', 'intelligence', `shelk-amendment-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Orveth's sealed notes on the fourth case were filed separately. The location is inferrable.",
    tags: ['Stage2', 'Investigation', 'Lore'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'locating Inquisitor Orveth\'s sealed fourth-case notes');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.isCrit) {
        G.flags.orveth_fourth_case_notes_found = true;
        G.investigationProgress++;
        G.lastResult = `Collegium procedure routes sealed inquisitor notes to the Civic Repository sub-level when the associated case is suppressed — not the main archive, the sub-level, which uses a different index maintained by a different clerk. You find the sub-level index and the entry: Sealed Review File, Arbiter Division, no case number, one name. The name is not a person. It is an office: Director of Civic Charter Integrity. An office that does not appear in the Collegium's published organizational structure. An office that signed the emergency suppression of its own case.`;
        addJournal('Orveth fourth case — suppressed by Director of Civic Charter Integrity, an unpublished office; self-suppression confirmed', 'evidence', `shelk-fourth-case-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
        G.lastResult = `The Civic Repository sub-level requires a separate access notation that you don't hold. The sub-level attendant checks her authorized-access list while you wait. Your name is not on it. She offers to submit a formal access request on your behalf, which would be reviewed in seven to fourteen days. She begins writing the request form before you answer. The pending request will be visible to whoever monitors new sub-level access applications. That is everyone with a reason to watch.`;
        addJournal('Civic Repository sub-level access denied — pending request submitted and visible', 'complication', `shelk-fourth-case-fail-${G.dayCount}`);
      } else {
        G.flags.orveth_fourth_case_notes_found = true;
        G.investigationProgress++;
        G.lastResult = `The sub-level index entry exists: sealed, no case number, filed under a Collegium arbiter division designation you haven't seen before. The index gives you the shelf location but not the content. The shelf is accessible with standard registry credentials. What's on the shelf is a sealed envelope with a suppression stamp that requires two-arbiter sign-off to open legally. The envelope is there. Getting inside it is a different problem than finding it.`;
        addJournal('Orveth fourth case — located in sub-level, sealed envelope confirmed, two-arbiter sign-off required to open', 'intelligence', `shelk-fourth-case-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Lady Elowen's hand is steady on the cup. The other is not.",
    tags: ['NPC', 'Persuasion', 'Stage2'],
    xpReward: 84,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(84, 'Elowen pressure reveal');
      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.isCrit) {
        G.flags.met_elowen_shelk = true;
        G.flags.elowen_under_pressure = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `The loggia above the rose court, tea already poured — a gesture that fixes the duration of the audience. A right hand works a signet ring around the little finger, a slow quarter-turn and back, a quarter-turn and back. She speaks about fabric tariffs for six minutes. When you name the northern route she sets the cup down without the ring-turn breaking rhythm. "My cousin's son was married to the Panim mediator's niece eleven days ago. I was not told until after. I am being shown a shape, not asked for a vote." She names four families paying the same quiet courtesy call this month. The naming is itself a courtesy. She will not say it twice.`;
        addJournal('Elowen Shelk — forced marriage alliance tying Shelk to Panim; four families named', 'evidence', `shelk-elowen-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `The audience is conducted standing, which sets it at under a minute. The signet ring stays still. The first framing gets corrected mildly, the way a tutor corrects a student who has read the wrong chapter. "You have come to the wrong branch of the house. My cousin handles matters of that kind." The dismissal is gracious. It is also complete. The rose court gate closes before you reach the street.`;
        addJournal('Elowen declined audience — misdirected to cousin branch', 'complication', `shelk-elowen-fail-${G.dayCount}`);
      } else {
        G.flags.met_elowen_shelk = true;
        G.investigationProgress++;
        G.lastResult = `The tea cools untouched. The signet ring turns once, stops, and does not start again. "There are conversations I cannot have until a matter concludes. I am told it will conclude soon. I am told this by people who do not usually tell me things." No names offered. The admission of being told at all is the substance of what this audience will carry.`;
        addJournal('Elowen confirms institutional pressure — speakers unnamed', 'evidence', `shelk-elowen-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

];

// Sideplot injection — shelk-fairhaven ledger shadow rung2 hook
(function() {
  var _shadowRung2 = (typeof SHELK_FAIRHAVEN_LEDGER_SHADOW !== 'undefined') ? SHELK_FAIRHAVEN_LEDGER_SHADOW.rung2Hook() : null;
  if (_shadowRung2) SHELKOPOLIS_STAGE2_ENRICHED_CHOICES.push(_shadowRung2);
})();

window.SHELKOPOLIS_STAGE2_ENRICHED_CHOICES = SHELKOPOLIS_STAGE2_ENRICHED_CHOICES;
