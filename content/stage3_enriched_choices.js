// Stage 3 Enriched Choices — Faction Pressure + Deep Evidence
// 20 choices split into Group A (faction pressure) and Group B (deep evidence).
// Ready to splice into the stage3 enriched choices array.

const STAGE3_ENRICHED_CHOICES = [

// ─── GROUP A: FACTION PRESSURE ───────────────────────────────────────────────

// Oversight Collegium review
{
  label: 'Seld\'s institutional review moves faster than it should.',
  tags: ['stage3', 'collegium', 'faction_pressure'],
  xpReward: 70,
  fn: function() {
    var roll = rollD20('lore', G.skills.lore);
    if (roll >= 14) {
      addNarration('Collegium Review', 'Seld meets the player at a side door of the Registry annex, not the main entrance. Her credentials badge is already folded face-in. She speaks without looking up, sorting papers that don\'t need sorting. Two shelf indices she pulled before the review order landed — she needs them walked out under the player\'s charter. The review examiner arrives in the morning. The window is measured in hours, not days.');
      addJournal('Seld confirmed the institutional review was filed the same day as the player\'s last archive visit — the timing is not coincidental.', 'intelligence');
      G.investigationProgress = (G.investigationProgress || 0) + 1;
      if (G.stageProgress) G.stageProgress[3] = (G.stageProgress[3] || 0) + 1;
      maybeStageAdvance();
    } else {
      addNarration('Collegium Review', 'The side door is locked. A posted notice lists the annex as closed pending procedural review. Through the narrow side glass, the shelf bays are already screened with hanging cloth. Whatever Seld had pulled is no longer accessible.');
      if (typeof G !== 'undefined' && G.worldClocks) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
      }
    }
  }
},

// Shadowhands courier
{
  label: 'A sealed message delivered by someone who didn\'t wait for a reply.',
  tags: ['stage3', 'shadowhands', 'faction_pressure'],
  xpReward: 70,
  fn: function() {
    var roll = rollD20('stealth', G.skills.stealth);
    if (roll >= 14) {
      addNarration('Sealed Message', 'The courier is already gone when the player opens the inn room door. The envelope sits on the floor just inside — no seal stamp, no routing mark, only a folded interior card with a time, a district, and a single phrase in Roazian script the player has seen once before. The meeting is in two days. The card is written on the back of a page from a charter filing. The filing number is one the player recognizes.');
      addJournal('Shadowhands handler requested a face-to-face meeting — the invitation used a partial charter number from the player\'s own evidence thread as an authenticator.', 'intelligence');
      G.investigationProgress = (G.investigationProgress || 0) + 1;
      if (G.stageProgress) G.stageProgress[3] = (G.stageProgress[3] || 0) + 1;
      maybeStageAdvance();
    } else {
      addNarration('Sealed Message', 'The envelope is there but the card inside is blank — or was blank, the faint chemical ghost of dissolved ink still visible if held to the light. Someone burned the message before the player could read it. The courier had a second handler.');
      if (typeof G !== 'undefined' && G.worldClocks) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
      }
    }
  }
},

// Road Wardens off-record conversation
{
  label: 'The patrol leader wants this off the manifest and off the route.',
  tags: ['stage3', 'wardens', 'faction_pressure'],
  xpReward: 70,
  fn: function() {
    var roll = rollD20('persuasion', G.skills.persuasion);
    if (roll >= 14) {
      addNarration('Off the Route', 'He waves his second constable back thirty paces before he speaks. His posture stays formal — anyone watching at distance sees a routine waymark check. His voice does not. He names two route segments the player should not travel in the next eight days and does not explain why. His thumb keeps working at the edge of his route ledger clasp without opening it. He is not warning the player out of concern. He is clearing a path he needs clear.');
      addJournal('Road Warden patrol leader issued an informal route restriction on two segments — both overlap with the anomalous waymark tally gaps in the evidence thread.', 'evidence');
      G.investigationProgress = (G.investigationProgress || 0) + 1;
      if (G.stageProgress) G.stageProgress[3] = (G.stageProgress[3] || 0) + 1;
      maybeStageAdvance();
    } else {
      addNarration('Off the Route', 'The patrol leader sees the player coming and doesn\'t wave the constable back. The inspection is by the ledger, formal and slow. He issues a standard waymark compliance notice. Nothing is said that wasn\'t written down. Whatever he came to say off the record, the moment is gone.');
      if (typeof G !== 'undefined' && G.worldClocks) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
      }
    }
  }
},

// Red Hood errand
{
  label: 'The fence won\'t open the back room until the errand is done.',
  tags: ['stage3', 'red_hood', 'faction_pressure'],
  xpReward: 70,
  fn: function() {
    var roll = rollD20('stealth', G.skills.stealth);
    if (roll >= 14) {
      addNarration('The Errand', 'The package is small, dense, wrapped in oilskin with a wax strip that will show any opening. The drop point is a bread stall in the Compact Hall market colonnade — a specific peg hook under the stall counter. The player makes the drop without being marked. The bread seller does not acknowledge it. An hour later, the fence\'s back door has a new bolt drawn and a lamp set in the window. The errand is complete.');
      addJournal('Red Hood Guild fence restored access after a dead-drop delivery — the drop point was inside Compact Hall precinct, suggesting Guild reach extends into the administrative quarter.', 'intelligence');
      G.investigationProgress = (G.investigationProgress || 0) + 1;
      if (G.stageProgress) G.stageProgress[3] = (G.stageProgress[3] || 0) + 1;
      maybeStageAdvance();
    } else {
      addNarration('The Errand', 'A Compact Hall precinct warden is running a slow patrol of the colonnade when the player arrives. The peg hook is visible but the warden\'s route will cross directly past the stall. The package stays inside the player\'s coat. The fence\'s back door stays dark.');
      if (typeof G !== 'undefined' && G.worldClocks) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
      }
    }
  }
},

// Collegium vs Shadowhands — same archive document
{
  label: 'Both of them want the same document and both know the other wants it.',
  tags: ['stage3', 'collegium', 'shadowhands', 'faction_pressure'],
  xpReward: 70,
  fn: function() {
    var roll = rollD20('lore', G.skills.lore);
    if (roll >= 14) {
      addNarration('Two Claims', 'The document is a counter-certified copy of a route-authorization filing — the kind produced when the original is disputed. Seld has a Collegium pull request logged. The Shadowhands handler named it specifically without the player having mentioned it. The player reaches the sub-level reading bay first and makes a fast transcription by hand before the pull request is honored. The copy isn\'t the same as the document, but it carries the numbers that matter. One faction gets the original. The player keeps the thread.');
      addJournal('Route-authorization counter-filing was claimed by both Collegium and Shadowhands simultaneously — document content must be significant to both institutional and covert interests.', 'evidence');
      G.investigationProgress = (G.investigationProgress || 0) + 1;
      if (G.stageProgress) G.stageProgress[3] = (G.stageProgress[3] || 0) + 1;
      maybeStageAdvance();
    } else {
      addNarration('Two Claims', 'When the player reaches the sub-level reading bay the document slot is empty. The pull request was honored before arrival. The log shows a Collegium archivist signature, but the handwriting doesn\'t match any regular bay staff. The document is gone by institutional procedure and leaves no opening to challenge it.');
      if (typeof G !== 'undefined' && G.worldClocks) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
      }
    }
  }
},

