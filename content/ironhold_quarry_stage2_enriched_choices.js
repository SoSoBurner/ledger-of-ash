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
        G.lastResult = `Velka's injury logs, the mineral sample, and the extraction classification documents go to the Roadwarden post at Ithtananalor — delivered directly, bypassing the ORE command chain that owns the classification. The Roadwarden duty officer receives the package at the intake desk and reads the mineral assay first. The special extraction order at Ironhold is suspended pending supply chain review by end of the following day. Stage III opens with a Roadwarden investigation running parallel to whatever ORE command does next.`;
        addJournal('Ironhold S2 finale: Roadwarden supply chain investigation — special extraction suspended', 'evidence', `iron-finale-inst-${G.dayCount}`);
      } else {
        G.flags.stage2_finale_underworld = true;
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 3;
        G.lastResult = `The mineral sample and Velka's documentation go out through the Verdant Row network and the glasswake research community at the same time — simultaneous distribution, no single point to suppress. Within forty-eight hours the mineral profile is matched publicly against the suppression compound formula. Ironhold's extraction is named as the source material in every investigative channel that matters. The Shadowhands can't contain what's already in circulation.`;
        addJournal('Ironhold S2 finale: mineral identification published — supply chain source material public', 'evidence', `iron-finale-uw-${G.dayCount}`);
      }
      G.flags.stage2_faction_contact_made = true;
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

];

window.IRONHOLD_QUARRY_STAGE2_ENRICHED_CHOICES = IRONHOLD_QUARRY_STAGE2_ENRICHED_CHOICES;
