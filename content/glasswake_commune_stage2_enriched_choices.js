/**
 * GLASSWAKE COMMUNE STAGE 2 ENRICHED CHOICES
 * Investigation arc: glasswake shard contamination data / glyph architecture research suppression
 * NPCs: Researcher Toman Iceveil (Contamination Research Lead), Lenna Bannerhold (Commune Research Clerk)
 */

const GLASSWAKE_COMMUNE_STAGE2_ENRICHED_CHOICES = [

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
    label: "The unpublished research and the suppression order together form a complete package. It needs a protected channel.",
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
      const result = rollD20('spirit', (G.skills.craft||0) + Math.floor(G.level/3));
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
        G.lastResult = `Toman shows one chart — the most recent clear-sky window. The resonance spike is narrow, precise, and two hours after solar peak. "I have two more that match." He won't produce them here, but he confirms the interval is consistent. "Forty-three days. Every time." He folds the chart and pockets it before anyone passes the doorway.`;
        addJournal('One confirmed spike — 43-day interval, Iceveil has two more matching charts', 'evidence', `glass-toman2-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The pylons go dark at low-observation hours. The glyph gradient is readable from the trench edge.",
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
    label: "The disposal schedule changed six months ago. New hours run when no assessor is on shift.",
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
    label: "Four years of glyph readings. The last six months don't resemble anything in the earlier record.",
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
    label: "Formula notes in an unrecognized hand inside a returned text. Lenna hasn't decided what to do.",
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
    label: "A Mimolot researcher arrived, then left abruptly two weeks later. Four words in the visitor log.",
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
        G.lastResult = `"Verath Dunnell, Mimolot Academy, glyph properties study." Departure date, no completion note. The commune's equipment request records are stored separately and accessible to researchers — Dunnell's name appears twice: containment-grade sample jar requests, both approved. The equipment was returned on the departure date. Where the samples went is not in the commune's records.`;
        addJournal('Dunnell requested containment-grade sample jars, returned equipment on departure — sample destination unrecorded', 'intelligence', `glass-mimolot-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The route deviation notes are in a second book at the pylon base, not the containment office.",
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
    label: "The board voted to restrict glyph research eight months ago. The record names who proposed it.",
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
    label: "The pylon circuit board is exposed during maintenance. The timing config isn't from the commune's spec.",
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
    label: "The residue in the trench soil is readable at the surface. The gradient points toward the source.",
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

];

window.GLASSWAKE_COMMUNE_STAGE2_ENRICHED_CHOICES = GLASSWAKE_COMMUNE_STAGE2_ENRICHED_CHOICES;
