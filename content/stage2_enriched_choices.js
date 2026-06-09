const STAGE2_ENRICHED_CHOICES = [
  // ========== TRAVEL ENCOUNTERS: Mysterious Figures & Hazardous Routes ==========
  {
    label: "The cloaked trader on the Ridgeway has maps she isn't selling to everyone.",
    plot: 'main',
    tags: ['Travel', 'Mystery', 'Negotiation', 'Risk', 'Meaningful'],
    tag: 'risky',
    xpReward: 70,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'engaging mysterious traveler');
      
      const result = rollD20('charm', (G.skills.charm || 0));
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
    plot: 'main',
    tags: ['Travel', 'Risk', 'Decision', 'Route', 'Meaningful'],
    tag: 'risky',
    xpReward: 72,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(72, 'choosing dangerous route');
      
      const result = rollD20('vigor', (G.skills.vigor || 0));
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
    plot: 'main',
    tags: ['Travel', 'Negotiation', 'Pressure', 'Choice', 'Meaningful'],
    tag: 'risky',
    xpReward: 70,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'negotiating river crossing');
      
      const result = rollD20('charm', (G.skills.charm || 0));
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
    plot: 'main',
    tags: ['Travel', 'Survival', 'Risk', 'Decision', 'Meaningful'],
    xpReward: 68,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(68, 'managing travel risks');
      
      const result = rollD20('vigor', (G.skills.vigor || 0));
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
    plot: 'main',
    tags: ['Travel', 'Moral', 'Combat', 'Consequence', 'Meaningful'],
    tag: 'bold',
    xpReward: 73,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(73, 'making moral stand');
      
      const result = rollD20('charm', (G.skills.charm || 0));
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
    plot: 'main',
    tags: ['Travel', 'Trust', 'Deception', 'Risk', 'Meaningful'],
    xpReward: 71,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(71, 'assessing companion trustworthiness');
      
      const result = rollD20('finesse', (G.skills.finesse || 0));
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
    plot: 'main',
    tags: ['Travel', 'Mystery', 'Danger', 'Investigation', 'Meaningful'],
    tag: 'risky',
    xpReward: 69,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(69, 'pursuing mysterious phenomenon');
      
      const result = rollD20('wits', (G.skills.wits || 0));
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
    plot: 'main',
    tags: ['Travel', 'Route', 'Risk', 'Temptation', 'Meaningful'],
    tag: 'bold',
    xpReward: 72,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(72, 'navigating forbidden terrain');
      
      const result = rollD20('vigor', (G.skills.vigor || 0));
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
    plot: 'main',
    tags: ['Travel', 'Past', 'Connection', 'Caution', 'Meaningful'],
    tag: 'risky',
    xpReward: 70,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reconnecting with past');
      
      const result = rollD20('charm', (G.skills.charm || 0));
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
    plot: 'main',
    tags: ['Travel', 'Moral', 'Intelligence', 'Consequence', 'Meaningful'],
    tag: 'bold',
    xpReward: 71,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(71, 'encountering regional crisis');
      
      const result = rollD20('wits', (G.skills.charm || 0));
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
    plot: 'main',
    tags: ['Faction', 'Negotiation', 'Pressure', 'Alliance', 'Meaningful'],
    tag: 'risky',
    xpReward: 72,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(72, 'engaging with faction politics');
      
      const result = rollD20('charm', (G.skills.charm || 0));
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
    plot: 'main',
    tags: ['Faction', 'Choice', 'Power', 'Consequence', 'Meaningful'],
    tag: 'risky',
    xpReward: 74,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(74, 'navigating factional rivalry');
      
      const result = rollD20('finesse', (G.skills.finesse || 0));
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
    plot: 'main',
    tags: ['Faction', 'Moral', 'Violence', 'Pressure', 'Meaningful'],
    tag: 'bold',
    xpReward: 75,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'dealing with dark faction requests');
      
      const result = rollD20('charm', (G.skills.charm || 0));
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
    plot: 'main',
    tags: ['Faction', 'Discovery', 'Risk', 'Intelligence', 'Meaningful'],
    tag: 'risky',
    xpReward: 70,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'discovering faction infrastructure');
      
      const result = rollD20('finesse', (G.skills.finesse || 0));
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
    plot: 'main',
    tags: ['Faction', 'Risk', 'Defection', 'Moral', 'Meaningful'],
    tag: 'bold',
    xpReward: 73,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(73, 'managing factional defection');
      
      const result = rollD20('finesse', (G.skills.finesse || 0));
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
    plot: 'main',
    tags: ['Faction', 'Politics', 'Trust', 'Authority', 'Meaningful'],
    tag: 'risky',
    xpReward: 72,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(72, 'mediating internal faction conflict');
      
      const result = rollD20('charm', (G.skills.charm || 0));
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
    plot: 'main',
    tags: ['Faction', 'Mystery', 'Danger', 'Moral', 'Meaningful'],
    tag: 'bold',
    xpReward: 71,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(71, 'discovering operative death');
      
      const result = rollD20('wits', (G.skills.wits || 0));
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
    plot: 'main',
    tags: ['Faction', 'Espionage', 'Network', 'Pressure', 'Meaningful'],
    tag: 'risky',
    xpReward: 70,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'undertaking espionage assignment');
      
      const result = rollD20('finesse', (G.skills.finesse || 0));
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
    plot: 'main',
    tags: ['Faction', 'Suspicion', 'Investigation', 'Pressure', 'Meaningful'],
    xpReward: 73,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(73, 'clearing factional suspicion');
      
      const result = rollD20('wits', (G.skills.wits || 0));
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
    plot: 'main',
    tags: ['Companion', 'Trust', 'Deception', 'Loyalty', 'Meaningful'],
    xpReward: 72,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(72, 'navigating companion deception');
      
      const result = rollD20('charm', (G.skills.charm || 0));
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
    plot: 'main',
    tags: ['Companion', 'Choice', 'Loyalty', 'Consequence', 'Meaningful'],
    tag: 'bold',
    xpReward: 71,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(71, 'managing companion departure');
      
      const result = rollD20('charm', (G.skills.charm || 0));
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
    plot: 'main',
    tags: ['Companion', 'Moral', 'Sacrifice', 'Care', 'Meaningful'],
    tag: 'risky',
    xpReward: 70,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'sacrificing for companion welfare');
      
      const result = rollD20('charm', (G.skills.charm || 0));
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
    plot: 'main',
    tags: ['Companion', 'Moral', 'Conflict', 'Leadership', 'Meaningful'],
    tag: 'risky',
    xpReward: 71,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(71, 'mediating companion conflicts');
      
      const result = rollD20('charm', (G.skills.charm || 0));
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
    plot: 'main',
    tags: ['Companion', 'Sacrifice', 'Moral', 'Risk', 'Meaningful'],
    xpReward: 74,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(74, 'facing companion illness crisis');
      
      const result = rollD20('wits', (G.skills.wits || 0));
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
    plot: 'main',
    tags: ['Companion', 'Moral', 'Consequence', 'Risk', 'Meaningful'],
    tag: 'bold',
    xpReward: 73,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(73, 'managing companion family crisis');
      
      const result = rollD20('finesse', (G.skills.finesse || 0));
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
    plot: 'main',
    tags: ['Companion', 'Sacrifice', 'Revelation', 'Loyalty', 'Meaningful'],
    tag: 'risky',
    xpReward: 72,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(72, 'discovering companion sacrifice');
      
      const result = rollD20('charm', (G.skills.charm || 0));
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
    plot: 'main',
    tags: ['Companion', 'Trust', 'Deception', 'Conflict', 'Meaningful'],
    xpReward: 70,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'processing companion betrayal revelation');
      
      const result = rollD20('charm', (G.skills.charm || 0));
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
    plot: 'main',
    tags: ['Intelligence', 'Route', 'Information', 'Cost', 'Meaningful'],
    tag: 'safe',
    failResult: 'The scout moved on before the price was settled — route intelligence is still available through other channels in this district.',
    xpReward: 70,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'acquiring route intelligence');
      
      const result = rollD20('charm', (G.skills.charm || 0));
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
    plot: 'main',
    tags: ['Intelligence', 'Espionage', 'Information', 'Power', 'Meaningful'],
    tag: 'risky',
    xpReward: 71,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(71, 'intercepting institutional communication');
      
      const result = rollD20('wits', (G.skills.wits || 0));
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
    plot: 'main',
    tags: ['Intelligence', 'Spy', 'Moral', 'Pressure', 'Meaningful'],
    tag: 'risky',
    xpReward: 72,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(72, 'harboring institutional spy');
      
      const result = rollD20('finesse', (G.skills.finesse || 0));
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
    plot: 'main',
    tags: ['Intelligence', 'Observation', 'Espionage', 'Risk'],
    tag: 'risky',
    xpReward: 69,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(69, 'performing covert observation');
      
      const result = rollD20('finesse', (G.skills.finesse || 0));
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
    plot: 'main',
    tags: ['Intelligence', 'Network', 'Alliance', 'Commitment', 'Meaningful'],
    tag: 'risky',
    xpReward: 70,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'building intelligence network');
      
      const result = rollD20('charm', (G.skills.charm || 0));
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
    plot: 'main',
    tags: ['Intelligence', 'Investigation', 'Mystery', 'Consequence', 'Meaningful'],
    tag: 'bold',
    xpReward: 71,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(71, 'investigating dead messenger');
      
      const result = rollD20('wits', (G.skills.wits || 0));
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
    plot: 'main',
    tags: ['Intelligence', 'Opportunity', 'Moral', 'Risk', 'Meaningful'],
    tag: 'bold',
    xpReward: 73,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(73, 'breaching institutional archives');
      
      const result = rollD20('finesse', (G.skills.finesse || 0));
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
    plot: 'main',
    tags: ['Intelligence', 'Corruption', 'Legal', 'Risk', 'Meaningful'],
    tag: 'risky',
    xpReward: 72,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(72, 'dealing with corruption testimony');
      
      const result = rollD20('charm', (G.skills.charm || 0));
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
    xpReward: 20,
    text: 'Seld counted something on his fingers just now. He stopped at four.',
    tags: ['Investigation', 'Social'],
    plot: 'main',
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
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
    xpReward: 20,
    text: 'Seld has a document fragment he isn\'t supposed to have.',
    tags: ['Investigation', 'Social'],
    plot: 'main',
    condition: function() { return G.flags && G.flags.stage2_collegium_contact; },
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
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
    xpReward: 20,
    text: 'Seld is being watched. He knows and he came anyway.',
    tags: ['Confrontation', 'Social'],
    plot: 'main',
    condition: function() { return G.flags && G.flags.stage2_collegium_contact; },
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
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
    xpReward: 20,
    text: 'Seld trusts process. The Wardens trust force. These are not compatible.',
    tags: ['Confrontation', 'Social'],
    plot: 'main',
    condition: function() { return G.flags && G.flags.stage2_collegium_contact && G.flags.stage2_wardens_contact; },
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
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
    xpReward: 20,
    text: 'The checkpoint officer pulled my transit record before she said a word.',
    tags: ['Investigation', 'Social'],
    plot: 'main',
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
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
    xpReward: 20,
    text: 'She has corridor data that hasn\'t been filed with any district office.',
    tags: ['Investigation', 'Social'],
    plot: 'main',
    condition: function() { return G.flags && G.flags.stage2_wardens_contact; },
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
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
    xpReward: 20,
    text: 'The Wardens are being watched from above their own chain.',
    tags: ['Investigation', 'Social'],
    plot: 'main',
    condition: function() { return G.flags && G.flags.stage2_wardens_contact; },
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
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
    xpReward: 20,
    text: 'The Wardens enforce what the Collegium documents. One without the other stops here.',
    tags: ['Social', 'Confrontation'],
    plot: 'main',
    condition: function() { return G.flags && G.flags.stage2_wardens_contact && G.flags.stage2_collegium_contact; },
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
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

  // ========== COLLEGIUM FACTION PATH EXPANSION (choices 5–12) ==========

  {
    id: 's2_collegium_5',
    label: 'Filing the audit request means flagging the filer.',
    xpReward: 20,
    skill: 'wits',
    tags: ['Evidence', 'Risk'],
    plot: 'main',
    questId: 'q_s2_boss',
    condition: function() {
      return G.flags && G.flags.stage2_collegium_contact && (G.stageProgress[2] || 0) >= 2;
    },
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.wits || 0);
      if (r.total >= 13) {
        G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        G.flags.collegium_audit_flagged = true;
        addNarration('', 'The internal audit request goes through — but the submission form requires a requester name, and names on audit requests go into a secondary log that is not part of the main index. Seld told you this before you filed it. The log exists, the request exists, and the records you are asking about are now associated with someone who asked about them. The archivist who processes the request does not look at you while she stamps it. The stamp is heavier than it needs to be.');
        addJournal('Internal audit request filed under own name. Audit log now links requester to suppressed records — access gained, exposure increased.', 'evidence');
        G.recentOutcomeType = 'discovery';
      } else {
        addNarration('', 'The form requires a category code from the processing clerks, and the processing clerks are not available until the afternoon rotation. The audit request sits in a pending tray. Seld finds you in the corridor and says the pending tray is reviewed by the reading room supervisor, who logs every request that waits more than two hours. You retrieve the form before the two hours pass. The request has not been filed. The window is still open, but narrower than before.');
        addJournal('Audit request stalled — requires processing clerk category code. Pending tray under supervisor review.', 'complication');
        G.recentOutcomeType = 'complication';
      }
      if (typeof checkStageAdvance === 'function') checkStageAdvance();
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: {
      text: 'The audit request requires a category code not available through public channels. The form sits unsubmitted, but the window is still open.'
    }
  },

  {
    id: 's2_collegium_6',
    label: 'The Collegium source wants something before she speaks.',
    xpReward: 20,
    skill: 'charm',
    tags: ['Social', 'Negotiation'],
    plot: 'main',
    questId: 'q_s2_boss',
    condition: function() {
      return G.flags && G.flags.stage2_collegium_contact && (G.stageProgress[2] || 0) >= 3;
    },
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.charm || 0);
      if (r.total >= 13) {
        G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        G.flags.collegium_witness_met = true;
        addNarration('', 'She names what she wants without preamble: confirmation that someone outside the Collegium has seen the same routing numbers she has. Not proof, not documents — just confirmation. You give it. She considers for a moment, then produces a folded sheet from inside her sleeve. Three suppression batch references, two dates, and a notation in the margin in a different hand from the main text. The other hand belongs to a records clerk who left the Collegium fourteen months ago under unclear circumstances. She did not say that. You inferred it from the dates.');
        addJournal('Collegium source provided suppression batch references with marginal notation from a former clerk. Source confirmed: the pattern extends to personnel removals.', 'evidence');
        G.recentOutcomeType = 'discovery';
      } else {
        addNarration('', 'She listens and does not move. What you can offer her is not what she named. She asks one more question — whether you have spoken to anyone in the transit authority directly — and when you answer, something in her posture closes slightly. She says she needs to think. She will be in the east reading room on the morning rotation for the next six days. She does not say which of those days she will be ready to speak.');
        addJournal('Collegium source declined exchange — requires transit authority confirmation first. Morning rotation contact window open.', 'intelligence');
        G.recentOutcomeType = 'complication';
      }
      if (typeof checkStageAdvance === 'function') checkStageAdvance();
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: {
      text: 'The source is not ready to speak yet. She needs confirmation from outside the archive before she will move. The morning rotation window stays open.'
    }
  },

  {
    id: 's2_collegium_7',
    label: 'The sealed records partition runs on a different access schedule.',
    xpReward: 20,
    skill: 'finesse',
    tags: ['Stealth', 'Evidence'],
    plot: 'main',
    questId: 'q_s2_boss',
    condition: function() {
      return G.flags && G.flags.stage2_collegium_contact && (G.stageProgress[2] || 0) >= 4;
    },
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.finesse || 0);
      if (r.total >= 14) {
        G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        G.flags.collegium_sealed_accessed = true;
        addNarration('', 'The sealed partition uses a rotating key schedule — the same key does not work two days running. The rotation is not posted anywhere, but the clerks who work the partition have to check a board inside the reading room vestibule every morning. You watch the board for two mornings before you understand the pattern. On the third morning you are in and out before the first shift rotation. What you find is a suppression manifest — not the records themselves but the index to them, annotated by hand with a phrase you have not seen before: "axis exploitation, restricted disclosure."');
        addJournal('Sealed partition accessed. Suppression manifest found with marginal notation: "axis exploitation, restricted disclosure." First reference to the subject of the suppression operation.', 'evidence');
        G.recentOutcomeType = 'discovery';
      } else {
        addNarration('', 'The partition key does not match today. Someone changed the schedule — either routine rotation or a response to the audit request. The vestibule board has been wiped clean. A clerk passes through the partition without acknowledging you. Whatever window existed in the rotation has closed. There will be another cycle, but you do not know when, and the audit request may have shortened the interval.');
        addJournal('Sealed partition access failed — key rotation changed. Audit request may have triggered schedule change.', 'complication');
        G.recentOutcomeType = 'complication';
      }
      if (typeof checkStageAdvance === 'function') checkStageAdvance();
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: {
      text: 'The partition key rotation is unpredictable. The vestibule board provides the pattern — watch it longer before attempting access again.'
    }
  },

  {
    id: 's2_collegium_8',
    label: 'One Collegium member broke with the faction over this suppression.',
    xpReward: 20,
    skill: 'charm',
    tags: ['Social', 'Evidence'],
    plot: 'main',
    questId: 'q_s2_boss',
    condition: function() {
      return G.flags && G.flags.stage2_collegium_contact && (G.stageProgress[2] || 0) >= 5;
    },
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.charm || 0);
      if (r.total >= 13) {
        G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        addNarration('', 'He left the Collegium\'s administrative tier fourteen months ago. He says it plainly, without bitterness: he raised a procedural objection to a suppression batch at a records review meeting and the meeting ended early. No one spoke to him afterward. His access to the secondary index was revoked within a week. He still attends the Collegium as a researcher — the research credentials were not pulled, only the administrative ones. He says that tells him something about how the suppression was authorized: narrowly, specifically, and at a level that knew the difference between access types.');
        addJournal('Former Collegium administrator described selective credential revocation following suppression objection. Authorization was narrow and access-type-specific.', 'intelligence');
        G.recentOutcomeType = 'discovery';
      } else {
        addNarration('', 'He listens and does not react with surprise. He has thought about this longer than you have. He asks who sent you, and when you give him an answer he considers adequate, he says: he already told someone else what he knows, and that person has not come back. He does not know if that is because they found what they needed or because they found something else. He will speak again if you can tell him what happened to the first one.');
        addJournal('Former Collegium administrator: spoke to previous inquirer who did not return. Will share knowledge when prior contact is accounted for.', 'complication');
        G.recentOutcomeType = 'complication';
      }
      if (typeof checkStageAdvance === 'function') checkStageAdvance();
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: {
      text: 'The former administrator will not speak until the prior inquirer is accounted for. He is not hostile — only careful in a way that suggests he has reason to be.'
    }
  },

  {
    id: 's2_collegium_9',
    label: 'The suppression authorization came through a transit stamp, not a signatory.',
    xpReward: 20,
    skill: 'wits',
    tags: ['Evidence', 'Lore'],
    plot: 'main',
    questId: 'q_s2_boss',
    condition: function() {
      return G.flags && G.flags.stage2_collegium_contact && (G.stageProgress[2] || 0) >= 6;
    },
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.wits || 0);
      if (r.total >= 13) {
        G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        addNarration('', 'The suppression mandate does not carry a personal seal. It carries a transit authority stamp — the kind issued to routing post supervisors to certify cargo manifests. Someone used a transit stamp in place of an administrative signatory, which is procedurally irregular but not technically invalid, because the transit authority charter predates the Collegium\'s suppression protocol by forty years. Whoever authorized this knew the gap existed. The transit post with that stamp series is registered in the Soreheim district. You write down the stamp reference number.');
        addJournal('Suppression authorization routed through a transit authority stamp, not a personal seal. Stamp series registered to Soreheim transit district — institutional gap exploited deliberately.', 'evidence');
        G.recentOutcomeType = 'discovery';
      } else {
        addNarration('', 'The authorization format is unusual — you can see that much. But the procedural basis for the stamp usage requires access to the transit authority charter, which is filed in a different section of the index than the suppression records. The two systems were never designed to interface. You note the stamp reference number and the discrepancy. The charter section is publicly accessible, but cross-referencing it will take time.');
        addJournal('Transit stamp used in suppression authorization — procedural basis requires charter cross-reference. Stamp reference noted.', 'intelligence');
        G.recentOutcomeType = 'complication';
      }
      if (typeof checkStageAdvance === 'function') checkStageAdvance();
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: {
      text: 'The transit charter cross-reference is publicly accessible. The stamp reference number is already noted — the procedural gap just needs time to trace.'
    }
  },

  {
    id: 's2_collegium_10',
    label: 'Third record. The coordination extends well beyond this polity.',
    xpReward: 20,
    skill: 'wits',
    tags: ['Evidence', 'Confrontation'],
    plot: 'main',
    questId: 'q_s2_climax',
    condition: function() {
      return G.flags && G.flags.stage2_collegium_contact && G.flags.collegium_witness_met && (G.stageProgress[2] || 0) >= 7;
    },
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.wits || 0);
      if (r.total >= 14) {
        G.stageProgress[2] = (G.stageProgress[2] || 0) + 2;
        G.flags.collegium_evidence_complete = true;
        addNarration('', 'The third record is not from this archive. The Collegium witness produced it from her own keeping — a certified copy of a suppression manifest from a different polity, same routing codes, same stamp series, filed in the same fourteen-month window. The axis exploitation operation was not local. The Collegium in three separate jurisdictions processed suppression batches using the same procedural gap. Someone coordinated this across institutional boundaries without leaving a personal name on any of it. The transit stamp mechanism was the point: it authorized everything without anyone being personally accountable for it.');
        addJournal('Third suppression record confirmed: axis exploitation operation coordinated across at least three polities using same transit stamp mechanism. No personal authorization — institutional accountability gap exploited at scale.', 'evidence');
        G.recentOutcomeType = 'discovery';
      } else {
        addNarration('', 'The record exists — she brought it. But the Collegium certification on it requires a provenance check before it can be used as evidence, and the provenance office is the same office that processed two of the suppression batches in question. She knows this. She says she has submitted a provenance challenge through a separate channel, but challenges take thirty days. The record is real. The mechanism for using it is currently blocked by the mechanism it documents.');
        addJournal('Third suppression record in hand but certification blocked by the same office it documents. Provenance challenge filed — thirty-day delay.', 'complication');
        G.recentOutcomeType = 'complication';
      }
      if (typeof checkStageAdvance === 'function') checkStageAdvance();
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: {
      text: 'The third record is real but currently blocked by a provenance challenge. The thirty-day window is running — the evidence trail is complete in substance, if not yet in procedure.'
    }
  },

  {
    id: 's2_collegium_11',
    label: 'The Collegium will provide cover for the confrontation. At a price.',
    xpReward: 20,
    skill: 'charm',
    tags: ['Social', 'Alliance'],
    plot: 'main',
    questId: 'q_s2_climax',
    condition: function() {
      return G.flags && G.flags.stage2_collegium_contact && (G.stageProgress[2] || 0) >= 8;
    },
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.charm || 0);
      if (r.total >= 14) {
        G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        G.flags.collegium_cover_arranged = true;
        addNarration('', 'The Collegium faction\'s price is specific: a certified copy of the suppression manifest, filed into the Collegium\'s own sealed index under a category they designate, before any confrontation moves forward. They want the record inside their institutional structure where it cannot be quietly destroyed. The confrontation can proceed once that copy is filed. You agree. Seld counts through all five fingers, both hands, and says the category designation will be ready by morning. The price is not unreasonable. It is the price of having an institution with you rather than in your way.');
        addJournal('Collegium faction agreed to provide confrontation cover in exchange for certified copy filed in sealed institutional index. Cover arranged pending morning filing.', 'intelligence');
        G.recentOutcomeType = 'discovery';
      } else {
        addNarration('', 'The Collegium representative listens to the proposal and says: not yet. The evidence trail needs one more confirming element before the faction will commit institutional backing to a confrontation. They are not refusing — they are waiting for a threshold they have not named explicitly. Seld\'s count stops at three. He says he will tell you when the threshold is met.');
        addJournal('Collegium cover not yet arranged — faction waiting for additional confirming evidence before committing to confrontation backing.', 'complication');
        G.recentOutcomeType = 'complication';
      }
      if (typeof checkStageAdvance === 'function') checkStageAdvance();
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: {
      text: 'The Collegium faction is not yet ready to commit. They will signal readiness when their internal threshold is met — the window is not closed.'
    }
  },

  {
    id: 's2_collegium_12',
    label: 'The final Collegium record names the mechanism. Not the person behind it.',
    xpReward: 20,
    skill: 'wits',
    tags: ['Evidence', 'Discovery'],
    plot: 'main',
    questId: 'q_s2_climax',
    condition: function() {
      return G.flags && G.flags.stage2_collegium_contact && (G.stageProgress[2] || 0) >= 9;
    },
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.wits || 0);
      if (r.total >= 14) {
        G.stageProgress[2] = (G.stageProgress[2] || 0) + 2;
        G.flags.gleam_mechanism_identified = true;
        addNarration('', 'The record is a suppression authorization form — not a batch manifest but the underlying authorization itself. At the top of the form, in administrative typeface, a single line reads: "Enforcement mechanism: GLEAM." Below it, a certification stamp and a transit authority reference number. GLEAM is not a person. It is the name of the enforcement mechanism — the system that coordinates suppression across jurisdictions using transit authority infrastructure. The Collegium record does not name who authorized GLEAM or who administers it. It only confirms that GLEAM exists, that it has a name, and that someone in the transit authority structure knew what to call it.');
        addJournal('Suppression authorization form identifies enforcement mechanism by codename: GLEAM. Mechanism uses transit authority infrastructure to coordinate cross-jurisdictional suppression. No personal authorization identified — only the mechanism.', 'evidence');
        G.recentOutcomeType = 'discovery';
      } else {
        addNarration('', 'The authorization form is behind a locked case in the restricted stacks. The case requires a dual-access process: one key from the reading room supervisor, one from the partition clerk. The partition clerk is on leave until the day after tomorrow. The form is visible through the case glass. One line of typeface is legible from outside the glass — a single word in administrative font that you cannot fully make out at this distance. It begins with G.');
        addJournal('Authorization form visible in locked case — dual-access required. Partition clerk on leave. Single word legible through glass: begins with G.', 'complication');
        G.recentOutcomeType = 'complication';
      }
      if (typeof checkStageAdvance === 'function') checkStageAdvance();
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: {
      text: 'The authorization form is behind a dual-access lock. The partition clerk returns the day after tomorrow — the G-word visible through the glass will still be there.'
    }
  },

  // ========== ROAD WARDENS FACTION PATH EXPANSION (choices 5–12) ==========

  {
    id: 's2_wardens_5',
    label: 'The runner knows three routes nobody maps.',
    xpReward: 20,
    skill: 'finesse',
    tags: ['Stealth', 'Intelligence'],
    plot: 'main',
    questId: 'q_s2_boss',
    condition: function() {
      return G.flags && G.flags.stage2_wardens_contact && (G.stageProgress[2] || 0) >= 2;
    },
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.finesse || 0);
      if (r.total >= 13) {
        G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        G.flags.wardens_route_known = true;
        addNarration('', 'The runner does not write routes down. She walks them, memorizes the variables — which overhangs shelter in rain, which alley angles give sightlines to both checkpoint posts, which dock worker changes shifts at what hour. Three routes. None of them appear on any district transit map. She recites the first two in forty words each, then stops. The third route she will only walk with you, not describe. She picks up her coat and looks at the door. The third route goes somewhere you are going to need.');
        addJournal('Road Wardens runner identified three unmapped routes through monitored transit district. Third route requires personal escort — she is ready to move.', 'intelligence');
        G.recentOutcomeType = 'discovery';
      } else {
        addNarration('', 'She is cautious in a way that suggests she has been burned before. She gives you the first route — one, not three — and watches how you receive the information before committing to the rest. The single route is real: a loading dock alley that bypasses the secondary checkpoint entirely. She says the other two routes depend on who sent you and why. She needs to verify something first. She will find you. She does not say when.');
        addJournal('Runner provided one of three unmapped routes. Full route access conditional on verification of referral. Partial route confirmed operational.', 'complication');
        G.recentOutcomeType = 'complication';
      }
      if (typeof checkStageAdvance === 'function') checkStageAdvance();
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: {
      text: 'The runner is cautious. One route confirmed. She is verifying the referral before sharing the rest — she will find you when she is ready.'
    }
  },

  {
    id: 's2_wardens_6',
    label: 'The cargo broker speaks if the Road Wardens vouch for the meeting.',
    xpReward: 20,
    skill: 'charm',
    tags: ['Social', 'Evidence'],
    plot: 'main',
    questId: 'q_s2_boss',
    condition: function() {
      return G.flags && G.flags.stage2_wardens_contact && (G.stageProgress[2] || 0) >= 3;
    },
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.charm || 0);
      if (r.total >= 13) {
        G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        G.flags.wardens_broker_testimony = true;
        addNarration('', 'The broker sits with his back to the wall and both hands on the table. The Road Wardens\' vouching is what brought him here, not anything you said. He speaks in the precise, clipped register of someone who has rehearsed this. He handled three cargo movements under the axis exploitation operation. He did not know what the cargo was. He knew the routing was non-manifest and he knew who approved the non-manifest status — not a person\'s name, but a process designation. The same process designation appears on two other manifests he was pressured to countersign. He kept copies of all three. He hands them across the table without being asked.');
        addJournal('Coerced cargo broker provided testimony and copies of three non-manifest cargo approvals under axis exploitation operation. Process designation confirmed on multiple manifests.', 'evidence');
        G.recentOutcomeType = 'discovery';
      } else {
        addNarration('', 'The broker came because the Road Wardens vouched for the meeting, but he arrived already frightened. He sits down, starts to speak, then asks who else has been told about this meeting. When you answer honestly, his hands come off the table. He says he thought this would be a smaller circle. He is not leaving — yet. But the testimony he prepared is back behind his teeth, and getting it out will require rebuilding the trust the answer damaged.');
        addJournal('Broker arrived frightened — testimony withheld after disclosure question. Circle of knowledge wider than expected. Meeting not lost, but trust damaged.', 'complication');
        G.recentOutcomeType = 'complication';
      }
      if (typeof checkStageAdvance === 'function') checkStageAdvance();
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: {
      text: 'The broker is still at the table. The trust damage can be repaired — but it will require honesty about why the circle of knowledge is the size it is.'
    }
  },

  {
    id: 's2_wardens_7',
    label: 'The safe house holds records the archive destroyed.',
    xpReward: 20,
    skill: 'wits',
    tags: ['Evidence', 'Discovery'],
    plot: 'main',
    questId: 'q_s2_boss',
    condition: function() {
      return G.flags && G.flags.stage2_wardens_contact && (G.stageProgress[2] || 0) >= 4;
    },
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.wits || 0);
      if (r.total >= 12) {
        G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        addNarration('', 'The safe house is a storage room above a cooperage — barrels going in and out at irregular hours providing cover for everything else. The Road Wardens\' records are not organized by category. They are organized by the people who kept them: each bundle tied with cord in a different color, each color belonging to someone who passed through and left what they had. Three bundles contain duplicates of Collegium records marked for destruction. The destruction order carries a category stamp: "Procedural Alignment." The records themselves were not destroyed. They were copied first, by someone who knew the order was coming.');
        addJournal('Road Wardens safe house contains duplicated Collegium records marked for destruction under "Procedural Alignment" category. Pre-destruction copies confirm suppression was anticipated and prepared against.', 'evidence');
        G.recentOutcomeType = 'discovery';
      } else {
        addNarration('', 'The safe house holds more than you can review in one visit. The records are not indexed — they are stored by keeper, in bundles, by color of cord. You get through two bundles before the cooperage below gets busy enough that someone comes upstairs to check. You leave with what you found in the first bundle, which confirms the safe house is real and the records are genuine, but does not give you the specific documentation you need. A second visit will require a different entry time.');
        addJournal('Safe house records confirmed genuine — two bundles reviewed. Full documentation requires second visit at lower-traffic time.', 'intelligence');
        G.recentOutcomeType = 'complication';
      }
      if (typeof checkStageAdvance === 'function') checkStageAdvance();
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: {
      text: 'The safe house records are genuine. A second visit at a lower-traffic hour will reach the specific documentation — the cooperage schedule provides the window.'
    }
  },

  {
    id: 's2_wardens_8',
    label: 'Someone displaced by the suppression is still in Shelk.',
    xpReward: 20,
    skill: 'charm',
    tags: ['Social', 'Moral'],
    plot: 'main',
    questId: 'q_s2_boss',
    condition: function() {
      return G.flags && G.flags.stage2_wardens_contact && (G.stageProgress[2] || 0) >= 5;
    },
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.charm || 0);
      if (r.total >= 12) {
        G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        addNarration('', 'He is not hiding, exactly — he is living in a way that does not accumulate records. No registered address, no guild affiliation, work that pays in coin without ledger entries. He speaks slowly and in order, as if he has told this before and knows which parts matter: the axis exploitation operation removed the operational records of his trading post before the post was formally closed. The closure order came after the records were gone. He has been waiting in Shelk for fourteen months because the records that would prove his post was solvent are the same records that disappeared. He asks whether you have found them.');
        addJournal('Displaced trading post operator waiting in Shelk: records removed before post was formally closed. Operational records would prove solvency — same records in suppression batch.', 'intelligence');
        G.recentOutcomeType = 'discovery';
      } else {
        addNarration('', 'He is wary — not of you specifically but of anyone who asks about the suppression. He has been approached before, twice, by people who said they were pursuing the same thread and who he has not seen since. He asks which faction sent you. When you tell him, he is quiet for a moment. Then he says: the Road Wardens have their own reasons for wanting this exposed, and those reasons are not the same as his. He is not refusing. He wants to understand whose agenda he is serving before he speaks.');
        addJournal('Displaced operator cautious — previous inquirers did not return. Aware of Road Wardens\' separate agenda. Will speak when motivation is clarified.', 'complication');
        G.recentOutcomeType = 'complication';
      }
      if (typeof checkStageAdvance === 'function') checkStageAdvance();
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: {
      text: 'The displaced operator will speak — but he wants to understand whose interests he is serving. Clarifying the distinction between his goal and the Road Wardens\' will open him.'
    }
  },

  {
    id: 's2_wardens_9',
    label: 'The Road Wardens know who runs enforcement. They use a codename.',
    xpReward: 20,
    skill: 'finesse',
    tags: ['Intelligence', 'Stealth'],
    plot: 'main',
    questId: 'q_s2_boss',
    condition: function() {
      return G.flags && G.flags.stage2_wardens_contact && (G.stageProgress[2] || 0) >= 6;
    },
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.finesse || 0);
      if (r.total >= 14) {
        G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        addNarration('', 'The Road Wardens\' senior contact does not write the codename down. She says it once, in a low register, in the middle of a sentence about something else, the way you say a word you do not want anyone in the room to associate with the conversation: Gleam. That is the codename. She does not know if it is a person, a process, or an institutional structure. She knows it has been used in three separate enforcement actions in the past two years, always in connection with transit authority routing, and that no one who tried to identify what is behind it has stayed in a position to keep trying. She says that last part without apparent emotion.');
        addJournal('Road Wardens senior contact confirmed enforcement codename: Gleam. Linked to three separate enforcement actions via transit authority routing. No one who identified it has continued the inquiry — source stated this without elaboration.', 'intelligence');
        G.recentOutcomeType = 'discovery';
      } else {
        addNarration('', 'She almost says it. The word is halfway out before she stops, looks at the door, and finishes the sentence differently. The context gives the shape of it: a codename, one syllable, linked to enforcement actions that use transit authority infrastructure. She says she will tell you the rest when she is satisfied that you have a way out of this that does not go through any institution she knows. She is not being difficult. She has watched what happens to people who know the name without knowing what to do with it.');
        addJournal('Road Wardens senior contact: enforcement codename withheld pending confirmation of exit strategy. One syllable, transit authority linked.', 'complication');
        G.recentOutcomeType = 'complication';
      }
      if (typeof checkStageAdvance === 'function') checkStageAdvance();
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: {
      text: 'The source will share the codename when she has confidence in the exit strategy. The shape of the word is already visible in the context — one syllable, transit-linked.'
    }
  },

  {
    id: 's2_wardens_10',
    label: 'Black market manifests name the routing point. Not the authority behind it.',
    xpReward: 20,
    skill: 'wits',
    tags: ['Evidence', 'Intelligence'],
    plot: 'main',
    questId: 'q_s2_climax',
    condition: function() {
      return G.flags && G.flags.stage2_wardens_contact && G.flags.wardens_broker_testimony && (G.stageProgress[2] || 0) >= 7;
    },
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.wits || 0);
      if (r.total >= 14) {
        G.stageProgress[2] = (G.stageProgress[2] || 0) + 2;
        addNarration('', 'The black market manifests the broker provided contain a routing point that appears in every non-manifest movement: the Soreheim Transit Post. Not the district, not the corridor — the specific post, which is a small waystation operated by a single supervisor whose name appears on the transit stamps used to authorize the suppression mandates. The supervisor\'s name is Torveld Mast. He countersigned the non-manifest movements and he stamped the suppression authorizations, and neither action was technically outside his authority. The mandate structure was built around what he could legally do.');
        addJournal('Black market manifests confirm routing point: Soreheim Transit Post. Supervisor Torveld Mast countersigned non-manifest cargo and stamped suppression authorizations — both within his technical authority. Transit stamp mechanism built around his legal scope.', 'evidence');
        G.recentOutcomeType = 'discovery';
      } else {
        addNarration('', 'The manifests name a transit post but not a person — the stamps on them are position stamps, not personal seals. The routing post supervisor changes on a scheduled rotation, and the manifests span eighteen months. The same stamp appears across the full period, which means either one supervisor held the position for the entire period or the stamps were applied by someone with access to the position stamp rather than by the supervisor personally. Both possibilities are worth noting. The broker confirms the second possibility exists but says he does not know which it was.');
        addJournal('Black market manifests identify transit post routing point — position stamps, not personal seals. Eighteen-month span with single stamp type: supervisor held position or stamps used without personal authorization.', 'intelligence');
        G.recentOutcomeType = 'complication';
      }
      if (typeof checkStageAdvance === 'function') checkStageAdvance();
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: {
      text: 'The routing point is confirmed. The question of personal versus positional authorization requires access to the transit post personnel record — that is the next step.'
    }
  },

  {
    id: 's2_wardens_11',
    label: 'The Road Wardens can create a distraction when the confrontation comes.',
    xpReward: 20,
    skill: 'finesse',
    tags: ['Alliance', 'Stealth'],
    plot: 'main',
    questId: 'q_s2_climax',
    condition: function() {
      return G.flags && G.flags.stage2_wardens_contact && (G.stageProgress[2] || 0) >= 8;
    },
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.finesse || 0);
      if (r.total >= 14) {
        G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        G.flags.wardens_distraction_arranged = true;
        addNarration('', 'The Road Wardens\' price is operational: they want the confrontation documentation shared with them before any Collegium filing, not after. They want to move first, before the institutional layer can respond. The distraction they are offering is real — a simultaneous disruption at the secondary checkpoint that will pull the enforcement presence away from the primary site for approximately twenty minutes. They have done this before. The twenty minutes is a hard window and they will not extend it. You agree to the sequence. The senior contact notes the agreement without writing it down.');
        addJournal('Road Wardens agreed to provide twenty-minute enforcement distraction in exchange for pre-filing documentation access. Timing is fixed — window will not extend.', 'intelligence');
        G.recentOutcomeType = 'discovery';
      } else {
        addNarration('', 'The senior contact is interested but not committed. The distraction requires coordinating two separate Road Wardens cells, and the cells are not currently in contact with each other. She can arrange it, but it will take four days and she needs a specific commitment on the documentation sequence before she begins the coordination. She is not asking for much. She is asking for something that commits you to a sequence you have not yet agreed to. The four-day window is real.');
        addJournal('Road Wardens distraction possible but requires four-day coordination and pre-commitment on documentation sequence. Window is real — decision required.', 'complication');
        G.recentOutcomeType = 'complication';
      }
      if (typeof checkStageAdvance === 'function') checkStageAdvance();
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: {
      text: 'The Road Wardens need four days and a sequence commitment. The distraction window is real once the coordination is complete — the decision needs to be made now.'
    }
  },

  {
    id: 's2_wardens_12',
    label: 'The final Road Wardens source has the enforcement action itself documented.',
    xpReward: 20,
    skill: 'wits',
    tags: ['Evidence', 'Discovery'],
    plot: 'main',
    questId: 'q_s2_climax',
    condition: function() {
      return G.flags && G.flags.stage2_wardens_contact && (G.stageProgress[2] || 0) >= 9;
    },
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.wits || 0);
      if (r.total >= 14) {
        G.stageProgress[2] = (G.stageProgress[2] || 0) + 2;
        G.flags.gleam_mechanism_identified = true;
        addNarration('', 'The source is a former transit authority record keeper who has been carrying this documentation for eleven months, waiting for someone with enough context to understand what it means. The document she produces is an enforcement action order — the primary document, not a copy. At the top: "Enforcement mechanism: GLEAM. Authorization: Ironveil ORE Marshal transit certification." GLEAM is the mechanism\'s name. The enforcement action is what the axis exploitation suppression actually was: a coordinated erasure authorized through ORE Marshal certification, routed through Gleam, and processed by the transit stamp mechanism at Soreheim. The name Ironveil is in the authorization line. Not as a signatory. As the office that issued the certification that allowed the mechanism to function.');
        addJournal('Former transit record keeper provided primary enforcement action order: mechanism named GLEAM, authorization via Ironveil ORE Marshal transit certification. Gleam is the mechanism; Ironveil provided the institutional authorization that made it operational.', 'evidence');
        G.recentOutcomeType = 'discovery';
      } else {
        addNarration('', 'The source arrived but not with the document. She says the document is in a secure location and she will not bring it to a meeting she cannot verify. She needs to see the network that will protect her after she produces it — not a promise, but evidence of the network\'s existence. The Road Wardens can provide that evidence. She knows who to ask. She gives you the name of the Road Wardens contact to send. She will meet again once she has spoken to that contact directly.');
        addJournal('Final source present but document held pending network verification. Road Wardens contact name provided — source will re-engage after verification meeting.', 'complication');
        G.recentOutcomeType = 'complication';
      }
      if (typeof checkStageAdvance === 'function') checkStageAdvance();
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: {
      text: 'The source needs to verify the protection network before she produces the document. The Road Wardens informant she named is the next step — she will re-engage after that meeting.'
    }
  },

  // ========== ARCHETYPE VARIANTS: COLLEGIUM PATH (4 families) ==========

  {
    id: 's2_collegium_arch_combat',
    label: 'Collegium security here is surveillance architecture, not witness protection.',
    xpReward: 20,
    skill: 'might',
    archetypeGroup: 'combat',
    tags: ['Combat', 'Intelligence'],
    plot: 'main',
    condition: function() {
      return G.flags && G.flags.stage2_collegium_contact && typeof getArchetypeFamily === 'function' && getArchetypeFamily(G.archetype) === 'combat';
    },
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.might || 0);
      if (r.total >= 13) {
        G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        addNarration('', 'The Collegium entrance posts are staffed by people trained to watch, not to stop. The sight lines are positioned to log arrivals, not to intercept threats — every blind spot is in the direction that would matter for protecting a witness, not in the direction that would matter for tracking a visitor. Someone designed this building to know who enters and with whom, not to protect the people inside from the people outside. The security arrangement is not for the Collegium\'s protection. It is for documentation.');
        addJournal('Collegium security arrangement analyzed: sight lines designed for arrival logging, not witness protection. Building architecture functions as surveillance documentation, not defensive posture.', 'intelligence');
        G.recentOutcomeType = 'discovery';
      } else {
        addNarration('', 'The entrance staff are more alert than the sight lines suggest. One of them notes you assessing the post arrangement and steps slightly to the side in a way that changes the coverage angle. They have seen people do this before. Your read on the security architecture is still accurate, but someone in this building is more aware of being evaluated than the passive surveillance design would imply.');
        addJournal('Collegium security assessment noted by entrance staff — arrangement is surveillance-focused, but staff awareness is higher than architecture implies.', 'intelligence');
        G.recentOutcomeType = 'complication';
      }
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: {
      text: 'The entrance staff noted the assessment. The surveillance architecture is still legible — but with more caution on the next visit.'
    }
  },

  {
    id: 's2_collegium_arch_magic',
    label: 'The ward scan shows institutional certification before the suppression, not after.',
    xpReward: 20,
    skill: 'spirit',
    archetypeGroup: 'magic',
    tags: ['Magic', 'Evidence'],
    plot: 'main',
    condition: function() {
      return G.flags && G.flags.stage2_collegium_contact && typeof getArchetypeFamily === 'function' && getArchetypeFamily(G.archetype) === 'magic';
    },
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.spirit || 0);
      if (r.total >= 13) {
        G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        addNarration('', 'The ward layer on the Collegium documents is institutional certification — not protection against tampering, but attestation that the document was processed through the proper channel. The ward signatures predate the suppression orders by two to four weeks on every document you can reach. The certification was applied before the suppression was processed. Whoever authorized the suppression used the certification infrastructure as the mechanism, not as a consequence of the process. The wards are the authorization, not the record of it.');
        addJournal('Ward scan confirms institutional certification predates suppression orders by 2-4 weeks. Certification infrastructure used as authorization mechanism, not as post-process record.', 'evidence');
        G.recentOutcomeType = 'discovery';
      } else {
        addNarration('', 'The ward layer is present but layered — multiple certifications, different ages, some applied in sequence over the same document. The oldest certification layer is the authorizing one, but reading the sequence requires a longer attunement than the reading room permits. The ward pattern holds; reading it fully will require a less supervised environment and more time than is available now.');
        addJournal('Ward scan incomplete — multiple certification layers require extended attunement. Oldest layer is the authorizing one. More time in unsupervised access needed.', 'intelligence');
        G.recentOutcomeType = 'complication';
      }
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: {
      text: 'The ward certification sequence needs extended attunement. The layering pattern holds — unsupervised access will complete the reading.'
    }
  },

  {
    id: 's2_collegium_arch_stealth',
    label: 'Irregular gaps in the Collegium meeting schedule. Something happens in those gaps.',
    xpReward: 20,
    skill: 'finesse',
    archetypeGroup: 'stealth',
    tags: ['Stealth', 'Discovery'],
    plot: 'main',
    condition: function() {
      return G.flags && G.flags.stage2_collegium_contact && typeof getArchetypeFamily === 'function' && getArchetypeFamily(G.archetype) === 'stealth';
    },
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.finesse || 0);
      if (r.total >= 13) {
        G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        addNarration('', 'The Collegium\'s posted meeting schedule has four gaps in the past eight weeks — each exactly ninety minutes, each on a day when the reading room supervisor is listed as absent. The gaps fall at irregular intervals, which means they are not a routine maintenance window. You track the next gap two days in advance and watch the building from the secondary entry point. Three people enter during the ninety minutes who are not on any publicly posted access list. One of them carries a sealed document case with a transit authority stamp on the latch.');
        addJournal('Collegium meeting schedule contains four irregular ninety-minute gaps matching reading room supervisor absences. Three unregistered visitors during observed gap — one carrying transit-authority-stamped document case.', 'evidence');
        G.recentOutcomeType = 'discovery';
      } else {
        addNarration('', 'The schedule gaps are real but the next one falls during a district inspection period, which means the secondary entry point has additional foot traffic and a posted observer. Watching without being part of the crowd is harder than usual. You see two people enter during the gap but cannot track them to a specific destination inside the building. The pattern is confirmed; the specific content of the meetings inside those gaps is still unobserved.');
        addJournal('Collegium schedule gaps confirmed — observation of specific gap content blocked by district inspection foot traffic. Pattern real, meetings unobserved.', 'intelligence');
        G.recentOutcomeType = 'complication';
      }
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: {
      text: 'District inspection traffic obscured the gap observation. The pattern is confirmed — the next gap outside inspection period will provide cleaner access to the visitor list.'
    }
  },

  {
    id: 's2_collegium_arch_support',
    label: 'Collegium members who asked too many questions faced internal social pressure.',
    xpReward: 20,
    skill: 'charm',
    archetypeGroup: 'support',
    tags: ['Social', 'Intelligence'],
    plot: 'main',
    condition: function() {
      return G.flags && G.flags.stage2_collegium_contact && typeof getArchetypeFamily === 'function' && getArchetypeFamily(G.archetype) === 'support';
    },
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.charm || 0);
      if (r.total >= 12) {
        G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        addNarration('', 'The pattern is consistent across four separate accounts: a member asks a procedural question about the suppression batches, the question is answered without incident, and then — over the following two weeks — small things change. Reading room appointments become harder to schedule. Collaboration requests go unanswered. Social invitations stop arriving. Nobody does anything hostile or explicit. The social infrastructure of the Collegium simply redirects around the person who asked. It is not punishment. It is something more effective than punishment: exclusion without accusation.');
        addJournal('Four accounts confirm same post-question pattern: no explicit retaliation, but systematic social exclusion over two weeks. Collegium suppression enforced through social infrastructure, not administrative action.', 'intelligence');
        G.recentOutcomeType = 'discovery';
      } else {
        addNarration('', 'People will describe the social pattern but not attach names to it. They are still inside the institution and they know how the exclusion works. What they give you is the texture — the specific small ways the social infrastructure redirects — without the specific cases that would make it documentable. The pattern is real and consistent. Making it documentable requires someone willing to be named, and none of the people who understand it best are willing to be the named case.');
        addJournal('Social exclusion pattern confirmed by multiple accounts but undocumentable — no one willing to be named case. Texture of mechanism is clear; specific evidence requires willing named source.', 'intelligence');
        G.recentOutcomeType = 'complication';
      }
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: {
      text: 'The social exclusion pattern is real but undocumentable without a named source. The next step is finding someone willing to be named — they exist inside the institution.'
    }
  },

  // ========== ARCHETYPE VARIANTS: ROAD WARDENS PATH (4 families) ==========

  {
    id: 's2_wardens_arch_combat',
    label: 'Road Wardens counter-surveillance reveals who watches the watchers.',
    xpReward: 20,
    skill: 'might',
    archetypeGroup: 'combat',
    tags: ['Combat', 'Intelligence'],
    plot: 'main',
    condition: function() {
      return G.flags && G.flags.stage2_wardens_contact && typeof getArchetypeFamily === 'function' && getArchetypeFamily(G.archetype) === 'combat';
    },
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.might || 0);
      if (r.total >= 13) {
        G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        addNarration('', 'The Road Wardens use a rotating three-person counter-surveillance formation — one ahead, one behind, one stationary at a fixed point with sightlines to both. You run it with them twice before you understand what it is revealing: the people watching the Road Wardens are not uniformed enforcement. They are moving in pairs, in civilian clothing, using the same checkpoint patterns the non-manifest cargo used on the routes. Whoever is monitoring the Road Wardens is embedded in the same transit infrastructure the suppression relied on. They are not separate operations. They are the same operation watching itself being watched.');
        addJournal('Road Wardens counter-surveillance pattern reveals monitors using non-manifest cargo checkpoint methods. Enforcement monitoring and cargo suppression operations use same transit infrastructure — one operation, not two.', 'intelligence');
        G.recentOutcomeType = 'discovery';
      } else {
        addNarration('', 'The counter-surveillance formation requires three people in a pattern you are not practiced in. You break the formation at the wrong moment and the third member of the pair you were tracking notices the repositioning. They do not pursue, but they mark your face. The Road Wardens abort the rotation and move to a secondary position. You identified two of the three monitoring individuals before the formation broke. Two names, partial descriptions, and a broken cover.');
        addJournal('Counter-surveillance formation broken — monitoring individual marked cover. Two of three identifications made before abort. Road Wardens moved to secondary position.', 'complication');
        G.recentOutcomeType = 'complication';
      }
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: {
      text: 'Formation broken and one cover marked. Two of three identifications completed — the third member of the monitoring team will require a different approach to identify.'
    }
  },

  {
    id: 's2_wardens_arch_magic',
    label: 'Arcane traces confirm documents were certified before their destruction.',
    xpReward: 20,
    skill: 'spirit',
    archetypeGroup: 'magic',
    tags: ['Magic', 'Evidence'],
    plot: 'main',
    condition: function() {
      return G.flags && G.flags.stage2_wardens_contact && typeof getArchetypeFamily === 'function' && getArchetypeFamily(G.archetype) === 'magic';
    },
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.spirit || 0);
      if (r.total >= 13) {
        G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        addNarration('', 'The destroyed documents left residual arcane traces on the cases that held them — certification ward impressions that persist after the documents themselves are gone. The impressions are faint but readable: institutional certification, applied in sequence, predating the destruction order by two to three weeks. The documents were verified as legitimate through the proper certification channel before the destruction order was issued. Whoever ordered the destruction knew the documents were authentic — the certification confirms it. They were not destroyed because they were false. They were destroyed because they were true.');
        addJournal('Arcane certification traces on destroyed document cases confirm: documents were institutionally certified before destruction order. Destroyed because authentic, not because false — certification predates destruction by 2-3 weeks.', 'evidence');
        G.recentOutcomeType = 'discovery';
      } else {
        addNarration('', 'The arcane traces are present but degraded — the cases were cleaned after the documents were removed, and the cleaning compounds used in transit post storage partially disrupt ward impression residue. You can confirm that certification traces existed. You cannot read the certification sequence or determine the timing relationship between certification and destruction. The traces confirm the documents were certified. The sequence and timing require cleaner residue, which may exist on cases that were not cleaned.');
        addJournal('Arcane traces confirm document certification — sequence and timing unreadable due to case cleaning. Uncleaned cases may carry cleaner residue. Certification existence confirmed.', 'intelligence');
        G.recentOutcomeType = 'complication';
      }
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: {
      text: 'Residue degraded by cleaning compounds. Certification existence confirmed — uncleaned cases at the storage origin point may carry the readable sequence.'
    }
  },

  {
    id: 's2_wardens_arch_stealth',
    label: 'The Wardens\' route network maps the same gaps the suppression relied on.',
    xpReward: 20,
    skill: 'finesse',
    archetypeGroup: 'stealth',
    tags: ['Stealth', 'Discovery'],
    plot: 'main',
    condition: function() {
      return G.flags && G.flags.stage2_wardens_contact && typeof getArchetypeFamily === 'function' && getArchetypeFamily(G.archetype) === 'stealth';
    },
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.finesse || 0);
      if (r.total >= 13) {
        G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        addNarration('', 'The three unmapped routes the Road Wardens\' runner maintains pass through monitoring gaps in the transit checkpoint network — specific intersections where the checkpoint coverage does not overlap, where a movement can occur between the checkpoint timing cycles without being logged. Laying the Road Wardens\' route map against the non-manifest cargo movements reveals the same gaps, used in sequence, over the same eighteen-month window. The Road Wardens did not design the routes to exploit those gaps. They discovered the gaps because someone else was already using them. The route network and the suppression operation share the same geography of absence.');
        addJournal('Road Wardens route network overlaps precisely with non-manifest cargo movement paths across same 18-month window. Both use same checkpoint coverage gaps — Road Wardens discovered gaps because suppression operation created them.', 'evidence');
        G.recentOutcomeType = 'discovery';
      } else {
        addNarration('', 'The overlay requires the full set of three routes, and the runner has only shared two. The third route — the one she will only walk, not describe — is the critical one. The first two routes confirm the gap pattern exists. The third route is where the pattern resolves into a specific location. She knows you need it. She is deciding whether the time is right to show it to you.');
        addJournal('Route overlay incomplete — third route needed for full gap pattern resolution. Runner aware of need. Timing decision is hers.', 'intelligence');
        G.recentOutcomeType = 'complication';
      }
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: {
      text: 'Third route still needed. The runner is deciding — the gap pattern is already visible in the first two, and she knows what the third one resolves to.'
    }
  },

  {
    id: 's2_wardens_arch_support',
    label: 'The Road Wardens\' network traces who was silenced, who fled, who stayed quiet.',
    xpReward: 20,
    skill: 'charm',
    archetypeGroup: 'support',
    tags: ['Social', 'Moral'],
    plot: 'main',
    condition: function() {
      return G.flags && G.flags.stage2_wardens_contact && typeof getArchetypeFamily === 'function' && getArchetypeFamily(G.archetype) === 'support';
    },
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.charm || 0);
      if (r.total >= 12) {
        G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        addNarration('', 'The Road Wardens maintain a list — not written, but kept — of the people who should have filed reports and didn\'t, the people whose credentials were pulled without stated cause, the people who changed routes or localities or occupations in the fourteen-month window of the axis exploitation operation. Eleven names across four polities. The senior contact recites them without referring to anything. Seven fled to different districts. Three stayed and went quiet. One filed a formal objection through the Collegium and was not heard from again. The list is not evidence. It is the shape of what happened to people who noticed.');
        addJournal('Road Wardens maintain oral record of 11 individuals displaced or silenced in 14-month axis exploitation window across 4 polities. Pattern: 7 fled, 3 silenced in place, 1 filed Collegium objection and disappeared.', 'intelligence');
        G.recentOutcomeType = 'discovery';
      } else {
        addNarration('', 'The senior contact begins the list and stops at the third name. That person is someone she knows personally, and she is not certain the context is safe enough to share that connection. She gives you the first two names and says she will continue when she has verified the meeting room against the counter-surveillance pattern. She is not being obstructive. She is being careful in a way that the people on the list were not, which is why she is still here to recite their names.');
        addJournal('Human cost list partially shared — two of eleven names before stop. Third name too personal for current context. Counter-surveillance verification needed before list continues.', 'intelligence');
        G.recentOutcomeType = 'complication';
      }
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: {
      text: 'List paused at third name. Counter-surveillance verification will allow the senior source to continue — she is protecting the third name, not withholding it.'
    }
  },

  // ========== DEAD-ENDS AND RECOVERY PAIRS ==========

  {
    id: 's2_collegium_deadend_1',
    label: 'The Collegium archivist has the suppressed records. Apply pressure directly.',
    skill: 'charm',
    tags: ['Social', 'Bold'],
    plot: 'main',
    condition: function() {
      return G.flags && G.flags.stage2_collegium_contact && !G.flags.collegium_archivist_burned;
    },
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      if (!G.flags) G.flags = {};
      G.flags.collegium_archivist_burned = true;
      G.flags.recovery_thread_available = true;
      addNarration('', 'The archivist closes the ledger and calls for a colleague. The archive closes for the day. You will not get another appointment through normal channels — but the junior archive clerk works evenings, and the archivist does not know her.');
      addJournal('Collegium archivist: direct approach failed. Archive closed. Evening junior clerk access may remain open.', 'complication');
      G.recentOutcomeType = 'complication';
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    }
  },

  {
    id: 's2_collegium_deadend_1_recovery',
    label: 'The junior archive clerk works evenings. The archivist does not know her.',
    xpReward: 20,
    skill: 'finesse',
    tags: ['Stealth', 'Opportunity'],
    plot: 'main',
    questId: 'q_s2_boss',
    condition: function() {
      return G.flags && G.flags.collegium_archivist_burned && !G.flags.collegium_archive_recovery_done;
    },
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.finesse || 0);
      if (r.total >= 13) {
        G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        G.flags.collegium_archive_recovery_done = true;
        addNarration('', 'The junior clerk does not know about the earlier visit. She shows you to the suppressed records section with the practiced indifference of someone who assumes all requests are legitimate. The records are where the archivist said they were not. The junior clerk does not comment on this. She returns to her station. The section is quiet and the lamp is good. You have approximately forty minutes before the evening rotation changes.');
        addJournal('Collegium archive: junior clerk evening access — suppressed records section reached. Forty-minute window before rotation change.', 'evidence');
        G.recentOutcomeType = 'discovery';
      } else {
        addNarration('', 'The junior clerk is not on the evening rotation tonight. The archive is closed and the main desk is staffed by the duty archivist who already closed your appointment. She works the same shift three evenings a week — tomorrow is one of them.');
        addJournal('Junior clerk evening access: clerk absent. She works three evenings per week — tomorrow is one of them.', 'complication');
        G.recentOutcomeType = 'complication';
      }
      if (typeof checkStageAdvance === 'function') checkStageAdvance();
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: {
      text: 'The junior clerk is not on this evening\'s rotation. She works three evenings per week — tomorrow evening is one of them. The archive stays accessible after hours on those rotation nights.'
    }
  },

  {
    id: 's2_collegium_deadend_2',
    label: 'The Collegium source will trust a name they know. The Road Wardens\' name.',
    skill: 'charm',
    tags: ['Social', 'Risk'],
    plot: 'main',
    condition: function() {
      return G.flags && G.flags.stage2_collegium_contact && G.flags.stage2_wardens_contact && !G.flags.collegium_wardens_exposed;
    },
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      if (!G.flags) G.flags = {};
      G.flags.collegium_wardens_exposed = true;
      G.flags.collegium_alt_source_needed = true;
      addNarration('', 'The Collegium source goes very still when you mention the Road Wardens. She says she needs a moment, then asks how long you have been working with them. Her expression does not change, but she closes the document she had been preparing to show you and puts it back in her coat. She says she will need to reconsider the arrangement. She leaves. The Road Wardens\' name in a Collegium context closed this thread. A different source — one without the Collegium-Wardens tension — may still be reachable.');
      addJournal('Collegium source withdrew after Road Wardens affiliation disclosed. Institutional tension closed this channel. Alternative source without Collegium-Wardens exposure needed.', 'complication');
      G.recentOutcomeType = 'complication';
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    }
  },

  {
    id: 's2_collegium_deadend_2_recovery',
    label: 'A different Collegium source. One who doesn\'t know about the Road Wardens connection.',
    xpReward: 20,
    skill: 'wits',
    tags: ['Social', 'Intelligence'],
    plot: 'main',
    questId: 'q_s2_boss',
    condition: function() {
      return G.flags && G.flags.collegium_wardens_exposed && G.flags.collegium_alt_source_needed && !G.flags.collegium_alt_source_found;
    },
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.wits || 0);
      if (r.total >= 13) {
        G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        G.flags.collegium_alt_source_found = true;
        addNarration('', 'The Collegium has a research tier that is separate from the administrative tier — researchers who use the archive but are not part of the suppression processing chain. One of them has been following the same routing anomalies for academic reasons and has no knowledge of the Road Wardens\' involvement. He is cautious but not frightened. He speaks about the suppression records with the particular precision of someone who is categorizing a pattern without yet understanding its full implication. He is three steps behind where the evidence actually sits. You can move that along carefully without disclosing the source.');
        addJournal('Alternative Collegium source found in research tier — independent of administrative suppression chain and unaware of Road Wardens connection. Three steps behind but usable.', 'intelligence');
        G.recentOutcomeType = 'discovery';
      } else {
        addNarration('', 'The research tier operates on a different schedule and the researchers are not easy to approach without a research-appropriate pretext. The Collegium is not large enough for the previous interaction to have gone unnoticed in the research community — word moves through small institutions. You find two researchers who might be useful but both of them mention having heard something about a recent archive disruption. The alternative source exists. Getting to them requires a cleaner approach.');
        addJournal('Alternative Collegium research source not yet reached — archive disruption noted in research community. Cleaner pretext needed for research-tier access.', 'complication');
        G.recentOutcomeType = 'complication';
      }
      if (typeof checkStageAdvance === 'function') checkStageAdvance();
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: {
      text: 'The research community heard about the archive disruption. A research-appropriate pretext will open the research tier without the previous complication carrying over.'
    }
  },

  {
    id: 's2_wardens_deadend_1',
    label: 'The cargo broker offered less than he has. Press for more.',
    skill: 'charm',
    tags: ['Social', 'Bold'],
    plot: 'main',
    condition: function() {
      return G.flags && G.flags.wardens_broker_testimony && !G.flags.wardens_broker_burned;
    },
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      if (!G.flags) G.flags = {};
      G.flags.wardens_broker_burned = true;
      G.flags.wardens_broker_partner_lead = true;
      addNarration('', 'The broker\'s testimony stops completely. He picks up his cup, looks at it, and sets it back down. He says he told you what he could tell you and you asked for what he cannot tell you. He leaves. He will not come back to another meeting arranged through the Road Wardens. His former business partner handled a different set of the non-manifest movements and they have not spoken in eight months. She may still be reachable through a different channel.');
      addJournal('Cargo broker burned — pushed past voluntary testimony threshold. Partner handled parallel non-manifest movements and may be reachable independently.', 'complication');
      G.recentOutcomeType = 'complication';
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    }
  },

  {
    id: 's2_wardens_deadend_1_recovery',
    label: 'The broker\'s former partner worked a different part of the same operation.',
    xpReward: 20,
    skill: 'charm',
    tags: ['Social', 'Intelligence'],
    plot: 'main',
    questId: 'q_s2_boss',
    condition: function() {
      return G.flags && G.flags.wardens_broker_burned && G.flags.wardens_broker_partner_lead && !G.flags.wardens_partner_met;
    },
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.charm || 0);
      if (r.total >= 12) {
        G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        G.flags.wardens_partner_met = true;
        addNarration('', 'The partner was not coerced in the same way the broker was — she chose the non-manifest work, understood the risk, and stopped when the enforcement pressure started. She is not frightened. She is precise. She handled the return cargo movements — the ones after the axis exploitation operation closed the route, when the same transit infrastructure was used to move something in the opposite direction. She does not know what was moved. She knows the weight categories and the manifest classifications. She hands you the classifications without being asked. They match nothing in any public cargo register.');
        addJournal('Broker\'s former partner provided return-movement cargo data: same transit infrastructure, post-operation, opposite direction. Weight categories and manifest classifications do not match public cargo register.', 'evidence');
        G.recentOutcomeType = 'discovery';
      } else {
        addNarration('', 'The partner is harder to find than expected — she relocated after the enforcement pressure started and her current address is not in any register the Road Wardens have access to. You find the previous address and someone there tells you she moved three months ago to a different district. The trail is real and she is findable, but it will take another day or two to locate the current address through secondary channels.');
        addJournal('Broker\'s partner relocated — previous address has lead to new district. Trail confirmed real but requires 1-2 days secondary channel search.', 'complication');
        G.recentOutcomeType = 'complication';
      }
      if (typeof checkStageAdvance === 'function') checkStageAdvance();
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: {
      text: 'Partner relocated to a different district. Secondary channel search will locate the current address within a day or two — the trail is confirmed real.'
    }
  },

  {
    id: 's2_wardens_deadend_2',
    label: 'The fastest runner is also the most watched. That is the problem.',
    skill: 'finesse',
    tags: ['Stealth', 'Risk'],
    plot: 'main',
    condition: function() {
      return G.flags && G.flags.wardens_route_known && !G.flags.wardens_route_compromised;
    },
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      if (!G.flags) G.flags = {};
      G.flags.wardens_route_compromised = true;
      G.flags.wardens_backup_courier_needed = true;
      addNarration('', 'The message is intercepted at the secondary checkpoint. The fastest runner uses the most efficient route — which is also the most watched. The Road Wardens\' senior contact says the runner was held for questioning and released without the message, which means someone has read it. The content of the message was operational, not evidential, but whoever intercepted it now has the shape of the current network. A backup courier with a different route is available. She is slower and less known. Those are not separate advantages.');
      addJournal('Message intercepted — fastest runner\'s primary route monitored. Network shape exposed. Backup courier available: slower, less known, different route.', 'complication');
      G.recentOutcomeType = 'complication';
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    }
  },

  {
    id: 's2_wardens_deadend_2_recovery',
    label: 'The backup courier. Slower, less known, different route entirely.',
    xpReward: 20,
    skill: 'finesse',
    tags: ['Stealth', 'Opportunity'],
    plot: 'main',
    questId: 'q_s2_boss',
    condition: function() {
      return G.flags && G.flags.wardens_route_compromised && G.flags.wardens_backup_courier_needed && !G.flags.wardens_backup_courier_active;
    },
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.finesse || 0);
      if (r.total >= 12) {
        G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        G.flags.wardens_backup_courier_active = true;
        addNarration('', 'The backup courier takes twice as long and charges half as much. He moves through dock districts using cargo manifests as cover — he works a legitimate cargo job during the day and the secondary route is the same physical path, just slower and during off-hours. The message arrives. Three days later than planned, but uncompromised. The slower route and the dock-manifest cover make interception impractical for a surveillance operation that is looking for speed and directness. Neither of those are what he offers.');
        addJournal('Backup courier route confirmed operational — dock-manifest cover renders interception impractical. Message delivered uncompromised, three-day delay.', 'intelligence');
        G.recentOutcomeType = 'discovery';
      } else {
        addNarration('', 'The backup courier is available but the message needs reformatting — the intercepted runner used a coded format the backup does not recognize, and the backup courier only carries plaintext to avoid having coded materials found on his person during routine dock checks. Reformatting the message in plaintext requires stripping operational detail that makes it actionable. The message can still be sent. It will be less specific than the original.');
        addJournal('Backup courier available but requires plaintext format — coded message must be stripped of operational detail. Delivery possible with reduced specificity.', 'complication');
        G.recentOutcomeType = 'complication';
      }
      if (typeof checkStageAdvance === 'function') checkStageAdvance();
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: {
      text: 'Backup courier requires plaintext format. Reformatting strips operational detail but the message can still be delivered — reduced specificity is better than interception.'
    }
  },

  // ========== NAMED NPC CONDITIONAL VARIANTS ==========

  {
    id: 's2_enforcement_mechanism_variant',
    label: 'The enforcement mechanism runs on transit infrastructure nobody questioned.',
    xpReward: 20,
    skill: 'wits',
    tags: ['Evidence', 'Intelligence'],
    plot: 'main',
    questId: 'q_s2_boss',
    condition: function() {
      return G.flags && G.flags.stage2_collegium_contact && (G.stageProgress[2] || 0) >= 3 && !G.flags.enforcement_mechanism_surfaced;
    },
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.wits || 0);
      if (r.total >= 12) {
        G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        G.flags.enforcement_mechanism_surfaced = true;
        var _resultText = (G.flags && G.flags.gleam_mechanism_identified)
          ? 'The enforcement mechanism — Gleam — operates as an overlay on the transit authority\'s existing certification infrastructure. It does not require separate authorization for each suppression action because the transit certification channel was never designed to log what it was certifying. The mechanism functions because a gap in the logging protocol was never closed. Someone identified the gap and built the enforcement architecture around it deliberately. The transit infrastructure was not compromised — it was used exactly as designed, for a purpose its designers did not anticipate.'
          : 'The enforcement mechanism operates as an overlay on the transit authority\'s existing certification infrastructure. It does not require separate authorization for each suppression action because the transit certification channel was never designed to log what it was certifying. The mechanism functions because a gap in the logging protocol was never closed. Someone identified the gap and built an enforcement architecture around it deliberately. The transit infrastructure was not compromised — it was used exactly as designed, for a purpose its designers did not anticipate.';
        addNarration('', _resultText);
        addJournal('Enforcement mechanism confirmed: transit certification logging gap exploited deliberately. Architecture built around the gap, not around any individual authorization.', 'evidence');
        G.recentOutcomeType = 'discovery';
      } else {
        addNarration('', 'The transit certification logs are voluminous and organized by movement type, not by authorization source. Cross-referencing the suppression batches against the certification logs requires a category key that is not publicly available. The mechanism is visible as a pattern in the data — the same authorization channel appearing across suppression batches from different jurisdictions — but the procedural basis for that channel is in a separate filing system that requires an endorsement to access.');
        addJournal('Transit certification cross-reference blocked — category key not publicly available. Mechanism visible as pattern but procedural basis in restricted filing system.', 'intelligence');
        G.recentOutcomeType = 'complication';
      }
      if (typeof checkStageAdvance === 'function') checkStageAdvance();
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: {
      text: 'The category key is restricted. The pattern is visible without it — the procedural basis just needs an endorsement to access directly.'
    }
  },

  {
    id: 's2_transit_stamp_variant',
    label: 'The transit stamp series traces to a specific routing post.',
    xpReward: 20,
    skill: 'wits',
    tags: ['Evidence', 'Intelligence'],
    plot: 'main',
    questId: 'q_s2_climax',
    condition: function() {
      return G.flags && G.flags.stage2_collegium_contact && (G.stageProgress[2] || 0) >= 7 && !G.flags.transit_stamp_traced;
    },
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.wits || 0);
      if (r.total >= 13) {
        G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        G.flags.transit_stamp_traced = true;
        var _questActive = G.questHints && G.questHints['q_s2_climax'];
        var _resultText = _questActive
          ? 'The stamp series on the suppression authorizations traces to the Soreheim Transit Post — a waystation authorized to certify cargo movements under the transit charter. The post supervisor holds a rotating position, but the stamp series is continuous across eighteen months, which means the same supervisor held the position for the full period of the axis exploitation operation. The Soreheim Transit Post is the structural mechanism. Whoever holds the supervisor position holds the stamp. The accountability sits with the position, and right now a specific person holds it.'
          : 'The stamp series on the suppression authorizations traces to a Soreheim-registered transit post — a waystation authorized to certify cargo movements under the transit charter. The post supervisor holds a rotating position, but the stamp series is continuous across eighteen months, which means the same supervisor held the position for the full period of the axis exploitation operation. The Soreheim post is the structural mechanism. Whoever holds the supervisor position holds the stamp.';
        addNarration('', _resultText);
        addJournal('Transit stamp series traced to Soreheim Transit Post. Continuous stamp across 18-month operation period — same supervisor held position throughout. Accountability sits with the supervisorial position.', 'evidence');
        G.recentOutcomeType = 'discovery';
      } else {
        addNarration('', 'The stamp series is registered in the transit authority charter annex, which is a publicly accessible document but filed by year of charter amendment rather than by stamp series. Cross-referencing the stamp numbers against the correct charter year requires knowing which amendment introduced the stamp series, which is itself in a sub-index that has not been updated since two years before the axis exploitation operation began. The trail is followable. It requires more time than one archive visit.');
        addJournal('Transit stamp charter cross-reference requires multi-step archive navigation. Trail followable but requires more than one visit.', 'intelligence');
        G.recentOutcomeType = 'complication';
      }
      if (typeof checkStageAdvance === 'function') checkStageAdvance();
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: {
      text: 'The charter cross-reference requires multiple visits. The stamp registration is there — the sub-index just needs to be located in the correct amendment year.'
    }
  },

  {
    id: 's2_institutional_backing_variant',
    label: 'The coordination extends beyond this polity\'s institutional structure.',
    xpReward: 20,
    skill: 'wits',
    tags: ['Evidence', 'Lore'],
    plot: 'main',
    questId: 'q_s2_climax',
    condition: function() {
      return G.flags && G.flags.stage2_collegium_contact && (G.stageProgress[2] || 0) >= 7 && !G.flags.cross_polity_scope_confirmed;
    },
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.wits || 0);
      if (r.total >= 13) {
        G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        G.flags.cross_polity_scope_confirmed = true;
        var _collegiumDeep = G.flags.stage2_collegium_contact && (G.stageProgress[2] || 0) >= 7;
        var _resultText = _collegiumDeep
          ? 'The suppression pattern is not localized. The same routing codes, the same stamp series, the same "Procedural Alignment" category appear in Collegium records from three separate polities — and Dravn Pell, who holds a cross-jurisdictional advisory role at the Collegium tier above Seld\'s section, has access to all three filing systems. His advisory role is nominally administrative. His access record shows him logged into the suppressed partitions at each polity on the same days as the largest suppression batches. He did not authorize the suppression. He was present for it across every jurisdiction where it occurred.'
          : 'The suppression pattern is not localized. The same routing codes, the same stamp series, the same "Procedural Alignment" category appear in Collegium records from three separate polities. Someone with cross-jurisdictional access was present across all three filing systems during the suppression periods. The authorization did not require a personal signature in any single jurisdiction — but the simultaneous access pattern across all three systems points to coordination from above the polity level.';
        addNarration('', _resultText);
        addJournal('Cross-polity suppression scope confirmed: same routing codes, stamp series, and category across three Collegium jurisdictions. Coordination evidence points above polity level.', 'evidence');
        G.recentOutcomeType = 'discovery';
      } else {
        addNarration('', 'The cross-jurisdictional scope is visible as a pattern — the same category stamp, the same routing code format — but confirming it as coordination rather than coincidence requires access to the filing records from the other polities, not just this one. The Collegium\'s inter-polity filing protocol requires a specific authorization level to access records from outside the current jurisdiction. That authorization is obtainable, but through the same administrative tier that processed the suppression batches.');
        addJournal('Cross-polity suppression pattern visible but confirmation requires inter-polity filing access — obtainable only through the administrative tier that processed the batches.', 'intelligence');
        G.recentOutcomeType = 'complication';
      }
      if (typeof checkStageAdvance === 'function') checkStageAdvance();
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: {
      text: 'Inter-polity filing access blocked by the administrative tier that processed the batches. The pattern is visible from within this jurisdiction alone — the cross-polity confirmation is a parallel track.'
    }
  },

  // ========== GENERAL STAGE 2 INVESTIGATION CHOICES (12 choices) ==========

  {
    id: 's2_routing_crossref',
    label: 'The district numbers and the route numbers share a column they shouldn\'t.',
    xpReward: 20,
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
    xpReward: 20,
    text: 'Someone has been following my route. I want to know who gave them the itinerary.',
    tags: ['Stealth', 'Investigation'],
    plot: 'side',
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
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
    xpReward: 20,
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
    xpReward: 20,
    text: 'He answered every question I didn\'t ask. Not one I did.',
    tags: ['Investigation', 'Social'],
    plot: 'side',
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
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
    xpReward: 20,
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
    xpReward: 20,
    text: 'The public Collegium office exists to be seen. What\'s behind it does not.',
    tags: ['Investigation', 'Stealth'],
    plot: 'side',
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
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
    xpReward: 20,
    text: 'There\'s a gap in the suppression pattern. Someone forgot a subcategory.',
    tags: ['Investigation', 'Lore'],
    plot: 'side',
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
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
    xpReward: 20,
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
    xpReward: 20,
    text: 'Waivers don\'t get signed without a reason. Someone approved these in bulk.',
    tags: ['Investigation', 'Lore'],
    plot: 'side',
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
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
    xpReward: 20,
    text: 'Reclassified cargo stops being cargo. That\'s the point of reclassifying it.',
    tags: ['Investigation', 'Lore'],
    plot: 'side',
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
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
    xpReward: 20,
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
    xpReward: 20,
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
    xpReward: 20,
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
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
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
    skill: 'craft',
    label: 'The seal impression is slightly off-center. I know what a correct stamp looks like.',
    xpReward: 20,
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
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
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
      var r = rollD20('finesse', (G.skills.finesse || 0) + (typeof getEquipmentBonus === 'function' ? getEquipmentBonus('finesse') : 0));
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
    plot: 'main',
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
      var r = rollD20('finesse', (G.skills.finesse||0) + (typeof getEquipmentBonus==='function'?getEquipmentBonus('stealth'):0));
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
    plot: 'main',
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
      var r = rollD20('finesse', (G.skills.finesse||0) + (typeof getEquipmentBonus==='function'?getEquipmentBonus('stealth'):0));
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
    label: "The liaison's second meeting is with someone who doesn't appear on any posted roster.",
    plot: 'main',
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
      var r = rollD20('finesse', (G.skills.finesse||0) + (typeof getEquipmentBonus==='function'?getEquipmentBonus('stealth'):0));
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
    plot: 'main',
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
      var r = rollD20('finesse', (G.skills.finesse || 0) + (typeof getEquipmentBonus === 'function' ? getEquipmentBonus('finesse') : 0));
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
    plot: 'main',
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
      var r = rollD20('finesse', (G.skills.finesse || 0) + (typeof getEquipmentBonus === 'function' ? getEquipmentBonus('finesse') : 0));
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
    plot: 'main',
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
      var r = rollD20('finesse', (G.skills.finesse || 0) + (typeof getEquipmentBonus === 'function' ? getEquipmentBonus('finesse') : 0));
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
    plot: 'main',
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
      var r = rollD20('wits', (G.skills.wits || 0));
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
    plot: 'main',
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
      var r = rollD20('charm', (G.skills.charm || 0));
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
    xpReward: 20,
    text: 'The warden is lying. He knows I can tell. That is enough.',
    tags: ['Combat', 'Confrontation', 'Pressure'],
    plot: 'side',
    condition: function() {
      return typeof getArchetypeFamily === 'function' && getArchetypeFamily() === 'combat';
    },
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.might || 0);
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
    xpReward: 20,
    text: 'The courier carrying that manifest needs to arrive. I can make that happen.',
    tags: ['Combat', 'Protection', 'Route'],
    plot: 'side',
    condition: function() {
      return typeof getArchetypeFamily === 'function' && getArchetypeFamily() === 'combat';
    },
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.might || 0);
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
    xpReward: 20,
    text: 'Warden deployment shifted three days ago. Someone gave an order they didn\'t write down.',
    tags: ['Combat', 'Observation', 'Tactics'],
    tag: 'risky',
    plot: 'side',
    condition: function() {
      return typeof getArchetypeFamily === 'function' && getArchetypeFamily() === 'combat';
    },
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.might || 0);
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
    xpReward: 20,
    text: 'The man following me is a professional. He wants me to know he\'s there.',
    tags: ['Combat', 'Confrontation', 'Stealth'],
    plot: 'side',
    condition: function() {
      return typeof getArchetypeFamily === 'function' && getArchetypeFamily() === 'combat';
    },
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.might || 0);
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
    xpReward: 20,
    text: 'The clerk is leaving with something that isn\'t supposed to leave that building.',
    tags: ['Combat', 'Confrontation', 'Evidence'],
    plot: 'side',
    condition: function() {
      return typeof getArchetypeFamily === 'function' && getArchetypeFamily() === 'combat';
    },
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20(G.skills.might || 0);
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
    plot: 'main',
    tags: ['Stage2', 'Investigation'],
    tag: 'risky',
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'tracing courier network gaps');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.wits||0));
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
    plot: 'main',
    tags: ['Stage2', 'Investigation'],
    tag: 'risky',
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'cross-polity name suppression pattern');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.wits||0));
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
      const result = rollD20('charm', (G.skills.charm||0));
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
      const result = rollD20('finesse', (G.skills.finesse||0));
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
      const result = rollD20('spirit', (G.skills.spirit||0));
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
    plot: 'main',
    tags: ['Stage2', 'Investigation'],
    tag: 'risky',
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'cross-referencing courier route notices');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.wits||0));
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
    plot: 'main',
    tags: ['Stage2', 'Investigation'],
    tag: 'risky',
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'dating Collegium seal documents');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.wits||0));
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
    plot: 'main',
    tags: ['Stage2', 'Investigation'],
    tag: 'risky',
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'reading archivist roster against access log');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('finesse', (G.skills.finesse||0));
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
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'cross-checking broker ledger against Guild registry');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('charm', (G.skills.charm||0));
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
      const result = rollD20('vigor', (G.skills.vigor||0));
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
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'tracing retroactively filed supply allocation');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.wits||0));
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
      const result = rollD20('charm', (G.skills.charm||0));
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
      const result = rollD20('spirit', (G.skills.spirit||0));
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
  },

  // ========== LOCALITY-SPECIFIC CHOICES: Zero-sp2 locality fixes ==========
  // These 12 choices (2 per locality) ensure mimolot, glasswake_commune, soreheim,
  // guildheart, aurora, and shirshal each contribute sp2 on successful visits.
  // No flag conditions — available to all archetypes including magic/inquisitor families.

  // --- Mimolot Academy (knowledge tariffs, magical conduct, scholarly prestige) ---
  {
    id: 's2_mimolot_1',
    label: 'The tutor-magistrate marked that shelf restricted. That\'s recent.',
    xpReward: 20,
    skill: 'wits',
    tag: 'risky',
    tags: ['Mimolot', 'Evidence', 'Lore'],
    plot: 'main',
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20('wits');
      var dc = 12 + Math.floor(((G.level || 1) - 1) / 2);
      if (r.total >= dc) {
        G.stageProgress[2]++;
        G.flags.mimolot_archive_accessed = true;
        addNarration('Mimolot Archive — Restricted Shelf', 'The restriction notice is fresh — the ink on the wax seal is barely set, the parchment corner still curling from the heat. Whatever was on this shelf was cleared in the last two days. The catalog index beside it has a gap where three volume entries should be: numbers running 447 through 449, referenced in the cross-index as tariff exemption records spanning the last four academic cycles. Someone decided those records needed to be elsewhere. The tutor-magistrate is not in the room. The catalog stays open.');
        addJournal('Mimolot Academy archive: three tariff exemption volumes recently pulled from public access. Numbers 447-449 absent from restricted shelf, present in cross-index.', 'evidence');
        G.recentOutcomeType = 'discovery';
      } else {
        addNarration('Mimolot Archive — Turned Away', 'The junior archivist intercepts you three steps from the shelf. Her tone is even and without apology. The restricted section requires a faculty seal for access, and faculty seals are issued by the tutor-magistrate whose schedule is posted at the main gate. She has already turned back to her own work before you reach the door. The catalog index is behind her desk and out of reach.');
        addJournal('Mimolot restricted archive inaccessible without faculty seal from tutor-magistrate.', 'complication');
        G.recentOutcomeType = 'complication';
      }
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: 'The archive requires a faculty seal. The shelf stays closed.'
  },

  {
    id: 's2_mimolot_2',
    label: 'A student paying knowledge tariffs on something she already owns knows more than she\'s saying.',
    xpReward: 20,
    skill: 'charm',
    tag: 'risky',
    tags: ['Mimolot', 'Social', 'Intelligence'],
    plot: 'main',
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20('charm');
      var dc = 13 + Math.floor(((G.level || 1) - 1) / 2);
      if (r.total >= dc) {
        G.stageProgress[2]++;
        G.flags.mimolot_student_source = true;
        addNarration('Mimolot Courtyard — Student Exchange', 'She doesn\'t look around before she answers, which either means she isn\'t worried or she\'s very practiced. The tariff she paid covers a restricted methodology text — one she inherited from her mentor, who left the Academy under pressure six months ago. The methodology is standard. The restriction is not. She has been paying the tariff monthly to keep the text from being catalogued as contraband, which would require her to surrender it. She names two other students in the same position. She did not ask why you wanted to know.');
        addJournal('Mimolot Academy: three students paying ongoing tariffs to retain privately-held texts flagged for restricted catalog. Pattern suggests selective enforcement.', 'intelligence');
        G.recentOutcomeType = 'discovery';
      } else {
        addNarration('Mimolot Courtyard — Deflection', 'She listens until you finish and then checks something in her satchel with the focused attention of someone who has decided not to be part of this conversation. "Knowledge tariffs are assessed by the magistrate\'s office," she says. "Appeals go through the same office." Her satchel closes. She is already walking.');
        addJournal('Student declined to discuss Mimolot tariff irregularities.', 'complication');
        G.recentOutcomeType = 'complication';
      }
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: 'The student has nothing to say about knowledge tariffs. The courtyard stays quiet.'
  },

  // --- Glasswake Commune (contamination measurement, quarantine law, Sheresh research) ---
  {
    id: 's2_glasswake_1',
    label: 'The exposure log skips four days. That doesn\'t happen by accident.',
    xpReward: 20,
    skill: 'wits',
    tag: 'risky',
    tags: ['Glasswake', 'Evidence', 'Discovery'],
    plot: 'main',
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20('wits');
      var dc = 12 + Math.floor(((G.level || 1) - 1) / 2);
      if (r.total >= dc) {
        G.stageProgress[2]++;
        G.flags.glasswake_log_gap_found = true;
        addNarration('Glasswake Observation Gallery — Log Gap', 'The exposure log is kept in triplicate under quarantine protocol — one copy for the observer, one for the concord warden, one for deep archive. All three copies skip the same four days. Not a transcription error: the page numbering continues correctly, the binding is undisturbed. Someone removed the entries from all three copies simultaneously, which requires access that only the concord warden holds. The readings for those days are not recoverable from this room. They exist somewhere, or they were destroyed at the source.');
        addJournal('Glasswake Commune: four-day gap in exposure log across all three copies simultaneously. Requires concord warden access to execute. Readings either relocated or destroyed.', 'evidence');
        G.recentOutcomeType = 'discovery';
      } else {
        addNarration('Glasswake Observation Gallery — Access Blocked', 'The observation log is behind a quarantine glass panel — visible, not reachable. The attendant is precise: access requires contamination clearance from the intake scanner, and the intake scanner queue is full until the afternoon cycle. She does not offer an exception. The log sits open at today\'s entry, readable from the other side of the glass, and today\'s entry tells you nothing you did not already know.');
        addJournal('Glasswake exposure log accessible only after contamination clearance. Queue full until afternoon.', 'complication');
        G.recentOutcomeType = 'complication';
      }
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: 'The exposure log is behind quarantine glass. The afternoon queue is the only path.'
  },

  {
    id: 's2_glasswake_2',
    label: 'The containment warden is doing her rounds early. Something changed.',
    xpReward: 20,
    skill: 'finesse',
    tag: 'risky',
    tags: ['Glasswake', 'Stealth', 'Intelligence'],
    plot: 'main',
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20('finesse');
      var dc = 13 + Math.floor(((G.level || 1) - 1) / 2);
      if (r.total >= dc) {
        G.stageProgress[2]++;
        G.flags.glasswake_warden_observed = true;
        addNarration('Glasswake Corridor — Warden Round', 'The warden moves through the maintenance gallery at twice the posted interval. She stops at sensor pylon three, checks a reading, writes something on her sleeve rather than the duty board, and continues. Writing on the sleeve means she doesn\'t want the reading in the duty log. The reading is from the eastern exposure trench — the same sector as the four-day gap. She finishes the gallery and heads directly to the communications room rather than the warden\'s station. Someone outside the commune needs to know what pylon three just measured.');
        addJournal('Glasswake containment warden took off-schedule readings at pylon three, recorded on sleeve, proceeded directly to communications room. Eastern trench sector — same as log gap.', 'intelligence');
        G.recentOutcomeType = 'discovery';
      } else {
        addNarration('Glasswake Corridor — Spotted', 'The warden clocks you before you clock her. Her route doubles back at the gallery junction and she is standing at the far end of the corridor with her arms at her sides and her eyes on you. "Observation gallery is east wing," she says. "This gallery is maintenance access. Badge or clearance, please." Her voice does not rise. She waits.');
        addJournal('Containment warden intercepted in maintenance gallery. Access challenge issued.', 'complication');
        G.recentOutcomeType = 'complication';
      }
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: 'The warden is already watching. The maintenance corridor closes off.'
  },

  // --- Soreheim Proper (Titan Towers, war production, tower rank, Giant Council) ---
  {
    id: 's2_soreheim_1',
    label: 'The work assignment board has a tower listed that doesn\'t appear on any public manifest.',
    xpReward: 20,
    skill: 'wits',
    tag: 'risky',
    tags: ['Soreheim', 'Evidence', 'Intelligence'],
    plot: 'main',
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20('wits');
      var dc = 13;
      if (r.total >= dc) {
        G.stageProgress[2]++;
        G.flags.soreheim_tower_discrepancy = true;
        addNarration('Soreheim Tower Base — Assignment Board', 'Tower designation T-9 is listed three times in today\'s assignment rotation. T-9 does not appear on the public manifest board at the tower base entrance, which lists towers T-1 through T-8 and T-10 through T-14. The assignments are routine: materials transport, forge maintenance, logistics relay. Someone added a ninth unlisted tower to the rotation without updating the public manifest. The workers assigned to T-9 are listed by labor number, not name — which is standard for restricted-access tower assignments in wartime production.');
        addJournal('Soreheim: tower designation T-9 appears in assignment rotation but absent from public manifest. Three routine assignments. Workers listed by number, not name — restricted-access protocol.', 'evidence');
        G.recentOutcomeType = 'discovery';
      } else {
        addNarration('Soreheim Tower Base — Board Crowded', 'The assignment board is three-deep in workers checking their rotations. You get close enough to see the board face but not long enough to read it — someone presses forward and you are pushed to the edge of the crowd before the cycle updates. The foreman\'s station beside the board is staffed and watching. You clear the crowd and come back later when the board has turned over to the next cycle, and what you needed is already gone.');
        addJournal('Soreheim assignment board unreadable during shift change. Foreman station staffed throughout.', 'complication');
        G.recentOutcomeType = 'complication';
      }
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: 'The assignment board clears before you can read it. The foreman is watching.'
  },

  {
    id: 's2_soreheim_2',
    label: 'A logistics artisan carrying sealed manifests doesn\'t unload at this bay.',
    xpReward: 20,
    skill: 'vigor',
    tag: 'risky',
    tags: ['Soreheim', 'Stealth', 'Evidence'],
    plot: 'main',
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20('vigor');
      var dc = 13;
      if (r.total >= dc) {
        G.stageProgress[2]++;
        G.flags.soreheim_sealed_route_tracked = true;
        addNarration('Soreheim Freight Corridor — Artisan Track', 'You fall into the pace of the loading corridor traffic, which moves fast enough that standing still is conspicuous. The artisan with the sealed manifests goes past two unloading bays and through a maintenance junction that is marked as closed for the afternoon cycle — the closed marker is a sliding plate that has been pushed two inches off-center, enough to pass through if you know to look for it. The corridor beyond is narrower and quieter and ends at a freight elevator marked with a designation that matches the unlisted tower.');
        addJournal('Soreheim: sealed manifest artisan bypassed standard bays via maintenance junction to freight elevator bearing T-9 designation. Route confirmed operational during closed period.', 'evidence');
        G.recentOutcomeType = 'discovery';
      } else {
        addNarration('Soreheim Freight Corridor — Lost in Traffic', 'The corridor is moving fast and you lose the artisan at the first junction split. You take the wrong branch and come out at a loading bay with no sealed cargo in sight. When you backtrack, the junction is staffed by a tower tribune who wants to know your assigned bay number. You give the nearest one you remember from the board. He checks it. He waves you through. The artisan is gone.');
        addJournal('Lost target in Soreheim freight corridor junction split. Tower tribune present at junction.', 'complication');
        G.recentOutcomeType = 'complication';
      }
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: 'The freight corridor is too fast. The artisan disappears at the junction split.'
  },

  // --- Guildheart Hub (arbitration, tariff mediation, warehouse registration, The Union) ---
  {
    id: 's2_guildheart_1',
    label: 'The hearing chamber closed early and the clerk is still inside.',
    xpReward: 20,
    skill: 'charm',
    tag: 'risky',
    tags: ['Guildheart', 'Social', 'Evidence'],
    plot: 'main',
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20('charm');
      var dc = 13;
      if (r.total >= dc) {
        G.stageProgress[2]++;
        G.flags.guildheart_clerk_source = true;
        addNarration('Guildheart Hearing Chamber — After Session', 'The clerk does not look like someone who expected company. She is reorganizing the arbitration record stack with the careful efficiency of someone who intends to be finished before the next session opens. You name the filing reference you\'re looking for. She considers for a moment — not whether she knows it, but whether she wants to be the one who tells you. She slides one sheet from the middle of the stack without looking at you. It bears a tariff sanction notice with a crossed-out authorization code. "Sanctions don\'t get crossed out," she says. "They get appealed. This one wasn\'t appealed." She resumes stacking.');
        addJournal('Guildheart arbitration clerk: tariff sanction notice with crossed-out authorization code — no appeal filed. Crossing out a sanction requires Guild Council authority, not standard arbitration process.', 'evidence');
        G.recentOutcomeType = 'discovery';
      } else {
        addNarration('Guildheart Hearing Chamber — Closed', 'The door is locked from the inside and the session board outside lists the chamber as closed until the morning rotation. You knock once. There is a pause in the movement inside and then silence. Whatever the clerk is finishing will be finished without an audience. The corridor empties around you as the day session ends and the evening queue begins forming at the intake desk.');
        addJournal('Guildheart hearing chamber locked during post-session. No access.', 'complication');
        G.recentOutcomeType = 'complication';
      }
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: 'The chamber door is locked. The clerk inside is not answering.'
  },

  {
    id: 's2_guildheart_2',
    label: 'Two bonded warehouses are registered to the same Guild mark with different owner names.',
    xpReward: 20,
    skill: 'wits',
    tag: 'risky',
    tags: ['Guildheart', 'Evidence', 'Lore'],
    plot: 'main',
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20('wits');
      var dc = 12;
      if (r.total >= dc) {
        G.stageProgress[2]++;
        G.flags.guildheart_duplicate_mark_found = true;
        addNarration('Guildheart Registry Tower — Warehouse Index', 'The bonded warehouse index is public record, organized by Guild mark and updated quarterly. Mark GH-117 appears twice: once under the name Selenne Farrow, registered six years ago, and once under Veth Doran, registered eight months ago. A Guild mark is issued once and does not transfer — the registration fee is non-refundable and the mark is personal. Both registrations are stamped with the same issuing authority. One of them is forged, and the quarterly update that should have flagged the conflict has been suppressed for three consecutive quarters. The suppression notation is initialed, but the initials don\'t match any listed staff member.');
        addJournal('Guildheart warehouse index: Guild mark GH-117 holds two active registrations under different names. Three consecutive quarterly conflict checks suppressed. Initials on suppression do not match listed staff.', 'evidence');
        G.recentOutcomeType = 'discovery';
      } else {
        addNarration('Guildheart Registry Tower — Index Locked', 'The warehouse index requires a bonded trader registration to access — a standard anti-tampering measure that the clerk at the intake desk enforces with practiced patience. She has heard every version of why someone needs access without registration. Her answer is the same. The public reading copy in the ground-floor alcove is last quarter\'s edition and the entry you need was updated since then.');
        addJournal('Guildheart warehouse index requires bonded trader registration. Public reading copy is outdated.', 'complication');
        G.recentOutcomeType = 'complication';
      }
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: 'The bonded warehouse index requires a trader registration. The public copy is last quarter\'s.'
  },

  // --- Aurora Crown Commune (dome survival, celestial study, Sheresh stewards) ---
  {
    id: 's2_aurora_1',
    label: 'The dome steward is logging a supply count that doesn\'t match the ration board.',
    xpReward: 20,
    skill: 'wits',
    tag: 'risky',
    tags: ['Aurora', 'Evidence', 'Discovery'],
    plot: 'main',
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20('wits');
      var dc = 12;
      if (r.total >= dc) {
        G.stageProgress[2]++;
        G.flags.aurora_supply_discrepancy = true;
        addNarration('Aurora Crown — Ration Court', 'The ration board is posted at dome-center and updated at each distribution cycle. The steward\'s supply log, which you read over his shoulder as he enters today\'s count, shows twelve units of sealed grain marked received this morning. The ration board shows eight. The steward does not look up while he writes. The four-unit gap is not rounding and it is not error — the entries are precise and the units are tracked individually by seal number. He closes the log before you can read the seal numbers. He knows you were looking.');
        addJournal('Aurora Crown: supply log shows 12 units received against ration board\'s 8. Four-unit gap tracked individually. Steward closed log on observation.', 'evidence');
        G.recentOutcomeType = 'discovery';
      } else {
        addNarration('Aurora Crown — Ration Court Crowded', 'Distribution cycle is running and the ration court is packed shoulder to shoulder. You can see the steward\'s station but not reach it and not read anything at that distance in this light. The dome thermal hum is constant and the crowd is loud. When the distribution cycle ends, the steward has already moved to the next station and his log has gone with him.');
        addJournal('Aurora Crown ration court inaccessible during distribution cycle. Steward moved before approach.', 'complication');
        G.recentOutcomeType = 'complication';
      }
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: 'The distribution cycle fills the ration court. The steward is gone before it clears.'
  },

  {
    id: 's2_aurora_2',
    label: 'The aurora study hall has equipment running with the shutters sealed. Someone\'s working off-cycle.',
    xpReward: 20,
    skill: 'finesse',
    tag: 'risky',
    tags: ['Aurora', 'Stealth', 'Intelligence'],
    plot: 'main',
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20('finesse');
      var dc = 13;
      if (r.total >= dc) {
        G.stageProgress[2]++;
        G.flags.aurora_offcycle_research = true;
        addNarration('Aurora Crown — Study Hall Off-Cycle', 'The shutter lock is a dome-standard three-bar latch, and the third bar is not fully engaged — enough that the shutter seals from outside but opens from inside with a single pull. You enter before the lock clicks home. Inside, two researchers are working at a calibration table with a celestial instrument pointed at the dome\'s inner face rather than the observation aperture. They are measuring something inside the dome, not outside it. One of them looks up. His expression does not change. "Close it behind you," he says, meaning the shutter. "And sit down if you\'re going to stay."');
        addJournal('Aurora Crown study hall: off-cycle researchers measuring dome interior face rather than sky aperture. Equipment active with shutters sealed. Presence acknowledged, not challenged.', 'intelligence');
        G.recentOutcomeType = 'discovery';
      } else {
        addNarration('Aurora Crown — Shutter Locked', 'The study hall shutter is locked from inside and the latch is fully home — no gap, no flex. You press your ear to the join and hear the hum of something running, steady and low. Whatever is running in there is not on the posted schedule. The dome protocol board outside lists the hall as closed until the next clear-sky window. You have been standing here long enough that the corridor monitor has noted your position on his rounds.');
        addJournal('Aurora study hall sealed from inside, off posted schedule. Corridor monitor noted position.', 'complication');
        G.recentOutcomeType = 'complication';
      }
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: 'The study hall shutter is fully locked from inside. The corridor monitor is watching.'
  },

  // --- Shirshal (Magi Magistratus, magical law, arcane scrutiny, House Shirsh) ---
  {
    id: 's2_shirshal_1',
    label: 'The case filing room has a notice board with names that shouldn\'t be public.',
    xpReward: 20,
    skill: 'wits',
    tag: 'risky',
    tags: ['Shirshal', 'Evidence', 'Lore'],
    plot: 'main',
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20('wits');
      var dc = 13 + Math.floor(((G.level || 1) - 1) / 2);
      if (r.total >= dc) {
        G.stageProgress[2]++;
        G.flags.shirshal_notice_board_read = true;
        addNarration('Shirshal Filing Room — Notice Board', 'The Magi Magistratus posts active case notices by case number, not name — standard magical-law practice. But the filing room\'s internal routing board, visible through the half-open partition, lists cases by case number and petitioner name simultaneously. Three entries are from petitioners whose names appear in records you\'ve seen at other localities under different classifications: not suspects, not complainants — witnesses who were marked inactive. Inactive witnesses don\'t file new cases. One of the entries is dated last week.');
        addJournal('Shirshal Magi Magistratus filing room: three cases filed by petitioners whose names appear as inactive witnesses in cross-locality records. One dated last week.', 'evidence');
        G.recentOutcomeType = 'discovery';
      } else {
        addNarration('Shirshal Filing Room — Partition Closed', 'The partition is fully closed by the time you reach the right angle to see the routing board. The clerk at the front intake desk offers a case number lookup for any open petition by appointment — appointments are handled on odd days, today is even. She hands you a paper form and slides the pen tray across the desk. The form takes fifteen minutes and a registered locality address to complete.');
        addJournal('Shirshal filing room partition closed. Case lookup requires appointment on odd days.', 'complication');
        G.recentOutcomeType = 'complication';
      }
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: 'The partition closes before you get the angle. The clerk wants a form and a locality address.'
  },

  {
    id: 's2_shirshal_2',
    label: 'An arcane specialist is reviewing a case file she\'s not listed on.',
    xpReward: 20,
    skill: 'spirit',
    tag: 'risky',
    tags: ['Shirshal', 'Magic', 'Evidence'],
    plot: 'main',
    fn: function() {
      if (!G.flags) G.flags = {};
      var r = rollD20('spirit');
      var dc = 13 + Math.floor(((G.level || 1) - 1) / 2);
      if (r.total >= dc) {
        G.stageProgress[2]++;
        G.flags.shirshal_specialist_observed = true;
        addNarration('Shirshal Reading Alcove — Specialist', 'She is not hiding, but she is careful — seated sideways to the main corridor, the case file angled toward the alcove wall. The case number on the cover is visible from your position: an active magical-conduct inquiry, not her assigned caseload based on the duty roster posted at the alcove entrance. She is reading exhibits, not documents — the physical evidence described in the file, which is stored separately, not present. She\'s working from memory or prior access. When she turns a page, a second file slides from beneath the first: an older number, marked closed four years ago. Both files have the same red marginal notation, in the same hand.');
        addJournal('Shirshal: specialist reviewing active inquiry file outside assigned caseload, with access to closed case from four years prior. Both bear identical red marginal notation.', 'evidence');
        G.recentOutcomeType = 'discovery';
      } else {
        addNarration('Shirshal Reading Alcove — Empty', 'The alcove is unoccupied. The duty roster at the entrance lists three specialists on the current rotation, but the reading room attendant says the afternoon session cleared early — a scheduling change from the Magi Magistratus. Whatever was happening here today happened before you arrived. The alcove furniture is arranged with the careful precision of someone who prefers a particular seat.');
        addJournal('Shirshal reading alcove empty. Afternoon session cleared early by Magi Magistratus.', 'complication');
        G.recentOutcomeType = 'complication';
      }
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: 'The reading alcove is empty. The afternoon session cleared early.'
  },

  // ============================================================
  //  POOL EXPANSION — guildheart / soreheim / aurora additional choices
  //  No sp2 increment; the original *_1 and *_2 entries already handle stage advancement.
  //  Rewards: XP + journal + small gold only.
  // ============================================================

  // --- Guildheart pool expansion ---
  {
    id: 's2_guildheart_3',
    label: 'The stamp on this transit seal was applied after the date it shows.',
    skill: 'wits',
    tag: 'risky',
    tags: ['Guildheart', 'Evidence'],
    roll: { dc: 13 },
    fn: function() {
      G.lastResult = 'The transit seal is a tar-and-resin disc pressed onto the manifest while the wax is hot. Cold-pressed seals crack at the rim. This one has no cracks and the resin is still tacky. The date stamped underneath is six days old. You hold it against the registry lamp and the resin warms enough to release the paper beneath — a second date is impressed into the manifest itself, two days from now. The seal was applied early. Someone wanted the cargo cleared before its own paperwork existed.';
      G.recentOutcomeType = 'success';
      gainXp(15);
      addJournal('Guildheart: transit seal applied two days ahead of manifest date. Cargo cleared before its own paperwork existed.', 'evidence');
      G.gold = (G.gold||0) + 6;
      addNarration('', G.lastResult, 'success');
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: function() {
      G.lastResult = 'The registry lamp is shuttered for the afternoon — a maintenance cycle the desk clerk announces only when someone reaches for it. Without the lamp the seal is just a tar disc and the manifest is just a sheet of paper. The clerk watches you set them down. He does not offer the alternate reading station. He does not need to say that the alternate station is for bonded traders. You leave the manifest where it lay. Someone will file it before you can come back.';
      G.recentOutcomeType = 'complication';
      addNarration('', G.lastResult, 'complication');
      if (typeof saveGame === 'function') saveGame();
    }
  },

  {
    id: 's2_guildheart_4',
    label: 'A dispute clerk closed a hearing with the petitioner still in the chamber.',
    skill: 'charm',
    tag: 'risky',
    tags: ['Guildheart', 'Social'],
    roll: { dc: 13 },
    fn: function() {
      G.lastResult = 'The petitioner is a freight broker from the western quarter, still seated when the clerk\'s gavel marks the hearing as concluded. You catch her at the door before she finds her composure. She does not want to talk in the corridor. She wants to talk where there are no Guild ears, which on this tower means the stairwell landing two floors down. The hearing closed without ruling, she says, because the opposing party submitted a withdrawal that nobody read aloud. The withdrawal was signed by a name she does not recognize and could not be the actual respondent.';
      G.recentOutcomeType = 'success';
      gainXp(15);
      addJournal('Guildheart: dispute hearing closed via unread withdrawal signed by name unrelated to respondent. Petitioner left without ruling.', 'intelligence');
      G.gold = (G.gold||0) + 5;
      addNarration('', G.lastResult, 'success');
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: function() {
      G.lastResult = 'The petitioner is already moving by the time the gavel sounds, and she does not slow when you fall into step beside her. She has the careful posture of someone who has lost a hearing she expected to lose, and the careful silence of someone who has lost it for the wrong reasons. At the tower stair she steps onto the descent ramp and the ramp carries her down past three landings before you can choose which to follow. You pick the wrong one. The corridor she takes is members-only.';
      G.recentOutcomeType = 'complication';
      addNarration('', G.lastResult, 'complication');
      if (typeof saveGame === 'function') saveGame();
    }
  },

  {
    id: 's2_guildheart_5',
    label: 'The Sanction Board posted a notice this morning and took it down before midday.',
    skill: 'wits',
    tag: 'safe',
    tags: ['Guildheart', 'Discovery'],
    roll: { dc: 12 },
    fn: function() {
      G.lastResult = 'The Sanction Board is a public posting wall maintained by Guild attendants, and posted notices remain until their stated expiration. A morning posting taken down by midday is not procedure — it is intervention. The attendant rotation log at the board\'s base records the removal under attendant initials that do not appear elsewhere on today\'s shift sheet. The notice\'s subject line was preserved in the rotation log per standing rule: a sanction warning against a bonded warehouse you have seen referenced before, under a different Guild mark.';
      G.recentOutcomeType = 'success';
      gainXp(15);
      addJournal('Guildheart Sanction Board: morning notice removed by midday under attendant initials not on shift. Subject was sanction against warehouse previously seen under different Guild mark.', 'evidence');
      G.gold = (G.gold||0) + 4;
      addNarration('', G.lastResult, 'success');
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: function() {
      G.lastResult = 'The Sanction Board attendant is sitting on the rotation log when you reach the base of the wall — literally, a hip on the corner of the bench that holds it. He greets you by the standard greeting, asks which mark you came to look up, and waits. He is not impatient. He is not friendly. The morning posting is gone and the rotation log is under his weight, and he is the one who decides how long it stays there.';
      G.recentOutcomeType = 'complication';
      addNarration('', G.lastResult, 'complication');
      if (typeof saveGame === 'function') saveGame();
    }
  },

  {
    id: 's2_guildheart_6',
    label: 'A bonded courier is delivering to a warehouse that wasn\'t on his route this morning.',
    skill: 'wits',
    tag: 'bold',
    tags: ['Guildheart', 'Evidence', 'Intelligence'],
    roll: { dc: 16 },
    fn: function() {
      G.lastResult = 'You saw the courier\'s route board at the dispatch hall this morning — bonded couriers post their daily routes in full because every consignment is countersigned at delivery. The warehouse he\'s entering now is not on it. You watch him from the corner of the registration plaza. He signs the consignment book at the warehouse door, but the warehouse\'s own counter-signature is provided by a Guild attendant standing inside the threshold, not by the warehouse keeper. Attendants countersign for warehouses that have been administratively closed. The warehouse should not be receiving anything.';
      G.recentOutcomeType = 'success';
      gainXp(20);
      addJournal('Guildheart: bonded courier delivering to administratively-closed warehouse with Guild attendant providing counter-signature. Delivery is off posted route.', 'evidence');
      G.gold = (G.gold||0) + 8;
      addNarration('', G.lastResult, 'success');
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: function() {
      G.lastResult = 'The plaza traffic thickens as the courier reaches the warehouse door — a wedge of bonded handlers crossing toward the freight ramp, a meeting of two Guild attendants at the corner pillar, a registry clerk pulling a wheeled file rack across the cobble. By the time the wedge passes, the warehouse door is closed and the courier is gone. The consignment book left at the doorpost has already been collected. The Guild attendant on the corner watches you stand where you stand for one count too long.';
      G.recentOutcomeType = 'complication';
      addNarration('', G.lastResult, 'complication');
      if (typeof saveGame === 'function') saveGame();
    }
  },

  // --- Soreheim pool expansion ---
  {
    id: 's2_soreheim_3',
    label: 'The allocation hall logs heat-metal outputs by tower floor. Floor seven has stopped reporting.',
    skill: 'wits',
    tag: 'risky',
    tags: ['Soreheim', 'Evidence'],
    roll: { dc: 13 },
    fn: function() {
      G.lastResult = 'The allocation hall ledger is a brass-bound book chained to the assayer\'s podium, updated at each forge cycle by the floor wardens. Floor seven\'s column shows entries for the past nineteen cycles and nothing after. Other floors continue reporting. A non-reporting floor either ceased production or was reassigned to a closed-allocation channel — both of which require a posted notice and a temporary warden reassignment. Neither notice is posted. The seventh-floor warden is listed on today\'s duty roster as active, but the duty roster is the only place she still appears.';
      G.recentOutcomeType = 'success';
      gainXp(15);
      addJournal('Soreheim: allocation ledger shows floor seven non-reporting for nineteen cycles. No posted closure notice. Floor warden listed active only on duty roster.', 'evidence');
      G.gold = (G.gold||0) + 6;
      addNarration('', G.lastResult, 'success');
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: function() {
      G.lastResult = 'The allocation hall is at shift change and the assayer\'s podium is surrounded — wardens posting cycle results, foremen reading the running totals, a tower tribune watching the chain on the ledger. The chain is short. The book is open to the current page. The previous pages are not turned for you. You read what you can over a warden\'s shoulder and what you read is the current cycle only. The tribune notices your angle and shifts his position to block it.';
      G.recentOutcomeType = 'complication';
      addNarration('', G.lastResult, 'complication');
      if (typeof saveGame === 'function') saveGame();
    }
  },

  {
    id: 's2_soreheim_4',
    label: 'A freight manifest shows twice the tonnage of what the bridge can carry.',
    skill: 'craft',
    tag: 'risky',
    tags: ['Soreheim', 'Evidence', 'Lore'],
    roll: { dc: 13 },
    fn: function() {
      G.lastResult = 'The freight bridge between the assembly tower and the long-forge has a posted load limit of four hundred stone per crossing — engineering data, not a procedural cap. The manifest the freight crew is loading from lists eight hundred stone of finished plate for a single crossing. You watch the crew chief stamp the loading slip and direct the cart onto the bridge. The cart\'s wheels groan on the bridge plates and the bridge cabling sings a half-tone higher than the neighboring bridges. The crew is not slowing it. Whatever is on the cart is not what the manifest says it is.';
      G.recentOutcomeType = 'success';
      gainXp(15);
      addJournal('Soreheim: freight bridge crossed at double posted load limit. Cart sang under tension. Cargo mass does not match manifest description.', 'evidence');
      G.gold = (G.gold||0) + 6;
      addNarration('', G.lastResult, 'success');
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: function() {
      G.lastResult = 'You are still pacing the load limit posting when the cart starts onto the bridge. By the time you reach a vantage point that lets you read the manifest sheet pinned to the cart\'s side board, the cart is halfway across and moving faster than freight should move on a singing bridge. The crew chief is already walking back to the loading apron. You catch the manifest column from too far away to make out the totals. What you do see is the destination, which is a forge designation you do not recognize.';
      G.recentOutcomeType = 'complication';
      addNarration('', G.lastResult, 'complication');
      if (typeof saveGame === 'function') saveGame();
    }
  },

  {
    id: 's2_soreheim_5',
    label: 'A magma channel grate is clamped open. The heat is reaching the wrong corridor.',
    skill: 'might',
    tag: 'bold',
    tags: ['Soreheim', 'Hazard', 'Evidence'],
    roll: { dc: 16 },
    fn: function() {
      G.lastResult = 'The grate clamp is a forge-iron sleeve hammered onto the channel\'s pressure plate, holding the plate open so the magma surge bypasses the standard heat-shed. You wedge a length of broken stake under the sleeve and lever it free with the heel of your boot for footing — the channel exhales as the plate drops and the corridor pressure equalizes within three breaths. The surge that had been venting into the personnel corridor returns to the heat-shed channel. The clamp lies on the deck plate beside the grate. Someone installed it deliberately. Someone wanted that corridor hot.';
      G.recentOutcomeType = 'success';
      gainXp(20);
      addJournal('Soreheim: magma channel grate clamped open to vent surge into personnel corridor. Clamp removed. Installation was deliberate.', 'evidence');
      G.gold = (G.gold||0) + 8;
      addNarration('', G.lastResult, 'success');
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: function() {
      G.lastResult = 'The clamp does not lever. The sleeve has been hammered tight and the channel plate is hot enough that the stake you wedged in begins to smolder under your hand. You drop the stake and step back as the corridor air shimmers. A foreman rounds the corner of the heat-shed bay and sees you standing where you should not be standing, with a smoking length of wood at your feet. He does not call security. He calls the channel warden, which is worse.';
      G.recentOutcomeType = 'complication';
      addNarration('', G.lastResult, 'complication');
      if (typeof saveGame === 'function') saveGame();
    }
  },

  {
    id: 's2_soreheim_6',
    label: 'The forge talley boy is counting batches in a rhythm that doesn\'t match the strikes.',
    skill: 'wits',
    tag: 'safe',
    tags: ['Soreheim', 'Discovery'],
    roll: { dc: 12 },
    fn: function() {
      G.lastResult = 'The talley boy stands at the long-forge\'s out-rack and marks each finished plate with a chalk tick on the slate board. Forge strikes are paced by the hammer master\'s call — one strike, one batch, one tick. You watch for a full cycle. The hammer master calls eight strikes. The talley boy marks eleven ticks. Three of the ticks go onto the slate while the hammer is still raised — entered before the batch exists. The slate is collected at cycle end by an allocation runner who does not stop to count.';
      G.recentOutcomeType = 'success';
      gainXp(15);
      addJournal('Soreheim long-forge: talley boy chalking three phantom batches per eight-strike cycle. Allocation runner collects without recount.', 'evidence');
      G.gold = (G.gold||0) + 4;
      addNarration('', G.lastResult, 'success');
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: function() {
      G.lastResult = 'The forge floor heat distorts the air between you and the slate board, and the talley boy\'s hand moves faster than you can resolve from the gallery. You count the strikes by ear and lose track at six when the hammer master shifts to a double-tempo call for a finishing pass. The chalk ticks blur in the haze. By the time the cycle ends and the slate is collected, you have a count for the strikes and no count for the marks. You cannot prove what you almost saw.';
      G.recentOutcomeType = 'complication';
      addNarration('', G.lastResult, 'complication');
      if (typeof saveGame === 'function') saveGame();
    }
  },

  // --- Aurora pool expansion ---
  {
    id: 's2_aurora_3',
    label: 'The dome steward ran two separate supply counts for the same day.',
    skill: 'wits',
    tag: 'risky',
    tags: ['Aurora', 'Evidence'],
    roll: { dc: 13 },
    fn: function() {
      G.lastResult = 'The supply ledger is bound in two volumes — the active running count and the certified daily total, which the steward transcribes from the running count at distribution close. You catch him at the transcription bench. The running count for today shows fourteen sealed grain units. The certified total he is writing into the second volume shows ten. He notices your shadow on the page and does not flinch. He turns the running count face-down with the back of his hand, a practiced motion. The certified total goes to the Sheresh stewards by overnight courier. The running count stays in the dome.';
      G.recentOutcomeType = 'success';
      gainXp(15);
      addJournal('Aurora Crown: steward maintains two supply volumes. Running count shows fourteen units; certified total to Sheresh stewards shows ten. Practiced suppression of running count on observation.', 'evidence');
      G.gold = (G.gold||0) + 6;
      addNarration('', G.lastResult, 'success');
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: function() {
      G.lastResult = 'The transcription bench is set into the steward\'s alcove with a half-wall on the ration-court side, which is enough to block any reading angle from outside the alcove. You wait at the alcove opening for the steward to turn for a fresh inkwell. He does not turn. The dome auxiliary takes the running count to the alcove desk under his elbow and stays there until the certified volume is closed. The certified volume goes into the courier sleeve and the courier is already at the threshold.';
      G.recentOutcomeType = 'complication';
      addNarration('', G.lastResult, 'complication');
      if (typeof saveGame === 'function') saveGame();
    }
  },

  {
    id: 's2_aurora_4',
    label: 'The observatory shutter log shows sealed entries during broadcast hours.',
    skill: 'wits',
    tag: 'risky',
    tags: ['Aurora', 'Evidence', 'Lore'],
    roll: { dc: 13 },
    fn: function() {
      G.lastResult = 'The observatory shutter is opened on the broadcast schedule — celestial readings are paced by the dome\'s clear-sky window posting, which is publicly logged. The shutter log records every open and close to the quarter-mark. You cross-read the broadcast schedule against the shutter log for the past two cycles. Six broadcast hours show the shutter logged as sealed at the time of the broadcast. A sealed shutter during broadcast means the broadcast was conducted with no celestial reading — fabricated or pre-recorded. The dome\'s public readings for those hours are in the archive. They show clear-sky data.';
      G.recentOutcomeType = 'success';
      gainXp(15);
      addJournal('Aurora observatory: six broadcast hours conducted with shutter sealed. Public readings show clear-sky data inconsistent with sealed-shutter state. Broadcasts fabricated or pre-recorded.', 'evidence');
      G.gold = (G.gold||0) + 6;
      addNarration('', G.lastResult, 'success');
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: function() {
      G.lastResult = 'The shutter log is kept on the observation deck and the deck is closed to the public during the broadcast queue. The dome auxiliary at the deck gate accepts cross-reference requests on a posted schedule, none of which are this hour. The broadcast schedule itself is posted at the dome plaza but the cross-reference requires both volumes in the same hand, which is not granted to standing visitors. You leave the gate. The auxiliary marks the request denial in his ledger without your name.';
      G.recentOutcomeType = 'complication';
      addNarration('', G.lastResult, 'complication');
      if (typeof saveGame === 'function') saveGame();
    }
  },

  {
    id: 's2_aurora_5',
    label: 'A drift marker has been moved. Someone is hiding how far the floor has shifted.',
    skill: 'spirit',
    tag: 'bold',
    tags: ['Aurora', 'Evidence', 'Discovery'],
    roll: { dc: 16 },
    fn: function() {
      G.lastResult = 'The drift markers are iron pins driven into the bedrock through the dome floor — survey references for the dome\'s structural calibration. The pin at the northwest survey station is set into a patch of concrete that is paler than the surrounding floor, with the cure-edge still visible. The original pin location is three handspans to the east, marked by the bolt-hole that was filled and ground flat. The drift the moved pin conceals is enough that the dome\'s recorded shift rate, if calculated against true bedrock, would exceed the safe-occupancy threshold posted in the Sheresh steward manuals.';
      G.recentOutcomeType = 'success';
      gainXp(20);
      addJournal('Aurora Crown: northwest drift marker relocated and concrete patched. Concealed drift exceeds safe-occupancy threshold per Sheresh steward manuals.', 'evidence');
      G.gold = (G.gold||0) + 8;
      addNarration('', G.lastResult, 'success');
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: function() {
      G.lastResult = 'The northwest survey station is a gated maintenance recess under a hinged floor plate at the dome\'s base. The plate is locked from beneath and the hinge has been recently oiled — a maintenance signature, not a public-access signature. You crouch over the plate long enough to confirm the lock, which is long enough that the dome auxiliary on watch rotation crosses your line of approach and asks whether you are looking for someone. You give the name of a researcher you read off the staff board. He nods. He waits for you to walk away.';
      G.recentOutcomeType = 'complication';
      addNarration('', G.lastResult, 'complication');
      if (typeof saveGame === 'function') saveGame();
    }
  },

  {
    id: 's2_aurora_6',
    label: 'The dome pressurization gauge reads inside the safe band, but the seal hum is wrong.',
    skill: 'spirit',
    tag: 'safe',
    tags: ['Aurora', 'Discovery'],
    roll: { dc: 12 },
    fn: function() {
      G.lastResult = 'The dome\'s pressure seals carry a low constant hum that sets the rhythm of dome life — a sound the residents stop hearing within a day of arrival. You have only been here long enough to still hear it. The hum at the south-arc seal is a quarter-tone flat against the other three. The pressurization gauge mounted beside the seal reads inside the safe band. Gauges are calibrated against the seals they sit beside. A flat hum and a green gauge mean the gauge has been recalibrated to a degraded seal, not that the seal is sound. The recalibration plate is recent.';
      G.recentOutcomeType = 'success';
      gainXp(15);
      addJournal('Aurora Crown: south-arc pressure seal degraded; gauge recalibrated to mask the drop. Recalibration plate recent. Dome reading green against compromised hardware.', 'evidence');
      G.gold = (G.gold||0) + 5;
      addNarration('', G.lastResult, 'success');
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: function() {
      G.lastResult = 'The seal hum is constant enough that you cannot hold it against the others without a second listening point, and the dome layout puts the next seal at the far quadrant past two staffed corridors. You start across, lose the south-arc tone before you have walked twenty paces, and reach the north-arc seal with no clean comparison left in your ear. The dome residents passing you do not hear what you almost heard. The hum becomes background to you too, by the time you reach the gauge.';
      G.recentOutcomeType = 'complication';
      addNarration('', G.lastResult, 'complication');
      if (typeof saveGame === 'function') saveGame();
    }
  }
];

window.STAGE2_ENRICHED_CHOICES = STAGE2_ENRICHED_CHOICES;

// Dedicated locality exports — the generic pool serves shelkopolis/fairhaven/etc.
// These ensure guildheart/mimolot/glasswake/soreheim/aurora/shirshal get their own pool
// so the seen-dedup reset fires correctly even if choices were consumed at another locality.
window.GUILDHEART_STAGE2_ENRICHED_CHOICES   = STAGE2_ENRICHED_CHOICES.filter(function(c){ return c && c.id && c.id.indexOf('s2_guildheart_') === 0; });
window.MIMOLOT_STAGE2_ENRICHED_CHOICES      = STAGE2_ENRICHED_CHOICES.filter(function(c){ return c && c.id && c.id.indexOf('s2_mimolot_') === 0; });
window.GLASSWAKE_COMMUNE_STAGE2_ENRICHED_CHOICES = STAGE2_ENRICHED_CHOICES.filter(function(c){ return c && c.id && c.id.indexOf('s2_glasswake_') === 0; });
window.SOREHEIM_STAGE2_ENRICHED_CHOICES     = STAGE2_ENRICHED_CHOICES.filter(function(c){ return c && c.id && c.id.indexOf('s2_soreheim_') === 0; });
window.AURORA_STAGE2_ENRICHED_CHOICES       = STAGE2_ENRICHED_CHOICES.filter(function(c){ return c && c.id && c.id.indexOf('s2_aurora_') === 0; });
window.SHIRSHAL_STAGE2_ENRICHED_CHOICES     = STAGE2_ENRICHED_CHOICES.filter(function(c){ return c && c.id && c.id.indexOf('s2_shirshal_') === 0; });
