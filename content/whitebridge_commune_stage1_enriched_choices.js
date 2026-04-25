/**
 * WHITEBRIDGE COMMUNE STAGE 1 ENRICHED MEANINGFUL CHOICES
 * 20 investigation paths grounded in bridge crossing irregularities and midnight cargo runs
 * Whitebridge: a crossing commune that controls the river passage — now the passage is being used for something hidden
 * Named NPC: Cadrin (the bridge keeper whose records have started showing anomalies)
 */

const WHITEBRIDGE_COMMUNE_STAGE1_ENRICHED_CHOICES = [

  // 1. FIRST ENCOUNTER: CADRIN
  {
    label: "The bridge keeper has been keeping a second log. His count and the official count disagree on the same three nights each month.",
    tags: ['Investigation', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'meeting Cadrin the bridge keeper');
      if (!G.flags) G.flags = {};

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.flags.met_cadrin = true;
        G.lastResult = `Cadrin keeps his log open on the crossing station desk, pen beside it. "Three nights per month my count and the walker's disagree. Same three nights. New moon, every time." He taps the page with one finger — not agitated, just precise. "My numbers don't change after I write them. Someone else's do." He slides the log toward you so you can read the column he's marked.`;
        addJournal('contact', 'Bridge keeper Cadrin met: systematic log discrepancies on predictable nights, willing to show records', `whitebridge-cadrin-${G.dayCount}`);
      } else {
        G.lastResult = `Cadrin is mid-count when you arrive — lips moving, stylus tracking each cart. He raises two fingers without looking up: wait. By the time the queue clears, his shift partner has returned and he won't break his working posture for a stranger. He'll be alone again after the evening handover.`;
        G.flags.located_cadrin = true;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // 2. CLUE: BRIDGE CARGO TRACKING BREAK
  {
    label: "Cadrin's personal log and the commune registry side by side. The new-moon entries don't match.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 74,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'cross-referencing bridge crossing records');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      if (!G.flags) G.flags = {};
      if (G.flags.met_cadrin) {
        G.lastResult = `Cadrin's handwritten columns and the commune's registry sit side by side on the crossing station desk. New-moon nights: Cadrin logs two to four additional crossings each time. The registry shows none of them. Worse — the registry entries around those gaps show ink coverage slightly different from the surrounding pages. The deletions were filed after the original, then smoothed over. You'd miss it reading either document alone.`;
        G.flags.found_bridge_discrepancy = true;
        addJournal('Bridge records: new-moon crossings systematically removed from official registry after filing — alteration professional', 'evidence', `whitebridge-discrepancy-${G.dayCount}`);
      } else {
        G.lastResult = `The commune registry reads clean — neat columns, consistent hand, nothing struck through or corrected. The crossing station smells of river damp and old ink. Without Cadrin's personal log laid alongside it, the deletions leave no trace: the registry has been amended with a care that accounts for exactly this kind of single-document review. The ink coverage on three new-moon entries is slightly heavier than the surrounding pages, but only slightly, the kind of difference that vanishes under anything less than direct comparison. The document answers only the questions it hasn't already erased.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 3. CLUE: CHARTER MARK CONTAINER
  {
    label: "The containers that crossed on the last anomalous night had a charter mark Cadrin didn't recognize.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'identifying charter mark on night cargo');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `Cadrin draws the mark on the back of a tally slip — a horizontal bar, two upward points like the outer tines of a crown, nothing between them. The trade register lists it under a northern transport consortium: freight category "sensitive materials — administrative classification," land transit license only. River crossing requires a waterway permit. Their name does not appear in the Whitebridge permit ledger for the past two years.`;
        if (!G.flags) G.flags = {};
        G.flags.identified_charter_mark = true;
        addJournal('Charter mark identified: northern transport consortium, land-only license, unauthorized river crossing implied', 'evidence', `whitebridge-charter-mark-${G.dayCount}`);
      } else {
        G.lastResult = `Cadrin's sketch is clear enough. The mark doesn't appear in the standard trade registers held at the commune archive — three volumes, none of them current past eighteen months. Wherever this consortium is registered, it's not in the public commercial tier. A specialized transport registry would carry it, but none is held locally.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 4. INVESTIGATION: MIDNIGHT CARGO TIMING
  {
    label: "The midnight cargo runs follow a pattern timed to the watch rotation gap. Someone walked the patrol schedule first.",
    tags: ['Investigation', 'Systems', 'Stage1', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'mapping midnight cargo route');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('survival', (G.skills.survival || 0) + Math.floor(G.level / 3));
      if (result.isCrit) {
        G.lastResult = `Cadrin's timings put the crossings between eleventh and twelfth bell — the last scheduled ferry goes at ninth. Walking the western approach road in morning light, you find wheel ruts branching off the main road three hundred meters short of the bridge. The branch track is packed earth, not mud — used enough to have hardened. It ends at a flat clearing with a low stone lip built for cart loading. No commune map marks it. The clearing was built, not found.`;
        if (!G.flags) G.flags = {};
        G.flags.found_staging_area = true;
        addJournal('Midnight cargo staging area found: unmapped private access track with constructed loading area — significant prior investment', 'discovery', `whitebridge-staging-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The road conditions point west — the wheel ruts are deep and consistent with loaded carts, the clay compressed by weight that regular market traffic doesn't carry. The approach timing threads the commune's watch rotation: the gap between the eastern and western patrol circuits is forty minutes. The ruts suggest an operation timed to exactly that window, using exactly that gap, repeatedly. Whoever laid this route out walked the patrol schedule first and built the transit around it. The knowledge required for that isn't available to a casual traveler.`;
      } else {
        G.lastResult = `The shared approach roads carry enough daily cart traffic that individual crossings dissolve into the pattern. A distinctive rut or a specific turning point would separate these carts from the rest — but without that marker, the approach yields nothing usable. There's movement here; there's no way yet to name it.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 5. ARCHETYPE-GATED: READING THE BRIDGE
  {
    label: "Stand at the bridge at the hour when the anomalous crossings happen — read what the space tells you.",
    tags: ['Investigation', 'Archetype', 'Stage1', 'Meaningful'],
    xpReward: 67,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(67, 'reading the bridge at night');
      const arch = G.archetype && G.archetype.group;

      if (arch === 'combat') {
        G.lastResult = `The east rail has three loading alcoves recessed into the stonework — not original construction. The mortar around them is two shades lighter than the surrounding bridge face, set within the last two years. They're the wrong depth for loading: too shallow for a barrel, correct for a body pressed flat against the stone. Cover points, not cargo niches. Whoever added them had a mason and commune access, or bypassed the need for both.`;
      } else if (arch === 'magic') {
        G.lastResult = `The bridge deck's stress patterns run deeper on the eastern span than normal crossing traffic produces. The load distribution is consistent with carts carrying three to four tonnes rather than the standard commercial weight. Every flagstone in the eastern third carries the memory of heavier crossings than any manifest on record accounts for. The stone doesn't lie about weight.`;
      } else if (arch === 'stealth') {
        G.lastResult = `Three lamp positions on the bridge create blind zones — gaps where the duty walker's sightline breaks behind the rail supports. On a new-moon night, those zones extend a body's length further in each direction. Someone walked this bridge in darkness and marked where an unobserved crossing was possible. The new-moon timing isn't coincidence. It extends every blind zone to its maximum.`;
      } else {
        G.lastResult = `Two bridge workers arrive at the east abutment before their shift begins. One checks something low on the stone face — a crevice, or a mark — then steps back. The second worker does the same, independently, without speaking to the first. Both leave their shift notes untouched. Whatever they're reading in that stone isn't in any log. They check it every morning, the way you check a wound.`;
      }
      addJournal('Bridge at night: modified cover points, anomalous stone stress, mapped blind spots, unofficial worker monitoring', 'evidence', `whitebridge-bridge-read-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 6. INVESTIGATION: WHO ALTERED THE REGISTRY
  {
    label: "The registry access log shows entries from a role title that doesn't exist in the commune's organizational chart.",
    tags: ['Investigation', 'Authority', 'Stage1', 'Meaningful'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'tracing registry access on alteration days');

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 13) {
        G.lastResult = `The commune archive keeps its own access log — a secondary record of who touches the registry and when. On each of the three new-moon nights, a single access entry appears: "district coordination deputy." The commune's organizational chart lists no such position. The access codes are valid, formatted correctly, and were issued through proper channels. Someone built a credential for a role that was never formally created, and has been using it monthly ever since.`;
        if (!G.flags) G.flags = {};
        G.flags.found_ghost_registry_account = true;
        addJournal('Registry alteration: ghost account "district coordination deputy" — valid credentials, nonexistent role title', 'evidence', `whitebridge-ghost-account-${G.dayCount}`);
      } else {
        G.lastResult = `The access log entries are encoded — account identifiers run through the commune's administrative cipher before storage. You can read the timestamps, the document touched, the duration. The name behind the credential is a string of characters that requires the commune's administrative key to resolve. Access happened. Who performed it stays locked.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 7. FACTION SEED: IRON COMPACT CROSSING AUTHORITY
  {
    label: "The Iron Compact handles transit compliance. A land-only license used on a river crossing is a clear violation.",
    tags: ['Faction', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'making Iron Compact contact');
      if (!G.factionHostility) G.factionHostility = { warden_order: 0, iron_compact: 0, oversight_collegium: 0 };

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `Delt Karnn has a desk at the back of the trade office stacked with transit compliance filings, each one tabbed in a different color. He reads the charter mark sketch without touching it. "Land-only license, river crossing — that's a clear violation." He sets the sketch down and leans back. "I can open a transit compliance file on that alone. What's in the containers is a different matter and a different desk." He wants the transport evidence first. He isn't asking about the cargo yet.`;
        if (!G.flags) G.flags = {};
        G.flags.met_iron_compact_whitebridge = true;
        G.factionHostility.iron_compact += 1;
        addJournal('faction', 'Iron Compact rep Delt Karnn: unauthorized river transit violation actionable, wants transport evidence before pursuing cargo', `whitebridge-iron-${G.dayCount}`);
      } else {
        G.lastResult = `The trade office counter has a queue — three factors ahead of you, each with a folder. The clerk behind it takes your summary request and slides a form across without making eye contact. Transit compliance inquiries require a written statement with documentation attached before the duty representative will schedule a conversation. The form has seven sections. None of them are short.`;
        if (!G.flags) G.flags = {};
        G.flags.located_iron_compact_whitebridge = true;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 8. SOCIAL: THE DUTY WALKER
  {
    label: "The duty walker's tally comes out higher than Cadrin's on the same nights. He reported it twice. They told him he miscounted.",
    tags: ['Social', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 65,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(65, 'interviewing duty walker');

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 10) {
        G.lastResult = `Terris keeps his tally counter on his belt — a worn brass clicker, four years of use on the thumb lever. "My method doesn't change. Click for every crossing, total at end of shift, same as always." He clicks it once, absently. "New-moon nights my total comes out higher than Cadrin's. I reported it twice. Both times they said I'd miscounted." He doesn't say he believes them. He doesn't say he doesn't.`;
        if (!G.flags) G.flags = {};
        G.flags.met_terris_walker = true;
        addJournal('contact', 'Duty walker Terris: confirmed count discrepancy, twice told he miscounted — discrepancy normalized through administrative dismissal', `whitebridge-terris-${G.dayCount}`);
      } else {
        G.lastResult = `Terris is on the bridge approach with his clicker, marking a grain convoy through. He holds up a hand — not dismissive, just occupied. His count can't pause mid-convoy without losing the tally. He'll be free at the evening handover, when the next walker takes the post.`;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // 9. MORAL PRESSURE: CADRIN'S POSITION
  {
    label: "Cadrin asks if you're going to make this official — he needs to know before he shares everything he has.",
    tags: ['Moral', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 65,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(65, 'Cadrin evidence decision');
      if (!G.flags) G.flags = {};

        G.lastResult = `Cadrin closes the log and sets both hands flat on the cover. "Six months I've been writing this down and not saying a word upward." He looks at the bridge through the station window. "If whoever is behind this has reach inside the commune and I file a formal report, my position goes with it. If I don't report and this turns out to be serious, I've been sitting on it for half a year." He turns back. "So I need to know what you're planning to do with what I give you."`;

      G.flags.stage1_evidence_decision = 'pending';
      G.flags.stage1_moral_npc = 'Cadrin';
      addJournal('consequence', 'Cadrin bridge keeper evidence decision — share approach or maintain deniability', `whitebridge-cadrin-decision-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 10. INVESTIGATION: CARGO WEIGHT ANALYSIS
  {
    label: "The eastern span flagstones show compression fractures. The load is heavier than any manifest on record accounts for.",
    tags: ['Investigation', 'Craft', 'Stage1', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'analyzing bridge stone load bearing evidence');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('craft', (G.skills.craft || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `The eastern span's flagstones show compression fractures along their edges — the kind that accumulate under repeated heavy loads, not the gradual wear of mixed traffic. The fracture pattern is consistent: three to five tonnes per crossing, concentrated in two parallel wheel tracks. New-moon nights, same weight, same track spacing, same point of entry from the western approach. Whatever crosses here is the same load, the same cart configuration, repeated on a schedule.`;
        addJournal('Bridge stone stress: 3-5 tonne load per crossing, consistent weight distribution — regular industrial-scale shipment', 'evidence', `whitebridge-load-${G.dayCount}`);
      } else {
        G.lastResult = `The stone carries visible wear on the eastern span — the edge fractures, the compressed mortar at the joints. Heavy loads have crossed here repeatedly. Translating wear pattern to specific weight requires a structural mason's training; without it, the estimates are a range too wide to be useful as evidence. The wear is real. The number attached to it isn't.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 11. ATMOSPHERE: THE COMMUNE AT DAWN
  {
    label: "Watch Whitebridge Commune wake up — observe how the bridge crossing is integrated into daily life.",
    tags: ['WorldColor', 'Lore', 'Stage1', 'Meaningful'],
    xpReward: 50,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(50, 'observing commune morning activity');

        G.lastResult = `Before the seventh bell, the bridge already carries a grain factor arguing with a carter, two children running messages between the banks, a woman repairing a shoe sitting against the east rail. By the time the market vendors set up mid-span, the crossing is too loud to hold a quiet conversation on. Traffic here isn't occasional — it's constant. In that density, two or four additional carts in darkness leave no impression on anyone awake for daylight business. The crossing's volume swallows its own anomalies.`;
      addJournal('Whitebridge: public crossing culture provides natural cover for unauthorized transits — openness weaponized', 'discovery', `whitebridge-dawn-${G.dayCount}`);
      G.recentOutcomeType = 'explore'; maybeStageAdvance();
    }
  },

  // 12. INVESTIGATION: THE COMMUNE ADMINISTRATION'S KNOWLEDGE
  {
    label: "The bridge director filed an inquiry into the new-moon discrepancies. It was closed by the ghost account.",
    tags: ['Investigation', 'Authority', 'Stage1', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'assessing administration awareness');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 13) {
        G.lastResult = `Three months ago, the bridge director filed an internal inquiry: "new-moon crossing irregularities — request for review." The inquiry sits in the administrative archive, stamped: "resolved — within operational parameters." The closing signature belongs to the district coordination deputy. The same ghost account that clears the registry alterations also closed the administration's own inquiry into those alterations. The commune's response mechanism has been turned back on itself.`;
        addJournal('Administration captured: internal inquiry closed by ghost account "district coordination deputy" — administrative response weaponized', 'evidence', `whitebridge-admin-${G.dayCount}`);
      } else {
        G.lastResult = `Every public-facing statement from the commune administration describes crossing operations as routine. Whether anyone inside believes that, or whether there's a decision not to look, isn't visible from the outside. That distinction lives in the internal files — the inquiry logs, the memos, the closed review records — none of which are accessible without administrative authorization.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 13. PERSONAL ARC: SECURE CADRIN'S LOG
  {
    label: "Cadrin's six months of crossing records need to leave Whitebridge before someone decides to take them.",
    tags: ['PersonalArc', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'securing Cadrin\'s log offsite');
      if (!G.flags) G.flags = {};

      const result = rollD20('stealth', (G.skills.stealth || 0) + Math.floor(G.level / 3));
      if (result.total >= 10) {
        G.lastResult = `Cadrin spends two hours copying six months of entries by lamplight — date, bell-time, apparent cargo weight, number of handlers. His handwriting is identical to the original; he's been trained for exact duplication since his first posting. The copy goes into a sealed correspondence pouch addressed to a trade house in Shelkopolis, carried by a traveling advocate who takes commercial post as a side income. The original stays in Cadrin's desk. The copy is already past the bridge before dawn.`;
        G.flags.cadrin_log_secured = true;
        addJournal('consequence', 'Cadrin\'s crossing log secured offsite via traveling advocate — six months of discrepancy evidence preserved', `whitebridge-log-secure-${G.dayCount}`);
      } else {
        G.lastResult = `The commune's mail station handles all regular courier traffic, and the bridge director's office reviews outgoing commercial post as part of the crossing authority's administrative remit. Any courier who works this route knows the station. Getting the log out means finding a carrier moving on personal business — no station stop, no manifest, no review. That person isn't at the bridge today.`;
      }
      G.recentOutcomeType = 'stealth'; maybeStageAdvance();
    }
  },

  // 14. RUMOR LAYER
  {
    label: "The bridge-side inn collects what the crossing moves through. Some of it doesn't dissolve into general complaint.",
    tags: ['Investigation', 'Rumor', 'Stage1', 'Meaningful'],
    xpReward: 60,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(60, 'collecting crossing rumors');

      const rumors = [
        'a northern merchant convoy traveled through Whitebridge without filing standard crossing paperwork last month',
        'the bridge keeper was offered early retirement and turned it down — unusual offer, no explanation given',
        'someone found a piece of machinery in the river north of the bridge that doesn\'t match any registered cargo',
        'bridge access hours were quietly extended for "approved commercial partners" six months ago — nobody knows who qualifies'
      ];
      const selected = rumors[Math.floor(Math.random() * rumors.length)];

      G.lastResult = `A traveler at the bridge-side inn, third cup in, speaks without being asked: "${selected}." He's heading south in the morning and won't say how he knows. The inn near the bridge collects what the crossing moves through. Most of it dissolves into general complaint. Some of it doesn't.`;
      addJournal(`Whitebridge traveler rumor: "${selected}"`, 'evidence', `whitebridge-rumor-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 15. SOCIAL: THE FORMER BRIDGE DIRECTOR
  {
    label: "The former bridge director filed the original inquiry. She lives across the bridge now and won't look at it from her window.",
    tags: ['Social', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 67,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(67, 'interviewing former bridge director');

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.flags.met_ashe_director = true;
        G.lastResult = `Ashe lives on the far side of the crossing now, window facing away from the bridge. She pours water for both of you, then keeps her eyes on the window frame while she talks — not looking out, just not looking at you. You ask about the inquiry she filed. She answers with the crossing schedule: tidal windows, load weight limits, mortar review cycles, warden rotation intervals. The answer is thorough, unhurried, technically accurate, and addresses none of the questions you asked. She speaks at length about bridge maintenance culture. The closures, the new-moon nights, the ghost account that shut her own inquiry — none of it surfaces. She refills your cup when it's still half full. It's the second time she's done it without being asked. The helpfulness is the answer.`;
        addJournal('Former bridge director Ashe: excluded from own jurisdiction by mystery authorization, resigned in protest', 'contact_made', `whitebridge-ashe-${G.dayCount}`);
      } else {
        G.lastResult = `Ashe left Whitebridge two months after handing in her post. A neighboring settlement, across the crossing — close enough that she'd see the bridge lanterns on a clear night if she faced that direction. Nobody at the commune office will say why she left, only that the departure was her choice. She isn't here. Getting to her means crossing the bridge she no longer manages.`;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // 16. INVESTIGATION: WHAT'S BEING TRANSPORTED
  {
    label: "The staging area off the main road. New moon tonight. The watch rotation gap is forty minutes.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 76,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(76, 'observing midnight cargo crossing');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('stealth', (G.skills.stealth || 0) + Math.floor(G.level / 3));
      if (result.isCrit) {
        G.lastResult = `Two carts come down the branch track at eleventh bell. No lanterns — the handlers know the path well enough to work by starlight. The containers are sealed, uniform, the same two-tined mark on each lid. What stops you is how the handlers carry them: deliberate, no rushing, no casual toss or stack. One container shifts slightly on its mount and the handler near it puts a hand out immediately and holds the side until it steadies. Two of them are wearing heavy leather gloves — summer, no rain. Whatever the containers hold, the outside of them is already a hazard worth managing.`;
        if (!G.flags) G.flags = {};
        G.flags.witnessed_midnight_crossing = true;
        addJournal('Midnight crossing witnessed: two carts, sealed uniform containers, handled with care — reactive or fragile content, handlers in protective gloves', 'discovery', `whitebridge-witnessed-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The carts come through at eleventh bell, two of them, moving with a speed that suggests a practiced route. From the cover point you've chosen, the crossing is visible but the detail isn't — the containers are sealed, the handlers are efficient, the whole operation is done and gone in under twenty minutes. The organization is clear. The contents and the handling specifics stay out of range.`;
      } else {
        G.lastResult = `The branch track has a watcher posted in the treeline fifty meters back from the staging area — upwind, motionless, positioned where the approach narrows. You don't spot them until they've already spotted you. There's no confrontation: a low whistle goes down the track, and the night stays quiet. No carts arrive. The crossing is aborted. By morning, the staging area holds only old ruts and the watcher is gone. They know the approach has been observed.`;
        if (!G.worldClocks) G.worldClocks = {};
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 2;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 17. WORLD COLOR: THE BRIDGE AT DAWN
  {
    label: "Watch the bridge through the transition from night to morning — observe how Whitebridge Commune marks the passage of time.",
    tags: ['WorldColor', 'Lore', 'Stage1', 'Meaningful'],
    xpReward: 48,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(48, 'observing bridge dawn transition');

        G.lastResult = `At first light, Cadrin takes a small handbell from the hook beside the station door and rings it once — not loud, not ceremonial. "Twenty-two years," he says, when you ask. "Every morning. Night log closes, morning log opens. What crossed in the dark is written; what crosses today starts clean." He sets the bell back on its hook and opens the new page. Six months of new-moon crossings are in the closed log behind him, written in the same careful columns he uses for everything else. He hasn't skipped a single entry.`;
      addJournal('Cadrin\'s morning bell: night log closed at dawn, six months of preserved midnight crossing records', 'discovery', `whitebridge-dawn-bridge-${G.dayCount}`);
      G.recentOutcomeType = 'explore'; maybeStageAdvance();
    }
  },

  // 18. INVESTIGATION: EXTERNAL AUTHORIZATION SOURCE
  {
    label: "The ghost account credentials trace to a body that isn't in any public registry for this district.",
    tags: ['Investigation', 'Authority', 'Stage1', 'Meaningful'],
    xpReward: 73,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(73, 'tracing ghost account authorization');

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 14) {
        G.lastResult = `The credential chain traces to a body called the Regional Transit Oversight Coordination — a name that doesn't appear in any public registry for this administrative district, but whose credentials are formatted to the correct standard and carry valid authorization codes. Registered address: a northern commercial district, three settlements away. Nobody in Whitebridge's administration has any record of interacting with this body or confirming its authority. The credentials arrived, were accepted by the system because they were correctly formatted, and began operating. A parallel authority structure, inserted through the gap between format and verification.`;
        if (!G.flags) G.flags = {};
        G.flags.found_authorization_source = true;
        addJournal('Ghost account origin: credentials issued by unverified "regional transit oversight body" with northern commercial address', 'discovery', `whitebridge-auth-source-${G.dayCount}`);
      } else {
        G.lastResult = `The credential chain leads to a regional body with a name that doesn't appear in any register available at the commune archive. The authorization codes are valid — that much is clear — but who issued the issuing body its own authority, and where they're formally registered, requires access to institutional records beyond what Whitebridge holds locally.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 19. WORLD COLOR: CADRIN'S RECORD KEEPING
  {
    label: "Cadrin has been keeping a personal log since his first posting. His father did the same for thirty years.",
    tags: ['WorldColor', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 50,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(50, 'understanding Cadrin\'s motivation');

        G.lastResult = `"My father worked the Soreheim crossing for thirty years. Kept his own log the whole time." Cadrin straightens the current log's spine against his palm, a habitual gesture. "He told me: official records get corrected. Personal records don't — they're yours alone. When the two start diverging, the personal one is the one that tells you something's wrong." He doesn't frame it as suspicion or vigilance. He frames it as maintenance. He's been maintaining his father's habit.`;
      addJournal('Cadrin motivation: personal log practice inherited from father — institutional records can be corrected, personal ones remain', 'discovery', `whitebridge-cadrin-why-${G.dayCount}`);
      G.recentOutcomeType = 'explore'; maybeStageAdvance();
    }
  },

  // 20. SHADOW RIVAL INTRO
  {
    label: "Someone was here last week asking Terris specific questions about the crossing. More specific than yours.",
    tags: ['Rival', 'Warning', 'Stage1', 'Meaningful'],
    xpReward: 57,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(57, 'receiving rival warning');
      if (!G.flags) G.flags = {};

      const arch = G.archetype && G.archetype.group;
      if (arch === 'combat') {
        G.lastResult = `"They didn't ask about the cargo," Terris says. "Asked me when the bridge guard rotation happens. Exact times, exact changeover points." He frowns at the rail. "Not what crosses — who's watching when. They're working out whether the crossing is timed around the guards or with them. Whether someone inside is cooperating." He didn't think to refuse at the time. The questions sounded administrative. They asked questions you haven't reached yet.`;
      } else if (arch === 'magic') {
        G.lastResult = `"They described the containers before I mentioned them," Terris says. "Same mark, same sealed lids, same handling posture from the crew — they said 'careful, not fast' before I could." He scratches the back of his neck. "I thought they'd already spoken to Cadrin. They hadn't. They already knew." Verification, not discovery. They came to Terris to confirm what they'd learned elsewhere. They asked questions you haven't reached yet.`;
      } else if (arch === 'stealth') {
        G.lastResult = `"Afterward I went back through the whole conversation," Terris says. "Every question was specific. In the moment it seemed like casual talk — what's a typical night like, do you ever see anything odd, that kind of thing. But the answers they wanted were all there by the end." He looks uncomfortable. "I gave them everything without knowing I was being asked." Thirty minutes of apparent small talk with a precise structure underneath. They asked questions you haven't reached yet.`;
      } else {
        G.lastResult = `"They came to offer help," Terris says. "Said there's a crossing rights body that protects bridge keepers who document transit violations. Gave Cadrin a card. Said his records would be protected if he shared them through their channel." He pauses. "Cadrin didn't take it. But they knew he had records before he said so." Someone shaped an offer of protection to get access to Cadrin's log without needing to ask directly for it. They asked questions you haven't reached yet.`;
      }
      if (!G.rivalId) {
        if (arch === 'combat') G.rivalId = 'warden_captain';
        else if (arch === 'magic') G.rivalId = 'archivist_veld';
        else if (arch === 'stealth') G.rivalId = 'shadow_broker';
        else G.rivalId = 'provost_lenn';
      }
      G.flags.stage1_rival_seeded = true;
      addJournal('warning', 'Rival-adjacent operative asked Terris specific crossing questions last week — ahead on Whitebridge thread', `whitebridge-rival-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },
  // TYPE: PRESSURE — WORLD COLOR VIGNETTE
  {
    label: "The river beneath the bridge carries sound differently at dawn than at any other hour.",
    tags: ['WorldColor', 'Atmosphere', 'Stage1'],
    xpReward: 38,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(38, 'observing bridge river acoustics at dawn');
      G.lastResult = `Before the first commercial crossing of the day, when the bridge deck carries nothing heavier than the keeper's footsteps and the mist is still sitting on the water, the river underneath runs loud enough to hear from the railing without leaning over. Current on current — the main flow and the eddy system that forms around the bridge's central pier, working against each other, the combination producing a low churning that carries up through the stone. By mid-morning, when the foot traffic and cart weight build, the deck vibration drowns it. Cadrin says you can hear the river's mood in those early minutes, if you learn what to listen for. This morning the eddy sounds harder than usual.`;
      G.recentOutcomeType = 'observe'; maybeStageAdvance();
    }
  },

  // TYPE: PRESSURE — ARCHETYPE GATE (Bard/Healer — Support family)
  {
    label: "The crossing workers talk differently to travelers who seem trustworthy than to those who seem official.",
    tags: ['Pressure', 'ArchetypeGate', 'Stage1'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      const family = typeof getArchetypeFamily === 'function' ? getArchetypeFamily(G.archetype) : '';
      if (family !== 'Support') {
        G.lastResult = `The crossing workers are noticeably more guarded around some travelers than others — the distinction isn't wealth or bearing, but something subtler. You can't quite read the line they're drawing between people they'll talk openly with and people they won't.`;
        gainXp(28, 'noting crossing worker social calibration');
        G.recentOutcomeType = 'observe'; maybeStageAdvance(); return;
      }
      gainXp(70, 'reading crossing worker social calibration');
      G.stageProgress[1]++;
      G.lastResult = `The distinction they draw is between people they read as likely to report what they hear upward and people they read as unlikely to. The signals are behavioral: how someone holds eye contact when they ask questions, whether they write things down immediately or remember them, whether they respond to unexpected information with concern or professional interest. Workers at a compromised crossing have developed a fast, accurate read of which travelers are safe to talk to. They've placed you in the safe category. They're right. But the fact that the screening exists at all is itself the evidence: they have things to say that they've learned not to say to the wrong people.`;
      if (!G.flags) G.flags = {};
      G.flags.whitebridge_worker_trust = true;
      addJournal('Crossing workers screen travelers for safety before speaking — active suppression awareness in the workforce', 'evidence', `whitebridge-workers-${G.dayCount}`);
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // TYPE: PRESSURE — BACKGROUND FLAVOR
  {
    label: "The bridge crossing fee schedule was last revised two years ago — but certain cargo classes pay rates from a different document.",
    tags: ['Pressure', 'Background', 'Stage1'],
    xpReward: 55,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(55, 'comparing crossing fee schedules');
      const bg = G.background || '';
      let result = `The posted crossing fee schedule runs to twelve cargo categories with rates by weight class. At the keeper's station, a second document sits below the posted schedule — same format, different rates for three specific cargo designations. Those three categories pay at the lower rate from the secondary document. Nobody announces this. If you know to check the secondary schedule, the clerk applies it without comment. The secondary schedule has no official posting date.`;
      if (bg === 'merchant' || bg === 'trader') {
        result = `The secondary crossing rate document is a practice you recognize from toll roads with informal preferred-partner arrangements — certain cargo designations get a lower rate as a matter of policy that isn't publicized because formalizing it would require explaining who qualifies and why. The rates themselves aren't the problem. The problem is what the three discounted cargo classes have in common: they don't appear in any standard commercial classification guide. Someone created three new cargo designations specifically to capture the discounted rate, and no one asked what those designations contain.`;
      }
      G.lastResult = result;
      addJournal('Whitebridge crossing fees: secondary rate document covers three unclassified cargo designations at reduced rates — unofficial preferred classification', 'evidence', `whitebridge-fees-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // TYPE: PRESSURE — RISKY
  {
    label: "The bridge director's administrative log has a regular notation that reads 'authorized under operational continuity' — a phrase that doesn't appear anywhere in the commune's charter.",
    tags: ['Pressure', 'Risky', 'Records', 'Stage1'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'reviewing bridge director administrative log');
      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `The notation appears eighteen times over the past nine months — always adjacent to entries involving the midnight cargo crossings Cadrin's log documents. "Authorized under operational continuity." The commune's charter uses no such phrase. The crossing authority's founding documents use no such phrase. It's a bureaucratic construction with no legal basis in any document governing this bridge, used repeatedly to authorize crossings that needed authorization without a legitimate mechanism to provide it. Whoever wrote those entries invented the authority they cited.`;
        if (!G.flags) G.flags = {};
        G.flags.whitebridge_invented_authority = true;
        addJournal('Bridge director log: "operational continuity" authorization cited 18 times for midnight crossings — phrase has no legal basis in any governing document', 'evidence', `whitebridge-authority-${G.dayCount}`);
      } else {
        G.lastResult = `The administrative log is in the bridge director's office — a working document, not a public record, accessible during the director's posted administrative hours. The director's current schedule lists administrative hours in the late morning, which closed an hour ago. Access tomorrow morning is straightforward. Access today requires either the director's direct authorization or a reason to be in that office that the current staff will accept without escalating.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // TYPE: PRESSURE — BOLD
  {
    label: "The cargo manifests for the midnight crossings are filed in a different administrative category than standard crossing records.",
    tags: ['Pressure', 'Bold', 'Records', 'Stage1'],
    xpReward: 78,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(78, 'locating midnight crossing manifests');
      const result = rollD20('stealth', (G.skills.stealth || 0) + Math.floor(G.level / 3));
      if (result.total >= 14) {
        G.lastResult = `The midnight cargo manifests are filed under "supplementary transit authorizations" — a category that exists in the administrative system but carries no public access designation, meaning they're neither sealed nor available by default. They sit in a filing drawer that isn't labeled on the front because it isn't expected to be searched. Three manifests for the past month: all three list the cargo as "consolidated regional goods," all three list the carrier as the same numeric reference code, all three show a destination address that is a Shelkopolis commercial post office box rather than a commercial premises. The address receives cargo without a named recipient.`;
        if (!G.flags) G.flags = {};
        G.flags.whitebridge_manifests_found = true;
        addJournal('Midnight crossing manifests: all filed as "consolidated regional goods" to anonymous Shelkopolis PO box — no named recipient, same carrier code across all entries', 'evidence', `whitebridge-manifests-${G.dayCount}`);
      } else {
        G.lastResult = `The administrative filing system at the crossing authority has four categories of records: public, restricted, sealed, and a fourth that the index describes as "operational supplementary." That fourth category isn't accessible without bridge director authorization, but it's not marked sealed — the distinction is procedural, not legal. Someone who understood the classification system and had a reason the director would accept could request access. The director is sympathetic to the inquiry. The conversation with her hasn't happened yet.`;
      }
      G.recentOutcomeType = 'stealth'; maybeStageAdvance();
    }
  },

  // TYPE: PRESSURE — SAFE/SOCIAL
  {
    label: "The commune's elder council hasn't convened a full session in four months — the last three meetings were closed without quorum.",
    tags: ['Pressure', 'Safe', 'Social', 'Stage1'],
    xpReward: 55,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(55, 'asking about elder council sessions');
      G.lastResult = `The commune elder council requires a quorum of five of its seven members to convene formally. For four months, sessions have ended without five members present. One elder explains it without being asked for a reason: "Two members began citing administrative conflicts every session after the crossing irregularities were first raised in chamber. Without those two seats, we're always at four." The four present members have tried calling unscheduled sessions — those require seven-day notice, which gives the absent members time to file conflicts. The community's governance mechanism has been effectively suspended by selective absence.`;
      addJournal('Whitebridge elder council: quorum blocked for 4 months by two members filing conflicts whenever irregularities are on the agenda', 'evidence', `whitebridge-council-${G.dayCount}`);
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // TYPE: PRESSURE — RISKY/NPC
  {
    label: "The night-shift crossing assistant has been keeping her own count of the midnight cargo crossings — separately from the official log.",
    tags: ['Pressure', 'Risky', 'NPC', 'Stage1'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'finding night-shift crossing counter');
      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `Sali has been keeping a tally on the back of her rotation schedule — hash marks, one per crossing, with a weight estimate beside each based on how the bridge deck responded under the load. She doesn't know why she started. "Something to do. And it seemed like the kind of thing someone should know." Seventeen crossings in four months, with estimates ranging from three hundred to eight hundred weight units per load. The high-end loads correspond with the new moon dates Cadrin identified. The bridge deck flexes differently under that weight. Sali noticed. She has no idea what to do with the information.`;
        if (!G.flags) G.flags = {};
        G.flags.met_sali_counter = true;
        addJournal('Night-shift Sali: 17 midnight crossings in 4 months, load estimates by deck response — high loads on new moon dates matching Cadrin\'s log', 'evidence', `whitebridge-sali-${G.dayCount}`);
      } else {
        G.lastResult = `The night-shift crossing assistant is on a split rotation — present at the bridge for the first four hours of overnight and the last two hours before dawn, absent during the middle portion when the midnight crossings actually occur. She's aware of them but wasn't on deck when they happened. She knows someone who was: the relief keeper who works the middle overnight window, who tends to spend the quiet hours at the river end of the bridge rather than the station. That person has a different relationship to what crosses at midnight.`;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // TYPE: PRESSURE — ATMOSPHERE
  {
    label: "The bridge-side inn keeps a book of travelers who pass through — a tradition, not a requirement.",
    tags: ['WorldColor', 'Atmosphere', 'Stage1'],
    xpReward: 35,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(35, 'reading bridge-side inn traveler book');
      G.lastResult = `The inn at the western approach keeps a guest book going back forty years — not a requirement, an old custom, the kind that survives because travelers find it interesting to read the names of who came before them. The innkeeper allows browsing without comment. The book runs dense for most years: merchants, pilgrims, officials, families relocating. The last eight months are sparse. The inn is seeing less foot traffic, and what's there is less varied — the commercial names that used to appear regularly are absent, replaced by a narrower set of repeating names traveling the same route on a regular cycle. The crossing still operates. The kind of people who used it have changed.`;
      G.recentOutcomeType = 'observe'; maybeStageAdvance();
    }
  },

  // TYPE: PRESSURE — BOLD/LORE
  {
    label: "The crossing authority's founding compact gives the keeper authority to halt crossing operations under specific conditions — conditions that currently apply.",
    tags: ['Pressure', 'Bold', 'Lore', 'Stage1'],
    xpReward: 75,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(75, 'reading crossing authority founding compact');
      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 13) {
        G.lastResult = `The crossing authority's founding compact — the original document establishing Cadrin's position and its powers — includes a provision for "operational suspension on grounds of manifest record discrepancy." If the keeper's crossing count and the administrative record diverge by more than fifteen percent over any thirty-day period, the keeper has authority to suspend crossings pending reconciliation. Cadrin's count and the administrative record diverge by thirty-one percent over the past month. The authority to act exists. Cadrin didn't know the provision existed. He was never shown the full founding compact — only the duty summary.`;
        if (!G.flags) G.flags = {};
        G.flags.whitebridge_suspension_authority = true;
        addJournal('Crossing compact: keeper suspension authority triggered at 15% record discrepancy — current discrepancy 31%, Cadrin never informed of this provision', 'evidence', `whitebridge-compact-${G.dayCount}`);
      } else {
        G.lastResult = `The crossing authority's founding compact is a public document, held at the commune administrative office and the regional registry. The commune copy is available during administrative hours. What Cadrin was given when he was posted here was a duty summary — two pages, condensed. Whether that summary captured everything the founding compact grants his position requires reading both documents side by side.`;
      }
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
window.WHITEBRIDGE_COMMUNE_STAGE1_ENRICHED_CHOICES = WHITEBRIDGE_COMMUNE_STAGE1_ENRICHED_CHOICES;