// Warden checkpoint — unknown officer
{
  label: 'He doesn\'t know who the player is, which makes him more dangerous.',
  tags: ['stage3', 'wardens', 'faction_pressure'],
  xpReward: 70,
  fn: function() {
    var roll = rollD20('persuasion', G.skills.persuasion);
    if (roll >= 14) {
      addNarration('Checkpoint', 'The search order covers cargo, not persons — a distinction the warden recites precisely, as though he has recited it before. The player presents a transit charter. He reads it three times, which means he is reading it once and then reading the player twice. He stamps the charter and steps aside. He writes something in his route ledger as the player passes. He is doing his job correctly. That is the problem.');
      addJournal('Checkpoint search order was cargo-specific but the warden logged the player\'s transit charter number — a secondary record now exists without the player\'s awareness.', 'intelligence');
      G.investigationProgress = (G.investigationProgress || 0) + 1;
      if (G.stageProgress) G.stageProgress[3] = (G.stageProgress[3] || 0) + 1;
      maybeStageAdvance();
    } else {
      addNarration('Checkpoint', 'The warden flags the charter for secondary verification — a stamp the player hasn\'t seen before, one that requires a holding period. Four hours in the checkpoint anteroom under a tallow lamp. When the verification clears, one item in the player\'s pack has been logged into the search record by description.');
      if (typeof G !== 'undefined' && G.worldClocks) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 2;
      }
    }
  }
},

// Shadowhands handler — prior surveillance
{
  label: 'They were watching before the player knew there was anything to watch.',
  tags: ['stage3', 'shadowhands', 'faction_pressure'],
  xpReward: 70,
  fn: function() {
    var roll = rollD20('lore', G.skills.lore);
    if (roll >= 14) {
      addNarration('Prior Watch', 'The handler names the first locality the player entered — not from the player\'s telling, from their own records. They name a specific day. They name an NPC the player spoke to, someone the player barely remembers. Their file predates any action that would have drawn Roazian attention. This is not surveillance that began when the player became useful. It began before. The handler does not explain why. They are waiting to see if the player will ask.');
      addJournal('Shadowhands handler demonstrated prior surveillance from Stage 1 — the player was flagged before any faction-visible action was taken, suggesting an external trigger unknown to the player.', 'evidence');
      G.investigationProgress = (G.investigationProgress || 0) + 1;
      if (G.stageProgress) G.stageProgress[3] = (G.stageProgress[3] || 0) + 1;
      maybeStageAdvance();
    } else {
      addNarration('Prior Watch', 'The handler begins to speak and then pauses, reading something in the player\'s expression. They close what they were about to open. The meeting ends on procedural ground — next steps, safe channels, route protocols. Whatever they were prepared to reveal, the player\'s response closed that door before it opened.');
      if (typeof G !== 'undefined' && G.worldClocks) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
      }
    }
  }
},

// Red Hood — new representative
{
  label: 'The fence has been replaced by someone who doesn\'t pretend to trust the player.',
  tags: ['stage3', 'red_hood', 'faction_pressure'],
  xpReward: 70,
  fn: function() {
    var roll = rollD20('persuasion', G.skills.persuasion);
    if (roll >= 14) {
      addNarration('New Face', 'She is younger than the fence, dressed in transit worker\'s cloth, and uses none of the verbal markers that signaled established dealings. She names a price for continued access — three times what the fence charged — and does not negotiate. She does not say what happened to the fence. She hands over a transit ledger page, not what the player asked for but close enough to be useful, and leaves through the front door, not the back.');
      addJournal('Red Hood Guild replaced the original fence without explanation — the new representative offered partial materials at a premium, suggesting Guild internal pressure around the player\'s thread.', 'intelligence');
      G.investigationProgress = (G.investigationProgress || 0) + 1;
      if (G.stageProgress) G.stageProgress[3] = (G.stageProgress[3] || 0) + 1;
      maybeStageAdvance();
    } else {
      addNarration('New Face', 'She listens and then asks a question the player cannot answer safely — who referred the player to this location specifically. The answer is not wrong but it is insufficient. She produces nothing and sets no second meeting. The back room lamp goes out. The door is still unlocked but the access it represented is closed.');
      if (typeof G !== 'undefined' && G.worldClocks) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
      }
    }
  }
},

// Unknown faction representative
{
  label: 'The help is specific enough that someone must have read the player\'s notes.',
  tags: ['stage3', 'unknown_faction', 'faction_pressure'],
  xpReward: 70,
  fn: function() {
    var roll = rollD20('lore', G.skills.lore);
    if (roll >= 14) {
      addNarration('Unaffiliated', 'He carries no guild mark, no Compact seal, no transit credential — only a folded document listing three archive references the player has been unable to locate, annotated with the shelf bay and filing window for each. The annotations are correct; the player checks one against a page already in hand. It matches. He names a street in Shelkopolis and walks away. The document smells of Titan Towers stonework — the distinctive mineral damp of the lower levels.');
      addJournal('An unaffiliated intermediary provided verified archive references without establishing identity or requesting an exchange — information accuracy and Titan Towers provenance suggest institutional access outside known factions.', 'discovery');
      G.investigationProgress = (G.investigationProgress || 0) + 1;
      if (G.stageProgress) G.stageProgress[3] = (G.stageProgress[3] || 0) + 1;
      maybeStageAdvance();
    } else {
      addNarration('Unaffiliated', 'The document is genuine but two of the three archive references cover filings the player already has. The third doesn\'t exist in any accessible index. Either the person made an error or they are testing what the player knows. The street address he named leads to a shuttered chandler\'s shop with no one inside.');
      if (typeof G !== 'undefined' && G.worldClocks) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
      }
    }
  }
},

// Converging address in Shelkopolis
{
  label: 'Every thread from every faction ends at the same address.',
  tags: ['stage3', 'convergence', 'faction_pressure'],
  xpReward: 70,
  fn: function() {
    var roll = rollD20('stealth', G.skills.stealth);
    if (roll >= 14) {
      addNarration('The Address', 'The building is registered as a charter storage annex — administrative, boring, correct in every filing the player can find. The exterior shows three different institutional seal stamps on the door frame, none of them current, all superseded by newer versions not posted. Inside, through a ground-floor window left unshuttered, two rows of bound filing cases and a single lamp burning low. Someone works here at night. The building\'s registered occupant dissolved its charter two years ago.');
      addJournal('A Shelkopolis charter storage annex is the convergence point for Collegium, Shadowhands, Road Warden, and Red Hood evidence threads — registered occupant charter dissolved two years prior, but the building is currently active.', 'evidence');
      G.investigationProgress = (G.investigationProgress || 0) + 1;
      if (G.stageProgress) G.stageProgress[3] = (G.stageProgress[3] || 0) + 1;
      maybeStageAdvance();
    } else {
      addNarration('The Address', 'The building is shuttered and dark. A fresh wax seal on the door bears a Compact Hall administrative stamp — temporary closure, no listed reason, no listed duration. The seal is less than twelve hours old. Someone knew the player was coming. The address is locked and the trail that led here is now visible to whoever placed that seal.');
      if (typeof G !== 'undefined' && G.worldClocks) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 2;
      }
    }
  }
},

// ─── GROUP B: DEEP EVIDENCE ───────────────────────────────────────────────────

// Great Registry — pre-dated authorization
{
  label: 'The authorization was filed before the operation it authorized existed.',
  tags: ['stage3', 'deep_evidence', 'registry'],
  xpReward: 70,
  fn: function() {
    var roll = rollD20('lore', G.skills.lore);
    if (roll >= 14) {
      addNarration('Pre-Dated Filing', 'The seal archive sub-level smells of beeswax and cold stone. The authorization sits in a binding case alongside seventeen others — unremarkable until the player holds it against the confirmed date of the first operational filing it covers. The authorization is stamped eleven days earlier. Eleven days before the route was registered. Eleven days before the cargo manifest series begins. The cover was built first. The operation was fitted into the cover afterward.');
      addJournal('Great Registry sub-level authorization pre-dates the operational filings it covers by eleven days — the institutional framework was established before the declared activity began, indicating deliberate structural concealment.', 'evidence');
      G.investigationProgress = (G.investigationProgress || 0) + 1;
      if (G.stageProgress) G.stageProgress[3] = (G.stageProgress[3] || 0) + 1;
      maybeStageAdvance();
    } else {
      addNarration('Pre-Dated Filing', 'The sub-level reading bay requires a secondary authorization the player\'s charter doesn\'t cover. The archivist on duty is apologetic and precise: the request needs a Collegium co-signature, minimum two working days. The document is there. The player can see the shelf reference on the index board. It is inaccessible by procedure.');
      if (typeof G !== 'undefined' && G.worldClocks) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
      }
    }
  }
},

