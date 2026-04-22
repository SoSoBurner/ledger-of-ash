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
        G.lastResult = `The main text is standard Iceveil — licensed Collegium notation, nothing unusual. The margin work is different. Smaller, denser, using a shorthand that splits between two academic traditions. The annotations don't dispute the study; they extend it, forward three atmospheric compound configurations that the original authors stopped short of. One of those configurations appears verbatim in the Craftspire extraction logs you flagged two weeks ago. Someone reached this before you. They left the document in a location where it would be found by the next person who was looking for the same thing.`;
        G.flags.magic_midspine_study_complete = true;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('discovery', 'Magic midspine: unsanctioned Iceveil copy with annotations extending findings to Craftspire configuration', `magic-midspine-1-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The main text is accessible — standard licensed notation, Collegium-formatted. The marginal annotations are not. The shorthand is consistent but unfamiliar, somewhere between two academic traditions you know separately but haven't seen combined. You copy the passages you can parse and leave the document as you found it. The sections you've taken are valuable. The parts you couldn't read may be more so.`;
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
        G.lastResult = `You file through the Institute's independent review channel — the same mechanism Oslet uses for contested submissions. The filing timestamps automatically and routes to three committee members simultaneously; no single reviewer can suppress it without leaving a record of the suppression attempt. One of the three is not connected to the northern bloc. The study's findings are now documented, trackable, and visible to anyone who looks at the review queue. That is the trade you've made.`;
        G.flags.magic_midspine_disclosed = true;
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
        G.worldClocks.reverence = (G.worldClocks.reverence || 0) + 1;
        addJournal('consequence', 'Magic midspine: forbidden knowledge disclosed through official channels — watchfulness increased', `magic-midspine-2-${G.dayCount}`);
      } else {
        G.lastResult = `You don't file. You copy the study into the network's distributed archive — three nodes, no central location, accessible only to members with the right index key. Institutional monitoring has no view of it. What you give up is the legal protection of an official submission; what the Collegium can't find, it also can't attribute to you. The original annotator made this same choice. The document was their way of passing the work forward without surfacing it. You've joined that method.`;
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
        G.lastResult = `The shorthand breaks into two layers: one from the Glasswake field research tradition, one from Mimolot Academy's theoretical notation. Rare combination — both institutions train for different problems. You pull alumni records for researchers active in both programs during the relevant period. Four names. Three have verifiable institutional affiliations that don't fit the document's secrecy. The fourth — Dr. Hael Woss — carries the listing "independent research," the classification used when someone has been removed from an institution without a formal dismissal on record. Current address: Shelkopolis. Eight months at the same location, which is either stability or waiting.`;
        G.flags.magic_midspine_annotator_found = true;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        if (!G.rivalId) G.rivalId = 'archivist_veld';
        addJournal('discovery', 'Magic midspine: annotator is Dr. Hael Woss — independent researcher in Shelkopolis 8 months, trained at Glasswake and Mimolot', `magic-midspine-3-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The shorthand is consistent and specific, but tracing it requires alumni records from two institutions — and the access you have here doesn't extend that far. You identify the two academic traditions in the notation, narrow the field to a plausible timeframe, and hit the boundary of what's available. In Shelkopolis the Mimolot archive maintains a public-access index. That's where the cross-reference closes. The annotator is not going anywhere — whoever left the document planted it to be found, which means they're waiting on the next move.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  }

];

window.MAGIC_MIDSPINE_CHOICES = MAGIC_MIDSPINE_CHOICES;
