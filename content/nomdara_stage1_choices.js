/**
 * NOMDARA STAGE 1 CHOICES
 * 2 services only at Stage 1 (trade and training unlock at Stage 2)
 * World-color rumors only — no plot-adjacent at Stage 1
 * Global var: NOMDARA_STAGE1_CHOICES
 */

const NOMDARA_STAGE1_CHOICES = [

  // ——— SERVICE 1: HEALING ———
  {
    label: "Speak to Sable — wound or fatigue removal. She finds the route and she finds what ails you.",
    tags: ['Nomdara', 'Healing', 'Service'],
    xpReward: 55,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(55, 'receiving Nomdara healing from Sable');
      if (!G.flags) G.flags = {};

      const hasWound = G.wounds && G.wounds.length > 0;
      const fatiguePenalty = G.fatigue && G.fatigue > 0;

      if (hasWound) {
        const removed = G.wounds.shift();
        G.lastResult = `Sable doesn't ask what happened. She cleans her hands, selects a compress without hesitation, and gets to work. The wound — ${removed} — closes under clean binding. When she's done she steps back and wipes the blade of her tool on a grey cloth. "Don't test it tonight," she says. Not a question. She turns back to her fire before you answer.`;
        G.recentOutcomeType = 'success';
        addJournal('Nomdara healing: Sable removed wound — Caravan is mobile, encountered at current location', 'discovery', `nomdara-s1-heal-${G.dayCount}`);
      } else if (fatiguePenalty) {
        G.fatigue = Math.max(0, (G.fatigue || 0) - 1);
        G.lastResult = `Sable studies your posture before she speaks. "Nothing torn," she says. "You're running on less than you think." She presses a small sealed flask into your palm — the compound is tasteless and takes effect before you've capped it. The ground feels steadier. "Save the second half for the pass," she says. She does not explain which pass.`;
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `Sable runs her thumb along your wrist and checks your eyes in the firelight. "Nothing to treat," she says. She sets her kit aside without ceremony and picks up the clay cup she left on the stone. The matter is closed.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  // ——— SERVICE 2: WORLD-COLOR RUMOR ———
  {
    label: "Purchase a rumor from Lorn. He does not sell certainty. He sells what the road has heard.",
    tags: ['Nomdara', 'Information', 'Service'],
    xpReward: 60,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(60, 'purchasing world-color rumor from Lorn');
      if (!G.flags) G.flags = {};

      const rumors = [
        "Three travelers from the eastern highlands passed through last week. All three were heading to Shelkopolis. None of them gave the same reason.",
        "The ash fall is heavier north of the mountain line this season. Old settlement records note that similar patterns preceded a significant pressure event sixty years ago. The records don't say what kind.",
        "A settlement in the Soreheim borderlands abandoned its southern road this spring — rerouted all traffic through the mountain pass, which is twice as long. No one official has explained why the shorter road is now avoided.",
        "Wren says the route patterns are changing — that caravans are avoiding the outer districts of large cities and camping farther out instead. She reads it as a sign. She always reads things as signs. But sometimes she's right.",
        "Someone is buying old maps of Shelkopolis's underground freight infrastructure. Not new maps — specifically the pre-renovation surveys from forty years ago. A cartographer in Guildheart mentioned it, puzzled.",
        "A herbalist in the Verdant Row told Lorn that three of her regular customers moved out of the district last month. Not relocated — moved away. They all lived within two blocks of a dome access terminal.",
        "The glasswake formations in the north are larger this year. Travelers who've seen them before say the formations grow when the ambient atmospheric compound concentration increases. Nobody official studies them anymore.",
        "Lorn trades at the Granary Steps twice a year. This last visit, the humidity intake workers were different. All of them new, all in the past four months. The previous workers couldn't be found for comment.",
        "Wren counted eight new structures within the Shelkopolis outer districts in the past year — all listed as maintenance facilities, all within three hundred meters of a dome access terminal.",
        "A sailor in Cosmoria told Lorn that maritime manifest categories have grown by three in the past fourteen months. New categories are unusual. Three new ones in a year is unprecedented."
      ];

      const rumor = rumors[Math.floor(Math.random() * rumors.length)];
      G.lastResult = `Lorn pockets your coin without a count. He leans forward slightly — not a whisper, a reduction in volume. "${rumor}" He straightens, pulls his ledger back into position, and doesn't look up again.`;
      G.recentOutcomeType = 'neutral';
    }
  },

  // ——— MEET NOMDARA CORE CAST ———
  {
    label: "Speak to the Nomdara Caravan's route shaman, Wren. She reads ash and distance the same way.",
    tags: ['Nomdara', 'Social', 'NPC'],
    xpReward: 55,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(55, 'speaking with Wren, Nomdara route shaman');
      if (!G.flags) G.flags = {};
      G.flags.met_wren_nomdara = true;

      const location = G.location || 'here';
      const arch = G.archetype && G.archetype.group;

      let wrenText = '';
      if (arch === 'magic') {
        wrenText = `"You carry something theoretical," she says. "Not in your pack — in your reasoning. A gap between what you've proven and what you know is true." She marks a direction in the ash at her feet. "The gap closes in a city with water on three sides."`;
      } else if (arch === 'combat') {
        wrenText = `"You're looking for something to fight," she says, not unkindly. "The thing worth fighting is patient. You'll meet it in a city that holds its breath."`;
      } else if (arch === 'stealth') {
        wrenText = `"You already know more than you should," she says. "The question isn't what you know. The question is what to do with knowing it before the people who don't want you to know it realize you do."`;
      } else {
        wrenText = `"The route ahead changes at a city you haven't reached yet," she says. "Not the road — the meaning of the road. What you're doing now becomes something different when you get there."`;
      }

      G.lastResult = `Wren sits with her back to the caravan, a piece of charred wood turning slowly in her fingers. She doesn't look at you when you approach. ${wrenText} The charred wood leaves a mark on her palm she doesn't wipe away.`;
      G.recentOutcomeType = 'neutral';
    }
  },

  // ——— LEAVE ———
  {
    label: "Leave the Nomdara Caravan. The road continues.",
    tags: ['Nomdara', 'Leave'],
    xpReward: 0,
    fn: function() {
      G.telemetry.turns++;
      if (!G.flags) G.flags = {};
      G.flags.nomdara_last_visit_locality = G.location || 'unknown';
      G.lastResult = `The caravan's lanterns shrink behind you, amber against the dark. A dog barks once at the edge of camp and stops. The road ahead has the particular silence of open ground after a settlement — a quiet that comes with distance, not with absence.`;
      G.recentOutcomeType = 'neutral';
    }
  }

];

window.NOMDARA_STAGE1_CHOICES = NOMDARA_STAGE1_CHOICES;
