'use strict';

const STAGE2_SHADOWHANDS_ARC = [

  {
    label: "The chalk mark on the third column means someone left a message. It wasn't there yesterday.",
    tags: ['ArcDeparture', 'Stealth', 'Investigation'],
    xpReward: 75,
    condition: function() { return G.stage == 2 && !(G.flags && G.flags.shadowhands_contacted); },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(75, 'finding Shadowhands dead-drop signal');
      G.flags = G.flags || {};
      var result = rollD20('stealth', (G.skills.stealth||0) + Math.floor(G.level/3) + (typeof getEquipmentBonus==='function'?getEquipmentBonus('stealth'):0));
      if (result.total >= 12) {
        G.lastResult = "The dead-drop is behind a loose stone in the third column of the Guildheart lower corridor. A folded paper, no name on it. The handwriting is careful and compressed. It says: the same names appear in four ledgers they think no one has access to. We have access. If you want to compare notes — the Anchor taproom, three nights from now, second table from the door. Come alone. The paper has already been read by at least one other person; the fold crease is wrong.";
        G.flags.shadowhands_contacted = true;
        G.flags.shadowhands_meeting_set = true;
        addJournal('Dead-drop found at Guildheart third column — Shadowhands meeting set, Anchor taproom in 3 days', 'intelligence');
        G.recentOutcomeType = 'success';
        G.investigationProgress = (G.investigationProgress||0) + 1;
      } else {
        G.lastResult = "The chalk mark is there. Whatever it signals, you don't know the code. It will still be there tomorrow if you learn to read it.";
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  {
    label: "The second table from the door. Someone is already sitting there.",
    tags: ['ArcDeepening', 'Social', 'NPC'],
    xpReward: 85,
    condition: function() { return !!(G.flags && G.flags.shadowhands_meeting_set && !G.flags.shadowhands_met); },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(85, 'meeting Shadowhands contact at Anchor');
      G.flags = G.flags || {};
      var result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3) + (typeof getEquipmentBonus==='function'?getEquipmentBonus('persuasion'):0));
      if (result.total >= 11) {
        G.lastResult = "She gives her name as Ilve. She has no tell that she's nervous — only that she is always watching the door, and the watching is automatic, not situational. She lays out the arrangement without preamble: the Shadowhands have three years of supply chain documentation that connects Ironhold extraction rates to Shelkopolis dome additive records. They've been waiting for someone who could move between localities without drawing Collegium attention. She slides a ledger page across the table. The numbers match what you already know — and extend three months further back than anything you've found.";
        G.flags.shadowhands_met = true;
        G.flags.shadowhands_ilve_contact = true;
        addJournal('Ilve (Shadowhands): supply chain documentation connects Ironhold extraction to Shelkopolis dome additives — extends evidence 3 months', 'evidence');
        G.recentOutcomeType = 'success';
        G.investigationProgress = (G.investigationProgress||0) + 1;
      } else {
        G.lastResult = "She watches you for a long moment after you sit. Then she says she'll need another meeting before she shares anything substantive. She leaves the way someone leaves who has two other exits already identified.";
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  {
    label: "Ilve needs operational cover for a document transfer. She's offering the Ironhold ledger in exchange.",
    tags: ['ArcDeepening', 'Stealth', 'Risk'],
    xpReward: 90,
    condition: function() { return !!(G.flags && G.flags.shadowhands_ilve_contact && !G.flags.shadowhands_cover_resolved); },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(90, 'providing operational cover for Shadowhands document transfer');
      G.flags = G.flags || {};
      var result = rollD20('stealth', (G.skills.stealth||0) + Math.floor(G.level/3) + (typeof getEquipmentBonus==='function'?getEquipmentBonus('stealth'):0));
      if (result.total >= 13) {
        G.lastResult = "You take the eastern corridor approach and watch the Collegium checkpoint rotation for two hours before signaling clear. Ilve moves the document case through the secondary loading bay in eleven minutes. The Ironhold ledger she hands you afterward is water-damaged on the lower third — the important half is intact. The extraction quotas it records are forty percent higher than the officially filed outputs. The difference went somewhere. You now have a number to track.";
        G.flags.shadowhands_cover_resolved = true;
        G.flags.shadowhands_ironhold_ledger = true;
        addJournal('Shadowhands Ironhold ledger: extraction quotas 40% above filed outputs — excess unaccounted', 'evidence');
        G.recentOutcomeType = 'success';
        G.investigationProgress = (G.investigationProgress||0) + 1;
      } else {
        G.lastResult = "The checkpoint rotation shifted without notice. Ilve aborted and you both moved separately. She'll try again in two days through a different route. The ledger remains with her.";
        G.worldClocks = G.worldClocks || {};
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.recentOutcomeType = 'complication';
      }
    }
  },

  {
    label: "The Shadowhands know who authorized the Ironhold quota suppression. Ilve will tell you — if you've earned it.",
    tags: ['ArcFinale', 'Investigation', 'Decision'],
    xpReward: 110,
    condition: function() { return !!(G.flags && G.flags.shadowhands_ironhold_ledger && !G.flags.shadowhands_finale_done); },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(110, 'receiving Shadowhands final intelligence');
      G.flags = G.flags || {};
      var result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3) + (typeof getEquipmentBonus==='function'?getEquipmentBonus('lore'):0));
      if (result.total >= 12) {
        G.lastResult = "Ilve gives you a name: Overseer Torveld Mast, stationed at the Soreheim Transit Post for the past eight months. Not an architect of the operation — a mechanism. The authorization signatures on the suppressed quota reports all carry his registry stamp. He stamps what he is told to stamp. But the stamp is the link between the extraction numbers and the dome additive substitution chain. Ilve says: he will not come voluntarily. She does not say what she means by that. She doesn't need to.";
        G.flags.shadowhands_finale_done = true;
        G.flags.shadowhands_torveld_revealed = true;
        G.flags.stage2_faction_contact_made = true;
        addJournal('Torveld Mast (Overseer, Soreheim Transit Post) — authorization stamps link extraction quotas to dome substitution chain', 'evidence');
        G.investigationProgress = (G.investigationProgress||0) + 1;
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = "Ilve says the name is still being verified. Come back in a day. She's not lying — the pause is real. She just doesn't have enough yet to be certain.";
        G.recentOutcomeType = 'neutral';
      }
    }
  }

];

window.STAGE2_SHADOWHANDS_ARC = STAGE2_SHADOWHANDS_ARC;
