const STAGE2_ENRICHED_CHOICES = [
  // ========== TRAVEL ENCOUNTERS: Mysterious Figures & Hazardous Routes ==========
  {
    label: "The cloaked trader on the Ridgeway has maps she isn't selling to everyone.",
    tags: ['Travel', 'Mystery', 'Negotiation', 'Risk', 'Meaningful'],
    tag: 'risky',
    xpReward: 70,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'engaging mysterious traveler');
      
      const result = rollD20('charm', (G.skills.charm || 0) + Math.floor(G.level / 3));
      const target = 12 + Math.max(0, G.worldClocks.pressure);

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `The hood drops. Not a trader — a refugee who walked the Ridgeway three times in the last season. She knows which passes are watched and which are genuinely clear. Her hands are steady when she unfolds the actual route, weighting the corners with river stones she carries for exactly this purpose. She's been careful with who she shows it to. The road names are marked in her own shorthand, but she reads each one aloud without being asked.`;
        addJournal('Trader contact established', 'contact_made');
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `The maps look convincing — ink weight, road names, distance markers. You don't notice the divergence until you're two hours into terrain that ends at a flooded ravine. The figure in the cloak is long gone. The Ridgeway doesn't forgive poor judgment easily — the pressure of two lost hours makes every junction on the remaining route harder to read with confidence.`;
        addJournal('Misled by false information', 'complication', `false-maps-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `The trader answers questions with questions. What you get is real enough — two confirmed checkpoints, one road closure, and one stretch marked dangerous without explanation. A fold in the map shows a third route, unmarked, which she traces with one finger but does not name. What they're holding back is legible in the pauses. It's enough to move on. The pattern holds even when the documents don't.`;
        addJournal('Partial map data', 'intelligence', `maps-partial-${G.dayCount}`);
      }

      G.recentOutcomeType = 'travel';
      maybeStageAdvance();
    }
  },
  {
    label: "The northern route is blocked. The detour is unstable. Both cost something.",
    tags: ['Travel', 'Risk', 'Decision', 'Route', 'Meaningful'],
    tag: 'risky',
    xpReward: 72,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(72, 'choosing dangerous route');
      
      const result = rollD20('vigor', (G.skills.vigor || 0) + Math.floor(G.level / 2));
      const target = 13;

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `The unstable ground is looser than the merchants described, but you read it right — step weight, grip angle, the way water drains off the shelf rock. Halfway through, a depression in the hillside holds old supply crates, sealed with wax cloth, abandoned in good condition. The wax cloth has kept them dry for at least two seasons. Three days of provisions and a copy of a regional transit map, with route closures annotated by hand in a different ink from the original print.`;
        addJournal('Supply cache found', 'discovery', `cache-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `The terrain is active. A slope that looked solid gives way under weight and you slide forty feet before catching a root cluster. Supplies scatter. One pack goes over the edge entirely. The ankle is wrenched, not broken, but every step for the next two days will cost something. The pressure of a wrenched ankle is harder to carry on unstable terrain than on flat road — the detour already demanded more than it offered.`;
        addJournal('Terrain damage', 'complication');
      } else {
        G.stageProgress[2]++;
        G.lastResult = `The detour adds most of a day. The ground is treacherous in patches but navigable if slow. You arrive intact, slightly behind, rations lighter than planned. The northern route was worse — three wrecked carts visible from the ridge, one with a wheel still spinning when you passed above it. Someone keeps the northern pass closed and the detour unmarked. There is still the matter of who is managing which routes stay open and which don't.`;
        addJournal('Route traversed', 'intelligence');
      }

      G.recentOutcomeType = 'travel';
      maybeStageAdvance();
    }
  },
  {
    label: "The ferry captain's toll is not the listed one. The alternative is worse.",
    tags: ['Travel', 'Negotiation', 'Pressure', 'Choice', 'Meaningful'],
    tag: 'risky',
    xpReward: 70,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'negotiating river crossing');
      
      const result = rollD20('charm', (G.skills.charm || 0) + Math.floor(G.level / 3));
      const target = 11 + Math.max(0, G.worldClocks.pressure);

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `You name a fair price and don't haggle. The captain watches you for a moment, then nods and waves the crew to ready the ramp. The crossing is smooth — cold water, a steady current, the crew working without the small resentments that come with underpaid work. On the far bank, he says the next crossing is free. He's dealt with enough people who try to negotiate his livelihood into nothing. Plain dealing sits differently with him.`;
        addJournal('Ferry master favor', 'contact_made');
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `The captain's jaw tightens at the third counter-offer. He points at the far bank and tells you to find another way across. By the time you reach the next settlement, two ferrymen there have already heard a description of you. The river trade talks to itself — you are tracked by name along every crossing point between here and the confluence.`;
        addJournal('Reputation damage', 'complication', `rep-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `He adds a docking surcharge that wasn't mentioned at the start. You pay it. He doesn't apologize. The crossing is quiet — water dark, oars pulling slow, the crew watching the far bank without interest. You arrive intact, coin lighter than planned, no further complications offered. The river smells of mud and old rope. The Collegium's outer office is not the only layer — neither is any toll structure on a monitored crossing.`;
        addJournal('Crossing toll paid', 'complication');
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
      
      const result = rollD20('vigor', (G.skills.vigor || 0) + Math.floor(G.level / 3));
      const target = 12;

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `Boot prints, two sizes, walking not running. Fire banked correctly — someone who planned to return. A notched stick on the supply bag: a scout marker, the kind used by trail wardens in this region. When they come back an hour later, they're more surprised than hostile. They share the fire and the terrain report for the next two days.`;
        addJournal('Scout network mapped', 'contact_made');
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `The camp looks empty. It isn't. Three figures step out of the treeline before you're halfway across the clearing — they waited while you walked in. The next hour is loud and costs more than supplies. The darkness works against you just as much as them. The pressure of a sprung ambush is that its owners noticed you approaching before you noticed them — this clearing will be harder to use as cover again.`;
        addJournal('Ambush encounter', 'complication');
      } else {
        G.stageProgress[2]++;
        G.lastResult = `The camp is cold — abandoned at least a day ago. Someone left a pot half-packed and a bedroll pinned under a rock. You take nothing, sleep light, and leave before first light. The night passes without incident. Seld's name appears in the suppression gap — and whoever used this camp knew the route well enough to leave in a hurry.`;
        addJournal('Safe camping', 'intelligence');
      }

      G.recentOutcomeType = 'travel';
      maybeStageAdvance();
    }
  },
  {
    label: "The messenger is being run down. The riders are organized.",
    tags: ['Travel', 'Moral', 'Combat', 'Consequence', 'Meaningful'],
    tag: 'bold',
    xpReward: 73,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(73, 'making moral stand');
      
      const result = rollD20('charm', (G.skills.charm || 0) + Math.floor(G.level / 2));
      const target = 13;

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `The riders pull up at a fork in the path, uncertain, and the messenger slips into the undergrowth while they argue. They don't see you. The messenger catches up to you an hour later, still breathing hard, carrying a sealed tube that turns out to contain transit route documentation for three restricted corridors. They're grateful in a specific, practical way.`;
        addJournal('Messenger alliance forged', 'contact_made');
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `The riders are faster than you judged and more organized. The messenger goes down in the third pass. One rider wheels toward you, and by the time you've put distance between yourself and the road, they've gotten a clear look at your face. The messenger's name is something you'll hear again in worse circumstances. You are now tracked by whoever commissioned those riders — they have a face to attach to the name.`;
        addJournal('Wanted status rising', 'complication');
      } else {
        G.stageProgress[2]++;
        G.lastResult = `The messenger breaks left into rough terrain and the riders lose them in the scrub. One of the riders holds at the tree line, looking back. You're still, and the light is bad. They move on. You don't know if they marked you. Probably not. Possibly yes. There is still the matter of what the messenger was carrying and who sent the riders after it.`;
        addJournal('Help given', 'intelligence');
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
      
      const result = rollD20('finesse', (G.skills.finesse || 0) + Math.floor(G.level / 3));
      const target = 12;

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `You fold his travel documents into your own kit and walk through the checkpoint talking about grain prices. The warden waves you through without looking at the secondary pack. The scholar exhales once you're clear and tells you his name: Doss. He relocated from Mimolot Academy after his research was suppressed. He travels with his notes hidden in the lining of his coat.`;
        addJournal('Scholar joined', 'contact_made');
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `The checkpoint warden separates the group for individual questioning — standard procedure that you didn't account for. The scholar's papers don't hold up to direct comparison. You spend two hours being questioned about how you met. The warden lets you go, but writes your description into the duty log before you leave. The scrutiny of a duty log entry means the next checkpoint on this route will have your description before you arrive.`;
        addJournal('Authority suspicion', 'complication', `authority-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You walk with him as far as the next waystation and point him toward a route that avoids the main checkpoints. He gives you a name in the next locality — someone who can be asked for help without explanation. No promises on either side. That's enough. The Collegium's outer office is not the only layer — and a researcher whose work was suppressed knows exactly which layer stopped him.`;
        addJournal('Scholar network', 'contact_made');
      }

      G.recentOutcomeType = 'travel';
      maybeStageAdvance();
    }
  },
  {
    label: "The lights on the horizon pulse at equal intervals. That regularity means something.",
    tags: ['Travel', 'Mystery', 'Danger', 'Investigation', 'Meaningful'],
    tag: 'risky',
    xpReward: 69,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(69, 'pursuing mysterious phenomenon');
      
      const result = rollD20('wits', (G.skills.wits || 0) + Math.floor(G.level / 3));
      const target = 13;

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `The pulse pattern is steady — not flame, not signal fire, but a slow blue-white throb spaced at equal intervals. Warden-stone markers, placed along maintained transit routes. Someone maintains this waypoint and expects people to recognize it. The shelter is stocked: water, a sealed candle, a district transit chart current to within two months. The candle smells of pitch and lavender, a preservation treatment used in northern supply caches. Whoever keeps this waypoint comes through regularly enough to restock it.`;
        addJournal('Safe waypoint found', 'discovery', `waypoint-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `The lights pulse in a pattern that looks like a rest signal, and you move toward them. The ground between you and the source is occupied. They had a rope across the path. The next few minutes are ugly. You get clear, but you're down coin and one piece of kit that was worth more than the coin. The pressure of a sprung light-trap is that the people who set it noticed your approach long before the rope — this pattern will be harder to ignore on the next road.`;
        addJournal('Bandit trap', 'complication');
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You hold your ground and watch. The lights pulse irregularly, flare once, and go dark. Nothing moves toward you. You mark the location on your own chart and give it a wide berth. Whatever it was, it's gone now, and the road ahead is ordinary. The pattern holds even when the documents don't — and warden-stone markers don't pulse unless someone is maintaining them.`;
        addJournal('Phenomenon logged', 'discovery');
      }

      G.recentOutcomeType = 'travel';
      maybeStageAdvance();
    },
    failResult: 'This path is closed here, but warden-stone routes still run through the district network — and someone maintains them for a reason.'
  },
  {
    label: "The forbidden trail saves three days. The prohibition markers don't say why.",
    tags: ['Travel', 'Route', 'Risk', 'Temptation', 'Meaningful'],
    tag: 'bold',
    xpReward: 72,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(72, 'navigating forbidden terrain');
      
      const result = rollD20('vigor', (G.skills.vigor || 0) + Math.floor(G.level / 2));
      const target = 12 + Math.max(0, G.worldClocks.pressure);

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `The trail is narrow and old but solid underfoot. You move fast and quiet, and you arrive three days ahead of the standard route. From the ridge before the descent, you can see the patrol pattern on the main road below — the gap in their rotation, the timing of the second watch. You map it. That information is worth the risk on its own.`;
        addJournal('Secret passage mapped', 'discovery');
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `The prohibition markers aren't just legal. Something has been using this trail for longer than the restriction. You hear it before you see it. Getting out costs you an hour of bad terrain, a gashed forearm, and the pack you dropped when you ran. The markers didn't explain what they were warning about, but they weren't wrong. The pressure of a lost pack and a gashed forearm means the standard route will be harder to sustain over the next two days.`;
        addJournal('Territorial encounter', 'complication');
      } else {
        G.stageProgress[2]++;
        G.lastResult = `The trail holds but barely — loose shale twice, a downed tree across the path that cost thirty minutes to work around. You reach the destination as the last light fades, aching and behind where you wanted to be, but intact. The shortcut was real. It just wasn't clean. There is still the matter of who posted the prohibition markers and what they're protecting on this corridor.`;
        addJournal('Shortcut taken', 'intelligence');
      }

      G.recentOutcomeType = 'travel';
      maybeStageAdvance();
    }
  },
  {
    label: "Someone from home is on this road. They're nervous for a reason.",
    tags: ['Travel', 'Past', 'Connection', 'Caution', 'Meaningful'],
    tag: 'risky',
    xpReward: 70,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reconnecting with past');
      
      const result = rollD20('charm', (G.skills.charm || 0) + Math.floor(G.level / 3));
      const target = 11;

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `You recognize each other without the usual pleasantries. She left for the same reasons you did, two weeks after you, by a different route. She's been moving carefully. She has a name you don't — someone in the next locality who runs a safe house for people in transit. The shared history skips the part where you establish trust. You already know each other well enough to know what the other won't say.`;
        addJournal('Hometown connection renewed', 'contact_made');
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `His face goes still when he sees you — not recognition, something else. He nods and walks on. Two hours later you notice you're being followed by someone you don't recognize. The gap between seeing someone from home and trusting them is wider than you remembered. You are now tracked by whoever he reported to — and someone from home told them what to watch for.`;
        addJournal('Location compromised', 'complication');
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You share a meal at a roadside post and don't say much that matters. She tells you the road behind is quieter than expected. You tell her the road ahead has one rough checkpoint. You part before dark, traveling in different directions. The conversation stays surface level by unspoken mutual agreement. Seld's name appears in the suppression gap — and people who left for the same reasons you did often crossed the same records on their way out.`;
        addJournal('Old connection revisited', 'contact_made');
      }

      G.recentOutcomeType = 'travel';
      maybeStageAdvance();
    }
  },
  {
    label: "The refugees' stories don't match each other. Something was done to their district.",
    tags: ['Travel', 'Moral', 'Intelligence', 'Consequence', 'Meaningful'],
    tag: 'bold',
    xpReward: 71,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(71, 'encountering regional crisis');
      
      const result = rollD20('wits', (G.skills.charm || 0) + Math.floor(G.level / 3));
      const target = 12;

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `You dress wounds and distribute what food you can spare while listening. The picture that emerges across a dozen conversations is specific: not a natural disaster but a supply collapse, water access cut without notice, the district authority absent during the worst three days. One woman describes the order to evacuate coming from someone she'd never seen before, wearing a guild mark she didn't recognize. You write down the mark's description.`;
        addJournal('Disaster intelligence gathered', 'intelligence', `disaster-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `The crowd draws a patrol within twenty minutes. The wardens want to know who organized the aid distribution and under what authorization. They take your name and the name of anyone you were visibly speaking with. The refugees scatter. The questioning takes the rest of the afternoon. The scrutiny attached to an unauthorized aid distribution means the warden network in this district now has your name alongside the names you were seen speaking with.`;
        addJournal('Official scrutiny', 'complication', `scrutiny-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You hand out bread and water and keep your ears open. The story is consistent: three days of something, then a fast evacuation order, then the road. Nobody agrees on the cause. One man says flooding, another says a fire, a third won't say anything specific and keeps looking at the road behind him. The region is unstable. That much is clear. There is still the matter of the name that appears in four unconnected offices — and supply collapses don't happen in isolation.`;
        addJournal('Regional status known', 'intelligence');
      }

      G.recentOutcomeType = 'travel';
      maybeStageAdvance();
    }
  },

  // ========== FACTION PRESSURE: Negotiation & Alliance-Building ==========
  {
    label: "The faction envoy's offer is specific. What he wants in return is not fully stated.",
    tags: ['Faction', 'Negotiation', 'Pressure', 'Alliance', 'Meaningful'],
    tag: 'risky',
    xpReward: 72,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(72, 'engaging with faction politics');
      
      const result = rollD20('charm', (G.skills.charm || 0) + Math.floor(G.level / 3));
      const target = 12 + Math.max(0, G.worldClocks.pressure);

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `You set the terms before they do: what you'll do, what you won't, what happens if they push past the edge. The envoy writes it into his notes without argument — a small book with a worn clasp, the kind carried by people who take these meetings seriously. He didn't come expecting that kind of clarity and it changes how he sits. The arrangement holds because both parties know exactly what it covers and neither has left room for a misunderstanding.`;
        addJournal('Alliance negotiated', 'intelligence');
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `You take too long answering the first question. The envoy watches the pause like a tax assessor watching a merchant weigh coin. By the time you've found your answer, he's already decided something about you. He thanks you for your time with the specific courtesy of someone who won't be sending another envoy. The pressure of a concluded assessment travels back to the faction before you've left the room — the door this envoy closes is harder to reopen than it was to approach.`;
        addJournal('Faction hostility', 'complication');
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You agree to nothing specific and commit to nothing in writing. The envoy accepts this more easily than you expected — he's done this before, in other inns, with other cautious people who needed time. He finishes his drink without hurrying. He leaves you a location marker pressed into the side of the table, a fold of wax paper with a mark on it. Says someone will be in touch. The door stays open.`;
        addJournal('Faction contact maintained', 'contact_made');
      }

      G.recentOutcomeType = 'faction';
      maybeStageAdvance();
    }
  },
  {
    label: "Two factions want the same thing from me. They're watching which one I answer first.",
    tags: ['Faction', 'Choice', 'Power', 'Consequence', 'Meaningful'],
    tag: 'risky',
    xpReward: 74,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(74, 'navigating factional rivalry');
      
      const result = rollD20('finesse', (G.skills.finesse || 0) + Math.floor(G.level / 3));
      const target = 13;

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `You meet the first faction in the morning and the second in the evening, and you let each believe the meeting is the only one. The first offers transit protection. The second offers coin against a future debt. You take the protection and decline the coin in terms that leave the second faction thinking you're still deciding. Both remain engaged. Neither knows about the other. For now.`;
        addJournal('Double negotiation success', 'intelligence');
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `They talk to each other — faster than you expected, through a channel you didn't know they shared. By the time you reach your next meeting, both know you've been running parallel conversations. The first faction's representative doesn't raise her voice. She just slides your proposal back across the table and says she doesn't think this is a productive relationship. You are now tracked by both factions as the person who tried to play both sides — the third faction in this region will hear the same account before you reach them.`;
        addJournal('Factional suspicion', 'complication', `susp-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `The faction offering protection is more reliable than the one offering coin. That calculation isn't obvious to everyone, but it is to you. You say so plainly to the faction representative, who accepts without ceremony and leaves the table without a handshake. The other faction will hear about it before the week is out. That tension will show up later, probably at a bad time, in a place you won't be prepared for it.`;
        addJournal('Allegiance declared', 'intelligence');
      }

      G.recentOutcomeType = 'faction';
      maybeStageAdvance();
    }
  },
  {
    label: "Yes to this is permanent. The faction knows that when they ask.",
    tags: ['Faction', 'Moral', 'Violence', 'Pressure', 'Meaningful'],
    tag: 'bold',
    xpReward: 75,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'dealing with dark faction requests');
      
      const result = rollD20('charm', (G.skills.charm || 0) + Math.floor(G.level / 3));
      const target = 12;

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `You decline without explaining yourself at length. The representative reads your posture and doesn't press. He leans back, drums two fingers once on the armrest, stops. He says, after a pause, that he appreciates someone who knows their own limits — it makes you predictable in useful ways. The faction doesn't rescind the relationship. They recalibrate what they'll ask for next time, and that recalibration happens in a room you won't be in.`;
        addJournal('Moral boundary upheld', 'complication');
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `You hedge when you should be direct. The representative listens, nods, and asks if you need more time to consider. You say no. He says he'll pass that along. The way he says it makes clear that "passing it along" means something specific within the faction, and it isn't a compliment. The pressure of a negative assessment passed along through faction channels is harder to reverse than a refusal delivered in person.`;
        addJournal('Faction displeasure', 'complication');
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You propose a different task — same stakes, less irreversible. The faction representative writes it down without enthusiasm, his pen moving in the small careful strokes of someone recording something they expect to revisit. He says someone will confirm whether it's acceptable, which means the decision doesn't belong to him. Neither party is satisfied, but the conversation ends without a broken door. That's a kind of success, and sometimes that's all there is.`;
        addJournal('Uneasy détente', 'complication');
      }

      G.recentOutcomeType = 'faction';
      maybeStageAdvance();
    }
  },
  {
    label: "The faction safehouse is unguarded at the wrong hour. That might not be an accident.",
    tags: ['Faction', 'Discovery', 'Risk', 'Intelligence', 'Meaningful'],
    tag: 'risky',
    xpReward: 70,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'discovering faction infrastructure');
      
      const result = rollD20('finesse', (G.skills.finesse || 0) + Math.floor(G.level / 3));
      const target = 13 + Math.max(0, G.worldClocks.pressure);

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `The door is unlatched — a rotation error, or someone was careless. Inside: a cot, a locked box, a transit schedule pinned above the window with a single nail. The cot smells of lanolin and old wool. You copy the schedule by lamplight, leave without touching anything else, and re-latch the door from outside. The transit dates match three known cargo movements you've been watching. This is where they coordinate the overlap.`;
        addJournal('Safehouse intelligence', 'intelligence', `safe-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `Someone is already inside when you push the door. The next few seconds are fast and loud. You get out, but not unseen. By evening, three people in the district have your description and instructions to pass it up the faction's chain. Staying in this area stops being a reasonable option. You are now tracked through the faction's chain with a description accurate enough to reach the next district before you do.`;
        addJournal('Active faction pursuit', 'complication');
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You map the building from outside — entry points, window positions, the foot traffic pattern around the door at different hours. Three days of watching from different positions in the surrounding market. You don't go in, but you know the location and enough of the rhythm to work with later. The faction doesn't know you've been watching. That margin is worth keeping, and it takes discipline to keep it.`;
        addJournal('Safehouse mapped', 'intelligence', `map-${G.dayCount}`);
      }

      G.recentOutcomeType = 'faction';
      maybeStageAdvance();
    }
  },
  {
    label: "She's been watched long enough to know the gaps in the rotation. She wants out.",
    tags: ['Faction', 'Risk', 'Defection', 'Moral', 'Meaningful'],
    tag: 'bold',
    xpReward: 73,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(73, 'managing factional defection');
      
      const result = rollD20('finesse', (G.skills.finesse || 0) + Math.floor(G.level / 2));
      const target = 12 + Math.max(0, G.worldClocks.pressure);

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `You route her out through a supply lane the faction doesn't use for personnel movement — a gap in their own protocols she never thought to exploit. She's clear before anyone notices the absence. Two days later she sends a message with the first piece of insider information: the faction's drop schedule for the next month. She's exact, calm, and has been waiting to do this for a long time.`;
        addJournal('Defector asset acquired', 'intelligence');
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `The extraction route was watched. The faction knew she was considering it — they'd been watching her for weeks. They let the exit attempt run far enough to identify who she contacted. The connection between you and the defection attempt is now documented somewhere you can't access. The watchful patience of a faction that let the attempt run means they wanted the intermediary's name more than they wanted to prevent the exit.`;
        addJournal('Defection traced', 'complication');
      } else {
        G.stageProgress[2]++;
        G.lastResult = `She gets clear, but not cleanly. Some of her documents had to be left behind — a locked case she couldn't carry without drawing attention at the corridor checkpoint. What she carries out is partial: enough to confirm the faction's structure and two key personnel, but not the operational calendar she promised. She's alive and out. That's the larger part of what mattered, and she knows it even if she won't say so yet.`;
        addJournal('Partial defection info', 'intelligence', `partial-${G.dayCount}`);
      }

      G.recentOutcomeType = 'faction';
      maybeStageAdvance();
    }
  },
  {
    label: "Their internal split needs someone with no stake in either side.",
    tags: ['Faction', 'Politics', 'Trust', 'Authority', 'Meaningful'],
    tag: 'risky',
    xpReward: 72,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(72, 'mediating internal faction conflict');
      
      const result = rollD20('charm', (G.skills.charm || 0) + Math.floor(G.level / 2));
      const target = 13;

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `You let both sides speak fully before saying anything. When you do speak, you name what each side actually wants — not what they're arguing about — and the room goes quiet. The faction leadership watches you work with the careful attention of people deciding whether to trust something. They decide yes. The internal dispute doesn't disappear, but it stops being a crisis.`;
        addJournal('Internal mediation successful', 'intelligence');
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `You call one side's position unreasonable in front of the other. That's the moment it breaks. The insulted group walks out, taking two other members with them. The faction leadership thanks you for your time with the particular flatness of people who will not be repeating this experiment. The internal split is now an open fracture. The pressure of an open fracture attributed to outside mediation means the faction's attention now includes you as a contributing cause.`;
        addJournal('Mediation failure', 'complication', `med-fail-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `Both sides agree to a cooling period — thirty days, no new grievances filed, no escalation. They accept it because they're tired, not because you convinced them of anything. The faction leadership notes that you held the room together; the previous mediator hadn't managed that much. No one is happy. No one is leaving either. The thirty days will tell you whether tired and staying is enough, or just the shape that breaking apart takes here.`;
        addJournal('Partial mediation', 'intelligence');
      }

      G.recentOutcomeType = 'faction';
      maybeStageAdvance();
    }
  },
  {
    label: "The operative didn't make the meeting. The body was left where I'd find it.",
    tags: ['Faction', 'Mystery', 'Danger', 'Moral', 'Meaningful'],
    tag: 'bold',
    xpReward: 71,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(71, 'discovering operative death');
      
      const result = rollD20('wits', (G.skills.wits || 0) + Math.floor(G.level / 3));
      const target = 12;

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `The body is posed — positioned after death to look like a fall, which means someone moved it with specific intent. The operative's satchel is gone, but the lining of his boot holds a folded slip: a meeting location, a date, a single glyph mark you recognize from a rival faction's correspondence. He was killed before the meeting could happen. You arrive at the meeting point anyway and wait. Someone else shows up, and they're just as surprised to see you.`;
        addJournal('Operative assassination solved', 'intelligence', `death-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `You're still crouched over the body when you hear movement behind you. Whoever left the operative there didn't go far. They see your face and make a calculation. You put distance between yourself and the location fast, but not before they've had enough time to decide what to do with what they saw. You are tracked now by people who left the operative's body as bait — the location was chosen to notice whoever came to look.`;
        addJournal('Killer attention gained', 'complication');
      } else {
        G.stageProgress[2]++;
        G.lastResult = `The death is clean and recent — within the last six hours. No defensive wounds, no struggle marks on the ground nearby. The operative either trusted whoever did this or had no warning at all. His faction mark is removed, the stitching cut out, but the spot where it sat is still visible in a faint impression on his jacket collar. Rain hasn't reached him yet; the ground under him is dry. This was deliberate and organized, not opportunistic, and whoever did it knew what evidence to remove.`;
        addJournal('Operative death noted', 'intelligence', `noted-${G.dayCount}`);
      }

      G.recentOutcomeType = 'faction';
      maybeStageAdvance();
    }
  },
  {
    label: "The faction wants eyes in a region I don't know. Saying no has a cost.",
    tags: ['Faction', 'Espionage', 'Network', 'Pressure', 'Meaningful'],
    tag: 'risky',
    xpReward: 70,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'undertaking espionage assignment');
      
      const result = rollD20('finesse', (G.skills.finesse || 0) + Math.floor(G.level / 3));
      const target = 12 + Math.max(0, G.worldClocks.pressure);

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `You build the network through market relationships and transit handlers — people with legitimate reasons to move through and observe without attracting scrutiny. No one you recruit knows they're part of a network. They each think they're doing a single favor for a single person. The information flows in without a visible center. The region's administration never finds a thread to pull.`;
        addJournal('Spy network established', 'intelligence');
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `One of the people you approached went directly to the regional authority. By morning, the authority has a description of your activities and a name that's connected to the faction that sent you. The region now holds something you can't take back — and they're deciding what to do with it. The pressure of a regional authority holding a connected name means every market relationship in this district is now harder to establish without that name arriving first.`;
        addJournal('Espionage discovered', 'complication', `espy-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You make three reliable connections — a market assessor, a road warden, a hostel keeper. Each has a legitimate reason to know what moves through the region, and none of them knows about the others. The information won't be comprehensive and it won't be fast, but it will be consistent. A market assessor notices cargo weight. A warden notices transit timing. A hostel keeper notices faces. Careful work, done at the right pace, builds more than urgency does.`;
        addJournal('Contacts established', 'intelligence');
      }

      G.recentOutcomeType = 'faction';
      maybeStageAdvance();
    }
  },
  {
    label: "Empty coffers and my name on the access record. Both problems, both mine now.",
    tags: ['Faction', 'Suspicion', 'Investigation', 'Pressure', 'Meaningful'],
    xpReward: 73,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(73, 'clearing factional suspicion');
      
      const result = rollD20('wits', (G.skills.wits || 0) + Math.floor(G.level / 2));
      const target = 13;

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `The theft wasn't random — the missing resources ended up at a specific location, and the trail leads to a faction member who's been selling access to the faction's storage schedule. You bring the evidence to the faction leadership before they've finished questioning you. The shift in the room is immediate. Suspicion doesn't evaporate — it redirects, and you're no longer its target.`;
        addJournal('Innocence proven, loyalty gained', 'intelligence');
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `The evidence trail bends back toward you — not because you're guilty but because someone structured the theft to leave traces that point at an outsider. The faction leadership listens to your explanation without expression. You can't tell whether they believe you. The questions they ask next suggest they're now trying to determine whether your guilt is practical or merely convenient. The watchful flatness of those questions means you are noticed as a liability until the trail points elsewhere.`;
        addJournal('Suspicion escalated', 'complication');
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You find evidence of a third party who had access — not enough to name them, but enough to show the faction that the pool of suspects extends beyond you. The leadership documents it and moves on without clearing you formally. The active pressure drops. The quiet suspicion doesn't go anywhere; it settles into the room like dust after a disturbance, present but no longer urgent. It stops driving decisions, which is the most you can ask for right now.`;
        addJournal('Partial innocence shown', 'intelligence');
      }

      G.recentOutcomeType = 'faction';
      maybeStageAdvance();
    },
    failResult: 'This path is closed here, but Seld\'s name appears in the suppression gap — the faction\'s storage records still point toward an unresolved routing discrepancy.'
  },

  // ========== COMPANION DYNAMICS: Loyalty Tests & Moral Stands ==========
  {
    label: "She told a specific lie, sustained across weeks. That takes planning.",
    tags: ['Companion', 'Trust', 'Deception', 'Loyalty', 'Meaningful'],
    xpReward: 72,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(72, 'navigating companion deception');
      
      const result = rollD20('charm', (G.skills.charm || 0) + Math.floor(G.level / 3));
      const target = 12;

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `They tell you the shape of the lie first — who they said they were, what they said they'd done — and then the actual history underneath it. Not a confession. More like a building shown from the inside after years of only seeing the facade. You don't say anything for a while. When you do speak, you don't offer absolution. You ask one practical question about what comes next. That's enough. They exhale like they've been holding it for months.`;
        addJournal('Deep trust forged', 'contact_made');
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `You push harder than the moment warrants. They answer your questions in single sentences, then stop answering. By the evening meal they're physically present but unreachable — their posture closed, their eyes on the middle distance. You've put something between you that wasn't there before, and they're not going to be the one to move it. The pressure of that distance has a weight that makes every shared decision harder to reach from here.`;
        addJournal('Companion distance', 'complication', `dist-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You accept the explanation without pressing further. They can tell you're not fully satisfied with it, and they don't pretend otherwise. The relationship doesn't break but it recalibrates — less ease, more care on both sides. Camp is quieter than usual that evening, the fire smaller, the conversation shorter. Whatever the full truth is, it stays where it is for now. That's not forgiveness. It's a temporary arrangement, and both of you know it.`;
        addJournal('Trust conditionally restored', 'contact_made');
      }

      G.recentOutcomeType = 'companion';
      maybeStageAdvance();
    }
  },
  {
    label: "His vendetta has a name now. The consequences come either way.",
    tags: ['Companion', 'Choice', 'Loyalty', 'Consequence', 'Meaningful'],
    tag: 'bold',
    xpReward: 71,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(71, 'managing companion departure');
      
      const result = rollD20('charm', (G.skills.charm || 0) + Math.floor(G.level / 2));
      const target = 12;

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `You don't argue the vendetta. You ask what happens after — not to the target, but to them. The question lands in a way nothing else has. They sit with it for a long time and then say they haven't thought past the act itself. That's the crack. You don't pry it wider. They agree to stay through the next waypoint and decide from there. Their shoulders are looser when they come back from their watch.`;
        addJournal('Companion convinced to stay', 'contact_made');
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `You make an argument you believe in but they've already stopped listening. They pack while you're still talking. Before they go, they take the secondary provisions pack — not out of malice, they'd say, but because they need it. The group feels differently sized after they leave, and not just by one person. The pressure of a missing secondary pack makes the next supply stretch harder than the math suggests.`;
        addJournal('Companion departure', 'complication');
      } else {
        G.stageProgress[2]++;
        G.lastResult = `They agree to wait until the current route is finished. After that, no promises. You accept the terms. It's not resolution — it's a delay, and you both know it. They're quieter than usual for the next two days, moving through their tasks without comment, eating without looking up from the bowl. The vendetta sits between you like a third person at every meal. The subject doesn't come up again, which is its own kind of tension.`;
        addJournal('Compromise reached', 'contact_made');
      }

      G.recentOutcomeType = 'companion';
      maybeStageAdvance();
    }
  },
  {
    label: "The companion needs medicine that costs more than the road budget allows.",
    tags: ['Companion', 'Moral', 'Sacrifice', 'Care', 'Meaningful'],
    tag: 'risky',
    xpReward: 70,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'sacrificing for companion welfare');
      
      const result = rollD20('charm', (G.skills.charm || 0) + Math.floor(G.level / 3));
      const target = 11;

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `You pay the full price without flinching and stay while the apothecary works. The shop smells of dried herbs and tallow. They watch you from the treatment table, tracking your face between each sharp breath. When it's done, they don't say much — they rarely do when they're in pain — but that evening they move their bedroll closer to yours without comment, and they're there when you wake. Some things get communicated without words and hold longer for it.`;
        addJournal('Care strengthens bond', 'contact_made');
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `You push the apothecary on price when the companion is still in the chair. The apothecary stops working and looks at you. He finishes the minimum procedure — cleansing, a basic wrap — and tells you the actual treatment requires the full fee. You're outside the shop before you've worked out that you've made this worse. The companion doesn't say anything, but the injury is still there and now it's been sitting untreated for another hour. The pressure of an untreated injury makes every day of travel from here harder than it needs to be.`;
        addJournal('Negotiation failure', 'complication');
      } else {
        G.stageProgress[2]++;
        G.lastResult = `The apothecary agrees to a payment split — half now, half on your next pass through. He writes the arrangement in his ledger with a clerk's precision, asking your route and estimated return. It's a fair deal reached in good faith. The treatment is thorough if not immediate, and the companion is ambulatory within two days. The recovery is slower than you'd like but steady. They appreciate that you didn't cut corners on what mattered.`;
        addJournal('Companion recovery', 'contact_made');
      }

      G.recentOutcomeType = 'companion';
      maybeStageAdvance();
    }
  },
  {
    label: "The two companions are at an impasse. Both are right about different things.",
    tags: ['Companion', 'Moral', 'Conflict', 'Leadership', 'Meaningful'],
    tag: 'risky',
    xpReward: 71,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(71, 'mediating companion conflicts');
      
      const result = rollD20('charm', (G.skills.charm || 0) + Math.floor(G.level / 2));
      const target = 13;

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `You ask both of them to stop speaking and name what they're actually protecting — not the position, the value under it. It takes a while. When the values are named, the conflict is different. There's a path that honors both and neither had seen it because they'd been arguing at the surface level. The meal that evening is louder and more relaxed than it's been in days.`;
        addJournal('Group harmony achieved', 'contact_made');
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `You call for a decision before both sides are ready to make one. The argument sharpens under the pressure. One companion stands up from the table and walks out of the shelter. They're back by morning, but they don't speak to the other directly for the next day. The tension has a shape now that it didn't have before, and it takes up space in every shared silence. The pressure of a named tension makes the next decision that requires both of them harder to bring to a close.`;
        addJournal('Companion conflict', 'complication');
      } else {
        G.stageProgress[2]++;
        G.lastResult = `They accept the compromise in the way people accept something that costs them: without warmth, but without refusal. Both give something up and neither is pretending otherwise. The meal that follows is quiet — not hostile, just careful. The group moves forward. The underlying disagreement hasn't been resolved — it's been shelved, pushed down under the immediate needs of the road. That shelf has a weight limit, and neither of them has forgotten the argument.`;
        addJournal('Compromise accepted', 'contact_made');
      }

      G.recentOutcomeType = 'companion';
      maybeStageAdvance();
    }
  },
  {
    label: "Sick, and she knows exactly what that means for everyone in camp.",
    tags: ['Companion', 'Sacrifice', 'Moral', 'Risk', 'Meaningful'],
    xpReward: 74,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(74, 'facing companion illness crisis');
      
      const result = rollD20('wits', (G.skills.wits || 0) + Math.floor(G.level / 3));
      const target = 13;

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `You establish a clean perimeter around them — separate sleeping space, separate water, no shared tools. The others grumble but comply without pushing back, which tells you something about how much they trust the call. Three days of fever, then a break, then slow improvement. On the fifth day they eat a full meal — thin broth, half a heel of bread, finished completely. They don't make a speech about it. They just start pulling their weight again the day they're strong enough, and work harder than before.`;
        addJournal('Companion healed, loyalty absolute', 'contact_made');
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `The isolation protocols aren't maintained cleanly — surfaces touched, kit shared in the chaos of camp. By the third day, two others show early symptoms. The companion with the worst exposure doesn't make it past the fourth night. You're standing with a group that is smaller by one and sicker than it was, and the road ahead is the same length it's always been. The pressure of a sicker group makes every choice point on that road harder to meet at full strength.`;
        addJournal('Companion death, contagion spreads', 'complication');
      } else {
        G.stageProgress[2]++;
        G.lastResult = `They survive. The fever breaks on the fourth day but the recovery is slow and incomplete — stamina reduced, appetite poor for another week. They travel lighter and shorter distances, stopping an hour before the rest of the group needs to. Their color is wrong; the skin around their eyes still drawn. They're alive and present and functioning. That counts for more than it sounds. The weakness will pass, probably. It just takes time you don't have much of.`;
        addJournal('Companion survives weakened', 'contact_made');
      }

      G.recentOutcomeType = 'companion';
      maybeStageAdvance();
    }
  },
  {
    label: "A companion's family inside a facility I can reach. The window won't stay open.",
    tags: ['Companion', 'Moral', 'Consequence', 'Risk', 'Meaningful'],
    tag: 'bold',
    xpReward: 73,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(73, 'managing companion family crisis');
      
      const result = rollD20('finesse', (G.skills.finesse || 0) + Math.floor(G.level / 3));
      const target = 13 + Math.max(0, G.worldClocks.pressure);

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `You get the family member out through the facility's own laundry access — a gap in their procedures that no one had thought to close. Clean, quiet, no alarms. The companion is waiting at the rally point and doesn't speak when their family member walks around the corner. The reunion is private. Afterward, they say two words: "I know." That's all.`;
        addJournal('Family rescued, loyalty unbreakable', 'contact_made');
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `The approach is spotted on the second perimeter. The alarm doesn't bring enough response to catch you, but it brings enough to lock the facility and document the attempt. The warden authority now has a description of the operation and the approximate number of people involved. The family member is still inside. Your group is now on a list. You are tracked as an attempted extraction party — the next approach to this facility will be watched for specifically.`;
        addJournal('Authority pursuit heightened', 'complication');
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You create a distraction at the front gate. In the movement it causes, the family member walks out through the vehicle exit behind a legitimate departing cart. They weren't waiting for a rescue specifically — they'd been watching for any gap. Your distraction gave them one. The companion accepts that their family is free without asking too many questions about how.`;
        addJournal('Family aided toward freedom', 'contact_made');
      }

      G.recentOutcomeType = 'companion';
      maybeStageAdvance();
    }
  },
  {
    label: "A companion gave something up for the group quietly. They haven't said anything about it.",
    tags: ['Companion', 'Sacrifice', 'Revelation', 'Loyalty', 'Meaningful'],
    tag: 'risky',
    xpReward: 72,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(72, 'discovering companion sacrifice');
      
      const result = rollD20('charm', (G.skills.charm || 0) + Math.floor(G.level / 2));
      const target = 12;

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `You piece it together from fragments — a missing item, a transaction you didn't authorize, a quiet conversation they had that didn't make sense until now. When you bring it up at the next rest stop, you do it in front of the others. Not to embarrass them. To name what they did so it can be recognized. Their face does something complicated. The group is different after that, in small ways that matter.`;
        addJournal('Sacrifice publicly honored', 'contact_made');
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `You read the evidence wrong — what they gave up looks, at first glance, like they diverted resources. You confront them on it before you've checked the full picture. They don't defend themselves with the explanation you don't have yet. They just absorb it, and something in how they carry themselves after that is different. More careful. More distant. The truth comes out later, and the damage by then is already done. The pressure of an absorbed accusation sits harder than a defended one — it doesn't resolve when the truth arrives.`;
        addJournal('Misunderstood sacrifice', 'complication');
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You find them after the evening meal, apart from the others, light low. You say simply that you know what they did and you won't forget it. They nod and look away toward the treeline. They don't want to discuss it; that much is clear from the set of their shoulders. The acknowledgment was the thing that mattered — not the elaboration, not the thanks. The conversation lasts about thirty seconds. The weight of it lasts longer, and they know that too.`;
        addJournal('Sacrifice privately acknowledged', 'contact_made');
      }

      G.recentOutcomeType = 'companion';
      maybeStageAdvance();
    }
  },
  {
    label: "She was paid to watch me. She stopped. The reason matters more than the fact.",
    tags: ['Companion', 'Trust', 'Deception', 'Conflict', 'Meaningful'],
    xpReward: 70,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'processing companion betrayal revelation');
      
      const result = rollD20('charm', (G.skills.charm || 0) + Math.floor(G.level / 3));
      const target = 12;

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `You ask when they stopped reporting. They tell you: about three weeks in. They say it without prompting, looking at the floor. What they stopped reporting was the kind of thing that would have gotten you separated — and they made that choice alone, without telling you. The original deception made it worse. But you can hold the whole arc of it now and understand what it means. You tell them you know. That's the conversation. It's enough.`;
        addJournal('Betrayal forgiven, trust renewed', 'contact_made');
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `You react before you've thought through what the confession actually means. What you say isn't proportionate and they know it. They pack their kit with the same calm they use for everything else, and by morning they're gone. A week later you hear they're working with a group whose interests run directly counter to yours. They're not pursuing a vendetta. They're just moving on, and they happen to be on the other side now. The pressure of a former companion on the opposite side is harder to navigate than an unknown adversary — they know your methods.`;
        addJournal('Companion becomes rival', 'complication');
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You tell them you need time and some distance between you and them for a while. They accept this without argument. They don't apologize again. They give you the space you asked for, work their share of the load without comment, and wait for you to decide what comes next. The boundary is clean and they respect it. That itself tells you something.`;
        addJournal('Cautious distance established', 'contact_made');
      }

      G.recentOutcomeType = 'companion';
      maybeStageAdvance();
    }
  },

  // ========== ROUTE INTELLIGENCE: Scouts, Spies & Institutional Observation ==========
  {
    label: "A scout with checkpoint maps. The price is still undecided.",
    tags: ['Intelligence', 'Route', 'Information', 'Cost', 'Meaningful'],
    tag: 'safe',
    failResult: 'The scout moved on before the price was settled — route intelligence is still available through other channels in this district.',
    xpReward: 70,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'acquiring route intelligence');
      
      const result = rollD20('charm', (G.skills.charm || 0) + Math.floor(G.level / 3));
      const target = 11;

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `The scout names his price and you pay it without counter-offering. He notices — there's a small change in how he holds himself — and spreads the maps properly, not folded loose but weighted at the corners with two flat river stones he produces from his pack. He walks you through each checkpoint: who runs it, what they're actually checking for, which shift changes on which day. Current within the week. You leave with something genuinely useful and the address of a waystation he keeps stocked.`;
        addJournal('Route maps acquired', 'intelligence', `maps-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `You push down on the price twice. The scout smiles and takes what you offer. The maps he gives you are technically accurate — for a route that was closed four months ago. You don't discover this until you're standing at a checkpoint that's been decommissioned and replaced by something stricter, three hours in the wrong direction. The pressure of three lost hours at a stricter checkpoint means the remaining daylight is harder to spend than it should have been.`;
        addJournal('Misinformed', 'complication', `misinf-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You pay mid-range and get mid-range. The information covers the main checkpoints and one alternate route without much detail on timing or personnel. The scout lays the relevant pages out on the table briefly, then rolls them back before you're done reading. Enough to move forward with some confidence, not enough to plan around complications you can't see yet. The scout was fair. So were you. That's most of what this kind of transaction asks for.`;
        addJournal('Route information obtained', 'intelligence', `info-${G.dayCount}`);
      }

      G.recentOutcomeType = 'intelligence';
      maybeStageAdvance();
    }
  },
  {
    label: "Intercepted messages between institutions, discussing transit restrictions — the cipher is the first problem.",
    tags: ['Intelligence', 'Espionage', 'Information', 'Power', 'Meaningful'],
    tag: 'risky',
    xpReward: 71,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(71, 'intercepting institutional communication');
      
      const result = rollD20('wits', (G.skills.wits || 0) + Math.floor(G.level / 3));
      const target = 12;

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `The cipher is institutional — a format used across multiple administrative bodies rather than a personal code. Once you have the register key, the messages confirm it: a coordinated tightening of three transit routes, timed to a fiscal quarter. Not a response to any threat. Pre-planned. The restriction isn't reactive — it's a mechanism. The messages lay out the schedule across the next two months.`;
        addJournal('Institutional strategy decoded', 'intelligence', `decode-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `The cipher has a detection thread — a glyph sequence that activates on unauthorized access. You didn't see it in time. The message is now blank in your hands and whoever sent it has a notification that their communication was opened. Your position relative to the message's interception point is traceable. You are tracked now by the people whose cipher you triggered — the detection thread exists because they expected someone to try exactly this.`;
        addJournal('Interception detected', 'complication');
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You get through the first layer of the cipher but the second layer holds — a different encoding method, nested inside the first. What you can read confirms that the restrictions are coordinated and timed, not ad hoc decisions made by individual offices. At least two administrative bodies are named in the headers. The specific details of what they're restricting and why remain in the encoded sections, but the structure of the coordination is now visible.`;
        addJournal('Partial message decoded', 'intelligence', `part-decode-${G.dayCount}`);
      }

      G.recentOutcomeType = 'intelligence';
      maybeStageAdvance();
    }
  },
  {
    label: "An institutional spy wants shelter. What they carry outweighs turning them in.",
    tags: ['Intelligence', 'Spy', 'Moral', 'Pressure', 'Meaningful'],
    tag: 'risky',
    xpReward: 72,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(72, 'harboring institutional spy');
      
      const result = rollD20('finesse', (G.skills.finesse || 0) + Math.floor(G.level / 3));
      const target = 12 + Math.max(0, G.worldClocks.pressure);

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `You move them twice before settling on a location — unnecessary but it resets any trail. The institution sends a warden inquiry to the first address, finds nothing, and pulls back. The spy spends three days moving documents from memory to paper. What they carry out of the institution is three years of internal protocol logs — who authorized what, when, and for whom.`;
        addJournal('Institutional spy asset acquired', 'intelligence');
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `The institution tracks them faster than either of you expected — a movement pattern they were already watching for. The location you chose is compromised within the day. The spy gets out but barely, and they leave behind documents that connect the shelter point to your movements over the previous week. The institution has your general profile now. The scrutiny attached to a connected shelter point means every channel you've used this week is now under watchful review.`;
        addJournal('Accomplice status', 'complication');
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You keep exchanges brief and don't ask for everything at once. The spy gives you a structured summary — key personnel, two active operations, one upcoming audit that will expose gaps in the institution's own records. They speak quietly and precisely, the practiced habit of someone used to talking in rooms with thin walls. You don't push for the source documentation. The relationship stays intact and workable for future access. That's the part that matters most.`;
        addJournal('Spy contact established', 'intelligence', `spy-contact-${G.dayCount}`);
      }

      G.recentOutcomeType = 'intelligence';
      maybeStageAdvance();
    }
  },
  {
    label: "Institutional officials on a route they don't want mapped. Their destination is the question.",
    tags: ['Intelligence', 'Observation', 'Espionage', 'Risk'],
    tag: 'risky',
    xpReward: 69,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(69, 'performing covert observation');
      
      const result = rollD20('finesse', (G.skills.finesse || 0) + Math.floor(G.level / 3));
      const target = 13;

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `They travel in a group of three with a deliberate walking pace — projecting routine, not urgency. You stay one street parallel and watch through the market stalls. They stop at a private building that has no public signage. One of them checks behind them twice before going in. You get close enough to the side passage to hear the first three words of the briefing before the door closes: "scheduled for removal." You note the building, the personnel count, and the direction they came from.`;
        addJournal('Institutional objective revealed', 'intelligence', `obj-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `One of the group doubles back through a side lane — a counter-surveillance maneuver that works exactly as intended. You're standing still when they come around the corner behind you. They look at you with the particular attention of someone who is paid to notice people following them. Nobody says anything. They continue on. But the surveillance party now knows their route had a tail. The watchful pause of that professional look means your face is now noticed and catalogued by the people you were following.`;
        addJournal('Observation discovered', 'complication');
      } else {
        G.stageProgress[2]++;
        G.lastResult = `They go into a building at the district's administrative edge — no signage, shuttered upper windows, a painted mark above the lintel that isn't a guild mark. You note the address and the time. Two hours later they leave the same way they came in, the same walking pace, the same deliberate non-urgency. You have a location, a duration, and the fact that three senior personnel considered whatever happened inside worth the walk. That's the start of something, not the end.`;
        addJournal('Institutional meeting site mapped', 'intelligence', `site-${G.dayCount}`);
      }

      G.recentOutcomeType = 'intelligence';
      maybeStageAdvance();
    },
    failResult: 'This path is closed here, but the Collegium\'s outer office is not the only layer — the building at the administrative edge still has no public record.'
  },
  {
    label: "A scout network offers route data. The price is protection I may not deliver.",
    tags: ['Intelligence', 'Network', 'Alliance', 'Commitment', 'Meaningful'],
    tag: 'risky',
    xpReward: 70,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'building intelligence network');
      
      const result = rollD20('charm', (G.skills.charm || 0) + Math.floor(G.level / 2));
      const target = 12;

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `You negotiate protection terms that are specific and achievable — two safe houses, access to your sources in two localities, and a commitment to route warning updates when you have them. The scout network lead writes it all down and signs it with a thumbprint, which is how they do it in their circuit. The information begins arriving within three days. Current, accurate, and specific to the routes you're using.`;
        addJournal('Scout network integrated', 'contact_made');
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `You agree to more than you can deliver — three safe houses when you have one, protection capacity beyond your actual reach. The lead scout nods and takes the agreement at face value. Two weeks later, when the first test of your commitment comes and you can't fulfill what you promised, the word travels through the circuit faster than you do. The network closes its doors. The pressure of a broken circuit agreement is harder to repair than no agreement at all — every scout on this network has now heard the same account.`;
        addJournal('Network broken trust', 'complication', `break-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You negotiate a trial period — sixty days, one safe house, and route updates on a best-effort basis. The lead scout accepts this without enthusiasm but without objection; she writes it in a small log with the ink already open, which means she expected a partial agreement. The information that comes in over the first two weeks is sporadic but generally reliable. The relationship is functional if not strong. It can grow from here, if you keep your side of it consistently.`;
        addJournal('Limited network established', 'contact_made');
      }

      G.recentOutcomeType = 'intelligence';
      maybeStageAdvance();
    }
  },
  {
    label: "A dead messenger. Encrypted documents still sealed. Someone needs these not to arrive.",
    tags: ['Intelligence', 'Investigation', 'Mystery', 'Consequence', 'Meaningful'],
    tag: 'bold',
    xpReward: 71,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(71, 'investigating dead messenger');
      
      const result = rollD20('wits', (G.skills.wits || 0) + Math.floor(G.level / 3));
      const target = 12;

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `The cipher is standard Compact administrative encoding — familiar to you from the border documentation you've seen. Once broken, the documents read as a complete picture: three coordinated parties, two transit routes used for non-declared cargo, and a schedule of payments routed through a shell entity whose name appears in the Iron Ledger Ward records. The messenger was carrying confirmation of the arrangement, not orders. Someone killed a courier to stop confirmation, which means the arrangement is still live.`;
        addJournal('Conspiracy uncovered', 'intelligence', `cons-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `You spend an hour with the documents before you notice the location tag on the messenger's boot — a marking used by courier networks to note where a message was collected. Someone in the network tracks their people that way. By the time you've worked this out, you're back on the road, and by the next morning there's a second figure on your trail who wasn't there before. They don't approach. They just stay at range and watch. The watchful distance of that figure means the network already knows where you collected the message and decided you were worth following rather than confronting.`;
        addJournal('Killer attention', 'complication');
      } else {
        G.stageProgress[2]++;
        G.lastResult = `The first layer decodes to a transit schedule with route codes you don't immediately recognize — a regional designator system, not the standard Compact format. You get through enough to map three delivery dates and two pickup locations before the second cipher layer stops you cold. The routing information is current and specific, not archival. It's half the picture — but the half that tells you where to look next, and when.`;
        addJournal('Partial documents decrypted', 'intelligence', `partial-doc-${G.dayCount}`);
      }

      G.recentOutcomeType = 'intelligence';
      maybeStageAdvance();
    },
    failResult: 'This path is closed here, but there is still the matter of the name that appears in four unconnected offices — the routing records and the Iron Ledger Ward are not finished with each other.'
  },
  {
    label: "The archive is breached. The secondary stacks are unguarded. The window won't stay open.",
    tags: ['Intelligence', 'Opportunity', 'Moral', 'Risk', 'Meaningful'],
    tag: 'bold',
    xpReward: 73,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(73, 'breaching institutional archives');
      
      const result = rollD20('finesse', (G.skills.finesse || 0) + Math.floor(G.level / 2));
      const target = 13;

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `The breach window is narrow — twelve minutes between the first alarm and the physical seal of the building's secondary stacks. You go straight to the row you've been tracking: freight authorization records, six months back. You pull twelve documents and copy three in full before the room begins to empty. You're outside and two streets away when the lockdown closes. What you have is specific, recent, and already useful.`;
        addJournal('Archives breached successfully', 'intelligence', `breach-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `The breach alert triggers faster than the external pattern suggested — someone was watching the reading room specifically. The lockdown seals before you reach the secondary exit. The warden personnel who find you in the stacks take your name before they allow you to leave. You're not detained. But your name and description are now in the incident log, and the institution's security review will include you. The scrutiny of an incident log entry means the archive's secondary stacks are now harder to access by any approach the institution hasn't already considered.`;
        addJournal('Archive trap discovery', 'complication');
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You get four documents out before the lockdown closes the secondary stacks. Three are useful — freight authorization records with dates and route codes; one is administrative noise. The exit is rushed and unplanned. You leave through the public reading room just as the wardens begin clearing it, walking at the pace of someone who finished what they came for, and nobody looks twice at a person already moving toward the door. The partial access is real intelligence. It's just not complete.`;
        addJournal('Partial archive access', 'intelligence', `part-arch-${G.dayCount}`);
      }

      G.recentOutcomeType = 'intelligence';
      maybeStageAdvance();
    }
  },
  {
    label: "They need my testimony against institutional officers. Their protection may not outlast my usefulness.",
    tags: ['Intelligence', 'Corruption', 'Legal', 'Risk', 'Meaningful'],
    tag: 'risky',
    xpReward: 72,
    stageProgress: 2,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(72, 'dealing with corruption testimony');
      
      const result = rollD20('charm', (G.skills.charm || 0) + Math.floor(G.level / 3));
      const target = 12;

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `You name your terms first: transit immunity for a defined period, documentation of your cooperation filed with two separate jurisdictions, and a sealed copy held outside the network's control. They agree to all three. The testimony you give is specific, documented, and submitted through channels that create a parallel paper trail. What you saw is now part of the record in a form that cannot be quietly withdrawn.`;
        addJournal('Protected witness status', 'intelligence');
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `The testimony was supposed to be sealed. It wasn't. By the time you leave the meeting room, the summary of what you said has been routed to a duty officer whose name appears in the documents you were testifying about. Within two days, someone leaves a note at your lodging that says only: "We know what you said." The network's corruption runs deeper than the procedure that was supposed to protect you. The pressure of a note at your lodging means you are tracked by people with enough reach to find where you sleep.`;
        addJournal('Official retaliation', 'complication');
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You agree to testify in writing, with a one-week window before the document enters active proceedings. The protection is procedural rather than physical — your name is logged but not widely distributed. The testimony goes into the record. Whether it does anything useful depends on whether the process that receives it is cleaner than the one you're describing. You don't know that yet.`;
        addJournal('Conditional testimony', 'intelligence');
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
    tag: 'risky',
    xpReward: 60,
    fn: function() {
      var roll = rollD20('wits', G.skills.wits);
      if (roll.total >= 13) {
        addNarration('Collegium Archive Access', 'Seld sets a folder on the table between you — not hers to share, technically. She opens it anyway. The cross-reference sheets inside are hand-annotated in two different inks: her notes layered over redactions that were made before she ever touched the file. She marks three suppressed filing numbers with her thumbnail and slides the folder toward you. Outside, the archive bell rings the close-of-day cycle. Neither of you moves until it stops. She closes the folder herself when it does.');
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
        addNarration('Archive Meeting — No Exchange', 'Seld reads your hesitation before you say anything. He closes the folder and tucks it back under his arm — the same quiet motion he probably uses a dozen times a day in this room. The offer stands, he says, but only until end of the third week. After that the files rotate to deep storage and he loses access entirely. He leaves through the staff corridor. The archive reading room empties around you, lamp by lamp.');
      }
    }
  },

  // Faction 2: Shadowhands
  {
    cid: 'stage2_shadowhands_contact',
    label: 'The question in that note could only come from someone tracking the same routes.',
    tags: ['stage2', 'faction_contact', 'Faction', 'Shadowhands', 'Stealth'],
    tag: 'risky',
    xpReward: 60,
    fn: function() {
      var roll = rollD20('finesse', G.skills.finesse);
      if (roll.total >= 13) {
        addNarration('Courier Relay — Drop Confirmed', 'The waypoint is a flour merchant\'s loading dock, which is either deliberate or convenient. The courier takes the unmarked packet without looking at it and hands you a wax-sealed tube in return. Inside: enforcement operation logs, dates, route designations, and a column of ledger shorthand you\'ll need time to decode. The handwriting is compressed and careful, the kind used by people who write in bad light. The courier is gone before you reseal your coat. The dock smells of milled grain and nothing else.');
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
        addNarration('Relay — Aborted', 'The waypoint is clear when you arrive. No courier, no signal — just the smell of grain dust and the creak of the loading dock in the afternoon heat. An hour later a child passes and drops a folded note at your feet without slowing: one word, "watched." You leave the packet at the lodging and spend the evening doing nothing that looks like waiting. Whatever window existed has closed, and it will not open at this location again.');
      }
    }
  },

  // Faction 3: Road Wardens Order
  {
    cid: 'stage2_wardens_contact',
    label: 'The Warden flagged my transit pattern — she already knows what I\'ve been tracking.',
    tags: ['stage2', 'faction_contact', 'Faction', 'Wardens', 'Social'],
    tag: 'risky',
    xpReward: 60,
    fn: function() {
      var roll = rollD20('charm', G.skills.charm);
      if (roll.total >= 13) {
        addNarration('Warden Route Exchange', 'The patrol leader walks you to a field desk at the edge of the checkpoint post — a folding table, a lamp weighted against the wind — and sets out three corridor maps. One has no public manifest notation; she points to it without comment. You file the complication report in your own name, which she witnesses and stamps without ceremony. She gives you the maps in exchange. The transaction is entirely procedural. What she doesn\'t say is that your name is now in the Order\'s active monitoring log, and she knows you know that.');
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
        addNarration('Checkpoint — No Filing', 'The Warden listens, then shakes her head once. Without a formal complication report on record, she can\'t share monitored route data with a civilian transit — Order protocol, she says, and her tone makes clear she isn\'t looking for a way around it. She\'s not unfriendly about it. The checkpoint clears and traffic resumes around you. The maps stay rolled under her arm, tied with the cord she never undid.');
      }
    }
  },

  // ========== COLLEGIUM FACTION PATH (4 choices, plot:'main') ==========

  {
    id: 's2_collegium_1',
    label: 'Seld counted something on his fingers just now. He stopped at four.',
    text: 'Seld counted something on his fingers just now. He stopped at four.',
    tags: ['Investigation', 'Social'],
    plot: 'main',
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.wits || 0);
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
    label: 'Seld has a document fragment he isn\'t supposed to have.',
    text: 'Seld has a document fragment he isn\'t supposed to have.',
    tags: ['Investigation', 'Social'],
    plot: 'main',
    condition: function() { return G.flags && G.flags.stage2_collegium_contact; },
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.wits || 0);
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
    label: 'Seld is being watched. He knows and he came anyway.',
    text: 'Seld is being watched. He knows and he came anyway.',
    tags: ['Confrontation', 'Social'],
    plot: 'main',
    condition: function() { return G.flags && G.flags.stage2_collegium_contact; },
    fn: function() {
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var r = rollD20(G.skills.charm || 0);
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
    label: 'Seld trusts process. The Wardens trust force. These are not compatible.',
    text: 'Seld trusts process. The Wardens trust force. These are not compatible.',
    tags: ['Confrontation', 'Social'],
    plot: 'main',
    condition: function() { return G.flags && G.flags.stage2_collegium_contact && G.flags.stage2_wardens_contact; },
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.charm || 0);
      if (r.total >= 13) {
        G.lastResult = 'You bring both threads to the same table — not literally, but in sequence, same afternoon. Seld wants the routing records formally entered into the Collegium\'s suppression index so they can\'t be quietly withdrawn again. The Warden liaison wants them kept out of any official record so nothing triggers a jurisdictional review. Seld counts through his fingers while you explain the Warden\'s position. He stops at three. He says he can work with a sealed filing — not public, but permanent. You carry that back. The Warden accepts it with the expression of someone who has learned not to argue about procedure.';
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
    label: 'The checkpoint officer pulled my transit record before she said a word.',
    text: 'The checkpoint officer pulled my transit record before she said a word.',
    tags: ['Investigation', 'Social'],
    plot: 'main',
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.wits || 0);
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
    label: 'She has corridor data that hasn\'t been filed with any district office.',
    text: 'She has corridor data that hasn\'t been filed with any district office.',
    tags: ['Investigation', 'Social'],
    plot: 'main',
    condition: function() { return G.flags && G.flags.stage2_wardens_contact; },
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.vigor || 0);
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
    label: 'The Wardens are being watched from above their own chain.',
    text: 'The Wardens are being watched from above their own chain.',
    tags: ['Investigation', 'Social'],
    plot: 'main',
    condition: function() { return G.flags && G.flags.stage2_wardens_contact; },
    fn: function() {
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var r = rollD20(G.skills.wits || 0);
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
        addJournal('Warden channel closed down. Internal Order personnel shift observed.', 'complication');
      }
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof loadStageChoices === 'function') loadStageChoices();
    }
  },

  {
    id: 's2_wardens_4',
    label: 'The Wardens enforce what the Collegium documents. One without the other stops here.',
    text: 'The Wardens enforce what the Collegium documents. One without the other stops here.',
    tags: ['Social', 'Confrontation'],
    plot: 'main',
    condition: function() { return G.flags && G.flags.stage2_wardens_contact && G.flags.stage2_collegium_contact; },
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.charm || 0);
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
    label: 'The district numbers and the route numbers share a column they shouldn\'t.',
    text: 'The district numbers and the route numbers share a column they shouldn\'t.',
    tags: ['Investigation', 'Lore'],
    tag: 'risky',
    plot: 'side',
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.wits || 0);
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
    label: 'Someone has been following my route. I want to know who gave them the itinerary.',
    text: 'Someone has been following my route. I want to know who gave them the itinerary.',
    tags: ['Stealth', 'Investigation'],
    plot: 'side',
    fn: function() {
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var r = rollD20(G.skills.finesse || 0);
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
    label: 'A procedural appeal is not an access request. The rule doesn\'t cover it.',
    text: 'A procedural appeal is not an access request. The rule doesn\'t cover it.',
    tags: ['Investigation', 'Lore'],
    tag: 'risky',
    plot: 'side',
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.wits || 0);
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
    label: 'He answered every question I didn\'t ask. Not one I did.',
    text: 'He answered every question I didn\'t ask. Not one I did.',
    tags: ['Investigation', 'Social'],
    plot: 'side',
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.charm || 0);
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
    label: 'That name has appeared in four separate documents from three different offices.',
    text: 'That name has appeared in four separate documents from three different offices.',
    tags: ['Investigation', 'Lore'],
    tag: 'risky',
    plot: 'side',
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.wits || 0);
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
    label: 'The public Collegium office exists to be seen. What\'s behind it does not.',
    text: 'The public Collegium office exists to be seen. What\'s behind it does not.',
    tags: ['Investigation', 'Stealth'],
    plot: 'side',
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.finesse || 0);
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
    label: 'There\'s a gap in the suppression pattern. Someone forgot a subcategory.',
    text: 'There\'s a gap in the suppression pattern. Someone forgot a subcategory.',
    tags: ['Investigation', 'Lore'],
    plot: 'side',
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.wits || 0);
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
    label: 'The night shift desk doesn\'t log visitors. That\'s a known feature, not an oversight.',
    text: 'The night shift desk doesn\'t log visitors. That\'s a known feature, not an oversight.',
    tags: ['Stealth', 'Investigation'],
    tag: 'risky',
    plot: 'side',
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.finesse || 0);
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
    label: 'Waivers don\'t get signed without a reason. Someone approved these in bulk.',
    text: 'Waivers don\'t get signed without a reason. Someone approved these in bulk.',
    tags: ['Investigation', 'Lore'],
    plot: 'side',
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.wits || 0);
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
    label: 'Reclassified cargo stops being cargo. That\'s the point of reclassifying it.',
    text: 'Reclassified cargo stops being cargo. That\'s the point of reclassifying it.',
    tags: ['Investigation', 'Lore'],
    plot: 'side',
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.wits || 0);
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
    label: 'There\'s a patrol gap that stays consistent. Gaps don\'t stay consistent by accident.',
    text: 'There\'s a patrol gap that stays consistent. Gaps don\'t stay consistent by accident.',
    tags: ['Stealth', 'Investigation'],
    tag: 'risky',
    plot: 'side',
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.vigor || 0);
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
    label: 'The Iron Ledger Ward has a transaction that predates the institution\'s founding.',
    text: 'The Iron Ledger Ward has a transaction that predates the institution\'s founding.',
    tags: ['Investigation', 'Lore'],
    tag: 'risky',
    plot: 'side',
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.wits || 0);
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
    label: 'The cipher format is institutional — I\'ve seen this encoding in the academy index.',
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
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.wits || 0);
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
    label: 'The seal impression is slightly off-center. I know what a correct stamp looks like.',
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
    fn: function() {
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
    label: 'The service entrance isn\'t on the floor plan. Neither is what\'s behind it.',
    tags: ['Stealth', 'Investigation'],
    tag: 'risky',
    xpReward: 85,
    plot: 'side',
    condition: function() {
      return G.stage === 'Stage II' &&
        typeof getArchetypeFamily === 'function' && getArchetypeFamily() === 'stealth';
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(85, 'accessing building via unlisted service entrance');
      G.flags = G.flags || {};
      G.worldClocks = G.worldClocks || {};
      var r = rollD20('finesse', (G.skills.finesse || 0) + Math.floor(G.level / 3) + (typeof getEquipmentBonus === 'function' ? getEquipmentBonus('finesse') : 0));
      if (r.total >= 13) {
        G.stageProgress[2] = (G.stageProgress[2] || 0) + 2;
        G.investigationProgress = (G.investigationProgress || 0) + 1;
        G.flags.stage2_inner_annex_accessed = true;
        G.lastResult = 'The service entrance is used by the building\'s laundry and supply intake — people moving things, always slightly loaded, never making eye contact with authority figures. You fit the pattern well enough. Inside: a utility corridor that runs behind the public reading room and connects to a records annex that has no door on the public side. The annex holds working files, not archive — current, active documents organized by processing date. What you find in the current week\'s batch: three route variance requests, two with "Arven Pol" as processing authority, all for the same corridor cluster.';
        G.recentOutcomeType = 'discovery';
        addJournal('Records annex accessed via service entrance. Current-week files include three route variance requests under "Arven Pol" authority for target corridor cluster.', 'evidence');
      } else {
        G.worldClocks.watchfulness = Math.min(10, (G.worldClocks.watchfulness || 0) + 1);
        G.lastResult = 'The service entrance is used by people who are expected there. A delivery clerk who\'s worked the route for years notices you in the corridor immediately — not because you look wrong exactly, but because the building knows its own people and you are not one of them. He doesn\'t call for a warden. He asks your business in a tone that makes it clear the question is a formality. You give a plausible answer and leave. The annex door, visible at the corridor\'s end, stays closed.';
        G.recentOutcomeType = 'complication';
        addJournal('Service entrance approach identified by delivery clerk. Building staff now aware of unauthorized corridor presence.', 'complication');
      }
      if (typeof maybeStageAdvance === 'function') maybeStageAdvance();
    }
  },

  // ========== ARCHETYPE-EXCLUSIVE: Stealth Family (additional sp2 paths) ==========

  {
    id: 's2_stealth_courier_intercept',
    label: "The courier's route crosses a blind spot. Three minutes, no witness.",
    tags: ['Stealth', 'Investigation', 'Evidence'],
    tag: 'risky',
    xpReward: 88,
    condition: function() {
      return G.stage === 'Stage II' &&
        typeof getArchetypeFamily === 'function' && getArchetypeFamily(G.archetype) === 'stealth' &&
        !(G.flags && G.flags.s2_stealth_courier_done);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(88, 'intercepting restricted document courier in transit');
      G.flags = G.flags || {};
      G.worldClocks = G.worldClocks || {};
      var r = rollD20('finesse', (G.skills.stealth||0) + Math.floor(G.level/3) + (typeof getEquipmentBonus==='function'?getEquipmentBonus('stealth'):0));
      if (r.total >= 13) {
        G.flags.s2_stealth_courier_done = true;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.investigationProgress = (G.investigationProgress||0) + 1;
        G.lastResult = 'The courier walks the same route every third day, same pause at the Eastgate arch to check the weather, same side-step when the gutter overflows. The blind spot is real. You have the satchel open, the relevant document copied in longhand, and the latch re-sealed before he reaches the far end of the alley. The copied text: a re-routing authorization bearing three seals, one of which does not appear on any official Collegium document you have seen. Whoever signed it did not want it attributed.';
        addJournal('Unauthorized document seal identified — re-routing authorization bearing unregistered Collegium seal', 'evidence');
        G.recentOutcomeType = 'success';
      } else {
        G.worldClocks.watchfulness = Math.min(10, (G.worldClocks.watchfulness||0) + 1);
        G.lastResult = 'The courier stops at the arch a beat early — something in the sound of the alley, or just a variation in his routine. You clear the blind spot without the satchel. He continues. He does not look behind him, but he adjusts his grip on the case in a way that means he noticed something. The route will shift. You will not have this particular window again.';
        G.recentOutcomeType = 'complication';
      }
      if (typeof maybeStageAdvance === 'function') maybeStageAdvance();
    }
  },

  {
    id: 's2_stealth_ledger_copy',
    label: "The registry clerk steps away. The ledger is open to exactly the right page.",
    tags: ['Stealth', 'Investigation', 'Evidence'],
    tag: 'risky',
    xpReward: 85,
    condition: function() {
      return G.stage === 'Stage II' &&
        typeof getArchetypeFamily === 'function' && getArchetypeFamily(G.archetype) === 'stealth' &&
        !(G.flags && G.flags.s2_stealth_ledger_done);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(85, 'copying restricted ledger page during clerk absence');
      G.flags = G.flags || {};
      G.worldClocks = G.worldClocks || {};
      var r = rollD20('finesse', (G.skills.stealth||0) + Math.floor(G.level/3) + (typeof getEquipmentBonus==='function'?getEquipmentBonus('stealth'):0));
      if (r.total >= 13) {
        G.flags.s2_stealth_ledger_done = true;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.investigationProgress = (G.investigationProgress||0) + 1;
        G.lastResult = 'Forty-two seconds. The ledger page shows quarterly transit summaries for the restricted corridor — tonnage, declared contents, authorizing clerk, date. Three entries in the past eight months show the same declaring party on overnight shipments that do not appear in the public transit index. The same three entries each have a handwritten asterisk in the margin. You have the page copied and the ledger closed before the clerk returns from the records alcove with whatever he went to find.';
        addJournal('Restricted transit ledger: three overnight shipments absent from public index — same declaring party, marginal asterisk', 'evidence');
        G.recentOutcomeType = 'success';
      } else {
        G.worldClocks.watchfulness = Math.min(10, (G.worldClocks.watchfulness||0) + 1);
        G.lastResult = 'The clerk returns faster than expected — there was a second person in the alcove who handed him the document directly. The ledger is not where it was. He squares it against the counter edge and places both hands flat on the cover. He says nothing. You say something about a public records request and he hands you the correct form. The form requires a countersignature and a three-day processing window.';
        G.recentOutcomeType = 'complication';
      }
      if (typeof maybeStageAdvance === 'function') maybeStageAdvance();
    }
  },

  {
    id: 's2_stealth_shadow_official',
    label: "The liaison's second meeting is with someone who doesn't appear on any official roster.",
    tags: ['Stealth', 'Surveillance', 'Evidence'],
    tag: 'risky',
    xpReward: 92,
    condition: function() {
      return G.stage === 'Stage II' &&
        typeof getArchetypeFamily === 'function' && getArchetypeFamily(G.archetype) === 'stealth' &&
        !(G.flags && G.flags.s2_stealth_shadow_done);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(92, 'trailing liaison officer to off-roster contact meeting');
      G.flags = G.flags || {};
      G.worldClocks = G.worldClocks || {};
      var r = rollD20('finesse', (G.skills.stealth||0) + Math.floor(G.level/3) + (typeof getEquipmentBonus==='function'?getEquipmentBonus('stealth'):0));
      if (r.isCrit) {
        G.flags.s2_stealth_shadow_done = true;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 2;
        G.investigationProgress = (G.investigationProgress||0) + 1;
        G.flags.stage2_faction_contact_made = true;
        G.lastResult = 'The second meeting is in a cooperage basement off the lower transit district — three casks moved to make room, a single lamp. The person the liaison meets does not introduce himself. He carries a document case embossed with the same unregistered seal you noted on the re-routing authorization. They exchange two rolls of parchment. When the meeting ends he takes a route that avoids every public street. You follow him three blocks before he steps into a doorway and does not come out. The door belongs to a storage annex registered to a Cosmouth administrative bureau that has not filed a public activity report in fourteen months.';
        addJournal('Liaison met unregistered courier carrying embossed seal — same mark as unauthorized re-routing authorization; courier enters Cosmouth bureau annex', 'evidence');
        G.recentOutcomeType = 'success';
      } else if (r.total >= 13) {
        G.flags.s2_stealth_shadow_done = true;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.investigationProgress = (G.investigationProgress||0) + 1;
        G.lastResult = 'The basement meeting is brief. You hold position in the loading bay above long enough to see the document exchange but not to read markings or hear names. The courier leaves by a service door you cannot follow through without crossing open ground. What you have: a face, a document case, a cooperage address. The cooperage address is not in any business registry you have access to.';
        addJournal('Liaison document exchange in off-registry cooperage — contact unidentified, location unregistered', 'intelligence');
        G.recentOutcomeType = 'success';
      } else {
        G.worldClocks.watchfulness = Math.min(10, (G.worldClocks.watchfulness||0) + 2);
        G.lastResult = 'The liaison doubles back once before the second meeting — a practiced counter-surveillance check, not paranoia. His pace slows at a corner, then resumes. You break off before the cooperage entrance. Following further would mean crossing open ground with no cover and no plausible reason to be there. Everything you have already gathered would be at risk. He knows someone was on his route. He will change it, and the cooperage address will not be used again.';
        G.recentOutcomeType = 'complication';
      }
      if (typeof maybeStageAdvance === 'function') maybeStageAdvance();
    }
  },

  // ========== ARCHETYPE-EXCLUSIVE: Stealth Family (sp2≥10 pool — prevents depletion at late Stage II) ==========

  {
    id: 's2_stealth_decoy_manifest',
    label: "A false manifest leaves a building they're watching. The real one already moved.",
    tags: ['Stealth', 'Evidence', 'Deception'],
    tag: 'risky',
    xpReward: 90,
    condition: function() {
      return G.stage === 'Stage II' &&
        typeof getArchetypeFamily === 'function' && getArchetypeFamily() === 'stealth' &&
        (G.stageProgress[2] || 0) >= 10;
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(90, 'reading decoy manifest misdirection');
      G.flags = G.flags || {};
      G.worldClocks = G.worldClocks || {};
      var r = rollD20('finesse', (G.skills.finesse || 0) + Math.floor(G.level / 3) + (typeof getEquipmentBonus === 'function' ? getEquipmentBonus('finesse') : 0));
      if (r.total >= 13) {
        G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        G.investigationProgress = (G.investigationProgress || 0) + 1;
        G.lastResult = 'The decoy manifests are thicker paper than standard — they needed to survive handling long enough to be logged at the front desk before the real cargo cleared the rear yard. The weight difference is negligible against a transit ledger, but the paper grade tells you who supplied the blanks: a stationer who operates a trade account with the same administrative entity that processed the route variance requests. The decoy and the re-routing trace back to the same origin point.';
        G.recentOutcomeType = 'discovery';
        addJournal('Decoy manifest paper grade matches stationer with ties to route variance processing entity — shared origin point confirmed.', 'evidence');
      } else {
        G.worldClocks.watchfulness = Math.min(10, (G.worldClocks.watchfulness || 0) + 1);
        G.lastResult = 'The decoy manifest cycle runs faster than expected. By the time you read the weight discrepancy, the loading bay has cleared and the real cargo is already past the checkpoint. The window for cross-referencing this batch is gone. What remains is the knowledge that the decoy and real manifests were processed simultaneously — two desks, coordinated timing, deliberate.';
        G.recentOutcomeType = 'complication';
        addJournal('Decoy manifest cycle completed before cross-reference possible — simultaneous dual-desk processing confirmed.', 'intelligence');
      }
      if (typeof maybeStageAdvance === 'function') maybeStageAdvance();
    }
  },

  {
    id: 's2_stealth_roof_observation',
    label: "The route they use runs under a window no one keeps locked from the inside.",
    tags: ['Stealth', 'Surveillance', 'Evidence'],
    tag: 'risky',
    xpReward: 88,
    condition: function() {
      return G.stage === 'Stage II' &&
        typeof getArchetypeFamily === 'function' && getArchetypeFamily() === 'stealth' &&
        (G.stageProgress[2] || 0) >= 10 &&
        !(G.flags && G.flags.s2_stealth_roof_obs_done);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(88, 'surveilling transit route from elevated position');
      G.flags = G.flags || {};
      G.worldClocks = G.worldClocks || {};
      var r = rollD20('finesse', (G.skills.finesse || 0) + Math.floor(G.level / 3) + (typeof getEquipmentBonus === 'function' ? getEquipmentBonus('finesse') : 0));
      if (r.isCrit) {
        G.flags.s2_stealth_roof_obs_done = true;
        G.stageProgress[2] = (G.stageProgress[2] || 0) + 2;
        G.investigationProgress = (G.investigationProgress || 0) + 1;
        G.flags.stage2_route_surveilled = true;
        G.lastResult = 'Three hours. The route runs below twice: once with a covered cart at the second watch, once with a single rider at the fourth. The cart stops at the corner where the alley turns — a pause too long for a natural traffic hold. Someone inside the building below opens a window shutter and passes something through. The rider waits at the far end. What moves between the cart and the window is a document case. The building is registered as a vacant commercial property.';
        addJournal('Vacant commercial property used as document transfer point — cart pause at second watch, rider receiving at fourth, synchronized.', 'evidence');
        G.recentOutcomeType = 'success';
      } else if (r.total >= 13) {
        G.flags.s2_stealth_roof_obs_done = true;
        G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        G.investigationProgress = (G.investigationProgress || 0) + 1;
        G.lastResult = 'The route passes below twice in three hours. The second pass includes a cart that stops longer than transit would require — loading dock timing, not traffic. The window above the stop has a shutter that moves once, briefly. Not enough to confirm a transfer, but enough to establish that someone in that building has a sightline on the route and uses it at the second watch. The building registration is worth checking.';
        addJournal('Cart stop below unlocked window — movement noted at second watch, building registration flagged for review.', 'intelligence');
        G.recentOutcomeType = 'success';
      } else {
        G.worldClocks.watchfulness = Math.min(10, (G.worldClocks.watchfulness || 0) + 1);
        G.lastResult = 'The position holds for two hours before a patrol sweep changes its rotation and brings a warden past the street level below. He doesn\'t look up. The cart route doesn\'t run tonight — either the schedule changed or the cart already passed before you were in position. The window above the alley stays shuttered. Surveillance requires better timing than this.';
        G.recentOutcomeType = 'complication';
        addJournal('Surveillance position lost — patrol rotation change, cart route not observed.', 'complication');
      }
      if (typeof maybeStageAdvance === 'function') maybeStageAdvance();
    }
  },

  {
    id: 's2_stealth_lock_impression',
    label: "The lock on the secondary archive room is old. The impression will last three days.",
    tags: ['Stealth', 'Evidence', 'Finesse'],
    tag: 'risky',
    xpReward: 86,
    condition: function() {
      return G.stage === 'Stage II' &&
        typeof getArchetypeFamily === 'function' && getArchetypeFamily() === 'stealth' &&
        (G.stageProgress[2] || 0) >= 10 &&
        !(G.flags && G.flags.s2_stealth_lock_done);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(86, 'taking wax impression of secondary archive lock');
      G.flags = G.flags || {};
      G.worldClocks = G.worldClocks || {};
      var r = rollD20('finesse', (G.skills.finesse || 0) + Math.floor(G.level / 3) + (typeof getEquipmentBonus === 'function' ? getEquipmentBonus('finesse') : 0));
      if (r.total >= 13) {
        G.flags.s2_stealth_lock_done = true;
        G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        G.investigationProgress = (G.investigationProgress || 0) + 1;
        G.flags.stage2_archive_access_prepared = true;
        G.lastResult = 'Forty seconds in the corridor — less than you needed, exactly enough. The wax takes the impression cleanly. The lock\'s wear pattern tells a secondary story: the secondary archive room is opened from this side twice a day, consistently, with a heavy hand that favors the bottom of the keyhole. Whoever holds the routine key is taller than average and in a hurry. That\'s a description. The impression will cut within the day.';
        addJournal('Secondary archive lock impression taken — usage wear confirms twice-daily access, tall user, routine pattern established.', 'evidence');
        G.recentOutcomeType = 'success';
      } else {
        G.worldClocks.watchfulness = Math.min(10, (G.worldClocks.watchfulness || 0) + 1);
        G.lastResult = 'The corridor stays clear for twenty seconds, then a building runner comes through with a delivery stack. She doesn\'t stop but she looks at your hands. The wax block stays in your pocket. The impression will have to wait for a longer window — the corridor gets two clear stretches per day, and this was one of them.';
        G.recentOutcomeType = 'complication';
        addJournal('Lock impression attempt interrupted — corridor runner noted hand position, next opportunity requires new window.', 'complication');
      }
      if (typeof maybeStageAdvance === 'function') maybeStageAdvance();
    }
  },

  {
    id: 's2_stealth_clerk_schedule',
    label: "The duty clerk keeps the same lunch gap every day. Three minutes, unmonitored.",
    tags: ['Stealth', 'Observation', 'Evidence'],
    tag: 'safe',
    failResult: 'The pattern isn\'t there this cycle. The window exists, but the timing requires more observation.',
    xpReward: 75,
    condition: function() {
      return G.stage === 'Stage II' &&
        typeof getArchetypeFamily === 'function' && getArchetypeFamily() === 'stealth' &&
        (G.stageProgress[2] || 0) >= 10;
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(75, 'reading clerk schedule for access window');
      G.flags = G.flags || {};
      var r = rollD20('wits', (G.skills.wits || 0) + Math.floor(G.level / 3));
      if (r.total >= 10) {
        G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        G.investigationProgress = (G.investigationProgress || 0) + 1;
        G.lastResult = 'Four days of observation. The clerk leaves at the same point in his duty cycle — not by clock, but by the third time the receiving desk rings the shift bell. He takes twenty-two steps to the side door and does not return for three to four minutes, depending on whether the stairwell is occupied. The desk he covers handles restricted transit variance requests. During his absence, the intake tray sits unmonitored. Three minutes is more than enough for what you need.';
        G.recentOutcomeType = 'discovery';
        addJournal('Clerk absence window mapped — three minutes at restricted variance desk, predictable trigger, reproducible.', 'evidence');
      } else {
        G.lastResult = 'The clerk\'s pattern is irregular this week — a building inspection changed the shift bell schedule, which altered his departure trigger. What worked four days ago no longer tracks. The window exists, but the timing requires a new baseline. Three more days of observation should re-establish it.';
        G.recentOutcomeType = 'complication';
        addJournal('Clerk schedule disrupted by building inspection — absence window pattern reset, baseline observation required.', 'intelligence');
      }
      if (typeof maybeStageAdvance === 'function') maybeStageAdvance();
    }
  },

  {
    id: 's2_stealth_blind_informant',
    label: "She passes messages through the stall owner who doesn't know what he's carrying.",
    tags: ['Stealth', 'Intelligence', 'Network'],
    tag: 'bold',
    xpReward: 94,
    condition: function() {
      return G.stage === 'Stage II' &&
        typeof getArchetypeFamily === 'function' && getArchetypeFamily() === 'stealth' &&
        (G.stageProgress[2] || 0) >= 10 &&
        !(G.flags && G.flags.s2_stealth_blind_informant_done);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(94, 'tracing blind courier network through market stall');
      G.flags = G.flags || {};
      G.worldClocks = G.worldClocks || {};
      var r = rollD20('charm', (G.skills.charm || 0) + Math.floor(G.level / 3));
      if (r.isCrit) {
        G.flags.s2_stealth_blind_informant_done = true;
        G.stageProgress[2] = (G.stageProgress[2] || 0) + 2;
        G.investigationProgress = (G.investigationProgress || 0) + 1;
        G.flags.stage2_faction_contact_made = true;
        G.lastResult = 'The stall owner doesn\'t know what he carries, but he remembers who picks up. You get a name and a meeting description — a woman who collects wrapped parcels on the third market day of each month, pays in institutional script rather than coin, never the same face twice but always the same script issuer. The script issuer traces to a Collegium sub-account in the outer administrative tier. She\'s been running a dead-drop network through this block for at least eight months. She knows your name before you say it.';
        addJournal('Blind courier network traced through market stall — Collegium outer-tier script account, active eight months, dead-drop operator identified and aware.', 'evidence');
        G.recentOutcomeType = 'success';
      } else if (r.total >= 14) {
        G.flags.s2_stealth_blind_informant_done = true;
        G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        G.investigationProgress = (G.investigationProgress || 0) + 1;
        G.lastResult = 'The stall owner talks more than he realizes. The parcels are picked up by different people on a rotating basis — never the same collector twice in a month. The payment is always institutional script. He doesn\'t know what he\'s part of. The script type narrows the originating account to the Collegium\'s administrative tier — too broad to identify a specific party, but enough to confirm an institutional hand in the network.';
        addJournal('Market stall blind courier — institutional script payments, rotating collectors, Collegium administrative tier account confirmed.', 'intelligence');
        G.recentOutcomeType = 'success';
      } else {
        G.worldClocks.watchfulness = Math.min(10, (G.worldClocks.watchfulness || 0) + 1);
        G.lastResult = 'The stall owner is cooperative until you mention the parcels. His posture changes in a way he can\'t help — he picks up a jar, puts it down, picks it up again. He says he doesn\'t remember any arrangement. He says it three times. By the third time, someone at the adjacent stall has moved closer. The network, whatever it is, has eyes on this block, and now it knows someone is asking about the courier.';
        G.recentOutcomeType = 'complication';
        addJournal('Courier network inquiry detected — stall owner deflected, adjacent observer moved in, network aware of inquiry.', 'complication');
      }
      if (typeof maybeStageAdvance === 'function') maybeStageAdvance();
    }
  },

  // ========== ARCHETYPE-EXCLUSIVE: Combat Family (5 choices) ==========

  {
    id: 's2_arch_combat_warden_shakedown',
    label: 'The warden is lying. He knows I can tell. That is enough.',
    text: 'The warden is lying. He knows I can tell. That is enough.',
    tags: ['Combat', 'Confrontation', 'Pressure'],
    plot: 'side',
    condition: function() {
      return typeof getArchetypeFamily === 'function' && getArchetypeFamily() === 'combat';
    },
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.combat || 0);
      if (r.total >= 12) {
        G.lastResult = 'The warden\'s hand stops moving when you step closer. You don\'t touch him. You don\'t need to — what you project is the specific patience of someone who has hurt people for functional reasons and found it unremarkable. He recalculates something privately and pushes the ledger across the table. The entry you wanted to see is circled in the original ink, flagged for review by someone whose name is in a column the public version does not include. He doesn\'t look up while you read.';
        G.recentOutcomeType = 'discovery';
        G.flags.stage2_warden_ledger_accessed = true;
        G.investigationProgress = (G.investigationProgress || 0) + 1;
        if (G.stageProgress) G.stageProgress[2] = (G.stageProgress[2] || 0) + 2;
        if (typeof addHeat === 'function') addHeat('shelk', 2);
        addJournal('Warden ledger accessed under physical pressure. Flagged entry names a reviewing authority absent from public records.', 'evidence');
      } else {
        G.lastResult = 'He doesn\'t fold. He\'s dealt with people who project threat before and learned to read which ones actually follow through. He rings for a second warden without breaking eye contact. You leave before the door opens. The ledger stays on his side of the table. Whatever he\'s protecting, he\'s been paid enough to hold it against physical pressure.';
        G.recentOutcomeType = 'complication';
        if (G.worldClocks) G.worldClocks.watchfulness = Math.min(10, (G.worldClocks.watchfulness || 0) + 1);
        if (typeof addHeat === 'function') addHeat('shelk', 1);
        addJournal('Warden held position under pressure — has instructions and backing. Watchfulness raised.', 'complication');
      }
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof loadStageChoices === 'function') loadStageChoices();
    }
  },

  {
    id: 's2_arch_combat_courier_escort',
    label: 'The courier carrying that manifest needs to arrive. I can make that happen.',
    text: 'The courier carrying that manifest needs to arrive. I can make that happen.',
    tags: ['Combat', 'Protection', 'Route'],
    plot: 'side',
    condition: function() {
      return typeof getArchetypeFamily === 'function' && getArchetypeFamily() === 'combat';
    },
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.combat || 0);
      if (r.total >= 11) {
        G.lastResult = 'Three figures step out of the alley at the second crossing — the kind of interception that requires someone knowing the route in advance. You read the geometry before they\'ve finished moving: two flanking, one center, the center one watching your hands. You close the distance fast enough that the center step becomes a retreat. They peel off within a block. The courier says nothing for the rest of the walk. At the handoff point, she gives you a name: the clerk who told someone about the schedule.';
        G.recentOutcomeType = 'discovery';
        G.flags.stage2_courier_escorted = true;
        G.flags.stage2_schedule_leak_known = true;
        G.investigationProgress = (G.investigationProgress || 0) + 1;
        if (G.stageProgress) G.stageProgress[2] = (G.stageProgress[2] || 0) + 2;
        addJournal('Courier escorted through interception. Clerk who leaked schedule identified — internal source confirmed.', 'evidence');
      } else {
        G.lastResult = 'The interception is larger than expected — five people, and two of them have already moved to block the far end of the lane. The courier drops the satchel and runs. You hold the lane long enough for her to clear the block, then disengage. The manifest is gone. The courier made it. One of those things is recoverable.';
        G.recentOutcomeType = 'complication';
        if (G.stageProgress) G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        addJournal('Interception larger than anticipated — manifest lost, courier survived. Professional opposition confirmed.', 'complication');
      }
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof loadStageChoices === 'function') loadStageChoices();
    }
  },

  {
    id: 's2_arch_combat_patrol_pattern',
    label: 'Warden deployment shifted three days ago. Someone gave an order they didn\'t write down.',
    text: 'Warden deployment shifted three days ago. Someone gave an order they didn\'t write down.',
    tags: ['Combat', 'Observation', 'Tactics'],
    tag: 'risky',
    plot: 'side',
    condition: function() {
      return typeof getArchetypeFamily === 'function' && getArchetypeFamily() === 'combat';
    },
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.combat || 0);
      if (r.total >= 10) {
        G.lastResult = 'A tactical eye reads this the same way it reads any changed deployment: there is a reason, and the reason is the thing being protected. The new patrol arc covers the transit administration\'s rear entrance and the weighmaster\'s annex — two buildings that share a wall but have no public connection. The coverage gap they created is over the public records entrance, which is now effectively unmonitored at shift change. Someone repositioned the wardens toward what matters and left the appearance of coverage intact.';
        G.recentOutcomeType = 'discovery';
        G.flags.stage2_patrol_pattern_read = true;
        G.investigationProgress = (G.investigationProgress || 0) + 1;
        if (G.stageProgress) G.stageProgress[2] = (G.stageProgress[2] || 0) + 2;
        addJournal('Warden redeployment analyzed — new arc protects transit admin rear entrance and weighmaster annex. Records entrance left unmonitored at shift change.', 'evidence');
      } else {
        G.lastResult = 'The pattern is changed but the reason isn\'t readable from the outside. Too many variables: understaffing, seasonal rotation, district complaint, routine adjustment. Without a second data point — another change, or the original deployment order — the shift is a signal but not a message. You note the timing and the covered buildings and wait for the second point.';
        G.recentOutcomeType = 'intelligence';
        if (G.stageProgress) G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        addJournal('Warden redeployment noted — pattern unclear without additional data point. Timing and covered buildings logged.', 'intelligence');
      }
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof loadStageChoices === 'function') loadStageChoices();
    }
  },

  {
    id: 's2_arch_combat_enforcer_known',
    label: 'The man following me is a professional. He wants me to know he\'s there.',
    text: 'The man following me is a professional. He wants me to know he\'s there.',
    tags: ['Combat', 'Confrontation', 'Stealth'],
    plot: 'side',
    condition: function() {
      return typeof getArchetypeFamily === 'function' && getArchetypeFamily() === 'combat';
    },
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.combat || 0);
      if (r.total >= 13) {
        G.lastResult = 'You choose the time and the ground — a narrow service passage, no exits to either side. He rounds the corner and stops when he sees you\'ve turned. For a moment the calculation runs on both sides. He\'s good: his weight is forward, hands relaxed, feet wider than a civilian would stand. He was told to follow, not to engage. You tell him what you know and who you think gave the order. He doesn\'t confirm anything, but the specific way he doesn\'t confirm it is its own answer. He leaves. By morning, whoever sent him knows what you said.';
        G.recentOutcomeType = 'discovery';
        G.flags.stage2_tail_confronted = true;
        G.flags.stage2_opposition_messaged = true;
        G.investigationProgress = (G.investigationProgress || 0) + 1;
        if (G.stageProgress) G.stageProgress[2] = (G.stageProgress[2] || 0) + 2;
        addJournal('Professional tail confronted and released — deliberately sent message to their handler. Opposition now aware of current intelligence level.', 'evidence');
      } else {
        G.lastResult = 'He\'s better than the situation suggested — he anticipated the reversal and had already moved to a parallel passage. By the time you circle back, he\'s on a roof line three buildings over, watching. The message is clear: he\'s not afraid of you knowing he\'s there. Whatever he\'s doing, he\'s been authorized to do it openly.';
        G.recentOutcomeType = 'complication';
        if (G.worldClocks) G.worldClocks.pressure = Math.min(10, (G.worldClocks.pressure || 0) + 1);
        addJournal('Tail evasion failed — professional counter-surveillance confirmed. Operation is openly authorized.', 'complication');
      }
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof loadStageChoices === 'function') loadStageChoices();
    }
  },

  {
    id: 's2_arch_combat_document_seizure',
    label: 'The clerk is leaving with something that isn\'t supposed to leave that building.',
    text: 'The clerk is leaving with something that isn\'t supposed to leave that building.',
    tags: ['Combat', 'Confrontation', 'Evidence'],
    plot: 'side',
    condition: function() {
      return typeof getArchetypeFamily === 'function' && getArchetypeFamily() === 'combat';
    },
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.combat || 0);
      if (r.total >= 12) {
        G.lastResult = 'He makes it half a block before your hand is on his shoulder. He\'s not a fighter — the satchel drops and he starts talking before you\'ve said anything. The document inside is a routing variance authorization signed by someone three ranks above the clerk\'s supervisor. He was told to deliver it to a private residence address and destroy the transit record. The address is on the document header. He didn\'t write it there; someone above him did, which means the paper has a chain even it didn\'t intend to have.';
        G.recentOutcomeType = 'discovery';
        G.flags.stage2_routing_variance_seized = true;
        G.flags.stage2_private_address_known = true;
        G.investigationProgress = (G.investigationProgress || 0) + 1;
        if (G.stageProgress) G.stageProgress[2] = (G.stageProgress[2] || 0) + 2;
        addJournal('Routing variance authorization seized — signed three ranks above clerk\'s supervisor, bearing private residence address for delivery.', 'evidence');
      } else {
        G.lastResult = 'He drops the satchel and runs — faster than expected, and he takes a route that suggests he\'s used it before. When you retrieve the satchel, it\'s empty. He transferred whatever he was carrying before he left the building; the satchel was cover. The real document moved a different way, and you\'ve now shown your hand.';
        G.recentOutcomeType = 'complication';
        if (G.worldClocks) G.worldClocks.watchfulness = Math.min(10, (G.worldClocks.watchfulness || 0) + 2);
        addJournal('Document transfer failed — clerk used decoy satchel. Real document moved separately. Cover blown.', 'complication');
      }
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof loadStageChoices === 'function') loadStageChoices();
    }
  },

  // ========== GLOBAL INVESTIGATION: Suppression Conspiracy Arc ==========

  {
    label: "The courier ledger has gaps. Someone pulled the delivery records before archiving.",
    tags: ['Stage2', 'Investigation'],
    tag: 'risky',
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'tracing courier network gaps');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.courier_ledger_gap_found = true;
        G.investigationProgress = (G.investigationProgress||0) + 1;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The gap in the courier ledger runs six weeks: entries stop mid-column on a Tenthday and resume on a Tenthday exactly six weeks later, the ink color a half-shade lighter. Not omission — replacement. The binding edge shows ghost impressions from a prior page. Someone removed the original and sewed in a clean section. The new entries list routes that don't appear in the station's dispatch register at all.`;
        addJournal('Courier ledger physically altered — six-week section replaced, routes unlisted in dispatch register', 'evidence', `s2global-courier-ledger-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The archive clerk notices the page comparison before you do. She doesn't say anything, but her hand goes to the counter bell. You step back and ask about general filing procedures instead. She answers politely and doesn't ring the bell. By the time you leave, the ledger is back under the counter. There are other ways to reach the same answer, but this path is closed.`;
        addJournal('Archive access flagged — courier ledger review blocked by staff alertness', 'complication', `s2global-courier-ledger-fail-${G.dayCount}`);
      } else {
        G.flags.courier_ledger_gap_found = true;
        G.investigationProgress = (G.investigationProgress||0) + 1;
        G.lastResult = `The ledger covers three years of courier dispatches. The gap isn't obvious — you find it by running a finger down the entry numbers. A sequence jumps by forty-three. The clerk attributes it to a filing error during a clerical transition; the explanation comes too quickly, without looking at the book. Forty-three missing dispatches in a single clerical gap is not a filing error. It's a pattern.`;
        addJournal('Courier ledger sequence gap — 43 missing dispatch entries during unexplained clerical transition', 'intelligence', `s2global-courier-ledger-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Three polities. Three different clerks. The same name crossed out in each intake log.",
    tags: ['Stage2', 'Investigation'],
    tag: 'risky',
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'cross-polity name suppression pattern');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.suppressed_name_crosspolity = true;
        G.investigationProgress = (G.investigationProgress||0) + 1;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The name crossed out in each intake log is the same: Pell Varas. A transit agent, based out of Shelk, operating under a provisional Guild charter that expired mid-Season Three. The strike-through isn't a correction — it's an erasure instruction. Someone sent it to each intake office separately, because each intake office uses a different form. The coordination required to do that doesn't come from a single clerk making a mistake.`;
        addJournal('Pell Varas — transit agent name suppressed across three separate polity intake logs by coordinated erasure instruction', 'evidence', `s2global-name-cross-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The third intake office has a warden posted at the records desk today — unusual for a clerical station. He asks the purpose of your records review before the clerk can respond. Your explanation holds, but the warden writes your name into the duty log before returning to his post. The intake logs stay on the restricted shelf. The pattern you were tracking will have to be approached from a different direction.`;
        addJournal('Warden presence at intake office — name search logged, access denied', 'complication', `s2global-name-cross-fail-${G.dayCount}`);
      } else {
        G.flags.suppressed_name_crosspolity = true;
        G.investigationProgress = (G.investigationProgress||0) + 1;
        G.lastResult = `Two of the three intake logs show the same strike-through format — single horizontal line, double-initialed in a margin hand you don't recognize. The third log is missing its intake column entirely, replaced with a summary sheet. Whatever name appeared there was removed before the summary was written. The absence in the third log is its own kind of answer.`;
        addJournal('Cross-polity intake logs — two matching strike-throughs, third log column removed entirely', 'intelligence', `s2global-name-cross-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The Collegium has a liaison in every major locality. None file the same report.",
    tags: ['Stage2', 'Investigation'],
    tag: 'risky',
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'mapping Collegium liaison inconsistencies');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.collegium_liaison_divergence = true;
        G.investigationProgress = (G.investigationProgress||0) + 1;
        G.lastResult = `The liaison here speaks carefully, which is its own kind of data. She confirms that her quarterly report goes to a named address in the Collegium's outer administrative tier. When pressed for the receiving office's title, she pauses — genuinely unsure. She was given an address, not a department. The report she files monthly summarizes activity; the one she sends quarterly summarizes the monthly ones. She has never received a response to either.`;
        addJournal('Collegium liaison files to address without department name — no responses received across monthly and quarterly reporting cycle', 'evidence', `s2global-collegium-liaison-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The liaison has dealt with people asking about report routing before — her posture shifts before you finish the question. She gives you the public Collegium address and a form number for general records inquiries. Both are correct and both are useless. She holds the door. The conversation ends before it started. Some avenues require a different kind of entry.`;
        addJournal('Collegium liaison deflected reporting structure inquiry — public form provided, no further access', 'complication', `s2global-collegium-liaison-fail-${G.dayCount}`);
      } else {
        G.flags.collegium_liaison_divergence = true;
        G.investigationProgress = (G.investigationProgress||0) + 1;
        G.lastResult = `The liaison describes her reporting structure in general terms: monthly activity summaries, quarterly consolidated reports, a standing instruction to flag anything involving inter-polity transit anomalies. She has flagged two such anomalies in the past year. She does not know what happened to either flag after it left her desk. Her file copies show the outgoing stamps but no acknowledgment receipt.`;
        addJournal('Collegium liaison flagged two transit anomalies — no acknowledgment receipts returned on either report', 'intelligence', `s2global-collegium-liaison-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Someone moved through this waystation without being logged. The dust says otherwise.",
    tags: ['Stage2', 'Investigation'],
    tag: 'risky',
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'reading unlogged waystation transit');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('finesse', (G.skills.stealth||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.waystation_unlogged_transit = true;
        G.investigationProgress = (G.investigationProgress||0) + 1;
        G.lastResult = `The waystation log shows four travelers in the past week. The supply shelf shows six distinct hand-sizes in the dust, two of them reaching past the recorded inventory items into the gap behind the back panel. Behind the panel: a folded transit authorization blank, pre-stamped with a Collegium outer-tier seal, unsigned. Whoever passed through here had access to pre-authorized transit documents and didn't need to log the crossing at all.`;
        addJournal('Waystation transit gap — pre-stamped Collegium authorization blanks stored behind supply panel, two unlogged travelers', 'evidence', `s2global-waystation-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The waystation keeper comes back while you're reading the dust patterns on the supply shelf. He doesn't say anything aggressive, but he plants himself in the doorway and asks what you're looking for. You name a supply item. He points to it — it's in the open section, not the area you were examining. He waits until you take it and leave. The back panel stays unexamined. There are other waystations on this route.`;
        addJournal('Waystation supply area interrupted — keeper present, back panel section unexamined', 'complication', `s2global-waystation-fail-${G.dayCount}`);
      } else {
        G.flags.waystation_unlogged_transit = true;
        G.investigationProgress = (G.investigationProgress||0) + 1;
        G.lastResult = `The log and the dust don't match. Four entries in the log; six distinct disturbance patterns in the settled dust on the shelf — one at roughly the right height for a child, or a short adult moving carefully. The waystation keeper logs what travelers tell him, not what he observes. He mentions, without prompting, that the night visits don't usually require logging under the charter exception for provisional transit.`;
        addJournal('Waystation dust-to-log discrepancy — keeper confirms charter exception allows unlogged night transit', 'intelligence', `s2global-waystation-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The supply manifest lists weights that don't match the cargo dimensions. Someone trained did this.",
    tags: ['Stage2', 'Investigation'],
    tag: 'risky',
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'detecting cargo manifest falsification');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('spirit', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.manifest_weight_fraud = true;
        G.investigationProgress = (G.investigationProgress||0) + 1;
        G.lastResult = `The discrepancy is consistent across fourteen manifests spanning two seasons: cargo listed as linen bales carries weights consistent with lead-lined containers. Whoever falsified these knew the standard bale weight tolerance — they stayed within it on each individual entry. The pattern only emerges across the full run. Someone with access to the full manifest record and the patience to read it against the loading ledger would find exactly what you found. No one did, or they chose not to.`;
        addJournal('Systematic manifest weight fraud — 14 manifests, linen bale entries carry lead-container weights, within per-entry tolerance but pattern-detectable across full run', 'evidence', `s2global-manifest-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The cargo office clerk asks why you need the secondary loading ledger. Standard manifest access doesn't require it. You give a reason; it's not quite the right reason for this office's protocol and she knows the difference. She provides the public manifest summary and notes that cross-referencing against loading records requires a formal audit request through the Guild Oversight desk. The specific manifests you need are now one administrative layer further away.`;
        addJournal('Cargo office protocol — loading ledger cross-reference requires formal audit request, access deferred', 'complication', `s2global-manifest-fail-${G.dayCount}`);
      } else {
        G.flags.manifest_weight_fraud = true;
        G.investigationProgress = (G.investigationProgress||0) + 1;
        G.lastResult = `Three manifests in the current season's batch list linen bales at weights that would require doubled loading crew, but the dispatch records show single-crew loads. The discrepancy in any one entry could be a recording error. Three in the same season, same route, same cargo descriptor — that's a method. Someone chose linen because the weight range is wide enough to absorb the variance without triggering a flag on individual review.`;
        addJournal('Three current-season manifests with impossible linen bale weights relative to dispatch crew records — consistent method, not individual error', 'intelligence', `s2global-manifest-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // ========== GLOBAL STAGE 2: Institutional Pattern Choices ==========

  {
    label: "The courier route changed three months ago. The posted notice is still the old one.",
    tags: ['Stage2', 'Investigation'],
    tag: 'risky',
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'cross-referencing courier route notices');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.courier_route_discrepancy = true;
        G.investigationProgress = (G.investigationProgress||0) + 1;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The route board lists three active courier lines, each with a dispatch frequency and a named relay point. The one marked for the eastern corridor shows a relay station that closed in the second month of last season — the building is still standing, but the posted dispatch frequency would require a keeper who isn't there. Someone updated the route but left the notice board unchanged. The gap isn't clerical. Deliberate omissions from public-facing records follow a pattern.`;
        addJournal('Courier route board lists closed relay station — gap between posted notice and operational reality is intentional', 'evidence', `s2global2-courier-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The dispatch office clerk has the updated route schedule, but it's an internal document — not for public distribution. You ask why the board hasn't been corrected. She looks at you the way people look when a question has a simple answer and the asker is about to get complicated. She offers to take a message for the route supervisor. The supervisor isn't in today. The board remains unchanged when you leave.`;
        addJournal('Courier route discrepancy — internal schedule not public, route supervisor unavailable', 'complication', `s2global2-courier-fail-${G.dayCount}`);
      } else {
        G.flags.courier_route_discrepancy = true;
        G.investigationProgress = (G.investigationProgress||0) + 1;
        G.lastResult = `The relay station marked on the board closed after a charter review — the ruling is posted inside the office, framed near the intake desk, but never updated on the exterior notice board. The current route actually passes through a waystation not listed anywhere publicly. Whoever uses this corridor regularly knows the change. Whoever depends on posted notices doesn't. That asymmetry between documented reality and public-facing record has a use, and someone is making use of it.`;
        addJournal('Eastern courier relay closed — actual route uses unlisted waystation, public board not corrected', 'intelligence', `s2global2-courier-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The Collegium's outer-tier seals appear on documents that predate the tier's existence.",
    tags: ['Stage2', 'Investigation'],
    tag: 'risky',
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'dating Collegium seal documents');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.collegium_seal_anachronism = true;
        G.investigationProgress = (G.investigationProgress||0) + 1;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The outer-tier designation was established fourteen months ago after a Guild Council amendment. The documents in front of you carry that seal on paper that the watermark dates to two seasons earlier. Whoever applied these seals either worked from a stock of pre-stamped blanks or had access to the seal before its official creation — which means access to the amendment process itself, not just its outcome. The institutional reach implied here runs higher than the documents suggest.`;
        addJournal('Collegium outer-tier seals on documents predating the tier — seal access preceded official establishment by at least two seasons', 'evidence', `s2global2-seals-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The archive registrar notices your attention on the seal dating and asks what you're cross-referencing. Archival access for comparative seal work requires a research designation — a specific one, not a general reading permit. You don't have it. She's not unkind about it, but the documents go back into their folder and the folder goes back to the shelf. The registrar notes the inquiry in the access log.`;
        addJournal('Seal comparison access denied — requires specific research designation, inquiry logged', 'complication', `s2global2-seals-fail-${G.dayCount}`);
      } else {
        G.flags.collegium_seal_anachronism = true;
        G.investigationProgress = (G.investigationProgress||0) + 1;
        G.lastResult = `Three documents in the current review batch carry the outer-tier seal. Two of them are dated within the last six months — consistent with the tier's existence. The third is dated a full year earlier, before the amendment. The registrar doesn't notice; she's working through intake volume. The seal on the older document uses the same wax composition, same stamp pressure, same positioning. It wasn't added later. It was applied when the document was originally produced.`;
        addJournal('One document in batch carries outer-tier seal predating the tier — original application, not retroactive stamp', 'intelligence', `s2global2-seals-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The night archivist's log shows entries written during hours she wasn't rostered to work.",
    tags: ['Stage2', 'Investigation'],
    tag: 'risky',
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'reading archivist roster against access log');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('finesse', (G.skills.stealth||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.archivist_offhours_entries = true;
        G.investigationProgress = (G.investigationProgress||0) + 1;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The access log and the roster don't overlap cleanly — entries appear on three nights she wasn't scheduled, each between the second and fourth hour of the watch. The handwriting matches. The documents accessed on those nights include two manifest files marked restricted and one correspondence bundle from the Collegium's regional office. She wasn't just working late. She came in specifically, on unrostered nights, to pull exactly those files. Someone gave her access codes for her own off-hours. Someone with administrative override.`;
        addJournal('Night archivist made three unrostered access entries — restricted manifests and Collegium correspondence pulled during off-hours with override access', 'evidence', `s2global2-archivist-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The roster ledger is kept at the duty desk, not the reading room. Getting to it required explaining why you needed staff records rather than archive materials. The explanation held long enough for a look, but not long enough to cross-reference the access log — the access log is in a different office, under a different administrative chain. The duty clerk logged your inquiry under a category that will circle back to the archivist eventually.`;
        addJournal('Roster access interrupted — access log in separate chain, inquiry logged under archivist oversight category', 'complication', `s2global2-archivist-fail-${G.dayCount}`);
      } else {
        G.flags.archivist_offhours_entries = true;
        G.investigationProgress = (G.investigationProgress||0) + 1;
        G.lastResult = `Two entries in the access log are dated to nights when the duty roster shows only a single watch-keeper rostered — not the archivist. The entries are brief: a pull-and-return on a manifest file, no annotation. The handwriting is careful. Whoever entered those lines was not in a hurry, but they kept the entry minimal. They knew someone might read it later.`;
        addJournal('Two off-roster access entries in archivist handwriting — minimal annotation, restricted manifest pulled and returned', 'intelligence', `s2global2-archivist-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "A broker's ledger lists three clients. Only one appears in the Guild registry as licensed.",
    tags: ['Stage2', 'Investigation'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'cross-checking broker ledger against Guild registry');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.broker_unlicensed_clients = true;
        G.investigationProgress = (G.investigationProgress||0) + 1;
        G.lastResult = `The broker gives up the unlicensed client names with less resistance than expected — she's been waiting for this conversation for two months. One name is a shell trade entity she's never been able to verify in person. The second is a regional supply coordinator whose license lapsed and was never renewed but whose payments kept arriving on schedule. She kept taking the work because refusing it came with an implied consequence she couldn't document. The pattern is coercion dressed as commerce.`;
        addJournal('Broker operating under implied coercion — two unlicensed clients, one shell entity, one lapsed coordinator; broker ready to speak', 'evidence', `s2global2-broker-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The broker closes the ledger before you finish the question. She's been through a licensing review before and knows exactly where this type of inquiry leads. She offers to have her Guild representative present before continuing and asks for your formal identification. The conversation ends there. She's not hostile — but the ledger is already locked and the key is in her coat.`;
        addJournal('Broker closed ledger on licensing query — requested formal identification, Guild rep required for continuation', 'complication', `s2global2-broker-fail-${G.dayCount}`);
      } else {
        G.flags.broker_unlicensed_clients = true;
        G.investigationProgress = (G.investigationProgress||0) + 1;
        G.lastResult = `The broker explains the unlicensed entries as pending registry — applications filed, approvals expected. She produces copies of the applications. One has a confirmation receipt dated four months ago; the other has no receipt at all. She's not lying, exactly. She's filling in the shape of a story that doesn't fully hold. The applications exist. What they're waiting for isn't clear.`;
        addJournal('Two unlicensed broker clients — one pending with 4-month-old receipt, one with no confirmation, applications exist but status unclear', 'intelligence', `s2global2-broker-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The transit warden stamped fourteen crates without opening one. The cargo list says dry goods.",
    tags: ['Stage2', 'Investigation'],
    tag: 'bold',
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'questioning transit warden inspection procedure');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('vigor', (G.skills.survival||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.transit_warden_uninspected = true;
        G.investigationProgress = (G.investigationProgress||0) + 1;
        G.lastResult = `The warden's inspection stamp log shows forty-three cargo batches in the last six weeks. Cross-referenced against the physical inspection record — a separate ledger with photo-weight signatures — eleven batches have stamps but no corresponding physical check. All eleven are from the same carrier entity. The warden's name appears on each stamp. He was present; he just didn't open the crates. That's a decision, not an oversight, and it happened across six weeks.`;
        addJournal('Transit warden stamped 11 batches from single carrier with no physical inspection — consistent pattern across 6 weeks, not oversight', 'evidence', `s2global2-warden-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The warden doesn't answer the question about the unopened crates. He answers a different question — the one about whether dry goods require physical inspection under the current transit charter. They don't, he explains, for certified carriers with a clean compliance record. He produces the carrier's compliance certificate. It's current and properly signed. Whatever is in the crates isn't your business under that charter, and he knows the charter better than you do.`;
        addJournal('Transit warden cited charter exemption — certified carrier dry goods exempt from physical inspection, certificate valid', 'complication', `s2global2-warden-fail-${G.dayCount}`);
      } else {
        G.flags.transit_warden_uninspected = true;
        G.investigationProgress = (G.investigationProgress||0) + 1;
        G.lastResult = `The warden looked at the cargo list but not the cargo. He says the carrier's weight declarations were within tolerance and the charter doesn't require physical inspection for certified dry goods below a certain declared value. This batch declared just under that threshold. The declared value on the manifest is handwritten in a different ink than the rest of the entry.`;
        addJournal('14-crate transit batch uninspected — declared value handwritten in different ink, just under physical inspection threshold', 'intelligence', `s2global2-warden-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The missing quarter's supply allocation reappeared, filed under a category that didn't exist then.",
    tags: ['Stage2', 'Investigation'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'tracing retroactively filed supply allocation');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.supply_retroactive_filing = true;
        G.investigationProgress = (G.investigationProgress||0) + 1;
        G.lastResult = `The allocation was filed under a "provisional logistical reserve" category — a classification that didn't exist in the archive taxonomy until this fiscal quarter. Someone went back into last season's records and retroactively assigned a category to make the missing allocation appear accounted for. The category itself is real; it was created legitimately. What's illegitimate is its application to documents that predate it. The archive system accepted the change without flagging the temporal inconsistency.`;
        addJournal('Missing allocation retroactively filed under new category — taxonomy manipulation, archive system accepted without dating flag', 'evidence', `s2global2-supply-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The supply ledger clerk pulls the category index and shows you the classification reference. The entry exists and is properly cross-referenced. The clerk runs a record integrity check while you wait — it comes back clean. Whatever manipulation occurred is above the level the standard integrity check examines. You've reached the edge of what routine document review can surface without specialist access.`;
        addJournal('Supply ledger integrity check returned clean — manipulation above standard review level, specialist access required', 'complication', `s2global2-supply-fail-${G.dayCount}`);
      } else {
        G.flags.supply_retroactive_filing = true;
        G.investigationProgress = (G.investigationProgress||0) + 1;
        G.lastResult = `The "provisional logistical reserve" classification appears twice in the archive: once in its actual creation record from this quarter, and once applied to the missing allocation from last season. The dates don't match. The clerk points this out herself, unprompted — she noticed it during routine intake and logged a query to the category administration office. The query hasn't been answered.`;
        addJournal('Provisional reserve category applied retroactively — clerk noticed date mismatch, query to category admin unanswered', 'intelligence', `s2global2-supply-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The person who processed these clearances left two months ago. No one replaced her.",
    tags: ['Stage2', 'Investigation'],
    tag: 'risky',
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'tracing vacant clearance role');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.clearance_role_vacant = true;
        G.investigationProgress = (G.investigationProgress||0) + 1;
        G.lastResult = `The role was not posted for replacement. The function — processing transit clearances for the mid-tier cargo categories — has continued uninterrupted since she left. Someone is doing the work without the role title, without the salary line, and without appearing in the staff register. The clearances themselves are valid; the stamps match; the authorization codes are current. Whoever took over has full institutional access and no institutional record. That combination doesn't happen accidentally.`;
        addJournal('Clearance role vacant 2 months — function continues under unregistered operator with full access and no staff record, not accidental', 'evidence', `s2global2-clearance-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The administrative supervisor you need is the person who would normally handle this type of inquiry — but she's the one who left. Her replacement question gets referred to a deputy who covers three other functions and doesn't have context for clearance processing. He offers to pass along a message and find out who's currently handling the intake. He'll have an answer by end of week. He doesn't look certain of that.`;
        addJournal('Clearance vacancy inquiry referred to uninformed deputy — no resolution timeline, end-of-week answer uncertain', 'complication', `s2global2-clearance-fail-${G.dayCount}`);
      } else {
        G.flags.clearance_role_vacant = true;
        G.investigationProgress = (G.investigationProgress||0) + 1;
        G.lastResult = `The staff register shows the position as "under review for consolidation" — a bureaucratic holding category that doesn't trigger a mandatory replacement timeline. The clearances processed since her departure carry valid stamps but a slightly different signature formation on the authorization line. The pen pressure is different; the loop on the final character is rounder. Different hand. Someone is processing these, listed under no designation in the register, drawing no salary, leaving no trace.`;
        addJournal('Clearance role under review, not replaced — different signature formation on recent clearances, processor unlisted in register', 'intelligence', `s2global2-clearance-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The duty roster pins identical shifts for three weeks. No one keeps identical shifts.",
    tags: ['Stage2', 'Investigation'],
    tag: 'risky',
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'reading duty roster for shift pattern anomalies');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('spirit', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.roster_shift_pattern = true;
        G.investigationProgress = (G.investigationProgress||0) + 1;
        G.lastResult = `Natural shift variation — illness, trade, schedule adjustment — guarantees that three weeks of identical pinned assignments cannot occur without deliberate intervention. The roster has been printed rather than written, using an administrative template that locks the assignments and prevents the usual field notation. Someone with access to the administrative print function set the roster to auto-repeat and removed the notation field. The shift assignments frozen in place are for the positions that cover the mid-corridor checkpoint — the one where the uninspected crates transit.`;
        addJournal('Duty roster auto-repeated via admin template — notation removed, frozen positions cover mid-corridor checkpoint used for uninspected cargo', 'evidence', `s2global2-roster-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The shift supervisor catches you reading the duty roster without checking in at the duty desk first. Protocol requires logging entry intent before accessing staff documents. It's a minor procedural breach, not a serious one, but it gets noted and it colors the rest of the conversation. The supervisor answers shift questions in the narrowest possible terms. The roster goes back to its position behind the desk before you've finished.`;
        addJournal('Duty roster access procedural breach — supervisor noted entry, shift questions answered minimally', 'complication', `s2global2-roster-fail-${G.dayCount}`);
      } else {
        G.flags.roster_shift_pattern = true;
        G.investigationProgress = (G.investigationProgress||0) + 1;
        G.lastResult = `The roster is printed, not written — unusual enough that the day supervisor mentions it without being asked, attributing it to a new administrative standardization push. The assignments on the printed roster are identical across all three weeks visible on the board. Shift swaps and adjustments would normally show up as handwritten notations in the margins. There are none. The standardization push, if it exists, removed the mechanism for recording variation.`;
        addJournal('Printed roster with no margin notations — standardization push eliminated shift variation recording mechanism', 'intelligence', `s2global2-roster-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // Faction 4: Red Hood Guild
  {
    cid: 'stage2_redhood_contact',
    label: 'She knows about the unmarked cargo — that phrase wasn\'t an accident.',
    tags: ['stage2', 'faction_contact', 'Faction', 'RedHood', 'Stealth'],
    tag: 'risky',
    xpReward: 60,
    fn: function() {
      var roll = rollD20('charm', G.skills.charm);
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
        addNarration('Guild Fence — No Deal', 'She names what she wants and you don\'t have it — or you have it and won\'t give it. Either way her expression doesn\'t change. She picks up a clay jar and turns it in her hands, appraising the glaze with the professional attention of someone who stopped listening to you a sentence ago. The conversation is over. The stall stays busy around you and she doesn\'t look at you again. The jar goes back on the shelf.');
      }
    }
  }
];

window.STAGE2_ENRICHED_CHOICES = STAGE2_ENRICHED_CHOICES;
