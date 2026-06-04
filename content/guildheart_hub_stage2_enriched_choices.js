/**
 * GUILDHEART HUB STAGE 2 ENRICHED CHOICES
 * Investigation arc: union freight routing / charter-exempt cargo transit
 * NPCs: Cala Ledgermere (Innkeeper), Derris Ledgermere (Market Clerk),
 *       Nyra Ledgermere (Shrine Attendant), Luthen Ledgermere (Porter), Sable Ledgermere (Scribe)
 */

var GUILDHEART_HUB_STAGE2_ENRICHED_CHOICES = [

  {
    label: "The sealed charter pattern appears in three filed freight exemptions. Not once by accident.",
    tags: ['Investigation', 'Stage2', 'Meaningful'],
    xpReward: 80,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(80, 'reviewing union freight charter exemptions');
      const result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_sable_ledgermere = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `All three exemptions are already flagged. The reference index opens to a subsidiary notation and a finger taps the entry without a word first. The sealed charter pattern matches a Principality of Shelk contract rider predating Union consolidation — one that was supposed to terminate on consolidation. It didn't terminate. The renewal line carries ink from this year. Someone renewed it without filing the renewal through Union registry.`;
        addJournal('Sealed charter is expired Shelk contract rider — quietly renewed, predates Union consolidation', 'evidence', `guild-sable-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The exemption files require a Guild Arbiter review code. Sable's expression doesn't change when you can't provide one. She stamps a referral form — standard procedure, she says. The form goes to the Arbiter office automatically. She hands you the carbon copy. "For your records." The referral is already logged before you leave the hall. The figure who followed you from the counting hall was not a Collegium marshal — wrong posture, wrong attention pattern. Red Hood does not announce itself. It simply knows where you are.`;
        addJournal('Charter access referral logged — Guild Arbiter office notified', 'complication', `guild-sable-fail-${G.dayCount}`);
      } else {
        G.flags.met_sable_ledgermere = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The three exemptions carry the same unusual charter pattern — confirmed without hesitation. The source reference log comes out and a finger runs down two columns before stopping. "Predates current Union governance. I can't source it further without the subsidiary archive, and that's a separate request." The log closes. "Old paper. New ink on the renewal line." The abacus at the desk corner sits untouched; the calculation has already been done. The ink on that renewal line is this season's batch — the Hub switched compounds in spring.`;
        addJournal('Pre-Union charter with recent renewal line — old structure, active use', 'evidence', `guild-sable-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Three charter-exempt batches loaded at unusual hours without standard inspection.",
    tags: ['NPC', 'Survival', 'Stage2', 'Meaningful'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'questioning freight porter Luthen Ledgermere');
      const result = rollD20('vigor', (G.skills.vigor||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_luthen_ledgermere = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Luthen keeps his eyes on the yard while he talks. The loading crews for those three batches weren't guild — brought in from outside, names not on the shift register. The cargo had a chemical smell through the crating. Destination manifests listed a transit point northeast of Ithtananalor that he's never routed to before or since. "They told me not to enter it in my personal log. Just the official sheet." He pauses. "Official sheet goes to the charter desk. My log stays with me."`;
        addJournal('Non-guild crews loaded sealed compounds — unlisted northeast transit point', 'evidence', `guild-luthen-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The clipboard comes up before the question is finished. "Charter cargo isn't a porter's department to inspect. I move it, I log it, I clear the bay." A mark goes on the sheet and the conversation is done. He doesn't look back up. The transit yard noise fills the gap where an answer would have been — a crane mechanism cycling, a foreman calling a measure across the dock, the wet slap of canal water against the loading platform.`;
        addJournal('Transit yard freight inquiry stonewalled', 'complication', `guild-luthen-fail-${G.dayCount}`);
      } else {
        G.flags.met_luthen_ledgermere = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The night-loading runs are confirmed without evasion. "Three batches, past regular hours. Weight didn't match the description category on the manifest — too dense for textile, too light for stone." The official log was filed, not a discrepancy report. "Charter exemption means no secondary review. That's in the protocol. Always has been." A mark goes on the clipboard as if the protocol settled the question. It didn't. The transit yard smells of rope oil and cold canal water. Luthen turns back to the bay without waiting to see if there are more questions.`;
        addJournal('Charter-exempt cargo weight mismatch — no-questions protocol cited', 'evidence', `guild-luthen-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "An import category has been zero-rated at the tariff counter for eight consecutive months.",
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
        G.lastResult = `Tariff review credentials are required before anything comes off the counter. Without them, the inquiry goes into the access log — category, time, physical description, written in a careful hand. "Unauthorized review attempts go to the Guild Arbiter. Standard procedure." The log slides closed. The entry is already complete before the sentence is finished. The chalk dust at the counter's edge drifts slightly when the ledger shuts. Derris does not look up again. The abacus beside him has not moved.`;
        addJournal('Tariff inquiry logged as unauthorized — Guild Arbiter notified', 'complication', `guild-derris-fail-${G.dayCount}`);
      } else {
        G.flags.met_derris_ledgermere = true;
        G.investigationProgress++;
        G.lastResult = `The zero-rating is confirmed without looking at the file. "That category was set eight months ago and hasn't been reviewed." A knuckle taps the counter. "Volume triggers a standard audit at a specific threshold. This category passed that threshold in month three." A pause. "Nobody filed for audit review. Nobody's questioned it." The counter smells of ink and old parchment. Derris straightens the ledger stack by one corner and leaves the conversation there — not hostile, just finished.`;
        addJournal('Zero-rated import category passed audit threshold — no review filed', 'evidence', `guild-derris-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "A regular arbiter guest, working on something for months. She won't name it.",
    tags: ['NPC', 'Persuasion', 'Stage2', 'Meaningful'],
    xpReward: 66,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'questioning innkeeper Cala Ledgermere about trade arbiter guests');
      const result = rollD20('charm', (G.skills.charm||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_cala_ledgermere = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
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
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Cala thinks before answering, which means she's deciding how much. "Comes in from the east. Leaves northwest. Carries sealed documentation, never leaves it in the room." She refills a cup before continuing. "She's not here for any arbitration I've seen go through the main hall. I'd remember — those are logged at the desk." She straightens the cup handle before setting it down. Whatever else she knows, she has decided that is the portion she is giving.`;
        addJournal('Regular off-channel arbiter: east arrival, northwest departure, sealed documents', 'evidence', `guild-cala-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Two conversations at the shrine alcove between parties who should not know each other.",
    tags: ['NPC', 'Lore', 'Stage2', 'Meaningful'],
    xpReward: 64,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(64, 'speaking with shrine attendant Nyra Ledgermere');
      const result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
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
        G.lastResult = `Nyra describes the insignia of both parties without names — two different institutional categories, she confirms. A document passed between them. One party produced it, the other signed. "They left separately, at least ten minutes apart." She pauses. "The timing of that meeting falls within the same week the charter exemptions were filed at the tariff counter." The shrine alcove holds a faint smell of cedar oil from the offering lamp. Nyra folds her hands and waits, giving the silence the same attention she gave the exchange.`;
        addJournal('Shrine document exchange at charter exemption filing week', 'evidence', `guild-nyra-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Selene Brokerwell filed three subsidiary archive requests the same week the charter rider renewed.",
    tags: ['stage2', 'guildheart_hub'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      var roll = rollD20('charm', G.skills.charm);
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
    label: "Bay seven crane has chalk marks that don't appear on any active freight manifest.",
    tags: ['stage2', 'guildheart_hub'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      var roll = rollD20('wits', G.skills.wits);
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
    label: "The Sanction Board queue runs on strict rotation. Cutting it resolves this. The room notices.",
    tags: ['stage2', 'guildheart_hub'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      var roll = rollD20('finesse', G.skills.finesse);
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
    label: "The mystery broker's registration renews monthly. The clerks don't read the attached rider.",
    tags: ['Stage2', 'NPC'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'tracing monthly provisional registration renewal at Guildheart Hub');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.guild_provisional_reg_traced = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The registration clerk responsible for the monthly renewals has a rotation schedule pinned above her desk. The mystery broker's renewal always arrives the first working day of the month — typed, pre-stamped with a Shelkopolis notary cipher, and accompanied by a single page rider that the renewal form doesn't require. She's been setting the rider in the supplementary file without reading it. When she opens the file now and reads it, her posture changes. The rider waives liability for any goods transiting under the registration's charter umbrella. Every charter-exempt load moved through this registration without the Hub assuming freight liability. Someone wrote that exemption two years ago and has been renewing it silently ever since.`;
        addJournal('Provisional registration rider: blanket freight liability waiver on charter-exempt cargo — 2 years of silent renewal', 'evidence', `guild-provreg-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The registration counter is staffed by a duty clerk who handles walk-up inquiries. Provisional registration records are administrative — they route through a separate access tier that requires a Guild Review Board credential or a filed data-access petition with a seven-day window. The duty clerk takes a copy of the petition form from the rack and sets it on the counter. The form's reference number is different from the standard series posted on the wall. Someone reprinted the forms recently.`;
        addJournal('Provisional registration access blocked — petition form numbering inconsistent with wall reference series', 'complication', `guild-provreg-fail-${G.dayCount}`);
      } else {
        G.flags.guild_provisional_reg_traced = true;
        G.investigationProgress++;
        G.lastResult = `The registration renewal is confirmed as monthly, same clerk, same arrival day. "I process what comes in. Riders go in the supplementary file." She pulls the supplementary file. The rider is one page — dense legalese. She reads the first clause and stops. "This exempts the registrant from freight liability under charter umbrella coverage." A pause. "Standard registrations don't carry charter umbrella coverage at all."`;
        addJournal('Provisional registration rider exempts registrant from freight liability — non-standard charter umbrella coverage', 'intelligence', `guild-provreg-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The notary cipher on the renewal rider should match an active seal. It doesn't.",
    tags: ['Stage2', 'NPC'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'cross-referencing Shelk notary cipher against active seal registry');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('spirit', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.guild_notary_cipher_exposed = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The Guildheart Hub keeps a bound register of active cross-polity notarial seals for document verification. The Shelk cipher on the registration rider is number four digits short of the current active sequence — it predates the Shelkopolis Notarial Reform by three years. The notary whose name it carries died before the reform. Every monthly renewal for two years has been authenticated with a dead man's seal. The document is technically valid under a pre-reform window that Guildheart Hub never formally closed. Someone knew that window existed and has been feeding documents through it. The register clerk marks the entry in red and does not look up.`;
        addJournal('Shelk notary cipher is pre-reform dead-notary seal — valid only through unclosed Guildheart procedural window', 'evidence', `guild-notary-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        addHeat('shelk', 1);
        G.lastResult = `Cross-polity seal verification requires a formal authentication request routed through the Shelkopolis Consular Bureau at Guildheart Hub. The request window is open second and fourth tide-turn mornings. The duty clerk takes the inquiry and logs the date and time. The Consular Bureau log is shared with the Shelk Roadwarden coordination desk. Asking this question officially is putting the question where the Roadwarden captain Nyra described can see it.`;
        addJournal('Notary seal verification request logged — Shelk Consular Bureau shares log with Roadwarden coordination desk', 'complication', `guild-notary-fail-${G.dayCount}`);
      } else {
        G.flags.guild_notary_cipher_exposed = true;
        G.investigationProgress++;
        G.lastResult = `The active seal register goes back six years. The cipher on the rider isn't in it. "Pre-reform seals aren't in this register — they're in the legacy index, back cabinet." The legacy index is found after ten minutes of searching. The cipher matches a notary who retired before the reform. The entry is marked INACTIVE in the legacy index. "Pre-reform instruments are still technically operable if the receiving institution never formally closed the acceptance window." She looks at the legacy index entry. "Guildheart Hub never closed it."`;
        addJournal('Shelk notary cipher pre-dates reform — Guildheart Hub acceptance window never formally closed', 'intelligence', `guild-notary-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The manifest waypoint isn't in the Union registry. It's in a private Shelk charter annex.",
    tags: ['Stage2', 'NPC'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'locating northeast waypoint in Shelk charter annex');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('finesse', (G.skills.finesse||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.guild_shelk_waypoint_found = true;
        G.investigationProgress++;
        G.lastResult = `The Union route registry has no record of the northeast waypoint. The Shelk charter annex — a supplementary volume shelved behind the standard registry, spine unmarked — has it listed under a Shelk private freight covenant from before consolidation: a designated hand-off point for sealed Shelk government cargo transiting Union territory without inspection rights. The covenant was supposed to lapse at consolidation. The annex page has a pencil notation in the margin: ACTIVE PER RIDER. Someone checked this page recently. The pencil is still sharp.`;
        addJournal('Northeast waypoint in Shelk private freight covenant — pre-consolidation inspection exemption, pencil notation reads ACTIVE PER RIDER', 'evidence', `guild-waypoint-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        addHeat('union', 1);
        G.lastResult = `The supplementary annex volumes are in a restricted reference bay behind the main registry. A senior clerk intercepts the approach before the bay is reached. "Supplementary annexes require a research credential filed twenty-four hours in advance." The credential form is taken from the rack. It asks for institutional affiliation and the specific annex number — which requires knowing which annex to request. The form is asking for the answer to the question being asked. The senior clerk waits.`;
        addJournal('Shelk charter annex access blocked — credential form requires specific annex number as prerequisite', 'complication', `guild-waypoint-fail-${G.dayCount}`);
      } else {
        G.flags.guild_shelk_waypoint_found = true;
        G.investigationProgress++;
        G.lastResult = `The northeast waypoint isn't in the Union registry. A registry clerk suggests the supplementary annex volumes — pre-consolidation instruments that weren't transferred into the main registry. The relevant annex is found on the third attempt. The waypoint is listed under a Shelk private freight covenant, marked as a government-designated hand-off point with an inspection exemption clause. The covenant page carries a margin note in pencil: ACTIVE PER RIDER. The handwriting matches nothing else in the volume.`;
        addJournal('Northeast waypoint: pre-consolidation Shelk government hand-off point with penciled ACTIVE PER RIDER margin note', 'intelligence', `guild-waypoint-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The arbiter filed the tariff exemption review as complete. He never did it.",
    tags: ['Stage2', 'NPC'],
    xpReward: 66,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'confronting Guild Arbiter over fraudulent review completion');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('charm', (G.skills.charm||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.guild_arbiter_compromised = true;
        G.investigationProgress++;
        G.lastResult = `Arbiter Rellick Dunmore has an office at the end of the corridor that gets no traffic. He's been watching the door from the moment it opened. The review form he filed is produced without being asked — he has it ready, which means he has been waiting for this. The completion stamp is his, dated the same week the exemption hit the audit threshold. He hasn't touched the file since. "I was told the review had been handled through the charter desk and that a completion form was a procedural courtesy." He was told by a name he writes on a slip and doesn't say aloud. He slides the slip across. "I kept a copy."`;
        addJournal('Arbiter Dunmore filed fraudulent review completion — directed by named party, kept copy of instruction', 'evidence', `guild-arbiter-${G.dayCount}`);
      } else if (result.isFumble) {
        addHeat('shelk', 1);
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Arbiter Dunmore closes his office door before the question is two sentences long. Through the glass panel he shakes his head once. Not aggressive — exhausted. The corridor outside his office smells of old paper and nervous sweat. He is not going to help, and whatever he knows has already cost him something. The door stays closed. A clerk passes behind you without slowing. The corridor returns to its ordinary pace as if the closed door were unremarkable. Perhaps it has been closed a long time.`;
        addJournal('Arbiter Dunmore refused approach — appears aware and frightened, door closed', 'complication', `guild-arbiter-fail-${G.dayCount}`);
      } else {
        G.flags.guild_arbiter_compromised = true;
        G.investigationProgress++;
        G.lastResult = `Arbiter Dunmore doesn't deny it. "The completion form was filed because someone told me the audit had been resolved through a separate channel. I filed the completion to close the administrative loop." He doesn't look at the review form. "I didn't ask what channel. That was my error." He knows it's worse than an error. He will not name who instructed him without a formal protection filing in place first. "Put that on record for me and I'll answer every question you have." The corridor outside his office smells of old lamp oil and stacked paper. His hands stay flat on the desk.`;
        addJournal('Arbiter Dunmore admits filing false completion on instruction — will cooperate under formal protection filing', 'intelligence', `guild-arbiter-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The import stamp belongs to a cultural attaché not stationed here for three years.",
    tags: ['Stage2', 'NPC'],
    xpReward: 64,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(64, 'tracing Panim cultural attaché stamp on memorial import classification');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('vigor', (G.skills.vigor||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.guild_panim_stamp_traced = true;
        G.investigationProgress++;
        G.lastResult = `The Guildheart Hub polity attaché registry goes back twelve years. The Panim cultural attaché whose seal appears on the memorial import classification — a circular stamp with a twin-vessel motif — left her post three years ago and was not replaced. The seal itself was returned to the Panim consulate at departure; the Hub received a formal seal-retirement record. Someone reproduced it. The ink on the memorial import stamp has a faint blue-green tint that doesn't match the original seal's iron-based compound. Derris Ledgermere, who handles the tariff classification, has never met the attaché. The stamp was already on the form when it arrived.`;
        addJournal('Panim attaché seal on memorial import classification is forgery — departed 3 years ago, seal retired, ink compound mismatch', 'evidence', `guild-panim-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Polity attaché records are diplomatic channel material — not accessible through standard registry inquiry. The Hub liaison officer for polity affairs takes the request and marks it for routing through the formal diplomatic correspondence queue, which runs on a monthly review cycle. The current cycle closed yesterday. The inquiry sits in the diplomatic queue where it will be visible to every polity liaison who reviews outbound correspondence. That includes the Panim desk.`;
        addJournal('Panim attaché registry access routed to diplomatic queue — visible to Panim desk on monthly review', 'complication', `guild-panim-fail-${G.dayCount}`);
      } else {
        G.flags.guild_panim_stamp_traced = true;
        G.investigationProgress++;
        G.lastResult = `The attaché registry shows a departure record for the Panim cultural position three years ago with no replacement filed. The stamp on the zero-rated import classification carries that departed attaché's seal designation. "The seal retirement record is here — we received it at departure. Retired seals are not supposed to be in circulation." The registry clerk compares the seal on file against the impression on the import form. "The motif is right. The ink is wrong. Ours used an iron-based compound. This one didn't."`;
        addJournal('Panim attaché seal: retired 3 years ago, reproduced with incorrect ink compound on zero-rated import forms', 'intelligence', `guild-panim-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Three charter-exempt loads never insured. The broker signed a waiver he can't explain.",
    tags: ['Stage2', 'NPC'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'tracing uninsured charter-exempt loads at Union bonding house');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('charm', (G.skills.charm||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.guild_bonding_waiver_exposed = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Broker Fen Callard runs the bonding desk out of a narrow office with a window that faces the canal lock gates rather than the street. He doesn't wait for the full question. The waiver forms are already on the desk — he pulled them this morning. "The three loads came through with a pre-signed waiver of bonding obligation, authorized under a Union freight council instrument I've never seen before or since." He smooths one corner of the topmost form. "If those loads were lost or seized, nobody was going to pay for them. Not the Hub, not the shipper, not my office. The instrument designated liability to a party whose name is a guild mark rather than a person."`;
        addJournal('Bonding house: charter-exempt loads carried pre-signed liability waiver — guild mark matches Sable charter subsidiary notation', 'evidence', `guild-bonding-${G.dayCount}`);
      } else if (result.isFumble) {
        addHeat('shelk', 1);
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Callard's desk faces the door, which means he sees the approach before any word is said. "Bonding records are client-privileged. I don't discuss specific freight accounts without an Arbiter review order." The canal lock outside runs through a full cycle while the silence holds. His hand rests on the closed ledger in a way that has nothing to do with keeping it shut and everything to do with not moving it.`;
        addJournal('Bonding house inquiry refused — client privilege cited, broker visibly on alert', 'complication', `guild-bonding-fail-${G.dayCount}`);
      } else {
        G.flags.guild_bonding_waiver_exposed = true;
        G.investigationProgress++;
        G.lastResult = `Callard confirms the three loads went through without standard insurance bonding. "Pre-signed liability waiver — not my form, not the Hub's form. Something I hadn't seen before." He shows the instrument: a Union freight council authorization, countersigned by a guild mark. "I asked about it at the time. I was told to process and file." He filed. He kept a duplicate in a separate cabinet. "Bonding brokers always keep duplicates. That's what brokers do."`;
        addJournal('Union bonding waiver on charter-exempt loads — unfamiliar instrument form, guild mark counter-signature, broker kept duplicate', 'intelligence', `guild-bonding-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Coverage gaps during all three off-hours loading windows. Same shift supervisor signed off each time.",
    tags: ['Stage2', 'NPC'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'examining Guild Watchers duty roster for coverage gaps');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('finesse', (G.skills.finesse||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.guild_watchers_gap_exposed = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The Watchers' duty roster is posted in the gatehouse log, open to anyone with a transit pass. The three loading windows each fall in a ninety-minute gap between patrol sweeps — the kind of gap that appears when a patrol route is shortened rather than rescheduled. Shift Supervisor Orren Tavel signed the route modifications on all three nights. Each modification carries an annotation: MAINTENANCE OBSTACLE — REROUTE. There is no corresponding maintenance report for any of those nights. Tavel's initials appear on the shortfall log too: ROUTE DEVIATION SELF-CLEARED. He wrote both the problem and the resolution. Nobody countersigned.`;
        addJournal('Watchers gap: Supervisor Tavel self-certified three maintenance reroutes matching charter-load windows — no countersignature, no maintenance reports', 'evidence', `guild-watchers-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The gatehouse clerk on duty clips the roster against the wall peg before anyone gets a second look at it. Duty schedules are internal Watchers material — the posted version is the public summary, not the operational log. "Operational logs require a formal patrol audit request, filed through the Watcher Captain's office." The clerk writes down the inquiry. The Watcher Captain's office is on the same floor as Shift Supervisor Tavel's duty station.`;
        addJournal('Watchers duty roster access blocked — operational log filed to Watcher Captain, same floor as Supervisor Tavel', 'complication', `guild-watchers-fail-${G.dayCount}`);
      } else {
        G.flags.guild_watchers_gap_exposed = true;
        G.investigationProgress++;
        G.lastResult = `The posted roster shows three ninety-minute gaps across different weeks — each one inside the window Luthen described for the off-hours loads. The same supervisor's initials mark the route change on each. The annotation is identical across all three: MAINTENANCE OBSTACLE. No maintenance report is pinned alongside. The gatehouse log has a column for countersignatures on route deviations. All three are blank.`;
        addJournal('Watchers roster: three matching patrol gaps, same supervisor initials — countersignature column blank on all three', 'intelligence', `guild-watchers-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The volume assigned to that transit node exceeds declared capacity by a factor of four.",
    tags: ['Stage2', 'NPC'],
    xpReward: 66,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'cross-referencing Ithtananalor transit node capacity against assigned volume');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.guild_ithtan_volume_exposed = true;
        G.investigationProgress++;
        G.lastResult = `The supply register's transit node index lists Ithtananalor with a declared throughput ceiling — a figure set during the last infrastructure survey, which was conducted four years ago. The volume assigned to it across the charter-exempt routes exceeds that ceiling by a factor of four. A secondary column in the index tracks excess-volume flags: Ithtananalor's row has been manually cleared on each of the three relevant months, same approval mark, no name attached. The approval mark format matches the Shelk freight council instrument Callard showed at the bonding desk. The same instrument is authorizing volume overrides at the transit node.`;
        addJournal('Ithtananalor node: 4x capacity exceeded — excess-volume flags manually cleared with Shelk freight council mark matching bonding waiver instrument', 'evidence', `guild-ithtan-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The supply register is managed through the transit coordination desk, which is currently under a consolidation review — all external access suspended for the duration. The clerk at the window slides a review notice across without looking at the request. The notice is dated three days ago. Someone opened the consolidation review recently enough that the ink on the stamp is still raised.`;
        addJournal('Supply register access suspended — transit consolidation review opened 3 days ago', 'complication', `guild-ithtan-fail-${G.dayCount}`);
      } else {
        G.flags.guild_ithtan_volume_exposed = true;
        G.investigationProgress++;
        G.lastResult = `The declared throughput ceiling for Ithtananalor is right at the top of the node index — clear enough to check in thirty seconds. The assigned volume across the three charter-exempt months runs four times that figure. "Node capacity is a guideline unless the excess flag is triggered." The index column for excess flags is consulted. All three months show the flag cleared. "Cleared flags need an approval mark." The approval mark is there. No name beside it.`;
        addJournal('Ithtananalor: 4x capacity overage, excess flags cleared by unnamed approval mark — index confirms systematic override', 'intelligence', `guild-ithtan-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The ink-seal press has residue from a non-standard compound. It printed more than charter marks.",
    tags: ['Stage2', 'NPC'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'examining Union ink-seal press for non-standard compound residue');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('spirit', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.guild_seal_press_exposed = true;
        G.investigationProgress++;
        G.lastResult = `The press room keeper, a methodical woman named Voss who cleans the press beds twice daily, has been setting aside lint cloths that come away with off-color residue since the second month of the charter-exempt routing. She kept them in a sealed clay pot under the intake bench — not filed, not reported, just kept. The residue is blue-green: a Shelkopolis-origin iron compound used in private notarial seals, distinct from the Hub's standard black iron ink. The Hub's press was used to print a Shelk-style seal at least seventeen times. The lint cloths are still in the clay pot. Voss sets the pot on the bench without a word.`;
        addJournal('Hub seal press: 17+ uses of Shelk notarial compound — press keeper Voss preserved residue cloths in clay pot', 'evidence', `guild-sealpress-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Press room access requires a charter authentication credential or a filed press-inspection request countersigned by the Hub document director. The keeper outside the press room door recites this and does not step aside. Through the small press room window, the bench surface is visible and recently cleaned — still wet at the edges in the late afternoon light. Something was cleared from it recently.`;
        addJournal('Press room access denied — bench surface recently cleaned, timing notable', 'complication', `guild-sealpress-fail-${G.dayCount}`);
      } else {
        G.flags.guild_seal_press_exposed = true;
        G.investigationProgress++;
        G.lastResult = `The press keeper shows the current ink compound in use: Hub-standard black iron. The press beds are clean. But the backing roller, which receives ink bleed during runs, carries a faint blue-green tinge along one edge that the standard compound does not produce. "I clean the beds. The roller gets cleaned quarterly." She looks at the roller. "Quarterly cleaning was two weeks ago." The tinge is fresh.`;
        addJournal('Hub seal press roller: blue-green Shelk compound residue post-quarterly cleaning — recent non-standard use confirmed', 'intelligence', `guild-sealpress-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The fire report was reclassified as maintenance. The original described smoke damage to exemption files.",
    tags: ['Stage2', 'NPC'],
    xpReward: 64,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(64, 'locating reclassified archive fire report for the charter exemption subroom');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('vigor', (G.skills.vigor||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.guild_fire_report_found = true;
        G.investigationProgress++;
        G.lastResult = `The original fire report is filed under the incident's reclassified code — maintenance, sublevel two — not under the archive incident queue where it belongs. The Hub incident custodian, a deliberate man who does not volunteer anything but does not withhold what is asked directly, pulls it after a three-minute search through the maintenance sublevel index. Smoke damage to the charter exemption subroom, three file cabinets affected. The original report lists eleven specific documents by file reference that were damaged beyond reading. Cross-referencing those references against Sable's charter archive index: seven of the eleven are the pre-Union rider's source documents — the very instruments that would establish who authorized the original charter exemption. The smoke found the right files.`;
        addJournal('Archive fire report: 7 of 11 smoke-damaged documents are pre-Union rider source instruments — reclassified to maintenance to suppress', 'evidence', `guild-fire-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The incident registry is organized by classification code, not by date or location. Without the reclassified maintenance code, the fire report does not surface under any archive or charter search. The incident custodian is willing to run a date-range query but the query takes eight minutes and requires a formal access log entry. The entry goes to the same weekly summary that the Arbiter's office and the Hub document director receive. The search would announce what is being looked for before anything is found.`;
        addJournal('Archive fire report search logged — date-range query routes to Arbiter and document director weekly summary', 'complication', `guild-fire-fail-${G.dayCount}`);
      } else {
        G.flags.guild_fire_report_found = true;
        G.investigationProgress++;
        G.lastResult = `The reclassified maintenance incident report is found after working backward through the maintenance sublevel index by date. The original language is still in the document — smoke damage, charter exemption subroom, eleven file references. The reclassification stamp sits over the top right corner: ROUTINE MAINTENANCE INCIDENT — NO FURTHER ACTION. The stamp used a different ink than the rest of the document. It was applied after the fact.`;
        addJournal('Archive fire report reclassified post-hoc — smoke damage to charter exemption subroom, 11 file references listed', 'intelligence', `guild-fire-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The labor guild grievance about the off-hours crews was withdrawn. No resolution.",
    tags: ['Stage2', 'NPC'],
    xpReward: 66,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'tracing withdrawn labor guild grievance about off-hours loading crews');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('charm', (G.skills.charm||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.guild_labor_grievance_found = true;
        G.investigationProgress++;
        G.lastResult = `The labor guild's grievance record is kept by a shop steward named Morwick Pen who maintains it in a worn canvas-covered book rather than the official registry, because the official registry is reviewed by the Hub charter desk. The grievance described six loading crews that were not guild-registered, working at night on the charter-exempt bays, handling cargo that matched none of the standard categories. Pen filed it. Six days later the grievance was marked withdrawn. Pen did not withdraw it. "Someone signed it with a union grievance waiver code that I've never used." He opens the book to the page. The waiver code is in a different hand. "It's reserved for inter-guild arbitration settlements. We never had an arbitration."`;
        addJournal('Labor grievance withdrawn with false arbitration waiver code — steward Morwick Pen confirms no settlement, foreign handwriting', 'evidence', `guild-labor-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The labor guild hall is between shifts — the posted hours put the steward in at the third bell. A runner at the door takes the inquiry and writes the name and topic on a slip that goes into the steward's message box. The message box is visible through the hall window. Another slip is already in it, newer paper, set on top. Someone else asked about the same grievance this morning. The hall runner looks at the slip and does not look back up.`;
        addJournal('Labor guild inquiry logged — steward already contacted today by unknown party', 'complication', `guild-labor-fail-${G.dayCount}`);
      } else {
        G.flags.guild_labor_grievance_found = true;
        G.investigationProgress++;
        G.lastResult = `Morwick Pen remembers the grievance without being prompted — it was withdrawn under circumstances he describes as irregular. "Code used to close it isn't one our chapter uses." He shows the entry in his own book: the filing, the withdrawal, the foreign code. He won't speculate on what it means, but he makes a copy of the page on his own initiative and slides it across the desk. "Copies stay with the claimant. That's in the charter." He keeps the book open until the copy is in hand.`;
        addJournal('Labor grievance closed with unfamiliar waiver code — steward provided copy, records withdrawal as irregular', 'intelligence', `guild-labor-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The Sanction Board record lists her as a hearing witness. She was never called.",
    tags: ['Stage2', 'NPC'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'locating uncontacted witness named in Sanction Board charter hearing record');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.guild_phantom_witness_found = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Clerk Fenara Sivault is listed in the Sanction Board formal hearing record as a witness to the procedural review that approved the charter exemption — her name, her title, and a notation that she provided testimony confirming the exemption's legal standing. She is direct: she was never called to any hearing. Her name appears on no summons. Her signature appears on no testimony form. The notation in the formal record is fabricated. She has been a named witness to a proceeding that did not happen — her name is the procedural anchor if the exemption is ever challenged. "If this goes to formal review, I am the evidence that it was legitimate."`;

        addJournal('Phantom witness Fenara Sivault: named in formal charter hearing record, never summoned — fabricated testimony anchors exemption legitimacy', 'evidence', `guild-witness-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The Sanction Board formal hearing records are archived by session number, not by witness name. Without the session number for the charter exemption hearing, a name search requires a full-index query that takes a minimum of two days and produces a written access log. The log is distributed to the Board chair's office and the relevant charter desk at the end of each week. The search puts the question where the charter desk can see it before any answer arrives.`;
        addJournal('Sanction Board witness search requires formal index query — access log routes to charter desk weekly', 'complication', `guild-witness-fail-${G.dayCount}`);
      } else {
        G.flags.guild_phantom_witness_found = true;
        G.investigationProgress++;
        G.lastResult = `The Sanction Board record lists the witness by name and title, with a testimony notation. Sivault, when found on the tariff floor, recognizes her own name in the record and says nothing for a moment. "I was not called to any hearing on this." She reads the notation again. "That is not my testimony. I have not provided testimony on charter exemptions." She asks to see the session date. She was working a double shift that day — her own time log would confirm it. She was never in the Board chambers.`;
        addJournal('Sanction Board witness notation fabricated — Sivault confirmed absent on session date, own time log as alibi', 'intelligence', `guild-witness-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "A standing amendment to the exemption category. Nobody signed it. Filed as a clerical correction.",
    tags: ['Stage2', 'NPC'],
    xpReward: 64,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(64, 'examining unsigned standing amendment in charter exemption category registry');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('finesse', (G.skills.finesse||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.guild_registry_amendment_found = true;
        G.investigationProgress++;
        G.lastResult = `The standing amendment is a single paragraph inserted into the charter exemption category definition — changing the scope of what qualifies for exemption from "diplomatic and ceremonial materials" to "diplomatic, ceremonial, and designated transit materials." Three words added. Filed as a clerical correction to resolve an ambiguity. Clerical corrections don't require a policy-level signatory. They require only a registry clerk's stamp. The stamp is there. The clerk whose number appears on it transferred to the coastal office in Cosmouth eleven months ago. The category scope change enabled every load that has moved under the charter umbrella since the amendment was filed. Three words. Unsigned at the policy level. Invisible.`;
        addJournal('Charter category amendment: 3 words added under cover of clerical correction — expands exemption scope to all designated transit, no policy signatory required', 'evidence', `guild-amendment-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Registry amendment records are in the administrative archive, accessed through a reader's permit issued at the front desk. The permit requires an institutional affiliation listed in the Union register. The desk clerk checks the affiliation register while writing down the inquiry and the time of request. The inquiry is logged before the permit question is answered. No permit is issued without a logged request. The log goes to the Hub's administrative review panel.`;
        addJournal('Registry amendment access logged before permit issued — administrative review panel receives inquiry log', 'complication', `guild-amendment-fail-${G.dayCount}`);
      } else {
        G.flags.guild_registry_amendment_found = true;
        G.investigationProgress++;
        G.lastResult = `The amendment sits between two routine category updates — visible only if someone reads the registry in sequence rather than by keyword search. "Designated transit materials" is the added phrase. The filing category is clerical correction. "Clerical corrections don't go to policy review. They close an ambiguity, they don't change scope." The clerk reading it looks up. "This changes scope." The registry stamp at the bottom carries a number for a clerk who is no longer at this Hub.`;
        addJournal('Charter category clerical amendment: "designated transit materials" added — scope change filed without policy review, stamping clerk transferred out', 'intelligence', `guild-amendment-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The charter, the imports, the shrine exchange — a complete financing chain.",
    tags: ['Investigation', 'Finale', 'Stage2', 'Consequence', 'Meaningful'],
    xpReward: 108,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(108, 'Guildheart Hub Stage 2 resolution');
      if (!G.investigationProgress || G.investigationProgress < 8) {
        G.lastResult = `The Council clerk reviews the summary and sets it aside without opening the accompanying documents. "The chain requires corroboration at three points. Filed correctly, this moves. Filed now, it stalls." He hands it back. The case isn't ready. The Arbitration Hall's ambient sound fills the pause — pens on ledgers, the creak of a bench, someone counting aloud in a distant room. The clerk's expression doesn't shift. He has sent better-prepared cases back before.`;
        G.recentOutcomeType = 'partial'; return;
      }
      const result = rollD20('charm', (G.skills.charm||0) + Math.floor(G.level/2));
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
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Toven at the routing desk has seen Collegium manifests — the numbering is wrong.",
    tags: ['Collegium', 'Stage2', 'Intelligence'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'Guildheart Collegium factor');
      var result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/2));
      if (result.isCrit || result.total >= 13) {
        G.flags.met_factor_toven = true;
        G.investigationProgress = (G.investigationProgress||0) + 1;
        G.flags.collegium_contact = true;
        G.flags.stage2_faction_contact_made = true;
        G.lastResult = 'The factor — a compact man named Toven with a habit of pressing his thumbnail against the edge of every document he handles before he reads it — sets the routing order on the counter without being asked. Three manifest numbers in the Collegium block are sequential. Standard orders never run sequential; the numbering system is designed to prevent batch routing. Someone filed these together deliberately, bypassing the separation requirement. Toven does not say what that means. He presses his thumbnail against the corner of the page and slides it back across the counter to you.';
        addJournal('Guildheart factor Toven: Collegium routing block with sequential manifest numbers — batch bypass of standard separation protocol.', 'intelligence');
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        addHeat('union', 1);
        G.lastResult = 'The manifest stack on the counter gets straightened into precise alignment before the answer comes. "Collegium orders process the same as any other order at this desk. Routing number queries go through the transit clerk upstairs." No eye contact. The stack was already aligned. The straightening is not about the stack. The routing desk continues around this stillness — chalk figures posted on the transit board, the scratch of pen on manifest, a runner collecting a bound ledger from the end of the counter. Toven does not watch any of it.';
      } else {
        G.flags.met_factor_toven = true;
        G.lastResult = 'Toven pulls the routing ledger, finds the Collegium block, and opens it to the right page without hesitation — he has looked at this page before. "Manifest numbers are assigned at filing. I process what comes through." He closes the ledger. His thumbnail runs the full length of the binding edge before he sets it back on the shelf. He is not going to say more than that, not here. The routing desk smells of chalk dust and slightly damp parchment. Whatever Toven has concluded, he concluded it weeks ago and has been waiting to see who else would notice.';
        addJournal('Guildheart factor Toven: Collegium routing block located in transit ledger — he has checked this page before.', 'intelligence');
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "A Collegium order sits in the transit records with no freight category assigned.",
    tags: ['Collegium', 'Stage2', 'Evidence'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'Guildheart Collegium sealed order');
      var result = rollD20('finesse', (G.skills.finesse||0) + Math.floor(G.level/2));
      if (result.isCrit || result.total >= 12) {
        G.investigationProgress = (G.investigationProgress||0) + 1;
        G.lastResult = 'The document is heavier than standard transit paper — linen content, the kind used for long-archive filings. The seal is iron-grey wax with a quill impression, pressed at a slight angle as if stamped in haste. The routing stamp below it reads GUILDHEART TRANSIT HUB — RECEIVING, but the freight category line is blank. Not redacted. Blank, as if whoever typed the order did not know what category applied, or did not want one to. The order number is not sequential with the surrounding block. A blank category on linen-weight paper means it was intended to outlast whatever question it answered.';
        addJournal('Guildheart transit records: Collegium sealed order — linen-weight paper, iron-grey quill seal, blank freight category, non-sequential order number.', 'evidence');
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        addHeat('union', 1);
        G.lastResult = 'The transit records cabinet requires a routing clerk credential. The duty clerk at the desk takes your inquiry form, stamps it, and sets it in a tray marked PENDING SUPERVISOR REVIEW. "Three-day turnaround on non-standard access requests." The inquiry is now in a tray that someone from the Collegium routing block will eventually see. The desk smells of fresh ink and old wood. Three days is enough time for whoever placed that order to know someone is looking.';
        addJournal('Guildheart transit records: access request logged — pending supervisor review, Collegium routing notification possible.', 'complication');
      } else {
        G.lastResult = 'The Collegium order is filed between two standard freight manifests, which is not where Collegium orders are supposed to go — they have a separate administrative block. It was misfiled, or placed here deliberately where it would be overlooked. The seal is intact. The freight category field is blank. The order date is three weeks ago. The linen-weight paper sits heavier in the hand than the surrounding documents. Whoever filed it here knew it would take longer to surface than a standard transit query.';
        addJournal('Guildheart transit records: Collegium order misfiled in standard freight block — sealed, blank category, dated three weeks prior.', 'evidence');
        G.investigationProgress = (G.investigationProgress||0) + 1;
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
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
      G.recentOutcomeType = 'success'; maybeStageAdvance();
    }
  },

  // BEAT 2 — Commitment: contact made
  {
    label: "Whoever sits that chair wants something filed.",
    tags: ['Collegium', 'Stage2', 'Faction', 'NPC'],
    xpReward: 72,
    fn: function() {
      if (!(G.flags && G.flags.stage2_faction_collegium_aware)) {
        G.lastResult = 'The third chair in the Arbiter alcove is placed at an angle not visible from the registry floor. Nothing to act on with the Collegium yet — the alcove is empty, or the occupant has not made contact. The charter hall continues its usual pace around the vacancy: pens moving, clerks passing, the muted tap of a stamp on parchment from somewhere deeper in the corridor. The chair waits with the patience of placed furniture. Whoever put it there will return at their own timing.';
        G.recentOutcomeType = 'locked'; return;
      }
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'approaching the Collegium auditor in the alcove');
      G.flags.met_auditor_peregrin_vas = true;
      G.flags.stage2_faction_collegium_contacted = true;
      G.lastResult = 'The auditor is an older man in a plain grey coat with no guild mark and a single Collegium cipher stitched at the cuff. He does not rise. He turns the third chair so it faces you and taps the arm twice — an invitation that is also a timing cue. "Peregrin Vas. Oversight." He does not offer a title. His tell is a folded Union registry slip between his first and second fingers like a cigarette he will not light. He wants the Shelk contract rider — the one Sable flagged. A certified copy, filed to Collegium intake before the audit rotation closes in four days. Not taken. Filed. By someone not already on the registry watch.' + applyTensionModifier('collegium_any');
      addJournal('Met Auditor Peregrin Vas (Oversight Collegium) — wants certified copy of Shelk contract rider filed to Collegium intake within 4 days', 'contact_made', `guild-collegium-contacted-${G.dayCount}`);
      G.recentOutcomeType = 'success'; maybeStageAdvance();
    }
  },

  // BEAT 3 — Payoff: intel revealed
  {
    label: "The certified copy needs to reach the auditor before rotation closes.",
    tags: ['Collegium', 'Stage2', 'Faction', 'Payoff'],
    xpReward: 90,
    fn: function() {
      if (!(G.flags && G.flags.stage2_faction_collegium_contacted)) {
        G.lastResult = 'The Collegium contact isn\'t ready for the next step yet. Peregrin Vas needs to be approached in the Arbiter alcove before the certified copy can be filed to Oversight intake. The Arbitration Hall moves around this pause at its own pace — the shuffle of a queue at the Sanction Board anteroom, a clerk reciting reference numbers to a second clerk, the faint cold smell of chalk dust from the notice boards. The copy sits unsigned, waiting for the moment Peregrin Vas has named.';
        G.recentOutcomeType = 'locked'; return;
      }
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(90, 'filing the certified contract rider with Oversight');
      G.flags.stage2_faction_collegium = true;
      G.flags.stage2_faction_contact_made = true;
      G.investigationProgress = (G.investigationProgress||0) + 2;
      G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
      var tension = '';
      if (G.flags && G.flags.stage2_faction_shadowhands) {
        tension = ' Peregrin pauses before sealing the intake envelope. "Your coat carries the dust from a Roazian hand-press. I know the grain. Be aware the Collegium reads who a filer keeps company with before it reads what they file." He seals the envelope anyway.';
      }
      G.lastResult = 'Peregrin takes the certified copy without turning it over. He reads only the intake stamp. "Good. The rider was renewed through an administrative back-channel the Collegium has been unable to subpoena — every formal request for the source authority has been met with a missing signatory line and a date gap we cannot reconcile. Your filing creates standing. With standing, the Collegium can compel the renewal office to produce the authorizing name." He writes a single clerk code on the back of your carbon and slides it across. "When you see that code on a Guildheart notice, the compel has landed. Do not be in the building that day."' + tension;
      addJournal('Oversight Collegium intel: contract rider renewed via administrative back-channel — missing signatory line and unreconciled date gap in every prior subpoena', 'evidence', `guild-collegium-payoff-${G.dayCount}`);
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The overnight courier dispatch wall has a route that never posts return times.",
    tags: ['stage2', 'guildheart_hub'],
    xpReward: 38,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(38, 'examining courier dispatch wall for missing return logs');
      var roll = rollD20('vigor', G.skills.vigor);
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
      var roll = rollD20('wits', G.skills.wits);
      if (roll.total >= 14) {
        G.flags.guild_waypoint_symbol_decoded = true;
        G.investigationProgress++;
        addNarration('Off-Key Mark', 'The transit ledger\'s marginalia key covers the standard route symbols — triangles for rest stops, circles for toll stations, squares for bonded depots. One waypoint carries a mark that is not in the key: two parallel bars crossed by a diagonal, drawn in ink rather than pencil. The mark appears at the same waypoint across thirty-one separate entries, always on charter-exempt routes, never on standard freight. A retired hauler at the next bench recognizes it — Shelkopolis coaster shorthand for a private hand-off point, used when cargo changes custody without a guild registration. The mark does not appear in any Union training material. Someone who learned it elsewhere taught it here.');
        addJournal('Transit ledger: off-key waypoint symbol is Shelkopolis coaster private hand-off mark — 31 entries on charter-exempt routes', 'evidence');
        if (!G.suspects) G.suspects = {}; G.suspects['dravn_pell'] = (G.suspects['dravn_pell']||0) + 1;
        maybeStageAdvance();
      } else {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        addNarration('Ledger Control', 'The transit ledger custodian closes the marginalia section and turns the book face-down on the counter. Marginalia is working-reference material, she says — compiled across generations of routing clerks, not for external review. The face-down posture is deliberate; she will not hand a closed ledger back across the counter until the person asking has walked out of the hall. A junior clerk at the next desk is making a careful copy of the cover description onto a slip of paper. It will go upstairs with the afternoon\'s routing reports. The ledger stays face-down.');
      }
    }
  },

  // ── COLLEGIUM FACTION THREAD — Cadlen / amendment registry / sealed manifest ──

  {
    label: 'The factor saw the same pattern weeks before I did',
    tags: ['NPC', 'Intelligence'],
    xpReward: 20,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      if (!G.flags) G.flags = {};
      G.flags.met_guildheart_factor_cadlen = true;
      G.flags.stage2_faction_contact_made = true;
      gainXp(20, 'collegium thread contact');
      G.lastResult = 'The factor\'s name is Cadlen. He has been with the transit desk eleven years. He pulls the same manifest you flagged — without being asked — and sets it on the edge of the desk facing you. "The authorization stamp is wrong. Third column." He says it the way someone says a thing they have been waiting to say to someone who would understand it. He does not say anything else.';
      addJournal('A Guildheart factor named Cadlen pointed to a mismatched authorization stamp on a transit manifest — unprompted. He\'s been noting it for weeks. Source: Guildheart Hub factor office, Cadlen.', 'intelligence');
      G.recentOutcomeType = 'success';
      G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
      maybeStageAdvance();
    }
  },

  {
    label: 'The amendment registry carries stamps from two different offices',
    tags: ['Records', 'Evidence'],
    xpReward: 20,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(20, 'amendment registry anomaly');
      G.lastResult = 'The amendment log goes back four seasons. Through season three, one stamp: the local guild factor\'s mark, green ink, consistent. In season two, a second stamp appears alongside it — smaller, red, Collegium administrative font. In season one, only the red stamp. The local mark did not exist yet. Someone added the local authorization retroactively. Two column dates do not match the binding dates on the same entries.';
      addJournal('The Guildheart Hub amendment registry shows two overlapping authorization stamps with mismatched dates — Collegium administrative and local guild marks applied out of sequence. Source: Guildheart Hub registry annex.', 'evidence');
      G.recentOutcomeType = 'success';
      G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
      maybeStageAdvance();
    }
  },

  {
    label: 'The freight manifest for that route is sealed at the bottom',
    tags: ['Records', 'Intelligence'],
    xpReward: 15,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(15, 'sealed manifest section');
      G.lastResult = 'Three seasons of freight manifests for the northern corridor. The bottom third of the last page is sealed with red administrative wax — not the guild\'s amber, the Collegium\'s red. The seal is intact. The clerk does not offer to break it. She does not acknowledge it. She sets the rest of the manifest in front of you and waits while you read the unsealed portion, which tells you nothing.';
      addJournal('A freight manifest at Guildheart Hub is sealed in the lower third with Collegium-red administrative wax. The clerk made no mention of it. Source: Guildheart Hub loading records desk.', 'intelligence');
      G.recentOutcomeType = 'success';
      maybeStageAdvance();
    }
  },

  // === COLLEGIUM INVESTIGATION PATH — Chain Link 1 ===
  // Persuasion-based route; parallels arcane faction arc for warriors/rogues
  {
    label: "The routing clerk filed the same deviation note seven times. No response ever came.",
    tags: ['Collegium', 'Stage2', 'NPC', 'Persuasion'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      if (!G.flags) G.flags = {};
      gainXp(70, 'establishing Collegium contact at Guildheart Hub');
      var result = rollD20('charm', (G.skills.charm||0) + Math.floor(G.level/2));
      if (result.total >= 13) {
        G.flags.collegium_contact_1 = true;
        G.investigationProgress = (G.investigationProgress||0) + 1;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The clerk\'s name is Fenwick. He has filed the deviation note seven times — once a fortnight, beginning the season the transit exemptions changed. Each note went to the Collegium intake desk downstairs. None received a response or acknowledgment stamp. He pulls the carbon copies from a folder he keeps in his own drawer, not the official file. He sets them on the desk and smooths the edges with the heel of his hand. "Someone should see these," he says. "That is all I am saying."';
        addJournal('Guildheart routing clerk Fenwick has filed seven unanswered Collegium deviation notes on transit exemptions. He keeps the carbon copies himself. Source: Guildheart Hub routing desk.', 'evidence');
        G.recentOutcomeType = 'success';
        maybeStageAdvance();
      } else {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'Fenwick checks the doorway twice before answering, and the second check decides him. He closes the folder and returns it to his drawer. "The intake process is working as designed," he says, which is not an answer to anything you asked. The deviation notes stay in the drawer. The exemption pattern stays in the manifest record, unaddressed. The routing desk around him continues without pause — chalk on board, paper across the counter, the dry creak of a stool shifting weight. Whatever Fenwick has decided, he made it before this conversation started.';
        G.recentOutcomeType = 'blocked';
      }
    }
  },

  // ── NEW SP2 CHOICES — direct stageProgress increment ──

  {
    label: "Marchant's inquiry about the charter exemption was marked received. Never answered.",
    tags: ['Stage2', 'Records', 'Evidence'],
    xpReward: 20,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(20, 'Guildmaster Marchant unanswered inquiry');
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var roll = rollD20('charm', G.skills.charm);
      if (roll.total >= 13) {
        G.flags.guild_marchant_inquiry_found = true;
        G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        G.lastResult = 'The Guild Council correspondence archive keeps outbound inquiries in a bound register by session date. Guildmaster Selene Marchant filed a formal charter exemption inquiry four months ago — the entry is in her hand, sealed with her council mark, addressed to the charter desk for response within ten working days. The response copy that should be filed behind it is absent. The acknowledgment stamp on the original shows it was received. It was never answered. A formal inquiry from the Guildmaster of the Guild Council sat unaddressed for four months, and the charter desk that received it processed two new exemption renewals in the same period.';
        addJournal('Guildmaster Marchant\'s formal charter exemption inquiry: received 4 months ago, never answered — charter desk processed 2 renewals during same window without responding', 'evidence');
        G.recentOutcomeType = 'success';
        maybeStageAdvance();
      } else {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
        G.lastResult = 'The correspondence archive is open for member review, but the register for Guildmaster correspondence is kept at the council secretary\'s desk rather than the general archive — a procedural distinction that requires a signed authorization from the council secretary before the register is produced. The secretary\'s office is closed for the afternoon session. The inquiry goes into a callback list. The callback list is reviewed by the charter desk clerk on Monday mornings.';
        addJournal('Guildmaster correspondence archive access blocked — council secretary authorization required; callback list reviewed by charter desk', 'complication');
        G.recentOutcomeType = 'complication';
        maybeStageAdvance();
      }
    }
  },

  {
    label: "The trade record for that charter category runs double the registered capacity for six months.",
    tags: ['Stage2', 'Records', 'Evidence'],
    xpReward: 20,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(20, 'charter category capacity overage');
      if (!G.flags) G.flags = {};
      var roll = rollD20('spirit', G.skills.craft);
      if (roll.total >= 13) {
        G.flags.guild_charter_capacity_overage = true;
        G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        G.lastResult = 'The charter category\'s registered capacity is a number set at the time of original exemption filing — a figure that caps the total volume of goods that can move under the exemption annually without triggering a mandatory review. The trade record for the past six months runs at double that figure. The mandatory review threshold was crossed in month three. The charter desk\'s own compliance calendar has a flagged entry for it: REVIEW REQUIRED — CAPACITY OVERAGE. The flag was marked DEFERRED with no date. DEFERRED has no defined status in the charter desk procedural manual. It is not a recognized disposition code.';
        addJournal('Charter category running at 2x registered capacity for 6 months — mandatory review flagged then marked DEFERRED with no date; DEFERRED is not a valid disposition code', 'evidence');
        G.recentOutcomeType = 'success';
        maybeStageAdvance();
      } else {
        G.lastResult = 'The trade record volume for the charter category is accessible at the public tariff summary board — a monthly poster pinned near the registry entrance. The figures confirm the category is active and large. Whether the volume exceeds a registered capacity ceiling requires access to the original exemption filing to find the ceiling figure, and the filing is in the subsidiary archive where access requires a pre-submitted research credential.';
        addJournal('Charter category trade volume confirmed large at public tariff board — capacity ceiling comparison requires original exemption filing access', 'intelligence');
        G.recentOutcomeType = 'complication';
        maybeStageAdvance();
      }
    }
  },

  {
    label: "The Guild Council meeting minutes from the exemption week have a page removed.",
    tags: ['Stage2', 'Records', 'Evidence'],
    xpReward: 20,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(20, 'Guild Council minutes missing page');
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var roll = rollD20('wits', G.skills.wits);
      if (roll.total >= 12) {
        G.flags.guild_council_minutes_gap = true;
        G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
        G.lastResult = 'Guild Council meeting minutes are bound quarterly and shelved in the public record wing — open access, no research credential required. The bound volume for the relevant quarter has a visible stitch gap between pages 34 and 37: two pages removed after binding, leaving a clean cut at the thread line. Pages 35 and 36 would cover the session date when the charter exemption was initially approved. The table of contents entry for that session reads: "Charter Exemption Review — Agenda Item 4 (see attached)." The attached document is absent. The table of contents was printed before the pages were removed.';
        addJournal('Guild Council minutes: pages 35-36 removed after binding — covers charter exemption approval session; table of contents references attached document now absent', 'evidence');
        G.recentOutcomeType = 'success';
        maybeStageAdvance();
      } else {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
        G.lastResult = 'The minutes volume is in the public record wing. You find the correct quarter and begin reading. A council record clerk stops at the shelf before the relevant pages are reached — she is shelving a return, she says, and takes the volume from you before you can decline. She shelves it spine-in rather than spine-out, which is not how the other volumes are oriented. The record wing closes for the day in twenty minutes.';
        addJournal('Guild Council minutes access interrupted — record clerk reversed spine orientation when re-shelving', 'complication');
        G.recentOutcomeType = 'complication';
        maybeStageAdvance();
      }
    }
  },

  // ── NEW SP2-ADVANCING CHOICES ────────────────────────────────────────

  {
    label: "Porter Ledgermere's Counting House ledger carries two columns that never reconcile.",
    tags: ['Stage2', 'NPC', 'Craft'],
    tag: 'risky',
    failResult: "Porter Ledgermere sets his ink-brush on the stand and squares the ledger closed before the question reaches its second clause. Account reconciliation is an internal audit matter — walk-up inquiries are not part of the Counting House public desk's remit. He does not raise his voice. The ledger goes into a locked cabinet below the counter and a fresh sheet of blank paper appears in its place, end of discussion.",
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'cross-referencing Neutral Counting House dual-column anomaly with Porter Ledgermere');
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('spirit', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_porter_ledgermere = true;
        G.investigationProgress = (G.investigationProgress||0) + 1;
        G.stageProgress[2]++;
        G.lastResult = 'Porter Ledgermere keeps the ledger open on his side of the counter — the behavior of a man letting something be seen rather than found. Fourteen months unreconciled. The gap increases by the same fixed sum each month, routed to a holding account registered under a Union subsidiary mark he does not recognize. He turns the ledger so the holding account line is legible. "I filed a discrepancy notice in month three. Response: standing instrument, no review required. Charter desk." He taps the line once. He has been waiting for someone to ask.';
        addJournal('Counting House dual-column gap: fixed monthly sum routed to unrecognized Union subsidiary mark — charter desk certified no review required', 'evidence', 'guild-porter-' + G.dayCount);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        addHeat('union', 1);
        G.lastResult = 'Porter Ledgermere is at the counter when the approach begins and behind a closed door before it ends. A junior clerk takes over the desk and produces a standard reconciliation inquiry form — seven-day processing window, institutional affiliation required. The form asks for the specific account series in question, which requires knowing the account number before the inquiry is filed. The Counting House door does not reopen for the rest of the morning.';
        addJournal('Counting House access blocked — inquiry form requires account number as prerequisite; Porter Ledgermere withdrew', 'complication', 'guild-porter-fail-' + G.dayCount);
      } else {
        G.flags.met_porter_ledgermere = true;
        G.investigationProgress = (G.investigationProgress||0) + 1;
        G.stageProgress[2]++;
        G.lastResult = 'Porter Ledgermere does not pretend the two columns agree. "Fourteen months of monthly shortfall, same amount each time." He opens the ledger to the holding account entry without being asked. The account carries a Union subsidiary mark rather than a named registrant. "Charter desk told me it was a standing instrument. I filed the discrepancy notice. They closed it." He sets his ink-brush on the stand. "I kept the carbon of the discrepancy notice. Charter desk\'s response is stapled to the back."';
        addJournal('Counting House ledger: 14-month fixed monthly shortfall routed to unnamed Union subsidiary — Porter Ledgermere\'s discrepancy notice closed by charter desk without explanation', 'evidence', 'guild-porter-partial-' + G.dayCount);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Sena Ledgermere mediated the charter dispute that should have voided this exemption.",
    tags: ['Stage2', 'NPC', 'Persuasion'],
    tag: 'bold',
    failResult: "Sena Ledgermere's expression does not change, which is the mediator's version of closing a door. Arbitration records carry formal confidentiality under Union procedural code — the outcome is public, the deliberations are sealed. She can confirm the matter was mediated and resolved. She cannot confirm anything about the deliberation that led to the resolution. She offers a printed copy of the public outcome notice and nothing further.",
    xpReward: 75,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(75, 'pressing Sena Ledgermere at Arbitration Hall on the charter exemption dispute outcome');
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('charm', (G.skills.charm||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_sena_ledgermere = true;
        G.investigationProgress = (G.investigationProgress||0) + 1;
        G.stageProgress[2]++;
        G.lastResult = 'Sena Ledgermere mediates disputes, which means she listens before she speaks and speaks only what she has decided to say. She leads the way to a side corridor off the Arbitration Hall before answering. The charter dispute was brought by a cross-polity freight broker challenging the exemption\'s scope — legitimate standing, well-argued. She mediated toward a finding that should have restricted the exemption to diplomatic materials only. The final disposition that went into the record does not match her recommendation. "A mediator\'s finding is advisory. The charter desk accepted a modified outcome." She straightens one cuff. "The modification was already written before the hearing closed. I don\'t know by whom."';
        addJournal('Sena Ledgermere: charter dispute mediation recommendation overridden — modified outcome pre-written before hearing closed, source unknown', 'evidence', 'guild-sena-' + G.dayCount);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        addHeat('union', 1);
        G.lastResult = 'Sena Ledgermere meets directness with procedural precision — she cites three separate provisions of Union arbitration confidentiality before the question is finished. A formal transcript request requires a joint application from both original dispute parties. Neither party has filed one. She writes the application reference number on a slip and sets it on the edge of the table. "If both parties agree to release, the record opens. Until then I am not the path."';
        addJournal('Arbitration Hall: charter dispute transcript sealed pending joint application — Sena Ledgermere cited three confidentiality provisions', 'complication', 'guild-sena-fail-' + G.dayCount);
      } else {
        G.flags.met_sena_ledgermere = true;
        G.investigationProgress = (G.investigationProgress||0) + 1;
        G.stageProgress[2]++;
        G.lastResult = 'Sena Ledgermere considers the question for longer than the mediator\'s usual cadence. "The dispute outcome is public record." She pauses. "My recommendation and the outcome are not the same document." She does not say more than that, but she does not leave. "Mediators are advisory. The charter desk takes the recommendation under consideration. In this case they considered it briefly." Her hands fold on the table in the way of someone who has finished saying what she can say.';
        addJournal('Arbitration Hall: Sena Ledgermere confirms her charter dispute recommendation diverged from the recorded outcome — charter desk overruled her', 'intelligence', 'guild-sena-partial-' + G.dayCount);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Hearthmark at the Freight Exchange has a manifest he won't queue.",
    tags: ['Stage2', 'NPC', 'Lore'],
    tag: 'risky',
    failResult: "Orin Hearthmark clears the manifest from the counter and stacks it under his arm before the sentence ends. Freight Exchange floor inquiries are for buyers and registered shippers only — he checks credentials before discussing any manifest. He does not ask for credentials; he simply stops talking and resumes marking his copy board, which is a more complete answer than any refusal would be.",
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'pressing Orin Hearthmark at the Freight Exchange over an unqueued manifest');
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('lore', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_orin_hearthmark = true;
        G.investigationProgress = (G.investigationProgress||0) + 1;
        G.stageProgress[2]++;
        G.lastResult = 'Orin Hearthmark is a Freight Exchange floor broker — he moves cargo inquiries through the queue system, matching buyers to available lots. The manifest he is not posting is heavier paper than standard lot sheets, printed in a font block used by Shelkopolis freight houses rather than Union-standard. He sets it on the edge of the counter, not in the queue tray. "Charter-exempt lots don\'t run through the queue. They\'re pre-matched." He keeps his hand flat on the copy board while he talks. "This lot has been pre-matched three times in four months. Different buyer name each time, same collection point." The collection point is the northeast waypoint. "Pre-matched lots don\'t generate floor records. I keep my own."';
        addJournal('Freight Exchange: Hearthmark holds Shelk-format charter-exempt manifest off queue — same northeast waypoint, three different buyer names in four months, no floor record generated', 'evidence', 'guild-orin-' + G.dayCount);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        addHeat('union', 1);
        G.lastResult = 'Orin Hearthmark logs the inquiry — floor brokers are required to record all approach records on the Exchange ledger, buyer, seller, or unaffiliated. He writes down the time and a physical description before saying a word. The approach log goes to the Exchange supervisor at end of session. He folds the manifest under his arm and moves to the far end of the floor without another glance back. He has been here long enough to know which conversations to make visible.';
        addJournal('Freight Exchange approach logged by Hearthmark before any question answered — Exchange supervisor receives approach record at session end', 'complication', 'guild-orin-fail-' + G.dayCount);
      } else {
        G.flags.met_orin_hearthmark = true;
        G.investigationProgress = (G.investigationProgress||0) + 1;
        G.stageProgress[2]++;
        G.lastResult = 'Orin Hearthmark confirms the manifest is not in the queue. "Charter-exempt. Pre-matched, doesn\'t run through floor routing." He holds the manifest against the copy board rather than setting it down. The printed font is Shelk-style, not Union-standard — visible from two feet away. "Buyer changes each run. Lot doesn\'t." He marks his board. "Exchange doesn\'t record pre-matched lots in the floor register. That\'s in the charter protocol." He says it the way a man cites a rule he didn\'t write and doesn\'t agree with.';
        addJournal('Freight Exchange pre-matched charter-exempt lot: Shelk-format manifest, rotating buyer names, no floor register entry — Hearthmark keeps personal record', 'intelligence', 'guild-orin-partial-' + G.dayCount);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Renn Tinmarch posted a retraction notice on the Union board. No original posting preceded it.",
    tags: ['Stage2', 'NPC', 'Stealth'],
    tag: 'safe',
    failResult: "The Union Notice Board clerk on duty does not locate a Tinmarch posting under that reference number in the current cycle's registry. The retraction slip is on the board, correctly formatted, stamp intact. The board clerk shrugs once: notices can be posted and pulled in the same session without the original entering the permanent log. The retraction exists. The original it was meant to erase does not.",
    xpReward: 65,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(65, 'tracing Renn Tinmarch retraction notice on the Union Notice Board');
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('stealth', (G.skills.finesse||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_renn_tinmarch = true;
        G.investigationProgress = (G.investigationProgress||0) + 1;
        G.stageProgress[2]++;
        G.lastResult = 'The retraction slip carries Renn Tinmarch\'s name and a posting reference number. Six weeks of board logs show no original posting under that number — and the sequence sits two digits ahead of the current cycle\'s highest issued number, generated outside normal board process. Tinmarch is at the Exchange annex, a compact man who checks door frames before passing through them. "I was told a notice was posted in my name. I was told to retract it or face a procedural action." He was never shown the original. He has the instruction in writing and produces it without being asked.';
        addJournal('Notice Board retraction from Tinmarch references non-existent posting — reference number outside normal sequence; Tinmarch holds written instruction from unknown party directing him to retract', 'evidence', 'guild-renn-' + G.dayCount);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        addHeat('union', 1);
        G.lastResult = 'The board is read. The retraction slip is there, Tinmarch\'s name clear on it. A board monitor — one of four who rotate through the notice hall — is already beside you before the second reading is finished. He asks for the inquiry purpose and writes it down. Notice board monitoring is routine during active registration cycles, he says. The slip stays on the board. The inquiry goes into the monitor\'s daily log, which is filed with the Hub\'s registration desk at close of session.';
        addJournal('Notice Board inquiry logged by board monitor — daily log filed with Hub registration desk', 'complication', 'guild-renn-fail-' + G.dayCount);
      } else {
        G.flags.met_renn_tinmarch = true;
        G.investigationProgress = (G.investigationProgress||0) + 1;
        G.stageProgress[2]++;
        G.lastResult = 'The retraction slip is real and correctly formatted. The original posting it references is not in the board log. Tinmarch is located at the Exchange annex and confirms the sequence: he was told a notice had been posted using his registration mark and was directed to file a retraction immediately to prevent a procedural challenge to his status. "I filed it the same morning." He keeps the instruction slip in his coat. "Someone posted a notice in my name. I don\'t know what was on it. I never saw it. By the time I got to the board it had already been pulled."';
        addJournal('Notice Board: notice posted under Tinmarch\'s mark then pulled before he arrived — retraction filed on external instruction, original content unknown', 'intelligence', 'guild-renn-partial-' + G.dayCount);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Three different notary stamps, identical signatures — too consistent to be authentic",
    tags: ['Stage2', 'Investigation'],
    skill: 'spirit',
    xpReward: 82,
    fn: function() {
      var result = rollD20('spirit', {dc: 13, locality: 'guildheart_hub', label: 'Document forgery analysis'});
      if (result.isCrit) {
        G.stageProgress[2]++;
        addJournal('Three Collegium notary stamps share identical ink dispersion patterns — physically impossible if authentic. The ledgers were batch-stamped by one hand.', 'evidence');
        G.lastResult = 'Your analysis of the stamp impressions is conclusive: identical ink dispersion radius across all three, the same micro-fracture in the left serif of the authentication mark — a physical defect in the die that cannot be replicated by two different tools. One forger made three notary identities using a single die set. The Collegium believes it has three independent notaries validating these ledgers. It has one person with three stamps.';
      } else if (result.isFumble) {
        addHeat('union', 1);
        G.lastResult = 'A librarian notices you holding documents up to the high window for light — it is not a standard reading posture and she reads it correctly. You replace the documents in the correct order and take your seat with practiced calm. She does not approach, but she positions herself with a clear view of the section. Your access to these shelves is now monitored for the remainder of your time in the building.';
      } else if (result.isSuccess) {
        G.stageProgress[2]++;
        G.lastResult = 'The stamps are too consistent — authentic notary work carries micro-variation in pressure and angle that accumulates over years of individual physical habit. These marks share the same depth, the same cant, the same entry angle on every descending stroke. These were made by one person mimicking multiple identities, applying the same physical technique each time regardless of which stamp was in hand.';
      } else {
        G.lastResult = 'You spot anomalies in the impression depth and ink dispersion — the stamps are more consistent than authentic notary work should allow — but you lack the physical reference materials to confirm forgery without lab access. The evidence is there at a level you can read. Converting it into something that holds against a Collegium record requires instruments you do not have in this room.';
      }
    }
  },
  {
    label: "The archivist's deflection is rehearsed. Authority might break the script.",
    tags: ['Stage2', 'Confrontation'],
    skill: 'might',
    xpReward: 75,
    fn: function() {
      var result = rollD20('might', {dc: 14, locality: 'guildheart_hub', label: 'Archivist confrontation'});
      if (result.isCrit) {
        G.stageProgress[2]++;
        addJournal('Archivist confirmed the ledger gap was flagged internally but suppressed by directive from the head registrar.', 'evidence');
        G.flags.guildheart_archivist_broken = true;
        G.lastResult = 'You hold his gaze and let the silence work. The deflection collapses after twelve seconds — he looks at the desk, then back, and the scripted version is gone. He tells you in a flat voice: the ledger gap was internally flagged by a junior archivist two years ago. The head registrar reviewed the flag and ordered it buried. There was no formal rejection — the complaint simply stopped moving. He has the original complaint letter. He kept it because he did not know what else to do with it.';
      } else if (result.isFumble) {
        addHeat('shelk', 1);
        G.lastResult = 'He calls for a floor supervisor without raising his voice — a calm, practiced response that suggests he has been trained for exactly this kind of confrontation. You withdraw before the scene escalates into something that generates formal documentation. Your presence in this section of the building will be noted regardless; the question is whether the note reads as "visitor" or "incident subject."';
      } else if (result.isSuccess) {
        G.stageProgress[2]++;
        G.lastResult = 'The pressure is sufficient to move him past the rehearsed deflection, though not far enough to break the caution entirely. He gives you a date range — three weeks where ledger entries were systematically amended across multiple categories. He is careful about the word he uses: amended. Not missing entries, not gaps in the record. Replaced. The original text was overwritten with corrected versions and the revision history was not preserved, which is a procedural violation but not one anyone formally complained about.';
      } else {
        G.lastResult = 'He holds firm — the script does not collapse, the eye contact does not break, and whatever fear he has of you in this moment is measurably less than whatever keeps him quiet. He has run the comparison before and arrived at the same answer. You are not the most dangerous thing currently in his professional life. You withdraw without having moved him.';
      }
    }
  },
  {
    label: "The senior registrar is exhausted. Someone willing to listen might reach what she knows.",
    tags: ['Stage2', 'Social'],
    skill: 'charm',
    xpReward: 72,
    fn: function() {
      var result = rollD20('charm', {dc: 12, locality: 'guildheart_hub', label: 'Registrar rapport'});
      if (result.isCrit) {
        G.stageProgress[2]++;
        addJournal('Senior registrar confirmed: the backlog is manufactured. Requests are accepted and filed as processing indefinitely to prevent anyone from timing the suppression window.', 'evidence');
        G.lastResult = 'She appreciates the question — no one has, she says, in a tone that suggests she had stopped expecting anyone to. Over the next hour, in a back room with the door closed and a cup of cooling tea between you, she explains exactly how the backlog works. It is not a failure of staffing or procedure. It is calibrated delay: requests accepted, logged as processing indefinitely, never formally denied. Investigators cannot time the suppression window because the clock never officially stops. She has been watching it operate for three years.';
      } else if (result.isFumble) {
        G.lastResult = 'Your approach reads as flattery and she withdraws with a politeness that has been refined through repeated use — she has seen too many people try this particular angle, and she knows exactly when sympathy is a tool rather than a genuine gesture. The warmth goes out of the conversation without ceremony. You have used this approach with her; it is closed now. She will not be readable through it again.';
      } else if (result.isSuccess) {
        G.stageProgress[2]++;
        G.lastResult = 'She vents, which is useful. The backlog is not the result of volume or understaffing — she is clear about that, the way someone is clear about something they have argued to people who did not listen. Someone sets the priority queue, and certain categories of request are assigned to a tier that never reaches the top of the processing stack. The queue is technically correct. The prioritization is the mechanism.';
      } else {
        G.lastResult = 'She is too guarded for sympathy alone to reach anything of use — her professional manner holds, the exhaustion is visible but contained, and the gap between what she carries and what she will share with a stranger does not close. She is not hostile; she is careful. Sympathy is not a sufficient currency here. Something more specific — a name, a document, a shared reference — might change that calculation. It is not available today.';
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
window.GUILDHEART_STAGE2_ENRICHED_CHOICES = GUILDHEART_HUB_STAGE2_ENRICHED_CHOICES;
