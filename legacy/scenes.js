---
> **ARCHIVED — V28_4 SCAFFOLD**
> This file is kept for historical reference only.
> It is not part of the active runtime (V28_8).
> The active runtime uses data.js, background-locality-map.js, stage2-backgrounds.js, and narrative.js instead.
---

// ═══════════════════════════════════════════════════════
// OPENING SCENES — One unique scene per background ID
// 31 archetypes x 3 backgrounds = 93 scenes
// TEXT RULE: No apostrophes in string values. Full words only.
// ═══════════════════════════════════════════════════════

const OPENING_SCENES = {

// ── WARRIOR ──
w_garrison:{text:'The garrison bell still rings in your sleep. Three months since you handed in the tabard and walked out of Roadwardens Central Command. Shelkopolis has not changed. You have.',choices:[
  {text:'Read the garrison before speaking to anyone. Staffing patterns tell the real story.', skill:'combat', tag:'safe', align:'neutral', cid:'warrior_garrison_read'},
  {text:'Apply your combat background directly to gain access.', skill:'combat', tag:'bold', align:'neutral', cid:'combat_approach'},
  {text:'Walk toward the garrison. Old contacts are still useful even if the uniform is off.', skill:'persuasion', tag:'bold', align:'lawful', cid:'garrison_contact'},
  {text:'Find a quiet corner of Verdant Row and listen to what the market knows.', skill:'lore', tag:'safe', align:'neutral', cid:'market_intel'},
  {text:'The Amber Fountain Inn. Travelers pass through. Travelers know things.', skill:'persuasion', tag:'safe', align:'neutral', cid:'inn_arrival'}
]},
w_roaz:{text:'Ithtananalor quarry work leaves marks that Shelkopolis merchants notice. You arrived two days ago. The extraction culture of Roaz does not translate here. What does translate: a soldier who knows how fortifications are built knows exactly how they fail.',choices:[
  {text:'Apply your combat background directly to gain access.', skill:'combat', tag:'bold', align:'neutral', cid:'combat_approach'},
  {text:'Find the Roadwardens assignment board. Route security work is the fastest entry point.', skill:'combat', tag:'safe', align:'neutral', cid:'find_work'},
  {text:'The eastern gate. You know checkpoint behavior. Something is off about how these guards are moving.', skill:'lore', tag:'risky', align:'lawful', cid:'garrison_contact'},
  {text:'Ironspool Ward. Labor district. Familiar terrain for someone from extraction country.', skill:'survival', tag:'safe', align:'neutral', cid:'ironspool_intel'}
]},
w_frontier:{text:'Soreheim frontier work pays well and asks for nothing except that you survive. You have. Shelkopolis feels soft by comparison. The road orders on the Frontier Hammer circuit taught you to read terrain before you stand in it. You are reading Shelkopolis now.',choices:[
    {text:'The allocation board tracks every input. Read it before speaking to anyone.', skill:'lore', tag:'safe', align:'neutral', cid:'soreheim_allocation_read'},
  {text:'Apply your combat background directly to gain access.', skill:'combat', tag:'bold', align:'neutral', cid:'combat_approach'},
  {text:'The Roadwardens Central Command. Route security is the same work, different uniform.', skill:'combat', tag:'bold', align:'lawful', cid:'garrison_contact'},
  {text:'The market. Learn what is moving and what is not. Logistics is intelligence.', skill:'lore', tag:'safe', align:'neutral', cid:'market_intel'},
  {text:'The inn. Rest and assess before committing to anything.', skill:'survival', tag:'safe', align:'neutral', cid:'rest_recover'}
]},

// ── KNIGHT ──
k_shelk:{text:'House Shelk letters of introduction are crisp and stamped. You have carried them well. The problem is the last house you visited used the meeting to request something of Shelk that Shelk has not answered. You are caught in a polite silence that is becoming something else.',choices:[
  {text:'Apply your combat background directly to gain access.', skill:'combat', tag:'bold', align:'neutral', cid:'combat_approach'},
  {text:'Call on the House Shelk receiving office. The silence needs a face on it.', skill:'persuasion', tag:'bold', align:'lawful', cid:'house_shelk_meeting'},
  {text:'Verdant Row. Read the city mood before walking into anything official.', skill:'lore', tag:'safe', align:'neutral', cid:'market_intel'},
  {text:'The other house representative is also in Shelkopolis. Find them first.', skill:'stealth', tag:'risky', align:'neutral', cid:'rival_envoy'}
]},
k_roaz:{text:'Iron Accord knights do not retire. They reassign. You chose a third option and left Ithtananalor before the formal reassignment order arrived. The Iron Accord seal on your papers still works. How long that lasts depends on how visible you become.',choices:[
  {text:'Apply your combat background directly to gain access.', skill:'combat', tag:'bold', align:'neutral', cid:'combat_approach'},
  {text:'The Roadwardens. Iron Accord credentials translate to route security work.', skill:'combat', tag:'safe', align:'lawful', cid:'garrison_contact'},
  {text:'Find a counting house. Establish a paper identity before the Accord starts looking.', skill:'stealth', tag:'risky', align:'neutral', cid:'find_cart_driver'},
  {text:'The inn. Assess what you know and what you need before acting.', skill:'lore', tag:'safe', align:'neutral', cid:'inn_arrival'}
]},
k_order:{text:'Panim order-knights serve the death registry and its institutions. The ceremony that would have formally knighted you never happened. You are in Shelkopolis because the registry sent you with a brief: investigate an irregular memorial pattern in the capital. No formal rank. Real mandate.',choices:[
  {text:'Apply your combat background directly to gain access.', skill:'combat', tag:'bold', align:'neutral', cid:'combat_approach'},
  {text:'The Aurora Light Cathedral. Shrine attendants track memorial requests.', skill:'lore', tag:'safe', align:'lawful', cid:'shrine_contact'},
  {text:'The Panim Haven representative in the city. Your brief came from them.', skill:'persuasion', tag:'safe', align:'neutral', cid:'panim_contact'},
  {text:'The Verdant Row market. Irregular memorials spike near commercial disputes.', skill:'lore', tag:'risky', align:'neutral', cid:'market_intel'}
]},

// ── RANGER ──
r_shelk:{text:'Three seasons on the Fairhaven route and you know where every waypoint hides and which ones the route charts omit. You are in Shelkopolis because something on the eastern run changed eight days ago and the caravans coming in are quieter than they should be.',choices:[
    {text:'The market traders know what passes through. Spend a morning with them before anything else.', skill:'persuasion', tag:'safe', align:'neutral', cid:'fairhaven_market_read'},
  {text:'Apply your combat background directly to gain access.', skill:'combat', tag:'bold', align:'neutral', cid:'combat_approach'},
  {text:'The Roadwardens route board. See what is officially posted about the eastern route.', skill:'lore', tag:'safe', align:'lawful', cid:'read_notices'},
  {text:'The eastern gate. Check the checkpoint behavior personally.', skill:'survival', tag:'bold', align:'neutral', cid:'east_road'},
  {text:'Find a caravan captain who just came in from the east. They will know.', skill:'persuasion', tag:'safe', align:'neutral', cid:'gate_travelers'}
]},
r_soreheim:{text:'Giant Council survey work takes you far from anything named. You are in Shelkopolis because your correction of the Shelk-Soreheim corridor map has not been officially filed. That correction has value. It also has implications about a route closure nobody has explained.',choices:[
    {text:'The allocation board tracks every input. Read it before speaking to anyone.', skill:'lore', tag:'safe', align:'neutral', cid:'soreheim_allocation_read'},
  {text:'Apply your combat background directly to gain access.', skill:'combat', tag:'bold', align:'neutral', cid:'combat_approach'},
  {text:'The trade registry. Your corrections affect supply route viability.', skill:'persuasion', tag:'bold', align:'neutral', cid:'sell_map_data'},
  {text:'The Roadwardens map office. Cross-reference your corrections against their current charts.', skill:'survival', tag:'risky', align:'neutral', cid:'map_office'},
  {text:'The inn. File the corrections privately before anyone else acts on them.', skill:'lore', tag:'safe', align:'neutral', cid:'inn_arrival'}
]},
r_sheresh:{text:'The Sheresh dome perimeter is the most hostile terrain most rangers ever work. You are in Shelkopolis because the dome stewards sent you south to investigate what is happening on the trade routes that supply their settlements. The axis data you carry tells part of the story.',choices:[
  {text:'Apply your combat background directly to gain access.', skill:'combat', tag:'bold', align:'neutral', cid:'combat_approach'},
  {text:'The Roadwardens. Axis corridor closures are their jurisdiction.', skill:'survival', tag:'safe', align:'neutral', cid:'map_office'},
  {text:'Find a scholar who studies axis inversion cycles.', skill:'lore', tag:'risky', align:'neutral', cid:'gilded_archives'},
  {text:'The trade registry. Supply disruptions to the domes will show in shipment records.', skill:'lore', tag:'safe', align:'lawful', cid:'trade_registry'}
]},

// ── PALADIN ──
p_cysur:{text:'The Aurora Light Cathedral sent you out with a blessing and a brief. Cysur demands comfort and communal bonds. The city is testing both. Families are filing private memorial requests at a rate the cathedral attendant named Sera cannot explain. You can start there.',choices:[
  {text:'Apply your combat background directly to gain access.', skill:'combat', tag:'bold', align:'neutral', cid:'combat_approach'},
  {text:'Speak with Sera. The memorial pattern is the beginning of something.', skill:'persuasion', tag:'safe', align:'lawful', cid:'shrine_contact'},
  {text:'The families themselves. Grief is where truth lives.', skill:'persuasion', tag:'risky', align:'neutral', cid:'trace_missing_persons'},
  {text:'Verdant Row. If the cause is commercial, the market will know before the shrine does.', skill:'lore', tag:'safe', align:'neutral', cid:'market_intel'}
]},
p_eloljaro:{text:'You were sent to Ithtananalor to correct something. The correction was incomplete. You followed the thread to Shelkopolis because two names in the Roazian enforcement records appear in a Shelk administrative file you should not have had access to. You had access because Eloljaro opens the right doors.',choices:[
  {text:'Apply your combat background directly to gain access.', skill:'combat', tag:'bold', align:'neutral', cid:'combat_approach'},
  {text:'Find the Shelk administrative file origin. Someone here filed both documents.', skill:'lore', tag:'risky', align:'neutral', cid:'probe_order_origin'},
  {text:'The Roadwardens. Administrative overlap between Roaz enforcement and Shelk operations is unusual.', skill:'persuasion', tag:'bold', align:'lawful', cid:'garrison_contact'},
  {text:'The Panim shrine. Eloljaro and Cysur maintain diplomatic contact through shared institutions.', skill:'lore', tag:'safe', align:'lawful', cid:'shrine_contact'}
]},
// ── ARCHER ──
a_roadwarden:{text:'Patient work is the job. You held elevated positions on three route circuits and you are good at waiting. Then the eastern route went wrong. What a marksman notices from elevation is different from what ground units see. You saw something. Nobody asked what.',choices:[
  {text:'Apply your combat background directly to gain access.', skill:'combat', tag:'bold', align:'neutral', cid:'combat_approach'},
  {text:'Report to the Roadwardens. Let the institution decide whether what you saw matters.', skill:'persuasion', tag:'safe', align:'lawful', cid:'garrison_contact'},
  {text:'Go back to the elevated position you were on when it happened. Look again.', skill:'survival', tag:'risky', align:'neutral', cid:'east_road'},
  {text:'Find a Roadwarden officer off-duty. Official channels are too slow.', skill:'stealth', tag:'bold', align:'neutral', cid:'find_roadwarden'}
]},
a_frontier:{text:'Sunspire Haven marks the edge of managed territory. You operated past it as part of the Frontier Ranging Company. What you encountered out there has bearing on the eastern route situation in Shelkopolis. The connection is not obvious from the city side.',choices:[
  {text:'Read the terrain from elevation before engaging with anyone.', skill:'survival', tag:'bold', align:'neutral', cid:'archer_frontier_read'},
  {text:'Apply your combat background directly to gain access.', skill:'combat', tag:'bold', align:'neutral', cid:'combat_approach'},
  {text:'Find who in Shelkopolis is tracking the eastern route situation.', skill:'lore', tag:'safe', align:'neutral', cid:'market_intel'},
  {text:'The Soreheim trade registry. Frontier ranging companies file incident reports there.', skill:'lore', tag:'risky', align:'lawful', cid:'trade_registry'},
  {text:'Establish a position in the city. Find the high ground, figuratively.', skill:'stealth', tag:'safe', align:'neutral', cid:'passive_intel'}
]},
a_nomdara:{text:'Caravan guard work means you have seen the approach to every polity on the circuit. The Guildheart Hub to Principalities run changed eight days ago. The caravan captain rerouted without explanation. You took your pay and followed the original route to find out why.',choices:[
    {text:'The Union freight manifests are the most comprehensive records on the route. Read them.', skill:'lore', tag:'safe', align:'neutral', cid:'guildheart_manifest_read'},
  {text:'Apply your combat background directly to gain access.', skill:'combat', tag:'bold', align:'neutral', cid:'combat_approach'},
  {text:'The Roadwardens. The original route runs through their jurisdiction.', skill:'persuasion', tag:'safe', align:'lawful', cid:'garrison_contact'},
  {text:'Find other Nomdara guards who ran the same circuit recently.', skill:'lore', tag:'risky', align:'neutral', cid:'gate_travelers'},
  {text:'Check the route yourself before talking to anyone official.', skill:'survival', tag:'bold', align:'neutral', cid:'east_road'}
]},

// ── BERSERKER ──

b_frontier:{text:'First through the door means you have a body count that most soldiers reach only after years. Shelkopolis does not need a breacher for most of what it does. What it needs is someone who is not afraid of a door that is better locked than it should be.',choices:[
  {text:'Apply your combat background directly to gain access.', skill:'combat', tag:'bold', align:'neutral', cid:'combat_approach'},
  {text:'The Roadwardens assignment board. Route security jobs use your capabilities.', skill:'combat', tag:'safe', align:'neutral', cid:'find_work'},
  {text:'Ironspool Ward. Labor district. Someone there will know who is hiring for difficult work.', skill:'combat', tag:'risky', align:'neutral', cid:'ironspool_intel'},
  {text:'The inn. Patience before commitment.', skill:'survival', tag:'safe', align:'neutral', cid:'rest_recover'}
]},

// ── WIZARD ──
wz_mimolot:{text:'Three years at Mimolot Academy and you left before the tariff office could convert your loyalty into permanent debt. The schedule you found in the restricted archive corresponds to three eastern route closure dates. You are in Shelkopolis because the schedule says something moved through here that should not have moved through anywhere.',choices:[
    {text:'The Mimolot archive holds unpublished submissions. That is where the suppressed analysis lives.', skill:'lore', tag:'safe', align:'neutral', cid:'mimolot_archive_read'},
  {text:'Apply specialist knowledge to read what others cannot.', skill:'lore', tag:'risky', align:'neutral', cid:'magic_read'},
  {text:'The Gilded Archives. Cross-reference your schedule against their transit records.', skill:'lore', tag:'safe', align:'neutral', cid:'gilded_archives'},
  {text:'The Mimolot tariff representative in Shelkopolis. They will know if the transit was authorized.', skill:'lore', tag:'bold', align:'neutral', cid:'tariff_contact'},
  {text:'Study the schedule again first. You are missing something in the encoding.', skill:'lore', tag:'safe', align:'neutral', cid:'study_packet'}
]},
wz_shelk:{text:'Court magic service is discrete by design. You know what House Shelk does and does not want on the record. You also know about an eastern operation that is not on any record you were shown. Your departure from court service was professionally described as a leave of absence.',choices:[
  {text:'Apply specialist knowledge to read what others cannot.', skill:'lore', tag:'risky', align:'neutral', cid:'magic_read'},
  {text:'The House Shelk receiving office. There is a conversation that needs to happen.', skill:'persuasion', tag:'bold', align:'lawful', cid:'house_shelk_meeting'},
  {text:'The Shadowhands drop site you were shown in case of emergency. This qualifies.', skill:'stealth', tag:'risky', align:'chaotic', cid:'shadowhands_contact'},
  {text:'Find another court magician still in service. Someone knows more than you.', skill:'lore', tag:'safe', align:'neutral', cid:'passive_intel'}
]},
wz_field:{text:'You documented what axis inversions do to material systems in the Zootian Expanse. The report went nowhere academic. The data is still in your notes, and notes are currency. You are in Shelkopolis because House Shelk controls the trade routes affected by what you found, and someone here has been asking similar questions.',choices:[
    {text:'The allocation board tracks every input. Read it before speaking to anyone.', skill:'lore', tag:'safe', align:'neutral', cid:'soreheim_allocation_read'},
  {text:'Apply specialist knowledge to read what others cannot.', skill:'lore', tag:'risky', align:'neutral', cid:'magic_read'},
  {text:'The trade registry. Your findings should match the supply disruption pattern.', skill:'lore', tag:'safe', align:'lawful', cid:'trade_registry'},
  {text:'Find who else is asking about axis corridor effects on the eastern routes.', skill:'lore', tag:'risky', align:'neutral', cid:'probe_order_origin'},
  {text:'The Zootian factor in the city. They will want your findings or want them suppressed.', skill:'persuasion', tag:'bold', align:'neutral', cid:'zootia_contact'}
]},

// ── CLERIC ──
cl_cysur:{text:'The Aurora Light Cathedral trained you. The city tests you. Sera, the shrine attendant, has told you about an unusual volume of private memorial requests this week. Families filing for someone they expect not to find through official channels. Cysur demands comfort. You follow the demand.',choices:[
  {text:'Apply specialist knowledge to read what others cannot.', skill:'lore', tag:'risky', align:'neutral', cid:'magic_read'},
  {text:'Speak with the families directly. Their grief is the data.', skill:'persuasion', tag:'safe', align:'neutral', cid:'trace_missing_persons'},
  {text:'Help Sera with shrine maintenance. Trust is built through service.', skill:'craft', tag:'safe', align:'neutral', cid:'shrine_service'},
  {text:'Find what the families have in common. The pattern will point somewhere.', skill:'lore', tag:'risky', align:'neutral', cid:'market_intel'}
]},
cl_eloljaro:{text:'Ithtananalor sent you to Shelkopolis with a case file marked incomplete. The Roazian enforcement records and the Shelk administrative overlap are both in the file. Eloljaro requires correction of what has gone wrong. What went wrong here is still being determined.',choices:[
  {text:'Apply specialist knowledge to read what others cannot.', skill:'lore', tag:'risky', align:'neutral', cid:'magic_read'},
  {text:'The House Shelk receiving office. This is their territory and their problem.', skill:'persuasion', tag:'bold', align:'lawful', cid:'house_shelk_meeting'},
  {text:'The Roadwardens. Enforcement overlap between polities goes through their route jurisdiction.', skill:'lore', tag:'safe', align:'lawful', cid:'garrison_contact'},
  {text:'Read the case file again. The connection between the two document sets is not yet clear.', skill:'lore', tag:'safe', align:'neutral', cid:'study_packet'}
]},
cl_remeny:{text:'Guildheart Hub is where commerce and desperation meet in equal measure. Remeny governs hope and power. You came to Shelkopolis following a trade disruption that is pushing Hub merchants into a kind of desperation that creates real danger. What gives people hope in this city is access to what they need. What they need is moving strangely.',choices:[
    {text:'The Union freight manifests are the most comprehensive records on the route. Read them.', skill:'lore', tag:'safe', align:'neutral', cid:'guildheart_manifest_read'},
  {text:'Apply specialist knowledge to read what others cannot.', skill:'lore', tag:'risky', align:'neutral', cid:'magic_read'},
  {text:'The trade registry. The supply disruption pattern is where the problem starts.', skill:'lore', tag:'safe', align:'lawful', cid:'trade_registry'},
  {text:'The Union representative. Guildheart merchants report to them.', skill:'persuasion', tag:'safe', align:'neutral', cid:'union_contact'},
  {text:'The shrine to Cysur. Remeny and Cysur are aligned in practice. Start there.', skill:'persuasion', tag:'safe', align:'lawful', cid:'shrine_contact'}
]},

// ── PRIEST ──
pr_panim:{text:'Panim afterlife registry keeps records most families would pay to change. Three entries in the registry have drawn your attention: same notary, same filing day, different death dates. You followed the thread to Shelkopolis because the notary is operating from the eastern corridor.',choices:[
  {text:'Apply specialist knowledge to read what others cannot.', skill:'lore', tag:'risky', align:'neutral', cid:'magic_read'},
  {text:'Find the Panim Haven representative in Shelkopolis.', skill:'persuasion', tag:'safe', align:'neutral', cid:'panim_contact'},
  {text:'Find the families named in the three entries.', skill:'persuasion', tag:'risky', align:'neutral', cid:'find_family'},
  {text:'Write out everything you remember from the registry before the details fade.', skill:'lore', tag:'safe', align:'neutral', cid:'record_memory'}
]},
pr_community:{text:'Three years of Fairhaven weddings, harvests, and funerals taught you more about the Principalities than any archive. You are in Shelkopolis because a family from your congregation has not been heard from in two weeks. They were traveling the eastern route. You know this city. You know how to find people who do not want to be found.',choices:[
    {text:'The market traders know what passes through. Spend a morning with them before anything else.', skill:'persuasion', tag:'safe', align:'neutral', cid:'fairhaven_market_read'},
  {text:'Apply specialist knowledge to read what others cannot.', skill:'lore', tag:'risky', align:'neutral', cid:'magic_read'},
  {text:'The Aurora Light Cathedral. Sera will have heard something.', skill:'persuasion', tag:'safe', align:'lawful', cid:'shrine_contact'},
  {text:'The Roadwardens. If they are on the eastern route, that is where to start.', skill:'persuasion', tag:'safe', align:'lawful', cid:'garrison_contact'},
  {text:'The Amber Fountain Inn. Travelers coming from the east pass through.', skill:'lore', tag:'safe', align:'neutral', cid:'inn_arrival'}
]},
pr_soreheim:{text:'Soreheim allocation halls have shrine duties. Faith and contribution are the same thing there. You left when your own contribution was questioned by an administrator whose name appears on the same eastern corridor closure order that shut down three supply routes. The connection requires explanation.',choices:[
    {text:'The allocation board tracks every input. Read it before speaking to anyone.', skill:'lore', tag:'safe', align:'neutral', cid:'soreheim_allocation_read'},
  {text:'Apply specialist knowledge to read what others cannot.', skill:'lore', tag:'risky', align:'neutral', cid:'magic_read'},
  {text:'Find the administrator. Selwyn Coth is the name on the closure order.', skill:'stealth', tag:'risky', align:'neutral', cid:'find_cart_driver'},
  {text:'The trade registry. Closure orders affect supply flows. The pattern will show.', skill:'lore', tag:'safe', align:'lawful', cid:'trade_registry'},
  {text:'The Roadwardens. They should know about a closure order that bypassed their chain.', skill:'persuasion', tag:'bold', align:'lawful', cid:'garrison_contact'}
]},

// ── NECROMANCER ──
nc_panim:{text:'The Panim registry keeps records nobody is supposed to correlate. You correlated them. Three entries, one notary, death dates that do not match the filing pattern. You followed the notary to the eastern corridor and the corridor to Shelkopolis. What moves between death registries and supply depots is not obvious. You intend to make it obvious.',choices:[
  {text:'Death records are the most honest documents a settlement produces. Read them first.', skill:'lore', tag:'safe', align:'neutral', cid:'necromancer_panim_read'},
  {text:'Apply specialist knowledge to read what others cannot.', skill:'lore', tag:'risky', align:'neutral', cid:'magic_read'},
  {text:'The Panim Haven representative. Your registry findings have official standing here.', skill:'persuasion', tag:'safe', align:'neutral', cid:'panim_contact'},
  {text:'The Gilded Archives. Death registry correlations have precedent in historical cases.', skill:'lore', tag:'risky', align:'neutral', cid:'gilded_archives'},
  {text:'Find the notary. They are the operational node connecting the two datasets.', skill:'stealth', tag:'bold', align:'neutral', cid:'find_cart_driver'}
]},
nc_mimolot:{text:'The restricted section of the Mimolot archive contains texts the tariff office does not catalog. You studied them anyway. What you found has applications the academy would describe as prohibited and you would describe as necessary. You are in Shelkopolis because the supply chain disruption on the eastern route matches a pattern in one of those texts.',choices:[
    {text:'The Mimolot archive holds unpublished submissions. That is where the suppressed analysis lives.', skill:'lore', tag:'safe', align:'neutral', cid:'mimolot_archive_read'},
  {text:'Apply specialist knowledge to read what others cannot.', skill:'lore', tag:'risky', align:'neutral', cid:'magic_read'},
  {text:'The Gilded Archives. They may hold texts that corroborate what you found.', skill:'lore', tag:'safe', align:'neutral', cid:'gilded_archives'},
  {text:'The Magi Magistratus is conducting an audit in Shelkopolis right now. Find out what they are auditing.', skill:'lore', tag:'risky', align:'neutral', cid:'investigate_rooms'},
  {text:'The eastern depot itself. Physical evidence is more reliable than texts.', skill:'lore', tag:'bold', align:'neutral', cid:'east_road'}
]},
nc_sheresh:{text:'The thing contained in Aurora Crown Commune is not fully understood. You understand it better than most researchers in the Containment Research Concord and that has made your position there complicated. You are in Shelkopolis because a supply disruption on the eastern route is producing symptoms in the cargo records that match what you study.',choices:[
  {text:'Apply specialist knowledge to read what others cannot.', skill:'lore', tag:'risky', align:'neutral', cid:'magic_read'},
  {text:'The Magi Magistratus is auditing in Shelkopolis. That is not a coincidence.', skill:'lore', tag:'risky', align:'neutral', cid:'investigate_rooms'},
  {text:'Find the Containment Research Concord contact in the city. They may already know.', skill:'lore', tag:'safe', align:'neutral', cid:'probe_order_origin'},
  {text:'The trade registry. Symptom patterns in cargo records are the place to start.', skill:'lore', tag:'safe', align:'lawful', cid:'trade_registry'}
]},

// ── ILLUSIONIST ──
il_shelk:{text:'You performed for nobles who could not tell illusion from reality and preferred it that way. The eastern operation uses the same principle. Something is being moved under cover of a false manifest. You recognize the technique because you have used it. The difference is scale.',choices:[
  {text:'Apply specialist knowledge to read what others cannot.', skill:'lore', tag:'risky', align:'neutral', cid:'magic_read'},
  {text:'The House Shelk receiving office. Someone there authorized the false manifest.', skill:'persuasion', tag:'bold', align:'lawful', cid:'house_shelk_meeting'},
  {text:'Find who in the city is running the misdirection. Professionals recognize each other.', skill:'stealth', tag:'risky', align:'neutral', cid:'find_cart_driver'},
  {text:'The market. False manifests leave behavioral traces in how merchants respond to cargo.', skill:'lore', tag:'safe', align:'neutral', cid:'market_intel'}
]},
il_union:{text:'Three seasons at Guildheart Hub trade fairs taught you what each polity wants to believe about itself. The eastern operation exploits the gap between what House Shelk believes about its own depot security and what is actually happening there. You have seen this kind of exploitation before.',choices:[
    {text:'The Union freight manifests are the most comprehensive records on the route. Read them.', skill:'lore', tag:'safe', align:'neutral', cid:'guildheart_manifest_read'},
  {text:'Apply specialist knowledge to read what others cannot.', skill:'lore', tag:'risky', align:'neutral', cid:'magic_read'},
  {text:'The Union representative. They are also watching the Shelk depot situation.', skill:'persuasion', tag:'safe', align:'neutral', cid:'union_contact'},
  {text:'Find who designed the false manifest operation. It is sophisticated work.', skill:'lore', tag:'risky', align:'neutral', cid:'probe_order_origin'},
  {text:'The trade fair performers circuit. Someone in the performance community is running cover.', skill:'stealth', tag:'bold', align:'neutral', cid:'find_cart_driver'}
]},
il_twyll:{text:'Twyll does not ask for worship. Twyll asks for results. The eastern operation is elegant: a false manifest, a complicit administrator, and a city that trusts its own oversight too much. You are in Shelkopolis because results of this scale deserve a witness. You may also be in a position to make them better or worse.',choices:[
  {text:'Apply specialist knowledge to read what others cannot.', skill:'lore', tag:'risky', align:'neutral', cid:'magic_read'},
  {text:'Find the Shadowhands. They are watching this and have not decided what to do.', skill:'stealth', tag:'risky', align:'chaotic', cid:'shadowhands_contact'},
  {text:'Introduce yourself to one side of the operation and assess the offer.', skill:'persuasion', tag:'bold', align:'neutral', cid:'passive_intel'},
  {text:'The Magi Magistratus audit may intersect with what you are watching. Find out.', skill:'lore', tag:'safe', align:'neutral', cid:'investigate_rooms'}
]},

// ── INQUISITOR ──
iq_shirsh:{text:'Shirshal evidence vaults contain records of things done quietly and officially. You read enough of them to ask the wrong questions about the eastern corridor. House Shirsh sent you to Shelkopolis to follow the thread officially. The brief says: observe, record, report. It does not say: stop if the thread leads somewhere inconvenient.',choices:[
    {text:'The Shirsh evidence vault holds everything collected and never prosecuted. Look there.', skill:'lore', tag:'safe', align:'neutral', cid:'shirshal_evidence_read'},
  {text:'Run the case the way Shirsh training runs it: evidence first, theory second. Pull the registers.', skill:'lore', tag:'safe', align:'neutral', cid:'inquisitor_shirsh_read'},
  {text:'Apply specialist knowledge to read what others cannot.', skill:'lore', tag:'risky', align:'neutral', cid:'magic_read'},
  {text:'The Roadwardens. Shirsh investigator credentials give you standing here.', skill:'lore', tag:'safe', align:'lawful', cid:'garrison_contact'},
  {text:'The House Shelk receiving office. Announce your presence and purpose.', skill:'persuasion', tag:'bold', align:'lawful', cid:'house_shelk_meeting'},
  {text:'Observe before announcing. Let the investigation determine who needs to know you are here.', skill:'stealth', tag:'risky', align:'neutral', cid:'passive_intel'}
]},
iq_mimolot:{text:'You investigated scholars who exceeded their access permissions. You found one whose reasons for exceeding them were more significant than the violation. That scholar is in Shelkopolis, working for a private collection that does not advertise. You followed them here with the tariff office brief to recover a restricted text. The text is secondary.',choices:[
    {text:'The Mimolot archive holds unpublished submissions. That is where the suppressed analysis lives.', skill:'lore', tag:'safe', align:'neutral', cid:'mimolot_archive_read'},
  {text:'Apply specialist knowledge to read what others cannot.', skill:'lore', tag:'risky', align:'neutral', cid:'magic_read'},
  {text:'Find the private collection. The scholar is there.', skill:'stealth', tag:'risky', align:'neutral', cid:'find_cart_driver'},
  {text:'The Gilded Archives. They will know about any unlicensed scholarly collections in the city.', skill:'lore', tag:'safe', align:'neutral', cid:'gilded_archives'},
  {text:'Announce your presence to the Mimolot tariff representative first.', skill:'persuasion', tag:'safe', align:'neutral', cid:'tariff_contact'}
]},
iq_union:{text:'Three seasons auditing Guild Sanction Board cases taught you that commerce and investigation have the same decision structure. The eastern route disruption has a Guild Sanction Board dimension: Union manifests were used without authorization. That is a contract violation in your jurisdiction.',choices:[
    {text:'The Union freight manifests are the most comprehensive records on the route. Read them.', skill:'lore', tag:'safe', align:'neutral', cid:'guildheart_manifest_read'},
  {text:'Apply specialist knowledge to read what others cannot.', skill:'lore', tag:'risky', align:'neutral', cid:'magic_read'},
  {text:'The Union representative. Their counting house is closed for audit. That is a lead.', skill:'persuasion', tag:'bold', align:'neutral', cid:'union_contact'},
  {text:'The Roadwardens. Unauthorized manifest use affects their route security jurisdiction.', skill:'lore', tag:'safe', align:'lawful', cid:'garrison_contact'},
  {text:'The trade registry. Find every unauthorized manifest from the last eight days.', skill:'lore', tag:'risky', align:'lawful', cid:'trade_registry'}
]},

// ── ELEMENTALIST ──
el_axis:{text:'You crossed terrain during axis inversion. You know what the force does to material systems: route closures, supply disruptions, livestock deaths, and agricultural collapse. The eastern route closure eight days ago happened during a period of axis anomaly. The timing is not coincidental.',choices:[
  {text:'Apply specialist knowledge to read what others cannot.', skill:'lore', tag:'risky', align:'neutral', cid:'magic_read'},
  {text:'The Roadwardens map office. The anomaly should be in the corridor update records.', skill:'survival', tag:'bold', align:'neutral', cid:'map_office'},
  {text:'Find a scholar tracking the same anomaly. You are not the only one who noticed.', skill:'lore', tag:'risky', align:'neutral', cid:'gilded_archives'},
  {text:'Go east. The anomaly was strongest there. The evidence will be physical.', skill:'survival', tag:'bold', align:'neutral', cid:'east_road'}
]},

// ── ROGUE ──
ro_shelk:{text:'Information is currency in Shelkopolis. You were good at earning it. The problem is who you owe now. The Shadowhands have gone quiet for three weeks. Your drop site was cleaned within the last twelve hours. That means someone knows where it is and chose to send absence as the message.',choices:[
  {text:'Read the Ward before engaging. Three hours watching who watches whom tells you more than any contact.', skill:'stealth', tag:'bold', align:'neutral', cid:'rogue_shelk_read'},
  {text:'Find a position to observe the operation before anyone knows you are looking.', skill:'stealth', tag:'bold', align:'neutral', cid:'stealth_surveillance'},
  {text:'Check the drop site. If there is a message, it is there. If not, you know something else.', skill:'stealth', tag:'risky', align:'chaotic', cid:'check_drop'},
  {text:'Find a Shadowhands contact through an alternate channel.', skill:'stealth', tag:'bold', align:'chaotic', cid:'shadowhands_contact'},
  {text:'Do nothing. Let them come to you.', skill:'lore', tag:'safe', align:'neutral', cid:'wait_observe'}
]},
ro_union:{text:'The sea smells like salt and plausible deniability. Guildheart Hub dock work taught you that the gap between manifest and actual cargo is where everything interesting lives. You are in Shelkopolis because a consignment you helped move three weeks ago is now the subject of a Roadwarden investigation. The investigation is not finding you yet.',choices:[
    {text:'The Union freight manifests are the most comprehensive records on the route. Read them.', skill:'lore', tag:'safe', align:'neutral', cid:'guildheart_manifest_read'},
  {text:'Find a position to observe the operation before anyone knows you are looking.', skill:'stealth', tag:'bold', align:'neutral', cid:'stealth_surveillance'},
  {text:'Find out how close the investigation is before deciding what to do.', skill:'stealth', tag:'risky', align:'neutral', cid:'passive_intel'},
  {text:'The Shadowhands. You need to know if they are already managing this.', skill:'stealth', tag:'bold', align:'chaotic', cid:'shadowhands_contact'},
  {text:'Distance yourself from the consignment. Change your visible activity.', skill:'lore', tag:'safe', align:'neutral', cid:'find_work'}
]},
ro_nomdara:{text:'Every road between here and the Soreheim allocation halls. Some of them twice, from different sides. The Nomdara Caravan paid you off in Guildheart Hub and the next pickup is not until the Begnar market cycle. You are in Shelkopolis because the caravan captain rerouted eight days ago without explanation and you followed the original route to find out why.',choices:[
    {text:'The Union freight manifests are the most comprehensive records on the route. Read them.', skill:'lore', tag:'safe', align:'neutral', cid:'guildheart_manifest_read'},
  {text:'Find a position to observe the operation before anyone knows you are looking.', skill:'stealth', tag:'bold', align:'neutral', cid:'stealth_surveillance'},
  {text:'The eastern gate. The original route runs that direction.', skill:'stealth', tag:'bold', align:'neutral', cid:'east_road'},
  {text:'Find other Nomdara caravan hands in the city. They will know what the captain knows.', skill:'persuasion', tag:'safe', align:'neutral', cid:'gate_travelers'},
  {text:'The inn. Gather information before committing to a direction.', skill:'lore', tag:'safe', align:'neutral', cid:'inn_arrival'}
]},

// ── ASSASSIN ──
as_shadowhands:{text:'Your employer has gone quiet for three weeks. In Shelkopolis, information services change hands without notifying the assets. You do not know if you still work for anyone. What you do know: the eastern operation is significant enough that three different parties have approached you through channels that suggest they know what you are.',choices:[
  {text:'Find a position to observe the operation before anyone knows you are looking.', skill:'stealth', tag:'bold', align:'neutral', cid:'stealth_surveillance'},
  {text:'Check the drop site. The Shadowhands will have left guidance if the silence is strategic.', skill:'stealth', tag:'risky', align:'chaotic', cid:'check_drop'},
  {text:'Let one of the three parties make their offer. Information before commitment.', skill:'persuasion', tag:'bold', align:'neutral', cid:'passive_intel'},
  {text:'Observe the eastern situation from a neutral position before aligning.', skill:'stealth', tag:'safe', align:'neutral', cid:'wait_observe'}
]},
as_redhoodguild:{text:'The Red Hood Guild does not ask questions about origin. You appreciated that. Now you have a question they cannot answer: who contracted the last job, and why did the job description not match the actual work. The eastern operation was not what you were told it was. You are in Shelkopolis to find out what it actually is.',choices:[
  {text:'Find a position to observe the operation before anyone knows you are looking.', skill:'stealth', tag:'bold', align:'neutral', cid:'stealth_surveillance'},
  {text:'Find the contract originator. Follow the money.', skill:'lore', tag:'risky', align:'neutral', cid:'probe_order_origin'},
  {text:'Find the Red Hood Guild presence in Shelkopolis. They may already be investigating.', skill:'stealth', tag:'safe', align:'chaotic', cid:'shadowhands_contact'},
  {text:'Return to the eastern depot where the job took place. The site will tell you something.', skill:'stealth', tag:'bold', align:'neutral', cid:'east_road'}
]},
as_shirsh:{text:'Shirshal uses assets it does not acknowledge. You stopped waiting for acknowledgment. What you received instead was a case file: the eastern operation involves parties that House Shirsh watches but does not want to expose directly. You are the indirect approach.',choices:[
    {text:'The Shirsh evidence vault holds everything collected and never prosecuted. Look there.', skill:'lore', tag:'safe', align:'neutral', cid:'shirshal_evidence_read'},
  {text:'Find a position to observe the operation before anyone knows you are looking.', skill:'stealth', tag:'bold', align:'neutral', cid:'stealth_surveillance'},
  {text:'The Shirsh investigator already in Shelkopolis is working the official side. Find them.', skill:'stealth', tag:'risky', align:'neutral', cid:'find_note_sender'},
  {text:'Identify the key node in the operation and assess removal.', skill:'lore', tag:'bold', align:'neutral', cid:'probe_order_origin'},
  {text:'Observe before acting. The case file says watch first.', skill:'stealth', tag:'safe', align:'neutral', cid:'passive_intel'}
]},

// ── SPELLTHIEF ──
st_mimolot:{text:'The sealed packet in your coat is from a Mimolot archive you were never cleared to access. The schedule inside it is the most interesting thing you have stolen in two years. Three entries correspond to eastern route closure dates. The academic language is cover for something material.',choices:[
    {text:'The Mimolot archive holds unpublished submissions. That is where the suppressed analysis lives.', skill:'lore', tag:'safe', align:'neutral', cid:'mimolot_archive_read'},
  {text:'Find a position to observe the operation before anyone knows you are looking.', skill:'stealth', tag:'bold', align:'neutral', cid:'stealth_surveillance'},
  {text:'Find whoever name is circled in the schedule. That is always where it leads.', skill:'lore', tag:'risky', align:'neutral', cid:'follow_circled_name'},
  {text:'The Gilded Archives. They buy documents. The schedule has value.', skill:'persuasion', tag:'risky', align:'chaotic', cid:'sell_intel'},
  {text:'Read the schedule again. There is something in the encoding you have not cracked.', skill:'lore', tag:'safe', align:'neutral', cid:'study_packet'}
]},
st_court:{text:'You performed for people who had things worth taking. Eventually the performance was the cover. You have three court magicians observation notebooks and a question: what were they doing in the eastern corridor on the dates you noted in the schedule? The answer has commercial value.',choices:[
  {text:'Find a position to observe the operation before anyone knows you are looking.', skill:'stealth', tag:'bold', align:'neutral', cid:'stealth_surveillance'},
  {text:'Find who will pay most for the observation notebooks.', skill:'persuasion', tag:'risky', align:'chaotic', cid:'sell_intel'},
  {text:'Use the notebooks to identify the practitioners yourself.', skill:'lore', tag:'safe', align:'neutral', cid:'study_packet'},
  {text:'Find a Shadowhands contact. They broker this kind of material.', skill:'stealth', tag:'bold', align:'chaotic', cid:'shadowhands_contact'}
]},
// ── SCOUT ──
sc_shelk:{text:'Three seasons on the Fairhaven run. You walked ahead of the Roadwardens and knew what was coming before they did. Eight days ago something changed on the eastern route and nobody who matters has asked what a scout would notice. You are going to find out anyway.',choices:[
    {text:'The market traders know what passes through. Spend a morning with them before anything else.', skill:'persuasion', tag:'safe', align:'neutral', cid:'fairhaven_market_read'},
  {text:'Find a position to observe the operation before anyone knows you are looking.', skill:'stealth', tag:'bold', align:'neutral', cid:'stealth_surveillance'},
  {text:'The eastern gate. Your certification gets you through. Go look.', skill:'survival', tag:'bold', align:'neutral', cid:'east_road'},
  {text:'The Roadwardens route board. Read what they are officially saying before reading what is real.', skill:'lore', tag:'safe', align:'lawful', cid:'read_notices'},
  {text:'Find the patrol captain whose circuit covers the eastern route.', skill:'persuasion', tag:'safe', align:'neutral', cid:'find_roadwarden'}
]},
sc_soreheim:{text:'Giant Council forward elements go first. That is the job. You were first into a location eight days ago that nobody is officially calling an incident. You know what you found there. The question is who else knows and whether they are friends or the other thing.',choices:[
    {text:'The allocation board tracks every input. Read it before speaking to anyone.', skill:'lore', tag:'safe', align:'neutral', cid:'soreheim_allocation_read'},
  {text:'Find a position to observe the operation before anyone knows you are looking.', skill:'stealth', tag:'bold', align:'neutral', cid:'stealth_surveillance'},
  {text:'Find who in Shelkopolis is tracking the eastern situation.', skill:'lore', tag:'risky', align:'neutral', cid:'passive_intel'},
  {text:'Return to the site. Confirm what you found before the evidence changes.', skill:'survival', tag:'bold', align:'neutral', cid:'east_road'},
  {text:'File your report with the Engineers Consortium. Make it official before someone else shapes the story.', skill:'persuasion', tag:'safe', align:'neutral', cid:'union_contact'}
]},
sc_cosmouth:{text:'Cosmoria taught you that the sea has surveillance the land lacks. Every approach and departure follows patterns that a trained eye reads before the ships are close enough to identify. The eastern route disruption has a maritime dimension: Cosmouth cargo manifests are part of the irregular shipment chain.',choices:[
    {text:'Harbor records are specific in the way maritime law requires. Start there.', skill:'lore', tag:'safe', align:'neutral', cid:'cosmoria_harbor_read'},
  {text:'Find a position to observe the operation before anyone knows you are looking.', skill:'stealth', tag:'bold', align:'neutral', cid:'stealth_surveillance'},
  {text:'Find the Cosmouth maritime representative in Shelkopolis.', skill:'persuasion', tag:'safe', align:'neutral', cid:'find_roadwarden'},
  {text:'The trade registry. Cosmouth manifests will show in the supply chain records.', skill:'lore', tag:'safe', align:'lawful', cid:'trade_registry'},
  {text:'Check the freight lanes. Maritime cargo enters through a different channel than road cargo.', skill:'stealth', tag:'risky', align:'neutral', cid:'ironspool_intel'}
]},

// ── THIEF ──
th_shelk:{text:'Everything has a price. Everything has an owner. The gap between those two facts is your livelihood. You are in Shelkopolis because something in the Verdant Row specialty market moved in a way that suggests the eastern route disruption is creating an artificial scarcity. Artificial scarcity is opportunity.',choices:[
  {text:'Find a position to observe the operation before anyone knows you are looking.', skill:'stealth', tag:'bold', align:'neutral', cid:'stealth_surveillance'},
  {text:'The market. Find out what has become scarce and where it is going.', skill:'lore', tag:'safe', align:'neutral', cid:'market_intel'},
  {text:'The empty stalls in the specialty section. What was there before they left?', skill:'stealth', tag:'risky', align:'neutral', cid:'investigate_stalls'},
  {text:'Find who is managing the artificial scarcity. They are the buyer.', skill:'persuasion', tag:'bold', align:'neutral', cid:'probe_order_origin'}
]},
th_cosmouth:{text:'Salt, rope tar, and ledger ink. Cosmoria teaches you all three because they are the same subject. Cargo that does not appear on manifests has a shadow life in the informal economy. You followed a shadow consignment from Cosmouth to Shelkopolis and found it had become part of the eastern operation.',choices:[
    {text:'Harbor records are specific in the way maritime law requires. Start there.', skill:'lore', tag:'safe', align:'neutral', cid:'cosmoria_harbor_read'},
  {text:'Find a position to observe the operation before anyone knows you are looking.', skill:'stealth', tag:'bold', align:'neutral', cid:'stealth_surveillance'},
  {text:'Find the consignment. It will tell you who the buyer is.', skill:'stealth', tag:'risky', align:'neutral', cid:'find_cart_driver'},
  {text:'The Cosmouth maritime representative. They may already be tracking the shadow shipment.', skill:'persuasion', tag:'safe', align:'neutral', cid:'find_roadwarden'},
  {text:'The freight lanes in Ironspool Ward. Shadow cargo enters here.', skill:'stealth', tag:'bold', align:'neutral', cid:'ironspool_intel'}
]},
th_union:{text:'The sealed contract vaults of Guildheart Hub keep the important things safe. You studied how the seals work. Three trade contracts from the eastern route operation passed through Guild Sanction Board review and were approved using credentials that match the format but not the registration numbers. You know what that means.',choices:[
    {text:'The Union freight manifests are the most comprehensive records on the route. Read them.', skill:'lore', tag:'safe', align:'neutral', cid:'guildheart_manifest_read'},
  {text:'Find a position to observe the operation before anyone knows you are looking.', skill:'stealth', tag:'bold', align:'neutral', cid:'stealth_surveillance'},
  {text:'The Guild Sanction Board auditor in Shelkopolis. They will want to know about the false credentials.', skill:'persuasion', tag:'bold', align:'neutral', cid:'union_contact'},
  {text:'Find who issued the false credentials. That is the operational origin.', skill:'lore', tag:'risky', align:'neutral', cid:'probe_order_origin'},
  {text:'Use the false credential knowledge as leverage. Find the buyer first.', skill:'stealth', tag:'risky', align:'neutral', cid:'wait_observe'}
]},

// ── TRICKSTER ──
tr_shelk:{text:'You gave measured compliments on attire while assessing everything else. The fashion circuit of Shelkopolis is the best intelligence network in the Principalities because everyone performs for everyone else and nobody admits the performance is strategic. The eastern operation is being managed by someone who moves in this circuit.',choices:[
  {text:'Find a position to observe the operation before anyone knows you are looking.', skill:'stealth', tag:'bold', align:'neutral', cid:'stealth_surveillance'},
  {text:'Find the performance. Who in the fashion circuit is acting differently since eight days ago?', skill:'persuasion', tag:'risky', align:'neutral', cid:'passive_intel'},
  {text:'The Fashion Artisans Collective event this Midlight. Everyone attends.', skill:'persuasion', tag:'bold', align:'neutral', cid:'market_intel'},
  {text:'The Shadowhands work this circuit too. Find their representative.', skill:'stealth', tag:'risky', align:'chaotic', cid:'shadowhands_contact'}
]},
tr_union:{text:'Guildheart Hub is where everyone believes they are the clever one. You demonstrated otherwise repeatedly. The eastern operation is running a misdirection at scale: the false manifest is designed to look like a Union protocol so that any investigation defaults to the Union rather than Shelk. You know this technique.',choices:[
    {text:'The Union freight manifests are the most comprehensive records on the route. Read them.', skill:'lore', tag:'safe', align:'neutral', cid:'guildheart_manifest_read'},
  {text:'Find a position to observe the operation before anyone knows you are looking.', skill:'stealth', tag:'bold', align:'neutral', cid:'stealth_surveillance'},
  {text:'Tell the Union representative what you know. Watch their reaction carefully.', skill:'persuasion', tag:'bold', align:'neutral', cid:'union_contact'},
  {text:'Find the person who designed the false manifest. Professional appreciation.', skill:'lore', tag:'risky', align:'neutral', cid:'probe_order_origin'},
  {text:'The Shadowhands may be running counter-misdirection. Find out.', skill:'stealth', tag:'safe', align:'chaotic', cid:'shadowhands_contact'}
]},
tr_nomdara:{text:'Three seasons learning what each polity wanted to believe about itself. Shelkopolis believes it has the most reliable oversight in the Principalities. The eastern operation has been running for eighteen months under that belief. You know exactly which false surface it is hiding behind.',choices:[
    {text:'The Union freight manifests are the most comprehensive records on the route. Read them.', skill:'lore', tag:'safe', align:'neutral', cid:'guildheart_manifest_read'},
  {text:'Find a position to observe the operation before anyone knows you are looking.', skill:'stealth', tag:'bold', align:'neutral', cid:'stealth_surveillance'},
  {text:'Find the suppressed broadsheet. It named the pattern.', skill:'stealth', tag:'risky', align:'neutral', cid:'find_broadsheet'},
  {text:'Introduce yourself to all sides and see who offers you what.', skill:'persuasion', tag:'bold', align:'neutral', cid:'passive_intel'},
  {text:'The Roadwardens captain who is managing the silence. You know how to find silenced people.', skill:'stealth', tag:'safe', align:'neutral', cid:'find_note_sender'}
]},

// ── HEALER ──
hl_shelk:{text:'You left Roadwarden medical service because what you were fixing was not the actual problem. The work injuries on the eastern route are inconsistent with the official cause of the closure. You treated three workers from that route in the last four days. Their injuries are from something other than what their paperwork says.',choices:[
  {text:'Listen to the people the operation affected. They saw things nobody thought to ask about.', skill:'persuasion', tag:'safe', align:'neutral', cid:'support_community'},
  {text:'Find the workers again. Ask them directly what happened.', skill:'persuasion', tag:'risky', align:'neutral', cid:'trace_missing_persons'},
  {text:'The Roadwardens medical records. Cross-reference the injury pattern.', skill:'lore', tag:'safe', align:'lawful', cid:'read_notices'},
  {text:'The eastern depot. The physical site will confirm or deny what the workers described.', skill:'survival', tag:'bold', align:'neutral', cid:'east_road'}
]},
hl_soreheim:{text:'You fixed what the quotas broke in the Soreheim allocation halls. The math eventually became impossible to ignore. The eastern route workers who came in with injuries from the closure tell a story about conditions that no official report is acknowledging. You know how to read injury patterns. These injuries were not caused by weather.',choices:[
    {text:'The allocation board tracks every input. Read it before speaking to anyone.', skill:'lore', tag:'safe', align:'neutral', cid:'soreheim_allocation_read'},
  {text:'Listen to the people the operation affected. They saw things nobody thought to ask about.', skill:'persuasion', tag:'safe', align:'neutral', cid:'support_community'},
  {text:'Report your clinical findings to the Roadwardens. They are responsible for route worker safety.', skill:'persuasion', tag:'safe', align:'lawful', cid:'garrison_contact'},
  {text:'Find who authorized the workers to be on the eastern route under those conditions.', skill:'lore', tag:'risky', align:'neutral', cid:'probe_order_origin'},
  {text:'The shrine to Cysur. Workers injured without acknowledgment often end up there.', skill:'persuasion', tag:'safe', align:'lawful', cid:'shrine_contact'}
]},
hl_panim:{text:'Panim records everything about dying. You noticed the recovery side was less documented. Three workers from the eastern route were brought to Panim Haven recovery services in the last week. Their intake records were filed with a notation you have only seen on cases that are expected not to generate follow-up. Someone expected them not to recover.',choices:[
  {text:'The medical intake records will tell you more than the official reports.', skill:'lore', tag:'safe', align:'neutral', cid:'healer_panim_read'},
  {text:'Listen to the people the operation affected. They saw things nobody thought to ask about.', skill:'persuasion', tag:'safe', align:'neutral', cid:'support_community'},
  {text:'Find the three workers. They may still be recovering.', skill:'persuasion', tag:'bold', align:'neutral', cid:'trace_missing_persons'},
  {text:'The intake records contain a notation code. Find what that code means.', skill:'lore', tag:'risky', align:'neutral', cid:'study_packet'},
  {text:'Report the notation to the Panim Haven representative. This is a registry irregularity.', skill:'persuasion', tag:'safe', align:'neutral', cid:'panim_contact'}
]},

// ── ARTIFICER ──

af_tinker:{text:'A tinker in Fairhaven learns more about a place than its lord does. People talk while you work. Three caravan mechanics who came in from the eastern route told you, while you were fixing their equipment, that the depot they serviced eight days ago had modification work done on it that was not standard Roadwarden specification. They did not know who did it.',choices:[
    {text:'The market traders know what passes through. Spend a morning with them before anything else.', skill:'persuasion', tag:'safe', align:'neutral', cid:'fairhaven_market_read'},
  {text:'Listen to the people the operation affected. They saw things nobody thought to ask about.', skill:'persuasion', tag:'safe', align:'neutral', cid:'support_community'},
  {text:'Find who did the non-standard modification work. It is your specific expertise.', skill:'craft', tag:'risky', align:'neutral', cid:'armory_offer'},
  {text:'Examine the modified equipment yourself. Physical evidence.', skill:'craft', tag:'bold', align:'neutral', cid:'document_depot'},
  {text:'The Roadwardens. Non-standard modifications to their depots are a security concern.', skill:'persuasion', tag:'safe', align:'lawful', cid:'garrison_contact'}
]},

// ── ENGINEER ──
eg_soreheim:{text:'You built half of what stands between Soreheim and the Principalities border. No one thanks the crew. One of the bridges you built is in the structural deviation report the Roadwardens filed eight days ago. You know this bridge. The deviation is not structural failure. It is deliberate modification.',choices:[
    {text:'The allocation board tracks every input. Read it before speaking to anyone.', skill:'lore', tag:'safe', align:'neutral', cid:'soreheim_allocation_read'},
  {text:'Listen to the people the operation affected. They saw things nobody thought to ask about.', skill:'persuasion', tag:'safe', align:'neutral', cid:'support_community'},
  {text:'Go inspect the bridge yourself. You will know immediately what was done.', skill:'craft', tag:'bold', align:'neutral', cid:'bridge_survey'},
  {text:'The Roadwardens engineering office. Get the full report before going to the site.', skill:'craft', tag:'safe', align:'neutral', cid:'bridge_survey'},
  {text:'Find who ordered the modification. Deliberate bridge modification is sabotage.', skill:'lore', tag:'risky', align:'neutral', cid:'probe_order_origin'}
]},
eg_shelk:{text:'The roads that keep the Principalities together need constant repair. You know every weakness in the Shelk network because you fixed most of them. The eastern route closure is using a maintenance notification as cover. You know that notification was fabricated because the section it cites was repaired six months ago by your crew.',choices:[
  {text:'Listen to the people the operation affected. They saw things nobody thought to ask about.', skill:'persuasion', tag:'safe', align:'neutral', cid:'support_community'},
  {text:'Report the fabricated notification to the Roadwardens.', skill:'persuasion', tag:'safe', align:'lawful', cid:'garrison_contact'},
  {text:'Find who filed the fabricated notification.', skill:'lore', tag:'risky', align:'neutral', cid:'trace_directive'},
  {text:'Go to the section the notification cites. Confirm it is in good repair.', skill:'craft', tag:'bold', align:'neutral', cid:'east_road'}
]},
eg_roaz:{text:'You built the walls of Ithtananalor. You know exactly how to get through them. You are in Shelkopolis because the Iron Accord Construction Seal on your papers triggered a response from a House Shelk infrastructure administrator who should not have known you were in the city. That administrator is Selwyn Coth.',choices:[
  {text:'Listen to the people the operation affected. They saw things nobody thought to ask about.', skill:'persuasion', tag:'safe', align:'neutral', cid:'support_community'},
  {text:'Find Selwyn Coth and establish why he flagged your arrival.', skill:'lore', tag:'risky', align:'neutral', cid:'find_cart_driver'},
  {text:'The Roadwardens. Iron Accord engineers do not get flagged without a reason that involves route security.', skill:'persuasion', tag:'safe', align:'lawful', cid:'garrison_contact'},
  {text:'The House Shelk receiving office. A flagging that goes to an administrator bypassing normal channels is irregular.', skill:'persuasion', tag:'bold', align:'lawful', cid:'house_shelk_meeting'}
]},

// ── TACTICIAN ──
tc_shelk:{text:'You wrote assessments that commanders did not read carefully enough. The eastern operation is what happens when tactical analysis is ignored. You can see the full shape of it from the assessments you wrote and the responses that did not come. You are in Shelkopolis to correct the record before the operation completes.',choices:[
  {text:'Listen to the people the operation affected. They saw things nobody thought to ask about.', skill:'persuasion', tag:'safe', align:'neutral', cid:'support_community'},
  {text:'The House Shelk operations officer you wrote those assessments for.', skill:'persuasion', tag:'bold', align:'lawful', cid:'house_shelk_meeting'},
  {text:'The Roadwardens captain. The tactical failure is partly theirs.', skill:'persuasion', tag:'safe', align:'neutral', cid:'find_roadwarden'},
  {text:'Map the full operation before intervening. Tactical clarity first.', skill:'lore', tag:'safe', align:'neutral', cid:'probe_order_origin'}
]},
tc_soreheim:{text:'Giant Council planning makes individual lives invisible. You noticed the invisible parts. The eastern route operation is moving supply chain resources in a pattern that matches a Soreheim allocation disruption from eighteen months ago. The same pattern produced a famine in the Zootian Expanse that the official record does not acknowledge.',choices:[
    {text:'The allocation board tracks every input. Read it before speaking to anyone.', skill:'lore', tag:'safe', align:'neutral', cid:'soreheim_allocation_read'},
  {text:'Map the operation as a commander maps it. Phases, not details. Find the current seam.', skill:'lore', tag:'safe', align:'neutral', cid:'tactician_soreheim_read'},
  {text:'Listen to the people the operation affected. They saw things nobody thought to ask about.', skill:'persuasion', tag:'safe', align:'neutral', cid:'support_community'},
  {text:'Find the Zootian factor in Shelkopolis. They know about the famine even if the record does not.', skill:'persuasion', tag:'safe', align:'neutral', cid:'zootia_contact'},
  {text:'The trade registry. The current supply pattern will match the historical disruption.', skill:'lore', tag:'risky', align:'lawful', cid:'trade_registry'},
  {text:'Find who is repeating the pattern and whether they know what it produced last time.', skill:'lore', tag:'bold', align:'neutral', cid:'probe_order_origin'}
]},
tc_union:{text:'Commerce and war have the same decision structure. Three seasons of Guild Sanction Board analysis taught you to read a conflict from its logistics. The eastern operation is a supply chain weapon: not theft, not sabotage, but the deliberate creation of dependencies that leave one party unable to operate without the other. You know who benefits.',choices:[
    {text:'The Union freight manifests are the most comprehensive records on the route. Read them.', skill:'lore', tag:'safe', align:'neutral', cid:'guildheart_manifest_read'},
  {text:'Listen to the people the operation affected. They saw things nobody thought to ask about.', skill:'persuasion', tag:'safe', align:'neutral', cid:'support_community'},
  {text:'Bring your analysis to the Union representative. They are the party being made dependent.', skill:'persuasion', tag:'bold', align:'neutral', cid:'union_contact'},
  {text:'Find who benefits and confirm they are running the operation.', skill:'lore', tag:'risky', align:'neutral', cid:'probe_order_origin'},
  {text:'The Roadwardens are being used as the mechanism. They do not know it yet.', skill:'persuasion', tag:'safe', align:'neutral', cid:'find_roadwarden'}
]},

// ── ALCHEMIST ──
al_mimolot:{text:'The Mimolot tariff system does not cover every formula. You worked in the gaps. The eastern operation is using a compound in the modified cargo that you recognize from your research. It is not on any public formula registry. Someone has access to the same restricted research space you do.',choices:[
    {text:'The Mimolot archive holds unpublished submissions. That is where the suppressed analysis lives.', skill:'lore', tag:'safe', align:'neutral', cid:'mimolot_archive_read'},
  {text:'Listen to the people the operation affected. They saw things nobody thought to ask about.', skill:'persuasion', tag:'safe', align:'neutral', cid:'support_community'},
  {text:'Find who has access to the restricted Mimolot formula registry.', skill:'lore', tag:'risky', align:'neutral', cid:'probe_order_origin'},
  {text:'The Gilded Archives. Academic texts may identify the compound application.', skill:'lore', tag:'safe', align:'neutral', cid:'gilded_archives'},
  {text:'Examine the eastern depot cargo yourself. Confirm the compound before assuming.', skill:'craft', tag:'bold', align:'neutral', cid:'east_road'}
]},

// ── SAINT ──
sn_cysur:{text:'The Aurora Light Cathedral blessed you and sent you out. The city is testing that blessing. Families are filing private memorials for people who went east and did not come back. The official response is silence. Cysur does not accept silence as an answer to suffering. Neither do you.',choices:[
  {text:'Walk the memorial circuit. Count what Cysur witnesses. The count is evidence.', skill:'persuasion', tag:'safe', align:'neutral', cid:'saint_cysur_read'},
  {text:'Listen to the people the operation affected. They saw things nobody thought to ask about.', skill:'persuasion', tag:'safe', align:'neutral', cid:'support_community'},
  {text:'Speak with the families. Their grief is real and it is evidence.', skill:'persuasion', tag:'safe', align:'neutral', cid:'trace_missing_persons'},
  {text:'Help Sera at the shrine. Trust is built before information.', skill:'craft', tag:'safe', align:'neutral', cid:'shrine_service'},
  {text:'Find the official responsible for the silence and stand in front of them.', skill:'persuasion', tag:'bold', align:'lawful', cid:'house_shelk_meeting'}
]},
sn_remeny:{text:'You make hope seem rational. In Guildheart Hub that is the hardest work there is. The eastern disruption is producing commercial desperation in the Hub merchants who depend on Shelk supply routes. Desperation this scale produces decisions that make things worse. You came to Shelkopolis to find the source before the desperation compounds.',choices:[
    {text:'The Union freight manifests are the most comprehensive records on the route. Read them.', skill:'lore', tag:'safe', align:'neutral', cid:'guildheart_manifest_read'},
  {text:'Listen to the people the operation affected. They saw things nobody thought to ask about.', skill:'persuasion', tag:'safe', align:'neutral', cid:'support_community'},
  {text:'The Union representative. The merchants report to them and they are already managing the damage.', skill:'persuasion', tag:'safe', align:'neutral', cid:'union_contact'},
  {text:'The trade registry. Find the scale of the disruption before approaching anyone about solutions.', skill:'lore', tag:'safe', align:'lawful', cid:'trade_registry'},
  {text:'Find the operational cause and present the solution, not just the problem.', skill:'persuasion', tag:'bold', align:'neutral', cid:'probe_order_origin'}
]},

p_gwybodaeth:{text:'The Mimolot Academy library smells of paper dust, lamp oil, and old disagreement. Gwybodaeth demands that everything be chronicled — especially the things people prefer buried. You are here because a set of records has been sealed that should not be sealed. The archivist who filed the seal is no longer employed here. You want to know why.',choices:[
    {text:'The Mimolot archive holds unpublished submissions. That is where the suppressed analysis lives.', skill:'lore', tag:'safe', align:'neutral', cid:'mimolot_archive_read'},
  {text:'Apply your combat background directly to gain access.', skill:'combat', tag:'bold', align:'neutral', cid:'combat_approach'},
  {text:'Speak with whoever runs the restricted access desk. Find out what protocol was used to seal the records.', skill:'lore', tag:'safe', align:'lawful', cid:'gilded_archives'},
  {text:'The archive courier who processes restricted filings will know more than the official records show.', skill:'persuasion', tag:'risky', align:'neutral', cid:'find_cart_driver'},
  {text:'Gwybodaeth requires that you see the sealed records. The means matter less than the chronicle.', skill:'stealth', tag:'bold', align:'chaotic', cid:'depot_logs'}
]},
b_cosmouth:{text:'Cosmoria smells of salt water, rope tar, and the particular kind of restlessness that builds when freight has been delayed for three days running. You came off a rough run from the southern sea lanes with a knot in your shoulder that has not unclenched since the storm. The dockmaster says there is work if you want it. You want to know what kind before you agree to anything.',choices:[
    {text:'Harbor records are specific in the way maritime law requires. Start there.', skill:'lore', tag:'safe', align:'neutral', cid:'cosmoria_harbor_read'},
  {text:'Apply your combat background directly to gain access.', skill:'combat', tag:'bold', align:'neutral', cid:'combat_approach'},
  {text:'Find the dockmaster and hear the contract before deciding.', skill:'persuasion', tag:'safe', align:'lawful', cid:'find_work'},
  {text:'Walk the harbor and read which ships are carrying what. Work and intelligence are often the same thing.', skill:'lore', tag:'safe', align:'neutral', cid:'market_intel'},
  {text:'There is a man watching three different ships from the same vantage point. That is worth knowing about.', skill:'stealth', tag:'risky', align:'neutral', cid:'passive_intel'}
]},
el_mimolot:{text:'The Book Tariff Office has sent a notice to your research station. The wording is administrative but the meaning is clear: your axis inversion modeling crosses into restricted categories. You have three days to comply, surrender materials, or appeal. The appeal process requires documentation you are holding in your hands. The decision is whether to use it or protect it.',choices:[
    {text:'The Mimolot archive holds unpublished submissions. That is where the suppressed analysis lives.', skill:'lore', tag:'safe', align:'neutral', cid:'mimolot_archive_read'},
  {text:'Apply specialist knowledge to read what others cannot.', skill:'lore', tag:'risky', align:'neutral', cid:'magic_read'},
  {text:'File the appeal through proper channels. Gwybodaeth values the record. So does the tariff office.', skill:'lore', tag:'safe', align:'lawful', cid:'tariff_contact'},
  {text:'The restricted category was applied by someone. Find who, and why they care about axis mechanics.', skill:'lore', tag:'risky', align:'neutral', cid:'probe_order_origin'},
  {text:'Transfer the materials somewhere the tariff office cannot easily access. Then appeal.', skill:'stealth', tag:'bold', align:'chaotic', cid:'depot_logs'}
]},
st_shirsh:{text:'Shirshal works in lowered voices and careful language. The Magi Magistratus closed three cases you opened for them. The sealed records cite procedural grounds. You copied the parts they sealed before the sealing completed. Those copies are now valuable to several parties, including at least one who does not know the Magistratus has been watching them since before you arrived.',choices:[
    {text:'The Shirsh evidence vault holds everything collected and never prosecuted. Look there.', skill:'lore', tag:'safe', align:'neutral', cid:'shirshal_evidence_read'},
  {text:'Find a position to observe the operation before anyone knows you are looking.', skill:'stealth', tag:'bold', align:'neutral', cid:'stealth_surveillance'},
  {text:'Find the investigator assigned to the case you know most about. They may not know what you know.', skill:'lore', tag:'safe', align:'neutral', cid:'find_note_sender'},
  {text:'The party being watched does not know. That is leverage. Decide how to use it first.', skill:'stealth', tag:'risky', align:'chaotic', cid:'shadowhands_contact'},
  {text:'The Magistratus sealed things they should not have. File a counter-inquiry through House Shirsh proper channels.', skill:'persuasion', tag:'bold', align:'lawful', cid:'garrison_contact'}
]},
af_roaz:{text:'Ithtananalor walls are built to keep things in as much as out. You maintained them for four years. The people who walk past the mechanisms you built do not see what holds the place together. Neither do they see what the mechanism has been quietly logging since the last upgrade. You left before anyone connected the logging to the maintenance reports. You are not sure they have yet.',choices:[
  {text:'Listen to the people the operation affected. They saw things nobody thought to ask about.', skill:'persuasion', tag:'safe', align:'neutral', cid:'support_community'},
  {text:'Find the Iron Accord technical office and establish an unrelated reason for being here first.', skill:'craft', tag:'safe', align:'lawful', cid:'armory_offer'},
  {text:'The logging data is in the maintenance archive. If it has been pulled, you need to know.', skill:'stealth', tag:'risky', align:'neutral', cid:'depot_logs'},
  {text:'Speak with the current maintenance crew. They may not know what the mechanism has been tracking.', skill:'persuasion', tag:'safe', align:'neutral', cid:'ironspool_intel'}
]},
al_union:{text:'Guildheart Hub smells of chalk dust, ink, and rope. The Guild Sanction Board has sent an inquiry about three compound batches that left through Union freight over the last year. The batches are real. The paperwork is also real, mostly. The question the inquiry contains is not about the paperwork. It is about what the compounds were used for after delivery. You need to know who is asking before you decide how much to tell them.',choices:[
    {text:'The Union freight manifests are the most comprehensive records on the route. Read them.', skill:'lore', tag:'safe', align:'neutral', cid:'guildheart_manifest_read'},
  {text:'Listen to the people the operation affected. They saw things nobody thought to ask about.', skill:'persuasion', tag:'safe', align:'neutral', cid:'support_community'},
  {text:'Find the Sanction Board auditor running the inquiry and take their measure in person.', skill:'persuasion', tag:'safe', align:'lawful', cid:'union_contact'},
  {text:'The compounds passed through three freight handlers. One of them will talk if the right question is asked.', skill:'lore', tag:'risky', align:'neutral', cid:'find_cart_driver'},
  {text:'Pull your records first. Know exactly what the Board can see before walking into any meeting.', skill:'craft', tag:'safe', align:'neutral', cid:'study_packet'}
]},
sn_eloljaro:{text:'The quarry air of Ithtananalor is thick with coal dust and managed resentment. You have been sent here by Eloljaro for the fourth time. Three previous corrections. Three things that were put right, incompletely, and then quietly worsened again while you were elsewhere. This time you arrived without announcement and spent the first two days watching before speaking. What you have seen is more organized than the previous three problems were.',choices:[
  {text:'Listen to the people the operation affected. They saw things nobody thought to ask about.', skill:'persuasion', tag:'safe', align:'neutral', cid:'support_community'},
  {text:'Present your mandate to the Office of Roazian Enforcement. Make the correction official.', skill:'persuasion', tag:'bold', align:'lawful', cid:'garrison_contact'},
  {text:'Find who profited from the previous corrections failing. That is the actual problem.', skill:'lore', tag:'risky', align:'neutral', cid:'probe_order_origin'},
  {text:'The workers living inside this problem deserve to know someone is here who answers to Eloljaro.', skill:'persuasion', tag:'safe', align:'good', cid:'trace_missing_persons'}
]}
,

b_soreheim:{text:'The Soreheim allocation halls run on the principle that contribution determines station. You left when the quota stopped being survivable. Shelkopolis feels soft by comparison — quieter danger, slower pressure. You have been here four days and the Roadwardens are already watching the eastern gate. That is not normal.',choices:[
    {text:'The allocation board tracks every input. Read it before speaking to anyone.', skill:'lore', tag:'safe', align:'neutral', cid:'soreheim_allocation_read'},
  {text:'Apply your combat background directly to gain access.', skill:'combat', tag:'bold', align:'neutral', cid:'combat_approach'},
  {text:'Find work at the Roadwardens assignment board. Route security is familiar ground.', skill:'combat', tag:'safe', align:'neutral', cid:'garrison_contact'},
  {text:'The eastern gate itself. Roadwarden behavior there is the data point worth reading.', skill:'survival', tag:'risky', align:'neutral', cid:'east_road'},
  {text:'Ironspool Ward. Labor district. Familiar terrain for someone from extraction country.', skill:'lore', tag:'safe', align:'neutral', cid:'ironspool_intel'}
]},

el_sheresh:{text:'Inside the dome, the environment is managed. Outside it is not. You brought dome climate data to Shelkopolis because the eastern corridor anomaly matches a pre-inversion signature the Sheresh sensors have recorded before. Three days before the axis turns, the signature intensifies. You have less time than most people here know.',choices:[
  {text:'The dome sensors have been recording the axis anomaly. That data is the key.', skill:'lore', tag:'risky', align:'neutral', cid:'elementalist_aurora_read'},
  {text:'Apply specialist knowledge to read what others cannot.', skill:'lore', tag:'risky', align:'neutral', cid:'magic_read'},
  {text:'Find scholars already tracking the eastern anomaly. You are not the only one watching the axis.', skill:'lore', tag:'risky', align:'neutral', cid:'probe_order_origin'},
  {text:'The Roadwardens control the corridor. Their data combined with yours tells the full picture.', skill:'persuasion', tag:'safe', align:'neutral', cid:'map_office'},
  {text:'Three days is not much time. Go east directly and confirm the signature yourself.', skill:'survival', tag:'bold', align:'neutral', cid:'east_road'}
]},

af_guild:{text:'Guild work means working within a system. The Soreheim Artificers Guild awarded your certification and placed you here to assess the Roadwarden armory supply chain. That was the stated brief. The actual brief, you suspect, is to determine why certified Guild equipment is appearing in the eastern operation under unauthorized manifest signatures.',choices:[
    {text:'The allocation board tracks every input. Read it before speaking to anyone.', skill:'lore', tag:'safe', align:'neutral', cid:'soreheim_allocation_read'},
  {text:'Examine the physical evidence with specialist knowledge.', skill:'craft', tag:'risky', align:'neutral', cid:'support_analysis'},
  {text:'The armory first. Assess the supply chain as instructed and read what it tells you.', skill:'craft', tag:'safe', align:'lawful', cid:'armory_offer'},
  {text:'Find the unauthorized manifests directly. That is the actual problem.', skill:'lore', tag:'risky', align:'neutral', cid:'probe_order_origin'},
  {text:'Report to the Guild Sanction Board contact in Shelkopolis before doing anything else.', skill:'persuasion', tag:'safe', align:'lawful', cid:'union_contact'}
]},

al_sheresh:{text:'Inside the dome the chemistry is managed. The thing you found outside does not respond to standard formulas. You are in Shelkopolis because a supply disruption on the eastern route is distributing a substance your Sheresh data identifies as dangerous under specific conditions. Those conditions are approaching.',choices:[
  {text:'Examine the physical evidence with specialist knowledge.', skill:'craft', tag:'risky', align:'neutral', cid:'support_analysis'},
  {text:'Find the Containment Research Concord contact in Shelkopolis immediately.', skill:'lore', tag:'bold', align:'lawful', cid:'probe_order_origin'},
  {text:'The Magi Magistratus may be auditing related material. Find what they are auditing.', skill:'lore', tag:'risky', align:'neutral', cid:'investigate_rooms'},
  {text:'Confirm the substance first. Examine the eastern cargo before alarming anyone.', skill:'craft', tag:'safe', align:'neutral', cid:'east_road'}
]}

,

  // ── BARD SCENES ────────────────────────────────────────
  ba_shelk:{text:"Your last chronicle was suppressed by House Shelk before it circulated. The suppression itself is the story. Three weeks ago you were told the manuscript had formatting issues. Two weeks ago it was a rights dispute. Last week someone from the House Shelk administrative office told you directly that certain subjects were no longer appropriate for public performance. You kept copies. You came back to Shelkopolis to find the source of the story you were paid to stop telling.",choices:[
    {text:'The performer circuit knows things the official record never captured. Find them.', skill:'persuasion', tag:'risky', align:'neutral', cid:'bard_network_read'},
    {text:'Listen to the people the eastern route affected.', skill:'persuasion', tag:'safe', align:'neutral', cid:'support_community'},
    {text:"Walk the memorial circuit. Thirty-one memorials in one month. That's the opening line of the story.", skill:'persuasion', tag:'safe', align:'good', cid:'saint_cysur_read'},
    {text:"Find the Fashion Artisans Collective contact who first alerted you to the eastern route anomaly.", skill:'persuasion', tag:'risky', align:'neutral', cid:'find_note_sender'},
    {text:"The Rusted Loom Tavern. Vera Wren keeps records of everything that moves through Shelkopolis.", skill:'lore', tag:'safe', align:'neutral', cid:'inn_arrival'},
    {text:"Listen to the city before doing anything else. The city's mood tells you where the story is.", skill:'lore', tag:'safe', align:'neutral', cid:'passive_intel'}
  ]},
  ba_union:{text:"A performer contact went silent six days ago. Their last message said they had found a pattern in the trade fair freight records that didn't match any manifest they could verify. They used the word 'deliberate.' Then nothing. You came to Guildheart Hub because that's where they were working and because performers don't just go silent — they redirect when they're being watched, and silence means they couldn't redirect.",choices:[
    {text:'Find a performer who worked the area when the route went quiet.', skill:'persuasion', tag:'risky', align:'neutral', cid:'bard_network_read'},
    {text:'The Union freight manifests are the most comprehensive records on the route. Read them.', skill:'lore', tag:'safe', align:'neutral', cid:'guildheart_manifest_read'},
    {text:'Listen to what the settlement knows.', skill:'persuasion', tag:'safe', align:'neutral', cid:'support_community'},
    {text:"Find their last performance venue. The venue keeps records of bookings.", skill:'lore', tag:'safe', align:'neutral', cid:'passive_intel'},
    {text:"Check the Neutral Counting House. If money moved, it left a trace.", skill:'lore', tag:'risky', align:'neutral', cid:'trade_registry'},
    {text:"Talk to the Union representative. They monitor everyone operating on Guildheart floor.", skill:'persuasion', tag:'risky', align:'neutral', cid:'union_contact'},
    {text:"The performer circuit first. Someone else saw your contact last and will talk to another performer.", skill:'persuasion', tag:'safe', align:'neutral', cid:'probe_order_origin'}
  ]},
  ba_panim:{text:"You've sung thirty-one memorials in a month when the normal count is eight. The families don't file memorials for accidents or natural deaths the same way — they file them when they don't understand what happened. When they feel the need to make the death official in a way that can be witnessed. Thirty-one families needing witnesses in thirty days. You came to Panim Haven because you're a singer and this is what singers are for.",choices:[
    {text:'Thirty-one memorials. Write down what the families are telling you. All of it.', skill:'persuasion', tag:'safe', align:'neutral', cid:'bard_memorial_read'},
    {text:'The community has witnessed what the registry suppressed.', skill:'persuasion', tag:'safe', align:'neutral', cid:'support_community'},
    {text:"The medical intake records will tell you more than the memorial filings. Find the physician who's seen these cases.", skill:'lore', tag:'safe', align:'neutral', cid:'healer_panim_read'},
    {text:"Speak to the families. You already have their trust — you sang their memorials.", skill:'persuasion', tag:'safe', align:'good', cid:'saint_cysur_witness'},
    {text:"Death records are the most honest documents a settlement produces. Read them first.", skill:'lore', tag:'safe', align:'neutral', cid:'necromancer_panim_read'},
    {text:"Find the memorial filing pattern. Same district? Same week? Same filing official?", skill:'lore', tag:'risky', align:'neutral', cid:'healer_panim_registry'}
  ]},

  // ── ORACLE SCENES ───────────────────────────────────────
  or_mimolot:{text:"Your analysis of the eastern route logistics was suppressed by the Academy six weeks ago. The suppression itself confirmed the pattern you had identified — institutional response to an accurate prediction is a data point, not an obstacle. You came to Shelkopolis because your model says this is where the confirmation you need is located, and because your model has been right about location thirty-seven times.",choices:[
    {text:'Map every data point against the timeline. The origin event will be visible.', skill:'lore', tag:'safe', align:'neutral', cid:'oracle_pattern_map'},
    {text:'The Mimolot archive holds unpublished submissions. That is where the suppressed analysis lives.', skill:'lore', tag:'safe', align:'neutral', cid:'mimolot_archive_read'},
    {text:"Apply specialist knowledge to read what others cannot. The manifests contain the pattern if you know where to look.", skill:'lore', tag:'risky', align:'neutral', cid:'magic_read'},
    {text:"The axis anomaly is following a historical precedent. The dome sensors have been recording it. That data is the key.", skill:'lore', tag:'risky', align:'neutral', cid:'elementalist_aurora_read'},
    {text:"Run the case with evidence first. Pull the registers and cross-reference.", skill:'lore', tag:'safe', align:'lawful', cid:'inquisitor_shirsh_read'},
    {text:"Find who suppressed the analysis. The suppression decision was made here.", skill:'persuasion', tag:'safe', align:'neutral', cid:'probe_order_origin'}
  ]},
  or_sheresh:{text:"You know what the axis anomaly will produce if nothing is done. You have seen this pattern in the historical record four times. Three of those four times the outcome was classified under disaster response as 'unforeseeable.' You are here to make it foreseeable. You came to Shelkopolis because the people who need to know are there and because the people who need to act are there, and you have approximately one inversion window to persuade them before it becomes too late to be foreseen.",choices:[
    {text:'Your model says a phase four begins soon. Find exactly when.', skill:'lore', tag:'risky', align:'neutral', cid:'oracle_predict_next'},
    {text:"The dome sensors have been recording the anomaly. Find someone who can read them with you.", skill:'lore', tag:'risky', align:'neutral', cid:'elementalist_aurora_read'},
    {text:"Find the axis pattern in the administrative record before anyone resets the flags.", skill:'lore', tag:'bold', align:'neutral', cid:'magic_divination'},
    {text:"The Roadwardens control the corridor. Their data combined with yours tells the full picture.", skill:'persuasion', tag:'safe', align:'neutral', cid:'garrison_contact'},
    {text:"Three days is not much time. Go east directly and confirm the signature yourself.", skill:'survival', tag:'bold', align:'neutral', cid:'east_road'}
  ]},
  or_ithtananalor:{text:"The suppression pattern in the eastern route data matches three previous incidents, all eventually attributed to coordinated institutional action. You came to Shelkopolis because your model says this is phase three of a four-phase institutional suppression cycle, and phase three is when the operators believe they've succeeded. They are easier to find when they believe they've succeeded.",choices:[
    {text:'Map the suppression pattern against the historical precedents. Find the origin.', skill:'lore', tag:'safe', align:'neutral', cid:'oracle_pattern_map'},
    {text:'Apply specialist knowledge to read what the official record conceals.', skill:'lore', tag:'risky', align:'neutral', cid:'magic_read'},
    {text:"Identify the unregistered credential in the access log. That's the operational artifact you need.", skill:'lore', tag:'safe', align:'lawful', cid:'inquisitor_shirsh_log'},
    {text:"Map the operation as a commander maps it. Phase three is the current seam.", skill:'lore', tag:'safe', align:'neutral', cid:'tactician_soreheim_read'},
    {text:"The center of gravity for the current phase is a specific person. Find them before the cycle completes.", skill:'lore', tag:'bold', align:'neutral', cid:'tactician_soreheim_cog'},
    {text:"Report your model to the Roadwardens. Even if they don't fully believe it, filing the prediction creates a record.", skill:'persuasion', tag:'safe', align:'lawful', cid:'report_findings'}
  ]},

  // ── WARDEN SCENES ──────────────────────────────────────
  wa2_aurora:{text:"The axis anomaly is threatening dome stabilization. You know this not from the technical readings — you know it because the dome sounds different. Seventeen times you have placed yourself between the dome and what threatened it. You don't wait for the technical briefing to tell you when it's time. You know. You came because the threat is real and the source is the eastern corridor and that's where you're going to go.",choices:[
    {text:'Read the threat first. What is the operation actually protecting?', skill:'combat', tag:'safe', align:'neutral', cid:'warden_threat_read'},
    {text:'Place yourself at the point of threat before anything else.', skill:'combat', tag:'bold', align:'neutral', cid:'combat_approach'},
    {text:"Dome operations first. The technical data confirms what you already know — you need the specifics.", skill:'survival', tag:'safe', align:'lawful', cid:'elementalist_aurora_read'},
    {text:"Find Warden Whiteglass. She needs to know and she needs to authorize your next step.", skill:'persuasion', tag:'safe', align:'lawful', cid:'garrison_contact'},
    {text:"The anomaly is following a predictable curve. Find who's been resetting the sensor flags.", skill:'lore', tag:'risky', align:'neutral', cid:'elementalist_aurora_suspect'},
    {text:"Go east. The threat is physical and so is the solution.", skill:'survival', tag:'bold', align:'neutral', cid:'east_road'}
  ]},
  wa2_shelk:{text:"You left the estate when you understood what was being moved through the eastern route with House Shelk authorization. Not because you didn't want to protect the House — because you do. But a Warden protects what the house is meant to stand for, not just the building, and what was being moved through the eastern route is not what House Shelk is meant to stand for. You know the full security layout of every Shelk facility in the city. You know which door to use.",choices:[
    {text:'Read who is most at risk before positioning yourself.', skill:'combat', tag:'safe', align:'neutral', cid:'warden_threat_read'},
    {text:'Read what the garrison and estate security are doing.', skill:'combat', tag:'safe', align:'neutral', cid:'combat_approach'},
    {text:"Read the garrison before speaking to anyone. Staffing patterns tell the real story.", skill:'combat', tag:'safe', align:'neutral', cid:'warrior_garrison_read'},
    {text:"Your internal knowledge is the advantage. Use it to access what you need before House Shelk realizes you're looking.", skill:'stealth', tag:'bold', align:'chaotic', cid:'depot_logs'},
    {text:"Contact someone in the Roadwardens who's clean. You know who that is.", skill:'persuasion', tag:'safe', align:'lawful', cid:'find_roadwarden'},
    {text:"Find the person inside the estate who authorized the eastern route use. Start there.", skill:'lore', tag:'risky', align:'neutral', cid:'trace_directive'}
  ]},
  wa2_soreheim:{text:"A Giant Council administrative decision was manipulated through the eastern route. You were there for the Council session when the decision was announced. Something about the language was wrong — too specific in the right places, too vague in the places where Councillors usually demand detail. You didn't say anything at the time. You are saying it now, in the form of being in Shelkopolis with a very specific purpose.",choices:[
    {text:'Choose your position. Place yourself between what is at risk and what is coming.', skill:'combat', tag:'bold', align:'neutral', cid:'warden_position'},
    {text:'The allocation board tracks every input. Read it before speaking to anyone.', skill:'lore', tag:'safe', align:'neutral', cid:'soreheim_allocation_read'},
    {text:'Apply your protective background to read the situation.', skill:'combat', tag:'safe', align:'neutral', cid:'combat_approach'},
    {text:"Map the operation before doing anything else. Three phases, find the current seam.", skill:'lore', tag:'safe', align:'neutral', cid:'tactician_soreheim_read'},
    {text:"Find the administrative decision documentation. The specific language is evidence.", skill:'lore', tag:'safe', align:'lawful', cid:'study_packet'},
    {text:"The manipulation used the eastern route infrastructure. Find who controls that infrastructure.", skill:'craft', tag:'risky', align:'neutral', cid:'probe_order_origin'},
    {text:"Apply your protective positioning where it's needed — the witnesses to the manipulation.", skill:'persuasion', tag:'bold', align:'good', cid:'trace_missing_persons'}
  ]},

  // ── WARLORD SCENES ─────────────────────────────────────
  wl_frontier:{text:"Three of your Company personnel went east on the disrupted route and did not return. You have spoken to their families. You have filed the missing persons reports. You have waited the period that procedure requires. The procedure has produced nothing. You came because you are a commander and three of your people are missing and commanders go looking for their people when procedure fails to do it for them.",choices:[
    {text:'Map the operation as a commander maps it before doing anything else.', skill:'lore', tag:'safe', align:'neutral', cid:'warlord_operation_map'},
    {text:"Apply your combat background directly to gain access to what you need.", skill:'combat', tag:'bold', align:'neutral', cid:'combat_approach'},
    {text:"Read the terrain from elevation before engaging. Sunspire Haven has the high ground.", skill:'survival', tag:'bold', align:'neutral', cid:'archer_frontier_read'},
    {text:"Find Elyra Mossbane at the Frontier Company office. She's been tracking movement in this area.", skill:'persuasion', tag:'safe', align:'neutral', cid:'archer_frontier_ally'},
    {text:"The Frontier Company records first. Your people were registered. There's a trail.", skill:'lore', tag:'safe', align:'lawful', cid:'garrison_contact'}
  ]},
  wl_roaz:{text:"The eastern corridor fortification project was suspended without explanation three months ago. You submitted three formal requests for explanation through Iron Accord channels. The first two received form responses citing 'operational review.' The third was not acknowledged. You came to Shelkopolis because operational reviews don't suppress three inquiries from a field commander — something else does, and you are going to find out what.",choices:[
    {text:'Find the other investigators. Coordinate them before any individual action.', skill:'persuasion', tag:'bold', align:'neutral', cid:'warlord_coordinate'},
    {text:'Apply your field command background to open access.', skill:'combat', tag:'bold', align:'neutral', cid:'combat_approach'},
    {text:"Map the operation as a commander. Phases, not details. Find the current seam.", skill:'lore', tag:'safe', align:'neutral', cid:'tactician_soreheim_read'},
    {text:"Access the route data directly. You have Iron Accord credentials.", skill:'combat', tag:'bold', align:'lawful', cid:'warrior_garrison_read'},
    {text:"Find the administrative decision that suspended the project. The language will tell you who wrote it.", skill:'lore', tag:'risky', align:'neutral', cid:'trace_directive'},
    {text:"Report your inquiry suppression to a Roadwarden officer. That's the official channel that isn't compromised.", skill:'persuasion', tag:'safe', align:'lawful', cid:'garrison_contact'}
  ]},
  wl_soreheim:{text:"The eastern route disruption is costing Soreheim lives. You have the numbers: three extraction teams operating below capacity, two supply lines at reduced throughput, one allocation queue that has been running deficit for six weeks. The numbers trace back to the route irregularities. The route irregularities trace back to a Shelkopolis authorization. You came because commanders follow the chain of consequence to its source.",choices:[
    {text:'Map it as a three-dimensional problem: adversary, terrain, timeline.', skill:'lore', tag:'safe', align:'neutral', cid:'warlord_operation_map'},
    {text:'The allocation board tracks every input. Read it before speaking to anyone.', skill:'lore', tag:'safe', align:'neutral', cid:'soreheim_allocation_read'},
    {text:'Apply your command analysis to the current operational state.', skill:'combat', tag:'safe', align:'neutral', cid:'combat_approach'},
    {text:"Map the operation before doing anything else.", skill:'lore', tag:'safe', align:'neutral', cid:'tactician_soreheim_read'},
    {text:"The documentation gap between cargo movement and cleanup is the current exploitable seam.", skill:'lore', tag:'bold', align:'neutral', cid:'tactician_soreheim_gap'},
    {text:"Apply your command standing to access what you need at the Roadwardens.", skill:'persuasion', tag:'safe', align:'lawful', cid:'garrison_contact'},
    {text:"Find the center of gravity for the operation and apply pressure there.", skill:'lore', tag:'risky', align:'neutral', cid:'tactician_soreheim_cog'}
  ]},

  // ── DEATH KNIGHT SCENES ────────────────────────────────
  dk_shelk:{text:"The champion protocol was dissolved the week after the eastern route irregularities began. You were told the dissolution was administrative — budget restructuring. You accepted this for four months. Then you stopped accepting it. A champion protocol isn't dissolved in a budget review unless something about what the champions were witnessing was inconvenient. You came back to Shelkopolis to find out what you were witnessing.",choices:[
    {text:'Piece together what the unit found before the dissolution. The memory is there.', skill:'lore', tag:'safe', align:'neutral', cid:'death_knight_memory'},
    {text:'Apply your champion background to read what changed.', skill:'combat', tag:'safe', align:'neutral', cid:'combat_approach'},
    {text:"Read the garrison before speaking to anyone. The staffing changes since the dissolution are the first data point.", skill:'combat', tag:'safe', align:'neutral', cid:'warrior_garrison_read'},
    {text:"Your champion protocol credentials are still technically valid. Use them to access what you need.", skill:'persuasion', tag:'bold', align:'lawful', cid:'garrison_contact'},
    {text:"Find who authorized the dissolution. That's the thread.", skill:'lore', tag:'risky', align:'neutral', cid:'trace_directive'},
    {text:"The eastern route irregularities were happening when the protocol was active. Find the records from that period.", skill:'lore', tag:'safe', align:'neutral', cid:'study_packet'}
  ]},
  dk_roaz:{text:"You forgot what you found for six months. Then you stopped forgetting. The enforcement unit's investigation was getting close to something before the dissolution — you can reconstruct the general shape of it from what you remember. The eastern route. A cargo type that required non-standard handling. An authorization trail that reached higher than a logistics coordinator. You came back because what you found before is still actionable.",choices:[
    {text:'They tried to close this once. Understand why it did not stay closed.', skill:'combat', tag:'bold', align:'neutral', cid:'death_knight_unbroken'},
    {text:"Run the cross-reference the unit was running when it was dissolved.", skill:'lore', tag:'safe', align:'lawful', cid:'inquisitor_shirsh_read'},
    {text:"The unregistered credential in the access log — the unit had flagged it. Find it again.", skill:'lore', tag:'risky', align:'neutral', cid:'inquisitor_shirsh_log'},
    {text:"Find who in ORE authorized the unit's dissolution. That person knows what you were close to.", skill:'stealth', tag:'bold', align:'neutral', cid:'trace_directive'},
    {text:"Apply your enforcement background directly. You still know how to open doors.", skill:'combat', tag:'bold', align:'neutral', cid:'combat_approach'}
  ]},
  dk_panim:{text:"The irregularities in how eastern route dead were being processed are prosecutable under Panim civil code. You came to build the case before the records are amended further. You have three things that most investigators don't: formal death-honor standing that gives your word legal weight in Panim, knowledge of what properly processed death records look like, and the patience to build a case that will hold.",choices:[
    {text:'Reconstruct what you know. The dissolution left a shape you can read.', skill:'lore', tag:'safe', align:'neutral', cid:'death_knight_memory'},
    {text:'Apply your death-honor training to what the records show.', skill:'combat', tag:'safe', align:'neutral', cid:'combat_approach'},
    {text:"Death records are the most honest documents a settlement produces. Read them first.", skill:'lore', tag:'safe', align:'neutral', cid:'necromancer_panim_read'},
    {text:"The amendment trail is where they tried to cover it. Find who has amendment authority.", skill:'lore', tag:'risky', align:'neutral', cid:'healer_panim_registry'},
    {text:"Find Toriel Palevow. He's a physician who filed flags on these cases. He's been waiting for someone to come.", skill:'persuasion', tag:'safe', align:'good', cid:'healer_panim_ally'},
    {text:"Read the bodies in the mortuary halls. They carry what the registry suppressed.", skill:'lore', tag:'bold', align:'neutral', cid:'necromancer_mortuary_read'}
  ]},

  // ── BEASTMASTER SCENES ─────────────────────────────────
  bm_frontier:{text:"The animals around the eastern corridor waypoints are behaving as if a persistent stressor is operating there. You've tracked this pattern for three weeks. The stressor is not natural — it's consistent, directional, and it's getting stronger. Something is using the eastern corridor regularly enough that the local fauna has adjusted its routing patterns. You came to find what it is.",choices:[
    {text:'Follow the movement pattern backward. The fauna adapted for a reason.', skill:'survival', tag:'bold', align:'neutral', cid:'beastmaster_track'},
    {text:'Find a position to observe before anyone knows you are there.', skill:'stealth', tag:'bold', align:'neutral', cid:'stealth_surveillance'},
    {text:"Read the terrain from elevation before engaging. The high ground shows the full corridor pattern.", skill:'survival', tag:'bold', align:'neutral', cid:'archer_frontier_read'},
    {text:"Find Elyra Mossbane. She knows this terrain and she's been watching something similar.", skill:'persuasion', tag:'safe', align:'neutral', cid:'archer_frontier_ally'},
    {text:"Track the stressor directly. The fauna avoidance patterns will show you where to look.", skill:'survival', tag:'bold', align:'neutral', cid:'east_road'},
    {text:"Read the environmental read before committing to any approach.", skill:'survival', tag:'safe', align:'neutral', cid:'passive_intel'}
  ]},
  bm_soreheim:{text:"The structure you found in the eastern territory has an official purpose that does not match its location, construction, or the traffic moving through it. You surveyed the territory as part of a standard wilderness assessment. The structure was not in the survey request parameters. You documented it anyway, because beastmasters document what they find, not what they were asked to find. You came to Shelkopolis because the structure traces back to a Shelkopolis authorization and because your documentation is complete and needs a proper recipient.",choices:[
    {text:'Read the structure completely. The construction method is evidence.', skill:'craft', tag:'risky', align:'neutral', cid:'beastmaster_structure'},
    {text:'The allocation board tracks every input. Read it before speaking to anyone.', skill:'lore', tag:'safe', align:'neutral', cid:'soreheim_allocation_read'},
    {text:'Find a concealed position to read what is actually moving.', skill:'stealth', tag:'safe', align:'neutral', cid:'stealth_surveillance'},
    {text:"Map the operation before approaching anyone. The structure is one node in a larger pattern.", skill:'lore', tag:'safe', align:'neutral', cid:'tactician_soreheim_read'},
    {text:"Take your documentation to the Roadwardens directly. Complete documentation from a professional surveyor carries institutional weight.", skill:'persuasion', tag:'safe', align:'lawful', cid:'garrison_contact'},
    {text:"Find who authorized construction in that territory. That's the bureaucratic thread.", skill:'lore', tag:'risky', align:'neutral', cid:'trace_directive'},
    {text:"Go back east. The structure is still there and it still has traffic moving through it.", skill:'survival', tag:'bold', align:'neutral', cid:'east_road'}
  ]},
  bm_sheresh:{text:"The fauna response to the axis anomaly is consistent with an artificial forcing event. You know what natural variation looks like. This is not it. The response pattern is too directional, too consistent, and it started too specifically — six weeks ago, aligned with the eastern route changes. You came to Shelkopolis because the forcing event is being administered from here and because your monitoring data is evidence, and evidence needs somewhere to go.",choices:[
    {text:'The fauna response has a schedule. Find it before moving.', skill:'survival', tag:'safe', align:'neutral', cid:'beastmaster_track'},
    {text:'Observe the anomaly from a position that does not announce you.', skill:'stealth', tag:'safe', align:'neutral', cid:'stealth_surveillance'},
    {text:"The dome sensors have been recording this. Find someone who can read them alongside your monitoring data.", skill:'lore', tag:'risky', align:'neutral', cid:'elementalist_aurora_read'},
    {text:"The anomaly follows a predictable curve. Find who's been resetting the alert flags.", skill:'lore', tag:'bold', align:'neutral', cid:'elementalist_aurora_suspect'},
    {text:"Find Neren Rimebridge at the dome. He's been building correlation charts without authorization. Your data completes his.", skill:'persuasion', tag:'safe', align:'neutral', cid:'elementalist_aurora_ally'},
    {text:"Take the monitoring data to Warden Whiteglass. She needs to authorize the formal inquiry.", skill:'persuasion', tag:'safe', align:'lawful', cid:'garrison_contact'}
  ]}

};