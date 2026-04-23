/**
 * FAIRHAVEN STAGE 2 ENRICHED CHOICES
 * Investigation arc: glyph-cave pressure / celestial creature coordination, northern route staging
 * NPCs: Naevys Sunweave (Artisan), Serin Sunweave (Cleric), Thalen Sunweave (Alchemist),
 *       Vaelis Sunweave (Innkeeper), Maris Sunweave (Market Clerk)
 */

const FAIRHAVEN_STAGE2_ENRICHED_CHOICES = [

  {
    label: "Thalen's suppression compound ledger has a sealed-charter buyer and a northwest staging coordinate circled in red.",
    tags: ['Investigation', 'Stage2', 'Meaningful'],
    xpReward: 78,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(78, 'investigating glyph suppression contracts');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('craft', (G.skills.craft||0) + Math.floor(G.level/3));
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
    label: "Serin's sighting log: every celestial creature appeared in the aftermath of a glyph surge, not before.",
    tags: ['NPC', 'Lore', 'Stage2', 'Meaningful'],
    xpReward: 76,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(76, 'reviewing celestial creature sighting records');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
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
      const result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
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
    label: "Three guests, no names on record. North to south, sealed cases, every ten to twelve days.",
    tags: ['NPC', 'Stealth', 'Stage2', 'Meaningful'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'questioning Vaelis Sunweave innkeeper');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('persuasion', (G.skills.persuasion||0) + Math.floor(G.level/3));
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
    label: "Tool marks inside the cave mouth, above head height. Flat chisel cuts into the pressure nodes. Months old.",
    tags: ['Survival', 'Investigation', 'Stage2', 'Meaningful'],
    xpReward: 80,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(80, 'examining Watchers Perch glyph cave');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('survival', (G.skills.survival||0) + Math.floor(G.level/3));
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
    label: "Naevys keeps her old guild records separate from the shop ledger. The separation itself is the tell.",
    tags: ['stage2', 'fairhaven'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      var roll = rollD20('persuasion', G.skills.persuasion);
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
    label: "The purification fountain in the market square drains east. It hasn't drained east in living memory.",
    tags: ['stage2', 'fairhaven'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      var roll = rollD20('lore', G.skills.lore);
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
      var roll = rollD20('stealth', G.skills.stealth);
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
      var roll = rollD20('persuasion', G.skills.persuasion);
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
    label: "The western field road has fresh cart ruts. Nothing west of the marker road ships bulk goods.",
    tags: ['stage2', 'fairhaven'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      var roll = rollD20('survival', G.skills.survival);
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
    label: "Bringing a sealed Shelkopolis charter to a Cyfoes shrine marks the bearer as someone who answers to neither.",
    tags: ['stage2', 'fairhaven'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      var roll = rollD20('stealth', G.skills.stealth);
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
    label: "The northern staging location is confirmed. The threads are tight enough to act on.",
    tags: ['Investigation', 'Finale', 'Stage2', 'Consequence', 'Meaningful'],
    xpReward: 108,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(108, 'Fairhaven Stage 2 resolution');
      if (!G.investigationProgress || G.investigationProgress < 8) {
        G.lastResult = `The staging location sits at the edge of what can be confirmed. The threads are close but not yet tight enough to act on without risk of the whole operation shifting before anyone can respond.`;
        G.recentOutcomeType = 'investigate'; return;
      }
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('survival', (G.skills.survival||0) + Math.floor(G.level/2));
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

window.FAIRHAVEN_STAGE2_ENRICHED_CHOICES = FAIRHAVEN_STAGE2_ENRICHED_CHOICES;
