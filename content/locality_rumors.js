/**
 * LOCALITY RUMORS
 * Source-attributed rumor pool keyed by locality. 4-6 rumors per locality.
 * Format: source attribution first (who/where), then the rumor content in quotes.
 * Drawn via drawLocalityRumor(localityId) in ledger-of-ash.html.
 */

var LOCALITY_RUMORS = {
  soreheim_proper: [
    'A shift foreman at the quota board, not looking up: "Third furnace hit its number two days running. Nobody up the chain asked how. That usually means they already know."',
    'A hauler at the loading yard, adjusting a strap: "Two names came off the labor roll Monday. No transfer stamp. Their tools are still in the rack."',
    'Overheard at the wage queue: "The quota sheet for next cycle was posted, pulled, and reposted with the same numbers. Someone printed it wrong twice."',
    'A widow at the shrine step, voice low: "My boy wrote he\'d be home before the frost. The foreman says his shift ended clean. Neither of them is lying."',
    'A clerk at the registry, between stamps: "Factor authorization filings for the east furnace have all been marked off-level this month. No higher office has claimed them."'
  ],
  guildheart_hub: [
    'A courier on the stair landing, out of breath: "Three Hub dispatches to the eastern chapter got routed through the southern relay last week. No one filed the reroute."',
    'Posted notice on the petitioner wall: "Requests for audience with the Council of Six are being batched monthly until further notice. Prior appointments will be honored by letter."',
    'A Guild runner at the mail drawers: "Someone\'s been pulling sealed copies from the reference archive. The librarian noticed the wax was the wrong color on the reseals."',
    'Overheard at the vestibule queue: "Selene hasn\'t taken unscheduled petitioners in eleven days. That\'s two longer than the winter audit stretch."',
    'A junior scribe at the ink counter: "Minutes from the last quarterly got circulated with four lines blacked. First time anyone here can remember that happening."'
  ],
  shelkopolis: [
    'A dock clerk at the quay register: "Three manifests from the eastern route came in blank under the cargo column. Captain signed, nothing else. That\'s not how we do it here."',
    'A seawall mason on break, pointing with his chin: "That crack in the fourth course has been flagged for repair since midwinter. The order keeps getting stamped and then not dispatched."',
    'Overheard at the fishmonger line: "House Shelk\'s guard rotation at the inner gate changed twice this week. New faces. Nobody\'s introduced them."',
    'A Titan Tower keeper at the base door: "The upper signal was lit for six hours last night. No ship in the harbor acknowledged. Log says the watchman made proper calls."',
    'A longshoreman at the bond office: "A bonded crate went missing off the westbound. Paperwork says it never arrived. Two dockhands say they loaded it themselves."'
  ],
  panim_haven: [
    'A temple acolyte sweeping the portico: "The balance censer in the north chapel has been relit three times this week. It shouldn\'t go out if the oil ledger is kept right."',
    'Posted outside the Haven refectory: "Pilgrims traveling east are advised to file intent-to-return with the warden hall. Recent travelers have not checked back."',
    'A shrine keeper at the offering rail: "The tithe from the eastern hamlets came in underweight three weeks running. The priests aren\'t saying which hamlets."',
    'Overheard at the pilgrim well: "A sister from the inland house asked for lodging and then left before the evening rite. Her name isn\'t in the register."',
    'A mendicant at the gate, accepting bread: "The old road south still has the milestones. Somebody scratched the guild marks off them between festivals."'
  ],
  aurora_crown_commune: [
    'A dome steward on the upper walkway: "A crown-rib seam hummed during the last axial flip. First time in two cycles. The engineers logged it as weather."',
    'Overheard at the commune canteen: "Rotation pulled four warders off the rim last night. No replacement schedule was posted by morning."',
    'A filter-keeper at the intake stair: "Someone changed the screen gauge on the south vent without filing a maintenance slip. Mesh is finer now. I don\'t know whose call that was."',
    'A Sheresh trader at the freight port: "My last caravan was turned at the dome gate and rerouted around. No reason given. The Roadwarden there wouldn\'t sign my delay slip."',
    'Posted on the commune board: "Apprentices assigned to the rim watch will report to the inner dispatch until further notice. Rim duty suspended."',
    'A dome-watcher at the glass: "The stress-reading on panel seventeen ticked up eight points this week. The senior says it\'s within margin. He checked the same panel four times."'
  ],
  sunspire_haven: [
    'A Haven watchman at the outer palisade: "Two head of stock went missing from the north pasture. Prints at the treeline didn\'t match any predator we keep a bounty on."',
    'Overheard at the traveler\'s kitchen: "A caravan from the southern road came in a day late. The outrider wouldn\'t take pay for the stretch he rode alone."',
    'A bell-warden on the tower stair: "The dusk bell got rung twice last Tuesday. The second wasn\'t me. The log only shows one."',
    'A Roadwarden at the east gate, checking papers: "Pilgrims are being asked to lodge inside the palisade after dark this week. Don\'t ask me who decided. The order came down without a name."',
    'A herder at the market post: "The old hunter says the pack line has shifted closer than his father ever saw. Nobody at the Haven has written it down yet."'
  ],
  shirshal: [
    'A magistrate\'s aide at the court steps: "Three permit revocations came down this week with the same reason code. Nobody files three under the same code by coincidence."',
    'Posted on the warding hall door: "Practitioners are reminded that unregistered focal items must be declared at the gate office before entry. No grace period this cycle."',
    'Overheard at the scribe\'s stall: "A glyph-warder from the inner ward was reassigned to the outer rim overnight. The duty roster was rewritten in a different hand."',
    'A practitioner at the bond counter: "My recertification took four weeks when it should have taken one. The clerk couldn\'t tell me which desk held it up."',
    'A town crier at the corner post: "Hear ye — the Magi Magistratus will hold open petition on the fourth bell tomorrow. Matters pertaining to the eastern circuits will not be received."'
  ],
  harvest_circle: [
    'A steward at the granary door: "The spoilage count on last week\'s grain came in twice what it should. The reeve signed the slip without looking at the weight."',
    'Overheard at the thresher yard: "Two field hands didn\'t report for the morning rotation. Their names were crossed off the board by someone who wasn\'t the keeper."',
    'A carter at the loading ramp: "The eastern farm\'s tithe wagon came in covered. Usually they run it open. Nobody asked why, and the reeve didn\'t tell."',
    'Posted on the reeve\'s board: "Harvest stewards reminded that sealed grain stores are to be opened only under witness of two council members. Prior exceptions revoked."',
    'A miller\'s apprentice at the sluice: "The water came down brown for a half-hour Tuesday morning. The upstream warden said the lock was fine. I ran the whole wheel with it."'
  ],
  fairhaven: [
    'A priest at the chapel step: "A ward mark in the nave chipped during the last evening rite. I laid that ward myself last spring. It doesn\'t chip."',
    'Overheard at the pilgrim house: "Three travelers checked in on Monday. Two checked out Wednesday. The book for the third is missing the closing stamp."',
    'A glyph-tender at the town gate: "The boundary stones on the east road are reading cold when they should be warm. I reported it to the deacon. He said to keep the finding to the office."',
    'Posted on the meeting hall door: "Evening devotions will be held inside the chapel until further notice. Outdoor rites suspended for the season."',
    'A market hand at the herb stall: "The grower from the northern croft hasn\'t brought in a cart in three weeks. His name is still on the stall roster."'
  ],
  cosmoria: [
    'A harbormaster\'s clerk at the quay office: "The last storm chart was posted two days behind the wind. The seers\' hall said their reading hadn\'t changed. The wind disagreed."',
    'Overheard at the fisherman\'s hall: "Three skiffs went out Tuesday. Two came back at dusk. The third came back at midnight and nobody saw it moor."',
    'A dockmaster at the weigh scale: "A bonded chest came off the northbound packet with its seals intact and its weight short. Shipper won\'t dispute it. That\'s what\'s odd."',
    'Posted on the seawall board: "Residents are advised that storm drills for the eastern quarter will be conducted without warning bells this month. Do not alarm."',
    'A lamplighter at the harbor stair: "Someone relit the breakwater lamp between my rounds last night. It was lit when I got there. That\'s not supposed to be possible."'
  ],
  mimolot_academy: [
    'A lecturer\'s assistant at the quad gate: "Two tariff scholars were moved out of the eastern seminar hall overnight. Their desk books are still inside. Nobody has the key."',
    'Overheard at the refectory: "House Mimolot withdrew its subvention for the border studies wing. The notice went up after the lamps were lit. That\'s not when announcements get posted here."',
    'A proctor at the examinations board: "The spring grading schedule shifted without a senate vote. The old one was taken down between the morning and noon bells."',
    'A student at the archive desk: "I requested a ledger from the trade history shelf. The archivist said it was on loan. The loan book has no entry for it."',
    'Posted on the senate hall door: "Guest lecturers from the eastern houses will not be received this term. Matters pertaining will be deferred to next session."'
  ],
  ithtananalor: [
    'A bailiff at the keep gate: "Lord Roaz\'s writ-bearers rode out twice this week. Both times before the morning bell. The lodging house says they didn\'t stop for the night."',
    'Overheard at the wineshop on the lower street: "The old woman from the hill house brought her son\'s charter down to be reread. The clerk wouldn\'t touch it. She walked home without it."',
    'A Roadwarden at the western checkpoint: "A practitioner with unregistered marks was turned back yesterday. His papers were in order. The mark rule isn\'t in the posted code."',
    'A scribe at the hall of records: "The archive lamps were lit after hours three nights running. The steward\'s book has no late-work slips filed."',
    'Posted at the market cross: "By writ of the Lord Magistrate: unsanctioned assembly in the lower ward after dusk will be dispersed without warning. Prior tolerances rescinded."'
  ],
  whitebridge_commune: [
    'A warden at the span\'s east footing: "The bridge deck iced from the underside Tuesday. First time this year. The salt barrel was untouched that morning."',
    'Overheard at the toll house: "Route Warden compact is running three-day delays on eastern traffic. No compact posting explains it. The wardens are polite and won\'t say."',
    'A carter at the approach ramp: "My wheels caught on the planks at the north end. That plank was replaced last month. Somebody put the new one in with the grain running wrong."',
    'A river-keeper at the stone pier: "The current came in slower under the middle arch this week. Upstream lock-keeper said nothing changed on his end. Something did."',
    'Posted on the warden post: "Travelers are reminded that evening crossings must be logged at the east and west stations. Unlogged crossings will forfeit compact standing."'
  ],
  districts: [
    'A ward watchman at the boundary stone: "Four houses in the Shelk ward got guard visits last night. None of them filed complaints. The guard captain\'s book shows no rounds."',
    'Overheard at the fashion collective\'s back door: "A Shelk cousin was seen with a pattern book from the rival house\'s archive. The book was returned by morning, unremarked."',
    'A rebuilding oath clerk at the court: "Two oath-contracts were quietly amended after signing. The notary\'s seal is on both versions. Both can\'t be valid."',
    'A street vendor at the district line: "The warders moved their checkpoint two streets west last Tuesday. The posted map in the ward hall hasn\'t been updated."',
    'A fashion artisan at the dye vats: "A commission for the eastern house was recalled after delivery. Full payment kept. They haven\'t said what they did with the piece."',
    'Posted on the district council board: "Residents of the fourth ward are advised that patrol hours will change without prior notice during the current period. Written inquiries only."'
  ],
  ironhold_quarry: [
    'A pit foreman at the rim walk: "ORE\'s weekly count came in under the seam estimate for the third week running. The senior surveyor signed it without walking the face."',
    'Overheard at the tool shed: "Two quarrymen got reassigned to the deep cut without the usual rotation notice. Their names went on the deep roster in pencil."',
    'A blast warden at the charge store: "A half-keg of black came up missing from the log. The inventory slip says it was used on Tuesday. No blast was set that day."',
    'A carter at the tip scale: "The stone tally for the eastern shipment was a full cart short on paper and matched in weight. I don\'t know how both can be true."',
    'Posted on the ORE office door: "All grievances concerning shift length will be heard at the quarterly session. No interim hearings will be convened this cycle."'
  ],
  glasswake_commune: [
    'A Concord researcher at the gate post: "An exposure incident at the second kiln wasn\'t logged in the public book. The duty nurse confirmed three names were seen. The book has none."',
    'Overheard at the canteen: "A containment team came through before sunrise and left before the shift bell. Nobody was told what they were inspecting."',
    'A glassblower\'s apprentice at the annealing oven: "The slag tray from Monday\'s pour had the wrong color under the skin. My master said to scrape it clean and say nothing."',
    'A ward-keeper at the compound fence: "The boundary sigils on the north wall faded six weeks early. I relaid them myself. The second laying faded inside a day."',
    'Posted on the commune board: "Visitors to the south kiln are suspended until further notice. Material pickups will be arranged at the gate office."'
  ],
  unity_square: [
    'A market steward at the price board: "Grain went up two coppers between the morning post and the noon post. No steward authorized the change. The chalk was in a different hand."',
    'Overheard at the coinsmith\'s window: "Union assay flagged three silver bars this week as underweight. The merchant who brought them hasn\'t come back for his receipt."',
    'A stall-keeper at the eastern row: "My permit got pulled on a morning inspection. It was renewed by afternoon. No fee was taken and no reason was written."',
    'A porter at the loading dock: "A bonded shipment from the guild hub came in with two crates missing. The manifest was signed clean. The yard captain waved it through."',
    'Posted on the square\'s notice post: "The evening price-fix session is cancelled for this week. Standing prices will be held. Inquiries to the Union office."'
  ],
  craftspire: [
    'A pattern-keeper at the archive window: "A copy of the master joinery plate went out on loan and came back with a smudge on the corner mark. That mark is how we tell the original."',
    'Overheard at the apprentice hall: "Two senior craftsmen left the spire at midnight last Thursday. Their benches are still dressed for the morning. Neither has been back."',
    'A Union inspector at the gate counter: "A piece came up for certification without its maker\'s stamp. The guild book says the stamp was applied. The piece doesn\'t show it."',
    'A dye-master at the vat row: "Somebody used my reserve madder between shifts. The weight is wrong by half a pound. The door was locked when I got here."',
    'Posted on the spire\'s guild door: "Open commissions from the eastern houses will not be accepted until further notice. Existing contracts will be honored on original terms."'
  ],
  plumes_end_outpost: [
    'A Roadwarden at the east checkpoint, unprompted: "Manifests have been running three days late from the eastern route. No explanation posted."',
    'Overheard at the caravan post: "Three caravans went out this week. Two came back on schedule. The third came back a day early with the lead driver asking to be reassigned."',
    'A supply clerk at the bond desk: "A water barrel from the last shipment came in sealed and tasting off. The seal checks out. The water doesn\'t."',
    'A Roadwarden at the stable yard: "Two horses got lamed on the same stretch of the southern road in the same week. The road hasn\'t changed. The horses shouldn\'t have."',
    'Posted on the outpost board: "Travelers bound east are advised to lodge overnight and depart in convoys of no fewer than three wagons. Effective immediately."'
  ]
};

// District sub-keys share the parent "districts" rumor pool
var DISTRICT_SUB_KEYS = [
  'aurora_heights', 'ironspool_ward', 'verdant_row', 'granary_steps',
  'iron_ledger_ward', 'reckoning_quarter', 'scriptorium_steps',
  'high_quarter', 'common_quarter', 'low_ward'
];
DISTRICT_SUB_KEYS.forEach(function(key) {
  if (!LOCALITY_RUMORS[key]) LOCALITY_RUMORS[key] = LOCALITY_RUMORS.districts;
});

window.LOCALITY_RUMORS = LOCALITY_RUMORS;
