/**
 * FAIRHAVEN STAGE 2 ENRICHED CHOICES
 * Investigation arc: glyph-cave pressure / celestial creature coordination, northern route staging
 * NPCs: Naevys Sunweave (Artisan), Serin Sunweave (Cleric), Thalen Sunweave (Alchemist),
 *       Vaelis Sunweave (Innkeeper), Maris Sunweave (Market Clerk)
 */

const FAIRHAVEN_STAGE2_ENRICHED_CHOICES = [

  {
    label: "A sealed-charter buyer and a northwest staging coordinate circled in red. Thalen's ledger.",
    tags: ['Investigation', 'Stage2', 'Meaningful'],
    xpReward: 78,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(78, 'investigating glyph suppression contracts');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('spirit', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_thalen_sunweave = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `Thalen opens the ledger to the relevant page and keeps his finger on the line. The commission came through six months ago — bulk quantity, glyph-surge suppression grade. Buyer identified through a sealed charter reference only: no name, no location, just a charter code. Thalen found the same code on a delivery order from a different supplier last month. He points to his handwritten note in the margin. The compounds went northwest. He circled the staging coordinates in red.`;
        addJournal('Glyph suppression compounds — sealed charter buyer, northwest staging', 'evidence', `fair-thalen-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Thalen opens his contract file and places a specific clause in front of you before answering. Supplier confidentiality, added six months ago as a condition of continued business. He taps the paragraph. He would like to help and cannot. His hands are on the table. His expression says he knows exactly what the clause is for.`;
        addJournal('Alchemist confidentiality clause — route blocked', 'complication', `fair-thalen-fail-${G.dayCount}`);
      } else {
        G.flags.met_thalen_sunweave = true;
        G.investigationProgress++;
        G.lastResult = `Thalen confirms the scale of the order — more suppression compound than Fairhaven's chapel uses in a full year. No buyer name on the record, but the delivery address sits on the northern route coordination pattern you've been building. Someone dropped an anchor point in his ledger and walked away clean.`;
        addJournal('Suppression compounds link to northern route staging', 'evidence', `fair-thalen-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Every creature in Serin's sighting log appeared after a glyph surge. Not before.",
    tags: ['NPC', 'Lore', 'Stage2', 'Meaningful'],
    xpReward: 76,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(76, 'reviewing celestial creature sighting records');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_serin_sunweave = true;
        G.investigationProgress++;
        G.lastResult = `Serin pulls the correlation log without being asked — it's already been flagged for discussion. Every celestial creature sighting at Watchers Perch falls within eight hours of a regional glyph surge. Eight hours, not before. Serin has drawn the timeline across three columns. "They appear in the aftermath," he says. "Not the precursor." He circles the word aftermath. Something is moving through the surge residue — either drawn to it or routed through it deliberately.`;
        addJournal('Celestial sighting post-surge correlation confirmed — directional pattern', 'evidence', `fair-serin-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.reverence = (G.worldClocks.reverence||0) - 1;
        G.lastResult = `Serin's posture changes when you press on what the sightings mean practically. "These are divine observations. The correct framework is Felujitas doctrine, not pattern analysis." He closes the record. He isn't hostile — he's decided you're asking the wrong kind of question, and the conversation has ended on that basis.`;
        addJournal('Chapel records access refused — doctrinal friction', 'complication', `fair-serin-fail-${G.dayCount}`);
      } else {
        G.flags.met_serin_sunweave = true;
        G.investigationProgress++;
        G.lastResult = `Serin's three months of records show the correlation plainly. He made a note in the margin after the second month: "timing pattern — review." He suspected something before you arrived. The records exist because he didn't dismiss what he was seeing.`;
        addJournal('Serin sighting records — glyph correlation visible', 'evidence', `fair-serin-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Maris has eight manifests earmarked. All Panim memorial classification. None with contents Panim uses.",
    tags: ['NPC', 'Craft', 'Stage2', 'Meaningful'],
    xpReward: 74,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'examining Fairhaven market manifests');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_maris_sunweave = true;
        G.investigationProgress++;
        G.lastResult = `Maris has already earmarked eight manifests in a separate column in her ledger — her own initiative, noted before your arrival. All eight carry Panim memorial service classification. All eight contain materials that Panim memorial services have no use for. The weight and volume profiles match glyph suppression compound batches. She sets the ledger flat on the table. "Someone is routing these through a category that doesn't ask questions about contents."`;
        addJournal('Fairhaven manifests connect to Panim memorial cover and suppression compounds', 'evidence', `fair-maris-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The manifest review request goes to the exchange supervisor, who flags it as a compliance audit trigger. Within the hour the market audit protocol has opened, replacing informal access with a formal process that runs on its own timeline and excludes external review. The door has closed and locked itself.`;
        addJournal('Market audit triggered — access replaced', 'complication', `fair-maris-fail-${G.dayCount}`);
      } else {
        G.flags.met_maris_sunweave = true;
        G.investigationProgress++;
        G.lastResult = `Maris confirms the manifests are unusual. "Weight profiles don't match Panim memorial standards. I've noted it four months running." She hasn't reported it formally because she doesn't know what category it belongs to. She's been waiting for someone to come along who does.`;
        addJournal('Manifest weight irregularities — four months of noting', 'evidence', `fair-maris-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Three guests with no names on record. Sealed cases. Every ten to twelve days, north to south.",
    tags: ['NPC', 'Stealth', 'Stage2', 'Meaningful'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'questioning Vaelis Sunweave innkeeper');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_vaelis_sunweave = true;
        G.investigationProgress++;
        G.lastResult = `Vaelis describes the second guest in detail — build, clothing, the particular way he carries a sealed document satchel with one hand against his body. The description matches the chapel intermediary pattern from Shelkopolis. Always north to south. Always after the tenth hour. "He never signs the guest register," she says. "There's a standing arrangement. I was told the name wasn't necessary." Someone negotiated his invisibility in the formal record before he ever arrived.`;
        addJournal('Fairhaven inn — Shelkopolis chapel intermediary cross-identified', 'evidence', `fair-vaelis-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Vaelis listens to the first question and then excuses herself. She returns five minutes later to say she cannot help with guest inquiries. What she doesn't say: one of her regulars left instructions about exactly this situation. The report goes out that evening to an address she doesn't recognize but was told to use.`;
        addJournal('Inn report filed with unknown party — player compromised', 'complication', `fair-vaelis-fail-${G.dayCount}`);
      } else {
        G.flags.met_vaelis_sunweave = true;
        G.investigationProgress++;
        G.lastResult = `Three guests, no names on file. All come from the north and leave southward. Sealed documentation each time. Vaelis says the cycle runs every ten to twelve days. "Regular enough I stopped noting it," she says. She noted it anyway — it's in the back of the room ledger under miscellaneous.`;
        addJournal('Fairhaven inn — northern courier cycle confirmed', 'evidence', `fair-vaelis-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Tool marks above head height inside the cave. Flat chisel cuts into the pressure nodes.",
    tags: ['Survival', 'Investigation', 'Stage2', 'Meaningful'],
    xpReward: 80,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(80, 'examining Watchers Perch glyph cave');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('vigor', (G.skills.survival||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `The marks are inside the cave mouth, above head height — deliberate cuts into the glyph inscription at three specific pressure nodes. The tool used left a flat chisel pattern, not natural erosion. The modifications are months old; the cut edges have weathered. Cross-referencing the altered nodes against the regional surge calendar shows a consistent match: each major surge at Shelkopolis follows a tidal cycle that these modifications would amplify. The surges weren't natural variance. They were tuned.`;
        addJournal('Watchers Perch cave modified — engineered surges confirmed', 'evidence', `fair-cave-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `Your hand brushes a pressure node mid-examination. The release is small — a low pulse that rolls out through the rock and lights up the glyph seam at the entrance for three seconds. Three seconds is long enough to be visible from the market district. By the time you've cleared the cave mouth, someone is already watching from the road.`;
        addJournal('Glyph pressure release — presence at cave known', 'complication', `fair-cave-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.lastResult = `Tool marks inside the entrance — flat chisel cuts into the inscription face, not natural wear. The pattern suggests intentional modification but the age and purpose aren't readable without glyph architecture training. The work was done by someone who knew which nodes to touch.`;
        addJournal('Cave tool marks — human activity confirmed, interpretation limited', 'evidence', `fair-cave-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Guild records kept separate from the shop ledger. That separation doesn't happen by accident.",
    tags: ['stage2', 'fairhaven'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      var roll = rollD20('charm', G.skills.persuasion);
      if (roll.total >= 13) {
        G.flags.met_naevys_sunweave = true;
        G.investigationProgress++;
        addNarration('Naevys Sunweave — Guild Archive', 'Naevys does not fetch the archive without being asked twice. The second time, she sets it on the workbench with both hands and does not step back. The records run twelve years — guild commissions, tool certifications, craft inspections. A gap appears eighteen months ago: two full seasons with no inspection stamps, no commissions, no certifications. She taps the blank column. "They stopped coming," she says. "I assumed the route had changed. Now I am less sure."');
        addJournal('Naevys guild archive gap — eighteen months without inspection stamps, northern route disruption', 'evidence');
        maybeStageAdvance();
      } else {
        addNarration('Naevys Sunweave — Deflection', 'Naevys listens to the question and then arranges three tools on her workbench in order of size, taking her time. "Guild records are a private matter between myself and the certification body." She doesn\'t say no. She says it in a way that ends the conversation without requiring her to have said anything at all.');
      }
    }
  },

  {
    label: "The market square fountain drains east. Nobody here can remember it doing that before.",
    tags: ['stage2', 'fairhaven'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      var roll = rollD20('wits', G.skills.lore);
      if (roll.total >= 13) {
        G.investigationProgress++;
        addNarration('Cyfoes Fountain — Drainage Shift', 'The market square fountain runs from a carved stone basin fed by a spring channel under the paving. The drain faces east now — the basin lip has been re-seated, recently, with fresh mortar still pale against the old stone. The original drain faced west toward the chapel. An eastward drain in Cyfoes fountain practice routes the blessing flow away from the faith ward and toward the field roads. Someone relocated the basin without announcing it. The shrine attendant nearby has not acknowledged the change, which is its own kind of acknowledgment.');
        addJournal('Cyfoes fountain re-seated — drain redirected away from chapel ward, unreported', 'discovery');
        maybeStageAdvance();
      } else {
        addNarration('Cyfoes Fountain — Nothing Legible', 'The fountain basin looks worn and ordinary. The water moves. The mortar at the base is patchy in a few places, but Fairhaven is an old town and old mortar cracks. Nothing here reads as unusual without more to go on.');
      }
    }
  },

  {
    label: "Elira brings a Cyfoes oil lamp to a glyph-marked table. The whole room goes quiet.",
    tags: ['stage2', 'fairhaven'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      var roll = rollD20('finesse', G.skills.stealth);
      if (roll.total >= 13) {
        G.flags.met_elira_sunweave = true;
        G.investigationProgress++;
        addNarration('Elira Sunweave — Lamp Test', 'Elira carries the Cyfoes lamp through the common room without comment, but the path she takes is deliberate. She passes the corner table where the three regulars sit with their backs to the wall. When the lamp comes within arm\'s reach, one of them sets down his cup without drinking and does not pick it up again. His hand stays flat on the table. The lamp moves on. Elira does not look back. Outside, in the yard, she says quietly: "They know what that lamp tests for. Anyone who doesn\'t know just watches the light."');
        addJournal('Elira lamp test — glyph-sensitized guests at corner table, self-identified by reaction', 'evidence');
        maybeStageAdvance();
      } else {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        addNarration('Elira Sunweave — Noticed', 'The lamp test works, but you are watching too openly. The man at the corner table looks up before Elira reaches him. His gaze goes to you first, not to her. He picks up his cup and drains it and stands. By the time the lamp passes his table he is already at the door. Elira comes back to the yard with nothing to report, and a careful expression that says she knows exactly what went wrong.');
      }
    }
  },

  {
    label: "Serin has been keeping a second log. The chapel doesn't know it exists.",
    tags: ['stage2', 'fairhaven'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      var roll = rollD20('charm', G.skills.persuasion);
      if (roll.total >= 13) {
        G.flags.met_serin_sunweave = true;
        G.investigationProgress++;
        addNarration('Serin Sunweave — Private Record', 'Serin pulls the second log from under a stack of hymnals and sets it face-down on the table before turning it over. The entries run in smaller script than his official records — dates, compass headings, estimated altitudes. Every sighting he logged for himself after submitting the chapel copy. The private entries include three observations he left out of the formal record: two with approach vectors from the northwest, one that landed briefly on the cave shelf before lifting again. "The doctrine says to record what is seen," he says. "It does not say to record what it means."');
        addJournal('Serin private log — northwest approach vectors and cave shelf landing omitted from chapel record', 'evidence');
        maybeStageAdvance();
      } else {
        addNarration('Serin Sunweave — Closed', 'Serin listens to the question and then straightens the hymnals on the shelf beside him, spine by spine, taking his time. "My records are submitted to the chapel archive on a quarterly basis." He does not say there are no other records. He says it in a way that makes clear the quarterly submission is the only thing he intends to discuss.');
      }
    }
  },

  {
    label: "Fresh cart ruts on the western field road. Nothing west of the marker ships bulk goods.",
    tags: ['stage2', 'fairhaven'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      var roll = rollD20('vigor', G.skills.survival);
      if (roll.total >= 13) {
        G.investigationProgress++;
        addNarration('Western Field Road — Cart Track', 'The ruts cut through field road clay that hasn\'t been graded since last season. Two sets of wheel marks, wide gauge, heavily loaded — the near wheel sank four finger-widths into the soft shoulder at the bend. The road ends at the equipment barn and the old drainage channel. Neither receives bulk deliveries. Backtracking the tire marks to the market gate shows the departure time was after the second watch bell, when the market records close for the night. Whatever moved through here was not moving under a manifest.');
        addJournal('Western field road — overnight heavy-load cart tracks, no market manifest coverage', 'discovery');
        maybeStageAdvance();
      } else {
        addNarration('Western Field Road — Inconclusive', 'The field road shows cart traffic, but the clay is churned enough from the last market week that individual tracks can\'t be separated cleanly. Farm equipment, delivery carts, a traveling smith\'s wagon — all of it has passed here recently. The depth and gauge of specific ruts isn\'t readable without better conditions or a clearer baseline.');
      }
    }
  },

  {
    label: "A Shelkopolis charter at a Cyfoes shrine marks the bearer as answering to neither.",
    tags: ['stage2', 'fairhaven'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      var roll = rollD20('finesse', G.skills.stealth);
      if (roll.total >= 13) {
        G.investigationProgress++;
        addNarration('Cyfoes Shrine — Charter Bearer', 'The shrine attendant\'s hands stop mid-offering arrangement when the sealed charter comes out. He does not look at the bearer\'s face — he looks at the seal, and then at the charter ribbon, and then at the seal again. His thumb finds the chalk edge of the ward mark in the doorframe without him seeming to notice it. In Fairhaven, presenting a Shelkopolis administrative charter at a Cyfoes shrine signals that the bearer operates outside both the guild registry and the chapel record. The attendant finishes his arrangement and steps to the far side of the altar without speaking. He will not record having seen this person.');
        addJournal('Cyfoes shrine — sealed charter bearer observed, outside both guild and chapel record systems', 'intelligence');
        maybeStageAdvance();
      } else {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        addNarration('Cyfoes Shrine — Wrong Read', 'The approach draws the attendant\'s attention but not in the right direction. He steps forward to correct what he reads as a purification lapse — a visitor standing too close to the offering basin before completing the hand-ward sequence. The correction is quiet and procedural, but it pulls focus from the charter bearer, who uses the moment to complete the exchange and leave. The window closes before anything useful passes through it.');
      }
    }
  },

  {
    label: "Six vessels arrived without signing out — night clearance invoked.",
    tags: ['stage2', 'fairhaven', 'dock_records'],
    xpReward: 34,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      var roll = rollD20('wits', G.skills.lore);
      if (roll.total >= 13) {
        G.investigationProgress++;
        addNarration('Dock Authority Ledger — Missing Departures', 'The dock authority keeps arrivals in the left column and departures in the right, bound in the same daily ledger. Six vessels from the past two months have arrival entries with no corresponding departure — the right column is blank beside each one. The harbormistress\'s annotation on two of them reads "night clearance — no manifest presented." On the other four there is no annotation at all. Night clearance is a discretionary exception for guild-credentialed vessels in emergency conditions. None of the six entered through the standard credentialing queue. Their cargo classifications are listed as \'passenger and correspondence\' — the category that waives contents inspection.');
        addJournal('Dock authority ledger — six vessels departed without sign-out, night clearance invoked, contents inspection waived', 'evidence');
        maybeStageAdvance();
      } else {
        addNarration('Dock Authority Counter — Access Refused', 'The harbormistress\'s deputy is behind the counter and is not the harbormistress. He listens to the request for departure records and then checks a list pinned to the board behind him. Your name is not on it. "Ledger access requires a standing harbour-inquiry authorization from the Roadwarden post or the guild registry." He puts the list back without reading it aloud. The counter is closed to you.');
      }
    }
  },

  {
    label: "A south pier manifest carries an expired seal predating delivery.",
    tags: ['stage2', 'fairhaven', 'manifest_anomaly'],
    xpReward: 34,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      var roll = rollD20('spirit', G.skills.craft);
      if (roll.total >= 13) {
        G.investigationProgress++;
        addNarration('South Pier — Backdated Manifest Seal', 'The shipping agent spreads three manifests across the pier desk without being prompted. The third: a bulk delivery cleared through Fairhaven\'s south pier seven weeks ago. The authorization seal carries a certification date that expired forty-three days before the manifest was stamped. The seal was genuine — issued by a real authority — but its validity window closed before this delivery arrived. Someone used an expired seal and the pier inspector did not flag it, or chose not to. The agent taps the certification date twice. "That\'s not the inspector\'s handwriting on the clearance line," he says.');
        addJournal('South pier manifest — authorization seal expired before delivery date, clearance line handwriting mismatch', 'evidence');
        maybeStageAdvance();
      } else {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
        addNarration('South Pier — Agent Closed', 'The shipping agent at the south pier desk does not look up when you approach. He is cross-referencing two tally sheets and sets a finger on the column he is tracking before acknowledging you. "Manifest queries go through the dock registry, north end." He returns to the column. His shoulders are held with the careful blankness of someone who has been told to send people north.');
      }
    }
  },

  {
    label: "The same three-day transit window every twelve days. No cargo declared at the checkpoint.",
    tags: ['Stage2', 'Lore'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'cross-referencing Roadwarden checkpoint transit logs');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.roadwarden_logs_reviewed = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The checkpoint log for the northern Fairhaven road shows a recurring transit pattern across fourteen weeks: three days of elevated passage activity, then nine days of nothing, then three again. The declared cargo field reads "correspondence — no contents declaration required" on every entry. The checkpoint warden's initials appear on the waved-through lines, but the initials are not consistent — different wardens, same waiver. Someone has embedded the waiver practice into the station's working culture. Nobody had to instruct the warden on duty. The pattern simply ran.`;
        addJournal('Roadwarden checkpoint — recurring twelve-day transit window, blanket correspondence waiver across multiple wardens', 'evidence', `fair-rwlog-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The checkpoint log request goes to the district post, where it sits behind two pending audits from the Shelkopolis coordination office. The duty clerk marks it received and tells you to expect a response in the standard window. Standard window is fourteen days. Whatever the logs contain, they are not readable from here today.`;
        addJournal('Roadwarden log request deferred — fourteen-day queue', 'complication', `fair-rwlog-fail-${G.dayCount}`);
      } else {
        G.flags.roadwarden_logs_reviewed = true;
        G.investigationProgress++;
        G.lastResult = `The transit logs cover twelve weeks. Every twelfth day, a cluster of three to four entries carries the correspondence waiver instead of a cargo declaration. The warden on shift rotates, but the waiver language is identical each time — copied, not written fresh. The pattern is consistent enough to predict the next transit window.`;
        addJournal('Roadwarden checkpoint — correspondence waiver pattern identified, next window predictable', 'intelligence', `fair-rwlog-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The harbormistress signs every night clearance herself. She knows what she's waiving.",
    tags: ['Stage2', 'NPC'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'confronting harbormistress Aldra Wennis on night clearance authorizations');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_aldra_wennis = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Aldra Wennis listens without expression. When you finish she sets both hands flat on the edge of her desk and looks at the harbor window for four seconds before answering. She did not write "night clearance" in the ledger. The phrase is her deputy's. She signed the authorizations under a standing agreement with the guild registry that she now states plainly she has come to doubt. She opens the side drawer, removes a folded letter, and places it face-up on the desk. The letter carries a sealed charter reference. She has been keeping it.`;
        addJournal('Harbormistress Aldra Wennis — sealed charter letter retained, deputy added night clearance language without authorization', 'evidence', `fair-aldra-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `The question lands wrong. Aldra's posture shifts by a degree before she speaks. "The night clearance protocol is a discretionary tool within the harbor registry's mandate. I'd recommend directing procedural questions through the correct administrative channel." She marks something in her duty log after you leave. Her pen does not pause.`;
        addJournal('Harbormistress alerted — duty log entry made after questioning', 'complication', `fair-aldra-fail-${G.dayCount}`);
      } else {
        G.flags.met_aldra_wennis = true;
        G.investigationProgress++;
        G.lastResult = `Aldra confirms her signature on the clearances. She chooses each word with the care of someone who has rehearsed the answer. "Emergency discretionary clearance is within the harbor registry's authority." She does not say the clearances were appropriate. She says they were authorized. The difference runs like a fault line under the conversation.`;
        addJournal('Harbormistress confirmed signatures — no explanation given for credential gaps', 'intelligence', `fair-aldra-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The northern approach to Watchers Perch has a secondary path. Someone has used it recently.",
    tags: ['Stage2', 'Stealth'],
    xpReward: 66,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'tracking secondary approach to Watchers Perch cave');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('finesse', (G.skills.stealth||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.northern_approach_tracked = true;
        G.investigationProgress++;
        G.lastResult = `The secondary path leaves the main road two hundred yards before the cave marker and cuts north through low scrub. It has been used at least four times in the past two months — the brush springs back but not completely, and the root exposure on one steep section shows a worn groove from repeated boot placement at the same angle. A flat shelf halfway up holds three anchor points for ropes: iron pins driven into the limestone, old rust at the collar but fresh marks at the eye. Someone runs equipment up this path. Not cargo. Tools.`;
        addJournal('Secondary Watchers Perch approach — rope anchor points, equipment access route confirmed', 'evidence', `fair-path-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `The secondary path is clearly used, but following it in poor light means your own passage leaves marks. Boot prints in the soft clay at the top of the shelf, a broken branch at mid-height — the kind of sign that announces someone was here and looking. You clear what you can, but not all of it.`;
        addJournal('Secondary path approach — own presence marked at cave shelf', 'complication', `fair-path-fail-${G.dayCount}`);
      } else {
        G.flags.northern_approach_tracked = true;
        G.investigationProgress++;
        G.lastResult = `The scrub brush along the secondary path has been pushed aside repeatedly — the stems flex the wrong direction, bent and held, then released. The path leads to the limestone shelf below the cave mouth. Recent boot prints in the clay, more than one person, different sole weights. The access is being used, but the purpose isn't readable from the marks alone.`;
        addJournal('Secondary approach to cave — multiple-person traffic confirmed', 'evidence', `fair-path-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Thalen's suppression compound supplier is not in Fairhaven. The delivery address traces back to Shelkopolis.",
    tags: ['Stage2', 'Craft'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'tracing suppression compound supply chain to Shelkopolis origin');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('spirit', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.shelkopolis_supply_traced = true;
        G.investigationProgress++;
        G.lastResult = `Cross-referencing Thalen's compound batch records against the guild's inter-locality supply register produces one match: a chartered supplier registered in Shelkopolis under a subsidiary name that resolves to the same sealed charter code that appears in the Panim memorial manifests and the dock clearance paperwork. The same charter entity is sourcing the compounds, routing them through Fairhaven, and waiving its own cargo inspection along the way. The supply chain and the distribution chain are the same organization.`;
        addJournal('Suppression compound supply traced to Shelkopolis charter entity — same code across three document types', 'evidence', `fair-supply-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The inter-locality supply register requires a guild trace authorization to cross-reference charter codes across polity lines. The authorization form goes to the guild registry clerk who handles the Shelkopolis district. She is away from her post until the morning of the third day from now. The inquiry sits on her desk.`;
        addJournal('Supply chain cross-reference blocked — guild authorization pending', 'complication', `fair-supply-fail-${G.dayCount}`);
      } else {
        G.flags.shelkopolis_supply_traced = true;
        G.investigationProgress++;
        G.lastResult = `The supplier delivering to Thalen operates under a Shelkopolis subsidiary registration. The subsidiary name appears in two other Fairhaven supply records from different vendors in different categories. Same entity, different faces. The pattern of a single supplier reaching into multiple Fairhaven businesses under different names is visible; the full scope of it isn't.`;
        addJournal('Shelkopolis subsidiary supplier in multiple Fairhaven vendor records — full scope unclear', 'intelligence', `fair-supply-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The courier cycle runs on the tide. The next window is the fourth hour tomorrow.",
    tags: ['Stage2', 'Survival'],
    xpReward: 66,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'timing courier cycle against tide schedule at Fairhaven dock');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('vigor', (G.skills.survival||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.courier_cycle_timed = true;
        G.investigationProgress++;
        G.lastResult = `The tide tables posted at the dock master's board confirm it. Low tide on the north channel — the one that runs past the equipment barn at the end of the western field road — occurs every twelve days at the fourth hour. At low tide, a flat-bottomed supply vessel can move through the shallows without logging a harbor entry. The courier cycle Vaelis described at the inn, the field road ruts, the dock clearances, and the glyph surge calendar all share the same twelve-day interval. The schedule is the system.`;
        addJournal('Courier cycle runs on twelve-day tide window — north channel low tide enables unlisted vessel transit', 'evidence', `fair-tide-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `You are at the tide board long enough to be noticed. A dock hand two bollards down watches without moving for three minutes, then walks inland. The tide schedule is public information, but standing at it long enough to copy figures and match them against an inquiry notebook is not invisible behavior.`;
        addJournal('Tide board observation — presence at dock noted', 'complication', `fair-tide-fail-${G.dayCount}`);
      } else {
        G.flags.courier_cycle_timed = true;
        G.investigationProgress++;
        G.lastResult = `The twelve-day interval between Vaelis's guest cycles matches the north channel low-tide window. At the fourth hour on those nights the channel shallows enough for small unlisted vessels to transit without harbor logging. The timing fits. What moves through it isn't visible from the tide board.`;
        addJournal('Twelve-day tide window confirmed — fits inn courier cycle interval', 'intelligence', `fair-tide-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The equipment barn has a false floor. The smell coming up through the boards is not grain.",
    tags: ['Stage2', 'Survival'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'examining equipment barn at western field road terminus');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('vigor', (G.skills.survival||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.equipment_barn_searched = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The false floor sits under the northeast corner, hinged at the wall stud. Below it: a staging cavity four feet deep, lime-washed to kill residue smell, with three ceramic amphorae still in transit racking. The rack itself is purpose-built — fitted slots at the exact diameter of the suppression compound containers Serin described. The cavity is empty now but recently used; the lime wash is still tacky at the seams. Someone cleared this ahead of the tide window.`;
        addJournal('Equipment barn false floor — compound staging cavity, purpose-built amphorae racking, recently cleared', 'evidence', `fair-barn-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The barn door is not latched. It swings open too easily and the interior smells of something sharp underneath the familiar must of old straw. But the floor boards are thick and close-fitted and there is no obvious seam or hinge. You are still crouched at the corner when a figure appears in the barn doorway behind you — a field hand, or someone dressed as one — who says nothing and does not move until you do.`;
        addJournal('Equipment barn entry noticed — watched departure, search incomplete', 'complication', `fair-barn-fail-${G.dayCount}`);
      } else {
        G.flags.equipment_barn_searched = true;
        G.investigationProgress++;
        G.lastResult = `The barn floor near the northeast wall has been relaid recently — the boards are slightly lighter where the clay dust hasn't settled fully into the grain. Tapping the section returns a hollow register. The cavity is sealed and there is no handle visible from above, but the access mechanism is there. Whatever's inside isn't accessible quickly or quietly.`;
        addJournal('Equipment barn — hollow floor section confirmed at northeast wall, access sealed', 'intelligence', `fair-barn-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The physic keeps treating the same rash. Different patients, same compound, same window.",
    tags: ['Stage2', 'NPC'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'consulting Fairhaven physic on compound exposure cases');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_physic_orra_seld = true;
        G.investigationProgress++;
        G.lastResult = `Orra Seld keeps a symptom calendar on the back of her dispensing ledger — a row of symbols she devised herself, one per patient visit, dated. Three patients over four months presented the same contact dermatitis pattern: skin at the wrists and lower forearms, resolving in ten days. The first two she treated as unrelated accidents. The third, six weeks ago, came in the same week as the cart ruts on the field road. She points to the calendar row. The dates align with the twelve-day courier cycle.`;
        addJournal('Physic Orra Seld — three compound-exposure patients, dates match twelve-day courier cycle', 'evidence', `fair-physic-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Orra Seld is precise about patient confidentiality in a way that closes every angle before you finish asking. "Treatment records belong to the patient and to the chapel dispensary register. They are not cross-referenced with external inquiries." She leans on the word external. Her hands are clasped on the counter and do not move.`;
        addJournal('Physic records access refused — patient confidentiality, chapel dispensary register cited', 'complication', `fair-physic-fail-${G.dayCount}`);
      } else {
        G.flags.met_physic_orra_seld = true;
        G.investigationProgress++;
        G.lastResult = `Orra confirms she has seen a skin presentation pattern she associates with chemical handling — base-grade suppression compound residue, by profile. More than once, from different patients. She won't share dates or names but she draws the symptom distribution on a scrap of paper and slides it across the counter: wrist-to-forearm, lateral edge, consistent with a container seal that leaks on the left side during transport.`;
        addJournal('Physic confirms compound-exposure presentation in multiple patients — container leak pattern identified', 'intelligence', `fair-physic-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The shrine visitor log goes somewhere Serin doesn't see. That wasn't always the arrangement.",
    tags: ['Stage2', 'Lore'],
    xpReward: 66,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'examining Cyfoes shrine visitor log held by attendant Brael');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.shrine_visitor_log_read = true;
        G.investigationProgress++;
        G.lastResult = `Brael's log is a cloth-bound pocket record, not a formal chapel document. He has been noting visitors who enter via the side door — the entrance that bypasses the chapel's public register — for seven months. Fourteen entries, each with a brief physical description and the charter seal color they carried. Six entries share the same seal description: dark wax, no visible guild mark, folded ribbon closure. The last entry is dated three days before the most recent cave surge. Brael holds the log by the spine. "I was told the Cyfoes practice requires witness." He was told by Serin. Serin does not know the log exists.`;
        addJournal('Shrine attendant private log — 14 unregistered visitors, six with matching dark-wax sealed charter, timing links to cave surge', 'evidence', `fair-shrine-log-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Brael is behind the offering basin when you enter and he watches the approach with the particular stillness of someone who has watched many approaches. He does not produce a log. He does not deny a log. He says the shrine's visitor records are a Cyfoes internal practice and not available to review. His thumb finds the chalk edge of the ward mark in the doorframe without him seeming to notice it. The conversation is over before it begins.`;
        addJournal('Shrine attendant declined — visitor log not confirmed, Cyfoes internal practice cited', 'complication', `fair-shrine-log-fail-${G.dayCount}`);
      } else {
        G.flags.shrine_visitor_log_read = true;
        G.investigationProgress++;
        G.lastResult = `Brael shows the log without the dates — he folds the right edge of each page to cover the calendar column before turning it. What remains visible: physical descriptions and charter seal colors. Three entries share a matching dark-wax seal with no guild mark. He does not explain why he keeps the record. He does not explain why he has agreed to show it.`;
        addJournal('Shrine attendant log — three matching dark-wax unsealed charter visitors, dates withheld', 'intelligence', `fair-shrine-log-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The cartwright built the sealed-compartment crates. He kept the written order.",
    tags: ['Stage2', 'NPC'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'tracing sealed-compartment crate commission with local cartwright Pell Orvast');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_cartwright_orvast = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Pell Orvast retrieves the letter from a flat tin box he keeps under the wheel-iron rack. He received the commission eight months ago: six crates with fitted ceramic-diameter slots, hinged false-bottom panels, and lime-wash coating on the interior. The specification is precise enough that he copied it twice to make sure he'd read it right. The letter carries no name, but the seal at the base matches the dark-wax description from the shrine log — no guild mark, folded ribbon closure. At the bottom, a delivery address: the equipment barn at the western field road terminus.`;
        addJournal('Cartwright Pell Orvast — commission letter for six compound crates, dark-wax unsealed charter, equipment barn delivery address', 'evidence', `fair-cart-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Pell listens to the description of the crates and his expression goes careful in a way that is not hostility. "I build what I'm contracted to build. The commission was paid in advance and the work was done to spec." He doesn't say he kept no paperwork. He says "commission was paid," twice, and looks at the door. Somewhere between those two statements the conversation has ended.`;
        addJournal('Cartwright declined — commission confirmed but not described, payment terms deflection', 'complication', `fair-cart-fail-${G.dayCount}`);
      } else {
        G.flags.met_cartwright_orvast = true;
        G.investigationProgress++;
        G.lastResult = `Pell built six crates to a specification he describes from memory: sealed interior panels, ceramic-fit slot brackets, lime-wash interior coat. He confirms he received the commission by letter, not in person. He no longer has the letter — he cleaned his order files last month — but he remembers the delivery address was on the western side of town. His description of the crates matches the suppression compound amphorae profile.`;
        addJournal('Cartwright confirms six sealed compound crates, western delivery address, commission received by letter', 'intelligence', `fair-cart-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The deputy wrote 'night clearance' into standing protocol. Nobody authorized that language.",
    tags: ['Stage2', 'NPC'],
    xpReward: 74,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'pressing deputy harbormistress Sava on night clearance protocol authorship');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.deputy_harbor_confronted = true;
        G.investigationProgress++;
        G.lastResult = `Sava holds eye contact for three seconds after you lay out what Aldra told you, then looks at the ledger surface to her left. The night clearance language was added at the request of a guild registry contact who approached her privately, not through the harbor authority's standard amendment process. The contact brought a written draft. She copied it into the standing protocol because the guild registry seal on the draft looked legitimate. She did not check the seal against the registry's current issue list. Her hands are very still. She has been waiting for this conversation.`;
        addJournal('Deputy Sava — night clearance protocol written by guild registry contact, seal legitimacy not verified', 'evidence', `fair-sava-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `Sava does not wait for the question to land before answering. "Harbor protocol amendments are recorded in the amendment log, available at the registry desk during operating hours." She is already at the door to the inner office. The door has a latch. The latch is engaged before you reach the counter edge.`;
        addJournal('Deputy harbormistress closed interview — alerted, amendment log reference only', 'complication', `fair-sava-fail-${G.dayCount}`);
      } else {
        G.flags.deputy_harbor_confronted = true;
        G.investigationProgress++;
        G.lastResult = `Sava confirms she wrote the night clearance language into the standing protocol, and that it was drafted from an external source she received in written form. She chooses not to describe that source further. What she does say: the draft arrived without going through the harbor authority's normal amendment review. She initialed the change. Aldra's signature followed.`;
        addJournal('Deputy confirms external draft source for night clearance language — amendment review bypassed', 'intelligence', `fair-sava-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The post commander's personal ledger has two entries that never made it to the official log.",
    tags: ['Stage2', 'Lore'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'reviewing Roadwarden commander Veth Olan personal notation ledger');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.commander_notation_read = true;
        G.investigationProgress++;
        G.lastResult = `Veth Olan's notation ledger is narrow-ruled and written in a hand smaller than his official log — the compression of someone working with limited page space and intent on keeping the volume portable. Two entries are marked with a double-strike through the date: incidents he observed but did not formally report. The first: a sealed-charter convoy passing the checkpoint at third-hour night with two Roadwarden escorts he did not dispatch and cannot account for. The second: a rider delivering a document to his own post that bypassed the standard routing slip. Both entries align with the correspondent's twelve-day cycle. He shows the ledger without being asked to. He has been waiting for the right person to show it to.`;
        addJournal('Commander Veth Olan personal ledger — two unfiled incidents: phantom escort convoy and unrouted post delivery, both in twelve-day cycle', 'evidence', `fair-cmdr-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Veth Olan runs a post that reports upward to the Shelkopolis coordination office on a quarterly basis. He says this early in the conversation in a way that is not incidental. "Anything you bring to me that goes into the official record goes to coordination." He does not say he has a personal record. His hand rests on a narrow-ruled ledger in the desk drawer, which he does not open.`;
        addJournal('Post commander deferred — upward reporting chain cited, personal notation not disclosed', 'complication', `fair-cmdr-fail-${G.dayCount}`);
      } else {
        G.flags.commander_notation_read = true;
        G.investigationProgress++;
        G.lastResult = `Veth confirms two incidents he recorded outside the official log: a checkpoint transit he could not account for and a post delivery that bypassed standard routing. He is willing to describe them but not to transfer the notation ledger or make copies. His posture says he has carried these entries for months without knowing what to do with them.`;
        addJournal('Post commander confirms two unlogged incidents matching twelve-day cycle — notation not transferable', 'intelligence', `fair-cmdr-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "A factor passed through twice last quarter and signed the same sealed charter at both stops.",
    tags: ['Stage2', 'Stealth'],
    xpReward: 66,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'tracking traveling factor Deen Ashwick across two Fairhaven charter stops');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('finesse', (G.skills.stealth||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.factor_ashwick_tracked = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Deen Ashwick's pattern is visible in the market exchange's voluntary trader register — two sign-ins, six weeks apart, under the same trade factor authorization code. Both entries carry the dark-wax sealed charter mark in the secondary verification column. Between the two Fairhaven visits, the same authorization code appears in the Roadwarden checkpoint log under the correspondence waiver. Ashwick is the human face on a sealed-charter route. He is not the architect — he carries a sealed case and a memorized cover story and he does not know what's in the amphorae.`;
        addJournal('Factor Deen Ashwick — dark-wax charter traced across two Fairhaven visits and checkpoint log, route courier identified', 'evidence', `fair-factor-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `The market exchange voluntary register is open on the counter desk, but watching it too obviously draws the desk clerk's attention. She takes the register off the counter before you finish, citing the two-minute handling rule for unsupervised external review. The register closes. The clerk's pen is already moving on a contact-slip.`;
        addJournal('Market exchange register closed under handling rule — desk clerk filed contact-slip', 'complication', `fair-factor-fail-${G.dayCount}`);
      } else {
        G.flags.factor_ashwick_tracked = true;
        G.investigationProgress++;
        G.lastResult = `The voluntary trader register shows two sign-ins under the same factor authorization code, six weeks apart. Both entries include the dark-wax secondary verification mark. The code itself is in the correct format for a licensed trade factor but does not appear in the main guild registry when cross-referenced. The factor is real; the authorization behind them is not.`;
        addJournal('Factor authorization code in two Fairhaven register entries — valid format, no guild registry match', 'intelligence', `fair-factor-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The guild certification inspector stopped coming to Fairhaven eighteen months ago. No reassignment was filed.",
    tags: ['Stage2', 'Lore'],
    xpReward: 64,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(64, 'tracing lapsed guild certification inspector route for Fairhaven district');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.certification_lapse_traced = true;
        G.investigationProgress++;
        G.lastResult = `The guild certification office in Fairhaven holds a route calendar going back four years. Eighteen months ago, the inspector assigned to the Fairhaven-northwest circuit simply stopped appearing on the monthly schedule. There is no reassignment record, no route transfer, no coverage appointment. The certification stamps that should have been issued in the gap period were issued anyway — Naevys's archive gap, the empty column she pointed to, is the visible mark of inspections that happened on paper but not in person. The gap is not administrative failure. It was cleared deliberately to let uninspected workshops operate under a credentialing cover.`;
        addJournal('Guild certification inspector route lapsed 18 months ago — stamps issued without inspection, Naevys gap confirmed as deliberate cover', 'evidence', `fair-cert-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The certification office clerk looks at the route calendar request with the practiced neutrality of someone who has been told what to say about schedule gaps. "Inspector routes are managed at the district coordination level. Route inquiries go through the district post." The district post is the Roadwarden post. The Roadwarden post reports to Shelkopolis coordination. The loop closes before you've left the counter.`;
        addJournal('Certification route inquiry redirected to Roadwarden post — jurisdictional loop closed', 'complication', `fair-cert-fail-${G.dayCount}`);
      } else {
        G.flags.certification_lapse_traced = true;
        G.investigationProgress++;
        G.lastResult = `The route calendar shows an eighteen-month gap in Fairhaven inspector visits. The clerk confirms no reassignment was filed for the gap period. The stamps that should appear in Naevys's archive during those months were issued from a district-level blanket authorization rather than individual inspector visits. Blanket authorization requires a district coordinator signature. The clerk does not know whose signature that is.`;
        addJournal('Certification gap — district blanket authorization used for 18 months, authorizing signatory unknown', 'intelligence', `fair-cert-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The northern staging location is confirmed. The threads are tight enough to act on.",
    tags: ['Investigation', 'Finale', 'Stage2', 'Consequence', 'Meaningful'],
    xpReward: 108,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(108, 'Fairhaven Stage 2 resolution');
      if (!G.investigationProgress || G.investigationProgress < 8) {
        G.lastResult = `The northwest coordinates sit in Thalen's margin note and the glyph cave tool marks point the same direction, but the connection between them isn't documented yet. A Roadwarden post won't act on a circled map coordinate and a cleric's sighting log. The courier pattern from the inn, the dock clearance procedure — one of those needs to close before the staging location holds as a formal claim.`;
        G.recentOutcomeType = 'investigate'; return;
      }
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('vigor', (G.skills.survival||0) + Math.floor(G.level/2));
      if (result.total >= 14 || result.isCrit) {
        G.flags.stage2_finale_institutional = true;
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 3;
        G.lastResult = `The report goes to the Roadwarden post with the northwest coordinates, the charter references, and Thalen's commission record as supporting material. The post commander reads it twice, then sends a rider to Shelkopolis command for authorization to proceed. The staging location is on record. Whatever moves next happens in daylight, with the Roadwarden seal behind it.`;
        addJournal('Fairhaven S2 finale: Roadwarden formal report filed', 'evidence', `fair-finale-inst-${G.dayCount}`);
      } else {
        G.flags.stage2_finale_underworld = true;
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 3;
        G.lastResult = `The staging location goes to Verdant Row before it goes anywhere official. The network has people at every checkpoint on the northern route by the following morning. The next shipment under the sealed charter reference is intercepted, documented, and dispersed before the Roadwardens have finished their authorization request. The formal record will catch up to what already happened.`;
        addJournal('Fairhaven S2 finale: informal network first-mover', 'evidence', `fair-finale-uw-${G.dayCount}`);
      }
      G.flags.stage2_faction_contact_made = true;
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

];

// Sideplot injection — fairhaven meadow mill displacement rung2 hook
(function() {
  var _millRung2 = (typeof FAIRHAVEN_MEADOW_MILL_DISPLACEMENT !== 'undefined') ? FAIRHAVEN_MEADOW_MILL_DISPLACEMENT.rung2Hook() : null;
  if (_millRung2) FAIRHAVEN_STAGE2_ENRICHED_CHOICES.push(_millRung2);
})();

window.FAIRHAVEN_STAGE2_ENRICHED_CHOICES = FAIRHAVEN_STAGE2_ENRICHED_CHOICES;
