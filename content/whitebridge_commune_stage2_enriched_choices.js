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
        G.lastResult = `Cadrin pulls the crossing record binders from the shelf and sets them on the counter before the restricted marking on the spine registers. The exemption-category files require written Arbiter authorization for any third-party access — he cannot hand them across without it, regardless of the urgency. He sets them back. "I can tell you the pattern exists. I can't let you read the pages without that authorization." The binders sit two feet away. Getting to them now runs through the Arbiter's desk.`;
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
        G.lastResult = `The folder closes before the header line is finished. Active arbitration proceedings lock all claim documentation to external parties — that is Compacts procedure, not discretion. Nyra sets the folder flat on the desk. The farmer submitted the original claim; the consortium whose mark appeared on the container filed a counter-claim three days later, which opened the formal proceeding and sealed the file. Six weeks until arbitration concludes. The sealed evidence sleeve sits on the shelf visible behind her right shoulder, labeled and present. Getting to it requires either waiting or finding another path through the proceeding.`;
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
        G.lastResult = `The leather case closes under Thora's hand before the question is fully out. The measurement ledger moves to the agricultural board each week for standard review — sharing it outside that cycle without board approval would strip the records of their formal standing in any proceeding. She is not being obstructive; she is protecting the evidentiary weight of the documents. "If I go around the standard process, my records lose standing in any formal proceeding." The approval request takes three working days. The next board meeting is in five. The ledger stays in the case.`;
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
        addNarration('Loss Ledger — Thawmark', 'Nyra opens the Loss Ledger binder to a tab marked three seasons back. The page describes a wagon axle failure mid-crossing — cargo declared as preserved goods, settlement paid, case closed. She points to the claimant\'s mark in the margin: the same geometric cipher from the seized vials. Her thumbnail stays on it. "Identical mark. Different crossing, different claim type, same party." The same sealed party filed two claims across two seasons under two different cargo descriptions and walked away clean both times. She does not say what that means. She doesn\'t need to — the pattern has already said it.');
        addJournal('Loss Ledger links cipher mark to prior cargo claim — same party across multiple incidents', 'evidence');
        maybeStageAdvance();
      } else {
        addNarration('Loss Ledger — Thawmark', 'Nyra locates the binder and sets it on the shelf behind her rather than on the desk. The Loss Ledger is a formal arbitration record — sharing it outside a proceeding requires a written request to the Compacts council. She writes the request reference number on a slip and passes it across. "Three to four days. If the Compacts approve it, I\'ll have the relevant pages ready." You ask directly whether the cipher mark appears in prior claims. She answers by describing the request process in more detail. The question was not difficult. She chose a different question to answer.');
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
        addNarration('Shelter Hall — Hauler\'s Complaint', 'The wardens reach the hauler before you do. By the time you are close enough to hear clearly, they have moved him to a side bench and the conversation has dropped to a murmur. One warden catches you standing nearby and steps between you and the bench without a word. His posture says nothing threatening — it says the hall has a boundary and you are on the wrong side of it. The shelter hall goes back to its ordinary noise. The hauler\'s specific complaint, whatever it was about the gate log and the unlisted crossing, is now a private matter between him and the Compacts, which is precisely how the Compacts prefers it to remain.');
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
        addNarration('Override Signature — Crownmere', 'Cadrin pulls the override file and reads the signature block himself. His expression does not change. You ask whether the override signature belongs to a Collegium-registered title. He answers by explaining the administrative override process: what a clearance looks like, what level of authority is required, how the form is verified. The procedure is correct. The name in the block is never mentioned. He closes the file and slides it back into the binder. He answered a different question than the one you asked, in enough detail that the conversation is now over. He is not protecting the name. He is protecting the distance between himself and whatever comes next.');
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
    label: "The shelter hall's evening story circle named an expedition that never returned",
    tags: ['stage2', 'whitebridge_commune', 'NPC', 'Persuasion', 'Meaningful'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'tracing the missing expedition through story circle');
      const result = rollD20('persuasion', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.wb_missing_expedition_traced = true;
        G.investigationProgress++;
        G.lastResult = `The elder keeping the bench passes you a clay cup before she answers — that is the shelter-hall rhythm, a cup for anyone who sits past the opening story. Nine haulers left on a northern run eight weeks ago. Their declared route runs through the grain convoy exemption corridor. No loss claim was filed. No Route Warden report was opened. She taps the log bar under the bench. "If the Compacts had a body, the Compacts would have a form. They have neither." Someone made the declaration disappear from the ledger rather than file the loss.`;
        addJournal('Nine-hauler expedition vanished — declaration erased rather than logged as loss', 'evidence', `wb-expedition-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The elder does not pass you a cup, which is the shelter-hall signal that the bench is closed. Two haulers at the far end of the hall stand when you press the question a second time. Their movement is not threat — it is the commune's first correction, the one that precedes a formal notice. You withdraw. The story you were asking after stays inside the circle, and your asking of it has been marked on the attention of the hall.`;
        addJournal('Shelter hall closed the bench — expedition inquiry marked', 'complication', `wb-expedition-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.lastResult = `The elder confirms the expedition, the count, the departure date. She will not confirm the declared route. "The shelter hall carries what the Compacts will not. That is the rule." She does not say why the Compacts refused to carry it. Her refusal to say is itself the second answer. Nine haulers do not disappear into a storm without a loss claim unless someone had reason to prefer the erasure.`;
        addJournal('Missing expedition confirmed — route details withheld by shelter hall', 'evidence', `wb-expedition-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The arbitration docket skipped a seat — an arbiter chair sits empty undeclared",
    tags: ['stage2', 'whitebridge_commune', 'Lore', 'Meaningful'],
    xpReward: 76,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(76, 'reading the skipped arbiter seat');
      const result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.wb_arbiter_seat_skipped = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `The docket is posted every cycle on the crossing station's interior pillar, under a glass panel clouded by ice breath. Five seats, five names — except this cycle, four names and one blank slot with the line "pending reassignment" set in fresh ink. No vacancy notice was posted at the cycle's opening. No arbiter retired. The clerk's marginal notation, visible only when the light from the signal brazier catches the glass at angle, reads: "stepped aside, no record filed." Someone vacated the seat under watchful pressure without the paperwork that the Compacts require.`;
        addJournal('Arbiter seat vacated off-record — scrutinized transition without formal notice', 'evidence', `wb-arbiter-seat-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The clerk closes the panel cover before you finish reading and slides the ceremonial crossing key into its socket above the frame — the commune's signal that the docket is closed for public view until next cycle. She does not ask what you were reading. She writes a line in her bench book. Your presence at the docket has been noticed and logged.`;
        addJournal('Docket closed against review — presence logged by clerk', 'complication', `wb-arbiter-seat-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.lastResult = `Four names, one blank. The clerk confirms the seat is pending but gives no reason. The Compacts permit vacancy without notice only under Loss Ledger bereavement clauses — which require a corresponding entry in the Loss Ledger. No such entry exists for this cycle. The blank is a procedural impossibility that has been allowed to stand.`;
        addJournal('Arbiter seat vacancy without Loss Ledger entry — procedural breach tolerated', 'evidence', `wb-arbiter-seat-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "A refugee carries papers stamped at a dome sealed four days ago",
    tags: ['stage2', 'whitebridge_commune', 'Survival', 'Meaningful'],
    xpReward: 74,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'reading the anomalous refugee paperwork');
      const result = rollD20('survival', (G.skills.survival||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.wb_refugee_anomaly = true;
        G.investigationProgress++;
        G.lastResult = `The refugee is a seamstress from the southern dome quarter, wrapped in a wool blanket that carries the shelter hall's grey stripe — she has already been through intake. Her papers are correct in every visible way. The seal's date stamp falls four days after the dome's crossing-window closure was posted on the Warden board. She traces the stamp without being asked. "I did not stop at the gate. I was walked through it." She names the escort in a whisper — an Overseer-Liaison title the published registries do not carry. Refugees are not supposed to know that title exists.`;
        addJournal('Refugee papers stamped post-closure by unpublished Liaison title — escorted through sealed gate', 'evidence', `wb-refugee-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `A shelter keeper steps between you and the refugee before the second question forms. Commune protocol gives new arrivals a three-day silence window during which external parties may not press for detail. Your approach has been flagged as panic-spreader behavior — the second thing Whitebridge notices an outsider for. The shelter keeper gives you the formal language of correction, quietly, so the refugee does not hear it. The correction is sufficient to close the channel for the day.`;
        addJournal('Shelter keeper invoked silence window — flagged as panic-spreader', 'complication', `wb-refugee-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.lastResult = `Her papers are visible on the intake bench for a long moment before the keeper folds them away. The date stamp is post-closure, which a seamstress does not carry unless the sealed gate opened for her. She does not meet your eye when she gathers the blanket around her shoulders. She knows what she is carrying. She does not know she knows.`;
        addJournal('Refugee intake paperwork post-dates dome closure — carrier unaware', 'evidence', `wb-refugee-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
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
        G.lastResult = `The crossing station's rear chamber requires a full evidentiary presentation to convene — the crossing pattern documentation, the grain weight discrepancy records, and the physical samples from the arbitration file. Without all three assembled and corroborated, any formal case leaves gaps wide enough for the administration to dissolve it before the Council finishes reading the first page. The threads still open need to be closed before this moves forward.`;
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
