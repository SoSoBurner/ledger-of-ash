/**
 * STEALTH ARCHETYPE MIDSPINE
 * 3-node consequence chain — information network entanglement
 * Condition: G.archetype.group === 'stealth' AND G.stage === 1 AND G.stageProgress[1] >= 5
 * Global var: STEALTH_MIDSPINE_CHOICES
 */

const STEALTH_MIDSPINE_CHOICES = [

  // ——— NODE 1: THE ENTANGLEMENT ———
  {
    label: "An information broker you've worked with has sold your investigation details to a third party. Confront them — or quietly redirect the information flow without revealing you know.",
    tags: ['Midspine', 'Stealth', 'Decision'],
    xpReward: 85,
    condition: function() {
      return G.archetype && G.archetype.group === 'stealth'
        && G.stage === 1
        && G.stageProgress && (G.stageProgress[1] || 0) >= 5
        && !(G.flags && G.flags.stealth_midspine_node1_complete);
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(85, 'handling the information broker entanglement');
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};

      const result = rollD20('stealth', (G.skills.stealth || 0) + Math.floor(G.level / 3));
      const target = 13;

      if (result.total >= target) {
        G.lastResult = `You don't confront. You replace. Over three days, you feed the broker a mix of accurate information and deliberate misdirection — the misdirection calibrated to be plausible but not actionable. The third party buyer receives a picture of your investigation that's real enough to not trigger skepticism but wrong enough to protect your actual progress. The broker doesn't know what you've done. Your investigation continues unmolested.`;
        G.flags.stealth_midspine_redirected = true;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('discovery', 'Stealth midspine: information misdirection operation — broker\'s buyer receiving false picture', `stealth-midspine-1-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The confrontation ends the broker relationship — he's offended and cuts contact. But the third party buyer received accurate information about your investigation before you intervened. Whatever they know, they know it now. You've contained the forward flow but not the damage already done.`;
        G.flags.stealth_midspine_confronted = true;
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 2;
        G.recentOutcomeType = 'complication';
      }
      G.flags.stealth_midspine_node1_complete = true;
    }
  },

  // ——— NODE 2: THE CHOICE ———
  {
    label: "The third party buyer has made contact — indirectly. They want to purchase what you know. Sell the intelligence, or protect your source network.",
    tags: ['Midspine', 'Stealth', 'Decision'],
    xpReward: 90,
    condition: function() {
      return G.archetype && G.archetype.group === 'stealth'
        && G.stage === 1
        && G.stageProgress && (G.stageProgress[1] || 0) >= 5
        && G.flags && G.flags.stealth_midspine_node1_complete
        && !(G.flags && G.flags.stealth_midspine_node2_complete);
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(90, 'deciding whether to sell intelligence or protect sources');
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};

      const result = rollD20('stealth', (G.skills.stealth || 0) + Math.floor(G.level / 3));

      if (result.total >= 12) {
        G.lastResult = `You sell — selectively. The buyer receives a curated package of information that's valuable enough to seem like the full picture but structured to not expose any of your primary sources. You take the payment. You also now know who the buyer is — because they used a payment method that traces back to a specific financial channel. The buyer is connected to the northern bloc's financial infrastructure. You've been paid by the operation you're investigating.`;
        G.flags.stealth_midspine_sold_controlled = true;
        G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('discovery', 'Stealth midspine: controlled sell — buyer identified as northern bloc operative via payment trace', `stealth-midspine-2-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `You refuse and go silent — no contact, no response, no visible investigation activity for three days. The buyer stops making contact. Your sources are protected. But your investigation has a three-day gap in it, and whatever the buyer was trying to find out from you, they're now trying to find out another way.`;
        G.flags.stealth_midspine_protected_sources = true;
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
        addJournal('consequence', 'Stealth midspine: refused sale, went silent — sources protected, buyer now pursuing alternate route', `stealth-midspine-2-${G.dayCount}`);
        G.recentOutcomeType = 'neutral';
      }
      G.flags.stealth_midspine_node2_complete = true;
    }
  },

  // ——— NODE 3: THE NETWORK ———
  {
    label: "Use what you learned from the buyer's identity to map the information network that's been monitoring your investigation. The shadow network is real — find its shape.",
    tags: ['Midspine', 'Stealth', 'Lore', 'Investigation'],
    xpReward: 95,
    condition: function() {
      return G.archetype && G.archetype.group === 'stealth'
        && G.stage === 1
        && G.stageProgress && (G.stageProgress[1] || 0) >= 5
        && G.flags && G.flags.stealth_midspine_node2_complete
        && !(G.flags && G.flags.stealth_midspine_node3_complete);
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(95, 'mapping the shadow information network');
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};

      G.flags.stealth_midspine_node3_complete = true;

      const result = rollD20('stealth', (G.skills.stealth || 0) + (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 14) {
        G.lastResult = `The shadow network has three tiers: local information buyers (the brokers you've encountered), mid-tier coordinators (the third party buyers), and a central receiving function that aggregates everything into operational intelligence for the northern bloc. The central function is in Shelkopolis — specifically, in the same administrative district as the investigation network you're working through. They're running a parallel monitoring operation against the same investigation. Whatever you find, they're trying to find out that you found it.`;
        G.flags.stealth_midspine_network_mapped = true;
        if (!G.rivalId) G.rivalId = 'shadow_broker';
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('discovery', 'Stealth midspine: shadow monitoring network confirmed — 3 tiers, central function in Shelkopolis admin district', `stealth-midspine-3-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `You can see the immediate tier — the broker, the buyer — but the structure above that is too compartmentalized to map from where you are. In Shelkopolis you'll have access to the financial traces that show the mid-tier coordination layer. The full network shape requires being in the city where the central function operates.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  }

];
