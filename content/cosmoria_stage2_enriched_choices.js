/**
 * COSMORIA STAGE 2 ENRICHED CHOICES
 * Investigation arc: maritime archive / airship lane suppression compound transit
 * NPCs: Coralyn Tideglass (Archivist), Marrow Tideglass (Ship Captain),
 *       Selka Tideglass (Innkeeper), Tavian Tideglass (Market Clerk), Nerissa Tideglass (Shrine Attendant)
 */

const COSMORIA_STAGE2_ENRICHED_CHOICES = [

  {
    label: "Seventeen cargo declarations. One vessel name. The vessel has been decommissioned for twelve years.",
    tags: ['Investigation', 'Stage2'],
    xpReward: 78,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(78, 'reviewing maritime archive vessel and cargo records');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
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
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The Harbor Captain received an order. He filed an objection. The order stood.",
    tags: ['NPC', 'Persuasion', 'Stage2'],
    xpReward: 76,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(76, 'pressuring Harbor Captain Marrow Tideglass on sealed cargo waivers');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
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
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The market is just a stamp. The containers never touch the floor.",
    tags: ['NPC', 'Craft', 'Stage2'],
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
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The agent books the room, receives a letter, leaves on the night airship. Never stays.",
    tags: ['NPC', 'Stealth', 'Stage2'],
    xpReward: 66,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'questioning innkeeper Selka Tideglass about shipping agent patterns');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('finesse', (G.skills.stealth||0) + Math.floor(G.level/3));
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
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The surge schedule matches the tide windows. The operation runs on a natural clock.",
    tags: ['NPC', 'Lore', 'Stage2'],
    xpReward: 74,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'reviewing tidal-surge correlation data with Nerissa Tideglass');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_nerissa_tideglass = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `Nerissa spreads her tidal observation sheets across the shrine's record table — two years of dual-tide amplitude readings, dated and signed. The correlation is visible in the columns without calculation: every Shelkopolis surge date aligns with a peak-amplitude dual-tide window. She traces the pattern with her finger without speaking for a moment. "I couldn't explain why the surges followed this schedule. I assumed it was the surges triggering tidal sensitivity." She looks up. "But if the tidal window is the trigger and not the consequence — then the schedule isn't random. It's predictable. Every time."`;

        addJournal('Tidal window confirmed as surge trigger mechanism — operation uses natural schedule as cover', 'evidence', `cos-nerissa-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.reverence = (G.worldClocks.reverence||0) - 1;
        G.lastResult = `Nerissa listens carefully and then says tidal surge events fall outside the shrine's observational scope — the shrine records natural tide cycles, not glyph activity. "What you're describing is a theological question about divine tide mechanics. That's doctrine, not observation." She closes her record sheets and offers a tide blessing instead. The offer is genuine. The records stay closed.`;
        addJournal('Sea shrine records closed — tidal inquiry redirected to doctrine', 'complication', `cos-nerissa-fail-${G.dayCount}`);
      } else {
        G.flags.met_nerissa_tideglass = true;
        G.investigationProgress++;
        G.lastResult = `Nerissa's sheets show the dual-tide amplitude windows clearly. She's already noted the correlation with the glyph surge dates — there's a small notation in the margin of the second-to-last page: "see regional event log — timing unexplained." She knew the pattern. She didn't know what it meant. "I didn't publish it because I couldn't explain it," she says. The mechanism you carry from Watchers Perch fills the gap she left open.`;
        addJournal('Tidal window surge correlation documented — mechanism now explained', 'evidence', `cos-nerissa-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Coralyn's secondary ledger has a third column. She didn't show it.",
    tags: ['stage2', 'cosmoria'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(30, 'pressing Coralyn Tideglass on the reviewer log behind the secondary ledger');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var roll = rollD20('charm', G.skills.persuasion);
      if (roll.total >= 13) {
        G.flags.coralyn_reviewer_log_seen = true;
        G.investigationProgress++;
        addNarration('The Third Column', 'Coralyn doesn\'t open the ledger again immediately. She squares it against the counter edge first — both hands, a precise alignment — before she lifts the cover. The third column is narrow: initials and a date stamp, one entry per reviewed row. Six of the Pallmark Reach declarations carry the same two letters. She covers them with her thumb, then lifts it. "That office was restructured fourteen months ago. The person these initials belong to is no longer in Cosmoria." She closes the ledger carefully, both latches.');
        addJournal('Archive reviewer initials on ghost vessel declarations — linked to restructured Cosmouth office', 'evidence');
        maybeStageAdvance();
      } else {
        addNarration('The Record Stands Closed', 'Coralyn listens to the question and doesn\'t move to open anything. She squares the top form on the counter against the edge — a small, precise alignment — before she answers. "Reviewer attribution is an internal archive administration record. It\'s not part of the public access filing." She says it without apology and without particular warmth. The ledger stays under the counter. The access log for this conversation is already filling in behind her, ink still wet on the date line.');
      }
    }
  },

  {
    label: "The night platform uses different quay markings. Someone painted over the originals.",
    tags: ['stage2', 'cosmoria'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(30, 'examining the night airship loading quay for physical evidence');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      var roll = rollD20('vigor', G.skills.survival);
      if (roll.total >= 13) {
        G.flags.quay_markings_examined = true;
        G.investigationProgress++;
        addNarration('Painted Over', 'The night platform smells of salt and cooling timber. The original quay markings are still readable under the new paint if the angle is right — weight classifications in the old Harbor Authority format, each berth rated for a specific load range. The painted-over marks on berth seven are noticeably lower than the surrounding berths. Someone reclassified it upward. A sealed container routed through berth seven under the new classification would not trigger the secondary weight inspection that the original rating requires. The paint job is three to five months old by the oxidation pattern.');
        addJournal('Night airship berth seven weight classification painted over — bypasses secondary inspection threshold', 'evidence');
        maybeStageAdvance();
      } else {
        addNarration('Platform Crew', 'A loading crew foreman intercepts before the quay markings are close enough to read. "Night platform is restricted during pre-departure staging." He doesn\'t raise his voice. He stands between you and the berths with the patient authority of someone who has moved people off this platform before and will do it again. The airship\'s running lights are already on. The crew is watching.');
      }
    }
  },

  {
    label: "The archive staff read the form, not the question. They noticed the wrong thing.",
    tags: ['stage2', 'cosmoria'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(30, 'navigating a social correction from Maritime Archive Hall staff');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var roll = rollD20('finesse', G.skills.stealth);
      if (roll.total >= 13) {
        G.flags.archive_form_navigated = true;
        G.investigationProgress++;
        addNarration('Correct Form', 'The archive scribe who flags the incomplete research request form is precise about exactly which line was left blank. He produces the correct form himself — the approved version, which happens to route through a different administrative tray than the standard inquiry log. "If the form is incorrect it goes to corrections review. Corrections review is currently backed up fourteen days." He slides the right form across the desk. The difference between the two forms is one checkbox. He\'s already filled in the date.');
        addJournal('Archive scribe routed inquiry through non-logged form — intentional procedural bypass', 'intelligence');
        maybeStageAdvance();
      } else {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
        addNarration('Logged Correction', 'The scribe notes the form error in the corrections register before explaining what the error was. The explanation is delivered clearly and without condescension, which somehow makes the register entry worse. The inquiry goes into corrections review. Fourteen days. The note in the register includes the date, the nature of the error, and a physical description rendered in three words: height, build, clothing color. It is thorough.');
      }
    }
  },

  {
    label: "The decommission file has a witness signature. No current Harbor Authority officer owns it.",
    tags: ['Stage2', 'NPC'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'tracing the witness signature on the Pallmark Reach decommission file');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.pallmark_witness_identified = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The witness signature on the decommission file belongs to a Harbor Authority registrar who left Cosmoria's administrative roll fourteen months ago — reassigned to a Cosmouth regional office, no forwarding record on file. Coralyn pulls the personnel transfer log without being asked, squares it against the desk edge before opening it, and turns to a page with two lines missing from the middle — torn out cleanly, not worn. The transfer order is intact. The receiving office confirmation is gone. She sets the open log between you and does not close it. Someone removed the paperwork trail that would show where the registrar went after signing the decommission, and Coralyn has known the page was incomplete since before you arrived.`;
        addJournal('Pallmark Reach decommission witness: registrar transferred to Cosmouth regional office, transfer confirmation removed from personnel log', 'evidence', `cos-witness-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Coralyn squares the personnel inquiry form against the counter edge before she slides it across — both hands, a precise alignment — and explains the countersignature requirement without raising her voice. The Harbor Captain's administrative office receives the request before the hour is out. She has already signed her own name in the notification field. The inquiry is now linked in writing to both the archive and Marrow Tideglass's administrative log, and Coralyn is on record as having processed it correctly. Two clerks know the question has been asked. So does she.`;
        addJournal('Personnel record request for decommission witness — routed through Harbor Captain administrative office', 'complication', `cos-witness-fail-${G.dayCount}`);
      } else {
        G.flags.pallmark_witness_identified = true;
        G.investigationProgress++;
        G.lastResult = `The witness signature is legible. Coralyn traces it against the Harbor Authority personnel register — the name appears on the active roll through fourteen months ago, then stops. "Transfer out," she says, and reads the entry twice before closing the register. "The receiving office line is blank." She leaves the register open to the page. A blank receiving office line on a transfer means the record was never confirmed complete. Someone let the file sit unfinished, and the unfinished file let the decommission sit open.`;
        addJournal('Pallmark Reach decommission witness transferred out of Cosmoria — receiving office line blank, transfer unconfirmed', 'intelligence', `cos-witness-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The night manifest has a column the day manifest doesn't. Someone added it.",
    tags: ['Stage2', 'NPC'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'comparing night vs day airship manifests for added columns');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('vigor', (G.skills.survival||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.night_manifest_column_found = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The added column is labeled "Bonded Continuity Reference" — a phrase that appears nowhere in the Harbor Authority's standard manifest glossary. The BCR entries in the night manifest are six-digit codes, all beginning with the same three digits. Marrow recognizes the prefix when he reads it: "That prefix belongs to a Cosmouth administrative authorization block. Not a cargo classification. An administrative override." The column wasn't added to the manifest template — it was added to the night manifest copies only, by hand, in the same ink weight as the printed form.`;
        addJournal('Night airship manifest: "Bonded Continuity Reference" column added by hand — Cosmouth admin override prefix, not in standard glossary', 'evidence', `cos-manifest-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The night platform foreman intercepts at the loading dock steps. Manifests are active operational documents during pre-departure staging — they cannot be reviewed by non-crew until the airship has cleared the harbor. He is not unkind about it. He is practiced. Two crew members on the upper platform have already noted the direction of approach and the time of day in a small pocket ledger one of them carries clipped to his belt.`;
        addJournal('Night manifest review blocked during pre-departure staging — crew observation logged', 'complication', `cos-manifest-fail-${G.dayCount}`);
      } else {
        G.flags.night_manifest_column_found = true;
        G.investigationProgress++;
        G.lastResult = `Side by side, the day and night manifests differ in structure, not just content. The night form carries an extra column on the right margin — "BCR" — that the day form does not have. The BCR entries are six-digit codes. They don't appear in the standard manifest glossary posted at the Harbor Authority intake desk. The codes are consistent across every night manifest for the past eight months.`;
        addJournal('Night airship manifest carries extra BCR column absent from day manifests — consistent across 8 months', 'evidence', `cos-manifest-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Nerissa's observation sheets reference a Cosmouth tide calendar discontinued two years ago.",
    tags: ['Stage2', 'NPC'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'examining the discontinued Cosmouth tide calendar against Nerissa\'s tidal records');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
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
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Selka's second booking register doesn't go to Harbor Authority inspectors.",
    tags: ['Stage2', 'NPC'],
    xpReward: 66,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'pressing Selka Tideglass on the existence of a second booking register');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
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
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The bonded transit column has been audited three times. Same auditor. Always inconclusive.",
    tags: ['Stage2', 'NPC'],
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
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Every registered vessel has an approach chart. The Pallmark Reach has one. It shouldn't.",
    tags: ['Stage2', 'NPC'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'tracing Pallmark Reach approach chart in harbor pilot licensing board records');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.pallmark_pilot_chart_found = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The approach chart filed for the Pallmark Reach lists a pilot certification dated three months before the vessel's original commissioning date — the chart was registered before the ship existed. The licensing board clerk sets both documents side by side without being asked and reads the dates twice. The certifying pilot's name has not appeared on any active licensing roll for eleven years. Someone backdated the chart using an expired certification that no longer had a living holder to contradict it.`;
        addJournal('Pallmark Reach pilot chart predates vessel commissioning — certifying pilot license expired 11 years prior, holder untraceable', 'evidence', `cos-pilotchart-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The licensing board's intake desk requires a vessel owner authorization or a Harbor Captain countersignature before releasing approach charts for review. The clerk produces the authorization form before the request is complete — a pre-positioned reflex. Marrow Tideglass's administrative office receives the countersignature request within the hour. The inquiry is now cross-referenced between two offices and logged in both.`;
        addJournal('Pilot chart access blocked — Harbor Captain countersignature requested, cross-logged', 'complication', `cos-pilotchart-fail-${G.dayCount}`);
      } else {
        G.flags.pallmark_pilot_chart_found = true;
        G.investigationProgress++;
        G.lastResult = `The approach chart is in the board's archive without any access restriction — approach charts are not flagged as sensitive records. The Pallmark Reach chart lists a certifying pilot and a certification date. The clerk checks the active licensing roll without being asked. "That name isn't on the current roll." He pulls the lapsed roll for the relevant year. The name is there, marked inactive. Inactive certifications can't authorize new approach charts. This one did.`;
        addJournal('Pallmark Reach approach chart certified by lapsed pilot license — inactive on board roll at time of filing', 'intelligence', `cos-pilotchart-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The cargo insurance policy holder isn't a shipping company.",
    tags: ['Stage2', 'NPC'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'pressing cargo insurance broker on sealed container policy holder identity');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.cargo_insurer_policy_holder_found = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The broker opens the policy file with the manner of someone who has been waiting for permission to open it. The policy holder for every sealed container in the past eight months is a single registered entity: the Cosmouth Administrative Continuity Trust — a semi-public body with no trade function, no public address, and no licensing requirement under current maritime law. The Trust doesn't ship cargo. It holds insurance on cargo it has no legal relationship to. The premium payments route through a Shelkopolis-domiciled accounts office. The broker has flagged the account three times internally. None of the flags were escalated.`;
        addJournal('Sealed container insurance held by Cosmouth Administrative Continuity Trust — non-trading entity, 3 internal flags unescalated, premiums from Shelkopolis accounts', 'evidence', `cos-insurer-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The broker listens politely and then explains that policy holder details are commercially privileged. "That's not a Cosmoria Harbor Authority category. That's private commercial law." He is correct. He is also visibly relieved to be correct. His hands rest flat on the desk and stay there while he explains, which is a posture that takes effort. The conversation ends without anything useful and with the broker's name now on a list of people who were asked.`;
        addJournal('Cargo insurer declined to disclose policy holder — commercial privilege cited', 'complication', `cos-insurer-fail-${G.dayCount}`);
      } else {
        G.flags.cargo_insurer_policy_holder_found = true;
        G.investigationProgress++;
        G.lastResult = `The broker confirms the policy holder is a registered administrative entity rather than a shipping company or private merchant — unusual for cargo insurance, which typically names the shipper directly. He does not give the entity's name without further prompting, but he opens the filing index to show that all eight months of sealed container policies fall under a single policy number. One account, one holder, eight months of coverage. The premiums have never lapsed.`;
        addJournal('All sealed container policies under single account — administrative entity holder, continuous premiums over 8 months', 'intelligence', `cos-insurer-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The night platform roster shows the same crew every time. That's not how rosters work.",
    tags: ['Stage2', 'NPC'],
    xpReward: 66,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'cross-referencing quayside labor guild night platform crew rosters');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('finesse', (G.skills.stealth||0) + Math.floor(G.level/3));
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
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The bond surety covers every waived container. It has never once been called.",
    tags: ['Stage2', 'NPC'],
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
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The route ledger has a departure category. It doesn't appear in the public tariff schedule.",
    tags: ['Stage2', 'NPC'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'reviewing airship company route ledger for unlisted departure categories');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.airship_unlisted_category_found = true;
        G.investigationProgress++;
        G.lastResult = `The station office ledger uses seven cargo categories. The public tariff schedule published at the Harbor Authority intake desk lists six. The seventh — "Administrative Transit, Category T" — does not appear in any public document. Category T departures carry a flat rate that is three times the highest standard cargo tier. They are logged in the route ledger but do not generate a receipt in the standard ticketing series. The station manager locates the Category T entries for the past eight months without assistance: seventeen departures, all night airship, all listed with a Shelkopolis administrative address as the receiving destination.`;
        addJournal('Airship route ledger: Category T — unlisted in public tariff, 3x standard rate, no ticketing receipts, 17 night departures to Shelkopolis admin address', 'evidence', `cos-airshipcat-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The station office keeps its route ledger in an internal operations category — available to contracted cargo agents but not open to general inquiry. The station clerk checks the counter register for an active agency credential before pulling anything from the ledger shelf. There is no agency credential. The counter register gets a notation: inquiry type, date, physical description in four words. The ledger stays on the shelf and the station door has a bell on it that sounds when it opens or closes.`;
        addJournal('Airship station route ledger access denied — agency credential required, inquiry noted in counter register', 'complication', `cos-airshipcat-fail-${G.dayCount}`);
      } else {
        G.flags.airship_unlisted_category_found = true;
        G.investigationProgress++;
        G.lastResult = `The station manager allows a review of the departure ledger — it is technically an operational document, not a restricted one. The cargo categories visible in the ledger include one labeled Category T that does not match anything on the public tariff schedule posted at the counter. "That's an administrative billing category," the manager says. He does not explain further. The Category T entries appear seventeen times over eight months, clustered around night departures.`;
        addJournal('Airship station ledger contains Category T — absent from public tariff schedule, 17 appearances on night departures', 'intelligence', `cos-airshipcat-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The weighmaster logs every cargo weight at intake. The sealed containers are logged at zero.",
    tags: ['Stage2', 'NPC'],
    xpReward: 66,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'reviewing harbor weighmaster intake log for sealed container weight entries');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('vigor', (G.skills.survival||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.weighmaster_zero_entries_found = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The weighmaster pulls the intake log from a peg on the wall above his scale — it hangs there, open to the current month. Every cargo arrival gets a weight in stone, recorded in the weighmaster's hand. The sealed containers are logged at zero. Not estimated, not flagged as unweighed — zero, in a column that cannot legally read zero for physical goods. The weighmaster's initials appear next to each zero entry. He reads the entries without speaking for a long moment, then turns the log around to face you. He has been initialing zeroes for eight months. He did not refuse because he does not know what was in the containers, and zero seemed safer than asking.`;
        addJournal('Harbor weighmaster log: sealed containers entered at zero weight for 8 months — weighmaster initialed entries without weighing, chose zero over inquiry', 'evidence', `cos-weighmaster-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The weighmaster's intake area is active staging during pre-departure hours — a foreman redirects before the log is reached. The foreman is the same one who manages the night platform, and he uses the same patient, practiced tone to explain why this area is not accessible. He notes the time in the pocket ledger clipped to his belt without breaking eye contact. The note takes three seconds. He writes quickly.`;
        addJournal('Weighmaster area blocked during pre-departure — same night foreman, time logged in pocket ledger', 'complication', `cos-weighmaster-fail-${G.dayCount}`);
      } else {
        G.flags.weighmaster_zero_entries_found = true;
        G.investigationProgress++;
        G.lastResult = `The weighmaster shows the intake log without being asked twice. The sealed container entries stand out immediately: the weight column reads zero where every other entry carries a figure in stone. "Trade exemption category C — waiver says no secondary inspection. I logged them through." He points to the waiver authorization notation beside each zero. The notation is correct procedure. The zero weight is not. Cargo passing through a harbor station cannot legally weigh nothing.`;
        addJournal('Weighmaster log: sealed containers logged at zero weight per waiver — weight zero notation not legally valid for physical goods', 'intelligence', `cos-weighmaster-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Eight months of shift log entries. Not one is in the night watchman's hand.",
    tags: ['Stage2', 'NPC'],
    xpReward: 64,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(64, 'examining warehouse night watchman shift log for signature irregularities');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('finesse', (G.skills.stealth||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.warehouse_watchman_log_found = true;
        G.investigationProgress++;
        G.lastResult = `The watchman is not difficult to find — he is sitting at his post at the bonded warehouse entrance, shift log open on the table in front of him. When the log is laid flat and compared page to page, the signature on the sealed container arrival nights is a convincing forgery of his name but does not match the hand he uses to sign every other shift. He looks at both signatures for a long moment without speaking. "I was told my logs would be administered on those nights." He does not say who told him. His hands are steady. He has been waiting to say this to someone who was not his employer.`;
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
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Wax seal means they expect it unopened. Forty-one letters. All before a departure.",
    tags: ['Stage2', 'NPC'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'reviewing dock factor correspondence ledger for sealed-wax agent letters');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.dock_factor_wax_seal_found = true;
        G.investigationProgress++;
        G.lastResult = `The dock factor keeps a correspondence ledger as a professional habit — incoming letters logged by sender, date, and method of seal, because seal method indicates the sender's expectation of confidentiality. One agent has sent forty-one letters over eight months, all sealed with wax rather than paper tape, all arriving two to three days before a sealed container departure. The factor opens the last three letters in the file — he kept them, which is unusual; most correspondence gets returned or destroyed after action. The return address on each letter is a Shelkopolis administrative post box registered to the Cosmouth Administrative Continuity Trust.`;
        addJournal('Dock factor ledger: 41 wax-sealed letters from agent, all pre-dating sealed departures — return address: Cosmouth Administrative Continuity Trust, Shelkopolis post box', 'evidence', `cos-dockfactor-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The dock factor listens to the question and then picks up the correspondence ledger and moves it to the shelf behind him before he answers. "Correspondence between a factor and their clients is privileged to the same degree as legal correspondence under the Maritime Trade Code." He says this like someone reading from a document he has memorized in advance. The ledger goes spine-out on the shelf. He keeps his hand near it while he talks.`;
        addJournal('Dock factor refused correspondence ledger access — Maritime Trade Code privilege cited', 'complication', `cos-dockfactor-fail-${G.dayCount}`);
      } else {
        G.flags.dock_factor_wax_seal_found = true;
        G.investigationProgress++;
        G.lastResult = `The dock factor shows the correspondence ledger without strong objection — the ledger records method of seal as a professional notation, not content. One agent's entries stand out immediately: forty-one letters, all wax-sealed, spanning eight months. "Wax seal means they expect it not to be opened in transit," the factor says. "Paper tape means they don't much care either way." He notes the dates without being asked. Every wax-sealed letter precedes a sealed container departure by two to three days.`;
        addJournal('Dock factor correspondence: 41 wax-sealed letters from single agent, each 2-3 days before sealed container departure', 'intelligence', `cos-dockfactor-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The transit laundering route is confirmed. The tidal window is the trigger. Time to act.",
    tags: ['Investigation', 'Finale', 'Stage2', 'Consequence'],
    xpReward: 108,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(108, 'Cosmoria Stage 2 resolution');
      if (!G.investigationProgress || G.investigationProgress < 8) {
        G.lastResult = `The evidence chain has gaps. Marrow's departure logs, Coralyn's secondary ledger, Selka's booking record — each documents a piece. The piece that links the transit route to the Shelkopolis surge mechanism isn't assembled yet. Presenting an incomplete case to either the Harbor Authority or the airship network risks the whole thread being dismissed or buried before the key documents can be pulled. More time in Cosmoria first.`;
        G.recentOutcomeType = 'investigate'; return;
      }
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/2));
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
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "A sealed Collegium filing sits in the public index — clerk glances at the cabinet.",
    tags: ['Collegium', 'Stage2', 'Evidence'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'Cosmoria Collegium sealed filing');
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      var result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/2));
      if (result.isCrit || result.total >= 12) {
        G.flags.met_clerk_mevra = true;
        G.investigationProgress = (G.investigationProgress||0) + 1;
        G.lastResult = 'The clerk — Mevra — processes the records request correctly: logs it, stamps it, retrieves the index. The filing exists. She reads the access restriction line and says it cannot be released without Collegium authorization. Standard procedure. Then she glances at the cabinet behind her — the grey-tab dividers — and back to you. Half a second. She slides the denial form across with both hands. The filing number is visible on the index before she closes it: COL-7-RESTRICTED-COSM-14.';
        addJournal('Cosmoria records office: Collegium sealed filing COL-7-RESTRICTED-COSM-14 — clerk Mevra processed denial correctly but marked the grey-tab cabinet.', 'evidence');
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'Mevra stamps the request, notes the Collegium restriction, and adds a second notation: INQUIRY LOGGED PER COLLEGIUM PROTOCOL 14. The protocol requires that any access attempt on a sealed Collegium filing be reported to the issuing office within one business day. She is sorry. This is the procedure.';
        addJournal('Cosmoria records office: sealed filing access attempt — Collegium Protocol 14 notification triggered.', 'complication');
      } else {
        G.flags.met_clerk_mevra = true;
        G.lastResult = 'Mevra finds the filing in the index without difficulty — it is not hidden, just restricted. She reads the access line, explains the Collegium authorization requirement in clear procedural language, and slides the denial form across. The grey-tab cabinet behind her contains the restricted block. She does not look at it. The filing number is in the index, briefly visible: COL-7-RESTRICTED-COSM-14.';
        addJournal('Cosmoria records office: Collegium sealed filing COL-7-RESTRICTED-COSM-14 confirmed in public index — requires Collegium authorization to access.', 'evidence');
        G.investigationProgress = (G.investigationProgress||0) + 1;
      }
      G.recentOutcomeType = 'investigate';
    }
  },

  {
    label: "Peldan tracks Collegium authorization cadence — forty-one same-day approvals, never the same signature twice.",
    tags: ['Collegium', 'Stage2', 'Intelligence'],
    xpReward: 74,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'Cosmoria Collegium archivist cadence');
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      var result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/2));
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
      G.recentOutcomeType = 'investigate';
    }
  },

  {
    label: "The reading room patron closes the same volume to the same page every afternoon.",
    tags: ['stage2', 'cosmoria'],
    xpReward: 36,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(36, 'watching the reading room patron pattern');
      var roll = rollD20('finesse', G.skills.stealth);
      if (roll.total >= 13) {
        G.flags.cos_reading_room_patron_tracked = true;
        G.investigationProgress++;
        addNarration('The Closed Page', 'The patron arrives at the same lamp every afternoon and requests the same bound volume — a compiled tariff commentary that is normally checked out once or twice a year. He reads for forty minutes without turning a page, closes it to the same interior bookmark ribbon, and returns it. When his chair empties, the page opens to a marginalia index listing decommissioned vessel registries cross-referenced to their final cargo declarations. Someone has been reading the index without drawing it from the stacks, because drawing it would leave a patron record.');
        addJournal('Reading room: tariff commentary used as marginalia index for decommissioned vessel registries — access bypasses patron log', 'evidence');
        maybeStageAdvance();
      } else {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        addNarration('The Closed Page', 'The patron closes the volume the moment the bench across from his empties and someone sits. He does not look up. He tucks the bookmark ribbon deeper, lifts the volume, and returns it to the reshelving cart himself — a courtesy the reading room does not require. The reshelving clerk accepts it without comment and writes a short note in a pocket log that is not the patron register. You have been noticed, precisely and quietly, and the log that now holds your description is not one the archive publishes.');
      }
    }
  },

  {
    label: "An apprentice name sits on the yard rolls without a commission assignment.",
    tags: ['stage2', 'cosmoria'],
    xpReward: 34,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(34, 'cross-checking shipwright apprentice rolls against commissions');
      var roll = rollD20('spirit', G.skills.craft);
      if (roll.total >= 13) {
        G.flags.cos_shipwright_apprentice_found = true;
        G.investigationProgress++;
        addNarration('The Unassigned Hand', 'The apprentice rolls are kept in a salt-stained ledger on the yard master\'s bench, held open with a lead weight shaped like a fish. One name has been on the rolls for eleven months without a commission assignment, which is structurally impossible — unassigned apprentices rotate through berth maintenance every three weeks. The yard master scratches the side of his jaw while he looks at the entry, a habit he falls into when he is about to say something he has already decided not to say. The name pays yard dues promptly. The dues come from a Shelkopolis account.');
        addJournal('Shipwright yard: apprentice on rolls 11 months with no commission — Shelkopolis-sourced dues payment', 'evidence');
        maybeStageAdvance();
      } else {
        addNarration('Yard Protocol', 'The yard master closes the rolls ledger before the question is finished and slides the lead weight off the cover with the flat of his hand. Apprentice registration is a trade guild record, he says, and trade guild records require a trade guild credential to review. The yard smells of pine tar and cold iron. Two apprentices near the slipway have stopped planing a hull plank and are listening without appearing to listen. The ledger goes back on the shelf above the bench, and the yard master places the weight on top of it like a seal.');
      }
    }
  },

  {
    label: "The tax hall posting runs one column short this quarter.",
    tags: ['stage2', 'cosmoria'],
    xpReward: 38,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(38, 'reviewing Cosmoria tax hall quarterly revenue summary');
      var roll = rollD20('wits', G.skills.lore);
      if (roll.total >= 14) {
        G.flags.cos_tax_summary_reviewed = true;
        G.investigationProgress++;
        addNarration('Missing Column', 'The tax hall summary is displayed behind glass in the public atrium, quarters posted left to right. The most recent quarter has six revenue columns where every prior quarter posts seven. The missing column, on the older postings, is labeled "Harbor Exemption Revenue Recovered" — a recovery category that captures duty on retroactively disqualified cargo exemptions. The new posting has the label removed entirely, not zeroed out. Coralyn\'s notation in the archive back-reference file flagged the omission eight weeks ago. No correction has been issued. The summary still hangs behind glass.');
        addJournal('Tax hall summary missing Harbor Exemption Revenue column — archivist notation pending eight weeks without correction', 'evidence');
        maybeStageAdvance();
      } else {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        addNarration('Atrium Protocol', 'A tax hall monitor approaches from the side corridor before the glass has been read in full. Public posting review is permitted; close reading with notetaking is a separate inquiry that requires a filed form. He produces the form from a leather folio he carries specifically for this purpose. The atrium has three other people in it, and all three have found reasons to face the opposite wall. The form asks for name, purpose, and professional affiliation. The monitor waits. The pressure in the room has shifted without anyone raising a voice.');
      }
    }
  },

  {
    label: 'A sealed filing in the wrong stack. Collegium seal, not guild',
    tags: ['Records', 'Evidence'],
    xpReward: 20,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(20, 'sealed collegium filing');
      G.lastResult = 'The records request is for a routine filing. What comes back includes a second document — thick paper, red wax seal, Collegium administrative mark on the flap. It is in the wrong stack. The clerk notices at the same moment you do. She takes it back without a word and files it separately, in a drawer she locks. The routine document she gives you has nothing useful in it.';
      addJournal('A Collegium-sealed filing appeared in a routine records pull at Cosmoria — the clerk retrieved it before I could examine it. Source: Cosmoria civic records office.', 'evidence');
      G.recentOutcomeType = 'investigate';
      G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
      maybeStageAdvance();
    }
  },

  {
    label: 'The administrator checks the same folder before answering anything',
    tags: ['NPC', 'Intelligence'],
    xpReward: 15,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(15, 'collegium administrator pattern');
      G.lastResult = 'Three questions. Before each answer, her hand goes to the same slim folder on the left side of her desk — not opening it, just touching the edge. She is precise, procedural, correct in everything she says. The folder stays closed. She is not consulting it. She is checking it is still there. Whatever is in it shapes every answer she gives without ever being referenced directly.';
      addJournal('A Cosmoria Collegium administrator checks the same closed folder before answering each question — the folder never opens. Source: Cosmoria administrative office, morning session.', 'intelligence');
      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  {
    label: 'The hold stamp is dated three weeks after the document was filed',
    tags: ['Records', 'Evidence'],
    xpReward: 20,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(20, 'retroactive hold anomaly');
      G.lastResult = 'The filing date is on the cover page. The ADMINISTRATIVE HOLD stamp is on the third page, interior. Standard procedure puts it on the cover. The stamp date is three weeks after the filing date — the hold was applied retroactively, to a document that was already in circulation. There is no annotation explaining why. The archivist who pulls it for you does not seem to notice the discrepancy.';
      addJournal('An administrative hold at Cosmoria was applied retroactively — stamp date three weeks after original filing. No annotation. Source: Cosmoria civic archive, records retrieval desk.', 'evidence');
      G.recentOutcomeType = 'investigate';
      G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
      maybeStageAdvance();
    }
  },

];

// Sideplot injection — cosmoria harbor weight fraud rung2 hook
(function() {
  var _fraudRung2 = (typeof COSMORIA_HARBOR_WEIGHT_FRAUD !== 'undefined') ? COSMORIA_HARBOR_WEIGHT_FRAUD.rung2Hook() : null;
  if (_fraudRung2) COSMORIA_STAGE2_ENRICHED_CHOICES.push(_fraudRung2);
})();

window.COSMORIA_STAGE2_ENRICHED_CHOICES = COSMORIA_STAGE2_ENRICHED_CHOICES;
