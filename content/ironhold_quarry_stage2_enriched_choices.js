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
