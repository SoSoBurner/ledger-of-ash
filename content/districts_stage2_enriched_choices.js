/**
 * DISTRICTS STAGE 2 ENRICHED CHOICES
 * Canon districts (7): shelkopolis_aurora_heights, shelkopolis_ironspool_ward, shelkopolis_verdant_row,
 *   harvest_keep_granary_steps, ithtananalor_iron_ledger_ward, panim_haven_reckoning_quarter,
 *   mimolot_academy_scriptorium_steps
 * Synthetic district type pools (3): high_quarter, common_quarter, low_ward
 */

/* ========== CANON DISTRICTS ========== */

var AURORA_HEIGHTS_STAGE2_ENRICHED_CHOICES = [
  {
    label: "Sealed charter-period correspondence sits in Aurora Heights archive. The noble registry controls access.",
    tags: ['Investigation', 'Lore', 'Stage2'],
    xpReward: 72,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'accessing Aurora Heights formal archive');
      const result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        G.lastResult = `Deep in the sealed correspondence, a single letter sits apart from the routine charter filings — a House Shelk subordinate writing to the Northern Provision Compact with delivery terms laid out in blunt commercial language. The noble registry bound it in with the quarterly administrative packets without marking it. Whatever it confirmed passed through this archive unnoticed for years, preserved by accident inside the wrong folder.`;
        addJournal('Aurora Heights archive: House Shelk letter confirms Northern Provision Compact delivery terms', 'evidence', `ah-archive-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The clerk at the records counter sets down her stamp and steps back without processing the request. A handwritten routing slip goes into the senior ledger, pressed flat with her palm. Lamp oil and wet stone drift up from the corridor outside. Somewhere above this counter, House Shelk estate will receive word that someone asked about charter correspondence from this period. The inquiry is already traveling faster than the person who made it.`;
        addJournal('Aurora Heights archive inquiry escalated to House Shelk estate', 'complication', `ah-archive-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.lastResult = `The correspondence from that period fills two shelf boxes, most of it routine estate administration. Buried in the third bundle, the sealed subsidiary appears — not as a party to any agreement, but as a reference point in three separate business letters, each written as though the reader already knew what it was. The name recurs without explanation. The trail is thin but consistent across the bundles.`;
        addJournal('Aurora Heights archive: charter subsidiary reference in business correspondence', 'evidence', `ah-archive-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },
  {
    label: "The high-society network holds off-record knowledge about the charter parties.",
    tags: ['NPC', 'Persuasion', 'Stage2'],
    xpReward: 68,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'working Aurora Heights social circuit for charter intelligence');
      const result = rollD20('charm', (G.skills.charm||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        G.lastResult = `A former estate solicitor names the sealed charter holder without hesitation — a minor noble house dissolved three years ago whose legal entity was never formally struck from the registry. The dissolution paperwork sits in the noble registry's own files, unfiled, gathering the particular dust of deliberately unfinished administrative work. A legal ghost, operating under the protection of expired legitimacy, and someone kept the paperwork just incomplete enough to preserve that protection.`;
        addJournal('Aurora Heights court: charter holder identified as dissolved noble legal ghost', 'evidence', `ah-court-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The phrasing lands wrong — too direct for this circuit. The man across the tea table sets down his cup and reclassifies the conversation in real time: a prospecting call, someone scouting charter availability. He produces the House Shelk solicitor's card with practiced efficiency and slides it across the tablecloth. The social door closes before it was ever properly open.`;
        addJournal('Aurora Heights court: charter inquiry redirected to House Shelk solicitor', 'complication', `ah-court-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.lastResult = `The woman in pale grey — a former estate solicitor who now advises two houses independently — tilts her wine glass and studies the charter description without touching the document. "That's the old form. Pre-consolidation. Nobody drafts in that register anymore unless they want something to read as legitimate from a distance without surviving close review." She hands back the paper without looking at it again. The observation has cost her nothing to share.`;
        addJournal('Aurora Heights court: charter recognized as pre-consolidation House Shelk administrative style', 'evidence', `ah-court-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },
  {
    label: "The registrar's counter-mark is on a low ward eviction — wrong jurisdiction, same hand.",
    tags: ['Investigation', 'Lore', 'Stage2'],
    xpReward: 74,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'tracing Aurora Heights registrar signature into low ward filings');
      const result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        G.lastResult = `The registrar's counter-mark is a small down-stroke she adds only when she signs from her own bench — a personal flourish the clerks in Aurora Heights know by sight. It sits on the bottom corner of a housing review filed six weeks ago against a low ward tenant who had filed a noise complaint about the dome terminal deliveries. The review shifted the tenant out of the building. The registrar has no administrative reach into the low ward. Somebody walked the document across jurisdictions and she signed it without logging the transit.`;
        addJournal('Aurora Heights registrar counter-signed low ward housing review targeting a dome terminal complainant — no jurisdictional transit log', 'evidence', `ah-crossjuris-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The clerk's hand stills on the open filing book. She doesn't answer immediately. She turns the book closed — spine toward you, title page down — and slides it beneath the counter in one practiced motion. By the time you've framed a second question, she's already writing on a routing slip. Whatever the note says, it won't wait for the afternoon post. It is going up the chain now, while you are still in the building.`;
        addJournal('Aurora Heights registrar inquiry flagged — note routed upward', 'complication', `ah-crossjuris-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.lastResult = `The filing carries the registrar's mark stamped in the lower corner — the kind of signature that belongs on Aurora Heights documents, not low ward housing reviews. The intake clerk squints at the delivery record and shakes her head: no name, no courier house, just a time stamp from mid-afternoon. The transit log for that day has been taken out for annotation and not returned. The first two pages are absent. The mark is real. The path it traveled here is not.`;
        addJournal('Aurora Heights: low ward filing bears registrar signature, transit log pages missing', 'evidence', `ah-crossjuris-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  }
];

var IRONSPOOL_WARD_STAGE2_ENRICHED_CHOICES = [
  {
    label: "Workers who touched the container modifications end their shifts at the ward taverns.",
    tags: ['Investigation', 'Stealth', 'Stage2'],
    xpReward: 70,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'locating Ironspool Ward workers who handled container modifications');
      const result = rollD20('finesse', (G.skills.finesse||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        G.lastResult = `A former workshop hand describes the modification work over the last of his drink, speaking at medium volume into the ward tavern noise. Signal-damping insulation panels. Chemical seal reinforcement on the container joints. A specific loading configuration built to distribute weight evenly across a standard grain convoy arrangement, so it reads correctly on a manifest. He was paid double rate, cash, in an envelope left at the yard gate — no name, no guild form. He was told not to discuss it. He discusses it anyway.`;
        addJournal('Ironspool Ward: worker describes container modification specs — signal damping, grain convoy weight config', 'evidence', `iron-ward-worker-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The first tavern: nobody who worked that job is drinking here tonight. The second: two men at the back corner go quiet when the question is asked, and one of them leaves through the side passage. By the time the third shift-end crowd fills the benches, the question has already traveled ahead. Ironspool's labor circuit is close-knit in the specific way that protects its own — and news of outside interest moves faster than the person carrying it.`;
        addJournal('Ironspool Ward: modification inquiry reached hostile party', 'complication', `iron-ward-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.lastResult = `A shift hand nursing his third drink sets it down and spreads his hands on the table as though measuring something. The containers were unusual — heavier than listed, the joints reinforced before delivery. "They called it specialty freight equipment." His thumb traces an arc on the wood. "Double pay, cash, nothing in writing. That's not what you pay somebody to carry a standard load." He doesn't ask why you're asking. The money answered that question for him months ago.`;
        addJournal('Ironspool Ward: specialty freight modifications confirmed — high pay, no questions', 'evidence', `iron-ward-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },
  {
    label: "A ward fence has been moving suppression compound that leaked from the main supply chain.",
    tags: ['Stealth', 'Craft', 'Stage2'],
    xpReward: 66,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'tracing suppression compound street leakage in Ironspool Ward');
      const result = rollD20('finesse', (G.skills.finesse||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        G.lastResult = `The fence produces a small vial from a cloth-lined case beneath the counter — a pale suspension, almost colorless. "Calming agent." He taps the stopper with one finger. "Three parts cut. Still works." The street-level product is diluted from bulk stock; no street distributor is running primary production. The volume in circulation implies a supply surplus far above what a targeted operation would require. Someone is moving more of this than the plan accounts for.`;
        addJournal('Ironspool street market: suppression compound sold as calming agent — production excess confirmed', 'evidence', `iron-ward-fence-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The fence's expression doesn't change, but his posture does — weight shifting back from the counter, one hand dropping below the surface. He's read the situation into one of two categories: enforcement or rival, and neither gets a price. The back room door is open; it isn't for long. By the time you're in the street, the display window has been cleared and the front door bolted. Finding him again will require a different approach entirely.`;
        addJournal('Ironspool Ward fence: hostile response, no information', 'complication', `iron-ward-fence-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.lastResult = `The fence answers without much ceremony — the supply arrived three months ago, came in volume, nobody he knew was the source. He spreads his hands. "More than I could move in a season, honestly." The vials are priced high enough to limit the street pool, which means the bulk of whatever arrived isn't going through him. The volume entered the ward from somewhere that can afford surplus. He shrugs at the gap between supply and street demand as though it's someone else's problem.`;
        addJournal('Ironspool Ward: calming compound in street market — volume exceeds street demand', 'evidence', `iron-ward-fence-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // ── RED HOOD FACTION CONTACT PLOT (3-beat sequence) ───────────────

  // BEAT 1 — Hook
  {
    label: "The pawn window tag has been rewritten four days running.",
    tags: ['RedHood', 'Stage2', 'Faction'],
    xpReward: 60,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(60, 'reading the pawn-window tag pattern');
      G.flags.stage2_faction_red_hood_aware = true;
      G.lastResult = 'The cracked lamp in the pawn window has a handwritten tag that is too large for the item. Eleven days the lamp has sat there, and the tag has been rewritten on four of those days — always by the same hand, always with a different numeral string and never with a currency mark. The tag today ends in a short Kerroun syllable that is not a price. It is a broker listing code. The pawn shop is a Red Hood Guild dead-drop window, and the tag is live this morning. A woman in a dark red shawl crosses the lane while you are reading, adjusts the shawl over one shoulder instead of the other, and does not glance back.';
      addJournal('Ironspool Ward pawn window — Red Hood broker listing code live today, dead-drop tag pattern confirmed', 'intelligence', `iron-redhood-aware-${G.dayCount}`);
      G.recentOutcomeType = 'investigate';
    }
  },

  // BEAT 2 — Commitment
  {
    label: "Quote the listing code back at the counter and ask what the lamp actually costs.",
    tags: ['RedHood', 'Stage2', 'Faction', 'NPC'],
    xpReward: 72,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      if (!(G.flags && G.flags.stage2_faction_red_hood_aware)) {
        G.lastResult = 'The pawn window is open, lamp oil and cobblestone damp carrying up from the lane outside, but there is nothing to act on with the broker yet. The cracked lamp sits in its place, its tag face-down. The listing code in the window changes by the day — acting on one you have not decoded yet would burn the approach entirely. Come back when the pattern has been read and the current code confirmed.';
        G.recentOutcomeType = 'locked'; return;
      }
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'reaching the Red Hood broker');
      G.flags.met_broker_anneth_torv = true;
      G.flags.stage2_faction_red_hood_contacted = true;
      G.lastResult = 'The counter clerk disappears into the back and a different woman comes forward — the one in the red shawl, closer now. She introduces herself as Broker Anneth Torv, says it like a credential rather than a name. Her register is Kerroun market — short sentences, a small laugh before any refusal, numbers always spoken in multiples of three. Her tell is that she wears a thin iron ring on her smallest finger and turns it inward before she quotes a price, so the ring-face reads only to her. She wants a specific courier satchel recovered from a Reckoning Quarter confiscation shelf — a satchel the Red Hood lost when a courier was picked up last week.';
      addJournal('Met Broker Anneth Torv (Red Hood Guild) — wants courier satchel recovered from Reckoning Quarter confiscation; Guild needs to audit what was read', 'contact_made', `iron-redhood-contacted-${G.dayCount}`);
      G.recentOutcomeType = 'investigate';
    }
  },

  // BEAT 3 — Payoff
  {
    label: "The satchel on the confiscation shelf hasn't been signed out properly.",
    plot: 'main',
    tags: ['RedHood', 'Stage2', 'Faction', 'Payoff'],
    xpReward: 90,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      if (!(G.flags && G.flags.stage2_faction_red_hood_contacted)) {
        G.lastResult = 'Anneth Torv outlined a specific task at the last meeting — her register was Kerroun market, short sentences, numbers always in multiples of three. Until that task is complete, the next step in the arrangement is not open. The pawn window stays closed, the cracked lamp unsold, the tag rewritten daily for an audience that has not yet earned the meeting. The confiscation shelf will still be there. The question is whether it will still hold what Torv needs by the time the approach is ready.';
        G.recentOutcomeType = 'locked'; return;
      }
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(90, 'delivering the recovered Red Hood satchel');
      G.flags.stage2_faction_red_hood = true;
      G.flags.stage2_faction_contact_made = true;
      G.investigationProgress = (G.investigationProgress||0) + 2;
      G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
      var tension = '';
      if (G.flags && G.flags.stage2_faction_wardens) {
        tension = ' Anneth turns the iron ring inward and laughs the small laugh. "You have Warden saber-oil on the satchel strap. That is a scent I recognize. I am going to tell you less than I meant to, and you are going to act as though I told you more. We both leave cleaner that way."';
      }
      G.lastResult = 'Anneth takes the satchel and opens it on the counter in the specific order a courier would — outer pocket, inner flap, false base. The false base has been opened and re-closed by someone who knew it was there. "They read it. They did not copy it. There is a difference. Copying leaves press marks on the lining. Reading leaves this." She shows you a thumb-smudge of grey dust along one seam. "Collegium ink residue. The satchel was opened by an auditor with a subpoena record, and the subpoena was then withdrawn. That means someone above the Collegium pulled the audit back after the item was already seen."' + tension;
      addJournal('Red Hood intel: Collegium auditor read the courier satchel under subpoena, then the subpoena was withdrawn from above — authority signature now traceable', 'evidence', `iron-redhood-payoff-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  }
];

var VERDANT_ROW_STAGE2_ENRICHED_CHOICES = [
  {
    label: "Botanical healers have been quietly documenting suppression compound exposure cases.",
    tags: ['Investigation', 'Lore', 'Stage2'],
    xpReward: 68,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'reviewing Verdant Row healer exposure documentation');
      const result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `The healers have compiled forty-seven cases across seven months, each patient record kept in a hand-copied ledger stored behind the collective's dispensary shelves rather than in the main filing cabinet. They cross-referenced patient addresses against known compound transit routes and confirmed geographic clustering across four city wards. They were preparing to publish when a suppression notice arrived from the "Northern Glyph Oversight Commission" — an authority none of them could locate in any regulatory directory. They kept the records out of the main files. They share them now.`;
        addJournal('Verdant Row healers: 47 exposure cases documented, suppressed by fake authority, records shared', 'evidence', `vr-healers-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.reverence = (G.worldClocks.reverence||0) - 1;
        G.lastResult = `The senior healer listens to the end without interrupting, then clasps her hands on the desk. The documentation exists. The answer is still no. Her patients came to her in distress and trusted the collective's seal on their records; she isn't breaking that for any inquiry, however stated. The framing — evidence, public record, broader harm — doesn't move her. Patient confidentiality is the floor of what the collective offers, and she holds it here without apology.`;
        addJournal('Verdant Row healers: patient confidentiality protection, documentation access refused', 'complication', `vr-healers-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.lastResult = `The younger healer pulls a tally sheet from a stack on the shelf without checking the label — she knows where it is. The symptom cluster: cognitive fog, appetite disruption, irregular glyph sensitivity in six cases. "Forty-something by now." She keeps her voice flat, but her thumb presses hard against the tally line. The presentation is consistent across every case. Someone outside this room knows what the pattern looks like, because they made it.`;
        addJournal('Verdant Row healers tracking 40+ exposure cases — confirmed suppression compound presentation', 'evidence', `vr-healers-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },
  {
    label: "Every allied healer and recorder here is connected. Waiting for something worth routing.",
    tags: ['NPC', 'Persuasion', 'Stage2'],
    xpReward: 64,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(64, 'building the Verdant Row network');
      const result = rollD20('charm', (G.skills.charm||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.verdant_row_contact = true;
        G.lastResult = `The man across the table — grey-haired, ink on his left sleeve from a morning of copying — lays down the evidence summary and holds it flat with two fingers. He doesn't speak immediately. When he does, it's to a point on the wall above your shoulder. "The circuit moves on confirmation, not promise." He slides the summary back. The Verdant Row distribution network is committed: any findings routed through this channel reach every allied healer and recorder network in the region at once, with no single point of interception.`;
        addJournal('Verdant Row distribution circuit committed — regional simultaneous distribution available', 'evidence', `vr-contact-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The meeting ends before the second cup is poured. No raised voices, no explanation — just a hand gesture that says the conversation is closed, and the same grey-haired man gathering his papers in an order that means he won't be carrying anything else out of this room. Somewhere in the network, a profile note is being written. The words won't be hostile. They'll be worse: uncertain. The circuit protects itself by not moving on uncertain things.`;
        addJournal('Verdant Row network: reliability concern, profile flagged for review', 'complication', `vr-contact-fail-${G.dayCount}`);
      } else {
        G.flags.verdant_row_contact = true;
        G.lastResult = `The grey-haired man studies the evidence summary for a long moment, then folds it along a crease that wasn't there before. He slides a small printed card across the table — a botanical illustration on one side, a sequence of three symbols on the other. "That's the signal for this circuit. Use it when you have something worth moving." The relationship is thin at this stage. The circuit will carry what's sent through it, but trust here is built incrementally, not granted.`;
        addJournal('Verdant Row network established — basic circuit access confirmed', 'evidence', `vr-contact-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },
  {
    label: "A Reckoning Quarter magistrate has been taking depositions inside the healer's collective without local notice.",
    tags: ['Investigation', 'Persuasion', 'Stage2'],
    xpReward: 72,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'tracking Reckoning Quarter magistrate into Verdant Row');
      const result = rollD20('charm', (G.skills.charm||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        G.lastResult = `The senior healer confirms the magistrate has come three times in the past month — always mid-afternoon, always with the same adjudicator's clerk, always to take depositions from patients being treated for compound exposure. The depositions are filed in Reckoning Quarter records, not Verdant Row's civic hall. The magistrate brings his own seal block and carries it out in a cloth bag afterward. The healer kept a list of which patients were called. She gives it to you.`;
        addJournal('Verdant Row: Reckoning Quarter magistrate taking depositions from exposure patients — off-district filing, patient list secured', 'evidence', `vr-magistrate-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The healer's hands stay folded on her desk through the entire exchange. The answer is courteous and total: no patients will be identified, no visit details discussed, no confirmation given that the collective holds any particular records. The phrasing is rehearsed — this isn't the first outside question she's deflected. Somewhere in the collective's log, a second notation is written next to the first. The dismissal is warm. The door is closed.`;
        addJournal('Verdant Row healer: magistrate inquiry refused, second warning logged against the collective', 'complication', `vr-magistrate-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.lastResult = `The healer confirms three visits without supplying a single patient name — the list stays face down on her desk throughout the conversation. What she will say: the depositions left in the magistrate's own folder, sealed with Reckoning Quarter wax. Not the civic hall's seal. Not Verdant Row's. The local notice ordinance requires all third-party depositions taken within the district to be filed locally first. None of these were. That part, she says plainly, is a matter of public procedural record if anyone cares to check.`;
        addJournal('Verdant Row: off-district deposition filings confirmed — local notice ordinance breached', 'evidence', `vr-magistrate-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  }
];

var GRANARY_STEPS_STAGE2_ENRICHED_CHOICES = [
  {
    label: "The routing number theft is in the manifests right now. Catch it before it clears.",
    tags: ['Investigation', 'Craft', 'Stage2'],
    xpReward: 70,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'intercepting live manifest routing number theft at Granary Steps');
      const result = rollD20('spirit', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        G.lastResult = `The manifest is still being processed at the counter when the routing number flags — grain code stamped onto a non-agricultural load, entered four minutes ago, the ink not yet dry on the submission form. The submitting agent stands at the window, waiting for the batch receipt. There is time to hold the filing, pull a physical description, and copy the exact charter subsidiary code before the batch cycle closes. The evidence is live and still attached to a person who has not yet left the building.`;
        addJournal('Granary Steps: live manifest fraud caught — agent described, charter code captured', 'evidence', `hk-granary-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The agent at the counter glances up once, reads the angle of attention across the room, and moves. The manifest is voided before the ink has dried on the routing stamp — a single ruled line, initialed in a hand that will be impossible to trace. By the time a supervisor could be summoned, the counter is empty and the side exit closed. The fraud evaporated cleanly. The only thing left is a voided manifest with a grain routing number that no longer points at anything.`;
        addJournal('Granary Steps: agent voided manifest before capture — fled', 'complication', `hk-granary-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.lastResult = `The manifest has already cleared the counter by the time the routing number flags — processed and bundled into the batch file while the queue backed up. It's still in the outgoing tray, not yet collected. Spread beside the batch log, the same routing number pattern appears in four earlier entries from the past six weeks. Five manifests carrying identical construction: non-agricultural loads, agricultural routing codes, all submitted through the same counter window on different days.`;
        addJournal('Granary Steps: routing number fraud in 5 batch manifests confirmed', 'evidence', `hk-granary-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },
  {
    label: "The ward boundary markers here carry more than paint — something was written over.",
    tags: ['stage2', 'districts'],
    xpReward: 30,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(30, 'examining Granary Steps ward boundary markers');
      var roll = rollD20('vigor', G.skills.vigor || 0);
      if (roll.total >= 13) {
        G.investigationProgress++;
        addNarration('Ward Marker Palimpsest', 'The stone post at the granary district boundary shows three layers of mark — the current ward designation in fresh chalk, an older grain routing code in wax crayon beneath it, and underneath both, a carved cipher that matches the charter subsidiary format you have seen in the Aurora Heights filings. The carving was meant to be permanent. Someone chalked over it when the routing number changed. The original claim is still there in the stone.');
        addJournal('Granary Steps boundary post: charter subsidiary cipher carved into stone beneath two newer mark layers', 'evidence');
        G.flags.granary_marker_found = true;
        maybeStageAdvance();
      } else {
        addNarration('Ward Marker, Unremarkable', 'The stone post at the granary district boundary carries the standard marks: ward designation, date of last arbitration, constable patrol signature in chalk renewed this morning. The chalk is too fresh — pressed into the stone harder than a routine update requires, thick enough to fill a groove rather than just mark a surface. Whatever sat beneath it has been scrubbed rather than simply written over. The post is still damp where the scrubbing went deep.');
      }
    }
  }
];

var IRON_LEDGER_WARD_STAGE2_ENRICHED_CHOICES = [
  {
    label: "The suppression compound payments are filed as routine asset transfers in the financial records.",
    tags: ['Investigation', 'Lore', 'Stage2'],
    xpReward: 72,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'tracing suppression compound payments in Iron Ledger Ward records');
      const result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `The asset transfers converge on a single escrow account registered under the Northern Provision Compact name, filed in a ledger column sandwiched between routine ward supply disbursements on either side. The account has received seven payments over six months from three separate institutional payers — one Soreheim administrative fund, one Guildheart commercial line, one House Shelk subsidiary operating through a numbered charter entity. Each payment filed under a different service classification. Together they produce a complete financial picture that no single payer intended to leave visible.`;
        addJournal('Iron Ledger Ward: NPC escrow account with Soreheim + Guildheart + Shelk disbursements confirmed', 'evidence', `ilw-ledger-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `Two audit clerks in plain grey occupy the records counter, working through box files with a pace that suggests they've been here for days. The access request stalls immediately — the regular records staff have been stood aside for the week. One of the auditors looks up, writes something on a separate sheet, and slides it into an already-thick folder. The access attempt is logged not by the office but by whoever commissioned the Shadowhands review. That's a different audience entirely.`;
        addJournal('Iron Ledger Ward under Shadowhands audit — access attempt flagged', 'complication', `ilw-ledger-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.lastResult = `The transfers sit in the asset records as routine — each one individually unremarkable, labeled with supplier codes and service classifications that look clean at a glance. Set side by side, they resolve into a single pattern: every disbursement routes to the same escrow account, and the account name matches the fabricated supplier entity that appeared in the Aurora Heights charter filings. The payers are from at least three separate institutions. Whatever this account was built to receive, it was built to receive it from multiple directions at once.`;
        addJournal('Iron Ledger Ward: compound payment escrow confirmed, multi-institution payers', 'evidence', `ilw-ledger-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },
  {
    label: "The Guild Arbiter processed that filing — she knows which claim date came first.",
    tags: ['stage2', 'districts'],
    xpReward: 30,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(30, 'pressing Guild Arbiter on Iron Ledger Ward claim dates');
      var roll = rollD20('charm', G.skills.charm || 0);
      if (roll.total >= 13) {
        G.investigationProgress++;
        addNarration('Arbiter Seniris, Off the Record', 'She lays the two documents on her desk in the order she always does — seniority of claim date, not guild seniority. The Northern Provision Compact filing is dated four months before the Guild Merchant\'s counter-claim. Her thumb rests on the date without pointing to it. "A provisional determination reflects what the documents show," she says, not looking up. "A full arbitration outcome reflects what the documents are worth." She does not explain the difference. She does not have to.');
        addJournal('Iron Ledger Ward arbiter: NPC claim predates Guild Merchant counter-claim by four months — provenance question open', 'intelligence');
        G.flags.iron_ledger_arbiter_consulted = true;
        maybeStageAdvance();
      } else {
        addNarration('Arbiter Seniris, On the Record', 'She lays both documents flat on the desk and gives the answer she gives everyone who comes through that door without an arbitration appointment — the provisional determination is posted on the public notice board in the hall. The full arbitration schedule is public record, available at the ward filing counter. Active filings are not discussed outside the formal process. Her desk is already sorted and her attention is already elsewhere before the question finishes forming. The door to the back office remains closed throughout.');
      }
    }
  }
];

var RECKONING_QUARTER_STAGE2_ENRICHED_CHOICES = [
  {
    label: "A memorial service provider filed a fraud complaint, then withdrew it. Pressure was applied.",
    tags: ['Investigation', 'Persuasion', 'Stage2'],
    xpReward: 70,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'pursuing withdrawn memorial fraud complaint in Reckoning Quarter');
      const result = rollD20('charm', (G.skills.charm||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        G.lastResult = `The complainant is found at their place of business in Reckoning Quarter's outer lane, the smell of woodsmoke and damp cobblestone coming through the open window behind them. They withdrew under threat of legal action — the sealed charter deployed as grounds for a defamation claim, the letter arriving three days after the original complaint was filed. The original complaint named specific cargo classifications being moved under their service registration without authorization. They kept a copy behind a false drawer base. They sign a new witness statement without being asked twice.`;
        addJournal('Reckoning Quarter: memorial fraud complainant located — witness statement secured', 'evidence', `rq-complaint-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `A woman at the doorstep of a narrow building on the Reckoning Quarter's outer lane — she listens for ten seconds, then holds up one hand. "I have a standing legal notice. Any approach about that matter activates it." She isn't hostile, just precise. Her representative will receive a notification before the end of the working day. The legal structure around this withdrawal was built to detect exactly this kind of follow-up. Whoever arranged her silence anticipated someone coming back.`;
        addJournal('Reckoning Quarter: complainant legal warning triggered — notification sent to their representative', 'complication', `rq-complaint-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.lastResult = `The man who filed the original complaint keeps his coat on through the conversation, as if he might need to leave quickly. He won't sign anything and won't be quoted. What he will say, twice, in the same measured tone: "What I described in that complaint is still happening." He looks at the table between you rather than at your face. The legal warning that silenced him didn't require him to disbelieve his own evidence — just not to repeat it formally. He draws a clear line between those two things.`;
        addJournal('Reckoning Quarter: memorial fraud still active, complainant unwilling to restate formally', 'evidence', `rq-complaint-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },
  {
    label: "The permit inspector patrols that corridor. One wrong word closes every door in the quarter.",
    tags: ['stage2', 'districts'],
    xpReward: 30,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(30, 'navigating Reckoning Quarter permit inspector social check');
      var roll = rollD20('finesse', G.skills.finesse || 0);
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

var SCRIPTORIUM_STEPS_STAGE2_ENRICHED_CHOICES = [
  {
    label: "Scriptorium Steps has a back-channel that bypasses Academy mail. The evidence needs that route.",
    tags: ['Craft', 'Lore', 'Stage2'],
    xpReward: 64,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(64, 'routing findings through Scriptorium Steps back-channel');
      const result = rollD20('spirit', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.stage2_evidence_shared = true;
        G.lastResult = `The copying clerk at the back of the Scriptorium Steps distributes the documentation bundle across three separate scholarly corridors without entering it in the standard outgoing log — the back-channel runs clean through the Academy's own infrastructure, invisible to anyone monitoring external mail. Within the day, Quenra Quillfire, Toman Iceveil, and Serin Sunweave each hold copies of findings the others generated independently. They can now cross-reference. The confirmation loop closes without a single documented handoff.`;
        addJournal('Scriptorium back-channel: findings cross-distributed to 3 key researchers — scholarly loop closed', 'evidence', `ss-channel-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The copying clerk pauses mid-sort, tilts the bundle toward the lamp, and sets it down without handling it further. "Someone's been watching this channel." He doesn't elaborate — just pushes the bundle back across the counter and turns to the regular outgoing stack. Somewhere outside this room, a monitor received word that the back-channel was just accessed. The documentation didn't move. Whoever is watching the route now knows someone tried to use it.`;
        addJournal('Scriptorium back-channel compromised — routing notification to unknown monitor', 'complication', `ss-channel-fail-${G.dayCount}`);
      } else {
        G.flags.stage2_evidence_shared = true;
        G.lastResult = `The copying clerk handles the bundle without logging it, routes it through the Academy's internal correspondence chain, and returns a receipt slip the next morning: three deliveries confirmed, no returns. Acknowledgment comes back the following day through the same channel — each researcher received what was sent and confirmed the findings match their independent work. The cross-reference is closed. The channel held, this time.`;
        addJournal('Scriptorium back-channel: findings distributed, researcher alignment confirmed', 'evidence', `ss-channel-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },
  {
    label: "Scriptorium correspondence to Glasswake scholars is being routed through the Iron Ledger Ward franking office.",
    tags: ['Investigation', 'Lore', 'Stage2'],
    xpReward: 72,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'examining misrouted Scriptorium correspondence through Iron Ledger franking');
      const result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        G.lastResult = `The franking clerk logs every outgoing bundle by originating district. Scholarly correspondence from Scriptorium Steps should go through the Academy's own mail office. Seven bundles this quarter routed through Iron Ledger instead, each stamped with a financial-class franking seal that triples the permissible inspection window. Under financial franking, the letters can be opened for a solvency audit. Under academic franking they cannot. The misrouting wasn't administrative — it rewrote the legal status of the mail in transit.`;
        addJournal('Iron Ledger franking: 7 Scriptorium bundles rerouted under financial-class seal — inspection window widened, legal status rewritten', 'evidence', `ss-franking-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The clerk at the Iron Ledger franking counter listens until the question is half-formed, then picks up his internal routing slip pad without answering. The query goes up before you finish speaking — a handwritten note slid into the wall slot behind his left shoulder with the efficiency of someone who has done this before. The window shutter drops. No explanation, no timetable for reopening. The question traveled up faster than any answer could travel back down.`;
        addJournal('Iron Ledger franking office query escalated upward', 'complication', `ss-franking-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.lastResult = `The clerk runs her finger down the outgoing log to the relevant entries and reads the category column. "Transit optimization." She says it the way someone says a word they've looked at too many times. Seven bundles from Scriptorium Steps, all academic correspondence, all routed through the financial franking office rather than the Academy's own mail. The category appears nowhere else in the log. She flips back three quarters to confirm: it didn't exist before this year. Someone created it for these seven bundles.`;
        addJournal('Iron Ledger franking: academic mail logged as transit optimization — novel category this quarter', 'evidence', `ss-franking-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  }
];

/* ========== SYNTHETIC DISTRICT TYPE POOLS ========== */

var HIGH_QUARTER_STAGE2_ENRICHED_CHOICES = [
  {
    label: "Charter and contract files in the high quarter hall. The credentials may open the gate.",
    tags: ['Investigation', 'Lore', 'Stage2'],
    xpReward: 66,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'requesting high quarter charter record access');
      const result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        G.lastResult = `The records hall clerk pulls the index for commercial disputes filed in the last year and runs a finger down the entry column. Eight months ago, a local merchant firm cited the sealed charter subsidiary in a freight contract dispute — then withdrew the filing three weeks later without explanation. The dispute is closed; the index entry is not. The name sits in the register's margin, unreferenced and unresolved, because no one thought to scrub the index when the filing was pulled.`;
        addJournal('High quarter records: sealed charter subsidiary in withdrawn dispute filing', 'evidence', `hq-records-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The clerk at the hall counter writes the name and access request in two separate registers — the standard daily log and a second, smaller book kept beneath the counter. The second book is new; there is a pen crease on its cover where someone pressed too hard filling it for the first time. The access request will be reviewed by local administration before approval is granted. The name is already in both places.`;
        addJournal('High quarter records access escalated — name logged', 'complication', `hq-records-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.lastResult = `The clerk approves partial access: routine filings only, nothing sealed. In three separate administrative documents from the past two years the charter subsidiary appears — once in a freight classification dispute, once in a property lease amendment, once in a permit application that was later withdrawn. Each mention treats the entity as established. None of them explains what it is or who holds it. The pattern is consistent across documents that have no reason to share an author.`;
        addJournal('High quarter records: charter pattern in administrative filings', 'evidence', `hq-records-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },
  {
    label: "The high quarter social circuit keeps its own record of charter activity.",
    tags: ['Persuasion', 'Stage2'],
    xpReward: 62,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(62, 'working high quarter social circuit for charter intelligence');
      const result = rollD20('charm', (G.skills.charm||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        G.lastResult = `The man in the embroidered grey coat sets down his drink and turns his head slightly — the angle of someone retrieving something from memory rather than improvising. "Old money. Been very busy lately." He names a family. The name matches the dissolved noble entity that surfaced in the Aurora Heights filings: a house formally struck from the living registry three years ago, legal entity never deregistered. He doesn't know that. To him it's just gossip about money moving in old channels.`;
        addJournal('High quarter social: dissolved noble entity name confirmed by senior source', 'evidence', `hq-social-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The question lands in the middle of a salon conversation and the room's temperature drops by a degree. The woman in pearls who hosted the introduction doesn't look at either of you while she moves the conversation elsewhere, but she's noticed. The inquiry was too direct for this circuit — the high quarter trades in implication, not named concerns. The door is closed to follow-up introductions. The reputation cost is quiet and durable.`;
        addJournal('High quarter social: inquiry too direct — reputation decline', 'complication', `hq-social-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.lastResult = `The older man in the corner chair gives a half-nod — a gesture that does just enough to confirm the premise without committing to specifics. "Something has been moving money through old channels. Nobody in the quarter is looking too closely at it." He lifts his glass and studies it. The admission is vague by design: enough to confirm the question was worth asking, not enough to be held to later. In this circuit, vague confirmation from this man is worth more than most people's documents.`;
        addJournal('High quarter social: unusual charter activity acknowledged, no specifics', 'evidence', `hq-social-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  }
];

var COMMON_QUARTER_STAGE2_ENRICHED_CHOICES = [
  {
    label: "Market stall traders track every unusual shipment. They share freely.",
    tags: ['Survival', 'Stage2'],
    xpReward: 58,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(58, 'gathering market intelligence in common quarter');
      const result = rollD20('vigor', (G.skills.vigor||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        G.lastResult = `A freight handler at the far end of the market stalls leans on her cart and narrows her eyes at the question. Three weeks ago: four sealed containers, arrived on a standard merchant wagon but listed underweight. She lifted one end of the first container herself and set it back down fast. "Way too heavy for what the manifest said." Chemical smell on the seals — sharp and faintly sweet. Collected same day, paid in advance with documentation she wasn't allowed to copy. The party wore no guild mark.`;
        addJournal('Common quarter market: unusual sealed container delivery — heavy, chemical smell, advance payment', 'evidence', `cq-market-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The first two stalls go quiet the moment the question is asked — not hostile, just sealed. A woman arranging spice bundles at the third stall keeps her back turned for longer than necessary. The traders here know what outside inquiry looks like and how it ends: nothing changes, someone gets named, and the rest of the market bears the aftermath. No one speaks. They watch the rest of the visit from the corners of their eyes, tracking when the departure finally happens.`;
        addJournal('Common quarter market: trader wariness, no information', 'complication', `cq-market-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.lastResult = `A cloth merchant who runs the transit storage alcove at the market's rear entrance leans both forearms on the counter and speaks at medium volume — no whisper. "They don't buy anything here. Transit only. Always pre-arranged, always the same: handlers get double pay, no questions, no guild receipt." He shrugs one shoulder. "When it's double pay and no questions, you don't ask." The pattern is the same across at least three separate transits he can recall by detail.`;
        addJournal('Common quarter market: transit-only shipments with double handler pay', 'evidence', `cq-market-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },
  {
    label: "Ward workers know which employers are running outside guild contracts.",
    tags: ['Persuasion', 'Craft', 'Stage2'],
    xpReward: 56,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(56, 'gathering off-contract employer intelligence from common quarter labor');
      const result = rollD20('charm', (G.skills.charm||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        G.lastResult = `A man with quarry-scarred hands and a guild pin worn upside-down — the common quarter signal for currently unaffiliated — nods at the description and names a specific employer: a freight consolidator operating out of a bonded yard near the eastern transit road. Overnight loading, casual hire, above-rate cash. "They don't use guild contracts. They use sealed charter authorization instead." He says it like it's a curiosity, not a crime. The charter substitutes for documentation that would leave a labor trail.`;
        addJournal('Common quarter labor: off-guild overnight loader employer identified — charter authorization used', 'evidence', `cq-labor-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The first worker looks away before answering and doesn't answer. The second asks who's asking and doesn't wait for the answer. The third — a woman who was about to sit down — stays standing. The community has heard something about certain employers that made the topic worth avoiding, and whatever they heard, it was persuasive. The conversation ends before it starts. The silence is more informative than anything anyone would have said.`;
        addJournal('Common quarter labor: community warned against discussing certain employers', 'complication', `cq-labor-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.lastResult = `A young man with chalk dust on his forearms confirms the overnight work without much reluctance — he's past the point of worrying about it. "Sealed containers, above rate, no guild form. You don't ask questions when someone pays that well at two in the morning." The containers were heavy and cold to the touch. He worked three of those loads over six weeks, always the same yard, never the same team twice. The employer never gave a name he could verify.`;
        addJournal('Common quarter labor: overnight non-guild sealed container loading confirmed', 'evidence', `cq-labor-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  }
];

var LOW_WARD_STAGE2_ENRICHED_CHOICES = [
  {
    label: "The low ward tracks contraband movement. Someone here knows the suppression compound edge.",
    tags: ['Stealth', 'Stage2'],
    xpReward: 60,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(60, 'tapping low ward informant network for compound distribution intel');
      const result = rollD20('finesse', (G.skills.finesse||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        G.lastResult = `The informant — a thin woman who leans against the low ward's crumbling gatehouse wall and speaks without looking at you — names a distributor and gives a street corner and a time of day. The diluted compound moves through this distributor's hands as a sideline, not a primary business. That's what makes the link useful: the distributor is close enough to the supply chain's overflow to know where volume comes from, but disposable enough to talk. A direct thread back to whoever is managing the surplus.`;
        addJournal('Low ward informant: street distributor named and located — direct compound supply chain link', 'evidence', `lw-informant-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `By the second question, something changes in the alley's atmosphere — a second-floor window closes that wasn't open a moment ago, a woman near the standpipe shifts her weight and looks toward the end of the lane rather than at the water. The low ward has its own awareness systems, built over years of watching who comes in asking what. An information chain moves in parallel to this conversation, and it moves faster. Whatever the ward decides to do with the fact of this visit, it won't require a formal record.`;
        addJournal('Low ward: marked by hostile information chain', 'complication', `lw-informant-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.lastResult = `An older man who buys and resells small goods from a doorway near the low ward's main water pump confirms the compound without much hesitation — it's been circulating long enough that it's stopped being a novelty. "Four months, give or take. Calming stuff. Priced high enough that it's not for the ward." He tilts his head at the question of origin. "Came in already cut. Nobody here is making it." The four-month window matches the timeline from Ironspool.`;
        addJournal('Low ward: compound in street market 4 months — timeline aligned', 'evidence', `lw-informant-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },
  // ── NEW CHOICES (5) ─────────────────────────────────────────────────

  {
    label: "The patrol log skips three nights. The gap lines up with the container transfers.",
    plot: 'main',
    tags: ['Stage2', 'NPC'],
    xpReward: 68,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'cross-referencing constable patrol log gaps with container transfer dates');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.dist_patrol_gap_confirmed = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The constable's patrol log for the low ward sits in an open ledger at the district hall — three nights in the past two months logged as "re-routed, administrative order," each one signed with an authorization code that traces to the Reckoning Quarter magistrate's office rather than the local watch captain. On those same nights, the container transfer records from Ironspool Ward show delivery windows to a bonded yard three streets over. The patrol gaps were arranged. The magistrate's authorization code is written in the same hand on all three entries, dated in advance.`;
        addJournal('Low ward: patrol gap on container transfer nights — Reckoning Quarter magistrate pre-authorized constable re-routing', 'evidence', `dist-patrol-gap-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The duty clerk at the district hall sets the patrol log spine-down on the desk as soon as the relevant dates are mentioned. She doesn't reach for another log or offer to check a secondary record. She writes something on a slip and feeds it through the wall slot behind her. The patrol records for those nights have already been noted by someone who anticipated this inquiry — the slot behind the clerk's left shoulder leads to a box that is emptied twice daily, and today's note will not wait for the afternoon collection.`;
        addJournal('Low ward patrol log inquiry escalated — district hall clerk flagged request', 'complication', `dist-patrol-gap-fail-${G.dayCount}`);
      } else {
        G.flags.dist_patrol_gap_confirmed = true;
        G.investigationProgress++;
        G.lastResult = `The patrol log entries for those three nights are marked "administrative re-route" in a cleaner hand than the surrounding entries — someone copied the notation from a template rather than writing it fresh. The authorization code in the margin is partially legible: two letters and a district prefix that matches the Reckoning Quarter magistrate's standard filing block. Three gaps, three container windows, one authorization source. The match is not proof of arrangement. It is close to it.`;
        addJournal('Low ward patrol log: three gaps with Reckoning Quarter authorization codes matching container transfer nights', 'intelligence', `dist-patrol-gap-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The bonded yard keeper's private ledger has a back column. Every irregular load. Unnamed.",
    plot: 'main',
    tags: ['Stage2', 'NPC'],
    xpReward: 70,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'pressing the bonded yard keeper for off-books intake records');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('charm', (G.skills.charm||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.dist_yard_keeper_turned = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The yard keeper — a heavyset man named Torvel Mast, with a guild pin he turns face-in whenever the subject shifts to money — produces the back-column ledger from a locked drawer beneath the intake desk without much preamble. He is tired of holding it. Three loads in two months: sealed containers, advance payment in coin, a handling note specifying the exact ward patrol window during which delivery was timed. The handling notes are signed with the same charter subsidiary code that appears in the Aurora Heights filings. Torvel keeps his eyes on the wall while you copy the entries. He doesn't ask what you're going to do with them.`;
        addJournal('Bonded yard keeper Torvel Mast: back-column ledger — charter subsidiary code on handling notes, patrol windows pre-specified', 'evidence', `dist-yard-keeper-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Torvel Mast listens with his arms crossed and his weight planted, the posture of a man who has decided before the question ends. He runs an authorized bonded yard — his words — and everything in it is documented to standard. The drawer under the intake desk doesn't move. He's already calculating whether the visit warrants a notification to the yard's charter holder. The answer, from the way he picks up his pen, is yes. Whatever protection the back-column provides him, losing it to outside inquiry isn't worth the alternative.`;
        addJournal('Bonded yard keeper: refused access, notification likely sent to charter holder', 'complication', `dist-yard-keeper-fail-${G.dayCount}`);
      } else {
        G.flags.dist_yard_keeper_turned = true;
        G.investigationProgress++;
        G.lastResult = `Torvel Mast doesn't produce the back ledger, but he confirms it exists — taps the desk over the drawer once with two fingers without looking at it. "Three loads. Timing was specified in advance, down to the patrol window." He pauses. "That's not normal yard intake language." He won't let the entries be copied tonight, but he names the delivery window pattern: always the same three-hour bracket, always on nights that corresponded to the low ward administrative re-routes. He knows what the alignment means. He hasn't decided what to do about it yet.`;
        addJournal('Bonded yard: three loads with pre-specified patrol windows confirmed verbally — back ledger not produced', 'intelligence', `dist-yard-keeper-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The weight-check station keeps a shadow manifest for loads that bypass the standard inspector.",
    tags: ['Stage2', 'NPC'],
    xpReward: 66,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'locating shadow manifests at the eastern transit road weight station');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('finesse', (G.skills.finesse||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.dist_shadow_manifest_found = true;
        G.investigationProgress++;
        G.lastResult = `The weight-check station's overflow room holds a box of manifests folded the wrong way — spine inward, so the routing numbers don't show when the box lid is open. Six manifests in the box: non-agricultural loads listed under grain routing codes, each stamped with a sealed charter authorization that waived the weight inspection requirement. The authorization stamp is the same on all six. The inspector who processed them initialed beside each stamp and didn't log a single one in the standard transit record. His initials are on the last manifest dated four days ago. The loads are still moving.`;
        addJournal('Transit weight station shadow manifests: 6 non-ag loads under grain codes, charter waiver stamp, off-log', 'evidence', `dist-shadow-manifest-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `The weight-check station's day inspector is on his regular round when the visit happens, and someone at the incoming road flag post has already sent a runner ahead. By the time the overflow room question is raised, the station supervisor has appeared at the far end of the corridor — clipboard in hand, moving at the deliberate pace of someone with authority to ask who authorized this visit. The shadow manifests, if they were there, are not visible from the public corridor. The supervisor's question arrives before any answer can.`;
        addJournal('Transit weight station: visit flagged ahead by road post, supervisor intercepted approach', 'complication', `dist-shadow-manifest-fail-${G.dayCount}`);
      } else {
        G.flags.dist_shadow_manifest_found = true;
        G.investigationProgress++;
        G.lastResult = `The overflow room isn't locked — just an unmarked door at the end of the inspection corridor. The box inside holds manifests separated from the main log, folded inward. Four of them visible at a glance: grain routing codes, non-agricultural cargo, charter authorization stamps in the top corner. The inspector who processed them didn't log the weights. The stamp format matches what has appeared in the Aurora Heights records, but the box is shallow and only partially full. More loads than this have moved through here — these are the ones that didn't get filed away properly.`;
        addJournal('Transit weight station: 4 shadow manifests found — charter auth stamp, no weight logs', 'evidence', `dist-shadow-manifest-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The evicted tenant kept her notice papers. She knows who served them.",
    tags: ['Stage2', 'NPC'],
    xpReward: 64,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(64, 'tracing dome terminal eviction to the displaced tenant');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('vigor', (G.skills.vigor||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.dist_tenant_witness = true;
        G.investigationProgress++;
        G.lastResult = `The woman — Bela Croft, still carrying her possessions in two cloth bundles — unfolds the eviction papers from her coat's inner pocket with the practiced care of someone who has unfolded them many times. The housing review carries the Aurora Heights registrar's counter-mark in the lower corner. The server was not a constable: a man in a plain grey coat, no guild mark, no badge, carrying a notary seal she had never seen before. He read the notice aloud and left before she could ask his name. The seal impression in the wax on the notice is not in any public notary register she or her building neighbor checked afterward.`;
        addJournal('Dome terminal eviction witness Bela Croft: Aurora Heights registrar mark on notice, unknown notary seal — server not affiliated with any registered constable body', 'evidence', `dist-tenant-witness-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The low ward's street network moves information quickly, and word of an outsider asking about the dome terminal evictions reaches Bela Croft before the approach. She is gone from the corner where she was reported to stay — two women nearby confirm she moved to another ward this morning, which is not entirely true and also not entirely false. The community is protecting her. Whatever outside attention the eviction drew before, it did not end well enough for her neighbors to trust the next inquiry.`;
        addJournal('Dome terminal eviction witness: community protection, location withheld', 'complication', `dist-tenant-witness-fail-${G.dayCount}`);
      } else {
        G.flags.dist_tenant_witness = true;
        G.investigationProgress++;
        G.lastResult = `Bela Croft produces the eviction notice without being asked — she keeps it folded small in her coat lining. The registrar's counter-mark is in the lower corner, exactly where the Aurora Heights records suggested it would be. The server's description: plain grey coat, notary seal carried in a leather case, no greeting, no guild mark visible. He waited until she had read it before leaving. She tried to find his registration afterward and found nothing. The notice itself is real. The authority behind it is not documented anywhere she could reach.`;
        addJournal('Dome terminal eviction: Bela Croft witness statement — registrar mark confirmed, unregistered notary', 'intelligence', `dist-tenant-witness-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The stamping tool was ordered from a copy house. The order slip survives.",
    tags: ['Stage2', 'NPC'],
    xpReward: 72,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'tracing charter subsidiary stamp manufacture through Scriptorium bindery log');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('spirit', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.dist_stamp_origin_found = true;
        G.investigationProgress++;
        G.lastResult = `The bindery log at the Scriptorium Steps copy house carries an order entry from eleven months ago: a commission for a single-impression seal block, custom-cut to a charter subsidiary format not in any standard catalog. The order was placed under a Mimolot Academy reference number that the bindery accepted without verification — Academy commissions bypass the standard identity check. The delivery address on the order slip is an Iron Ledger Ward box number that was closed two weeks after the stamp was collected. The craftsman who cut the block initials the entry in a hand that shakes slightly; he remembered the commission because the substrate was harder than standard and the caller never came back for a second impression.`;
        addJournal('Scriptorium bindery: custom charter subsidiary seal commissioned under false Academy reference — delivery address closed two weeks post-collection', 'evidence', `dist-stamp-origin-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The bindery supervisor pulls the order log for the relevant period and pages through it while standing, which means she isn't going to offer a seat or a long look. She finds the entry — or finds the gap where it should be. The page is continuous except for a two-line space that has been neatly razored and re-bound, the thread pulled tight and pressed flat. The removal was done with professional care. Whoever cleaned this entry knew the bindery's record-keeping well enough to leave the surrounding entries intact. The log has been visited before this visit.`;
        addJournal('Scriptorium bindery log: order entry razored out — professional removal, prior visit suspected', 'complication', `dist-stamp-origin-fail-${G.dayCount}`);
      } else {
        G.flags.dist_stamp_origin_found = true;
        G.investigationProgress++;
        G.lastResult = `The bindery log entry is intact: a custom seal order, charter subsidiary format, placed eleven months ago under an Academy reference number. The craftsman's initials are in the margin — a small looping signature the supervisor confirms is his without checking twice. The delivery address is listed as an Iron Ledger Ward box; whether that box is still active is a separate question. The order was paid in advance, cash, no receipt copy retained by the customer. The format of the charter subsidiary cut matches the stamping pattern visible on the Aurora Heights filings.`;
        addJournal('Scriptorium bindery: charter subsidiary seal order found — format matches Aurora Heights stamp pattern', 'evidence', `dist-stamp-origin-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Three entries in the intake ledger list the same routing code twice.",
    plot: 'main',
    tags: ['Stage2', 'NPC'],
    xpReward: 68,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'cross-checking dome terminal intake ledger for duplicate routing codes');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.dist_dome_ledger_dupes = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The intake ledger at the dome terminal's freight counter runs three columns: routing code, declared volume, and intake clerk initials. Three entries carry the same routing code as a load processed the previous week. The declared volumes differ by exactly the weight of a standard sealed container rack. The clerk initials on the duplicate entries are the same — a single character pressed hard enough to leave an impression on the page below. Two loads moved through this terminal under a single routing code, on different days, by the same hand. The second load does not appear in the outgoing transit log at all.`;
        addJournal('Dome terminal intake ledger: duplicate routing codes on 3 entries — second load unlogged in transit out, same clerk initials', 'evidence', `dist-dome-ledger-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The freight counter's intake ledger is kept behind the counter, not on the public shelf. The terminal supervisor appears before the question is half-formed — he was notified by the dock hand near the main gate, who noticed the angle of attention before it was conscious. The ledger goes under the counter. A routing inquiry form is produced instead: fill it in, submit it, expect a response within ten working days. The form has no address for the response to reach.`;
        addJournal('Dome terminal freight ledger access blocked — supervisor notification flagged inquiry', 'complication', `dist-dome-ledger-fail-${G.dayCount}`);
      } else {
        G.flags.dist_dome_ledger_dupes = true;
        G.investigationProgress++;
        G.lastResult = `The visible section of the ledger — open on the counter for active intake — shows two entries sharing a routing code from five days apart. The clerk behind the counter pauses when the duplication is pointed out, then runs her finger along the row without committing to an explanation. "Transit code recycling. It happens." The declared volumes on both entries are different, which is not consistent with recycled codes. She closes the ledger before the third column can be read.`;
        addJournal('Dome terminal: duplicate routing codes visible in open ledger, clerk deflected volume discrepancy', 'intelligence', `dist-dome-ledger-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Junior Warden officers resent the patrol re-routing orders. No reason was ever given.",
    plot: 'main',
    tags: ['Stage2', 'NPC'],
    xpReward: 70,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'working a rift in the Warden junior officer cohort over unexplained patrol orders');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('charm', (G.skills.charm||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.dist_warden_faction_split = true;
        G.flags.stage2_faction_wardens = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The junior Warden — Ostet Prule, two years into his posting, still carrying the posture of someone who expected the work to make more sense by now — names his patrol supervisor and the specific authorization code that grounded three watch rotations. He memorized it because it cost him a citation for missing his beat. The code is a Reckoning Quarter magistrate's block, which has no standing to re-route district watch assignments. Ostet knows that. He filed a protocol complaint. The complaint was resolved the same day with a note that read: "authorized through executive provision." He kept the note. He produces it.`;
        addJournal('Warden Ostet Prule: supervisor re-routing code traced to Reckoning Quarter magistrate block — executive provision override note secured', 'evidence', `dist-warden-split-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The junior Warden's expression closes off mid-sentence — not hostile, just the practiced stillness of someone who has learned to recognize a conversation that could land in a report. He straightens the front of his coat and uses the phrase Wardens use when they need to end something without admitting it: "That's an internal matter." The meeting is over. Somewhere in the watch station's notation log, this visit is being recorded by the duty officer who has been watching from the far corridor.`;
        addJournal('Warden junior officer: internal matter deflection, watch notation recorded', 'complication', `dist-warden-split-fail-${G.dayCount}`);
      } else {
        G.flags.dist_warden_faction_split = true;
        G.investigationProgress++;
        G.lastResult = `The junior Warden confirms the re-routing orders without producing documentation — he doesn't have it, and he's not sure his supervisor does either. "The code came through the administrative channel, not the watch channel. That's not standard." He says it carefully, the way someone chooses words when they expect the conversation to be reported. The re-routing on those specific nights pulled three watch rotations off the low ward boundary simultaneously. He notices the coincidence. He has not filed it anywhere.`;
        addJournal('Warden junior officer: three simultaneous low ward patrol re-routes confirmed via non-standard admin channel', 'intelligence', `dist-warden-split-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The night archivist works alone. She has seen what gets filed and pulled before morning.",
    tags: ['Stage2', 'NPC'],
    xpReward: 66,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'approaching the civic hall night archivist for off-hours filing intelligence');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('finesse', (G.skills.finesse||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.dist_night_archivist_turned = true;
        G.investigationProgress++;
        G.lastResult = `The night archivist — she gives a surname only, Weth — sets her lamp on the shelf above the cart she's sorting and keeps her voice at a level designed for empty corridors. Three times in the past two months, items have been filed after the day office closed and removed before it opened. She knows because she logs everything that comes in on the night shift, and three of those logs have been cut from the binding. She kept copies. The copies are folded into the spine of a reference volume she shelved four days ago, third shelf from the left in the eastern annex. She will not retrieve them herself. She tells you where they are.`;
        addJournal('Night archivist Weth: three after-hours filings removed before morning, log pages excised — copies hidden in eastern annex reference volume', 'evidence', `dist-night-arch-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The civic hall's night entrance is a narrow door at the east end of the building, staffed by a single duty clerk whose job is to receive documents, not conversation. The archivist is not available for informal questions during night operations — those are the duty clerk's words, recited at the pace of a notice board posting. The night visit is logged in the entry book by time, by appearance description, and by purpose declared. The purpose declared and the actual purpose are not identical. The log entry is already made.`;
        addJournal('Civic hall night entrance: archivist unavailable, visit logged with appearance description', 'complication', `dist-night-arch-fail-${G.dayCount}`);
      } else {
        G.flags.dist_night_archivist_turned = true;
        G.investigationProgress++;
        G.lastResult = `Weth doesn't stop sorting while she speaks. She uses the same flat tone for the information as for the call numbers she reads aloud to herself as she works. Something gets filed after hours once a week on average — routine enough. What isn't routine: three nights when the morning opening log showed fewer items than her intake record. The difference was small, two or three documents each time. She filed a discrepancy note. It was acknowledged and closed without any notation of what had been removed.`;
        addJournal('Civic hall night archivist: three after-hours document removals logged, discrepancy notes closed without explanation', 'intelligence', `dist-night-arch-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The ghost entity is accepting commodity receipts. It has no warehouse to hold them.",
    tags: ['Stage2', 'NPC'],
    xpReward: 72,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'tracing ghost entity commodity receipts in Ithtananalor trading post ledger');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('spirit', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.dist_ghost_commodity_receipts = true;
        G.investigationProgress++;
        G.lastResult = `The trading post ledger lists the Northern Provision Compact as the accepting party for four commodity receipts over six months — grain, dried stores, one consignment of sealed chemical transport canisters. Every commodity receipt requires a warehouse registration number. The Compact's number does not match any warehouse registered with the port authority, the Iron Ledger Ward records office, or the Ithtananalor civic goods registry. The canisters receipt is stamped with a weight that corresponds exactly to the shadow manifest loads found at the transit weight station. The Compact accepted and moved them through a storage address that does not exist.`;
        addJournal('Ithtananalor trading post: Northern Provision Compact commodity receipts on unregistered warehouse — canister weight matches transit weight station shadow manifests', 'evidence', `dist-trading-post-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The trading post factor — a careful man who keeps his ledgers in a locked cabinet behind his chair rather than the open shelf — listens to the framing of the question and reads something in it that closes him off completely. He runs a bonded post and every transaction in his ledger is already accessible through the Iron Ledger Ward commercial registry. He suggests starting there. He says it pleasantly. The cabinet does not open.`;
        addJournal('Ithtananalor trading post factor: directed to commercial registry, ledger access refused', 'complication', `dist-trading-post-fail-${G.dayCount}`);
      } else {
        G.flags.dist_ghost_commodity_receipts = true;
        G.investigationProgress++;
        G.lastResult = `The open ledger section — visible to registered traders — shows the Northern Provision Compact accepting three commodity receipts in the past six months. The factor confirms the entity's warehouse registration number without looking it up: he had to look it up the first time because it didn't appear in his standard reference. He found it eventually in a provisional registry extension that hadn't been rolled into the main file. He thought that was administrative lag. Provisional extensions expire after ninety days. These receipts are older than that.`;
        addJournal('Ithtananalor trading post: ghost entity warehouse in expired provisional registry, three receipts confirmed', 'intelligence', `dist-trading-post-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The apothecary delivery records and the treatment logs don't tell the same story.",
    tags: ['Stage2', 'NPC'],
    xpReward: 64,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(64, 'cross-referencing apothecary supply volumes against Verdant Row treatment logs');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('vigor', (G.skills.vigor||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.dist_apothecary_supply_gap = true;
        G.investigationProgress++;
        G.lastResult = `The apothecary supplier's delivery record for the past eight months shows two distinct purchasing patterns arriving at the healer collective: the collective's standard restocking orders — documented, variable, consistent with patient load — and a separate monthly delivery of two items, fixed quantity, not correlated with any treatment spike. The second delivery is billed to a collective sub-account that the senior healer doesn't appear in the signed authorization ledger for. Someone opened a sub-account in the collective's name and has been running a monthly compound delivery through it. The supplier confirms the sub-account was opened with a collective seal impression.`;
        addJournal('Apothecary supplier: unauthorized sub-account under collective seal — monthly fixed-quantity deliveries, not linked to patient caseload', 'evidence', `dist-apothecary-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The apothecary supplier is a private business and his client records are not public. He says this without apology, setting his pen down and folding his hands over his order book. He has a relationship with the healer collective and he values it enough not to have outside parties reviewing their purchasing history. The refusal is businesslike. Before the day ends, the collective's senior healer will likely hear that someone came asking about the supply account. That conversation will be uncomfortable in ways that close other doors.`;
        addJournal('Apothecary supplier: client records refused, likely notification to collective', 'complication', `dist-apothecary-fail-${G.dayCount}`);
      } else {
        G.flags.dist_apothecary_supply_gap = true;
        G.investigationProgress++;
        G.lastResult = `The apothecary supplier pages through his delivery ledger and stops at two consecutive entries, eight months apart, both marked with a sub-account code he points to but does not read aloud. "Same quantity each month. Not tied to any treatment run I was told about." He closes the ledger to the spine before the account code resolves. He won't confirm the account name, but he counts the deliveries on his fingers: eight. Eight months of fixed-quantity deliveries to a sub-account he was told was for research restocking. Research restocking is variable. This was not.`;
        addJournal('Apothecary: 8 months of fixed-quantity sub-account deliveries to collective, described as research restocking', 'intelligence', `dist-apothecary-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The route supervisor was removed after filing a discrepancy report. He kept a copy.",
    tags: ['Stage2', 'NPC'],
    xpReward: 68,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'locating the disgraced courier supervisor and his discrepancy report copy');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('charm', (G.skills.charm||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.dist_courier_supervisor_turned = true;
        G.investigationProgress++;
        G.lastResult = `Harvan Coss finds you before you finish looking — he has been in the ward long enough to hear when someone else is asking about the courier route. He produces the copy from an oilskin sleeve inside his coat without being asked. The manifest discrepancy report documents three loads that were logged as delivered to addresses that, when he checked, did not accept deliveries on those dates. The receiving signatures on two of them are in the same hand. His original report was filed with the route supervisor's office. His termination notice arrived four days later, citing poor performance. The copy of his termination notice is also in the oilskin sleeve.`;
        addJournal('Courier supervisor Harvan Coss: discrepancy report on 3 undelivered loads, forged receiving signatures — terminated 4 days after filing, copy secured', 'evidence', `dist-courier-sup-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The courier route supervisor's former address in the low ward is a room above a laundry, currently occupied by a different tenant who moved in six weeks ago. The laundry owner below confirms Harvan Coss left the ward but does not know where. He left quickly and did not say goodbye. Two men came the day before he left; they waited outside the building for two hours and then left when he didn't come back. He took everything with him that fit in a single satchel and has not been seen since.`;
        addJournal('Courier supervisor Harvan Coss: left ward suddenly 6 weeks ago after surveillance, location unknown', 'complication', `dist-courier-sup-fail-${G.dayCount}`);
      } else {
        G.flags.dist_courier_supervisor_turned = true;
        G.investigationProgress++;
        G.lastResult = `Harvan Coss is still in the ward and confirms the meeting, though he names a time and a place that requires a two-hour wait. When he arrives he keeps his coat on and his back to a wall. He describes the discrepancy: loads logged as delivered to addresses he physically visited afterward — none of them showed a receiving record, one of them was a vacant commercial unit. He does not have the copy with him. He confirms it exists and that he is not ready to hand it to anyone he hasn't had time to assess. He'll meet again in two days.`;
        addJournal('Harvan Coss: confirmed discrepancies on 3 courier loads, copy of report exists — second meeting in 2 days', 'intelligence', `dist-courier-sup-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The estate solicitor mentioned the charter holder family once. She didn't finish the sentence.",
    tags: ['Stage2', 'NPC'],
    xpReward: 66,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'pressing the Aurora Heights estate solicitor on her incomplete statement about the charter holder family');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('charm', (G.skills.charm||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.dist_solicitor_second_pass = true;
        G.investigationProgress++;
        G.lastResult = `The solicitor — Mave Orren, independent adviser, works from a room in the Pale Annex of Aurora Heights — sets her pen down the moment the unfinished sentence is mentioned. She remembers it. "I stopped because the name was sufficient and anything further would have been assessment." She completes it now: the dissolved house held the charter through a surviving son who was formally adjudicated incompetent seven years ago. Legal incompetence means the charter transferred to a court-appointed administrator. No public record names the administrator. She filed a query to the estate registry three years ago and received a sealed response citing administrative confidentiality. She kept the letter.`;
        addJournal('Aurora Heights solicitor Mave Orren: dissolved house charter held by incompetency-adjudicated heir, court administrator unnamed — sealed registry response confirmed', 'evidence', `dist-solicitor-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Mave Orren is not available — her door is answered by a junior clerk who takes the name and the request and closes the door while writing it down. Within the hour, a message arrives at the counter of wherever the day was spent: professional obligations prevent further discussion of matters related to that area of inquiry. The phrasing is precise and attorney-registered. Whatever Orren is protecting by not finishing that sentence, she has now formally protected it.`;
        addJournal('Aurora Heights solicitor: formal professional refusal issued — further approach declined', 'complication', `dist-solicitor-fail-${G.dayCount}`);
      } else {
        G.flags.dist_solicitor_second_pass = true;
        G.investigationProgress++;
        G.lastResult = `Mave Orren agrees to the meeting and sits across from you with her hands flat on her own file. She will confirm what is already a matter of public record: the house that held the charter was dissolved, and dissolution does not automatically extinguish a registered legal charter. The charter transferred. To whom is sealed. She did not finish the sentence the first time because finishing it would have been an opinion, and she operates in facts. The sealed transfer is a fact. The identity of the receiving party is, technically, also a fact — just not one she has access to.`;
        addJournal('Aurora Heights solicitor: charter transfer confirmed on dissolution, receiving party sealed — solicitor has no access', 'intelligence', `dist-solicitor-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Workers who handled off-books cargo for extra pay know more than they told their handlers.",
    tags: ['Combat', 'Stealth', 'Stage2'],
    xpReward: 58,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(58, 'pressing low ward off-books cargo workers');
      var result = rollD20('might', (G.skills.might||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        G.lastResult = `A worker with a crooked jaw and hands that haven't quite healed right leans back in his chair and stares at the ceiling while he talks. One container seal blew during transit — a dry failure, not a chemical one, but it pulled the lid up for a few seconds. "Racks inside. Padded. Rows of vials, each one labeled." He taps his forearm where the label would have been. The notation was a dosage figure. Below it, a Soreheim military classification stamp in standard command red. He closed the lid and said nothing to anyone for four months.`;
        addJournal('Low ward worker: container interior glimpsed — vials with dosage notations, Soreheim military stamp', 'evidence', `lw-labor-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The approach reads wrong from the first word — too insistent, too close in a space where the low ward's norms require more distance. The worker's posture closes off immediately and he looks past you rather than at you. By the time the conversation ends, a street-level complaint is already moving through the informal network that handles such things here: someone asking questions aggressively, pushing for answers people aren't giving freely. Local attention arrives before you've crossed two streets.`;
        addJournal('Low ward: intimidation complaint filed, local attention drawn', 'complication', `lw-labor-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.lastResult = `The worker nods slowly, arms crossed, choosing each word. Heavy for the size — not tools, not grain, not the right kind of heavy. Cold to the touch in a way that wasn't weather. A handling sheet came with the load, handwritten rather than printed, and the instructions were specific about angles and storage orientation. Nobody explained why. He followed them because the pay was good and the explanation wasn't required. The sheet wasn't collected afterward; he lost it somewhere in the ward.`;
        addJournal('Low ward: unusual container confirmed — cold, heavy, unexplained handling requirements', 'evidence', `lw-labor-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  }
];

// ── DISTRICT EXPANSION CHOICES (15 new sp2 increments) ─────────────────

// Added to AURORA_HEIGHTS extension
AURORA_HEIGHTS_STAGE2_ENRICHED_CHOICES.push(
  {
    id: 'dist_ah_registry_ghost_confirmation',
    label: 'The registry records a dissolved entity as active. Someone keeps paying the filing fee.',
    plot: 'main',
    xpReward: 20,
    tag: 'risky',
    skill: 'wits',
    fn: function() {
      var roll = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      var xpReward = roll.isCrit ? 45 : roll.isFumble ? 10 : 30;
      gainXp(xpReward, 'tracing active entity maintenance payments in Aurora Heights registry');
      if (roll.isCrit) {
        G.stageProgress[2] = (G.stageProgress[2]||0) + 2;
        addJournal('Aurora Heights registry: dissolved house annual maintenance fee paid for three consecutive years post-dissolution — payment sourced to Iron Ledger Ward financial account.', 'evidence');
        G.lastResult = 'The noble registry levies an annual maintenance fee to keep a charter entity active in the registry rolls. The dissolved house has had that fee paid for three consecutive years — well after the dissolution date. The payment source, logged under the registry\'s routine annual transaction record, is an Iron Ledger Ward financial account number. The registry clerk did not flag the payment as anomalous because the fee was correct and the account was solvent. A dead entity has been maintained, deliberately, by a live account the dissolution papers never closed.';
      } else if (roll.isFumble) {
        G.worldClocks = G.worldClocks || {};
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'The registry clerk pulls the maintenance fee transaction log and pauses on the relevant column. She sets the log back on the shelf before answering. Payment records for active entities are administratively confidential — releasing them outside a formal audit process would expose the registry to a penalty under the Aurora Heights charter confidentiality ordinance. She describes the ordinance in detail. The fee log goes back where it came from.';
      } else {
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        addJournal('Aurora Heights registry: dissolved house maintenance fees paid post-dissolution — source account not disclosed, payment confirmed active.', 'intelligence');
        G.lastResult = 'The registry clerk confirms — without showing the payment log — that the maintenance fee for the entity in question is current. She will not confirm the source. She checks twice before answering, which means she already knows the entry is irregular and has decided on the shape of her answer in advance. The entity is not lapsed. Someone is keeping it active. The fee amount and the regularity of payment are consistent with an institutional payer, not an individual.';
      }
      maybeStageAdvance();
      loadStageChoices();
    }
  }
);

// Added to IRONSPOOL_WARD extension
IRONSPOOL_WARD_STAGE2_ENRICHED_CHOICES.push(
  {
    id: 'dist_iron_guild_stamp_forgery',
    label: 'The modified containers carry a guild certification stamp. That stamp was not requested.',
    plot: 'main',
    xpReward: 20,
    tag: 'risky',
    skill: 'spirit',
    fn: function() {
      var roll = rollD20('spirit', (G.skills.spirit||0) + Math.floor(G.level/3));
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      var xpReward = roll.isCrit ? 45 : roll.isFumble ? 10 : 30;
      gainXp(xpReward, 'tracing unauthorized guild certification on modified containers');
      if (roll.isCrit) {
        G.stageProgress[2] = (G.stageProgress[2]||0) + 2;
        addJournal('Ironspool Ward: modified containers stamped with guild certification that was never filed — stamp issued by suspended certification officer, three months after suspension.', 'evidence');
        G.lastResult = 'The guild certification stamp on the modified containers traces to a certification officer who was suspended from practice eight months ago for procedural violations. His stamp code is live in the registry because no one filed the suspension in the certification database — a separate system from the disciplinary record. He issued three certifications in the two months after his suspension: all three cover the same container modification spec. The certifications are technically valid by database, null by authority. The gap between those two facts was the operational window.';
      } else if (roll.isFumble) {
        G.worldClocks = G.worldClocks || {};
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'The guild certification office handles stamp verification through a formal inquiry process that takes four working days. The officer at the inquiry counter accepts the request, notes the stamp code, and marks it for review. Whatever the review finds, it will go to the certification database administrator, not to the requesting party. The stamp on the modified containers is now flagged for review by the same institution that issued it. The outcome will not be visible from outside.';
      } else {
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        addJournal('Ironspool: container certification stamp traced to inactive officer code — certification dated after officer went off-register.', 'intelligence');
        G.lastResult = 'The stamp code cross-references in the guild certification database to an officer name and a date. The date on the certification is four months after the officer\'s last active registration entry. Either the officer continued issuing stamps without active status, or the stamp was applied by someone who had access to his tools. Both possibilities mean the certification is not what it appears. The container modifications carry paperwork designed to pass a quick check without surviving a close one.';
      }
      maybeStageAdvance();
      loadStageChoices();
    }
  }
);

// Added to VERDANT_ROW extension
VERDANT_ROW_STAGE2_ENRICHED_CHOICES.push(
  {
    id: 'dist_vr_suppression_notice_source',
    label: 'The "Northern Glyph Oversight Commission" left a physical address. It does not exist.',
    plot: 'main',
    xpReward: 20,
    tag: 'risky',
    skill: 'wits',
    fn: function() {
      var roll = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      var xpReward = roll.isCrit ? 45 : roll.isFumble ? 10 : 30;
      gainXp(xpReward, 'tracing the Northern Glyph Oversight Commission return address');
      if (roll.isCrit) {
        G.stageProgress[2] = (G.stageProgress[2]||0) + 2;
        addJournal('Verdant Row: suppression notice return address is an empty building — postal service accepted delivery without verification, building leased under charter subsidiary name.', 'evidence');
        G.lastResult = 'The address on the suppression notice is a building in the Iron Ledger Ward transit corridor. The building exists: a narrow commercial structure, two stories, ground floor currently empty. The postal service delivered the notice from this address because the letterhead was legitimate-form and the postage was paid. The building lease was filed with the Iron Ledger Ward property office under the same charter subsidiary code from the Aurora Heights records. The entity that suppressed the healers\' findings holds a lease on a building it has never used for anything but a mailing address.';
      } else if (roll.isFumble) {
        G.worldClocks = G.worldClocks || {};
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'The building at the return address has a new lock and a property management sign in the window. The management company is a registered entity, distinct from whatever sent the notice. The property manager, reached through the management company number, declines to discuss current or former lessees without a formal request through the property registry. The request takes five days. Whoever used this address anticipated the inquiry and transferred the lease before it arrived.';
      } else {
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        addJournal('Northern Glyph Oversight Commission return address is empty commercial building — postal service confirmed outgoing deliveries from this address.', 'intelligence');
        G.lastResult = 'The building at the return address on the suppression notice is a two-story commercial unit, ground floor empty, windows clean. A postal service routing label on the door confirms it as an outgoing mail point — packages accepted here, delivered from here. The postal clerk on the street nearby knows the address only by the regular morning collection. No occupant is ever present for the collection: the outgoing mail is left in a sealed box inside the entry. Someone maintains the correspondence infrastructure for this address without ever being seen at it.';
      }
      maybeStageAdvance();
      loadStageChoices();
    }
  }
);

// Added to GRANARY_STEPS extension
GRANARY_STEPS_STAGE2_ENRICHED_CHOICES.push(
  {
    id: 'dist_granary_false_weight_pattern',
    label: 'The manifest weights cluster at exactly the exemption threshold. That precision is intentional.',
    plot: 'main',
    xpReward: 20,
    tag: 'safe',
    skill: 'wits',
    failResult: 'The manifest batch files for the past two months are in active administrative review. External access during an active cycle is suspended under Granary Steps records protocol. The files that would show the weight clustering are precisely the ones locked for internal review.',
    fn: function() {
      var roll = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      var xpReward = roll.isCrit ? 45 : roll.isFumble ? 10 : 30;
      gainXp(xpReward, 'analyzing manifest weight distribution at Granary Steps threshold');
      if (roll.isCrit) {
        G.stageProgress[2] = (G.stageProgress[2]||0) + 2;
        addJournal('Granary Steps: fraudulent manifests all declare weight within two kilos of agricultural inspection exemption threshold — statistically impossible as coincidence.', 'evidence');
        G.lastResult = 'Eleven fraudulent manifests, spread across two months, each with a different declared commodity. Twelve different submitters. One thing in common: every declared weight lands within two kilos of the agricultural inspection exemption threshold — the weight below which cargo passes without physical check. Statistically, legitimate loads cluster around their actual weights, not administrative thresholds. Every single load landing just below the threshold means someone calculated each declaration against the cutoff, not against the cargo. The exemption system was gamed systematically, by multiple parties working from the same number.';
      } else if (roll.isFumble) {
        G.lastResult = 'The manifest batch files for the past two months are in active administrative review — a routine audit cycle that happens every quarter. External access during an active review is suspended under the Granary Steps records protocol. The review takes three weeks. The batch files that would show the weight clustering pattern are exactly the ones currently locked for internal review. The timing is either coincidental or it isn\'t.';
      } else {
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        addJournal('Granary Steps: seven manifests declare weight at or just below exemption threshold — pattern warrants further weight cross-check.', 'intelligence');
        G.lastResult = 'Seven manifests visible in the open section of the batch log, each declaring a weight that sits just below the agricultural inspection exemption threshold. The variance between the lowest and the highest declared weight across all seven is smaller than the variance in a single legitimate grain convoy. Real cargo does not weigh almost exactly the same amount across seven separate loads by seven separate parties. Something is calibrating the declarations, and the calibration point is the threshold.';
      }
      maybeStageAdvance();
      loadStageChoices();
    }
  }
);

// Added to IRON_LEDGER_WARD extension
IRON_LEDGER_WARD_STAGE2_ENRICHED_CHOICES.push(
  {
    id: 'dist_ilw_escrow_withdrawal_pattern',
    label: 'The escrow account sends funds in irregular bursts. Each burst follows a compound shipment.',
    plot: 'main',
    xpReward: 20,
    tag: 'risky',
    skill: 'wits',
    fn: function() {
      var roll = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      var xpReward = roll.isCrit ? 45 : roll.isFumble ? 10 : 30;
      gainXp(xpReward, 'tracing escrow account withdrawal timing against compound shipment schedule');
      if (roll.isCrit) {
        G.stageProgress[2] = (G.stageProgress[2]||0) + 2;
        addJournal('Iron Ledger Ward escrow: outgoing transfers post-date compound shipment confirmations by 3 days consistently — payment-on-delivery structure for suppression compound distribution.', 'evidence');
        G.lastResult = 'The public-facing disbursement summary for the Northern Provision Compact account — required to be posted at the Iron Ledger Ward transit office under transparency protocol — shows seven outgoing transfers over six months. Laid alongside the container transit records from the shadow manifests, a three-day lag appears consistently between each confirmed shipment and the corresponding outgoing transfer. Payment-on-delivery, logged three days after the delivery window closes. The escrow account is not an administrative holding structure. It is a live payment system for active compound distribution.';
      } else if (roll.isFumble) {
        G.worldClocks = G.worldClocks || {};
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = 'The Iron Ledger Ward transit office is mid-audit cycle — the Shadowhands review that began two sessions ago has not concluded. The public disbursement summary has been removed from the posting board for the duration of the audit. The posting board carries a Shadowhands seal in the frame where the summary normally hangs. Whatever the audit is examining, it covers the exact document needed. The audit will conclude when it concludes.';
      } else {
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        addJournal('Iron Ledger Ward: escrow account outgoing transfers logged at irregular intervals — timing consistent with post-delivery payment schedule.', 'intelligence');
        G.lastResult = 'The posted disbursement summary is available in the transit office lobby — required transparency posting. Seven outgoing transfers, irregular dates, irregular amounts. The irregular amounts are consistent with per-unit delivery pricing rather than fixed administration costs. None of the outgoing transfers correspond to any publicly filed service contract. An account that disburses at irregular intervals in irregular amounts with no filed contract is paying for something that was never formally agreed.';
      }
      maybeStageAdvance();
      loadStageChoices();
    }
  }
);

// Added to RECKONING_QUARTER extension
RECKONING_QUARTER_STAGE2_ENRICHED_CHOICES.push(
  {
    id: 'dist_rq_magistrate_authorization_chain',
    label: 'The magistrate who authorized the patrol re-routes has a superior who does not know.',
    plot: 'main',
    xpReward: 20,
    tag: 'bold',
    skill: 'charm',
    fn: function() {
      var roll = rollD20('charm', (G.skills.charm||0) + Math.floor(G.level/3));
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      var xpReward = roll.isCrit ? 45 : roll.isFumble ? 10 : 30;
      gainXp(xpReward, 'approaching the Reckoning Quarter magistrate supervisor about unauthorized authorizations');
      if (roll.isCrit) {
        G.stageProgress[2] = (G.stageProgress[2]||0) + 2;
        G.flags.dist_magistrate_superior_turned = true;
        addJournal('Reckoning Quarter: senior magistrate confirms subordinate lacked authority to issue district watch re-routes — opened internal review, will cooperate with evidence presentation.', 'evidence');
        G.lastResult = 'The senior magistrate is a methodical man who runs his office with the attention of someone who expects to be held accountable for what leaves it. He listens to the authorization code sequence with increasing stillness. His subordinate\'s code block does not extend to cross-district watch re-routing — that authority sits two levels higher. He reads the code against his own reference table twice. "This was not issued through my office." He opens a review file on his desk while the conversation is still happening. He will cooperate with any formal presentation of evidence. He wants his office\'s name separated from this.';
      } else if (roll.isFumble) {
        G.worldClocks = G.worldClocks || {};
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'The magistrate\'s senior clerk intercepts the approach before the office door is reached and channels it into the formal inquiry queue. Requests about magistrate authorization records go through the judicial records office, not the magistrate\'s personal staff. The queue runs six working days. The senior magistrate is available by appointment for parties with formal standing in active proceedings, which this approach does not have. The clerk takes the name and closes the anteroom door.';
      } else {
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        addJournal('Reckoning Quarter: senior magistrate acknowledged authorization code anomaly — would not confirm details but did not deny review interest.', 'intelligence');
        G.lastResult = 'The senior magistrate does not confirm or deny the subordinate authorization on the first meeting. He confirms that he knows the code format and that his office maintains records of all authorizations issued under his jurisdiction. He suggests a formal inquiry request. The suggestion is made with enough precision — naming the specific code prefix that would need to appear in such a request — that it is not a brush-off. He is telling you what form the question needs to take before he can answer it on record.';
      }
      maybeStageAdvance();
      loadStageChoices();
    }
  }
);

// Added to SCRIPTORIUM_STEPS extension
SCRIPTORIUM_STEPS_STAGE2_ENRICHED_CHOICES.push(
  {
    id: 'dist_ss_scholar_cross_reference',
    label: 'Three researchers have assembled the same picture from different pieces. They need to compare.',
    plot: 'main',
    xpReward: 20,
    tag: 'safe',
    skill: 'charm',
    failResult: 'Quenra Quillfire is mid-review cycle, Toman Iceveil is at the transit archive, and Serin Sunweave is unavailable until tomorrow. The window that would allow all three in the same room does not open today. The comparison waits.',
    fn: function() {
      var roll = rollD20('charm', (G.skills.charm||0) + Math.floor(G.level/3));
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      var xpReward = roll.isCrit ? 45 : roll.isFumble ? 10 : 30;
      gainXp(xpReward, 'convening the three independent Scriptorium researchers');
      if (roll.isCrit) {
        G.stageProgress[2] = (G.stageProgress[2]||0) + 2;
        G.flags.dist_scholars_convened = true;
        addJournal('Three Scriptorium scholars cross-compared findings — confirmed shared charter entity across three independent research threads. Scholarly consensus established.', 'evidence');
        G.lastResult = 'Quenra Quillfire brings the compound analysis. Toman Iceveil brings the administrative transit records. Serin Sunweave brings the genealogical research on the dissolved house. Set side by side in Quenra\'s cramped research room, the three bodies of work triangulate on a single entity: the same charter subsidiary, appearing independently in chemical supply chains, administrative override filings, and the estate records of a house that formally does not exist. The three scholars have been working in parallel without knowing it. The convergence is not theory. Each has a different physical document confirming the same center.';
      } else if (roll.isFumble) {
        G.worldClocks = G.worldClocks || {};
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'Quenra Quillfire is the right starting point, but she is in the middle of a term submission review that runs another four days. Toman Iceveil is at the transit archive across the city until evening. The convening requires all three available simultaneously — that is the only way the comparison works — and today has not produced that window. The delay is ordinary academic timing, not resistance. The meeting will happen. It will happen later.';
      } else {
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.flags.dist_scholars_convened = true;
        addJournal('Scriptorium scholars cross-reference: two of three assembled, third pending — partial overlap confirms shared charter entity across two research threads.', 'intelligence');
        G.lastResult = 'Quenra and Toman compare findings without Serin — she is held up at the transit archive. Two threads, two separate bodies of research, the same charter subsidiary appearing in both from different angles. Quenra found it in compound supply chain documentation. Toman found it in administrative approval chains for transit overrides. The entity is the connection between a chemical operation and an administrative one. The third thread will close the loop when Serin returns. Two out of three is already not coincidence.';
      }
      maybeStageAdvance();
      loadStageChoices();
    }
  }
);

// Added to HIGH_QUARTER extension
HIGH_QUARTER_STAGE2_ENRICHED_CHOICES.push(
  {
    id: 'dist_hq_patron_faction_network',
    label: 'A high quarter patron funds the charter research. She wants the finding before anyone else.',
    plot: 'main',
    xpReward: 20,
    tag: 'bold',
    skill: 'charm',
    fn: function() {
      var roll = rollD20('charm', (G.skills.charm||0) + Math.floor(G.level/3));
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      var xpReward = roll.isCrit ? 45 : roll.isFumble ? 10 : 30;
      gainXp(xpReward, 'navigating high quarter patron offer for exclusive charter finding');
      if (roll.isCrit) {
        G.stageProgress[2] = (G.stageProgress[2]||0) + 2;
        G.flags.dist_high_quarter_patron = true;
        addJournal('High quarter patron Essa Forren committed full research access in exchange for first disclosure rights — hostile to charter entity, rival house interest confirmed.', 'evidence');
        G.lastResult = 'Essa Forren is the kind of patron who keeps her interests invisible until the moment she lets you see one. She sits across the inlaid table in the Pale Annex drawing room and slides a letter of introduction toward you without preamble — access to the Forren family archive, the Aurora Heights estate filing library, and two private scholars who have been researching the dissolved house for three years on her commission. She wants the final finding before publication. Her interest is not civic: the dissolved house\'s estate administrator blocked a land arbitration her family has been pursuing for six years. She wants the charter entity named and its authority dissolved.';
      } else if (roll.isFumble) {
        G.lastResult = 'Essa Forren\'s social secretary intercepts the meeting request and converts it into a card left at the drawing room door: a polite note that Lady Forren is not presently accepting unsolicited research consultations. The card is cream-colored, the handwriting formal, and the intent clear. In this circuit, unsolicited means unvouched. Whoever arranged the introduction did not carry the weight needed to open this door. The drawing room stays closed.';
      } else {
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.flags.dist_high_quarter_patron = true;
        addJournal('High quarter patron expressed interest in charter entity exposure — offered conditional archive access, terms under negotiation.', 'intelligence');
        G.lastResult = 'Essa Forren holds the letter of introduction long enough to read it twice and sets it face down before responding. She does not confirm her commission but does not deny it either. She speaks about the dissolved house\'s estate administrator with a specificity that is its own confirmation. What she offers is conditional — preliminary archive access, terms to be negotiated at a second meeting with her solicitor present. The offer is real. The conditions attached to it are the part that requires careful reading.';
      }
      maybeStageAdvance();
      loadStageChoices();
    }
  }
);

// Added to COMMON_QUARTER extension
COMMON_QUARTER_STAGE2_ENRICHED_CHOICES.push(
  {
    id: 'dist_cq_transit_node_discovery',
    label: 'The transit node alcove near the market has had new hardware bolted to it.',
    plot: 'main',
    xpReward: 20,
    tag: 'risky',
    skill: 'vigor',
    fn: function() {
      var roll = rollD20('vigor', (G.skills.vigor||0) + Math.floor(G.level/3));
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      var xpReward = roll.isCrit ? 45 : roll.isFumble ? 10 : 30;
      gainXp(xpReward, 'examining new hardware at the common quarter transit node alcove');
      if (roll.isCrit) {
        G.stageProgress[2] = (G.stageProgress[2]||0) + 2;
        addJournal('Common quarter transit alcove: new iron mounting brackets installed recently — dimensions match sealed container staging rack, not standard transit equipment.', 'evidence');
        G.lastResult = 'The alcove is built into the market wall at the transit node junction, registered as a resting point for cart-pullers changing shift. The new iron brackets bolted to the inner wall are not cart-rest hardware — they are mounting points, configured in the horizontal-and-vertical grid pattern of a container staging rack. The bolt holes are clean, drilled within the week. The bracket dimensions match standard container-rack width exactly. The alcove is being fitted as a temporary container staging point at one of the busiest transit junctions in the common quarter. The installation is not yet complete. Whoever ordered it expects to use it soon.';
      } else if (roll.isFumble) {
        G.lastResult = 'The alcove is occupied by two cart-pullers on break, lunch spread between them, who object loudly to the attention on the wall hardware. Their objection carries far enough to bring a market constable over. The constable does not cite anything, but notes the wall examination in his patrol log — unauthorized inspection of transit infrastructure is a gray area, and he decides by logging it rather than citing. The cart-pullers watch the departure. The hardware examination is now a logged incident in the market constabulary record.';
      } else {
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        addJournal('Common quarter transit alcove: new bolt hardware visible on inner wall — installation pattern inconsistent with standard cart-rest fittings.', 'intelligence');
        G.lastResult = 'The new bolt holes are visible from the alcove entrance without entering — the iron brackets catch the market torchlight at an angle that makes the fresh metal obvious. The bracket configuration is not standard transit-node equipment. Cart-rest hardware mounts at handle height; these brackets sit at mid-chest and knee level, in the paired configuration that holds a rack. One cart-puller nearby watches the examination without comment. He has seen the installation happening but was not told what it is for.';
      }
      maybeStageAdvance();
      loadStageChoices();
    }
  },
  {
    id: 'dist_cq_guild_post_faction',
    label: 'The guild post clerk knows which firms skip the intake window.',
    plot: 'main',
    xpReward: 20,
    tag: 'safe',
    skill: 'charm',
    failResult: 'Peva Thorns handles the post intake window at full queue pace and does not have space for an unsolicited conversation. Guild intake records are not public record. The queue builds behind the exchange and she returns to it without further comment.',
    fn: function() {
      var roll = rollD20('charm', (G.skills.charm||0) + Math.floor(G.level/3));
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      var xpReward = roll.isCrit ? 45 : roll.isFumble ? 10 : 30;
      gainXp(xpReward, 'building rapport with the guild post intake clerk');
      if (roll.isCrit) {
        G.stageProgress[2] = (G.stageProgress[2]||0) + 2;
        G.flags.dist_guild_post_clerk_turned = true;
        addJournal('Common quarter guild post: intake clerk Peva Thorns identified three firms that bypass standard intake using charter authorization — all three linked to same subsidiary code.', 'evidence');
        G.lastResult = 'Peva Thorns has worked the guild post intake window for nine years. She opens her personal tracking log — not the official one, a small cloth-covered book she keeps under the counter — and reads from it without looking up. Three firms that bypass the standard intake window using charter authorization instead of guild forms. She started tracking them because the charter authorizations all carry the same subsidiary code, which does not appear in any guild registration directory she has access to. Three firms, same code, all moving cargo through the transit node without a guild record. She wants to know what the code is. She will share everything she has in exchange for that answer.';
      } else if (roll.isFumble) {
        G.lastResult = 'Peva Thorns handles the post intake window with the tempo of someone who has been managing a queue since before the morning meal. The conversation starts well, but the second specific question shifts her register — she stops writing and looks up. Intake records are guild property, not public record, and sharing them with parties not in an active guild filing involves a protocol she cannot shortcut. She says it without apology. The queue behind builds up during the exchange. She returns to it.';
      } else {
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.flags.dist_guild_post_clerk_turned = true;
        addJournal('Common quarter guild post: intake clerk confirmed charter authorization bypass by at least two firms — subsidiary code appears on each authorization.', 'intelligence');
        G.lastResult = 'Peva Thorns confirms the bypass without producing the tracking log. Two firms she can name — she will not write them down here. Both use charter authorization in place of guild intake forms. She knows because her job is to log the form type, and charter authorization is rare enough that she notices it every time. Both firms use the same authorization format. She has been waiting to see if anyone else noticed. She suggests a second conversation somewhere that is not the guild post window.';
      }
      maybeStageAdvance();
      loadStageChoices();
    }
  }
);

// Added to LOW_WARD extension (3 more)
LOW_WARD_STAGE2_ENRICHED_CHOICES.push(
  {
    id: 'dist_lw_ward_elder_reckoning',
    label: 'The ward elder has seen three rounds of outside inquiry. She knows the pattern.',
    plot: 'main',
    xpReward: 20,
    tag: 'safe',
    skill: 'charm',
    failResult: 'Cosset is not at the water pump bench today. The neighbor who usually knows her whereabouts says she is visiting a relative in the upper ward. The ward has registered the inquiry and is waiting to see what kind of inquiry it is before deciding what to do with it.',
    fn: function() {
      var roll = rollD20('charm', (G.skills.charm||0) + Math.floor(G.level/3));
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      var xpReward = roll.isCrit ? 45 : roll.isFumble ? 10 : 30;
      gainXp(xpReward, 'meeting the low ward elder who has tracked three rounds of outside interest');
      if (roll.isCrit) {
        G.stageProgress[2] = (G.stageProgress[2]||0) + 2;
        G.flags.dist_ward_elder_alliance = true;
        addJournal('Low ward elder Cosset confirms three prior inquiry groups — first two disappeared, third left quietly. She will provide ward access and community confirmation in exchange for genuine exposure.', 'evidence');
        G.lastResult = 'Cosset is seventy and has lived in the low ward for fifty of those years, which means she has watched what happens to people who ask questions about certain things. The first group: two people, six months ago, asked about the overnight cargo. Disappeared from the ward the following week. The second group: a single researcher, left quietly after a letter arrived at her address. The third group is the present inquiry. Cosset has been watching the approach for two days. She will provide unrestricted ward access — people will speak who would not speak to an outsider — in exchange for a commitment to expose whatever is found, rather than file and withdraw.';
      } else if (roll.isFumble) {
        G.worldClocks = G.worldClocks || {};
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'Cosset is not in the location she was said to use. The neighbor who usually knows her whereabouts says she is visiting a relative in the upper ward. Two people nearby follow the departure from the low ward at a distance long enough to be noted but not long enough to be confronted. The ward elder knows an inquiry has come. She has chosen to be somewhere else while she decides what to do about it. The visit has been registered by the ward\'s own awareness network.';
      } else {
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.flags.dist_ward_elder_alliance = true;
        addJournal('Low ward elder: acknowledged prior inquiry groups and current awareness — willing to facilitate ward access if approach proves credible.', 'intelligence');
        G.lastResult = 'Cosset receives the visit at a bench outside the water pump, which means it is a public meeting — nothing said here is secret, but nothing said here can be denied later. She asks two questions before answering any: who else has been told, and what happens when the filing is done. She is not hostile; she is assessing exit risk. The ward has been the site of inquiry before, and the ward absorbed the consequences while the inquirers left. She will help if she believes the help goes somewhere. She is not yet sure it does.';
      }
      maybeStageAdvance();
      loadStageChoices();
    }
  },
  {
    id: 'dist_lw_eviction_paper_trail',
    label: 'Five low-ward evictions share the same notary mark.',
    plot: 'main',
    xpReward: 20,
    tag: 'risky',
    skill: 'vigor',
    fn: function() {
      var roll = rollD20('vigor', (G.skills.vigor||0) + Math.floor(G.level/3));
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      var xpReward = roll.isCrit ? 45 : roll.isFumble ? 10 : 30;
      gainXp(xpReward, 'gathering eviction notices across the low ward to find shared notary mark');
      if (roll.isCrit) {
        G.stageProgress[2] = (G.stageProgress[2]||0) + 2;
        addJournal('Five low ward evictions carry same unregistered notary mark — all five within six months, all properties adjacent to dome terminal delivery path. Pattern is systematic displacement.', 'evidence');
        G.lastResult = 'Five eviction notices, collected from the ward through the morning. Every one of them carries the same notary seal impression in the lower right corner — the unregistered mark that Bela Croft described. Five separate tenants, five separate properties, served over six months. When marked on a rough ward map: all five properties sit along the two-block radius around the dome terminal delivery route. The displacement pattern is not random. The delivery infrastructure needed clear access, and the evictions provided it, using paperwork that no notary registry can trace.';
      } else if (roll.isFumble) {
        G.worldClocks = G.worldClocks || {};
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'The second door closes before the third is reached. Word of the notice collection has moved faster than the walk between properties. The community is not hostile, but it is wary — notices mean trouble, and whoever is asking about the notices is either connected to the trouble or going to bring more of it. By the fourth property, a community health worker is walking alongside, not blocking, just present. The notice collection ends with two documents and a lot of doors that did not open.';
      } else {
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        addJournal('Three eviction notices recovered in low ward — all carry same notary mark, two properties adjacent to dome terminal delivery path.', 'intelligence');
        G.lastResult = 'Three notices, from three different households willing to share them. All three carry the same notary seal in the lower corner — the unregistered stamp Bela Croft described. Two of the three properties face the lane that runs parallel to the dome terminal delivery gate. The third is one block over. Three is enough to establish that the pattern is not coincidence. It is not yet enough to establish who holds the stamp.';
      }
      maybeStageAdvance();
      loadStageChoices();
    }
  },
  {
    id: 'dist_lw_compound_exposure_firsthand',
    label: 'A ward resident describes the symptoms. She did not choose this exposure.',
    plot: 'main',
    xpReward: 20,
    tag: 'safe',
    skill: 'spirit',
    failResult: 'The conversation begins well but the question about the dome terminal timeline comes too early. She pulls back — she has spoken to outsiders before who used her experience to make an argument and then left the ward while she stayed in it. The meeting ends before the calendar appears.',
    fn: function() {
      var roll = rollD20('spirit', (G.skills.spirit||0) + Math.floor(G.level/3));
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      var xpReward = roll.isCrit ? 45 : roll.isFumble ? 10 : 30;
      gainXp(xpReward, 'receiving firsthand compound exposure testimony from low ward resident');
      if (roll.isCrit) {
        G.stageProgress[2] = (G.stageProgress[2]||0) + 2;
        addJournal('Low ward resident firsthand exposure account: cognitive fog, glyph-sense disruption, timeline matching dome terminal delivery windows exactly.', 'evidence');
        G.lastResult = 'Her name is Imber and she speaks with the precision of someone who has been cataloguing her own decline. Six weeks of cognitive fog: difficulty recalling proper names, losing sentence structure mid-thought, a persistent sense that something she knows is just out of reach. Glyph-sense disrupted — she works with ward marking seals and the sensitivity she relies on has gone flat. She has been charting the bad days against the calendar. Every severe episode falls within twenty-four hours of a dome terminal delivery window. She kept the calendar. She hands it across.';
      } else if (roll.isFumble) {
        G.lastResult = 'The conversation begins in the right register — careful, non-clinical, genuinely respectful of what the person has been through. But the question about the dome terminal timeline comes too early, before the trust is built. She pulls back. She has talked to people before who used her experience to make an argument and then left the ward while she stayed in it. She is not wrong to be careful. The conversation ends before the calendar appears.';
      } else {
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        addJournal('Low ward: compound exposure symptoms confirmed by firsthand account — glyph-sense disruption and cognitive fog, approximate timeline given.', 'intelligence');
        G.lastResult = 'She confirms the symptoms without producing documentation — cognitive fog, glyph-sense disruption, bad weeks following dome terminal activity. She does not have a calendar but she remembers two specific severe episodes and both of the dates she names fall inside the known delivery windows. She does not call it proof. She calls it what she noticed. She is still noticing it. The symptoms have not resolved since the deliveries started.';
      }
      maybeStageAdvance();
      loadStageChoices();
    }
  }
);

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
