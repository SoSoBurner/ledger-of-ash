/**
 * WHITEBRIDGE COMMUNE STAGE 2 ENRICHED CHOICES
 * Investigation arc: bridge crossing records / northern route transit monitoring
 * NPCs: Arbiter Nyra Thawmark (Communal Arbiter), Cadrin Crownmere (Bridge Clerk),
 *       Aster Starice (Night-Lantern Inspector), Thora Snowveil (Grain Measurer)
 */

const WHITEBRIDGE_COMMUNE_STAGE2_ENRICHED_CHOICES = [

  {
    label: "Cadrin Crownmere's Bridge Crossing Office records every transit — a specific crossing pattern repeats every twelve days and matches the northern courier schedule Vaelis Sunweave identified in Fairhaven.",
    tags: ['Investigation', 'Stage2', 'Meaningful'],
    xpReward: 74,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'cross-referencing bridge crossing patterns with Cadrin Crownmere');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_cadrin_crownmere = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `The pattern holds to within the same hour across seven months: two to three individuals, northbound at evening bell, returning southbound three days later. Every crossing carries a diplomatic transit exemption stamp. Cadrin opens the approval register for that exemption category and runs his finger down the column — no prior Council filings for any of these crossings. The exemption was applied by a Collegium liaison after the fact, not requested before. The paperwork was built around the crossing, not the reverse.`;
        addJournal('Whitebridge: 12-day courier crossings under unauthorized Collegium diplomatic exemption', 'evidence', `wb-cadrin-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Cadrin pulls the crossing record binders, then stops. The exemption-category files are marked for restricted external review — any third-party access requires written Arbiter authorization. He sets the binders back. "I can tell you the pattern exists. I can't let you read the pages without that authorization." The records are two feet away and inaccessible.`;
        addJournal('Bridge crossing records require Arbiter authorization — access blocked', 'complication', `wb-cadrin-fail-${G.dayCount}`);
      } else {
        G.flags.met_cadrin_crownmere = true;
        G.investigationProgress++;
        G.lastResult = `Cadrin taps the crossing log column without opening it. "Same party, same schedule, same exemption code, seven months running. I flagged it upward twice." He pauses. "Both flags came back cleared — administrative override, no explanation." He doesn't ask further. The override signature belongs to a position two levels above his supervisor.`;
        addJournal('Regular diplomatic exemption crossings — administrative override cleared 2 flags', 'evidence', `wb-cadrin-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Aster Starice's Night-Lantern Circuit surveys the bridge at night — she has witnessed cargo transfers occurring on the bridge after midnight that are not logged in any crossing record.",
    tags: ['NPC', 'Stealth', 'Stage2', 'Meaningful'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'gathering night-transfer witness account from Aster Starice');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('stealth', (G.skills.stealth||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_aster_starice = true;
        G.investigationProgress++;
        G.lastResult = `Aster pulls out her personal inspection log — a cloth-covered notebook separate from her duty forms. Six entries, each noting: two convoys, meeting at the bridge midpoint, container transfer, both convoys returning to their respective banks without completing a crossing. "Neither party crosses fully, so neither registers as a transit." She traces the entry with one finger. "The containers never touch the commune's arrival record at all." The same sealed charter mark on every container she's sketched. The bridge becomes the break in the tracking chain.`;
        addJournal('Bridge used as mid-transit exchange point — breaks cargo tracking chain, charter mark confirmed', 'evidence', `wb-aster-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Aster keeps her personal log in the inner pocket of her coat and keeps her hands there. She filed a report six weeks ago about unusual bridge activity at the second bell — it came back dismissed, and attached to the dismissal was a formal warning: "unauthorized observation outside circuit parameters." She holds the warning letter in her other hand. "I'm not sharing notes that cost me a formal mark on my record." She doesn't say she's afraid. The letter says it for her.`;
        addJournal('Night inspector declined — previous report dismissed, formal warning received', 'complication', `wb-aster-fail-${G.dayCount}`);
      } else {
        G.flags.met_aster_starice = true;
        G.investigationProgress++;
        G.lastResult = `Aster opens the notebook but keeps it angled toward herself. "Two convoys meet mid-bridge. Containers exchange hands. Both return the way they came. Nothing crosses fully, so nothing registers." She closes the notebook. "Six instances that I've noted. I have timing and a rough estimate of container volume each time. I'm not ready to hand this over, but I'll confirm what you already have."`;
        addJournal('Bridge midpoint exchanges — 6 instances logged, never registered as crossings', 'evidence', `wb-aster-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Arbiter Nyra Thawmark adjudicates crossing loss claims — a claim filed by a farmer for cargo damaged at the bridge contains a description of an unusual container he found on the bridge.",
    tags: ['NPC', 'Persuasion', 'Stage2', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'reviewing unusual container claim with Arbiter Nyra Thawmark');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('persuasion', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_arbiter_nyra_thawmark = true;
        G.investigationProgress++;
        G.lastResult = `The farmer's claim is three pages. He found a container blocking the bridge midpoint at dawn — sealed, heavy enough that he needed two neighbors to shift it to the rail. Moved it to file an obstruction report. Nyra opens the claim folder and slides a sealed evidence sleeve across the desk: inside, four glass vials, each with a wax-stamped label in a cipher she doesn't recognize. She had them inspected by the commune apothecary, who identified the contents as compound components consistent with suppression preparation. Nyra retained them under the claim. She pushes the sleeve the rest of the way across.`;
        addJournal('Arbiter has physical suppression compound samples from abandoned bridge container', 'evidence', `wb-nyra-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Nyra closes the folder before you can read the header. "Active arbitration — I can't share claim documentation with external parties while proceedings are open." The farmer submitted the claim; the consortium whose mark appeared on the container filed a counter-claim three days later. Active status locks the file. Six weeks until arbitration concludes. The evidence sleeve is on the desk behind her.`;
        addJournal('Claim under arbitration — external access blocked for 6 weeks', 'complication', `wb-nyra-fail-${G.dayCount}`);
      } else {
        G.flags.met_arbiter_nyra_thawmark = true;
        G.investigationProgress++;
        G.lastResult = `Nyra opens the folder and reads the farmer's description aloud without showing you the page. Bridge midpoint, sealed container, geometric mark, heavy. "Yes, that matches what you're describing." She closes it again. "I retained samples — the apothecary flagged them as unusual. I can't release them while the arbitration is open. But I'll confirm they exist and that the retention was deliberate." She holds eye contact. She wants you to know the evidence is there.`;
        addJournal('Arbiter retained unusual container samples — consistent with investigation targets', 'evidence', `wb-nyra-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Thora Snowveil's grain measurement records track all agricultural transit — sealed non-agricultural containers have been using grain convoy exemptions to cross the bridge without inspection.",
    tags: ['NPC', 'Craft', 'Stage2', 'Meaningful'],
    xpReward: 66,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'examining grain exemption misuse with Thora Snowveil');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('craft', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_thora_snowveil = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `Thora keeps her measurement ledger in a leather case with a strap worn smooth at the buckle. She opens to the flagged pages. Grain convoy declared weight: twenty sacks. Her platform scale: the equivalent of twenty-three to twenty-four sacks. The discrepancy recurs on the same convoy routing number across six separate crossings. "I file the discrepancy every time. Nobody adjusts the manifest." The routing number matches the agricultural exemption channel — sealed containers piggybacking through the grain classification to cross without cargo inspection.`;
        addJournal('Whitebridge grain weight discrepancies confirm same routing fraud as Harvest Circle — second transit layer', 'evidence', `wb-thora-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Thora's measurement ledger goes to the agricultural board each week for standard review. She sets her hand on the case. "Outside the review cycle, I can't share this without board approval. If I go around the standard process, my records lose standing in any formal proceeding." The approval request takes three working days minimum. The next board meeting is in five.`;
        addJournal('Grain measurement records under board review — non-standard access denied', 'complication', `wb-thora-fail-${G.dayCount}`);
      } else {
        G.flags.met_thora_snowveil = true;
        G.investigationProgress++;
        G.lastResult = `Thora opens the measurement ledger to the most recent flagged entry and turns it so you can see the column. "Declared: twenty sacks. My scale: twenty-three sacks equivalent. Same convoy routing number, same shortfall, six times now." She taps the filed discrepancy notation at the bottom of each entry. "I log every one. The manifests never get corrected." She hasn't connected the shortfall to anything specific. She's simply maintaining her records against the gap.`;
        addJournal('Grain weight discrepancies filed by Thora — unaccounted cargo in convoy', 'evidence', `wb-thora-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Arbiter Nyra has seen this container mark before — her Loss Ledger records reach back further than any crossing log.",
    tags: ['stage2', 'whitebridge_commune'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      var roll = rollD20('persuasion', G.skills.persuasion);
      if (roll.total >= 13) {
        G.flags.met_arbiter_nyra_thawmark = true;
        G.investigationProgress++;
        addNarration('Loss Ledger — Thawmark', 'Nyra opens the Loss Ledger binder to a tab marked three seasons back. The page describes a wagon axle failure mid-crossing — cargo declared as preserved goods, settlement paid, case closed. She points to the claimant\'s mark in the margin: the same geometric cipher from the seized vials. Her thumbnail stays on it. "Identical mark. Different crossing, different claim type, same party." She does not say what that means. She doesn\'t need to.');
        addJournal('Loss Ledger links cipher mark to prior cargo claim — same party across multiple incidents', 'evidence');
        maybeStageAdvance();
      } else {
        addNarration('Loss Ledger — Thawmark', 'Nyra locates the binder but sets it on the shelf behind her. The Loss Ledger is a formal arbitration record — sharing it outside a proceeding requires a written request to the Compacts council. She writes the request reference number on a slip and passes it across the desk. "Three to four days. If the Compacts approve it, I\'ll have the relevant pages ready." She is not obstructing. The process simply does not bend.');
      }
    }
  },

  {
    label: "The signal brazier platform on the east pier is the only vantage point that overlooks the full midspan.",
    tags: ['stage2', 'whitebridge_commune'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      var roll = rollD20('survival', G.skills.survival);
      if (roll.total >= 13) {
        G.investigationProgress++;
        addNarration('East Pier Brazier Platform', 'The platform is fixed to the outer rib of the bridgework, three meters above the crossing deck. Wind off the ice shelf cuts straight through. From here the full midspan is visible: both banks, the center support post, the gap between the rail sections where the decking flexes in freeze-thaw cycles. That gap is wider than it should be — the planking on the south side has been reset recently, fasteners new against weathered wood. The disturbed planks form a rough square large enough to conceal a container beneath the decking surface.');
        addJournal('Bridge midspan decking reset recently — concealment space beneath planks consistent with container transfer method', 'discovery');
        maybeStageAdvance();
      } else {
        addNarration('East Pier Brazier Platform', 'The climb is straightforward but the platform surface is glazed with ice melt refrozen at the edges. A boot slips on the return descent — nothing torn, nothing broken, but the noise carries. A route warden at the west bank gate turns and holds his position until you are back on the crossing deck. He logs something in the gate book. The vantage was not reached in time to see what needed seeing.');
      }
    }
  },

  {
    label: "A hauler at the shelter hall is loudly declaring a route condition the wardens have already cleared — the commune does not tolerate panic spreading.",
    tags: ['stage2', 'whitebridge_commune'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var roll = rollD20('stealth', G.skills.stealth);
      if (roll.total >= 13) {
        G.investigationProgress++;
        addNarration('Shelter Hall — Hauler\'s Complaint', 'The hauler is gesturing at the gate roster board, voice carrying across the shelter hall benches. Two wardens are moving to intervene. In the moment before they reach him, you position close enough to hear the specific complaint under the noise: he held at the east gate for two hours on a crossing that should have taken twenty minutes. The gate log showed his slot filled by an unlisted priority crossing — sealed cargo, diplomatic exemption, no declared route intent filed. The wardens reach him. The conversation becomes quiet and official. The gate log page is still visible on the board.');
        addJournal('Unlisted priority crossing displaced a registered hauler — no route intent declaration filed for diplomatic exemption transit', 'intelligence');
        maybeStageAdvance();
      } else {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        addNarration('Shelter Hall — Hauler\'s Complaint', 'The wardens reach the hauler before you do. By the time you are close enough to hear clearly, they have moved him to a side bench and the conversation has dropped to a murmur. One warden catches you standing nearby and steps between you and the bench without a word. The shelter hall goes back to its ordinary noise. Whatever the hauler was describing is now a private matter between him and the Compacts.');
      }
    }
  },

  {
    label: "Cadrin left one name off the record — the override signature is a person, not a position.",
    tags: ['stage2', 'whitebridge_commune'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      var roll = rollD20('persuasion', G.skills.persuasion);
      if (roll.total >= 13) {
        G.flags.met_cadrin_crownmere = true;
        G.investigationProgress++;
        addNarration('Override Signature — Crownmere', 'Cadrin sets a single sheet on the corner of the desk — the administrative override clearance, two lines of procedural language and a signature block at the bottom. The name in the block is handwritten: Overseer-Liaison Peleth Vorn, Northern Routes Collegium. The title does not appear in any published Compacts registry. Cadrin taps the bottom margin where the stamp should be. The stamp is absent. The clearance is valid by content, not by form. Someone signed it knowing the form would not be checked.');
        addJournal('Override clearances signed by Overseer-Liaison Peleth Vorn — title absent from published Compacts registry', 'evidence');
        maybeStageAdvance();
      } else {
        addNarration('Override Signature — Crownmere', 'Cadrin pulls the override file and reads the signature block himself. His expression does not change. "I know the name. I\'m not going to be the one to put it in front of you in writing." He closes the file and slides it back into the binder. He is not protecting the name. He is protecting the distance between himself and whatever comes next.');
      }
    }
  },

  {
    label: "The center support post carries every load that crosses — the scoring on it reads like a ledger.",
    tags: ['stage2', 'whitebridge_commune'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      var roll = rollD20('lore', G.skills.lore);
      if (roll.total >= 13) {
        G.investigationProgress++;
        addNarration('Center Support Post — Load Scoring', 'The post is two meters of fitted stone wrapped in iron banding. The banding shows compression scoring in horizontal bands at three distinct heights — normal crossing traffic scores in a scatter pattern; these are clean parallel lines, consistent with a rigid container edge resting in the same position across repeated crossings. The lowest band sits at crate-base height, roughly forty centimeters off the deck. The iron is scored there more than anywhere else on the structure. Whatever rested against this post, it rested here many times, always the same dimensions.');
        addJournal('Center support post iron banding shows repeated identical container scoring — consistent with staged midspan transfers', 'discovery');
        maybeStageAdvance();
      } else {
        addNarration('Center Support Post — Load Scoring', 'The post is visible from the crossing deck but a route warden is stationed at the midspan marker, logging traffic. Getting close enough to examine the banding means standing at the post longer than a hauler checking clearance — long enough for the warden to step over and ask for a declared route intent. The form takes ten minutes and goes into the gate log. The post goes unexamined.');
      }
    }
  },

  {
    label: "The gate warden flagged my pack before I said a word — he knows I haven't declared a route.",
    tags: ['stage2', 'whitebridge_commune'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var roll = rollD20('stealth', G.skills.stealth);
      if (roll.total >= 13) {
        G.investigationProgress++;
        addNarration('East Gate — Undeclared Transit', 'The warden lifts the barrier log and taps the blank column where a route declaration should be. You produce a transit chit from the shelter hall — technically a supply-run permit, not a crossing declaration, but the form shares a column header. The warden reads the chit twice, looks at your pack once, and enters it in the log under supply transit. While he writes, you read the facing page: three crossing slots this week marked with a stamp you have not seen before — a double-circle mark, no declared route, approved directly. The warden closes the log before you can read the approval source.');
        addJournal('Three recent crossings logged under unknown double-circle stamp — no route declared, approved outside normal channel', 'intelligence');
        maybeStageAdvance();
      } else {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
        addNarration('East Gate — Undeclared Transit', 'The warden stops you at the barrier and sets the log open to the declaration column. "Route and stated purpose, before the plank." There is no room to deflect — he has done this ten thousand times and the posture of someone who does not want to declare is familiar to him. You declare a general supply run. He logs it, notes the vagueness with a single word in the margin, and watches your exit. The gate log now carries your name against a flagged entry.');
      }
    }
  },

  {
    label: "Stage 2 Whitebridge Commune finale — the bridge is both a transit point and evidence source. Use Nyra's samples and Aster's log to formally close the crossing or quietly document the next transfer.",
    tags: ['Investigation', 'Finale', 'Stage2', 'Consequence', 'Meaningful'],
    xpReward: 104,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(104, 'Whitebridge Commune Stage 2 resolution');
      if (!G.investigationProgress || G.investigationProgress < 8) {
        G.lastResult = `Too many threads still open. The crossing pattern, the grain weight records, the physical samples — without all three in hand, any formal presentation leaves gaps the administration can use to dismiss it.`;
        G.recentOutcomeType = 'investigate'; return;
      }
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('persuasion', (G.skills.persuasion||0) + Math.floor(G.level/2));
      if (result.total >= 14 || result.isCrit) {
        G.flags.stage2_finale_institutional = true;
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 3;
        G.lastResult = `The Commune Council convenes in the crossing station's rear chamber — the largest interior space on the bridge itself. Nyra's vials sit in their evidence sleeve on the table. Aster's log lies open beside them. The grain weight ledger is stacked beneath. The Council votes to suspend all diplomatic exemption crossings before the session closes. The physical evidence goes to Roadwarden forensic review under the Council's formal authority. The bridge transit route is shut. Stage III opens with the Council's institutional weight behind it.`;
        addJournal('Whitebridge S2 finale: Council suspends diplomatic crossings, forensic evidence submitted', 'evidence', `wb-finale-inst-${G.dayCount}`);
      } else {
        G.flags.stage2_finale_underworld = true;
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 3;
        G.lastResult = `Using Aster's timing log, you position before the next scheduled mid-bridge exchange. Two convoys arrive from opposite banks at the second bell. You record both: the handlers, the container count, the duration of the transfer, the charter marks. The documentation reaches the Verdant Row network before dawn. By the following evening, the schedule is circulating among every faction with interest in the route. The next crossing never comes. The bridge goes quiet on those nights, and stays quiet.`;
        addJournal('Whitebridge S2 finale: next transfer documented and distributed — route abandoned', 'evidence', `wb-finale-uw-${G.dayCount}`);
      }
      G.flags.stage2_faction_contact_made = true;
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

];

window.WHITEBRIDGE_COMMUNE_STAGE2_ENRICHED_CHOICES = WHITEBRIDGE_COMMUNE_STAGE2_ENRICHED_CHOICES;
