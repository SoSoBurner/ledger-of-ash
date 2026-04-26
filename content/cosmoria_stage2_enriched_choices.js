/**
 * COSMORIA STAGE 2 ENRICHED CHOICES
 * Investigation arc: maritime archive / airship lane suppression compound transit
 * NPCs: Coralyn Tideglass (Archivist), Marrow Tideglass (Ship Captain),
 *       Selka Tideglass (Innkeeper), Tavian Tideglass (Market Clerk), Nerissa Tideglass (Shrine Attendant)
 */

const COSMORIA_STAGE2_ENRICHED_CHOICES = [

  {
    label: "Coralyn Tideglass at the Maritime Archive Hall has records of every vessel entering Cosmoria's harbor — one shipping agent has filed cargo declarations that do not match any registered vessel registry.",
    tags: ['Investigation', 'Stage2', 'Meaningful'],
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
    label: "Marrow Tideglass as Harbor Captain has authority over all vessel inspections — he has been instructed to wave through a specific category of sealed cargo containers.",
    tags: ['NPC', 'Persuasion', 'Stage2', 'Meaningful'],
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
    label: "Tavian Tideglass's Floating Market Exchange processes all incoming maritime cargo for retail distribution — the sealed containers never reach the market floor.",
    tags: ['NPC', 'Craft', 'Stage2', 'Meaningful'],
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
    label: "Selka Tideglass at the Cosmouth Dockside Inn hosts the shipping agents who work the Cosmoria maritime routes — one agent has been paying for rooms she never uses.",
    tags: ['NPC', 'Stealth', 'Stage2', 'Meaningful'],
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
        G.lastResult = `Selka thinks about it for a moment, then shrugs. "Books, pays full, leaves by evening. Eighteen times." She wipes the counter again. "Good business for me. Something about it that isn't good business for someone else, I'd guess." She puts the cloth down. She's willing to say that much because it doesn't cost her anything.`;
        addJournal('Shipping agent using inn as short-stay transit address', 'evidence', `cos-selka-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Nerissa Tideglass at the Sea Communion Shrine records tidal observations — the glyph surge timing at Shelkopolis correlates with specific tidal window combinations she has documented.",
    tags: ['NPC', 'Lore', 'Stage2', 'Meaningful'],
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
    label: "Coralyn's secondary ledger has a third column she didn't show — the one that logs who reviewed each entry.",
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
    label: "The night airship loading platform uses different quay markings than the day berths — someone painted them over.",
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
    label: "The archive staff noticed the wrong thing about the research request — the form, not the question.",
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
    label: "Stage 2 Cosmoria finale — the maritime transit laundering route and tidal surge mechanics are confirmed. Report to House Cosmouth authority or expose through the airship network.",
    tags: ['Investigation', 'Finale', 'Stage2', 'Consequence', 'Meaningful'],
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

];

// Sideplot injection — cosmoria harbor weight fraud rung2 hook
(function() {
  var _fraudRung2 = (typeof COSMORIA_HARBOR_WEIGHT_FRAUD !== 'undefined') ? COSMORIA_HARBOR_WEIGHT_FRAUD.rung2Hook() : null;
  if (_fraudRung2) COSMORIA_STAGE2_ENRICHED_CHOICES.push(_fraudRung2);
})();

window.COSMORIA_STAGE2_ENRICHED_CHOICES = COSMORIA_STAGE2_ENRICHED_CHOICES;
