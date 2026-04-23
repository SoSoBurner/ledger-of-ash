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
        G.lastResult = `Sera pulls the calibration log without being asked. She found the change three weeks ago — not a malfunction, the codes were altered deliberately, using Collegium administrative credentials routed through an external access. She points to the timestamp. The sensor suppression has been running since then. Aurora Crown's reported glyph exposure figures go to the broader settlement network at the suppressed rate. On paper the commune reads safe. Sera sets the log on the desk between you and doesn't pick it up again.`;
        addJournal('Dome sensors recalibrated by Collegium access — official records suppress exposure data', 'evidence', `aur-sera-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.factionHostility.oversight_collegium = (G.factionHostility.oversight_collegium||0) + 1;
        G.lastResult = `Sera's security protocol classifies any external inquiry into dome sensor calibration as a potential sabotage investigation — a distinction you learn only after she's already flagged it. She detains you in the administration anteroom for forty minutes. Identification documentation. Written statement of purpose. Two of her staff present. She releases you without apology and without explanation. Your name is now in the dome security log with a protocol flag next to it.`;
        addJournal('Dome security protocol triggered — brief detention, identification required', 'complication', `aur-sera-fail-${G.dayCount}`);
      } else {
        G.flags.met_warden_sera_whiteglass = true;
        G.investigationProgress++;
        G.lastResult = `Sera confirms the irregularities without being told what you already know. "Consistent with external recalibration," she says, pulling a second file. She's been working on the access event since she found it. "Someone changed our baseline readings." She writes something in her log, caps the pen, looks at you. "I don't know why yet. I intend to." She means it the way someone means a promise made to a decision board that's already been posted.`;
        addJournal('Dome sensor baseline changed by external access — Sera investigating', 'evidence', `aur-sera-partial-${G.dayCount}`);
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
        G.lastResult = `Theron has been tracking the quarantine bypasses in his own ledger — separate from the official intake log, columns ruled in pencil. He shows you both. The authorization code belongs to the Collegium's Aurora Crown administrative liaison. The same liaison who appears in the sensor recalibration access record. Theron opens one of the delivery manifests and points at the chemical compound concentrations listed. "Those are consistent with glyph suppression precursors," he says. Not a question. He's looked this up. "They go straight into the filtration intake."`;

        addJournal('Filtration supplies contain suppression precursors — Collegium liaison authorizing quarantine bypass', 'evidence', `aur-theron-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Theron pulls up the intake manifest system and hits the classified barrier immediately — quarantine bypass records sit under dome security protocol. He needs Warden Whiteglass's written authorization to access them. He hasn't requested it. He says this with a slight pause that suggests he made a calculation about asking and landed on no. The records are there. Getting into them requires a path through Whiteglass's office.`;
        addJournal('Quarantine bypass records under dome security — Warden authorization required', 'complication', `aur-theron-fail-${G.dayCount}`);
      } else {
        G.flags.met_theron_sealwater = true;
        G.investigationProgress++;
        G.lastResult = `Theron confirms the monthly deliveries and walks you to the intake log. The quarantine bypass authorization sits in the Collegium maintenance category. "That's above my level to question," he says. He doesn't say it like someone who's at peace with it. He taps one line in the manifest — the chemical compound column. "The smell was wrong. Not what filtration supplies smell like." He logs everything that comes through. He logged that too.`;
        addJournal('Monthly quarantine-bypassed deliveries — unusual chemical profile', 'evidence', `aur-theron-partial-${G.dayCount}`);
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
        G.lastResult = `Cadrin runs his finger to the single line item where the entire budget increase lives: "specialized filtration compound procurement." He reads the supplier name aloud: Northern Provision Compact. He checks the approved vendor registry while you watch — it isn't there, and it wasn't in the prior year either. The approval came through the Collegium liaison category, bypassing the vendor registry requirement entirely. Aurora Crown's maintenance budget is funding compound purchases from a supplier that doesn't exist in any official record.`;
        addJournal('Dome budget funding Northern Provision Compact — same ghost supplier as Harvest Circle', 'evidence', `aur-cadrin-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Cadrin looks up from the ledger counter and explains, without particular inflection, that supply ledger access for external review requires communal finance committee authorization. Your request triggers a committee notification automatically — it's the process. The notification goes out before he finishes the sentence. Someone on the finance committee will know you asked within the hour. He hands you the authorization form and doesn't make eye contact.`;
        addJournal('Supply ledger committee notification triggered', 'complication', `aur-cadrin-fail-${G.dayCount}`);
      } else {
        G.flags.met_cadrin_sealwater = true;
        G.investigationProgress++;
        G.lastResult = `Cadrin confirms the tripling when you set the numbers side by side on the counter. He pulls the prior year ledger to check — the specialized compound category simply didn't exist before. "The supplier name isn't in our approved vendor registry." He checks twice. "Expense was approved at Collegium liaison level." He writes that down in his own notes while he's still holding the thought. He doesn't say anything else, but he doesn't close the ledger either.`;
        addJournal('Dome budget increase in unregistered supplier category — Collegium liaison approval', 'evidence', `aur-cadrin-partial-${G.dayCount}`);
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
        G.lastResult = `Mariel describes it the way she describes everything about the inn: matter-of-fact, detail-first. "They arrive with Collegium-sealed documents. They leave with different seals." She's noticed it across six visits. The secondary seal is small, geometric — she draws it from memory on the back of a room ledger. It matches the charter pattern exactly. She tears the drawing off and slides it across the counter without being asked. "I notice things," she says. "It's useful."`;

        addJournal('Collegium liaison performs seal swap at dome inn — same charter geometric mark confirmed', 'evidence', `aur-mariel-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Mariel sets a room key on the counter and straightens the hooks behind her before answering. "There's a standing instruction from dome administration not to discuss Collegium liaison visits with external parties." She meets your eyes once, briefly. "I follow it." The conversation ends there. She goes back to the room ledger. The inn continues around you — cooking smells from the kitchen passage, hammering somewhere in the upper level. She doesn't tell you to leave.`;
        addJournal('Dome inn standing instruction — Collegium liaison visits not discussable', 'complication', `aur-mariel-fail-${G.dayCount}`);
      } else {
        G.flags.met_mariel_sealwater = true;
        G.investigationProgress++;
        G.lastResult = `Mariel describes the liaison efficiently: punctual, formal, one night per visit, always the same room. "The documentation they bring is always sealed." She wipes down the counter. "On departure it's sealed differently than it arrived." She says it the way she might mention a guest's preference for cold water — observed, filed, not yet interpreted. "I notice things. It's useful." She goes back to the room ledger. She's given you what she has.`;
        addJournal('Liaison documentation seal changes between arrival and departure', 'evidence', `aur-mariel-partial-${G.dayCount}`);
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
        G.lastResult = `Liora lays her petition records alongside the delivery manifest you brought. Six months of data, two columns. Respiratory complaint spikes appear within seventy-two hours of each filtration delivery — every time, without exception — then fall off over the following week as the compound disperses through the ventilation cycle. She traces it with her finger across all six months, slowly, not for your benefit but for her own. "I brought this to the medical board six weeks ago," she says. "They called it seasonal." She looks at the delivery dates again. "It follows the delivery schedule exactly."`;

        addJournal('Dome residents dosed via air supply — respiratory spike 72hrs post-delivery confirmed', 'evidence', `aur-liora-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.reverence = (G.worldClocks.reverence||0) - 1;
        G.lastResult = `Liora keeps her hands folded on the shrine counter and explains the doctrine: health petition records are confidential, sharing them with anyone outside the medical board requires board authorization, and she's not going to breach that without it. She says it gently and completely. The shrine is quiet around you, low candles burning at the memorial stone nearby. "Submit a written request to the medical board" is the last thing she tells you. She doesn't move to close the conversation, but she doesn't open it either.`;
        addJournal('Shrine health records — medical board authorization required', 'complication', `aur-liora-fail-${G.dayCount}`);
      } else {
        G.flags.met_liora_sealwater = true;
        G.investigationProgress++;
        G.lastResult = `Liora nods before you finish describing the delivery correlation. She's seen it herself. "I brought it to the medical board six weeks ago — the petition spike pattern against the maintenance schedule." She straightens the record book on the counter. "They said it was seasonal." A pause. "It follows a monthly delivery schedule exactly." She looks out past you at the shrine space. She doesn't have a word for what she's looking at, but she's been sitting with it for six weeks.`;
        addJournal('Respiratory correlation documented — medical board dismissed as seasonal', 'evidence', `aur-liora-partial-${G.dayCount}`);
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
        G.lastResult = `The evidence chain isn't complete yet. Acting on the dome system now, without the full documentation, leaves too many gaps for the delivery contract to survive a challenge. More is needed before the next move.`;
        G.recentOutcomeType = 'investigate'; return;
      }
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('craft', (G.skills.craft||0) + Math.floor(G.level/2));
      if (result.total >= 14 || result.isCrit) {
        G.flags.stage2_finale_institutional = true;
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 3;
        G.lastResult = `You lay the full evidence chain on Sera Whiteglass's desk: sensor recalibration logs, intake quarantine bypasses, budget line items, health petition correlations, the seal drawing from Mariel. Sera reads through it without speaking. When she finishes she picks up the duty phone and issues a suspension of all filtration maintenance deliveries under emergency dome security authority. Then she initiates a formal Oversight Collegium complaint in writing, dated and signed before she hands it to the duty clerk. "The liaison's access to Aurora Crown administrative systems is revoked as of this moment," she says. She means it the way she means everything.`;
        addJournal('Aurora Crown S2 finale: Whiteglass emergency suspension, Collegium liaison removed', 'evidence', `aur-finale-inst-${G.dayCount}`);
      } else {
        G.flags.stage2_finale_underworld = true;
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 3;
        G.lastResult = `You route the dosing evidence simultaneously to every commune network board, every regional health office, and the settlement transit posting system — a cascade of postings that goes up faster than any single authority can respond to. The health petition correlation, the compound identifications, the quarantine bypass authorizations, the budget supplier. All of it, posted in public. By the time the Collegium's Aurora Crown liaison is notified, the story is already in six locations they can't pull down. The delivery contract is canceled under public pressure within forty-eight hours.`;
        addJournal('Aurora Crown S2 finale: dosing evidence publicly released — delivery contract canceled', 'evidence', `aur-finale-uw-${G.dayCount}`);
      }
      G.flags.stage2_faction_contact_made = true;
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

];

window.AURORA_CROWN_COMMUNE_STAGE2_ENRICHED_CHOICES = AURORA_CROWN_COMMUNE_STAGE2_ENRICHED_CHOICES;
