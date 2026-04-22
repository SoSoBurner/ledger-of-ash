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
      G.lastResult = `The ${venue} of ${loc.name} has its own tempo. You stop trying to track every thread and let the room come to you. By the third hour you know three faces by their habits. One woman orders the same thing twice with the same hand gesture; another always checks the door. A merchant at the near table goes quiet mid-sentence when someone across the room names the Warden Order. His conversation partner doesn't miss a beat. Neither does the merchant. They've both practiced that recovery.`;
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
      G.lastResult = `You finish the work and don't wait to be thanked. The ${person} watches you go and says your name to the next person who asks. By evening you've been mentioned in three conversations you weren't part of. Usefulness is its own currency in ${loc.name} — visible, unthreatening, and easier to trust than a stranger asking questions.`;
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
      G.lastResult = `${companion} is more relaxed with food in front of them. They talk about the district's seasons, a family member who works the docks, a neighbor who left without explanation last spring. You don't ask directly about anything. By the time the bread is gone, they've told you three things about ${loc.name} that no notice board would carry. They pause before answering a question about the northern routes — not evasion, exactly, but the careful kind of hesitation that means they've been warned about something.`;
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
      G.lastResult = `After four days, the innkeeper pours your drink before you ask. The corner table holds your pack without question when you step out. Two regulars nod at you the way they nod at the wall sconces — automatic, unremarkable. ${loc.name} has stopped treating you as a newcomer. Fixtures are trusted because they're expected. They're also noticed more sharply when they move out of place.`;
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
      G.lastResult = `The small rules of ${loc.name} emerge through friction: a greeting that works in the market fails in the residential lanes; a direct question to a stranger reads as aggression where a pause and a nod reads as invitation. You stop making those errors. One pattern stays with you — nobody names the northern traders by region. They say "outside suppliers," even in casual talk, even when the geography would make the meaning clearer. That's not laziness. That's a habit formed under pressure.`;
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
      G.lastResult = `Low stakes sharpen different edges than high ones. An hour of ${skillName} work in a quiet corner of the district — drills, repetition, the small corrections that only show up when nothing's at risk. Someone stops to watch for three full minutes before walking on. In ${loc.name}'s current climate, visible competence draws attention even when it's benign. You note who stopped. You note that they said nothing.`;
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
      G.lastResult = `Teaching ${skillName} means finding the words for things you've only done by instinct. The student is slow at first and then suddenly isn't, which is how it always goes. They're better than they were. You're sharper for having explained it. Midway through, they mention the last person who taught here vanished about a month ago — "institutional reorganization" is the phrase their neighbor used. They say it without particular emphasis, which is its own kind of emphasis.`;
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
      G.lastResult = `The lane narrows twice before opening onto the ${feature}. Nobody else is using it. The stone is old and the proportions are off in the way of structures that were built for a purpose nobody remembers. You stay long enough to map your exits and mark it in your working memory. On the wall nearest the entrance: three ash-marks in the old mourning pattern, drawn within the last week. Fresh enough that the edges haven't softened.`;
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
      G.lastResult = `${loc.name} has a circulatory system. Foot traffic pools in the morning market lanes and drains through the residential blocks by midday. Three streets that look like through-routes aren't — the crowd bends away from them without acknowledging it. One intersection goes quiet every afternoon at the same hour. Not empty, just thin — and the people who use it at that hour walk faster than the street warrants. That's not coincidence. That's a population that's learned something about being counted.`;
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
      G.lastResult = `You eat, sleep past dawn, and don't move quickly when you wake. The body settles. The accumulated small decisions of the last several days stop pressing for attention. By afternoon, the inn's common room is quieter than it was yesterday — three fewer regulars, a gap in the usual noise that the remaining voices don't quite fill. Small changes accumulate in ${loc.name}. You're rested enough now to notice them properly.`;
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
        G.lastResult = `You appear interested in neither faction's pitch and both interpret that differently — one reads it as alignment with the other, one reads it as independence worth courting. You let both interpretations run. What emerges from watching their maneuvering is the actual disagreement under the stated one: not resources or territory, but access — who controls which routes, and who decides when that changes. Neither faction names it directly. They've stopped naming things directly in ${loc.name}.`;
        gainXp(30, 'neutral intelligence gathering');
        addJournal('neutrality', `Mapped faction tensions in ${loc.name}`, `faction-map-${G.dayCount}`);
      } else {
        G.lastResult = `The power structure in this locality runs through one body with no real competition. The absence of visible friction is its own data point. Single authority means disputes are absorbed rather than aired — you won't hear about conflicts, you'll see their aftermath. A district this unified usually has significant pressure applied somewhere you can't see yet.`;
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
      G.lastResult = `You ${act} and leave before anyone asks. By evening someone notices and mentions it to a neighbor. The neighbor shrugs — they don't know who did it either. The place is incrementally better by one small thing. In ${loc.name} right now, anonymous improvements are rarer than they should be. Generosity with no name attached makes people uncertain in a city where every visible act gets categorized and filed.`;
      gainXp(30, 'quiet improvement');
      G.recentOutcomeType = 'good';
      maybeStageAdvance();
    }
  }
];

// Export to window
window.STAGE1_ADDITIONAL_ENRICHED_CHOICES = STAGE1_ADDITIONAL_ENRICHED_CHOICES;
