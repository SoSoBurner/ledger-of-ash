/**
 * HARVEST CIRCLE STAGE 1 ENRICHED MEANINGFUL CHOICES
 * 20 deeply grounded investigation paths tied to grain distribution, festival trade, and family-controlled commerce corruption
 * Generated for: Fair market exchange vs family duty, spoilage urgency vs quality care, festival unity vs economic pressure
 * Each choice: 65-80 XP, grounded in grain steward politics and patron-family hierarchy
 */

const HARVEST_CIRCLE_STAGE1_ENRICHED_CHOICES = [
  // ========== NPC-GROUNDED CHAINS (8 CHOICES) ==========

  // 1. GRAIN MEASURER: QUOTA MANIPULATION
  {
    label: "Question Svala Coalward, the Grain Measurer — are harvest quotas being systematically altered, and have measurement standards shifted in ways that favor certain families?",
    tags: ['Investigation', 'NPC', 'Grain', 'Quotas', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading quota manipulation patterns');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      const target = 11 + Math.max(0, G.worldClocks.pressure);

      if (result.isCrit) {
        G.lastResult = `Svala pulls you to the far end of the threshing grounds, away from the weighing station. "I've been receiving instructions — not guidelines, instructions — about how to read certain family harvests. Connected families: I'm told to log light. The grain goes on the scale the same as always, but the official number comes off the directive, not the scale." They pause. "Independent farmers get the exact opposite. Extra review. I've recorded lower counts than the scale showed because I was told the measurement was imprecise." They don't look at you while they say it. They look at the scale.`;
        G.stageProgress[1]++;
        addJournal('Grain Measurer revealed corrupted quota system', 'evidence', `harvest-quotas-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Svala steps back from the scale and squares her shoulders. "Quota procedures are internal business." The words come out rehearsed — the same cadence a second time wouldn't surprise. Within the hour, a harvest authority representative arrives at the weighing station for a conversation that wasn't on anyone's schedule. They set one hand on the scale beam and glance your direction once, briefly, as though confirming a description.`;
        G.worldClocks.pressure++;
        addJournal('Grain Measurer now protective of quota procedures', 'complication', `harvest-quotas-hostile-${G.dayCount}`);
      } else {
        G.lastResult = `Svala says measurement has been complicated lately. "Family expectations vary." They leave it there and return attention to the scale mechanism, making a small adjustment that didn't need making. The answer sits between them and the scale — close enough to the truth to confirm the question, too guarded to name anything specific. Their hands stay busy. Whatever they know, they've decided this morning isn't when they say it.`;
        addJournal('Grain Measurer confirmed inconsistent quota measurements', 'evidence', `harvest-quotas-pressure-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 2. MARKET BROKER: PRICE MANIPULATION
  {
    label: "Consult with Varik Stonecarve, the Market Broker — has price setting been altered, and are certain families getting favorable pricing while others face price pressure?",
    tags: ['Investigation', 'NPC', 'Commerce', 'Prices', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering price manipulation');
      G.stageProgress[1]++;

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Varik spreads two price sheets on the table — one for the festival last season, one for the season prior. The numbers diverge in a consistent direction: connected-family grain priced lower, independent-farmer grain priced higher. "This line here," he taps the column. "Festival pricing used to be fixed by the elder council. Now it comes through as a preliminary schedule from the quota administration. By the time the council sees it, it's already been circulated to buyers." He folds both sheets back. "The market that's supposed to level the exchange is doing the opposite."`;
        G.stageProgress[1]++;
        addJournal('Market Broker revealed price manipulation system', 'evidence', `harvest-prices-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Varik puts his pen down. "Who sent you?" He's not accusing — he's assessing. By the end of the afternoon, the market row has heard that someone came to the broker asking questions about festival pricing on behalf of unnamed parties. Your business here now has a reputation attached to it.`;
        G.worldClocks.watchfulness++;
        addJournal('Market Broker spreading suspicion about price investigation', 'complication', `harvest-prices-alert-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `Varik calls it a complicated season. "Pricing reflects a lot of variables." He doesn't enumerate the variables. The price sheets stay in the drawer — he pats its edge once, a habit, then catches himself doing it. His answers are technically responsive and practically empty, built to close the subject without appearing to. The pen goes back in his hand. The conversation is over by his reckoning.`;
        addJournal('Market Broker confirmed non-standard pricing practices', 'evidence', `harvest-prices-evasive-${G.dayCount}`);
      } else {
        G.lastResult = `Varik shakes his head before you finish the question. "Market rates are internal to the Harvest Circle brokerage. Not for external discussion." He turns back to his ledger, and the pen moves before you've stepped away from the counter — not writing anything that matters, but demonstrating that the transaction of this conversation is complete. The conversation ends by his accounting. The ledger occupies his hands for longer than the entry requires.`;
        addJournal('Pricing records blocked without broker authorization', 'evidence', `harvest-prices-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 3. PROTECTOR OF MAGICAL FORESTS: LAND CORRUPTION
  {
    label: "Interview Elyra Mossbane, Protector of magical forests and plains — are protective barriers being weakened, and has land stewardship been compromised?",
    tags: ['Investigation', 'NPC', 'Land', 'Protection', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading land protection corruption patterns');
      G.stageProgress[1]++;

      const result = rollD20('survival', (G.skills.survival || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Elyra stops walking and turns to face you directly. "Six weeks ago I received a prioritization order. Fields are ranked by family standing, not agricultural condition. I maintain the barriers in that order." She points northeast. "The Halversen family fields — independent, no patron alliance — have had half-strength barrier coverage since the order came through. The blight risk there is now real." She looks at her maintenance log. "I put this to the elder council. They said they'd review the prioritization criteria. I haven't heard back."`;
        G.stageProgress[1]++;
        addJournal('Land Protector revealed corrupted land stewardship system', 'evidence', `harvest-land-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Elyra's expression closes off completely. "Stewardship decisions are not explained to outsiders. This is sacred land work." The words land with the weight of a door being drawn shut. They walk away across the field at an unhurried pace, boots moving through cut chaff without a backward glance. Three other protectors within earshot have noted the exchange — the stillness in their shoulders says so. None of them resume moving until you do.`;
        G.worldClocks.isolation++;
        addJournal('Land Protector forbade further stewardship questions', 'complication', `harvest-land-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Elyra says coverage has been uneven this season. "Resources are allocated based on current priorities." The phrase comes out like something written for her to say — the cadence slightly too even, the pause before "priorities" slightly too considered. She keeps walking as she talks, maintenance log under her arm, and doesn't slow down to elaborate. The field ahead of her holds her attention more securely than the question.`;
        addJournal('Land Protector confirmed uneven protection allocation', 'evidence', `harvest-land-biased-${G.dayCount}`);
      } else {
        G.lastResult = `Elyra answers in environmental terms — soil conditions, weather variance, seasonal barrier load. The words are accurate and the sentences are complete. Nothing in them touches what was asked. She keeps walking at the same pace throughout. The conversation moves around the subject with a deliberateness that reads less like deflection and more like practice.`;
        addJournal('Land stewardship blocked without agricultural access', 'evidence', `harvest-land-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 4. STORAGE KEEPER: GRAIN DIVERSION
  {
    label: "Speak with the Storage Keeper about recent grain storage management — are stored grain reserves being diverted, and has storage allocation been secretly manipulated?",
    tags: ['Investigation', 'NPC', 'Storage', 'Resources', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering grain storage diversion');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The Storage Keeper shuts the grain store door behind you both. "Festival allocation is supposed to come from the communal reserve. For the last three months, portions earmarked for festival distribution have been transferred to private warehouse accounts before they ever reach the distribution ledger." They lift a section of the inventory log. "This row — festival allocation, forty tonnes. This row — private transfer, forty tonnes, same date." The numbers are identical. "Independent farmers' reserve space has been quietly reassigned. I raised this at the keeper's meeting. The chair said allocation decisions were under review."`;
        G.stageProgress[1]++;
        addJournal('Storage Keeper revealed grain diversion conspiracy', 'evidence', `harvest-storage-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `"Storage records are not for external review." The Storage Keeper doesn't elaborate further and doesn't move. They stay positioned between you and the inventory ledger until you leave. Within the hour the storage authority supervisor has been informed that someone came asking about inventory management.`;
        G.worldClocks.watchfulness++;
        addJournal('Storage authorities warned about grain inventory investigation', 'complication', `harvest-storage-alert-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `The keeper allows that allocation has been complicated this cycle. "Inventory prioritization shifts with need." They don't specify whose need or by whose determination. The ledger stays closed under both hands, spine toward you. The answer is accurate enough to be technically true and empty enough to say nothing useful — the grain store's smell of dried husks and timber fills the silence where elaboration would have gone.`;
        addJournal('Storage Keeper confirmed non-standard inventory practices', 'evidence', `harvest-storage-evasive-${G.dayCount}`);
      } else {
        G.lastResult = `The keeper meets every question with credentials. "Storage management is keeper authority only." The door to the records room stays shut — thick planks, iron latch, no window. The keeper doesn't lean against it or block it with their body; they simply hold position between you and it the way an object fills a space. Access requires authorization that doesn't come from asking, and asking is all that's available to you here.`;
        addJournal('Grain records blocked without storage authorization', 'evidence', `harvest-storage-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 5. FESTIVAL COORDINATOR: CELEBRATION MANIPULATION
  {
    label: "Consult with the Festival Coordinator about recent festival planning — is festival distribution being manipulated, and has celebration unity been corrupted?",
    tags: ['Investigation', 'NPC', 'Festival', 'Distribution', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering festival manipulation');
      G.stageProgress[1]++;

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The Coordinator pulls out two distribution sheets — last season's and the incoming draft. "Last season: uniform allocation by household size across all families. This season's draft: 'premium offering' tier for patron-aligned families, 'standard share' tier for independents." They flip to the ceremony script. "The opening address used to name the harvest as belonging to the commune. The new draft names the patron families first." They set both documents flat. "I didn't write these. They arrived from quota administration two weeks ago. I'm told to implement them."`;
        G.stageProgress[1]++;
        addJournal('Festival Coordinator revealed corrupted festival distribution system', 'evidence', `harvest-festival-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The Coordinator's hands stop moving at the question — mid-fold, paper held between fingers. "Festival planning is a community matter." They step back from the table without setting the paper down first, which they notice and correct. By the end of the morning, the festival committee chair has been informed that questions about distribution procedures came from outside the commune. The Coordinator does not return to the table while you're still in the room.`;
        G.worldClocks.pressure++;
        addJournal('Festival Coordinator now protective of festival procedures', 'complication', `harvest-festival-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The Coordinator says this season's distribution has been more layered than usual. "There are different tiers now." They don't elaborate on who set the tiers, by what authority, or what the tiers mean in practice for households at the bottom of them. The draft distribution sheet sits face-down on the table between you both. They glance at it once during the conversation and don't touch it. Whatever is on the other side, they've decided you won't see it today.`;
        addJournal('Festival Coordinator confirmed inconsistent festival allocations', 'evidence', `harvest-festival-biased-${G.dayCount}`);
      } else {
        G.lastResult = `The Coordinator says festival planning is handled internally. "The commune manages its own celebration." The distribution sheet stays face-down on the table between you. The answer is short, complete, and closes the subject. Outside questions about inside matters produce a particular kind of silence — not hostile, just sealed.`;
        addJournal('Festival procedures blocked without community authorization', 'evidence', `harvest-festival-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 6. RECORD KEEPER: DOCUMENT FALSIFICATION
  {
    label: "Interview Farlan Inkshade, Academic and recordkeeping steward — are harvest records being falsified, and has documentation been manipulated to hide economic redistribution?",
    tags: ['Investigation', 'NPC', 'Records', 'Documents', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading record falsification patterns');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Farlan has the evidence already assembled — he's been waiting for someone to ask. "Look at the delivery record for the Coalward family, third week of last season." He sets it beside a summary sheet. The delivery figure on the record is higher than the summary confirms. "That change happened after the document was signed. The ink shade is different. I have six like this." He stacks the flagged documents carefully. "Grain that was delivered in one quantity is being recorded in another. The recordkeeping is supposed to prevent this. Someone changed what goes into the records."`;
        G.stageProgress[1]++;
        addJournal('Record Keeper revealed document falsification system', 'evidence', `harvest-records-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Farlan straightens in his chair, spine finding the seat back. "Harvest documentation is internal academic material. External review is not appropriate." He closes the folder in front of him with both hands, a deliberate gesture. Dust rises from the cover. The conversation has ended on grounds he finds professionally sufficient — he doesn't reach for the next file until you've taken a step toward the door, as if confirming the direction before returning to work.`;
        G.worldClocks.watchfulness++;
        addJournal('Record Keeper forbade economic documentation inquiry', 'complication', `harvest-records-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Farlan acknowledges the documentation format changed seven months ago. "Updated procedures." He doesn't specify who updated them, through what process, or whether the elder council was consulted. He sets one document beside an older one without comment, as though the visual comparison explains itself — which it almost does. The ink shade differs between the two columns. He straightens the stack when he's done and tucks it back under his hand.`;
        addJournal('Record Keeper confirmed recent documentation procedure changes', 'evidence', `harvest-records-changed-${G.dayCount}`);
      } else {
        G.lastResult = `Farlan answers in procedural terms. Documentation requires training and authorization to interpret correctly — that much is genuine. The folder stays on the table between his hands, closed. He isn't wrong. He's also performing a competence barrier the same way a door performs a lock: technically neutral, functionally final.`;
        addJournal('Economic records blocked without recordkeeping access', 'evidence', `harvest-records-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 7. INSPECTOR: QUALITY SUPPRESSION
  {
    label: "Speak with Garren Ashmason, Night-Lantern Inspector — are grain quality standards being lowered, and has inspection been compromised to hide spoilage?",
    tags: ['Investigation', 'NPC', 'Quality', 'Inspection', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering quality inspection corruption');
      G.stageProgress[1]++;

      const result = rollD20('craft', (G.skills.craft || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Garren keeps his voice low and his back to the lantern. "I mark the grain. I file the mark. Two days later I check the record and the mark is gone — passed, no note." He holds up his inspection log beside the official record. The same batch, two different outcomes. "I've been told directly: connected-family grain passes. I had a batch last month, Halversen family, quality grain, flagged it for minor moisture variance. It was overruled by the supervisor." He sets both logs down. "The grain that went out from the Halversen flag was good. The batch that passed without a flag — I won't eat from it."`;
        G.stageProgress[1]++;
        addJournal('Inspector revealed corrupted quality system', 'evidence', `harvest-quality-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Garren's hands go still over the inspection log — a particular stillness, deliberate. "Quality inspection is internal process." He steps back from the exchange. The lantern at his station throws the same light it always does; the grain bins smell of chaff and dried straw. By midday the inspection supervisor has been notified that a stranger came asking about assessment procedures. When you pass Garren in the afternoon, he holds his log against his chest and looks somewhere past your shoulder.`;
        G.worldClocks.pressure++;
        addJournal('Inspector now protective of grain quality procedures', 'complication', `harvest-quality-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Garren admits the outcomes have been inconsistent. "Grain condition is complex." He presses the inspection log closed before you can read it straight, thumb flat on the cover. The lantern above them casts its steady circle on the grain scales. There's a gap between what he's saying and what he knows — visible in the way he handles the log, in the fraction of a second he holds it before setting it down, as though deciding again to let it close.`;
        addJournal('Inspector confirmed inconsistent quality assessment', 'evidence', `harvest-quality-evasive-${G.dayCount}`);
      } else {
        G.lastResult = `Garren keeps the inspection terminology precise and the conversation technical. Moisture variance, batch cycling, storage grade — every answer is accurate and none of it addresses what matters. The log stays under his hand, palm flat. He isn't protecting himself from you. He's protecting himself from whoever reads the log after you've gone.`;
        addJournal('Grain quality assessment blocked without inspection access', 'evidence', `harvest-quality-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 8. DISPUTE MEDIATOR: CONFLICT RESOLUTION FAILURES
  {
    label: "Consult with Velrik Durnshade, Guild dispute mediator — are family disputes being resolved fairly, and has mediation been weaponized to suppress dissent?",
    tags: ['Investigation', 'NPC', 'Mediation', 'Conflicts', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering mediation corruption');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Velrik sets his hands on the desk and looks at them. "Three weeks ago I received a pre-session note from the quota administration on a dispute between the Halversen family and the Durnwall patron house. The note described the outcome I should reach before I'd heard either side." He picks up the note and sets it in front of you. "I ruled as instructed. The Halversen family lost storage access they'd held for eleven years." He folds the note back along its crease. "The family I ruled against has not appealed. They know the appeals process runs through the same administration."`;
        G.stageProgress[1]++;
        addJournal('Mediator revealed corrupted conflict resolution system', 'evidence', `harvest-mediation-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Velrik's expression doesn't change. "Mediation is confidential process." He writes a note before you've reached the corridor — not a long one. A runner takes it by the time you're at the outer stair. The door to mediation records closes by that evening with a notation attached: external inquiry received, committee informed. Whatever access existed before today no longer does. The records were always closed; now they're sealed.`;
        G.worldClocks.pressure++;
        addJournal('Mediator prohibited further conflict resolution questions', 'complication', `harvest-mediation-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Velrik confirms disputes have been running in consistent directions lately. "Complex family dynamics." He doesn't say which direction, which families, or what consistent means when one side wins every time. His expression makes the shape of the answer without committing it to words — a careful absence where agreement would normally sit. The mediation register is on the desk to his left. Neither of you acknowledges it.`;
        addJournal('Mediator confirmed biased conflict resolution patterns', 'evidence', `harvest-mediation-biased-${G.dayCount}`);
      } else {
        G.lastResult = `Velrik cites confidentiality as both the opening and closing of the conversation. The families involved have not consented to external review. He sets his hands on the desk and leaves them there. The mediation register sits to his left, closed. Without consent nothing opens — and he says this with the patience of someone who has waited longer than you have.`;
        addJournal('Family mediation blocked without authorization', 'evidence', `harvest-mediation-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== ARCHETYPE DEEP DIVES (8 CHOICES) ==========

  // 9. GRAIN SYSTEM HIERARCHY: AUTHORITY REORGANIZATION
  {
    label: "Analyze the grain steward hierarchy — has the formal structure been modified, and are decision powers being centralized within patron families?",
    tags: ['Investigation', 'Structure', 'Hierarchy', 'Authority', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'grain hierarchy analysis');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The charter records show three independent steward positions absorbed into the patron-family coordination council over eighteen months. Each absorption was ratified as an efficiency measure. The elder council still meets — its rulings are now labeled advisory. Two stewards who objected to consolidation have been replaced; their names appear in the personnel register under "reassigned." The organization that governed by distributed judgment now has one center and everything else is tributary to it.`;
        G.stageProgress[1]++;
        addJournal('Structure analysis revealed centralized power consolidation', 'evidence', `harvest-structure-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `A patron-family representative stops you in the corridor before you've finished reviewing the second document. The footstep stops two paces away — deliberate distance. "What is the nature of your interest in administrative structure?" The question is polite, phrased like a form. Your name goes into a notation that afternoon, written into a ledger that probably predates today by more than your presence in Harvest Circle does.`;
        G.worldClocks.watchfulness++;
        addJournal('Patron families alerted to hierarchy analysis inquiry', 'complication', `harvest-structure-alert-${G.dayCount}`);
      } else {
        G.lastResult = `The position titles look the same on the charter page. The reporting lines have changed. Three roles that previously answered to the elder council now route through the patron-family coordination office — same ink, same ledger, different column. Whether that matters depends on what the coordination office does with that routing, and nothing in the public record says. The elder council's name still appears. Its column has fewer entries than it did two seasons ago.`;
        addJournal('Grain hierarchy modifications confirmed', 'evidence', `harvest-structure-modified-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 10. FARMING NETWORKS: FAMILY DISPLACEMENT
  {
    label: "Map active farming families in Harvest Circle — who's been removed from grain networks, and who's gaining unprecedented access to quota and resources?",
    tags: ['Investigation', 'Networks', 'Farming', 'Displacement', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'farming family network displacement mapping');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Cross-referencing the current active roster against five seasons prior: fourteen independent farming families appear on old records and not the current one. Each exit is documented as voluntary withdrawal, storage dispute resolution, or quota non-compliance. The timing clusters — seven of the fourteen left in the same eight-week window. Nine new families entered during the same period, all with documented patron-family alignment. Withdrawal, replacement, withdrawal, replacement — consistent enough to be a pattern, documented carefully enough to look like ordinary turnover.`;
        G.stageProgress[1]++;
        addJournal('Network analysis revealed deliberate family displacement', 'evidence', `harvest-network-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `A family liaison intercepts the inquiry at the records desk, arriving before the archivist has finished pulling the second volume. "Family roster information is not available for external research." Your name is logged in a column you didn't see until the pen was already moving. By the following morning, three farming family elders have been notified that someone came asking about the composition of their network. The records go back on the shelf. The archivist doesn't meet your eyes.`;
        G.worldClocks.watchfulness++;
        addJournal('Family authorities alerted to network analysis', 'complication', `harvest-network-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The roster shows movement — names gone, names added. The exits are documented under administrative categories that don't invite follow-up questions. The entries are recent and all share a similar profile. The composition has shifted, but whether deliberately requires checking what those categories actually mean in practice.`;
        addJournal('Farming family composition changes confirmed', 'evidence', `harvest-network-modified-${G.dayCount}`);
      } else {
        G.lastResult = `The roster alone doesn't carry enough context. Names crossed out and names added — the record shows exits and entries without explaining either. Who left and why requires speaking to the families themselves, and the families who are gone aren't easy to locate through the commune's current records. The addresses column for departed members reads "removed from registry" in the same hand. The trail ends where someone decided it should.`;
        addJournal('Family displacement analysis incomplete', 'evidence', `harvest-network-partial-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 11. SPOILAGE SYSTEM: DEGRADATION ACCELERATION
  {
    label: "Examine how spoilage rates are changing in Harvest Circle — what grain is being allowed to degrade, and where are losses being artificially created?",
    tags: ['Investigation', 'Spoilage', 'Degradation', 'Analysis', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'spoilage analysis');
      G.stageProgress[1]++;

      const result = rollD20('survival', (G.skills.survival || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The spoilage logs sorted by family affiliation show a clear division. Independent-family grain: stored in the eastern annex, lower floor, poor air circulation, pest traps not replaced on schedule. Patron-family grain: western annex, upper floor, ventilated, maintained. Same harvest, same commune, same season — stored two different ways. The loss reports attribute the eastern annex spoilage to environmental variance. The ventilation gap between the two annexes is forty feet and one administrative decision about where to put which family's grain.`;
        G.stageProgress[1]++;
        addJournal('Spoilage analysis revealed artificial degradation system', 'evidence', `harvest-spoilage-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `A storage supervisor appears at the annex door while you're comparing the two sections. "This area requires keeper authorization." You're walked out and your name is added to the storage authority incident log. Someone with a clipboard makes a note. The clipboard goes with the supervisor.`;
        G.worldClocks.watchfulness++;
        addJournal('Storage authorities alerted to spoilage analysis', 'complication', `harvest-spoilage-alert-${G.dayCount}`);
      } else {
        G.lastResult = `The eastern annex grain is degrading faster than the western. The storage conditions differ — air flow, pest control, floor moisture. Whether the difference is neglect or design isn't answerable from looking at it. But the pattern lines up with family affiliation in a way that plain neglect usually doesn't.`;
        addJournal('Spoilage pattern modifications detected', 'evidence', `harvest-spoilage-modified-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 12. FAMILY POWER TRACKING: WHO'S RISING
  {
    label: "Document which families are gaining unprecedented power in Harvest Circle — who's being positioned for authority, and what methods are enabling their rapid ascension?",
    tags: ['Investigation', 'Power', 'Ambition', 'Tracking', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'family power pattern mapping');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Two families appear in the governance record for the first time fourteen months ago. The Durnwall house — grain merchants with no prior agricultural council role — now holds three quota allocation seats. The Pressen family — two seasons of commune history — currently chairs the festival distribution committee. Both rose through a series of elder council appointments that were all ratified in the same three-week session. The council chair who ratified those appointments was replaced the following month. His replacement's name appears on the Durnwall family correspondence log from six months earlier.`;
        G.stageProgress[1]++;
        addJournal('Family power analysis revealed orchestrated authority installation', 'evidence', `harvest-power-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `A patron-family representative approaches before you've finished the second record review — not hurrying, arriving at the pace of someone who knows exactly how long the walk from their office takes. "What is the purpose of this research?" The question is calm and specific, the kind that assumes the answer is already written down somewhere. Your name is in three logs by the following morning, each entry brief, none of them hostile in phrasing.`;
        G.worldClocks.pressure++;
        addJournal('Patron families alerted to power analysis', 'complication', `harvest-power-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Two families have moved from the roster margins to governance positions in under two years. Their ascent shows up in the appointment records as a sequence of ratified nominations. What the record doesn't show is who proposed them — that would be in the closed session minutes, which aren't accessible here.`;
        addJournal('Family authority advancement changes confirmed', 'evidence', `harvest-power-confirmed-${G.dayCount}`);
      } else {
        G.lastResult = `The governance record shows the current power arrangement but not how it got there. Internal patron-family politics don't surface in the official appointment logs — those decisions happen in rooms before they're committed to paper, and what's recorded is the outcome, not the process that produced it. The appointments look unanimous. The record of who proposed them isn't here. That would be in closed session minutes, and closed session minutes require authorization to open.`;
        addJournal('Family power tracking incomplete', 'evidence', `harvest-power-partial-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 13. QUOTA DEPENDENCY: CONTROL SYSTEM
  {
    label: "Document how quota systems are weaponizing farmer dependency — what groups are most vulnerable to quota pressure, and how is compliance being enforced?",
    tags: ['Investigation', 'Quotas', 'Dependency', 'Control', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'quota dependency system documentation');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The pattern becomes clear across the three interviews: no independent farmer family can absorb a quota reduction, a storage restriction, or a festival exclusion independently — each one is exposed on all three fronts simultaneously. Withdraw quota credit and the family can't meet their annual payment obligation. Restrict storage and the harvest spoils before it can be sold. Exclude from festival distribution and the household runs short in the lean weeks. Every farmer is threaded through dependencies that make non-compliance catastrophic. The system wasn't designed this way. It was adjusted to be this way.`;
        G.stageProgress[1]++;
        addJournal('Quota analysis revealed systematic dependency weaponization', 'evidence', `harvest-dependency-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `A patron-family representative stops you mid-interview with a farmer household. "This conversation looks like a compliance audit." He addresses the farmer, not you — the farmer's jaw tightens and both hands go flat on the table. The interview ends there without further instruction; none is needed. Outside, in the lane between the threshing floor and the grain store, the representative tells you plainly that quota operations are internal commune matters and not for external parties to document.`;
        G.worldClocks.pressure++;
        addJournal('Authorities warned about quota vulnerability analysis', 'complication', `harvest-dependency-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Several farmers speak carefully, hands wrapped around cups of midday water, voices low between field rows. None uses the word pressure. All of them describe a situation where the margin between compliance and loss is very thin and has gotten thinner — one describes it in the language of weather, another in the language of soil conditions. The numbers they give are different. The shape of the problem is the same. Quota exposure is real, and these families know exactly how exposed they are.`;
        addJournal('Quota dependency and fear patterns confirmed', 'evidence', `harvest-dependency-confirmed-${G.dayCount}`);
      } else {
        G.lastResult = `The conversations stay surface-level. Yes, quotas are tight. Yes, the margins have changed. But the specifics — the numbers, the names, the particular decisions that made things worse — stay back. Quota exposure is real, and these families know exactly how exposed they are. They're not describing it to someone they don't yet trust with what that exposure actually looks like.`;
        addJournal('Quota dependency analysis incomplete', 'evidence', `harvest-dependency-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 14. FESTIVAL MANIPULATION: UNITY WEAPONIZATION
  {
    label: "Document how festival systems are being weaponized to divide community — what cultural unity is being destroyed, and how is celebration being turned into hierarchy enforcement?",
    tags: ['Investigation', 'Festival', 'Unity', 'Division', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'festival weaponization mapping');
      G.stageProgress[1]++;

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The last three seasons of ceremony scripts tell the story in the script margins. Season one: "commune's harvest, shared by all households." Season two: "harvest bounty, recognized by all families in good standing." Season three, the draft: "harvest bounty, honored first among those who sustain Harvest Circle's covenant families." The opening address has been rewritten to create a category — covenant families — that didn't exist in Harvest Circle's tradition. The language builds the hierarchy before the distribution makes it material.`;
        G.stageProgress[1]++;
        addJournal('Festival analysis revealed cultural division system', 'evidence', `harvest-unity-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The festival committee chair appears at the archive desk while you're comparing ceremony scripts — third page set beside second page, the language changes visible between them. "These documents are for authorized committee members." The scripts are gathered without ceremony, stacked, and placed in a box below the desk. You're walked from the reading room without argument. The committee is notified by the end of the morning that external interest has been shown in planning materials, and the archive note specifies which scripts were open when you were removed.`;
        G.worldClocks.watchfulness++;
        addJournal('Festival authorities alerted to celebration analysis', 'complication', `harvest-unity-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The current ceremony script differs from last season's in language that wasn't changed by accident. The references to collective harvest — the commune's harvest, belonging to all — have been replaced by language that distinguishes between families, that ranks them, that names some before others in the ceremonial address. The revision is recent and specific, the kind that someone had to sit down and draft deliberately. It didn't drift into this phrasing.`;
        addJournal('Festival modification patterns confirmed', 'evidence', `harvest-unity-confirmed-${G.dayCount}`);
      } else {
        G.lastResult = `Festival scripts change season to season for mundane reasons — weather, logistics, which elder is officiating, what the harvest permits. The current draft reads differently than last season's, but distinguishing deliberate ideological revision from ordinary ceremony management requires the full run of scripts set side by side. One current draft isn't enough. The archive holds four seasons of ceremony scripts. It takes longer to get access than the morning permits.`;
        addJournal('Festival manipulation analysis incomplete', 'evidence', `harvest-unity-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== GOSSIP ESCALATION (4 CHOICES) ==========

  // 15. FIELD RUMOR: FARMER WHISPERS
  {
    label: "Gather gossip among farmers in the fields — what stories are farming families telling each other about quota changes and economic pressure?",
    tags: ['Investigation', 'Rumor', 'Farming', 'Gossip', 'Meaningful'],
    xpReward: 65,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'parsing farming narrative');
      G.stageProgress[1]++;

      const rumor = ['the quota measurer is falsifying weights to help connected families', 'independent farmers are being systematically frozen out of grain distribution', 'spoilage is being artificially created to destroy independent farmer harvests', 'someone is stealing grain from storage and sending it to outside families', 'festival distribution is being rigged to favor certain families over community'];
      const selected = rumor[Math.floor(Math.random() * rumor.length)];

      G.lastResult = `Walking the field rows at midday, the murmur is: "${selected}." One farmer says it while keeping his eyes on his work. His neighbor nods without responding — the nod of someone who has heard this and stopped arguing with it. The collective knowledge is there, distributed across dozens of separate observations. None of them have the full picture. All of them have part of it.`;
      addJournal(`Farming rumor gathered: "${selected}"`, 'evidence', `harvest-rumor-${G.dayCount}`);

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 16. MARKET RUMOR: MERCHANT WHISPERS
  {
    label: "Gather gossip in the market and festival squares — what stories are merchants and traders telling each other about price manipulation and family favoritism?",
    tags: ['Investigation', 'Rumor', 'Commerce', 'Gossip', 'Meaningful'],
    xpReward: 65,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'parsing merchant narrative');
      G.stageProgress[1]++;

      const rumor = ['market prices are being set to favor certain families', 'broker rates are being manipulated to destroy independent merchant competitiveness', 'festival pricing is rigged so connected families always profit', 'quality inspection is being weaponized against merchants who refuse family allegiance', 'grain distribution is controlled by family influence rather than fair exchange'];
      const selected = rumor[Math.floor(Math.random() * rumor.length)];

      G.lastResult = `At the festival square stalls, the current working theory among merchants is: "${selected}." Said at normal volume by a cloth trader to his customer, no lowered voice, no looking around first. Whatever caution applied to this topic six months ago, it's worn thin. Traders know the market has changed in ways that don't come from weather or harvest variance. They haven't yet built the language to describe the mechanism.`;
      addJournal(`Market rumor gathered: "${selected}"`, 'evidence', `harvest-rumor-${G.dayCount}`);

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 17. INSTITUTIONAL CRACK: CORRUPTION PROOF COMPILATION
  {
    label: "Compile documented evidence that proves grain and festival systems are being systematically corrupted — show the paper trail linking corruption to coordinated family strategy.",
    tags: ['Investigation', 'Evidence', 'Proof', 'Conspiracy', 'Meaningful'],
    xpReward: 80,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(80, 'exposing harvest system conspiracy');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Farlan's flagged records. Svala's directive instructions. Garren's inspection log versus the filed results. The festival allocation draft with its tiered language. The storage spoilage disparity between the two annexes. Set side by side, they describe a single operation running through five separate institutional systems simultaneously. No one institution shows enough to prosecute on its own. Together they describe the same hand in all five places. This is the paper trail, and it leads somewhere outside Harvest Circle.`;
        G.stageProgress[1]++;
        addJournal('Harvest system corruption conspiracy documented with proof', 'evidence', `harvest-proof-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `A patron-family representative meets you on the path between the archive and the storage yard. Not a runner — the representative themselves, dressed for it. "The grain systems of Harvest Circle are not a subject for outside documentation." The warning is delivered without raised voice. It is not a warning meant to be repeated.`;
        G.worldClocks.pressure += 2;
        addJournal('Harvest system corruption inquiry directly intercepted', 'complication', `harvest-proof-caught-${G.dayCount}`);
      } else if (result.total >= 14) {
        G.lastResult = `The individual pieces each make sense. Together they suggest coordination — the timing too consistent, the direction too consistent, the institutions too varied for this to be one family acting opportunistically. The final link between the pieces and a single coordinating source is the gap remaining.`;
        addJournal('Harvest system corruption strongly suggested by evidence', 'evidence', `harvest-proof-partial-${G.dayCount}`);
      } else {
        G.lastResult = `The pieces are present, laid out across the work table in the order they were gathered: quota irregularities, spoilage disparity, falsified records, festival language. The connection between them requires one more piece — something that places the same external hand across multiple institutions at the same time. Without it, the evidence describes a pattern but not a mechanism. Suggestive but not structural. The gap is clear. Filling it requires access that isn't available from this side of the commune's walls.`;
        addJournal('Corruption proof incomplete without comprehensive records', 'evidence', `harvest-proof-incomplete-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 18. MORAL PRESSURE: FAMILY LOYALTY COMPROMISE CHOICE
  {
    label: "Confront a Harvest Circle official who's complicit in system corruption — demand explanation and decide whether to protect them or expose their role.",
    tags: ['Investigation', 'Moral', 'Choice', 'Pressure', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'making moral commitment');
      G.stageProgress[1]++;

      const npcOptions = [
        { name: 'Grain Measurer Svala Coalward', role: 'quota keeper', fear: 'They threatened to exclude my family from festival distribution if I spoke out. My children depend on that provision.' },
        { name: 'Market Broker Varik Stonecarve', role: 'price setter', fear: 'I wanted to resist but they said if I exposed price manipulation, they\'d destroy my family\'s market standing permanently.' },
        { name: 'Festival Coordinator Kess', role: 'celebration keeper', fear: 'They made it clear that exposing festival manipulation would result in my family\'s exclusion from all community participation.' }
      ];

      const npc = npcOptions[Math.floor(Math.random() * npcOptions.length)];

      G.lastResult = `You confront ${npc.name}. They crumble under pressure. "${npc.fear}" They're trapped, complicit, and frightened. You must decide: Do you protect them and maintain your investigation quietly? Do you expose them to stop the corruption system? Your choice determines whether this person becomes an informant or enemy — and whether Harvest Circle's corruption can be challenged from within or continues unchecked.`;

      if (!G.flags) G.flags = {};
      G.flags.stage1_evidence_decision = 'pending';
      G.flags.stage1_moral_npc = npc.name;

      addJournal('consequence', `Confronted ${npc.name} (${npc.role}) about system corruption participation`, `harvest-moral-${G.dayCount}`);

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 19. DISCOVERY MOMENT: EXTERNAL COORDINATION SOURCE
  {
    label: "Find the evidence that proves Harvest Circle's corruption is being coordinated from outside — discover the external hand orchestrating family power consolidation.",
    tags: ['Investigation', 'Origin', 'Discovery', 'Climax', 'Meaningful'],
    xpReward: 80,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(80, 'discovering origin source of harvest system corruption');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Behind the corrupted quota records, diverted grain, manipulated prices, and weaponized festivals, you find the thread leading outside Harvest Circle. Courier manifests reference cities in northern territories with detailed instructions for "grain system restructuring." Merchant house letters from external allied contacts directing family elevation. Financial transfers originating from north-aligned entities. Harvest Circle's grain system is being systematically captured by external interests. Someone in the northern territories — or someone allied with them — is using Harvest Circle's own institutions and families to extract agricultural resources and consolidate control. The conspiracy is coordinated, resourced, and external.`;
        G.stageProgress[1]++;
        addJournal('Origin source of Harvest Circle corruption identified as external coordination', 'discovery', `harvest-origin-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `As you approach evidence of external coordination, you're intercepted directly. Someone stops you and makes clear that pursuing this further will result in your removal from Harvest Circle or worse. You've discovered pieces, but full external coordination remains hidden — and now you're marked as direct threat.`;
        G.worldClocks.pressure += 2;
        addJournal('Investigation intercepted by external coordination operators', 'complication', `harvest-origin-caught-${G.dayCount}`);
      } else if (result.total >= 14) {
        G.lastResult = `The evidence points beyond Harvest Circle. Courier route manifests reference "northern family authorities." Resource orders carry external authorization marks that don't correspond to any Harvest Circle charter body. The scale of what's here is larger than a local family dispute. The exact source isn't confirmed — too many nodes still obscured — but the direction is legible: the coordination is coming from outside Harvest Circle's borders, and it has been for some time.`;
        addJournal('External coordination of Harvest Circle confirmed', 'discovery', `harvest-origin-external-${G.dayCount}`);
      } else {
        G.lastResult = `The pieces suggest external involvement — manifests that reference outside parties, authorization marks without local provenance, courier patterns that don't match Harvest Circle's own routes. But the origin source remains obscured behind the layers built to obscure it. Whoever is orchestrating this has had time to build careful distance between their instructions and their names. The shape of the hand is visible in its work. The hand itself isn't.`;
        addJournal('External coordination suspected but source not yet identified', 'evidence', `harvest-origin-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 20. CONSPIRACY COMPLETE: EXTERNAL INFLUENCE CONFIRMATION
  {
    label: "Confirm the full scope of external influence over Harvest Circle — document how northern interests are systematically controlling grain resources through corrupted local systems.",
    tags: ['Investigation', 'Origin', 'Conspiracy', 'External', 'Meaningful'],
    xpReward: 80,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(80, 'confirming full external harvest conspiracy');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The full conspiracy is now clear: Northern merchant authorities are systematically extracting Harvest Circle's agricultural surplus through corrupted systems. Grain quotas are being artificially inflated to force overproduction. Storage systems are being diverted to send grain north. Festival manipulation is preventing community awareness of shortage. Selected families are being elevated specifically to cooperate with external extraction. The entire Harvest Circle grain system has been weaponized as a resource extraction apparatus. Harvest Circle remains unaware its economic foundation is being deliberately harvested by external interests.`;
        G.stageProgress[1]++;
        addJournal('Full external conspiracy confirmed: Harvest Circle systematically harvested by northern interests', 'discovery', `harvest-conspiracy-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `As you prepare to confirm the complete conspiracy, you're stopped directly by coordinated authorities. They make it abundantly clear that knowledge of the full scope will result in permanent removal or elimination. You've understood the scale of the conspiracy, but speaking it aloud will make you expendable.`;
        G.worldClocks.pressure += 3;
        addJournal('Direct threat issued: Full conspiracy knowledge has made you dangerous to external operators', 'complication', `harvest-conspiracy-caught-${G.dayCount}`);
      } else if (result.total >= 15) {
        G.lastResult = `The conspiracy scope becomes clear through the accumulated record: external interests are systematically extracting Harvest Circle resources through corrupted grain systems — quotas inflated, storage diverted, festival channels suppressed, families elevated or removed by outside instruction. The scale is larger than the initial pieces suggested. This is coordinated regional resource extraction, running through Harvest Circle's own institutions and using them as a mechanism. The commune's grain moves north. What comes back is control.`;
        addJournal('Harvest Circle resource extraction conspiracy partially confirmed', 'discovery', `harvest-conspiracy-partial-${G.dayCount}`);
      } else {
        G.lastResult = `The corruption is substantial and documented — quota manipulation, storage diversion, falsified records, festival hierarchy installed by outside instruction. But the full scope of external coordination remains partially obscured. The pieces point outward beyond Harvest Circle, toward interests that are larger and more organized than any local family dispute would require. How far beyond, and through what exact channels, isn't yet visible from this position. The conspiracy extends further than what's in front of you.`;
        addJournal('External conspiracy scope not fully understood', 'evidence', `harvest-conspiracy-incomplete-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== EXPANSION CHOICES ==========

  // 21. CLUE: ROUTING NUMBER ANOMALY
  {
    label: "Examine the Northern Provision Compact's routing records — check for grain shipments that don't match Harvest Circle's logged output.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 73,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(73, 'analyzing routing number anomalies');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 13) {
        G.lastResult = `Routing records show Harvest Circle shipped 340 tonnes of grain north in the past quarter under Provision Compact routing numbers. Harvest Circle's own production logs show 310 tonnes harvested. Thirty tonnes that weren't produced were apparently shipped. Either the production records are understating output, or routing numbers are being assigned to grain that originated elsewhere and is being laundered through Harvest Circle's Compact allocation. The routing number is creating false provenance.`;
        if (!G.flags) G.flags = {};
        G.flags.found_routing_anomaly = true;
        addJournal('Routing anomaly: 30 tonnes shipped without production record — false provenance laundering via Compact allocation', 'evidence', `harvest-routing-${G.dayCount}`);
      } else {
        G.lastResult = `The routing records are here — shipment totals, destination codes, authorization marks along the right margin. Matching them against the production logs requires both datasets at the same desk simultaneously. Access is granted one register at a time, not both, and the archivist isn't flexible on that procedure today. The gap in the numbers is probably there. You can't confirm it yet.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 22. CLUE: CHARTER MARK CONTAINER
  {
    label: "Track down the charter-marked storage container that was reported in the routing anomaly — find where it went.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'tracking charter mark container');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      G.lastResult = `One container in the routing sequence bears a secondary charter mark — not a Provision Compact mark, a trade house mark from a northern merchant consortium that shouldn't have access to Compact routing numbers. The container was last logged entering Harvest Circle's outbound staging area and exited under a Compact number. The charter mark identifies the originating party as someone outside the Provision Compact's membership register. External commercial interests are piggybacking on Harvest Circle's Compact allocation.`;
      if (!G.flags) G.flags = {};
      G.flags.found_charter_mark_container = true;
      addJournal('Charter mark container: northern merchant consortium using Harvest Circle allocation — unauthorized piggybacking', 'evidence', `harvest-charter-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 23. ARCHETYPE-GATED: READING HARVEST CIRCLE
  {
    label: "Walk the harvest fields at dawn — read what the labor patterns tell you about what Harvest Circle is actually producing.",
    tags: ['Investigation', 'Archetype', 'Stage1', 'Meaningful'],
    xpReward: 67,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(67, 'reading harvest field labor patterns');
      const arch = G.archetype && G.archetype.group;

      if (arch === 'combat') {
        G.lastResult = `The field organization has changed. Workers move in sections with specific handoff points — not efficient for harvest yield, but efficient for oversight. Someone reorganized the fieldwork so that no individual worker sees the full output. Each worker sees their section. Nobody has a complete count. The organization is designed to prevent workers from knowing how much they're actually producing.`;
      } else if (arch === 'magic') {
        G.lastResult = `Two fields are being harvested at different rates despite identical soil and planting density. The western field is being harvested carefully — maximum yield extraction. The eastern field is being harvested quickly — speed over yield. The differential suggests the eastern field's output is going somewhere different, under a different time pressure. Two destinations, one harvest.`;
      } else if (arch === 'stealth') {
        G.lastResult = `A separate cart leaves the staging area every morning before the main convoy. It doesn't go to the central weighing station — it goes to the northern storage facility that feeds directly into the suspect routing chain. Pre-staging the laundered volume before official weighing begins. The separation happens before anyone creates a count.`;
      } else {
        G.lastResult = `A field overseer argues with a worker about quota credit. The worker says their section met target; the overseer says the records show otherwise. The worker is right — you watched the section work. The overseer is reading from a document that doesn't match what happened. The production records are being edited at point-of-collection.`;
      }
      addJournal('Harvest field analysis: segmented oversight blocks worker counts, differential harvesting rates, pre-staging of laundered volume', 'evidence', `harvest-fields-read-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 24. FACTION SEED: IRON COMPACT PROVISION CONTACT
  {
    label: "Speak to the Iron Compact's Provision Compact liaison stationed at Harvest Circle's distribution center.",
    tags: ['Faction', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'making Iron Compact contact');
      if (!G.factionHostility) G.factionHostility = { warden_order: 0, iron_compact: 0, oversight_collegium: 0 };

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `Liaison Veth Karst manages Iron Compact allocation tracking for the Provision Compact's northern routes. She's aware of the routing anomaly — it's showing up as inventory discrepancy in Iron Compact's own logistics chain. "We're receiving grain attributed to Harvest Circle that we haven't formally purchased through Compact channels." She wants to understand the routing number source. She'll share Iron Compact's incoming cargo data if you'll share the charter mark identification. Commercial alignment, not ideological.`;
        if (!G.flags) G.flags = {};
        G.flags.met_iron_compact_harvest = true;
        G.factionHostility.iron_compact += 1;
        addJournal('faction', 'Iron Compact liaison Veth Karst: routing anomaly visible in Iron Compact logistics, willing to exchange cargo data', `harvest-iron-${G.dayCount}`);
      } else {
        G.lastResult = `The Iron Compact liaison is occupied with official Provision Compact business — ledgers spread across the distribution hall's back table, a runner waiting in the corridor. Informal inquiry without a formal introduction lands on polite but solid ground. Documented evidence of a compliance issue affecting Iron Compact interests would open a different conversation. For now the door is present and visible. What's needed to open it is also clear.`;
        if (!G.flags) G.flags = {};
        G.flags.located_iron_compact_harvest = true;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 25. ATMOSPHERE: THE GRANARY STEPS AT MIDDAY
  {
    label: "Sit at the Granary Steps during the distribution hour — observe how food reaches the community.",
    tags: ['WorldColor', 'Lore', 'Stage1', 'Meaningful'],
    xpReward: 50,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(50, 'observing granary distribution');

      G.lastResult = `The distribution line moves efficiently. Families receive their allocation with practiced acceptance — no negotiation, no question. This is a community that's learned to take what it's given without asking why the amount changed from last season. Two seasons ago there would have been comparison, dispute, memory of better yields. That institutional memory has been quietly managed away. Harvest Circle's population has been acclimatized to reduced allocation so gradually they don't name it as reduction.`;
      addJournal('Granary Steps: community accepts reduced allocation without naming reduction — gradual acclimatization to scarcity', 'discovery', `harvest-granary-${G.dayCount}`);
      G.recentOutcomeType = 'explore'; maybeStageAdvance();
    }
  },

  // 26. PERSONAL ARC: THE INDEPENDENT COUNTER
  {
    label: "Commission an independent count of a full harvest section — compare it against the official production log entry.",
    tags: ['PersonalArc', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'running independent harvest count');
      if (!G.flags) G.flags = {};

      const result = rollD20('craft', (G.skills.craft || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `Your count: 12.4 tonnes from the west mid-field section. Official log entry for the same section, filed the same day: 10.8 tonnes. A 1.6 tonne discrepancy — 13 percent — on a single section. Scale that across the full harvest area and you have the routing anomaly's source. The production logs are being systematically understated at collection, and the difference is being routed out under the Provision Compact allocation numbers. You have proof now. A single section count against a single log entry.`;
        G.flags.independent_count_completed = true;
        addJournal('consequence', 'Independent count: 13% discrepancy between actual yield and official log — production understatement at collection confirmed', `harvest-count-${G.dayCount}`);
      } else {
        G.lastResult = `The segmented field layout defeats the count before it gets started. Workers move in sections with specific handoff points, and a complete section view requires standing inside the official measurement area — marked at the corners with painted stakes and treated as keeper authority. Without authorization to stand inside those stakes, the count is always partial, always one section short of a comparison. The boundary isn't fenced. It's maintained by the workers themselves, who step back when you step toward it.`;
      }
      G.recentOutcomeType = 'craft'; maybeStageAdvance();
    }
  },

  // 27. SOCIAL: THE QUOTA WORKER WITH A MEMORY
  {
    label: "Find a worker who has been at Harvest Circle long enough to remember the pre-quota-change era — speak to them about what changed.",
    tags: ['Social', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 65,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(65, 'interviewing long-tenure worker');

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 10) {
        G.lastResult = `Elder fieldworker Nann has worked at Harvest Circle for thirty-one years. "The measurement changed about eighteen months ago. Before: we counted the full load at the central scale. After: section leads count first, then totals are reported to the central scale. The full load still goes on the central scale — but the reported number is the section leads' count, not the central weighing." She understands exactly what happened. "The central scale's reading stopped being the official number. Someone replaced the scale with the section leads." She kept three seasons of her own personal field tallies. They match the central scale readings. They don't match the official reports.`;
        if (!G.flags) G.flags = {};
        G.flags.met_nann_fieldworker = true;
        addJournal('contact', 'Fieldworker Nann: measurement system changed 18 months ago, has personal tallies matching central scale vs official reports', `harvest-nann-${G.dayCount}`);
      } else {
        G.lastResult = `The long-tenure workers have learned that comparison to previous seasons leads to arguments with supervisors — arguments where only one side has a ledger and the authority to close it. Cut chaff smell hangs over the field rows; the midday break has most crews eating apart from each other rather than at the communal fire. They've stopped making comparisons, at least to strangers. The memory is still there. It shows in the way they answer a question about this season without volunteering anything about what last season was.`;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // 28. SHADOW RIVAL INTRO
  {
    label: "A Provision Compact transport driver mentions a researcher traveled with his convoy last week asking questions about routing documentation.",
    tags: ['Rival', 'Warning', 'Stage1', 'Meaningful'],
    xpReward: 57,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(57, 'receiving rival warning');
      if (!G.flags) G.flags = {};

      const arch = G.archetype && G.archetype.group;
      if (arch === 'combat') {
        G.lastResult = `"Carried no visible weapons but moved like someone who expected to need them," the driver says. "Asked about the security on the northern leg — not what we were carrying, but whether anyone was watching the route." Someone is assessing the transit corridor's vulnerability, not investigating the cargo discrepancy. They're planning for movement, not documentation.`;
      } else if (arch === 'magic') {
        G.lastResult = `"Had a small instrument they used at the staging area before we departed," the driver says. "Checked the containers without touching them. Put the instrument away and made a note." A trace reading at the staging area — characterizing what passed through before us. They're working from physical evidence, not records.`;
      } else if (arch === 'stealth') {
        G.lastResult = `"Never asked the same question twice," the driver says. "I noticed because I've had investigators travel with us before — they always circle back. This one moved forward, never repeated." Professional non-redundant questioning. They extract the maximum from each exchange and don't telegraph their data gaps. A trained information gatherer.`;
      } else {
        G.lastResult = `"Bought food for the whole convoy," the driver says. "Generous. Said it was company policy — they always fed the people they worked with. And everyone talked more than they should have. Generous gestures are very effective on a long drive." Social infrastructure deployment. They funded cooperation before asking for it.`;
      }

      G.lastResult += ` They were on the Harvest Circle routing thread last week. They're ahead of you.`;
      if (!G.rivalId) {
        if (arch === 'combat') G.rivalId = 'warden_captain';
        else if (arch === 'magic') G.rivalId = 'archivist_veld';
        else if (arch === 'stealth') G.rivalId = 'shadow_broker';
        else G.rivalId = 'provost_lenn';
      }
      addJournal('warning', 'Rival-adjacent operative traveled with Provision Compact convoy last week — working Harvest Circle routing thread ahead of you', `harvest-rival-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },
{
  label: 'The notice board has recent postings.',
  tags: ['social'],
  xpReward: 5,
  fn: function() {
    var key = 'rumor_drawn_' + G.location + '_' + G.dayCount;
    if (G.flags[key]) {
      G.lastResult = 'The board has nothing new since this morning.';
      return;
    }
    G.flags[key] = true;
    drawLocalityRumor(G.location);
  }
}
];
window.HARVEST_CIRCLE_STAGE1_ENRICHED_CHOICES = HARVEST_CIRCLE_STAGE1_ENRICHED_CHOICES;
