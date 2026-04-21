/**
 * COMBAT ARCHETYPE MIDSPINE
 * 3-node consequence chain — first serious confrontation with faction authority
 * Condition: G.archetype.group === 'combat' AND G.stage === 1 AND G.stageProgress[1] >= 5
 * Global var: COMBAT_MIDSPINE_CHOICES
 */

const COMBAT_MIDSPINE_CHOICES = [

  // ——— NODE 1: THE CONFRONTATION ———
  {
    label: "A Warden Order patrol has been following your investigation. Their commander requests a formal meeting. Attend — or refuse.",
    tags: ['Midspine', 'Combat', 'Decision'],
    xpReward: 85,
    condition: function() {
      return G.archetype && G.archetype.group === 'combat'
        && G.stage === 1
        && G.stageProgress && (G.stageProgress[1] || 0) >= 5
        && !(G.flags && G.flags.combat_midspine_node1_complete);
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(85, 'confronting the Warden Order commander');
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};

      const result = rollD20('combat', (G.skills.combat || 0) + Math.floor(G.level / 3));
      const target = 12;

      if (result.total >= target) {
        G.lastResult = `The Warden Order commander, Captain Edvar, is direct: he knows you've been gathering information about the northern supply chain and he wants to understand your purpose. You give him enough to establish you're not working against the Order — but not so much that you're under their oversight. He respects the calibration. "We've been watching the same supply chain from a different angle," he says. "Our paths may intersect again." He leaves without extracting a commitment.`;
        G.flags.combat_midspine_warden_respected = true;
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
      } else {
        G.lastResult = `Captain Edvar is not satisfied with your answers. He doesn't arrest you — he doesn't have grounds — but he makes clear that the Warden Order considers your investigation a parallel activity that may require coordination. "You are observed," he says. That's not a threat. It's a statement of fact that functions as a threat.`;
        G.flags.combat_midspine_warden_hostile = true;
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 2;
        if (!G.factionHostility) G.factionHostility = { warden_order: 0, iron_compact: 0, oversight_collegium: 0 };
        G.factionHostility.warden_order = (G.factionHostility.warden_order || 0) + 1;
      }
      G.flags.combat_midspine_node1_complete = true;
      addJournal('consequence', 'Combat midspine node 1: Warden Order confrontation — personal arc established', `combat-midspine-1-${G.dayCount}`);
      G.recentOutcomeType = result.total >= target ? 'success' : 'complication';
    }
  },

  // ——— NODE 2: THE TEST ———
  {
    label: "A Warden Order garrison in your current district is obstructing access to a critical document. Get through them — by whatever means suits you.",
    tags: ['Midspine', 'Combat', 'Risk'],
    xpReward: 90,
    condition: function() {
      return G.archetype && G.archetype.group === 'combat'
        && G.stage === 1
        && G.stageProgress && (G.stageProgress[1] || 0) >= 5
        && G.flags && G.flags.combat_midspine_node1_complete
        && !(G.flags && G.flags.combat_midspine_node2_complete);
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(90, 'getting past the Warden Order garrison');
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};

      const result = rollD20('combat', (G.skills.combat || 0) + (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      const target = 14;

      if (result.isCrit) {
        G.lastResult = `You find the garrison commander's weakness: he's been in this district twelve months without a single citation or complaint. He's a careful man. Careful men respond to structural pressure — you imply, without stating, that his garrison's access obstruction could be interpreted as complicity in the document suppression. He steps aside. You get the document. He files nothing about the encounter.`;
        G.flags.combat_midspine_garrison_bypassed = true;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('discovery', 'Combat midspine: garrison bypassed via structural pressure — document obtained', `combat-midspine-2-${G.dayCount}`);
      } else if (result.total >= target) {
        G.lastResult = `You challenge the garrison's authority directly, citing the specific Principalities code that makes public access documents non-restricable by garrison order. The commander doesn't know the code. You do. He stands down. The encounter leaves a record in the garrison log.`;
        G.flags.combat_midspine_garrison_bypassed = true;
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
      } else {
        G.lastResult = `The garrison commander holds the line and you're not willing to escalate to direct confrontation in a public location. You leave without the document — but you've identified the access point and know the garrison's shift change schedule. You'll try again.`;
        G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
        G.recentOutcomeType = 'complication';
      }
      G.flags.combat_midspine_node2_complete = true;
      G.recentOutcomeType = result.total >= target ? 'success' : 'complication';
    }
  },

  // ——— NODE 3: THE OFFER ———
  {
    label: "Captain Edvar contacts you again — this time with an offer. The Warden Order wants to fold your investigation into their official structure. Consider it carefully.",
    tags: ['Midspine', 'Combat', 'Decision'],
    xpReward: 95,
    condition: function() {
      return G.archetype && G.archetype.group === 'combat'
        && G.stage === 1
        && G.stageProgress && (G.stageProgress[1] || 0) >= 5
        && G.flags && G.flags.combat_midspine_node2_complete
        && !(G.flags && G.flags.combat_midspine_node3_complete);
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(95, 'deciding on the Warden Order\'s offer');
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};

      G.flags.combat_midspine_node3_complete = true;

      if (G.flags.combat_midspine_warden_respected) {
        G.lastResult = `Edvar's offer is genuine: formal authorization, resource access, legal protection. The cost is oversight — reporting your findings to the Order before acting on them. You decline the formal integration but agree to an information-sharing arrangement that gives neither party authority over the other. Edvar accepts. "You'll find the Warden Order more useful as an observer than an enemy," he says. He's probably right.`;
        G.flags.combat_midspine_warden_allied = true;
        G.worldClocks.reverence = (G.worldClocks.reverence || 0) + 1;
      } else {
        G.lastResult = `Edvar's offer arrives through intermediaries — not the respect of a direct meeting. The terms include mandatory reporting and suspension of independent action during any Warden Order active investigation in the same area. You decline entirely. What you have is too fragile to share with an institution that might suppress it for political reasons. Edvar notes your refusal. The Warden Order notes it too.`;
        G.flags.combat_midspine_warden_refused = true;
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
        if (!G.factionHostility) G.factionHostility = { warden_order: 0, iron_compact: 0, oversight_collegium: 0 };
        G.factionHostility.warden_order = (G.factionHostility.warden_order || 0) + 1;
      }
      addJournal('consequence', 'Combat midspine complete: Warden Order relationship established — carries to Stage 2', `combat-midspine-3-${G.dayCount}`);
      G.recentOutcomeType = 'neutral';
      if (!G.rivalId && G.archetype) G.rivalId = 'warden_captain';
    }
  }

];

window.COMBAT_MIDSPINE_CHOICES = COMBAT_MIDSPINE_CHOICES;
