/**
 * COSMORIA STAGE 2 ENRICHED CHOICES
 * Investigation arc: maritime archive / airship lane suppression compound transit
 * NPCs: Coralyn Tideglass (Archivist), Marrow Tideglass (Ship Captain),
 *       Selka Tideglass (Innkeeper), Tavian Tideglass (Market Clerk), Nerissa Tideglass (Shrine Attendant)
 */

var COSMORIA_STAGE2_ENRICHED_CHOICES = [

  {
    label: "Seventeen cargo declarations. One vessel name. The vessel has been decommissioned for twelve years.",
    tags: ['Investigation', 'Stage2'],
    tag: 'risky',
    plot: 'main',
    xpReward: 78,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(78, 'reviewing maritime archive vessel and cargo records');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_coralyn_tideglass = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `Coralyn has a secondary ledger she keeps locked. She opens it now — the entries are in her hand, a parallel record running alongside the official one. "Seventeen cargo declarations in eight months, all referencing the Pallmark Reach." She squares the historical registry page against the desk edge before turning it toward you, then covers the decommissioning status line with her thumb, then lifts it. "Pending final registry confirmation." Pending since twelve years ago. Someone left that line unresolved and someone else found it and used it.`;
        addJournal('Cosmoria: ghost vessel via incomplete decommission record — intentional archive gap', 'evidence', `cos-coralyn-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The Maritime Archive Hall requires a registered researcher credential. Coralyn processes your access request at the front desk — fills out the form, notes your name, stamps the inquiry log. She covers the routing line with her thumb while she reads it, then sets the form in the tray. The log goes to the Harbor Captain's administrative office as standard procedure. You leave without the record. Your name is now in a document that Marrow Tideglass will receive by end of day.`;
        addJournal('Maritime archive access logged — Harbor Captain oversight notified', 'complication', `cos-coralyn-fail-${G.dayCount}`);
      } else {
        G.flags.met_coralyn_tideglass = true;
        G.investigationProgress++;
        G.lastResult = `Coralyn pulls the file without being asked twice — she's had it ready. Seventeen declarations, one vessel name, eight months. "The Pallmark Reach decommissioning was never closed out. I flagged it four months ago." She squares the page against the desk edge, covers the status line with her thumb, then lifts it. "The flag was reviewed and left open." She keeps her hand on the page. "Until that decommissioning is finalized in the registry, the paperwork is technically acceptable." She says it like she's practicing for a hearing.`;
        addJournal('Ghost vessel declarations — decommissioning legally incomplete, 17 uses', 'evidence', `cos-coralyn-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The Harbor Captain received an order. He filed an objection. The order stood.",
    tags: ['NPC', 'Persuasion', 'Stage2'],
    tag: 'risky',
    plot: 'main',
    xpReward: 76,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(76, 'pressuring Harbor Captain Marrow Tideglass on sealed cargo waivers');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.charm||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_marrow_tideglass = true;
        G.investigationProgress++;
        G.lastResult = `Marrow doesn't ask you to sit. He stands with his arms at his sides and speaks like he's giving a deposition he's been rehearsing. The waiver instruction came from a Cosmouth administrative office — specific department, specific date, he names both. He filed a written objection the same week. The objection came back overridden, no reason given. "The containers go onto the night airship to Shelkopolis. Night departures, every time." He opens a drawer and takes out the departure logs. He sets them on the desk between you. He doesn't push them toward you. He waits.`;
        addJournal('Cosmoria: sealed cargo waived onto night airship to Shelkopolis — House Cosmouth admin override', 'evidence', `cos-marrow-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `Marrow listens to the question and then asks for your name and purpose in writing. He produces a form before you've finished speaking — pre-positioned, like he keeps them out. He fills in the date and time himself. "Cargo inspection policy and waiver records are Harbor Authority administrative materials." He stamps the form, sets it between you on the desk, and takes one step back from it. He doesn't push it toward you. He waits for you to pick it up yourself. The inquiry report goes into the same tray Coralyn's access log uses.`;
        addJournal('Harbor Captain reported inquiry to Harbor Authority — identification requested', 'complication', `cos-marrow-fail-${G.dayCount}`);
      } else {
        G.flags.met_marrow_tideglass = true;
        G.investigationProgress++;
        G.lastResult = `Marrow confirms the waiver category. His hands don't move while he talks. "Sealed containers under trade exemption category C require no secondary inspection. My office received the waiver classification with a valid authority code." He pauses. "I don't know what's in them. I've followed the instruction." He sets the waiver form on the desk between you and steps back from it. He doesn't push it toward you. He's staring at a point above your left shoulder when he speaks again. He knows the instruction is wrong. He's said it out loud to himself enough times that it comes out flat.`;
        addJournal('Harbor inspection waiver confirmed — captain knows it is irregular', 'evidence', `cos-marrow-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The market is just a stamp. The containers never touch the floor.",
    tags: ['NPC', 'Craft', 'Stage2'],
    tag: 'risky',
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'tracing sealed container distribution with market clerk Tavian Tideglass');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('spirit', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_tavian_tideglass = true;
        G.investigationProgress++;
        G.lastResult = `Tavian's ledger has a "bonded transit" column that usually runs thin — three, four entries a month for cargo waiting on a licensed buyer. In the past eight months that column runs to a full page. The sealed containers arrive, log as bonded transit, and appear on the night airship manifest within five to six hours. They don't enter the market floor. They don't wait for a buyer. They use Cosmoria's market ledger as a stamp — arriving as unregistered cargo, leaving with a House Cosmouth maritime provenance. The ledger is the product they came for.`;
        addJournal('Cosmoria as transit laundering point — containers acquire Cosmouth maritime provenance', 'evidence', `cos-tavian-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Tavian opens his mouth to speak and then closes it. "The ledger for the past six months is under a Cosmouth administrative audit. Active review. I can't pull records from a live audit file." He says it with his hands on the desk, pressed flat. The audit notice is visible in the document tray behind him — recent, the paper still white at the edges. The audit started three days ago. Someone filed it in advance of exactly this kind of request.`;
        addJournal('Market ledger under active Cosmouth review — access denied', 'complication', `cos-tavian-fail-${G.dayCount}`);
      } else {
        G.flags.met_tavian_tideglass = true;
        G.investigationProgress++;
        G.lastResult = `Tavian confirms the bonded transit pattern. "Most bonded cargo waits two to five days for buyer confirmation. Six-hour turnaround is unusual." He pulls a page — one entry, seven weeks ago, a container that stayed thirty-six hours before departure. "That's the longest. The others are all under eight hours." He doesn't say why he pulled that page specifically. He's been watching the pattern for a while.`;
        addJournal('Bonded transit cargo — 6-hour rapid departure irregular', 'evidence', `cos-tavian-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The agent books the room, receives a letter, leaves on the night airship. Never stays.",
    tags: ['NPC', 'Stealth', 'Stage2'],
    tag: 'risky',
    xpReward: 66,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'questioning innkeeper Selka Tideglass about shipping agent patterns');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('finesse', (G.skills.finesse||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_selka_tideglass = true;
        G.investigationProgress++;
        G.lastResult = `Selka keeps her booking records in a cloth-covered ledger under the counter, not on the shelf. She opens it to the agent's name — eighteen entries, six months. Seventeen show checkout the same evening. "She books, receives correspondence, leaves by the night airship window." Selka taps three entries. "These three, the letters had a sealed mark I wrote down because I hadn't seen it before." She shows you her notation in the margin — a stylized mark she's reproduced from memory. It matches the charter seal Sable Ledgermere documented at Guildheart Hub.`;
        addJournal('Cosmoria inn: agent uses room as transit address — 3 letters bear sealed charter mark', 'evidence', `cos-selka-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Selka wipes down the counter and says she doesn't discuss guest patterns. "People who use this inn have expectations of discretion. That's part of what they're paying for." She keeps wiping. The cloth passes over a spot that's already clean. She's not going to open the booking ledger for someone she doesn't know, and the agent is a regular who pays promptly and causes no trouble. Those are the guests you protect.`;
        addJournal('Dockside inn confidentiality — agent inquiry refused', 'complication', `cos-selka-fail-${G.dayCount}`);
      } else {
        G.flags.met_selka_tideglass = true;
        G.investigationProgress++;
        G.lastResult = `Selka thinks about it for a moment, then shrugs. "Books, pays full, leaves by evening. Eighteen times." She wipes the counter again. "Good business for me. Something about it that isn't good business for someone else, I'd guess." She puts the cloth down. She's willing to say that much because it doesn't cost her anything. Before she can continue, her attention goes to the far door. She folds the paper and says nothing more. You recognize the specific silence of someone who has seen what Red Hood does to people who talk.`;
        addJournal('Shipping agent using inn as short-stay transit address', 'evidence', `cos-selka-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The surge schedule matches the tide windows. The operation runs on a natural clock.",
    tags: ['NPC', 'Lore', 'Stage2'],
    tag: 'risky',
    plot: 'main',
    xpReward: 74,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'reviewing tidal-surge correlation data with Nerissa Tideglass');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_nerissa_tideglass = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `Nerissa spreads her tidal observation sheets across the shrine's record table — two years of dual-tide amplitude readings, dated and signed. Salt from the deep harbor drifts through the shrine's open seaward arch. The correlation is visible in the columns without calculation: every Shelkopolis surge date aligns with a peak-amplitude dual-tide window. She traces the pattern with her finger without speaking for a moment. "I couldn't explain why the surges followed this schedule. I assumed it was the surges triggering tidal sensitivity." She looks up. "But if the tidal window is the trigger and not the consequence — then the schedule isn't random. It's predictable. Every time."`;

        addJournal('Tidal window confirmed as surge trigger mechanism — operation uses natural schedule as cover', 'evidence', `cos-nerissa-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.reverence = (G.worldClocks.reverence||0) - 1;
        G.lastResult = `Nerissa listens carefully and then says tidal surge events fall outside the shrine's observational scope — the shrine records natural tide cycles, not glyph activity. "What you're describing is a theological question about divine tide mechanics. That's doctrine, not observation." Salt air moves through the shrine's open arch from the deep harbor below. She closes her record sheets and offers a tide blessing instead. The offer is genuine. The records stay closed.`;
        addJournal('Sea shrine records closed — tidal inquiry redirected to doctrine', 'complication', `cos-nerissa-fail-${G.dayCount}`);
      } else {
        G.flags.met_nerissa_tideglass = true;
        G.investigationProgress++;
        G.lastResult = `Nerissa's sheets show the dual-tide amplitude windows clearly. She's already noted the correlation with the glyph surge dates — there's a small notation in the margin of the second-to-last page: "see regional event log — timing unexplained." She knew the pattern. She didn't know what it meant. "I didn't publish it because I couldn't explain it," she says. The mechanism you carry from Watchers Perch fills the gap she left open.`;
        addJournal('Tidal window surge correlation documented — mechanism now explained', 'evidence', `cos-nerissa-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Coralyn's secondary ledger has a third column. She didn't show it.",
    tags: ['Stage2'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(30, 'pressing Coralyn Tideglass on the reviewer log behind the secondary ledger');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var roll = rollD20('charm', G.skills.charm);
      if (roll.total >= 13) {
        G.flags.coralyn_reviewer_log_seen = true;
        G.investigationProgress++;
        addNarration('The Third Column', 'Coralyn doesn\'t open the ledger again immediately. She squares it against the counter edge first — both hands, a precise alignment — before she lifts the cover. The third column is narrow: initials and a date stamp, one entry per reviewed row. Six of the Pallmark Reach declarations carry the same two letters. She covers them with her thumb, then lifts it. "That office was restructured fourteen months ago. The person these initials belong to is no longer in Cosmoria." She closes the ledger carefully, both latches.');
        addJournal('Archive reviewer initials on ghost vessel declarations — linked to restructured Cosmouth office', 'evidence');
        maybeStageAdvance();
      } else {
        G.lastResult = `Coralyn listens to the question without moving to open anything. She squares the top form on the counter against the edge — a small, precise alignment — before answering. "Reviewer attribution is an internal archive administration record. It is not part of the public access filing." She says it without apology and without warmth. The ledger stays under the counter. The access log for this conversation is already filling in behind her, ink still wet on the date line.`;
        addNarration('The Record Stands Closed', 'Coralyn listens to the question and doesn\'t move to open anything. She squares the top form on the counter against the edge — a small, precise alignment — before she answers. "Reviewer attribution is an internal archive administration record. It\'s not part of the public access filing." She says it without apology and without particular warmth. The ledger stays under the counter. The access log for this conversation is already filling in behind her, ink still wet on the date line.');
      }
    }
  },

  {
    label: "The night platform uses different quay markings. Someone painted over the originals.",
    tags: ['Stage2'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(30, 'examining the night airship loading quay for physical evidence');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      var roll = rollD20('vigor', G.skills.vigor);
      if (roll.total >= 13) {
        G.flags.quay_markings_examined = true;
        G.investigationProgress++;
        addNarration('Painted Over', 'The night platform smells of brine and cooling timber, the deep-harbor water low against the struts at this hour. The original quay markings are still readable under the new paint if the angle is right — weight classifications in the old Harbor Authority format, each berth rated for a specific load range. The painted-over marks on berth seven are noticeably lower than the surrounding berths. Someone reclassified it upward. A sealed container routed through berth seven under the new classification would not trigger the secondary weight inspection that the original rating requires. The paint job is three to five months old by the oxidation pattern on the surface coat.');
        addJournal('Night airship berth seven weight classification painted over — bypasses secondary inspection threshold', 'evidence');
        maybeStageAdvance();
      } else {
        G.lastResult = `A loading crew foreman steps off the gangway before the quay markings are close enough to read. "Pre-departure staging. Platform's restricted." He gives his name without being asked: Oren Saltwick, night platform lead. The tide gauge bracket behind him is still dripping from the last surge cycle, salt water running down a rust-brown stain on the iron strut. Two dock hands near the mooring cleats have stopped what they were doing. Saltwick waits without moving. He has done this before and expects it to end the same way.`;
        addNarration('Platform Crew', 'Oren Saltwick, night platform lead, steps off the gangway before the quay markings are close enough to read. "Pre-departure staging. Platform\'s restricted." The tide gauge bracket behind him drips from the last surge cycle, salt water running down a rust-brown iron strut. The smell of brine-preserved goods and weathered rope comes off the dock at full load. Two dock hands near the mooring cleats have stopped their work. He waits for you to back away.');
      }
    }
  },

  {
    label: "The archive staff read the form, not the question. They noticed the wrong thing.",
    tags: ['Stage2'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(30, 'navigating a social correction from Maritime Archive Hall staff');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var roll = rollD20('finesse', G.skills.finesse);
      if (roll.total >= 13) {
        G.flags.archive_form_navigated = true;
        G.investigationProgress++;
        addNarration('Correct Form', 'The archive scribe who flags the incomplete research request form is precise about exactly which line was left blank. He produces the correct form himself — the approved version, which happens to route through a different administrative tray than the standard inquiry log. "If the form is incorrect it goes to corrections review. Corrections review is currently backed up fourteen days." He slides the right form across the desk. The difference between the two forms is one checkbox. He\'s already filled in the date.');
        addJournal('Archive scribe routed inquiry through non-logged form — intentional procedural bypass', 'intelligence');
        maybeStageAdvance();
      } else {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
        G.lastResult = `The scribe notes the form error in the corrections register before explaining what the error was. The explanation is delivered clearly and without condescension, which somehow makes the register entry worse. The inquiry goes into corrections review — fourteen days minimum. The register entry includes the date, the nature of the error, and a physical description rendered in three words: height, build, clothing color. It is thorough in exactly the way it needs to be.`;
        addNarration('Logged Correction', 'The scribe notes the form error in the corrections register before explaining what the error was. The explanation is delivered clearly and without condescension, which somehow makes the register entry worse. The inquiry goes into corrections review. Fourteen days. The note in the register includes the date, the nature of the error, and a physical description rendered in three words: height, build, clothing color. It is thorough.');
      }
    }
  },

  {
    label: "The decommission file has a witness signature. No current Harbor Authority officer owns it.",
    tags: ['Stage2', 'NPC', 'Evidence'],
    tag: 'risky',
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'tracing the witness signature on the Pallmark Reach decommission file');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.pallmark_witness_identified = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The witness signature on the decommission file belongs to a Harbor Authority registrar who left Cosmoria's administrative roll fourteen months ago — reassigned to a Cosmouth regional office, no forwarding record on file. Coralyn pulls the personnel transfer log without being asked, squares it against the desk edge before opening it, and turns to a page with two lines missing from the middle — torn out cleanly, not worn. The transfer order is intact. The receiving office confirmation is gone. She sets the open log between you and does not close it. Someone removed the paperwork trail that would show where the registrar went after signing the decommission, and Coralyn has known the page was incomplete since before you arrived.`;
        addJournal('Pallmark Reach decommission witness: registrar transferred to Cosmouth regional office, transfer confirmation removed from personnel log', 'evidence', `cos-witness-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        addHeat('cosmouth', 1);
        G.lastResult = `Coralyn squares the personnel inquiry form against the counter edge before she slides it across — both hands, a precise alignment — and explains the countersignature requirement without raising her voice. The Harbor Captain's administrative office receives the request before the hour is out. She has already signed her own name in the notification field. The inquiry is now linked in writing to both the archive and Marrow Tideglass's administrative log, and Coralyn is on record as having processed it correctly. Two clerks know the question has been asked. So does she.`;
        addJournal('Personnel record request for decommission witness — routed through Harbor Captain administrative office', 'complication', `cos-witness-fail-${G.dayCount}`);
      } else {
        G.flags.pallmark_witness_identified = true;
        G.investigationProgress++;
        G.lastResult = `The witness signature is legible. Coralyn traces it against the Harbor Authority personnel register — the name appears on the active roll through fourteen months ago, then stops. "Transfer out," she says, and reads the entry twice before closing the register. "The receiving office line is blank." She leaves the register open to the page. A blank receiving office line on a transfer means the record was never confirmed complete. Someone let the file sit unfinished, and the unfinished file let the decommission sit open.`;
        addJournal('Pallmark Reach decommission witness transferred out of Cosmoria — receiving office line blank, transfer unconfirmed', 'intelligence', `cos-witness-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The night manifest has a column the day manifest doesn't. Someone added it.",
    tags: ['Stage2', 'NPC', 'Evidence'],
    tag: 'risky',
    plot: 'main',
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'comparing night vs day airship manifests for added columns');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('vigor', (G.skills.vigor||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.night_manifest_column_found = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The added column is labeled "Bonded Continuity Reference" — a phrase that appears nowhere in the Harbor Authority's standard manifest glossary. The BCR entries in the night manifest are six-digit codes, all beginning with the same three digits. Marrow recognizes the prefix when he reads it: "That prefix belongs to a Cosmouth administrative authorization block. Not a cargo classification. An administrative override." The column wasn't added to the manifest template — it was added to the night manifest copies only, by hand, in the same ink weight as the printed form.`;
        addJournal('Night airship manifest: "Bonded Continuity Reference" column added by hand — Cosmouth admin override prefix, not in standard glossary', 'evidence', `cos-manifest-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Saltwick is at the loading dock steps before the manifest inquiry is finished — a brief readjustment of weight onto his back foot, no surprise. "Manifests are operational documents. Non-crew access ends when the airship moves to pre-departure staging." Same flat register as before, but there's recognition in it now: not warmth, not hostility, just awareness. One of the deck crew above writes in a small ledger clipped to his belt. Saltwick watches the notation without comment, then looks back at you.`;
        addJournal('Night manifest review blocked during pre-departure staging — crew observation logged', 'complication', `cos-manifest-fail-${G.dayCount}`);
      } else {
        G.flags.night_manifest_column_found = true;
        G.investigationProgress++;
        G.lastResult = `Side by side, the day and night manifests differ in structure, not just content. The night form carries an extra column on the right margin — "BCR" — that the day form does not have. The BCR entries are six-digit codes. They don't appear in the standard manifest glossary posted at the Harbor Authority intake desk. The codes are consistent across every night manifest for the past eight months.`;
        addJournal('Night airship manifest carries extra BCR column absent from day manifests — consistent across 8 months', 'evidence', `cos-manifest-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Nerissa's observation sheets reference a Cosmouth tide calendar discontinued two years ago.",
    tags: ['Stage2', 'NPC'],
    tag: 'risky',
    plot: 'main',
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'examining the discontinued Cosmouth tide calendar against Nerissa\'s tidal records');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.cosmouth_tide_calendar_linked = true;
        G.investigationProgress++;
        G.lastResult = `The discontinued Cosmouth tide authority calendar was the only publication that predicted dual-tide amplitude windows at seven-day resolution. Nerissa has kept a copy — she uses it for comparison. The surge schedule matches the calendar's amplitude peak predictions with a precision that cannot be coincidental: whoever planned the operation had access to the same predictive data. The calendar was discontinued after its publisher was absorbed into a Cosmouth administrative bureau. Nerissa notes the absorption date: eight months before the first sealed container declaration.`;
        addJournal('Discontinued Cosmouth tide calendar: surge schedule matches amplitude peaks — calendar publisher absorbed into Cosmouth bureau 8 months before first sealed cargo', 'evidence', `cos-tidecal-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.reverence = (G.worldClocks.reverence||0) - 1;
        G.lastResult = `Nerissa hesitates before pulling the comparison calendar. "It's a reference document from a discontinued civil authority. I use it privately for baseline verification — it's not officially sourced anymore." She closes it again before spreading it on the table. The hesitation isn't hostility; it's the instinct of someone who has used an unofficial document in professional work for two years and knows it. She will need a clearer statement of purpose before she puts that calendar next to her shrine records for someone else to see.`;
        addJournal('Sea shrine: discontinued tide calendar held privately — attendant unwilling to produce without clearer purpose', 'complication', `cos-tidecal-fail-${G.dayCount}`);
      } else {
        G.flags.cosmouth_tide_calendar_linked = true;
        G.investigationProgress++;
        G.lastResult = `Nerissa spreads the discontinued calendar next to her observation sheets. The comparison is easier to see than to explain — every surge date on her log falls on a peak-window entry from the discontinued calendar. She traces three of them with her finger. "I thought the calendar was obsolete. I kept it because the amplitude modeling was more granular than the current regional tide tables." The calendar's amplitude modeling is what makes the surge schedule predictable. Someone still had access to it when the schedule was built.`;
        addJournal('Discontinued Cosmouth tide calendar amplitude windows match surge schedule — granular data unavailable in current regional tide tables', 'intelligence', `cos-tidecal-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Selka's second booking register doesn't go to Harbor Authority inspectors.",
    tags: ['Stage2', 'NPC'],
    tag: 'risky',
    xpReward: 66,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'pressing Selka Tideglass on the existence of a second booking register');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.charm||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.selka_second_register_seen = true;
        G.investigationProgress++;
        G.lastResult = `Selka doesn't deny it. She reaches under the counter and puts the second register flat between you without being asked twice — a narrow cloth-bound book, smaller than the main ledger, pages worn at the top corner where a thumb would catch them. "Any innkeeper on the harbor side keeps a private log. Not for authority review. For my own memory." The log records correspondence received by room, not by guest name. Three entries carry notation: sealed envelope, departure before dark, no reply expected. The seal description matches the charter mark from the first register's margin.`;
        addJournal('Selka private register: 3 sealed-envelope entries with departure before dark — same charter mark as main ledger margin notation', 'evidence', `cos-selka2-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Selka finishes wiping the counter in a long, slow pass before she answers. "I run a harbor inn. Every inspector who comes through this door has a different idea of what I'm supposed to show them and a different form for me to fill out when they're done. I keep what I keep, and what I keep is my business." She sets the cloth down on the counter and leaves her hand on it. The conversation is over. The harbor wharfmaster's office is two minutes' walk; she picks up a written complaint form from them on a regular basis and she's not shy about using it.`;
        addJournal('Dockside inn: Selka declined second register inquiry — complaint-form familiarity noted', 'complication', `cos-selka2-fail-${G.dayCount}`);
      } else {
        G.flags.selka_second_register_seen = true;
        G.investigationProgress++;
        G.lastResult = `Selka glances at the under-counter shelf before answering, which is answer enough. "Harbor-side innkeepers keep a private log for correspondence handling. It's not unusual." She opens it to a middle page — not the beginning, not the relevant entries — and holds it at a reading angle that would be useful if you were standing behind the counter. The page shows room numbers and correspondence notations. She closes it after ten seconds. "Guests who use this inn expect discretion. I provide it. I also notice patterns."`;
        addJournal('Selka private correspondence log confirmed — contains room-based correspondence notations, selectively shown', 'intelligence', `cos-selka2-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The bonded transit column has been audited three times. Same auditor. Always inconclusive.",
    tags: ['Stage2', 'NPC'],
    tag: 'risky',
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'tracing repeat audit history in the Floating Market bonded transit column');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('spirit', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.market_repeat_auditor_found = true;
        G.investigationProgress++;
        G.lastResult = `The audit history for the bonded transit column runs to three separate reviews over eighteen months — all three conducted by the same external auditor, all three returning an inconclusive finding with identical language: "No procedural irregularity identified; record maintenance within acceptable variance." Tavian has the originals filed under a tab labeled RESOLVED, which is the correct administrative category for an inconclusive finding. The auditor's firm is registered to a Cosmouth commercial address that also appears in the ghost vessel's original registration filing. The same address, different name on the door.`;
        addJournal('Bonded transit audited three times by same firm — auditor registered to same Cosmouth address as Pallmark Reach ghost vessel', 'evidence', `cos-audit-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Tavian stiffens slightly — not rudely, but visibly. "Audit records are under active Cosmouth administrative review. I explained this." He is correct; he did explain it. The audit files go back into the drawer he keeps them in, which is not the standard records tray. He keeps them in reach. He's been expecting the question, which means he's been expecting someone would eventually come asking it in a way that would not be helpful to answer.`;
        addJournal('Market audit records again inaccessible — Tavian\'s drawer location of files noted', 'complication', `cos-audit-fail-${G.dayCount}`);
      } else {
        G.flags.market_repeat_auditor_found = true;
        G.investigationProgress++;
        G.lastResult = `Tavian pulls the audit file from the drawer himself without being asked. "Three reviews. Three inconclusive findings." He opens the first one and the second and sets them side by side. The language is word-for-word identical across two separate audit reports — not similar, identical, including a punctuation choice in the third sentence that is unusual. He points to it with the end of his pen without saying anything. Someone wrote the conclusion before conducting the review.`;
        addJournal('Three repeat audits with identical inconclusive language — conclusion appears pre-written across multiple reports', 'evidence', `cos-audit-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Every registered vessel has an approach chart. The Pallmark Reach has one. It shouldn't.",
    tags: ['Stage2', 'NPC'],
    tag: 'risky',
    plot: 'main',
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'tracing Pallmark Reach approach chart in harbor pilot licensing board records');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.pallmark_pilot_chart_found = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The approach chart filed for the Pallmark Reach lists a pilot certification dated three months before the vessel's original commissioning date — the chart was registered before the ship existed. The licensing board clerk sets both documents side by side without being asked and reads the dates twice. The smell of long-haul brine-preserved cargo hangs in the board's waiting corridor. The certifying pilot's name has not appeared on any active licensing roll for eleven years. Someone backdated the chart using an expired certification that no longer had a living holder to contradict it.`;
        addJournal('Pallmark Reach pilot chart predates vessel commissioning — certifying pilot license expired 11 years prior, holder untraceable', 'evidence', `cos-pilotchart-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The licensing board's intake desk requires a vessel owner authorization or a Harbor Captain countersignature before releasing approach charts for review. The clerk produces the authorization form before the request is complete — a pre-positioned reflex. The smell of the deep-sea port carries through the board's open window, brine and rope work and loaded cargo. Marrow Tideglass's administrative office receives the countersignature request within the hour. The inquiry is now cross-referenced between two offices and logged in both.`;
        addJournal('Pilot chart access blocked — Harbor Captain countersignature requested, cross-logged', 'complication', `cos-pilotchart-fail-${G.dayCount}`);
      } else {
        G.flags.pallmark_pilot_chart_found = true;
        G.investigationProgress++;
        G.lastResult = `The approach chart is in the board's archive without any access restriction — approach charts are not flagged as sensitive records. The Pallmark Reach chart lists a certifying pilot and a certification date. The clerk checks the active licensing roll without being asked. "That name isn't on the current roll." He pulls the lapsed roll for the relevant year. The name is there, marked inactive. Inactive certifications can't authorize new approach charts. This one did.`;
        addJournal('Pallmark Reach approach chart certified by lapsed pilot license — inactive on board roll at time of filing', 'intelligence', `cos-pilotchart-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The gangway crew handoff leaves a thirty-second blind spot. Same positions, every run.",
    tags: ['Stage2', 'NPC'],
    tag: 'bold',
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'working the night platform dock through a full tide window to time the gangway gap');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('vigor', (G.skills.vigor||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.cargo_insurer_policy_holder_found = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The outer gangway sits between two tidal struts where the platform drops half a step — the salt crust on the deck planks muffles footfall. At crew handoff the outgoing dock hand crosses to the gangway post and the incoming stops at the brake winch, same positions every run. For thirty seconds the corner angle is blind. A folio could move from staging hold to airship manifest rack without crossing either sightline. The brake winch and gangway post are the only two positions that create this gap. The handoff was built around it.`;
        addJournal('Night platform gangway: 30-second crew-handoff blind spot — positions chosen to create sightline gap between staging hold and airship manifest rack', 'evidence', `cos-gangway-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The salt crust on the outer platform deck is drier than it looks and the step difference between the tidal struts makes for louder movement than expected. A dock hand at the brake winch turns before the handoff gap opens. He doesn't call out — he picks up a coil of mooring line he doesn't need and carries it a few steps closer to where you're standing. The crew continues loading. Nobody looks up. The proximity is the message.`;
        addJournal('Night platform observation attempt — brake winch crew noted approach, proximity used as warning', 'complication', `cos-gangway-fail-${G.dayCount}`);
      } else {
        G.flags.cargo_insurer_policy_holder_found = true;
        G.investigationProgress++;
        G.lastResult = `At the crew changeover the outer gangway goes unattended for a count of thirty — both dock hands occupy their transition positions and neither has a sightline to the platform corner where the staging hold meets the airship boarding rack. Moving with the crew's rhythm rather than against it, the gap is easy to time. The handoff happens the same way every run: same two positions, same interval. Someone who knew the platform routine could move a folio through that corner without appearing on either man's peripheral view.`;
        addJournal('Night platform gangway handoff creates 30-second blind spot — staging hold to airship rack corner accessible, same positions every run', 'intelligence', `cos-gangway-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The night platform roster shows the same crew every time. That's not how rosters work.",
    tags: ['Stage2', 'NPC'],
    tag: 'risky',
    xpReward: 66,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'cross-referencing quayside labor guild night platform crew rosters');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('finesse', (G.skills.finesse||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.night_platform_crew_identified = true;
        G.investigationProgress++;
        G.lastResult = `The guild roster for night platform assignments reads like a rotation schedule — normally the crew list varies week to week as members cycle through shifts. For every sealed container departure over eight months, the same six names appear. The guild payroll clerk shows the overtime records without being asked: the six are paid at standard rate, not night-shift premium. That rate requires a special exemption signed by the Harbor Captain's administrative office. The exemption paperwork is missing from the file. Someone removed it after the payroll was processed.`;
        addJournal('Night platform crew: same 6 members for every sealed departure — night premium waived, exemption paperwork removed from guild payroll file', 'evidence', `cos-laborguild-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The guild hall's intake desk serves members first. Non-members requesting roster records require a labor dispute filing or a formal Harbor Authority referral. Neither applies here. The clerk writes down the name and purpose in a contact log that sits open on the desk — visible, deliberate. One of the stevedores on the floor near the far wall has stopped coiling rope and is watching the desk. He finishes the knot without looking at his hands.`;
        addJournal('Labor guild roster access denied — non-member inquiry logged, dock worker observation noted', 'complication', `cos-laborguild-fail-${G.dayCount}`);
      } else {
        G.flags.night_platform_crew_identified = true;
        G.investigationProgress++;
        G.lastResult = `The night platform roster for sealed container departures shows a pattern in the crew assignments — the same names cluster around those dates. The payroll clerk notices it when the dates are laid out in sequence. "That's a lot of voluntary night shifts for the same group. Most members rotate away from nights after a few months." The crew members are all in good standing with the guild. None have filed complaints. None have requested assignment changes.`;
        addJournal('Same night platform crew assigned to all sealed container departures — no complaints or transfer requests filed', 'intelligence', `cos-laborguild-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The bond surety covers every waived container. It has never once been called.",
    tags: ['Stage2', 'NPC'],
    tag: 'risky',
    plot: 'main',
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'reviewing customs bond records for sealed container surety with bond broker');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('spirit', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.customs_bond_surety_found = true;
        G.investigationProgress++;
        G.lastResult = `The bond record covers every sealed container shipped under the trade exemption waiver. Forty-one bonds, eight months, all issued against the same surety account — and none have been called, which means no container has ever triggered a customs enforcement action. The bond holder is the same Cosmouth Administrative Continuity Trust that holds the cargo insurance. One entity on both sides of every transaction: it insures the cargo and posts surety against its own customs risk. The broker's face goes still when this is pointed out. He reads both documents again, side by side, before he says anything.`;
        addJournal('Customs bonds for all 41 sealed containers held by same entity as cargo insurance — Cosmouth Administrative Continuity Trust self-bonding own shipments', 'evidence', `cos-bond-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Customs bond records are available for public audit in principle — the bond register is a public instrument. In practice the bond register is administered by a Cosmouth regional trade office, and accessing records from a Cosmoria intermediary requires a written referral. The broker explains this clearly, in language that suggests he has explained it to people with sharper questions than this one before. The referral form is two pages and asks for institutional affiliation. The blank field for institutional affiliation is the one that ends this conversation.`;
        addJournal('Customs bond register access requires Cosmouth trade office referral — institutional affiliation blank blocks inquiry', 'complication', `cos-bond-fail-${G.dayCount}`);
      } else {
        G.flags.customs_bond_surety_found = true;
        G.investigationProgress++;
        G.lastResult = `The broker confirms the bond record without difficulty — customs bonds are public instruments. Forty-one bonds, all against sealed containers, all against the same surety account. "No calls in eight months is unusual. Most shipments under the trade exemption category generate at least one customs query." He runs his finger down the enforcement column. It is empty. A bond that is never called means either the cargo was legitimate or the enforcement mechanism was already managed before the cargo crossed the dock.`;
        addJournal('41 sealed container bonds with zero enforcement calls — same surety account, enforcement column blank across 8 months', 'intelligence', `cos-bond-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The sealed containers are heavier than their waiver classification allows. The dock math says so.",
    tags: ['Stage2', 'NPC'],
    tag: 'risky',
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'calculating sealed container weight against dock platform load tolerances');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('vigor', (G.skills.vigor||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.airship_unlisted_category_found = true;
        G.investigationProgress++;
        G.lastResult = `The tidal platform's load-distribution markers are scored into the deck planking at one-stone intervals — standard dock safety infrastructure on all float-platform airship stations. The sealed containers sit in the marked staging zone. Counting strut deflection against the scored intervals gives a weight per container between forty and fifty stone. The trade exemption waiver they're filed under caps the declared weight at twelve stone. Whatever is inside these containers, it is not twelve stone of administrative materials. The deck scoring cannot be disputed by the people who wrote the paperwork.`;
        addJournal('Sealed container platform deflection: 40-50 stone estimated per unit — filed under waiver category capped at 12 stone', 'evidence', `cos-deckweight-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The tidal platform surface is wet from the last surge cycle and the scored load markers are filled with salt deposit. Getting close enough to read the deflection on the struts means moving past the staging area barrier, which is marked with a posted warning about unsecured platform access. A dock hand at the far end of the platform calls out before the barrier is reached. He doesn't move from his position. He just keeps watching until the barrier is clear again. The warning is posted in three languages. One of them is Cosmouth administrative standard.`;
        addJournal('Platform weight-deflection approach blocked — dock hand observation, staging area barrier', 'complication', `cos-deckweight-fail-${G.dayCount}`);
      } else {
        G.flags.airship_unlisted_category_found = true;
        G.investigationProgress++;
        G.lastResult = `The tidal platform uses scored load markers in the deck planking for safety compliance — one-stone intervals, plainly visible. A sealed container resting in the staging zone compresses the platform struts by an amount the scoring makes readable. The compression is consistent across all four visible containers: between forty and fifty stone each. The trade exemption waiver on file for sealed containers in this category declares a maximum of twelve stone. The discrepancy is not marginal. It is not explained by documentation drift.`;
        addJournal('Platform load-scoring: sealed containers at 40-50 stone each — waiver category declared maximum is 12 stone, undeclared mass consistent across all units', 'intelligence', `cos-deckweight-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The weighmaster logs every cargo weight at intake. The sealed containers are logged at zero.",
    tags: ['Stage2', 'NPC'],
    tag: 'bold',
    plot: 'main',
    xpReward: 66,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'reviewing harbor weighmaster intake log for sealed container weight entries');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('vigor', (G.skills.vigor||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.weighmaster_zero_entries_found = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The weighmaster pulls the intake log from the wall peg — pages warped from salt humidity. Every cargo arrival gets a weight in stone. The sealed containers are logged at zero. Not estimated, not flagged — zero, in a column that cannot legally read zero for physical goods. His initials appear next to each entry. He reads without speaking, free hand on the scale's counterweight arm, then turns the log to face you. He has been initialing zeroes for eight months. He did not refuse because he does not know what was in the containers, and zero seemed safer than asking.`;
        addJournal('Harbor weighmaster log: sealed containers entered at zero weight for 8 months — weighmaster initialed entries without weighing, chose zero over inquiry', 'evidence', `cos-weighmaster-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Saltwick is moving before the approach reaches the weighmaster's intake table, cutting the angle at the salt-encrusted staging barrier. This time he doesn't explain policy. "I know why you're here. Same rule as the platform." Then, without hostility: "You've been around the dock three times today. Whatever you're looking for, the Harbor Authority intake form gets you further than I do." The pocket ledger stays clipped to his belt. He's moved past recording to something closer to advice.`;
        addJournal('Weighmaster area blocked during pre-departure — same night foreman, time logged in pocket ledger', 'complication', `cos-weighmaster-fail-${G.dayCount}`);
      } else {
        G.flags.weighmaster_zero_entries_found = true;
        G.investigationProgress++;
        G.lastResult = `The weighmaster shows the intake log without being asked twice, setting it on the scale platform next to the brass calibration disc he uses to check the balance each morning — a habit so routine he doesn't seem to notice he's done it. The sealed container entries stand out immediately: the weight column reads zero where every other entry carries a figure in stone. "Trade exemption category C — waiver says no secondary inspection. I logged them through." He points to the waiver authorization notation beside each zero. The notation is correct procedure. The zero weight is not. Cargo passing through a harbor station cannot legally weigh nothing.`;
        addJournal('Weighmaster log: sealed containers logged at zero weight per waiver — weight zero notation not legally valid for physical goods', 'intelligence', `cos-weighmaster-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Eight months of shift log entries. Not one is in the night watchman's hand.",
    tags: ['Stage2', 'NPC'],
    tag: 'risky',
    xpReward: 64,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(64, 'examining warehouse night watchman shift log for signature irregularities');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('finesse', (G.skills.finesse||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.warehouse_watchman_log_found = true;
        G.investigationProgress++;
        G.lastResult = `The watchman sits at his post, shift log open on the table, a coil of wet mooring line drying on the bracket beside him. The signature on the sealed container arrival nights is a convincing forgery of his name but does not match his hand on every other shift. He looks at both signatures for a long moment without speaking. "I was told my logs would be administered on those nights." He does not say who told him. His hands are steady. He has been waiting to say this to someone who was not his employer.`;
        addJournal('Warehouse watchman shift log: arrival nights signed in different hand — watchman confirms logs were "administered" on those nights by unnamed party', 'evidence', `cos-watchman-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The bonded warehouse entrance has two people at it during daylight hours and the watchman is not one of them. A warehouse administrator in a guild-marked coat asks for business purpose before allowing past the gate. The purpose given does not match any of the categories on the visitor register form she produces. She fills in the date and a physical description while explaining that non-bonded visitors require a cargo agent escort. The form goes into a tray that is not the standard log.`;
        addJournal('Bonded warehouse access denied — non-bonded visitor form completed by administrator, description recorded', 'complication', `cos-watchman-fail-${G.dayCount}`);
      } else {
        G.flags.warehouse_watchman_log_found = true;
        G.investigationProgress++;
        G.lastResult = `The shift log covers fourteen months at the bonded warehouse. Compared across the full run, the signature on a specific cluster of nights — every night a sealed container arrived — is slightly different in the lowercase letters from the watchman's standard hand. Not dramatically different. Different enough that looking for it finds it. The watchman, when shown the comparison, closes the log carefully and says the shift records are administered by the warehouse manager and he signs what is given to him to sign.`;
        addJournal('Warehouse shift log signatures inconsistent on sealed container arrival nights — watchman states records administered by warehouse manager', 'intelligence', `cos-watchman-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Wax seal means they expect it unopened. Forty-one letters. All before a departure.",
    tags: ['Stage2', 'NPC'],
    tag: 'risky',
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'reviewing dock factor correspondence ledger for sealed-wax agent letters');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.charm||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.dock_factor_wax_seal_found = true;
        G.investigationProgress++;
        G.lastResult = `The dock factor keeps a correspondence ledger as a professional habit — letters logged by sender, date, and seal method, because seal method indicates the sender's expectation. He works at a sloped desk above the cargo lane. One agent has sent forty-one letters over eight months, all wax-sealed rather than paper-taped, all arriving two to three days before a sealed container departure. The factor opens the last three — he kept them, which is unusual; most correspondence gets returned after action. The return address on each is a Shelkopolis administrative post box registered to the Cosmouth Administrative Continuity Trust.`;
        addJournal('Dock factor ledger: 41 wax-sealed letters from agent, all pre-dating sealed departures — return address: Cosmouth Administrative Continuity Trust, Shelkopolis post box', 'evidence', `cos-dockfactor-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The dock factor listens to the question and then picks up the correspondence ledger and moves it to the shelf behind him before he answers. "Correspondence between a factor and their clients is privileged to the same degree as legal correspondence under the Maritime Trade Code." He says this like someone reading from a document he has memorized in advance. The ledger goes spine-out on the shelf. He keeps his hand near it while he talks.`;
        addJournal('Dock factor refused correspondence ledger access — Maritime Trade Code privilege cited', 'complication', `cos-dockfactor-fail-${G.dayCount}`);
      } else {
        G.flags.dock_factor_wax_seal_found = true;
        G.investigationProgress++;
        G.lastResult = `The dock factor shows the correspondence ledger without strong objection — the ledger records method of seal as a professional notation, not content. He talks while keeping half his attention on the cargo processing lane below, tracking the bell-count for the next tide window change without looking at the table on the board above him. One agent's entries stand out immediately: forty-one letters, all wax-sealed, spanning eight months. "Wax seal means they expect it not to be opened in transit," the factor says. "Paper tape means they don't much care either way." He notes the dates without being asked. Every wax-sealed letter precedes a sealed container departure by two to three days.`;
        addJournal('Dock factor correspondence: 41 wax-sealed letters from single agent, each 2-3 days before sealed container departure', 'intelligence', `cos-dockfactor-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The transit laundering route is confirmed. The tidal window is the trigger. Time to act.",
    tags: ['Investigation', 'Finale', 'Stage2', 'Consequence'],
    tag: 'bold',
    plot: 'main',
    xpReward: 108,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(108, 'Cosmoria Stage 2 resolution');
      if (!G.investigationProgress || G.investigationProgress < 8) {
        G.lastResult = `The evidence chain has gaps. The vessel departure logs, the secondary ledger from the harbor clerk, the airship booking record — each documents a piece. The piece that links the transit route to the Shelkopolis surge mechanism isn't assembled yet. Presenting an incomplete case to either the Harbor Authority or the airship network risks the whole thread being dismissed or buried before the key documents can be pulled. More time in Cosmoria first.`;
        G.recentOutcomeType = 'partial'; return;
      }
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.charm||0) + Math.floor(G.level/2));
      if (result.total >= 14 || result.isCrit) {
        G.flags.stage2_finale_institutional = true;
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 3;
        G.lastResult = `The Maritime Authority convenes within the hour. Coralyn's secondary ledger, Marrow's departure logs, Selka's booking record, and Nerissa's tidal correlation go into the hands of three senior administrators who read them without speaking. The Pallmark Reach decommissioning is finalized by end of day — the archive gap closes. The night airship manifest is flagged for secondary inspection. The transit laundering route used Cosmoria's own records against it; the Authority uses those same records to shut it down.`;
        addJournal('Cosmoria S2 finale: Maritime Authority audit, archive gap closed', 'evidence', `cos-finale-inst-${G.dayCount}`);
      } else {
        G.flags.stage2_finale_underworld = true;
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 3;
        G.lastResult = `The template manifests and the departure log go to three cargo handlers on the Cosmoria-Shelkopolis night airship route by the following morning. By afternoon it's reached the freight brokers at the Verdant Row maritime exchange. By evening the ghost vessel information has covered the lane — not as an accusation, as an accounting discrepancy that every freight handler now has a professional reason to flag. The transit route doesn't get shut down. It gets too expensive to use without immediate scrutiny.`;
        addJournal('Cosmoria S2 finale: evidence distributed through airship cargo network', 'evidence', `cos-finale-uw-${G.dayCount}`);
      }
      G.flags.stage2_faction_contact_made = true;
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "A sealed Collegium filing sits in the public index — clerk glances at the cabinet.",
    tags: ['Collegium', 'Stage2', 'Evidence'],
    tag: 'risky',
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'Cosmoria Collegium sealed filing');
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      var result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/2));
      if (result.isCrit || result.total >= 12) {
        G.flags.met_clerk_mevra = true;
        G.investigationProgress = (G.investigationProgress||0) + 1;
        G.lastResult = 'The clerk — Mevra — processes the records request correctly: logs it, stamps it, retrieves the index. The filing exists. She reads the access restriction line and says it cannot be released without Collegium authorization. Standard procedure. Port noise carries through the records office window, ropes under load against the wharf iron. Then she glances at the cabinet behind her — the grey-tab dividers — and back to you. Half a second, deliberate. She slides the denial form across with both hands. The filing number is visible on the index before she closes it: COL-7-RESTRICTED-COSM-14.';
        addJournal('Cosmoria records office: Collegium sealed filing COL-7-RESTRICTED-COSM-14 — clerk Mevra processed denial correctly but marked the grey-tab cabinet.', 'evidence');
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        addHeat('cosmouth', 1);
        G.lastResult = 'Mevra stamps the request, notes the Collegium restriction, and adds a second notation: INQUIRY LOGGED PER COLLEGIUM PROTOCOL 14. The protocol requires that any access attempt on a sealed Collegium filing be reported to the issuing office within one business day. Port noise carries in through the records window — rope loads against iron cleats, cargo being staged for the next long-haul departure. She is sorry. This is the procedure.';

        addJournal('Cosmoria records office: sealed filing access attempt — Collegium Protocol 14 notification triggered.', 'complication');
      } else {
        G.flags.met_clerk_mevra = true;
        G.lastResult = 'Mevra finds the filing in the index without difficulty — it is not hidden, just restricted. She reads the access line, explains the Collegium authorization requirement in clear procedural language, and slides the denial form across. The grey-tab cabinet behind her contains the restricted block. She does not look at it. The filing number is in the index, briefly visible: COL-7-RESTRICTED-COSM-14.';
        addJournal('Cosmoria records office: Collegium sealed filing COL-7-RESTRICTED-COSM-14 confirmed in public index — requires Collegium authorization to access.', 'evidence');
        G.investigationProgress = (G.investigationProgress||0) + 1;
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Peldan tracks Collegium authorization cadence — forty-one same-day approvals, never the same signature twice.",
    tags: ['Collegium', 'Stage2', 'Intelligence'],
    tag: 'risky',
    xpReward: 74,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'Cosmoria Collegium archivist cadence');
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      var result = rollD20('charm', (G.skills.charm||0) + Math.floor(G.level/2));
      if (result.isCrit || result.total >= 13) {
        G.flags.met_archivist_peldan = true;
        G.investigationProgress = (G.investigationProgress||0) + 1;
        G.lastResult = 'Peldan checks the date stamp on the correspondence bundle before handing it across — a reflex, done before he finishes his sentence. Collegium authorization requests normally queue four to seven days. These bypass with senior sign-offs, processing same-day in hours. "I have logged forty-one of them over fourteen months," he says. "All the same request category. The authorization signatures are never the same name twice." He wants this noticed. He has been waiting for someone who would understand what it means.';
        addJournal('Cosmoria archivist Peldan: 41 Collegium same-day authorizations over 14 months — rotating senior signatures, single request category, consistent bypass of standard queue.', 'intelligence');
        G.flags.collegium_contact = true;
        G.flags.stage2_faction_contact_made = true;
      } else if (result.isFumble) {
        G.lastResult = 'The correspondence bundle lands on the counter with its date stamp face-up — a reflex, not a gesture. "Collegium correspondence processes through the standard queue. Authorization timelines are set by the issuing office." The words are careful and correct and give nothing away. The denial form gets a date stamp before it goes into the tray. Every document that passes through this desk gets a date stamp. Peldan keeps records the way other people breathe.';
      } else {
        G.flags.met_archivist_peldan = true;
        G.lastResult = 'Each document gets a date-stamp check before it crosses the desk — a habit so ingrained it doesn\'t look like caution. One authorization category has been processing faster than the standard queue allows for over a year. "I have the log if someone needs it," Peldan says, and addresses the remark to the middle distance rather than to you directly. The offer sits in the air between you. His hand has not moved from the correspondence bundle. He is waiting to see whether the log gets picked up or passed.';
        addJournal('Cosmoria archivist Peldan: Collegium authorization requests in one category consistently processed faster than queue allows — log available.', 'intelligence');
        G.investigationProgress = (G.investigationProgress||0) + 1;
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The reading room patron closes the same volume to the same page every afternoon.",
    tags: ['Stage2'],
    tag: 'risky',
    xpReward: 36,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(36, 'watching the reading room patron pattern');
      var roll = rollD20('finesse', G.skills.finesse);
      if (roll.total >= 13) {
        G.flags.cos_reading_room_patron_tracked = true;
        G.investigationProgress++;
        addNarration('The Closed Page', 'The patron arrives at the same lamp every afternoon and requests the same bound volume — a compiled tariff commentary that is normally checked out once or twice a year. He reads for forty minutes without turning a page, closes it to the same interior bookmark ribbon, and returns it. When his chair empties, the page opens to a marginalia index listing decommissioned vessel registries cross-referenced to their final cargo declarations. Someone has been reading the index without drawing it from the stacks, because drawing it would leave a patron record.');
        addJournal('Reading room: tariff commentary used as marginalia index for decommissioned vessel registries — access bypasses patron log', 'evidence');
        maybeStageAdvance();
      } else {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The patron closes the volume the moment the bench across from his empties and someone sits. He does not look up. He tucks the bookmark ribbon deeper, lifts the volume, and returns it to the reshelving cart himself — a courtesy the reading room does not require. The reshelving clerk accepts it without comment and writes a short note in a pocket log that is not the patron register. You have been noticed, precisely and quietly, in a record the archive does not publish.`;
        addNarration('The Closed Page', 'The patron closes the volume the moment the bench across from his empties and someone sits. He does not look up. He tucks the bookmark ribbon deeper, lifts the volume, and returns it to the reshelving cart himself — a courtesy the reading room does not require. The reshelving clerk accepts it without comment and writes a short note in a pocket log that is not the patron register. You have been noticed, precisely and quietly, and the log that now holds your description is not one the archive publishes.');
      }
    }
  },

  {
    label: "An apprentice name sits on the yard rolls without a commission assignment.",
    tags: ['Stage2'],
    tag: 'risky',
    xpReward: 34,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(34, 'cross-checking shipwright apprentice rolls against commissions');
      var roll = rollD20('spirit', G.skills.craft);
      if (roll.total >= 13) {
        G.flags.cos_shipwright_apprentice_found = true;
        G.investigationProgress++;
        addNarration('The Unassigned Hand', 'The apprentice rolls are kept in a salt-stained ledger on the yard master\'s bench, held open with a lead weight shaped like a fish. One name has been on the rolls for eleven months without a commission assignment — structurally impossible; unassigned apprentices rotate through berth maintenance every three weeks. The yard master scratches the side of his jaw, a habit he falls into when he is about to say something he has decided not to say. He reaches past the caulking mallet to pull the ledger closer, hand brushing the handle without registering it. The name pays yard dues promptly. The dues come from a Shelkopolis account.');
        addJournal('Shipwright yard: apprentice on rolls 11 months with no commission — Shelkopolis-sourced dues payment', 'evidence');
        maybeStageAdvance();
      } else {
        G.lastResult = `The yard master closes the rolls ledger before the question is finished and slides the lead weight off the cover with the flat of his hand. Apprentice registration is a trade guild record, he says, and trade guild records require a trade guild credential to review. The yard smells of pine tar and cold iron. Two apprentices near the slipway have stopped planing a hull plank and are listening without appearing to listen. The ledger goes back on the shelf, the weight placed on top of it like a seal.`;
        addNarration('Yard Protocol', 'The yard master closes the rolls ledger before the question is finished and slides the lead weight off the cover with the flat of his hand. Apprentice registration is a trade guild record, he says, and trade guild records require a trade guild credential to review. The yard smells of pine tar and cold iron. Two apprentices near the slipway have stopped planing a hull plank and are listening without appearing to listen. The ledger goes back on the shelf above the bench, and the yard master places the weight on top of it like a seal.');
      }
    }
  },

  {
    label: "The tax hall posting runs one column short this quarter.",
    tags: ['Stage2'],
    tag: 'risky',
    xpReward: 38,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(38, 'reviewing Cosmoria tax hall quarterly revenue summary');
      var roll = rollD20('wits', G.skills.wits);
      if (roll.total >= 14) {
        G.flags.cos_tax_summary_reviewed = true;
        G.investigationProgress++;
        addNarration('Missing Column', 'The tax hall summary is displayed behind glass in the public atrium, quarters posted left to right. The most recent quarter has six revenue columns where every prior quarter posts seven. The missing column, on the older postings, is labeled "Harbor Exemption Revenue Recovered" — a recovery category that captures duty on retroactively disqualified cargo exemptions. The new posting has the label removed entirely, not zeroed out. Coralyn\'s notation in the archive back-reference file flagged the omission eight weeks ago. No correction has been issued. The summary still hangs behind glass.');
        addJournal('Tax hall summary missing Harbor Exemption Revenue column — archivist notation pending eight weeks without correction', 'evidence');
        maybeStageAdvance();
      } else {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `A tax hall monitor approaches from the side corridor before the posted glass has been read in full. Public posting review is permitted; close reading with notetaking is a separate inquiry requiring a filed form. He produces the form from a leather folio carried specifically for this purpose. The atrium's three other occupants have all found reasons to face the opposite wall. The form asks for name, purpose, and professional affiliation. The monitor waits with the patience of someone who always wins this exchange.`;
        addNarration('Atrium Protocol', 'A tax hall monitor approaches from the side corridor before the glass has been read in full. Public posting review is permitted; close reading with notetaking is a separate inquiry that requires a filed form. He produces the form from a leather folio he carries specifically for this purpose. The atrium has three other people in it, and all three have found reasons to face the opposite wall. The form asks for name, purpose, and professional affiliation. The monitor waits. The pressure in the room has shifted without anyone raising a voice.');
      }
    }
  },

  {
    label: 'A sealed filing in the wrong stack. Collegium seal, not guild',
    tags: ['Stage2', 'Records', 'Evidence'],
    tag: 'risky',
    xpReward: 20,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(20, 'sealed collegium filing');
      G.lastResult = 'The records request is for a routine filing. What comes back includes a second document — thick paper, red wax seal, Collegium administrative mark on the flap. It is in the wrong stack. The clerk notices at the same moment you do. She takes it back without a word and files it separately, in a drawer she locks. The routine document she gives you has nothing useful in it.';
      addJournal('A Collegium-sealed filing appeared in a routine records pull at Cosmoria — the clerk retrieved it before I could examine it. Source: Cosmoria civic records office.', 'evidence');
      G.recentOutcomeType = 'success';
      G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
      maybeStageAdvance();
    }
  },

  {
    label: 'The administrator checks the same folder before answering anything',
    tags: ['Stage2', 'NPC', 'Intelligence'],
    xpReward: 15,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(15, 'collegium administrator pattern');
      G.lastResult = 'Three questions. Before each answer, her hand goes to the same slim folder on the left side of her desk — not opening it, just touching the edge. She is precise, procedural, correct in everything she says. The folder stays closed. She is not consulting it. She is checking it is still there. Whatever is in it shapes every answer she gives without ever being referenced directly.';
      addJournal('A Cosmoria Collegium administrator checks the same closed folder before answering each question — the folder never opens. Source: Cosmoria administrative office, morning session.', 'intelligence');
      G.recentOutcomeType = 'success';
      maybeStageAdvance();
    }
  },

  {
    label: 'The hold stamp is dated three weeks after the document was filed',
    tags: ['Stage2', 'Records', 'Evidence'],
    xpReward: 20,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(20, 'retroactive hold anomaly');
      G.lastResult = 'The filing date is on the cover page. The ADMINISTRATIVE HOLD stamp is on the third page, interior. Standard procedure puts it on the cover. The stamp date is three weeks after the filing date — the hold was applied retroactively, to a document that was already in circulation. There is no annotation explaining why. The archivist who pulls it for you does not seem to notice the discrepancy.';
      addJournal('An administrative hold at Cosmoria was applied retroactively — stamp date three weeks after original filing. No annotation. Source: Cosmoria civic archive, records retrieval desk.', 'evidence');
      G.recentOutcomeType = 'success';
      G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
      maybeStageAdvance();
    }
  },

  // === COLLEGIUM INVESTIGATION PATH — Chain Link 2 ===
  // Gated on collegium_contact_1; sets collegium_contact_2
  {
    label: "The Collegium intake form asks for a certifying reference. Fenwick's name opens one door.",
    tags: ['Collegium', 'Stage2', 'NPC', 'Persuasion'],
    tag: 'risky',
    xpReward: 80,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      if (!G.flags) G.flags = {};
      if (!G.flags.collegium_contact_1) {
        G.lastResult = 'The Collegium intake desk requires a certifying reference from a registered filer before opening a secondary inquiry. The weight of Cosmoria\'s long-haul trading documentation is particular in this office — every name that crosses the counter carries a registered filing history. Fenwick\'s name carries no weight here without an active certification on file. The desk clerk checks the register twice without being asked, a habit. You do not have one yet.';
        G.recentOutcomeType = 'locked';
        return;
      }
      gainXp(80, 'advancing Collegium chain at Cosmoria');
      var result = rollD20('charm', (G.skills.charm||0) + Math.floor(G.level/2));
      if (result.total >= 13) {
        G.flags.collegium_contact_2 = true;
        G.investigationProgress = (G.investigationProgress||0) + 1;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The Collegium intake desk in Cosmoria is staffed by a woman named Renne who processes secondary inquiries under a separate ledger kept on a lower shelf. The weight of long-haul trading documentation is particular in a port this size — every certified reference carries a specific gravity here. Fenwick\'s reference number clears the intake without a wait period. She reads the deviation note carbons without expression, then writes a cross-reference code in a small bound register she does not leave on the desk. "This goes to senior review," she says. She means it as information, not reassurance. The register goes back onto the lower shelf. The code is now in the system.';
        addJournal('Collegium intake officer Renne at Cosmoria accepted secondary inquiry using Fenwick\'s reference. Cross-reference code entered into senior review ledger. Source: Cosmoria Collegium intake desk.', 'intelligence');
        G.recentOutcomeType = 'success';
        maybeStageAdvance();
      } else {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'Renne reads the reference number and checks it against a list she keeps folded in the intake register. It is not on the list. "Fenwick\'s certification lapsed two rotations ago," she says. "He should have renewed." The form goes back across the desk, stamped REFER TO ORIGINATING DESK. The smell of brine-preserved cargo comes through the intake window from the harbor staging yards. The cross-reference stays unissued. The secondary inquiry path requires a current certification.';
        G.recentOutcomeType = 'blocked';
      }
    }
  },

  // ── NEW SP2 CHOICES — direct stageProgress increment ──

  {
    label: "The Tower Authority log continues below the waterline. Category 6 permit required.",
    tags: ['Stage2', 'Records', 'Evidence'],
    tag: 'risky',
    xpReward: 20,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(20, 'tower foundation log below waterline');
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var roll = rollD20('wits', G.skills.wits);
      if (roll.total >= 13) {
        G.flags.cos_tower_foundation_log = true;
        G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        G.lastResult = 'The registry office on the Titan Wharf keeps two sets of foundation records: the civic survey, which ends at the waterline, and the Tower Authority log, which continues below it. The clerk processes the lower-section request and sets a Category 6 permit form on the counter. The blank page has a watermark. The watermark is a House Shelk secondary seal — the same seal that appears on three of the Pallmark Reach decommissioning override stamps. Someone wrote the permit requirement after the records were already sealed.';
        addJournal('Tower Authority sub-waterline log requires Category 6 permit — permit form carries House Shelk secondary seal, same mark as decommissioning overrides', 'evidence');
        G.recentOutcomeType = 'success';
        maybeStageAdvance();
      } else {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
        G.lastResult = 'The clerk processes the access request — logs it, stamps it, writes the permit requirement in a careful hand. Category 6 requires a Transit Authority countersignature. The countersignature queue runs three to five days. The inquiry form goes into the daily bundle that reaches the Harbor Captain\'s administrative desk by the second bell. Your name is now in a document that Marrow Tideglass will receive by end of day.';
        addJournal('Tower Authority log access blocked — Category 6 permit required, inquiry routed to Harbor Captain', 'complication');
        G.recentOutcomeType = 'complication';
        maybeStageAdvance();
      }
    }
  },

  {
    label: "Titan Wharf seawall inscriptions were re-chiseled within the last two seasons.",
    tags: ['Stage2', 'Evidence'],
    tag: 'risky',
    xpReward: 20,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(20, 'seawall inscription re-chiseling');
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var roll = rollD20('vigor', G.skills.vigor);
      if (roll.total >= 13) {
        G.flags.cos_seawall_inscriptions = true;
        G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        G.lastResult = 'The original Titan-period seawall inscriptions on the lower wharf face are carved deep into the stone — centuries of salt weathering have rounded the edges and filled the cuts with mineral deposit. A section twelve meters long near the third anchorage berth has been freshly re-chiseled over the original marks. The new cuts are sharp, the deposit absent, the chisel angle different from the Titan toolwork above it. The re-chiseled section covers the original load-limit notation for berth seven. The weight classification that was painted over has an older stone record beneath it that someone decided also needed changing.';
        addJournal('Titan Wharf seawall: berth seven original load-limit inscription re-chiseled within two seasons — Titan stonework altered to match painted-over weight reclassification', 'evidence');
        G.recentOutcomeType = 'success';
        maybeStageAdvance();
      } else {
        G.lastResult = 'The lower wharf face is accessible at low tide only, and the tide window is shorter than expected — a salt-water channel between the third anchorage stone and the base of the seawall fills within forty minutes of the turn. The inscriptions along the foundation course are visible but not close enough to read in the available window before the water closes over the access path.';
        addJournal('Seawall inscription survey incomplete — tide window closed before foundation course accessible', 'complication');
        G.recentOutcomeType = 'complication';
        maybeStageAdvance();
      }
    }
  },

  {
    label: "The Amber Trade Authority quarterly post uses a cipher key that changed two seasons ago.",
    tags: ['Stage2', 'Records', 'Evidence'],
    tag: 'risky',
    xpReward: 20,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(20, 'Amber Trade Authority cipher change');
      if (!G.flags) G.flags = {};
      var roll = rollD20('wits', G.skills.wits);
      if (roll.total >= 14) {
        G.flags.cos_ata_cipher_change = true;
        G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        G.lastResult = 'The public Amber Trade Authority quarterly posts are filed in the municipal reading room, twelve issues deep in a cedar rack behind the periodicals desk. The cipher notation used for trade volume figures changed two seasons ago — the new notation encodes differently, which is normal for a routine cipher refresh. What is not normal: the old cipher, applied retroactively to the figures in the current issue, produces a different set of numbers. The variance matches the bonded transit volume Tavian identified at the Floating Market. Someone changed the cipher to prevent a simple backward comparison from showing what moved.';
        addJournal('Amber Trade Authority cipher changed two seasons ago — retroactive decoding of current issue with old cipher matches suppressed bonded transit volume', 'evidence');
        G.recentOutcomeType = 'success';
        maybeStageAdvance();
      } else {
        G.lastResult = 'The quarterly posts are in the cedar rack, twelve issues accessible. The cipher notation difference is visible between the older and newer issues — the formatting changed. Without the decoding key for the old cipher the comparison cannot be run. The reading room archivist confirms the cipher was refreshed two seasons ago and that the key for the prior version is held by the Trade Authority administrative office, not the reading room.';
        addJournal('Amber Trade Authority cipher change noted — prior-version key held by Trade Authority admin, not accessible through reading room', 'intelligence');
        G.recentOutcomeType = 'complication';
        maybeStageAdvance();
      }
    }
  },

  {
    label: "The House Shelk secondary seal appears on three separate Cosmoria documents.",
    tags: ['Stage2', 'Evidence'],
    tag: 'risky',
    xpReward: 20,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(20, 'House Shelk secondary seal cross-reference');
      if (!G.flags) G.flags = {};
      var roll = rollD20('wits', G.skills.wits);
      if (roll.total >= 12) {
        G.flags.cos_shelk_seal_confirmed = true;
        G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        G.lastResult = 'The Pallmark Reach decommissioning waiver, the Tower Authority Category 6 permit form, and the transit exemption waiver filed with the Harbor Captain\'s office all carry the same secondary seal: a small mark in the lower margin, House Shelk administrative format, sub-bureau designation readable under magnification. The sub-bureau mark does not appear in the current Shelk polity directory — it was dissolved fourteen months ago as part of a Shelk administrative restructuring. A dissolved sub-bureau cannot issue new documents. These three documents were all produced before the dissolution or by someone with access to the dissolved bureau\'s seal materials after it closed.';
        addJournal('House Shelk sub-bureau secondary seal on three Cosmoria documents — sub-bureau dissolved 14 months ago, seal use post-dissolution implies seal retention after closure', 'evidence');
        G.recentOutcomeType = 'success';
        maybeStageAdvance();
      } else {
        G.lastResult = 'The secondary seal mark appears on two documents laid side by side — the decommissioning waiver and the permit form. The House Shelk sub-bureau designation requires a polity directory to identify, and the current directory is a paid-access reference at the maritime law reading room three streets from the archive. The comparison is started but not finished before the reading room closes for the midday meal.';
        addJournal('House Shelk secondary seal matched on two documents — sub-bureau identification incomplete, polity directory access needed', 'intelligence');
        G.recentOutcomeType = 'complication';
        maybeStageAdvance();
      }
    }
  },

  {
    label: "Cosmouth Administrative Continuity Trust holds insurance and bonds on the same shipments.",
    tags: ['Stage2', 'Records', 'Evidence'],
    tag: 'risky',
    xpReward: 20,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(20, 'Cosmouth Administrative Continuity Trust self-dealing');
      if (!G.flags) G.flags = {};
      var roll = rollD20('spirit', G.skills.craft);
      if (roll.total >= 13) {
        G.flags.cos_continuity_trust_exposed = true;
        G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        G.lastResult = 'The entity name on the cargo insurance policy, the customs bond surety account, and the charter exemption authorization form is the same: Cosmouth Administrative Continuity Trust. One entity is insuring its own cargo, posting surety against its own customs risk, and providing its own exemption authorization. Each function is technically held by a separate administrative designation within the Trust — but the Trust\'s registered principal, traceable through the Cosmouth commercial registry, is a single name. The operation is self-certified at every financial control point. There is no external oversight layer.';
        addJournal('Cosmouth Administrative Continuity Trust is insurer, customs surety, and exemption authority on all 41 sealed shipments — single-principal self-certification, no external oversight', 'evidence');
        G.recentOutcomeType = 'success';
        maybeStageAdvance();
      } else {
        G.lastResult = 'The Cosmouth Administrative Continuity Trust is a registered entity in the Cosmouth commercial registry — public record, accessible. The connection between the insurance policy holder, the customs bond account, and the exemption authorization requires cross-referencing three separate registry systems. The Cosmouth commercial registry is accessible here. The customs bond account registry and the exemption authorization registry both sit in Cosmouth administrative jurisdiction, not Cosmoria\'s.';
        addJournal('Cosmouth Administrative Continuity Trust confirmed in commercial registry — full cross-reference requires Cosmouth registry access', 'intelligence');
        G.recentOutcomeType = 'complication';
        maybeStageAdvance();
      }
    }
  },

,

  // ── SP2-ADVANCING CHOICES (canonical NPCs: Halv Tidereach, Aurek Tidereach, Sena Crestwave, Doran Wavecrest, Mira Sealedger) ──

  {
    label: "Halv Tidereach has pulled the same Harbor Registry folio three times this week.",
    tags: ['Investigation', 'Stage2', 'Lore'],
    plot: 'main',
    tag: 'safe',
    failResult: "The Harbor Registry's public reading hours end before the folio circulation log can be found. The duty archivist names no patrons. The log stays closed, and the pattern stays unconfirmed for now.",
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'cross-checking Harbor Registry folio circulation against Halv Tidereach access log');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('lore', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_halv_tidereach = true;
        G.investigationProgress++;
        G.stageProgress[2]++;
        G.lastResult = 'The Harbor Registry circulation log is kept in a cloth-bound book under the duty desk, each folio pull recorded by number and patron name. Halv Tidereach appears three times in eight days against the same folio number: the vessel licensing block covering decommissioned registrations from the previous decade. The duty archivist reads the entry twice before closing the log — she looks up at the shelf where the folio lives, then back. The folio has not been returned to its slot. It is still out, under a patron hold. Halv renewed the hold that morning.';
        addJournal('Harbor Registry: Halv Tidereach holds decommissioned-vessel licensing folio — renewed same morning, three pulls in eight days', 'evidence', `cos-halv-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        addHeat('cosmouth', 1);
        G.lastResult = 'The circulation log is an administrative record, not a public document. The duty archivist explains the distinction and offers the public index instead. While the index is being processed, a clerk at the far desk writes a brief note and places it in the outgoing administrative tray. The tray routes to the Harbor Captain\'s office. A registry inquiry has been logged, and the name given at the desk is now in the system.';
        addJournal('Harbor Registry circulation log access denied — inquiry logged, routed to Harbor Captain', 'complication', `cos-halv-fail-${G.dayCount}`);
      } else {
        G.flags.met_halv_tidereach = true;
        G.investigationProgress++;
        G.stageProgress[2]++;
        G.lastResult = 'The duty archivist confirms patron access to folio blocks without releasing names — a compromise between public record and patron privacy. "A single folio block has had repeated holds placed on it this week by the same registered patron." She closes the log. "That block covers decommissioned vessel registrations, prior decade." She straightens the log against the desk edge with both hands and says nothing more. The folio is still out. The patron is registered with the Harbor Registry office.';
        addJournal('Harbor Registry: same patron holds decommissioned-vessel folio block repeatedly this week — patron registered, folio not yet returned', 'intelligence', `cos-halv-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Mira Sealedger's Merchant Fleet Office accounts show a dormant column reactivated.",
    tags: ['Investigation', 'Stage2', 'Craft'],
    plot: 'main',
    tag: 'risky',
    failResult: "The Merchant Fleet Office's secondary accounts are audited quarterly and are not open to non-credentialed review. Mira Sealedger processes the denial correctly, dates it, and files it in the tray that goes to Harbor Authority oversight.",
    xpReward: 75,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(75, 'reviewing Merchant Fleet Office dormant-account reactivation with Mira Sealedger');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('craft', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_mira_sealedger = true;
        G.investigationProgress++;
        G.stageProgress[2]++;
        G.lastResult = 'Mira Sealedger maintains the Merchant Fleet ledger at a standing desk beside a salt-fogged window that rattles in the tidal wind. She sets the account book open to the dormant column without prompting — she has been expecting someone to come. The column was inactive for four years before reactivating eight months ago. The reactivation authorization is signed by a Cosmouth Fleet Continuity representative whose name does not appear on any current Cosmouth commercial directory. "I wrote to the Continuity office three times asking for current credentials," she says. "The replies confirmed the account was authorized. No credentials were attached." She does not close the book.';
        addJournal('Merchant Fleet Office: dormant account reactivated 8 months ago by Cosmouth Fleet Continuity rep — credentials never supplied despite three written requests from Mira Sealedger', 'evidence', `cos-mira-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = 'Mira processes the account review request, logs it, and reaches for the standard denial form before it is finished. Secondary Fleet accounts require a Trade Hall credentialing letter. The form she fills out goes into a tray labeled HARBOR AUTHORITY REFERRAL — she labels it herself, unhurried. Two forms. One for the denial and one for the referral. She dates both and thanks you for coming in.';
        addJournal('Merchant Fleet secondary account access denied — Harbor Authority referral form completed by Mira Sealedger, double-logged', 'complication', `cos-mira-fail-${G.dayCount}`);
      } else {
        G.flags.met_mira_sealedger = true;
        G.investigationProgress++;
        G.stageProgress[2]++;
        G.lastResult = 'The dormant column in the Merchant Fleet ledger ran zero entries from four years before the current period until eight months ago — a clean gap visible in the binding where pages go unturned long enough to take a slight set. Mira Sealedger opens it to the reactivation date and points to the authorization line without speaking first. The authorizing name is from a Cosmouth Fleet Continuity office. The column now runs cargo tonnage entries on a regular schedule. The tonnage figures are consistent and round in a way that real cargo rarely is.';
        addJournal('Merchant Fleet ledger: dormant column reactivated 8 months ago — Cosmouth Fleet Continuity authorization, tonnage entries suspiciously round', 'intelligence', `cos-mira-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Sena Crestwave watched the night platform loading from the Sea Wall Lookout. She has notes.",
    tags: ['NPC', 'Stage2', 'Stealth'],
    plot: 'main',
    tag: 'bold',
    failResult: "Sena Crestwave is not at the Sea Wall Lookout at the expected hour. A posted notice says the lookout is under scheduled maintenance for two days. The notice is new — the paint on the clip holding it is still wet.",
    xpReward: 78,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(78, 'meeting Sena Crestwave at the Sea Wall Lookout for night-platform observation notes');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('stealth', (G.skills.finesse||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_sena_crestwave = true;
        G.investigationProgress++;
        G.stageProgress[2]++;
        G.lastResult = 'Sena Crestwave keeps watch at the upper lookout platform in the hour before and after the tidal turn — a habit, not a posting. She has a notebook of observations: dates, tide readings, cargo movements visible from the lookout height. Four pages cover the night platform. Sealed container movements appear on eleven nights matching the departure schedule; on each, she noted that the outer gangway went unattended during the crew rotation. She also noted the positions — brake winch and gangway post — and wrote a single annotation: "same gap, deliberate?" She did not know who to bring the question to. She gives you the four pages and retains a copy she made last week.';
        addJournal('Sea Wall Lookout: Sena Crestwave observation notes — 11 sealed-container nights, crew rotation blind spot at brake winch and gangway post documented with personal copy retained', 'evidence', `cos-sena-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'The Sea Wall Lookout platform is accessible by a single stair that opens onto a narrow stone walk above the third seawall tier. The approach is visible from the night platform below — open, lit by the harbor lamps, no cover. A dock hand near the mooring cleats tracks the movement without turning his head. Whatever Sena Crestwave has observed from here, the path to the lookout is not one that allows an unnoticed arrival.';
        addJournal('Sea Wall Lookout approach visible from night platform — dock hand observed movement to lookout stair', 'complication', `cos-sena-fail-${G.dayCount}`);
      } else {
        G.flags.met_sena_crestwave = true;
        G.investigationProgress++;
        G.stageProgress[2]++;
        G.lastResult = 'Sena keeps a running observation log in a small cloth notebook she carries in her coat. She pages through it at the lookout railing, wind pulling at the edges, and marks four entries with her thumbnail — nights she noticed the outer gangway unattended during crew rotation while sealed containers were staged below. "I assumed it was lazy shift management," she says. "Four times is a pattern." She reads the entries aloud, dates and positions, then closes the notebook and keeps it. She gives what she has by word rather than paper, watching the platform below while she speaks.';
        addJournal('Sea Wall Lookout: Sena Crestwave observed outer gangway unattended during sealed container nights — 4 instances, dates noted verbally', 'intelligence', `cos-sena-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Doran Wavecrest filed a Cosmouth Trade Hall complaint. It was reclassified before a hearing.",
    tags: ['NPC', 'Stage2', 'Persuasion'],
    plot: 'main',
    tag: 'risky',
    failResult: "Doran Wavecrest is not in the Trade Hall today. A clerk at the hall's front desk confirms his complaint was reclassified three weeks ago and does not have a scheduled hearing date. The clerk has already filled in the inquiry form before the question is finished.",
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'speaking with Doran Wavecrest about his reclassified Cosmouth Trade Hall complaint');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('charm', (G.skills.charm||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_doran_wavecrest = true;
        G.investigationProgress++;
        G.stageProgress[2]++;
        G.lastResult = 'Doran Wavecrest meets at the Tidal Anchor Inn\'s back corner table — his coin on the table for two cups before the conversation starts. He filed his Trade Hall complaint ten months ago: cargo misclassification, systematic, consistent with a deliberate scheme. Reclassified from hearing-eligible to an administrative irregularity notice three weeks after filing. He sets the original complaint and the reclassification notice on the table and smooths the corner of the complaint with his thumb. "I know what I filed. Reclassification means the hearing never happens." He kept both documents because he expected to need them.';
        addJournal('Doran Wavecrest: Trade Hall cargo misclassification complaint reclassified to administrative notice 3 weeks after filing — original complaint and reclassification notice held, hearing prevented by reclassification', 'evidence', `cos-doran-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'Doran Wavecrest is at the Trade Hall counter when the approach comes. He looks at the door, then at the clerk behind the counter who is already writing something in the inquiry log. He takes a half-step back from the conversation. "I have an active administrative matter," he says, low enough that it is not overheard. "I cannot discuss it during the review period." The clerk has stopped writing and is listening. Doran straightens and asks for a copy of his reclassification notice in a full voice. He is doing the thing that keeps him safe in this room.';
        addJournal('Doran Wavecrest declined Trade Hall conversation — active administrative review period, Trade Hall clerk present', 'complication', `cos-doran-fail-${G.dayCount}`);
      } else {
        G.flags.met_doran_wavecrest = true;
        G.investigationProgress++;
        G.stageProgress[2]++;
        G.lastResult = 'Doran is at the harbor end of the Tidal Anchor Inn\'s common room, salt on his coat from a morning delivery run. He confirms the complaint was reclassified. "Filed a hearing-eligible dispute. Got an administrative irregularity notice back. No hearing, no ruling, no record." He keeps his voice level — he\'s had this conversation with himself enough times that the anger has settled into a drier register. "The reclassification decision came from the Cosmouth regional Trade Hall office. Not the local one. I didn\'t file with the regional office." He finishes the cup and puts it down exactly in the ring it left on the table.';
        addJournal('Doran Wavecrest complaint reclassified by Cosmouth regional Trade Hall — not the local office where complaint was filed, no hearing issued', 'intelligence', `cos-doran-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  // ── NEW EXPANSION — Maritime Archive Arc (+25) ──

  {
    label: "Coralyn's archive shelf has no catalog entry. The spines face inward.",
    tags: ['Maritime', 'Stage2'],
    tag: 'risky',
    xpReward: 74,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'cross-referencing uncataloged archive shelf against public index');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.coralyn_hidden_shelf_found = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Coralyn squares the catalog binder against the counter edge before opening it — both hands, a precise alignment. The shelf in question holds eleven bound volumes, spines reversed. None appear in the public index. She opens the catalog to the relevant section and points to a gap in the sequential numbers: entries 1140 through 1150 are listed as ADMINISTRATIVE HOLD, no description, no access date, no reviewing officer recorded. The hold notation is in a different ink weight from the surrounding entries. It was added after the original catalog was compiled, and the person who added it did not sign the margin.';
        addJournal('Cosmoria archive: uncataloged shelf — entries 1140-1150 under administrative hold, added after catalog compiled, unsigned', 'evidence', `cos-shelf-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        addHeat('cosmouth', 1);
        G.lastResult = 'The shelf is behind the archive counter. Non-archivist access to the counter area requires a registered researcher credential. Coralyn processes the credentialing request at the front desk and notes the name in the inquiry log — the log that routes to the Harbor Captain\'s administrative office. The shelf stays behind the counter. The access log has a new entry. The ink is still wet on the date line when the door closes.';
        addJournal('Archive counter access denied — credentialing inquiry logged, routed to Harbor Captain', 'complication', `cos-shelf-fail-${G.dayCount}`);
      } else {
        G.flags.coralyn_hidden_shelf_found = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The catalog gap is visible without going behind the counter — the sequential numbers skip a block, and the printed index entry reads ADMINISTRATIVE HOLD in abbreviated form. Coralyn confirms the volumes exist. "That block has been under hold for fourteen months." She squares the binder against the desk edge before closing it. "The hold was applied by an authority code that does not correspond to any currently active administrative office I have a record for." She has checked. More than once.';
        addJournal('Cosmoria archive: catalog entries 1140-1150 under hold from unidentified authority code — 14 months, Coralyn confirmed code unmatched in current records', 'intelligence', `cos-shelf-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The airship dock has a manifest office that is not in the public directory.",
    tags: ['Maritime', 'Stage2'],
    tag: 'bold',
    xpReward: 78,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(78, 'locating and accessing the unlisted airship dock manifest office');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('finesse', (G.skills.finesse||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.unlisted_manifest_office_found = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The door at the north end of the dock service corridor is unmarked — no directory plate, no posted hours, no access requirement notice. Inside, a single standing desk holds a stack of manifest duplicates in a format distinct from the public copies: these carry a handwritten column on the right margin labeled "DL" with single-letter entries. Salt crust on the windowsill indicates the window has not been opened in months. A fresh cargo crane schedule is pinned to the board above the desk. Someone visits this office regularly but does not advertise its existence. The DL entries, cross-referenced against the night airship departure log, all precede departures by the same interval: six to eight hours.';
        addJournal('Unlisted manifest office at dock north corridor: duplicate manifests with handwritten DL column — entries precede every night departure by 6-8 hours', 'evidence', `cos-manifestoffice-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = 'The corridor is narrower than it appears from the dock entry — salt timber and low light, rigging lines stacked against the east wall. A dock supervisor comes out of the service stair before the unmarked door is reached. He does not ask a question. He stands in the corridor, blocking the approach by presence alone, and waits to see what happens next. He has a pocket ledger clipped to his belt and his hand rests near it. The corridor is a dead end from this point. He knows that.';
        addJournal('North dock corridor approach blocked — dock supervisor presence without verbal challenge, observation logged in pocket ledger', 'complication', `cos-manifestoffice-fail-${G.dayCount}`);
      } else {
        G.flags.unlisted_manifest_office_found = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The unmarked door at the dock\'s north service corridor opens to an unoccupied office. A standing desk, a pinboard with a cargo crane schedule, a stack of manifest duplicates in a format the public archive does not carry. The right margin of each duplicate carries a handwritten column not present on the public version. The column header is "DL." The entries are single letters. There is no time to cross-reference them before voices in the corridor outside move closer.';
        addJournal('Unlisted dock office: manifest duplicates with handwritten DL margin column, format not in public archive — cross-reference incomplete', 'intelligence', `cos-manifestoffice-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Nerissa's shrine records predate the suppression pattern by eleven months.",
    tags: ['NPC', 'Stage2'],
    tag: 'risky',
    plot: 'main',
    xpReward: 76,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(76, 'tracing Nerissa Tideglass shrine records against the suppression timeline');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.nerissa_predates_suppression = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Nerissa spreads the full observation ledger on the shrine\'s record table — two years and three months, dated entries, tide amplitude and glyph activity side by side. Salt air moves through the open seaward arch. The first anomalous tidal entry predates the earliest sealed container declaration by eleven months exactly. She traces the entry with a careful finger. "I recorded a dual-tide amplitude event that didn\'t match any seasonal model I had. I couldn\'t explain it and I didn\'t try." She pauses. "Someone was testing the schedule. This is from before they committed to it." The first event was a trial run.';
        addJournal('Nerissa shrine record: anomalous tidal event 11 months before first sealed container — pattern implies operational trial run preceding full deployment', 'evidence', `cos-nerissa2-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.reverence = (G.worldClocks.reverence||0) - 1;
        G.lastResult = 'Nerissa closes the observation ledger before it is fully on the table. "The shrine\'s records are devotional documents, not administrative ones. Pulling them for a civil audit purpose requires a written request through the polity\'s religious liaison office." She says it gently, which makes it harder to argue with. The salt-scented wind from the harbor arch moves through the silence. She has not decided to refuse — she has decided she needs the form first.';
        addJournal('Sea shrine records access declined — religious liaison office form required for civil audit use', 'complication', `cos-nerissa2-fail-${G.dayCount}`);
      } else {
        G.flags.nerissa_predates_suppression = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Nerissa opens the ledger to the earliest anomalous entry and sets it on the table without prompting. The date is eleven months before the first sealed container declaration in Tavian\'s bonded transit log. "I had no framework for it at the time," she says. "The amplitude was within normal range but the dual-tide correlation was unusual." She marks the entry with a ribbon and leaves the ledger open. The discrepancy was real before the operation existed in the documentary record.';
        addJournal('Nerissa shrine ledger: anomalous tidal entry 11 months before first bonded transit declaration — pre-dates documentary evidence of operation', 'intelligence', `cos-nerissa2-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Marrow's cargo logs have two weight columns. The second set never matches the manifest.",
    tags: ['Maritime', 'Stage2'],
    tag: 'risky',
    xpReward: 80,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(80, 'cross-referencing cargo weight columns against night airship manifests with Marrow');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.marrow_dual_weight_column = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Marrow sets the cargo log on the desk without sitting down. His hands stay at his sides while he speaks. The second weight column is a private manifest addendum — required by a non-coastal authority, he says the name of the office flatly, the same tone he uses for tidal forecasts. The addendum cites a classification that does not exist in the public shipping registry. He opens the chart table drawer, removes a folded copy of the addendum authorization, and places it on the desk between you. He does not push it toward you. "It came with the waiver instruction," he says. "The same week."';
        addJournal('Marrow cargo log: second weight column added per non-coastal authority addendum — classification unregistered in public shipping registry, authorization held in chart table', 'evidence', `cos-marrow2-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'Marrow listens to the question about the dual columns and then asks for the purpose of the inquiry in writing. The form is pre-positioned on the corner of the desk — a practiced reach, not a search. Brine and rope-tar smell moves through the Harbor Captain\'s office from the dock-facing window. He dates the form himself. The inquiry is now logged in the administrative record and linked to the access log already in Coralyn\'s archive. Two logs. One name.';
        addJournal('Cargo log dual-column inquiry — Harbor Captain logged and cross-filed with archive access record', 'complication', `cos-marrow2-fail-${G.dayCount}`);
      } else {
        G.flags.marrow_dual_weight_column = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Marrow acknowledges the second column exists. "Private manifest addendum. Required by the waiver authority." His hands stay at his sides. He does not open the chart table. "The second column records what the addendum requires me to record. It does not match the public manifest because it is not the public manifest." He marks three entries with a grease pencil — the highest variance between the two columns — and steps back from the desk. He does not explain why those three. He does not need to.';
        addJournal('Marrow confirms dual-column private addendum — variance entries marked without explanation, three highest-variance nights identified', 'intelligence', `cos-marrow2-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The harbormaster's authority log shows a gap. Eight months, no routing disputes filed.",
    tags: ['Harbor Authority', 'Stage2'],
    tag: 'risky',
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'auditing harbormaster routing dispute log for the sealed container period');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.harbormaster_gap_found = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The harbormaster\'s routing dispute log is a public instrument — posted quarterly, available at the Harbor Authority intake desk. A busy port generates routing disputes: berth conflicts, priority challenges, cargo staging disagreements. Cosmoria\'s log runs dense for the year before the sealed container period and dense for the months after. The eight months in the middle carry four entries, all minor, none involving night platform operations. Every operator who might have challenged the sealed container priority routing stayed silent. The silence is coordinated or coerced. Neither option is recorded in the log.';
        addJournal('Harbormaster dispute log: 8-month gap in night platform challenges during sealed container period — pre- and post-period logs dense, gap structurally anomalous', 'evidence', `cos-hmgap-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'The Harbor Authority intake desk processes the log request and sets the current quarter\'s volume on the counter. The counter clerk notes the inquiry in the administrative log — the one that routes to Marrow Tideglass\'s office by end of day — before opening the volume to the index page. The previous quarters are in the archive section, which requires a separate access form. The form is two pages. The clerk has already filled in the date.';
        addJournal('Harbormaster dispute log: only current quarter accessible at intake — prior quarter access requires separate form, inquiry logged to Harbor Captain', 'complication', `cos-hmgap-fail-${G.dayCount}`);
      } else {
        G.flags.harbormaster_gap_found = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Three years of routing dispute logs laid out in sequence show a clear difference in the eight-month sealed container period. Normal operational tempo generates fifteen to twenty entries per quarter. The sealed container quarters carry four total. A busy working port doesn\'t go quiet on its own. Operators who file disputes regularly either stopped or were told not to. The log doesn\'t record either possibility.';
        addJournal('Harbormaster log: dispute entries drop from 15-20/quarter to 4 total across 8-month sealed container period', 'intelligence', `cos-hmgap-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Tavian's bonded transit column links to a Fairhaven trade house that closed two years ago.",
    tags: ['Maritime', 'Stage2', 'Cross-Locality'],
    tag: 'risky',
    plot: 'main',
    xpReward: 82,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(82, 'cross-referencing Tavian bonded transit buyer records against Fairhaven trade house registry');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('spirit', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.fairhaven_trade_house_link = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The bonded transit buyer field in Tavian\'s ledger lists a Fairhaven trade house name for thirty-eight of the forty-one sealed container entries. A Fairhaven commercial registry cross-check — Tavian keeps one on the shelf behind his desk, updated annually — shows the trade house dissolved two years ago, six months before the first sealed container arrived. A dissolved buyer cannot complete bonded transit. Tavian sets the registry page next to his ledger and flattens both with the heel of his hand. "I processed those entries. The buyer name cleared the system." He means the name was in the system. Not that the house existed.';
        addJournal('Tavian bonded transit buyer: Fairhaven trade house on 38 of 41 entries — dissolved 2 years ago, 6 months before first sealed cargo, name still active in system', 'evidence', `cos-fairhaven-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = 'Tavian opens his mouth and then closes it. The bonded transit buyer records fall under the active Cosmouth administrative audit — he explained this. His hands press flat on the desk. The audit notice in the document tray behind him is still white at the edges. Someone filed it three days ago, timed to sit directly across the path of exactly this question. The timing is not a coincidence and Tavian knows it and knows that pointing it out would be a formal allegation requiring a signed statement.';
        addJournal('Bonded transit buyer records blocked — Cosmouth audit filed 3 days prior, timing noted by Tavian', 'complication', `cos-fairhaven-fail-${G.dayCount}`);
      } else {
        G.flags.fairhaven_trade_house_link = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The buyer field in the bonded transit entries carries a Fairhaven trade house name. Tavian pulls the commercial registry from the shelf without being asked — he reaches past the caulking mallet and a stack of tariff references to get it. The trade house dissolved two years ago. "The system accepted the entry," he says. "The name was in the validation index even after dissolution. I didn\'t know the house had closed." He reads the dissolution date again. He knew something was wrong with the entries. He didn\'t know the buyer was already gone.';
        addJournal('Bonded transit buyer: Fairhaven trade house dissolved 2 years before first cargo — still in validation index, Tavian confirmed entries cleared system without flagging dissolution', 'intelligence', `cos-fairhaven-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The harbormaster's counter-seal on the night manifest is always the same two initials.",
    tags: ['Harbor Authority', 'Stage2'],
    tag: 'risky',
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'tracing the Harbor Authority counter-seal pattern on night manifests');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('finesse', (G.skills.finesse||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.harbor_counterseal_identified = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Standard Harbor Authority procedure rotates the counter-sealing officer across a pool of eight registered signatories. Night manifests carry the initials of whoever was on duty. The sealed container departures carry the same two initials — every one, eight months, forty-one manifests. The duty rotation log is a public instrument. On sealed container nights the duty assignment was changed at short notice, always to the same officer, always without a recorded reason. The officer retired from the Harbor Authority six weeks ago. The retirement was effective immediately, no transition period.';
        addJournal('Harbor Authority counter-seal: same two initials on all 41 sealed-container manifests — duty assignment changed at short notice each time, officer retired immediately 6 weeks ago', 'evidence', `cos-counterseal-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'The duty rotation log for the Harbor Authority counter-sealing pool is an administrative record, not a public instrument. The duty clerk at the front desk explains this clearly and offers the public manifest index as an alternative. She fills in the inquiry form — name, purpose, date — before completing the explanation. The form goes into the outgoing administrative tray. Marrow Tideglass\'s office receives administrative tray items twice daily.';
        addJournal('Harbor Authority duty rotation log: administrative record, not public — inquiry logged to Harbor Captain twice-daily tray', 'complication', `cos-counterseal-fail-${G.dayCount}`);
      } else {
        G.flags.harbor_counterseal_identified = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The night manifests in the public archive carry the counter-sealing initials clearly — it is a required field. Comparing the initials across sealed container departures takes under twenty minutes. The same two letters appear on every manifest for eight months. Harbor Authority counter-sealing rotates. This did not. The rotation records themselves are administrative, not public, but the manifests tell the same story from the outside.';
        addJournal('Night manifest counter-seal: same initials on all sealed-container manifests over 8 months — rotation pattern broken, rotation log not accessible', 'intelligence', `cos-counterseal-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Selka's inn had a standing reservation for five rooms on every sealed container night.",
    tags: ['NPC', 'Stage2'],
    tag: 'risky',
    xpReward: 66,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'reviewing Selka Tideglass booking records for the sealed container nights');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('charm', (G.skills.charm||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.selka_five_rooms_pattern = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Selka opens the main booking ledger this time, not the private one. She thumbs to the sealed container dates without hesitation — she has looked at them herself. Five rooms reserved on each of forty-one nights, same account name, same single-night stay pattern. "They never used more than three. Two rooms sat empty every time." She turns the ledger toward you and points to the reservation block with one finger. "Pre-reserved capacity. Someone needed to know those rooms would be available." She lowers her voice. "And needed to know I\'d be too busy with a full booking to notice what else was happening on the dock."';
        addJournal('Selka inn: 5 rooms pre-reserved on every sealed container night for 8 months — same account, same single-night pattern, 2 rooms consistently unused', 'evidence', `cos-selka3-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = 'Selka wipes down the counter — a long, deliberate pass across a surface that doesn\'t need it. "A harbor inn that discusses booking patterns with strangers loses its trade inside a month." She sets the cloth down. "Whatever brought you to Cosmoria, the answer isn\'t in my ledger." She picks the cloth back up. Her thumb finds a scratch on the counter edge and works at it without looking down. She is done with this conversation and she is going to wait out the silence until whoever is standing across from her understands that.';
        addJournal('Selka declined booking pattern inquiry — harbor discretion cited, conversation ended', 'complication', `cos-selka3-fail-${G.dayCount}`);
      } else {
        G.flags.selka_five_rooms_pattern = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Selka confirms a standing block reservation pattern without opening the ledger. "Five rooms, single night, same account for the past several months. They haven\'t used all five on any given night." She picks up the cloth and holds it. "I noticed because unused reserved rooms cost me other bookings. It happened too regularly to be coincidence." She doesn\'t say the account name. She glances at the ledger shelf, then back.';
        addJournal('Selka confirmed 5-room standing block reservation on sealed container nights — same account, single night, rooms consistently underused', 'intelligence', `cos-selka3-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The airship lane suppression schedule runs six weeks ahead of the public shipping calendar.",
    tags: ['Airship', 'Stage2'],
    tag: 'risky',
    plot: 'main',
    xpReward: 76,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(76, 'cross-referencing airship lane suppression schedule against public shipping calendar');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.suppression_schedule_lead = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The Airship Lane Registry posts suppression windows — mandatory routing restrictions, weather or administrative — in the public calendar thirty days in advance. Laid against the sealed container departure dates, the suppression windows appear on schedule precisely six weeks before each departure, not thirty days. Six weeks is the internal planning window, not the public one. Someone with access to the internal scheduling layer was building the departure plan against a calendar the public did not have access to. The sealed container operation was planned from inside the lane registry\'s administrative process.';
        addJournal('Airship lane suppression windows precede sealed container departures by 6 weeks — matches internal planning cycle, not 30-day public calendar; operation planned from inside registry', 'evidence', `cos-suppress-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        addHeat('cosmouth', 1);
        G.lastResult = 'The Airship Lane Registry maintains its own administrative calendar that is not the same document as the public shipping calendar. A registry clerk processes the comparison request — logs it, stamps it, explains that the internal scheduling calendar is an operational document requiring a route operator credential to access. The public calendar is available at the port authority reading stand. The inquiry goes into the administrative log. It will reach the night platform supervisor\'s desk by evening.';
        addJournal('Airship Lane Registry internal calendar access denied — operator credential required, inquiry logged to port authority', 'complication', `cos-suppress-fail-${G.dayCount}`);
      } else {
        G.flags.suppression_schedule_lead = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The public shipping calendar and the sealed container departure dates, compared date by date, show that suppression windows appear six weeks before each departure rather than the standard thirty-day public notice. The registry\'s public notice cycle is thirty days. Six weeks implies either an internal document or advance notification from someone within the registry process. The suppression windows did not create the departure schedule — the departure schedule created the suppression windows, and the windows were built with more lead time than the public calendar provides.';
        addJournal('Airship lane suppression windows: 6-week lead vs 30-day public cycle — suppression windows appear to be scheduled around departures, not vice versa', 'intelligence', `cos-suppress-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The compound transit route runs through a corridor that has no listed operator.",
    tags: ['Airship', 'Stage2'],
    tag: 'bold',
    xpReward: 80,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(80, 'tracing the unlisted airship corridor operator in the lane registry');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('finesse', (G.skills.finesse||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.unlisted_corridor_operator = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The airship lane registry lists every active corridor with a registered operator. The corridor used by the night airship for sealed container departures shows an operator field that reads: COSMOUTH ADMINISTRATIVE CONTINUITY — TRANSIT PROVISIONAL. The provisional designation means the corridor operates under a temporary grant of use, not a standard operator license. Provisional grants expire after ninety days and require renewal. This provisional grant has been renewed eleven times in fourteen months. Each renewal was processed by the same two-letter authorization code that appears on the night manifest counter-seal. The same person approved the corridor and sealed the manifests.';
        addJournal('Night airship corridor operator: Cosmouth Administrative Continuity provisional grant — renewed 11 times in 14 months by same authorization code that counter-sealed manifests', 'evidence', `cos-corridor-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        addHeat('cosmouth', 1);
        G.lastResult = 'The airship lane registry is an administrative database administered jointly by the Cosmouth and Harbor Authority offices. Corridor operator information for active routes requires a route operator credential or a joint authority referral. The clerk at the registry desk fills in two forms before explaining either requirement. The forms go to separate offices. The smell of brine-preserved rope comes through the registry\'s street-side window. By tomorrow morning, two offices will have a record of the same inquiry from the same name.';
        addJournal('Airship corridor operator data requires joint Cosmouth/Harbor Authority referral — two forms filed, inquiry cross-logged in both offices', 'complication', `cos-corridor-fail-${G.dayCount}`);
      } else {
        G.flags.unlisted_corridor_operator = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The night airship corridor shows a provisional operator designation in the lane registry rather than a standard operator license. The provisional grant field reads "Cosmouth Administrative Continuity." Provisional grants are supposed to expire at ninety days. This one has been renewed. The renewal log is accessible — it is part of the provisional grant record. The grant has been renewed eleven times. The authorization code on each renewal is the same two-letter code.';
        addJournal('Night airship corridor: provisional operator grant renewed 11 times — Cosmouth Administrative Continuity designation, same two-letter auth code on each renewal', 'intelligence', `cos-corridor-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The harbormaster's written objection was returned unsigned. No record of who received it.",
    tags: ['Harbor Authority', 'Stage2'],
    tag: 'risky',
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'tracing the routing of Marrow\'s written objection to the sealed cargo waivers');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('charm', (G.skills.charm||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.marrow_objection_returned = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Marrow shows the returned objection without being asked to sit. The document bears a stamp he has never been able to identify — not a Cosmouth administrative mark, not a Harbor Authority seal, a third mark in the lower margin that does not appear in any of the polity directory formats he has checked. The objection was returned by courier, no cover letter, no recipient signature, no routing record attached. It came back in the same envelope he sent it in, resealed. The same envelope. "Whoever received it had access to my outgoing correspondence before it reached its destination," he says. He says it flat.';
        addJournal('Marrow\'s written objection returned in original envelope, resealed — unidentified third-mark stamp in margin, no recipient signature, no routing record; implies courier intercept', 'evidence', `cos-objection-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'Marrow listens to the question and then straightens the papers on the corner of his desk — a small, precise alignment, the same habit as squaring a form. "My administrative correspondence is an internal Harbor Authority matter." He does not open the objection file. "What you\'re asking requires a formal Harbor Authority process inquiry. I can provide the form." He reaches for the drawer without hostility. He has made this offer before and the offer has an answer that is part of the process.';
        addJournal('Marrow declined objection file question — formal Harbor Authority process inquiry form offered', 'complication', `cos-objection-fail-${G.dayCount}`);
      } else {
        G.flags.marrow_objection_returned = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Marrow confirms the objection was returned. He doesn\'t get up or open a file. "Sent to the Cosmouth administrative office named in the waiver instruction. Came back a week later. No cover letter, no signature." His hands stay at his sides. "The return had a stamp I couldn\'t place." He identifies the Cosmouth office by name. The name matches the override authority on the dock platform weight reclassification.';
        addJournal('Marrow objection returned unsigned from Cosmouth administrative office — same office named in dock platform weight reclassification override', 'intelligence', `cos-objection-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The transit staging area has a second floor. The stairs aren't on the building plans.",
    tags: ['Airship', 'Stage2'],
    tag: 'bold',
    xpReward: 84,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(84, 'locating the unlisted second floor in the airship compound transit staging area');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('vigor', (G.skills.vigor||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.staging_second_floor_found = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The building plans on file show a single-story staging structure, two cargo bays, standard internal layout. The exterior wall on the harbor side rises a full three meters above the roofline shown on those plans — the extra height is visible from the sea wall and from any vantage above the dock level. Inside, behind a false partition at the back of bay two, an iron stair leads up. The upper floor is not finished as a storage space. It has a desk, a lamp bracket, and a tide table pinned to the wall — the same discontinued Cosmouth tide calendar Nerissa uses for comparison. Someone works here on the nights the airships load.';
        addJournal('Staging compound: unlisted second floor behind false partition — desk, discontinued Cosmouth tide calendar on wall, exterior height inconsistent with filed building plans', 'evidence', `cos-secondfloor-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = 'The staging compound exterior is visible from the public dock walkway. The interior is not — the cargo bay doors are sealed and the side entry requires a bonded carrier credential. A harbor watchman on the dock walkway has noticed the observation of the building\'s exterior height. He does not approach immediately. He notes the position in a small log and resumes his patrol along the seawall, moving in a direction that will put him between the building and the dock exit in about ninety seconds.';
        addJournal('Staging compound exterior observation noted by harbor watchman — logged, patrol repositioned to block dock exit', 'complication', `cos-secondfloor-fail-${G.dayCount}`);
      } else {
        G.flags.staging_second_floor_found = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The building plans show a single-story structure. The exterior wall height is inconsistent with that — visible from the sea wall lookout. Inside, getting past the cargo bay to the back reveals a false partition. The partition is not locked. Behind it, iron stairs. The upper space is occupied — lamp bracket, a work surface, papers. The papers go back before exterior sounds suggest someone has arrived at the bay door.';
        addJournal('Staging compound second floor accessed — unlisted in building plans, occupied work space, papers recovered', 'intelligence', `cos-secondfloor-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Guildheart Hub transfer records show the same agent as Cosmoria. Different name, same seal.",
    tags: ['Cross-Locality', 'Stage2'],
    tag: 'risky',
    plot: 'main',
    xpReward: 86,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(86, 'cross-referencing Guildheart Hub transfer records against the Cosmoria sealed container agent');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.guildheart_agent_link = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The Guildheart Hub transfer register — accessible in the public filing of the maritime trade compact — shows thirty transfer entries for the same cargo classification over fourteen months, all routed from Guildheart to Cosmoria with a brief hold at the Hub. The agent of record at Guildheart uses a different name than the Cosmoria agent but the seal mark on the authorization letters is identical: the same charter seal Selka noted in her margin. One operation, two identities, one seal. The Guildheart entries predate the Cosmoria sealed container declarations. Guildheart was the staging point before the route moved.';
        addJournal('Guildheart Hub transfer register: 30 entries same cargo class over 14 months, same charter seal as Cosmoria agent — different name, Guildheart entries predate Cosmoria declarations by 2 months', 'evidence', `cos-guildheart-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'The Guildheart Hub transfer register is available under the maritime trade compact as a public access document — in theory. The copy held at Cosmoria\'s Harbor Authority reference desk is nine months out of date. The current register is held at the Guildheart Hub itself, or at the maritime trade compact office in Cosmouth, neither of which is accessible from Cosmoria without a formal request that logs the inquiry in the compact\'s administrative system.';
        addJournal('Guildheart Hub transfer register: Cosmoria copy 9 months out of date — current copy requires Guildheart or Cosmouth access, formal request logs inquiry', 'complication', `cos-guildheart-fail-${G.dayCount}`);
      } else {
        G.flags.guildheart_agent_link = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The Guildheart Hub entries in the maritime trade compact register show the same cargo classification appearing before it appears in Cosmoria\'s bonded transit log. The agent name is different. The seal on the authorization letters, traced from a copy obtained from Selka\'s margin notation, matches the charter seal on the Guildheart entries. The route moved from Guildheart to Cosmoria. The agent changed names and the seal came with them.';
        addJournal('Guildheart Hub entries precede Cosmoria bonded transit entries — different agent name, same charter seal, route relocated from Guildheart to Cosmoria', 'intelligence', `cos-guildheart-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The airship lane suppression notifications use a routing code that expired three years ago.",
    tags: ['Airship', 'Stage2'],
    tag: 'risky',
    xpReward: 74,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'auditing the routing code on airship lane suppression notifications');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('spirit', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.suppression_expired_code = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Every airship lane suppression notification carries a routing authority code in the header — a reference number that identifies the issuing office. The routing code on the sealed container suppression windows is RX-74-COSM. That code was retired three years ago when the issuing office was absorbed into the Cosmouth Fleet Authority. The current code for that office is different. RX-74-COSM was never officially suspended — it was simply stopped being used when the office reorganized. Someone with access to the old code structure has been issuing suppression notifications under a code that the system still processes because it was never formally expired. The notifications are technically valid. The authority that issued them no longer exists.';
        addJournal('Airship suppression notifications use routing code RX-74-COSM — retired 3 years ago, never formally expired, issuing office dissolved, notifications technically valid', 'evidence', `cos-expiredcode-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'The lane suppression notification archive is an administrative record maintained jointly by the Airship Lane Registry and the Cosmouth Fleet Authority. The duty clerk at the registry desk explains the joint administration arrangement — in detail, from the beginning, without being asked — and produces two referral forms before the question about routing codes is finished. The smell of brine and coal-fired lifting gas hangs in the registry\'s small lobby. Both forms require institutional affiliation.';
        addJournal('Lane suppression archive: joint Cosmouth/Registry administration — dual referral forms required, institutional affiliation field blocks non-credentialed access', 'complication', `cos-expiredcode-fail-${G.dayCount}`);
      } else {
        G.flags.suppression_expired_code = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The routing code on the suppression notifications can be checked against the public header format on any Airship Lane Registry posting. RX-74-COSM appears in the header of every sealed container suppression window. The current routing code directory — posted at the registry desk — shows no entry for RX-74-COSM. The directory was last updated two years ago. The code isn\'t in the current directory. It was issued anyway and the system processed it.';
        addJournal('Suppression notifications use routing code RX-74-COSM — absent from current registry directory, system still processing, origin unclear', 'intelligence', `cos-expiredcode-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "A third clerk handles the sealed container intake. Not on the Harbor Authority staff list.",
    tags: ['Harbor Authority', 'Stage2'],
    tag: 'risky',
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'cross-checking Harbor Authority staff list against the third intake clerk');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('finesse', (G.skills.finesse||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.third_intake_clerk_found = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The Harbor Authority staff list is posted in the public intake lobby — a standard transparency requirement. Two intake clerks listed. A third person processes sealed container arrivals on the nights they appear — visible at the intake desk for a four-hour window, then gone. Cross-referencing the staff list with the sealed container arrival logs: the third clerk\'s presence corresponds exactly to sealed container nights. She is not on the staff list. The signature on the sealed container intake forms is not a match to either listed clerk. It is clean, unhurried, consistent — practiced. She signs forms for a job she does not officially hold.';
        addJournal('Harbor Authority intake: unlisted third clerk present only on sealed container nights — signature on intake forms not matching either listed staff, presence confirmed across 11 nights', 'evidence', `cos-thirdclerk-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'The Harbor Authority intake lobby is staffed during posted hours. The intake forms are administrative records, not public instruments. The desk clerk — the listed one — processes the request correctly, notes the purpose, and sets the denial form on the counter with the date already filled in. She does this with the ease of someone who has handled this exact category of request enough times to have the form memorized. She does not look at the staff list posted on the lobby wall behind her.';
        addJournal('Harbor Authority intake form access denied — unlisted clerk pattern unconfirmed, inquiry logged by listed staff', 'complication', `cos-thirdclerk-fail-${G.dayCount}`);
      } else {
        G.flags.third_intake_clerk_found = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The staff list in the intake lobby shows two clerks. The sealed container arrival forms carry a third signature — different hand, different style. The listed clerks sign with a running hand; this signature is precise, separated letters. Cross-referencing with the arrival dates: the third signature appears only on sealed container intake forms. Both listed clerks were present on those same nights. The third person handled only the sealed container paperwork.';
        addJournal('Harbor Authority intake: sealed container forms carry third signature not matching listed staff — present only on sealed container nights, other staff also on duty', 'intelligence', `cos-thirdclerk-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The night airship booking record lists a Shelkopolis address that doesn't exist.",
    tags: ['Maritime', 'Stage2'],
    tag: 'risky',
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'tracing the Shelkopolis address in the night airship booking record');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.shelkopolis_address_false = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The airship booking record for the night route lists a Shelkopolis origin address for the sealed container consignee — a street and district. The Shelkopolis civic directory, held in the Harbor Authority\'s reference shelf, shows no such street in that district. The district exists. The street does not. Marrow Tideglass has the civic directory open on his desk when the question is raised — he looked it up four months ago. He turns to the page without searching for it. "I filed a discrepancy notice," he says. "The notice was logged as resolved." He closes the directory to the same page and sets it where it was.';
        addJournal('Night airship consignee address in booking record: street does not exist in Shelkopolis district — Marrow filed discrepancy notice, logged as resolved without correction', 'evidence', `cos-address-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'Airship booking records are operational documents held by the route operator, not the Harbor Authority. The night route operator has an administrative address but does not maintain a public intake desk. A request routed through the Harbor Authority desk produces a referral form. The form goes to the route operator via the administrative tray. By the time a response arrives, the relevant departure will have occurred twice more.';
        addJournal('Night airship booking records held by route operator — Harbor Authority referral form filed, response timeline unclear', 'complication', `cos-address-fail-${G.dayCount}`);
      } else {
        G.flags.shelkopolis_address_false = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The booking record consignee address is in the Harbor Authority\'s reference copy of the night manifest — accessible as a public filing. The Shelkopolis civic directory is on the reference shelf. The street in the consignee address does not appear in the district listed. Either the address was recorded incorrectly on every booking for eight months, or it was never a real address to begin with. The error appears on forty-one consecutive manifests.';
        addJournal('Night airship consignee address: Shelkopolis street does not appear in civic directory — same false address on 41 consecutive manifests', 'intelligence', `cos-address-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Coralyn's secondary ledger matches Fairhaven harbor records by eleven entries.",
    tags: ['Maritime', 'Stage2', 'Cross-Locality'],
    tag: 'risky',
    xpReward: 78,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(78, 'cross-referencing Coralyn secondary ledger against Fairhaven harbor records');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.coralyn_fairhaven_link = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Coralyn squares the Fairhaven harbor summary against the desk edge before opening both documents side by side. Eleven entries in her secondary ledger — the parallel record she runs alongside the official archive — correspond to cargo declarations that appear in the Fairhaven harbor records two to three weeks before they appear in Cosmoria\'s registry. The cargo moves from Fairhaven to Cosmoria before it is officially declared at either end. Coralyn traces the pattern with her finger without speaking. The secondary ledger was her way of documenting that the official records lagged behind reality. She has been keeping a parallel record because the archive\'s own filing was unreliable.';
        addJournal('Coralyn secondary ledger: 11 entries match Fairhaven harbor records, Fairhaven filing 2-3 weeks prior to Cosmoria registry — cargo moved before official declaration at either port', 'evidence', `cos-fairhaven2-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = 'Coralyn squares the top form on the counter against the edge — both hands, a precise alignment — before answering. Fairhaven harbor records are held by the Fairhaven Harbor Authority and are not available in Cosmoria\'s archive. Requesting a cross-jurisdiction record comparison requires a formal maritime trade compact inquiry, which routes through the same Cosmouth administrative office that issued the waiver instruction. She says this without particular expression. The pathway back leads through the same door the problem came from.';
        addJournal('Cross-jurisdiction Fairhaven record comparison blocked — routes through Cosmouth administrative office named in waiver', 'complication', `cos-fairhaven2-fail-${G.dayCount}`);
      } else {
        G.flags.coralyn_fairhaven_link = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Coralyn opens the secondary ledger to a page flagged with a strip of paper. Eleven entries are marked. "These appear in the Fairhaven harbor summary — I receive a monthly copy through the maritime compact — before they appear in our own registry." She sets the Fairhaven summary next to the ledger page. The dates are clear. Cargo was declared at Fairhaven two to three weeks before Cosmoria\'s registry shows any record of it. The cargo moved between ports before either port\'s paperwork caught up.';
        addJournal('Coralyn ledger cross-reference: 11 cargo entries appear in Fairhaven harbor summary 2-3 weeks before Cosmoria registry — movement predates both official declarations', 'intelligence', `cos-fairhaven2-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The tide gauge bracket has notch marks that don't match the Harbor Authority's published calibration.",
    tags: ['Maritime', 'Stage2'],
    tag: 'risky',
    xpReward: 66,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'cross-referencing tide gauge calibration marks against Harbor Authority published data');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('vigor', (G.skills.vigor||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.tide_gauge_discrepancy = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The Harbor Authority publishes calibration figures for every tide gauge bracket on the dock system — a public safety document. The bracket nearest the night airship platform carries notch marks at intervals that differ from the published calibration by a consistent margin: each notch is two centimeters lower than the published figure. Tide water registering against these marks would appear to show a lower-amplitude reading than was actually present, underreporting tide height for any observation made from this bracket. If the sealed container weights were calculated against the tide amplitude readings from this bracket, the weight discrepancy would be systematically understated. The bracket serves the record. The record serves the operation.';
        addJournal('Night platform tide gauge: notch marks 2cm below published calibration — consistent margin, underreports tide amplitude, would systematically understate weight discrepancy if used for container calculations', 'evidence', `cos-tidegauge-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'The night platform tide gauge bracket is within the pre-departure staging zone. Saltwick, the night platform lead, is at the gangway position before the bracket is close enough to read against the published calibration figures. He does not explain the restriction this time. He stands between the bracket and the approach. His pocket ledger is already open.';
        addJournal('Tide gauge bracket access blocked by Saltwick — pre-departure staging zone, observation prevented before calibration comparison possible', 'complication', `cos-tidegauge-fail-${G.dayCount}`);
      } else {
        G.flags.tide_gauge_discrepancy = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The published calibration figures are available at the Harbor Authority safety board, posted. The tide gauge bracket near the night platform can be read from the dock walkway without entering the staging zone. The notch marks sit lower than the published calibration. The discrepancy is consistent and uniform — not wear, not damage. Each notch is set at the same distance below the published standard. Lower notches mean lower reported readings.';
        addJournal('Night platform tide gauge notch marks consistently below published calibration — uniform discrepancy, systematic underreporting of tide amplitude', 'intelligence', `cos-tidegauge-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Tavian's counter stamper leaves a double impression on every sealed container receipt.",
    tags: ['NPC', 'Stage2'],
    tag: 'risky',
    xpReward: 65,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(65, 'examining sealed container receipts from the Floating Market for counter-stamp irregularity');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('spirit', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.tavian_double_stamp = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Tavian\'s counter stamper produces a standard Floating Market transit receipt. Every sealed container receipt in the past eight months carries a faint second impression offset by two millimeters — visible under the archive lamp at a low angle. A second impression means the stamper was inked twice on these receipts, which creates a duplicate in the stamper\'s carbon block. Tavian keeps the carbon block under the counter in a locked box. The carbon block would carry a copy of every receipt issued. "I don\'t use a carbon block," he says. He is looking at the box when he says it.';
        addJournal('Floating Market sealed container receipts: double stamp impression, 2mm offset — implies carbon block duplicate unknown to Tavian, locked box under counter', 'evidence', `cos-stamp-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = 'Tavian closes the ledger and sets his hand on the cover before answering. "Receipts are operational documents. Reviewing them for physical irregularities isn\'t an access category I can authorize without a Trade Hall credential or a Cosmouth audit referral." He is correct. He also moved the ledger before explaining the rule, which is a sequence that tells its own story. The active audit makes the timing of this interaction impossible to untangle from the audit process.';
        addJournal('Receipt review declined — access category requires Trade Hall credential, Tavian closed ledger before citing rule', 'complication', `cos-stamp-fail-${G.dayCount}`);
      } else {
        G.flags.tavian_double_stamp = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The sealed container receipts in the archive have a faint second impression visible at an angle — the stamper was applied twice on these specific documents. Standard receipts in the same period don\'t show the double impression. The variation is consistent across all sealed container receipts. Tavian examines the comparison himself and says nothing for a moment. "I stamp once," he says. "Standard procedure." He is not disputing the observation. He is telling you it wasn\'t him.';
        addJournal('Sealed container receipts carry double stamp impression not present on standard receipts — same period, consistent variation, Tavian states he stamps once', 'intelligence', `cos-stamp-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The crane rigging schedule for berth seven runs twenty minutes longer than any other berth.",
    tags: ['Maritime', 'Stage2'],
    tag: 'risky',
    xpReward: 67,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(67, 'auditing crane rigging schedules for berth seven against other berths');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('spirit', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.berth_seven_crane_schedule = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The crane rigging schedule is posted at the dock foreman\'s booth — a public safety posting. Every berth has a standard rigging window for cargo load at its official weight classification. Berth seven\'s posted rigging window is twenty-three minutes longer than the weight classification on the painted-over quay marks would require. The window matches the classification that was painted over — the original lower weight classification. The rigging crew knows the true weight. The paperwork says otherwise. They gave themselves the time the actual containers need while the documents claim they don\'t.';
        addJournal('Berth seven crane rigging schedule: 23 minutes longer than current painted-over weight classification requires — schedule matches original lower-classification timing, crew adjusted for true weight', 'evidence', `cos-crane-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'The dock foreman\'s booth is occupied. The foreman looks up from his schedule board when the approach comes and sets a hand on the top of the crane schedule clipboard before anything is said. "Rigging schedules are operational documents. Posted for crew use, not for public review." He pulls the clipboard down from its hook and holds it. The schedule board behind him remains visible — rows and berth numbers, rigging windows written in chalk. The chalk is fresh. Someone changed a number recently.';
        addJournal('Crane rigging schedule access blocked by dock foreman — clipboard removed, chalk schedule board showed recent alteration', 'complication', `cos-crane-fail-${G.dayCount}`);
      } else {
        G.flags.berth_seven_crane_schedule = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The posted rigging schedule is visible from the dock walkway. Berth seven\'s rigging window is visibly longer than the adjacent berths — twenty-plus minutes longer, written in the same chalk format. The adjacent berths handle similar cargo classifications. The extra time is not explained by the posted classification. The rigging crew at berth seven has to know how much time they actually need, and they posted the truth.';
        addJournal('Berth seven rigging schedule: 20+ minutes longer than adjacent comparable berths — crew posted actual required time, inconsistent with documented weight classification', 'intelligence', `cos-crane-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Selka took a room off the rental list for six weeks. Won't say who stayed.",
    tags: ['NPC', 'Stage2'],
    tag: 'risky',
    xpReward: 65,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(65, 'pressing Selka Tideglass on the off-list room and its occupant');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('charm', (G.skills.charm||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.selka_off_list_room = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Selka wipes the counter once before answering — a single, slow pass. "Six weeks, end room on the north hall. Taken off the list." She doesn\'t say who told her to do it. The word she uses is "arrangement." She opens the private log to the page and turns it toward you without being asked — the column where she normally notes correspondence notations is blank for those six weeks, which is not how she operates. "No letters. No departures before dark. They didn\'t use the room the way the others did." She closes the log with both hands. She knows what the others were doing. The six-week guest was something different.';
        addJournal('Selka: end north-hall room off rental list for 6 weeks — no correspondence notations, no pattern matching agent use, arrangement basis, guest identity declined', 'evidence', `cos-selka4-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = 'Selka sets the cloth down on the counter without looking up. "A harbor inn that can\'t keep a private arrangement private isn\'t worth using. I\'ve been in this business twenty-two years." She picks the cloth back up. "Whoever stays in my rooms stays in my rooms. That\'s the service." She is not angry. She is simply done. The counter is cleaner than it has been all day.';
        addJournal('Selka declined off-list room inquiry — 22-year professional discretion cited, conversation ended', 'complication', `cos-selka4-fail-${G.dayCount}`);
      } else {
        G.flags.selka_off_list_room = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Selka confirms a room was off the list for six weeks. "Long-stay arrangement. Not unusual for harbor work." She pauses. "Different from the other regulars." She doesn\'t elaborate on what the other regulars were doing. She looks at the shelf where the private log sits and doesn\'t move to open it. "The arrangement ended on its own. No notice, no checkout. The room was just empty one morning." She picks up the cloth and finds the scratch on the counter edge again.';
        addJournal('Selka confirmed 6-week off-list room — arrangement ended without checkout, described as distinct from regular agent pattern', 'intelligence', `cos-selka4-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The transit manifest has a third copy. Selka has been holding it for two months.",
    tags: ['NPC', 'Maritime', 'Stage2'],
    tag: 'bold',
    plot: 'main',
    xpReward: 88,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(88, 'recovering the third manifest copy from Selka Tideglass');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('charm', (G.skills.charm||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.selka_third_manifest_copy = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Selka reaches under the counter without hesitation — past the private log, past the cloth she uses for wiping, to a flat cloth envelope tucked against the back wall. She sets it on the counter between you without explanation. The compound transit manifest inside is a third copy: a format that matches neither the public manifest from the Harbor Authority nor the night platform operational duplicate. It carries all three: the DL column, the BCR column, and a fourth column not present on either other version — a column headed "OP" with single-digit entries. The envelope arrived with the agent six weeks ago. "She forgot it," Selka says. "Or left it deliberately. I kept it either way."';
        addJournal('Selka: third manifest copy recovered — carries DL, BCR, and unlisted OP column with single-digit entries, left by agent 6 weeks ago, held by Selka since', 'evidence', `cos-thirdmanifest-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = 'Selka listens to the question about the manifest and then straightens the stack of booking slips on the counter — a small, composed gesture. "I don\'t hold documents that aren\'t mine. What a guest leaves is returned to them or disposed of." She says this looking directly at the counter surface. The cloth is in her hand but she doesn\'t wipe anything. She is telling a partial truth and she knows the listener knows it and she has decided that is acceptable.';
        addJournal('Selka denied holding any manifest — partial truth suspected, counter-straightening gesture noted', 'complication', `cos-thirdmanifest-fail-${G.dayCount}`);
      } else {
        G.flags.selka_third_manifest_copy = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Selka considers the question for three seconds — long enough that the pause is a decision, not a hesitation. She reaches under the counter and puts a cloth envelope flat between you. "Left six weeks ago. I wasn\'t sure what to do with it." The manifest inside is a format not found in the Harbor Authority archive or the night platform records. It has columns the other versions don\'t. She keeps her hand near the envelope while it is opened. She has read it. She knows what she has been sitting on.';
        addJournal('Selka produced third manifest copy — unfamiliar format with additional columns, held 6 weeks, Selka has read contents', 'intelligence', `cos-thirdmanifest-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The archive has a second entrance. Coralyn uses it after the reading room closes.",
    tags: ['Maritime', 'Stage2'],
    tag: 'bold',
    xpReward: 76,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(76, 'accessing the archive second entrance after hours to meet Coralyn privately');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('finesse', (G.skills.finesse||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.coralyn_after_hours = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The second entrance is an unmarked door off the service alley behind the archive — brine-salt encrusted, iron handle worn smooth. Coralyn opens it without surprise. She has been waiting. She carries the secondary ledger and two other volumes she has not shown in public reading hours. "There are things in the archive I cannot show you during the day." She sets them on the sorting table without lighting the main lamp — uses the small desk lamp only. The volumes are the eleven from the administrative hold shelf. She has keys to the hold section. She has had them for fourteen months. She copied them before the hold was applied.';
        addJournal('Coralyn met after hours — produced 11 administrative hold volumes and secondary ledger, has had hold-section keys since before hold applied, copied before restriction', 'evidence', `cos-afterhours-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'The service alley behind the archive is watched — not by Harbor Authority, by a person sitting on a crate near the far end who is not working. The second door does not open when the handle is tried. A lamp goes on in a window above the alley, briefly. The light goes off again. Someone in the building saw the approach and made a decision about it. Coralyn\'s rooms are above the archive. She chose not to open the door.';
        addJournal('Archive second entrance: alley observed by unknown party, door not opened — lamp signal from above suggests Coralyn chose against after-hours meeting', 'complication', `cos-afterhours-fail-${G.dayCount}`);
      } else {
        G.flags.coralyn_after_hours = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Coralyn opens the service door herself — she is already on the alley side when the approach comes, carrying a small lamp and the secondary ledger. "I can\'t show these during open hours." She leads to the sorting room and spreads two documents she has not produced in any previous meeting. "The hold section has eleven volumes. I have access to the hold section." She does not explain how. She turns to the first of the two documents and begins reading it aloud, slowly, so there is time to write.';
        addJournal('Coralyn met after hours — produced 2 documents not shown during day access, confirmed access to administrative hold section with 11 volumes', 'intelligence', `cos-afterhours-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Nerissa's tide blessing register records a visitor who does not appear in the inn books.",
    tags: ['NPC', 'Stage2'],
    tag: 'risky',
    xpReward: 67,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(67, 'cross-referencing Nerissa shrine blessing register against Selka inn booking records');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('charm', (G.skills.charm||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.nerissa_shrine_visitor = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The shrine blessing register records every supplication by name and date — a devotional record, not a civic one, and Nerissa treats the privacy of it seriously. She opens it for this comparison without a formal request. Fourteen names in the sealed container period appear in the blessing register but not in any inn booking record in Cosmoria. Fourteen people who came to the shrine but did not stay in the city overnight by any record available. One name appears three times, all three on nights a sealed container departed. "I remember that one," Nerissa says. She touches the entry with the tip of her finger and does not elaborate.';
        addJournal('Nerissa blessing register: 14 names absent from inn records during sealed container period — one name appears 3 times, all on sealed container departure nights, Nerissa remembers the visitor', 'evidence', `cos-shrine-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.reverence = (G.worldClocks.reverence||0) - 1;
        G.lastResult = 'Nerissa closes the blessing register before it is on the table. "The shrine record is a devotional document. Using it for a civil cross-reference would require the blessing of the high tide office and I am not in a position to give that without a formal written request." She says it with genuine regret, which makes it worse. The sea smell comes through the shrine\'s open arch and the sound of the harbor crane reaches them both without filling the silence.';
        addJournal('Nerissa blessing register: civil cross-reference declined — high tide office formal written request required', 'complication', `cos-shrine-fail-${G.dayCount}`);
      } else {
        G.flags.nerissa_shrine_visitor = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Nerissa opens the register to the sealed container period and lets the comparison proceed without speaking. Several names appear in her record that are not in the inn booking records cross-referenced against it. "The shrine serves travelers who don\'t always stay in the city," she says. "That\'s not unusual." She pauses at one entry — three appearances, same name — and keeps her finger near the page. "This one I remember. Not because of the name." She looks at the departure date column on the tide observation sheet next to the register.';
        addJournal('Nerissa blessing register cross-reference: names without inn bookings during sealed container period — one three-time visitor on departure nights, Nerissa recalls without specifics', 'intelligence', `cos-shrine-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "A loading receipt stamped twice: once by the Harbor Authority, once by an unnamed office.",
    tags: ['Harbor Authority', 'Stage2'],
    tag: 'risky',
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'tracing the unnamed office stamp on the sealed container loading receipts');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.unnamed_office_stamp = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The Harbor Authority stamp on the loading receipts is standard — registered, listed in the Harbor Authority directory with a matching seal number. The second stamp carries no office name, no seal number, no issuing authority text. It is a geometric mark: a rectangle bisected by a horizontal line, three dots below. Coralyn has seen it before. She squares the receipt against the desk edge before speaking. "That mark appeared on three documents I was asked to archive without a routing sheet. The routing sheet tells me which collection they belong to. Documents without routing sheets get held in the uncataloged section." The same section with the inward-facing spines.';
        addJournal('Loading receipt second stamp: unnamed geometric mark with no office attribution — Coralyn links same mark to 3 previously unrouted archive documents in uncataloged hold section', 'evidence', `cos-namelessstamp-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'The loading receipt in question is an operational document filed with the Harbor Authority, not the public archive. Accessing it requires an authorization form. The clerk who processes the form notes the specific document number in the administrative log — the one that routes to Marrow Tideglass\'s office. The document number will identify exactly which receipt was requested. The form is in the tray before the question is finished.';
        addJournal('Loading receipt access blocked — document number logged to Harbor Captain administrative tray before form completed', 'complication', `cos-namelessstamp-fail-${G.dayCount}`);
      } else {
        G.flags.unnamed_office_stamp = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The second stamp on the loading receipt is visible on a copy in the public archive — loading receipts are filed there as part of the cargo record. The Harbor Authority stamp is listed in the directory. The second mark has no name, no number, no issuing authority. It is purely geometric. Coralyn, when shown a rubbing of it, looks at it for a long moment and then squares it against the desk edge before saying anything. "I have seen that mark. Not often."';
        addJournal('Loading receipt second stamp: unnamed geometric mark on public archive copy — Coralyn recognizes it, confirms she has seen it elsewhere', 'intelligence', `cos-namelessstamp-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The port surgeon's injury log has no entries for sealed container loading nights.",
    tags: ['Maritime', 'Stage2'],
    tag: 'risky',
    xpReward: 65,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(65, 'auditing port surgeon injury log against sealed container loading nights');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('vigor', (G.skills.vigor||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.port_surgeon_log_gap = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The port surgeon keeps an injury log as a public health record — dock injuries, tide exposure, crane accidents, splinter wounds. Night loading operations generate the most entries because visibility is lower and the work is heavier. The sealed container loading nights — forty-one of them — generate zero entries each. No dock hand reported any injury on any of those nights. On every surrounding night the log runs at its usual rate: two to six entries. A crew loading heavy containers in the dark without a single minor injury across forty-one nights means either the work went perfectly every time, or the crew reported nothing because reporting would generate a record of who was there.';
        addJournal('Port surgeon injury log: zero entries on all 41 sealed container loading nights — surrounding nights normal rate 2-6 entries, gap implies deliberate non-reporting by crew', 'evidence', `cos-surgeon-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'The port surgeon\'s clinic is at the harbor end of the administrative row. The surgeon is in but the injury log is an internal clinical record, not a public health posting. Access requires a public health authority referral — which sits within the Harbor Captain\'s administrative jurisdiction. The surgeon explains this clearly and without particular concern. He has a queue of actual patients. The referral form is standard. It generates a record.';
        addJournal('Port surgeon injury log: clinical internal record, public health authority referral required — logs through Harbor Captain jurisdiction', 'complication', `cos-surgeon-fail-${G.dayCount}`);
      } else {
        G.flags.port_surgeon_log_gap = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The port surgeon confirms the pattern without opening the log. "Night loading is our busiest period for minor injuries. Splinters, rope-burn, tide-platform slips." He thinks for a moment. "There are nights I see nothing from the night platform. I assumed the conditions were calm." The sealed container dates, listed in sequence, draw a pause. "Every one of those nights was quiet for me." He pulls the log and runs a finger down the dates without saying anything else.';
        addJournal('Port surgeon confirmed zero injury entries on sealed container nights — night loading normally generates consistent minor injury reports, gap noted by surgeon', 'intelligence', `cos-surgeon-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The cargo crane bell rings seven times before a sealed container lift. Standard is four.",
    tags: ['Maritime', 'Stage2'],
    tag: 'risky',
    xpReward: 66,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'cross-referencing crane bell count against safety protocol for sealed container lifts');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('vigor', (G.skills.vigor||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.crane_bell_count = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Harbor Authority crane safety protocol is posted at the dock foreman\'s station: four bell rings before any cargo lift. The sealed container lifts are preceded by seven rings — the dock foreman\'s log records the count, which is a required safety notation. Seven rings is the protocol for lifts over the declared weight threshold for the berth. Berth seven\'s painted-over classification does not trigger the seven-bell protocol by the current posted markings. The crane crew is following the real weight requirement, not the paperwork. Their own safety protocol records the discrepancy in a document that goes to the Harbor Authority at the end of each shift.';
        addJournal('Crane bell count for sealed container lifts: 7 rings vs posted 4-ring standard — 7-ring protocol for over-threshold lifts, crane crew following actual weight, shift log records count to Harbor Authority daily', 'evidence', `cos-cranebell-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'The dock foreman\'s safety log is an operational record, not a public document. The foreman closes the log when the approach reaches his station and sets a hand flat on the cover. "Crane safety protocol documentation is crew-use only." He does not raise his voice. Behind him, the crane bell count for the evening\'s first lift sounds: four rings, standard. Whatever was going to be seen is not available tonight.';
        addJournal('Crane safety log access blocked by dock foreman — log closed before crane bell count could be confirmed', 'complication', `cos-cranebell-fail-${G.dayCount}`);
      } else {
        G.flags.crane_bell_count = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The Harbor Authority safety protocol is posted clearly: four bell rings standard, seven for over-threshold lifts. During a sealed container loading, the bell rings seven times. A dock hand nearby counts them automatically — a habit, heads come up on the dock for a seven-ring lift. "Heavy load," he says, confirming the protocol triggers, then looks away. Seven rings means the crane crew is treating the containers as over-threshold. The paperwork says they\'re not.';
        addJournal('Sealed container crane lift: 7 bell rings observed, crew and dock hands confirm over-threshold protocol — paperwork weight classification does not trigger 7-ring requirement', 'intelligence', `cos-cranebell-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Three archive boxes: wax seals re-fractured. Post-closure access.",
    tags: ['Stage2', 'Maritime'],
    tag: 'risky',
    skill: 'spirit',
    xpReward: 78,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(78, 'analyzing wax seal fractures on archive boxes for post-closure access');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('spirit', (G.skills.spirit||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.wax_seal_fractures_confirmed = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        addJournal('Wax fracture analysis confirms post-closure access — documents were removed and replaced within the sealed chain of custody.', 'evidence', 'cos-waxseal-crit-' + G.dayCount);
        G.lastResult = 'The fracture patterns are not degradation — the angles are wrong for that, and the color at the stress point matches a second wax application. These three boxes were opened after the official sealing date. The documents inside were removed, likely replaced with substitutes, and re-sealed with a close but imperfect match. The person who re-sealed them knew what they were doing, but not quite well enough.';
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'The wax crumbles under examination, breaking the seal visibly. The damage is now attributable to this handling. The archive clerk notes the incident before it is explained. The boxes are removed from the study area while a report is drafted. What was already a closed record is now inaccessible for reasons that are partly on record as a handling failure.';
        addJournal('Archive box seals damaged during examination — incident report filed by clerk, access suspended', 'complication', 'cos-waxseal-fail-' + G.dayCount);
      } else {
        G.flags.wax_seal_fractures_confirmed = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Re-sealing stress fractures confirmed across all three boxes. The fracture pattern at the edge of each seal is too clean for environmental cracking — it follows the seal line, which means the wax was heated and re-applied. These boxes were opened after their official closure date. Someone maintained access to sealed archives after the records were supposed to be locked.';
        addJournal('Three archive boxes show post-closure re-sealing fractures — access continued after official closure', 'evidence', 'cos-waxseal-partial-' + G.dayCount);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },
  {
    label: "The archive clerk is stalling. He is waiting for someone.",
    tags: ['Stage2', 'Confrontation'],
    tag: 'bold',
    skill: 'might',
    xpReward: 76,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(76, 'confronting archive clerk about deliberate stall behavior');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('might', (G.skills.might||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.cosmoria_clerk_flipped = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        addJournal('Archive clerk broke under pressure: standing instruction to delay outside requests for Tier 3 shipping ledgers and log names to a private registry — source named.', 'evidence', 'cos-clerk-crit-' + G.dayCount);
        G.lastResult = 'The delay was deliberate. Under direct pressure the clerk breaks — a standing instruction to hold any outside party asking about Tier 3 shipping ledgers and log their name to a private registry alongside the request. He names the authority who placed the instruction. The name belongs to an administrative office that was dissolved two years ago. The instruction has been running on inertia since then.';
      } else if (result.isFumble) {
        addHeat('cosmouth', 1);
        G.lastResult = 'The person the clerk was waiting for arrives before the confrontation resolves. A Cosmouth administrative representative, polite, prepared, with a form that requests the purpose of the visit in writing. The clerk relaxes visibly. Nothing further is learned here today. A face has been seen and a heat increment has been earned.';
        addJournal('Clerk confrontation interrupted by Cosmouth administrative representative — inquiry formally logged', 'complication', 'cos-clerk-fail-' + G.dayCount);
      } else {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The clerk does not break, but he stops stalling. Under direct pressure he confirms: an instruction exists to delay certain categories of outside inquiry and log the details. He will not name the source. "I process the instruction. I did not place it." He goes back to the ledger. The delay is over. The ledger is open. What was being protected from view is now accessible.';
        addJournal('Archive clerk confirmed: standing instruction delays outside requests, logs identities — source not disclosed', 'intelligence', 'cos-clerk-partial-' + G.dayCount);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },
  {
    label: "The harbor master's recall goes back further than the records.",
    tags: ['Stage2', 'NPC'],
    tag: 'risky',
    skill: 'charm',
    xpReward: 74,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'drawing out harbor master memory of unscheduled night shipments');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('charm', (G.skills.charm||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_harbor_master = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        addJournal('Harbor master recalled three unscheduled night shipments six months before the audit — logged under transit code later deleted from the master registry. Named the cargo broker.', 'evidence', 'cos-harbmaster-crit-' + G.dayCount);
        G.lastResult = 'He remembers every ship that came at night and left before the morning count. Three such shipments six months before the audit — he names the dates without checking anything. "Logged under a transit code I haven\'t seen since." He pulls the current transit code directory, finds no entry, and sets it down. "Someone cleaned the directory. The ships were real. I loaded two of them myself." He names the cargo broker who handled all three.';
      } else if (result.isFumble) {
        G.lastResult = 'The approach reads as an angle before the second sentence finishes. He closes the drink back on the counter and straightens in his chair. "I\'ve had this conversation before, in different forms." He is done. He stays polite, but the door back into his memory has closed. He knows how to wait out a conversation that has nothing in it for him.';
        addJournal('Harbor master disengaged — approach read as a probe, no information recovered', 'complication', 'cos-harbmaster-fail-' + G.dayCount);
      } else {
        G.flags.met_harbor_master = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'He does not give dates, but he gives a name: the cargo broker who handled three shipments that came in at night and did not appear in the standard morning count. "Unusual work," he says. "Night delivery, early departure, no loading crew overlap." He is not sure the name is still at the same berth. He says it like someone who has been waiting for the right question and is not entirely surprised that it arrived today.';
        addJournal('Harbor master named cargo broker linked to three unscheduled night shipments — no dates given, delivery pattern described', 'intelligence', 'cos-harbmaster-partial-' + G.dayCount);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

];

// Sideplot injection — cosmoria harbor weight fraud rung2 hook
(function() {
  var _fraudRung2 = (typeof COSMORIA_HARBOR_WEIGHT_FRAUD !== 'undefined') ? COSMORIA_HARBOR_WEIGHT_FRAUD.rung2Hook() : null;
  if (_fraudRung2) COSMORIA_STAGE2_ENRICHED_CHOICES.push(_fraudRung2);
})();

window.COSMORIA_STAGE2_ENRICHED_CHOICES = COSMORIA_STAGE2_ENRICHED_CHOICES;
