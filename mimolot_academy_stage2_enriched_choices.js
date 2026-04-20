/**
 * MIMOLOT ACADEMY STAGE 2 ENRICHED CHOICES
 * Investigation arc: forbidden knowledge trafficking / suppression compound theoretical basis
 * NPCs: Quenra Quillfire (Tutor-Magistrate), Ilys Quillfire (Innkeeper),
 *       Sarith Quillfire (Market Clerk), Velis Quillfire (Shrine Attendant), Myra Quillfire (Porter)
 */

const MIMOLOT_ACADEMY_STAGE2_ENRICHED_CHOICES = [

  {
    label: "Quenra Quillfire's lecture hall contains restricted curriculum materials — the suppression compound formula appears in theoretical texts three years before it was commissioned.",
    tags: ['Investigation', 'Stage2', 'Meaningful'],
    xpReward: 82,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(82, 'accessing restricted Academy curriculum');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_quenra_quillfire = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `Quenra confirms the formula predates the commission by years. It was developed here as theoretical work on glyph resonance damping. The research was classified by Academy directive eighteen months ago — not by faculty consensus, but by an external charter instruction. The charter reference matches the suppression compound buyer pattern.`;
        addJournal('investigation', 'Academy glyph damping research classified by external charter — predates commission', `mim-quenra-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Quenra invokes the classification directive. Your inquiry has been logged under the Academy's external-access protocol. Someone will receive a notification of your interest.`;
        addJournal('complication', 'Academy access logged — notification sent to unknown party', `mim-quenra-fail-${G.dayCount}`);
      } else {
        G.flags.met_quenra_quillfire = true;
        G.investigationProgress++;
        G.lastResult = `Quenra acknowledges the formula exists in restricted materials. She cannot share it directly but confirms it was classified after the commission, not before — implying the commission came from someone who already knew the formula existed.`;
        addJournal('investigation', 'Academy formula classified post-commission — buyer had prior knowledge', `mim-quenra-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Myra Quillfire handles Archive Loading Bay deliveries — she has recorded incoming shipments that do not match standard academic supply manifests.",
    tags: ['NPC', 'Craft', 'Stage2', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'reviewing Archive Loading Bay delivery records');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('craft', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_myra_quillfire = true;
        G.investigationProgress++;
        G.lastResult = `Myra's personal cargo log tracks six deliveries over four months that bypassed the standard manifest counter. They arrived on the Fairhaven scholar route — exactly the pilgrimage path — and were signed off by an Academy regent code she does not recognize. Two of those deliveries preceded glyph surge events in Shelkopolis by 48 hours.`;
        addJournal('investigation', 'Academy off-manifest deliveries via Fairhaven path — 48hr pre-surge correlation', `mim-myra-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Myra is mid-shift and her supervisor is present. She gives you a clipped denial and files a standard inquiry-refusal. Her expression says something different than her words.`;
        addJournal('complication', 'Loading Bay inquiry refused under supervisor watch', `mim-myra-fail-${G.dayCount}`);
      } else {
        G.flags.met_myra_quillfire = true;
        G.investigationProgress++;
        G.lastResult = `Myra confirms unusual deliveries on non-standard paperwork. "I log everything regardless of manifest status. That's not my job to question — it's my job to write down." She has written it down.`;
        addJournal('investigation', 'Non-standard Academy deliveries confirmed in personal cargo log', `mim-myra-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Sarith Quillfire's Knowledge Tariff Counter processes fees on all research materials entering the Academy — three recent acquisitions bypassed tariff entirely.",
    tags: ['NPC', 'Lore', 'Stage2', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'examining Academy knowledge tariff bypass records');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_sarith_quillfire = true;
        G.investigationProgress++;
        G.lastResult = `Sarith's records show three tariff exemptions granted under a "Crown Research Protocol" designation that appears nowhere in the Academy's formal exemption categories. The designation was used exclusively on acquisitions related to glyph resonance theory. All three entries list Fairhaven as point of origin.`;
        addJournal('investigation', 'Crown Research Protocol exemptions — glyph theory, Fairhaven origin', `mim-sarith-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Sarith's tariff records are externally audited quarterly. Your inquiry triggers a flag in the audit queue. The next quarterly audit will now include a review of who asked about these entries.`;
        addJournal('complication', 'Tariff inquiry flagged in quarterly audit queue', `mim-sarith-fail-${G.dayCount}`);
      } else {
        G.flags.met_sarith_quillfire = true;
        G.investigationProgress++;
        G.lastResult = `Sarith confirms three tariff-exempt acquisitions. The exemption code is unfamiliar to her but was entered by Academy leadership. The acquisitions were materials she would normally classify as 'applied craft components,' not scholarly texts.`;
        addJournal('investigation', 'Academy tariff-exempt craft components — misclassified acquisitions', `mim-sarith-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Ilys Quillfire's Academy Inn hosts visiting scholars — she overheard a late-night conversation about 'pressure management protocols' between guests who are not on the faculty roster.",
    tags: ['NPC', 'Stealth', 'Stage2', 'Meaningful'],
    xpReward: 66,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'questioning Academy innkeeper about scholar guests');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('stealth', (G.skills.stealth||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_ilys_quillfire = true;
        G.investigationProgress++;
        G.lastResult = `Ilys describes the guests in detail. One matches the physical description from Vaelis Sunweave's inn in Fairhaven — the north-south courier. The late-night conversation included the phrase "the cave output needs another three months of calibration." The guests checked out before dawn.`;
        addJournal('investigation', 'Academy inn guest matches Fairhaven courier — cave calibration timeline overheard', `mim-ilys-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `You approach Ilys at a bad moment — a guest is present who watches your conversation with focused attention. The guest is not on the faculty roster. Ilys gives you nothing.`;
        addJournal('complication', 'Academy inn — non-faculty observer present, conversation closed', `mim-ilys-fail-${G.dayCount}`);
      } else {
        G.flags.met_ilys_quillfire = true;
        G.investigationProgress++;
        G.lastResult = `Ilys describes the unusual guests. Northern accents, sealed documentation, pre-dawn departures. The phrase "pressure management" appeared in the overheard conversation. She did not understand the context. You do.`;
        addJournal('investigation', 'Academy inn — pressure management phrase, northern guests', `mim-ilys-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Velis Quillfire maintains Memory Hall Shrine records — the shrine's historical inscriptions include pre-suppression glyph architecture data that was never formally classified.",
    tags: ['NPC', 'Lore', 'Stage2', 'Meaningful'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'reviewing Memory Hall Shrine historical inscriptions');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_velis_quillfire = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `The shrine inscriptions predate the classification directive by decades. They document the original Watchers Perch cave as a natural glyph output regulator — designed by the old settlement architects to prevent surge overload. The modifications Quenra referenced were not just experimental. They reversed a safety system.`;
        addJournal('investigation', 'Memory Hall: Watchers Perch was safety system — modifications reversed it deliberately', `mim-velis-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.reverence = (G.worldClocks.reverence||0) - 1;
        G.lastResult = `Velis interprets your interest in the inscriptions as appropriation of shrine knowledge for non-contemplative purposes. She closes the hall and files a grievance with the Academy's doctrinal committee.`;
        addJournal('complication', 'Memory Hall closed — doctrinal committee grievance filed', `mim-velis-fail-${G.dayCount}`);
      } else {
        G.flags.met_velis_quillfire = true;
        G.investigationProgress++;
        G.lastResult = `Velis allows reading access. The inscriptions describe Watchers Perch as a designed pressure regulation site. The natural cave was engineered originally — which means the recent modifications were not a first-time intervention but a second one.`;
        addJournal('investigation', 'Watchers Perch was previously engineered — recent modifications are second intervention', `mim-velis-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Stage 2 Mimolot Academy finale — the Academy's classified research was the theoretical foundation for the entire suppression operation. Expose or contain.",
    tags: ['Investigation', 'Finale', 'Stage2', 'Consequence', 'Meaningful'],
    xpReward: 108,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(108, 'Mimolot Academy Stage 2 resolution');
      if (!G.investigationProgress || G.investigationProgress < 8) {
        G.lastResult = `The Academy investigation requires more evidence to act on.`;
        G.recentOutcomeType = 'investigate'; return;
      }
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/2));
      if (result.total >= 14 || result.isCrit) {
        G.flags.stage2_finale_institutional = true;
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 3;
        G.lastResult = `You present the full chain — theoretical formula, classification directive, Fairhaven deliveries, Memory Hall confirmation — to the Academy Regent Council. The Council initiates a formal inquiry. The operation's theoretical foundation is now on the institutional record. Stage III opens with academic institutional backing.`;
        addJournal('investigation', 'Mimolot Academy S2 finale: Regent Council formal inquiry opened', `mim-finale-inst-${G.dayCount}`);
      } else {
        G.flags.stage2_finale_underworld = true;
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 3;
        G.lastResult = `You share the classified research with the Verdant Row network before the Academy can suppress it again. The network now has the theoretical basis for the suppression compounds and can counter them. The Academy's containment fails before it starts.`;
        addJournal('investigation', 'Mimolot Academy S2 finale: classified research leaked to Verdant Row', `mim-finale-uw-${G.dayCount}`);
      }
      G.flags.stage2_faction_contact_made = true;
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

];
