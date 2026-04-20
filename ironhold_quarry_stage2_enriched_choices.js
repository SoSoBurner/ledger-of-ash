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
        G.lastResult = `Darian is ORE command. He knows. Under sustained pressure he confirms that the "special mineral assessment" category was established by his superior, Captain Darian Roaz of ORE Supreme Command, to extract glyph-resonant mineral compounds that appear in specific quarry veins. The minerals are the key precursor in the suppression compound formula. Ironhold Quarry is the raw materials source.`;
        addJournal('investigation', 'Ironhold Quarry: ORE Supreme Command extracting glyph-resonant minerals — raw material source confirmed', `iron-darian-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `Darian's gate command authority means he can detain you for suspicious conduct near classified extraction operations. He does. You are held for six hours before release.`;
        addJournal('complication', 'ORE command detention — held 6 hours at quarry gate', `iron-darian-fail-${G.dayCount}`);
      } else {
        G.flags.met_darian_ironspike_quarry = true;
        G.investigationProgress++;
        G.lastResult = `Darian confirms special mineral extraction without assay reports. "Some extractions operate under ORE Supreme Command classification. No reports required at local level." The classification is legitimate but the application is unusual.`;
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
        G.lastResult = `Velka has been logging the symptoms and filing safety reports for three months. The reports were reclassified as "environmental adjustment period" by ORE safety oversight. The workers extracting the special mineral show progressive cognitive suppression consistent with glyph resonance mineral direct exposure. The people doing the extraction are being harmed by what they are extracting. Velka is furious. She cooperates fully.`;
        addJournal('investigation', 'Quarry workers harmed by glyph mineral extraction — ORE safety reports reclassified, Velka cooperates', `iron-velka-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Velka's safety reports fall under ORE classified operational records. She cannot share them without command authorization she is unlikely to receive.`;
        addJournal('complication', 'ORE classified safety records — command authorization required', `iron-velka-fail-${G.dayCount}`);
      } else {
        G.flags.met_velka_ironspike = true;
        G.investigationProgress++;
        G.lastResult = `Velka describes worker symptoms in the special extraction section. Cognitive fog, reduced response time, mild respiratory symptoms. "I've filed three safety reports. They keep getting reclassified. Something is wrong with that extraction operation."`;
        addJournal('investigation', 'Worker cognitive symptoms in special extraction zone — safety reports reclassified', `iron-velka-partial-${G.dayCount}`);
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
        G.lastResult = `The vein glows faintly with residual glyph pressure resonance. The mineral structure matches exactly what Toman Iceveil's glasswake research identified as a natural resonance amplifier — the same property the suppression compounds exploit. You take a sample. Physical evidence of the raw material supply chain.`;
        addJournal('investigation', 'Glyph-resonant mineral sample obtained — matches Iceveil research amplifier profile', `iron-vein-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `You trigger a glyph pressure release from the unstabilized vein. The discharge is visible and audible. Quarry security responds immediately. Your presence at the extraction site is known.`;
        addJournal('complication', 'Glyph discharge from unstabilized vein — quarry security alerted, presence known', `iron-vein-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.lastResult = `The vein shows clear glyph resonance properties visible to anyone with basic arcane sensitivity. You note the mineral properties but cannot safely extract a sample.`;
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
        G.lastResult = `The Ironhold investigation needs more evidence before acting.`;
        G.recentOutcomeType = 'investigate'; return;
      }
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('survival', (G.skills.survival||0) + Math.floor(G.level/2));
      if (result.total >= 14 || result.isCrit) {
        G.flags.stage2_finale_institutional = true;
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 3;
        G.lastResult = `You submit Velka's safety reports, the mineral sample, and the extraction classification evidence to the Roadwarden Ithtananalor post — bypassing ORE command specifically because ORE command is implicated. The Roadwardens open a supply chain investigation. The special extraction operations are suspended pending review. Stage III opens with Roadwarden supply chain investigation in progress.`;
        addJournal('investigation', 'Ironhold S2 finale: Roadwarden supply chain investigation — special extraction suspended', `iron-finale-inst-${G.dayCount}`);
      } else {
        G.flags.stage2_finale_underworld = true;
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 3;
        G.lastResult = `You distribute the mineral sample and Velka's documentation to the Verdant Row network and the glasswake research community simultaneously. The mineral identification is matched to the suppression compound formula publicly. The supply chain's source material is identified in every investigative circuit.`;
        addJournal('investigation', 'Ironhold S2 finale: mineral identification published — supply chain source material public', `iron-finale-uw-${G.dayCount}`);
      }
      G.flags.stage2_faction_contact_made = true;
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

];
