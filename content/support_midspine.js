/**
 * SUPPORT ARCHETYPE MIDSPINE
 * 3-node consequence chain — factional loyalty test
 * Condition: G.archetype.group === 'support' AND G.stage === 1 AND G.stageProgress[1] >= 5
 * Global var: SUPPORT_MIDSPINE_CHOICES
 */

const SUPPORT_MIDSPINE_CHOICES = [

  // ——— NODE 1: THE LOYALTY TEST ———
  {
    label: "Two factions have each approached you separately. The Oversight Collegium wants your findings first. The private network wants them kept out of Collegium hands. Choose.",
    tags: ['Midspine', 'Support', 'Decision'],
    xpReward: 85,
    condition: function() {
      return G.archetype && G.archetype.group === 'support'
        && G.stage === 1
        && G.stageProgress && (G.stageProgress[1] || 0) >= 5
        && !(G.flags && G.flags.support_midspine_node1_complete);
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(85, 'navigating the factional loyalty test');
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.factionHostility) G.factionHostility = { warden_order: 0, iron_compact: 0, oversight_collegium: 0 };

      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      const target = 12;

      if (result.total >= target) {
        G.lastResult = `You prepare a single summary and deliver it to both parties by separate channels. It contains what either of them already has access to through their own networks — enough to demonstrate that you're not withholding in bad faith, not enough to give either a material advantage over the other. The Collegium clerk signs the receipt without reading it closely. The network's coordinator reads it twice, then sets it down. "You gave us the same thing you gave them," she says. It is not a question. You confirm it. She nods. Neither party is satisfied. Neither has grounds to object.`;
        G.flags.support_midspine_neutral_held = true;
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
        addJournal('consequence', 'Support midspine: neutral position maintained — partial trust with both factions', `support-midspine-1-${G.dayCount}`);
        G.recentOutcomeType = 'neutral';
      } else {
        G.lastResult = `The network's request arrived first and their reasons are legible — the Collegium's approach carried the procedural texture of an audit rather than a collaboration. You route the findings to the network and send the Collegium a holding note: pending review, pending verification, standard delay language. The Collegium observer returns two days later. She doesn't raise her voice. "You prioritized a private network over institutional oversight." She writes something in her folder. "That's been noted in your file." The category she's marking you into sits one grade above adversarial. You can read the distance in how she closes the folder.`;
        G.flags.support_midspine_network_chosen = true;
        G.factionHostility.oversight_collegium = (G.factionHostility.oversight_collegium || 0) + 1;
        addJournal('consequence', 'Support midspine: chose network over Collegium — Collegium categorized you as unaligned', `support-midspine-1-${G.dayCount}`);
        G.recentOutcomeType = 'complication';
      }
      G.flags.support_midspine_node1_complete = true;
    }
  },

  // ——— NODE 2: THE RESOURCE QUESTION ———
  {
    label: "A third faction — the private network's institutional backers — offers resources you need. The price is formal affiliation. Consider what formal affiliation means for your independence.",
    tags: ['Midspine', 'Support', 'Decision'],
    xpReward: 90,
    condition: function() {
      return G.archetype && G.archetype.group === 'support'
        && G.stage === 1
        && G.stageProgress && (G.stageProgress[1] || 0) >= 5
        && G.flags && G.flags.support_midspine_node1_complete
        && !(G.flags && G.flags.support_midspine_node2_complete);
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(90, 'evaluating the formal affiliation offer');
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};

      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 3));

      if (result.total >= 12) {
        G.lastResult = `You don't accept and you don't refuse. You come to the second meeting with a counter-proposal: affiliated in name, unaffiliated in method, no operational reporting requirements attached. The backers want the association on paper more than they want oversight. After an hour they agree. Archive access, witness protection capacity, legal consultation in three districts — these are now available to you. What you've traded is the posture of neutrality. Anyone who checks your affiliation record will see the connection. You no longer claim to stand outside the institutional landscape.`;
        G.flags.support_midspine_affiliated = true;
        G.worldClocks.reverence = (G.worldClocks.reverence || 0) + 1;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('consequence', 'Support midspine: negotiated affiliation — resources secured, nominal title only, operational independence retained', `support-midspine-2-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `You decline at the first meeting, before the terms are fully laid out — you've read enough of the standard affiliation structure to know what follows formal association. The backers don't push. They fold the offer, make a note, and wish you good travel with the particular courtesy that signals a door being closed quietly rather than slammed. The resource access goes with the offer. Archive requests, witness protections, legal consultation — you'll source these separately. Shelkopolis has private practitioners in all three areas. They cost more and carry fewer constraints.`;
        G.flags.support_midspine_declined = true;
        G.worldClocks.isolation = (G.worldClocks.isolation || 0) + 1;
        addJournal('consequence', 'Support midspine: declined affiliation — independence maintained, resource access forfeited', `support-midspine-2-${G.dayCount}`);
        G.recentOutcomeType = 'neutral';
      }
      G.flags.support_midspine_node2_complete = true;
    }
  },

  // ——— NODE 3: THE ALIGNMENT ———
  {
    label: "Having navigated the factional landscape, quietly favor the faction whose goals actually match what you've found — not the one offering the most resources.",
    tags: ['Midspine', 'Support', 'Decision'],
    xpReward: 95,
    condition: function() {
      return G.archetype && G.archetype.group === 'support'
        && G.stage === 1
        && G.stageProgress && (G.stageProgress[1] || 0) >= 5
        && G.flags && G.flags.support_midspine_node2_complete
        && !(G.flags && G.flags.support_midspine_node3_complete);
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(95, 'establishing quiet factional alignment');
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};

      G.flags.support_midspine_node3_complete = true;
      if (!G.rivalId) G.rivalId = 'provost_lenn';

      const dominated = G.factionHostility &&
        (G.factionHostility.warden_order > G.factionHostility.iron_compact &&
         G.factionHostility.warden_order > G.factionHostility.oversight_collegium) ? 'warden_order'
        : G.factionHostility &&
        (G.factionHostility.iron_compact > G.factionHostility.oversight_collegium) ? 'iron_compact'
        : 'oversight_collegium';

      if (dominated === 'warden_order') {
        G.lastResult = `The evidence trails run through Warden Order-adjacent structures — protection arrangements that require institutional proximity to maintain. The counterweight is the Oversight Collegium, which has jurisdictional authority over exactly the kind of case that makes those protection arrangements expensive to sustain. You arrange two introductions inside Collegium channels: a researcher with relevant access, a clerk who processes the audit queue. Neither knows the other exists. Neither knows your name will appear in the same correspondence as theirs. In Shelkopolis, in six to eight weeks, those two threads will be in the same room.`;
        G.flags.support_midspine_aligned_collegium = true;
        G.worldClocks.reverence = (G.worldClocks.reverence || 0) + 1;
      } else if (dominated === 'iron_compact') {
        G.lastResult = `The Iron Compact's role in the northern supply chain is the most visible institutional exposure — they hold jurisdictional authority over the freight routes where the ledger gaps appear. The Warden Order is the body with mandate to audit Compact freight operations. You make one introduction: a Warden field assessor who has been trying to reach the right audit queue for three months, and a clerk inside that queue who is tired of the backlog. No ongoing commitment required from you. The channel opens. In Shelkopolis the Compact will find its freight documentation under active review.`;
        G.flags.support_midspine_aligned_warden = true;
        G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
      } else {
        G.lastResult = `The Collegium's pattern — case suppression, charter renewal leverage, delayed audit processing — makes them the institutional actor most likely to close off the routes you need in Stage 2. The network operates outside Collegium oversight by design. You spend the next four days strengthening three of your weakest network connections: a courier who knows the western archive access schedule, a handler who runs the witness coordination roster, a researcher who holds duplicate copies of three contested documents. The network is not a faction. It has no charter, no building, no budget line. That is exactly why it works.`;
        G.flags.support_midspine_aligned_network = true;
        G.worldClocks.reverence = (G.worldClocks.reverence || 0) + 1;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
      }

      addJournal('consequence', 'Support midspine complete: quiet factional alignment established — carries into Stage 2', `support-midspine-3-${G.dayCount}`);
      G.recentOutcomeType = 'neutral';
    }
  }

];

window.SUPPORT_MIDSPINE_CHOICES = SUPPORT_MIDSPINE_CHOICES;
