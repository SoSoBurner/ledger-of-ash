/**
 * UNITY SQUARE STAGE 1 ENRICHED MEANINGFUL CHOICES
 * 20 investigation paths grounded in arbitration records and coordination hub irregularities
 * Unity Square: a central coordination hub where multiple parties' affairs are brokered — and where those records are being quietly altered
 * Named NPC: Vale Brokerwell (the senior arbiter whose legitimacy is in question)
 */

const UNITY_SQUARE_STAGE1_ENRICHED_CHOICES = [

  // 1. FIRST ENCOUNTER: VALE BROKERWELL
  {
    label: "Arrange a formal introduction to Vale Brokerwell — the senior arbiter whose coordination decisions have recently become controversial.",
    tags: ['Investigation', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'meeting Vale Brokerwell');
      if (!G.flags) G.flags = {};

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `Brokerwell's desk faces the door. He was already watching when you were shown in. "Unity Square functions on trust in the process," he says, before you've asked anything. He pours water for himself without offering any. The sentence is measured — not aggressive, not warm. He lets it sit. When you respond, he listens with his hands flat on the desk and his eyes on your collarbone rather than your face. He's cataloguing something.`;
        G.flags.met_vale_brokerwell = true;
        addJournal('contact', 'Vale Brokerwell met: practiced, measured, deflects with process language — strategic opacity', `unity-vale-${G.dayCount}`);
      } else {
        G.lastResult = `Brokerwell's clerk takes your name and holds it for a moment before returning it. "Senior arbiter schedule requires registered party affiliation or an active complaint number for external access." She writes nothing down. The calendar behind her is marked in blocks, every slot filled two weeks out. Reaching him through the front door means having something that makes you his problem by procedure.`;
        G.flags.located_vale_brokerwell = true;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // 2. CLUE: ARBITRATION RECORD ALTERATION
  {
    label: "Compare the public arbitration summary register against three parties' private copies of their own case outcomes.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 74,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'cross-referencing arbitration records');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 13) {
        G.lastResult = `Three private outcome documents, laid beside their public register equivalents. Two diverge: the public summaries carry terms favorable to institutional parties that the private outcomes don't include. Favorable language inserted after the fact, without the parties' knowledge. The third case has no public register entry at all — the case number pulls no record. The parties received a private outcome with a valid case number. Officially, no such case exists. All three alterations happened after private outcomes were filed, before the register was made accessible for public review.`;
        if (!G.flags) G.flags = {};
        G.flags.found_arbitration_alteration = true;
        addJournal('Arbitration records: public register altered after private outcomes issued — institutional favoritism added, one case deleted entirely', 'evidence', `unity-records-${G.dayCount}`);
      } else {
        G.lastResult = `Three parties' private outcome documents would make the comparison possible. Without them, the public register reads clean — complete case numbers, consistent formatting, no gaps. Parties to recent arbitrations sit in the waiting hall outside with their advocates, and none of them are interested in speaking to someone without a registered complaint or a letter of standing. The comparison is possible in theory. Getting the documents to do it is today's problem.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 3. CLUE: THE DELETED CASE
  {
    label: "Investigate the arbitration case that was deleted from the public register — find what it was about and why it disappeared.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 76,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(76, 'tracing deleted arbitration case');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      if (!G.flags) G.flags = {};
      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 14) {
        G.lastResult = `The private outcome names the parties and the matter: routing access rights, Unity Square hub versus a northern commercial bloc. The arbiter's decision ran seventeen pages. The hub won on geographic and historical grounds; the northern bloc was barred from those routes without paying the fee structure the arbitration imposed. That outcome has no public register entry. The northern bloc began using those routes three months after the deletion — operating on terrain the arbitration had restricted, with no public record of the restriction. The deletion didn't reverse the decision. It simply made the decision disappear.`;
        G.flags.investigated_deleted_case = true;
        addJournal('Deleted case: routing rights decision against northern commercial bloc removed — deletion removes legal obstacle to bloc\'s route use', 'discovery', `unity-deleted-case-${G.dayCount}`);
      } else if (result.total >= 11) {
        G.lastResult = `The case number pulls no public record. Two parties who were present for the proceedings won't discuss the outcome directly — their advocates have instructed them to say nothing while they pursue a parallel review. From the documentation around the case, it was significant: routing rights, multiple appellate filings, a seventeen-page interim decision summary. Whatever the outcome was, someone decided it shouldn't be publicly accessible. The specific terms and the reason for deletion stay out of reach.`;
      } else {
        G.lastResult = `The public register has no gap where the case should be — no struck-through number, no blank field, no forwarding note. The deletion was thorough enough that the register's pagination closes over it without a seam. Without the private outcome copy to establish the case number, there is nothing here to confirm a case ever existed.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 4. ARCHETYPE-GATED: READING UNITY SQUARE
  {
    label: "Walk the coordination hub's central plaza at the peak of daily business — read what the commercial activity tells you.",
    tags: ['Investigation', 'Archetype', 'Stage1', 'Meaningful'],
    xpReward: 67,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(67, 'reading coordination hub activity');
      const arch = G.archetype && G.archetype.group;

      if (arch === 'combat') {
        G.lastResult = `Three factors you recognize from the arbitration register are standing at the far end of the plaza beside the cart-fee notice board. Not in a formal room — in open air, where anything said carries and nothing is on record. They separate before the conversation finishes, walking different directions. They're running coordination the hub should be providing, because they no longer trust what the hub provides. The square is being worked around, in plain sight of itself.`;
      } else if (arch === 'magic') {
        G.lastResult = `By the time Brokerwell's decisions are posted to the public board, certain parties in the plaza have already adjusted their positions. New cargo allocation, changed route filings, agreements already settled before the formal announcement gives them a reason to. The decisions are leaking ahead of posting. Every party with early knowledge gains a window that others don't. The arbitration calendar is worth more than the decisions themselves.`;
      } else if (arch === 'stealth') {
        G.lastResult = `Six people in the plaza transact nothing. They hold no documents, carry no sample cases, speak to no counter staff. They move through the space and watch who speaks to whom, who arrives together, which representative sits near which bloc's table. By midday they've walked the full perimeter twice. Unity Square's gathering function — parties from across the region, all in one place — makes it useful for mapping relationships that don't appear in any register.`;
      } else {
        G.lastResult = `Small groups form at the plaza edges, exchange flat sealed documents, and separate. The motion looks like normal business. The documents don't: thicker stock, wax closures, formatted headers visible when the papers catch the light at an angle. Legal instruments, not trade notes — passing hand to hand without touching the registration desk. Whatever agreements those seals contain, they won't appear in Unity Square's record of the day's transactions.`;
      }
      addJournal('Unity Square plaza: off-record coordination, advance leak of Brokerwell decisions, relationship mapping, unregistered legal instruments', 'evidence', `unity-plaza-read-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 5. INVESTIGATION: VALE BROKERWELL'S APPOINTMENT
  {
    label: "Research how Vale Brokerwell was appointed to the senior arbiter position — determine if the appointment process was legitimate.",
    tags: ['Investigation', 'Authority', 'Stage1', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'auditing Brokerwell\'s appointment');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 13) {
        G.lastResult = `The appointment file has three signature blocks, as required. Two are filled by current council members in standard form. The third reads: "expedited confirmation — emergency succession protocol." Emergency succession applies when an arbiter dies in post or becomes incapacitated mid-term. Brokerwell's predecessor submitted a voluntary retirement notice twelve days before the appointment. Retirement is not incapacitation. The protocol was misapplied to compress the confirmation timeline and bypass the third council member's standard review. The appointment was processed. The irregularity is in the paperwork, not the stamp.`;
        if (!G.flags) G.flags = {};
        G.flags.found_brokerwell_appointment_irregularity = true;
        addJournal('Brokerwell appointment: emergency succession protocol improperly invoked — bypassed third confirmation, predecessor retired not incapacitated', 'evidence', `unity-appointment-${G.dayCount}`);
      } else {
        G.lastResult = `The public appointment record shows Brokerwell's name, the date, and the required three signature blocks. The review documentation — the deliberation notes, the confirmation correspondence, the council meeting record — is filed with the coordination council under sealed session protocol. Reading those documents requires council authorization. The appointment's paperwork exists; the reasoning behind it stays sealed.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 6. FACTION SEED: OVERSIGHT COLLEGIUM
  {
    label: "Report the arbitration record alterations to the Oversight Collegium's observer at Unity Square.",
    tags: ['Faction', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'making Oversight Collegium contact');
      if (!G.factionHostility) G.factionHostility = { warden_order: 0, iron_compact: 0, oversight_collegium: 0 };

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `Nance Tarn has a small desk near the square's public board, close enough to read every posting. "Two complaints came to the Collegium in the past year. Both were forwarded to the coordination council for self-review." She sets her pen down. "Council reviewed. Found no irregularities. Self-review of a compromised system produces a clean result regardless of the underlying condition." She looks at you directly. "I need the private outcome documents. If you have them, or can get them, I can run an independent comparison. The council's review is useless to me."`;
        if (!G.flags) G.flags = {};
        G.flags.met_oversight_collegium_unity = true;
        G.factionHostility.oversight_collegium += 1;
        addJournal('faction', 'Oversight Collegium observer Nance Tarn: previous complaints self-reviewed without finding — needs private outcome documents for independent comparison', `unity-collegium-${G.dayCount}`);
      } else {
        G.lastResult = `Tarn listens without writing anything down, then slides a printed form across the corner of her desk. "Informal conversations don't produce anything I can file. If you have a complaint, it goes in writing through the formal intake channel — dated, signed, with supporting documentation attached." She doesn't say she can't help. She says this is the form.`;
        if (!G.flags) G.flags = {};
        G.flags.located_oversight_collegium_unity = true;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 7. SOCIAL: THE DISPOSSESSED ROUTING PARTY
  {
    label: "Find the party that won the deleted routing rights case — speak to them about what's happened since the decision disappeared.",
    tags: ['Social', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 67,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(67, 'interviewing dispossessed routing party');

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `Rell keeps her private outcome document in a flat leather case she carries with her. "Seventeen months ago. I walked out of the arbitration hall with that in my hand." When the northern bloc's carts started using the restricted routes, she went back to Brokerwell's office. "He opened the register. No record. Told me my copy was unofficial documentation — no legal standing without the public register entry." She sets the leather case on the table between you. "I have the arbiter's signature, the date stamp, the case number. He told me that wasn't enough." She's been trying to enforce a decision that has been made to not exist. She knows she's not the first.`;
        if (!G.flags) G.flags = {};
        G.flags.met_rell_routing = true;
        addJournal('contact', 'Factor Rell: won routing rights case, decision deleted, told private copy is unofficial — legal limbo enforced by deletion', `unity-rell-${G.dayCount}`);
      } else {
        G.lastResult = `Rell is at a corner table in the waiting hall with her advocate's notes spread in front of her and a cup going cold beside them. When you approach, her advocate's hand comes up before you finish your first sentence. "Active proceedings. No informal discussion." Rell doesn't look up. The advocate's instruction is clear. Whatever she knows about the deleted case, it's locked inside a proceeding that won't conclude for weeks.`;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // 8. MORAL PRESSURE: THE ARBITER BELOW VALE
  {
    label: "Approach a junior arbiter who has been carrying out Vale Brokerwell's instructions — ask what they know and what they've been doing.",
    tags: ['Moral', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 65,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(65, 'confronting complicit arbiter');
      if (!G.flags) G.flags = {};

        G.lastResult = `Sevv has a junior arbiter's table near the archive door — close enough to the register that corrections can be filed quickly. "Brokerwell sends the correction notes through the internal routing sheet. I enter them into the public record." She looks at the table. "He calls it interpretive alignment — updating the summary to reflect current doctrine." She stops. "I never read the original outcomes before entering the corrections. I was entering the corrections, not reading the cases." She isn't pretending she didn't do it. She's worked out that the administrative framing was designed for her. She wants to know what comes next, specifically for her.`;
      G.flags.stage1_evidence_decision = 'pending';
      G.flags.stage1_moral_npc = 'Arbiter Sevv';
      addJournal('consequence', 'Junior arbiter Sevv: unwitting participant in record alteration, fears consequences if formal investigation begins', `unity-sevv-decision-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 9. INVESTIGATION: THE NORTHERN COMMERCIAL BLOC
  {
    label: "Identify the northern commercial bloc that benefited from the deleted routing rights decision.",
    tags: ['Investigation', 'Networks', 'Stage1', 'Meaningful'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'identifying northern commercial bloc');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `Cross-referencing the routing rights dispute party against commercial registers in adjacent localities: at Unity Square, the Northern Route Coordination Consortium. In Craftspire, the Regional Materials Coordination Body. In Cosmoria, a name that appears in the transit chain thread. Different names, but the registered principals overlap — three names appear across all three registrations, and all three share an address cluster in the same northern commercial district. The same principals, reorganized under different trade names in each jurisdiction, operating as if they were separate entities.`;
        if (!G.flags) G.flags = {};
        G.flags.identified_northern_bloc = true;
        addJournal('Northern bloc identified: same principals operating as different entities across multiple localities — multi-alias distributed operation', 'discovery', `unity-northern-bloc-${G.dayCount}`);
      } else {
        G.lastResult = `The Northern Route Coordination Consortium is legitimately registered at Unity Square — a valid trade entity with a current charter. Cross-referencing the principals' names against other jurisdictions requires access to commercial registration databases that aren't held locally. Each locality archives its own. Without pulling records from at least two additional jurisdictions, the connection between this consortium and its counterparts elsewhere stays theoretical.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 10. ATMOSPHERE: UNITY SQUARE AT MIDDAY
  {
    label: "Stand at Unity Square's central marker stone and observe how the hub coordinates the movement of people and goods.",
    tags: ['WorldColor', 'Lore', 'Stage1', 'Meaningful'],
    xpReward: 50,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(50, 'observing coordination hub activity');

        G.lastResult = `The central marker stone is waist-high, white-grey granite, worn at the corners by fifty years of hands passing. The inscription runs around its four faces: "Equal Distance from All." The arbitration hall sits at the square's geometric center, equidistant from the residential quarter, the commercial arcade, the transit registry, and the public board. The positioning was deliberate — an architectural argument that no single interest owned the process. The cart-fee notice is posted over the gate inscription. The marker stone stands in the middle of the plaza, undisturbed.`;
      addJournal('Unity Square central marker: "Equal Distance from All" — coordination architecture designed for neutrality, undermined by captured arbitration', 'discovery', `unity-marker-${G.dayCount}`);
      G.recentOutcomeType = 'explore'; maybeStageAdvance();
    }
  },

  // 11. INVESTIGATION: VALE BROKERWELL'S CORRESPONDENCE
  {
    label: "Obtain a copy of Vale Brokerwell's external correspondence log for the past year.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'obtaining Brokerwell correspondence');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('stealth', (G.skills.stealth || 0) + Math.floor(G.level / 3));
      if (result.isCrit) {
        G.lastResult = `Brokerwell's filing drawer holds twelve months of correspondence, sorted by sender. The Northern Route Coordination Consortium appears every week — sometimes twice. The earliest letter is dated four months before Brokerwell's appointment as senior arbiter. The consortium was writing to him when he held a junior coordination role with no authority over routing decisions. The letters from that period use his name without his title. They were already in communication when the appointment was processed. He didn't gain a relationship when he gained the position. He had the relationship first.`;
        if (!G.flags) G.flags = {};
        G.flags.found_brokerwell_correspondence = true;
        addJournal('Brokerwell correspondence: weekly contact with Northern Consortium predates his appointment by 4 months — installed to serve a party, not appointed independently', 'discovery', `unity-brokerwell-corr-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The outer portion of the filing drawer is accessible — the last four months of correspondence, sorted by sender. Northern parties write to Brokerwell regularly; the consortium name appears three times in the stack. The earlier letters, the ones that would establish when the relationship began relative to his appointment, are filed further back under a security tab you can't open without triggering the drawer's secondary lock. Four months of evidence. The timeline question stays unanswered.`;
      } else {
        G.lastResult = `Brokerwell's office has a second door that opens inward from the arbitration hall side, and a filing drawer with a visible lock tab on the lower section. His clerk is at the outer desk whenever the building is open. The correspondence is in there. Getting to it without someone in that room knowing you were there requires an internal route or a window that hasn't appeared yet.`;
        if (!G.worldClocks) G.worldClocks = {};
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 12. PERSONAL ARC: DOCUMENT COLLECTION
  {
    label: "Compile all obtained private outcome documents into a single secured collection and get them to the Oversight Collegium observer.",
    tags: ['PersonalArc', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'compiling and transferring evidence collection');
      if (!G.flags) G.flags = {};

      const result = rollD20('stealth', (G.skills.stealth || 0) + Math.floor(G.level / 3));
      if (result.total >= 10) {
        G.lastResult = `A visiting factor from a settlement two localities north is passing through for a single day's trade business — no affiliations with Unity Square, no reason for anyone to track who he speaks to. He takes the sealed document package without asking what it contains and hands it to Tarn at her desk while making an unrelated inquiry about the public board. Tarn receives it, signs nothing, and continues the conversation without breaking stride. The Collegium has the comparison documents. The transfer has no visible record.`;
        G.flags.unity_evidence_transferred = true;
        addJournal('consequence', 'Private outcome documents transferred to Oversight Collegium — formal record created through independent institutional channel', `unity-evidence-transfer-${G.dayCount}`);
      } else {
        G.lastResult = `Every carrier who works the square regularly passes through the coordination hub's administrative orbit at some point — registered trade routes, mail station, factor lodging. Tarn's desk is visible from three directions. Getting documents to her without Brokerwell's network noting the exchange requires a carrier with no established Unity Square connection, moving through on private business. No such person is here today.`;
      }
      G.recentOutcomeType = 'stealth'; maybeStageAdvance();
    }
  },

  // 13. RUMOR LAYER
  {
    label: "Listen to parties waiting for coordination decisions — what are they saying about Unity Square's reliability?",
    tags: ['Investigation', 'Rumor', 'Stage1', 'Meaningful'],
    xpReward: 60,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(60, 'listening to waiting parties');

      const rumors = [
        'experienced factors have stopped using Unity Square for sensitive decisions — they go directly to Shelkopolis now',
        'Vale Brokerwell\'s predecessor left without explanation and refuses to discuss Unity Square publicly',
        'three arbitration case outcomes in the past year were reversed within a month of being issued — unprecedented frequency',
        'northern commercial parties always seem to know coordination decisions before they\'re formally announced'
      ];
      const selected = rumors[Math.floor(Math.random() * rumors.length)];

      G.lastResult = `Three factors share a bench in the waiting hall, each with a different case number on their intake slip. One of them, while the other two aren't listening, says it directly: "${selected}." He doesn't lower his voice. Nobody at the desk reacts. The waiting hall has heard enough of these remarks that they've stopped registering as unusual.`;
      addJournal(`Unity Square rumor: "${selected}"`, 'evidence', `unity-rumor-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 14. SOCIAL: BROKERWELL'S PREDECESSOR
  {
    label: "Find Vale Brokerwell's predecessor — the arbiter who retired before the emergency succession protocol was invoked.",
    tags: ['Social', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 67,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(67, 'finding Brokerwell\'s predecessor');

      const result = rollD20('survival', (G.skills.survival || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `Polt settled two days' travel from Unity Square in a settlement with no trade routes he'd ever arbitrated. He answers the door himself and doesn't invite you past the threshold. "I was given a choice," he says. "Take the package and go, or stay in the post under terms I wasn't willing to accept." He doesn't name the terms. "The person who filled my position after I left — their name was in circulation before I submitted my retirement notice. The confirmation process confirmed a decision that had already been made somewhere else."`;
        if (!G.flags) G.flags = {};
        G.flags.met_polt_predecessor = true;
        addJournal('contact', 'Former arbiter Polt: given ultimatum to retire, successor already chosen before he left — appointment process was theater', `unity-polt-${G.dayCount}`);
      } else {
        G.lastResult = `Polt isn't at the forwarding address on the retirement record. A neighbor says he moved shortly after arriving and didn't leave a new address. The second settlement he's known to have stayed in says the same. Two moves in eight months, no forwarding arrangements either time. Either someone has been following his location, or he's been operating as though they might.`;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // 15. INVESTIGATION: WHAT UNITY SQUARE COORDINATES
  {
    label: "Map Unity Square's coordination function — what routes, agreements, and flows does it actually manage?",
    tags: ['Investigation', 'Systems', 'Stage1', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'mapping coordination hub scope');

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `Seven major trade route agreements, three inter-settlement supply contracts, two regional resource allocation frameworks — all currently active, all with Unity Square arbitration clauses built in. Disputes under any of them come here first. Together they cover roughly forty percent of commercial flow between settlements in the operational zone. Every rate negotiation, every routing conflict, every supply shortfall that matters goes through this process. A captured arbitration record doesn't affect one case. It sets the terms every party in the zone operates within.`;
        addJournal('Unity Square scope: 40% of regional commercial flow governed by arbitration it controls — a leverage point, not just a hub', 'evidence', `unity-scope-${G.dayCount}`);
      } else {
        G.lastResult = `The publicly posted coordination mandate lists the agreements Unity Square administers, but the full list — including the supplemental agreements added in the last three years without a public announcement — is in the administrative filing system. The posted list is partial. How partial requires access to the administrative records, which are restricted to registered parties and authorized third-party reviewers.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 16. ATMOSPHERE: THE ARBITRATION HALL
  {
    label: "Sit in the public gallery of an open arbitration session — observe how the process actually operates.",
    tags: ['WorldColor', 'Lore', 'Stage1', 'Meaningful'],
    xpReward: 50,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(50, 'observing arbitration session');

        G.lastResult = `Brokerwell runs the session from a raised seat at the room's center, equidistant from both parties. He reads the question, hears responses, takes notes in a small notebook rather than the official ledger. His questions are precise. He interrupts twice to correct procedural framing — not the substance of arguments, just the form. The decision he reads at the end is balanced, citing both parties' positions before naming the outcome. The parties leave without appealing. From the gallery, the process is impeccable. Whatever happens to the record in the archive afterward happens somewhere else, under different hands, in a room nobody watches.`;
      addJournal('Arbitration session: publicly impeccable process, corruption operates entirely post-session in record alteration — appearance launders outcomes', 'discovery', `unity-session-${G.dayCount}`);
      G.recentOutcomeType = 'explore'; maybeStageAdvance();
    }
  },

  // 17. INVESTIGATION: THE NORTHERN BLOC'S GAINS
  {
    label: "Calculate what the northern commercial bloc has gained through the record alterations and the deleted routing decision.",
    tags: ['Investigation', 'Systems', 'Stage1', 'Meaningful'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'calculating northern bloc gains');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 13) {
        G.lastResult = `The deleted routing decision: three transit corridors, previously subject to a fee structure the consortium was required to pay. After the deletion, they use those corridors without the restriction appearing in any accessible record. The two altered cases: supply contract terms adjusted post-session to favor the consortium's positions — the parties on the other side of those contracts believe different terms were agreed than what the public record now shows. Three interventions, each invisible in isolation. Cumulative effect: the northern bloc moves freely through the zone's commercial infrastructure on terms no competitor can read or match.`;
        if (!G.flags) G.flags = {};
        G.flags.calculated_bloc_gains = true;
        addJournal('Northern bloc total gains: unrestricted route access + favorable contract terms = structural commercial dominance via invisible capture', 'evidence', `unity-gains-${G.dayCount}`);
      } else {
        G.lastResult = `Calculating the cumulative value of the three interventions requires the parties' actual commercial data — cargo volumes, route fees, contract margins. Each party holds their own records, and none of them are interested in sharing trade figures with someone outside the process. The structural picture is visible. The numbers behind it stay closed.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 18. WORLD COLOR: THE SQUARE AT DUSK
  {
    label: "Watch Unity Square empty at the close of business — observe what the space means to those who leave it.",
    tags: ['WorldColor', 'Lore', 'Stage1', 'Meaningful'],
    xpReward: 48,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(48, 'observing Unity Square at dusk');

        G.lastResult = `A factor from a small settlement stops at the central marker on her way out, after a coordination session that didn't go her way. She puts her hand flat on the inscription and holds it there for a moment — "Equal Distance from All" — then lifts it and walks toward the gate without looking back. She came in expecting a fair process. She left accepting an outcome she disagrees with, because the process appeared to be what it claimed. The square's archive is corrupted. The session was clean. She has no way to know the difference between the two.`;
      addJournal('Unity Square: trust in fairness is the actual asset being exploited — parties accept unfavorable outcomes because process appears legitimate', 'discovery', `unity-dusk-${G.dayCount}`);
      G.recentOutcomeType = 'explore'; maybeStageAdvance();
    }
  },

  // 19. INVESTIGATION: SHELKOPOLIS CONNECTION
  {
    label: "Determine what connects Unity Square's situation to Shelkopolis — why does this matter beyond the hub itself?",
    tags: ['Investigation', 'Networks', 'Stage1', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'identifying Shelkopolis connection');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `Unity Square's mandate covers supply chain disputes that include Shelkopolis's outlying districts. Three of the active agreements include parties who also hold trade positions inside Shelkopolis's commercial registry. The routing rights the northern bloc gained here give them access to supply lines that feed directly into Shelkopolis's market. The contract advantages they obtained through the altered cases affect the pricing and availability of goods that flow through Shelkopolis factors. The capture of this hub translates into leverage inside the larger one. What's built here gets used there.`;
        if (!G.flags) G.flags = {};
        G.flags.found_shelkopolis_connection = true;
        addJournal('Unity Square → Shelkopolis: arbitration advantages translate to commercial leverage inside Shelkopolis market — peripheral capture feeding central one', 'evidence', `unity-shelk-connection-${G.dayCount}`);
      } else {
        G.lastResult = `The connection between Unity Square's arbitration outcomes and Shelkopolis's commercial conditions is visible in outline — shared parties, overlapping routes, contracts that reference Shelkopolis district access. Mapping the downstream implications of specific decisions requires reading the contracts in detail and cross-referencing against Shelkopolis trade data. That work takes time and access that isn't available here.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 20. SHADOW RIVAL INTRO
  {
    label: "Nance Tarn mentions someone visited the Collegium observer before you — leaving documents that turned out to be fabricated evidence.",
    tags: ['Rival', 'Warning', 'Stage1', 'Meaningful'],
    xpReward: 57,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(57, 'receiving rival warning');
      if (!G.flags) G.flags = {};

      const arch = G.archetype && G.archetype.group;
      if (arch === 'combat') {
        G.lastResult = `"They submitted documents naming a party I know personally," Tarn says. "Good forgeries — correct format, correct seals, correct case references. The named party has no connection to the routing rights dispute. None." She keeps the documents on the desk in front of her. "I nearly filed them before I cross-checked the party's known trade history. The fabrication was targeting the Collegium's attention specifically, not Unity Square's archive." Someone is pushing the inquiry toward a dead end. Someone is actively working to compromise the Collegium's process from the inside.`;
      } else if (arch === 'magic') {
        G.lastResult = `"The dates are wrong," Tarn says. She slides one document across the desk. "This formatting style — the day written before the month with a slash — wasn't in use in the period this document claims to be from. The switch happened eighteen years ago. Someone who knew document standards from current practice applied them to a historical record." She taps the date. "An expert catches it. Most wouldn't." Someone with access to sophisticated fabrication is trying to contaminate the evidentiary record. Someone is actively working to compromise the Collegium's process from the inside.`;
      } else if (arch === 'stealth') {
        G.lastResult = `"Registered name, affiliated address, everything formatted correctly," Tarn says. "I looked up the party afterward. That address has been vacant for two years. The charter they presented as their affiliation was dissolved before the date on their intake form." She pulls the intake record. "A fabricated identity, built just well enough to survive an intake desk check but not a follow-up." They delivered the false evidence and left before Tarn finished filing the day's submissions. Someone is actively working to compromise the Collegium's process from the inside.`;
      } else {
        G.lastResult = `"They came in expressing concern about Unity Square's record integrity," Tarn says. "Correctly described the general pattern of alteration. Offered to assist with gathering additional material." She picks up a sealed document sleeve. "These came with the offer. 'Additional supporting material.' The case numbers inside are valid. The outcomes described don't match anything in my confirmed records." Someone built credibility by being right about the general picture, then used that credibility to introduce false specifics. Someone is actively working to compromise the Collegium's process from the inside.`;
      }
      if (!G.rivalId) {
        if (arch === 'combat') G.rivalId = 'warden_captain';
        else if (arch === 'magic') G.rivalId = 'archivist_veld';
        else if (arch === 'stealth') G.rivalId = 'shadow_broker';
        else G.rivalId = 'provost_lenn';
      }
      addJournal('warning', 'Rival-adjacent operative submitted fabricated evidence to Oversight Collegium — actively poisoning investigation channel', `unity-rival-${G.dayCount}`);
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
window.UNITY_SQUARE_STAGE1_ENRICHED_CHOICES = UNITY_SQUARE_STAGE1_ENRICHED_CHOICES;
