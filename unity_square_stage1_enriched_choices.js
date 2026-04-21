/**
 * UNITY SQUARE STAGE 1 ENRICHED MEANINGFUL CHOICES
 * 20 investigation paths grounded in arbitration records and coordination hub irregularities
 * Unity Square: a central coordination hub where multiple parties' affairs are brokered — and where those records are being quietly altered
 * Named NPC: Vale Brokerwell (the senior arbiter whose legitimacy is in question)
 */

const UNITY_SQUARE_STAGE1_ENRICHED_CHOICES = [

  // 1. FIRST ENCOUNTER: VALE BROKERWELL
  {
    label: "Arrange a formal introduction to Vale Brokerwell — the senior arbiter whose coordination decisions have recently become controversial.",
    tags: ['Investigation', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'meeting Vale Brokerwell');
      if (!G.flags) G.flags = {};

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `Vale Brokerwell is smooth and practiced. Every sentence is carefully weighted. He receives you in his coordination office with a desk positioned so he can see the door. "Unity Square functions because parties trust the process," he says. "Questions about arbitration process undermine that trust." He's not hostile — he's measuring. He's been measured before and he knows how to return it. You learn more from what he doesn't say than what he does.`;
        G.flags.met_vale_brokerwell = true;
        addJournal('contact', 'Vale Brokerwell met: practiced, measured, deflects with process language — strategic opacity', `unity-vale-${G.dayCount}`);
      } else {
        G.lastResult = `Vale Brokerwell's schedule is full. Access through formal channels requires a registered party affiliation or a formal complaint number. You'll need an introduction route that bypasses his calendar control.`;
        G.flags.located_vale_brokerwell = true;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // 2. CLUE: ARBITRATION RECORD ALTERATION
  {
    label: "Compare the public arbitration summary register against three parties' private copies of their own case outcomes.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 74,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'cross-referencing arbitration records');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 13) {
        G.lastResult = `All three parties' private outcome summaries describe conditions not present in the public register. Two cases show public versions with favorable terms for institutional parties that the parties themselves dispute receiving. One case shows a private outcome that was entirely deleted from the public register — the case officially doesn't exist. The public arbitration record is being systematically altered after parties receive their private outcomes.`;
        if (!G.flags) G.flags = {};
        G.flags.found_arbitration_alteration = true;
        addJournal('investigation', 'Arbitration records: public register altered after private outcomes issued — institutional favoritism added, one case deleted entirely', `unity-records-${G.dayCount}`);
      } else {
        G.lastResult = `The comparison requires parties willing to share their private outcome documents. Most parties to recent arbitrations are cautious about discussing their cases with someone outside the process.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 3. CLUE: THE DELETED CASE
  {
    label: "Investigate the arbitration case that was deleted from the public register — find what it was about and why it disappeared.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 76,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(76, 'tracing deleted arbitration case');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      if (!G.flags) G.flags = {};
      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 14) {
        G.lastResult = `The deleted case was a coordination dispute between the Unity Square hub and a northern commercial bloc over routing access rights. The original outcome — from the private copy you've obtained — awarded the routing rights to the Unity Square hub on geographic and historical grounds. The public register deletion means the decision has no legal standing. The northern commercial bloc now uses those routes without the legal restriction the arbitration imposed. The deletion removed an obstacle to the bloc's operations.`;
        G.flags.investigated_deleted_case = true;
        addJournal('discovery', 'Deleted case: routing rights decision against northern commercial bloc removed — deletion removes legal obstacle to bloc\'s route use', `unity-deleted-case-${G.dayCount}`);
      } else if (result.total >= 11) {
        G.lastResult = `The deleted case involved a major routing rights dispute. The parties are reluctant to discuss it directly. You find evidence the case was significant but not the specific outcome or why it was deleted.`;
      } else {
        G.lastResult = `Without the private copy you're seeking, the deleted case leaves almost no trace. The deletion was professionally thorough.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 4. ARCHETYPE-GATED: READING UNITY SQUARE
  {
    label: "Walk the coordination hub's central plaza at the peak of daily business — read what the commercial activity tells you.",
    tags: ['Investigation', 'Archetype', 'Stage1', 'Meaningful'],
    xpReward: 67,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(67, 'reading coordination hub activity');
      const arch = G.archetype && G.archetype.group;

      if (arch === 'combat') {
        G.lastResult = `Three parties you recognize from the arbitration register are meeting in a corner of the plaza — not in a formal room, in the open. Deliberate: nothing said here is on record. They're conducting off-record coordination because they don't trust the on-record system. The hub is being used despite itself — people are doing their actual business around the arbitration process, not through it.`;
      } else if (arch === 'magic') {
        G.lastResult = `The information flow in the plaza follows a pattern. Knowledge of Vale Brokerwell's upcoming decisions circulates hours before those decisions are formally issued. Someone is leaking his schedule. Every party with advance notice adjusts their position before the public announcement. The arbitration process has a systematic leak that advantages certain parties over others.`;
      } else if (arch === 'stealth') {
        G.lastResult = `The plaza has six people who aren't transacting any business. They circulate and observe. Not security — they make no active interventions. They're documenting who meets whom, who speaks to whom, which parties' representatives are present at the hub on which days. Unity Square's coordination function is being used to map commercial relationships and alliances.`;
      } else {
        G.lastResult = `Small groups form, briefly exchange documents or cases, and disperse. The visual resembles normal business. But the documents exchanged in these brief clusters are formatted differently from standard commercial documents — more formal, sealed, not the informal notes of trade negotiation. These are legal instruments being distributed without going through the formal registration desk. Business is happening that isn't being recorded.`;
      }
      addJournal('investigation', 'Unity Square plaza: off-record coordination, advance leak of Brokerwell decisions, relationship mapping, unregistered legal instruments', `unity-plaza-read-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 5. INVESTIGATION: VALE BROKERWELL'S APPOINTMENT
  {
    label: "Research how Vale Brokerwell was appointed to the senior arbiter position — determine if the appointment process was legitimate.",
    tags: ['Investigation', 'Authority', 'Stage1', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'auditing Brokerwell\'s appointment');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 13) {
        G.lastResult = `Senior arbiter appointments require confirmation by three existing members of the Unity Square coordination council. Vale Brokerwell's appointment shows two confirming signatures and a third listed as "expedited confirmation — emergency succession protocol." Emergency succession applies when a senior arbiter dies or becomes incapacitated. Vale Brokerwell's predecessor retired. The emergency protocol was improperly invoked to bypass the full confirmation process. Brokerwell's appointment isn't technically invalid — but it was designed to circumvent standard verification.`;
        if (!G.flags) G.flags = {};
        G.flags.found_brokerwell_appointment_irregularity = true;
        addJournal('investigation', 'Brokerwell appointment: emergency succession protocol improperly invoked — bypassed third confirmation, predecessor retired not incapacitated', `unity-appointment-${G.dayCount}`);
      } else {
        G.lastResult = `Appointment records are archived but the relevant review and confirmation documentation requires access to the coordination council's sealed records.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 6. FACTION SEED: OVERSIGHT COLLEGIUM
  {
    label: "Report the arbitration record alterations to the Oversight Collegium's observer at Unity Square.",
    tags: ['Faction', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'making Oversight Collegium contact');
      if (!G.factionHostility) G.factionHostility = { warden_order: 0, iron_compact: 0, oversight_collegium: 0 };

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `Observer Nance Tarn has been at Unity Square for five months. "The Collegium has received two complaints about Unity Square arbitration record accuracy. Both were forwarded to the coordination council for self-review." The self-review was conducted and found no irregularities. "Self-review of a compromised record system produces a clean result regardless of the underlying problem." She wants the private outcome documents you've been gathering — they would allow the Collegium to conduct its own independent comparison rather than rely on the coordination council's review.`;
        if (!G.flags) G.flags = {};
        G.flags.met_oversight_collegium_unity = true;
        G.factionHostility.oversight_collegium += 1;
        addJournal('faction', 'Oversight Collegium observer Nance Tarn: previous complaints self-reviewed without finding — needs private outcome documents for independent comparison', `unity-collegium-${G.dayCount}`);
      } else {
        G.lastResult = `The Collegium observer is procedurally careful about informal conversations. Written submission through formal channels required for complaint intake.`;
        if (!G.flags) G.flags = {};
        G.flags.located_oversight_collegium_unity = true;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 7. SOCIAL: THE DISPOSSESSED ROUTING PARTY
  {
    label: "Find the party that won the deleted routing rights case — speak to them about what's happened since the decision disappeared.",
    tags: ['Social', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 67,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(67, 'interviewing dispossessed routing party');

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `Factor Rell won the routing rights decision seventeen months ago. When the northern commercial bloc began using those routes three months later, she went back to Vale Brokerwell's office. "He told me the case didn't exist. Showed me the register — no case record. I had my private copy. He told me my copy was unofficial documentation and didn't constitute legal standing." She's been trying to enforce a legal decision that has been erased from the official record. She's in legal limbo and running out of options. And she knows she's not the only one.`;
        if (!G.flags) G.flags = {};
        G.flags.met_rell_routing = true;
        addJournal('contact', 'Factor Rell: won routing rights case, decision deleted, told private copy is unofficial — legal limbo enforced by deletion', `unity-rell-${G.dayCount}`);
      } else {
        G.lastResult = `Rell is in proceedings and her advocate has told her not to speak informally about the case to anyone. The ongoing process has silenced her.`;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // 8. MORAL PRESSURE: THE ARBITER BELOW VALE
  {
    label: "Approach a junior arbiter who has been carrying out Vale Brokerwell's instructions — ask what they know and what they've been doing.",
    tags: ['Moral', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 65,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(65, 'confronting complicit arbiter');
      if (!G.flags) G.flags = {};

      G.lastResult = `Junior arbiter Sevv has been entering the corrections to the public register that alter the case outcomes. "I was told it was administrative correction — bringing the public summary in line with updated interpretive doctrine." She didn't understand what she was changing because the changes were described to her in administrative language that obscured the meaning. She's not complicit from intent. But she's complicit. She's frightened and wants to know what happens to her if this goes formal.`;
      G.flags.stage1_evidence_decision = 'pending';
      G.flags.stage1_moral_npc = 'Arbiter Sevv';
      addJournal('consequence', 'Junior arbiter Sevv: unwitting participant in record alteration, fears consequences if formal investigation begins', `unity-sevv-decision-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 9. INVESTIGATION: THE NORTHERN COMMERCIAL BLOC
  {
    label: "Identify the northern commercial bloc that benefited from the deleted routing rights decision.",
    tags: ['Investigation', 'Networks', 'Stage1', 'Meaningful'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'identifying northern commercial bloc');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `The routing rights that were contested connect to a broader consortium of northern interests that appear in multiple investigations across different localities — the same entity using different commercial names in different contexts. At Unity Square, they're registered as the Northern Route Coordination Consortium. In Craftspire, they operate as the Regional Materials Coordination Body. In Cosmoria, they're linked to the transit laundering chain. Different names, same registered principals, same northern address cluster. This is the same organization operating across multiple localities under different aliases.`;
        if (!G.flags) G.flags = {};
        G.flags.identified_northern_bloc = true;
        addJournal('discovery', 'Northern bloc identified: same principals operating as different entities across multiple localities — multi-alias distributed operation', `unity-northern-bloc-${G.dayCount}`);
      } else {
        G.lastResult = `The bloc's commercial registration is legitimate but cross-referencing across different localities requires access to registration databases in multiple jurisdictions.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 10. ATMOSPHERE: UNITY SQUARE AT MIDDAY
  {
    label: "Stand at Unity Square's central marker stone and observe how the hub coordinates the movement of people and goods.",
    tags: ['WorldColor', 'Lore', 'Stage1', 'Meaningful'],
    xpReward: 50,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(50, 'observing coordination hub activity');

      G.lastResult = `Unity Square was built as a place where parties from different localities could meet neutral ground. The central stone is inscribed: "Equal Distance from All." The arbitration hall is equidistant from the residential quarters and the commercial district — deliberately positioned so neither interest dominates. The architecture is a philosophy. Whatever is happening inside the arbitration records is a violation of the physical logic the square was built on. The stone stands in the middle of its own refutation.`;
      addJournal('discovery', 'Unity Square central marker: "Equal Distance from All" — coordination architecture designed for neutrality, undermined by captured arbitration', `unity-marker-${G.dayCount}`);
      G.recentOutcomeType = 'explore'; maybeStageAdvance();
    }
  },

  // 11. INVESTIGATION: VALE BROKERWELL'S CORRESPONDENCE
  {
    label: "Obtain a copy of Vale Brokerwell's external correspondence log for the past year.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'obtaining Brokerwell correspondence');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('stealth', (G.skills.stealth || 0) + Math.floor(G.level / 3));
      if (result.isCrit) {
        G.lastResult = `Brokerwell receives weekly correspondence from the Northern Route Coordination Consortium — the same entity whose routing rights case he deleted. The correspondence predates his appointment as senior arbiter by four months. He was in communication with the northern bloc before he held the position he used to benefit them. The relationship came before the authority. He was installed specifically to benefit this party.`;
        if (!G.flags) G.flags = {};
        G.flags.found_brokerwell_correspondence = true;
        addJournal('discovery', 'Brokerwell correspondence: weekly contact with Northern Consortium predates his appointment by 4 months — installed to serve a party, not appointed independently', `unity-brokerwell-corr-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `You get partial correspondence records — enough to confirm regular external contact with northern parties, but not the full document trail needed to establish the timeline.`;
      } else {
        G.lastResult = `Brokerwell's correspondence is in his private office filing system. Accessing it without detection requires either an internal contact or an opportunity that hasn't presented itself yet.`;
        if (!G.worldClocks) G.worldClocks = {};
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 12. PERSONAL ARC: DOCUMENT COLLECTION
  {
    label: "Compile all obtained private outcome documents into a single secured collection and get them to the Oversight Collegium observer.",
    tags: ['PersonalArc', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'compiling and transferring evidence collection');
      if (!G.flags) G.flags = {};

      const result = rollD20('stealth', (G.skills.stealth || 0) + Math.floor(G.level / 3));
      if (result.total >= 10) {
        G.lastResult = `You compile three private outcome documents and pass them to Observer Nance Tarn through a third party — a visiting factor from a northern locality who's unaffiliated with Unity Square's politics. Tarn acknowledges receipt without confirmation. The Collegium now has the comparison evidence they need. You've created a formal record of the discrepancies through the only institution with authority to act on them.`;
        G.flags.unity_evidence_transferred = true;
        addJournal('consequence', 'Private outcome documents transferred to Oversight Collegium — formal record created through independent institutional channel', `unity-evidence-transfer-${G.dayCount}`);
      } else {
        G.lastResult = `Every transfer route through Unity Square passes through some part of the coordination hub's administrative reach. Getting documents to the Collegium observer without Brokerwell's network seeing the transfer requires more care than you've had opportunity to arrange.`;
      }
      G.recentOutcomeType = 'stealth'; maybeStageAdvance();
    }
  },

  // 13. RUMOR LAYER
  {
    label: "Listen to parties waiting for coordination decisions — what are they saying about Unity Square's reliability?",
    tags: ['Investigation', 'Rumor', 'Stage1', 'Meaningful'],
    xpReward: 60,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(60, 'listening to waiting parties');

      const rumors = [
        'experienced factors have stopped using Unity Square for sensitive decisions — they go directly to Shelkopolis now',
        'Vale Brokerwell\'s predecessor left without explanation and refuses to discuss Unity Square publicly',
        'three arbitration case outcomes in the past year were reversed within a month of being issued — unprecedented frequency',
        'northern commercial parties always seem to know coordination decisions before they\'re formally announced'
      ];
      const selected = rumors[Math.floor(Math.random() * rumors.length)];

      G.lastResult = `Waiting room whisper: "${selected}." The hub's credibility problem is known even to those who haven't experienced it directly.`;
      addJournal('investigation', `Unity Square rumor: "${selected}"`, `unity-rumor-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 14. SOCIAL: BROKERWELL'S PREDECESSOR
  {
    label: "Find Vale Brokerwell's predecessor — the arbiter who retired before the emergency succession protocol was invoked.",
    tags: ['Social', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 67,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(67, 'finding Brokerwell\'s predecessor');

      const result = rollD20('survival', (G.skills.survival || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `Arbiter Polt retired to a quiet location two days' travel from Unity Square. He retired "for personal reasons" on short notice. "I was presented with an option," he tells you carefully. "Take the retirement package offered, or remain in the position under conditions I found unacceptable." He won't name what made the conditions unacceptable. But he will say: "Whoever filled my position was already identified before I left. The process was designed to confirm someone who was already chosen."`;
        if (!G.flags) G.flags = {};
        G.flags.met_polt_predecessor = true;
        addJournal('contact', 'Former arbiter Polt: given ultimatum to retire, successor already chosen before he left — appointment process was theater', `unity-polt-${G.dayCount}`);
      } else {
        G.lastResult = `Polt has made himself hard to find. He's moved twice since leaving Unity Square. Someone is tracking his location — or he's afraid of being tracked.`;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // 15. INVESTIGATION: WHAT UNITY SQUARE COORDINATES
  {
    label: "Map Unity Square's coordination function — what routes, agreements, and flows does it actually manage?",
    tags: ['Investigation', 'Systems', 'Stage1', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'mapping coordination hub scope');

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `Unity Square coordinates seven major trade route agreements, three inter-settlement supply contracts, and two regional resource allocation frameworks. Together, these cover approximately forty percent of the commercial flow between the settlements in its operational zone. Whoever controls Unity Square's arbitration outcomes controls the terms on which forty percent of regional commerce operates. It's not a coordination hub — it's a leverage point. Capturing it means controlling the framework that everything else operates within.`;
        addJournal('investigation', 'Unity Square scope: 40% of regional commercial flow governed by arbitration it controls — a leverage point, not just a hub', `unity-scope-${G.dayCount}`);
      } else {
        G.lastResult = `The coordination scope is documented but the full picture of what Unity Square's decisions govern requires deeper administrative access than is publicly available.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 16. ATMOSPHERE: THE ARBITRATION HALL
  {
    label: "Sit in the public gallery of an open arbitration session — observe how the process actually operates.",
    tags: ['WorldColor', 'Lore', 'Stage1', 'Meaningful'],
    xpReward: 50,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(50, 'observing arbitration session');

      G.lastResult = `The session is professionally conducted. Vale Brokerwell is composed and impartial-seeming. The decision he issues appears balanced. The parties accept it without visible objection. Watching it, you understand why the record alteration is so effective: the sessions themselves are above suspicion. Whatever is done to the records afterward happens in a different space, with a different mechanism, out of sight of the process that gives the records their legitimacy. The appearance of process is being used to launder the corruption of its outcomes.`;
      addJournal('discovery', 'Arbitration session: publicly impeccable process, corruption operates entirely post-session in record alteration — appearance launders outcomes', `unity-session-${G.dayCount}`);
      G.recentOutcomeType = 'explore'; maybeStageAdvance();
    }
  },

  // 17. INVESTIGATION: THE NORTHERN BLOC'S GAINS
  {
    label: "Calculate what the northern commercial bloc has gained through the record alterations and the deleted routing decision.",
    tags: ['Investigation', 'Systems', 'Stage1', 'Meaningful'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'calculating northern bloc gains');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 13) {
        G.lastResult = `The routing rights decision (deleted) gave the northern bloc three major transit corridors without the fee structure the arbitration imposed. The two altered cases gave them favorable supply contract terms that other parties believe are different from what was actually agreed. The cumulative gain: unrestricted route access and contract terms that advantage them over all competing parties using the same routes. Unity Square's capture has given the northern bloc structural dominance in regional commerce without appearing to have done so.`;
        if (!G.flags) G.flags = {};
        G.flags.calculated_bloc_gains = true;
        addJournal('investigation', 'Northern bloc total gains: unrestricted route access + favorable contract terms = structural commercial dominance via invisible capture', `unity-gains-${G.dayCount}`);
      } else {
        G.lastResult = `The full financial picture requires access to the parties' actual commercial data — which requires more cooperation than you currently have.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 18. WORLD COLOR: THE SQUARE AT DUSK
  {
    label: "Watch Unity Square empty at the close of business — observe what the space means to those who leave it.",
    tags: ['WorldColor', 'Lore', 'Stage1', 'Meaningful'],
    xpReward: 48,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(48, 'observing Unity Square at dusk');

      G.lastResult = `A factor from a small settlement pauses at the central stone before leaving. She runs her hand across the inscription — "Equal Distance from All" — and leaves without speaking. She came for a coordination decision that didn't go in her direction. Whether it was a legitimate decision or an altered one, she'll never know. She accepted it because the process looked fair. That's what's being stolen here: not the specific outcomes, but the trust that makes people accept outcomes they disagree with. The square's most valuable asset is the belief in its own fairness.`;
      addJournal('discovery', 'Unity Square: trust in fairness is the actual asset being exploited — parties accept unfavorable outcomes because process appears legitimate', `unity-dusk-${G.dayCount}`);
      G.recentOutcomeType = 'explore'; maybeStageAdvance();
    }
  },

  // 19. INVESTIGATION: SHELKOPOLIS CONNECTION
  {
    label: "Determine what connects Unity Square's situation to Shelkopolis — why does this matter beyond the hub itself?",
    tags: ['Investigation', 'Networks', 'Stage1', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'identifying Shelkopolis connection');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `Unity Square's coordination mandate includes arbitrating supply chain disputes that involve Shelkopolis's outlying districts. Decisions made here determine trade access for settlement parties that also do business in Shelkopolis. The northern bloc's routing rights and contract advantages translate directly into commercial leverage inside Shelkopolis's own market. What's happening at Unity Square is a peripheral capture that feeds into the central one. This investigation leads to Shelkopolis because Shelkopolis is where the leverage gets used.`;
        if (!G.flags) G.flags = {};
        G.flags.found_shelkopolis_connection = true;
        addJournal('investigation', 'Unity Square → Shelkopolis: arbitration advantages translate to commercial leverage inside Shelkopolis market — peripheral capture feeding central one', `unity-shelk-connection-${G.dayCount}`);
      } else {
        G.lastResult = `The connection to Shelkopolis requires understanding the specific supply contracts and their downstream implications — data that would take more time to fully map.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 20. SHADOW RIVAL INTRO
  {
    label: "Nance Tarn mentions someone visited the Collegium observer before you — leaving documents that turned out to be fabricated evidence.",
    tags: ['Rival', 'Warning', 'Stage1', 'Meaningful'],
    xpReward: 57,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(57, 'receiving rival warning');
      if (!G.flags) G.flags = {};

      const arch = G.archetype && G.archetype.group;
      if (arch === 'combat') {
        G.lastResult = `"They brought documents implicating a party I know to be uninvolved," Tarn says. "Professional forgeries — good enough that I nearly filed them. The fabrication was designed to misdirect the Collegium investigation toward an innocent party and away from the actual perpetrators." Someone is counter-investigating by inserting false evidence into the legitimate investigation channel.`;
      } else if (arch === 'magic') {
        G.lastResult = `"The documents were authentic-looking but contained subtle anachronisms," Tarn says. "Dates formatted in a style that wasn't used in the period the documents claimed to be from. An expert could spot it. Most wouldn't." Someone with access to sophisticated document fabrication is trying to poison the investigation record.`;
      } else if (arch === 'stealth') {
        G.lastResult = `"They came as a party representative," Tarn says. "Registered name, affiliated address, everything correct. But the party they represented doesn't exist at the registered address." A completely fabricated identity used to deliver false evidence to the investigation channel. Professional identity construction for a single operation.`;
      } else {
        G.lastResult = `"They were sympathetic to the investigation's goal," Tarn says. "Expressed genuine concern about Unity Square's integrity. Offered to help gather more evidence. The fabricated documents came as part of what they called 'additional supporting material.'" Someone is building trust within the investigation network while introducing false information through it.`;
      }

      G.lastResult += ` Someone is actively working to compromise the Collegium investigation from the inside.`;
      if (!G.rivalId) {
        if (arch === 'combat') G.rivalId = 'warden_captain';
        else if (arch === 'magic') G.rivalId = 'archivist_veld';
        else if (arch === 'stealth') G.rivalId = 'shadow_broker';
        else G.rivalId = 'provost_lenn';
      }
      addJournal('warning', 'Rival-adjacent operative submitted fabricated evidence to Oversight Collegium — actively poisoning investigation channel', `unity-rival-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  }
];
window.UNITY_SQUARE_STAGE1_ENRICHED_CHOICES = UNITY_SQUARE_STAGE1_ENRICHED_CHOICES;
