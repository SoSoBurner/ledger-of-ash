/**
 * GUILDHEART HUB STAGE 2 ENRICHED CHOICES
 * Investigation arc: union freight routing / charter-exempt cargo transit
 * NPCs: Cala Ledgermere (Innkeeper), Derris Ledgermere (Market Clerk),
 *       Nyra Ledgermere (Shrine Attendant), Luthen Ledgermere (Porter), Sable Ledgermere (Scribe)
 */

const GUILDHEART_HUB_STAGE2_ENRICHED_CHOICES = [

  {
    label: "Sable Ledgermere's Archive Scribing Hall contains the union freight charter records — the sealed charter pattern from the suppression investigation appears in three filed exemptions.",
    tags: ['Investigation', 'Stage2', 'Meaningful'],
    xpReward: 80,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(80, 'reviewing union freight charter exemptions');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_sable_ledgermere = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `Sable has already flagged all three exemptions. She sets her reference index open to a subsidiary notation and taps the entry without speaking first. The sealed charter pattern matches a Principality of Shelk contract rider predating Union consolidation — one that was supposed to terminate on consolidation. It didn't terminate. The renewal line carries ink from this year. Someone renewed it without filing the renewal through Union registry.`;
        addJournal('Sealed charter is expired Shelk contract rider — quietly renewed, predates Union consolidation', 'evidence', `guild-sable-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The exemption files require a Guild Arbiter review code. Sable's expression doesn't change when you can't provide one. She stamps a referral form — standard procedure, she says. The form goes to the Arbiter office automatically. She hands you the carbon copy. "For your records." The referral is already logged before you leave the hall.`;
        addJournal('Charter access referral logged — Guild Arbiter office notified', 'complication', `guild-sable-fail-${G.dayCount}`);
      } else {
        G.flags.met_sable_ledgermere = true;
        G.investigationProgress++;
        G.lastResult = `Sable confirms the three exemptions carry the same unusual charter pattern. She pulls the source reference log and runs her finger down two columns before stopping. "Predates current Union governance. I can't source it further without the subsidiary archive, and that's a separate request." She closes the log. "Old paper. New ink on the renewal line."`;
        addJournal('Pre-Union charter with recent renewal line — old structure, active use', 'evidence', `guild-sable-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Luthen Ledgermere routes freight through the transit yard — three cargo batches under charter exemption were loaded at unusual hours without standard inspection.",
    tags: ['NPC', 'Survival', 'Stage2', 'Meaningful'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'questioning freight porter Luthen Ledgermere');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('survival', (G.skills.survival||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_luthen_ledgermere = true;
        G.investigationProgress++;
        G.lastResult = `Luthen keeps his eyes on the yard while he talks. The loading crews for those three batches weren't guild — brought in from outside, names not on the shift register. The cargo had a chemical smell through the crating. Destination manifests listed a transit point northeast of Ithtananalor that he's never routed to before or since. "They told me not to enter it in my personal log. Just the official sheet." He pauses. "Official sheet goes to the charter desk. My log stays with me."`;
        addJournal('Non-guild crews loaded sealed compounds — unlisted northeast transit point', 'evidence', `guild-luthen-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Luthen turns back to his clipboard before you finish the question. "Charter cargo isn't a porter's department to inspect. I move it, I log it, I clear the bay." He marks something on the sheet. "That's the job." The conversation is over in under a minute. He doesn't look up again.`;
        addJournal('Transit yard freight inquiry stonewalled', 'complication', `guild-luthen-fail-${G.dayCount}`);
      } else {
        G.flags.met_luthen_ledgermere = true;
        G.investigationProgress++;
        G.lastResult = `Luthen confirms the night-loading runs. "Three batches, past regular hours. Weight didn't match the description category on the manifest — too dense for textile, too light for stone." He filed the official log, not a discrepancy report. "Charter exemption means no secondary review. That's in the protocol. Always has been." He marks it as if the protocol settled the question. It didn't.`;
        addJournal('Charter-exempt cargo weight mismatch — no-questions protocol cited', 'evidence', `guild-luthen-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Derris Ledgermere at the Tariff Exchange Counter processes every import fee in Guildheart — a category of imports has been systematically zero-rated for eight months.",
    tags: ['NPC', 'Craft', 'Stage2', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'examining systematically zero-rated imports with Derris Ledgermere');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('craft', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_derris_ledgermere = true;
        G.investigationProgress++;
        G.lastResult = `Derris pulls the category sheet without being asked. "Memorial ceremonial materials — Panim classification." He runs the volume column with his finger. "Twenty-two times the threshold for standard audit trigger. Retroactive exemption applied to cover the prior six months of import, then set as standing." He sets the sheet down. "It should have been reviewed at month three. No review has been requested. No review has been ordered." His abacus sits at his elbow, unused.`;
        addJournal('Guildheart zero-rated Panim memorial imports — 22x audit threshold, retroactive exemption', 'evidence', `guild-derris-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Derris asks for tariff review credentials before pulling anything from the counter. When you can't provide them, he writes the inquiry into his access log — category, time, physical description. "Unauthorized review attempts go to the Guild Arbiter. Standard procedure." He slides the log closed. The entry is already complete before you've finished your sentence.`;
        addJournal('Tariff inquiry logged as unauthorized — Guild Arbiter notified', 'complication', `guild-derris-fail-${G.dayCount}`);
      } else {
        G.flags.met_derris_ledgermere = true;
        G.investigationProgress++;
        G.lastResult = `Derris confirms the zero-rating without looking at the file. "That category was set eight months ago and hasn't been reviewed." He taps the counter. "Volume triggers a standard audit at a specific threshold. This category passed that threshold in month three." He waits a moment. "Nobody filed for audit review. Nobody's questioned it."`;
        addJournal('Zero-rated import category passed audit threshold — no review filed', 'evidence', `guild-derris-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Cala Ledgermere's Guild Quarter Inn hosts traveling trade arbiters — one arbiters has been a regular guest while working on a contract she refuses to identify.",
    tags: ['NPC', 'Persuasion', 'Stage2', 'Meaningful'],
    xpReward: 66,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'questioning innkeeper Cala Ledgermere about trade arbiter guests');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('persuasion', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_cala_ledgermere = true;
        G.investigationProgress++;
        G.lastResult = `Cala gives the physical description without hesitation — she's observant in the way innkeepers become when guests repeat. The profile matches Iron Compact field arbitration. "Always the same table. Always the same other guest — not registered with the Union, I checked once. Provisional registration, renewed monthly." She straightens a cup that doesn't need straightening. "They meet the evening before the freight loads. Every time."`;
        addJournal('Guildheart inn: Iron Compact arbiter meets monthly-registered broker night before charter loads', 'evidence', `guild-cala-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Cala stops wiping the counter. "My guests' business isn't something I discuss." Her voice is even — this isn't the first time someone has asked. She doesn't tell you to leave. She doesn't need to. By the time you reach the door, she's already speaking to the nearest table. Your own table acquires a different character after that.`;
        drawSocialMisstep(G.location);
        addJournal('Innkeeper protective response — table flagged for watching', 'complication', `guild-cala-fail-${G.dayCount}`);
      } else {
        G.flags.met_cala_ledgermere = true;
        G.investigationProgress++;
        G.lastResult = `Cala thinks before answering, which means she's deciding how much. "Comes in from the east. Leaves northwest. Carries sealed documentation, never leaves it in the room." She refills a cup before continuing. "She's not here for any arbitration I've seen go through the main hall. I'd remember — those are logged at the desk."`;
        addJournal('Regular off-channel arbiter: east arrival, northwest departure, sealed documents', 'evidence', `guild-cala-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Nyra Ledgermere's Guild Shrine Alcove serves as neutral meeting ground — she has witnessed two conversations between parties who should not know each other.",
    tags: ['NPC', 'Lore', 'Stage2', 'Meaningful'],
    xpReward: 64,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(64, 'speaking with shrine attendant Nyra Ledgermere');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_nyra_ledgermere = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `Nyra describes it precisely because precision is how she maintains neutrality. A Shelkopolis Roadwarden captain — not Windrider, different build, different insignia placement — and an Oversight Collegium representative. The Collegium representative laid a document on the offering table. The Roadwarden read it, signed it, left it. "I did not intervene. Neutral ground means neutral ground." She folds her hands. "I do not know what was signed. I know what category of insignia signed it."`;
        addJournal('Shrine meeting: non-Windrider Roadwarden signed Collegium document — insignia confirmed', 'evidence', `guild-nyra-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.reverence = (G.worldClocks.reverence||0) - 1;
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Nyra listens to the full question before answering. "Shrine confidentiality covers what is witnessed in the alcove. I can't provide testimony about meetings that occurred here." She doesn't apologize. The principle isn't regret — it's structure. "The alcove is neutral because that protection is absolute. If you need another way to reach this information, I'll help you find it. I can't be the path."`;
        addJournal('Shrine confidentiality invoked — alcove testimony refused, alternative paths offered', 'complication', `guild-nyra-fail-${G.dayCount}`);
      } else {
        G.flags.met_nyra_ledgermere = true;
        G.investigationProgress++;
        G.lastResult = `Nyra describes the insignia of both parties without names — two different institutional categories, she confirms. A document passed between them. One party produced it, the other signed. "They left separately, at least ten minutes apart." She pauses. "The timing of that meeting falls within the same week the charter exemptions were filed at the tariff counter."`;
        addJournal('Shrine document exchange at charter exemption filing week', 'evidence', `guild-nyra-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Selene Brokerwell's name keeps appearing on the subsidiary archive requests — she filed three in the same week the charter rider was renewed.",
    tags: ['stage2', 'guildheart_hub'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var roll = rollD20('persuasion', G.skills.persuasion);
      if (roll.total >= 13) {
        G.flags.met_selene_brokerwell = true;
        G.investigationProgress++;
        addNarration(
          'The Brokerwell Ledger',
          'Selene Brokerwell meets you in the arbitration pavilion\'s side corridor rather than a formal hearing chamber — a deliberate choice that puts the conversation off the public record. She speaks in clauses. Each one is technically a question about your credentials and each one confirms she already knows the answer. The subsidiary archive requests, she says, were filed to close a compliance gap that predated her appointment. She sets a single document on the bench between you and does not pick it up again. The compliance gap was never formally closed.'
        );
        addJournal('Selene Brokerwell acknowledged unclosed compliance gap tied to charter renewal week', 'evidence');
        maybeStageAdvance();
      } else {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        addNarration(
          'Referred Upward',
          'Selene Brokerwell\'s secretary intercepts the inquiry before it reaches her floor. Archive requests of that classification require a filed review petition and a ten-day processing window. The secretary writes the petition form number on a slip and hands it across the counter without looking up. The number does not match the standard petition series on the wall chart. Someone changed the series recently.'
        );
      }
    }
  },

  {
    label: "The bonded warehouse blocks along the canal run — the loading crane at bay seven has chalk marks that don't match any active freight manifest.",
    tags: ['stage2', 'guildheart_hub'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      var roll = rollD20('lore', G.skills.lore);
      if (roll.total >= 13) {
        G.flags.guildheart_bay7_examined = true;
        G.investigationProgress++;
        addNarration(
          'Bay Seven',
          'The chalk marks on the crane guide post are a weight-load notation system — standard for heavy freight staging. The numbers match the density range Luthen described: too dense for textile, too light for stone. A second set of marks lower on the post uses a different notation entirely, one more commonly seen on Shelkopolis dock infrastructure. Someone who learned crane work on the Shelk coast staged cargo here and did not bother to use the local system. The bay has been cleared since, but chalk on iron takes longer to fully fade than whoever used it expected.'
        );
        addJournal('Bay seven crane marks: Shelk-system weight notation, matches charter-exempt cargo density range', 'evidence');
        maybeStageAdvance();
      } else {
        addNarration(
          'Freight Jurisdiction',
          'A labor foreman cuts across the loading lane before you reach the crane post, clipboard in hand and pace already set for someone who has interrupted his morning twice before. Bonded warehouse access requires a registered freight interest or an Arbiter-issued inspection pass. He recites it without slowing down. The canal side smells of treated rope and old water. Bay seven is gated by the time you reach the end of the lane.'
        );
      }
    }
  },

  {
    label: "The Guild Sanction Board hearing queue moves on strict rotation — cutting it would resolve this faster, but the room notices everything.",
    tags: ['stage2', 'guildheart_hub'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var roll = rollD20('stealth', G.skills.stealth);
      if (roll.total >= 13) {
        G.investigationProgress++;
        addNarration(
          'Out of Order',
          'The Sanction Board anteroom runs on a chalk-board queue. You move the slip without touching the board — a quiet word with the copy clerk about a jurisdictional cross-reference, no urgency implied. The clerk pulls the relevant packet to verify the reference. The packet contains a notation in the charter exemption series that does not appear in the copies filed at the tariff counter. Two versions of the same document. The clerk sets the packet down and writes something in his own notebook without reading the notation aloud.'
        );
        addJournal('Sanction Board packet: charter exemption notation absent from tariff counter copies — two divergent versions', 'evidence');
        maybeStageAdvance();
      } else {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        addNarration(
          'Queue Order Restored',
          'The anteroom clerk sees the slip out of rotation before the word is half finished. He does not raise his voice. He replaces the slip at the back of the board, prints a new queue number, and states the expected wait time — two hours, possibly three given afternoon hearings. The parties already waiting have noticed. One of them, a licensed merchant two positions up, is writing something on the back of his own forms. The room has recorded what happened.'
        );
      }
    }
  },

  {
    label: "Stage 2 Guildheart Hub finale — the pre-Union charter, zero-rated imports, and shrine document exchange form a complete financing chain. Move through guild channels or route it informally.",
    tags: ['Investigation', 'Finale', 'Stage2', 'Consequence', 'Meaningful'],
    xpReward: 108,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(108, 'Guildheart Hub Stage 2 resolution');
      if (!G.investigationProgress || G.investigationProgress < 8) {
        G.lastResult = `The Council clerk reviews the summary and sets it aside without opening the accompanying documents. "The chain requires corroboration at three points. Filed correctly, this moves. Filed now, it stalls." He hands it back. The case isn't ready.`;
        G.recentOutcomeType = 'investigate'; return;
      }
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('persuasion', (G.skills.persuasion||0) + Math.floor(G.level/2));
      if (result.total >= 14 || result.isCrit) {
        G.flags.stage2_finale_institutional = true;
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 3;
        G.lastResult = `The Guild Council receives the chain: charter rider, tariff exemption, inn meetings, freight manifests, shrine witness. The senior Council clerk reads the presented documents once, sets them in a specific order that is not the order you handed them over, and calls for an immediate charter audit. The pre-Union rider is formally voided within the hour. The freight routing that ran through it goes dark. Whatever comes next opens without the infrastructure that built this.`;
        addJournal('Guildheart S2 finale: Union Guild Council charter audit initiated, contract rider voided', 'evidence', `guild-finale-inst-${G.dayCount}`);
      } else {
        G.flags.stage2_finale_underworld = true;
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 3;
        G.lastResult = `The charter evidence goes to the Verdant Row network, two competing import brokers, and a trade arbitration house with a grudge against the provisional registration process — all simultaneously, all by separate courier. The freight routing doesn't collapse cleanly. It fractures into three concurrent charter contests, each party pulling the exemption in a different direction. Nobody controls what happens next. That's the point.`;
        addJournal('Guildheart S2 finale: charter evidence distributed to competing factions simultaneously', 'evidence', `guild-finale-uw-${G.dayCount}`);
      }
      G.flags.stage2_faction_contact_made = true;
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Toven at the routing desk has seen Collegium manifests — the numbering is wrong.",
    tags: ['Collegium', 'Stage2', 'Intelligence'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'Guildheart Collegium factor');
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      var result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/2));
      if (result.isCrit || result.total >= 13) {
        G.flags.met_factor_toven = true;
        G.investigationProgress = (G.investigationProgress||0) + 1;
        G.flags.collegium_contact = true;
        G.flags.stage2_faction_contact_made = true;
        G.lastResult = 'The factor — a compact man named Toven with a habit of pressing his thumbnail against the edge of every document he handles before he reads it — sets the routing order on the counter without being asked. Three manifest numbers in the Collegium block are sequential. Standard orders never run sequential; the numbering system is designed to prevent batch routing. Someone filed these together deliberately, bypassing the separation requirement. Toven does not say what that means. He presses his thumbnail against the corner of the page and slides it back across the counter to you.';
        addJournal('Guildheart factor Toven: Collegium routing block with sequential manifest numbers — batch bypass of standard separation protocol.', 'intelligence');
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'Toven listens to the question, then straightens the stack of manifests on his counter into a precise alignment. "Collegium orders process the same as any other order at this desk. Routing number queries go through the transit clerk upstairs." He does not look up. The stack is already aligned. He aligned it again anyway.';
      } else {
        G.flags.met_factor_toven = true;
        G.lastResult = 'Toven pulls the routing ledger, finds the Collegium block, and opens it to the right page without hesitation — he has looked at this page before. "Manifest numbers are assigned at filing. I process what comes through." He closes the ledger. His thumbnail runs the full length of the binding edge before he sets it back on the shelf. He is not going to say more than that, not here.';
        addJournal('Guildheart factor Toven: Collegium routing block located in transit ledger — he has checked this page before.', 'intelligence');
      }
      G.recentOutcomeType = 'investigate';
    }
  },

  {
    label: "A Collegium order sits in the transit records with no freight category assigned.",
    tags: ['Collegium', 'Stage2', 'Evidence'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'Guildheart Collegium sealed order');
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      var result = rollD20('stealth', (G.skills.stealth||0) + Math.floor(G.level/2));
      if (result.isCrit || result.total >= 12) {
        G.investigationProgress = (G.investigationProgress||0) + 1;
        G.lastResult = 'The document is heavier than standard transit paper — linen content, the kind used for long-archive filings. The seal is iron-grey wax with a quill impression, pressed at a slight angle as if stamped in haste. The routing stamp below it reads GUILDHEART TRANSIT HUB — RECEIVING, but the freight category line is blank. Not redacted. Blank, as if whoever typed the order did not know what category applied, or did not want one to. The order number is not sequential with the surrounding block.';
        addJournal('Guildheart transit records: Collegium sealed order — linen-weight paper, iron-grey quill seal, blank freight category, non-sequential order number.', 'evidence');
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'The transit records cabinet requires a routing clerk credential. The duty clerk at the desk takes your inquiry form, stamps it, and sets it in a tray marked PENDING SUPERVISOR REVIEW. "Three-day turnaround on non-standard access requests." The inquiry is now in a tray that someone from the Collegium routing block will eventually see.';
        addJournal('Guildheart transit records: access request logged — pending supervisor review, Collegium routing notification possible.', 'complication');
      } else {
        G.lastResult = 'The Collegium order is filed between two standard freight manifests, which is not where Collegium orders are supposed to go — they have a separate administrative block. It was misfiled, or placed here deliberately where it would be overlooked. The seal is intact. The freight category field is blank. The order date is three weeks ago.';
        addJournal('Guildheart transit records: Collegium order misfiled in standard freight block — sealed, blank category, dated three weeks prior.', 'evidence');
        G.investigationProgress = (G.investigationProgress||0) + 1;
      }
      G.recentOutcomeType = 'investigate';
    }
  },

  // ── COLLEGIUM FACTION CONTACT PLOT (3-beat sequence) ──────────────

  // BEAT 1 — Hook: awareness
  {
    label: "The Arbiter alcove has a third chair today.",
    tags: ['Collegium', 'Stage2', 'Faction'],
    xpReward: 60,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(60, 'noticing the moved Arbiter alcove chair');
      G.flags.stage2_faction_collegium_aware = true;
      G.lastResult = 'The alcove off the charter hall seats two Arbiters by bench design — a reading chair and a writing chair, fixed. A third chair has been carried in from the clerks row and set at an angle that puts its back to the doorway. The runner on the floor is indented in two places where a heavier chair used to stand. Sable passes the alcove without looking in. Her thumb adjusts the edge of her reference index as she goes, which is what she does when she wants to be seen being busy. Someone from outside the registry is sitting audit in that alcove, and no one on the floor is being told.';
      addJournal('Guildheart Arbiter alcove — third chair placed against protocol, registry staff avoiding the sightline', 'intelligence', `guild-collegium-aware-${G.dayCount}`);
      G.recentOutcomeType = 'investigate';
    }
  },

  // BEAT 2 — Commitment: contact made
  {
    label: "Whoever sits that chair wants something filed.",
    tags: ['Collegium', 'Stage2', 'Faction', 'NPC'],
    xpReward: 72,
    fn: function() {
      if (!G.flags.stage2_faction_collegium_aware) return;
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'approaching the Collegium auditor in the alcove');
      G.flags.met_auditor_peregrin_vas = true;
      G.flags.stage2_faction_collegium_contacted = true;
      G.lastResult = 'The auditor is an older man in a plain grey coat with no guild mark and a single Collegium cipher stitched at the cuff. He does not rise. He turns the third chair so it faces you and taps the arm twice — an invitation that is also a timing cue. "Peregrin Vas. Oversight." He does not offer a title. His tell is that he keeps a folded Union registry slip between his first and second fingers like a cigarette he is not going to light. He wants the Shelk contract rider — the one Sable flagged. A certified copy, filed to Collegium intake before the next audit rotation closes in four days. Not taken. Filed. By someone whose name is not already on the registry watch.';
      addJournal('Met Auditor Peregrin Vas (Oversight Collegium) — wants certified copy of Shelk contract rider filed to Collegium intake within 4 days', 'contact_made', `guild-collegium-contacted-${G.dayCount}`);
      G.recentOutcomeType = 'investigate';
    }
  },

  // BEAT 3 — Payoff: intel revealed
  {
    label: "File the certified copy with the auditor before the rotation closes.",
    tags: ['Collegium', 'Stage2', 'Faction', 'Payoff'],
    xpReward: 90,
    fn: function() {
      if (!G.flags.stage2_faction_collegium_contacted) return;
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(90, 'filing the certified contract rider with Oversight');
      G.flags.stage2_faction_collegium = true;
      G.flags.stage2_faction_contact_made = true;
      G.investigationProgress = (G.investigationProgress||0) + 2;
      G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
      var tension = '';
      if (G.flags.stage2_faction_shadowhands) {
        tension = ' Peregrin pauses before sealing the intake envelope. "Your coat carries the dust from a Roazian hand-press. I know the grain. Be aware the Collegium reads who a filer keeps company with before it reads what they file." He seals the envelope anyway.';
      }
      G.lastResult = 'Peregrin takes the certified copy without turning it over. He reads only the intake stamp. "Good. The rider was renewed through an administrative back-channel the Collegium has been unable to subpoena — every formal request for the source authority has been met with a missing signatory line and a date gap we cannot reconcile. Your filing creates standing. With standing, the Collegium can compel the renewal office to produce the authorizing name." He writes a single clerk code on the back of your carbon and slides it across. "When you see that code on a Guildheart notice, the compel has landed. Do not be in the building that day."' + tension;
      addJournal('Oversight Collegium intel: contract rider renewed via administrative back-channel — missing signatory line and unreconciled date gap in every prior subpoena', 'evidence', `guild-collegium-payoff-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

];

window.GUILDHEART_HUB_STAGE2_ENRICHED_CHOICES = GUILDHEART_HUB_STAGE2_ENRICHED_CHOICES;
