const STAGE2_ENRICHED_CHOICES = [
  // ========== TRAVEL ENCOUNTERS: Mysterious Figures & Hazardous Routes ==========
  {
    label: "The cloaked trader on the Ridgeway has maps she isn't selling to everyone.",
    tags: ['Travel', 'Mystery', 'Negotiation', 'Risk', 'Meaningful'],
    xpReward: 70,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'engaging mysterious traveler');
      
      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      const target = 12 + Math.max(0, G.worldClocks.pressure);

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `The hood drops. Not a trader — a refugee who walked the Ridgeway three times in the last season. She knows which passes are watched and which are genuinely clear. Her hands are steady when she unfolds the actual route. She's been careful with who she shows it to.`;
        addJournal('alliance', 'Trader contact established', `trader-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `The maps look convincing — ink weight, road names, distance markers. You don't notice the divergence until you're two hours into terrain that ends at a flooded ravine. The figure in the cloak is long gone. The Ridgeway doesn't forgive poor judgment easily.`;
        addJournal('Misled by false information', 'complication', `false-maps-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `The trader answers questions with questions. What you get is real enough — two confirmed checkpoints, one road closure, and one stretch marked dangerous without explanation. What they're holding back is legible in the pauses. It's enough to move on. The pattern holds even when the documents don't.`;
        addJournal('Partial map data', 'intelligence', `maps-partial-${G.dayCount}`);
      }

      G.recentOutcomeType = 'travel';
      maybeStageAdvance();
    }
  },
  {
    label: "The northern route is blocked. The detour is unstable. Both cost something.",
    tags: ['Travel', 'Risk', 'Decision', 'Route', 'Meaningful'],
    xpReward: 72,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(72, 'choosing dangerous route');
      
      const result = rollD20('survival', (G.skills.survival || 0) + Math.floor(G.level / 2));
      const target = 13;

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `The unstable ground is looser than the merchants described, but you read it right — step weight, grip angle, the way water drains off the shelf rock. Halfway through, a depression in the hillside holds old supply crates, sealed with wax cloth, abandoned in good condition. Three days of provisions and a copy of a regional transit map.`;
        addJournal('Supply cache found', 'discovery', `cache-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `The terrain is active. A slope that looked solid gives way under weight and you slide forty feet before catching a root cluster. Supplies scatter. One pack goes over the edge entirely. The ankle is wrenched, not broken, but every step for the next two days will cost something.`;
        addJournal('setback', 'Terrain damage', `injury-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `The detour adds most of a day. The ground is treacherous in patches but navigable if slow. You arrive intact, slightly behind, rations lighter than planned. The northern route was worse — three wrecked carts visible from the ridge confirmed it. There is still the matter of who is managing which routes stay open and which don't.`;
        addJournal('progress', 'Route traversed', `route-${G.dayCount}`);
      }

      G.recentOutcomeType = 'travel';
      maybeStageAdvance();
    }
  },
  {
    label: "The ferry captain's toll is not the listed one. The alternative is worse.",
    tags: ['Travel', 'Negotiation', 'Pressure', 'Choice', 'Meaningful'],
    xpReward: 70,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'negotiating river crossing');
      
      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      const target = 11 + Math.max(0, G.worldClocks.pressure);

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `You name a fair price and don't haggle. The captain watches you for a moment, then nods and waves the crew to ready the ramp. On the far bank, he says the next crossing is free. He's dealt with enough people who try to negotiate his livelihood into nothing. Plain dealing sits differently with him.`;
        addJournal('alliance', 'Ferry master favor', `ferry-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `The captain's jaw tightens at the third counter-offer. He points at the far bank and tells you to find another way across. By the time you reach the next settlement, two ferrymen there have already heard a description of you. The river trade talks to itself.`;
        addJournal('Reputation damage', 'complication', `rep-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `He adds a docking surcharge that wasn't mentioned at the start. You pay it. He doesn't apologize. The crossing is quiet, the water is cold, and you arrive on the far bank with lighter coin and no further complications. The Collegium's outer office is not the only layer — neither is any toll structure on a monitored crossing.`;
        addJournal('expense', 'Crossing toll paid', `toll-${G.dayCount}`);
      }

      G.recentOutcomeType = 'travel';
      maybeStageAdvance();
    }
  },
  {
    label: "The abandoned camp has fresh supplies. Someone planned to return to it.",
    tags: ['Travel', 'Survival', 'Risk', 'Decision', 'Meaningful'],
    xpReward: 68,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(68, 'managing travel risks');
      
      const result = rollD20('survival', (G.skills.survival || 0) + Math.floor(G.level / 3));
      const target = 12;

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `Boot prints, two sizes, walking not running. Fire banked correctly — someone who planned to return. A notched stick on the supply bag: a scout marker, the kind used by trail wardens in this region. When they come back an hour later, they're more surprised than hostile. They share the fire and the terrain report for the next two days.`;
        addJournal('alliance', 'Scout network mapped', `scouts-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `The camp looks empty. It isn't. Three figures step out of the treeline before you're halfway across the clearing — they waited while you walked in. The next hour is loud and costs more than supplies. The darkness works against you just as much as them.`;
        addJournal('combat', 'Ambush encounter', `ambush-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `The camp is cold — abandoned at least a day ago. Someone left a pot half-packed and a bedroll pinned under a rock. You take nothing, sleep light, and leave before first light. The night passes without incident. Seld's name appears in the suppression gap — and whoever used this camp knew the route well enough to leave in a hurry.`;
        addJournal('rest', 'Safe camping', `camp-${G.dayCount}`);
      }

      G.recentOutcomeType = 'travel';
      maybeStageAdvance();
    }
  },
  {
    label: "The messenger is being run down. The riders are organized.",
    tags: ['Travel', 'Moral', 'Combat', 'Consequence', 'Meaningful'],
    xpReward: 73,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(73, 'making moral stand');
      
      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 2));
      const target = 13;

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `The riders pull up at a fork in the path, uncertain, and the messenger slips into the undergrowth while they argue. They don't see you. The messenger catches up to you an hour later, still breathing hard, carrying a sealed tube that turns out to contain transit route documentation for three restricted corridors. They're grateful in a specific, practical way.`;
        addJournal('ally', 'Messenger alliance forged', `messenger-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `The riders are faster than you judged and more organized. The messenger goes down in the third pass. One rider wheels toward you, and by the time you've put distance between yourself and the road, they've gotten a clear look at your face. The messenger's name is something you'll hear again in worse circumstances.`;
        addJournal('consequence', 'Wanted status rising', `wanted-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `The messenger breaks left into rough terrain and the riders lose them in the scrub. One of the riders holds at the tree line, looking back. You're still, and the light is bad. They move on. You don't know if they marked you. Probably not. Possibly yes. There is still the matter of what the messenger was carrying and who sent the riders after it.`;
        addJournal('action', 'Help given', `help-${G.dayCount}`);
      }

      G.recentOutcomeType = 'travel';
      maybeStageAdvance();
    }
  },
  {
    label: "The scholar's papers are forged. The research inside them is real.",
    tags: ['Travel', 'Trust', 'Deception', 'Risk', 'Meaningful'],
    xpReward: 71,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(71, 'assessing companion trustworthiness');
      
      const result = rollD20('stealth', (G.skills.stealth || 0) + Math.floor(G.level / 3));
      const target = 12;

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `You fold his travel documents into your own kit and walk through the checkpoint talking about grain prices. The warden waves you through without looking at the secondary pack. The scholar exhales once you're clear and tells you his name: Doss. He relocated from Mimolot Academy after his research was suppressed. He travels with his notes hidden in the lining of his coat.`;
        addJournal('companion', 'Scholar joined', `scholar-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `The checkpoint warden separates the group for individual questioning — standard procedure that you didn't account for. The scholar's papers don't hold up to direct comparison. You spend two hours being questioned about how you met. The warden lets you go, but writes your description into the duty log before you leave.`;
        addJournal('Authority suspicion', 'complication', `authority-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You walk with him as far as the next waystation and point him toward a route that avoids the main checkpoints. He gives you a name in the next locality — someone who can be asked for help without explanation. No promises on either side. That's enough. The Collegium's outer office is not the only layer — and a researcher whose work was suppressed knows exactly which layer stopped him.`;
        addJournal('contact', 'Scholar network', `contact-${G.dayCount}`);
      }

      G.recentOutcomeType = 'travel';
      maybeStageAdvance();
    }
  },
  {
    label: "The lights on the horizon pulse at equal intervals. That regularity means something.",
    tags: ['Travel', 'Mystery', 'Danger', 'Investigation', 'Meaningful'],
    xpReward: 69,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(69, 'pursuing mysterious phenomenon');
      
      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      const target = 13;

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `The pulse pattern is steady — not flame, not signal fire, but a slow blue-white throb spaced at equal intervals. Warden-stone markers, placed along maintained transit routes. Someone maintains this waypoint and expects people to recognize it. The shelter is stocked: water, a sealed candle, a district transit chart current to within two months.`;
        addJournal('Safe waypoint found', 'discovery', `waypoint-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `The lights pulse in a pattern that looks like a rest signal, and you move toward them. The ground between you and the source is occupied. They had a rope across the path. The next few minutes are ugly. You get clear, but you're down coin and one piece of kit that was worth more than the coin.`;
        addJournal('combat', 'Bandit trap', `trap-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You hold your ground and watch. The lights pulse irregularly, flare once, and go dark. Nothing moves toward you. You mark the location on your own chart and give it a wide berth. Whatever it was, it's gone now, and the road ahead is ordinary. The pattern holds even when the documents don't — and warden-stone markers don't pulse unless someone is maintaining them.`;
        addJournal('mystery', 'Phenomenon logged', `phenom-${G.dayCount}`);
      }

      G.recentOutcomeType = 'travel';
      maybeStageAdvance();
    },
    failResult: 'This path is closed here, but warden-stone routes still run through the district network — and someone maintains them for a reason.'
  },
  {
    label: "The forbidden trail saves three days. The prohibition markers don't say why.",
    tags: ['Travel', 'Route', 'Risk', 'Temptation', 'Meaningful'],
    xpReward: 72,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(72, 'navigating forbidden terrain');
      
      const result = rollD20('survival', (G.skills.survival || 0) + Math.floor(G.level / 2));
      const target = 12 + Math.max(0, G.worldClocks.pressure);

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `The trail is narrow and old but solid underfoot. You move fast and quiet, and you arrive three days ahead of the standard route. From the ridge before the descent, you can see the patrol pattern on the main road below — the gap in their rotation, the timing of the second watch. You map it. That information is worth the risk on its own.`;
        addJournal('route', 'Secret passage mapped', `secret-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `The prohibition markers aren't just legal. Something has been using this trail for longer than the restriction. You hear it before you see it. Getting out costs you an hour of bad terrain, a gashed forearm, and the pack you dropped when you ran. The markers didn't explain what they were warning about, but they weren't wrong.`;
        addJournal('combat', 'Territorial encounter', `terr-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `The trail holds but barely — loose shale twice, a downed tree across the path that cost thirty minutes to work around. You reach the destination as the last light fades, aching and behind where you wanted to be, but intact. The shortcut was real. It just wasn't clean. There is still the matter of who posted the prohibition markers and what they're protecting on this corridor.`;
        addJournal('progress', 'Shortcut taken', `short-${G.dayCount}`);
      }

      G.recentOutcomeType = 'travel';
      maybeStageAdvance();
    }
  },
  {
    label: "Someone from home is on this road. They're nervous for a reason.",
    tags: ['Travel', 'Past', 'Connection', 'Caution', 'Meaningful'],
    xpReward: 70,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reconnecting with past');
      
      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      const target = 11;

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `You recognize each other without the usual pleasantries. She left for the same reasons you did, two weeks after you, by a different route. She's been moving carefully. She has a name you don't — someone in the next locality who runs a safe house for people in transit. The shared history skips the part where you establish trust. You already know each other well enough to know what the other won't say.`;
        addJournal('ally', 'Hometown connection renewed', `hometown-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `His face goes still when he sees you — not recognition, something else. He nods and walks on. Two hours later you notice you're being followed by someone you don't recognize. The gap between seeing someone from home and trusting them is wider than you remembered.`;
        addJournal('threat', 'Location compromised', `loc-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You share a meal at a roadside post and don't say much that matters. She tells you the road behind is quieter than expected. You tell her the road ahead has one rough checkpoint. You part before dark, traveling in different directions. The conversation stays surface level by unspoken mutual agreement. Seld's name appears in the suppression gap — and people who left for the same reasons you did often crossed the same records on their way out.`;
        addJournal('contact', 'Old connection revisited', `old-${G.dayCount}`);
      }

      G.recentOutcomeType = 'travel';
      maybeStageAdvance();
    }
  },
  {
    label: "The refugees' stories don't match each other. Something was done to their district.",
    tags: ['Travel', 'Moral', 'Intelligence', 'Consequence', 'Meaningful'],
    xpReward: 71,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(71, 'encountering regional crisis');
      
      const result = rollD20('lore', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      const target = 12;

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `You dress wounds and distribute what food you can spare while listening. The picture that emerges across a dozen conversations is specific: not a natural disaster but a supply collapse, water access cut without notice, the district authority absent during the worst three days. One woman describes the order to evacuate coming from someone she'd never seen before, wearing a guild mark she didn't recognize. You write down the mark's description.`;
        addJournal('Disaster intelligence gathered', 'intelligence', `disaster-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `The crowd draws a patrol within twenty minutes. The wardens want to know who organized the aid distribution and under what authorization. They take your name and the name of anyone you were visibly speaking with. The refugees scatter. The questioning takes the rest of the afternoon.`;
        addJournal('Official scrutiny', 'complication', `scrutiny-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You hand out bread and water and keep your ears open. The story is consistent: three days of something, then a fast evacuation order, then the road. Nobody agrees on the cause. One man says flooding, another says a fire, a third won't say anything specific and keeps looking at the road behind him. The region is unstable. That much is clear. There is still the matter of the name that appears in four unconnected offices — and supply collapses don't happen in isolation.`;
        addJournal('news', 'Regional status known', `news-${G.dayCount}`);
      }

      G.recentOutcomeType = 'travel';
      maybeStageAdvance();
    }
  },

  // ========== FACTION PRESSURE: Negotiation & Alliance-Building ==========
  {
    label: "The faction envoy's offer is specific. What he wants in return is not fully stated.",
    tags: ['Faction', 'Negotiation', 'Pressure', 'Alliance', 'Meaningful'],
    xpReward: 72,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(72, 'engaging with faction politics');
      
      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      const target = 12 + Math.max(0, G.worldClocks.pressure);

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `You set the terms before they do: what you'll do, what you won't, what happens if they push past the edge. The envoy writes it into his notes without argument. He didn't come expecting that kind of clarity and it changes how he sits. The arrangement holds because both parties know exactly what it covers.`;
        addJournal('faction', 'Alliance negotiated', `faction-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `You take too long answering the first question. The envoy watches the pause like a tax assessor watching a merchant weigh coin. By the time you've found your answer, he's already decided something about you. He thanks you for your time with the specific courtesy of someone who won't be sending another envoy.`;
        addJournal('conflict', 'Faction hostility', `host-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You agree to nothing specific and commit to nothing in writing. The envoy accepts this more easily than you expected — he's done this before, in other inns, with other cautious people. He leaves you a location marker and says someone will be in touch. The door stays open.`;
        addJournal('contact', 'Faction contact maintained', `contact-${G.dayCount}`);
      }

      G.recentOutcomeType = 'faction';
      maybeStageAdvance();
    }
  },
  {
    label: "Two factions want the same thing from me. They're watching which one I answer first.",
    tags: ['Faction', 'Choice', 'Power', 'Consequence', 'Meaningful'],
    xpReward: 74,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(74, 'navigating factional rivalry');
      
      const result = rollD20('stealth', (G.skills.stealth || 0) + Math.floor(G.level / 3));
      const target = 13;

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `You meet the first faction in the morning and the second in the evening, and you let each believe the meeting is the only one. The first offers transit protection. The second offers coin against a future debt. You take the protection and decline the coin in terms that leave the second faction thinking you're still deciding. Both remain engaged. Neither knows about the other. For now.`;
        addJournal('faction', 'Double negotiation success', `double-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `They talk to each other — faster than you expected, through a channel you didn't know they shared. By the time you reach your next meeting, both know you've been running parallel conversations. The first faction's representative doesn't raise her voice. She just slides your proposal back across the table and says she doesn't think this is a productive relationship.`;
        addJournal('Factional suspicion', 'complication', `susp-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `The faction offering protection is more reliable than the one offering coin. You make that calculation and say so plainly. The chosen faction accepts without ceremony. The other will hear about it. That tension will show up later, probably at a bad time.`;
        addJournal('faction', 'Allegiance declared', `alleg-${G.dayCount}`);
      }

      G.recentOutcomeType = 'faction';
      maybeStageAdvance();
    }
  },
  {
    label: "The faction's request is not one I can walk back from if I say yes.",
    tags: ['Faction', 'Moral', 'Violence', 'Pressure', 'Meaningful'],
    xpReward: 75,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'dealing with dark faction requests');
      
      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      const target = 12;

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `You decline without explaining yourself at length. The representative reads your posture and doesn't press. He says, after a pause, that he appreciates someone who knows their own limits — it makes you predictable in useful ways. The faction doesn't rescind the relationship. They recalibrate what they'll ask for next time.`;
        addJournal('ethics', 'Moral boundary upheld', `moral-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `You hedge when you should be direct. The representative listens, nods, and asks if you need more time to consider. You say no. He says he'll pass that along. The way he says it makes clear that "passing it along" means something specific within the faction, and it isn't a compliment.`;
        addJournal('threat', 'Faction displeasure', `disp-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You propose a different task — same stakes, less irreversible. The faction representative writes it down without enthusiasm. He says someone will confirm whether it's acceptable. Neither party is satisfied, but the conversation ends without a broken door. That's a kind of success.`;
        addJournal('compromise', 'Uneasy détente', `detente-${G.dayCount}`);
      }

      G.recentOutcomeType = 'faction';
      maybeStageAdvance();
    }
  },
  {
    label: "The faction safehouse is unguarded at the wrong hour. That might not be an accident.",
    tags: ['Faction', 'Discovery', 'Risk', 'Intelligence', 'Meaningful'],
    xpReward: 70,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'discovering faction infrastructure');
      
      const result = rollD20('stealth', (G.skills.stealth || 0) + Math.floor(G.level / 3));
      const target = 13 + Math.max(0, G.worldClocks.pressure);

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `The door is unlatched — a rotation error, or someone was careless. Inside: a cot, a locked box, a transit schedule pinned above the window. You copy the schedule and leave without touching anything else. The transit dates match three known cargo movements you've been watching. This is where they coordinate the overlap.`;
        addJournal('Safehouse intelligence', 'intelligence', `safe-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `Someone is already inside when you push the door. The next few seconds are fast and loud. You get out, but not unseen. By evening, three people in the district have your description and instructions to pass it up the faction's chain. Staying in this area stops being a reasonable option.`;
        addJournal('threat', 'Active faction pursuit', `pursue-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You map the building from outside — entry points, window positions, the foot traffic pattern around the door at different hours. You don't go in, but you know the location and enough of the rhythm to work with later. The faction doesn't know you've been watching. That margin is worth keeping.`;
        addJournal('Safehouse mapped', 'intelligence', `map-${G.dayCount}`);
      }

      G.recentOutcomeType = 'faction';
      maybeStageAdvance();
    }
  },
  {
    label: "The insider wants out. She's been watched long enough to know the gaps in the rotation.",
    tags: ['Faction', 'Risk', 'Defection', 'Moral', 'Meaningful'],
    xpReward: 73,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(73, 'managing factional defection');
      
      const result = rollD20('stealth', (G.skills.stealth || 0) + Math.floor(G.level / 2));
      const target = 12 + Math.max(0, G.worldClocks.pressure);

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `You route her out through a supply lane the faction doesn't use for personnel movement — a gap in their own protocols she never thought to exploit. She's clear before anyone notices the absence. Two days later she sends a message with the first piece of insider information: the faction's drop schedule for the next month. She's exact, calm, and has been waiting to do this for a long time.`;
        addJournal('spy', 'Defector asset acquired', `defect-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `The extraction route was watched. The faction knew she was considering it — they'd been watching her for weeks. They let the exit attempt run far enough to identify who she contacted. The connection between you and the defection attempt is now documented somewhere you can't access.`;
        addJournal('threat', 'Defection traced', `traced-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `She gets clear, but not cleanly. Some of her documents had to be left behind. What she carries out is partial — enough to confirm the faction's structure and two key personnel, but not the operational calendar she promised. She's alive and out. That's the larger part of what mattered.`;
        addJournal('Partial defection info', 'intelligence', `partial-${G.dayCount}`);
      }

      G.recentOutcomeType = 'faction';
      maybeStageAdvance();
    }
  },
  {
    label: "The faction's internal split has reached the point where they need someone outside it.",
    tags: ['Faction', 'Politics', 'Trust', 'Authority', 'Meaningful'],
    xpReward: 72,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(72, 'mediating internal faction conflict');
      
      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 2));
      const target = 13;

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `You let both sides speak fully before saying anything. When you do speak, you name what each side actually wants — not what they're arguing about — and the room goes quiet. The faction leadership watches you work with the careful attention of people deciding whether to trust something. They decide yes. The internal dispute doesn't disappear, but it stops being a crisis.`;
        addJournal('faction', 'Internal mediation successful', `med-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `You call one side's position unreasonable in front of the other. That's the moment it breaks. The insulted group walks out, taking two other members with them. The faction leadership thanks you for your time with the particular flatness of people who will not be repeating this experiment. The internal split is now an open fracture.`;
        addJournal('Mediation failure', 'complication', `med-fail-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `Both sides agree to a cooling period — thirty days, no new grievances filed, no escalation. They accept it because they're tired, not because you convinced them. The faction leadership notes that you held the room together, which is more than the previous attempt managed. No one is happy. No one is leaving either.`;
        addJournal('faction', 'Partial mediation', `partial-med-${G.dayCount}`);
      }

      G.recentOutcomeType = 'faction';
      maybeStageAdvance();
    }
  },
  {
    label: "The operative didn't make the meeting. The body was left where I'd find it.",
    tags: ['Faction', 'Mystery', 'Danger', 'Moral', 'Meaningful'],
    xpReward: 71,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(71, 'discovering operative death');
      
      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      const target = 12;

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `The body is posed — positioned after death to look like a fall, which means someone moved it with specific intent. The operative's satchel is gone, but the lining of his boot holds a folded slip: a meeting location, a date, a single glyph mark you recognize from a rival faction's correspondence. He was killed before the meeting could happen. You arrive at the meeting point anyway and wait. Someone else shows up, and they're just as surprised to see you.`;
        addJournal('Operative assassination solved', 'intelligence', `death-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `You're still crouched over the body when you hear movement behind you. Whoever left the operative there didn't go far. They see your face and make a calculation. You put distance between yourself and the location fast, but not before they've had enough time to decide what to do with what they saw.`;
        addJournal('threat', 'Killer attention gained', `killer-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `The death is clean and recent — within the last six hours. No defensive wounds, no struggle marks on the ground nearby. The operative either trusted whoever did this or had no warning. His faction mark is removed but the spot where it sat is still visible on his jacket collar. This was deliberate and organized, not opportunistic.`;
        addJournal('Operative death noted', 'intelligence', `noted-${G.dayCount}`);
      }

      G.recentOutcomeType = 'faction';
      maybeStageAdvance();
    }
  },
  {
    label: "The faction wants eyes in a region I don't know. Saying no has a cost too.",
    tags: ['Faction', 'Espionage', 'Network', 'Pressure', 'Meaningful'],
    xpReward: 70,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'undertaking espionage assignment');
      
      const result = rollD20('stealth', (G.skills.stealth || 0) + Math.floor(G.level / 3));
      const target = 12 + Math.max(0, G.worldClocks.pressure);

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `You build the network through market relationships and transit handlers — people with legitimate reasons to move through and observe without attracting scrutiny. No one you recruit knows they're part of a network. They each think they're doing a single favor for a single person. The information flows in without a visible center. The region's administration never finds a thread to pull.`;
        addJournal('espionage', 'Spy network established', `spy-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `One of the people you approached went directly to the regional authority. By morning, the authority has a description of your activities and a name that's connected to the faction that sent you. The region now holds something you can't take back — and they're deciding what to do with it.`;
        addJournal('Espionage discovered', 'complication', `espy-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You make three reliable connections — a market assessor, a road warden, a hostel keeper. Each has a legitimate reason to know what moves through the region. The information won't be comprehensive and it won't be fast, but it will be consistent. Careful work, done at the right pace.`;
        addJournal('espionage', 'Contacts established', `contact-spy-${G.dayCount}`);
      }

      G.recentOutcomeType = 'faction';
      maybeStageAdvance();
    }
  },
  {
    label: "The faction's resources are gone and my name is on the access log.",
    tags: ['Faction', 'Suspicion', 'Investigation', 'Pressure', 'Meaningful'],
    xpReward: 73,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(73, 'clearing factional suspicion');
      
      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 2));
      const target = 13;

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `The theft wasn't random — the missing resources ended up at a specific location, and the trail leads to a faction member who's been selling access to the faction's storage schedule. You bring the evidence to the faction leadership before they've finished questioning you. The shift in the room is immediate. Suspicion doesn't evaporate — it redirects, and you're no longer its target.`;
        addJournal('faction', 'Innocence proven, loyalty gained', `loyal-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `The evidence trail bends back toward you — not because you're guilty but because someone structured the theft to leave traces that point at an outsider. The faction leadership listens to your explanation without expression. You can't tell whether they believe you. The questions they ask next suggest they're now trying to determine whether your guilt is practical or merely convenient.`;
        addJournal('threat', 'Suspicion escalated', `susp-esc-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You find evidence of a third party who had access — not enough to name them, but enough to show the faction that the pool of suspects extends beyond you. The leadership documents it and moves on without clearing you formally. The active pressure drops. The quiet suspicion doesn't go anywhere, but it stops driving decisions.`;
        addJournal('faction', 'Partial innocence shown', `partial-inno-${G.dayCount}`);
      }

      G.recentOutcomeType = 'faction';
      maybeStageAdvance();
    },
    failResult: 'This path is closed here, but Seld\'s name appears in the suppression gap — the faction\'s storage records still point toward an unresolved routing discrepancy.'
  },

  // ========== COMPANION DYNAMICS: Loyalty Tests & Moral Stands ==========
  {
    label: "The companion's past isn't what they said. The deception was specific and sustained.",
    tags: ['Companion', 'Trust', 'Deception', 'Loyalty', 'Meaningful'],
    xpReward: 72,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(72, 'navigating companion deception');
      
      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      const target = 12;

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `They tell you the shape of the lie first — who they said they were, what they said they'd done — and then the actual history underneath it. Not a confession. More like a building shown from the inside after years of only seeing the facade. You don't say anything for a while. When you do speak, you don't offer absolution. You ask one practical question about what comes next. That's enough. They exhale like they've been holding it for months.`;
        addJournal('companion', 'Deep trust forged', `trust-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `You push harder than the moment warrants. They answer your questions in single sentences, then stop answering. By the evening meal they're physically present but unreachable — their posture closed, their eyes on the middle distance. You've put something between you that wasn't there before, and they're not going to be the one to move it.`;
        addJournal('Companion distance', 'complication', `dist-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You accept the explanation without pressing further. They can tell you're not fully satisfied with it, and they don't pretend otherwise. The relationship doesn't break but it recalibrates — less ease, more care on both sides. Whatever the full truth is, it stays where it is for now.`;
        addJournal('companion', 'Trust conditionally restored', `cond-${G.dayCount}`);
      }

      G.recentOutcomeType = 'companion';
      maybeStageAdvance();
    }
  },
  {
    label: "The companion's vendetta has a name now. Staying and leaving both have consequences.",
    tags: ['Companion', 'Choice', 'Loyalty', 'Consequence', 'Meaningful'],
    xpReward: 71,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(71, 'managing companion departure');
      
      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 2));
      const target = 12;

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `You don't argue the vendetta. You ask what happens after — not to the target, but to them. The question lands in a way nothing else has. They sit with it for a long time and then say they haven't thought past the act itself. That's the crack. You don't pry it wider. They agree to stay through the next waypoint and decide from there. Their shoulders are looser when they come back from their watch.`;
        addJournal('companion', 'Companion convinced to stay', `stay-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `You make an argument you believe in but they've already stopped listening. They pack while you're still talking. Before they go, they take the secondary provisions pack — not out of malice, they'd say, but because they need it. The group feels differently sized after they leave, and not just by one person.`;
        addJournal('loss', 'Companion departure', `dep-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `They agree to wait until the current route is finished. After that, no promises. You accept the terms. It's not resolution — it's a delay, and you both know it. They're quieter than usual for the next two days, moving through their tasks without comment. The subject doesn't come up again, which is its own kind of tension.`;
        addJournal('companion', 'Compromise reached', `comp-${G.dayCount}`);
      }

      G.recentOutcomeType = 'companion';
      maybeStageAdvance();
    }
  },
  {
    label: "The companion needs medicine that costs more than the road budget allows.",
    tags: ['Companion', 'Moral', 'Sacrifice', 'Care', 'Meaningful'],
    xpReward: 70,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'sacrificing for companion welfare');
      
      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      const target = 11;

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `You pay the full price without flinching and stay while the apothecary works. They watch you from the treatment table, tracking your face. When it's done, they don't say much — they rarely do when they're in pain — but that evening they move their bedroll closer to yours without comment. Some things get communicated without words.`;
        addJournal('companion', 'Care strengthens bond', `care-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `You push the apothecary on price when the companion is still in the chair. The apothecary stops working and looks at you. He finishes the minimum procedure — cleansing, a basic wrap — and tells you the actual treatment requires the full fee. You're outside the shop before you've worked out that you've made this worse. The companion doesn't say anything, but the injury is still there and now it's been sitting untreated for another hour.`;
        addJournal('setback', 'Negotiation failure', `neg-fail-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `The apothecary agrees to a payment split — half now, half on your next pass through. It's a fair deal. The treatment is thorough if not immediate, and the companion is ambulatory within two days. The recovery is slower than you'd like but steady. They appreciate that you didn't cut corners on what mattered.`;
        addJournal('companion', 'Companion recovery', `recov-${G.dayCount}`);
      }

      G.recentOutcomeType = 'companion';
      maybeStageAdvance();
    }
  },
  {
    label: "The two companions are at an impasse. Both are right about different things.",
    tags: ['Companion', 'Moral', 'Conflict', 'Leadership', 'Meaningful'],
    xpReward: 71,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(71, 'mediating companion conflicts');
      
      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 2));
      const target = 13;

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `You ask both of them to stop speaking and name what they're actually protecting — not the position, the value under it. It takes a while. When the values are named, the conflict is different. There's a path that honors both and neither had seen it because they'd been arguing at the surface level. The meal that evening is louder and more relaxed than it's been in days.`;
        addJournal('companion', 'Group harmony achieved', `harm-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `You call for a decision before both sides are ready to make one. The argument sharpens under the pressure. One companion stands up from the table and walks out of the shelter. They're back by morning, but they don't speak to the other directly for the next day. The tension has a shape now that it didn't have before, and it takes up space in every shared silence.`;
        addJournal('conflict', 'Companion conflict', `conf-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `They accept the compromise in the way people accept something that costs them: without warmth, but without refusal. Both give something up and neither is pretending otherwise. The group moves forward. The underlying disagreement hasn't been resolved — it's been shelved, and that shelf has a weight limit.`;
        addJournal('companion', 'Compromise accepted', `comp-accept-${G.dayCount}`);
      }

      G.recentOutcomeType = 'companion';
      maybeStageAdvance();
    }
  },
  {
    label: "The companion is sick and knows what the contagion means for anyone near them.",
    tags: ['Companion', 'Sacrifice', 'Moral', 'Risk', 'Meaningful'],
    xpReward: 74,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(74, 'facing companion illness crisis');
      
      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      const target = 13;

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `You establish a clean perimeter around them — separate sleeping space, separate water, no shared tools. The others grumble but comply. Three days of fever, then a break, then slow improvement. On the fifth day they eat a full meal. They don't make a speech about it. They just start pulling their weight again the day they're strong enough, and they work harder than before.`;
        addJournal('companion', 'Companion healed, loyalty absolute', `heal-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `The isolation protocols aren't maintained cleanly — surfaces touched, kit shared in the chaos of camp. By the third day, two others show early symptoms. The companion with the worst exposure doesn't make it past the fourth night. You're standing with a group that is smaller by one and sicker than it was, and the road ahead is the same length it's always been.`;
        addJournal('loss', 'Companion death, contagion spreads', `death-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `They survive. The fever breaks on the fourth day but the recovery is slow and incomplete — stamina reduced, appetite poor for another week. They travel lighter and shorter distances for a while. They're alive and present and functioning. That counts. The weakness will pass, probably. It just takes time you don't have much of.`;
        addJournal('companion', 'Companion survives weakened', `weak-${G.dayCount}`);
      }

      G.recentOutcomeType = 'companion';
      maybeStageAdvance();
    }
  },
  {
    label: "A companion's family member is inside a facility I can reach. The window will not stay open.",
    tags: ['Companion', 'Moral', 'Consequence', 'Risk', 'Meaningful'],
    xpReward: 73,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(73, 'managing companion family crisis');
      
      const result = rollD20('stealth', (G.skills.stealth || 0) + Math.floor(G.level / 3));
      const target = 13 + Math.max(0, G.worldClocks.pressure);

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `You get the family member out through the facility's own laundry access — a gap in their procedures that no one had thought to close. Clean, quiet, no alarms. The companion is waiting at the rally point and doesn't speak when their family member walks around the corner. The reunion is private. Afterward, they say two words: "I know." That's all.`;
        addJournal('companion', 'Family rescued, loyalty unbreakable', `fam-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `The approach is spotted on the second perimeter. The alarm doesn't bring enough response to catch you, but it brings enough to lock the facility and document the attempt. The warden authority now has a description of the operation and the approximate number of people involved. The family member is still inside. Your group is now on a list.`;
        addJournal('threat', 'Authority pursuit heightened', `auth-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You create a distraction at the front gate. In the movement it causes, the family member walks out through the vehicle exit behind a legitimate departing cart. They weren't waiting for a rescue specifically — they'd been watching for any gap. Your distraction gave them one. The companion accepts that their family is free without asking too many questions about how.`;
        addJournal('companion', 'Family aided toward freedom', `aid-${G.dayCount}`);
      }

      G.recentOutcomeType = 'companion';
      maybeStageAdvance();
    }
  },
  {
    label: "A companion secretly sacrificed something important for the group. Discover this and decide how to respond.",
    tags: ['Companion', 'Sacrifice', 'Revelation', 'Loyalty', 'Meaningful'],
    xpReward: 72,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(72, 'discovering companion sacrifice');
      
      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 2));
      const target = 12;

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `You piece it together from fragments — a missing item, a transaction you didn't authorize, a quiet conversation they had that didn't make sense until now. When you bring it up at the next rest stop, you do it in front of the others. Not to embarrass them. To name what they did so it can be recognized. Their face does something complicated. The group is different after that, in small ways that matter.`;
        addJournal('companion', 'Sacrifice publicly honored', `hon-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `You read the evidence wrong — what they gave up looks, at first glance, like they diverted resources. You confront them on it before you've checked the full picture. They don't defend themselves with the explanation you don't have yet. They just absorb it, and something in how they carry themselves after that is different. More careful. More distant. The truth comes out later, and the damage by then is already done.`;
        addJournal('conflict', 'Misunderstood sacrifice', `misund-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You find them after the evening meal and say simply that you know what they did and you won't forget it. They nod and look away. They don't want to discuss it. The acknowledgment was the thing that mattered — not the elaboration. The conversation lasts about thirty seconds. The weight of it lasts longer.`;
        addJournal('companion', 'Sacrifice privately acknowledged', `ack-${G.dayCount}`);
      }

      G.recentOutcomeType = 'companion';
      maybeStageAdvance();
    }
  },
  {
    label: "The companion was hired to watch me. They stopped. The gap between those two facts is the only question.",
    tags: ['Companion', 'Trust', 'Deception', 'Conflict', 'Meaningful'],
    xpReward: 70,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'processing companion betrayal revelation');
      
      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      const target = 12;

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `You ask when they stopped reporting. They tell you: about three weeks in. They say it without prompting, looking at the floor. What they stopped reporting was the kind of thing that would have gotten you separated — and they made that choice alone, without telling you. The original deception made it worse. But you can hold the whole arc of it now and understand what it means. You tell them you know. That's the conversation. It's enough.`;
        addJournal('companion', 'Betrayal forgiven, trust renewed', `forg-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `You react before you've thought through what the confession actually means. What you say isn't proportionate and they know it. They pack their kit with the same calm they use for everything else, and by morning they're gone. A week later you hear they're working with a group whose interests run directly counter to yours. They're not pursuing a vendetta. They're just moving on, and they happen to be on the other side now.`;
        addJournal('loss', 'Companion becomes rival', `rival-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You tell them you need time and some distance between you and them for a while. They accept this without argument. They don't apologize again. They give you the space you asked for, work their share of the load without comment, and wait for you to decide what comes next. The boundary is clean and they respect it. That itself tells you something.`;
        addJournal('companion', 'Cautious distance established', `dista-${G.dayCount}`);
      }

      G.recentOutcomeType = 'companion';
      maybeStageAdvance();
    }
  },

  // ========== ROUTE INTELLIGENCE: Scouts, Spies & Institutional Observation ==========
  {
    label: "A scout has checkpoint maps. The price and what I offer in return are still undecided.",
    tags: ['Intelligence', 'Route', 'Information', 'Cost', 'Meaningful'],
    xpReward: 70,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'acquiring route intelligence');
      
      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      const target = 11;

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `The scout names his price and you pay it without counter-offering. He notices and spreads the maps properly — not folded loose but weighted at the corners. He walks you through each checkpoint: who runs it, what they're actually checking for, which shift changes on which day. Current within the week. You leave with something genuinely useful.`;
        addJournal('Route maps acquired', 'intelligence', `maps-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `You push down on the price twice. The scout smiles and takes what you offer. The maps he gives you are technically accurate — for a route that was closed four months ago. You don't discover this until you're standing at a checkpoint that's been decommissioned and replaced by something stricter, three hours in the wrong direction.`;
        addJournal('Misinformed', 'complication', `misinf-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You pay mid-range and get mid-range. The information covers the main checkpoints and one alternate route without much detail on timing or personnel. Enough to move forward with some confidence but not enough to plan around complications. The scout was fair. So were you.`;
        addJournal('Route information obtained', 'intelligence', `info-${G.dayCount}`);
      }

      G.recentOutcomeType = 'intelligence';
      maybeStageAdvance();
    }
  },
  {
    label: "Intercepted messages between institutions, discussing transit restrictions — the cipher is the first problem.",
    tags: ['Intelligence', 'Espionage', 'Information', 'Power', 'Meaningful'],
    xpReward: 71,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(71, 'intercepting institutional communication');
      
      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      const target = 12;

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `The cipher is institutional — a format used across multiple administrative bodies rather than a personal code. Once you have the register key, the messages read clearly: a coordinated tightening of three transit routes, timed to a fiscal quarter. Not a response to any threat. Pre-planned. The restriction isn't reactive — it's a mechanism. The messages lay out the schedule across the next two months.`;
        addJournal('Institutional strategy decoded', 'intelligence', `decode-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `The cipher has a detection thread — a glyph sequence that activates on unauthorized access. You didn't see it in time. The message is now blank in your hands and whoever sent it has a notification that their communication was opened. Your position relative to the message's interception point is traceable.`;
        addJournal('threat', 'Interception detected', `det-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You get through the first layer of the cipher but the second layer holds. What you can read confirms that the restrictions are coordinated and timed — not ad hoc — and that at least two administrative bodies are involved. The specific details of what they're restricting and why remain in the encoded sections.`;
        addJournal('Partial message decoded', 'intelligence', `part-decode-${G.dayCount}`);
      }

      G.recentOutcomeType = 'intelligence';
      maybeStageAdvance();
    }
  },
  {
    label: "An institutional spy wants shelter. What they carry is worth more than what I gain turning them over.",
    tags: ['Intelligence', 'Spy', 'Moral', 'Pressure', 'Meaningful'],
    xpReward: 72,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(72, 'harboring institutional spy');
      
      const result = rollD20('stealth', (G.skills.stealth || 0) + Math.floor(G.level / 3));
      const target = 12 + Math.max(0, G.worldClocks.pressure);

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `You move them twice before settling on a location — unnecessary but it resets any trail. The institution sends a warden inquiry to the first address, finds nothing, and pulls back. The spy spends three days moving documents from memory to paper. What they carry out of the institution is three years of internal protocol logs — who authorized what, when, and for whom.`;
        addJournal('spy', 'Institutional spy asset acquired', `spy-asset-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `The institution tracks them faster than either of you expected — a movement pattern they were already watching for. The location you chose is compromised within the day. The spy gets out but barely, and they leave behind documents that connect the shelter point to your movements over the previous week. The institution has your general profile now.`;
        addJournal('threat', 'Accomplice status', `accomp-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You keep contact brief and don't ask for everything at once. The spy gives you a structured summary — key personnel, two active operations, one upcoming audit that will expose gaps in the institution's own records. You don't push for the source documentation. The relationship stays intact and workable for future access.`;
        addJournal('Spy contact established', 'intelligence', `spy-contact-${G.dayCount}`);
      }

      G.recentOutcomeType = 'intelligence';
      maybeStageAdvance();
    }
  },
  {
    label: "You observe institutional officials moving through your region. Follow them covertly to learn their objectives.",
    tags: ['Intelligence', 'Observation', 'Espionage', 'Risk', 'Meaningful'],
    xpReward: 69,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(69, 'performing covert observation');
      
      const result = rollD20('stealth', (G.skills.stealth || 0) + Math.floor(G.level / 3));
      const target = 13;

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `They travel in a group of three with a deliberate walking pace — projecting routine, not urgency. You stay one street parallel and watch through the market stalls. They stop at a private building that has no public signage. One of them checks behind them twice before going in. You get close enough to the side passage to hear the first three words of the briefing before the door closes: "scheduled for removal." You note the building, the personnel count, and the direction they came from.`;
        addJournal('Institutional objective revealed', 'intelligence', `obj-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `One of the group doubles back through a side lane — a counter-surveillance maneuver that works exactly as intended. You're standing still when they come around the corner behind you. They look at you with the particular attention of someone who is paid to notice people following them. Nobody says anything. They continue on. But the surveillance party now knows their route had a tail.`;
        addJournal('threat', 'Observation discovered', `obs-disc-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `They go into a building at the district's administrative edge. You note the address and the time. Two hours later they leave the same way they came in. You have a location, a duration, and the fact that three senior personnel considered whatever happened inside worth the walk. That's the start of something, not the end.`;
        addJournal('Institutional meeting site mapped', 'intelligence', `site-${G.dayCount}`);
      }

      G.recentOutcomeType = 'intelligence';
      maybeStageAdvance();
    },
    failResult: 'This path is closed here, but the Collegium\'s outer office is not the only layer — the building at the administrative edge still has no public record.'
  },
  {
    label: "A scout network is offering access to their route data. The price is protection I may not be able to deliver.",
    tags: ['Intelligence', 'Network', 'Alliance', 'Commitment', 'Meaningful'],
    xpReward: 70,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'building intelligence network');
      
      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 2));
      const target = 12;

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `You negotiate protection terms that are specific and achievable — two safe houses, access to your contacts in two localities, and a commitment to route warning updates when you have them. The scout network lead writes it all down and signs it with a thumbprint, which is how they do it in their circuit. The information begins arriving within three days. Current, accurate, and specific to the routes you're using.`;
        addJournal('network', 'Scout network integrated', `net-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `You agree to more than you can deliver — three safe houses when you have one, protection capacity beyond your actual reach. The lead scout nods and takes the agreement at face value. Two weeks later, when the first test of your commitment comes and you can't fulfill what you promised, the word travels through the circuit faster than you do. The network closes its doors.`;
        addJournal('Network broken trust', 'complication', `break-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You negotiate a trial period — sixty days, one safe house, and route updates on a best-effort basis. The lead scout accepts this without enthusiasm but without objection. The information that comes in is sporadic but generally reliable. The relationship is functional if not strong. It can grow from here, if you keep your side of it.`;
        addJournal('network', 'Limited network established', `lim-${G.dayCount}`);
      }

      G.recentOutcomeType = 'intelligence';
      maybeStageAdvance();
    }
  },
  {
    label: "A dead messenger. Encrypted documents still sealed. Someone needs these not to arrive.",
    tags: ['Intelligence', 'Investigation', 'Mystery', 'Consequence', 'Meaningful'],
    xpReward: 71,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(71, 'investigating dead messenger');
      
      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      const target = 12;

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `The cipher is standard Compact administrative encoding — familiar to you from the border documentation you've seen. Once broken, the documents read as a complete picture: three coordinated parties, two transit routes used for non-declared cargo, and a schedule of payments routed through a shell entity whose name appears in the Iron Ledger Ward records. The messenger was carrying confirmation of the arrangement, not orders. Someone killed a courier to stop confirmation, which means the arrangement is still live.`;
        addJournal('Conspiracy uncovered', 'intelligence', `cons-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `You spend an hour with the documents before you notice the location tag on the messenger's boot — a marking used by courier networks to note where a message was collected. Someone in the network tracks their people that way. By the time you've worked this out, you're back on the road, and by the next morning there's a second figure on your trail who wasn't there before. They don't approach. They just stay at range and watch.`;
        addJournal('threat', 'Killer attention', `killer-att-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `The first layer decodes to a transit schedule with route codes you don't immediately recognize. You get through enough to map three delivery dates and two pickup locations before the second cipher layer stops you. The routing information is current and specific. It's half the picture — but the half that tells you where to look next.`;
        addJournal('Partial documents decrypted', 'intelligence', `partial-doc-${G.dayCount}`);
      }

      G.recentOutcomeType = 'intelligence';
      maybeStageAdvance();
    },
    failResult: 'This path is closed here, but there is still the matter of the name that appears in four unconnected offices — the routing records and the Iron Ledger Ward are not finished with each other.'
  },
  {
    label: "The archive is breached. The secondary stacks are unguarded for a window that will not stay open.",
    tags: ['Intelligence', 'Opportunity', 'Moral', 'Risk', 'Meaningful'],
    xpReward: 73,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(73, 'breaching institutional archives');
      
      const result = rollD20('stealth', (G.skills.stealth || 0) + Math.floor(G.level / 2));
      const target = 13;

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `The breach window is narrow — twelve minutes between the first alarm and the physical seal of the building's secondary stacks. You go straight to the row you've been tracking: freight authorization records, six months back. You pull twelve documents and copy three in full before the room begins to empty. You're outside and two streets away when the lockdown closes. What you have is specific, recent, and already useful.`;
        addJournal('Archives breached successfully', 'intelligence', `breach-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `The breach alert triggers faster than the external pattern suggested — someone was watching the reading room specifically. The lockdown seals before you reach the secondary exit. The warden personnel who find you in the stacks take your name before they allow you to leave. You're not detained. But your name and description are now in the incident log, and the institution's security review will include you.`;
        addJournal('threat', 'Archive trap discovery', `trap-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You get four documents out before the lockdown closes the secondary stacks. Three are useful, one is administrative noise. The exit is rushed — you leave through the public reading room just as the wardens begin clearing it, and nobody looks twice at someone already walking toward the door. The partial access is real intelligence. It's just not complete.`;
        addJournal('Partial archive access', 'intelligence', `part-arch-${G.dayCount}`);
      }

      G.recentOutcomeType = 'intelligence';
      maybeStageAdvance();
    }
  },
  {
    label: "A corruption network needs my testimony against institutional officials. The protection they offer may not outlast my usefulness.",
    tags: ['Intelligence', 'Corruption', 'Legal', 'Risk', 'Meaningful'],
    xpReward: 72,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(72, 'dealing with corruption testimony');
      
      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      const target = 12;

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `You name your terms first: transit immunity for a defined period, documentation of your cooperation filed with two separate jurisdictions, and a sealed copy held outside the network's control. They agree to all three. The testimony you give is specific, documented, and submitted through channels that create a parallel paper trail. What you saw is now part of the record in a form that cannot be quietly withdrawn.`;
        addJournal('legal', 'Protected witness status', `prot-wit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `The testimony was supposed to be sealed. It wasn't. By the time you leave the meeting room, the summary of what you said has been routed to a duty officer whose name appears in the documents you were testifying about. Within two days, someone leaves a note at your lodging that says only: "We know what you said." The network's corruption runs deeper than the procedure that was supposed to protect you.`;
        addJournal('threat', 'Official retaliation', `ret-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You agree to testify in writing, with a one-week window before the document enters active proceedings. The protection is procedural rather than physical — your name is logged but not widely distributed. The testimony goes into the record. Whether it does anything useful depends on whether the process that receives it is cleaner than the one you're describing. You don't know that yet.`;
        addJournal('legal', 'Conditional testimony', `cond-test-${G.dayCount}`);
      }

      G.recentOutcomeType = 'intelligence';
      maybeStageAdvance();
    }
  },

  // ========== FACTION CONTACTS ==========

  // Faction 1: Oversight Collegium
  {
    cid: 'stage2_collegium_contact',
    label: 'Seld has been building the same picture from the other side.',
    tags: ['stage2', 'faction_contact', 'Faction', 'Collegium', 'Social'],
    xpReward: 60,
    fn: function() {
      var roll = rollD20('lore', G.skills.lore);
      if (roll.total >= 13) {
        addNarration('Collegium Archive Access', 'Seld sets a folder on the table between you — not hers to share, technically. She opens it anyway. The cross-reference sheets inside are hand-annotated in two different inks: her notes layered over redactions that were made before she ever touched the file. She marks three suppressed filing numbers with her thumbnail and slides the folder toward you. Outside, the archive bell rings the close-of-day cycle. Neither of you moves until it stops.');
        addJournal('Collegium archivist provided suppressed filing cross-references from three registries.', 'intelligence');
        G.flags.collegium_contact = true;
        G.flags.stage2_faction_contact_made = true;
        G.flags.shadowhands_alerted = true;
        G.investigationProgress = (G.investigationProgress || 0) + 1;
        applyTensionModifier('collegium_archivist');
        if (G.factions && G.factions['shadowhands']) {
          G.factions['shadowhands'].tension = Math.min(10, (G.factions['shadowhands'].tension || 0) + 1);
        }
        maybeStageAdvance();
      } else {
        addNarration('Archive Meeting — No Exchange', 'Seld reads your hesitation before you say anything. She closes the folder and tucks it back under her arm. The offer stands, she says, but only until end of the third week. After that the files rotate to deep storage and she loses access. She leaves through the staff corridor. The archive reading room empties around you.');
      }
    }
  },

  // Faction 2: Shadowhands
  {
    cid: 'stage2_shadowhands_contact',
    label: 'The question in that note could only come from someone tracking the same routes.',
    tags: ['stage2', 'faction_contact', 'Faction', 'Shadowhands', 'Stealth'],
    xpReward: 60,
    fn: function() {
      var roll = rollD20('stealth', G.skills.stealth);
      if (roll.total >= 13) {
        addNarration('Courier Relay — Drop Confirmed', 'The waypoint is a flour merchant\'s loading dock, which is either deliberate or convenient. The courier takes the unmarked packet without looking at it and hands you a wax-sealed tube in return. Inside: enforcement operation logs, dates, route designations, and a column of ledger shorthand you\'ll need time to decode. The courier is gone before you reseal your coat. The dock smells of milled grain and nothing else.');
        addJournal('Shadowhands courier relay yielded covert enforcement operation logs from Roazian-adjacent routes.', 'intelligence');
        G.flags.shadowhands_contact = true;
        G.flags.stage2_faction_contact_made = true;
        G.flags.collegium_alerted = true;
        G.investigationProgress = (G.investigationProgress || 0) + 1;
        applyTensionModifier('shadowhands_operative');
        if (G.factions && G.factions['collegium']) {
          G.factions['collegium'].tension = Math.min(10, (G.factions['collegium'].tension || 0) + 2);
        }
        maybeStageAdvance();
      } else {
        addNarration('Relay — Aborted', 'The waypoint is clear when you arrive. No courier, no signal. An hour later a child passes and drops a folded note at your feet without slowing: one word, "watched." You leave the packet at the lodging and spend the evening doing nothing that looks like waiting. Whatever window existed has closed.');
      }
    }
  },

  // Faction 3: Road Wardens Order
  {
    cid: 'stage2_wardens_contact',
    label: 'The Warden flagged my transit pattern — she already knows what I\'ve been tracking.',
    tags: ['stage2', 'faction_contact', 'Faction', 'Wardens', 'Social'],
    xpReward: 60,
    fn: function() {
      var roll = rollD20('persuasion', G.skills.persuasion);
      if (roll.total >= 13) {
        addNarration('Warden Route Exchange', 'The patrol leader walks you to a field desk at the edge of the checkpoint post and sets out three corridor maps. One has no public manifest notation — she points to it without comment. You file the complication report in your own name, which she witnesses and stamps. She gives you the maps in exchange. The transaction is entirely procedural. What she doesn\'t say is that your name is now in the Order\'s active monitoring log, and she knows you know that.');
        addJournal('Road Wardens Order provided route intelligence for three corridors, including one with no public manifest.', 'intelligence');
        G.flags.wardens_contact = true;
        G.flags.stage2_faction_contact_made = true;
        G.flags.red_hood_warned = true;
        G.investigationProgress = (G.investigationProgress || 0) + 1;
        applyTensionModifier('road_warden');
        if (!G.worldClocks) G.worldClocks = {};
        G.worldClocks.watchfulness = Math.min(10, (G.worldClocks.watchfulness || 0) + 1);
        maybeStageAdvance();
      } else {
        addNarration('Checkpoint — No Filing', 'The Warden listens, then shakes her head once. Without a formal complication report on record, she can\'t share monitored route data with a civilian transit — Order protocol. She\'s not unfriendly about it. The checkpoint clears and traffic resumes around you. The maps stay rolled under her arm.');
      }
    }
  },

  // ========== COLLEGIUM FACTION PATH (4 choices, plot:'main') ==========

  {
    id: 's2_collegium_1',
    text: 'Seld counted something on his fingers just now. He stopped at four.',
    tags: ['Investigation', 'Social'],
    plot: 'main',
    result: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.lore || 0);
      if (r.total >= 12) {
        G.lastResult = 'He touches each fingertip in sequence — thumb to little finger, then back — while he speaks about filing rotations, and the count doesn\'t match the words. He\'s tallying something else. When you meet his eyes he stops and glances toward the corridor. He says his name is Seld, that he works mornings in the secondary index, and that he has seen the same routing number appear in three separate suppression batches. He says it like a question. He leaves before you answer.';
        G.recentOutcomeType = 'discovery';
        G.flags.stage2_collegium_contact = true;
        G.flags.stage2_faction_contact_made = true;
        if (G.stageProgress) G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        addJournal('Junior archivist Seld approached with knowledge of suppressed routing patterns across three separate batches.', 'contact_made');
      } else {
        G.lastResult = 'He is precise with his words and his hands — thumb to fingertip, a private count. But the hallway is busy and whatever he was about to say gets absorbed into the foot traffic. He nods and moves on. The secondary index is visible from here. He\'ll be back at that desk in the morning, and the morning after. This thread is still open.';
        G.recentOutcomeType = 'complication';
        addJournal('Possible Collegium source identified in secondary index. No exchange yet.', 'intelligence');
      }
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof loadStageChoices === 'function') loadStageChoices();
    }
  },

  {
    id: 's2_collegium_2',
    text: 'Seld has a document fragment he isn\'t supposed to have.',
    tags: ['Investigation', 'Social'],
    plot: 'main',
    condition: function() { return G.flags && G.flags.stage2_collegium_contact; },
    result: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.lore || 0);
      if (r.total >= 11) {
        G.lastResult = 'He counts to four again before he speaks — a habit he probably doesn\'t notice. The fragment is a quarter-sheet, torn along a ruled line, in administrative script. Three routing codes and a date stamp from fourteen months ago. He says the full record was pulled from the main index and the withdrawal slip was filed under a category that shouldn\'t exist: "Procedural Alignment." He has seen that category twice. Both times the record disappeared within a week.';
        G.recentOutcomeType = 'discovery';
        G.investigationProgress = (G.investigationProgress || 0) + 1;
        if (G.stageProgress) G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        addJournal('Seld provided document fragment showing routing codes filed under suppressed category "Procedural Alignment."', 'evidence');
      } else {
        G.lastResult = 'He produces the fragment and then stops. His thumb finds his index finger and holds there — three, not four. He says there are readers assigned to this section today who are not the usual readers. He puts the fragment back in his coat. Tomorrow, he says, at the east reading room, second hour. He walks away counting on nothing, hands still.';
        G.recentOutcomeType = 'complication';
        addJournal('Collegium exchange postponed — archive readers reassigned, possible surveillance.', 'complication');
      }
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof loadStageChoices === 'function') loadStageChoices();
    }
  },

  {
    id: 's2_collegium_3',
    text: 'Seld is being watched. He knows and he came anyway.',
    tags: ['Confrontation', 'Social'],
    plot: 'main',
    condition: function() { return G.flags && G.flags.stage2_collegium_contact; },
    result: function() {
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var r = rollD20(G.skills.persuasion || 0);
      if (r.total >= 14) {
        G.lastResult = 'He sits across from you in the canteen and counts through all five fingers twice, both hands, before he says anything. Two Collegium readers have been logging his access requests for the past eight days. He knows because one of them left the notation sheet visible on the reading room desk — careless, or deliberate. He names what he needs from you: a route out of the building after dark, one night only. He is not asking to leave permanently. He is asking to move something.';
        G.recentOutcomeType = 'discovery';
        G.flags.stage2_collegium_risk_escalated = true;
        if (G.stageProgress) G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        addJournal('Seld confirmed under Collegium reader surveillance. Requested covert egress for one night.', 'intelligence');
      } else {
        G.lastResult = 'He starts the count and doesn\'t finish it. His hand closes flat on the table when he sees who is sitting two tables behind you. He stands, says he left something in the index room, and goes. The figure behind you stays seated. Neither of them looks at the other. Whatever Seld needed to say will wait, and the watchfulness around him is now something you have personally observed.';
        G.recentOutcomeType = 'complication';
        G.worldClocks.watchfulness = Math.min(10, (G.worldClocks.watchfulness || 0) + 1);
        addJournal('Collegium surveillance on Seld confirmed by direct observation. Meeting aborted.', 'complication');
      }
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof loadStageChoices === 'function') loadStageChoices();
    }
  },

  {
    id: 's2_collegium_4',
    text: 'Seld trusts process. The Wardens trust force. These are not compatible.',
    tags: ['Confrontation', 'Social'],
    plot: 'main',
    condition: function() { return G.flags && G.flags.stage2_collegium_contact && G.flags.stage2_wardens_contact; },
    result: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.persuasion || 0);
      if (r.total >= 13) {
        G.lastResult = 'You bring both threads to the same table — not literally, but in sequence, same afternoon. Seld wants the routing records formally entered into the Collegium\'s suppression index so they can\'t be quietly withdrawn again. The Warden contact wants them kept out of any official record so nothing triggers a jurisdictional review. Seld counts through his fingers while you explain the Warden\'s position. He stops at three. He says he can work with a sealed filing — not public, but permanent. You carry that back. The Warden accepts it with the expression of someone who has learned not to argue about procedure.';
        G.recentOutcomeType = 'discovery';
        G.flags.stage2_cross_faction_resolution = true;
        if (G.stageProgress) G.stageProgress[2] = (G.stageProgress[2] || 0) + 2;
        addJournal('Brokered sealed-filing compromise between Collegium and Road Wardens on routing records.', 'evidence');
      } else {
        G.lastResult = 'Seld\'s count stops at two. He says the Wardens\' position is not a procedural position — it\'s an operational one, and the Collegium doesn\'t work with operational arrangements. He\'s not hostile. He just stops moving. The two factions are pulling on the same piece of information from opposite directions and you are the only thing currently between them. That position does not become easier over time.';
        G.recentOutcomeType = 'complication';
        addJournal('Collegium-Wardens faction tension unresolved. Both claim authority over routing records.', 'complication');
      }
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof loadStageChoices === 'function') loadStageChoices();
    }
  },

  // ========== ROAD WARDENS FACTION PATH (4 choices, plot:'main') ==========

  {
    id: 's2_wardens_1',
    text: 'The checkpoint officer pulled my transit record before she said a word.',
    tags: ['Investigation', 'Social'],
    plot: 'main',
    result: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.lore || 0);
      if (r.total >= 12) {
        G.lastResult = 'She has your transit dates memorized — not from the sheet in her hand, from memory, which means she looked at this before you arrived. She asks about three specific route entries that don\'t follow a logical traveler\'s progression. She isn\'t accusing you. She is showing you that someone with access to route manifests has been tracking the same anomaly she has. She sets the transit record face-down between you and tells you her name is not important but her shift ends at dusk.';
        G.recentOutcomeType = 'discovery';
        G.flags.stage2_wardens_contact = true;
        G.flags.stage2_faction_contact_made = true;
        if (G.stageProgress) G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        addJournal('Road Wardens checkpoint officer identified anomalous transit patterns. First contact made.', 'contact_made');
      } else {
        G.lastResult = 'She goes through the standard questions and you give standard answers. The transit record sits between you, face up, and nothing about it prompts anything beyond procedure. She stamps the document and hands it back. The checkpoint queue moves. Whatever she was weighing, she kept it. The dusk shift is posted on the board behind her.';
        G.recentOutcomeType = 'complication';
        addJournal('Checkpoint clearance — no exchange. Officer noted transit record with unusual attention.', 'intelligence');
      }
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof loadStageChoices === 'function') loadStageChoices();
    }
  },

  {
    id: 's2_wardens_2',
    text: 'She has corridor data that hasn\'t been filed with any district office.',
    tags: ['Investigation', 'Social'],
    plot: 'main',
    condition: function() { return G.flags && G.flags.stage2_wardens_contact; },
    result: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.survival || 0);
      if (r.total >= 11) {
        G.lastResult = 'The maps she spreads across the field desk are patrol-issue — the kind that get updated by the officers walking the corridors, not by administrative decree. Three routes show markings she made herself: cargo movement times, vehicle types, one notation that reads "non-manifest, recurring." She circles the Shelk transit junction with one finger and says it happens every nine days. No one has filed a report because filing a report creates a record and a record creates a review and a review would go to the same office that is managing the movement.';
        G.recentOutcomeType = 'discovery';
        G.investigationProgress = (G.investigationProgress || 0) + 1;
        if (typeof addHeat === 'function') addHeat('shelk', 1);
        if (G.stageProgress) G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        addJournal('Warden officer provided field-annotated corridor maps showing recurring non-manifest cargo at Shelk transit junction.', 'evidence');
      } else {
        G.lastResult = 'She starts rolling the maps out, then stops. A second officer crosses the checkpoint post behind her, close enough to see the table. She rolls them back without comment and tells you the weather has made the northern routes unreliable this week. The second officer moves on. She doesn\'t open the maps again. The information she was about to show you is still somewhere inside her coat.';
        G.recentOutcomeType = 'complication';
        addJournal('Warden route intelligence exchange interrupted by second officer. Evidence held back.', 'complication');
      }
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof loadStageChoices === 'function') loadStageChoices();
    }
  },

  {
    id: 's2_wardens_3',
    text: 'The Wardens are being watched from above their own chain.',
    tags: ['Investigation', 'Social'],
    plot: 'main',
    condition: function() { return G.flags && G.flags.stage2_wardens_contact; },
    result: function() {
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var r = rollD20(G.skills.lore || 0);
      if (r.total >= 12) {
        G.lastResult = 'She tells you without drama: Order command has attached a compliance observer to the patrol district for thirty days. No stated reason. The observer attends briefings and says nothing. She has seen this before — twice, in other postings — and both times it meant someone above the district level had decided the local record was unreliable. She can share what she has while the window stays open, but after thirty days she doesn\'t know what her access will look like. The observation log is already running. She knows because the observer logs everything, including who she speaks to on her breaks.';
        G.recentOutcomeType = 'discovery';
        G.flags.stage2_wardens_under_watch = true;
        if (G.stageProgress) G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        addJournal('Road Wardens district under compliance observation from Order command. Thirty-day window before access changes.', 'intelligence');
      } else {
        G.lastResult = 'She says there has been a personnel change at the district level. She doesn\'t elaborate. The checkpoint traffic picks up and she goes back to processing transits. The pattern she described last time — nine days, Shelk junction — is still active. Whatever is happening inside the Order, it hasn\'t stopped the movement she\'s been watching. It has just made the people watching it more careful.';
        G.recentOutcomeType = 'complication';
        G.worldClocks.watchfulness = Math.min(10, (G.worldClocks.watchfulness || 0) + 1);
        addJournal('Warden contact closed down. Internal Order personnel shift observed.', 'complication');
      }
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof loadStageChoices === 'function') loadStageChoices();
    }
  },

  {
    id: 's2_wardens_4',
    text: 'The Wardens enforce what the Collegium documents. One without the other stops here.',
    tags: ['Social', 'Confrontation'],
    plot: 'main',
    condition: function() { return G.flags && G.flags.stage2_wardens_contact && G.flags.stage2_collegium_contact; },
    result: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.persuasion || 0);
      if (r.total >= 13) {
        G.lastResult = 'She listens to the shape of what the Collegium archivist described without asking his name, which tells you she already knows there is someone on that side tracking the same thing. She says the Order\'s compliance observer is logging who files complication reports and who doesn\'t — which means a formal Collegium record could trigger an Order review she can\'t control the outcome of. She pauses. Then she says: if the filing goes into a sealed category, the compliance observer won\'t flag it. She gives you the category designation without being asked.';
        G.recentOutcomeType = 'discovery';
        G.flags.stage2_cross_faction_resolution = true;
        if (G.stageProgress) G.stageProgress[2] = (G.stageProgress[2] || 0) + 2;
        addJournal('Road Wardens officer provided sealed filing category that satisfies Collegium process without triggering Order compliance review.', 'evidence');
      } else {
        G.lastResult = 'She hears you out and goes quiet for longer than is comfortable. What you are describing is a coordination between her chain and a civilian archive body, and Order protocol does not include that kind of lateral arrangement. She is not hostile, but she is no longer moving. She says she will think about it. That is the most she will say.';
        G.recentOutcomeType = 'complication';
        addJournal('Warden-Collegium coordination blocked by Order protocol. No resolution.', 'complication');
      }
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof loadStageChoices === 'function') loadStageChoices();
    }
  },

  // ========== GENERAL STAGE 2 INVESTIGATION CHOICES (12 choices) ==========

  {
    id: 's2_routing_crossref',
    text: 'The district numbers and the route numbers share a column they shouldn\'t.',
    tags: ['Investigation', 'Lore'],
    plot: 'side',
    result: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.lore || 0);
      if (r.total >= 12) {
        G.lastResult = 'The column alignment is not accidental. Someone has been filing district expense authorizations against route codes in a format that makes the cross-reference invisible unless you lay both ledgers side by side. The shared column represents seven months of movements that appear in neither record individually. You copy the column headings and the date range by hand. The ink on the copies is your own. The originals go back on the shelf.';
        G.recentOutcomeType = 'discovery';
        G.investigationProgress = (G.investigationProgress || 0) + 1;
        if (G.stageProgress) G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        addJournal('District expense records cross-referenced against route codes reveal seven months of hidden movement filings.', 'evidence');
      } else {
        G.lastResult = 'The cross-reference is there — you can see the column alignment — but the ledger you need for the route codes is not in the public index. It\'s in a restricted access section that requires a processing clerks\' endorsement. The public ledger goes back on the shelf. The gap in your record has a specific location now, and a specific procedure that stands between you and it.';
        G.recentOutcomeType = 'complication';
        addJournal('Route code ledger restricted — requires processing clerks\' endorsement. Cross-reference incomplete.', 'intelligence');
      }
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof loadStageChoices === 'function') loadStageChoices();
    }
  },

  {
    id: 's2_follow_the_watcher',
    text: 'Someone has been following my route. I want to know who gave them the itinerary.',
    tags: ['Stealth', 'Investigation'],
    plot: 'side',
    result: function() {
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var r = rollD20(G.skills.stealth || 0);
      if (r.total >= 13) {
        G.lastResult = 'You double back through the grain market where the stalls overlap and the sightlines are short. The figure behind you hesitates at the entrance — they\'re good, but not good enough with crowds. You watch from a vendor\'s alcove while they scan the stalls. When they move on, you follow them instead. They walk to a courier exchange office three streets over and go in. The building has a posting board outside. One of the notices lists a route summary — yours, from yesterday — posted as a query. Someone is paying for location updates on your transit.';
        G.recentOutcomeType = 'discovery';
        G.flags.stage2_surveillance_identified = true;
        if (G.stageProgress) G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        addJournal('Surveillance traced to courier exchange posting paid transit location queries on your movements.', 'evidence');
      } else {
        G.lastResult = 'You double back, but the figure anticipated it — or they have a partner you didn\'t account for. By the time you\'ve worked through the grain market, the trail is cold. You don\'t see them again that afternoon. They know you noticed, which means the nature of the surveillance has just changed. Whatever they were doing passively, they\'ll do actively now.';
        G.recentOutcomeType = 'complication';
        G.worldClocks.watchfulness = Math.min(10, (G.worldClocks.watchfulness || 0) + 1);
        addJournal('Surveillance counter-attempt failed. Watcher now aware of detection attempt.', 'complication');
      }
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof loadStageChoices === 'function') loadStageChoices();
    }
  },

  {
    id: 's2_sealed_archive_loophole',
    text: 'A procedural appeal is not the same as an access request. The rule doesn\'t cover it.',
    tags: ['Investigation', 'Lore'],
    plot: 'side',
    result: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.lore || 0);
      if (r.total >= 12) {
        G.lastResult = 'The procedural appeal window is forty-eight hours and requires a filing number rather than a name — which means you can reference the restricted record by its administrative designation without triggering the personal access review. The intake clerk accepts the form without looking at what it references. The appeal goes into the system. Six hours later, a summary record is returned to the public index by automatic procedure: three pages of the document you couldn\'t reach directly, now technically available under appeal review. Enough to read. Enough to copy.';
        G.recentOutcomeType = 'discovery';
        G.investigationProgress = (G.investigationProgress || 0) + 1;
        if (G.stageProgress) G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        addJournal('Procedural appeal loophole surfaced three pages of sealed routing authorization record.', 'evidence');
      } else {
        G.lastResult = 'The intake clerk accepts the form and then routes it to a senior archivist for review rather than processing it automatically. The senior archivist sends it back with a notation: procedural appeals require a party-of-record designation that matches an active transaction. You are not party of record on the filing number you used. The loophole closes. The clerk files your returned form under "Misdirected Inquiry" and stamps it with today\'s date.';
        G.recentOutcomeType = 'complication';
        addJournal('Appeal loophole closed by senior archivist review. Access still blocked.', 'complication');
      }
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof loadStageChoices === 'function') loadStageChoices();
    }
  },

  {
    id: 's2_merchant_subtext',
    text: 'He answered every question I didn\'t ask. Not one I did.',
    tags: ['Investigation', 'Social'],
    plot: 'side',
    result: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.persuasion || 0);
      if (r.total >= 12) {
        G.lastResult = 'You stop asking direct questions and start noting what he volunteers. He describes a shipping delay in language that implies he knew the route would be affected before the delay was announced. He mentions a district assessor by name, unprompted, the way you name a colleague rather than a threat. He tells you a cargo lot arrived "clean" — which is a specific reassurance no one asked him for. By the end of the conversation, you have three data points that don\'t fit the story he\'s telling. He notices you noticing and offers you tea.';
        G.recentOutcomeType = 'discovery';
        G.investigationProgress = (G.investigationProgress || 0) + 1;
        if (G.stageProgress) G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        addJournal('Merchant\'s volunteered information implies advance knowledge of route closures and connection to district assessor.', 'intelligence');
      } else {
        G.lastResult = 'He gives you exactly what you ask for and nothing adjacent to it. The answers are complete, consistent, and empty. He\'s done this before — answered questions precisely enough to close them without opening anything else. By the end you\'ve confirmed what you already knew and learned that he is careful. That\'s something. Just not what you came for.';
        G.recentOutcomeType = 'complication';
        addJournal('Merchant questioned. Answers precise and uninformative. Source is careful and aware.', 'intelligence');
      }
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof loadStageChoices === 'function') loadStageChoices();
    }
  },

  {
    id: 's2_recurring_name',
    text: 'That name has appeared in four separate documents from three different offices.',
    tags: ['Investigation', 'Lore'],
    plot: 'side',
    result: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.lore || 0);
      if (r.total >= 11) {
        G.lastResult = 'The name "Arven Pol" — a processing authority designation, not a personal name, which is why it survived multiple redaction passes — appears as signatory on four documents that have no stated connection to each other. Freight release in Shelk. Transit variance in the Roaz corridor. A cargo reclassification issued without physical inspection. An emergency route authorization that post-dates the route\'s closure. Every document moves something. The same authority signature approves it. No one in any of these offices is named Arven Pol.';
        G.recentOutcomeType = 'discovery';
        G.flags.stage2_arven_pol_identified = true;
        G.investigationProgress = (G.investigationProgress || 0) + 1;
        if (G.stageProgress) G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        addJournal('Processing authority "Arven Pol" appears across four unconnected documents — freight release, transit variance, cargo reclassification, emergency route authorization.', 'evidence');
      } else {
        G.lastResult = 'The name appears in two documents you can access. In both cases it\'s a processing authority designation rather than a personal identification, which means the records office treats it as a system code rather than an individual. The archivist on duty says these designations are assigned regionally and there\'s no central registry. The thread is real. The end of it is somewhere you can\'t reach from here.';
        G.recentOutcomeType = 'complication';
        addJournal('Recurring authority designation identified in two documents. No central registry to trace.', 'intelligence');
      }
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof loadStageChoices === 'function') loadStageChoices();
    }
  },

  {
    id: 's2_collegium_public_vs_deep',
    text: 'The public Collegium office exists to be seen. What\'s behind it does not.',
    tags: ['Investigation', 'Stealth'],
    plot: 'side',
    result: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.stealth || 0);
      if (r.total >= 13) {
        G.lastResult = 'The public intake desk processes citizen queries and files summary reports — nothing suppressed, nothing cross-referenced. But the corridor behind the intake desk has a door that does not appear on the building\'s public layout. You spend an afternoon mapping foot traffic: who goes through it, at what hours, carrying what. Three people with Collegium marks. One without any mark at all. The one without a mark goes through twice and both times leaves with a smaller bag than they entered with. That door is where the documents go when they stop being public.';
        G.recentOutcomeType = 'discovery';
        G.flags.stage2_collegium_inner_office_mapped = true;
        if (G.stageProgress) G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        addJournal('Collegium inner office mapped via foot traffic observation. Unmarked courier identified using unlisted access corridor.', 'intelligence');
      } else {
        G.lastResult = 'The public desk is thorough and unhelpful in equal measure. The staff are trained in exactly what questions to answer and in what register to decline the rest. You leave with a summary of information you already had and a pamphlet about the Collegium\'s role in transit procedure. The building behind the intake desk is not something the intake desk discusses.';
        G.recentOutcomeType = 'complication';
        addJournal('Collegium public office unproductive. No access to inner proceedings.', 'complication');
      }
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof loadStageChoices === 'function') loadStageChoices();
    }
  },

  {
    id: 's2_suppression_gap',
    text: 'There\'s a gap in the suppression pattern. Someone forgot a subcategory.',
    tags: ['Investigation', 'Lore'],
    plot: 'side',
    result: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.lore || 0);
      if (r.total >= 12) {
        G.lastResult = 'The suppression was applied to primary records and summary indices. But the subcategory cross-reference files — maintained separately, updated quarterly, and formatted for administrative review rather than public access — were not flagged. They\'re not public, but they\'re not restricted either. They sit in a procedural gap between suppression and disclosure. You pull the relevant quarter. Inside: cargo type codes, movement authorizations, and a column of inspection waivers, all referencing the same route cluster. The gap is probably deliberate. Someone left it.';
        G.recentOutcomeType = 'discovery';
        G.investigationProgress = (G.investigationProgress || 0) + 1;
        if (G.stageProgress) G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        addJournal('Subcategory cross-reference files survived suppression. Contains cargo codes, movement authorizations, inspection waivers from target route cluster.', 'evidence');
      } else {
        G.lastResult = 'The gap exists — the subcategory format is different from the primary records and falls outside the standard suppression protocol. But the specific quarter you need has already been archived to long-term storage, which requires a three-day retrieval request through the administrative register. Three days is a long time for a gap to stay open once someone notices you\'re looking at it.';
        G.recentOutcomeType = 'complication';
        addJournal('Suppression gap identified in subcategory files. Relevant quarter in long-term storage — three-day retrieval required.', 'intelligence');
      }
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof loadStageChoices === 'function') loadStageChoices();
    }
  },

  {
    id: 's2_district_night_records',
    text: 'The night shift desk doesn\'t log visitors. That\'s a known feature, not an oversight.',
    tags: ['Stealth', 'Investigation'],
    plot: 'side',
    result: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.stealth || 0);
      if (r.total >= 11) {
        G.lastResult = 'The night desk clerk is a different person from the day staff and operates under a separate register — one that does not record visitor names, only transaction codes. You come in as a transit inquiry and leave with access to the secondary manifest stack that the day staff redirects to the restricted counter. The night clerk processes the transaction by the code, not the category, and doesn\'t cross-check against the suppression list. Two hours of reading by lamplight. The secondary manifests cover routes the day counter says don\'t exist.';
        G.recentOutcomeType = 'discovery';
        G.investigationProgress = (G.investigationProgress || 0) + 1;
        if (G.stageProgress) G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        addJournal('Night shift access to secondary manifests confirmed. Routes listed in night records marked as non-existent in day records.', 'evidence');
      } else {
        G.lastResult = 'The night desk is different — quieter, less formal. But the clerk on duty tonight is not the usual one. He processes your transaction code and then holds it while he looks up the category in a cross-reference binder. The binder is the suppression index. He finds the match and tells you, without expression, that this category is restricted to credentialed personnel only. He stamps the transaction "declined" and files it. Tomorrow morning the day staff will see a declined night inquiry on record.';
        G.recentOutcomeType = 'complication';
        addJournal('Night desk access attempt declined. Suppression index checked by substitute clerk. Declined inquiry now on record.', 'complication');
      }
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof loadStageChoices === 'function') loadStageChoices();
    }
  },

  {
    id: 's2_inspection_waiver_trail',
    text: 'Waivers don\'t get signed without a reason. Someone approved these in bulk.',
    tags: ['Investigation', 'Lore'],
    plot: 'side',
    result: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.lore || 0);
      if (r.total >= 12) {
        G.lastResult = 'Eleven inspection waivers across a four-month window, all for cargo originating from the same two transfer points. Each waiver cites a different procedural basis — weather delay, transit emergency, seasonal reclassification — but all eleven were processed by the same authorization desk within a forty-eight-hour window of each other. The procedural bases are real categories. The timing makes it impossible for them to be independent decisions. Someone requested them all at once, formatted them individually, and filed them over four months to avoid the bulk-processing flag.';
        G.recentOutcomeType = 'discovery';
        G.flags.stage2_waiver_pattern_found = true;
        G.investigationProgress = (G.investigationProgress || 0) + 1;
        if (G.stageProgress) G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        addJournal('Eleven inspection waivers traced to single authorization desk. All processed within 48-hour window, filed over four months to avoid bulk-processing flags.', 'evidence');
      } else {
        G.lastResult = 'The waivers are individually valid — each cites a legitimate procedural category and carries a proper authorization stamp. Building a pattern requires accessing the processing timestamps from the authorization desk\'s internal log, which is not a public record. The waivers themselves are clean. The story they tell together is in data you can\'t reach without inside access.';
        G.recentOutcomeType = 'complication';
        addJournal('Inspection waivers individually valid. Timestamp pattern requires authorization desk internal log — not a public record.', 'intelligence');
      }
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof loadStageChoices === 'function') loadStageChoices();
    }
  },

  {
    id: 's2_cargo_reclassification',
    text: 'Reclassified cargo stops being cargo. That\'s the point of reclassifying it.',
    tags: ['Investigation', 'Lore'],
    plot: 'side',
    result: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.lore || 0);
      if (r.total >= 13) {
        G.lastResult = 'The reclassification entries move goods from the freight manifest into the "materials in transit" category — a classification used for institutional supplies that bypasses standard cargo inspection and customs declaration. Once reclassified, the goods disappear from the freight record entirely and reappear in a separate institutional ledger that isn\'t cross-referenced with customs. Six reclassifications over two years, all originating at the same loading dock, all arriving at a single institutional address in the inner district. You copy the address.';
        G.recentOutcomeType = 'discovery';
        G.investigationProgress = (G.investigationProgress || 0) + 1;
        if (G.stageProgress) G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        addJournal('Six cargo reclassifications traced from single loading dock to institutional address in inner district, bypassing customs via "materials in transit" category.', 'evidence');
      } else {
        G.lastResult = 'The reclassification process is legitimate and the records are clean. What the records don\'t show is what was reclassified — the category change strips the original goods description. All you can confirm is that something moved from freight status to institutional transit status, six times, from the same origin point. The destination is listed as "administrative receiving," which is a category, not an address.';
        G.recentOutcomeType = 'complication';
        addJournal('Cargo reclassification confirmed but goods descriptions stripped. Destination listed as category, not address.', 'intelligence');
      }
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof loadStageChoices === 'function') loadStageChoices();
    }
  },

  {
    id: 's2_warden_patrol_gap',
    text: 'There\'s a patrol gap that stays consistent. Gaps don\'t stay consistent by accident.',
    tags: ['Stealth', 'Investigation'],
    plot: 'side',
    result: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.survival || 0);
      if (r.total >= 11) {
        G.lastResult = 'Three days of observation from the same rooftop position — a tanning shed roof, which means the smell is considerable, but the sightline is direct. The gap in the patrol rotation is fourteen minutes, appearing at the same hour each evening. No variation. Patrol rotations have natural drift unless someone is actively managing the clock. You mark the gap\'s location: a loading bay access on the eastern freight corridor, wide enough for a cart.';
        G.recentOutcomeType = 'discovery';
        G.flags.stage2_patrol_gap_mapped = true;
        if (G.stageProgress) G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        addJournal('Fourteen-minute patrol gap mapped at eastern freight corridor loading bay. Gap is deliberately maintained — no natural drift across three-day observation.', 'intelligence');
      } else {
        G.lastResult = 'The patrol variation is real but inconsistent — two-day windows of a gap, then three days of coverage, then a gap again. You can\'t map it from outside without more data points. What you can say is that someone is managing this rotation, because natural patrol drift doesn\'t produce on-off patterns with this regularity. The loading bay is there. The window into it is not predictable yet.';
        G.recentOutcomeType = 'complication';
        addJournal('Patrol gap at eastern freight corridor identified but not yet mapped to consistent schedule.', 'intelligence');
      }
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof loadStageChoices === 'function') loadStageChoices();
    }
  },

  {
    id: 's2_ledger_ward_anomaly',
    text: 'The Iron Ledger Ward has a transaction that predates the institution\'s founding.',
    tags: ['Investigation', 'Lore'],
    plot: 'side',
    result: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.lore || 0);
      if (r.total >= 13) {
        G.lastResult = 'The date stamp is in the older format — a calendar notation that predates the current administrative system by six years. The Iron Ledger Ward was not established until four years after the current system began. The transaction it records should be impossible: a route authorization issued through an institution that didn\'t exist yet. The format is internally consistent and the seal is genuine. Someone created this record after the fact and backdated it. The transaction it authorizes is the origin point for the route cluster you\'ve been tracking.';
        G.recentOutcomeType = 'discovery';
        G.flags.stage2_backdated_origin_found = true;
        G.investigationProgress = (G.investigationProgress || 0) + 1;
        if (G.stageProgress) G.stageProgress[2] = (G.stageProgress[2] || 0) + 2;
        addJournal('Iron Ledger Ward transaction dated six years before the Ward\'s founding. Backdated origin record for target route cluster identified.', 'evidence');
      } else {
        G.lastResult = 'The date format is unusual — an older notation system — and the record sits slightly apart from the surrounding entries, which suggests it was filed separately. Whether that means it\'s anomalous or simply archaic you can\'t determine without knowing the Ward\'s founding date precisely, and that information is in a different section of the archive. The thread is there. Following it requires another visit.';
        G.recentOutcomeType = 'complication';
        addJournal('Iron Ledger Ward record with unusual date format identified. Verification requires Ward founding date from separate archive section.', 'intelligence');
      }
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof loadStageChoices === 'function') loadStageChoices();
    }
  },

  // ========== ARCHETYPE-EXCLUSIVE CHOICES (3 choices) ==========

  {
    id: 's2_arch_lore_cipher_read',
    text: 'The cipher format is institutional — I\'ve seen this encoding in the academy index.',
    tags: ['Investigation', 'Lore'],
    plot: 'side',
    condition: function() {
      return G.archetype && (
        G.archetype === 'Scholar' || G.archetype === 'Archivist' ||
        G.archetype === 'Sage' || G.archetype === 'Lorekeeper' ||
        (typeof getArchetypeFamily === 'function' && getArchetypeFamily(G.archetype) === 'lore')
      );
    },
    result: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.lore || 0);
      if (r.total >= 11) {
        G.lastResult = 'The encoding is a variant of the standard administrative cipher used in institutional correspondence — a format you know because your training covered the index systems of four administrative bodies. The variant tells you which body generated it: a fiscal sub-registry that operates under the Compact\'s transit authority but files under the district government\'s identifier. That administrative overlap is not accidental. It allows the same record to be reported to two separate oversight bodies without either body knowing the other received it. The document\'s full content opens under that key.';
        G.recentOutcomeType = 'discovery';
        G.investigationProgress = (G.investigationProgress || 0) + 1;
        if (G.stageProgress) G.stageProgress[2] = (G.stageProgress[2] || 0) + 2;
        addJournal('Institutional cipher decoded via academic training. Document reveals fiscal sub-registry filing under dual jurisdiction to prevent cross-body oversight.', 'evidence');
      } else {
        G.lastResult = 'The variant is close to a format you know, but diverges at the third encoding layer — a modification you haven\'t seen. The base structure is clear enough to read the headers and the date range. The content rows hold. What you can\'t decode is the authorization column, which is exactly what would identify the signatory. The cipher is almost within reach. Almost.';
        G.recentOutcomeType = 'complication';
        addJournal('Partial cipher decode via academic training. Authorization column remains encoded — third layer unresolved.', 'intelligence');
      }
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof loadStageChoices === 'function') loadStageChoices();
    }
  },

  {
    id: 's2_arch_craft_forged_seal',
    text: 'The seal impression is slightly off-center. I know what a correct stamp looks like.',
    tags: ['Investigation', 'Lore'],
    plot: 'side',
    condition: function() {
      return G.archetype && (
        G.archetype === 'Artificer' || G.archetype === 'Engineer' ||
        G.archetype === 'Alchemist' ||
        (typeof getArchetypeFamily === 'function' && getArchetypeFamily(G.archetype) === 'craft')
      );
    },
    result: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.craft || 0);
      if (r.total >= 12) {
        G.lastResult = 'The stamp die was cut from a different material than the standard Compact seal — harder, which produces a slightly sharper impression with less ink spread. The off-center placement is consistent across six documents, which rules out handling error. The person stamping these used a replica die, and they used the same one every time. A replica die requires a mold of the original. You photograph the impression angle with a ruled reference next to it. The documentation of a forged seal is itself evidence.';
        G.recentOutcomeType = 'discovery';
        G.flags.stage2_forged_seal_documented = true;
        G.investigationProgress = (G.investigationProgress || 0) + 1;
        if (G.stageProgress) G.stageProgress[2] = (G.stageProgress[2] || 0) + 2;
        addJournal('Forged Compact seal identified via impression analysis — harder die material, consistent off-center placement across six documents.', 'evidence');
      } else {
        G.lastResult = 'The seal impression is marginally off, but without a reference impression from a known-genuine document for direct comparison, you can\'t establish it as a forgery definitively. The deviation could be a worn die, a pressure variation, or stock paper difference. The anomaly is noted. Confirmation requires a genuine seal document from the same period and issuing office.';
        G.recentOutcomeType = 'complication';
        addJournal('Seal impression anomaly noted. Confirmation requires genuine comparison document from same issuing office.', 'intelligence');
      }
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof loadStageChoices === 'function') loadStageChoices();
    }
  },

  {
    id: 's2_arch_stealth_inner_access',
    text: 'The service entrance isn\'t on the floor plan. Neither is what\'s behind it.',
    tags: ['Stealth', 'Investigation'],
    plot: 'side',
    condition: function() {
      return G.archetype && (
        G.archetype === 'Rogue' || G.archetype === 'Infiltrator' ||
        G.archetype === 'Scout' || G.archetype === 'Shadowblade' ||
        (typeof getArchetypeFamily === 'function' && getArchetypeFamily(G.archetype) === 'stealth')
      );
    },
    result: function() {
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var r = rollD20(G.skills.stealth || 0);
      if (r.total >= 13) {
        G.lastResult = 'The service entrance is used by the building\'s laundry and supply intake — people moving things, always slightly loaded, never making eye contact with authority figures. You fit the pattern well enough. Inside: a utility corridor that runs behind the public reading room and connects to a records annex that has no door on the public side. The annex holds working files, not archive — current, active documents organized by processing date. What you find in the current week\'s batch: three route variance requests, two with "Arven Pol" as processing authority, all for the same corridor cluster.';
        G.recentOutcomeType = 'discovery';
        G.flags.stage2_inner_annex_accessed = true;
        G.investigationProgress = (G.investigationProgress || 0) + 1;
        if (G.stageProgress) G.stageProgress[2] = (G.stageProgress[2] || 0) + 2;
        addJournal('Records annex accessed via service entrance. Current-week files include three route variance requests under "Arven Pol" authority for target corridor cluster.', 'evidence');
      } else {
        G.lastResult = 'The service entrance is used by people who are expected there. A delivery clerk who\'s worked the route for years notices you in the corridor immediately — not because you look wrong exactly, but because the building knows its own people and you are not one of them. He doesn\'t call for a warden. He asks your business in a tone that makes it clear the question is a formality. You give a plausible answer and leave. The annex door, visible at the corridor\'s end, stays closed.';
        G.recentOutcomeType = 'complication';
        G.worldClocks.watchfulness = Math.min(10, (G.worldClocks.watchfulness || 0) + 1);
        addJournal('Service entrance approach identified by delivery clerk. Building staff now aware of unauthorized corridor presence.', 'complication');
      }
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof loadStageChoices === 'function') loadStageChoices();
    }
  },

  // Faction 4: Red Hood Guild
  {
    cid: 'stage2_redhood_contact',
    label: 'She knows about the unmarked cargo — that phrase wasn\'t an accident.',
    tags: ['stage2', 'faction_contact', 'Faction', 'RedHood', 'Stealth'],
    xpReward: 60,
    fn: function() {
      var roll = rollD20('persuasion', G.skills.persuasion);
      if (roll.total >= 13) {
        addNarration('Guild Fence Exchange', 'The market stall is loud enough that no one nearby can track the conversation. She doesn\'t want gold — she names a specific piece of institutional detail and waits. You give it. She listens without writing anything down, then produces a folded manifest from somewhere inside her coat. The routes marked are not on any public ledger. One column lists cargo descriptors the Guild uses internally; another lists the operations they\'ve been running parallel to. The stall bell rings. She resumes haggling with the next customer before you\'ve pocketed the paper.');
        addJournal('Red Hood Guild fence provided black-market access routes and an underworld manifest tied to the same operation.', 'intelligence');
        G.flags.red_hood_contact = true;
        G.flags.stage2_faction_contact_made = true;
        G.flags.wardens_hostile = true;
        G.investigationProgress = (G.investigationProgress || 0) + 1;
        applyTensionModifier('redhood_broker');
        if (G.factions && G.factions['wardens']) {
          G.factions['wardens'].standing = Math.max(-20, (G.factions['wardens'].standing || 0) - 3);
        }
        maybeStageAdvance();
      } else {
        addNarration('Guild Fence — No Deal', 'She names what she wants and you don\'t have it — or you have it and won\'t give it. Either way her expression doesn\'t change. She picks up a clay jar and turns it in her hands, appraising the glaze. The conversation is over. The stall stays busy around you and she doesn\'t look at you again.');
      }
    }
  }
];

window.STAGE2_ENRICHED_CHOICES = STAGE2_ENRICHED_CHOICES;
