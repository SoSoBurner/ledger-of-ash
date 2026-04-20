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
      const target = 12 + Math.max(0, G.worldClocks.threat);

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `You see through their deception—they're actually a refugee with genuine intelligence about safe passage.`;
        addJournal('alliance', 'Trader contact established', `trader-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.threat++;
        G.lastResult = `You're too trusting. The maps are forgeries designed to lead travelers astray.`;
        addJournal('complication', 'Misled by false information', `false-maps-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `The trader offers partial information—some is useful, some is suspect.`;
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
        G.lastResult = `You navigate the terrain flawlessly, discovering a hidden supply cache.`;
        addJournal('discovery', 'Supply cache found', `cache-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `The terrain proves treacherous. You lose supplies and gain an injury.`;
        addJournal('setback', 'Terrain damage', `injury-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You make it through safely, though it takes longer than expected.`;
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
        G.lastResult = `The captain respects your honesty and grants passage freely.`;
        addJournal('alliance', 'Ferry master favor', `ferry-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `The captain offended, refuses passage and spreads word against you.`;
        addJournal('complication', 'Reputation damage', `rep-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `Neutral negotiation—you pay slightly inflated coin but cross without issue.`;
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
        G.lastResult = `You detect recent tracks and deduce the camp's occupants are friendly scouts.`;
        addJournal('alliance', 'Scout network mapped', `scouts-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.threat++;
        G.lastResult = `Approaching darkness and you're ambushed by the camp's actual owners.`;
        addJournal('combat', 'Ambush encounter', `ambush-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You rest cautiously, finding the camp abandoned and safe.`;
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
        G.lastResult = `You intervene brilliantly. The messenger is saved and becomes a valuable contact.`;
        addJournal('ally', 'Messenger alliance forged', `messenger-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `Your intervention fails—the messenger is captured and riders recognize you.`;
        addJournal('consequence', 'Wanted status rising', `wanted-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You help the messenger escape, though riders get a glimpse of you.`;
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
        G.lastResult = `You hide them from authorities and earn fierce loyalty. They're a refugee scholar.`;
        addJournal('companion', 'Scholar joined', `scholar-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.threat++;
        G.lastResult = `Your deception is transparent. You're both questioned and detained briefly.`;
        addJournal('complication', 'Authority suspicion', `authority-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You quietly help them move on. No commitment, but a future contact made.`;
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
        G.lastResult = `You recognize the lights as protective runes marking a safe waypoint.`;
        addJournal('discovery', 'Safe waypoint found', `waypoint-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `The lights are a trap—bandits use them to lure travelers.`;
        addJournal('combat', 'Bandit trap', `trap-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You keep distance and observe. The lights fade, but you note the location.`;
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
        G.lastResult = `You traverse it flawlessly and reach your destination early, gaining valuable knowledge.`;
        addJournal('route', 'Secret passage mapped', `secret-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.threat++;
        G.lastResult = `The terrain is forbidden for a reason—territorial creatures attack you.`;
        addJournal('combat', 'Territorial encounter', `terr-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You traverse it successfully but barely, reaching destination with no time to spare.`;
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
        G.lastResult = `You reconnect warmly. They're fleeing the same things you are.`;
        addJournal('ally', 'Hometown connection renewed', `hometown-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `They report your location to authorities seeking you.`;
        addJournal('threat', 'Location compromised', `loc-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `Cautious reunion. You exchange information but part ways carefully.`;
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
        G.lastResult = `You help them and gather crucial intelligence about what happened.`;
        addJournal('intelligence', 'Disaster intelligence gathered', `disaster-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `Your help draws too much attention from official channels.`;
        addJournal('complication', 'Official scrutiny', `scrutiny-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You provide basic aid and gain general information about regional instability.`;
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
        G.lastResult = `You negotiate a favorable arrangement with clear boundaries.`;
        addJournal('faction', 'Alliance negotiated', `faction-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `The envoy interprets your hesitation as hostility. Relations worsen.`;
        addJournal('conflict', 'Faction hostility', `host-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You make a non-binding agreement to hear them out further.`;
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
        G.lastResult = `You play them against each other, securing benefits from both without commitment.`;
        addJournal('faction', 'Double negotiation success', `double-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `Your manipulation is discovered. Both factions now distrust you.`;
        addJournal('complication', 'Factional suspicion', `susp-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You choose one cautiously, gaining an ally but making an enemy.`;
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
        G.lastResult = `You refuse persuasively, and the faction respects your moral stance.`;
        addJournal('ethics', 'Moral boundary upheld', `moral-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `Your refusal is seen as weakness. The faction marks you as unreliable.`;
        addJournal('threat', 'Faction displeasure', `disp-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You negotiate an alternative that satisfies neither party but keeps peace.`;
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
      const target = 13 + Math.max(0, G.worldClocks.threat);

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `You infiltrate unseen and gather valuable intelligence.`;
        addJournal('intelligence', 'Safehouse intelligence', `safe-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.threat++;
        G.lastResult = `You're caught infiltrating. The faction now actively hunts you.`;
        addJournal('threat', 'Active faction pursuit', `pursue-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You observe carefully and learn the location, gaining future leverage.`;
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
        G.lastResult = `You help them escape flawlessly. They become a valuable insider source.`;
        addJournal('spy', 'Defector asset acquired', `defect-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `The escape is compromised. The faction traces them back to you.`;
        addJournal('threat', 'Defection traced', `traced-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You help them partially. Some information leaks, but they survive.`;
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
        G.lastResult = `You mediate brilliantly, reducing faction tension and earning deep trust.`;
        addJournal('faction', 'Internal mediation successful', `med-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `Your mediation fails spectacularly, worsening the internal conflict.`;
        addJournal('complication', 'Mediation failure', `med-fail-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You achieve partial peace, showing competence but not brilliance.`;
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
        G.lastResult = `You deduce the killer's identity and find clues about a rival faction plot.`;
        addJournal('intelligence', 'Operative assassination solved', `death-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.threat++;
        G.lastResult = `The real killer spots you and now considers you a threat.`;
        addJournal('threat', 'Killer attention gained', `killer-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You investigate discreetly and learn the death was recent and likely political.`;
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
      const target = 12 + Math.max(0, G.worldClocks.threat);

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `You establish an effective spy network without drawing suspicion.`;
        addJournal('espionage', 'Spy network established', `spy-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `Your spying is discovered. Neighboring region now has leverage on you.`;
        addJournal('complication', 'Espionage discovered', `espy-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You establish limited connections with careful tradecraft.`;
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
        G.lastResult = `You find the real thief. Your loyalty is now unquestionable.`;
        addJournal('faction', 'Innocence proven, loyalty gained', `loyal-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `Your investigation reveals you had motive. Suspicion deepens.`;
        addJournal('threat', 'Suspicion escalated', `susp-esc-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You find inconclusive evidence. Suspicion diminishes but lingers.`;
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
        G.lastResult = `You see their fear and understand. The deception was born of necessity. Trust deepens.`;
        addJournal('companion', 'Deep trust forged', `trust-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `Your confrontation hardens them. They withdraw emotionally.`;
        addJournal('complication', 'Companion distance', `dist-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You accept the explanation cautiously. The relationship continues but shifts.`;
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
        G.lastResult = `You convince them to delay their vendetta. Loyalty to the group strengthens.`;
        addJournal('companion', 'Companion convinced to stay', `stay-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `Your words feel hollow. They leave resentfully and take crucial supplies.`;
        addJournal('loss', 'Companion departure', `dep-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `They agree to a compromise—a temporary delay before pursuing their path.`;
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
        G.lastResult = `Your selfless care heals them and earns unwavering loyalty.`;
        addJournal('companion', 'Care strengthens bond', `care-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `You bargain too hard; the apothecary withholds care, injury worsens.`;
        addJournal('setback', 'Negotiation failure', `neg-fail-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You find a middle path. Companion recovers slowly but adequately.`;
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
        G.lastResult = `You find a third path that honors both values. Group unity strengthens.`;
        addJournal('companion', 'Group harmony achieved', `harm-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `Your mediation fails. One companion leaves and tension rises.`;
        addJournal('conflict', 'Companion conflict', `conf-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You broker an uneasy compromise. Both companions accept reluctantly.`;
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
        G.lastResult = `You isolate them carefully and administer cure. They recover. Loyalty is absolute.`;
        addJournal('companion', 'Companion healed, loyalty absolute', `heal-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `Your care fails. The companion dies, and others contract the illness.`;
        addJournal('loss', 'Companion death, contagion spreads', `death-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You isolate them and provide comfort. They survive but are weakened long-term.`;
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
      const target = 13 + Math.max(0, G.worldClocks.threat);

      if (result.isCrit) {
        G.stageProgress[2]++;
        G.lastResult = `You engineer a brilliant rescue. Companion's loyalty is unbreakable.`;
        addJournal('companion', 'Family rescued, loyalty unbreakable', `fam-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `The rescue attempt fails and draws authority attention to your group.`;
        addJournal('threat', 'Authority pursuit heightened', `auth-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You attempt rescue but the family member escapes on their own during the chaos.`;
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
        G.lastResult = `You understand their sacrifice fully and honor it publicly. Their role in the group transforms.`;
        addJournal('companion', 'Sacrifice publicly honored', `hon-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `You misinterpret their sacrifice as betrayal and confront them harshly.`;
        addJournal('conflict', 'Misunderstood sacrifice', `misund-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You recognize their sacrifice and acknowledge it quietly. The bond deepens privately.`;
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
        G.lastResult = `You see how their loyalty transformed over time. Forgiveness opens deeper trust.`;
        addJournal('companion', 'Betrayal forgiven, trust renewed', `forg-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `Your retaliation is harsh. The companion leaves and becomes a rival.`;
        addJournal('loss', 'Companion becomes rival', `rival-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You distance yourself cautiously. The companion accepts the boundaries.`;
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
        G.lastResult = `You negotiate a fair price for detailed, verified maps.`;
        addJournal('intelligence', 'Route maps acquired', `maps-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `Your tough negotiation offends the scout. They give false information.`;
        addJournal('complication', 'Misinformed', `misinf-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You acquire basic route information without overpaying.`;
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
        G.lastResult = `You decode the messages and understand the full restriction strategy.`;
        addJournal('intelligence', 'Institutional strategy decoded', `decode-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.threat++;
        G.lastResult = `The message is trapped. Your attempt to decode alerts the sender.`;
        addJournal('threat', 'Interception detected', `det-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You partially decode the messages and understand some restrictions.`;
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
        G.lastResult = `You hide the spy effectively and gain valuable institutional intelligence.`;
        addJournal('spy', 'Institutional spy asset acquired', `spy-asset-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `The spy's location is discovered. You're implicated as an accomplice.`;
        addJournal('threat', 'Accomplice status', `accomp-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You shelter the spy cautiously and exchange limited information.`;
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
        G.lastResult = `You follow undetected and uncover a major institutional objective.`;
        addJournal('intelligence', 'Institutional objective revealed', `obj-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.threat++;
        G.lastResult = `You're spotted. The officials now know they're being tracked.`;
        addJournal('threat', 'Observation discovered', `obs-disc-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You follow them to a meeting. You don't learn the objective but note the location.`;
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
        G.lastResult = `You establish a strong alliance. The scout network becomes a major advantage.`;
        addJournal('network', 'Scout network integrated', `net-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `You overcommit and the scouts realize you can't honor your promise.`;
        addJournal('complication', 'Network broken trust', `break-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You establish a limited network. Some information flows, but not consistently.`;
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
        G.lastResult = `You decrypt the documents and uncover a major conspiracy.`;
        addJournal('intelligence', 'Conspiracy uncovered', `cons-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `Your investigation draws the killer's attention. You're now hunted.`;
        addJournal('threat', 'Killer attention', `killer-att-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You decrypt partially and learn valuable routing information.`;
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
        G.lastResult = `You access and extract crucial intelligence before lockdown completes.`;
        addJournal('intelligence', 'Archives breached successfully', `breach-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure++;
        G.lastResult = `You're trapped in the lockdown. Authorities identify you.`;
        addJournal('threat', 'Archive trap discovery', `trap-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You access limited information before narrowly escaping lockdown.`;
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
        G.lastResult = `You negotiate strong protection and immunity in exchange for powerful testimony.`;
        addJournal('legal', 'Protected witness status', `prot-wit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.threat++;
        G.lastResult = `Officials learn of the testimony and attempt to silence you.`;
        addJournal('threat', 'Official retaliation', `ret-${G.dayCount}`);
      } else {
        G.stageProgress[2]++;
        G.lastResult = `You agree to testify with limited protection. It's recorded but not immediate.`;
        addJournal('legal', 'Conditional testimony', `cond-test-${G.dayCount}`);
      }

      G.recentOutcomeType = 'intelligence';
      maybeStageAdvance();
    }
  }
];
