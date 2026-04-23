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
        G.lastResult = `You don't cut the broker off. Over three days you feed him a constructed picture — accurate on surface details, wrong on the structural questions. The locations are real but the timelines are shifted. The names are real but the roles are transposed. Whoever is buying on the other end receives something plausible enough to not question and useless enough to not act on. The broker passes it along with his usual reliability. He doesn't know he's carrying a decoy. Your actual progress is intact.`;
        G.flags.stealth_midspine_redirected = true;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('Stealth midspine: information misdirection operation — broker\'s buyer receiving false picture', 'discovery', `stealth-midspine-1-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `You go to the broker directly. He doesn't apologize — he explains that the buyer offered more than standard rate and that his operation runs on margin. You terminate the arrangement. He doesn't argue. By the time you're out the door he's already considering who to sell to next. The buyer received at least two accurate transmissions before you shut the channel. What they know from those, they know permanently. The forward flow is stopped. The existing exposure is not.`;
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
        G.lastResult = `You accept — with conditions. The package you deliver is real enough to satisfy: three solid findings, two supporting documents, no source names and no active leads. Valuable, and not the whole picture. The payment comes through a northern clearinghouse with a standard commercial routing code. It's the kind of routing code that looks generic and traces, with two steps of work, to a specific financial channel within the northern bloc's operational infrastructure. You have been paid, at standard rate, by the network you're working against. The receipt is in your ledger.`;
        G.flags.stealth_midspine_sold_controlled = true;
        G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('Stealth midspine: controlled sell — buyer identified as northern bloc operative via payment trace', 'discovery', `stealth-midspine-2-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `You don't respond. No reply, no visible movement, no contact with any of your regular sources for three days — you give the buyer nothing to observe and nothing to purchase. The approach stops. Your sources are intact and your current findings are still yours. What you've lost is three days of forward momentum and the chance to learn who the buyer is from how they pay. They're still looking for what they tried to buy from you. They're now looking through other channels.`;
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
        G.lastResult = `The structure has three visible tiers. At the base: street-level brokers, the kind you've been working with — they buy and sell without knowing what the information is used for. Above them: coordinating buyers who aggregate and pass upward, identifiable by their payment routing. At the top: a central receiving function that turns the aggregated intelligence into operational decisions for the northern bloc. That central function operates out of Shelkopolis — specifically from a location in the same administrative district as the network you're embedded in. They are not monitoring the northern supply chain. They are monitoring the people monitoring the northern supply chain. Every finding you surface, they are trying to know that you've surfaced it.`;
        G.flags.stealth_midspine_network_mapped = true;
        if (!G.rivalId) G.rivalId = 'shadow_broker';
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('Stealth midspine: shadow monitoring network confirmed — 3 tiers, central function in Shelkopolis admin district', 'discovery', `stealth-midspine-3-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `You can see the bottom of it — the broker, the buyer who approached you, the payment routing that doesn't quite resolve. The mid-tier coordination layer is compartmentalized in a way that requires financial records you don't have access to here. Every trace you pull dead-ends at a clearinghouse that serves forty other commercial operations. In Shelkopolis the clearinghouse has a public audit record. That's where the structure above the buyer becomes readable. Until then you know the shape of the bottom tier and nothing about what sits on top of it.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  }

];

window.STEALTH_MIDSPINE_CHOICES = STEALTH_MIDSPINE_CHOICES;