// Compact Hall — ghost subsidiary, three names
{
  label: 'The same entity filed under three names and none of them match.',
  tags: ['stage3', 'deep_evidence', 'compact_hall'],
  xpReward: 70,
  fn: function() {
    var roll = rollD20('lore', G.skills.lore);
    if (roll >= 14) {
      addNarration('Three Names', 'The cross-reference takes two hours in the Compact Hall filing colonnade. Three charter documents on adjacent reading ledges. The registered agent name changes on each. The address changes. The capitalization structure changes. But the route authorization numbers are the same series. The charter guarantee signatories overlap by one name across all three — a name that appears nowhere else in the public index. The ghost subsidiary is real. It has been filing under rotating identities and no one has flagged the series overlap.');
      addJournal('Three Compact Hall charter filings represent the same ghost subsidiary under rotating identities — a shared guarantor name not indexed anywhere in the public record links all three.', 'evidence');
      G.investigationProgress = (G.investigationProgress || 0) + 1;
      if (G.stageProgress) G.stageProgress[3] = (G.stageProgress[3] || 0) + 1;
      maybeStageAdvance();
    } else {
      addNarration('Three Names', 'The colonnade clerk informs the player that two of the three requested filing cases are under active Collegium administrative hold. The player can read one. The cross-reference requires comparing all three simultaneously. One document and two gaps is not enough to establish the pattern.');
      if (typeof G !== 'undefined' && G.worldClocks) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
      }
    }
  }
},

// Soreheim frontier — suppressed route report
{
  label: 'Filed, confirmed received, and then removed from the index entirely.',
  tags: ['stage3', 'deep_evidence', 'soreheim'],
  xpReward: 70,
  fn: function() {
    var roll = rollD20('survival', G.skills.survival);
    if (roll >= 14) {
      addNarration('Removed Report', 'The Soreheim route agent who filed it is still listed in the waymark tally rolls — alive, credentialed, current. His report appears in the receipt log as received and stamped. It does not appear in the route index. The player finds it in a bound supplement misfiled under a different route number — either deliberate or the kind of careless that looks deliberate when it benefits someone. The report documents a cargo irregularity at a Soreheim frontier waystation. The cargo description matches nothing in any registered importer manifest the player has seen.');
      addJournal('Suppressed Soreheim frontier report located in a misfiled supplement — confirmed received by registry but removed from the active route index; cargo description matches no registered importer in the evidence set.', 'evidence');
      G.investigationProgress = (G.investigationProgress || 0) + 1;
      if (G.stageProgress) G.stageProgress[3] = (G.stageProgress[3] || 0) + 1;
      maybeStageAdvance();
    } else {
      addNarration('Removed Report', 'The misfiled supplement bay was reorganized since the last index — the clerk mentions it as a point of pride. Whatever was misfiled has been correctly filed into a location the player has no authorization to access. The correctly sorted section holds nothing useful.');
      if (typeof G !== 'undefined' && G.worldClocks) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
      }
    }
  }
},

// Shelkopolis docks — unmarked cargo at night
{
  label: 'The manifest numbers reference importers that have never existed.',
  tags: ['stage3', 'deep_evidence', 'docks'],
  xpReward: 70,
  fn: function() {
    var roll = rollD20('stealth', G.skills.stealth);
    if (roll >= 14) {
      addNarration('Night Manifest', 'The dock at the third hour has two Warden lanterns at the eastern gate and none at the service channel. Six crates moving on a hand cart — no stevedore markings, no guild stamp on the cart itself, which is illegal for any registered dock operation. The manifest board at the channel post shows numbers. The player copies them in the dark by touch as much as sight. Back in lamp light: the importer registration numbers are syntactically valid but absent from the Compact Hall trade roll for any year the player can access.');
      addJournal('Shelkopolis dock night manifest recorded six unmarked crates through the service channel — importer registration numbers are syntactically valid but absent from all accessible Compact Hall trade rolls.', 'evidence');
      G.investigationProgress = (G.investigationProgress || 0) + 1;
      if (G.stageProgress) G.stageProgress[3] = (G.stageProgress[3] || 0) + 1;
      maybeStageAdvance();
    } else {
      addNarration('Night Manifest', 'A Warden lantern swings toward the service channel earlier than the pattern suggested. The player retreats before reaching the manifest board. The crates are loaded and gone by the time the lantern passes. The channel post shows a blank manifest face — the night\'s numbers already turned.');
      if (typeof G !== 'undefined' && G.worldClocks) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 2;
      }
    }
  }
},

// Charter exemption — nonexistent route
{
  label: 'The exemption covers a route that has no registration anywhere.',
  tags: ['stage3', 'deep_evidence', 'charter'],
  xpReward: 70,
  fn: function() {
    var roll = rollD20('lore', G.skills.lore);
    if (roll >= 14) {
      addNarration('Phantom Route', 'The charter exemption is standard form — correctly stamped, correctly countersigned, correctly indexed. The route number it covers appears nowhere in the Road Wardens\' corridor registry, nowhere in the Compact Hall trade route index, and nowhere in the waymark tally rolls the player has accumulated. The exemption covers a route that does not officially exist. The exemption itself is real. Something is moving on a path that has no record and a legitimate exemption protecting it from inspection.');
      addJournal('Charter exemption document covers a route number absent from all registries — the exemption is formally valid but the route it protects has no registration in any accessible index.', 'evidence');
      G.investigationProgress = (G.investigationProgress || 0) + 1;
      if (G.stageProgress) G.stageProgress[3] = (G.stageProgress[3] || 0) + 1;
      maybeStageAdvance();
    } else {
      addNarration('Phantom Route', 'The exemption document requires a certified copy to examine outside the reading bay. The certification is paid, the form submitted — the overnight copy comes back with a standard administrative error notice. The original is unavailable pending procedural review. The player holds a copy request receipt for a document placed beyond reach.');
      if (typeof G !== 'undefined' && G.worldClocks) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
      }
    }
  }
},

// Named intermediary — four threads
{
  label: 'The same name appears in the archive, the route, the cargo, and the charter.',
  tags: ['stage3', 'deep_evidence', 'intermediary'],
  xpReward: 70,
  fn: function() {
    var roll = rollD20('lore', G.skills.lore);
    if (roll >= 14) {
      addNarration('Four Threads', 'The player lays out the evidence: the name appears as a sub-signatory on the archive authorization, as a listed agent in the route anomaly report, as a cargo consignee on three of the unmarked dock manifests, and as a charter guarantor on the ghost subsidiary filing. Different roles, different document types. The same name across four independent threads spanning at least three years. It does not appear in the Great Registry public roll, the Guild Council member index, or any Compact Hall registered officer list. It exists only in documents where it was not supposed to be the important part.');
      addJournal('A single name links archive, route, cargo, and charter evidence threads across a three-year span — the name appears in no public registry or council index.', 'evidence');
      G.investigationProgress = (G.investigationProgress || 0) + 1;
      if (G.stageProgress) G.stageProgress[3] = (G.stageProgress[3] || 0) + 1;
      maybeStageAdvance();
    } else {
      addNarration('Four Threads', 'The comparison works for three threads but the fourth — the charter guarantor page — is the one document under Collegium administrative hold. Three matches is a pattern. Four would be proof. The hold has no listed expiration. The shape of the evidence is visible in outline but the center does not resolve.');
      if (typeof G !== 'undefined' && G.worldClocks) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
      }
    }
  }
},

