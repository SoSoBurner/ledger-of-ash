/**
 * GLASSWAKE COMMUNE STAGE 2 ENRICHED CHOICES
 * Investigation arc: glasswake shard contamination data / glyph architecture research suppression
 * NPCs: Researcher Toman Iceveil (Contamination Research Lead), Lenna Bannerhold (Commune Research Clerk)
 */

var GLASSWAKE_COMMUNE_STAGE2_ENRICHED_CHOICES = [

  {
    label: "Shard output tracks against external glyph pressure events. The shards respond to engineered surges.",
    tags: ['Investigation', 'Stage2', 'Meaningful'],
    xpReward: 82,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(82, 'reviewing glasswake shard glyph correlation with Toman Iceveil');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
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
    label: "A suppression order names four specific research conclusions. Together they describe the full mechanism.",
    tags: ['NPC', 'Lore', 'Stage2', 'Meaningful'],
    xpReward: 78,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(78, 'analyzing suppression order contents with Lenna Bannerhold');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_lenna_bannerhold = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `Lenna reads the four suppressed conclusions aloud, her voice low, the peat smoke from the corridor heater thickening the air behind her: shard amplification mechanics, tidal window optimal surge timing, suppression compound delivery efficacy, and staged exposure dosing effects. Damp from the lake channel seeps under the archive door. Together the four topics form a complete operational manual. The suppression order was not preventing harmful research — it was preventing the documentation of a crime already in progress.`;
        addJournal('Four suppressed conclusions form complete operation manual — suppression order was evidence concealment', 'evidence', `glass-lenna-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `Lenna's expression stays neutral through the request, but her hand moves immediately to the compliance log on her desk. The suppression order is classified at the document level — its existence is known, but its contents are restricted. Asking for the contents is a compliance violation under the Concord's access protocol, and she is obligated to log it regardless of intent. She writes the entry with the same pen she uses for everything else. The log goes to the Concord at the end of the week.`;
        addJournal('Suppression order classified — inquiry reported as compliance violation', 'complication', `glass-lenna-fail-${G.dayCount}`);
      } else {
        G.flags.met_lenna_bannerhold = true;
        G.investigationProgress++;
        G.lastResult = `Lenna sets her clerk's index on the desk and opens it to the suppression order entry. The archive room is cold at this hour, morning mist still threading through the reed-lined window gaps from the estuary side. She can describe the document's structure without reading its classified sections aloud. Four research conclusions are named in the order's scope: shard amplification mechanics, timing window analysis, compound delivery methodology, and population exposure modeling. She reads each topic heading once, then closes the index without comment. The four topics are not from four separate fields — they describe the same operation from four different angles.`;
        addJournal('Four suppression topics identified — shard, timing, compounds, population dosing', 'evidence', `glass-lenna-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The research and suppression order form a complete package. It needs a protected channel.",
    tags: ['Investigation', 'Craft', 'Stage2', 'Consequence', 'Meaningful'],
    xpReward: 84,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(84, 'routing Toman Iceveil research through protected publication channel');


      if (!G.worldClocks) G.worldClocks = {};
      if (!(G.flags && G.flags.met_toman_iceveil) && !(G.flags && G.flags.met_lenna_bannerhold)) {
        G.lastResult = `The routing channel requires both researchers' cooperation — Toman's data and Lenna's access to the suppression order's structure. The fishing nets off the commune's east dock creak against their bollards in the morning wind, a sound that carries all the way to this corridor at low tide. Without both threads confirmed, the package that reaches the archive will be incomplete, and an incomplete submission won't carry the weight needed to protect it from the mechanism that killed the original publications. The groundwork here is not done yet.`;
        G.recentOutcomeType = 'investigate'; return;
      }
      const result = rollD20('spirit', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.flags.stage2_evidence_shared = true;
        G.lastResult = `The research routes through the Mimolot Academy's Velis Quillfire shrine archive — a channel that bypasses commercial publication suppression because shrine records carry doctrinal protection under Academy law. The peat-smoke smell of the commune's corridors gives way to the cold clarity of a completed action. The research is now preserved in a location the suppression order cannot legally reach. The full mechanism — shard amplification, tidal timing, compound delivery — is documented, protected, and held somewhere the operation's architects cannot quietly withdraw it.`;
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
    label: "A second data set: shard resonance across three clear-sky windows. The amplification is timed.",
    tags: ['Stage2', 'Lore'],
    xpReward: 80,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(80, 'tracing timed shard resonance pattern with Toman Iceveil');

      if (!G.worldClocks) G.worldClocks = {};

      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
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
        G.lastResult = `Toman shows one chart — the most recent clear-sky window. The observation gallery smells of cold stone and damp wool, the estuary light flat and pale through the narrow window slats. The resonance spike is narrow, precise, and two hours after solar peak. "I have two more that match." He won't produce them here, but he confirms the interval is consistent across all three events. "Forty-three days. Every time." He folds the chart along its original crease and pockets it before anyone passes the doorway.`;
        addJournal('One confirmed spike — 43-day interval, Iceveil has two more matching charts', 'evidence', `glass-toman2-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The pylons go dark at low-observation hours. The glyph gradient is readable from the trench.",
    tags: ['Stage2', 'Survival'],
    xpReward: 80,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(80, 'reading glyph pressure gradient at the shard formation site');

      if (!G.worldClocks) G.worldClocks = {};

      const result = rollD20('vigor', (G.skills.survival||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.shard_site_observed = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `The trench edge is cold enough that breath fogs immediately. The shards here are small — irregular clusters the size of a fist, dark at the base and pale at the tip. The glyph pressure visible to a trained eye runs inward rather than outward: the formation is drawing pressure toward its center, not dispersing it. A natural shard vents. This one collects. The flagging markers are spaced for quarantine, not study. No researcher has stood this close in some time.`;
        addJournal('Shard formation draws pressure inward — collector behavior, not natural venting', 'evidence', `glass-site-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `A pylon activates early — the sensor grid runs a sweep cycle that does not match the posted schedule. The light sweeps the trench edge and catches movement against the pale winter glare off the estuary surface. Reed smell and cold mud rise from the formation trench. A containment warden is at the dome entrance within minutes, citation board in hand, her boots leaving wet prints on the concrete approach. Presence at the perimeter outside observation hours goes into the formal log with the precise time recorded.`;
        addJournal('Caught at shard perimeter — pylon sweep early, formal citation logged', 'complication', `glass-site-fail-${G.dayCount}`);
      } else {
        G.flags.shard_site_observed = true;
        G.investigationProgress++;
        G.lastResult = `The shards are denser at the formation center than the quarantine maps show. The trench holds cold air even at midday, the sluice-channel sound from the commune's water intake carrying across the open ground. The pressure gradient at the trench edge runs counter to what the posted data boards list — inward pull where the readings claim neutral. The discrepancy is measurable with bare attention from this distance. Whether it was misread or deliberately misreported is a question the formation itself cannot answer.`;
        addJournal('Pressure gradient counter to posted readings — inward pull at shard center', 'evidence', `glass-site-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "A procedural breach flagged. The Concord requires collective sign-off before field access.",
    tags: ['Stage2', 'Persuasion'],
    xpReward: 80,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(80, 'navigating collective process breach with Lenna Bannerhold');

      if (!G.worldClocks) G.worldClocks = {};

      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.lenna_trust_built = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `Lenna sets the citation form down without filing it. She studies the scan record gap for a moment, then slides the log closed. "The Concord requires process because process creates a record. If your record is missing, that means someone else's record is the only one." She glances toward the suppression files across the room. "That happens to be relevant right now." She marks your access as a supervised observation and countersigns it herself.`;
        addJournal('Lenna countersigned access — process breach resolved, trust established', 'contact_made', `glass-lenna2-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `Lenna files the citation before the conversation ends. The commune archive is cold in the morning, peat smoke from the corridor drifting faintly under the door. "I understand you have reasons. So does everyone who skips scanning." She is not hostile — she is procedurally obligated and says so plainly, her pen moving without pause. The citation goes to the Containment Research Concord by end of week. It will attach to any future access request submitted under this name.`;
        addJournal('Citation filed with Concord — future access requests flagged', 'complication', `glass-lenna2-fail-${G.dayCount}`);
      } else {
        G.flags.lenna_trust_built = true;
        G.investigationProgress++;
        G.lastResult = `Lenna accepts the explanation but logs a formal note rather than dismissing the breach. The archive room holds the smell of lake water and old paper, the winter light off the estuary thin and grey through the high window. "I can mark this as remediated, not absent." She hands over a blank scan form, the paper slightly damp from the room's humidity. "Submit this before any further perimeter access. The Concord reads absences as intent." Not a threat — the actual rule, stated plainly and without editorial weight added to it.`;
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
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
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
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
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
    label: "The disposal schedule changed. New hours run when no assessor is on shift.",
    tags: ['Stage2', 'Survival'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'tracing waste shard disposal schedule change at glasswake commune');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('vigor', (G.skills.survival||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.disposal_schedule_traced = true;
        G.investigationProgress++;
        G.stageProgress[2]++;
        G.lastResult = `The glassworker — Fen Ashmark, whose hands are permanently pale at the fingertips from cold-shard handling — pulls the old disposal ledger from the back shelf without being asked. The change is dated six months and four days ago. New run time: the third watch shift, when the environmental assessors are logging off and the night crew hasn't checked in. He sets his finger on the date column and doesn't move it. "The shards that go out in those runs aren't logged by weight. Just by count."`;
        addJournal('Disposal runs now happen during assessor gap shift — shard weight not logged since change', 'evidence', `glass-disposal-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Fen Ashmark answers the question with a glance toward the containment office door, which is open. The disposal ledger stays on the shelf. "Schedule changes go through the operations board." He writes something at the bottom of his current shift log — you can't see the entry from where you stand — and sets his pen down on top of it. The shift supervisor walks past the doorway thirty seconds later, not stopping, but the timing is not accidental.`;
        addJournal('Disposal schedule inquiry deflected — Ashmark logged something, supervisor passed within seconds', 'complication', `glass-disposal-fail-${G.dayCount}`);
      } else {
        G.flags.disposal_schedule_traced = true;
        G.investigationProgress++;
        G.lastResult = `Fen Ashmark confirms the schedule change without consulting the ledger — he was on shift the night it happened. Third watch, six months ago. "Environmental assessors don't run overlap on that shift. Never have." He won't say the word correlation. But he pulls the current month's run sheet and holds it where the total weight column is visible: the entries from third-watch runs are in a different hand from the rest.`;
        addJournal('Third-watch disposal runs logged in different handwriting — Ashmark confirmed schedule change date', 'intelligence', `glass-disposal-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Four years of glyph readings. The last six months don't resemble the earlier record.",
    tags: ['Stage2', 'Lore'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'examining glasswake ambient glyph archive for anomalous spike pattern');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.glyph_archive_examined = true;
        G.investigationProgress++;
        G.lastResult = `The archive occupies three drawers in the environmental monitoring post, each drawer labeled by year in faded ink. The earlier readings are stable — small seasonal variance, no event spikes above twelve percent above baseline. The last six months fill less than half a drawer. The spikes run to sixty and seventy percent above baseline, irregular in frequency but consistent in shape: a sharp rise, a plateau of two to three hours, a clean drop. No natural atmospheric event produces that plateau profile. The shape is controlled.`;
        addJournal('Glyph archive: pre-six-month readings stable; recent spikes plateau-shaped — controlled profile, not natural', 'evidence', `glass-archive-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The monitoring post archivist — a precise, unhurried person who checks your access credentials twice before opening the drawer — finds a routing hold on the last two quarters of readings. "Sequestered for review by the Containment Research Concord. No external access until the review closes." She shows you the hold notice: no end date, no reviewing body listed. The archive's most recent entries are not available.`;
        addJournal('Recent glyph archive sequestered by Concord — no end date on hold, reviewing body unnamed', 'complication', `glass-archive-fail-${G.dayCount}`);
      } else {
        G.flags.glyph_archive_examined = true;
        G.investigationProgress++;
        G.lastResult = `Three years of baseline readings, then the shift. The spikes in the recent record are higher than anything in the prior archive and they hold shape across separate events — same rise time, same plateau duration. A natural variance event does not repeat with that consistency. The archivist notes the same anomaly in the margin of the most recent quarterly summary but has not filed a formal report. "I was waiting for the Concord's review to close before I sent anything."`;
        addJournal('Archivist noticed spike pattern, margin note only — formal report held pending Concord review', 'intelligence', `glass-archive-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Formula notes in an unrecognized hand inside a returned text. Lenna hasn't decided yet.",
    tags: ['Stage2', 'NPC'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'navigating Lenna Bannerhold compound formula discovery');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.lenna_formula_notes = true;
        G.investigationProgress++;
        G.stageProgress[2]++;
        G.lastResult = `Lenna takes the research text from the lower shelf and sets it on the desk. The pages are tucked inside the back cover — four sheets, dense notation, compound ratios in a hand that uses different shorthand conventions from any commune researcher she knows. She reads the margin abbreviations aloud: "CRS" — compound residue suspension. "TW-exp" — tidal window exposure. "Vol-E" — volume exposure target. She sets the sheets on the desk between you and does not pick them up again. "I was going to report them this morning. Then I looked up what CRS stands for."`;
        addJournal('Lenna found compound formula notes in returned text — CRS, tidal window, population exposure targets documented', 'evidence', `glass-lenna-formula-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Lenna's hand goes to the desk drawer when the subject comes up. She opens it, looks at what's inside, and closes it. "Anything found in returned archive materials is the property of the commune's research office. There's a process for reporting anomalous inclusions." She recites it from memory — the protocol form number, the routing path, the review timeline. She has already decided on the procedural route, and she's telling you so. The notes are going to the Concord.`;
        addJournal('Lenna routing formula notes through Concord process — procedural path chosen before conversation', 'complication', `glass-lenna-formula-fail-${G.dayCount}`);
      } else {
        G.flags.lenna_formula_notes = true;
        G.investigationProgress++;
        G.lastResult = `Lenna shows one page — the first sheet, the one without the most identifiable notation. Compound ratios, four ingredients, two unknown by commune labeling convention. The handwriting is precise, the spacing consistent with someone accustomed to formal documentation. "It was in the back of a text returned by a visiting researcher from Mimolot. I checked the return log." She photographs the page entry in the archive log. "I know I have to report this. I wanted someone else to see it first."`;
        addJournal('One formula page shown — Mimolot visitor return log confirmed, Lenna will report but wanted witness', 'intelligence', `glass-lenna-formula-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "A Mimolot researcher arrived and left abruptly. Four words in the visitor log.",
    tags: ['Stage2', 'Stealth'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'tracing Mimolot visitor departure at glasswake commune');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('finesse', (G.skills.stealth||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.mimolot_visitor_traced = true;
        G.investigationProgress++;
        G.lastResult = `The visitor log is in the intake desk's lower tray, access open. The entry for the Mimolot researcher — "Verath Dunnell, Mimolot Academy, glyph properties study" — takes four words to describe the stated research purpose. The departure note is blank where a completion summary should be. But the equipment request log from the same two-week window shows something: three requests for containment-grade sample jars, normally used for hazardous material extraction. Dunnell's name is on two of them. The third is blank in the requestor column.`;
        addJournal('Mimolot visitor Verath Dunnell requested containment-grade sample jars — departure summary blank, third request unattributed', 'evidence', `glass-mimolot-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `The intake desk is occupied by a commune administrator who watches the visitor log being handled without looking up from his own work. He lets it go for thirty seconds, then: "Visitor records are available by written request through the commune research office. Walk-in access isn't logged, which means it isn't authorized." His tone is even. He places his hand on the log and pulls it back to his side of the desk. The brief look at the open page showed four words next to one entry and nothing more.`;
        addJournal('Visitor log retrieved by administrator before full review — access method flagged', 'complication', `glass-mimolot-fail-${G.dayCount}`);
      } else {
        G.flags.mimolot_visitor_traced = true;
        G.investigationProgress++;
        G.lastResult = `"Verath Dunnell, Mimolot Academy, glyph properties study." Departure date, no completion note. The visitor log sits on the intake desk, the pages stiffened slightly from the estuary damp that works into everything at this end of the building. The commune's equipment request records are stored separately and accessible to researchers — Dunnell's name appears twice: containment-grade sample jar requests, both approved, both returned on the departure date. The samples those jars held are not logged anywhere in the commune's records.`;
        addJournal('Dunnell requested containment-grade sample jars, returned equipment on departure — sample destination unrecorded', 'intelligence', `glass-mimolot-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The deviation notes are in a second book at the pylon base.",
    tags: ['Stage2', 'NPC'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'accessing Pita Sormund off-record pylon route deviation log');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.pita_deviation_log = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Sormund retrieves the second book from a gap behind the pylon base's mounting bracket — a narrow ledger, unlined, entries written in pencil so they can be erased. She does not erase them. Three entries mark nights when the pylon sensor sweep ran outside its posted cycle window. Each entry includes her exact position at the time and what the sweep caught. Two of the three correspond precisely to the dates where her field readings exceeded the official log by forty percent. She turns the book toward you without saying anything about what it means.`;
        addJournal('Sormund off-record deviation log: three anomalous sweep cycles match the 40%-overspike dates', 'evidence', `glass-pita2-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Sormund's expression stays fixed when the second book comes up. She does not look toward the pylon base. "My personal working notes are personal." She is not defensive — she is applying the same procedural logic she applies to everything. Off-record means off-record, for everyone, regardless of purpose. She finishes the sweep log entry with the same pen, same pressure, same time she does every day, and walks the next section of the formation perimeter without pausing.`;
        addJournal('Sormund declined off-record log access — personal notes not subject to inquiry', 'complication', `glass-pita2-fail-${G.dayCount}`);
      } else {
        G.flags.pita_deviation_log = true;
        G.investigationProgress++;
        G.lastResult = `Sormund acknowledges the second book exists but does not produce it. "There are dates where the sweep ran outside cycle. I noted them." She confirms two of those dates match the field reading discrepancies she described. "I log what I observe. What it means is not my job." She will share the dates verbally: they fall six and twelve weeks before the disposal schedule changed.`;
        addJournal('Sormund confirms anomalous sweep dates verbally — precede disposal schedule change by 6 and 12 weeks', 'intelligence', `glass-pita2-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The board restricted glyph research eight months ago. The record names who proposed it.",
    tags: ['Stage2', 'Lore'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'tracing glasswake commune governance restriction vote record');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.governance_vote_traced = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The vote record is in the commune's open governance index: eight months ago, a three-to-two majority restricted glyph research scope to formation monitoring only, excluding compound interaction studies. The motion was proposed by Board Member Orend Cavel — the only board member whose commune residency began in the same month the NGOC suppression request was filed. The restriction predates the suppression order by two months. The operational architecture was built into commune governance before the external suppression mechanism was even needed.`;
        addJournal('Governance restriction proposed by Orend Cavel — commune residency began same month as NGOC filing, restriction precedes suppression', 'evidence', `glass-governance-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The governance index is open access — the record is there. But the proposer's entry is listed as "Board Member O. Cavel (proxy for Containment Research Concord liaison)." The proxy designation routes the authorship upstream to a liaison role that rotates quarterly. Finding which individual held the liaison seat eight months ago requires a separate access request to the Concord's roster archive, which routes to a department that has not answered correspondence in six months.`;
        addJournal('Restriction motion filed under Concord liaison proxy — original proposer obscured by rotating seat', 'complication', `glass-governance-fail-${G.dayCount}`);
      } else {
        G.flags.governance_vote_traced = true;
        G.investigationProgress++;
        G.lastResult = `The motion proposer is named: Orend Cavel. Three votes to two in favor. The minority dissent is recorded in a single line: "Scope restriction conflicts with commune founding charter research mandate." The dissenting board members are not named. Cavel's own governance profile shows a residency start date of eight months ago. The restriction was one of the first motions he filed.`;
        addJournal('Orend Cavel proposed scope restriction within weeks of joining board — dissent recorded, minority unnamed', 'intelligence', `glass-governance-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The third-watch disposal partner keeps a private tally. It doesn't agree with the run sheets.",
    tags: ['Stage2', 'NPC'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'cross-referencing Fen Ashmark disposal partner private shard tally');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.disposal_tally_found = true;
        G.investigationProgress++;
        G.lastResult = `The disposal partner — Maret Sunnol, who keeps a tally in chalk on the inside of her locker door, erased and re-marked after every run — produces the locker door count without prompting once Fen vouches for the conversation. Her count for sixteen third-watch runs is higher than the run sheets by a consistent margin: between four and seven shards per run, always undercounted on the official sheet. Over sixteen runs the underage totals to a significant quantity. "I thought it was a rounding practice. Then I thought it wasn't."`;
        addJournal('Maret Sunnol tally: 4-7 shards per run systematically undercounted on official run sheets — 16 runs confirmed', 'evidence', `glass-maret-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Maret Sunnol is in the middle of a shift handoff when the conversation starts. She listens to the first sentence and shakes her head before the second. "I'm not talking about disposal counts with someone I don't know while my shift hasn't logged off yet." She marks the handoff in the run sheet and leaves the room. The locker behind her is closed and padlocked, the combination turned.`;
        addJournal('Disposal partner declined before shift log-off — locker closed, access denied', 'complication', `glass-maret-fail-${G.dayCount}`);
      } else {
        G.flags.disposal_tally_found = true;
        G.investigationProgress++;
        G.lastResult = `Maret Sunnol is guarded but doesn't deny the tally. "I count because the run sheets have been wrong before." She will not open the locker. She confirms the direction of the discrepancy: her count runs higher than what the official sheet records. "Every time. Not by much. But always the same direction." She says it matter-of-factly, as if describing weather.`;
        addJournal('Sunnol confirms count always higher than run sheet — systematic underage, direction consistent', 'intelligence', `glass-maret-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The pylon circuit board is exposed. The timing config isn't from the commune's spec.",
    tags: ['Stage2', 'Craft'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'reading glyph pylon timing configuration during maintenance cycle');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('spirit', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.pylon_config_read = true;
        G.investigationProgress++;
        G.lastResult = `The maintenance access panel is propped open and the technician is three pylons down the line. The circuit board base plate carries an etched configuration marker — a four-character designation that does not appear in the commune's posted technical specification binder. Cross-referencing the character format against known glyph fabrication standards: it matches a production designation used by a Shelkopolis civic infrastructure foundry. This pylon was not built to the commune's spec. It was supplied from outside, configured to a different timing standard before it arrived.`;
        addJournal('Pylon timing config matches Shelkopolis civic foundry mark — externally supplied, not built to commune spec', 'evidence', `glass-pylon-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `The maintenance technician returns from the adjacent pylon before the circuit board is fully visible. She does not stop moving but she logs the panel access in her handheld record sheet while still walking. "Maintenance access during active cycle requires a signed observer protocol." Her pen doesn't pause on the entry. The panel is closed and relocked in under a minute. Her report will note an unauthorized proximity event.`;
        addJournal('Pylon access during active cycle — unauthorized proximity logged by technician', 'complication', `glass-pylon-fail-${G.dayCount}`);
      } else {
        G.flags.pylon_config_read = true;
        G.investigationProgress++;
        G.lastResult = `The base plate marker is visible for long enough: four characters, unfamiliar designation format, not matching the commune's own technical spec binder entry. The commune's spec uses a two-character system. This plate uses four, with a prefix character that matches a standard used in civic infrastructure work. Someone with civic infrastructure access sourced this pylon and had it installed before the commune's own procurement process would have applied.`;
        addJournal('Pylon base plate uses 4-char civic infrastructure format — sourced outside commune procurement process', 'intelligence', `glass-pylon-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "A shard fragment in the lab carries residue that doesn't match the formation's mineral signature.",
    tags: ['Stage2', 'Survival'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'examining shard fragment residue in glasswake containment lab');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('vigor', (G.skills.survival||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.shard_residue_examined = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The fragment sits in an open tray marked for routine quarterly inventory. The surface residue is pale, fine-grained, with a faint acrid note that does not belong to glasswake mineral chemistry — the formation's standard signature is cold and faintly saline. This residue is chemical in origin. A fingertip contact test, held away from skin, shows a slight warmth that the formation's own shards do not produce. Something was applied to this shard after extraction. The compound residue matches the dosing profile from Lenna's formula notes.`;
        addJournal('Shard fragment carries external compound residue — applied post-extraction, matches formula notation dosing profile', 'evidence', `glass-residue-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `The containment lab requires a logged entry before any fragment handling — the sign-in sheet is at the door. The fragment tray is visible from the doorway but not reachable without signing in. The log goes to the Containment Research Concord daily. An unlogged entry to the handling area triggers an immediate warden sweep of the room. The alarm light above the door goes amber before a second step inside. Sormund is there in under three minutes.`;
        addJournal('Containment lab entry triggered amber alarm — Sormund responded, log entry required for any access', 'complication', `glass-residue-fail-${G.dayCount}`);
      } else {
        G.flags.shard_residue_examined = true;
        G.investigationProgress++;
        G.lastResult = `The residue is visible without handling the fragment. Pale, fine-grained, not the formation's saline profile — the color is slightly different at the shard tip compared to the base. The lab's posted mineral reference chart lists the formation's signature clearly. This residue does not match it. The tray label shows no notation for compound treatment. Either someone treated this shard without logging it, or the tray sample is mislabeled.`;
        addJournal('Shard residue does not match posted formation mineral signature — compound treatment unlogged or mislabeled', 'intelligence', `glass-residue-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Six months ago a delivery bypassed the standard weighing station. No record of why.",
    tags: ['Stage2', 'Lore'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'tracing off-scale supply intake manifest at glasswake commune');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.intake_manifest_traced = true;
        G.investigationProgress++;
        G.lastResult = `The intake manifests from six months ago are in the supply office's open filing shelf — quarterly bundles, tied with cord. The delivery in question is dated four days before the disposal schedule changed. The manifest entry uses a pre-printed form type that the commune stopped using two years ago. The delivery authorization signature is a name that does not appear on any current commune staff roster. The weighing station log from the same date shows no entry for the delivery time window. It arrived, was logged, and was never weighed. The form it used had been discontinued.`;
        addJournal('Pre-change delivery on obsolete form, unauthorized signature, not logged at weigh station — arrived 4 days before disposal schedule changed', 'evidence', `glass-manifest-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The supply office filing shelf is organized by quarter, then by date. The six-month-old bundle is not where it should be — the cord-tied packet for that quarter ends three weeks before the date of interest, and the next bundle starts two weeks after it. The gap is not labeled. The supply office clerk checks the index twice and shrugs. "Sometimes bundles get pulled for audit review. They come back when the audit closes." There is no audit flag in the index.`;
        addJournal('Six-month manifests missing — unlabeled gap in filing, no audit flag recorded', 'complication', `glass-manifest-fail-${G.dayCount}`);
      } else {
        G.flags.intake_manifest_traced = true;
        G.investigationProgress++;
        G.lastResult = `The delivery manifest entry is on an old form type — pre-printed, two-column, no longer in standard use. The authorization name is unfamiliar. The commune supply clerk checks the staff roster on the desk and confirms: "That name's not on the current list. Could be a temp authorization from a visiting contractor." The weighing station log shows no corresponding entry. Either the station was bypassed or the delivery was logged retroactively from somewhere else.`;
        addJournal('Old-form delivery with unrecognized authorization — not found in current staff roster, absent from weigh log', 'intelligence', `glass-manifest-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Orend Cavel keeps office hours in the north wing. His meeting calendar is posted outside.",
    tags: ['Stage2', 'Stealth'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'observing Orend Cavel office meeting calendar and correspondence patterns');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('finesse', (G.skills.stealth||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.cavel_office_observed = true;
        G.investigationProgress++;
        G.lastResult = `The calendar outside Cavel's door lists appointments by function rather than name — "Concord liaison review," "compliance advisory," "logistics coordination." The pattern across six weeks: liaison review appointments always fall two days before a third-watch disposal run. A courier envelope on the intake shelf beside the door carries a wax seal that matches the color and device of the NGOC transit receipt Lenna identified. Cavel is not hiding his connection to the suppression authority. He simply does not expect anyone to know what they are looking at.`;
        addJournal("Cavel calendar: liaison reviews precede disposal runs by 2 days — courier envelope matches NGOC seal device", 'evidence', `glass-cavel-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `Cavel's office door opens while the calendar is still being read. He does not react to the presence — he says "the calendar is public" in a tone that means he knows exactly how long you have been standing there and is not concerned by it. He holds the door for a beat, then closes it. The calendar is still visible. The meeting entries have been turned to face the wall. He reversed the board mount from inside without making it audible from the corridor.`;
        addJournal('Cavel observed the observation — calendar reversed from inside, no confrontation', 'complication', `glass-cavel-fail-${G.dayCount}`);
      } else {
        G.flags.cavel_office_observed = true;
        G.investigationProgress++;
        G.lastResult = `The calendar entries give function, not name. "Concord liaison review" appears on six dates over the last two months, all mid-week. The courier intake shelf beside the door holds one sealed envelope — the wax is a dark burgundy, a device that looks official rather than personal. The correlation between liaison review dates and known disposal run dates is not visible from here without Fen Ashmark's schedule data. But the seal's color matches what Lenna described from the suppression order's courier packet.`;
        addJournal('Cavel calendar shows Concord liaison reviews mid-week — envelope seal matches suppression courier color', 'intelligence', `glass-cavel-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Trench soil residue readable at the surface. The gradient points toward the source.",
    tags: ['Stage2', 'Survival'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'reading compound residue gradient in glasswake disposal trench soil');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('vigor', (G.skills.survival||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.residue_gradient_traced = true;
        G.investigationProgress++;
        G.lastResult = `The trench soil at the formation perimeter carries a faint residue at the surface — pale, acrid, the same chemical profile as the shard fragment in the containment lab. Working the gradient along the trench edge: the concentration increases toward the north quadrant, where the disposal run exit path meets the formation perimeter. The compound is being introduced at the point of disposal, not earlier in the chain. The shards are being treated at the trench boundary before they leave the formation perimeter. That is why the weight logs matter — the treatment adds mass that the undercounted run sheets absorb.`;
        addJournal('Residue gradient peaks at north trench — compound applied at formation perimeter during disposal, explains systematic underage in run sheets', 'evidence', `glass-gradient-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The trench soil at this section has been turned recently — the surface layer is loose and the residue, whatever it was, has dispersed into the disturbed soil. Someone worked this section with a mixing tool after the most recent disposal run. The turned area runs exactly the length of a single-run disposal path. The next section of trench, unworked, shows nothing at the surface. The evidence window here has closed since the last run.`;
        addJournal('Trench soil turned after disposal run — residue dispersed, evidence window closed at this section', 'complication', `glass-gradient-fail-${G.dayCount}`);
      } else {
        G.flags.residue_gradient_traced = true;
        G.investigationProgress++;
        G.lastResult = `The gradient is readable: pale residue higher at the north end of the trench than the south. The direction points toward the disposal run exit path. The concentration at the north is enough to identify as the same chemical profile as the lab fragment — same acrid note, same pale grain. Something is introduced at the north trench end. Whether that happens during or after the run, this section of soil cannot say.`;
        addJournal('Residue gradient traces toward north disposal exit — same profile as lab fragment, introduction point identified', 'intelligence', `glass-gradient-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The full mechanism is confirmed. Publish openly or submit to institutional authority.",
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

      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/2));
      if (result.total >= 14 || result.isCrit) {
        G.flags.stage2_finale_institutional = true;
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 3;
        G.lastResult = `The research package reaches the Mimolot Academy Regent Council under Quenra Quillfire's authority — hand-delivered to the Council secretary's intake desk, signed and logged. The Council convenes a formal academic review within two days. The Northern Glyph Oversight Commission suppression order is declared procedurally void under Academy academic freedom doctrine: the body that issued it has no standing in the Academy's jurisdiction. Stage III begins with institutional backing already in place.`;
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


  // ── NEW CHOICES: contamination data suppression (4) ──────────────────────────

  {
    label: "Two monitoring stations read the same formation. Their numbers have never matched.",
    tags: ['Research', 'Stage2'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'comparing dual-station contamination monitoring discrepancy at glasswake');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.dual_station_discrepancy = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Station A is the newer installation — its anchor posts are still pale where they were set in the frozen ground. Station B predates it by three years. The logged readings from A run consistently below B by eleven to fourteen percent, and A is positioned closer to the formation center. A nearer station should read higher, not lower. The calibration records for A are missing from the posted binder: someone removed the sheets and did not note the removal date.';
        addJournal('Station A reads lower than Station B despite being closer — calibration records removed, no date logged', 'evidence', 'gla-stations-' + G.dayCount);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'The monitoring post technician is running a calibration cycle on both stations simultaneously. She does not look up. The logbooks are in active use and unavailable for review during cycle. She marks the end time in the binder — both stations return identical readings at cycle close, a precision that does not appear anywhere else in the historical log. The calibration overwrite interval is set to four hours. By the time the next reading posts, this window is gone.';
        addJournal('Calibration cycle active — both stations forced to identical reading at cycle close, overwrite interval four hours', 'complication', 'gla-stations-fail-' + G.dayCount);
      } else {
        G.flags.dual_station_discrepancy = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Station A logs are available at the environmental post. The numbers are lower than Station B at every corresponding date. Cold morning light off the shard field refracts through the post window and runs pale lines across the logbook pages. The discrepancy is consistent: not a single spike or error, but a steady eleven-percent gap. A methodical undercount produces exactly this pattern. The calibration binder for Station A has a gap where the installation sheets should be.';
        addJournal('Station A systematically eleven percent below Station B — calibration installation sheets missing from binder', 'intelligence', 'gla-stations-partial-' + G.dayCount);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The contamination boundary shrank six months ago. The shards didn't.",
    tags: ['Research', 'Stage2'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'cross-referencing contamination boundary reduction against shard field extent');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.boundary_reduction_noted = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The boundary reduction order is in the public governance record: six months ago, fourteen meters reduced on the northwest quadrant. The justification listed: "reduced contamination pressure confirmed by Station A quarterly assessment." Station A is the newer installation with the missing calibration sheets. The formation itself has not changed — the shard density maps from the previous quarter show the same northwest cluster extent. The boundary reduction was authorized by data from a station whose calibration record does not exist.';
        addJournal('Boundary reduction authorized on Station A data — calibration record absent, formation extent unchanged, northwest cluster unaffected', 'evidence', 'gla-boundary-' + G.dayCount);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = 'The boundary reduction order is in the public record but the supporting assessment is filed as a restricted annex — available only to Containment Research Concord reviewers. Requesting it through the commune research office triggers an automatic notification to the Concord liaison. Lenna files the notification before the request is complete. She does it quietly, pen not pausing, the way she handles any mandatory process. The request goes into the log and stays there.';
        addJournal('Boundary reduction supporting assessment restricted — access request auto-notified Concord liaison', 'complication', 'gla-boundary-fail-' + G.dayCount);
      } else {
        G.flags.boundary_reduction_noted = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The reduction is documented: northwest quadrant, fourteen meters. The stated reason references a Station A quarterly assessment. The actual shard density map from the same period — available in the open monitoring files — shows the northwest cluster unchanged. The morning glare off the formation makes the marker stakes visible from the commune perimeter. The new boundary line runs inside the old one. The shards behind it are the same shards.';
        addJournal('Boundary reduction documented — supporting Station A assessment references formation data contradicted by unchanged density maps', 'intelligence', 'gla-boundary-partial-' + G.dayCount);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Toman's original suppression request listed a secondary reviewer. That name is blank now.",
    tags: ['Research', 'Stage2'],
    xpReward: 75,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(75, 'tracing secondary reviewer erasure on Toman Iceveil suppression request');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.secondary_reviewer_erased = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The original suppression request is on file in the archive\'s restricted correspondence drawer — Lenna can access it for structural review without opening the classified sections. The secondary reviewer field carries the ghost of a name beneath a chemical erasure: the paper is slightly raised where the original ink sat before the solvent was applied. The erasure post-dates the filing stamp by at least two weeks. Whoever removed the name had access to the original document after it was filed and processed. That requires Concord-level archive access.';
        addJournal('Secondary reviewer field chemically erased post-filing — Concord-level archive access required, name recoverable under raking light', 'evidence', 'gla-reviewer-' + G.dayCount);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'The restricted correspondence drawer is locked when the archive opens. Lenna checks the access log: the drawer was opened four days ago by a Concord liaison representative whose name appears in the log as "authorized designate" — no personal name, no credential number. The access window was twelve minutes. Whatever was in the drawer before that visit may or may not still be in the same condition.';
        addJournal('Restricted drawer accessed four days ago by unnamed Concord designate — twelve-minute window, contents condition unknown', 'complication', 'gla-reviewer-fail-' + G.dayCount);
      } else {
        G.flags.secondary_reviewer_erased = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Lenna pulls the suppression request cover page — the part she can access without opening classified content. The secondary reviewer line is blank. It should not be: Concord suppression procedure requires two reviewers minimum. She checks the procedural manual on the shelf behind her desk without being asked. "Single-reviewer suppression isn\'t valid under current protocol." She closes the manual. "It was filed anyway."';
        addJournal('Suppression request filed with single reviewer — secondary reviewer line blank, Concord protocol requires two', 'intelligence', 'gla-reviewer-partial-' + G.dayCount);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The quarterly contamination report omits the northwest cluster entirely.",
    tags: ['Research', 'Stage2'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'auditing quarterly contamination report for northwest cluster omission');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.quarterly_report_gap = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The quarterly report is public — posted on the commune notice board in a weather-resistant sleeve, the paper slightly yellowed at the edges from cold air off the shard field. Four sections: east cluster, south cluster, central zone, perimeter readings. The northwest cluster does not appear. It is not abbreviated, not combined with another section, not noted as under review. It is simply absent from a report that covers every other part of the formation. The report is signed by the Containment Research Concord liaison — Orend Cavel\'s countersignature is the second one on the page.';
        addJournal('Quarterly contamination report omits northwest cluster — four of five zones covered, Cavel countersigned the report', 'evidence', 'gla-quarterly-' + G.dayCount);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'The most recent quarterly report is no longer in the notice board sleeve. The sleeve is still posted, the weather-resistant cover intact, but the interior is empty. A maintenance worker replacing the sleeve cord nearby does not know when the report was removed. "They update them when a new quarter closes." The previous quarter\'s report is not in the archive\'s open files — it was pulled for the Concord\'s annual review, which has no listed end date.';
        addJournal('Quarterly report removed from notice board — previous quarter pulled for undated annual review, no replacement posted', 'complication', 'gla-quarterly-fail-' + G.dayCount);
      } else {
        G.flags.quarterly_report_gap = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'East, south, central, perimeter. The report covers all of those. The northwest cluster is not listed. The cold refractive glare off the shard formation is strongest in the northwest quadrant at this hour — the light hits at an angle that makes the crystalline tips glow faintly against the grey estuary sky. It is visible from the commune gate. It is not in the report. No annotation explains the omission.';
        addJournal('Northwest cluster absent from quarterly report — all other zones present, no annotation or explanation', 'intelligence', 'gla-quarterly-partial-' + G.dayCount);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // ── NEW CHOICES: NPC encounters — Toman and Lenna (5) ────────────────────────

  {
    label: "Toman keeps his most recent fieldwork separate. He calls the folder 'personal notes'.",
    tags: ['NPC', 'Stage2'],
    xpReward: 74,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'gaining access to Toman Iceveil personal fieldwork folder');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.toman_personal_notes = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Toman takes the folder from the shelf above his instrument rack without naming it. His thumb traces the edge of the cover — a habit, not a hesitation. Inside: handwritten field observations from the northwest cluster, dated across the last three months. He has been measuring the formation\'s glyph pressure inflow at the perimeter every clear-sky morning. The measurements are not in any submitted record. "I stopped submitting fieldwork when I understood what happens to the reports." He sets the folder open on the table. "These are yours to read."';
        addJournal('Toman Iceveil personal fieldwork: three months of northwest cluster inflow measurements, none submitted — handed over directly', 'evidence', 'gla-toman-notes-' + G.dayCount);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'Toman is courteous. He describes the folder as personal working material, not research output, and therefore not available for external review under any current protocol. The observation gallery is cold in the morning, the estuary-side window admitting a line of pale light across the instrument rack. He does not move toward the shelf. "I keep personal notes because I find them useful. They are not findings." He says it the way someone states a position they have rehearsed against a specific challenge.';
        addJournal('Toman declined access to personal folder — distinguished it from research output, no protocol available to compel access', 'complication', 'gla-toman-notes-fail-' + G.dayCount);
      } else {
        G.flags.toman_personal_notes = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Toman allows a partial look — three pages from the northwest cluster observation series, his handwriting close and measured. The glyph inflow readings he logged are higher than anything in the submitted record for the same period. He watches while the pages are reviewed. "The formation is drawing more pressure than it was six months ago. The quarterly report does not show this." He takes the pages back and returns them to the shelf. "Now you know why I keep the folder."';
        addJournal('Toman personal notes partial review: northwest cluster inflow rising — discrepancy with submitted quarterly record confirmed', 'intelligence', 'gla-toman-notes-partial-' + G.dayCount);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Lenna pulled the submission logs herself before I arrived. She was already counting.",
    tags: ['NPC', 'Stage2'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'learning what Lenna Bannerhold already found in the submission logs');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.lenna_pre_audit = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The submission log is open on Lenna\'s desk, a handwritten tally in the margin she made before anyone asked. Seventeen submissions across the last six months. Four marked "held for review." All four from the same researcher — not Toman — all referencing the northwest cluster. She has circled the reviewer column on each: blank on all four. "I counted them last week. I did not know what to do with the count." She pushes the log across the desk. "Now I think I do."';
        addJournal('Lenna pre-audit: four northwest cluster submissions held, same external researcher, no reviewer assigned — she counted before being asked', 'evidence', 'gla-lenna-preaudit-' + G.dayCount);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'Lenna sets her pen down precisely at the log\'s spine crease. "If you are asking me what I\'ve noticed, I\'m going to tell you that\'s a question I\'d need to answer in front of a Concord representative to protect both of us." She is not deflecting — she is describing the actual procedural constraint clearly. She marks the current entry in the log, date and time, and moves the log to the closed shelf without saying what\'s in it.';
        addJournal('Lenna declined outside procedural process — described Concord representation as required protection for both parties', 'complication', 'gla-lenna-preaudit-fail-' + G.dayCount);
      } else {
        G.flags.lenna_pre_audit = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Lenna shows the margin tally without commentary: four held submissions, northwest cluster, six months. She covers the researcher name with her thumb — not obstructing, just keeping the conversation on what she can confirm without it. "Four held with no reviewer. That\'s irregular. The log should show a reviewer name within ten days of submission." She looks at the log, not at the room. "They\'ve been sitting for between three and five months each."';
        addJournal('Lenna confirms four held northwest cluster submissions, no reviewer within protocol window — held three to five months each', 'intelligence', 'gla-lenna-preaudit-partial-' + G.dayCount);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Toman filed a formal complaint once. He won't say what happened to it.",
    tags: ['NPC', 'Stage2'],
    xpReward: 78,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(78, 'getting Toman Iceveil to speak about his filed formal complaint');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.toman_complaint_filed = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Toman speaks without prompting once trust is established — as if he has been waiting for someone to ask the right question in the right register. He filed the complaint fourteen weeks ago. Three days later his fieldwork access permit was suspended for a procedural error in his renewal application — an error he cannot locate in the original forms. The access suspension lasted eleven days. When it lifted, the complaint entry in the Concord\'s correspondence register showed a routing status of "referred for internal review." It has not changed since. "I understood the message. I stopped filing."';
        addJournal('Toman complaint filed 14 weeks ago — access suspended 3 days later on phantom procedural error, complaint still in internal review', 'evidence', 'gla-toman-complaint-' + G.dayCount);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'Toman\'s posture does not shift. He considers the question the way he considers a measurement he does not trust. "There is a formal correspondence record. The Concord\'s process is public." He does not answer the question. He describes where the answer could theoretically be found and then returns to the parchment on the gallery table. His hands are flat and still on the surface.';
        addJournal('Toman declined to speak about complaint — redirected to formal correspondence record, no further information given', 'complication', 'gla-toman-complaint-fail-' + G.dayCount);
      } else {
        G.flags.toman_complaint_filed = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Toman confirms the complaint exists without describing it. "Fourteen weeks ago. It is in the Concord\'s correspondence register." He pauses. The observation gallery holds the cold smell of stone and the faint acrid trace from the shard field that works into every room on the north side of the building. "My fieldwork access was suspended the week after I filed." He does not say what he concludes from that. He doesn\'t need to.';
        addJournal('Toman confirms complaint, 14 weeks — fieldwork access suspended the week after filing, no stated conclusion', 'intelligence', 'gla-toman-complaint-partial-' + G.dayCount);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Lenna's been marking the suppression files with a private notation system.",
    tags: ['NPC', 'Stage2'],
    xpReward: 74,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'decoding Lenna Bannerhold private notation system in suppression files');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.lenna_notation_decoded = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The notation appears in the corner of each suppression file cover — a small pencil mark, one to three characters, the same hand throughout. Lenna does not explain it until asked directly. A single dot: filed under valid protocol. Two dots: filed under valid protocol with an anomaly she recorded elsewhere. A horizontal dash: no valid protocol basis, filed anyway. The suppression orders related to Toman\'s northwest cluster research carry dashes. There are seven dashes in the archive. All seven cluster around the same six-month period.';
        addJournal('Lenna private notation: dash = no valid protocol basis — seven dashes in archive, all northwest cluster suppression orders in same 6-month window', 'evidence', 'gla-lenna-notation-' + G.dayCount);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'Lenna notices the attention on the file margins while closing the archive drawer. She does not comment on what the marks mean. She straightens the files and sets the drawer lock without meeting the question directly. "Clerks develop working habits. They\'re not part of the official record." Her tone carries neither confirmation nor denial — the flat register of someone who has decided to give nothing more than the minimum.';
        addJournal('Lenna deflected notation inquiry — described marks as personal working habit, not part of the official record', 'complication', 'gla-lenna-notation-fail-' + G.dayCount);
      } else {
        G.flags.lenna_notation_decoded = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Lenna explains the notation system without elaborating on what she\'s found using it. One mark for clean filings, two marks for filings with anomalies, a dash for filings without protocol basis. She does not say which files carry which marks. She does say: "I started using it six months ago. Before that the distinctions didn\'t seem necessary." The archive room is cold, the damp paper smell working up from the lower shelves.';
        addJournal('Lenna confirms three-tier notation system begun six months ago — specific file marks not disclosed', 'intelligence', 'gla-lenna-notation-partial-' + G.dayCount);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Toman and Lenna met once before I arrived. The outcome is written on both of them.",
    tags: ['NPC', 'Stage2'],
    xpReward: 76,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(76, 'reading Toman Iceveil and Lenna Bannerhold prior meeting dynamic');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.toman_lenna_prior_meeting = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Lenna confirms the meeting when asked directly: eight weeks ago, Toman brought a formatted submission to her desk requesting access to the restricted correspondence drawer. She walked him through the access protocol. He filled every form correctly. The access was denied by automated routing before it reached a human reviewer. He thanked her and left without asking why. She has thought about that — his lack of surprise — every time she pulls the drawer since. "He already knew the answer. He was making a record."';
        addJournal('Toman submitted formal access request through Lenna 8 weeks ago — denied by automated routing, no human reviewer, Toman unsurprised', 'evidence', 'gla-prior-meeting-' + G.dayCount);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'Neither Toman nor Lenna acknowledges the meeting when the subject comes up in separate conversations. Not denial — absence. The question produces a brief pause and then a movement to adjacent topics, the way someone moves around furniture they have learned not to bump in a dark room. Whatever the meeting produced, it also produced a shared understanding that discussing it is not safe.';
        addJournal('Both Toman and Lenna non-responsive to prior meeting question — shared avoidance pattern, no denial given', 'complication', 'gla-prior-meeting-fail-' + G.dayCount);
      } else {
        G.flags.toman_lenna_prior_meeting = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Toman acknowledges the meeting without specifics: he approached Lenna with a formal request eight weeks ago. He describes her response as procedurally correct. He does not describe the request or its outcome. The cold morning air from the shard field has worked its way into the observation gallery — the window frames carry a faint white mineral deposit at their edges from repeated condensation. "I learned what I needed to know about the routing system from that conversation."';
        addJournal('Toman confirms prior meeting with Lenna — formal request, procedurally correct response, routing system behavior confirmed', 'intelligence', 'gla-prior-meeting-partial-' + G.dayCount);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // ── NEW CHOICES: research suppression mechanism (2) ──────────────────────────

  {
    label: "The hold mechanism is automated. No person has to sign off on individual suppressions.",
    tags: ['Research', 'Stage2'],
    xpReward: 78,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(78, 'mapping automated suppression routing mechanism at glasswake commune');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.suppression_mechanism_mapped = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The submission routing protocol is documented in the commune\'s research administration handbook — available on the open reference shelf in Lenna\'s archive room. A submission tagged with any of seven designated subject codes is automatically held for secondary review. The subject codes include "northwest formation anomaly" — added to the list five months ago. The addition required only a Containment Research Concord directive, no commune vote. The NGOC suppression order established the subject code list. The automated hold is the mechanism the suppression order created, running without requiring any individual decision after the initial setup.';
        addJournal('Automated hold triggered by seven subject codes — northwest formation anomaly added 5 months ago via Concord directive, no commune vote required', 'evidence', 'gla-mechanism-' + G.dayCount);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'The research administration handbook is on the open reference shelf but the appendix section covering routing codes is missing — the page signatures are present but the leaves have been removed cleanly at the binding. Lenna notes the damage in the archive condition log, her handwriting marking the entry date and the nature of the defect. "This happened recently. The handbook was complete at last quarter\'s condition review." The missing appendix covers exactly the subject code list.';
        addJournal('Routing code appendix removed from handbook — clean cut at binding, Lenna logged condition defect, missing since last quarter review', 'complication', 'gla-mechanism-fail-' + G.dayCount);
      } else {
        G.flags.suppression_mechanism_mapped = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The routing protocol exists in the handbook: submissions matching designated subject codes go to secondary review automatically. Lenna pulls the current subject code list from the administrative drawer. Seven codes. She reads them aloud and stops at the fifth: "northwest formation anomaly." She sets the list down. "I process submissions. I do not see the subject code field unless I look for it." She has clearly looked for it.';
        addJournal('Subject code list confirmed — northwest formation anomaly code active, Lenna found it after reviewing routing anomalies', 'intelligence', 'gla-mechanism-partial-' + G.dayCount);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The secondary review queue has no assigned reviewers. Submissions go in and stop.",
    tags: ['Research', 'Stage2'],
    xpReward: 76,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(76, 'auditing the empty secondary review queue at glasswake commune research office');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.review_queue_empty = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The secondary review queue roster is a one-page document kept with the submission routing records. It names three reviewer positions — all listed as "pending appointment by the Containment Research Concord." None has been filled. The queue has been in this state since the routing protocol was established five months ago. Every submission that reaches secondary review enters a queue staffed by no one. The protocol does not have a timeout provision: a submission can wait indefinitely without violating any documented rule.';
        addJournal('Secondary review queue: three positions, all pending Concord appointment for five months — no timeout provision, held submissions wait indefinitely', 'evidence', 'gla-queue-' + G.dayCount);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'The review queue roster is filed with the restricted correspondence section — Lenna can confirm the queue exists but cannot show the roster without a Concord authorization. She describes it as "staffing records" and explains that staffing records for Concord-administered review bodies are not commune documents regardless of where they are physically filed. The restriction is correct under Concord jurisdiction rules. The information is present and inaccessible by design.';
        addJournal('Review queue roster classified as Concord staffing records — not commune-accessible, restriction jurisdictionally correct', 'complication', 'gla-queue-fail-' + G.dayCount);
      } else {
        G.flags.review_queue_empty = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Lenna confirms what she is able to say: the secondary review queue has reviewer positions designated by the Concord, and she does not process the queue — that is Concord administration. "I can tell you what goes in. I cannot tell you whether anything comes out." She sets her pen on the submission log. The cold window light from the estuary side catches the pale surface of the open page. "In five months, I have not seen a held submission receive a reviewer assignment."';
        addJournal('Lenna confirms: five months active queue, no reviewer assignment seen — Concord administers queue, she only processes intake', 'intelligence', 'gla-queue-partial-' + G.dayCount);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // ── NEW CHOICES: cross-locality thread (2) ────────────────────────────────────

  {
    label: "The same NGOC routing code appears on a suppression order filed at Cosmouth.",
    tags: ['Research', 'Stage2'],
    xpReward: 80,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(80, 'tracing NGOC routing code match between glasswake and cosmouth suppression orders');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.cross_locality_ngoc = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The Cosmouth suppression order arrived through guild correspondence routes — the Tidereach merchant council maintains a research notification board that logs external suppression filings affecting guild-adjacent institutions. The routing code on the Cosmouth order: Post Line 7, Northern Glyph Oversight Commission, Shelkopolis Civic Administration Bureau. Identical format to the Glasswake filing. The subject at Cosmouth: tidal glyph pressure mapping, specifically the estuary inflow patterns that connect to the glasswake formation region. Two localities, one routing code, one suppression body, one connected subject.';
        addJournal('NGOC Post Line 7 routing code on Cosmouth suppression — tidal glyph pressure mapping subject, connects to glasswake formation region', 'evidence', 'gla-cosmouth-' + G.dayCount);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = 'The Cosmouth notification board is the lead. But accessing the Tidereach merchant council\'s correspondence logs requires a guild member referral — and someone has already flagged the NGOC routing code as sensitive in the council\'s system. The referral request triggers a secondary review notice within hours. A courier arrives at the commune the following morning with a formal inquiry from the council asking for the purpose of the records request. The trail to Cosmouth drew attention before it could be traced.';
        addJournal('Cosmouth access triggered Tidereach council inquiry — NGOC routing code flagged as sensitive in council system', 'complication', 'gla-cosmouth-fail-' + G.dayCount);
      } else {
        G.flags.cross_locality_ngoc = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The Tidereach merchant council\'s research notification board is semi-public — guild members and registered researchers can read it. The Cosmouth entry is dated three weeks before the Glasswake filing: Post Line 7, NGOC, tidal glyph pressure mapping. The subject at Cosmouth and the subject at Glasswake are adjacent — the estuary inflow patterns the Cosmouth order suppressed are the same patterns Toman\'s correlation data depends on for its external signal argument. Suppressing both removes the evidence base from two directions at once.';
        addJournal('NGOC suppressed Cosmouth tidal inflow data 3 weeks before Glasswake filing — both subjects required to build Toman\'s external signal argument', 'intelligence', 'gla-cosmouth-partial-' + G.dayCount);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "A Shelkopolis civic register lists NGOC. The address is a postal relay node, not an office.",
    tags: ['Research', 'Stage2'],
    xpReward: 82,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(82, 'tracing Northern Glyph Oversight Commission address to Shelkopolis relay node');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.ngoc_address_traced = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The Shelkopolis civic administration directory is available at any research institution with a Shelkopolis affiliate charter — the commune qualifies. The NGOC entry appears under "regulatory oversight bodies, glyph and formation management." Address: Civic Administration Bureau, Post Line 7. That address corresponds to the Shelkopolis postal relay service used by government bodies that do not maintain a permanent physical office — a forwarding point for institutions with temporary or distributed operations. The NGOC has no listed permanent office. Its mail forwards to a private distribution routing address not named in the directory. The organization exists in the directory. Its actual location does not.';
        addJournal('NGOC in civic directory as Post Line 7 relay — no permanent office, forwarding address private and unlisted, Shelkopolis relay used by temporary government bodies', 'evidence', 'gla-ngoc-address-' + G.dayCount);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'The commune\'s Shelkopolis affiliate charter does not extend to directory access for regulatory oversight bodies — that tier requires a direct institutional Shelkopolis affiliation, not an associate charter. The archivist checks twice and shrugs. "You need a Class 2 affiliation. We have a Class 3." The information is one administrative tier out of reach, and the distinction exists in writing in the commune\'s own charter documentation.';
        addJournal('Directory access denied — commune holds Class 3 affiliate status, regulatory oversight tier requires Class 2', 'complication', 'gla-ngoc-address-fail-' + G.dayCount);
      } else {
        G.flags.ngoc_address_traced = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The directory lists the NGOC under regulatory oversight. Post Line 7. The commune\'s research administrator, who handles the Shelkopolis affiliate charter annually, knows Post Line 7 without looking it up: "That\'s the relay node for provisional and distributed bodies. Not a street address." He checks whether the NGOC has a secondary listing showing a permanent office. It does not. "They exist in the directory. They just don\'t exist anywhere you can go."';
        addJournal('NGOC listed at Post Line 7 relay — commune administrator confirms relay designation, no permanent office secondary listing', 'intelligence', 'gla-ngoc-address-partial-' + G.dayCount);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // ── END NEW CHOICES ───────────────────────────────────────────────────────────

  {
    label: 'The allocation records show water going somewhere not on the map',
    tags: ['Records', 'Evidence'],
    xpReward: 20,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(20, 'water allocation diversion');
      G.lastResult = 'The allocation ledger lists disbursement points by grid reference. All but one match a location on the commune\'s posted infrastructure map. The last entry — consistent, seasonal, a significant volume — references a grid point that does not correspond to any listed infrastructure, distribution point, or storage basin. It has been there for four seasons. The steward who pulls the ledger for you does not comment on it.';
      addJournal('Glasswake Commune water allocation records show regular disbursements to an unlisted grid reference — four seasons of entries, no infrastructure match. Source: Glasswake Commune allocation office.', 'evidence');
      G.recentOutcomeType = 'investigate';
      G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
      maybeStageAdvance();
    }
  },

  {
    label: 'The steward answers carefully. Her job requires outside relationships',
    tags: ['NPC', 'Intelligence'],
    xpReward: 15,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(15, 'steward NPC agenda');
      G.lastResult = 'She does not lie. She is precise about what she says and what she does not say. Every answer describes Glasswake\'s position relative to external bodies — what the commune owes, what it has agreed to, what the review schedule requires. She is protecting the relationships that keep the commune functioning. Anything that threatens those relationships does not get a direct answer. She confirms what is already documented. She does not add to it.';
      addJournal('The Glasswake Commune steward answered questions carefully — only confirming documented positions, deflecting anything that could affect external relationships. Source: Glasswake Commune steward office.', 'intelligence');
      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  {
    label: 'The allocation anomaly predates the current steward by two seasons',
    tags: ['Records', 'Intelligence'],
    xpReward: 15,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(15, 'pre-steward anomaly');
      G.lastResult = 'The current steward took her post six seasons ago. The unlisted allocation entry begins eight seasons ago. She did not create it. She inherited it. Which means she found it, evaluated it, and chose to leave it in place — or was told to. The entry is in the same handwriting as the surrounding entries for its first two seasons, then shifts to the current steward\'s notation style. She updated it. She knows exactly what it is.';
      addJournal('The Glasswake allocation anomaly predates the current steward by two seasons — she subsequently updated the notation style, confirming awareness. Source: Glasswake Commune allocation records, handwriting comparison.', 'intelligence');
      G.recentOutcomeType = 'investigate';
      G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
      maybeStageAdvance();
    }
  },

  {
    label: 'The commune knows about the upstream supply issue. They haven\'t reported it',
    tags: ['Discovery', 'Evidence'],
    xpReward: 25,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(25, 'unreported upstream discovery');
      G.lastResult = 'The upstream measurement posts report flow volume to the guild on a quarterly schedule. Glasswake keeps its own measurements daily — internal only, not submitted. The internal logs show volume consistently lower than the guild\'s posted upstream figures for the past three seasons. The commune is receiving less than the guild\'s records show. Either the guild\'s upstream measurements are wrong or the difference is going somewhere. No discrepancy report has been filed.';
      addJournal('Glasswake Commune internal water measurements show consistent shortfall versus guild upstream figures for three seasons — no discrepancy report filed. Source: Glasswake internal measurement logs.', 'evidence');
      G.recentOutcomeType = 'investigate';
      G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
      maybeStageAdvance();
    }
  },

];

window.GLASSWAKE_COMMUNE_STAGE2_ENRICHED_CHOICES = GLASSWAKE_COMMUNE_STAGE2_ENRICHED_CHOICES;
