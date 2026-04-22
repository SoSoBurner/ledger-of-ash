const STAGE2_ENRICHED_CHOICES = [
  // ========== TRAVEL ENCOUNTERS: Mysterious Figures & Hazardous Routes ==========
  {
    label: "You encounter a cloaked trader on the Ridgeway Pass offering strange maps. Investigate their origins and intentions.",
    tags: ['Travel', 'Mystery', 'Negotiation', 'Risk', 'Meaningful'],
    xpReward: 70,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'engaging mysterious traveler');
      
      const result = rollD20('insight', (G.skills.insight || 0) + Math.floor(G.level / 3));
      const target = 12 + Math.max(0, G.worldClocks.pressure);

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `The hood drops. Not a trader — a refugee who walked the Ridgeway three times in the last season. She knows which passes are watched and which are genuinely clear. Her hands are steady when she unfolds the actual route. She's been careful with who she shows it to.`;
        addJournal('alliance', 'Trader contact established', `trader-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `The maps look convincing — ink weight, road names, distance markers. You don't notice the divergence until you're two hours into terrain that ends at a flooded ravine. The figure in the cloak is long gone. The Ridgeway doesn't forgive poor judgment easily.`;
        addJournal('complication', 'Misled by false information', `false-maps-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `The trader answers questions with questions. What you get is real enough — two confirmed checkpoints, one road closure, and one stretch marked dangerous without explanation. What they're holding back is legible in the pauses. It's enough to move on.`;
        addJournal('intelligence', 'Partial map data', `maps-partial-${G.dayCount}`);
      }

      G.recentOutcomeType = 'travel';
      maybeStageAdvance();
    }
  },
  {
    label: "A convoy of merchants warns you of bandits blocking the northern route. Choose: risk the bandits or take a longer detour through unstable terrain.",
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
        addJournal('discovery', 'Supply cache found', `cache-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `The terrain is active. A slope that looked solid gives way under weight and you slide forty feet before catching a root cluster. Supplies scatter. One pack goes over the edge entirely. The ankle is wrenched, not broken, but every step for the next two days will cost something.`;
        addJournal('setback', 'Terrain damage', `injury-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `The detour adds most of a day. The ground is treacherous in patches but navigable if slow. You arrive intact, slightly behind, rations lighter than planned. The northern route was worse — three wrecked carts visible from the ridge confirmed it.`;
        addJournal('progress', 'Route traversed', `route-${G.dayCount}`);
      }

      G.recentOutcomeType = 'travel';
      maybeStageAdvance();
    }
  },
  {
    label: "A ferry captain demands an unusual toll—either coin or a 'favor' you must complete. Negotiate or find another crossing.",
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
        addJournal('complication', 'Reputation damage', `rep-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `He adds a docking surcharge that wasn't mentioned at the start. You pay it. He doesn't apologize. The crossing is quiet, the water is cold, and you arrive on the far bank with lighter coin and no further complications.`;
        addJournal('expense', 'Crossing toll paid', `toll-${G.dayCount}`);
      }

      G.recentOutcomeType = 'travel';
      maybeStageAdvance();
    }
  },
  {
    label: "You find abandoned camp with fresh supplies. Do you camp here (risky—may be watched) or press forward into darkness?",
    tags: ['Travel', 'Survival', 'Risk', 'Decision', 'Meaningful'],
    xpReward: 68,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(68, 'managing travel risks');
      
      const result = rollD20('perception', (G.skills.perception || 0) + Math.floor(G.level / 3));
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
        G.lastResult = `The camp is cold — abandoned at least a day ago. Someone left a pot half-packed and a bedroll pinned under a rock. You take nothing, sleep light, and leave before first light. The night passes without incident.`;
        addJournal('rest', 'Safe camping', `camp-${G.dayCount}`);
      }

      G.recentOutcomeType = 'travel';
      maybeStageAdvance();
    }
  },
  {
    label: "A young messenger is being pursued by armed riders. Intervene, hide, or avoid involvement altogether.",
    tags: ['Travel', 'Moral', 'Combat', 'Consequence', 'Meaningful'],
    xpReward: 73,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(73, 'making moral stand');
      
      const result = rollD20('empathy', (G.skills.persuasion || 0) + Math.floor(G.level / 2));
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
        G.lastResult = `The messenger breaks left into rough terrain and the riders lose them in the scrub. One of the riders holds at the tree line, looking back. You're still, and the light is bad. They move on. You don't know if they marked you. Probably not. Possibly yes.`;
        addJournal('action', 'Help given', `help-${G.dayCount}`);
      }

      G.recentOutcomeType = 'travel';
      maybeStageAdvance();
    }
  },
  {
    label: "A traveling scholar offers to join your group, but their papers are forged. Trust them or report them to authorities?",
    tags: ['Travel', 'Trust', 'Deception', 'Risk', 'Meaningful'],
    xpReward: 71,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(71, 'assessing companion trustworthiness');
      
      const result = rollD20('deception', (G.skills.deception || 0) + Math.floor(G.level / 3));
      const target = 12;

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `You fold his travel documents into your own kit and walk through the checkpoint talking about grain prices. The warden waves you through without looking at the secondary pack. The scholar exhales once you're clear and tells you his name: Doss. He relocated from Mimolot Academy after his research was suppressed. He travels with his notes hidden in the lining of his coat.`;
        addJournal('companion', 'Scholar joined', `scholar-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `The checkpoint warden separates the group for individual questioning — standard procedure that you didn't account for. The scholar's papers don't hold up to direct comparison. You spend two hours being questioned about how you met. The warden lets you go, but writes your description into the duty log before you leave.`;
        addJournal('complication', 'Authority suspicion', `authority-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You walk with him as far as the next waystation and point him toward a route that avoids the main checkpoints. He gives you a name in the next locality — someone who can be asked for help without explanation. No promises on either side. That's enough.`;
        addJournal('contact', 'Scholar network', `contact-${G.dayCount}`);
      }

      G.recentOutcomeType = 'travel';
      maybeStageAdvance();
    }
  },
  {
    label: "Strange lights appear on the horizon during night travel. Investigate, flee, or press onward and ignore them.",
    tags: ['Travel', 'Mystery', 'Danger', 'Investigation', 'Meaningful'],
    xpReward: 69,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(69, 'pursuing mysterious phenomenon');
      
      const result = rollD20('arcana', (G.skills.arcana || 0) + Math.floor(G.level / 3));
      const target = 13;

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `The pulse pattern is steady — not flame, not signal fire, but a slow blue-white throb spaced at equal intervals. Warden-stone markers, placed along maintained transit routes. Someone maintains this waypoint and expects people to recognize it. The shelter is stocked: water, a sealed candle, a district transit chart current to within two months.`;
        addJournal('discovery', 'Safe waypoint found', `waypoint-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `The lights pulse in a pattern that looks like a rest signal, and you move toward them. The ground between you and the source is occupied. They had a rope across the path. The next few minutes are ugly. You get clear, but you're down coin and one piece of kit that was worth more than the coin.`;
        addJournal('combat', 'Bandit trap', `trap-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You hold your ground and watch. The lights pulse irregularly, flare once, and go dark. Nothing moves toward you. You mark the location on your own chart and give it a wide berth. Whatever it was, it's gone now, and the road ahead is ordinary.`;
        addJournal('mystery', 'Phenomenon logged', `phenom-${G.dayCount}`);
      }

      G.recentOutcomeType = 'travel';
      maybeStageAdvance();
    }
  },
  {
    label: "You discover a hidden trail that could shorten your journey by three days. But it's clearly marked as forbidden territory.",
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
        G.lastResult = `The trail holds but barely — loose shale twice, a downed tree across the path that cost thirty minutes to work around. You reach the destination as the last light fades, aching and behind where you wanted to be, but intact. The shortcut was real. It just wasn't clean.`;
        addJournal('progress', 'Shortcut taken', `short-${G.dayCount}`);
      }

      G.recentOutcomeType = 'travel';
      maybeStageAdvance();
    }
  },
  {
    label: "A fellow traveler from your hometown appears on the road. They seem nervous. Reconnect or keep distance?",
    tags: ['Travel', 'Past', 'Connection', 'Caution', 'Meaningful'],
    xpReward: 70,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reconnecting with past');
      
      const result = rollD20('insight', (G.skills.insight || 0) + Math.floor(G.level / 3));
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
        G.lastResult = `You share a meal at a roadside post and don't say much that matters. She tells you the road behind is quieter than expected. You tell her the road ahead has one rough checkpoint. You part before dark, traveling in different directions. The conversation stays surface level by unspoken mutual agreement.`;
        addJournal('contact', 'Old connection revisited', `old-${G.dayCount}`);
      }

      G.recentOutcomeType = 'travel';
      maybeStageAdvance();
    }
  },
  {
    label: "Your group encounters refugees from a disaster area. Do you help them, question them for information, or move past?",
    tags: ['Travel', 'Moral', 'Intelligence', 'Consequence', 'Meaningful'],
    xpReward: 71,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(71, 'encountering regional crisis');
      
      const result = rollD20('medicine', (G.skills.insight || 0) + Math.floor(G.level / 3));
      const target = 12;

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `You dress wounds and distribute what food you can spare while listening. The picture that emerges across a dozen conversations is specific: not a natural disaster but a supply collapse, water access cut without notice, the district authority absent during the worst three days. One woman describes the order to evacuate coming from someone she'd never seen before, wearing a guild mark she didn't recognize. You write down the mark's description.`;
        addJournal('intelligence', 'Disaster intelligence gathered', `disaster-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `The crowd draws a patrol within twenty minutes. The wardens want to know who organized the aid distribution and under what authorization. They take your name and the name of anyone you were visibly speaking with. The refugees scatter. The questioning takes the rest of the afternoon.`;
        addJournal('complication', 'Official scrutiny', `scrutiny-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You hand out bread and water and keep your ears open. The story is consistent: three days of something, then a fast evacuation order, then the road. Nobody agrees on the cause. One man says flooding, another says a fire, a third won't say anything specific and keeps looking at the road behind him. The region is unstable. That much is clear.`;
        addJournal('news', 'Regional status known', `news-${G.dayCount}`);
      }

      G.recentOutcomeType = 'travel';
      maybeStageAdvance();
    }
  },

  // ========== FACTION PRESSURE: Negotiation & Alliance-Building ==========
  {
    label: "A faction envoy meets you in a roadside inn. They want information or a small deed. Consider carefully before committing.",
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
    label: "Two rival factions are competing for your allegiance. One offers wealth, one offers protection. Choose or refuse both.",
    tags: ['Faction', 'Choice', 'Power', 'Consequence', 'Meaningful'],
    xpReward: 74,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(74, 'navigating factional rivalry');
      
      const result = rollD20('deception', (G.skills.deception || 0) + Math.floor(G.level / 3));
      const target = 13;

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `You meet the first faction in the morning and the second in the evening, and you let each believe the meeting is the only one. The first offers transit protection. The second offers coin against a future debt. You take the protection and decline the coin in terms that leave the second faction thinking you're still deciding. Both remain engaged. Neither knows about the other. For now.`;
        addJournal('faction', 'Double negotiation success', `double-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `They talk to each other — faster than you expected, through a channel you didn't know they shared. By the time you reach your next meeting, both know you've been running parallel conversations. The first faction's representative doesn't raise her voice. She just slides your proposal back across the table and says she doesn't think this is a productive relationship.`;
        addJournal('complication', 'Factional suspicion', `susp-${G.dayCount}`);
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
    label: "A faction representative demands you eliminate a rival operative. Refuse, negotiate, or accept the contract.",
    tags: ['Faction', 'Moral', 'Violence', 'Pressure', 'Meaningful'],
    xpReward: 75,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'dealing with dark faction requests');
      
      const result = rollD20('insight', (G.skills.insight || 0) + Math.floor(G.level / 3));
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
    label: "You discover a faction safehouse during travels. Report it, infiltrate, or ignore it.",
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
        addJournal('intelligence', 'Safehouse intelligence', `safe-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `Someone is already inside when you push the door. The next few seconds are fast and loud. You get out, but not unseen. By evening, three people in the district have your description and instructions to pass it up the faction's chain. Staying in this area stops being a reasonable option.`;
        addJournal('threat', 'Active faction pursuit', `pursue-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You map the building from outside — entry points, window positions, the foot traffic pattern around the door at different hours. You don't go in, but you know the location and enough of the rhythm to work with later. The faction doesn't know you've been watching. That margin is worth keeping.`;
        addJournal('intelligence', 'Safehouse mapped', `map-${G.dayCount}`);
      }

      G.recentOutcomeType = 'faction';
      maybeStageAdvance();
    }
  },
  {
    label: "A faction insider offers to defect and provide secrets, but they're likely being monitored. Assist them or avoid the liability?",
    tags: ['Faction', 'Risk', 'Defection', 'Moral', 'Meaningful'],
    xpReward: 73,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(73, 'managing factional defection');
      
      const result = rollD20('deception', (G.skills.deception || 0) + Math.floor(G.level / 2));
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
        addJournal('intelligence', 'Partial defection info', `partial-${G.dayCount}`);
      }

      G.recentOutcomeType = 'faction';
      maybeStageAdvance();
    }
  },
  {
    label: "Faction leadership requests you as a mediator between their warring internal groups. This is a test of your loyalty.",
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
        addJournal('complication', 'Mediation failure', `med-fail-${G.dayCount}`);
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
    label: "A faction operative was supposed to meet you. Instead, you find their body. Cover it up, investigate, or report it?",
    tags: ['Faction', 'Mystery', 'Danger', 'Moral', 'Meaningful'],
    xpReward: 71,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(71, 'discovering operative death');
      
      const result = rollD20('investigation', (G.skills.investigation || 0) + Math.floor(G.level / 3));
      const target = 12;

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `The body is posed — positioned after death to look like a fall, which means someone moved it with specific intent. The operative's satchel is gone, but the lining of his boot holds a folded slip: a meeting location, a date, a single glyph mark you recognize from a rival faction's correspondence. He was killed before the meeting could happen. You arrive at the meeting point anyway and wait. Someone else shows up, and they're just as surprised to see you.`;
        addJournal('intelligence', 'Operative assassination solved', `death-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `You're still crouched over the body when you hear movement behind you. Whoever left the operative there didn't go far. They see your face and make a calculation. You put distance between yourself and the location fast, but not before they've had enough time to decide what to do with what they saw.`;
        addJournal('threat', 'Killer attention gained', `killer-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `The death is clean and recent — within the last six hours. No defensive wounds, no struggle marks on the ground nearby. The operative either trusted whoever did this or had no warning. His faction mark is removed but the spot where it sat is still visible on his jacket collar. This was deliberate and organized, not opportunistic.`;
        addJournal('intelligence', 'Operative death noted', `noted-${G.dayCount}`);
      }

      G.recentOutcomeType = 'faction';
      maybeStageAdvance();
    }
  },
  {
    label: "A faction wants you to spy on a neighboring region. Accept and build a network, or refuse and risk their displeasure?",
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
        addJournal('complication', 'Espionage discovered', `espy-${G.dayCount}`);
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
    label: "Faction resources are stolen. You're suspected. Prove innocence or find the real thief to clear your name.",
    tags: ['Faction', 'Suspicion', 'Investigation', 'Pressure', 'Meaningful'],
    xpReward: 73,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(73, 'clearing factional suspicion');
      
      const result = rollD20('investigation', (G.skills.investigation || 0) + Math.floor(G.level / 2));
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
    }
  },

  // ========== COMPANION DYNAMICS: Loyalty Tests & Moral Stands ==========
  {
    label: "A companion reveals they've been deceiving you about their past. Confront them, trust them anyway, or test their sincerity.",
    tags: ['Companion', 'Trust', 'Deception', 'Loyalty', 'Meaningful'],
    xpReward: 72,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(72, 'navigating companion deception');
      
      const result = rollD20('insight', (G.skills.insight || 0) + Math.floor(G.level / 3));
      const target = 12;

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `They tell you the shape of the lie first — who they said they were, what they said they'd done — and then the actual history underneath it. Not a confession. More like a building shown from the inside after years of only seeing the facade. You don't say anything for a while. When you do speak, you don't offer absolution. You ask one practical question about what comes next. That's enough. They exhale like they've been holding it for months.`;
        addJournal('companion', 'Deep trust forged', `trust-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `You push harder than the moment warrants. They answer your questions in single sentences, then stop answering. By the evening meal they're physically present but unreachable — their posture closed, their eyes on the middle distance. You've put something between you that wasn't there before, and they're not going to be the one to move it.`;
        addJournal('complication', 'Companion distance', `dist-${G.dayCount}`);
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
    label: "A companion wants to leave the group to pursue a personal vendetta. Talk them down, let them go, or join them.",
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
    label: "A companion is injured and needs expensive medicine. Spend your resources freely or negotiate carefully?",
    tags: ['Companion', 'Moral', 'Sacrifice', 'Care', 'Meaningful'],
    xpReward: 70,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'sacrificing for companion welfare');
      
      const result = rollD20('empathy', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
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
    label: "Two companions have conflicting morals about an important decision. Mediate or side with one?",
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
    label: "A companion confesses they've fallen ill with a contagion. Risk staying, or leave them behind?",
    tags: ['Companion', 'Sacrifice', 'Moral', 'Risk', 'Meaningful'],
    xpReward: 74,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(74, 'facing companion illness crisis');
      
      const result = rollD20('medicine', (G.skills.medicine || 0) + Math.floor(G.level / 3));
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
    label: "A companion's family member is imprisoned by authorities. Help rescue them, or convince companion to forget?",
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
      
      const result = rollD20('insight', (G.skills.insight || 0) + Math.floor(G.level / 2));
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
    label: "A companion tests your trust by revealing they were hired to watch you initially. Forgive, distance, or retaliate?",
    tags: ['Companion', 'Trust', 'Deception', 'Conflict', 'Meaningful'],
    xpReward: 70,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'processing companion betrayal revelation');
      
      const result = rollD20('empathy', (G.skills.insight || 0) + Math.floor(G.level / 3));
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
    label: "A scout brings intelligence of checkpoints ahead. Pay for detailed maps, interrogate them for free information, or use your network?",
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
        addJournal('intelligence', 'Route maps acquired', `maps-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `You push down on the price twice. The scout smiles and takes what you offer. The maps he gives you are technically accurate — for a route that was closed four months ago. You don't discover this until you're standing at a checkpoint that's been decommissioned and replaced by something stricter, three hours in the wrong direction.`;
        addJournal('complication', 'Misinformed', `misinf-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You pay mid-range and get mid-range. The information covers the main checkpoints and one alternate route without much detail on timing or personnel. Enough to move forward with some confidence but not enough to plan around complications. The scout was fair. So were you.`;
        addJournal('intelligence', 'Route information obtained', `info-${G.dayCount}`);
      }

      G.recentOutcomeType = 'intelligence';
      maybeStageAdvance();
    }
  },
  {
    label: "You intercept messages between institutions discussing travel restrictions. Decode them or pass the intelligence to a faction?",
    tags: ['Intelligence', 'Espionage', 'Information', 'Power', 'Meaningful'],
    xpReward: 71,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(71, 'intercepting institutional communication');
      
      const result = rollD20('arcana', (G.skills.arcana || 0) + Math.floor(G.level / 3));
      const target = 12;

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `The cipher is institutional — a format used across multiple administrative bodies rather than a personal code. Once you have the register key, the messages read clearly: a coordinated tightening of three transit routes, timed to a fiscal quarter. Not a response to any threat. Pre-planned. The restriction isn't reactive — it's a mechanism. The messages lay out the schedule across the next two months.`;
        addJournal('intelligence', 'Institutional strategy decoded', `decode-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `The cipher has a detection thread — a glyph sequence that activates on unauthorized access. You didn't see it in time. The message is now blank in your hands and whoever sent it has a notification that their communication was opened. Your position relative to the message's interception point is traceable.`;
        addJournal('threat', 'Interception detected', `det-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You get through the first layer of the cipher but the second layer holds. What you can read confirms that the restrictions are coordinated and timed — not ad hoc — and that at least two administrative bodies are involved. The specific details of what they're restricting and why remain in the encoded sections.`;
        addJournal('intelligence', 'Partial message decoded', `part-decode-${G.dayCount}`);
      }

      G.recentOutcomeType = 'intelligence';
      maybeStageAdvance();
    }
  },
  {
    label: "An institutional spy offers to trade information for protection. Provide shelter or turn them in for reward?",
    tags: ['Intelligence', 'Spy', 'Moral', 'Pressure', 'Meaningful'],
    xpReward: 72,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(72, 'harboring institutional spy');
      
      const result = rollD20('deception', (G.skills.deception || 0) + Math.floor(G.level / 3));
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
        addJournal('intelligence', 'Spy contact established', `spy-contact-${G.dayCount}`);
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
        addJournal('intelligence', 'Institutional objective revealed', `obj-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `One of the group doubles back through a side lane — a counter-surveillance maneuver that works exactly as intended. You're standing still when they come around the corner behind you. They look at you with the particular attention of someone who is paid to notice people following them. Nobody says anything. They continue on. But the official party now knows their route had a tail.`;
        addJournal('threat', 'Observation discovered', `obs-disc-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `They go into a building at the district's administrative edge. You note the address and the time. Two hours later they leave the same way they came in. You have a location, a duration, and the fact that three senior personnel considered whatever happened inside worth the walk. That's the start of something, not the end.`;
        addJournal('intelligence', 'Institutional meeting site mapped', `site-${G.dayCount}`);
      }

      G.recentOutcomeType = 'intelligence';
      maybeStageAdvance();
    }
  },
  {
    label: "A network of scouts offers to share their route intelligence network in exchange for protection. Accept or decline?",
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
        addJournal('complication', 'Network broken trust', `break-${G.dayCount}`);
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
    label: "You find a dead messenger with encrypted documents. Decrypt them, sell them, or investigate the death?",
    tags: ['Intelligence', 'Investigation', 'Mystery', 'Consequence', 'Meaningful'],
    xpReward: 71,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(71, 'investigating dead messenger');
      
      const result = rollD20('investigation', (G.skills.investigation || 0) + Math.floor(G.level / 3));
      const target = 12;

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `The cipher is standard Compact administrative encoding — familiar to you from the border documentation you've seen. Once broken, the documents read as a complete picture: three coordinated parties, two transit routes used for non-declared cargo, and a schedule of payments routed through a shell entity whose name appears in the Iron Ledger Ward records. The messenger was carrying confirmation of the arrangement, not orders. Someone killed a courier to stop confirmation, which means the arrangement is still live.`;
        addJournal('intelligence', 'Conspiracy uncovered', `cons-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `You spend an hour with the documents before you notice the location tag on the messenger's boot — a marking used by courier networks to note where a message was collected. Someone in the network tracks their people that way. By the time you've worked this out, you're back on the road, and by the next morning there's a second figure on your trail who wasn't there before. They don't approach. They just stay at range and watch.`;
        addJournal('threat', 'Killer attention', `killer-att-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `The first layer decodes to a transit schedule with route codes you don't immediately recognize. You get through enough to map three delivery dates and two pickup locations before the second cipher layer stops you. The routing information is current and specific. It's half the picture — but the half that tells you where to look next.`;
        addJournal('intelligence', 'Partial documents decrypted', `partial-doc-${G.dayCount}`);
      }

      G.recentOutcomeType = 'intelligence';
      maybeStageAdvance();
    }
  },
  {
    label: "Institutional archives are breached. Access sensitive information before it's locked down or warn authorities?",
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
        addJournal('intelligence', 'Archives breached successfully', `breach-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `The breach alert triggers faster than the external pattern suggested — someone was watching the reading room specifically. The lockdown seals before you reach the secondary exit. The warden personnel who find you in the stacks take your name before they allow you to leave. You're not detained. But your name and description are now in the incident log, and the institution's security review will include you.`;
        addJournal('threat', 'Archive trap discovery', `trap-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You get four documents out before the lockdown closes the secondary stacks. Three are useful, one is administrative noise. The exit is rushed — you leave through the public reading room just as the wardens begin clearing it, and nobody looks twice at someone already walking toward the door. The partial access is real intelligence. It's just not complete.`;
        addJournal('intelligence', 'Partial archive access', `part-arch-${G.dayCount}`);
      }

      G.recentOutcomeType = 'intelligence';
      maybeStageAdvance();
    }
  },
  {
    label: "A corruption network wants you as a witness against institutional officials. Testify, refuse, or bargain for protection?",
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
  }
];
window.STAGE2_ENRICHED_CHOICES = STAGE2_ENRICHED_CHOICES;