// Collegium internal suppressed report
{
  label: 'The Collegium filed a report on itself and then buried it in its own archive.',
  tags: ['stage3', 'deep_evidence', 'collegium'],
  xpReward: 70,
  fn: function() {
    var roll = rollD20('lore', G.skills.lore);
    if (roll >= 14) {
      addNarration('Internal Filing', 'The report is logged as a procedural compliance review — the kind filed when an archivist notices an irregularity during routine index work. It names three specific filing anomalies. It recommends further examination. It is countersigned by a senior Collegium examiner. It was actioned with a closed status code the same day it was filed. Closed without any remediation record. Closed before any follow-up examination could have been conducted. The three anomalies listed are documents already in the evidence thread.');
      addJournal('Oversight Collegium internal compliance report identified three filing anomalies present in the player\'s evidence thread — the report was closed without action the same day it was filed, countersigned by a senior examiner.', 'evidence');
      G.investigationProgress = (G.investigationProgress || 0) + 1;
      if (G.stageProgress) G.stageProgress[3] = (G.stageProgress[3] || 0) + 1;
      maybeStageAdvance();
    } else {
      addNarration('Internal Filing', 'The report\'s index reference leads to a shelf location holding a different document entirely — a standard trade corridor compliance summary, filed the same month, with the same reference number reassigned. The original report may have been physically removed or the reference deliberately overwritten. The shelf holds nothing the player came for.');
      if (typeof G !== 'undefined' && G.worldClocks) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
      }
    }
  }
},

// Route anomaly — waymark tally gap
{
  label: 'The gap in the tallies is the exact size of a regular shipment, every time.',
  tags: ['stage3', 'deep_evidence', 'route_anomaly'],
  xpReward: 70,
  fn: function() {
    var roll = rollD20('survival', G.skills.survival);
    if (roll >= 14) {
      addNarration('Tally Gap', 'The waymark tally rolls cover sixteen months. Spread across the reading ledge and marked with a stylus, the gaps appear at irregular calendar intervals — not regular enough to be scheduled. But the gap size is consistent: seventeen to nineteen units, every time, across six separate occurrences. Whatever is not being counted at the waymark is moving in consistent quantities. The route anomaly is not a recording error. It is a record-keeping system working around something deliberate.');
      addJournal('Sixteen months of waymark tally rolls show six transit gaps of consistent size at irregular intervals — regularity of quantity despite irregular timing indicates deliberate operational planning, not recording error.', 'evidence');
      G.investigationProgress = (G.investigationProgress || 0) + 1;
      if (G.stageProgress) G.stageProgress[3] = (G.stageProgress[3] || 0) + 1;
      maybeStageAdvance();
    } else {
      addNarration('Tally Gap', 'The tally rolls for two of the key months are listed in the index but physically absent from their shelf locations. The archivist logs the missing rolls as a routine location error and opens a retrieval request. Three to five working days. The comparative analysis requires all sixteen months together.');
      if (typeof G !== 'undefined' && G.worldClocks) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
      }
    }
  }
},

// Cosmouth harbor log — 11-day gap
{
  label: 'Every eleven days, someone cleaned the Cosmouth harbor log.',
  tags: ['stage3', 'deep_evidence', 'cosmouth'],
  xpReward: 70,
  fn: function() {
    var roll = rollD20('lore', G.skills.lore);
    if (roll >= 14) {
      addNarration('Harbor Log', 'The Cosmouth harbor log is a physical ledger, not a registry copy — the original, with original ink. The cleared entries are visible as physical absences: the page surface slightly thinner where the ink was chemically removed, surrounding entries intact. The player counts the intervals between clearances across eight months. Eleven days, eleven days, eleven days. Once twelve, when a festival delayed something. The surrounding entries describe ordinary harbor traffic. Whatever moved on those eleven-day intervals was not ordinary.');
      addJournal('Cosmouth harbor log shows chemically cleared entries at consistent 11-day intervals across eight months — surrounding entries intact, cleared entries selectively removed from the physical record.', 'evidence');
      G.investigationProgress = (G.investigationProgress || 0) + 1;
      if (G.stageProgress) G.stageProgress[3] = (G.stageProgress[3] || 0) + 1;
      maybeStageAdvance();
    } else {
      addNarration('Harbor Log', 'The harbor master\'s office holds the log under its own administration — not Compact Hall, not the Collegium. Access requires a harbor master authorization the player\'s transit charter doesn\'t cover. The player gets as far as the outer office and a clerk who takes down the request in a separate ledger. The log stays behind the inner door.');
      if (typeof G !== 'undefined' && G.worldClocks) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
      }
    }
  }
},

// Converging evidence — undated institutional decision
{
  label: 'Everything points to a decision that was made and never written down.',
  tags: ['stage3', 'deep_evidence', 'convergence'],
  xpReward: 70,
  fn: function() {
    var roll = rollD20('lore', G.skills.lore);
    if (roll >= 14) {
      addNarration('The Decision', 'The player arranges the evidence by institutional layer: archive authorization, route exemption, cargo manifest anomaly, charter guarantee. Each piece is formally correct. Each was produced by a different arm of Compact administration. None of them references any of the others. But they are all calibrated to the same operational requirement — as though each producing institution received the same instruction through a channel that left no document. The instruction does not appear anywhere. Only its consequences do. Someone decided something. Every institution acted on it. No one wrote down what was decided.');
      addJournal('Convergent analysis of archive, route, cargo, and charter evidence indicates coordinated institutional compliance with an undocumented central instruction — the decision exists only as effects across four administrative bodies.', 'discovery');
      G.investigationProgress = (G.investigationProgress || 0) + 1;
      if (G.stageProgress) G.stageProgress[3] = (G.stageProgress[3] || 0) + 1;
      maybeStageAdvance();
    } else {
      addNarration('The Decision', 'The player works through three of the four evidence layers before the fourth — the charter guarantee thread — stalls on a document still under Collegium hold. Three lines meet. The fourth doesn\'t close the shape. The pattern is visible in outline but the center does not resolve without the missing piece.');
      if (typeof G !== 'undefined' && G.worldClocks) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
      }
    }
  }
}

,

// ── GROUP C: WORLD PRESSURE ESCALATION ──────────────────────────────────────

// C1: Checkpoint watch — Great Registry quarter
{
  label: 'My description is on that gate post. They know this route.',
  tags: ['stage3', 'surveillance', 'shelkopolis'],
  xpReward: 70,
  fn: function() {
    var roll = rollD20('stealth', G.skills.stealth);
    if (roll >= 14) {
      addNarration('Posted at the Gate', 'The parchment is nailed to the checkpoint post at eye height — charcoal likeness, three distinguishing marks, a reward figure left blank. The warden on duty is reading a manifest; his back is turned. The side lane through the coopers\' yard is unguarded. The player moves through it without pausing, coat collar up, and emerges two streets past the Registry quarter with nothing to show for the detour but mud on both boots.');
      addJournal('A physical description matching the player was posted at the Great Registry quarter checkpoint in Shelkopolis.', 'evidence');
      G.investigationProgress = (G.investigationProgress || 0) + 1;
      if (G.stageProgress) G.stageProgress[3] = (G.stageProgress[3] || 0) + 1;
      maybeStageAdvance();
    } else {
      addNarration('Held at the Gate', 'The warden turns before the lane is reached. He has the parchment already unfolded. The player is held for forty minutes while a relay runner goes to the Registry and comes back with nothing actionable — no warrant, no standing order — but the delay costs the window entirely, and the warden writes something in his ledger before letting the player pass.');
      if (typeof G !== 'undefined' && G.worldClocks) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
      }
    }
  }
},

