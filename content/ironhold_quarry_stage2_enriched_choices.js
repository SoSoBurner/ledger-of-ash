/**
 * IRONHOLD QUARRY STAGE 2 ENRICHED CHOICES
 * Investigation arc: ORE ore extraction cover / suppression compound mineral precursor sourcing
 * NPCs: Darian Ironspike (Ore Officer), Velka Ironspike (Quarry Overseer)
 */

const IRONHOLD_QUARRY_STAGE2_ENRICHED_CHOICES = [

  {
    label: "Darian Ironspike commands the Quarry Gate — a specific ore extraction category has been logged as 'special mineral assessment' for six months without any corresponding assay reports.",
    tags: ['Investigation', 'Stage2', 'Meaningful'],
    xpReward: 74,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'investigating special mineral assessment logs with Darian Ironspike');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('might', (G.skills.combat||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_darian_ironspike_quarry = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `Darian holds the pressure longer than expected — fourteen minutes at the gate before his posture shifts. He doesn't raise his voice. He confirms it quietly, to the tally board rather than to you. The "special mineral assessment" category was written by Captain Roaz of ORE Supreme Command to cover extraction of glyph-resonant compounds from veins the quarry's standard assay process would never flag. Those compounds are the primary precursor in the suppression formula. Ironhold is where it starts.`;
        addJournal('Ironhold Quarry: ORE Supreme Command extracting glyph-resonant minerals — raw material source confirmed', 'evidence', `iron-darian-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `Darian reads the approach before you reach the gate. He doesn't speak. He signals to the secondary guard and the detention order is written before you've finished your first sentence. Six hours in the quarry's holding room — a concrete equipment alcove with a locked exterior door and dust on the floor. No charge filed. Released without documentation at shift change. Whatever you had on Darian before this conversation, he now has a record of you on his.`;
        addJournal('ORE command detention — held 6 hours at quarry gate', 'complication', `iron-darian-fail-${G.dayCount}`);
      } else {
        G.flags.met_darian_ironspike_quarry = true;
        G.investigationProgress++;
        G.lastResult = `Darian answers at the gate without stepping aside. "Certain extractions run under ORE Supreme Command classification. Assay reports aren't generated at site level for classified categories." His tone is procedure, not explanation. The classification is real — the paperwork exists somewhere in the ORE command chain, inaccessible at Ironhold. What it's protecting here is another question.`;
        addJournal('Special mineral extraction under ORE command classification — no local assay required', 'evidence', `iron-darian-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Velka Ironspike oversees the labor zone — workers in the special extraction section have been experiencing symptoms similar to the Unity Square exposure cluster.",
    tags: ['NPC', 'Survival', 'Stage2', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'investigating worker exposure symptoms with Quarry Overseer Velka Ironspike');


      const result = rollD20('vigor', (G.skills.survival||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_velka_ironspike = true;
        G.investigationProgress++;
        G.lastResult = `Velka has kept a separate injury log alongside the extraction log — three months of documented symptoms in the special extraction crew. Cognitive lag, slowed response, one worker who started losing shifts to disorientation. She filed safety reports through the standard channel. All three were reclassified as "environmental adjustment period" by ORE safety oversight within a week of submission. The workers pulling the special mineral are accumulating damage from direct glyph resonance exposure. Velka sets the injury log on the table and steps back. She doesn't need persuasion to cooperate.`;
        addJournal('Quarry workers harmed by glyph mineral extraction — ORE safety reports reclassified, Velka cooperates', 'evidence', `iron-velka-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Velka has the reports in her desk but the moment she filed them through the official channel they were reclassified under ORE operational records. Sharing classified safety documentation without command authorization is a termination offence and potentially worse. She keeps her hands flat on the desk. "I know what's in them. I can't hand you what's no longer mine to give." The reports exist. Reaching them requires a different route.`;
        addJournal('ORE classified safety records — command authorization required', 'complication', `iron-velka-fail-${G.dayCount}`);
      } else {
        G.flags.met_velka_ironspike = true;
        G.investigationProgress++;
        G.lastResult = `Velka describes the pattern without looking at her notes — she has it committed to recall. Cognitive lag in the first week, reduced response time through the second, respiratory symptoms emerging in the third month of rotation. "Three safety reports filed. All three came back reclassified. I write them again, they vanish again." She doesn't raise her voice. The repetition has moved past frustration into something colder.`;        addJournal('Worker cognitive symptoms in special extraction zone — safety reports reclassified', 'evidence', `iron-velka-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The special extraction vein can be accessed during the night shift handover — examine the raw mineral for confirmation of glyph-resonant properties.",
    tags: ['Investigation', 'Stealth', 'Stage2', 'Meaningful'],
    xpReward: 78,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(78, 'examining special extraction vein during shift handover');

      if (!G.worldClocks) G.worldClocks = {};

      const result = rollD20('finesse', (G.skills.stealth||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `At the vein face during shift handover, in the four minutes when neither crew is present: the mineral layer carries a faint luminescence that isn't bioluminescence or mineral oxidation. Glyph pressure residue — the signature of a natural resonance amplifier. The mineral structure matches Toman Iceveil's glasswake research exactly, the same amplifier profile the suppression compounds depend on. A sample comes away cleanly. Physical evidence of the supply chain's starting point, in hand.`;
        addJournal('Glyph-resonant mineral sample obtained — matches Iceveil research amplifier profile', 'evidence', `iron-vein-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `The vein is less stable than it reads from the approach side. Contact triggers a glyph pressure release — a crack of displaced resonance energy, visible as a pale flash in the dark extraction alcove. Audible at the shed line. Security arrives within two minutes. You're already out of the alcove but not far enough. Your presence in the restricted section is logged and the discharge will require a formal incident report. Two watchfulness events: the security record and whatever ORE command makes of the report.`;
        addJournal('Glyph discharge from unstabilized vein — quarry security alerted, presence known', 'complication', `iron-vein-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.lastResult = `The handover window is narrower than expected — a supervisor doubles back. Enough time to get eyes on the vein face: the glyph resonance signature is unmistakable, a pressure-field edge around the mineral layer that registers clearly. Not enough time to take a sample safely before the next crew arrives. The resonance confirms the mineral profile. The physical evidence stays in the ground.`;
        addJournal('Glyph resonance vein confirmed — no sample extracted safely', 'evidence', `iron-vein-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Darian Ironspike is at the secondary gate post — the detention record from the last encounter sits between you. He has something he didn't say then.",
    tags: ['Stage2', 'NPC', 'Escalation'],
    xpReward: 76,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(76, 'pressing Darian Ironspike at the secondary gate for the second time');

      if (!G.worldClocks) G.worldClocks = {};

      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_darian_ironspike_quarry = true;
        G.flags.darian_second_encounter = true;
        G.investigationProgress++;
        G.lastResult = `Darian pulls the detention record from his coat and sets it on the post shelf rather than in his pocket. "This stays here." He doesn't explain. He tells you that the special extraction order came with a transport directive — the classified mineral doesn't go to the nearest ORE processing station. It moves under a separate manifest, flagged for an ORE Supreme Command intake point in the capital. No site-level custody transfer documented. The chain ends before it can be traced from Ironhold. He folds his hands on the shelf and doesn't look away.`;
        addJournal('Ironhold classified mineral routed to ORE Supreme Command capital intake — transport chain breaks at source', 'evidence', `iron-darian2-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `Darian reads the approach as a provocation. He picks up the detention record and files it in the post log rather than his pocket — now it's formal, not discretionary. "You've been at this gate twice. The third time I write an ORE security referral." He means it. Whatever he might have said in a different register is gone. The detention record is now a pattern, not an incident.`;
        addJournal('Darian escalated — second approach logged, ORE security referral threatened', 'complication', `iron-darian2-fail-${G.dayCount}`);
      } else {
        G.flags.met_darian_ironspike_quarry = true;
        G.flags.darian_second_encounter = true;
        G.investigationProgress++;
        G.lastResult = `Darian keeps his hands on the post shelf. He confirms one thing without being asked twice: the classified mineral doesn't move through the standard ORE processing chain. Where it goes is above his authorization to know. "Classification at that level doesn't come from the quarry. It doesn't come from this territory." He says it to the shelf. The detention record stays in his coat.`;
        addJournal('Classified mineral bypasses local ORE processing — capital-level authorization confirmed', 'evidence', `iron-darian2-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The special assessment section is accessible during the midday shift break — the extraction face and the ore staging area both visible from the ridge above the lower vein.",
    tags: ['Stage2', 'Physical', 'Survival'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'observing the special assessment section from the ridge during midday break');

      if (!G.worldClocks) G.worldClocks = {};

      const result = rollD20('vigor', (G.skills.survival||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        G.flags.special_assessment_observed = true;
        G.lastResult = `From the ridge the full layout is readable: a standard ore staging area, and forty meters along the lower vein face, a separate bay with its own manifest board and a different color of marker flag on the extraction posts. No mixed loads — the special assessment ore is sorted at extraction, not at the weighing station. Three workers assigned to it at any one time, rotating faster than the standard crew. The transport dock at the bay's far end has no ORE insignia. Whatever moves ore out of that bay doesn't leave a standard manifest.`;
        addJournal('Special assessment bay isolated at extraction point — separate transport dock, no ORE manifest markings', 'evidence', `iron-assess-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `The ridge path is less stable than the quarry's surface maps suggest. A loose section gives way on the descent — audible from the lower work area. A guard at the staging perimeter looks up and marks the position. No immediate response, but the ridge is now a noted approach. The special assessment bay is visible only partially from the position reached before the slide. The transport dock is obscured by the ore screening wall.`;
        addJournal('Ridge approach to special assessment bay marked by quarry security', 'complication', `iron-assess-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.flags.special_assessment_observed = true;
        G.lastResult = `The midday break thins the crew enough to distinguish the two work areas. The special assessment bay runs its own color-coded marker flags, separate from the main extraction zone. The ore from that section doesn't go to the central weighing station — it moves directly to a dock at the far end of the lower vein. The dock is occupied during the break by a transport crew who don't wear quarry insignia.`;
        addJournal('Special assessment ore transported separately — crew with no quarry insignia, isolated dock', 'evidence', `iron-assess-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "A queue dispute at the ore weighing station — an outsider questioning the tally process in front of the crew is the fastest way to become the day's problem in Ironhold.",
    tags: ['Stage2', 'Social', 'Complication'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'navigating a labor-culture dispute at the weighing station');

      if (!G.worldClocks) G.worldClocks = {};

      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        G.flags.weighing_station_trust = true;
        G.lastResult = `The queue dispute is a tally discrepancy — a prison laborer's daily count is two units short, which means two units docked from his rations. The weighing station recorder isn't changing it. You don't challenge the recorder directly. You ask the recorder to read the tally aloud while the laborer counts his marks. The recorder reads it, the marks don't match, and three crew members watching hear the gap. The recorder corrects the entry without a word. The laborer doesn't thank you. He nods once. An engineer at the back of the queue tells you where the night tally supervisor takes his breaks.`;
        addJournal('Weighing station tally corrected publicly — engineer offers night supervisor location', 'intelligence', `iron-social-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The approach reads as a casual outsider treating Ironhold like a market dispute. The recorder doesn't engage. The crew around the station goes quiet in the specific way that means everyone is watching and no one will intervene. A guard supervisor arrives before the exchange can be reversed. "Weighing station isn't public space." You're moved off the floor. The laborer's tally isn't corrected. Two workers who might have spoken have now seen that talking to you comes with an audience.`;
        addJournal('Weighing station approach failed — read as outsider intrusion, guard supervisor involved', 'complication', `iron-social-fail-${G.dayCount}`);
      } else {
        G.lastResult = `The recorder closes the dispute before it opens — standard deflection, practiced enough to suggest it happens regularly. The laborer takes the short tally without pressing it. The crew around the station returns to their work. No escalation, but no ground gained either. The dispute ends the way most do here: in the recorder's favor, with everyone watching and no one surprised.`;
        addJournal('Weighing station dispute — recorder deflected, no ground gained', 'complication', `iron-social-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The dock crew eat alone and pay in script nobody at Ironhold recognizes.",
    tags: ['Stage2', 'Lore'],
    xpReward: 65,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(65, 'observing the off-manifest transport crew at the quarry canteen');
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.transport_crew_identified = true;
        G.investigationProgress++;
        G.stageProgress[2]++;
        G.lastResult = `The canteen cook keeps a cup of the foreign script behind the counter — he collects it as a novelty. He sets it on the table between you without being asked. The script is Shelkopolis ORE Supreme Command issue: treasury-backed, not trade scrip, used only by authorized capital personnel. The crew eating alone at the far table carry it as their only currency. They are not contractors. They are ORE command staff running the transport chain in plain work clothes.`;
        addJournal('Transport crew carry ORE Supreme Command treasury script — capital command staff in plain clothes', 'evidence', `iron-crew-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `One of the crew clocks your attention from across the canteen before you reach the counter. He says something to the others without looking away from you. The three of them stand and take their food to go. The cook watches them leave, then watches you, then turns back to his range without comment. The crew does not return during your time at Ironhold.`;
        addJournal('Transport crew spooked at canteen — group departed, returned no further', 'complication', `iron-crew-fail-${G.dayCount}`);
      } else {
        G.flags.transport_crew_identified = true;
        G.investigationProgress++;
        G.lastResult = `The script they pay with isn't local quarry scrip and isn't standard Soreheim trade tender. The cook accepts it with the practiced indifference of someone who's been doing so for months. You catch the denomination mark on one coin: a column-and-chain seal, Shelkopolis administrative issue. Whatever their stated affiliation, their pay comes from a capital account.`;
        addJournal('Transport crew pay from Shelkopolis administrative account — not local contractors', 'intelligence', `iron-crew-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The night tally supervisor eats alone at the secondary slope. He watches the dock.",
    tags: ['Stage2', 'Lore'],
    xpReward: 65,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(65, 'approaching the night tally supervisor at the secondary slope rest point');
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_night_tally_supervisor = true;
        G.investigationProgress++;
        G.stageProgress[2]++;
        G.lastResult = `The supervisor — Kael Drovish, a broad-shouldered man who rubs the back of his left hand against his thigh when he's deciding something — sits with his back to the slope. He has been watching the special assessment dock at the end of each break for two months. "That dock doesn't appear in my tally." He keeps his voice below the wind. "Nothing I log ever reaches it. Whatever moves out of there, it's not in my count and I can't make it be." He keeps rubbing his hand. He doesn't ask what you'll do with it.`;
        addJournal('Night tally supervisor Kael Drovish: special assessment dock excluded from all tally records', 'evidence', `iron-kael-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Drovish is on his break but not alone — a second supervisor has joined him at the slope base tonight, which doesn't happen on schedule. Both men look up when you approach. Drovish's jaw sets. "Break's closed." The second supervisor doesn't speak, just watches until you move off. Whatever the engineer at the weighing station told you about this spot, it's already been noted.`;
        addJournal('Night tally break interrupted — second supervisor present, approach flagged', 'complication', `iron-kael-fail-${G.dayCount}`);
      } else {
        G.flags.met_night_tally_supervisor = true;
        G.investigationProgress++;
        G.lastResult = `Drovish keeps his eyes on the secondary slope while you sit next to him. He confirms the dock at the far end of the special assessment bay runs its own manifest, separate from his count. "I asked about reconciling it once. Darian told me that section doesn't feed my ledger." He pauses. "I stopped asking. But I still look at the dock at every break."`;
        addJournal('Special assessment dock manifest separate from quarry tally — Drovish excluded by Darian order', 'evidence', `iron-kael-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The man rotating back onto the standard line has dust from the wrong vein still in his collar.",
    tags: ['Stage2', 'NPC', 'Social'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'approaching the rotated-off extraction worker on the standard line');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_extraction_worker = true;
        G.investigationProgress++;
        G.stageProgress[2]++;
        G.lastResult = `His name is Tor — he volunteers it without being asked, which is unusual here. He was on the special extraction crew for eight weeks and pulled off after his hands started going slow. Not shaking, just slow, like the signals delayed. He describes the extraction face: no standard safety chalk, no spray-line markers, no paired lift on the ore. Just a hammer and a canvas bag and a count called out by a man in a gray coat who never touched the mineral himself. "That coat wasn't quarry issue. I don't know whose it was." He rubs the back of his wrist and goes back to his work.`;
        addJournal('Extraction worker Tor describes no-safety extraction and unaffiliated supervisor in gray coat', 'evidence', `iron-worker-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Tor glances past you toward the section supervisor before you finish your first sentence. He turns back to his line and doesn't answer. A worker beside him shifts position to fill the gap between you. Neither speaks. The supervisor at the section head has already noted the conversation — he makes a mark on his clipboard that has nothing to do with the tally. Tor won't be approachable here again.`;
        addJournal('Extraction worker approach witnessed by section supervisor — source closed', 'complication', `iron-worker-fail-${G.dayCount}`);
      } else {
        G.flags.met_extraction_worker = true;
        G.investigationProgress++;
        G.lastResult = `Tor keeps his hands on the drill housing while he talks, like he needs to be demonstrably working. He confirms the rotation off: reassigned after cognitive slowdown, no incident report filed, no medical review offered. "They just moved me." He describes the extraction face as smaller than the standard vein — accessed through a secondary cut, no standard markers. He doesn't describe who supervised it. He goes quiet when another worker passes within earshot.`;
        addJournal('Rotated-off worker confirms unreported cognitive symptoms, no medical review, secondary cut extraction', 'intelligence', `iron-worker-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The weighing station engineer handles the standard ore. The special ore never reaches her scale.",
    tags: ['Stage2', 'Lore', 'NPC'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'speaking with the weighing station engineer about the missing ore flow');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_weighing_engineer = true;
        G.investigationProgress++;
        G.lastResult = `The engineer — Osta, short and deliberate, who taps her calibration rod against the scale frame when she's thinking — walked the intake route once at the start of her tenure to map every ore flow into her station. The special assessment section wasn't on her map. She asked about it. She was told it calibrates to a different standard, and that she should not include it in her daily reconciliation. "Different standard means no standard. No standard means no record. I've thought about that every day since." She sets the calibration rod down flat. She doesn't ask what you intend to do with it.`;
        addJournal('Weighing engineer Osta: special ore excluded from calibration record — no standard, no reconciliation', 'evidence', `iron-engineer-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Osta is mid-calibration when you approach and reads the interruption as a labor complaint — she gets them often. She waves you toward the dispute desk without looking up. By the time the context is clear she's already flagged a supervisor to manage the queue backup your stop created. The conversation ends before it starts. She goes back to her scale.`;
        addJournal('Weighing engineer approach failed — mistaken for labor dispute, supervisor flagged', 'complication', `iron-engineer-fail-${G.dayCount}`);
      } else {
        G.flags.met_weighing_engineer = true;
        G.investigationProgress++;
        G.lastResult = `Osta doesn't stop working while she talks. She confirms the gap directly: the special assessment section produces ore that doesn't arrive at her station. She doesn't know how it's weighed or whether it's weighed at all. "My reconciliation has a category called 'exempt flows.' I didn't name that category." She holds the calibration rod level and checks the readout. "It was already in the form when I arrived."`;
        addJournal('Special ore marked "exempt flows" in weighing station forms — pre-existing exclusion category', 'intelligence', `iron-engineer-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The canteen cook has been collecting those coins for six months. He knows exactly when the crew changed.",
    tags: ['Stage2', 'Lore', 'Observation'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'talking with the canteen cook about the transport crew composition and timeline');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_canteen_cook = true;
        G.investigationProgress++;
        G.lastResult = `The cook — Prael, barrel-chested, who wipes the same stretch of counter regardless of whether it's clean — spreads the coins on the pass-through ledge without being prompted. He has nine of them. He started collecting in the fourth month after the special dock crew first appeared. The first crew he describes as younger and noisier, a different composition entirely. Halfway through month two, that crew stopped coming and a quieter group replaced them. Same script, different faces. "The coins are the same. The men aren't." He points at the column-and-chain seal. "That's not a quarry mark. I've been here eleven years."`;
        addJournal('Cook Prael: transport crew changed personnel in month two — same script, different operatives', 'evidence', `iron-cook-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Prael is watching the dock crew table when you approach the counter, which means one of them is watching Prael when you reach him. The conversation doesn't happen. He takes your order, sets the bowl down, and keeps his eyes on the range. He doesn't acknowledge having coins behind the counter at all. The crew at the far table finishes their food and leaves before you do.`;
        addJournal('Canteen approach witnessed by transport crew — cook would not speak', 'complication', `iron-cook-fail-${G.dayCount}`);
      } else {
        G.flags.met_canteen_cook = true;
        G.investigationProgress++;
        G.lastResult = `Prael shows two coins — he doesn't spread the full collection. The column-and-chain seal is Shelkopolis administrative issue, he confirms that much. He tells you the crew first appeared in the autumn quarter. He doesn't volunteer the detail about personnel changes. He pockets the coins and goes back to the range. Something about the approach has made him careful.`;
        addJournal('Cook confirms transport crew present since autumn — Shelkopolis treasury coins, cook guarded', 'intelligence', `iron-cook-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Velka has a fourth safety report she hasn't filed. She's been waiting to see if someone would help her make it stick.",
    tags: ['Stage2', 'NPC', 'Craft'],
    xpReward: 76,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(76, 'collaborating with Velka Ironspike to structure an unfiled safety report');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('spirit', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.velka_fourth_report = true;
        G.flags.met_velka_ironspike = true;
        G.investigationProgress++;
        G.stageProgress[2]++;
        G.lastResult = `The draft is seven pages and names everything — the rotation schedule, the symptom timeline, the three reclassified reports with their original submission dates. What it lacks is the classification that prevents reclassification. You restructure the opening section as a public health notification under the quarry's labor agreement provisions rather than an ORE safety report — a different statutory category that ORE safety oversight cannot reclassify without a labor tribunal review. Velka reads the restructured opening twice. She uses her desk pen to initial the corner. "That's it. That's the one."`;
        addJournal('Velka fourth safety report restructured as labor health notification — reclassification-resistant filing complete', 'evidence', `iron-velka4-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The draft has a structural problem that isn't fixable from the outside: three of its evidentiary claims rest on the reclassified reports, which are now ORE property and can't be cited without triggering the same reclassification. Restructuring the report without access to the originals produces a filing that names symptoms but can't anchor them to the extraction process specifically. Velka holds the revised draft and says nothing for a long time. "It's not enough."`;
        addJournal('Fourth safety report restructuring failed — evidentiary chain depends on reclassified documents', 'complication', `iron-velka4-fail-${G.dayCount}`);
      } else {
        G.flags.velka_fourth_report = true;
        G.flags.met_velka_ironspike = true;
        G.investigationProgress++;
        G.lastResult = `The restructuring is partial — the labor health notification framing holds for the symptom documentation, but the extraction classification data needs a different statutory peg to survive review. Velka marks the sections that will hold and the sections that won't. "Half a report that survives is better than a whole one that disappears." She keeps the draft. She'll file the stable sections separately while you find the missing peg.`;
        addJournal('Fourth safety report partially restructured — symptom section stable, extraction evidence still needs anchoring', 'intelligence', `iron-velka4-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The schedule board shows two shifts. There are three crews clocking in.",
    tags: ['Stage2', 'Stealth', 'Lore'],
    xpReward: 74,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'cross-referencing the shift schedule against the section entry log');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('finesse', (G.skills.stealth||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        G.flags.third_shift_located = true;
        G.lastResult = `The section entry log uses a different numbering sequence from the shift schedule board — standard practice for multi-supervisor sections, which means they're not designed to reconcile. Cross-referencing them takes thirty minutes in the scheduling annex where the logs are kept, door closed, lamp low. The third shift starts at two hours past midnight and runs four hours. It appears in the section log as a maintenance category but uses production-grade entry codes. Seven workers clocking in under a supervisor designation that doesn't appear on any posted staff list. The supervisor's code begins with the same prefix as the ORE Supreme Command transport crew's work orders.`;
        addJournal('Third shift at Ironhold: 2am–6am, 7 workers under unlisted supervisor — ORE command prefix in entry log', 'evidence', `iron-shift-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `The scheduling annex has a lamp on when it should be empty — someone is working late on the reconciliation. You're in the doorway before you see her. She sees you at the same moment. Neither speaks for three seconds. Then she calls for a guard from the interior corridor. The entry log is on the desk in plain view but unreachable. The annex is noted as a security area from the following shift onward.`;
        addJournal('Scheduling annex approach discovered — log seen but unreachable, annex secured', 'complication', `iron-shift-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.flags.third_shift_located = true;
        G.lastResult = `The discrepancy is visible without the full cross-reference: the section entry log has rows that don't correspond to posted shift slots, logged under a maintenance heading that uses production codes. The supervisor designation on those rows is a number string, not a name. No time to trace the string to a personnel file before the annex closes for shift changeover. The third shift exists. Its supervisor's identity is still in the log.`;
        addJournal('Third shift confirmed in section entry log — supervisor listed by number code only', 'intelligence', `iron-shift-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The quarry infirmary keeps a log the safety office never sees.",
    tags: ['Stage2', 'Lore'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'reading the quarry infirmary admissions log');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.infirmary_log_read = true;
        G.investigationProgress++;
        G.lastResult = `The infirmary orderly keeps two ledgers — one that routes to safety oversight, one that stays at the desk. The desk ledger has fourteen entries for the special extraction crew over four months. Cause of admission is listed as "rotation fatigue" across every entry, regardless of symptom. The orderly circles the words with a fingernail rather than a pen. "Fatigue doesn't make your hands stop tracking what your eyes see." He closes the ledger and replaces it under the counter. The entries match Velka's injury log exactly, week for week.`;
        addJournal('Infirmary desk ledger: 14 special extraction crew admissions — cause falsified as rotation fatigue', 'evidence', `iron-infirmary-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The infirmary is staffed by two orderlies during the midday window and neither one reads an approach from outside the extraction crew as legitimate. The ledger desk closes when you enter. One orderly asks for a work card. The other stands between you and the counter shelving. The records stay below the counter and the orderlies stay in position until the infirmary bell marks the shift return.`;
        addJournal('Infirmary access refused — work card required, orderlies closed ledger desk', 'complication', `iron-infirmary-fail-${G.dayCount}`);
      } else {
        G.flags.infirmary_log_read = true;
        G.investigationProgress++;
        G.lastResult = `The orderly at the infirmary desk confirms admissions from the special extraction rotation without opening the ledger — he has the numbers committed. Eleven entries, four months. All logged as rotation fatigue. He does not offer the desk ledger but he does not step away from the counter either. "Rotation fatigue is the category I'm given. I write what I'm given." His hand rests flat on the closed ledger cover.`;
        addJournal('Infirmary confirms 11 extraction admissions logged as rotation fatigue — cause classification dictated', 'intelligence', `iron-infirmary-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The man in the gray coat Tor described has a position — he runs the secondary cut on a schedule no posted roster shows.",
    tags: ['Stage2', 'Stealth'],
    xpReward: 76,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(76, 'tracking the gray-coated extraction supervisor through the quarry site');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('finesse', (G.skills.stealth||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.gray_coat_supervisor_identified = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Three hours of site movement before he surfaces: a spare man in his fifties who wears the gray coat over quarry-standard trousers, which means the coat is not quarry-issue. He moves from the access tunnel mouth to the secondary cut bay without stopping at any crew station. He never picks up a tool. He reads from a folded paper at the bay entrance, makes a mark, and returns the way he came. The coat has a sleeve tab that's been removed — the stitching is still visible where a rank or institution badge was unpicked. Capital rank, stripped for fieldwork.`;
        addJournal('Gray coat supervisor identified: no crew stops, rank badge removed — capital operative running secondary cut', 'evidence', `iron-graycoat-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `The gray coat appears at the secondary cut access tunnel and then does not. He is either already inside or he clocked the trailing position before entering. Either way he comes out by a different route and by the time you reach the access mouth the tunnel is empty. A quarry security flag goes up at the eastern perimeter — someone called it in. The secondary cut access is restricted from the following shift onward.`;
        addJournal('Gray coat surveillance failed — secondary cut access restricted, security flag raised', 'complication', `iron-graycoat-fail-${G.dayCount}`);
      } else {
        G.flags.gray_coat_supervisor_identified = true;
        G.investigationProgress++;
        G.lastResult = `The gray coat crosses the main extraction floor twice during the observation window, both times moving toward the secondary cut bay. He does not stop to speak with quarry crew. He carries a folded paper in his left hand on both passes and returns without it — he leaves it at the bay, or passes it inside. No name visible. No insignia. His quarry access is clearly authorized: the gate guards track his movement without challenge.`;
        addJournal('Gray coat supervisor makes two runs to secondary cut bay — gate-authorized, no insignia visible', 'intelligence', `iron-graycoat-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The secondary cut is engineered differently from every other extraction face in the quarry.",
    tags: ['Stage2', 'Craft'],
    xpReward: 74,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'assessing the secondary cut excavation method from the access tunnel approach');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('spirit', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.secondary_cut_assessed = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The cut was made with resonance-damping tools — not percussion gear. The face shows the characteristic smooth-shear pattern of glyph-sensitive extraction: the kind used when the material must arrive intact rather than fractured. Standard quarry percussion would shatter the glyph-resonant mineral layer's crystalline structure and destroy its amplifier properties. Whoever designed this extraction knows exactly what the mineral does and why it must be handled undamaged. This is a research-specification extraction method, not a production one.`;
        addJournal('Secondary cut uses resonance-damping extraction — research-specification method preserving amplifier properties', 'evidence', `iron-cut-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The access tunnel mouth is visible from the eastern guard post — a positioning detail that is not on the site map you were using. Standing at the tunnel approach for long enough to assess the face geometry is long enough for the eastern guard to mark the position. He sends a second guard to verify. You are off the tunnel approach before they arrive but the location is now associated with your presence in the site movement log.`;
        addJournal('Secondary cut tunnel approach marked by eastern guard post — site movement log entry', 'complication', `iron-cut-fail-${G.dayCount}`);
      } else {
        G.flags.secondary_cut_assessed = true;
        G.investigationProgress++;
        G.lastResult = `The cut face is visible from the tunnel approach without entering the restricted zone. The shear pattern on the extraction wall is wrong for percussion tools — the face is too clean, the mineral layer too intact. Standard quarry work fractures the vein to sort usable material. Whatever is coming out of this cut arrives whole. The equipment visible inside the bay is not standard ORE extraction gear.`;
        addJournal('Secondary cut face shows non-percussion extraction method — equipment not standard ORE issue', 'intelligence', `iron-cut-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The transport dock closes for one hour at shift end. Someone signs the outbound manifest before it seals.",
    tags: ['Stage2', 'NPC', 'Social'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'approaching the transport dock signing officer at shift-end manifest close');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.dock_manifest_signatory_met = true;
        G.investigationProgress++;
        G.lastResult = `The signing officer is not quarry staff — she holds her pen at the wrong angle for someone who handles manifests daily, correcting mid-signature in the way of someone working in an unfamiliar format. She signs a block cipher rather than a name. You ask about the loading destination while she is still checking the form's column headers. She answers before she has time to not answer: the manifest routes to a receiving station in Shelk under a designation she reads from the form rather than reciting from memory. She stops. She does not elaborate. The manifest seals before you can read the destination block yourself.`;
        addJournal('Transport dock manifest signed by non-quarry officer — destination in Shelk, cipher signature, routes to capital receiving station', 'evidence', `iron-dock-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `The dock closes the public perimeter barrier at shift-end minus fifteen minutes — earlier than posted. The signing officer is already inside the barrier when you reach it. A dock handler at the gate shakes his head without speaking. The manifest signing happens behind a barrier you cannot see through, and the dock crew who would have been visible departing take an alternate route to the secondary transport bay. The early close is new.`;
        addJournal('Transport dock closed barrier early — manifest signing out of sight, crew took alternate exit', 'complication', `iron-dock-fail-${G.dayCount}`);
      } else {
        G.flags.dock_manifest_signatory_met = true;
        G.investigationProgress++;
        G.lastResult = `The signing officer acknowledges the approach but keeps the manifest folded against her chest while she works through the close-out process. She confirms the dock routes to a Shelk receiving station — she says it without inflection, as though it is public knowledge, which it is not. She doesn't confirm the station designation. She seals the manifest and hands it to the dock handler before you can ask a second question.`;
        addJournal('Dock signing officer confirms Shelk receiving station destination — no designation detail given', 'intelligence', `iron-dock-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Kael Drovish has been counting dock departures in a notebook he keeps in his coat.",
    tags: ['Stage2', 'Lore', 'NPC'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'returning to Kael Drovish at the secondary slope with his dock departure count');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.kael_departure_log = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Drovish pulls a small notebook from his coat — the kind used for personal tally work, spiral-bound, worn at the corners from being folded shut repeatedly. He has sixty-three entries: date, estimated load weight based on crew effort observed, and departure time. The weights trend upward over four months. The first month averaged five hundred weight units per departure. The most recent month averages nine hundred. The extraction rate has accelerated without any corresponding increase in the official quarry output log. He doesn't hand the notebook over. He reads the last entry aloud, slowly, so it can be written down.`;
        addJournal('Drovish departure log: 63 entries, output increased from 500 to 900 weight — acceleration not in official logs', 'evidence', `iron-kael2-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Drovish is not at the secondary slope for his break — his break time has shifted, which means either he changed it or someone changed it for him. A different supervisor occupies the slope position, and he looks up when you arrive with the specific attention of someone who was told to look. Drovish's notebook, wherever it is, stays there. The slope is not approachable again tonight.`;
        addJournal('Drovish break time shifted — replacement supervisor present, slope approach noted', 'complication', `iron-kael2-fail-${G.dayCount}`);
      } else {
        G.flags.kael_departure_log = true;
        G.investigationProgress++;
        G.lastResult = `Drovish shows two pages of the notebook — recent entries only. The departure weights are climbing. He doesn't know what the material is, only how much effort the dock crew puts into loading it, which he has been translating into approximate weight. "Four months ago they moved it in two men. Now it takes four." He closes the notebook and puts it away. He is watching the dock again before you finish writing.`;
        addJournal('Drovish departure weights increasing — crew loading effort doubled over four months', 'intelligence', `iron-kael2-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The prison labor intake supervisor assigns rotation to the special extraction crew. He has done it long enough to know the pattern.",
    tags: ['Stage2', 'NPC', 'Survival'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'pressing the prison labor intake supervisor on special extraction rotation assignments');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('vigor', (G.skills.survival||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.intake_supervisor_met = true;
        G.investigationProgress++;
        G.lastResult = `The intake supervisor — a lean man named Borek who keeps his assignment ledger closed with a leather strap even when he is actively using it — did not choose the rotation criteria for the special extraction crew. The criteria came to him written on an ORE command form: physical build above a threshold, no family contacts within three localities, no active legal appeals. He reads that last criterion aloud once and then reads it again. The workers assigned to the special extraction rotation have no one positioned to notice if they go missing. The criteria were designed for silence, not for labor efficiency.`;
        addJournal('Intake supervisor Borek: special extraction rotation criteria select for isolated workers — no family contacts, no active appeals', 'evidence', `iron-borek-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Borek reads the approach as a labor grievance being worked around the formal channel — he gets them routed this way often enough to have a procedure. He directs you to the ORE labor relations desk and closes his assignment ledger before you finish your first sentence. The labor relations desk is four buildings away and processes inquiries in writing, with a three-day response window. Borek's assignment decisions are not accessible through it.`;
        addJournal('Intake supervisor deflected inquiry to ORE labor relations — written process, three-day delay', 'complication', `iron-borek-fail-${G.dayCount}`);
      } else {
        G.flags.intake_supervisor_met = true;
        G.investigationProgress++;
        G.lastResult = `Borek acknowledges the special extraction rotation without opening the ledger. The assignment criteria are not his: they arrived in written form from the ORE command office. He applies them, he doesn't set them. "I match workers to the criteria. I don't write the criteria." He tightens the strap on the ledger. He knows what the criteria select for — the body type requirements and the contact restrictions together make a narrow group. He doesn't say that directly. He doesn't need to.`;
        addJournal('Intake supervisor confirms ORE command wrote extraction rotation criteria — Borek applies, does not set them', 'intelligence', `iron-borek-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The tool requisition shed issues equipment to every extraction crew. The special crew's requisition slips are filed separately.",
    tags: ['Stage2', 'Craft', 'Lore'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'examining the tool requisition records for the special extraction crew');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('spirit', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.tool_requisition_examined = true;
        G.investigationProgress++;
        G.lastResult = `The shed keeper — a methodical woman who sorts the returned tools by wear pattern before logging them — keeps the special crew's slips in a separate folder with a red edge tab, because the equipment they return doesn't match what a percussion extraction process would wear. The tool wear profiles show lateral shear stress rather than impact stress. The items returned intact are the ones that would be destroyed by standard quarry work. She sets the folder on the counter. "This is resonance-damping gear. I've seen it once before, at a research survey site outside Soreheim." She closes the folder and marks it back into the stack.`;
        addJournal('Tool shed: special crew returns resonance-damping gear, not percussion tools — shed keeper identifies research survey profile', 'evidence', `iron-tools-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The requisition records are filed in the ORE classified equipment category — the shed keeper shows you the cover of the folder and then the classification stamp on the inside cover. Accessing the contents requires an ORE equipment officer authorization, which routes through the same command chain that classified the special extraction category. The folder goes back in the stack. The shed keeper logs the inquiry in her access record.`;
        addJournal('Tool requisition records for special crew classified — ORE equipment officer authorization required, inquiry logged', 'complication', `iron-tools-fail-${G.dayCount}`);
      } else {
        G.flags.tool_requisition_examined = true;
        G.investigationProgress++;
        G.lastResult = `The shed keeper pulls the red-tabbed folder without being asked to explain the tab system. The slips show equipment types that don't appear in the standard quarry requisition catalog — she had to create new line items for them when they first arrived. The descriptions use a technical vocabulary she doesn't recognize from standard ORE procurement language. "I write down what I'm handed and I issue what's requested." She slides the folder back. The equipment description strings are visible long enough to copy two of them.`;
        addJournal('Tool shed folder shows non-catalog equipment types with unrecognized technical vocabulary — two descriptions copied', 'intelligence', `iron-tools-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The official quarry survey map omits the secondary cut entirely.",
    tags: ['Stage2', 'Stealth', 'Lore'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'comparing the posted quarry survey map against the physical site layout');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('finesse', (G.skills.stealth||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.survey_map_discrepancy_found = true;
        G.investigationProgress++;
        G.lastResult = `The survey map is posted in the main access corridor — a legal requirement for active extraction sites — and the secondary cut does not appear on it. Not labeled differently, not omitted by edge cropping: the physical geography at the cut's location is shown as unworked stone. The survey date is current. Someone reissued a false survey within the last quarter, replacing the accurate site map with one that shows the secondary cut bay as solid rock face. The map is a legal document. Whoever filed it committed a survey fraud under ORE extraction law and had the authority to get it posted without challenge.`;
        addJournal('Posted quarry survey omits secondary cut — false survey filed this quarter, site map is legal document fraud', 'evidence', `iron-map-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `The survey map is behind a safety glass panel in the access corridor, which means you cannot hold it or photograph the secondary cut area against your own notes without removing the panel. Removing the panel takes tools and time and creates noise. A quarry operations supervisor enters the corridor midway through the attempt. The panel is logged as tampered at the next shift inspection.`;
        addJournal('Survey map behind safety glass — tamper logged by quarry operations after panel approach', 'complication', `iron-map-fail-${G.dayCount}`);
      } else {
        G.flags.survey_map_discrepancy_found = true;
        G.investigationProgress++;
        G.lastResult = `The survey map shows the secondary cut area as unworked stone. Standing in the access corridor with the map visible and the secondary cut physically present behind the eastern partition — accessible, operating, producing ore — the discrepancy is unambiguous. The survey date is this quarter. The map was updated recently and the update removed the secondary cut from the official site record.`;
        addJournal('Survey map discrepancy confirmed: secondary cut physically present but removed from current survey filing', 'intelligence', `iron-map-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Stage 2 Ironhold Quarry finale — the raw material source is confirmed. Report through ORE command chain or route the evidence to the Roadwarden Ithtananalor post.",
    tags: ['Investigation', 'Finale', 'Stage2', 'Consequence', 'Meaningful'],
    xpReward: 104,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(104, 'Ironhold Quarry Stage 2 resolution');
      if (!G.investigationProgress || G.investigationProgress < 8) {
        G.lastResult = `The evidence chain at Ironhold isn't complete. Darian's classification, the mineral sample, Velka's safety reports — the pieces exist but they haven't been assembled into something that will hold under formal review. Acting now means acting on a partial record. The quarry keeps running in the meantime.`;
        G.recentOutcomeType = 'investigate'; return;
      }
      if (!G.worldClocks) G.worldClocks = {};

      const result = rollD20('vigor', (G.skills.survival||0) + Math.floor(G.level/2));
      if (result.total >= 14 || result.isCrit) {
        G.flags.stage2_finale_institutional = true;
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 3;
        G.lastResult = `Velka's injury logs, the mineral sample, and the extraction classification documents go to the Roadwarden post at Ithtananalor — delivered directly, bypassing the ORE command chain that owns the classification. The Roadwarden duty officer receives the package at the intake desk and reads the mineral assay first. The special extraction order at Ironhold is suspended pending supply chain review by end of the following day. Stage III opens with a Roadwarden review running parallel to whatever ORE command does next.`;
        addJournal('Ironhold S2 finale: Roadwarden supply chain investigation — special extraction suspended', 'evidence', `iron-finale-inst-${G.dayCount}`);
      } else {
        G.flags.stage2_finale_underworld = true;
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 3;
        G.lastResult = `The mineral sample and Velka's documentation go out through the Verdant Row network and the glasswake research community at the same time — simultaneous distribution, no single point to suppress. Within forty-eight hours the mineral profile is matched publicly against the suppression compound formula. Ironhold's extraction is named as the source material in every channel that matters. The Shadowhands can't contain what's already in circulation.`;
        addJournal('Ironhold S2 finale: mineral identification published — supply chain source material public', 'evidence', `iron-finale-uw-${G.dayCount}`);
      }
      G.flags.stage2_faction_contact_made = true;
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

];

window.IRONHOLD_QUARRY_STAGE2_ENRICHED_CHOICES = IRONHOLD_QUARRY_STAGE2_ENRICHED_CHOICES;
