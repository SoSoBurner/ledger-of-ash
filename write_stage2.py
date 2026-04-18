#!/usr/bin/env python3
# Script to write the complete stage2-backgrounds.js

import os

TARGET = r'C:\Users\CEO\ledger-of-ash\js\stage2-backgrounds.js'

# Read the current file to get parts we keep
with open(TARGET, 'r', encoding='utf-8') as f:
    current = f.read()

# We'll build the new content
lines_to_write = []
# Find the thief section and replace
WIZARD_OLD = "    // ── WIZARD (abbreviated) ──"
SUPPORT_PLACEHOLDER = "    // ── HEALER ──"  # doesn't exist yet

print("Current file has", len(current), "bytes")
print("Writing replacement...")

# Write the entire file fresh
content = r"""// ═══════════════════════════════════════════════════════
// STAGE II BACKGROUND CONTENT — Unique per archetype/background
// 93 backgrounds x 4 unique choices per background
// ═══════════════════════════════════════════════════════

(function(){
  const BACKGROUND_STAGE2_CONTENT = {

    // ── WARRIOR ──
    warrior_civic:{choices:[
      {label:'The garrison knew you would return. Pressure them about the eastern route silence.',mode:'records',skill:'lore',success:'Garrison records show a deliberate pause in reporting. Someone gave the order from above.',fail:'The record keeper shuts the conversation down before the pattern is clear.'},
      {label:'Find the Roadwarden officer who was on duty when the route changed. They owe no loyalty to the desk.',mode:'person',skill:'persuasion',success:'Off duty, the officer admits the eastern route was closed by direct command. No explanation given.',fail:'The officer deflects with parade-ground courtesy and stops answering.'},
      {label:'The garrison catwalk shows sightlines to the eastern approach. Spend an afternoon reading the view.',mode:'place',skill:'survival',success:'From the catwalk, you read the tension: guards are watching something specific about the eastern access.',fail:'The catwalk reveals nothing but ordinary guard rotations and no hidden pressure.'},
      {label:'A garrison squad rotating out this week passed through the route change point. Find their barracks.',mode:'stealth',skill:'stealth',success:'Drunk squad stories reveal a creature encounter on the eastern route that was never officially logged.',fail:'The squad disperses before your questions settle into anything useful.'}
    ]},
    warrior_frontier:{choices:[
      {label:'Frontier work means reading terrain before people. Scout the exact point where the eastern route goes dark.',mode:'place',skill:'survival',success:'The terrain itself shows signs of deliberate obstruction: fallen trees, set stones, something meant to stop passage.',fail:'The terrain looks ordinary and reveals no special pressure.'},
      {label:'Find a Frontier Ranging Company scout who passed through before the closure. They know what changed.',mode:'person',skill:'persuasion',success:'A ranger admits they fled back from the eastern approach after seeing something that made withdrawal the smart choice.',fail:'The ranger is evasive and offers no detail.'},
      {label:'Soreheim coordinates matter on open ground. Use them to triangulate what happened at the closure point.',mode:'records',skill:'lore',success:'The coordinates you calculate show a massive disturbance signature eight days past at the eastern approach.',fail:'The calculations stay ambiguous and suggest nothing clear.'},
      {label:'The Frontier Code is about survival through cunning. Find whoever benefits from the route being closed.',mode:'stealth',skill:'stealth',success:'A merchant house profit margin expanded dramatically once the route closed. They wanted this closure.',fail:'No clear beneficiary emerges from the inquiry.'}
    ]},
    warrior_occult:{choices:[
      {label:'Ithtananalor extraction workers respect visible strength. Show up at the work yard and ask direct questions.',mode:'place',skill:'combat',success:'The extraction crew defers to your bearing and admits they have not moved goods through the contested route in eight days.',fail:'The crew holds their line and offers nothing useful.'},
      {label:'Find a Roazian merchant who still moves goods through the enforcement checkpoints. They maintain private routes.',mode:'person',skill:'persuasion',success:'The merchant gives you a map showing where their route bypasses the official checkpoint.',fail:'The merchant is cautious and offers only vague assurances.'},
      {label:'Extraction sites require permits that follow specific paper trails. Pressure the enforcement records office about route closures.',mode:'records',skill:'craft',success:'The records show permits were revoked for contested access as of eight days past.',fail:'The office staff closes ranks behind procedure and courtesy.'},
      {label:'Ithtananalor pressure is always about vertical height and leverage. Find the highest enforcement vantage that watches the contested road.',mode:'place',skill:'survival',success:'From elevation you read the pattern: the route is physically blocked, not just administratively closed.',fail:'The elevated view reveals nothing but normal checkpoint activity.'}
    ]},

    // ── KNIGHT ──
    knight_civic:{choices:[
      {label:'House Shelk papers mean institutional access. Demand a meeting with the House Shelk administrator about the route situation.',mode:'person',skill:'persuasion',success:'The administrator admits House Shelk closed the route to contain something. A creature was sighted.',fail:'The administrator maintains diplomatic courtesy and says nothing direct.'},
      {label:'The other house representatives know the real story. Find them and read what they are not saying aloud.',mode:'stealth',skill:'stealth',success:'The rival house is using the closure to press advantage in a competing contract. They orchestrated the silence.',fail:'The other representatives reveal nothing useful.'},
      {label:'House Shelk letters carry real authority. Use them to access the route closure directive from the official record.',mode:'records',skill:'lore',success:'The directive came directly from House Shelk leadership and cites a creature containment protocol.',fail:'The record is sealed and the attempt to access it marks you as asking the wrong questions.'},
      {label:'Nobility relies on reputation. Find out what damage House Shelk fears if the route situation becomes public knowledge.',mode:'lore',skill:'lore',success:'A servant admits House Shelk fears their security posture will be questioned if this reaches the wrong ears.',fail:'Nobody will discuss House Shelk internal concerns.'}
    ]},
    knight_frontier:{choices:[
      {label:'Iron Accord credentials open Iron Accord doors. Demand a meeting with the Roazian enforcement liaison.',mode:'person',skill:'persuasion',success:'The liaison admits the Accord closed the route because a creature escaped their containment work.',fail:'The liaison denies knowledge and suggests you stop asking.'},
      {label:'Your reassignment never happened officially. Use that ambiguity to pressure the Accord hierarchy for truth.',mode:'records',skill:'lore',success:'The Accord keeps secret records of creature escapes. The contested route had one.',fail:'The records are sealed and the inquiry alerts the wrong people to your interest.'},
      {label:'Counting houses track what moves and what does not. Find a counting house agent and offer them a reason to share route intelligence.',mode:'stealth',skill:'stealth',success:'An agent admits counting houses profit from route closures and knew about this one in advance.',fail:'The agent will not meet with you after an initial cautious conversation.'},
      {label:'Enforcement answers to multiple masters. Use that divided loyalty to pressure a high-ranked checkpoint officer.',mode:'combat',skill:'combat',success:'A commander admits they were ordered to enforce the closure but not told the reason.',fail:'The commander shuts down the conversation and marks you as a security concern.'}
    ]},
    knight_occult:{choices:[
      {label:'Panim order-knights are servants of the death registry. Use that to access what the registry knows about irregular deaths near the route.',mode:'records',skill:'lore',success:'The registry shows increased death records from the contested route area eight days past.',fail:'The registry access is restricted and the attempt marks you as someone with questions.'},
      {label:'The Panim Haven representative might share information with another knight. Press for details about the route closure.',mode:'person',skill:'persuasion',success:'The representative admits the closure is linked to an irregular death pattern the registry was investigating.',fail:'The representative maintains shrine discretion and offers nothing.'},
      {label:'Your mandate was to investigate irregular memorial patterns. Connect the route closure to the memorial spike.',mode:'stealth',skill:'stealth',success:'The two events are directly linked: the creature event triggered irregular deaths that triggered memorial requests.',fail:'The connection stays unclear despite the research.'},
      {label:'Death comes to all. Offer to perform a private rite for the recent dead if the Panim shrine will share what they know.',mode:'ritual',skill:'craft',success:'A shrine attendant shares that the irregular deaths were caused by something that the route closure contained.',fail:'The shrine staff treats the offer as presumption and refuses to engage.'}
    ]},

    // ── RANGER ──
    ranger_civic:{choices:[
      {label:'The Fairhaven route charts show waypoint sequences. Find where the charted sequence breaks.',mode:'records',skill:'lore',success:'The charts show a waypoint sealed off eight days ago. Someone drew a line through it and signed initials nobody recognizes.',fail:'The charts show only normal variations and suggest no rupture.'},
      {label:'Caravan captains know routes better than any chart. Find a captain who ran the Fairhaven circuit and ask them directly what changed.',mode:'person',skill:'persuasion',success:'A captain admits they rerouted around an obstruction that appeared overnight at a waypoint.',fail:'A captain will not discuss the route change directly.'},
      {label:'You know every waypoint on the Fairhaven circuit. Go to the sealed one personally and read what happened there.',mode:'place',skill:'survival',success:'At the sealed waypoint you find evidence of a creature passage: scat, claw marks, something large moved through.',fail:'The sealed waypoint reveals nothing unusual to your reading.'},
      {label:'The circuit connects east and west. Scout the connection point and read backward from there.',mode:'stealth',skill:'survival',success:'Scouting backward shows the closure was meant to cut something off from escaping further along the route.',fail:'The scouting provides no clear picture of intent.'}
    ]},
    ranger_frontier:{choices:[
      {label:'Your corrections to the corridor map are valuable. Use them as leverage to demand route information from the trade registry.',mode:'records',skill:'craft',success:'The registry admits they used your corrections to identify a dangerous corridor variance. The route is closed to contain it.',fail:'The registry thanks you for the corrections but offers nothing about the closure.'},
      {label:'Giant Council survey work means you understand axis mechanics. Press local officials for information about axis instability near the route.',mode:'person',skill:'persuasion',success:'An official admits they suspect axis variance caused something to emerge on the approach.',fail:'The official suggests you are drawing dangerous conclusions from insufficient data.'},
      {label:'The allocation board shows supply route changes. Read it and determine what supply pattern shifted.',mode:'records',skill:'lore',success:'The allocation board shows all routes through the contested zone were rerouted simultaneously. Someone central made this decision.',fail:'The allocation board shows normal variations and suggests nothing unusual.'},
      {label:'File your corrections and then read what subsequent route assignments change because of them.',mode:'stealth',skill:'stealth',success:'Once your corrections are filed, subsequent route assignments avoid the contested corridor entirely.',fail:'No clear pattern emerges from reading the filed assignments.'}
    ]},
    ranger_occult:{choices:[
      {label:'The dome stewards sent you to investigate supply disruptions. Document exactly what the axis data says about pressure.',mode:'records',skill:'lore',success:'The axis data shows an inversion cycle spike that began eight days ago at the contested access point.',fail:'The axis data shows background noise and nothing conclusive.'},
      {label:'Find a scholar who studies axis inversion and show them your axis data.',mode:'person',skill:'persuasion',success:'The scholar warns that your data suggests a creature breach that the route closure is meant to contain.',fail:'The scholar says your data is incomplete and cannot draw conclusions.'},
      {label:'Dome settlements rely on trade routes that bypass axis variance zones. Check which trade agreements changed because of the route closure.',mode:'records',skill:'craft',success:'Trade agreements were rewritten to bypass the contested approach entirely. Multiple parties coordinated this.',fail:'The trade agreements show only standard variations.'},
      {label:'The dome perimeter was hostile when you learned to work it. Use that knowledge to read if the threat has shifted.',mode:'survival',skill:'survival',success:'You sense the threat has shifted: something escaped from its former boundary and the route closure was a response.',fail:'Your sense of the threat shows no change from previous readings.'}
    ]},

    // ── PALADIN ──
    paladin_civic:{choices:[
      {label:'Sera at the memorial counter hears everything. Sit with her and listen to what the memorial pattern really means.',mode:'person',skill:'persuasion',success:'Sera admits the memorial pattern corresponds to people who vanished from the contested route area. They are being recorded as dead.',fail:'Sera maintains shrine discretion and offers only vague observations.'},
      {label:'The families filing memorials carry the real story. Find a grieving family and offer to sit with them.',mode:'ritual',skill:'craft',success:'A family admits their relative was caught in something on the route and has been silent since. They assume death.',fail:'A family will not speak to a stranger about their loss.'},
      {label:'Aurora Light Cathedral blessing gives you access to ceremony records. Check what rituals were performed for recent dead.',mode:'records',skill:'lore',success:'Ceremony records show three emergency blessings for dead from the contested route in the past eight days.',fail:'The ceremony records show only normal variations in blessing traffic.'},
      {label:'Cysur demands communal bonds. Speak directly with a settlement leader about what happened on the route.',mode:'person',skill:'combat',success:'A settlement leader admits the route was closed after a creature escaped. They were ordered not to speak of it.',fail:'The settlement leader deflects with courtesy and stops engaging.'}
    ]},
    paladin_frontier:{choices:[
      {label:'Two names appear in both the Roazian enforcement records and institutional administrative files. Trace their current location.',mode:'stealth',skill:'stealth',success:'Both names lead to an administrator coordinating with Iron Accord enforcement on the route closure.',fail:'Both names go cold and lead to no current location.'},
      {label:'Eloljaro opens doors. Use those doors to access sealed administrative files about the route closure.',mode:'records',skill:'lore',success:'The files show two polities jointly orchestrated the route closure to contain a creature escape.',fail:'The files are sealed and the attempt to access them marks you for surveillance.'},
      {label:'The enforcement order answers to multiple powers. Pressure a checkpoint commander to choose which loyalty wins.',mode:'person',skill:'persuasion',success:'A commander admits they enforce the route closure because two powers aligned on it. Nothing gets through.',fail:'The commander suggests you are asking for information you should not have.'},
      {label:'Eloljaro and Cysur maintain contact through shared institutions. Find a shrine attendant who knows both and ask for perspective.',mode:'ritual',skill:'craft',success:'An attendant admits both institutions agreed to maintain the route closure for mutual security.',fail:'An attendant will not discuss institutional agreements with an outsider.'}
    ]},
    paladin_occult:{choices:[
      {label:'Mimolot has records of doctrinal exceptions and secret rites. Pressure the archive to surface what was applied to the route situation.',mode:'records',skill:'lore',success:'Archive records describe a ritual failure that released something onto the route, triggering the closure.',fail:'Archive access is refused without proper scholarium clearance.'},
      {label:'A shrine attendant with archive access might share what the institution knows about the closure.',mode:'person',skill:'persuasion',success:'An attendant admits the closure is protecting against a ritual breach the academy is studying.',fail:'An attendant maintains institutional discretion and says nothing actionable.'},
      {label:'Sacred resolve under pressure. Use the authority of your oath to demand the hidden truth from those who know it.',mode:'ritual',skill:'craft',success:'The oath carries enough institutional weight that a faculty member confirms the breach and names its source.',fail:'The faculty member considers you outside the chain of institutional authority.'},
      {label:'Dangerous knowledge serves those with the resolve to hold it. Find the sealed archive that holds the breach records.',mode:'stealth',skill:'stealth',success:'The sealed archive contains the full record of the ritual breach and the creature it released.',fail:'The archive seal resists your approach and alerts internal security.'}
    ]},

    // ── ARCHER ──
    archer_civic:{choices:[
      {label:'You held elevated positions on three route circuits. Go to the highest point and read the contested approach.',mode:'place',skill:'survival',success:'From elevation you see clear signs of deliberate obstruction and active guard positions blocking the route.',fail:'From elevation the approach looks ordinary and reveals no special pressure.'},
      {label:'Marksmen work ranges and sightlines. Find a Roadwarden officer and press them about sight-line changes on the contested route.',mode:'person',skill:'persuasion',success:'An officer admits the route sight-lines were deliberately modified to prevent creature escape into the wider territory.',fail:'An officer deflects and stops engaging.'},
      {label:'The Roadwardens maintain sighting logs for route security. Access the logs for the contested approach.',mode:'records',skill:'lore',success:'The sighting logs show a massive anomaly recorded eight days ago, then all logs for that zone were sealed.',fail:'The sighting logs show only normal traffic and reveal nothing.'},
      {label:'Off-duty Roadwardens are more honest about what the official channels hide. Find one and offer them a drink.',mode:'stealth',skill:'stealth',success:'An off-duty warden admits something escaped its cage on the route and the closure is containment protocol.',fail:'An off-duty warden will not discuss official security with an archer.'}
    ]},
    archer_frontier:{choices:[
      {label:'Frontier ranging companies file incident reports with the Soreheim trade registry. Find yours and read what it says.',mode:'records',skill:'lore',success:'Your incident report describes a creature sighting east of Sunspire Haven that the routing companies are avoiding.',fail:'Your incident report is either filed under a different name or has been archived out of reach.'},
      {label:'The frontier gives creatures space and watches from distance. Scout the eastern approach from distance.',mode:'place',skill:'survival',success:'From distance you see the barrier that was constructed to block eastward creature movement.',fail:'Your distant scouting reveals no special pressure or structure.'},
      {label:'Frontier rangers respect skill and truth. Find another ranger who was working the eastern route and ask them what they saw.',mode:'person',skill:'persuasion',success:'A ranger admits they saw a creature and immediately understood the route was closing as response.',fail:'Another ranger is cautious and offers no detail about route conditions.'},
      {label:'The route was changed eight days ago. Check Frontier Ranging Company dispatch logs for what operations were canceled that day.',mode:'records',skill:'craft',success:'Dispatch logs show six planned operations were canceled with a code meaning creature sighting and reroute.',fail:'Dispatch logs show normal cancellations and suggest no special event.'}
    ]},
    archer_occult:{choices:[
      {label:'Caravan guard work means you know every approach to every settlement. Read the approaches to Guildheart.',mode:'place',skill:'combat',success:'From your perspective, the routes are being actively guarded against creature escape. Something is contained here.',fail:'The approaches read as ordinary guard positions and reveal no special pressure.'},
      {label:'The original caravan route from Guildheart changed eight days ago. Find a caravan captain and compare old versus new route.',mode:'records',skill:'lore',success:'The new route deliberately avoids the contested approach that the old route used to use.',fail:'Caravan routes change regularly and the captain sees nothing special about the current variation.'},
      {label:'Scout the original route to find out why it changed. Look for creature sign.',mode:'stealth',skill:'stealth',success:'Following the original route, you found the creature sign and understood immediately why caravans avoid it now.',fail:'Following the original route revealed nothing that explained the route change.'},
      {label:'Find an off-duty caravan guard and ask what they really know about the route change.',mode:'person',skill:'persuasion',success:'An off-duty guard admits they evacuated the original route because something escaped its natural boundaries.',fail:'An off-duty guard will not discuss caravan security with someone not in the trade.'}
    ]},

    // ── BERSERKER ──
    berserker_civic:{choices:[
      {label:'Civic buildings hold the power to explain everything. Pressure a civic official about the route closure directly.',mode:'person',skill:'combat',success:'Fear of your bearing outruns official courtesy. An official admits the closure was ordered from the highest civic level.',fail:'An official stands firm behind procedure and offers nothing.'},
      {label:'Civic order is built on visible force and consequences. Demand records about the closure at the administrative office.',mode:'place',skill:'combat',success:'Civic staff produce records showing the route was sealed by top-level order with no explanation provided to lower levels.',fail:'Civic staff lock down and refuse to produce anything.'},
      {label:'The civic system punishes weakness. Find an administrator who thinks you are more powerful than your position suggests.',mode:'stealth',skill:'stealth',success:'An administrator believes you have authority they do not and shares sealed records about a creature containment.',fail:'No administrator mistakes you for someone with higher authority.'},
      {label:'Violence serves civic order. Offer yourself as an instrument of civic security and demand to know what you are securing against.',mode:'records',skill:'lore',success:'Civic records describe a creature that escaped and the route closure as immediate containment response.',fail:'Civic records are sealed and produce nothing in response to your demand.'}
    ]},
    berserker_frontier:{choices:[
      {label:'Frontier life teaches that threats are dealt with directly and immediately. Go to the eastern route closure point and test its strength.',mode:'place',skill:'combat',success:'You test the closure and confirm it is active and defended. Something real is being contained.',fail:'The closure tests weak and reveals nothing about its purpose.'},
      {label:'Frontier warriors are respected for direct action. Find a Frontier Ranging Company leader and push them for truth.',mode:'person',skill:'combat',success:'A company leader respects your directness and admits they are avoiding the eastern route because a creature claimed it.',fail:'A company leader considers you a liability and stops engaging.'},
      {label:'The frontier code is about action over talk. Scout the closure point and count the guards.',mode:'stealth',skill:'survival',success:'Counting guards reveals a professional containment operation with far more personnel than a normal route closure would require.',fail:'Counting guards reveals only standard guard rotations and suggests nothing unusual.'},
      {label:'Power respects power. Find a creature or hazard near the closure and prove you can handle it.',mode:'place',skill:'combat',success:'Defeating a hazard near the closure convinces locals that you are trustworthy. They share what really happened: creature escape.',fail:'The hazard defeats you and the locals respect caution instead.'}
    ]},
    berserker_occult:{choices:[
      {label:'Occult knowledge teaches that hidden rites protect what must remain hidden. Find an occult practitioner and press them for truth.',mode:'person',skill:'lore',success:'An occult practitioner admits the closure is protecting against something that rituals alone cannot contain.',fail:'An occult practitioner deflects with mysticism and offers no real answer.'},
      {label:'Dangerous knowledge serves those bold enough to pursue it. Break into an occult shrine and read what their records say.',mode:'stealth',skill:'stealth',success:'Shrine records describe a creature emerging from the axis that local rituals are containing.',fail:'The shrine is sealed too tightly to access without raising alarms.'},
      {label:'Occult practitioners see what others miss. Offer your berserker strength as protection and ask what they are protecting against.',mode:'ritual',skill:'craft',success:'A practitioner trusts your offer and reveals the closure is concealing a ritual failure that let something through.',fail:'A practitioner considers your offer suspicious and refuses to engage.'},
      {label:'The hidden rite path leads to dangerous knowledge. Follow the signs and trace them to their source.',mode:'records',skill:'lore',success:'The signs lead to a sealed ritual site where containment magic is barely holding something in place.',fail:'The signs go cold and lead nowhere clear.'}
    ]},

    // ── WARDEN ──
    warden_civic:{choices:[
      {label:'Wardens enforce civic order. Use that authority to demand records about what civic order required the route closure.',mode:'records',skill:'lore',success:'Civic records show the closure was a protective measure ordered by civic leadership to prevent public panic.',fail:'Civic records are sealed and the attempt marks you as asking wrong questions.'},
      {label:'The civic system trusts those who demonstrate commitment to order. Propose to assist in enforcing the closure.',mode:'person',skill:'persuasion',success:'A civic official trusts your offer and shares that the closure contains a creature that would cause mass panic if revealed.',fail:'A civic official suggests you are overstepping your role.'},
      {label:'Civic order breaks when people stop obeying. Find a civic servant who is breaking ranks and press them for truth.',mode:'stealth',skill:'stealth',success:'A servant wants to confess that they know the closure is hiding something but will not speak on record.',fail:'No servant breaks ranks in your presence.'},
      {label:'The wardens answer to civic power. Trace the order for the closure from the civic power that gave it.',mode:'records',skill:'craft',success:'You trace the order to House Shelk and discover they wanted the closure for strategic advantage.',fail:'The order chain goes through too many intermediaries to trace clearly.'}
    ]},
    warden_frontier:{choices:[
      {label:'Frontier wardens maintain routes by enforcing passage rights. Use those rights to demand access to sealed areas.',mode:'place',skill:'survival',success:'Your frontier rights override local closure orders. You pass the barrier and see creature sign beyond it.',fail:'Local authorities deny that your rights override their closure orders.'},
      {label:'Wardens work with community leaders. Find a frontier community leader and press them about the closure.',mode:'person',skill:'persuasion',success:'A community leader respects your warden status and shares that the closure is protecting the frontier from a creature escape.',fail:'A community leader suggests wardens have no authority over route closures.'},
      {label:'Passage rights create records. Find records of who was refused passage and why.',mode:'records',skill:'lore',success:'Passage records show dozens of refusals with the notation creature containment protocol.',fail:'Passage records show normal routing variations.'},
      {label:'Frontier passage means reading terrain and passage signs. Scout the closure point.',mode:'stealth',skill:'stealth',success:'The signs show the closure point is active and has repelled multiple passage attempts.',fail:'The signs show ordinary traffic patterns.'}
    ]},
    warden_occult:{choices:[
      {label:'Occult practices often conflict with civic order. Find an occult practitioner who resents the closure order.',mode:'person',skill:'persuasion',success:'A practitioner shares that the closure was ordered by civic powers who fear occult knowledge about what is contained.',fail:'A practitioner will not speak with a warden about occult matters.'},
      {label:'The closure may be hiding an occult breach. Press an occult shrine attendant for what really happened.',mode:'ritual',skill:'craft',success:'An attendant admits a breach in their containment wards let something through and civic powers ordered secrecy.',fail:'An attendant will not discuss shrine security with a warden.'},
      {label:'Wardens often need to know what occult practitioners know. Find records of occult activity near the closure point.',mode:'records',skill:'lore',success:'Records show occult practitioners were working containment rituals eight days ago when the closure began.',fail:'No occult records are accessible.'},
      {label:'Some things require both civic order and occult practice to contain. Offer that understanding to an occult leader.',mode:'stealth',skill:'stealth',success:'An occult leader trusts your understanding and shares that a hybrid containment is barely holding against something large.',fail:'An occult leader considers wardens enemies of true knowledge.'}
    ]},

    // ── WARLORD ──
    warlord_civic:{choices:[
      {label:'Warlords command respect through demonstrated power. Show power at the administration hall.',mode:'person',skill:'combat',success:'Power silences pretense. Officials admit the closure contains a threat to the city.',fail:'Officials stand firm behind procedure.'},
      {label:'Find a garrison commander who will respect your tactical assessment of the closure.',mode:'records',skill:'lore',success:'Commanders share that the closure reflects tactical containment strategy against an escaped creature.',fail:'No commander will discuss tactical matters with you.'},
      {label:'Survey the closure perimeter from a command perspective.',mode:'place',skill:'combat',success:'Your military survey reveals the closure as defensive positioning against a creature escape.',fail:'Military staff refuse to produce records or engage with your assessment.'},
      {label:'Test the defensive perimeter directly and read what you find.',mode:'stealth',skill:'stealth',success:'Testing reveals active containment of a creature threat behind the closure line.',fail:'Testing reveals only standard defensive positioning with no special pressure.'}
    ]},
    warlord_frontier:{choices:[
      {label:'Frontier warlords command through demonstrated survival skill. Read the closure terrain.',mode:'place',skill:'survival',success:'Your survival knowledge reads the closure terrain clearly: this is creature containment, not ordinary route management.',fail:'Your reading of the terrain suggests nothing special beyond the stated closure.'},
      {label:'Find a frontier commander who commanded through the closure event.',mode:'person',skill:'persuasion',success:'A commander admits a creature threat prompted the closure and the emergency supply changes that followed.',fail:'A commander deflects and will not discuss operational matters.'},
      {label:'Scout military supply chain changes that followed the closure.',mode:'records',skill:'craft',success:'Supply records show emergency resupply to the closure area consistent with creature containment operations.',fail:'Supply records show normal variations with no emergency signature.'},
      {label:'Test the closure defenses through direct engagement and read the response.',mode:'combat',skill:'combat',success:'Your engagement proves the defenses are real, active, and expecting something specific.',fail:'Your engagement reveals weak defensive posture and no clear creature-containment purpose.'}
    ]},
    warlord_occult:{choices:[
      {label:'Occult warfare uses hidden knowledge that civic commanders fear. Find a practitioner who knows what is behind the closure.',mode:'person',skill:'lore',success:'An occult practitioner shares forbidden knowledge about what the closure is concealing.',fail:'A practitioner deflects and will not share with outside inquiry.'},
      {label:'Find occult records of what was bound near the closure point.',mode:'records',skill:'lore',success:'Occult records describe magical containment work performed eight days past at the contested approach.',fail:'No occult records are accessible to outside inquiry.'},
      {label:'Press an occult leader through tactical analysis of their containment operation.',mode:'stealth',skill:'stealth',success:'A leader trusts your tactical thinking and shares what is contained behind the closure.',fail:'A leader considers you a threat to their containment operation.'},
      {label:'Demonstrate occult knowledge to establish credibility with the practitioners.',mode:'ritual',skill:'craft',success:'Your knowledge convinces an occult expert you understand the stakes. They share the truth.',fail:'Your knowledge is insufficient to establish credibility with them.'}
    ]},

    // ── DEATH KNIGHT ──
    death_knight_civic:{choices:[
      {label:'Death brings truth. Find who died near the route closure and read the records.',mode:'records',skill:'lore',success:'Death records show deaths from creature attack that were concealed from public reporting.',fail:'Death records have been sealed by civic order.'},
      {label:'Ask a civic official directly about the deaths behind the route closure.',mode:'person',skill:'persuasion',success:'An official admits hidden deaths prompted the emergency closure.',fail:'An official deflects with procedure and offers nothing.'},
      {label:'The death registry serves power. Use that relationship to access what was recorded.',mode:'place',skill:'survival',success:'Registry location yields sealed records of creature-caused deaths from the route area.',fail:'The registry yields nothing outside official channels.'},
      {label:'Death leaves signs on places. Scout the closure point for creature kill evidence.',mode:'stealth',skill:'stealth',success:'You find creature kill sites near the closure point that were never officially reported.',fail:'You find no special signs of creature-caused death.'}
    ]},
    death_knight_frontier:{choices:[
      {label:'Frontier death is visible and real. Find the graves that were dug after the closure.',mode:'place',skill:'survival',success:'You find frontier graves of creature victims, recently dug and unmarked.',fail:'You find only ordinary frontier remains and natural deaths.'},
      {label:'Find frontier death keepers who recorded what happened on the route.',mode:'person',skill:'persuasion',success:'They admit creature deaths prompted the route closure and community silence.',fail:'They deflect and will not speak of recent deaths.'},
      {label:'Read death signs in the terrain near the closure point.',mode:'records',skill:'lore',success:'Terrain shows creature predation patterns consistent with an active creature presence.',fail:'Terrain shows ordinary wear and natural animal sign.'},
      {label:'Pressure local death records for irregularities in the past ten days.',mode:'stealth',skill:'stealth',success:'Local records show hidden creature deaths recorded under false causes.',fail:'No hidden records of irregular death exist.'}
    ]},
    death_knight_occult:{choices:[
      {label:'Occult death serves purposes beyond the visible. Find the practitioners who shaped it.',mode:'ritual',skill:'craft',success:'An occult practitioner admits death was being shaped and contained through the closure.',fail:'A practitioner deflects with mysticism and says nothing specific.'},
      {label:'The death path leads through occult knowledge. Access the sealed occult death records.',mode:'records',skill:'lore',success:'Occult records describe death-binding magic applied to what escaped on the route.',fail:'Records are sealed and resist outside access.'},
      {label:'Find where occult death rites are performed and read the residue.',mode:'place',skill:'survival',success:'Rite locations reveal death-containment magic in active use, barely holding.',fail:'Rite locations yield nothing accessible to your reading.'},
      {label:'Press an occult death master for what they know about the closure.',mode:'person',skill:'persuasion',success:'A master shares forbidden knowledge about death binding and what required it.',fail:'A master refuses engagement and vanishes from the conversation.'}
    ]},

    // ── WIZARD ──
    wizard_civic:{choices:[
      {label:'The Academy sealed the contested archive section three days ago. Work the catalog records to find what moved before the closure.',mode:'records',skill:'lore',success:'Catalog ghosts show a sequence of restricted transfers that preceded the seal by twelve hours. Someone anticipated the inquiry.',fail:'The catalog records are already corrected. The original transfer order has been replaced with a clean version.'},
      {label:'The archive director has been cycling through assistants unusually fast this season. Find a recently dismissed one.',mode:'person',skill:'persuasion',success:'The dismissed assistant describes ward residue they were told not to report, concentrated near the eastern lecture court.',fail:'The assistant is afraid of professional consequences and gives nothing specific.'},
      {label:'Lecture courts on the eastern wing have been locked under maintenance notices for five days. Read the ward residue on the doors.',mode:'place',skill:'craft',success:'The residue pattern is not maintenance work. Something was bound in the court and the seal is still fresh.',fail:'The ward signatures have been deliberately scrubbed. The maintenance notices are a practiced cover.'},
      {label:'Mimolot Academy keeps a separate record set for cross-institutional correspondence. Access that tier without drawing attention.',mode:'stealth',skill:'stealth',success:'Correspondence shows the Academy was warned about the eastern route problem two weeks ago and chose not to act on it.',fail:'The correspondence tier is physically guarded. You cannot reach it without flagging an inquiry.'}
    ]},
    wizard_frontier:{choices:[
      {label:'The Shrine Path shrines log all offering activity. Check the offering records against traffic patterns from before the route closed.',mode:'records',skill:'lore',success:'Offering frequency dropped sharply at a specific shrine eight days before the official closure. Someone stopped using the route before the announcement.',fail:'The shrine logs are kept by the devotion wardens and are not available to outside inquiry.'},
      {label:'A district devotee who maintains shrines on the Shrine Path passes through weekly. They would notice when traffic changed.',mode:'person',skill:'persuasion',success:'The devotee describes a night when the bell timing at the central shrine changed pattern. It happened twice more after that.',fail:'The devotee treats route knowledge as sacred and deflects every direct question.'},
      {label:'The middle shrine on the Shrine Path shows ritual residue inconsistent with ordinary devotion. Read the pattern.',mode:'place',skill:'craft',success:'The residue is not worship. Something was marked here: a binding or a warning glyph layered under the devotion layer.',fail:'The shrine residue is too old and overlapping to separate. You cannot identify anything specific.'},
      {label:'The bell timing at frontier shrines communicates passage safety through a coded rhythm. Learn it and listen.',mode:'stealth',skill:'stealth',success:'The bells have been sounding a danger flag pattern that the local warden confirms has been active for nine days.',fail:'The bell timing is too complex to decode without initiation into the shrine network.'}
    ]},
    wizard_occult:{choices:[
      {label:'The Soreheim memorial road logs casualty records separately from civic death records. Compare the two sets.',mode:'records',skill:'lore',success:'Memorial traffic shows three names that appear in the civic casualty log but are absent from the memorial record. Someone removed them from official mourning.',fail:'The memorial road records are maintained by the ward-keepers and require family authorization to access.'},
      {label:'A ward-keeper who manages the memorial road processional has been on the route every morning for a decade. Ask what changed.',mode:'person',skill:'persuasion',success:'The ward-keeper describes a death-echo reading that came back wrong three weeks ago: something buried beneath the memorial flags that should not be there.',fail:'The ward-keeper treats death knowledge as bound by guild silence and will not share specific findings.'},
      {label:'The memorial road processional path passes directly over the oldest ward-seals in Soreheim. Read the death-echo at the oldest marker.',mode:'place',skill:'craft',success:'The death-echo beneath the processional marker is layered with a binding signature. Something was sealed here within the last month.',fail:'The memorial road wards are thick with decades of legitimate death-echo. You cannot isolate the recent addition.'},
      {label:'Processional watchers assigned to the memorial road rotate every four days. Find one whose rotation ended before the route closure.',mode:'stealth',skill:'stealth',success:'The watcher saw something emerge from the road surface during the midnight processional. They reported it and were reassigned immediately.',fail:'The watcher rotation records are held by the ward-keeper guild and are not accessible to outside inquiry.'}
    ]},

    // ── CLERIC ──
    cleric_civic:{choices:[
      {label:'Divine institutional authority opens official mouths. Invoke clerical standing at the civic hall.',mode:'person',skill:'persuasion',success:'Civic leaders confess the spiritual crisis the creature posed to community order.',fail:'Officials claim no divine guidance applies to a civic route matter.'},
      {label:'Search shrine records for evidence of spiritual corruption near the route.',mode:'place',skill:'lore',success:'Hidden shrine records document when corruption was detected and reported upward.',fail:'Shrines hold no records of spiritual concern at the contested approach.'},
      {label:'Invoke clerical hierarchy to access sealed archives about the route closure.',mode:'records',skill:'lore',success:'Ecclesiastical authority permits access to truth about the threat and its spiritual dimension.',fail:'Archives remain sealed even to clerical pressure.'},
      {label:'Perform a ritual of divine revelation at the major shrine.',mode:'ritual',skill:'craft',success:'Divine vision shows the spiritual danger that required the route closure.',fail:'No divine message is granted on this matter.'}
    ]},
    cleric_frontier:{choices:[
      {label:'A frontier cleric witnessed what threatened pilgrims on the approach.',mode:'person',skill:'persuasion',success:'The cleric describes the creature and why faith alone provides limited protection against it.',fail:'The cleric is bound by pastoral confidentiality and will not speak of specific dangers.'},
      {label:'Visit frontier shrines on the approach and read their spiritual state.',mode:'place',skill:'lore',success:'Shrine condition reflects the severity of the creature threat: active wards, recent reinforcement.',fail:'Shrines appear spiritually normal with no special preparation.'},
      {label:'Request permission to view pilgrimage records for the past two weeks.',mode:'records',skill:'lore',success:'Clergy share records of which pilgrims never arrived at their destination shrines.',fail:'Records of pilgrims are considered sacred and private.'},
      {label:'Conduct a protective ritual at the approach point to identify what threatened it.',mode:'ritual',skill:'craft',success:'Ritual reveals the entity and what makes it dangerous to faith communities.',fail:'The ritual reveals nothing useful about the specific threat.'}
    ]},
    cleric_occult:{choices:[
      {label:'Forbidden exorcism texts describe binding rites for what was contained.',mode:'ritual',skill:'craft',success:'Occult clergy methods explain what magic was used to bind the creature on the route.',fail:'Texts are too dangerous for orthodox clergy to access safely.'},
      {label:'Contact heretical priesthood who understand binding through forbidden practice.',mode:'person',skill:'persuasion',success:'A forbidden priest explains the nature of the containment rite and what it bound.',fail:'Such priests refuse contact with traditional clergy.'},
      {label:'Access the restricted chapel vault beneath the central shrine.',mode:'records',skill:'lore',success:'The vault contains records of the binding ritual performed on the route.',fail:'The vault remains sealed and protected against unauthorized access.'},
      {label:'Attempt channeling to communicate with what was bound.',mode:'place',skill:'craft',success:'Contact grants a glimpse of what the entity is and why it was bound.',fail:'The entity resists communication and the attempt yields nothing.'}
    ]},

    // ── PRIEST ──
    priest_civic:{choices:[
      {label:'Community trust reveals what the priest knows about the route closure.',mode:'person',skill:'persuasion',success:'A civic priest confesses the ritual that failed and why the closure was the only answer.',fail:'The priest claims ritual matters are not public knowledge.'},
      {label:'Check ritual donation records at the main shrine for signs of emergency expense.',mode:'records',skill:'lore',success:'Ritual expense and emergency protective rituals mark the exact crisis point.',fail:'Records are kept private from non-practitioners.'},
      {label:'Read the sacred space near the route for emotional imprints of panic.',mode:'place',skill:'lore',success:'Sacred space holds memory of the protective rituals that were performed in crisis.',fail:'Sacred space reveals only ordinary peace and devotion.'},
      {label:'Perform a communal truth ritual with the approval of shrine leadership.',mode:'ritual',skill:'craft',success:'The ritual opens what the priest knows about the threat and why silence was chosen.',fail:'The community does not permit truth-compulsion ritual without full consent.'}
    ]},
    priest_frontier:{choices:[
      {label:'Frontier priest protection rests on community knowledge of the local territory.',mode:'person',skill:'persuasion',success:'The priest explains why the creature that appeared requires both faith and physical closure to contain.',fail:'The priest will not speak of frontier vulnerability to strangers.'},
      {label:'Ask about the protective faith sites on local roads and their current condition.',mode:'place',skill:'lore',success:'Sacred ground markers show which areas remain safe and which have been reinforced since the closure.',fail:'Faith sites appear ordinary and show no special preparation.'},
      {label:'Access the written sermons about protection that predate the closure.',mode:'records',skill:'lore',success:'Sermons encode knowledge of what specific danger requires the protection they describe.',fail:'Sermon texts are too spiritual for secular interpretation without guidance.'},
      {label:'Participate in the protective faith ceremony held weekly at the frontier shrine.',mode:'ritual',skill:'craft',success:'The ceremony reveals both the nature of the threat and the community defense mounted against it.',fail:'The ceremony reveals only spiritual comfort and no specific knowledge.'}
    ]},
    priest_occult:{choices:[
      {label:'Forbidden priesthood understands binding through faith alone.',mode:'ritual',skill:'craft',success:'A heretical rite reveals how faith itself became the binding force that contains what escaped.',fail:'Forbidden priesthood refuses to teach orthodox priests their methods.'},
      {label:'Locate the underground priest who performed the binding on the route.',mode:'person',skill:'persuasion',success:'The hidden priest explains the faith-based containment rite and what it was used against.',fail:'Such priests vanish rather than be found by those they do not trust.'},
      {label:'Search for hidden records of the binding ceremony in the shrine archive.',mode:'records',skill:'lore',success:'Secret records describe the ritual that bound the entity and the community cost of performing it.',fail:'No evidence of hidden ceremonies remains accessible.'},
      {label:'Attempt to enter the binding site undetected and read what was done there.',mode:'place',skill:'craft',success:'Visiting the site reveals the nature of the faith binding and what it is holding.',fail:'Protective wards prevent approach to the binding site.'}
    ]},

    // ── NECROMANCER ──
    necromancer_civic:{choices:[
      {label:'Death records in the city tell their own story about the route closure.',mode:'records',skill:'lore',success:'Sudden civic deaths from creature attack are documented in the uncorrected registry.',fail:'Death records have been carefully redacted before your arrival.'},
      {label:'Find the death-keeper who recorded the closure death toll.',mode:'person',skill:'persuasion',success:'A keeper shares the number and nature of creature victims recorded in the first three days.',fail:'Keepers are bound by institutional secrecy and will not share numbers.'},
      {label:'Read death patterns in burial grounds and grave markers near the route.',mode:'place',skill:'survival',success:'Grave layout shows clustering of recent creature-caused deaths in the eastern approach zone.',fail:'Burial patterns appear natural and scattered with no clustering.'},
      {label:'Perform death communion to learn from those who fell on the route.',mode:'ritual',skill:'craft',success:'The dead speak of the creature and why they fell to it on that approach.',fail:'The dead offer only confused final moments with no clear detail.'}
    ]},
    necromancer_frontier:{choices:[
      {label:'Frontier death is honest and visible. Follow the evidence of it from the closure point.',mode:'place',skill:'survival',success:'Fresh frontier graves mark the exact point where creature activity forced the closure.',fail:'Frontier dead yield no unusual pattern near the closure zone.'},
      {label:'Find the frontier death keepers who recorded what happened near the route.',mode:'person',skill:'persuasion',success:'Keepers share the death truth: creature victims, suppressed records, enforced silence.',fail:'Keepers deflect and will not speak of recent deaths to strangers.'},
      {label:'Read the frontier death records for the past twelve days.',mode:'records',skill:'lore',success:'Records reveal creature deaths recorded under false causes in the closure period.',fail:'Records are incomplete or show only ordinary frontier mortality.'},
      {label:'Perform a death ritual at the closure point to speak with what remains.',mode:'ritual',skill:'craft',success:'Ritual reveals the creature presence and the shape of the threat that forced the closure.',fail:'The ritual fails to produce useful communication.'}
    ]},
    necromancer_occult:{choices:[
      {label:'Deep death holds power and memory. Find the occult death site near the closure.',mode:'ritual',skill:'craft',success:'Deep practice at the site reveals what was sealed and why death magic was involved.',fail:'The practice fails to connect with anything specific.'},
      {label:'Find the occult death masters who worked the closure binding.',mode:'person',skill:'persuasion',success:'Masters share deep knowledge of the death-binding used to contain the creature.',fail:'Masters refuse contact and will not share binding methods.'},
      {label:'Access occult death records from the past month.',mode:'records',skill:'lore',success:'Records show binding magic applied to a creature that was causing death echoes in the route corridor.',fail:'Records resist access through standard occult channels.'},
      {label:'Attempt death communion at the memorial marker nearest the closure.',mode:'place',skill:'survival',success:'Communion at the marker grants understanding of the creature and the death-binding that holds it.',fail:'The memorial yields nothing beyond ordinary death echo.'}
    ]},

    // ── ILLUSIONIST ──
    illusionist_civic:{choices:[
      {label:'The civic narrative about the route closure is a performance. Find who is writing it.',mode:'person',skill:'persuasion',success:'Officials reveal the truth beneath their narrative when pressed from an unexpected angle.',fail:'Officials maintain their story and adjust the performance for your presence.'},
      {label:'Find the hidden truth records that the official narrative was written to replace.',mode:'records',skill:'lore',success:'Hidden records reveal the real sequence of events that the closure announcement obscured.',fail:'Records have already been replaced with the narrative version.'},
      {label:'Read behind the civic appearance of the closure enforcement.',mode:'place',skill:'stealth',success:'The appearance masks a different reality: guards are containing something specific.',fail:'The appearance reveals nothing beyond the stated closure reason.'},
      {label:'Dispel the civic illusion to reveal what the closure is actually protecting.',mode:'ritual',skill:'craft',success:'The illusion disperses and the truth of the creature containment appears.',fail:'The illusion holds. You cannot separate what is crafted from what is real.'}
    ]},
    illusionist_frontier:{choices:[
      {label:'Frontier illusions are survival tricks used to hide what is dangerous.',mode:'place',skill:'survival',success:'You see through the frontier deceptions and find creature sign that was hidden from casual observation.',fail:'The frontier appearances hold and reveal nothing unusual.'},
      {label:'Find the truth beneath the stories circulating about the route closure.',mode:'person',skill:'persuasion',success:'The truth beneath the frontier narrative emerges: creature escape, local cover, enforced silence.',fail:'The frontier narrative holds and your questions produce only consistent deflection.'},
      {label:'Find frontier records hidden behind the official closure story.',mode:'records',skill:'lore',success:'Hidden truths are revealed: alternate records kept by locals who saw what happened.',fail:'Records have been replaced or are inaccessible.'},
      {label:'Use illusion craft to appear as someone with official route authority.',mode:'ritual',skill:'craft',success:'Your appearance grants access to conversations that reveal the real closure reason.',fail:'The illusion fails or is seen through before you learn anything useful.'}
    ]},
    illusionist_occult:{choices:[
      {label:'Occult illusion is deep magic that hides real things. Find what is being hidden on the route.',mode:'ritual',skill:'craft',success:'Deep illusions are pierced and the creature containment beneath the official story is revealed.',fail:'The illusions hold and resist your attempt to read beneath them.'},
      {label:'Find the illusion weavers who constructed the cover over the closure.',mode:'person',skill:'persuasion',success:'Weavers reveal what they were paid to hide and why the real story required concealment.',fail:'Weavers refuse to disclose client work.'},
      {label:'Access hidden magical records of what the closure is actually concealing.',mode:'records',skill:'lore',success:'Records show magical deception layered over the official closure announcement.',fail:'Records remain sealed to your access approach.'},
      {label:'Use magical sight to see through the appearance of the closure enforcement.',mode:'place',skill:'stealth',success:'Through magical sight the truth beneath the closure is revealed: active creature containment.',fail:'The magical cover is too dense. You cannot separate appearance from reality.'}
    ]},

    // ── INQUISITOR ──
    inquisitor_civic:{choices:[
      {label:'Inquisitors demand truth through authority. Use yours on the civic officials responsible for the closure.',mode:'person',skill:'combat',success:'Civic officials yield truth under sustained pressure: the closure hides a creature containment.',fail:'Officials stand firm behind procedure and institutional loyalty.'},
      {label:'Seal the civic records related to the route and examine them under your authority.',mode:'records',skill:'lore',success:'Sealed records reveal the full account of what the closure is protecting against.',fail:'Records are already sealed above your clearance level.'},
      {label:'Conduct a physical investigation of the closure point under inquisitorial authority.',mode:'place',skill:'survival',success:'Your investigation reveals creature sign and containment infrastructure that confirms the real reason.',fail:'The investigation yields nothing that your authority can compel disclosure of.'},
      {label:'Apply truth-compelling ritual to a witness who was present during the closure event.',mode:'ritual',skill:'craft',success:'The ritual extracts the truth: creature escape, emergency closure, enforced institutional silence.',fail:'The ritual fails to compel or the witness has been prepared against it.'}
    ]},
    inquisitor_frontier:{choices:[
      {label:'Frontier inquisitors expose lies through direct confrontation.',mode:'person',skill:'combat',success:'Frontier dwellers confess the truth when confronted with evidence they did not know you had.',fail:'They maintain their story and call your authority into question.'},
      {label:'Expose the frontier deceptions embedded in the official closure record.',mode:'records',skill:'lore',success:'Deceptions are exposed through comparison: the official record contradicts physical evidence.',fail:'Records have been too carefully prepared to contradict on inspection.'},
      {label:'Conduct a frontier truth examination of the closure site and its surroundings.',mode:'place',skill:'survival',success:'Physical examination reveals truths that the official record was designed to obscure.',fail:'The examination yields nothing that the official account does not already explain.'},
      {label:'Apply a frontier truth rite to compel disclosure from a reluctant witness.',mode:'ritual',skill:'craft',success:'The rite extracts confirmation of the creature escape that the closure was ordered to conceal.',fail:'The rite fails to compel in frontier conditions.'}
    ]},
    inquisitor_occult:{choices:[
      {label:'Occult inquiry demands deep truth that ordinary investigation cannot reach.',mode:'ritual',skill:'craft',success:'Deep truth is revealed through occult methods: the binding, the creature, the decision to conceal it.',fail:'Truth remains hidden behind occult protections you cannot breach alone.'},
      {label:'Find the occult inquisitors who investigated the closure before you arrived.',mode:'person',skill:'combat',success:'Inquisitors share deep knowledge of what they found and why they were silenced afterward.',fail:'Inquisitors refuse to disclose their findings.'},
      {label:'Access the inquisition records for the route closure investigation.',mode:'records',skill:'lore',success:'Records reveal what was questioned, what answers were obtained, and what was suppressed.',fail:'Records remain sealed above your clearance level.'},
      {label:'Conduct occult truth-demanding at the binding site to force disclosure.',mode:'place',skill:'survival',success:'The truth is forced to appear: creature, binding, institutional decision to conceal.',fail:'The binding resists occult inquiry and truth hides behind the seal.'}
    ]},

    // ── ELEMENTALIST ──
    elementalist_civic:{choices:[
      {label:'Elemental forces respond to what the city fears. Read elemental tension in the civic buildings.',mode:'person',skill:'lore',success:'Officials share what elemental forces they have been monitoring near the closure point.',fail:'Officials deflect and claim no knowledge of elemental phenomena.'},
      {label:'Access elemental disturbance records from the past ten days.',mode:'records',skill:'craft',success:'Records show elemental containment work was performed at the closure point eight days ago.',fail:'Records are sealed and unavailable to outside inquiry.'},
      {label:'Read the elemental force in the city air near the route approach.',mode:'place',skill:'survival',success:'Elemental imbalance reveals what is being contained behind the closure: something with significant elemental signature.',fail:'No elemental sign appears that distinguishes the closure from ordinary urban conditions.'},
      {label:'Perform an elemental ritual at the civic center to read what the city is protecting.',mode:'ritual',skill:'craft',success:'The ritual reveals elemental truth: the closure contains a creature with strong elemental nature.',fail:'The ritual yields only ambient urban elemental noise.'}
    ]},
    elementalist_frontier:{choices:[
      {label:'Frontier elements are honest and tell what happened without civic filter.',mode:'place',skill:'survival',success:'Frontier elemental reading reveals what happened at the closure point eight days ago: elemental disruption consistent with creature emergence.',fail:'Frontier elements reveal nothing beyond ordinary seasonal variation.'},
      {label:'Find frontier elementalists who worked the closure area.',mode:'person',skill:'persuasion',success:'Elementalists share what they found and why they stopped working the approach.',fail:'Elementalists deflect and will not discuss recent work on the route.'},
      {label:'Check frontier elemental records for disturbance events near the route.',mode:'records',skill:'craft',success:'Records show significant elemental activity at the closure point eight days past, consistent with creature breach.',fail:'Records show only background elemental variance with no notable events.'},
      {label:'Perform a frontier elemental rite at the closure boundary.',mode:'ritual',skill:'craft',success:'The rite grants elemental understanding of what was sealed and what seal is holding it.',fail:'The rite fails to penetrate the containment boundary.'}
    ]},
    elementalist_occult:{choices:[
      {label:'Deep elemental magic operates beneath what ordinary practitioners sense.',mode:'ritual',skill:'craft',success:'Occult elemental practice reveals deep truth: the creature has elemental binding that is slowly failing.',fail:'Deep practice fails to connect with the elemental signature of the closure.'},
      {label:'Find occult elementalists who understand the binding used at the closure.',mode:'person',skill:'lore',success:'Occult elementalists share forbidden knowledge about the elemental seal and why it was applied.',fail:'Occult elementalists refuse to discuss binding work with outside inquiry.'},
      {label:'Access occult elemental archives for records of the binding operation.',mode:'records',skill:'craft',success:'Archives reveal what was bound, the elemental method, and what will happen if the binding fails.',fail:'Archives resist access through standard approaches.'},
      {label:'Attempt elemental communion with the bound presence through the closure wall.',mode:'place',skill:'survival',success:'Communion grants understanding of the creature and the elemental nature of its containment.',fail:'Communion fails. The elemental boundary blocks your reach.'}
    ]},

    // ── ORACLE ──
    oracle_civic:{choices:[
      {label:'Oracles see what civic officials work to keep hidden. Read what civic secrecy is concealing.',mode:'ritual',skill:'craft',success:'Visions reveal civic truth: the closure conceals a creature that civic leadership chose to handle without public knowledge.',fail:'Visions remain unclear and offer nothing specific about the closure.'},
      {label:'Find the civic oracles who consulted on the closure decision.',mode:'person',skill:'persuasion',success:'Oracles share their vision of what was seen and what counsel they gave the decision-makers.',fail:'Civic oracles maintain professional silence about consultations.'},
      {label:'Access oracle records of visions related to the eastern route.',mode:'records',skill:'lore',success:'Records show what was foreseen three weeks before the closure: creature emergence, route disruption.',fail:'Oracle records are sealed and protected against outside access.'},
      {label:'Seek a new vision at the civic oracle site near the route approach.',mode:'place',skill:'lore',success:'A vision is granted that shows the creature, the closure, and the decision to conceal.',fail:'No vision comes at the civic site.'}
    ]},
    oracle_frontier:{choices:[
      {label:'Frontier oracles know what is coming before it arrives. Find them.',mode:'ritual',skill:'craft',success:'A frontier oracle shares what they saw coming: the creature, the route, the closure, the silence.',fail:'The oracle remains silent and will not share what they have seen.'},
      {label:'Find frontier vision keepers who track what the oracle network has seen.',mode:'person',skill:'persuasion',success:'Keepers share the vision record: creature emergence was foreseen two weeks before the closure.',fail:'Keepers deflect and will not share oracle intelligence with outsiders.'},
      {label:'Check frontier vision records for what was seen in the closure zone.',mode:'records',skill:'lore',success:'Records show what was seen and when it was reported. The creature was known before the closure.',fail:'Records are sealed or incomplete.'},
      {label:'Seek a frontier vision at the approach marker near the closure.',mode:'place',skill:'survival',success:'A vision is granted at the marker. The creature and the decision to close are both visible in it.',fail:'No vision appears at the frontier site.'}
    ]},
    oracle_occult:{choices:[
      {label:'Occult visions go deeper than civic oracle practice allows.',mode:'ritual',skill:'craft',success:'A deep vision is granted: the creature, its nature, the binding, and what happens if it fails.',fail:'The vision attempt fails against the occult concealment layered over the closure.'},
      {label:'Find occult oracles who received visions about the closure and its cause.',mode:'person',skill:'persuasion',success:'Occult oracles share forbidden vision of what was bound and why the route closure was the only option.',fail:'Occult oracles refuse to share vision content with outside inquiry.'},
      {label:'Access occult vision archives for records related to the eastern route.',mode:'records',skill:'lore',success:'Archives contain visions that were recorded and sealed: creature breach, binding, institutional decision.',fail:'Archives resist access and the oracle protections hold.'},
      {label:'Seek a deep vision at the occult marker nearest the closure point.',mode:'place',skill:'survival',success:'A deep vision is granted at the marker. The full truth of the closure is visible in it.',fail:'The vision does not come. The concealment is too strong at this location.'}
    ]},

    // ── ROGUE ──
    rogue_civic:{choices:[
      {label:'Rogues know civic secrets because they work the spaces civic order ignores.',mode:'stealth',skill:'stealth',success:'Working the ignored spaces reveals the civic truth: a creature containment disguised as ordinary closure.',fail:'Civic security is thorough and the ignored spaces yield nothing useful.'},
      {label:'Find civic rogue contacts who move through the official record without being seen.',mode:'person',skill:'persuasion',success:'Contacts share what they know: the closure hides something that civic leadership cannot officially acknowledge.',fail:'Contacts deflect and will not share knowledge they consider dangerous.'},
      {label:'Access civic records through unofficial channels.',mode:'records',skill:'craft',success:'Hidden records are accessed. They show the real reason for the closure: creature escape.',fail:'Records resist access through every approach you attempt.'},
      {label:'Run a civic operation to learn what the official channels will not reveal.',mode:'place',skill:'stealth',success:'The operation reveals truth: guards are containing something specific behind the closure.',fail:'The operation fails before producing useful information.'}
    ]},
    rogue_frontier:{choices:[
      {label:'Frontier rogues know passage and what stops it. Find what stopped the route.',mode:'place',skill:'stealth',success:'Working the passage reveals creature sign that explains why the route was closed.',fail:'The passage route reveals nothing beyond the stated closure.'},
      {label:'Find frontier rogues who know the approach and what changed on it.',mode:'person',skill:'persuasion',success:'Frontier rogues share what they know: the route closed because something large claimed it.',fail:'Frontier rogues deflect and will not share passage intelligence.'},
      {label:'Access frontier knowledge through rogue networks that track route conditions.',mode:'records',skill:'craft',success:'Network knowledge reveals what the official record does not: creature activity and forced closure.',fail:'The network knowledge is guarded against outside access.'},
      {label:'Run a frontier rogue operation to scout the closure approach.',mode:'stealth',skill:'stealth',success:'The operation reveals active creature sign and why the approach was sealed.',fail:'The operation fails and produces nothing useful.'}
    ]},
    rogue_occult:{choices:[
      {label:'Occult rogues know the hidden paths that run beneath official routes.',mode:'stealth',skill:'stealth',success:'The hidden paths lead to the truth: something was bound at the closure point using occult methods.',fail:'The hidden paths are blocked. Even the occult routes have been sealed.'},
      {label:'Find occult rogues who know the route and what changed in the occult layer.',mode:'person',skill:'persuasion',success:'Occult rogues teach what they know: the binding, the creature, the institutional decision to conceal.',fail:'Occult rogues refuse contact and will not share occult passage intelligence.'},
      {label:'Access occult rogue secrets about what was done at the closure.',mode:'records',skill:'craft',success:'Secrets are revealed through occult channels: the binding operation, the creature, the silence order.',fail:'Occult secrets remain hidden behind protections you cannot breach.'},
      {label:'Run an occult rogue operation to reach the binding site behind the closure.',mode:'place',skill:'stealth',success:'The operation reaches the binding site and reveals the truth of what is contained there.',fail:'The operation fails against the occult security at the closure point.'}
    ]},

    // ── ASSASSIN ──
    assassin_civic:{choices:[
      {label:'Assassins know what dies and why. Read the civic death record for the closure period.',mode:'records',skill:'lore',success:'Deaths in the civic record reveal the truth: creature victims recorded under false causes.',fail:'Deaths in the civic record have been too carefully prepared to read through.'},
      {label:'Find civic assassins who work the spaces around the closure.',mode:'person',skill:'combat',success:'Assassins share civic knowledge: the closure hides something that required immediate institutional response.',fail:'Civic assassins remain professionally silent.'},
      {label:'Identify civic targets whose behavior changed when the closure was ordered.',mode:'place',skill:'stealth',success:'Target behavior patterns reveal the closure pattern: coordinated suppression of a creature event.',fail:'Target behavior shows no pattern that the closure information explains.'},
      {label:'Use assassin knowledge of institutional weakness to access sealed closure records.',mode:'ritual',skill:'craft',success:'Institutional weakness grants access: the sealed records describe the creature and the closure order.',fail:'Institutional defenses are stronger than the weakness you identified.'}
    ]},
    assassin_frontier:{choices:[
      {label:'Frontier assassins know who survives and why. Find who survived the route event.',mode:'place',skill:'survival',success:'The survivors of the route event are identified. Their behavior tells the story of what they encountered.',fail:'Survivor traces go cold before they lead to useful knowledge.'},
      {label:'Find frontier assassins who worked the approach before the closure.',mode:'person',skill:'combat',success:'Frontier assassins share what they saw on the approach: creature sign, forced withdrawal, closure.',fail:'Frontier assassins deflect and will not discuss operational details.'},
      {label:'Read frontier elimination patterns near the closure for what they reveal.',mode:'records',skill:'lore',success:'Patterns reveal what happened: creature kills recorded as accidents or missing persons.',fail:'Frontier patterns remain unclear and offer no specific detail.'},
      {label:'Use assassin stealth to reach the closure point undetected and read it.',mode:'stealth',skill:'stealth',success:'Reaching the closure point undetected reveals creature sign and active containment operations.',fail:'The closure perimeter is too well-monitored. You cannot reach it without detection.'}
    ]},
    assassin_occult:{choices:[
      {label:'Occult assassins know secret death and what it leaves behind.',mode:'ritual',skill:'craft',success:'Occult death knowledge reveals what died on the route and what the binding was designed to prevent.',fail:'Occult death knowledge fails to connect with the specific event on the route.'},
      {label:'Find occult assassins who know what was bound at the closure.',mode:'person',skill:'combat',success:'Occult assassins share forbidden knowledge: the creature, the binding, the institutional decision.',fail:'Occult assassins refuse contact and disappear before you can establish conversation.'},
      {label:'Access occult death records for the closure period.',mode:'records',skill:'lore',success:'Records show binding death magic applied to contain a creature that broke through the route corridor.',fail:'Occult death records are sealed above your access level.'},
      {label:'Use occult methods to reach the binding site undetected.',mode:'place',skill:'survival',success:'Occult methods carry you to the binding site. You see the creature and the containment holding it.',fail:'The binding site is protected by occult security that your methods cannot bypass.'}
    ]},

    // ── SPELLTHIEF ──
    spellthief_civic:{choices:[
      {label:'Spellthieves steal civic magic because civic magic hides civic truth.',mode:'records',skill:'lore',success:'Stolen records reveal the civic truth behind the closure: creature escape, emergency response, deliberate silence.',fail:'Civic magical records resist theft. The protections are more sophisticated than expected.'},
      {label:'Find civic contacts who move magic through the institutional system.',mode:'person',skill:'stealth',success:'Contacts share what they know: the closure is concealing a creature containment operation.',fail:'Contacts deflect and will not share institutional magic intelligence.'},
      {label:'Steal the enchantments placed on the closure enforcement to read their purpose.',mode:'place',skill:'craft',success:'Stolen enchantments reveal their purpose: containment of a creature, not ordinary route management.',fail:'The enchantments resist theft and alert institutional security.'},
      {label:'Use stolen magic to access sealed truth records about the closure.',mode:'ritual',skill:'craft',success:'Stolen magic carries you into sealed records. The truth about the creature and closure is there.',fail:'The theft fails against the sealing magic. Records remain protected.'}
    ]},
    spellthief_frontier:{choices:[
      {label:'Frontier spellthieves steal the magic that frontier life depends on.',mode:'place',skill:'stealth',success:'Stolen frontier magic reveals what happened: containment wards were placed on the route against a creature.',fail:'Frontier magic resists theft. The source protections hold.'},
      {label:'Find frontier spellthieves who know the approach and what changed magically.',mode:'person',skill:'persuasion',success:'Frontier spellthieves share what they observed: magical closure of the route, creature signs, enforced silence.',fail:'Frontier spellthieves deflect and will not share operational intelligence.'},
      {label:'Access frontier magic knowledge through theft of route ward records.',mode:'records',skill:'lore',success:'Stolen ward records reveal the sequence: creature emergence, emergency warding, closure announcement.',fail:'Ward records are protected against theft by the warding system itself.'},
      {label:'Steal the closure ward magic and use it to enter the sealed area.',mode:'ritual',skill:'craft',success:'The stolen ward magic carries you past the closure. You see what the ward was protecting against.',fail:'The theft fails. The ward identifies the theft attempt and seals harder.'}
    ]},
    spellthief_occult:{choices:[
      {label:'Occult spellthieves steal deep magic that ordinary thieves cannot reach.',mode:'ritual',skill:'craft',success:'Deep magic is stolen and understood: the binding operation, the creature, the institutional decision to conceal.',fail:'Deep magic resists theft with occult protections that exceed your current reach.'},
      {label:'Find occult spellthieves who know what was bound at the closure.',mode:'person',skill:'stealth',success:'Occult spellthieves teach what they know about deep theft: the binding is accessible if approached correctly.',fail:'Occult spellthieves refuse to share methods that would expose their operations.'},
      {label:'Access occult magic theft archives for records of what was done at the closure.',mode:'records',skill:'lore',success:'Occult archives are accessed through theft. They contain the binding operation record and the creature identity.',fail:'Occult archives resist access. The theft is detected before it completes.'},
      {label:'Steal occult magic from the binding site itself to understand the containment.',mode:'place',skill:'craft',success:'Deep magic is stolen from the binding site. You understand the creature and the containment from inside.',fail:'The binding site protections are too strong. The theft attempt fails and alerts the monitors.'}
    ]},

    // ── SCOUT ──
    scout_civic:{choices:[
      {label:'Scouts know civic terrain because they have mapped every approach.',mode:'place',skill:'survival',success:'Civic terrain reading reveals the closure pattern: deliberate blockage of a specific creature movement corridor.',fail:'The civic terrain reveals nothing beyond standard route management.'},
      {label:'Find civic scouts who mapped the approach before the closure.',mode:'person',skill:'persuasion',success:'Civic scouts share their knowledge: the mapping showed what was coming and the closure was the response.',fail:'Civic scouts deflect and will not share mapping intelligence.'},
      {label:'Access civic scout records of the contested approach.',mode:'records',skill:'lore',success:'Scout records show the approach in detail and what changed eight days ago to trigger the closure.',fail:'Civic scout records are sealed and unavailable.'},
      {label:'Run a scout operation on the civic approaches to the closure point.',mode:'stealth',skill:'stealth',success:'The operation reveals the full picture: creature containment, active enforcement, deliberate silence.',fail:'The scout operation produces nothing that the official closure story does not already explain.'}
    ]},
    scout_frontier:{choices:[
      {label:'Frontier scouts know passage because they have moved through it under every condition.',mode:'place',skill:'survival',success:'Frontier passage reading reveals the truth: the closure point shows creature sign and active containment.',fail:'The frontier passage reveals only the stated closure. Nothing beyond it is accessible.'},
      {label:'Find frontier scouts who worked the approach before the closure.',mode:'person',skill:'persuasion',success:'Frontier scouts share what they saw and why they withdrew: creature activity, forced closure, silence order.',fail:'Frontier scouts deflect and will not discuss route intelligence with outside inquiry.'},
      {label:'Access frontier scout records of passage conditions in the closure zone.',mode:'records',skill:'lore',success:'Scout records show conditions in detail: creature emergence, forced withdrawal, emergency closure.',fail:'Frontier scout records are incomplete or sealed for operational security.'},
      {label:'Run a frontier scout operation to reach the closure point and beyond.',mode:'stealth',skill:'stealth',success:'The operation reaches beyond the closure. You see creature sign and understand why the route was sealed.',fail:'The operation fails. The closure perimeter is better monitored than your approach accounted for.'}
    ]},
    scout_occult:{choices:[
      {label:'Occult scouts know hidden paths that exist beneath the visible route network.',mode:'place',skill:'survival',success:'Hidden paths lead to the truth behind the closure: a binding site and a contained creature.',fail:'The hidden paths are blocked. Even the occult routes are sealed against passage.'},
      {label:'Find occult scouts who know the hidden approach to the closure.',mode:'person',skill:'persuasion',success:'Occult scouts teach the hidden knowledge: the binding operation, the route it closed, the creature it contains.',fail:'Occult scouts refuse contact and will not share hidden path intelligence.'},
      {label:'Access occult scout archives for the hidden approach records.',mode:'records',skill:'lore',success:'Archives reveal hidden routes and what they exposed: the binding, the creature, the closure rationale.',fail:'Occult scout archives resist access. The hidden approach records are sealed.'},
      {label:'Run an occult scout operation using hidden paths to reach the closure truth.',mode:'stealth',skill:'stealth',success:'The hidden operation succeeds. You reach the binding site and understand the full picture.',fail:'The occult operation fails. The closure concealment extends to the hidden paths as well.'}
    ]},

    // ── THIEF ──
    thief_civic:{choices:[
      {label:'The Shelkopolis freight manifest office records permit mismatches. Work the overnight permit clerk for the closure period.',mode:'records',skill:'craft',success:'Permit records show a cluster of freight misdirection orders issued the night before the route closed. Someone pre-positioned goods away from the approach.',fail:'The permit clerk has been replaced. The new clerk has no knowledge of the closure period records.'},
      {label:'Loading dock watch-change happens at the fourth bell. Find who was at the dock that night.',mode:'stealth',skill:'stealth',success:'The dock worker saw freight pulled from the convoy lane approach with no explanation. They assumed contraband but the scale was wrong.',fail:'The loading dock is now under increased observation. The watch-change gap has been closed.'},
      {label:'Patrol gap mapping on the convoy lane is your professional skill. Read the current gap pattern for what changed.',mode:'place',skill:'survival',success:'The patrol gaps have been deliberately eliminated in the past eight days. Someone is paying to close the spaces that thieves use.',fail:'Patrol gaps show normal variation with no significant change since the closure.'},
      {label:'Find the overnight permit clerk who processed freight diversions during the closure week.',mode:'person',skill:'persuasion',success:'The clerk describes a freight order that came through with emergency containment route codes they had never seen before.',fail:'The clerk was transferred the day after the closure. Their current location is unknown.'}
    ]},
    thief_frontier:{choices:[
      {label:'Guild freight contract addendums change when routes close. Pull the Guildheart Hub addendum records from the closure period.',mode:'records',skill:'craft',success:'Addendum records show emergency contract modifications that rerouted all guild freight away from the contested approach. Something specific was being avoided.',fail:'The Guildheart Hub addendum records from that period are locked under administrative review.'},
      {label:'The domeway sanction notice clerk processes all formal route closure orders. Find them and read the sanction record.',mode:'person',skill:'persuasion',success:'The clerk describes a sanction notice category they had never processed before: creature containment emergency. It bypassed normal administrative review.',fail:'The domeway sanction notice clerk will not discuss specific closure orders with outside inquiry.'},
      {label:'Domeway floor chalk trace marks where freight actually moved versus where it was supposed to move.',mode:'place',skill:'survival',success:'Floor chalk shows freight was deliberately diverted away from the contested approach four days before the official closure announcement.',fail:'The domeway floor has been cleaned and redrawn since the closure. The historical pattern is gone.'},
      {label:'Sanction board runners know every route adjustment before the official announcement. Find the runner who worked the closure week.',mode:'stealth',skill:'stealth',success:'The runner describes a sanction that came through in the middle of the night with unusual authority signatures. They never saw anything like it before.',fail:'The runner from the closure week is no longer working at the domeway. No forwarding information is available.'}
    ]},
    thief_occult:{choices:[
      {label:'The Shirshal broken-seal archive holds records of every sealing operation in the region. Work the archive for the closure period.',mode:'records',skill:'craft',success:'The archive shows a sealing operation initiated eight days ago at the contested approach. The seal category is creature containment.',fail:'The Shirshal archive requires a guild witness to access. You cannot reach the closure period records alone.'},
      {label:'Witness handlers at the guild road posting house know what passed through and what was stopped. Find one from the closure week.',mode:'person',skill:'persuasion',success:'A handler describes a witness report they were told to suppress: a creature sighting on the guild road approach that triggered the closure.',fail:'The witness handlers from the closure week have been reassigned to a different posting house.'},
      {label:'The side hall clerks at the Shirshal guild office process exception paperwork that never reaches the main record.',mode:'stealth',skill:'stealth',success:'Exception paperwork from the closure week describes a creature breach that required emergency sealing of the approach.',fail:'The side hall is monitored. You cannot access the exception records without being observed.'},
      {label:'Read the arcane seal impression on the closure barrier itself.',mode:'place',skill:'craft',success:'The seal impression is professional work: creature containment class, applied under emergency authority, intended to hold for thirty days.',fail:'The seal impression has been deliberately obscured. You can read that a seal is present but not its classification or authority.'}
    ]},

    // ── TRICKSTER ──
    trickster_civic:{choices:[
      {label:'Tricksters expose civic tricks by running better ones. Set a counter-trick and watch who responds.',mode:'person',skill:'persuasion',success:'The counter-trick flushes the real players: officials who know the truth reveal themselves through their response.',fail:'The counter-trick is seen through and produces only defensive silence.'},
      {label:'Find civic tricksters who run the same spaces you work.',mode:'stealth',skill:'stealth',success:'Fellow tricksters share what they know: the closure is a civic trick concealing a creature event.',fail:'Civic tricksters deflect and will not share professional intelligence.'},
      {label:'Read civic trick patterns in the records to find what the trick was designed to hide.',mode:'records',skill:'lore',success:'Record patterns reveal civic machinations: coordinated concealment of a creature escape.',fail:'The trick patterns in the records are too polished to read through.'},
      {label:'Use trickster insight to see what the civic story is designed to make you miss.',mode:'ritual',skill:'craft',success:'Trickster insight reveals the misdirection: the official closure story points away from the real reason.',fail:'The insight ritual fails to produce anything the official story does not already contain.'}
    ]},
    trickster_frontier:{choices:[
      {label:'Frontier tricks are honest lies: they say one thing to protect another.',mode:'place',skill:'survival',success:'The honest lie of the closure reveals itself: the real protection is against a creature the frontier communities cannot handle.',fail:'The frontier closure holds its story and reveals nothing additional.'},
      {label:'Find frontier tricksters who know the real story behind the closure.',mode:'person',skill:'persuasion',success:'Frontier tricksters share the real story: creature escape, community decision to maintain silence.',fail:'Frontier tricksters deflect with better tricks than you brought.'},
      {label:'Access frontier knowledge through trickster networks that track the truth beneath official stories.',mode:'records',skill:'lore',success:'Trickster network knowledge reveals the real closure reason and why the official story was chosen.',fail:'Trickster network knowledge is guarded and your access credentials are not accepted.'},
      {label:'Use frontier trickery to appear as someone the closure enforcers will talk to.',mode:'stealth',skill:'stealth',success:'The trick works. The enforcers talk. The truth of the creature containment emerges.',fail:'The trick fails. Frontier enforcers are more perceptive than the trick accounted for.'}
    ]},
    trickster_occult:{choices:[
      {label:'Occult tricks hide deep truth beneath multiple layers. Find the real layer.',mode:'ritual',skill:'craft',success:'The deepest layer reveals itself: the creature, the binding, the institutional decision wrapped in official language.',fail:'The occult trick layers hold. You cannot reach the real layer beneath them.'},
      {label:'Find occult tricksters who know what the closure is really concealing.',mode:'person',skill:'persuasion',success:'Occult tricksters share the real concealment: the closure is a trick layered over a binding layered over a creature.',fail:'Occult tricksters refuse to disclose the structure of the trick to outside inquiry.'},
      {label:'Access occult trick archives that record the methods used to construct the closure concealment.',mode:'records',skill:'lore',success:'Archives reveal the trick in detail: how the closure was presented, what it actually concealed, why.',fail:'Occult trick archives resist outside access. The concealment protects itself.'},
      {label:'Run an occult counter-trick to expose what the closure trick is hiding.',mode:'place',skill:'survival',success:'The counter-trick works. The closure concealment reveals the creature and the binding beneath it.',fail:'The counter-trick fails. The closure trick is more sophisticated than your counter accounted for.'}
    ]},

    // ── BEASTMASTER ──
    beastmaster_civic:{choices:[
      {label:'Beasts sense what civic institutions work to conceal. Read what your animals are sensing near the closure.',mode:'place',skill:'survival',success:'Your animals sense something large and contained behind the closure. Their behavior confirms a creature presence.',fail:'Your animals sense nothing unusual at the civic closure point.'},
      {label:'Find those in the city who work with animals and would know if something escaped.',mode:'person',skill:'persuasion',success:'Animal handlers describe unusual behavior from their charges eight days ago: fear response, flight instinct, consistent direction.',fail:'Animal handlers will not share professional knowledge with outside inquiry.'},
      {label:'Read civic records of animal complaints and incidents near the closure.',mode:'records',skill:'lore',success:'Civic animal complaint records show a spike eight days ago from the closure zone: consistent with large predator presence.',fail:'Animal complaint records show normal variation and no significant spike.'},
      {label:'Perform animal communion to understand what the local animals know about the closure.',mode:'ritual',skill:'craft',success:'Communion grants understanding: local animals know there is a large predator contained behind the closure and they are avoiding the zone.',fail:'Communion fails to connect with local animal networks in the civic environment.'}
    ]},
    beastmaster_frontier:{choices:[
      {label:'Frontier beasts know passage routes and what has changed on them.',mode:'place',skill:'survival',success:'Frontier animal behavior reveals the truth: large predator activity has claimed the contested approach.',fail:'Frontier animals show normal behavior and reveal nothing unusual about the closure zone.'},
      {label:'Find frontier animal handlers who worked the approach before the closure.',mode:'person',skill:'persuasion',success:'Frontier handlers share what their animals told them: something large moved through the approach and claimed it.',fail:'Frontier handlers deflect and will not share animal intelligence with outside inquiry.'},
      {label:'Access frontier records of animal activity and predator incidents near the route.',mode:'records',skill:'lore',success:'Records show unusual predator activity in the closure zone beginning twelve days before the official announcement.',fail:'Frontier animal records are incomplete and show no clear pattern.'},
      {label:'Perform frontier beast companionship ritual to understand what the local animals know.',mode:'stealth',skill:'stealth',success:'Frontier animal communion reveals the creature presence and why the route animals have abandoned the approach.',fail:'Frontier beast communion fails to connect with local animal knowledge.'}
    ]},
    beastmaster_occult:{choices:[
      {label:'Occult beasts know forbidden things about what is bound and what is loose.',mode:'ritual',skill:'craft',success:'Occult beast wisdom reveals the forbidden truth: the creature behind the closure has a name and a nature that the institutions do not want known.',fail:'Occult beast wisdom remains hidden. The bound creature is blocking the animal knowledge network.'},
      {label:'Find occult beast handlers who know what creature is behind the closure.',mode:'person',skill:'persuasion',success:'Occult handlers teach what they know: the creature identity, its nature, and why the binding was applied.',fail:'Occult beast handlers refuse contact and will not discuss the bound creature.'},
      {label:'Access occult beast archives for records of the creature behind the closure.',mode:'records',skill:'lore',success:'Archives reveal the creature identity, its history in the region, and why the route closure was the only containment option.',fail:'Occult beast archives resist access. The binding protects the records as well as the creature.'},
      {label:'Perform occult beast communion at the closure boundary to reach the bound creature.',mode:'place',skill:'survival',success:'Occult communion at the boundary connects with the bound creature. You understand what it is and what it wants.',fail:'The binding blocks communion. The creature cannot be reached through the closure boundary.'}
    ]},

    // ── HEALER ──
    healer_civic:{choices:[
      {label:'Shelkopolis medical records track unusual injury patterns. Check the intake logs for the past ten days.',mode:'records',skill:'lore',success:'Intake logs show a cluster of creature-wound injuries from the eastern approach, recorded under vague trauma categories.',fail:'Medical intake logs require institutional authorization you do not have.'},
      {label:'The Shelkopolis civic healer guild knows which practitioners were called to the closure zone. Find one.',mode:'person',skill:'persuasion',success:'A healer admits they were brought to the closure zone to treat creature injuries and were told not to discuss the cases.',fail:'The healer guild maintains patient confidentiality and will not discuss specific calls.'},
      {label:'Read the supply consumption at the nearest aid station for the closure period.',mode:'place',skill:'survival',success:'Aid station supply consumption spiked eight days ago in categories consistent with large creature trauma wounds.',fail:'Aid station supplies show normal variation with no unusual consumption.'},
      {label:'Offer to assist with any injured at the closure zone and use that access to learn what happened.',mode:'ritual',skill:'craft',success:'Your offer is accepted. In the aid tent you piece together the creature injuries and understand what caused them.',fail:'There are no injured to treat at the closure zone. Your offer goes unaccepted.'}
    ]},
    healer_frontier:{choices:[
      {label:'Panim Haven pilgrimage healers record every injury that comes through their stations. Access those records.',mode:'records',skill:'lore',success:'Pilgrimage records show creature injuries arriving from the contested route eight days ago, before the official closure announcement.',fail:'Panim healing records require shrine authorization to access.'},
      {label:'A frontier healer who works the route between Panim Haven and the closure zone will know what has changed.',mode:'person',skill:'persuasion',success:'The frontier healer describes creature injury patterns they began seeing a week before the closure. They stopped reporting to avoid triggering panic.',fail:'The frontier healer maintains patient confidentiality and will not share case details.'},
      {label:'Read the memorial road aid stations for unusual injury clusters in the past two weeks.',mode:'place',skill:'survival',success:'Aid station records show creature wound intake clustering near the closure zone in the days before the announcement.',fail:'Memorial road aid stations show no unusual injury patterns.'},
      {label:'Perform a healing survey of the closure zone perimeter community to document what injuries have appeared.',mode:'ritual',skill:'craft',success:'The survey reveals a community managing hidden creature injuries from residents who were on the route.',fail:'The community is healthy and the survey reveals no unusual injury burden.'}
    ]},
    healer_occult:{choices:[
      {label:'Mimolot Academy maintains records of ritual injuries and unusual wound presentations. Access that archive.',mode:'records',skill:'lore',success:'The ritual injury archive shows wound presentations consistent with creature contact from the closure zone eight days ago.',fail:'The ritual injury archive requires scholarium clearance to access.'},
      {label:'A Mimolot healer with access to the restricted wards may know what was brought in from the closure event.',mode:'person',skill:'persuasion',success:'The healer admits three patients with creature injuries were brought to the restricted ward and held under institutional secrecy.',fail:'The healer maintains institutional confidentiality and will not discuss restricted ward cases.'},
      {label:'Read the restricted ward supply consumption at the academy for the closure period.',mode:'place',skill:'craft',success:'Restricted ward consumption shows emergency creature-wound treatment supplies were drawn in significant quantity eight days ago.',fail:'Restricted ward supplies show no unusual consumption pattern.'},
      {label:'Offer specialized healing consultation for the closure zone event and use the access to understand what happened.',mode:'ritual',skill:'craft',success:'Your offer of consultation is accepted. In the restricted ward you see the creature injuries and understand the closure event.',fail:'The institution declines your offer. The restricted ward cases are handled internally.'}
    ]},

    // ── ARTIFICER ──
    artificer_civic:{choices:[
      {label:'Shelkopolis craft permits track every tool and mechanism deployed in the city. Check the permit log for the closure zone.',mode:'records',skill:'craft',success:'Permit records show emergency mechanism deployment to the closure zone: containment tools, barrier frames, creature-scale restraints.',fail:'Craft permit records require guild authorization to access.'},
      {label:'The artificer guild knows which practitioners were contracted for the closure zone. Find one.',mode:'person',skill:'persuasion',success:'An artificer admits they built emergency containment mechanisms for something large at the closure zone and were told to keep the contract private.',fail:'The artificer guild maintains contract confidentiality and will not discuss specific deployments.'},
      {label:'Read the material consumption at the nearest artificer workshop for the closure period.',mode:'place',skill:'survival',success:'Workshop consumption spiked eight days ago in materials consistent with large-scale creature containment construction.',fail:'Workshop materials show normal consumption with no unusual pattern.'},
      {label:'Design and offer a mechanism solution for the closure zone and use that access to understand what is being contained.',mode:'ritual',skill:'craft',success:'Your design proposal is accepted. In the deployment meeting you learn what the mechanism is meant to contain.',fail:'Your proposal is declined. The closure zone mechanism needs have already been met.'}
    ]},
    artificer_frontier:{choices:[
      {label:'Soreheim trade registry tracks all mechanisms and tools deployed on frontier routes. Check the deployment log.',mode:'records',skill:'craft',success:'Deployment logs show emergency tool orders sent to the closure zone: creature-scale barrier mechanisms, containment frames.',fail:'Frontier deployment records require trade registry authorization to access.'},
      {label:'A frontier artificer who works the route infrastructure knows what was built near the closure.',mode:'person',skill:'persuasion',success:'The frontier artificer describes emergency construction orders they received for the closure zone. Large-scale. Creature-containment class.',fail:'The frontier artificer maintains contract confidentiality and will not share deployment details.'},
      {label:'Read the material supply changes to frontier route workshops in the closure period.',mode:'place',skill:'survival',success:'Workshop supply changes show emergency reordering of creature-containment class materials eight days past.',fail:'Frontier workshop supplies show normal variation with no emergency pattern.'},
      {label:'Offer technical consultation for frontier mechanism needs and use the access to understand the closure.',mode:'ritual',skill:'craft',success:'Your offer is accepted. In the technical meeting you learn what mechanisms are needed and what they are meant to contain.',fail:'Your offer is declined. The frontier mechanism needs have already been met by others.'}
    ]},
    artificer_occult:{choices:[
      {label:'Guildheart Hub maintains records of every mechanism contract issued for arcane work. Access the occult mechanism archive.',mode:'records',skill:'craft',success:'The archive shows emergency arcane mechanism contracts issued eight days ago for the closure zone: binding frameworks, arcane containment structures.',fail:'The occult mechanism archive requires guild clearance to access.'},
      {label:'A Guildheart artificer who works arcane mechanisms knows what was built for the closure event.',mode:'person',skill:'persuasion',success:'The artificer describes emergency arcane containment mechanisms they built for the closure zone. The client required secrecy.',fail:'The artificer maintains contract confidentiality and will not share client details.'},
      {label:'Read the arcane material consumption at the Guildheart workshop for the closure period.',mode:'place',skill:'craft',success:'Workshop consumption shows emergency arcane material draws eight days ago consistent with large-scale creature containment construction.',fail:'Guildheart workshop materials show normal consumption with no emergency pattern.'},
      {label:'Offer arcane mechanism design for the closure zone and use the access to understand what is being contained.',mode:'ritual',skill:'craft',success:'Your design offer is accepted. In the meeting you learn the arcane containment requirements and what they are holding.',fail:'Your offer is declined. The arcane mechanism needs for the closure are already filled.'}
    ]},

    // ── ENGINEER ──
    engineer_civic:{choices:[
      {label:'Soreheim construction records track every major infrastructure project in the region. Check the project log for the closure zone.',mode:'records',skill:'craft',success:'Project records show emergency infrastructure deployment to the closure zone eight days ago: barrier construction, creature-scale blocking structures.',fail:'Construction project records require civic engineering authorization to access.'},
      {label:'The Soreheim engineering corps knows who was deployed to the closure zone. Find an engineer who was there.',mode:'person',skill:'persuasion',success:'An engineer admits they built emergency barrier structures at the closure zone for a creature containment operation.',fail:'The engineering corps maintains operational confidentiality and will not discuss specific deployments.'},
      {label:'Read the material and equipment movement to the closure zone in the past ten days.',mode:'place',skill:'survival',success:'Equipment movement records show large-scale barrier materials sent to the closure zone. The scale is consistent with creature containment.',fail:'Equipment movement shows normal infrastructure maintenance with no unusual deployment.'},
      {label:'Offer engineering assessment for the closure zone infrastructure and use that access to understand what was built.',mode:'ritual',skill:'craft',success:'Your assessment offer is accepted. At the closure zone you see the barrier engineering and understand what it was built to contain.',fail:'Your offer is declined. The closure zone engineering has already been assessed.'}
    ]},
    engineer_frontier:{choices:[
      {label:'Aurora Crown Commune infrastructure logs track all major construction along the frontier routes.',mode:'records',skill:'craft',success:'Infrastructure logs show emergency construction orders for the closure zone eight days ago. Barrier class. Creature containment specifications.',fail:'Frontier infrastructure logs require Aurora engineering authorization to access.'},
      {label:'A frontier engineer who works the route infrastructure knows what was built near the closure.',mode:'person',skill:'persuasion',success:'The frontier engineer describes emergency barrier construction they were contracted for at the closure zone. Large scale. Unusual specifications.',fail:'The frontier engineer maintains contract confidentiality and will not discuss the specific deployment.'},
      {label:'Read the construction material movement along the frontier routes in the closure period.',mode:'place',skill:'survival',success:'Material movement shows emergency barrier supplies sent toward the closure zone four days before the official announcement.',fail:'Material movement shows normal frontier infrastructure maintenance with no unusual pattern.'},
      {label:'Offer engineering expertise for the frontier closure zone and use that access to understand the construction.',mode:'ritual',skill:'craft',success:'Your offer is accepted. At the closure zone you see the frontier barrier engineering and what scale of creature it was built for.',fail:'Your offer is declined. The frontier closure zone engineering needs are already met.'}
    ]},
    engineer_occult:{choices:[
      {label:'Guildheart Hub tracks all arcane engineering projects deployed to route infrastructure. Access the arcane project archive.',mode:'records',skill:'craft',success:'The archive shows emergency arcane engineering deployment to the closure zone eight days ago: binding infrastructure, arcane barrier frameworks at creature containment scale.',fail:'The arcane engineering archive requires Guildheart authorization to access.'},
      {label:'A Guildheart engineer who works arcane infrastructure knows what was deployed at the closure.',mode:'person',skill:'persuasion',success:'The engineer describes emergency arcane barrier construction they completed at the closure zone. The client required complete secrecy about the specifications.',fail:'The engineer maintains contract confidentiality and will not discuss client deployments.'},
      {label:'Read the arcane engineering material movement to the closure zone in the closure period.',mode:'place',skill:'craft',success:'Material movement records show emergency arcane barrier supplies sent to the closure zone. The scale and specifications indicate creature containment work.',fail:'Arcane engineering material movement shows no unusual pattern at the closure zone.'},
      {label:'Offer arcane engineering assessment for the closure zone and use that access to understand what was built.',mode:'ritual',skill:'craft',success:'Your offer is accepted. At the closure zone you see the arcane barrier engineering and understand what containment requirements it was built to meet.',fail:'Your offer is declined. The closure zone arcane engineering has already been assessed internally.'}
    ]},

    // ── TACTICIAN ──
    tactician_civic:{choices:[
      {label:'Tactical records of route security decisions are filed at the Shelkopolis garrison command. Access the tactical log.',mode:'records',skill:'lore',success:'Tactical logs show an emergency route closure order issued eight days ago at command level, classified as creature containment protocol.',fail:'Tactical logs require garrison command authorization to access.'},
      {label:'Find the garrison commander who issued the closure tactical order.',mode:'person',skill:'persuasion',success:'The commander admits the closure was a tactical decision made in response to a creature escape from the eastern approach.',fail:'The commander maintains operational confidentiality and will not discuss specific tactical decisions.'},
      {label:'Read the tactical deployment at the closure zone from a command perspective.',mode:'place',skill:'survival',success:'Tactical reading of the deployment reveals a creature containment operation: positioned to block, not to patrol.',fail:'Tactical reading of the deployment reveals standard route security with no containment signature.'},
      {label:'Model the tactical decision that led to the closure and identify what threat profile required it.',mode:'ritual',skill:'craft',success:'Your tactical model shows the closure was ordered against a mobile creature threat of significant size.',fail:'Your tactical model cannot determine the threat profile from available information.'}
    ]},
    tactician_frontier:{choices:[
      {label:'Panim Haven frontier tactical records track all security decisions affecting pilgrimage routes.',mode:'records',skill:'lore',success:'Frontier tactical records show an emergency closure decision eight days ago based on creature threat assessment.',fail:'Frontier tactical records require Panim Haven security authorization to access.'},
      {label:'A frontier tactical commander who worked the closure decision knows what the threat assessment showed.',mode:'person',skill:'persuasion',success:'The frontier commander shares the threat assessment that triggered the closure: large creature, mobile, route-claiming behavior.',fail:'The frontier commander maintains operational confidentiality about specific threat assessments.'},
      {label:'Read the frontier tactical deployment at the closure zone.',mode:'place',skill:'survival',success:'Frontier tactical reading shows the deployment is designed for creature containment, not standard route security.',fail:'The frontier deployment shows standard security posture with no creature containment signature.'},
      {label:'Model the frontier tactical decision that led to the closure and identify what threat required it.',mode:'ritual',skill:'craft',success:'Your frontier tactical model shows the closure was ordered in response to a creature that had claimed the route as territory.',fail:'Your tactical model cannot identify the specific threat that required the closure decision.'}
    ]},
    tactician_occult:{choices:[
      {label:'Mimolot Academy tactical records include arcane threat assessments. Access the tactical archive.',mode:'records',skill:'lore',success:'Tactical archives show an arcane threat assessment eight days ago that classified the closure zone creature as requiring institutional response.',fail:'Mimolot tactical archives require academy authorization to access.'},
      {label:'A Mimolot tactician who worked the closure assessment knows what the arcane threat profile showed.',mode:'person',skill:'persuasion',success:'The academy tactician shares the arcane threat profile: the creature has magic-resistant properties that make ordinary containment insufficient.',fail:'The academy tactician maintains institutional confidentiality about specific threat assessments.'},
      {label:'Read the arcane tactical deployment at the closure zone.',mode:'place',skill:'craft',success:'Arcane tactical reading of the deployment shows specialized containment designed for a magic-resistant creature.',fail:'The arcane deployment reads as standard security with no specialized creature containment signature.'},
      {label:'Model the arcane tactical decision that led to the closure and identify what threat required it.',mode:'ritual',skill:'craft',success:'Your arcane tactical model shows the closure was ordered against a creature with magical properties that required specialized institutional response.',fail:'Your arcane tactical model cannot identify the specific threat from available information.'}
    ]},

    // ── ALCHEMIST ──
    alchemist_civic:{choices:[
      {label:'Shelkopolis alchemical supply records track every reagent purchase in the city. Check for emergency orders near the closure.',mode:'records',skill:'craft',success:'Supply records show emergency reagent orders eight days ago: creature sedative class, barrier-reinforcement compounds, containment solvents.',fail:'Alchemical supply records require guild authorization to access.'},
      {label:'The Shelkopolis alchemist guild knows who was contracted for the closure zone. Find one.',mode:'person',skill:'persuasion',success:'An alchemist admits they prepared emergency creature-containment compounds for the closure zone and were told to keep the contract private.',fail:'The alchemist guild maintains contract confidentiality and will not discuss specific preparations.'},
      {label:'Read the reagent consumption at the nearest alchemical workshop for the closure period.',mode:'place',skill:'survival',success:'Workshop consumption spiked eight days ago in creature-containment reagent categories: sedatives, binding compounds, barrier solvents.',fail:'Workshop reagent consumption shows normal variation with no unusual pattern.'},
      {label:'Offer alchemical consultation for the closure zone and use that access to understand what is being contained.',mode:'ritual',skill:'craft',success:'Your consultation offer is accepted. In the preparation meeting you learn what compounds are needed and what creature requires them.',fail:'Your offer is declined. The closure zone alchemical needs are already met.'}
    ]},
    alchemist_frontier:{choices:[
      {label:'Mimolot Academy alchemical records track all reagent preparation for field operations. Access the field operation archive.',mode:'records',skill:'craft',success:'Field operation records show emergency reagent preparation for the closure zone eight days ago: creature containment class, significant quantity.',fail:'Mimolot alchemical field records require academy authorization to access.'},
      {label:'A Mimolot alchemist who works frontier field operations knows what was prepared for the closure event.',mode:'person',skill:'persuasion',success:'The academy alchemist describes emergency creature-containment reagent preparation they completed for the closure zone. Unusual specifications, unusual scale.',fail:'The alchemist maintains institutional confidentiality and will not discuss specific field preparation.'},
      {label:'Read the reagent movement from Mimolot to the closure zone in the closure period.',mode:'place',skill:'survival',success:'Reagent movement records show emergency creature-containment compound transport to the closure zone four days before the official announcement.',fail:'Reagent movement shows normal field supply patterns with no emergency signature.'},
      {label:'Offer frontier alchemical expertise for the closure zone and use that access to understand what was prepared.',mode:'ritual',skill:'craft',success:'Your offer is accepted. In the preparation briefing you learn what creature requires the containment compounds and why.',fail:'Your offer is declined. The frontier closure zone alchemical needs are already filled.'}
    ]},
    alchemist_occult:{choices:[
      {label:'Guildheart Hub arcane alchemical records track all occult reagent preparation. Access the occult preparation archive.',mode:'records',skill:'craft',success:'Occult preparation records show emergency arcane reagent orders eight days ago: binding-class compounds, creature-specific arcane sedatives, occult containment solvents.',fail:'Guildheart occult alchemical records require hub authorization to access.'},
      {label:'A Guildheart alchemist who works occult reagent preparation knows what was made for the closure event.',mode:'person',skill:'persuasion',success:'The occult alchemist describes emergency arcane creature-containment compounds they prepared for the closure zone. The creature required specialized occult binding reagents.',fail:'The occult alchemist maintains client confidentiality and will not discuss specific preparations.'},
      {label:'Read the occult reagent consumption at the Guildheart alchemical workshop for the closure period.',mode:'place',skill:'craft',success:'Workshop consumption shows emergency draws of arcane creature-containment reagent categories eight days ago. The scale and specificity indicate a large, magically active creature.',fail:'Guildheart workshop consumption shows normal occult reagent usage with no emergency pattern.'},
      {label:'Offer occult alchemical expertise for the closure zone and use that access to understand what was prepared.',mode:'ritual',skill:'craft',success:'Your offer is accepted. In the preparation consultation you learn what arcane creature requires the containment compounds and what the binding is designed to prevent.',fail:'Your offer is declined. The occult closure zone alchemical preparations are complete and confidential.'}
    ]},

    // ── SAINT ──
    saint_civic:{choices:[
      {label:'A saint who walks the civic memorial circuit has access to community grief patterns. Read them.',mode:'records',skill:'lore',success:'Memorial grief patterns show a cluster of recent mourning requests from families connected to the contested route. Something happened to people they knew.',fail:'Memorial records are managed by shrine staff and are not available to outside inquiry.'},
      {label:'The Shelkopolis community knows a saint when they see one. Sit with the grieving families and listen.',mode:'person',skill:'persuasion',success:'Grieving families describe relatives who were on the contested route when something happened. The families were told to stay quiet.',fail:'Grieving families are too afraid of institutional consequences to speak with a stranger.'},
      {label:'Sacred presence in civic spaces reveals what ordinary authority cannot. Walk the closure zone perimeter.',mode:'place',skill:'survival',success:'Your sacred presence in the civic space opens what fear closes. A closure guard tells you quietly what they are containing.',fail:'Sacred presence in the civic space produces only uncomfortable silence.'},
      {label:'Offer spiritual witness to the community affected by the closure and receive their truth in return.',mode:'ritual',skill:'craft',success:'The community offers their truth in exchange for spiritual witness: a creature event, institutional silence, unprocessed grief.',fail:'The community is too afraid to speak even in the context of spiritual witness.'}
    ]},
    saint_frontier:{choices:[
      {label:'Panim Haven pilgrimage community keeps their own record of what happens to pilgrims on the routes.',mode:'records',skill:'lore',success:'Community pilgrimage records show pilgrims who left for the contested route eight days ago and have not been heard from since.',fail:'Pilgrimage community records are kept by shrine families and are not available to outside inquiry.'},
      {label:'A Panim Haven shrine family knows every pilgrim who passes through. Find them and ask what happened.',mode:'person',skill:'persuasion',success:'A shrine family describes pilgrims they sent prayers with who entered the contested route and were never heard from. They suspect a creature event.',fail:'Shrine families will not speak of missing pilgrims without institutional authorization.'},
      {label:'Sacred community witness on the memorial road reveals what grief is being managed.',mode:'place',skill:'survival',success:'Community grief on the memorial road is fresh and specific: a creature event, suppressed reporting, families holding their mourning in private.',fail:'The memorial road community shows ordinary grief patterns with no unusual clustering.'},
      {label:'Offer spiritual witness to the frontier community affected by the closure event.',mode:'ritual',skill:'craft',success:'The frontier community opens. They describe the creature event, the closure, the institutional instruction to remain silent.',fail:'The frontier community is too afraid of official consequences to speak even in a spiritual context.'}
    ]},
    saint_occult:{choices:[
      {label:'Guildheart Hub institutional records track the spiritual work performed in response to major events.',mode:'records',skill:'lore',success:'Spiritual work records show emergency saint consultations eight days ago for a community crisis at the contested route. The crisis category is creature event.',fail:'Guildheart spiritual work records require hub authorization to access.'},
      {label:'A Guildheart community saint who was called to the closure event knows what happened.',mode:'person',skill:'persuasion',success:'The saint describes the community grief they were called to manage: a creature event, institutional pressure to maintain silence, families in private mourning.',fail:'The saint maintains pastoral confidentiality and will not share details of the crisis community.'},
      {label:'Sacred presence at the Guildheart Hub institutional border reveals the grief that institutional silence cannot manage.',mode:'place',skill:'survival',success:'At the institutional border you find individuals managing grief from the closure event that the institution has not addressed. They speak to you.',fail:'The institutional border shows managed calm. No grief breaks through the institutional surface.'},
      {label:'Offer spiritual witness to the Guildheart community affected by the closure.',mode:'ritual',skill:'craft',success:'The community receives your witness and opens their truth: the creature event, the binding, the institutional choice to silence what happened.',fail:'The community fears institutional consequences more than they need spiritual witness. They remain closed.'}
    ]},

    // ── BARD ──
    bard_civic:{choices:[
      {label:'Stories move through Shelkopolis faster than official announcements. Collect the stories about the route closure.',mode:'records',skill:'lore',success:'Story collection reveals a consistent creature narrative beneath the official closure explanation: people saw something, people fled, people were told to forget.',fail:'The stories about the closure are too vague and contradictory to extract a consistent truth.'},
      {label:'A bard who has performed in the civic halls knows which officials talk after their third drink. Find one.',mode:'person',skill:'persuasion',success:'After the third drink, an official describes a creature sighting on the contested route that required emergency institutional response.',fail:'The official is careful even after three drinks and says nothing beyond the official story.'},
      {label:'Civic performance spaces are where institutional fear becomes visible. Read the room at the garrison hall.',mode:'place',skill:'survival',success:'The garrison hall audience shows specific fear around the eastern route topic: avoidance, topic change, lowered voices. Something real happened there.',fail:'The garrison hall audience shows ordinary civic tension with no specific fear around the closure.'},
      {label:'Perform a community story collection at the civic memorial, naming the recent dead and watching for reaction.',mode:'ritual',skill:'craft',success:'Naming the recent dead from the contested route draws families who approach you after the performance and share what they know.',fail:'The community memorial performance draws respect but no additional information about the closure.'}
    ]},
    bard_frontier:{choices:[
      {label:'Guildheart Hub story networks carry route intelligence that official channels suppress.',mode:'records',skill:'lore',success:'Hub story networks have a consistent creature narrative from the contested route: something large, something fast, something that claimed the approach.',fail:'Hub story networks are fragmented and contradictory about the closure details.'},
      {label:'A bard who performs at Guildheart Hub trading houses knows what traders say about the route.',mode:'person',skill:'persuasion',success:'A trader who saw the bard perform shares route intelligence: they were warned off the contested approach by someone who had seen something on it.',fail:'The traders at Guildheart Hub are too worried about institutional consequences to share route intelligence.'},
      {label:'Guildheart Hub trading floor energy reveals what route anxieties are active. Read it.',mode:'place',skill:'survival',success:'Trading floor energy shows specific anxiety around eastern route contracts: avoidance, renegotiation, premium pricing for alternatives. Something real stopped that route.',fail:'Trading floor energy shows normal Guildheart Hub volatility with no specific eastern route anxiety.'},
      {label:'Perform a trading day story at Guildheart Hub that includes the contested route and watch for reaction.',mode:'ritual',skill:'craft',success:'Your trading day story draws a reaction from a trader who approaches after and shares what they know about the creature that closed the route.',fail:'Your story draws appreciation but no one with route intelligence approaches afterward.'}
    ]},
    bard_occult:{choices:[
      {label:'Panim Haven memorial stories encode what the community knows about death and creature events.',mode:'records',skill:'lore',success:'Memorial story encoding reveals a creature narrative beneath the official closure explanation: deaths that were not properly mourned, a creature that was not properly named.',fail:'Memorial story encoding is too dense with accumulated grief to isolate the specific closure event.'},
      {label:'A Panim Haven memorial bard who works the processional route heard what happened and encoded it.',mode:'person',skill:'persuasion',success:'The memorial bard shares what they encoded: a creature event on the contested route that the Panim Haven shrine community was instructed to mourn privately.',fail:'The memorial bard maintains the confidentiality of their processional encoding and will not share specific encoded events.'},
      {label:'The Panim Haven processional route carries the encoded grief of the community. Walk it and read the encoding.',mode:'place',skill:'survival',success:'Walking the processional you read the encoding of recent grief: a creature event, institutional silence, unmourned dead from the contested route.',fail:'The processional encoding shows ordinary grief accumulation with no specific closure event signature.'},
      {label:'Perform a memorial story at Panim Haven that names the contested route and watches what grief surfaces.',mode:'ritual',skill:'craft',success:'The memorial performance surfaces specific grief from the closure event. Community members approach and share what the institution told them not to say.',fail:'The memorial performance draws community grief but nothing specific to the contested route closure surfaces.'}
    ]}

  };

  window.BACKGROUND_STAGE2_CONTENT = BACKGROUND_STAGE2_CONTENT;
})();
"""

with open(r'C:\Users\CEO\ledger-of-ash\js\stage2-backgrounds.js', 'w', encoding='utf-8') as f:
    f.write(content)

print('DONE - wrote', len(content), 'bytes,', content.count('\n'), 'lines')
