/**
 * MAGIC ARCHETYPE MIDSPINE
 * 3-node consequence chain — forbidden knowledge encounter
 * Condition: G.archetype.group === 'magic' AND G.stage === 1 AND G.stageProgress[1] >= 5
 * Global var: MAGIC_MIDSPINE_CHOICES
 */

const MAGIC_MIDSPINE_CHOICES = [

  // ——— NODE 1: THE DISCOVERY ———
  {
    label: "In a restricted archive section, you find a document that shouldn't exist — an unclassified copy of the Iceveil study with handwritten annotations in the margin. Study it or leave it.",
    tags: ['Midspine', 'Magic', 'Lore', 'Decision'],
    xpReward: 85,
    condition: function() {
      return G.archetype && G.archetype.group === 'magic'
        && G.stage === 1
        && G.stageProgress && (G.stageProgress[1] || 0) >= 5
        && !(G.flags && G.flags.magic_midspine_node1_complete);
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(85, 'studying the unsanctioned Iceveil copy');
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      const target = 11;

      if (result.total >= target) {
        G.lastResult = `The annotations are in a second hand — someone who understood the study well enough to add corrections and extensions in the margins. The handwriting matches no one in the official archive record. But the annotations extend the study's findings to a specific atmospheric compound configuration that appears in the Craftspire extraction logs. Someone else made this connection before you. They left this document for the next person who was looking.`;
        G.flags.magic_midspine_study_complete = true;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('discovery', 'Magic midspine: unsanctioned Iceveil copy with annotations extending findings to Craftspire configuration', `magic-midspine-1-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `You study the document but the marginal annotations are in a notation system you don't fully recognize — somewhere between standard academic notation and something personal. You take the key sections and leave the document in place.`;
        G.flags.magic_midspine_study_partial = true;
        G.recentOutcomeType = 'neutral';
      }
      G.flags.magic_midspine_node1_complete = true;
    }
  },

  // ——— NODE 2: THE CHOICE ———
  {
    label: "The forbidden knowledge is now yours. Disclose it through official channels — or protect it from institutional suppression by keeping it off the formal record.",
    tags: ['Midspine', 'Magic', 'Decision'],
    xpReward: 90,
    condition: function() {
      return G.archetype && G.archetype.group === 'magic'
        && G.stage === 1
        && G.stageProgress && (G.stageProgress[1] || 0) >= 5
        && G.flags && G.flags.magic_midspine_node1_complete
        && !(G.flags && G.flags.magic_midspine_node2_complete);
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(90, 'deciding on disclosure vs. protection of the forbidden knowledge');
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.total >= 13) {
        G.lastResult = `You file the formal disclosure through the Institute's independent review process — the same channel that Oslet uses. Official, documented, protected from single-point suppression. The filing triggers a review notification that goes to three separate committee members, including one who is not connected to the northern bloc. The knowledge is now in a system that can't be quietly extracted. But it's also visible.`;
        G.flags.magic_midspine_disclosed = true;
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
        G.worldClocks.reverence = (G.worldClocks.reverence || 0) + 1;
        addJournal('consequence', 'Magic midspine: forbidden knowledge disclosed through official channels — watchfulness increased', `magic-midspine-2-${G.dayCount}`);
      } else {
        G.lastResult = `You keep the study off the formal record. It's in the investigation network's distributed copy system — accessible to network members, invisible to institutional monitoring. You trade official protection for operational security. Whoever made the marginal annotations chose the same path. You're in the tradition of researchers who work around the system rather than through it.`;
        G.flags.magic_midspine_protected = true;
        G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
        addJournal('consequence', 'Magic midspine: forbidden knowledge protected outside official channels — follows path of original annotator', `magic-midspine-2-${G.dayCount}`);
      }
      G.flags.magic_midspine_node2_complete = true;
      G.recentOutcomeType = 'neutral';
    }
  },

  // ——— NODE 3: THE ANNOTATOR ———
  {
    label: "Trace the handwriting in the Iceveil study margins. The person who made the annotations is still alive — and still working. Find them.",
    tags: ['Midspine', 'Magic', 'Lore', 'NPC'],
    xpReward: 95,
    condition: function() {
      return G.archetype && G.archetype.group === 'magic'
        && G.stage === 1
        && G.stageProgress && (G.stageProgress[1] || 0) >= 5
        && G.flags && G.flags.magic_midspine_node2_complete
        && !(G.flags && G.flags.magic_midspine_node3_complete);
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(95, 'finding the anonymous annotator of the Iceveil study');
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};

      G.flags.magic_midspine_node3_complete = true;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `The notation system in the margins is a hybrid of two academic traditions — one from the Glasswake research community, one from the Mimolot Academy. The annotator trained in both. Cross-referencing those two institutions' alumni records against the timeframe of the annotations gives you a name: Dr. Hael Woss, last listed affiliation "independent research" — which is the euphemism used when someone has been quietly expelled from academic institutions without formal dismissal. They're in Shelkopolis. They've been there for eight months.`;
        G.flags.magic_midspine_annotator_found = true;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        if (!G.rivalId) G.rivalId = 'archivist_veld';
        addJournal('discovery', 'Magic midspine: annotator is Dr. Hael Woss — independent researcher in Shelkopolis 8 months, trained at Glasswake and Mimolot', `magic-midspine-3-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The notation system is specific but the cross-referencing requires institutional records you don't have access to yet. In Shelkopolis you'll have better tools. The annotator will wait — they've been waiting since they left the document.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  }

];

window.MAGIC_MIDSPINE_CHOICES = MAGIC_MIDSPINE_CHOICES;
