/**
 * DISTRICTS STAGE 2 ENRICHED CHOICES
 * Canon districts (7): shelkopolis_aurora_heights, shelkopolis_ironspool_ward, shelkopolis_verdant_row,
 *   harvest_keep_granary_steps, ithtananalor_iron_ledger_ward, panim_haven_reckoning_quarter,
 *   mimolot_academy_scriptorium_steps
 * Synthetic district type pools (3): high_quarter, common_quarter, low_ward
 */

/* ========== CANON DISTRICTS ========== */

const AURORA_HEIGHTS_STAGE2_ENRICHED_CHOICES = [
  {
    label: "Aurora Heights formal archive holds sealed correspondence from the charter period — request access through the noble registry.",
    tags: ['Investigation', 'Lore', 'Stage2'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'accessing Aurora Heights formal archive');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        G.lastResult = `The sealed correspondence includes a letter from a House Shelk subordinate to the Northern Provision Compact confirming delivery terms. The noble registry preserved it without understanding what it was.`;
        addJournal('Aurora Heights archive: House Shelk letter confirms Northern Provision Compact delivery terms', 'evidence', `ah-archive-${G.dayCount}`);
      } else if (result.isFumble) {
        if (!G.worldClocks) G.worldClocks = {};
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Your archive access request is referred upward. House Shelk estate receives notification of your inquiry.`;
        addJournal('Aurora Heights archive inquiry escalated to House Shelk estate', 'complication', `ah-archive-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.lastResult = `The archive contains charter-period correspondence showing the sealed subsidiary reference in several business letters. The trail is faint but present.`;
        addJournal('Aurora Heights archive: charter subsidiary reference in business correspondence', 'evidence', `ah-archive-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },
  {
    label: "Aurora Heights court circuit — press contacts among the high-society network for off-record information about the sealed charter parties.",
    tags: ['NPC', 'Persuasion', 'Stage2'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'working Aurora Heights social circuit for charter intelligence');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('persuasion', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        G.lastResult = `A court contact identifies the sealed charter holder by family name — a minor noble house that was dissolved three years ago but whose legal entity was never formally struck from the registry. It is a legal ghost operating under the protection of expired legitimacy.`;
        addJournal('Aurora Heights court: charter holder identified as dissolved noble legal ghost', 'evidence', `ah-court-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your questions about sealed charter parties are interpreted as a business prospecting inquiry. You are redirected to the House Shelk solicitor.`;
        addJournal('Aurora Heights court: charter inquiry redirected to House Shelk solicitor', 'complication', `ah-court-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.lastResult = `A contact recognizes the charter pattern as pre-consolidation House Shelk administrative style. "Old charter form. Nobody uses that anymore unless they want it to look legitimate from a distance."`;
        addJournal('Aurora Heights court: charter recognized as pre-consolidation House Shelk administrative style', 'evidence', `ah-court-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  }
];

const IRONSPOOL_WARD_STAGE2_ENRICHED_CHOICES = [
  {
    label: "Ironspool Ward's labor circuit has workers who handled the suppression compound container modifications — find them at the shift end taverns.",
    tags: ['Investigation', 'Stealth', 'Stage2'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'locating Ironspool Ward workers who handled container modifications');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('stealth', (G.skills.stealth||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        G.lastResult = `A former workshop hand describes the modification work in precise detail: signal-damping insulation panels, chemical seal reinforcement on the container joints, and a specific loading configuration designed to distribute weight evenly across a standard grain convoy arrangement. He was paid double rate and told not to discuss it. He discusses it anyway.`;
        addJournal('Ironspool Ward: worker describes container modification specs — signal damping, grain convoy weight config', 'evidence', `iron-ward-worker-${G.dayCount}`);
      } else if (result.isFumble) {
        if (!G.worldClocks) G.worldClocks = {};
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The worker community is tight. Word that someone is asking about the modification work reaches the wrong ear quickly.`;
        addJournal('Ironspool Ward: modification inquiry reached hostile party', 'complication', `iron-ward-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.lastResult = `A shift hand confirms modification work on unusual containers. "We were told it was specialty freight equipment. The pay was too good to ask questions."`;
        addJournal('Ironspool Ward: specialty freight modifications confirmed — high pay, no questions', 'evidence', `iron-ward-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },
  {
    label: "Ironspool Ward's contraband edge — a local fence has been handling small quantities of the suppression compound that leaked from the main supply chain.",
    tags: ['Stealth', 'Craft', 'Stage2'],
    xpReward: 66,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'tracing suppression compound street leakage in Ironspool Ward');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('stealth', (G.skills.stealth||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        G.lastResult = `The fence has a sample. The compound is being sold as a "calming agent" in the street market — which it technically is at low concentration. The street-level product is diluted from the bulk compound, confirming production excess beyond the staged operation's needs.`;
        addJournal('Ironspool street market: suppression compound sold as calming agent — production excess confirmed', 'evidence', `iron-ward-fence-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The fence reads your interest as either law enforcement or competition. Either way, you get nothing and he becomes harder to find.`;
        addJournal('Ironspool Ward fence: hostile response, no information', 'complication', `iron-ward-fence-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.lastResult = `The fence confirms a "calming compound" supply that arrived three months ago. He doesn't know the source. The volume is larger than street demand would explain.`;
        addJournal('Ironspool Ward: calming compound in street market — volume exceeds street demand', 'evidence', `iron-ward-fence-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  }
];

const VERDANT_ROW_STAGE2_ENRICHED_CHOICES = [
  {
    label: "Verdant Row's botanical healers have been treating patients with suppression compound symptoms — they have been quietly documenting exposure cases.",
    tags: ['Investigation', 'Lore', 'Stage2'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'reviewing Verdant Row healer exposure documentation');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `The healers have compiled forty-seven cases across seven months. They cross-referenced patient addresses against known compound transit routes and confirmed geographic clustering. They were preparing to publish but received a suppression notice from the "Northern Glyph Oversight Commission." They kept their records hidden. They share them.`;
        addJournal('Verdant Row healers: 47 exposure cases documented, suppressed by fake authority, records shared', 'evidence', `vr-healers-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.reverence = (G.worldClocks.reverence||0) - 1;
        G.lastResult = `The healers are protective of their patient relationships. Your request to access their documentation is interpreted as a threat to patient confidentiality.`;
        addJournal('Verdant Row healers: patient confidentiality protection, documentation access refused', 'complication', `vr-healers-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.lastResult = `The healers confirm they have been tracking an unusual symptom cluster. They describe the compound exposure presentation accurately. "We've seen forty-something cases. Someone is causing this."`;
        addJournal('Verdant Row healers tracking 40+ exposure cases — confirmed suppression compound presentation', 'evidence', `vr-healers-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },
  {
    label: "Verdant Row network contact — the network that can distribute investigation findings is accessible here. Establish or strengthen the connection.",
    tags: ['NPC', 'Persuasion', 'Stage2'],
    xpReward: 64,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(64, 'establishing Verdant Row network contact');
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('persuasion', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.verdant_row_contact = true;
        G.lastResult = `The network contact is satisfied with your evidence depth. They commit the Verdant Row distribution circuit to your investigation — meaning any findings you route through them will reach every allied investigative and healer network in the region simultaneously.`;
        addJournal('Verdant Row distribution circuit committed — regional simultaneous distribution available', 'evidence', `vr-contact-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The contact is not convinced of your reliability. They end the meeting and flag your profile for review.`;
        addJournal('Verdant Row contact: reliability concern, profile flagged for review', 'complication', `vr-contact-fail-${G.dayCount}`);
      } else {
        G.flags.verdant_row_contact = true;
        G.lastResult = `The contact acknowledges your investigation and provides a contact signal for future communication. The network relationship is established at a basic level.`;
        addJournal('Verdant Row contact established — basic network access', 'evidence', `vr-contact-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  }
];

const GRANARY_STEPS_STAGE2_ENRICHED_CHOICES = [
  {
    label: "Harvest Keep's Granary Steps market has grain manifests showing the agricultural routing number theft in real time — catch it before it clears.",
    tags: ['Investigation', 'Craft', 'Stage2'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'intercepting live manifest routing number theft at Granary Steps');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('craft', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        G.lastResult = `You catch the manifest as it is being processed. The grain routing number on a non-agricultural manifest was entered four minutes ago. The submitting agent is still at the counter. You obtain a physical description and the exact charter subsidiary code they used. Live evidence.`;
        addJournal('Granary Steps: live manifest fraud caught — agent described, charter code captured', 'evidence', `hk-granary-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The agent at the counter recognizes your interest and voids the manifest before it clears. The fraud evaporates and they are gone before you can act.`;
        addJournal('Granary Steps: agent voided manifest before capture — fled', 'complication', `hk-granary-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.lastResult = `You identify the fraudulent manifest after it clears but before it departs. The routing number pattern matches across five recent manifests in the batch file.`;
        addJournal('Granary Steps: routing number fraud in 5 batch manifests confirmed', 'evidence', `hk-granary-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },
  {
    label: "The ward boundary markers here carry more than paint — something was written over.",
    tags: ['stage2', 'districts'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(30, 'examining Granary Steps ward boundary markers');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      var roll = rollD20('survival', G.skills.survival || 0);
      if (roll.total >= 13) {
        G.investigationProgress++;
        addNarration('Ward Marker Palimpsest', 'The stone post at the granary district boundary shows three layers of mark — the current ward designation in fresh chalk, an older grain routing code in wax crayon beneath it, and underneath both, a carved cipher that matches the charter subsidiary format you have seen in the Aurora Heights filings. The carving was meant to be permanent. Someone chalked over it when the routing number changed. The original claim is still there in the stone.');
        addJournal('Granary Steps boundary post: charter subsidiary cipher carved into stone beneath two newer mark layers', 'evidence');
        G.flags.granary_marker_found = true;
        maybeStageAdvance();
      } else {
        addNarration('Ward Marker, Unremarkable', 'The posts at the granary boundary are standard — district designation, date of last arbitration, constable patrol signature in chalk. The chalk is fresh. Whatever was underneath has been scrubbed, not just covered. The stone is still damp.');
      }
    }
  }
];

const IRON_LEDGER_WARD_STAGE2_ENRICHED_CHOICES = [
  {
    label: "The Iron Ledger Ward's financial records office tracks every large-denomination transaction in Ithtananalor — the suppression compound payments appear as routine asset transfers.",
    tags: ['Investigation', 'Lore', 'Stage2'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'tracing suppression compound payments in Iron Ledger Ward records');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `The asset transfers converge on a single escrow account held under the Northern Provision Compact name. The account has received seven disbursements over six months from three separate institutional payers — one Soreheim, one Guildheart, one House Shelk subsidiary. The full financial picture is here.`;
        addJournal('Iron Ledger Ward: NPC escrow account with Soreheim + Guildheart + Shelk disbursements confirmed', 'evidence', `ilw-ledger-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `The financial records office is under ORE Shadowhands audit this week. Your access attempt is flagged by the audit team.`;
        addJournal('Iron Ledger Ward under Shadowhands audit — access attempt flagged', 'complication', `ilw-ledger-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.lastResult = `The records confirm compound-adjacent asset transfers to a single escrow account. The account name matches the fabricated supplier entity. The payers span multiple institutions.`;
        addJournal('Iron Ledger Ward: compound payment escrow confirmed, multi-institution payers', 'evidence', `ilw-ledger-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },
  {
    label: "The Guild Arbiter processed that filing — she knows which claim date came first.",
    tags: ['stage2', 'districts'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(30, 'pressing Guild Arbiter on Iron Ledger Ward claim dates');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      var roll = rollD20('persuasion', G.skills.persuasion || 0);
      if (roll.total >= 13) {
        G.investigationProgress++;
        addNarration('Arbiter Seniris, Off the Record', 'She lays the two documents on her desk in the order she always does — seniority of claim date, not guild seniority. The Northern Provision Compact filing is dated four months before the Guild Merchant\'s counter-claim. Her thumb rests on the date without pointing to it. "A provisional determination reflects what the documents show," she says, not looking up. "A full arbitration outcome reflects what the documents are worth." She does not explain the difference. She does not have to.');
        addJournal('Iron Ledger Ward arbiter: NPC claim predates Guild Merchant counter-claim by four months — provenance question open', 'intelligence');
        G.flags.iron_ledger_arbiter_consulted = true;
        maybeStageAdvance();
      } else {
        addNarration('Arbiter Seniris, On the Record', 'She lays both documents down and gives you the same answer she gives everyone: the provisional determination is posted on the notice board. The full arbitration schedule is public. She will not discuss active filings outside the formal process. Her desk is already sorted before you finish asking.');
      }
    }
  }
];

const RECKONING_QUARTER_STAGE2_ENRICHED_CHOICES = [
  {
    label: "The Reckoning Quarter's justice records include a case of a memorial service provider who filed a fraud complaint about misuse of their service classification — and then withdrew it under pressure.",
    tags: ['Investigation', 'Persuasion', 'Stage2'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'pursuing withdrawn memorial fraud complaint in Reckoning Quarter');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('persuasion', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        G.lastResult = `You find the complainant. They withdrew under threat of legal action using the sealed charter as a basis for a defamation claim. The original complaint identified specific cargo that had been using their service classification. They kept a copy of the original complaint. They sign a new witness statement.`;
        addJournal('Reckoning Quarter: memorial fraud complainant located — witness statement secured', 'evidence', `rq-complaint-${G.dayCount}`);
      } else if (result.isFumble) {
        if (!G.worldClocks) G.worldClocks = {};
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The complainant has been legally warned against discussing the case. Your approach triggers a formal notification to their legal representative.`;
        addJournal('Reckoning Quarter: complainant legal warning triggered — notification sent to their representative', 'complication', `rq-complaint-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.lastResult = `The complainant confirms the original complaint was genuine. They cannot make a new statement but confirm "the thing I described is still happening."`;
        addJournal('Reckoning Quarter: memorial fraud still active, complainant unwilling to restate formally', 'evidence', `rq-complaint-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },
  {
    label: "The permit inspector patrols that corridor — a wrong word here closes every door in the quarter.",
    tags: ['stage2', 'districts'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(30, 'navigating Reckoning Quarter permit inspector social check');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var roll = rollD20('stealth', G.skills.stealth || 0);
      if (roll.total >= 13) {
        G.investigationProgress++;
        addNarration('Permit Corridor, Clean Transit', 'You catch the inspector mid-patrol at the passage between the justice hall and the public record annex. She folds her document to the scope field first — the habit is automatic. Your transit papers show exactly what they need to show and nothing more. She returns the document without comment and moves to the next corner marker. The constabulary log at the annex entrance has no new entry after you pass. The corridor stays open.');
        addJournal('Reckoning Quarter: permit passage clean — no flag logged at annex entry', 'discovery');
        G.flags.reckoning_passage_clear = true;
        maybeStageAdvance();
      } else {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
        addNarration('Permit Corridor, Flagged', 'She folds the document to the scope field and holds it there longer than she should. Your authorization covers the justice hall but not the passage beyond it — a boundary you missed. She does not raise her voice. She logs the scope discrepancy in the incident record, not the patrol log, which means it goes to the arbitration queue rather than constabulary enforcement. The distinction is small now. It will matter later.');
      }
    }
  }
];

const SCRIPTORIUM_STEPS_STAGE2_ENRICHED_CHOICES = [
  {
    label: "The Scriptorium Steps' document copying circuit has a back-channel for scholarly correspondence that bypasses standard Academy mail — route investigation findings through it.",
    tags: ['Craft', 'Lore', 'Stage2'],
    xpReward: 64,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(64, 'routing findings through Scriptorium Steps back-channel');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('craft', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.stage2_evidence_shared = true;
        G.lastResult = `The back-channel routes your documentation to Quenra Quillfire, Toman Iceveil, and Serin Sunweave simultaneously. All three researchers can now cross-reference their independent findings. The scholarly confirmation loop is closed.`;
        addJournal('Scriptorium back-channel: findings cross-distributed to 3 key researchers — scholarly loop closed', 'evidence', `ss-channel-${G.dayCount}`);
      } else if (result.isFumble) {
        if (!G.worldClocks) G.worldClocks = {};
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The back-channel has been compromised. Your routing triggers a notification to whoever is monitoring it.`;
        addJournal('Scriptorium back-channel compromised — routing notification to unknown monitor', 'complication', `ss-channel-fail-${G.dayCount}`);
      } else {
        G.flags.stage2_evidence_shared = true;
        G.lastResult = `The documentation reaches its targets through the back-channel. Confirmation comes back that the findings align with each researcher's independent work.`;
        addJournal('Scriptorium back-channel: findings distributed, researcher alignment confirmed', 'evidence', `ss-channel-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  }
];

/* ========== SYNTHETIC DISTRICT TYPE POOLS ========== */

const HIGH_QUARTER_STAGE2_ENRICHED_CHOICES = [
  {
    label: "The settlement's high quarter formal records hall — request access to charter and contract records under investigative standing.",
    tags: ['Investigation', 'Lore', 'Stage2'],
    xpReward: 66,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'requesting high quarter charter record access');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        G.lastResult = `The records hall contains a reference to the sealed charter subsidiary in a commercial dispute filing from eight months ago. The filing party withdrew the dispute. The reference remains in the index.`;
        addJournal('High quarter records: sealed charter subsidiary in withdrawn dispute filing', 'evidence', `hq-records-${G.dayCount}`);
      } else if (result.isFumble) {
        if (!G.worldClocks) G.worldClocks = {};
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Your records access request is escalated to local administration. Your name is logged.`;
        addJournal('High quarter records access escalated — name logged', 'complication', `hq-records-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.lastResult = `The records hall provides partial access. The charter pattern appears in several administrative filings without explanation of the originating entity.`;
        addJournal('High quarter records: charter pattern in administrative filings', 'evidence', `hq-records-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },
  {
    label: "The settlement's high quarter social circuit — press elite contacts for information about off-record charter activity.",
    tags: ['Persuasion', 'Stage2'],
    xpReward: 62,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(62, 'working high quarter social circuit for charter intelligence');
      if (!G.investigationProgress) G.investigationProgress = 0;
      const result = rollD20('persuasion', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        G.lastResult = `A well-connected contact knows the sealed charter subsidiary by reputation — "old money that's been very busy lately." They provide a name that matches the dissolved noble entity identified in Aurora Heights.`;
        addJournal('High quarter social: dissolved noble entity name confirmed by elite contact', 'evidence', `hq-social-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your inquiry is too direct. The social contact closes off and your reputation in the high quarter declines.`;
        addJournal('High quarter social: inquiry too direct — reputation decline', 'complication', `hq-social-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.lastResult = `The contact acknowledges awareness of unusual charter activity but provides only vague confirmation. "Something has been moving money through old channels. Nobody's looking too closely at it."`;
        addJournal('High quarter social: unusual charter activity acknowledged, no specifics', 'evidence', `hq-social-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  }
];

const COMMON_QUARTER_STAGE2_ENRICHED_CHOICES = [
  {
    label: "The settlement's common quarter market stalls — traders here track every unusual shipment passing through and share information freely.",
    tags: ['Survival', 'Stage2'],
    xpReward: 58,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(58, 'gathering market intelligence in common quarter');
      if (!G.investigationProgress) G.investigationProgress = 0;
      const result = rollD20('survival', (G.skills.survival||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        G.lastResult = `A market trader who handles incoming freight describes a sealed container delivery from three weeks ago. The containers were heavier than listed, bore an unusual chemical smell, and were collected by a party who paid in advance with sealed documentation.`;
        addJournal('Common quarter market: unusual sealed container delivery — heavy, chemical smell, advance payment', 'evidence', `cq-market-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The market traders are wary of investigators. They give you nothing and watch you closely for the rest of your visit.`;
        addJournal('Common quarter market: trader wariness, no information', 'complication', `cq-market-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.lastResult = `A trader confirms unusual shipments passing through. "They don't buy anything at market. Just transit. And they always pay the transit handlers double." The double-pay pattern is consistent.`;
        addJournal('Common quarter market: transit-only shipments with double handler pay', 'evidence', `cq-market-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },
  {
    label: "Common quarter labor contacts — workers here know which employers are operating outside standard guild contracts.",
    tags: ['Persuasion', 'Craft', 'Stage2'],
    xpReward: 56,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(56, 'gathering off-contract employer intelligence from common quarter labor');
      if (!G.investigationProgress) G.investigationProgress = 0;
      const result = rollD20('persuasion', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        G.lastResult = `A labor contact identifies a specific employer who has been hiring casual non-guild workers for overnight loading operations. The employer pays well above rate and uses sealed charter authorization in lieu of standard guild contracts.`;
        addJournal('Common quarter labor: off-guild overnight loader employer identified — charter authorization used', 'evidence', `cq-labor-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The labor community has been warned not to discuss certain employers. Your questions create visible unease and the conversation ends quickly.`;
        addJournal('Common quarter labor: community warned against discussing certain employers', 'complication', `cq-labor-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.lastResult = `A worker confirms overnight non-guild loading work at above-rate pay. "You don't ask questions when someone pays that well." The work involved sealed containers.`;
        addJournal('Common quarter labor: overnight non-guild sealed container loading confirmed', 'evidence', `cq-labor-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  }
];

const LOW_WARD_STAGE2_ENRICHED_CHOICES = [
  {
    label: "The settlement's low ward informant network — contraband awareness here is high and someone knows about the suppression compound distribution edge.",
    tags: ['Stealth', 'Stage2'],
    xpReward: 60,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(60, 'tapping low ward informant network for compound distribution intel');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('stealth', (G.skills.stealth||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        G.lastResult = `An informant knows the street distribution contact for the diluted compound. They provide a name and location. The street distributor is a direct link to the compound supply chain's overflow management.`;
        addJournal('Low ward informant: street distributor named and located — direct compound supply chain link', 'evidence', `lw-informant-${G.dayCount}`);
      } else if (result.isFumble) {
        if (!G.worldClocks) G.worldClocks = {};
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `The low ward reads your presence as threat-related. An information chain activates that you are not aware of. You've been marked.`;
        addJournal('Low ward: marked by hostile information chain', 'complication', `lw-informant-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.lastResult = `An informant confirms compound presence in the street market. "It's been around for about four months. Calming stuff. Expensive calming stuff." The timeline aligns.`;
        addJournal('Low ward: compound in street market 4 months — timeline aligned', 'evidence', `lw-informant-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },
  {
    label: "Low ward's labor underground — workers who handled off-books cargo for extra pay know more than they told their handlers.",
    tags: ['Combat', 'Stealth', 'Stage2'],
    xpReward: 58,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(58, 'pressing low ward off-books cargo workers');
      if (!G.investigationProgress) G.investigationProgress = 0;
      const result = rollD20('combat', (G.skills.combat||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        G.lastResult = `A worker who loaded the containers describes the internal configuration he glimpsed when one container's seal failed briefly — rows of sealed vials in padded racks, each vial labeled with a dosage notation and a Soreheim military classification stamp.`;
        addJournal('Low ward worker: container interior glimpsed — vials with dosage notations, Soreheim military stamp', 'evidence', `lw-labor-${G.dayCount}`);
      } else if (result.isFumble) {
        if (!G.worldClocks) G.worldClocks = {};
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Your pressure approach is misread as intimidation. The worker files a street-level complaint that draws local attention.`;
        addJournal('Low ward: intimidation complaint filed, local attention drawn', 'complication', `lw-labor-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.lastResult = `The worker confirms the containers were unusual — heavy for their size, cold to the touch, and required special handling instructions that nobody explained properly.`;
        addJournal('Low ward: unusual container confirmed — cold, heavy, unexplained handling requirements', 'evidence', `lw-labor-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  }
];

window.AURORA_HEIGHTS_STAGE2_ENRICHED_CHOICES = AURORA_HEIGHTS_STAGE2_ENRICHED_CHOICES;
window.IRONSPOOL_WARD_STAGE2_ENRICHED_CHOICES = IRONSPOOL_WARD_STAGE2_ENRICHED_CHOICES;
window.VERDANT_ROW_STAGE2_ENRICHED_CHOICES = VERDANT_ROW_STAGE2_ENRICHED_CHOICES;
window.GRANARY_STEPS_STAGE2_ENRICHED_CHOICES = GRANARY_STEPS_STAGE2_ENRICHED_CHOICES;
window.IRON_LEDGER_WARD_STAGE2_ENRICHED_CHOICES = IRON_LEDGER_WARD_STAGE2_ENRICHED_CHOICES;
window.RECKONING_QUARTER_STAGE2_ENRICHED_CHOICES = RECKONING_QUARTER_STAGE2_ENRICHED_CHOICES;
window.SCRIPTORIUM_STEPS_STAGE2_ENRICHED_CHOICES = SCRIPTORIUM_STEPS_STAGE2_ENRICHED_CHOICES;
window.HIGH_QUARTER_STAGE2_ENRICHED_CHOICES = HIGH_QUARTER_STAGE2_ENRICHED_CHOICES;
window.COMMON_QUARTER_STAGE2_ENRICHED_CHOICES = COMMON_QUARTER_STAGE2_ENRICHED_CHOICES;
window.LOW_WARD_STAGE2_ENRICHED_CHOICES = LOW_WARD_STAGE2_ENRICHED_CHOICES;
