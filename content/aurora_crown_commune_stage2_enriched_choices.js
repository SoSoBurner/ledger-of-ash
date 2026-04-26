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
    label: "The supplier authorization came from a committee that has not met in six months.",
    tags: ['Stage2', 'NPC', 'Lore'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'tracing filtration chemical supplier change through Warden Sera Whiteglass records');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_warden_sera_whiteglass = true;
        G.flags.aurora_supplier_change_traced = true;
        G.investigationProgress++;
        G.stageProgress[2]++;
        G.lastResult = `Sera lays the chemical procurement file on her desk and opens it to the authorization page. The supplier change — from the commune's established filtration vendor to Northern Provision Compact — was approved under the founding charter technical committee's standing authority. She shows you the committee's last meeting record: eight months ago. The compound class Northern Provision Compact supplies isn't in the commune's approved substance registry. She signed off on it because the authorization looked formal. She looks at the page for a long moment. "This committee has not convened since before the deliveries began," she says. She closes the file slowly, then opens it again.`;
        addJournal('Filtration supplier change authorized by dormant charter committee — compound class unregistered', 'evidence', `aur-sera-supplier-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The procurement file sits in the dome administration archive under a classification tier that requires Sera's own counter-authorization to access — a protocol she put in place after the quarantine bypass anomalies. She initiates the authorization while you watch, which generates a security log entry for the archive access. Someone auditing the dome's archive activity will see it. The file will take until the following morning to clear. She notes the time. You note the log.`;
        addJournal('Procurement archive access flagged — security log entry generated', 'complication', `aur-sera-supplier-fail-${G.dayCount}`);
      } else {
        G.flags.met_warden_sera_whiteglass = true;
        G.investigationProgress++;
        G.lastResult = `Sera pulls the supplier change authorization and reads it through once before she hands it to you. The founding charter technical committee signed off on it. She shows you the committee's meeting schedule on the wall calendar — the last session was eight months ago. "They have standing authority," she says. "The authorization was technically valid." She taps the compound class listed for Northern Provision Compact. "That class is not in our approved registry." She's already started a second file on the desk, pulling records in sequence.`;
        addJournal('Filtration supplier approved by dormant committee — compound class outside approved registry', 'intelligence', `aur-sera-supplier-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The residents nearest the filtration intake have been attending the shrine the most.",
    tags: ['Stage2', 'NPC', 'Survival'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'mapping shrine resensitization attendance against filtration intake geography');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('vigor', (G.skills.survival||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_liora_sealwater = true;
        G.flags.aurora_intake_geography_confirmed = true;
        G.investigationProgress++;
        G.stageProgress[2]++;
        G.lastResult = `Liora spreads the resensitization attendance log across the shrine counter and you set the commune residential map next to it. The match is clean. Residents in the intake corridor's ventilation catchment area — a wedge shape running from the filtration room out through the eastern quarters — account for eighty percent of the shrine's increased attendance over four months. Liora traces the wedge boundary with her finger, following the housing blocks. "These are the residents I see weekly now," she says. "A year ago, monthly." She draws a circle at the intake position on the map. Her finger stays there. "The dose is heaviest at the source."`;
        addJournal('Shrine resensitization attendance maps to intake catchment zone — exposure gradient confirmed', 'evidence', `aur-liora-geo-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.reverence = (G.worldClocks.reverence||0) - 1;
        G.lastResult = `The resensitization records are categorized under medical doctrine, not community health data — a classification Liora applies strictly. She explains this without apology. Sharing the records requires the resident's consent or the medical board's written authorization; cross-referencing them against geographic data would compound the breach. "The records are here to protect people," she says. "Not to be mapped." She gestures toward the door. Not unkindly. The distinction she draws is real, and she will enforce it.`;
        addJournal('Resensitization records protected under medical doctrine — geographic cross-reference refused', 'complication', `aur-liora-geo-fail-${G.dayCount}`);
      } else {
        G.flags.met_liora_sealwater = true;
        G.investigationProgress++;
        G.lastResult = `Liora looks at the residential map for a long time before she says anything. She doesn't use the attendance records — doctrine is doctrine. But she talks through what she's observed without opening a file: the residents she sees weekly now. She describes which parts of the commune they come from, working from memory. You mark the map as she speaks. When she stops, the marks cluster at the intake corridor end of the eastern quarters, radiating outward. She looks at the cluster. "I didn't put it in those terms before," she says quietly.`;
        addJournal('Shrine attendant locates intake-adjacent resident cluster from memory — exposure pattern consistent', 'intelligence', `aur-liora-geo-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Theron Sealwater knows what the third-bell crates contain. He's decided not to.",
    tags: ['Stage2', 'NPC', 'Social'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'pressing Theron Sealwater on east storage bay crate movements');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_theron_sealwater = true;
        G.flags.aurora_theron_crates_confirmed = true;
        G.investigationProgress++;
        G.lastResult = `Theron stops moving when you describe the third bell. His hand finds the edge of the filtration access door frame and he keeps it there, fingertips pressed into the seal edge — a specific pressure, like he's measuring something. "I move what I'm given a movement order for," he says. Then he is quiet for long enough that it stops being a pause and becomes something else. "The order says east storage bay. It doesn't say what's in them." He looks at his hand on the frame. "The crates are labeled Class-C chemical transport. I looked up what that class covers." He doesn't say what it covers. He is still looking at his hand.`;
        addJournal('Theron logged Class-C chemical crate movements to east bay at third bell — aware of compound class', 'evidence', `aur-theron-crates-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Theron's response is simple and immediate: he received a porter briefing from dome administration at the start of the month covering what discussions about cargo movement are permitted with external parties. That briefing included the third-bell crates. He names it without tension, the way he might name a departure time. He will not discuss it further. He goes back to his routing board, picks up a pencil, and resumes marking. He was not rude. He will not help.`;
        addJournal('Theron briefed by administration — third-bell cargo off-limits to external discussion', 'complication', `aur-theron-crates-fail-${G.dayCount}`);
      } else {
        G.flags.met_theron_sealwater = true;
        G.investigationProgress++;
        G.lastResult = `Theron's hand goes to the door frame before he answers — two fingers against the seal edge, a brief press. "Porter protocol: I move what the order says, I don't open what I'm not clearing." He meets your eyes once. "The orders come from the filtration access corridor. They go to the east storage bay." He doesn't say what time. He doesn't say how often. He picks up his routing board. His fingers leave a smudge on the door seal that stays after he moves away.`;
        addJournal('Theron confirms crate movements from filtration corridor to east bay — movement order source noted', 'intelligence', `aur-theron-crates-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The dismissed technician still lives here. She didn't dispute the dismissal.",
    tags: ['Stage2', 'NPC', 'Stealth'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'locating dismissed filtration technician and accessing her personal technical log');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('finesse', (G.skills.stealth||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.aurora_dismissed_technician_found = true;
        G.investigationProgress++;
        G.lastResult = `She answers the door immediately, as if she was expecting it to be someone eventually. Her name isn't on the dismissal record — just her role and the administrative reason. She has a copy of her technical log for the six months before her dismissal, kept in a cloth-wrapped sleeve under the worktable. "Inadequate record-keeping," she says, setting the sleeve on the table. "I kept detailed records. That was the problem." The log covers the compound introduction in month three: compound class, delivery source, intake concentrations. She recorded the smell anomaly on day two. Her dismissal order is dated four days after that entry.`;
        addJournal('Dismissed technician log shows compound introduction noted and anomaly recorded — dismissal followed four days later', 'evidence', `aur-tech-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `The quarter near the filtration access is small enough that a stranger moving through it at an off-hour is noticed before they reach the address. A dome steward falls in behind you two blocks out — routine, unhurried, but consistent. When you reach the technician's residence the door doesn't open. The following morning a notation appears in the dome administration visitor log: external party, filtration quarters, unannounced, evening hours. Someone added a cross-reference to your name at the dome checkpoint.`;
        addJournal('Filtration quarters patrol noted — steward surveillance triggered, visitor log entry created', 'complication', `aur-tech-fail-${G.dayCount}`);
      } else {
        G.flags.aurora_dismissed_technician_found = true;
        G.investigationProgress++;
        G.lastResult = `She doesn't introduce herself. She opens the log to the month the new compound arrived and sets it on the table between you without explanation. "I recorded the intake concentrations every delivery. The smell was wrong from the first one." She turns to the page with her dismissal date marked in the margin. "I'd submitted two anomaly reports by then." The log is complete. It covers the period before her dismissal. She did not give up her copy when she left because no one asked her to.`;
        addJournal('Dismissed technician log confirms compound anomaly reported before dismissal — two reports on file', 'intelligence', `aur-tech-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Ten times the annual maintenance supply. None of it in the maintenance stores.",
    tags: ['Stage2', 'NPC', 'Lore'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'tracing dome sealant surplus via Cadrin Sealwater market supply ledger');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_cadrin_sealwater = true;
        G.flags.aurora_sealant_surplus_traced = true;
        G.investigationProgress++;
        G.lastResult = `Cadrin lays the purchase record and the maintenance inventory side by side on the counter. The dome sealant purchase — four months ago, quantity sufficient for a decade of standard maintenance — shows a delivery address in the commune's maintenance stores. The current inventory shows three months of standard supply. The gap between purchased and present is nine-tenths of the original order. Cadrin runs the arithmetic twice. "It was received," he says. "Signed and received. Then it moved." He checks the transfer log. There is no outbound entry. "Whatever it moved into, it moved off the books."`;
        addJournal('Dome sealant surplus received and logged — nine-tenths transferred off-book, no outbound record', 'evidence', `aur-cadrin-sealant-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The finance committee notification went out when you accessed the main supply ledger earlier. When you pull the dome sealant line item separately, a second notification generates automatically — two external access events in the same ledger category triggers an escalation flag. Cadrin shows you the escalation notice on his screen with the expression of someone who has now been involved in something he didn't choose. "The committee chair will have this before the end of the day," he says. He closes the ledger.`;
        addJournal('Second ledger access triggered escalation flag — finance committee chair notified', 'complication', `aur-cadrin-sealant-fail-${G.dayCount}`);
      } else {
        G.flags.met_cadrin_sealwater = true;
        G.investigationProgress++;
        G.lastResult = `Cadrin finds the sealant purchase in thirty seconds — a line item that size is not easy to miss once you know to look. He checks the maintenance inventory without being asked. "Received and signed for four months ago. Current stores hold about a month's worth of normal use." He does the subtraction on the ledger margin, pencil, no calculator. "The rest isn't in any maintenance record." He underlines the number. "If it was moved, it was moved without a transfer entry." He does not speculate about where it went.`;
        addJournal('Dome sealant bulk purchase confirmed — surplus absent from all maintenance records', 'intelligence', `aur-cadrin-sealant-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The liaison's archive credential has been used from inside the dome — on days the liaison was not present.",
    tags: ['Stage2', 'NPC', 'Lore'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'cross-referencing liaison credential access history in dome archive');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.aurora_credential_ghost_access = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The dome archive access log shows sixteen credential uses attributed to the Collegium liaison over four months. You pull the liaison's recorded visit schedule from the transit intake register — Mariel's inn booking dates. The credential was used on eleven days when the liaison was not in the commune. Someone inside the dome is operating under the liaison's access code. You copy both columns side by side. The gap between arrival dates and credential activity is not accidental. The insider has been running administrative changes between visits.`;
        addJournal('Liaison credential used on days liaison absent — insider operating under borrowed access code', 'evidence', `aur-cred-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The archive access log sits behind the dome security classification tier — the same tier Sera's authorization unlocked for you once already. Pulling it a second time from a different entry point generates a duplicate access flag. The security system marks the pattern as anomalous. A log entry is created, timestamped, and routed to Sera's security queue. She will see it by morning. Whether she reads it as your diligence or your overreach depends on what she already thinks of you.`;
        addJournal('Duplicate archive access flag generated — Sera notified via security queue', 'complication', `aur-cred-fail-${G.dayCount}`);
      } else {
        G.flags.aurora_credential_ghost_access = true;
        G.investigationProgress++;
        G.lastResult = `The access log shows credential activity attributed to the liaison on dates that don't line up with the inn's booking record. The discrepancy is three days across four months — narrow enough to miss without both records side by side. You note the dates. Someone with the liaison's credential code made archive changes between visits. The log doesn't record who held the physical access key. That answer is somewhere else in the dome.`;
        addJournal('Liaison credential active between visits — 3-day access discrepancy confirmed', 'intelligence', `aur-cred-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Orvyn Mast manages the condensate lines — a second distribution path runs beneath the filtration intake.",
    tags: ['Stage2', 'NPC', 'Survival'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'tracing secondary contamination vector via condensate lines with Orvyn Mast');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('vigor', (G.skills.survival||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_orvyn_mast = true;
        G.flags.aurora_condensate_vector_confirmed = true;
        G.investigationProgress++;
        G.lastResult = `Orvyn pulls the condensate network schematic from the wall bracket and lays it flat, tracing the secondary loop with a grease pencil. The condensate lines run beneath the filtration intake manifold and feed back into the potable water distribution system through a thermal exchange junction. A compound introduced at the filtration intake would concentrate in the condensate cycle as temperature-volatile elements settle. He marks the junction point. "The medical board said respiratory," he says. "Condensate exposure is systemic." He caps the pencil and does not put the schematic away.`;
        addJournal('Condensate lines route filtration compounds into potable water system — systemic exposure via thermal junction', 'evidence', `aur-orvyn-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Orvyn listens to the question, then sets his clipboard on the condensate manifold housing and folds his hands on top of it. "Water distribution infrastructure queries from external parties go through the dome safety committee." He says it without inflection — the same voice he uses when a valve reading is slightly off. "I'll need a committee referral in writing before I can show you the schematic." The referral process takes three working days. He writes the committee clerk's name on a slip of paper and hands it to you. He is entirely unhelpful and entirely correct.`;
        addJournal('Condensate schematic blocked — dome safety committee referral required', 'complication', `aur-orvyn-fail-${G.dayCount}`);
      } else {
        G.flags.met_orvyn_mast = true;
        G.investigationProgress++;
        G.lastResult = `Orvyn knows the condensate network the way he knows his own sleep schedule — by feel, not by reading. He talks through the secondary loop without pulling the schematic: intake manifold feeds into a thermal exchange junction, condensate recirculates through the potable distribution leg. He stops there. "If something's in the filtration intake, it doesn't just move through the air cycle." He looks at the manifold housing. "It goes everywhere the water goes." He doesn't say anything further. He picks up his clipboard and checks a valve gauge that he's probably already checked this morning.`;
        addJournal('Condensate loop carries filtration compounds into potable water distribution — full commune exposure', 'intelligence', `aur-orvyn-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The commune council minutes from four months ago have a motion that was tabled without a recorded vote.",
    tags: ['Stage2', 'NPC', 'Craft'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'reading commune council meeting minutes for suppressed procedural objection');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('spirit', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.aurora_council_minutes_found = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The minutes are precise until they aren't. A motion by council member Reya Coth to commission an independent audit of filtration maintenance contracts appears in the agenda, is moved to the floor, receives a second, and then — nothing. No vote recorded. No tabling notation. The next agenda item begins mid-sentence on the same page, as though the motion was cut from a continuous transcription. The council member who seconded the motion resigned from the council two weeks after this session. The minutes carry Alis Sealwater's clerical certification stamp. Her signature is present. Her initials are absent from the margin of that page only.`;
        addJournal('Council audit motion cut from minutes — seconder resigned, Alis initials absent from affected page', 'evidence', `aur-council-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Council meeting minutes are public record in Aurora Crown — the commune founding charter guarantees it. What the founding charter does not address is the processing queue for records requests submitted by external parties. Your request goes into that queue. The clerk at the registry counter stamps it, dates it, and places it in a tray already containing six earlier requests. Estimated processing time: five working days. Someone in the queue ahead of you has already requested minutes from the same period.`;
        addJournal('Council minutes request queued — five-day processing, prior external request already filed', 'complication', `aur-council-fail-${G.dayCount}`);
      } else {
        G.flags.aurora_council_minutes_found = true;
        G.investigationProgress++;
        G.lastResult = `The minutes show a filtration audit motion reaching the floor, receiving a second, and then the record jumps to the next agenda item without a vote entry. You read the page twice. A tabling requires a notation; a withdrawal requires the mover's signature. Neither is present. The council member who seconded the motion is no longer on the council — the departure recorded as a voluntary resignation. The jump in the minutes is four lines. The absence of four lines is everything.`;
        addJournal('Filtration audit motion unrecorded in council minutes — seconder later resigned', 'intelligence', `aur-council-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Pella Greave runs the dome transit desk — the liaison's private exit log never matches the public entry record.",
    tags: ['Stage2', 'NPC', 'Social'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'comparing liaison entry and exit logs via transit steward Pella Greave');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_pella_greave = true;
        G.flags.aurora_liaison_exit_log_mismatch = true;
        G.investigationProgress++;
        G.lastResult = `Pella sets the entry log and the exit log side by side on the transit desk without being asked — she has already put them together. Six visits. Each entry log shows the liaison departing through the main gate with one sealed documentation case. The exit log, which Pella maintains separately for cargo movement, shows two cases cleared on departure on four of those six visits. The second case is logged under a maintenance equipment return code that Pella cannot find in the equipment registry. "I started keeping a cross-reference three visits ago," she says. She slides the cross-reference across the desk. It is annotated in a different-colored ink than the logs.`;
        addJournal('Liaison departs with undocumented second case on 4 of 6 visits — Pella cross-reference log kept privately', 'evidence', `aur-pella-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Pella pulls the entry log and reads through the Collegium liaison visits before she responds. "Collegium-credentialed parties have transit protocol privacy status under dome security agreement." She closes the log. "I cannot share transit records for credentialed parties without a dome security officer's written release." She marks your request in the transit inquiry ledger with a time and a date. The inquiry notation will be visible to dome security when they review the day's log. It is not a threat. It is simply how the system works.`;
        addJournal('Liaison transit records protected — dome security privacy protocol, written release required', 'complication', `aur-pella-fail-${G.dayCount}`);
      } else {
        G.flags.met_pella_greave = true;
        G.investigationProgress++;
        G.lastResult = `Pella talks through the entry log without opening it — she knows the Collegium liaison visits from memory. "Every visit, one case in, one case out. That's the standard." She pauses. "Mostly." The exit log is behind her on the cargo shelf. She doesn't reach for it immediately. "On some visits the cargo clearance is logged under a return code I've had to look up each time. It's not a standard equipment code." She looks at the shelf. "I can show you the log. I'd need to note that I showed you."`;
        addJournal('Liaison departure cargo logged under non-standard return code — Pella notes access on record', 'intelligence', `aur-pella-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The east storage bay hasn't been on the maintenance rotation for three months.",
    tags: ['Stage2', 'Stealth'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'physically examining east storage bay where Class-C crates are staged');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('finesse', (G.skills.stealth||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.aurora_east_bay_examined = true;
        G.investigationProgress++;
        G.lastResult = `The east storage bay has three active Class-C transport crates in the back left section, stacked two-high. The labeling is consistent with industrial chemical transport: compound class, handling code, supplier mark — Northern Provision Compact, stenciled in the same font as the intake manifests. One crate has been opened and resealed. The seal is newer than the crate itself; the original bonding adhesive is still visible under the edge. Inside, nested in transit packing: glass-sealed compound containers, each labeled with a concentration value four times the registered filtration compound limit. Someone has been decanting into the intake system at a concentration the labels explicitly prohibit.`;
        addJournal('East bay crate opened and resealed — compound concentration 4x registered limit, decanting into intake confirmed', 'evidence', `aur-eastbay-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `The east storage corridor has two dome stewards posted at the junction — not at the bay itself, but close enough that reaching it without being seen requires patience you don't have. One of them clocks your approach before you make the corner. She steps into the corridor and waits. "This section is under active security hold." She writes your name in a pocket ledger. "I'll need to see your transit certification and a purpose statement." The bay stays unexamined. The security hold notation sits next to your name in her ledger for the rest of the day.`;
        addJournal('East bay corridor under active security hold — access logged and denied', 'complication', `aur-eastbay-fail-${G.dayCount}`);
      } else {
        G.flags.aurora_east_bay_examined = true;
        G.investigationProgress++;
        G.lastResult = `The east storage bay holds the Class-C crates in the back section, stacked and sealed. The crates are labeled correctly — compound class, supplier, handling instructions. One crate's transport seal is newer than its exterior markings. The adhesive line under the fresh seal hasn't fully bonded to the older surface. You can't open it without leaving evidence. But the concentration value printed on the outside label is twice what the intake manifests describe as the compound's standard application rate. The numbers on the crate and the numbers in the maintenance log do not agree.`;
        addJournal('East bay crate seal replaced — exterior concentration label contradicts intake manifest figures', 'intelligence', `aur-eastbay-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The dismissed technician filed two anomaly reports. Neither reached the maintenance record.",
    tags: ['Stage2', 'Lore'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'tracing dismissed technician anomaly reports through dome administrative system');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.aurora_anomaly_reports_traced = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The dome maintenance incident register holds both reports — filed, timestamped, and classified downward from anomaly to routine maintenance variance within forty-eight hours of each submission. Both reclassifications carry the same authorization code: the Collegium liaison's administrative access credential. The reclassification stripped the reports of their anomaly status before any review could be triggered, then filed them in the variance archive where they would not surface in the active maintenance log. The technician who filed them was dismissed four days after the second report. Her dismissal paperwork cites inadequate record-keeping. Both reports are detailed, organized, and correct.`;
        addJournal('Both anomaly reports reclassified by liaison credential — dismissed four days after second filing, reports accurate', 'evidence', `aur-reports-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The maintenance incident register requires a dome administration access code to query historical reports — the live queue is open, but anything older than the current quarter sits behind an archive tier. Accessing the archive tier from an external party terminal flags the access in the administrative audit log. You get three entries into the archive tier before the terminal session auto-terminates and generates a notification for dome administration. The reports are in there. Getting to them from here just told someone you were looking.`;
        addJournal('Archive tier access flagged — dome administration notified of external terminal query', 'complication', `aur-reports-fail-${G.dayCount}`);
      } else {
        G.flags.aurora_anomaly_reports_traced = true;
        G.investigationProgress++;
        G.lastResult = `Both reports are in the variance archive — not the anomaly record, the variance archive. Reclassified within forty-eight hours of filing, each one. The reclassification entries have an authorization code, but it's a liaison-tier code, not a maintenance supervisor code. A maintenance supervisor should be reclassifying maintenance reports. The person who filed the reclassifications isn't in the maintenance chain. The dismissed technician's reports were accurate. They reached the right desk. The right desk buried them.`;
        addJournal('Technician anomaly reports reclassified by liaison-tier code — buried in variance archive, not maintenance log', 'intelligence', `aur-reports-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Sovan Drest knows which workers were moved away from the intake section and why they didn't ask questions.",
    tags: ['Stage2', 'NPC', 'Social'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'talking to dome labor representative Sovan Drest about filtration worker reassignments');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_sovan_drest = true;
        G.flags.aurora_worker_reassignment_confirmed = true;
        G.investigationProgress++;
        G.lastResult = `Sovan doesn't sit when he talks — he stays at the labor board, one shoulder angled toward the window where he can watch the gallery corridor. Four workers were rotated off the filtration intake section over three months. Each rotation came with a work-credit bonus logged as a hazard exposure benefit. "Hazard pay for rotating away from the hazard," he says quietly. "Not for rotating toward it." He names all four workers. Each accepted the rotation. Each is still in the commune. "They know something's wrong in that section," he says. "They took the money to stop knowing it." He looks at the gallery corridor and doesn't look away.`;
        addJournal('Four workers rotated off intake section with hazard bonuses — paid to stop noticing the anomaly', 'evidence', `aur-sovan-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Sovan listens to the question and the answer arrives before you finish asking it: "Worker rotation records are between the dome labor office and the individual workers." He straightens a notice on the board without turning. "I represent the workers. I don't share their labor records with outside parties without their consent." He's not hostile. He's not going to move. Labor representation in Aurora Crown runs on one rule and he just stated it. He goes back to the board. Whatever he knows stays with him until someone he trusts brings it out.`;
        addJournal('Labor representative declined to share rotation records — worker consent required', 'complication', `aur-sovan-fail-${G.dayCount}`);
      } else {
        G.flags.met_sovan_drest = true;
        G.investigationProgress++;
        G.lastResult = `Sovan keeps his eyes on the labor board while he talks. Workers were rotated off the filtration intake section over the past three months — he confirms the number without naming anyone. "Each one received a hazard credit bonus at rotation." He taps a line on the board. "Hazard credit for rotating off a section. That's not how hazard pay works in this commune." He doesn't say anything else about it. He writes something in the labor log and dates it. His hand is steady.`;
        addJournal('Labor rep confirms intake section rotation bonuses — hazard pay structure applied incorrectly', 'intelligence', `aur-sovan-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The delivery vehicles have fleet marks — Northern Provision Compact has no registered fleet.",
    tags: ['Stage2', 'Survival'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'examining delivery vehicle fleet marks against Northern Provision Compact registration');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('vigor', (G.skills.survival||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.aurora_fleet_marks_traced = true;
        G.investigationProgress++;
        G.lastResult = `The dome exterior intake bay has a vehicle log nailed to the post at the access road junction — Theron's work, a pencil habit nobody authorized. The last six delivery vehicles are listed by arrival time, driver count, and a notation Theron made of the fleet marks. You run the marks against the transport registry at the commune's market counter. None of them are registered to Northern Provision Compact. Three are registered to a haulage company based out of Cosmouth. Two have no registry entry at all. The vehicles arriving as Northern Provision Compact deliveries belong to other entities entirely — or to nothing.`;
        addJournal('Delivery fleet marks traced — vehicles registered to Cosmouth haulage company or unregistered, not Northern Provision Compact', 'evidence', `aur-fleet-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The intake bay access road runs along the dome exterior — outside the main gate, which means outside the dome security perimeter. A pair of men in Collegium-marked coats are running a vehicle check at the access road junction when you arrive, positioned where they would see anyone approaching the bay from the settlement side. They don't stop you. They don't need to. You came from the direction they were watching and they logged the time before you turned back. They are still at the junction when you reach the main gate.`;
        addJournal('Collegium personnel monitoring intake bay access road — approach logged', 'complication', `aur-fleet-fail-${G.dayCount}`);
      } else {
        G.flags.aurora_fleet_marks_traced = true;
        G.investigationProgress++;
        G.lastResult = `Theron's vehicle notations from the intake bay log give you four fleet mark sets across the last six deliveries. You run them against the transport registry at the market counter — Northern Provision Compact has no fleet registration at all. The marks on three of the vehicles match a Cosmouth-based haulage company. One mark comes back unregistered. The deliveries are arriving in vehicles that don't belong to the supplier listed on the intake manifests. The manifest supplier and the actual carrier are different entities.`;
        addJournal('Northern Provision Compact has no registered fleet — delivery vehicles belong to Cosmouth haulage company', 'intelligence', `aur-fleet-partial-${G.dayCount}`);
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
