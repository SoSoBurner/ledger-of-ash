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
        G.lastResult = `Cala stops wiping the counter. "My guests' business isn't something I discuss." Her voice is even — this isn't the first time someone has asked. She doesn't tell you to leave. She doesn't need to. By the time you reach the door, she's already speaking to the nearest table. Your own table acquires a different character after that.`;
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

];

window.GUILDHEART_HUB_STAGE2_ENRICHED_CHOICES = GUILDHEART_HUB_STAGE2_ENRICHED_CHOICES;