// C2: Assassination attempt — hired, impersonal
{
  label: 'He wasn\'t angry. He was doing a job. That\'s worse.',
  tags: ['stage3', 'assassination', 'jeopardy'],
  xpReward: 70,
  fn: function() {
    var roll = rollD20('combat', G.skills.combat);
    if (roll >= 14) {
      addNarration('Hired Work', 'The man in the alley off Tanners\' Row is patient and professional — he waits until the street clears, then moves without speaking. There is no threat issued, no demand for papers. The knife comes for the ribs, not the throat. The player breaks his wrist on the third block and puts him down hard against the wall. He doesn\'t answer questions. His gear is unmarked. The only thing in his coat pocket is a folded scrap with a physical description and a number — no name, no sigil.');
      addJournal('Hired attacker carrying only a physical description and a fee figure — no identifying commission mark.', 'evidence');
      G.investigationProgress = (G.investigationProgress || 0) + 1;
      if (G.stageProgress) G.stageProgress[3] = (G.stageProgress[3] || 0) + 1;
      maybeStageAdvance();
    } else {
      addNarration('Badly Timed', 'The knife finds the gap between armor plates — not deep, but enough to slow the next two days. The attacker runs. The player is left in Tanners\' Row with a wrapped side and the distinct knowledge that someone paid for this and received no result they can report on.');
      if (typeof G !== 'undefined' && G.worldClocks) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
      }
    }
  }
},

// C3: Stage 2 NPC under institutional review — Jorin
{
  label: 'Jorin can\'t meet in the open anymore. Someone filed a review.',
  tags: ['stage3', 'npc_jorin', 'institutional_pressure', 'craftspire'],
  xpReward: 70,
  fn: function() {
    var roll = rollD20('persuasion', G.skills.persuasion);
    if (roll >= 14) {
      addNarration('Side Door at the Bindery', 'Jorin arrives at the bindery\'s loading dock rather than the front counter. He has lost weight. The Collegium review board has flagged three of his charter cross-reference requests as outside his assigned scope — routine, he says, but he doesn\'t say it like he means it. He passes the player a folded folio sleeve from inside his coat. Two loose pages inside, edges trimmed so the header registry marks are gone. "I pulled these before the audit started," he says. "They won\'t miss what they never catalogued."');
      addJournal('Jorin (Craftspire scribe) is under Collegium audit — passed two pre-audit pages from uncatalogued charter cross-reference files.', 'intelligence');
      G.investigationProgress = (G.investigationProgress || 0) + 1;
      if (G.stageProgress) G.stageProgress[3] = (G.stageProgress[3] || 0) + 1;
      maybeStageAdvance();
    } else {
      addNarration('Watched at the Bindery', 'Jorin shakes his head once when the player approaches — a small controlled motion — and walks past without stopping. Later, a folded note arrives at the lodging house: "They have someone watching my usual routes. Don\'t come to the Bindery. I\'ll find you when I can." The folio he was carrying goes somewhere else.');
      if (typeof G !== 'undefined' && G.worldClocks) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
      }
    }
  }
},

// C4: Lodging searched — professional, nothing taken
{
  label: 'Everything is exactly where I left it. That\'s the point.',
  tags: ['stage3', 'surveillance', 'lodging_search'],
  xpReward: 70,
  fn: function() {
    var roll = rollD20('lore', G.skills.lore);
    if (roll >= 14) {
      addNarration('Reading the Room', 'The pack is on the same hook. The bedroll is tight. The table is clear. But the wax seal on the document sleeve has a hairline crack that wasn\'t there this morning — it was opened and re-pressed. The lamp wick is trimmed a quarter-inch shorter than the player left it. Someone sat at that table and read for a while, then tidied everything back to within a margin of error that would satisfy most travellers. The player takes the remaining documents and seals them into the boot lining before going to supper.');
      addJournal('Player\'s lodging was professionally searched — documents read, nothing removed, physical signs consistent with Compact administrative practice.', 'evidence');
      G.investigationProgress = (G.investigationProgress || 0) + 1;
      if (G.stageProgress) G.stageProgress[3] = (G.stageProgress[3] || 0) + 1;
      maybeStageAdvance();
    } else {
      addNarration('Nothing to Find', 'The room was searched and so were the boot linings. The player counts what\'s missing: two transit manifests, one annotated route chart. Not the sensitive material — whoever this was knew what to ignore. That is its own kind of message.');
      if (typeof G !== 'undefined' && G.worldClocks) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
      }
    }
  }
},

// C5: Route anomaly quietly corrected
{
  label: 'The anomaly I documented is gone. Someone corrected it overnight.',
  tags: ['stage3', 'evidence_suppressed', 'route_anomaly'],
  xpReward: 70,
  fn: function() {
    var roll = rollD20('lore', G.skills.lore);
    if (roll >= 14) {
      addNarration('Retroactive Filing', 'The cargo manifest for the Ironhold-to-Cosmouth run has been refiled. The player pulled a transit copy from the Warden post at Plume\'s End two weeks ago — cargo weight mismatch, exemption code applied to a charter category that doesn\'t permit exemptions. Now the refiled version shows the correct weight and a different exemption code entirely: one that is valid. The original filing has been withdrawn and replaced. The Warden clerk at the desk says this happens sometimes when the charter office catches a clerical error. He says it neutrally, like a man reading from a card.');
      addJournal('Route anomaly documented in Stage 2 (Ironhold-Cosmouth manifest weight mismatch) retroactively refiled with corrected figures — original withdrawn.', 'evidence');
      G.investigationProgress = (G.investigationProgress || 0) + 1;
      if (G.stageProgress) G.stageProgress[3] = (G.stageProgress[3] || 0) + 1;
      maybeStageAdvance();
    } else {
      addNarration('Clean Slate', 'The clerk finds the corrected filing quickly — too quickly, as if he\'d been told it might be requested. He does not find the original. The player\'s own copy is the only evidence the mismatch ever existed, and that copy is not something that can be presented to anyone without explaining how it was obtained.');
      if (typeof G !== 'undefined' && G.worldClocks) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
      }
    }
  }
},

// C6: Rival adventurer working for interested party
{
  label: 'That rival has new backing. The money didn\'t come from guild work.',
  tags: ['stage3', 'rival', 'faction_interference'],
  xpReward: 70,
  fn: function() {
    var roll = rollD20('persuasion', G.skills.persuasion);
    if (roll >= 14) {
      addNarration('Hired Opposition', 'The rival is sitting in the common room of the waystation when the player arrives. Better gear than last time — new boots, a signet ring worn face-down on the right hand. He doesn\'t hide that he\'s watching. When the player approaches and asks directly who\'s paying for the new kit, he smiles and says he took a commission from a Compact procurement office he\'d rather not name. He isn\'t ashamed of it. He seems, if anything, relieved to be working with institutional backing for once. He leaves before supper without finishing his drink.');
      addJournal('Known rival accepted a commission from an unnamed Compact procurement office — now actively tracking player\'s route.', 'intelligence');
      G.investigationProgress = (G.investigationProgress || 0) + 1;
      if (G.stageProgress) G.stageProgress[3] = (G.stageProgress[3] || 0) + 1;
      maybeStageAdvance();
    } else {
      addNarration('Closed Off', 'The rival clocks the player\'s approach and moves to a table with his back to the wall. No conversation. He puts a coin on the table in front of him — Compact mint, new strike — and leaves it there the whole evening like a marker. Nothing is said. The player leaves knowing that someone made this man an offer and he took it, and that\'s the extent of what can be confirmed.');
      if (typeof G !== 'undefined' && G.worldClocks) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
      }
    }
  }
},

