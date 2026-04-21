/**
 * STAGE 1 ADDITIONAL ENRICHED CHOICES - UNIQUE PATHS
 * 
 * This file adds more Stage 1 choice variety to prevent looping and ensure
 * players always have 7-9 distinct options that don't repeat common themes.
 * 
 * Focuses on:
 * - Local mystery paths (not spoiling institutional arc)
 * - Personal connection chains (NPCs, rumors, relationships)
 * - Observation without investigation (safer alternatives)
 * - Relationship building (faction neutrality paths)
 * - Character development (personal moments, skill practice)
 * - Safe haven establishment (non-combat discovery)
 */

const STAGE1_ADDITIONAL_ENRICHED_CHOICES = [
  // ========== PERSONAL CONNECTION PATHS (Non-investigation) ==========
  {
    label: "Spend time at a local gathering place — markets, taverns, or public squares — just listening and being present",
    tags: ['Safe', 'Social', 'Observation', 'Passive'],
    xpReward: 30,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      const loc = getLocality(G.location);
      const venues = ['market', 'tavern', 'public square', 'plaza', 'square'];
      const venue = pick(venues, G.dayCount);
      G.lastResult = `Hours pass in the ${venue} of ${loc.name}. The rhythms become familiar. Conversations layer over each other. You recognize three regulars. One waves on the third time seeing you. The place starts to feel less foreign. A merchant at the next table lowers his voice when the Warden Order is mentioned — a reflex, not a choice.`;
      gainXp(30, 'community presence');
      G.recentOutcomeType = 'social';
      maybeStageAdvance();
    }
  },

  {
    label: "Offer help to a local in need — repair work, heavy lifting, or simple assistance — no questions asked",
    tags: ['Good', 'Safe', 'Community', 'Action'],
    xpReward: 30,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      const loc = getLocality(G.location);
      const tasks = ['repair a fence', 'move supplies', 'carry goods', 'fix equipment', 'help with construction'];
      const task = pick(tasks, G.dayCount);
      const person = pick(['local merchant', 'homeowner', 'shopkeeper', 'laborer'], G.dayCount + 1);
      G.lastResult = `The ${person} notices and remembers. By evening, three people you helped have mentioned your name to others. Small reputation building starts quietly. The city rewards visible usefulness — it's the invisible kind that gets people watched.`;
      gainXp(30, 'community good faith');
      addJournal('community', `Helped locals in ${loc.name}`, `help-${G.location}-${G.dayCount}`);
      G.recentOutcomeType = 'community';
      maybeStageAdvance();
    }
  },

  {
    label: "Share a meal with someone you've met — offer to pay, or cook together — build a real connection",
    tags: ['Social', 'Safe', 'Relationship', 'Good'],
    xpReward: 30,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      const loc = getLocality(G.location);
      const companions = ['a local artisan', 'a fellow traveler', 'a tavern regular', 'a shop owner'];
      const companion = pick(companions, G.dayCount);
      G.lastResult = `Sharing food dissolves the distance. ${companion} talks about their life, their family, what they fear. You listen. By the meal's end, there's trust between you. Not friendship yet, but the foundation for it. They pause once before answering a question about the northern routes — the pause itself says more than the answer.`;
      gainXp(30, 'genuine connection');
      addJournal('relationship', `Built trust through shared meal in ${loc.name}`, `meal-${G.location}-${G.dayCount}`);
      G.recentOutcomeType = 'social';
      G.stageProgress[1]++;
      maybeStageAdvance();
    }
  },

  // ========== SAFE HAVEN ESTABLISHMENT ==========
  {
    label: "Establish a regular pattern — same bed, same tavern corner, same time each day — become a fixture",
    tags: ['Safe', 'Routine', 'Establishment'],
    xpReward: 30,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      const loc = getLocality(G.location);
      G.lastResult = `Routine is refuge. The innkeeper knows your order. The corner table is yours by default. The same faces nod in greeting. The place stops being a waystation and starts feeling like a place where you belong. A fixture gets noticed when it moves — and gets noticed even more when it asks questions.`;
      gainXp(30, 'establishing presence');
      G.currentSafeZone = `favorite corner in a ${loc.name} tavern`;
      addJournal('establishment', `Established routine in ${loc.name}`, `routine-${G.location}-${G.dayCount}`);
      G.recentOutcomeType = 'safe';
      maybeStageAdvance();
    }
  },

  {
    label: "Learn the local customs — greetings, taboos, local superstitions — respect the place as it is",
    tags: ['Safe', 'Cultural', 'Observation'],
    xpReward: 30,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      const loc = getLocality(G.location);
      G.lastResult = `You start noticing. The way people avoid certain streets at dusk. The greeting style that matters. The hand gesture that's offensive despite your intentions. Understanding emerges slowly. Respect follows. One taboo stands out: nobody names the northern traders by region anymore — they just say "outside suppliers," as if the geography itself is under pressure.`;
      gainXp(30, 'cultural awareness');
      addJournal('observation', `Learned local customs in ${loc.name}`, `customs-${G.location}-${G.dayCount}`);
      G.recentOutcomeType = 'observe';
      maybeStageAdvance();
    }
  },

  // ========== SKILL PRACTICE (No risk, pure development) ==========
  {
    label: "Practice your primary skill in a low-stakes setting — sparring, debate, craft work, performance",
    tags: ['Safe', 'Development', 'Practice'],
    xpReward: 30,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      const arch = getArchetype(G.archetype) || {};
      const skillName = arch.focus || 'combat';
      G.skills[skillName] = (G.skills[skillName] || 0) + 2;
      G.lastResult = `Hours of practice sharpen your edge. No stakes, no pressure, just refinement. Your ${skillName} skill grows measurably. A passerby watches longer than politely warranted — in a city under institutional pressure, visible competence is its own form of declaration.`;
      gainXp(30, `skill refinement - ${skillName}`);
      addJournal('training', `Practiced ${skillName} in ${getLocality(G.location).name}`, `practice-${skillName}-${G.dayCount}`);
      G.recentOutcomeType = 'practice';
      maybeStageAdvance();
    }
  },

  {
    label: "Teach someone a skill you know — mentoring builds understanding and local reputation",
    tags: ['Good', 'Teaching', 'Community'],
    xpReward: 30,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      const loc = getLocality(G.location);
      const arch = getArchetype(G.archetype) || {};
      const skillName = arch.focus || 'combat';
      G.skills[skillName] = (G.skills[skillName] || 0) + 1;
      G.lastResult = `Teaching forces clarity. By explaining your ${skillName} to someone eager, you deepen your own mastery. They improve slowly. You improve faster by understanding what you know. The student mentions offhandedly that the last person who taught here left suddenly — "institutional reorganization," they were told, which could mean anything.`;
      gainXp(30, `teaching - ${skillName}`);
      addJournal('teaching', `Mentored someone in ${skillName} in ${loc.name}`, `teach-${skillName}-${G.dayCount}`);
      G.recentOutcomeType = 'teaching';
      G.stageProgress[1]++;
      maybeStageAdvance();
    }
  },

  // ========== LOCAL DISCOVERY (Not investigation, just stumbling across things) ==========
  {
    label: "Explore somewhere you haven't been yet — a side street, a neighborhood corner, just wander and notice",
    tags: ['Safe', 'Exploration', 'Discovery'],
    xpReward: 30,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      const loc = getLocality(G.location);
      const features = ['hidden courtyard', 'small shrine', 'abandoned building', 'narrow alley', 'public garden', 'hidden plaza'];
      const feature = pick(features, G.dayCount);
      G.lastResult = `You wander without purpose. The ${feature} emerges. It's peaceful. It might be useful later. Or it might just be beautiful. Either way, the place is less blank now. Someone has recently added ash-marks to the wall nearby — the old mourning signal, but fresh, placed within the last week.`;
      gainXp(30, 'local familiarity');
      addJournal('exploration', `Discovered ${feature} in ${loc.name}`, `explore-${G.location}-${G.dayCount}`);
      G.recentOutcomeType = 'explore';
      maybeStageAdvance();
    }
  },

  {
    label: "Watch how people move through the location — crowd patterns, traffic flows, how people avoid each other",
    tags: ['Safe', 'Observation', 'Tactical'],
    xpReward: 30,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      const loc = getLocality(G.location);
      G.lastResult = `Motion reveals structure. Crowds thin here. Avoid that corner. People rush through this plaza. They linger in that quarter. The place has veins. You start learning them without asking questions. One intersection clears unnaturally fast at certain hours — not fear, exactly, but the practiced avoidance of people who know they're being counted.`;
      gainXp(30, 'spatial awareness');
      G.threatAssessment = true;
      addJournal('observation', `Understood crowd flows in ${loc.name}`, `flows-${G.location}-${G.dayCount}`);
      G.recentOutcomeType = 'observe';
      maybeStageAdvance();
    }
  },

  // ========== PERSONAL RECOVERY ==========
  {
    label: "Take time for yourself — rest, reflection, journal your thoughts — process what you've learned",
    tags: ['Safe', 'Recovery', 'Personal'],
    xpReward: 30,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.hp = Math.min(G.maxHp, G.hp + 5);
      G.fatigue = Math.max(0, G.fatigue - 2);
      G.lastResult = `Quiet time heals more than you expected. The weight lightens. HP restored. Your mind feels clearer. In the stillness you notice the inn's common room has fewer voices than yesterday — another small subtraction in a city that's been losing things slowly.`;
      gainXp(30, 'self care');
      addJournal('personal', 'Took time for reflection and recovery', `rest-${G.dayCount}`);
      G.recentOutcomeType = 'rest';
      maybeStageAdvance();
    }
  },

  // ========== RELATIONSHIP NEUTRALITY ==========
  {
    label: "Observe multiple factions without committing to any — understand who's who without taking sides yet",
    tags: ['Observation', 'Neutral', 'Intelligence'],
    xpReward: 30,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      const loc = getLocality(G.location);
      const factions = (window.LOCALITY_FACTIONS || {})[G.location] || [];
      if (factions.length > 1) {
        G.lastResult = `You watch without announcing allegiance. The factions eye each other through you. By staying neutral, you learn what each fears from the other. The pressure point becomes visible. Both factions have grown quieter about naming their grievances aloud — institutional surveillance has taught them to argue in gestures and silences.`;
        gainXp(30, 'neutral intelligence gathering');
        addJournal('neutrality', `Mapped faction tensions in ${loc.name}`, `faction-map-${G.dayCount}`);
      } else {
        G.lastResult = `The locality is less divided than you expected. A single power structure dominates. That's useful information on its own. A single unchallenged authority is its own kind of warning — consensus this clean usually has ash underneath it.`;
        gainXp(30, 'power structure analysis');
      }
      G.recentOutcomeType = 'observe';
      maybeStageAdvance();
    }
  },

  // ========== QUIET ACTION ==========
  {
    label: "Do something small and unexpected for the place — anonymous kindness, small repair, quiet improvement",
    tags: ['Good', 'Quiet', 'Safe'],
    xpReward: 30,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      const loc = getLocality(G.location);
      const acts = ['fix a broken sign', 'clean a street corner', 'leave food for stray animals', 'repair a bench'];
      const act = pick(acts, G.dayCount);
      G.lastResult = `The ${act}. No one notices. Or they do but say nothing. Later, someone asks who did it. No one knows. The place feels slightly better. That's enough. Small anonymous repairs are rarer here than they should be — in a watched city, even generosity learns to hide.`;
      gainXp(30, 'quiet improvement');
      G.recentOutcomeType = 'good';
      maybeStageAdvance();
    }
  }
];

// Export to window
window.STAGE1_ADDITIONAL_ENRICHED_CHOICES = STAGE1_ADDITIONAL_ENRICHED_CHOICES;
