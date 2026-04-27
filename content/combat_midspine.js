/**
 * COMBAT ARCHETYPE MIDSPINE
 * 3-node consequence chain — first serious confrontation with faction authority
 * Condition: G.archetype.group === 'combat' AND G.stage === 1 AND G.stageProgress[1] >= 5
 * Global var: COMBAT_MIDSPINE_CHOICES
 */

const COMBAT_MIDSPINE_CHOICES = [

  // ——— NODE 1: THE CONFRONTATION ———
  {
    label: "A Warden Order patrol has been tracking the same thread. Their commander wants a formal meeting.",
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
        G.lastResult = `Captain Edvar sits with his hands flat on the table and his back straight — the posture of a man who considers slouching a form of dishonesty. He names what he knows about your movements in the northern supply district. It's accurate. You match his directness: purpose, method, what you're not willing to share. He listens without interrupting. "We've had eyes on the same shipment ledgers," he says. He stands to leave. No handshake — Warden Order protocol. "The Order doesn't need allies. But it notes who isn't an obstacle."`;
        G.flags.combat_midspine_warden_respected = true;
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
      } else {
        G.lastResult = `Edvar listens to your account and says nothing for a long moment. He picks up a pen, writes something in his field log, and caps it. "Your movements in the northern supply district are noted." He closes the log. "If the Order's work overlaps yours, we will not be asking permission to proceed." He doesn't raise his voice. The two Warden officers at the door haven't moved, but they've stopped pretending to look elsewhere.`;
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
        G.lastResult = `The garrison commander has been in this district fourteen months. No citations, no complaints, no commendations — a man who keeps his head down and his record clean. You don't threaten him. You describe, in procedural terms, how a garrison's access restriction on a public-record document could be logged as active suppression by an independent audit. He is very still while you talk. He steps aside. You retrieve the document. His log entry for the hour reads: "No incidents."`;
        G.flags.combat_midspine_garrison_bypassed = true;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('Combat midspine: garrison bypassed via structural pressure — document obtained', 'discovery', `combat-midspine-2-${G.dayCount}`);
      } else if (result.total >= target) {
        G.lastResult = `You cite the Principalities access code by number and section — the provision that prohibits garrison restriction on public-record documents outside active emergency ordinance. The commander's expression shifts: he either doesn't know the code or didn't expect you to. He steps back from the desk. You take the document. He writes the encounter in the garrison log and underlines your name twice, which is its own kind of record.`;
        G.flags.combat_midspine_garrison_bypassed = true;
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
      } else {
        G.lastResult = `The garrison commander doesn't flinch. He's had this conversation before — or one enough like it. He crosses his arms and waits you out. There's a queue forming behind you and a second officer moving toward the desk, and a public scene earns you nothing. You leave without the document. On the way out you count the wall clock, note the shift markings on the duty board, and memorize the face of the officer coming on. The access point is clear. The timing is clear. You go back when the shift is thinner.`;
        G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
        G.recentOutcomeType = 'complication';
      }
      G.flags.combat_midspine_node2_complete = true;
      G.recentOutcomeType = result.total >= target ? 'success' : 'complication';
    }
  },

  // ——— NODE 3: THE OFFER ———
  {
    label: "Edvar contacts you again with an offer. The Warden Order wants to fold your work into their official structure.",
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
        G.lastResult = `Edvar lays the offer out without embellishment: authorization, archive access, legal standing in three jurisdictions. The attached condition is mandatory pre-action reporting to the Order. You decline the integration and propose a counter: mutual disclosure at defined intervals, no operational authority on either side. Edvar considers it with the stillness of a man calculating odds. He nods once. "The Order respects operational discipline," he says. He means it as a compliment.`;
        G.flags.combat_midspine_warden_allied = true;
        G.worldClocks.reverence = (G.worldClocks.reverence || 0) + 1;
      } else {
        G.lastResult = `The offer arrives through a courier, not Edvar himself — which tells you something. The terms require mandatory reporting and a freeze on independent action anywhere the Order has an active file. That covers most of the districts you need to move through. You send back a single-line refusal. Three days later, a Warden officer begins appearing at regular intervals near the locations you're working from. Not following — positioning. The Order has its own way of noting a refusal.`;
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
