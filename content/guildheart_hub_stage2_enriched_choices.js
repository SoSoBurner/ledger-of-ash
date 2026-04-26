/**
 * GUILDHEART HUB STAGE 2 ENRICHED CHOICES
 * Investigation arc: union freight routing / charter-exempt cargo transit
 * NPCs: Cala Ledgermere (Innkeeper), Derris Ledgermere (Market Clerk),
 *       Nyra Ledgermere (Shrine Attendant), Luthen Ledgermere (Porter), Sable Ledgermere (Scribe)
 */

const GUILDHEART_HUB_STAGE2_ENRICHED_CHOICES = [

  {
    label: "Sable Ledgermere's Archive Scribing Hall has union freight charter records. The sealed charter pattern appears in three filed exemptions.",
    tags: ['Investigation', 'Stage2', 'Meaningful'],
    xpReward: 80,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(80, 'reviewing union freight charter exemptions');
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_sable_ledgermere = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `All three exemptions are already flagged. The reference index opens to a subsidiary notation and a finger taps the entry without a word first. The sealed charter pattern matches a Principality of Shelk contract rider predating Union consolidation — one that was supposed to terminate on consolidation. It didn't terminate. The renewal line carries ink from this year. Someone renewed it without filing the renewal through Union registry.`;
        addJournal('Sealed charter is expired Shelk contract rider — quietly renewed, predates Union consolidation', 'evidence', `guild-sable-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The exemption files require a Guild Arbiter review code. Sable's expression doesn't change when you can't provide one. She stamps a referral form — standard procedure, she says. The form goes to the Arbiter office automatically. She hands you the carbon copy. "For your records." The referral is already logged before you leave the hall.`;
        addJournal('Charter access referral logged — Guild Arbiter office notified', 'complication', `guild-sable-fail-${G.dayCount}`);
      } else {
        G.flags.met_sable_ledgermere = true;
        G.investigationProgress++;
        G.lastResult = `The three exemptions carry the same unusual charter pattern — confirmed without hesitation. The source reference log comes out and a finger runs down two columns before stopping. "Predates current Union governance. I can't source it further without the subsidiary archive, and that's a separate request." The log closes. "Old paper. New ink on the renewal line."`;
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
      const result = rollD20('vigor', (G.skills.survival||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_luthen_ledgermere = true;
        G.investigationProgress++;
        G.lastResult = `Luthen keeps his eyes on the yard while he talks. The loading crews for those three batches weren't guild — brought in from outside, names not on the shift register. The cargo had a chemical smell through the crating. Destination manifests listed a transit point northeast of Ithtananalor that he's never routed to before or since. "They told me not to enter it in my personal log. Just the official sheet." He pauses. "Official sheet goes to the charter desk. My log stays with me."`;
        addJournal('Non-guild crews loaded sealed compounds — unlisted northeast transit point', 'evidence', `guild-luthen-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The clipboard comes up before the question is finished. "Charter cargo isn't a porter's department to inspect. I move it, I log it, I clear the bay." A mark goes on the sheet and the conversation is done. He doesn't look back up. The transit yard noise fills the gap where an answer would have been.`;
        addJournal('Transit yard freight inquiry stonewalled', 'complication', `guild-luthen-fail-${G.dayCount}`);
      } else {
        G.flags.met_luthen_ledgermere = true;
        G.investigationProgress++;
        G.lastResult = `The night-loading runs are confirmed without evasion. "Three batches, past regular hours. Weight didn't match the description category on the manifest — too dense for textile, too light for stone." The official log was filed, not a discrepancy report. "Charter exemption means no secondary review. That's in the protocol. Always has been." A mark goes on the clipboard as if the protocol settled the question. It didn't.`;
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
      const result = rollD20('spirit', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_derris_ledgermere = true;
        G.investigationProgress++;
        G.lastResult = `The category sheet comes out without being asked. "Memorial ceremonial materials — Panim classification." A finger traces the volume column. "Twenty-two times the threshold for standard audit trigger. Retroactive exemption applied to cover the prior six months of import, then set as standing." The sheet goes down. "It should have been reviewed at month three. No review has been requested. No review has been ordered." The abacus sits at the counter's edge, unused.`;
        addJournal('Guildheart zero-rated Panim memorial imports — 22x audit threshold, retroactive exemption', 'evidence', `guild-derris-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Tariff review credentials are required before anything comes off the counter. Without them, the inquiry goes into the access log — category, time, physical description, written in a careful hand. "Unauthorized review attempts go to the Guild Arbiter. Standard procedure." The log slides closed. The entry is already complete before the sentence is finished.`;
        addJournal('Tariff inquiry logged as unauthorized — Guild Arbiter notified', 'complication', `guild-derris-fail-${G.dayCount}`);
      } else {
        G.flags.met_derris_ledgermere = true;
        G.investigationProgress++;
        G.lastResult = `The zero-rating is confirmed without looking at the file. "That category was set eight months ago and hasn't been reviewed." A knuckle taps the counter. "Volume triggers a standard audit at a specific threshold. This category passed that threshold in month three." A pause. "Nobody filed for audit review. Nobody's questioned it."`;
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
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_cala_ledgermere = true;
        G.investigationProgress++;
        G.lastResult = `The physical description comes without hesitation — innkeepers who survive on repeat guests develop that kind of memory. The profile matches Iron Compact field arbitration. "Always the same table. Always the same other guest — not registered with the Union, I checked once. Provisional registration, renewed monthly." A cup gets straightened that doesn't need straightening. "They meet the evening before the freight loads. Every time."`;
        addJournal('Guildheart inn: Iron Compact arbiter meets monthly-registered broker night before charter loads', 'evidence', `guild-cala-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The cloth stops moving on the counter. "My guests' business isn't something I discuss." The voice is even — this isn't the first time someone has asked. No instruction to leave. None needed. By the time you reach the door, conversation has resumed at the nearest table and your own seat has acquired a different character in the room's attention.`;
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
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
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
      var roll = rollD20('charm', G.skills.persuasion);
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
      var roll = rollD20('wits', G.skills.lore);
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
      var roll = rollD20('finesse', G.skills.stealth);
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
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/2));
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
      var result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/2));
      if (result.isCrit || result.total >= 13) {
        G.flags.met_factor_toven = true;
        G.investigationProgress = (G.investigationProgress||0) + 1;
        G.flags.collegium_contact = true;
        G.flags.stage2_faction_contact_made = true;
        G.lastResult = 'The factor — a compact man named Toven with a habit of pressing his thumbnail against the edge of every document he handles before he reads it — sets the routing order on the counter without being asked. Three manifest numbers in the Collegium block are sequential. Standard orders never run sequential; the numbering system is designed to prevent batch routing. Someone filed these together deliberately, bypassing the separation requirement. Toven does not say what that means. He presses his thumbnail against the corner of the page and slides it back across the counter to you.';
        addJournal('Guildheart factor Toven: Collegium routing block with sequential manifest numbers — batch bypass of standard separation protocol.', 'intelligence');
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'The manifest stack on the counter gets straightened into precise alignment before the answer comes. "Collegium orders process the same as any other order at this desk. Routing number queries go through the transit clerk upstairs." No eye contact. The stack was already aligned. The straightening is not about the stack.';
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
      var result = rollD20('finesse', (G.skills.stealth||0) + Math.floor(G.level/2));
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
      if (!G.flags.stage2_faction_collegium_aware) {
        G.lastResult = 'Nothing to act on with the Collegium yet.';
        G.recentOutcomeType = 'locked'; return;
      }
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'approaching the Collegium auditor in the alcove');
      G.flags.met_auditor_peregrin_vas = true;
      G.flags.stage2_faction_collegium_contacted = true;
      G.lastResult = 'The auditor is an older man in a plain grey coat with no guild mark and a single Collegium cipher stitched at the cuff. He does not rise. He turns the third chair so it faces you and taps the arm twice — an invitation that is also a timing cue. "Peregrin Vas. Oversight." He does not offer a title. His tell is that he keeps a folded Union registry slip between his first and second fingers like a cigarette he is not going to light. He wants the Shelk contract rider — the one Sable flagged. A certified copy, filed to Collegium intake before the next audit rotation closes in four days. Not taken. Filed. By someone whose name is not already on the registry watch.' + applyTensionModifier('collegium_any');
      addJournal('Met Auditor Peregrin Vas (Oversight Collegium) — wants certified copy of Shelk contract rider filed to Collegium intake within 4 days', 'contact_made', `guild-collegium-contacted-${G.dayCount}`);
      G.recentOutcomeType = 'investigate';
    }
  },

  // BEAT 3 — Payoff: intel revealed
  {
    label: "The certified copy needs to reach the auditor before rotation closes.",
    tags: ['Collegium', 'Stage2', 'Faction', 'Payoff'],
    xpReward: 90,
    fn: function() {
      if (!G.flags.stage2_faction_collegium_contacted) {
        G.lastResult = 'The Collegium contact isn\'t ready for the next step.';
        G.recentOutcomeType = 'locked'; return;
      }
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

  {
    label: "The overnight courier dispatch wall has a route that never posts return times.",
    tags: ['stage2', 'guildheart_hub'],
    xpReward: 38,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(38, 'examining courier dispatch wall for missing return logs');
      var roll = rollD20('vigor', G.skills.survival);
      if (roll.total >= 13) {
        G.flags.guild_courier_route_traced = true;
        G.investigationProgress++;
        addNarration('No Return Time', 'The courier dispatch wall is chalked fresh each evening — departures in the left columns, returns in the right. Every active route posts both. One route has run for six weeks with departures chalked in clean and the return column left blank. The dispatch clerk is watchful of the wall in a way the other clerks are not; his thumb rests on the frame each time the route comes up. The route number corresponds to a waypoint east of Guildheart Hub that was decommissioned as a mail stop two years ago. Couriers still leave for it. Couriers do not appear to come back through the dispatch desk.');
        addJournal('Courier dispatch: 6 weeks of departures to decommissioned eastern waypoint with no logged returns', 'evidence');
        maybeStageAdvance();
      } else {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        addNarration('Dispatch Protocol', 'The dispatch clerk erases the oldest row of the wall before the question is finished. Courier route inquiries are directed to the routing supervisor on the second floor; a filed inspection request precedes any conversation. He hands across a form pre-stamped with today\'s date. The chalk dust on his sleeve has a faint brass-green cast from the route-number template he uses. The form he has offered routes through a tray that includes the same eastern route\'s supervisor. Filing it is filing your name into the watched column.');
      }
    }
  },

  {
    label: "The canal-side weigh station prints duplicate tickets on one scale only.",
    tags: ['stage2', 'guildheart_hub'],
    xpReward: 36,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(36, 'examining canal weigh station duplicate ticket mechanism');
      var roll = rollD20('spirit', G.skills.craft);
      if (roll.total >= 13) {
        G.flags.guild_weigh_station_traced = true;
        G.investigationProgress++;
        addNarration('Duplicate Tickets', 'The canal-side weigh station has four scales arrayed under a timber awning. Three print single tickets for the driver. The fourth — the one furthest from the weigh master\'s booth — prints duplicates: one handed to the driver, one routed internally. The weigh master, a broad woman with grease under her nails and a cracked leather armguard worn over one wrist, waits until a driver clears the scale before she speaks. "Scale four tickets go to the charter desk queue. The other three go to the tariff audit queue." She does not say which queue is the honest one. She has told you which scales to watch.');
        addJournal('Canal weigh station: scale four routes duplicate ticket to charter desk queue — bypasses tariff audit queue', 'evidence');
        maybeStageAdvance();
      } else {
        addNarration('Weigh Station Protocol', 'The weigh master points you toward the station\'s public inquiry window without leaving her booth. Weight ticket questions are handled through the tariff adjudicator on a four-day filing window; walk-up queries are not part of the scale\'s working schedule. Her armguard creaks when she shifts her weight. A cart is already moving onto scale four behind you. The driver hands over a manifest and receives two tickets back, one of which he folds into his coat without reading. The station resumes its rhythm as if the question were never asked.');
      }
    }
  },

  {
    label: "The transit ledger's marginalia marks one waypoint with a symbol that isn't in the key.",
    tags: ['stage2', 'guildheart_hub'],
    xpReward: 40,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(40, 'decoding unmarked waypoint symbol in Guildheart transit ledger');
      var roll = rollD20('wits', G.skills.lore);
      if (roll.total >= 14) {
        G.flags.guild_waypoint_symbol_decoded = true;
        G.investigationProgress++;
        addNarration('Off-Key Mark', 'The transit ledger\'s marginalia key covers the standard route symbols — triangles for rest stops, circles for toll stations, squares for bonded depots. One waypoint carries a mark that is not in the key: two parallel bars crossed by a diagonal, drawn in ink rather than pencil. The mark appears at the same waypoint across thirty-one separate entries, always on charter-exempt routes, never on standard freight. A retired hauler at the next bench recognizes it — Shelkopolis coaster shorthand for a private hand-off point, used when cargo changes custody without a guild registration. The mark does not appear in any Union training material. Someone who learned it elsewhere taught it here.');
        addJournal('Transit ledger: off-key waypoint symbol is Shelkopolis coaster private hand-off mark — 31 entries on charter-exempt routes', 'evidence');
        maybeStageAdvance();
      } else {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        addNarration('Ledger Control', 'The transit ledger custodian closes the marginalia section and turns the book face-down on the counter. Marginalia is working-reference material, she says — compiled across generations of routing clerks, not for external review. The face-down posture is deliberate; she will not hand a closed ledger back across the counter until the person asking has walked out of the hall. A junior clerk at the next desk is making a careful copy of the cover description onto a slip of paper. It will go upstairs with the afternoon\'s routing reports. The ledger stays face-down.');
      }
    }
  },

];

// Sideplot injection — guildheart union testimony gap (Stage II only)
(function() {
  var _gapHook = (typeof GUILDHEART_UNION_TESTIMONY_GAP !== 'undefined') ? GUILDHEART_UNION_TESTIMONY_GAP.openingHook() : null;
  if (_gapHook) GUILDHEART_HUB_STAGE2_ENRICHED_CHOICES.push(_gapHook);
  var _gapRung2 = (typeof GUILDHEART_UNION_TESTIMONY_GAP !== 'undefined') ? GUILDHEART_UNION_TESTIMONY_GAP.rung2Hook() : null;
  if (_gapRung2) GUILDHEART_HUB_STAGE2_ENRICHED_CHOICES.push(_gapRung2);
})();

window.GUILDHEART_HUB_STAGE2_ENRICHED_CHOICES = GUILDHEART_HUB_STAGE2_ENRICHED_CHOICES;
