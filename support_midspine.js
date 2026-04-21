/**
 * SUPPORT ARCHETYPE MIDSPINE
 * 3-node consequence chain — factional loyalty test
 * Condition: G.archetype.group === 'support' AND G.stage === 1 AND G.stageProgress[1] >= 5
 * Global var: SUPPORT_MIDSPINE_CHOICES
 */

const SUPPORT_MIDSPINE_CHOICES = [

  // ——— NODE 1: THE LOYALTY TEST ———
  {
    label: "Two factions have each approached you separately. The Oversight Collegium wants your investigation findings first. The investigation network wants them kept private. Choose.",
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

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      const target = 12;

      if (result.total >= target) {
        G.lastResult = `You give both the same answer: a general summary that contains enough to demonstrate good faith but nothing that the other party doesn't already know. The Collegium receives the summary and considers itself served. The network receives the same summary and doesn't object — they know you held back the sensitive material. Neither party has cause for complaint. Neither party fully trusts you. That's a workable position.`;
        G.flags.support_midspine_neutral_held = true;
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
        addJournal('consequence', 'Support midspine: neutral position maintained — partial trust with both factions', `support-midspine-1-${G.dayCount}`);
        G.recentOutcomeType = 'neutral';
      } else {
        G.lastResult = `You give the network priority — their request came first and the Collegium's approach felt structured rather than genuine. The Collegium observer notes your choice. "We'll remember that you chose a private network over institutional oversight," she says. The Collegium has categorized you as an unaligned operator, which is one step below adversary.`;
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
    label: "A third faction — the investigation network's institutional backers — offers resources you need. The price is formal affiliation. Consider what formal affiliation means for your independence.",
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

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));

      if (result.total >= 12) {
        G.lastResult = `You negotiate the terms of the affiliation rather than accepting or refusing them outright. The institutional backers want formal association; you want specific resource access without operational reporting requirements. After two meetings, you reach an arrangement: affiliated in title, independent in method. The resources you need — archive access, witness protection capacity, legal consultation — are now available. What you give up is the ability to claim complete neutrality.`;
        G.flags.support_midspine_affiliated = true;
        G.worldClocks.reverence = (G.worldClocks.reverence || 0) + 1;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('consequence', 'Support midspine: negotiated affiliation — resources secured, nominal title only, operational independence retained', `support-midspine-2-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `You decline the formal affiliation. Independence matters more than the resources right now — the formal structure would constrain how you can use what you find. The institutional backers are disappointed but not hostile. You'll have to manage without the resource access. In Shelkopolis there are other sources.`;
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
    label: "Having navigated the factional landscape, quietly favor the faction that aligns with your investigation's actual goals — not the one that offers the most resources.",
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
        G.lastResult = `Your investigation's evidence most clearly points at parties operating through Warden Order-adjacent structures. Quietly favoring the Oversight Collegium as a counterbalance creates the institutional pressure that makes the Warden Order's protection of those parties visible and costly. You make two careful introductions within Collegium channels that will take weeks to develop into anything formal. The alignment is invisible now. In Shelkopolis it will matter.`;
        G.flags.support_midspine_aligned_collegium = true;
        G.worldClocks.reverence = (G.worldClocks.reverence || 0) + 1;
      } else if (dominated === 'iron_compact') {
        G.lastResult = `The Iron Compact's involvement in the northern supply chain is the most institutionally exposed thread. Quietly favoring the Warden Order as a monitoring counterpart — even without formal alliance — creates a check on the Compact's ability to suppress findings in its jurisdiction. You make one specific introduction that doesn't require ongoing commitment. It's enough to establish a channel for Stage 2.`;
        G.flags.support_midspine_aligned_warden = true;
        G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
      } else {
        G.lastResult = `The Oversight Collegium's involvement in case suppression and charter renewal makes them the most dangerous institutional actor in the current investigation. Quietly favoring the investigation network's independent structure — and strengthening connections within it — gives you a factional home that isn't subject to Collegium oversight. The network becomes your primary institutional anchor for Stage 2.`;
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
