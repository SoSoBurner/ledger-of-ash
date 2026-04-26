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
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        G.lastResult = `Deep in the sealed correspondence, a single letter sits apart from the routine charter filings — a House Shelk subordinate writing to the Northern Provision Compact with delivery terms laid out in blunt commercial language. The noble registry bound it in with the quarterly administrative packets without marking it. Whatever it confirmed passed through this archive unnoticed for years, preserved by accident inside the wrong folder.`;
        addJournal('Aurora Heights archive: House Shelk letter confirms Northern Provision Compact delivery terms', 'evidence', `ah-archive-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The clerk at the records counter sets down her stamp and steps back without processing the request. A handwritten routing slip goes into the senior ledger. Somewhere above this counter, House Shelk estate will receive word that someone asked about charter correspondence from this period. The inquiry is already traveling faster than you are.`;
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
    label: "Aurora Heights court circuit — press contacts among the high-society network for off-record information about the sealed charter parties.",
    tags: ['NPC', 'Persuasion', 'Stage2'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'working Aurora Heights social circuit for charter intelligence');
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        G.lastResult = `A court contact identifies the sealed charter holder by family name — a minor noble house that was dissolved three years ago but whose legal entity was never formally struck from the registry. It is a legal ghost operating under the protection of expired legitimacy.`;
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
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'tracing Aurora Heights registrar signature into low ward filings');
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
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