// C7: Warden transit restriction filed
{
  label: 'Three routes flagged. Someone filed a pattern restriction, not a warrant.',
  tags: ['stage3', 'wardens', 'route_restriction', 'jeopardy'],
  xpReward: 70,
  fn: function() {
    var roll = rollD20('lore', G.skills.lore);
    if (roll >= 14) {
      addNarration('Pattern Flag', 'The Warden transit clerk at the Cosmouth approach road shows the player the flag without being asked — she seems uncomfortable holding it. It\'s not a warrant. It\'s a Pattern Anomaly Notice, filed under charter provision 14-C, which allows route monitoring without arrest authority. Three routes: Cosmouth northern approach, the Ironhold spur, and the Glasswake southern ferry crossing. All three are routes the player has used. The clerk says the Notice will expire in thirty days unless renewed. She says it quietly. She does not make eye contact when she hands back the transit papers.');
      addJournal('Warden Pattern Anomaly Notice filed under charter 14-C — three player-used routes under monitoring, not warrant-grade, expires in 30 days.', 'evidence');
      G.investigationProgress = (G.investigationProgress || 0) + 1;
      if (G.stageProgress) G.stageProgress[3] = (G.stageProgress[3] || 0) + 1;
      maybeStageAdvance();
    } else {
      addNarration('Held Without Authority', 'The Warden at the Cosmouth checkpoint detains the player for two hours on the basis of the Pattern Notice, even though it grants no detention authority. By the time the senior post warden arrives and releases the player with a formal apology, the window for the day\'s travel is gone and the delay is logged in the post record.');
      if (typeof G !== 'undefined' && G.worldClocks) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
      }
    }
  }
},

// C8: Guildmaster Selene's name in an unexpected document
{
  label: 'One line. One approval. Selene\'s name on something that shouldn\'t exist.',
  tags: ['stage3', 'selene', 'guild_council', 'discovery'],
  xpReward: 70,
  fn: function() {
    var roll = rollD20('lore', G.skills.lore);
    if (roll >= 14) {
      addNarration('One Line', 'The document is a charter amendment addendum, buried in a supplementary filing bundle from three years prior. The player finds it because it uses the same exemption category code as the Ironhold manifest. The addendum modifies cargo classification thresholds for a subsidiary whose charter name resolves to nothing in the public registry. At the bottom, a single approval signature: Selene, Guildmaster, Guild Council — no date, no witness notation, no counter-seal. Just the name and the title, written in a different ink from the rest of the page.');
      addJournal('Guildmaster Selene\'s undated approval signature found on a charter amendment for an unregistered subsidiary using a suppressed exemption code.', 'discovery');
      G.investigationProgress = (G.investigationProgress || 0) + 1;
      if (G.stageProgress) G.stageProgress[3] = (G.stageProgress[3] || 0) + 1;
      maybeStageAdvance();
    } else {
      addNarration('Wrong Bundle', 'The filing bundle is pulled before the player can copy the relevant page. The clerk says there\'s been a misfiling correction request and the whole bundle is under administrative hold. She is genuinely apologetic. The player remembers the charter name of the subsidiary and the shape of the signature, but nothing that can be verified against a second source.');
      if (typeof G !== 'undefined' && G.worldClocks) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
      }
    }
  }
},

// C9: Faction contact goes silent, then sends one brief message
{
  label: 'Three days of nothing. Then one line, in someone else\'s handwriting.',
  tags: ['stage3', 'faction_contact', 'silence', 'jeopardy'],
  xpReward: 70,
  fn: function() {
    var roll = rollD20('survival', G.skills.survival);
    if (roll >= 14) {
      addNarration('Relay Message', 'The message arrives folded into the lining of a grain merchant\'s delivery note, addressed to no name, written in a hand the player doesn\'t recognize. Six words: "Hold position. Do not use Shelk route." Beneath it, in different ink, two characters — a cipher key from an exchange with the faction handler at the Ironhold meeting. It\'s genuine. The player waits. On the fourth day a different courier arrives, one who has clearly been briefed only on the delivery and nothing else, carrying a second note: "Resume. New dead drop. Tanners\' quarter, loose stone, third arch." Someone built a second relay channel and tested it before using it.');
      addJournal('Faction handler went dark for three days — resumed via new relay channel using cipher verification from Ironhold meeting.', 'intelligence');
      G.investigationProgress = (G.investigationProgress || 0) + 1;
      if (G.stageProgress) G.stageProgress[3] = (G.stageProgress[3] || 0) + 1;
      maybeStageAdvance();
    } else {
      addNarration('Still Silent', 'The dead drop point yields nothing on the fourth day, or the fifth. On the sixth, the loose stone has been moved — someone accessed it — but there is no message inside. The cipher key was the only verification method the player has. Without a new contact protocol, the channel is effectively closed and the player has no way to know if the silence means danger or merely disruption.');
      if (typeof G !== 'undefined' && G.worldClocks) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
      }
    }
  }
},

// C10: Two separate tails, not coordinated
{
  label: 'Two parties. They\'re not working together. That\'s more complicated.',
  tags: ['stage3', 'surveillance', 'dual_tail', 'jeopardy'],
  xpReward: 70,
  fn: function() {
    var roll = rollD20('stealth', G.skills.stealth);
    if (roll >= 14) {
      addNarration('Counter-Surveillance', 'The woman in the grey cloak has been on the player\'s route since the Compact Hall gate — patient, professional, staying two intersections back. The man in the tan coat is different: he doesn\'t look at the player directly, but he\'s been on every other street for three days, always upstream, always ahead. They don\'t acknowledge each other. At the market crossing the player doubles back through the weaver\'s passage and watches both of them lose the thread and then separately begin searching. They cast different ways. They are definitely not reporting to the same post. The player notes both faces and finds a third route home.');
      addJournal('Player under surveillance by two separate parties operating independently — one following from behind, one maintaining forward position.', 'evidence');
      G.investigationProgress = (G.investigationProgress || 0) + 1;
      if (G.stageProgress) G.stageProgress[3] = (G.stageProgress[3] || 0) + 1;
      maybeStageAdvance();
    } else {
      addNarration('Boxed In', 'The doubled route loses one of them but not both. The man in the tan coat is waiting at the end of the weaver\'s passage as if he\'d mapped the lane grid in advance. The player walks past without breaking stride. He doesn\'t follow — he just watches the player go. That\'s worse. He already knows where the player is staying.');
      if (typeof G !== 'undefined' && G.worldClocks) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
      }
    }
  }
},

// ── GROUP D: ALLIANCE AND JEOPARDY ──────────────────────────────────────────

// D1: Seld moved to new posting, wants to leave a package
{
  label: 'Seld is being relocated. She has something she can\'t take with her.',
  tags: ['stage3', 'npc_seld', 'collegium', 'alliance'],
  xpReward: 70,
  fn: function() {
    var roll = rollD20('persuasion', G.skills.persuasion);
    if (roll >= 14) {
      addNarration('Transfer Day', 'Seld meets the player at the side entrance of the archive annex at the fourth bell, after the day clerks have gone. She has a travel case at her feet and the flat expression of someone who packed without expecting to. The package is a sealed oilcloth roll, the kind used for transit manifest bundles. She doesn\'t say what\'s inside. "It\'s safer with you than with me where I\'m going," she says. "If it becomes useful, use it. If it becomes dangerous, burn it." She doesn\'t ask for acknowledgement. She picks up her case and walks toward the Cosmouth road without looking back.');
      addJournal('Seld (Collegium archivist) transferred to undisclosed posting — left sealed document package with player before departure.', 'intelligence');
      G.investigationProgress = (G.investigationProgress || 0) + 1;
      if (G.stageProgress) G.stageProgress[3] = (G.stageProgress[3] || 0) + 1;
      maybeStageAdvance();
    } else {
      addNarration('Too Watched', 'The side entrance has a new warden post — established yesterday, Seld says when the player finds her two streets away. She can\'t make the handoff here. She\'ll find another route but she leaves tomorrow at dawn and she doesn\'t know if there will be time. The package stays with her for now and the player has no way to reach her once she\'s gone.');
      if (typeof G !== 'undefined' && G.worldClocks) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
      }
    }
  }
},

