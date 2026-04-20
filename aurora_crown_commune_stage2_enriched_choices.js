/**
 * AURORA CROWN COMMUNE STAGE 2 ENRICHED CHOICES
 * Investigation arc: dome air filtration system / glyph surge residue suppression
 * NPCs: Warden Sera Whiteglass (Dome Stabilizer Marshal), Mariel Sealwater (Innkeeper),
 *       Cadrin Sealwater (Market Clerk), Liora Sealwater (Shrine Attendant), Theron Sealwater (Porter)
 */

const AURORA_CROWN_COMMUNE_STAGE2_ENRICHED_CHOICES = [

  {
    label: "Warden Sera Whiteglass's Dome Administration Center manages all filtration systems — the dome's glyph surge detection sensors have been recalibrated to report lower readings than actual.",
    tags: ['Investigation', 'Stage2', 'Meaningful'],
    xpReward: 80,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(80, 'investigating dome sensor recalibration with Sera Whiteglass');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      if (!G.factionHostility) G.factionHostility = { warden_order: 0, iron_compact: 0, oversight_collegium: 0 };
      const result = rollD20('craft', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_warden_sera_whiteglass = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.factionHostility.oversight_collegium = (G.factionHostility.oversight_collegium||0) + 1;
        G.lastResult = `Sera discovered the recalibration herself three weeks ago. It was not a malfunction — the calibration codes were changed by an external access using Collegium administrative credentials. The sensor suppression means Aurora Crown's official records underreport glyph exposure to the broader settlement network. The commune appears safe. The commune is not safe.`;
        addJournal('investigation', 'Dome sensors recalibrated by Collegium access — official records suppress exposure data', `aur-sera-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.factionHostility.oversight_collegium = (G.factionHostility.oversight_collegium||0) + 1;
        G.lastResult = `Your inquiry into dome sensor calibration is classified as a potential sabotage investigation by Sera's security protocol. She detains you briefly and requests identification documentation before releasing you.`;
        addJournal('complication', 'Dome security protocol triggered — brief detention, identification required', `aur-sera-fail-${G.dayCount}`);
      } else {
        G.flags.met_warden_sera_whiteglass = true;
        G.investigationProgress++;
        G.lastResult = `Sera confirms sensor irregularities consistent with external recalibration. She is actively investigating the access event. "Someone changed our baseline readings. I don't know why yet, but I intend to find out."`;
        addJournal('investigation', 'Dome sensor baseline changed by external access — Sera investigating', `aur-sera-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Theron Sealwater processes all dome transit — sealed cargo deliveries marked 'filtration maintenance supplies' have been arriving monthly and bypassing the standard intake quarantine.",
    tags: ['NPC', 'Survival', 'Stage2', 'Meaningful'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'examining filtration maintenance deliveries with Theron Sealwater');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('survival', (G.skills.survival||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_theron_sealwater = true;
        G.investigationProgress++;
        G.lastResult = `Theron tracked the quarantine bypasses and found the authorization code was issued by the Collegium's Aurora Crown administrative liaison — the same liaison responsible for the sensor recalibration. The "filtration maintenance supplies" contain chemical compound concentrations consistent with glyph suppression precursors. They are being introduced directly into the filtration system.`;
        addJournal('investigation', 'Filtration supplies contain suppression precursors — Collegium liaison authorizing quarantine bypass', `aur-theron-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The quarantine bypass records are classified under dome security protocol. Theron cannot access them without Warden Whiteglass's authorization, which he has not sought.`;
        addJournal('complication', 'Quarantine bypass records under dome security — Warden authorization required', `aur-theron-fail-${G.dayCount}`);
      } else {
        G.flags.met_theron_sealwater = true;
        G.investigationProgress++;
        G.lastResult = `Theron confirms the monthly deliveries and the quarantine bypass. "They came in under Collegium maintenance authorization. That's above my level to question." The chemical smell was unusual for filtration supplies.`;
        addJournal('investigation', 'Monthly quarantine-bypassed deliveries — unusual chemical profile', `aur-theron-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Cadrin Sealwater's Supply Ledger Counter tracks all supply costs — the filtration maintenance budget has tripled in the past six months without any infrastructure upgrade explanation.",
    tags: ['NPC', 'Craft', 'Stage2', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'examining filtration budget anomalies with Cadrin Sealwater');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('craft', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_cadrin_sealwater = true;
        G.investigationProgress++;
        G.lastResult = `The budget increase is entirely in a single line item: "specialized filtration compound procurement." The supplier is the Northern Provision Compact — the same fabricated entity Elyra Mossbane identified in Harvest Circle. Aurora Crown's dome maintenance budget is being used to purchase suppression compounds from a ghost supplier.`;
        addJournal('investigation', 'Dome budget funding Northern Provision Compact — same ghost supplier as Harvest Circle', `aur-cadrin-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Cadrin's supply ledger access requires communal finance committee authorization for external review. Your request triggers a committee notification.`;
        addJournal('complication', 'Supply ledger committee notification triggered', `aur-cadrin-fail-${G.dayCount}`);
      } else {
        G.flags.met_cadrin_sealwater = true;
        G.investigationProgress++;
        G.lastResult = `Cadrin confirms the budget tripling. The increased spend is in a specialized supplier category that he does not recognize from prior years. "The supplier isn't in our approved vendor registry. But the expense was approved at Collegium liaison level."`;
        addJournal('investigation', 'Dome budget increase in unregistered supplier category — Collegium liaison approval', `aur-cadrin-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Mariel Sealwater's Dome Rest Inn hosts the Collegium liaison during monthly visits — she has noticed the liaison always brings sealed documentation that leaves with different seals than it arrived with.",
    tags: ['NPC', 'Stealth', 'Stage2', 'Meaningful'],
    xpReward: 66,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'questioning Mariel Sealwater about Collegium liaison activity');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('stealth', (G.skills.stealth||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_mariel_sealwater = true;
        G.investigationProgress++;
        G.lastResult = `Mariel noticed the documentation swap. The liaison arrives with Collegium-sealed documents and leaves with documents bearing a secondary seal she has only seen on them — a small geometric mark that matches the sealed charter pattern Sable Ledgermere identified. The liaison is the charter's local operational contact.`;
        addJournal('investigation', 'Collegium liaison performs seal swap at dome inn — same charter geometric mark confirmed', `aur-mariel-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Mariel's inn has a standing instruction from dome administration not to discuss Collegium liaison visits with external parties. She follows it.`;
        addJournal('complication', 'Dome inn standing instruction — Collegium liaison visits not discussable', `aur-mariel-fail-${G.dayCount}`);
      } else {
        G.flags.met_mariel_sealwater = true;
        G.investigationProgress++;
        G.lastResult = `Mariel describes the liaison as punctual, formal, and consistently private. The documentation she notices is always sealed. She observed the documentation being different on departure than arrival. "I notice things. It's useful."`;
        addJournal('investigation', 'Liaison documentation seal changes between arrival and departure', `aur-mariel-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Liora Sealwater at the Survival Shrine records community health petitions — a spike in respiratory complaints correlates exactly with the filtration supply delivery schedule.",
    tags: ['NPC', 'Lore', 'Stage2', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'correlating health petitions with delivery schedule via Liora Sealwater');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_liora_sealwater = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `The correlation is precise: respiratory complaints spike within 72 hours of each filtration delivery, then decline over the following week as the compound disperses. The pattern is consistent across six months. The suppression compounds are entering the dome population through the air supply. Aurora Crown's residents are being dosed.`;
        addJournal('investigation', 'Dome residents dosed via air supply — respiratory spike 72hrs post-delivery confirmed', `aur-liora-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.reverence = (G.worldClocks.reverence||0) - 1;
        G.lastResult = `Liora's health records are confidential under shrine wellness doctrine. She cannot share petition data with external investigators without communal medical board authorization.`;
        addJournal('complication', 'Shrine health records — medical board authorization required', `aur-liora-fail-${G.dayCount}`);
      } else {
        G.flags.met_liora_sealwater = true;
        G.investigationProgress++;
        G.lastResult = `Liora has noticed the respiratory correlation and brought it to the medical board six weeks ago. "They said it was seasonal. But it's not seasonal if it follows a monthly delivery schedule exactly."`;
        addJournal('investigation', 'Respiratory correlation documented — medical board dismissed as seasonal', `aur-liora-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Stage 2 Aurora Crown finale — the dome population is being dosed through a compromised filtration system. Expose through Warden Whiteglass's official channel or immediately disable the supply chain.",
    tags: ['Investigation', 'Finale', 'Stage2', 'Consequence', 'Meaningful'],
    xpReward: 110,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(110, 'Aurora Crown Commune Stage 2 resolution');
      if (!G.investigationProgress || G.investigationProgress < 8) {
        G.lastResult = `The Aurora Crown investigation needs more evidence before acting on the dome system.`;
        G.recentOutcomeType = 'investigate'; return;
      }
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('craft', (G.skills.craft||0) + Math.floor(G.level/2));
      if (result.total >= 14 || result.isCrit) {
        G.flags.stage2_finale_institutional = true;
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 3;
        G.lastResult = `You bring the full evidence chain to Sera Whiteglass. She suspends all filtration maintenance deliveries immediately under emergency dome security authority and initiates an Oversight Collegium formal complaint. The Collegium liaison is removed from Aurora Crown administrative access. Stage III opens with dome authority backing.`;
        addJournal('investigation', 'Aurora Crown S2 finale: Whiteglass emergency suspension, Collegium liaison removed', `aur-finale-inst-${G.dayCount}`);
      } else {
        G.flags.stage2_finale_underworld = true;
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 3;
        G.lastResult = `You bypass Whiteglass and route the dosing evidence to every commune network and regional health network simultaneously. The story is public before the Collegium can contain it. The delivery contract is canceled under public pressure within 48 hours.`;
        addJournal('investigation', 'Aurora Crown S2 finale: dosing evidence publicly released — delivery contract canceled', `aur-finale-uw-${G.dayCount}`);
      }
      G.flags.stage2_faction_contact_made = true;
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

];
