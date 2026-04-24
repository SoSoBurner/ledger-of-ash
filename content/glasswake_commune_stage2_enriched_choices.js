/**
 * GLASSWAKE COMMUNE STAGE 2 ENRICHED CHOICES
 * Investigation arc: glasswake shard contamination data / glyph architecture research suppression
 * NPCs: Researcher Toman Iceveil (Contamination Research Lead), Lenna Bannerhold (Commune Research Clerk)
 */

const GLASSWAKE_COMMUNE_STAGE2_ENRICHED_CHOICES = [

  {
    label: "Researcher Toman Iceveil's contamination data shows glasswake shard output increasing in correlation with external glyph pressure events — the shards are responding to engineered surges.",
    tags: ['Investigation', 'Stage2', 'Meaningful'],
    xpReward: 82,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(82, 'reviewing glasswake shard glyph correlation with Toman Iceveil');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_toman_iceveil = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `Toman's research crosses two previously unconnected findings: glasswake shards amplify glyph pressure differentials, and the regional surge pattern is consistent with a modulated external source rather than natural variance. His conclusion — which he has not published due to suppression pressure — is that someone is deliberately using the shards as a regional pressure amplification network. Glasswake is an unwilling component of the operation.`;
        addJournal('Glasswake shards are surge amplification network — Iceveil has unpublished conclusion', 'evidence', `glass-toman-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Toman's hands are flat on the observation gallery table when he speaks. "There's a suppression request on my research from the Northern Glyph Oversight Commission. Filed six weeks ago." He says the name the way you say a thing you know is false but cannot yet prove. Every interaction that goes into a log creates a paper record that could be used against him. He ends the meeting politely, without explanation, and does not look up from the table when he does it.`;
        addJournal('Iceveil research under fake-authority suppression request — cooperation too risky', 'complication', `glass-toman-fail-${G.dayCount}`);
      } else {
        G.flags.met_toman_iceveil = true;
        G.investigationProgress++;
        G.lastResult = `Toman confirms the correlation without looking at his notes — he has run this argument enough times that it sits in recall. "The surge pattern has characteristics of an external modulated signal. Natural variance doesn't produce this regularity." He says it flatly, the way someone states a finding they know will be contested. He submitted the correlation for peer review six months ago. The suppression requests started within the week. He hasn't published since and doesn't say whether he intends to.`;
        addJournal('Surge pattern has external modulated signal characteristics — publication suppressed', 'evidence', `glass-toman-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Lenna Bannerhold's research clerk records include a suppression order that names four specific research conclusions — the conclusions describe the full operation mechanism if read together.",
    tags: ['NPC', 'Lore', 'Stage2', 'Meaningful'],
    xpReward: 78,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(78, 'analyzing suppression order contents with Lenna Bannerhold');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_lenna_bannerhold = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `Lenna reads the four suppressed conclusions aloud: shard amplification mechanics, tidal window optimal surge timing, suppression compound delivery efficacy, and staged exposure dosing effects. Together they form a complete operational manual. The suppression order was not preventing harmful research — it was preventing the documentation of a crime.`;
        addJournal('Four suppressed conclusions form complete operation manual — suppression order was evidence concealment', 'evidence', `glass-lenna-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `Lenna's expression stays neutral through the request, but her hand moves immediately to the compliance log on her desk. The suppression order is classified at the document level — its existence is known, but its contents are restricted. Asking for the contents is a compliance violation under the Concord's access protocol, and she is obligated to log it regardless of intent. She writes the entry with the same pen she uses for everything else. The log goes to the Concord at the end of the week.`;
        addJournal('Suppression order classified — inquiry reported as compliance violation', 'complication', `glass-lenna-fail-${G.dayCount}`);
      } else {
        G.flags.met_lenna_bannerhold = true;
        G.investigationProgress++;
        G.lastResult = `Lenna sets her clerk's index on the desk and opens it to the suppression order entry. She can describe the document's structure without reading its classified sections aloud. Four research conclusions are named in the order's scope: shard amplification mechanics, timing window analysis, compound delivery methodology, and population exposure modeling. She reads each topic heading once, then closes the index. The four topics are not from four separate fields. They describe the same operation from four different angles.`;
        addJournal('Four suppression topics identified — shard, timing, compounds, population dosing', 'evidence', `glass-lenna-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Toman Iceveil's unpublished research, combined with the suppression order, creates a complete evidentiary package — help him submit it through a protected channel.",
    tags: ['Investigation', 'Craft', 'Stage2', 'Consequence', 'Meaningful'],
    xpReward: 84,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(84, 'routing Toman Iceveil research through protected publication channel');


      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags.met_toman_iceveil && !G.flags.met_lenna_bannerhold) {
        G.lastResult = `The routing channel requires both researchers' cooperation — Toman's data and Lenna's access to the suppression order's structure. Without both threads confirmed, the package that reaches the archive will be incomplete, and an incomplete submission won't carry the weight needed to protect it. The groundwork here isn't done yet.`;
        G.recentOutcomeType = 'investigate'; return;
      }
      const result = rollD20('craft', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.flags.stage2_evidence_shared = true;
        G.lastResult = `You route the research through the Mimolot Academy's Velis Quillfire shrine archive — a channel that bypasses commercial publication suppression because shrine records have doctrinal protection. The research is now preserved in a location that cannot be legally suppressed. The operation's mechanism is documented and protected.`;
        addJournal('Glasswake research preserved in shrine archive — legally suppression-proof via Mimolot', 'evidence', `glass-route-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `The routing channel closes mid-transit — a packet rejection code that wasn't there two days ago. Somewhere between this commune and the Mimolot archive, the route is being watched. The suppression authority received notification before the research reached its destination. Toman's name is now attached to a near-publication attempt; the scrutiny at his workspace doubles within the day. The window is closed, and closing it taught whoever is watching that someone tried to use it.`;
        addJournal('Research routing intercepted — Toman under increased scrutiny', 'complication', `glass-route-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.flags.stage2_evidence_shared = true;
        G.lastResult = `The research reaches the secure channel intact, but the archive's protective seal is conditional — shrine doctrine protects the document from commercial suppression orders, not from direct institutional authority. It is preserved and inaccessible to the suppression mechanism for now. The operation's architects will know within a day that the research is held somewhere they cannot easily reach. That knowledge alone will change how they move next.`;
        addJournal('Research in secure channel — preserved but not public, architects alerted', 'evidence', `glass-route-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Toman Iceveil returns to the observation gallery with a second data set — shard resonance patterns from three separate clear-sky windows. The amplification is not random. It is timed.",
    tags: ['Stage2', 'Lore'],
    xpReward: 80,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(80, 'tracing timed shard resonance pattern with Toman Iceveil');

      if (!G.worldClocks) G.worldClocks = {};

      const result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.toman_second_meeting = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `Toman spreads three parchment charts across the gallery table, weighted at the corners with sample jars. The resonance spikes align to the same two-hour window across all three clear-sky events — separated by forty-three days each. He taps the interval column. "That is not a natural period. The glasswake formation doesn't have a forty-three day cycle. Something external does." The amplification network has a clock. Someone is running it on a schedule.`;
        addJournal('Shard resonance spikes on 43-day interval — external schedule confirmed by Iceveil', 'evidence', `glass-toman2-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Toman arrives at the gallery entrance with a scroll tube under one arm, sees the warden at the far instrument rack logging readings, and stops. He doesn't enter the room. He rolls the scroll tube back under his arm without unfolding anything and says "not here" at a volume meant only for you. Then he's gone. The warden finishes the reading, sets down her pen, and watches the doorway for a long moment before returning to the log. She noticed him stop. She may have noticed why.`;
        addJournal('Iceveil second data set blocked — warden present, meeting aborted', 'complication', `glass-toman2-fail-${G.dayCount}`);
      } else {
        G.flags.toman_second_meeting = true;
        G.investigationProgress++;
        G.lastResult = `Toman shows one chart — the most recent clear-sky window. The resonance spike is narrow, precise, and two hours after solar peak. "I have two more that match." He won't produce them here, but he confirms the interval is consistent. "Forty-three days. Every time." He folds the chart and pockets it before anyone passes the doorway.`;
        addJournal('One confirmed spike — 43-day interval, Iceveil has two more matching charts', 'evidence', `glass-toman2-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The flagged exposure trenches outside the dome mark the shard formation perimeter. At low-observation hours the pylons go dark. The glyph pressure gradient is readable directly from the trench edge.",
    tags: ['Stage2', 'Survival'],
    xpReward: 80,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(80, 'reading glyph pressure gradient at the shard formation site');

      if (!G.worldClocks) G.worldClocks = {};

      const result = rollD20('survival', (G.skills.survival||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.shard_site_observed = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `The trench edge is cold enough that breath fogs immediately. The shards here are small — irregular clusters the size of a fist, dark at the base and pale at the tip. The glyph pressure visible to a trained eye runs inward rather than outward: the formation is drawing pressure toward its center, not dispersing it. A natural shard vents. This one collects. The flagging markers are spaced for quarantine, not study. No researcher has stood this close in some time.`;
        addJournal('Shard formation draws pressure inward — collector behavior, not natural venting', 'evidence', `glass-site-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `A pylon activates early — the sensor grid runs a sweep cycle that doesn't match the posted schedule. The light sweeps the trench edge and catches movement. A containment warden is at the dome entrance within minutes, citation board in hand. Your presence at the perimeter outside observation hours goes into the formal log.`;
        addJournal('Caught at shard perimeter — pylon sweep early, formal citation logged', 'complication', `glass-site-fail-${G.dayCount}`);
      } else {
        G.flags.shard_site_observed = true;
        G.investigationProgress++;
        G.lastResult = `The shards are denser at the formation center than the quarantine maps show. The pressure gradient at the trench edge runs counter to what the posted data boards list — inward pull where the readings claim neutral. The discrepancy is measurable with bare attention. Whether it was misread or misreported is a different question.`;
        addJournal('Pressure gradient counter to posted readings — inward pull at shard center', 'evidence', `glass-site-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Lenna Bannerhold flags a procedural breach: you accessed the shard perimeter log without submitting a prior scan record. The Containment Research Concord requires collective sign-off before field access.",
    tags: ['Stage2', 'Persuasion'],
    xpReward: 80,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(80, 'navigating collective process breach with Lenna Bannerhold');

      if (!G.worldClocks) G.worldClocks = {};

      const result = rollD20('persuasion', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.lenna_trust_built = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `Lenna sets the citation form down without filing it. She studies the scan record gap for a moment, then slides the log closed. "The Concord requires process because process creates a record. If your record is missing, that means someone else's record is the only one." She glances toward the suppression files across the room. "That happens to be relevant right now." She marks your access as a supervised observation and countersigns it herself.`;
        addJournal('Lenna countersigned access — process breach resolved, trust established', 'contact_made', `glass-lenna2-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `Lenna files the citation before the conversation ends. "I understand you have reasons. So does everyone who skips scanning." She is not hostile — she is procedurally obligated and says so plainly. The citation goes to the Containment Research Concord. It will attach to any future access request.`;
        addJournal('Citation filed with Concord — future access requests flagged', 'complication', `glass-lenna2-fail-${G.dayCount}`);
      } else {
        G.flags.lenna_trust_built = true;
        G.investigationProgress++;
        G.lastResult = `Lenna accepts the explanation but logs a formal note rather than dismissing the breach. "I can mark this as remediated, not absent." She hands over a blank scan form. "Submit this before any further perimeter access. The Concord reads absences as intent." It is not a threat. It is the actual rule, stated without editorial.`;
        addJournal('Breach marked remediated — scan form required for further perimeter access', 'intelligence', `glass-lenna2-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The containment warden's field book has two readings absent from the official log.",
    tags: ['Stage2', 'Lore'],
    xpReward: 65,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(65, 'comparing containment warden field book against redacted official pylon logs');
      const result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_containment_warden_pita = true;
        G.investigationProgress++;
        G.stageProgress[2]++;
        G.lastResult = `The warden — Pita Sormund, who writes each entry with her left hand braced against the pylon post, the ink sometimes smeared at the entry's end — sets the field book open to the two redacted dates without being told which to find. The readings she logged show a pressure spike on both occasions that exceeded the formation's documented maximum by forty percent. The official published log from the same dates shows the reading as "nominal." Someone downstream of her field note had the authority to alter the published record. She places her thumb on the field book entry and does not move it.`;
        addJournal('Warden Pita Sormund field book: two 40%-overspike readings redacted from official log — published as nominal', 'evidence', `glass-pita-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Sormund arrives at the pylon sweep while Lenna's citation is still on the processing desk. She reads the situation in two seconds flat and keeps the field book at her side, spine facing away. "Pylon log is containment property. Access requests go through the Containment Research Concord." She marks the sweep and moves on without pausing. The field book does not come out of her coat.`;
        addJournal('Warden declined field book access — Concord process required, timing unfavorable', 'complication', `glass-pita-fail-${G.dayCount}`);
      } else {
        G.flags.met_containment_warden_pita = true;
        G.investigationProgress++;
        G.lastResult = `Sormund confirms two dates where her field readings differed from the published official log. She will not say by how much. "The field note is mine. The published record is the Concord's." She closes the field book and pockets it. She does not deny the discrepancy. "If someone else asked me the same question with a Concord authorization form, I would show them the numbers."`;
        addJournal('Containment warden confirms two field-log discrepancies — official log differs, Concord authorization needed to see numbers', 'intelligence', `glass-pita-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The suppression authority's courier left a receipt. The return address isn't in any public registry.",
    tags: ['Stage2', 'Lore'],
    xpReward: 65,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(65, 'tracing suppression authority courier transit receipt return address');
      const result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.suppression_authority_traced = true;
        G.investigationProgress++;
        G.stageProgress[2]++;
        G.lastResult = `The transit receipt is still in the incoming parcel desk tray — it arrived yesterday and hasn't been collected. The return address: "Northern Glyph Oversight Commission, Shelkopolis Civic Administration Bureau, Post Line 7." Lenna confirms Post Line 7 is a Shelkopolis administrative routing code — not a public-facing address, used only by established government offices. The NGOC doesn't appear in any Shelkopolis civic directory. A non-existent office using a legitimate government routing code. The suppression authority has formal postal access through a real administrative channel.`;
        addJournal('Suppression authority (NGOC) uses legitimate Shelkopolis Post Line 7 — real routing code, no civic directory listing', 'evidence', `glass-ngoc-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The receipt is gone by the time you reach the parcel desk — collected within the hour by a courier who arrived at the desk while Lenna was handling the citation paperwork. The desk clerk logged the collection but not the collector's credentials. "He had the right receipt number." The return address, whatever it said, moved out with the paper.`;
        addJournal('Courier receipt collected before retrieval — collector not credentialed, address unknown', 'complication', `glass-ngoc-fail-${G.dayCount}`);
      } else {
        G.flags.suppression_authority_traced = true;
        G.investigationProgress++;
        G.lastResult = `The receipt names "Northern Glyph Oversight Commission" as the sender. Lenna reads the return postal code carefully: "That's a Shelkopolis government routing designation. They don't assign those to private or commercial addresses." She looks it up in the commune's postal reference binder. The NGOC does not appear. "A government routing code without a civic registration. That's not supposed to be possible."`;
        addJournal('NGOC uses government routing code without civic registration — impossible under standard postal rules', 'intelligence', `glass-ngoc-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Stage 2 Glasswake Commune finale — the shard amplification proof and suppressed conclusions confirm the full operation mechanism. Publish openly or submit to institutional authority.",
    tags: ['Investigation', 'Finale', 'Stage2', 'Consequence', 'Meaningful'],
    xpReward: 106,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(106, 'Glasswake Commune Stage 2 resolution');
      if (!G.investigationProgress || G.investigationProgress < 8) {
        G.lastResult = `The research package exists in pieces but not yet as a whole. Toman's correlation data, Lenna's suppression order structure, the shard site readings — together they form an argument. Separately they're notes. Acting now means presenting an incomplete case to institutions that will need a reason to move against their own interests. The commune's threads aren't assembled into something that holds yet.`;
        G.recentOutcomeType = 'investigate'; return;
      }
      if (!G.worldClocks) G.worldClocks = {};

      const result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/2));
      if (result.total >= 14 || result.isCrit) {
        G.flags.stage2_finale_institutional = true;
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 3;
        G.lastResult = `The research package reaches the Mimolot Academy Regent Council under Quenra Quillfire's authority — hand-delivered to the Council secretary's intake desk, signed and logged. The Council convenes a formal academic investigation within two days. The Northern Glyph Oversight Commission suppression order is declared procedurally void under Academy academic freedom doctrine: the body that issued it has no standing in the Academy's jurisdiction. Stage III begins with institutional backing already in place.`;
        addJournal('Glasswake S2 finale: Academy formal investigation, suppression order voided', 'evidence', `glass-finale-inst-${G.dayCount}`);
      } else {
        G.flags.stage2_finale_underworld = true;
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 3;
        G.lastResult = `The full research package goes out through the Verdant Row distribution circuit and the Scriptorium Steps back-channel at the same moment — no single point to suppress, no single address to intercept. Within forty-eight hours the correlation between glasswake shard amplification and the suppression compound mechanism is in every scholarly network and trade circuit that matters across the region. The operation's architects can no longer count on technical opacity. The mechanism is named and distributed.`;
        addJournal('Glasswake S2 finale: operation mechanism published across all networks', 'evidence', `glass-finale-uw-${G.dayCount}`);
      }
      G.flags.stage2_faction_contact_made = true;
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

];

window.GLASSWAKE_COMMUNE_STAGE2_ENRICHED_CHOICES = GLASSWAKE_COMMUNE_STAGE2_ENRICHED_CHOICES;
