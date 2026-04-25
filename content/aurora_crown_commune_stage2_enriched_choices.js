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
      const result = rollD20('spirit', (G.skills.craft||0) + Math.floor(G.level/3));
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
        G.lastResult = `Sera's security protocol classifies any external inquiry into dome sensor calibration as a potential sabotage probe — a distinction you learn only after she's already flagged it. She detains you in the administration anteroom for forty minutes. Identification documentation. Written statement of purpose. Two of her staff present. She sets your written statement on the desk in front of her, smooths it flat with one hand, and does not look at it again while she speaks. She releases you without apology. Your name is now in the dome security log with a protocol flag next to it.`;
        addJournal('Dome security protocol triggered — brief detention, identification required', 'complication', `aur-sera-fail-${G.dayCount}`);
      } else {
        G.flags.met_warden_sera_whiteglass = true;
        G.investigationProgress++;
        G.lastResult = `Sera confirms the irregularities without being told what you already know. "Consistent with external recalibration," she says, pulling a second file. She's been working on the access event since she found it. "Someone changed our baseline readings." She writes something in her log, caps the pen, looks at you. "I don't know why yet. I intend to." She smooths the written statement flat with one hand and does not look at it again. Her jaw is set. She's already moving to the next step before you've left the room.`;
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
      const result = rollD20('vigor', (G.skills.survival||0) + Math.floor(G.level/3));
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
      const result = rollD20('spirit', (G.skills.craft||0) + Math.floor(G.level/3));
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
      const result = rollD20('finesse', (G.skills.stealth||0) + Math.floor(G.level/3));
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
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
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
    label: "Alis Sealwater has been sitting on something — the commune scribe does not file documents she cannot account for.",
    tags: ['stage2', 'aurora_crown_commune'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      var roll = rollD20('wits', G.skills.lore);
      if (roll.total >= 13) {
        G.flags.met_alis_sealwater = true;
        G.investigationProgress = (G.investigationProgress || 0) + 1;
        addNarration('The Scribe\'s Undocketed File', 'Alis pulls a slim folder from the back of her lower drawer — not the cabinet, the drawer, where the desk surface would hide it from anyone standing. She sets it on the table and folds her hands on top of it before she opens it. An amendment to the dome filtration maintenance contract, dated four months ago. Signed by the Collegium liaison and countersigned by a name Alis does not recognize. "Undocketed," she says. "I was told to hold it pending formal registry. No one has come back to register it."');
        addJournal('Undocketed contract amendment held by commune scribe — Collegium liaison signature, unknown countersignature', 'evidence');
        maybeStageAdvance();
      } else {
        addNarration('Record Protocol', 'Alis pulls the registry index without urgency, runs her finger down two columns, and closes it. "The document you are describing would require a formal access request to the dome administration archive." She caps her pen. "I can prepare the form now if you would like to submit it." She is not obstructing — this is simply what the process looks like when someone is precise about it. The form is three pages. She sets it on the counter and waits.');
      }
    }
  },

  {
    label: "The maintenance gallery smells wrong — filtration infrastructure leaves residue that does not match what the manifests say is running through it.",
    tags: ['stage2', 'aurora_crown_commune'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      var roll = rollD20('vigor', G.skills.survival);
      if (roll.total >= 13) {
        G.investigationProgress = (G.investigationProgress || 0) + 1;
        addNarration('Residue in the Intake Gallery', 'The maintenance gallery runs along the dome\'s lower curve, warm from the thermal conduits packed into the wall behind the paneling. The filtration intake manifold is third on the left — a chest-high unit bolted into the floor, inspection cover accessible without tools. The residue ring inside the intake throat is the wrong color: pale amber where it should be grey-white, with a waxy deposit along the lower seam. The service log clipped to the unit shows the last inspection as routine. Nothing about amber. Nothing about the waxy line.');
        addJournal('Filtration intake manifold — amber residue and waxy deposit inconsistent with standard filtration compounds', 'discovery');
        maybeStageAdvance();
      } else {
        addNarration('Maintenance Rotation', 'A labor crew is mid-rotation in the gallery when you arrive — four workers running conduit diagnostics along the wall bank. The foreman clocks you immediately and plants himself at the intake section before you reach it. "Maintenance corridor is active rotation. Non-crew need a safety clearance to be in here right now." He says it without heat. He has said it before. He does not move until you do.');
      }
    }
  },

  {
    label: "The contamination check queue has me marked as a repeat non-compliant — the dome's intake screening protocol has flagged my transit record.",
    tags: ['stage2', 'aurora_crown_commune'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      var roll = rollD20('finesse', G.skills.stealth);
      if (roll.total >= 13) {
        G.investigationProgress = (G.investigationProgress || 0) + 1;
        addNarration('Screening Queue, Side Gate', 'The side gate queue moves faster and the steward running it is younger — checking transit stamps without reading the names above them. The contamination-check notation on your record is a secondary flag, not a primary hold; it only surfaces if the steward cross-references the transit log against the daily alert sheet. This one does not. You are through in four minutes. Behind you, another steward at the main gate is going sheet by sheet. The two queues are twenty meters apart and processing the same list by different methods.');
        addJournal('Transit flag workaround — dome intake screening inconsistently applied between entry gates', 'intelligence');
        maybeStageAdvance();
      } else {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
        addNarration('Secondary Hold', 'The contamination-check flag pulls you to the secondary screening bay — a narrow room off the main corridor with two benches and a Dome Steward at a standing desk. She reads the transit log entry twice, notes the flag, and writes your name in the daily hold register before she looks up. "You\'ll need to account for your last three entry points." A formal notation goes into your transit record while you stand there. It will be visible at every dome checkpoint until a steward manually clears it.');
      }
    }
  },

  {
    label: "Bastian Sealwater signs off on deliveries his crew was told to skip.",
    tags: ['stage2', 'aurora_crown_commune'],
    xpReward: 34,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      var roll = rollD20('charm', G.skills.persuasion);
      if (roll.total >= 13) {
        G.flags.met_bastian_sealwater = true;
        G.investigationProgress = (G.investigationProgress || 0) + 1;
        addNarration('The Foreman Who Stops Rubbing His Wrist', 'Bastian is hunched over the rotation board in the gallery anteroom, rubbing the underside of his left wrist with his thumb the way he does when something is sitting wrong with him. The wrist rubbing stops when you ask about the quarantine-bypassed deliveries. "Three this quarter my crew was told to skip inspection on. Maintenance authorization from the liaison office." He pulls the rotation log down from its hook. "I signed off anyway. Every time." He taps one line in pencil. "Crews get blamed when things go wrong in a gallery. I wanted the names on paper."');
        addJournal('Foreman Bastian logged skipped-inspection deliveries on rotation board — liaison authorization on record', 'evidence');
        maybeStageAdvance();
      } else {
        addNarration('Wrong Register at the Rotation Board', 'Bastian straightens from the rotation board before you reach him, left thumb going still against his wrist. "Gallery crews get briefed by dome administration on what they can discuss with outside parties." His tone is even, schedule-bound, unhappy. "This is a rotation morning. I have four crews to brief in twenty minutes." He doesn\'t tell you to leave the anteroom. He does turn his shoulder and go back to the board. A labor scribe at a side desk watches the exchange without writing anything down — which means she is watching carefully.');
      }
    }
  },

  {
    label: "The liaison's name is already moving through the ration court.",
    tags: ['stage2', 'aurora_crown_commune'],
    xpReward: 32,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      var roll = rollD20('finesse', G.skills.stealth);
      if (roll.total >= 13) {
        G.investigationProgress = (G.investigationProgress || 0) + 1;
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
        addNarration('Ration Court, Mid-Distribution', 'The ration court is loud at mid-distribution — warm from bodies, sharp with the smell of lentil steam and wet wool. Two women at the grain line are halfway through a version of the story that has the liaison swapping seals at the inn: already garbled, already spreading. A dome steward twenty paces away is listening without turning her head, a cup halfway to her mouth. The rumor has outrun the evidence. The liaison will hear a ration-court version within the day, and whatever they do next will be pre-emptive.');
        addJournal('Liaison rumor spreading through ration court — dome stewards monitoring, pre-emptive response likely', 'intelligence');
        maybeStageAdvance();
      } else {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 2;
        addNarration('A Hand on Your Sleeve', 'You are a half-step into the grain line when a woman in a stewardship band steps out from behind a ration column and rests two fingers on your sleeve — not gripping, just placed. "Outside parties in the ration court during distribution need to be queued through the visitor steward. That\'s me." She waits for you to turn with her. The line keeps moving. The two women at the grain table have stopped talking and are making a point of not looking. Your name is going into the visitor ledger with a time and a reason field the steward is already filling in.');
      }
    }
  },

  {
    label: "The east gate argument is performed — someone wants the steward pulled.",
    tags: ['stage2', 'aurora_crown_commune'],
    xpReward: 34,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      var roll = rollD20('wits', G.skills.lore);
      if (roll.total >= 13) {
        G.investigationProgress = (G.investigationProgress || 0) + 1;
        addNarration('East Gate, Manufactured Argument', 'The east gate argument is being performed. A haulier in a Collegium-marked coat is disputing a contamination-check stamp he clearly knows is valid — voice pitched to carry, gestures wide enough to pull every steward within thirty paces. While the duty steward steps out of the intake shed to mediate, a second figure in the same coat pattern walks a sealed case through the unattended inspection bench without logging it. Two minutes, maybe three. The haulier calms the instant the case clears the bench. The queue resumes. The intake log has a gap for that window.');
        addJournal('East gate contamination-check dispute staged to cover unlogged Collegium case through intake', 'evidence');
        maybeStageAdvance();
      } else {
        addNarration('Reading the Wrong Argument', 'You step closer to the gate to hear the haulier\'s dispute more clearly — and a contamination-check steward reads your attention as intervention. "Outside parties do not intercede at checkpoint arguments." She puts her body between you and the dispute and gestures toward the waiting bench. Behind her, the argument is already wrapping. Whatever was going to move through the intake bench during the distraction has moved. You watch the haulier\'s shoulders drop from across the plaza. The steward is still waiting for you to sit.');
      }
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
      const result = rollD20('spirit', (G.skills.craft||0) + Math.floor(G.level/2));
      if (result.total >= 14 || result.isCrit) {
        G.flags.stage2_finale_institutional = true;
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 3;
        G.lastResult = `You lay the full evidence chain on Sera Whiteglass's desk: sensor recalibration logs, intake quarantine bypasses, budget line items, health petition correlations, the seal drawing from Mariel. Sera reads through it without speaking. When she finishes she places the last document face-down on top of the stack and sets her pen across it — deliberate, done. She picks up the duty phone and issues a suspension of all filtration maintenance deliveries under emergency dome security authority. Then she initiates a formal Oversight Collegium complaint in writing, dated and signed before she hands it to the duty clerk. "The liaison's access to Aurora Crown administrative systems is revoked as of this moment," she says.`;
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
