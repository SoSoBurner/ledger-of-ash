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
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('combat', (G.skills.combat||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_darian_ironspike_quarry = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `Darian holds the pressure longer than expected — fourteen minutes at the gate before his posture shifts. He doesn't raise his voice. He confirms it quietly, to the tally board rather than to you. The "special mineral assessment" category was written by Captain Roaz of ORE Supreme Command to cover extraction of glyph-resonant compounds from veins the quarry's standard assay process would never flag. Those compounds are the primary precursor in the suppression formula. Ironhold is where it starts.`;
        addJournal('investigation', 'Ironhold Quarry: ORE Supreme Command extracting glyph-resonant minerals — raw material source confirmed', `iron-darian-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `Darian reads the approach before you reach the gate. He doesn't speak. He signals to the secondary guard and the detention order is written before you've finished your first sentence. Six hours in the quarry's holding room — a concrete equipment alcove with a locked exterior door and dust on the floor. No charge filed. Released without documentation at shift change. Whatever you had on Darian before this conversation, he now has a record of you on his.`;
        addJournal('complication', 'ORE command detention — held 6 hours at quarry gate', `iron-darian-fail-${G.dayCount}`);
      } else {
        G.flags.met_darian_ironspike_quarry = true;
        G.investigationProgress++;
        G.lastResult = `Darian answers at the gate without stepping aside. "Certain extractions run under ORE Supreme Command classification. Assay reports aren't generated at site level for classified categories." His tone is procedure, not explanation. The classification is real — the paperwork exists somewhere in the ORE command chain, inaccessible at Ironhold. What it's protecting here is another question.`;
        addJournal('investigation', 'Special mineral extraction under ORE command classification — no local assay required', `iron-darian-partial-${G.dayCount}`);
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
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('survival', (G.skills.survival||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_velka_ironspike = true;
        G.investigationProgress++;
        G.lastResult = `Velka has kept a separate injury log alongside the extraction log — three months of documented symptoms in the special extraction crew. Cognitive lag, slowed response, one worker who started losing shifts to disorientation. She filed safety reports through the standard channel. All three were reclassified as "environmental adjustment period" by ORE safety oversight within a week of submission. The workers pulling the special mineral are accumulating damage from direct glyph resonance exposure. Velka sets the injury log on the table and steps back. She doesn't need persuasion to cooperate.`;
        addJournal('investigation', 'Quarry workers harmed by glyph mineral extraction — ORE safety reports reclassified, Velka cooperates', `iron-velka-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Velka has the reports in her desk but the moment she filed them through the official channel they were reclassified under ORE operational records. Sharing classified safety documentation without command authorization is a termination offence and potentially worse. She keeps her hands flat on the desk. "I know what's in them. I can't hand you what's no longer mine to give." The reports exist. Reaching them requires a different route.`;
        addJournal('complication', 'ORE classified safety records — command authorization required', `iron-velka-fail-${G.dayCount}`);
      } else {
        G.flags.met_velka_ironspike = true;
        G.investigationProgress++;
        G.lastResult = `Velka describes the pattern without looking at her notes — she has it committed to recall. Cognitive lag in the first week, reduced response time through the second, respiratory symptoms emerging in the third month of rotation. "Three safety reports filed. All three came back reclassified. I write them again, they vanish again." She doesn't raise her voice. The repetition has moved past frustration into something colder.`;        addJournal('investigation', 'Worker cognitive symptoms in special extraction zone — safety reports reclassified', `iron-velka-partial-${G.dayCount}`);
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
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('stealth', (G.skills.stealth||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `At the vein face during shift handover, in the four minutes when neither crew is present: the mineral layer carries a faint luminescence that isn't bioluminescence or mineral oxidation. Glyph pressure residue — the signature of a natural resonance amplifier. The mineral structure matches Toman Iceveil's glasswake research exactly, the same amplifier profile the suppression compounds depend on. A sample comes away cleanly. Physical evidence of the supply chain's starting point, in hand.`;
        addJournal('investigation', 'Glyph-resonant mineral sample obtained — matches Iceveil research amplifier profile', `iron-vein-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `The vein is less stable than it reads from the approach side. Contact triggers a glyph pressure release — a crack of displaced resonance energy, visible as a pale flash in the dark extraction alcove. Audible at the shed line. Security arrives within two minutes. You're already out of the alcove but not far enough. Your presence in the restricted section is logged and the discharge will require a formal incident report. Two watchfulness events: the security record and whatever ORE command makes of the report.`;
        addJournal('complication', 'Glyph discharge from unstabilized vein — quarry security alerted, presence known', `iron-vein-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.lastResult = `The handover window is narrower than expected — a supervisor doubles back. Enough time to get eyes on the vein face: the glyph resonance signature is unmistakable, a pressure-field edge around the mineral layer that registers clearly. Not enough time to take a sample safely before the next crew arrives. The resonance confirms the mineral profile. The physical evidence stays in the ground.`;
        addJournal('investigation', 'Glyph resonance vein confirmed — no sample extracted safely', `iron-vein-partial-${G.dayCount}`);
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
      if (!G.flags) G.flags = {};
      const result = rollD20('survival', (G.skills.survival||0) + Math.floor(G.level/2));
      if (result.total >= 14 || result.isCrit) {
        G.flags.stage2_finale_institutional = true;
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 3;
        G.lastResult = `Velka's injury logs, the mineral sample, and the extraction classification documents go to the Roadwarden post at Ithtananalor — delivered directly, bypassing the ORE command chain that owns the classification. The Roadwarden duty officer receives the package at the intake desk and reads the mineral assay first. The special extraction order at Ironhold is suspended pending supply chain review by end of the following day. Stage III opens with a Roadwarden investigation running parallel to whatever ORE command does next.`;
        addJournal('investigation', 'Ironhold S2 finale: Roadwarden supply chain investigation — special extraction suspended', `iron-finale-inst-${G.dayCount}`);
      } else {
        G.flags.stage2_finale_underworld = true;
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 3;
        G.lastResult = `The mineral sample and Velka's documentation go out through the Verdant Row network and the glasswake research community at the same time — simultaneous distribution, no single point to suppress. Within forty-eight hours the mineral profile is matched publicly against the suppression compound formula. Ironhold's extraction is named as the source material in every investigative channel that matters. The Shadowhands can't contain what's already in circulation.`;
        addJournal('investigation', 'Ironhold S2 finale: mineral identification published — supply chain source material public', `iron-finale-uw-${G.dayCount}`);
      }
      G.flags.stage2_faction_contact_made = true;
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

];

window.IRONHOLD_QUARRY_STAGE2_ENRICHED_CHOICES = IRONHOLD_QUARRY_STAGE2_ENRICHED_CHOICES;