// D2: Red Hood fence replaced — better connected, higher risk
{
  label: 'New face at the Red Hood dead drop. More useful. More dangerous.',
  tags: ['stage3', 'red_hood_guild', 'fence', 'alliance'],
  xpReward: 70,
  fn: function() {
    var roll = rollD20('persuasion', G.skills.persuasion);
    if (roll >= 14) {
      addNarration('New Terms', 'The woman who opens the back room door at the chandler\'s shop is not the man the player dealt with before. She knows this and doesn\'t address it. She has the previous arrangement\'s terms written out on a strip of paper, which she sets on the table and then covers with her hand. "Those were his terms," she says. "I have different access and I charge accordingly." She can pull transit records from three Warden posts that the previous fence couldn\'t touch, and she will, for a price that is twice the old rate and includes a standing claim on one favor to be named later. The favor clause is non-negotiable. She says this without raising her voice.');
      addJournal('Red Hood Guild fence replaced — new handler has broader Warden post access at double rate plus one unspecified future favor, non-negotiable.', 'intelligence');
      G.investigationProgress = (G.investigationProgress || 0) + 1;
      if (G.stageProgress) G.stageProgress[3] = (G.stageProgress[3] || 0) + 1;
      maybeStageAdvance();
    } else {
      addNarration('Walked Out', 'The player declines the favor clause. The woman folds the paper, puts it in her coat, and stands. "Come back when the favor clause looks reasonable," she says. "It will look more reasonable soon." She means it as a prediction, not a threat, which is somehow more unsettling. The dead drop is closed until terms are accepted.');
      if (typeof G !== 'undefined' && G.worldClocks) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
      }
    }
  }
},

// D3: Stage 2 NPC asks for a favor that strains other relationships — Elowen
{
  label: 'Elowen helped me. Now she\'s asking for something that puts Jorin at risk.',
  tags: ['stage3', 'npc_elowen', 'npc_jorin', 'relationship_strain'],
  xpReward: 70,
  fn: function() {
    var roll = rollD20('persuasion', G.skills.persuasion);
    if (roll >= 14) {
      addNarration('Reciprocal Ask', 'Elowen doesn\'t dress it up. She helped the player find the suppressed charter amendments. Now the Shelkopolis archivist board is pushing a records consolidation order that will fold her annex collection into the Great Registry, where access will be controlled by a review committee she doesn\'t trust. She needs a specific pre-consolidation transfer of twelve folios routed through Craftspire — which means routing them through Jorin\'s intake desk without his supervisor knowing. She\'s asking the player to arrange it. It will work. It will also put Jorin in the path of the exact audit that is already watching him.');
      addJournal('Elowen Shelk (Shelkopolis archivist) requested folio transfer routed through Jorin\'s Craftspire intake desk — would expose Jorin to existing audit scrutiny.', 'intelligence');
      G.investigationProgress = (G.investigationProgress || 0) + 1;
      if (G.stageProgress) G.stageProgress[3] = (G.stageProgress[3] || 0) + 1;
      maybeStageAdvance();
    } else {
      addNarration('No Good Route', 'The player lays out the problem: Jorin is under audit. Routing the folios through him is not safe for him. Elowen is quiet for a long moment. "Then I need another route," she says, "and I need it in four days." There isn\'t one. The consolidation order goes through and twelve folios that the player hasn\'t read disappear into the Great Registry\'s controlled stacks.');
      if (typeof G !== 'undefined' && G.worldClocks) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
      }
    }
  }
},

// D4: Stage 1 NPC resurfaces with recontextualizing information
{
  label: 'She was there at the beginning. What she\'s saying now changes what I saw then.',
  tags: ['stage3', 'stage1_npc', 'recontextualization', 'discovery'],
  xpReward: 70,
  fn: function() {
    var roll = rollD20('lore', G.skills.lore);
    if (roll >= 14) {
      addNarration('Panim Deposition', 'The woman who ran the transit house in Panim Haven is now living in Cosmouth, running a grain storage depot. She recognizes the player immediately and doesn\'t seem surprised. Over the course of an hour she describes what happened to the transit house four months after the player passed through: a Compact procurement agent arrived with a charter amendment that reclassified her building as a subsidiary holding. She was bought out at assessed value, no negotiation. The procurement agent\'s charter commission number is the same series as the subsidiary code on the Ironhold manifest. She kept the paperwork because she thought she might need it someday. She hands it across without being asked.');
      addJournal('Panim Haven transit house operator displaced by Compact procurement — commission number matches Ironhold manifest subsidiary series.', 'discovery');
      G.investigationProgress = (G.investigationProgress || 0) + 1;
      if (G.stageProgress) G.stageProgress[3] = (G.stageProgress[3] || 0) + 1;
      maybeStageAdvance();
    } else {
      addNarration('Too Cautious', 'She has the paperwork — the player can see it in the crate behind her desk, the Compact seal visible on the top sheet. But the conversation has made her nervous. She didn\'t expect to be asked specific questions. "I\'d rather not get further into it," she says, and puts a lid on the crate. The connection between the commission numbers stays unconfirmed for now.');
      if (typeof G !== 'undefined' && G.worldClocks) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
      }
    }
  }
},

// D5: Shadowhands handler offers genuine protection with binding obligation
{
  label: 'Roaz\'s people are offering cover. Real cover. The price is what it always is.',
  tags: ['stage3', 'shadowhands', 'roaz', 'alliance', 'obligation'],
  xpReward: 70,
  fn: function() {
    var roll = rollD20('persuasion', G.skills.persuasion);
    if (roll >= 14) {
      addNarration('The Offer', 'The Shadowhands handler meets the player at the Cosmouth waterfront, at the far end of the public dock, with the evening wind off the water making it hard for anyone nearby to hear. He doesn\'t introduce himself. He says that Roaz is aware of the player\'s current situation and considers it useful to both parties for the player to remain operational. What this means in practice: one safe house in Shelkopolis, one in Cosmouth, passage documents under a secondary name, and a standing arrangement that ensures the Pattern Anomaly Notices don\'t get renewed. What it costs: one request, at a time of Roaz\'s choosing, that the player will carry out without prior knowledge of the details. He leaves the player to think about it for exactly one night.');
      addJournal('Shadowhands handler offered protection package (safe houses, documents, Notice suppression) in exchange for one undisclosed future obligation on Roaz\'s terms.', 'intelligence');
      G.flags = G.flags || {};
      G.flags.shadowhands_offer_received = true;
      G.investigationProgress = (G.investigationProgress || 0) + 1;
      if (G.stageProgress) G.stageProgress[3] = (G.stageProgress[3] || 0) + 1;
      maybeStageAdvance();
    } else {
      addNarration('No Terms', 'The player asks what the request might involve. The handler says Roaz doesn\'t negotiate terms on this kind of arrangement — that\'s what makes it an arrangement rather than a contract. He leaves the dock. The offer has a shelf life; it won\'t be extended indefinitely.');
      if (typeof G !== 'undefined' && G.worldClocks) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
      }
    }
  }
},

// D6: Two Stage 2 NPCs in conflict — Darian and Cysur
{
  label: 'Darian and Cysur both have the same piece. One of them will count back to me.',
  tags: ['stage3', 'npc_darian', 'npc_cysur', 'relationship_damage', 'jeopardy'],
  xpReward: 70,
  fn: function() {
    var roll = rollD20('stealth', G.skills.stealth);
    if (roll >= 14) {
      addNarration('Controlled Burn', 'The cargo weight data the player shared with Darian (Ironhold Quarry) has surfaced in a Warden complaint filed by Cysur (Plume\'s End) — which means Cysur used it for a route dispute without realizing where it originated. Darian knows because his intake records are now being cross-checked as a result of the complaint, and he has begun asking who else might have had access to that data. The player gets ahead of it: a message to Darian framing the situation as a common-interest problem rather than a breach. It takes most of the morning. By afternoon Darian is angry but not actively hostile. Cysur still doesn\'t know the player is the common source.');
      addJournal('Route weight data shared with Darian Stonemark (Ironhold) surfaced in Cysur\'s (Plume\'s End) Warden complaint — player as common source not yet identified by either party.', 'evidence');
      G.investigationProgress = (G.investigationProgress || 0) + 1;
      if (G.stageProgress) G.stageProgress[3] = (G.stageProgress[3] || 0) + 1;
      maybeStageAdvance();
    } else {
      addNarration('Traced Back', 'Darian works it out before the player can reach him. The message that arrives at the lodging house is short and doesn\'t leave room for explanation: "I know where that data went. Don\'t come to Ironhold." The working relationship with Darian Stonemark is closed. Cysur doesn\'t know yet, but when Darian talks — and he will, eventually — Cysur will.');
      if (typeof G !== 'undefined' && G.worldClocks) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
      }
    }
  }
},

