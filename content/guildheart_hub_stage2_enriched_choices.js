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
    label: "The provisional registration for the mystery broker renews monthly — the clerks processing it don't read the attached rider.",
    tags: ['Stage2', 'NPC'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'tracing monthly provisional registration renewal at Guildheart Hub');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
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
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The Shelk notary cipher on the renewal rider should match an active notarial seal — it doesn't.",
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
        G.lastResult = `Cross-polity seal verification requires a formal authentication request routed through the Shelkopolis Consular Bureau at Guildheart Hub. The request window is open Tuesday and Thursday mornings. The duty clerk takes the inquiry and logs the date and time. The Consular Bureau log is shared with the Shelk Roadwarden coordination desk. Asking this question officially is putting the question where the Roadwarden captain Nyra described can see it.`;
        addJournal('Notary seal verification request logged — Shelk Consular Bureau shares log with Roadwarden coordination desk', 'complication', `guild-notary-fail-${G.dayCount}`);
      } else {
        G.flags.guild_notary_cipher_exposed = true;
        G.investigationProgress++;
        G.lastResult = `The active seal register goes back six years. The cipher on the rider isn't in it. "Pre-reform seals aren't in this register — they're in the legacy index, back cabinet." The legacy index is found after ten minutes of searching. The cipher matches a notary who retired before the reform. The entry is marked INACTIVE in the legacy index. "Pre-reform instruments are still technically operable if the receiving institution never formally closed the acceptance window." She looks at the legacy index entry. "Guildheart Hub never closed it."`;
        addJournal('Shelk notary cipher pre-dates reform — Guildheart Hub acceptance window never formally closed', 'intelligence', `guild-notary-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The northeast waypoint on Luthen's manifest doesn't appear in the Union route registry — it appears in a private Shelk charter annex.",
    tags: ['Stage2', 'NPC'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'locating northeast waypoint in Shelk charter annex');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('finesse', (G.skills.stealth||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.guild_shelk_waypoint_found = true;
        G.investigationProgress++;
        G.lastResult = `The Union route registry has no record of the northeast waypoint. The Shelk charter annex — a supplementary volume shelved behind the standard registry, spine unmarked — has it listed under a Shelk private freight covenant from before consolidation: a designated hand-off point for sealed Shelk government cargo transiting Union territory without inspection rights. The covenant was supposed to lapse at consolidation. The annex page has a pencil notation in the margin: ACTIVE PER RIDER. Someone checked this page recently. The pencil is still sharp.`;
        addJournal('Northeast waypoint in Shelk private freight covenant — pre-consolidation inspection exemption, pencil notation reads ACTIVE PER RIDER', 'evidence', `guild-waypoint-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The supplementary annex volumes are in a restricted reference bay behind the main registry. A senior clerk intercepts the approach before the bay is reached. "Supplementary annexes require a research credential filed twenty-four hours in advance." The credential form is taken from the rack. It asks for institutional affiliation and the specific annex number — which requires knowing which annex to request. The form is asking for the answer to the question being asked. The senior clerk waits.`;
        addJournal('Shelk charter annex access blocked — credential form requires specific annex number as prerequisite', 'complication', `guild-waypoint-fail-${G.dayCount}`);
      } else {
        G.flags.guild_shelk_waypoint_found = true;
        G.investigationProgress++;
        G.lastResult = `The northeast waypoint isn't in the Union registry. A registry clerk suggests the supplementary annex volumes — pre-consolidation instruments that weren't transferred into the main registry. The relevant annex is found on the third attempt. The waypoint is listed under a Shelk private freight covenant, marked as a government-designated hand-off point with an inspection exemption clause. The covenant page carries a margin note in pencil: ACTIVE PER RIDER. The handwriting matches nothing else in the volume.`;
        addJournal('Northeast waypoint: pre-consolidation Shelk government hand-off point with penciled ACTIVE PER RIDER margin note', 'intelligence', `guild-waypoint-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The Guild Arbiter who was supposed to review the tariff exemption at month three is still on staff — he filed the review as complete without doing it.",
    tags: ['Stage2', 'NPC'],
    xpReward: 66,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'confronting Guild Arbiter over fraudulent review completion');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.guild_arbiter_compromised = true;
        G.investigationProgress++;
        G.lastResult = `Arbiter Rellick Dunmore has an office at the end of the corridor that gets no traffic. He's been watching the door from the moment it opened. The review form he filed is produced without being asked — he has it ready, which means he has been waiting for this. The completion stamp is his, dated the same week the exemption hit the audit threshold. He hasn't touched the file since. "I was told the review had been handled through the charter desk and that a completion form was a procedural courtesy." He was told by a name he writes on a slip and doesn't say aloud. He slides the slip across. "I kept a copy."`;
        addJournal('Arbiter Dunmore filed fraudulent review completion — directed by named party, kept copy of instruction', 'evidence', `guild-arbiter-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Arbiter Dunmore closes his office door before the question is two sentences long. Through the glass panel he shakes his head once. Not aggressive — exhausted. The corridor outside his office smells of old paper and nervous sweat. He is not going to help, and whatever he knows has already cost him something. The door stays closed.`;
        addJournal('Arbiter Dunmore refused approach — appears aware and frightened, door closed', 'complication', `guild-arbiter-fail-${G.dayCount}`);
      } else {
        G.flags.guild_arbiter_compromised = true;
        G.investigationProgress++;
        G.lastResult = `Arbiter Dunmore doesn't deny it. "The completion form was filed because someone told me the audit had been resolved through a separate channel. I filed the completion to close the administrative loop." He doesn't look at the review form. "I didn't ask what channel. That was my error." He knows it's worse than an error. He will not name who instructed him without a formal protection filing in place first. "Put that on record for me and I'll answer every question you have."`;
        addJournal('Arbiter Dunmore admits filing false completion on instruction — will cooperate under formal protection filing', 'intelligence', `guild-arbiter-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The Panim memorial import classification is stamped by a Panim cultural attaché who hasn't been stationed at Guildheart Hub in three years.",
    tags: ['Stage2', 'NPC'],
    xpReward: 64,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(64, 'tracing Panim cultural attaché stamp on memorial import classification');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('vigor', (G.skills.survival||0) + Math.floor(G.level/3));
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
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The freight insurance ledger at the Union bonding house shows three charter-exempt loads were never insured — the broker signed a waiver he can't explain.",
    tags: ['Stage2', 'NPC'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'tracing uninsured charter-exempt loads at Union bonding house');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.guild_bonding_waiver_exposed = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Broker Fen Callard runs the bonding desk out of a narrow office with a window that faces the canal lock gates rather than the street. He doesn't wait for the full question. The waiver forms are already on the desk — he pulled them this morning. "The three loads came through with a pre-signed waiver of bonding obligation, authorized under a Union freight council instrument I've never seen before or since." He smooths one corner of the topmost form. "If those loads were lost or seized, nobody was going to pay for them. Not the Hub, not the shipper, not my office. The instrument designated liability to a party whose name on it is a guild mark rather than a person." He taps the mark. It matches the subsidiary notation Sable flagged in the charter exemption files.`;
        addJournal('Bonding house: charter-exempt loads carried pre-signed liability waiver — guild mark matches Sable charter subsidiary notation', 'evidence', `guild-bonding-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Callard's desk faces the door, which means he sees the approach before any word is said. "Bonding records are client-privileged. I don't discuss specific freight accounts without an Arbiter review order." The canal lock outside runs through a full cycle while the silence holds. His hand rests on the closed ledger in a way that has nothing to do with keeping it shut and everything to do with not moving it.`;
        addJournal('Bonding house inquiry refused — client privilege cited, broker visibly on alert', 'complication', `guild-bonding-fail-${G.dayCount}`);
      } else {
        G.flags.guild_bonding_waiver_exposed = true;
        G.investigationProgress++;
        G.lastResult = `Callard confirms the three loads went through without standard insurance bonding. "Pre-signed liability waiver — not my form, not the Hub's form. Something I hadn't seen before." He shows the instrument: a Union freight council authorization, countersigned by a guild mark. "I asked about it at the time. I was told to process and file." He filed. He kept a duplicate in a separate cabinet. "Bonding brokers always keep duplicates. That's what brokers do."`;
        addJournal('Union bonding waiver on charter-exempt loads — unfamiliar instrument form, guild mark counter-signature, broker kept duplicate', 'intelligence', `guild-bonding-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The Guild Watchers duty roster shows a gap in coverage during the three off-hours loading windows — the same shift supervisor signed off on all three.",
    tags: ['Stage2', 'NPC'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'examining Guild Watchers duty roster for coverage gaps');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('finesse', (G.skills.stealth||0) + Math.floor(G.level/3));
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
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The supply register cross-references Ithtananalor as a secondary transit node — but the volume assigned to it exceeds the node's declared capacity by a factor of four.",
    tags: ['Stage2', 'NPC'],
    xpReward: 66,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'cross-referencing Ithtananalor transit node capacity against assigned volume');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
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
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The Union ink-seal press used to authenticate charter documents shows residue from a non-standard compound — it's been used to print something other than official charter marks.",
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
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "A fire report from the archive subroom was reclassified as a routine maintenance incident — the original report described smoke damage to the charter exemption files.",
    tags: ['Stage2', 'NPC'],
    xpReward: 64,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(64, 'locating reclassified archive fire report for the charter exemption subroom');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('vigor', (G.skills.survival||0) + Math.floor(G.level/3));
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
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The dockside labor guild posted a grievance about the off-hours loading crews — it was withdrawn the following week with no resolution recorded.",
    tags: ['Stage2', 'NPC'],
    xpReward: 66,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'tracing withdrawn labor guild grievance about off-hours loading crews');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.guild_labor_grievance_found = true;
        G.investigationProgress++;
        G.lastResult = `The labor guild's grievance record is kept by a shop steward named Morwick Pen who maintains it in a worn canvas-covered book rather than the official registry, because the official registry is reviewed by the Hub charter desk. The grievance described six loading crews that were not guild-registered, working at night on the charter-exempt bays, handling cargo that matched none of the standard categories. Pen filed it. Six days later the grievance was marked withdrawn. Pen did not withdraw it. "Someone signed it with a union grievance waiver code that I've never used." He opens the book to the page. The waiver code is in a different hand. "I looked up that code afterward. It's reserved for inter-guild arbitration settlements. We never had an arbitration. There's no settlement on record." He does not close the book.`;
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
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The formal Sanction Board record lists one witness as present at the charter exemption hearing — the witness says she was never called.",
    tags: ['Stage2', 'NPC'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'locating uncontacted witness named in Sanction Board charter hearing record');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.guild_phantom_witness_found = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Clerk Fenara Sivault is listed in the Sanction Board formal hearing record as a witness to the procedural review that approved the charter exemption — her name, her title, and a notation that she provided testimony confirming the exemption's legal standing. She works on the tariff adjudication floor, one level below Derris Ledgermere. She is direct: she was never called to any hearing. Her name appears on no summons. Her signature appears on no testimony form. The notation in the formal record is fabricated. She has been a named witness to a proceeding that did not happen, which means if the exemption is ever challenged, her name is the procedural anchor. "If this goes to formal review, I am the evidence that it was legitimate." She has known this for three months. She does not know what to do about it.`;
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
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The hub registry has a standing amendment to the charter exemption category that nobody signed — it was filed as a clerical correction, not a policy change.",
    tags: ['Stage2', 'NPC'],
    xpReward: 64,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(64, 'examining unsigned standing amendment in charter exemption category registry');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('finesse', (G.skills.stealth||0) + Math.floor(G.level/3));
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
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
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
