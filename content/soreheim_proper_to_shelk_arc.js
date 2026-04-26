/**
 * SOREHEIM PROPER → SHELKOPOLIS TRAVEL ARC
 * Journey from the Iron Compact's shadow to Stage 2 hub
 * Narrative: Quota documentation, displacement evidence, intelligence carrying risk
 * Trigger (soft): G.investigationProgress >= 5 | Trigger (hard): G.level >= 6
 * 12 choices — departure, road complications, soft-trigger deepening, arrival, finale
 */

const SOREHEIM_PROPER_TO_SHELK_ARC = [

  // ——— DEPARTURE (choices 1-3) ———

  // 1. DECIDING TO LEAVE
  {
    label: "The Compact's quota records are damning enough to carry south. Prepare to leave Soreheim Proper.",
    tags: ['ArcDeparture', 'Investigation', 'Decision'],
    xpReward: 65,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(65, 'preparing to carry evidence south');
      if (!G.flags) G.flags = {};

      if (!G.worldClocks) G.worldClocks = {};
      G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;

      G.lastResult = `You copy the most critical quota ledger entries onto loose paper — compact, deniable. The originals stay in the files where they belong. Anyone looking for tampering will find none. You, though, carry the pattern in your head and on your person. Soreheim's labor machinery grinds on behind you as you pack. Somewhere behind you, a record of your departure has already been made.`;
      G.recentOutcomeType = 'neutral';
      addJournal('decision', 'Left Soreheim with quota evidence', `soreheim-departure-${G.dayCount}`);
    }
  },

  // 2. EARLY ROAD: IRON COMPACT CHECKPOINT
  {
    label: "An Iron Compact checkpoint stands on the southern road. Find a way through without triggering inspection.",
    tags: ['ArcRoad', 'Stealth', 'Risk'],
    xpReward: 75,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(75, 'passing the Compact checkpoint');
      if (!G.flags) G.flags = {};

      const result = rollD20('finesse', (G.skills.stealth || 0) + Math.floor(G.level / 3));
      const target = 12;

      if (result.isCrit) {
        G.lastResult = `You time your crossing with the worker shift rotation — the checkpoint guards are managing a crowd of thirty and have no eyes for a single traveler carrying papers consistent with the documentation category your bundle resembles. You're through before anyone asks.`;
        G.flags.soreheim_arc_checkpoint_clean = true;
        G.recentOutcomeType = 'success';
      } else if (result.total >= target) {
        G.lastResult = `The checkpoint guard gives your papers a cursory look. "Research transit," she reads aloud, then waves you past. She's seen too many academic transfers to care. Your hands don't shake until you're a hundred meters down the road.`;
        G.flags.soreheim_arc_checkpoint_clean = true;
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The guard holds your papers longer than comfortable. "What's the research for?" You give the name of a Shelkopolis institute — plausible, untraceable. He stamps you through but adds a note to his ledger. Your name is now in a Compact checkpoint log.`;
        if (!G.worldClocks) G.worldClocks = {};
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
        G.recentOutcomeType = 'complication';
      }
    }
  },

  // 3. ROAD ENCOUNTER: DISPLACED WORKER
  {
    label: "A worker on the road south carries the same kind of bundle you do — but larger. She was displaced last month.",
    tags: ['ArcRoad', 'Social', 'NPC'],
    xpReward: 70,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(70, 'encountering displaced worker on the road');
      if (!G.flags) G.flags = {};

      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      const target = 10;

      if (result.total >= target) {
        G.lastResult = `Her name is Ossa. Third-generation quarry cutter, let go six weeks ago when the new quota regime made her output "structurally insufficient." She has names — nine others from her shift alone, each dismissed on the same day using the same language. She gives you the dismissal notices. "They're all the same word for word," she says. "That's not a coincidence. That's a template."`;
        G.flags.met_ossa_displaced = true;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('Ossa: dismissals follow identical template across shifts', 'discovery', `soreheim-ossa-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `She's wary and doesn't give her name. "There's nothing to find," she says, and the way she says it tells you someone has told her that specifically. She walks faster. You let her go.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  // ——— SOFT TRIGGER — inv>=5 deepening (choices 4-6) ———

  // 4. PATTERN RECOGNITION (available when investigationProgress >= 5)
  {
    label: "The pattern clicks into full shape. Everything from Soreheim connects to something larger. Consider what you're actually carrying.",
    tags: ['ArcDeepening', 'Investigation', 'Lore'],
    xpReward: 80,
    condition: function() { return (G.investigationProgress || 0) >= 5; },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(80, 'synthesizing Soreheim evidence into larger pattern');
      if (!G.flags) G.flags = {};
      if (!G.investigationProgress) G.investigationProgress = 0;
      G.investigationProgress++;

      const arch = G.archetype && G.archetype.group;
      if (arch === 'magic') {
        G.lastResult = `The knowledge-pattern assembles itself the way theory always does — wrong components don't fit. But these components fit perfectly. Quota escalation forces displacement. Displacement empties a workforce. An empty workforce can't document what happens next. Whatever is coming into or through Soreheim, it needs an unmanned operation. The quota system isn't failing — it's working exactly as designed.`;
      } else if (arch === 'combat') {
        G.lastResult = `You've seen ground cleared before operations before. Not to make room for people — to remove witnesses. The quota escalation is the same pattern: systematic, timed, complete. Someone is clearing Soreheim's worker memory before an operation concludes. You've seen this in garrison rotations. You know what it means.`;
      } else if (arch === 'stealth') {
        G.lastResult = `Every element of this operation is designed to disappear behind a legitimate face. Quota management. Administrative efficiency. Normal personnel turnover. Each piece is explainable alone. Together they form a mechanism for removing human observation from whatever comes next. Whoever designed this understands operational security.`;
      } else {
        G.lastResult = `The pieces align when you stop thinking about them separately. Quota escalation — displacement — unmanned operation. Someone is clearing the workforce to remove eyes from Soreheim at a specific time. The timing connects to every other irregularity you've found. Shelkopolis is where this thread leads.`;
      }
      G.flags.soreheim_arc_pattern_recognized = true;
      addJournal('Workforce clearance is pre-operational preparation', 'discovery', `soreheim-pattern-${G.dayCount}`);
      G.recentOutcomeType = 'success';
    }
  },

  // 5. MIDPOINT: COURIER CONTACT ON THE SOUTHERN ROAD
  {
    label: "A courier heading north tries to press a sealed letter into your hands. Wrong person, or testing you?",
    tags: ['ArcDeepening', 'Investigation', 'Risk'],
    xpReward: 75,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(75, 'evaluating suspicious courier contact');

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));
      const target = 13;

      if (result.total >= target) {
        G.lastResult = `The seal is Iron Compact — but the wax impression is one designation off from authentic. Someone made this in a hurry or without access to a real Compact seal kit. You decline the letter and keep walking. Behind you, the courier turns down a side path rather than continuing north. He was testing the route, not delivering to you.`;
        if (!G.worldClocks) G.worldClocks = {};
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
        addJournal('consequence', 'False courier on the southern road — route is being monitored', `soreheim-arc-courier-${G.dayCount}`);
        G.recentOutcomeType = 'complication';
      } else {
        G.lastResult = `You take the letter by instinct and only realize afterward that wasn't your name on the front. The courier is already gone. The letter is sealed. You don't open it — it's not yours. But now you're carrying something you can't account for if stopped.`;
        if (!G.worldClocks) G.worldClocks = {};
        G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
        G.recentOutcomeType = 'complication';
      }
    }
  },

  // 6. ROAD CAMP: IRON COMPACT LOGISTICS OFFICER
  {
    label: "A logistics officer eating alone at the road camp. She's not in uniform. She's watching the road.",
    tags: ['ArcDeepening', 'Social', 'Risk'],
    xpReward: 75,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(75, 'approaching the off-duty logistics officer');
      if (!G.flags) G.flags = {};

      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      const target = 14;

      if (result.isCrit) {
        G.lastResult = `Her name is Vael. She's been watching the southern road for three weeks — not on orders, on her own time. "The checkpoint logs don't match the manifest totals," she tells you quietly. "Someone is moving weight south that isn't declared. I've been trying to figure out who's authorizing it." She shares two manifest dates. They match your quota anomaly windows exactly.`;
        G.flags.met_vael_logistics = true;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('Vael: undeclared weight moving south matches quota anomaly dates', 'discovery', `soreheim-arc-vael-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else if (result.total >= target) {
        G.lastResult = `She's polite but careful. You share enough to establish you're heading to Shelkopolis with questions, not answers. She says only: "Whatever you think you found, it's been moving for longer than you know." She doesn't offer her name.`;
        G.recentOutcomeType = 'neutral';
      } else {
        G.lastResult = `She clocks you as someone carrying something and her posture changes. Not hostile — professional. She returns to watching the road. You've flagged yourself as a carrier without establishing trust.`;
        if (!G.worldClocks) G.worldClocks = {};
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
        G.recentOutcomeType = 'complication';
      }
    }
  },

  // ——— ARRIVAL APPROACH (choices 7-9) ———

  // 7. OUTER DISTRICT THRESHOLD
  {
    label: "Shelkopolis outer district. The pressure gradient Letha Dawnsilk described is faint here but present. You feel it.",
    tags: ['ArcArrival', 'Survival', 'Atmosphere'],
    xpReward: 70,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(70, 'entering Shelkopolis outer district');
      if (!G.flags) G.flags = {};
      if (!G.investigationProgress) G.investigationProgress = 0;
      G.investigationProgress++;

      const result = rollD20('vigor', (G.skills.survival || 0) + Math.floor(G.level / 3));
      const target = 10;

      if (result.total >= target) {
        G.lastResult = `The outer district's air is different from the road — not wrong yet, but carrying something. A faint brassiness in the back of the throat at deep inhale. You've read about atmospheric precursors. This is what the Plumes End outpost reports described as "early-stage gradient exposure." The dome infrastructure visible on the skyline is where it converges.`;
        G.flags.soreheim_arc_sensed_gradient = true;
        addJournal('Outer district atmospheric gradient — early stage per Dawnsilk report pattern', 'discovery', `soreheim-arc-gradient-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The outer district is dense and loud and your senses are overwhelmed before they can calibrate. Shelkopolis at this end is not quiet. You find a cheap room and sleep. In the morning you'll know where to start.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  // 8. FIRST CONTACT: SHELKOPOLIS INVESTIGATION NETWORK
  {
    label: "A contact passed to you before you left Soreheim — 'find the woman who keeps the unregistered ledger near the Ironspool Ward.' You have an address.",
    tags: ['ArcArrival', 'Social', 'NPC'],
    xpReward: 80,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(80, 'making first contact in Shelkopolis investigation network');
      if (!G.flags) G.flags = {};

      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      const target = 12;

      if (result.total >= target) {
        G.lastResult = `Her name is Dret. She keeps a binding and repair shop as cover and an unregistered correspondence ledger as her actual work. She already has a file started. "Three others from the outer localities came through in the past month," she tells you. "Whatever you have from Soreheim, it fits with what Cosmoria brought and what the academy sent." She stamps your papers into the network.`;
        G.flags.met_dret_shelk_contact = true;
        G.flags.stage2_faction_contact_made = true;
        if (!G.worldClocks) G.worldClocks = {};
        G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
        addJournal('Dret: Shelkopolis investigation network active, three prior arrivals', 'discovery', `soreheim-arc-dret-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `Dret is not at the address. A note in the door says the shop is closed for inventory. You'll have to find another approach. Shelkopolis doesn't open easily to strangers with questions.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  // 9. SHELKOPOLIS ORIENTATION: THE IRONSPOOL WARD
  {
    label: "Study the Ironspool Ward — industrial hub closest to the dome infrastructure. The evidence converges here.",
    tags: ['ArcArrival', 'Lore', 'Investigation'],
    xpReward: 75,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(75, 'orienting in Ironspool Ward');
      if (!G.flags) G.flags = {};

      const arch = G.archetype && G.archetype.group;
      let arcText = '';
      if (arch === 'magic') {
        arcText = ` The ward's ventilation architecture interests you specifically — each district vent connects to the same central pressure regulation system. Whatever enters the dome infrastructure propagates evenly. This was designed for distribution, not protection.`;
      } else if (arch === 'combat') {
        arcText = ` The ward has three garrison stations and none of them are staffed at full strength. Whatever operation is running here, the garrison was thinned deliberately or is being kept ignorant. Either way, the civilian population has no military buffer.`;
      } else if (arch === 'stealth') {
        arcText = ` The ward's irregular hours and shift patterns create natural dead zones in observation. Whoever is running logistics through this district has studied its rhythms carefully. Nothing moves here by accident.`;
      } else {
        arcText = ` The ward's workers know something is wrong but not what. You see it in the way they walk past the dome access points — a studied avoidance, the posture of people who have learned not to look.`;
      }

      G.lastResult = `The Ironspool Ward at day's end: industrial stacks cooling, dome infrastructure rising to the west, the faint brassiness in the air heavier near the access terminals.${arcText} Shelkopolis is where everything Soreheim's operation was building toward is pointed.`;
      G.flags.soreheim_arc_ironspool_surveyed = true;
      addJournal('Ironspool Ward: dome infrastructure convergence point', 'discovery', `soreheim-arc-ironspool-${G.dayCount}`);
      G.recentOutcomeType = 'neutral';
      if (!G.investigationProgress) G.investigationProgress = 0;
      G.investigationProgress++;
    }
  },

  // ——— HARD GATE CHOICES (available when G.level >= 6 regardless of inv) ———

  // 10. THE WEIGHT OF WHAT YOU CARRY (level gate)
  {
    label: "You've gathered enough to be dangerous. The question now is what to do with it. Move toward Shelkopolis.",
    tags: ['ArcGate', 'Decision'],
    xpReward: 80,
    condition: function() { return G.level >= 6 && !(G.flags && G.flags.soreheim_arc_departing); },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(80, 'acknowledging the weight of accumulated evidence');
      if (!G.flags) G.flags = {};
      G.flags.soreheim_arc_departing = true;

      if (!G.worldClocks) G.worldClocks = {};
      G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;

      G.lastResult = `You have names, dates, templates, routing patterns, and a structural picture that only makes sense if it was designed. No single piece is proof. Together they constitute something someone will want suppressed badly enough to act on it. The road to Shelkopolis runs south. You take it.`;
      G.recentOutcomeType = 'neutral';
    }
  },

  // 11. ROAD: IRON COMPACT TAIL (level gate complication)
  {
    label: "You're being followed. Someone picked you up at the checkpoint and hasn't stopped. Deal with it.",
    tags: ['ArcGate', 'Stealth', 'Combat', 'Risk'],
    xpReward: 85,
    condition: function() { return G.level >= 6 && (G.flags && G.flags.soreheim_arc_departing) && !(G.flags && G.flags.soreheim_arc_tail_resolved); },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(85, 'losing the Iron Compact tail');
      if (!G.flags) G.flags = {};

      const result = rollD20('finesse', (G.skills.stealth || 0) + (G.skills.combat || 0) + Math.floor(G.level / 3));
      const target = 14;

      if (result.isCrit) {
        G.lastResult = `You double back through a working livestock market — the combination of animals, noise, and unpredictable crowd movement is the oldest counter-surveillance environment there is. Your tail loses the thread entirely. When you regain the southern road, you're alone. You don't pick up another shadow for the rest of the journey.`;
        G.flags.soreheim_arc_tail_resolved = true;
        G.recentOutcomeType = 'success';
      } else if (result.total >= target) {
        G.lastResult = `You split your route into three segments and change your pace radically between them. The tail loses you at the second transition. Professional, but not exceptional. You file this as confirmation that the Compact is monitoring the southern road for people carrying what you're carrying.`;
        G.flags.soreheim_arc_tail_resolved = true;
        G.recentOutcomeType = 'success';
        if (!G.worldClocks) G.worldClocks = {};
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
      } else {
        G.lastResult = `You can't shake them without making it obvious you know they're there. You enter Shelkopolis with a tail. Whatever you do first will be observed. Plan accordingly.`;
        G.flags.soreheim_arc_tail_unshaken = true;
        if (!G.worldClocks) G.worldClocks = {};
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 2;
        G.recentOutcomeType = 'complication';
      }
    }
  },

  // ——— FINALE (choice 12) ———

  // 12. ARRIVAL IN SHELKOPOLIS
  {
    label: "Cross into Shelkopolis proper. You are no longer a witness. You are an investigator with evidence in a city where that evidence matters.",
    tags: ['ArcFinale', 'Decision'],
    xpReward: 100,
    condition: function() {
      return (G.investigationProgress || 0) >= 5 || G.level >= 6;
    },
    fn: function() {
      advanceTime(2);
      G.telemetry.turns++;
      gainXp(100, 'arriving in Shelkopolis to begin Stage 2');
      if (!G.flags) G.flags = {};
      G.flags.arrived_from_soreheim_proper = true;
      if ((G.investigationProgress || 0) < 5 && G.level >= 6) {
        addJournal('You have reached the limit of what this stage can teach you. The road south is open — but the threads you leave unresolved will cost you in Shelkopolis.', 'intelligence');
      }

      if (!G.worldClocks) G.worldClocks = {};
      G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;

      const arch = G.archetype && G.archetype.group;
      let finalText = '';
      if (arch === 'combat') {
        finalText = ` Your background in operational structure makes the scale of what you're looking at clear: this isn't a corrupt official or a single bad actor. This is coordinated. You enter Shelkopolis as someone who has fought before but never against something this patient.`;
      } else if (arch === 'magic') {
        finalText = ` The theoretical framework for atmospheric propagation and shard amplification converges with everything you've gathered. Someone with access to specialized knowledge designed this. You enter Shelkopolis knowing you're not the only one with expertise tracing it.`;
      } else if (arch === 'stealth') {
        finalText = ` Every operational signature you've catalogued points to a single planning methodology — the same hand in different localities. You enter Shelkopolis knowing that whoever designed this is still active and watching the threads.`;
      } else {
        finalText = ` The networks you work through — logistical, social, organizational — have been deliberately compromised across every locality you've touched. You enter Shelkopolis knowing the ground here has been prepared the same way.`;
      }

      G.lastResult = `Shelkopolis. The dome infrastructure catches the morning light on the western skyline.${finalText} Soreheim is behind you. Everything it pointed at is ahead. Stage 2 begins here.`;
      G.location = 'shelkopolis';
      G.stage = 2;
      if (!G.investigationProgress) G.investigationProgress = 0;
      G.investigationProgress++;
      addJournal('consequence', 'Arrived in Shelkopolis from Soreheim Proper — Stage 2 begins', `soreheim-arc-finale-${G.dayCount}`);
      G.recentOutcomeType = 'success';
      maybeStageAdvance();
    }
  }

];

window.SOREHEIM_PROPER_TO_SHELK_ARC = SOREHEIM_PROPER_TO_SHELK_ARC;