const IRONSPOOL_WARD_STAGE2_ENRICHED_CHOICES = [
  {
    label: "Ironspool Ward's labor circuit has workers who handled the suppression compound container modifications — find them at the shift end taverns.",
    tags: ['Investigation', 'Stealth', 'Stage2'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'locating Ironspool Ward workers who handled container modifications');
      const result = rollD20('finesse', (G.skills.stealth||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        G.lastResult = `A former workshop hand describes the modification work in precise detail: signal-damping insulation panels, chemical seal reinforcement on the container joints, and a specific loading configuration designed to distribute weight evenly across a standard grain convoy arrangement. He was paid double rate and told not to discuss it. He discusses it anyway.`;
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
    label: "Ironspool Ward's contraband edge — a local fence has been handling small quantities of the suppression compound that leaked from the main supply chain.",
    tags: ['Stealth', 'Craft', 'Stage2'],
    xpReward: 66,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'tracing suppression compound street leakage in Ironspool Ward');
      const result = rollD20('finesse', (G.skills.stealth||0) + Math.floor(G.level/3));
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
    fn: function() {
      if (!G.flags.stage2_faction_red_hood_aware) {
        G.lastResult = 'Nothing to act on with the broker yet.';
        G.recentOutcomeType = 'locked'; return;
      }
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'making Red Hood broker contact');
      G.flags.met_broker_anneth_torv = true;
      G.flags.stage2_faction_red_hood_contacted = true;
      G.lastResult = 'The counter clerk disappears into the back and a different woman comes forward — the one in the red shawl, closer now. She introduces herself as Broker Anneth Torv, says it like a credential rather than a name. Her register is Kerroun market — short sentences, a small laugh before any refusal, numbers always spoken in multiples of three. Her tell is that she wears a thin iron ring on her smallest finger and turns it inward before she quotes a price, so the ring-face reads only to her. She wants a specific courier satchel recovered from a Reckoning Quarter confiscation shelf — a satchel that the Red Hood lost when a courier was picked up last week. The satchel itself, not the contents. The Guild needs to know what was read from it and what was not.';
      addJournal('Met Broker Anneth Torv (Red Hood Guild) — wants courier satchel recovered from Reckoning Quarter confiscation; Guild needs to audit what was read', 'contact_made', `iron-redhood-contacted-${G.dayCount}`);
      G.recentOutcomeType = 'investigate';
    }
  },

  // BEAT 3 — Payoff
  {
    label: "The satchel on the confiscation shelf hasn't been signed out properly.",
    tags: ['RedHood', 'Stage2', 'Faction', 'Payoff'],
    xpReward: 90,
    fn: function() {
      if (!G.flags.stage2_faction_red_hood_contacted) {
        G.lastResult = 'Anneth hasn\'t indicated the next step.';
        G.recentOutcomeType = 'locked'; return;
      }
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(90, 'delivering the recovered Red Hood satchel');
      G.flags.stage2_faction_red_hood = true;
      G.flags.stage2_faction_contact_made = true;
      G.investigationProgress = (G.investigationProgress||0) + 2;
      G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
      var tension = '';
      if (G.flags.stage2_faction_wardens) {
        tension = ' Anneth turns the iron ring inward and laughs the small laugh. "You have Warden saber-oil on the satchel strap. That is a scent I recognize. I am going to tell you less than I meant to, and you are going to act as though I told you more. We both leave cleaner that way."';
      }
      G.lastResult = 'Anneth takes the satchel and opens it on the counter in the specific order a courier would — outer pocket, inner flap, false base. The false base has been opened and re-closed by someone who knew it was there. "They read it. They did not copy it. There is a difference. Copying leaves press marks on the lining. Reading leaves this." She shows you a thumb-smudge of grey dust along one seam. "Collegium ink residue. The satchel was opened by an auditor with a subpoena record, and the subpoena was then withdrawn. That means someone above the Collegium pulled the audit back after the item was already seen. The Red Hood has not had a case to trace that authority signature — until today." She slides a wooden token to you. "Show this at any Kerroun-marked door. It will open once."' + tension;
      addJournal('Red Hood intel: Collegium auditor read the courier satchel under subpoena, then the subpoena was withdrawn from above — authority signature now traceable', 'evidence', `iron-redhood-payoff-${G.dayCount}`);
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
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `The healers have compiled forty-seven cases across seven months. They cross-referenced patient addresses against known compound transit routes and confirmed geographic clustering. They were preparing to publish but received a suppression notice from the "Northern Glyph Oversight Commission." They kept their records hidden. They share them.`;
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
    label: "The Verdant Row distribution network reaches every allied healer and recorder in the region. They are waiting for something worth routing.",
    tags: ['NPC', 'Persuasion', 'Stage2'],
    xpReward: 64,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(64, 'establishing Verdant Row network contact');
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.verdant_row_contact = true;
        G.lastResult = `The man across the table — grey-haired, ink on his left sleeve from a morning of copying — lays down the evidence summary and holds it flat with two fingers. He doesn't speak immediately. When he does, it's to a point on the wall above your shoulder. "The circuit moves on confirmation, not promise." He slides the summary back. The Verdant Row distribution network is committed: any findings routed through this channel reach every allied healer and recorder network in the region at once, with no single point of interception.`;
        addJournal('Verdant Row distribution circuit committed — regional simultaneous distribution available', 'evidence', `vr-contact-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The meeting ends before the second cup is poured. No raised voices, no explanation — just a hand gesture that says the conversation is closed, and the same grey-haired man gathering his papers in an order that means he won't be carrying anything else out of this room. Somewhere in the network, a profile note is being written. The words won't be hostile. They'll be worse: uncertain. The circuit protects itself by not moving on uncertain things.`;
        addJournal('Verdant Row contact: reliability concern, profile flagged for review', 'complication', `vr-contact-fail-${G.dayCount}`);
      } else {
        G.flags.verdant_row_contact = true;
        G.lastResult = `The grey-haired man studies the evidence summary for a long moment, then folds it along a crease that wasn't there before. He slides a small printed card across the table — a botanical illustration on one side, a sequence of three symbols on the other. "That's the signal for this circuit. Use it when you have something worth moving." The relationship is thin at this stage. The circuit will carry what's sent through it, but trust here is built incrementally, not granted.`;
        addJournal('Verdant Row contact established — basic network access', 'evidence', `vr-contact-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },
  {
    label: "A Reckoning Quarter magistrate has been taking depositions inside the healer's collective without local notice.",
    tags: ['Investigation', 'Persuasion', 'Stage2'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'tracking Reckoning Quarter magistrate into Verdant Row');
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
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

const GRANARY_STEPS_STAGE2_ENRICHED_CHOICES = [
  {
    label: "Harvest Keep's Granary Steps market has grain manifests showing the agricultural routing number theft in real time — catch it before it clears.",
    tags: ['Investigation', 'Craft', 'Stage2'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'intercepting live manifest routing number theft at Granary Steps');
      const result = rollD20('spirit', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        G.lastResult = `You catch the manifest as it is being processed. The grain routing number on a non-agricultural manifest was entered four minutes ago. The submitting agent is still at the counter. You obtain a physical description and the exact charter subsidiary code they used. Live evidence.`;
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
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(30, 'examining Granary Steps ward boundary markers');
      var roll = rollD20('vigor', G.skills.survival || 0);
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
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `The asset transfers converge on a single escrow account held under the Northern Provision Compact name. The account has received seven disbursements over six months from three separate institutional payers — one Soreheim, one Guildheart, one House Shelk subsidiary. The full financial picture is here.`;
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
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(30, 'pressing Guild Arbiter on Iron Ledger Ward claim dates');
      var roll = rollD20('charm', G.skills.persuasion || 0);
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
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        G.lastResult = `You find the complainant. They withdrew under threat of legal action using the sealed charter as a basis for a defamation claim. The original complaint identified specific cargo that had been using their service classification. They kept a copy of the original complaint. They sign a new witness statement.`;
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
    label: "The permit inspector patrols that corridor — a wrong word here closes every door in the quarter.",
    tags: ['stage2', 'districts'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(30, 'navigating Reckoning Quarter permit inspector social check');
      var roll = rollD20('finesse', G.skills.stealth || 0);
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
    label: "The Scriptorium Steps has a back-channel for scholarly correspondence that bypasses standard Academy mail. The evidence needs a route that doesn't get intercepted.",
    tags: ['Craft', 'Lore', 'Stage2'],
    xpReward: 64,
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
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'examining misrouted Scriptorium correspondence through Iron Ledger franking');
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
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

const HIGH_QUARTER_STAGE2_ENRICHED_CHOICES = [
  {
    label: "The high quarter records hall has charter and contract files. The access credentials may be enough to get through the gate.",
    tags: ['Investigation', 'Lore', 'Stage2'],
    xpReward: 66,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'requesting high quarter charter record access');
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
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
    label: "The settlement's high quarter social circuit — press elite contacts for information about off-record charter activity.",
    tags: ['Persuasion', 'Stage2'],
    xpReward: 62,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(62, 'working high quarter social circuit for charter intelligence');
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        G.lastResult = `The man in the embroidered grey coat sets down his drink and turns his head slightly — the angle of someone retrieving something from memory rather than improvising. "Old money. Been very busy lately." He names a family. The name matches the dissolved noble entity that surfaced in the Aurora Heights filings: a house formally struck from the living registry three years ago, legal entity never deregistered. He doesn't know that. To him it's just gossip about money moving in old channels.`;
        addJournal('High quarter social: dissolved noble entity name confirmed by elite contact', 'evidence', `hq-social-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The question lands in the middle of a salon conversation and the room's temperature drops by a degree. The woman in pearls who hosted the introduction doesn't look at either of you while she moves the conversation elsewhere, but she's noticed. The inquiry was too direct for this circuit — the high quarter trades in implication, not named concerns. The contact won't be available for follow-up introductions. The reputation cost is quiet and durable.`;
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

const COMMON_QUARTER_STAGE2_ENRICHED_CHOICES = [
  {
    label: "The settlement's common quarter market stalls — traders here track every unusual shipment passing through and share information freely.",
    tags: ['Survival', 'Stage2'],
    xpReward: 58,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(58, 'gathering market intelligence in common quarter');
      const result = rollD20('vigor', (G.skills.survival||0) + Math.floor(G.level/3));
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
    label: "Common quarter labor contacts — workers here know which employers are operating outside standard guild contracts.",
    tags: ['Persuasion', 'Craft', 'Stage2'],
    xpReward: 56,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(56, 'gathering off-contract employer intelligence from common quarter labor');
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
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

const LOW_WARD_STAGE2_ENRICHED_CHOICES = [
  {
    label: "The settlement's low ward informant network — contraband awareness here is high and someone knows about the suppression compound distribution edge.",
    tags: ['Stealth', 'Stage2'],
    xpReward: 60,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(60, 'tapping low ward informant network for compound distribution intel');
      const result = rollD20('finesse', (G.skills.stealth||0) + Math.floor(G.level/3));
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
    label: "The ward constable's patrol log skips three nights in a row — the gap lines up with the container transfers.",
    tags: ['Stage2', 'NPC'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'cross-referencing constable patrol log gaps with container transfer dates');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
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
    label: "The bonded yard keeper keeps a private ledger — every irregular load he accepts goes in the back column, unnamed.",
    tags: ['Stage2', 'NPC'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'pressing the bonded yard keeper for off-books intake records');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
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
    label: "The transit road's weight-check station keeps a shadow manifest for loads that bypass the standard inspector.",
    tags: ['Stage2', 'NPC'],
    xpReward: 66,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'locating shadow manifests at the eastern transit road weight station');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('finesse', (G.skills.stealth||0) + Math.floor(G.level/3));
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
    label: "A displaced tenant from the dome terminal complaint eviction — she kept her notice papers and knows who served them.",
    tags: ['Stage2', 'NPC'],
    xpReward: 64,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(64, 'tracing dome terminal eviction to the displaced tenant');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('vigor', (G.skills.survival||0) + Math.floor(G.level/3));
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
    label: "The ghost entity's charter subsidiary stamping tool was ordered from a Scriptorium Steps copy house — the order slip is still in the bindery log.",
    tags: ['Stage2', 'NPC'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'tracing charter subsidiary stamp manufacture through Scriptorium bindery log');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('spirit', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.dist_stamp_origin_found = true;
        G.investigationProgress++;
        G.lastResult = `The bindery log at the Scriptorium Steps copy house carries an order entry from eleven months ago: a commission for a single-impression seal block, custom-cut to a charter subsidiary format not in any standard catalog. The order was placed under a Mimolot Academy reference number that the bindery accepted without verification — Academy commissions bypass the standard identity check. The delivery address on the order slip is an Iron Ledger Ward box number that was closed two weeks after the stamp was collected. The craftsman who cut the block initials the entry in a hand that shakes slightly; he remembered the commission because the substrate was harder than standard and the caller never came back for a second impression. The stamp exists. Someone is carrying it.`;
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
    label: "Low ward's labor underground — workers who handled off-books cargo for extra pay know more than they told their handlers.",
    tags: ['Combat', 'Stealth', 'Stage2'],
    xpReward: 58,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(58, 'pressing low ward off-books cargo workers');
      const result = rollD20('might', (G.skills.combat||0) + Math.floor(G.level/3));
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
