/**
 * AURORA CROWN COMMUNE STAGE 2 ENRICHED CHOICES
 * Investigation arc: dome air filtration system / glyph surge residue suppression
 * NPCs: Warden Sera Whiteglass (Dome Stabilizer Marshal), Mariel Sealwater (Innkeeper),
 *       Cadrin Sealwater (Market Clerk), Liora Sealwater (Shrine Attendant), Theron Sealwater (Porter)
 */

var AURORA_CROWN_COMMUNE_STAGE2_ENRICHED_CHOICES = [

  {
    label: 'The memorial registry has names but no dates. Someone removed the dates.',
    tags: ['Investigation', 'Stage2'],
    plot: 'main',
    skill: 'wits',
    stageProgress: 1,
    xpReward: 40,
    failResult: 'The memorial registry is maintained under Collegium seal — access requires a formal notation request.',
    fn: function() {
      advanceTime(1);
      if (!G.stageProgress) G.stageProgress = {1:0,2:0,3:0,4:0,5:0};
      var result = rollD20('wits');
      if (result.isCrit || result.total >= 12) {
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        if (typeof maybeStageAdvance === 'function') maybeStageAdvance();
        G.lastResult = 'The memorial registry at the Commune\'s archive rotunda lists forty-seven names across a three-year span. Every column is filled: honorific, origin polity, cause of notation. The date column runs blank for eleven consecutive entries. The entries before and after carry standard date stamps. Someone removed these eleven — not erased, removed: the ink is present but the numbers have been carefully blotted with a matching shade. The blotting is precise. This was done with care.';
        addJournal('Aurora memorial registry: eleven consecutive entries have dates deliberately blotted. Surrounding entries dated normally. The removal was careful, not rushed.', 'evidence', 'aurora-registry-gap-' + (G.dayCount||0));
        if (typeof gainXp === 'function') gainXp(40);
        G.recentOutcomeType = 'discover';
      } else {
        G.recentOutcomeType = 'fail';
        G.lastResult = 'The archive rotunda has a restricted partition for Collegium-sealed records. The memorial registry for the relevant period sits behind that partition. A notation clerk at the desk explains the access procedure: a formal request, countersigned by a registered Commune advocate, reviewed within fourteen working days. She has a stack of blank request forms. The forms are printed, not hand-written — a standard response to a common problem.';
        if (typeof gainXp === 'function') gainXp(15);
        if (typeof maybeStageAdvance === 'function') maybeStageAdvance();
      }
    }
  },

  {
    label: 'The devotional aides know what the archive does not. They remember faces.',
    tags: ['NPC', 'Stage2'],
    plot: 'main',
    skill: 'charm',
    stageProgress: 1,
    xpReward: 40,
    failResult: 'The senior aide refers you to the Commune\'s formal testimony process — what she knows is not hers to share without authorization.',
    fn: function() {
      advanceTime(1);
      if (!G.stageProgress) G.stageProgress = {1:0,2:0,3:0,4:0,5:0};
      var result = rollD20('charm');
      if (result.isCrit || result.total >= 12) {
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        if (typeof maybeStageAdvance === 'function') maybeStageAdvance();
        G.lastResult = 'Senne, a devotional aide who has worked the Commune\'s eastern memorial hall for eleven years, remembers the period without prompting. Four individuals came through within a single week — unusual enough that she noted it in her personal record. They were not together. None of them asked for the standard registry process. Two paid in Collegium scrip. Senne pulls her personal record from a locked drawer. The entries are in her hand, not the archive\'s.';
        addJournal('Devotional aide Senne recalls four individuals in one week using the memorial hall outside standard process. Two paid in Collegium scrip. She kept her own record.', 'intelligence', 'aurora-aide-senne-' + (G.dayCount||0));
        if (typeof gainXp === 'function') gainXp(40);
        G.recentOutcomeType = 'discover';
      } else {
        G.recentOutcomeType = 'fail';
        G.lastResult = 'The senior devotional aide listens to the question with the patience of someone who has been asked versions of it before. She does not deflect — she explains. What she witnessed during that period is covered under the Commune\'s testimony sanctity clause, which requires formal authorization before she can repeat it to anyone outside the hall. She is sorry. She means it. The clause exists for good reasons. She says this last part quietly. She sets the pen down on the desk between you and does not reach for it again.';
        if (typeof gainXp === 'function') gainXp(15);
        if (typeof maybeStageAdvance === 'function') maybeStageAdvance();
      }
    }
  },

  {
    label: "The sensors were changed. The dome still reads safe.",
    tags: ['Investigation', 'Stage2'],
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
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.factionHostility.oversight_collegium = (G.factionHostility.oversight_collegium||0) + 1;
        G.lastResult = `Sera pulls the calibration log without being asked. She found the change three weeks ago — not a malfunction, the codes were altered deliberately, using Collegium administrative credentials routed through an external access. She points to the timestamp. The sensor suppression has been running since then. Aurora Crown's reported glyph exposure figures go to the broader settlement network at the suppressed rate. On paper the commune reads safe. Sera sets the log on the desk between you and doesn't pick it up again.`;
        addJournal('Dome sensors recalibrated by Collegium access — filed records suppress exposure data', 'evidence', `aur-sera-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.factionHostility.oversight_collegium = (G.factionHostility.oversight_collegium||0) + 1;
        G.lastResult = `Sera's security protocol classifies any external inquiry into dome sensor calibration as a potential sabotage probe — a distinction you learn only after she's already flagged it. She detains you in the administration anteroom for forty minutes. Identification documentation. Written statement of purpose. Two of her staff present. She sets your written statement on the desk in front of her, smooths it flat with one hand, and does not look at it again while she speaks. She releases you without apology. Your name is now in the dome security log with a protocol flag next to it.`;
        addJournal('Dome security protocol triggered — brief detention, identification required', 'complication', `aur-sera-fail-${G.dayCount}`);
      } else {
        G.flags.met_warden_sera_whiteglass = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Sera confirms the irregularities without being told what you already know. "Consistent with external recalibration," she says, pulling a second file. She's been working on the access event since she found it. "Someone changed our baseline readings." She writes something in her log, caps the pen, looks at you. "I don't know why yet. I intend to." She smooths the written statement flat with one hand and does not look at it again. Her jaw is set. She's already moving to the next step before you've left the room.`;
        addJournal('Dome sensor baseline changed by external access — Sera working the access event', 'evidence', `aur-sera-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Maintenance supply crates arrive monthly. They never go to maintenance.",
    tags: ['NPC', 'Survival', 'Stage2'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'examining filtration maintenance deliveries with Theron Sealwater');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('vigor', (G.skills.vigor||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_theron_sealwater = true;
        G.investigationProgress++;
        G.lastResult = `Theron has been tracking the quarantine bypasses in his own ledger — separate from the intake log, columns ruled in pencil. He shows you both. The authorization code belongs to the Collegium's Aurora Crown administrative liaison. The same liaison who appears in the sensor recalibration access record. Theron opens one of the delivery manifests and points at the chemical compound concentrations listed. "Those are consistent with glyph suppression precursors," he says. Not a question. He's looked this up. "They go straight into the filtration intake."`;

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
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The filtration budget tripled. Nothing new was built.",
    tags: ['NPC', 'Craft', 'Stage2'],
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
        G.lastResult = `Cadrin runs his finger to the single line item where the entire budget increase lives: "specialized filtration compound procurement." He reads the supplier name aloud: Northern Provision Compact. He checks the approved vendor registry while you watch — it isn't there, and it wasn't in the prior year either. The approval came through the Collegium liaison category, bypassing the vendor registry requirement entirely. Aurora Crown's maintenance budget is funding compound purchases from a supplier that doesn't appear in any filed record.`;
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
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The liaison's documents arrive with one seal. They leave with another.",
    tags: ['NPC', 'Stealth', 'Stage2'],
    xpReward: 66,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'questioning Mariel Sealwater about Collegium liaison activity');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('finesse', (G.skills.finesse||0) + Math.floor(G.level/3));
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
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The shrine attendance spikes the same week as every delivery.",
    tags: ['NPC', 'Lore', 'Stage2'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'correlating health petitions with delivery schedule via Liora Sealwater');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_liora_sealwater = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
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
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The commune scribe doesn't file what she can't account for. She can't account for these.",
    tags: ['stage2', 'aurora_crown_commune'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      var roll = rollD20('wits', G.skills.wits);
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
    label: "The maintenance gallery smells wrong. The residue doesn't match the manifests.",
    tags: ['stage2', 'aurora_crown_commune'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      var roll = rollD20('vigor', G.skills.vigor);
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
    label: "The dome flagged my transit record. I'm now a repeat non-compliant on paper.",
    tags: ['stage2', 'aurora_crown_commune'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      var roll = rollD20('finesse', G.skills.finesse);
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
      var roll = rollD20('charm', G.skills.charm);
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
      var roll = rollD20('finesse', G.skills.finesse);
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
      var roll = rollD20('wits', G.skills.wits);
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
    plot: 'main',
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'tracing filtration chemical supplier change through Warden Sera Whiteglass records');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_warden_sera_whiteglass = true;
        G.flags.aurora_supplier_change_traced = true;
        G.investigationProgress++;
        G.stageProgress[2]++;
        G.lastResult = `Sera lays the chemical procurement file on her desk and opens it to the authorization page. The supplier change — from the commune's established filtration vendor to Northern Provision Compact — was approved under the founding charter technical committee's standing authority. She shows you the committee's last meeting record: eight months ago. The compound class Northern Provision Compact supplies isn't in the commune's approved substance registry. She signed off on it because the authorization looked formal. She looks at the page for a long moment. "This committee has not convened since before the deliveries began," she says. She closes the file slowly, then opens it again.`;
        addJournal('Filtration supplier change authorized by dormant charter committee — compound class unregistered', 'evidence', `aur-sera-supplier-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        addHeat('shelk', 1);
        G.lastResult = `The procurement file sits in the dome administration archive under a classification tier that requires Sera's own counter-authorization to access — a protocol she put in place after the quarantine bypass anomalies. She initiates the authorization while you watch, which generates a security log entry for the archive access. Someone auditing the dome's archive activity will see it. The file will take until the following morning to clear. She notes the time. You note the log.`;
        addJournal('Procurement archive access flagged — security log entry generated', 'complication', `aur-sera-supplier-fail-${G.dayCount}`);
      } else {
        G.flags.met_warden_sera_whiteglass = true;
        G.investigationProgress++;
        G.lastResult = `Sera pulls the supplier change authorization and reads it through once before she hands it to you. The founding charter technical committee signed off on it. She shows you the committee's meeting schedule on the wall calendar — the last session was eight months ago. "They have standing authority," she says. "The authorization was technically valid." She taps the compound class listed for Northern Provision Compact. "That class is not in our approved registry." She's already started a second file on the desk, pulling records in sequence.`;
        addJournal('Filtration supplier approved by dormant committee — compound class outside approved registry', 'intelligence', `aur-sera-supplier-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The residents nearest the filtration intake have been attending the shrine the most.",
    tags: ['Stage2', 'NPC', 'Survival'],
    plot: 'main',
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'mapping shrine resensitization attendance against filtration intake geography');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('vigor', (G.skills.vigor||0) + Math.floor(G.level/3));
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
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
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
      const result = rollD20('charm', (G.skills.charm||0) + Math.floor(G.level/3));
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
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
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
      const result = rollD20('finesse', (G.skills.finesse||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.aurora_dismissed_technician_found = true;
        G.investigationProgress++;
        G.lastResult = `She answers the door immediately, as if she was expecting it to be someone eventually. Her name isn't on the dismissal record — just her role and the administrative reason. She has a copy of her technical log for the six months before her dismissal, kept in a cloth-wrapped sleeve under the worktable. "Inadequate record-keeping," she says, setting the sleeve on the table. "I kept detailed records. That was the problem." The log covers the compound introduction in month three: compound class, delivery source, intake concentrations. She recorded the smell anomaly on day two. Her dismissal order is dated four days after that entry.`;
        addJournal('Dismissed technician log shows compound introduction noted and anomaly recorded — dismissal followed four days later', 'evidence', `aur-tech-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        addHeat('shelk', 1);
        G.lastResult = `The quarter near the filtration access is small enough that a stranger moving through it at an off-hour is noticed before they reach the address. A dome steward falls in behind you two blocks out — routine, unhurried, but consistent. When you reach the technician's residence the door doesn't open. The following morning a notation appears in the dome administration visitor log: external party, filtration quarters, unannounced, evening hours. Someone added a cross-reference to your name at the dome checkpoint.`;
        addJournal('Filtration quarters patrol noted — steward surveillance triggered, visitor log entry created', 'complication', `aur-tech-fail-${G.dayCount}`);
      } else {
        G.flags.aurora_dismissed_technician_found = true;
        G.investigationProgress++;
        G.lastResult = `She doesn't introduce herself. She opens the log to the month the new compound arrived and sets it on the table between you without explanation. "I recorded the intake concentrations every delivery. The smell was wrong from the first one." She turns to the page with her dismissal date marked in the margin. "I'd submitted two anomaly reports by then." The log is complete. It covers the period before her dismissal. She did not give up her copy when she left because no one asked her to.`;
        addJournal('Dismissed technician log confirms compound anomaly reported before dismissal — two reports on file', 'intelligence', `aur-tech-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
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
      const result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_cadrin_sealwater = true;
        G.flags.aurora_sealant_surplus_traced = true;
        G.investigationProgress++;
        G.lastResult = `Cadrin lays the purchase record and the maintenance inventory side by side on the counter. The dome sealant purchase — four months ago, quantity sufficient for a decade of standard maintenance — shows a delivery address in the commune's maintenance stores. The current inventory shows three months of standard supply. The gap between purchased and present is nine-tenths of the original order. Cadrin runs the arithmetic twice. "It was received," he says. "Signed and received. Then it moved." He checks the transfer log. There is no outbound entry. "Whatever it moved into, it moved off the books."`;
        addJournal('Dome sealant surplus received and logged — nine-tenths transferred off-book, no outbound record', 'evidence', `aur-cadrin-sealant-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        addHeat('shelk', 1);
        G.lastResult = `The finance committee notification went out when you accessed the main supply ledger earlier. When you pull the dome sealant line item separately, a second notification generates automatically — two external access events in the same ledger category triggers an escalation flag. Cadrin shows you the escalation notice on his screen with the expression of someone who has now been involved in something he didn't choose. "The committee chair will have this before the end of the day," he says. He closes the ledger.`;
        addJournal('Second ledger access triggered escalation flag — finance committee chair notified', 'complication', `aur-cadrin-sealant-fail-${G.dayCount}`);
      } else {
        G.flags.met_cadrin_sealwater = true;
        G.investigationProgress++;
        G.lastResult = `Cadrin finds the sealant purchase in thirty seconds — a line item that size is not easy to miss once you know to look. He checks the maintenance inventory without being asked. "Received and signed for four months ago. Current stores hold about a month's worth of normal use." He does the subtraction on the ledger margin, pencil, no calculator. "The rest isn't in any maintenance record." He underlines the number. "If it was moved, it was moved without a transfer entry." He does not speculate about where it went.`;
        addJournal('Dome sealant bulk purchase confirmed — surplus absent from all maintenance records', 'intelligence', `aur-cadrin-sealant-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The liaison's credential ran inside the dome on days the liaison wasn't here.",
    tags: ['Stage2', 'NPC', 'Lore'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'cross-referencing liaison credential access history in dome archive');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.aurora_credential_ghost_access = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The dome archive access log shows sixteen credential uses attributed to the Collegium liaison over four months. You pull the liaison's recorded visit schedule from the transit intake register — Mariel's inn booking dates. The credential was used on eleven days when the liaison was not in the commune. Someone inside the dome is operating under the liaison's access code. You copy both columns side by side. The gap between arrival dates and credential activity is not accidental. The insider has been running administrative changes between visits.`;
        addJournal('Liaison credential used on days liaison absent — insider operating under borrowed access code', 'evidence', `aur-cred-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        addHeat('shelk', 1);
        G.lastResult = `The archive access log sits behind the dome security classification tier — the same tier Sera's authorization unlocked for you once already. Pulling it a second time from a different entry point generates a duplicate access flag. The security system marks the pattern as anomalous. A log entry is created, timestamped, and routed to Sera's security queue. She will see it by morning. Whether she reads it as your diligence or your overreach depends on what she already thinks of you.`;
        addJournal('Duplicate archive access flag generated — Sera notified via security queue', 'complication', `aur-cred-fail-${G.dayCount}`);
      } else {
        G.flags.aurora_credential_ghost_access = true;
        G.investigationProgress++;
        G.lastResult = `The access log shows credential activity attributed to the liaison on dates that don't line up with the inn's booking record. The discrepancy is three days across four months — narrow enough to miss without both records side by side. You note the dates. Someone with the liaison's credential code made archive changes between visits. The log doesn't record who held the physical access key. That answer is somewhere else in the dome.`;
        addJournal('Liaison credential active between visits — 3-day access discrepancy confirmed', 'intelligence', `aur-cred-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "A second distribution path runs under the filtration intake. It isn't on any schematic.",
    tags: ['Stage2', 'NPC', 'Survival'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'tracing secondary contamination vector via condensate lines with Orvyn Mast');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('vigor', (G.skills.vigor||0) + Math.floor(G.level/3));
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
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The council tabled a motion four months ago. No vote is recorded.",
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
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The liaison's private exit log never matches the public entry record.",
    tags: ['Stage2', 'NPC', 'Social'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'comparing liaison entry and exit logs via transit steward Pella Greave');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.charm||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_pella_greave = true;
        G.flags.aurora_liaison_exit_log_mismatch = true;
        G.investigationProgress++;
        G.lastResult = `Pella sets the entry log and the exit log side by side on the transit desk without being asked — she has already put them together. Six visits. Each entry log shows the liaison departing through the main gate with one sealed documentation case. The exit log, which Pella maintains separately for cargo movement, shows two cases cleared on departure on four of those six visits. The second case is logged under a maintenance equipment return code that Pella cannot find in the equipment registry. "I started keeping a cross-reference three visits ago," she says. She slides the cross-reference across the desk. It is annotated in a different-colored ink than the logs.`;
        addJournal('Liaison departs with undocumented second case on 4 of 6 visits — Pella cross-reference log kept privately', 'evidence', `aur-pella-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        addHeat('shelk', 1);
        G.lastResult = `Pella pulls the entry log and reads through the Collegium liaison visits before she responds. "Collegium-credentialed parties have transit protocol privacy status under dome security agreement." She closes the log. "I cannot share transit records for credentialed parties without a dome security officer's written release." She marks your request in the transit inquiry ledger with a time and a date. The inquiry notation will be visible to dome security when they review the day's log. It is not a threat. It is simply how the system works.`;
        addJournal('Liaison transit records protected — dome security privacy protocol, written release required', 'complication', `aur-pella-fail-${G.dayCount}`);
      } else {
        G.flags.met_pella_greave = true;
        G.investigationProgress++;
        G.lastResult = `Pella talks through the entry log without opening it — she knows the Collegium liaison visits from memory. "Every visit, one case in, one case out. That's the standard." She pauses. "Mostly." The exit log is behind her on the cargo shelf. She doesn't reach for it immediately. "On some visits the cargo clearance is logged under a return code I've had to look up each time. It's not a standard equipment code." She looks at the shelf. "I can show you the log. I'd need to note that I showed you."`;
        addJournal('Liaison departure cargo logged under non-standard return code — Pella notes access on record', 'intelligence', `aur-pella-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
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
      const result = rollD20('finesse', (G.skills.finesse||0) + Math.floor(G.level/3));
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
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
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
      const result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
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
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The workers moved from intake didn't ask questions. Someone knows why they didn't.",
    tags: ['Stage2', 'NPC', 'Social'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'talking to dome labor representative Sovan Drest about filtration worker reassignments');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.charm||0) + Math.floor(G.level/3));
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
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
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
      const result = rollD20('vigor', (G.skills.vigor||0) + Math.floor(G.level/3));
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
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The dosing pattern matches a technique the Compact documented before the suppression period.",
    tags: ['Stage2', 'Lore', 'Arcane'],
    xpReward: 80,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(80, 'connecting dome dosing method to Resonance Compact pre-suppression documentation');
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags.arcane_contact_2) {
        G.lastResult = 'The amber residue and the intake concentrations tell part of the story, but matching them to any specific documented technique requires a thread that has not yet surfaced here. There is more groundwork to lay before this connection can be made. The pine cold comes through the high-latitude hall vents — the commune\'s ventilation runs continuously, regardless of season, regardless of what moves through it. Whatever is in the system is already circulating. The documentation to name it precisely isn\'t in hand yet.';
        return;
      }
      var result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.total >= 13 || result.isCrit) {
        G.flags.arcane_contact_3 = true;
        G.flags.stage2_faction_contact_made = true;
        G.investigationProgress = (G.investigationProgress||0) + 1;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The dismissed technician\'s log describes the compound profile in precise field notation — compound class, intake concentration curve, dispersal rate through the dome\'s ventilation cycle. You set the Compact\'s pre-classification research notes beside it. The match is exact: not approximate, not similar. The same delivery method the Compact developed to map population glyph sensitivity for protective purposes is being run here in reverse, as an exposure protocol. The technician reads the comparison without speaking for a long time. Then she pulls a name from memory: a Compact operative still working in the northern circuit who would recognize this as her organization\'s own method being used against the people it was built to protect.';
        addJournal('Dome dosing method matches Resonance Compact protective protocol exactly — Compact operative identified, willing to act', 'contact_made');
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'The comparison requires access to the Compact\'s original documentation, and the only copy available here is incomplete — field notes without the full protocol specification. The match is suggestive but not demonstrable. Someone at the dome stewardship level has also noticed the research materials spread across the technician\'s table; a note goes into the visitor log before you have packed them away.';
        addJournal('Compact protocol comparison inconclusive — incomplete field notes, visitor log entry generated', 'complication');
      } else {
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The compound profile in the technician\'s log is consistent with a Compact-documented dispersal method — the concentration curve follows the same shape, the ventilation-cycle timing matches. Consistent is not identical, and the Compact\'s original documentation is not accessible here in full. But the technician examines the field notes and says, quietly, that she has seen the intake behavior before in a research context she does not name. The connection is there. It is not yet closeable.';
        addJournal('Dome intake profile consistent with Compact dispersal method — technician confirms pattern without naming source', 'evidence');
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The evidence is complete. The dome is being dosed. Time to move.",
    tags: ['Investigation', 'Finale', 'Stage2', 'Consequence'],
    xpReward: 110,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(110, 'Aurora Crown Commune Stage 2 resolution');
      if (!G.investigationProgress || G.investigationProgress < 8) {
        G.lastResult = `The evidence chain isn't complete yet. Acting on the dome system now, without the full documentation, leaves too many gaps for the delivery contract to survive a challenge. More is needed before the next move. The meeting house holds the woodsmoke from the morning's council session — the collective governance of Aurora Crown doesn't act on incomplete information, and that same standard applies here. A partial presentation gives the Collegium liaison room to dismiss the claim before the full record is assembled.`;
        G.recentOutcomeType = 'partial'; return;
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
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: 'The ritual calendar has a gap. An observance period that never happened',
    tags: ['Records', 'Evidence'],
    xpReward: 20,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(20, 'calendar gap anomaly');
      G.lastResult = 'The ritual calendar is maintained in the dome archive — precise, continuous, going back fifteen cycles. Every observance period is logged: preparation, peak, close. One period is absent entirely. The surrounding entries continue without notation. There is no cancellation record, no postponement, no explanation. The gap is the right duration for the period that should be there. The calendar simply skips it, as if the observance never existed.';
      addJournal('Aurora Crown Commune ritual calendar shows a missing observance period — no cancellation or postponement recorded, surrounding entries uninterrupted. Source: Aurora Crown dome archive.', 'evidence', `aur-cal-gap-${G.dayCount}`);
      G.recentOutcomeType = 'success';
      G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
      maybeStageAdvance();
    }
  },

  {
    label: 'The dome keeper deflects questions about the missing period',
    tags: ['NPC', 'Intelligence'],
    xpReward: 15,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(15, 'dome keeper deflection');
      G.lastResult = 'She knows which period you mean before you finish naming it. Her answer is about the dome\'s light-indexing system — how the apertures are calibrated, how each cycle\'s records feed the next cycle\'s alignment. It is accurate and detailed and has nothing to do with what you asked. She does not say there is nothing unusual. She does not say the period existed. She answers the question she prefers you to have asked.';
      addJournal('Aurora Crown dome keeper gave a detailed deflection about light-indexing when asked about the missing observance period. Source: Aurora Crown dome archive, keeper\'s office.', 'intelligence', `aur-keeper-deflect-${G.dayCount}`);
      G.recentOutcomeType = 'success';
      maybeStageAdvance();
    }
  },

  {
    label: 'Celestial observation records have a gap that matches the calendar',
    tags: ['Records', 'Evidence'],
    xpReward: 20,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(20, 'observation gap correlation');
      G.lastResult = 'The dome\'s observational records and the ritual calendar are kept separately, cross-referenced by date. The observation records for the missing period are there — nightly entries, aperture readings, alignment notes. But they are not cross-referenced to any ritual entry. The observation continued. The ritual did not. Whatever happened during that period was observed but not marked. The dome was watching. The calendar was told to look away.';
      addJournal('Aurora Crown celestial observation records continue through the missing calendar period with no ritual cross-reference — the dome observed, but the period was not marked. Source: Aurora Crown observation archive.', 'evidence', `aur-obs-gap-${G.dayCount}`);
      G.recentOutcomeType = 'success';
      G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
      maybeStageAdvance();
    }
  },

  {
    label: 'Administrative filings cite the dome calendar as their timing reference',
    tags: ['Discovery', 'Evidence'],
    xpReward: 25,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(25, 'dome calendar timing reference');
      G.lastResult = 'The dome calendar is public — the commune uses it for everything. Cross-referencing dates: an administrative filing elsewhere cites an Aurora Crown observance date as its effective date. Not a guild date. Not a seasonal date. A specific light-calendar observance from the dome. Someone used Aurora Crown\'s ritual calendar as the timing mechanism for an administrative action taken somewhere else. The missing observance period corresponds to a filing that has no effective date recorded.';
      addJournal('An external administrative filing uses Aurora Crown dome calendar dates as timing reference — the missing observance period corresponds to a filing with no effective date. Source: Aurora Crown archive, cross-reference research.', 'evidence', `aur-cal-timing-${G.dayCount}`);
      G.recentOutcomeType = 'success';
      G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
      maybeStageAdvance();
    }
  },


  // ── DOME FILTRATION RECORDS & GLYPH SURGE DATA (5) ──────────────────────────

  {
    label: "The glyph surge log skips three entries. The intake was active those days.",
    tags: ['Dome', 'Stage2', 'Lore'],
    xpReward: 74,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'cross-referencing glyph surge log gaps with filtration intake active periods');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.aurora_surge_log_gap_traced = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The surge monitoring terminal in the stabilizer corridor runs on a continuous cycle — every anomalous glyph-resonance event logged, timestamped, archived. Three entries are absent from the sequence. Not corrupted: absent. The surrounding entries carry unbroken index numbers except where the gap sits. You pull the intake manifold activity record for the same dates from the wall-mounted service log. The intake was running at elevated draw on all three days. Someone removed the surge entries after the fact, while the physical intake log — pencil on card stock, no remote access — kept running.';
        addJournal('Glyph surge log missing 3 entries — intake active on all three days, physical log intact and unaltered', 'evidence', 'aur-surge-gap-' + G.dayCount);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'The stabilizer corridor terminal requires a dome maintenance access code for archive queries — a code your current clearance level does not include. The access attempt registers in the terminal audit log before the denial screen appears. A dome steward at the far end of the corridor looks up from her clipboard. She does not approach. She writes something down. The terminal logs a failed external access attempt with your transit stamp attached.';
        addJournal('Surge terminal access denied — failed attempt logged with transit stamp', 'complication', 'aur-surge-gap-fail-' + G.dayCount);
      } else {
        G.flags.aurora_surge_log_gap_traced = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Three index numbers in the surge monitoring sequence are absent. Not flagged, not annotated — simply gone, the surrounding entries running normally on either side of the gap. You check the service log clipped to the intake manifold housing. The intake draw was elevated on all three dates. The digital log and the handwritten service card tell different stories about the same three days. One of them was edited. The other one hangs on a wall hook in the maintenance corridor and has not been touched since the last inspection.';
        addJournal('Surge log index gaps on elevated-intake days — physical service card contradicts digital archive', 'evidence', 'aur-surge-gap-part-' + G.dayCount);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The filtration cycle timer was extended. The air stayed in the dome longer.",
    tags: ['Dome', 'Stage2', 'Survival'],
    xpReward: 71,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(71, 'examining filtration cycle timer extension records in the dome stabilizer corridor');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('vigor', (G.skills.vigor||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.aurora_cycle_timer_extended = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The cycle timer panel in the eastern filtration corridor shows its full parameter history on the interior maintenance display — a feature intended for calibration audits that no one has used for that purpose in months. Four months ago, the recirculation dwell time was extended from ninety minutes to two hundred and forty minutes. The change is logged under a Collegium technical services code. A longer dwell time means any compound entering the intake circulates through the dome\'s air supply for nearly three times as long before venting. The amber residue ring inside the intake throat makes a different kind of sense now.';
        addJournal('Cycle timer extended from 90min to 240min dwell — Collegium code, compound exposure tripled per cycle', 'evidence', 'aur-cycle-timer-' + G.dayCount);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'The filtration corridor is under an active labor rotation when you reach the cycle timer panel — two workers running thermal conduit checks along the wall bank, foreman watching the corridor junction. He clocks your approach before you reach the panel and plants himself between you and the maintenance display. The corridor requires safety clearance during active rotation. He gives you the clerk\'s name for the clearance form. He does not move.';
        addJournal('Filtration corridor blocked during rotation — clearance form required', 'complication', 'aur-cycle-timer-fail-' + G.dayCount);
      } else {
        G.flags.aurora_cycle_timer_extended = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The cycle timer parameter history shows a dwell-time change four months back — ninety minutes extended to two hundred and forty. The authorization code in the change log is a Collegium technical services designation. A longer dwell time means air recirculates longer before venting. You note the date the change took effect and set it against the delivery schedule in your notes. The extended dwell began two weeks after the first Northern Provision Compact delivery. The timing is not a coincidence.';
        addJournal('Cycle dwell extended 4mo ago under Collegium auth — extension postdates first NPC delivery by 2 weeks', 'evidence', 'aur-cycle-timer-part-' + G.dayCount);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The residue concentration readings are filed monthly. The last three were identical.",
    tags: ['Dome', 'Stage2', 'Craft'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'comparing monthly glyph residue concentration reports in dome maintenance archive');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('spirit', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.aurora_residue_reports_cloned = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The monthly residue concentration reports are supposed to reflect actual sensor readings from twelve intake measurement points. For the last three months, all twelve values across all three reports are identical — not approximately, not within rounding error. Exactly identical, digit for digit, to the fourth decimal place. Real sensor data does not do this. The reports were not generated from sensor readings. They were generated by copying the prior month\'s figures. The actual intake concentrations have not been reported to the commune record system in three months. Whatever the sensors are actually reading, it isn\'t reaching the archive.';
        addJournal('Residue concentration reports cloned for 3 months — sensor data not reaching archive, readings fabricated', 'evidence', 'aur-residue-clone-' + G.dayCount);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'The residue concentration archive requires the same authorization tier as the sensor calibration records — Sera\'s access code, already used once this week. A second pull on the same access tier within seven days generates an internal compliance notification. Sera will see it by morning. You close the terminal before the notification completes generating. It generates anyway. The dome administration audit log has timestamped the access attempt regardless.';
        addJournal('Residue archive access generated compliance notification — Sera notified, audit log timestamped', 'complication', 'aur-residue-clone-fail-' + G.dayCount);
      } else {
        G.flags.aurora_residue_reports_cloned = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Three months of residue concentration reports, lined up on the screen. The numbers match across all twelve measurement points on all three reports. Sensor data does not produce identical readings month to month — temperature variation alone shifts the decimals. You compare them a second time. They are copied. Someone has been submitting the prior month\'s report as the current month\'s data for at least three cycles. The actual readings from the sensors are going somewhere that is not the commune archive.';
        addJournal('Three months of residue reports show identical values — actual sensor readings not reaching archive', 'evidence', 'aur-residue-clone-part-' + G.dayCount);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The intake maintenance schedule runs a different corridor than the records show.",
    tags: ['Dome', 'Stage2', 'Stealth'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'physically mapping intake maintenance route against posted schedule in stabilizer corridor');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('finesse', (G.skills.finesse||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.aurora_maintenance_route_diverges = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The posted maintenance schedule says the intake crew works the western corridor. You follow the sound of the work instead of the schedule and find the crew in the eastern corridor — running a service pass on a secondary manifold junction that does not appear on the public schematic. The junction connects the main intake to a recirculation loop that feeds back through the dome\'s residential ventilation system before the primary vent cycle. A compound dosed at the intake would hit this loop first, before it reaches the public air exchange. The workers are doing their jobs. The job is maintaining a distribution pathway that is not on any published schematic.';
        addJournal('Intake crew working undocumented eastern junction — connects intake to residential vent loop before public exchange', 'evidence', 'aur-route-diverge-' + G.dayCount);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = 'You follow the wrong sound — a thermal conduit diagnostic two corridors over — and come out in a section of the dome infrastructure that requires a staff access band. A steward at the junction marks your transit stamp before you can explain. The notation goes into the dome access log with a location flag. The eastern corridor maintenance crew finishes their rotation while you are giving a purpose statement in the access-control anteroom. Whatever they were servicing, they have finished servicing it.';
        addJournal('Wrong corridor — staff access zone entry logged, maintenance crew finished rotation during hold', 'complication', 'aur-route-diverge-fail-' + G.dayCount);
      } else {
        G.flags.aurora_maintenance_route_diverges = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The crew is in the eastern corridor, not the western one the schedule posts. You watch from the junction before they notice you — they are servicing a manifold housing that is not on the wall-mounted schematic near the intake. The housing connects to something further into the dome structure. The foreman sees you eventually and the work stops. "Routine service," he says. He does not say what system the housing connects to. He marks you in his work log before he goes back to it.';
        addJournal('Maintenance crew in eastern corridor — working undocumented manifold housing not on public schematic', 'evidence', 'aur-route-diverge-part-' + G.dayCount);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Theron's porter log has a seven-day blank. The dome was sealed for maintenance.",
    tags: ['Dome', 'Stage2'],
    xpReward: 76,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(76, 'cross-referencing porter log gaps with dome sealing records');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      var result = rollD20('finesse', (G.skills.finesse||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_theron_sealwater = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The seven-day blank in Theron\'s log corresponds exactly to a dome sealing window that isn\'t in the public maintenance schedule. Unofficial sealing requires marshal authorization — Sera Whiteglass\'s signature. But the marshal\'s office has no record of issuing it. Theron lays both documents on the routing board and points at the date columns without speaking. The sealed period moved cargo that does not appear in any manifest Theron was given. He logged the seal dates anyway, in the margin, in pencil, because the dome was quiet and he noticed.';
        addJournal('Seven-day porter gap matches unofficial dome sealing — no marshal record, cargo moved off-manifest', 'evidence', 'aur-theron-seal-' + G.dayCount);
      } else if (result.isFumble) {
        G.lastResult = 'Theron reports the access query to the stabilizer marshal office before you have left the routing room. A compliance notation is filed against your transit stamp. The porter log goes into a secondary archive review — Theron explains this without apology, still writing in his routing board. "Any external request for a maintenance log with a gap in it triggers protocol." He caps his pen. The log is now unavailable until the review completes. He did not make this rule.';
        addJournal('Porter log access flagged — archive review triggered, log unavailable until review completes', 'complication', 'aur-theron-seal-fail-' + G.dayCount);
      } else {
        G.flags.met_theron_sealwater = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Theron confirms the blank but doesn\'t explain it directly. He compares the seven-day window against the maintenance schedule posted on the inner corridor wall — slowly, finger moving down each line. The dome sealing cycle on the schedule doesn\'t match the dates in his log. He marks the discrepancy with his pencil, then caps it. "I log what I observe," he says. "The schedule is what someone else wrote." He hands you the log open to the relevant week.';
        addJournal('Porter log blank vs maintenance schedule mismatch — sealed period not posted on schedule', 'evidence', 'aur-theron-seal-part-' + G.dayCount);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  // ── NPC ENCOUNTERS — SERA, MARIEL, CADRIN, LIORA, THERON (6) ────────────────

  {
    label: "Sera Whiteglass has been sleeping in the marshal office. She found something she can't unfind.",
    tags: ['NPC', 'Stage2', 'Craft'],
    xpReward: 78,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(78, 'pressing Warden Sera Whiteglass on what she has found in the marshal office overnight');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('spirit', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_warden_sera_whiteglass = true;
        G.flags.aurora_sera_overnight_found = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Sera has a bedroll under her desk — visible because she didn\'t move it when she stood up. She opens the third drawer before she sits and puts a folder on the desk without covering the bedroll first. "I found the internal compliance review." The folder is four pages. A dome administration review of the filtration intake anomalies, commissioned three months ago, completed two months ago, never entered into the public record. The review\'s conclusion: the anomalies are consistent with intentional compound dosing. It was classified and filed under a technical maintenance category. The administrator who classified it was the Collegium liaison\'s counterpart in the commune executive. She holds up the page with the signature. "This is who buried it."';
        addJournal('Internal compliance review found — confirms intentional dosing, classified by commune executive at liaison instruction', 'evidence', 'aur-sera-overnight-' + G.dayCount);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'Sera looks at the question and then at the space behind you, and explains that what she has found in the marshal office is classified under dome security protocol until she completes her review process. Her jaw is set in a way that says she has already had this conversation with herself and made the same decision. She closes the folder on her desk before you can read the header. "I will share what I can share when I can share it." The bedroll is under the desk. She does not address the bedroll.';
        addJournal('Sera\'s findings classified during active review — will not share until process complete', 'complication', 'aur-sera-overnight-fail-' + G.dayCount);
      } else {
        G.flags.met_warden_sera_whiteglass = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Sera doesn\'t address the bedroll under her desk. She opens a folder and sets it between you — a classified administration document, pulled from the archive last night. An internal review of the filtration anomalies. She has read it twice. "The review concluded it was intentional," she says. She taps the signature on the classification order. "This is the executive who buried it." She does not say what she is going to do with that name yet. Her pen is uncapped on the desk. She has been writing something. She turns it face-down.';
        addJournal('Classified compliance review shows intentional dosing finding — commune executive signature on suppression order', 'evidence', 'aur-sera-overnight-part-' + G.dayCount);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Mariel Sealwater keeps a second ledger. She calls it her memory book.",
    tags: ['NPC', 'Stage2', 'Stealth'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'asking Mariel Sealwater about the second ledger she keeps behind the inn counter');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('finesse', (G.skills.finesse||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_mariel_sealwater = true;
        G.flags.aurora_mariel_memory_book = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Mariel sets the memory book on the counter without hesitation — a cloth-covered ledger, smaller than the room register, kept behind the hooks where the room keys hang. She opens it to the Collegium liaison section. Six visits. Each entry records: arrival time, departure time, what the liaison carried in, what they carried out, who they spoke to in the inn common room, and how long they spoke. The last entry has a note in the margin: "second case, equipment return code, did not match any posted maintenance return schedule." She taps the margin note. "I notice things," she says again, the same cadence as before. "And I write them down."';
        addJournal('Mariel\'s memory book records all liaison visits — second case, non-matching return code, social contacts noted', 'evidence', 'aur-mariel-book-' + G.dayCount);
      } else if (result.isFumble) {
        G.lastResult = 'Mariel looks at the space behind the key hooks before she answers. "The inn\'s secondary records are the inn\'s." She wipes down the counter. "Some guests stay here on the understanding that their visits are private. I don\'t share records about private guests with anyone who walks in and asks." The counter is clean. She goes back to the room register. She is not hostile. She is also not going to move.';
        addJournal('Mariel declined to share secondary records — guest privacy policy, standing instruction referenced', 'complication', 'aur-mariel-book-fail-' + G.dayCount);
      } else {
        G.flags.met_mariel_sealwater = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Mariel looks at you for a moment, then at the space behind the key hooks. She brings out a smaller ledger without comment and sets it on the counter, open to the middle section. "I write down things that don\'t fit the pattern of a normal stay." She doesn\'t open it fully — but you can see it is organized by guest, and there are six entries in the Collegium liaison section, each with a margin notation. She is showing you that it exists and that it is detailed. Whether she shows you the details is a different question.';
        addJournal('Mariel\'s secondary ledger confirmed — six liaison entries with margin notes, full access not yet granted', 'intelligence', 'aur-mariel-book-part-' + G.dayCount);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Cadrin ran the numbers himself. He's been sitting on the result for two weeks.",
    tags: ['NPC', 'Stage2', 'Lore'],
    xpReward: 73,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(73, 'asking Cadrin Sealwater what he found when he ran the filtration budget numbers independently');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_cadrin_sealwater = true;
        G.flags.aurora_cadrin_independent_audit = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Cadrin reaches under the counter and puts a folded paper on the surface — a handwritten budget reconciliation, pencil columns, dated two weeks ago. "I ran the filtration maintenance numbers against actual maintenance output." He unfolds it. The Northern Provision Compact line item accounts for forty percent of the dome\'s total maintenance budget. The actual maintenance work attributed to that supplier: zero. No labor logs. No material receipts for installed components. The money is flowing to Northern Provision Compact and nothing from Northern Provision Compact is being installed in the dome. He has checked three times. His handwriting gets smaller in the later columns, which means he was concentrating.';
        addJournal('Cadrin\'s independent audit: 40% of maintenance budget to NPC with zero attributed installed output', 'evidence', 'aur-cadrin-audit-' + G.dayCount);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'Cadrin straightens the ledger on the counter and explains, with the careful clarity of someone who has thought about exactly how to phrase this, that he has not run independent numbers on the filtration budget. He says it once. He does not say it again. He opens the room ledger and begins checking the previous day\'s entries. The finance committee notification from your earlier access sits in the tray behind him. He has seen it. The paper is face-down.';
        addJournal('Cadrin denied running independent numbers — finance committee notification visible behind counter', 'complication', 'aur-cadrin-audit-fail-' + G.dayCount);
      } else {
        G.flags.met_cadrin_sealwater = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Cadrin takes a moment before he answers — a pause that is about deciding, not remembering. "I cross-referenced the Northern Provision Compact payments against the maintenance output records." He does not bring out any paper. "There\'s no installed equipment logged under that supplier. No labor records. The compound deliveries are the only output I can find." He underlines nothing. He is looking at the counter. He has been sitting with this for two weeks and he says it the way someone says a thing they\'ve said to themselves too many times already.';
        addJournal('Cadrin confirms NPC payments with zero installed equipment output — compound deliveries only attributed output', 'evidence', 'aur-cadrin-audit-part-' + G.dayCount);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Liora Sealwater started keeping her own tally. She doesn't call it a record.",
    tags: ['NPC', 'Stage2', 'Lore'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'asking Liora Sealwater about the tally she has been keeping outside shrine records');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_liora_sealwater = true;
        G.flags.aurora_liora_personal_tally = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Liora brings out a small folded paper from her robe pocket — not the shrine records, not the petition book, something she made herself. A column of dates and a column of names. Thirty-one names over four months. "People who came to the shrine with respiratory symptoms, then came back with different ones." She reads down the second column without looking up. "Headache. Fatigue. Pressure behind the eyes. Not what they first described." She refolds it carefully along the original creases. "The medical board told me these are separate complaints. They are not separate." She sets the paper on the counter between you. "This is not a shrine record. I did not keep it here."';
        addJournal('Liora\'s personal tally: 31 residents with symptom progression over 4 months — board dismissed as unrelated complaints', 'evidence', 'aur-liora-tally-' + G.dayCount);
      } else if (result.isFumble) {
        G.worldClocks.reverence = (G.worldClocks.reverence||0) - 1;
        G.lastResult = 'Liora straightens the candle at the memorial stone before she answers. "What I observe at the shrine stays at the shrine." She folds her hands on the counter — not the clasped-hands posture of someone comfortable, but something held. "The medical board has the petition records. Anything I have observed that is not in the petition records is in my conscience, not in a document." The low candle at the shrine sends a thin ribbon of smoke toward the dome venting grate above. She watches it rise. She does not add to what she has said.';
        addJournal('Liora refused to share personal observations — directed to medical board, stated observations remain in conscience only', 'complication', 'aur-liora-tally-fail-' + G.dayCount);
      } else {
        G.flags.met_liora_sealwater = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Liora touches her robe pocket once before she answers — a small gesture, quick, then stopped. "I keep notes," she says. "Not shrine records. Personal notes about patterns I have observed over time." She does not bring them out. "Thirty-one people came to the shrine with one kind of symptom and came back with a different kind. The medical board has the petition data. They have not connected it the way I have." She looks at the dome venting grate above the memorial stone. "I have not shared my notes because I was not sure they were enough. I am still not sure."';
        addJournal('Liora has personal notes on 31 symptom-progression cases — not yet shared, questioning whether sufficient', 'intelligence', 'aur-liora-tally-part-' + G.dayCount);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Theron keeps a smell log. He's been writing down the wrong smell since month one.",
    tags: ['NPC', 'Stage2', 'Survival'],
    xpReward: 74,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'asking Theron Sealwater about the smell notations in his porter routing log');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('vigor', (G.skills.vigor||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_theron_sealwater = true;
        G.flags.aurora_theron_smell_log = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Theron\'s routing log has a column nobody asked for — a one-word entry beside every intake delivery, in the margin, in smaller handwriting than the rest. He shows it without commentary: twelve deliveries, twelve margin entries. For the first eight months of his posting, the word is "standard." Starting four months ago, the word changes. "Waxy," the first time. Then "resin." Then "waxy" again, then "burn-adjacent" — a compound word he invented because he couldn\'t find the right one. Then "resin" again. The smell of standard filtration compound and the smell of whatever has been coming through the intake for the last four months are two different smells, and he has been writing that down since the first delivery.';
        addJournal('Theron\'s smell log: "standard" for 8 months, then "waxy/resin/burn-adjacent" — anomaly begins 4 months ago, delivery-correlated', 'evidence', 'aur-theron-smell-' + G.dayCount);
      } else if (result.isFumble) {
        G.lastResult = 'Theron closes the routing log before you can see the margin column. "Porter log access for external parties went under security hold after the compliance notation." He says it without inflection — not apologetic, not hostile, the same voice he uses for delivery times. "I\'m working under the hold until it clears." He opens the log to the current week\'s roster and makes a notation in the main column. Whatever is in the margin column stays there, unread, behind the security hold that your earlier access triggered.';
        addJournal('Porter log under security hold — margin columns inaccessible until hold clears', 'complication', 'aur-theron-smell-fail-' + G.dayCount);
      } else {
        G.flags.met_theron_sealwater = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Theron doesn\'t explain the margin column — he just angles the routing log so you can read it. One word per delivery entry, going back to the start of the current posting cycle. The word changes four months ago. He taps the first changed entry with one finger and leaves it there. "Standard filtration compound smells like mineral dust and old metal." He taps the changed entry again. "This is something else." He does not speculate about what something else means. He closes the log and picks up his pencil.';
        addJournal('Theron smell log shows anomaly starting 4 months ago — delivery-correlated change in compound odor', 'evidence', 'aur-theron-smell-part-' + G.dayCount);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Mariel's two recent guests arrived on the same day and left with the same stamp.",
    tags: ['NPC', 'Stage2', 'Stealth'],
    xpReward: 69,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(69, 'questioning Mariel Sealwater about two guests whose arrival and transit stamps align with a delivery day');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('finesse', (G.skills.finesse||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_mariel_sealwater = true;
        G.flags.aurora_mariel_two_guests = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Mariel checks the room register without being asked and sets it on the counter open to the relevant week. "Two guests, same arrival day. Different rooms, no shared meals, no visible interaction." She pulls the transit stamp records clipped to the back of that week\'s register page. Both guests carry the same compound-transport clearance stamp — a specialized dome-transit endorsement for certified compound handlers. She sets the stamp records side by side. The stamps are from the same issuing clerk, processed within forty minutes of each other, at a transit station one settlement south of Aurora Crown. "They came together," she says. "They were careful not to show it."';
        addJournal('Two guests with compound-handler transit stamps processed same day at same station — arrived separately to avoid appearance of coordination', 'evidence', 'aur-mariel-guests-' + G.dayCount);
      } else if (result.isFumble) {
        G.lastResult = 'Mariel straightens the key hooks and sets down her wipe cloth before she looks at you. "Two guests arriving on the same day is not unusual." She opens the room register to a week at random — three arrivals that day, four the next. "I don\'t cross-reference guest transit records. That\'s not my role." She closes the register. The standing instruction about Collegium liaison visits is still in force. She does not name it, but the shape of her answer has the same boundary.';
        addJournal('Mariel declined to cross-reference guest transit stamps — guest privacy, standing instruction', 'complication', 'aur-mariel-guests-fail-' + G.dayCount);
      } else {
        G.flags.met_mariel_sealwater = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Mariel checks the register and confirms the arrival date without elaboration. Two guests, same day. "Different rooms. They didn\'t eat together." She wipes down the counter in the deliberate way that means she is thinking while she does it. "Their transit stamps were the same kind. Specialized. Not what most guests carry." She doesn\'t say what kind. She goes back to the hooks. But she leaves the register open on the counter rather than putting it away. You can read the stamp notation in the margin if you look at the right column.';
        addJournal('Two guests with matching specialized transit stamps — same arrival day, deliberate separation at inn', 'intelligence', 'aur-mariel-guests-part-' + G.dayCount);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  // ── RESIDUE SUPPRESSION EVIDENCE TRAILS (4) ─────────────────────────────────

  {
    label: "The suppression compound has a signature smell. The dome's drainage has it too.",
    tags: ['Stage2', 'Survival'],
    xpReward: 73,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(73, 'tracing suppression compound residue through dome drainage outflow points');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('vigor', (G.skills.vigor||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.aurora_drainage_residue_confirmed = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The drainage outflow channel runs along the dome\'s lower curve, between the thermal conduit housing and the foundation seal — accessible by crouching under the access panel near the service junction. The amber residue is here too: a pale waxy line along the channel floor, heavier near the filtration intake section, thinning as the channel runs toward the outer venting points. The compound has been cycling through the air system, condensing on the channel walls, and draining out. The quantity of residue in the channel is consistent with months of sustained introduction, not a single event. You smell the channel wall before you pull back. Waxy, faintly resinous. The same smell Theron wrote down.';
        addJournal('Amber residue in dome drainage channel — heaviest near intake, consistent with months of sustained compound introduction', 'evidence', 'aur-drain-residue-' + G.dayCount);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'The access panel near the service junction is locked on a dome safety protocol — drainage access requires a signed inspection clearance from the safety committee. A worker in the foundation corridor sees you trying the panel and marks you in the work log before asking if you need clearance instructions. You do. The instructions are three pages. The safety committee meets on alternating weeks. The next meeting is in five days.';
        addJournal('Drainage access panel locked — safety committee clearance required, 5-day wait for meeting', 'complication', 'aur-drain-residue-fail-' + G.dayCount);
      } else {
        G.flags.aurora_drainage_residue_confirmed = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The drainage channel access panel is not locked, but it requires a crouch and a moment of not being seen, both of which you manage. Inside: pale amber residue along the channel floor, heavier near the intake section. The smell comes up immediately — waxy, faintly resinous. Not drainage smell, not standard mineral-dust filtration smell. The same amber as the intake throat deposit. The compound is cycling through the system and settling here. You pull back and reset the panel. It takes a minute to stop smelling it.';
        addJournal('Drainage channel amber residue confirmed — same odor as intake throat deposit, intake-proximate concentration', 'evidence', 'aur-drain-residue-part-' + G.dayCount);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The suppression residue has a second source. The ventilation grates are coated from both sides.",
    tags: ['Stage2', 'Craft'],
    xpReward: 75,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(75, 'examining residential ventilation grates for double-sided residue deposition pattern');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('spirit', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.aurora_double_source_confirmed = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The residential ventilation grates in the eastern quarter are accessible by removing four screws — the dismissed technician\'s log lists the access procedure. You examine three grates on the same distribution loop. All three have amber residue on the interior face, as expected from air cycling through the filtration system. Two of the three also have residue on the exterior face, on the room side of the grate. Compound deposited on the exterior face came from inside the room, not from the air supply — a second introduction point, not filtered air. Someone has been dosing the residential spaces directly, separately from the intake system, on the same loop where exposure is already highest.';
        addJournal('Eastern quarter grates: residue on both faces — exterior deposition confirms second introduction point in residential spaces', 'evidence', 'aur-double-source-' + G.dayCount);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = 'A dome steward in the eastern quarter residential corridor is running a routine safety check on the ventilation grates when you arrive — an uncommon timing that suggests either coincidence or forewarning. She notes your arrival in the corridor log before asking your purpose. You have no documentation supporting residential infrastructure access. She walks you to the corridor exit without making it a confrontation. The safety check log shows a flag next to the date of your visit. She will finish the grate inspection after you leave.';
        addJournal('Residential corridor steward running grate safety check on arrival — no access documentation, corridor exit flagged in log', 'complication', 'aur-double-source-fail-' + G.dayCount);
      } else {
        G.flags.aurora_double_source_confirmed = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Two of the three grates you examine have residue on both faces — interior and exterior. Interior is expected, from air supply cycling. Exterior is not. The compound would need to have been applied from the room side of the grate to deposit on the exterior face. You check the distribution loop the three grates share. They are all on the eastern quarter residential loop — the catchment zone nearest the intake manifold. The residents here are already getting the heaviest exposure from the air supply. Something additional is reaching them through a different path.';
        addJournal('Grates on eastern quarter loop have double-sided residue — room-side deposition suggests second introduction point', 'evidence', 'aur-double-source-part-' + G.dayCount);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The amber residue reacts to glyph-sensitive paper. Standard filtration compound does not.",
    tags: ['Stage2', 'Lore'],
    xpReward: 77,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(77, 'testing amber intake residue against glyph-sensitive assay paper from the shrine supply');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.aurora_glyph_reactive_confirmed = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The shrine keeps glyph-sensitive assay paper for resensitization assessments — Liora supplies a strip without asking what it is for. You press the strip against the amber residue on the intake throat wall. The strip changes: a slow bloom of dark blue from the contact point, spreading outward in the uneven pattern characteristic of glyph-resonance compounds, not chemical solvents. Standard filtration compound produces no reaction on glyph-sensitive paper. The amber residue is glyph-active. Whatever is being introduced through the intake system is designed to interact with the residents\' glyph-sensitivity, not merely their respiratory system. The dosing is targeted at the specific physiological pathway the dome was built to protect.';
        addJournal('Amber residue tests glyph-reactive — blue bloom on assay paper, glyph-sensitivity pathway targeted, not respiratory only', 'evidence', 'aur-glyph-react-' + G.dayCount);
      } else if (result.isFumble) {
        G.worldClocks.reverence = (G.worldClocks.reverence||0) - 1;
        G.lastResult = 'The assay paper from the shrine reacts to the handling — your hands carry enough ambient compound exposure from the intake corridor that the strip blooms before you reach the residue sample. The test is contaminated. Liora looks at the ruined strip and then at you with an expression that is not judgment but something adjacent to it. The paper costs nothing to replace but the contaminated result means you have touched enough of the system that you are now part of the sample. The correct procedure requires clean handling gloves from the shrine supply, which you ask for the second time with more care.';
        addJournal('Assay test contaminated by handler exposure — correct procedure requires clean gloves, result unusable', 'complication', 'aur-glyph-react-fail-' + G.dayCount);
      } else {
        G.flags.aurora_glyph_reactive_confirmed = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The assay strip changes when you press it against the amber residue — dark blue, spreading from the contact point. The reaction is slow, which means the compound concentration is low, but the color is definitive: glyph-reactive. Standard filtration compound produces no color on the strip. Whatever is in the intake system carries a glyph-interaction profile. You fold the strip and put it away. The dome\'s air filtration system was designed to protect the residents\' glyph-sensitivity from environmental surge. Something glyph-active is being introduced through the same infrastructure.';
        addJournal('Amber residue glyph-reactive confirmed by assay paper — intentional glyph-sensitivity pathway targeting via filtration system', 'evidence', 'aur-glyph-react-part-' + G.dayCount);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The residue suppression compound was sourced before the dome was built.",
    tags: ['Stage2', 'Lore'],
    xpReward: 78,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(78, 'tracing compound pre-formulation history against dome construction records');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.aurora_compound_predates_dome = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The dome construction archive has a technical specification section — sealed, but accessible under the commune founding charter\'s public infrastructure clause. The filtration system\'s design specifications include a compound compatibility list: approved classes for introduction into the intake system. The Northern Provision Compact compound class is on that list, added during the original design phase, before the dome was built. Not added later as an approved vendor. Specified from the beginning. Someone anticipated this compound\'s use in the Aurora Crown filtration system before the dome existed. The compatibility specification was written by the same Collegium technical authority that later changed the sensor calibration baseline.';
        addJournal('Suppression compound class specified in original dome design — Collegium technical authority wrote it in before construction, anticipated use pre-planned', 'evidence', 'aur-compound-predates-' + G.dayCount);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'The dome construction archive is classified under the commune founding charter\'s infrastructure security provision — a different clause than the public infrastructure access clause, and the distinction matters. The archivist explains this with precision: public infrastructure records cover current operational status, not historical design specifications. Design specifications require a separate access petition to the founding charter committee. The committee meets quarterly. The last meeting was six weeks ago.';
        addJournal('Dome construction archive under infrastructure security provision — design specs not covered by public access clause', 'complication', 'aur-compound-predates-fail-' + G.dayCount);
      } else {
        G.flags.aurora_compound_predates_dome = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The dome design specifications list the compound class used by Northern Provision Compact as compatible with the intake system — not added after commissioning, written into the original specification. The dome was designed to accept this class of compound from the beginning. The filtration intake was built to accommodate it. You set the design document against the delivery manifests. The intake system and the compound were specified in the same period, by the same technical authority. This was not opportunistic. Someone planned it.';
        addJournal('Compound class in original dome design spec — intake built to accept it from construction, same Collegium authority throughout', 'evidence', 'aur-compound-predates-part-' + G.dayCount);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  // ── CROSS-LOCALITY CONNECTIONS (2) ──────────────────────────────────────────

  {
    label: "The same ghost supplier appears in Harvest Circle's maintenance records.",
    tags: ['Stage2', 'CrossLocality', 'Lore'],
    xpReward: 82,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(82, 'cross-referencing Northern Provision Compact supplier name against Harvest Circle maintenance records');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.aurora_harvest_circle_connection = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The Harvest Circle maintenance records are part of the inter-settlement trade registry — publicly filed, publicly accessible, requiring only a search request at any commune archive counter. Northern Provision Compact appears in three Harvest Circle maintenance line items over the same four-month period. Different infrastructure category — field drainage systems, not air filtration — same Collegium liaison authorization code, same unregistered vendor status, same payment structure. Aurora Crown and Harvest Circle are both running payments to the same ghost supplier, under the same liaison code, for different infrastructure systems, simultaneously. Whatever the operation is, it is not a single locality experiment.';
        addJournal('Northern Provision Compact in Harvest Circle records — same liaison code, same unregistered status, field drainage, concurrent 4-month period', 'evidence', 'aur-harvest-link-' + G.dayCount);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'The inter-settlement trade registry search returns no results for Northern Provision Compact under Harvest Circle — the locality code is entered correctly, but the vendor name produces a null result. Not absent: null, which is a different status in the registry system. A null result on a vendor search generates an automatic notification to the registry oversight office. You have just flagged the supplier name to a system that monitors for anomalous vendor searches. The notification is automatic and there is no way to retract it.';
        addJournal('Registry search for NPC under Harvest Circle returned null — flagged to registry oversight office automatically', 'complication', 'aur-harvest-link-fail-' + G.dayCount);
      } else {
        G.flags.aurora_harvest_circle_connection = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Northern Provision Compact appears in Harvest Circle\'s maintenance records — three entries, field drainage systems, same four-month window as Aurora Crown. The authorization code on the Harvest Circle entries matches the Collegium liaison authorization code from the Aurora Crown filtration budget. Different locality. Different infrastructure. Same supplier code. Same authorizing identity. The operation runs across at least two localities simultaneously. You copy both sets of entries and put them side by side. The shape of the thing is larger than one dome.';
        addJournal('NPC in Harvest Circle drainage records — same liaison code, same period, same ghost vendor, two-locality pattern confirmed', 'evidence', 'aur-harvest-link-part-' + G.dayCount);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "A northern circuit transit rider knows the Collegium liaison by a different name.",
    tags: ['Stage2', 'CrossLocality', 'Charm'],
    xpReward: 80,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(80, 'pressing a northern circuit transit rider about the Collegium liaison identity discrepancy');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('charm', (G.skills.charm||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.aurora_liaison_alias_confirmed = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The transit rider is a northern circuit regular — Soreheim to the upper localities, quarterly run. She knows the Collegium liaison who visits Aurora Crown because she has carried sealed correspondence for them three times. The name on the correspondence she carried does not match the name in the Aurora Crown dome administration register. She says the name she knows without being asked twice. You write it down. It is a Soreheim institutional name — not a Collegium one. The liaison is operating under a Collegium credential that belongs to a position that may not exist. The rider looks at what you wrote. "That person moves around a lot," she says. "Quietly."';
        addJournal('Liaison name on northern circuit correspondence differs from dome register — Soreheim institutional name, possible fabricated Collegium credential', 'evidence', 'aur-liaison-alias-' + G.dayCount);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'The transit rider in the inn common room finishes her meal before she answers the question about the Collegium liaison, and the answer is a long look at the space above your left shoulder followed by a simple statement: she does not discuss the business of people she carries correspondence for. It is a professional practice she names without apology. She picks up her tankard and turns her shoulder. The inn common room is warm and the sound of the dome\'s ventilation system is a low continuous note in the background. The rider does not look at you again.';
        addJournal('Transit rider declined to discuss liaison — professional correspondence confidentiality', 'complication', 'aur-liaison-alias-fail-' + G.dayCount);
      } else {
        G.flags.aurora_liaison_alias_confirmed = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The northern circuit rider knows the liaison from transit work. She does not give the full name unprompted, but when you describe the person — the Collegium coat, the sealed documentation, the regular Aurora Crown visits — she nods and says a name. It is not the name in the dome administration register. She does not explain the difference. "I carry what I\'m given. I note who gave it." She finishes her drink. "That name has come up in more than one direction on the circuit." She does not say more. She does not need to.';
        addJournal('Transit rider gives different name for liaison — northern circuit name diverges from dome register, described as multi-directional presence on circuit', 'intelligence', 'aur-liaison-alias-part-' + G.dayCount);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },


  // ── NEW BATCH: DOME FILTRATION RECORDS & GLYPH SURGE DATA (5) ───────────────

  {
    label: "The intake manifold pressure log shows a spike that wasn't in the filed summary.",
    tags: ['Dome', 'Stage2', 'Lore'],
    xpReward: 74,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'comparing raw intake manifold pressure data against filed summary report');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.aurora_pressure_log_discrepancy = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The raw pressure data terminal in the stabilizer corridor prints a continuous paper tape — not a screen, tape, which means it cannot be edited after the fact. You unroll the tape to the date of the first Northern Provision Compact delivery. A pressure spike runs for eleven minutes at 1.4 times the standard draw rate. The filed monthly summary for the same period lists intake pressure as within normal parameters for the entire month. The summary was generated from the same system. The tape and the summary describe different events. Someone reported the tape as normal and the tape was still running.';
        addJournal('Raw intake pressure tape shows spike not in filed summary — tape irremovable, summary falsified for delivery period', 'evidence', 'aur-pressure-spike-' + G.dayCount);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'The pressure tape terminal is mounted behind the stabilizer duty desk — accessible only while the duty officer steps away, which she does not. She clocks your interest before you reach the terminal housing and sets her clipboard down on the desk with the deliberate calm of someone who has been briefed on external access. The terminal is in the duty zone. The duty zone requires a signed access pass. She has the forms. The forms require the marshal\'s countersignature. Sera\'s office is across the corridor. You can ask her yourself.';
        addJournal('Pressure tape terminal in duty zone — access pass required, marshal countersignature needed', 'complication', 'aur-pressure-spike-fail-' + G.dayCount);
      } else {
        G.flags.aurora_pressure_log_discrepancy = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The pressure tape shows an elevated draw period on the delivery date — eleven minutes, 1.4 times normal. You check the filed summary for the same month. Normal parameters across the whole month. The summary and the tape are from the same system but they do not agree about those eleven minutes. The tape is paper. It keeps printing regardless of what is filed. You note the date and the duration. The smell of the stabilizer corridor — filtered air, faint trace of glyph-burn, something waxy at the lower ventilation seam — sits in your throat on the walk back.';
        addJournal('Intake pressure spike on delivery date absent from monthly summary — raw tape and filed report diverge', 'evidence', 'aur-pressure-spike-part-' + G.dayCount);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The glyph-surge threshold alarm was disabled. The disable log entry is missing a name.",
    tags: ['Dome', 'Stage2', 'Craft'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'tracing the glyph-surge threshold alarm disable event in the stabilizer panel log');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('spirit', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.aurora_alarm_disable_traced = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The stabilizer panel log runs in two columns: event and authorizing party. Every disable event in the log has a name in the second column except one — the disable event three weeks before the first Northern Provision Compact delivery. That entry reads "technical services" without a personal identifier. Dome protocol requires an individual name for any threshold modification. "Technical services" is not a person. The alarm that should have triggered when glyph-surge concentrations exceeded the dome\'s residential safety threshold was silenced before the compound deliveries began, under an authorization that names no one. The silence was deliberate and the deliberateness was hidden.';
        addJournal('Surge alarm disable log missing authorizing name — blanket "technical services" entry, pre-dates first delivery, protocol violation', 'evidence', 'aur-alarm-disable-' + G.dayCount);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'The stabilizer panel log access requires a dome maintenance certification code — a physical key tag, not a password. The duty officer at the stabilizer station checks your hands for the tag before she says anything else. External parties can submit a log access request to the stabilizer administration office. The office processes requests in five working days. She says this without particular inflection. The panel log is two meters from where you are standing.';
        addJournal('Stabilizer panel log requires physical key tag — access request process, five working days', 'complication', 'aur-alarm-disable-fail-' + G.dayCount);
      } else {
        G.flags.aurora_alarm_disable_traced = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'One entry in the stabilizer panel log has no name in the authorizing party column. Every other entry does — date, event, name, certification number. This one has "technical services" and nothing else. The event is a threshold alarm disable, dated three weeks before the first delivery. Protocol requires a name. The entry doesn\'t have one. Whatever standard prevented the dome\'s alarm from sounding when the compound concentrations rose, it was turned off by someone who did not want to be identified in the log.';
        addJournal('Surge alarm disabled by unnamed "technical services" entry — protocol violation, predates deliveries', 'evidence', 'aur-alarm-disable-part-' + G.dayCount);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The filtration intake flow rate was throttled down for eight hours during each delivery.",
    tags: ['Dome', 'Stage2', 'Survival'],
    xpReward: 71,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(71, 'examining filtration flow rate records against delivery timestamps in the eastern corridor log');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('vigor', (G.skills.vigor||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.aurora_flow_throttle_confirmed = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The eastern corridor log keeps flow rate data in hourly blocks on paper cards slotted into a wall-mounted holder — low-tech, designed as a backup for the digital system. You pull the cards for every delivery date. Each one shows the same pattern: flow rate drops to thirty percent of standard for an eight-hour window beginning two hours after the delivery vehicle logs in at the intake bay. A reduced flow rate in the intake means compounds introduced during that window dwell longer before the air exchanges out. The amber residue and the extended dwell time work together. A compound introduced at thirty percent flow dwell concentrates in the air supply. It does not dilute. It accumulates.';
        addJournal('Flow rate throttled to 30% during 8hr window on every delivery date — compound dwell concentration multiplied, paper card log confirms', 'evidence', 'aur-flow-throttle-' + G.dayCount);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'The paper card holder is in the eastern corridor behind a maintenance gate — accessible to credentialed dome staff only during active rotation. A crew running thermal conduit work has the gate open, but the foreman plants himself between you and the card holder before you reach it. "Maintenance documentation is for maintenance personnel." He is not unkind. He also does not move. The cards sit in their slots two meters away and the flow data on them belongs to a date range that could change everything.';
        addJournal('Flow rate card holder behind maintenance gate — crew foreman blocked access during active rotation', 'complication', 'aur-flow-throttle-fail-' + G.dayCount);
      } else {
        G.flags.aurora_flow_throttle_confirmed = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The flow rate cards for the delivery dates all show the same eight-hour low-rate window. Thirty percent of standard, starting two hours after vehicle arrival. The window ends and flow returns to normal. Every delivery, same window, same reduction. A throttled flow rate means whatever enters the intake during that window stays in the air system longer. The filtered air smell in the corridor is slightly different here than in the residential sections — cleaner, more mineral. In the residential sections it carries something else underneath.';
        addJournal('Flow rate throttled on every delivery date — 8hr window at 30% draw, consistent across all deliveries', 'evidence', 'aur-flow-throttle-part-' + G.dayCount);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The dome's air quality certification has been renewed annually. The certifier is the supplier.",
    tags: ['Dome', 'Stage2', 'Lore'],
    xpReward: 75,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(75, 'tracing the air quality certification authority against Northern Provision Compact registration records');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.aurora_certifier_conflict_found = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The dome air quality certification is posted on the administration board near the main gate — a public record, required for any enclosed settlement under Collegium infrastructure standards. The certifying authority is the Northern Settlements Technical Consortium, a Collegium-aligned body. You pull the Consortium\'s registered membership list from the commune archive. Northern Provision Compact is a member-organization of the Consortium. The entity certifying Aurora Crown\'s air quality as safe and the entity supplying the compound being introduced into the air supply are the same organizational family. The certification was most recently renewed six weeks after the first delivery.';
        addJournal('Air quality certifier is same organizational family as supplier — Consortium member Northern Provision Compact, certification renewed post-delivery', 'evidence', 'aur-certifier-conflict-' + G.dayCount);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'The certification authority research requires cross-referencing the Consortium membership list, which sits in the inter-settlement registry system. The search generates an access log entry for the Consortium\'s administrative notice system — standard procedure for membership list queries. The Consortium receives a notification that its membership records were accessed by an external party at Aurora Crown. This is automatic. You could not have known before running the search. Someone at the Consortium now knows someone in Aurora Crown is checking who they are.';
        addJournal('Consortium membership search triggered access notification — external party flag sent to Consortium administration', 'complication', 'aur-certifier-conflict-fail-' + G.dayCount);
      } else {
        G.flags.aurora_certifier_conflict_found = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The air quality certification posted at the main gate names the Northern Settlements Technical Consortium as certifying authority. The Consortium\'s membership list includes Northern Provision Compact. The certifier and the supplier are members of the same body. The certification was renewed after the deliveries began. The dome\'s posted proof of safe air was produced by an organization whose member is introducing the compound into the dome\'s air system. You write the Consortium\'s name next to the supplier\'s name in your notes. The two names share a line.';
        addJournal('Air quality certifier Consortium includes supplier as member — certification renewed after deliveries began, conflict of interest confirmed', 'evidence', 'aur-certifier-conflict-part-' + G.dayCount);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The dome's original filtration schematics were replaced four months ago. The old ones are missing.",
    tags: ['Dome', 'Stage2', 'Stealth'],
    xpReward: 73,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(73, 'locating the original dome filtration schematics before their replacement by Collegium-filed versions');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('finesse', (G.skills.finesse||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.aurora_original_schematics_found = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The dome archive index lists two sets of filtration schematics: the current version and the prior version, which should have been archived in the technical records section. The technical records section has the current version and a placeholder noting the prior version was "removed for revision." But the dismissed technician kept a personal copy. She pulls it from the sleeve under her worktable — the same sleeve as the anomaly log. The original schematic shows no condensate secondary loop, no eastern residential vent junction, no second manifold housing in the undocumented corridor. Every distribution pathway that now carries compound exposure through the dome was added after the original design. The dome was modified to deliver what is in it now.';
        addJournal('Original schematic shows no secondary loop or undocumented manifold — all compound pathways added post-construction, dome modified for delivery', 'evidence', 'aur-original-schema-' + G.dayCount);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'The technical records section of the dome archive is undergoing a scheduled reorganization — a clerk in there is pulling and re-sorting a filing system that occupies three shelving units. Access to the section during reorganization requires a supervisor signature. The supervisor is the same administrator whose signature appeared on the council minutes suppression order. The clerk looks at you the way someone looks at a problem they have been asked not to create. She is very sorry. She cannot help.';
        addJournal('Technical records section closed for reorganization — supervisor authorization required, same signatory as suppressed council minutes', 'complication', 'aur-original-schema-fail-' + G.dayCount);
      } else {
        G.flags.aurora_original_schematics_found = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The dismissed technician\'s copy of the original schematic differs from the current posted version in ways that take a moment to see clearly: the secondary condensate loop is absent, the eastern residential vent junction does not appear, the undocumented manifold housing in the eastern corridor is not there. The distribution infrastructure that carries compound exposure through the dome was not in the original design. It was added. The schematic in the dome archive was replaced to match the modified infrastructure rather than the original build. You set the two versions side by side on her table. The differences are exact.';
        addJournal('Original schematic missing secondary loop and undocumented manifold — modifications to dome post-construction created compound delivery pathways', 'evidence', 'aur-original-schema-part-' + G.dayCount);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  // ── NEW BATCH: NPC ENCOUNTERS — SERA, MARIEL, CADRIN, LIORA, THERON (6) ────────

  {
    label: "Sera Whiteglass has written up a formal complaint. She hasn't filed it yet.",
    tags: ['NPC', 'Stage2', 'Craft'],
    xpReward: 76,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(76, 'pressing Warden Sera Whiteglass on the unsubmitted formal complaint on her desk');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('spirit', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_warden_sera_whiteglass = true;
        G.flags.aurora_sera_complaint_revealed = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Sera doesn\'t hide the document — it\'s on top of the pile, face-up. A formal dome security complaint, three pages, addressed to the Collegium Regional Oversight Board. She has signed it. She has not dated it. She looks at it while you look at it. "Filing it names the commune executive who buried the compliance review," she says. "The executive has authority to place my office under administrative review if she chooses to respond that way." She aligns the pages with one hand. "I have been trying to determine whether the evidence is strong enough that the review would not matter." She sets the pen on the top page. "Tell me what you have found."';
        addJournal('Sera\'s complaint drafted and signed — not dated, held pending sufficient evidence to withstand commune executive retaliation', 'evidence', 'aur-sera-complaint-' + G.dayCount);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'Sera turns the document face-down before you are fully through the door. Not urgently — the deliberate movement of someone who has already decided. "Procedural actions under active dome security review are not for external discussion." She sets her pen beside the upturned page. Her jaw is set in the same way it was the first time you met her — a decision already completed, waiting for the right moment to act on it. She asks what brought you back to her office. The document stays face-down for the entire conversation.';
        addJournal('Sera turned complaint face-down — active review prevents external discussion, decision already made', 'complication', 'aur-sera-complaint-fail-' + G.dayCount);
      } else {
        G.flags.met_warden_sera_whiteglass = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The document on Sera\'s desk is three pages, signed, addressed to the Collegium Regional Oversight Board. She doesn\'t cover it. "I drafted it four days ago," she says. "I have not sent it because filing it triggers an automatic administrative review of this office, and the person who can authorize that review is the same person who buried the compliance report." She smooths the top page once. "I need the evidence to be complete enough that the review cannot dismiss it." She looks at you. "What have you found since we last spoke?"';
        addJournal('Sera complaint drafted, not filed — waiting on complete evidence to withstand commune executive administrative review', 'intelligence', 'aur-sera-complaint-part-' + G.dayCount);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Mariel Sealwater heard the liaison's name from a second source. It wasn't the same name.",
    tags: ['NPC', 'Stage2', 'Stealth'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'asking Mariel Sealwater about a second name she has heard associated with the Collegium liaison');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('finesse', (G.skills.finesse||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_mariel_sealwater = true;
        G.flags.aurora_mariel_second_name = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Mariel wipes down the same section of counter twice before she answers — a tell she doesn\'t seem to know she has. "A transit rider stayed here last month. She mentioned the liaison by name while talking to another guest. The name was different from the one in the dome register." She sets down the cloth. "I notice things. I notice names especially." She writes the name she heard on the back of a room-booking slip and sets it on the counter between you. "I have not told anyone else this." The dome\'s ventilation hum is low and continuous in the background. She picks up the cloth again and goes back to the counter.';
        addJournal('Mariel heard liaison called by different name from transit rider — wrote it down, disclosed only to player', 'evidence', 'aur-mariel-name-' + G.dayCount);
      } else if (result.isFumble) {
        G.lastResult = 'Mariel sets the room ledger down and looks at the hooks behind the counter before she answers. There is a standing instruction from dome administration about discussing Collegium liaison visits with external parties. She names it again, the same phrasing as before. "I follow it." She picks up the room ledger. The inn continues around you — the low dome-filtered air moving through the common room vents, a draft from the kitchen passage, the particular dampened quality of sound inside a sealed structure. She does not look up from the ledger.';
        addJournal('Mariel declined to share — standing instruction on Collegium liaison discussions', 'complication', 'aur-mariel-name-fail-' + G.dayCount);
      } else {
        G.flags.met_mariel_sealwater = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Mariel polishes the counter for a moment before she speaks. "A transit rider mentioned the liaison in conversation last month. Used a different name than the one in the dome register." She does not offer the name unprompted. "I noticed. I write things down." She opens the ledger to the relevant week, not the memory book — the official room register. The transit rider\'s booking is on the page. She taps the entry without naming the rider or the name. "The information is there if you know how to read it."';
        addJournal('Mariel confirms second name heard for liaison via transit rider — points to room register without naming it directly', 'intelligence', 'aur-mariel-name-part-' + G.dayCount);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Cadrin Sealwater found the supplier's registration date. It's three weeks before the delivery contract.",
    tags: ['NPC', 'Stage2', 'Lore'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'asking Cadrin Sealwater about the Northern Provision Compact registration date he found');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_cadrin_sealwater = true;
        G.flags.aurora_cadrin_registration_date = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Cadrin has the registration search result folded in the ledger margin — kept in plain sight. Northern Provision Compact is registered in the northern settlements commercial registry. Registration date: twenty-three days before the Aurora Crown delivery contract was signed. The same registration also appears in the Harvest Circle field drainage system records, starting eleven days after the registration date. The entity was created, given a contract in two localities, and began operations in under a month. "A company that has existed for twenty-three days does not have a filtration compound supply infrastructure," Cadrin says. "Someone gave it one." He slides the search result across the counter.';
        addJournal('Northern Provision Compact registered 23 days before delivery contract — two-locality operation within first month, infrastructure pre-existing registration', 'evidence', 'aur-cadrin-regdate-' + G.dayCount);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'Cadrin straightens the ledger on the counter and looks at the finance committee notification still in the tray behind him. "The committee chair has asked me to document all external party access to supply records going forward." He says it with the care of someone choosing each word. "I\'m going to need to log this conversation." He pulls a form from under the counter. He\'s not refusing. He is noting that whatever he says next will be in writing, with your name on it, in the committee\'s records. He has the form ready before you\'ve decided whether to continue.';
        addJournal('Cadrin logging all external record access per committee chair instruction — conversation will be documented', 'complication', 'aur-cadrin-regdate-fail-' + G.dayCount);
      } else {
        G.flags.met_cadrin_sealwater = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Cadrin opens the ledger to the registration search note he left folded in the margin. "Northern Provision Compact registered twenty-three days before the delivery contract was signed here." He reads the date aloud, then puts his finger on the contract date in the ledger. "Twenty-three days to set up a supply infrastructure capable of delivering specialized filtration compounds monthly." He underlines the gap. He doesn\'t speculate. He underlines the gap the way a person underlines something that does the arguing on its own.';
        addJournal('NPC registered 23 days before delivery contract — registration-to-supply timeline impossible for legitimate startup', 'evidence', 'aur-cadrin-regdate-part-' + G.dayCount);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Liora Sealwater recognizes the compound profile. She treated something like it before.",
    tags: ['NPC', 'Stage2', 'Lore'],
    xpReward: 74,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'asking Liora Sealwater whether she has seen the amber residue compound profile in a prior context');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_liora_sealwater = true;
        G.flags.aurora_liora_prior_exposure = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Liora is quiet for a long moment when you describe the compound profile. Then she goes to the shrine\'s treatment cabinet and brings out a reference card — not a current resource, an old one, edges softened with handling. "Seven years ago I worked a seasonal posting at a research commune in the southern circuit. A compound with this profile was used in a controlled study of glyph-sensitivity mapping in a closed air environment." She sets the reference card on the counter. "It was supposed to be harmless at low concentrations. The study was stopped." She turns the card over. On the back is a date — the date the study ended. "I kept this because of that date."';
        addJournal('Liora identifies compound from prior research-commune study — glyph-sensitivity mapping in closed air environment, study stopped, date noted', 'evidence', 'aur-liora-prior-' + G.dayCount);
      } else if (result.isFumble) {
        G.worldClocks.reverence = (G.worldClocks.reverence||0) - 1;
        G.lastResult = 'Liora straightens the candle at the memorial stone and folds her hands in her lap before she responds. The shrine\'s low continuous ventilation hum moves through the space between you. "I am not a compound specialist. I am a shrine attendant." She says it without apology, precisely. "What you are describing is outside what I can assess." She looks at the candle. She is telling the truth and also, in some way she has decided not to name, she is not saying everything she knows. The distinction is visible in the way she holds her hands. She does not add to what she has said.';
        addJournal('Liora declined compound profile discussion — stated outside her role, manner suggested more known', 'complication', 'aur-liora-prior-fail-' + G.dayCount);
      } else {
        G.flags.met_liora_sealwater = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Liora listens to the compound profile description and is still for a moment longer than usual — the kind of stillness that is not hesitation but recognition. "I have seen something like this profile before. Not here." She goes to the treatment cabinet and checks something inside it without bringing it out. "A research context, years ago, southern circuit." She closes the cabinet. "The compound class was associated with glyph-sensitivity monitoring in controlled environments." She turns back. "Not treatment. Monitoring." The memorial candle sends a thin ribbon of smoke toward the dome venting grate. She watches it. "The study ended."';
        addJournal('Liora recognizes compound from southern circuit research — glyph-sensitivity monitoring application, study discontinued', 'intelligence', 'aur-liora-prior-part-' + G.dayCount);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Theron moved something from the east bay on a day his log shows him off-rotation.",
    tags: ['NPC', 'Stage2', 'Survival'],
    xpReward: 71,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(71, 'confronting Theron Sealwater with the east bay movement on his off-rotation day');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('vigor', (G.skills.vigor||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_theron_sealwater = true;
        G.flags.aurora_theron_off_rotation_move = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Theron\'s hand goes to the door frame seal the moment you name the date. He keeps it there. "I was asked to come in." He looks at the door frame. "Not by the rotation office. By the liaison office." He accounts for a moment, thumb pressing into the seal. "I moved two crates from the east bay to a secondary holding space in the lower conduit section. I was told it was a maintenance coordination issue." He looks at his hand. "There is no maintenance record I can find for that movement. I am telling you this because I have been trying to find that record for three weeks."';
        addJournal('Theron moved crates off-rotation on liaison request — no maintenance record for the movement, trying to locate it for 3 weeks', 'evidence', 'aur-theron-offrot-' + G.dayCount);
      } else if (result.isFumble) {
        G.lastResult = 'Theron puts the routing board down on the desk before he turns to face you, and the movement is deliberate enough that it is its own answer. "The compliance notation is still attached to my transit log from the earlier access query." He says it without inflection. "Any external party discussing my rotation records with me while that notation is active goes into the secondary log." He picks up the routing board. "I can\'t help you right now." He is not angry. He is working within the constraints of a system that has been used to contain him and he knows it.';
        addJournal('Theron compliance notation prevents discussion — secondary log triggered for external rotation record queries', 'complication', 'aur-theron-offrot-fail-' + G.dayCount);
      } else {
        G.flags.met_theron_sealwater = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Theron stands with one hand on the door frame and confirms the date you name without asking how you know it. "I came in off-rotation. Liaison office request, not the rotation office." His fingers press against the seal edge. "I moved two crates. I wrote it in my personal log, not the rotation log, because the movement order didn\'t come through proper channels." He does not say where the crates went. He taps the door frame once with two fingers. "I\'ve been looking for the official movement record since then. There isn\'t one."';
        addJournal('Theron confirms off-rotation crate move on liaison request — entered in personal log only, no official movement record', 'evidence', 'aur-theron-offrot-part-' + G.dayCount);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Sera tested the office air. The result is why she moved her desk.",
    tags: ['NPC', 'Stage2', 'Craft'],
    xpReward: 78,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(78, 'noticing Sera Whiteglass moved her desk away from the air vent and asking about the personal test result');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('spirit', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_warden_sera_whiteglass = true;
        G.flags.aurora_sera_office_test = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Sera\'s desk is against the south wall, away from the ventilation grate in the north corner — moved recently, the original position visible in faint scuff marks on the floor. She doesn\'t comment until you ask directly. Then she opens the bottom drawer and sets a sealed sample container on the desk between you. A dome air sample, date-labeled, from the grate where her desk stood. "The concentration at that vent is four times the residential average," she says. "The marshal\'s office is on the intake corridor. I have been breathing this longer than the residential sections." She sets the assay result beside the container. The result paper has a bloom of dark blue from edge to edge.';
        addJournal('Sera ran personal air test — intake corridor vent 4x residential average, assay paper full bloom, desk moved as personal protective measure', 'evidence', 'aur-sera-office-' + G.dayCount);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'Sera notices you noticing the desk before you say anything, and her answer arrives before the question does. "Furniture placement in a marshal\'s office is an operational security matter." She says it evenly, without pause. "I don\'t discuss internal office configuration with external parties." She straightens the paper on top of the pile. Her jaw is set. The desk is against the south wall and the ventilation grate is in the north corner and the distance between them is about two meters of meaning she has decided not to share today.';
        addJournal('Sera declined to discuss desk placement — named it operational security, manner closed', 'complication', 'aur-sera-office-fail-' + G.dayCount);
      } else {
        G.flags.met_warden_sera_whiteglass = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Sera looks at the scuff marks on the floor where her desk used to be, then at you. "I moved it three days ago." She reaches into the bottom drawer and brings out a small sealed sample tube — a dome air sample, labeled with the grate position and a date. "I ran an assay." She doesn\'t open the drawer all the way. "The concentration at the north grate is higher than the residential average." She puts the tube back. "The marshal\'s office is directly on the filtration intake corridor. I wanted to know what I was working in." She caps the pen on her desk. "Now I know."';
        addJournal('Sera moved desk after personal air test — intake corridor grate concentration above residential average, test result kept in desk drawer', 'intelligence', 'aur-sera-office-part-' + G.dayCount);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  // ── NEW BATCH: RESIDUE SUPPRESSION EVIDENCE TRAILS (4) ──────────────────────

  {
    label: "The amber residue is soluble in water. The drinking supply runs through the same loop.",
    tags: ['Stage2', 'Survival'],
    xpReward: 74,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'testing amber residue solubility against the condensate potable water loop at the thermal junction');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('vigor', (G.skills.vigor||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.aurora_residue_water_soluble = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The dismissed technician\'s lab shelf has a small solubility testing kit — field-grade, the kind used for intake compound assessments. You dissolve a scraping of amber residue from the intake throat sample in ten milliliters of water. The compound dissolves cleanly within forty seconds: no particulate, no cloudiness, complete dissolution. A compound that is fully water-soluble and is present in the dome\'s condensate channel — which Orvyn confirmed feeds into the potable water distribution system — is entering the drinking supply at every condensation cycle. The dome\'s residents are being exposed through two separate pathways simultaneously: air and water. The amber ring on the intake throat is not the only delivery mechanism.';
        addJournal('Amber residue fully water-soluble — potable water loop carries compound via condensate cycle, dual air-water exposure confirmed', 'evidence', 'aur-water-soluble-' + G.dayCount);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'The solubility test requires a residue sample large enough to dissolve cleanly, which means scraping from the intake throat — and the intake throat requires a dome maintenance clearance to access without supervision. You get close enough to smell the amber line before a labor crew working the conduit bank clocks your position. The foreman waves you back without raising his voice. The clearance form for unsupervised intake access requires three business days and a health certification. He says this helpfully. He does not move until you do.';
        addJournal('Solubility test blocked — intake throat access requires 3-day clearance and health certification', 'complication', 'aur-water-soluble-fail-' + G.dayCount);
      } else {
        G.flags.aurora_residue_water_soluble = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The residue sample dissolves in water. You use the field kit from the technician\'s shelf: ten milliliters, forty seconds, clean dissolution. Completely water-soluble, no particulate. Orvyn said the condensate loop feeds back into the potable water distribution system through the thermal junction. A compound that dissolves completely in water and is present in a condensate cycle that serves the dome\'s drinking supply is entering it every time the condensate cycle runs. The waxy amber trace at the intake throat is the first point. The tap is another.';
        addJournal('Residue water-soluble — condensate-to-potable-water pathway confirmed as second exposure route', 'evidence', 'aur-water-soluble-part-' + G.dayCount);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The residue accumulation pattern shows delivery day and the day after are both elevated.",
    tags: ['Stage2', 'Lore'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'mapping residue accumulation in drainage channel against delivery schedule across six months');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.aurora_residue_accumulation_mapped = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The drainage channel residue is thicker in some sections than others — not uniformly distributed. You measure the deposit depth at six points along the channel with a probe the technician keeps for intake assessments. Plotting the measurements against the delivery calendar produces a pattern: the heaviest deposits sit at the points nearest the intake manifold, and the depth peaks at delivery-day concentrations that are roughly twice the mid-cycle average. But the deposit at the secondary loop junction — the point Orvyn identified — is heaviest the day after delivery, not delivery day itself. The compound takes one cycle to reach peak concentration in the recirculation loop. The exposure is still rising when residents wake up the following morning.';
        addJournal('Residue depth map shows peak at intake on delivery day, peak at secondary loop junction day after — exposure still rising on day two', 'evidence', 'aur-residue-map-' + G.dayCount);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'The drainage channel access from a second entry point — a different panel than the one you used before — is locked on a safety rotation protocol that only cycles open during scheduled maintenance windows. The next window is in eleven days. A dome steward doing perimeter rounds marks you in the corridor log when you try the panel. She writes the location and the time. She does not stop or speak to you. The notation is enough.';
        addJournal('Second drainage access panel locked on rotation protocol — marked in perimeter log, next window 11 days', 'complication', 'aur-residue-map-fail-' + G.dayCount);
      } else {
        G.flags.aurora_residue_accumulation_mapped = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The deposit measurements from six points in the drainage channel plot a clear gradient when you set them against the delivery dates. Heaviest at the intake manifold end. Progressively lighter as the channel runs outward. The secondary loop junction — where Orvyn said the condensate cycle feeds back into the distribution system — shows a delayed peak: lighter on delivery day, heavier the day after. The compound cycles through and concentrates downstream. Whatever the residents breathe and drink on delivery day is less than what they breathe and drink twenty-four hours later.';
        addJournal('Residue gradient peaks downstream on day-after delivery — compound concentration highest 24hrs post-introduction', 'evidence', 'aur-residue-map-part-' + G.dayCount);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The compound's glyph-interaction leaves a trace on skin. The intake workers show it.",
    tags: ['Stage2', 'Survival'],
    xpReward: 76,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(76, 'observing glyph-trace markers on intake corridor workers and cross-referencing with dismissed technician log');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('vigor', (G.skills.vigor||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.aurora_skin_trace_observed = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The dismissed technician\'s log describes a secondary marker she noticed in herself six weeks into the compound period: a faint pale discoloration on the inner wrists and the backs of the hands, variable with exposure level, consistent with glyph-reactive compound interaction at skin-contact concentration. She shows you her wrists. The marks are still there, lighter but present. You go back to the intake corridor and observe the labor crew on rotation. Two of the four workers — the two who work the manifold end of the corridor — have the same faint pale marks on their wrists. They have not been told what the marks mean. The foreman\'s wrists are clean. He rotates between sections. They do not.';
        addJournal('Glyph-trace skin marks observed on two intake corridor workers — matches technician\'s own markers, foreman clean due to rotation, workers not informed', 'evidence', 'aur-skin-trace-' + G.dayCount);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'You get close enough to the intake corridor workers to see their hands, but not their wrists — the crew is working in close quarters at the manifold end and the foreman is standing between the work and the corridor. He does not speak to you. He watches you from that position until you move. The window has closed. A labor scribe at the far end of the corridor writes something in the work log. You do not know what.';
        addJournal('Worker observation blocked — foreman positioned between you and manifold crew, labor scribe noted presence', 'complication', 'aur-skin-trace-fail-' + G.dayCount);
      } else {
        G.flags.aurora_skin_trace_observed = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Two of the intake corridor workers have faint pale marks on the backs of their hands and inner wrists — visible when the manifold access panel light catches at the right angle. The dismissed technician described the same marks in her own log, dated four weeks into the compound period. You check her wrists when you return to her residence. The marks are still present, three months later. The workers at the manifold end are showing the same compound interaction she documented in herself. They are still working that section.';
        addJournal('Two intake workers show glyph-trace wrist marks matching technician\'s own documented markers — workers still on the section', 'evidence', 'aur-skin-trace-part-' + G.dayCount);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The suppression schedule is not monthly. It follows the commune's civic assembly calendar.",
    tags: ['Stage2', 'Craft'],
    xpReward: 77,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(77, 'overlaying delivery dates against the Aurora Crown civic assembly calendar to find the dosing pattern');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('spirit', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.aurora_assembly_dosing_pattern = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The civic assembly calendar is posted near the dome\'s community board — Aurora Crown holds quarterly assemblies and six-week council review sessions, all dates fixed at the start of each cycle. You overlay the delivery dates against the calendar. Every delivery falls between four and six days before either a full civic assembly or a council review session. The compound\'s peak concentration, given the dwell extension and the day-after accumulation pattern, would reach its highest level in residents during the assembly or review itself. The dosing schedule was not chosen for operational convenience. It was calibrated to produce maximum glyph-sensitivity suppression during the commune\'s deliberative governance events.';
        addJournal('Deliveries 4-6 days pre-assembly/review — peak compound concentration timed to civic governance events, suppression of deliberative capacity confirmed', 'evidence', 'aur-assembly-pattern-' + G.dayCount);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'The community board near the assembly hall has had the civic calendar removed for the current quarter — replaced with a notice about a dome infrastructure maintenance posting period that requires the space. A steward at the hall entrance notes your interest in the board and writes it down. The assembly schedule is in the dome archive. The archive access log will show another entry under your name. The tray of notifications in Cadrin\'s counter behind him has grown by one since this morning.';
        addJournal('Civic calendar removed from community board — archive access required, another access log entry generated', 'complication', 'aur-assembly-pattern-fail-' + G.dayCount);
      } else {
        G.flags.aurora_assembly_dosing_pattern = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Six deliveries. Six civic assembly or council review events. You put the delivery dates next to the assembly calendar dates. Every delivery precedes a governance event by four to six days. Given the dwell extension and the residue accumulation pattern, peak concentration in the dome\'s air supply falls on the day of the assembly or the day before. The schedule is not convenient for a supplier\'s logistics. It is tuned to the commune\'s deliberative calendar. Whatever the compound does to glyph-sensitivity, it is being applied specifically when residents gather to make communal decisions.';
        addJournal('Delivery schedule maps to pre-assembly timing — peak compound concentration falls on civic governance days', 'evidence', 'aur-assembly-pattern-part-' + G.dayCount);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  // ── NEW BATCH: CROSS-LOCALITY CONNECTIONS (2) ───────────────────────────────

  {
    label: "The compound was found at an eastern circuit settlement. That settlement no longer exists.",
    tags: ['Stage2', 'CrossLocality', 'Lore'],
    xpReward: 83,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(83, 'tracing Northern Provision Compact compound use to a dissolved eastern circuit settlement');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.aurora_eastern_settlement_precedent = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The settlement dissolution archive has a four-year-old entry: a commune in the eastern circuit, Verath Crossing, dissolved by collective vote eighteen months after a dome infrastructure upgrade. The upgrade was authorized by the same Collegium regional technical authority that authorized Aurora Crown\'s sensor recalibration. Verath Crossing\'s dissolution petition cited community fatigue, reduced civic participation, and a collapse of the resident governance council over a twelve-month period. The petition was unanimous. The archived medical records for the settlement show a respiratory and fatigue complaint pattern that begins three months before the infrastructure upgrade and continues until dissolution. The Northern Provision Compact name does not appear in Verath Crossing\'s records. The Collegium technical authority does.';
        addJournal('Verath Crossing dissolved 4 years prior — same Collegium technical authority, same symptom pattern, governance collapse, unanimous dissolution 18mo post-upgrade', 'evidence', 'aur-verath-link-' + G.dayCount);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'The settlement dissolution archive is accessible in the inter-settlement registry system, but the eastern circuit entries sit behind a historical records tier that requires a clerk to pull manually — the digital index stops at settlements dissolved in the last two years. The clerk at the registry counter takes the request and explains that historical record pulls for external parties go into the research queue. The research queue has a three-week backlog. She stamps your request and puts it in the tray. The Verath Crossing records exist. You will not see them today.';
        addJournal('Settlement dissolution archive historical tier requires clerk pull — research queue, three-week backlog', 'complication', 'aur-verath-link-fail-' + G.dayCount);
      } else {
        G.flags.aurora_eastern_settlement_precedent = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The dissolution archive has an entry for Verath Crossing: a dome commune in the eastern circuit, dissolved by collective vote four years ago. The dissolution petition cites civic fatigue and governance collapse over an eighteen-month period following a Collegium-authorized infrastructure upgrade. The settlement\'s medical records in the archive show respiratory and fatigue complaints that match the pattern Liora has been tracking. The Collegium technical authority named in the Verath Crossing upgrade is the same one named in Aurora Crown\'s sensor recalibration documents. The precedent exists. This has happened before.';
        addJournal('Verath Crossing dissolution — same Collegium authority, same symptom timeline, governance collapse preceding unanimous dissolution vote', 'evidence', 'aur-verath-link-part-' + G.dayCount);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The Collegium liaison used the same credential at three localities in the same week.",
    tags: ['Stage2', 'CrossLocality', 'Stealth'],
    xpReward: 81,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(81, 'cross-referencing Collegium liaison credential usage across three locality archive access logs');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('finesse', (G.skills.finesse||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.aurora_credential_multi_locality = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The inter-settlement access log is a shared registry. You pull the liaison\'s credential code across all registered localities. In the third week of the second month of deliveries, the credential appears in three locality access logs: Aurora Crown, Harvest Circle, and a third settlement — Tidal Bridge, on the eastern transit route. Three access events, three localities, five-day window. The transit time between Aurora Crown and Harvest Circle alone is two days. The credential is being used simultaneously across the settlement network. There are at least two people operating under the same credential code, or the credential has been compromised and distributed. Either way, the liaison is not a single individual.';
        addJournal('Liaison credential used in 3 localities within 5 days — physical transit impossible, credential shared or distributed across multiple operators', 'evidence', 'aur-multicred-' + G.dayCount);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = 'The inter-settlement credential access log query requires a formal research authorization from the Collegium registry office — a process that generates a notification to the Collegium\'s administrative security division when an external party queries a credential code across multiple localities. The notification is generated before the authorization completes. The Collegium\'s administrative security division now knows someone at Aurora Crown is searching for cross-locality credential usage. The search is documented in two systems: the registry authorization queue and the security division notification log. You have not seen the access log. You have told the Collegium you were looking for it.';
        addJournal('Cross-locality credential query notified Collegium security division before authorization completed — search documented, access log not seen', 'complication', 'aur-multicred-fail-' + G.dayCount);
      } else {
        G.flags.aurora_credential_multi_locality = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The inter-settlement access log shows the liaison credential active in three localities within a five-day window. You check the transit schedule between them. Aurora Crown to Harvest Circle: two days minimum. Harvest Circle to Tidal Bridge: another two days. The credential was used in all three within five days, across routes that would take longer than five days to travel. Either the credential is in more than one person\'s possession or the access is being generated remotely. The liaison who visits the inn once a quarter is not the only operator using that code.';
        addJournal('Liaison credential active in 3 localities in 5 days — physical transit impossible, multiple operators or remote credential use', 'evidence', 'aur-multicred-part-' + G.dayCount);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The filtration manifold readings are off — a trained hand could recalibrate undetected",
    tags: ['Stage2', 'Investigation'],
    plot: 'main',
    skill: 'spirit',
    xpReward: 80,
    fn: function() {
      var result = rollD20('spirit', {dc: 13, locality: 'aurora_crown_commune', label: 'Recalibrate manifold'});
      if (result.isCrit) {
        G.stageProgress[2]++;
        addJournal('The manifold calibration log shows three unauthorized resets — each timed to a scheduled inspection. Someone was erasing evidence of power diversion.', 'evidence');
        G.lastResult = 'You recalibrate the manifold and pull the maintenance history in the same motion. Three deliberate resets in the log, each timed to coincide precisely with external inspections. The timestamps are too clean for coincidence — someone with maintenance access had the inspection schedule and used it. This is sabotage with a schedule, running for at least two cycles.';
      } else if (result.isFumble) {
        addHeat('shelk', 1);
        G.lastResult = 'The manifold alarm trips before the recalibration completes — a high-pressure warning tone that carries across the whole floor. A duty officer appears within forty seconds, hand already on her radio. You explain it as a routine check gone slightly wrong. She writes something on her pad. Her expression suggests she does not find this explanation satisfying and intends to follow up with someone who outranks you.';
      } else if (result.isSuccess) {
        G.stageProgress[2]++;
        G.lastResult = 'You recalibrate it cleanly and pull the access log before closing the panel. Three resets recorded in the maintenance history — each one deliberate, each timed to a narrow window before an inspection visit. Whoever did this had the inspection calendar and maintenance credentials both. The tracks were covered, but the covering itself left a pattern.';
      } else {
        G.lastResult = 'The calibration panel locks on the second failed access attempt — a quiet click and a status light shifting from amber to red. You step back and find something else to look at. The duty log will show a failed credential attempt at this panel, timestamped. Someone may check it tonight; someone may check it tomorrow. Either way the access attempt is on record now.';
      }
    }
  },
  {
    label: "The maintenance supervisor is blocking the corridor — strength is the fastest way through",
    tags: ['Stage2', 'Confrontation'],
    plot: 'main',
    skill: 'might',
    xpReward: 70,
    fn: function() {
      var result = rollD20('might', {dc: 13, locality: 'aurora_crown_commune', label: 'Corridor confrontation'});
      if (result.isCrit) {
        G.stageProgress[2]++;
        G.flags.aurora_supervisor_cleared = true;
        G.lastResult = 'Your posture and tone cut through his rehearsed obstruction — the kind of authority that does not ask for passage, only expects it. He steps aside, reads your expression once, and then gives you something you did not ask for: a name. The person who told him to hold this corridor on inspection days. He says it quietly, the way a man says something he has been waiting to say to the right person.';
      } else if (result.isFumble) {
        addHeat('shelk', 2);
        G.lastResult = 'The confrontation escalates faster than expected — he was ready for it, had a response prepared. His hand goes to a wall panel and he calls for security without raising his voice, the practiced calm of someone who has been through this before. You withdraw before the corridor fills. The incident will be logged, with your description and the time.';
      } else if (result.isSuccess) {
        G.stageProgress[2]++;
        G.lastResult = 'He yields the corridor without naming anyone — the pressure was enough, but not quite enough to break whatever he is protecting. He steps aside and looks over his shoulder once before he moves, checking a door further down the hall. The gesture is reflex. Someone upstream told him to hold this post, and he knows that person is somewhere reachable from here.';
      } else {
        G.lastResult = 'He holds his ground without flinching, arms loose at his sides — the stance of someone who has been trained to take pressure and not give ground. Your authority does not register against whatever authority put him here. You cannot press further without drawing the kind of attention that would close this corridor to you permanently. Another route, then, if there is one.';
      }
    }
  },
  {
    label: "The equipment bay's staff entrance is watched — the ventilation shaft is not",
    tags: ['Stage2', 'Infiltration'],
    plot: 'main',
    skill: 'finesse',
    xpReward: 80,
    fn: function() {
      var result = rollD20('finesse', {dc: 14, locality: 'aurora_crown_commune', label: 'Ventilation access'});
      if (result.isCrit) {
        G.stageProgress[2]++;
        addJournal('Equipment bay inventory shows three filtration cores listed as decommissioned but absent from the disposal log.', 'evidence');
        G.lastResult = 'Through the ventilation access you drop into the equipment bay without a sound — the ductwork is warm and smells of filtered mineral dust, but the landing is clean. The inventory board on the far wall shows three filtration cores logged as decommissioned, but the disposal register has no corresponding entries. The cores themselves are gone from the rack. Someone moved them after marking them as waste, before they could be tracked to a disposal facility. Ghost materials.';
      } else if (result.isFumble) {
        addHeat('shelk', 1);
        G.lastResult = 'A guard on a non-standard patrol route is below the vent opening when you reach the access point — close enough to hear the metal flex under your weight. You drop into the corridor instead and walk out at an even pace with a cover story that holds for roughly thirty seconds before he calls it in. They have your face now, and the access point is burned.';
      } else if (result.isSuccess) {
        G.stageProgress[2]++;
        G.lastResult = 'You make it through the ventilation access and reach the equipment bay with enough time to read the inventory board. The discrepancy is real and documented in the bay\'s own records: decommissioned equipment listed with no corresponding disposal paperwork, no receiving facility, no transit log. The cores were written off and then quietly redistributed to somewhere without a paper trail. A ghost supply chain, using the decommission process as cover.';
      } else {
        G.lastResult = 'The ventilation duct is louder than it looked from the access panel — a high metallic resonance that carries in both directions. You make it three meters before the noise risk becomes unacceptable. You back out and replace the panel cover with care. The bay remains unreachable through this route. Whatever is in the inventory board stays unread.';
      }
    }
  },

];

window.AURORA_STAGE2_ENRICHED_CHOICES = AURORA_CROWN_COMMUNE_STAGE2_ENRICHED_CHOICES;