// D7: New NPC with insider Compact knowledge approaches
{
  label: 'She knows things that aren\'t in any filing. Someone inside told her.',
  tags: ['stage3', 'new_npc', 'compact_insider', 'discovery'],
  xpReward: 70,
  fn: function() {
    var roll = rollD20('lore', G.skills.lore);
    if (roll >= 14) {
      addNarration('The Cartographer', 'The woman gives her name as Tessaly and says she works in cartographic services for a Compact infrastructure division, which is a real division that does genuinely boring work. She has been waiting at the waystation for two days. She knows the player\'s route pattern, the charter amendment series, and the name of the subsidiary that doesn\'t appear in the public registry — the last one she says quietly and watches the player\'s face when she does. She says she has been inside the administration long enough to know when a pattern is being actively managed rather than accidentally forming. She wants to show the player something. She has a transit map with routes annotated in a cipher she says she wrote herself, four years ago, before she understood what the annotations would eventually document.');
      addJournal('New source (Tessaly, Compact cartographic services) approached with insider knowledge — possesses annotated transit map in personal cipher documenting route pattern anomalies over four years.', 'discovery');
      G.investigationProgress = (G.investigationProgress || 0) + 1;
      if (G.stageProgress) G.stageProgress[3] = (G.stageProgress[3] || 0) + 1;
      maybeStageAdvance();
    } else {
      addNarration('Spooked', 'Tessaly sees something over the player\'s shoulder — a warden post transit runner entering the waystation — and stands immediately. "Not here," she says. "I\'ll find you again when the timing is better." She leaves through the side door. The player doesn\'t have a way to reach her. The map stays in her coat.');
      if (typeof G !== 'undefined' && G.worldClocks) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
      }
    }
  }
},

// D8: Choose between protecting an NPC or advancing the Stage 3 thread — Cysur
{
  label: 'Using this helps me. It burns Cysur. I have to choose which matters more.',
  tags: ['stage3', 'npc_cysur', 'moral_cost', 'jeopardy'],
  xpReward: 70,
  fn: function() {
    var roll = rollD20('persuasion', G.skills.persuasion);
    if (roll >= 14) {
      addNarration('The Narrow Choice', 'The Warden post log that Cysur passed to the player contains a notation that, if presented to the Road Wardens Order review board, would force a formal audit of the Ironhold spur route — exactly what the Stage 3 thread requires to move forward. It would also identify Cysur\'s post as the source of the leak, which would end his posting and likely his standing with the Order. The player copies the relevant three lines only, strips the post notation, and presents the data as recovered from the refiled manifest rather than a Warden source. It holds up. The audit is triggered. Cysur\'s name doesn\'t appear in the formal record.');
      addJournal('Road Wardens Order audit of Ironhold spur route triggered — source attribution obscured to protect Cysur\'s Plume\'s End posting.', 'intelligence');
      G.investigationProgress = (G.investigationProgress || 0) + 1;
      if (G.stageProgress) G.stageProgress[3] = (G.stageProgress[3] || 0) + 1;
      maybeStageAdvance();
    } else {
      addNarration('Attribution Traced', 'The review board asks where the notation originated. The player\'s reconstructed sourcing doesn\'t survive a direct question about the post identifier format. The board flags the submission as improperly sourced and tables the audit request. Cysur is not exposed — but the audit doesn\'t happen either, and the player has burned a submission opportunity with the Road Wardens Order.');
      if (typeof G !== 'undefined' && G.worldClocks) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
      }
    }
  }
},

// D9: Evidence used publicly by a faction — player's methods exposed
{
  label: 'The Oversight Collegium just published something I gathered. My methods are in it.',
  tags: ['stage3', 'oversight_collegium', 'evidence_exposed', 'faction_politics'],
  xpReward: 70,
  fn: function() {
    var roll = rollD20('lore', G.skills.lore);
    if (roll >= 14) {
      addNarration('Attributed Without Permission', 'The Oversight Collegium\'s quarterly transit review cites "independent route documentation" as supporting evidence for a subsidiary charter irregularity finding. The language is precise enough that anyone with access to the original filings would recognize the player\'s specific methodology — the weight-to-exemption-code cross-reference is not a standard audit technique. The Collegium has used the work without attribution by name, which provides some protection, but it also means the finding is now publicly linked to a specific approach that one other party in Shelkopolis will recognize as the player\'s. The player reads the review twice and then files it.');
      addJournal('Oversight Collegium published transit review citing player\'s route documentation methodology — no name attribution, but method identifiable by parties aware of player\'s work.', 'evidence');
      G.investigationProgress = (G.investigationProgress || 0) + 1;
      if (G.stageProgress) G.stageProgress[3] = (G.stageProgress[3] || 0) + 1;
      maybeStageAdvance();
    } else {
      addNarration('Named in the Footnote', 'The review does name a source: "independent route documentation provided by an unregistered agent operating in Cosmouth and Ironhold Quarry districts." It\'s not the player\'s name, but it\'s a description that matches no one else currently working those routes. The Collegium used the material and handed the player a target profile in the same publication.');
      if (typeof G !== 'undefined' && G.worldClocks) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
      }
    }
  }
},

// D10: Final jeopardy — direct threat naming three specific acts
{
  label: 'This letter names three things I did. Someone has been counting since Stage 2.',
  tags: ['stage3', 'direct_threat', 'jeopardy', 'climax_approach'],
  xpReward: 70,
  fn: function() {
    var roll = rollD20('survival', G.skills.survival);
    if (roll >= 14) {
      addNarration('The Letter', 'It arrives folded into a transit fee receipt, left at the lodging house counter with no sender name. The handwriting is even and unhurried. It names, in sequence: the Ironhold manifest pull, the Craftspire bindery meeting with Jorin, and the charter amendment addendum with Selene\'s signature. Three things the player did, in order, with approximate dates, described with the flat accuracy of someone reading from a record rather than making inferences. The final line: "These are not accusations. They are a demonstration of what is known. Further demonstrations are available." The player folds the letter, puts it in the boot lining with the other documents, and does not sleep in the lodging house that night.');
      addJournal('Received written threat naming three specific Stage 2-3 acts with accurate dates — framed as demonstration, not accusation. Source unknown.', 'evidence');
      G.flags = G.flags || {};
      G.flags.stage3_threat_received = true;
      G.investigationProgress = (G.investigationProgress || 0) + 1;
      if (G.stageProgress) G.stageProgress[3] = (G.stageProgress[3] || 0) + 1;
      maybeStageAdvance();
    } else {
      addNarration('No Safe Ground', 'The letter arrives and the player reads it in the common room, which was a mistake. The warden\'s runner who delivered the receipt is still in the doorway when the player looks up. He\'s watching. He\'s been watching since the letter was handed over. He nods once and leaves. Whoever sent this wanted the player to know they were seen reading it.');
      if (typeof G !== 'undefined' && G.worldClocks) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
      }
    }
  }
}

]; // end STAGE3_ENRICHED_CHOICES

window.STAGE3_ENRICHED_CHOICES = STAGE3_ENRICHED_CHOICES;
